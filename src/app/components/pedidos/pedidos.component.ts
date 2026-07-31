import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Order, OrderStatus, DayMetrics, EmissaoResult, Marketplace } from 'src/api/pedido.model';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html',
    styleUrls: ['./pedidos.component.scss'],
    providers: [MessageService]
})
export class PedidosComponent implements OnInit {

    // ── Estado da tela ───────────────────────────────────────────
    orders: Order[] = [];
    filteredOrders: Order[] = [];
    selectedOrder: Order | null = null;

    currentFilter: string = 'todos';
    searchTerm: string = '';
    emitting: boolean = false;

    metrics: DayMetrics = { total: 0, emitidas: 0, pending: 0, errors: 0 };

    // Rótulos e classes de marketplace (usados no template)
    readonly MKT_LABELS: Record<Marketplace, string> = {
        mercadolivre: 'Mercado Livre',
        shopee: 'Shopee',
        amazon: 'Amazon',
        nuvemshop: 'Nuvemshop',
    };

    readonly MKT_DOT_CLASS: Record<Marketplace, string> = {
        mercadolivre: 'dot-ml',
        shopee: 'dot-sh',
        amazon: 'dot-az',
        nuvemshop: 'dot-nv',
    };

    // Passos da barra de progresso de emissão
    readonly NFE_STEPS = [
        { label: 'Pedido', icon: 'pi-shopping-cart' },
        { label: 'Fila', icon: 'pi-list' },
        { label: 'XML', icon: 'pi-code' },
        { label: 'SEFAZ', icon: 'pi-cloud-upload' },
        { label: 'Autorizada', icon: 'pi-check-circle' },
    ];

    private readonly STATUS_DOTS: Record<OrderStatus, string[]> = {
        pendente: ['done', 'done', 'idle', 'idle', 'idle'],
        emitindo: ['done', 'done', 'done', 'active', 'idle'],
        emitida: ['done', 'done', 'done', 'done', 'done'],
        erro: ['done', 'done', 'done', 'error', 'idle'],
        cancelada: ['done', 'done', 'done', 'done', 'idle'],
    };

    // Mock: quantidade de Contas de NF configuradas (módulo Fiscal ainda não migrado)
    // TODO: substituir por chamada real ao módulo Fiscal quando ele for migrado
    private readonly contasNFConfiguradas: number = 1;

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.obterPedidos();
    }

    // ════════════════════════════════════════════════════════════
    // "BUSCAR NO BANCO" — hoje retorna dados fixos.
    // Quando o back do Danilo estiver pronto, trocar o corpo desta
    // função por uma chamada a um PedidoService (HttpClient), ex:
    //
    //   this.pedidoService.obterPedidos().subscribe(resp => {
    //       this.orders = resp.dados;
    //       this.aplicarFiltro();
    //   });
    // ════════════════════════════════════════════════════════════
    obterPedidos(): void {
        this.orders = this.gerarPedidosFixos();
        this.aplicarFiltro();
    }

    private gerarPedidosFixos(): Order[] {
        return [
            {
                id: '#ML-8842391', mkt: 'mercadolivre',
                buyer: 'Carlos Souza', email: 'carlos@email.com', cpf: '123.456.789-00',
                val: 'R$ 349,90', valNum: 349.90, status: 'pendente',
                cidade: 'São Paulo, SP', cep: '01310-100', frete: 'Mercado Envios', prazo: '3–5 dias úteis',
                items: [
                    { name: 'Cabo USB-C 2m Nylon Trançado', sku: 'CBL-USC-2M-NY', ncm: '8544.42.00', qty: 2, price: 'R$ 89,90' },
                    { name: 'Carregador 65W GaN Compact', sku: 'CRG-65W-GAN', ncm: '8504.40.19', qty: 1, price: 'R$ 169,90' },
                ],
            },
            {
                id: '#ML-8842388', mkt: 'mercadolivre',
                buyer: 'Ana Lima', email: 'ana@email.com', cpf: '987.654.321-00',
                val: 'R$ 129,90', valNum: 129.90, status: 'emitida',
                cidade: 'Campinas, SP', cep: '13010-050', frete: 'Mercado Envios', prazo: '2–4 dias úteis',
                items: [
                    { name: 'Mousepad XL RGB 90x40cm', sku: 'MPS-XL-RGB', ncm: '8473.30.49', qty: 1, price: 'R$ 129,90' },
                ],
                nfe: { chNFe: '35240512345678901234550010000012341234567890', protocolo: '135240012345678', emitidaEm: '22/05/2026 09:14' },
            },
            {
                id: '#SH-9910234', mkt: 'shopee',
                buyer: 'Roberto Alves', email: 'roberto@email.com', cpf: '456.123.789-00',
                val: 'R$ 87,50', valNum: 87.50, status: 'pendente',
                cidade: 'Rio de Janeiro, RJ', cep: '20040-020', frete: 'Correios PAC', prazo: '5–8 dias úteis',
                items: [
                    { name: 'Suporte Notebook Alumínio 6 Níveis', sku: 'SPT-NTB-ALU', ncm: '8473.30.49', qty: 1, price: 'R$ 87,50' },
                ],
            },
            {
                id: '#AZ-1029384', mkt: 'amazon',
                buyer: 'Fernanda Costa', email: 'fernanda@email.com', cpf: '321.654.987-00',
                val: 'R$ 512,00', valNum: 512.00, status: 'erro',
                cidade: 'Belo Horizonte, MG', cep: '30112-010', frete: 'Amazon Logística', prazo: '1–2 dias úteis',
                items: [
                    { name: 'SSD 480GB SATA III 2.5"', sku: 'SSD-480-SAT', ncm: '8471.70.90', qty: 2, price: 'R$ 199,00' },
                    { name: 'Case SSD Externo USB-C 3.2', sku: 'CSE-SSD-UC', ncm: '8473.30.49', qty: 2, price: 'R$ 57,00' },
                ],
                error: { mensagem: 'Rejeição 539 — CNPJ do emitente não cadastrado na SEFAZ', codigoErro: '539' },
            },
            {
                id: '#ML-8842379', mkt: 'mercadolivre',
                buyer: 'Paulo Mendes', email: 'paulo@email.com', cpf: '741.852.963-00',
                val: 'R$ 78,00', valNum: 78.00, status: 'emitida',
                cidade: 'Porto Alegre, RS', cep: '90010-150', frete: 'Mercado Envios', prazo: '3–5 dias úteis',
                items: [
                    { name: 'Película Vidro iPhone 15 (pack 3)', sku: 'PEL-IPH-15', ncm: '7007.19.00', qty: 3, price: 'R$ 26,00' },
                ],
                nfe: { chNFe: '35240512345678901234550010000012351234567891', protocolo: '135240012345679', emitidaEm: '22/05/2026 08:52' },
            },
            {
                id: '#NV-7710092', mkt: 'nuvemshop',
                buyer: 'Juliana Ramos', email: 'juliana@email.com', cpf: '159.357.852-00',
                val: 'R$ 234,00', valNum: 234.00, status: 'pendente',
                cidade: 'Curitiba, PR', cep: '80010-010', frete: 'Correios SEDEX', prazo: '1–3 dias úteis',
                items: [
                    { name: 'Kit Skincare Básico 5 Produtos', sku: 'KIT-SKC-BSC', ncm: '3304.99.90', qty: 1, price: 'R$ 234,00' },
                ],
            },
        ];
    }

    // ════════════════════════════════════════════════════════════
    // FILTROS / BUSCA / MÉTRICAS
    // ════════════════════════════════════════════════════════════
    aplicarFiltro(): void {
        this.filteredOrders = this.orders.filter(o => {
            if (this.currentFilter !== 'todos' && o.status !== this.currentFilter) return false;
            if (this.searchTerm) {
                const q = this.searchTerm.toLowerCase();
                if (!o.id.toLowerCase().includes(q) && !o.buyer.toLowerCase().includes(q)) return false;
            }
            return true;
        });
        this.calcularMetricas();
    }

    setFiltro(filtro: string): void {
        this.currentFilter = filtro;
        this.aplicarFiltro();
    }

    onBuscar(termo: string): void {
        this.searchTerm = termo;
        this.aplicarFiltro();
    }

    private calcularMetricas(): void {
        this.metrics = {
            total: this.orders.length,
            emitidas: this.orders.filter(o => o.status === 'emitida').length,
            pending: this.orders.filter(o => o.status === 'pendente').length,
            errors: this.orders.filter(o => o.status === 'erro').length,
        };
    }

    // ════════════════════════════════════════════════════════════
    // SELEÇÃO DE PEDIDO
    // ════════════════════════════════════════════════════════════
    selecionarPedido(order: Order): void {
        this.selectedOrder = order;
    }

    fecharDetalhe(): void {
        this.selectedOrder = null;
    }

    statusDots(status: OrderStatus): string[] {
        return this.STATUS_DOTS[status] ?? this.STATUS_DOTS['pendente'];
    }

    // ════════════════════════════════════════════════════════════
    // EMISSÃO DE NF-e (simulada)
    // TODO: quando existir PedidoService, trocar a simulação abaixo
    // por uma chamada real (ex: this.pedidoService.emitirNFe(id)).
    // ════════════════════════════════════════════════════════════
    async emitirNFe(): Promise<void> {
        if (this.emitting) return;
        const o = this.selectedOrder;
        if (!o || o.status === 'emitida' || o.status === 'emitindo') return;

        if (this.contasNFConfiguradas === 0) {
            this.aviso('Configure uma conta de NF na aba Fiscal antes de emitir.');
            return;
        }

        this.emitting = true;
        this.atualizarPedido(o.id, { status: 'emitindo', error: undefined });
        this.info('Enviando para SEFAZ…');

        const result = await this.simularEmissaoNFe(o);

        if (result.success && result.nfe) {
            this.atualizarPedido(o.id, { status: 'emitida', nfe: result.nfe, error: undefined });
            this.sucesso(`NF-e ${o.id} autorizada!`);
        } else {
            this.atualizarPedido(o.id, { status: 'erro', error: result.error });
            this.erro(`Erro ${result.error?.codigoErro} em ${o.id}`);
        }

        this.emitting = false;
    }

    async emitirLote(): Promise<void> {
        if (this.contasNFConfiguradas === 0) {
            this.aviso('Configure uma conta de NF na aba Fiscal antes de emitir.');
            return;
        }

        const pendentes = this.filteredOrders.filter(o => o.status === 'pendente');
        if (pendentes.length === 0) {
            this.aviso('Nenhum pedido pendente.');
            return;
        }

        this.info(`Enviando ${pendentes.length} pedidos para a fila…`);

        for (let i = 0; i < pendentes.length; i++) {
            await this.delay(i === 0 ? 0 : 400);
            const result = await this.simularEmissaoNFe(pendentes[i]);
            if (result.success && result.nfe) {
                this.atualizarPedido(pendentes[i].id, { status: 'emitida', nfe: result.nfe });
            } else {
                this.atualizarPedido(pendentes[i].id, { status: 'erro', error: result.error });
            }
        }

        this.sucesso('Emissão em lote concluída!');
    }

    reemitir(id: string): void {
        this.atualizarPedido(id, { status: 'pendente', error: undefined });
        this.info('Pedido recolocado na fila.');
    }

    cancelarNFe(id: string): void {
        if (!confirm(`Cancelar NF-e do pedido ${id}? Ação irreversível.`)) return;
        this.atualizarPedido(id, { status: 'cancelada' });
        this.aviso('NF-e cancelada.');
    }

    verSolucao(codigo: string): void {
        const solucoes: Record<string, string> = {
            '539': 'CNPJ não cadastrado ou inativo na SEFAZ estadual.',
            '205': 'NF-e duplicada. Mesmo número e série já emitidos.',
            '228': 'Data de emissão inválida. Ajuste o relógio do servidor.',
        };
        this.messageService.add({
            severity: 'info',
            summary: `Rejeição ${codigo}`,
            detail: solucoes[codigo] ?? 'Consulte a tabela de rejeições SEFAZ.',
            life: 8000
        });
    }

    private atualizarPedido(id: string, patch: Partial<Order>): void {
        const idx = this.orders.findIndex(o => o.id === id);
        if (idx === -1) return;
        this.orders[idx] = { ...this.orders[idx], ...patch };
        if (this.selectedOrder?.id === id) {
            this.selectedOrder = this.orders[idx];
        }
        this.aplicarFiltro();
    }

    // Simula tempo de processamento: XML (800ms) + envio SEFAZ (1800ms) + resposta (600ms)
    private async simularEmissaoNFe(order: Order): Promise<EmissaoResult> {
        await this.delay(800);
        await this.delay(1800);
        await this.delay(600);

        const shouldFail = false;

        if (shouldFail) {
            return { success: false, error: { mensagem: 'Rejeição 999 — Erro interno SEFAZ', codigoErro: '999' } };
        }

        return {
            success: true,
            nfe: {
                chNFe: this.gerarChaveAcesso(),
                protocolo: this.gerarProtocolo(),
                emitidaEm: this.agora(),
                danfeUrl: `/danfe/${order.id}.pdf`,
                xmlUrl: `/xml/${order.id}.xml`,
            },
        };
    }

    private gerarChaveAcesso(): string {
        const rand = () => Math.floor(Math.random() * 1e8).toString().padStart(8, '0');
        return `35240512345678901234550010000${rand()}${rand().substring(0, 7)}`;
    }

    private gerarProtocolo(): string {
        return `13524${Math.floor(Math.random() * 1e10).toString().padStart(10, '0')}`;
    }

    private agora(): string {
        const now = new Date();
        const p = (n: number) => String(n).padStart(2, '0');
        return `${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ── Toasts (MessageService, mesmo padrão usado no resto do projeto) ──
    private sucesso(msg: string): void { this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: msg, life: 3000 }); }
    private erro(msg: string): void { this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg, life: 5000 }); }
    private info(msg: string): void { this.messageService.add({ severity: 'info', summary: 'Info', detail: msg, life: 3000 }); }
    private aviso(msg: string): void { this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: msg, life: 3000 }); }
}

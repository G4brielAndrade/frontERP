import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Order, OrderStatus, DayMetrics, EmissaoResult, Marketplace, NFeData } from 'src/api/pedido.model';
import jsPDF, { GState } from 'jspdf';
import * as JsBarcode from 'jsbarcode';
import * as QRCode from 'qrcode';

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
                nfe: {
                    chNFe: '35240512345678901234550010000012341234567890', protocolo: '135240012345678', emitidaEm: '22/05/2026 09:14',
                    serie: '5', numero: '82588', vencimento: '25/05/2026 20:59:59',
                },
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
                nfe: {
                    chNFe: '35240512345678901234550010000012351234567891', protocolo: '135240012345679', emitidaEm: '22/05/2026 08:52',
                    serie: '5', numero: '82579', vencimento: '25/05/2026 20:59:59',
                },
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

    // ════════════════════════════════════════════════════════════
    // IMPRESSÃO DE ETIQUETA — DANFE SIMPLIFICADA
    // Gera só a 2ª página do par de etiquetas (a que o próprio ERP
    // produz, com os dados do pedido/NF-e). A 1ª página — a etiqueta
    // de envio do marketplace — chega pronta em PDF via API e será
    // mesclada com esta quando o back-end do Danilo estiver pronto.
    // TODO: quando existir PedidoService, buscar série/número/
    // vencimento e o payload real do QR-code fiscal via API em vez
    // do mock abaixo.
    // ════════════════════════════════════════════════════════════
    async imprimirEtiqueta(order: Order): Promise<void> {
        if (order.status !== 'emitida' || !order.nfe) {
            this.aviso('Emita a NF-e antes de imprimir a etiqueta.');
            return;
        }

        this.info('Gerando etiqueta…');

        try {
            const pdfUrl = await this.gerarDanfeSimplificada(order, order.nfe);
            window.open(pdfUrl, '_blank');
        } catch {
            this.erro('Não foi possível gerar a etiqueta.');
        }
    }

    private async gerarDanfeSimplificada(order: Order, nfe: NFeData): Promise<string> {
        // Etiqueta térmica 10cm x 15cm — mesmo padrão da etiqueta de envio do marketplace
        const doc = new jsPDF({ unit: 'mm', format: [100, 150] });

        const marginX = 5;
        const pageW = 100;
        const pageH = 150;
        const contentW = pageW - marginX * 2; // 90mm
        let y = 8;

        // Marca d'água — logo UltraERP centralizada, bem apagada, atrás de todo o resto
        try {
            const logoDataUrl = await this.carregarLogoDataUrl();
            const wmW = 65;
            const wmH = wmW * (577 / 2126); // mantém a proporção original da logo
            doc.saveGraphicsState();
            doc.setGState(new GState({ opacity: 0.06 }));
            doc.addImage(logoDataUrl, 'PNG', (pageW - wmW) / 2, (pageH - wmH) / 2, wmW, wmH);
            doc.restoreGraphicsState();
        } catch {
            // Sem a logo, a etiqueta ainda é gerada normalmente — marca d'água é só um extra visual
        }

        // Moldura externa
        doc.setDrawColor(0);
        doc.setLineWidth(0.3);
        doc.rect(2, 2, pageW - 4, 146);

        // Título
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        const titulo = 'DANFE SIMPLIFICADA - ETIQUETA';
        const tituloW = doc.getTextWidth(titulo);
        doc.text(titulo, pageW / 2, y, { align: 'center' });
        doc.setLineWidth(0.2);
        doc.line(pageW / 2 - tituloW / 2, y + 1, pageW / 2 + tituloW / 2, y + 1);
        y += 6;

        // Meta: vencimento (label + valor na mesma linha)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text('Horário de vencimento', marginX, y);
        doc.text(nfe.vencimento, pageW - marginX, y, { align: 'right' });
        y += 4.5;

        doc.text(`Impresso em: ${this.agora()}`, marginX, y);
        y += 4.5;

        doc.text(`Nome:${order.buyer}`, marginX, y);
        y += 4.5;

        doc.text(`Série:${nfe.serie} | Número:${nfe.numero} |1- Saída |`, marginX, y);
        y += 3;

        doc.setLineWidth(0.2);
        doc.line(marginX, y, pageW - marginX, y);
        y += 4;

        // Código de barras (chave de acesso) + QR code
        const barcodeDataUrl = this.gerarBarcodeDataUrl(nfe.chNFe);
        const barcodeW = 62, barcodeH = 16;
        const barcodeCenterX = marginX + barcodeW / 2; // centro do código de barras, não da página
        doc.addImage(barcodeDataUrl, 'PNG', marginX, y, barcodeW, barcodeH);

        // QR menor e um pouco mais acima, pra não invadir o texto da chave de acesso logo abaixo do código de barras
        const qrSize = 13;
        const qrY = y - 2;
        const qrDataUrl = await QRCode.toDataURL(nfe.chNFe, { margin: 0, width: 200 });
        doc.addImage(qrDataUrl, 'PNG', pageW - marginX - qrSize, qrY, qrSize, qrSize);

        y += barcodeH + 3;
        doc.setFont('courier', 'normal');
        doc.setFontSize(6.5);
        doc.text(nfe.chNFe, barcodeCenterX, y, { align: 'center' });
        y += 4;

        doc.setLineWidth(0.2);
        doc.line(marginX, y, pageW - marginX, y);
        y += 1;

        // Tabela de conteúdo
        const colN = marginX;
        const colNW = 9;
        const colConteudo = colN + colNW;
        const colQtd = pageW - marginX - 14;
        const colConteudoW = colQtd - colConteudo;
        const qtdCenterX = (colQtd + (pageW - marginX)) / 2; // centro da célula QTD
        const tableTop = y;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        y += 4;
        doc.text('N', colN + 1, y);
        doc.text('CONTEÚDO', colConteudo + 1, y);
        doc.text('QTD.', qtdCenterX, y, { align: 'center' });
        y += 1.5;
        doc.line(marginX, y, pageW - marginX, y);
        y += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        let totalQtd = 0;
        order.items.forEach((item, i) => {
            totalQtd += item.qty;
            const linhas: string[] = doc.splitTextToSize(item.name, colConteudoW - 2);
            doc.text(`No${i + 1}`, colN + 1, y);
            doc.text(linhas, colConteudo + 1, y);
            doc.text(String(item.qty), qtdCenterX, y, { align: 'center' });
            y += linhas.length * 3.2 + 2;
        });

        doc.line(marginX, y, pageW - marginX, y);
        y += 4;
        doc.setFont('helvetica', 'bold');
        doc.text('Total', colConteudo + 1, y);
        doc.text(String(totalQtd), qtdCenterX, y, { align: 'center' });
        y += 2;

        // Moldura da tabela
        doc.setLineWidth(0.2);
        doc.rect(marginX, tableTop, contentW, y - tableTop);
        doc.line(colConteudo, tableTop, colConteudo, y);
        doc.line(colQtd, tableTop, colQtd, y);

        // Rodapé — "2/2": esta etiqueta sempre acompanha a página do marketplace (mescladas quando o back existir)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.text('2/2', pageW - marginX, 146, { align: 'right' });

        return doc.output('bloburl') as unknown as string;
    }

    // Converte a logo (assets/images) em data URL — jsPDF precisa da imagem já embutida, não de uma URL de rede
    private logoDataUrlCache: string | null = null;
    private async carregarLogoDataUrl(): Promise<string> {
        if (this.logoDataUrlCache) return this.logoDataUrlCache;
        const resp = await fetch('assets/images/ultraerp-logo.png');
        const blob = await resp.blob();
        this.logoDataUrlCache = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
        return this.logoDataUrlCache;
    }

    private gerarBarcodeDataUrl(valor: string): string {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, valor, {
            format: 'CODE128',
            displayValue: false,
            margin: 0,
            height: 60,
            width: 2,
        });
        return canvas.toDataURL('image/png');
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
                serie: '5',
                numero: this.gerarNumeroNFe(),
                // Mock: vencimento = emissão + 3 dias, às 20:59:59 (regra real fica com o backend)
                vencimento: this.agora(3, '20:59:59'),
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

    private gerarNumeroNFe(): string {
        return String(Math.floor(80000 + Math.random() * 9999));
    }

    // diasSoma/horaFixa: usados só pra mockar o vencimento (emissão + N dias); sem efeito quando chamado sem args (retorna "agora")
    private agora(diasSoma: number = 0, horaFixa?: string): string {
        const now = new Date();
        if (diasSoma) now.setDate(now.getDate() + diasSoma);
        const p = (n: number) => String(n).padStart(2, '0');
        const dataStr = `${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()}`;
        const horaStr = horaFixa ?? `${p(now.getHours())}:${p(now.getMinutes())}`;
        return `${dataStr} ${horaStr}`;
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

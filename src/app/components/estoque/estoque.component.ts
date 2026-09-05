import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MOCK_PRODUTOS, Produto } from 'src/api/produto.model';
import {
    NivelEstoque, MovimentacaoEstoque, FaixaABC, StatusEstoque,
    TipoMovimentacao, MotivoMovimentacao, MOTIVOS_MOVIMENTACAO,
} from 'src/api/estoque.model';

type Aba = 'niveis' | 'movimentacoes' | 'curva-abc';
type View = 'list' | 'ajuste';

function uuid(): string {
    return (crypto as any).randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

@Component({
    selector: 'app-estoque',
    templateUrl: './estoque.component.html',
    styleUrls: ['./estoque.component.scss'],
    providers: [MessageService]
})
export class EstoqueComponent implements OnInit {

    readonly MOTIVOS_MOVIMENTACAO = MOTIVOS_MOVIMENTACAO;
    readonly MOTIVOS_LIST = Object.entries(MOTIVOS_MOVIMENTACAO) as [MotivoMovimentacao, string][];

    // Opções { label, value } pros p-dropdown (PrimeNG) desta tela.
    readonly STATUS_ESTOQUE_OPTIONS = [
        { label: 'Todos os status', value: 'todos' },
        { label: 'OK', value: 'ok' },
        { label: 'Estoque baixo', value: 'baixo' },
        { label: 'Em ruptura', value: 'zerado' },
    ];
    readonly TIPO_MOV_OPTIONS = [
        { label: 'Todos os tipos', value: 'todos' },
        { label: 'Entradas', value: 'entrada' },
        { label: 'Saídas', value: 'saida' },
        { label: 'Ajustes', value: 'ajuste' },
    ];
    readonly TIPO_AJUSTE_OPTIONS = [
        { label: 'Entrada (soma ao estoque)', value: 'entrada' },
        { label: 'Saída (retira do estoque)', value: 'saida' },
    ];
    // Propriedade normal, calculada uma única vez (MOTIVOS_LIST é estático) —
    // getter aqui recriaria o array a cada ciclo de detecção de mudanças e
    // travava a aba.
    readonly motivoOptions: { label: string; value: MotivoMovimentacao }[] =
        Object.entries(MOTIVOS_MOVIMENTACAO).map(([value, label]) => ({ value: value as MotivoMovimentacao, label }));

    abaAtiva: Aba = 'niveis';
    view: View = 'list';

    niveis: NivelEstoque[] = [];
    movimentacoes: MovimentacaoEstoque[] = [];
    faixasABC: FaixaABC[] = [];

    // ── Filtros ────────────────────────────────────────────────
    busca = '';
    filtroStatus: 'todos' | StatusEstoque = 'todos';
    filtroTipoMov: 'todos' | TipoMovimentacao = 'todos';

    // ── Ajuste manual ─────────────────────────────────────────
    ajusteAlvo: NivelEstoque | null = null;
    ajusteForm: { tipo: TipoMovimentacao; quantidade: number; motivo: MotivoMovimentacao; observacao: string } = {
        tipo: 'entrada', quantidade: 1, motivo: 'compra', observacao: '',
    };

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.obterNiveis();
        this.obterMovimentacoes();
        this.montarCurvaABC();
    }

    // ════════════════════════════════════════════════════════════
    // NÍVEIS DE ESTOQUE — derivado do catálogo de Produtos.
    // TODO: quando existir EstoqueService, "reservado" vem da soma
    // real de itens em pedidos pendentes de emissão/envio.
    // ════════════════════════════════════════════════════════════
    obterNiveis(): void {
        this.niveis = MOCK_PRODUTOS.map(p => this.paraNivel(p));
    }

    private paraNivel(p: Produto): NivelEstoque {
        const estoqueAtual = p.estoque;
        const estoqueMinimo = p.estoqueMinimo ?? 10;
        const precoVenda = p.precoVenda ?? 0;
        const reservado = Math.min(estoqueAtual, Math.round(this.seedRandom(p.sku + '-reservado') * 8));
        const disponivel = Math.max(0, estoqueAtual - reservado);
        let status: StatusEstoque = 'ok';
        if (estoqueAtual === 0) status = 'zerado';
        else if (estoqueAtual <= estoqueMinimo) status = 'baixo';

        return {
            produtoId: p.id, sku: p.sku, nome: p.nome, imagemUrl: p.imagemUrl, grupo: p.grupo,
            estoqueAtual, reservado, disponivel, estoqueMinimo, precoVenda,
            valorEmEstoque: Math.round(estoqueAtual * precoVenda * 100) / 100,
            status,
        };
    }

    // ════════════════════════════════════════════════════════════
    // MOVIMENTAÇÕES — histórico mockado (entradas/saídas/ajustes)
    // ════════════════════════════════════════════════════════════
    obterMovimentacoes(): void {
        this.movimentacoes = [
            {
                id: 'm-001', produtoId: 'p-001', sku: 'CBL-USC-2M-NY', nomeProduto: 'Cabo USB-C 2m Nylon Trançado',
                tipo: 'saida', quantidade: 2, motivo: 'venda', saldoResultante: 184,
                data: '12/08/2026 09:14', usuario: 'Sistema', referenciaPedido: '#ML-8842379',
            },
            {
                id: 'm-002', produtoId: 'p-004', sku: 'SPT-NTB-ALU', nomeProduto: 'Suporte Notebook Alumínio 6 Níveis',
                tipo: 'saida', quantidade: 1, motivo: 'venda', saldoResultante: 3,
                data: '11/08/2026 17:02', usuario: 'Sistema', referenciaPedido: '#SH-9910234',
            },
            {
                id: 'm-003', produtoId: 'p-002', sku: 'CRG-65W-GAN', nomeProduto: 'Carregador 65W GaN Compact',
                tipo: 'entrada', quantidade: 50, motivo: 'compra', saldoResultante: 96,
                data: '10/08/2026 11:30', usuario: 'Você', observacao: 'Reposição fornecedor Shenzhen Tech Import',
            },
            {
                id: 'm-004', produtoId: 'p-007', sku: 'PEL-IPH-15', nomeProduto: 'Película Vidro iPhone 15 (pack 3)',
                tipo: 'saida', quantidade: 3, motivo: 'venda', saldoResultante: 0,
                data: '02/08/2026 16:09', usuario: 'Sistema', referenciaPedido: '#AZ-1029384',
            },
            {
                id: 'm-005', produtoId: 'p-003', sku: 'MPS-XL-RGB', nomeProduto: 'Mousepad XL RGB 90x40cm',
                tipo: 'ajuste', quantidade: 4, motivo: 'inventario', saldoResultante: 41,
                data: '30/07/2026 14:20', usuario: 'Você', observacao: 'Divergência na conferência mensal',
            },
            {
                id: 'm-006', produtoId: 'p-009', sku: 'HID-FAC-50', nomeProduto: 'Hidratante Facial 50g',
                tipo: 'saida', quantidade: 5, motivo: 'venda', saldoResultante: 0,
                data: '29/07/2026 10:47', usuario: 'Sistema', referenciaPedido: '#NV-7710055',
            },
            {
                id: 'm-007', produtoId: 'p-005', sku: 'SSD-480-SAT', nomeProduto: 'SSD 480GB SATA III 2.5"',
                tipo: 'entrada', quantidade: 30, motivo: 'compra', saldoResultante: 58,
                data: '25/07/2026 08:55', usuario: 'Você', observacao: 'Reposição fornecedor Guangzhou Gadgets Co.',
            },
            {
                id: 'm-008', produtoId: 'p-006', sku: 'CSE-SSD-UC', nomeProduto: 'Case SSD Externo USB-C 3.2',
                tipo: 'saida', quantidade: 1, motivo: 'devolucao', saldoResultante: 72,
                data: '22/07/2026 13:10', usuario: 'Sistema', referenciaPedido: '#ML-8841200',
                observacao: 'Devolução aceita — item retornou ao estoque',
            },
        ];
    }

    // ════════════════════════════════════════════════════════════
    // CURVA ABC — classifica produtos pela participação na receita
    // dos últimos 30 dias (mock determinístico).
    // TODO: no backend, puxar da mesma agregação usada em Relatórios.
    // ════════════════════════════════════════════════════════════
    montarCurvaABC(): void {
        const comReceita = MOCK_PRODUTOS.map(p => {
            const unidadesVendidas = 3 + Math.round(this.seedRandom(p.sku + '-abc') * 32);
            const receita30d = Math.round((p.precoVenda ?? 40) * unidadesVendidas * 100) / 100;
            return { produtoId: p.id, sku: p.sku, nome: p.nome, receita30d };
        }).sort((a, b) => b.receita30d - a.receita30d);

        const totalReceita = comReceita.reduce((acc, p) => acc + p.receita30d, 0);
        let acumulado = 0;

        this.faixasABC = comReceita.map(p => {
            const participacao = totalReceita > 0 ? Math.round((p.receita30d / totalReceita) * 1000) / 10 : 0;
            acumulado += participacao;
            const classe = acumulado <= 80 ? 'A' : acumulado <= 95 ? 'B' : 'C';
            return { ...p, participacao, participacaoAcumulada: Math.round(acumulado * 10) / 10, classe };
        });
    }

    // ════════════════════════════════════════════════════════════
    // FILTROS
    // ════════════════════════════════════════════════════════════
    get niveisFiltrados(): NivelEstoque[] {
        const termo = this.busca.trim().toLowerCase();
        return this.niveis.filter(n => {
            if (this.filtroStatus !== 'todos' && n.status !== this.filtroStatus) return false;
            if (termo && !n.sku.toLowerCase().includes(termo) && !n.nome.toLowerCase().includes(termo)) return false;
            return true;
        });
    }

    get movimentacoesFiltradas(): MovimentacaoEstoque[] {
        const termo = this.busca.trim().toLowerCase();
        return this.movimentacoes.filter(m => {
            if (this.filtroTipoMov !== 'todos' && m.tipo !== this.filtroTipoMov) return false;
            if (termo && !m.sku.toLowerCase().includes(termo) && !m.nomeProduto.toLowerCase().includes(termo)) return false;
            return true;
        });
    }

    // ════════════════════════════════════════════════════════════
    // KPIs DO TOPO
    // ════════════════════════════════════════════════════════════
    get totalSkus(): number { return this.niveis.length; }
    get valorTotalEstoque(): number { return Math.round(this.niveis.reduce((acc, n) => acc + n.valorEmEstoque, 0) * 100) / 100; }
    get qtdRuptura(): number { return this.niveis.filter(n => n.status === 'zerado').length; }
    get qtdBaixo(): number { return this.niveis.filter(n => n.status === 'baixo').length; }

    // ════════════════════════════════════════════════════════════
    // AJUSTE MANUAL DE ESTOQUE
    // ════════════════════════════════════════════════════════════
    abrirAjuste(nivel: NivelEstoque): void {
        this.ajusteAlvo = nivel;
        this.ajusteForm = { tipo: 'entrada', quantidade: 1, motivo: 'compra', observacao: '' };
        this.view = 'ajuste';
    }

    voltarLista(): void {
        this.view = 'list';
        this.ajusteAlvo = null;
    }

    confirmarAjuste(): void {
        if (!this.ajusteAlvo) return;
        if (!this.ajusteForm.quantidade || this.ajusteForm.quantidade <= 0) {
            this.messageService.add({ severity: 'warn', summary: 'Quantidade inválida', detail: 'Informe uma quantidade maior que zero.', life: 3000 });
            return;
        }

        const idx = this.niveis.findIndex(n => n.produtoId === this.ajusteAlvo!.produtoId);
        if (idx < 0) return;

        const nivel = this.niveis[idx];
        const delta = this.ajusteForm.tipo === 'saida' ? -this.ajusteForm.quantidade : this.ajusteForm.quantidade;
        const novoEstoque = Math.max(0, nivel.estoqueAtual + delta);

        this.niveis[idx] = {
            ...nivel,
            estoqueAtual: novoEstoque,
            disponivel: Math.max(0, novoEstoque - nivel.reservado),
            valorEmEstoque: Math.round(novoEstoque * nivel.precoVenda * 100) / 100,
            status: novoEstoque === 0 ? 'zerado' : novoEstoque <= nivel.estoqueMinimo ? 'baixo' : 'ok',
        };

        this.movimentacoes.unshift({
            id: uuid(),
            produtoId: nivel.produtoId, sku: nivel.sku, nomeProduto: nivel.nome,
            tipo: this.ajusteForm.tipo === 'saida' ? 'saida' : 'entrada',
            quantidade: this.ajusteForm.quantidade,
            motivo: this.ajusteForm.motivo,
            observacao: this.ajusteForm.observacao || undefined,
            saldoResultante: novoEstoque,
            data: this.agora(),
            usuario: 'Você',
        });

        this.messageService.add({ severity: 'success', summary: 'Estoque ajustado', detail: `${nivel.sku} agora tem ${novoEstoque} unidade(s).`, life: 3000 });
        this.view = 'list';
        this.ajusteAlvo = null;
    }

    // ════════════════════════════════════════════════════════════
    // HELPERS
    // ════════════════════════════════════════════════════════════
    private hash(str: string): number {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
        return h;
    }
    private seedRandom(chave: string): number { return (this.hash(chave) % 10000) / 10000; }

    private agora(): string {
        const now = new Date();
        const p = (n: number) => String(n).padStart(2, '0');
        return `${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;
    }

    formatarMoeda(valor: number): string {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    statusLabel(status: StatusEstoque): string {
        return { ok: 'OK', baixo: 'Estoque baixo', zerado: 'Em ruptura' }[status];
    }
    statusClass(status: StatusEstoque): string {
        return { ok: 'st-ok', baixo: 'st-baixo', zerado: 'st-zerado' }[status];
    }

    tipoMovLabel(tipo: TipoMovimentacao): string {
        return { entrada: 'Entrada', saida: 'Saída', ajuste: 'Ajuste' }[tipo];
    }
    tipoMovClass(tipo: TipoMovimentacao): string {
        return { entrada: 'mov-entrada', saida: 'mov-saida', ajuste: 'mov-ajuste' }[tipo];
    }

    classeABCClass(classe: ClasseABCLike): string {
        return { A: 'abc-a', B: 'abc-b', C: 'abc-c' }[classe];
    }
}

type ClasseABCLike = 'A' | 'B' | 'C';

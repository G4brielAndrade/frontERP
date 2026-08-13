import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
    Produto, ProdutoKit, ItemKit, ContaFiscalResumo, ClasseImposto,
    StatusProduto, ORIGENS_PRODUTO, UNIDADES_PRODUTO,
} from 'src/api/produto.model';

type Aba = 'produtos' | 'kits';
type View = 'list' | 'form-produto' | 'form-kit';
type TabProduto = 'basicas' | 'nfe';
type TabKit = 'basicas' | 'associar';

function uuid(): string {
    return (crypto as any).randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss'],
    providers: [MessageService]
})
export class ProdutosComponent implements OnInit {

    readonly ORIGENS_PRODUTO = ORIGENS_PRODUTO;
    readonly UNIDADES_PRODUTO = UNIDADES_PRODUTO;

    // ── Estado geral ───────────────────────────────────────────
    produtos: Produto[] = [];
    kits: ProdutoKit[] = [];
    contasFiscais: ContaFiscalResumo[] = [];

    abaAtiva: Aba = 'produtos';
    view: View = 'list';

    // ── Filtros da listagem ────────────────────────────────────
    busca = '';
    filtroStatus: 'todos' | StatusProduto = 'todos';

    // ── Form: produto único ────────────────────────────────────
    tabProduto: TabProduto = 'basicas';
    editingProdutoId: string | null = null;
    produtoForm: Partial<Produto> = {};

    // ── Form: produto combinado (kit) ──────────────────────────
    tabKit: TabKit = 'basicas';
    editingKitId: string | null = null;
    kitForm: Partial<ProdutoKit> = {};
    buscaAssociar = '';

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.obterProdutos();
        this.obterKits();
        this.obterContasFiscais();
    }

    // ════════════════════════════════════════════════════════════
    // "BUSCAR NO BANCO" — hoje retorna dados fixos.
    // TODO: quando existir ProdutoService, trocar por:
    //   this.produtoService.obterProdutos().subscribe(r => this.produtos = r.dados);
    // ════════════════════════════════════════════════════════════
    obterProdutos(): void {
        this.produtos = [
            {
                id: 'p-001', sku: 'CBL-USC-2M-NY', ean: '7898512340017', nome: 'Cabo USB-C 2m Nylon Trançado',
                status: 'ativo', grupo: 'Acessórios', fornecedor: 'Shenzhen Tech Import', estoque: 184,
                pesoKg: 0.09, compCm: 20, largCm: 12, altCm: 3,
                emparelhado: true, lojaEmparelhada: 'Loja Abel', idProdutoOnline: '982054932', horaEmparelhamento: '28/07/2026 10:12',
                ncm: '8544.42.00', origem: '1', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
            },
            {
                id: 'p-002', sku: 'CRG-65W-GAN', ean: '7898512340024', nome: 'Carregador 65W GaN Compact',
                status: 'ativo', grupo: 'Acessórios', fornecedor: 'Shenzhen Tech Import', estoque: 96,
                pesoKg: 0.12, compCm: 6, largCm: 6, altCm: 3,
                emparelhado: true, lojaEmparelhada: 'Loja Abel', idProdutoOnline: '982054933', horaEmparelhamento: '28/07/2026 10:12',
                ncm: '8504.40.19', origem: '1', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
            },
            {
                id: 'p-003', sku: 'MPS-XL-RGB', ean: '7898512340031', nome: 'Mousepad XL RGB 90x40cm',
                status: 'ativo', grupo: 'Periféricos', fornecedor: 'Guangzhou Gadgets Co.', estoque: 41,
                pesoKg: 0.6, compCm: 90, largCm: 40, altCm: 1,
                emparelhado: true, lojaEmparelhada: 'Loja Eletric', idProdutoOnline: '982054940', horaEmparelhamento: '30/07/2026 15:40',
                ncm: '8473.30.49', origem: '1', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
            },
            {
                id: 'p-004', sku: 'SPT-NTB-ALU', ean: '7898512340048', nome: 'Suporte Notebook Alumínio 6 Níveis',
                status: 'ativo', grupo: 'Acessórios', fornecedor: 'Guangzhou Gadgets Co.', estoque: 3,
                pesoKg: 0.85, compCm: 26, largCm: 22, altCm: 5,
                emparelhado: true, lojaEmparelhada: 'Loja Festão', idProdutoOnline: '982054951', horaEmparelhamento: '31/07/2026 09:05',
                ncm: '8473.30.49', origem: '1', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-002', tipoSaida: 'revenda' }],
            },
            {
                id: 'p-005', sku: 'SSD-480-SAT', ean: '7898512340055', nome: 'SSD 480GB SATA III 2.5"',
                status: 'ativo', grupo: 'Armazenamento', fornecedor: 'Guangzhou Gadgets Co.', estoque: 58,
                pesoKg: 0.05, compCm: 10, largCm: 7, altCm: 1,
                emparelhado: false, ncm: '8471.70.90', origem: '1', unidade: 'UN',
                classesImposto: [],
            },
            {
                id: 'p-006', sku: 'CSE-SSD-UC', ean: '7898512340062', nome: 'Case SSD Externo USB-C 3.2',
                status: 'ativo', grupo: 'Armazenamento', fornecedor: 'Guangzhou Gadgets Co.', estoque: 72,
                pesoKg: 0.04, compCm: 10, largCm: 5, altCm: 1.5,
                emparelhado: true, lojaEmparelhada: 'Tech Store', idProdutoOnline: '982054977', horaEmparelhamento: '02/08/2026 12:30',
                ncm: '8473.30.49', origem: '1', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
            },
            {
                id: 'p-007', sku: 'PEL-IPH-15', ean: '7898512340079', nome: 'Película Vidro iPhone 15 (pack 3)',
                status: 'ativo', grupo: 'Acessórios', fornecedor: 'Guangzhou Gadgets Co.', estoque: 0,
                pesoKg: 0.03, compCm: 16, largCm: 8, altCm: 1,
                emparelhado: true, lojaEmparelhada: 'Loja Abraham', idProdutoOnline: '982054988', horaEmparelhamento: '02/08/2026 16:09',
                ncm: '7007.19.00', origem: '1', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-002', tipoSaida: 'revenda' }],
            },
            {
                id: 'p-008', sku: 'SRM-VIT-C-30', ean: '7898512340086', nome: 'Sérum Facial Vitamina C 30ml',
                status: 'pausado', grupo: 'Skincare', fornecedor: 'Cosmetic Import LTDA', estoque: 27,
                pesoKg: 0.08, compCm: 4, largCm: 4, altCm: 11,
                emparelhado: false, ncm: '3304.99.90', origem: '2', unidade: 'UN',
                classesImposto: [{ contaFiscalId: 'cf-002', tipoSaida: 'fabricacao_propria' }],
            },
            {
                id: 'p-009', sku: 'HID-FAC-50', ean: '7898512340093', nome: 'Hidratante Facial 50g',
                status: 'interrompido', grupo: 'Skincare', fornecedor: 'Cosmetic Import LTDA', estoque: 0,
                emparelhado: false,
                classesImposto: [],
            },
        ];
    }

    obterKits(): void {
        this.kits = [
            {
                id: 'k-001', skuCombinado: 'KIT-SKC-BSC', nome: 'Kit Skincare Básico 5 Produtos',
                modoEnvio: 'combinado', status: 'ativo',
                itens: [
                    { produtoId: 'p-008', sku: 'SRM-VIT-C-30', nome: 'Sérum Facial Vitamina C 30ml', qtd: 1 },
                    { produtoId: 'p-009', sku: 'HID-FAC-50', nome: 'Hidratante Facial 50g', qtd: 1 },
                ],
                emparelhado: true, lojaEmparelhada: 'Loja Eletric', idProdutoOnline: '982055002',
            },
            {
                id: 'k-002', skuCombinado: 'KIT-CRG-CBL', nome: 'Kit Carregador + Cabo USB-C',
                modoEnvio: 'aleatorio', status: 'ativo',
                itens: [
                    { produtoId: 'p-001', sku: 'CBL-USC-2M-NY', nome: 'Cabo USB-C 2m Nylon Trançado', qtd: 1 },
                    { produtoId: 'p-002', sku: 'CRG-65W-GAN', nome: 'Carregador 65W GaN Compact', qtd: 1 },
                ],
                emparelhado: false,
            },
        ];
    }

    // Resumo local das contas fiscais só pra vincular produtos a um CNPJ.
    // TODO: puxar do mesmo ContaNF cadastrado em Empresas quando o FiscalService existir —
    // hoje as duas telas ainda não compartilham a mesma fonte de dados.
    obterContasFiscais(): void {
        this.contasFiscais = [
            { id: 'cf-001', razaoSocial: 'Cosmetic Club LTDA', cnpj: '12.345.678/0001-90' },
            { id: 'cf-002', razaoSocial: 'Huang Jianchun LTDA', cnpj: '98.765.432/0001-10' },
        ];
    }

    // ════════════════════════════════════════════════════════════
    // FILTROS / LISTAGEM
    // ════════════════════════════════════════════════════════════
    get produtosFiltrados(): Produto[] {
        const termo = this.busca.trim().toLowerCase();
        return this.produtos.filter(p => {
            if (this.filtroStatus !== 'todos' && p.status !== this.filtroStatus) return false;
            if (termo && !p.sku.toLowerCase().includes(termo) && !p.nome.toLowerCase().includes(termo)) return false;
            return true;
        });
    }

    get kitsFiltrados(): ProdutoKit[] {
        const termo = this.busca.trim().toLowerCase();
        return this.kits.filter(k => {
            if (this.filtroStatus !== 'todos' && k.status !== this.filtroStatus) return false;
            if (termo && !k.skuCombinado.toLowerCase().includes(termo) && !k.nome.toLowerCase().includes(termo)) return false;
            return true;
        });
    }

    // Produtos disponíveis pra entrar num kit (exclui os que já estão nele)
    get produtosParaAssociar(): Produto[] {
        const jaNoKit = new Set((this.kitForm.itens ?? []).map(i => i.produtoId));
        const termo = this.buscaAssociar.trim().toLowerCase();
        return this.produtos.filter(p => {
            if (jaNoKit.has(p.id)) return false;
            if (!termo) return true;
            return p.sku.toLowerCase().includes(termo) || p.nome.toLowerCase().includes(termo);
        });
    }

    // ════════════════════════════════════════════════════════════
    // NAVEGAÇÃO ENTRE LISTA / FORMULÁRIOS
    // ════════════════════════════════════════════════════════════
    novoProduto(): void {
        this.editingProdutoId = null;
        this.produtoForm = { status: 'ativo', estoque: 0, unidade: 'UN', classesImposto: [] };
        this.tabProduto = 'basicas';
        this.view = 'form-produto';
    }

    editarProduto(p: Produto): void {
        this.editingProdutoId = p.id;
        this.produtoForm = { ...p, classesImposto: p.classesImposto.map(c => ({ ...c })) };
        this.tabProduto = 'basicas';
        this.view = 'form-produto';
    }

    novoKit(): void {
        this.editingKitId = null;
        this.kitForm = { status: 'ativo', modoEnvio: 'combinado', itens: [] };
        this.tabKit = 'basicas';
        this.buscaAssociar = '';
        this.view = 'form-kit';
    }

    editarKit(k: ProdutoKit): void {
        this.editingKitId = k.id;
        this.kitForm = { ...k, itens: k.itens.map(i => ({ ...i })) };
        this.tabKit = 'basicas';
        this.buscaAssociar = '';
        this.view = 'form-kit';
    }

    voltarLista(): void {
        this.view = 'list';
    }

    // ════════════════════════════════════════════════════════════
    // SALVAR — hoje só grava em memória.
    // TODO: quando existir ProdutoService, trocar por chamada HTTP
    // (POST pra novo, PUT pra edição) e recarregar obterProdutos().
    // ════════════════════════════════════════════════════════════
    salvarProduto(): void {
        if (!this.produtoForm.sku || !this.produtoForm.nome) {
            this.messageService.add({ severity: 'warn', summary: 'Campos obrigatórios', detail: 'Preencha ao menos SKU e Nome do produto.', life: 3000 });
            return;
        }

        if (this.editingProdutoId) {
            const idx = this.produtos.findIndex(p => p.id === this.editingProdutoId);
            if (idx >= 0) this.produtos[idx] = { ...(this.produtos[idx]), ...this.produtoForm } as Produto;
        } else {
            this.produtos.unshift({
                id: uuid(),
                emparelhado: false,
                classesImposto: [],
                estoque: 0,
                ...this.produtoForm,
            } as Produto);
        }

        this.messageService.add({ severity: 'success', summary: 'Produto salvo', life: 2500 });
        this.view = 'list';
    }

    salvarKit(): void {
        if (!this.kitForm.skuCombinado || !this.kitForm.nome) {
            this.messageService.add({ severity: 'warn', summary: 'Campos obrigatórios', detail: 'Preencha ao menos o SKU combinado e o Nome do kit.', life: 3000 });
            return;
        }
        if (!this.kitForm.itens || this.kitForm.itens.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Associe ao menos 1 produto', detail: 'Um kit precisa ter pelo menos um produto associado.', life: 3000 });
            return;
        }

        if (this.editingKitId) {
            const idx = this.kits.findIndex(k => k.id === this.editingKitId);
            if (idx >= 0) this.kits[idx] = { ...(this.kits[idx]), ...this.kitForm } as ProdutoKit;
        } else {
            this.kits.unshift({
                id: uuid(),
                emparelhado: false,
                ...this.kitForm,
            } as ProdutoKit);
        }

        this.messageService.add({ severity: 'success', summary: 'Produto combinado salvo', life: 2500 });
        this.view = 'list';
    }

    // ════════════════════════════════════════════════════════════
    // CLASSE DE IMPOSTO — vínculo do produto com uma conta fiscal (CNPJ)
    // ════════════════════════════════════════════════════════════
    contaVinculada(contaId: string): ClasseImposto | undefined {
        return (this.produtoForm.classesImposto ?? []).find(c => c.contaFiscalId === contaId);
    }

    toggleContaFiscal(contaId: string): void {
        const lista = this.produtoForm.classesImposto ?? (this.produtoForm.classesImposto = []);
        const idx = lista.findIndex(c => c.contaFiscalId === contaId);
        if (idx >= 0) {
            lista.splice(idx, 1);
        } else {
            lista.push({ contaFiscalId: contaId, tipoSaida: 'revenda' });
        }
    }

    definirTipoSaida(contaId: string, tipo: 'revenda' | 'fabricacao_propria'): void {
        const item = this.contaVinculada(contaId);
        if (item) item.tipoSaida = tipo;
    }

    // ════════════════════════════════════════════════════════════
    // ASSOCIAR PRODUTOS AO KIT
    // ════════════════════════════════════════════════════════════
    adicionarAoKit(p: Produto): void {
        const item: ItemKit = { produtoId: p.id, sku: p.sku, nome: p.nome, imagemUrl: p.imagemUrl, qtd: 1 };
        (this.kitForm.itens ?? (this.kitForm.itens = [])).push(item);
    }

    removerDoKit(index: number): void {
        this.kitForm.itens?.splice(index, 1);
    }

    alterarQtdKit(index: number, delta: number): void {
        const item = this.kitForm.itens?.[index];
        if (!item) return;
        item.qtd = Math.max(1, item.qtd + delta);
    }

    // ════════════════════════════════════════════════════════════
    // HELPERS DE EXIBIÇÃO
    // ════════════════════════════════════════════════════════════
    contaNome(contaId: string): string {
        return this.contasFiscais.find(c => c.id === contaId)?.razaoSocial ?? '—';
    }

    origemLabel(codigo?: string): string {
        return this.ORIGENS_PRODUTO.find(o => o.codigo === codigo)?.label ?? '—';
    }

    statusLabel(status: StatusProduto): string {
        return { ativo: 'Ativo', pausado: 'Pausado', interrompido: 'Interrompido' }[status];
    }

    statusClass(status: StatusProduto): string {
        return { ativo: 'st-ativo', pausado: 'st-pausado', interrompido: 'st-interrompido' }[status];
    }
}

// ── Produtos / Catálogo ──────────────────────────────────────────
// Convenção do projeto: só Component + Model por enquanto.
// TODO: quando existir ProdutoService, os métodos "obter..." do
// ProdutosComponent trocam os mocks abaixo por chamadas HTTP reais.

export type StatusProduto = 'ativo' | 'pausado' | 'interrompido';
export type ModoEnvioKit = 'aleatorio' | 'combinado';
export type TipoSaida = 'revenda' | 'fabricacao_propria';

// Código de origem da mercadoria — tabela padrão da NF-e (CST/CSOSN, dígito de origem)
export interface OrigemProdutoOpcao {
    codigo: string; // '0' a '7'
    label: string;
}

export const ORIGENS_PRODUTO: OrigemProdutoOpcao[] = [
    { codigo: '0', label: '0 - Nacional' },
    { codigo: '1', label: '1 - Estrangeira - Importação direta' },
    { codigo: '2', label: '2 - Estrangeira - Adquirida no mercado interno' },
    { codigo: '3', label: '3 - Nacional, com Conteúdo de Importação > 40% e ≤ 70%' },
    { codigo: '4', label: '4 - Nacional, produção conforme processos produtivos básicos' },
    { codigo: '5', label: '5 - Nacional, com Conteúdo de Importação ≤ 40%' },
    { codigo: '6', label: '6 - Estrangeira - Importação direta, sem similar nacional' },
    { codigo: '7', label: '7 - Estrangeira - Adquirida no mercado interno, sem similar nacional' },
];

export const UNIDADES_PRODUTO: string[] = ['UN', 'PC', 'KG', 'GR', 'MG', 'HR', 'SC', 'DZ', 'PAR', 'CX'];

// Resumo de uma conta fiscal (CNPJ) só pro produto se vincular a ela.
// TODO: quando o FiscalService existir de verdade, isso deve vir do
// mesmo ContaNF cadastrado na aba Empresas (src/api/fiscal.model.ts),
// não de um mock local — hoje as duas listas não se conversam ainda.
export interface ContaFiscalResumo {
    id: string;
    razaoSocial: string;
    cnpj: string;
}

// Uma "Classe de imposto" = vínculo do produto com uma conta fiscal (CNPJ) + o tipo de saída
export interface ClasseImposto {
    contaFiscalId: string;
    tipoSaida: TipoSaida;
}

export interface Produto {
    id: string;
    sku: string;
    skuPai?: string;
    ean?: string;
    nome: string;
    imagemUrl?: string;
    status: StatusProduto;
    grupo?: string;
    fornecedor?: string;

    // Estoque próprio do ERP — abatido a cada pedido emitido
    estoque: number;
    estoqueMinimo?: number; // usado pelo módulo de Estoque pra alertar ruptura

    // Preço de venda — usado pelo módulo de Estoque (valor total em estoque) e Curva ABC
    precoVenda?: number;

    pesoKg?: number;
    compCm?: number;
    largCm?: number;
    altCm?: number;

    // Vínculo com o anúncio do marketplace, criado na sincronização.
    // TODO: quando existir IntegracoesService, isso reflete o emparelhamento real.
    emparelhado: boolean;
    lojaEmparelhada?: string;
    idProdutoOnline?: string;
    horaEmparelhamento?: string;

    // Fiscal — preenchido manualmente pelo usuário no "Editar"
    ncm?: string;
    origem?: string; // código de ORIGENS_PRODUTO
    unidade?: string;
    classesImposto: ClasseImposto[];
}

export interface ItemKit {
    produtoId: string;
    sku: string;
    nome: string;
    imagemUrl?: string;
    qtd: number;
}

export interface ProdutoKit {
    id: string;
    skuCombinado: string;
    nome: string;
    modoEnvio: ModoEnvioKit;
    status: StatusProduto;
    itens: ItemKit[];

    emparelhado: boolean;
    lojaEmparelhada?: string;
    idProdutoOnline?: string;
}

// Catálogo mockado compartilhado entre Produtos e Estoque — mesma fonte,
// pra não ter dois "bancos" fictícios divergentes no protótipo.
// TODO: quando existir ProdutoService, isso deixa de existir e cada
// componente busca a lista real via API.
export const MOCK_PRODUTOS: Produto[] = [
    {
        id: 'p-001', sku: 'CBL-USC-2M-NY', ean: '7898512340017', nome: 'Cabo USB-C 2m Nylon Trançado',
        status: 'ativo', grupo: 'Acessórios', fornecedor: 'Shenzhen Tech Import', estoque: 184, estoqueMinimo: 30, precoVenda: 89.90,
        pesoKg: 0.09, compCm: 20, largCm: 12, altCm: 3,
        emparelhado: true, lojaEmparelhada: 'Loja Abel', idProdutoOnline: '982054932', horaEmparelhamento: '28/07/2026 10:12',
        ncm: '8544.42.00', origem: '1', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
    },
    {
        id: 'p-002', sku: 'CRG-65W-GAN', ean: '7898512340024', nome: 'Carregador 65W GaN Compact',
        status: 'ativo', grupo: 'Acessórios', fornecedor: 'Shenzhen Tech Import', estoque: 96, estoqueMinimo: 20, precoVenda: 169.90,
        pesoKg: 0.12, compCm: 6, largCm: 6, altCm: 3,
        emparelhado: true, lojaEmparelhada: 'Loja Abel', idProdutoOnline: '982054933', horaEmparelhamento: '28/07/2026 10:12',
        ncm: '8504.40.19', origem: '1', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
    },
    {
        id: 'p-003', sku: 'MPS-XL-RGB', ean: '7898512340031', nome: 'Mousepad XL RGB 90x40cm',
        status: 'ativo', grupo: 'Periféricos', fornecedor: 'Guangzhou Gadgets Co.', estoque: 41, estoqueMinimo: 15, precoVenda: 129.90,
        pesoKg: 0.6, compCm: 90, largCm: 40, altCm: 1,
        emparelhado: true, lojaEmparelhada: 'Loja Eletric', idProdutoOnline: '982054940', horaEmparelhamento: '30/07/2026 15:40',
        ncm: '8473.30.49', origem: '1', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
    },
    {
        id: 'p-004', sku: 'SPT-NTB-ALU', ean: '7898512340048', nome: 'Suporte Notebook Alumínio 6 Níveis',
        status: 'ativo', grupo: 'Acessórios', fornecedor: 'Guangzhou Gadgets Co.', estoque: 3, estoqueMinimo: 10, precoVenda: 87.50,
        pesoKg: 0.85, compCm: 26, largCm: 22, altCm: 5,
        emparelhado: true, lojaEmparelhada: 'Loja Festão', idProdutoOnline: '982054951', horaEmparelhamento: '31/07/2026 09:05',
        ncm: '8473.30.49', origem: '1', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-002', tipoSaida: 'revenda' }],
    },
    {
        id: 'p-005', sku: 'SSD-480-SAT', ean: '7898512340055', nome: 'SSD 480GB SATA III 2.5"',
        status: 'ativo', grupo: 'Armazenamento', fornecedor: 'Guangzhou Gadgets Co.', estoque: 58, estoqueMinimo: 15, precoVenda: 199.00,
        pesoKg: 0.05, compCm: 10, largCm: 7, altCm: 1,
        emparelhado: false, ncm: '8471.70.90', origem: '1', unidade: 'UN',
        classesImposto: [],
    },
    {
        id: 'p-006', sku: 'CSE-SSD-UC', ean: '7898512340062', nome: 'Case SSD Externo USB-C 3.2',
        status: 'ativo', grupo: 'Armazenamento', fornecedor: 'Guangzhou Gadgets Co.', estoque: 72, estoqueMinimo: 20, precoVenda: 57.00,
        pesoKg: 0.04, compCm: 10, largCm: 5, altCm: 1.5,
        emparelhado: true, lojaEmparelhada: 'Tech Store', idProdutoOnline: '982054977', horaEmparelhamento: '02/08/2026 12:30',
        ncm: '8473.30.49', origem: '1', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-001', tipoSaida: 'revenda' }],
    },
    {
        id: 'p-007', sku: 'PEL-IPH-15', ean: '7898512340079', nome: 'Película Vidro iPhone 15 (pack 3)',
        status: 'ativo', grupo: 'Acessórios', fornecedor: 'Guangzhou Gadgets Co.', estoque: 0, estoqueMinimo: 25, precoVenda: 26.00,
        pesoKg: 0.03, compCm: 16, largCm: 8, altCm: 1,
        emparelhado: true, lojaEmparelhada: 'Loja Abraham', idProdutoOnline: '982054988', horaEmparelhamento: '02/08/2026 16:09',
        ncm: '7007.19.00', origem: '1', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-002', tipoSaida: 'revenda' }],
    },
    {
        id: 'p-008', sku: 'SRM-VIT-C-30', ean: '7898512340086', nome: 'Sérum Facial Vitamina C 30ml',
        status: 'pausado', grupo: 'Skincare', fornecedor: 'Cosmetic Import LTDA', estoque: 27, estoqueMinimo: 12, precoVenda: 89.90,
        pesoKg: 0.08, compCm: 4, largCm: 4, altCm: 11,
        emparelhado: false, ncm: '3304.99.90', origem: '2', unidade: 'UN',
        classesImposto: [{ contaFiscalId: 'cf-002', tipoSaida: 'fabricacao_propria' }],
    },
    {
        id: 'p-009', sku: 'HID-FAC-50', ean: '7898512340093', nome: 'Hidratante Facial 50g',
        status: 'interrompido', grupo: 'Skincare', fornecedor: 'Cosmetic Import LTDA', estoque: 0, estoqueMinimo: 10, precoVenda: 39.90,
        emparelhado: false,
        classesImposto: [],
    },
];

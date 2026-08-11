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

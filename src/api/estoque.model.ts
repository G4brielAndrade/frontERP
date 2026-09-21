// ── Estoque ───────────────────────────────────────────────────────
// Convenção do projeto: só Component + Model por enquanto.
// TODO: quando existir EstoqueService, os métodos "obter..." do
// EstoqueComponent trocam os mocks por chamadas HTTP reais — e o
// "reservado" passa a vir de fato da soma de pedidos pendentes,
// não de um número mockado por produto.

export type TipoMovimentacao = 'entrada' | 'saida' | 'ajuste';

export type MotivoMovimentacao =
    | 'venda' | 'cancelamento' | 'devolucao' | 'compra' | 'ajuste_manual' | 'inventario';

export const MOTIVOS_MOVIMENTACAO: Record<MotivoMovimentacao, string> = {
    venda: 'Venda (pedido emitido)',
    cancelamento: 'Cancelamento de NF-e',
    devolucao: 'Devolução',
    compra: 'Entrada de compra/reposição',
    ajuste_manual: 'Ajuste manual',
    inventario: 'Conferência de inventário',
};

export interface MovimentacaoEstoque {
    id: string;
    produtoId: string;
    sku: string;
    nomeProduto: string;
    tipo: TipoMovimentacao;
    quantidade: number; // sempre positivo — o sinal é dado pelo "tipo"
    motivo: MotivoMovimentacao;
    observacao?: string;
    saldoResultante: number;
    data: string; // dd/mm/yyyy HH:mm
    usuario: string;
    referenciaPedido?: string;
}

export type StatusEstoque = 'ok' | 'baixo' | 'zerado';

// Visão consolidada de estoque por produto (o que a tela "Níveis de Estoque" lista)
export interface NivelEstoque {
    produtoId: string;
    sku: string;
    nome: string;
    imagemUrl?: string;
    grupo?: string;
    estoqueAtual: number;
    reservado: number;   // TODO: hoje mockado; no backend = soma de pedidos pendentes de emissão/envio
    disponivel: number;  // estoqueAtual - reservado
    estoqueMinimo: number;
    precoVenda: number;
    valorEmEstoque: number; // estoqueAtual * precoVenda
    status: StatusEstoque;
}

export type ClasseABC = 'A' | 'B' | 'C';

export interface FaixaABC {
    produtoId: string;
    sku: string;
    nome: string;
    receita30d: number;
    participacao: number;          // % da receita total no período
    participacaoAcumulada: number; // % acumulado (curva)
    classe: ClasseABC;
}

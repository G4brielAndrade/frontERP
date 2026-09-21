import { Marketplace } from './pedido.model';

// ── Relatórios ────────────────────────────────────────────────────
// Convenção do projeto: só Component + Model por enquanto.
// TODO: quando existir RelatorioService, o RelatoriosComponent troca
// os mocks abaixo por chamadas HTTP reais (provavelmente agregadas
// no backend, já que somar pedido a pedido no front não escala).

export type PeriodoRelatorio = '7d' | '30d' | '90d' | '12m' | 'personalizado';

export interface LojaResumo {
    id: string;
    nome: string;
    marketplace: Marketplace;
}

// Uma linha da tabela detalhada (1 dia)
export interface LinhaRelatorioDiario {
    data: string;       // ISO yyyy-mm-dd
    dataLabel: string;  // dd/mm
    pedidos: number;
    produtos: number;
    receitaLiquida: number;
    despesas: number;
    outrasReceitas: number;
    lucro: number;
    margemLucro: number; // %
}

// Cartão de resumo no topo — valor atual + variação (%) vs período anterior equivalente
export interface IndicadorComTendencia {
    valor: number;
    deltaPercentual: number; // pode ser negativo
}

export interface ResumoRelatorio {
    receitaLiquida: IndicadorComTendencia;
    qtdPedidos: IndicadorComTendencia;
    ticketMedio: IndicadorComTendencia;
    margemLucro: IndicadorComTendencia;
}

export interface FatiaPorLoja {
    lojaId: string;
    nome: string;
    marketplace: Marketplace;
    receita: number;
    percentual: number;
}

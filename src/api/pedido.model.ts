// ── Tipos centrais do módulo Pedidos ───────────────────────────
// Espelha as interfaces do protótipo original (erp-fiscal-ts)

export type Marketplace = 'mercadolivre' | 'shopee' | 'amazon' | 'nuvemshop';

export type OrderStatus = 'pendente' | 'emitindo' | 'emitida' | 'erro' | 'cancelada';

export type NFeStepState = 'idle' | 'active' | 'done' | 'error';

// ── Item de pedido ─────────────────────────────────────────────
export interface OrderItem {
    name: string;
    sku: string;
    ncm: string;
    qty: number;
    price: string;
}

// ── NF-e emitida ───────────────────────────────────────────────
export interface NFeData {
    chNFe: string;
    protocolo: string;
    emitidaEm: string;
    serie: string;
    numero: string;
    // Prazo de validade pra retirada/postagem, exibido na etiqueta DANFE simplificada.
    // TODO: hoje calculado no front (emissão + N dias); no backend deve vir pronto da regra fiscal/logística.
    vencimento: string;
    danfeUrl?: string;
    xmlUrl?: string;
}

// ── Erro SEFAZ ──────────────────────────────────────────────────
export interface NFeError {
    mensagem: string;
    codigoErro: string;
}

// ── Pedido ──────────────────────────────────────────────────────
export interface Order {
    id: string;
    mkt: Marketplace;
    buyer: string;
    email: string;
    cpf: string;
    val: string;
    valNum: number;
    status: OrderStatus;
    cidade: string;
    cep: string;
    frete: string;
    prazo: string;
    items: OrderItem[];
    nfe?: NFeData;
    error?: NFeError;
}

// ── Métricas do dia ─────────────────────────────────────────────
export interface DayMetrics {
    total: number;
    emitidas: number;
    pending: number;
    errors: number;
}

// ── Resultado de uma emissão de NF-e ────────────────────────────
export interface EmissaoResult {
    success: boolean;
    nfe?: NFeData;
    error?: NFeError;
}

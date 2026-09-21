import { Marketplace } from './pedido.model';

export type TipoTributacao = 'mei' | 'simples' | 'normal' | '';
export type TipoUnidade = 'matriz' | 'filial' | '';

// ── Loja integrada (mock — virá do módulo Integrações) ──────────
export interface LojaIntegrada {
    id: string;
    nome: string;
    marketplace: Marketplace;
}

// ── Certificado A1 ───────────────────────────────────────────────
export interface CertificadoA1 {
    fileName: string | null;
    uploadedAt: string | null;
    validade: string | null;
    senha: string | null; // NUNCA em texto puro em produção
}

// ── Conta de NF ───────────────────────────────────────────────────
// Representa um CNPJ emitente com suas lojas vinculadas
export interface ContaNF {
    id: string; // UUID gerado no cliente, persistido no backend
    razaoSocial: string;
    cnpj: string;
    inscricaoEstadual: string;
    tipoTributacao: TipoTributacao;
    tipoUnidade: TipoUnidade;
    email: string;

    // Endereço
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;

    // Configuração NF-e
    serieNFe: string;
    proximoNumero: string;

    // Certificado digital
    certificado: CertificadoA1;

    // Lojas vinculadas (IDs de LojaIntegrada)
    lojasVinculadas: string[];
}

export const UFS: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

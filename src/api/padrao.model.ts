// Paginacao interface
export interface Paginacao {
    numeroPagina: number;
    tamanhoPagina: number;
    quantidadeRegistrosFiltrados: number;
    quantidadeTotalRegistros: number;
    quantidadePaginas: number;
}

// Ordenacao interface
export interface Ordenacao {
    ordenarPor: string;
    direcaoOrdenacao: string;
}

// Filtro interface
export interface Filtro {
    filtrarPor: string;
    valor: string;
}

// ApiResponse interface
export interface ApiResponse {
    dados: any;
    statusCode: number;
    paginacao: Paginacao;
    ordenacao: Ordenacao;
    filtro: Filtro;
}

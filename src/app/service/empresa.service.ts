import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "src/api/padrao.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmpresaService {
    private empresaUrl = `${environment.apiUrl}/Empresa`;

    constructor(private httpClient: HttpClient) {
    }

    obterEmpresas(): Observable<ApiResponse> {
        const url = `${this.empresaUrl}/retornar-lista-de-empresas?TamanhoPagina=1000&DirecaoOrdenacao=asc&OrdenarPor=razaoSocial`;
        return this.httpClient.get<ApiResponse>(url);
    }

    obterEmpresaPorId(id: string): Observable<ApiResponse> {
        const url = `${this.empresaUrl}/get-empresa-by-id?id=${id}`;
        return this.httpClient.get<ApiResponse>(url);
    }

    obterEmpresasComFiltro(filtro: string): Observable<ApiResponse> {
        const url = `${this.empresaUrl}?FiltrarPor=nome&ValorFiltro=${filtro}`;
        return this.httpClient.get<ApiResponse>(url);
    }

    cadastrarEmpresa(empresa: any): Observable<any> {
        return this.httpClient.post<any>(this.empresaUrl + '/criar-empresas', empresa);
    }

    atualizarEmpresa(empresa: any): Observable<any> {
        return this.httpClient.put<any>(this.empresaUrl + '/atualiza-empresas', empresa);
    }

    deletarEmpresas(payload: any): Observable<any> {
        return this.httpClient.delete<any>(this.empresaUrl + '/remove-empresas', { body: payload });
    }
}


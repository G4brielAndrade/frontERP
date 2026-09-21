import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { jwtDecode } from 'jwt-decode';
//const jwt_decode = require('jwt-decode');
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authUrl = `${environment.apiUrl}/Auth`;

    //-----------------------
    private claims: Set<string> = new Set();

    setClaims(claims: string[]): void {
        this.claims = new Set(claims);
    }

    hasClaim(claim: string): boolean {
        return this.claims.has(claim);
    }

    getClaims(): string[] {
        return Array.from(this.claims);
    }

    loadClaims(): Promise<void> {
        const userId = this.getUserIdFromToken(); // Usa o accessToken atual
        if (!userId) return Promise.resolve();

        return this.httpClient.get<string[]>(this.authUrl + `/${userId}/claims`)
            .toPromise()
            .then(claims => this.setClaims(claims));
    }

    getUserIdFromToken(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.UserId || null;
        } catch {
            return null;
        }
    }
    //-----------------------

    constructor(private httpClient: HttpClient, private router: Router) { }

    login(auth: any): Observable<any> {
        return this.httpClient.post<any>(this.authUrl, auth);
    }

    setToken(token: string) {
        localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    logout(): Observable<any> {
        return this.httpClient.post<any>(this.authUrl + "/logout", null);
    }

    isTokenExpired(): boolean {
        const token = this.getToken();

        if (!token) {
            return true;  // Se não há token, considere-o como expirado
        }

        try {
            const decodedToken: any = jwtDecode(token);  // Função decode usada aqui
            const expirationTime = decodedToken.exp * 1000; // Converte para milissegundos
            const currentTime = Date.now();

            return currentTime > expirationTime;  // Verifica se o token está expirado
        } catch (error) {
            console.error('Erro ao decodificar o token', error);
            return true;  // Em caso de erro, considera o token como expirado
        }
    }

    atualizarSenha(atualizarSenha: any): Observable<any> {
        return this.httpClient.post<any>(this.authUrl + '/alterar-senha', atualizarSenha);
    }
}

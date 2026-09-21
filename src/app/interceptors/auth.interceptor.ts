import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();

        // Verifica se o token está expirado antes de enviar a requisição
        if (authToken && !this.authService.isTokenExpired()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        } else if (authToken && this.authService.isTokenExpired()) {
            this.authService.logout(); // Se o token está expirado, realiza o logout
        }

        //return next.handle(request);

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 0) {
                    // Tratar erro de CORS, Banco de dados ou Redis. Informe o administrador do sistema
                    this.notificationService.setMessage('Sua sessão expirou. Faça login novamente.');
                    this.router.navigate(['/auth/login']);
                }
                if (error.status === 401) {
                    this.authService.logout(); // Clear the token
                    this.notificationService.setMessage('Sua sessão expirou. Faça login novamente.');
                    this.router.navigate(['/auth/login']); // Redirect to login page
                }
                else if (error.status === 403) {
                    // Armazena a URL atual antes de redirecionar para "Acesso Negado"
                    localStorage.setItem('lastAttemptedUrl', this.router.url);

                    this.notificationService.setMessage('Você não tem permissão para acessar esta funcionalidade.');

                    // Redireciona para a página de acesso negado
                    this.router.navigate(['/auth/access']);
                }
                return throwError(error);
            })
        );
    }
}

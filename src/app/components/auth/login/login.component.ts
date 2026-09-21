import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { Auth } from 'src/api/auth.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    //errorMessage: string = '';
    auth: Auth = this.initializeAuth();
    submitted: boolean = false;
    authDialog: boolean = false;
    message: string = '';
    exibirLembreMe: boolean = false; // Define como falso para esconder o checkbox


    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        private notificationService: NotificationService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        setTimeout(() => { //Se o MessageService está sendo chamado antes do DOM do LoginComponent ser totalmente carregado, um atraso pode resolver o problema de não exibir a mensagem de sucesso ao deslogar
            const logoutMessage = localStorage.getItem('logoutMessage');
            if (logoutMessage) {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: logoutMessage, life: 3000 });
                localStorage.removeItem('logoutMessage');
            }

            this.message = this.notificationService.getMessage();
            if (this.message) {
                this.messageService.add({ severity: 'error', summary: 'Atenção', detail: this.message, life: 3000 });
            }
        }, 0);
    }

    // Login chamando o backend, sera inserido depois
    //login(): void {
    //    this.submitted = true;

    //    const payload = {
    //        indice: 0,
    //        formulario: {
    //            user: this.auth.user,
    //            password: this.auth.password,
    //            endActiveSessions: this.auth.endActiveSessions
    //        }
    //    };

    //    this.spinner.show();

    //    const observer = {
    //        next: (response: any) => {
    //            this.spinner.hide();

    //            const message = 'Login autorizado';
    //            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
    //            this.authDialog = false;
    //            this.auth = this.initializeAuth();

    //            if (response.formulario.token.authenticated) {
    //                this.authService.setToken(response.formulario.token.accessToken);

    //                this.authService.loadClaims().then(() => {
    //                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //                    this.router.navigate([returnUrl]);
    //                }).catch(error => {
    //                    this.spinner.hide();
    //                    this.messageService.add({
    //                        severity: 'error',
    //                        summary: 'Erro ao carregar permissões',
    //                        detail: 'Não foi possível carregar as permissões de acesso.',
    //                        life: 3000
    //                    });
    //                });
    //            }

    //        },
    //        error: (error: any) => {
    //            if (error.error && error.error.erros && error.error.erros.length > 0) {
    //                error.error.erros.forEach((err: any) => {
    //                    const errorMessage = `Campo: ${err.nomePropriedade} - ${err.mensagem}`;
    //                    this.messageService.add({
    //                        severity: 'error',
    //                        summary: `Campo: '${err.nomePropriedade}'`,
    //                        detail: err.mensagem,
    //                        life: 5000
    //                    });
    //                });
    //            } else if (error.status === 401) {
    //                const errorMessage = error.error.errors;
    //                this.messageService.add({ severity: 'error', summary: 'Atenção', detail: errorMessage, life: 3000 });
    //            } else {
    //                console.log("Erro: ", error);
    //                const errorMessage = 'Erro ao tentar autenticar.';
    //                this.messageService.add({ severity: 'error', summary: 'Atenção', detail: errorMessage, life: 3000 });
    //            }

    //            this.spinner.hide();
    //        }
    //    };

    //    this.authService.login(payload).subscribe(observer);
    //}

    // sem chamar o backend
    login(): void {
        this.submitted = true;

        this.spinner.show();

        setTimeout(() => {
            if (this.auth.user === 'Teste' && this.auth.password === 'ComoCuDoGabriel') {

                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Login autorizado',
                    life: 3000
                });

                this.authService.setToken('fake-token');
                this.authService.loadClaims().then(() => {
                    this.router.navigate(['/']);
                });

            } else {

                this.messageService.add({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: 'Usuário ou senha inválidos',
                    life: 3000
                });
            }

            this.spinner.hide();

        }, 500);
    }

    initializeAuth(): Auth {
        return {
            user: '',
            password: '',
            endActiveSessions: false
        };
    }
}

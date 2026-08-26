import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService]
})
export class AppTopBarComponent {

    constructor(
        private router: Router,
        private http: HttpClient,
        public layoutService: LayoutService,
        private messageService: MessageService,
        private authService: AuthService
    ) { }

    // Alterna entre os temas lara-dark-indigo / lara-light-indigo, reaproveitando
    // o mesmo mecanismo de troca de theme.css que o painel de Configurações usa.
    toggleColorScheme(): void {
        const novoEsquema = this.layoutService.config().colorScheme === 'dark' ? 'light' : 'dark';
        const novoTema = novoEsquema === 'dark' ? 'lara-dark-indigo' : 'lara-light-indigo';
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: novoEsquema,
            theme: novoTema,
        }));
    }

    logout() {
        const observer = {
            next: () => {
                localStorage.setItem('logoutMessage', 'Você saiu do sistema com sucesso.');
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData'); //Não sei se realmente é preciso
                this.router.navigate(['/auth/login']);
            },
            error: (err) => {
                console.error('Erro ao realizar logout:', err);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao sair do sistema. Tente novamente.', life: 5000 });
            }
        };

        this.authService.logout().subscribe(observer);
    }

    items!: MenuItem[];

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
}

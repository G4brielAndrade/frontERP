import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

interface NavItem {
    label: string;
    icon: string;
    route?: string;   // se tiver rota, navega de verdade
    exact?: boolean;  // usa match exato de rota (evita '/' ficar sempre "ativo")
    disponivel: boolean; // módulos ainda não migrados mostram aviso
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    styleUrls: ['./app.sidebar.component.scss'],
    providers: [MessageService]
})
export class AppSidebarComponent {

    readonly navItemsPrincipal: NavItem[] = [
        { label: 'Início', icon: 'pi-home', route: '/', exact: true, disponivel: true },
    ];

    readonly navItems: NavItem[] = [
        { label: 'Pedidos', icon: 'pi-shopping-cart', route: '/pedidos', disponivel: true },
        { label: 'Empresas', icon: 'pi-building', route: '/fiscal', disponivel: true },
        { label: 'Etiquetas', icon: 'pi-print', disponivel: false },
    ];

    readonly navItemsSecundario: NavItem[] = [
        { label: 'Produtos', icon: 'pi-box', route: '/produtos', disponivel: true },
        { label: 'Estoque', icon: 'pi-warehouse', disponivel: false },
    ];

    readonly navItemsIntegracoes: NavItem[] = [
        { label: 'Integrações', icon: 'pi-sitemap', disponivel: false },
    ];

    constructor(
        private layoutService: LayoutService,
        private messageService: MessageService
    ) { }

    onNavClick(item: NavItem, event: Event): void {
        if (!item.disponivel) {
            event.preventDefault();
            this.messageService.add({
                severity: 'info',
                summary: item.label,
                detail: 'Módulo em desenvolvimento.',
                life: 2500
            });
        }
    }

    abrirConfiguracoes(): void {
        this.layoutService.showConfigSidebar();
    }
}

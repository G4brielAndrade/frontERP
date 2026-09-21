import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
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
        { label: 'shell.sidebar.home', icon: 'pi-home', route: '/', exact: true, disponivel: true },
    ];

    readonly navItems: NavItem[] = [
        { label: 'shell.sidebar.orders', icon: 'pi-shopping-cart', route: '/pedidos', disponivel: true },
        { label: 'shell.sidebar.companies', icon: 'pi-building', route: '/fiscal', disponivel: true },
        { label: 'shell.sidebar.reports', icon: 'pi-chart-line', route: '/relatorios', disponivel: true },
    ];

    readonly navItemsSecundario: NavItem[] = [
        { label: 'shell.sidebar.products', icon: 'pi-box', route: '/produtos', disponivel: true },
        { label: 'shell.sidebar.stock', icon: 'pi-database', route: '/estoque', disponivel: true },
    ];

    readonly navItemsIntegracoes: NavItem[] = [
        { label: 'shell.sidebar.integrations', icon: 'pi-sitemap', disponivel: false },
    ];

    constructor(
        private layoutService: LayoutService,
        private messageService: MessageService,
        private translate: TranslateService
    ) { }

    onNavClick(item: NavItem, event: Event): void {
        if (!item.disponivel) {
            event.preventDefault();
            this.messageService.add({
                severity: 'info',
                summary: this.translate.instant(item.label),
                detail: this.translate.instant('shell.sidebar.module_in_progress'),
                life: 2500
            });
        }
    }

    abrirConfiguracoes(): void {
        this.layoutService.showConfigSidebar();
    }
}

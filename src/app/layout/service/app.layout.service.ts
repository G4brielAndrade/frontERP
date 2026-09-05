import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private static readonly STORAGE_KEY = 'ultraerp-theme-preference';

    private static lerPreferenciaSalva(): { colorScheme: string; theme: string } | null {
        try {
            const raw = localStorage.getItem(LayoutService.STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }

    _config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'dark',
        theme: 'lara-dark-indigo',
        scale: 14,
        ...(LayoutService.lerPreferenciaSalva() ?? {}),
    };

    config = signal<AppConfig>(this._config);

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        effect(() => {
            const config = this.config();
            if (this.updateStyle(config)) {
                this.changeTheme();
            }
            this.changeScale(config.scale);
            this.onConfigUpdate();

            // Espelha a classe de tema no <body> também: painéis do PrimeNG
            // com appendTo="body" (os p-dropdown) viram filhos diretos do
            // <body>, fora de .layout-wrapper — sem isso eles não enxergam
            // as variáveis de cor do tema Nexus (ver _nexus-theme.scss).
            document.body.classList.toggle('layout-theme-dark', config.colorScheme === 'dark');
            document.body.classList.toggle('layout-theme-light', config.colorScheme === 'light');

            try {
                localStorage.setItem(LayoutService.STORAGE_KEY, JSON.stringify({
                    colorScheme: config.colorScheme,
                    theme: config.theme,
                }));
            } catch {
                // localStorage indisponível (modo privado etc.) — a troca de tema
                // ainda funciona na sessão atual, só não persiste entre recargas.
            }
        });

        // Garante que o <link id="theme-css"> (fixo no index.html) já nasça
        // alinhado com a preferência salva, mesmo quando ela difere do padrão.
        this.changeTheme();
    }

    updateStyle(config: AppConfig) {
        return (
            config.theme !== this._config.theme ||
            config.colorScheme !== this._config.colorScheme
        );
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config().menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.configUpdate.next(this.config());
    }

    changeTheme() {
        const config = this.config();
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const currentHref = themeLink.getAttribute('href')!;
        // Substitui só o segmento do nome do tema no caminho — não depende de saber
        // qual era o tema anterior, então funciona também pra sincronizar o <link>
        // fixo do index.html com uma preferência já salva no localStorage.
        const newHref = currentHref.replace(/theme\/[^/]+\/theme\.css/, `theme/${config.theme}/theme.css`);
        this.replaceThemeLink(newHref);
    }
    replaceThemeLink(href: string) {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    changeScale(value: number) {
        document.documentElement.style.fontSize = `${value}px`;
    }
}

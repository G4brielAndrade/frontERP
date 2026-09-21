import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface IdiomaDisponivel {
    codigo: string;
    label: string;
    nativo: string;
}

const CHAVE_STORAGE = 'ultraerp-idioma';

@Injectable({ providedIn: 'root' })
export class LanguageService {

    // Português é o idioma principal do ERP — os outros 4 cobrem os
    // maiores grupos que vendem em marketplace no Brasil hoje (árabes,
    // chineses) além de inglês/espanhol como cobertura geral.
    readonly IDIOMAS: IdiomaDisponivel[] = [
        { codigo: 'pt', label: 'Português', nativo: 'Português' },
        { codigo: 'en', label: 'Inglês', nativo: 'English' },
        { codigo: 'es', label: 'Espanhol', nativo: 'Español' },
        { codigo: 'ar', label: 'Árabe', nativo: 'العربية' },
        { codigo: 'zh', label: 'Mandarim', nativo: '中文' },
    ];

    constructor(private translate: TranslateService) {
        const codigos = this.IDIOMAS.map(i => i.codigo);
        this.translate.addLangs(codigos);
        // Na v17 do ngx-translate, use()/setDefaultLang() devolvem Observable
        // "frio" — sem dar subscribe, o HTTP loader nunca dispara e as chaves
        // ficam cruas na tela (foi exatamente o bug reportado).
        this.translate.setDefaultLang('pt').subscribe();

        const salvo = this.lerPreferenciaSalva();
        const inicial = salvo && codigos.includes(salvo) ? salvo : 'pt';
        this.translate.use(inicial).subscribe();
    }

    get idiomaAtual(): string {
        return this.translate.currentLang || this.translate.defaultLang || 'pt';
    }

    get idiomaAtualInfo(): IdiomaDisponivel {
        return this.IDIOMAS.find(i => i.codigo === this.idiomaAtual) ?? this.IDIOMAS[0];
    }

    trocarIdioma(codigo: string): void {
        this.translate.use(codigo).subscribe();
        try {
            localStorage.setItem(CHAVE_STORAGE, codigo);
        } catch {
            // modo privado / storage indisponível — a troca ainda funciona,
            // só não persiste entre sessões.
        }
    }

    private lerPreferenciaSalva(): string | null {
        try {
            return localStorage.getItem(CHAVE_STORAGE);
        } catch {
            return null;
        }
    }
}

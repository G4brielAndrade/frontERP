import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
//import { CadastroPessoaModule } from './demo/components/cadastro/pessoa/cadastro-pessoa/cadastro-pessoa.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TranslateModule, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localePt);

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NgxSpinnerModule,
        HttpClientModule,
        TranslateModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        // Carrega os JSONs de tradução de /assets/i18n/{lang}.json em runtime —
        // é isso que permite trocar de idioma sem dar reload na página.
        // IMPORTANTE: o loader precisa ir DENTRO do config de provideTranslateService
        // (campo `loader`), não como entrada separada — o provideTranslateService
        // sempre embute o próprio loader padrão (que não carrega nada) por baixo
        // dos panos, e se vier depois na lista de providers ele vence e apaga
        // esse aqui, deixando toda tradução "presa" mostrando a chave crua.
        provideTranslateService({
            lang: 'pt',
            fallbackLang: 'pt',
            loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

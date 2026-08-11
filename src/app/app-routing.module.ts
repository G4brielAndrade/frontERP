import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
//import { ClaimGuard } from '../app/components/auth/claim.guard';
//import { AccessControlCadastro } from '../app/components/core/models/access-control.constants';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
                    { path: 'cadastro', loadChildren: () => import('./components/cadastro/cadastro.module').then(m => m.CadastroModule), canActivate: [AuthGuard] },
                    { path: 'pedidos', loadChildren: () => import('./components/pedidos/pedidos.module').then(m => m.PedidosModule), canActivate: [AuthGuard] },
                    { path: 'fiscal', loadChildren: () => import('./components/fiscal/fiscal.module').then(m => m.FiscalModule), canActivate: [AuthGuard] },
                    { path: 'produtos', loadChildren: () => import('./components/produtos/produtos.module').then(m => m.ProdutosModule), canActivate: [AuthGuard] }
                ]
            },
            { path: 'auth/login', component: LoginComponent },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) }, // Rota pública
            { path: 'notfound', component: NotfoundComponent }, // Rota para página não encontrada
            { path: '**', redirectTo: '/notfound' }, // Redireciona para página não encontrada

            
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]



})
export class AppRoutingModule { }

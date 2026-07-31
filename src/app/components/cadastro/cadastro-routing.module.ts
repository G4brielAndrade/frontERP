import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empresa', loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule) },
    ])],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }

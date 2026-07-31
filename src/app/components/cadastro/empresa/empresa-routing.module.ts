import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmpresaComponent }
    ])],
    exports: [RouterModule]
})
export class EmpresaRoutingModule { }

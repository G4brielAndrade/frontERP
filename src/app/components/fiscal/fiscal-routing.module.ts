import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FiscalComponent } from './fiscal.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FiscalComponent }
    ])],
    exports: [RouterModule]
})
export class FiscalRoutingModule { }

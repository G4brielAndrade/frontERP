import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FiscalComponent } from './fiscal.component';
import { FiscalRoutingModule } from './fiscal-routing.module';

@NgModule({
    declarations: [FiscalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        FiscalRoutingModule
    ]
})
export class FiscalModule { }

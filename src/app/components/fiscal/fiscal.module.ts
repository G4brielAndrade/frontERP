import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FiscalComponent } from './fiscal.component';
import { FiscalRoutingModule } from './fiscal-routing.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [FiscalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        FiscalRoutingModule,
        DropdownModule
    ]
})
export class FiscalModule { }

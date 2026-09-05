import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [RelatoriosComponent],
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        RelatoriosRoutingModule,
        DropdownModule
    ]
})
export class RelatoriosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';

@NgModule({
    declarations: [RelatoriosComponent],
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        RelatoriosRoutingModule
    ]
})
export class RelatoriosModule { }

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { ChartModule } from 'primeng/chart';

import { SharedModule } from 'src/app/components/shared/shared.module';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DashboardsRoutingModule,
        ChartModule,
        SharedModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PedidosComponent } from './pedidos.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [PedidosComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        PedidosRoutingModule,
        TranslateModule
    ]
})
export class PedidosModule { }

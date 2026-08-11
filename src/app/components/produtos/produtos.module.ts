import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ProdutosComponent } from './produtos.component';
import { ProdutosRoutingModule } from './produtos-routing.module';

@NgModule({
    declarations: [ProdutosComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        ProdutosRoutingModule
    ]
})
export class ProdutosModule { }

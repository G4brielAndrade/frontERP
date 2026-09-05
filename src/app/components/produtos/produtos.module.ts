import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ProdutosComponent } from './produtos.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [ProdutosComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        ProdutosRoutingModule,
        DropdownModule
    ]
})
export class ProdutosModule { }

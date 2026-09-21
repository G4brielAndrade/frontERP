import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ProdutosComponent } from './produtos.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ProdutosComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        ProdutosRoutingModule,
        DropdownModule,
        TranslateModule
    ]
})
export class ProdutosModule { }

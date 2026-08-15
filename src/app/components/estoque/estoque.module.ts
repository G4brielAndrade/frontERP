import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { EstoqueComponent } from './estoque.component';
import { EstoqueRoutingModule } from './estoque-routing.module';

@NgModule({
    declarations: [EstoqueComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToastModule,
        EstoqueRoutingModule
    ]
})
export class EstoqueModule { }

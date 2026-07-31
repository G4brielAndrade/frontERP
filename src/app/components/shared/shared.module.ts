import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from "primeng/multiselect";


// PrimeNG (ou o que você estiver usando)
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

// Componente do modal
//import { BancoDialogComponent } from './dialogs/banco-dialog/banco-dialog.component';

@NgModule({
    declarations: [
        //BancoDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,

        TableModule,
        ToastModule,
        ToolbarModule,
        TabMenuModule,
        StepsModule,
        DropdownModule,
        RadioButtonModule,
        InputTextareaModule,
        DividerModule,
        InputNumberModule,
        FieldsetModule,
        InputMaskModule,
        CalendarModule,
        MultiSelectModule,
    ],
    exports: [
        //BancoDialogComponent,
    ]
})
export class SharedModule { }

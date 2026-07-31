//// COMPONENTE FILHO - AJUSTADO

//import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
//import { BancoService } from 'src/app/service/banco.service';
//import { Banco } from 'src/app/api/banco.model';

//@Component({
//    selector: 'app-banco-dialog',
//    templateUrl: './banco-dialog.component.html',
//})
//export class BancoDialogComponent implements OnChanges {
//    @Input() visible: boolean = false;
//    @Input() bancoId: string = '';
//    @Output() close = new EventEmitter<void>();
//    @Output() save = new EventEmitter<Banco>();
//    @Output() visibleChange = new EventEmitter<boolean>(); // Para two-way binding

//    banco: Banco = { id: '', nome: '', numeroBanco: '', naoSomar: false };
//    valCheck: string[] = [];
//    submitted: boolean = false;

//    constructor(private bancoService: BancoService) { }

//    ngOnChanges(changes: SimpleChanges) {
//        // Quando o modal abrir e tiver bancoId, carrega os dados
//        if (changes['visible'] && this.visible && this.bancoId) {
//            this.carregarBanco();
//        }
//        // Quando abrir sem bancoId (novo banco), inicializa
//        else if (changes['visible'] && this.visible && !this.bancoId) {
//            this.inicializarBanco();
//        }
//        // Quando o bancoId mudar
//        else if (changes['bancoId'] && this.bancoId && this.visible) {
//            this.carregarBanco();
//        }
//    }

//    inicializarBanco() {
//        this.banco = { id: '', nome: '', numeroBanco: '', naoSomar: false };
//        this.valCheck = [];
//        this.submitted = false;
//    }

//    carregarBanco() {
//        if (!this.bancoId) return;

//        this.bancoService.obterBancoPorId(this.bancoId).subscribe({
//            next: (response) => {
//                this.banco = { ...response.dados }; // Cria uma cópia para evitar referência
//                this.valCheck = this.banco.naoSomar ? ['naoSomar'] : [];
//                console.log('Banco carregado:', this.banco);
//            },
//            error: (err) => {
//                console.error('Erro ao carregar banco por ID:', err);
//            }
//        });
//    }

//    hideDialog() {
//        this.visible = false;
//        this.visibleChange.emit(false); // Emite mudança para two-way binding
//        this.close.emit();
//        this.inicializarBanco(); // Limpa os dados ao fechar
//    }

//    saveBanco() {
//        this.submitted = true;
//        this.banco.naoSomar = this.valCheck.includes('naoSomar');
//        this.save.emit({ ...this.banco });
//    }

//    validateNumbers(event: any) {
//        let value = event.target.value;
//        value = value.replace(/[^0-9]/g, '');
//        event.target.value = value;
//    }
//}

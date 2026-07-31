import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Empresa } from "src/api/empresa.model";
import { ApiResponse } from "src/api/padrao.model";
import { EmpresaService } from "src/app/service/empresa.service";
import { Table } from "primeng/table";
import { CepService } from 'src/app/service/cep.service';


@Component({
    templateUrl: './empresa.component.html',
    providers: [MessageService]
})

export class EmpresaComponent implements OnInit {
    empresas: Empresa[] = [];
    totalRegistros: number = 0;
    totalPaginas: number = 0;
    rowsPerPageOptions = [5, 10, 20];

    empresaDialog: boolean = false;
    deleteEmpresaDialog: boolean = false;
    deleteEmpresasDialog: boolean = false;

    empresa: Empresa = this.initializeEmpresa();

    selectedEmpresas: Empresa[] = [];
    cpfCnpjMask: string = '99.999.999/9999-99';
    submitted: boolean = false;
    cols: any[] = [];
    valCheck: string[] = [];
    telefoneMask: string = '(99)9999-9999';

    constructor(private messageService: MessageService, private empresaService: EmpresaService, private cepService: CepService) { }

    ngOnInit() {
        this.limparEmpresa();
        //this.obterEmpresasCadastrados();
        this.cols = [
        ];
    }

    initializeEmpresa(): Empresa {
        return {
            id: '',
            cpfCnpj: '',
            inscricaoEstadual: '',
            inscricaoSuframa: '',
            razaoSocial: '',
            nomeFantasia: '',
        };
    }



    limparEmpresa() {
        this.valCheck = [];
    }


    //obterEmpresasCadastrados(): void {
    //    this.empresaService.obterEmpresas().subscribe({
    //        next: (response: ApiResponse) => {
    //            this.empresas = response.dados ?? [];
    //            this.totalRegistros = response.paginacao.quantidadeTotalRegistros;
    //            this.totalPaginas = response.paginacao.quantidadePaginas;
    //        },
    //        error: (error) => {
    //            console.error('Erro ao cadastrar empresas!', error);
    //        }
    //    });
    //}

    openNew() {
        this.limparEmpresa();
        this.empresa = this.initializeEmpresa();
        this.submitted = false;
        this.empresaDialog = true;
        this.valCheck = [];
    }

    getEmpresaById(id: string) {
        this.empresaService.obterEmpresaPorId(id).subscribe({
            next: (response: ApiResponse) => {
                if (response) {
                    this.empresa = response.dados ?? [];
                    this.populateForm(this.empresa);
                } else {
                    console.error('Erro na resposta da API: ', response)
                }
            },
            error: (error) => {
                console.error('Erro ao buscar empresa!', error)
            }
        })
    }

    atualizarMascara() {
        const valorAtual = this.empresa.cpfCnpj; // Armazena o valor atual
        setTimeout(() => {
            this.empresa.cpfCnpj = valorAtual; // Reatribui o valor após a máscara ser alterada
        });
    }
   

    populateForm(empresa: Empresa) {
        this.empresa = { ...this.initializeEmpresa(), ...empresa };
    }    


    editEmpresa(empresa: Empresa) {
        this.empresa = { ...empresa };
        this.empresaDialog = true;
        this.getEmpresaById(empresa.id);
    }

    deleteSelectedEmpresas() {
        this.deleteEmpresasDialog = true;
    }

    deleteEmpresa(empresa: Empresa) {
        this.deleteEmpresaDialog = true;
        this.empresa = { ...empresa };
    }

    confirmDelete() {
        this.deleteEmpresaDialog = false;

        const payload = {
            indice: 0,
            formulario: {
                filtrarPor: "",
                valorFiltro: "",
                idsSelecionados: [this.empresa.id],
                idsNaoSelecionados: []
            }
        };

        const observer = {
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Empresa Deletado', life: 3000 });
                this.empresa = this.initializeEmpresa();
                //this.obterEmpresasCadastrados();
            },
            error: (error: any) => {
                console.error('Erro ao deletar empresa', error);
                if (error.error && error.error.errors) {
                    console.error('Detalhes do erro: ', error.error.errors);
                }
            }
        };

        this.empresaService.deletarEmpresas(payload).subscribe(observer);
    }

    confirmDeleteSelected() {
        this.deleteEmpresasDialog = false;

        const selectedIds = this.selectedEmpresas.map(empresa => empresa.id);

        const payload = {
            indice: 0,
            formulario: {
                filtrarPor: "",
                valorFiltro: "",
                idsSelecionados: selectedIds,
                idsNaoSelecionados: []
            }
        };

        const observer = {
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Empresas Deletados', life: 3000 });
                this.empresa = this.initializeEmpresa();
                //this.obterEmpresasCadastrados();
            },
            error: (error: any) => {
                console.error('Erro ao deletar empresas', error);
                if (error.error && error.error.errors) {
                    console.error('Detalhes do erro: ', error.error.errors);
                }
            }
        };

        this.empresaService.deletarEmpresas(payload).subscribe(observer);
    }

    ValidaSaveEmpresa(): boolean {
        const warnings = []; 

        if (!this.empresa.cpfCnpj) {
            warnings.push('É necessário informar um CPF/CNPJ.');
        }

        if (!this.empresa.razaoSocial) {
            warnings.push('É necessário informar a Razão Social.');
        }

        if (!this.empresa.nomeFantasia) {
            warnings.push('É necessário informar o Nome Fantasia.');
        }        

        if (warnings.length > 0) {
            warnings.forEach((detail) => {
                this.messageService.add({ severity: 'warn', summary: 'Atenção', detail, life: 5000 });
            });
            return false;
        }

        return true;
    }    

    saveEmpresa(): void {
        this.submitted = true;

        if (this.ValidaSaveEmpresa()) {                     

            const payload = {
                indice: 0,
                formulario: {
                    cpfCnpj: this.empresa.cpfCnpj,
                    inscricaoEstadual: this.empresa.inscricaoEstadual,
                    inscricaoSuframa: this.empresa.inscricaoSuframa,
                    razaoSocial: this.empresa.razaoSocial,
                    nomeFantasia: this.empresa.nomeFantasia,
                    id: this.empresa.id,
                }
            };

            const observer = {
                next: (response: any) => {
                    const message = this.empresa.id ? 'Empresa atualizada' : 'Empresa criada';
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
                    this.empresaDialog = false;
                    this.empresa = this.initializeEmpresa();
                    //this.obterEmpresasCadastrados();
                },
                error: (error: any) => {
                    if (error.error && error.error.erros && error.error.erros.length > 0) {
                        error.error.erros.forEach((err: any) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: `Campo: '${err.nomePropriedade}'`,
                                detail: err.mensagem,
                                life: 5000
                            });
                        });
                    } else {
                        const errorMessage = this.empresa.id ? 'Erro ao atualizar empresa' : 'Erro ao cadastrar empresa';
                        this.messageService.add({ severity: 'error', summary: 'Atenção', detail: errorMessage, life: 3000 });
                    }
                }
            };            

            //if (this.empresa.id) {
            //    this.empresaService.cadastrarEmpresa(payload).subscribe(observer);
            //} else {
            //    this.empresaService.atualizarEmpresa(payload).subscribe(observer);
            //}
        }
    }

    hideDialog() {
        this.empresaDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    validateNumbers(event: any) {
        let value = event.target.value;
        value = value.replace(/[^0-9]/g, '');
        event.target.value = value;
    }    
}



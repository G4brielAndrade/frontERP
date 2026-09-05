import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ContaNF, LojaIntegrada, CertificadoA1, UFS } from 'src/api/fiscal.model';
import { Marketplace } from 'src/api/pedido.model';

type FiscalView = 'list' | 'form';

function uuid(): string {
    return (crypto as any).randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

@Component({
    selector: 'app-fiscal',
    templateUrl: './fiscal.component.html',
    styleUrls: ['./fiscal.component.scss'],
    providers: [MessageService]
})
export class FiscalComponent implements OnInit {

    readonly UFS = UFS;

    // Opções { label, value } pros p-dropdown (PrimeNG) desta tela.
    readonly TIPO_TRIBUTACAO_OPTIONS = [
        { label: 'MEI', value: 'mei' },
        { label: 'Simples Nacional', value: 'simples' },
        { label: 'Regime Normal', value: 'normal' },
    ];
    readonly TIPO_UNIDADE_OPTIONS = [
        { label: 'Matriz', value: 'matriz' },
        { label: 'Filial', value: 'filial' },
    ];
    // Propriedade normal, calculada uma única vez (UFS é estático) — getter
    // aqui recriaria o array a cada ciclo de detecção de mudanças e travava a aba.
    readonly ufOptions: { label: string; value: string }[] = UFS.map(uf => ({ label: uf, value: uf }));

    // ── Estado ─────────────────────────────────────────────────
    contasNF: ContaNF[] = [];
    lojasIntegradas: LojaIntegrada[] = [];

    view: FiscalView = 'list';
    editingId: string | null = null;

    // Formulário em edição/criação
    form: Partial<ContaNF> = this.formVazio();

    // Lojas exibidas no formulário (vinculadas + disponíveis), com flag de marcação
    lojasForm: (LojaIntegrada & { vinculada: boolean })[] = [];

    mostrarSenhaCertificado = false;

    readonly MKT_LABELS: Record<Marketplace, string> = {
        mercadolivre: 'Mercado Livre',
        shopee: 'Shopee',
        amazon: 'Amazon',
        nuvemshop: 'Nuvemshop',
    };
    readonly MKT_DOT_CLASS: Record<Marketplace, string> = {
        mercadolivre: 'dot-ml',
        shopee: 'dot-sh',
        amazon: 'dot-az',
        nuvemshop: 'dot-nv',
    };

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.obterContasNF();
        this.obterLojasIntegradas();
    }

    // ════════════════════════════════════════════════════════════
    // "BUSCAR NO BANCO" — hoje retorna dados fixos.
    // TODO: quando existir FiscalService, trocar por:
    //   this.fiscalService.obterContasNF().subscribe(r => this.contasNF = r.dados);
    // ════════════════════════════════════════════════════════════
    obterContasNF(): void {
        // Igual ao protótipo original: começa vazio (onboarding do cliente)
        this.contasNF = [];
    }

    // TODO: quando existir o módulo Integrações de verdade, trocar por
    // chamada ao IntegracoesService. Por enquanto é o mesmo mock do protótipo.
    obterLojasIntegradas(): void {
        this.lojasIntegradas = [
            { id: 'loja-001', nome: 'Loja Abel', marketplace: 'shopee' },
            { id: 'loja-002', nome: 'Loja Eletric', marketplace: 'shopee' },
            { id: 'loja-003', nome: 'Loja Festão', marketplace: 'shopee' },
            { id: 'loja-004', nome: 'Loja Abraham', marketplace: 'shopee' },
            { id: 'loja-005', nome: 'Tech Store', marketplace: 'mercadolivre' },
            { id: 'loja-006', nome: 'Mega Vendas', marketplace: 'amazon' },
        ];
    }

    // ════════════════════════════════════════════════════════════
    // NAVEGAÇÃO ENTRE LISTA E FORMULÁRIO
    // ════════════════════════════════════════════════════════════
    novaConta(): void {
        this.editingId = null;
        this.form = this.formVazio();
        this.montarLojasForm();
        this.mostrarSenhaCertificado = false;
        this.view = 'form';
    }

    editarConta(conta: ContaNF): void {
        this.editingId = conta.id;
        this.form = { ...conta, certificado: { ...conta.certificado } };
        this.montarLojasForm();
        this.mostrarSenhaCertificado = false;
        this.view = 'form';
    }

    voltarLista(): void {
        this.view = 'list';
        this.editingId = null;
    }

    private formVazio(): Partial<ContaNF> {
        return {
            razaoSocial: '', cnpj: '', inscricaoEstadual: '',
            tipoTributacao: '', tipoUnidade: '', email: '',
            cep: '', logradouro: '', numero: '', complemento: '',
            bairro: '', cidade: '', uf: '',
            serieNFe: '', proximoNumero: '',
            certificado: { fileName: null, uploadedAt: null, validade: null, senha: null },
            lojasVinculadas: [],
        };
    }

    // Lojas vinculadas a outras contas (não à que está em edição) ficam de fora
    private montarLojasForm(): void {
        const vinculadasOutrasContas = new Set(
            this.contasNF
                .filter(c => c.id !== this.editingId)
                .flatMap(c => c.lojasVinculadas)
        );
        const jaVinculadasDesta = new Set(this.form.lojasVinculadas ?? []);

        this.lojasForm = this.lojasIntegradas
            .filter(l => !vinculadasOutrasContas.has(l.id) || jaVinculadasDesta.has(l.id))
            .map(l => ({ ...l, vinculada: jaVinculadasDesta.has(l.id) }));
    }

    toggleLoja(lojaId: string): void {
        const atual = new Set(this.form.lojasVinculadas ?? []);
        if (atual.has(lojaId)) atual.delete(lojaId);
        else atual.add(lojaId);
        this.form.lojasVinculadas = Array.from(atual);
        this.lojasForm = this.lojasForm.map(l => ({ ...l, vinculada: atual.has(l.id) }));
    }

    // ════════════════════════════════════════════════════════════
    // FORMATAÇÃO DE CAMPOS
    // ════════════════════════════════════════════════════════════
    onCnpjInput(valor: string): void {
        this.form.cnpj = this.formatCNPJ(valor);
    }

    onCepInput(valor: string): void {
        this.form.cep = this.formatCEP(valor);
    }

    private formatCNPJ(v: string): string {
        const d = v.replace(/\D/g, '').slice(0, 14);
        return d
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }

    private formatCEP(v: string): string {
        const d = v.replace(/\D/g, '').slice(0, 8);
        return d.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    // ════════════════════════════════════════════════════════════
    // CERTIFICADO A1 (upload simulado)
    // ════════════════════════════════════════════════════════════
    onCertificadoSelecionado(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        if (!/\.(pfx|p12)$/i.test(file.name)) {
            this.erro('Formato inválido. Envie .pfx ou .p12.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            this.erro('Arquivo muito grande. Limite de 5MB.');
            return;
        }

        const now = new Date();
        const p = (n: number) => String(n).padStart(2, '0');
        const ts = `${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;

        this.form.certificado = {
            ...(this.form.certificado ?? { senha: null, validade: null }),
            fileName: file.name,
            uploadedAt: ts,
        } as CertificadoA1;

        this.sucesso('Certificado enviado!');
    }

    removerCertificado(): void {
        this.form.certificado = { fileName: null, uploadedAt: null, validade: null, senha: this.form.certificado?.senha ?? null };
    }

    // ════════════════════════════════════════════════════════════
    // SALVAR / REMOVER CONTA DE NF
    // TODO: quando existir FiscalService, trocar createContaNF/updateContaNF
    // por chamadas HTTP reais.
    // ════════════════════════════════════════════════════════════
    salvarConta(): void {
        const data = this.form;

        if (!data.razaoSocial) { this.erro('Informe a Razão Social.'); return; }
        if (!data.cnpj) { this.erro('Informe o CNPJ.'); return; }
        if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(data.cnpj) && !/^\d{14}$/.test(data.cnpj)) {
            this.erro('CNPJ em formato inválido. Use 00.000.000/0000-00.');
            return;
        }
        if (data.proximoNumero && !/^\d+$/.test(data.proximoNumero)) {
            this.erro('Próximo número de nota deve conter apenas dígitos.');
            return;
        }

        if (this.editingId) {
            const idx = this.contasNF.findIndex(c => c.id === this.editingId);
            if (idx !== -1) {
                this.contasNF[idx] = { ...this.contasNF[idx], ...data } as ContaNF;
            }
            this.sucesso('Conta de NF atualizada com sucesso!');
        } else {
            const nova: ContaNF = { id: uuid(), ...data } as ContaNF;
            this.contasNF.push(nova);
            this.sucesso('Conta de NF criada com sucesso!');
        }

        this.voltarLista();
    }

    removerConta(conta: ContaNF): void {
        if (!confirm(`Remover a conta de NF "${conta.razaoSocial}"?\nAs lojas vinculadas ficarão disponíveis novamente.`)) return;
        this.contasNF = this.contasNF.filter(c => c.id !== conta.id);
        this.aviso('Conta de NF removida.');
    }

    // ════════════════════════════════════════════════════════════
    // HELPERS DE APRESENTAÇÃO (usados no template)
    // ════════════════════════════════════════════════════════════
    isContaCompleta(c: ContaNF): boolean {
        return !!(
            c.razaoSocial && c.cnpj && c.inscricaoEstadual &&
            c.tipoTributacao && c.tipoUnidade && c.email &&
            c.cep && c.logradouro && c.numero && c.bairro && c.cidade && c.uf &&
            c.serieNFe && c.proximoNumero &&
            c.certificado.fileName && c.certificado.senha
        );
    }

    regimeLabel(t: string): string {
        const m: Record<string, string> = { mei: 'MEI', simples: 'Simples Nacional', normal: 'Regime Normal' };
        return m[t] ?? '—';
    }

    lojaNome(lojaId: string): LojaIntegrada | undefined {
        return this.lojasIntegradas.find(l => l.id === lojaId);
    }

    private sucesso(msg: string): void { this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: msg, life: 3000 }); }
    private erro(msg: string): void { this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg, life: 5000 }); }
    private aviso(msg: string): void { this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: msg, life: 3000 }); }
}

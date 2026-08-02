import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

interface PedidoAtencao {
    id: string;
    mkt: string;
    buyer: string;
    val: string;
    status: 'pendente' | 'erro';
    motivo: string;
}

type PeriodoFiltro = 'hoje' | 'semana' | 'mes' | 'ano' | 'personalizado';

interface ValoresPorPeriodo {
    hoje: number;
    semana: number;
    mes: number;
    ano: number;
}

interface IndicadorEmpresa {
    total: number;
    periodo: ValoresPorPeriodo;
}

interface EmpresaIndicadores {
    totalPedidos: IndicadorEmpresa;
    totalNFe: IndicadorEmpresa;
    nfeCanceladas: IndicadorEmpresa;
    cceEmitidas: IndicadorEmpresa;
    notasInutilizadas: IndicadorEmpresa;
}

interface Empresa {
    id: string;
    nome: string;
}

interface CardIndicador {
    label: string;
    icon: string;
    cor: 'blue' | 'green' | 'red' | 'purple' | 'amber';
    total: number;
    delta: number;
    acao: string; // palavra usada no comparativo: "42 recebidos hoje", "6 canceladas hoje"...
    deltaLabel: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    // ── Filtros ────────────────────────────────────────────────────
    readonly TODAS_EMPRESAS: string = 'todas';

    empresas: Empresa[] = [];
    empresaSelecionada: string = this.TODAS_EMPRESAS;

    periodoSelecionado: PeriodoFiltro = 'hoje';
    readonly periodos: { value: PeriodoFiltro; label: string }[] = [
        { value: 'hoje', label: 'Hoje' },
        { value: 'semana', label: 'Esta semana' },
        { value: 'mes', label: 'Este mês' },
        { value: 'ano', label: 'Este ano' },
        { value: 'personalizado', label: 'Período personalizado' },
    ];

    dataInicioPersonalizado: string = '';
    dataFimPersonalizado: string = '';

    // ── Cards calculados ─────────────────────────────────────────
    cards: CardIndicador[] = [];

    pedidosAtencao: PedidoAtencao[] = [];

    vendasChartData: any;
    vendasChartOptions: any;
    distribuicaoChartData: any;
    distribuicaoChartOptions: any;

    // Mock de indicadores por empresa (base + quebra por período)
    // TODO: quando existir DashboardService, trocar por chamada real,
    // agregando dados de Pedidos + Fiscal por conta de NF (empresa).
    private readonly INDICADORES_MOCK: Record<string, EmpresaIndicadores> = {
        'emp-1': {
            totalPedidos: { total: 128430, periodo: { hoje: 42, semana: 312, mes: 1180, ano: 12840 } },
            totalNFe: { total: 118920, periodo: { hoje: 38, semana: 289, mes: 1050, ano: 11720 } },
            nfeCanceladas: { total: 512, periodo: { hoje: 1, semana: 6, mes: 22, ano: 210 } },
            cceEmitidas: { total: 89, periodo: { hoje: 0, semana: 2, mes: 8, ano: 64 } },
            notasInutilizadas: { total: 34, periodo: { hoje: 0, semana: 1, mes: 3, ano: 19 } },
        },
        'emp-2': {
            totalPedidos: { total: 64210, periodo: { hoje: 15, semana: 140, mes: 610, ano: 6320 } },
            totalNFe: { total: 59870, periodo: { hoje: 13, semana: 128, mes: 560, ano: 5890 } },
            nfeCanceladas: { total: 201, periodo: { hoje: 0, semana: 2, mes: 9, ano: 88 } },
            cceEmitidas: { total: 27, periodo: { hoje: 0, semana: 1, mes: 3, ano: 21 } },
            notasInutilizadas: { total: 11, periodo: { hoje: 0, semana: 0, mes: 1, ano: 7 } },
        },
        'emp-3': {
            totalPedidos: { total: 46381, periodo: { hoje: 8, semana: 61, mes: 260, ano: 4110 } },
            totalNFe: { total: 42130, periodo: { hoje: 7, semana: 55, mes: 235, ano: 3780 } },
            nfeCanceladas: { total: 178, periodo: { hoje: 0, semana: 1, mes: 5, ano: 61 } },
            cceEmitidas: { total: 19, periodo: { hoje: 0, semana: 0, mes: 2, ano: 14 } },
            notasInutilizadas: { total: 8, periodo: { hoje: 0, semana: 0, mes: 0, ano: 5 } },
        },
    };

    // ── Mock dos gráficos ──────────────────────────────────────────
    // Séries-base de Pedidos x NF-e, uma "forma" por granularidade de período.
    // TODO: quando existir DashboardService, cada período vira uma agregação real.
    private readonly SERIES_POR_PERIODO: Record<PeriodoFiltro, { labels: string[]; pedidos: number[]; nfe: number[] }> = {
        hoje: { labels: ['06h', '09h', '12h', '15h', '18h', '21h'], pedidos: [2, 5, 8, 6, 9, 4], nfe: [1, 4, 6, 5, 7, 3] },
        semana: { labels: ['24/07', '25/07', '26/07', '27/07', '28/07', '29/07', '30/07'], pedidos: [8, 11, 7, 14, 10, 6, 6], nfe: [6, 9, 6, 12, 8, 5, 2] },
        mes: { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], pedidos: [58, 64, 49, 72], nfe: [50, 55, 44, 63] },
        ano: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'], pedidos: [420, 380, 510, 460, 530, 600, 610], nfe: [390, 350, 470, 430, 500, 560, 570] },
        personalizado: { labels: ['24/07', '25/07', '26/07', '27/07', '28/07', '29/07', '30/07'], pedidos: [8, 11, 7, 14, 10, 6, 6], nfe: [6, 9, 6, 12, 8, 5, 2] },
    };

    // Fator de escala por empresa sobre a série-base acima (simula empresas de portes diferentes)
    private readonly EMPRESA_FATOR: Record<string, number> = {
        'emp-1': 1,
        'emp-2': 0.5,
        'emp-3': 0.35,
    };

    // Distribuição por marketplace: [Mercado Livre, Shopee, Amazon, Nuvemshop], por empresa
    private readonly MKT_POR_EMPRESA: Record<string, number[]> = {
        'emp-1': [3, 1, 1, 1],
        'emp-2': [1, 3, 0, 1],
        'emp-3': [2, 0, 2, 0],
    };

    private subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        // Recalcula os gráficos quando o usuário troca o tema (cores dos textos/grid mudam)
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => this.montarGraficos());
    }

    ngOnInit(): void {
        this.obterEmpresas();
        this.recalcularCards();
        this.obterPedidosQuePrecisamAtencao();
        this.montarGraficos();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    // ════════════════════════════════════════════════════════════
    // "BUSCAR NO BANCO" — hoje retorna dados fixos.
    // TODO: quando existir FiscalService, trocar por chamada real
    // que lista as Contas de NF cadastradas (mesma fonte do módulo Empresas).
    // ════════════════════════════════════════════════════════════
    obterEmpresas(): void {
        this.empresas = [
            { id: 'emp-1', nome: 'Comércio de Eletrônicos LTDA' },
            { id: 'emp-2', nome: 'Loja Abel Comércio Digital LTDA' },
            { id: 'emp-3', nome: 'Tech Store Distribuidora ME' },
        ];
    }

    obterPedidosQuePrecisamAtencao(): void {
        this.pedidosAtencao = [
            { id: '#AZ-1029384', mkt: 'Amazon', buyer: 'Fernanda Costa', val: 'R$ 512,00', status: 'erro', motivo: 'Rejeição 539 — CNPJ não cadastrado na SEFAZ' },
            { id: '#ML-8842391', mkt: 'Mercado Livre', buyer: 'Carlos Souza', val: 'R$ 349,90', status: 'pendente', motivo: 'Aguardando emissão' },
            { id: '#SH-9910234', mkt: 'Shopee', buyer: 'Roberto Alves', val: 'R$ 87,50', status: 'pendente', motivo: 'Aguardando emissão' },
            { id: '#NV-7710092', mkt: 'Nuvemshop', buyer: 'Juliana Ramos', val: 'R$ 234,00', status: 'pendente', motivo: 'Aguardando emissão' },
        ];
    }

    // ════════════════════════════════════════════════════════════
    // FILTROS — trocar empresa ou período recalcula os cards na hora
    // ════════════════════════════════════════════════════════════
    onEmpresaChange(): void {
        this.recalcularCards();
        this.montarGraficos();
    }

    onPeriodoChange(): void {
        this.recalcularCards();
        this.montarGraficos();
    }

    onPeriodoPersonalizadoChange(): void {
        if (this.dataInicioPersonalizado && this.dataFimPersonalizado) {
            this.recalcularCards();
            this.montarGraficos();
        }
    }

    private recalcularCards(): void {
        const dados = this.obterIndicadoresConsolidados(this.empresaSelecionada);

        this.cards = [
            this.montarCard('Total de pedidos', 'pi-shopping-cart', 'blue', 'recebidos', dados.totalPedidos),
            this.montarCard('Total de NF-e', 'pi-file', 'green', 'emitidas', dados.totalNFe),
            this.montarCard('NF-e canceladas', 'pi-times-circle', 'red', 'canceladas', dados.nfeCanceladas),
            this.montarCard('CC-e emitidas', 'pi-file-edit', 'purple', 'emitidas', dados.cceEmitidas),
            this.montarCard('Notas inutilizadas', 'pi-ban', 'amber', 'inutilizadas', dados.notasInutilizadas),
        ];
    }

    // Soma todas as empresas quando "Todas as empresas" está selecionado,
    // ou retorna só os dados da empresa escolhida.
    private obterIndicadoresConsolidados(empresaId: string): EmpresaIndicadores {
        if (empresaId !== this.TODAS_EMPRESAS) {
            return this.INDICADORES_MOCK[empresaId];
        }

        const todasEmpresas = Object.values(this.INDICADORES_MOCK);
        const somar = (chave: keyof EmpresaIndicadores): IndicadorEmpresa => ({
            total: todasEmpresas.reduce((acc, e) => acc + e[chave].total, 0),
            periodo: {
                hoje: todasEmpresas.reduce((acc, e) => acc + e[chave].periodo.hoje, 0),
                semana: todasEmpresas.reduce((acc, e) => acc + e[chave].periodo.semana, 0),
                mes: todasEmpresas.reduce((acc, e) => acc + e[chave].periodo.mes, 0),
                ano: todasEmpresas.reduce((acc, e) => acc + e[chave].periodo.ano, 0),
            },
        });

        return {
            totalPedidos: somar('totalPedidos'),
            totalNFe: somar('totalNFe'),
            nfeCanceladas: somar('nfeCanceladas'),
            cceEmitidas: somar('cceEmitidas'),
            notasInutilizadas: somar('notasInutilizadas'),
        };
    }

    private montarCard(label: string, icon: string, cor: CardIndicador['cor'], acao: string, indicador: IndicadorEmpresa): CardIndicador {
        const delta = this.obterDeltaPeriodo(indicador.periodo);
        return {
            label, icon, cor, acao,
            total: indicador.total,
            delta,
            deltaLabel: this.montarDeltaLabel(delta, acao),
        };
    }

    private obterDeltaPeriodo(periodo: ValoresPorPeriodo): number {
        switch (this.periodoSelecionado) {
            case 'hoje': return periodo.hoje;
            case 'semana': return periodo.semana;
            case 'mes': return periodo.mes;
            case 'ano': return periodo.ano;
            case 'personalizado': return this.estimarValorPersonalizado(periodo.ano);
            default: return periodo.hoje;
        }
    }

    // Período personalizado: como é dado simulado, estimamos proporcionalmente
    // à média diária do ano. TODO: substituir por agregação real por data quando
    // existir o back — aí o intervalo vira um filtro de verdade na consulta.
    private estimarValorPersonalizado(valorAno: number): number {
        if (!this.dataInicioPersonalizado || !this.dataFimPersonalizado) return 0;
        const inicio = new Date(this.dataInicioPersonalizado);
        const fim = new Date(this.dataFimPersonalizado);
        const dias = Math.max(1, Math.round((fim.getTime() - inicio.getTime()) / 86400000) + 1);
        return Math.round((valorAno / 365) * dias);
    }

    // Formato pedido: "{valor} {ação} {período}" — ex: "1.245 emitidas hoje"
    private montarDeltaLabel(delta: number, acao: string): string {
        const valorFormatado = this.formatarNumero(delta);
        switch (this.periodoSelecionado) {
            case 'hoje': return `${valorFormatado} ${acao} hoje`;
            case 'semana': return `${valorFormatado} ${acao} esta semana`;
            case 'mes': return `${valorFormatado} ${acao} este mês`;
            case 'ano': return `${valorFormatado} ${acao} este ano`;
            case 'personalizado': {
                if (!this.dataInicioPersonalizado || !this.dataFimPersonalizado) {
                    return 'Selecione o período';
                }
                return `${valorFormatado} ${acao} no período selecionado`;
            }
            default: return `${valorFormatado} ${acao}`;
        }
    }

    formatarNumero(valor: number): string {
        return valor.toLocaleString('pt-BR');
    }

    // ════════════════════════════════════════════════════════════
    // GRÁFICOS (Chart.js via primeng/chart) — agora reagem aos mesmos
    // filtros de empresa/período usados nos cards.
    // ════════════════════════════════════════════════════════════
    private montarGraficos(): void {
        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-color');
        const textColorSecondary = style.getPropertyValue('--text-color-secondary');
        const surfaceBorder = style.getPropertyValue('--surface-border');

        const base = this.SERIES_POR_PERIODO[this.periodoSelecionado];
        const fatorTotal = this.obterFatoresEmpresas().reduce((acc, f) => acc + f, 0);

        const pedidosSerie = base.pedidos.map(v => Math.round(v * fatorTotal));
        const emitidasSerie = base.nfe.map(v => Math.round(v * fatorTotal));

        // Canceladas/CC-e/Inutilizadas derivadas proporcionalmente das emitidas
        // (mesma proporção observada nos totais do INDICADORES_MOCK).
        // TODO: quando existir DashboardService, cada uma vira uma série agregada real.
        const canceladasSerie = emitidasSerie.map(v => Math.round(v * 0.06));
        const cceSerie = emitidasSerie.map(v => Math.round(v * 0.02));
        const inutilizadasSerie = emitidasSerie.map(v => Math.round(v * 0.01));

        this.vendasChartData = {
            labels: base.labels,
            datasets: [
                {
                    label: 'Pedidos',
                    data: pedidosSerie,
                    fill: true,
                    tension: 0.4,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.10)',
                    pointBackgroundColor: '#4f46e5',
                },
                {
                    label: 'Emitidas',
                    data: emitidasSerie,
                    fill: true,
                    tension: 0.4,
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(22, 163, 74, 0.10)',
                    pointBackgroundColor: '#16a34a',
                },
                {
                    label: 'Canceladas',
                    data: canceladasSerie,
                    fill: false,
                    tension: 0.4,
                    borderColor: '#dc2626',
                    borderWidth: 2,
                    pointBackgroundColor: '#dc2626',
                },
                {
                    label: 'CC-e',
                    data: cceSerie,
                    fill: false,
                    tension: 0.4,
                    borderColor: '#9333ea',
                    borderWidth: 2,
                    pointBackgroundColor: '#9333ea',
                },
                {
                    label: 'Inutilizadas',
                    data: inutilizadasSerie,
                    fill: false,
                    tension: 0.4,
                    borderColor: '#d97706',
                    borderWidth: 2,
                    pointBackgroundColor: '#d97706',
                },
            ],
        };

        this.vendasChartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                x: { ticks: { color: textColorSecondary }, grid: { display: false } },
                y: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder, drawBorder: false }, beginAtZero: true },
            },
        };

        this.distribuicaoChartData = {
            labels: ['Mercado Livre', 'Shopee', 'Amazon', 'Nuvemshop'],
            datasets: [{
                data: this.obterDistribuicaoMkt(),
                backgroundColor: ['#ffd400', '#f35b2b', '#ff9900', '#00bcd4'],
                borderWidth: 0,
                hoverOffset: 4,
            }],
        };

        this.distribuicaoChartOptions = {
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: textColor, usePointStyle: true, boxWidth: 8, padding: 16 }
                }
            },
        };
    }

    // Fator de cada empresa envolvida no filtro atual (uma só, ou todas somadas)
    private obterFatoresEmpresas(): number[] {
        if (this.empresaSelecionada !== this.TODAS_EMPRESAS) {
            return [this.EMPRESA_FATOR[this.empresaSelecionada] ?? 0];
        }
        return Object.values(this.EMPRESA_FATOR);
    }

    // Distribuição por marketplace da empresa selecionada, ou soma de todas
    private obterDistribuicaoMkt(): number[] {
        if (this.empresaSelecionada !== this.TODAS_EMPRESAS) {
            return this.MKT_POR_EMPRESA[this.empresaSelecionada] ?? [0, 0, 0, 0];
        }
        const todas = Object.values(this.MKT_POR_EMPRESA);
        return todas.reduce((acc, arr) => acc.map((v, i) => v + arr[i]), [0, 0, 0, 0]);
    }

    // Rótulo do período atual, usado no cabeçalho dos gráficos
    periodoAtualLabel(): string {
        return this.periodos.find(p => p.value === this.periodoSelecionado)?.label ?? '';
    }
}

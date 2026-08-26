import { Component, OnInit, effect } from '@angular/core';
import * as XLSX from 'xlsx';
import { Marketplace } from 'src/api/pedido.model';
import { PeriodoRelatorio, LojaResumo, LinhaRelatorioDiario, ResumoRelatorio, FatiaPorLoja } from 'src/api/relatorio.model';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

interface DiaBruto { pedidos: number; receita: number; despesas: number; }

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {

    readonly TODAS_LOJAS = 'todas';

    // ── Parâmetros-base do mock por loja (pedidos/dia e ticket médio) ──
    // TODO: quando existir RelatorioService, tudo isso vem agregado do backend.
    private readonly LOJAS_PARAMS: Record<string, { basePedidos: number; ticket: number }> = {
        'loja-001': { basePedidos: 8, ticket: 65 },
        'loja-002': { basePedidos: 5, ticket: 120 },
        'loja-003': { basePedidos: 3, ticket: 45 },
        'loja-004': { basePedidos: 2, ticket: 90 },
        'loja-005': { basePedidos: 12, ticket: 180 },
        'loja-006': { basePedidos: 6, ticket: 150 },
    };

    readonly MKT_LABELS: Record<Marketplace, string> = {
        mercadolivre: 'Mercado Livre', shopee: 'Shopee', amazon: 'Amazon', nuvemshop: 'Nuvemshop',
    };
    readonly MKT_COLORS: Record<Marketplace, string> = {
        mercadolivre: '#ffcc00', shopee: '#f35b2b', amazon: '#ff9900', nuvemshop: '#00bcd4',
    };
    readonly MKT_DOT_CLASS: Record<Marketplace, string> = {
        mercadolivre: 'dot-ml', shopee: 'dot-sh', amazon: 'dot-az', nuvemshop: 'dot-nv',
    };

    // ── Estado / filtros ────────────────────────────────────────
    lojas: LojaResumo[] = [];
    lojaSelecionada: string = this.TODAS_LOJAS;

    periodoSelecionado: PeriodoRelatorio = '30d';
    readonly periodos: { value: PeriodoRelatorio; label: string }[] = [
        { value: '7d', label: '7 dias' },
        { value: '30d', label: '30 dias' },
        { value: '90d', label: '90 dias' },
        { value: '12m', label: '12 meses' },
        { value: 'personalizado', label: 'Personalizado' },
    ];
    dataInicioPersonalizado: string | null = null;
    dataFimPersonalizado: string | null = null;

    // ── Dados computados ────────────────────────────────────────
    resumo!: ResumoRelatorio;
    linhas: LinhaRelatorioDiario[] = [];
    fatiasPorLoja: FatiaPorLoja[] = [];

    comboChartData: any;
    comboChartOptions: any;
    doughnutChartData: any;
    doughnutChartOptions: any;

    exportando = false;

    // Guarda a última série gerada só pra poder reconstruir os gráficos
    // (cores) quando o usuário troca de tema, sem precisar remockar os dados.
    private ultimasLinhasChart: LinhaRelatorioDiario[] = [];
    private ultimosDias = 30;

    constructor(private layoutService: LayoutService) {
        // Chart.js não é reativo a CSS — se o usuário alternar claro/escuro
        // com a tela já aberta, precisamos remontar os gráficos na mão.
        effect(() => {
            this.layoutService.config().colorScheme;
            if (this.ultimasLinhasChart.length) {
                this.montarGraficoCombo(this.ultimasLinhasChart);
                this.montarFatiasPorLoja(this.ultimosDias);
            }
        });
    }

    ngOnInit(): void {
        this.obterLojas();
        this.aplicarFiltros();
    }

    // TODO: quando existir IntegracoesService, essa lista vem das lojas
    // realmente conectadas (mesma fonte usada em Empresas/Fiscal).
    obterLojas(): void {
        this.lojas = [
            { id: 'loja-001', nome: 'Loja Abel', marketplace: 'shopee' },
            { id: 'loja-002', nome: 'Loja Eletric', marketplace: 'shopee' },
            { id: 'loja-003', nome: 'Loja Festão', marketplace: 'shopee' },
            { id: 'loja-004', nome: 'Loja Abraham', marketplace: 'shopee' },
            { id: 'loja-005', nome: 'Tech Store', marketplace: 'mercadolivre' },
            { id: 'loja-006', nome: 'Mega Vendas', marketplace: 'amazon' },
        ];
    }

    // ════════════════════════════════════════════════════════════
    // FILTROS — recalcula tudo (KPIs, gráficos, tabela) de uma vez
    // ════════════════════════════════════════════════════════════
    aplicarFiltros(): void {
        const dias = this.diasDoPeriodo();

        // Série diária, em ordem cronológica (mais antigo → mais novo)
        const linhasDiarias: LinhaRelatorioDiario[] = [];
        for (let offset = dias - 1; offset >= 0; offset--) {
            const bruto = this.gerarDia(offset);
            const data = new Date();
            data.setDate(data.getDate() - offset);
            const lucro = Math.round((bruto.receita - bruto.despesas) * 100) / 100;
            const outrasReceitas = Math.round(bruto.receita * 0.035 * 100) / 100;
            linhasDiarias.push({
                data: data.toISOString().slice(0, 10),
                dataLabel: this.formatarDataCurta(data),
                pedidos: bruto.pedidos,
                produtos: Math.round(bruto.pedidos * (1.15 + this.seedRandom('produtos', offset) * 0.6)),
                receitaLiquida: bruto.receita,
                despesas: bruto.despesas,
                outrasReceitas,
                lucro,
                margemLucro: bruto.receita > 0 ? Math.round((lucro / bruto.receita) * 1000) / 10 : 0,
            });
        }

        // Mais de 90 dias no período (12 meses) → agrega por mês, senão a tabela fica gigante
        const linhasExibicao = dias > 90 ? this.agregarPorMes(linhasDiarias) : linhasDiarias;
        this.linhas = [...linhasExibicao].reverse(); // mais recente primeiro, como no relatório de referência

        this.montarResumo(dias);
        this.ultimasLinhasChart = linhasExibicao;
        this.ultimosDias = dias;
        this.montarGraficoCombo(linhasExibicao);
        this.montarFatiasPorLoja(dias);
    }

    private diasDoPeriodo(): number {
        switch (this.periodoSelecionado) {
            case '7d': return 7;
            case '30d': return 30;
            case '90d': return 90;
            case '12m': return 365;
            case 'personalizado': {
                if (!this.dataInicioPersonalizado || !this.dataFimPersonalizado) return 30;
                const diff = Math.round(
                    (new Date(this.dataFimPersonalizado).getTime() - new Date(this.dataInicioPersonalizado).getTime()) / 86400000
                ) + 1;
                return Math.min(Math.max(diff, 1), 366);
            }
        }
    }

    // ════════════════════════════════════════════════════════════
    // GERAÇÃO DO MOCK — determinística (mesmo filtro sempre dá o
    // mesmo resultado, sem "piscar" a cada change detection).
    // TODO: substituir por dados agregados reais do backend.
    // ════════════════════════════════════════════════════════════
    private hash(str: string): number {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
        return h;
    }
    private seedRandom(chave: string, offset: number): number {
        return (this.hash(chave + ':' + offset) % 10000) / 10000;
    }

    private gerarDiaLoja(lojaId: string, offsetDias: number): DiaBruto {
        const p = this.LOJAS_PARAMS[lojaId];
        if (!p) return { pedidos: 0, receita: 0, despesas: 0 };
        const sazonal = 1 + 0.35 * Math.sin((offsetDias / 6) * Math.PI * 2);
        const ruidoPedidos = 0.65 + this.seedRandom(lojaId, offsetDias) * 0.7;
        const pedidos = Math.max(0, Math.round(p.basePedidos * sazonal * ruidoPedidos));
        const ruidoTicket = 0.85 + this.seedRandom(lojaId, offsetDias + 5000) * 0.3;
        const receita = Math.round(pedidos * p.ticket * ruidoTicket * 100) / 100;
        const despesaPct = 0.06 + this.seedRandom(lojaId, offsetDias + 9000) * 0.10;
        const despesas = Math.round(receita * despesaPct * 100) / 100;
        return { pedidos, receita, despesas };
    }

    private gerarDia(offsetDias: number): DiaBruto {
        const lojasAlvo = this.lojaSelecionada === this.TODAS_LOJAS ? this.lojas.map(l => l.id) : [this.lojaSelecionada];
        let pedidos = 0, receita = 0, despesas = 0;
        for (const lojaId of lojasAlvo) {
            const d = this.gerarDiaLoja(lojaId, offsetDias);
            pedidos += d.pedidos; receita += d.receita; despesas += d.despesas;
        }
        return { pedidos, receita: Math.round(receita * 100) / 100, despesas: Math.round(despesas * 100) / 100 };
    }

    private somarPeriodo(offsetInicio: number, dias: number): DiaBruto {
        let pedidos = 0, receita = 0, despesas = 0;
        for (let offset = offsetInicio; offset < offsetInicio + dias; offset++) {
            const d = this.gerarDia(offset);
            pedidos += d.pedidos; receita += d.receita; despesas += d.despesas;
        }
        return { pedidos, receita: Math.round(receita * 100) / 100, despesas: Math.round(despesas * 100) / 100 };
    }

    private agregarPorMes(linhasDiarias: LinhaRelatorioDiario[]): LinhaRelatorioDiario[] {
        const porMes = new Map<string, LinhaRelatorioDiario>();
        for (const l of linhasDiarias) {
            const chave = l.data.slice(0, 7); // yyyy-mm
            const atual = porMes.get(chave);
            if (!atual) {
                porMes.set(chave, { ...l, data: chave + '-01', dataLabel: this.formatarMesLabel(chave) });
            } else {
                atual.pedidos += l.pedidos;
                atual.produtos += l.produtos;
                atual.receitaLiquida += l.receitaLiquida;
                atual.despesas += l.despesas;
                atual.outrasReceitas += l.outrasReceitas;
                atual.lucro += l.lucro;
            }
        }
        return Array.from(porMes.values()).map(m => {
            const receita = Math.round(m.receitaLiquida * 100) / 100;
            const lucro = Math.round(m.lucro * 100) / 100;
            return { ...m, receitaLiquida: receita, lucro, margemLucro: receita > 0 ? Math.round((lucro / receita) * 1000) / 10 : 0 };
        });
    }

    // ════════════════════════════════════════════════════════════
    // RESUMO (KPIs com variação % vs período anterior equivalente)
    // ════════════════════════════════════════════════════════════
    private montarResumo(dias: number): void {
        const atual = this.somarPeriodo(0, dias);
        const anterior = this.somarPeriodo(dias, dias);
        const delta = (a: number, b: number) => b === 0 ? (a === 0 ? 0 : 100) : Math.round(((a - b) / b) * 1000) / 10;

        const ticketAtual = atual.pedidos > 0 ? atual.receita / atual.pedidos : 0;
        const ticketAnterior = anterior.pedidos > 0 ? anterior.receita / anterior.pedidos : 0;
        const margemAtual = atual.receita > 0 ? ((atual.receita - atual.despesas) / atual.receita) * 100 : 0;
        const margemAnterior = anterior.receita > 0 ? ((anterior.receita - anterior.despesas) / anterior.receita) * 100 : 0;

        this.resumo = {
            receitaLiquida: { valor: atual.receita, deltaPercentual: delta(atual.receita, anterior.receita) },
            qtdPedidos: { valor: atual.pedidos, deltaPercentual: delta(atual.pedidos, anterior.pedidos) },
            ticketMedio: { valor: Math.round(ticketAtual * 100) / 100, deltaPercentual: delta(ticketAtual, ticketAnterior) },
            margemLucro: { valor: Math.round(margemAtual * 10) / 10, deltaPercentual: delta(margemAtual, margemAnterior) },
        };
    }

    // ════════════════════════════════════════════════════════════
    // GRÁFICOS (Chart.js via primeng/chart — mesma lib do Dashboard)
    // ════════════════════════════════════════════════════════════
    private montarGraficoCombo(linhas: LinhaRelatorioDiario[]): void {
        const escuro = this.layoutService.config().colorScheme === 'dark';
        const textColorSecondary = escuro ? '#a1a1aa' : '#6b7280';
        const gridColor = escuro ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';

        this.comboChartData = {
            labels: linhas.map(l => l.dataLabel),
            datasets: [
                {
                    type: 'bar',
                    label: 'Qtd. de Pedidos',
                    data: linhas.map(l => l.pedidos),
                    backgroundColor: 'rgba(99, 102, 241, 0.55)',
                    borderRadius: 4,
                    yAxisID: 'y1',
                    order: 2,
                },
                {
                    type: 'line',
                    label: 'Receita Líquida',
                    data: linhas.map(l => l.receitaLiquida),
                    borderColor: '#34d399',
                    backgroundColor: (ctx: any) => this.gradienteArea(ctx, 52, 211, 153),
                    pointBackgroundColor: '#34d399',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y',
                    order: 1,
                },
            ],
        };

        this.comboChartOptions = {
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { position: 'top', labels: { color: textColorSecondary, usePointStyle: true, boxWidth: 8 } },
                tooltip: {
                    backgroundColor: 'rgba(24, 24, 27, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#d4d4d8',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10,
                    usePointStyle: true,
                },
            },
            scales: {
                x: { ticks: { color: textColorSecondary, maxRotation: 0 }, grid: { display: false } },
                y: {
                    position: 'left', ticks: { color: textColorSecondary },
                    grid: { color: gridColor, borderDash: [4, 4], drawBorder: false },
                    title: { display: true, text: 'Receita (R$)', color: textColorSecondary, font: { size: 11 } },
                },
                y1: {
                    position: 'right', ticks: { color: textColorSecondary }, grid: { display: false },
                    title: { display: true, text: 'Pedidos', color: textColorSecondary, font: { size: 11 } },
                },
            },
        };
    }

    // Gradiente vertical (50% de opacidade → 0%) pra área preenchida — mesmo tratamento do Dashboard
    private gradienteArea(context: any, r: number, g: number, b: number): any {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return `rgba(${r}, ${g}, ${b}, 0.1)`;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        return gradient;
    }

    private montarFatiasPorLoja(dias: number): void {
        const totais = this.lojas.map(loja => {
            let receita = 0;
            for (let offset = 0; offset < dias; offset++) receita += this.gerarDiaLoja(loja.id, offset).receita;
            return { lojaId: loja.id, nome: loja.nome, marketplace: loja.marketplace, receita: Math.round(receita * 100) / 100 };
        });
        const totalGeral = totais.reduce((acc, t) => acc + t.receita, 0);

        this.fatiasPorLoja = totais
            .map(t => ({ ...t, percentual: totalGeral > 0 ? Math.round((t.receita / totalGeral) * 1000) / 10 : 0 }))
            .sort((a, b) => b.receita - a.receita);

        this.doughnutChartData = {
            labels: this.fatiasPorLoja.map(f => f.nome),
            datasets: [{
                data: this.fatiasPorLoja.map(f => f.receita),
                backgroundColor: this.fatiasPorLoja.map(f => this.MKT_COLORS[f.marketplace]),
                borderWidth: 0,
                hoverOffset: 6,
            }],
        };
        this.doughnutChartOptions = {
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(24, 24, 27, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#d4d4d8',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10,
                },
            },
        };
    }

    // ════════════════════════════════════════════════════════════
    // EXPORTAR XLSX — feito 100% no front (lib "xlsx")
    // ════════════════════════════════════════════════════════════
    exportarXLSX(): void {
        this.exportando = true;
        try {
            const dados = this.linhas.map(l => ({
                'Data': l.dataLabel,
                'Pedidos': l.pedidos,
                'Qtd. de Produtos': l.produtos,
                'Receita Líquida': l.receitaLiquida,
                'Despesas': l.despesas,
                'Outras Receitas': l.outrasReceitas,
                'Lucro': l.lucro,
                'Margem de Lucro (%)': l.margemLucro,
            }));
            const ws = XLSX.utils.json_to_sheet(dados);
            ws['!cols'] = [{ wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 16 }];
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
            const nomeArquivo = `relatorio-ultraerp-${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(wb, nomeArquivo);
        } finally {
            this.exportando = false;
        }
    }

    // ════════════════════════════════════════════════════════════
    // HELPERS DE EXIBIÇÃO
    // ════════════════════════════════════════════════════════════
    private formatarDataCurta(data: Date): string {
        const p = (n: number) => String(n).padStart(2, '0');
        return `${p(data.getDate())}/${p(data.getMonth() + 1)}`;
    }

    private formatarMesLabel(chaveMes: string): string {
        const [ano, mes] = chaveMes.split('-').map(Number);
        const nomes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return `${nomes[mes - 1]}/${String(ano).slice(2)}`;
    }

    formatarMoeda(valor: number): string {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    formatarNumero(valor: number): string {
        return valor.toLocaleString('pt-BR');
    }

    trendClass(delta: number): string {
        if (delta > 0.05) return 'trend-up';
        if (delta < -0.05) return 'trend-down';
        return 'trend-flat';
    }

    trendIcon(delta: number): string {
        if (delta > 0.05) return 'pi-arrow-up-right';
        if (delta < -0.05) return 'pi-arrow-down-right';
        return 'pi-minus';
    }

    lojaNome(lojaId: string): string {
        return this.lojas.find(l => l.id === lojaId)?.nome ?? 'Todas as lojas';
    }
}

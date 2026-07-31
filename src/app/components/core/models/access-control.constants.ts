export enum Modules {
    Cadastro = '01',
    Configuration = '02',
    Commercial = '03',
    Finance = '05',
    Group = '06'
}

export enum AccessLevel {
    Read = '00',
    Create = '01',
    Update = '02',
    Delete = '03',
    Print = '04',
    Ativar = '10'
}

export class AccessControlCadastro {
    static readonly Banco = '05';
    static readonly Cidade = "01";
    static readonly Estado = "02";
    static readonly Pais = "03";
    static readonly Pessoa = "04";
    static readonly Feriado = "06";
    static readonly CentroCusto = "07";
    static readonly Produto = "08";
    static readonly CstIcmsOrigemMaterial = "09";
    static readonly CstIcms = "10";
    static readonly CstIpi = "11";
    static readonly CstPisCofins = "12";
    static readonly TipoConsumidor = "13";
    static readonly Origem = "20";
    static readonly Regiao = "21";
    static readonly SegmentoCliente = "16";
    static readonly SegmentoEstrategico = "17";
    static readonly Departamento = "18";
    static readonly Cargo = "19";
    static readonly Vendas = "14";
    static readonly Fatura = "15";
    static readonly Grupo = "22";
    static readonly CodigoImportacao = "23";
    static readonly Setor = "24";
    static readonly Rua = "25";
    static readonly Subgrupo = "26";
    static readonly Prateleira = "27";
    static readonly Ncm = "28";
    static readonly Familia = "29";
    static readonly OrigemMaterial = "30";
    static readonly TipoProduto = "31";
    static readonly TipoPreco = "32";
    static readonly SetorProduto = "33";
    static readonly Funcionalidade = "34";
    static readonly NivelAcesso = "35";
    static readonly UnidadeMedida = "36";
    static readonly ClasseReajuste = "37";
    static readonly DesgastePolimento = "38";
    static readonly NormaAbnt = "39";
    static readonly TipoFrete = "40";
    static readonly Pis = "41";
    static readonly Cofins = "42";
    static readonly FaturaItem = "43";
    static readonly Cfop = "44";
    static readonly Empresa = "45";
    static readonly RegimeTributario = "46";
    static readonly FaturaParametro = "47";
    static readonly Modalidade = "48";
    static readonly Acabamento = "49";
    static readonly CodigoDDI = "50";
    static readonly Moeda = "51";
    static readonly MotivoReposicao = "52";
    static readonly MotivoCancelamento = "53";
    static readonly Projeto = "54";
    static readonly ObraFase = "55";
    static readonly ObraOrigem = "56";
    static readonly ObraPadrao = "57";
    static readonly ObraProjeto = "58";
    static readonly Parametro = "59";
    static readonly MedidaJumbo = "60";
    static readonly Classificacao = "61";
    static readonly Despesa = "62";
    static readonly Operacao = "63";
    static readonly ContaAPagar = "64";
    static readonly Cartao = "65";
    static readonly Caminhao = "66";
    static readonly TipoCarroceria = "67";
    static readonly TipoRodado = "68";
    static readonly ContaAPagarPago = "69";
    static readonly FusoHorario = "70";
    static readonly CepBloqueado = "71";
    static readonly Chapa = "72";
    static readonly ContaBancaria = "73";
    static readonly MovimentoEstoque = "74";
    static readonly MinimoCobranca = "75";
    static readonly Representante = "76";
    static readonly ContaAReceber = "77";
    static readonly FluxoCaixa = "78";
    static readonly Duplicata = "79";
    static readonly OrdemFabricacao = "80";
    static readonly Romaneio = "81";
    static readonly Comissao = "82";
    static readonly PlanoDeContas = "83";
    static readonly FaturaTemporaria = "84";
    static readonly DashBoard = "85";
    static readonly PlanejamentoProducao = "86";

    static readonly Acabamento_Read = `${Modules.Cadastro}-${AccessControlCadastro.Acabamento}-00-${AccessLevel.Read}`;
    static readonly Acabamento_Create = `${Modules.Cadastro}-${AccessControlCadastro.Acabamento}-00-${AccessLevel.Create}`;
    static readonly Acabamento_Update = `${Modules.Cadastro}-${AccessControlCadastro.Acabamento}-00-${AccessLevel.Update}`;
    static readonly Acabamento_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Acabamento}-00-${AccessLevel.Delete}`;
    static readonly Acabamento_Print = `${Modules.Cadastro}-${AccessControlCadastro.Acabamento}-00-${AccessLevel.Print}`;

    static readonly Banco_Read = `${Modules.Cadastro}-${AccessControlCadastro.Banco}-00-${AccessLevel.Read}`;
    static readonly Banco_Create = `${Modules.Cadastro}-${AccessControlCadastro.Banco}-00-${AccessLevel.Create}`;
    static readonly Banco_Update = `${Modules.Cadastro}-${AccessControlCadastro.Banco}-00-${AccessLevel.Update}`;
    static readonly Banco_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Banco}-00-${AccessLevel.Delete}`;
    static readonly Banco_Print = `${Modules.Cadastro}-${AccessControlCadastro.Banco}-00-${AccessLevel.Print}`;

    static readonly Caminhao_Read = `${Modules.Cadastro}-${AccessControlCadastro.Caminhao}-00-${AccessLevel.Read}`;
    static readonly Caminhao_Create = `${Modules.Cadastro}-${AccessControlCadastro.Caminhao}-00-${AccessLevel.Create}`;
    static readonly Caminhao_Update = `${Modules.Cadastro}-${AccessControlCadastro.Caminhao}-00-${AccessLevel.Update}`;
    static readonly Caminhao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Caminhao}-00-${AccessLevel.Delete}`;
    static readonly Caminhao_Print = `${Modules.Cadastro}-${AccessControlCadastro.Caminhao}-00-${AccessLevel.Print}`;

    static readonly Cargo_Read = `${Modules.Cadastro}-${AccessControlCadastro.Cargo}-00-${AccessLevel.Read}`;
    static readonly Cargo_Create = `${Modules.Cadastro}-${AccessControlCadastro.Cargo}-00-${AccessLevel.Create}`;
    static readonly Cargo_Update = `${Modules.Cadastro}-${AccessControlCadastro.Cargo}-00-${AccessLevel.Update}`;
    static readonly Cargo_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Cargo}-00-${AccessLevel.Delete}`;
    static readonly Cargo_Print = `${Modules.Cadastro}-${AccessControlCadastro.Cargo}-00-${AccessLevel.Print}`;

    static readonly Cartao_Read = `${Modules.Cadastro}-${AccessControlCadastro.Cartao}-00-${AccessLevel.Read}`;
    static readonly Cartao_Create = `${Modules.Cadastro}-${AccessControlCadastro.Cartao}-00-${AccessLevel.Create}`;
    static readonly Cartao_Update = `${Modules.Cadastro}-${AccessControlCadastro.Cartao}-00-${AccessLevel.Update}`;
    static readonly Cartao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Cartao}-00-${AccessLevel.Delete}`;
    static readonly Cartao_Print = `${Modules.Cadastro}-${AccessControlCadastro.Cartao}-00-${AccessLevel.Print}`;

    static readonly CentroCusto_Read = `${Modules.Cadastro}-${AccessControlCadastro.CentroCusto}-00-${AccessLevel.Read}`;
    static readonly CentroCusto_Create = `${Modules.Cadastro}-${AccessControlCadastro.CentroCusto}-00-${AccessLevel.Create}`;
    static readonly CentroCusto_Update = `${Modules.Cadastro}-${AccessControlCadastro.CentroCusto}-00-${AccessLevel.Update}`;
    static readonly CentroCusto_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CentroCusto}-00-${AccessLevel.Delete}`;
    static readonly CentroCusto_Print = `${Modules.Cadastro}-${AccessControlCadastro.CentroCusto}-00-${AccessLevel.Print}`;

    static readonly CepBloqueado_Read = `${Modules.Cadastro}-${AccessControlCadastro.CepBloqueado}-00-${AccessLevel.Read}`;
    static readonly CepBloqueado_Create = `${Modules.Cadastro}-${AccessControlCadastro.CepBloqueado}-00-${AccessLevel.Create}`;
    static readonly CepBloqueado_Update = `${Modules.Cadastro}-${AccessControlCadastro.CepBloqueado}-00-${AccessLevel.Update}`;
    static readonly CepBloqueado_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CepBloqueado}-00-${AccessLevel.Delete}`;
    static readonly CepBloqueado_Print = `${Modules.Cadastro}-${AccessControlCadastro.CepBloqueado}-00-${AccessLevel.Print}`;

    static readonly Cfop_Read = `${Modules.Cadastro}-${AccessControlCadastro.Cfop}-00-${AccessLevel.Read}`;
    static readonly Cfop_Create = `${Modules.Cadastro}-${AccessControlCadastro.Cfop}-00-${AccessLevel.Create}`;
    static readonly Cfop_Update = `${Modules.Cadastro}-${AccessControlCadastro.Cfop}-00-${AccessLevel.Update}`;
    static readonly Cfop_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Cfop}-00-${AccessLevel.Delete}`;
    static readonly Cfop_Print = `${Modules.Cadastro}-${AccessControlCadastro.Cfop}-00-${AccessLevel.Print}`;

    static readonly Chapa_Read = `${Modules.Cadastro}-${AccessControlCadastro.Chapa}-00-${AccessLevel.Read}`;
    static readonly Chapa_Create = `${Modules.Cadastro}-${AccessControlCadastro.Chapa}-00-${AccessLevel.Create}`;
    static readonly Chapa_Update = `${Modules.Cadastro}-${AccessControlCadastro.Chapa}-00-${AccessLevel.Update}`;
    static readonly Chapa_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Chapa}-00-${AccessLevel.Delete}`;
    static readonly Chapa_Print = `${Modules.Cadastro}-${AccessControlCadastro.Chapa}-00-${AccessLevel.Print}`;

    static readonly Cidade_Read = `${Modules.Cadastro}-${AccessControlCadastro.Cidade}-00-${AccessLevel.Read}`;
    static readonly Cidade_Create = `${Modules.Cadastro}-${AccessControlCadastro.Cidade}-00-${AccessLevel.Create}`;
    static readonly Cidade_Update = `${Modules.Cadastro}-${AccessControlCadastro.Cidade}-00-${AccessLevel.Update}`;
    static readonly Cidade_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Cidade}-00-${AccessLevel.Delete}`;
    static readonly Cidade_Print = `${Modules.Cadastro}-${AccessControlCadastro.Cidade}-00-${AccessLevel.Print}`;

    static readonly ClasseReajuste_Read = `${Modules.Cadastro}-${AccessControlCadastro.ClasseReajuste}-00-${AccessLevel.Read}`;
    static readonly ClasseReajuste_Create = `${Modules.Cadastro}-${AccessControlCadastro.ClasseReajuste}-00-${AccessLevel.Create}`;
    static readonly ClasseReajuste_Update = `${Modules.Cadastro}-${AccessControlCadastro.ClasseReajuste}-00-${AccessLevel.Update}`;
    static readonly ClasseReajuste_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ClasseReajuste}-00-${AccessLevel.Delete}`;
    static readonly ClasseReajuste_Print = `${Modules.Cadastro}-${AccessControlCadastro.ClasseReajuste}-00-${AccessLevel.Print}`;

    static readonly Classificacao_Read = `${Modules.Cadastro}-${AccessControlCadastro.Classificacao}-00-${AccessLevel.Read}`;
    static readonly Classificacao_Create = `${Modules.Cadastro}-${AccessControlCadastro.Classificacao}-00-${AccessLevel.Create}`;
    static readonly Classificacao_Update = `${Modules.Cadastro}-${AccessControlCadastro.Classificacao}-00-${AccessLevel.Update}`;
    static readonly Classificacao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Classificacao}-00-${AccessLevel.Delete}`;
    static readonly Classificacao_Print = `${Modules.Cadastro}-${AccessControlCadastro.Classificacao}-00-${AccessLevel.Print}`;

    static readonly CodigoDDI_Read = `${Modules.Cadastro}-${AccessControlCadastro.CodigoDDI}-00-${AccessLevel.Read}`;
    static readonly CodigoDDI_Create = `${Modules.Cadastro}-${AccessControlCadastro.CodigoDDI}-00-${AccessLevel.Create}`;
    static readonly CodigoDDI_Update = `${Modules.Cadastro}-${AccessControlCadastro.CodigoDDI}-00-${AccessLevel.Update}`;
    static readonly CodigoDDI_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CodigoDDI}-00-${AccessLevel.Delete}`;
    static readonly CodigoDDI_Print = `${Modules.Cadastro}-${AccessControlCadastro.CodigoDDI}-00-${AccessLevel.Print}`;

    static readonly CodigoImportacao_Read = `${Modules.Cadastro}-${AccessControlCadastro.CodigoImportacao}-00-${AccessLevel.Read}`;
    static readonly CodigoImportacao_Create = `${Modules.Cadastro}-${AccessControlCadastro.CodigoImportacao}-00-${AccessLevel.Create}`;
    static readonly CodigoImportacao_Update = `${Modules.Cadastro}-${AccessControlCadastro.CodigoImportacao}-00-${AccessLevel.Update}`;
    static readonly CodigoImportacao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CodigoImportacao}-00-${AccessLevel.Delete}`;
    static readonly CodigoImportacao_Print = `${Modules.Cadastro}-${AccessControlCadastro.CodigoImportacao}-00-${AccessLevel.Print}`;

    static readonly Cofins_Read = `${Modules.Cadastro}-${AccessControlCadastro.Cofins}-00-${AccessLevel.Read}`;
    static readonly Cofins_Create = `${Modules.Cadastro}-${AccessControlCadastro.Cofins}-00-${AccessLevel.Create}`;
    static readonly Cofins_Update = `${Modules.Cadastro}-${AccessControlCadastro.Cofins}-00-${AccessLevel.Update}`;
    static readonly Cofins_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Cofins}-00-${AccessLevel.Delete}`;
    static readonly Cofins_Print = `${Modules.Cadastro}-${AccessControlCadastro.Cofins}-00-${AccessLevel.Print}`;

    static readonly Comissao_Read = `${Modules.Cadastro}-${AccessControlCadastro.Comissao}-00-${AccessLevel.Read}`;
    static readonly Comissao_Create = `${Modules.Cadastro}-${AccessControlCadastro.Comissao}-00-${AccessLevel.Create}`;
    static readonly Comissao_Update = `${Modules.Cadastro}-${AccessControlCadastro.Comissao}-00-${AccessLevel.Update}`;
    static readonly Comissao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Comissao}-00-${AccessLevel.Delete}`;
    static readonly Comissao_Print = `${Modules.Cadastro}-${AccessControlCadastro.Comissao}-00-${AccessLevel.Print}`;

    static readonly ContaAPagar_Read = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagar}-00-${AccessLevel.Read}`;
    static readonly ContaAPagar_Create = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagar}-00-${AccessLevel.Create}`;
    static readonly ContaAPagar_Update = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagar}-00-${AccessLevel.Update}`;
    static readonly ContaAPagar_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagar}-00-${AccessLevel.Delete}`;
    static readonly ContaAPagar_Print = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagar}-00-${AccessLevel.Print}`;

    static readonly ContaAPagarPago_Read = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagarPago}-00-${AccessLevel.Read}`;
    static readonly ContaAPagarPago_Create = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagarPago}-00-${AccessLevel.Create}`;
    static readonly ContaAPagarPago_Update = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagarPago}-00-${AccessLevel.Update}`;
    static readonly ContaAPagarPago_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagarPago}-00-${AccessLevel.Delete}`;
    static readonly ContaAPagarPago_Print = `${Modules.Cadastro}-${AccessControlCadastro.ContaAPagarPago}-00-${AccessLevel.Print}`;

    static readonly ContaAReceber_Read = `${Modules.Cadastro}-${AccessControlCadastro.ContaAReceber}-00-${AccessLevel.Read}`;
    static readonly ContaAReceber_Create = `${Modules.Cadastro}-${AccessControlCadastro.ContaAReceber}-00-${AccessLevel.Create}`;
    static readonly ContaAReceber_Update = `${Modules.Cadastro}-${AccessControlCadastro.ContaAReceber}-00-${AccessLevel.Update}`;
    static readonly ContaAReceber_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ContaAReceber}-00-${AccessLevel.Delete}`;
    static readonly ContaAReceber_Print = `${Modules.Cadastro}-${AccessControlCadastro.ContaAReceber}-00-${AccessLevel.Print}`;

    static readonly ContaBancaria_Read = `${Modules.Cadastro}-${AccessControlCadastro.ContaBancaria}-00-${AccessLevel.Read}`;
    static readonly ContaBancaria_Create = `${Modules.Cadastro}-${AccessControlCadastro.ContaBancaria}-00-${AccessLevel.Create}`;
    static readonly ContaBancaria_Update = `${Modules.Cadastro}-${AccessControlCadastro.ContaBancaria}-00-${AccessLevel.Update}`;
    static readonly ContaBancaria_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ContaBancaria}-00-${AccessLevel.Delete}`;
    static readonly ContaBancaria_Print = `${Modules.Cadastro}-${AccessControlCadastro.ContaBancaria}-00-${AccessLevel.Print}`;

    static readonly CstIcms_Read = `${Modules.Cadastro}-${AccessControlCadastro.CstIcms}-00-${AccessLevel.Read}`;
    static readonly CstIcms_Create = `${Modules.Cadastro}-${AccessControlCadastro.CstIcms}-00-${AccessLevel.Create}`;
    static readonly CstIcms_Update = `${Modules.Cadastro}-${AccessControlCadastro.CstIcms}-00-${AccessLevel.Update}`;
    static readonly CstIcms_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CstIcms}-00-${AccessLevel.Delete}`;
    static readonly CstIcms_Print = `${Modules.Cadastro}-${AccessControlCadastro.CstIcms}-00-${AccessLevel.Print}`;

    static readonly CstIcmsOrigemMaterial_Read = `${Modules.Cadastro}-${AccessControlCadastro.CstIcmsOrigemMaterial}-00-${AccessLevel.Read}`;
    static readonly CstIcmsOrigemMaterial_Create = `${Modules.Cadastro}-${AccessControlCadastro.CstIcmsOrigemMaterial}-00-${AccessLevel.Create}`;
    static readonly CstIcmsOrigemMaterial_Update = `${Modules.Cadastro}-${AccessControlCadastro.CstIcmsOrigemMaterial}-00-${AccessLevel.Update}`;
    static readonly CstIcmsOrigemMaterial_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CstIcmsOrigemMaterial}-00-${AccessLevel.Delete}`;
    static readonly CstIcmsOrigemMaterial_Print = `${Modules.Cadastro}-${AccessControlCadastro.CstIcmsOrigemMaterial}-00-${AccessLevel.Print}`;

    static readonly CstIpi_Read = `${Modules.Cadastro}-${AccessControlCadastro.CstIpi}-00-${AccessLevel.Read}`;
    static readonly CstIpi_Create = `${Modules.Cadastro}-${AccessControlCadastro.CstIpi}-00-${AccessLevel.Create}`;
    static readonly CstIpi_Update = `${Modules.Cadastro}-${AccessControlCadastro.CstIpi}-00-${AccessLevel.Update}`;
    static readonly CstIpi_Delete = `${Modules.Cadastro}-${AccessControlCadastro.CstIpi}-00-${AccessLevel.Delete}`;
    static readonly CstIpi_Print = `${Modules.Cadastro}-${AccessControlCadastro.CstIpi}-00-${AccessLevel.Print}`;

    static readonly DashBoard_Read = `${Modules.Cadastro}-${AccessControlCadastro.DashBoard}-00-${AccessLevel.Read}`;
    static readonly DashBoard_Create = `${Modules.Cadastro}-${AccessControlCadastro.DashBoard}-00-${AccessLevel.Create}`;
    static readonly DashBoard_Update = `${Modules.Cadastro}-${AccessControlCadastro.DashBoard}-00-${AccessLevel.Update}`;
    static readonly DashBoard_Delete = `${Modules.Cadastro}-${AccessControlCadastro.DashBoard}-00-${AccessLevel.Delete}`;
    static readonly DashBoard_Print = `${Modules.Cadastro}-${AccessControlCadastro.DashBoard}-00-${AccessLevel.Print}`;

    static readonly Departamento_Read = `${Modules.Cadastro}-${AccessControlCadastro.Departamento}-00-${AccessLevel.Read}`;
    static readonly Departamento_Create = `${Modules.Cadastro}-${AccessControlCadastro.Departamento}-00-${AccessLevel.Create}`;
    static readonly Departamento_Update = `${Modules.Cadastro}-${AccessControlCadastro.Departamento}-00-${AccessLevel.Update}`;
    static readonly Departamento_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Departamento}-00-${AccessLevel.Delete}`;
    static readonly Departamento_Print = `${Modules.Cadastro}-${AccessControlCadastro.Departamento}-00-${AccessLevel.Print}`;

    static readonly DesgastePolimento_Read = `${Modules.Cadastro}-${AccessControlCadastro.DesgastePolimento}-00-${AccessLevel.Read}`;
    static readonly DesgastePolimento_Create = `${Modules.Cadastro}-${AccessControlCadastro.DesgastePolimento}-00-${AccessLevel.Create}`;
    static readonly DesgastePolimento_Update = `${Modules.Cadastro}-${AccessControlCadastro.DesgastePolimento}-00-${AccessLevel.Update}`;
    static readonly DesgastePolimento_Delete = `${Modules.Cadastro}-${AccessControlCadastro.DesgastePolimento}-00-${AccessLevel.Delete}`;
    static readonly DesgastePolimento_Print = `${Modules.Cadastro}-${AccessControlCadastro.DesgastePolimento}-00-${AccessLevel.Print}`;

    static readonly Despesa_Read = `${Modules.Cadastro}-${AccessControlCadastro.Despesa}-00-${AccessLevel.Read}`;
    static readonly Despesa_Create = `${Modules.Cadastro}-${AccessControlCadastro.Despesa}-00-${AccessLevel.Create}`;
    static readonly Despesa_Update = `${Modules.Cadastro}-${AccessControlCadastro.Despesa}-00-${AccessLevel.Update}`;
    static readonly Despesa_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Despesa}-00-${AccessLevel.Delete}`;
    static readonly Despesa_Print = `${Modules.Cadastro}-${AccessControlCadastro.Despesa}-00-${AccessLevel.Print}`;

    static readonly Duplicata_Read = `${Modules.Cadastro}-${AccessControlCadastro.Duplicata}-00-${AccessLevel.Read}`;
    static readonly Duplicata_Create = `${Modules.Cadastro}-${AccessControlCadastro.Duplicata}-00-${AccessLevel.Create}`;
    static readonly Duplicata_Update = `${Modules.Cadastro}-${AccessControlCadastro.Duplicata}-00-${AccessLevel.Update}`;
    static readonly Duplicata_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Duplicata}-00-${AccessLevel.Delete}`;
    static readonly Duplicata_Print = `${Modules.Cadastro}-${AccessControlCadastro.Duplicata}-00-${AccessLevel.Print}`;

    static readonly Empresa_Read = `${Modules.Cadastro}-${AccessControlCadastro.Empresa}-00-${AccessLevel.Read}`;
    static readonly Empresa_Create = `${Modules.Cadastro}-${AccessControlCadastro.Empresa}-00-${AccessLevel.Create}`;
    static readonly Empresa_Update = `${Modules.Cadastro}-${AccessControlCadastro.Empresa}-00-${AccessLevel.Update}`;
    static readonly Empresa_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Empresa}-00-${AccessLevel.Delete}`;
    static readonly Empresa_Print = `${Modules.Cadastro}-${AccessControlCadastro.Empresa}-00-${AccessLevel.Print}`;

    static readonly Estado_Read = `${Modules.Cadastro}-${AccessControlCadastro.Estado}-00-${AccessLevel.Read}`;
    static readonly Estado_Create = `${Modules.Cadastro}-${AccessControlCadastro.Estado}-00-${AccessLevel.Create}`;
    static readonly Estado_Update = `${Modules.Cadastro}-${AccessControlCadastro.Estado}-00-${AccessLevel.Update}`;
    static readonly Estado_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Estado}-00-${AccessLevel.Delete}`;
    static readonly Estado_Print = `${Modules.Cadastro}-${AccessControlCadastro.Estado}-00-${AccessLevel.Print}`;

    static readonly Familia_Read = `${Modules.Cadastro}-${AccessControlCadastro.Familia}-00-${AccessLevel.Read}`;
    static readonly Familia_Create = `${Modules.Cadastro}-${AccessControlCadastro.Familia}-00-${AccessLevel.Create}`;
    static readonly Familia_Update = `${Modules.Cadastro}-${AccessControlCadastro.Familia}-00-${AccessLevel.Update}`;
    static readonly Familia_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Familia}-00-${AccessLevel.Delete}`;
    static readonly Familia_Print = `${Modules.Cadastro}-${AccessControlCadastro.Familia}-00-${AccessLevel.Print}`;

    static readonly Fatura_Read = `${Modules.Cadastro}-${AccessControlCadastro.Fatura}-00-${AccessLevel.Read}`;
    static readonly Fatura_Create = `${Modules.Cadastro}-${AccessControlCadastro.Fatura}-00-${AccessLevel.Create}`;
    static readonly Fatura_Update = `${Modules.Cadastro}-${AccessControlCadastro.Fatura}-00-${AccessLevel.Update}`;
    static readonly Fatura_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Fatura}-00-${AccessLevel.Delete}`;
    static readonly Fatura_Print = `${Modules.Cadastro}-${AccessControlCadastro.Fatura}-00-${AccessLevel.Print}`;

    static readonly FaturaItem_Read = `${Modules.Cadastro}-${AccessControlCadastro.FaturaItem}-00-${AccessLevel.Read}`;
    static readonly FaturaItem_Create = `${Modules.Cadastro}-${AccessControlCadastro.FaturaItem}-00-${AccessLevel.Create}`;
    static readonly FaturaItem_Update = `${Modules.Cadastro}-${AccessControlCadastro.FaturaItem}-00-${AccessLevel.Update}`;
    static readonly FaturaItem_Delete = `${Modules.Cadastro}-${AccessControlCadastro.FaturaItem}-00-${AccessLevel.Delete}`;
    static readonly FaturaItem_Print = `${Modules.Cadastro}-${AccessControlCadastro.FaturaItem}-00-${AccessLevel.Print}`;

    static readonly FaturaParametro_Read = `${Modules.Cadastro}-${AccessControlCadastro.FaturaParametro}-00-${AccessLevel.Read}`;
    static readonly FaturaParametro_Create = `${Modules.Cadastro}-${AccessControlCadastro.FaturaParametro}-00-${AccessLevel.Create}`;
    static readonly FaturaParametro_Update = `${Modules.Cadastro}-${AccessControlCadastro.FaturaParametro}-00-${AccessLevel.Update}`;
    static readonly FaturaParametro_Delete = `${Modules.Cadastro}-${AccessControlCadastro.FaturaParametro}-00-${AccessLevel.Delete}`;
    static readonly FaturaParametro_Print = `${Modules.Cadastro}-${AccessControlCadastro.FaturaParametro}-00-${AccessLevel.Print}`;

    static readonly FaturaTemporaria_Read = `${Modules.Cadastro}-${AccessControlCadastro.FaturaTemporaria}-00-${AccessLevel.Read}`;
    static readonly FaturaTemporaria_Create = `${Modules.Cadastro}-${AccessControlCadastro.FaturaTemporaria}-00-${AccessLevel.Create}`;
    static readonly FaturaTemporaria_Update = `${Modules.Cadastro}-${AccessControlCadastro.FaturaTemporaria}-00-${AccessLevel.Update}`;
    static readonly FaturaTemporaria_Delete = `${Modules.Cadastro}-${AccessControlCadastro.FaturaTemporaria}-00-${AccessLevel.Delete}`;
    static readonly FaturaTemporaria_Print = `${Modules.Cadastro}-${AccessControlCadastro.FaturaTemporaria}-00-${AccessLevel.Print}`;

    static readonly Feriado_Read = `${Modules.Cadastro}-${AccessControlCadastro.Feriado}-00-${AccessLevel.Read}`;
    static readonly Feriado_Create = `${Modules.Cadastro}-${AccessControlCadastro.Feriado}-00-${AccessLevel.Create}`;
    static readonly Feriado_Update = `${Modules.Cadastro}-${AccessControlCadastro.Feriado}-00-${AccessLevel.Update}`;
    static readonly Feriado_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Feriado}-00-${AccessLevel.Delete}`;
    static readonly Feriado_Print = `${Modules.Cadastro}-${AccessControlCadastro.Feriado}-00-${AccessLevel.Print}`;

    static readonly FluxoCaixa_Read = `${Modules.Cadastro}-${AccessControlCadastro.FluxoCaixa}-00-${AccessLevel.Read}`;
    static readonly FluxoCaixa_Create = `${Modules.Cadastro}-${AccessControlCadastro.FluxoCaixa}-00-${AccessLevel.Create}`;
    static readonly FluxoCaixa_Update = `${Modules.Cadastro}-${AccessControlCadastro.FluxoCaixa}-00-${AccessLevel.Update}`;
    static readonly FluxoCaixa_Delete = `${Modules.Cadastro}-${AccessControlCadastro.FluxoCaixa}-00-${AccessLevel.Delete}`;
    static readonly FluxoCaixa_Print = `${Modules.Cadastro}-${AccessControlCadastro.FluxoCaixa}-00-${AccessLevel.Print}`;

    static readonly Funcionalidade_Read = `${Modules.Cadastro}-${AccessControlCadastro.Funcionalidade}-00-${AccessLevel.Read}`;
    static readonly Funcionalidade_Create = `${Modules.Cadastro}-${AccessControlCadastro.Funcionalidade}-00-${AccessLevel.Create}`;
    static readonly Funcionalidade_Update = `${Modules.Cadastro}-${AccessControlCadastro.Funcionalidade}-00-${AccessLevel.Update}`;
    static readonly Funcionalidade_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Funcionalidade}-00-${AccessLevel.Delete}`;
    static readonly Funcionalidade_Print = `${Modules.Cadastro}-${AccessControlCadastro.Funcionalidade}-00-${AccessLevel.Print}`;

    static readonly FusoHorario_Read = `${Modules.Cadastro}-${AccessControlCadastro.FusoHorario}-00-${AccessLevel.Read}`;
    static readonly FusoHorario_Create = `${Modules.Cadastro}-${AccessControlCadastro.FusoHorario}-00-${AccessLevel.Create}`;
    static readonly FusoHorario_Update = `${Modules.Cadastro}-${AccessControlCadastro.FusoHorario}-00-${AccessLevel.Update}`;
    static readonly FusoHorario_Delete = `${Modules.Cadastro}-${AccessControlCadastro.FusoHorario}-00-${AccessLevel.Delete}`;
    static readonly FusoHorario_Print = `${Modules.Cadastro}-${AccessControlCadastro.FusoHorario}-00-${AccessLevel.Print}`;

    static readonly Grupo_Read = `${Modules.Cadastro}-${AccessControlCadastro.Grupo}-00-${AccessLevel.Read}`;
    static readonly Grupo_Create = `${Modules.Cadastro}-${AccessControlCadastro.Grupo}-00-${AccessLevel.Create}`;
    static readonly Grupo_Update = `${Modules.Cadastro}-${AccessControlCadastro.Grupo}-00-${AccessLevel.Update}`;
    static readonly Grupo_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Grupo}-00-${AccessLevel.Delete}`;
    static readonly Grupo_Print = `${Modules.Cadastro}-${AccessControlCadastro.Grupo}-00-${AccessLevel.Print}`;

    static readonly MedidaJumbo_Read = `${Modules.Cadastro}-${AccessControlCadastro.MedidaJumbo}-00-${AccessLevel.Read}`;
    static readonly MedidaJumbo_Create = `${Modules.Cadastro}-${AccessControlCadastro.MedidaJumbo}-00-${AccessLevel.Create}`;
    static readonly MedidaJumbo_Update = `${Modules.Cadastro}-${AccessControlCadastro.MedidaJumbo}-00-${AccessLevel.Update}`;
    static readonly MedidaJumbo_Delete = `${Modules.Cadastro}-${AccessControlCadastro.MedidaJumbo}-00-${AccessLevel.Delete}`;
    static readonly MedidaJumbo_Print = `${Modules.Cadastro}-${AccessControlCadastro.MedidaJumbo}-00-${AccessLevel.Print}`;

    static readonly MinimoCobranca_Read = `${Modules.Cadastro}-${AccessControlCadastro.MinimoCobranca}-00-${AccessLevel.Read}`;
    static readonly MinimoCobranca_Create = `${Modules.Cadastro}-${AccessControlCadastro.MinimoCobranca}-00-${AccessLevel.Create}`;
    static readonly MinimoCobranca_Update = `${Modules.Cadastro}-${AccessControlCadastro.MinimoCobranca}-00-${AccessLevel.Update}`;
    static readonly MinimoCobranca_Delete = `${Modules.Cadastro}-${AccessControlCadastro.MinimoCobranca}-00-${AccessLevel.Delete}`;
    static readonly MinimoCobranca_Print = `${Modules.Cadastro}-${AccessControlCadastro.MinimoCobranca}-00-${AccessLevel.Print}`;

    static readonly Modalidade_Read = `${Modules.Cadastro}-${AccessControlCadastro.Modalidade}-00-${AccessLevel.Read}`;
    static readonly Modalidade_Create = `${Modules.Cadastro}-${AccessControlCadastro.Modalidade}-00-${AccessLevel.Create}`;
    static readonly Modalidade_Update = `${Modules.Cadastro}-${AccessControlCadastro.Modalidade}-00-${AccessLevel.Update}`;
    static readonly Modalidade_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Modalidade}-00-${AccessLevel.Delete}`;
    static readonly Modalidade_Print = `${Modules.Cadastro}-${AccessControlCadastro.Modalidade}-00-${AccessLevel.Print}`;

    static readonly Moeda_Read = `${Modules.Cadastro}-${AccessControlCadastro.Moeda}-00-${AccessLevel.Read}`;
    static readonly Moeda_Create = `${Modules.Cadastro}-${AccessControlCadastro.Moeda}-00-${AccessLevel.Create}`;
    static readonly Moeda_Update = `${Modules.Cadastro}-${AccessControlCadastro.Moeda}-00-${AccessLevel.Update}`;
    static readonly Moeda_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Moeda}-00-${AccessLevel.Delete}`;
    static readonly Moeda_Print = `${Modules.Cadastro}-${AccessControlCadastro.Moeda}-00-${AccessLevel.Print}`;

    static readonly MotivoCancelamento_Read = `${Modules.Cadastro}-${AccessControlCadastro.MotivoCancelamento}-00-${AccessLevel.Read}`;
    static readonly MotivoCancelamento_Create = `${Modules.Cadastro}-${AccessControlCadastro.MotivoCancelamento}-00-${AccessLevel.Create}`;
    static readonly MotivoCancelamento_Update = `${Modules.Cadastro}-${AccessControlCadastro.MotivoCancelamento}-00-${AccessLevel.Update}`;
    static readonly MotivoCancelamento_Delete = `${Modules.Cadastro}-${AccessControlCadastro.MotivoCancelamento}-00-${AccessLevel.Delete}`;
    static readonly MotivoCancelamento_Print = `${Modules.Cadastro}-${AccessControlCadastro.MotivoCancelamento}-00-${AccessLevel.Print}`;

    static readonly MotivoReposicao_Read = `${Modules.Cadastro}-${AccessControlCadastro.MotivoReposicao}-00-${AccessLevel.Read}`;
    static readonly MotivoReposicao_Create = `${Modules.Cadastro}-${AccessControlCadastro.MotivoReposicao}-00-${AccessLevel.Create}`;
    static readonly MotivoReposicao_Update = `${Modules.Cadastro}-${AccessControlCadastro.MotivoReposicao}-00-${AccessLevel.Update}`;
    static readonly MotivoReposicao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.MotivoReposicao}-00-${AccessLevel.Delete}`;
    static readonly MotivoReposicao_Print = `${Modules.Cadastro}-${AccessControlCadastro.MotivoReposicao}-00-${AccessLevel.Print}`;

    static readonly MovimentoEstoque_Read = `${Modules.Cadastro}-${AccessControlCadastro.MovimentoEstoque}-00-${AccessLevel.Read}`;
    static readonly MovimentoEstoque_Create = `${Modules.Cadastro}-${AccessControlCadastro.MovimentoEstoque}-00-${AccessLevel.Create}`;
    static readonly MovimentoEstoque_Update = `${Modules.Cadastro}-${AccessControlCadastro.MovimentoEstoque}-00-${AccessLevel.Update}`;
    static readonly MovimentoEstoque_Delete = `${Modules.Cadastro}-${AccessControlCadastro.MovimentoEstoque}-00-${AccessLevel.Delete}`;
    static readonly MovimentoEstoque_Print = `${Modules.Cadastro}-${AccessControlCadastro.MovimentoEstoque}-00-${AccessLevel.Print}`;

    static readonly Ncm_Read = `${Modules.Cadastro}-${AccessControlCadastro.Ncm}-00-${AccessLevel.Read}`;
    static readonly Ncm_Create = `${Modules.Cadastro}-${AccessControlCadastro.Ncm}-00-${AccessLevel.Create}`;
    static readonly Ncm_Update = `${Modules.Cadastro}-${AccessControlCadastro.Ncm}-00-${AccessLevel.Update}`;
    static readonly Ncm_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Ncm}-00-${AccessLevel.Delete}`;
    static readonly Ncm_Print = `${Modules.Cadastro}-${AccessControlCadastro.Ncm}-00-${AccessLevel.Print}`;

    static readonly NivelAcesso_Read = `${Modules.Cadastro}-${AccessControlCadastro.NivelAcesso}-00-${AccessLevel.Read}`;
    static readonly NivelAcesso_Create = `${Modules.Cadastro}-${AccessControlCadastro.NivelAcesso}-00-${AccessLevel.Create}`;
    static readonly NivelAcesso_Update = `${Modules.Cadastro}-${AccessControlCadastro.NivelAcesso}-00-${AccessLevel.Update}`;
    static readonly NivelAcesso_Delete = `${Modules.Cadastro}-${AccessControlCadastro.NivelAcesso}-00-${AccessLevel.Delete}`;
    static readonly NivelAcesso_Print = `${Modules.Cadastro}-${AccessControlCadastro.NivelAcesso}-00-${AccessLevel.Print}`;

    static readonly NormaAbnt_Read = `${Modules.Cadastro}-${AccessControlCadastro.NormaAbnt}-00-${AccessLevel.Read}`;
    static readonly NormaAbnt_Create = `${Modules.Cadastro}-${AccessControlCadastro.NormaAbnt}-00-${AccessLevel.Create}`;
    static readonly NormaAbnt_Update = `${Modules.Cadastro}-${AccessControlCadastro.NormaAbnt}-00-${AccessLevel.Update}`;
    static readonly NormaAbnt_Delete = `${Modules.Cadastro}-${AccessControlCadastro.NormaAbnt}-00-${AccessLevel.Delete}`;
    static readonly NormaAbnt_Print = `${Modules.Cadastro}-${AccessControlCadastro.NormaAbnt}-00-${AccessLevel.Print}`;

    static readonly ObraFase_Read = `${Modules.Cadastro}-${AccessControlCadastro.ObraFase}-00-${AccessLevel.Read}`;
    static readonly ObraFase_Create = `${Modules.Cadastro}-${AccessControlCadastro.ObraFase}-00-${AccessLevel.Create}`;
    static readonly ObraFase_Update = `${Modules.Cadastro}-${AccessControlCadastro.ObraFase}-00-${AccessLevel.Update}`;
    static readonly ObraFase_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ObraFase}-00-${AccessLevel.Delete}`;
    static readonly ObraFase_Print = `${Modules.Cadastro}-${AccessControlCadastro.ObraFase}-00-${AccessLevel.Print}`;

    static readonly ObraOrigem_Read = `${Modules.Cadastro}-${AccessControlCadastro.ObraOrigem}-00-${AccessLevel.Read}`;
    static readonly ObraOrigem_Create = `${Modules.Cadastro}-${AccessControlCadastro.ObraOrigem}-00-${AccessLevel.Create}`;
    static readonly ObraOrigem_Update = `${Modules.Cadastro}-${AccessControlCadastro.ObraOrigem}-00-${AccessLevel.Update}`;
    static readonly ObraOrigem_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ObraOrigem}-00-${AccessLevel.Delete}`;
    static readonly ObraOrigem_Print = `${Modules.Cadastro}-${AccessControlCadastro.ObraOrigem}-00-${AccessLevel.Print}`;

    static readonly ObraPadrao_Read = `${Modules.Cadastro}-${AccessControlCadastro.ObraPadrao}-00-${AccessLevel.Read}`;
    static readonly ObraPadrao_Create = `${Modules.Cadastro}-${AccessControlCadastro.ObraPadrao}-00-${AccessLevel.Create}`;
    static readonly ObraPadrao_Update = `${Modules.Cadastro}-${AccessControlCadastro.ObraPadrao}-00-${AccessLevel.Update}`;
    static readonly ObraPadrao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ObraPadrao}-00-${AccessLevel.Delete}`;
    static readonly ObraPadrao_Print = `${Modules.Cadastro}-${AccessControlCadastro.ObraPadrao}-00-${AccessLevel.Print}`;

    static readonly ObraProjeto_Read = `${Modules.Cadastro}-${AccessControlCadastro.ObraProjeto}-00-${AccessLevel.Read}`;
    static readonly ObraProjeto_Create = `${Modules.Cadastro}-${AccessControlCadastro.ObraProjeto}-00-${AccessLevel.Create}`;
    static readonly ObraProjeto_Update = `${Modules.Cadastro}-${AccessControlCadastro.ObraProjeto}-00-${AccessLevel.Update}`;
    static readonly ObraProjeto_Delete = `${Modules.Cadastro}-${AccessControlCadastro.ObraProjeto}-00-${AccessLevel.Delete}`;
    static readonly ObraProjeto_Print = `${Modules.Cadastro}-${AccessControlCadastro.ObraProjeto}-00-${AccessLevel.Print}`;

    static readonly Operacao_Read = `${Modules.Cadastro}-${AccessControlCadastro.Operacao}-00-${AccessLevel.Read}`;
    static readonly Operacao_Create = `${Modules.Cadastro}-${AccessControlCadastro.Operacao}-00-${AccessLevel.Create}`;
    static readonly Operacao_Update = `${Modules.Cadastro}-${AccessControlCadastro.Operacao}-00-${AccessLevel.Update}`;
    static readonly Operacao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Operacao}-00-${AccessLevel.Delete}`;
    static readonly Operacao_Print = `${Modules.Cadastro}-${AccessControlCadastro.Operacao}-00-${AccessLevel.Print}`;

    static readonly OrdemFabricacao_Read = `${Modules.Cadastro}-${AccessControlCadastro.OrdemFabricacao}-00-${AccessLevel.Read}`;
    static readonly OrdemFabricacao_Create = `${Modules.Cadastro}-${AccessControlCadastro.OrdemFabricacao}-00-${AccessLevel.Create}`;
    static readonly OrdemFabricacao_Update = `${Modules.Cadastro}-${AccessControlCadastro.OrdemFabricacao}-00-${AccessLevel.Update}`;
    static readonly OrdemFabricacao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.OrdemFabricacao}-00-${AccessLevel.Delete}`;
    static readonly OrdemFabricacao_Print = `${Modules.Cadastro}-${AccessControlCadastro.OrdemFabricacao}-00-${AccessLevel.Print}`;

    static readonly Origem_Read = `${Modules.Cadastro}-${AccessControlCadastro.Origem}-00-${AccessLevel.Read}`;
    static readonly Origem_Create = `${Modules.Cadastro}-${AccessControlCadastro.Origem}-00-${AccessLevel.Create}`;
    static readonly Origem_Update = `${Modules.Cadastro}-${AccessControlCadastro.Origem}-00-${AccessLevel.Update}`;
    static readonly Origem_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Origem}-00-${AccessLevel.Delete}`;
    static readonly Origem_Print = `${Modules.Cadastro}-${AccessControlCadastro.Origem}-00-${AccessLevel.Print}`;

    static readonly OrigemMaterial_Read = `${Modules.Cadastro}-${AccessControlCadastro.OrigemMaterial}-00-${AccessLevel.Read}`;
    static readonly OrigemMaterial_Create = `${Modules.Cadastro}-${AccessControlCadastro.OrigemMaterial}-00-${AccessLevel.Create}`;
    static readonly OrigemMaterial_Update = `${Modules.Cadastro}-${AccessControlCadastro.OrigemMaterial}-00-${AccessLevel.Update}`;
    static readonly OrigemMaterial_Delete = `${Modules.Cadastro}-${AccessControlCadastro.OrigemMaterial}-00-${AccessLevel.Delete}`;
    static readonly OrigemMaterial_Print = `${Modules.Cadastro}-${AccessControlCadastro.OrigemMaterial}-00-${AccessLevel.Print}`;

    static readonly Pais_Read = `${Modules.Cadastro}-${AccessControlCadastro.Pais}-00-${AccessLevel.Read}`;
    static readonly Pais_Create = `${Modules.Cadastro}-${AccessControlCadastro.Pais}-00-${AccessLevel.Create}`;
    static readonly Pais_Update = `${Modules.Cadastro}-${AccessControlCadastro.Pais}-00-${AccessLevel.Update}`;
    static readonly Pais_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Pais}-00-${AccessLevel.Delete}`;
    static readonly Pais_Print = `${Modules.Cadastro}-${AccessControlCadastro.Pais}-00-${AccessLevel.Print}`;

    static readonly Parametro_Read = `${Modules.Cadastro}-${AccessControlCadastro.Parametro}-00-${AccessLevel.Read}`;
    static readonly Parametro_Create = `${Modules.Cadastro}-${AccessControlCadastro.Parametro}-00-${AccessLevel.Create}`;
    static readonly Parametro_Update = `${Modules.Cadastro}-${AccessControlCadastro.Parametro}-00-${AccessLevel.Update}`;
    static readonly Parametro_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Parametro}-00-${AccessLevel.Delete}`;
    static readonly Parametro_Print = `${Modules.Cadastro}-${AccessControlCadastro.Parametro}-00-${AccessLevel.Print}`;

    static readonly Pessoa_Read = `${Modules.Cadastro}-${AccessControlCadastro.Pessoa}-00-${AccessLevel.Read}`;
    static readonly Pessoa_Create = `${Modules.Cadastro}-${AccessControlCadastro.Pessoa}-00-${AccessLevel.Create}`;
    static readonly Pessoa_Update = `${Modules.Cadastro}-${AccessControlCadastro.Pessoa}-00-${AccessLevel.Update}`;
    static readonly Pessoa_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Pessoa}-00-${AccessLevel.Delete}`;
    static readonly Pessoa_Print = `${Modules.Cadastro}-${AccessControlCadastro.Pessoa}-00-${AccessLevel.Print}`;

    static readonly Pis_Read = `${Modules.Cadastro}-${AccessControlCadastro.Pis}-00-${AccessLevel.Read}`;
    static readonly Pis_Create = `${Modules.Cadastro}-${AccessControlCadastro.Pis}-00-${AccessLevel.Create}`;
    static readonly Pis_Update = `${Modules.Cadastro}-${AccessControlCadastro.Pis}-00-${AccessLevel.Update}`;
    static readonly Pis_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Pis}-00-${AccessLevel.Delete}`;
    static readonly Pis_Print = `${Modules.Cadastro}-${AccessControlCadastro.Pis}-00-${AccessLevel.Print}`;

    static readonly PlanejamentoProducao_Read = `${Modules.Cadastro}-${AccessControlCadastro.PlanejamentoProducao}-00-${AccessLevel.Read}`;
    static readonly PlanejamentoProducao_Create = `${Modules.Cadastro}-${AccessControlCadastro.PlanejamentoProducao}-00-${AccessLevel.Create}`;
    static readonly PlanejamentoProducao_Update = `${Modules.Cadastro}-${AccessControlCadastro.PlanejamentoProducao}-00-${AccessLevel.Update}`;
    static readonly PlanejamentoProducao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.PlanejamentoProducao}-00-${AccessLevel.Delete}`;
    static readonly PlanejamentoProducao_Print = `${Modules.Cadastro}-${AccessControlCadastro.PlanejamentoProducao}-00-${AccessLevel.Print}`;

    static readonly PlanoDeContas_Read = `${Modules.Cadastro}-${AccessControlCadastro.PlanoDeContas}-00-${AccessLevel.Read}`;
    static readonly PlanoDeContas_Create = `${Modules.Cadastro}-${AccessControlCadastro.PlanoDeContas}-00-${AccessLevel.Create}`;
    static readonly PlanoDeContas_Update = `${Modules.Cadastro}-${AccessControlCadastro.PlanoDeContas}-00-${AccessLevel.Update}`;
    static readonly PlanoDeContas_Delete = `${Modules.Cadastro}-${AccessControlCadastro.PlanoDeContas}-00-${AccessLevel.Delete}`;
    static readonly PlanoDeContas_Print = `${Modules.Cadastro}-${AccessControlCadastro.PlanoDeContas}-00-${AccessLevel.Print}`;

    static readonly Prateleira_Read = `${Modules.Cadastro}-${AccessControlCadastro.Prateleira}-00-${AccessLevel.Read}`;
    static readonly Prateleira_Create = `${Modules.Cadastro}-${AccessControlCadastro.Prateleira}-00-${AccessLevel.Create}`;
    static readonly Prateleira_Update = `${Modules.Cadastro}-${AccessControlCadastro.Prateleira}-00-${AccessLevel.Update}`;
    static readonly Prateleira_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Prateleira}-00-${AccessLevel.Delete}`;
    static readonly Prateleira_Print = `${Modules.Cadastro}-${AccessControlCadastro.Prateleira}-00-${AccessLevel.Print}`;

    static readonly Produto_Read = `${Modules.Cadastro}-${AccessControlCadastro.Produto}-00-${AccessLevel.Read}`;
    static readonly Produto_Create = `${Modules.Cadastro}-${AccessControlCadastro.Produto}-00-${AccessLevel.Create}`;
    static readonly Produto_Update = `${Modules.Cadastro}-${AccessControlCadastro.Produto}-00-${AccessLevel.Update}`;
    static readonly Produto_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Produto}-00-${AccessLevel.Delete}`;
    static readonly Produto_Print = `${Modules.Cadastro}-${AccessControlCadastro.Produto}-00-${AccessLevel.Print}`;

    static readonly Projeto_Read = `${Modules.Cadastro}-${AccessControlCadastro.Projeto}-00-${AccessLevel.Read}`;
    static readonly Projeto_Create = `${Modules.Cadastro}-${AccessControlCadastro.Projeto}-00-${AccessLevel.Create}`;
    static readonly Projeto_Update = `${Modules.Cadastro}-${AccessControlCadastro.Projeto}-00-${AccessLevel.Update}`;
    static readonly Projeto_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Projeto}-00-${AccessLevel.Delete}`;
    static readonly Projeto_Print = `${Modules.Cadastro}-${AccessControlCadastro.Projeto}-00-${AccessLevel.Print}`;

    static readonly Regiao_Read = `${Modules.Cadastro}-${AccessControlCadastro.Regiao}-00-${AccessLevel.Read}`;
    static readonly Regiao_Create = `${Modules.Cadastro}-${AccessControlCadastro.Regiao}-00-${AccessLevel.Create}`;
    static readonly Regiao_Update = `${Modules.Cadastro}-${AccessControlCadastro.Regiao}-00-${AccessLevel.Update}`;
    static readonly Regiao_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Regiao}-00-${AccessLevel.Delete}`;
    static readonly Regiao_Print = `${Modules.Cadastro}-${AccessControlCadastro.Regiao}-00-${AccessLevel.Print}`;

    static readonly RegimeTributario_Read = `${Modules.Cadastro}-${AccessControlCadastro.RegimeTributario}-00-${AccessLevel.Read}`;
    static readonly RegimeTributario_Create = `${Modules.Cadastro}-${AccessControlCadastro.RegimeTributario}-00-${AccessLevel.Create}`;
    static readonly RegimeTributario_Update = `${Modules.Cadastro}-${AccessControlCadastro.RegimeTributario}-00-${AccessLevel.Update}`;
    static readonly RegimeTributario_Delete = `${Modules.Cadastro}-${AccessControlCadastro.RegimeTributario}-00-${AccessLevel.Delete}`;
    static readonly RegimeTributario_Print = `${Modules.Cadastro}-${AccessControlCadastro.RegimeTributario}-00-${AccessLevel.Print}`;

    static readonly Representante_Read = `${Modules.Cadastro}-${AccessControlCadastro.Representante}-00-${AccessLevel.Read}`;
    static readonly Representante_Create = `${Modules.Cadastro}-${AccessControlCadastro.Representante}-00-${AccessLevel.Create}`;
    static readonly Representante_Update = `${Modules.Cadastro}-${AccessControlCadastro.Representante}-00-${AccessLevel.Update}`;
    static readonly Representante_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Representante}-00-${AccessLevel.Delete}`;
    static readonly Representante_Print = `${Modules.Cadastro}-${AccessControlCadastro.Representante}-00-${AccessLevel.Print}`;

    static readonly Romaneio_Read = `${Modules.Cadastro}-${AccessControlCadastro.Romaneio}-00-${AccessLevel.Read}`;
    static readonly Romaneio_Create = `${Modules.Cadastro}-${AccessControlCadastro.Romaneio}-00-${AccessLevel.Create}`;
    static readonly Romaneio_Update = `${Modules.Cadastro}-${AccessControlCadastro.Romaneio}-00-${AccessLevel.Update}`;
    static readonly Romaneio_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Romaneio}-00-${AccessLevel.Delete}`;
    static readonly Romaneio_Print = `${Modules.Cadastro}-${AccessControlCadastro.Romaneio}-00-${AccessLevel.Print}`;

    static readonly Rua_Read = `${Modules.Cadastro}-${AccessControlCadastro.Rua}-00-${AccessLevel.Read}`;
    static readonly Rua_Create = `${Modules.Cadastro}-${AccessControlCadastro.Rua}-00-${AccessLevel.Create}`;
    static readonly Rua_Update = `${Modules.Cadastro}-${AccessControlCadastro.Rua}-00-${AccessLevel.Update}`;
    static readonly Rua_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Rua}-00-${AccessLevel.Delete}`;
    static readonly Rua_Print = `${Modules.Cadastro}-${AccessControlCadastro.Rua}-00-${AccessLevel.Print}`;

    static readonly SegmentoCliente_Read = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoCliente}-00-${AccessLevel.Read}`;
    static readonly SegmentoCliente_Create = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoCliente}-00-${AccessLevel.Create}`;
    static readonly SegmentoCliente_Update = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoCliente}-00-${AccessLevel.Update}`;
    static readonly SegmentoCliente_Delete = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoCliente}-00-${AccessLevel.Delete}`;
    static readonly SegmentoCliente_Print = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoCliente}-00-${AccessLevel.Print}`;

    static readonly SegmentoEstrategico_Read = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoEstrategico}-00-${AccessLevel.Read}`;
    static readonly SegmentoEstrategico_Create = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoEstrategico}-00-${AccessLevel.Create}`;
    static readonly SegmentoEstrategico_Update = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoEstrategico}-00-${AccessLevel.Update}`;
    static readonly SegmentoEstrategico_Delete = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoEstrategico}-00-${AccessLevel.Delete}`;
    static readonly SegmentoEstrategico_Print = `${Modules.Cadastro}-${AccessControlCadastro.SegmentoEstrategico}-00-${AccessLevel.Print}`;

    static readonly Setor_Read = `${Modules.Cadastro}-${AccessControlCadastro.Setor}-00-${AccessLevel.Read}`;
    static readonly Setor_Create = `${Modules.Cadastro}-${AccessControlCadastro.Setor}-00-${AccessLevel.Create}`;
    static readonly Setor_Update = `${Modules.Cadastro}-${AccessControlCadastro.Setor}-00-${AccessLevel.Update}`;
    static readonly Setor_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Setor}-00-${AccessLevel.Delete}`;
    static readonly Setor_Print = `${Modules.Cadastro}-${AccessControlCadastro.Setor}-00-${AccessLevel.Print}`;

    static readonly SetorProduto_Read = `${Modules.Cadastro}-${AccessControlCadastro.SetorProduto}-00-${AccessLevel.Read}`;
    static readonly SetorProduto_Create = `${Modules.Cadastro}-${AccessControlCadastro.SetorProduto}-00-${AccessLevel.Create}`;
    static readonly SetorProduto_Update = `${Modules.Cadastro}-${AccessControlCadastro.SetorProduto}-00-${AccessLevel.Update}`;
    static readonly SetorProduto_Delete = `${Modules.Cadastro}-${AccessControlCadastro.SetorProduto}-00-${AccessLevel.Delete}`;
    static readonly SetorProduto_Print = `${Modules.Cadastro}-${AccessControlCadastro.SetorProduto}-00-${AccessLevel.Print}`;

    static readonly Subgrupo_Read = `${Modules.Cadastro}-${AccessControlCadastro.Subgrupo}-00-${AccessLevel.Read}`;
    static readonly Subgrupo_Create = `${Modules.Cadastro}-${AccessControlCadastro.Subgrupo}-00-${AccessLevel.Create}`;
    static readonly Subgrupo_Update = `${Modules.Cadastro}-${AccessControlCadastro.Subgrupo}-00-${AccessLevel.Update}`;
    static readonly Subgrupo_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Subgrupo}-00-${AccessLevel.Delete}`;
    static readonly Subgrupo_Print = `${Modules.Cadastro}-${AccessControlCadastro.Subgrupo}-00-${AccessLevel.Print}`;

    static readonly TipoCarroceria_Read = `${Modules.Cadastro}-${AccessControlCadastro.TipoCarroceria}-00-${AccessLevel.Read}`;
    static readonly TipoCarroceria_Create = `${Modules.Cadastro}-${AccessControlCadastro.TipoCarroceria}-00-${AccessLevel.Create}`;
    static readonly TipoCarroceria_Update = `${Modules.Cadastro}-${AccessControlCadastro.TipoCarroceria}-00-${AccessLevel.Update}`;
    static readonly TipoCarroceria_Delete = `${Modules.Cadastro}-${AccessControlCadastro.TipoCarroceria}-00-${AccessLevel.Delete}`;
    static readonly TipoCarroceria_Print = `${Modules.Cadastro}-${AccessControlCadastro.TipoCarroceria}-00-${AccessLevel.Print}`;

    static readonly TipoConsumidor_Read = `${Modules.Cadastro}-${AccessControlCadastro.TipoConsumidor}-00-${AccessLevel.Read}`;
    static readonly TipoConsumidor_Create = `${Modules.Cadastro}-${AccessControlCadastro.TipoConsumidor}-00-${AccessLevel.Create}`;
    static readonly TipoConsumidor_Update = `${Modules.Cadastro}-${AccessControlCadastro.TipoConsumidor}-00-${AccessLevel.Update}`;
    static readonly TipoConsumidor_Delete = `${Modules.Cadastro}-${AccessControlCadastro.TipoConsumidor}-00-${AccessLevel.Delete}`;
    static readonly TipoConsumidor_Print = `${Modules.Cadastro}-${AccessControlCadastro.TipoConsumidor}-00-${AccessLevel.Print}`;

    static readonly TipoFrete_Read = `${Modules.Cadastro}-${AccessControlCadastro.TipoFrete}-00-${AccessLevel.Read}`;
    static readonly TipoFrete_Create = `${Modules.Cadastro}-${AccessControlCadastro.TipoFrete}-00-${AccessLevel.Create}`;
    static readonly TipoFrete_Update = `${Modules.Cadastro}-${AccessControlCadastro.TipoFrete}-00-${AccessLevel.Update}`;
    static readonly TipoFrete_Delete = `${Modules.Cadastro}-${AccessControlCadastro.TipoFrete}-00-${AccessLevel.Delete}`;
    static readonly TipoFrete_Print = `${Modules.Cadastro}-${AccessControlCadastro.TipoFrete}-00-${AccessLevel.Print}`;

    static readonly TipoPreco_Read = `${Modules.Cadastro}-${AccessControlCadastro.TipoPreco}-00-${AccessLevel.Read}`;
    static readonly TipoPreco_Create = `${Modules.Cadastro}-${AccessControlCadastro.TipoPreco}-00-${AccessLevel.Create}`;
    static readonly TipoPreco_Update = `${Modules.Cadastro}-${AccessControlCadastro.TipoPreco}-00-${AccessLevel.Update}`;
    static readonly TipoPreco_Delete = `${Modules.Cadastro}-${AccessControlCadastro.TipoPreco}-00-${AccessLevel.Delete}`;
    static readonly TipoPreco_Print = `${Modules.Cadastro}-${AccessControlCadastro.TipoPreco}-00-${AccessLevel.Print}`;

    static readonly TipoProduto_Read = `${Modules.Cadastro}-${AccessControlCadastro.TipoProduto}-00-${AccessLevel.Read}`;
    static readonly TipoProduto_Create = `${Modules.Cadastro}-${AccessControlCadastro.TipoProduto}-00-${AccessLevel.Create}`;
    static readonly TipoProduto_Update = `${Modules.Cadastro}-${AccessControlCadastro.TipoProduto}-00-${AccessLevel.Update}`;
    static readonly TipoProduto_Delete = `${Modules.Cadastro}-${AccessControlCadastro.TipoProduto}-00-${AccessLevel.Delete}`;
    static readonly TipoProduto_Print = `${Modules.Cadastro}-${AccessControlCadastro.TipoProduto}-00-${AccessLevel.Print}`;

    static readonly TipoRodado_Read = `${Modules.Cadastro}-${AccessControlCadastro.TipoRodado}-00-${AccessLevel.Read}`;
    static readonly TipoRodado_Create = `${Modules.Cadastro}-${AccessControlCadastro.TipoRodado}-00-${AccessLevel.Create}`;
    static readonly TipoRodado_Update = `${Modules.Cadastro}-${AccessControlCadastro.TipoRodado}-00-${AccessLevel.Update}`;
    static readonly TipoRodado_Delete = `${Modules.Cadastro}-${AccessControlCadastro.TipoRodado}-00-${AccessLevel.Delete}`;
    static readonly TipoRodado_Print = `${Modules.Cadastro}-${AccessControlCadastro.TipoRodado}-00-${AccessLevel.Print}`;

    static readonly UnidadeMedida_Read = `${Modules.Cadastro}-${AccessControlCadastro.UnidadeMedida}-00-${AccessLevel.Read}`;
    static readonly UnidadeMedida_Create = `${Modules.Cadastro}-${AccessControlCadastro.UnidadeMedida}-00-${AccessLevel.Create}`;
    static readonly UnidadeMedida_Update = `${Modules.Cadastro}-${AccessControlCadastro.UnidadeMedida}-00-${AccessLevel.Update}`;
    static readonly UnidadeMedida_Delete = `${Modules.Cadastro}-${AccessControlCadastro.UnidadeMedida}-00-${AccessLevel.Delete}`;
    static readonly UnidadeMedida_Print = `${Modules.Cadastro}-${AccessControlCadastro.UnidadeMedida}-00-${AccessLevel.Print}`;

    static readonly Vendas_Read = `${Modules.Cadastro}-${AccessControlCadastro.Vendas}-00-${AccessLevel.Read}`;
    static readonly Vendas_Create = `${Modules.Cadastro}-${AccessControlCadastro.Vendas}-00-${AccessLevel.Create}`;
    static readonly Vendas_Update = `${Modules.Cadastro}-${AccessControlCadastro.Vendas}-00-${AccessLevel.Update}`;
    static readonly Vendas_Delete = `${Modules.Cadastro}-${AccessControlCadastro.Vendas}-00-${AccessLevel.Delete}`;
    static readonly Vendas_Print = `${Modules.Cadastro}-${AccessControlCadastro.Vendas}-00-${AccessLevel.Print}`;
}

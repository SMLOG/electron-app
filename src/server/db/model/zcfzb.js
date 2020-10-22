const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  
    class Zcfzb extends Model {}
    Zcfzb.init(
      {
    "id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECURITYCODE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITYCODE",
        "unique": "compositeIndex"
    },
    "REPORTTYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTTYPE",
        "unique": "compositeIndex"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTDATETYPE",
        "unique": "compositeIndex"
    },
    "TYPE": {
        "type": DataTypes.DOUBLE,
        "field": "TYPE"
    },
    "CURRENCY": {
        "type": DataTypes.STRING(10),
        "field": "CURRENCY"
    },
    "MONETARYFUND": {
        "display": "货币资金",
        "type": DataTypes.DOUBLE,
        "field": "MONETARYFUND"
    },
    "CLIENTFUND": {
        "display": "其中:客户资金存款",
        "type": DataTypes.DOUBLE,
        "field": "CLIENTFUND"
    },
    "CLIENTCREDITFUND": {
        "display": "客户信用资金存款",
        "type": DataTypes.DOUBLE,
        "field": "CLIENTCREDITFUND"
    },
    "SETTLEMENTPROVISION": {
        "display": "结算备付金",
        "type": DataTypes.DOUBLE,
        "field": "SETTLEMENTPROVISION"
    },
    "CLIENTPROVISION": {
        "display": "其中:客户备付金",
        "type": DataTypes.DOUBLE,
        "field": "CLIENTPROVISION"
    },
    "CREDITPROVISION": {
        "display": "信用备付金",
        "type": DataTypes.DOUBLE,
        "field": "CREDITPROVISION"
    },
    "LENDFUND": {
        "display": "拆出资金",
        "type": DataTypes.DOUBLE,
        "field": "LENDFUND"
    },
    "MARGINOUTFUND": {
        "display": "融出资金",
        "type": DataTypes.DOUBLE,
        "field": "MARGINOUTFUND"
    },
    "MARGINOUTSECURITY": {
        "display": "融出证券",
        "type": DataTypes.DOUBLE,
        "field": "MARGINOUTSECURITY"
    },
    "FVALUEFASSET": {
        "display": "以公允价值计量且其变动计入当期损益的金融资产",
        "type": DataTypes.DOUBLE,
        "field": "FVALUEFASSET"
    },
    "TRADEFASSET": {
        "display": "其中:交易性金融资产",
        "type": DataTypes.DOUBLE,
        "field": "TRADEFASSET"
    },
    "DEFINEFVALUEFASSET": {
        "display": "指定以公允价值计量且其变动计入当期损益的金融资产",
        "type": DataTypes.DOUBLE,
        "field": "DEFINEFVALUEFASSET"
    },
    "DERIVEFASSET": {
        "display": "衍生金融资产",
        "type": DataTypes.DOUBLE,
        "field": "DERIVEFASSET"
    },
    "BUYSELLBACKFASSET": {
        "display": "买入返售金融资产",
        "type": DataTypes.DOUBLE,
        "field": "BUYSELLBACKFASSET"
    },
    "INTERESTREC": {
        "display": "应收利息",
        "type": DataTypes.DOUBLE,
        "field": "INTERESTREC"
    },
    "DIVIDENDREC": {
        "display": "应收股利",
        "type": DataTypes.DOUBLE,
        "field": "DIVIDENDREC"
    },
    "RECEIVABLES": {
        "display": "应收款项",
        "type": DataTypes.DOUBLE,
        "field": "RECEIVABLES"
    },
    "GDEPOSITPAY": {
        "display": "存出保证金",
        "type": DataTypes.DOUBLE,
        "field": "GDEPOSITPAY"
    },
    "SALEABLEFASSET": {
        "display": "可供出售金融资产",
        "type": DataTypes.DOUBLE,
        "field": "SALEABLEFASSET"
    },
    "HELDMATURITYINV": {
        "display": "持有至到期投资",
        "type": DataTypes.DOUBLE,
        "field": "HELDMATURITYINV"
    },
    "AGENCYASSETS": {
        "display": "代理业务资产",
        "type": DataTypes.DOUBLE,
        "field": "AGENCYASSETS"
    },
    "LTEQUITYINV": {
        "display": "长期股权投资",
        "type": DataTypes.DOUBLE,
        "field": "LTEQUITYINV"
    },
    "ESTATEINVEST": {
        "display": "投资性房地产",
        "type": DataTypes.DOUBLE,
        "field": "ESTATEINVEST"
    },
    "FIXEDASSET": {
        "display": "固定资产",
        "type": DataTypes.DOUBLE,
        "field": "FIXEDASSET"
    },
    "CONSTRUCTIONPROGRESS": {
        "display": "在建工程",
        "type": DataTypes.DOUBLE,
        "field": "CONSTRUCTIONPROGRESS"
    },
    "INTANGIBLEASSET": {
        "display": "无形资产",
        "type": DataTypes.DOUBLE,
        "field": "INTANGIBLEASSET"
    },
    "SEATFEE": {
        "display": "其中:交易席位费",
        "type": DataTypes.DOUBLE,
        "field": "SEATFEE"
    },
    "GOODWILL": {
        "display": "商誉",
        "type": DataTypes.DOUBLE,
        "field": "GOODWILL"
    },
    "DEFERINCOMETAXASSET": {
        "display": "递延所得税资产",
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOMETAXASSET"
    },
    "OTHERASSET": {
        "display": "其他资产",
        "type": DataTypes.DOUBLE,
        "field": "OTHERASSET"
    },
    "SUMASSET": {
        "display": "资产总计",
        "type": DataTypes.DOUBLE,
        "field": "SUMASSET"
    },
    "STBORROW": {
        "display": "短期借款",
        "type": DataTypes.DOUBLE,
        "field": "STBORROW"
    },
    "PLEDGEBORROW": {
        "display": "其中:质押借款",
        "type": DataTypes.DOUBLE,
        "field": "PLEDGEBORROW"
    },
    "BORROWFUND": {
        "display": "拆入资金",
        "type": DataTypes.DOUBLE,
        "field": "BORROWFUND"
    },
    "FVALUEFLIAB": {
        "display": "以公允价值计量且其变动计入当期损益的金融负债",
        "type": DataTypes.DOUBLE,
        "field": "FVALUEFLIAB"
    },
    "TRADEFLIAB": {
        "display": "其中:交易性金融负债",
        "type": DataTypes.DOUBLE,
        "field": "TRADEFLIAB"
    },
    "DEFINEFVALUEFLIAB": {
        "display": "指定以公允价值计量且其变动计入当期损益的金融负债",
        "type": DataTypes.DOUBLE,
        "field": "DEFINEFVALUEFLIAB"
    },
    "DERIVEFLIAB": {
        "display": "衍生金融负债",
        "type": DataTypes.DOUBLE,
        "field": "DERIVEFLIAB"
    },
    "SELLBUYBACKFASSET": {
        "display": "卖出回购金融资产款",
        "type": DataTypes.DOUBLE,
        "field": "SELLBUYBACKFASSET"
    },
    "AGENTTRADESECURITY": {
        "display": "代理买卖证券款",
        "type": DataTypes.DOUBLE,
        "field": "AGENTTRADESECURITY"
    },
    "CAGENTTRADESECURITY": {
        "display": "客户信用交易代理买卖证券款",
        "type": DataTypes.DOUBLE,
        "field": "CAGENTTRADESECURITY"
    },
    "AGENTUWSECURITY": {
        "display": "代理承销证券款",
        "type": DataTypes.DOUBLE,
        "field": "AGENTUWSECURITY"
    },
    "ACCOUNTPAY": {
        "display": "应付账款",
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTPAY"
    },
    "SALARYPAY": {
        "display": "应付职工薪酬",
        "type": DataTypes.DOUBLE,
        "field": "SALARYPAY"
    },
    "TAXPAY": {
        "display": "支付的各项税费",
        "type": DataTypes.DOUBLE,
        "field": "TAXPAY"
    },
    "INTERESTPAY": {
        "display": "应付利息",
        "type": DataTypes.DOUBLE,
        "field": "INTERESTPAY"
    },
    "DIVIDENDPAY": {
        "display": "应付股利",
        "type": DataTypes.DOUBLE,
        "field": "DIVIDENDPAY"
    },
    "SHORTFINANCING": {
        "display": "应付短期融资款",
        "type": DataTypes.DOUBLE,
        "field": "SHORTFINANCING"
    },
    "AGENCYLIAB": {
        "display": "代理业务负债",
        "type": DataTypes.DOUBLE,
        "field": "AGENCYLIAB"
    },
    "ANTICIPATELIAB": {
        "display": "预计负债",
        "type": DataTypes.DOUBLE,
        "field": "ANTICIPATELIAB"
    },
    "LTBORROW": {
        "display": "长期借款",
        "type": DataTypes.DOUBLE,
        "field": "LTBORROW"
    },
    "BONDPAY": {
        "display": "应付债券",
        "type": DataTypes.DOUBLE,
        "field": "BONDPAY"
    },
    "DEFERINCOMETAXLIAB": {
        "display": "递延所得税负债",
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOMETAXLIAB"
    },
    "OTHERLIAB": {
        "display": "其他负债",
        "type": DataTypes.DOUBLE,
        "field": "OTHERLIAB"
    },
    "SUMLIAB": {
        "display": "负债合计",
        "type": DataTypes.DOUBLE,
        "field": "SUMLIAB"
    },
    "SHARECAPITAL": {
        "display": "股本",
        "type": DataTypes.DOUBLE,
        "field": "SHARECAPITAL"
    },
    "CAPITALRESERVE": {
        "display": "资本公积",
        "type": DataTypes.DOUBLE,
        "field": "CAPITALRESERVE"
    },
    "INVENTORYSHARE": {
        "display": "库存股",
        "type": DataTypes.DOUBLE,
        "field": "INVENTORYSHARE"
    },
    "OTHEREQUITY": {
        "display": "其他权益工具",
        "type": DataTypes.DOUBLE,
        "field": "OTHEREQUITY"
    },
    "PREFERREDSTOCK": {
        "display": "其中:优先股",
        "type": DataTypes.DOUBLE,
        "field": "PREFERREDSTOCK"
    },
    "SUSTAINABLEDEBT": {
        "display": "永续债",
        "type": DataTypes.DOUBLE,
        "field": "SUSTAINABLEDEBT"
    },
    "OTHEREQUITYOTHER": {
        "display": "其他权益工具",
        "type": DataTypes.DOUBLE,
        "field": "OTHEREQUITYOTHER"
    },
    "SURPLUSRESERVE": {
        "display": "盈余公积",
        "type": DataTypes.DOUBLE,
        "field": "SURPLUSRESERVE"
    },
    "GENERALRISKPREPARE": {
        "display": "一般风险准备",
        "type": DataTypes.DOUBLE,
        "field": "GENERALRISKPREPARE"
    },
    "TRADERISKPREPARE": {
        "display": "交易风险准备",
        "type": DataTypes.DOUBLE,
        "field": "TRADERISKPREPARE"
    },
    "RETAINEDEARNING": {
        "display": "未分配利润",
        "type": DataTypes.DOUBLE,
        "field": "RETAINEDEARNING"
    },
    "DIFFCONVERSIONFC": {
        "display": "外币报表折算差额",
        "type": DataTypes.DOUBLE,
        "field": "DIFFCONVERSIONFC"
    },
    "SUMPARENTEQUITY": {
        "display": "归属于母公司股东权益总计",
        "type": DataTypes.DOUBLE,
        "field": "SUMPARENTEQUITY"
    },
    "MINORITYEQUITY": {
        "display": "少数股东权益",
        "type": DataTypes.DOUBLE,
        "field": "MINORITYEQUITY"
    },
    "SUMSHEQUITY": {
        "display": "股东权益合计",
        "type": DataTypes.DOUBLE,
        "field": "SUMSHEQUITY"
    },
    "SUMLIABSHEQUITY": {
        "display": "负债和股东权益总计",
        "type": DataTypes.DOUBLE,
        "field": "SUMLIABSHEQUITY"
    },
    "TRADE_FINASSET_NOTFVTPL": {
        "type": DataTypes.DOUBLE,
        "field": "TRADE_FINASSET_NOTFVTPL"
    },
    "TRADE_FINLIAB_NOTFVTPL": {
        "type": DataTypes.DOUBLE,
        "field": "TRADE_FINLIAB_NOTFVTPL"
    },
    "CREDITOR_INVEST": {
        "type": DataTypes.DOUBLE,
        "field": "CREDITOR_INVEST"
    },
    "OTHER_CREDITOR_INVEST": {
        "type": DataTypes.DOUBLE,
        "field": "OTHER_CREDITOR_INVEST"
    },
    "OTHER_EQUITY_INVEST": {
        "type": DataTypes.DOUBLE,
        "field": "OTHER_EQUITY_INVEST"
    },
    "MONETARYFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MONETARYFUND_YOY"
    },
    "CLIENTFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLIENTFUND_YOY"
    },
    "CLIENTCREDITFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLIENTCREDITFUND_YOY"
    },
    "SETTLEMENTPROVISION_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SETTLEMENTPROVISION_YOY"
    },
    "CLIENTPROVISION_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLIENTPROVISION_YOY"
    },
    "CREDITPROVISION_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CREDITPROVISION_YOY"
    },
    "LENDFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LENDFUND_YOY"
    },
    "MARGINOUTFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MARGINOUTFUND_YOY"
    },
    "MARGINOUTSECURITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MARGINOUTSECURITY_YOY"
    },
    "FVALUEFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUEFASSET_YOY"
    },
    "TRADEFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TRADEFASSET_YOY"
    },
    "DEFINEFVALUEFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEFINEFVALUEFASSET_YOY"
    },
    "DERIVEFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DERIVEFASSET_YOY"
    },
    "BUYSELLBACKFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BUYSELLBACKFASSET_YOY"
    },
    "INTERESTREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTERESTREC_YOY"
    },
    "DIVIDENDREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DIVIDENDREC_YOY"
    },
    "RECEIVABLES_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RECEIVABLES_YOY"
    },
    "GDEPOSITPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "GDEPOSITPAY_YOY"
    },
    "SALEABLEFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SALEABLEFASSET_YOY"
    },
    "HELDMATURITYINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "HELDMATURITYINV_YOY"
    },
    "AGENCYASSETS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AGENCYASSETS_YOY"
    },
    "LTEQUITYINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTEQUITYINV_YOY"
    },
    "ESTATEINVEST_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ESTATEINVEST_YOY"
    },
    "FIXEDASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FIXEDASSET_YOY"
    },
    "CONSTRUCTIONPROGRESS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CONSTRUCTIONPROGRESS_YOY"
    },
    "INTANGIBLEASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTANGIBLEASSET_YOY"
    },
    "SEATFEE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SEATFEE_YOY"
    },
    "GOODWILL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "GOODWILL_YOY"
    },
    "DEFERINCOMETAXASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOMETAXASSET_YOY"
    },
    "OTHERASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERASSET_YOY"
    },
    "SUMASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMASSET_YOY"
    },
    "STBORROW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "STBORROW_YOY"
    },
    "PLEDGEBORROW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PLEDGEBORROW_YOY"
    },
    "BORROWFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BORROWFUND_YOY"
    },
    "FVALUEFLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUEFLIAB_YOY"
    },
    "TRADEFLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TRADEFLIAB_YOY"
    },
    "DEFINEFVALUEFLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEFINEFVALUEFLIAB_YOY"
    },
    "DERIVEFLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DERIVEFLIAB_YOY"
    },
    "SELLBUYBACKFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SELLBUYBACKFASSET_YOY"
    },
    "AGENTTRADESECURITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AGENTTRADESECURITY_YOY"
    },
    "CAGENTTRADESECURITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CAGENTTRADESECURITY_YOY"
    },
    "AGENTUWSECURITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AGENTUWSECURITY_YOY"
    },
    "ACCOUNTPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTPAY_YOY"
    },
    "SALARYPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SALARYPAY_YOY"
    },
    "TAXPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TAXPAY_YOY"
    },
    "INTERESTPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTERESTPAY_YOY"
    },
    "DIVIDENDPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DIVIDENDPAY_YOY"
    },
    "SHORTFINANCING_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SHORTFINANCING_YOY"
    },
    "AGENCYLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AGENCYLIAB_YOY"
    },
    "ANTICIPATELIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ANTICIPATELIAB_YOY"
    },
    "LTBORROW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTBORROW_YOY"
    },
    "BONDPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BONDPAY_YOY"
    },
    "DEFERINCOMETAXLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOMETAXLIAB_YOY"
    },
    "OTHERLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERLIAB_YOY"
    },
    "SUMLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMLIAB_YOY"
    },
    "SHARECAPITAL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SHARECAPITAL_YOY"
    },
    "CAPITALRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CAPITALRESERVE_YOY"
    },
    "INVENTORYSHARE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVENTORYSHARE_YOY"
    },
    "OTHEREQUITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEREQUITY_YOY"
    },
    "PREFERREDSTOCK_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PREFERREDSTOCK_YOY"
    },
    "SUSTAINABLEDEBT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUSTAINABLEDEBT_YOY"
    },
    "OTHEREQUITYOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEREQUITYOTHER_YOY"
    },
    "SURPLUSRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SURPLUSRESERVE_YOY"
    },
    "GENERALRISKPREPARE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "GENERALRISKPREPARE_YOY"
    },
    "TRADERISKPREPARE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TRADERISKPREPARE_YOY"
    },
    "RETAINEDEARNING_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RETAINEDEARNING_YOY"
    },
    "DIFFCONVERSIONFC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DIFFCONVERSIONFC_YOY"
    },
    "SUMPARENTEQUITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMPARENTEQUITY_YOY"
    },
    "MINORITYEQUITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MINORITYEQUITY_YOY"
    },
    "SUMSHEQUITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMSHEQUITY_YOY"
    },
    "SUMLIABSHEQUITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMLIABSHEQUITY_YOY"
    },
    "TRADE_FINASSET_NOTFVTPL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TRADE_FINASSET_NOTFVTPL_YOY"
    },
    "TRADE_FINLIAB_NOTFVTPL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TRADE_FINLIAB_NOTFVTPL_YOY"
    },
    "CREDITOR_INVEST_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CREDITOR_INVEST_YOY"
    },
    "OTHER_CREDITOR_INVEST_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHER_CREDITOR_INVEST_YOY"
    },
    "OTHER_EQUITY_INVEST_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHER_EQUITY_INVEST_YOY"
    },
    "PREMIUMREC": {
        "display": "收到原保险合同保费取得的现金",
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMREC"
    },
    "RIREC": {
        "display": "应收分保账款",
        "type": DataTypes.DOUBLE,
        "field": "RIREC"
    },
    "RICONTACTRESERVEREC": {
        "display": "应收分保合同准备金",
        "type": DataTypes.DOUBLE,
        "field": "RICONTACTRESERVEREC"
    },
    "UNDUERIRESERVEREC": {
        "display": "其中:应收分保未到期责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "UNDUERIRESERVEREC"
    },
    "CLAIMRIRESERVEREC": {
        "display": "指定以公允价值计量且其变动计入当期损益的金融资产",
        "type": DataTypes.DOUBLE,
        "field": "CLAIMRIRESERVEREC"
    },
    "LIFERIRESERVEREC": {
        "display": "应收分保寿险责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "LIFERIRESERVEREC"
    },
    "LTHEALTHRIRESERVEREC": {
        "display": "应收分保长期健康险责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "LTHEALTHRIRESERVEREC"
    },
    "INSUREDPLEDGELOAN": {
        "display": "保户质押贷款",
        "type": DataTypes.DOUBLE,
        "field": "INSUREDPLEDGELOAN"
    },
    "LOANADVANCES": {
        "display": "发放贷款及垫款",
        "type": DataTypes.DOUBLE,
        "field": "LOANADVANCES"
    },
    "CREDITORPLANINV": {
        "display": "债权计划投资",
        "type": DataTypes.DOUBLE,
        "field": "CREDITORPLANINV"
    },
    "OTHERREC": {
        "display": "其他应收款",
        "type": DataTypes.DOUBLE,
        "field": "OTHERREC"
    },
    "TDEPOSIT": {
        "display": "定期存款",
        "type": DataTypes.DOUBLE,
        "field": "TDEPOSIT"
    },
    "INVESTREC": {
        "display": "应收款项类投资",
        "type": DataTypes.DOUBLE,
        "field": "INVESTREC"
    },
    "ACCOUNTREC": {
        "display": "应收账款",
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTREC"
    },
    "CAPITALGDEPOSITPAY": {
        "display": "存出资本保证金",
        "type": DataTypes.DOUBLE,
        "field": "CAPITALGDEPOSITPAY"
    },
    "INDEPENDENTASSET": {
        "display": "独立账户资产",
        "type": DataTypes.DOUBLE,
        "field": "INDEPENDENTASSET"
    },
    "FIDEPOSIT": {
        "display": "同业及其他金融机构存放款项",
        "type": DataTypes.DOUBLE,
        "field": "FIDEPOSIT"
    },
    "GDEPOSITREC": {
        "display": "存入保证金",
        "type": DataTypes.DOUBLE,
        "field": "GDEPOSITREC"
    },
    "ACCEPTDEPOSIT": {
        "display": "吸收存款",
        "type": DataTypes.DOUBLE,
        "field": "ACCEPTDEPOSIT"
    },
    "BILLPAY": {
        "display": "应付票据",
        "type": DataTypes.DOUBLE,
        "field": "BILLPAY"
    },
    "ADVANCEREC": {
        "display": "预收账款",
        "type": DataTypes.DOUBLE,
        "field": "ADVANCEREC"
    },
    "PREMIUMADVANCE": {
        "display": "预收保费",
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMADVANCE"
    },
    "COMMPAY": {
        "display": "应付手续费及佣金",
        "type": DataTypes.DOUBLE,
        "field": "COMMPAY"
    },
    "RIPAY": {
        "display": "应付分保账款",
        "type": DataTypes.DOUBLE,
        "field": "RIPAY"
    },
    "CLAIMPAY": {
        "display": "应付赔付款",
        "type": DataTypes.DOUBLE,
        "field": "CLAIMPAY"
    },
    "POLICYDIVIPAY": {
        "display": "应付保单红利",
        "type": DataTypes.DOUBLE,
        "field": "POLICYDIVIPAY"
    },
    "OTHERPAY": {
        "display": "其他应付款",
        "type": DataTypes.DOUBLE,
        "field": "OTHERPAY"
    },
    "INSUREDDEPOSITINV": {
        "display": "保户储金及投资款",
        "type": DataTypes.DOUBLE,
        "field": "INSUREDDEPOSITINV"
    },
    "CONTACTRESERVE": {
        "display": "保险合同准备金",
        "type": DataTypes.DOUBLE,
        "field": "CONTACTRESERVE"
    },
    "UNDUERESERVE": {
        "display": "提取未到期责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "UNDUERESERVE"
    },
    "CLAIMRESERVE": {
        "display": "未决赔款准备金",
        "type": DataTypes.DOUBLE,
        "field": "CLAIMRESERVE"
    },
    "LIFERESERVE": {
        "display": "寿险责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "LIFERESERVE"
    },
    "LTHEALTHRESERVE": {
        "display": "长期健康险责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "LTHEALTHRESERVE"
    },
    "PREFERSTOCBOND": {
        "display": "其中:优先股",
        "type": DataTypes.DOUBLE,
        "field": "PREFERSTOCBOND"
    },
    "SUSTAINBOND": {
        "display": "永续债",
        "type": DataTypes.DOUBLE,
        "field": "SUSTAINBOND"
    },
    "JUNIORBONDPAY": {
        "display": "应付次级债",
        "type": DataTypes.DOUBLE,
        "field": "JUNIORBONDPAY"
    },
    "INDEPENDENTLIAB": {
        "display": "独立账户负债",
        "type": DataTypes.DOUBLE,
        "field": "INDEPENDENTLIAB"
    },
    "PREMIUMREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMREC_YOY"
    },
    "RIREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RIREC_YOY"
    },
    "RICONTACTRESERVEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RICONTACTRESERVEREC_YOY"
    },
    "UNDUERIRESERVEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "UNDUERIRESERVEREC_YOY"
    },
    "CLAIMRIRESERVEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLAIMRIRESERVEREC_YOY"
    },
    "LIFERIRESERVEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIFERIRESERVEREC_YOY"
    },
    "LTHEALTHRIRESERVEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTHEALTHRIRESERVEREC_YOY"
    },
    "INSUREDPLEDGELOAN_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INSUREDPLEDGELOAN_YOY"
    },
    "LOANADVANCES_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LOANADVANCES_YOY"
    },
    "CREDITORPLANINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CREDITORPLANINV_YOY"
    },
    "OTHERREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERREC_YOY"
    },
    "TDEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TDEPOSIT_YOY"
    },
    "INVESTREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVESTREC_YOY"
    },
    "ACCOUNTREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTREC_YOY"
    },
    "CAPITALGDEPOSITPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CAPITALGDEPOSITPAY_YOY"
    },
    "INDEPENDENTASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INDEPENDENTASSET_YOY"
    },
    "FIDEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FIDEPOSIT_YOY"
    },
    "GDEPOSITREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "GDEPOSITREC_YOY"
    },
    "ACCEPTDEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ACCEPTDEPOSIT_YOY"
    },
    "BILLPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BILLPAY_YOY"
    },
    "ADVANCEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ADVANCEREC_YOY"
    },
    "PREMIUMADVANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMADVANCE_YOY"
    },
    "COMMPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMMPAY_YOY"
    },
    "RIPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RIPAY_YOY"
    },
    "CLAIMPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLAIMPAY_YOY"
    },
    "POLICYDIVIPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "POLICYDIVIPAY_YOY"
    },
    "OTHERPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERPAY_YOY"
    },
    "INSUREDDEPOSITINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INSUREDDEPOSITINV_YOY"
    },
    "CONTACTRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CONTACTRESERVE_YOY"
    },
    "UNDUERESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "UNDUERESERVE_YOY"
    },
    "CLAIMRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLAIMRESERVE_YOY"
    },
    "LIFERESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIFERESERVE_YOY"
    },
    "LTHEALTHRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTHEALTHRESERVE_YOY"
    },
    "PREFERSTOCBOND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PREFERSTOCBOND_YOY"
    },
    "SUSTAINBOND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUSTAINBOND_YOY"
    },
    "JUNIORBONDPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "JUNIORBONDPAY_YOY"
    },
    "INDEPENDENTLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INDEPENDENTLIAB_YOY"
    },
    "CASHANDDEPOSITCBANK": {
        "display": "现金及存放中央银行款项",
        "type": DataTypes.DOUBLE,
        "field": "CASHANDDEPOSITCBANK"
    },
    "DEPOSITINFI": {
        "display": "存放同业款项",
        "type": DataTypes.DOUBLE,
        "field": "DEPOSITINFI"
    },
    "PRECIOUSMETAL": {
        "display": "贵金属",
        "type": DataTypes.DOUBLE,
        "field": "PRECIOUSMETAL"
    },
    "INVSUBSIDIARY": {
        "display": "对子公司的投资",
        "type": DataTypes.DOUBLE,
        "field": "INVSUBSIDIARY"
    },
    "INVJOINT": {
        "display": "对联营和合营企业的投资",
        "type": DataTypes.DOUBLE,
        "field": "INVJOINT"
    },
    "MASSET": {
        "display": "待处理抵债资产",
        "type": DataTypes.DOUBLE,
        "field": "MASSET"
    },
    "MASSETDEVALUE": {
        "display": "减:抵债资产减值准备",
        "type": DataTypes.DOUBLE,
        "field": "MASSETDEVALUE"
    },
    "NETMASSET": {
        "display": "待处理抵债资产净额",
        "type": DataTypes.DOUBLE,
        "field": "NETMASSET"
    },
    "BORROWFROMCBANK": {
        "display": "向中央银行借款",
        "type": DataTypes.DOUBLE,
        "field": "BORROWFROMCBANK"
    },
    "OUTWARDREMITTANCE": {
        "display": "汇出汇款",
        "type": DataTypes.DOUBLE,
        "field": "OUTWARDREMITTANCE"
    },
    "CDANDBILLREC": {
        "display": "存款证及应付票据",
        "type": DataTypes.DOUBLE,
        "field": "CDANDBILLREC"
    },
    "CD": {
        "display": "其中:存款证",
        "type": DataTypes.DOUBLE,
        "field": "CD"
    },
    "SHEQUITY": {
        "display": "股本",
        "type": DataTypes.DOUBLE,
        "field": "SHEQUITY"
    },
    "INVREVALUERESERVE": {
        "display": "投资重估储备",
        "type": DataTypes.DOUBLE,
        "field": "INVREVALUERESERVE"
    },
    "HEDGERESERVE": {
        "display": "套期储备",
        "type": DataTypes.DOUBLE,
        "field": "HEDGERESERVE"
    },
    "SUGGESTASSIGNDIVI": {
        "display": "建议分派股利",
        "type": DataTypes.DOUBLE,
        "field": "SUGGESTASSIGNDIVI"
    },
    "CASHANDDEPOSITCBANK_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CASHANDDEPOSITCBANK_YOY"
    },
    "DEPOSITINFI_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEPOSITINFI_YOY"
    },
    "PRECIOUSMETAL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PRECIOUSMETAL_YOY"
    },
    "INVSUBSIDIARY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVSUBSIDIARY_YOY"
    },
    "INVJOINT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVJOINT_YOY"
    },
    "MASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MASSET_YOY"
    },
    "MASSETDEVALUE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MASSETDEVALUE_YOY"
    },
    "NETMASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETMASSET_YOY"
    },
    "BORROWFROMCBANK_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BORROWFROMCBANK_YOY"
    },
    "OUTWARDREMITTANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OUTWARDREMITTANCE_YOY"
    },
    "CDANDBILLREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CDANDBILLREC_YOY"
    },
    "CD_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CD_YOY"
    },
    "SHEQUITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SHEQUITY_YOY"
    },
    "INVREVALUERESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVREVALUERESERVE_YOY"
    },
    "HEDGERESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "HEDGERESERVE_YOY"
    },
    "SUGGESTASSIGNDIVI_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUGGESTASSIGNDIVI_YOY"
    },
    "BILLREC": {
        "display": "其中:应收票据",
        "type": DataTypes.DOUBLE,
        "field": "BILLREC"
    },
    "ADVANCEPAY": {
        "display": "预付款项",
        "type": DataTypes.DOUBLE,
        "field": "ADVANCEPAY"
    },
    "EXPORTREBATEREC": {
        "display": "应收出口退税",
        "type": DataTypes.DOUBLE,
        "field": "EXPORTREBATEREC"
    },
    "SUBSIDYREC": {
        "display": "应收补贴款",
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDYREC"
    },
    "INTERNALREC": {
        "display": "内部应收款",
        "type": DataTypes.DOUBLE,
        "field": "INTERNALREC"
    },
    "INVENTORY": {
        "display": "存货",
        "type": DataTypes.DOUBLE,
        "field": "INVENTORY"
    },
    "CLHELDSALEASS": {
        "display": "划分为持有待售的资产",
        "type": DataTypes.DOUBLE,
        "field": "CLHELDSALEASS"
    },
    "NONLASSETONEYEAR": {
        "display": "一年内到期的非流动资产",
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETONEYEAR"
    },
    "OTHERLASSET": {
        "display": "其他流动资产",
        "type": DataTypes.DOUBLE,
        "field": "OTHERLASSET"
    },
    "SUMLASSET": {
        "display": "流动资产合计",
        "type": DataTypes.DOUBLE,
        "field": "SUMLASSET"
    },
    "LTREC": {
        "display": "长期应收款",
        "type": DataTypes.DOUBLE,
        "field": "LTREC"
    },
    "CONSTRUCTIONMATERIAL": {
        "display": "工程物资",
        "type": DataTypes.DOUBLE,
        "field": "CONSTRUCTIONMATERIAL"
    },
    "LIQUIDATEFIXEDASSET": {
        "display": "固定资产清理",
        "type": DataTypes.DOUBLE,
        "field": "LIQUIDATEFIXEDASSET"
    },
    "PRODUCTBIOLOGYASSET": {
        "display": "生产性生物资产",
        "type": DataTypes.DOUBLE,
        "field": "PRODUCTBIOLOGYASSET"
    },
    "OILGASASSET": {
        "display": "油气资产",
        "type": DataTypes.DOUBLE,
        "field": "OILGASASSET"
    },
    "DEVELOPEXP": {
        "display": "开发支出",
        "type": DataTypes.DOUBLE,
        "field": "DEVELOPEXP"
    },
    "LTDEFERASSET": {
        "display": "长期待摊费用",
        "type": DataTypes.DOUBLE,
        "field": "LTDEFERASSET"
    },
    "OTHERNONLASSET": {
        "display": "其他非流动资产",
        "type": DataTypes.DOUBLE,
        "field": "OTHERNONLASSET"
    },
    "SUMNONLASSET": {
        "display": "非流动资产合计",
        "type": DataTypes.DOUBLE,
        "field": "SUMNONLASSET"
    },
    "DEPOSIT": {
        "display": "吸收存款及同业存放",
        "type": DataTypes.DOUBLE,
        "field": "DEPOSIT"
    },
    "ADVANCERECEIVE": {
        "display": "预收款项",
        "type": DataTypes.DOUBLE,
        "field": "ADVANCERECEIVE"
    },
    "INTERNALPAY": {
        "display": "内部应付款",
        "type": DataTypes.DOUBLE,
        "field": "INTERNALPAY"
    },
    "ANTICIPATELLIAB": {
        "display": "预计流动负债",
        "type": DataTypes.DOUBLE,
        "field": "ANTICIPATELLIAB"
    },
    "DEFERINCOMEONEYEAR": {
        "display": "一年内的递延收益",
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOMEONEYEAR"
    },
    "STBONDREC": {
        "display": "应付短期债券",
        "type": DataTypes.DOUBLE,
        "field": "STBONDREC"
    },
    "CLHELDSALELIAB": {
        "display": "划分为持有待售的负债",
        "type": DataTypes.DOUBLE,
        "field": "CLHELDSALELIAB"
    },
    "NONLLIABONEYEAR": {
        "display": "一年内到期的非流动负债",
        "type": DataTypes.DOUBLE,
        "field": "NONLLIABONEYEAR"
    },
    "OTHERLLIAB": {
        "display": "其他流动负债",
        "type": DataTypes.DOUBLE,
        "field": "OTHERLLIAB"
    },
    "SUMLLIAB": {
        "display": "流动负债合计",
        "type": DataTypes.DOUBLE,
        "field": "SUMLLIAB"
    },
    "LTACCOUNTPAY": {
        "display": "长期应付款",
        "type": DataTypes.DOUBLE,
        "field": "LTACCOUNTPAY"
    },
    "LTSALARYPAY": {
        "display": "长期应付职工薪酬",
        "type": DataTypes.DOUBLE,
        "field": "LTSALARYPAY"
    },
    "SPECIALPAY": {
        "display": "专项应付款",
        "type": DataTypes.DOUBLE,
        "field": "SPECIALPAY"
    },
    "DEFERINCOME": {
        "display": "递延收益",
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOME"
    },
    "OTHERNONLLIAB": {
        "display": "其他非流动负债",
        "type": DataTypes.DOUBLE,
        "field": "OTHERNONLLIAB"
    },
    "SUMNONLLIAB": {
        "display": "非流动负债合计",
        "type": DataTypes.DOUBLE,
        "field": "SUMNONLLIAB"
    },
    "SPECIALRESERVE": {
        "display": "专项储备",
        "type": DataTypes.DOUBLE,
        "field": "SPECIALRESERVE"
    },
    "UNCONFIRMINVLOSS": {
        "display": "未确定的投资损失",
        "type": DataTypes.DOUBLE,
        "field": "UNCONFIRMINVLOSS"
    },
    "PLANCASHDIVI": {
        "display": "拟分配现金股利",
        "type": DataTypes.DOUBLE,
        "field": "PLANCASHDIVI"
    },
    "ACCOUNTBILLREC": {
        "display": "应收票据及应收账款",
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTBILLREC"
    },
    "AMORCOSTFASSET": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFASSET"
    },
    "FVALUECOMPFASSET": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUECOMPFASSET"
    },
    "CONTRACTASSET": {
        "type": DataTypes.DOUBLE,
        "field": "CONTRACTASSET"
    },
    "HELDSALEASS": {
        "type": DataTypes.DOUBLE,
        "field": "HELDSALEASS"
    },
    "LASSETOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "LASSETOTHER"
    },
    "LASSETBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "LASSETBALANCE"
    },
    "CREDINV": {
        "type": DataTypes.DOUBLE,
        "field": "CREDINV"
    },
    "AMORCOSTFASSETFLD": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFASSETFLD"
    },
    "OTHCREDINV": {
        "type": DataTypes.DOUBLE,
        "field": "OTHCREDINV"
    },
    "FVALUECOMPFASSETFLD": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUECOMPFASSETFLD"
    },
    "OTHEREQUITYINV": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEREQUITYINV"
    },
    "OTHERNONFASSET": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERNONFASSET"
    },
    "NONLASSETOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETOTHER"
    },
    "NONLASSETBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETBALANCE"
    },
    "ASSETOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "ASSETOTHER"
    },
    "ASSETBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "ASSETBALANCE"
    },
    "ACCOUNTBILLPAY": {
        "display": "应付票据及应付账款",
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTBILLPAY"
    },
    "CONTRACTLIAB": {
        "type": DataTypes.DOUBLE,
        "field": "CONTRACTLIAB"
    },
    "AMORCOSTFLIAB": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFLIAB"
    },
    "HELDSALELIAB": {
        "type": DataTypes.DOUBLE,
        "field": "HELDSALELIAB"
    },
    "LLIABOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "LLIABOTHER"
    },
    "LLIABBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "LLIABBALANCE"
    },
    "AMORCOSTFLIABFLD": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFLIABFLD"
    },
    "NONLLIABOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "NONLLIABOTHER"
    },
    "NONLLIABBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "NONLLIABBALANCE"
    },
    "LIABOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "LIABOTHER"
    },
    "LIABBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "LIABBALANCE"
    },
    "OTHERCINCOME": {
        "display": "其他综合收益",
        "type": DataTypes.DOUBLE,
        "field": "OTHERCINCOME"
    },
    "PARENTEQUITYOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTEQUITYOTHER"
    },
    "PARENTEQUITYBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTEQUITYBALANCE"
    },
    "SHEQUITYOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "SHEQUITYOTHER"
    },
    "SHEQUITYBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "SHEQUITYBALANCE"
    },
    "LIABSHEQUITYOTHER": {
        "type": DataTypes.DOUBLE,
        "field": "LIABSHEQUITYOTHER"
    },
    "LIABSHEQUITYBALANCE": {
        "type": DataTypes.DOUBLE,
        "field": "LIABSHEQUITYBALANCE"
    },
    "TOTAL_OTHER_RECE": {
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_OTHER_RECE"
    },
    "TOTAL_OTHER_PAYABLE": {
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_OTHER_PAYABLE"
    },
    "BILLREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BILLREC_YOY"
    },
    "ADVANCEPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ADVANCEPAY_YOY"
    },
    "EXPORTREBATEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "EXPORTREBATEREC_YOY"
    },
    "SUBSIDYREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDYREC_YOY"
    },
    "INTERNALREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTERNALREC_YOY"
    },
    "INVENTORY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVENTORY_YOY"
    },
    "CLHELDSALEASS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLHELDSALEASS_YOY"
    },
    "NONLASSETONEYEAR_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETONEYEAR_YOY"
    },
    "OTHERLASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERLASSET_YOY"
    },
    "SUMLASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMLASSET_YOY"
    },
    "LTREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTREC_YOY"
    },
    "CONSTRUCTIONMATERIAL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CONSTRUCTIONMATERIAL_YOY"
    },
    "LIQUIDATEFIXEDASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIQUIDATEFIXEDASSET_YOY"
    },
    "PRODUCTBIOLOGYASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PRODUCTBIOLOGYASSET_YOY"
    },
    "OILGASASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OILGASASSET_YOY"
    },
    "DEVELOPEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEVELOPEXP_YOY"
    },
    "LTDEFERASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTDEFERASSET_YOY"
    },
    "OTHERNONLASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERNONLASSET_YOY"
    },
    "SUMNONLASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMNONLASSET_YOY"
    },
    "DEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEPOSIT_YOY"
    },
    "ADVANCERECEIVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ADVANCERECEIVE_YOY"
    },
    "INTERNALPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTERNALPAY_YOY"
    },
    "ANTICIPATELLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ANTICIPATELLIAB_YOY"
    },
    "DEFERINCOMEONEYEAR_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOMEONEYEAR_YOY"
    },
    "STBONDREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "STBONDREC_YOY"
    },
    "CLHELDSALELIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLHELDSALELIAB_YOY"
    },
    "NONLLIABONEYEAR_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLLIABONEYEAR_YOY"
    },
    "OTHERLLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERLLIAB_YOY"
    },
    "SUMLLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMLLIAB_YOY"
    },
    "LTACCOUNTPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTACCOUNTPAY_YOY"
    },
    "LTSALARYPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LTSALARYPAY_YOY"
    },
    "SPECIALPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SPECIALPAY_YOY"
    },
    "DEFERINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DEFERINCOME_YOY"
    },
    "OTHERNONLLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERNONLLIAB_YOY"
    },
    "SUMNONLLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMNONLLIAB_YOY"
    },
    "SPECIALRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SPECIALRESERVE_YOY"
    },
    "UNCONFIRMINVLOSS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "UNCONFIRMINVLOSS_YOY"
    },
    "PLANCASHDIVI_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PLANCASHDIVI_YOY"
    },
    "ACCOUNTBILLREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTBILLREC_YOY"
    },
    "AMORCOSTFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFASSET_YOY"
    },
    "FVALUECOMPFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUECOMPFASSET_YOY"
    },
    "CONTRACTASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CONTRACTASSET_YOY"
    },
    "HELDSALEASS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "HELDSALEASS_YOY"
    },
    "LASSETOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LASSETOTHER_YOY"
    },
    "LASSETBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LASSETBALANCE_YOY"
    },
    "CREDINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CREDINV_YOY"
    },
    "AMORCOSTFASSETFLD_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFASSETFLD_YOY"
    },
    "OTHCREDINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHCREDINV_YOY"
    },
    "FVALUECOMPFASSETFLD_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUECOMPFASSETFLD_YOY"
    },
    "OTHEREQUITYINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEREQUITYINV_YOY"
    },
    "OTHERNONFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERNONFASSET_YOY"
    },
    "NONLASSETOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETOTHER_YOY"
    },
    "NONLASSETBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETBALANCE_YOY"
    },
    "ASSETOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ASSETOTHER_YOY"
    },
    "ASSETBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ASSETBALANCE_YOY"
    },
    "ACCOUNTBILLPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ACCOUNTBILLPAY_YOY"
    },
    "CONTRACTLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CONTRACTLIAB_YOY"
    },
    "AMORCOSTFLIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFLIAB_YOY"
    },
    "HELDSALELIAB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "HELDSALELIAB_YOY"
    },
    "LLIABOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LLIABOTHER_YOY"
    },
    "LLIABBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LLIABBALANCE_YOY"
    },
    "AMORCOSTFLIABFLD_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORCOSTFLIABFLD_YOY"
    },
    "NONLLIABOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLLIABOTHER_YOY"
    },
    "NONLLIABBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLLIABBALANCE_YOY"
    },
    "LIABOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIABOTHER_YOY"
    },
    "LIABBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIABBALANCE_YOY"
    },
    "OTHERCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERCINCOME_YOY"
    },
    "PARENTEQUITYOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTEQUITYOTHER_YOY"
    },
    "PARENTEQUITYBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTEQUITYBALANCE_YOY"
    },
    "SHEQUITYOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SHEQUITYOTHER_YOY"
    },
    "SHEQUITYBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SHEQUITYBALANCE_YOY"
    },
    "LIABSHEQUITYOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIABSHEQUITYOTHER_YOY"
    },
    "LIABSHEQUITYBALANCE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LIABSHEQUITYBALANCE_YOY"
    },
    "TOTAL_OTHER_RECE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_OTHER_RECE_YOY"
    },
    "TOTAL_OTHER_PAYABLE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TOTAL_OTHER_PAYABLE_YOY"
    },
    "AUDITOPINIONSDOMESTIC": {
        "type": DataTypes.DOUBLE,
        "field": "AUDITOPINIONSDOMESTIC"
    },
    "AUDITOPINIONSDOMESTICJW": {
        "type": DataTypes.DOUBLE,
        "field": "AUDITOPINIONSDOMESTICJW"
    },
    "reportDate": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    }
}
    ,
      {
        sequelize: db,
        modelName: "zcfzb",
      }
    );
    module.exports = Zcfzb;
    
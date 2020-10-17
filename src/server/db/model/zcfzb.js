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
        "type": DataTypes.STRING(30),
        "field": "SECURITYCODE",
        "unique": "compositeIndex"
    },
    "REPORTTYPE": {
        "type": DataTypes.STRING(30),
        "field": "REPORTTYPE"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.STRING(30),
        "field": "REPORTDATETYPE"
    },
    "TYPE": {
        "type": DataTypes.STRING(30),
        "field": "TYPE"
    },
    "REPORTDATE": {
        "type": DataTypes.STRING(30),
        "field": "REPORTDATE",
        "unique": "compositeIndex"
    },
    "CURRENCY": {
        "type": DataTypes.STRING(30),
        "field": "CURRENCY"
    },
    "MONETARYFUND": {
        "display": "货币资金",
        "type": DataTypes.STRING(30),
        "field": "MONETARYFUND"
    },
    "CLIENTFUND": {
        "display": "其中:客户资金存款",
        "type": DataTypes.STRING(30),
        "field": "CLIENTFUND"
    },
    "CLIENTCREDITFUND": {
        "display": "客户信用资金存款",
        "type": DataTypes.STRING(30),
        "field": "CLIENTCREDITFUND"
    },
    "SETTLEMENTPROVISION": {
        "display": "结算备付金",
        "type": DataTypes.STRING(30),
        "field": "SETTLEMENTPROVISION"
    },
    "CLIENTPROVISION": {
        "display": "其中:客户备付金",
        "type": DataTypes.STRING(30),
        "field": "CLIENTPROVISION"
    },
    "CREDITPROVISION": {
        "display": "信用备付金",
        "type": DataTypes.STRING(30),
        "field": "CREDITPROVISION"
    },
    "LENDFUND": {
        "display": "拆出资金",
        "type": DataTypes.STRING(30),
        "field": "LENDFUND"
    },
    "MARGINOUTFUND": {
        "display": "融出资金",
        "type": DataTypes.STRING(30),
        "field": "MARGINOUTFUND"
    },
    "MARGINOUTSECURITY": {
        "display": "融出证券",
        "type": DataTypes.STRING(30),
        "field": "MARGINOUTSECURITY"
    },
    "FVALUEFASSET": {
        "display": "以公允价值计量且其变动计入当期损益的金融资产",
        "type": DataTypes.STRING(30),
        "field": "FVALUEFASSET"
    },
    "TRADEFASSET": {
        "display": "其中:交易性金融资产",
        "type": DataTypes.STRING(30),
        "field": "TRADEFASSET"
    },
    "DEFINEFVALUEFASSET": {
        "display": "指定以公允价值计量且其变动计入当期损益的金融资产",
        "type": DataTypes.STRING(30),
        "field": "DEFINEFVALUEFASSET"
    },
    "DERIVEFASSET": {
        "display": "衍生金融资产",
        "type": DataTypes.STRING(30),
        "field": "DERIVEFASSET"
    },
    "BUYSELLBACKFASSET": {
        "display": "买入返售金融资产",
        "type": DataTypes.STRING(30),
        "field": "BUYSELLBACKFASSET"
    },
    "INTERESTREC": {
        "display": "应收利息",
        "type": DataTypes.STRING(30),
        "field": "INTERESTREC"
    },
    "DIVIDENDREC": {
        "display": "应收股利",
        "type": DataTypes.STRING(30),
        "field": "DIVIDENDREC"
    },
    "RECEIVABLES": {
        "display": "应收款项",
        "type": DataTypes.STRING(30),
        "field": "RECEIVABLES"
    },
    "GDEPOSITPAY": {
        "display": "存出保证金",
        "type": DataTypes.STRING(30),
        "field": "GDEPOSITPAY"
    },
    "SALEABLEFASSET": {
        "display": "可供出售金融资产",
        "type": DataTypes.STRING(30),
        "field": "SALEABLEFASSET"
    },
    "HELDMATURITYINV": {
        "display": "持有至到期投资",
        "type": DataTypes.STRING(30),
        "field": "HELDMATURITYINV"
    },
    "AGENCYASSETS": {
        "display": "代理业务资产",
        "type": DataTypes.STRING(30),
        "field": "AGENCYASSETS"
    },
    "LTEQUITYINV": {
        "display": "长期股权投资",
        "type": DataTypes.STRING(30),
        "field": "LTEQUITYINV"
    },
    "ESTATEINVEST": {
        "display": "投资性房地产",
        "type": DataTypes.STRING(30),
        "field": "ESTATEINVEST"
    },
    "FIXEDASSET": {
        "display": "固定资产",
        "type": DataTypes.STRING(30),
        "field": "FIXEDASSET"
    },
    "CONSTRUCTIONPROGRESS": {
        "display": "在建工程",
        "type": DataTypes.STRING(30),
        "field": "CONSTRUCTIONPROGRESS"
    },
    "INTANGIBLEASSET": {
        "display": "无形资产",
        "type": DataTypes.STRING(30),
        "field": "INTANGIBLEASSET"
    },
    "SEATFEE": {
        "display": "其中:交易席位费",
        "type": DataTypes.STRING(30),
        "field": "SEATFEE"
    },
    "GOODWILL": {
        "display": "商誉",
        "type": DataTypes.STRING(30),
        "field": "GOODWILL"
    },
    "DEFERINCOMETAXASSET": {
        "display": "递延所得税资产",
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOMETAXASSET"
    },
    "OTHERASSET": {
        "display": "其他资产",
        "type": DataTypes.STRING(30),
        "field": "OTHERASSET"
    },
    "SUMASSET": {
        "display": "资产总计",
        "type": DataTypes.STRING(30),
        "field": "SUMASSET"
    },
    "STBORROW": {
        "display": "短期借款",
        "type": DataTypes.STRING(30),
        "field": "STBORROW"
    },
    "PLEDGEBORROW": {
        "display": "其中:质押借款",
        "type": DataTypes.STRING(30),
        "field": "PLEDGEBORROW"
    },
    "BORROWFUND": {
        "display": "拆入资金",
        "type": DataTypes.STRING(30),
        "field": "BORROWFUND"
    },
    "FVALUEFLIAB": {
        "display": "以公允价值计量且其变动计入当期损益的金融负债",
        "type": DataTypes.STRING(30),
        "field": "FVALUEFLIAB"
    },
    "TRADEFLIAB": {
        "display": "其中:交易性金融负债",
        "type": DataTypes.STRING(30),
        "field": "TRADEFLIAB"
    },
    "DEFINEFVALUEFLIAB": {
        "display": "指定以公允价值计量且其变动计入当期损益的金融负债",
        "type": DataTypes.STRING(30),
        "field": "DEFINEFVALUEFLIAB"
    },
    "DERIVEFLIAB": {
        "display": "衍生金融负债",
        "type": DataTypes.STRING(30),
        "field": "DERIVEFLIAB"
    },
    "SELLBUYBACKFASSET": {
        "display": "卖出回购金融资产款",
        "type": DataTypes.STRING(30),
        "field": "SELLBUYBACKFASSET"
    },
    "AGENTTRADESECURITY": {
        "display": "代理买卖证券款",
        "type": DataTypes.STRING(30),
        "field": "AGENTTRADESECURITY"
    },
    "CAGENTTRADESECURITY": {
        "display": "客户信用交易代理买卖证券款",
        "type": DataTypes.STRING(30),
        "field": "CAGENTTRADESECURITY"
    },
    "AGENTUWSECURITY": {
        "display": "代理承销证券款",
        "type": DataTypes.STRING(30),
        "field": "AGENTUWSECURITY"
    },
    "ACCOUNTPAY": {
        "display": "应付账款",
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTPAY"
    },
    "SALARYPAY": {
        "display": "应付职工薪酬",
        "type": DataTypes.STRING(30),
        "field": "SALARYPAY"
    },
    "TAXPAY": {
        "display": "支付的各项税费",
        "type": DataTypes.STRING(30),
        "field": "TAXPAY"
    },
    "INTERESTPAY": {
        "display": "应付利息",
        "type": DataTypes.STRING(30),
        "field": "INTERESTPAY"
    },
    "DIVIDENDPAY": {
        "display": "应付股利",
        "type": DataTypes.STRING(30),
        "field": "DIVIDENDPAY"
    },
    "SHORTFINANCING": {
        "display": "应付短期融资款",
        "type": DataTypes.STRING(30),
        "field": "SHORTFINANCING"
    },
    "AGENCYLIAB": {
        "display": "代理业务负债",
        "type": DataTypes.STRING(30),
        "field": "AGENCYLIAB"
    },
    "ANTICIPATELIAB": {
        "display": "预计负债",
        "type": DataTypes.STRING(30),
        "field": "ANTICIPATELIAB"
    },
    "LTBORROW": {
        "display": "长期借款",
        "type": DataTypes.STRING(30),
        "field": "LTBORROW"
    },
    "BONDPAY": {
        "display": "应付债券",
        "type": DataTypes.STRING(30),
        "field": "BONDPAY"
    },
    "DEFERINCOMETAXLIAB": {
        "display": "递延所得税负债",
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOMETAXLIAB"
    },
    "OTHERLIAB": {
        "display": "其他负债",
        "type": DataTypes.STRING(30),
        "field": "OTHERLIAB"
    },
    "SUMLIAB": {
        "display": "负债合计",
        "type": DataTypes.STRING(30),
        "field": "SUMLIAB"
    },
    "SHARECAPITAL": {
        "display": "股本",
        "type": DataTypes.STRING(30),
        "field": "SHARECAPITAL"
    },
    "CAPITALRESERVE": {
        "display": "资本公积",
        "type": DataTypes.STRING(30),
        "field": "CAPITALRESERVE"
    },
    "INVENTORYSHARE": {
        "display": "库存股",
        "type": DataTypes.STRING(30),
        "field": "INVENTORYSHARE"
    },
    "OTHEREQUITY": {
        "display": "其他权益工具",
        "type": DataTypes.STRING(30),
        "field": "OTHEREQUITY"
    },
    "PREFERREDSTOCK": {
        "display": "其中:优先股",
        "type": DataTypes.STRING(30),
        "field": "PREFERREDSTOCK"
    },
    "SUSTAINABLEDEBT": {
        "display": "永续债",
        "type": DataTypes.STRING(30),
        "field": "SUSTAINABLEDEBT"
    },
    "OTHEREQUITYOTHER": {
        "display": "其他权益工具",
        "type": DataTypes.STRING(30),
        "field": "OTHEREQUITYOTHER"
    },
    "SURPLUSRESERVE": {
        "display": "盈余公积",
        "type": DataTypes.STRING(30),
        "field": "SURPLUSRESERVE"
    },
    "GENERALRISKPREPARE": {
        "display": "一般风险准备",
        "type": DataTypes.STRING(30),
        "field": "GENERALRISKPREPARE"
    },
    "TRADERISKPREPARE": {
        "display": "交易风险准备",
        "type": DataTypes.STRING(30),
        "field": "TRADERISKPREPARE"
    },
    "RETAINEDEARNING": {
        "display": "未分配利润",
        "type": DataTypes.STRING(30),
        "field": "RETAINEDEARNING"
    },
    "DIFFCONVERSIONFC": {
        "display": "外币报表折算差额",
        "type": DataTypes.STRING(30),
        "field": "DIFFCONVERSIONFC"
    },
    "SUMPARENTEQUITY": {
        "display": "归属于母公司股东权益总计",
        "type": DataTypes.STRING(30),
        "field": "SUMPARENTEQUITY"
    },
    "MINORITYEQUITY": {
        "display": "少数股东权益",
        "type": DataTypes.STRING(30),
        "field": "MINORITYEQUITY"
    },
    "SUMSHEQUITY": {
        "display": "股东权益合计",
        "type": DataTypes.STRING(30),
        "field": "SUMSHEQUITY"
    },
    "SUMLIABSHEQUITY": {
        "display": "负债和股东权益总计",
        "type": DataTypes.STRING(30),
        "field": "SUMLIABSHEQUITY"
    },
    "TRADE_FINASSET_NOTFVTPL": {
        "type": DataTypes.STRING(30),
        "field": "TRADE_FINASSET_NOTFVTPL"
    },
    "TRADE_FINLIAB_NOTFVTPL": {
        "type": DataTypes.STRING(30),
        "field": "TRADE_FINLIAB_NOTFVTPL"
    },
    "CREDITOR_INVEST": {
        "type": DataTypes.STRING(30),
        "field": "CREDITOR_INVEST"
    },
    "OTHER_CREDITOR_INVEST": {
        "type": DataTypes.STRING(30),
        "field": "OTHER_CREDITOR_INVEST"
    },
    "OTHER_EQUITY_INVEST": {
        "type": DataTypes.STRING(30),
        "field": "OTHER_EQUITY_INVEST"
    },
    "MONETARYFUND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MONETARYFUND_YOY"
    },
    "CLIENTFUND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLIENTFUND_YOY"
    },
    "CLIENTCREDITFUND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLIENTCREDITFUND_YOY"
    },
    "SETTLEMENTPROVISION_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SETTLEMENTPROVISION_YOY"
    },
    "CLIENTPROVISION_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLIENTPROVISION_YOY"
    },
    "CREDITPROVISION_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CREDITPROVISION_YOY"
    },
    "LENDFUND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LENDFUND_YOY"
    },
    "MARGINOUTFUND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MARGINOUTFUND_YOY"
    },
    "MARGINOUTSECURITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MARGINOUTSECURITY_YOY"
    },
    "FVALUEFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FVALUEFASSET_YOY"
    },
    "TRADEFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TRADEFASSET_YOY"
    },
    "DEFINEFVALUEFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEFINEFVALUEFASSET_YOY"
    },
    "DERIVEFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DERIVEFASSET_YOY"
    },
    "BUYSELLBACKFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BUYSELLBACKFASSET_YOY"
    },
    "INTERESTREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTERESTREC_YOY"
    },
    "DIVIDENDREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DIVIDENDREC_YOY"
    },
    "RECEIVABLES_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RECEIVABLES_YOY"
    },
    "GDEPOSITPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "GDEPOSITPAY_YOY"
    },
    "SALEABLEFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SALEABLEFASSET_YOY"
    },
    "HELDMATURITYINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "HELDMATURITYINV_YOY"
    },
    "AGENCYASSETS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AGENCYASSETS_YOY"
    },
    "LTEQUITYINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTEQUITYINV_YOY"
    },
    "ESTATEINVEST_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ESTATEINVEST_YOY"
    },
    "FIXEDASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FIXEDASSET_YOY"
    },
    "CONSTRUCTIONPROGRESS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CONSTRUCTIONPROGRESS_YOY"
    },
    "INTANGIBLEASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTANGIBLEASSET_YOY"
    },
    "SEATFEE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SEATFEE_YOY"
    },
    "GOODWILL_YOY": {
        "type": DataTypes.STRING(30),
        "field": "GOODWILL_YOY"
    },
    "DEFERINCOMETAXASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOMETAXASSET_YOY"
    },
    "OTHERASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERASSET_YOY"
    },
    "SUMASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMASSET_YOY"
    },
    "STBORROW_YOY": {
        "type": DataTypes.STRING(30),
        "field": "STBORROW_YOY"
    },
    "PLEDGEBORROW_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PLEDGEBORROW_YOY"
    },
    "BORROWFUND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BORROWFUND_YOY"
    },
    "FVALUEFLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FVALUEFLIAB_YOY"
    },
    "TRADEFLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TRADEFLIAB_YOY"
    },
    "DEFINEFVALUEFLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEFINEFVALUEFLIAB_YOY"
    },
    "DERIVEFLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DERIVEFLIAB_YOY"
    },
    "SELLBUYBACKFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SELLBUYBACKFASSET_YOY"
    },
    "AGENTTRADESECURITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AGENTTRADESECURITY_YOY"
    },
    "CAGENTTRADESECURITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CAGENTTRADESECURITY_YOY"
    },
    "AGENTUWSECURITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AGENTUWSECURITY_YOY"
    },
    "ACCOUNTPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTPAY_YOY"
    },
    "SALARYPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SALARYPAY_YOY"
    },
    "TAXPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TAXPAY_YOY"
    },
    "INTERESTPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTERESTPAY_YOY"
    },
    "DIVIDENDPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DIVIDENDPAY_YOY"
    },
    "SHORTFINANCING_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SHORTFINANCING_YOY"
    },
    "AGENCYLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AGENCYLIAB_YOY"
    },
    "ANTICIPATELIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ANTICIPATELIAB_YOY"
    },
    "LTBORROW_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTBORROW_YOY"
    },
    "BONDPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BONDPAY_YOY"
    },
    "DEFERINCOMETAXLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOMETAXLIAB_YOY"
    },
    "OTHERLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERLIAB_YOY"
    },
    "SUMLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMLIAB_YOY"
    },
    "SHARECAPITAL_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SHARECAPITAL_YOY"
    },
    "CAPITALRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CAPITALRESERVE_YOY"
    },
    "INVENTORYSHARE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVENTORYSHARE_YOY"
    },
    "OTHEREQUITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHEREQUITY_YOY"
    },
    "PREFERREDSTOCK_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PREFERREDSTOCK_YOY"
    },
    "SUSTAINABLEDEBT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUSTAINABLEDEBT_YOY"
    },
    "OTHEREQUITYOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHEREQUITYOTHER_YOY"
    },
    "SURPLUSRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SURPLUSRESERVE_YOY"
    },
    "GENERALRISKPREPARE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "GENERALRISKPREPARE_YOY"
    },
    "TRADERISKPREPARE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TRADERISKPREPARE_YOY"
    },
    "RETAINEDEARNING_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RETAINEDEARNING_YOY"
    },
    "DIFFCONVERSIONFC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DIFFCONVERSIONFC_YOY"
    },
    "SUMPARENTEQUITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMPARENTEQUITY_YOY"
    },
    "MINORITYEQUITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MINORITYEQUITY_YOY"
    },
    "SUMSHEQUITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMSHEQUITY_YOY"
    },
    "SUMLIABSHEQUITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMLIABSHEQUITY_YOY"
    },
    "TRADE_FINASSET_NOTFVTPL_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TRADE_FINASSET_NOTFVTPL_YOY"
    },
    "TRADE_FINLIAB_NOTFVTPL_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TRADE_FINLIAB_NOTFVTPL_YOY"
    },
    "CREDITOR_INVEST_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CREDITOR_INVEST_YOY"
    },
    "OTHER_CREDITOR_INVEST_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHER_CREDITOR_INVEST_YOY"
    },
    "OTHER_EQUITY_INVEST_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHER_EQUITY_INVEST_YOY"
    },
    "PREMIUMREC": {
        "display": "收到原保险合同保费取得的现金",
        "type": DataTypes.STRING(30),
        "field": "PREMIUMREC"
    },
    "RIREC": {
        "display": "应收分保账款",
        "type": DataTypes.STRING(30),
        "field": "RIREC"
    },
    "RICONTACTRESERVEREC": {
        "display": "应收分保合同准备金",
        "type": DataTypes.STRING(30),
        "field": "RICONTACTRESERVEREC"
    },
    "UNDUERIRESERVEREC": {
        "display": "其中:应收分保未到期责任准备金",
        "type": DataTypes.STRING(30),
        "field": "UNDUERIRESERVEREC"
    },
    "CLAIMRIRESERVEREC": {
        "display": "指定以公允价值计量且其变动计入当期损益的金融资产",
        "type": DataTypes.STRING(30),
        "field": "CLAIMRIRESERVEREC"
    },
    "LIFERIRESERVEREC": {
        "display": "应收分保寿险责任准备金",
        "type": DataTypes.STRING(30),
        "field": "LIFERIRESERVEREC"
    },
    "LTHEALTHRIRESERVEREC": {
        "display": "应收分保长期健康险责任准备金",
        "type": DataTypes.STRING(30),
        "field": "LTHEALTHRIRESERVEREC"
    },
    "INSUREDPLEDGELOAN": {
        "display": "保户质押贷款",
        "type": DataTypes.STRING(30),
        "field": "INSUREDPLEDGELOAN"
    },
    "LOANADVANCES": {
        "display": "发放贷款及垫款",
        "type": DataTypes.STRING(30),
        "field": "LOANADVANCES"
    },
    "CREDITORPLANINV": {
        "display": "债权计划投资",
        "type": DataTypes.STRING(30),
        "field": "CREDITORPLANINV"
    },
    "OTHERREC": {
        "display": "其他应收款",
        "type": DataTypes.STRING(30),
        "field": "OTHERREC"
    },
    "TDEPOSIT": {
        "display": "定期存款",
        "type": DataTypes.STRING(30),
        "field": "TDEPOSIT"
    },
    "INVESTREC": {
        "display": "应收款项类投资",
        "type": DataTypes.STRING(30),
        "field": "INVESTREC"
    },
    "ACCOUNTREC": {
        "display": "应收账款",
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTREC"
    },
    "CAPITALGDEPOSITPAY": {
        "display": "存出资本保证金",
        "type": DataTypes.STRING(30),
        "field": "CAPITALGDEPOSITPAY"
    },
    "INDEPENDENTASSET": {
        "display": "独立账户资产",
        "type": DataTypes.STRING(30),
        "field": "INDEPENDENTASSET"
    },
    "FIDEPOSIT": {
        "display": "同业及其他金融机构存放款项",
        "type": DataTypes.STRING(30),
        "field": "FIDEPOSIT"
    },
    "GDEPOSITREC": {
        "display": "存入保证金",
        "type": DataTypes.STRING(30),
        "field": "GDEPOSITREC"
    },
    "ACCEPTDEPOSIT": {
        "display": "吸收存款",
        "type": DataTypes.STRING(30),
        "field": "ACCEPTDEPOSIT"
    },
    "BILLPAY": {
        "display": "应付票据",
        "type": DataTypes.STRING(30),
        "field": "BILLPAY"
    },
    "ADVANCEREC": {
        "display": "预收账款",
        "type": DataTypes.STRING(30),
        "field": "ADVANCEREC"
    },
    "PREMIUMADVANCE": {
        "display": "预收保费",
        "type": DataTypes.STRING(30),
        "field": "PREMIUMADVANCE"
    },
    "COMMPAY": {
        "display": "应付手续费及佣金",
        "type": DataTypes.STRING(30),
        "field": "COMMPAY"
    },
    "RIPAY": {
        "display": "应付分保账款",
        "type": DataTypes.STRING(30),
        "field": "RIPAY"
    },
    "CLAIMPAY": {
        "display": "应付赔付款",
        "type": DataTypes.STRING(30),
        "field": "CLAIMPAY"
    },
    "POLICYDIVIPAY": {
        "display": "应付保单红利",
        "type": DataTypes.STRING(30),
        "field": "POLICYDIVIPAY"
    },
    "OTHERPAY": {
        "display": "其他应付款",
        "type": DataTypes.STRING(30),
        "field": "OTHERPAY"
    },
    "INSUREDDEPOSITINV": {
        "display": "保户储金及投资款",
        "type": DataTypes.STRING(30),
        "field": "INSUREDDEPOSITINV"
    },
    "CONTACTRESERVE": {
        "display": "保险合同准备金",
        "type": DataTypes.STRING(30),
        "field": "CONTACTRESERVE"
    },
    "UNDUERESERVE": {
        "display": "提取未到期责任准备金",
        "type": DataTypes.STRING(30),
        "field": "UNDUERESERVE"
    },
    "CLAIMRESERVE": {
        "display": "未决赔款准备金",
        "type": DataTypes.STRING(30),
        "field": "CLAIMRESERVE"
    },
    "LIFERESERVE": {
        "display": "寿险责任准备金",
        "type": DataTypes.STRING(30),
        "field": "LIFERESERVE"
    },
    "LTHEALTHRESERVE": {
        "display": "长期健康险责任准备金",
        "type": DataTypes.STRING(30),
        "field": "LTHEALTHRESERVE"
    },
    "PREFERSTOCBOND": {
        "display": "其中:优先股",
        "type": DataTypes.STRING(30),
        "field": "PREFERSTOCBOND"
    },
    "SUSTAINBOND": {
        "display": "永续债",
        "type": DataTypes.STRING(30),
        "field": "SUSTAINBOND"
    },
    "JUNIORBONDPAY": {
        "display": "应付次级债",
        "type": DataTypes.STRING(30),
        "field": "JUNIORBONDPAY"
    },
    "INDEPENDENTLIAB": {
        "display": "独立账户负债",
        "type": DataTypes.STRING(30),
        "field": "INDEPENDENTLIAB"
    },
    "PREMIUMREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PREMIUMREC_YOY"
    },
    "RIREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RIREC_YOY"
    },
    "RICONTACTRESERVEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RICONTACTRESERVEREC_YOY"
    },
    "UNDUERIRESERVEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "UNDUERIRESERVEREC_YOY"
    },
    "CLAIMRIRESERVEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLAIMRIRESERVEREC_YOY"
    },
    "LIFERIRESERVEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIFERIRESERVEREC_YOY"
    },
    "LTHEALTHRIRESERVEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTHEALTHRIRESERVEREC_YOY"
    },
    "INSUREDPLEDGELOAN_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INSUREDPLEDGELOAN_YOY"
    },
    "LOANADVANCES_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LOANADVANCES_YOY"
    },
    "CREDITORPLANINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CREDITORPLANINV_YOY"
    },
    "OTHERREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERREC_YOY"
    },
    "TDEPOSIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TDEPOSIT_YOY"
    },
    "INVESTREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVESTREC_YOY"
    },
    "ACCOUNTREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTREC_YOY"
    },
    "CAPITALGDEPOSITPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CAPITALGDEPOSITPAY_YOY"
    },
    "INDEPENDENTASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INDEPENDENTASSET_YOY"
    },
    "FIDEPOSIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FIDEPOSIT_YOY"
    },
    "GDEPOSITREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "GDEPOSITREC_YOY"
    },
    "ACCEPTDEPOSIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ACCEPTDEPOSIT_YOY"
    },
    "BILLPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BILLPAY_YOY"
    },
    "ADVANCEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ADVANCEREC_YOY"
    },
    "PREMIUMADVANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PREMIUMADVANCE_YOY"
    },
    "COMMPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "COMMPAY_YOY"
    },
    "RIPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RIPAY_YOY"
    },
    "CLAIMPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLAIMPAY_YOY"
    },
    "POLICYDIVIPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "POLICYDIVIPAY_YOY"
    },
    "OTHERPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERPAY_YOY"
    },
    "INSUREDDEPOSITINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INSUREDDEPOSITINV_YOY"
    },
    "CONTACTRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CONTACTRESERVE_YOY"
    },
    "UNDUERESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "UNDUERESERVE_YOY"
    },
    "CLAIMRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLAIMRESERVE_YOY"
    },
    "LIFERESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIFERESERVE_YOY"
    },
    "LTHEALTHRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTHEALTHRESERVE_YOY"
    },
    "PREFERSTOCBOND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PREFERSTOCBOND_YOY"
    },
    "SUSTAINBOND_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUSTAINBOND_YOY"
    },
    "JUNIORBONDPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "JUNIORBONDPAY_YOY"
    },
    "INDEPENDENTLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INDEPENDENTLIAB_YOY"
    },
    "CASHANDDEPOSITCBANK": {
        "display": "现金及存放中央银行款项",
        "type": DataTypes.STRING(30),
        "field": "CASHANDDEPOSITCBANK"
    },
    "DEPOSITINFI": {
        "display": "存放同业款项",
        "type": DataTypes.STRING(30),
        "field": "DEPOSITINFI"
    },
    "PRECIOUSMETAL": {
        "display": "贵金属",
        "type": DataTypes.STRING(30),
        "field": "PRECIOUSMETAL"
    },
    "INVSUBSIDIARY": {
        "display": "对子公司的投资",
        "type": DataTypes.STRING(30),
        "field": "INVSUBSIDIARY"
    },
    "INVJOINT": {
        "display": "对联营和合营企业的投资",
        "type": DataTypes.STRING(30),
        "field": "INVJOINT"
    },
    "MASSET": {
        "display": "待处理抵债资产",
        "type": DataTypes.STRING(30),
        "field": "MASSET"
    },
    "MASSETDEVALUE": {
        "display": "减:抵债资产减值准备",
        "type": DataTypes.STRING(30),
        "field": "MASSETDEVALUE"
    },
    "NETMASSET": {
        "display": "待处理抵债资产净额",
        "type": DataTypes.STRING(30),
        "field": "NETMASSET"
    },
    "BORROWFROMCBANK": {
        "display": "向中央银行借款",
        "type": DataTypes.STRING(30),
        "field": "BORROWFROMCBANK"
    },
    "OUTWARDREMITTANCE": {
        "display": "汇出汇款",
        "type": DataTypes.STRING(30),
        "field": "OUTWARDREMITTANCE"
    },
    "CDANDBILLREC": {
        "display": "存款证及应付票据",
        "type": DataTypes.STRING(30),
        "field": "CDANDBILLREC"
    },
    "CD": {
        "display": "其中:存款证",
        "type": DataTypes.STRING(30),
        "field": "CD"
    },
    "SHEQUITY": {
        "display": "股本",
        "type": DataTypes.STRING(30),
        "field": "SHEQUITY"
    },
    "INVREVALUERESERVE": {
        "display": "投资重估储备",
        "type": DataTypes.STRING(30),
        "field": "INVREVALUERESERVE"
    },
    "HEDGERESERVE": {
        "display": "套期储备",
        "type": DataTypes.STRING(30),
        "field": "HEDGERESERVE"
    },
    "SUGGESTASSIGNDIVI": {
        "display": "建议分派股利",
        "type": DataTypes.STRING(30),
        "field": "SUGGESTASSIGNDIVI"
    },
    "CASHANDDEPOSITCBANK_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CASHANDDEPOSITCBANK_YOY"
    },
    "DEPOSITINFI_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEPOSITINFI_YOY"
    },
    "PRECIOUSMETAL_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PRECIOUSMETAL_YOY"
    },
    "INVSUBSIDIARY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVSUBSIDIARY_YOY"
    },
    "INVJOINT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVJOINT_YOY"
    },
    "MASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MASSET_YOY"
    },
    "MASSETDEVALUE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MASSETDEVALUE_YOY"
    },
    "NETMASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NETMASSET_YOY"
    },
    "BORROWFROMCBANK_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BORROWFROMCBANK_YOY"
    },
    "OUTWARDREMITTANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OUTWARDREMITTANCE_YOY"
    },
    "CDANDBILLREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CDANDBILLREC_YOY"
    },
    "CD_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CD_YOY"
    },
    "SHEQUITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SHEQUITY_YOY"
    },
    "INVREVALUERESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVREVALUERESERVE_YOY"
    },
    "HEDGERESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "HEDGERESERVE_YOY"
    },
    "SUGGESTASSIGNDIVI_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUGGESTASSIGNDIVI_YOY"
    },
    "BILLREC": {
        "display": "其中:应收票据",
        "type": DataTypes.STRING(30),
        "field": "BILLREC"
    },
    "ADVANCEPAY": {
        "display": "预付款项",
        "type": DataTypes.STRING(30),
        "field": "ADVANCEPAY"
    },
    "EXPORTREBATEREC": {
        "display": "应收出口退税",
        "type": DataTypes.STRING(30),
        "field": "EXPORTREBATEREC"
    },
    "SUBSIDYREC": {
        "display": "应收补贴款",
        "type": DataTypes.STRING(30),
        "field": "SUBSIDYREC"
    },
    "INTERNALREC": {
        "display": "内部应收款",
        "type": DataTypes.STRING(30),
        "field": "INTERNALREC"
    },
    "INVENTORY": {
        "display": "存货",
        "type": DataTypes.STRING(30),
        "field": "INVENTORY"
    },
    "CLHELDSALEASS": {
        "display": "划分为持有待售的资产",
        "type": DataTypes.STRING(30),
        "field": "CLHELDSALEASS"
    },
    "NONLASSETONEYEAR": {
        "display": "一年内到期的非流动资产",
        "type": DataTypes.STRING(30),
        "field": "NONLASSETONEYEAR"
    },
    "OTHERLASSET": {
        "display": "其他流动资产",
        "type": DataTypes.STRING(30),
        "field": "OTHERLASSET"
    },
    "SUMLASSET": {
        "display": "流动资产合计",
        "type": DataTypes.STRING(30),
        "field": "SUMLASSET"
    },
    "LTREC": {
        "display": "长期应收款",
        "type": DataTypes.STRING(30),
        "field": "LTREC"
    },
    "CONSTRUCTIONMATERIAL": {
        "display": "工程物资",
        "type": DataTypes.STRING(30),
        "field": "CONSTRUCTIONMATERIAL"
    },
    "LIQUIDATEFIXEDASSET": {
        "display": "固定资产清理",
        "type": DataTypes.STRING(30),
        "field": "LIQUIDATEFIXEDASSET"
    },
    "PRODUCTBIOLOGYASSET": {
        "display": "生产性生物资产",
        "type": DataTypes.STRING(30),
        "field": "PRODUCTBIOLOGYASSET"
    },
    "OILGASASSET": {
        "display": "油气资产",
        "type": DataTypes.STRING(30),
        "field": "OILGASASSET"
    },
    "DEVELOPEXP": {
        "display": "开发支出",
        "type": DataTypes.STRING(30),
        "field": "DEVELOPEXP"
    },
    "LTDEFERASSET": {
        "display": "长期待摊费用",
        "type": DataTypes.STRING(30),
        "field": "LTDEFERASSET"
    },
    "OTHERNONLASSET": {
        "display": "其他非流动资产",
        "type": DataTypes.STRING(30),
        "field": "OTHERNONLASSET"
    },
    "SUMNONLASSET": {
        "display": "非流动资产合计",
        "type": DataTypes.STRING(30),
        "field": "SUMNONLASSET"
    },
    "DEPOSIT": {
        "display": "吸收存款及同业存放",
        "type": DataTypes.STRING(30),
        "field": "DEPOSIT"
    },
    "ADVANCERECEIVE": {
        "display": "预收款项",
        "type": DataTypes.STRING(30),
        "field": "ADVANCERECEIVE"
    },
    "INTERNALPAY": {
        "display": "内部应付款",
        "type": DataTypes.STRING(30),
        "field": "INTERNALPAY"
    },
    "ANTICIPATELLIAB": {
        "display": "预计流动负债",
        "type": DataTypes.STRING(30),
        "field": "ANTICIPATELLIAB"
    },
    "DEFERINCOMEONEYEAR": {
        "display": "一年内的递延收益",
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOMEONEYEAR"
    },
    "STBONDREC": {
        "display": "应付短期债券",
        "type": DataTypes.STRING(30),
        "field": "STBONDREC"
    },
    "CLHELDSALELIAB": {
        "display": "划分为持有待售的负债",
        "type": DataTypes.STRING(30),
        "field": "CLHELDSALELIAB"
    },
    "NONLLIABONEYEAR": {
        "display": "一年内到期的非流动负债",
        "type": DataTypes.STRING(30),
        "field": "NONLLIABONEYEAR"
    },
    "OTHERLLIAB": {
        "display": "其他流动负债",
        "type": DataTypes.STRING(30),
        "field": "OTHERLLIAB"
    },
    "SUMLLIAB": {
        "display": "流动负债合计",
        "type": DataTypes.STRING(30),
        "field": "SUMLLIAB"
    },
    "LTACCOUNTPAY": {
        "display": "长期应付款",
        "type": DataTypes.STRING(30),
        "field": "LTACCOUNTPAY"
    },
    "LTSALARYPAY": {
        "display": "长期应付职工薪酬",
        "type": DataTypes.STRING(30),
        "field": "LTSALARYPAY"
    },
    "SPECIALPAY": {
        "display": "专项应付款",
        "type": DataTypes.STRING(30),
        "field": "SPECIALPAY"
    },
    "DEFERINCOME": {
        "display": "递延收益",
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOME"
    },
    "OTHERNONLLIAB": {
        "display": "其他非流动负债",
        "type": DataTypes.STRING(30),
        "field": "OTHERNONLLIAB"
    },
    "SUMNONLLIAB": {
        "display": "非流动负债合计",
        "type": DataTypes.STRING(30),
        "field": "SUMNONLLIAB"
    },
    "SPECIALRESERVE": {
        "display": "专项储备",
        "type": DataTypes.STRING(30),
        "field": "SPECIALRESERVE"
    },
    "UNCONFIRMINVLOSS": {
        "display": "未确定的投资损失",
        "type": DataTypes.STRING(30),
        "field": "UNCONFIRMINVLOSS"
    },
    "PLANCASHDIVI": {
        "display": "拟分配现金股利",
        "type": DataTypes.STRING(30),
        "field": "PLANCASHDIVI"
    },
    "ACCOUNTBILLREC": {
        "display": "应收票据及应收账款",
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTBILLREC"
    },
    "AMORCOSTFASSET": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFASSET"
    },
    "FVALUECOMPFASSET": {
        "type": DataTypes.STRING(30),
        "field": "FVALUECOMPFASSET"
    },
    "CONTRACTASSET": {
        "type": DataTypes.STRING(30),
        "field": "CONTRACTASSET"
    },
    "HELDSALEASS": {
        "type": DataTypes.STRING(30),
        "field": "HELDSALEASS"
    },
    "LASSETOTHER": {
        "type": DataTypes.STRING(30),
        "field": "LASSETOTHER"
    },
    "LASSETBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "LASSETBALANCE"
    },
    "CREDINV": {
        "type": DataTypes.STRING(30),
        "field": "CREDINV"
    },
    "AMORCOSTFASSETFLD": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFASSETFLD"
    },
    "OTHCREDINV": {
        "type": DataTypes.STRING(30),
        "field": "OTHCREDINV"
    },
    "FVALUECOMPFASSETFLD": {
        "type": DataTypes.STRING(30),
        "field": "FVALUECOMPFASSETFLD"
    },
    "OTHEREQUITYINV": {
        "type": DataTypes.STRING(30),
        "field": "OTHEREQUITYINV"
    },
    "OTHERNONFASSET": {
        "type": DataTypes.STRING(30),
        "field": "OTHERNONFASSET"
    },
    "NONLASSETOTHER": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETOTHER"
    },
    "NONLASSETBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETBALANCE"
    },
    "ASSETOTHER": {
        "type": DataTypes.STRING(30),
        "field": "ASSETOTHER"
    },
    "ASSETBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "ASSETBALANCE"
    },
    "ACCOUNTBILLPAY": {
        "display": "应付票据及应付账款",
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTBILLPAY"
    },
    "CONTRACTLIAB": {
        "type": DataTypes.STRING(30),
        "field": "CONTRACTLIAB"
    },
    "AMORCOSTFLIAB": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFLIAB"
    },
    "HELDSALELIAB": {
        "type": DataTypes.STRING(30),
        "field": "HELDSALELIAB"
    },
    "LLIABOTHER": {
        "type": DataTypes.STRING(30),
        "field": "LLIABOTHER"
    },
    "LLIABBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "LLIABBALANCE"
    },
    "AMORCOSTFLIABFLD": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFLIABFLD"
    },
    "NONLLIABOTHER": {
        "type": DataTypes.STRING(30),
        "field": "NONLLIABOTHER"
    },
    "NONLLIABBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "NONLLIABBALANCE"
    },
    "LIABOTHER": {
        "type": DataTypes.STRING(30),
        "field": "LIABOTHER"
    },
    "LIABBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "LIABBALANCE"
    },
    "OTHERCINCOME": {
        "display": "其他综合收益",
        "type": DataTypes.STRING(30),
        "field": "OTHERCINCOME"
    },
    "PARENTEQUITYOTHER": {
        "type": DataTypes.STRING(30),
        "field": "PARENTEQUITYOTHER"
    },
    "PARENTEQUITYBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "PARENTEQUITYBALANCE"
    },
    "SHEQUITYOTHER": {
        "type": DataTypes.STRING(30),
        "field": "SHEQUITYOTHER"
    },
    "SHEQUITYBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "SHEQUITYBALANCE"
    },
    "LIABSHEQUITYOTHER": {
        "type": DataTypes.STRING(30),
        "field": "LIABSHEQUITYOTHER"
    },
    "LIABSHEQUITYBALANCE": {
        "type": DataTypes.STRING(30),
        "field": "LIABSHEQUITYBALANCE"
    },
    "TOTAL_OTHER_RECE": {
        "type": DataTypes.STRING(30),
        "field": "TOTAL_OTHER_RECE"
    },
    "TOTAL_OTHER_PAYABLE": {
        "type": DataTypes.STRING(30),
        "field": "TOTAL_OTHER_PAYABLE"
    },
    "BILLREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BILLREC_YOY"
    },
    "ADVANCEPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ADVANCEPAY_YOY"
    },
    "EXPORTREBATEREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "EXPORTREBATEREC_YOY"
    },
    "SUBSIDYREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUBSIDYREC_YOY"
    },
    "INTERNALREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTERNALREC_YOY"
    },
    "INVENTORY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVENTORY_YOY"
    },
    "CLHELDSALEASS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLHELDSALEASS_YOY"
    },
    "NONLASSETONEYEAR_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETONEYEAR_YOY"
    },
    "OTHERLASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERLASSET_YOY"
    },
    "SUMLASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMLASSET_YOY"
    },
    "LTREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTREC_YOY"
    },
    "CONSTRUCTIONMATERIAL_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CONSTRUCTIONMATERIAL_YOY"
    },
    "LIQUIDATEFIXEDASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIQUIDATEFIXEDASSET_YOY"
    },
    "PRODUCTBIOLOGYASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PRODUCTBIOLOGYASSET_YOY"
    },
    "OILGASASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OILGASASSET_YOY"
    },
    "DEVELOPEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEVELOPEXP_YOY"
    },
    "LTDEFERASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTDEFERASSET_YOY"
    },
    "OTHERNONLASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERNONLASSET_YOY"
    },
    "SUMNONLASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMNONLASSET_YOY"
    },
    "DEPOSIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEPOSIT_YOY"
    },
    "ADVANCERECEIVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ADVANCERECEIVE_YOY"
    },
    "INTERNALPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTERNALPAY_YOY"
    },
    "ANTICIPATELLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ANTICIPATELLIAB_YOY"
    },
    "DEFERINCOMEONEYEAR_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOMEONEYEAR_YOY"
    },
    "STBONDREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "STBONDREC_YOY"
    },
    "CLHELDSALELIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLHELDSALELIAB_YOY"
    },
    "NONLLIABONEYEAR_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLLIABONEYEAR_YOY"
    },
    "OTHERLLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERLLIAB_YOY"
    },
    "SUMLLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMLLIAB_YOY"
    },
    "LTACCOUNTPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTACCOUNTPAY_YOY"
    },
    "LTSALARYPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LTSALARYPAY_YOY"
    },
    "SPECIALPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SPECIALPAY_YOY"
    },
    "DEFERINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DEFERINCOME_YOY"
    },
    "OTHERNONLLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERNONLLIAB_YOY"
    },
    "SUMNONLLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMNONLLIAB_YOY"
    },
    "SPECIALRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SPECIALRESERVE_YOY"
    },
    "UNCONFIRMINVLOSS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "UNCONFIRMINVLOSS_YOY"
    },
    "PLANCASHDIVI_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PLANCASHDIVI_YOY"
    },
    "ACCOUNTBILLREC_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTBILLREC_YOY"
    },
    "AMORCOSTFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFASSET_YOY"
    },
    "FVALUECOMPFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FVALUECOMPFASSET_YOY"
    },
    "CONTRACTASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CONTRACTASSET_YOY"
    },
    "HELDSALEASS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "HELDSALEASS_YOY"
    },
    "LASSETOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LASSETOTHER_YOY"
    },
    "LASSETBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LASSETBALANCE_YOY"
    },
    "CREDINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CREDINV_YOY"
    },
    "AMORCOSTFASSETFLD_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFASSETFLD_YOY"
    },
    "OTHCREDINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHCREDINV_YOY"
    },
    "FVALUECOMPFASSETFLD_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FVALUECOMPFASSETFLD_YOY"
    },
    "OTHEREQUITYINV_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHEREQUITYINV_YOY"
    },
    "OTHERNONFASSET_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERNONFASSET_YOY"
    },
    "NONLASSETOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETOTHER_YOY"
    },
    "NONLASSETBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETBALANCE_YOY"
    },
    "ASSETOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ASSETOTHER_YOY"
    },
    "ASSETBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ASSETBALANCE_YOY"
    },
    "ACCOUNTBILLPAY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ACCOUNTBILLPAY_YOY"
    },
    "CONTRACTLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CONTRACTLIAB_YOY"
    },
    "AMORCOSTFLIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFLIAB_YOY"
    },
    "HELDSALELIAB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "HELDSALELIAB_YOY"
    },
    "LLIABOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LLIABOTHER_YOY"
    },
    "LLIABBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LLIABBALANCE_YOY"
    },
    "AMORCOSTFLIABFLD_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORCOSTFLIABFLD_YOY"
    },
    "NONLLIABOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLLIABOTHER_YOY"
    },
    "NONLLIABBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLLIABBALANCE_YOY"
    },
    "LIABOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIABOTHER_YOY"
    },
    "LIABBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIABBALANCE_YOY"
    },
    "OTHERCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERCINCOME_YOY"
    },
    "PARENTEQUITYOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PARENTEQUITYOTHER_YOY"
    },
    "PARENTEQUITYBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PARENTEQUITYBALANCE_YOY"
    },
    "SHEQUITYOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SHEQUITYOTHER_YOY"
    },
    "SHEQUITYBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SHEQUITYBALANCE_YOY"
    },
    "LIABSHEQUITYOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIABSHEQUITYOTHER_YOY"
    },
    "LIABSHEQUITYBALANCE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "LIABSHEQUITYBALANCE_YOY"
    },
    "TOTAL_OTHER_RECE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TOTAL_OTHER_RECE_YOY"
    },
    "TOTAL_OTHER_PAYABLE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TOTAL_OTHER_PAYABLE_YOY"
    },
    "AUDITOPINIONSDOMESTIC": {
        "type": DataTypes.STRING(30),
        "field": "AUDITOPINIONSDOMESTIC"
    },
    "AUDITOPINIONSDOMESTICJW": {
        "type": DataTypes.STRING(30),
        "field": "AUDITOPINIONSDOMESTICJW"
    }
}
    ,
      {
        sequelize: db,
        modelName: "zcfzb",
      }
    );
    module.exports = Zcfzb;
    
const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
    const { defaults } = require("lodash");

    class Lrb extends Model {}
    Lrb.init(
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
    "SECURITYSHORTNAME": {
        "type": DataTypes.STRING(10),
        "field": "SECURITYSHORTNAME"
    },
    "REPORTTYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTTYPE",
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
    "KCFJCXSYJLR": {
        "display": "扣除非经常性损益后的净利润",
        "type": DataTypes.DOUBLE,
        "field": "KCFJCXSYJLR"
    },
    "KCFJCXSYJLR_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "KCFJCXSYJLR_YOY"
    },
    "OPERATEREVE": {
        "display": "营业收入",
        "type": DataTypes.DOUBLE,
        "field": "OPERATEREVE"
    },
    "OPERATEREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OPERATEREVE_YOY"
    },
    "COMMNREVE": {
        "display": "手续费及佣金净收入",
        "type": DataTypes.DOUBLE,
        "field": "COMMNREVE"
    },
    "COMMNREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMMNREVE_YOY"
    },
    "AGENTTRADESECURITY": {
        "display": "代理买卖证券款",
        "type": DataTypes.DOUBLE,
        "field": "AGENTTRADESECURITY"
    },
    "AGENTTRADESECURITY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AGENTTRADESECURITY_YOY"
    },
    "SECURITYUW": {
        "display": "证券承销业务净收入",
        "type": DataTypes.DOUBLE,
        "field": "SECURITYUW"
    },
    "SECURITYUW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SECURITYUW_YOY"
    },
    "CLIENTASSETMANAGE": {
        "display": "受托客户资产管理业务净收入",
        "type": DataTypes.DOUBLE,
        "field": "CLIENTASSETMANAGE"
    },
    "CLIENTASSETMANAGE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CLIENTASSETMANAGE_YOY"
    },
    "FINACONSULT": {
        "display": "财务顾问净收入",
        "type": DataTypes.DOUBLE,
        "field": "FINACONSULT"
    },
    "FINACONSULT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FINACONSULT_YOY"
    },
    "SPONSOR": {
        "display": "保荐业务净收入",
        "type": DataTypes.DOUBLE,
        "field": "SPONSOR"
    },
    "SPONSOR_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SPONSOR_YOY"
    },
    "FUNDMANAGE": {
        "display": "基金管理业务净收入",
        "type": DataTypes.DOUBLE,
        "field": "FUNDMANAGE"
    },
    "FUNDMANAGE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FUNDMANAGE_YOY"
    },
    "FUNDSALE": {
        "display": "基金销售业务净收入",
        "type": DataTypes.DOUBLE,
        "field": "FUNDSALE"
    },
    "FUNDSALE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FUNDSALE_YOY"
    },
    "SECURITYBROKER": {
        "display": "证券经纪业务净收入",
        "type": DataTypes.DOUBLE,
        "field": "SECURITYBROKER"
    },
    "SECURITYBROKER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SECURITYBROKER_YOY"
    },
    "COMMNREVEOTHER": {
        "display": "手续费及佣金净收入其他项目",
        "type": DataTypes.DOUBLE,
        "field": "COMMNREVEOTHER"
    },
    "COMMNREVEOTHER_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMMNREVEOTHER_YOY"
    },
    "INTNREVE": {
        "display": "利息净收入",
        "type": DataTypes.DOUBLE,
        "field": "INTNREVE"
    },
    "INTNREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTNREVE_YOY"
    },
    "INVESTINCOME": {
        "display": "加:投资收益",
        "type": DataTypes.DOUBLE,
        "field": "INVESTINCOME"
    },
    "INVESTINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVESTINCOME_YOY"
    },
    "INVESTJOINTINCOME": {
        "display": "其中:对联营企业和合营企业的投资收益/（损失）",
        "type": DataTypes.DOUBLE,
        "field": "INVESTJOINTINCOME"
    },
    "INVESTJOINTINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVESTJOINTINCOME_YOY"
    },
    "FVALUEINCOME": {
        "display": "公允价值变动损益",
        "type": DataTypes.DOUBLE,
        "field": "FVALUEINCOME"
    },
    "FVALUEINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUEINCOME_YOY"
    },
    "FVALUEOSALABLE": {
        "display": "其中:可供出售金融资产公允价值变动损益",
        "type": DataTypes.DOUBLE,
        "field": "FVALUEOSALABLE"
    },
    "FVALUEOSALABLE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUEOSALABLE_YOY"
    },
    "EXCHANGEINCOME": {
        "display": "汇兑损失",
        "type": DataTypes.DOUBLE,
        "field": "EXCHANGEINCOME"
    },
    "EXCHANGEINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "EXCHANGEINCOME_YOY"
    },
    "OTHERREVE": {
        "display": "其他业务收入",
        "type": DataTypes.DOUBLE,
        "field": "OTHERREVE"
    },
    "OTHERREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERREVE_YOY"
    },
    "OPERATEEXP": {
        "display": "营业支出",
        "type": DataTypes.DOUBLE,
        "field": "OPERATEEXP"
    },
    "OPERATEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OPERATEEXP_YOY"
    },
    "OPERATETAX": {
        "display": "营业税金及附加",
        "type": DataTypes.DOUBLE,
        "field": "OPERATETAX"
    },
    "OPERATETAX_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OPERATETAX_YOY"
    },
    "OPERATEMANAGEEXP": {
        "display": "业务及管理费",
        "type": DataTypes.DOUBLE,
        "field": "OPERATEMANAGEEXP"
    },
    "OPERATEMANAGEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OPERATEMANAGEEXP_YOY"
    },
    "ASSETDEVALUELOSS": {
        "display": "资产减值损失",
        "type": DataTypes.DOUBLE,
        "field": "ASSETDEVALUELOSS"
    },
    "ASSETDEVALUELOSS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ASSETDEVALUELOSS_YOY"
    },
    "OTHEREXP": {
        "display": "其他业务成本",
        "type": DataTypes.DOUBLE,
        "field": "OTHEREXP"
    },
    "OTHEREXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEREXP_YOY"
    },
    "OPERATEPROFIT": {
        "display": "营业利润",
        "type": DataTypes.DOUBLE,
        "field": "OPERATEPROFIT"
    },
    "OPERATEPROFIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OPERATEPROFIT_YOY"
    },
    "NONOPERATEREVE": {
        "display": "加:营业外收入",
        "type": DataTypes.DOUBLE,
        "field": "NONOPERATEREVE"
    },
    "NONOPERATEREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONOPERATEREVE_YOY"
    },
    "NONLASSETREVE": {
        "display": "其中:非流动资产处置利得",
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETREVE"
    },
    "NONLASSETREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETREVE_YOY"
    },
    "NONOPERATEEXP": {
        "display": "减:营业外支出",
        "type": DataTypes.DOUBLE,
        "field": "NONOPERATEEXP"
    },
    "NONOPERATEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONOPERATEEXP_YOY"
    },
    "NONLASSETNETLOSS": {
        "display": "其中:非流动资产处置净损失",
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETNETLOSS"
    },
    "NONLASSETNETLOSS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NONLASSETNETLOSS_YOY"
    },
    "SUMPROFIT": {
        "display": "利润总额",
        "type": DataTypes.DOUBLE,
        "field": "SUMPROFIT"
    },
    "SUMPROFIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMPROFIT_YOY"
    },
    "INCOMETAX": {
        "display": "减:所得税",
        "type": DataTypes.DOUBLE,
        "field": "INCOMETAX"
    },
    "INCOMETAX_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INCOMETAX_YOY"
    },
    "NETPROFIT": {
        "display": "净利润",
        "type": DataTypes.DOUBLE,
        "field": "NETPROFIT"
    },
    "NETPROFIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETPROFIT_YOY"
    },
    "PARENTNETPROFIT": {
        "display": "其中:归属于母公司股东的净利润",
        "type": DataTypes.DOUBLE,
        "field": "PARENTNETPROFIT"
    },
    "PARENTNETPROFIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTNETPROFIT_YOY"
    },
    "MINORITYINCOME": {
        "display": "少数股东损益",
        "type": DataTypes.DOUBLE,
        "field": "MINORITYINCOME"
    },
    "MINORITYINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MINORITYINCOME_YOY"
    },
    "BASICEPS": {
        "display": "基本每股收益",
        "type": DataTypes.DOUBLE,
        "field": "BASICEPS"
    },
    "BASICEPS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BASICEPS_YOY"
    },
    "DILUTEDEPS": {
        "display": "稀释每股收益",
        "type": DataTypes.DOUBLE,
        "field": "DILUTEDEPS"
    },
    "DILUTEDEPS_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DILUTEDEPS_YOY"
    },
    "OTHERCINCOME": {
        "display": "其他综合收益",
        "type": DataTypes.DOUBLE,
        "field": "OTHERCINCOME"
    },
    "OTHERCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERCINCOME_YOY"
    },
    "PARENTOTHERCINCOME": {
        "display": "归属于母公司股东的其他综合收益",
        "type": DataTypes.DOUBLE,
        "field": "PARENTOTHERCINCOME"
    },
    "PARENTOTHERCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTOTHERCINCOME_YOY"
    },
    "MINORITYOTHERCINCOME": {
        "display": "归属于少数股东的其他综合收益",
        "type": DataTypes.DOUBLE,
        "field": "MINORITYOTHERCINCOME"
    },
    "MINORITYOTHERCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MINORITYOTHERCINCOME_YOY"
    },
    "SUMCINCOME": {
        "display": "综合收益总额",
        "type": DataTypes.DOUBLE,
        "field": "SUMCINCOME"
    },
    "SUMCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMCINCOME_YOY"
    },
    "PARENTCINCOME": {
        "display": "归属于母公司股东的综合收益总额",
        "type": DataTypes.DOUBLE,
        "field": "PARENTCINCOME"
    },
    "PARENTCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PARENTCINCOME_YOY"
    },
    "MINORITYCINCOME": {
        "display": "归属于少数股东的综合收益总额",
        "type": DataTypes.DOUBLE,
        "field": "MINORITYCINCOME"
    },
    "MINORITYCINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MINORITYCINCOME_YOY"
    },
    "PREMIUMEARNED": {
        "display": "已赚保费",
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMEARNED"
    },
    "PREMIUMEARNED_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMEARNED_YOY"
    },
    "INSURREVE": {
        "display": "其中:保险业务收入",
        "type": DataTypes.DOUBLE,
        "field": "INSURREVE"
    },
    "INSURREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INSURREVE_YOY"
    },
    "RIREVE": {
        "display": "分保费收入",
        "type": DataTypes.DOUBLE,
        "field": "RIREVE"
    },
    "RIREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RIREVE_YOY"
    },
    "RIPREMIUM": {
        "display": "减:分出保费",
        "type": DataTypes.DOUBLE,
        "field": "RIPREMIUM"
    },
    "RIPREMIUM_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RIPREMIUM_YOY"
    },
    "UNDUERESERVE": {
        "display": "提取未到期责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "UNDUERESERVE"
    },
    "UNDUERESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "UNDUERESERVE_YOY"
    },
    "BANKINTNREVE": {
        "display": "银行业务利息净收入",
        "type": DataTypes.DOUBLE,
        "field": "BANKINTNREVE"
    },
    "BANKINTNREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BANKINTNREVE_YOY"
    },
    "BANKINTREVE": {
        "display": "其中:银行业务利息收入",
        "type": DataTypes.DOUBLE,
        "field": "BANKINTREVE"
    },
    "BANKINTREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BANKINTREVE_YOY"
    },
    "BANKINTEXP": {
        "display": "银行业务利息支出",
        "type": DataTypes.DOUBLE,
        "field": "BANKINTEXP"
    },
    "BANKINTEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BANKINTEXP_YOY"
    },
    "NINSURCOMMNREVE": {
        "display": "非保险业务手续费及佣金净收入",
        "type": DataTypes.DOUBLE,
        "field": "NINSURCOMMNREVE"
    },
    "NINSURCOMMNREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NINSURCOMMNREVE_YOY"
    },
    "NINSURCOMMREVE": {
        "display": "非保险业务手续费及佣金收入",
        "type": DataTypes.DOUBLE,
        "field": "NINSURCOMMREVE"
    },
    "NINSURCOMMREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NINSURCOMMREVE_YOY"
    },
    "NINSURCOMMEXP": {
        "display": "非保险业务手续费及佣金支出",
        "type": DataTypes.DOUBLE,
        "field": "NINSURCOMMEXP"
    },
    "NINSURCOMMEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NINSURCOMMEXP_YOY"
    },
    "SURRENDERPREMIUM": {
        "display": "退保金",
        "type": DataTypes.DOUBLE,
        "field": "SURRENDERPREMIUM"
    },
    "SURRENDERPREMIUM_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SURRENDERPREMIUM_YOY"
    },
    "INDEMNITYEXP": {
        "display": "赔付支出",
        "type": DataTypes.DOUBLE,
        "field": "INDEMNITYEXP"
    },
    "INDEMNITYEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INDEMNITYEXP_YOY"
    },
    "AMORTISEINDEMNITYEXP": {
        "display": "减:摊回赔付支出",
        "type": DataTypes.DOUBLE,
        "field": "AMORTISEINDEMNITYEXP"
    },
    "AMORTISEINDEMNITYEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORTISEINDEMNITYEXP_YOY"
    },
    "DUTYRESERVE": {
        "display": "提取保险责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "DUTYRESERVE"
    },
    "DUTYRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DUTYRESERVE_YOY"
    },
    "AMORTISEDUTYRESERVE": {
        "display": "减:摊回保险责任准备金",
        "type": DataTypes.DOUBLE,
        "field": "AMORTISEDUTYRESERVE"
    },
    "AMORTISEDUTYRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORTISEDUTYRESERVE_YOY"
    },
    "POLICYDIVIEXP": {
        "display": "保单红利支出",
        "type": DataTypes.DOUBLE,
        "field": "POLICYDIVIEXP"
    },
    "POLICYDIVIEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "POLICYDIVIEXP_YOY"
    },
    "RIEXP": {
        "display": "分保费用",
        "type": DataTypes.DOUBLE,
        "field": "RIEXP"
    },
    "RIEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RIEXP_YOY"
    },
    "COMMEXP": {
        "display": "手续费及佣金支出",
        "type": DataTypes.DOUBLE,
        "field": "COMMEXP"
    },
    "COMMEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMMEXP_YOY"
    },
    "AMORTISERIEXP": {
        "display": "减:摊回分保费用",
        "type": DataTypes.DOUBLE,
        "field": "AMORTISERIEXP"
    },
    "AMORTISERIEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "AMORTISERIEXP_YOY"
    },
    "INTEXP": {
        "display": "利息支出",
        "type": DataTypes.DOUBLE,
        "field": "INTEXP"
    },
    "INTEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTEXP_YOY"
    },
    "FINANCEEXP": {
        "display": "财务费用",
        "type": DataTypes.DOUBLE,
        "field": "FINANCEEXP"
    },
    "FINANCEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FINANCEEXP_YOY"
    },
    "INTREVE": {
        "display": "利息收入",
        "type": DataTypes.DOUBLE,
        "field": "INTREVE"
    },
    "INTREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTREVE_YOY"
    },
    "COMMREVE": {
        "display": "手续费及佣金收入",
        "type": DataTypes.DOUBLE,
        "field": "COMMREVE"
    },
    "COMMREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMMREVE_YOY"
    },
    "TOTALOPERATEREVE": {
        "display": "营业总收入",
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEREVE"
    },
    "TOTALOPERATEREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEREVE_YOY"
    },
    "TOTALOPERATEEXP": {
        "display": "营业总成本",
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEEXP"
    },
    "TOTALOPERATEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEEXP_YOY"
    },
    "RDEXP": {
        "display": "研发费用",
        "type": DataTypes.DOUBLE,
        "field": "RDEXP"
    },
    "RDEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RDEXP_YOY"
    },
    "NETINDEMNITYEXP": {
        "display": "赔付支出净额",
        "type": DataTypes.DOUBLE,
        "field": "NETINDEMNITYEXP"
    },
    "NETINDEMNITYEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETINDEMNITYEXP_YOY"
    },
    "NETCONTACTRESERVE": {
        "display": "提取保险合同准备金净额",
        "type": DataTypes.DOUBLE,
        "field": "NETCONTACTRESERVE"
    },
    "NETCONTACTRESERVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETCONTACTRESERVE_YOY"
    },
    "SALEEXP": {
        "display": "销售费用",
        "type": DataTypes.DOUBLE,
        "field": "SALEEXP"
    },
    "SALEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SALEEXP_YOY"
    },
    "MANAGEEXP": {
        "display": "管理费用",
        "type": DataTypes.DOUBLE,
        "field": "MANAGEEXP"
    },
    "MANAGEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "MANAGEEXP_YOY"
    },
    "COMBINEDNETPROFITB": {
        "display": "被合并方在合并前实现利润",
        "type": DataTypes.DOUBLE,
        "field": "COMBINEDNETPROFITB"
    },
    "COMBINEDNETPROFITB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMBINEDNETPROFITB_YOY"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTDATETYPE",
        "unique": "compositeIndex"
    },
    "reportDate": {
        "type": DataTypes.STRING(10),
        "unique": "compositeIndex"
    }
}
    ,
      {
        sequelize: db,
        modelName: "lrb",
      }
    );
    module.exports = Lrb;
    
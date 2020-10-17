const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
    
    class Lrb extends Model {}
    Lrb.init(
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
    "SECURITYSHORTNAME": {
        "type": DataTypes.STRING(30),
        "field": "SECURITYSHORTNAME"
    },
    "REPORTTYPE": {
        "type": DataTypes.STRING(30),
        "field": "REPORTTYPE"
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
    "KCFJCXSYJLR": {
        "display": "扣除非经常性损益后的净利润",
        "type": DataTypes.STRING(30),
        "field": "KCFJCXSYJLR"
    },
    "KCFJCXSYJLR_YOY": {
        "type": DataTypes.STRING(30),
        "field": "KCFJCXSYJLR_YOY"
    },
    "OPERATEREVE": {
        "display": "营业收入",
        "type": DataTypes.STRING(30),
        "field": "OPERATEREVE"
    },
    "OPERATEREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OPERATEREVE_YOY"
    },
    "COMMNREVE": {
        "display": "手续费及佣金净收入",
        "type": DataTypes.STRING(30),
        "field": "COMMNREVE"
    },
    "COMMNREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "COMMNREVE_YOY"
    },
    "AGENTTRADESECURITY": {
        "display": "代理买卖证券款",
        "type": DataTypes.STRING(30),
        "field": "AGENTTRADESECURITY"
    },
    "AGENTTRADESECURITY_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AGENTTRADESECURITY_YOY"
    },
    "SECURITYUW": {
        "display": "证券承销业务净收入",
        "type": DataTypes.STRING(30),
        "field": "SECURITYUW"
    },
    "SECURITYUW_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SECURITYUW_YOY"
    },
    "CLIENTASSETMANAGE": {
        "display": "受托客户资产管理业务净收入",
        "type": DataTypes.STRING(30),
        "field": "CLIENTASSETMANAGE"
    },
    "CLIENTASSETMANAGE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "CLIENTASSETMANAGE_YOY"
    },
    "FINACONSULT": {
        "display": "财务顾问净收入",
        "type": DataTypes.STRING(30),
        "field": "FINACONSULT"
    },
    "FINACONSULT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FINACONSULT_YOY"
    },
    "SPONSOR": {
        "display": "保荐业务净收入",
        "type": DataTypes.STRING(30),
        "field": "SPONSOR"
    },
    "SPONSOR_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SPONSOR_YOY"
    },
    "FUNDMANAGE": {
        "display": "基金管理业务净收入",
        "type": DataTypes.STRING(30),
        "field": "FUNDMANAGE"
    },
    "FUNDMANAGE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FUNDMANAGE_YOY"
    },
    "FUNDSALE": {
        "display": "基金销售业务净收入",
        "type": DataTypes.STRING(30),
        "field": "FUNDSALE"
    },
    "FUNDSALE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FUNDSALE_YOY"
    },
    "SECURITYBROKER": {
        "display": "证券经纪业务净收入",
        "type": DataTypes.STRING(30),
        "field": "SECURITYBROKER"
    },
    "SECURITYBROKER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SECURITYBROKER_YOY"
    },
    "COMMNREVEOTHER": {
        "display": "手续费及佣金净收入其他项目",
        "type": DataTypes.STRING(30),
        "field": "COMMNREVEOTHER"
    },
    "COMMNREVEOTHER_YOY": {
        "type": DataTypes.STRING(30),
        "field": "COMMNREVEOTHER_YOY"
    },
    "INTNREVE": {
        "display": "利息净收入",
        "type": DataTypes.STRING(30),
        "field": "INTNREVE"
    },
    "INTNREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTNREVE_YOY"
    },
    "INVESTINCOME": {
        "display": "加:投资收益",
        "type": DataTypes.STRING(30),
        "field": "INVESTINCOME"
    },
    "INVESTINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVESTINCOME_YOY"
    },
    "INVESTJOINTINCOME": {
        "display": "其中:对联营企业和合营企业的投资收益/（损失）",
        "type": DataTypes.STRING(30),
        "field": "INVESTJOINTINCOME"
    },
    "INVESTJOINTINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INVESTJOINTINCOME_YOY"
    },
    "FVALUEINCOME": {
        "display": "公允价值变动损益",
        "type": DataTypes.STRING(30),
        "field": "FVALUEINCOME"
    },
    "FVALUEINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FVALUEINCOME_YOY"
    },
    "FVALUEOSALABLE": {
        "display": "其中:可供出售金融资产公允价值变动损益",
        "type": DataTypes.STRING(30),
        "field": "FVALUEOSALABLE"
    },
    "FVALUEOSALABLE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FVALUEOSALABLE_YOY"
    },
    "EXCHANGEINCOME": {
        "display": "汇兑损失",
        "type": DataTypes.STRING(30),
        "field": "EXCHANGEINCOME"
    },
    "EXCHANGEINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "EXCHANGEINCOME_YOY"
    },
    "OTHERREVE": {
        "display": "其他业务收入",
        "type": DataTypes.STRING(30),
        "field": "OTHERREVE"
    },
    "OTHERREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERREVE_YOY"
    },
    "OPERATEEXP": {
        "display": "营业支出",
        "type": DataTypes.STRING(30),
        "field": "OPERATEEXP"
    },
    "OPERATEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OPERATEEXP_YOY"
    },
    "OPERATETAX": {
        "display": "营业税金及附加",
        "type": DataTypes.STRING(30),
        "field": "OPERATETAX"
    },
    "OPERATETAX_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OPERATETAX_YOY"
    },
    "OPERATEMANAGEEXP": {
        "display": "业务及管理费",
        "type": DataTypes.STRING(30),
        "field": "OPERATEMANAGEEXP"
    },
    "OPERATEMANAGEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OPERATEMANAGEEXP_YOY"
    },
    "ASSETDEVALUELOSS": {
        "display": "资产减值损失",
        "type": DataTypes.STRING(30),
        "field": "ASSETDEVALUELOSS"
    },
    "ASSETDEVALUELOSS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "ASSETDEVALUELOSS_YOY"
    },
    "OTHEREXP": {
        "display": "其他业务成本",
        "type": DataTypes.STRING(30),
        "field": "OTHEREXP"
    },
    "OTHEREXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHEREXP_YOY"
    },
    "OPERATEPROFIT": {
        "display": "营业利润",
        "type": DataTypes.STRING(30),
        "field": "OPERATEPROFIT"
    },
    "OPERATEPROFIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OPERATEPROFIT_YOY"
    },
    "NONOPERATEREVE": {
        "display": "加:营业外收入",
        "type": DataTypes.STRING(30),
        "field": "NONOPERATEREVE"
    },
    "NONOPERATEREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONOPERATEREVE_YOY"
    },
    "NONLASSETREVE": {
        "display": "其中:非流动资产处置利得",
        "type": DataTypes.STRING(30),
        "field": "NONLASSETREVE"
    },
    "NONLASSETREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETREVE_YOY"
    },
    "NONOPERATEEXP": {
        "display": "减:营业外支出",
        "type": DataTypes.STRING(30),
        "field": "NONOPERATEEXP"
    },
    "NONOPERATEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONOPERATEEXP_YOY"
    },
    "NONLASSETNETLOSS": {
        "display": "其中:非流动资产处置净损失",
        "type": DataTypes.STRING(30),
        "field": "NONLASSETNETLOSS"
    },
    "NONLASSETNETLOSS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NONLASSETNETLOSS_YOY"
    },
    "SUMPROFIT": {
        "display": "利润总额",
        "type": DataTypes.STRING(30),
        "field": "SUMPROFIT"
    },
    "SUMPROFIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMPROFIT_YOY"
    },
    "INCOMETAX": {
        "display": "减:所得税",
        "type": DataTypes.STRING(30),
        "field": "INCOMETAX"
    },
    "INCOMETAX_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INCOMETAX_YOY"
    },
    "NETPROFIT": {
        "display": "净利润",
        "type": DataTypes.STRING(30),
        "field": "NETPROFIT"
    },
    "NETPROFIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NETPROFIT_YOY"
    },
    "PARENTNETPROFIT": {
        "display": "其中:归属于母公司股东的净利润",
        "type": DataTypes.STRING(30),
        "field": "PARENTNETPROFIT"
    },
    "PARENTNETPROFIT_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PARENTNETPROFIT_YOY"
    },
    "MINORITYINCOME": {
        "display": "少数股东损益",
        "type": DataTypes.STRING(30),
        "field": "MINORITYINCOME"
    },
    "MINORITYINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MINORITYINCOME_YOY"
    },
    "BASICEPS": {
        "display": "基本每股收益",
        "type": DataTypes.STRING(30),
        "field": "BASICEPS"
    },
    "BASICEPS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BASICEPS_YOY"
    },
    "DILUTEDEPS": {
        "display": "稀释每股收益",
        "type": DataTypes.STRING(30),
        "field": "DILUTEDEPS"
    },
    "DILUTEDEPS_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DILUTEDEPS_YOY"
    },
    "OTHERCINCOME": {
        "display": "其他综合收益",
        "type": DataTypes.STRING(30),
        "field": "OTHERCINCOME"
    },
    "OTHERCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "OTHERCINCOME_YOY"
    },
    "PARENTOTHERCINCOME": {
        "display": "归属于母公司股东的其他综合收益",
        "type": DataTypes.STRING(30),
        "field": "PARENTOTHERCINCOME"
    },
    "PARENTOTHERCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PARENTOTHERCINCOME_YOY"
    },
    "MINORITYOTHERCINCOME": {
        "display": "归属于少数股东的其他综合收益",
        "type": DataTypes.STRING(30),
        "field": "MINORITYOTHERCINCOME"
    },
    "MINORITYOTHERCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MINORITYOTHERCINCOME_YOY"
    },
    "SUMCINCOME": {
        "display": "综合收益总额",
        "type": DataTypes.STRING(30),
        "field": "SUMCINCOME"
    },
    "SUMCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SUMCINCOME_YOY"
    },
    "PARENTCINCOME": {
        "display": "归属于母公司股东的综合收益总额",
        "type": DataTypes.STRING(30),
        "field": "PARENTCINCOME"
    },
    "PARENTCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PARENTCINCOME_YOY"
    },
    "MINORITYCINCOME": {
        "display": "归属于少数股东的综合收益总额",
        "type": DataTypes.STRING(30),
        "field": "MINORITYCINCOME"
    },
    "MINORITYCINCOME_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MINORITYCINCOME_YOY"
    },
    "PREMIUMEARNED": {
        "display": "已赚保费",
        "type": DataTypes.STRING(30),
        "field": "PREMIUMEARNED"
    },
    "PREMIUMEARNED_YOY": {
        "type": DataTypes.STRING(30),
        "field": "PREMIUMEARNED_YOY"
    },
    "INSURREVE": {
        "display": "其中:保险业务收入",
        "type": DataTypes.STRING(30),
        "field": "INSURREVE"
    },
    "INSURREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INSURREVE_YOY"
    },
    "RIREVE": {
        "display": "分保费收入",
        "type": DataTypes.STRING(30),
        "field": "RIREVE"
    },
    "RIREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RIREVE_YOY"
    },
    "RIPREMIUM": {
        "display": "减:分出保费",
        "type": DataTypes.STRING(30),
        "field": "RIPREMIUM"
    },
    "RIPREMIUM_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RIPREMIUM_YOY"
    },
    "UNDUERESERVE": {
        "display": "提取未到期责任准备金",
        "type": DataTypes.STRING(30),
        "field": "UNDUERESERVE"
    },
    "UNDUERESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "UNDUERESERVE_YOY"
    },
    "BANKINTNREVE": {
        "display": "银行业务利息净收入",
        "type": DataTypes.STRING(30),
        "field": "BANKINTNREVE"
    },
    "BANKINTNREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BANKINTNREVE_YOY"
    },
    "BANKINTREVE": {
        "display": "其中:银行业务利息收入",
        "type": DataTypes.STRING(30),
        "field": "BANKINTREVE"
    },
    "BANKINTREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BANKINTREVE_YOY"
    },
    "BANKINTEXP": {
        "display": "银行业务利息支出",
        "type": DataTypes.STRING(30),
        "field": "BANKINTEXP"
    },
    "BANKINTEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "BANKINTEXP_YOY"
    },
    "NINSURCOMMNREVE": {
        "display": "非保险业务手续费及佣金净收入",
        "type": DataTypes.STRING(30),
        "field": "NINSURCOMMNREVE"
    },
    "NINSURCOMMNREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NINSURCOMMNREVE_YOY"
    },
    "NINSURCOMMREVE": {
        "display": "非保险业务手续费及佣金收入",
        "type": DataTypes.STRING(30),
        "field": "NINSURCOMMREVE"
    },
    "NINSURCOMMREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NINSURCOMMREVE_YOY"
    },
    "NINSURCOMMEXP": {
        "display": "非保险业务手续费及佣金支出",
        "type": DataTypes.STRING(30),
        "field": "NINSURCOMMEXP"
    },
    "NINSURCOMMEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NINSURCOMMEXP_YOY"
    },
    "SURRENDERPREMIUM": {
        "display": "退保金",
        "type": DataTypes.STRING(30),
        "field": "SURRENDERPREMIUM"
    },
    "SURRENDERPREMIUM_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SURRENDERPREMIUM_YOY"
    },
    "INDEMNITYEXP": {
        "display": "赔付支出",
        "type": DataTypes.STRING(30),
        "field": "INDEMNITYEXP"
    },
    "INDEMNITYEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INDEMNITYEXP_YOY"
    },
    "AMORTISEINDEMNITYEXP": {
        "display": "减:摊回赔付支出",
        "type": DataTypes.STRING(30),
        "field": "AMORTISEINDEMNITYEXP"
    },
    "AMORTISEINDEMNITYEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORTISEINDEMNITYEXP_YOY"
    },
    "DUTYRESERVE": {
        "display": "提取保险责任准备金",
        "type": DataTypes.STRING(30),
        "field": "DUTYRESERVE"
    },
    "DUTYRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "DUTYRESERVE_YOY"
    },
    "AMORTISEDUTYRESERVE": {
        "display": "减:摊回保险责任准备金",
        "type": DataTypes.STRING(30),
        "field": "AMORTISEDUTYRESERVE"
    },
    "AMORTISEDUTYRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORTISEDUTYRESERVE_YOY"
    },
    "POLICYDIVIEXP": {
        "display": "保单红利支出",
        "type": DataTypes.STRING(30),
        "field": "POLICYDIVIEXP"
    },
    "POLICYDIVIEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "POLICYDIVIEXP_YOY"
    },
    "RIEXP": {
        "display": "分保费用",
        "type": DataTypes.STRING(30),
        "field": "RIEXP"
    },
    "RIEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RIEXP_YOY"
    },
    "COMMEXP": {
        "display": "手续费及佣金支出",
        "type": DataTypes.STRING(30),
        "field": "COMMEXP"
    },
    "COMMEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "COMMEXP_YOY"
    },
    "AMORTISERIEXP": {
        "display": "减:摊回分保费用",
        "type": DataTypes.STRING(30),
        "field": "AMORTISERIEXP"
    },
    "AMORTISERIEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "AMORTISERIEXP_YOY"
    },
    "INTEXP": {
        "display": "利息支出",
        "type": DataTypes.STRING(30),
        "field": "INTEXP"
    },
    "INTEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTEXP_YOY"
    },
    "FINANCEEXP": {
        "display": "财务费用",
        "type": DataTypes.STRING(30),
        "field": "FINANCEEXP"
    },
    "FINANCEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "FINANCEEXP_YOY"
    },
    "INTREVE": {
        "display": "利息收入",
        "type": DataTypes.STRING(30),
        "field": "INTREVE"
    },
    "INTREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "INTREVE_YOY"
    },
    "COMMREVE": {
        "display": "手续费及佣金收入",
        "type": DataTypes.STRING(30),
        "field": "COMMREVE"
    },
    "COMMREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "COMMREVE_YOY"
    },
    "TOTALOPERATEREVE": {
        "display": "营业总收入",
        "type": DataTypes.STRING(30),
        "field": "TOTALOPERATEREVE"
    },
    "TOTALOPERATEREVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TOTALOPERATEREVE_YOY"
    },
    "TOTALOPERATEEXP": {
        "display": "营业总成本",
        "type": DataTypes.STRING(30),
        "field": "TOTALOPERATEEXP"
    },
    "TOTALOPERATEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "TOTALOPERATEEXP_YOY"
    },
    "RDEXP": {
        "display": "研发费用",
        "type": DataTypes.STRING(30),
        "field": "RDEXP"
    },
    "RDEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "RDEXP_YOY"
    },
    "NETINDEMNITYEXP": {
        "display": "赔付支出净额",
        "type": DataTypes.STRING(30),
        "field": "NETINDEMNITYEXP"
    },
    "NETINDEMNITYEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NETINDEMNITYEXP_YOY"
    },
    "NETCONTACTRESERVE": {
        "display": "提取保险合同准备金净额",
        "type": DataTypes.STRING(30),
        "field": "NETCONTACTRESERVE"
    },
    "NETCONTACTRESERVE_YOY": {
        "type": DataTypes.STRING(30),
        "field": "NETCONTACTRESERVE_YOY"
    },
    "SALEEXP": {
        "display": "销售费用",
        "type": DataTypes.STRING(30),
        "field": "SALEEXP"
    },
    "SALEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "SALEEXP_YOY"
    },
    "MANAGEEXP": {
        "display": "管理费用",
        "type": DataTypes.STRING(30),
        "field": "MANAGEEXP"
    },
    "MANAGEEXP_YOY": {
        "type": DataTypes.STRING(30),
        "field": "MANAGEEXP_YOY"
    },
    "COMBINEDNETPROFITB": {
        "display": "被合并方在合并前实现利润",
        "type": DataTypes.STRING(30),
        "field": "COMBINEDNETPROFITB"
    },
    "COMBINEDNETPROFITB_YOY": {
        "type": DataTypes.STRING(30),
        "field": "COMBINEDNETPROFITB_YOY"
    }
}
    ,
      {
        sequelize: db,
        modelName: "lrb",
      }
    );
    module.exports = Lrb;
    
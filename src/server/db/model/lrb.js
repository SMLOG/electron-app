const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*lrb*/
    class Lrb extends Model {}
    Lrb.init(
      {
    "lrb_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECURITYCODE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITYCODE"
    },
    "SECURITYSHORTNAME": {
        "type": DataTypes.STRING(10),
        "field": "SECURITYSHORTNAME"
    },
    "REPORTTYPE": {
        "type": DataTypes.DOUBLE,
        "unique": "index_unique",
        "field": "REPORTTYPE"
    },
    "TYPE": {
        "type": DataTypes.DOUBLE,
        "field": "TYPE"
    },
    "REPORTDATE": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "REPORTDATE"
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
    "TOTALOPERATEREVE": {
        "display": "营业总收入",
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEREVE"
    },
    "TOTALOPERATEREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEREVE_YOY"
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
    "INTREVE": {
        "display": "利息收入",
        "type": DataTypes.DOUBLE,
        "field": "INTREVE"
    },
    "INTREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTREVE_YOY"
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
    "COMMREVE": {
        "display": "手续费及佣金收入",
        "type": DataTypes.DOUBLE,
        "field": "COMMREVE"
    },
    "COMMREVE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMMREVE_YOY"
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
    "TOTALOPERATEEXP": {
        "display": "营业总成本",
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEEXP"
    },
    "TOTALOPERATEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TOTALOPERATEEXP_YOY"
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
    "INTEXP": {
        "display": "利息支出",
        "type": DataTypes.DOUBLE,
        "field": "INTEXP"
    },
    "INTEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTEXP_YOY"
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
    "RDEXP": {
        "display": "研发费用",
        "type": DataTypes.DOUBLE,
        "field": "RDEXP"
    },
    "RDEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "RDEXP_YOY"
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
    "OTHEREXP": {
        "display": "其他业务成本",
        "type": DataTypes.DOUBLE,
        "field": "OTHEREXP"
    },
    "OTHEREXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEREXP_YOY"
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
    "FINANCEEXP": {
        "display": "财务费用",
        "type": DataTypes.DOUBLE,
        "field": "FINANCEEXP"
    },
    "FINANCEEXP_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FINANCEEXP_YOY"
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
    "FVALUEINCOME": {
        "display": "公允价值变动损益",
        "type": DataTypes.DOUBLE,
        "field": "FVALUEINCOME"
    },
    "FVALUEINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "FVALUEINCOME_YOY"
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
    "EXCHANGEINCOME": {
        "display": "汇兑损失",
        "type": DataTypes.DOUBLE,
        "field": "EXCHANGEINCOME"
    },
    "EXCHANGEINCOME_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "EXCHANGEINCOME_YOY"
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
    "COMBINEDNETPROFITB": {
        "display": "被合并方在合并前实现利润",
        "type": DataTypes.DOUBLE,
        "field": "COMBINEDNETPROFITB"
    },
    "COMBINEDNETPROFITB_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "COMBINEDNETPROFITB_YOY"
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
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTDATETYPE"
    },
    "typename": {
        "type": DataTypes.STRING(10),
        "field": "typename"
    },
    "RREPORTDATE": {
        "type": DataTypes.STRING(10),
        "field": "RREPORTDATE"
    },
    "PREPORTDATE": {
        "type": DataTypes.STRING(10),
        "field": "PREPORTDATE"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "lrb",
      }
    );
    module.exports = Lrb;
    
const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*xjllb*/
    class Xjllb extends Model {}
    Xjllb.init(
      {
    "xjllb_id": {
        "type": DataTypes.INTEGER,
        "autoIncrement": true,
        "primaryKey": true
    },
    "SECURITYCODE": {
        "type": DataTypes.STRING(10),
        "field": "SECURITYCODE"
    },
    "REPORTTYPE": {
        "type": DataTypes.DOUBLE,
        "unique": "index_unique",
        "field": "REPORTTYPE"
    },
    "REPORTDATETYPE": {
        "type": DataTypes.DOUBLE,
        "field": "REPORTDATETYPE"
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
    "SALEGOODSSERVICEREC": {
        "display": "销售商品、提供劳务收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "SALEGOODSSERVICEREC"
    },
    "NIDEPOSIT": {
        "display": "客户存款和同业存放款项净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIDEPOSIT"
    },
    "NIBORROWFROMCBANK": {
        "display": "向中央银行借款净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIBORROWFROMCBANK"
    },
    "NIBORROWFROMFI": {
        "display": "向其他金融机构拆入资金净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIBORROWFROMFI"
    },
    "PREMIUMREC": {
        "display": "收到原保险合同保费取得的现金",
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMREC"
    },
    "NETRIREC": {
        "display": "收到再保险业务现金净额",
        "type": DataTypes.DOUBLE,
        "field": "NETRIREC"
    },
    "NIINSUREDDEPOSITINV": {
        "display": "保户储金及投资款净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIINSUREDDEPOSITINV"
    },
    "NIDISPTRADEFASSET": {
        "display": "处置交易性金融资产净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIDISPTRADEFASSET"
    },
    "INTANDCOMMREC": {
        "display": "收取利息、手续费及佣金的现金",
        "type": DataTypes.DOUBLE,
        "field": "INTANDCOMMREC"
    },
    "NIBORROWFUND": {
        "display": "拆入资金净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIBORROWFUND"
    },
    "NDLOANADVANCES": {
        "display": "发放贷款及垫款的净减少额",
        "type": DataTypes.DOUBLE,
        "field": "NDLOANADVANCES"
    },
    "NIBUYBACKFUND": {
        "display": "回购业务资金净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIBUYBACKFUND"
    },
    "TAXRETURNREC": {
        "display": "收到的税收返还",
        "type": DataTypes.DOUBLE,
        "field": "TAXRETURNREC"
    },
    "OTHEROPERATEREC": {
        "display": "收到其他与经营活动有关的现金",
        "type": DataTypes.DOUBLE,
        "field": "OTHEROPERATEREC"
    },
    "SUMOPERATEFLOWIN": {
        "display": "经营活动现金流入小计",
        "type": DataTypes.DOUBLE,
        "field": "SUMOPERATEFLOWIN"
    },
    "BUYGOODSSERVICEPAY": {
        "display": "购买商品、接受劳务支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "BUYGOODSSERVICEPAY"
    },
    "NILOANADVANCES": {
        "display": "发放贷款及垫款净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NILOANADVANCES"
    },
    "NIDEPOSITINCBANKFI": {
        "display": "存放中央银行和同业款项净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIDEPOSITINCBANKFI"
    },
    "INDEMNITYPAY": {
        "display": "支付原保险合同赔付等款项的现金",
        "type": DataTypes.DOUBLE,
        "field": "INDEMNITYPAY"
    },
    "INTANDCOMMPAY": {
        "display": "支付利息、手续费及佣金的现金",
        "type": DataTypes.DOUBLE,
        "field": "INTANDCOMMPAY"
    },
    "DIVIPAY": {
        "display": "支付保单红利的现金",
        "type": DataTypes.DOUBLE,
        "field": "DIVIPAY"
    },
    "EMPLOYEEPAY": {
        "display": "支付给职工以及为职工支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "EMPLOYEEPAY"
    },
    "TAXPAY": {
        "display": "支付的各项税费",
        "type": DataTypes.DOUBLE,
        "field": "TAXPAY"
    },
    "OTHEROPERATEPAY": {
        "display": "支付其他与经营活动有关的现金",
        "type": DataTypes.DOUBLE,
        "field": "OTHEROPERATEPAY"
    },
    "SUMOPERATEFLOWOUT": {
        "display": "经营活动现金流出小计",
        "type": DataTypes.DOUBLE,
        "field": "SUMOPERATEFLOWOUT"
    },
    "NETOPERATECASHFLOW": {
        "display": "经营活动产生的现金流量净额",
        "type": DataTypes.DOUBLE,
        "field": "NETOPERATECASHFLOW"
    },
    "DISPOSALINVREC": {
        "display": "收回投资收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "DISPOSALINVREC"
    },
    "INVINCOMEREC": {
        "display": "取得投资收益收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "INVINCOMEREC"
    },
    "DISPFILASSETREC": {
        "display": "处置固定资产、无形资产和其他长期资产收回的现金净额",
        "type": DataTypes.DOUBLE,
        "field": "DISPFILASSETREC"
    },
    "DISPSUBSIDIARYREC": {
        "display": "处置子公司及其他营业单位收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "DISPSUBSIDIARYREC"
    },
    "REDUCEPLEDGETDEPOSIT": {
        "display": "减少质押和定期存款所收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "REDUCEPLEDGETDEPOSIT"
    },
    "OTHERINVREC": {
        "display": "收到的其他与投资活动有关的现金",
        "type": DataTypes.DOUBLE,
        "field": "OTHERINVREC"
    },
    "SUMINVFLOWIN": {
        "display": "投资活动现金流入小计",
        "type": DataTypes.DOUBLE,
        "field": "SUMINVFLOWIN"
    },
    "BUYFILASSETPAY": {
        "display": "购建固定资产、无形资产和其他长期资产所支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "BUYFILASSETPAY"
    },
    "INVPAY": {
        "display": "投资支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "INVPAY"
    },
    "NIPLEDGELOAN": {
        "display": "质押贷款净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NIPLEDGELOAN"
    },
    "GETSUBSIDIARYPAY": {
        "display": "取得子公司及其他营业单位支付的现金净额",
        "type": DataTypes.DOUBLE,
        "field": "GETSUBSIDIARYPAY"
    },
    "ADDPLEDGETDEPOSIT": {
        "display": "增加质押和定期存款所支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "ADDPLEDGETDEPOSIT"
    },
    "OTHERINVPAY": {
        "display": "支付其他与投资活动有关的现金",
        "type": DataTypes.DOUBLE,
        "field": "OTHERINVPAY"
    },
    "SUMINVFLOWOUT": {
        "display": "投资活动现金流出小计",
        "type": DataTypes.DOUBLE,
        "field": "SUMINVFLOWOUT"
    },
    "NETINVCASHFLOW": {
        "display": "投资活动产生的现金流量净额",
        "type": DataTypes.DOUBLE,
        "field": "NETINVCASHFLOW"
    },
    "ACCEPTINVREC": {
        "display": "吸收投资收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "ACCEPTINVREC"
    },
    "SUBSIDIARYACCEPT": {
        "display": "子公司吸收少数股东投资收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDIARYACCEPT"
    },
    "LOANREC": {
        "display": "取得借款收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "LOANREC"
    },
    "ISSUEBONDREC": {
        "display": "发行债券收到的现金",
        "type": DataTypes.DOUBLE,
        "field": "ISSUEBONDREC"
    },
    "OTHERFINAREC": {
        "display": "收到的其他与筹资活动有关的现金",
        "type": DataTypes.DOUBLE,
        "field": "OTHERFINAREC"
    },
    "SUMFINAFLOWIN": {
        "display": "筹资活动现金流入小计",
        "type": DataTypes.DOUBLE,
        "field": "SUMFINAFLOWIN"
    },
    "REPAYDEBTPAY": {
        "display": "偿还债务所支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "REPAYDEBTPAY"
    },
    "DIVIPROFITORINTPAY": {
        "display": "分配股利、利润或偿付利息支付的现金",
        "type": DataTypes.DOUBLE,
        "field": "DIVIPROFITORINTPAY"
    },
    "SUBSIDIARYPAY": {
        "display": "子公司支付给少数股东的股利、利润",
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDIARYPAY"
    },
    "BUYSUBSIDIARYPAY": {
        "display": "收购子公司及其他营业单位支付的现金净额",
        "type": DataTypes.DOUBLE,
        "field": "BUYSUBSIDIARYPAY"
    },
    "OTHERFINAPAY": {
        "display": "支付的其他与筹资活动有关的现金",
        "type": DataTypes.DOUBLE,
        "field": "OTHERFINAPAY"
    },
    "SUBSIDIARYREDUCTCAPITAL": {
        "display": "子公司减资支付给少数股东的现金",
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDIARYREDUCTCAPITAL"
    },
    "SUMFINAFLOWOUT": {
        "display": "筹资活动现金流出小计",
        "type": DataTypes.DOUBLE,
        "field": "SUMFINAFLOWOUT"
    },
    "NETFINACASHFLOW": {
        "display": "筹资活动产生的现金流量净额",
        "type": DataTypes.DOUBLE,
        "field": "NETFINACASHFLOW"
    },
    "EFFECTEXCHANGERATE": {
        "display": "汇率变动对现金及现金等价物的影响",
        "type": DataTypes.DOUBLE,
        "field": "EFFECTEXCHANGERATE"
    },
    "NICASHEQUI": {
        "display": "现金及现金等价物净增加额",
        "type": DataTypes.DOUBLE,
        "field": "NICASHEQUI"
    },
    "CASHEQUIBEGINNING": {
        "display": "加:期初现金及现金等价物余额",
        "type": DataTypes.DOUBLE,
        "field": "CASHEQUIBEGINNING"
    },
    "CASHEQUIENDING": {
        "display": "期末现金及现金等价物余额",
        "type": DataTypes.DOUBLE,
        "field": "CASHEQUIENDING"
    },
    "SALEGOODSSERVICEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SALEGOODSSERVICEREC_YOY"
    },
    "NIDEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIDEPOSIT_YOY"
    },
    "NIBORROWFROMCBANK_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIBORROWFROMCBANK_YOY"
    },
    "NIBORROWFROMFI_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIBORROWFROMFI_YOY"
    },
    "PREMIUMREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "PREMIUMREC_YOY"
    },
    "NETRIREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETRIREC_YOY"
    },
    "NIINSUREDDEPOSITINV_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIINSUREDDEPOSITINV_YOY"
    },
    "NIDISPTRADEFASSET_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIDISPTRADEFASSET_YOY"
    },
    "INTANDCOMMREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTANDCOMMREC_YOY"
    },
    "NIBORROWFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIBORROWFUND_YOY"
    },
    "NDLOANADVANCES_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NDLOANADVANCES_YOY"
    },
    "NIBUYBACKFUND_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIBUYBACKFUND_YOY"
    },
    "TAXRETURNREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TAXRETURNREC_YOY"
    },
    "OTHEROPERATEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEROPERATEREC_YOY"
    },
    "SUMOPERATEFLOWIN_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMOPERATEFLOWIN_YOY"
    },
    "BUYGOODSSERVICEPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BUYGOODSSERVICEPAY_YOY"
    },
    "NILOANADVANCES_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NILOANADVANCES_YOY"
    },
    "NIDEPOSITINCBANKFI_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIDEPOSITINCBANKFI_YOY"
    },
    "INDEMNITYPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INDEMNITYPAY_YOY"
    },
    "INTANDCOMMPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INTANDCOMMPAY_YOY"
    },
    "DIVIPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DIVIPAY_YOY"
    },
    "EMPLOYEEPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "EMPLOYEEPAY_YOY"
    },
    "TAXPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "TAXPAY_YOY"
    },
    "OTHEROPERATEPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHEROPERATEPAY_YOY"
    },
    "SUMOPERATEFLOWOUT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMOPERATEFLOWOUT_YOY"
    },
    "NETOPERATECASHFLOW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETOPERATECASHFLOW_YOY"
    },
    "DISPOSALINVREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DISPOSALINVREC_YOY"
    },
    "INVINCOMEREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVINCOMEREC_YOY"
    },
    "DISPFILASSETREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DISPFILASSETREC_YOY"
    },
    "DISPSUBSIDIARYREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DISPSUBSIDIARYREC_YOY"
    },
    "REDUCEPLEDGETDEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "REDUCEPLEDGETDEPOSIT_YOY"
    },
    "OTHERINVREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERINVREC_YOY"
    },
    "SUMINVFLOWIN_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMINVFLOWIN_YOY"
    },
    "BUYFILASSETPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BUYFILASSETPAY_YOY"
    },
    "INVPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "INVPAY_YOY"
    },
    "NIPLEDGELOAN_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NIPLEDGELOAN_YOY"
    },
    "GETSUBSIDIARYPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "GETSUBSIDIARYPAY_YOY"
    },
    "ADDPLEDGETDEPOSIT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ADDPLEDGETDEPOSIT_YOY"
    },
    "OTHERINVPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERINVPAY_YOY"
    },
    "SUMINVFLOWOUT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMINVFLOWOUT_YOY"
    },
    "NETINVCASHFLOW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETINVCASHFLOW_YOY"
    },
    "ACCEPTINVREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ACCEPTINVREC_YOY"
    },
    "SUBSIDIARYACCEPT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDIARYACCEPT_YOY"
    },
    "LOANREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "LOANREC_YOY"
    },
    "ISSUEBONDREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "ISSUEBONDREC_YOY"
    },
    "OTHERFINAREC_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERFINAREC_YOY"
    },
    "SUMFINAFLOWIN_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMFINAFLOWIN_YOY"
    },
    "REPAYDEBTPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "REPAYDEBTPAY_YOY"
    },
    "DIVIPROFITORINTPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "DIVIPROFITORINTPAY_YOY"
    },
    "SUBSIDIARYPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDIARYPAY_YOY"
    },
    "BUYSUBSIDIARYPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "BUYSUBSIDIARYPAY_YOY"
    },
    "OTHERFINAPAY_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "OTHERFINAPAY_YOY"
    },
    "SUBSIDIARYREDUCTCAPITAL_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUBSIDIARYREDUCTCAPITAL_YOY"
    },
    "SUMFINAFLOWOUT_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "SUMFINAFLOWOUT_YOY"
    },
    "NETFINACASHFLOW_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NETFINACASHFLOW_YOY"
    },
    "EFFECTEXCHANGERATE_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "EFFECTEXCHANGERATE_YOY"
    },
    "NICASHEQUI_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "NICASHEQUI_YOY"
    },
    "CASHEQUIBEGINNING_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CASHEQUIBEGINNING_YOY"
    },
    "CASHEQUIENDING_YOY": {
        "type": DataTypes.DOUBLE,
        "field": "CASHEQUIENDING_YOY"
    },
    "code": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "code"
    },
    "typename": {
        "type": DataTypes.STRING(10),
        "field": "typename"
    },
    "RREPORTDATE": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "RREPORTDATE"
    },
    "PREPORTDATE": {
        "type": DataTypes.STRING(10),
        "unique": "index_unique",
        "field": "PREPORTDATE"
    }
}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "xjllb",
      }
    );
    module.exports = Xjllb;
    
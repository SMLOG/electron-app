const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");

class xjllb extends Model {}
Profit.init(
  {
    id: {
      type: "DataTypes.INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    SECURITYCODE: {
      type: "DataTypes.STRING(30)",
      field: "SECURITYCODE",
      unique: "compositeIndex",
    },
    REPORTTYPE: {
      type: "DataTypes.STRING(30)",
      field: "REPORTTYPE",
    },
    REPORTDATETYPE: {
      type: "DataTypes.STRING(30)",
      field: "REPORTDATETYPE",
    },
    TYPE: {
      type: "DataTypes.STRING(30)",
      field: "TYPE",
    },
    REPORTDATE: {
      type: "DataTypes.STRING(30)",
      field: "REPORTDATE",
      unique: "compositeIndex",
    },
    CURRENCY: {
      type: "DataTypes.STRING(30)",
      field: "CURRENCY",
    },
    NIDISPTRADEFASSET: {
      display: "处置交易性金融资产净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIDISPTRADEFASSET",
    },
    NIOTHERFINAINSTRU: {
      display: "购买、处置或发行其他金融工具净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIOTHERFINAINSTRU",
    },
    INTANDCOMMREC: {
      display: "收取利息、手续费及佣金的现金",
      type: "DataTypes.STRING(30)",
      field: "INTANDCOMMREC",
    },
    UWSECURITYREC: {
      display: "承销证券收到的现金净额",
      type: "DataTypes.STRING(30)",
      field: "UWSECURITYREC",
    },
    NIBORROWFUND: {
      display: "拆入资金净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBORROWFUND",
    },
    AGENTTRADESECURITYREC: {
      display: "代理买卖证券收到的现金净额",
      type: "DataTypes.STRING(30)",
      field: "AGENTTRADESECURITYREC",
    },
    BUYSELLBACKFASSETREC: {
      display: "收到买入返售金融资产现金净额",
      type: "DataTypes.STRING(30)",
      field: "BUYSELLBACKFASSETREC",
    },
    AGENTUWSECURITYREC: {
      display: "代理承销证券收到的现金净额",
      type: "DataTypes.STRING(30)",
      field: "AGENTUWSECURITYREC",
    },
    NIBUYBACKFUND: {
      display: "回购业务资金净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBUYBACKFUND",
    },
    NITRADESETTLEMENT: {
      display: "客户交易结算资金增加",
      type: "DataTypes.STRING(30)",
      field: "NITRADESETTLEMENT",
    },
    NIDIRECTINV: {
      display: "直接投资经营资金增加",
      type: "DataTypes.STRING(30)",
      field: "NIDIRECTINV",
    },
    TAXRETURNREC: {
      display: "收到的税收返还",
      type: "DataTypes.STRING(30)",
      field: "TAXRETURNREC",
    },
    OTHEROPERATEREC: {
      display: "收到其他与经营活动有关的现金",
      type: "DataTypes.STRING(30)",
      field: "OTHEROPERATEREC",
    },
    SUMOPERATEFLOWIN: {
      display: "经营活动现金流入小计",
      type: "DataTypes.STRING(30)",
      field: "SUMOPERATEFLOWIN",
    },
    BUYSELLBACKFASSETPAY: {
      display: "支付买入返售金融资产现金净额",
      type: "DataTypes.STRING(30)",
      field: "BUYSELLBACKFASSETPAY",
    },
    NDDISPTRADEFASSET: {
      display: "处置交易性金融资产的净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDDISPTRADEFASSET",
    },
    NDOTHERFINAINSTR: {
      display: "购买、处置或发行其他金融工具净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDOTHERFINAINSTR",
    },
    INTANDCOMMPAY: {
      display: "支付利息、手续费及佣金的现金",
      type: "DataTypes.STRING(30)",
      field: "INTANDCOMMPAY",
    },
    NDBORROWFUND: {
      display: "其中:拆入资金净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDBORROWFUND",
    },
    EMPLOYEEPAY: {
      display: "支付给职工以及为职工支付的现金",
      type: "DataTypes.STRING(30)",
      field: "EMPLOYEEPAY",
    },
    TAXPAY: {
      display: "支付的各项税费",
      type: "DataTypes.STRING(30)",
      field: "TAXPAY",
    },
    NDTRADESETTLEMENT: {
      display: "客户交易结算资金减少",
      type: "DataTypes.STRING(30)",
      field: "NDTRADESETTLEMENT",
    },
    NDDIRECTINV: {
      display: "直接投资经营资金减少",
      type: "DataTypes.STRING(30)",
      field: "NDDIRECTINV",
    },
    NILENDFUND: {
      display: "银行业务及证券业务拆借资金净增加额",
      type: "DataTypes.STRING(30)",
      field: "NILENDFUND",
    },
    NDBUYBACKFUND: {
      display: "回购业务资金净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDBUYBACKFUND",
    },
    AGENTTRADESECURITYPAY: {
      display: "代理买卖证券支付的现金净额（净减少额）",
      type: "DataTypes.STRING(30)",
      field: "AGENTTRADESECURITYPAY",
    },
    OTHEROPERATEPAY: {
      display: "支付其他与经营活动有关的现金",
      type: "DataTypes.STRING(30)",
      field: "OTHEROPERATEPAY",
    },
    SUMOPERATEFLOWOUT: {
      display: "经营活动现金流出小计",
      type: "DataTypes.STRING(30)",
      field: "SUMOPERATEFLOWOUT",
    },
    NETOPERATECASHFLOW: {
      display: "经营活动产生的现金流量净额",
      type: "DataTypes.STRING(30)",
      field: "NETOPERATECASHFLOW",
    },
    DISPOSALINVREC: {
      display: "收回投资收到的现金",
      type: "DataTypes.STRING(30)",
      field: "DISPOSALINVREC",
    },
    NIDISPSALEABLEFASSET: {
      display: "处置可供出售金融资产净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIDISPSALEABLEFASSET",
    },
    INVINCOMEREC: {
      display: "取得投资收益收到的现金",
      type: "DataTypes.STRING(30)",
      field: "INVINCOMEREC",
    },
    DISPFILASSETREC: {
      display: "处置固定资产、无形资产和其他长期资产收回的现金净额",
      type: "DataTypes.STRING(30)",
      field: "DISPFILASSETREC",
    },
    DISPSUBSIDIARYREC: {
      display: "处置子公司及其他营业单位收到的现金",
      type: "DataTypes.STRING(30)",
      field: "DISPSUBSIDIARYREC",
    },
    OTHERINVREC: {
      display: "收到的其他与投资活动有关的现金",
      type: "DataTypes.STRING(30)",
      field: "OTHERINVREC",
    },
    SUMINVFLOWIN: {
      display: "投资活动现金流入小计",
      type: "DataTypes.STRING(30)",
      field: "SUMINVFLOWIN",
    },
    INVPAY: {
      display: "投资支付的现金",
      type: "DataTypes.STRING(30)",
      field: "INVPAY",
    },
    NDDISPSALEABLEFASSET: {
      display: "处置可供出售金融资产净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDDISPSALEABLEFASSET",
    },
    BUYFILASSETPAY: {
      display: "购建固定资产、无形资产和其他长期资产所支付的现金",
      type: "DataTypes.STRING(30)",
      field: "BUYFILASSETPAY",
    },
    GETSUBSIDIARYPAY: {
      display: "取得子公司及其他营业单位支付的现金净额",
      type: "DataTypes.STRING(30)",
      field: "GETSUBSIDIARYPAY",
    },
    OTHERINVPAY: {
      display: "支付其他与投资活动有关的现金",
      type: "DataTypes.STRING(30)",
      field: "OTHERINVPAY",
    },
    SUMINVFLOWOUT: {
      display: "投资活动现金流出小计",
      type: "DataTypes.STRING(30)",
      field: "SUMINVFLOWOUT",
    },
    NETINVCASHFLOW: {
      display: "投资活动产生的现金流量净额",
      type: "DataTypes.STRING(30)",
      field: "NETINVCASHFLOW",
    },
    ACCEPTINVREC: {
      display: "吸收投资收到的现金",
      type: "DataTypes.STRING(30)",
      field: "ACCEPTINVREC",
    },
    SUBSIDIARYACCEPT: {
      display: "子公司吸收少数股东投资收到的现金",
      type: "DataTypes.STRING(30)",
      field: "SUBSIDIARYACCEPT",
    },
    LOANREC: {
      display: "取得借款收到的现金",
      type: "DataTypes.STRING(30)",
      field: "LOANREC",
    },
    ISSUEBONDREC: {
      display: "发行债券收到的现金",
      type: "DataTypes.STRING(30)",
      field: "ISSUEBONDREC",
    },
    OTHERFINAREC: {
      display: "收到的其他与筹资活动有关的现金",
      type: "DataTypes.STRING(30)",
      field: "OTHERFINAREC",
    },
    SUMFINAFLOWIN: {
      display: "筹资活动现金流入小计",
      type: "DataTypes.STRING(30)",
      field: "SUMFINAFLOWIN",
    },
    REPAYDEBTPAY: {
      display: "偿还债务所支付的现金",
      type: "DataTypes.STRING(30)",
      field: "REPAYDEBTPAY",
    },
    DIVIPROFITORINTPAY: {
      display: "分配股利、利润或偿付利息支付的现金",
      type: "DataTypes.STRING(30)",
      field: "DIVIPROFITORINTPAY",
    },
    SUBSIDIARYPAY: {
      display: "子公司支付给少数股东的股利、利润",
      type: "DataTypes.STRING(30)",
      field: "SUBSIDIARYPAY",
    },
    OTHERFINAPAY: {
      display: "支付的其他与筹资活动有关的现金",
      type: "DataTypes.STRING(30)",
      field: "OTHERFINAPAY",
    },
    SUMFINAFLOWOUT: {
      display: "筹资活动现金流出小计",
      type: "DataTypes.STRING(30)",
      field: "SUMFINAFLOWOUT",
    },
    NETFINACASHFLOW: {
      display: "筹资活动产生的现金流量净额",
      type: "DataTypes.STRING(30)",
      field: "NETFINACASHFLOW",
    },
    EFFECTEXCHANGERATE: {
      display: "汇率变动对现金及现金等价物的影响",
      type: "DataTypes.STRING(30)",
      field: "EFFECTEXCHANGERATE",
    },
    NICASHEQUI: {
      display: "现金及现金等价物净增加额",
      type: "DataTypes.STRING(30)",
      field: "NICASHEQUI",
    },
    CASHEQUIBEGINNING: {
      display: "加:期初现金及现金等价物余额",
      type: "DataTypes.STRING(30)",
      field: "CASHEQUIBEGINNING",
    },
    CASHEQUIENDING: {
      display: "期末现金及现金等价物余额",
      type: "DataTypes.STRING(30)",
      field: "CASHEQUIENDING",
    },
    NIDISPTRADEFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDISPTRADEFASSET_YOY",
    },
    NIOTHERFINAINSTRU_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIOTHERFINAINSTRU_YOY",
    },
    INTANDCOMMREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INTANDCOMMREC_YOY",
    },
    UWSECURITYREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "UWSECURITYREC_YOY",
    },
    NIBORROWFUND_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBORROWFUND_YOY",
    },
    AGENTTRADESECURITYREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "AGENTTRADESECURITYREC_YOY",
    },
    BUYSELLBACKFASSETREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BUYSELLBACKFASSETREC_YOY",
    },
    AGENTUWSECURITYREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "AGENTUWSECURITYREC_YOY",
    },
    NIBUYBACKFUND_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBUYBACKFUND_YOY",
    },
    NITRADESETTLEMENT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NITRADESETTLEMENT_YOY",
    },
    NIDIRECTINV_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDIRECTINV_YOY",
    },
    TAXRETURNREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "TAXRETURNREC_YOY",
    },
    OTHEROPERATEREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "OTHEROPERATEREC_YOY",
    },
    SUMOPERATEFLOWIN_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUMOPERATEFLOWIN_YOY",
    },
    BUYSELLBACKFASSETPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BUYSELLBACKFASSETPAY_YOY",
    },
    NDDISPTRADEFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDDISPTRADEFASSET_YOY",
    },
    NDOTHERFINAINSTR_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDOTHERFINAINSTR_YOY",
    },
    INTANDCOMMPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INTANDCOMMPAY_YOY",
    },
    NDBORROWFUND_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDBORROWFUND_YOY",
    },
    EMPLOYEEPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "EMPLOYEEPAY_YOY",
    },
    TAXPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "TAXPAY_YOY",
    },
    NDTRADESETTLEMENT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDTRADESETTLEMENT_YOY",
    },
    NDDIRECTINV_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDDIRECTINV_YOY",
    },
    NILENDFUND_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NILENDFUND_YOY",
    },
    NDBUYBACKFUND_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDBUYBACKFUND_YOY",
    },
    AGENTTRADESECURITYPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "AGENTTRADESECURITYPAY_YOY",
    },
    OTHEROPERATEPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "OTHEROPERATEPAY_YOY",
    },
    SUMOPERATEFLOWOUT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUMOPERATEFLOWOUT_YOY",
    },
    NETOPERATECASHFLOW_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETOPERATECASHFLOW_YOY",
    },
    DISPOSALINVREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DISPOSALINVREC_YOY",
    },
    NIDISPSALEABLEFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDISPSALEABLEFASSET_YOY",
    },
    INVINCOMEREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INVINCOMEREC_YOY",
    },
    DISPFILASSETREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DISPFILASSETREC_YOY",
    },
    DISPSUBSIDIARYREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DISPSUBSIDIARYREC_YOY",
    },
    OTHERINVREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "OTHERINVREC_YOY",
    },
    SUMINVFLOWIN_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUMINVFLOWIN_YOY",
    },
    INVPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INVPAY_YOY",
    },
    NDDISPSALEABLEFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDDISPSALEABLEFASSET_YOY",
    },
    BUYFILASSETPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BUYFILASSETPAY_YOY",
    },
    GETSUBSIDIARYPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "GETSUBSIDIARYPAY_YOY",
    },
    OTHERINVPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "OTHERINVPAY_YOY",
    },
    SUMINVFLOWOUT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUMINVFLOWOUT_YOY",
    },
    NETINVCASHFLOW_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETINVCASHFLOW_YOY",
    },
    ACCEPTINVREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ACCEPTINVREC_YOY",
    },
    SUBSIDIARYACCEPT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUBSIDIARYACCEPT_YOY",
    },
    LOANREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "LOANREC_YOY",
    },
    ISSUEBONDREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ISSUEBONDREC_YOY",
    },
    OTHERFINAREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "OTHERFINAREC_YOY",
    },
    SUMFINAFLOWIN_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUMFINAFLOWIN_YOY",
    },
    REPAYDEBTPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "REPAYDEBTPAY_YOY",
    },
    DIVIPROFITORINTPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DIVIPROFITORINTPAY_YOY",
    },
    SUBSIDIARYPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUBSIDIARYPAY_YOY",
    },
    OTHERFINAPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "OTHERFINAPAY_YOY",
    },
    SUMFINAFLOWOUT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUMFINAFLOWOUT_YOY",
    },
    NETFINACASHFLOW_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETFINACASHFLOW_YOY",
    },
    EFFECTEXCHANGERATE_YOY: {
      type: "DataTypes.STRING(30)",
      field: "EFFECTEXCHANGERATE_YOY",
    },
    NICASHEQUI_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NICASHEQUI_YOY",
    },
    CASHEQUIBEGINNING_YOY: {
      type: "DataTypes.STRING(30)",
      field: "CASHEQUIBEGINNING_YOY",
    },
    CASHEQUIENDING_YOY: {
      type: "DataTypes.STRING(30)",
      field: "CASHEQUIENDING_YOY",
    },
    NIDEPOSIT: {
      display: "客户存款和同业存放款项净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSIT",
    },
    PREMIUMREC: {
      display: "收到原保险合同保费取得的现金",
      type: "DataTypes.STRING(30)",
      field: "PREMIUMREC",
    },
    NETRIREC: {
      display: "收到再保险业务现金净额",
      type: "DataTypes.STRING(30)",
      field: "NETRIREC",
    },
    NIINSUREDDEPOSITINV: {
      display: "保户储金及投资款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIINSUREDDEPOSITINV",
    },
    NETTRADEFASSETREC: {
      display: "收到交易性金融资产现金净额",
      type: "DataTypes.STRING(30)",
      field: "NETTRADEFASSETREC",
    },
    NDDEPOSITINCBANKFI: {
      display: "存放中央银行和同业款项净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDDEPOSITINCBANKFI",
    },
    NISELLBUYBACK: {
      display: "银行及证券业务卖出回购资金净增加额",
      type: "DataTypes.STRING(30)",
      field: "NISELLBUYBACK",
    },
    NDBUYSELLBACK: {
      display: "银行及证券业务买入返售资金净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDBUYSELLBACK",
    },
    INDEMNITYPAY: {
      display: "支付原保险合同赔付等款项的现金",
      type: "DataTypes.STRING(30)",
      field: "INDEMNITYPAY",
    },
    NETRIPAY: {
      display: "支付再保险业务现金净额",
      type: "DataTypes.STRING(30)",
      field: "NETRIPAY",
    },
    NDLENDFUND: {
      display: "银行业务及证券业务拆借资金净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDLENDFUND",
    },
    NIBUYSELLBACK: {
      display: "银行业务及证券业务买入返售资金净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBUYSELLBACK",
    },
    NDSELLBUYBACK: {
      display: "银行业务及证券业务卖出回购资金净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDSELLBUYBACK",
    },
    NILOANADVANCES: {
      display: "发放贷款及垫款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NILOANADVANCES",
    },
    DIVIPAY: {
      display: "支付保单红利的现金",
      type: "DataTypes.STRING(30)",
      field: "DIVIPAY",
    },
    NDINSUREDDEPOSITINV: {
      display: "保户储金及投资款净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDINSUREDDEPOSITINV",
    },
    NIDEPOSITINCBANKFI: {
      display: "存放中央银行和同业款项净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSITINCBANKFI",
    },
    NETTRADEFASSETPAY: {
      display: "支付交易性金融资产现金净额",
      type: "DataTypes.STRING(30)",
      field: "NETTRADEFASSETPAY",
    },
    NIINSUREDPLEDGELOAN: {
      display: "保户质押贷款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIINSUREDPLEDGELOAN",
    },
    BUYSUBSIDIARYPAY: {
      display: "收购子公司及其他营业单位支付的现金净额",
      type: "DataTypes.STRING(30)",
      field: "BUYSUBSIDIARYPAY",
    },
    DISPSUBSIDIARYPAY: {
      display: "处置子公司及其他营业单位流出的现金净额",
      type: "DataTypes.STRING(30)",
      field: "DISPSUBSIDIARYPAY",
    },
    NETSELLBUYBACKFASSETREC: {
      display: "收到卖出回购金融资产款现金净额",
      type: "DataTypes.STRING(30)",
      field: "NETSELLBUYBACKFASSETREC",
    },
    NETSELLBUYBACKFASSETPAY: {
      display: "支付卖出回购金融资产款现金净额",
      type: "DataTypes.STRING(30)",
      field: "NETSELLBUYBACKFASSETPAY",
    },
    NIDEPOSIT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSIT_YOY",
    },
    PREMIUMREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "PREMIUMREC_YOY",
    },
    NETRIREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETRIREC_YOY",
    },
    NIINSUREDDEPOSITINV_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIINSUREDDEPOSITINV_YOY",
    },
    NETTRADEFASSETREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETTRADEFASSETREC_YOY",
    },
    NDDEPOSITINCBANKFI_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDDEPOSITINCBANKFI_YOY",
    },
    NISELLBUYBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NISELLBUYBACK_YOY",
    },
    NDBUYSELLBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDBUYSELLBACK_YOY",
    },
    INDEMNITYPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INDEMNITYPAY_YOY",
    },
    NETRIPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETRIPAY_YOY",
    },
    NDLENDFUND_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDLENDFUND_YOY",
    },
    NIBUYSELLBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBUYSELLBACK_YOY",
    },
    NDSELLBUYBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDSELLBUYBACK_YOY",
    },
    NILOANADVANCES_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NILOANADVANCES_YOY",
    },
    DIVIPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DIVIPAY_YOY",
    },
    NDINSUREDDEPOSITINV_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDINSUREDDEPOSITINV_YOY",
    },
    NIDEPOSITINCBANKFI_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSITINCBANKFI_YOY",
    },
    NETTRADEFASSETPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETTRADEFASSETPAY_YOY",
    },
    NIINSUREDPLEDGELOAN_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIINSUREDPLEDGELOAN_YOY",
    },
    BUYSUBSIDIARYPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BUYSUBSIDIARYPAY_YOY",
    },
    DISPSUBSIDIARYPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DISPSUBSIDIARYPAY_YOY",
    },
    NETSELLBUYBACKFASSETREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETSELLBUYBACKFASSETREC_YOY",
    },
    NETSELLBUYBACKFASSETPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETSELLBUYBACKFASSETPAY_YOY",
    },
    NICLIENTDEPOSIT: {
      display: "其中:客户存款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NICLIENTDEPOSIT",
    },
    NIFIDEPOSIT: {
      display: "同业及其他金融机构存放款项净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIFIDEPOSIT",
    },
    NIBORROWFROMCBANK: {
      display: "向中央银行借款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBORROWFROMCBANK",
    },
    NDDEPOSITINCBANK: {
      display: "其中:存放中央银行款项净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDDEPOSITINCBANK",
    },
    NDDEPOSITINFI: {
      display: "存放同业及其他金融机构款项净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDDEPOSITINFI",
    },
    NIBORROWSELLBUYBACK: {
      display: "拆入资金及卖出回购金融资产款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBORROWSELLBUYBACK",
    },
    NISELLBUYBACKFASSET: {
      display: "卖出回购金融资产款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NISELLBUYBACKFASSET",
    },
    NDLENDBUYSELLBACK: {
      display: "拆出资金及买入返售金融资产净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDLENDBUYSELLBACK",
    },
    NDBUYSELLBACKFASSET: {
      display: "买入返售金融资产净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDBUYSELLBACKFASSET",
    },
    NETCD: {
      display: "存款证净额",
      type: "DataTypes.STRING(30)",
      field: "NETCD",
    },
    NITRADEFLIAB: {
      display: "交易性金融负债净增加额",
      type: "DataTypes.STRING(30)",
      field: "NITRADEFLIAB",
    },
    NDTRADEFASSET: {
      display: "交易性金融资产净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDTRADEFASSET",
    },
    INTREC: {
      display: "其中:收取利息的现金",
      type: "DataTypes.STRING(30)",
      field: "INTREC",
    },
    COMMREC: {
      display: "收取手续费及佣金的现金",
      type: "DataTypes.STRING(30)",
      field: "COMMREC",
    },
    DISPMASSETREC: {
      display: "处置抵债资产收到的现金",
      type: "DataTypes.STRING(30)",
      field: "DISPMASSETREC",
    },
    CANCELLOANREC: {
      display: "收回的已于以前年度核销的贷款",
      type: "DataTypes.STRING(30)",
      field: "CANCELLOANREC",
    },
    NDBORROWFROMCBANK: {
      display: "向中央银行借款净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDBORROWFROMCBANK",
    },
    NIDEPOSITINCBANK: {
      display: "其中:存放中央银行款项净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSITINCBANK",
    },
    NIDEPOSITINFI: {
      display: "存放同业及其他金融机构款项净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSITINFI",
    },
    NDFIDEPOSIT: {
      display: "同业及其他机构存放款减少净额",
      type: "DataTypes.STRING(30)",
      field: "NDFIDEPOSIT",
    },
    NDISSUECD: {
      display: "已发行存款证净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDISSUECD",
    },
    NILENDSELLBUYBACK: {
      display: "拆出资金及买入返售金融资产净增加额",
      type: "DataTypes.STRING(30)",
      field: "NILENDSELLBUYBACK",
    },
    NIBUYSELLBACKFASSET: {
      display: "买入返售金融资产净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBUYSELLBACKFASSET",
    },
    NDBORROWSELLBUYBACK: {
      display: "拆入资金及卖出回购金融资产款净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDBORROWSELLBUYBACK",
    },
    NDSELLBUYBACKFASSET: {
      display: "卖出回购金融资产净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDSELLBUYBACKFASSET",
    },
    NITRADEFASSET: {
      display: "交易性金融资产净增加额",
      type: "DataTypes.STRING(30)",
      field: "NITRADEFASSET",
    },
    NDTRADEFLIAB: {
      display: "交易性金融负债净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDTRADEFLIAB",
    },
    INTPAY: {
      display: "其中:支付利息的现金",
      type: "DataTypes.STRING(30)",
      field: "INTPAY",
    },
    COMMPAY: {
      display: "应付手续费及佣金",
      type: "DataTypes.STRING(30)",
      field: "COMMPAY",
    },
    BUYFINALEASEASSETPAY: {
      display: "购买融资租赁资产支付的现金",
      type: "DataTypes.STRING(30)",
      field: "BUYFINALEASEASSETPAY",
    },
    NIACCOUNTREC: {
      display: "应收账款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIACCOUNTREC",
    },
    DIVIORPROFITREC: {
      display: "其中:分得股利或利润所收到的现金",
      type: "DataTypes.STRING(30)",
      field: "DIVIORPROFITREC",
    },
    ISSUEJUNIORBONDREC: {
      display: "其中:发行次级债券所收到的现金",
      type: "DataTypes.STRING(30)",
      field: "ISSUEJUNIORBONDREC",
    },
    ISSUEOTHERBONDREC: {
      display: "发行其他债券所收到的现金",
      type: "DataTypes.STRING(30)",
      field: "ISSUEOTHERBONDREC",
    },
    ISSUECD: {
      display: "发行存款证",
      type: "DataTypes.STRING(30)",
      field: "ISSUECD",
    },
    ADDSHARECAPITALREC: {
      display: "增加股本所收到的现金",
      type: "DataTypes.STRING(30)",
      field: "ADDSHARECAPITALREC",
    },
    BONDINTPAY: {
      display: "偿付债券利息支付的现金",
      type: "DataTypes.STRING(30)",
      field: "BONDINTPAY",
    },
    ISSUESHAREREC: {
      display: "股份发行支付的费用",
      type: "DataTypes.STRING(30)",
      field: "ISSUESHAREREC",
    },
    NICLIENTDEPOSIT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NICLIENTDEPOSIT_YOY",
    },
    NIFIDEPOSIT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIFIDEPOSIT_YOY",
    },
    NIBORROWFROMCBANK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBORROWFROMCBANK_YOY",
    },
    NDDEPOSITINCBANK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDDEPOSITINCBANK_YOY",
    },
    NDDEPOSITINFI_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDDEPOSITINFI_YOY",
    },
    NIBORROWSELLBUYBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBORROWSELLBUYBACK_YOY",
    },
    NISELLBUYBACKFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NISELLBUYBACKFASSET_YOY",
    },
    NDLENDBUYSELLBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDLENDBUYSELLBACK_YOY",
    },
    NDBUYSELLBACKFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDBUYSELLBACKFASSET_YOY",
    },
    NETCD_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NETCD_YOY",
    },
    NITRADEFLIAB_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NITRADEFLIAB_YOY",
    },
    NDTRADEFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDTRADEFASSET_YOY",
    },
    INTREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INTREC_YOY",
    },
    COMMREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "COMMREC_YOY",
    },
    DISPMASSETREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DISPMASSETREC_YOY",
    },
    CANCELLOANREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "CANCELLOANREC_YOY",
    },
    NDBORROWFROMCBANK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDBORROWFROMCBANK_YOY",
    },
    NIDEPOSITINCBANK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSITINCBANK_YOY",
    },
    NIDEPOSITINFI_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIDEPOSITINFI_YOY",
    },
    NDFIDEPOSIT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDFIDEPOSIT_YOY",
    },
    NDISSUECD_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDISSUECD_YOY",
    },
    NILENDSELLBUYBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NILENDSELLBUYBACK_YOY",
    },
    NIBUYSELLBACKFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBUYSELLBACKFASSET_YOY",
    },
    NDBORROWSELLBUYBACK_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDBORROWSELLBUYBACK_YOY",
    },
    NDSELLBUYBACKFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDSELLBUYBACKFASSET_YOY",
    },
    NITRADEFASSET_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NITRADEFASSET_YOY",
    },
    NDTRADEFLIAB_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDTRADEFLIAB_YOY",
    },
    INTPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "INTPAY_YOY",
    },
    COMMPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "COMMPAY_YOY",
    },
    BUYFINALEASEASSETPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BUYFINALEASEASSETPAY_YOY",
    },
    NIACCOUNTREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIACCOUNTREC_YOY",
    },
    DIVIORPROFITREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "DIVIORPROFITREC_YOY",
    },
    ISSUEJUNIORBONDREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ISSUEJUNIORBONDREC_YOY",
    },
    ISSUEOTHERBONDREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ISSUEOTHERBONDREC_YOY",
    },
    ISSUECD_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ISSUECD_YOY",
    },
    ADDSHARECAPITALREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ADDSHARECAPITALREC_YOY",
    },
    BONDINTPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BONDINTPAY_YOY",
    },
    ISSUESHAREREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ISSUESHAREREC_YOY",
    },
    SALEGOODSSERVICEREC: {
      display: "销售商品、提供劳务收到的现金",
      type: "DataTypes.STRING(30)",
      field: "SALEGOODSSERVICEREC",
    },
    NIBORROWFROMFI: {
      display: "向其他金融机构拆入资金净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIBORROWFROMFI",
    },
    NDLOANADVANCES: {
      display: "发放贷款及垫款的净减少额",
      type: "DataTypes.STRING(30)",
      field: "NDLOANADVANCES",
    },
    BUYGOODSSERVICEPAY: {
      display: "购买商品、接受劳务支付的现金",
      type: "DataTypes.STRING(30)",
      field: "BUYGOODSSERVICEPAY",
    },
    REDUCEPLEDGETDEPOSIT: {
      display: "减少质押和定期存款所收到的现金",
      type: "DataTypes.STRING(30)",
      field: "REDUCEPLEDGETDEPOSIT",
    },
    NIPLEDGELOAN: {
      display: "质押贷款净增加额",
      type: "DataTypes.STRING(30)",
      field: "NIPLEDGELOAN",
    },
    ADDPLEDGETDEPOSIT: {
      display: "增加质押和定期存款所支付的现金",
      type: "DataTypes.STRING(30)",
      field: "ADDPLEDGETDEPOSIT",
    },
    SUBSIDIARYREDUCTCAPITAL: {
      display: "子公司减资支付给少数股东的现金",
      type: "DataTypes.STRING(30)",
      field: "SUBSIDIARYREDUCTCAPITAL",
    },
    SALEGOODSSERVICEREC_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SALEGOODSSERVICEREC_YOY",
    },
    NIBORROWFROMFI_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIBORROWFROMFI_YOY",
    },
    NDLOANADVANCES_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NDLOANADVANCES_YOY",
    },
    BUYGOODSSERVICEPAY_YOY: {
      type: "DataTypes.STRING(30)",
      field: "BUYGOODSSERVICEPAY_YOY",
    },
    REDUCEPLEDGETDEPOSIT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "REDUCEPLEDGETDEPOSIT_YOY",
    },
    NIPLEDGELOAN_YOY: {
      type: "DataTypes.STRING(30)",
      field: "NIPLEDGELOAN_YOY",
    },
    ADDPLEDGETDEPOSIT_YOY: {
      type: "DataTypes.STRING(30)",
      field: "ADDPLEDGETDEPOSIT_YOY",
    },
    SUBSIDIARYREDUCTCAPITAL_YOY: {
      type: "DataTypes.STRING(30)",
      field: "SUBSIDIARYREDUCTCAPITAL_YOY",
    },
  },
  {
    sequelize: db,
    modelName: "xjllb",
  }
);
module.exports = xjllb;

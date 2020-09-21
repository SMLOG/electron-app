export const zbMapList = {
  每股指标: [
    ["基本每股收益(元)", "jbmgsy"],
    ["扣非每股收益(元)", "kfmgsy"],
    ["稀释每股收益(元)", "xsmgsy"],
    ["每股净资产(元)", "mgjzc"],
    ["每股公积金(元)", "mggjj"],
    ["每股未分配利润(元)", "mgwfply"],
    ["每股经营现金流(元)", "mgjyxjl"],
  ],
  成长能力指标: [
    ["营业总收入(元)", "yyzsr"],
    ["毛利润(元)", "mlr"],
    ["归属净利润(元)", "gsjlr"],
    ["扣非净利润(元)", "kfjlr"],
    ["营业总收入同比增长(%)", "yyzsrtbzz"],
    ["归属净利润同比增长(%)", "gsjlrtbzz"],
    ["扣非净利润同比增长(%)", "kfjlrtbzz"],
    ["营业总收入滚动环比增长(%)", "yyzsrgdhbzz"],
    ["归属净利润滚动环比增长(%)", "gsjlrgdhbzz"],
    ["扣非净利润滚动环比增长(%)", "kfjlrgdhbzz"],
  ],
  盈利能力指标: [
    ["加权净资产收益率(%)", "jqjzcsyl"],
    ["摊薄净资产收益率(%)", "tbjzcsyl"],
    ["摊薄总资产收益率(%)", "tbzzcsyl"],
    ["毛利率(%)", "mll"],
    ["净利率(%)", "jll"],
    ["实际税率(%)", "sjsl"],
  ],
  盈利质量指标: [
    ["预收款/营业收入", "yskyysr"],
    ["销售现金流/营业收入", "xsxjlyysr"],
    ["经营现金流/营业收入", "jyxjlyysr"],
  ],
  运营能力指标: [
    ["总资产周转率(次)", "zzczzy"],
    ["应收账款周转天数(天)", "yszkzzts"],
    ["存货周转天数(天)", "chzzts"],
  ],
  财务风险指标: [
    ["资产负债率(%)", "zcfzl"],
    ["流动负债/总负债(%)", "ldzczfz"],
    ["流动比率", "ldbl"],
    ["速动比率", "sdbl"],
  ],
};

export const 资产负债表 = {
  流动资产: [
    ["&ensp;&ensp;&ensp;&ensp;货币资金", "MONETARYFUND"],
    ["&ensp;&ensp;&ensp;&ensp;结算备付金", "SETTLEMENTPROVISION"],
    ["&ensp;&ensp;&ensp;&ensp;拆出资金", "LENDFUND"],
    [
      "&ensp;&ensp;&ensp;&ensp;以公允价值计量且其变动计入当期损益的金融资产",
      "FVALUEFASSET",
    ],
    ["&ensp;&ensp;&ensp;&ensp;其中:交易性金融资产", "TRADEFASSET"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;指定为以公允价值计量且其变动计入当期损益的金融资产",
      "DEFINEFVALUEFASSET",
    ],
    ["&ensp;&ensp;&ensp;&ensp;应收票据及应收账款", "ACCOUNTBILLREC"],
    ["&ensp;&ensp;&ensp;&ensp;其中:应收票据", "BILLREC"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;应收账款",
      "ACCOUNTREC",
    ],
    ["&ensp;&ensp;&ensp;&ensp;预付款项", "ADVANCEPAY"],
    ["&ensp;&ensp;&ensp;&ensp;应收保费", "PREMIUMREC"],
    ["&ensp;&ensp;&ensp;&ensp;应收分保账款", "RIREC"],
    ["&ensp;&ensp;&ensp;&ensp;应收分保合同准备金", "RICONTACTRESERVEREC"],
    ["&ensp;&ensp;&ensp;&ensp;其他应收款合计", "TOTAL_OTHER_RECE"],
    ["&ensp;&ensp;&ensp;&ensp;其中:应收利息", "INTERESTREC"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;应收股利",
      "DIVIDENDREC",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;其他应收款",
      "OTHERREC",
    ],
    ["&ensp;&ensp;&ensp;&ensp;应收出口退税", "EXPORTREBATEREC"],
    ["&ensp;&ensp;&ensp;&ensp;应收补贴款", "SUBSIDYREC"],
    ["&ensp;&ensp;&ensp;&ensp;内部应收款", "INTERNALREC"],
    ["&ensp;&ensp;&ensp;&ensp;买入返售金融资产", "BUYSELLBACKFASSET"],
    ["&ensp;&ensp;&ensp;&ensp;存货", "INVENTORY"],
    ["&ensp;&ensp;&ensp;&ensp;划分为持有待售的资产", "CLHELDSALEASS"],
    ["&ensp;&ensp;&ensp;&ensp;一年内到期的非流动资产", "NONLASSETONEYEAR"],
    ["&ensp;&ensp;&ensp;&ensp;其他流动资产", "OTHERLASSET"],
    ["流动资产合计", "SUMLASSET"],
  ],
  非流动资产: [
    ["&ensp;&ensp;&ensp;&ensp;发放委托贷款及垫款", "LOANADVANCES"],
    ["&ensp;&ensp;&ensp;&ensp;可供出售金融资产", "SALEABLEFASSET"],
    ["&ensp;&ensp;&ensp;&ensp;持有至到期投资", "HELDMATURITYINV"],
    ["&ensp;&ensp;&ensp;&ensp;长期应收款", "LTREC"],
    ["&ensp;&ensp;&ensp;&ensp;长期股权投资", "LTEQUITYINV"],
    ["&ensp;&ensp;&ensp;&ensp;投资性房地产", "ESTATEINVEST"],
    ["&ensp;&ensp;&ensp;&ensp;固定资产", "FIXEDASSET"],
    ["&ensp;&ensp;&ensp;&ensp;在建工程", "CONSTRUCTIONPROGRESS"],
    ["&ensp;&ensp;&ensp;&ensp;工程物资", "CONSTRUCTIONMATERIAL"],
    ["&ensp;&ensp;&ensp;&ensp;固定资产清理", "LIQUIDATEFIXEDASSET"],
    ["&ensp;&ensp;&ensp;&ensp;生产性生物资产", "PRODUCTBIOLOGYASSET"],
    ["&ensp;&ensp;&ensp;&ensp;油气资产", "OILGASASSET"],
    ["&ensp;&ensp;&ensp;&ensp;无形资产", "INTANGIBLEASSET"],
    ["&ensp;&ensp;&ensp;&ensp;开发支出", "DEVELOPEXP"],
    ["&ensp;&ensp;&ensp;&ensp;商誉", "GOODWILL"],
    ["&ensp;&ensp;&ensp;&ensp;长期待摊费用", "LTDEFERASSET"],
    ["&ensp;&ensp;&ensp;&ensp;递延所得税资产", "DEFERINCOMETAXASSET"],
    ["&ensp;&ensp;&ensp;&ensp;其他非流动资产", "OTHERNONLASSET"],
    ["非流动资产合计", "SUMNONLASSET"],
    ["资产总计", "SUMASSET"],
  ],
  流动负债: [
    ["&ensp;&ensp;&ensp;&ensp;短期借款", "STBORROW"],
    ["&ensp;&ensp;&ensp;&ensp;向中央银行借款", "BORROWFROMCBANK"],
    ["&ensp;&ensp;&ensp;&ensp;吸收存款及同业存放", "DEPOSIT"],
    ["&ensp;&ensp;&ensp;&ensp;拆入资金", "BORROWFUND"],
    [
      "&ensp;&ensp;&ensp;&ensp;以公允价值计量且其变动计入当期损益的金融负债",
      "FVALUEFLIAB",
    ],
    ["&ensp;&ensp;&ensp;&ensp;其中:交易性金融负债", "TRADEFLIAB"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;指定以公允价值计量且其变动计入当期损益的金融负债",
      "DEFINEFVALUEFLIAB",
    ],
    ["&ensp;&ensp;&ensp;&ensp;应付票据及应付账款", "ACCOUNTBILLPAY"],
    ["&ensp;&ensp;&ensp;&ensp;其中:应付票据", "BILLPAY"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;应付账款",
      "ACCOUNTPAY",
    ],
    ["&ensp;&ensp;&ensp;&ensp;预收款项", "ADVANCERECEIVE"],
    ["&ensp;&ensp;&ensp;&ensp;卖出回购金融资产款", "SELLBUYBACKFASSET"],
    ["&ensp;&ensp;&ensp;&ensp;应付手续费及佣金", "COMMPAY"],
    ["&ensp;&ensp;&ensp;&ensp;应付职工薪酬", "SALARYPAY"],
    ["&ensp;&ensp;&ensp;&ensp;应交税费", "TAXPAY"],
    ["&ensp;&ensp;&ensp;&ensp;其他应付款合计", "TOTAL_OTHER_PAYABLE"],
    ["&ensp;&ensp;&ensp;&ensp;其中:应付利息", "INTERESTPAY"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;应付股利",
      "DIVIDENDPAY",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;其他应付款",
      "OTHERPAY",
    ],
    ["&ensp;&ensp;&ensp;&ensp;应付分保账款", "RIPAY"],
    ["&ensp;&ensp;&ensp;&ensp;内部应付款", "INTERNALPAY"],
    ["&ensp;&ensp;&ensp;&ensp;预计流动负债", "ANTICIPATELLIAB"],
    ["&ensp;&ensp;&ensp;&ensp;保险合同准备金", "CONTACTRESERVE"],
    ["&ensp;&ensp;&ensp;&ensp;代理买卖证券款", "AGENTTRADESECURITY"],
    ["&ensp;&ensp;&ensp;&ensp;代理承销证券款", "AGENTUWSECURITY"],
    ["&ensp;&ensp;&ensp;&ensp;一年内的递延收益", "DEFERINCOMEONEYEAR"],
    ["&ensp;&ensp;&ensp;&ensp;应付短期债券", "STBONDREC"],
    ["&ensp;&ensp;&ensp;&ensp;划分为持有待售的负债", "CLHELDSALELIAB"],
    ["&ensp;&ensp;&ensp;&ensp;一年内到期的非流动负债", "NONLLIABONEYEAR"],
    ["&ensp;&ensp;&ensp;&ensp;其他流动负债", "OTHERLLIAB"],
    ["流动负债合计", "SUMLLIAB"],
  ],
  非流动负债: [
    ["&ensp;&ensp;&ensp;&ensp;长期借款", "LTBORROW"],
    ["&ensp;&ensp;&ensp;&ensp;应付债券", "BONDPAY"],
    ["&ensp;&ensp;&ensp;&ensp;其中:优先股", "PREFERSTOCBOND"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;永续债",
      "SUSTAINBOND",
    ],
    ["&ensp;&ensp;&ensp;&ensp;长期应付款", "LTACCOUNTPAY"],
    ["&ensp;&ensp;&ensp;&ensp;长期应付职工薪酬", "LTSALARYPAY"],
    ["&ensp;&ensp;&ensp;&ensp;专项应付款", "SPECIALPAY"],
    ["&ensp;&ensp;&ensp;&ensp;预计负债", "ANTICIPATELIAB"],
    ["&ensp;&ensp;&ensp;&ensp;递延收益", "DEFERINCOME"],
    ["&ensp;&ensp;&ensp;&ensp;递延所得税负债", "DEFERINCOMETAXLIAB"],
    ["&ensp;&ensp;&ensp;&ensp;其他非流动负债", "OTHERNONLLIAB"],
    ["非流动负债合计", "SUMNONLLIAB"],
    ["负债合计", "SUMLIAB"],
  ],
  "所有者权益(或股东权益)": [
    ["&ensp;&ensp;&ensp;&ensp;实收资本（或股本）", "SHARECAPITAL"],
    ["&ensp;&ensp;&ensp;&ensp;其他权益工具", "OTHEREQUITY"],
    ["&ensp;&ensp;&ensp;&ensp;其中:优先股", "PREFERREDSTOCK"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;永续债",
      "SUSTAINABLEDEBT",
    ],
    ["&ensp;&ensp;&ensp;&ensp;其他权益工具", "OTHEREQUITYOTHER"],
    ["&ensp;&ensp;&ensp;&ensp;资本公积", "CAPITALRESERVE"],
    ["&ensp;&ensp;&ensp;&ensp;库存股", "INVENTORYSHARE"],
    ["&ensp;&ensp;&ensp;&ensp;专项储备", "SPECIALRESERVE"],
    ["&ensp;&ensp;&ensp;&ensp;盈余公积", "SURPLUSRESERVE"],
    ["&ensp;&ensp;&ensp;&ensp;一般风险准备", "GENERALRISKPREPARE"],
    ["&ensp;&ensp;&ensp;&ensp;未确定的投资损失", "UNCONFIRMINVLOSS"],
    ["&ensp;&ensp;&ensp;&ensp;未分配利润", "RETAINEDEARNING"],
    ["&ensp;&ensp;&ensp;&ensp;拟分配现金股利", "PLANCASHDIVI"],
    ["&ensp;&ensp;&ensp;&ensp;外币报表折算差额", "DIFFCONVERSIONFC"],
    ["归属于母公司股东权益合计", "SUMPARENTEQUITY"],
    ["&ensp;&ensp;&ensp;&ensp;少数股东权益", "MINORITYEQUITY"],
    ["股东权益合计", "SUMSHEQUITY"],
    ["负债和股东权益合计", "SUMLIABSHEQUITY"],
  ],
};
export const bfb_lr = [
  ["营业收入(元)", "yysr", "--", "100%"],
  ["营业成本(元)", "yycb", "yycbzb"],
  ["&ensp;&ensp;&ensp;&ensp;营业税金及附加(元)", "yysjjfj", "yysjjfjzb"],
  ["&ensp;&ensp;&ensp;&ensp;期间费用(元)", "qjfy", "qjfyzb"],
  [
    "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;销售费用(元)",
    "xsfy",
    "xsfyzb",
  ],
  [
    "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;管理费用(元)",
    "glfy",
    "glfyzb",
  ],
  [
    "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;财务费用(元)",
    "cwfy",
    "cwfyzb",
  ],
  ["&ensp;&ensp;&ensp;&ensp;资产减值损失(元)", "zcjzss", "zcjzsszb"],
  ["其他经营收益(元)", "qtjysy", "qtjysyzb"],
  ["&ensp;&ensp;&ensp;&ensp;公允价值变动损益(元)", "gyjzbdsy", "gyjzbdsyzb"],
  ["&ensp;&ensp;&ensp;&ensp;投资收益(元)", "tzsy", "tzsyzb"],
  ["营业利润(元)", "yylr", "yylrzb"],
  ["&ensp;&ensp;&ensp;&ensp;加:营业外收入(元)", "yywsr", "yywsrzb"],
  ["&ensp;&ensp;&ensp;&ensp;&nbsp;&nbsp;补贴收入(元)", "btsr", "btsrzb"],
  ["&ensp;&ensp;&ensp;&ensp;减:营业外支出(元)", "yywzc", "yywzczb"],
  ["利润总额(元)", "lrze", "lrzezb"],
  ["&ensp;&ensp;&ensp;&ensp;减:所得税(元)", "sds", "sdszb"],
  ["净利润(元)", "jlr", "jlrzb"],
];

export const 利润表 = {
  利润表: [
    ["营业总收入", "TOTALOPERATEREVE"],
    ["&ensp;&ensp;&ensp;&ensp;营业收入", "OPERATEREVE"],
    ["&ensp;&ensp;&ensp;&ensp;利息收入", "INTREVE"],
    ["&ensp;&ensp;&ensp;&ensp;已赚保费", "PREMIUMEARNED"],
    ["&ensp;&ensp;&ensp;&ensp;手续费及佣金收入", "COMMREVE"],
    ["&ensp;&ensp;&ensp;&ensp;其他业务收入", "OTHERREVE"],
    ["营业总成本", "TOTALOPERATEEXP"],
    ["&ensp;&ensp;&ensp;&ensp;营业成本", "OPERATEEXP"],
    ["&ensp;&ensp;&ensp;&ensp;利息支出", "INTEXP"],
    ["&ensp;&ensp;&ensp;&ensp;手续费及佣金支出", "COMMEXP"],
    ["&ensp;&ensp;&ensp;&ensp;研发费用", "RDEXP"],
    ["&ensp;&ensp;&ensp;&ensp;退保金", "SURRENDERPREMIUM"],
    ["&ensp;&ensp;&ensp;&ensp;赔付支出净额", "NETINDEMNITYEXP"],
    ["&ensp;&ensp;&ensp;&ensp;提取保险合同准备金净额", "NETCONTACTRESERVE"],
    ["&ensp;&ensp;&ensp;&ensp;保单红利支出", "POLICYDIVIEXP"],
    ["&ensp;&ensp;&ensp;&ensp;分保费用", "RIEXP"],
    ["&ensp;&ensp;&ensp;&ensp;其他业务成本", "OTHEREXP"],
    ["&ensp;&ensp;&ensp;&ensp;营业税金及附加", "OPERATETAX"],
    ["&ensp;&ensp;&ensp;&ensp;销售费用", "SALEEXP"],
    ["&ensp;&ensp;&ensp;&ensp;管理费用", "MANAGEEXP"],
    ["&ensp;&ensp;&ensp;&ensp;财务费用", "FINANCEEXP"],
    ["&ensp;&ensp;&ensp;&ensp;资产减值损失", "ASSETDEVALUELOSS"],
    ["其他经营收益", ""],
    ["&ensp;&ensp;&ensp;&ensp;加:公允价值变动收益", "FVALUEINCOME"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;投资收益\n                        &ensp;&ensp;&ensp;&ensp;加:投资收益",
      "INVESTINCOME",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;其中:对联营企业和合营企业的投资收益\n                        &ensp;&ensp;&ensp;&ensp;其中:对联营企业和合营企业的投资收益",
      "INVESTJOINTINCOME",
    ],
    ["&ensp;&ensp;&ensp;&ensp;汇兑收益", "EXCHANGEINCOME"],
    ["营业利润", "OPERATEPROFIT"],
    ["&ensp;&ensp;&ensp;&ensp;加:营业外收入", "NONOPERATEREVE"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;非流动资产处置利得\n                        &ensp;&ensp;&ensp;&ensp;其中:非流动资产处置利得",
      "NONLASSETREVE",
    ],
    ["&ensp;&ensp;&ensp;&ensp;减:营业外支出", "NONOPERATEEXP"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;非流动资产处置净损失\n                        &ensp;&ensp;&ensp;&ensp;其中:非流动资产处置净损失",
      "NONLASSETNETLOSS",
    ],
    ["利润总额", "SUMPROFIT"],
    ["&ensp;&ensp;&ensp;&ensp;减:所得税费用", "INCOMETAX"],
    ["&ensp;&ensp;&ensp;&ensp;被合并方在合并前实现利润", "COMBINEDNETPROFITB"],
    ["净利润", "NETPROFIT"],
    [
      "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;归属于母公司股东的净利润\n                        &ensp;&ensp;&ensp;&ensp;其中:归属于母公司股东的净利润",
      "PARENTNETPROFIT",
    ],
    ["&ensp;&ensp;&ensp;&ensp;少数股东损益", "MINORITYINCOME"],
    ["&ensp;&ensp;&ensp;&ensp;扣除非经常性损益后的净利润", "KCFJCXSYJLR"],
    ["每股收益", ""],
    ["&ensp;&ensp;&ensp;&ensp;基本每股收益", "BASICEPS"],
    ["&ensp;&ensp;&ensp;&ensp;稀释每股收益", "DILUTEDEPS"],
    ["其他综合收益", "OTHERCINCOME"],
    [
      "&ensp;&ensp;&ensp;&ensp;归属于母公司股东的其他综合收益",
      "PARENTOTHERCINCOME",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;归属于少数股东的其他综合收益",
      "MINORITYOTHERCINCOME",
    ],
    ["综合收益总额", "SUMCINCOME"],
    [
      "&ensp;&ensp;&ensp;&ensp;归属于母公司所有者的综合收益总额",
      "PARENTCINCOME",
    ],
    ["&ensp;&ensp;&ensp;&ensp;归属于少数股东的综合收益总额", "MINORITYCINCOME"],
  ],
};
export const 现金流量表 = {
  经营活动产生的现金流量: [
    [
      "&ensp;&ensp;&ensp;&ensp;销售商品、提供劳务收到的现金",
      "SALEGOODSSERVICEREC",
    ],
    ["&ensp;&ensp;&ensp;&ensp;客户存款和同业存放款项净增加额", "NIDEPOSIT"],
    ["&ensp;&ensp;&ensp;&ensp;向中央银行借款净增加额", "NIBORROWFROMCBANK"],
    [
      "&ensp;&ensp;&ensp;&ensp;向其他金融机构拆入资金净增加额",
      "NIBORROWFROMFI",
    ],
    ["&ensp;&ensp;&ensp;&ensp;收到原保险合同保费取得的现金", "PREMIUMREC"],
    ["&ensp;&ensp;&ensp;&ensp;收到再保险业务现金净额", "NETRIREC"],
    ["&ensp;&ensp;&ensp;&ensp;保户储金及投资款净增加额", "NIINSUREDDEPOSITINV"],
    ["&ensp;&ensp;&ensp;&ensp;处置交易性金融资产净增加额", "NIDISPTRADEFASSET"],
    ["&ensp;&ensp;&ensp;&ensp;收取利息、手续费及佣金的现金", "INTANDCOMMREC"],
    ["&ensp;&ensp;&ensp;&ensp;拆入资金净增加额", "NIBORROWFUND"],
    ["&ensp;&ensp;&ensp;&ensp;发放贷款及垫款的净减少额", "NDLOANADVANCES"],
    ["&ensp;&ensp;&ensp;&ensp;回购业务资金净增加额", "NIBUYBACKFUND"],
    ["&ensp;&ensp;&ensp;&ensp;收到的税费返还", "TAXRETURNREC"],
    ["&ensp;&ensp;&ensp;&ensp;收到其他与经营活动有关的现金", "OTHEROPERATEREC"],
    ["经营活动现金流入小计", "SUMOPERATEFLOWIN"],
    [
      "&ensp;&ensp;&ensp;&ensp;购买商品、接受劳务支付的现金",
      "BUYGOODSSERVICEPAY",
    ],
    ["&ensp;&ensp;&ensp;&ensp;客户贷款及垫款净增加额", "NILOANADVANCES"],
    [
      "&ensp;&ensp;&ensp;&ensp;存放中央银行和同业款项净增加额",
      "NIDEPOSITINCBANKFI",
    ],
    ["&ensp;&ensp;&ensp;&ensp;支付原保险合同赔付款项的现金", "INDEMNITYPAY"],
    ["&ensp;&ensp;&ensp;&ensp;支付利息、手续费及佣金的现金", "INTANDCOMMPAY"],
    ["&ensp;&ensp;&ensp;&ensp;支付保单红利的现金", "DIVIPAY"],
    ["&ensp;&ensp;&ensp;&ensp;支付给职工以及为职工支付的现金", "EMPLOYEEPAY"],
    ["&ensp;&ensp;&ensp;&ensp;支付的各项税费", "TAXPAY"],
    ["&ensp;&ensp;&ensp;&ensp;支付其他与经营活动有关的现金", "OTHEROPERATEPAY"],
    ["经营活动现金流出小计", "SUMOPERATEFLOWOUT"],
    ["经营活动产生的现金流量净额", "NETOPERATECASHFLOW"],
  ],
  投资活动产生的现金流量: [
    ["&ensp;&ensp;&ensp;&ensp;收回投资收到的现金", "DISPOSALINVREC"],
    ["&ensp;&ensp;&ensp;&ensp;取得投资收益收到的现金", "INVINCOMEREC"],
    [
      "&ensp;&ensp;&ensp;&ensp;处置固定资产、无形资产和其他长期资产收回的现金净额",
      "DISPFILASSETREC",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;处置子公司及其他营业单位收到的现金净额",
      "DISPSUBSIDIARYREC",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;减少质押和定期存款所收到的现金",
      "REDUCEPLEDGETDEPOSIT",
    ],
    ["&ensp;&ensp;&ensp;&ensp;收到其他与投资活动有关的现金", "OTHERINVREC"],
    ["投资活动现金流入小计", "SUMINVFLOWIN"],
    [
      "&ensp;&ensp;&ensp;&ensp;购建固定资产、无形资产和其他长期资产支付的现金",
      "BUYFILASSETPAY",
    ],
    ["&ensp;&ensp;&ensp;&ensp;投资支付的现金", "INVPAY"],
    ["&ensp;&ensp;&ensp;&ensp;质押贷款净增加额", "NIPLEDGELOAN"],
    [
      "&ensp;&ensp;&ensp;&ensp;取得子公司及其他营业单位支付的现金净额",
      "GETSUBSIDIARYPAY",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;增加质押和定期存款所支付的现金",
      "ADDPLEDGETDEPOSIT",
    ],
    ["&ensp;&ensp;&ensp;&ensp;支付其他与投资活动有关的现金", "OTHERINVPAY"],
    ["投资活动现金流出小计", "SUMINVFLOWOUT"],
    ["投资活动产生的现金流量净额", "NETINVCASHFLOW"],
  ],
  筹资活动产生的现金流量: [
    ["&ensp;&ensp;&ensp;&ensp;吸收投资收到的现金", "ACCEPTINVREC"],
    [
      "&ensp;&ensp;&ensp;&ensp;子公司吸收少数股东投资收到的现金",
      "SUBSIDIARYACCEPT",
    ],
    ["&ensp;&ensp;&ensp;&ensp;取得借款收到的现金", "LOANREC"],
    ["&ensp;&ensp;&ensp;&ensp;发行债券收到的现金", "ISSUEBONDREC"],
    ["&ensp;&ensp;&ensp;&ensp;收到其他与筹资活动有关的现金", "OTHERFINAREC"],
    ["筹资活动现金流入小计", "SUMFINAFLOWIN"],
    ["&ensp;&ensp;&ensp;&ensp;偿还债务支付的现金", "REPAYDEBTPAY"],
    [
      "&ensp;&ensp;&ensp;&ensp;分配股利、利润或偿付利息支付的现金",
      "DIVIPROFITORINTPAY",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;子公司支付给少数股东的股利、利润",
      "SUBSIDIARYPAY",
    ],
    [
      "&ensp;&ensp;&ensp;&ensp;购买子公司少数股权而支付的现金",
      "BUYSUBSIDIARYPAY",
    ],
    ["&ensp;&ensp;&ensp;&ensp;支付其他与筹资活动有关的现金", "OTHERFINAPAY"],
    [
      "&ensp;&ensp;&ensp;&ensp;子公司减资支付给少数股东的现金",
      "SUBSIDIARYREDUCTCAPITAL",
    ],
    ["筹资活动现金流出小计", "SUMFINAFLOWOUT"],
    ["筹资活动产生的现金流量净额", "NETFINACASHFLOW"],
    ["汇率变动对现金及现金等价物的影响", "EFFECTEXCHANGERATE"],
    ["现金及现金等价物净增加额", "NICASHEQUI"],
    [
      "&ensp;&ensp;&ensp;&ensp;加:期初现金及现金等价物余额",
      "CASHEQUIBEGINNING",
    ],
    ["期末现金及现金等价物余额", "CASHEQUIENDING"],
  ],
};
export const ReportsItems = { 资产负债表, 利润表, 现金流量表 };
export const ReportsMap = {
  资产负债表: "zcfzb",
  利润表: "lrb",
  现金流量表: "xjllb",
};

import _ from "lodash";
var conf = [
  [
    "财务结构",
    "负债占资产比率(%)",
    "https://caibaoshuo.com/terms/000651/debt_ratio",
    "负债占资产比率 = 负债 / 总资产",
  ],
  [
    "",
    "长期资金占重资产比率(%)",
    "https://caibaoshuo.com/terms/000651/longterm_ratio",
    "长期资金占重资产比率 = (股东权益+其他长期负债) / (固定资产 + 在建工程)",
  ],
  [
    "偿债能力",
    "流动比率(%)",
    "https://caibaoshuo.com/terms/000651/current_ratio",
    "流动比率 = 流动资产总额 / 流动负债总额",
  ],
  [
    "",
    "速动比率(%)",
    "https://caibaoshuo.com/terms/000651/quick_ratio",
    "速动比率 = ( 流动资产总额 - 存货 - 预付费用 ) / 流动负债总额",
  ],
  [
    "",
    "利息保障倍数",
    "https://caibaoshuo.com/terms/000651/interest_coverage",
    "利息保障倍数 = 营业净利 / 利息费用",
  ],
  [
    "运营能力",
    "应收款项周转率(次/年)",
    "https://caibaoshuo.com/terms/000651/receivable_turnover_ratio",
    "应收款项周转率 = 365 / 应收帐款周转天数",
  ],
  [
    "",
    "应收款项周转天数(天)",
    "https://caibaoshuo.com/terms/000651/receivable_turnover_date",
    "应收款项周转天数 = 平均应收账款 × 365 / 销售收入",
  ],
  [
    "",
    "存货周转率(次/年)",
    "https://caibaoshuo.com/terms/000651/inventories_turnover_ratio",
    "存货周转率 = 货物销售成本 / 存货总额",
  ],
  [
    "",
    "存货周转天数(天)",
    "https://caibaoshuo.com/terms/000651/inventories_turnover_date",
    "存货周转天数 = 365 / 存货周转率",
  ],
  [
    "",
    "固定资产周转率(次/年)",
    "https://caibaoshuo.com/terms/000651/fixed_assets_turnover_ratio",
    "固定资产周转率 ＝ 产品销售收入净额 / 固定资产平均净值",
  ],
  [
    "",
    "完整生意周期(天)",
    "https://caibaoshuo.com/terms/000651/total_turnover_date",
    "完整生意周期 = 存货在库天数（平均销货日数）+ 平均收现日数",
  ],
  [
    "",
    "应付款项周转天数(天)",
    "https://caibaoshuo.com/terms/000651/ap_turnover_date",
    "应付款项周转天数 ＝ 期初期末应付账款平均值 * 360 / 主营业务成本",
  ],
  [
    "",
    "缺钱天数(天)",
    "https://caibaoshuo.com/terms/000651/money_needed_date",
    "缺钱的天数（现金转换周期) = 做生意的完整周期 - 应付帐款付款天数",
  ],
  [
    "",
    "总资产周转率(次/年)",
    "https://caibaoshuo.com/terms/000651/t_assets_turnover_ratio",
    "资产周转率   = 销售收入 / 平均总资产  \n   = 销售收入 / ((期初资产 + 期末资产)/2)",
  ],
  [
    "盈利能力",
    "ROA=资产收益率(%)",
    "https://caibaoshuo.com/terms/000651/roa",
    "资产回报率(%)   \n    = 净收益 /   平均总资产\n    \n\n    = 净收益 / ((期初资产 + 期末资产)/2)",
  ],
  [
    "",
    "ROE=净资产收益率(%)",
    "https://caibaoshuo.com/terms/000651/roe",
    "净资产收益率 (ROE%)=  净利率 x 总资产周转率 x 杠杆倍数",
  ],
  [
    "",
    "ROIC=资本回报率(%)",
    "https://caibaoshuo.com/terms/000651/roic",
    "资本回报率 (ROIC%)\n    \n    \n    = 息税前利润 EBIT x (1 - 税率) / 投入资本",
  ],
  [
    "",
    "税前纯益占实收资本(%)",
    "https://caibaoshuo.com/terms/000651/pre_tax_net_income_ratio",
    "税前纯益占实收资本比率\n    = 税前纯益 / 总股本\n    = (营业利润 + 营业外收入 - 营业外支出) / 总股本",
  ],
  [
    "",
    "毛利率(%)",
    "https://caibaoshuo.com/terms/000651/gross_margin_ratio",
    "毛利率(%) = 毛利 / 营业收入",
  ],
  [
    "",
    "营业利润率(%)",
    "https://caibaoshuo.com/terms/000651/operating_profit_ratio",
    "营业利润率 = 营业利润 / 营业收入",
  ],
  [
    "",
    "净利率(%)",
    "https://caibaoshuo.com/terms/000651/net_profit_ratio",
    "净利率(%) = 净收入 / 收入",
  ],
  [
    "",
    "营业费用率(%)",
    "https://caibaoshuo.com/terms/000651/scale_charges_ratio",
    "营业费用率 = 营业费用 / 营业收入",
  ],
  [
    "",
    "经营安全边际率(%)",
    "https://caibaoshuo.com/terms/000651/safety_ratio",
    "经营安全边际率 = 营业利润率 / 毛利率",
  ],
  [
    "",
    "EPS=基本每股收益(元)",
    "https://caibaoshuo.com/terms/000651/eps",
    "基本每股收益(元) (EPS) = (净收入 - 优先股息) / 已发行股份基本平均数",
  ],
  [
    "成长能力",
    "营收增长率(%)",
    "https://caibaoshuo.com/terms/000651/operating_revenue_growth",
    "营收增长率 ＝ （本期主营业务收入 － 上期主要业务收入）/ 上期主营业务收入",
  ],
  [
    "",
    "营业利润增长率(%)",
    "https://caibaoshuo.com/terms/000651/operating_profit_growth",
    "营业利润增长率 = (本年营业利润总额 - 上年营业利润总额) / 上年营业利润总额",
  ],
  [
    "",
    "净资本增长率(%)",
    "https://caibaoshuo.com/terms/000651/net_assets_growth",
    "净资本增长率 =（期末净资产 — 期初净资产）/ 期初净资产",
  ],
  [
    "现金流量",
    "现金流量比率(%)",
    "https://caibaoshuo.com/terms/000651/cashflow_ratio",
    "现金流量比率 = 营业活动净现金流量 / 流动负债",
  ],
  [
    "",
    "现金流量允当比率(%)",
    "https://caibaoshuo.com/terms/000651/cashflow_adequacy_ratio",
    "现金流量允当比率 = 最近5年度营业活动净现金流量 / 最近5年度（资本支出 + 存货増加额+ 现金股利)",
  ],
  [
    "",
    "现金再投资比率(%)",
    "https://caibaoshuo.com/terms/000651/cash_reinvestment_ratio",
    "现金再投资比率 = (业活动净现金流 - 现金股利) / (固定资产毛额 + 长期投资 + 其他资产 + 运营资金)",
  ],
];

var all = conf.reduce((r, ar) => {
  var a = ar[3].split(/=|＝/);
  var l = a[0].trim();
  var rr = a[1].trim();
  r[l] = rr;
  return r;
}, {});

var rawVar = {};
var m = _.defaults(rawVar, all);
m = _.mapKeys(m, (v, k) => {
  return k.replace(/\(.*?\)/g, "").trim();
});
//console.log(m);
const regex = /\p{Unified_Ideograph}+[^+\/x)\s*-]*/gu;

//console.log('净资产收益率 (ROE%)'.match(regex));
m["营业总收入"] = "TOTALOPERATEREVE";
m["杠杆倍数"] = "权益乘数";
m["净收益"] = m["净利润"] = "NETPROFIT";
m["营业收入"] = m["主营业务成本"] = m["销售收入"] = "OPERATEREVE";
m["流动资产总额"] = "z.SUMLASSET";
m["流动负债总额"] = "z.SUMLLIAB";
m["营业支出"] = m["营业成本"] = m["货物销售成本"] = "OPERATEEXP";
m["总资产"] = m["期末总资产"] = "z.SUMLIABSHEQUITY";
m["期初总资产"] = "z2.SUMLIABSHEQUITY";
m["归属于母公司股东的净利润"] = "PARENTNETPROFIT";
m["负债"] = m["负债总额"] = "z.SUMLIAB";
m["期初负债总额"] = "z2.SUMLIAB";
m["存货"] = m["期末存货总额"] = "z.INVENTORY";
m["预付费用"] = "z.ADVANCEPAY";
m["利息费用"] = "z.INTERESTPAY";
m["利润总额"] = m["营业净利"] = m["营业利润"] = "SUMPROFIT";
m["期初存货总额"] = "z2.INVENTORY";
m["期初应付账款"] = "z2.ACCOUNTBILLPAY";
m["期末应付账款"] = "z.ACCOUNTBILLPAY";
m["期初应收账款"] = "z2.ACCOUNTBILLREC";
m["期末应收账款"] = "z.ACCOUNTBILLREC";
var m2 = `权益乘数 ＝ 资产总额/归属于母公司股东权益总额
营业利润利率=净利润/营业总收入
毛利=营业收入-营业支出
权益乘数=1/(1-资产负债率)
资产负债率 = 负债总额 / 期末总资产
净利率=净利润/营业收入
期末净资产=期末总资产-负债总额
期初净资产=期初总资产-期初负债总额
总资产周转率 = 营业总收入 / (( 期初总资产 + 期末总资产) / 2)
平均总资产=(期初总资产 + 期末总资产)/2
存货总额=平均存货总额
平均存货总额=(期初存货总额 + 期末存货总额)/2
期初期末应付账款平均值=(期初应付账款 + 期末应付账款)/2
平均应收账款=(期初应收账款 + 期末应收账款)/2
应收帐款周转天数=应收款项周转天数
本期主营业务收入=营业收入
上期主营业务收入=lr2.OPERATEREVE
上期主要业务收入=上期主营业务收入
`
  .trim()
  .split(/\n/)
  .reduce((r, ar) => {
    var a = ar.split(/=|＝/);
    var l = a[0].trim();
    var rr = a[1].trim();
    r[l] = rr;
    return r;
  }, {});
m = _.assign(m, m2);

function expf(nameExp) {
  let exp = nameExp;

  while (m[nameExp]) {
    exp = m[nameExp];
    // console.log(nameExp, "=", exp);
    nameExp = exp;
  }
  exp = exp
    .replace(/—/g, "-")
    .replace(/（/g, "(")
    .replace(/）/g, ")");
  if (exp.match(/[x\/*+—-]/)) {
    let r = exp.replace(regex, (a, i, exp, d) => {
      let exp2 = a.trim();
      // console.log("exp2:", exp2);
      if (m[a.trim()]) exp2 = a.trim();
      return expf(exp2);
    });

    //console.log(exp, "=", r);
    return `(${r})`;
  } else {
    return exp;
  }
}
//console.log(expf("净资本增长率"));

if (true)
  conf
    .map((e) => [
      e[1],

      expf(
        e[3]
          .split(/=|＝/)[0]
          .replace(/\(.*?\)/g, "")
          .trim()
      ),
    ])
    .filter((e) => e[1].match(regex))
    .map((e) => console.log(e[0], "=", e[1]));

if (false)
  conf
    .map((e) => [
      e[1],

      expf(
        e[3]
          .split(/=|＝/)[0]
          .replace(/\(.*?\)/g, "")
          .trim()
      ),
    ])
    .filter((e) => !e[1].match(regex))
    .map((e) => console.log(e[0], "=", e[1]));
if (false)
  (async () => {
    var ls = $("#alkey-yearly tbody tr")
      .toArray()
      .map((e) => {
        var tds = $(e).find("td");
        var ths = $(e).find("th");
        if (ths.length > 0) {
          ths.eq(0).text();
        }

        return [
          ths
            .eq(0)
            .text()
            .trim(),
          tds
            .eq(0)
            .text()
            .trim(),
          tds
            .eq(0)
            .find("a")
            .eq(0)[0].href,
        ];
      });
    for (var i = 0; i < ls.length; i++) {
      let resp = await $.get(ls[i][2]);
      let t = $(resp);
      let con = t.find(".card-content:contains(计算公式)");
      let formula = con
        .find("blockquote")
        .eq(0)
        .text()
        .trim();
      ls[i].push(formula);
      // ls[i].push(con.html());
    }
    let str = JSON.stringify(ls, null, 4);
    console.log(str);
  })();

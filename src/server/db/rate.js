import _ from "lodash";
import sqlFormatter from "sql-formatter";

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
    "应收款项周转天数 = 平均应收账款 * 365 / 销售收入",
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
    "固定资产周转率 = 产品销售收入净额 / 固定资产平均净值",
  ],
  [
    "",
    "完整生意周期(天)",
    "https://caibaoshuo.com/terms/000651/total_turnover_date",
    "完整生意周期 = 存货在库天数(平均销货日数)+ 平均收现日数",
  ],
  [
    "",
    "应付款项周转天数(天)",
    "https://caibaoshuo.com/terms/000651/ap_turnover_date",
    "应付款项周转天数 = 期初期末应付账款平均值 * 360 / 主营业务成本",
  ],
  [
    "",
    "缺钱天数(天)",
    "https://caibaoshuo.com/terms/000651/money_needed_date",
    "缺钱的天数(现金转换周期) = 做生意的完整周期 - 应付帐款付款天数",
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
    "净资产收益率 (ROE%)=  净利率 * 总资产周转率 * 杠杆倍数",
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
    "营收增长率 = (本期主营业务收入 - 上期主要业务收入)/ 上期主营业务收入",
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
    "净资本增长率 =(期末净资产 - 期初净资产)/ 期初净资产",
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
    "现金流量允当比率 = 最近5年度营业活动净现金流量 / (五年内购建+ (存货-五年前期初存货)+ 五年内分红)",
  ],
  [
    "",
    "现金再投资比率(%)",
    "https://caibaoshuo.com/terms/000651/cash_reinvestment_ratio",
    "现金再投资比率 = (营业活动净现金流量 - 筹资活动现金流出) / (总资产 - 流动负债)",
  ],
];

const conf2 = [
  [
    "资产",
    "现金与约当现金(%)",
    "https://caibaoshuo.com/terms/000651/cash_ratio",
    "现金与约当现金占总资产比率 = (现金+约当现金) /总资产",
  ],
  [
    "",
    "应收款项(%)",
    "https://caibaoshuo.com/terms/000651/receiv_ratio",
    "应收款项占总资产比率 = 应收款项 / 总资产",
  ],
  [
    "",
    "存货(%)",
    "https://caibaoshuo.com/terms/000651/inventories_ratio",
    "存货占总资产比率 = 存货 / 总资产",
  ],
  [
    "",
    "其他流动资产(%)",
    "https://caibaoshuo.com/terms/000651/other_current_assets_ratio",
    "其他流动资产占总资产比率 = 其他流动资产 / 总资产",
  ],
  [
    "",
    "流动资产(%)",
    "https://caibaoshuo.com/terms/000651/tca_ratio",
    "流动资产占总资产比率 = 流动资产 / 总资产",
  ],
  [
    "",
    "商誉(%)",
    "https://caibaoshuo.com/terms/000651/goodwill_ratio",
    "商誉比率 = 商誉 / 总资产",
  ],
  [
    "",
    "非流动资产(%)",
    "https://caibaoshuo.com/terms/000651/tnca_ratio",
    "非流动资产占总资产比率 = 非流动资产 / 总资产",
  ],
  [
    "负债",
    "应付款项(%)",
    "https://caibaoshuo.com/terms/000651/ap_ratio",
    "应付款项占总资产比率 = 应付款项 / 总资产",
  ],
  [
    "",
    "流动负债(%)",
    "https://caibaoshuo.com/terms/000651/tcl_ratio",
    "流动负债总资产比率 = 流动负债 / 总资产",
  ],
  [
    "",
    "非流动负债(%)",
    "https://caibaoshuo.com/terms/000651/tncl_ratio",
    "非流动负债占总资产比率 = 非流动负债 / 总资产",
  ],
  [
    "股权",
    "股东权益(%)",
    "https://caibaoshuo.com/terms/000651/total_equity_ratio",
    "股东权益比率 = 股东权益 / 总资产",
  ],
];
const conf3 = [
  ["", "期初现金", false],
  [
    "",
    "+ 营业活动现金流量\n    \n    \n       (from 损益表)",
    "https://caibaoshuo.com/terms/000651/ocf",
    "",
  ],
  [
    "",
    "+ 投资活动现金流量\n    \n    \n       (from 资产负债表左)",
    "https://caibaoshuo.com/terms/000651/invest_cash_flow",
    "投资活动现金流量 = 购置物业、厂房、设备 + 出售物业、厂房、设备 + 购买业务  + 出售业务 + 购买投资 + 出售投资 + 无形资产购销净额 + 已终止投资活动的现金 + 其他投资活动的现金",
  ],
  [
    "",
    "+ 融资活动现金流量\n    \n    \n       (from 资产负债表右)",
    "https://caibaoshuo.com/terms/000651/finance_cash_flow",
    "融资活动现金流量 = 股票净发行 + 债务净发行 + 优先股净发行 + 股息现金流 + 其他融资",
  ],
  ["", "期末现金", false],
  [
    "",
    "自由现金流(FCF)",
    "https://caibaoshuo.com/terms/000651/free_cash_flow",
    "自由现金流(FCF) = 营业活动现金流量(OCF) - 资本支出",
  ],
];

conf = conf.concat(conf2);
var m = conf.reduce((r, ar) => {
  var a = ar[3].split(/=|=/);
  var l = a[0].trim();
  var rr = a[1].trim();
  r[l] = rr;
  return r;
}, {});

m = _.mapKeys(m, (v, k) => {
  return k.replace(/\(.*?\)/g, "").trim();
});

var m2 = `
code=lr.code
reportdate=lr.rreportdate
reporttype=lr.reporttype
typename=lr.typename
-- 利润表
营业总收入=lr.TOTALOPERATEREVE
营业收入 = 主营业务成本 = 销售收入=lr.OPERATEREVE
营业支出 = 营业成本 = 货物销售成本=lr.OPERATEEXP
净收益 = 净利润=lr.NETPROFIT
基本每股收益=lr.BASICEPS
本期主营业务收入=营业收入
上期主要业务收入=上期主营业务收入=lr2.OPERATEREVE
本年营业利润总额=lr.OPERATEPROFIT
上年营业利润总额=lr2.OPERATEPROFIT
利润总额=营业净利=营业利润=lr.SUMPROFIT
营业利润利率=净利润/营业总收入
毛利=营业收入-营业支出

-- 资产负债表
流动负债=流动负债总额
营业活动净现金流量=ll.NETOPERATECASHFLOW
筹资活动现金流出=ll.SUMFINAFLOWOUT
股东权益=z.SUMSHEQUITY
流动资产=z.SUMLASSET
非流动资产=z.SUMNONLASSET
非流动负债=z.SUMNONLLIAB
商誉=z.GOODWILL
其他流动资产=z.OTHERLASSET
应付款项=z.ACCOUNTBILLPAY
应收款项=z.ACCOUNTBILLREC
货币资金=z.MONETARYFUND
有价证券=z.FVALUEFASSET
现金=货币资金
约当现金=有价证券
流动资产总额=z.SUMLASSET
流动负债总额=z.SUMLLIAB
总资产=期末总资产=z.SUMLIABSHEQUITY
期初总资产=z2.SUMLIABSHEQUITY
归属于母公司股东的净利润=lr.PARENTNETPROFIT
负债 = 负债总额=z.SUMLIAB
期初负债总额=z2.SUMLIAB
存货 = 期末存货总额=z.INVENTORY
预付费用=z.ADVANCEPAY
利息费用=z.INTERESTPAY
期初存货总额=z2.INVENTORY
期初应付账款=z2.ACCOUNTBILLPAY
期末应付账款=z.ACCOUNTBILLPAY
期初应收账款=z2.ACCOUNTBILLREC
期末应收账款=z.ACCOUNTBILLREC
杠杆倍数=权益乘数=1/(1-资产负债率)
资产负债率 = 负债总额 / 期末总资产
净利率=营业利润利率*总资产周转率
期末净资产=期末总资产-负债总额
期初净资产=期初总资产-期初负债总额
总资产周转率 = 营业总收入 / (( 期初总资产 + 期末总资产) / 2)
平均总资产=(期初总资产 + 期末总资产)/2
存货总额=平均存货总额
存货=z.INVENTORY
平均存货总额=(期初存货总额 + 期末存货总额)/2
期初期末应付账款平均值=(期初应付账款 + 期末应付账款)/2
平均应收账款=(期初应收账款 + 期末应收账款)/2
应收帐款周转天数=应收款项周转天数

--现金流表
营业活动现金流量=ll.NETOPERATECASHFLOW
投资活动现金流量=ll.NETINVCASHFLOW
融资活动现金流量=ll.NETFINACASHFLOW
`
  .trim()
  .split(/\n/)
  .filter((e) => e.indexOf("--") == -1)
  .reduce((r, line) => {
    var parts = line.split(/=/);
    var val = parts.pop();
    parts.forEach((v) => (r[v.trim()] = val.trim()));

    return r;
  }, {});

m2["五年内分红"] = `( select 
    sum(ifnull(l.DIVIPROFITORINTPAY,0) )
     from xjllb l where 
      l.reporttype=1
     and l.rreportdate<=ll.rreportdate
     and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
     )`;
m2["五年内处置"] = `( select 
      sum(ifnull(l.DISPFILASSETREC,0) )
       from xjllb l where 
       l.code = ll.code 
       and l.reporttype=ll.reporttype
       and l.rreportdate<=ll.rreportdate
       and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
       )`;
m2["五年内购建"] = `( select 
        sum(ifnull(l.CASHEQUIENDING,0) )
         from xjllb l where 
         l.code = ll.code 
         and l.reporttype=ll.reporttype
         and l.rreportdate<=ll.rreportdate
         and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
         )`;
m2["最近5年度营业活动净现金流量"] = `( select 
          sum(ifnull(l.CASHEQUIENDING,0) )
           from xjllb l where 
           l.code = ll.code 
           and l.reporttype=ll.reporttype
           and l.rreportdate<=ll.rreportdate
           and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
           )`;
m2["五年前期初存货"] = `
           (select 
           z5.INVENTORY
           from zcfzb z5 
           where z5.code=ll.code 
           and z5.REPORTDATE = DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
           ) `;
m = _.assign(m, m2);

const itemRegex = /([^\x00-\x7F]+\d*)+/g;
function loopRun(map, arr, exist) {
  if (!map) return null;
  if (!arr) arr = [];
  if (!exist) exist = [];

  if (arr.length == 0) {
    let select = _.omit(
      map,
      _.toPairs(map)
        .filter((e) => e[1].match(itemRegex))
        .map((e) => e[0])
    );

    arr.push(select);
    _.defaults(exist, select);
    return loopRun(map, arr, exist);
  } else {
    let select = _.toPairs(_.omit(map, Object.keys(exist))).filter((e) => {
      let matches = e[1].match(itemRegex);
      if (matches) {
        return matches.filter((a) => exist[a]).length == matches.length;
      }
      return false;
    });
    if (select.length == 0) {
      let stil = _.omit(map, Object.keys(exist));
      _.toPairs(stil).length > 0 && console.warn("below not fould:");

      _.toPairs(stil).forEach((e) => {
        let matches = e[1].match(itemRegex);
        if (matches) {
          let notFindList = matches.filter((a) => !exist[a]);
          if (notFindList.length > 0) {
            console.warn(
              e[0],
              "=",
              e[1],
              "**missing** ",
              notFindList.join(",")
            );
          }
        }
      });
      return arr;
    }
    let result = _.pick(
      map,
      select.map((e) => e[0])
    );
    arr.push(result);
    _.defaults(exist, result);
    return loopRun(map, arr, exist);
  }
}

function gensql(arr, query, len) {
  let last = arr.pop();
  let sql = _.toPairs(last)
    .map(
      (e) =>
        `${e[1].replace(itemRegex, function(v) {
          return `\`${v}\``;
        })} "${e[0]}"`
    )
    .join(",\n");
  let id = arr.length;
  if (arr.length == 0) {
    return `select ${sql} from ${query}  `;
  }
  return `select t${id}.*,${sql} from (${gensql(
    arr,
    query,
    len || arr.length
  )}) t${id} `;
}

function wrapFmt(arr, sql) {
  let cols = arr.reduce((arr, a) => {
    return arr.concat(Object.keys(a));
  }, []);

  let wrapSelects = cols
    .map((e) => (e.match(itemRegex) ? `fmt(\`${e}\`) "${e}"` : e))
    .join(",");

  return `select ${wrapSelects} from (${sql}) w`;
}
console.log(
  sqlFormatter.format(
    `create or replace view v_summary as ` +
      wrapFmt(
        loopRun(m),
        gensql(
          loopRun(m),
          `  
lrb lr
left join lrb lr2 on lr2.code=lr.code and lr2.rreportdate=lr.preportdate and lr2.reporttype=lr.reporttype

left join zcfzb z on z.code = lr.code
and z.reportdate = lr.rreportdate

left join zcfzb z2 on   z2.code =lr.code
and z2.reportdate = lr.preportdate

left join xjllb ll on ll.code = lr.code
and ll.rreportdate = lr.rreportdate
and ll.reporttype=lr.reporttype

left join xjllb ll2 on ll2.code = lr.code
and ll2.rreportdate=lr2.rreportdate and ll2.reporttype=lr2.reporttype

where
lr.reporttype = 1`
        )
      )
  )
);

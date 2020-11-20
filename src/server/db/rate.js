import _ from "lodash";
import sqlFormatter from "sql-formatter";
import fs from "fs";
const { db } = require("./db");
const viewId = "root";

var indexItems = [
  ["财务结构", "负债占资产比率(%)", "<0.6", "负债占资产比率 = 负债 / 总资产"],
  [
    "",
    "长期资金占重资产比率(%)",
    ">1",
    "长期资金占重资产比率 = (股东权益+其他长期负债) / (固定资产 + 在建工程)",
  ],
  ["偿债能力", "流动比率(%)", ">3", "流动比率 = 流动资产总额 / 流动负债总额"],
  [
    "",
    "速动比率(%)",
    ">=1.5",
    "速动比率 = ( 流动资产总额 - 存货 - 预付费用 ) / 流动负债总额",
  ],
  ["", "利息保障倍数", "", "利息保障倍数 = 营业净利 / 利息费用"],
  [
    "运营能力",
    "应收款项周转率(次/年)",
    "",
    "应收款项周转率 = 365 / 应收帐款周转天数",
  ],
  [
    "",
    "应收款项周转天数(天)",
    "",
    "应收款项周转天数 = 平均应收账款 * 365 / 销售收入",
  ],
  ["", "存货周转率(次/年)", "", "存货周转率 = 货物销售成本 / 存货总额"],
  ["", "存货周转天数(天)", "", "存货周转天数 = 365 / 存货周转率"],
  [
    "",
    "固定资产周转率(次/年)",
    "",
    "固定资产周转率 = 产品销售收入净额 / 固定资产平均净值",
  ],
  [
    "",
    "完整生意周期(天)",
    "",
    "完整生意周期 = 存货在库天数(平均销货日数)+ 平均收现日数",
  ],
  [
    "",
    "应付款项周转天数(天)",
    "",
    "应付款项周转天数 = 期初期末应付账款平均值 * 360 / 主营业务成本",
  ],
  [
    "",
    "缺钱天数(天)",
    "",
    "缺钱的天数(现金转换周期) = 做生意的完整周期 - 应付帐款付款天数",
  ],
  [
    "",
    "总资产周转率(次/年)",
    "",
    "资产周转率   = 销售收入 / 平均总资产  \n   = 销售收入 / ((期初资产 + 期末资产)/2)",
  ],
  [
    "盈利能力",
    "ROA=资产收益率(%)",
    "",
    "资产回报率(%)   \n    = 净收益 /   平均总资产\n    \n\n    = 净收益 / ((期初资产 + 期末资产)/2)",
  ],
  [
    "",
    "ROE=净资产收益率(%)",
    "",
    "净资产收益率 (ROE%)=  净利率 * 总资产周转率 * 杠杆倍数",
  ],
  [
    "",
    "ROIC=资本回报率(%)",
    "",
    "资本回报率 (ROIC%)\n    \n    \n    = 息税前利润 * (1 - 税率) / 投入资本",
  ],
  [
    "",
    "税前纯益占实收资本(%)",
    "",
    "税前纯益占实收资本比率\n    = 税前纯益 / 总股本\n    = (营业利润 + 营业外收入 - 营业外支出) / 总股本",
  ],
  ["", "毛利率(%)", "", "毛利率(%) = 毛利 / 营业收入"],
  ["", "营业利润率(%)", "", "营业利润率 = 营业利润 / 营业收入"],
  ["", "净利率(%)", "", "净利率(%) = 净收入 / 收入"],
  ["", "营业费用率(%)", "", "营业费用率 = 营业费用 / 营业收入"],
  ["", "经营安全边际率(%)", "", "经营安全边际率 = 营业利润率 / 毛利率"],
  [
    "",
    "EPS=基本每股收益(元)",
    "",
    "基本每股收益(元) (EPS) = (净收入 - 优先股息) / 已发行股份基本平均数",
  ],
  [
    "成长能力",
    "营收增长率(%)",
    ">0",
    "营收增长率 = (本期主营业务收入 - 上期主要业务收入)/ 上期主营业务收入",
  ],
  [
    "",
    "营业利润增长率(%)",
    ">0",
    "营业利润增长率 = (本年营业利润总额 - 上年营业利润总额) / 上年营业利润总额",
  ],
  [
    "",
    "净资本增长率(%)",
    "",
    "净资本增长率 =(期末净资产 - 期初净资产)/ 期初净资产",
  ],
  [
    "现金流量",
    "现金流量比率(%)",
    ">1",
    "现金流量比率 = 营业活动净现金流量 / 流动负债",
    `分子：营业活动现金流量表示的是一家公司从利润表上的净利扎扎实实的转化为公司的现金。
    分母：流动负债”又叫“短期负债，是指将在1年(含1年)内需要偿还的债务。
    所以，现金流量比率指标用于分析公司真正赚回来的现金是否足以偿还对外的短期负债。
    因为公司最怕抽银根，所以短期负债一定要确认可以偿还。
    现金流量比率>100%比较好，代表公司赚回来的现金比较多，对外负债比较少，公司赚回来的现金已经够偿还短期负债。`,
  ],
  [
    "",
    "现金流量允当比率(%)",
    ">=1",
    "现金流量允当比率 = 最近5年度营业活动净现金流量 / (五年内购建+ (存货-五年前期初存货)+ 五年内分红)",
    `现金流量允当比率用来分析：公司最近五年赚的钱是否足够支撑最近五年公司成长所需。
    在这个指标中，为什么要用5年的数据，因为基本上5年是一个经济周期。
    现金流量允当比率 > 100%比较好，表示公司最近5个年度自己所赚的钱已经够用，不太需要看银行或股东的脸色`,
  ],
  [
    "",
    "现金再投资比率(%)",
    "",
    "现金再投资比率 = (营业活动净现金流量 - 筹资活动现金流出) / (总资产 - 流动负债)",
    `现金再投资比率：用于分析公司靠自己日常营运实力赚来的钱（营业活动现金流量）扣除掉给股东现金股利，公司最后自己手上留下来的钱，用于再投资的能力。这个指标大于10%比较好。`,
  ],

  [
    "",
    "现金占总资产比率(%)",
    ">0.2",
    "现金占总资产比率 = (现金+约当现金) /总资产",
    `在公司的总资产中，要保持有足够比例的现金。这样即使发生景气波动，也可以顺利度过。
    现金占总资产比率指标，一般来说要在10%~25%之间，如果是烧钱的行业（资本密集型行业），要大于25%。
    在现金流量指标中，现金占总资产比率所占的权重最高，达到70%`,
  ],
  [
    "资产",
    "现金占总资产比率(%)",
    ">0.2",
    "现金占总资产比率 = (现金+约当现金) /总资产",
    `在公司的总资产中，要保持有足够比例的现金。这样即使发生景气波动，也可以顺利度过。
    现金占总资产比率指标，一般来说要在10%~25%之间，如果是烧钱的行业（资本密集型行业），要大于25%。
    在现金流量指标中，现金占总资产比率所占的权重最高，达到70%`,
  ],
  ["", "应收款项(%)", "", "应收款项占总资产比率 = 应收款项 / 总资产"],
  ["", "存货(%)", "", "存货占总资产比率 = 存货 / 总资产"],
  [
    "",
    "其他流动资产(%)",
    "",
    "其他流动资产占总资产比率 = 其他流动资产 / 总资产",
  ],
  ["", "流动资产(%)", "", "流动资产占总资产比率 = 流动资产 / 总资产"],
  ["", "商誉(%)", "", "商誉比率 = 商誉 / 总资产"],
  ["", "非流动资产(%)", "", "非流动资产占总资产比率 = 非流动资产 / 总资产"],
  ["负债", "应付款项(%)", "", "应付款项占总资产比率 = 应付款项 / 总资产"],
  ["", "流动负债(%)", "", "流动负债总资产比率 = 流动负债 / 总资产"],
  ["", "非流动负债(%)", "", "非流动负债占总资产比率 = 非流动负债 / 总资产"],
  ["股权", "股东权益(%)", "", "股东权益比率 = 股东权益 / 总资产"],
];

var itemMap = indexItems.reduce((m, row) => {
  var formulaContent = row[3].split(/=/);
  var left = formulaContent[0]
    .trim()
    .replace(/\(.*?\)/g, "")
    .trim();
  var right = formulaContent[1].trim();

  m[left] = right;

  if (row[2] && row[2].trim()) {
    var indicator = `_${left}`;

    m[indicator] = ((row[2].indexOf("_") == -1 ? "_" : "") + row[2]).replace(
      /_/g,
      left
    );
  }

  return m;
}, {});

var midItemMap = `
code=lr.code
reportdate=lr.rreportdate
reporttype=lr.reporttype
typename=lr.typename
-- 利润表
营业总收入=lr.TOTALOPERATEREVE
营业收入 = 主营业务成本 = 销售收入=lr.OPERATEREVE
营业支出 = 营业成本 = 货物销售成本=lr.OPERATEEXP
净收益 = 净利润=lr.NETPROFIT
上期净利润=lr2.NETPROFIT
基本每股收益=lr.BASICEPS
本期主营业务收入=营业收入
上期主要业务收入=上期主营业务收入=lr2.OPERATEREVE
本年营业利润总额=lr.OPERATEPROFIT
上年营业利润总额=lr2.OPERATEPROFIT
利润总额=营业净利=营业利润=lr.SUMPROFIT
营业利润利率=净利润/营业总收入
毛利=营业收入-营业支出
利润增长率=((净利润-上期净利润)/上期净利润)

-- 资产负债表
流动负债=流动负债总额
营业活动净现金流量=ll.NETOPERATECASHFLOW
筹资活动现金流出=ll.SUMFINAFLOWOUT
股东权益=z.SUMSHEQUITY
流动资产=z.SUMLASSET
非流动资产=z.SUMNONLASSET
非流动负债=z.SUMNONLLIAB
商誉=ifnull(z.GOODWILL,0)
其他流动资产=z.OTHERLASSET
应付款项=z.ACCOUNTBILLPAY
应收款项=z.ACCOUNTBILLREC
货币资金=z.MONETARYFUND
有价证券=ifnull(z.FVALUEFASSET,0)
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
净利率=净利润/营业收入
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
--其他
归母收益总额=lr.PARENTCINCOME
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

midItemMap["五年内分红"] = `( select 
    sum(ifnull(l.DIVIPROFITORINTPAY,0) )
     from xjllb l where 
      l.reporttype=1
     and l.rreportdate<=ll.rreportdate
     and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
     )`;
midItemMap["五年内处置"] = `( select 
      sum(ifnull(l.DISPFILASSETREC,0) )
       from xjllb l where 
       l.code = ll.code 
       and l.reporttype=ll.reporttype
       and l.rreportdate<=ll.rreportdate
       and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
       )`;
midItemMap["五年内购建"] = `( select 
        sum(ifnull(l.CASHEQUIENDING,0) )
         from xjllb l where 
         l.code = ll.code 
         and l.reporttype=ll.reporttype
         and l.rreportdate<=ll.rreportdate
         and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
         )`;
midItemMap["最近5年度营业活动净现金流量"] = `( select 
          sum(ifnull(l.CASHEQUIENDING,0) )
           from xjllb l where 
           l.code = ll.code 
           and l.reporttype=ll.reporttype
           and l.rreportdate<=ll.rreportdate
           and l.rreportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
           )`;
midItemMap["五年前期初存货"] = `
           (select 
           z5.INVENTORY
           from zcfzb z5 
           where z5.code=ll.code 
           and z5.REPORTDATE = DATE_FORMAT(DATE_SUB(STR_TO_DATE(ll.rreportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
           ) `;
midItemMap["总市值"] = `(select zsz from hq where code =lr.code)`;
_.assign(itemMap, midItemMap);

/*(async () => {
  let rows = _.toPairs(m2).map((e) => {
    return { code: e[0],type:'f',parent:'', val: e[1], enalbe: 1 };
  });
  rows.push(
    [{code:'财务分析',parent:null,val:null,tip:'',score:10,cal_exp:''},
    {code:'财务结构',parent:'财务分析',val:null,tip:'',score:10,cal_exp:''},
    {code:'负债占资产比率',parent:'财务结构',val:'负债 / 总资产',tip:'',score:10,cal_exp:''}   
  ]);
  let model = await ifNoExistGenModel(
    rows,
    "formula",
    {},
    ["code"],
    "formula",
    {}
  );
  await model.bulkCreate(rows, {
    updateOnDuplicate: Object.keys(rows[0]),
    logging: false,
  });
})();*/
const itemRegex = /([^\s\.\+\-\*\/><=\(\)\d]+\d*)+/g;
function toLevelItems(map, arr, exist) {
  if (!map) return null;
  if (!arr) arr = [];
  if (!exist) exist = {};

  if (arr.length == 0) {
    let select = _.pick(
      map,
      _.toPairs(map)
        .filter((e) => isFirstElement(e[1]))
        .map((e) => e[0])
    );

    arr.push(select);
    _.defaults(exist, select);
    return toLevelItems(_.omit(map, Object.keys(select)), arr, exist);
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
    return toLevelItems(_.omit(map, Object.keys(result)), arr, exist);
  }
}

function isFirstElement(content) {
  return content.indexOf("\n") > -1 || content.match(/[a-z]+\d*\./i);
}

let levelItemsMap = toLevelItems(itemMap);

function getchildnodes(node) {
  let nodes = [];
  if (itemMap[node.alias]) {
    let content = itemMap[node.alias];
    let pnode = {};
    pnode.id = ++id;
    pnode.alias = pnode.topic = content;
    pnode.parentid = node.id;
    nodes.push(pnode);
    let matchs = !isFirstElement(content) && content.match(itemRegex);
    if (matchs) {
      matchs = _.uniq(matchs);
      let i = matchs.length;
      while (i-- > 0) {
        let cnode = {};
        if (pnode.topic == matchs[i]) cnode = pnode;
        else {
          cnode.id = ++id;
          cnode.topic = cnode.alias = matchs[i];
          cnode.parentid = pnode.id;
          nodes.push(cnode);
        }
        nodes = nodes.concat(getchildnodes(cnode));
      }
    }
  }
  return nodes;
}
let id = 0;
function getTrees(conf) {
  let trees = [];
  let tree = [{ id: "root", isroot: true, topic: "财务分析" }];
  trees.push(tree);
  let cat = "";
  let pid;
  for (let row of conf) {
    cat = row[0] || cat;
    if (row[0]) {
      pid = ++id;
      if (cat.startsWith("@")) {
        let subroot = {
          id: pid,
          parentid: "root",
          topic: cat,
          subTree: 1,
        };
        tree.push(subroot);
        tree = [subroot];
        trees.push(tree);
      } else {
        let catnode = {};
        catnode.id = pid;
        catnode.topic = cat;
        catnode.direction = "right";
        catnode.parentid = "root";
        tree.push(catnode);
      }
    }
    let name = row[1];
    let alias = row[3]
      .split(/=|=/)[0]
      .replace(/\(.*?\)/g, "")
      .trim();

    let node = {};
    node.id = ++id;
    node.topic = name;
    node.parentid = pid;
    node.alias = alias;
    node.tip = row[4];

    let childnodes = getchildnodes(node);

    tree.push(node);
    tree.push(...childnodes);
  }

  return trees.map((e) => e.filter((e) => e.topic.match(itemRegex)));
}

getTrees(indexItems).map((tree) => {
  fs.writeFileSync(
    `/Users/alexwang/git/electron-suspension/static/${tree[0].id}.json`,
    JSON.stringify(tree, null, 4)
  );
});

function wrapFmt(arr, sql) {
  let cols = arr.reduce((arr, a) => {
    return arr.concat(Object.keys(a));
  }, []);

  let wrapSelects = cols
    .map((e) => (e.match(itemRegex) ? `fmt(\`${e}\`) "${e}"` : e))
    .join(",");

  return `select ${wrapSelects} from (${sql}) w`;
}

function genSQL(levelMapArr, fromSQL, len) {
  let last = levelMapArr.pop();
  let sql = _.toPairs(last)
    .map(
      (e) =>
        `${
          isFirstElement(e[1])
            ? e[1]
            : e[1].replace(itemRegex, function(v) {
                return `\`${v}\``;
              })
        } "${e[0]}"`
    )
    .join(",\n");
  let id = levelMapArr.length;
  if (levelMapArr.length == 0) {
    return `select ${sql}  ${fromSQL}  `;
  }
  return `select t${id}.*,${sql} from (${genSQL(
    levelMapArr,
    fromSQL,
    len || levelMapArr.length
  )}) t${id} `;
}
let sql = sqlFormatter.format(
  `create or replace view v_${viewId} as ` +
    (levelItemsMap,
    genSQL(
      levelItemsMap,
      `  
      from 
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
    ))
);

console.log(sql);
db.query(sql);

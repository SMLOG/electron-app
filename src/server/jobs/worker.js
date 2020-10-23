import fs from "fs";

import { CONFIG_DIR } from "../config";
import _ from "lodash";
import { decompressToMapList } from "../lib/keymap";
import { getList } from "../TechMan";
import { ifNoExistGenModel } from "../db/utils";
import { getLastReportDate, prevReportDate } from "../lib/util";

const defGetOptions = function(k) {
  return [
    { reportDate: getLastReportDate() },
    { reportDate: prevReportDate() },
  ];
};
export const JOB_MAP = {
  预约披露日期列表: {
    alias: "预披露日",
    file: "job-yy预约披露日期列表.json",
    key: "SECURITY_CODE",
    tableName: "yyplrq",
    enable: true,
    getOptions: defGetOptions,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      FIRST_APPOINT_DATE: "首次预约时间",
      FIRST_CHANGE_DATE: "一次变更时间",
      SECOND_CHANGE_DATE: "二次变更时间",
      THIRD_CHANGE_DATE: "三次变更时间",
      ACTUAL_PUBLISH_DATE: "实际披露时间",
    },
    url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_BS_APPOIN&sty=ALL&p={page}&ps=500&st=FIRST_APPOINT_DATE,SECURITY_CODE&sr=1,1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}`,
  },
  业绩: {
    file: "job-yj业绩.json",
    key: "SECURITY_CODE",
    tableName: "yj",
    enable: true,
    getOptions: defGetOptions,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      BASIC_EPS: "每股收益",
      TOTAL_OPERATE_INCOME: "营业收入",
      YSTZ: "营业收入同比增长",
      YSHZ: "季度环比增长",
      PARENT_NETPROFIT: "净利润",
      SJLTZ: "净利润同比增长",
      SJLHZ: "季度环比增长",
      BPS: "每股净资产",
      WEIGHTAVG_ROE: "净资产收益率",
      MGJYXJJE: "每股现金流量",
      XSMLL: "销售毛利率",
      ASSIGNDSCRPT: "利润分配",
      PUBLISHNAME: "所属行业",
      UPDATE_DATE: "公告日期",
    },
    url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_LICO_FN_CPD&sty=ALL&p={page}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORTDATE=%27{reportDate}%27)&rt={timestamp}`,
  },
  业绩快报: {
    file: "job-kb业绩快报.json",
    key: "SECURITY_CODE",
    tableName: "yjkb",
    alias: "快报",
    enable: true,
    getOptions: defGetOptions,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      BASIC_EPS: "每股收益",
      TOTAL_OPERATE_INCOME: "营业收入",
      TOTAL_OPERATE_INCOME_SQ: "去年同期营业收入",
      YSTZ: "营业收入同比增长",
      DJDYSHZ: "季度环比增长",
      PARENT_NETPROFIT: "净利润",
      PARENT_NETPROFIT_SQ: "净利润去年同期",
      JLRTBZCL: "净利润同比增长",
      DJDJLHZ: "季度环比增长",
      PARENT_BVPS: "每股净资产",
      WEIGHTAVG_ROE: "净资产收益率",
      PUBLISHNAME: "所属行业",
      UPDATE_DATE: "公告日期",
    },
    url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_FCI_PERFORMANCEE&sty=ALL&p={page}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}`,
  },
  业绩预告: {
    file: "job-yg业绩预告.json",
    key: "SECURITY_CODE",
    alias: "预告",
    tableName: "yjyg",
    enable: true,
    getOptions: defGetOptions,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      FORECASTL: "预计净利润",
      INCREASEL: "业绩变动幅度",
      FORECASTTYPE: "预告类型",
      YEAREARLIER: "上年同期净利润",
      NOTICE_DATE: "公告日期",
    },
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_OP_PREDICT&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORTDATE=%27{reportDate}%27)(IsLatest=%22T%22)&rt={timestamp}",
  },
  资产负债表: {
    file: "job-zcfz资产负债表.json",
    key: "SECURITY_CODE",
    alias: "负债",
    tableName: "zcfz",
    enable: true,
    getOptions: defGetOptions,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      TOTAL_ASSETS: "资产总计(元)",
      TOTAL_ASSETS_RATIO: "总资产同比(%)",
      CASH_DEPOSIT_PBC: "存放中央银行款项</br>(元)",
      LOAN_ADVANCE: "发放贷款及垫款(元)",
      AVAILABLE_SALE_FINASSET: "可供出售金融资产(元)",
      LOAN_PBC: "向中央银行借款(元)",
      ACCEPT_DEPOSIT: "吸收存款(元)",
      SELL_REPO_FINASSET: "卖出回购金融资产款(元)",
      MONETARYFUNDS: '"货币资金(元)',
      SETTLE_EXCESS_RESERVE: "结算备付金(元)",
      AVAILABLE_SALE_FINASSET: "可供出售金融资产(元)",
      BORROW_FUND: "拆入资金(元)",
      SELL_REPO_FINASSET: "卖出回购金融资产款(元)",
      AGENT_TRADE_SECURITY: "代理买卖证券款(元)",
      MONETARYFUNDS: '"货币资金(元)',
      PREMIUM_RECE: "应收保费(元))",
      AVAILABLE_SALE_FINASSET: "可供出售金融资产(元)",
      SHORT_LOAN: "短期借款(元)",
      SELL_REPO_FINASSET: "卖出回购金融资产款(元)",
      ADVANCE_PREMIUM: "预收保费(元)",
      MONETARYFUNDS: '"货币资金(元)',
      ACCOUNTS_RECE: "应收账款(元)",
      INVENTORY: "存货(元)",
      ACCOUNTS_PAYABLE: "应付账款(元)",
      ADVANCE_RECEIVABLES: "预收账款(元)   ",
      TOTAL_LIABILITIES: "负债总计(元)",
      TOTAL_LIAB_RATIO: "总负债同比(%)",
      DEBT_ASSET_RATIO: "资产负债率(%)",
      TOTAL_EQUITY: "所有者权益合计(元)",
      TOTAL_LIABILITIES: "负债总计(元)",
      TOTAL_LIAB_RATIO: "总负债同比(%)",
      DEBT_ASSET_RATIO: "资产负债率(%)",
      TOTAL_EQUITY: "所有者权益合计(元)",
      NOTICE_DATE: "公告日期",
    },
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_DMSK_FN_BALANCE&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}",
  },
  利润表: {
    file: "job-lr利润表.json",
    key: "SECURITY_CODE",
    tableName: "lr",
    getOptions: defGetOptions,
    enable: true,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      PARENT_NETPROFIT: "归母净利润(元)",
      PARENT_NETPROFIT_RATIO: "净利润同比(%)",
      INTEREST_NI: "利息净收入(元)",
      FEE_COMMISSION_NI: "手续费及佣金净收入(元)",
      OPERATE_INCOME: "营业总收入(元)",
      TOI_RATIO: "营业总收入同比(%)",
      OPERATE_TAX_ADD: "营业税</br>金及附</br>加(元)",
      MANAGE_EXPENSE_BANK: "管理费用(元)",
      OPERATE_EXPENSE: "营业总支出(元)",
      INTEREST_NI: "利息净收入(元)",
      FEE_COMMISSION_NI: "手续费及佣金净收入(元)",
      TOTAL_OPERATE_INCOME: "营业总收入(元)",
      TOI_RATIO: "营业总收入同比(%)",
      OPERATE_TAX_ADD: "营业税</br>金及附</br>加(元)",
      MANAGE_EXPENSE: "管理费用(元)",
      TOTAL_OPERATE_COST: "营业总支出(元) ",
      EARNED_PREMIUM: "已赚保费(元)",
      INVEST_INCOME: "投资收益(元)",
      OPERATE_INCOME: "营业总收入(元)",
      TOI_RATIO: "营业总收入同比(%)",
      SURRENDER_VALUE: "退保金(元)",
      COMPENSATE_EXPENSE: "赔付支出(元)",
      OPERATE_EXPENSE: "营业总支出(元)",
      TOTAL_OPERATE_INCOME: "营业总收入(元)",
      TOI_RATIO: "营业总收入同比(%)",
      OPERATE_COST: "营业支出(元)",
      SALE_EXPENSE: "销售费用(元)",
      MANAGE_EXPENSE: "管理费用(元)",
      FINANCE_EXPENSE: "财务费用(元)  ",
      TOTAL_OPERATE_COST: "营业总支出(元)",
      OPERATE_PROFIT: "营业利润(元)",
      TOTAL_PROFIT: "利润总额(元)",
      NOTICE_DATE: "公告日期",
    },
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_DMSK_FN_INCOME&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}",
  },
  现金流量表: {
    file: "job-xjll现金流量表.json",
    key: "SECURITY_CODE",
    tableName: "xjll",
    getOptions: defGetOptions,
    enable: true,
    keymap: {
      SECURITY_CODE: "代码",
      SECURITY_NAME_ABBR: "名称",
      CCE_ADD: "净现金流(元)",
      CCE_ADD_RATIO: "同比增长(%)",
      NETCASH_OPERATE: "经营性现金流现金流量净额(元)",
      NETCASH_OPERATE_RATIO: "净现金流占比(%)",
      NETCASH_INVEST: "投资性现金流现金流量净额(元)",
      NETCASH_INVEST_RATIO: "净现金流占比(%)",
      NETCASH_FINANCE: "融资性现金流现金流量净额(元)",
      NETCASH_FINANCE_RATIO: "净现金流占比(%)  ",
      NOTICE_DATE: "公告日期",
    },
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_DMSK_FN_CASHFLOW&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}",
  },
  股东数: {
    file: "job-gd股东数.json",
    key: "SecurityCode",
    pks: ["SecurityCode", "NoticeDate"],
    tableName: "gds",
    getOptions: defGetOptions,
    enable: true,
    keymap: {
      SECURITYCODE: "代码",
    },
    url:
      "http://data.eastmoney.com/DataCenter_V3/gdhs/GetList.ashx?reportdate={reportDate}&market=&changerate==&range==&pagesize=500&page={page}&sortRule=-1&sortType=NoticeDate&js=var%20{var}&param=&rt={timestamp}",
  },
  估值: {
    file: "job-gz估值.json",
    key: "SECURITYCODE",
    tableName: "gz",
    enable: true,
    getOptions: function(k) {
      return [{ today: "2020-10-22" }];
    },
    keymap: {
      SECURITYCODE: "代码",
      SName: "股票简称 ",
      CHG: "最新价",
      CHG: "涨跌幅",
      HYName: "所属行业",
      PE: "行业平均PE(动态)",
      TRADEDATE: "数据日期",
      NEW: "当日收盘价<br/>(元)",
      CHG: "当日涨跌幅<br/>(%)",
      ZSZ: "总市值(元)",
      AGSZBHXS: "流通市值(元)",
      ZGB: "总股本(股)",
      LTAG: "流通股本",
      PE9: "PE(TTM)",
      PE7: "PE(静)",
      PB8: "市净率",
      PEG1: "PEG值",
      PCFJYXJL9: "市现率",
      PS9: "市销率",
    },
    url:
      "http://dcfm.eastmoney.com/EM_MutiSvcExpandInterface/api/js/get?type=GZFX_GGZB&token=894050c76af8597a853f5b408b759f5d&st=TRADEDATE&sr=-1&p={page}&ps=500&js=var%20{var}={pages:(tp),data:(x),font:(font)}&filter=(TRADEDATE=^{today}^)&rt={timestamp}",
  },
  公告: {
    file: "job-gg.json",
    key: "stock_code",
    tableName: "notice",
    pks: ["ann_type", "stock_code", "art_code"],
    enable: true,
    getOptions: function(k) {
      return [{ today: "2020-10-22" }];
    },
    mapValues: function(datas) {
      return datas.map((data) => {
        let row = _.merge({}, data, data.codes[0], data.columns[0]);
        _.unset(row, "codes");
        _.unset(row, "columns");
        return row;
      });
    },
    keymap: {},
    url:
      "http://data.eastmoney.com/notices/getdata.ashx?StockCode=&FirstNodeType=0&CodeType=A&PageIndex={page}&PageSize=50&jsObj={var}&SecNodeType=0&Time={today}&rt={timestamp}",
  },
  行情: {
    key: "code",
    tableName: "hq",
    pks: ["code"],
    _cronTime: "*/1 * 9-12 * * *",
    get: async function(options) {
      let rows = await getList();

      for (let i = 0; i < rows.length; i++) {
        let row = _.mapValues(rows[i], (v, k) => {
          return v == "-" || v == "" || (isNaN(v) && v.toString() == "NaN")
            ? null
            : v;
        });
        rows[i] = row;
        // console.log(row);
        // await model.upsert(row);
      }
      return rows;
    },
  },
};

/*(async () => {
  await JOB_MAP["行情"].get();
})();*/
export function load(type) {
  let file = `${CONFIG_DIR}/${type.file}`;
  if (fs.existsSync(file)) {
    let arr = JSON.parse(fs.readFileSync(file));
    return decompressToMapList(arr);
  } else return {};
}

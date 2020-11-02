import fs from "fs";
import moment from "moment";
import { CONFIG_DIR } from "../config";
import _ from "lodash";
import { decompressToMapList } from "../lib/keymap";
import { getList } from "../TechMan";
import { ifNoExistGenModel } from "../db/utils";
import {
  getLastReportDate,
  prevReportDate,
  getLastNReportDates,
} from "../lib/util";
import { tableName } from "../db/model/Yj";

const defGetOptions = function() {
  return [
    { reportDate: getLastReportDate() },
    { reportDate: prevReportDate() },
  ];
};
export const JOB_MAP = {
  自选: {
    key: "code",
    tableName: "my",
    pks: ["code"],
    enable: false,
    get: function(options) {
      return [{ code: "sh6000001" }];
    },
  },
  urls: {
    tableName: "urls",
    enable: false,
    pks: ["url", "params"],
    get: function(options) {
      return [
        {
          job: "sh6000001",
          url: "a".repeat(500),
          params: "a".repeat(255),
          status: 0,
          udate: new Date(),
        },
      ];
    },
  },
  job: {
    tableName: "job",
    pks: ["jobname"],
    enable: false,
    get: function(options) {
      return [{ jobname: "sh6000001", runtime: new Date(), status: 0 }];
    },
  },
  股东增减持: {
    key: "SCode",
    tableName: "gdzjc",
    pks: ["SCode", "NOTICEDATE", "ShareHdName"],
    jsonp: "jsonp",
    enable: true,
    fieldDefitions: {
      SCode: "STRING(10)",
    },
    getOptions: function() {
      return [{}];
    },
    mapValues(rows, options, rawDatas) {
      let fields = rawDatas.Data[0].FieldName.split(",");

      rows = rawDatas.Data[0].Data.map((r) => {
        let row = r.split("|").reduce((m, v, i) => {
          m[fields[i]] = v;
          return m;
        }, {});
        return row;
      });

      return { arr: rows, totalPage: rawDatas.Data[0].TotalPage };
    },
    url:
      "http://datainterface3.eastmoney.com/EM_DataCenter_V3/api/GDZC/GetGDZC?js=jsonp&pageSize=100&pageNum=1&tkn=eastmoney&cfg=gdzc&secucode=&fx=&sharehdname=&sortFields=BDJZ&sortDirec=1&startDate=&endDate=&p={page}&pageNo={page}&_={timestamp}",
  },
  解禁: {
    key: "gpdm",
    tableName: "xsjj",
    pks: ["gpdm", "ltsj", "xsglx"],
    keymap: {
      gpdm: "代码",
      sname: "股票简称",
      ltsj: "解禁时间",
      xsglx: "限售股类型",
      kjjsl: "解禁数量(股)",
      jjsl: "实际解禁数量(股)",
      jjsz: "实际解禁市值(万元)",
      zb: "占解禁前流通市值比",
      new: "解禁前一日收盘价",
      jjqesrzdf: "解禁前20涨跌幅",
      jjhesrzdf: "解禁后20涨跌幅",
    },
    enable: true,
    fieldDefitions: {
      gpdm: "STRING(10)",
      jjqesrzdf: "STRING(30)",
      jjhesrzdf: "STRING(30)",
    },
    getOptions: function() {
      return [{}];
    },
    mapValues(rows, options, rawDatas) {
      rows = rows.map((row) => {
        row = _.mapValues(row, (str) => {
          str = str.toString();
          var data = rawDatas.font.FontMapping;

          for (var i = 0; i < data.length; i++) {
            var re = new RegExp(data[i].code, "g");
            str = str.replace(re, data[i].value);
          }
          return str;
        });
        row.ltsj_date = row.ltsj.replace(/T00:00:00/, "");
        _.unset(row, "ltsj");

        let code = row.gpdm;
        if (code[0] * 1 == code[0])
          code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
        row.code = code;

        return row;
      });

      return rows;
    },
    url:
      "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?token=70f12f2f4f091e459a279469fe49eca5&st=ltsj&sr=1&p={page}&ps=100&type=XSJJ_NJ_PC&js=var%20{var}={pages:(tp),data:(x),font:(font)}&filter=(mkt=)(ltsj%3E=^2020-11-02^%20and%20ltsj%3C=^2022-11-02^)&rt={timestamp}",
  },
  大事: {
    key: "gpdm",
    tableName: "event",
    pks: ["gpdm", "sjlxz", "rq_date"],
    jsonp: "jsonp",
    enable: true,
    fieldDefitions: { gpdm: "STRING(10)", sjms: "STRING(255)" },
    mapValues: function(datas, options) {
      return datas.map((data) => {
        data.rq_date = data.rq.replace(/T00:00:00/, "");
        _.unset(data, "rq");
        let code = data.gpdm;
        if (code[0] * 1 == code[0])
          code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
        data.code = code;
        return data;
      });
    },
    getOptions: function() {},
    url:
      "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=GGSJ20_ZDGZ&token=70f12f2f4f091e459a279469fe49eca5&st=rq&sr=-1&ps=1000&p={page}&filter=(rq%3E=^2020-9-1^%20and%20rq%3C=^2020-12-31^)&callback={jsonp}&_={timestamp}",
  },
  预约披露日期列表: {
    alias: "预披露日",
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
    key: "SECURITY_CODE",
    tableName: "yj",
    enable: true,
    getOptions: () =>
      getLastNReportDates(1).map((e) => {
        return { reportDate: e };
      }),
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
    key: "SECURITYCODE",
    tableName: "gz",
    pks: ["TRADEDATE", "code"],
    enable: true,
    getOptions: function(k) {
      return _.range(0, 30).map((e) => {
        return {
          today: moment()
            .subtract(e, "days")
            .format("YYYY-MM-DD"),
        };
      });
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
    key: "stock_code",
    tableName: "notice",
    pks: ["ann_type", "code", "art_code", "notice_date"],
    enable: true,

    mapValues: function(datas, options) {
      return datas.map((data) => {
        let row = _.merge({}, data, data.codes[0], data.columns[0]);

        if (data.columns && data.columns.length > 0)
          row.type = data.columns[0].column_name;

        if (data.codes && data.codes.length > 0) {
          var temp = data.codes[0];
          if (data.codes.length > 1) {
            //多个股票信息的情况
            for (var i in data.codes) {
              if (data.codes[i].ann_type.split(",").indexOf("A") != -1) {
                temp = data.codes[i];
                break;
              }
            }
          }
          row.type_id = options.FirstNodeType;
          if (temp) {
            Object.assign(row, temp);
          }
        }
        row.code =
          (row.stock_code[0] == "6"
            ? "sh"
            : row.stock_code[0] == "0" || row.stock_code[0] == "3"
            ? "sz"
            : "") + row.stock_code;
        _.unset(row, "codes");
        _.unset(row, "columns");
        return row;
      });
    },
    keymap: {},
    getOptions: function(k) {
      let options = _.range(1, 8).map((e) => {
        return {
          FirstNodeType: e,
          date: moment()
            .add(1, "days")
            .format("YYYY-MM-DD"),
        };
      });
      return options;
    },
    url:
      "http://data.eastmoney.com/notices/getdata.ashx?StockCode=&FirstNodeType={FirstNodeType}&CodeType=A&PageIndex={page}&PageSize=100&jsObj={var}&SecNodeType=0&Time={date}&rt={timestamp}",
    //  url:
    //  "http://data.eastmoney.com/notices/getdata.ashx?StockCode=&FirstNodeType={FirstNodeType}&CodeType=A&PageIndex={page}&PageSize=50&jsObj={var}&SecNodeType=0&Time={today}&rt={timestamp}",
  },
  行情: {
    key: "code",
    tableName: "hq",
    pks: ["code"],
    minTime: 30000000,
    enable: true,
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
  let datas = await JOB_MAP["行情"].get();
  console.log(datas);
})();*/
export function load(type) {
  let file = `${CONFIG_DIR}/${type.file}`;
  if (fs.existsSync(file)) {
    let arr = JSON.parse(fs.readFileSync(file));
    return decompressToMapList(arr);
  } else return {};
}

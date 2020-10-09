import axios from "axios";
import fs from "fs";
import { fn } from "./lib/fn";
import { getLastReportDate } from "./lib/util";

import { YJ_KEY_MAP, mapKeys } from "./lib/keymap";
const fieldMap = {
  jbmgsy: "基本每股收益(元)",
  kfmgsy: "扣非每股收益(元)",
  xsmgsy: "稀释每股收益(元)",
  mgjzc: "每股净资产(元)",
  mggjj: "每股公积金(元)",
  mgwfply: "每股未分配利润(元)",
  mgjyxjl: "每股经营现金流(元)",
  yyzsr: "营业总收入(元)",
  mlr: "毛利润(元)",
  gsjlr: "归属净利润(元)",
  kfjlr: "扣非净利润(元)",
  yyzsrtbzz: "营业总收入同比增长(%)",
  gsjlrtbzz: "归属净利润同比增长(%)",
  kfjlrtbzz: "扣非净利润同比增长(%)",
  yyzsrgdhbzz: "营业总收入滚动环比增长(%)",
  gsjlrgdhbzz: "归属净利润滚动环比增长(%)",
  kfjlrgdhbzz: "扣非净利润滚动环比增长(%)",
  jqjzcsyl: "加权净资产收益率(%)",
  tbjzcsyl: "摊薄净资产收益率(%)",
  tbzzcsyl: "摊薄总资产收益率(%)",
  mll: "毛利率(%)",
  jll: "净利率(%)",
  sjsl: "实际税率(%)",
  yskyysr: "预收款/营业收入",
  xsxjlyysr: "销售现金流/营业收入",
  jyxjlyysr: "经营现金流/营业收入",
  zzczzy: "总资产周转率(次)",
  yszkzzts: "应收账款周转天数(天)",
  chzzts: "存货周转天数(天)",
  zcfzl: "资产负债率(%)",
  ldzczfz: "流动负债/总负债(%)",
  ldbl: "流动比率",
  sdbl: "速动比率",
};
function fmtReadable(json) {
  let list = [];
  for (let it of json) {
    let tt = {};
    for (let k in it) {
      let key = fieldMap[k] || k;
      tt[key] = it[k];
    }
    list.push(tt);
  }

  return list;
}
function fmtReportDatas(json) {
  let reportDate = [];
  let map = {};
  for (let it of json) {
    for (let k in it) {
      let key = fieldMap[k] || k;
      if (!map[key]) map[key] = {};
      map[key][it.date] = it[k];
    }
  }

  for (let i in map["date"]) {
    reportDate.push(i);
  }
  reportDate.sort().reverse();
  // reportDate.unshift("报告日期");
  map["reportDate"] = reportDate;
  return map;
}

//主要指标
export async function mainFinanceAnalyst(code) {
  let url = `http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=0`;
  return await axios.get(url, { params: { code: code } }).then((resp) => {
    //let orgDatas = resp.data;
    //let fmtDatas = fmtReportDatas(resp.data);
    let readable = fmtReadable(resp.data);
    //console.log(orgDatas, readable, fmtDatas);
    return readable;
  });
}

export class fn业绩 extends fn {
  constructor() {
    super("yj-业绩.json");
    this.get = async function() {
      let _varname = `var_${+new Date()}`;
      let ret;
      let reportDate = getLastReportDate();
      let url;
      do {
        url = `http://datacenter.eastmoney.com/api/data/get?type=RPT_LICO_FN_CPD&sty=ALL&p=1&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var=${_varname}&filter=(REPORTDATE=%27${reportDate}%27)&rt=${+new Date()}`;
        ret = await axios
          .get(url)
          .then((resp) => eval(resp.data + ";" + _varname));
        if (!ret.success) {
          let rd = new Date(reportDate);
          rd.setMonth(rd.getMonth() - 3);
          reportDate = getLastReportDate(rd);
        }
      } while (!ret.success);

      for (let i = 2; i <= ret.result.pages; i++) {
        url = `http://datacenter.eastmoney.com/api/data/get?type=RPT_LICO_FN_CPD&sty=ALL&p=${i}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var=${_varname}&filter=(REPORTDATE=%27${reportDate}%27)&rt=${+new Date()}`;

        let d = await axios
          .get(url)
          .then((resp) => eval(resp.data + ";" + _varname));
        ret.result.data = ret.result.data.concat(d.result.data);
      }
      ret.result.pages = 1;
      let data = {};
      for (let i = 0; i < ret.result.data.length; i++) {
        let it = ret.result.data[i];
        data[
          `${it.SECURITY_CODE[0] == 6 ? "sh" : "sz"}${it.SECURITY_CODE}`
        ] = mapKeys(it, YJ_KEY_MAP);
      }
      return data;
    };
  }
}

export class fnReportDate extends fn {
  constructor() {
    super("yypl-预约披露日期列表.json");
    this.get = async function() {
      let _varname = "OYbodcjJ";
      let ret;
      let reportDate = getLastReportDate();
      let url;
      do {
        url = `http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_BS_APPOIN&sty=ALL&p=1&ps=500&st=FIRST_APPOINT_DATE,SECURITY_CODE&sr=1,1&var=${_varname}&filter=(REPORT_DATE=%27${reportDate}%27)&rt=${+new Date()}`;
        ret = await axios
          .get(url)
          .then((resp) => eval(resp.data + ";" + _varname));
        if (!ret.success) {
          let rd = new Date(reportDate);
          rd.setMonth(rd.getMonth() - 3);
          reportDate = getLastReportDate(rd);
        }
      } while (!ret.success);

      for (let i = 2; i <= ret.result.pages; i++) {
        url = `http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_BS_APPOIN&sty=ALL&p=${i}&ps=500&st=FIRST_APPOINT_DATE,SECURITY_CODE&sr=1,1&var=${_varname}&filter=(REPORT_DATE=%27${reportDate}%27)&rt=${+new Date()}`;

        let d = await axios
          .get(url)
          .then((resp) => eval(resp.data + ";" + _varname));
        ret.result.data = ret.result.data.concat(d.result.data);
      }
      ret.result.pages = 1;
      let data = {};
      for (let i = 0; i < ret.result.data.length; i++) {
        let it = ret.result.data[i];
        data[
          `${it.SECURITY_CODE[0] == 6 ? "sh" : "sz"}${it.SECURITY_CODE}`
        ] = it;
      }
      return data;
    };
  }
}
export class fnGetFinBasic extends fn {
  constructor([code, reportDate]) {
    super(`${code}/finace.json`);
    this.code = code;
    this.reportDate = reportDate;
    this.get = async function() {
      let res = await basic(code);
      console.error(code, reportDate);
      if (!res.zxzb2) return {};
      let infoArr = res.zxzb2
        .split(/<tr>/)
        .filter((e) => e.indexOf("<th") > -1)
        .map((e) =>
          e.split(/<\/t[dh]>/).map((k) => k.replace(/(<([^>]+)>)/gi, ""))
        );
      let ret = {};
      // console.log(infoArr);
      for (let i = 1; i < infoArr.length; i++) {
        let infoEle = infoArr[i];
        ret[infoEle[0]] = infoEle[1];
        ret[infoEle[0] + "_同期"] = infoEle[2];
        ret[infoEle[3]] = infoEle[4];
        ret[infoEle[3] + "_同期"] = infoEle[5];
        ret[infoEle[6]] = infoEle[7];
        ret[infoEle[6] + "_同期"] = infoEle[8];
      }
      ret["报告"] = infoArr[infoArr.length - 1][9]
        .match(/数据来源：(.*?)\(最新数据\)/)[1]
        .replace(/半年报/, "-06-30")
        .replace(/一季报/, "-03-31")
        .replace(/三季报/, "-09-30")
        .replace(/年报/, "-12-31");
      //console.log(infoEle[9]);
      return ret;
    };
  }
  isCacheValid(path) {
    let stat = fs.statSync(`${path}/${this.file}`);
    let diff = new Date(this.reportDate).getTime() - stat.ctime.getTime();
    if (diff > 0) return false;
    return true;
  }
}

false &&
  (async () => {
    let data = await fn.cacheObject(fn业绩);
    //console.log(data.result.data);
    // let data = await cacheObject(fnGetFinBasic, "SH600260");
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let code =
        (data[i].SECURITY_CODE[0] == 6 ? "sh" : "sz") + data[i].SECURITY_CODE;
      console.log(`${i}/${data.length} => ${code}`);
      if (data[i].ACTUAL_PUBLISH_DATE)
        await fn.cacheObject(fnGetFinBasic, code, data[i].ACTUAL_PUBLISH_DATE);
    }
    //let cls = await getLatestDisclosureDateList();
    //console.log(cls);
    //updateReport(code,rDate)
  })();

//获取操盘必读数据*http://f10.eastmoney.com/OperationsRequired/Index?type=web&code=SZ000651#zyzb-0*
export async function basic(code) {
  let url = `http://f10.eastmoney.com/OperationsRequired/OperationsRequiredAjax?times=1&code=${code}`;
  return await axios.get(url).then((resp) => resp.data);
}

//mainFinanceAnalyst("SZ000651");

//获取最新披露日期列表
export async function getLatestDisclosureDateList() {
  let _varname = "aaa";
  let url = `http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=YJBB21_YYPL&token=70f12f2f4f091e459a279469fe49eca5&st=frdate&sr=1&p=1&ps=50000&js=var%20${_varname}={pages:(tp),data:%20(x),font:(font)}&filter=(reportdate=^${getLastReportDate()}^)&rt=${+new Date()}`;
  return await axios.get(url).then((resp) => eval(resp.data + ";aaa"));
}

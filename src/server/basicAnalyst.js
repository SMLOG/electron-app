import axios from "axios";

import { CONFIG_DIR } from "./config";
import { dateFormat } from "./util";
import fs from "fs";
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

export function getLastReportDate() {
  let d = new Date();

  let now = ((d) =>
    ("0" + (d.getMonth() + 1)).substr(-2, 2) +
    ("0" + d.getDate()).substr(-2, 2))(new Date());
  for (let e of ["09-30", "06-30", "03-31"]) {
    if (now > e) {
      return d.getFullYear() + "-" + e;
    }
  }

  return d.getFullYear() - 1 + "-12-31";
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
//获取操盘必读数据*http://f10.eastmoney.com/OperationsRequired/Index?type=web&code=SZ000651#zyzb-0*
export async function basic(code) {
  let url = `http://f10.eastmoney.com/OperationsRequired/OperationsRequiredAjax?times=1&code=${code}`;
  await axios.get(url).then((resp) => resp.data);
}

//mainFinanceAnalyst("SZ000651");

//获取最新披露日期列表
export async function getLatestDisclosureDateList() {
  let _varname = "aaa";
  let url = `http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=YJBB21_YYPL&token=70f12f2f4f091e459a279469fe49eca5&st=frdate&sr=1&p=1&ps=50000&js=var%20${_varname}={pages:(tp),data:%20(x),font:(font)}&filter=(reportdate=^${getLastReportDate()}^)&rt=${+new Date()}`;
  return await axios.get(url).then((resp) => eval(resp.data + ";aaa"));
}

(async () => {
  let file = `${CONFIG_DIR}/yypl-预约披露日期列表.json`;
  let stat = fs.statSync(file);
  console.log(stat);

  let hours = (new Date().getTime() - stat.ctime.getTime()) / 1000 / 60 / 60;
  let map;
  if (hours > 12) {
    let result = await getLatestDisclosureDateList();
    map = {};
    result.data.forEach((d) => {
      let mk = d.scode.substring(0, 1) == 6 ? "sh" : "sz";

      for (let dt of [
        "frdate",
        "fcdate",
        "scdate",
        "tcdate",
        "radate",
        "enddate",
      ]) {
        if (d[dt] && d[dt] != "-") d[dt] = dateFormat(d[dt], "yyyy-MM-dd");
      }

      d.last = [d.radate, d.fcdatte, d.frdate, d.reportdate].filter(
        (e) => e != "-" && d
      )[0];
      map[`${mk}${d.scode}`] = d;
    });

    fs.writeFileSync(file, JSON.stringify(map));
  } else {
    console.log("load from file");
    map = JSON.parse(fs.readFileSync(file));
  }

  console.log(map);
})();

import axios from "axios";
import fs from "fs";
import { fn } from "./lib/fn";
import _ from "lodash";

import { BasicFieldMap } from "./lib/keymap";

function fmtReadable(json) {
  let list = [];
  for (let it of json) {
    let tt = {};
    for (let k in it) {
      let key = BasicFieldMap[k] || k;
      tt[key] = it[k];
    }
    list.push(tt);
  }

  return list;
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

//获取操盘必读数据*http://f10.eastmoney.com/OperationsRequired/Index?type=web&code=SZ000651#zyzb-0*
export async function basic(code) {
  let url = `http://f10.eastmoney.com/OperationsRequired/OperationsRequiredAjax?times=1&code=${code}`;
  return await axios.get(url).then((resp) => resp.data);
}

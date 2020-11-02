import { JOB_MAP } from "./worker";
import { getLastReportDate } from "../lib/util";
import axios from "axios";
import _ from "lodash";
import { genModel } from "../db/utils";

async function getJsonpData(options) {
  let _varname = `var_${+new Date()}`;

  let arr = [];
  for (let i = 1, pages = 1; i <= pages; i++) {
    let url = options.url;
    for (let k in options) {
      if (url.indexOf(`{${k}}`) > -1)
        url = url.replace(new RegExp(`{${k}}`, "g"), options[k]);
    }
    url = url.replace(/\{var\}/g, _varname);
    url = url.replace(/\{page\}/g, i);
    url = url.replace(/\{timestamp\}/g, +new Date());

    console.log(url);

    let d = await axios
      .get(url)
      .then((resp) => eval(resp.data.replace(options.jsonp, "")));
    arr = arr.concat(d);
    if (d.length == 0) break;
    pages += 1;
  }
  for (let i = 0; i < arr.length; i++) {
    let it = arr[i];
    let code = it[options.key];
    if (code[0] * 1 == code[0]) code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
    it.code = code;
  }
  return arr;
}

async function getData(options) {
  let _varname = `var_${+new Date()}`;

  let arr = [];
  for (let i = 1, pages = 1; i <= pages; i++) {
    let url = options.url;
    for (let k in options) {
      if (url.indexOf(`{${k}}`) > -1)
        url = url.replace(new RegExp(`{${k}}`, "g"), options[k]);
    }
    url = url.replace(/\{var\}/g, _varname);
    url = url.replace(/\{page\}/g, i);
    url = url.replace(/\{timestamp\}/g, +new Date());

    console.log(url);

    let d = await axios
      .get(url)
      .then((resp) => eval(resp.data + ";" + _varname));
    arr = arr.concat(d.data || d.result.data);
    if (!d.success) break;
    pages = d.pages || d.result.pages;
  }
  for (let i = 0; i < arr.length; i++) {
    let it = arr[i];
    let code = it[options.key];
    if (code[0] * 1 == code[0]) code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
    it.code = code;
  }
  return arr;
}

(async () => {
  let curReportDate = getLastReportDate();

  let out = "";
  for (let k in JOB_MAP) {
    let options = JOB_MAP[k];
    options.get = options.get || (options.jsonp ? getJsonpData : getData);

    options.reportDate = curReportDate;

    let datas = await options.get(options);
    //console.log(datas);
    for (let mk of ["ASSIGNDSCRPT"]) {
      if (mk in datas[0]) datas[0][mk] = "a".repeat(255);
    }
    for (let mk of ["CHANGEREASONDSCRPT", "FORECASTCONTENT"]) {
      if (mk in datas[0]) datas[0][mk] = "a".repeat(500);
    }
    let cls = genModel(
      datas[0],
      options.tableName,
      options.keymap,
      ["SECURITY_CODE", "REPORT_DATE", "REPORTDATE", "code", "NoticeDate"],
      k
    );
    console.log(cls);
    out += `\nconst ${cls} = require('./model/${cls}');`;
  }
  console.log(out);
})();

/*(async () => {
  for (let k in JOB_MAP) {
    JOB_MAP[k].get =
      JOB_MAP[k].get || (JOB_MAP[k].jsonp ? getAllJsonpData : getAllData);
    await doRun(JOB_MAP[k]);
  }
})();*/

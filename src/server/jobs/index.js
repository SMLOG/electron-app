import { doRun, JOB_MAP } from "./worker";
import { getLastReportDate } from "../lib/util";
import axios from "axios";
import _ from "lodash";

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
  let data = {};
  for (let i = 0; i < arr.length; i++) {
    let it = arr[i];
    let code = it[options.key];
    if (code[0] * 1 == code[0]) code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
    data[code] = it;
  }
  return data;
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
    arr = arr.concat(d.result.data);
    if (!d.success) break;
    pages = d.result.pages;
  }
  let data = {};
  for (let i = 0; i < arr.length; i++) {
    let it = arr[i];
    let code = it[options.key];
    if (code[0] * 1 == code[0]) code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
    data[code] = it;
  }
  return data;
}

async function getAllJsonpData(options) {
  let curReportDate = getLastReportDate();
  options.reportDate = curReportDate;
  let data1 = await getJsonpData(options);
  let rd = new Date(curReportDate);
  rd.setMonth(rd.getMonth() - 3);
  let preReportDate = getLastReportDate(rd);
  options.reportDate = preReportDate;

  let data2 = await getJsonpData(options);

  return _.assign(data2, data1);
}
async function getAllData(options) {
  let curReportDate = getLastReportDate();
  options.reportDate = curReportDate;
  let data1 = await getData(options);
  let rd = new Date(curReportDate);
  rd.setMonth(rd.getMonth() - 3);
  let preReportDate = getLastReportDate(rd);
  options.reportDate = preReportDate;

  let data2 = await getData(options);

  return _.assign(data2, data1);
}
if (false)
  (async () => {
    for (let k in JOB_MAP) {
      JOB_MAP[k].get =
        JOB_MAP[k].get || (JOB_MAP[k].jsonp ? getAllJsonpData : getAllData);
      await doRun(JOB_MAP[k]);
    }
  })();

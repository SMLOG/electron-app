import { doRun, JOB_MAP } from "./worker";
import { getLastReportDate } from "../lib/util";
import axios from "axios";
import _ from "lodash";

async function getData(options) {
  let _varname = `var_${+new Date()}`;

  let arr = [];
  for (let i = 1, pages = 1; i <= pages; i++) {
    let url = options.url;
    for (let k in options) {
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

(async () => {
  let res = await doRun({
    job: JOB_MAP.预约披露日期列表,
    get: async function(option) {
      let res = await getAllData({
        key: "SECURITY_CODE",
        url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_BS_APPOIN&sty=ALL&p={page}&ps=500&st=FIRST_APPOINT_DATE,SECURITY_CODE&sr=1,1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}`,
      });
      for (let code in res) {
        let d = res[code];
        res[code].tempPubDate =
          d["ACTUAL_PUBLISH_DATE"] ||
          d["THIRD_CHANGE_DATE"] ||
          d["SECOND_CHANGE_DATE"] ||
          d["FIRST_CHANGE_DATE"] ||
          d["FIRST_APPOINT_DATE"];
      }

      return res;
    },
  });
  // console.log(res);
  res = await doRun({
    job: JOB_MAP.业绩,

    get: async function(option) {
      let res = await getAllData({
        key: "SECURITY_CODE",
        url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_LICO_FN_CPD&sty=ALL&p={page}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORTDATE=%27{reportDate}%27)&rt={timestamp}`,
      });

      return res;
    },
  });
  console.log(res);

  res = await doRun({
    job: JOB_MAP.业绩快报,

    get: async function(option) {
      let res = await getAllData({
        key: "SECURITY_CODE",
        url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_FCI_PERFORMANCEE&sty=ALL&p={page}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}`,
      });

      return res;
    },
  });
  console.log(res);
})();

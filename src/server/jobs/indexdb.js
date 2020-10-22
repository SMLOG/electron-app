import { JOB_MAP } from "./worker";
import { getLastReportDate, prevReportDate } from "../lib/util";
import axios from "axios";
import iconv from "iconv-lite";
import _ from "lodash";
import { ifNoExistGenModel } from "../db/utils";
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36";
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
      .get(url, {
        headers: { "User-Agent": userAgent },
      })
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
      .get(url, {
        responseType: "arraybuffer",
        headers: { "User-Agent": userAgent },
      })
      .then((resp) => {
        let encode = resp.headers["content-type"].match(/charset=(.+)/)[1];
        let str = iconv.decode(Buffer.from(resp.data), encode);

        return eval(str + ";" + _varname);
      });
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
  let startDate = getLastReportDate();
  for (; startDate >= "2020-06-31"; ) {
    for (let k in JOB_MAP) {
      let options = JOB_MAP[k];
      if (!options.enable) continue;
      options.get = options.get || (options.jsonp ? getJsonpData : getData);
      if (options.reportDate) {
        startDate = options.reportDate = prevReportDate(options.reportDate);
      } else {
        options.reportDate = startDate;
      }

      let datas = await options.get(options);

      for (let k = 0; k < datas.length; k++) {
        datas[k] = _.mapValues(datas[k], (e, ky) => {
          if (ky.toUpperCase().endsWith("DATE") && e) {
            return e.replace(/[T\s]00:00:00/, "");
          }
          if (e === "") return null;
          return e;
        });
      }

      let model = await ifNoExistGenModel(
        datas,
        options.tableName,
        options.keymap,
        ["SECURITY_CODE", "REPORT_DATE", "REPORTDATE", "code", "NoticeDate"],
        k
      );

      try {
        await model.bulkCreate(datas, {
          updateOnDuplicate: Object.keys(datas[0]),
        });
      } catch (ee) {
        console.error(modelName);
        console.error(ee);
        return;
      }
    }
  }

  console.log("done");
})();

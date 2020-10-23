import { JOB_MAP } from "./worker";
import axios from "axios";
import iconv from "iconv-lite";
import _ from "lodash";
import moment from "moment";
import { ifNoExistGenModel } from "../db/utils";
const AsyncQueue = require("@wxaxiaoyao/async-queue");

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
      .then((resp) => {
        console.log(resp.data);
        eval(resp.data.replace(options.jsonp, ""));
      });
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
    if (!d.pages) break;
    pages = d.pages || d.result.pages;
  }
  if (options.mapValues) {
    arr = options.mapValues(arr);
  } else {
    for (let i = 0; i < arr.length; i++) {
      let it = arr[i];
      let code = it[options.key];
      if (code[0] * 1 == code[0]) code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
      it.code = code;
    }
  }

  return arr;
}

async function task(taskName, option = {}) {
  let options = _.defaults({}, option, JOB_MAP[taskName]);
  options.get = options.get || (options.jsonp ? getJsonpData : getData);
  console.log(
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    "taskName:",
    taskName,
    option
  );
  let datas = await options.get(options);
  console.log(
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    "taskName:",
    taskName,
    datas.length
  );
  for (let k = 0; k < datas.length; k++) {
    datas[k] = _.mapValues(datas[k], (e, ky) => {
      if (ky.toUpperCase().endsWith("DATE") && _.isString(e)) {
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
    options.pks || [
      "SECURITY_CODE",
      "REPORT_DATE",
      "REPORTDATE",
      "code",
      "NoticeDate",
    ],
    taskName
  );

  try {
    await model.bulkCreate(datas, {
      updateOnDuplicate: Object.keys(datas[0]),
    });
  } catch (ee) {
    console.error(options.tableName);
    console.error(ee);
    return;
  }
}

var CronJob = require("cron").CronJob;

(async () => {
  for (let k in JOB_MAP) {
    let job = JOB_MAP[k];
    if (job._cronTime)
      new CronJob(
        job._cronTime,
        function() {
          let options = (job.getOptions && job.getOptions()) || [{}];
          for (let option of options) {
            AsyncQueue.exec(k, async () => {
              task(k, option);
            });
          }
        },
        null,
        true
      );
    else {
      let options = (job.getOptions && job.getOptions()) || [{}];
      for (let option of options) {
        await task(k, option);
      }
    }
  }

  console.log("done");
})();

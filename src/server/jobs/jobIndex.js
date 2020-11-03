import { JOB_MAP } from "./worker";
import iconv from "iconv-lite";
import _ from "lodash";
import moment from "moment";
import { ifNoExistGenModel } from "../db/utils";
import Job from "../db/model/Job";
import { userAgent } from "../config";
import { axios } from "../axios";
const Urls = require("../db/model/Urls");

const events = require("events");
export const emitter = new events.EventEmitter();

function firstMap(arr, options, rawData) {
  if (options.mapValues) {
    arr = options.mapValues(arr, options, rawData);
    if ("arr" in arr) return arr;
  }
  for (let i = 0; i < arr.length; i++) {
    let it = arr[i];
    let code = it[options.key];
    if (code[0] * 1 == code[0]) code = `${code[0] == 6 ? "sh" : "sz"}${code}`;
    it.code = code;
  }

  return { arr: arr };
}
async function getData(options, taskName) {
  let _varname = `var_${+new Date()}`;
  let pageDatas = [];
  let total = 0;
  for (let i = 1, pages = 1; i <= pages; i++) {
    let url = options.url;
    for (let k in options) {
      if (url.indexOf(`{${k}}`) > -1)
        url = url.replace(new RegExp(`{${k}}`, "g"), options[k]);
    }

    let rawUrl = url;
    let rawParams = JSON.stringify({ page: i });
    let urlRow = await Urls.findOne({
      logging: console.log,
      raw: true,
      where: {
        url: rawUrl,
        status: 0,
        params: rawParams,
      },
    });
    console.log(urlRow);
    if (!urlRow) {
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
          return options.jsonp
            ? eval(str.replace(options.jsonp, ""))
            : eval(str + ";" + _varname);
        });
      console.log("done", url);

      let { arr, totalPage } = firstMap(
        _.isArray(d)
          ? d
          : d.data
          ? d.data
          : d.result && d.result.data
          ? d.result.data
          : d,
        options,
        d
      );
      total += arr.length;
      let pageData = [arr, rawUrl, rawParams, taskName];
      pageDatas.push(pageData);

      console.log(pageData);
      if (
        (options.pageDatasProcess && options.enablePageDatasProcess) ||
        total > 10000
      ) {
        console.log("pageDatasProcess");
        await options.pageDatasProcess(pageDatas);
        total = 0;
        pageDatas = [];
      }
      if (totalPage) pages = totalPage;
      else if (_.isArray(d)) {
        if (d.length > 0) pages++;
        else break;
      } else {
        pages = "pages" in d ? d.pages : d.result.pages;
        if (i > pages) break;
      }
    }
  }
  console.log(pageDatas);
  return pageDatas;
}

export async function task(taskName) {
  let job = JOB_MAP[taskName];
  let jobInfo = await Job.findByPk(taskName);
  if (
    jobInfo &&
    new Date().getTime() - jobInfo.runtime.getTime() <
      (job.minTime || 4 * 3600 * 1000)
  ) {
    console.log(`${jobInfo.runtime} skip ${taskName}`);
    return;
  }
  let optionsArr = (job.getOptions && job.getOptions()) || [{}];
  let pageDatas = [];
  for (let option of optionsArr) {
    let options = _.defaults({}, option, job);

    options.get = options.get || getData;
    console.log(
      moment().format("YYYY-MM-DD HH:mm:ss"),
      "taskName:",
      taskName,
      option
    );
    job.pageDatasProcess = options.pageDatasProcess = mapAndProcessDatas;
    let pageDatas1 = await getData(options, taskName);
    pageDatas = pageDatas.concat(pageDatas1);
  }

  console.log("mapAndProcessDatas");
  await mapAndProcessDatas(pageDatas);

  try {
    jobInfo = Job.findByPk(taskName);
    Job.upsert({ jobname: taskName, runtime: new Date(), status: 0 });
  } catch (ee) {
    console.error(job.tableName);
    console.error(ee);
    return;
  }
  //console.log("emit", taskName);
  //emitter.emit(taskName, allDatas);

  async function mapAndProcessDatas(pageDatas) {
    let datas = pageDatas.reduce((arr, r) => arr.concat(r[0]), []);

    console.log("mapAndProcessDatas", datas.length);

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
      job.tableName,
      job.keymap,
      job.pks || [
        "SECURITY_CODE",
        "REPORT_DATE",
        "REPORTDATE",
        "code",
        "NoticeDate",
      ],
      taskName,
      job.fieldDefitions
    );
    console.log(
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      "taskName:",
      taskName,
      datas.length
    );
    try {
      if (datas.length > 0)
        await model.bulkCreate(datas, {
          updateOnDuplicate: Object.keys(datas[0]),
          logging: console.log,
        });
      for (let batch of pageDatas) {
        await Urls.upsert(
          {
            url: batch[1],
            job: batch[3],
            params: batch[2],
            status: 0,
          },
          {
            logging: console.log,
          }
        );
      }
    } catch (e) {
      console.log(e);
      console.log(e);
      throw e;
    }
  }
}

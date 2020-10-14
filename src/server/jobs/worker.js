import fs from "fs";
import path from "path";
const CronJob = require("cron").CronJob;

import { CONFIG_DIR } from "../config";
import _ from "lodash";
import { KEYMAP, compressToArray, decompressToMapList } from "../lib/keymap";

export const JOB_MAP = {
  预约披露日期列表: {
    file: "job-yy预约披露日期列表.json",
    key: "SECURITY_CODE",
    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_BS_APPOIN&sty=ALL&p={page}&ps=500&st=FIRST_APPOINT_DATE,SECURITY_CODE&sr=1,1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}`,
  },
  业绩: {
    file: "job-yj业绩.json",
    key: "SECURITY_CODE",

    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_LICO_FN_CPD&sty=ALL&p={page}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORTDATE=%27{reportDate}%27)&rt={timestamp}`,
  },
  业绩快报: {
    file: "job-kb业绩快报.json",
    key: "SECURITY_CODE",

    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url: `http://datacenter.eastmoney.com/api/data/get?type=RPT_FCI_PERFORMANCEE&sty=ALL&p={page}&ps=500&st=UPDATE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}`,
  },
  业绩预告: {
    file: "job-yg业绩预告.json",
    key: "SECURITY_CODE",

    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_PUBLIC_OP_PREDICT&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORTDATE=%27{reportDate}%27)(IsLatest=%22T%22)&rt={timestamp}",
  },
  资产负债表: {
    file: "job-zcfz资产负债表.json",
    key: "SECURITY_CODE",

    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_DMSK_FN_BALANCE&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}",
  },
  利润表: {
    file: "job-lr利润表.json",
    key: "SECURITY_CODE",

    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_DMSK_FN_INCOME&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}",
  },
  现金流量表: {
    file: "job-xjll现金流量表.json",
    key: "SECURITY_CODE",

    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
    url:
      "http://datacenter.eastmoney.com/api/data/get?type=RPT_DMSK_FN_CASHFLOW&sty=ALL&p={page}&ps=500&st=NOTICE_DATE,SECURITY_CODE&sr=-1,-1&var={var}&filter=(REPORT_DATE=%27{reportDate}%27)&rt={timestamp}",
  },
};

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

export async function doRun(option) {
  console.info(option.file);
  let options = _.extend(option, { _file: `${CONFIG_DIR}/${option.file}` });

  let task = async () => {
    mkdirsSync(path.dirname(options._file));
    let res = await option.get(options);
    res = compressToArray(res, options.keymap);
    fs.writeFileSync(options._file, JSON.stringify(res));

    return res;
  };
  if (!option._cronTime) return await task();
  else if (!fs.existsSync(options._file)) {
    await task();
  }
  if (option._cronTime)
    new CronJob(
      option._cronTime,
      function() {
        task();
      },
      null,
      true,
      "Asia/Chongqing"
    );
}

export function load(type) {
  let file = `${CONFIG_DIR}/${type.file}`;
  if (fs.existsSync(file)) {
    let arr = JSON.parse(fs.readFileSync(file));
    return decompressToMapList(arr);
  } else return {};
}

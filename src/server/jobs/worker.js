import fs from "fs";
import path from "path";
const CronJob = require("cron").CronJob;

import { CONFIG_DIR } from "../config";
import _ from "lodash";
import { KEYMAP, compressToArray, decompressToMapList } from "../lib/keymap";

export const JOB_MAP = {
  预约披露日期列表: {
    file: "job-yy预约披露日期列表.json",
    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
  },
  业绩: {
    file: "job-yj业绩.json",
    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
  },
  业绩快报: {
    file: "job-kb业绩快报.json",
    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
  },
  估值: {
    file: "job-gz估值.json",
    keymap: KEYMAP.YJ_KEY_MAP_业绩,
    _cronTime: "0 0 */2 * * *",
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
  console.info(option.job.file);
  let options = _.extend(option, { _file: `${CONFIG_DIR}/${option.job.file}` });

  let task = async () => {
    mkdirsSync(path.dirname(options._file));
    let res = await option.get(options);
    res = compressToArray(res, options.job.keymap);
    fs.writeFileSync(options._file, JSON.stringify(res));

    return res;
  };
  if (option.job._cronTime)
    new CronJob(
      option.job._cronTime,
      function() {
        task();
      },
      null,
      true,
      "Asia/Chongqing"
    );
  else return await task();
}

export function load(type) {
  let file = `${CONFIG_DIR}/${type.file}`;
  if (fs.existsSync(file)) {
    let arr = JSON.parse(fs.readFileSync(file));
    return decompressToMapList(arr);
  } else return {};
}
let data = load(JOB_MAP.业绩);
console.log(data);

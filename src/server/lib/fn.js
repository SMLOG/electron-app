import fs from "fs";
import path from "path";
import { CONFIG_DIR } from "../config";
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
export class fn {
  constructor(file, timeml = 43200000, enableCache = true, get = () => {}) {
    this.file = file;
    this.timeml = timeml;
    this.get = get;
    this.enableCache = enableCache;
    mkdirsSync(path.dirname(`${CONFIG_DIR}/${this.file}`));
  }
  isCacheValid(path) {
    let stat = fs.statSync(`${path}/${this.file}`);
    let diff = new Date().getTime() - stat.ctime.getTime();
    return diff < this.timeml;
  }
}
export async function cacheObject(FN) {
  let params = Array.prototype.slice.call(arguments, 1);
  let fn = new FN(params);
  let file = `${CONFIG_DIR}/${fn.file}`;
  if (fn.enableCache && fs.existsSync(file) && fn.isCacheValid(CONFIG_DIR)) {
    // console.log("from cache " + file);
    return JSON.parse(fs.readFileSync(file));
  }
  let res = await fn.get();
  fs.writeFileSync(file, JSON.stringify(res));
  return res;
}

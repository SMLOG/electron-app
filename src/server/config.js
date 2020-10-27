import os from "os";
import { name as appName } from "../../package.json";

export const CONFIG_DIR = `${os.homedir()}/.${appName}`;
export const CRITERIA_PATH = `${CONFIG_DIR}/criteria.json`;
export function getDataDir(code) {
  return CONFIG_DIR + "/" + code;
}

export const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36";

console.log(CONFIG_DIR);

import os from "os";
import { name as appName } from "./package.json";

export const CONFIG_DIR = `${os.homedir()}/.${appName}`;
export const CRITERIA_PATH = `${CONFIG_DIR}/criteria.json`;
export function getDataDir(code) {
  return CONFIG_DIR + "/" + code;
}

import { fn } from "./lib/fn";
import { fnGetFinBasic, fnReportDate } from "./basicAnalyst";
import { fnTechData } from "./TechMan";
export async function attachExtractInfoToItems(list) {
  let disclose = await fn.cacheObject(fnReportDate);
  for (let i = 0; i < list.length; i++) {
    let code = list[i].code;
    let info = await fn.cacheObject(fnGetFinBasic, code);
    list[i] = Object.assign(list[i], info);
    let dis = disclose[code];
    if (dis && dis.ACTUAL_PUBLISH_DATE)
      list[i].ACTUAL_PUBLISH_DATE = dis.ACTUAL_PUBLISH_DATE;
    let tdata = await fn.cacheObject(fnTechData, list[i]);
    list[i] = Object.assign(list[i], tdata);
  }
}

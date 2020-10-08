import { fn } from "./lib/fn";
import { fnGetFinBasic, fnReportDate, fn业绩 } from "./basicAnalyst";
import { fnTechData } from "./TechMan";
export async function attachExtractInfoToItems(list) {
  let disclose = await fn.cacheObject(fnReportDate);
  let yj = await fn.cacheObject(fn业绩);

  for (let i = 0; i < list.length; i++) {
    let code = list[i].code;
    let info = await fn.cacheObject(fnGetFinBasic, code);
    list[i] = Object.assign(list[i], info);
    list[i] = Object.assign(list[i], yj[code]);
    //console.error("yj", list[i]);

    let dis = disclose[code];
    if (dis && dis.ACTUAL_PUBLISH_DATE)
      list[i].ACTUAL_PUBLISH_DATE = dis.ACTUAL_PUBLISH_DATE;
    let tdata = await fn.cacheObject(fnTechData, list[i]);
    list[i] = Object.assign(list[i], tdata);
  }
}

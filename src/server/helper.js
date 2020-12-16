import { fn } from "!/lib/fn";
import { fnTechData } from "!/TechMan";
fnTechData
export async function attachExtractInfoToItems(list) {
  for (let i = 0; i < list.length; i++) {
    let tdata = await fn.cacheObject(fnTechData, list[i]);
    list[i] = Object.assign(list[i], tdata);
  }
}

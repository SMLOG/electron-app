import { timeout } from "./utils";
import { getCacheData } from "./db";

export async function getTechDatas(item) {
  let techId = "tech_" + item.code;

  let techDatas = await getCacheData(item.date, techId, async () => {
    let ifr = document.getElementsByTagName("iframe")[0];
    let url = ifr.src.split("?")[0] + "?" + item.code;
    ifr.src = url;
    ifr.contentWindow[techId] = null;
    do {
      if (ifr.contentWindow[techId]) {
        let ret = ifr.contentWindow[techId];
        ifr.contentWindow[techId] = null;
        return ret;
      }
      await timeout(100);
    } while (true);
  });
  return techDatas;
}
window.getTechDatas = getTechDatas;

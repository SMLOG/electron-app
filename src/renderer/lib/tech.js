import { timeout } from "./utils";
import { getCacheData } from "./db";
import { loadScripts } from "./utils";

export async function getTechDatas(item) {
  let techId = "tech_" + item.code;

  let techDatas = await getCacheData(item.date, techId, async () => {
    let ifr = document.getElementsByTagName("iframe")[0];
    let url = ifr.src.split("?")[0] + "?" + item.code;
    ifr.src = url;
    ifr.contentWindow[techId] = null;
    ifr.contentWindow.kwready = false;
    do {
      if (ifr.contentWindow[techId] && ifr.contentWindow.kwready) {
        let ret = ifr.contentWindow[techId];
        ifr.contentWindow[techId] = null;
        ifr.contentWindow.kwready = false;
        return ret;
      }
      await timeout(100);
    } while (true);
  });
  return techDatas;
}
window.getTechDatas = getTechDatas;

let loadscript = loadScripts(["/static/js/sf_sdk.js"]);

export async function getTdatas(code) {
  await loadscript;
  return await new Promise((resolve, reject) => {
    KKE.api(
      "datas.t.get",
      {
        symbol: code
      },
      function(resp) {
        resolve(resp);
      }
    );
  });
}
window.getTdatas = getTdatas;

export async function get5Tdatas(code) {
  await loadscript;

  return await new Promise((resolve, reject) => {
    KKE.api(
      "datas.t.get",
      {
        assisthq: 1,
        dataformatter: undefined,
        date: null,
        dist5: 0,
        faker: "CN",
        ssl: true,
        symbol: code,
        withI: true,
        withT5: 1
      },
      function(data) {
        resolve(data);
      }
    );
  });
}
window.get5Tdatas = get5Tdatas;

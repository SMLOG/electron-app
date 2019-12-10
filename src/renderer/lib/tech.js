import { timeout } from "./utils";
import { getCacheData } from "./db";
import { loadScripts } from "./utils";

export async function getTechDatas(item, cache = true) {
  let techId = "tech_" + item.code;
  let get = async () => {
    let ifr = document.getElementsByTagName("iframe")[0];
    let url = ifr.src.split("?")[0] + "?" + item.code;
    ifr.src = url;
    await new Promise((resolve, reject) => {
      ifr.onload = function(e) {
        resolve();
      };
    });
    let result = {};
    for (let v of ["kd", "kw"]) {
      ifr.contentWindow[techId] = null;
      ifr.contentWindow.chart_.showView({
        view: "kw"
      });
      for (;;) {
        if (ifr.contentWindow[techId]) {
          let ret = ifr.contentWindow[techId];
          ifr.contentWindow[techId] = null;
          result[v] = ret;
          break;
        }
        await timeout(1000);
      }
    }
    console.log(result);

    return result;
  };
  let techDatas;
  if (cache) techDatas = await getCacheData(item.date, techId, get);
  else techDatas = await get();
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

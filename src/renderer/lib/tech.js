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
    ifr.contentWindow["item"] = item;
    let result = {};
    for (let v of ["kd", "kw", "km"]) {
      ifr.contentWindow[techId] = null;
      ifr.contentWindow.chart_.showView({
        view: v
      });
      for (;;) {
        if (ifr.contentWindow[techId]) {
          let ret = ifr.contentWindow[techId];
          ifr.contentWindow[techId] = null;

          result[v] = JSON.parse(JSON.stringify(ret)); //deepCopy(ret);
          break;
        }
        await timeout(100);
      }
    }

    return result;
  };
  let techDatas;
  if (cache) techDatas = await getCacheData(item.date, techId, get);
  else {
    techDatas = await get();
    await getCacheData(item.date, techId, get, techDatas);
  }
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

export async function getKdatas(code) {
  await loadscript;
  return await new Promise((resolve, reject) => {
    KKE.api(
      "datas.k.get",
      { symbol: "sh601900", newthour: "09:00", ssl: true },
      function(datas) {
        console.log(datas);
        resolve(datas);
      }
    );
  });
}
window.getKdatas = getKdatas;

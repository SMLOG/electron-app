import { timeout } from "./utils";
import { getCacheData } from "./db";
import { loadScripts } from "./utils";
import moment from "moment";
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
let tmpromise = (async () => {
  await loadscript;
  return new Promise((resolve, reject) => {
    KKE.api("plugins.techchart.get", "", tchar => {
      var tm = tchar.tChart({});
      tm.createChart({ name: "MACD" });
      //tm.createChart({ name: "kDJ" });
      tm.createChart({ name: "BOLL" });
      tm.createChart({ name: "MA" });
      console.log(tm);
      resolve(tm);
    });
  });
})();
export async function getTech(item) {
  await loadscript;
  let tm = await tmpromise;
  let techId = "tech_1" + item.code;

  let itemDatas = await getCacheData(item.date, techId);
  if (
    itemDatas &&
    itemDatas.kd.datas &&
    moment(item.date).format("YYYY-MM-DD") ==
      moment(itemDatas.kd.datas.slice(-1)[0].date).format("YYYY-MM-DD")
  ) {
    let ps = ["kd", "kw", "km"];

    for (let j = 0; j < ps.length; j++) {
      let type = ps[j];
      let macd = itemDatas[type].MACD;
      let i = macd.length - 2;
      let ema12 = (macd[i].ema12 * 11) / 13 + (item.now * 2) / 13;
      let ema26 = (macd[i].ema26 * 25) / 27 + (item.now * 2) / 27;

      let diff = ema12 - ema26;
      let dea = (macd[i].dea * 8) / 10 + (diff * 2) / 10;
      macd[i + 1].diff = diff;
      macd[i + 1].dea = dea;
      macd[i + 1].bar = (diff - dea) * 2;
    }

    return itemDatas;
  } else {
    let datas = await new Promise((resolve, reject) => {
      KKE.api(
        "datas.k.get",
        { symbol: item.code, newthour: "09:00", ssl: true },
        function(d) {
          resolve(d);
        }
      );
    });
    let ret = {
      kd: tm.linkData(datas.data.day),
      kw: tm.linkData(datas.data.week),
      km: tm.linkData(datas.data.month)
    };

    await getCacheData(item.date, techId, null, ret);
    return ret;
  }
}
window.getTech = getTech;

import { loadScripts } from "./utils";
import { getTechDatas } from "./tech";
import { getTables, attachData, hl } from "./getTable";
import { getAllInd } from "./ind";
let queue = Promise.resolve();
export function isNotTradeTime() {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  if (h < 9 || h > 15) return true;
  if (h == 9 && m < 30) return true;
  if (h == 11 && m > 30) return true;
  if (h > 11 && h < 13) return true;
  if (h > 15) return true;
  return false;
}
let loadscript = loadScripts(["/static/js/sf_sdk.js"]);

async function getTdatas(code){
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


async function get5Tdatas(code){
  return await new Promise((resolve, reject) => {
    KKE.api("datas.t.get", {
      assisthq: 1,
 dataformatter: undefined,
 date: null,
 dist5: 0,
 faker: "CN",
 ssl: true,
 symbol: code,
 withI: true,
 withT5: 1,
  }, function(data) {
    resolve(data)
  });
  });

}
window.get5Tdatas = get5Tdatas;

export async function monitor(items) {
  await loadscript;
  await hl(items);

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    attachData(item);

    queue = queue.then(() => {
      return getTechDatas(item);
    });

    let name = "tdatas" + item.code;
    if (!window[name]) {
      window[name] = [];
      let resp = await getTdatas(item.code);

      item.avgzs = item.upArgCount = 0;

      let datas = (window[name] = resp.data.td1.filter(e => e.volume > 0));
      item.preAvg = item.open;

      item.contDir = 0;
      for (let k = 0; k < datas.length; k++) {
        let t = datas[k];
        if (t.price > t.avg_price && item.avgzs >= 0) {
          item.avgzs += 1;
          item.upArgCount += 1;
        } else if (t.price < t.avg_price && item.avgzs <= 0) {
          item.avgzs -= 1;
        } else if (
          (t.price > t.avg_price && item.avgzs < 0) ||
          (t.price < t.avg_price && item.avgzs > 0)
        ) {
          item.avgzs = 0;
        }
        if (t.avg_price > item.preAvg && item.contDir >= 0) item.contDir += 1;
        else if (t.avg_price < item.preAvg && item.contDir <= 0)
          item.contDir -= 1;
        else if (
          (t.avg_price < item.preAvg && item.contDir > 0) ||
          (t.avg_price > item.preAvg && item.contDir < 0)
        )
          item.contDir = 0;
        item.preAvg = t.avg_price;
      }
    }
  }

  await getTables(items);

  if (isNotTradeTime()) return;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let avg = (item.amount / item.volume).toFixed(2);

    if (avg > item.preAvg && item.contDir >= 0) item.contDir += 1;
    else if (avg < item.preAvg && item.contDir <= 0) item.contDir -= 1;
    else if (
      (avg < item.preAvg && item.contDir > 0) ||
      (avg > item.preAvg && item.contDir < 0)
    )
      item.contDir = 0;

    if (item.now > avg && item.avgzs >= 0) {
      item.avgzs += 1;
      item.upArgCount += 1;
    } else if (item.now < avg && item.avgzs <= 0) {
      item.avgzs -= 1;
    } else if (
      (item.now > avg && item.avgzs < 0) ||
      (item.now < avg && item.avgzs > 0)
    ) {
      item.avgzs = 0;
    }

    item.preAvg = avg;
  }
}

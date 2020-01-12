import { getTechDatas, getTdatas } from "./tech";
import { getTables, attachData, hl } from "./getTable";
import { cache } from "./db";

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

export async function monitor(items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    await hl(item);

    attachData(item);

    queue = queue.then(() => {
      return getTechDatas(item);
    });

    let name = "tdatas" + item.code;
    if (!cache[name]) {
      let cdata = {};
      cache[name] = cdata;
      let resp = await getTdatas(item.code);

      cdata.avgzs = cdata.upArgCount = 0;

      let datas = resp.data.td1.filter(e => e.volume > 0);
      cdata.preAvg = item.open;

      cdata.contDir = 0;
      for (let k = 0; k < datas.length; k++) {
        let t = datas[k];
        if (t.price > t.avg_price && cdata.avgzs >= 0) {
          cdata.avgzs += 1;
          cdata.upArgCount += 1;
        } else if (t.price < t.avg_price && cdata.avgzs <= 0) {
          cdata.avgzs -= 1;
        } else if (
          (t.price > t.avg_price && cdata.avgzs < 0) ||
          (t.price < t.avg_price && cdata.avgzs > 0)
        ) {
          cdata.avgzs = 0;
        }
        if (t.avg_price > cdata.preAvg && cdata.contDir >= 0)
          cdata.contDir += 1;
        else if (t.avg_price < cdata.preAvg && cdata.contDir <= 0)
          cdata.contDir -= 1;
        else if (
          (t.avg_price < cdata.preAvg && cdata.contDir > 0) ||
          (t.avg_price > cdata.preAvg && cdata.contDir < 0)
        )
          cdata.contDir = 0;
        cdata.preAvg = t.avg_price;
      }
    }
    Object.assign(item, cache[name]);
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

import { getTdatas } from "./tech";
import { getTables, attachData, hl } from "./getTable";
import { cache } from "./db";

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
  let isTradeTime = !isNotTradeTime();

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    await hl(item);

    attachData(item);

    let name = "monitor_" + item.code;
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
    if (isTradeTime) {
      let avg = (item.amount / item.volume).toFixed(2);
      let cdata = cache[name];

      if (avg > cdata.preAvg && cdata.contDir >= 0) cdata.contDir += 1;
      else if (avg < cdata.preAvg && cdata.contDir <= 0) cdata.contDir -= 1;
      else if (
        (avg < cdata.preAvg && cdata.contDir > 0) ||
        (avg > cdata.preAvg && cdata.contDir < 0)
      )
        cdata.contDir = 0;

      if (item.now > avg && cdata.avgzs >= 0) {
        cdata.avgzs += 1;
        cdata.upArgCount += 1;
      } else if (item.now < avg && cdata.avgzs <= 0) {
        cdata.avgzs -= 1;
      } else if (
        (item.now > avg && cdata.avgzs < 0) ||
        (item.now < avg && cdata.avgzs > 0)
      ) {
        cdata.avgzs = 0;
      }

      cdata.preAvg = avg;
    }
    Object.assign(item, cache[name]);
  }
}

getTables();

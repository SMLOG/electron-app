import { parse, fetchEval } from "./utils";
import { updateItem } from "@/lib/getTable";

export async function loadHQ(items) {
  if (items.length == 0) return items;
  const arrs = items
    .map(e => e.code)
    .reduce((init, item, index) => {
      index % 20 === 0 ? init.push([item]) : init[init.length - 1].push(item);
      return init;
    }, []);

  try {
    for (let a of arrs) {
      let str = a.join(",");
      let str_i = a.map(e => `${e}_i`).join(",");
      await fetchEval([
        `http://hq.sinajs.cn/list=${str},${str_i}`,
        `http://qt.gtimg.cn/q=${str}`
      ]);
    }
  } catch (e) {
    console.log(e);
  }

  for (let k = 0; k < items.length; k++) {
    let item = items[k];
    let data = parse(item);
    data.pre = item.now;
    if (!data.preVolume || item.volume > data.preVolume)
      data.preVolume = item.volume;
    Object.assign(item, data);
    try {
      await updateItem(item);
    } catch (e) {
      console.log(e);
    }
  }
  return items;
}

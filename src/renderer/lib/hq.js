import { parse } from "./utils";
import { updateItem } from "@/lib/getTable";

export async function loadHQ(items) {
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
  } catch (e) {}

  items.forEach(item => {
    let data = parse(item);
    data.pre = item.now;
    if (!data.preVolume || item.volume > data.preVolume)
      data.preVolume = item.volume;
    Object.assign(item, data);
    let analyst = updateItem(item);
    Object.assign(item, analyst);
  });
  return items;
}

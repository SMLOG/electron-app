import { getTechDatas } from "./tech";
function isMacdJC(techData) {
  return (
    techData.MACD[techData.MACD.length - 1].bar > 0 &&
    techData.MACD[techData.MACD.length - 1].bar >
      techData.MACD[techData.MACD.length - 2].bar &&
    techData.MACD[techData.MACD.length - 2].bar >
      techData.MACD[techData.MACD.length - 3].bar &&
    techData.MACD[techData.MACD.length - 3].bar < 0
  );
}

const techMap = {
  WeekX: function({ item, kd, kw, km }) {
    return isMacdJC(kw);
  },
  KdWeekX: function({ item, kd, kw, km }) {
    return (
      kw.MACD[kw.MACD.length - 1].bar > kw.MACD[kw.MACD.length - 2].bar &&
      kw.MACD[kw.MACD.length - 2].bar > kw.MACD[kw.MACD.length - 3].bar &&
      isMacdJC(kd)
    );
  },
  NH: function({ item, kd, kw, km }) {
    console.log(kd);
    let m = item.now;
    let m5 = kd.MA.ma5;
    let m10 = kd.MA.ma10;
    let m20 = kd.MA.ma20;

    return m > m5 && m5 > m10 && m10 > m20;
  }
};

export function buildFilters() {
  let filters = {};
  for (let name in techMap) {
    filters[name] = function(items) {
      return items.filter(e => e[`_${name}`]);
    };
  }
  return filters;
}
export async function callFun(item) {
  let techDatas = await getTechDatas(item);

  for (let name in techMap) {
    item[`_${name}`] = techMap[name]({
      item: item,
      kd: techDatas.kd,
      kw: techDatas.kw,
      km: techDatas.km
    });
  }
}

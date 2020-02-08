import { getTechDatas } from "./tech";
function isMacdGolden(techData) {
  return (
    techData.MACD.length > 3 &&
    techData.MACD[techData.MACD.length - 1].bar > 0 &&
    techData.MACD[techData.MACD.length - 1].bar >
      techData.MACD[techData.MACD.length - 2].bar &&
    techData.MACD[techData.MACD.length - 2].bar >
      techData.MACD[techData.MACD.length - 3].bar &&
    techData.MACD[techData.MACD.length - 3].bar < 0
  );
}
function isMacdDeath(techData) {
  return (
    techData.MACD.length > 3 &&
    techData.MACD[techData.MACD.length - 1].bar < 0 &&
    techData.MACD[techData.MACD.length - 1].bar <
      techData.MACD[techData.MACD.length - 2].bar &&
    techData.MACD[techData.MACD.length - 2].bar <
      techData.MACD[techData.MACD.length - 3].bar
  );
}
const techMap = {
  "0&D": function({ item, kd, kw, km }) {
    return isMacdGolden(kd) && Math.abs(kd.MACD[kd.MACD.length - 1].dif) < 0.1;
  },
  D: function({ item, kd, kw, km }) {
    return isMacdGolden(kd);
  },
  "D&W": function({ item, kd, kw, km }) {
    return (
      kw.MACD.length > 4 &&
      kw.MACD[kw.MACD.length - 1].bar > kw.MACD[kw.MACD.length - 2].bar &&
      kw.MACD[kw.MACD.length - 2].bar > kw.MACD[kw.MACD.length - 3].bar &&
      isMacdGolden(kd)
    );
  },
  "D&Boll": function({ item, kd, kw, km }) {
    let boll = kd.BOLL;
    if (boll && boll.lenght > 5) {
      let arr = boll.slice(-5);
      //连续下跌，MA20反转信号
      if (
        arr[arr.length - 1].boll >= arr[arr.length - 2].boll &&
        arr[arr.length - 2].boll <= arr[arr.length - 3].boll
      ) {
        return true;
      }
    }
    return false;
  },
  W: function({ item, kd, kw, km }) {
    return isMacdGolden(kw);
  },
  M: function({ item, kd, kw, km }) {
    return isMacdGolden(km);
  },

  粘多: function({ item, kd, kw, km }) {
    //5,10,20日三线粘合 {取1%振幅内粘合}
    let m = item.now;
    if (kd.MA.length < 30) return false;
    let ma = kd.MA[kd.MA.length - 1];
    let ma1 = kd.MA[kd.MA.length - 2];
    let m5 = ma.ma5;
    let m10 = ma.ma10;
    let m20 = ma.ma20;
    let x1 = m5 / m10 - 1 < 0.01;
    let x2 = m5 / m20 - 1 < 0.01;
    let x3 = m10 / m20 - 1 < 0.01;

    //AA:=MA(C,5)>REF(MA(C,5),1);BB:=MA(C,10)>REF(MA(C,10),1);CC:=MA(C,5)>MA(C,10);{均线勾头向上}
    let aa = m5 > ma1.ma5;
    let bb = m10 > ma1.ma10;
    let cc = m20 > ma1.ma20;

    return x1 && x2 && x3 && aa && bb && cc;
  },
  Deth: function({ item, kd, kw, km }) {
    return isMacdDeath(kd);
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

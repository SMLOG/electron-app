import { getTech as getTechDatas } from "./tech";
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
  let len = techData.MACD.length;
  return (
    len > 3 &&
    techData.MACD[len - 1].bar < 0 &&
    techData.MACD[len - 1].bar < techData.MACD[len - 2].bar &&
    techData.MACD[len - 2].bar < techData.MACD[len - 3].bar
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
  "D&B": function({ item, kd, kw, km }) {
    let boll = kd.BOLL;
    if (boll && boll.length > 5) {
      let arr = boll;
      //连续下跌，MA20反转信号
      let nrValue =
        (arr[arr.length - 1].upper - arr[arr.length - 1].lower) /
        arr[arr.length - 1].boll;

      if (
        nrValue <
        0.1 /*&&
        arr[arr.length - 1].boll >= arr[arr.length - 2].boll &&
          arr[arr.length - 2].boll <= arr[arr.length - 3].boll &&
          arr[arr.length - 3].boll <= arr[arr.length - 4].boll*/
      ) {
        return true;
      }
    }
    return false;
  },
  三小: function({ item, kd, kw, km }) {
    let datas = kd.datas;
    if (datas && datas.length > 3) {
      let len = datas.length;
      if (
        datas[len - 1].close - datas[len - 1].open > 0 &&
        datas[len - 2].close - datas[len - 2].open > 0 &&
        datas[len - 3].close - datas[len - 3].open > 0 &&
        datas[len - 1].percent >= 0 &&
        datas[len - 2].percent >= 0 &&
        datas[len - 3].percent >= 0 &&
        datas[len - 1].percent < 0.03 &&
        datas[len - 2].percent < 0.03 &&
        datas[len - 3].percent < 0.03 &&
        datas[len - 1].percent +
          datas[len - 2].percent +
          datas[len - 3].percent <
          0.05
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
    techDatas.item = item;
    item[`_${name}`] = techMap[name](techDatas);
  }
}

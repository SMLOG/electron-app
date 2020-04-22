import { getTech as getTechDatas } from "./tech";
import storejs from "storejs";
import moment from "moment";

function getMill() {
  let total = Math.floor((new Date().getTime() % 86400000) + 28800000);
  let t9_30 = 34200000; //new Date("2020-01-01 09:30:00") - new Date("2020-01-01 00:00:00");
  let t11_30 = 41400000; // new Date("2020-01-01 11:30:00") - new Date("2020-01-01 00:00:00");
  let t13_00 = 46800000; //new Date("2020-01-01 13:00:00") - new Date("2020-01-01 00:00:00");
  let t15_00 = 54000000; // new Date("2020-01-01 15:00:00") - new Date("2020-01-01 00:00:00");
  if (total <= t9_30) return 0;
  if (total < t11_30) return total - t9_30;
  if (total <= t13_00) return t11_30 - t9_30;
  if (total <= t15_00) return total - t13_00 + t11_30 - t9_30;
  if (total > t15_00) return t15_00 - t13_00 + t11_30 - t9_30;
}
window.getMill = getMill;
let timeRatio = 0;
let turnover = 0;
setInterval(() => {
  timeRatio = getMill() / 1000;
  turnover = timeRatio * 0.000138;
}, 2000);

function oneLineCrossMa5Ma20(item, kd) {
  let i = kd.datas.length;
  return (
    kd.datas[i - 1].close > kd.datas[i - 1].open &&
    kd.datas[i - 1].close > kd.MA[i - 1].ma5 &&
    kd.datas[i - 1].close > kd.MA[i - 3].ma20 &&
    kd.datas[i - 2].close <= kd.MA[i - 1].ma5 &&
    kd.datas[i - 2].close <= kd.MA[i - 1].ma20
  );
}
function isMacdGolden(techData) {
  return (
    techData.MACD.length > 3 &&
    techData.MACD[techData.MACD.length - 1].bar >= 0 &&
    techData.MACD[techData.MACD.length - 1].bar >
      techData.MACD[techData.MACD.length - 2].bar &&
    techData.MACD[techData.MACD.length - 2].bar >
      techData.MACD[techData.MACD.length - 3].bar &&
    (techData.MACD[techData.MACD.length - 3].bar < 0 ||
      techData.MACD[techData.MACD.length - 4].bar < 0 ||
      techData.MACD[techData.MACD.length - 5].bar < 0)
  );
}

const techMap = {
  /* DU: function({ item, kd, kw, km }) {
    return (
      kd.MACD.length > 4 &&
      kd.MACD[kd.MACD.length - 1].bar > kd.MACD[kd.MACD.length - 2].bar &&
      item.now > item.open
    );
  } 
  D: function({ item, kd, kw, km }) {
    return isMacdGolden(kd);
  } 
  "0&D": function({ item, kd, kw, km }) {
    return isMacdGolden(kd) && Math.abs(kd.MACD[kd.MACD.length - 1].dif) < 0.1;
  },

  WU: function({ item, kd, kw, km }) {
    return (
      km.MACD.length > 4 &&
      kw.MACD[kw.MACD.length - 1].bar > kw.MACD[kw.MACD.length - 2].bar &&
      kw.datas[kw.MACD.length - 1].close > kw.datas[kw.MACD.length - 1].open
    );
  },
  连续两周: function({ item, kd, kw, km }) {
    return (
      km.MACD.length > 4 &&
      kw.MACD[kw.MACD.length - 1].bar >= 0 &&
      kw.MACD[kw.MACD.length - 2].bar >= 0 &&
      item.name.indexOf("中国") == -1
    );
  },
  连续两周上涨: function({ item, kd, kw, km }) {
    return (
      km.MACD.length > 4 &&
      kw.MACD[kw.MACD.length - 1].bar > kw.MACD[kw.MACD.length - 2].bar &&
      kw.MACD[kw.MACD.length - 2].bar >= kw.MACD[kw.MACD.length - 3].bar
    );
  },*/
  W20Y5: function({ item, kd, kw, km }) {
    return (
      kw.MA[kw.MA.length - 1].ma20 < item.now &&
      km.MA[km.MA.length - 1].ma5 < item.now &&
      km.KDJ[km.KDJ.length - 1].k < 50
    );
  },
  上510周: function({ item, kd, kw, km }) {
    let i = kd.datas.length;
    kd.datas[i - 1].close <= 0 && (i += -1);
    return (
      kw.MA[kw.MA.length - 1].ma5 < kd.datas[i - 1].close &&
      km.MA[km.MA.length - 1].ma10 < kd.datas[i - 1].close
    );
  } /*
  上60日: function({ item, kd, kw, km }) {
    let p = (item.now - kd.MA[kd.MA.length - 1].ma60) / item.now;
    return kd.MA[kd.MA.length - 1].ma60 < item.now && p > 0 && p < 0.03;
  },
  日波: function({ item, kd, kw, km }) {
    return (
      kd.KDJ[kd.KDJ.length - 1].k < 80 &&
      kd.KDJ[kd.KDJ.length - 2].k < kd.KDJ[kd.KDJ.length - 1].k &&
      kd.MACD[kd.MACD.length - 1].bar >= kd.MACD[kd.MACD.length - 2].bar
    );
  },*/,
  "穿5&20周": function({ item, kd, kw, km }) {
    return oneLineCrossMa5Ma20(item, kw);
  },
  "穿5&20日": function({ item, kd, kw, km }) {
    return oneLineCrossMa5Ma20(item, kd);
  },
  日B: function({ item, kd, kw, km }) {
    //月线看趋势，周线看方向，日线看买卖点
    //趋势线上阴线买，趋势线下阳线卖
    let i = kd.datas.length;
    return (
      item.now > item.open &&
      kd.datas[i - 1].close > kd.datas[i - 1].open &&
      item.now > kd.MA[i - 1].ma5 &&
      kd.datas[i - 1].close > kd.MA[i - 1].ma5 &&
      kd.datas[i - 2].close > kd.datas[i - 2].open &&
      kd.datas[i - 2].close <=
        kd.MA[i - 2]
          .ma5 /*&&
      kd.MACD[kd.MACD.length - 2].bar >= kd.MACD[kd.MACD.length - 3].bar*/
      /*km.MACD.length > 3 &&
      km.KDJ[km.KDJ.length - 1].k < 50 &&
      kw.KDJ[kw.KDJ.length - 1].k < 80 &&*/
      /* kd.KDJ[kd.KDJ.length - 1].k < 80 &&
      kd.KDJ[kd.KDJ.length - 2].k < kd.KDJ[kd.KDJ.length - 1].k &&
      Math.abs(km.MACD[km.MACD.length - 1].bar) < 0.5 &&
      km.KDJ[km.KDJ.length - 1].k < 80 &&
      km.MACD[km.MACD.length - 1].bar > km.MACD[km.MACD.length - 2].bar &&
      km.MACD[km.MACD.length - 2].bar > km.MACD[km.MACD.length - 3].bar &&
      kw.MACD[kw.MACD.length - 2].bar > kw.MACD[kw.MACD.length - 3].bar &&
      kd.MACD[kd.MACD.length - 1].bar >=
        kd.MACD[kd.MACD.length - 2]
          .bar*/
    );
  },
  GM: function({ item, kd, kw, km }) {
    return isMacdGolden(km);
  },
  日S: function({ item, kd, kw, km }) {
    let i = kd.datas.length;
    return (kd.datas[i - 1].close || kd.datas[i - 1].now) < kd.MA[i - 1].ma5;
  },
  /*,
  "D&B": function({ item, kd, kw, km }) {
    let boll = kd.BOLL;
    if (boll && boll.length > 5) {
      let arr = boll;
      let i = arr.length - 1;
      //连续下跌，MA20反转信号
      let nrValue = (arr[i].upper - arr[i].lower) / arr[i].boll;
      let kd5 = kd.datas.slice(-5);
      let boll5 = boll.slice(-5);
      if (
        (nrValue < 0.1 &&
          ((Math.min.apply(
            null,
            kd5.map(e => e.low)
          ) <=
            Math.max.apply(
              null,
              boll5.map(e => e.lower)
            ) &&
            Math.max.apply(
              null,
              kd5.map(e => e.high)
            ) >=
              Math.min.apply(
                null,
                boll5.map(e => e.boll)
              )) ||
            kd.datas[i].low > arr[i].upper)) ||
        kd.now >= arr[i].boll
      ) {
        return true;
      }
    }
    return false;
  } 
  B: function({ item, kd, kw, km }) {
    let boll = kd.BOLL;
    if (boll) {
      let arr = boll;
      let i = arr.length - 1;

      if (
        item.now >= arr[i].boll &&
        item.turnover > turnover &&
        item.now > item.open
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
  }
  M: function({ item, kd, kw, km }) {
    return isMacdGolden(km);
  },*/

  /*粘多: function({ item, kd, kw, km }) {
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
  }*/
};

export function buildFilters() {
  let filters = {};
  for (let name in techMap) {
    filters[name] = function(items) {
      return items.filter((e) => e[`_${name}`]);
    };
  }
  return filters;
}
export async function callFun(item, chooseDate) {
  let techDatas = await getTechDatas(item);
  if (chooseDate) {
    let ntechDatas = {};
    for (let p of ["kd", "kw", "km"]) {
      let i = techDatas[p].datas.filter((d) => d.day <= chooseDate).length;
      let nk = techDatas[p].datas.slice(0, i);
      ntechDatas[p] = {};
      for (let k in techDatas[p]) {
        if (k == "datas") ntechDatas[p][k] = nk;
        else {
          ntechDatas[p][k] = techDatas[p][k].slice(0, nk.length);
        }
      }
    }
    techDatas = ntechDatas;
    let citem = ntechDatas.kd.datas.slice(-1);
    item = Object.assign(item, { now: citem.close });
    item = Object.assign(item, citem);
    techDatas.item = item;
  }

  for (let name in techMap) {
    techDatas.item = item;
    item[`_${name}`] = techMap[name](techDatas);
  }
}

let tjdatas = storejs.get("tj") || [];
tjdatas.sort((a, b) => {
  return a.endDate && a.endDate <= b.endDate && a.startDate <= b.startDate;
});
let tjmap = {};
for (let i = 0; i < tjdatas.length; i++) {
  let item = tjdatas[i];
  item._i = i;
  if (!item.endDate || moment(item.endDate).isSame(new Date(), "day"))
    tjmap[item.code] = item;
}
export function tj(items) {
  //storejs.set("his" + (new Date().getDate() % 28), this.items3);
  let imap = {};
  if (items) {
    let needUpdate = false;
    for (let i = 0; i < items.length; i++) {
      let it = items[i];
      imap[it.code] = it;
      let item = tjmap[it.code];
      if (!tjmap[it.code]) {
        tjmap[it.code] = it;
        tjdatas.push(it);
        it.startDate = new Date();
        needUpdate = true;
        console.log(`add new ${it.code} to tj at ${it.startDate}`);
        tjmap[it.code].startNow = it.now;
      }
      if (item && item !== it) {
        item.endDate = null;
        it = Object.assign(it, {
          endDate: item.endDate,
          startDate: item.startDate,
          startNow: item.startNow,
          endNow: item.endNow,
        });
        tjmap[it.code] = it;
        tjdatas[item._i] = it;
        needUpdate = true;
      }
      it.endNow = it.now;
    }

    for (let i = 0, codes = Object.keys(tjmap); i < codes.length; i++) {
      if (!imap[codes[i]]) {
        let it = tjmap[codes[i]];

        it.endDate = new Date();
        needUpdate = true;
        console.log(
          `remove new ${it.code} to tj at ${it.startDate} - ${it.endDate}`
        );
      }
    }
    if (needUpdate) {
      storejs.set("tj", tjdatas);
    }
  } else return tjdatas;
}

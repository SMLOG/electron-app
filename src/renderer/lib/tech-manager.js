import { getTech } from "./tech";
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

function kdjGold(item, kw) {
  let i = kw.KDJ.length - 1;
  return kw.KDJ[i].k > kw.KDJ[i - 1].k && kw.KDJ[i - 2].k > kw.KDJ[i - 1].k;
}
function up5(item, km) {
  return km.MA[km.MA.length - 1].ma5 < item.close;
}
function upThrouhtN(item, km, n) {
  return (
    km.MA[km.MA.length - 1]["ma" + n] < item.close &&
    km.datas[km.datas.length - 2].close < km.MA[km.MA.length - 2]["ma" + n]
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
  上5月: function({ item, kd, kw, km }) {
    return up5(item, km);
  },
  上5周: function({ item, kd, kw, km }) {
    return up5(item, kw);
  },

  上5日: function({ item, kd, kw, km }) {
    return up5(item, kd);
  },
  上穿5月: function({ item, kd, kw, km }) {
    return upThrouhtN(item, km, 5);
  },
  上穿5周: function({ item, kd, kw, km }) {
    return upThrouhtN(item, kw, 5);
  },
  上穿20周: function({ item, kd, kw, km }) {
    return upThrouhtN(item, kw, 20);
  },
  上穿5日: function({ item, kd, kw, km }) {
    return upThrouhtN(item, kd, 5);
  },
  上穿20日: function({ item, kd, kw, km }) {
    return upThrouhtN(item, kd, 20);
  },
  KDJ周: function({ item, kd, kw }) {
    return kdjGold(item, kw);
  },
  KDJ日: function({ item, kd, kw }) {
    return kdjGold(item, kd);
  },
  MACD周: function({ item, kw }) {
    return isMacdGolden(kw);
  },
  MACD日: function({ item, kd }) {
    return isMacdGolden(kd);
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
      kd.datas[i - 2].close <= kd.MA[i - 2].ma5
    );
  },
  GM: function({ item, kd, kw, km }) {
    return isMacdGolden(km);
  },
  S: function({ item, kd, kw, km }) {
    let i = kw.datas.length;
    return item.close < kw.MA[i - 1].ma5;
  },
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
  let techDatas = await getTech(item);
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

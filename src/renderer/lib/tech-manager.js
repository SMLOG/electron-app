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
function upN(item, km, n = 5) {
  return km.MA[km.MA.length - 1]["ma" + n] < item.close;
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
    return upN(item, km, 5);
  },
  上5周: function({ item, kd, kw, km }) {
    return upN(item, kw, 5);
  },
  上20日: function({ item, kd, kw, km }) {
    return upN(item, kd, 20);
  },
  上5日: function({ item, kd, kw, km }) {
    return upN(item, kd, 5);
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
  量穿5日: function({ item, kd }) {
    return item.volume > kd.VOLUME[kd.datas.length - 1].volume5;
  },

  日B: function({ item, kd, kw, km }) {
    //月线看趋势，周线看方向，日线看买卖点
    //趋势线上阴线买，趋势线下阳线卖
    //买入的方式通常是两种:一种是在股票突破时买入，另一种方式是在低位向上转折时买入
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
  上涨放量: function({ item, kd, kw, km }) {
    let i = kd.datas.length;
    if (i < 10) return false;
    let items = kd.datas.slice(i - 5).filter((e) => e.close > e.open);
    return (
      items.filter((e) => e.volume >= kd.VOLUME[i - 1].volume5).length >=
      items.length - 1
    );
  },
  下跌缩量: function({ item, kd, kw, km }) {
    let i = kd.datas.length;
    if (i < 10) return false;

    let items = kd.datas.slice(i - 5).filter((e) => e.close < e.open);
    return (
      items.filter((e) => e.volume < kd.VOLUME[i - 1].volume5).length >=
      items.length - 1
    );
  },
  换手率大1: function({ item, kd, kw, km }) {
    return item.turnover >= 1;
  },

  下跌放缓: function({ item, kd, kw, km }) {
    let i = kd.datas.length;
    if (i < 10) return false;
    let j = i - 1;

    if ((kd.datas[j].close - kd.datas[j - 4].close) / kd.MA[j].ma5 > -0.05)
      return false;
    if (
      kd.datas[j].close < kd.MA[j].ma5 &&
      kd.datas[j].close < kd.datas[j - 1].close
    )
      return false;

    return true;
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

  for (let name in techMap) {
    techDatas.item = item;
    item[`_${name}`] = techMap[name](techDatas);
  }
  [item[`score`], item.tscore, item.score_desc] = score(techDatas);
}
export function score({ item, kd, kw, km }) {
  let s = 0;
  let t = 0;
  let desc = "";
  if (kw.MACD[kw.MACD.length - 1].bar >= 0) {
    s += 1;
    desc += "MACD BAR>=0\n";
    if (kw.MACD[kw.MACD.length - 1].dif < 0) {
      s += 1;
      desc += "MACD DIF<0\n";
    }
  }
  t += 2;
  if (
    kw.datas.slice(-6).some((val, i, arr) => {
      return val.percent > 0.1;
    })
  ) {
    desc += "Price > 10% (6)\n";
    s += 1;
  }
  t += 1;
  if (
    kw.VOLUME[kw.datas.length - 1].volume5 >
      kw.datas[kw.datas.length - 2].volume &&
    kw.datas[kw.datas.length - 1].volume >
      kw.VOLUME[kw.datas.length - 1].volume5
  ) {
    s += 1;
    desc += "Volume >-1 \n";
  }
  t += 1;

  if (
    (kw.MA[kw.MA.length - 1].ma10 - kw.MA[kw.MA.length - 3].ma10) /
      kw.MA[kw.MA.length - 1].ma10 <
    0.001
  ) {
    s += 1;
    desc += "MA10 平滑 \n";
  }
  t += 1;
  return [s, t, desc];
}

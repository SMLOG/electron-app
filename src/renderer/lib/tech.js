import { timeout } from "./utils";
import { getCacheData } from "./db";
import { loadScripts } from "./utils";
import moment from "moment";
export async function getTechDatas(item, cache = true) {
  let techId = "tech_" + item.code;
  let get = async () => {
    let ifr = document.getElementsByTagName("iframe")[0];
    let url = ifr.src.split("?")[0] + "?" + item.code;
    ifr.src = url;
    await new Promise((resolve, reject) => {
      ifr.onload = function(e) {
        resolve();
      };
    });
    ifr.contentWindow["item"] = item;
    let result = {};
    for (let v of ["kd", "kw", "km"]) {
      ifr.contentWindow[techId] = null;
      ifr.contentWindow.chart_.showView({
        view: v
      });
      for (;;) {
        if (ifr.contentWindow[techId]) {
          let ret = ifr.contentWindow[techId];
          ifr.contentWindow[techId] = null;

          result[v] = JSON.parse(JSON.stringify(ret)); //deepCopy(ret);
          break;
        }
        await timeout(100);
      }
    }

    return result;
  };
  let techDatas;
  if (cache) techDatas = await getCacheData(item.date, techId, get);
  else {
    techDatas = await get();
    await getCacheData(item.date, techId, get, techDatas);
  }
  return techDatas;
}
window.getTechDatas = getTechDatas;

let loadscript = loadScripts(["/static/js/sf_sdk.js"]);

export async function getTdatas(code) {
  await loadscript;
  return await new Promise((resolve, reject) => {
    KKE.api(
      "datas.t.get",
      {
        symbol: code
      },
      function(resp) {
        resolve(resp);
      }
    );
  });
}
window.getTdatas = getTdatas;

export async function get5Tdatas(code) {
  await loadscript;

  return await new Promise((resolve, reject) => {
    KKE.api(
      "datas.t.get",
      {
        assisthq: 1,
        dataformatter: undefined,
        date: null,
        dist5: 0,
        faker: "CN",
        ssl: true,
        symbol: code,
        withI: true,
        withT5: 1
      },
      function(data) {
        resolve(data);
      }
    );
  });
}
window.get5Tdatas = get5Tdatas;
let tmpromise = (async () => {
  await loadscript;
  return new Promise((resolve, reject) => {
    KKE.api("plugins.techchart.get", "", tchar => {
      var tm = tchar.tChart({});
      tm.createChart({ name: "MACD" });
      //tm.createChart({ name: "kDJ" });
      tm.createChart({ name: "BOLL" });
      tm.createChart({ name: "MA" });
      console.log(tm);
      resolve([tm, tchar.util]);
    });
  });
})();

function rejustRight(factor, datas, market, kdatas, util) {
  let dir = "q";
  if (factor) {
    var kdatas2,
      r,
      l,
      c,
      h,
      d,
      u,
      p,
      f,
      v,
      g,
      b,
      y = !(-828 === factor),
      w = 0;
    kdatas2 = kdatas;
    b = kdatas2.length;
    if (y) {
      for (g = b - 1; g >= 0; g--) {
        for (p = kdatas2[g], f = util.dateUtil.ds(p.date); f < datas[w].d; )
          w++;
        if (((v = Number(datas[w].f)), "HK" === market)) {
          if (
            ((p.high *= v),
            (p.low *= v),
            (p.open *= v),
            (p.close *= v),
            "h" === dir)
          ) {
            var k = Number(datas[w].c);
            (p.high += k), (p.low += k), (p.open += k), (p.close += k);
          }
        } else {
          if ("US" === market) {
            (p.high *= v), (p.low *= v), (p.open *= v), (p.close *= v);
          } else {
            if ("h" === dir) {
              p.high *= v;
              p.low *= v;
              p.open *= v;
              p.close *= v;
            } else {
              p.high /= v;
              p.low /= v;
              p.open /= v;
              p.close /= v;
            }
          }
        }
      }
      for (g = 0; b > g; g++) {
        p = kdatas2[g];
        v = Number(datas[datas.length - 1].f);
        0 == g &&
          ((d = p.prevclose),
          isNaN(d) || 0 >= d
            ? (d = p.open)
            : ((d =
                "HK" === market
                  ? p.prevclose * v
                  : "h" === dir
                  ? p.prevclose * v
                  : p.prevclose / v),
              (p.prevclose = d)));
        p.amplitude = p.high - p.low;
        p.ampP = p.amplitude / d;
        p.change = p.close - d;
        p.percent = p.change / d;
        d = p.close;
      }
    }
    var S;
    1 == b &&
      ((p = kdatas2[b - 1]),
      (S = {
        open: p.open,
        high: p.high,
        low: p.low,
        close: p.close,
        price: p.close,
        volume: p.volume,
        totalVolume: p.volume,
        date: util.dd(p.date)
      }));
    l = util.kUtil.mw(kdatas2, S, null, null, 0 / 0);
    h = l[0];
    c = l[1];
    u = l[2];
    util.kUtil.pd(h, null);
    util.kUtil.pd(c, null);
    util.kUtil.pd(u, null);
    //console.log(kdatas2, h, c, u);
    return [kdatas2, h, c];
    //kDb.initState(globalCfg.URLHASH["q" == dir ? "KWF" : "KWB"], h);
    //kDb.initState(globalCfg.URLHASH["q" == dir ? "KMF" : "KMB"], c);
    //kDb.initState(globalCfg.URLHASH["q" == dir ? "KYF" : "KYB"], u);
    //var M = util.clone(kdatas2, null);
    //kDb.initState(globalCfg.URLHASH["q" == dir ? "KCLF" : "KCLB"], M, !1, !0),
    //  isMain || kDb.initState(r, kdatas2);
  }
}

async function getReData(item) {
  await loadscript;
  return await new Promise((resolve, reject) => {
    KKE.api(
      "datas.k.loadReData",
      {
        symbol: item.code,
        market: "CN",
        dir: "q",
        ssl: true
      },
      function(data) {
        resolve(data);
      }
    );
  });
}

export async function getTech(item) {
  await loadscript;
  let [tm, util] = await tmpromise;
  let techId = "tech_1" + item.code;

  let itemDatas = window[techId] || (await getCacheData(item.date, techId));
  if (
    itemDatas &&
    itemDatas.kd.datas &&
    moment(item.date).format("YYYY-MM-DD") ==
      moment(itemDatas.kd.datas.slice(-1)[0].date).format("YYYY-MM-DD")
  ) {
    let ps = ["kd", "kw", "km"];

    for (let j = 0; j < ps.length; j++) {
      let type = ps[j];
      let macd = itemDatas[type].MACD;
      let i = macd.length - 2;
      let ema12 = (macd[i].ema12 * 11) / 13 + (item.now * 2) / 13;
      let ema26 = (macd[i].ema26 * 25) / 27 + (item.now * 2) / 27;

      let diff = ema12 - ema26;
      let dea = (macd[i].dea * 8) / 10 + (diff * 2) / 10;
      macd[i + 1].diff = diff;
      macd[i + 1].dea = dea;
      macd[i + 1].bar = (diff - dea) * 2;
    }
    return (window[techId] = itemDatas);
  } else {
    let datas = await new Promise((resolve, reject) => {
      KKE.api(
        "datas.k.get",
        { symbol: item.code, newthour: "09:00", ssl: true },
        function(d) {
          resolve(d);
        }
      );
    });
    let reData = await getReData(item);
    let ret;
    if (reData && reData.data) {
      reData = reData.data;
      let factor;
      for (var t = 0; !reData[t].f; ) t++;
      factor = reData[t].f;
      if (factor) {
        [datas.data.day, datas.data.week, datas.data.month] = rejustRight(
          factor,
          reData,
          "CN",
          datas.data.day,
          util
        );
        //ret = { kd: k, kw: w, km: m };
      }
    }

    ret = {
      kd: tm.linkData(datas.data.day),
      kw: tm.linkData(datas.data.week),
      km: tm.linkData(datas.data.month)
    };

    await getCacheData(item.date, techId, null, ret);
    return (window[techId] = ret);
  }
}
window.getTech = getTech;

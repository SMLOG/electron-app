import JSONP from "node-jsonp";

const KTYPE = {
  5: "M5",
  15: "M15",
  30: "M30",
  60: "M60",
  101: "D",
  102: "W",
  103: "M",
  D: 101,
  M: 103,
  M5: 5,
  M15: 15,
  M30: 30,
  M60: 60,
  W: 102,
};
const CFG = {
  0: "Bfq",
  1: "Qfq",
  2: "Hfq",
  Bfq: 0,
  Hfq: 2,
};
//指数行情 https://38.push2.eastmoney.com/api/qt/ulist.np/get?secids=1.000001,0.399001,0.399006,0.399005,fields=f1,f2,f3,f4,f12,f13,f14,f107,f152&ut=6d2ffaa6a585d612eda28417681d58fb',

export async function getSelfList(stocklist) {
  let url = "https://38.push2.eastmoney.com/api/qt/ulist/sse";
  //https://38.push2.eastmoney.com/api/qt/ulist/sse?invt=3&pi=0&pz=3&mpi=2000&secids=1.688298,1.605199,1.688060&ut=6d2ffaa6a585d612eda28417681d58fb&fields=f12,f13,f19,f14,f139,f148,f2,f4,f1,f125,f18,f3,f152,f5,f30,f31,f32,f6,f8,f7,f10,f22,f9,f112,f100&po=1

  let datas = {
    pn: 0,
    pi: 0,
    pz: 200, // 每页大小
    mpi: 2000, //refeshtime
    secids: stocklist.join(","), //stocklist
    po: 1, // 排序方向（正序填0，倒序填1，默认为1。）
    // fid: "f3",      // 排序字段
    fields:
      "f12,f13,f19,f14,f139,f148,f2,f4,f1,f125,f18,f3,f152,f5,f30,f31,f32,f6,f8,f7,f10,f22,f9,f112,f100", // 需要获取的字段
    ut: "6d2ffaa6a585d612eda28417681d58fb",
    invt: 3,
    _: +new Date(),
  };

  return await new Promise((resolve, reject) => {
    JSONP(url, datas, "cb", (json) => {
      console.log(json);
      let datalist = json.data.diff;
      datalist = datalist.map((e) => {
        return {
          code: (e.f12.substring(0, 1) == 6 ? "sh" : "sz") + e.f12,
          name: e.f14,
          now: e.f2,
          close: e.f2,
          changePV: e.f3,
          changeP: e.f3 + "%",
          changeV: e.f4,
          change: e.f4,
          open: e.f17,
          preClose: e.f18,
          preclose: e.f18,
          turnover: e.f8,
          pe: e.f9,
          lb: e.f10,
          pe_ttm: e.f115,
          volume: e.f5,
          ltg: parseFloat((e.f21 / e.f2 / 100000000).toFixed(2)),
          amount: e.f6,
          high: e.f15,
          zf: e.f7,
          low: e.f16,
          zsz: (e.f20 / 100000000).toFixed(2),
          lz: (e.f21 / 100000000).toFixed(2),
          avg: (e.f6 / e.f5).toFixed(2),
          zf60: e.f24,
          zf250: e.f25,
          firstDay: e.f26,
          date: new Date(e.f124 * 1000),
        };
      });
      return resolve(datalist);
    });
  });
}

export async function getList() {
  let hq = "http://25.push2.eastmoney.com/api/qt/clist/get";

  let datas = {
    pn: 0,
    pz: 20, // 每页大小
    // fs: "m:113+t:15",       // 证券过滤器
    // fs: "m:1+t:2",       // 证券过滤器
    po: 1, // 排序方向（正序填0，倒序填1，默认为1。）
    // fid: "f3",      // 排序字段
    np: 1,
    // fields: "f1,f12,f14,f2,f4,f3,f17,f15,f16,f28,f5,f6,f34,f35,f108",       // 需要获取的字段
    ut: "bd1d9ddb04089700cf9c27f6f7426281",
    fltt: 2,
    invt: 2,
    _: +new Date(),
  };

  datas = Object.assign(datas, {
    fid: "f3",
    fields:
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f27,f28,f29,f22,f11,f62,f124,f128,f136,f115,f152",
    fs: "m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23",
    pn: 1,
    po: "1",
    pz: 200000,
  });

  return await new Promise((resolve, reject) => {
    JSONP(hq, datas, "cb", (json) => {
      console.log(json);
      let datalist = json.data.diff;
      datalist = datalist.map((e) => {
        return {
          code: (e.f12.substring(0, 1) == 6 ? "sh" : "sz") + e.f12,
          name: e.f14,
          now: e.f2,
          close: e.f2,
          changePV: e.f3,
          changeP: e.f3 + "%",
          changeV: e.f4,
          change: e.f4,
          open: e.f17,
          preClose: e.f18,
          preclose: e.f18,
          turnover: e.f8,
          pe: e.f9,
          lb: e.f10,
          pe_ttm: e.f115,
          volume: e.f5,
          ltg: parseFloat((e.f21 / e.f2 / 100000000).toFixed(2)),
          amount: e.f6,
          high: e.f15,
          zf: e.f7,
          low: e.f16,
          zsz: (e.f20 / 100000000).toFixed(2),
          lz: (e.f21 / 100000000).toFixed(2),
          avg: (e.f6 / e.f5).toFixed(2),
          zf60: e.f24,
          zf250: e.f25,
          firstDay: e.f26,
          date: new Date(e.f124 * 1000),
        };
      });
      return resolve(datalist);
    });
  });
}
function strKlines2Objects(kdataStr) {
  for (var i = [], e = kdataStr.length, o = 0; o < e; o++) {
    var s = kdataStr[o].split(","),
      r = {};
    ((r.date = new Date(s[0])), (r.time = s[0])),
      (r.open = parseFloat(s[1])),
      (r.close = parseFloat(s[2])),
      (r.high = parseFloat(s[3])),
      (r.low = parseFloat(s[4])),
      (r.volume = Number(s[5])),
      (r.amount = Number(s[6])),
      (r.amplitudeP = Number(s[7])),
      (r.increaseP = Number(s[8])),
      (r.increase = Number(s[9])),
      i.push(r);
  }
  return i;
}
export async function getKlineData(code) {
  let url = `http://${Math.floor(
    99 * Math.random() + 1
  )}.push2his.eastmoney.com/api/qt/stock/kline/get`;
  //?secid=${code}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59&klt=101&fqt=0&end=20500101&lmt=120&_=1592709205309
  let data = {
    secid: code,
    ut: "fa5fd1943c7b386f172d6893dbfba10b",
    fields1: "f1,f2,f3,f4,f5",
    fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60",
    klt: KTYPE.D,
    fqt: CFG.Bfq,
    beg: 0,
    end: 20500101,
    smplmt: 460,
    lmt: 1000000,
    _: +new Date(),
  };
  let json = await new Promise((resolve, reject) => {
    JSONP(url, data, "cb", (json) => {
      return resolve(json);
    });
  });
  json.data.klines = strKlines2Objects(json.data.klines);
  return json;
}
export function tech(klines) {
  /* function e(techName, klines) {
    for (
      var tDatas = cacTechDatas(klines), n = [], a = tDatas.length, s = 0;
      s < a;
      s++
    ) {
      var r = tDatas[s],
        l = {};
      switch (techName) {
        case "VAVERAGE":
          var h = void 0 === r.volume5 ? "-" : r.volume5.toFixed(3) / 1,
            d = void 0 === r.volume10 ? "-" : r.volume10.toFixed(3) / 1;
          (l = [r.time, h, d]), n.push(l);
          break;
        case "CMA":
          var p = void 0 === r.Average5 ? "-" : r.Average5.toFixed(3) / 1,
            c = void 0 === r.Average10 ? "-" : r.Average10.toFixed(3) / 1,
            A = void 0 === r.Average20 ? "-" : r.Average20.toFixed(3) / 1,
            g = void 0 === r.Average30 ? "-" : r.Average30.toFixed(3) / 1,
            f = void 0 === r.Average60 ? "-" : r.Average60.toFixed(3) / 1;
          (l = [r.time, p, c, A, f]), n.push(l);
          break;
        case "MA":
          var p = void 0 === r.Average5 ? "-" : r.Average5.toFixed(3),
            c = void 0 === r.Average10 ? "-" : r.Average10.toFixed(3),
            A = void 0 === r.Average20 ? "-" : r.Average20.toFixed(3),
            g = void 0 === r.Average30 ? "-" : r.Average30.toFixed(3),
            m = void 0 === r.Average3 ? "-" : r.Average3.toFixed(3),
            u = void 0 === r.Average6 ? "-" : r.Average6.toFixed(3),
            x = void 0 === r.Average12 ? "-" : r.Average12.toFixed(3),
            v = void 0 === r.Average24 ? "-" : r.Average24.toFixed(3),
            w = void 0 === r.Average50 ? "-" : r.Average50.toFixed(3),
            f = void 0 === r.Average60 ? "-" : r.Average60.toFixed(3);
          (l[r.time] = [p, c, A, g, m, u, x, v, w, f]), n.push(l);
          break;
        case "ASI":
          var y = void 0 === r.ASI ? "-" : r.ASI.toFixed(3);
          (l[r.time] = [y]), n.push(l);
          break;
        case "EXPMA":
          var x = void 0 === r.Average12 ? "-" : r.Average12.toFixed(3),
            w = void 0 === r.Average50 ? "-" : r.Average50.toFixed(3);
          (l = [r.time, x, w]), n.push(l);
          break;
        case "SAR":
          var M = void 0 === r.SAR ? "-" : r.SAR.toFixed(3);
          (l = [r.time, M]), n.push(l);
          break;
        case "BBI":
          var B = void 0 === r.BBI ? "-" : r.BBI.toFixed(3);
          (l = [r.time, B]), n.push(l);
          break;
        case "RSI":
          if (s > 4) {
            var C =
                0 == r.RSI_DN_A
                  ? "-"
                  : ((r.RSI_UP_A / r.RSI_DN_A) * 100).toFixed(3) / 1,
              I =
                0 == r.RSI_DN_B
                  ? "-"
                  : ((r.RSI_UP_B / r.RSI_DN_B) * 100).toFixed(3) / 1,
              b =
                "0" == r.RSI_DN_C
                  ? "-"
                  : ((r.RSI_UP_C / r.RSI_DN_C) * 100).toFixed(3) / 1;
            l = [r.time, C, I, b];
          } else l = ["-", "-", "-", "-"];
          n.push(l);
          break;
        case "KDJ":
          var k = void 0 === r.KDJ_K ? "-" : r.KDJ_K.toFixed(3) / 1,
            D = void 0 === r.KDJ_D ? "-" : r.KDJ_D.toFixed(3) / 1,
            E = void 0 === r.KDJ_J ? "-" : r.KDJ_J.toFixed(3) / 1;
          (l = [r.time, k, D, E]), n.push(l);
          break;
        case "MACD":
          var R = void 0 === r.MACD_DIF ? "-" : r.MACD_DIF.toFixed(3) / 1,
            Q = void 0 === r.MACD_DEA ? "-" : r.MACD_DEA.toFixed(3) / 1,
            _ = void 0 === r.MACD ? "-" : r.MACD.toFixed(3) / 1;
          "-" != R && "-" != Q && (_ = (2 * (R - Q)).toFixed(3) / 1),
            (l = [r.time, R, Q, _]),
            n.push(l);
          break;
        case "WR":
          var j = void 0 === r.WR_A ? "-" : r.WR_A.toFixed(3) / 1,
            O = void 0 === r.WR_B ? "-" : r.WR_B.toFixed(3) / 1;
          (l = [r.time, j, O]), n.push(l);
          break;
        case "DMI":
          var S = void 0 === r.DMI_PDI ? "-" : r.DMI_PDI.toFixed(3) / 1,
            F = void 0 === r.DMI_MDI ? "-" : r.DMI_MDI.toFixed(3) / 1,
            G = void 0 === r.DMI_ADX ? "-" : r.DMI_ADX.toFixed(3) / 1,
            Y = void 0 === r.DMI_ADXR ? "-" : r.DMI_ADXR.toFixed(3) / 1;
          (l = [r.time, S, F, G, Y]), n.push(l);
          break;
        case "BIAS":
          var T = void 0 === r.BIAS_A ? "-" : r.BIAS_A.toFixed(3) / 1,
            K = void 0 === r.BIAS_B ? "-" : r.BIAS_B.toFixed(3) / 1,
            U = void 0 === r.BIAS_C ? "-" : r.BIAS_C.toFixed(3) / 1;
          (l = [r.time, T, K, U]), n.push(l);
          break;
        case "OBV":
          var J = void 0 === r.OBV ? "-" : r.OBV.toFixed(3) / 1,
            L = void 0 === r.OBV_MA ? "-" : r.OBV_MA.toFixed(3) / 1;
          (l = [r.time, J, L]), n.push(l);
          break;
        case "CCI":
          var P = void 0 === r.CCI ? "-" : r.CCI.toFixed(3) / 1;
          (l = [r.time, P]), n.push(l);
          break;
        case "ROC":
          var H = void 0 === r.ROC ? "-" : r.ROC.toFixed(3) / 1,
            W = void 0 === r.ROC_MA ? "-" : r.ROC_MA.toFixed(3) / 1;
          (l = [r.time, H, W]), n.push(l);
          break;
        case "CR":
          var N = void 0 === r.CR_A ? "-" : r.CR_A.toFixed(3) / 1,
            Z = void 0 === r.CR_B ? "-" : r.CR_B.toFixed(3) / 1,
            V = void 0 === r.CR_C ? "-" : r.CR_C.toFixed(3) / 1,
            q = void 0 === r.CR ? "-" : r.CR.toFixed(3) / 1;
          (l = [r.time, N, Z, V, q]), n.push(l);
          break;
        case "BOLL":
          var X = void 0 === r.BOLL ? "-" : r.BOLL.toFixed(3) / 1,
            z = void 0 === r.BOLL_UPPER ? "-" : r.BOLL_UPPER.toFixed(3) / 1,
            $ = void 0 === r.BOLL_LOWER ? "-" : r.BOLL_LOWER.toFixed(3) / 1,
            tt = void 0 === r.high ? "-" : r.high.toFixed(3) / 1;
          (l = [r.time, X, z, $, tt]), n.push(l);
      }
    }
    return n;
  }*/

  function cacTechDatas(klines) {
    let data = klines.map((e) => Object.assign(a(), e));
    return cacTechObjectDatas(data);
  }
  function cacTechObjectDatas(i) {
    var e = i.length;
    for (
      var l,
        h,
        d,
        p,
        c,
        A,
        g,
        f,
        m,
        u,
        x,
        v,
        w,
        y,
        M,
        B,
        C,
        I,
        b,
        k,
        D,
        E,
        R,
        Q,
        _,
        j,
        O,
        S,
        F,
        G,
        Y = !0,
        T = 0,
        K = 0,
        o = 0;
      o < e;
      o++
    ) {
      if (o >= 4) {
        (l = 0), (h = 0);
        for (var U = 0; U < 5; U++)
          (l += i[o - U].close), (h += i[o - U].volume);
        (i[o].Average5 = l / 5), (i[o].volume5 = h / 5);
      }
      if (o >= 9) {
        (l = 0), (h = 0);
        for (var U = 0; U < 10; U++)
          (l += i[o - U].close), (h += i[o - U].volume);
        (i[o].Average10 = l / 10), (i[o].volume10 = h / 10);
      }
      if (o >= 19) {
        l = 0;
        for (var U = 0; U < 20; U++) l += i[o - U].close;
        i[o].Average20 = l / 20;
      }
      if (o >= 29) {
        l = 0;
        for (var U = 0; U < 30; U++) l += i[o - U].close;
        i[o].Average30 = l / 30;
      }
      if (o >= 2) {
        l = 0;
        for (var U = 0; U < 3; U++) l += i[o - U].close;
        i[o].Average3 = l / 3;
      }
      if (o >= 5) {
        l = 0;
        for (var U = 0; U < 6; U++) l += i[o - U].close;
        i[o].Average6 = l / 6;
      }
      if (o >= 11) {
        l = 0;
        for (var U = 0; U < 12; U++) l += i[o - U].close;
        i[o].Average12 = l / 12;
      }
      if (o >= 23) {
        l = 0;
        for (var U = 0; U < 24; U++) l += i[o - U].close;
        i[o].Average24 = l / 24;
      }
      if (o >= 49) {
        l = 0;
        for (var U = 0; U < 50; U++) l += i[o - U].close;
        i[o].Average50 = l / 50;
      }
      if (o >= 59) {
        l = 0;
        for (var U = 0; U < 60; U++) l += i[o - U].close;
        i[o].Average60 = l / 60;
      }
      if (
        (o >= 1 &&
          ((d = i[o - 1].close),
          (p = Math.abs(i[o].high - d)),
          (c = Math.abs(i[o].low - d)),
          (A = Math.abs(i[o].high - i[o - 1].low)),
          (g = Math.abs(d - i[o - 1].open)),
          (f =
            p > c && p > A
              ? p + c / 2 + g / 4
              : c > A && c > p
              ? c + p / 2 + g / 4
              : A + g / 4),
          (m = i[o].close + (i[o].close - i[o].open) / 2 - i[o - 1].open),
          0 != f &&
            (i[o].ASI = i[o - 1].ASI + ((16 * m) / f) * Math.max(p, c))),
        o >= 5)
      ) {
        l = 0;
        for (var U = 0; U < 6; U++) l += i[o - U].close;
        0 != l && (i[o].BIAS_A = 100 * (i[o].close / (l / 6) - 1));
      }
      if (o >= 11) {
        l = 0;
        for (var U = 0; U < 12; U++) l += i[o - U].close;
        0 != l && (i[o].BIAS_B = 100 * (i[o].close / (l / 12) - 1));
      }
      if (o >= 23) {
        l = 0;
        for (var U = 0; U < 24; U++) l += i[o - U].close;
        0 != l && (i[o].BIAS_C = 100 * (i[o].close / (l / 24) - 1));
      }
      if (o >= 19) {
        l = 0;
        for (var U = 0; U < 20; U++) l += i[o - U].close;
        (i[o].BOLL = l / 20), (l = 0);
        for (var U = 0; U < 20; U++)
          l += (i[o - U].close - i[o].BOLL) * (i[o - U].close - i[o].BOLL);
        (u = parseFloat(Math.sqrt(l / 20))),
          (i[o].BOLL_UPPER = i[o].BOLL + 2 * u),
          (i[o].BOLL_LOWER = i[o].BOLL - 2 * u);
      }
      if (((i[o].CCI_TYP = (i[o].high + i[o].low + i[o].close) / 3), o >= 13)) {
        l = 0;
        for (var U = 0; U < 14; U++) l += i[o - U].close;
        l / 14, (l = 0);
        for (var U = 0; U < 14; U++) l += i[o - U].CCI_TYP;
        (x = l / 14), (l = 0);
        for (var U = 0; U < 14; U++) l += Math.abs(i[o - U].CCI_TYP - x);
        0 != l && (i[o].CCI = (i[o].CCI_TYP - x) / ((l / 14) * 0.015));
      }
      if (((i[o].CR_MID = (i[o].high + i[o].low) / 2), 0 == o))
        (i[o].CR = 100),
          (i[o].CR_AX = Math.max(i[o].high - i[o].CR_MID, 0)),
          (i[o].CR_BX = Math.max(i[o].CR_MID - i[o].low, 0));
      else {
        (i[o].CR_AX = Math.max(i[o].high - i[o - 1].CR_MID, 0)),
          (i[o].CR_BX = Math.max(i[o - 1].CR_MID - i[o].low, 0)),
          (v = w = 0);
        for (var U = 0; U < 26 && U < o + 1; U++)
          (v += i[o - U].CR_AX), (w += i[o - U].CR_BX);
        if ((0 != w && (i[o].CR = (v / w) * 100), o >= 9)) {
          l = 0;
          for (var U = 0; U < 10; U++) l += i[o - U].CR;
          o + 5 < i.Length && (i[o + 5].CR_A = l / 10);
        }
        if (o >= 19) {
          l = 0;
          for (var U = 0; U < 20; U++) l += i[o - U].CR;
          o + 9 < i.Length && (i[o + 9].CR_B = l / 20);
        }
        if (o >= 39) {
          l = 0;
          for (var U = 0; U < 40; U++) l += i[o - U].CR;
          o + 17 < i.Length && (i[o + 17].CR_C = l / 40);
        }
      }
      if (
        (0 == o
          ? ((i[o].DMI_TR = Math.max(
              Math.max(i[o].high - i[o].low, Math.abs(i[o].high - i[o].close)),
              Math.abs(i[o].close - i[o].low)
            )),
            (y = 0),
            (M = 0))
          : ((i[o].DMI_TR = Math.max(
              Math.max(
                i[o].high - i[o].low,
                Math.abs(i[o].high - i[o - 1].close)
              ),
              Math.abs(i[o - 1].close - i[o].low)
            )),
            (y = i[o].high - i[o - 1].high),
            (M = i[o - 1].low - i[o].low)),
        (i[o].DMI_DMP = y > 0 && y > M ? y : 0),
        (i[o].DMI_DMM = M > 0 && M > y ? M : 0),
        o >= 13)
      ) {
        if (13 == o) {
          B = C = I = 0;
          for (var U = 0; U < 14; U++)
            (B += i[o - U].DMI_TR),
              (C += i[o - U].DMI_DMP),
              (I += i[o - U].DMI_DMM);
          (i[o].DMI_EXPMEMA_TR = B / 14),
            (i[o].DMI_EXPMEMA_DMP = C / 14),
            (i[o].DMI_EXPMEMA_DMM = I / 14);
        } else
          (i[o].DMI_EXPMEMA_TR =
            (2 * i[o].DMI_TR + 13 * i[o - 1].DMI_EXPMEMA_TR) / 15),
            (i[o].DMI_EXPMEMA_DMP =
              (2 * i[o].DMI_DMP + 13 * i[o - 1].DMI_EXPMEMA_DMP) / 15),
            (i[o].DMI_EXPMEMA_DMM =
              (2 * i[o].DMI_DMM + 13 * i[o - 1].DMI_EXPMEMA_DMM) / 15);
        0 != i[o].DMI_EXPMEMA_TR &&
          ((i[o].DMI_PDI = (100 * i[o].DMI_EXPMEMA_DMP) / i[o].DMI_EXPMEMA_TR),
          (i[o].DMI_MDI = (100 * i[o].DMI_EXPMEMA_DMM) / i[o].DMI_EXPMEMA_TR),
          i[o].DMI_PDI + i[o].DMI_MDI != 0 &&
            (i[o].DMI_MPDI =
              (Math.abs(i[o].DMI_MDI - i[o].DMI_PDI) /
                (i[o].DMI_MDI + i[o].DMI_PDI)) *
              100));
      }
      if (o >= 18)
        if (18 == o) {
          b = 0;
          for (var U = 0; U < 6; U++) b += i[o - U].DMI_MPDI;
          i[o].DMI_ADX = b / 6;
        } else i[o].DMI_ADX = (2 * i[o].DMI_MPDI + 5 * i[o - 1].DMI_ADX) / 7;
      if (o >= 23)
        if (23 == o) {
          k = 0;
          for (var U = 0; U < 6; U++) k += i[o - U].DMI_ADX;
          i[o].DMI_ADXR = k / 6;
        } else i[o].DMI_ADXR = (2 * i[o].DMI_ADX + 5 * i[o - 1].DMI_ADXR) / 7;
      (D = i[o].low), (E = i[o].high);
      for (var U = 0; U < 9 && U < o + 1; U++)
        E < i[o - U].high && (E = i[o - U].high),
          D > i[o - U].low && (D = i[o - U].low);
      if (
        (E != D && (i[o].KDJ_RSV = ((i[o].close - D) / (E - D)) * 100),
        0 == o
          ? ((i[o].KDJ_K = i[o].KDJ_RSV),
            (i[o].KDJ_D = i[o].KDJ_RSV),
            (i[o].KDJ_J = i[o].KDJ_RSV))
          : ((i[o].KDJ_K = i[o].KDJ_RSV / 3 + (2 * i[o - 1].KDJ_K) / 3),
            (i[o].KDJ_D = i[o].KDJ_K / 3 + (2 * i[o - 1].KDJ_D) / 3),
            (i[o].KDJ_J = 3 * i[o].KDJ_K - 2 * i[o].KDJ_D)),
        0 == o
          ? ((i[o].MACD_AX = i[o].close),
            (i[o].MACD_BX = i[o].close),
            (i[o].MACD_DIF = 0),
            (i[o].MACD_DEA = 0))
          : ((i[o].MACD_AX = (2 * i[o].close + 11 * i[o - 1].MACD_AX) / 13),
            (i[o].MACD_BX = (2 * i[o].close + 25 * i[o - 1].MACD_BX) / 27),
            (i[o].MACD_DIF = i[o].MACD_AX - i[o].MACD_BX),
            (i[o].MACD_DEA = (2 * i[o].MACD_DIF + 8 * i[o - 1].MACD_DEA) / 10)),
        o > 0 &&
          (i[o].close > i[o - 1].close
            ? (i[o].OBV = i[o - 1].OBV + i[o].volume)
            : i[o].close < i[o - 1].close
            ? (i[o].OBV = i[o - 1].OBV - i[o].volume)
            : (i[o].OBV = i[o - 1].OBV),
          o >= 29))
      ) {
        R = 0;
        for (var U = 0; U < 30; U++) R += i[o - U].OBV;
        i[o].OBV_MA = R / 30;
      }
      if (
        ((Q = Math.min(11, o)),
        0 != i[o - Q].close &&
          (i[o].ROC = 100 * (i[o].close / i[o - Q].close - 1)),
        o >= 5)
      ) {
        l = 0;
        for (var U = 0; U < 6; U++) l += i[o - U].ROC;
        i[o].ROC_MA = l / 6;
      }
      if (
        (o > 0 &&
          ((_ = Math.max(i[o].close - i[o - 1].close, 0)),
          (j = Math.abs(i[o].close - i[o - 1].close)),
          1 == o
            ? ((i[o].RSI_UP_A = _),
              (i[o].RSI_DN_A = j),
              (i[o].RSI_UP_B = _),
              (i[o].RSI_DN_B = j),
              (i[o].RSI_UP_C = _),
              (i[o].RSI_DN_C = j))
            : ((i[o].RSI_UP_A = _ + (5 * i[o - 1].RSI_UP_A) / 6),
              (i[o].RSI_DN_A = j + (5 * i[o - 1].RSI_DN_A) / 6),
              (i[o].RSI_UP_B = _ + (11 * i[o - 1].RSI_UP_B) / 12),
              (i[o].RSI_DN_B = j + (11 * i[o - 1].RSI_DN_B) / 12),
              (i[o].RSI_UP_C = _ + (23 * i[o - 1].RSI_UP_C) / 24),
              (i[o].RSI_DN_C = j + (23 * i[o - 1].RSI_DN_C) / 24))),
        3 == o)
      ) {
        if (Y) {
          var U, U;
          K = i[o].high;
          for (var U = 0; U < 4; U++) K < i[o - U].high && (K = i[o - U].high);
          T = i[o].low;
          for (var U = 0; U < 4; U++) T > i[o - U].low && (T = i[o - U].low);
          (i[o].SAR = T), (i[o].SAR_RED = !0), 0.02, (Y = !1);
        }
      } else o > 3 && n(o, i);
      O = S = F = 0;
      for (var U = 0; U < 26 && U < o + 1; U++)
        o >= U + 1
          ? i[o - U].close > i[o - U - 1].close
            ? (O += i[o - U].volume)
            : i[o - U].close < i[o - U - 1].close
            ? (S += i[o - U].volume)
            : (F += i[o - U].volume)
          : ((O += i[o - U].volume / 3),
            (S += i[o - U].volume / 3),
            (F += i[o - U].volume / 3));
      if (
        (2 * S + F != 0 && (i[o].VR = (100 * (2 * O + F)) / (2 * S + F)),
        o >= 5)
      ) {
        G = 0;
        for (var U = 0; U < 6; U++) G += i[o - U].VR;
        i[o].VR_MA = G / 6;
      }
      (D = i[o].low), (E = i[o].high);
      for (var U = 0; U < 10 && U < o + 1; U++)
        E < i[o - U].high && (E = i[o - U].high),
          D > i[o - U].low && (D = i[o - U].low);
      E != D && (i[o].WR_A = (100 * (E - i[o].close)) / (E - D)),
        (D = i[o].low),
        (E = i[o].high);
      for (var U = 0; U < 6 && U < o + 1; U++)
        E < i[o - U].high && (E = i[o - U].high),
          D > i[o - U].low && (D = i[o - U].low);
      E != D && (i[o].WR_B = (100 * (E - i[o].close)) / (E - D)),
        o >= 23 &&
          (i[o].BBI =
            (i[o].Average3 + i[o].Average6 + i[o].Average12 + i[o].Average24) /
            4);
    }
    return i;
  }
  function n(t, i) {
    if (_bool) {
      if (s) {
        d = i[t].high;
        for (var e = 0; e < 2; e++) d < i[t - e].high && (d = i[t - e].high);
        h = i[t].low;
        for (var e = 0; e < 2; e++) h > i[t - e].low && (h = i[t - e].low);
        (i[t].SAR = h), (i[t].SAR_RED = !0), (whatisyou = 0.02);
      } else {
        d = i[t].high;
        for (var e = 0; e < 2; e++) d < i[t - e].high && (d = i[t - e].high);
        h = i[t].low;
        for (var e = 0; e < 2; e++) h > i[t - e].low && (h = i[t - e].low);
        (i[t].SAR = d), (i[t].SAR_RED = !1), (whatisyou = 0.02);
      }
      _bool = !1;
    } else
      s
        ? ((i[t].SAR = i[t - 1].SAR + whatisyou * (d - i[t - 1].SAR)),
          (i[t].SAR_RED = !0),
          i[t].high > d &&
            ((d = i[t].high), (whatisyou = Math.min(whatisyou + 0.02, 0.2))),
          i[t].SAR > i[t].close && ((s = !1), (_bool = !0), n(t, i)))
        : ((i[t].SAR = i[t - 1].SAR + whatisyou * (h - i[t - 1].SAR)),
          (i[t].SAR_RED = !1),
          i[t].low < h &&
            ((h = i[t].low), (whatisyou = Math.min(whatisyou + 0.02, 0.2))),
          i[t].SAR < i[t].close && ((s = !0), (_bool = !0), n(t, i)));
  }
  function a() {
    return {
      Average5: 0,
      Average10: 0,
      Average20: 0,
      Average30: 0,
      Average3: 0,
      Average6: 0,
      Average12: 0,
      Average24: 0,
      Average50: 0,
      Average60: 0,
      ASI: 0,
      BIAS_A: 0,
      BIAS_B: 0,
      BIAS_C: 0,
      BOLL: 0,
      BOLL_UPPER: 0,
      BOLL_LOWER: 0,
      CCI_TYP: 0,
      CCI: 0,
      CR_MID: 0,
      CR_AX: 0,
      CR_BX: 0,
      CR: 0,
      CR_A: 0,
      CR_B: 0,
      CR_C: 0,
      DMI_TR: 0,
      DMI_DMP: 0,
      DMI_DMM: 0,
      DMI_EXPMEMA_TR: 0,
      DMI_EXPMEMA_DMP: 0,
      DMI_EXPMEMA_DMM: 0,
      DMI_PDI: 0,
      DMI_MDI: 0,
      DMI_MPDI: 0,
      DMI_ADX: 0,
      DMI_ADXR: 0,
      KDJ_RSV: 0,
      KDJ_K: 0,
      KDJ_D: 0,
      KDJ_J: 0,
      MACD_AX: 0,
      MACD_BX: 0,
      MACD_DIF: 0,
      MACD_DEA: 0,
      MACD: 0,
      OBV: 0,
      OBV_MA: 0,
      ROC: 0,
      ROC_MA: 0,
      RSI_UP_A: 0,
      RSI_DN_A: 0,
      RSI_UP_B: 0,
      RSI_DN_B: 0,
      RSI_UP_C: 0,
      RSI_DN_C: 0,
      RSI_A: 0,
      RSI_B: 0,
      RSI_C: 0,
      SAR: 0,
      SAR_RED: 0,
      VR: 0,
      VR_MA: 0,
      WR_A: 0,
      WR_B: 0,
      BBI: 0,
      Zero: 0,
      volume5: 0,
      volume10: 0,
      time: 0,
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0,
    };
  }
  // mod.exports = e;
  var s = !0,
    _bool = !0,
    whatisyou = 0.02,
    h = 0,
    d = 0;
  if (typeof klines[0] === "object") {
    return cacTechObjectDatas(klines);
  } else return cacTechDatas(klines);
}

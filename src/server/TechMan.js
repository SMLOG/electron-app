import JSONP from "node-jsonp";
import axios from "axios";
import { fn, cacheObject } from "./lib/fn";
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
var n = !0,
  o = !0,
  a = 0.02,
  s = 0,
  r = 0;
function et(t, e) {
  if (o) {
    if (n) {
      r = e[t].high;
      for (var i = 0; i < 2; i++) r < e[t - i].high && (r = e[t - i].high);
      s = e[t].low;
      for (i = 0; i < 2; i++) s > e[t - i].low && (s = e[t - i].low);
      (e[t].SAR = s), (e[t].SAR_RED = !0), (a = 0.02);
    } else {
      r = e[t].high;
      for (i = 0; i < 2; i++) r < e[t - i].high && (r = e[t - i].high);
      s = e[t].low;
      for (i = 0; i < 2; i++) s > e[t - i].low && (s = e[t - i].low);
      (e[t].SAR = r), (e[t].SAR_RED = !1), (a = 0.02);
    }
    o = !1;
  } else
    n
      ? ((e[t].SAR = e[t - 1].SAR + a * (r - e[t - 1].SAR)),
        (e[t].SAR_RED = !0),
        e[t].high > r && ((r = e[t].high), (a = Math.min(a + 0.02, 0.2))),
        e[t].SAR > e[t].close && ((o = !(n = !1)), et(t, e)))
      : ((e[t].SAR = e[t - 1].SAR + a * (s - e[t - 1].SAR)),
        (e[t].SAR_RED = !1),
        e[t].low < s && ((s = e[t].low), (a = Math.min(a + 0.02, 0.2))),
        e[t].SAR < e[t].close && ((o = n = !0), et(t, e)));
}
function tech2(t) {
  null == t || t.Count;
  for (
    var e,
      i,
      n,
      o,
      a,
      s,
      r,
      l,
      h,
      d,
      p,
      c,
      A,
      g,
      f,
      u,
      m,
      x,
      w,
      v,
      y,
      M,
      B,
      C,
      I,
      b,
      k,
      D,
      E,
      R = [],
      Q = t.length,
      _ = 0;
    _ < Q;
    _++
  ) {
    var O = t[_].split(","),
      S = {
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
    (S.time = O[0]),
      (S.open = parseFloat(O[1])),
      (S.close = parseFloat(O[2])),
      (S.high = parseFloat(O[3])),
      (S.low = parseFloat(O[4])),
      (S.volume = Number(O[5])),
      R.push(S);
  }
  var F,
    G = !0,
    Y = 0,
    j = 0;
  for (_ = 0; _ < Q; _++) {
    if (4 <= _) {
      for (var K = (i = e = 0); K < 5; K++)
        (e += R[_ - K].close), (i += R[_ - K].volume);
      (R[_].Average5 = e / 5), (R[_].volume5 = i / 5);
    }
    if (9 <= _) {
      for (K = i = e = 0; K < 10; K++)
        (e += R[_ - K].close), (i += R[_ - K].volume);
      (R[_].Average10 = e / 10), (R[_].volume10 = i / 10);
    }
    if (19 <= _) {
      for (K = e = 0; K < 20; K++) e += R[_ - K].close;
      R[_].Average20 = e / 20;
    }
    if (29 <= _) {
      for (K = e = 0; K < 30; K++) e += R[_ - K].close;
      R[_].Average30 = e / 30;
    }
    if (2 <= _) {
      for (K = e = 0; K < 3; K++) e += R[_ - K].close;
      R[_].Average3 = e / 3;
    }
    if (5 <= _) {
      for (K = e = 0; K < 6; K++) e += R[_ - K].close;
      R[_].Average6 = e / 6;
    }
    if (11 <= _) {
      for (K = e = 0; K < 12; K++) e += R[_ - K].close;
      R[_].Average12 = e / 12;
    }
    if (23 <= _) {
      for (K = e = 0; K < 24; K++) e += R[_ - K].close;
      R[_].Average24 = e / 24;
    }
    if (49 <= _) {
      for (K = e = 0; K < 50; K++) e += R[_ - K].close;
      R[_].Average50 = e / 50;
    }
    if (59 <= _) {
      for (K = e = 0; K < 60; K++) e += R[_ - K].close;
      R[_].Average60 = e / 60;
    }
    if (
      (1 <= _ &&
        ((n = R[_ - 1].close),
        (o = Math.abs(R[_].high - n)),
        (a = Math.abs(R[_].low - n)),
        (s = Math.abs(R[_].high - R[_ - 1].low)),
        (r = Math.abs(n - R[_ - 1].open)),
        (l =
          a < o && s < o
            ? o + a / 2 + r / 4
            : s < a && o < a
            ? a + o / 2 + r / 4
            : s + r / 4),
        (h = R[_].close + (R[_].close - R[_].open) / 2 - R[_ - 1].open),
        0 != l && (R[_].ASI = R[_ - 1].ASI + ((16 * h) / l) * Math.max(o, a))),
      5 <= _)
    ) {
      for (K = e = 0; K < 6; K++) e += R[_ - K].close;
      0 != e && (R[_].BIAS_A = 100 * (R[_].close / (e / 6) - 1));
    }
    if (11 <= _) {
      for (K = e = 0; K < 12; K++) e += R[_ - K].close;
      0 != e && (R[_].BIAS_B = 100 * (R[_].close / (e / 12) - 1));
    }
    if (23 <= _) {
      for (K = e = 0; K < 24; K++) e += R[_ - K].close;
      0 != e && (R[_].BIAS_C = 100 * (R[_].close / (e / 24) - 1));
    }
    if (19 <= _) {
      for (K = e = 0; K < 20; K++) e += R[_ - K].close;
      R[_].BOLL = e / 20;
      for (K = e = 0; K < 20; K++)
        e += (R[_ - K].close - R[_].BOLL) * (R[_ - K].close - R[_].BOLL);
      (d = parseFloat(Math.sqrt(e / 20))),
        (R[_].BOLL_UPPER = R[_].BOLL + 2 * d),
        (R[_].BOLL_LOWER = R[_].BOLL - 2 * d);
    }
    if (((R[_].CCI_TYP = (R[_].high + R[_].low + R[_].close) / 3), 13 <= _)) {
      for (K = e = 0; K < 14; K++) e += R[_ - K].close;
      e / 14;
      for (K = e = 0; K < 14; K++) e += R[_ - K].CCI_TYP;
      p = e / 14;
      for (K = e = 0; K < 14; K++) e += Math.abs(R[_ - K].CCI_TYP - p);
      0 != e && (R[_].CCI = (R[_].CCI_TYP - p) / ((e / 14) * 0.015));
    }
    if (((R[_].CR_MID = (R[_].high + R[_].low) / 2), 0 == _))
      (R[_].CR = 100),
        (R[_].CR_AX = Math.max(R[_].high - R[_].CR_MID, 0)),
        (R[_].CR_BX = Math.max(R[_].CR_MID - R[_].low, 0));
    else {
      (R[_].CR_AX = Math.max(R[_].high - R[_ - 1].CR_MID, 0)),
        (R[_].CR_BX = Math.max(R[_ - 1].CR_MID - R[_].low, 0)),
        (c = A = 0);
      for (K = 0; K < 26 && K < _ + 1; K++)
        (c += R[_ - K].CR_AX), (A += R[_ - K].CR_BX);
      if ((0 != A && (R[_].CR = (c / A) * 100), 9 <= _)) {
        for (K = e = 0; K < 10; K++) e += R[_ - K].CR;
        _ + 5 < R.Length && (R[_ + 5].CR_A = e / 10);
      }
      if (19 <= _) {
        for (K = e = 0; K < 20; K++) e += R[_ - K].CR;
        _ + 9 < R.Length && (R[_ + 9].CR_B = e / 20);
      }
      if (39 <= _) {
        for (K = e = 0; K < 40; K++) e += R[_ - K].CR;
        _ + 17 < R.Length && (R[_ + 17].CR_C = e / 40);
      }
    }
    if (
      ((f =
        0 == _
          ? ((R[_].DMI_TR = Math.max(
              Math.max(R[_].high - R[_].low, Math.abs(R[_].high - R[_].close)),
              Math.abs(R[_].close - R[_].low)
            )),
            (g = 0))
          : ((R[_].DMI_TR = Math.max(
              Math.max(
                R[_].high - R[_].low,
                Math.abs(R[_].high - R[_ - 1].close)
              ),
              Math.abs(R[_ - 1].close - R[_].low)
            )),
            (g = R[_].high - R[_ - 1].high),
            R[_ - 1].low - R[_].low)),
      (R[_].DMI_DMP = 0 < g && f < g ? g : 0),
      (R[_].DMI_DMM = 0 < f && g < f ? f : 0),
      13 <= _)
    ) {
      if (13 == _) {
        u = m = x = 0;
        for (K = 0; K < 14; K++)
          (u += R[_ - K].DMI_TR),
            (m += R[_ - K].DMI_DMP),
            (x += R[_ - K].DMI_DMM);
        (R[_].DMI_EXPMEMA_TR = u / 14),
          (R[_].DMI_EXPMEMA_DMP = m / 14),
          (R[_].DMI_EXPMEMA_DMM = x / 14);
      } else
        (R[_].DMI_EXPMEMA_TR =
          (2 * R[_].DMI_TR + 13 * R[_ - 1].DMI_EXPMEMA_TR) / 15),
          (R[_].DMI_EXPMEMA_DMP =
            (2 * R[_].DMI_DMP + 13 * R[_ - 1].DMI_EXPMEMA_DMP) / 15),
          (R[_].DMI_EXPMEMA_DMM =
            (2 * R[_].DMI_DMM + 13 * R[_ - 1].DMI_EXPMEMA_DMM) / 15);
      0 != R[_].DMI_EXPMEMA_TR &&
        ((R[_].DMI_PDI = (100 * R[_].DMI_EXPMEMA_DMP) / R[_].DMI_EXPMEMA_TR),
        (R[_].DMI_MDI = (100 * R[_].DMI_EXPMEMA_DMM) / R[_].DMI_EXPMEMA_TR),
        R[_].DMI_PDI + R[_].DMI_MDI != 0 &&
          (R[_].DMI_MPDI =
            (Math.abs(R[_].DMI_MDI - R[_].DMI_PDI) /
              (R[_].DMI_MDI + R[_].DMI_PDI)) *
            100));
    }
    if (18 <= _)
      if (18 == _) {
        for (K = w = 0; K < 6; K++) w += R[_ - K].DMI_MPDI;
        R[_].DMI_ADX = w / 6;
      } else R[_].DMI_ADX = (2 * R[_].DMI_MPDI + 5 * R[_ - 1].DMI_ADX) / 7;
    if (23 <= _)
      if (23 == _) {
        for (K = v = 0; K < 6; K++) v += R[_ - K].DMI_ADX;
        R[_].DMI_ADXR = v / 6;
      } else R[_].DMI_ADXR = (2 * R[_].DMI_ADX + 5 * R[_ - 1].DMI_ADXR) / 7;
    (y = R[_].low), (M = R[_].high);
    for (K = 0; K < 9 && K < _ + 1; K++)
      M < R[_ - K].high && (M = R[_ - K].high),
        y > R[_ - K].low && (y = R[_ - K].low);
    if (
      (M != y && (R[_].KDJ_RSV = ((R[_].close - y) / (M - y)) * 100),
      0 == _
        ? ((R[_].KDJ_K = R[_].KDJ_RSV),
          (R[_].KDJ_D = R[_].KDJ_RSV),
          (R[_].KDJ_J = R[_].KDJ_RSV))
        : ((R[_].KDJ_K = R[_].KDJ_RSV / 3 + (2 * R[_ - 1].KDJ_K) / 3),
          (R[_].KDJ_D = R[_].KDJ_K / 3 + (2 * R[_ - 1].KDJ_D) / 3),
          (R[_].KDJ_J = 3 * R[_].KDJ_K - 2 * R[_].KDJ_D)),
      0 == _
        ? ((R[_].MACD_AX = R[_].close),
          (R[_].MACD_BX = R[_].close),
          (R[_].MACD_DIF = 0),
          (R[_].MACD_DEA = 0))
        : ((R[_].MACD_AX = (2 * R[_].close + 11 * R[_ - 1].MACD_AX) / 13),
          (R[_].MACD_BX = (2 * R[_].close + 25 * R[_ - 1].MACD_BX) / 27),
          (R[_].MACD_DIF = R[_].MACD_AX - R[_].MACD_BX),
          (R[_].MACD_DEA = (2 * R[_].MACD_DIF + 8 * R[_ - 1].MACD_DEA) / 10)),
      0 < _ &&
        (R[_].close > R[_ - 1].close
          ? (R[_].OBV = R[_ - 1].OBV + R[_].volume)
          : R[_].close < R[_ - 1].close
          ? (R[_].OBV = R[_ - 1].OBV - R[_].volume)
          : (R[_].OBV = R[_ - 1].OBV),
        29 <= _))
    ) {
      for (K = B = 0; K < 30; K++) B += R[_ - K].OBV;
      R[_].OBV_MA = B / 30;
    }
    if (
      ((C = Math.min(11, _)),
      0 != R[_ - C].close &&
        (R[_].ROC = 100 * (R[_].close / R[_ - C].close - 1)),
      5 <= _)
    ) {
      for (K = e = 0; K < 6; K++) e += R[_ - K].ROC;
      R[_].ROC_MA = e / 6;
    }
    if (
      (0 < _ &&
        ((I = Math.max(R[_].close - R[_ - 1].close, 0)),
        (b = Math.abs(R[_].close - R[_ - 1].close)),
        1 == _
          ? ((R[_].RSI_UP_A = I),
            (R[_].RSI_DN_A = b),
            (R[_].RSI_UP_B = I),
            (R[_].RSI_DN_B = b),
            (R[_].RSI_UP_C = I),
            (R[_].RSI_DN_C = b))
          : ((R[_].RSI_UP_A = I + (5 * R[_ - 1].RSI_UP_A) / 6),
            (R[_].RSI_DN_A = b + (5 * R[_ - 1].RSI_DN_A) / 6),
            (R[_].RSI_UP_B = I + (11 * R[_ - 1].RSI_UP_B) / 12),
            (R[_].RSI_DN_B = b + (11 * R[_ - 1].RSI_DN_B) / 12),
            (R[_].RSI_UP_C = I + (23 * R[_ - 1].RSI_UP_C) / 24),
            (R[_].RSI_DN_C = b + (23 * R[_ - 1].RSI_DN_C) / 24))),
      3 == _)
    ) {
      if (G) {
        j = R[_].high;
        for (var K = 0; K < 4; K++) j < R[_ - K].high && (j = R[_ - K].high);
        Y = R[_].low;
        for (var K = 0; K < 4; K++) Y > R[_ - K].low && (Y = R[_ - K].low);
        (R[_].SAR = Y), (R[_].SAR_RED = !0), (G = !0.02);
      }
    } else 3 < _ && et(_, R);
    k = D = E = 0;
    for (K = 0; K < 26 && K < _ + 1; K++)
      K + 1 <= _
        ? R[_ - K].close > R[_ - K - 1].close
          ? (k += R[_ - K].volume)
          : R[_ - K].close < R[_ - K - 1].close
          ? (D += R[_ - K].volume)
          : (E += R[_ - K].volume)
        : ((k += R[_ - K].volume / 3),
          (D += R[_ - K].volume / 3),
          (E += R[_ - K].volume / 3));
    if (
      (2 * D + E != 0 && (R[_].VR = (100 * (2 * k + E)) / (2 * D + E)), 5 <= _)
    ) {
      for (K = F = 0; K < 6; K++) F += R[_ - K].VR;
      R[_].VR_MA = F / 6;
    }
    (y = R[_].low), (M = R[_].high);
    for (K = 0; K < 10 && K < _ + 1; K++)
      M < R[_ - K].high && (M = R[_ - K].high),
        y > R[_ - K].low && (y = R[_ - K].low);
    M != y && (R[_].WR_A = (100 * (M - R[_].close)) / (M - y)),
      (y = R[_].low),
      (M = R[_].high);
    for (K = 0; K < 6 && K < _ + 1; K++)
      M < R[_ - K].high && (M = R[_ - K].high),
        y > R[_ - K].low && (y = R[_ - K].low);
    M != y && (R[_].WR_B = (100 * (M - R[_].close)) / (M - y)),
      23 <= _ &&
        (R[_].BBI =
          (R[_].Average3 + R[_].Average6 + R[_].Average12 + R[_].Average24) /
          4);
  }
  return R;
}
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
      "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f27,f28,f29,f22,f11,f62,f124,f128,f136,f115,f152,f100",
    fs: "m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23",
    pn: 1,
    po: "1",
    pz: 200000,
  });

  return await new Promise((resolve, reject) => {
    JSONP(hq, datas, "cb", (json) => {
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
          hy: e.f100,
          date: new Date(e.f124 * 1000),
        };
      });
      return resolve(datalist);
    });
  }).catch(function(error) {
    console.log(error);
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

export async function getDWTechDatas(code) {
  let dData = await axios
    .get(
      `http://${Math.floor(
        99 * Math.random() + 1
      )}.push2his.eastmoney.com/api/qt/stock/kline/get?cb=cb&secid=${code}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1&end=20500101&lmt=120&_=${+new Date()}`
    )
    .then((resp) => eval("function cb(d){ return d;};" + resp.data + ";"));
  let wData = await axios
    .get(
      `http://${Math.floor(
        99 * Math.random() + 1
      )}.push2his.eastmoney.com/api/qt/stock/kline/get?cb=cb&secid=1.600753&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=102&fqt=1&end=20500101&lmt=120&_=${+new Date()}`
    )
    .then((resp) => eval("function cb(d){ return d;};" + resp.data + ";"));

  return { kd: tech2(dData.data.klines), kw: tech2(wData.data.klines) };
}
async function getTech(item) {
  let dotCode =
    (item.code.substring(0, 2) == "sh" ? "1" : "0") +
    "." +
    item.code.substring(2);
  let techData = await getDWTechDatas(dotCode);
  return techData;
}
export function tech(klines) {
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
function isMacdGolden(techData) {
  let i = techData.length - 1;
  let bar0 = techData[i].MACD_DIF - techData[i].MACD_DEA;
  let bar1 = techData[i - 1].MACD_DIF - techData[i - 1].MACD_DEA;
  if (bar0 >= 0 && bar0 > bar1 && bar1 <= 0) return true;
  return false;
}
const techMap = {
  MACD周: function({ item, kw }) {
    return isMacdGolden(kw);
  },
  换手率大1: function({ item, kd, kw, km }) {
    return item.turnover >= 1;
  },
};
export const techMaplist = Object.keys(techMap);

export function buildFilters() {
  let filters = {};
  for (let name in techMap) {
    filters[name] = function(items) {
      return items.filter((e) => e[`_${name}`]);
    };
  }
  return filters;
}

export async function callFun(item) {
  let techDatas = await getTech(item);
  //console.log(techDatas);
  for (let name in techMap) {
    techDatas.item = item;
    item[`_${name}`] = techMap[name](techDatas);
  }
  return item;
}
export class fnTechData extends fn {
  constructor([code]) {
    super(`${code}/tech.json`);
    this.get = async function() {
      return await callFun({ code: code });
    };
  }
}

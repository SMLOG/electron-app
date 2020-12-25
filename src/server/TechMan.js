import fs from "fs";
import { dataUtil } from "./util";
import { userAgent, CONFIG_DIR } from "!/config";
import { axios } from "!/axios";
import iconv from "iconv-lite";

function JSONP(url, data, jsonp, cb) {
  return axios
    .get(url, {
      responseType: "arraybuffer",
      headers: { "User-Agent": userAgent },
      params: data,
    })
    .then((resp) => {
      let encode = resp.headers["content-type"].match(/charset=(.+)/)[1];
      let str = iconv.decode(Buffer.from(resp.data), encode);
      return JSON.parse(str.replace(jsonp, ""));
    })
    .then((res) => cb(res));
}
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

function tech2(items, arr) {
  var p_b1 = !0,
    p_b2 = !0,
    p_b3 = 0.02,
    p_low = 0,
    p_high = 0;
  if (items.length > 0) {
    p_b1 = items[0].p_b1;
    p_b2 = items[0].p_b2;
    p_b3 = items[0].p_b3;
    p_low = items[0].p_low;
    p_high = items[0].p_high;
  }
  function et(index, items) {
    if (p_b2) {
      if (p_b1) {
        p_high = items[index].high;
        for (var i = 0; i < 2; i++)
          p_high < items[index - i].high && (p_high = items[index - i].high);
        p_low = items[index].low;
        for (i = 0; i < 2; i++)
          p_low > items[index - i].low && (p_low = items[index - i].low);
        (items[index].SAR = p_low), (items[index].SAR_RED = !0), (p_b3 = 0.02);
      } else {
        p_high = items[index].high;
        for (i = 0; i < 2; i++)
          p_high < items[index - i].high && (p_high = items[index - i].high);
        p_low = items[index].low;
        for (i = 0; i < 2; i++)
          p_low > items[index - i].low && (p_low = items[index - i].low);
        (items[index].SAR = p_high), (items[index].SAR_RED = !1), (p_b3 = 0.02);
      }
      p_b2 = !1;
    } else
      p_b1
        ? ((items[index].SAR =
            items[index - 1].SAR + p_b3 * (p_high - items[index - 1].SAR)),
          (items[index].SAR_RED = !0),
          items[index].high > p_high &&
            ((p_high = items[index].high), (p_b3 = Math.min(p_b3 + 0.02, 0.2))),
          items[index].SAR > items[index].close &&
            ((p_b2 = !(p_b1 = !1)), et(index, items)))
        : ((items[index].SAR =
            items[index - 1].SAR + p_b3 * (p_low - items[index - 1].SAR)),
          (items[index].SAR_RED = !1),
          items[index].low < p_low &&
            ((p_low = items[index].low), (p_b3 = Math.min(p_b3 + 0.02, 0.2))),
          items[index].SAR < items[index].close &&
            ((p_b2 = p_b1 = !0), et(index, items)));
  }

  null == arr || arr.Count;
  var fromIndex = items.length - (items.length > 0 && arr.length == 0 ? 1 : 0);
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
      low,
      high,
      B,
      C,
      I,
      b,
      k,
      D,
      E,
      //  items = [],
      len = arr.length,
      index = 0;
    index < len;
    index++
  ) {
    var itArr = arr[index].split(","),
      item = {
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
    (item.time = itArr[0]),
      (item.open = parseFloat(itArr[1])),
      (item.close = parseFloat(itArr[2])),
      (item.high = parseFloat(itArr[3])),
      (item.low = parseFloat(itArr[4])),
      (item.volume = Number(itArr[5])),
      items.push(item);
  }
  var F,
    G = !0,
    Y = 0,
    j = 0;
  for (index = fromIndex, len = items.length; index < len; index++) {
    if (4 <= index) {
      for (var K = (i = e = 0); K < 5; K++)
        (e += items[index - K].close), (i += items[index - K].volume);
      (items[index].Average5 = e / 5), (items[index].volume5 = i / 5);
    }
    if (9 <= index) {
      for (K = i = e = 0; K < 10; K++)
        (e += items[index - K].close), (i += items[index - K].volume);
      (items[index].Average10 = e / 10), (items[index].volume10 = i / 10);
    }
    if (19 <= index) {
      for (K = e = 0; K < 20; K++) e += items[index - K].close;
      items[index].Average20 = e / 20;
    }
    if (29 <= index) {
      for (K = e = 0; K < 30; K++) e += items[index - K].close;
      items[index].Average30 = e / 30;
    }
    if (2 <= index) {
      for (K = e = 0; K < 3; K++) e += items[index - K].close;
      items[index].Average3 = e / 3;
    }
    if (5 <= index) {
      for (K = e = 0; K < 6; K++) e += items[index - K].close;
      items[index].Average6 = e / 6;
    }
    if (11 <= index) {
      for (K = e = 0; K < 12; K++) e += items[index - K].close;
      items[index].Average12 = e / 12;
    }
    if (23 <= index) {
      for (K = e = 0; K < 24; K++) e += items[index - K].close;
      items[index].Average24 = e / 24;
    }
    if (49 <= index) {
      for (K = e = 0; K < 50; K++) e += items[index - K].close;
      items[index].Average50 = e / 50;
    }
    if (59 <= index) {
      for (K = e = 0; K < 60; K++) e += items[index - K].close;
      items[index].Average60 = e / 60;
    }
    if (
      (1 <= index &&
        ((n = items[index - 1].close),
        (o = Math.abs(items[index].high - n)),
        (a = Math.abs(items[index].low - n)),
        (s = Math.abs(items[index].high - items[index - 1].low)),
        (r = Math.abs(n - items[index - 1].open)),
        (l =
          a < o && s < o
            ? o + a / 2 + r / 4
            : s < a && o < a
            ? a + o / 2 + r / 4
            : s + r / 4),
        (h =
          items[index].close +
          (items[index].close - items[index].open) / 2 -
          items[index - 1].open),
        0 != l &&
          (items[index].ASI =
            items[index - 1].ASI + ((16 * h) / l) * Math.max(o, a))),
      5 <= index)
    ) {
      for (K = e = 0; K < 6; K++) e += items[index - K].close;
      0 != e &&
        (items[index].BIAS_A = 100 * (items[index].close / (e / 6) - 1));
    }
    if (11 <= index) {
      for (K = e = 0; K < 12; K++) e += items[index - K].close;
      0 != e &&
        (items[index].BIAS_B = 100 * (items[index].close / (e / 12) - 1));
    }
    if (23 <= index) {
      for (K = e = 0; K < 24; K++) e += items[index - K].close;
      0 != e &&
        (items[index].BIAS_C = 100 * (items[index].close / (e / 24) - 1));
    }
    if (19 <= index) {
      for (K = e = 0; K < 20; K++) e += items[index - K].close;
      items[index].BOLL = e / 20;
      for (K = e = 0; K < 20; K++)
        e +=
          (items[index - K].close - items[index].BOLL) *
          (items[index - K].close - items[index].BOLL);
      (d = parseFloat(Math.sqrt(e / 20))),
        (items[index].BOLL_UPPER = items[index].BOLL + 2 * d),
        (items[index].BOLL_LOWER = items[index].BOLL - 2 * d);
    }
    if (
      ((items[index].CCI_TYP =
        (items[index].high + items[index].low + items[index].close) / 3),
      13 <= index)
    ) {
      for (K = e = 0; K < 14; K++) e += items[index - K].close;
      e / 14;
      for (K = e = 0; K < 14; K++) e += items[index - K].CCI_TYP;
      p = e / 14;
      for (K = e = 0; K < 14; K++) e += Math.abs(items[index - K].CCI_TYP - p);
      0 != e &&
        (items[index].CCI = (items[index].CCI_TYP - p) / ((e / 14) * 0.015));
    }
    if (
      ((items[index].CR_MID = (items[index].high + items[index].low) / 2),
      0 == index)
    )
      (items[index].CR = 100),
        (items[index].CR_AX = Math.max(
          items[index].high - items[index].CR_MID,
          0
        )),
        (items[index].CR_BX = Math.max(
          items[index].CR_MID - items[index].low,
          0
        ));
    else {
      (items[index].CR_AX = Math.max(
        items[index].high - items[index - 1].CR_MID,
        0
      )),
        (items[index].CR_BX = Math.max(
          items[index - 1].CR_MID - items[index].low,
          0
        )),
        (c = A = 0);
      for (K = 0; K < 26 && K < index + 1; K++)
        (c += items[index - K].CR_AX), (A += items[index - K].CR_BX);
      if ((0 != A && (items[index].CR = (c / A) * 100), 9 <= index)) {
        for (K = e = 0; K < 10; K++) e += items[index - K].CR;
        index + 5 < items.Length && (items[index + 5].CR_A = e / 10);
      }
      if (19 <= index) {
        for (K = e = 0; K < 20; K++) e += items[index - K].CR;
        index + 9 < items.Length && (items[index + 9].CR_B = e / 20);
      }
      if (39 <= index) {
        for (K = e = 0; K < 40; K++) e += items[index - K].CR;
        index + 17 < items.Length && (items[index + 17].CR_C = e / 40);
      }
    }
    if (
      ((f =
        0 == index
          ? ((items[index].DMI_TR = Math.max(
              Math.max(
                items[index].high - items[index].low,
                Math.abs(items[index].high - items[index].close)
              ),
              Math.abs(items[index].close - items[index].low)
            )),
            (g = 0))
          : ((items[index].DMI_TR = Math.max(
              Math.max(
                items[index].high - items[index].low,
                Math.abs(items[index].high - items[index - 1].close)
              ),
              Math.abs(items[index - 1].close - items[index].low)
            )),
            (g = items[index].high - items[index - 1].high),
            items[index - 1].low - items[index].low)),
      (items[index].DMI_DMP = 0 < g && f < g ? g : 0),
      (items[index].DMI_DMM = 0 < f && g < f ? f : 0),
      13 <= index)
    ) {
      if (13 == index) {
        u = m = x = 0;
        for (K = 0; K < 14; K++)
          (u += items[index - K].DMI_TR),
            (m += items[index - K].DMI_DMP),
            (x += items[index - K].DMI_DMM);
        (items[index].DMI_EXPMEMA_TR = u / 14),
          (items[index].DMI_EXPMEMA_DMP = m / 14),
          (items[index].DMI_EXPMEMA_DMM = x / 14);
      } else
        (items[index].DMI_EXPMEMA_TR =
          (2 * items[index].DMI_TR + 13 * items[index - 1].DMI_EXPMEMA_TR) /
          15),
          (items[index].DMI_EXPMEMA_DMP =
            (2 * items[index].DMI_DMP + 13 * items[index - 1].DMI_EXPMEMA_DMP) /
            15),
          (items[index].DMI_EXPMEMA_DMM =
            (2 * items[index].DMI_DMM + 13 * items[index - 1].DMI_EXPMEMA_DMM) /
            15);
      0 != items[index].DMI_EXPMEMA_TR &&
        ((items[index].DMI_PDI =
          (100 * items[index].DMI_EXPMEMA_DMP) / items[index].DMI_EXPMEMA_TR),
        (items[index].DMI_MDI =
          (100 * items[index].DMI_EXPMEMA_DMM) / items[index].DMI_EXPMEMA_TR),
        items[index].DMI_PDI + items[index].DMI_MDI != 0 &&
          (items[index].DMI_MPDI =
            (Math.abs(items[index].DMI_MDI - items[index].DMI_PDI) /
              (items[index].DMI_MDI + items[index].DMI_PDI)) *
            100));
    }
    if (18 <= index)
      if (18 == index) {
        for (K = w = 0; K < 6; K++) w += items[index - K].DMI_MPDI;
        items[index].DMI_ADX = w / 6;
      } else
        items[index].DMI_ADX =
          (2 * items[index].DMI_MPDI + 5 * items[index - 1].DMI_ADX) / 7;
    if (23 <= index)
      if (23 == index) {
        for (K = v = 0; K < 6; K++) v += items[index - K].DMI_ADX;
        items[index].DMI_ADXR = v / 6;
      } else
        items[index].DMI_ADXR =
          (2 * items[index].DMI_ADX + 5 * items[index - 1].DMI_ADXR) / 7;

    (low = items[index].low), (high = items[index].high);

    for (K = 0; K < 9 && K < index + 1; K++)
      high < items[index - K].high && (high = items[index - K].high),
        low > items[index - K].low && (low = items[index - K].low);
    if (
      (high != low &&
        (items[index].KDJ_RSV =
          ((items[index].close - low) / (high - low)) * 100),
      0 == index
        ? ((items[index].KDJ_K = items[index].KDJ_RSV),
          (items[index].KDJ_D = items[index].KDJ_RSV),
          (items[index].KDJ_J = items[index].KDJ_RSV))
        : ((items[index].KDJ_K =
            items[index].KDJ_RSV / 3 + (2 * items[index - 1].KDJ_K) / 3),
          (items[index].KDJ_D =
            items[index].KDJ_K / 3 + (2 * items[index - 1].KDJ_D) / 3),
          (items[index].KDJ_J =
            3 * items[index].KDJ_K - 2 * items[index].KDJ_D)),
      0 == index
        ? ((items[index].MACD_AX = items[index].close),
          (items[index].MACD_BX = items[index].close),
          (items[index].MACD_DIF = 0),
          (items[index].MACD_DEA = 0))
        : ((items[index].MACD_AX =
            (2 * items[index].close + 11 * items[index - 1].MACD_AX) / 13),
          (items[index].MACD_BX =
            (2 * items[index].close + 25 * items[index - 1].MACD_BX) / 27),
          (items[index].MACD_DIF = items[index].MACD_AX - items[index].MACD_BX),
          (items[index].MACD_DEA =
            (2 * items[index].MACD_DIF + 8 * items[index - 1].MACD_DEA) / 10)),
      0 < index &&
        (items[index].close > items[index - 1].close
          ? (items[index].OBV = items[index - 1].OBV + items[index].volume)
          : items[index].close < items[index - 1].close
          ? (items[index].OBV = items[index - 1].OBV - items[index].volume)
          : (items[index].OBV = items[index - 1].OBV),
        29 <= index))
    ) {
      for (K = B = 0; K < 30; K++) B += items[index - K].OBV;
      items[index].OBV_MA = B / 30;
    }
    if (
      ((C = Math.min(11, index)),
      0 != items[index - C].close &&
        (items[index].ROC =
          100 * (items[index].close / items[index - C].close - 1)),
      5 <= index)
    ) {
      for (K = e = 0; K < 6; K++) e += items[index - K].ROC;
      items[index].ROC_MA = e / 6;
    }
    if (
      (0 < index &&
        ((I = Math.max(items[index].close - items[index - 1].close, 0)),
        (b = Math.abs(items[index].close - items[index - 1].close)),
        1 == index
          ? ((items[index].RSI_UP_A = I),
            (items[index].RSI_DN_A = b),
            (items[index].RSI_UP_B = I),
            (items[index].RSI_DN_B = b),
            (items[index].RSI_UP_C = I),
            (items[index].RSI_DN_C = b))
          : ((items[index].RSI_UP_A = I + (5 * items[index - 1].RSI_UP_A) / 6),
            (items[index].RSI_DN_A = b + (5 * items[index - 1].RSI_DN_A) / 6),
            (items[index].RSI_UP_B = I + (11 * items[index - 1].RSI_UP_B) / 12),
            (items[index].RSI_DN_B = b + (11 * items[index - 1].RSI_DN_B) / 12),
            (items[index].RSI_UP_C = I + (23 * items[index - 1].RSI_UP_C) / 24),
            (items[index].RSI_DN_C =
              b + (23 * items[index - 1].RSI_DN_C) / 24))),
      3 == index)
    ) {
      if (G) {
        j = items[index].high;
        for (var K = 0; K < 4; K++)
          j < items[index - K].high && (j = items[index - K].high);
        Y = items[index].low;
        for (var K = 0; K < 4; K++)
          Y > items[index - K].low && (Y = items[index - K].low);
        (items[index].SAR = Y), (items[index].SAR_RED = !0), (G = !0.02);
      }
    } else 3 < index && et(index, items);
    k = D = E = 0;
    for (K = 0; K < 26 && K < index + 1; K++)
      K + 1 <= index
        ? items[index - K].close > items[index - K - 1].close
          ? (k += items[index - K].volume)
          : items[index - K].close < items[index - K - 1].close
          ? (D += items[index - K].volume)
          : (E += items[index - K].volume)
        : ((k += items[index - K].volume / 3),
          (D += items[index - K].volume / 3),
          (E += items[index - K].volume / 3));
    if (
      (2 * D + E != 0 && (items[index].VR = (100 * (2 * k + E)) / (2 * D + E)),
      5 <= index)
    ) {
      for (K = F = 0; K < 6; K++) F += items[index - K].VR;
      items[index].VR_MA = F / 6;
    }
    (low = items[index].low), (high = items[index].high);
    for (K = 0; K < 10 && K < index + 1; K++)
      high < items[index - K].high && (high = items[index - K].high),
        low > items[index - K].low && (low = items[index - K].low);
    high != low &&
      (items[index].WR_A = (100 * (high - items[index].close)) / (high - low)),
      (low = items[index].low),
      (high = items[index].high);
    for (K = 0; K < 6 && K < index + 1; K++)
      high < items[index - K].high && (high = items[index - K].high),
        low > items[index - K].low && (low = items[index - K].low);
    high != low &&
      (items[index].WR_B = (100 * (high - items[index].close)) / (high - low)),
      23 <= index &&
        (items[index].BBI =
          (items[index].Average3 +
            items[index].Average6 +
            items[index].Average12 +
            items[index].Average24) /
          4);
  }
  if (items.length > 0) {
    items[0].p_b1 = p_b1;
    items[0].p_b2 = p_b2;
    items[0].p_b3 = p_b3;
    items[0].p_low = p_low;
    items[0].p_high = p_high;
  }

  return items;
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
          preclose: e.f18,
          turnover: e.f8,
          pe: e.f9,
          lb: e.f10,
          pe_ttm: e.f115,
          volume: e.f5,
          ltg: e.f21 / e.f2,
          amount: e.f6,
          high: e.f15,
          zf: e.f7,
          low: e.f16,
          zsz: e.f20,
          lz: e.f21,
          avg: e.f6 / e.f5,
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

export async function getDayWeekTechDatas(item) {
  let code =
    (item.code.substring(0, 2) == "sh" ? "1" : "0") +
    "." +
    item.code.substring(2);

  let file = `${CONFIG_DIR}/${item.code}/klines.json`;
  let ret;
  if (fs.existsSync(file)) {
    let stat = fs.statSync(file);
    let diff = item.date.getTime() - stat.ctime.getTime();
    if (diff < 86400000) {
      let { kd: dItems, kw: wItems } = JSON.parse(fs.readFileSync(file));
      let dItem = dItems[dItems.length - 1];
      let wItem = wItems[wItems.length - 1];
      if (dataUtil.isSameDate(item.date, dItems.date)) {
        dItem = Object.assign(dItem, item);
      } else dItems.push(item);

      if (dataUtil.gw(item.date, wItem.date)) {
        wItem.low = wItem.high = wItem.volume = 0;
        for (
          let i = 0, j = dItems.length - 1;
          dataUtil.gw(item.date, dItems[j - i].date) && i < 7;
          i++
        ) {
          wItem.open = dItems[j - i].open;
          wItem.low =
            dItems[j - i].low < wItem.low ? dItems[j - i].low : wItem.low;
          wItem.high =
            dItems[j - i].high > wItem.high ? dItems[j - i].low : wItem.high;
          wItem.volume += parseInt(dItems[j - i]).volume;
        }
        wItem.close = item.close;
      } else {
        wItems.push(item);
      }
      ret = { kd: tech2(dItems, []), kw: tech2(wItems, []) };
    }
  }
  if (!ret) {
    let dData = await axios
      .get(
        `http://${Math.floor(
          99 * Math.random() + 1
        )}.push2his.eastmoney.com/api/qt/stock/kline/get?cb=cb&secid=${code}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1&end=20500101&lmt=900&_=${+new Date()}`
      )
      .then((resp) => eval("function cb(d){ return d;};" + resp.data + ";"));
    let wData = await axios
      .get(
        `http://${Math.floor(
          99 * Math.random() + 1
        )}.push2his.eastmoney.com/api/qt/stock/kline/get?cb=cb&secid=${code}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=102&fqt=1&end=20500101&lmt=180&_=${+new Date()}`
      )
      .then((resp) => eval("function cb(d){ return d;};" + resp.data + ";"));

    ret = {
      kd: tech2([], dData.data.klines),
      kw: tech2([], wData.data.klines),
    };
  }
  return ret;
}

async function getTech(item) {
  let techData = await getDayWeekTechDatas(item);
  return techData;
}
function isMacdGolden(techData) {
  if (techData.length < 30) return false;
  let i = techData.length - 1;
  let bar0 = techData[i].MACD_DIF - techData[i].MACD_DEA;
  let bar1 = techData[i - 1].MACD_DIF - techData[i - 1].MACD_DEA;
  let bar2 = techData[i - 2].MACD_DIF - techData[i - 2].MACD_DEA;
  if (bar0 >= 0 && bar0 > bar1 && bar2 <= 0) return true;
  return false;
}
function kdjGold(item, kw) {
  if (!kw) {
    console.error(`${item} kw = null`);
    return false;
  }
  let i = kw.length - 1;
  if (i < 3) return false;
  return kw[i].KDJ_K > kw[i - 1].KDJ_K && kw[i - 2].KDJ_K > kw[i - 1].KDJ_K;
}
const techMap = {
  MACD周: function({ item, kw }) {
    return isMacdGolden(kw);
  },
  KDJ周: function({ item, kw }) {
    return kdjGold(item, kw);
  },
  换手率大1: function({ item, kd, kw, km }) {
    return item.turnover >= 1;
  },
  上5周均线: function({ item, kd, kw, km }) {
    return (
      kw[kw.length - 2].close < kw[kw.length - 2].Average5 &&
      item.close >= kw[kw.length - 1].Average5
    );
  },
  B: function({ item, kd, kw, km }) {
    return (
      item.high > kd[kd.length - 1].Average20 &&
      kd[kd.length - 2].close < kd[kd.length - 2].Average20
    );
  },
  S: function({ item, kd, kw, km }) {
    return (
      item.close < kd[kd.length - 1].Average10 &&
      kd[kd.length - 2].close > kd[kd.length - 2].Average20
    );
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
  for (let name in techMap) {
    techDatas.item = item;
    item[`_${name}`] = techMap[name](techDatas);
  }
  return item;
}

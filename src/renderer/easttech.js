function o(t) {
  null == t || t.Count;
  for (var i = [], e = t.length, o = 0; o < e; o++) {
    var s = t[o].split(","),
      r = a();
    (r.time = s[0]),
      (r.open = parseFloat(s[1])),
      (r.close = parseFloat(s[2])),
      (r.high = parseFloat(s[3])),
      (r.low = parseFloat(s[4])),
      (r.volume = Number(s[5])),
      i.push(r);
  }
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
      for (var U = 0; U < 5; U++) (l += i[o - U].close), (h += i[o - U].volume);
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
        0 != f && (i[o].ASI = i[o - 1].ASI + ((16 * m) / f) * Math.max(p, c))),
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
      (2 * S + F != 0 && (i[o].VR = (100 * (2 * O + F)) / (2 * S + F)), o >= 5)
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

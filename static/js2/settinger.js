xh5_define("cfgs.settinger", [], function() {
  "use strict";
  function e(e) {
    (this.uid = e),
      (this.custom = {
        show_underlay_vol: !0,
        show_ext_marks: !0,
        show_floater: !0,
        mousewheel_zoom: !0,
        keyboard: !0,
        history_t: "window",
        allow_move: !0,
        mouse_and_touch: !0,
        tchart_tap: !0,
        show_k_rangepercent: !0,
        k_0pct: "no",
        touch_prevent: !0,
        mini_threshold: { width: 0 / 0, height: 0 / 0 },
        show_logo: !0,
        k_overlay: !1,
        stick: !0,
        smooth: !1,
        indicatorpanel_url:
          "https://current.sina.com.cn/sinatkchart/indicatorpanel.html?20160704",
        allow_indicator_edit: !0,
        storage_lv: 2,
        indicator_reorder: !0,
        indicator_cvs_title: !1,
        indicator_reheight: !1,
        centerZoom: !0
      }),
      (this.PARAM = {
        K_CL_NUM: 260,
        updateRate: 5,
        T_RATE: 120,
        minCandleNum: 240,
        maxCandleNum: 0 / 0,
        defaultCandleNum: 240,
        zoomUnit: 90,
        zoomLimit: 10,
        zoomArea: 0.15,
        I_Z_INDEX: 50,
        G_Z_INDEX: 30,
        _hd: 1,
        setHd: function(e) {
          "number" == typeof e && (this._hd = e);
        },
        getHd: function() {
          return this._hd;
        },
        isFlash: !1,
        LOGO_ID: "KKE_sina_finance_logo"
      }),
      (this.DIMENSION = {
        extend_draw: !1,
        extend_padding: 7,
        LOGO_W: 80,
        LOGO_H: 20,
        posY: 0,
        posX: 55,
        RIGHT_W: 55,
        K_RIGHT_W: 9,
        _w: void 0,
        _h: void 0,
        w_t: void 0,
        w_k: void 0,
        h_t: void 0,
        h_k: void 0,
        P_HV: 0.28,
        H_MA4K: 13,
        H_TIME_PART: 13,
        K_F_T: 47,
        T_F_T: 13,
        H_T_T: 14,
        W_T_L: 43,
        H_T_G: 60,
        H_BLK: 50,
        H_T_B: 7,
        I_V_O: 0,
        getOneWholeTH: function() {
          return this.H_T_T + this.H_T_G;
        },
        H_RS: 30,
        setStageW: function(e) {
          (this._w = e),
            (this.w_k = e - this.posX - this.K_RIGHT_W),
            (this.w_t = e - this.posX - this.RIGHT_W);
        },
        setStageH: function(e, t) {
          (this._h = e),
            (this.h_k = this.h_t = e - t - this.H_TIME_PART - this.H_MA4K);
        },
        getStageW: function() {
          return this._w;
        },
        getStageH: function() {
          return this._h;
        }
      }),
      (this.STYLE = {
        FONT_SIZE: 12,
        FONT_FAMILY: "helvetica,arial,sans-serif"
      }),
      (this.COLOR = {
        BG: "#fff",
        T_P: "#007cc8",
        T_AVG: "#000000",
        T_PREV: "#9b9b9b",
        K_RISE: "#f11200",
        K_FALL: "#00a800",
        K_N: "#000000",
        K_CL: "#007cc8",
        K_MS_RISE: "#f11200",
        K_MS_FALL: "#00a800",
        K_MS_N: "#000000",
        T_RISE: "#f11200",
        T_FALL: "#00a800",
        T_N: "#000000",
        F_RISE: "#f11200",
        F_FALL: "#00a800",
        F_N: "#000000",
        F_BG: "rgba(255,255,255,.9)",
        F_BR: "#000",
        F_T: "#000",
        K_EXT: "#080208",
        T_T: "#777",
        K_P: "#555",
        V_SD: "#dddddd",
        M_ARR: ["#fff", "#BCD4F9"],
        M_ARR_A: [0.5, 0],
        TIME_S: "#000000",
        TIME_L: "#eeeeee",
        GRID: "#eee",
        IVH_LINE: "#494949",
        P_TC: "#fff",
        P_BG: "#494949",
        T_TC: "#fff",
        T_BG: "#494949",
        REMARK_T: "#fff",
        REMARK_BG: "#494949",
        K_PCT: "#ccc",
        BTN_ARR: ["#2b9dfc", "#fff"],
        TIP_ARR: ["#000", "#fff", null, !1, null],
        LOGO: "#ccc"
      }),
      (this.datas = {
        s: "sh000001",
        mode: "",
        tDataLen: 241,
        t: "",
        isT: !1,
        scaleType: "price",
        candle: "solid"
      });
  }
  var t = {
    URLHASH: {
      TS: 1,
      T1: 1,
      T5: 5,
      FAKE_T5: 2,
      NTS: "ts",
      NT5: "t5",
      KD: 24,
      KW: 168,
      KM: 720,
      KCL: 365,
      KY: 8760,
      KDF: 23,
      KDB: 25,
      KWF: 167,
      KWB: 169,
      KMF: 719,
      KMB: 721,
      KCLF: 364,
      KCLB: 366,
      KYF: 8759,
      KYB: 8761,
      NKD: "kd",
      NKW: "kw",
      NKM: "km",
      NKCL: "kcl",
      NKY: "ky",
      NKYF: "kyf",
      NKYB: "kyb",
      NKDF: "kdf",
      NKDB: "kdb",
      NKWF: "kwf",
      NKWB: "kwb",
      NKMF: "kmf",
      NKMB: "kmb",
      NKCLF: "kclf",
      NKCLB: "kclb",
      K1: 1,
      K5: 5,
      K15: 15,
      K30: 30,
      K60: 60,
      K240: 240,
      NK1: "k1",
      NK5: "k5",
      NK15: "k15",
      NK30: "k30",
      NK60: "k60",
      NK240: "k240",
      KMS: 1e3,
      NKMS: "kms",
      KYTD: 983,
      NYTD: "kytd",
      vn: function(e) {
        for (var t in this)
          if (
            this.hasOwnProperty(t) &&
            "number" == typeof this[t] &&
            e == this[t]
          )
            return this[t];
        return void 0;
      },
      vi: function(e) {
        switch (e) {
          case this.NTS:
            return this.TS;
          case this.NT5:
            return this.FAKE_T5;
          default:
            return this[e.toUpperCase()];
        }
      },
      gt: function(e) {
        var t;
        switch (e) {
          case this.KMS:
            t = { type: "msk" };
            break;
          case this.K1:
          case this.K5:
          case this.K15:
          case this.K30:
          case this.K60:
          case this.K240:
            t = { type: "mink" };
            break;
          case this.KDF:
          case this.KWF:
          case this.KMF:
          case this.KYF:
          case this.KCLF:
            t = { type: "rek", dir: "q" };
            break;
          case this.KDB:
          case this.KWB:
          case this.KMB:
          case this.KYB:
          case this.KCLB:
            t = { type: "rek", dir: "h" };
            break;
          default:
            t = { type: "k" };
        }
        switch (e) {
          case this.KD:
          case this.KDF:
          case this.KDB:
            t.baseid = this.KD;
            break;
          case this.KW:
          case this.KWF:
          case this.KWB:
            t.baseid = this.KW;
            break;
          case this.KM:
          case this.KMF:
          case this.KMB:
            t.baseid = this.KM;
            break;
          case this.KY:
          case this.KYF:
          case this.KYB:
            t.baseid = this.KY;
            break;
          case this.KCL:
          case this.KCLF:
          case this.KCLB:
            t.baseid = this.KCL;
            break;
          default:
            t.baseid = e;
        }
        return t;
      }
    },
    e: {
      K_DATA_LOADED: "kDataLoaded",
      T_DATA_LOADED: "tDataLoaded",
      I_EVT: "iEvent"
    },
    nohtml5info:
      "\u68c0\u6d4b\u5230\u60a8\u7684\u6d4f\u89c8\u5668\u8fc7\u65e7\u4e14\u4e0d\u652f\u6301HTML 5\uff0c\u5f53\u524d\u4ee5\u517c\u5bb9\u6a21\u5f0f\u8fd0\u884c\u3002<br/>\u4e3a\u83b7\u5f97\u66f4\u597d\u7684\u4f53\u9a8c\u53ca\u5b8c\u5584\u7684\u529f\u80fd\uff0c\u5efa\u8bae\u4f7f\u7528<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/40975.html' target='_blank'>\u8c37\u6b4cChrome</a>\u6d4f\u89c8\u5668\uff0c\u6216\u5347\u7ea7\u5230\u60a8\u6d4f\u89c8\u5668\u7684<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/58979.html' target='_blank'>\u6700\u65b0\u7248\u672c</a>\u3002",
    historyt08:
      "\u5f53\u524d\u63d0\u4f9bA\u80a12008\u5e74\u4ee5\u6765\u7684\u5386\u53f2\u5206\u65f6\u8d70\u52bf\u67e5\u8be2",
    nohistoryt:
      "\u65e0\u6b64\u8bc1\u5238\u6b64\u65f6\u6bb5\u5386\u53f2\u5206\u65f6\u6570\u636e",
    norecord: "\u8bc1\u5238\u4ee3\u7801\u65e0\u8bb0\u5f55",
    notlisted: "\u672a\u4e0a\u5e02",
    delisted: "\u9000\u5e02",
    nodata: "\u672a\u52a0\u8f7d\u5230\u6709\u6548\u6570\u636e",
    noredata: "\u90e8\u5206\u8bc1\u5238\u65e0\u590d\u6743\u6570\u636e"
  };
  return new (function() {
    this.VER = "2.0.31";
    var r = [];
    (this.getSetting = function(t) {
      for (var a, i = r.length; i--; ) if (((a = r[i]), t == a.uid)) return a;
      return (a = new e(t)), r.push(a), a;
    }),
      (this.globalCfg = t);
  })();
});

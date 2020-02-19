xh5_define("plugins.techcharts", ["utils.util", "utils.painter"], function(
  utils_util,
  utils_painter
) {
  "use strict";

  function techchart(cfg, i, r) {
    (this.cfg = cfg),
      (this.isSC = !0),
      (this.proxyCfg = it(
        {
          iTo: function() {},
          ctn: null,
          titleCtn: null,
          iMgr: void 0,
          titleW: 0 / 0,
          titleGap: 0 / 0,
          withHBg: !0,
          h: 0 / 0,
          mh: 0 / 0,
          eh: 0 / 0,
          lz: 0 / 0,
          fixIdctW: !1,
          onClkMain: void 0,
          stock: void 0,
          usrObj: void 0,
          initMgr: void 0
        },
        i
      )),
      (this.selfCfg = it(
        {
          nu: !1,
          h: this.proxyCfg.h,
          mh: this.proxyCfg.mh,
          eh: this.proxyCfg.eh,
          titleW: 0 / 0,
          isBlank: !1,
          ctnId: void 0,
          allowrfs: !0
        },
        r
      )),
      (this.isBlank = this.selfCfg.isBlank),
      (this.proxyCfg.titleW = this.selfCfg.titleW),
      (this.symbol = this.proxyCfg.stock.symbol),
      (this.aliasymbol = void 0),
      (this.name = void 0),
      (this.sname = void 0),
      (this.alias = void 0),
      (this.nu = this.selfCfg.nu),
      (this.separate = 0),
      (this.urlData = void 0),
      (this.cb = void 0),
      (this.toReCalc = !1),
      (this.selfDataUrl = void 0),
      (this.selfDataUrlUpdate = void 0),
      (this.df = void 0),
      (this.viewState = this.proxyCfg.stock.viewState),
      (this.datas = null),
      (this.wrap = void 0),
      (this.titleCtn = void 0),
      (this.titleO = void 0),
      (this.indicatorArr = void 0),
      (this.line = void 0),
      (this.h = this.selfCfg.h),
      (this.mh = this.selfCfg.mh),
      (this.eh = this.selfCfg.eh),
      (this.labelMaxP = 0 / 0),
      (this.labelMinP = 0 / 0),
      (this.maxPrice = 0 / 0),
      (this.minPrice = 0 / 0),
      (this.pricePosArr = void 0),
      (this.labelPriceCount = 2),
      (this.isMain = !0),
      (this.oriArr = void 0),
      (this.selfArr = []),
      (this.disMod = 1),
      (this.tkProp = {
        close: "close"
      }),
      (this.customArr = void 0),
      this.DEFAULT_ARR,
      (this.updateId = void 0),
      (this.updateCount = 0),
      (this.UPDATE_THRESHOLD = 0),
      (this.__iOffsetX = 0),
      (this.asPChart = !1),
      (this.vaObj = void 0),
      (this.param = void 0),
      (this.lw = 1.3),
      this.ic({
        h: this.h
      });
  }

  function BLANKCTN(t, i) {
    var a = {
      isBlank: !0,
      ctnId: "blankctn_" + t.uid,
      allowrfs: !1,
      h: t.DIMENSION.H_BLK
    };
    techchart.call(this, t, i, a),
      (this.name = "BLANKCTN"),
      (this.newParam = function() {});
  }

  function ADL(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#007cc8",
        prop: "adl",
        idct: "ADL"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "ADL"),
      (this.sname = "T_ADL"),
      (this.disMod = i.datas.tDataLen);
    var s = "#b82c0c",
      e = "#2ec196";
    (this.initAndCalcAll = function(i) {
      var r = this.gdsd(i);
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var a, s, e = 0, h = r.length; h > e; e++) {
        (a = r[e]), (s = a.price - (a.avg_price || 0));
        var o = {
          adl: s
        };
        (o[vt + "price"] = a.price), this.selfArr.push(o);
      }
    }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          for (
            var r,
              a,
              h,
              o = this.datas.length,
              l = i.DIMENSION.w_t / o,
              n = l * gt,
              c = 0.5 * this.h,
              d = 0;
            2 > d;
            d++
          ) {
            (a = l * gt), t.beginPath();
            for (
              var f = 0;
              o > f && ((r = this.datas[f]), !(r.ignore_price < 0));
              f++
            )
              (h = r.adly),
                0 == d
                  ? r.adl > 0 && t.drawVStickC(a, h, n, c - h, s)
                  : r.adl < 0 && t.drawVStickC(a, h, n, c - h, e),
                (a += l);
            t.stroke();
          }
          t.drawBg();
        }
      });
  }

  function ASI(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 26,
        color: "#75B2A3",
        prop: "asi",
        idct: "ASI"
      },
      {
        v: 10,
        color: "#68A3FF",
        prop: "asit",
        idct: "ASIT"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "ASI");
    var s = bt.calcREF,
      e = bt.calcABS,
      h = bt.calcMAX,
      o = bt.calcSUM,
      l = bt.calcMA,
      n = bt.getArr,
      c = bt.operateArr;
    this.initAndCalcAll = function(i) {
      for (
        var r = this.customArr,
          a = r[0].v,
          d = r[1].v,
          f = n(i, "close"),
          u = n(i, "high"),
          p = n(i, "low"),
          v = n(i, "open"),
          A = s(f, 1),
          m = e(c(u, A, "-")),
          g = e(c(p, A, "-")),
          b = e(c(u, s(p, 1), "-")),
          y = e(c(A, s(v, 1), "-")),
          _ = [],
          w = 0,
          D = m.length;
        D > w;
        w++
      )
        _.push(
          m[w] > g[w] && m[w] > b[w]
            ? m[w] + g[w] / 2 + y[w] / 4
            : g[w] > b[w] && g[w] > m[w]
            ? g[w] + m[w] / 2 + y[w] / 4
            : b[w] + y[w] / 4
        );
      var M = c(
          c(c(c(f, A, "-"), c(c(f, v, "-"), 2, "/"), "+"), A, "+"),
          s(v, 1),
          "-"
        ),
        O = c(c(c(M, 16, "*"), _, "/"), h(m, g), "*"),
        S = o(O, a),
        T = l(S, d);
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var N = 0, I = i.length; I > N; N++)
        this.selfArr[N] = {
          asi: S[N],
          asit: T[N]
        };
    };
  }

  function BBIBOLL(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 11,
        color: "#999999",
        prop: "bbiboll",
        idct: "BBIBOLL"
      },
      {
        v: 6,
        color: "#ffac03",
        prop: "upr",
        idct: "UPR"
      },
      {
        v: 0 / 0,
        color: "#9922aa",
        prop: "dwn",
        idct: "DWN"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "BBIBOLL"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = bt.calcMA,
      e = bt.calcSTD,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        l = this.customArr[1].v,
        n = h(r, this.tkProp.close),
        c = o(
          o(o(o(s(n, 3), s(n, 6), "+"), s(n, 12), "+"), s(n, 24), "+"),
          4,
          "/"
        ),
        d = o(c, o(e(c, a), l, "*"), "+"),
        f = o(c, o(e(c, a), l, "*"), "-");
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var u = 0, p = r.length; p > u; u++)
        (this.selfArr[u] = {
          bbiboll: c[u],
          upr: d[u],
          dwn: f[u]
        }),
          (this.selfArr[u][At] = r[u].volume < 0);
    };
  }

  function BF(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 22,
        color: "#fa6d6d",
        prop: "m",
        idct: "M"
      },
      {
        color: "#2b55ff"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "BF");
    var s = bt.calcMA,
      e = bt.getArr;
    (this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        h = e(i, "high"),
        o = s(h, a);
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var l = 0, n = i.length; n > l; l++)
        this.selfArr[l] = {
          m: o[l]
        };
    }),
      (this.draw = function(r, a) {
        function s(t, i, r) {
          for (
            var a = t.length, s = t[a - 1][i], e = a - 1, h = t.length;
            h--;

          ) {
            var o = t[h][i];
            r ? o > s && ((s = o), (e = h)) : s > o && ((s = o), (e = h));
          }
          return e;
        }
        if (((this.__iOffsetX = isNaN(a) ? this.__iOffsetX : a), this.datas)) {
          var e = this.line;
          e.clear(!0, i.PARAM.getHd());
          for (
            var h,
              o,
              l,
              n = bt.calcREF,
              c = bt.getArr,
              d = c(this.selfArr, "m"),
              f = n(d, 1),
              u = this.viewState.start,
              p = this.viewState.end,
              v = utils_util.hex2dec(this.customArr[0].color, 0.5),
              A = utils_util.hex2dec(this.customArr[1].color, 0.5),
              m = u;
            p > m;
            m++
          ) {
            if (
              ("undefined" == typeof h &&
                ((h = d[m] - f[m] >= 0 ? 1 : -1), (o = h), (l = m)),
              (h = d[m] - f[m] >= 0 ? 1 : -1),
              m == p - 1 && (h = -o),
              h != o)
            ) {
              e.beginPath(),
                e.moveTo(this.oriArr[m].ix, this.datas[m - u].my),
                e.lineTo(this.oriArr[l].ix, this.datas[l - u].my);
              var g;
              -1 == h
                ? ((g = s(this.oriArr.slice(l, m + 1), "high", !0) + l),
                  e.lineTo(this.oriArr[g].ix, this.oriArr[g].hy),
                  e.newFillStyle([v]))
                : ((g = s(this.oriArr.slice(l, m + 1), "low", !1) + l),
                  e.lineTo(this.oriArr[g].ix, this.oriArr[g].ly),
                  e.newFillStyle([A])),
                e.fill(),
                (l = m);
            }
            o = h;
          }
          r && e.drawBg(this.__iOffsetX);
        }
      });
  }

  function BIAS(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 6,
        color: "#FD9C35",
        prop: "bias1",
        idct: "BIAS1"
      },
      {
        v: 12,
        color: "#00c1eb",
        prop: "bias2",
        idct: "BIAS2"
      },
      {
        v: 24,
        color: "#DD4444",
        prop: "bias3",
        idct: "BIAS3"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "BIAS"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = {
        min: 0 / 0,
        max: 0 / 0,
        glv: 0
      });
    var s = bt.calcMA,
      e = bt.getArr,
      h = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        o = this.customArr[1].v,
        l = this.customArr[2].v,
        n = e(r, this.tkProp.close),
        c = h(h(h(n, s(n, a), "-"), s(n, a), "/"), 100, "*"),
        d = h(h(h(n, s(n, o), "-"), s(n, o), "/"), 100, "*"),
        f = h(h(h(n, s(n, l), "-"), s(n, l), "/"), 100, "*");
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var u = 0, p = r.length; p > u; u++)
        (this.selfArr[u] = {
          bias1: c[u],
          bias2: d[u],
          bias3: f[u]
        }),
          (this.selfArr[u][At] = r[u].volume < 0);
    };
  }

  function BOLL(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 20,
        color: "#999999",
        prop: "boll",
        idct: "BOLL"
      },
      {
        v: 2,
        color: "#ffac03",
        prop: "upper",
        idct: "UPPER"
      },
      {
        v: 0 / 0,
        color: "#cc22ba",
        prop: "lower",
        idct: "LOWER"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "BOLL"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = bt.getArr,
      e = bt.calcMA,
      h = bt.calcSTD,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        l = this.customArr[1].v,
        n = s(r, this.tkProp.close),
        c = e(n, a),
        d = o(h(n, a), l, "*"),
        f = o(c, d, "+"),
        u = o(c, d, "-");
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var p = 0, v = r.length; v > p; p++)
        (this.selfArr[p] = {
          boll: c[p],
          upper: f[p],
          lower: u[p]
        }),
          (this.selfArr[p][At] = r[p].volume < 0);
    };
  }

  function BRAR(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 26,
        color: "#E297FF",
        prop: "br",
        idct: "BR"
      },
      {
        color: "#666666",
        prop: "ar",
        idct: "AR"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "BRAR"),
      (this.vaObj = {
        glv: 150
      });
    var s = bt.calcSUM,
      e = bt.calcMAX,
      h = bt.calcREF,
      o = bt.getArr,
      l = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        n = o(i, "high"),
        c = o(i, "close"),
        d = o(i, "open"),
        f = o(i, "low"),
        u = h(c, 1),
        p = l(
          l(s(e(0, l(n, u, "-")), a), s(e(0, l(u, f, "-")), a), "/"),
          100,
          "*"
        ),
        v = l(l(s(l(n, d, "-"), a), s(l(d, f, "-"), a), "/"), 100, "*");
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var A = 0, m = i.length; m > A; A++)
        this.selfArr[A] = {
          br: p[A],
          ar: v[A]
        };
    };
  }

  function CCI(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 14,
        color: "#FFAC03",
        prop: "cci",
        idct: "CCI"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "CCI"),
      (this.vaObj = {
        upper: 100,
        lower: -100,
        glv: 0
      });
    var s = bt.calcAVEDEV,
      e = bt.calcMA,
      h = bt.operateArr,
      o = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = o(i, "close"),
        n = o(i, "high"),
        c = o(i, "low"),
        d = h(h(h(n, c, "+"), l, "+"), 3, "/"),
        f = h(h(d, e(d, a), "-"), h(s(d, a), 0.015, "*"), "/");
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var u = 0, p = i.length; p > u; u++)
        this.selfArr[u] = {
          cci: f[u]
        };
    };
  }

  function CHIPCOST(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#ff8400",
        prop: "value",
        idct: "筹码成本"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "CHIPCOST"),
      (this.lw = 2),
      (this.cb = s),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/perspective/chip/$symbol.js?_=$rn");
    var e = "chip_";
    (this.selfDataUrlUpdate =
      "http://" +
      dt +
      ".sinajs.cn/etag.php?_=" +
      new Date().getTime() +
      "&list=" +
      e +
      "$symbol"),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.loadedFromTo = void 0),
      (this.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
          var r = this,
            a = this.symbol,
            s = "_touzi_chip_" + a,
            e = this.selfDataUrl
              .replace("$symbol", a)
              .replace("$rn", String(new Date().getDate()));
          this.proxyCfg.usrObj.ssl && (e = utils_util.getSUrl(e)),
            utils_util.load(e, function() {
              var t = window[s];
              r.urlData ||
                (r.urlData = {
                  day: []
                });
              var i = r.df(t),
                a = r.urlData.day;
              a.splice.apply(a, [0, 0].concat(i)),
                a.sort(function(t, i) {
                  return t.date - i.date;
                }),
                (r.toReCalc = !0),
                r.cb(r);
            });
        }
      }),
      (this.df = function(t) {
        var i = [];
        if (t) {
          var r = t;
          for (var a in r)
            r.hasOwnProperty(a) &&
              i.push({
                value: r[a],
                date: lt.sd(a)
              });
        }
        return i;
      });
    var h = !0;
    (this.UPDATE_THRESHOLD = 3),
      (this.update = function() {
        if (h) h = !1;
        else {
          if (++this.updateCount < this.UPDATE_THRESHOLD) return;
          this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
        }
        var i = this,
          r = this.symbol,
          a = "hq_str_" + e + r,
          s = this.selfDataUrlUpdate.replace("$symbol", r);
        this.proxyCfg.usrObj.ssl && (s = utils_util.getSUrl(s)),
          utils_util.load(s, function() {
            var t = window[a],
              r = i.udf(t);
            r && i.doUpdate(r);
          });
      }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r &&
              r.length > 1 &&
              (i = [
                {
                  date: lt.sd(r[0]),
                  value: r[1]
                }
              ]),
            i
          );
        }
      }),
      (this.updateData = function(t, i, r) {
        if (t && i && !(i.length < 1)) {
          var a = i[i.length - 1];
          if ((t = t[0]))
            if (lt.stbd(t.date, a.date))
              for (var s in t)
                t.hasOwnProperty(s) &&
                  "undefined" != typeof a[s] &&
                  (a[s] = t[s]);
            else t.date > a.date && this.newData(i, t, r);
        }
      }),
      (this.setPricePos = function(t) {
        t &&
          ((this.labelMaxP = t[0]),
          (this.labelMinP = t[1]),
          (this.pricePosArr = t)),
          this.createPlayingData();
      }),
      (this.initAndCalcAll = function(i) {
        if (((this.oriArr = i), this.urlData && this.toReCalc)) {
          (this.toReCalc = !1),
            !this.datas && (this.datas = []),
            utils_util.ca(this.selfArr);
          for (
            var r,
              a = this.urlData.day,
              s = utils_util.kUtil.adbd(a, i, !1, !1),
              e = 0,
              h = i.length;
            h > e;
            e++
          )
            (r = s[e]),
              this.selfArr.push({
                value: Number(r.value)
              });
        }
      }),
      this.loadUrlData();
  }

  function DITC(i, a, s) {
    function e() {
      (f > i.DIMENSION.w_t || 0 > f) && (f = i.DIMENSION.w_t),
        (h.titleO.canvas.style.display = "none"),
        (h.line.getCanvas().style.zIndex -= 2);
    }
    var h = this;
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#007cc8",
        prop: "ditc",
        idct: "DITC"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "DITC"),
      (this.cb = s);
    var o,
      l,
      n = "#c2c2c2",
      c = !0,
      d =
        "https://stock.sina.com.cn/stock/api/openapi.php/StockLevel2Service.getSummarize?symbol=$symbol&type=0&callback=$cb&dpc=1&retcode=0",
      f = i.DIMENSION.w_t / 2;
    (this.loadUrlData = function(i) {
      if (i) {
        var r = h.symbol,
          a = "_" + r + lt.ddt(new Date()).getFullYear();
        (h.selfDataUrl = d),
          utils_util.load(
            h.selfDataUrl
              .replace("$symbol", r)
              .replace("$cb", "var%20" + a + "="),
            function() {
              var t = window[a];
              t &&
                ((h.urlData = h.oriArr = t.result.data),
                (h.toReCalc = !0),
                (c = !1),
                h.cb(h));
            },
            function() {}
          );
      }
    }),
      (this.initAndCalcAll = function() {
        if (
          !c &&
          (this.datas || (e(), (this.datas = [])),
          utils_util.ca(this.selfArr),
          h.urlData)
        ) {
          var i,
            r,
            a,
            s = 0,
            o = h.urlData.length;
          for (i = 0; o > i; i++) s = Math.max(h.urlData[i].volume, s);
          for (i = 0; o > i; i++)
            (a = h.urlData[i]),
              (r = a.volume * (f / s)),
              h.selfArr.push({
                ditc: r,
                trade: Number(a.trade)
              });
        }
      }),
      (this.setRange = function() {
        if (!c && this.datas) {
          for (var t = h.selfArr.length; this.datas.length > t; )
            this.datas.length--;
          for (; this.datas.length < t; ) this.datas.push({});
        }
      }),
      (this.setPricePos = function(t) {
        !t || this.separate > 0
          ? ((this.labelMinP = l || this.minPrice),
            (this.labelMaxP = o || this.maxPrice))
          : ((this.labelMaxP = o = t[0]), (this.labelMinP = l = t[1])),
          this.createPlayingData();
      }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          var r = this.viewState.start,
            a = this.viewState.end;
          if (4 == r || 5 == a) {
            var s,
              e = h.selfArr.length,
              o = i.DIMENSION.h_t / e,
              l = Math.min(0.6 * o, 2);
            for (t.newStyle(n, !0, l), s = 0; e > s; s++) {
              var c = h.selfArr[s],
                d =
                  (i.DIMENSION.h_t * (h.labelMaxP - c.trade)) /
                  (h.labelMaxP - h.labelMinP);
              t.moveTo(0, d), t.lineTo(c.ditc, d);
            }
            t.stroke();
          }
        }
      }),
      h.loadUrlData(!0);
  }

  function DMA(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 10,
        desc: "快线移动平均"
      },
      {
        v: 50,
        color: "#777777",
        prop: "dif",
        idct: "DIF"
      },
      {
        v: 10,
        color: "#FFAC03",
        prop: "difma",
        idct: "DIFMA"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "DMA"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = {
        glv: 0
      });
    var s = bt.calcMA,
      e = bt.operateArr,
      h = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = h(r, this.tkProp.close),
        o = s(a, this.customArr[0].v),
        l = s(a, this.customArr[1].v),
        n = e(o, l, "-"),
        c = s(n, this.customArr[2].v);
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var d = 0, f = r.length; f > d; d++)
        (this.selfArr[d] = {
          dif: n[d],
          difma: c[d]
        }),
          (this.selfArr[d][At] = r[d].volume < 0);
    };
  }

  function DMI(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 14,
        color: "#999999",
        prop: "pdi",
        idct: "PDI",
        desc: "DMI"
      },
      {
        v: 6,
        color: "#ffac03",
        prop: "mdi",
        idct: "MDI",
        desc: "移动平均"
      },
      {
        color: "#cc22ba",
        prop: "adx",
        idct: "ADX"
      },
      {
        color: "#2ec196",
        prop: "adxr",
        idct: "ADXR"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "DMI");
    var s = bt.calcEMA,
      e = bt.calcMAX,
      h = bt.calcABS,
      o = bt.calcREF,
      l = bt.getArr,
      n = bt.operateArr;
    this.initAndCalcAll = function(i) {
      for (
        var r,
          a,
          c = this.customArr[0].v,
          d = this.customArr[1].v,
          f = l(i, "close"),
          u = l(i, "high"),
          p = l(i, "low"),
          v = s(
            e(e(n(u, p, "-"), h(n(u, o(f, 1), "-"))), h(n(p, o(f, 1), "-"))),
            c
          ),
          A = n(u, o(u, 1), "-"),
          m = n(o(p, 1), p, "-"),
          g = [],
          b = [],
          y = 0,
          _ = A.length;
        _ > y;
        y++
      )
        (r = A[y]),
          (a = m[y]),
          g.push(r > 0 && r > a ? r : 0),
          b.push(a > 0 && a > r ? a : 0);
      (g = s(g, c)), (b = s(b, c));
      var w = n(n(g, 100, "*"), v, "/"),
        D = n(n(b, 100, "*"), v, "/"),
        M = s(n(n(h(n(D, w, "-")), n(D, w, "+"), "/"), 100, "*"), d),
        O = s(M, d);
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var S = 0, T = i.length; T > S; S++)
        this.selfArr[S] = {
          pdi: w[S],
          mdi: D[S],
          adx: M[S],
          adxr: O[S]
        };
    };
  }

  function DPDK(i, a) {
    var s = "pct",
      e = "oripct",
      h = "mn";
    (this.DEFAULT_ARR = [
      {
        color: "#fa6d6d",
        prop: s,
        idct: "红线（多空信号收益）"
      },
      {
        color: "#2b55ff",
        prop: e,
        idct: "蓝线（股价自然涨幅）"
      },
      {
        v: 0 / 0,
        prop: h,
        idct: h,
        color: "#66ccff",
        hidecfg: !0
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "DPDK"),
      (this.alias = "大盘多空");
    var o = bt.getArr,
      l = bt.calcSUM,
      n = bt.operateArr;
    (this.initAndCalcAll = function(i) {
      var r = 48,
        a = o(i, "close"),
        s = o(i, "high"),
        e = o(i, "low"),
        c = o(i, "volume"),
        d = n(n(n(n(a, e, "+"), s, "+"), 3, "/"), c, "*"),
        f = n(l(d, r), l(c, r), "/"),
        u = (function() {
          for (var t = [], i = 0, r = a.length; r > i; i++)
            t.push(a[i] >= f[i] ? 1 : 0);
          return t;
        })();
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var p = 0, v = i.length; v > p; p++)
        (this.selfArr[p] = {
          flag: u[p]
        }),
          (this.selfArr[p][h] = f[p]);
    }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = Number.MAX_VALUE,
              h = -Number.MAX_VALUE,
              o = 0,
              l = 0,
              n = this.selfArr[t].flag,
              c = bt.calcA,
              d = bt.getArr,
              f = 10,
              u = t;
            i > u;
            u++
          ) {
            var p = this.datas[u - t];
            p.date = this.oriArr[u].date;
            var v = this.selfArr[u].flag,
              A = this.oriArr[u],
              m = c(
                d(
                  this.oriArr.slice(0 > u - f + 1 ? 0 : u - f + 1, u + 1),
                  "close"
                )
              );
            u != t
              ? v == n
                ? 1 == v && (o = (1 + A.percent) * (1 + o) - 1)
                : (o =
                    0 == v
                      ? A.open < m
                        ? ((A.open - this.oriArr[u - 1].close) /
                            this.oriArr[u - 1].close +
                            1) *
                            (1 + o) -
                          1
                        : ((m - this.oriArr[u - 1].close) /
                            this.oriArr[u - 1].close +
                            1) *
                            (1 + o) -
                          1
                      : A.open > m
                      ? ((A.close - A.open) / A.open + 1) * (1 + o) - 1
                      : ((A.close - m) / m + 1) * (1 + o) - 1)
              : 1 == v &&
                (o =
                  A.open > m
                    ? ((A.close - A.open) / A.open + 1) * (1 + o) - 1
                    : ((m - A.open) / A.open + 1) * (1 + o) - 1),
              (n = v),
              u != t && (l = (1 + A.percent) * (1 + l) - 1),
              (p[s] = 100 * o),
              (p[e] = 100 * l);
            for (var g in this.selfArr[u])
              if (this.selfArr[u].hasOwnProperty(g)) {
                if (((p[g] = this.selfArr[u][g]), "flag" == g)) continue;
                p[g] > h && (h = p[g]), p[g] < a && (a = p[g]);
              }
          }
          (this.minPrice = a), (this.maxPrice = h), this.syncI();
        }
      }),
      (this.draw = function(r, a) {
        if (((this.__iOffsetX = isNaN(a) ? this.__iOffsetX : a), this.datas)) {
          var s =
              i.DIMENSION.w_k /
              Math.max(this.datas.length, i.PARAM.minCandleNum),
            e = this.line;
          e.clear(!0, i.PARAM.getHd());
          for (
            var h,
              o,
              l,
              n,
              c,
              d = this.viewState.start,
              f = this.viewState.end,
              u = utils_util.hex2dec(this.customArr[0].color),
              p = utils_util.hex2dec(this.customArr[1].color),
              v = 0;
            2 > v;
            v++
          ) {
            for (
              o = this.datas[0].flag ? 0 : 1,
                e.newStyle([v ? u : p], !0, s / 2 > 3 ? 3 : s / 2),
                l = d;
              f > l;
              l++
            )
              (h = this.datas[l - d].flag),
                h == v &&
                  e[h == o ? "lineTo" : "moveTo"](
                    this.oriArr[l].ix,
                    this.datas[l - d].mny
                  ),
                (o = h);
            for (
              e.stroke(),
                o = this.datas[0].flag ? 0 : 1,
                e.newStyle([v ? u : p], !0, 1),
                l = d;
              f > l;
              l++
            )
              if (
                ((c = this.oriArr[l]), (h = this.datas[l - d].flag), h == v)
              ) {
                (n = ~~(c.ix + 0.5)), (n -= 0.5);
                var A = (c.hy - c.ly) / 2;
                e.moveTo(n, this.datas[l - d].mny + A),
                  e.lineTo(n, this.datas[l - d].mny - A);
              }
            e.stroke(), (o = this.datas[0].flag ? 0 : 1);
            var m = v ? u : p;
            for (
              m = m.match(/\d+/g),
                m.push(0.4),
                m = "rgba(" + m + ")",
                e.newFillStyle([m], !0, 1),
                l = d;
              f > l;
              l++
            ) {
              (c = this.oriArr[l]), (h = this.datas[l - d].flag);
              var g = c.ix;
              (n = ~~(c.ix + 0.5)), (n -= 0.5);
              var b = (c.hy - c.ly) / 2;
              if (h == v && l != f - 1)
                h != o
                  ? (e.beginPath(), e.moveTo(g, this.datas[l - d].mny + b))
                  : e.lineTo(g, this.datas[l - d].mny + b);
              else if (
                (l != d && h != o && l != f - 1) ||
                (l == f - 1 && ((h == o && h == v) || (h != o && h != v)))
              ) {
                var y;
                for (
                  l == f - 1 && h == o
                    ? ((y = l), e.lineTo(g, this.datas[l - d].mny + b))
                    : (y = l - 1);
                  y >= d;

                ) {
                  var _ = this.datas[y - d].flag;
                  if (_ != v) break;
                  var w = this.oriArr[y],
                    D = w.ix,
                    M = (w.hy - w.ly) / 2;
                  e.lineTo(D, this.datas[y - d].mny - M), y--;
                }
                e.closePath(), e.fill();
              }
              o = h;
            }
          }
          r && e.drawBg(this.__iOffsetX);
        }
      });
  }

  function DPDKS(t, i, r) {
    DPDK.call(this, t, i),
      (this.name = "DPDKS"),
      (this.alias = "大盘多空"),
      (this.cb = r);
    var a = "mn";
    (this.drawCalc = function() {
      if (this.datas) {
        this.setRange();
        var t,
          i,
          r,
          s,
          e = this.datas.length,
          h = Number.MAX_VALUE,
          o = -Number.MAX_VALUE;
        for (i = 0; e > i; i++)
          for (t = this.datas[i], r = this.customArr.length; r--; )
            (s = this.customArr[r].prop),
              s && s != a && (t[s] > o && (o = t[s]), t[s] < h && (h = t[s]));
        (this.labelMaxP = this.maxPrice = o),
          (this.labelMinP = this.minPrice = h);
        var l = o - h;
        for (i = 0; e > i; i++)
          for (t = this.datas[i], r = this.customArr.length; r--; )
            (s = this.customArr[r].prop),
              s && s != a && (t[s + "y"] = (this.h * (o - t[s])) / l);
      }
    }),
      (this.draw = function(t, i) {
        if (((this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i), this.datas)) {
          this.line.clear(!0, this.cfg.PARAM.getHd());
          var r =
            (this.h * this.maxPrice) / (this.maxPrice - this.minPrice) - 0.5;
          this.line.newStyle(this.cfg.COLOR.GRID, !0, 2),
            this.line.moveTo(0, r),
            this.line.lineTo(this.cfg.DIMENSION.w_k, r),
            this.line.stroke();
          for (
            var a,
              s = this.datas.length,
              e =
                this.cfg.DIMENSION.w_k /
                Math.max(s, this.cfg.PARAM.minCandleNum),
              h = this.customArr.length;
            h--;

          ) {
            var o = this.customArr[h].prop + "y";
            (a = this.__iOffsetX - e * mt),
              this.line.newStyle(this.customArr[h].color, !0, 1.5);
            for (
              var l, n = 0;
              s > n && ((l = this.datas[n][o]), !isNaN(l));
              n++
            )
              0 == n ? this.line.moveTo(a, l) : this.line.lineTo(a, l),
                (a += e);
            this.line.stroke();
          }
          t && this.line.drawBg(this.__iOffsetX);
        }
      });
  }

  function EMV(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 14,
        color: "#D96FF0",
        prop: "emv",
        idct: "EMV"
      },
      {
        v: 9,
        color: "#F76D6D",
        prop: "maemv",
        idct: "MAEMV"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "EMV"),
      (this.vaObj = {
        glv: 0
      });
    var s = bt.calcMA,
      e = bt.calcREF,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = r[1].v,
        n = h(i, "high"),
        c = h(i, "low"),
        d = h(i, "volume"),
        f = o(s(d, a), d, "/"),
        u = o(n, c, "+"),
        p = o(n, c, "-"),
        v = o(o(o(u, e(u, 1), "-"), u, "/"), 100, "*"),
        A = s(o(o(o(v, f, "*"), p, "*"), s(p, a), "/"), a),
        m = s(A, l);
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var g = 0, b = i.length; b > g; g++)
        this.selfArr[g] = {
          emv: A[g],
          maemv: m[g]
        };
    };
  }

  function EWI(i, a, s) {
    var e = "ewi";
    (this.DEFAULT_ARR = [
      {
        color: "#F6C257",
        prop: e,
        idct: "等权重"
      }
    ]),
      techchart.call(this, i, a);
    var h = "icn_calc_",
      o = this;
    (this.name = "EWI"),
      (this.sname = "T_EWI"),
      (this.alias = "等权重"),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/finance/touzieql/$symbol.js?" +
        Math.random()),
      (this.selfDataUrlUpdate =
        "http://" +
        dt +
        ".sinajs.cn/etag.php?_=" +
        new Date().getTime() +
        "&list=" +
        h +
        "$symbol"),
      (this.cb = s),
      (this.df = function(t) {
        var i = [];
        if (t)
          for (var r in t)
            t.hasOwnProperty(r) &&
              i.push({
                ewi: Number(t[r]),
                time: r
              });
        return i;
      });
    var l,
      n = !1;
    (this.loadUrlData = function() {
      var i = this.aliasymbol || this.symbol,
        r = "_touziequallyweight_" + i,
        s = this.selfDataUrl
          .replace("$symbol", i)
          .replace("$cb", "var%20" + r + "=")
          .replace("$rn", String(new Date().getDate()));
      this.proxyCfg.usrObj.ssl && (s = utils_util.getSUrl(s)),
        n ||
          ((l = utils_util.tUtil.gata(a.usrObj.market)),
          utils_util.load(s, function() {
            var t = window[r];
            (window[r] = null),
              (o.urlData = {
                time: []
              });
            var i = o.df(t),
              a = o.urlData.time;
            a.splice.apply(a, [0, 0].concat(i)), (n = !0), o.update();
          }));
    }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r &&
              r.length > 1 &&
              (i = [
                {
                  time: r[6].substring(0, 5),
                  ewi: r[2]
                }
              ]),
            i
          );
        }
      }),
      (this.update = function() {
        var i = this.symbol,
          r = "hq_str_" + h + i,
          a = this.selfDataUrlUpdate.replace("$symbol", i);
        this.proxyCfg.usrObj.ssl && (a = utils_util.getSUrl(a)),
          utils_util.load(a, function() {
            var t = window[r];
            window[r] = null;
            var i = o.udf(t);
            i && o.urlData && o.urlData.time && o.updateData(i, o.urlData.time);
          });
      }),
      (this.updateData = function(i, r) {
        if (i && r && !(r.length < 1)) {
          var s = r[r.length - 1];
          if ((i = i[0])) {
            if (s.time <= i.time)
              for (
                var e = utils_util.arrIndexOf(l, i.time),
                  h = utils_util.arrIndexOf(l, s.time),
                  n = h;
                e >= n;
                n++
              )
                e - n > 0
                  ? (r[r.length] = r[r.length - 1])
                  : (r[r.length - 1] = i);
            o.cb(o),
              4 == o.viewState.start && 5 == o.viewState.end && a.cbInDC();
          }
        }
      }),
      (this.setPricePos = function(t) {
        t && ((o.labelMaxP = t[0]), (o.labelMinP = t[1]), (o.pricePosArr = t)),
          this.createPlayingData();
      }),
      (this.initAndCalcAll = function(i) {
        if (this.urlData) {
          (this.oriArr = this.gdsd(i)),
            !this.datas && (this.datas = []),
            utils_util.ca(this.selfArr);
          var r,
            s = this.urlData.time,
            e = a.stock.realLen;
          0 > e && (e = o.disMod);
          var h = 0;
          for (r = 0; r <= o.disMod && !(r > e); r++)
            s[r]
              ? ((i[4][r].ewi = s[r].ewi), (h = r))
              : (i[4][r].ewi = s[h].ewi);
          for (var l, n = 0, c = this.oriArr.length; c > n; n++)
            (l = this.oriArr[n]),
              this.selfArr.push({
                ewi: l ? Number(l.ewi) : 1
              });
        }
      }),
      this.loadUrlData();
  }

  function EXPMA(i, a) {
    (this.storageVer = "v2"), techchart.call(this, i, a);
    var s = this;
    (this.name = "EXPMA"), "k" != a.type && (this.sname = "T_" + this.name);
    var e = ["#2d0674", "#84a8de", "#e80f01", "#f1926f", "#2c0eed"],
      h = "EMA",
      o = "ema";
    this.generateSettings = function() {
      if (s.param && s.param.length > 0) {
        s.customArr = [];
        for (var i = 0, r = s.param.length; r > i; i++) {
          var a = s.param[i].v;
          !isNaN(a) &&
            a > 0 &&
            s.customArr.push({
              v: a,
              color: s.param[i].color || e[i] || "#" + utils_util.randomColor(),
              prop: o + a,
              idct: h + a,
              desc: h
            });
        }
      }
      (!s.customArr || s.customArr.length < 1) &&
        (s.customArr = [
          {
            v: 12,
            color: e[0],
            prop: o + "12",
            idct: h + "12",
            desc: h
          },
          {
            v: 50,
            color: e[1],
            prop: o + "50",
            idct: h + "50",
            desc: h
          }
        ]);
    };
    var l = bt.getArr,
      n = bt.calcEMA;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i);
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (
        var a = l(r, this.tkProp.close),
          s = [],
          e = 0,
          h = this.customArr.length;
        h > e;
        e++
      )
        s.push(n(a, this.customArr[e].v));
      for (var c = r.length, d = 0, f = s.length; f > d; d++)
        for (var u = this.customArr[d].v, p = 0; c > p; p++) {
          var v = (this.selfArr[p] = this.selfArr[p] || {});
          r[p].volume < 0 ? (v[At] = !0) : (v[o + u] = s[d][p]);
        }
    };
  }

  function TECHFLOW(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#990000",
        prop: "mb",
        idct: "净超大单"
      },
      {
        v: 0 / 0,
        color: "#009900",
        prop: "ms",
        idct: "净大单"
      },
      {
        v: 0 / 0,
        color: "#000099",
        prop: "sb",
        idct: "净中单"
      },
      {
        v: 0 / 0,
        color: "#ff0099",
        prop: "ss",
        idct: "净小单"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "TECHFLOW"),
      (this.separate = 1),
      (this.selfDataUrl =
        "http://stock.finance.sina.com.cn/stock/api/jsonp_v2.php/$cb/StockMixService.getNewRateInfo?symbol=$symbol&___qn=3&from=$from&to=$to"),
      (this.selfDataUrlUpdate = "http://" + dt + ".sinajs.cn/list=$symbol"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.initAndCalcAll = function(i, r) {
        if (!r && ((this.oriArr = i), this.urlData)) {
          !this.datas && (this.datas = []), utils_util.ca(this.selfArr);
          var a;
          switch (this.viewState.viewId) {
            case 24:
              a = this.urlData.day;
              break;
            case 168:
              a = this.urlData.week;
              break;
            case 720:
              a = this.urlData.month;
          }
          for (
            var s, e = utils_util.kUtil.adbd(a, i, !1, !0), h = 0, o = i.length;
            o > h;
            h++
          )
            (s = e[h]),
              this.selfArr.push({
                mb: s ? Number(s.mb) : 0 / 0,
                ms: s ? Number(s.ms) : 0 / 0,
                sb: s ? Number(s.sb) : 0 / 0,
                ss: s ? Number(s.ss) : 0 / 0
              });
        }
      }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = Number.MAX_VALUE, s = -Number.MAX_VALUE, e = t;
            i > e;
            e++
          ) {
            var h = this.datas[e - t];
            h.date = this.oriArr[e].date;
            var o = 0,
              l = 0;
            for (var n in this.selfArr[e])
              this.selfArr[e].hasOwnProperty(n) &&
                ((h[n] = this.selfArr[e][n]),
                h[n] > 0 ? (o += h[n]) : (l += h[n]));
            (s = Math.max(o, l, s)), (a = Math.min(o, l, a));
          }
          (s = Math.max(Math.abs(s), Math.abs(a))),
            (a = -s),
            (this.minPrice = a),
            (this.maxPrice = s);
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l = this.datas.length,
              n = i.DIMENSION.w_k / Math.max(l, i.PARAM.minCandleNum),
              c = (this.labelMaxP / (this.labelMaxP - this.labelMinP)) * this.h,
              d = [],
              f = [],
              u = this.customArr.length;
            u--;

          ) {
            var p = this.customArr[u].prop + "y";
            (o = this.__iOffsetX - n * gt),
              a.newStyle(this.customArr[u].color, !0, o);
            for (var v = 0; l > v; v++)
              (h = this.datas[v][p]),
                (s = h > c ? f[v] || 0 : d[v] || 0),
                (e = c - s),
                (h -= s),
                a.moveTo(o, e),
                a.lineTo(o, h),
                h > c
                  ? ((d[v] = d[v] || 0), (f[v] = c - h))
                  : ((d[v] = c - h), (f[v] = f[v] || 0)),
                (o += n);
            a.stroke();
          }
        }
      }),
      (this.udf = function(t) {
        if (!t) return null;
        var i = t.split(",");
        return {
          mb: Number(i[0]),
          ms: Number(i[1]),
          sb: Number(i[2]),
          ss: Number(i[3]),
          date: lt.sd(i[4])
        };
      }),
      (this.df = function(t) {
        for (var i = [], r = 0, a = t.length; a > r; r++) {
          var s = lt.sd(t[r].d),
            e = s.getDate();
          i.push({
            mb: e,
            sb: e,
            ms: e,
            ss: e,
            date: s
          });
        }
        return i;
      }),
      this.loadUrlData();
  }

  function KDJ(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 9,
        color: "#888888",
        prop: "k",
        idct: "K"
      },
      {
        v: 3,
        color: "#FFAC03",
        prop: "d",
        idct: "D"
      },
      {
        v: 3,
        color: "#cc22ba",
        prop: "j",
        idct: "J"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "KDJ"),
      (this.vaObj = {
        glv: 50,
        upper: 80,
        lower: 20
      });
    var s = bt.calcSMA,
      e = bt.calcLLV,
      h = bt.calcHHV,
      o = bt.operateArr,
      l = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        n = r[1].v,
        c = r[2].v,
        d = l(i, "close"),
        f = l(i, "low"),
        u = l(i, "high"),
        p = o(o(o(d, e(f, a), "-"), o(h(u, a), e(f, a), "-"), "/"), 100, "*"),
        v = s(p, n, 1),
        A = s(v, c, 1),
        m = o(o(v, 3, "*"), o(A, 2, "*"), "-");
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var g = 0, b = i.length; b > g; g++)
        this.selfArr[g] = {
          k: v[g],
          d: A[g],
          j: m[g]
        };
    };
  }

  function KFLOW(i, a, s) {
    var e = "bar";
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#888887",
        prop: e,
        idct: "大单金额",
        desc: "文字颜色"
      }
    ]),
      techchart.call(this, i, a, {
        nu: !0
      }),
      (this.name = "KFLOW"),
      (this.alias = "主力动向"),
      "sh000001" === this.symbol && (this.aliasymbol = "sh999999"),
      (this.vaObj = {
        glv: 0
      }),
      (this.UPDATE_THRESHOLD = 5),
      (this.selfDataUrl =
        "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getHistoryMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to"),
      (this.selfDataUrlUpdate =
        "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getLastMoneyFlow?callback=$cb&symbol=$symbol"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.df = function(t) {
        if (t && t.result && t.result.data) {
          for (
            var i, r, a = [], s = t.result.data, h = 0, o = s.length;
            o > h;
            h++
          ) {
            (i = s[h]), (r = i.split(","));
            var l = {
              date: lt.sd(r[0])
            };
            (l[e] = Number(r[1])), a.push(l);
          }
          return a;
        }
      });
    var h;
    this.udf = function(t) {
      if (t && t.result && t.result.data) {
        var i = t.result.data;
        if (i && !(i.length < 9)) {
          i = i.split(",");
          var r = Number(i[1]),
            a = {
              date: lt.sd(i[0])
            };
          return (
            (a[e] = r),
            h
              ? (a[e + "update"] = r - h[e] || 0)
              : ((h = {}), (a[e + "update"] = 0)),
            (h[e] = r),
            a
          );
        }
      }
    };
    var o;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), utils_util.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          case 167:
          case 168:
          case 169:
            r = this.urlData.week;
            break;
          case 719:
          case 720:
          case 721:
            r = this.urlData.month;
            break;
          default:
            r = [
              {
                bar: 0,
                date: i[i.length - 1].date
              }
            ];
        }
        o = utils_util.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++) {
          a = o[s];
          var l = {};
          (l[e] = a ? Number(a[e]) : 0 / 0), this.selfArr.push(l);
        }
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                s[o] > h && (h = s[o]),
                s[o] < e && (e = s[o]));
          }
          e == h
            ? (e = h = 0)
            : ((h = Math.max(Math.abs(h), Math.abs(e))), (e = -h)),
            (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = h),
            (this.labelMinP = e);
          var l = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var n = this.customArr.length; n--; ) {
              var c = this.customArr[n].prop;
              s[c + "y"] = 0 == l ? this.h >> 1 : (this.h * (h - s[c])) / l;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l,
              n = this.datas.length,
              c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum),
              d = "hollow" == i.datas.candle,
              f = 0.6 * c,
              u = 0.5 * this.h,
              p = 0;
            2 > p;
            p++
          ) {
            for (
              l = 0 == p ? i.COLOR.K_FALL : i.COLOR.K_RISE,
                e = this.__iOffsetX - c,
                a.beginPath(),
                s = 0;
              n > s;
              s++
            )
              (o = this.datas[s]),
                (h = o.bary),
                0 == p
                  ? h > u &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_FALL, !0)
                  : u >= h &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_RISE, !d),
                (e += c);
            a.stroke();
          }
          a.drawBg(this.__iOffsetX), this.vaObj && this.drawValueRange();
        }
      }),
      this.loadUrlData();
  }

  function KKFLOW(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#888887",
        prop: "bar",
        idct: "主力资金",
        desc: "主力资金"
      },
      {
        v: 0 / 0,
        color: "#ff1111",
        prop: "super",
        idct: "特大",
        desc: "特大"
      },
      {
        v: 0 / 0,
        color: "#ff9f07",
        prop: "big",
        idct: "大",
        desc: "大"
      },
      {
        v: 0 / 0,
        color: "#00b5f8",
        prop: "mid",
        idct: "中",
        desc: "中"
      },
      {
        v: 0 / 0,
        color: "#5b0497",
        prop: "small",
        idct: "小",
        desc: "小"
      }
    ]),
      techchart.call(this, i, a, {
        nu: !0
      }),
      (this.name = "KKFLOW"),
      (this.alias = "净买入"),
      (this.vaObj = {
        glv: 0
      }),
      (this.UPDATE_THRESHOLD = 5),
      (this.selfDataUrl =
        "http://stock.sina.com.cn/stock/api/openapi.php/TouziService.getStockHistoryFlow?page=1&num=10000&symbol=$symbol&callback=$cb"),
      (this.selfDataUrlUpdate =
        "http://stock.sina.com.cn/stock/api/openapi.php/TouziService.getStockFlow?symbol=$symbol&callback=$cb"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.df = function(t) {
        if (t && t.result && t.result.data) {
          for (
            var i,
              r = [],
              a = t.result.data.data.reverse(),
              s = 0,
              e = a.length;
            e > s;
            s++
          ) {
            i = a[s];
            var h = i.r0_in,
              o = i.r1_in,
              l = i.r2_in,
              n = i.r3_in,
              c = i.r0_out,
              d = i.r1_out,
              f = i.r2_out,
              u = i.r3_out;
            r.push({
              date: lt.sd(i.date),
              super: h - c,
              big: o - d,
              mid: l - f,
              small: n - u,
              bar: h + o - c - d
            });
          }
          return r;
        }
      }),
      (this.udf = function(t) {
        if (t && t.result && t.result.data) {
          var i = t.result.data;
          if (i) {
            var r = i.r0_in,
              a = i.r1_in,
              s = i.r2_in,
              e = i.r3_in,
              h = i.r0_out,
              o = i.r1_out,
              l = i.r2_out,
              n = i.r3_out;
            return {
              date: lt.sd(i.date),
              super: r - h,
              big: a - o,
              mid: s - l,
              small: e - n,
              bar: r + a - h - o
            };
          }
        }
      });
    var e;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), utils_util.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          case 167:
          case 168:
          case 169:
            r = this.urlData.week;
            break;
          case 719:
          case 720:
          case 721:
            r = this.urlData.month;
            break;
          default:
            r = [
              {
                bar: 0,
                big: 0,
                mid: 0,
                small: 0,
                super: 0,
                date: i[i.length - 1].date
              }
            ];
        }
        e = utils_util.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++) {
          a = e[s];
          var o = {
            bar: a ? Number(a.bar) : 0 / 0,
            super: a ? Number(a["super"]) : 0 / 0,
            big: a ? Number(a.big) : 0 / 0,
            mid: a ? Number(a.mid) : 0 / 0,
            small: a ? Number(a.small) : 0 / 0
          };
          this.selfArr.push(o);
        }
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE,
            o = {};
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var l in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(l) &&
                ("bar" === l
                  ? (s[l] = this.selfArr[a][l])
                  : (!o[l] && (o[l] = 0),
                    (o[l] += this.selfArr[a][l]),
                    (s[l] = o[l])),
                s[l] > h && (h = s[l]),
                s[l] < e && (e = s[l]));
          }
          e == h
            ? (e = h = 0)
            : ((h = Math.max(Math.abs(h), Math.abs(e))), (e = -h)),
            (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = h),
            (this.labelMinP = e);
          var n = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var c = this.customArr.length; c--; ) {
              var d = this.customArr[c].prop;
              s[d + "y"] = 0 == n ? this.h >> 1 : (this.h * (h - s[d])) / n;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l,
              n = this.datas.length,
              c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum),
              d = "hollow" == i.datas.candle,
              f = 0.6 * c,
              u = 0.5 * this.h,
              p = 0;
            2 > p;
            p++
          ) {
            for (
              l = 0 == p ? i.COLOR.K_FALL : i.COLOR.K_RISE,
                e = this.__iOffsetX - c,
                a.beginPath(),
                s = 0;
              n > s;
              s++
            )
              (o = this.datas[s]),
                (h = o.bary),
                0 == p
                  ? h > u &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_FALL, !0)
                  : u >= h &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_RISE, !d),
                (e += c);
            a.stroke();
          }
          for (var v = this.customArr.length; v--; )
            if ("bar" !== this.customArr[v].prop) {
              for (
                e = this.__iOffsetX - 0.4 * c,
                  a.newStyle(this.customArr[v].color, !0),
                  s = 0;
                n > s;
                s++
              ) {
                o = this.datas[s];
                var A = o[this.customArr[v].prop + "y"];
                a.lineTo(e, A), (e += c);
              }
              a.stroke();
            }
          a.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }

  function KGSTRADE(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#FE6C6A",
        prop: "buy",
        idct: "买入",
        desc: "买入"
      },
      {
        v: 0 / 0,
        color: "#23B47B",
        prop: "sell",
        idct: "卖出",
        desc: "卖出"
      },
      {
        v: 0 / 0,
        color: "#888887",
        prop: "total",
        idct: "今日交易总计",
        desc: "今日交易总计"
      }
    ]),
      techchart.call(this, i, a, {
        nu: !0
      }),
      (this.name = "KGSTRADE"),
      (this.alias = "高手交易"),
      (this.vaObj = {
        glv: 0
      }),
      (this.selfDataUrl =
        "http://touzi.sina.com.cn/api/openapi.php/TzyGraphService.getGaoShouTradeDetailKx?symbol=$symbol&callback=$cb"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.df = function(t) {
        if (t && t.result && t.result.data) {
          for (
            var i, r = [], a = t.result.data, s = 0, e = a.length;
            e > s;
            s++
          )
            (i = a[s]),
              r.push({
                date: lt.sd(i.dt),
                buy: i.buy,
                sell: i.sell,
                total: i.buy + i.sell
              });
          return r;
        }
      });
    var e;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), utils_util.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          case 167:
          case 168:
          case 169:
            r = this.urlData.week;
            break;
          case 719:
          case 720:
          case 721:
            r = this.urlData.month;
            break;
          default:
            r = [
              {
                buy: 0,
                sell: 0,
                date: i[i.length - 1].date
              }
            ];
        }
        e = utils_util.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++)
          (a = e[s]),
            this.selfArr.push({
              total: a ? Number(a.total) : 0 / 0,
              buy: a ? Number(a.buy) : 0 / 0,
              sell: a ? Number(a.sell) : 0 / 0
            });
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                "total" !== o &&
                  (s[o] > h && (h = s[o]), s[o] < e && (e = s[o])));
          }
          e == h
            ? (e = h = 0)
            : ((h = Math.max(Math.abs(h), Math.abs(e))), (e = -h)),
            (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = h),
            (this.labelMinP = e);
          var l = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var n = this.customArr.length; n--; ) {
              var c = this.customArr[n].prop;
              s[c + "y"] = 0 == l ? this.h >> 1 : (this.h * (h - s[c])) / l;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line,
            s = a.getG();
          a.clear(!0, i.PARAM.getHd());
          for (
            var e,
              h,
              o,
              l,
              n,
              c,
              d = this.datas.length,
              f = i.DIMENSION.w_k / Math.max(d, i.PARAM.minCandleNum),
              u = "hollow" == i.datas.candle,
              p = 0.3 * f,
              v = 0.5 * this.h,
              A = 0;
            2 > A;
            A++
          ) {
            for (
              c = this.customArr[A].color,
                h = this.__iOffsetX - 0.96 * f,
                s.textAlign = "center",
                a.beginPath(),
                e = 0;
              d > e;
              e++
            )
              (n = this.datas[e]),
                0 == A
                  ? (n.buy &&
                      ((o = n.buyy),
                      a.drawVStickRect(h, o, p, v - o, c, !u),
                      s.fillText(n.buy, h + 0.3 * f, v + 12)),
                    (h += f))
                  : ((h += 0.47 * f),
                    n.sell &&
                      ((l = n.selly),
                      a.drawVStickRect(h, v, p, v - l, c, !0),
                      s.fillText(n.sell, h + 0.3 * f, v - 2)),
                    (h += 0.53 * f));
            a.stroke();
          }
          a.beginPath(),
            a.newStyle(["#BFBFBF"]),
            a.moveTo(this.__iOffsetX - f, 0.5 * this.h),
            a.lineTo(h, 0.5 * this.h),
            a.stroke(),
            a.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }

  function SUNSPOT(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#7d8087",
        prop: "bar",
        idct: "IDT",
        desc: "IDT"
      },
      {
        v: 0 / 0,
        color: "#7d8087",
        prop: "dot",
        idct: "SUNSPOT",
        desc: "SUNSPOT"
      }
    ]),
      techchart.call(this, i, a, {
        nu: !0
      }),
      (this.name = "SUNSPOT"),
      (this.alias = "SPT"),
      (this.vaObj = {
        glv: 0
      }),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/touzi/sunstockskx/$symbol.js"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
          var r = this,
            a = this.symbol,
            s = "tzy_sunstock_kx_" + a,
            e = this.selfDataUrl.replace("$symbol", a);
          this.proxyCfg.usrObj.ssl && (e = utils_util.getSUrl(e)),
            utils_util.load(e, function() {
              var t = window[s];
              r.urlData ||
                (r.urlData = {
                  day: []
                });
              var i = r.df(t),
                a = r.urlData.day;
              a.splice.apply(a, [0, 0].concat(i)),
                a.sort(function(t, i) {
                  return t.date - i.date;
                }),
                (r.toReCalc = !0),
                r.cb(r);
            });
        }
      }),
      (this.df = function(t) {
        if (t) {
          for (var i, r = [], a = t, s = 0, e = a.length; e > s; s++)
            (i = a[s]),
              r.push({
                date: lt.sd(i.date),
                bar: i.std_pchg,
                dot: i.value
              });
          return r;
        }
      });
    var e;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), utils_util.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          default:
            r = [
              {
                bar: 0,
                dot: 0,
                date: i[i.length - 1].date
              }
            ];
        }
        e = utils_util.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++)
          (a = e[s]),
            this.selfArr.push({
              bar: a ? Number(a.bar) : 0 / 0,
              dot: a ? Number(a.dot) : 0 / 0
            });
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = 0,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]),
              (s.date = this.oriArr[a].date),
              (s.percent = this.oriArr[a].percent);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                "bar" === o && s[o] > h && (h = s[o]));
          }
          var l = 18;
          (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = (h * this.h) / (this.h - l)),
            (this.labelMinP = e);
          var n = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var c = this.customArr.length; c--; ) {
              var d = this.customArr[c].prop;
              s[d + "y"] =
                0 == n ? this.h : ((this.h - l) * (h - s[d])) / n + l;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l,
              n = this.datas.length,
              c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum),
              d = "hollow" == i.datas.candle,
              f = ["#FF6655", "#8cdaff"],
              u = 0.2 * c,
              p = this.h,
              v = 0;
            3 > v;
            v++
          )
            for (
              l = f[v],
                e = this.__iOffsetX - c,
                2 == v && a.newFillStyle([this.customArr[1].color]),
                a.beginPath(),
                s = 0;
              n > s;
              s++
            )
              if (((o = this.datas[s]), 2 > v))
                o.bar &&
                  ((h = o.bary),
                  0 == v && o.percent >= 0
                    ? a.drawVStickRect(e + 0.38 * c, h, u, p - h, l, !d)
                    : 1 == v &&
                      o.percent < 0 &&
                      a.drawVStickRect(e + 0.38 * c, h, u, p - h, l, !d)),
                  (e += c);
              else if (2 == v) {
                if (o.dot) {
                  var A = o.dot;
                  (h = o.bary),
                    a.arc(e + 0.58 * c, h - A - 6, 2 * A, 0, 2 * Math.PI),
                    a.fill(),
                    a.closePath();
                }
                e += c;
              }
          a.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }

  function LB(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#007cc8",
        prop: "lb",
        idct: "LB",
        desc: "量比"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "LB"),
      (this.sname = "T_LB"),
      (this.alias = "量比"),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = this.gdsd(i)),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        for (var r, a, s = 0, e = i.length, h = 0; e > s; s++) {
          (a = 5e4),
            (r = 0),
            !isNaN(i[s][0].lastfive) &&
              i[s][0].lastfive > 0 &&
              (a = i[s][0].lastfive);
          for (var o = 0, l = 0; o < this.disMod; o++) {
            var n = Number(i[s][o].volume) < 0 ? 0 : Number(i[s][o].volume);
            (r += n),
              0 >= n
                ? ((h = 0 == o ? 0 : this.selfArr[this.selfArr.length - 1].lb),
                  l++)
                : (h =
                    o == this.disMod - 1
                      ? r / a / (o - l)
                      : r / a / (o - l + 1)),
              0 > h && (h = 0),
              this.selfArr.push({
                ignore_price: i[s][o].price,
                lb: h
              });
          }
        }
      }),
      (this.draw = function(t) {
        if (this.datas) {
          this.line.clear(!0, this.cfg.PARAM.getHd());
          for (
            var i,
              r = this.datas.length,
              a = this.cfg.DIMENSION.w_t / r,
              s = this.customArr.length;
            s--;

          ) {
            var e = this.customArr[s].prop + "y";
            (i = a * gt), this.line.newStyle(this.customArr[s].color, !0, 1.3);
            for (var h = 0; r > h && !(this.datas[h].ignore_price < 0); h++)
              0 == h || h % this.disMod == 0
                ? this.line.moveTo(i, this.datas[h][e])
                : this.line.lineTo(i, this.datas[h][e]),
                (i += a);
            this.line.stroke();
          }
          t && this.line.drawBg();
        }
      });
  }

  function MA(i, a) {
    techchart.call(this, i, a);
    var s = this;
    (this.name = "MA"), "k" != a.type && (this.sname = "T_" + this.name);
    var e = ["#FC9CB8", "#12BDD9", "#EE2F72", "#8CBB0D", "#0DC168", "#978d52"],
      h = "MA",
      o = "ma";
    (this.generateSettings = function() {
      if (s.param && s.param.length > 0) {
        s.customArr = [];
        for (var i = 0, r = s.param.length; r > i; i++) {
          var a = s.param[i].v;
          !isNaN(a) &&
            a > 0 &&
            s.customArr.push({
              v: a,
              color: s.param[i].color || e[i] || "#" + utils_util.randomColor(),
              prop: o + a,
              idct: h + a,
              desc: h
            });
        }
      }
      (!s.customArr || s.customArr.length < 1) &&
        (s.customArr = [
          {
            v: 5,
            color: e[0],
            prop: o + "5",
            idct: h + "5",
            desc: h
          },
          {
            v: 10,
            color: e[1],
            prop: o + "10",
            idct: h + "10",
            desc: h
          },
          {
            v: 20,
            color: e[2],
            prop: o + "20",
            idct: h + "20",
            desc: h
          },
          {
            v: 30,
            color: e[3],
            prop: o + "30",
            idct: h + "30",
            desc: h
          },
          {
            v: 60,
            color: e[3],
            prop: o + "60",
            idct: h + "60",
            desc: h
          }
        ]);
    }),
      (this.initAndCalcAll = function(i) {
        var r = this.gdsd(i);
        (this.oriArr = r),
          this.datas ? utils_util.ca(this.datas) : (this.datas = []),
          utils_util.ca(this.selfArr);
        for (
          var a = this.tkProp.close,
            s = r.length,
            e = 0,
            h = this.customArr.length;
          h > e;
          e++
        )
          for (
            var l, n = 0, c = Math.floor(this.customArr[e].v), d = 0;
            s > d;
            d++
          ) {
            var f = r[d];
            if (((n += Number(f[a])), d >= c - 1)) {
              l = n / c;
              var u = r[d - c + 1];
              n -= Number(u[a]);
            } else l = n / (d + 1);
            var p = (this.selfArr[d] = this.selfArr[d] || {});
            r[d].volume < 0 ? (p[At] = !0) : (p[o + c] = l);
          }
      });
  }

  function MACD(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 12,
        color: "#5465ff",
        prop: "dif",
        idct: "DIF"
      },
      {
        v: 26,
        color: "#ec52f5",
        prop: "dea",
        idct: "DEA"
      },
      {
        v: 9,
        color: "#b03030",
        prop: "bar",
        idct: "MACD"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "MACD"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = "#b82c0c",
      e = "#2ec196",
      ema = bt.calcEMA,
      operateArr = bt.operateArr,
      getArr = bt.getArr;
    (this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        dif12Day = this.customArr[0].v,
        dea26Day = this.customArr[1].v,
        bar9Day = this.customArr[2].v,
        closeArr = getArr(r, this.tkProp.close),
        diff = operateArr(
          ema(closeArr, dif12Day),
          ema(closeArr, dea26Day),
          "-"
        ),
        dea = ema(diff, bar9Day),
        f = operateArr(operateArr(diff, dea, "-"), 2, "*");
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var u = 0, p = r.length; p > u; u++)
        (this.selfArr[u] = {
          dif: diff[u],
          dea: dea[u],
          bar: f[u]
        }),
          (this.selfArr[u][At] = r[u].volume < 0);
    }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var h = this.line;
          h.clear(!0, i.PARAM.getHd());
          var o, l;
          "k" == a.type
            ? ((o = i.DIMENSION.w_k), (l = i.PARAM.minCandleNum))
            : ((o = i.DIMENSION.w_t), (l = 1));
          for (
            var n,
              c,
              d = this.datas.length,
              f = o / Math.max(d, l),
              u = "k" == a.type ? this.__iOffsetX - f * mt : f * gt,
              p = 0;
            2 > p;
            p++
          ) {
            var v = this.customArr[p].prop + "y";
            for (
              c = u,
                this.line.newStyle(this.customArr[p].color, !0, 1.3),
                n = 0;
              d > n;
              n++
            )
              0 == n
                ? this.line.moveTo(c, this.datas[n][v])
                : this.line.lineTo(c, this.datas[n][v]),
                (c += f);
            this.line.stroke();
          }
          var A,
            m = (this.labelMaxP / (this.labelMaxP - this.labelMinP)) * this.h;
          c = u;
          var g,
            b = 1;
          for (h.newStyle(s, !0, b), n = 0; d > n; n++)
            (A = this.datas[n].bary),
              m >= A &&
                ((g = ~~(c + 0.5)), (g -= 0.5), h.moveTo(g, m), h.lineTo(g, A)),
              (c += f);
          for (h.stroke(), c = u, h.newStyle(e, !0, b), n = 0; d > n; n++)
            (A = this.datas[n].bary),
              A > m &&
                ((g = ~~(c + 0.5)), (g -= 0.5), h.moveTo(g, m), h.lineTo(g, A)),
              (c += f);
          h.stroke();
          var y = this.h / 2 - 0.5;
          h.newStyle(this.cfg.COLOR.GRID, !0, 1),
            h.moveTo(0, y),
            h.lineTo(this.cfg.DIMENSION.w_k, y),
            h.stroke(),
            h.drawBg(this.__iOffsetX);
        }
      });
  }

  function OBV(i, a) {
    this.DEFAULT_ARR = [
      {
        v: 30,
        color: "#99cf17",
        prop: "obv",
        idct: "OBV"
      },
      {
        v: 0 / 0,
        color: "#00c1eb",
        prop: "obvma",
        idct: "OBVMA"
      }
    ];
    var s = {
      nu: !0
    };
    techchart.call(this, i, a, s),
      (this.name = "OBV"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = i),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        var r,
          a,
          s,
          e = this.customArr[0].v,
          h = i[0];
        (s =
          isNaN(h.prevclose) || h.close > h.prevclose ? h.volume : -h.volume),
          (r = h.close == h.prevclose ? 0 : s),
          (a = r),
          this.selfArr.push({
            obv: r,
            obvma: r
          });
        for (var o = 1, l = i.length; l > o; o++) {
          h = i[o];
          var n = {};
          this.selfArr.push(n),
            (s =
              h.close > i[o - 1].close
                ? Number(h.volume)
                : h.close == i[o - 1].close
                ? 0
                : -Number(h.volume)),
            (r = s + this.selfArr[o - 1].obv),
            (n.obv = r),
            (a += r),
            o >= e
              ? ((a -= this.selfArr[o - e].obv), (n.obvma = a / e))
              : (n.obvma = a / (o + 1));
        }
      });
  }

  function PKFLOW(t, i, r) {
    KFLOW.call(this, t, i, {
      nu: !0
    }),
      (this.selfDataUrl =
        "https://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getAllMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to"),
      (this.selfDataUrlUpdate =
        "http://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getLastMoneyFlow?callback=$cb&symbol=$symbol"),
      (this.cb = r),
      this.loadUrlData();
  }

  function POSITION(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#12BDD9",
        prop: "iy",
        idct: "Position"
      }
    ]),
      techchart.call(this, i, a, {
        nu: !0
      }),
      (this.name = "POSITION"),
      (this.sname = "T_POSITION"),
      (this.alias = "持仓量"),
      (this.initAndCalcAll = function(i) {
        var r = this.gdsd(i);
        (this.oriArr = r),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        for (var a = 0, s = r.length; s > a; a++) {
          var e = r[a].inventory || r[a].holdPosition;
          this.selfArr.push({
            iy: 0 > e ? 0 / 0 : e
          });
        }
      });
  }

  function Press(t, i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#ff0099",
        prop: "ss",
        idct: "净小单"
      }
    ]),
      techchart.call(this, t, i);
    var s = this;
    (this.name = "Press"),
      (this.separate = 1),
      (this.cb = a),
      (this.initAndCalcAll = function(t, i) {
        i ||
          ((this.oriArr = t), this.urlData && !this.datas && (this.datas = []));
      }),
      (this.setRange = function() {
        if (l && this.datas) {
          for (; this.datas.length > 3; ) this.datas.length--;
          for (; this.datas.length < 3; ) this.datas.push({});
          var t,
            i,
            r = this.oriArr[this.oriArr.length - 1].close;
          for (t = l.length; t-- && ((i = l[t]), !(i.p >= r)); );
          i.p == r
            ? (console.log(l[t - 1].p, l[t - 1].v),
              console.log(r, i.v),
              console.log(l[t + 1].p, l[t + 1].v))
            : (console.log(l[t].p, l[t].v),
              console.log(r, i.v),
              console.log(l[t + 1].p, l[t + 1].v)),
            console.log("-----------------------");
          for (var a = 0; 3 > a; a++)
            (this.datas[a].v = l[t - a - 1].v),
              (this.datas[a].p = l[t - a - 1].p);
          console.log(this.datas);
        }
      }),
      (this.draw = function() {
        if (this.datas) {
          var i = this.line;
          i.clear(!0, t.PARAM.getHd());
          for (
            var r,
              a,
              s,
              e,
              h = this.datas.length,
              o = t.DIMENSION.w_k / Math.max(h, t.PARAM.minCandleNum),
              l = (this.labelMaxP / (this.labelMaxP - this.labelMinP)) * this.h,
              n = [],
              c = [],
              d = this.customArr.length;
            d--;

          ) {
            var f = this.customArr[d].prop + "y";
            (e = o * gt), i.newStyle(this.customArr[d].color, !0, e);
            for (var u = 0; h > u; u++)
              (s = this.datas[u][f]),
                (r = s > l ? c[u] || 0 : n[u] || 0),
                (a = l - r),
                (s -= r),
                i.moveTo(e, a),
                i.lineTo(e, s),
                s > l
                  ? ((n[u] = n[u] || 0), (c[u] = l - s))
                  : ((n[u] = l - s), (c[u] = c[u] || 0)),
                (e += o);
            i.stroke();
          }
        }
      });
    var e,
      h = "ff.sinajs.cn",
      o = {
        ssl: !0,
        authtype: "A_hq"
      },
      l = [],
      n = function(t) {
        var i,
          r,
          a = t["2cn_" + s.symbol].split(","),
          e = 65;
        for (i = 0; 10 > i; i++)
          (r = l[i] || {}), (l[i] = r), (r.v = a[e - i]), (r.p = a[e - i - 10]);
        for (e = 26, i = 10; 20 > i; i++)
          (r = l[i] || {}), (l[i] = r), (r.v = a[e + i]), (r.p = a[e + i - 10]);
      };
    (this.loadUrlData = function() {
      if (IO.WebPush4 && this.symbol && !e) {
        var t = ["2cn", this.symbol].join("_");
        e = new IO.WebPush4(h, t, n, o);
      }
    }),
      this.loadUrlData();
  }

  function PSY(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 12,
        color: "#EE2F72",
        prop: "psy",
        idct: "PSY"
      },
      {
        v: 6,
        color: "#00c1eb",
        prop: "psyma",
        idct: "PSYMA"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "PSY"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = {
        min: 0,
        max: 100,
        upper: 75,
        lower: 25
      }),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = i),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        var r = this.customArr[0].v,
          a = this.customArr[1].v,
          s = i[0],
          e = isNaN(s.prevclose) || s.prevclose < s.close ? 1 : 0,
          h = e,
          o = (e / r) * 100,
          l = o;
        this.selfArr.push({
          psy: o,
          psyma: o
        });
        for (var n = [e], c = 1, d = i.length; d > c; c++) {
          s = i[c];
          var f = {};
          this.selfArr.push(f),
            (e = s.close > i[c - 1].close ? 1 : 0),
            n.push(e),
            (h += e),
            c >= r && (h -= n[c - r]),
            (o = (h / r) * 100),
            (f.psy = o),
            (l += o),
            c >= a
              ? ((l -= this.selfArr[c - a].psy), (f.psyma = l / a))
              : (f.psyma = l / (c + 1));
        }
      });
  }

  function RGL(i, a, s) {
    var e = "rgl";
    (this.DEFAULT_ARR = [
      {
        color: "#2D0674",
        prop: e,
        idct: "红绿角线"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "RGL"),
      (this.sname = "T_RGL"),
      (this.alias = "红绿角线"),
      (this.separate = 1);
    var h = "icn_calc_",
      o = this;
    (this.selfDataUrl =
      "http://finance.sina.com.cn/finance/touziline/$symbol.js?" +
      Math.random()),
      (this.selfDataUrlUpdate =
        "http://" +
        dt +
        ".sinajs.cn/etag.php?_=" +
        new Date().getTime() +
        "&list=" +
        h +
        "$symbol"),
      (this.cb = s),
      (this.df = function(t) {
        var i = [];
        if (t)
          for (var r in t)
            t.hasOwnProperty(r) &&
              i.push({
                rgl: Number(t[r]),
                time: r
              });
        return i;
      });
    var l,
      n = !1;
    (this.loadUrlData = function() {
      var i = this.aliasymbol || this.symbol,
        r = "_touziredgreenline_" + i,
        s = this.selfDataUrl
          .replace("$symbol", i)
          .replace("$cb", "var%20" + r + "=")
          .replace("$rn", String(new Date().getDate()));
      this.proxyCfg.usrObj.ssl && (s = utils_util.getSUrl(s)),
        n ||
          ((l = utils_util.tUtil.gata(a.usrObj.market)),
          utils_util.load(s, function() {
            var t = window[r];
            o.urlData = {
              time: []
            };
            var i = o.df(t),
              a = o.urlData.time;
            a.splice.apply(a, [0, 0].concat(i)), (n = !0), o.update();
          }));
    }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r &&
              r.length > 1 &&
              (i = [
                {
                  time: r[6].substring(0, 5),
                  rgl: r[3] - r[4]
                }
              ]),
            i
          );
        }
      }),
      (this.update = function() {
        var i = this.symbol,
          r = "hq_str_" + h + i,
          a = this.selfDataUrlUpdate.replace("$symbol", i);
        this.proxyCfg.usrObj.ssl && (a = utils_util.getSUrl(a)),
          utils_util.load(a, function() {
            var t = window[r];
            window[r] = null;
            var i = o.udf(t);
            i && o.urlData && o.urlData.time && o.updateData(i, o.urlData.time);
          });
      }),
      (this.updateData = function(i, r) {
        if (i && r && !(r.length < 1)) {
          var s = r[r.length - 1];
          if ((i = i[0])) {
            if (s.time < i.time)
              for (
                var e = utils_util.arrIndexOf(l, i.time),
                  h = utils_util.arrIndexOf(l, s.time),
                  n = h;
                e >= n;
                n++
              )
                e - n > 0
                  ? ((r[r.length] = r[r.length - 1]),
                    console.log(e, n, a.stock.realLen))
                  : (r[r.length - 1] = i);
            else r[r.length - 1].rgl += i.rgl;
            o.cb(o),
              4 == o.viewState.start && 5 == o.viewState.end && a.cbInDC(),
              this.syncI();
          }
        }
      }),
      (this.initAndCalcAll = function(i) {
        if (this.urlData) {
          (this.oriArr = this.gdsd(i)),
            !this.datas && (this.datas = []),
            utils_util.ca(this.selfArr);
          var r,
            s = this.urlData.time,
            e = a.stock.realLen;
          for (0 > e && (e = o.disMod), r = 0; r < o.disMod && !(r > e); r++)
            s[r] && (i[4][r].rgl = s[r].rgl);
          for (var h, l = 0, n = this.oriArr.length; n > l; l++)
            (h = this.oriArr[l]),
              this.selfArr.push({
                rgl: h ? Number(h.rgl) : 1
              });
        }
      }),
      (this.createPlayingData = function() {
        if (this.datas) {
          var t = this.h % 2 == 0 ? this.h : this.h + 1;
          (this.labelMaxP = Math.abs(
            Math.abs(this.labelMaxP) > Math.abs(this.labelMinP)
              ? this.labelMaxP
              : this.labelMinP
          )),
            (this.labelMinP = -this.labelMaxP);
          for (
            var i,
              r = this.labelMaxP - this.labelMinP,
              a = 0,
              s = this.datas.length;
            s > a;
            a++
          ) {
            i = this.datas[a];
            for (var e = this.customArr.length; e--; ) {
              var h = this.customArr[e].prop;
              i[h + "y"] = ((t / 2) * (this.labelMaxP - i[h])) / r;
            }
          }
        }
      }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          var r = this.datas.length,
            a = i.DIMENSION.w_t / r,
            s = i.DIMENSION.h_t,
            e = a * gt;
          s = s % 2 == 0 ? s : s + 1;
          for (var h, o, l, n, c = s / 2, d = 0; 2 > d; d++) {
            (n = 1 == d ? i.COLOR.T_FALL : i.COLOR.T_RISE),
              (h = 0),
              t.beginPath();
            for (var f = 0; r > f; f++)
              (l = this.datas[f]),
                (o = l.rgly + s / 4),
                0 == d
                  ? l.rgl > 0 && t.drawVStickC(h, o, e, c - o, n)
                  : l.rgl < 0 && t.drawVStickC(h, o, e, c - o, n),
                (h += a);
            t.stroke();
          }
          t.drawBg();
        }
      }),
      this.loadUrlData();
  }

  function ROC(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 12,
        color: "#F17147",
        prop: "roc",
        idct: "ROC"
      },
      {
        v: 6,
        color: "#406BEA",
        prop: "maroc",
        idct: "MAROC"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "ROC"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = {
        glv: 0
      });
    var s = bt.calcMA,
      e = bt.calcREF,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        l = this.customArr[1].v,
        n = h(r, this.tkProp.close),
        c = o(o(o(n, e(n, a), "-"), 100, "*"), e(n, a), "/"),
        d = s(c, l);
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var f = 0, u = r.length; u > f; f++)
        (this.selfArr[f] = {
          roc: c[f],
          maroc: d[f]
        }),
          (this.selfArr[f][At] = r[f].volume < 0);
    };
  }

  function RSI(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 6,
        color: "#999999",
        prop: "rsi1",
        idct: "RSI1"
      },
      {
        v: 12,
        color: "#ffac03",
        prop: "rsi2",
        idct: "RSI2"
      },
      {
        v: 24,
        color: "#9A2574",
        prop: "rsi3",
        idct: "RSI3"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "RSI"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = {
        min: 0,
        max: 100,
        upper: 70,
        lower: 30
      });
    var s = bt.calcREF,
      e = bt.calcMAX,
      h = bt.calcSMA,
      o = bt.calcABS,
      l = bt.operateArr,
      n = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        c = this.customArr[1].v,
        d = this.customArr[2].v,
        f = n(r, this.tkProp.close),
        u = s(f, 1),
        p = l(f, u, "-"),
        v = e(p, 0),
        A = o(p),
        m = l(l(h(v, a, 1), h(A, a, 1), "/"), 100, "*"),
        g = l(l(h(v, c, 1), h(A, c, 1), "/"), 100, "*"),
        b = l(l(h(v, d, 1), h(A, d, 1), "/"), 100, "*");
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var y = 0, _ = r.length; _ > y; y++)
        (this.selfArr[y] = {
          rsi1: m[y],
          rsi2: g[y],
          rsi3: b[y]
        }),
          (this.selfArr[y][At] = r[y].volume < 0);
    };
  }

  function SAR(i, a) {
    var s = "ignore_pct",
      e = "ignore_oripct";
    (this.DEFAULT_ARR = [
      {
        v: 4,
        color: "#777777",
        prop: "sar",
        idct: "SAR",
        desc: "天数"
      },
      {
        v: 2,
        color: "#b82c0c",
        desc: "参数"
      },
      {
        v: 20,
        color: "#008040",
        desc: "反向临界"
      },
      {
        color: "#777777",
        idct: "SAR操作收益",
        prop: s
      },
      {
        color: "#777777",
        idct: "区间股价收益",
        prop: e
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "SAR");
    var h = bt.calcSAR;
    (this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = h(i, r[0].v, r[1].v, r[2].v);
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var s = 0, e = i.length; e > s; s++)
        this.selfArr[s] = {
          ignore_minmax: a.direction[s],
          sar: a.data[s]
        };
    }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = Number.MAX_VALUE,
              h = -Number.MAX_VALUE,
              o = 0,
              l = 0,
              n = this.selfArr[t].ignore_minmax,
              c = t;
            i > c;
            c++
          ) {
            var d = this.oriArr[c],
              f = this.selfArr[c].ignore_minmax,
              u = this.datas[c - t];
            (u.date = d.date),
              c != t
                ? f == n
                  ? 1 == f && (o = (1 + d.percent) * (1 + o) - 1)
                  : (o =
                      0 == f
                        ? ((d.close - this.oriArr[c - 1].close) /
                            this.oriArr[c - 1].close +
                            1) *
                            (1 + o) -
                          1
                        : ((d.close - d.close) / d.close + 1) * (1 + o) - 1)
                : 1 == f &&
                  (o = ((d.close - d.close) / d.close + 1) * (1 + o) - 1),
              (n = f),
              c != t && (l = (1 + d.percent) * (1 + l) - 1),
              (u[s] = 100 * o),
              (u[e] = 100 * l);
            for (var p in this.selfArr[c])
              if (this.selfArr[c].hasOwnProperty(p)) {
                if (((u[p] = this.selfArr[c][p]), 0 == p.indexOf(vt))) continue;
                u[p] > h && (h = u[p]), u[p] < a && (a = u[p]);
              }
          }
          (this.minPrice = a), (this.maxPrice = h), this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          var s = this.datas.length,
            e = i.DIMENSION.w_k / Math.max(s, i.PARAM.minCandleNum),
            h = Math.max(0.1 * e, 0.1);
          h > 2 && (h = 2);
          for (
            var o,
              l = this.__iOffsetX - e * mt,
              n = this.customArr[0].prop + "y",
              c = this.customArr,
              d = 0;
            2 > d;
            d++
          ) {
            (o = l),
              this.line.newStyle(0 == d ? c[2].color : c[1].color, !0, 2);
            for (var f = 0; s > f; f++)
              this.datas[f].ignore_minmax == d &&
                this.line.drawDot(o, this.datas[f][n], h, !0),
                (o += e);
            this.line.stroke();
          }
          t && a.drawBg(this.__iOffsetX);
        }
      });
  }

  function TTOPTRADE(i, a, s) {
    function e(t, i, r) {
      if (typeof t.length < 1) return [];
      for (
        var a, s = n.gata(r), e = t, h = [], o = 0, l = 0, c = s.length;
        c > l;
        l++
      ) {
        (a = {}),
          (h[h.length] = a),
          (a.trade_time = s[l]),
          (a.trade_buy = a.trade_sell = a.trade_total = 0);
        for (var d = o, f = e.length; f > d; d++) {
          var u = e[d],
            p = u.time;
          if (p == s[l]) {
            (a.trade_buy = u.buy),
              (a.trade_sell = u.sell),
              (a.trade_total = u.total),
              e.splice(d, 1);
            break;
          }
          p > s[l] &&
            ((a.trade_buy = 0), (a.trade_sell = 0), (a.trade_total = 0));
        }
      }
      return (h[0].trade_index = c - 1), h;
    }
    var h = this;
    techchart.call(this, i, a, {
      nu: !0
    }),
      (this.name = "TTopTrade"),
      (this.alias = "高手交易"),
      (this.selfDataUrlUpdate =
        "http://touzi.sina.com.cn/api/openapi.php/TzyGraphService.getGaoShouTradeDetail?callback=$cb&symbol=$symbol&$rn"),
      (this.selfDataUrl =
        "http://touzi.sina.com.cn/api/openapi.php/TzyGraphService.getGaoShouTradeDetailMore?callback=$cb&symbol=$symbol&$rn"),
      (this.cb = s);
    var o = [
        {
          v: 0 / 0,
          color: "#ff1111",
          prop: "trade_total",
          idct: "今日交易总计"
        },
        {
          v: 0 / 0,
          color: "#ff9f07",
          prop: "trade_buy",
          idct: "买入"
        },
        {
          v: 0 / 0,
          color: "#00b5f8",
          prop: "trade_sell",
          idct: "卖出"
        }
      ],
      l = "top_trade_",
      n = utils_util.tUtil;
    (this.generateSettings = function() {
      if (h.param && h.param.length > 0) {
        h.customArr = [];
        for (var i = 0, r = h.param.length; r > i; i++)
          h.customArr.push({
            vol: 0 / 0,
            color:
              h.param[i].color || o[i].color || "#" + utils_util.randomColor(),
            prop: o[i].prop,
            idct: o[i].idct
          });
      }
      (!h.customArr || h.customArr.length < 1) && (h.customArr = o);
    }),
      (this.udf = function(t) {
        var i = [],
          r = [];
        if (t) {
          for (var s = t.result.data, h = s.length, o = 0; h > o; o++)
            i.push({
              total: Number(s[o].total),
              time: s[o].time,
              buy: Number(s[o].buy),
              sell: Number(s[o].sell),
              date: lt.sd(s[o].dt)
            });
          r = e(i, a.stock.hq.date, "CN", !0);
        }
        return r;
      });
    var c,
      d = !1;
    (this.loadUrlData = function() {
      if (a.stock.hq) {
        var i = this.aliasymbol || this.symbol,
          r = "_touziTopTrade_" + i,
          s = this.selfDataUrl
            .replace("$symbol", i)
            .replace("$cb", "var%20" + r + "=")
            .replace("$rn", String(new Date().getDate()));
        this.proxyCfg.usrObj.ssl && (s = utils_util.getSUrl(s)),
          d ||
            ((c = utils_util.tUtil.gata(a.usrObj.market)),
            utils_util.load(s, function() {
              var t = window[r];
              h.urlData = {
                time: []
              };
              var i = h.df(t),
                a = h.urlData.time;
              a.splice.apply(a, [0, 0].concat(i)), (d = !0), h.update();
            }));
      }
    }),
      (this.df = function(t) {
        var i = [],
          r = [];
        if (t)
          for (var s = t.result.data, h = s.length, o = 0; h > o; o++) {
            i[o] = [];
            for (var l = 0; l < s[o].length; l++)
              i[o].push({
                total: Number(s[o][l].total),
                time: s[o][l].time,
                buy: s[o][l].buy,
                sell: s[o][l].sell,
                date: lt.sd(s[o][l].dt)
              });
            var n;
            (n = a.stock ? a.stock.hq.date : s[h - 1][0].date),
              (r[o] = e(i[o], n, "CN"));
          }
        return r;
      }),
      (this.update = function() {
        var i = this.symbol,
          r = "hq_str_" + l + i,
          a = this.selfDataUrlUpdate
            .replace("$symbol", i)
            .replace("$cb", "var " + r + "=")
            .replace("$rn", String(new Date().getDate()));
        this.proxyCfg.usrObj.ssl && (a = utils_util.getSUrl(a)),
          utils_util.load(a, function() {
            var t = window[r];
            window[r] = null;
            var i = h.udf(t);
            i && h.urlData && h.urlData.time && h.updateData(i, h.urlData.time);
          });
      }),
      (this.updateData = function(t, i) {
        !t ||
          !i ||
          i.length < 1 ||
          ((t = t[0]),
          t &&
            (h.cb(h),
            4 == h.viewState.start && 5 == h.viewState.end,
            this.syncI()));
      }),
      (this.initAndCalcAll = function(i) {
        if (this.urlData) {
          (this.oriArr = this.gdsd(i)),
            !this.datas && (this.datas = []),
            utils_util.ca(this.selfArr);
          var r,
            s,
            e,
            o,
            l = this.urlData.time,
            n = a.stock.realLen;
          for (0 > n && (n = h.disMod), r = 0; r < l.length; r++)
            for (s = 0; s < h.disMod; s++)
              l[r][s] &&
                ((i[r][s].trade_total = l[r][s].trade_total),
                (i[r][s].trade_buy = l[r][s].trade_buy),
                (i[r][s].trade_sell = l[r][s].trade_sell),
                (i[r][s].trade_time = l[r][s].trade_time));
          for (r = 0, o = this.oriArr.length; o > r; r++)
            (e = this.oriArr[r]),
              this.selfArr.push({
                trade_total: e.trade_total ? Number(e.trade_total) : 0,
                trade_buy: e.trade_buy ? Number(e.trade_buy) : 0,
                trade_sell: e.trade_sell ? Number(e.trade_sell) : 0,
                trade_time: e.trade_time ? e.trade_time : 0
              });
        }
      }),
      (this.draw = function(t) {
        if (((this.__iOffsetX = isNaN(t) ? this.__iOffsetX : t), this.datas)) {
          var r = this.line;
          r.clear(!0, i.PARAM.getHd());
          for (
            var a,
              s,
              e,
              h,
              o,
              l = this.datas.length,
              n = i.DIMENSION.w_t / l,
              c = 0,
              d = 0.6 * n,
              f = 0.5 * this.h,
              u = 0;
            2 > u;
            u++
          ) {
            switch (c) {
              case 0:
                o = i.COLOR.T_RISE;
                break;
              case 1:
                o = i.COLOR.T_FALL;
            }
            for (s = 0, r.beginPath(), a = 0; l > a; a++)
              (h = this.datas[a]),
                (e = h.trade_totaly),
                h.trade_total > 0 &&
                  (h.trade_buy > 0 && r.drawVStickC(s, e, d, f - e, o),
                  h.trade_sell > 0 && r.drawVStickC(s, e, d, f - e, o)),
                (s += n);
            r.stroke();
          }
          r.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }

  function TFLOW(i, a, s) {
    var e = this,
      h = 2e4;
    techchart.call(this, i, a, {
      nu: !0
    }),
      (this.name = "TFLOW"),
      (this.sname = "T_TFLOW"),
      (this.alias = "净买入"),
      (this.urls = {
        oned:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShuminline?random=$rn",
        onec:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2Adayminline?symbol=$symbol&___qn=3&random=$rn",
        c:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2A5dayminline?symbol=$symbol&random=$rn",
        d:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShu5dayminline?random=$rn"
      });
    var o,
      l = !0;
    this.cb = s;
    var n = 0,
      c = [
        {
          v: 0 / 0,
          color: "#ff1111",
          prop: "mb",
          idct: "特大"
        },
        {
          v: 0 / 0,
          color: "#ff9f07",
          prop: "ms",
          idct: "大"
        },
        {
          v: 0 / 0,
          color: "#00b5f8",
          prop: "sb",
          idct: "中"
        },
        {
          v: 0 / 0,
          color: "#5b0497",
          prop: "ss",
          idct: "小"
        }
      ],
      d = null;
    this.generateSettings = function() {
      for (var i in e.urls)
        e.urls.hasOwnProperty(i) && (e.urls[i] = utils_util.getSUrl(e.urls[i]));
      if (e.param && e.param.length > 0) {
        e.customArr = [];
        for (var r = 0, a = e.param.length; a > r; r++)
          e.customArr.push({
            v: 0 / 0,
            color:
              e.param[r].color || c[r].color || "#" + utils_util.randomColor(),
            prop: c[r].prop,
            idct: c[r].idct
          });
      }
      (!e.customArr || e.customArr.length < 1) && (e.customArr = c);
    };
    var f = function(t) {
      var i,
        r = String(t).split("|"),
        a = [];
      i = r.slice(1, r.length);
      for (var s = 0, e = {}, h = []; s < i.length; s++)
        (h = i[s].split(",")),
          (h[0] > "11:30" && h[0] < "13:00") ||
            ((e = {
              time: h[0],
              mb: Number(h[1]),
              ms: Number(h[2]),
              sb: Number(h[3]),
              ss: Number(h[4])
            }),
            a.push(e));
      return a;
    };
    (this.df = function(t) {
      for (
        var i, r = String(t).split("R"), a = [], s = 0, e = r.length, h = [];
        e > s;
        s++
      ) {
        i = String(r[s]).split("|");
        var o = [];
        h = i.slice(1, i.length);
        for (var l = 0, n = {}, c = []; l < h.length; l++)
          (c = h[l].split(",")),
            (c[0] > "11:30" && c[0] < "13:00") ||
              ((n = {
                time: c[0],
                mb: Number(c[1]),
                ms: Number(c[2]),
                sb: Number(c[3]),
                ss: Number(c[4])
              }),
              0 == l && (n.date = i.slice(0, 1)[0]),
              o.push(n));
        a.push(o);
      }
      return a;
    }),
      (this.loadUrlData = function(i) {
        if (i && a.stock.hq) {
          var r = e.symbol,
            s = "_" + r + lt.ddt(new Date()).getFullYear();
          (e.selfDataUrl = o
            ? a.stock.dp
              ? e.urls.oned
              : e.urls.onec
            : a.stock.dp
            ? e.urls.d
            : e.urls.c),
            a.stock.hq.isUpdateTime ||
              (clearInterval(this.updateId), (this.updateId = null)),
            utils_util.load(
              e.selfDataUrl
                .replace("$symbol", r)
                .replace("$cb", "var%20" + s + "="),
              function() {
                var t = window[s];
                return t && t.__ERROR
                  ? ((e.urlData[4] = d), void (n = 1))
                  : void (
                      t &&
                      (o ? (e.urlData[4] = f(t)) : (e.urlData = e.df(t)),
                      (d = e.urlData[4]),
                      (e.toReCalc = !0),
                      e.cb(e),
                      (e.tFlowLen = e.urlData.length),
                      (o = !0))
                    );
              },
              function() {
                n = 1;
              }
            );
        }
      }),
      (this.initAndCalcAll = function(i) {
        if (
          (a.stock.hq && l && (e.loadUrlData(!0), (l = !1)),
          (this.oriArr = this.gdsd(i)),
          1 != n && this.urlData)
        ) {
          !this.datas && (this.datas = []), utils_util.ca(this.selfArr);
          var r,
            s,
            h = i.length,
            o = [],
            c = this.urlData.length,
            d = 0;
          for (r = 0; h > r; r++)
            for (s = d; c > s; s++)
              i[r][0] &&
              i[r][0].date &&
              this.urlData[r][0] &&
              utils_util.dateUtil.ds(i[r][0].date, "-") ==
                this.urlData[r][0].date
                ? (d++, o.push(this.urlData[s]))
                : s >= c - 1 && o.push([]);
          for (r = 0; h > r; r++)
            for (
              var f, u, p = r >= h - 1 ? 1e-7 : 1e-6, v = 0;
              v < this.disMod;
              v++
            ) {
              (u = i[r][v]),
                this.urlData[r][v] && (f = this.urlData[r][v]),
                r >= h - 1 && v > a.stock.hq.index && (f = null);
              var A = {
                mb: this.urlData[r][v]
                  ? Number(this.urlData[r][v].mb)
                  : f
                  ? f.mb
                  : p,
                ms: this.urlData[r][v]
                  ? Number(this.urlData[r][v].ms)
                  : f
                  ? f.ms
                  : p,
                sb: this.urlData[r][v]
                  ? Number(this.urlData[r][v].sb)
                  : f
                  ? f.sb
                  : p,
                ss: this.urlData[r][v]
                  ? Number(this.urlData[r][v].ss)
                  : f
                  ? f.ss
                  : p
              };
              r == h - 1 &&
                v == this.disMod - 1 &&
                a.stock.hq.time > "15:00" &&
                (A = this.urlData[r][v - 1]),
                this.selfArr.push(A);
            }
        }
      }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start * this.disMod,
              i = this.viewState.end * this.disMod,
              r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                s[o] > h && (h = s[o]),
                s[o] < e && (e = s[o]));
          }
          (this.labelMaxP = h), (this.labelMinP = e);
          var l = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var n = this.customArr.length; n--; ) {
              var c = this.customArr[n].prop;
              s[c + "y"] = (this.h * (h - s[c])) / l;
            }
          }
        }
      }),
      (this.draw = function(t) {
        if (this.datas) {
          a.stock.hq &&
            a.stock.hq.isUpdateTime &&
            !this.updateId &&
            (this.updateId = setInterval(e.loadUrlData, h, !0)),
            this.line.clear(!0, this.cfg.PARAM.getHd());
          var i = 1.5;
          this.h > 90 ? (i = 1.4) : this.h < 50 && (i = 1.3);
          for (
            var r,
              s = this.datas.length,
              o = this.cfg.DIMENSION.w_t / s,
              l = this.customArr.length;
            l--;

          ) {
            var n = this.customArr[l].prop + "y";
            (r = o * gt), this.line.newStyle(this.customArr[l].color, !0, i);
            for (var c = 0; s > c; c++)
              1e-7 != this.datas[c][this.customArr[l].prop] &&
                (0 == c || c % this.disMod == 0
                  ? this.line.moveTo(r, this.datas[c][n])
                  : this.line.lineTo(r, this.datas[c][n]),
                (r += o));
            this.line.stroke();
          }
          t && this.line.drawBg();
        }
      }),
      (this.updateId = setInterval(e.loadUrlData, h, !0)),
      a.stock.hq || this.loadUrlData(!0);
  }

  function TOR(i, a) {
    (this.DEFAULT_ARR = [
      {
        color: "#007cc8",
        prop: "tor",
        idct: "TOR"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "TOR"),
      (this.alias = "换手率");
    var s = !1,
      e = a.stock.extraDataObj.rsAmount;
    this.initAndCalcAll = function(i) {
      if (e) {
        (this.oriArr = i),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        for (var r, h, o = 0, l = i.length; l > o; o++) {
          r = i[o];
          for (var n = 0, c = e.length; c > n; n++)
            if (r.date >= e[n].date) {
              h = e[n].amount;
              break;
            }
          this.selfArr[o] = {
            tor: r.volume / h
          };
        }
      } else if (!s) {
        s = !0;
        var d = this;
        setTimeout(function() {
          (e = a.stock.extraDataObj.rsAmount), d.initAndCalcAll(i), (s = !1);
        }, 3e3);
      }
    };
  }

  function TRIX(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 12,
        color: "#d6c84b",
        prop: "trix",
        idct: "TRIX"
      },
      {
        v: 9,
        color: "#26bcd5",
        prop: "matrix",
        idct: "MATRIX"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "TRIX"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = bt.calcMA,
      e = bt.calcEMA,
      h = bt.getArr,
      o = bt.operateArr,
      l = bt.calcREF;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        n = this.customArr[1].v,
        c = h(r, this.tkProp.close),
        d = e(e(e(c, a), a), a),
        f = l(d, 1),
        u = o(o(o(d, f, "-"), f, "/"), 100, "*"),
        p = s(u, n);
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var v = 0, A = r.length; A > v; v++)
        (this.selfArr[v] = {
          trix: u[v],
          matrix: p[v]
        }),
          (this.selfArr[v][At] = r[v].volume < 0);
    };
  }

  function TTFLOW(t, i, r) {
    TFLOW.call(this, t, i, {
      nu: !0
    }),
      (this.urls = {
        oned:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getMinuteFlow?random=$rn",
        onec:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockMinuteFlow?symbol=$symbol&random=$rn",
        c:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockHistoryMinuteFlow?symbol=$symbol&random=$rn",
        d:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getHistoryMinuteFlow?symbol=$symbol&random=$rn"
      }),
      (this.cb = r),
      i.stock.hq || this.loadUrlData(!0);
  }

  function TZY(i, a, s) {
    var e = "pct",
      h = "oripct";
    (this.DEFAULT_ARR = [
      {
        color: "#fa6d6d",
        prop: e,
        idct: "红线（多空信号收益）"
      },
      {
        color: "#2b55ff",
        prop: h,
        idct: "蓝线（股价自然涨幅）"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "TZY"),
      (this.separate = 1),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/finance/hq/$symbol.js?_=$rn");
    var o = "dkfz_";
    (this.selfDataUrlUpdate =
      "http://" +
      dt +
      ".sinajs.cn/etag.php?_=" +
      new Date().getTime() +
      "&list=" +
      o +
      "$symbol"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.loadedFromTo = void 0),
      (this.df = function(t) {
        var i = [];
        if (t) {
          var r = t;
          for (var a in r)
            r.hasOwnProperty(a) &&
              i.push({
                flag: r[a],
                date: lt.sd(a)
              });
        }
        return i;
      }),
      (this.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
          var r = i[0],
            a = i[1],
            s = this,
            e = this.symbol,
            h = "_touzibullbear_" + e,
            o = this.selfDataUrl
              .replace("$symbol", e)
              .replace("$cb", "var%20" + h + "=")
              .replace("$from", r)
              .replace("$to", a)
              .replace("$rn", String(new Date().getDate()));
          this.proxyCfg.usrObj.ssl && (o = utils_util.getSUrl(o)),
            utils_util.load(o, function() {
              var t = window[h];
              s.urlData ||
                (s.urlData = {
                  day: []
                });
              var i = s.df(t),
                r = s.urlData.day;
              r.splice.apply(r, [0, 0].concat(i)),
                r.sort(function(t, i) {
                  return t.date - i.date;
                }),
                (s.toReCalc = !0),
                s.cb(s);
            });
        }
      }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r &&
              r.length > 1 &&
              (i = [
                {
                  date: lt.sd(r[0]),
                  flag: r[1]
                }
              ]),
            i
          );
        }
      });
    var l = !0;
    (this.UPDATE_THRESHOLD = 3),
      (this.update = function() {
        if (l) l = !1;
        else {
          if (++this.updateCount < this.UPDATE_THRESHOLD) return;
          this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
        }
        var i = this,
          r = this.symbol,
          a = "hq_str_" + o + r,
          s = this.selfDataUrlUpdate.replace("$symbol", r);
        this.proxyCfg.usrObj.ssl && (s = utils_util.getSUrl(s)),
          utils_util.load(s, function() {
            var t = window[a],
              r = i.udf(t);
            r && i.doUpdate(r);
          });
      }),
      (this.updateData = function(t, i, r) {
        if (t && i && !(i.length < 1)) {
          var a = i[i.length - 1];
          if ((t = t[0]))
            if (lt.stbd(t.date, a.date))
              for (var s in t)
                t.hasOwnProperty(s) &&
                  ("undefined" != typeof a[s] && (a[s] = t[s]),
                  (a.isFake = !1));
            else t.date > a.date && this.newData(i, t, r);
        }
      }),
      (this.initAndCalcAll = function(i) {
        if (((this.oriArr = i), this.urlData && this.toReCalc)) {
          (this.toReCalc = !1),
            !this.datas && (this.datas = []),
            utils_util.ca(this.selfArr);
          for (
            var r,
              a = this.urlData.day,
              s = utils_util.kUtil.adbd(a, i, !1, !1),
              e = 0,
              h = i.length;
            h > e;
            e++
          )
            (r = s[e]),
              this.selfArr.push({
                flag: r ? Number(r.flag) : 1,
                isFake: r ? !!r.isFake : !0
              });
        }
      }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = 0,
              s = 0,
              o = this.selfArr[t].flag,
              l = bt.calcA,
              n = bt.getArr,
              c = 10,
              d = t;
            i > d;
            d++
          ) {
            var f = this.datas[d - t];
            f.date = this.oriArr[d].date;
            var u = this.selfArr[d].flag,
              p = this.oriArr[d],
              v = l(
                n(
                  this.oriArr.slice(0 > d - c + 1 ? 0 : d - c + 1, d + 1),
                  "close",
                  function(t) {
                    return +t.toFixed(2);
                  }
                )
              ),
              A = p.close.toFixed(2),
              m = p.open.toFixed(2);
            if (d != t) {
              var g = this.oriArr[d - 1].close.toFixed(2);
              u == o
                ? 1 == u && (a = (1 + (A - g) / g) * (1 + a) - 1)
                : (a =
                    0 == u
                      ? v > m
                        ? ((m - g) / g + 1) * (1 + a) - 1
                        : ((v - g) / g + 1) * (1 + a) - 1
                      : m > v
                      ? ((A - m) / m + 1) * (1 + a) - 1
                      : ((A - v) / v + 1) * (1 + a) - 1);
            } else
              1 == u &&
                (a =
                  m > v
                    ? ((A - m) / m + 1) * (1 + a) - 1
                    : ((A - v) / v + 1) * (1 + a) - 1);
            (o = u),
              d != t && (s = (1 + p.percent) * (1 + s) - 1),
              (f[e] = 100 * a),
              (f[h] = 100 * s);
            for (var b in this.selfArr[d])
              this.selfArr[d].hasOwnProperty(b) && (f[b] = this.selfArr[d][b]);
          }
          this.syncI();
        }
      }),
      (this.draw = function(r, a) {
        function s(t, i, r) {
          for (
            var a = t.length, s = t[a - 1][i], e = a - 1, h = t.length;
            h--;

          ) {
            var o = t[h][i];
            r ? o > s && ((s = o), (e = h)) : s > o && ((s = o), (e = h));
          }
          return e;
        }

        function e(t, i, r, a, s) {
          t.moveTo(i, r + s),
            t.lineTo(i - a, r + Math.sqrt(3) * a + s),
            t.lineTo(i + a, r + Math.sqrt(3) * a + s),
            t.lineTo(i, r + s);
        }

        function h(t, i, r, a, s) {
          t.moveTo(i, r - s),
            t.lineTo(i - a, r - Math.sqrt(3) * a - s),
            t.lineTo(i + a, r - Math.sqrt(3) * a - s),
            t.lineTo(i, r - s);
        }
        if (((this.__iOffsetX = isNaN(a) ? this.__iOffsetX : a), this.datas)) {
          var o = this.line;
          o.clear(!0, i.PARAM.getHd());
          var l,
            n,
            c,
            d = this.viewState.start,
            f = this.viewState.end,
            u = utils_util.hex2dec(this.customArr[0].color, 0.5),
            p = utils_util.hex2dec(this.customArr[1].color, 0.5);
          (c = d), (n = this.datas[0].flag);
          for (var v = d; f > v; v++)
            if (this.datas[v - d].isFake && v != f - 1) c = v;
            else {
              if (((l = this.datas[v - d].flag), l != n)) {
                o.beginPath();
                var A = (this.oriArr[v].ix + this.oriArr[v - 1].ix) / 2,
                  m = (this.oriArr[v].cy + this.oriArr[v - 1].cy) / 2;
                if (c != d)
                  var g = (this.oriArr[c].ix + this.oriArr[c - 1].ix) / 2,
                    b = (this.oriArr[c].cy + this.oriArr[c - 1].cy) / 2;
                else (g = this.oriArr[c].ix), (b = this.oriArr[c].cy);
                if ((o.moveTo(A, m), o.lineTo(g, b), 1 == n)) {
                  var y = s(this.oriArr.slice(c, v), "high", !0) + c;
                  o.lineTo(this.oriArr[y].ix, this.oriArr[y].hy);
                  var _ = this.oriArr[v].cy == this.oriArr[y].hy;
                  _ ? o.newStyle([u]) : o.newFillStyle([u]);
                } else
                  (y = s(this.oriArr.slice(c, v), "low", !1) + c),
                    o.lineTo(this.oriArr[y].ix, this.oriArr[y].ly),
                    (_ = this.oriArr[v].cy == this.oriArr[y].ly),
                    _ ? o.newStyle([p]) : o.newFillStyle([p]);
                _ ? o.stroke() : o.fill(), (c = v);
              }
              ((v == f - 1 && !this.datas[v - d].isFake) ||
                (v == f - 2 && this.datas[v - d + 1].isFake)) &&
                (o.beginPath(),
                (A = this.oriArr[v].ix),
                (m = this.oriArr[v].cy),
                l != n
                  ? ((g = (this.oriArr[v].ix + this.oriArr[v - 1].ix) / 2),
                    (b = (this.oriArr[v].cy + this.oriArr[v - 1].cy) / 2),
                    o.moveTo(A, m),
                    o.lineTo(g, b),
                    1 == l
                      ? (o.lineTo(this.oriArr[v].ix, this.oriArr[v].hy),
                        (_ = this.oriArr[v].cy == this.oriArr[v].hy),
                        _ ? o.newStyle([u]) : o.newFillStyle([u]))
                      : (o.lineTo(this.oriArr[v].ix, this.oriArr[v].ly),
                        (_ = this.oriArr[v].cy == this.oriArr[v].ly),
                        _ ? o.newStyle([p]) : o.newFillStyle([p])))
                  : (d == c
                      ? ((g = this.oriArr[c].ix), (b = this.oriArr[c].cy))
                      : ((g = (this.oriArr[c].ix + this.oriArr[c - 1].ix) / 2),
                        (b = (this.oriArr[c].cy + this.oriArr[c - 1].cy) / 2)),
                    o.moveTo(A, m),
                    o.lineTo(g, b),
                    1 == l
                      ? ((y = s(this.oriArr.slice(c, v + 1), "high", !0) + c),
                        o.lineTo(this.oriArr[y].ix, this.oriArr[y].hy),
                        (_ = this.oriArr[v].cy == this.oriArr[y].hy),
                        _ ? o.newStyle([u]) : o.newFillStyle([u]))
                      : ((y = s(this.oriArr.slice(c, v + 1), "low", !1) + c),
                        o.lineTo(this.oriArr[y].ix, this.oriArr[y].ly),
                        (_ = this.oriArr[v].cy == this.oriArr[y].ly),
                        _ ? o.newStyle([p]) : o.newFillStyle([p]))),
                _ ? o.stroke() : o.fill()),
                (n = l);
            }
          var w =
            i.DIMENSION.w_k / Math.max(this.datas.length, i.PARAM.minCandleNum);
          (w = w > 5 ? 5 : w), (w = 2 > w ? 2 : w);
          var D = 3,
            M = this.customArr[0].color,
            O = this.customArr[1].color;
          for (n = this.datas[0].flag, o.beginPath(), v = d; f > v; v++)
            (l = this.datas[v - d].flag),
              l != n &&
                1 == l &&
                e(o, this.oriArr[v].ix, this.oriArr[v].ly, w, D),
              (n = l);
          for (
            o.newFillStyle([M]),
              o.fill(),
              n = this.datas[0].flag,
              o.beginPath(),
              v = d;
            f > v;
            v++
          )
            (l = this.datas[v - d].flag),
              l != n &&
                0 == l &&
                h(o, this.oriArr[v].ix, this.oriArr[v].hy, w, D),
              (n = l);
          o.newFillStyle([O]), o.fill();
          var S = "转多，建议关注",
            T = "转空，风险较高",
            N = o.getG();
          N.font = i.STYLE.FONT_SIZE + "px " + i.STYLE.FONT_FAMILY;
          var I = N.measureText(S).width,
            C = 10 / Math.sqrt(3),
            R = 10,
            k = 5,
            P = C * k;
          N.beginPath(),
            (N.fillStyle = M),
            N.fillText(S, P, R),
            (P += I + C * (k - 2)),
            (N.fillStyle = O),
            N.fillText(T, P, R),
            (P = C * (k - 1.5)),
            o.beginPath(),
            o.newFillStyle([M]),
            e(o, P, 1, C, 0),
            o.fill(),
            (P += I + C * (k - 2)),
            o.beginPath(),
            o.newFillStyle([O]),
            h(o, P, R + 1, C, 0),
            o.fill(),
            r && o.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }

  function TZYS(t, i, r) {
    TZY.call(this, t, i),
      (this.name = "TZYS"),
      (this.alias = "多空反转"),
      (this.cb = r),
      (this.drawCalc = function() {
        if (this.datas) {
          this.setRange();
          var t,
            i,
            r,
            a,
            s = this.datas.length,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (i = 0; s > i; i++)
            for (t = this.datas[i], r = this.customArr.length; r--; )
              (a = this.customArr[r].prop),
                a && (t[a] > h && (h = t[a]), t[a] < e && (e = t[a]));
          (this.labelMaxP = this.maxPrice = h),
            (this.labelMinP = this.minPrice = e);
          var o = h - e;
          for (i = 0; s > i; i++)
            for (t = this.datas[i], r = this.customArr.length; r--; )
              (a = this.customArr[r].prop),
                a && (t[a + "y"] = (this.h * (h - t[a])) / o);
        }
      }),
      (this.draw = function(t, i) {
        if (((this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i), this.datas)) {
          this.line.clear(!0, this.cfg.PARAM.getHd());
          var r =
            (this.h * this.maxPrice) / (this.maxPrice - this.minPrice) - 0.5;
          this.line.newStyle(this.cfg.COLOR.GRID, !0, 2),
            this.line.moveTo(0, r),
            this.line.lineTo(this.cfg.DIMENSION.w_k, r),
            this.line.stroke();
          for (
            var a,
              s = this.datas.length,
              e =
                this.cfg.DIMENSION.w_k /
                Math.max(s, this.cfg.PARAM.minCandleNum),
              h = this.customArr.length;
            h--;

          ) {
            var o = this.customArr[h].prop + "y";
            (a = this.__iOffsetX - e * mt),
              this.line.newStyle(this.customArr[h].color, !0, 1.5);
            for (var l = 0; s > l; l++)
              0 == l
                ? this.line.moveTo(a, this.datas[l][o])
                : this.line.lineTo(a, this.datas[l][o]),
                (a += e);
            this.line.stroke();
          }
          t && this.line.drawBg(this.__iOffsetX);
        }
      });
  }

  function VR(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 26,
        color: "#75B2A3",
        prop: "vr",
        idct: "VR"
      },
      {
        v: 6,
        color: "#F8B82E",
        prop: "mavr",
        idct: "MAVR"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "VR"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = {
        upper: 200,
        lower: 70,
        glv: 350
      });
    var s = bt.calcMA,
      e = bt.calcSUM,
      h = bt.calcREF,
      o = bt.getArr,
      l = bt.operateArr;
    this.initAndCalcAll = function(i) {
      for (
        var r = this.gdsd(i),
          a = this.customArr[0].v,
          n = this.customArr[1].v,
          c = o(r, this.tkProp.close),
          d = o(r, "volume"),
          f = h(c, 1),
          u = [],
          p = [],
          v = [],
          A = 0,
          m = c.length;
        m > A;
        A++
      )
        u.push(c[A] > f[A] ? d[A] : 0),
          p.push(c[A] < f[A] ? d[A] : 0),
          v.push(c[A] == f[A] ? d[A] : 0);
      (u = e(u, a)), (p = e(p, a)), (v = e(v, a));
      var g = l(
          l(l(l(u, 2, "*"), v, "+"), 100, "*"),
          l(l(p, 2, "*"), v, "+"),
          "/"
        ),
        b = s(g, n);
      (this.oriArr = r),
        this.datas ? utils_util.ca(this.datas) : (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var y = 0, _ = r.length; _ > y; y++)
        (this.selfArr[y] = {
          vr: g[y],
          mavr: b[y]
        }),
          (this.selfArr[y][At] = r[y].volume < 0);
    };
  }

  function WR(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 10,
        color: "#3D85C6",
        prop: "wr1",
        idct: "WR1"
      },
      {
        v: 6,
        color: "#84C84B",
        prop: "wr2",
        idct: "WR2"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "WR"),
      (this.vaObj = {
        min: 0,
        max: 100,
        upper: 80,
        lower: 20
      });
    var s = bt.calcHHV,
      e = bt.calcLLV,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = r[1].v,
        n = h(i, "close"),
        c = h(i, "high"),
        d = h(i, "low"),
        f = o(o(o(s(c, a), n, "-"), 100, "*"), o(s(c, a), e(d, a), "-"), "/"),
        u = o(o(o(s(c, l), n, "-"), 100, "*"), o(s(c, l), e(d, l), "-"), "/");
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var p = 0, v = i.length; v > p; p++)
        this.selfArr[p] = {
          wr1: f[p],
          wr2: u[p]
        };
    };
  }

  function WVAD(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 24,
        color: "#fe6623",
        prop: "wvad",
        idct: "WVAD"
      },
      {
        v: 6,
        color: "#00c1eb",
        prop: "wvadma",
        idct: "WVADMA"
      }
    ]),
      techchart.call(this, i, a),
      (this.name = "WVAD"),
      (this.vaObj = {
        glv: 0
      });
    var s = bt.calcSUM,
      e = bt.calcMA,
      h = bt.operateArr,
      o = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = r[1].v,
        n = o(i, "close"),
        c = o(i, "open"),
        d = o(i, "high"),
        f = o(i, "low"),
        u = o(i, "volume"),
        p = h(s(h(h(h(n, c, "-"), h(d, f, "-"), "/"), u, "*"), a), 1e4, "/"),
        v = e(p, l);
      (this.oriArr = i),
        !this.datas && (this.datas = []),
        utils_util.ca(this.selfArr);
      for (var A = 0, m = i.length; m > A; A++)
        this.selfArr[A] = {
          wvad: p[A],
          wvadma: v[A]
        };
    };
  }

  function VOLUME(i, a) {
    (this.storageVer = "v3"),
      techchart.call(this, i, a, {
        nu: !0
      }),
      (this.name = "VOLUME"),
      (this.alias = "成交");
    var s = this,
      e = "volume",
      h = "MA",
      o = "#888887";
    !(function() {
      var t = function() {
        var t = [
          {
            color: o
          },
          {
            v: 5,
            color: "#FC9CB8"
          },
          {
            v: 10,
            color: "#12BDD9"
          }
        ];
        nt.save({
          uid: [s.cfg.uid, new Date().getTime()].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer,
          value: t
        });
      };
      nt.load(
        {
          uid: [
            s.cfg.uid,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer
        },
        function(i) {
          i || t();
        },
        !0
      );
    })(),
      (this.generateSettings = function() {
        var i = s.name.toLowerCase(),
          r = "MA",
          a = o;
        if (((s.customArr = []), s.param && s.param.length > 0)) {
          a = s.param[0].color || o;
          for (var l = 0, n = s.param.length; n > l; l++) {
            var c = s.param[l].v;
            !isNaN(c) &&
              c > 0 &&
              s.customArr.push({
                v: c,
                color: s.param[l].color || "#" + utils_util.randomColor(),
                prop: i + c,
                idct: r + c,
                desc: h
              });
          }
        }
        s.customArr.reverse(),
          s.customArr.push({
            v: 0 / 0,
            color: a,
            prop: e,
            idct: "VOL"
          }),
          s.customArr.reverse();
      }),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = i),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        for (
          var r = s.name.toLowerCase(),
            a = i.length,
            h = 0,
            o = this.customArr.length;
          o > h;
          h++
        )
          for (var l, n = 0, c = this.customArr[h].v, d = 0; c && a > d; d++) {
            var f = i[d];
            if (((n += Number(f[e])), d >= c - 1)) {
              l = n / c;
              var u = i[d - c + 1];
              n -= Number(u[e]);
            } else l = n / (d + 1);
            var p = (this.selfArr[d] = this.selfArr[d] || {});
            p[r + c] = l;
          }
      }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var i = this.viewState.start, r = this.viewState.end, a = r - i;
            this.datas.length > a;

          )
            this.datas.length--;
          for (; this.datas.length < a; ) this.datas.push({});
          var s,
            e,
            h = -Number.MAX_VALUE,
            o = 0;
          for (s = i; r > s; s++) {
            (e = this.datas[s - i]),
              (e.volume = this.oriArr[s].volume),
              e.volume > h && (h = e.volume);
            for (var l in this.selfArr[s])
              this.selfArr[s].hasOwnProperty(l) &&
                ((e[l] = this.selfArr[s][l]), e[l] > h && (h = e[l]));
          }
          0 > h && (h = 0);
          var n = utils_util.xh5_ADJUST_HIGH_LOW.c(h, o, 0, !0);
          h = n[0];
          var c = h - o;
          for (s = i; r > s; s++) {
            e = this.datas[s - i];
            var d = this.oriArr[s];
            (e.date = d.date),
              (e.kke_cs = d.kke_cs),
              (e.voly = ot.vp(d.volume, h, this.h));
            for (var f = this.customArr.length; f--; ) {
              var u = this.customArr[f].prop;
              e[u + "y"] = (this.h * (h - e[u])) / c;
            }
          }
          (this.labelMaxP = h), (this.labelMinP = o), this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l = this.datas.length,
              n = i.DIMENSION.w_k / Math.max(l, i.PARAM.minCandleNum),
              c = this.h,
              d = 0.6 * n,
              f = "hollow" == i.datas.candle,
              u = 0;
            2 > u;
            u++
          ) {
            (o = 0 == u ? i.COLOR.K_FALL : i.COLOR.K_RISE),
              (s = this.__iOffsetX - n),
              a.beginPath();
            for (var p = 0; l > p; p++)
              (h = this.datas[p]),
                (e = h.voly),
                0 == u
                  ? -1 == h.kke_cs && a.drawVStickRect(s, e, d, c - e, o, !0)
                  : h.kke_cs >= 0 && a.drawVStickRect(s, e, d, c - e, o, !f),
                (s += n);
            a.stroke();
          }
          for (var v = 1, A = this.customArr.length; A > v; v++) {
            var m = this.customArr[v].prop + "y";
            (s = this.__iOffsetX - n * mt),
              a.newStyle(this.customArr[v].color, !0, 1.3);
            for (var g = 0; l > g; g++)
              0 == g
                ? a.moveTo(s, this.datas[g][m])
                : a.lineTo(s, this.datas[g][m]),
                (s += n);
            a.stroke();
          }
          a.drawBg(this.__iOffsetX);
        }
      });
  }

  function TVOL(cfg, at) {
    (this.storageVer = "v2"),
      techchart.call(this, cfg, at, {
        nu: !0
      }),
      (this.name = "TVOL"),
      (this.sname = "T_TVOL"),
      (this.alias = "成交");
    var s = this,
      e = "volume",
      h = "MA",
      o = "#888887";
    !(function() {
      var t = function() {
        var t = [
          {
            color: o
          },
          {
            v: 10,
            color: "#12BDD9"
          }
        ];
        nt.save({
          uid: [s.cfg.uid, new Date().getTime()].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer,
          value: t
        });
      };
      nt.load(
        {
          uid: [
            s.cfg.uid,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer
        },
        function(i) {
          i || t();
        },
        !0
      );
    })(),
      (this.generateSettings = function() {
        var i = s.name.toLowerCase(),
          r = "MA",
          a = o;
        if (((s.customArr = []), s.param && s.param.length > 0)) {
          a = s.param[0].color || o;
          for (var l = 0, n = s.param.length; n > l; l++) {
            var c = s.param[l].v;
            !isNaN(c) &&
              c > 0 &&
              s.customArr.push({
                v: c,
                color: s.param[l].color || "#" + utils_util.randomColor(),
                prop: i + c,
                idct: r + c,
                desc: h
              });
          }
        }
        s.customArr.reverse(),
          s.customArr.push({
            v: 0 / 0,
            color: a,
            prop: e,
            idct: "VOL"
          }),
          s.customArr.reverse();
      }),
      (this.initAndCalcAll = function(i) {
        var r = this.gdsd(i);
        (this.oriArr = r),
          !this.datas && (this.datas = []),
          utils_util.ca(this.selfArr);
        for (
          var a = s.name.toLowerCase(),
            h = r.length,
            o = 0,
            l = this.customArr.length;
          l > o;
          o++
        )
          for (var n, c = 0, d = this.customArr[o].v, f = 0; d && h > f; f++) {
            var u = r[f];
            if (((c += Number(u[e])), f >= d - 1)) {
              n = c / d;
              var p = r[f - d + 1];
              c -= Number(p[e]);
            } else n = c / (f + 1);
            var v = (this.selfArr[f] = this.selfArr[f] || {});
            v[a + d] = n;
          }
      }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var i = this.viewState.start * this.disMod,
              r = this.viewState.end * this.disMod,
              a = r - i;
            this.datas.length > a;

          )
            this.datas.length--;
          for (; this.datas.length < a; ) this.datas.push({});
          var s,
            e,
            h = -Number.MAX_VALUE;
          for (s = i; r > s; s++) {
            (e = this.datas[s - i]),
              (e.volume = this.oriArr[s].volume),
              e.volume > h && (h = e.volume);
            for (var o in this.selfArr[s])
              this.selfArr[s].hasOwnProperty(o) &&
                ((e[o] = this.selfArr[s][o]), e[o] > h && (h = e[o]));
          }
          0 > h && (h = 0);
          var l = utils_util.xh5_ADJUST_HIGH_LOW.c(h, 0, 0, !0);
          h = l[0];
          var n;
          for (s = i; r > s; s++) {
            e = this.datas[s - i];
            var c = this.oriArr[s];
            (n = 0 == s ? c.prevclose || c.price : this.oriArr[s - 1].price),
              (e.kke_cs = c.price > n ? 1 : c.price < n ? -1 : 0),
              (e.price = c.price),
              (e.voly = ot.vp(c.volume, h, this.h)),
              this.h - e.voly < 0.5 &&
                c.volume > 0 &&
                ((e.voly = Math.floor(e.voly)), (e.voly -= 1));
            for (var d = this.customArr.length; d--; ) {
              var f = this.customArr[d].prop;
              e[f + "y"] = (this.h * (h - e[f])) / h;
            }
          }
          (this.labelMaxP = h), (this.labelMinP = 0), this.syncI();
        }
      }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, cfg.PARAM.getHd());
          for (
            var r,
              a,
              s,
              e,
              h = this.datas.length,
              o = cfg.DIMENSION.w_t / h,
              l = this.h,
              n = o * gt,
              c = -1,
              d = 0;
            3 > d;
            d++
          ) {
            switch (c) {
              case -1:
                e = cfg.COLOR.T_FALL;
                break;
              case 0:
                e = cfg.COLOR.T_N;
                break;
              case 1:
                e = cfg.COLOR.T_RISE;
            }
            (r = 0), t.beginPath();
            for (var f = 0; h > f; f++)
              (s = this.datas[f]),
                s.volume >= 0 &&
                  ((a = s.voly),
                  s.kke_cs == c && t.drawVStickC(r, a, n, l - a, e)),
                (r += o);
            t.stroke(), c++;
          }
          for (var u = 1, p = this.customArr.length; p > u; u++) {
            var v = this.customArr[u].prop + "y";
            (r = n), t.newStyle(this.customArr[u].color, !0, 1.3);
            for (var A = 0; h > A; A++)
              (s = this.datas[A]),
                s.volume >= 0 &&
                  (0 == A ? t.moveTo(r, s[v]) : t.lineTo(r, s[v])),
                (r += o);
            t.stroke();
          }
          t.drawBg();
        }
      });
  }

  function pChart(configa) {
    console.log(configa);

    function r() {
      var PCHART_MAP = {
        BBIBOLL: BBIBOLL,
        BOLL: BOLL,
        CHIPCOST: CHIPCOST,
        DITC: DITC,
        EXPMA: EXPMA,
        MA: MA,
        PRESS: Press,
        SAR: SAR,
        TZY: TZY,
        DPDK: DPDK,
        EWI: EWI,
        RGL: RGL,
        TECHFLOW: TECHFLOW
      };
      yt.auth(PCHART_MAP);
      var r = [],
        a = !0,
        e = function() {
          for (; m.length; ) m.length--;
          for (var t = r.length; t--; ) {
            var i = r[t];
            m.push({
              name: i.name,
              param: i.param
            });
          }
        },
        o = function(t) {
          if (a) {
            var i = cfg.datas.isT ? stockData.tDb.get() : stockData.kDb.get();
            i &&
              (t.initAndCalcAll(i, !1),
              t.setRange(),
              t.setPricePos(null),
              t.draw());
          }
        },
        l = function(a) {
          if (a) {
            var s = a.name;
            if (s) {
              s = s.toUpperCase();
              for (var h, l = r.length; l--; )
                if (r[l].name == s) {
                  h = r[l];
                  break;
                }
              if (!h) {
                if (!utils_util.isFunc(PCHART_MAP[s])) return;
                (h = new PCHART_MAP[s](cfg, D, o)),
                  (h.asPChart = !0),
                  r.push(h);
              }
              h.newParam(a.param), e(), yt.doStc(a);
            }
          }
        },
        p = function(t, i) {
          if (t) {
            var a = t.name;
            if (a) {
              a = a.toUpperCase();
              for (var s = r.length; s--; )
                if (r[s].name == a) {
                  var h = r.splice(s, 1)[0];
                  return (
                    h.rfs(),
                    h.getFromToM.reset(h),
                    !i && e(),
                    void yt.doStc(t, !0)
                  );
                }
            }
          }
        },
        v = function() {
          for (var t, i = r.length; i--; ) (t = r[i]), t.clearDraw();
        };
      this.linkData = function(t) {
        if (a) {
          var i = cfg.datas.isT ? stockData.tDb.get() : stockData.kDb.get();
          if (i)
            for (var e, h = r.length; h--; )
              (e = r[h]), e.initAndCalcAll(i, t), t && e.update();
        }
      };
      this.setDataRange = function() {
        if (a)
          for (var t, i = r.length; i--; )
            (t = r[i]), t.setRange(), t.selfDataUrl && t.loadUrlData();
      };
      this.getMaxMin = function() {
        var t = Number.MAX_VALUE,
          i = -Number.MAX_VALUE,
          s = !1;
        if (a)
          for (var e, h = r.length; h--; )
            (e = r[h]),
              e.separate > 0 ||
                isNaN(e.minPrice) ||
                isNaN(e.maxPrice) ||
                ((t = Math.min(e.minPrice, t)),
                (i = Math.max(e.maxPrice, i)),
                (s = !0));
        return s ? [i, t] : !1;
      };
      this.setPricePos = function(t) {
        if (a) for (var i, s = r.length; s--; ) (i = r[s]), i.setPricePos(t);
      };
      this.allDraw = function(t) {
        if (a) for (var i, s = r.length; s--; ) (i = r[s]), i.draw(!1, t);
      };
      this.onResize = function() {
        for (var t, i = r.length; i--; )
          (t = r[i]),
            t.resize({
              h: cfg.DIMENSION.h_k,
              mh: cfg.DIMENSION.H_MA4K
            }),
            a && (t.createPlayingData(), t.draw());
      };
      this.indirectI = function(t, i, s) {
        a || (t = 0 / 0);
        for (var e, h = [], o = r.length; o--; )
          (e = r[o]), h.push(e.interact(t, i, s));
        return h;
      };
      this.getLog = function() {
        return m.reverse() || null;
      };
      this.getExistingCharts = function() {
        return r;
      };
      this.clear = function() {
        for (var t = r.length; t--; ) p(r[t], !0);
      };
      this.createChart = function(i, r) {
        !utils_util.isArr(i) && (i = [i]);
        for (var a = 0, s = i.length; s > a; a++) l(i[a]);
        cb(!0, r);
      };
      this.removeChart = function(i) {
        if (!i) {
          i = [];
          for (var a = r.length; a--; )
            i.push({
              name: r[a].name
            });
        }
        !utils_util.isArr(i) && (i = [i]);
        for (var s = 0, e = i.length; e > s; s++) p(i[s]);
        cb();
      };
      this.showHide = function(t) {
        var i = t.v;
        a !== i && ((a = i), a || v());
      };
    }
    var a,
      stockData = configa.stockData,
      iMgr = configa.iMgr,
      titleArea = configa.titleArea,
      chartArea = configa.chartArea,
      cb = configa.cb,
      cfg = configa.cfg,
      type = configa.type,
      usrObj = configa.usrObj,
      m = [],
      g = {
        edit: function(t) {
          a.createChart(t);
        },
        remove: function(t) {
          a.removeChart(t);
        }
      },
      w = function(i, r) {
        if (cfg.custom.allow_indicator_edit)
          if (tt) {
            tt.sendOriginalData(
              {
                name: i.name,
                data: i.customArr,
                defaultData: i.DEFAULT_ARR
              },
              g
            );
            utils_util.sudaLog();
            tt.show(r);
          } else {
            var a = cfg.custom.indicatorpanel_url;
            usrObj.ssl && (a = utils_util.getSUrl(a, !0));
            tt = new Q(
              {
                url: a,
                z: 10001
              },
              at(w, null, i, r)
            );
          }
      },
      D = {
        stock: stockData,
        cbInDC: cb,
        onClkTT: w,
        ctn: chartArea,
        titleCtn: titleArea,
        titleW: 0 / 0,
        titleGap: 5,
        style: {
          position: "absolute",
          top: 0
        },
        iMgr: iMgr,
        withHBg: !1,
        mh: cfg.DIMENSION.H_MA4K,
        lz: cfg.PARAM.G_Z_INDEX + 1,
        usrObj: usrObj,
        type: type
      };
    return (a = new r());
  }

  function tChart(options) {
    console.log(options);

    function tChart_instance() {
      var allAvailableChartsMap = {
        ASI: ASI,
        BBIBOLL: BBIBOLL,
        BIAS: BIAS,
        BOLL: BOLL,
        BRAR: BRAR,
        CCI: CCI,
        DMA: DMA,
        DMI: DMI,
        DPDK: DPDK,
        DPDKS: DPDKS,
        EMV: EMV,
        EXPMA: EXPMA,
        KDJ: KDJ,
        KFLOW: KFLOW,
        KKFLOW: KKFLOW,
        KGSTRADE: KGSTRADE,
        SUNSPOT: SUNSPOT,
        MA: MA,
        MACD: MACD,
        OBV: OBV,
        PKFLOW: PKFLOW,
        PSY: PSY,
        ROC: ROC,
        RSI: RSI,
        SAR: SAR,
        TRIX: TRIX,
        TZY: TZY,
        TZYS: TZYS,
        VR: VR,
        VOLUME: VOLUME,
        WR: WR,
        WVAD: WVAD,
        TOR: TOR,
        ADL: ADL,
        LB: LB,
        POSITION: POSITION,
        TFLOW: TFLOW,
        TTFLOW: TTFLOW,
        TVOL: TVOL,
        TTOPTRADE: TTOPTRADE,
        BLANKCTN: BLANKCTN
      };
      yt.auth(allAvailableChartsMap);
      var r;
      techChartList = [];
      var o = function() {
          for (; rt.length; ) rt.length--;
          for (var t = techChartList.length; t--; ) {
            var i = techChartList[t];
            rt.push({
              name: i.name,
              param: i.param
            });
          }
        },
        f = function(t) {
          var i = cfg.datas.isT ? stockData.tDb.get() : stockData.kDb.get();
          i && (t.initAndCalcAll(i), t.drawCalc(), t.draw(!0));
        },
        getExistTechChart = function(techName) {
          for (var i, r = techChartList.length; r--; )
            if (techChartList[r].name == techName) {
              i = techChartList[r];
              break;
            }
          return i;
        },
        createChartWhat = function(s) {
          if (s) {
            var techName = s.name;
            if (techName) {
              (techName = techName.toUpperCase()),
                "BLANKCTN" != techName && (ot = techName);
              var h = getExistTechChart(techName);
              if (!h) {
                var chartf = allAvailableChartsMap[techName];
                if (!utils_util.isFunc(chartf)) return;
                chartf === BLANKCTN && r
                  ? ((h = r), (h.wrap.style.display = ""))
                  : ((h = new chartf(cfg, At, f)),
                    chartf === BLANKCTN && (r = h)),
                  techChartList.push(h),
                  subArea.appendChild(h.wrap);
              }
              h.newParam(s.param), o(), yt.doStc(s);
            }
          }
        },
        rmChart = function(t, i) {
          if (t) {
            var r = t.name;
            if (r) {
              r = r.toUpperCase();
              for (var a = techChartList.length; a--; )
                if (techChartList[a].name == r) {
                  var s = techChartList.splice(a, 1)[0];
                  return (
                    s.rfs(),
                    s.getFromToM.reset(s),
                    !i && o(),
                    void yt.doStc(t, !0)
                  );
                }
            }
          }
        };
      this.linkData = function(t) {
        var i = cfg.datas.isT ? stockData.tDb.get() : stockData.kDb.get();
        if (i) {
          let techs_datas = {};
          let symbol;
          techs_datas["kdatas"] = i;
          techs_datas["datas"] = i;
          for (var chart, a = techChartList.length; a--; ) {
            (chart = techChartList[a]), chart.initAndCalcAll(i);
            // t && chart.update();
            techs_datas[chart.name] = chart.datas;
            symbol = chart.symbol;
          }
          window["tech_" + symbol] = techs_datas;
        }
      };
      this.setDataRange = function() {
        for (var t, i = techChartList.length; i--; )
          (t = techChartList[i]),
            t.drawCalc(),
            t.selfDataUrl && t.loadUrlData();
      };
      this.allDraw = function(t) {
        for (var i, r = techChartList.length; r--; )
          (i = techChartList[r]), i.draw(!0, t);
      };
      this.onResize = function(t) {
        for (var i, r, a = techChartList.length; a--; )
          (r = techChartList[a]),
            (i = t ? cfg.DIMENSION.H_T_G : r.h),
            r.resize({
              h: i,
              eh: cfg.DIMENSION.H_T_B
            }),
            r.drawCalc(),
            r.draw(!0);
      };
      this.indirectI = function(t, i, r) {
        for (var a, s = techChartList.length; s--; )
          (a = techChartList[s]), a.interact(t, i, r);
      };
      this.getLog = function() {
        return rt.reverse() || null;
      };
      this.getExistingCharts = function() {
        return techChartList;
      };
      this.clear = function() {
        for (var t = techChartList.length; t--; ) rmChart(techChartList[t], !0);
      };
      this.createChart = function(i, r) {
        !utils_util.isArr(i) && (i = [i]);
        for (var a = 0, s = i.length; s > a; a++) createChartWhat(i[a]);
        cb(!0, r, i);
      };
      this.removeChart = function(i) {
        if (!i) {
          i = [];
          for (var r = techChartList.length; r--; )
            i.push({
              name: techChartList[r].name
            });
        }
        !utils_util.isArr(i) && (i = [i]);
        for (var a = 0, s = i.length; s > a; a++) rmChart(i[a]);
        cb(!0);
      };
    }
    var o,
      f,
      stockData = options.stockData,
      iMgr = options.iMgr,
      subArea = options.subArea,
      cb = options.cb,
      type = options.type,
      cfg = options.cfg,
      usrObj = options.usrObj,
      initMgr = options.initMgr,
      rt = [],
      st = function(i, div, offsetX, offsetY, event) {
        if (
          (!utils_util.$CONTAINS(div, iMgr.iHLineO.body) &&
            div.appendChild(iMgr.iHLineO.body),
          i.datas)
        ) {
          var h = i.labelMaxP - (offsetY / i.h) * (i.labelMaxP - i.labelMinP);
          if (i.nu) {
            var o = utils_util.strUtil.nu(i.labelMaxP);
            h /= o[0];
          }
          iMgr.iToD({
            mark: h,
            x: offsetX,
            y: offsetY,
            ox: cfg.DIMENSION.posX,
            oy: cfg.DIMENSION.H_T_T,
            e: event
          });
        }
      };
    switch (type) {
      case "t":
        var et = usrObj.tchartobject.t;
        f = et || ut;
        break;
      case "p":
        f = ["LB", "POSITION", "TVOL", "MACD"];
        break;
      default:
        var ht = usrObj.tchartobject.k;
        f = ht || ft;
    }
    var ot,
      techChartList,
      nt,
      ct = "BLANKCTN",
      dt = function() {
        if (cfg.custom.tchart_tap && techChartList && ot) {
          var t = techChartList.length;
          if (!(t > 2)) {
            for (var i = t; i--; )
              if (ct == String(techChartList[i].name)) {
                nt = i;
                break;
              }
            if ("undefined" != typeof nt || 2 != t) {
              var r = f.length;
              for (i = r; i--; )
                if (ot == f[i]) {
                  o.removeChart(), ++i >= r && (i = 0);
                  var a = f[i];
                  o.createChart(
                    1 == t
                      ? {
                          name: a
                        }
                      : 0 == nt
                      ? [
                          {
                            name: ct
                          },
                          {
                            name: a
                          }
                        ]
                      : [
                          {
                            name: a
                          },
                          {
                            name: ct
                          }
                        ]
                  );
                  break;
                }
            }
          }
        }
      },
      pt = {
        edit: function(t) {
          o.createChart(t);
        },
        remove: function(t) {
          o.removeChart(t);
        }
      },
      vt = function(i, r) {
        if (cfg.custom.allow_indicator_edit)
          if (tt)
            tt.sendOriginalData(
              {
                name: i.name,
                data: i.customArr,
                defaultData: i.DEFAULT_ARR
              },
              pt
            ),
              tt.show(r),
              utils_util.sudaLog();
          else {
            var a = cfg.custom.indicatorpanel_url;
            usrObj.ssl && (a = utils_util.getSUrl(a, !0)),
              (tt = new Q(
                {
                  url: a,
                  z: 10001
                },
                at(vt, null, i, r)
              ));
          }
      },
      At = {
        fixIdctW: !0,
        stock: stockData,
        iTo: st,
        iMgr: iMgr,
        onClkTT: vt,
        h: cfg.DIMENSION.H_T_G,
        eh: cfg.DIMENSION.H_T_B,
        withHBg: !0,
        onClkMain: dt,
        usrObj: usrObj,
        type: type,
        initMgr: initMgr
      };
    return (o = new tChart_instance());
  }

  function Q(i, r) {
    function a(t, i) {
      for (var r in t) t.hasOwnProperty(r) && (t[r] = i + t[r]);
    }
    var s = "sinafinancehtml5indicatorscfgpanel",
      e = "sinatkchart_indicatorscfgpanel~",
      h = {
        LOADED: "loaded",
        HIDE: "hide",
        REMOVE: "remove",
        EDIT: "edit",
        DRAGSTART: "dragstart",
        DRAGGING: "dragging",
        PICKCOLOR: "pickcolor",
        COLORPICKED: "colorpicked",
        OPEN: "open"
      };
    a(h, e);
    var o,
      l,
      n,
      c,
      d = 250,
      f = 0,
      u = 80,
      p = 35,
      v = 25;
    ct &&
      (ct.onok = function(t, i) {
        o &&
          o.contentWindow &&
          o.contentWindow.postMessage(
            JSON.stringify({
              cmd: h.COLORPICKED,
              data: {
                color: t.hex,
                target: i
              }
            }),
            "*"
          );
      });
    var A = function(t) {
        var i;
        try {
          i = JSON.parse(t.data);
        } catch (t) {}
        if (i && i.cmd)
          switch (i.cmd) {
            case h.LOADED:
              r && r();
              break;
            case h.HIDE:
              (o.style.display = "none"), ct && ct.hide();
              break;
            case h.REMOVE:
            case h.EDIT:
              var a = i.cmd.split("~")[1];
              l[a](i.data), ct && ct.hide();
              break;
            case h.DRAGSTART:
              (n = +o.style.left.replace(/[^0-9.]/g, "")),
                (c = +o.style.top.replace(/[^0-9.]/g, ""));
              break;
            case h.DRAGGING:
              var s = i.data;
              (o.style.left = n + s.movedX + "px"),
                (o.style.top = c + s.movedY + "px");
              break;
            case h.PICKCOLOR:
              (s = i.data),
                ct &&
                  ct.show(
                    +s.x + +o.style.left.replace(/[^0-9.]/g, ""),
                    +s.y + +o.style.top.replace(/[^0-9.]/g, ""),
                    s.target,
                    s.color
                  );
          }
      },
      m = function() {
        o ||
          ((o = utils_util.iframer({
            attribute: {
              id: s,
              src: i.url
            },
            style: {
              margin: "0 auto",
              width: d + "px",
              border: "1px solid #aaa",
              position: "absolute",
              zIndex: i.z
            }
          })),
          st.addHandler(window, "message", A));
      };
    (this.sendOriginalData = function(i, r) {
      if (o) {
        l = r;
        var a = Math.min(i.data.length || 1, 5);
        switch (((f = u + p * a), i.name)) {
          case "MA":
          case "VOLUME":
          case "TVOL":
          case "EXPMA":
            f += v;
        }
        (o.style.height = f + "px"),
          o.contentWindow &&
            o.contentWindow.postMessage(
              JSON.stringify({
                cmd: h.OPEN,
                data: i
              }),
              "*"
            ),
          utils_util.stc(["inc", i.name].join("_"));
      }
    }),
      (this.show = function(i) {
        if (o) {
          var r, a;
          i.changedTouches
            ? ((r = i.changedTouches[0].clientX),
              (a = i.changedTouches[0].clientY))
            : ((r = i.clientX), (a = i.clientY));
          var s =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight,
            e =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
          a + f + 30 > s && (a = Math.max(s - f - 30, 1)),
            r + d + 3 > e && (r = 28),
            (o.style.left = r + "px"),
            (o.style.top =
              (document.body.scrollTop
                ? document.body.scrollTop
                : document.documentElement.scrollTop) +
              a +
              "px"),
            (o.style.display = ""),
            utils_util.suda("show_indicator_param");
        }
      }),
      m();
  }
  var tt,
    it = utils_util.oc,
    rt = utils_util.$C,
    at = utils_util.fBind,
    st = utils_util.xh5_EvtUtil,
    et = utils_painter.xh5_ibPainter,
    ht = utils_painter.xh5_Canvas,
    ot = utils_util.xh5_PosUtil,
    lt = utils_util.dateUtil,
    nt = utils_util.bridge,
    ct = utils_util.colorPicker,
    dt = utils_util.HQ_DOMAIN,
    ft = [
      "VOLUME",
      "MACD",
      "KDJ",
      "RSI",
      "BOLL",
      "WR",
      "BBIBOLL",
      "SAR",
      "DMI",
      "EMV",
      "ROC",
      "PSY",
      "OBV",
      "WVAD",
      "CCI",
      "TRIX",
      "DMA",
      "EXPMA",
      "BIAS",
      "ASI",
      "VR",
      "BRAR"
    ],
    ut = [
      "TVOL",
      "LB",
      "MACD",
      "BOLL",
      "RSI",
      "BBIBOLL",
      "ROC",
      "TRIX",
      "DMA",
      "EXPMA",
      "BIAS",
      "VR"
    ],
    pt = {},
    vt = "ignore_",
    At = vt + "istpre",
    mt = 0.4,
    gt = 0.5;
  (techchart.prototype = {
    storageVer: "v1",
    STORAGE_PREFIX: "sinatkchart_indicators~",
    loadGlobalSetting: function() {
      var t = this;
      nt.load(
        {
          uid: [
            this.cfg.uid,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key:
            this.STORAGE_PREFIX +
            (this.sname || this.name) +
            "_" +
            this.storageVer
        },
        function(i) {
          if (i) {
            var r;
            try {
              r = JSON.parse(i);
            } catch (a) {}
            r && t.newParam(r, !0);
          }
        },
        !0
      );
    },
    saveGlobalSetting: function(t) {
      nt.save({
        uid: [this.cfg.uid, new Date().getTime()].join("|"),
        key:
          this.STORAGE_PREFIX +
          (this.sname || this.name) +
          "_" +
          this.storageVer,
        value: t
      });
    },
    gdsd: function(datasArr) {
      var i;
      if ("k" === this.proxyCfg.type)
        (this.disMod = 1), (this.tkProp.close = "close"), (i = datasArr);
      else {
        (this.disMod = this.cfg.datas.tDataLen),
          (this.tkProp.close = "price"),
          (i = []);
        for (var r = 0, a = datasArr.length; a > r; r++)
          i = i.concat(datasArr[r]);
      }
      return i;
    }
  }),
    (techchart.prototype.mr = function() {
      function i(t) {
        var i = s.h - t;
        if (i >= 0) {
          var r =
            "t" === s.proxyCfg.type ? s.cfg.DIMENSION.h_t : s.cfg.DIMENSION.h_k;
          if (1 > r + t) return;
          (s.h = i), e(t);
        }
      }

      function r() {
        var t = rt("span");
        return (
          (t.style.display = "block"),
          (t.style.cursor = "row-resize"),
          (t.style.borderTop = "2px dotted #000"),
          (t.style.borderBottom = "2px dotted #000"),
          (t.style.width = "77px"),
          (t.style.height = "2px"),
          t
        );
      }
      var a,
        s = this,
        e = this.proxyCfg.initMgr.innerResize,
        h = 0.1,
        o = 40,
        l = void 0,
        n = function(t) {
          st.preventDefault(t);
          var r = t.changedTouches ? t.changedTouches[0].pageY : t.pageY;
          isNaN(r) && (r = t.offsetY);
          var s = r - a;
          (a = r), s && i(s);
        },
        c = function() {
          st.removeHandler(window, "mousemove", n),
            st.removeHandler(window, "mouseup", c),
            st.removeHandler(l, "touchmove", n),
            st.removeHandler(l, "touchend", c),
            utils_util.suda("indicator_reheight");
        },
        d = function(i) {
          (a = isNaN(i.pageY) ? i.offsetY : i.pageY),
            utils_util.xh5_deviceUtil.istd
              ? (st.addHandler(l, "touchend", c),
                st.addHandler(l, "touchmove", n))
              : (st.addHandler(window, "mouseup", c),
                st.addHandler(window, "mousemove", n),
                utils_util.xh5_deviceUtil.allowt &&
                  (st.addHandler(l, "touchend", c),
                  st.addHandler(l, "touchmove", n)));
        },
        f = function() {
          (l = rt("div")),
            (l.style.position = "absolute"),
            (l.style.right = s.cfg.DIMENSION.K_RIGHT_W + o + "px"),
            (l.style.color = "#000"),
            (l.style.opacity = h),
            (l.style.zIndex = s.cfg.PARAM.I_Z_INDEX + 2),
            (l.style.paddingTop = "3px"),
            utils_util.xh5_deviceUtil.istd
              ? st.addHandler(l, "touchstart", d)
              : (st.addHandler(l, "mousedown", d),
                utils_util.xh5_deviceUtil.allowt &&
                  st.addHandler(l, "touchstart", d),
                st.addHandler(l, "mouseover", function() {
                  l.style.opacity = 1;
                }),
                st.addHandler(l, "mouseout", function() {
                  l.style.opacity = h;
                }));
        },
        u = function() {
          var t = new r();
          l.appendChild(t);
        };
      return f(), u(), l;
    }),
    (techchart.prototype.rab = function() {
      function i(t) {
        var i = a.wrap,
          r = a.wrap.parentNode,
          s = n(i, t);
        s && ("-1" == t ? r.insertBefore(i, s) : r.insertBefore(s, i));
      }

      function r(t) {
        var i = rt("span");
        return (
          (i.style.marginLeft = a.cfg.DIMENSION.K_RIGHT_W + "px"),
          (i.style.cursor = "pointer"),
          (i.innerHTML = t ? "▲" : "▼"),
          i.setAttribute("data-dir", t ? "-1" : "1"),
          i
        );
      }
      var a = this,
        s = 0.1,
        e = void 0,
        h = function(t) {
          st.preventDefault(t);
          var r = t.target;
          if (r) {
            var a = r.getAttribute("data-dir");
            null !== a && i(a);
          }
        },
        o = function() {
          (e = rt("div")),
            (e.style.position = "absolute"),
            (e.style.right = a.cfg.DIMENSION.K_RIGHT_W + "px"),
            (e.style.color = "#000"),
            (e.style.opacity = s),
            (e.style.zIndex = a.cfg.PARAM.I_Z_INDEX + 2),
            utils_util.xh5_deviceUtil.istd
              ? st.addHandler(e, "touchend", h)
              : (st.addHandler(e, "click", h),
                utils_util.xh5_deviceUtil.allowt &&
                  st.addHandler(e, "touchend", h),
                st.addHandler(e, "mouseover", function() {
                  e.style.opacity = 1;
                }),
                st.addHandler(e, "mouseout", function() {
                  e.style.opacity = s;
                }));
        },
        l = function() {
          var t = new r(!0),
            i = new r();
          e.appendChild(t), e.appendChild(i);
        },
        n = function(t, i) {
          var r;
          return (
            (r = -1 == i ? t.previousSibling : t.nextSibling),
            r && 0 == r.id.indexOf("blankctn_") && (r = null),
            r
          );
        };
      return o(), l(), e;
    }),
    (techchart.prototype.ic = function(i) {
      var r = this.proxyCfg.iTo;
      (this.h = isNaN(i.h) ? this.cfg.DIMENSION.h_k : i.h),
        (this.customArr = utils_util.clone(this.DEFAULT_ARR, null)),
        (this.wrap = rt("div")),
        this.selfCfg.ctnId && (this.wrap.id = this.selfCfg.ctnId),
        (this.wrap.style.fontSize = this.wrap.style.lineHeight =
          this.cfg.STYLE.FONT_SIZE + "px");
      for (var a in this.proxyCfg.style)
        this.proxyCfg.style.hasOwnProperty(a) &&
          (this.wrap.style[a] = this.proxyCfg.style[a]);
      if (this.proxyCfg.titleCtn) this.titleCtn = this.proxyCfg.titleCtn;
      else if (!this.isBlank) {
        (this.titleCtn = rt("div")),
          (this.titleCtn.style.position = "absolute"),
          (this.titleCtn.style.zIndex = this.cfg.PARAM.I_Z_INDEX + 1);
        var s = this;
        if (
          (st.addHandler(this.titleCtn, "touchstart", function(t) {
            s.cfg.custom.touch_prevent && st.preventDefault(t);
          }),
          (this.titleCtn.style.width = "100%"),
          !this.cfg.PARAM.isFlash)
        ) {
          if (this.cfg.custom.indicator_reorder) {
            var e = this.rab();
            this.titleCtn.appendChild(e);
          }
          if (this.cfg.custom.indicator_reheight) {
            var h = this.mr();
            this.titleCtn.appendChild(h);
          }
        }
        this.wrap.appendChild(this.titleCtn);
      }
      this.isBlank
        ? (this.wrap.style.height = this.h + "px")
        : ((this.line = new et({
            setting: this.cfg,
            sd: this,
            withHBg: this.proxyCfg.withHBg,
            reO: {
              h: this.h,
              mh: this.mh,
              eh: this.eh
            },
            nu: this.nu,
            dt: !1,
            iMgr: this.proxyCfg.iMgr,
            iTo: at(r, null, this),
            iClk: this.proxyCfg.onClkMain
          })),
          !isNaN(this.proxyCfg.lz) &&
            (this.line.getCanvas().style.zIndex = this.proxyCfg.lz),
          this.wrap.appendChild(this.line.getWrap())),
        this.proxyCfg.ctn && this.proxyCfg.ctn.appendChild(this.wrap);
    }),
    (techchart.prototype.initAndCalcAll = function() {}),
    (techchart.prototype.resize = function(t) {
      (this.h = t.h),
        (this.mh = t.mh),
        (this.eh = t.eh),
        this.line &&
          this.line.resize({
            h: this.h,
            mh: this.mh,
            eh: this.eh
          });
    }),
    (techchart.prototype.getFromToM = new (function() {
      (this.reset = function(t) {
        var i = t.loadedFlag;
        if (i)
          for (var r in i) i.hasOwnProperty(r) && ((i[r] = null), delete i[r]);
        t.loadedFromTo = void 0;
      }),
        (this.get = function(t) {
          if (!t.viewState.startDate || !t.viewState.endDate) return !1;
          var i = t.loadedFlag,
            r = t.loadedFromTo,
            a = 1989,
            s = 2099;
          if (r) {
            if (a >= r[0]) return;
            s = r[0];
          }
          t.loadedFromTo = [a, s];
          var e = i["_" + a],
            h = i["_" + s];
          if (e && h) return !1;
          for (
            h ? (s -= 1) : e && (a += 1),
              e = [a, "01", "01"].join("-"),
              h = [s, "12", "31"].join("-");
            s >= a;

          )
            i["_" + a++] = !0;
          return [e, h];
        });
    })()),
    (techchart.prototype.loadUrlData = function() {
      var i = this.getFromToM.get(this);
      if (i) {
        var r = i[0],
          a = i[1],
          s = this.aliasymbol || this.symbol,
          e = "_" + s + "_" + new Date().getDate(),
          h = this.selfDataUrl
            .replace("$symbol", s)
            .replace("$cb", "var%20" + e + "=")
            .replace("$from", r)
            .replace("$to", a);
        this.proxyCfg.usrObj.ssl && (h = utils_util.getSUrl(h, !0));
        var o = this;
        utils_util.load(h, function() {
          var i = window[e];
          (window[e] = null),
            o.urlData ||
              (o.urlData = {
                day: [],
                week: [],
                month: []
              });
          var r = o.df(i),
            a = o.urlData.day;
          if (a.length > 1) {
            for (
              var s = a[0].date, h = r.length;
              h-- &&
              !(
                r[h].date.getFullYear() == s.getFullYear() &&
                r[h].date.getMonth() == s.getMonth() &&
                r[h].date.getDate() < s.getDate()
              );

            );
            r.splice(h + 1, r.length - h - 1);
          }
          a.splice.apply(a, [0, 0].concat(r));
          var l,
            n,
            c = [],
            d = [],
            f = a.length,
            u = a[0],
            p = {},
            v = {},
            A = {};
          for (l = o.customArr.length; l--; ) A[o.customArr[l].prop] = void 0;
          A.date = void 0;
          for (n in A)
            A.hasOwnProperty(n) &&
              (utils_util.isDate(u[n])
                ? ((p[n] = u[n]), (v[n] = u[n]))
                : ((p[n] = 1 * u[n]), (v[n] = 1 * u[n])));
          if (1 == f) c.push(p), d.push(v);
          else {
            for (l = 1; f > l; l++) {
              (u = a[l]), lt.gw(a[l - 1].date, u.date) || (c.push(p), (p = {}));
              for (n in A)
                A.hasOwnProperty(n) &&
                  (p[n] = utils_util.isDate(u[n])
                    ? u[n]
                    : (1 * p[n] || 0) + 1 * u[n]);
              lt.gm(a[l - 1].date, u.date) || (d.push(v), (v = {}));
              for (n in A)
                A.hasOwnProperty(n) &&
                  (v[n] = utils_util.isDate(u[n])
                    ? u[n]
                    : (1 * v[n] || 0) + 1 * u[n]);
            }
            c.push(p), d.push(v);
          }
          (o.urlData.week = c),
            (o.urlData.month = d),
            (o.toReCalc = !0),
            o.cb(o);
        });
      }
    }),
    (techchart.prototype.newData = function(t, i, r) {
      if (t && !(t.length < 1)) {
        var a = t[t.length - 1];
        if (
          (168 == r && lt.gw(a.date, i.date)) ||
          (720 == r && lt.gm(a.date, i.date))
        )
          return void (a.date = i.date);
        for (var s, e = {}, h = this.customArr.length; h--; )
          (s = this.customArr[h].prop), (e[s] = i[s] || 0);
        (e.date = i.date), t.push(e);
      }
    }),
    (techchart.prototype.updateData = function(i, r, a, s) {
      if (r && !(r.length < 1)) {
        var e = r[r.length - 1];
        if (s) {
          if (!lt.stbd(e.date, i.date))
            return i.date > e.date ? void this.newData(r, i, a) : void 0;
          if (!utils_util.kUtil.spk(e.time, i.time, "00:00", a))
            return void this.newData(r, i, a);
        } else if (!lt.stbd(i.date, e.date))
          return i.date > e.date ? void this.newData(r, i, a) : void 0;
        e = r[r.length - 1];
        for (var h, o = this.customArr.length; o--; ) {
          h = this.customArr[o].prop;
          var l = Number(i[h]);
          if (utils_util.isNum(i[h]))
            switch (a) {
              case 167:
              case 168:
              case 169:
              case 719:
              case 720:
              case 721:
                e[h] += i[h + "update"] || 0;
                break;
              default:
                e[h] = l;
            }
        }
      }
    }),
    (techchart.prototype.doUpdate = function(t) {
      t &&
        this.urlData &&
        (this.urlData.day && this.updateData(t, this.urlData.day, 24),
        this.urlData.week && this.updateData(t, this.urlData.week, 168),
        this.urlData.month && this.updateData(t, this.urlData.month, 720),
        (this.toReCalc = !0),
        this.cb(this));
    }),
    (techchart.prototype.udf = function(t) {
      return t;
    }),
    (techchart.prototype.update = function() {
      if (
        this.selfDataUrlUpdate &&
        !(++this.updateCount < this.UPDATE_THRESHOLD)
      ) {
        this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
        var i = lt.ddt(this.viewState.startDate).getFullYear(),
          r = lt.ddt(this.viewState.endDate).getFullYear(),
          a = [i, 1, 1].join("-"),
          s = [r, 12, 31].join("-"),
          e = this.aliasymbol || this.symbol,
          h = "_" + e + new Date().getTime(),
          o = this.selfDataUrlUpdate
            .replace("$symbol", e)
            .replace("$cb", "var%20" + h + "=")
            .replace("$from", a)
            .replace("$to", s);
        this.proxyCfg.usrObj.ssl && (o = utils_util.getSUrl(o, !0));
        var l = this;
        utils_util.load(o, function() {
          var t = window[h];
          window[h] = null;
          var i = l.udf(t);
          i && l.doUpdate(i);
        });
      }
    }),
    (techchart.prototype.createPlayingData = function() {
      if (this.datas)
        for (
          var t,
            i = this.labelMaxP - this.labelMinP,
            r = 0,
            a = this.datas.length;
          a > r;
          r++
        ) {
          t = this.datas[r];
          for (var s = this.customArr.length; s--; ) {
            var e = this.customArr[s].prop;
            t[e + "y"] = (this.h * (this.labelMaxP - t[e])) / i;
          }
        }
    }),
    (techchart.prototype.setPricePos = function(t) {
      !t || this.separate > 0
        ? ((this.labelMinP = this.minPrice), (this.labelMaxP = this.maxPrice))
        : ((this.labelMaxP = t[0]),
          (this.labelMinP = t[1]),
          (this.pricePosArr = t)),
        this.createPlayingData();
    }),
    (techchart.prototype.generateSettings = function() {
      if (this.param && this.param.length > 0)
        for (
          var i = 0, r = Math.min(this.param.length, this.DEFAULT_ARR.length);
          r > i;
          i++
        ) {
          var a = this.param[i],
            s = Number(a.v);
          (this.customArr[i].v = s > 0 ? s : this.DEFAULT_ARR[i].v),
            (this.customArr[i].color = utils_util.isColor(a.color)
              ? a.color
              : this.DEFAULT_ARR[i].color);
        }
    }),
    (techchart.prototype.newParam = function(i, r) {
      var a = this.sname || this.name,
        s = !1;
      if (
        (i
          ? ((pt[a] = i), utils_util.stc("np_" + a, i))
          : ((s = !0), (i = pt[a])),
        (this.param = i),
        this.generateSettings(),
        this.genIndicator(
          this.customArr,
          this.asPChart ? "" : this.alias || this.name
        ),
        r)
      ) {
        var e = this.cfg.datas.isT
          ? this.proxyCfg.stock.tDb.get()
          : this.proxyCfg.stock.kDb.get();
        return void (
          e &&
          (this.initAndCalcAll(e),
          this.asPChart ? this.setPricePos(this.pricePosArr) : this.drawCalc(),
          this.draw(!0))
        );
      }
      if (this.cfg.custom.storage_lv > 0)
        if (i) {
          if (s) return;
          this.cfg.custom.storage_lv > 1 && this.saveGlobalSetting(i);
        } else this.loadGlobalSetting();
    }),
    (techchart.prototype.syncI = function() {
      if (this.datas && this.proxyCfg.iMgr)
        if (this.proxyCfg.iMgr.isIng())
          this.proxyCfg.iMgr.isMoving() &&
            this.indicatorI(this.datas[this.datas.length - 1]);
        else if ("t" != this.proxyCfg.type)
          this.indicatorI(this.datas[this.datas.length - 1]);
        else if (this.proxyCfg.stock)
          if (5 == this.proxyCfg.stock.viewState.end) {
            var t;
            (t =
              this.proxyCfg.stock.realLen >= 0
                ? this.proxyCfg.stock.realLen >= this.disMod
                  ? 0 == this.proxyCfg.stock.realLen
                    ? 0
                    : this.proxyCfg.stock.realLen - 1
                  : this.proxyCfg.stock.realLen
                : this.disMod - 1),
              4 != this.proxyCfg.stock.viewState.start &&
                (t =
                  (this.proxyCfg.stock.viewState.end -
                    this.proxyCfg.stock.viewState.start -
                    1) *
                    this.disMod +
                  t),
              this.indicatorI(this.datas[t]);
          } else this.indicatorI(this.datas[this.datas.length - 1]);
    }),
    (techchart.prototype.setRange = function() {
      if (this.datas) {
        for (
          var t = this.viewState.start * this.disMod,
            i = this.viewState.end * this.disMod,
            r = i - t;
          this.datas.length > r;

        )
          this.datas.length--;
        for (; this.datas.length < r; ) this.datas.push({});
        for (
          var a = Number.MAX_VALUE, s = -Number.MAX_VALUE, e = t;
          i > e;
          e++
        ) {
          var h = this.datas[e - t];
          if (
            ((h.date = this.oriArr[e].date),
            !this.selfArr[e] || !this.selfArr[e][At])
          )
            for (var o in this.selfArr[e])
              if (this.selfArr[e].hasOwnProperty(o)) {
                if (((h[o] = this.selfArr[e][o]), 0 == o.indexOf(vt))) continue;
                h[o] > s && (s = h[o]), h[o] < a && (a = h[o]);
              }
        }
        (this.minPrice = a), (this.maxPrice = s), this.syncI();
      }
    }),
    (techchart.prototype.drawCalc = function() {
      if (this.datas) {
        for (
          var t = this.viewState.start * this.disMod,
            i = this.viewState.end * this.disMod,
            r = i - t;
          this.datas.length > r;

        )
          this.datas.length--;
        for (; this.datas.length < r; ) this.datas.push({});
        var a,
          s,
          e = Number.MAX_VALUE,
          h = -Number.MAX_VALUE;
        for (a = t; i > a; a++)
          if (
            ((s = this.datas[a - t]),
            (s.date = this.oriArr[a].date),
            !this.selfArr[a] || !this.selfArr[a][At])
          )
            for (var o in this.selfArr[a])
              if (this.selfArr[a].hasOwnProperty(o)) {
                if (((s[o] = this.selfArr[a][o]), 0 == o.indexOf(vt))) continue;
                s[o] > h && (h = s[o]), s[o] < e && (e = s[o]);
              }
        switch (this.name) {
          case "ADL":
          case "MACD":
            (h = Math.max(Math.abs(h), Math.abs(e))), (e = -h);
            break;
          case "BIAS":
          case "BRAR":
          case "DMA":
          case "EMV":
          case "KDJ":
          case "ROC":
          case "VR":
          case "WVAD":
            (this.vaObj.min = e), (this.vaObj.max = h);
            break;
          case "CCI":
            e > 0 && (e = 0),
              0 > h && (h = 0),
              (this.vaObj.min = e),
              (this.vaObj.max = h);
            break;
          case "TOR":
            e = 0;
            break;
          default:
            this.vaObj && ((h = this.vaObj.max), (e = this.vaObj.min));
        }
        (this.labelMaxP = h), (this.labelMinP = e);
        var l = h - e;
        for (a = 0; r > a; a++) {
          s = this.datas[a];
          for (var n = this.customArr.length; n--; ) {
            var c = this.customArr[n].prop;
            s[c + "y"] = (this.h * (h - s[c])) / l;
          }
        }
        this.syncI();
      }
    }),
    (techchart.prototype.clearDraw = function() {
      this.line.clear(!1), this.interact(0 / 0);
    }),
    (techchart.prototype.draw = function(t, i) {
      if (((this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i), this.datas)) {
        this.line.clear(!0, this.cfg.PARAM.getHd());
        var r,
          a,
          s = this.datas.length;
        this.cfg.datas.isT
          ? ((r = this.cfg.DIMENSION.w_t / s), (a = r * gt))
          : ((r =
              this.cfg.DIMENSION.w_k /
              Math.max(s, this.cfg.PARAM.minCandleNum)),
            (a = this.__iOffsetX - r * mt));
        for (var e, h = this.customArr.length; h--; ) {
          var o = this.customArr[h].prop + "y";
          (e = a), this.line.newStyle(this.customArr[h].color, !0, this.lw);
          for (var l = 0; s > l; l++)
            0 == l
              ? this.line.moveTo(e, this.datas[l][o])
              : this.line.lineTo(e, this.datas[l][o]),
              (e += r);
          this.line.stroke();
        }
        t && this.line.drawBg(this.__iOffsetX),
          this.vaObj && this.drawValueRange();
      }
    }),
    (techchart.prototype.drawValueRange = function() {
      var i = this.line.getG();
      i.globalCompositeOperation = "destination-over";
      var r = this.vaObj.min,
        a = this.vaObj.max,
        s = a - r;
      if (!isNaN(this.vaObj.upper) && !isNaN(this.vaObj.lower)) {
        var e = this.vaObj.upper,
          h = this.vaObj.lower,
          o = (this.h * (a - e)) / s,
          l = (this.h * (a - h)) / s,
          n = l - o;
        (i.fillStyle = utils_util.hex2dec(this.customArr[0].color, 0.2)),
          i.fillRect(0, o, this.cfg.DIMENSION.w_k, n);
      }
      var c =
        (this.h * (isNaN(this.vaObj.glv) ? a / 2 : a - this.vaObj.glv)) / s;
      (c += 0.5),
        this.line.newStyle(this.cfg.COLOR.GRID, !0, 1),
        this.line.moveTo(0, c),
        this.line.lineTo(this.cfg.DIMENSION.w_k, c),
        i.stroke();
    }),
    (techchart.prototype.genIdctParam = function(t) {
      t = t || {};
      var i = isNaN(t.width)
          ? this.proxyCfg.titleW || this.cfg.DIMENSION.getStageW()
          : t.width,
        r = isNaN(t.height) ? this.cfg.DIMENSION.H_T_T || 14 : t.height;
      return {
        hd: this.cfg.PARAM.getHd(),
        width: i,
        height: r
      };
    }),
    (techchart.prototype.genTitleCanvas = function(i) {
      function r() {
        var r = new ht(),
          a = r.g,
          o = s.cfg.datas.isT;
        if (((this.canvas = r.canvas), utils_util.isFunc(s.proxyCfg.onClkTT))) {
          var l = utils_util.xh5_deviceUtil.istd ? "touchend" : "click";
          st.addHandler(this.canvas, l, at(s.proxyCfg.onClkTT, null, s));
          var n = this.canvas.style;
          (n.cursor = "pointer"),
            (n.position = "relative"),
            (n.zIndex = s.cfg.PARAM.I_Z_INDEX + 1);
        }
        var c = function(t, i) {
            r.resize(
              s.genIdctParam({
                width: t,
                height: i
              })
            ),
              (a.font =
                s.cfg.STYLE.FONT_SIZE + "px " + s.cfg.STYLE.FONT_FAMILY),
              (a.textBaseline = "top");
          },
          d = 9,
          f = 13,
          u = 2;
        (this.setTxt = function(r) {
          var l = s.cfg.DIMENSION.posX,
            n = o ? s.cfg.DIMENSION.w_t : s.cfg.DIMENSION.w_k,
            p = s.cfg.DIMENSION.extend_draw,
            v = a.measureText(i).width,
            A = s.cfg.DIMENSION.getStageW(),
            m = 0.35 * A,
            g = "TFLOW" == s.name && 400 > n ? 55 : 80,
            b = s.cfg.DIMENSION.H_T_T;
          u > b && (b = 14);
          var y = 1;
          if (r) {
            for (
              var _, w, D, M = l + (v > 0 ? d : 0), O = [], S = r.length, T = 0;
              S > T;
              T++
            )
              if (((_ = r[T]), _.t || !isNaN(_.n))) {
                switch (
                  ((w =
                    (_.t ? _.t + ": " : "") +
                    (isNaN(_.n) ? "--" : utils_util.strUtil.ps(_.n, h.nfloat))),
                  s.name)
                ) {
                  case "TFLOW":
                    T == r.length - 1 && (w += "元");
                    break;
                  case "TZY":
                  case "TZYS":
                    w += "%";
                }
                (D = e
                  ? Math.max(g, a.measureText(w).width || 0)
                  : a.measureText(w).width || 0),
                  O.push({
                    str: w,
                    w: D,
                    color: _.c
                  }),
                  (M += D + f);
              }
            M -= f;
            var N = Math.ceil(M / n);
            N > S && (N = S),
              N > 1 ? ((b *= N), (M = A)) : (M = Math.floor(Math.max(M, m))),
              (M = Math.min(A, M));
            var I;
            p
              ? ((I = l),
                s.cfg.DIMENSION.H_T_T < u && (I += s.cfg.DIMENSION.W_T_L),
                c(M, b))
              : (c(M, b),
                s.cfg.DIMENSION.H_T_T > u - 1 &&
                  ((a.textAlign = "right"),
                  (a.fillStyle = s.cfg.COLOR.T_T),
                  a.fillText(i, l, y)),
                (I = l + (v > 0 ? d : 0))),
              (a.textAlign = "left");
            for (
              var C = I, R = 0, k = O.length;
              k > R &&
              ((_ = O[R]),
              (a.fillStyle = _.color),
              a.fillText(_.str, I, y),
              (I += _.w + f),
              !(R >= k - 1));
              R++
            )
              I - l + O[R + 1].w > n && ((y += s.cfg.STYLE.FONT_SIZE), (I = C));
          } else
            s.cfg.DIMENSION.H_T_T < u && (l += s.cfg.DIMENSION.W_T_L),
              c(l, b),
              (a.fillStyle = s.cfg.COLOR.T_T),
              (a.textAlign = p ? "left" : "right"),
              a.fillText(i, l, y);
        }),
          this.setTxt();
      }

      function a() {
        var r = rt("div");
        this.canvas = r;
        var a = rt("div");
        (a.style.cssFloat = "left"),
          (a.style.textAlign = "right"),
          (a.style.marginRight = "9px"),
          (a.style.overflow = "hidden");
        var e = rt("div");
        r.appendChild(a), r.appendChild(e);
        var o = r.style;
        utils_util.isFunc(s.proxyCfg.onClkTT) &&
          (utils_util.xh5_deviceUtil.istd
            ? st.addHandler(r, "click", at(s.proxyCfg.onClkTT, null, s))
            : (st.addHandler(r, "click", at(s.proxyCfg.onClkTT, null, s)),
              utils_util.xh5_deviceUtil.allowt &&
                st.addHandler(r, "touchend", at(s.proxyCfg.onClkTT, null, s))),
          (o.cursor = "pointer"),
          (o.position = "relative"),
          (o.zIndex = s.cfg.PARAM.I_Z_INDEX + 1));
        var l = s.cfg.datas.isT;
        (this.setTxt = function(r) {
          var n = l ? s.cfg.DIMENSION.w_t : s.cfg.DIMENSION.w_k,
            c = "TFLOW" == s.name ? 400 : 350,
            d = c > n ? 55 : 80,
            f = s.cfg.DIMENSION.extend_draw;
          (a.style.width = e.style.marginLeft = s.cfg.DIMENSION.posX + "px"),
            (o.color = s.cfg.COLOR.T_T),
            (o.fontSize = s.cfg.STYLE.FONT_SIZE + "px"),
            (o.fontFamily = s.cfg.STYLE.FONT_FAMILY);
          var u = i || "";
          if (r) {
            f
              ? ((a.innerHTML = ""),
                s.cfg.DIMENSION.H_T_T < 2 && (e.style.marginLeft = "50px"))
              : (a.innerHTML = s.cfg.DIMENSION.H_T_T > 1 ? u : ""),
              (e.innerHTML = "");
            for (var p, v, A, m = 0, g = r.length; g > m; m++)
              if (((v = r[m]), v.t || !isNaN(v.n))) {
                switch (s.name) {
                  case "DPDK":
                  case "TZY":
                    return;
                  case "TZYS":
                  case "DPDKS":
                  case "SAR":
                    if ("SAR" == s.name) {
                      if (!s.asPChart && "SAR" != v.t) continue;
                    } else if ("DPDKS" == s.name && "mn" == v.t) continue;
                    var b = "<span style='color:#000;'>--";
                    switch (v.t) {
                      case "SAR":
                        b += "</span>";
                        break;
                      default:
                        b += "%</span>";
                    }
                    if (((A = (v.t ? v.t + ": " : "") + b), !isNaN(v.n))) {
                      A = A.replace("--", utils_util.strUtil.ps(v.n, h.nfloat));
                      var y;
                      (y =
                        "DPDK" == s.name || "SAR" == v.t
                          ? v.c
                          : v.n > 0
                          ? s.cfg.COLOR.K_RISE
                          : v.n < 0
                          ? s.cfg.COLOR.K_FALL
                          : s.cfg.COLOR.K_N),
                        (A = A.replace("#000", y));
                    }
                    break;
                  case "VOLUME":
                  case "TVOL":
                  case "MA":
                    A =
                      (v.t ? v.t + ": " : "") +
                      (isNaN(v.n) ? 0 : v.n.toFixed(h.nfloat));
                    break;
                  case "SUNSPOT":
                    A =
                      "SUNSPOT" === v.t
                        ? v.n
                          ? (v.t ? v.t + ": " : "") +
                            (isNaN(v.n)
                              ? "--"
                              : utils_util.strUtil.ps(v.n, 0)) +
                            "级"
                          : ""
                        : (v.t ? v.t + ": " : "") +
                          (isNaN(v.n)
                            ? "--"
                            : utils_util.strUtil.ps(v.n, h.nfloat));
                    break;
                  default:
                    (A =
                      (v.t ? v.t + ": " : "") +
                      (isNaN(v.n)
                        ? "--"
                        : utils_util.strUtil.ps(v.n, h.nfloat))),
                      "TFLOW" == s.name && m == r.length - 1 && (A += "元");
                }
                (p = 11),
                  (e.innerHTML +=
                    "<span style='float:left;min-width:" +
                    d +
                    "px;margin-right:" +
                    p +
                    "px;color:" +
                    v.c +
                    "'>" +
                    A +
                    "</span>");
              }
          } else (a.innerHTML = f ? "" : u), (e.innerHTML = "");
        }),
          this.setTxt();
      }
      var s = this,
        e = this.proxyCfg.fixIdctW,
        h = this.proxyCfg.usrObj;
      return s.cfg.custom.indicator_cvs_title ? new r() : new a();
    }),
    (techchart.prototype.genIndicator = function(t, i) {
      if (t) {
        this.indicatorArr = [];
        for (var r = 0, a = t.length; a > r; r++) this.indicatorArr.push(t[r]);
        this.titleO ||
          ((this.titleO = this.genTitleCanvas(i)),
          this.titleCtn.appendChild(this.titleO.canvas));
      }
    }),
    (techchart.prototype.indicatorI = function(t) {
      if (this.indicatorArr) {
        for (var i, r, a = [], s = 0, e = this.indicatorArr.length; e > s; s++)
          (i = this.indicatorArr[s]),
            (r = t[i.prop]),
            "t" == this.proxyCfg.type &&
              ("volume" == i.prop || /^tvol\w+$/.test(i.prop)) &&
              t[i.prop] < 0 &&
              (r = 0),
            a.push({
              n: r,
              c: i.color,
              t: i.idct
            });
        return this.titleO && this.titleO.setTxt(a), a;
      }
    }),
    (techchart.prototype.interact = function(t) {
      return !isNaN(t) && this.datas && this.datas.length
        ? (t >= this.datas.length && (t = this.datas.length - 1),
          this.indicatorI(this.datas[t]))
        : (this.titleO && this.titleO.setTxt(null), null);
    }),
    (techchart.prototype.rfs = function() {
      this.selfCfg.allowrfs
        ? (this.titleO && utils_util.domGc(this.titleO.canvas),
          utils_util.domGc(this.wrap),
          clearInterval(this.updateId))
        : (this.wrap.style.display = "none");
    });
  var bt = (function() {
    function t(t) {
      return null === t
        ? "Null"
        : void 0 === t
        ? "Undefined"
        : toString.call(t).slice(8, -1);
    }

    function i(t, i, r) {
      switch (t) {
        case "+":
          return i + r;
        case "-":
          return i - r;
        case "*":
          return i * r;
        case "/":
          return r ? i / r : null;
      }
    }
    var toString = Object.prototype.toString,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      getArr = function(t, i, r) {
        if (i) {
          for (var a = [], s = 0, e = t.length; e > s; s++)
            a.push(r ? r(t[s][i]) : t[s][i]);
          return a;
        }
        return t;
      },
      o = function(t) {
        for (var i = 0, r = t.length; r--; ) i += t[r];
        return i;
      },
      calcMA = function(t, i) {
        for (var r, a = [], s = 0, e = 0, h = t.length; h > s; s++)
          t[s] && (e += t[s]),
            s >= i - 1
              ? ((r = e / i), t[s - i + 1] && (e -= t[s - i + 1]))
              : (r = e / (s + 1)),
            a.push(r);
        return a;
      },
      calcEMA = function(t, i) {
        for (var r = [t[0]], a = 1, s = t.length; s > a; a++)
          r.push((2 * t[a] + (i - 1) * r[a - 1]) / (i + 1));
        return r;
      },
      calcSMA = function(t, i, r) {
        for (var a = [t[0]], s = 1, e = t.length; e > s; s++)
          a.push((r * t[s] + (i - r) * a[s - 1]) / i);
        return a;
      },
      calcREF = function(t, i) {
        for (var r = [], a = 0; i > a; a++) r.push(null);
        for (var s = t.length; s > a; a++) r.push(t[a - i]);
        return r;
      },
      calcSAR = function(t, i, r, a) {
        function s(t) {
          if (!(t >= n))
            if (
              ((c[t] = Math.min.apply(null, l.slice(t - i, t))),
              (u[t] = 1),
              c[t] > l[t])
            )
              e(t + 1);
            else
              for (
                f[t] = Math.max.apply(null, o.slice(t - i + 1, t + 1)),
                  d[t] = r;
                n - 1 > t;

              ) {
                if (
                  ((c[t + 1] = c[t] + (d[t] * (f[t] - c[t])) / 100),
                  (u[t + 1] = 1),
                  c[t + 1] > l[t + 1])
                )
                  return void e(t + 2);
                (f[t + 1] = Math.max.apply(null, o.slice(t - i + 2, t + 2))),
                  o[t + 1] > f[t]
                    ? ((d[t + 1] = d[t] + r), d[t + 1] > a && (d[t + 1] = a))
                    : (d[t + 1] = d[t]),
                  t++;
              }
        }

        function e(t) {
          if (!(t >= n)) {
            if (
              ((c[t] = Math.max.apply(null, o.slice(t - i, t))),
              (u[t] = 0),
              c[t] < o[t])
            )
              return void s(t + 1);
            for (
              f[t] = Math.min.apply(null, l.slice(t - i + 1, t + 1)), d[t] = r;
              n - 1 > t;

            ) {
              if (
                ((c[t + 1] = c[t] + (d[t] * (f[t] - c[t])) / 100),
                (u[t + 1] = 0),
                c[t + 1] < o[t + 1])
              )
                return void s(t + 2);
              (f[t + 1] = Math.min.apply(null, l.slice(t - i + 2, t + 2))),
                l[t + 1] < f[t]
                  ? ((d[t + 1] = d[t] + r), d[t + 1] > a && (d[t + 1] = a))
                  : (d[t + 1] = d[t]),
                t++;
            }
          }
        }
        var o = getArr(t, "high"),
          l = getArr(t, "low"),
          n = t.length,
          c = [],
          d = [],
          f = [],
          u = [];
        return (
          o[i] > o[0] || l[i] > l[0] ? s(i) : e(i),
          {
            data: c,
            direction: u
          }
        );
      },
      calcA = function(t) {
        for (var i = 0, r = t.length, a = r; a--; ) i += t[a];
        return i / r;
      },
      calcSD = function(t, i) {
        for (var r = calcA(t), a = t.length, s = 0, e = a; e--; )
          s += Math.pow(t[e] - r, 2);
        return Math.sqrt(s / (i ? a - i : a));
      },
      calcSTD = function(t, i) {
        for (var r = [], a = 0, s = t.length; s > a; a++)
          r.push(
            i > a
              ? calcSD(t.slice(0, a + 1), 1)
              : calcSD(t.slice(a - i + 1, a + 1), 1)
          );
        return r;
      },
      A = function(t) {
        for (var i = calcA(t), r = 0, a = t.length, s = a; s--; )
          r += abs(t[s] - i);
        return r / a;
      },
      calcAVEDEV = function(t, i) {
        for (var r = [], a = 0, s = t.length; s > a; a++)
          r.push(i > a ? A(t.slice(0, a + 1)) : A(t.slice(a - i + 1, a + 1)));
        return r;
      },
      calcHHV = function(t, i) {
        for (
          var r = [], a = t.length, e = max.apply(null, t), h = 0;
          a > h;
          h++
        )
          r.push(
            i
              ? max.apply(
                  null,
                  i > h ? t.slice(0, h + 1) : t.slice(h - i + 1, h + 1)
                )
              : e
          );
        return r;
      },
      calcLLV = function(t, i) {
        for (
          var r = [], s = t.length, e = min.apply(null, t), h = 0;
          s > h;
          h++
        )
          r.push(
            i
              ? min.apply(
                  null,
                  i > h ? t.slice(0, h + 1) : t.slice(h - i + 1, h + 1)
                )
              : e
          );
        return r;
      },
      calcABS = function(i) {
        switch (t(i)) {
          case "Number":
            return abs(i);
          case "Array":
            for (var r = [], a = 0, s = i.length; s > a; a++) r.push(abs(i[a]));
            return r;
          default:
            throw new Error("argument of Function calcABS was error!");
        }
      },
      calcMAX = function(i, r) {
        var a, e, h;
        switch (t(i)) {
          case "Array":
            switch (t(r)) {
              case "Array":
                for (a = [], e = 0, h = i.length; h > e; e++)
                  a.push(max(i[e], r[e]));
                return a;
              case "Number":
                for (a = [], e = 0, h = i.length; h > e; e++)
                  a.push(max(i[e], r));
                return a;
              default:
                throw new Error("argument of Function calcMAX was error!");
            }
            break;
          case "Number":
            switch (t(r)) {
              case "Array":
                for (a = [], e = 0, h = r.length; h > e; e++)
                  a.push(max(i, r[e]));
                return a;
              case "Number":
                return max(i, r);
              default:
                throw new Error("argument of Function calcMAX was error!");
            }
            break;
          default:
            throw new Error("argument of Function calcMAX was error!");
        }
      },
      calcSUM = function(t, i) {
        var r = [];
        if (i)
          for (var a = 0, s = t.length; s > a; a++)
            r.push(o(i > a ? t.slice(0, a + 1) : t.slice(a - i + 1, a + 1)));
        else {
          var e = 0;
          for (a = 0, s = t.length; s > a; a++) (e += t[a]), r.push(e);
        }
        return r;
      },
      operateArr = function(r, a, s) {
        var e,
          h,
          o = [],
          l = r.length;
        switch (t(a)) {
          case "Array":
            for (h = a.length, e = 0; l > e; e++)
              o.push(
                "Number" == t(r[e]) && "Number" == t(a[e])
                  ? i(s, r[e], a[e])
                  : null
              );
            for (; o.length < h; ) o.push(null);
            break;
          case "Number":
            for (e = 0; l > e; e++)
              o.push("Number" == t(r[e]) ? i(s, r[e], a) : null);
            break;
          default:
            throw Error("the Second argument of Function operateArr is wrong!");
        }
        return o;
      };
    return {
      getArr: getArr,
      calcMA: calcMA,
      calcEMA: calcEMA,
      calcSMA: calcSMA,
      calcREF: calcREF,
      calcSAR: calcSAR,
      calcA: calcA,
      calcSD: calcSD,
      calcSTD: calcSTD,
      calcAVEDEV: calcAVEDEV,
      calcHHV: calcHHV,
      calcLLV: calcLLV,
      calcABS: calcABS,
      calcMAX: calcMAX,
      calcSUM: calcSUM,
      operateArr: operateArr
    };
  })();
  utils_util.fInherit(BLANKCTN, techchart),
    utils_util.fInherit(ADL, techchart),
    utils_util.fInherit(ASI, techchart),
    utils_util.fInherit(BBIBOLL, techchart),
    utils_util.fInherit(BF, techchart),
    utils_util.fInherit(BIAS, techchart),
    utils_util.fInherit(BOLL, techchart),
    utils_util.fInherit(BRAR, techchart),
    utils_util.fInherit(CCI, techchart),
    utils_util.fInherit(CHIPCOST, techchart),
    utils_util.fInherit(DITC, techchart),
    utils_util.fInherit(DMA, techchart),
    utils_util.fInherit(DMI, techchart),
    utils_util.fInherit(DPDK, techchart),
    utils_util.fInherit(DPDKS, DPDK),
    utils_util.fInherit(EMV, techchart),
    utils_util.fInherit(EWI, techchart),
    utils_util.fInherit(EXPMA, techchart),
    utils_util.fInherit(TECHFLOW, techchart),
    utils_util.fInherit(KDJ, techchart),
    utils_util.fInherit(KFLOW, techchart),
    utils_util.fInherit(KKFLOW, techchart),
    utils_util.fInherit(KGSTRADE, techchart),
    utils_util.fInherit(SUNSPOT, techchart),
    utils_util.fInherit(LB, techchart),
    utils_util.fInherit(MA, techchart),
    utils_util.fInherit(MACD, techchart),
    utils_util.fInherit(OBV, techchart),
    utils_util.fInherit(PKFLOW, KFLOW),
    utils_util.fInherit(POSITION, techchart),
    utils_util.fInherit(Press, techchart),
    utils_util.fInherit(PSY, techchart),
    utils_util.fInherit(RGL, techchart),
    utils_util.fInherit(ROC, techchart),
    utils_util.fInherit(RSI, techchart),
    utils_util.fInherit(SAR, techchart),
    utils_util.fInherit(TTOPTRADE, techchart),
    utils_util.fInherit(TFLOW, techchart),
    utils_util.fInherit(TOR, techchart),
    utils_util.fInherit(TRIX, techchart),
    utils_util.fInherit(TTFLOW, TFLOW),
    utils_util.fInherit(TZY, techchart),
    utils_util.fInherit(TZYS, TZY),
    utils_util.fInherit(VR, techchart),
    utils_util.fInherit(WR, techchart),
    utils_util.fInherit(WVAD, techchart),
    utils_util.fInherit(VOLUME, techchart),
    utils_util.fInherit(TVOL, techchart);
  var yt = (function() {
    var auth = function(t) {
        var i = function() {
            for (
              var t,
                linkItem,
                r = {
                  BF: BF
                },
                links = [
                  {
                    h: "http://127.0.0.1",
                    a: r
                  },
                  {
                    h: "http://localhost",
                    a: r
                  },
                  {
                    h: "http://xuan.sina.com.cn",
                    a: r
                  },
                  {
                    h: "http://tmp.sina.com.cn",
                    a: r
                  },
                  {
                    h: "https://touzi.sina.cn/",
                    a: r
                  },
                  {
                    h: "http://touzi.sina.cn/",
                    a: r
                  },
                  {
                    h: "https://touzi.sina.com.cn/",
                    a: r
                  },
                  {
                    h: "http://touzi.sina.com.cn/",
                    a: r
                  }
                ],
                href = document.location.href,
                e = links.length;
              e--;

            )
              if (((linkItem = links[e]), 0 === href.indexOf(linkItem.h))) {
                t = linkItem.a;
                break;
              }
            return t;
          },
          r = i();
        if (r && t) for (var a in r) r.hasOwnProperty(a) && (t[a] = r[a]);
      },
      doStc = function(i, r) {
        var a = i.name,
          s = i.param,
          e = r ? "r_" : "s_";
        utils_util.stc(e + a, s);
      };
    return {
      doStc: doStc,
      auth: auth
    };
  })();
  return new (function() {
    (this.VER = "6.6.5"),
      (this.get = function(config, callback) {
        utils_util.isFunc(callback) &&
          callback({
            tChart: tChart,
            pChart: pChart
          });
      });
  })();
});

xh5_define(
  "chart.h5k",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(settinger, util, painter) {
    "use strict";
    function a(a) {
      function Obji(e, n) {
        function i(e) {
          rangeCtrl.setDataRange(e);
          y && (y.linkData(e), y.setDataRange());
          N && (N.linkData(e), N.setDataRange());
          w && (w.linkData(e), w.setDataRange());
        }
        function l(e, t) {
          var n,
            a,
            i = kDb.get(globalCfg.URLHASH.KD),
            o = i.length;
          e || (n = 0), t || (a = o - 1);
          for (
            var s = 0;
            o > s &&
            (isNaN(n) && i[s].date >= e && (n = s),
            isNaN(a) && i[s].date >= t && (a = s),
            isNaN(n) || isNaN(a));
            s++
          );
          return [n, a];
        }
        function c() {
          n && (K = kDb),
            P.uUpdate(null, !0),
            "CN" !== u ||
              /^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol) ||
              kDb.initExtraData();
        }
        e = oc(
          {
            symbol: void 0,
            datas: {
              day: {
                wfn: void 0,
                url: void 0,
                dataformatter: void 0,
                staticdata: void 0
              },
              min: {
                wfn: void 0,
                url: void 0,
                dataformatter: void 0,
                staticdata: void 0
              }
            }
          },
          e || {}
        );
        var stockDataA = this;
        var u = util.market(e.symbol);
        var g = !0;
        this.isErr = !1;
        this.symbol = e.symbol;
        this.market = u;
        var b;
        switch (u) {
          case "forex":
          case "forex_yt":
            "DINIW" == this.symbol, (b = "06:00");
            break;
          case "BTC":
            b = "00:00";
            break;
          case "LSE":
            b = "08:00";
            break;
          default:
            b = "09:30";
        }
        this.isMain = n;
        this.isCompare = !1;
        this.datas = null;
        this.dataLen = 0;
        this.nfloat = e.nfloat || 2;
        this.dataLenOffset = 0;
        this.prevclose = 0 / 0;
        this.labelMaxP = 0;
        this.labelMinP = Number.MAX_VALUE;
        this.maxPrice = 0;
        this.minPrice = Number.MAX_VALUE;
        this.rangeMax = 0;
        this.rangeMin = Number.MAX_VALUE;
        this.labelMaxVol = 0;
        this.maxVolume = 0;
        this.minPercent = Number.MAX_VALUE;
        this.maxPercent = -Number.MAX_VALUE;
        this.labelPriceCount = 0 / 0;
        this.isTotalRedraw = !0;
        this.hq = void 0;
        this.nco = void 0;
        var y,
          N,
          w,
          S = new k(this, e),
          A = e.name;
        this.getName = function() {
          return A || "";
        };
        this.viewState = viewState;
        var kDb = new (function() {
          var i;
          var o = {};
          var extraDataObj = {
            rsAmount: void 0
          };
          var initState = function(e, a, s, r, l) {
            if (a) {
              if (n) {
                if (
                  (e == globalCfg.URLHASH.KD && (i = util.clone(a, null)),
                  r && window.datelist && stockDataA.hq)
                ) {
                  var c = util.xh5_S_KLC_D(window.datelist);
                  a = util.kUtil.ayd(a, c, !1, a[0].date, stockDataA.hq.date);
                }
              } else
                l ||
                  (e == globalCfg.URLHASH.KD && (i = util.clone(a, null)),
                  (a = util.kUtil.adbd(a, K.get(e), s, !1)));
              o["k" + e] = a;
              var d = a.length,
                u = r ? setting.PARAM.K_CL_NUM : setting.PARAM.defaultCandleNum;
              (o["k" + e + "v"] = d > u ? d - u : 0), (o["k" + e + "b"] = d);
            }
          };
          var l = function() {
            var e = viewState.viewId;
            switch (e) {
              case globalCfg.URLHASH.KDF:
              case globalCfg.URLHASH.KDB:
                e = globalCfg.URLHASH.KD;
                break;
              case globalCfg.URLHASH.KWF:
              case globalCfg.URLHASH.KWB:
                e = globalCfg.URLHASH.KW;
                break;
              case globalCfg.URLHASH.KMF:
              case globalCfg.URLHASH.KMB:
                e = globalCfg.URLHASH.KM;
                break;
              case globalCfg.URLHASH.KYF:
              case globalCfg.URLHASH.KYB:
                e = globalCfg.URLHASH.KY;
                break;
              case globalCfg.URLHASH.KCLF:
              case globalCfg.URLHASH.KCLB:
                e = globalCfg.URLHASH.KCL;
            }
            return e;
          };
          this.get = function(e) {
            if (util.isStr(e)) {
              var n = l();
              return o["k" + n + e];
            }
            return o["k" + (e || viewState.viewId)];
          };
          this.set = function(e, t) {
            var n = l(),
              a = "k" + n + e;
            "undefined" != typeof o[a] && (o[a] = t);
          };
          this.getOriDK = function() {
            return i;
          };
          this.initState = initState;
          this.initDWMState = function(e, n) {
            var a = util.clone(n.day, null);
            initState(globalCfg.URLHASH.KD, n.day);
            initState(globalCfg.URLHASH.KW, n.week);
            initState(globalCfg.URLHASH.KM, n.month);
            initState(globalCfg.URLHASH.KCL, a, !1, !0);
            initState(globalCfg.URLHASH.KY, n.year);
          };
          this.extraDataObj = extraDataObj;
          this.initExtraData = function() {
            var extraUrl =
              "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol";
            a.ssl && (extraUrl = util.getSUrl(extraUrl));
            var i = "KKE_ShareAmount_" + e.symbol;
            util.load(
              extraUrl
                .replace("$symbol", e.symbol)
                .replace("$rn", String(new Date().getDate()))
                .replace("$cb", "var%20" + i + "="),
              function() {
                var e = window[i];
                if (e) {
                  for (var t, n = [], a = e.length; a--; )
                    (t = e[a]),
                      n.push({
                        amount: Number(t.amount),
                        date: dateUtil.sd(t.date)
                      });
                  n.length && (extraDataObj.rsAmount = n);
                }
              }
            );
          };
          this.gc = function() {
            o = null;
            extraDataObj = null;
          };
        })();

        var rangeCtrl = new (function() {
          var e = function() {
            stockDataA.minPrice = Number.MAX_VALUE;
            stockDataA.maxPrice = -Number.MAX_VALUE;
            stockDataA.minPercent = Number.MAX_VALUE;
            stockDataA.maxPercent = -Number.MAX_VALUE;
            stockDataA.maxVolume = 0;
            stockDataA.rangeMax = 0;
            stockDataA.rangeMin = Number.MAX_VALUE;
          };
          var t = function() {
            for (var e, t = 0, n = stockDataA.dataLen; n > t; t++) {
              e = stockDataA.datas[t];
              e.close <= 0 ||
                (e.high > stockDataA.maxPrice &&
                  (stockDataA.maxPrice = stockDataA.rangeMax = e.high),
                e.low < stockDataA.minPrice &&
                  (stockDataA.minPrice = stockDataA.rangeMin = e.low),
                (stockDataA.maxVolume = Math.max(
                  stockDataA.maxVolume,
                  e.volume
                )));
            }

            var a = xh5_ADJUST_HIGH_LOW_c(stockDataA.maxVolume, 0, 0, !0);
            stockDataA.labelMaxVol = a[0];
            stockDataA.maxPercent = Math.max(
              (stockDataA.maxPrice - stockDataA.prevclose) /
                stockDataA.prevclose,
              0
            );
            stockDataA.minPercent = Math.min(
              (stockDataA.minPrice - stockDataA.prevclose) /
                stockDataA.prevclose,
              0
            );
          };
          this.createPlayingData = function() {
            var e,
              t,
              n = setting.DIMENSION.h_k,
              a = n * setting.DIMENSION.P_HV,
              i = n * (1 - setting.DIMENSION.P_HV);
            e = stockDataA.labelMinP;
            t = stockDataA.labelMaxP;
            for (
              var o,
                s = stockDataA.labelMaxVol,
                r = stockDataA.prevclose,
                l = stockDataA.isTotalRedraw
                  ? 0
                  : stockDataA.dataLen - stockDataA.dataLenOffset,
                c = setting.custom.show_underlay_vol,
                u = stockDataA.isCompare ? "ppp" : "pp",
                p = stockDataA.dataLen;
              p > l;
              l++
            ) {
              o = stockDataA.datas[l];
              o.cy = xh5_PosUtil[u](o.close, e, t, n, r);
              o.oy = xh5_PosUtil[u](o.open, e, t, n, r);
              o.hy = xh5_PosUtil[u](o.high, e, t, n, r);
              o.ly = xh5_PosUtil[u](o.low, e, t, n, r);
              c && (o.vy = xh5_PosUtil.vp(o.volume, s, a) + i);
            }
          };
          this.setDataRange = function(n) {
            var i = kDb.get();
            if (i) {
              viewState.dataLength = i.length;
              var start = viewState.start;
              var end = viewState.end;
              if (isNaN(start) || isNaN(end)) {
                end = kDb.get("b");
                start = kDb.get("v");
                viewState.start = start;
                viewState.end = end;
              } else {
                if (n && end + 1 >= i.length) {
                  var r = i.length - end;
                  viewState.end = end = i.length;
                  (1 == a.pcm || viewState.viewId == globalCfg.URLHASH.K1) &&
                    (0 == start &&
                      end > 1 &&
                      end < setting.PARAM.minCandleNum &&
                      ((start = end - 1), (viewState.start = start)),
                    end - start >= setting.PARAM.defaultCandleNum &&
                      ((start += r), (viewState.start = start)));
                }
                kDb.set("v", start), kDb.set("b", end);
              }
              viewState.currentLength = end - start;
              viewState.startDate = i[start].date;
              viewState.endDate = i[end - 1].date;

              switch (a.pcm) {
                case 1:
                  stockDataA.prevclose = i[0].prevclose;
                  break;
                case 2:
                  stockDataA.prevclose = i[start].close;
                  break;
                default:
                  stockDataA.prevclose =
                    start > 1
                      ? i[start - 1].close
                      : i[0].prevclose || i[0].close;
              }
              stockDataA.datas = i.slice(start, end);
              stockDataA.dataLen = stockDataA.datas.length;
              e();
              t(n);
            }
          };
        })();
        var P = new (function() {
          var o,
            s = function(e) {
              return (
                o
                  ? ((e.volume = e.totalVolume - (o.totalVolume || 0)),
                    (e.amount = e.volume * e.price))
                  : ((o = {}), (e.volume = 0)),
                (o.totalVolume = e.totalVolume),
                (e.avg_price = e.totalAmount / e.totalVolume || e.price),
                !0
              );
            },
            r = !1,
            l = function(e, n, a) {
              if (e.isUpdateTime) {
                var i = kDb.get(n);
                if (i && !(i.length < 1)) {
                  var o =
                      n == globalCfg.URLHASH.KD ||
                      n == globalCfg.URLHASH.KDF ||
                      n == globalCfg.URLHASH.KCL ||
                      n == globalCfg.URLHASH.KCLF,
                    s = i[i.length - 1];
                  if (1 == a) {
                    if (
                      s.time &&
                      !util.kUtil.spk(s.time, e.time, b, n, stockDataA.market)
                    ) {
                      if (
                        (util.kUtil.nc(i, e, n, {
                          price: e.price,
                          volume: e.volume
                        }),
                        /^forex|^BTC/.test(stockDataA.market))
                      )
                        n == globalCfg.URLHASH.K1 &&
                          ((s = i[i.length - 1]),
                          (s.prevclose = e.prevclose),
                          (s.change = e.price - e.prevclose),
                          (s.percent = s.change / e.prevclose));
                      else if ("NF" == stockDataA.market);
                      else if (util.kUtil.spk("09:35", e.time, b, n)) {
                        if (n == globalCfg.URLHASH.K60) {
                          var l = e.time.split(":"),
                            c = l[0],
                            d = l[1];
                          if (c > 10 || (10 == c && d > 30)) return;
                        }
                        (s = i[i.length - 1]),
                          (s.open = e.open),
                          s.open > s.high && (s.high = s.open),
                          s.open < s.low && (s.low = s.open);
                      }
                      return;
                    }
                  } else if (2 == a) {
                    if (!e.trstr) return;
                    util.kUtil.nc(i, e, n, {
                      price: e.price,
                      volume: 0
                    });
                  } else if (stbd(e.date, s.date))
                    stockDataA.nco &&
                      ("NF" == stockDataA.market
                        ? dateUtil.dst(s.date) < stockDataA.nco.open &&
                          e.time >= stockDataA.nco.open &&
                          e.time > stockDataA.nco.close &&
                          util.kUtil.nc(i, e, n, null)
                        : r &&
                          e.time >= stockDataA.nco.open &&
                          ((r = !1), util.kUtil.nc(i, e, n, null)));
                  else {
                    if (!(e.date > s.date)) return;
                    stockDataA.nco
                      ? "NF" == stockDataA.market
                        ? e.time >= stockDataA.nco.open &&
                          util.kUtil.nc(i, e, n, null)
                        : e.time <= stockDataA.nco.close && (r = !0)
                      : util.kUtil.nc(i, e, n, null);
                  }
                  (s = i[i.length - 1]),
                    (s.close = e.price),
                    (s.date = dateUtil.ddt(e.date)),
                    (s.day = dateUtil.ds(s.date, "/")),
                    n == globalCfg.URLHASH.KMS
                      ? ((s.volume = e.trvolume || 0),
                        (s.amount = e.tramount || 0),
                        (s.trbs = e.trbs),
                        (s.kke_cs = 0 == e.trbs ? -1 : 1))
                      : (o
                          ? ((s.open = e.open),
                            (s.high = e.high),
                            (s.low = e.low),
                            (s.volume = e.totalVolume))
                          : isNaN(s.volume)
                          ? (s.volume = e.volume)
                          : (s.volume += Number(e.volume)),
                        (s.kke_cs =
                          s.close > s.open ? 1 : s.open > s.close ? -1 : 0));
                  var u;
                  1 == i.length
                    ? (u = o ? e.prevclose : s.open)
                    : ((u = i[i.length - 2].close),
                      e.settlement && o && (u = e.settlement)),
                    /^forex|^BTC/.test(stockDataA.market) &&
                      (n == globalCfg.URLHASH.K1 ||
                        n == globalCfg.URLHASH.KD) &&
                      (u = e.prevclose),
                    (s.change = e.price - u),
                    (s.percent = s.change / u),
                    e.price > s.high && (s.high = e.price),
                    e.price < s.low && (s.low = e.price),
                    (s.amplitude = s.high - s.low),
                    (s.ampP = s.amplitude / u),
                    (s.time = e.time),
                    util.isCNK(e.symbol) &&
                      ((s.postVol = e.postVolume), (s.postAmt = e.postAmount));
                }
              }
            },
            c = function(e) {
              l(e, globalCfg.URLHASH.KD, 0),
                l(e, globalCfg.URLHASH.KW, 0),
                l(e, globalCfg.URLHASH.KM, 0),
                l(e, globalCfg.URLHASH.KY, 0),
                l(e, globalCfg.URLHASH.KDF, 0),
                l(e, globalCfg.URLHASH.KWF, 0),
                l(e, globalCfg.URLHASH.KMF, 0),
                l(e, globalCfg.URLHASH.KYF, 0),
                l(e, globalCfg.URLHASH.KCL, 0),
                l(e, globalCfg.URLHASH.KCLF, 0),
                l(e, globalCfg.URLHASH.K1, 1),
                l(e, globalCfg.URLHASH.K5, 1),
                l(e, globalCfg.URLHASH.K15, 1),
                l(e, globalCfg.URLHASH.K30, 1),
                l(e, globalCfg.URLHASH.K60, 1),
                l(e, globalCfg.URLHASH.K240, 1),
                l(e, globalCfg.URLHASH.KMS, 2);
            },
            d = new (function() {
              this.check = function(e) {
                if (n) return !0;
                var a = viewState.viewId,
                  i = K.get(a);
                if (!i || i.length < 1) return !1;
                var o = i[i.length - 1];
                if (e.date > o.date)
                  if ("mink" == globalCfg.URLHASH.gt(viewState.viewId).type) {
                    if (
                      !util.kUtil.spk(
                        o.time,
                        e.time,
                        "00:00",
                        a,
                        stockDataA.market
                      )
                    )
                      return !1;
                  } else if (!stbd(e.date, o.date)) return !1;
                return !0;
              };
            })();
          this.uUpdate = function(n, o, r, l) {
            var u,
              p = {
                symbol: e.symbol,
                ssl: a.ssl
              };
            r
              ? ((u = "datas.hq.parse"), (p.hqStr = r), (p.market = l))
              : ((u = "datas.hq.get"), (p.delay = !0), (p.cancelEtag = o)),
              KKE.api(u, p, function(a) {
                var o = a.dataObj[e.symbol];
                if (o && o.date && s(o)) {
                  if (((A = A || o.name || ""), !d.check(o))) return;
                  (stockDataA.hq = o), c(o), i(!0), util.isFunc(n) && n();
                }
              });
          };
        })();
        var $ = new (function() {
          var i,
            o = function(e, n) {
              me.re(globalCfg.e.K_DATA_LOADED, n), util.isFunc(e) && e();
            },
            s = function(e) {
              if (!stockDataA.hq || !stockDataA.hq.date) return null;
              for (var t = 0; !e[t].f; ) t++;
              return {
                factor: e[t].f
              };
            },
            r = function(e, a, i, o) {
              if (e) {
                var s,
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
                  y = !(-828 === e),
                  N = kDb.getOriDK(),
                  w = 0;
                if (
                  ((r =
                    "q" === i ? globalCfg.URLHASH.KDF : globalCfg.URLHASH.KDB),
                  kDb.initState(r, util.clone(N, null), !1, !1, !0),
                  (s = kDb.get(r)),
                  (b = s.length),
                  y)
                ) {
                  for (g = b - 1; g >= 0; g--) {
                    for (p = s[g], f = dateUtil.ds(p.date); f < a[w].d; ) w++;
                    if (((v = Number(a[w].f)), "HK" === o)) {
                      if (
                        ((p.high *= v),
                        (p.low *= v),
                        (p.open *= v),
                        (p.close *= v),
                        "h" === i)
                      ) {
                        var k = Number(a[w].c);
                        (p.high += k),
                          (p.low += k),
                          (p.open += k),
                          (p.close += k);
                      }
                    } else
                      "US" === o
                        ? ((p.high *= v),
                          (p.low *= v),
                          (p.open *= v),
                          (p.close *= v))
                        : "h" === i
                        ? ((p.high *= v),
                          (p.low *= v),
                          (p.open *= v),
                          (p.close *= v))
                        : ((p.high /= v),
                          (p.low /= v),
                          (p.open /= v),
                          (p.close /= v));
                  }
                  for (g = 0; b > g; g++)
                    (p = s[g]),
                      (v = Number(a[a.length - 1].f)),
                      0 == g &&
                        ((d = p.prevclose),
                        isNaN(d) || 0 >= d
                          ? (d = p.open)
                          : ((d =
                              "HK" === o
                                ? p.prevclose * v
                                : "h" === i
                                ? p.prevclose * v
                                : p.prevclose / v),
                            (p.prevclose = d))),
                      (p.amplitude = p.high - p.low),
                      (p.ampP = p.amplitude / d),
                      (p.change = p.close - d),
                      (p.percent = p.change / d),
                      (d = p.close);
                }
                var S;
                1 == b &&
                  ((p = s[b - 1]),
                  (S = {
                    open: p.open,
                    high: p.high,
                    low: p.low,
                    close: p.close,
                    price: p.close,
                    volume: p.volume,
                    totalVolume: p.volume,
                    date: dateUtil.dd(p.date)
                  })),
                  (l = util.kUtil.mw(s, S, null, null, 0 / 0)),
                  (h = l[0]),
                  (c = l[1]),
                  (u = l[2]),
                  util.kUtil.pd(h, null),
                  util.kUtil.pd(c, null),
                  util.kUtil.pd(u, null),
                  kDb.initState(globalCfg.URLHASH["q" == i ? "KWF" : "KWB"], h),
                  kDb.initState(globalCfg.URLHASH["q" == i ? "KMF" : "KMB"], c),
                  kDb.initState(globalCfg.URLHASH["q" == i ? "KYF" : "KYB"], u);
                var M = util.clone(s, null);
                kDb.initState(
                  globalCfg.URLHASH["q" == i ? "KCLF" : "KCLB"],
                  M,
                  !1,
                  !0
                ),
                  n || kDb.initState(r, s);
              }
            },
            l = function(t) {
              var n = globalCfg.URLHASH.gt(viewState.viewId),
                i = n.dir,
                l = {
                  symbol: e.symbol,
                  market: u,
                  dir: i,
                  ssl: a.ssl
                };
              F.show(),
                KKE.api("datas.k.loadReData", l, function(e) {
                  F.hide();
                  var n = !0,
                    a = e.data;
                  if (a) {
                    var c = s(a);
                    c && ((n = !1), r(c.factor, a, i, l.market));
                  }
                  n && r(-828, null, i),
                    o(t, {
                      viewId: viewState.viewId
                    });
                });
            },
            c = function(e, t) {
              var s = globalCfg.URLHASH.gt(i),
                r = "mink" == s.type ? kDb.initState : kDb.initDWMState;
              F.show(),
                "LSE" === u && (e.symbol = a.rawSymbol),
                KKE.api("datas.k.get", e, function(a) {
                  F.hide();
                  var l = i;
                  if (((i = 0 / 0), "error" == a.msg)) {
                    if (((stockDataA.isErr = !0), n))
                      if (a.data && a.data.hq) {
                        var c;
                        if (a.data.hq.status)
                          switch (a.data.hq.status) {
                            case 2:
                              c = globalCfg.notlisted;
                              break;
                            case 3:
                              c = globalCfg.delisted;
                          }
                        else c = globalCfg.norecord;
                        c &&
                          q.showTip({
                            txt: c,
                            parent: x,
                            noBtn: !0
                          });
                      } else
                        q.showTip({
                          txt: globalCfg.nodata,
                          parent: x
                        });
                  } else a.data.hq && (stockDataA.hq = a.data.hq), r(s.baseid, a.data, e.ismink);
                  o(t, {
                    viewId: l
                  });
                });
            },
            d = function(t) {
              KKE.api(
                "datas.hq.get",
                {
                  symbol: e.symbol,
                  cancelEtag: !0,
                  ssl: a.ssl
                },
                function(n) {
                  var a = n.dataObj[e.symbol],
                    i = [
                      {
                        close: a.price,
                        open: a.open,
                        high: a.high,
                        low: a.low,
                        volume: 0,
                        prevclose: a.prevclose,
                        amplitude: a.high - a.low,
                        ampP: (a.high - a.low) / a.prevclose,
                        change: a.price - a.prevclose,
                        date: a.date,
                        day: dateUtil.ds(a.date, "/"),
                        time: a.time,
                        percent: a.price - a.prevclose / a.prevclose,
                        kke_cs: 0
                      }
                    ];
                  kDb.initState(viewState.viewId, i, !0),
                    o(t, {
                      viewId: viewState.viewId
                    });
                }
              );
            },
            p = function(t) {
              var n,
                i,
                o = viewState.viewId,
                s = globalCfg.URLHASH.gt(o);
              if (stockDataA.nco && stockDataA.nco.open)
                (i = stockDataA.nco.open), (b = i);
              else {
                var r = new Date(),
                  l = b.split(":");
                r.setHours(l[0], l[1], 0),
                  r.setMinutes(r.getMinutes() - 30),
                  (i = dateUtil.dst(r));
              }
              var d = {
                symbol: e.symbol,
                newthour: i,
                ssl: a.ssl
              };
              if ("mink" == s.type) {
                if (
                  ((n = e.datas.min),
                  (d.ismink = !0),
                  (d.scale = o),
                  /^forex|^BTC/.test(stockDataA.market))
                )
                  switch (((d.withsymbol = "sys_time"), o)) {
                    case globalCfg.URLHASH.K1:
                      d.datalen = 1440;
                      break;
                    case globalCfg.URLHASH.K240:
                      d.datalen = parseInt((60 / o) * 24 * 10);
                      break;
                    default:
                      d.datalen = parseInt((60 / o) * 24 * 5);
                  }
              } else n = e.datas.day;
              (d.dataurl = n.url),
                (d.dataformatter = n.dataformatter),
                (d.wfn = n.wfn),
                (d.staticdata = n.staticdata),
                c(d, t);
            },
            f = function(e) {
              (stockDataA.nco = {
                open: "20:00",
                close: "15:30"
              }),
                p(e);
            },
            v = function(e) {
              (stockDataA.nco = {
                open: "07:00",
                close: "06:00"
              }),
                p(e);
            },
            g = function(t) {
              var n = {
                  symbol: e.symbol,
                  ssl: a.ssl
                },
                i = "datas.k.";
              (i += "loadGBInit"),
                (stockDataA.nco = {
                  open: "15:00",
                  close: "23:30"
                }),
                KKE.api(i, n, function(e) {
                  var n = e.data;
                  if (n) {
                    var a = n.time;
                    a &&
                      a.length > 0 &&
                      ((stockDataA.nco.open = a[0][0] || stockDataA.nco.open),
                      (stockDataA.nco.close =
                        a[a.length - 1][1] || stockDataA.nco.close));
                  }
                  p(t);
                });
            },
            y = function(t, n) {
              var i = {
                  symbol: e.symbol,
                  ssl: a.ssl
                },
                o = "datas.k.";
              n
                ? ((o += "loadNFInit"),
                  (stockDataA.nco = {
                    open: "09:00",
                    close: "15:00"
                  }))
                : ((o += "loadHFInit"),
                  (stockDataA.nco = {
                    open: "06:00",
                    close: "05:59"
                  })),
                KKE.api(o, i, function(e) {
                  var n = e.data;
                  if (n) {
                    var a = n.time;
                    a &&
                      a.length > 0 &&
                      ((stockDataA.nco.open = a[0][0] || stockDataA.nco.open),
                      (stockDataA.nco.close =
                        a[a.length - 1][1] || stockDataA.nco.close));
                  }
                  p(t);
                });
            },
            N = function(e, t) {
              var n = new Date(),
                a = b.split(":");
              n.setHours(a[0], a[1], 0), n.setMinutes(n.getMinutes() - 1);
              var i = dateUtil.dst(n);
              (stockDataA.nco = {
                open: b,
                close: i
              }),
                "rek" == t.type && kDb.get(globalCfg.URLHASH.KD) ? l(e) : p(e);
            };
          this.iInit = function(e) {
            var t = viewState.viewId;
            if (i != t) {
              i = t;
              var n = globalCfg.URLHASH.gt(t);
              switch (stockDataA.market) {
                case "HF":
                  y(e);
                  break;
                case "NF":
                  y(e, !0);
                  break;
                case "global_index":
                  g(e);
                  break;
                case "GOODS":
                  f(e);
                  break;
                case "MSCI":
                  v(e);
                  break;
                case "forex":
                case "forex_yt":
                case "BTC":
                  N(e, n);
                  break;
                default:
                  "msk" == n.type
                    ? d(e)
                    : "rek" == n.type && kDb.get(globalCfg.URLHASH.KD)
                    ? l(e)
                    : p(e);
              }
            }
          };
        })();
        this.kDb = kDb;
        this.extraDataObj = kDb.extraDataObj;
        this.getYtdIndex = function(e) {
          var t = kDb.get(globalCfg.URLHASH.KD);
          if (!t) return null;
          var n = t[t.length - 1],
            a = n.date.getFullYear(),
            i = 0;
          return e && (a--, (i = n.date.getMonth())), l(new Date(a, i, 1));
        };
        this.initData = $.iInit;
        this.doUpdate = P.uUpdate;
        this.onViewChange = i;
        this.setPricePos = function(e, t) {
          (stockDataA.labelMaxP = e[0]),
            (stockDataA.labelMinP = e[1]),
            (stockDataA.labelPriceCount = e[2]),
            (stockDataA.isCompare = t),
            rangeCtrl.createPlayingData(),
            N && N.setPricePos(e);
        };
        this.setRange = function(e) {
          rangeCtrl.setDataRange(),
            y && y.setDataRange(),
            N && N.setDataRange(),
            w && w.setDataRange(e);
        };
        this.draw = function() {
          S.draw(), y && y.allDraw(z.x), N && N.allDraw(z.x);
        };
        this.resize = function(e) {
          rangeCtrl.createPlayingData(),
            S.resize(),
            y && y.onResize(e),
            N && N.onResize(),
            w && w.onResize();
        };
        this.clear = function(e) {
          S.clear(e);
          y && (y.clear(), (y = null));
          N && (N.clear(), (N = null));
          w && (w.clear(), (w = null));
          n && (E = null);
        };
        this.getPriceTech = function() {
          return N || null;
        };
        var W = function(e, n, a) {
          e && j.resizeAll(!0);
          I.onChangeView();
          n && util.isFunc(n.callback) && n.callback(),
            a && Y.onTechChanged(a[0]);
        };
        var G = void 0;
        this.initPt = function(e, i) {
          if (e) {
            !util.isArr(e) && (e = [e]);
            for (var o = e.length; o--; )
              if (e[o].name && "VOLUME" === e[o].name.toUpperCase()) {
                e.splice(o, 1), (setting.custom.show_underlay_vol = !0);
                break;
              }
            N ||
              ((N = new s({
                iMgr: B,
                stockData: stockDataA,
                chartArea: R,
                titleArea: H,
                cb: W,
                cfg: setting,
                type: "k",
                usrObj: a
              })),
              n && (U = N),
              G && ((g = N.showHide(G)), (G = void 0))),
              N.createChart(e, i);
          }
        };
        this.removePt = function(e) {
          if (e) {
            !util.isArr(e) && (e = [e]);
            for (var n = e.length; n--; )
              if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                e.splice(n, 1), (setting.custom.show_underlay_vol = !1);
                break;
              }
          } else setting.custom.show_underlay_vol = !1;
          N && N.removeChart(e);
        };
        this.togglePt = function(e, t) {
          N ? (g = N.showHide(e)) : !t && (G = e);
        };
        this.initTc = function(e, t) {
          y ||
            ((y = new r({
              stockData: stockDataA,
              iMgr: B,
              cb: W,
              subArea: D,
              cfg: setting,
              type: "k",
              usrObj: a,
              initMgr: j
            })),
            n && (T = y)),
            y.createChart(e, t);
        };
        this.removeTc = function(e) {
          y && y.removeChart(e);
        };
        this.initRs = function() {
          w = new o({
            stockData: stockDataA,
            setting: setting,
            rc: I.moving
          });
          w.linkData();
          E = w;
        };
        this.setLineStyle = S.setLineStyle;
        this.getLineStyle = S.getLineStyle;
        c();
      }
      function k(e, a) {
        function i() {
          if (y) {
            r = setting.COLOR.K_N;
            s = setting.COLOR.K_FALL;
            l = setting.COLOR.K_RISE;
            c = setting.COLOR.K_CL;
          } else {
            var a = o.linecolor;
            var i = a.K_N || "#" + util.randomColor();
            r = i;
            s = a.K_FALL || i;
            l = a.K_RISE || i;
            c = a.K_CL || i;
          }
          m.K_N = r;
          m.K_FALL = s;
          m.K_RISE = l;
          m.K_CL = c;
          d = new painter.xh5_ibPainter({
            setting: setting,
            sd: e,
            ctn: C,
            withHBg: y,
            fixScale: !1,
            reO: {
              mh: setting.DIMENSION.H_MA4K
            },
            iMgr: B,
            iTo: function(t, n, a, i) {
              if (e && e.datas) {
                !$CONTAINS(t, B.iHLineO.body) && t.appendChild(B.iHLineO.body);
                var o =
                  e.labelMaxP -
                  (a / setting.DIMENSION.h_k) * (e.labelMaxP - e.labelMinP);
                B.iToD(
                  {
                    mark: o,
                    x: n,
                    y: a,
                    oy: setting.DIMENSION.H_MA4K,
                    ox: setting.DIMENSION.posX,
                    e: i
                  },
                  !0,
                  !1
                );
              }
            }
          });
          u = d.getG();
        }
        var o,
          s,
          r,
          l,
          c,
          d,
          u,
          m = {},
          f = 1.3,
          v = 1.3,
          g = "solid",
          b = isNaN(a.nfloat) ? 2 : a.nfloat,
          y = e.isMain,
          setLineStyle = function(e) {
            if (
              ((o = oc(
                {
                  linetype: "solid",
                  linecolor: m
                },
                e || {}
              )),
              (m = o.linecolor),
              (r = m.K_N),
              (s = m.K_FALL),
              (l = m.K_RISE),
              (c = m.K_CL),
              !o.linetype && (o.linetype = g),
              (setting.datas.candle = o.linetype),
              0 == o.linetype.indexOf("line") ||
                0 == o.linetype.indexOf("mountain"))
            ) {
              var t = Number(o.linetype.split("_")[1]);
              (isNaN(t) || 0 >= t) && (t = v), (f = t);
            }
          },
          _ = function(t, n) {
            u.fillStyle = setting.COLOR.K_EXT;
            for (
              var a, i, o, s = !1, r = !1, l = e.datas, c = l.length;
              c--;

            ) {
              if (((o = l[c]), (a = n), !s && o.high == e.rangeMax)) {
                s = !0;
                var h = o.high.toFixed(b);
                99 > a
                  ? (u.textAlign = "left")
                  : a > setting.DIMENSION.w_k - 99
                  ? ((u.textAlign = "right"), (a -= 5))
                  : (u.textAlign = "center"),
                  (i = o.hy),
                  i < setting.STYLE.FONT_SIZE &&
                    (i = setting.STYLE.FONT_SIZE + 2),
                  u.fillText(h, a, i);
              }
              if (((a = n), !r && o.low == e.rangeMin)) {
                r = !0;
                var d = o.low.toFixed(b);
                99 > a
                  ? (u.textAlign = "left")
                  : a > setting.DIMENSION.w_k - 99
                  ? ((u.textAlign = "right"), (a -= 5))
                  : (u.textAlign = "center"),
                  (i = Math.floor(o.ly + setting.STYLE.FONT_SIZE + 2)),
                  i >
                    setting.DIMENSION.h_k + 0.5 * setting.STYLE.FONT_SIZE - 3 &&
                    (i = setting.DIMENSION.h_k),
                  u.fillText(d, a, i);
              }
              if (r && s) break;
              (n -= t), 0 > n && (n = 0);
            }
          },
          w = function() {
            var t = e.datas,
              n = t.length,
              a =
                setting.DIMENSION.w_k / Math.max(n, setting.PARAM.minCandleNum),
              i = 0.5 * a,
              o = z.x - a;
            d.beginPath();
            for (var s, r, l = 0; n > l; l++)
              (s = t[l]),
                (r = s.vy),
                d.drawVStickC(
                  o,
                  r,
                  i,
                  setting.DIMENSION.h_k,
                  setting.COLOR.V_SD
                ),
                (o += a);
            d.stroke();
          },
          k = function() {
            for (
              var t,
                n,
                a = e.datas,
                i = a.length,
                s =
                  setting.DIMENSION.w_k /
                  Math.max(i, setting.PARAM.minCandleNum),
                r = z.x - 0.4 * s,
                l = 0;
              i > l;
              l++
            )
              (n = a[l]),
                (t = n.cy),
                0 == l
                  ? (d.newStyle(c, !0, f), d.moveTo(r, t))
                  : d.lineTo(r, t),
                (n.ix = r),
                (r += s);
            d.stroke(),
              0 == o.linetype.indexOf("mountain") &&
                ((r -= s),
                d.lineTo(r, setting.DIMENSION.h_k),
                d.lineTo(z.x - 0.4 * s, setting.DIMENSION.h_k),
                d.newFillStyle_rgba(
                  setting.COLOR.M_ARR,
                  setting.DIMENSION.h_k,
                  setting.COLOR.M_ARR_A
                ),
                d.fill()),
              y && setting.custom.show_ext_marks && _(s, r);
          },
          S = function() {
            for (
              var t,
                n,
                a,
                i,
                o = e.datas,
                c = o.length,
                h =
                  setting.DIMENSION.w_k /
                  Math.max(c, setting.PARAM.minCandleNum),
                u = 0.6 * h,
                p = -1,
                m = 1,
                f = 0;
              3 > f;
              f++
            ) {
              switch (p) {
                case -1:
                  i = s;
                  break;
                case 0:
                  i = r;
                  break;
                case 1:
                  i = l;
              }
              for (t = z.x - h, d.beginPath(), a = 0; c > a; a++)
                (n = o[a]),
                  n.isFake ||
                    (n.kke_cs == p &&
                      d.drawCandleRect(t, n.oy, n.cy, u, i, n.kke_cs == m),
                    0 == f && (n.ix = t + u)),
                  (t += h);
              for (d.stroke(), t = z.x - h, d.beginPath(), a = 0; c > a; a++)
                (n = o[a]),
                  n.isFake ||
                    (n.kke_cs == p &&
                      d.drawCandleLineRect(
                        t,
                        n.hy,
                        n.oy,
                        n.cy,
                        n.ly,
                        u,
                        i,
                        n.kke_cs == m
                      )),
                  (t += h);
              d.stroke(), p++;
            }
            y && setting.custom.show_ext_marks && _(h, t);
          },
          M = function() {
            var t,
              n,
              a,
              i = e.datas,
              o = i.length,
              c =
                setting.DIMENSION.w_k / Math.max(o, setting.PARAM.minCandleNum),
              h = 0.6 * c,
              u = -1;
            h = Math.floor(h) % 2 === 0 ? Math.floor(h) : Math.floor(h) - 1;
            for (var p, m = 0; 3 > m; m++) {
              switch (u) {
                case -1:
                  p = s;
                  break;
                case 0:
                  p = r;
                  break;
                case 1:
                  p = l;
              }
              for (t = z.x - c, d.beginPath(), a = 0; o > a; a++)
                (n = i[a]),
                  n.isFake ||
                    (n.kke_cs == u &&
                      d.drawCandleRect_solid(t, n.oy, n.cy, h, p),
                    0 == m && (n.ix = t + h)),
                  (t += c);
              for (d.stroke(), t = z.x - c, d.beginPath(), a = 0; o > a; a++)
                (n = i[a]),
                  n.isFake ||
                    (n.kke_cs == u &&
                      d.drawCandleLineRect(
                        t,
                        n.hy,
                        n.oy,
                        n.cy,
                        n.ly,
                        h,
                        p,
                        !1
                      )),
                  (t += c);
              d.stroke(), u++;
            }
            y && setting.custom.show_ext_marks && _(c, t);
          },
          I = function() {
            for (
              var t,
                n,
                a,
                i,
                o = e.datas,
                c = o.length,
                h =
                  setting.DIMENSION.w_k /
                  Math.max(c, setting.PARAM.minCandleNum),
                u = 0.6 * h,
                p = -1,
                m = 0;
              3 > m;
              m++
            ) {
              switch (p) {
                case -1:
                  i = s;
                  break;
                case 0:
                  i = r;
                  break;
                case 1:
                  i = l;
              }
              for (t = z.x - h, d.beginPath(), a = 0; c > a; a++)
                (n = o[a]),
                  n.isFake ||
                    (0 == m && (n.ix = t + u),
                    n.kke_cs == p &&
                      d.drawOhlc(t, n.oy, n.hy, n.ly, n.cy, u, i)),
                  (t += h);
              d.stroke(), p++;
            }
            y && setting.custom.show_ext_marks && _(h, t);
          },
          draw = function() {
            y && d.drawBg(z.x);
            var t = e.datas;
            if (t) {
              var n =
                  0 == o.linetype.indexOf("line") ||
                  0 == o.linetype.indexOf("mountain"),
                a = 0 == o.linetype.indexOf("hollow"),
                i = 0 == o.linetype.indexOf("ohlc");
              d.clear(n, setting.PARAM.getHd()),
                d.newGStyle({
                  textBaseline: "bottom",
                  font:
                    setting.STYLE.FONT_SIZE + "px " + setting.STYLE.FONT_FAMILY
                }),
                y && setting.custom.show_underlay_vol && w(),
                n ? k() : a ? S() : i ? I() : M();
            }
          };
        this.draw = draw;
        this.clear = function(e) {
          e ? d.clear(!1, setting.PARAM.getHd()) : (d.remove(), (d = null));
        };
        this.resize = function() {
          d.resize({
            mh: setting.DIMENSION.H_MA4K
          }),
            draw();
        };
        this.setLineStyle = setLineStyle;
        this.getLineStyle = function() {
          return o;
        };
        setLineStyle(a);
        i();
      }
      function S() {
        var e,
          n,
          l,
          h,
          d = this,
          f = [],
          g = 0.05,
          y = function() {
            var e,
              t,
              n = Number.MAX_VALUE,
              i = -Number.MAX_VALUE,
              o = f.length,
              s = o > 1 || "percent" == setting.datas.scaleType;
            setting.custom.k_overlay && (s = !1);
            for (var r, l, c, h, d = s ? "Percent" : "Price", u = o; u--; )
              (e = f[u]),
                a.scalerange
                  ? (c = a.scalerange)
                  : ((h = e.getPriceTech()),
                    s || !h
                      ? (c = [i, n])
                      : ((t = h && h.getMaxMin()), (c = t || [i, n]))),
                (r = e["min" + d]),
                (l = e["max" + d]),
                isFinite(r) &&
                  isFinite(l) &&
                  ((n = Math.min(n, r, c[1])), (i = Math.max(i, l, c[0])));
            var p;
            p = a.scalerange
              ? a.scalerange.concat(4)
              : 1 == a.pcm
              ? 0.0199 > i - n
                ? [i, n, 1]
                : xh5_ADJUST_HIGH_LOW_c(i, n, 2, !1, !0)
              : xh5_ADJUST_HIGH_LOW_c(i, n, a.nfloat, !1, !0, g);
            for (var m = o; m--; ) (e = f[m]), e.setPricePos(p, s);
          },
          callSdDraw = function() {
            (viewState.start < 1 || !setting.custom.smooth) && z.resetX();
            for (var e = f.length; e--; ) f[e].draw();
          },
          w = function() {
            (viewState.start = viewState.end = 0 / 0),
              (viewState.currentLength = 0 / 0),
              (n = void 0);
          },
          k = function(t) {
            w();
            for (var n, a = f.length, i = 0; a > i; i++)
              (n = f[i]), n.onViewChange();
            y(), callSdDraw(), t || Y.onRange(e, a > 1);
          },
          S = [],
          M = !1,
          I = function(t) {
            return t.isErr
              ? (t !== e && d.removeCompare([t.symbol]), !0)
              : t.kDb.get()
              ? !0
              : (t.initData(onChangeView), !1);
          },
          A = function(e) {
            if (e && util.isFunc(e.callback)) {
              for (var n = !1, a = S.length; a--; )
                if (e.callback === S[a]) {
                  n = !0;
                  break;
                }
              !n && S.push(e.callback);
            }
          },
          C = function() {
            for (var t, n = !0, a = f.length; a--; )
              (t = f[a]), t == e || I(t) || ((n = !1), (M = !0));
            return n;
          },
          onChangeView = function(t, n) {
            if ((A(n), I(e))) {
              if (e.isErr) return void (e.isErr = !1);
              if ((B.patcher.switchFloater(), z.resetX(0), C()))
                for (M = !1, k(t); S.length; ) {
                  var a = S.shift();
                  a();
                }
              if ((Y.onViewChanged(), t)) return;
              Y.onDataUpdate(), Y.onViewPrice();
            }
          },
          H = function(t) {
            (t || (n && viewState.dataLength != n)) &&
              Y.onRange(e, f.length > 1),
              (n = viewState.dataLength);
          },
          D = function(e) {
            (e || viewState.end == viewState.dataLength) &&
              (B.update(), y(), callSdDraw(), H(!0)),
              Y.onDataUpdate(),
              !B.isIng() && Y.onViewPrice();
          },
          K = function(e) {
            clearTimeout(h),
              !P &&
                x.parentNode &&
                "none" != x.style.display &&
                (h = setTimeout(D, e || 200));
          },
          T = function() {
            if (!M) for (var e, t = f.length; t--; ) (e = f[t]), e.doUpdate(K);
          },
          U = function() {
            if ((clearInterval(l), !isNaN(a.rate))) {
              var e = 1e3 * a.rate;
              e > 0 && (l = setTimeout(U, e));
            }
            T();
          };
        this.mM = new (function() {
          var n = function(a, i, o) {
              var l, c;
              switch (i) {
                case "price":
                  if (((l = s), (c = "initPt"), util.isObj(a)))
                    a.name &&
                      "TZY" === String(a.name).toUpperCase() &&
                      (g = 0.2);
                  else if (util.isArr(a))
                    for (var h, d = a.length; d--; )
                      if (
                        ((h = a[d]),
                        h && h.name && "TZY" === String(h.name).toUpperCase())
                      ) {
                        g = 0.2;
                        break;
                      }
                  break;
                case "tech":
                  (l = r), (c = "initTc");
              }
              c &&
                (l
                  ? e[c](a, o)
                  : KKE.api(
                      "plugins.techcharts.get",
                      {
                        type: i
                      },
                      function(e) {
                        (r = e.tChart), (s = e.pChart), n(a, i, o);
                      }
                    ));
            },
            a = function(t, n) {
              var a;
              switch (n) {
                case "price":
                  (a = "removePt"), (g = 0.05);
                  break;
                case "tech":
                  a = "removeTc";
                  break;
                default:
                  return;
              }
              e && e[a](t);
            },
            i = function(t) {
              return o
                ? (E
                    ? (E.sh(t), (t.from || t.to) && E.dateFromTo(t.from, t.to))
                    : (e.initRs(), i(t), O.appendChild(E.getBody())),
                  void j.resizeAll(!0))
                : void KKE.api("plugins.rangeselector.get", null, function(e) {
                    (o = e), i(t);
                  });
            };
          (this.showRs = i),
            (this.newAC = n),
            (this.removeAC = a),
            (this.togglePt = function(t, n) {
              e && (e.togglePt(t, n), onChangeView());
            });
        })();
        var h5tM = new (function() {
          var n,
            i,
            o,
            s,
            r = !1,
            l = !1,
            h = function() {
              i || ((i = $C("div")), (i.style.margin = "0 auto")),
                (i.style.width = 0.8 * setting.DIMENSION.getStageW() + "px"),
                (i.style.height = 0.83 * setting.DIMENSION.h_k + "px");
            },
            d = function(e) {
              n.dateTo(e.date, function(e) {
                1 != e &&
                  q.showTip({
                    txt: globalCfg.nohistoryt,
                    parent: x
                  });
              });
            },
            u = function(t) {
              if (o && n) {
                l = !0;
                var a = n.getSymbols()[0];
                a != e.symbol &&
                  n.newSymbol({
                    symbol: e.symbol
                  }),
                  n.resize(),
                  d(t),
                  n.show(i);
              }
            },
            p = function() {
              l = !1;
            },
            f = function(n) {
              var a = {
                txt: e.getName() + "(" + e.symbol + ") " + dateUtil.ds(n.date),
                content: i,
                parent: x,
                fontColor: "#000",
                closeCb: p,
                btnLb: "\u5173\u95ed",
                bgStyle: {
                  backgroundColor: "#fff",
                  width: "80%",
                  top: "2%"
                }
              };
              return (
                o || (o = new util.TipM(setting.COLOR)), (a.content = i), a
              );
            },
            v = function(t) {
              var s = f(t);
              if ((o.genTip(s), n)) u(t);
              else {
                if (r) return;
                (r = !0),
                  KKE.api(
                    "chart.h5t.get",
                    {
                      symbol: e.symbol,
                      dom: i,
                      nfloat: a.nfloat
                    },
                    function(e) {
                      (n = e), (r = !1), u(t);
                    }
                  );
              }
            };
          (this.resetHisT = function() {
            o && o.hide();
          }),
            (this.isShowing = function() {
              return l;
            }),
            (this.historyT = function() {
              if ("CN" === util.market(e.symbol)) {
                s = B.getInteractiveIdx();
                var n = e.datas[s];
                if (n) {
                  if (n.date.getFullYear() < 2008)
                    return void q.showTip({
                      txt: globalCfg.historyt08,
                      parent: x
                    });
                  switch (setting.custom.history_t) {
                    case "layer":
                      h(), v(n);
                      break;
                    case "window":
                      var a =
                        "http://finance.sina.com.cn/h5charts/tchart.html?symbol=$symbol&date=$date&rangeselector=true&indicator=tvol";
                      a = a
                        .replace("$symbol", e.symbol)
                        .replace("$date", dateUtil.ds(n.date));
                      var i =
                        "width=600,height=375,location=0,menubar=0,titlebar=0,toolbar=0,alwaysRaised=1";
                      window.open(a, "_blank", i);
                      break;
                    default:
                      return;
                  }
                }
              }
            });
        })();
        this.h5tM = h5tM;
        this.getAllStock = function() {
          return f;
        };
        this.getMainStock = function() {
          return e;
        };
        this.getAllSymbols = function() {
          for (var e = [], t = 0, n = f.length; n > t; t++) e.push(f[t].symbol);
          return e;
        };
        var $ = function() {
          d.mM.togglePt(
            f.length > 1
              ? {
                  v: !1
                }
              : viewState.viewId == globalCfg.URLHASH.KCL ||
                viewState.viewId == globalCfg.URLHASH.KCLF ||
                viewState.viewId == globalCfg.URLHASH.KCLB
              ? {
                  v: !1
                }
              : {
                  v: !0
                }
          );
        };
        var moving = function(t, n, a, i, o) {
          if (
            (!a && z.resetX(),
            !(
              n - t < setting.PARAM.minCandleNum ||
              n > viewState.dataLength ||
              0 > t ||
              n - t > setting.PARAM.maxCandleNum
            ))
          ) {
            (viewState.start = t),
              (viewState.end = n),
              (viewState.currentLength = n - t);
            for (var s, r = f.length, l = 0; r > l; l++)
              (s = f[l]), s.setRange(i);
            y(), callSdDraw(), o || Y.onRange(e, r > 1);
          }
        };
        this.onChangeView = onChangeView;
        this.showYTD = function(t, n) {
          (viewState.viewId = globalCfg.URLHASH.KD + t), onChangeView(!0);
          var a = e.getYtdIndex(n);
          a && moving(a[0], a[1] + 1);
        };
        this.moving = moving;
        this.callSdDraw = callSdDraw;
        var G = function(t, n) {
          var a = t instanceof Obji ? t : new Obji(t, n);
          n && (e = a), f.push(a), $(), onChangeView();
        };
        var X = function(n) {
          if ("mink" == globalCfg.URLHASH.gt(viewState.viewId).type) {
            var a = util.market(n.symbol),
              i = util.market(e.symbol);
            if (a != i && ("US" == a || "US" == i)) return !1;
          }
          return !0;
        };
        this.compare = function(e) {
          for (var n = e.callback, a = f.length; a--; )
            if (f[a].symbol == e.symbol)
              return void (
                util.isFunc(n) &&
                n({
                  code: 1,
                  msg: "comparing same symbol"
                })
              );
          X(e)
            ? G(e, !1)
            : util.isFunc(n) &&
              n({
                code: 2,
                msg: "invalid comparing market or period"
              });
        };
        this.removeCompare = function(e, t) {
          for (var n, a, i = !1, o = e.length; o--; ) {
            a = e[o];
            for (var s = f.length; s--; )
              if (a == f[s].symbol) {
                (i = !0), (n = f.splice(s, 1)[0]), n.clear(t), (n = null);
                break;
              }
          }
          i && !t && ($(), y(), callSdDraw());
        };
        var Z,
          J = function(e) {
            e ? D() : viewState.end == viewState.dataLength && B.update();
          },
          Q = !1,
          ee = 0,
          te = function() {
            clearTimeout(Z), (Q = !1), (ee = 0);
          },
          ne = function() {
            Z = setTimeout(function() {
              ee > 0 && K(1), te();
            }, 500);
          };
        this.pushData = function(e, t) {
          var n = !1;
          switch (Number(t)) {
            case 0:
              te();
              break;
            case 1:
              te(), (n = !0);
              break;
            case 2:
              Q || ((Q = !0), ne());
          }
          for (var a = e.length; a--; )
            for (var i = f.length; i--; )
              if (f[i].symbol === e[a].symbol && e[a].data) {
                ee++,
                  f[i].doUpdate(fBind(J, null, n), !1, e[a].data, e[a].market);
                break;
              }
        };
        this.setScale = function(e) {
          (setting.datas.scaleType = e), y(), callSdDraw();
        };
        this.setLineStyle = function(n) {
          if (n) {
            !util.isArr(n) && (n = [n]);
            for (var a = n.length; a--; ) {
              var i = n[a];
              if (i.hasOwnProperty("symbol")) {
                for (var o = i.symbol, s = f.length; s--; )
                  if (f[s].symbol == o) {
                    f[s].setLineStyle(i), f[s].draw();
                    break;
                  }
              } else e.setLineStyle(i), e.draw();
            }
          } else e.setLineStyle(), e.draw();
        };
        this.onResize = function(e) {
          for (var t = f.length; t--; ) f[t].resize(e);
        };
        var ae = -1,
          ie = -1,
          oe = function(e, t) {
            var n = viewState.start,
              a = viewState.end,
              i = e / Math.abs(e),
              o = i * Math.ceil((a - n) / setting.PARAM.zoomUnit);
            if (
              (Math.abs(o) > setting.PARAM.zoomLimit &&
                (o = i * setting.PARAM.zoomLimit),
              setting.custom.centerZoom)
            ) {
              var s = t ? t.layerX / setting.DIMENSION.w_k : 0.5;
              s < setting.PARAM.zoomArea
                ? (a = Math.min(a - o * Math.abs(o), viewState.dataLength))
                : s > 1 - setting.PARAM.zoomArea
                ? (n = Math.max(n + o * Math.abs(o), 0))
                : ((n = Math.max(n + o * Math.abs(o), 0)),
                  (a = Math.min(a - o * Math.abs(o), viewState.dataLength)));
            } else n = Math.max(n + o * Math.abs(o), 0);
            return n == ae && a == ie ? [-1] : ((ae = n), (ie = a), [n, a]);
          };
        this.onWheel = function(e) {
          if (!h5tM.isShowing()) {
            var t = e.detail || -1 * e.wheelDelta;
            if (0 != t) {
              var n = oe(t, e);
              moving(n[0], n[1]);
            }
          }
        };
        this.onKb = function(e) {
          if ("keyup" == e.type) return void B.iToKb(null, !0);
          var t = e.keyCode;
          if (h5tM.isShowing()) return void (27 == t && h5tM.resetHisT());
          switch (t) {
            case 38:
            case 40:
              var n = oe(38 == t ? 1 : -1);
              moving(n[0], n[1]);
              break;
            case 37:
            case 39:
              var a = B.iToKb(37 == t ? -1 : 1);
              a && (moving(viewState.start + a, viewState.end + a), B.iToKb(0));
              break;
            case 13:
              h5tM.historyT();
              break;
            default:
              return;
          }
          xh5_EvtUtil.preventDefault(e);
        };
        this.zoomApi = function(e) {
          var t = oe(e ? 1 : -1);
          moving(t[0], t[1]);
        };
        this.moveApi = function(e) {
          var t = viewState.start,
            n = viewState.end;
          (t += e),
            (n += e),
            n > viewState.dataLength &&
              ((n = viewState.dataLength),
              (t = viewState.start + n - viewState.end)),
            0 > t && ((t = 0), (n = viewState.end - viewState.start)),
            moving(t, n);
        };
        this.shareTo = function(e) {
          e = oc(
            {
              type: "weibo",
              url: window.location.href,
              wbtext: "",
              qrwidth: 100,
              qrheight: 100,
              extra: void 0
            },
            e || {}
          );
          var n = String(e.type).toLowerCase();
          switch (n) {
            case "qrcode":
              KKE.api(
                "utils.qrcode.createcanvas",
                {
                  text: e.url,
                  width: e.qrwidth,
                  height: e.qrheight
                },
                function(e) {
                  q.showTip({
                    content: e,
                    txt:
                      '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                    parent: x,
                    btnLb: "\u5173\u95ed"
                  });
                }
              );
              break;
            default:
              util.grabM.shareTo({
                ctn: x,
                w: setting.DIMENSION.getStageW(),
                h: setting.DIMENSION.getStageH() - (O.clientHeight || 0),
                ignoreZIdxArr: [setting.PARAM.I_Z_INDEX],
                ignoreIdArr: [setting.PARAM.LOGO_ID],
                priorZIdx: setting.PARAM.G_Z_INDEX,
                nologo: !1,
                top: setting.DIMENSION.posY + setting.DIMENSION.H_MA4K + 17,
                right: setting.DIMENSION.RIGHT_W + setting.DIMENSION.K_RIGHT_W,
                LOGO_W: setting.DIMENSION.LOGO_W,
                LOGO_H: setting.DIMENSION.LOGO_H,
                color: setting.COLOR.LOGO,
                bgColor: setting.COLOR.BG,
                txt: e.wbtext,
                url: e.url,
                extra: e.extra
              });
          }
        };
        this.getExtraData = function(n) {
          if (
            ((n = oc(
              {
                symbol: e.symbol,
                name: null,
                clone: !0
              },
              n || {}
            )),
            !n.name)
          )
            return null;
          for (var a, i, o = f.length; o--; )
            if (f[o].symbol === n.symbol) {
              a = f[o];
              break;
            }
          if (a) {
            var s;
            "currentK" == n.name
              ? ((s = a.kDb.get()), (i = n.clone ? util.clone(s, null) : s))
              : ((s = a.extraDataObj[n.name]),
                (i = n.clone ? util.clone(s, null) : s));
          }
          return i;
        };
        this.updateDataAll = U;
        this.outputNewRange = H;
        this.dcReset = function() {
          clearInterval(l);
          clearTimeout(h);
          for (var e, t = f.length; t--; ) {
            e = f.splice(t, 1)[0];
            e.clear();
            e = null;
          }
        };
        this.dcInit = function(e) {
          G(e, !0);
          U();
        };
      }
      util.xh5_EvtDispatcher.call(this);
      var me = this;
      a = oc(
        {
          candlenum: 0 / 0,
          datas: {
            day: {
              wfn: void 0,
              url: void 0,
              dataformatter: void 0,
              staticdata: void 0
            },
            min: {
              wfn: void 0,
              url: void 0,
              dataformatter: void 0,
              staticdata: void 0
            }
          },
          dim: null,
          dom: void 0,
          domid: void 0,
          fh5: !1,
          maxcandlenum: 0 / 0,
          mincandlenum: 0 / 0,
          mh: 0,
          name: void 0,
          nfloat: 2,
          noh5: void 0,
          nohtml5info: void 0,
          ondataupdate: void 0,
          onrange: void 0,
          onviewchanged: void 0,
          onviewprice: void 0,
          ontechchanged: void 0,
          onshortclickmain: void 0,
          pcm: 0,
          rate: 0 / 0,
          reorder: !0,
          reheight: !0,
          scalerange: void 0,
          ssl: !0,
          symbol: "sh000001",
          tchartobject: {
            t: void 0,
            k: void 0
          },
          theme: null,
          trace: void 0,
          view: "kd",
          w: 0 / 0,
          h: 0 / 0,
          zoomlimit: 0 / 0,
          zoomunit: 0 / 0
        },
        a || {
          WANGXuan: "wangxuan2@staff.sina.com.cn",
          VER: "2.11.0"
        }
      );
      var setting;
      !(function() {
        if (
          (!a.symbol && (a.symbol = "sh000001"),
          (a.symbol = String(a.symbol)),
          (a.rawSymbol = String(a.symbol)),
          (a.symbol =
            "LSE" === util.market(a.symbol)
              ? util.strUtil.replaceStr(a.symbol)
              : a.symbol.replace(".", "$")),
          (setting = settinger.getSetting(
            [
              "_",
              a.symbol,
              "_",
              Math.floor(1234567890 * Math.random() + 1) +
                Math.floor(9876543210 * Math.random() + 1)
            ].join("")
          )),
          0 == location.protocol.indexOf("https:") && (a.ssl = !0),
          isNaN(a.rate) && (a.rate = setting.PARAM.updateRate),
          !isNaN(a.mincandlenum) &&
            a.mincandlenum > 0 &&
            (setting.PARAM.minCandleNum = a.mincandlenum),
          !isNaN(a.candlenum) &&
            a.candlenum >= setting.PARAM.minCandleNum &&
            (setting.PARAM.defaultCandleNum = a.candlenum),
          isNaN(a.maxcandlenum) ||
            (setting.PARAM.maxCandleNum = a.maxcandlenum),
          !isNaN(a.zoomunit) &&
            a.zoomunit > setting.PARAM.minCandleNum &&
            (setting.PARAM.zoomUnit = a.zoomunit),
          !isNaN(a.zoomlimit) &&
            a.zoomlimit > 0 &&
            (setting.PARAM.zoomLimit = Math.round(a.zoomlimit)),
          xh5_BrowserUtil.noH5)
        ) {
          if ("undefined" == typeof FlashCanvas || a.fh5)
            return void (util.isFunc(a.noh5) && a.noh5(a));
          setting.PARAM.isFlash = !0;
        }
        if (
          (setting.PARAM.isFlash && (setting.COLOR.F_BG = "#fff"),
          a.reorder || (setting.custom.indicator_reorder = !1),
          a.reheight || (setting.custom.indicator_reheight = !1),
          a.dim)
        )
          for (var n in a.dim)
            a.dim.hasOwnProperty(n) &&
              util.isNum(setting.DIMENSION[n]) &&
              (setting.DIMENSION[n] = a.dim[n]);
      })();

      var I,
        A,
        x,
        C,
        R,
        H,
        D,
        O,
        K,
        T,
        U,
        E,
        F,
        P = !1,
        $ = 0,
        viewState = {
          viewId: globalCfg.URLHASH.vi(a.view || "kd"),
          dataLength: 0 / 0,
          start: 0 / 0,
          end: 0 / 0,
          currentLength: 0 / 0,
          startDate: void 0,
          endDate: void 0,
          movY: 0
        },
        z = {
          x: 0,
          resetX: function(e) {
            this.x = isNaN(e)
              ? setting.DIMENSION.w_k /
                Math.max(viewState.currentLength, setting.PARAM.minCandleNum)
              : e;
          }
        },
        q = new (function() {
          var e;
          (this.showTip = function(n) {
            e || (e = new util.TipM(setting.COLOR)), e.genTip(n);
          }),
            (this.hideTip = function() {
              e && e.hide();
            });
        })(),
        Y = new (function() {
          var e = function() {
            var e = K.get(viewState.viewId);
            return e ? e[e.length - 1] : null;
          };
          this.onRange = function(e, n) {
            !P &&
              util.isFunc(a.onrange) &&
              a.onrange({
                isCompare: n,
                data: e.datas,
                viewRangeState: util.clone(viewState, null),
                width: setting.DIMENSION.w_k,
                height: setting.DIMENSION.h_k,
                left: setting.DIMENSION.posX,
                top: setting.DIMENSION.H_MA4K,
                range: [e.labelMaxP, e.labelMinP, e.labelMaxVol],
                minCandleNum: setting.PARAM.minCandleNum
              });
          };
          var n = [];
          (this.onViewPrice = function(i, o, s, r, l, c) {
            if (!P && util.isFunc(a.onviewprice)) {
              if (!i) {
                if (((i = e()), !i)) return;
                o = viewState.currentLength - 1;
              }
              if (!s) {
                for (; n.length; ) n.length--;
                for (
                  var h, d, u, p, m = I.getAllStock(), f = 0, v = m.length;
                  v > f;
                  f++
                )
                  (p = m[f]),
                    (h = p.datas),
                    !h ||
                      h.length <= o ||
                      ((d = p.getName()),
                      (u = h[o]),
                      !r && m[f].isMain && (r = h),
                      n.push({
                        name: d,
                        data: u,
                        rangedata: h,
                        symbol: p.symbol,
                        color: p.getLineStyle().linecolor
                      }));
                s = n;
              }
              l || (l = I.getMainStock().getName()),
                a.onviewprice({
                  data: util.clone(i, null),
                  rangedata: r,
                  idx: o,
                  left: setting.DIMENSION.posX,
                  top: setting.DIMENSION.H_MA4K,
                  data_array: s,
                  curname: l,
                  interacting: !!c
                });
            }
          }),
            (this.onDataUpdate = function() {
              if (util.isFunc(a.ondataupdate)) {
                var n = e();
                n &&
                  a.ondataupdate({
                    data: util.clone(n, null),
                    idx: viewState.currentLength - 1,
                    left: setting.DIMENSION.posX,
                    top: setting.DIMENSION.H_MA4K
                  });
              }
            }),
            (this.onViewChanged = function() {
              util.isFunc(a.onviewchanged) &&
                a.onviewchanged({
                  viewRangeState: util.clone(viewState, null)
                });
            }),
            (this.onInnerResize = function(e) {
              util.isFunc(a.oninnerresize) && a.oninnerresize(e);
            }),
            (this.onTechChanged = function(e) {
              util.isFunc(a.ontechchanged) &&
                a.ontechchanged({
                  Indicator: e
                });
            }),
            (this.shortClickHandler = function() {
              util.isFunc(a.onshortclickmain) && a.onshortclickmain();
            });
        })(),
        j = new (function() {
          var e,
            n,
            i,
            o,
            s,
            r = 37,
            h = function(e, t, n) {
              var i = !1;
              isNaN(e) && (e = a.w || A.offsetWidth),
                isNaN(t) && (t = a.h || A.offsetHeight - a.mh);
              for (
                var o,
                  s = O.clientHeight || 0,
                  r = D.clientHeight || 0,
                  l = setting.DIMENSION.getOneWholeTH(),
                  c = 0,
                  h = D.childNodes,
                  d = h.length,
                  u = 0,
                  p = h.length;
                p--;

              )
                (o = h[p]),
                  o.id.indexOf("blankctn") >= 0
                    ? ((c = o.offsetHeight), d--, (u += c))
                    : (u += l);
              return (
                !isNaN(n) && (r -= n),
                r / (t - s) > 1 && ((r = u), (i = !0)),
                setting.DIMENSION.setStageW(e),
                1 == $
                  ? d > 0 &&
                    (setting.DIMENSION.setStageH(t, d * l + c + s),
                    (i = !0),
                    ($ = 0))
                  : setting.DIMENSION.setStageH(t, r + s),
                i
              );
            },
            d = function() {
              s && (s.style.display = setting.custom.show_logo ? "" : "none");
            },
            p = function() {
              (F = new util.LoadingSign()), F.appendto(C);
            },
            m = function() {
              F.setPosition();
            },
            f = function(e, n, a) {
              var o = h(n, a, 0 / 0);
              if (e || (n && a)) {
                if (!I) return;
                I.onResize(o), B.onResize();
              }
              (i.style.left = "1px"),
                (i.style.top =
                  setting.DIMENSION.h_k + setting.DIMENSION.H_MA4K + "px"),
                d(),
                m(),
                util.stc("k_wh", [
                  setting.DIMENSION.getStageW(),
                  setting.DIMENSION.getStageH()
                ]);
            },
            v = function() {
              (A = $DOM(a.domid) || a.dom),
                A || ((A = $C("div")), document.body.appendChild(A)),
                (x = $C("div")),
                (x.style.position = "relative"),
                (x.style.outlineStyle = "none"),
                (x.style.webkitUserSelect = x.style.userSelect = x.style.MozUserSelect =
                  "none"),
                (C = $C("div", "mainarea_" + setting.uid)),
                (R = $C("div")),
                C.appendChild(R),
                (H = $C("div")),
                (H.style.position = "absolute"),
                (H.style.fontSize = H.style.lineHeight =
                  setting.STYLE.FONT_SIZE + "px"),
                (H.style.width = "100%"),
                C.appendChild(H),
                x.appendChild(C),
                (D = $C("div")),
                x.appendChild(D),
                (O = $C("div")),
                x.appendChild(O),
                (e = new xh5_Canvas({
                  width: r,
                  height: setting.DIMENSION.H_TIME_PART
                })),
                (n = e.g),
                (i = e.canvas),
                (i.style.position = "absolute"),
                x.appendChild(i),
                A.appendChild(x);
            },
            b = function(e) {
              var n = !1;
              if (e) {
                E && (n = E.setTheme(e));
                for (var a in e)
                  e.hasOwnProperty(a) &&
                    setting.COLOR.hasOwnProperty(a) &&
                    setting.COLOR[a] !== e[a] &&
                    ((setting.COLOR[a] = e[a]), (n = !0));
                util.stc("k_thm", e);
              }
              return (
                n &&
                  logoM.styleLogo({
                    logo: s,
                    color: setting.COLOR.LOGO
                  }),
                n
              );
            },
            y = function(e) {
              !setting.custom.mousewheel_zoom ||
                (document.activeElement !== x &&
                  document.activeElement.parentNode !== x) ||
                (I && I.onWheel(e),
                xh5_EvtUtil.preventDefault(e),
                xh5_EvtUtil.stopPropagation(e));
            },
            k = function(e) {
              setting.custom.keyboard && I && I.onKb(e);
            },
            S = function() {
              util.xh5_deviceUtil.istd ||
                (xh5_BrowserUtil.info.name.match(/firefox/i)
                  ? xh5_EvtUtil.addHandler(x, "DOMMouseScroll", y)
                  : xh5_EvtUtil.addHandler(x, "mousewheel", y),
                (x.tabIndex = 0),
                xh5_EvtUtil.addHandler(x, "keyup", k),
                xh5_EvtUtil.addHandler(x, "keydown", k));
            },
            M = function(e) {
              (s = e), x.appendChild(e);
            };
          v(),
            p(),
            b(a.theme),
            f(),
            S(),
            logoM.getLogo({
              cb: M,
              id: setting.PARAM.LOGO_ID,
              isShare: !1,
              top: setting.DIMENSION.posY + setting.DIMENSION.H_MA4K + 17,
              right: setting.DIMENSION.RIGHT_W + setting.DIMENSION.K_RIGHT_W,
              LOGO_W: setting.DIMENSION.LOGO_W,
              LOGO_H: setting.DIMENSION.LOGO_H,
              color: setting.COLOR.LOGO
            }),
            xh5_BrowserUtil.noH5 &&
              (q.showTip({
                txt: a.nohtml5info || globalCfg.nohtml5info,
                parent: x
              }),
              util.stc("k_nh5")),
            (this.resizeAll = f),
            (this.innerResize = function(e) {
              I &&
                (h(0 / 0, 0 / 0, e),
                I.onResize(),
                B.onResize(),
                m(),
                Y.onInnerResize({
                  height: setting.DIMENSION.h_k
                }));
            }),
            (this.initTheme = b),
            (this.drawReMark = function(t) {
              if (t) {
                if (((i.style.display = ""), o == t)) return;
                var a = setting.DIMENSION.H_TIME_PART;
                (o = t),
                  e.resize({
                    width: r,
                    height: a,
                    hd: setting.PARAM.getHd()
                  }),
                  (n.font = "12px " + setting.STYLE.FONT_FAMILY),
                  (n.textBaseline = "top"),
                  (n.fillStyle = setting.COLOR.REMARK_BG),
                  n.fillRect(0, 0, r, a),
                  (n.fillStyle = setting.COLOR.REMARK_T),
                  n.fillText(t, 0, 0);
              } else i.style.display = "none";
            });
        })(),
        B = new (function() {
          var e,
            n,
            i,
            o,
            s = util.market(a.symbol),
            r = /^forex|^HF/.test(s),
            d = isNaN(a.nfloat) ? 2 : a.nfloat,
            u = 150,
            p = new (function() {
              var t = function(t) {
                var n = e.body.style;
                t && setting.custom.show_floater
                  ? ((n.backgroundColor = setting.COLOR.F_BG),
                    (n.color = setting.COLOR.F_T),
                    (n.border = "1px solid " + setting.COLOR.F_BR),
                    (n.display = ""))
                  : (n.display = "none");
              };
              (this.pv = function(n) {
                var a = e.body.style,
                  i = Math.max(setting.DIMENSION.posX, 55) + 9;
                (a.left =
                  (n.x > setting.DIMENSION.getStageW() >> 1
                    ? i
                    : setting.DIMENSION.getStageW() - u - 9) + "px"),
                  (a.top = (n.y || 0) + "px"),
                  t(!0);
              }),
                (this.showFloater = t);
            })(),
            f = function() {
              function a() {
                var e,
                  n,
                  a =
                    "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;",
                  i =
                    "font-weight:normal;border:0;height:16px;text-align:center",
                  o =
                    "text-align:left;font-weight:normal;border:0;height:16px;padding:0",
                  s = "text-align:right;border:0;height:16px;padding:0",
                  h = $C("div"),
                  p = h.style;
                (p.position = "absolute"),
                  (p.zIndex = setting.PARAM.I_Z_INDEX + 2),
                  (p.padding = "2px"),
                  (p.width = u + "px"),
                  (p.lineHeight = "16px"),
                  (p.display = "none"),
                  (p.fontSize = "12px");
                var f,
                  v,
                  g,
                  b,
                  N = $C("table"),
                  _ = $C("thead"),
                  w = $C("tbody");
                (N.style.cssText = a),
                  (f = $C("tr")),
                  (v = $C("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = i);
                var k = $C("span");
                v.appendChild(k),
                  f.appendChild(v),
                  _.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = i);
                var S = $C("span");
                v.appendChild(S),
                  f.appendChild(v),
                  w.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u5f00\u76d8");
                var M = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(M),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u6700\u9ad8");
                var I = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(I),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u6700\u4f4e");
                var A = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(A),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u6536\u76d8");
                var x = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(x),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u6da8\u8dcc");
                var C = $C("span");
                if (
                  ((g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(C),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  !r)
                ) {
                  (f = $C("tr")),
                    (v = $C("th")),
                    (v.style.cssText = o),
                    (g = $C("td")),
                    (b = $C("span")),
                    (b.innerHTML = "\u6210\u4ea4");
                  var R = $C("span");
                  (g.style.cssText = s),
                    v.appendChild(b),
                    g.appendChild(R),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    (f = $C("tr")),
                    (v = $C("th")),
                    (v.style.cssText = o),
                    (g = $C("td")),
                    (b = $C("span")),
                    (b.innerHTML = "\u6362\u624b");
                  var H = $C("span");
                  (g.style.cssText = s),
                    v.appendChild(b),
                    g.appendChild(H),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    (H.innerHTML = "--");
                }
                (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u632f\u5e45");
                var D = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(D),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u76d8\u540e\u91cf");
                var O = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(O),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f.id = "__floatingPostVolume"),
                  (f.style.display = "none"),
                  (f = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = o),
                  (g = $C("td")),
                  (b = $C("span")),
                  (b.innerHTML = "\u76d8\u540e\u989d");
                var K = $C("span");
                (g.style.cssText = s),
                  v.appendChild(b),
                  g.appendChild(K),
                  f.appendChild(v),
                  f.appendChild(g),
                  w.appendChild(f),
                  (f.id = "__floatingPostAmount"),
                  (f.style.display = "none"),
                  (O.innerHTML = K.innerHTML = "--"),
                  N.appendChild(_),
                  N.appendChild(w),
                  (N.style.width = "100%"),
                  h.appendChild(N);
                var T,
                  U,
                  E = function(e, t) {
                    var n = setting.COLOR.F_N;
                    return (
                      e > t
                        ? (n = setting.COLOR.F_RISE)
                        : t > e && (n = setting.COLOR.F_FALL),
                      n
                    );
                  },
                  F = function(e, t) {
                    return t
                      ? "(" + (((e - t) / t) * 100).toFixed(2) + "%)"
                      : "(--%)";
                  };
                (this.setFloaterData = function(a) {
                  if (
                    ((e = a.name || a.symbol || e || ""),
                    (k.innerHTML = e),
                    (T = a.data || n))
                  ) {
                    (n = T), (U = a.stock || U);
                    var i = U.market,
                      o = "";
                    switch (i) {
                      case "CN":
                      case "OTC":
                      case "REPO":
                        o = util.isCNK(U.symbol) ? "\u80a1" : "\u624b";
                        break;
                      case "US":
                      case "HK":
                        o = "\u80a1";
                        break;
                      default:
                        o = "";
                    }
                    var s = T.percent,
                      c = T.open,
                      h = T.close,
                      u = T.high,
                      p = T.low,
                      f = h / (1 + s) || T.prevclose;
                    S.innerHTML =
                      dateUtil.ds(T.date, "/") +
                      "/" +
                      dateUtil.nw(T.date.getDay()) +
                      (T.time || "");
                    var v = 1 > f || 1 > u || 1 > p ? 4 : d;
                    (M.innerHTML = c.toFixed(v) + F(c, f, v)),
                      (I.innerHTML = u.toFixed(v) + F(u, f, v)),
                      (A.innerHTML = p.toFixed(v) + F(p, f, v)),
                      (x.innerHTML = h.toFixed(v) + F(h, f, v)),
                      (s =
                        isNaN(s) || !isFinite(s) ? "--" : (100 * s).toFixed(2)),
                      (C.innerHTML = T.change.toFixed(v) + "(" + s + "%)");
                    var g = isNaN(T.ampP) ? "--" : (100 * T.ampP).toFixed(2);
                    if (
                      (T.ampP === 1 / 0 && (g = "--"),
                      (D.innerHTML = T.amplitude.toFixed(v) + "(" + g + "%)"),
                      (C.style.color = E(s, 0)),
                      (M.style.color = E(c, f)),
                      (I.style.color = E(u, f)),
                      (A.style.color = E(p, f)),
                      (x.style.color = E(h, f)),
                      r || (R.innerHTML = ps(T.volume, 2) + o),
                      H && U)
                    ) {
                      var b = U.extraDataObj.rsAmount;
                      if (b) {
                        for (var N, _ = 0, w = b.length; w > _; _++)
                          if (T.date >= b[_].date) {
                            N = b[_].amount;
                            break;
                          }
                        U.hq && U.hq.isKCB && N && (N *= 100),
                          N && (H.innerHTML = (T.volume / N).toFixed(2) + "%");
                      } else H.innerHTML = "--";
                    }
                    24 === viewState.viewId ||
                    23 === viewState.viewId ||
                    25 === viewState.viewId
                      ? U.hq &&
                        U.hq.isKCB &&
                        (($DOM("__floatingPostVolume").style.display =
                          "table-row"),
                        ($DOM("__floatingPostAmount").style.display =
                          "table-row"),
                        T.postVol
                          ? ((O.innerHTML = ps(T.postVol, 0) + o),
                            (K.innerHTML = ps(T.postAmt, 2)))
                          : ((K.innerHTML = "--"), (O.innerHTML = "--")))
                      : (($DOM("__floatingPostVolume").style.display = "none"),
                        ($DOM("__floatingPostAmount").style.display = "none"));
                  }
                }),
                  (this.body = h),
                  (this.reset = function() {
                    (e = null), (n = null);
                  });
              }
              (n = new a()), (e = n);
            },
            v = function() {
              function e(e) {
                var t = $C("div"),
                  n = $C("div"),
                  a = $C("span"),
                  i = 12,
                  o = e.isH,
                  s = function() {
                    if (
                      ((n.style.borderStyle = "dashed"),
                      (n.style.borderColor = setting.COLOR.IVH_LINE),
                      (a.style.backgroundColor = setting.COLOR[e.txtBgCN]),
                      (a.style.color = setting.COLOR[e.txtCN]),
                      o)
                    )
                      (n.style.borderWidth = "1px 0 0 0"),
                        (t.style.width = n.style.width =
                          setting.DIMENSION.getStageW() + "px"),
                        (a.style.top = -(0.6 * setting.STYLE.FONT_SIZE) + "px"),
                        (a.style.width = setting.DIMENSION.extend_draw
                          ? ""
                          : setting.DIMENSION.posX + "px"),
                        (a.style.left = 0),
                        (a.style.padding = "1px 0");
                    else {
                      n.style.borderWidth = "0 1px 0 0";
                      var i,
                        s,
                        r = setting.DIMENSION.H_MA4K + setting.DIMENSION.H_T_B;
                      setting.DIMENSION.getStageH() < 0
                        ? ((i = D.clientHeight), (s = i - r))
                        : ((i =
                            setting.DIMENSION.getStageH() - O.clientHeight ||
                            0),
                          (s = setting.DIMENSION.h_k)),
                        (i -= r),
                        (i += setting.DIMENSION.I_V_O),
                        (t.style.height = n.style.height = i + "px"),
                        (a.style.top = s + "px"),
                        (a.style.padding = "2px 2px 1px");
                    }
                  };
                (t.style.position = "absolute"),
                  (t.style.zIndex = setting.PARAM.I_Z_INDEX - 2),
                  (a.style.position = n.style.position = "absolute"),
                  (n.style.zIndex = 0),
                  (a.style.zIndex = 1),
                  (a.style.font =
                    setting.STYLE.FONT_SIZE +
                    "px " +
                    setting.STYLE.FONT_FAMILY),
                  (a.style.whiteSpace = "nowrap"),
                  (a.style.lineHeight = i + "px"),
                  e.txtA && (a.style.textAlign = e.txtA),
                  s(),
                  t.appendChild(a),
                  t.appendChild(n);
                var r = function(e) {
                  e
                    ? "" != t.style.display && (t.style.display = "")
                    : "none" != t.style.display && (t.style.display = "none");
                };
                (this.pv = function(e) {
                  if (
                    (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"),
                    (a.innerHTML = e.v || ""),
                    !isNaN(e.x))
                  ) {
                    e.x < 0 && (e.x = 0);
                    var n = e.x + (e.ox || 0),
                      i = setting.DIMENSION.getStageW();
                    (n = ~~(n + 0.5)), (n -= 1), (t.style.left = n + "px");
                    var o = a.offsetWidth || 66,
                      s = o >> 1;
                    e.x < s ? (s = e.x) : n + s > i && (s = n + o - i),
                      (a.style.left = -s + "px");
                  }
                  r(!0);
                }),
                  (this.display = r),
                  (this.body = t),
                  (this.resize = s),
                  r(!1);
              }
              (i = new e({
                isH: !0,
                txtCN: "P_TC",
                txtBgCN: "P_BG",
                txtA: "right"
              })),
                (o = new e({
                  isH: !1,
                  txtCN: "T_TC",
                  txtBgCN: "T_BG",
                  txtA: "center"
                })),
                x.appendChild(o.body);
            },
            g = function() {
              i.display(!1), o.display(!1), p.showFloater(!1);
            },
            b = function(e) {
              T && T.indirectI(e), U && U.indirectI(e);
            },
            N = !1,
            w = !1,
            k = 0 / 0,
            S = !1;
          (this.getInteractiveIdx = function() {
            return k;
          }),
            (this.isIng = function() {
              return N;
            }),
            (this.isMoving = function() {
              return S;
            });
          var A = 0 / 0,
            R = 0 / 0,
            H = [];
          this.iToD = function(t, n, a) {
            if (!t.e || !w) {
              var s = t.x,
                r = t.ox || 0,
                l = t.y,
                c = t.oy || 0,
                h = t.e ? t.e.target : null;
              if (!a) {
                if (A == s && R == l) return;
                (A = s), (R = l);
              }
              if (h) {
                var u = h.style.height.split("px")[0];
                (0 > l || l > u) && ((s = 0 / 0), (l = 0 / 0));
              }
              var m = viewState.currentLength,
                f = Math.max(m, setting.PARAM.minCandleNum);
              s += setting.DIMENSION.w_k / f - z.x;
              var v = Math.floor((s * f) / setting.DIMENSION.w_k);
              if (
                (0 > v ? (v = 0) : v >= m && (v = m - 1),
                !isNaN(v) && (k = v),
                isNaN(s) && isNaN(l))
              )
                return (N = !1), g(), b(Number.MAX_VALUE), void Y.onViewPrice();
              N = viewState.end != viewState.dataLength ? !0 : m - 1 > v;
              for (var y, S, x, C, D, O, K, T = Number(t.mark); H.length; )
                H.length--;
              if (n) {
                var U = I.getAllStock(),
                  E = U.length,
                  F = E > 1 || "percent" == setting.datas.scaleType;
                setting.custom.k_overlay && (F = !1);
                for (var P, $, q, j, B = Number.MAX_VALUE, W = 0; E > W; W++)
                  (q = U[W]),
                    (D = q.datas),
                    !D ||
                      D.length <= v ||
                      ((P = q.getName()),
                      ($ = D[v]),
                      H.push({
                        name: P,
                        data: $,
                        rangedata: D,
                        symbol: q.symbol,
                        color: q.getLineStyle().linecolor
                      }),
                      $.isFake ||
                        ((j = Math.abs($.cy - l)),
                        B > j &&
                          ((B = j),
                          (C = q),
                          (x = $),
                          (K = D),
                          (S = P),
                          (y = C.symbol))));
                if (F)
                  (O = 100 * T),
                    (O = Math.abs(O) > 999 ? Math.floor(O) : O.toFixed(2)),
                    (O += "%");
                else if (
                  ((O =
                    T > 99999 ? Math.floor(T) : T.toFixed(T > 9999 ? 1 : d)),
                  setting.custom.show_k_rangepercent && C)
                ) {
                  var G = ((T - C.prevclose) / C.prevclose) * 100;
                  (G = isNaN(G) || !isFinite(G) ? "--" : G.toFixed(d)),
                    (O += "<br/>" + G + "%");
                }
              } else {
                if (
                  ((C = I.getMainStock()), (D = C.datas), !D || D.length <= v)
                )
                  return;
                (x = D[v]), (K = D), (S = C.getName()), (y = C.symbol);
                var X = Math.abs(T);
                (O = X > 99999 ? Math.floor(T) : T.toFixed(X > 9999 ? 1 : d)),
                  H.push({
                    name: S,
                    data: x,
                    rangedata: K,
                    symbol: y,
                    color: C.getLineStyle().linecolor
                  });
              }
              if (x) {
                var Z = s;
                setting.custom.stick && (s = x.ix || s),
                  e &&
                    (e.setFloaterData({
                      symbol: y,
                      name: S,
                      data: x,
                      stock: C,
                      arr: H
                    }),
                    p.pv({
                      x: Z,
                      y: setting.DIMENSION.K_F_T
                    })),
                  i.pv({
                    y: l,
                    v: O,
                    oy: c
                  }),
                  o.pv({
                    x: s,
                    ox: r,
                    y: setting.DIMENSION.H_MA4K,
                    v: x.day + " " + (x.time || "")
                  }),
                  b(v),
                  !S && (S = y || "--"),
                  Y.onViewPrice(x, v, H, K, S, !0),
                  me.re(globalCfg.e.I_EVT, t.e);
              }
            }
          };
          var K, E, F;
          this.iToKb = function(e, t) {
            if (t) return void (w = !1);
            if (
              ((w = !0),
              (k += e),
              !$CONTAINS(C, B.iHLineO.body) && C.appendChild(B.iHLineO.body),
              (K = I.getMainStock()),
              (F = K.getName()),
              (E = K.datas),
              !E)
            )
              return void 0;
            if (0 > k) return (k = 0), -1;
            if (k >= E.length) return (k = E.length - 1), 1;
            var n = E[k];
            if (!n) return void 0;
            var a = {
              mark:
                K.labelMaxP -
                (n.cy / setting.DIMENSION.h_k) * (K.labelMaxP - K.labelMinP),
              x: n.ix,
              y: n.cy,
              oy: setting.DIMENSION.H_MA4K,
              ox: setting.DIMENSION.posX
            };
            return void this.iToD(a, !0, !0);
          };
          var P;
          (this.globalDragHandler = function(e, t, n, a, i) {
            if (isNaN(e) && isNaN(t))
              return (P = 0 / 0), (S = !1), void me.re(globalCfg.e.I_EVT, i);
            g();
            var o = viewState.start,
              s = viewState.end,
              r = s - o;
            isNaN(P) && (P = e);
            var l = t - P,
              c = viewState.dataLength,
              h = setting.DIMENSION.w_k / r;
            if (Math.abs(l) < h) {
              if (setting.custom.smooth && h > 4) {
                if (s >= c && 0 > l) return;
                if (1 > o && l > 0) return;
                (z.x = l), I.callSdDraw();
              }
            } else {
              P = t;
              var d = Math.round((l * r) / setting.DIMENSION.w_k);
              (o -= d),
                (s -= d),
                s >= c && ((s = c), (o = s - r)),
                0 > o && ((o = 0), (s = r)),
                (viewState.start != o || viewState.end != s) &&
                  (z.resetX(0),
                  (viewState.movY = a - n),
                  I.moving(o, s, !0),
                  (S = !0));
            }
          }),
            (this.shortClickHandler = function() {
              Y.shortClickHandler();
            }),
            (this.zoomView = function(e, t) {
              var n = -Number(e);
              0 == n && (n = 1);
              var a = viewState.start,
                i = viewState.end,
                o = n * Math.ceil((i - a) / setting.PARAM.zoomUnit);
              if (
                (Math.abs(o) > setting.PARAM.zoomLimit &&
                  (o = n * setting.PARAM.zoomLimit),
                setting.custom.centerZoom)
              ) {
                var s = Math.min.apply(Math, t),
                  r = s / setting.DIMENSION.w_k,
                  l = Math.max.apply(Math, t),
                  c = l / setting.DIMENSION.w_k;
                r < setting.PARAM.zoomArea
                  ? (i = Math.min(i - o * Math.abs(o), viewState.dataLength))
                  : c > 1 - setting.PARAM.zoomArea
                  ? (a = Math.max(a + o * Math.abs(o), 0))
                  : ((a = Math.max(a + o * Math.abs(o), 0)),
                    (i = Math.min(i - o * Math.abs(o), viewState.dataLength)));
              } else a = Math.max(a + o * Math.abs(o), 0);
              I.moving(a, i);
            }),
            f(),
            v(),
            (this.onResize = function() {
              i.resize(), o.resize();
            }),
            (this.iHLineO = i),
            (this.hideIUis = g),
            (this.update = function() {
              N || (b(Number.MAX_VALUE), e && e.setFloaterData({}));
            }),
            (this.iReset = function() {
              e.reset && e.reset();
            }),
            (this.patcher = new (function() {
              var a,
                i = {},
                o = function() {
                  if (a) {
                    e.body.parentNode && e.body.parentNode.removeChild(e.body);
                    var t = "vid_" + viewState.viewId;
                    if (a[t]) {
                      var o;
                      (o = i[t] ? i[t] : (i[t] = new a[t]())), (e = o);
                    } else e = n;
                  } else e = n;
                  !$CONTAINS(x, e.body) && x.appendChild(e.body);
                };
              (this.customFloater = function(e) {
                (a = e), o(), util.stc("k_fl", e);
              }),
                (this.switchFloater = o);
            })());
        })();
      I = new S();
      var W = new (function() {
        var e = this;
        this.resize = function(e, t) {
          j.resizeAll(!0, e, t);
        };
        var n,
          a = function(n, a) {
            if (setting.hasOwnProperty(n)) {
              for (var i in a)
                if (a.hasOwnProperty(i) && util.isFunc(a[i])) return;
              "DIMENSION" == n && ($ = 1),
                oc(setting[n], a),
                util.stc(n, a),
                e.resize();
            }
          },
          i = function(e, n) {
            var a;
            if (setting.hasOwnProperty(e)) {
              a = util.clone(setting[e], null);
              for (var i in a)
                if (a.hasOwnProperty(i))
                  if (util.isFunc(a[i])) (a[i] = null), delete a[i];
                  else if (n)
                    for (var o = n.length; o--; )
                      typeof a[i] === n[o] && ((a[i] = null), delete a[i]);
            }
            return a;
          },
          o = function(e, t, n) {
            (n = oc(
              {
                toremove: !1,
                isexclusive: !1,
                callback: void 0,
                addon: !1
              },
              n || {}
            )),
              n.toremove
                ? I.mM.removeAC(t, e)
                : n.isexclusive
                ? (I.mM.removeAC(null, e), I.mM.newAC(t, e, n))
                : I.mM.newAC(t, e, n);
          };
        (this.setLineStyle = function(e, a) {
          a || (n = e), I.setLineStyle(e), util.stc("k_style", e);
        }),
          (this.showScale = function(e) {
            I.setScale(e), util.stc("k_scale", e);
          }),
          (this.pushData = function(e, n) {
            !util.isArr(e) && (e = [e]), I.pushData(e, n);
          });
        var s,
          r,
          c = [],
          h = function() {
            if (c.length) {
              var e = c.shift();
              I.pushData([e], 1);
            } else clearInterval(r);
          },
          d = function() {
            r = setInterval(h, 1);
          };
        (this.pushTr = function(e) {
          if (e && e.data) {
            for (
              var t,
                n = e.data.split(","),
                a = e.symbol,
                i = e.market,
                o = 0,
                r = n.length;
              r > o;
              o++
            )
              (t = {
                symbol: a,
                data: n[o],
                market: i
              }),
                c.push(t);
            clearTimeout(s), (s = setTimeout(d, 20));
          }
        }),
          (this.hide = function(e) {
            (P = !0),
              B.hideIUis(),
              util.$CONTAINS(A, x) && A.removeChild(x),
              e && I.dcReset();
          }),
          (this.show = function(e) {
            (P = !1),
              e && (util.isStr(e) && (e = $DOM(e)), (A = e)),
              util.$CONTAINS(A, x) || (A.appendChild(x), j.resizeAll(!0)),
              I.outputNewRange(!0),
              Y.onViewPrice();
          });
        var u = 0,
          m = !1,
          f = function(e) {
            var t;
            switch (e) {
              case 1:
                t = "\u540e\u590d\u6743";
                break;
              case -1:
                t = "\u524d\u590d\u6743";
            }
            j.drawReMark(t);
          },
          v = [],
          g = [],
          y = function() {
            for (; v.length; ) {
              var e = v.pop();
              g.length--, I.compare(e);
            }
          },
          N = function() {
            for (
              var e,
                t = I.getMainStock().symbol,
                n = I.getMainStock().market,
                a = I.getAllStock(),
                i = a.length;
              i--;

            ) {
              e = a[i];
              var o = e.symbol;
              if (o != t) {
                var s = e.market;
                s != n &&
                  ("US" == s ||
                    "US" == n ||
                    "HK" == s ||
                    "HK" == n ||
                    "OTC" == s ||
                    "OTC" == n ||
                    "option_cn" == s ||
                    "option_cn" == n) &&
                  (v.push(e), g.push(o));
              }
            }
            g.length && I.removeCompare(g, !0);
          },
          w = function() {
            (m = !1),
              e.setLineStyle(void 0, !0),
              e.showScale(void 0),
              I.mM.togglePt({
                v: !0,
                ytd: !0
              });
          },
          k = function(e) {
            "mink" == globalCfg.URLHASH.gt(e).type
              ? ((viewState.viewId = e), f(), N())
              : ((e += u), (viewState.viewId = e), f(u), y());
          },
          S = new (function() {
            (this.isClMode = !1),
              (this.exitClMode = function() {
                (this.isClMode = !1),
                  e.setLineStyle(n, !0),
                  I.mM.togglePt({
                    v: !0,
                    ytd: !0
                  });
              }),
              (this.enterClMode = function() {
                this.isClMode = !0;
                var t = n && "mountain" == n.linetype ? "mountain" : "line";
                e.setLineStyle(
                  {
                    linetype: t,
                    linecolor: {
                      K_CL: setting.COLOR.T_P
                    }
                  },
                  !0
                ),
                  I.mM.togglePt({
                    v: !1,
                    ytd: !0
                  });
              });
          })(),
          C = !0;
        this.showView = function(e, n, a) {
          B.hideIUis(),
            C
              ? setTimeout(function() {
                  C = !1;
                }, 99)
              : F.hide();
          var i = util.isNum(e)
            ? globalCfg.URLHASH.vn(e)
            : globalCfg.URLHASH.vi(e);
          if (i) {
            if ((m && w(), i == globalCfg.URLHASH.KCL)) S.enterClMode();
            else {
              S.isClMode && S.exitClMode();
              var o = I.getAllStock(),
                s = o && o.length > 1;
              s &&
                I.mM.togglePt({
                  v: !1
                });
            }
            k(i),
              I.onChangeView(!1, n),
              util.stc("k_v", e),
              !a && util.suda("vw", e);
          }
        };
        var R = !1;
        this.showYTD = function(e, n) {
          R = !!e;
          B.hideIUis();
          m ||
            ((m = !0),
            this.setLineStyle(
              {
                linetype: "line",
                linecolor: {
                  K_CL: setting.COLOR.T_P
                }
              },
              !0
            ),
            !R && this.showScale("percent"),
            I.mM.togglePt({
              v: !1,
              ytd: !0
            }));
          f(u);
          I.showYTD(u, R);
          util.stc("k_v", globalCfg.URLHASH.NYTD);
          !n && util.suda("vw", globalCfg.URLHASH.NYTD);
        };
        this.showYear = function() {
          this.showYTD(!0);
        };
        this.setReK = function(e) {
          if (((e = parseInt(e)), !(isNaN(e) || Math.abs(e) > 1))) {
            u = e;
            var n = globalCfg.URLHASH.gt(viewState.viewId);
            util.stc("k_re", e);
            var a = e;
            "-1" == a && (a = "_1");
            util.suda("k_re", "k_re" + a);
            "mink" != n.type &&
              (m ? this.showYTD(R, !0) : this.showView(n.baseid, void 0, !0));
          }
        };
        var H = function(e) {
          var n;
          return (n = util.isStr(e) ? e.split(",") : [e.symbol]);
        };
        this.compare = function(e, n) {
          if (n) {
            for (var a = H(e), i = a.length; i--; )
              for (var o = g.length; o--; )
                if (a[i] == g[o]) {
                  g.splice(o, 1);
                  v.splice(o, 1);
                  break;
                }
            I.removeCompare(H(e));
          } else I.compare(e), util.suda("k_comp");
          util.stc("k_comp", {
            rm: n,
            o: e
          });
        };
        var D = 0;
        this.tCharts = function(e, n) {
          o("tech", e, n);
          n && !n.noLog && (0 == D ? (D = 1) : util.sudaLog());
        };
        var O = 0;
        this.pCharts = function(e, n) {
          o("price", e, n);
          n && !n.noLog && (0 == O ? (O = 1) : util.sudaLog());
        };
        this.showPCharts = function(e) {
          e && (I.mM.togglePt(e), util.stc("k_sp", e));
        };
        this.getIndicators = function() {
          var tCharts = T ? T.getLog() : null,
            pCharts = U ? U.getLog() : null;
          return {
            tCharts: tCharts,
            pCharts: pCharts
          };
        };
        this.getIndicatorData = function() {
          var tCharts = T ? T.getExistingCharts() : null,
            pCharts = U ? U.getExistingCharts() : null;
          return {
            tCharts: tCharts,
            pCharts: pCharts
          };
        };
        var z;
        this.showRangeSelector = function(e) {
          z = oc(
            {
              display: !0,
              from: void 0,
              to: void 0
            },
            e || {}
          );
          I.mM.showRs(z);
          util.stc("k_rs", e);
        };
        this.dateFromTo = function(e, n, a) {
          E && (E.dateFromTo(e, n, a), util.stc("k_ft", [e, n, a]));
        };
        this.setCustom = fBind(a, this, "custom");
        this.setTheme = function(e) {
          var t = j.initTheme(e);
          t &&
            (this.setLineStyle({
              linecolor: e
            }),
            this.resize());
        };
        this.setDimension = fBind(a, this, "DIMENSION");
        this.getDimension = fBind(i, null, "DIMENSION", ["boolean"]);
        this.newSymbol = function(e) {
          B.hideIUis();
          B.iReset();
          I.dcReset();
          I.dcInit(e);
          q.hideTip();
          if (T) {
            var n = T.getLog();
            T = null;
            n && this.tCharts(n);
          }
          if (U) {
            var a = U.getLog();
            U = null;
            a && this.pCharts(a);
          }
          z && ((z.from = void 0), (z.to = void 0), I.mM.showRs(z));
          I.h5tM.resetHisT();
          util.stc("k_ns", e);
        };
        this.toggleExtend = function() {
          var e = setting.DIMENSION.extend_draw,
            t = setting.DIMENSION.posX;
          a.call(this, "DIMENSION", {
            extend_draw: !e,
            posX: t > 9 ? 7 : 55
          }),
            this.resize();
        };
        this.shareTo = function(e) {
          I.shareTo(e), util.stc("k_share", e);
          var n = e && e.type ? e.type : "weibo";
          util.suda("share", n);
        };
        this.getChartId = function() {
          return setting.uid;
        };
        this.getSymbols = function() {
          return I.getAllSymbols();
        };
        this.patcher = {
          iMgr: B.patcher
        };
        this.getExtraData = function(e) {
          return I.getExtraData(e);
        };
        this.getCurrentData = function() {
          var e = K.get(viewState.viewId);
          e && (e = e[e.length - 1]);
          return util.clone(e, null);
        };
        this.getCurrentRange = function() {
          for (
            var e, t, n, a = [], i = I.getAllStock(), o = 0, s = i.length;
            s > o;
            o++
          ) {
            n = i[o];
            t = n.getName();
            e = n.datas;
            a.push({
              name: t,
              rangedata: e,
              symbol: n.symbol
            });
          }
          return a;
        };
        this.zoom = function(e) {
          I.zoomApi(e), util.stc("k_zoom", e, 9e3);
        };
        this.rangeMove = function(e, t) {
          I.moving(e, t);
        };
        this.move = function(e) {
          (e = parseInt(e)),
            isNaN(e) || (I.moveApi(e), util.stc("k_move", e, 9e3));
        };
        this.update = function() {
          I.updateDataAll(), util.stc("k_up", 9e3);
        };
        this.type = "h5k";
        this.me = me;
      })();
      I.dcInit(a);
      return W;
    }
    function i() {
      this.get = function(e, n) {
        util.stc("h5k_get");
        var i = new a(e);
        util.isFunc(n) && n(i);
        util.suda("h5k_" + util.market(e.symbol));
      };
      this.dual = function(e, n) {
        util.stc("h5k_dual");
        e.linetype = "line";
        var i = new a(e);
        i.setCustom({
          k_overlay: !0
        });
        var o = function(t) {
          i.me.rl(t, o);
          var n = e.dual;
          i.compare({
            symbol: n.symbol,
            name: n.name,
            datas: n.datas,
            linetype: "line",
            linecolor: n.theme
          });
        };
        i.me.al(globalCfg.e.K_DATA_LOADED, o, !1);
        util.isFunc(n) && n(i);
        util.suda("dual_" + util.market(e.symbol));
      };
      this.tick = function(e, n) {
        util.stc("h5k_tick");
        e.pcm = 1;
        e.view = globalCfg.URLHASH.NKMS;
        e.rate = 600;
        e.linetype = "line";
        var i = new a(e, !0);
        util.isFunc(n) && n(i);
        KKE.api(
          "patch.atick.customfloater",
          {
            chart: i
          },
          function(e) {
            i.patcher.iMgr.customFloater(e);
          }
        );
        i.setCustom({
          smooth: !1
        });
        util.suda("tick_" + util.market(e.symbol));
      };
    }
    var o,
      s,
      r,
      $DOM = util.$DOM,
      $C = util.$C,
      $CONTAINS = util.$CONTAINS,
      xh5_PosUtil = util.xh5_PosUtil,
      xh5_EvtUtil = util.xh5_EvtUtil,
      oc = util.oc,
      dateUtil = util.dateUtil,
      stbd = dateUtil.stbd,
      xh5_ADJUST_HIGH_LOW_c = util.xh5_ADJUST_HIGH_LOW.c,
      xh5_BrowserUtil = util.xh5_BrowserUtil,
      fBind = util.fBind,
      ps = util.strUtil.ps,
      xh5_Canvas = painter.xh5_Canvas,
      globalCfg = settinger.globalCfg,
      logoM = util.logoM;
    util.fInherit(a, util.xh5_EvtDispatcher);
    return i;
  }
);

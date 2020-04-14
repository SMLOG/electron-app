xh5_define(
  "chart.h5k",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(e, t, n) {
    "use strict";
    function i(i) {
      function a(e, n) {
        function a(e) {
          D.setDataRange(e),
            M && (M.linkData(e), M.setDataRange()),
            N && (N.linkData(e), N.setDataRange()),
            S && (S.linkData(e), S.setDataRange());
        }
        function l(e, t) {
          var n,
            i,
            a = _.get(b.URLHASH.KD),
            o = a.length;
          e || (n = 0), t || (i = o - 1);
          for (
            var s = 0;
            o > s &&
            (isNaN(n) && a[s].date >= e && (n = s),
            isNaN(i) && a[s].date >= t && (i = s),
            isNaN(n) || isNaN(i));
            s++
          );
          return [n, i];
        }
        function c() {
          n && (T = _),
            F.uUpdate(null, !0),
            "CN" !== u ||
              /^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol) ||
              _.initExtraData();
        }
        e = p(
          {
            symbol: void 0,
            datas: {
              day: {
                wfn: void 0,
                url: void 0,
                dataformatter: void 0,
                staticdata: void 0,
              },
              min: {
                wfn: void 0,
                url: void 0,
                dataformatter: void 0,
                staticdata: void 0,
              },
            },
          },
          e || {}
        );
        var h = this,
          u = t.market(e.symbol),
          g = !0;
        (this.isErr = !1), (this.symbol = e.symbol), (this.market = u);
        var y;
        switch (u) {
          case "forex":
          case "forex_yt":
            "DINIW" == this.symbol, (y = "06:00");
            break;
          case "BTC":
            y = "00:00";
            break;
          case "LSE":
            y = "08:00";
            break;
          default:
            y = "09:30";
        }
        (this.isMain = n),
          (this.isCompare = !1),
          (this.datas = null),
          (this.dataLen = 0),
          (this.nfloat = e.nfloat || 2),
          (this.dataLenOffset = 0),
          (this.prevclose = 0 / 0),
          (this.labelMaxP = 0),
          (this.labelMinP = Number.MAX_VALUE),
          (this.maxPrice = 0),
          (this.minPrice = Number.MAX_VALUE),
          (this.rangeMax = 0),
          (this.rangeMin = Number.MAX_VALUE),
          (this.labelMaxVol = 0),
          (this.maxVolume = 0),
          (this.minPercent = Number.MAX_VALUE),
          (this.maxPercent = -Number.MAX_VALUE),
          (this.labelPriceCount = 0 / 0),
          (this.isTotalRedraw = !0),
          (this.hq = void 0),
          (this.nco = void 0);
        var M,
          N,
          S,
          L = new w(this, e),
          x = e.name;
        (this.getName = function() {
          return x || "";
        }),
          (this.viewState = viewState);
        var _ = new (function() {
            var a,
              o = {},
              s = { rsAmount: void 0 },
              r = function(e, i, s, r, l) {
                if (i) {
                  if (n) {
                    if (
                      (e == b.URLHASH.KD && (a = t.clone(i, null)),
                      r && window.datelist && h.hq)
                    ) {
                      var c = t.xh5_S_KLC_D(window.datelist);
                      i = t.kUtil.ayd(i, c, !1, i[0].date, h.hq.date);
                    }
                  } else
                    l ||
                      (e == b.URLHASH.KD && (a = t.clone(i, null)),
                      (i = t.kUtil.adbd(i, T.get(e), s, !1)));
                  o["k" + e] = i;
                  var d = i.length,
                    u = r ? I.PARAM.K_CL_NUM : I.PARAM.defaultCandleNum;
                  (o["k" + e + "v"] = d > u ? d - u : 0),
                    (o["k" + e + "b"] = d);
                }
              },
              l = function() {
                var e = viewState.viewId;
                switch (e) {
                  case b.URLHASH.KDF:
                  case b.URLHASH.KDB:
                    e = b.URLHASH.KD;
                    break;
                  case b.URLHASH.KWF:
                  case b.URLHASH.KWB:
                    e = b.URLHASH.KW;
                    break;
                  case b.URLHASH.KMF:
                  case b.URLHASH.KMB:
                    e = b.URLHASH.KM;
                    break;
                  case b.URLHASH.KYF:
                  case b.URLHASH.KYB:
                    e = b.URLHASH.KY;
                    break;
                  case b.URLHASH.KCLF:
                  case b.URLHASH.KCLB:
                    e = b.URLHASH.KCL;
                }
                return e;
              };
            (this.get = function(e) {
              if (t.isStr(e)) {
                var n = l();
                return o["k" + n + e];
              }

              let ret = o["k" + (e || viewState.viewId)];
              if (ret && window.chooseDate && window.cutChooseDate) {
                let dt =
                  new Date(window.chooseDate).getTime() + 24 * 3600 * 1000;
                let ds = ret.filter((d) => d.date.getTime() < dt);
                viewState.start = ds.length - viewState.currentLength;
                viewState.end = ds.length;
                return ds;
              }

              return ret;
            }),
              (this.set = function(e, t) {
                var n = l(),
                  i = "k" + n + e;
                "undefined" != typeof o[i] && (o[i] = t);
              }),
              (this.getOriDK = function() {
                return a;
              }),
              (this.initState = r),
              (this.initDWMState = function(e, n) {
                var i = t.clone(n.day, null);
                r(b.URLHASH.KD, n.day),
                  r(b.URLHASH.KW, n.week),
                  r(b.URLHASH.KM, n.month),
                  r(b.URLHASH.KCL, i, !1, !0),
                  r(b.URLHASH.KY, n.year);
              }),
              (this.extraDataObj = s),
              (this.initExtraData = function() {
                var n =
                  "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol";
                i.ssl && (n = t.getSUrl(n));
                var a = "KKE_ShareAmount_" + e.symbol;
                t.load(
                  n
                    .replace("$symbol", e.symbol)
                    .replace("$rn", String(new Date().getDate()))
                    .replace("$cb", "var%20" + a + "="),
                  function() {
                    var e = window[a];
                    if (e) {
                      for (var t, n = [], i = e.length; i--; )
                        (t = e[i]),
                          n.push({
                            amount: Number(t.amount),
                            date: m.sd(t.date),
                          });
                      n.length && (s.rsAmount = n);
                    }
                  }
                );
              }),
              (this.gc = function() {
                (o = null), (s = null);
              });
          })(),
          D = new (function() {
            var e = function() {
                (h.minPrice = Number.MAX_VALUE),
                  (h.maxPrice = -Number.MAX_VALUE),
                  (h.minPercent = Number.MAX_VALUE),
                  (h.maxPercent = -Number.MAX_VALUE),
                  (h.maxVolume = 0),
                  (h.rangeMax = 0),
                  (h.rangeMin = Number.MAX_VALUE);
              },
              t = function() {
                for (var e, t = 0, n = h.dataLen; n > t; t++)
                  (e = h.datas[t]),
                    e.close <= 0 ||
                      (e.high > h.maxPrice &&
                        (h.maxPrice = h.rangeMax = e.high),
                      e.low < h.minPrice && (h.minPrice = h.rangeMin = e.low),
                      (h.maxVolume = Math.max(h.maxVolume, e.volume)));
                var i = v(h.maxVolume, 0, 0, !0);
                (h.labelMaxVol = i[0]),
                  (h.maxPercent = Math.max(
                    (h.maxPrice - h.prevclose) / h.prevclose,
                    0
                  )),
                  (h.minPercent = Math.min(
                    (h.minPrice - h.prevclose) / h.prevclose,
                    0
                  ));
              };
            (this.createPlayingData = function() {
              var e,
                t,
                n = I.DIMENSION.h_k,
                i = n * I.DIMENSION.P_HV,
                a = n * (1 - I.DIMENSION.P_HV);
              (e = h.labelMinP), (t = h.labelMaxP);
              for (
                var o,
                  s = h.labelMaxVol,
                  r = h.prevclose,
                  l = h.isTotalRedraw ? 0 : h.dataLen - h.dataLenOffset,
                  c = I.custom.show_underlay_vol,
                  u = h.isCompare ? "ppp" : "pp",
                  p = h.dataLen;
                p > l;
                l++
              )
                (o = h.datas[l]),
                  (o.cy = d[u](o.close, e, t, n, r)),
                  (o.oy = d[u](o.open, e, t, n, r)),
                  (o.hy = d[u](o.high, e, t, n, r)),
                  (o.ly = d[u](o.low, e, t, n, r)),
                  c && (o.vy = d.vp(o.volume, s, i) + a);
            }),
              (this.setDataRange = function(n) {
                var a = _.get();
                if (a) {
                  viewState.dataLength = a.length;
                  var o = viewState.start,
                    s = viewState.end;
                  if (isNaN(o) || isNaN(s))
                    (s = _.get("b")),
                      (o = _.get("v")),
                      (viewState.start = o),
                      (viewState.end = s);
                  else {
                    if (n && s + 1 >= a.length) {
                      var r = a.length - s;
                      (viewState.end = s = a.length),
                        (1 == i.pcm || viewState.viewId == b.URLHASH.K1) &&
                          (0 == o &&
                            s > 1 &&
                            s < I.PARAM.minCandleNum &&
                            ((o = s - 1), (viewState.start = o)),
                          s - o >= I.PARAM.defaultCandleNum &&
                            ((o += r), (viewState.start = o)));
                    }
                    _.set("v", o), _.set("b", s);
                  }
                  switch (
                    ((viewState.currentLength = s - o),
                    (viewState.startDate = a[o].date),
                    (viewState.endDate = a[s - 1].date),
                    i.pcm)
                  ) {
                    case 1:
                      h.prevclose = a[0].prevclose;
                      break;
                    case 2:
                      h.prevclose = a[o].close;
                      break;
                    default:
                      h.prevclose =
                        o > 1 ? a[o - 1].close : a[0].prevclose || a[0].close;
                  }
                  (h.datas = a.slice(o, s)),
                    (h.dataLen = h.datas.length),
                    e(),
                    t(n);
                }
              });
          })(),
          F = new (function() {
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
              l = function(e, n, i) {
                if (e.isUpdateTime) {
                  var a = _.get(n);
                  if (a && !(a.length < 1)) {
                    var o =
                        n == b.URLHASH.KD ||
                        n == b.URLHASH.KDF ||
                        n == b.URLHASH.KCL ||
                        n == b.URLHASH.KCLF,
                      s = a[a.length - 1];
                    if (1 == i) {
                      if (
                        s.time &&
                        !t.kUtil.spk(s.time, e.time, y, n, h.market)
                      ) {
                        if (
                          (t.kUtil.nc(a, e, n, {
                            price: e.price,
                            volume: e.volume,
                          }),
                          /^forex|^BTC/.test(h.market))
                        )
                          n == b.URLHASH.K1 &&
                            ((s = a[a.length - 1]),
                            (s.prevclose = e.prevclose),
                            (s.change = e.price - e.prevclose),
                            (s.percent = s.change / e.prevclose));
                        else if ("NF" == h.market);
                        else if (t.kUtil.spk("09:35", e.time, y, n)) {
                          if (n == b.URLHASH.K60) {
                            var l = e.time.split(":"),
                              c = l[0],
                              d = l[1];
                            if (c > 10 || (10 == c && d > 30)) return;
                          }
                          (s = a[a.length - 1]),
                            (s.open = e.open),
                            s.open > s.high && (s.high = s.open),
                            s.open < s.low && (s.low = s.open);
                        }
                        return;
                      }
                    } else if (2 == i) {
                      if (!e.trstr) return;
                      t.kUtil.nc(a, e, n, { price: e.price, volume: 0 });
                    } else if (f(e.date, s.date))
                      h.nco &&
                        ("NF" == h.market
                          ? m.dst(s.date) < h.nco.open &&
                            e.time >= h.nco.open &&
                            e.time > h.nco.close &&
                            t.kUtil.nc(a, e, n, null)
                          : r &&
                            e.time >= h.nco.open &&
                            ((r = !1), t.kUtil.nc(a, e, n, null)));
                    else {
                      if (!(e.date > s.date)) return;
                      h.nco
                        ? "NF" == h.market
                          ? e.time >= h.nco.open && t.kUtil.nc(a, e, n, null)
                          : e.time <= h.nco.close && (r = !0)
                        : t.kUtil.nc(a, e, n, null);
                    }
                    (s = a[a.length - 1]),
                      (s.close = e.price),
                      (s.date = m.ddt(e.date)),
                      (s.day = m.ds(s.date, "/")),
                      n == b.URLHASH.KMS
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
                    1 == a.length
                      ? (u = o ? e.prevclose : s.open)
                      : ((u = a[a.length - 2].close),
                        e.settlement && o && (u = e.settlement)),
                      /^forex|^BTC/.test(h.market) &&
                        (n == b.URLHASH.K1 || n == b.URLHASH.KD) &&
                        (u = e.prevclose),
                      (s.change = e.price - u),
                      (s.percent = s.change / Math.abs(u)),
                      e.price > s.high && (s.high = e.price),
                      e.price < s.low && (s.low = e.price),
                      (s.amplitude = Math.abs(s.high - s.low)),
                      (s.ampP = Math.abs(s.amplitude / u)),
                      (s.time = e.time),
                      t.isCNK(e.symbol) &&
                        ((s.postVol = e.postVolume),
                        (s.postAmt = e.postAmount));
                  }
                }
              },
              c = function(e) {
                l(e, b.URLHASH.KD, 0),
                  l(e, b.URLHASH.KW, 0),
                  l(e, b.URLHASH.KM, 0),
                  l(e, b.URLHASH.KY, 0),
                  l(e, b.URLHASH.KDF, 0),
                  l(e, b.URLHASH.KWF, 0),
                  l(e, b.URLHASH.KMF, 0),
                  l(e, b.URLHASH.KYF, 0),
                  l(e, b.URLHASH.KCL, 0),
                  l(e, b.URLHASH.KCLF, 0),
                  l(e, b.URLHASH.K1, 1),
                  l(e, b.URLHASH.K5, 1),
                  l(e, b.URLHASH.K15, 1),
                  l(e, b.URLHASH.K30, 1),
                  l(e, b.URLHASH.K60, 1),
                  l(e, b.URLHASH.K240, 1),
                  l(e, b.URLHASH.KMS, 2);
              },
              d = new (function() {
                this.check = function(e) {
                  if (n) return !0;
                  var i = viewState.viewId,
                    a = T.get(i);
                  if (!a || a.length < 1) return !1;
                  var o = a[a.length - 1];
                  if (e.date > o.date)
                    if ("mink" == b.URLHASH.gt(viewState.viewId).type) {
                      if (!t.kUtil.spk(o.time, e.time, "00:00", i, h.market))
                        return !1;
                    } else if (!f(e.date, o.date)) return !1;
                  return !0;
                };
              })();
            this.uUpdate = function(n, o, r, l) {
              var u,
                p = { symbol: e.symbol, ssl: i.ssl };
              r
                ? ((u = "datas.hq.parse"), (p.hqStr = r), (p.market = l))
                : ((u = "datas.hq.get"), (p.delay = !0), (p.cancelEtag = o)),
                KKE.api(u, p, function(i) {
                  var o = i.dataObj[e.symbol];
                  if (o && o.date && s(o)) {
                    if (((x = x || o.name || ""), !d.check(o))) return;
                    (h.hq = o), c(o), a(!0), t.isFunc(n) && n();
                  }
                });
            };
          })(),
          z = new (function() {
            var a,
              o = function(e, n) {
                A.re(b.e.K_DATA_LOADED, n), t.isFunc(e) && e();
              },
              s = function(e) {
                if (!h.hq || !h.hq.date) return null;
                for (var t = 0; !e[t].f; ) t++;
                return { factor: e[t].f };
              },
              r = function(e, i, a, o) {
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
                    y,
                    M = !(-828 === e),
                    N = _.getOriDK(),
                    S = 0;
                  if (
                    ((r = "q" === a ? b.URLHASH.KDF : b.URLHASH.KDB),
                    _.initState(r, t.clone(N, null), !1, !1, !0),
                    (s = _.get(r)),
                    (y = s.length),
                    M)
                  ) {
                    for (g = y - 1; g >= 0; g--) {
                      for (p = s[g], f = m.ds(p.date); f < i[S].d; ) S++;
                      if (((v = Number(i[S].f)), "HK" === o)) {
                        if (
                          ((p.high *= v),
                          (p.low *= v),
                          (p.open *= v),
                          (p.close *= v),
                          "h" === a)
                        ) {
                          var w = Number(i[S].c);
                          (p.high += w),
                            (p.low += w),
                            (p.open += w),
                            (p.close += w);
                        }
                      } else if ("US" === o) {
                        var L = Number(i[S].c) || 0;
                        (p.high = p.high * v + L),
                          (p.low = p.low * v + L),
                          (p.open = p.open * v + L),
                          (p.close = p.close * v + L);
                      } else
                        "h" === a
                          ? ((p.high *= v),
                            (p.low *= v),
                            (p.open *= v),
                            (p.close *= v))
                          : ((p.high /= v),
                            (p.low /= v),
                            (p.open /= v),
                            (p.close /= v));
                    }
                    for (g = 0; y > g; g++)
                      (p = s[g]),
                        (v = Number(i[i.length - 1].f)),
                        0 == g &&
                          ((d = p.prevclose),
                          isNaN(d) || 0 >= d
                            ? (d = p.open)
                            : ((d =
                                "HK" === o
                                  ? p.prevclose * v
                                  : "h" === a
                                  ? p.prevclose * v
                                  : p.prevclose / v),
                              (p.prevclose = d))),
                        (p.amplitude = Math.abs(p.high - p.low)),
                        (p.ampP = Math.abs(p.amplitude / d)),
                        (p.change = p.close - d),
                        (p.percent = p.change / Math.abs(d)),
                        (d = p.close);
                  }
                  var A;
                  1 == y &&
                    ((p = s[y - 1]),
                    (A = {
                      open: p.open,
                      high: p.high,
                      low: p.low,
                      close: p.close,
                      price: p.close,
                      volume: p.volume,
                      totalVolume: p.volume,
                      date: m.dd(p.date),
                    })),
                    (l = t.kUtil.mw(s, A, null, null, 0 / 0)),
                    (h = l[0]),
                    (c = l[1]),
                    (u = l[2]),
                    t.kUtil.pd(h, null),
                    t.kUtil.pd(c, null),
                    t.kUtil.pd(u, null),
                    _.initState(b.URLHASH["q" == a ? "KWF" : "KWB"], h),
                    _.initState(b.URLHASH["q" == a ? "KMF" : "KMB"], c),
                    _.initState(b.URLHASH["q" == a ? "KYF" : "KYB"], u);
                  var I = t.clone(s, null);
                  _.initState(b.URLHASH["q" == a ? "KCLF" : "KCLB"], I, !1, !0),
                    n || _.initState(r, s);
                }
              },
              l = function(t) {
                var n = b.URLHASH.gt(viewState.viewId),
                  a = n.dir,
                  l = { symbol: e.symbol, market: u, dir: a, ssl: i.ssl };
                P.show(),
                  KKE.api("datas.k.loadReData", l, function(e) {
                    P.hide();
                    var n = !0,
                      i = e.data;
                    if (i) {
                      var c = s(i);
                      c && ((n = !1), r(c.factor, i, a, l.market));
                    }
                    n && r(-828, null, a), o(t, { viewId: viewState.viewId });
                  });
              },
              c = function(e, t) {
                var s = b.URLHASH.gt(a),
                  r = "mink" == s.type ? _.initState : _.initDWMState;
                P.show(),
                  "LSE" === u && (e.symbol = i.rawSymbol),
                  KKE.api("datas.k.get", e, function(i) {
                    P.hide();
                    var l = a;
                    if (((a = 0 / 0), "error" == i.msg)) {
                      if (((h.isErr = !0), n))
                        if (i.data && i.data.hq) {
                          var c;
                          if (i.data.hq.status)
                            switch (i.data.hq.status) {
                              case 2:
                                c = b.notlisted;
                                break;
                              case 3:
                                c = b.delisted;
                            }
                          else c = b.norecord;
                          c && B.showTip({ txt: c, parent: H, noBtn: !0 });
                        } else B.showTip({ txt: b.nodata, parent: H });
                    } else i.data.hq && (h.hq = i.data.hq), r(s.baseid, i.data, e.ismink);
                    o(t, { viewId: l });
                  });
              },
              d = function(t) {
                KKE.api(
                  "datas.hq.get",
                  { symbol: e.symbol, cancelEtag: !0, ssl: i.ssl },
                  function(n) {
                    var i = n.dataObj[e.symbol],
                      a = [
                        {
                          close: i.price,
                          open: i.open,
                          high: i.high,
                          low: i.low,
                          volume: 0,
                          prevclose: i.prevclose,
                          amplitude: Math.abs(i.high - i.low),
                          ampP: Math.abs((i.high - i.low) / i.prevclose),
                          change: i.price - i.prevclose,
                          date: i.date,
                          day: m.ds(i.date, "/"),
                          time: i.time,
                          percent: i.price - i.prevclose / i.prevclose,
                          kke_cs: 0,
                        },
                      ];
                    _.initState(viewState.viewId, a, !0),
                      o(t, { viewId: viewState.viewId });
                  }
                );
              },
              p = function(t) {
                var n,
                  a,
                  o = viewState.viewId,
                  s = b.URLHASH.gt(o);
                if (h.nco && h.nco.open) (a = h.nco.open), (y = a);
                else {
                  var r = new Date(),
                    l = y.split(":");
                  r.setHours(l[0], l[1], 0),
                    r.setMinutes(r.getMinutes() - 30),
                    (a = m.dst(r));
                }
                var d = { symbol: e.symbol, newthour: a, ssl: i.ssl };
                if ("mink" == s.type) {
                  if (
                    ((n = e.datas.min),
                    (d.ismink = !0),
                    (d.scale = o),
                    /^forex|^BTC/.test(h.market))
                  )
                    switch (((d.withsymbol = "sys_time"), o)) {
                      case b.URLHASH.K1:
                        d.datalen = 1440;
                        break;
                      case b.URLHASH.K240:
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
                (h.nco = { open: "20:00", close: "15:30" }), p(e);
              },
              v = function(e) {
                (h.nco = { open: "07:00", close: "06:00" }), p(e);
              },
              g = function(t) {
                var n = { symbol: e.symbol, ssl: i.ssl },
                  a = "datas.k.";
                (a += "loadGBInit"),
                  (h.nco = { open: "15:00", close: "23:30" }),
                  KKE.api(a, n, function(e) {
                    var n = e.data;
                    if (n) {
                      var i = n.time;
                      i &&
                        i.length > 0 &&
                        ((h.nco.open = i[0][0] || h.nco.open),
                        (h.nco.close = i[i.length - 1][1] || h.nco.close));
                    }
                    p(t);
                  });
              },
              M = function(t, n) {
                var a = { symbol: e.symbol, ssl: i.ssl },
                  o = "datas.k.";
                n
                  ? ((o += "loadNFInit"),
                    (h.nco = { open: "09:00", close: "15:00" }))
                  : ((o += "loadHFInit"),
                    (h.nco = { open: "06:00", close: "05:59" })),
                  KKE.api(o, a, function(e) {
                    var n = e.data;
                    if (n) {
                      var i = n.time;
                      i &&
                        i.length > 0 &&
                        ((h.nco.open = i[0][0] || h.nco.open),
                        (h.nco.close = i[i.length - 1][1] || h.nco.close));
                    }
                    p(t);
                  });
              },
              N = function(e, t) {
                var n = new Date(),
                  i = y.split(":");
                n.setHours(i[0], i[1], 0), n.setMinutes(n.getMinutes() - 1);
                var a = m.dst(n);
                (h.nco = { open: y, close: a }),
                  "rek" == t.type && _.get(b.URLHASH.KD) ? l(e) : p(e);
              };
            this.iInit = function(e) {
              var t = viewState.viewId;
              if (a != t) {
                a = t;
                var n = b.URLHASH.gt(t);
                switch (h.market) {
                  case "HF":
                    M(e);
                    break;
                  case "NF":
                    M(e, !0);
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
                      : "rek" == n.type && _.get(b.URLHASH.KD)
                      ? l(e)
                      : p(e);
                }
              }
            };
          })();
        (this.kDb = _),
          (this.extraDataObj = _.extraDataObj),
          (this.getYtdIndex = function(e) {
            var t = _.get(b.URLHASH.KD);
            if (!t) return null;
            var n = t[t.length - 1],
              i = n.date.getFullYear(),
              a = 0;
            return e && (i--, (a = n.date.getMonth())), l(new Date(i, a, 1));
          }),
          (this.initData = z.iInit),
          (this.doUpdate = F.uUpdate),
          (this.onViewChange = a),
          (this.setPricePos = function(e, t) {
            (h.labelMaxP = e[0]),
              (h.labelMinP = e[1]),
              (h.labelPriceCount = e[2]),
              (h.isCompare = t),
              D.createPlayingData(),
              N && N.setPricePos(e);
          }),
          (this.setRange = function(e) {
            D.setDataRange(),
              M && M.setDataRange(),
              N && N.setDataRange(),
              S && S.setDataRange(e);
          }),
          (this.draw = function() {
            L.draw(), M && M.allDraw(Y.x), N && N.allDraw(Y.x);
          }),
          (this.resize = function(e) {
            D.createPlayingData(),
              L.resize(),
              M && M.onResize(e),
              N && N.onResize(),
              S && S.onResize();
          }),
          (this.clear = function(e) {
            L.clear(e),
              M && (M.clear(), (M = null)),
              N && (N.clear(), (N = null)),
              S && (S.clear(), (S = null)),
              n && (U = null);
          }),
          (this.getPriceTech = function() {
            return N || null;
          });
        var G = function(e, n, i) {
            e && X.resizeAll(!0),
              k.onChangeView(),
              n && t.isFunc(n.callback) && n.callback(),
              i && W.onTechChanged(i[0]);
          },
          Z = void 0;
        (this.initPt = function(e, a) {
          if (e) {
            !t.isArr(e) && (e = [e]);
            for (var o = e.length; o--; )
              if (e[o].name && "VOLUME" === e[o].name.toUpperCase()) {
                e.splice(o, 1), (I.custom.show_underlay_vol = !0);
                break;
              }
            N ||
              ((N = new s({
                iMgr: q,
                stockData: h,
                chartArea: C,
                titleArea: O,
                cb: G,
                cfg: I,
                type: "k",
                usrObj: i,
              })),
              n && (K = N),
              Z && ((g = N.showHide(Z)), (Z = void 0))),
              N.createChart(e, a);
          }
        }),
          (this.removePt = function(e) {
            if (e) {
              !t.isArr(e) && (e = [e]);
              for (var n = e.length; n--; )
                if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                  e.splice(n, 1), (I.custom.show_underlay_vol = !1);
                  break;
                }
            } else I.custom.show_underlay_vol = !1;
            N && N.removeChart(e);
          }),
          (this.togglePt = function(e, t) {
            N ? (g = N.showHide(e)) : !t && (Z = e);
          }),
          (this.initTc = function(e, t) {
            M ||
              ((M = new r({
                stockData: h,
                iMgr: q,
                cb: G,
                subArea: R,
                cfg: I,
                type: "k",
                usrObj: i,
                initMgr: X,
              })),
              n && (E = M)),
              M.createChart(e, t);
          }),
          (this.removeTc = function(e) {
            M && M.removeChart(e);
          }),
          (this.initRs = function() {
            (S = new o({ stockData: h, setting: I, rc: k.moving })),
              S.linkData(),
              (U = S);
          }),
          (this.setLineStyle = L.setLineStyle),
          (this.getLineStyle = L.getLineStyle),
          c();
      }
      function w(e, i) {
        function a() {
          if (M)
            (r = I.COLOR.K_N),
              (s = I.COLOR.K_FALL),
              (l = I.COLOR.K_RISE),
              (c = I.COLOR.K_CL);
          else {
            var i = o.linecolor,
              a = i.K_N || "#" + t.randomColor();
            (r = a),
              (s = i.K_FALL || a),
              (l = i.K_RISE || a),
              (c = i.K_CL || a);
          }
          (m.K_N = r),
            (m.K_FALL = s),
            (m.K_RISE = l),
            (m.K_CL = c),
            (d = new n.xh5_ibPainter({
              setting: I,
              sd: e,
              ctn: _,
              withHBg: M,
              fixScale: !1,
              reO: { mh: I.DIMENSION.H_MA4K },
              iMgr: q,
              iTo: function(t, n, i, a) {
                if (e && e.datas) {
                  !h(t, q.iHLineO.body) && t.appendChild(q.iHLineO.body);
                  var o =
                    e.labelMaxP -
                    (i / I.DIMENSION.h_k) * (e.labelMaxP - e.labelMinP);
                  q.iToD(
                    {
                      mark: o,
                      x: n,
                      y: i,
                      oy: I.DIMENSION.H_MA4K,
                      ox: I.DIMENSION.posX,
                      e: a,
                    },
                    !0,
                    !1
                  );
                }
              },
            })),
            (u = d.getG());
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
          y = isNaN(i.nfloat) ? 2 : i.nfloat,
          M = e.isMain,
          N = function(e) {
            if (
              ((o = p({ linetype: "solid", linecolor: m }, e || {})),
              (m = o.linecolor),
              (r = m.K_N),
              (s = m.K_FALL),
              (l = m.K_RISE),
              (c = m.K_CL),
              !o.linetype && (o.linetype = g),
              (I.datas.candle = o.linetype),
              0 == o.linetype.indexOf("line") ||
                0 == o.linetype.indexOf("mountain"))
            ) {
              var t = Number(o.linetype.split("_")[1]);
              (isNaN(t) || 0 >= t) && (t = v), (f = t);
            }
          },
          b = function(t, n) {
            u.fillStyle = I.COLOR.K_EXT;
            for (
              var i, a, o, s = !1, r = !1, l = e.datas, c = l.length;
              c--;

            ) {
              if (((o = l[c]), (i = n), !s && o.high == e.rangeMax)) {
                s = !0;
                var h = o.high.toFixed(y);
                99 > i
                  ? (u.textAlign = "left")
                  : i > I.DIMENSION.w_k - 99
                  ? ((u.textAlign = "right"), (i -= 5))
                  : (u.textAlign = "center"),
                  (a = o.hy),
                  a < I.STYLE.FONT_SIZE && (a = I.STYLE.FONT_SIZE + 2),
                  u.fillText(h, i, a);
              }
              if (((i = n), !r && o.low == e.rangeMin)) {
                r = !0;
                var d = o.low.toFixed(y);
                99 > i
                  ? (u.textAlign = "left")
                  : i > I.DIMENSION.w_k - 99
                  ? ((u.textAlign = "right"), (i -= 5))
                  : (u.textAlign = "center"),
                  (a = Math.floor(o.ly + I.STYLE.FONT_SIZE + 2)),
                  a > I.DIMENSION.h_k + 0.5 * I.STYLE.FONT_SIZE - 3 &&
                    (a = I.DIMENSION.h_k),
                  u.fillText(d, i, a);
              }
              if (r && s) break;
              (n -= t), 0 > n && (n = 0);
            }
          },
          S = function() {
            var t = e.datas,
              n = t.length,
              i = I.DIMENSION.w_k / Math.max(n, I.PARAM.minCandleNum),
              a = 0.5 * i,
              o = Y.x - i;
            d.beginPath();
            for (var s, r, l = 0; n > l; l++)
              (s = t[l]),
                (r = s.vy),
                d.drawVStickC(o, r, a, I.DIMENSION.h_k, I.COLOR.V_SD),
                (o += i);
            d.stroke();
          },
          w = function() {
            for (
              var t,
                n,
                i = e.datas,
                a = i.length,
                s = I.DIMENSION.w_k / Math.max(a, I.PARAM.minCandleNum),
                r = Y.x - 0.4 * s,
                l = 0;
              a > l;
              l++
            )
              (n = i[l]),
                (t = n.cy),
                0 == l
                  ? (d.newStyle(c, !0, f), d.moveTo(r, t))
                  : d.lineTo(r, t),
                (n.ix = r),
                (r += s);
            d.stroke(),
              0 == o.linetype.indexOf("mountain") &&
                ((r -= s),
                d.lineTo(r, I.DIMENSION.h_k),
                d.lineTo(Y.x - 0.4 * s, I.DIMENSION.h_k),
                d.newFillStyle_rgba(
                  I.COLOR.M_ARR,
                  I.DIMENSION.h_k,
                  I.COLOR.M_ARR_A
                ),
                d.fill()),
              M && I.custom.show_ext_marks && b(s, r);
          },
          L = function() {
            for (
              var t,
                n,
                i,
                a,
                o = e.datas,
                c = o.length,
                h = I.DIMENSION.w_k / Math.max(c, I.PARAM.minCandleNum),
                u = 0.6 * h,
                p = -1,
                m = 1,
                f = 0;
              3 > f;
              f++
            ) {
              switch (p) {
                case -1:
                  a = s;
                  break;
                case 0:
                  a = r;
                  break;
                case 1:
                  a = l;
              }
              for (t = Y.x - h, d.beginPath(), i = 0; c > i; i++)
                (n = o[i]),
                  n.isFake ||
                    (n.kke_cs == p &&
                      d.drawCandleRect(t, n.oy, n.cy, u, a, n.kke_cs == m),
                    0 == f && (n.ix = t + u)),
                  (t += h);
              for (d.stroke(), t = Y.x - h, d.beginPath(), i = 0; c > i; i++)
                (n = o[i]),
                  n.isFake ||
                    (n.kke_cs == p &&
                      d.drawCandleLineRect(
                        t,
                        n.hy,
                        n.oy,
                        n.cy,
                        n.ly,
                        u,
                        a,
                        n.kke_cs == m
                      )),
                  (t += h);
              d.stroke(), p++;
            }
            M && I.custom.show_ext_marks && b(h, t);
          },
          A = function() {
            var t,
              n,
              i,
              a = e.datas,
              o = a.length,
              c = I.DIMENSION.w_k / Math.max(o, I.PARAM.minCandleNum),
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
              for (t = Y.x - c, d.beginPath(), i = 0; o > i; i++)
                (n = a[i]),
                  n.isFake ||
                    (n.kke_cs == u &&
                      d.drawCandleRect_solid(t, n.oy, n.cy, h, p),
                    0 == m && (n.ix = t + h)),
                  (t += c);
              for (d.stroke(), t = Y.x - c, d.beginPath(), i = 0; o > i; i++)
                (n = a[i]),
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
            M && I.custom.show_ext_marks && b(c, t);
          },
          k = function() {
            for (
              var t,
                n,
                i,
                a,
                o = e.datas,
                c = o.length,
                h = I.DIMENSION.w_k / Math.max(c, I.PARAM.minCandleNum),
                u = 0.6 * h,
                p = -1,
                m = 0;
              3 > m;
              m++
            ) {
              switch (p) {
                case -1:
                  a = s;
                  break;
                case 0:
                  a = r;
                  break;
                case 1:
                  a = l;
              }
              for (t = Y.x - h, d.beginPath(), i = 0; c > i; i++)
                (n = o[i]),
                  n.isFake ||
                    (0 == m && (n.ix = t + u),
                    n.kke_cs == p &&
                      d.drawOhlc(t, n.oy, n.hy, n.ly, n.cy, u, a)),
                  (t += h);
              d.stroke(), p++;
            }
            M && I.custom.show_ext_marks && b(h, t);
          },
          x = function() {
            M && d.drawBg(Y.x);
            var t = e.datas;
            if (t) {
              var n =
                  0 == o.linetype.indexOf("line") ||
                  0 == o.linetype.indexOf("mountain"),
                i = 0 == o.linetype.indexOf("hollow"),
                a = 0 == o.linetype.indexOf("ohlc");
              d.clear(n, I.PARAM.getHd()),
                d.newGStyle({
                  textBaseline: "bottom",
                  font: I.STYLE.FONT_SIZE + "px " + I.STYLE.FONT_FAMILY,
                }),
                M && I.custom.show_underlay_vol && S(),
                n ? w() : i ? L() : a ? k() : A();
            }
          };
        (this.draw = x),
          (this.clear = function(e) {
            e ? d.clear(!1, I.PARAM.getHd()) : (d.remove(), (d = null));
          }),
          (this.resize = function() {
            d.resize({ mh: I.DIMENSION.H_MA4K }), x();
          }),
          (this.setLineStyle = N),
          (this.getLineStyle = function() {
            return o;
          }),
          N(i),
          a();
      }
      function L() {
        var e,
          n,
          l,
          h,
          d = this,
          f = [],
          g = 0.05,
          M = function() {
            var e,
              t,
              n = Number.MAX_VALUE,
              a = -Number.MAX_VALUE,
              o = f.length,
              s = o > 1 || "percent" == I.datas.scaleType;
            I.custom.k_overlay && (s = !1);
            for (var r, l, c, h, d = s ? "Percent" : "Price", u = o; u--; )
              (e = f[u]),
                i.scalerange
                  ? (c = i.scalerange)
                  : ((h = e.getPriceTech()),
                    s || !h
                      ? (c = [a, n])
                      : ((t = h && h.getMaxMin()), (c = t || [a, n]))),
                (r = e["min" + d]),
                (l = e["max" + d]),
                isFinite(r) &&
                  isFinite(l) &&
                  ((n = Math.min(n, r, c[1])), (a = Math.max(a, l, c[0])));
            var p;
            p = i.scalerange
              ? i.scalerange.concat(4)
              : 1 == i.pcm
              ? 0.0199 > a - n
                ? [a, n, 1]
                : v(a, n, 2, !1, !0)
              : v(a, n, i.nfloat, !1, !0, g);
            for (var m = o; m--; ) (e = f[m]), e.setPricePos(p, s);
          },
          N = function() {
            (viewState.start < 1 || !I.custom.smooth) && Y.resetX();
            for (var e = f.length; e--; ) f[e].draw();
          },
          S = function() {
            (viewState.start = viewState.end = 0 / 0),
              (viewState.currentLength = 0 / 0),
              (n = void 0);
          },
          w = function(t) {
            S();
            for (var n, i = f.length, a = 0; i > a; a++)
              (n = f[a]), n.onViewChange();
            M(), N(), t || W.onRange(e, i > 1);
          },
          L = [],
          A = !1,
          k = function(t) {
            return t.isErr
              ? (t !== e && d.removeCompare([t.symbol]), !0)
              : t.kDb.get()
              ? !0
              : (t.initData(C), !1);
          },
          x = function(e) {
            if (e && t.isFunc(e.callback)) {
              for (var n = !1, i = L.length; i--; )
                if (e.callback === L[i]) {
                  n = !0;
                  break;
                }
              !n && L.push(e.callback);
            }
          },
          _ = function() {
            for (var t, n = !0, i = f.length; i--; )
              (t = f[i]), t == e || k(t) || ((n = !1), (A = !0));
            return n;
          },
          C = function(t, n) {
            if ((x(n), k(e))) {
              if (e.isErr) return void (e.isErr = !1);
              if ((q.patcher.switchFloater(), Y.resetX(0), _()))
                for (A = !1, w(t); L.length; ) {
                  var i = L.shift();
                  i();
                }
              if ((W.onViewChanged(), t)) return;
              W.onDataUpdate(), W.onViewPrice();
            }
          },
          O = function(t) {
            (t || (n && viewState.dataLength != n)) &&
              W.onRange(e, f.length > 1),
              (n = viewState.dataLength);
          },
          R = function(e) {
            (e || viewState.end == viewState.dataLength) &&
              (q.update(), M(), N(), O(!0)),
              W.onDataUpdate(),
              !q.isIng() && W.onViewPrice();
          },
          T = function(e) {
            clearTimeout(h),
              !F &&
                H.parentNode &&
                "none" != H.style.display &&
                (h = setTimeout(R, e || 200));
          },
          E = function() {
            if (!A) for (var e, t = f.length; t--; ) (e = f[t]), e.doUpdate(T);
          },
          K = function() {
            if ((clearInterval(l), !isNaN(i.rate))) {
              var e = 1e3 * i.rate;
              e > 0 && (l = setTimeout(K, e));
            }
            E();
          };
        this.mM = new (function() {
          var n = function(i, a, o) {
              var l, c;
              switch (a) {
                case "price":
                  if (((l = s), (c = "initPt"), t.isObj(i)))
                    i.name &&
                      "TZY" === String(i.name).toUpperCase() &&
                      (g = 0.2);
                  else if (t.isArr(i))
                    for (var h, d = i.length; d--; )
                      if (
                        ((h = i[d]),
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
                  ? e[c](i, o)
                  : KKE.api("plugins.techcharts.get", { type: a }, function(e) {
                      (r = e.tChart), (s = e.pChart), n(i, a, o);
                    }));
            },
            i = function(t, n) {
              var i;
              switch (n) {
                case "price":
                  (i = "removePt"), (g = 0.05);
                  break;
                case "tech":
                  i = "removeTc";
                  break;
                default:
                  return;
              }
              e && e[i](t);
            },
            a = function(t) {
              return o
                ? (U
                    ? (U.sh(t), (t.from || t.to) && U.dateFromTo(t.from, t.to))
                    : (e.initRs(), a(t), D.appendChild(U.getBody())),
                  void X.resizeAll(!0))
                : void KKE.api("plugins.rangeselector.get", null, function(e) {
                    (o = e), a(t);
                  });
            };
          (this.showRs = a),
            (this.newAC = n),
            (this.removeAC = i),
            (this.togglePt = function(t, n) {
              e && (e.togglePt(t, n), C());
            });
        })();
        var P = new (function() {
          var n,
            a,
            o,
            s,
            r = !1,
            l = !1,
            h = function() {
              a || ((a = c("div")), (a.style.margin = "0 auto")),
                (a.style.width = 0.8 * I.DIMENSION.getStageW() + "px"),
                (a.style.height = 0.83 * I.DIMENSION.h_k + "px");
            },
            d = function(e) {
              n.dateTo(e.date, function(e) {
                1 != e && B.showTip({ txt: b.nohistoryt, parent: H });
              });
            },
            u = function(t) {
              if (o && n) {
                l = !0;
                var i = n.getSymbols()[0];
                i != e.symbol && n.newSymbol({ symbol: e.symbol }),
                  n.resize(),
                  d(t),
                  n.show(a);
              }
            },
            p = function() {
              l = !1;
            },
            f = function(n) {
              var i = {
                txt: e.getName() + "(" + e.symbol + ") " + m.ds(n.date),
                content: a,
                parent: H,
                fontColor: "#000",
                closeCb: p,
                btnLb: "\u5173\u95ed",
                bgStyle: { backgroundColor: "#fff", width: "80%", top: "2%" },
              };
              return o || (o = new t.TipM(I.COLOR)), (i.content = a), i;
            },
            v = function(t) {
              var s = f(t);
              if ((o.genTip(s), n)) u(t);
              else {
                if (r) return;
                (r = !0),
                  KKE.api(
                    "chart.h5t.get",
                    { symbol: e.symbol, dom: a, nfloat: i.nfloat },
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
              if ("CN" === t.market(e.symbol)) {
                s = q.getInteractiveIdx();
                var n = e.datas[s];
                if (n) {
                  if (n.date.getFullYear() < 2008)
                    return void B.showTip({ txt: b.historyt08, parent: H });
                  switch (I.custom.history_t) {
                    case "layer":
                      h(), v(n);
                      break;
                    case "window":
                      var i =
                        "http://finance.sina.com.cn/h5charts/tchart.html?symbol=$symbol&date=$date&rangeselector=true&indicator=tvol";
                      i = i
                        .replace("$symbol", e.symbol)
                        .replace("$date", m.ds(n.date));
                      var a =
                        "width=600,height=375,location=0,menubar=0,titlebar=0,toolbar=0,alwaysRaised=1";
                      window.open(i, "_blank", a);
                      break;
                    default:
                      return;
                  }
                }
              }
            });
        })();
        (this.h5tM = P),
          (this.getAllStock = function() {
            return f;
          }),
          (this.getMainStock = function() {
            return e;
          }),
          (this.getAllSymbols = function() {
            for (var e = [], t = 0, n = f.length; n > t; t++)
              e.push(f[t].symbol);
            return e;
          });
        var z = function() {
            d.mM.togglePt(
              f.length > 1
                ? { v: !1 }
                : viewState.viewId == b.URLHASH.KCL ||
                  viewState.viewId == b.URLHASH.KCLF ||
                  viewState.viewId == b.URLHASH.KCLB
                ? { v: !1 }
                : { v: !0 }
            );
          },
          G = function(t, n, i, a, o) {
            if (
              (!i && Y.resetX(),
              !(
                n - t < I.PARAM.minCandleNum ||
                n > viewState.dataLength ||
                0 > t ||
                n - t > I.PARAM.maxCandleNum
              ))
            ) {
              (viewState.start = t),
                (viewState.end = n),
                (viewState.currentLength = n - t);
              for (var s, r = f.length, l = 0; r > l; l++)
                (s = f[l]), s.setRange(a);
              M(), N(), o || W.onRange(e, r > 1);
            }
          };
        (this.onChangeView = C),
          (this.showYTD = function(t, n) {
            (viewState.viewId = b.URLHASH.KD + t), C(!0);
            var i = e.getYtdIndex(n);
            i && G(i[0], i[1] + 1);
          }),
          (this.moving = G),
          (this.callSdDraw = N);
        var Z = function(t, n) {
            var i = t instanceof a ? t : new a(t, n);
            n && (e = i), f.push(i), z(), C();
          },
          $ = function(n) {
            if ("mink" == b.URLHASH.gt(viewState.viewId).type) {
              var i = t.market(n.symbol),
                a = t.market(e.symbol);
              if (i != a && ("US" == i || "US" == a)) return !1;
            }
            return !0;
          };
        (this.compare = function(e) {
          for (var n = e.callback, i = f.length; i--; )
            if (f[i].symbol == e.symbol)
              return void (
                t.isFunc(n) && n({ code: 1, msg: "comparing same symbol" })
              );
          $(e)
            ? Z(e, !1)
            : t.isFunc(n) &&
              n({ code: 2, msg: "invalid comparing market or period" });
        }),
          (this.removeCompare = function(e, t) {
            for (var n, i, a = !1, o = e.length; o--; ) {
              i = e[o];
              for (var s = f.length; s--; )
                if (i == f[s].symbol) {
                  (a = !0), (n = f.splice(s, 1)[0]), n.clear(t), (n = null);
                  break;
                }
            }
            a && !t && (z(), M(), N());
          });
        var j,
          J = function(e) {
            e ? R() : viewState.end == viewState.dataLength && q.update();
          },
          Q = !1,
          ee = 0,
          te = function() {
            clearTimeout(j), (Q = !1), (ee = 0);
          },
          ne = function() {
            j = setTimeout(function() {
              ee > 0 && T(1), te();
            }, 500);
          };
        (this.pushData = function(e, t) {
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
          for (var i = e.length; i--; )
            for (var a = f.length; a--; )
              if (f[a].symbol === e[i].symbol && e[i].data) {
                ee++, f[a].doUpdate(y(J, null, n), !1, e[i].data, e[i].market);
                break;
              }
        }),
          (this.setScale = function(e) {
            (I.datas.scaleType = e), M(), N();
          }),
          (this.setLineStyle = function(n) {
            if (n) {
              !t.isArr(n) && (n = [n]);
              for (var i = n.length; i--; ) {
                var a = n[i];
                if (a.hasOwnProperty("symbol")) {
                  for (var o = a.symbol, s = f.length; s--; )
                    if (f[s].symbol == o) {
                      f[s].setLineStyle(a), f[s].draw();
                      break;
                    }
                } else e.setLineStyle(a), e.draw();
              }
            } else e.setLineStyle(), e.draw();
          }),
          (this.onResize = function(e) {
            for (var t = f.length; t--; ) f[t].resize(e);
          });
        var ie = -1,
          ae = -1,
          oe = function(e, t) {
            var n = viewState.start,
              i = viewState.end,
              a = e / Math.abs(e),
              o = a * Math.ceil((i - n) / I.PARAM.zoomUnit);
            if (
              (Math.abs(o) > I.PARAM.zoomLimit && (o = a * I.PARAM.zoomLimit),
              I.custom.centerZoom)
            ) {
              var s = t ? t.layerX / I.DIMENSION.w_k : 0.5;
              s < I.PARAM.zoomArea
                ? (i = Math.min(i - o * Math.abs(o), viewState.dataLength))
                : s > 1 - I.PARAM.zoomArea
                ? (n = Math.max(n + o * Math.abs(o), 0))
                : ((n = Math.max(n + o * Math.abs(o), 0)),
                  (i = Math.min(i - o * Math.abs(o), viewState.dataLength)));
            } else n = Math.max(n + o * Math.abs(o), 0);
            return n == ie && i == ae ? [-1] : ((ie = n), (ae = i), [n, i]);
          };
        (this.onWheel = function(e) {
          if (!P.isShowing()) {
            var t = e.detail || -1 * e.wheelDelta;
            if (0 != t) {
              var n = oe(t, e);
              G(n[0], n[1]);
            }
          }
        }),
          (this.onKb = function(e) {
            if ("keyup" == e.type) return void q.iToKb(null, !0);
            var t = e.keyCode;
            if (P.isShowing()) return void (27 == t && P.resetHisT());
            switch (t) {
              case 38:
              case 40:
                var n = oe(38 == t ? 1 : -1);
                G(n[0], n[1]);
                break;
              case 37:
              case 39:
                var i = q.iToKb(37 == t ? -1 : 1);
                i && (G(viewState.start + i, viewState.end + i), q.iToKb(0));
                break;
              case 13:
                P.historyT();
                break;
              default:
                return;
            }
            u.preventDefault(e);
          }),
          (this.zoomApi = function(e) {
            var t = oe(e ? 1 : -1);
            G(t[0], t[1]);
          }),
          (this.moveApi = function(e) {
            var t = viewState.start,
              n = viewState.end;
            (t += e),
              (n += e),
              n > viewState.dataLength &&
                ((n = viewState.dataLength),
                (t = viewState.start + n - viewState.end)),
              0 > t && ((t = 0), (n = viewState.end - viewState.start)),
              G(t, n);
          }),
          (this.shareTo = function(e) {
            e = p(
              {
                type: "weibo",
                url: window.location.href,
                wbtext: "",
                qrwidth: 100,
                qrheight: 100,
                extra: void 0,
              },
              e || {}
            );
            var n = String(e.type).toLowerCase();
            switch (n) {
              case "qrcode":
                KKE.api(
                  "utils.qrcode.createcanvas",
                  { text: e.url, width: e.qrwidth, height: e.qrheight },
                  function(e) {
                    B.showTip({
                      content: e,
                      txt:
                        '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                      parent: H,
                      btnLb: "\u5173\u95ed",
                    });
                  }
                );
                break;
              default:
                t.grabM.shareTo({
                  ctn: H,
                  w: I.DIMENSION.getStageW(),
                  h: I.DIMENSION.getStageH() - (D.clientHeight || 0),
                  ignoreZIdxArr: [I.PARAM.I_Z_INDEX],
                  ignoreIdArr: [I.PARAM.LOGO_ID],
                  priorZIdx: I.PARAM.G_Z_INDEX,
                  nologo: !1,
                  top: I.DIMENSION.posY + I.DIMENSION.H_MA4K + 17,
                  right: I.DIMENSION.RIGHT_W + I.DIMENSION.K_RIGHT_W,
                  LOGO_W: I.DIMENSION.LOGO_W,
                  LOGO_H: I.DIMENSION.LOGO_H,
                  color: I.COLOR.LOGO,
                  bgColor: I.COLOR.BG,
                  txt: e.wbtext,
                  url: e.url,
                  extra: e.extra,
                });
            }
          }),
          (this.getExtraData = function(n) {
            if (
              ((n = p({ symbol: e.symbol, name: null, clone: !0 }, n || {})),
              !n.name)
            )
              return null;
            for (var i, a, o = f.length; o--; )
              if (f[o].symbol === n.symbol) {
                i = f[o];
                break;
              }
            if (i) {
              var s;
              "currentK" == n.name
                ? ((s = i.kDb.get()), (a = n.clone ? t.clone(s, null) : s))
                : ((s = i.extraDataObj[n.name]),
                  (a = n.clone ? t.clone(s, null) : s));
            }
            return a;
          }),
          (this.updateDataAll = K),
          (this.outputNewRange = O),
          (this.dcReset = function() {
            clearInterval(l), clearTimeout(h);
            for (var e, t = f.length; t--; )
              (e = f.splice(t, 1)[0]), e.clear(), (e = null);
          }),
          (this.dcInit = function(e) {
            Z(e, !0), K();
          });
      }
      t.xh5_EvtDispatcher.call(this);
      var A = this;
      i = p(
        {
          candlenum: 0 / 0,
          datas: {
            day: {
              wfn: void 0,
              url: void 0,
              dataformatter: void 0,
              staticdata: void 0,
            },
            min: {
              wfn: void 0,
              url: void 0,
              dataformatter: void 0,
              staticdata: void 0,
            },
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
          tchartobject: { t: void 0, k: void 0 },
          theme: null,
          trace: void 0,
          view: "kd",
          w: 0 / 0,
          h: 0 / 0,
          zoomlimit: 0 / 0,
          zoomunit: 0 / 0,
        },
        i || { WANGXuan: "wangxuan2@staff.sina.com.cn", VER: "2.11.0" }
      );
      var I;
      !(function() {
        if (
          (!i.symbol && (i.symbol = "sh000001"),
          (i.symbol = String(i.symbol)),
          (i.rawSymbol = String(i.symbol)),
          (i.symbol =
            "LSE" === t.market(i.symbol)
              ? t.strUtil.replaceStr(i.symbol)
              : i.symbol.replace(".", "$")),
          (I = e.getSetting(
            [
              "_",
              i.symbol,
              "_",
              Math.floor(1234567890 * Math.random() + 1) +
                Math.floor(9876543210 * Math.random() + 1),
            ].join("")
          )),
          0 == location.protocol.indexOf("https:") && (i.ssl = !0),
          isNaN(i.rate) && (i.rate = I.PARAM.updateRate),
          !isNaN(i.mincandlenum) &&
            i.mincandlenum > 0 &&
            (I.PARAM.minCandleNum = i.mincandlenum),
          !isNaN(i.candlenum) &&
            i.candlenum >= I.PARAM.minCandleNum &&
            (I.PARAM.defaultCandleNum = i.candlenum),
          isNaN(i.maxcandlenum) || (I.PARAM.maxCandleNum = i.maxcandlenum),
          !isNaN(i.zoomunit) &&
            i.zoomunit > I.PARAM.minCandleNum &&
            (I.PARAM.zoomUnit = i.zoomunit),
          !isNaN(i.zoomlimit) &&
            i.zoomlimit > 0 &&
            (I.PARAM.zoomLimit = Math.round(i.zoomlimit)),
          g.noH5)
        ) {
          if ("undefined" == typeof FlashCanvas || i.fh5)
            return void (t.isFunc(i.noh5) && i.noh5(i));
          I.PARAM.isFlash = !0;
        }
        if (
          (I.PARAM.isFlash && (I.COLOR.F_BG = "#fff"),
          i.reorder || (I.custom.indicator_reorder = !1),
          i.reheight || (I.custom.indicator_reheight = !1),
          i.dim)
        )
          for (var n in i.dim)
            i.dim.hasOwnProperty(n) &&
              t.isNum(I.DIMENSION[n]) &&
              (I.DIMENSION[n] = i.dim[n]);
      })();
      var k,
        x,
        H,
        _,
        C,
        O,
        R,
        D,
        T,
        E,
        K,
        U,
        P,
        F = !1,
        z = 0,
        viewState = {
          viewId: b.URLHASH.vi(i.view || "kd"),
          dataLength: 0 / 0,
          start: 0 / 0,
          end: 0 / 0,
          currentLength: 0 / 0,
          startDate: void 0,
          endDate: void 0,
          movY: 0,
        },
        Y = {
          x: 0,
          resetX: function(e) {
            this.x = isNaN(e)
              ? I.DIMENSION.w_k /
                Math.max(viewState.currentLength, I.PARAM.minCandleNum)
              : e;
          },
        },
        B = new (function() {
          var e;
          (this.showTip = function(n) {
            e || (e = new t.TipM(I.COLOR)), e.genTip(n);
          }),
            (this.hideTip = function() {
              e && e.hide();
            });
        })(),
        W = new (function() {
          var e = function() {
            var e = T.get(viewState.viewId);
            return e ? e[e.length - 1] : null;
          };
          this.onRange = function(e, n) {
            !F &&
              t.isFunc(i.onrange) &&
              i.onrange({
                isCompare: n,
                data: e.datas,
                viewRangeState: t.clone(viewState, null),
                width: I.DIMENSION.w_k,
                height: I.DIMENSION.h_k,
                left: I.DIMENSION.posX,
                top: I.DIMENSION.H_MA4K,
                range: [e.labelMaxP, e.labelMinP, e.labelMaxVol],
                minCandleNum: I.PARAM.minCandleNum,
              });
          };
          var n = [];
          (this.onViewPrice = function(a, o, s, r, l, c) {
            if (!F && t.isFunc(i.onviewprice)) {
              if (!a) {
                if (((a = e()), !a)) return;
                o = viewState.currentLength - 1;
              }
              if (!s) {
                for (; n.length; ) n.length--;
                for (
                  var h, d, u, p, m = k.getAllStock(), f = 0, v = m.length;
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
                        color: p.getLineStyle().linecolor,
                      }));
                s = n;
              }
              l || (l = k.getMainStock().getName()),
                i.onviewprice({
                  data: t.clone(a, null),
                  rangedata: r,
                  idx: o,
                  left: I.DIMENSION.posX,
                  top: I.DIMENSION.H_MA4K,
                  data_array: s,
                  curname: l,
                  interacting: !!c,
                });
            }
          }),
            (this.onDataUpdate = function() {
              if (t.isFunc(i.ondataupdate)) {
                var n = e();
                n &&
                  i.ondataupdate({
                    data: t.clone(n, null),
                    idx: viewState.currentLength - 1,
                    left: I.DIMENSION.posX,
                    top: I.DIMENSION.H_MA4K,
                  });
              }
            }),
            (this.onViewChanged = function() {
              t.isFunc(i.onviewchanged) &&
                i.onviewchanged({ viewRangeState: t.clone(viewState, null) });
            }),
            (this.onInnerResize = function(e) {
              t.isFunc(i.oninnerresize) && i.oninnerresize(e);
            }),
            (this.onTechChanged = function(e) {
              t.isFunc(i.ontechchanged) && i.ontechchanged({ Indicator: e });
            }),
            (this.shortClickHandler = function() {
              t.isFunc(i.onshortclickmain) && i.onshortclickmain();
            });
        })(),
        X = new (function() {
          var e,
            n,
            a,
            o,
            s,
            r = 37,
            h = function(e, t, n) {
              var a = !1;
              isNaN(e) && (e = i.w || x.offsetWidth),
                isNaN(t) && (t = i.h || x.offsetHeight - i.mh);
              for (
                var o,
                  s = D.clientHeight || 0,
                  r = R.clientHeight || 0,
                  l = I.DIMENSION.getOneWholeTH(),
                  c = 0,
                  h = R.childNodes,
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
                r / (t - s) > 1 && ((r = u), (a = !0)),
                I.DIMENSION.setStageW(e),
                1 == z
                  ? d > 0 &&
                    (I.DIMENSION.setStageH(t, d * l + c + s), (a = !0), (z = 0))
                  : I.DIMENSION.setStageH(t, r + s),
                a
              );
            },
            d = function() {
              s && (s.style.display = I.custom.show_logo ? "" : "none");
            },
            p = function() {
              (P = new t.LoadingSign()), P.appendto(_);
            },
            m = function() {
              P.setPosition();
            },
            f = function(e, n, i) {
              var o = h(n, i, 0 / 0);
              if (e || (n && i)) {
                if (!k) return;
                k.onResize(o), q.onResize();
              }
              (a.style.left = "1px"),
                (a.style.top = I.DIMENSION.h_k + I.DIMENSION.H_MA4K + "px"),
                d(),
                m(),
                t.stc("k_wh", [
                  I.DIMENSION.getStageW(),
                  I.DIMENSION.getStageH(),
                ]);
            },
            v = function() {
              (x = l(i.domid) || i.dom),
                x || ((x = c("div")), document.body.appendChild(x)),
                (H = c("div")),
                (H.style.position = "relative"),
                (H.style.outlineStyle = "none"),
                (H.style.webkitUserSelect = H.style.userSelect = H.style.MozUserSelect =
                  "none"),
                (_ = c("div", "mainarea_" + I.uid)),
                (C = c("div")),
                _.appendChild(C),
                (O = c("div")),
                (O.style.position = "absolute"),
                (O.style.fontSize = O.style.lineHeight =
                  I.STYLE.FONT_SIZE + "px"),
                (O.style.width = "100%"),
                _.appendChild(O),
                H.appendChild(_),
                (R = c("div")),
                H.appendChild(R),
                (D = c("div")),
                H.appendChild(D),
                (e = new N({ width: r, height: I.DIMENSION.H_TIME_PART })),
                (n = e.g),
                (a = e.canvas),
                (a.style.position = "absolute"),
                H.appendChild(a),
                x.appendChild(H);
            },
            y = function(e) {
              var n = !1;
              if (e) {
                U && (n = U.setTheme(e));
                for (var i in e)
                  e.hasOwnProperty(i) &&
                    I.COLOR.hasOwnProperty(i) &&
                    I.COLOR[i] !== e[i] &&
                    ((I.COLOR[i] = e[i]), (n = !0));
                t.stc("k_thm", e);
              }
              return n && S.styleLogo({ logo: s, color: I.COLOR.LOGO }), n;
            },
            M = function(e) {
              !I.custom.mousewheel_zoom ||
                (document.activeElement !== H &&
                  document.activeElement.parentNode !== H) ||
                (k && k.onWheel(e), u.preventDefault(e), u.stopPropagation(e));
            },
            w = function(e) {
              I.custom.keyboard && k && k.onKb(e);
            },
            L = function() {
              t.xh5_deviceUtil.istd ||
                (g.info.name.match(/firefox/i)
                  ? u.addHandler(H, "DOMMouseScroll", M)
                  : u.addHandler(H, "mousewheel", M),
                (H.tabIndex = 0),
                u.addHandler(H, "keyup", w),
                u.addHandler(H, "keydown", w));
            },
            A = function(e) {
              (s = e), H.appendChild(e);
            };
          v(),
            p(),
            y(i.theme),
            f(),
            L(),
            S.getLogo({
              cb: A,
              id: I.PARAM.LOGO_ID,
              isShare: !1,
              top: I.DIMENSION.posY + I.DIMENSION.H_MA4K + 17,
              right: I.DIMENSION.RIGHT_W + I.DIMENSION.K_RIGHT_W,
              LOGO_W: I.DIMENSION.LOGO_W,
              LOGO_H: I.DIMENSION.LOGO_H,
              color: I.COLOR.LOGO,
            }),
            g.noH5 &&
              (B.showTip({ txt: i.nohtml5info || b.nohtml5info, parent: H }),
              t.stc("k_nh5")),
            (this.resizeAll = f),
            (this.innerResize = function(e) {
              k &&
                (h(0 / 0, 0 / 0, e),
                k.onResize(),
                q.onResize(),
                m(),
                W.onInnerResize({ height: I.DIMENSION.h_k }));
            }),
            (this.initTheme = y),
            (this.drawReMark = function(t) {
              if (t) {
                if (((a.style.display = ""), o == t)) return;
                var i = I.DIMENSION.H_TIME_PART;
                (o = t),
                  e.resize({ width: r, height: i, hd: I.PARAM.getHd() }),
                  (n.font = "12px " + I.STYLE.FONT_FAMILY),
                  (n.textBaseline = "top"),
                  (n.fillStyle = I.COLOR.REMARK_BG),
                  n.fillRect(0, 0, r, i),
                  (n.fillStyle = I.COLOR.REMARK_T),
                  n.fillText(t, 0, 0);
              } else a.style.display = "none";
            });
        })(),
        q = new (function() {
          var e,
            n,
            a,
            o,
            s = t.market(i.symbol),
            r = /^forex|^HF/.test(s),
            d = isNaN(i.nfloat) ? 2 : i.nfloat,
            u = 150,
            p = new (function() {
              var t = function(t) {
                var n = e.body.style;
                t && I.custom.show_floater
                  ? ((n.backgroundColor = I.COLOR.F_BG),
                    (n.color = I.COLOR.F_T),
                    (n.border = "1px solid " + I.COLOR.F_BR),
                    (n.display = ""))
                  : (n.display = "none");
              };
              (this.pv = function(n) {
                var i = e.body.style,
                  a = Math.max(I.DIMENSION.posX, 55) + 9;
                (i.left =
                  (n.x > I.DIMENSION.getStageW() >> 1
                    ? a
                    : I.DIMENSION.getStageW() - u - 9) + "px"),
                  (i.top = (n.y || 0) + "px"),
                  t(!0);
              }),
                (this.showFloater = t);
            })(),
            f = function() {
              function i() {
                var e,
                  n,
                  i =
                    "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;",
                  a =
                    "font-weight:normal;border:0;height:16px;text-align:center",
                  o =
                    "text-align:left;font-weight:normal;border:0;height:16px;padding:0",
                  s = "text-align:right;border:0;height:16px;padding:0",
                  h = c("div"),
                  p = h.style;
                (p.position = "absolute"),
                  (p.zIndex = I.PARAM.I_Z_INDEX + 2),
                  (p.padding = "2px"),
                  (p.width = u + "px"),
                  (p.lineHeight = "16px"),
                  (p.display = "none"),
                  (p.fontSize = "12px");
                var f,
                  v,
                  g,
                  y,
                  N = c("table"),
                  b = c("thead"),
                  S = c("tbody");
                (N.style.cssText = i),
                  (f = c("tr")),
                  (v = c("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = a);
                var w = c("span");
                v.appendChild(w),
                  f.appendChild(v),
                  b.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = a);
                var L = c("span");
                v.appendChild(L),
                  f.appendChild(v),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u5f00\u76d8");
                var A = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(A),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6700\u9ad8");
                var k = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(k),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6700\u4f4e");
                var x = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(x),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6536\u76d8");
                var H = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(H),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6da8\u8dcc");
                var _ = c("span");
                if (
                  ((g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(_),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  !r)
                ) {
                  (f = c("tr")),
                    (v = c("th")),
                    (v.style.cssText = o),
                    (g = c("td")),
                    (y = c("span")),
                    (y.innerHTML = "\u6210\u4ea4");
                  var C = c("span");
                  (g.style.cssText = s),
                    v.appendChild(y),
                    g.appendChild(C),
                    f.appendChild(v),
                    f.appendChild(g),
                    S.appendChild(f),
                    (f = c("tr")),
                    (v = c("th")),
                    (v.style.cssText = o),
                    (g = c("td")),
                    (y = c("span")),
                    (y.innerHTML = "\u6362\u624b");
                  var O = c("span");
                  (g.style.cssText = s),
                    v.appendChild(y),
                    g.appendChild(O),
                    f.appendChild(v),
                    f.appendChild(g),
                    S.appendChild(f),
                    (O.innerHTML = "--");
                }
                (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u632f\u5e45");
                var R = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(R),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u76d8\u540e\u91cf");
                var D = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(D),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f.id = "__floatingPostVolume"),
                  (f.style.display = "none"),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u76d8\u540e\u989d");
                var T = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(T),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f.id = "__floatingPostAmount"),
                  (f.style.display = "none"),
                  (D.innerHTML = T.innerHTML = "--"),
                  N.appendChild(b),
                  N.appendChild(S),
                  (N.style.width = "100%"),
                  h.appendChild(N);
                var E,
                  K,
                  U = function(e, t) {
                    var n = I.COLOR.F_N;
                    return (
                      e > t
                        ? (n = I.COLOR.F_RISE)
                        : t > e && (n = I.COLOR.F_FALL),
                      n
                    );
                  },
                  P = function(e, t) {
                    return t
                      ? "(" + (((e - t) / Math.abs(t)) * 100).toFixed(2) + "%)"
                      : "(--%)";
                  };
                (this.setFloaterData = function(i) {
                  if (
                    ((e = i.name || i.symbol || e || ""),
                    (w.innerHTML = e),
                    (E = i.data || n))
                  ) {
                    (n = E), (K = i.stock || K);
                    var a = K.market,
                      o = "";
                    switch (a) {
                      case "CN":
                      case "OTC":
                      case "REPO":
                        o = t.isCNK(K.symbol) ? "\u80a1" : "\u624b";
                        break;
                      case "US":
                      case "HK":
                        o = "\u80a1";
                        break;
                      default:
                        o = "";
                    }
                    var s = E.percent,
                      c = E.open,
                      h = E.close,
                      u = E.high,
                      p = E.low,
                      f = h / (1 + s) || E.prevclose;
                    L.innerHTML =
                      m.ds(E.date, "/") +
                      "/" +
                      m.nw(E.date.getDay()) +
                      (E.time || "");
                    var v = 1 > f || 1 > u || 1 > p ? 4 : d;
                    (A.innerHTML = c.toFixed(v) + P(c, f, v)),
                      (k.innerHTML = u.toFixed(v) + P(u, f, v)),
                      (x.innerHTML = p.toFixed(v) + P(p, f, v)),
                      (H.innerHTML = h.toFixed(v) + P(h, f, v)),
                      (s =
                        isNaN(s) || !isFinite(s) ? "--" : (100 * s).toFixed(2)),
                      (_.innerHTML = E.change.toFixed(v) + "(" + s + "%)");
                    var g = isNaN(E.ampP) ? "--" : (100 * E.ampP).toFixed(2);
                    if (
                      (E.ampP === 1 / 0 && (g = "--"),
                      (R.innerHTML = E.amplitude.toFixed(v) + "(" + g + "%)"),
                      (_.style.color = U(s, 0)),
                      (A.style.color = U(c, f)),
                      (k.style.color = U(u, f)),
                      (x.style.color = U(p, f)),
                      (H.style.color = U(h, f)),
                      r || (C.innerHTML = M(E.volume, 2) + o),
                      O && K)
                    ) {
                      var y = K.extraDataObj.rsAmount;
                      if (y) {
                        for (var N, b = 0, S = y.length; S > b; b++)
                          if (E.date >= y[b].date) {
                            N = y[b].amount;
                            break;
                          }
                        K.hq && K.hq.isKCB && N && (N *= 100),
                          N && (O.innerHTML = (E.volume / N).toFixed(2) + "%");
                      } else O.innerHTML = "--";
                    }
                    24 === viewState.viewId ||
                    23 === viewState.viewId ||
                    25 === viewState.viewId
                      ? K.hq &&
                        K.hq.isKCB &&
                        ((l("__floatingPostVolume").style.display =
                          "table-row"),
                        (l("__floatingPostAmount").style.display = "table-row"),
                        E.postVol
                          ? ((D.innerHTML = M(E.postVol, 0) + o),
                            (T.innerHTML = M(E.postAmt, 2)))
                          : ((T.innerHTML = "--"), (D.innerHTML = "--")))
                      : ((l("__floatingPostVolume").style.display = "none"),
                        (l("__floatingPostAmount").style.display = "none"));
                  }
                }),
                  (this.body = h),
                  (this.reset = function() {
                    (e = null), (n = null);
                  });
              }
              (n = new i()), (e = n);
            },
            v = function() {
              function e(e) {
                var t = c("div"),
                  n = c("div"),
                  i = c("span"),
                  a = 12,
                  o = e.isH,
                  s = function() {
                    if (
                      ((n.style.borderStyle = "dashed"),
                      (n.style.borderColor = I.COLOR.IVH_LINE),
                      (i.style.backgroundColor = I.COLOR[e.txtBgCN]),
                      (i.style.color = I.COLOR[e.txtCN]),
                      o)
                    )
                      (n.style.borderWidth = "1px 0 0 0"),
                        (t.style.width = n.style.width =
                          I.DIMENSION.getStageW() + "px"),
                        (i.style.top = -(0.6 * I.STYLE.FONT_SIZE) + "px"),
                        (i.style.width = I.DIMENSION.extend_draw
                          ? ""
                          : I.DIMENSION.posX + "px"),
                        (i.style.left = 0),
                        (i.style.padding = "1px 0");
                    else {
                      n.style.borderWidth = "0 1px 0 0";
                      var a,
                        s,
                        r = I.DIMENSION.H_MA4K + I.DIMENSION.H_T_B;
                      I.DIMENSION.getStageH() < 0
                        ? ((a = R.clientHeight), (s = a - r))
                        : ((a = I.DIMENSION.getStageH() - D.clientHeight || 0),
                          (s = I.DIMENSION.h_k)),
                        (a -= r),
                        (a += I.DIMENSION.I_V_O),
                        (t.style.height = n.style.height = a + "px"),
                        (i.style.top = s + "px"),
                        (i.style.padding = "2px 2px 1px");
                    }
                  };
                (t.style.position = "absolute"),
                  (t.style.zIndex = I.PARAM.I_Z_INDEX - 2),
                  (i.style.position = n.style.position = "absolute"),
                  (n.style.zIndex = 0),
                  (i.style.zIndex = 1),
                  (i.style.font =
                    I.STYLE.FONT_SIZE + "px " + I.STYLE.FONT_FAMILY),
                  (i.style.whiteSpace = "nowrap"),
                  (i.style.lineHeight = a + "px"),
                  e.txtA && (i.style.textAlign = e.txtA),
                  s(),
                  t.appendChild(i),
                  t.appendChild(n);
                var r = function(e) {
                  e
                    ? "" != t.style.display && (t.style.display = "")
                    : "none" != t.style.display && (t.style.display = "none");
                };
                (this.pv = function(e) {
                  if (
                    (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"),
                    (i.innerHTML = e.v || ""),
                    !isNaN(e.x))
                  ) {
                    e.x < 0 && (e.x = 0);
                    var n = e.x + (e.ox || 0),
                      a = I.DIMENSION.getStageW();
                    (n = ~~(n + 0.5)), (n -= 1), (t.style.left = n + "px");
                    var o = i.offsetWidth || 66,
                      s = o >> 1;
                    e.x < s ? (s = e.x) : n + s > a && (s = n + o - a),
                      (i.style.left = -s + "px");
                  }
                  r(!0);
                }),
                  (this.display = r),
                  (this.body = t),
                  (this.resize = s),
                  r(!1);
              }
              (a = new e({
                isH: !0,
                txtCN: "P_TC",
                txtBgCN: "P_BG",
                txtA: "right",
              })),
                (o = new e({
                  isH: !1,
                  txtCN: "T_TC",
                  txtBgCN: "T_BG",
                  txtA: "center",
                })),
                H.appendChild(o.body);
            },
            g = function() {
              a.display(!1), o.display(!1), p.showFloater(!1);
            },
            y = function(e) {
              E && E.indirectI(e), K && K.indirectI(e);
            },
            N = !1,
            S = !1,
            w = 0 / 0,
            L = !1;
          (this.getInteractiveIdx = function() {
            return w;
          }),
            (this.isIng = function() {
              return N;
            }),
            (this.isMoving = function() {
              return L;
            });
          var x = 0 / 0,
            C = 0 / 0,
            O = [];
          this.iToD = function(t, n, i) {
            if (!t.e || !S) {
              var s = t.x,
                r = t.ox || 0,
                l = t.y,
                c = t.oy || 0,
                h = t.e ? t.e.target : null;
              if (!i) {
                if (x == s && C == l) return;
                (x = s), (C = l);
              }
              if (h) {
                var u = h.style.height.split("px")[0];
                (0 > l || l > u) && ((s = 0 / 0), (l = 0 / 0));
              }
              var m = viewState.currentLength,
                f = Math.max(m, I.PARAM.minCandleNum);
              s += I.DIMENSION.w_k / f - Y.x;
              var v = Math.floor((s * f) / I.DIMENSION.w_k);
              if (
                (0 > v ? (v = 0) : v >= m && (v = m - 1),
                !isNaN(v) && (w = v),
                isNaN(s) && isNaN(l))
              )
                return (N = !1), g(), y(Number.MAX_VALUE), void W.onViewPrice();
              N = viewState.end != viewState.dataLength ? !0 : m - 1 > v;
              for (var M, L, H, _, R, D, T, E = Number(t.mark); O.length; )
                O.length--;
              if (n) {
                var K = k.getAllStock(),
                  U = K.length,
                  P = U > 1 || "percent" == I.datas.scaleType;
                I.custom.k_overlay && (P = !1);
                for (var F, z, B, X, q = Number.MAX_VALUE, G = 0; U > G; G++)
                  (B = K[G]),
                    (R = B.datas),
                    !R ||
                      R.length <= v ||
                      ((F = B.getName()),
                      (z = R[v]),
                      O.push({
                        name: F,
                        data: z,
                        rangedata: R,
                        symbol: B.symbol,
                        color: B.getLineStyle().linecolor,
                      }),
                      z.isFake ||
                        ((X = Math.abs(z.cy - l)),
                        q > X &&
                          ((q = X),
                          (_ = B),
                          (H = z),
                          (T = R),
                          (L = F),
                          (M = _.symbol))));
                if (P)
                  (D = 100 * E),
                    (D = Math.abs(D) > 999 ? Math.floor(D) : D.toFixed(2)),
                    (D += "%");
                else if (
                  ((D =
                    E > 99999 ? Math.floor(E) : E.toFixed(E > 9999 ? 1 : d)),
                  I.custom.show_k_rangepercent && _)
                ) {
                  var Z = ((E - _.prevclose) / _.prevclose) * 100;
                  (Z = isNaN(Z) || !isFinite(Z) ? "--" : Z.toFixed(d)),
                    (D += "<br/>" + Z + "%");
                }
              } else {
                if (
                  ((_ = k.getMainStock()), (R = _.datas), !R || R.length <= v)
                )
                  return;
                (H = R[v]), (T = R), (L = _.getName()), (M = _.symbol);
                var $ = Math.abs(E);
                (D = $ > 99999 ? Math.floor(E) : E.toFixed($ > 9999 ? 1 : d)),
                  O.push({
                    name: L,
                    data: H,
                    rangedata: T,
                    symbol: M,
                    color: _.getLineStyle().linecolor,
                  });
              }
              if (H) {
                var j = s;
                I.custom.stick && (s = H.ix || s),
                  e &&
                    (e.setFloaterData({
                      symbol: M,
                      name: L,
                      data: H,
                      stock: _,
                      arr: O,
                    }),
                    p.pv({ x: j, y: I.DIMENSION.K_F_T })),
                  a.pv({ y: l, v: D, oy: c }),
                  o.pv({
                    x: s,
                    ox: r,
                    y: I.DIMENSION.H_MA4K,
                    v: H.day + " " + (H.time || ""),
                  }),
                  y(v),
                  !L && (L = M || "--"),
                  W.onViewPrice(H, v, O, T, L, !0),
                  A.re(b.e.I_EVT, t.e);
              }
            }
          };
          var T, U, P;
          this.iToKb = function(e, t) {
            if (t) return void (S = !1);
            if (
              ((S = !0),
              (w += e),
              !h(_, q.iHLineO.body) && _.appendChild(q.iHLineO.body),
              (T = k.getMainStock()),
              (P = T.getName()),
              (U = T.datas),
              !U)
            )
              return void 0;
            if (0 > w) return (w = 0), -1;
            if (w >= U.length) return (w = U.length - 1), 1;
            var n = U[w];
            if (!n) return void 0;
            var i = {
              mark:
                T.labelMaxP -
                (n.cy / I.DIMENSION.h_k) * (T.labelMaxP - T.labelMinP),
              x: n.ix,
              y: n.cy,
              oy: I.DIMENSION.H_MA4K,
              ox: I.DIMENSION.posX,
            };
            return void this.iToD(i, !0, !0);
          };
          var F;
          (this.globalDragHandler = function(e, t, n, i, a) {
            if (isNaN(e) && isNaN(t))
              return (F = 0 / 0), (L = !1), void A.re(b.e.I_EVT, a);
            g();
            var o = viewState.start,
              s = viewState.end,
              r = s - o;
            isNaN(F) && (F = e);
            var l = t - F,
              c = viewState.dataLength,
              h = I.DIMENSION.w_k / r;
            if (Math.abs(l) < h) {
              if (I.custom.smooth && h > 4) {
                if (s >= c && 0 > l) return;
                if (1 > o && l > 0) return;
                (Y.x = l), k.callSdDraw();
              }
            } else {
              F = t;
              var d = Math.round((l * r) / I.DIMENSION.w_k);
              (o -= d),
                (s -= d),
                s >= c && ((s = c), (o = s - r)),
                0 > o && ((o = 0), (s = r)),
                (viewState.start != o || viewState.end != s) &&
                  (Y.resetX(0),
                  (viewState.movY = i - n),
                  k.moving(o, s, !0),
                  (L = !0));
            }
          }),
            (this.shortClickHandler = function() {
              W.shortClickHandler();
            }),
            (this.zoomView = function(e, t) {
              var n = -Number(e);
              0 == n && (n = 1);
              var i = viewState.start,
                a = viewState.end,
                o = n * Math.ceil((a - i) / I.PARAM.zoomUnit);
              if (
                (Math.abs(o) > I.PARAM.zoomLimit && (o = n * I.PARAM.zoomLimit),
                I.custom.centerZoom)
              ) {
                var s = Math.min.apply(Math, t),
                  r = s / I.DIMENSION.w_k,
                  l = Math.max.apply(Math, t),
                  c = l / I.DIMENSION.w_k;
                r < I.PARAM.zoomArea
                  ? (a = Math.min(a - o * Math.abs(o), viewState.dataLength))
                  : c > 1 - I.PARAM.zoomArea
                  ? (i = Math.max(i + o * Math.abs(o), 0))
                  : ((i = Math.max(i + o * Math.abs(o), 0)),
                    (a = Math.min(a - o * Math.abs(o), viewState.dataLength)));
              } else i = Math.max(i + o * Math.abs(o), 0);
              k.moving(i, a);
            }),
            f(),
            v(),
            (this.onResize = function() {
              a.resize(), o.resize();
            }),
            (this.iHLineO = a),
            (this.hideIUis = g),
            (this.update = function() {
              N || (y(Number.MAX_VALUE), e && e.setFloaterData({}));
            }),
            (this.iReset = function() {
              e.reset && e.reset();
            }),
            (this.patcher = new (function() {
              var i,
                a = {},
                o = function() {
                  if (i) {
                    e.body.parentNode && e.body.parentNode.removeChild(e.body);
                    var t = "vid_" + viewState.viewId;
                    if (i[t]) {
                      var o;
                      (o = a[t] ? a[t] : (a[t] = new i[t]())), (e = o);
                    } else e = n;
                  } else e = n;
                  !h(H, e.body) && H.appendChild(e.body);
                };
              (this.customFloater = function(e) {
                (i = e), o(), t.stc("k_fl", e);
              }),
                (this.switchFloater = o);
            })());
        })();
      k = new L();
      var G = new (function() {
        var e = this;
        this.resize = function(e, t) {
          X.resizeAll(!0, e, t);
        };
        var n,
          i = function(n, i) {
            if (I.hasOwnProperty(n)) {
              for (var a in i)
                if (i.hasOwnProperty(a) && t.isFunc(i[a])) return;
              "DIMENSION" == n && (z = 1), p(I[n], i), t.stc(n, i), e.resize();
            }
          },
          a = function(e, n) {
            var i;
            if (I.hasOwnProperty(e)) {
              i = t.clone(I[e], null);
              for (var a in i)
                if (i.hasOwnProperty(a))
                  if (t.isFunc(i[a])) (i[a] = null), delete i[a];
                  else if (n)
                    for (var o = n.length; o--; )
                      typeof i[a] === n[o] && ((i[a] = null), delete i[a]);
            }
            return i;
          },
          o = function(e, t, n) {
            n = p(
              { toremove: !1, isexclusive: !1, callback: void 0, addon: !1 },
              n || {}
            );
            n.toremove
              ? k.mM.removeAC(t, e)
              : n.isexclusive
              ? (k.mM.removeAC(null, e), k.mM.newAC(t, e, n))
              : k.mM.newAC(t, e, n);
          };
        (this.setLineStyle = function(e, i) {
          i || (n = e), k.setLineStyle(e), t.stc("k_style", e);
        }),
          (this.showScale = function(e) {
            k.setScale(e), t.stc("k_scale", e);
          }),
          (this.pushData = function(e, n) {
            !t.isArr(e) && (e = [e]), k.pushData(e, n);
          });
        var s,
          r,
          c = [],
          h = function() {
            if (c.length) {
              var e = c.shift();
              k.pushData([e], 1);
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
                i = e.symbol,
                a = e.market,
                o = 0,
                r = n.length;
              r > o;
              o++
            )
              (t = { symbol: i, data: n[o], market: a }), c.push(t);
            clearTimeout(s), (s = setTimeout(d, 20));
          }
        }),
          (this.hide = function(e) {
            (F = !0),
              q.hideIUis(),
              t.$CONTAINS(x, H) && x.removeChild(H),
              e && k.dcReset();
          }),
          (this.show = function(e) {
            (F = !1),
              e && (t.isStr(e) && (e = l(e)), (x = e)),
              t.$CONTAINS(x, H) || (x.appendChild(H), X.resizeAll(!0)),
              k.outputNewRange(!0),
              W.onViewPrice();
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
            X.drawReMark(t);
          },
          v = [],
          g = [],
          M = function() {
            for (; v.length; ) {
              var e = v.pop();
              g.length--, k.compare(e);
            }
          },
          N = function() {
            for (
              var e,
                t = k.getMainStock().symbol,
                n = k.getMainStock().market,
                i = k.getAllStock(),
                a = i.length;
              a--;

            ) {
              e = i[a];
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
            g.length && k.removeCompare(g, !0);
          },
          S = function() {
            (m = !1),
              e.setLineStyle(void 0, !0),
              e.showScale(void 0),
              k.mM.togglePt({ v: !0, ytd: !0 });
          },
          w = function(e) {
            "mink" == b.URLHASH.gt(e).type
              ? ((viewState.viewId = e), f(), N())
              : ((e += u), (viewState.viewId = e), f(u), M());
          },
          L = new (function() {
            (this.isClMode = !1),
              (this.exitClMode = function() {
                (this.isClMode = !1),
                  e.setLineStyle(n, !0),
                  k.mM.togglePt({ v: !0, ytd: !0 });
              }),
              (this.enterClMode = function() {
                this.isClMode = !0;
                var t = n && "mountain" == n.linetype ? "mountain" : "line";
                e.setLineStyle(
                  { linetype: t, linecolor: { K_CL: I.COLOR.T_P } },
                  !0
                ),
                  k.mM.togglePt({ v: !1, ytd: !0 });
              });
          })(),
          _ = !0;
        this.showView = function(e, n, i) {
          q.hideIUis(),
            _
              ? setTimeout(function() {
                  _ = !1;
                }, 99)
              : P.hide();
          var a = t.isNum(e) ? b.URLHASH.vn(e) : b.URLHASH.vi(e);
          if (a) {
            if ((m && S(), a == b.URLHASH.KCL)) L.enterClMode();
            else {
              L.isClMode && L.exitClMode();
              var o = k.getAllStock(),
                s = o && o.length > 1;
              s && k.mM.togglePt({ v: !1 });
            }
            w(a), k.onChangeView(!1, n), t.stc("k_v", e), !i && t.suda("vw", e);
          }
        };
        var C = !1;
        (this.showYTD = function(e, n) {
          (C = !!e),
            q.hideIUis(),
            m ||
              ((m = !0),
              this.setLineStyle(
                { linetype: "line", linecolor: { K_CL: I.COLOR.T_P } },
                !0
              ),
              !C && this.showScale("percent"),
              k.mM.togglePt({ v: !1, ytd: !0 })),
            f(u),
            k.showYTD(u, C),
            t.stc("k_v", b.URLHASH.NYTD),
            !n && t.suda("vw", b.URLHASH.NYTD);
        }),
          (this.showYear = function() {
            this.showYTD(!0);
          }),
          (this.setReK = function(e) {
            if (((e = parseInt(e)), !(isNaN(e) || Math.abs(e) > 1))) {
              u = e;
              var n = b.URLHASH.gt(viewState.viewId);
              t.stc("k_re", e);
              var i = e;
              "-1" == i && (i = "_1"),
                t.suda("k_re", "k_re" + i),
                "mink" != n.type &&
                  (m
                    ? this.showYTD(C, !0)
                    : this.showView(n.baseid, void 0, !0));
            }
          });
        var O = function(e) {
          var n;
          return (n = t.isStr(e) ? e.split(",") : [e.symbol]);
        };
        this.compare = function(e, n) {
          if (n) {
            for (var i = O(e), a = i.length; a--; )
              for (var o = g.length; o--; )
                if (i[a] == g[o]) {
                  g.splice(o, 1), v.splice(o, 1);
                  break;
                }
            k.removeCompare(O(e));
          } else k.compare(e), t.suda("k_comp");
          t.stc("k_comp", { rm: n, o: e });
        };
        var R = 0;
        this.tCharts = function(e, n) {
          o("tech", e, n), n && !n.noLog && (0 == R ? (R = 1) : t.sudaLog());
        };
        var D = 0;
        (this.pCharts = function(e, n) {
          o("price", e, n), n && !n.noLog && (0 == D ? (D = 1) : t.sudaLog());
        }),
          (this.showPCharts = function(e) {
            e && (k.mM.togglePt(e), t.stc("k_sp", e));
          }),
          (this.getIndicators = function() {
            var e = E ? E.getLog() : null,
              t = K ? K.getLog() : null;
            return { tCharts: e, pCharts: t };
          }),
          (this.getIndicatorData = function() {
            var e = E ? E.getExistingCharts() : null,
              t = K ? K.getExistingCharts() : null;
            return { tCharts: e, pCharts: t };
          });
        var Y;
        (this.showRangeSelector = function(e) {
          (Y = p({ display: !0, from: void 0, to: void 0 }, e || {})),
            k.mM.showRs(Y),
            t.stc("k_rs", e);
        }),
          (this.dateFromTo = function(e, n, i) {
            U && (U.dateFromTo(e, n, i), t.stc("k_ft", [e, n, i]));
          }),
          (this.setCustom = y(i, this, "custom")),
          (this.setTheme = function(e) {
            var t = X.initTheme(e);
            t && (this.setLineStyle({ linecolor: e }), this.resize());
          }),
          (this.setDimension = y(i, this, "DIMENSION")),
          (this.getDimension = y(a, null, "DIMENSION", ["boolean"])),
          (this.newSymbol = function(e) {
            if (
              (q.hideIUis(),
              q.iReset(),
              k.dcReset(),
              k.dcInit(e),
              B.hideTip(),
              E)
            ) {
              var n = E.getLog();
              (E = null), n && this.tCharts(n);
            }
            if (K) {
              var i = K.getLog();
              (K = null), i && this.pCharts(i);
            }
            Y && ((Y.from = void 0), (Y.to = void 0), k.mM.showRs(Y)),
              k.h5tM.resetHisT(),
              t.stc("k_ns", e);
          }),
          (this.toggleExtend = function() {
            var e = I.DIMENSION.extend_draw,
              t = I.DIMENSION.posX;
            i.call(this, "DIMENSION", {
              extend_draw: !e,
              posX: t > 9 ? 7 : 55,
            }),
              this.resize();
          }),
          (this.shareTo = function(e) {
            k.shareTo(e), t.stc("k_share", e);
            var n = e && e.type ? e.type : "weibo";
            t.suda("share", n);
          }),
          (this.getChartId = function() {
            return I.uid;
          }),
          (this.getSymbols = function() {
            return k.getAllSymbols();
          }),
          (this.patcher = { iMgr: q.patcher }),
          (this.getExtraData = function(e) {
            return k.getExtraData(e);
          }),
          (this.getCurrentData = function() {
            var e = T.get(viewState.viewId);
            return e && (e = e[e.length - 1]), t.clone(e, null);
          }),
          (this.getCurrentRange = function() {
            for (
              var e, t, n, i = [], a = k.getAllStock(), o = 0, s = a.length;
              s > o;
              o++
            )
              (n = a[o]),
                (t = n.getName()),
                (e = n.datas),
                i.push({ name: t, rangedata: e, symbol: n.symbol });
            return i;
          }),
          (this.zoom = function(e) {
            k.zoomApi(e), t.stc("k_zoom", e, 9e3);
          }),
          (this.rangeMove = function(e, t) {
            k.moving(e, t);
          }),
          (this.move = function(e) {
            (e = parseInt(e)),
              isNaN(e) || (k.moveApi(e), t.stc("k_move", e, 9e3));
          }),
          (this.update = function() {
            k.updateDataAll(), t.stc("k_up", 9e3);
          }),
          (this.type = "h5k"),
          (this.me = A);
      })();
      return k.dcInit(i), G;
    }
    function a() {
      (this.get = function(e, n) {
        t.stc("h5k_get");
        var a = new i(e);
        t.isFunc(n) && n(a), t.suda("h5k_" + t.market(e.symbol));
      }),
        (this.dual = function(e, n) {
          t.stc("h5k_dual"), (e.linetype = "line");
          var a = new i(e);
          a.setCustom({ k_overlay: !0 });
          var o = function(t) {
            a.me.rl(t, o);
            var n = e.dual;
            a.compare({
              symbol: n.symbol,
              name: n.name,
              datas: n.datas,
              linetype: "line",
              linecolor: n.theme,
            });
          };
          a.me.al(b.e.K_DATA_LOADED, o, !1),
            t.isFunc(n) && n(a),
            t.suda("dual_" + t.market(e.symbol));
        }),
        (this.tick = function(e, n) {
          t.stc("h5k_tick"),
            (e.pcm = 1),
            (e.view = b.URLHASH.NKMS),
            (e.rate = 600),
            (e.linetype = "line");
          var a = new i(e, !0);
          t.isFunc(n) && n(a),
            KKE.api("patch.atick.customfloater", { chart: a }, function(e) {
              a.patcher.iMgr.customFloater(e);
            }),
            a.setCustom({ smooth: !1 }),
            t.suda("tick_" + t.market(e.symbol));
        });
    }
    var o,
      s,
      r,
      l = t.$DOM,
      c = t.$C,
      h = t.$CONTAINS,
      d = t.xh5_PosUtil,
      u = t.xh5_EvtUtil,
      p = t.oc,
      m = t.dateUtil,
      f = m.stbd,
      v = t.xh5_ADJUST_HIGH_LOW.c,
      g = t.xh5_BrowserUtil,
      y = t.fBind,
      M = t.strUtil.ps,
      N = n.xh5_Canvas,
      b = e.globalCfg,
      S = t.logoM;
    return t.fInherit(i, t.xh5_EvtDispatcher), a;
  }
);

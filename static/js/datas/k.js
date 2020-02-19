xh5_define("datas.k", ["utils.util"], function(lib) {
  "use strict";
  var loadScript = lib.load,
    n = lib.dateUtil,
    kUtil = lib.kUtil,
    s = lib.xh5_S_KLC_D,
    o = 0 == location.protocol.indexOf("https:");
  return new (function() {
    this.VER = "2.7.0";
    var r = {
      CNKCB: {
        DAYK_URL:
          "http://quotes.sina.cn/cn/api/jsonp.php/$cb/KC_MarketDataService.getKLineData?symbol=$symbol"
      },
      CN: {
        MINK_URL:
          "http://quotes.sina.cn/cn/api/jsonp_v2.php/$cb/CN_MarketDataService.getKLineData?symbol=$symbol&scale=$scale&ma=no&datalen=1023",
        DAYK_URL:
          "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?d=$rn",
        DAYK_RE_URL:
          "http://finance.sina.com.cn/realstock/company/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq"
      },
      HK: {
        MINK_URL: "",
        DAYK_URL:
          "http://finance.sina.com.cn/stock/hkstock/$symbol/klc_kl.js?d=$rn",
        DAYK_RE_URL:
          "http://finance.sina.com.cn/stock/hkstock/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq"
      },
      US: {
        MINK_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinKService.getMinK?symbol=$symbol&type=$scale&___qn=3",
        DAYK_URL:
          "http://finance.sina.com.cn/us_stock/company/hisdata/klc_kl_$symbol.js",
        DAYK_RE_URL:
          "https://finance.sina.com.cn/us_stock/company/reinstatement/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq"
      },
      option_cn: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp_v2.php/$cb/StockOptionDaylineService.getSymbolInfo?symbol=$symbol"
      },
      op_m: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/FutureOptionAllService.getOptionDayline?symbol=$symbol"
      },
      forex: {
        DAYK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen"
      },
      forex_yt: {
        DAYK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getOldMinKline?symbol=$symbol&scale=$scale&datalen=$datalen"
      },
      OTC: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/thirdmarket/api/jsonp.php/$cb/ThirdDataService.ThirdDailyData?symbol=$symbol&_=$rn"
      },
      CFF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesDailyKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesMiniKLine$scalem?symbol=$symbol&_=$rn"
      },
      HF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/GlobalFuturesService.getGlobalFuturesDailyKLine?symbol=$symbol&_=$rn&source=web",
        INIT_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=hf&symbol=$symbol",
        MINK_URL:
          "http://gu.sina.cn/ft/api/jsonp.php/$cb/GlobalService.getMink?symbol=$symbol&type=$scale",
        INIT_VAR_PRE: "kke_future_"
      },
      NF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getDailyKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getFewMinLine?symbol=$symbol&type=$scale",
        INIT_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=nf&symbol=$symbol",
        INIT_VAR_PRE: "kke_future_"
      },
      global_index: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getDayLine?symbol=$symbol&num=100",
        INIT_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getTradeTime?symbol=$symbol&category=index",
        INIT_VAR_PRE: "kke_global_index_"
      },
      GOODS: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/SpotService.getDaily?symbol=$symbol"
      },
      BTC: {
        DAYK_URL:
          "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getDayKLine?symbol=$symbol&callback=$cb",
        MINK_URL:
          "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen&callback=$cb"
      },
      LSE: {
        DAYK_URL:
          "http://quotes.sina.cn/lse/api/jsonp.php/$cb/LSEService.getDays?symbol=$symbol"
      },
      MSCI: {
        DAYK_URL:
          "http://quotes.sina.cn/msci/api/jsonp.php/$cb/MSCIService.getDayLine?symbol=$symbol"
      }
    };
    r.REPO = r.CN;
    var l = function() {
        return {
          msg: "",
          data: null
        };
      },
      i = function(t, s, o) {
        var r = getK(o),
          l = o.symbol,
          i = o.newthour,
          c = 1,
          u = r.market;
        "CN" == u &&
          (c = s && /[gz]/.test(s.type) ? 10 : lib.isRepos(l) ? 10 : 100),
          lib.isRepos(l) && (c = 10),
          lib.isCNK(l) && (c = 1),
          t || (t = []);
        var p = 0 / 0,
          m = "";
        if (s && s.date) {
          var b,
            h = s.date,
            d = !1;
          if (
            (t.length > 0
              ? ((b = t[t.length - 1]), h || (h = b.date))
              : (d = !0),
            b)
          )
            if ("NF" === u || "GOODS" === u)
              n.stbd(b.date, h)
                ? 1 != s.iscff && s.withNight && s.time >= i
                  ? (d = !0)
                  : s.open &&
                    s.price &&
                    ((b.open = s.open),
                    (b.high = s.high),
                    (b.low = s.low),
                    (b.close = s.price),
                    (b.volume = s.totalVolume * c))
                : h < b.date || (d = !0);
            else if (n.stbd(b.date, h))
              "hf_CHA50CFD" === s.symbol && s.time >= i
                ? (d = !0)
                : s.date &&
                  s.open &&
                  s.price &&
                  ((b.open = s.open),
                  (b.high = s.high),
                  (b.low = s.low),
                  (b.close = s.price),
                  (b.volume = s.totalVolume * c),
                  (b.date = n.ddt(h)),
                  (b.postAmt = s.postAmount),
                  (b.postVol = s.postVolume * c));
            else if (h < b.date);
            else if (i)
              if ("hf_CHA50CFD" === s.symbol) d = !0;
              else if (s.time >= i) d = !0;
              else {
                var f = (h - b.date) / 1e3 / 24 / 60 / 60;
                d = f >= 2;
              }
            else d = !0;
          if (d) {
            var y = s.totalVolume * c;
            t.push({
              open: s.open,
              high: s.high,
              low: s.low,
              close: s.price,
              volume: y,
              date: n.ddt(h),
              postAmt: s.postAmount,
              postVol: s.postVolume
            });
          }
          (p = s.issueprice), (m = s.name);
        }
        if (t.length < 1) return [t, void 0, void 0, void 0];
        var _ = !isNaN(p) && p > 0 ? p : t[0].open;
        lib.oc(t[0], {
          prevclose: _,
          name: m,
          symbol: l
        });
        var v = kUtil.mw(t, s, _, c, r.endDay),
          g = v[0],
          k = v[1],
          N = v[2],
          $ = void 0;
        if (
          (kUtil.pd(t, null),
          kUtil.pd(g, null),
          kUtil.pd(k, null),
          kUtil.pd(N, null),
          s && s.settlement)
        ) {
          var w = t[t.length - 1];
          (w.ampP = w.amplitude / s.settlement),
            (w.change = w.close - s.settlement),
            (w.percent = w.change / s.settlement);
        }
        return (
          lib.oc(g[0], {
            name: m,
            symbol: l
          }),
          lib.oc(k[0], {
            name: m,
            symbol: l
          }),
          lib.oc(N[0], {
            name: m,
            symbol: l
          }),
          o.ytd &&
            (($ = kUtil.yd(t)),
            lib.oc($[0], {
              name: m,
              symbol: l
            })),
          [t, g, k, $, N]
        );
      },
      c = function(t, n, a) {
        var s = lib.market(t),
          l = s ? r[s][n ? "MINK_URL" : "DAYK_URL"] : null;
        return (o || a) && (l = lib.getSUrl(l)), l;
      },
      u = function(t, n) {
        var a,
          s,
          l = lib.market(t);
        return (
          r[l] && ((a = r[l].DAYK_RE_URL), (s = r[l].RE_VAR)),
          a && (o || n) && (a = lib.getSUrl(a)),
          {
            url: a,
            VAR: s,
            market: l
          }
        );
      },
      p = function(t, n) {
        var a,
          s,
          l,
          i = lib.market(t);
        return (
          r[i] &&
            ((a = r[i].INIT_URL), (s = r[i].INIT_VAR), (l = r[i].INIT_VAR_PRE)),
          a && (o || n) && (a = lib.getSUrl(a)),
          {
            url: a,
            VAR: s,
            varPre: l,
            market: i
          }
        );
      },
      m = {
        xh5Fund: function(e) {
          for (
            var t,
              n,
              a,
              s,
              o = new Date(),
              r = [o.getFullYear(), o.getMonth() + 1, o.getDate()].join("_"),
              l = e.data,
              i = e.symbol,
              c = l.split("#"),
              u = [],
              p = [],
              m = [],
              b = [],
              h = [],
              d = [],
              f = c.length;
            f--;

          )
            (s = c[f].split(",")),
              (t = s[0].slice(0, 4)),
              (n = s[0].slice(4, 6)),
              (a = s[0].slice(6, 8)),
              (a = [t, n, a].join("-")),
              u.push({
                d: a,
                c: s[1]
              }),
              p.push({
                d: a,
                c: s[2]
              }),
              m.push({
                d: a,
                c: s[3]
              }),
              b.push({
                d: a,
                c: s[4]
              }),
              h.push({
                d: a,
                c: s[5]
              }),
              d.push({
                d: a,
                c: s[6]
              });
          var y = ["_dwjz_", i, r].join(""),
            _ = ["_ljjz_", i, r].join(""),
            v = ["_lshb_", i, r].join(""),
            g = ["_pwbfbyd_", i, r].join(""),
            k = ["_pwbfbjd_", i, r].join(""),
            N = ["_pwbfbnd_", i, r].join(""),
            $ = ["_fh_", i, r].join("");
          (window[y] = u),
            (window[_] = p),
            (window[v] = m),
            (window[g] = b),
            (window[k] = h),
            (window[N] = d),
            (window[$] = {
              fhday: e.fhday,
              fhvalue: e.fhvalue,
              fhchaifen: e.fhchaifen
            });
        }
      },
      b = function(e) {
        var t = [];
        if (e)
          for (var n, a, s = 0, o = e.length; o > s; s++) {
            (a = e[s]), (n = Number(a.c));
            var r = a.d.split("-");
            t.push({
              close: n,
              open: Number(a.o) || n,
              high: Number(a.h) || n,
              low: Number(a.l) || n,
              volume: Number(a.v) || 0,
              date: new Date(Number(r[0]), Number(r[1]) - 1, Number(r[2]), 0),
              postVol: Number(a.pv) || 0,
              postAmt: Number(a.pa) || 0
            });
          }
        return t;
      },
      h = function(e) {
        var t = [];
        if (e)
          for (var n, a, s = e.split("|"), o = 0, r = s.length; r > o; o++)
            (n = s[o].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                t.push({
                  open: Number(n[1]),
                  low: Number(n[2]),
                  high: Number(n[3]),
                  close: Number(n[4]),
                  volume: Number(n[5]),
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  )
                }));
        return t;
      },
      d = function(e) {
        var t = [];
        if (e && e.result && e.result.data)
          for (
            var n, a, s = e.result.data, o = s.split("|"), r = 0, l = o.length;
            l > r;
            r++
          )
            (n = o[r].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                t.push({
                  open: Number(n[1]),
                  low: Number(n[2]),
                  high: Number(n[3]),
                  close: Number(n[4]),
                  volume: Number(n[5]),
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  )
                }));
        return t;
      },
      f = function(e) {
        var t = [];
        if (e && e.length)
          for (
            var n, a, s = 0.001, o = e.split("|"), r = 0, l = 0, i = o.length;
            i > l;
            l++
          )
            (n = o[l].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                (r = Number(n[4]) || r),
                t.push({
                  open: Number(n[1]) || r,
                  low: Number(n[2]) || r,
                  high: Number(n[3]) || r,
                  close: Number(n[4]) || r,
                  volume: Number(n[5]) * s,
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  )
                }));
        return t;
      },
      y = function(e) {
        var t = [];
        if (e)
          for (var n, a, s, o = 0, r = e.length; r > o; o++)
            (n = e[o]),
              (a = n[0].split("-")),
              (s = Number(n[4])),
              t.push({
                date: new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]), 0),
                open: Number(n[1]) || s,
                high: Number(n[2]) || s,
                low: Number(n[3]) || s,
                close: s,
                volume: Number(n[5]) || 0
              });
        return t;
      },
      _ = function(e) {
        var t = [];
        if (e)
          for (var n, a, s = e.length; s--; )
            (n = e[s]),
              (a = Number(n[4])),
              t.push({
                day: n[0],
                open: Number(n[1]) || a,
                high: Number(n[2]) || a,
                low: Number(n[3]) || a,
                close: a,
                volume: Number(n[5]) || 0
              });
        return t;
      },
      v = function(e) {
        var t = [];
        if (e)
          for (var a, s, o = 0, r = e.length; r > o; o++)
            (a = e[o]),
              (s = Number(a.close)),
              t.push({
                date: n.sd(a.date),
                volume: Number(a.volume),
                open: Number(a.open) || s,
                high: Number(a.high) || s,
                low: Number(a.low) || s,
                close: s
              });
        return t;
      },
      g = function(e, t) {
        if (!e) return null;
        for (var n, a = t.vu || 1, s = 0, o = e.length; o > s; s++)
          (n = e[s]),
            (n.high *= 1),
            (n.open *= 1),
            (n.low *= 1),
            (n.close *= 1),
            (n.volume *= a);
        return e;
      },
      k = function(e) {
        if (!e) return null;
        for (var t, a = 0, s = e.length; s > a; a++)
          (t = e[a]),
            (t.high = 1 * t.h),
            (t.open = 1 * t.o),
            (t.low = 1 * t.l),
            (t.close = 1 * t.c),
            (t.volume = 1 * t.v),
            (t.day = t.d),
            (t.date = n.sd(t.d));
        return e;
      },
      N = function(e) {
        if (!e) return null;
        for (var t, a = 0, s = e.length; s > a; a++)
          (t = e[a]),
            (t.high = 1 * t.h),
            (t.open = 1 * t.o),
            (t.low = 1 * t.l),
            (t.close = 1 * t.c),
            (t.volume = 1 * t.v),
            (t.date = n.sd(t.d));
        return e;
      },
      $ = function(t, a, s, o) {
        for (
          var r,
            l,
            i = lib.market(o.hqSb),
            c = "BTC" == i ? 0 : ("DINIW" == o.hqSb, 6),
            u = a.length;
          u-- && 0 != u;

        )
          for (
            var p = a[u],
              m = a[u - 1],
              b = n.ssd(p.day),
              h = n.ssd(m.day),
              d = u;
            h.setMinutes(h.getMinutes() + s) < b;

          ) {
            if (((r = h.getDay()), 6 == r)) {
              if (((l = h.getHours()), l >= c)) continue;
            } else {
              if (0 == r) continue;
              if (1 == r && ((l = h.getHours()), c > l)) continue;
            }
            var f = lib.clone(m, null);
            (f.day = n.dss(h)), a.splice(d++, 0, f);
          }
        for (
          var y = a[a.length - 1], _ = n.ssd(y.day);
          _.setMinutes(_.getMinutes() + s) < t;

        ) {
          if (((r = _.getDay()), 6 == r)) {
            if (((l = _.getHours()), l >= c)) continue;
          } else {
            if (0 == r) continue;
            if (1 == r && ((l = _.getHours()), c > l)) continue;
          }
          var v = {
            open: y.close,
            high: y.close,
            low: y.close,
            close: y.close,
            day: n.dss(_),
            prevclose: y.prevclose
          };
          "BTC" == i && (v.volume = 0), a.push(v), (y = v), (_ = n.ssd(y.day));
        }
      },
      w = function(t, a, s) {
        var o = lib.market(s.hqSb),
          r = "BTC" == o ? 0 : ("DINIW" == s.hqSb, 6),
          l = a[a.length - 1].day,
          i = l.split(" ")[0];
        if (n.stbds(t.date, i, null)) {
          var c,
            u,
            p,
            m = t.prevclose,
            b = t.date.getHours();
          if (r > b) {
            var h,
              d = !1;
            for (
              c = a.length;
              c-- &&
              ((h = !1),
              (p = a[c]),
              (u = Number(p.day.split(" ")[1].split(":")[0])),
              !d && r > u ? (h = !0) : u >= r && ((d = !0), (h = !0)),
              h);

            )
              p.prevclose = m;
          } else
            for (
              c = a.length;
              c-- &&
              ((p = a[c]),
              (u = Number(p.day.split(" ")[1].split(":")[0])),
              u >= r);

            )
              p.prevclose = m;
        }
      },
      D = function(t, a) {
        if (!t) return null;
        var s,
          o,
          r = Number(a.scale),
          l = lib.market(a.hqSb);
        a.hqObjs &&
          ((s = a.hqObjs[a.hqSb]),
          (o = new Date(1e3 * a.hqObjs[a.withsymbol].hqstr))),
          o || (o = new Date());
        var i = 60 * o.getTimezoneOffset() * 1e3;
        o.setTime(o.getTime() + i), o.setHours(o.getHours() + 8);
        for (var c, u, p = 0, m = t.length; m > p; p++)
          if (
            ((u = t[p]),
            (u.high = 1 * u.h),
            (u.open = 1 * u.o),
            (u.low = 1 * u.l),
            (u.close = 1 * u.c),
            "BTC" == l && (u.volume = 1 * u.v),
            r > 1)
          ) {
            var b = n.ssd(u.d);
            b.setMinutes(b.getMinutes() + r), (u.day = n.dss(b));
          } else
            (u.day = u.d),
              isNaN(u.p) || (c = u.p),
              isNaN(c) && (c = u.o),
              (u.prevclose = 1 * c);
        return $(o, t, r, a), 1 == r && s && w(s, t, a), t;
      },
      R = function(e, t) {
        return e && e.result && e.result.data
          ? ((e = e.result.data), D(e, t))
          : null;
      },
      getK = function(conf) {
        var dataurl,
          symbol = conf.symbol,
          volunit = conf.volunit || 1,
          mkCode = lib.market(symbol),
          l = !1;
        conf.dataurl && conf.dataurl.length > 1
          ? (dataurl = conf.dataurl)
          : (/^(CN|HK|US|REPO)/.test(mkCode) && (l = !0),
            lib.isCNK(conf.symbol) &&
              ((l = !1), (r.CN.DAYK_URL = r.CNKCB.DAYK_URL)),
            (dataurl = c(symbol, !!conf.ismink, conf.ssl)));
        var i,
          u,
          p,
          m = symbol,
          g = symbol;
        switch (mkCode) {
          case "HK":
            (m = 0 == symbol.indexOf("rt_") ? symbol : "rt_" + symbol),
              (g = m.substring(5));
            break;
          case "US":
            (m = 0 == symbol.indexOf("gb_") ? symbol : "gb_" + symbol),
              (g = m.split("_")[1]),
              (g = g.replace("$", ".")),
              (g = g.toUpperCase()),
              (i = k);
            break;
          case "op_m":
            g = m.replace("P_OP_", "");
            break;
          case "CN":
          case "REPO":
            (volunit = 0.01), lib.isCNK(m) && (volunit = 1);
            break;
          case "forex":
          case "forex_yt":
            (i = D), (u = h), (p = 5);
            break;
          case "BTC":
            (g = m.replace("btc_", "")), (i = R), (u = d), (p = 5);
            break;
          case "OTC":
            (g = symbol.replace("sb", "otc_")), (u = f);
            break;
          case "CFF":
            var $ = m.split("_");
            (g = $[$.length - 1]), (u = y), (i = _);
            break;
          case "HF":
            (m = 0 == symbol.indexOf("hf_") ? symbol : "hf_" + symbol),
              (g = m.split("_")[1]),
              (u = v),
              (i = k);
            break;
          case "NF":
            (m = 0 == symbol.indexOf("nf_") ? symbol : "nf_" + symbol),
              (g = m.split("_")[1]),
              (u = b),
              (i = k);
            break;
          case "global_index":
            (m = 0 == symbol.indexOf("znb_") ? symbol : "znb_" + symbol),
              (g = m.split("_")[1]),
              (u = N);
            break;
          case "LSE":
            (m = 0 == symbol.indexOf("lse_") ? symbol : "lse_" + symbol),
              (g = m.split("_")[1]),
              (m = lib.strUtil.replaceStr(m)),
              (u = N);
            break;
          case "MSCI":
            (m = 0 == symbol.indexOf("msci_") ? symbol : "msci_" + symbol),
              (g = symbol.replace("msci_", "")),
              (u = b);
            break;
          case "GOODS":
            (m = 0 == symbol.indexOf("gds_") ? symbol : "gds_" + symbol),
              (g = m.split("_")[1]),
              (u = N);
        }
        return (
          conf.customksb && (g = conf.customksb),
          {
            hqSb: m,
            kSb: g,
            dayDataHandler: u,
            minDataHandler: i,
            endDay: p,
            kUrl: dataurl,
            isCompressData: l,
            vu: volunit,
            market: mkCode
          }
        );
      },
      S = function(n, s) {
        var o = getK(n),
          r = new Date(),
          i = [r.getFullYear(), r.getMonth() + 1, r.getDate()].join("_"),
          c = n.scale,
          u = n.$scale || "$scale",
          p = n.datalen || 828,
          m = "_" + o.kSb.replace(/\W/g, "") + "_" + c + "_" + r.getTime(),
          b = function(r) {
            var b = r ? r.dataObj : void 0,
              h = l();
            loadScript(
              o.kUrl
                .replace("$symbol", o.kSb)
                .replace(u, c)
                .replace("$cb", "var%20" + m + "=")
                .replace("$rn", i)
                .replace("$datalen", p),
              function() {
                var t = window[m],
                  r = n.dataformatter || o.minDataHandler || g;
                if (
                  (t = r(t, {
                    vu: o.vu,
                    withsymbol: n.withsymbol,
                    hqSb: o.hqSb,
                    hqObjs: b,
                    scale: c
                  }))
                ) {
                  var l = {};
                  1 == c &&
                    (/^forex/.test(o.market) || /^BTC/.test(o.market)) &&
                    (l.usePc = !0),
                    kUtil.pd(t, l),
                    (h.data = t);
                } else h.msg = "error";
                lib.isFunc(s) && s(h);
              },
              function() {
                (h.msg = "error"), lib.isFunc(s) && s(h);
              },
              {
                market: o.market,
                symbol: o.hqSb,
                type: "mink"
              }
            );
          };
        n.withsymbol
          ? KKE.api(
              "datas.hq.get",
              {
                symbol: [n.withsymbol, o.hqSb].join(","),
                cancelEtag: !0,
                ssl: n.ssl
              },
              b
            )
          : b();
      },
      L = function(n, a) {
        var o = getK(n);
        var r = function(r) {
          var c = r ? r.data[0] : void 0,
            u = l(),
            date = new Date();
          let ymdStr = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ].join("_");
          let h = "_" + o.kSb.replace(/\W/g, "") + ymdStr;
          let url = o.kUrl
            .replace("$symbol", o.kSb)
            .replace("$rn", ymdStr)
            .replace("$cb", "var%20" + h + "=");

          console.log(url);

          loadScript(
            url,
            function() {
              var t;
              if (o.isCompressData) {
                var r = o.kSb.replace(".", "$");
                t = window["KLC_KL_" + r];
                t = s(t);
              } else {
                t = window[h];
                var l = n.dataformatter || o.dayDataHandler || b;
                t = l(t);
              }
              var p = i(t, c, n);
              p
                ? (u.data = {
                    hq: c,
                    day: p[0],
                    week: p[1],
                    month: p[2],
                    ytd: p[3] || null,
                    year: p[4]
                  })
                : (u.msg = "error");
              lib.isFunc(a) && a(u);
            },
            function() {
              if (c) {
                var t = i(null, c, n);
                t
                  ? (u.data = {
                      hq: c,
                      day: t[0],
                      week: t[1],
                      month: t[2],
                      ytd: t[3] || null,
                      year: t[4]
                    })
                  : (u.msg = "error"),
                  lib.isFunc(a) && a(u);
              } else
                (u.msg = "error"),
                  (u.data = {
                    hq: c
                  }),
                  lib.isFunc(a) && a(u);
            },
            {
              market: o.market,
              symbol: o.hqSb,
              type: "k"
            }
          );
        };
        "undefined" == typeof o.market || "UNKNOWN" === o.market
          ? r()
          : KKE.api(
              "datas.hq.get",
              {
                symbol: o.hqSb,
                cancelEtag: !0,
                withI: !0,
                ssl: n.ssl
              },
              r
            );
      },
      U = function(t, n) {
        var s = t.staticdata,
          o = l();
        if (t.ismink) kUtil.pd(s, null), (o.data = s);
        else {
          var r = i(s, null, t);
          o.data = {
            day: r[0],
            week: r[1],
            month: r[2],
            ytd: r[3] || null,
            year: r[4]
          };
        }
        lib.isFunc(n) && n(o);
      };
    (this.get = function(t, n) {
      t.staticdata
        ? U(t, n)
        : (t.wfn && lib.isFunc(m[t.wfn]) && (window[t.wfn] = m[t.wfn]),
          t.ismink ? S(t, n) : L(t, n));
    }),
      (this.loadReData = function(n, a) {
        var s = l(),
          o = {
            HK: n.symbol.replace("rt_hk", ""),
            US: n.symbol
              .replace("gb_", "")
              .replace("$", ".")
              .toUpperCase(),
            CN: n.symbol
          }[n.market.toUpperCase()],
          r = u(n.symbol, n.ssl),
          i = r.url;
        if (!i) return (s.msg = "error"), void (lib.isFunc(a) && a(s));
        var c = n.dir,
          p = r.VAR || "";
        (p = p.replace("$symbol", o).replace("$dir", c)),
          "HK" === n.market && (p = "hk" + p);
        var m = new Date(),
          b = m.getHours();
        loadScript(
          i
            .replace("$symbol", o)
            .replace("$dir", c)
            .replace("$rn", b),
          function() {
            var t = window[p];
            (window[p] = null),
              t && t.total > 0 ? (s.data = t.data) : (s.msg = "error"),
              lib.isFunc(a) && a(s);
          },
          function() {
            (s.msg = "error"), lib.isFunc(a) && a(s);
          },
          {
            market: r.market,
            symbol: o,
            type: "rek"
          }
        );
      }),
      (this.loadHFInit = function(n, a) {
        var s = l(),
          o = n.symbol,
          r = p(o, n.ssl),
          i = r.url,
          c = r.varPre,
          u = c + o,
          m = window[u];
        m
          ? ((s.data = m), lib.isFunc(a) && a(s))
          : ((o = o.split("hf_")[1]),
            loadScript(
              i.replace("$cb", "var%20" + u + "=").replace("$symbol", o),
              function() {
                (m = window[u]),
                  m
                    ? (s.data = m)
                    : ((window[u] = null), (s.msg = "error, illegal data")),
                  lib.isFunc(a) && a(s);
              },
              function() {
                (s.msg = "error"), lib.isFunc(a) && a(s);
              },
              {
                market: r.market,
                symbol: o,
                type: "init_hf"
              }
            ));
      }),
      (this.loadNFInit = function(n, a) {
        var s = l(),
          o = n.symbol,
          r = p(o, n.ssl),
          i = r.url,
          c = r.varPre,
          u = c + o,
          m = window[u];
        m
          ? ((s.data = m), lib.isFunc(a) && a(s))
          : ((o = o.match(/^nf_([a-zA-Z]+)\d+$/)[1]),
            loadScript(
              i.replace("$cb", "var%20" + u + "=").replace("$symbol", o),
              function() {
                (m = window[u]),
                  m
                    ? (s.data = m)
                    : ((window[u] = null), (s.msg = "error, illegal data")),
                  lib.isFunc(a) && a(s);
              },
              function() {
                (s.msg = "error"), lib.isFunc(a) && a(s);
              },
              {
                market: r.market,
                symbol: o,
                type: "init_nf"
              }
            ));
      }),
      (this.loadGBInit = function(n, a) {
        var s = l(),
          o = n.symbol,
          r = p(o, n.ssl),
          i = r.url,
          c = r.varPre,
          u = c + o,
          m = window[u];
        m
          ? ((s.data = m), lib.isFunc(a) && a(s))
          : ((o = o.split("znb_")[1]),
            loadScript(
              i.replace("$cb", "var%20" + u + "=").replace("$symbol", o),
              function() {
                (m = window[u]),
                  m
                    ? (s.data = m)
                    : ((window[u] = null), (s.msg = "error, illegal data")),
                  lib.isFunc(a) && a(s);
              },
              function() {
                (s.msg = "error"), lib.isFunc(a) && a(s);
              },
              {
                market: r.market,
                symbol: o,
                type: "init_global"
              }
            ));
      });
  })();
});

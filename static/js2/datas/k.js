xh5_define("datas.k", ["utils.util"], function(e) {
  "use strict";
  var t = e.load,
    n = e.dateUtil,
    a = e.kUtil,
    i = e.xh5_S_KLC_D,
    o = 0 == location.protocol.indexOf("https:");
  return new (function() {
    this.VER = "2.7.2";
    var s = {
      CNKCB: {
        DAYK_URL:
          "http://quotes.sina.cn/cn/api/jsonp.php/$cb/KC_MarketDataService.getKLineData?symbol=$symbol",
      },
      CN: {
        MINK_URL:
          "http://quotes.sina.cn/cn/api/jsonp_v2.php/$cb/CN_MarketDataService.getKLineData?symbol=$symbol&scale=$scale&ma=no&datalen=1023",
        DAYK_URL:
          "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?d=$rn",
        DAYK_RE_URL:
          "http://finance.sina.com.cn/realstock/company/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq",
      },
      HK: {
        MINK_URL: "",
        DAYK_URL:
          "http://finance.sina.com.cn/stock/hkstock/$symbol/klc_kl.js?d=$rn",
        DAYK_RE_URL:
          "http://finance.sina.com.cn/stock/hkstock/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq",
      },
      US: {
        MINK_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinKService.getMinK?symbol=$symbol&type=$scale&___qn=3",
        DAYK_URL: "http://finance.sina.com.cn/staticdata/us/$symbol",
        DAYK_RE_URL:
          "https://finance.sina.com.cn/us_stock/company/reinstatement/$symbol_$dirfq.js",
        RE_VAR: "$symbol_$dirfq",
      },
      option_cn: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp_v2.php/$cb/StockOptionDaylineService.getSymbolInfo?symbol=$symbol",
      },
      op_m: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/FutureOptionAllService.getOptionDayline?symbol=$symbol",
      },
      forex: {
        DAYK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen",
      },
      forex_yt: {
        DAYK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getOldMinKline?symbol=$symbol&scale=$scale&datalen=$datalen",
      },
      OTC: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/thirdmarket/api/jsonp.php/$cb/ThirdDataService.ThirdDailyData?symbol=$symbol&_=$rn",
      },
      CFF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesDailyKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesMiniKLine$scalem?symbol=$symbol&_=$rn",
      },
      HF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/GlobalFuturesService.getGlobalFuturesDailyKLine?symbol=$symbol&_=$rn&source=web",
        INIT_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=hf&symbol=$symbol",
        MINK_URL:
          "http://gu.sina.cn/ft/api/jsonp.php/$cb/GlobalService.getMink?symbol=$symbol&type=$scale",
        INIT_VAR_PRE: "kke_future_",
      },
      NF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getDailyKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getFewMinLine?symbol=$symbol&type=$scale",
        INIT_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=nf&symbol=$symbol",
        INIT_VAR_PRE: "kke_future_",
      },
      global_index: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getDayLine?symbol=$symbol&num=100",
        INIT_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getTradeTime?symbol=$symbol&category=index",
        INIT_VAR_PRE: "kke_global_index_",
      },
      GOODS: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/SpotService.getDaily?symbol=$symbol",
      },
      BTC: {
        DAYK_URL:
          "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getDayKLine?symbol=$symbol&callback=$cb",
        MINK_URL:
          "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen&callback=$cb",
      },
      LSE: {
        DAYK_URL:
          "http://quotes.sina.cn/lse/api/jsonp.php/$cb/LSEService.getDays?symbol=$symbol",
      },
      MSCI: { DAYK_URL: "http://finance.sina.com.cn/staticdata/msci/$symbol" },
    };
    s.REPO = s.CN;
    var r = function() {
        return { msg: "", data: null };
      },
      l = function(datas, i, o) {
        var s = A(o),
          r = o.symbol,
          l = o.newthour,
          c = 1,
          h = s.market;
        "CN" == h &&
          (c = i && /[gz]/.test(i.type) ? 10 : e.isRepos(r) ? 10 : 100),
          e.isRepos(r) && (c = 10),
          e.isCNK(r) && (c = 1),
          datas || (datas = []);
        var d = 0 / 0,
          u = "";
        if (i && i.date) {
          var p,
            m = i.date,
            f = !1;
          if (
            (datas.length > 0
              ? ((p = datas[datas.length - 1]), m || (m = p.date))
              : (f = !0),
            p)
          )
            if ("NF" === h || "GOODS" === h)
              n.stbd(p.date, m)
                ? 1 != i.iscff && i.withNight && i.time >= l
                  ? (f = !0)
                  : i.open &&
                    i.price &&
                    ((p.open = i.open),
                    (p.high = i.high),
                    (p.low = i.low),
                    (p.close = i.price),
                    (p.volume = i.totalVolume * c))
                : m < p.date || (f = !0);
            else if (n.stbd(p.date, m))
              "hf_CHA50CFD" === i.symbol && i.time >= l
                ? (f = !0)
                : i.date &&
                  i.open &&
                  i.price &&
                  ((p.open = i.open),
                  (p.high = i.high),
                  (p.low = i.low),
                  (p.close = i.price),
                  (p.volume = i.totalVolume * c),
                  (p.date = n.ddt(m)),
                  (p.postAmt = i.postAmount),
                  (p.postVol = i.postVolume * c));
            else if (m < p.date);
            else if (l)
              if ("hf_CHA50CFD" === i.symbol) f = !0;
              else if (i.time >= l) f = !0;
              else {
                var v = (m - p.date) / 1e3 / 24 / 60 / 60;
                f = v >= 2;
              }
            else f = !0;
          if (f) {
            var g = i.totalVolume * c;
            datas.push({
              open: i.open,
              high: i.high,
              low: i.low,
              close: i.price,
              volume: g,
              date: n.ddt(m),
              postAmt: i.postAmount,
              postVol: i.postVolume,
            });
          }
          (d = i.issueprice), (u = i.name);
        }
        if (datas.length < 1) return [datas, void 0, void 0, void 0];
        var b = !isNaN(d) && d > 0 ? d : datas[0].open;
        e.oc(datas[0], { prevclose: b, name: u, symbol: r });
        var y = a.mw(datas, i, b, c, s.endDay),
          N = y[0],
          _ = y[1],
          w = y[2],
          M = void 0;
        if (
          (a.pd(datas, null),
          a.pd(N, null),
          a.pd(_, null),
          a.pd(w, null),
          i && i.settlement)
        ) {
          var k = datas[datas.length - 1];
          (k.ampP = k.amplitude / i.settlement),
            (k.change = k.close - i.settlement),
            (k.percent = k.change / i.settlement);
        }
        return (
          e.oc(N[0], { name: u, symbol: r }),
          e.oc(_[0], { name: u, symbol: r }),
          e.oc(w[0], { name: u, symbol: r }),
          o.ytd && ((M = a.yd(datas)), e.oc(M[0], { name: u, symbol: r })),
          [datas, N, _, M, w]
        );
      },
      c = function(t, n, a) {
        var i = e.market(t),
          r = i ? s[i][n ? "MINK_URL" : "DAYK_URL"] : null;
        return (o || a) && (r = e.getSUrl(r)), r;
      },
      h = function(t, n) {
        var a,
          i,
          r = e.market(t);
        return (
          s[r] && ((a = s[r].DAYK_RE_URL), (i = s[r].RE_VAR)),
          a && (o || n) && (a = e.getSUrl(a)),
          { url: a, VAR: i, market: r }
        );
      },
      d = function(t, n) {
        var a,
          i,
          r,
          l = e.market(t);
        return (
          s[l] &&
            ((a = s[l].INIT_URL), (i = s[l].INIT_VAR), (r = s[l].INIT_VAR_PRE)),
          a && (o || n) && (a = e.getSUrl(a)),
          { url: a, VAR: i, varPre: r, market: l }
        );
      },
      u = {
        xh5Fund: function(e) {
          for (
            var t,
              n,
              a,
              i,
              o = new Date(),
              s = [o.getFullYear(), o.getMonth() + 1, o.getDate()].join("_"),
              r = e.data,
              l = e.symbol,
              c = r.split("#"),
              h = [],
              d = [],
              u = [],
              p = [],
              m = [],
              f = [],
              v = c.length;
            v--;

          )
            (i = c[v].split(",")),
              (t = i[0].slice(0, 4)),
              (n = i[0].slice(4, 6)),
              (a = i[0].slice(6, 8)),
              (a = [t, n, a].join("-")),
              h.push({ d: a, c: i[1] }),
              d.push({ d: a, c: i[2] }),
              u.push({ d: a, c: i[3] }),
              p.push({ d: a, c: i[4] }),
              m.push({ d: a, c: i[5] }),
              f.push({ d: a, c: i[6] });
          var g = ["_dwjz_", l, s].join(""),
            b = ["_ljjz_", l, s].join(""),
            y = ["_lshb_", l, s].join(""),
            N = ["_pwbfbyd_", l, s].join(""),
            _ = ["_pwbfbjd_", l, s].join(""),
            w = ["_pwbfbnd_", l, s].join(""),
            M = ["_fh_", l, s].join("");
          (window[g] = h),
            (window[b] = d),
            (window[y] = u),
            (window[N] = p),
            (window[_] = m),
            (window[w] = f),
            (window[M] = {
              fhday: e.fhday,
              fhvalue: e.fhvalue,
              fhchaifen: e.fhchaifen,
            });
        },
      },
      p = function(e) {
        var t = [];
        if (e)
          for (var n, a, i = 0, o = e.length; o > i; i++) {
            (a = e[i]), (n = Number(a.c));
            var s = a.d.split("-");
            t.push({
              close: n,
              open: Number(a.o) || n,
              high: Number(a.h) || n,
              low: Number(a.l) || n,
              volume: Number(a.v) || 0,
              date: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2]), 0),
              postVol: Number(a.pv) || 0,
              postAmt: Number(a.pa) || 0,
            });
          }
        return t;
      },
      m = function(e) {
        var t = [];
        if (e)
          for (var n, a, i = e.split("|"), o = 0, s = i.length; s > o; o++)
            (n = i[o].split(",")),
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
                  ),
                }));
        return t;
      },
      f = function(e) {
        var t = [];
        if (e && e.result && e.result.data)
          for (
            var n, a, i = e.result.data, o = i.split("|"), s = 0, r = o.length;
            r > s;
            s++
          )
            (n = o[s].split(",")),
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
                  ),
                }));
        return t;
      },
      v = function(e) {
        var t = [];
        if (e && e.length)
          for (
            var n, a, i = 0.001, o = e.split("|"), s = 0, r = 0, l = o.length;
            l > r;
            r++
          )
            (n = o[r].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                (s = Number(n[4]) || s),
                t.push({
                  open: Number(n[1]) || s,
                  low: Number(n[2]) || s,
                  high: Number(n[3]) || s,
                  close: Number(n[4]) || s,
                  volume: Number(n[5]) * i,
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  ),
                }));
        return t;
      },
      g = function(e) {
        var t = [];
        if (e)
          for (var n, a, i, o = 0, s = e.length; s > o; o++)
            (n = e[o]),
              (a = n[0].split("-")),
              (i = Number(n[4])),
              t.push({
                date: new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]), 0),
                open: Number(n[1]) || i,
                high: Number(n[2]) || i,
                low: Number(n[3]) || i,
                close: i,
                volume: Number(n[5]) || 0,
              });
        return t;
      },
      b = function(e) {
        var t = [];
        if (e)
          for (var n, a, i = e.length; i--; )
            (n = e[i]),
              (a = Number(n[4])),
              t.push({
                day: n[0],
                open: Number(n[1]) || a,
                high: Number(n[2]) || a,
                low: Number(n[3]) || a,
                close: a,
                volume: Number(n[5]) || 0,
              });
        return t;
      },
      y = function(e) {
        var t = [];
        if (e)
          for (var a, i, o = 0, s = e.length; s > o; o++)
            (a = e[o]),
              (i = Number(a.close)),
              t.push({
                date: n.sd(a.date),
                volume: Number(a.volume),
                open: Number(a.open) || i,
                high: Number(a.high) || i,
                low: Number(a.low) || i,
                close: i,
              });
        return t;
      },
      N = function(e, t) {
        if (!e) return null;
        for (var n, a = t.vu || 1, i = 0, o = e.length; o > i; i++)
          (n = e[i]),
            (n.high *= 1),
            (n.open *= 1),
            (n.low *= 1),
            (n.close *= 1),
            (n.volume *= a);
        return e;
      },
      _ = function(e) {
        if (!e) return null;
        for (var t, a = 0, i = e.length; i > a; a++)
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
      w = function(e) {
        if (!e) return null;
        for (var t, a = 0, i = e.length; i > a; a++)
          (t = e[a]),
            (t.high = 1 * t.h),
            (t.open = 1 * t.o),
            (t.low = 1 * t.l),
            (t.close = 1 * t.c),
            (t.volume = 1 * t.v),
            (t.date = n.sd(t.d));
        return e;
      },
      M = function(t, a, i, o) {
        for (
          var s,
            r,
            l = e.market(o.hqSb),
            c = "BTC" == l ? 0 : ("DINIW" == o.hqSb, 6),
            h = a.length;
          h-- && 0 != h;

        )
          for (
            var d = a[h],
              u = a[h - 1],
              p = n.ssd(d.day),
              m = n.ssd(u.day),
              f = h;
            m.setMinutes(m.getMinutes() + i) < p;

          ) {
            if (((s = m.getDay()), 6 == s)) {
              if (((r = m.getHours()), r >= c)) continue;
            } else {
              if (0 == s) continue;
              if (1 == s && ((r = m.getHours()), c > r)) continue;
            }
            var v = e.clone(u, null);
            (v.day = n.dss(m)), a.splice(f++, 0, v);
          }
        for (
          var g = a[a.length - 1], b = n.ssd(g.day);
          b.setMinutes(b.getMinutes() + i) < t;

        ) {
          if (((s = b.getDay()), 6 == s)) {
            if (((r = b.getHours()), r >= c)) continue;
          } else {
            if (0 == s) continue;
            if (1 == s && ((r = b.getHours()), c > r)) continue;
          }
          var y = {
            open: g.close,
            high: g.close,
            low: g.close,
            close: g.close,
            day: n.dss(b),
            prevclose: g.prevclose,
          };
          "BTC" == l && (y.volume = 0), a.push(y), (g = y), (b = n.ssd(g.day));
        }
      },
      k = function(t, a, i) {
        var o = e.market(i.hqSb),
          s = "BTC" == o ? 0 : ("DINIW" == i.hqSb, 6),
          r = a[a.length - 1].day,
          l = r.split(" ")[0];
        if (n.stbds(t.date, l, null)) {
          var c,
            h,
            d,
            u = t.prevclose,
            p = t.date.getHours();
          if (s > p) {
            var m,
              f = !1;
            for (
              c = a.length;
              c-- &&
              ((m = !1),
              (d = a[c]),
              (h = Number(d.day.split(" ")[1].split(":")[0])),
              !f && s > h ? (m = !0) : h >= s && ((f = !0), (m = !0)),
              m);

            )
              d.prevclose = u;
          } else
            for (
              c = a.length;
              c-- &&
              ((d = a[c]),
              (h = Number(d.day.split(" ")[1].split(":")[0])),
              h >= s);

            )
              d.prevclose = u;
        }
      },
      S = function(t, a) {
        if (!t) return null;
        var i,
          o,
          s = Number(a.scale),
          r = e.market(a.hqSb);
        a.hqObjs &&
          ((i = a.hqObjs[a.hqSb]),
          (o = new Date(1e3 * a.hqObjs[a.withsymbol].hqstr))),
          o || (o = new Date());
        var l = 60 * o.getTimezoneOffset() * 1e3;
        o.setTime(o.getTime() + l), o.setHours(o.getHours() + 8);
        for (var c, h, d = 0, u = t.length; u > d; d++)
          if (
            ((h = t[d]),
            (h.high = 1 * h.h),
            (h.open = 1 * h.o),
            (h.low = 1 * h.l),
            (h.close = 1 * h.c),
            "BTC" == r && (h.volume = 1 * h.v),
            s > 1)
          ) {
            var p = n.ssd(h.d);
            p.setMinutes(p.getMinutes() + s), (h.day = n.dss(p));
          } else
            (h.day = h.d),
              isNaN(h.p) || (c = h.p),
              isNaN(c) && (c = h.o),
              (h.prevclose = 1 * c);
        return M(o, t, s, a), 1 == s && i && k(i, t, a), t;
      },
      L = function(e, t) {
        return e && e.result && e.result.data
          ? ((e = e.result.data), S(e, t))
          : null;
      },
      A = function(t) {
        var n,
          a = t.symbol,
          i = t.volunit || 1,
          o = e.market(a),
          r = !1;
        t.dataurl && t.dataurl.length > 1
          ? (n = t.dataurl)
          : (/^(CN|HK|US|REPO|MSCI)/.test(o) && (r = !0),
            e.isCNK(t.symbol) && ((r = !1), (s.CN.DAYK_URL = s.CNKCB.DAYK_URL)),
            (n = c(a, !!t.ismink, t.ssl)));
        var l,
          h,
          endDay,
          u = a,
          N = a;
        switch (o) {
          case "HK":
            (u = 0 == a.indexOf("rt_") ? a : "rt_" + a), (N = u.substring(5));
            break;
          case "US":
            (u = 0 == a.indexOf("gb_") ? a : "gb_" + a),
              (N = u.split("_")[1]),
              (N = N.replace("$", ".")),
              (N = N.toUpperCase()),
              (l = _);
            break;
          case "op_m":
            N = u.replace("P_OP_", "");
            break;
          case "CN":
          case "REPO":
            (i = 0.01), e.isCNK(u) && (i = 1);
            break;
          case "forex":
          case "forex_yt":
            (l = S), (h = m), (endDay = 5);
            break;
          case "BTC":
            (N = u.replace("btc_", "")), (l = L), (h = f), (endDay = 5);
            break;
          case "OTC":
            (N = a.replace("sb", "otc_")), (h = v);
            break;
          case "CFF":
            var M = u.split("_");
            (N = M[M.length - 1]), (h = g), (l = b);
            break;
          case "HF":
            (u = 0 == a.indexOf("hf_") ? a : "hf_" + a),
              (N = u.split("_")[1]),
              (h = y),
              (l = _);
            break;
          case "NF":
            (u = 0 == a.indexOf("nf_") ? a : "nf_" + a),
              (N = u.split("_")[1]),
              (h = p),
              (l = _);
            break;
          case "global_index":
            (u = 0 == a.indexOf("znb_") ? a : "znb_" + a),
              (N = u.split("_")[1]),
              (h = w);
            break;
          case "LSE":
            (u = 0 == a.indexOf("lse_") ? a : "lse_" + a),
              (N = u.split("_")[1]),
              (u = e.strUtil.replaceStr(u)),
              (h = w);
            break;
          case "MSCI":
            (u = 0 == a.indexOf("msci_") ? a : "msci_" + a),
              (N = a.replace("msci_", "")),
              (h = p);
            break;
          case "GOODS":
            (u = 0 == a.indexOf("gds_") ? a : "gds_" + a),
              (N = u.split("_")[1]),
              (h = w);
        }
        return (
          t.customksb && (N = t.customksb),
          {
            hqSb: u,
            kSb: N,
            dayDataHandler: h,
            minDataHandler: l,
            endDay: endDay,
            kUrl: n,
            isCompressData: r,
            vu: i,
            market: o,
          }
        );
      },
      I = function(n, i) {
        var o = A(n),
          s = new Date(),
          l = [s.getFullYear(), s.getMonth() + 1, s.getDate()].join("_"),
          c = n.scale,
          h = n.$scale || "$scale",
          d = n.datalen || 828,
          u = "_" + o.kSb.replace(/\W/g, "") + "_" + c + "_" + s.getTime(),
          p = function(s) {
            var p = s ? s.dataObj : void 0,
              m = r();
            t(
              o.kUrl
                .replace("$symbol", o.kSb)
                .replace(h, c)
                .replace("$cb", "var%20" + u + "=")
                .replace("$rn", l)
                .replace("$datalen", d),
              function() {
                var t = window[u],
                  s = n.dataformatter || o.minDataHandler || N;
                if (
                  (t = s(t, {
                    vu: o.vu,
                    withsymbol: n.withsymbol,
                    hqSb: o.hqSb,
                    hqObjs: p,
                    scale: c,
                  }))
                ) {
                  var r = {};
                  1 == c &&
                    (/^forex/.test(o.market) || /^BTC/.test(o.market)) &&
                    (r.usePc = !0),
                    a.pd(t, r),
                    (m.data = t);
                } else m.msg = "error";
                e.isFunc(i) && i(m);
              },
              function() {
                (m.msg = "error"), e.isFunc(i) && i(m);
              },
              { market: o.market, symbol: o.hqSb, type: "mink" }
            );
          };
        n.withsymbol
          ? KKE.api(
              "datas.hq.get",
              {
                symbol: [n.withsymbol, o.hqSb].join(","),
                cancelEtag: !0,
                ssl: n.ssl,
              },
              p
            )
          : p();
      };
    window.RELOAD_DK_DATA = 1;
    var x = function(n, a) {
        var o = A(n),
          s = function(s) {
            var c = s ? s.data[0] : void 0,
              h = r(),
              d = new Date(),
              u = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("_"),
              m = "_" + o.kSb.replace(/\W/g, "") + u,
              f = "MSCI" === o.market || "US" === o.market ? "K2_" : "KL_";
            if (0 === window.RELOAD_DK_DATA) {
              if (window.RELOAD_DK_SYMBOL === o.kSb) return;
            } else
              (window.RELOAD_DK_DATA = 0), (window.RELOAD_DK_SYMBOL = o.kSb);
            t(
              o.kUrl
                .replace("$symbol", o.kSb)
                .replace("$rn", u)
                .replace("$cb", "var%20" + m + "="),
              function() {
                var t;
                if (o.isCompressData) {
                  var s = o.kSb.replace(".", "$");
                  (t = window["KLC_" + f + s]), (t = i(t));
                } else {
                  t = window[m];
                  var r = n.dataformatter || o.dayDataHandler || p;
                  t = r(t);
                }
                /*  if (window.chooseDate && window.showChooseDate) {
                    let dt = new Date(window.chooseDate).getTime();
                    t = t.filter(d => d.date.getTime() <= dt);
                  }*/

                var d = l(t, c, n);
                d
                  ? (h.data = {
                      hq: c,
                      day: d[0],
                      week: d[1],
                      month: d[2],
                      ytd: d[3] || null,
                      year: d[4],
                    })
                  : (h.msg = "error"),
                  e.isFunc(a) && a(h);
              },
              function() {
                if (c) {
                  var t = l(null, c, n);
                  t
                    ? (h.data = {
                        hq: c,
                        day: t[0],
                        week: t[1],
                        month: t[2],
                        ytd: t[3] || null,
                        year: t[4],
                      })
                    : (h.msg = "error"),
                    e.isFunc(a) && a(h);
                } else
                  (h.msg = "error"), (h.data = { hq: c }), e.isFunc(a) && a(h);
              },
              { market: o.market, symbol: o.hqSb, type: "k" }
            );
          };
        "undefined" == typeof o.market || "UNKNOWN" === o.market
          ? s()
          : KKE.api(
              "datas.hq.get",
              { symbol: o.hqSb, cancelEtag: !0, withI: !0, ssl: n.ssl },
              s
            );
      },
      R = function(t, n) {
        var i = t.staticdata,
          o = r();
        if (t.ismink) a.pd(i, null), (o.data = i);
        else {
          var s = l(i, null, t);
          o.data = {
            day: s[0],
            week: s[1],
            month: s[2],
            ytd: s[3] || null,
            year: s[4],
          };
        }
        e.isFunc(n) && n(o);
      };
    this.get = function(t, n) {
      console.log(t);
      t.staticdata
        ? R(t, n)
        : (t.wfn && e.isFunc(u[t.wfn]) && (window[t.wfn] = u[t.wfn]),
          t.ismink ? I(t, n) : x(t, n));
    };
    this.loadReData = function(n, a) {
      var i = r(),
        o = {
          HK: n.symbol.replace("rt_hk", ""),
          US: n.symbol
            .replace("gb_", "")
            .replace("$", ".")
            .toUpperCase(),
          CN: n.symbol,
        }[n.market.toUpperCase()],
        s = h(n.symbol, n.ssl),
        l = s.url;
      if (!l) return (i.msg = "error"), void (e.isFunc(a) && a(i));
      var c = n.dir,
        d = s.VAR || "";
      (d = d
        .replace("$symbol", o)
        .replace("$dir", c)
        .replace(".", "$")),
        "HK" === n.market && (d = "hk" + d);
      var u = new Date(),
        p = u.getHours();
      t(
        l
          .replace("$symbol", o)
          .replace("$dir", c)
          .replace("$rn", p),
        function() {
          var t = window[d];
          (window[d] = null),
            t && t.total > 0 ? (i.data = t.data) : (i.msg = "error"),
            e.isFunc(a) && a(i);
        },
        function() {
          (i.msg = "error"), e.isFunc(a) && a(i);
        },
        { market: s.market, symbol: o, type: "rek" }
      );
    };
    this.loadHFInit = function(n, a) {
      var i = r(),
        o = n.symbol,
        s = d(o, n.ssl),
        l = s.url,
        c = s.varPre,
        h = c + o,
        u = window[h];
      u
        ? ((i.data = u), e.isFunc(a) && a(i))
        : ((o = o.split("hf_")[1]),
          t(
            l.replace("$cb", "var%20" + h + "=").replace("$symbol", o),
            function() {
              (u = window[h]),
                u
                  ? (i.data = u)
                  : ((window[h] = null), (i.msg = "error, illegal data")),
                e.isFunc(a) && a(i);
            },
            function() {
              (i.msg = "error"), e.isFunc(a) && a(i);
            },
            { market: s.market, symbol: o, type: "init_hf" }
          ));
    };
    this.loadNFInit = function(n, a) {
      var i = r(),
        o = n.symbol,
        s = d(o, n.ssl),
        l = s.url,
        c = s.varPre,
        h = c + o,
        u = window[h];
      u
        ? ((i.data = u), e.isFunc(a) && a(i))
        : ((o = o.match(/^nf_([a-zA-Z]+)\d+$/)[1]),
          t(
            l.replace("$cb", "var%20" + h + "=").replace("$symbol", o),
            function() {
              (u = window[h]),
                u
                  ? (i.data = u)
                  : ((window[h] = null), (i.msg = "error, illegal data")),
                e.isFunc(a) && a(i);
            },
            function() {
              (i.msg = "error"), e.isFunc(a) && a(i);
            },
            { market: s.market, symbol: o, type: "init_nf" }
          ));
    };
    this.loadGBInit = function(n, a) {
      var i = r(),
        o = n.symbol,
        s = d(o, n.ssl),
        l = s.url,
        c = s.varPre,
        h = c + o,
        u = window[h];
      u
        ? ((i.data = u), e.isFunc(a) && a(i))
        : ((o = o.split("znb_")[1]),
          t(
            l.replace("$cb", "var%20" + h + "=").replace("$symbol", o),
            function() {
              (u = window[h]),
                u
                  ? (i.data = u)
                  : ((window[h] = null), (i.msg = "error, illegal data")),
                e.isFunc(a) && a(i);
            },
            function() {
              (i.msg = "error"), e.isFunc(a) && a(i);
            },
            { market: s.market, symbol: o, type: "init_global" }
          ));
    };
  })();
});

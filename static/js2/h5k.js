xh5_define("datas.k", ["utils.util"], function(e) {
    "use strict";
    var t = e.load
      , n = e.dateUtil
      , a = e.kUtil
      , s = e.xh5_S_KLC_D
      , o = 0 == location.protocol.indexOf("https:");
    return new function() {
        this.VER = "2.7.1";
        var r = {
            CNKCB: {
                DAYK_URL: "http://quotes.sina.cn/cn/api/jsonp.php/$cb/KC_MarketDataService.getKLineData?symbol=$symbol"
            },
            CN: {
                MINK_URL: "http://quotes.sina.cn/cn/api/jsonp_v2.php/$cb/CN_MarketDataService.getKLineData?symbol=$symbol&scale=$scale&ma=no&datalen=1023",
                DAYK_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?d=$rn",
                DAYK_RE_URL: "http://finance.sina.com.cn/realstock/company/$symbol/$dirfq.js",
                RE_VAR: "$symbol$dirfq"
            },
            HK: {
                MINK_URL: "",
                DAYK_URL: "http://finance.sina.com.cn/stock/hkstock/$symbol/klc_kl.js?d=$rn",
                DAYK_RE_URL: "http://finance.sina.com.cn/stock/hkstock/$symbol/$dirfq.js",
                RE_VAR: "$symbol$dirfq"
            },
            US: {
                MINK_URL: "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinKService.getMinK?symbol=$symbol&type=$scale&___qn=3",
                DAYK_URL: "http://finance.sina.com.cn/us_stock/company/hisdata/klc_kl_$symbol.js",
                DAYK_RE_URL: "https://finance.sina.com.cn/us_stock/company/reinstatement/$symbol_$dirfq.js",
                RE_VAR: "$symbol_$dirfq"
            },
            option_cn: {
                DAYK_URL: "http://stock.finance.sina.com.cn/futures/api/jsonp_v2.php/$cb/StockOptionDaylineService.getSymbolInfo?symbol=$symbol"
            },
            op_m: {
                DAYK_URL: "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/FutureOptionAllService.getOptionDayline?symbol=$symbol"
            },
            forex: {
                DAYK_URL: "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
                MINK_URL: "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen"
            },
            forex_yt: {
                DAYK_URL: "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
                MINK_URL: "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getOldMinKline?symbol=$symbol&scale=$scale&datalen=$datalen"
            },
            OTC: {
                DAYK_URL: "http://stock.finance.sina.com.cn/thirdmarket/api/jsonp.php/$cb/ThirdDataService.ThirdDailyData?symbol=$symbol&_=$rn"
            },
            CFF: {
                DAYK_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesDailyKLine?symbol=$symbol&_=$rn",
                MINK_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesMiniKLine$scalem?symbol=$symbol&_=$rn"
            },
            HF: {
                DAYK_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/GlobalFuturesService.getGlobalFuturesDailyKLine?symbol=$symbol&_=$rn&source=web",
                INIT_URL: "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=hf&symbol=$symbol",
                MINK_URL: "http://gu.sina.cn/ft/api/jsonp.php/$cb/GlobalService.getMink?symbol=$symbol&type=$scale",
                INIT_VAR_PRE: "kke_future_"
            },
            NF: {
                DAYK_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getDailyKLine?symbol=$symbol&_=$rn",
                MINK_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getFewMinLine?symbol=$symbol&type=$scale",
                INIT_URL: "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=nf&symbol=$symbol",
                INIT_VAR_PRE: "kke_future_"
            },
            global_index: {
                DAYK_URL: "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getDayLine?symbol=$symbol&num=100",
                INIT_URL: "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getTradeTime?symbol=$symbol&category=index",
                INIT_VAR_PRE: "kke_global_index_"
            },
            GOODS: {
                DAYK_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/SpotService.getDaily?symbol=$symbol"
            },
            BTC: {
                DAYK_URL: "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getDayKLine?symbol=$symbol&callback=$cb",
                MINK_URL: "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen&callback=$cb"
            },
            LSE: {
                DAYK_URL: "http://quotes.sina.cn/lse/api/jsonp.php/$cb/LSEService.getDays?symbol=$symbol"
            },
            MSCI: {
                DAYK_URL: "http://i.quotes.sina.cn/msci/api/jsonp.php/$cb/MSCIService.getDayLine?symbol=$symbol"
            }
        };
        r.REPO = r.CN;
        var l = function() {
            return {
                msg: "",
                data: null
            }
        }
          , i = function(t, s, o) {
            var r = K(o)
              , l = o.symbol
              , i = o.newthour
              , c = 1
              , u = r.market;
            "CN" == u && (c = s && /[gz]/.test(s.type) ? 10 : e.isRepos(l) ? 10 : 100),
            e.isRepos(l) && (c = 10),
            e.isCNK(l) && (c = 1),
            t || (t = []);
            var p = 0 / 0
              , m = "";
            if (s && s.date) {
                var b, h = s.date, d = !1;
                if (t.length > 0 ? (b = t[t.length - 1],
                h || (h = b.date)) : d = !0,
                b)
                    if ("NF" === u || "GOODS" === u)
                        n.stbd(b.date, h) ? 1 != s.iscff && s.withNight && s.time >= i ? d = !0 : s.open && s.price && (b.open = s.open,
                        b.high = s.high,
                        b.low = s.low,
                        b.close = s.price,
                        b.volume = s.totalVolume * c) : h < b.date || (d = !0);
                    else if (n.stbd(b.date, h))
                        "hf_CHA50CFD" === s.symbol && s.time >= i ? d = !0 : s.date && s.open && s.price && (b.open = s.open,
                        b.high = s.high,
                        b.low = s.low,
                        b.close = s.price,
                        b.volume = s.totalVolume * c,
                        b.date = n.ddt(h),
                        b.postAmt = s.postAmount,
                        b.postVol = s.postVolume * c);
                    else if (h < b.date)
                        ;
                    else if (i)
                        if ("hf_CHA50CFD" === s.symbol)
                            d = !0;
                        else if (s.time >= i)
                            d = !0;
                        else {
                            var f = (h - b.date) / 1e3 / 24 / 60 / 60;
                            d = f >= 2
                        }
                    else
                        d = !0;
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
                    })
                }
                p = s.issueprice,
                m = s.name
            }
            if (t.length < 1)
                return [t, void 0, void 0, void 0];
            var _ = !isNaN(p) && p > 0 ? p : t[0].open;
            e.oc(t[0], {
                prevclose: _,
                name: m,
                symbol: l
            });
            var v = a.mw(t, s, _, c, r.endDay)
              , g = v[0]
              , k = v[1]
              , N = v[2]
              , $ = void 0;
            if (a.pd(t, null),
            a.pd(g, null),
            a.pd(k, null),
            a.pd(N, null),
            s && s.settlement) {
                var w = t[t.length - 1];
                w.ampP = w.amplitude / s.settlement,
                w.change = w.close - s.settlement,
                w.percent = w.change / s.settlement
            }
            return e.oc(g[0], {
                name: m,
                symbol: l
            }),
            e.oc(k[0], {
                name: m,
                symbol: l
            }),
            e.oc(N[0], {
                name: m,
                symbol: l
            }),
            o.ytd && ($ = a.yd(t),
            e.oc($[0], {
                name: m,
                symbol: l
            })),
            [t, g, k, $, N]
        }
          , c = function(t, n, a) {
            var s = e.market(t)
              , l = s ? r[s][n ? "MINK_URL" : "DAYK_URL"] : null;
            return (o || a) && (l = e.getSUrl(l)),
            l
        }
          , u = function(t, n) {
            var a, s, l = e.market(t);
            return r[l] && (a = r[l].DAYK_RE_URL,
            s = r[l].RE_VAR),
            a && (o || n) && (a = e.getSUrl(a)),
            {
                url: a,
                VAR: s,
                market: l
            }
        }
          , p = function(t, n) {
            var a, s, l, i = e.market(t);
            return r[i] && (a = r[i].INIT_URL,
            s = r[i].INIT_VAR,
            l = r[i].INIT_VAR_PRE),
            a && (o || n) && (a = e.getSUrl(a)),
            {
                url: a,
                VAR: s,
                varPre: l,
                market: i
            }
        }
          , m = {
            xh5Fund: function(e) {
                for (var t, n, a, s, o = new Date, r = [o.getFullYear(), o.getMonth() + 1, o.getDate()].join("_"), l = e.data, i = e.symbol, c = l.split("#"), u = [], p = [], m = [], b = [], h = [], d = [], f = c.length; f--; )
                    s = c[f].split(","),
                    t = s[0].slice(0, 4),
                    n = s[0].slice(4, 6),
                    a = s[0].slice(6, 8),
                    a = [t, n, a].join("-"),
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
                var y = ["_dwjz_", i, r].join("")
                  , _ = ["_ljjz_", i, r].join("")
                  , v = ["_lshb_", i, r].join("")
                  , g = ["_pwbfbyd_", i, r].join("")
                  , k = ["_pwbfbjd_", i, r].join("")
                  , N = ["_pwbfbnd_", i, r].join("")
                  , $ = ["_fh_", i, r].join("");
                window[y] = u,
                window[_] = p,
                window[v] = m,
                window[g] = b,
                window[k] = h,
                window[N] = d,
                window[$] = {
                    fhday: e.fhday,
                    fhvalue: e.fhvalue,
                    fhchaifen: e.fhchaifen
                }
            }
        }
          , b = function(e) {
            var t = [];
            if (e)
                for (var n, a, s = 0, o = e.length; o > s; s++) {
                    a = e[s],
                    n = Number(a.c);
                    var r = a.d.split("-");
                    t.push({
                        close: n,
                        open: Number(a.o) || n,
                        high: Number(a.h) || n,
                        low: Number(a.l) || n,
                        volume: Number(a.v) || 0,
                        date: new Date(Number(r[0]),Number(r[1]) - 1,Number(r[2]),0),
                        postVol: Number(a.pv) || 0,
                        postAmt: Number(a.pa) || 0
                    })
                }
            return t
        }
          , h = function(e) {
            var t = [];
            if (e)
                for (var n, a, s = e.split("|"), o = 0, r = s.length; r > o; o++)
                    n = s[o].split(","),
                    n.length < 5 || (a = n[0].split("-"),
                    t.push({
                        open: Number(n[1]),
                        low: Number(n[2]),
                        high: Number(n[3]),
                        close: Number(n[4]),
                        volume: Number(n[5]),
                        date: new Date(Number(a[0]),Number(a[1]) - 1,Number(a[2]),0)
                    }));
            return t
        }
          , d = function(e) {
            var t = [];
            if (e && e.result && e.result.data)
                for (var n, a, s = e.result.data, o = s.split("|"), r = 0, l = o.length; l > r; r++)
                    n = o[r].split(","),
                    n.length < 5 || (a = n[0].split("-"),
                    t.push({
                        open: Number(n[1]),
                        low: Number(n[2]),
                        high: Number(n[3]),
                        close: Number(n[4]),
                        volume: Number(n[5]),
                        date: new Date(Number(a[0]),Number(a[1]) - 1,Number(a[2]),0)
                    }));
            return t
        }
          , f = function(e) {
            var t = [];
            if (e && e.length)
                for (var n, a, s = .001, o = e.split("|"), r = 0, l = 0, i = o.length; i > l; l++)
                    n = o[l].split(","),
                    n.length < 5 || (a = n[0].split("-"),
                    r = Number(n[4]) || r,
                    t.push({
                        open: Number(n[1]) || r,
                        low: Number(n[2]) || r,
                        high: Number(n[3]) || r,
                        close: Number(n[4]) || r,
                        volume: Number(n[5]) * s,
                        date: new Date(Number(a[0]),Number(a[1]) - 1,Number(a[2]),0)
                    }));
            return t
        }
          , y = function(e) {
            var t = [];
            if (e)
                for (var n, a, s, o = 0, r = e.length; r > o; o++)
                    n = e[o],
                    a = n[0].split("-"),
                    s = Number(n[4]),
                    t.push({
                        date: new Date(Number(a[0]),Number(a[1]) - 1,Number(a[2]),0),
                        open: Number(n[1]) || s,
                        high: Number(n[2]) || s,
                        low: Number(n[3]) || s,
                        close: s,
                        volume: Number(n[5]) || 0
                    });
            return t
        }
          , _ = function(e) {
            var t = [];
            if (e)
                for (var n, a, s = e.length; s--; )
                    n = e[s],
                    a = Number(n[4]),
                    t.push({
                        day: n[0],
                        open: Number(n[1]) || a,
                        high: Number(n[2]) || a,
                        low: Number(n[3]) || a,
                        close: a,
                        volume: Number(n[5]) || 0
                    });
            return t
        }
          , v = function(e) {
            var t = [];
            if (e)
                for (var a, s, o = 0, r = e.length; r > o; o++)
                    a = e[o],
                    s = Number(a.close),
                    t.push({
                        date: n.sd(a.date),
                        volume: Number(a.volume),
                        open: Number(a.open) || s,
                        high: Number(a.high) || s,
                        low: Number(a.low) || s,
                        close: s
                    });
            return t
        }
          , g = function(e, t) {
            if (!e)
                return null;
            for (var n, a = t.vu || 1, s = 0, o = e.length; o > s; s++)
                n = e[s],
                n.high *= 1,
                n.open *= 1,
                n.low *= 1,
                n.close *= 1,
                n.volume *= a;
            return e
        }
          , k = function(e) {
            if (!e)
                return null;
            for (var t, a = 0, s = e.length; s > a; a++)
                t = e[a],
                t.high = 1 * t.h,
                t.open = 1 * t.o,
                t.low = 1 * t.l,
                t.close = 1 * t.c,
                t.volume = 1 * t.v,
                t.day = t.d,
                t.date = n.sd(t.d);
            return e
        }
          , N = function(e) {
            if (!e)
                return null;
            for (var t, a = 0, s = e.length; s > a; a++)
                t = e[a],
                t.high = 1 * t.h,
                t.open = 1 * t.o,
                t.low = 1 * t.l,
                t.close = 1 * t.c,
                t.volume = 1 * t.v,
                t.date = n.sd(t.d);
            return e
        }
          , $ = function(t, a, s, o) {
            for (var r, l, i = e.market(o.hqSb), c = "BTC" == i ? 0 : ("DINIW" == o.hqSb,
            6), u = a.length; u-- && 0 != u; )
                for (var p = a[u], m = a[u - 1], b = n.ssd(p.day), h = n.ssd(m.day), d = u; h.setMinutes(h.getMinutes() + s) < b; ) {
                    if (r = h.getDay(),
                    6 == r) {
                        if (l = h.getHours(),
                        l >= c)
                            continue
                    } else {
                        if (0 == r)
                            continue;
                        if (1 == r && (l = h.getHours(),
                        c > l))
                            continue
                    }
                    var f = e.clone(m, null);
                    f.day = n.dss(h),
                    a.splice(d++, 0, f)
                }
            for (var y = a[a.length - 1], _ = n.ssd(y.day); _.setMinutes(_.getMinutes() + s) < t; ) {
                if (r = _.getDay(),
                6 == r) {
                    if (l = _.getHours(),
                    l >= c)
                        continue
                } else {
                    if (0 == r)
                        continue;
                    if (1 == r && (l = _.getHours(),
                    c > l))
                        continue
                }
                var v = {
                    open: y.close,
                    high: y.close,
                    low: y.close,
                    close: y.close,
                    day: n.dss(_),
                    prevclose: y.prevclose
                };
                "BTC" == i && (v.volume = 0),
                a.push(v),
                y = v,
                _ = n.ssd(y.day)
            }
        }
          , w = function(t, a, s) {
            var o = e.market(s.hqSb)
              , r = "BTC" == o ? 0 : ("DINIW" == s.hqSb,
            6)
              , l = a[a.length - 1].day
              , i = l.split(" ")[0];
            if (n.stbds(t.date, i, null)) {
                var c, u, p, m = t.prevclose, b = t.date.getHours();
                if (r > b) {
                    var h, d = !1;
                    for (c = a.length; c-- && (h = !1,
                    p = a[c],
                    u = Number(p.day.split(" ")[1].split(":")[0]),
                    !d && r > u ? h = !0 : u >= r && (d = !0,
                    h = !0),
                    h); )
                        p.prevclose = m
                } else
                    for (c = a.length; c-- && (p = a[c],
                    u = Number(p.day.split(" ")[1].split(":")[0]),
                    u >= r); )
                        p.prevclose = m
            }
        }
          , D = function(t, a) {
            if (!t)
                return null;
            var s, o, r = Number(a.scale), l = e.market(a.hqSb);
            a.hqObjs && (s = a.hqObjs[a.hqSb],
            o = new Date(1e3 * a.hqObjs[a.withsymbol].hqstr)),
            o || (o = new Date);
            var i = 60 * o.getTimezoneOffset() * 1e3;
            o.setTime(o.getTime() + i),
            o.setHours(o.getHours() + 8);
            for (var c, u, p = 0, m = t.length; m > p; p++)
                if (u = t[p],
                u.high = 1 * u.h,
                u.open = 1 * u.o,
                u.low = 1 * u.l,
                u.close = 1 * u.c,
                "BTC" == l && (u.volume = 1 * u.v),
                r > 1) {
                    var b = n.ssd(u.d);
                    b.setMinutes(b.getMinutes() + r),
                    u.day = n.dss(b)
                } else
                    u.day = u.d,
                    isNaN(u.p) || (c = u.p),
                    isNaN(c) && (c = u.o),
                    u.prevclose = 1 * c;
            return $(o, t, r, a),
            1 == r && s && w(s, t, a),
            t
        }
          , R = function(e, t) {
            return e && e.result && e.result.data ? (e = e.result.data,
            D(e, t)) : null
        }
          , K = function(t) {
            var n, a = t.symbol, s = t.volunit || 1, o = e.market(a), l = !1;
            t.dataurl && t.dataurl.length > 1 ? n = t.dataurl : (/^(CN|HK|US|REPO)/.test(o) && (l = !0),
            e.isCNK(t.symbol) && (l = !1,
            r.CN.DAYK_URL = r.CNKCB.DAYK_URL),
            n = c(a, !!t.ismink, t.ssl));
            var i, u, p, m = a, g = a;
            switch (o) {
            case "HK":
                m = 0 == a.indexOf("rt_") ? a : "rt_" + a,
                g = m.substring(5);
                break;
            case "US":
                m = 0 == a.indexOf("gb_") ? a : "gb_" + a,
                g = m.split("_")[1],
                g = g.replace("$", "."),
                g = g.toUpperCase(),
                i = k;
                break;
            case "op_m":
                g = m.replace("P_OP_", "");
                break;
            case "CN":
            case "REPO":
                s = .01,
                e.isCNK(m) && (s = 1);
                break;
            case "forex":
            case "forex_yt":
                i = D,
                u = h,
                p = 5;
                break;
            case "BTC":
                g = m.replace("btc_", ""),
                i = R,
                u = d,
                p = 5;
                break;
            case "OTC":
                g = a.replace("sb", "otc_"),
                u = f;
                break;
            case "CFF":
                var $ = m.split("_");
                g = $[$.length - 1],
                u = y,
                i = _;
                break;
            case "HF":
                m = 0 == a.indexOf("hf_") ? a : "hf_" + a,
                g = m.split("_")[1],
                u = v,
                i = k;
                break;
            case "NF":
                m = 0 == a.indexOf("nf_") ? a : "nf_" + a,
                g = m.split("_")[1],
                u = b,
                i = k;
                break;
            case "global_index":
                m = 0 == a.indexOf("znb_") ? a : "znb_" + a,
                g = m.split("_")[1],
                u = N;
                break;
            case "LSE":
                m = 0 == a.indexOf("lse_") ? a : "lse_" + a,
                g = m.split("_")[1],
                m = e.strUtil.replaceStr(m),
                u = N;
                break;
            case "MSCI":
                m = 0 == a.indexOf("msci_") ? a : "msci_" + a,
                g = a.replace("msci_", ""),
                u = b;
                break;
            case "GOODS":
                m = 0 == a.indexOf("gds_") ? a : "gds_" + a,
                g = m.split("_")[1],
                u = N
            }
            return t.customksb && (g = t.customksb),
            {
                hqSb: m,
                kSb: g,
                dayDataHandler: u,
                minDataHandler: i,
                endDay: p,
                kUrl: n,
                isCompressData: l,
                vu: s,
                market: o
            }
        }
          , S = function(n, s) {
            var o = K(n)
              , r = new Date
              , i = [r.getFullYear(), r.getMonth() + 1, r.getDate()].join("_")
              , c = n.scale
              , u = n.$scale || "$scale"
              , p = n.datalen || 828
              , m = "_" + o.kSb.replace(/\W/g, "") + "_" + c + "_" + r.getTime()
              , b = function(r) {
                var b = r ? r.dataObj : void 0
                  , h = l();
                t(o.kUrl.replace("$symbol", o.kSb).replace(u, c).replace("$cb", "var%20" + m + "=").replace("$rn", i).replace("$datalen", p), function() {
                    var t = window[m]
                      , r = n.dataformatter || o.minDataHandler || g;
                    if (t = r(t, {
                        vu: o.vu,
                        withsymbol: n.withsymbol,
                        hqSb: o.hqSb,
                        hqObjs: b,
                        scale: c
                    })) {
                        var l = {};
                        1 == c && (/^forex/.test(o.market) || /^BTC/.test(o.market)) && (l.usePc = !0),
                        a.pd(t, l),
                        h.data = t
                    } else
                        h.msg = "error";
                    e.isFunc(s) && s(h)
                }, function() {
                    h.msg = "error",
                    e.isFunc(s) && s(h)
                }, {
                    market: o.market,
                    symbol: o.hqSb,
                    type: "mink"
                })
            };
            n.withsymbol ? KKE.api("datas.hq.get", {
                symbol: [n.withsymbol, o.hqSb].join(","),
                cancelEtag: !0,
                ssl: n.ssl
            }, b) : b()
        }
          , L = function(n, a) {
            var o = K(n)
              , r = function(r) {
                var c = r ? r.data[0] : void 0
                  , u = l()
                  , p = new Date
                  , m = [p.getFullYear(), p.getMonth() + 1, p.getDate()].join("_")
                  , h = "_" + o.kSb.replace(/\W/g, "") + m;
                t(o.kUrl.replace("$symbol", o.kSb).replace("$rn", m).replace("$cb", "var%20" + h + "="), function() {
                    var t;
                    if (o.isCompressData) {
                        var r = o.kSb.replace(".", "$");
                        t = window["KLC_KL_" + r],
                        t = s(t)
                    } else {
                        t = window[h];
                        var l = n.dataformatter || o.dayDataHandler || b;
                        t = l(t)
                    }
                    var p = i(t, c, n);
                    p ? u.data = {
                        hq: c,
                        day: p[0],
                        week: p[1],
                        month: p[2],
                        ytd: p[3] || null,
                        year: p[4]
                    } : u.msg = "error",
                    e.isFunc(a) && a(u)
                }, function() {
                    if (c) {
                        var t = i(null, c, n);
                        t ? u.data = {
                            hq: c,
                            day: t[0],
                            week: t[1],
                            month: t[2],
                            ytd: t[3] || null,
                            year: t[4]
                        } : u.msg = "error",
                        e.isFunc(a) && a(u)
                    } else
                        u.msg = "error",
                        u.data = {
                            hq: c
                        },
                        e.isFunc(a) && a(u)
                }, {
                    market: o.market,
                    symbol: o.hqSb,
                    type: "k"
                })
            };
            "undefined" == typeof o.market || "UNKNOWN" === o.market ? r() : KKE.api("datas.hq.get", {
                symbol: o.hqSb,
                cancelEtag: !0,
                withI: !0,
                ssl: n.ssl
            }, r)
        }
          , U = function(t, n) {
            var s = t.staticdata
              , o = l();
            if (t.ismink)
                a.pd(s, null),
                o.data = s;
            else {
                var r = i(s, null, t);
                o.data = {
                    day: r[0],
                    week: r[1],
                    month: r[2],
                    ytd: r[3] || null,
                    year: r[4]
                }
            }
            e.isFunc(n) && n(o)
        };
        this.get = function(t, n) {
            t.staticdata ? U(t, n) : (t.wfn && e.isFunc(m[t.wfn]) && (window[t.wfn] = m[t.wfn]),
            t.ismink ? S(t, n) : L(t, n))
        }
        ,
        this.loadReData = function(n, a) {
            var s = l()
              , o = {
                HK: n.symbol.replace("rt_hk", ""),
                US: n.symbol.replace("gb_", "").replace("$", ".").toUpperCase(),
                CN: n.symbol
            }[n.market.toUpperCase()]
              , r = u(n.symbol, n.ssl)
              , i = r.url;
            if (!i)
                return s.msg = "error",
                void (e.isFunc(a) && a(s));
            var c = n.dir
              , p = r.VAR || "";
            p = p.replace("$symbol", o).replace("$dir", c).replace(".", "$"),
            "HK" === n.market && (p = "hk" + p);
            var m = new Date
              , b = m.getHours();
            t(i.replace("$symbol", o).replace("$dir", c).replace("$rn", b), function() {
                var t = window[p];
                window[p] = null,
                t && t.total > 0 ? s.data = t.data : s.msg = "error",
                e.isFunc(a) && a(s)
            }, function() {
                s.msg = "error",
                e.isFunc(a) && a(s)
            }, {
                market: r.market,
                symbol: o,
                type: "rek"
            })
        }
        ,
        this.loadHFInit = function(n, a) {
            var s = l()
              , o = n.symbol
              , r = p(o, n.ssl)
              , i = r.url
              , c = r.varPre
              , u = c + o
              , m = window[u];
            m ? (s.data = m,
            e.isFunc(a) && a(s)) : (o = o.split("hf_")[1],
            t(i.replace("$cb", "var%20" + u + "=").replace("$symbol", o), function() {
                m = window[u],
                m ? s.data = m : (window[u] = null,
                s.msg = "error, illegal data"),
                e.isFunc(a) && a(s)
            }, function() {
                s.msg = "error",
                e.isFunc(a) && a(s)
            }, {
                market: r.market,
                symbol: o,
                type: "init_hf"
            }))
        }
        ,
        this.loadNFInit = function(n, a) {
            var s = l()
              , o = n.symbol
              , r = p(o, n.ssl)
              , i = r.url
              , c = r.varPre
              , u = c + o
              , m = window[u];
            m ? (s.data = m,
            e.isFunc(a) && a(s)) : (o = o.match(/^nf_([a-zA-Z]+)\d+$/)[1],
            t(i.replace("$cb", "var%20" + u + "=").replace("$symbol", o), function() {
                m = window[u],
                m ? s.data = m : (window[u] = null,
                s.msg = "error, illegal data"),
                e.isFunc(a) && a(s)
            }, function() {
                s.msg = "error",
                e.isFunc(a) && a(s)
            }, {
                market: r.market,
                symbol: o,
                type: "init_nf"
            }))
        }
        ,
        this.loadGBInit = function(n, a) {
            var s = l()
              , o = n.symbol
              , r = p(o, n.ssl)
              , i = r.url
              , c = r.varPre
              , u = c + o
              , m = window[u];
            m ? (s.data = m,
            e.isFunc(a) && a(s)) : (o = o.split("znb_")[1],
            t(i.replace("$cb", "var%20" + u + "=").replace("$symbol", o), function() {
                m = window[u],
                m ? s.data = m : (window[u] = null,
                s.msg = "error, illegal data"),
                e.isFunc(a) && a(s)
            }, function() {
                s.msg = "error",
                e.isFunc(a) && a(s)
            }, {
                market: r.market,
                symbol: o,
                type: "init_global"
            }))
        }
    }
});
;xh5_define("chart.h5k", ["cfgs.settinger", "utils.util", "utils.painter"], function(e, t, n) {
    "use strict";
    function a(a) {
        function i(e, n) {
            function i(e) {
                O.setDataRange(e),
                y && (y.linkData(e),
                y.setDataRange()),
                N && (N.linkData(e),
                N.setDataRange()),
                w && (w.linkData(e),
                w.setDataRange())
            }
            function l(e, t) {
                var n, a, i = C.get(_.URLHASH.KD), o = i.length;
                e || (n = 0),
                t || (a = o - 1);
                for (var s = 0; o > s && (isNaN(n) && i[s].date >= e && (n = s),
                isNaN(a) && i[s].date >= t && (a = s),
                isNaN(n) || isNaN(a)); s++)
                    ;
                return [n, a]
            }
            function c() {
                n && (K = C),
                P.uUpdate(null, !0),
                "CN" !== u || /^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol) || C.initExtraData()
            }
            e = p({
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
            }, e || {});
            var h = this
              , u = t.market(e.symbol)
              , g = !0;
            this.isErr = !1,
            this.symbol = e.symbol,
            this.market = u;
            var b;
            switch (u) {
            case "forex":
            case "forex_yt":
                "DINIW" == this.symbol,
                b = "06:00";
                break;
            case "BTC":
                b = "00:00";
                break;
            case "LSE":
                b = "08:00";
                break;
            default:
                b = "09:30"
            }
            this.isMain = n,
            this.isCompare = !1,
            this.datas = null,
            this.dataLen = 0,
            this.nfloat = e.nfloat || 2,
            this.dataLenOffset = 0,
            this.prevclose = 0 / 0,
            this.labelMaxP = 0,
            this.labelMinP = Number.MAX_VALUE,
            this.maxPrice = 0,
            this.minPrice = Number.MAX_VALUE,
            this.rangeMax = 0,
            this.rangeMin = Number.MAX_VALUE,
            this.labelMaxVol = 0,
            this.maxVolume = 0,
            this.minPercent = Number.MAX_VALUE,
            this.maxPercent = -Number.MAX_VALUE,
            this.labelPriceCount = 0 / 0,
            this.isTotalRedraw = !0,
            this.hq = void 0,
            this.nco = void 0;
            var y, N, w, M = new k(this,e), A = e.name;
            this.getName = function() {
                return A || ""
            }
            ,
            this.viewState = V;
            var C = new function() {
                var i, o = {}, s = {
                    rsAmount: void 0
                }, r = function(e, a, s, r, l) {
                    if (a) {
                        if (n) {
                            if (e == _.URLHASH.KD && (i = t.clone(a, null)),
                            r && window.datelist && h.hq) {
                                var c = t.xh5_S_KLC_D(window.datelist);
                                a = t.kUtil.ayd(a, c, !1, a[0].date, h.hq.date)
                            }
                        } else
                            l || (e == _.URLHASH.KD && (i = t.clone(a, null)),
                            a = t.kUtil.adbd(a, K.get(e), s, !1));
                        o["k" + e] = a;
                        var d = a.length
                          , u = r ? L.PARAM.K_CL_NUM : L.PARAM.defaultCandleNum;
                        o["k" + e + "v"] = d > u ? d - u : 0,
                        o["k" + e + "b"] = d
                    }
                }, l = function() {
                    var e = V.viewId;
                    switch (e) {
                    case _.URLHASH.KDF:
                    case _.URLHASH.KDB:
                        e = _.URLHASH.KD;
                        break;
                    case _.URLHASH.KWF:
                    case _.URLHASH.KWB:
                        e = _.URLHASH.KW;
                        break;
                    case _.URLHASH.KMF:
                    case _.URLHASH.KMB:
                        e = _.URLHASH.KM;
                        break;
                    case _.URLHASH.KYF:
                    case _.URLHASH.KYB:
                        e = _.URLHASH.KY;
                        break;
                    case _.URLHASH.KCLF:
                    case _.URLHASH.KCLB:
                        e = _.URLHASH.KCL
                    }
                    return e
                };
                this.get = function(e) {
                    if (t.isStr(e)) {
                        var n = l();
                        return o["k" + n + e]
                    }
                    return o["k" + (e || V.viewId)]
                }
                ,
                this.set = function(e, t) {
                    var n = l()
                      , a = "k" + n + e;
                    "undefined" != typeof o[a] && (o[a] = t)
                }
                ,
                this.getOriDK = function() {
                    return i
                }
                ,
                this.initState = r,
                this.initDWMState = function(e, n) {
                    var a = t.clone(n.day, null);
                    r(_.URLHASH.KD, n.day),
                    r(_.URLHASH.KW, n.week),
                    r(_.URLHASH.KM, n.month),
                    r(_.URLHASH.KCL, a, !1, !0),
                    r(_.URLHASH.KY, n.year)
                }
                ,
                this.extraDataObj = s,
                this.initExtraData = function() {
                    var n = "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol";
                    a.ssl && (n = t.getSUrl(n));
                    var i = "KKE_ShareAmount_" + e.symbol;
                    t.load(n.replace("$symbol", e.symbol).replace("$rn", String((new Date).getDate())).replace("$cb", "var%20" + i + "="), function() {
                        var e = window[i];
                        if (e) {
                            for (var t, n = [], a = e.length; a--; )
                                t = e[a],
                                n.push({
                                    amount: Number(t.amount),
                                    date: m.sd(t.date)
                                });
                            n.length && (s.rsAmount = n)
                        }
                    })
                }
                ,
                this.gc = function() {
                    o = null,
                    s = null
                }
            }
              , O = new function() {
                var e = function() {
                    h.minPrice = Number.MAX_VALUE,
                    h.maxPrice = -Number.MAX_VALUE,
                    h.minPercent = Number.MAX_VALUE,
                    h.maxPercent = -Number.MAX_VALUE,
                    h.maxVolume = 0,
                    h.rangeMax = 0,
                    h.rangeMin = Number.MAX_VALUE
                }
                  , t = function() {
                    for (var e, t = 0, n = h.dataLen; n > t; t++)
                        e = h.datas[t],
                        e.close <= 0 || (e.high > h.maxPrice && (h.maxPrice = h.rangeMax = e.high),
                        e.low < h.minPrice && (h.minPrice = h.rangeMin = e.low),
                        h.maxVolume = Math.max(h.maxVolume, e.volume));
                    var a = v(h.maxVolume, 0, 0, !0);
                    h.labelMaxVol = a[0],
                    h.maxPercent = Math.max((h.maxPrice - h.prevclose) / h.prevclose, 0),
                    h.minPercent = Math.min((h.minPrice - h.prevclose) / h.prevclose, 0)
                };
                this.createPlayingData = function() {
                    var e, t, n = L.DIMENSION.h_k, a = n * L.DIMENSION.P_HV, i = n * (1 - L.DIMENSION.P_HV);
                    e = h.labelMinP,
                    t = h.labelMaxP;
                    for (var o, s = h.labelMaxVol, r = h.prevclose, l = h.isTotalRedraw ? 0 : h.dataLen - h.dataLenOffset, c = L.custom.show_underlay_vol, u = h.isCompare ? "ppp" : "pp", p = h.dataLen; p > l; l++)
                        o = h.datas[l],
                        o.cy = d[u](o.close, e, t, n, r),
                        o.oy = d[u](o.open, e, t, n, r),
                        o.hy = d[u](o.high, e, t, n, r),
                        o.ly = d[u](o.low, e, t, n, r),
                        c && (o.vy = d.vp(o.volume, s, a) + i)
                }
                ,
                this.setDataRange = function(n) {
                    var i = C.get();
                    if (i) {
                        V.dataLength = i.length;
                        var o = V.start
                          , s = V.end;
                        if (isNaN(o) || isNaN(s))
                            s = C.get("b"),
                            o = C.get("v"),
                            V.start = o,
                            V.end = s;
                        else {
                            if (n && s + 1 >= i.length) {
                                var r = i.length - s;
                                V.end = s = i.length,
                                (1 == a.pcm || V.viewId == _.URLHASH.K1) && (0 == o && s > 1 && s < L.PARAM.minCandleNum && (o = s - 1,
                                V.start = o),
                                s - o >= L.PARAM.defaultCandleNum && (o += r,
                                V.start = o))
                            }
                            C.set("v", o),
                            C.set("b", s)
                        }
                        switch (V.currentLength = s - o,
                        V.startDate = i[o].date,
                        V.endDate = i[s - 1].date,
                        a.pcm) {
                        case 1:
                            h.prevclose = i[0].prevclose;
                            break;
                        case 2:
                            h.prevclose = i[o].close;
                            break;
                        default:
                            h.prevclose = o > 1 ? i[o - 1].close : i[0].prevclose || i[0].close
                        }
                        h.datas = i.slice(o, s),
                        h.dataLen = h.datas.length,
                        e(),
                        t(n)
                    }
                }
            }
              , P = new function() {
                var o, s = function(e) {
                    return o ? (e.volume = e.totalVolume - (o.totalVolume || 0),
                    e.amount = e.volume * e.price) : (o = {},
                    e.volume = 0),
                    o.totalVolume = e.totalVolume,
                    e.avg_price = e.totalAmount / e.totalVolume || e.price,
                    !0
                }, r = !1, l = function(e, n, a) {
                    if (e.isUpdateTime) {
                        var i = C.get(n);
                        if (i && !(i.length < 1)) {
                            var o = n == _.URLHASH.KD || n == _.URLHASH.KDF || n == _.URLHASH.KCL || n == _.URLHASH.KCLF
                              , s = i[i.length - 1];
                            if (1 == a) {
                                if (s.time && !t.kUtil.spk(s.time, e.time, b, n, h.market)) {
                                    if (t.kUtil.nc(i, e, n, {
                                        price: e.price,
                                        volume: e.volume
                                    }),
                                    /^forex|^BTC/.test(h.market))
                                        n == _.URLHASH.K1 && (s = i[i.length - 1],
                                        s.prevclose = e.prevclose,
                                        s.change = e.price - e.prevclose,
                                        s.percent = s.change / e.prevclose);
                                    else if ("NF" == h.market)
                                        ;
                                    else if (t.kUtil.spk("09:35", e.time, b, n)) {
                                        if (n == _.URLHASH.K60) {
                                            var l = e.time.split(":")
                                              , c = l[0]
                                              , d = l[1];
                                            if (c > 10 || 10 == c && d > 30)
                                                return
                                        }
                                        s = i[i.length - 1],
                                        s.open = e.open,
                                        s.open > s.high && (s.high = s.open),
                                        s.open < s.low && (s.low = s.open)
                                    }
                                    return
                                }
                            } else if (2 == a) {
                                if (!e.trstr)
                                    return;
                                t.kUtil.nc(i, e, n, {
                                    price: e.price,
                                    volume: 0
                                })
                            } else if (f(e.date, s.date))
                                h.nco && ("NF" == h.market ? m.dst(s.date) < h.nco.open && e.time >= h.nco.open && e.time > h.nco.close && t.kUtil.nc(i, e, n, null) : r && e.time >= h.nco.open && (r = !1,
                                t.kUtil.nc(i, e, n, null)));
                            else {
                                if (!(e.date > s.date))
                                    return;
                                h.nco ? "NF" == h.market ? e.time >= h.nco.open && t.kUtil.nc(i, e, n, null) : e.time <= h.nco.close && (r = !0) : t.kUtil.nc(i, e, n, null)
                            }
                            s = i[i.length - 1],
                            s.close = e.price,
                            s.date = m.ddt(e.date),
                            s.day = m.ds(s.date, "/"),
                            n == _.URLHASH.KMS ? (s.volume = e.trvolume || 0,
                            s.amount = e.tramount || 0,
                            s.trbs = e.trbs,
                            s.kke_cs = 0 == e.trbs ? -1 : 1) : (o ? (s.open = e.open,
                            s.high = e.high,
                            s.low = e.low,
                            s.volume = e.totalVolume) : isNaN(s.volume) ? s.volume = e.volume : s.volume += Number(e.volume),
                            s.kke_cs = s.close > s.open ? 1 : s.open > s.close ? -1 : 0);
                            var u;
                            1 == i.length ? u = o ? e.prevclose : s.open : (u = i[i.length - 2].close,
                            e.settlement && o && (u = e.settlement)),
                            /^forex|^BTC/.test(h.market) && (n == _.URLHASH.K1 || n == _.URLHASH.KD) && (u = e.prevclose),
                            s.change = e.price - u,
                            s.percent = s.change / Math.abs(u),
                            e.price > s.high && (s.high = e.price),
                            e.price < s.low && (s.low = e.price),
                            s.amplitude = Math.abs(s.high - s.low),
                            s.ampP = Math.abs(s.amplitude / u),
                            s.time = e.time,
                            t.isCNK(e.symbol) && (s.postVol = e.postVolume,
                            s.postAmt = e.postAmount)
                        }
                    }
                }, c = function(e) {
                    l(e, _.URLHASH.KD, 0),
                    l(e, _.URLHASH.KW, 0),
                    l(e, _.URLHASH.KM, 0),
                    l(e, _.URLHASH.KY, 0),
                    l(e, _.URLHASH.KDF, 0),
                    l(e, _.URLHASH.KWF, 0),
                    l(e, _.URLHASH.KMF, 0),
                    l(e, _.URLHASH.KYF, 0),
                    l(e, _.URLHASH.KCL, 0),
                    l(e, _.URLHASH.KCLF, 0),
                    l(e, _.URLHASH.K1, 1),
                    l(e, _.URLHASH.K5, 1),
                    l(e, _.URLHASH.K15, 1),
                    l(e, _.URLHASH.K30, 1),
                    l(e, _.URLHASH.K60, 1),
                    l(e, _.URLHASH.K240, 1),
                    l(e, _.URLHASH.KMS, 2)
                }, d = new function() {
                    this.check = function(e) {
                        if (n)
                            return !0;
                        var a = V.viewId
                          , i = K.get(a);
                        if (!i || i.length < 1)
                            return !1;
                        var o = i[i.length - 1];
                        if (e.date > o.date)
                            if ("mink" == _.URLHASH.gt(V.viewId).type) {
                                if (!t.kUtil.spk(o.time, e.time, "00:00", a, h.market))
                                    return !1
                            } else if (!f(e.date, o.date))
                                return !1;
                        return !0
                    }
                }
                ;
                this.uUpdate = function(n, o, r, l) {
                    var u, p = {
                        symbol: e.symbol,
                        ssl: a.ssl
                    };
                    r ? (u = "datas.hq.parse",
                    p.hqStr = r,
                    p.market = l) : (u = "datas.hq.get",
                    p.delay = !0,
                    p.cancelEtag = o),
                    KKE.api(u, p, function(a) {
                        var o = a.dataObj[e.symbol];
                        if (o && o.date && s(o)) {
                            if (A = A || o.name || "",
                            !d.check(o))
                                return;
                            h.hq = o,
                            c(o),
                            i(!0),
                            t.isFunc(n) && n()
                        }
                    })
                }
            }
              , $ = new function() {
                var i, o = function(e, n) {
                    S.re(_.e.K_DATA_LOADED, n),
                    t.isFunc(e) && e()
                }, s = function(e) {
                    if (!h.hq || !h.hq.date)
                        return null;
                    for (var t = 0; !e[t].f; )
                        t++;
                    return {
                        factor: e[t].f
                    }
                }, r = function(e, a, i, o) {
                    if (e) {
                        var s, r, l, c, h, d, u, p, f, v, g, b, y = !(-828 === e), N = C.getOriDK(), w = 0;
                        if (r = "q" === i ? _.URLHASH.KDF : _.URLHASH.KDB,
                        C.initState(r, t.clone(N, null), !1, !1, !0),
                        s = C.get(r),
                        b = s.length,
                        y) {
                            for (g = b - 1; g >= 0; g--) {
                                for (p = s[g],
                                f = m.ds(p.date); f < a[w].d; )
                                    w++;
                                if (v = Number(a[w].f),
                                "HK" === o) {
                                    if (p.high *= v,
                                    p.low *= v,
                                    p.open *= v,
                                    p.close *= v,
                                    "h" === i) {
                                        var k = Number(a[w].c);
                                        p.high += k,
                                        p.low += k,
                                        p.open += k,
                                        p.close += k
                                    }
                                } else
                                    "US" === o ? (p.high *= v,
                                    p.low *= v,
                                    p.open *= v,
                                    p.close *= v) : "h" === i ? (p.high *= v,
                                    p.low *= v,
                                    p.open *= v,
                                    p.close *= v) : (p.high /= v,
                                    p.low /= v,
                                    p.open /= v,
                                    p.close /= v)
                            }
                            for (g = 0; b > g; g++)
                                p = s[g],
                                v = Number(a[a.length - 1].f),
                                0 == g && (d = p.prevclose,
                                isNaN(d) || 0 >= d ? d = p.open : (d = "HK" === o ? p.prevclose * v : "h" === i ? p.prevclose * v : p.prevclose / v,
                                p.prevclose = d)),
                                p.amplitude = Math.abs(p.high - p.low),
                                p.ampP = Math.abs(p.amplitude / d),
                                p.change = p.close - d,
                                p.percent = p.change / Math.abs(d),
                                d = p.close
                        }
                        var M;
                        1 == b && (p = s[b - 1],
                        M = {
                            open: p.open,
                            high: p.high,
                            low: p.low,
                            close: p.close,
                            price: p.close,
                            volume: p.volume,
                            totalVolume: p.volume,
                            date: m.dd(p.date)
                        }),
                        l = t.kUtil.mw(s, M, null, null, 0 / 0),
                        h = l[0],
                        c = l[1],
                        u = l[2],
                        t.kUtil.pd(h, null),
                        t.kUtil.pd(c, null),
                        t.kUtil.pd(u, null),
                        C.initState(_.URLHASH["q" == i ? "KWF" : "KWB"], h),
                        C.initState(_.URLHASH["q" == i ? "KMF" : "KMB"], c),
                        C.initState(_.URLHASH["q" == i ? "KYF" : "KYB"], u);
                        var S = t.clone(s, null);
                        C.initState(_.URLHASH["q" == i ? "KCLF" : "KCLB"], S, !1, !0),
                        n || C.initState(r, s)
                    }
                }, l = function(t) {
                    var n = _.URLHASH.gt(V.viewId)
                      , i = n.dir
                      , l = {
                        symbol: e.symbol,
                        market: u,
                        dir: i,
                        ssl: a.ssl
                    };
                    F.show(),
                    KKE.api("datas.k.loadReData", l, function(e) {
                        F.hide();
                        var n = !0
                          , a = e.data;
                        if (a) {
                            var c = s(a);
                            c && (n = !1,
                            r(c.factor, a, i, l.market))
                        }
                        n && r(-828, null, i),
                        o(t, {
                            viewId: V.viewId
                        })
                    })
                }, c = function(e, t) {
                    var s = _.URLHASH.gt(i)
                      , r = "mink" == s.type ? C.initState : C.initDWMState;
                    F.show(),
                    "LSE" === u && (e.symbol = a.rawSymbol),
                    KKE.api("datas.k.get", e, function(a) {
                        F.hide();
                        var l = i;
                        if (i = 0 / 0,
                        "error" == a.msg) {
                            if (h.isErr = !0,
                            n)
                                if (a.data && a.data.hq) {
                                    var c;
                                    if (a.data.hq.status)
                                        switch (a.data.hq.status) {
                                        case 2:
                                            c = _.notlisted;
                                            break;
                                        case 3:
                                            c = _.delisted
                                        }
                                    else
                                        c = _.norecord;
                                    c && q.showTip({
                                        txt: c,
                                        parent: x,
                                        noBtn: !0
                                    })
                                } else
                                    q.showTip({
                                        txt: _.nodata,
                                        parent: x
                                    })
                        } else
                            a.data.hq && (h.hq = a.data.hq),
                            r(s.baseid, a.data, e.ismink);
                        o(t, {
                            viewId: l
                        })
                    })
                }, d = function(t) {
                    KKE.api("datas.hq.get", {
                        symbol: e.symbol,
                        cancelEtag: !0,
                        ssl: a.ssl
                    }, function(n) {
                        var a = n.dataObj[e.symbol]
                          , i = [{
                            close: a.price,
                            open: a.open,
                            high: a.high,
                            low: a.low,
                            volume: 0,
                            prevclose: a.prevclose,
                            amplitude: Math.abs(a.high - a.low),
                            ampP: Math.abs((a.high - a.low) / a.prevclose),
                            change: a.price - a.prevclose,
                            date: a.date,
                            day: m.ds(a.date, "/"),
                            time: a.time,
                            percent: a.price - a.prevclose / a.prevclose,
                            kke_cs: 0
                        }];
                        C.initState(V.viewId, i, !0),
                        o(t, {
                            viewId: V.viewId
                        })
                    })
                }, p = function(t) {
                    var n, i, o = V.viewId, s = _.URLHASH.gt(o);
                    if (h.nco && h.nco.open)
                        i = h.nco.open,
                        b = i;
                    else {
                        var r = new Date
                          , l = b.split(":");
                        r.setHours(l[0], l[1], 0),
                        r.setMinutes(r.getMinutes() - 30),
                        i = m.dst(r)
                    }
                    var d = {
                        symbol: e.symbol,
                        newthour: i,
                        ssl: a.ssl
                    };
                    if ("mink" == s.type) {
                        if (n = e.datas.min,
                        d.ismink = !0,
                        d.scale = o,
                        /^forex|^BTC/.test(h.market))
                            switch (d.withsymbol = "sys_time",
                            o) {
                            case _.URLHASH.K1:
                                d.datalen = 1440;
                                break;
                            case _.URLHASH.K240:
                                d.datalen = parseInt(60 / o * 24 * 10);
                                break;
                            default:
                                d.datalen = parseInt(60 / o * 24 * 5)
                            }
                    } else
                        n = e.datas.day;
                    d.dataurl = n.url,
                    d.dataformatter = n.dataformatter,
                    d.wfn = n.wfn,
                    d.staticdata = n.staticdata,
                    c(d, t)
                }, f = function(e) {
                    h.nco = {
                        open: "20:00",
                        close: "15:30"
                    },
                    p(e)
                }, v = function(e) {
                    h.nco = {
                        open: "07:00",
                        close: "06:00"
                    },
                    p(e)
                }, g = function(t) {
                    var n = {
                        symbol: e.symbol,
                        ssl: a.ssl
                    }
                      , i = "datas.k.";
                    i += "loadGBInit",
                    h.nco = {
                        open: "15:00",
                        close: "23:30"
                    },
                    KKE.api(i, n, function(e) {
                        var n = e.data;
                        if (n) {
                            var a = n.time;
                            a && a.length > 0 && (h.nco.open = a[0][0] || h.nco.open,
                            h.nco.close = a[a.length - 1][1] || h.nco.close)
                        }
                        p(t)
                    })
                }, y = function(t, n) {
                    var i = {
                        symbol: e.symbol,
                        ssl: a.ssl
                    }
                      , o = "datas.k.";
                    n ? (o += "loadNFInit",
                    h.nco = {
                        open: "09:00",
                        close: "15:00"
                    }) : (o += "loadHFInit",
                    h.nco = {
                        open: "06:00",
                        close: "05:59"
                    }),
                    KKE.api(o, i, function(e) {
                        var n = e.data;
                        if (n) {
                            var a = n.time;
                            a && a.length > 0 && (h.nco.open = a[0][0] || h.nco.open,
                            h.nco.close = a[a.length - 1][1] || h.nco.close)
                        }
                        p(t)
                    })
                }, N = function(e, t) {
                    var n = new Date
                      , a = b.split(":");
                    n.setHours(a[0], a[1], 0),
                    n.setMinutes(n.getMinutes() - 1);
                    var i = m.dst(n);
                    h.nco = {
                        open: b,
                        close: i
                    },
                    "rek" == t.type && C.get(_.URLHASH.KD) ? l(e) : p(e)
                };
                this.iInit = function(e) {
                    var t = V.viewId;
                    if (i != t) {
                        i = t;
                        var n = _.URLHASH.gt(t);
                        switch (h.market) {
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
                            "msk" == n.type ? d(e) : "rek" == n.type && C.get(_.URLHASH.KD) ? l(e) : p(e)
                        }
                    }
                }
            }
            ;
            this.kDb = C,
            this.extraDataObj = C.extraDataObj,
            this.getYtdIndex = function(e) {
                var t = C.get(_.URLHASH.KD);
                if (!t)
                    return null;
                var n = t[t.length - 1]
                  , a = n.date.getFullYear()
                  , i = 0;
                return e && (a--,
                i = n.date.getMonth()),
                l(new Date(a,i,1))
            }
            ,
            this.initData = $.iInit,
            this.doUpdate = P.uUpdate,
            this.onViewChange = i,
            this.setPricePos = function(e, t) {
                h.labelMaxP = e[0],
                h.labelMinP = e[1],
                h.labelPriceCount = e[2],
                h.isCompare = t,
                O.createPlayingData(),
                N && N.setPricePos(e)
            }
            ,
            this.setRange = function(e) {
                O.setDataRange(),
                y && y.setDataRange(),
                N && N.setDataRange(),
                w && w.setDataRange(e)
            }
            ,
            this.draw = function() {
                M.draw(),
                y && y.allDraw(z.x),
                N && N.allDraw(z.x)
            }
            ,
            this.resize = function(e) {
                O.createPlayingData(),
                M.resize(),
                y && y.onResize(e),
                N && N.onResize(),
                w && w.onResize()
            }
            ,
            this.clear = function(e) {
                M.clear(e),
                y && (y.clear(),
                y = null),
                N && (N.clear(),
                N = null),
                w && (w.clear(),
                w = null),
                n && (E = null)
            }
            ,
            this.getPriceTech = function() {
                return N || null
            }
            ;
            var W = function(e, n, a) {
                e && j.resizeAll(!0),
                I.onChangeView(),
                n && t.isFunc(n.callback) && n.callback(),
                a && Y.onTechChanged(a[0])
            }
              , G = void 0;
            this.initPt = function(e, i) {
                if (e) {
                    !t.isArr(e) && (e = [e]);
                    for (var o = e.length; o--; )
                        if (e[o].name && "VOLUME" === e[o].name.toUpperCase()) {
                            e.splice(o, 1),
                            L.custom.show_underlay_vol = !0;
                            break
                        }
                    N || (N = new s({
                        iMgr: B,
                        stockData: h,
                        chartArea: R,
                        titleArea: H,
                        cb: W,
                        cfg: L,
                        type: "k",
                        usrObj: a
                    }),
                    n && (U = N),
                    G && (g = N.showHide(G),
                    G = void 0)),
                    N.createChart(e, i)
                }
            }
            ,
            this.removePt = function(e) {
                if (e) {
                    !t.isArr(e) && (e = [e]);
                    for (var n = e.length; n--; )
                        if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                            e.splice(n, 1),
                            L.custom.show_underlay_vol = !1;
                            break
                        }
                } else
                    L.custom.show_underlay_vol = !1;
                N && N.removeChart(e)
            }
            ,
            this.togglePt = function(e, t) {
                N ? g = N.showHide(e) : !t && (G = e)
            }
            ,
            this.initTc = function(e, t) {
                y || (y = new r({
                    stockData: h,
                    iMgr: B,
                    cb: W,
                    subArea: D,
                    cfg: L,
                    type: "k",
                    usrObj: a,
                    initMgr: j
                }),
                n && (T = y)),
                y.createChart(e, t)
            }
            ,
            this.removeTc = function(e) {
                y && y.removeChart(e)
            }
            ,
            this.initRs = function() {
                w = new o({
                    stockData: h,
                    setting: L,
                    rc: I.moving
                }),
                w.linkData(),
                E = w
            }
            ,
            this.setLineStyle = M.setLineStyle,
            this.getLineStyle = M.getLineStyle,
            c()
        }
        function k(e, a) {
            function i() {
                if (y)
                    r = L.COLOR.K_N,
                    s = L.COLOR.K_FALL,
                    l = L.COLOR.K_RISE,
                    c = L.COLOR.K_CL;
                else {
                    var a = o.linecolor
                      , i = a.K_N || "#" + t.randomColor();
                    r = i,
                    s = a.K_FALL || i,
                    l = a.K_RISE || i,
                    c = a.K_CL || i
                }
                m.K_N = r,
                m.K_FALL = s,
                m.K_RISE = l,
                m.K_CL = c,
                d = new n.xh5_ibPainter({
                    setting: L,
                    sd: e,
                    ctn: C,
                    withHBg: y,
                    fixScale: !1,
                    reO: {
                        mh: L.DIMENSION.H_MA4K
                    },
                    iMgr: B,
                    iTo: function(t, n, a, i) {
                        if (e && e.datas) {
                            !h(t, B.iHLineO.body) && t.appendChild(B.iHLineO.body);
                            var o = e.labelMaxP - a / L.DIMENSION.h_k * (e.labelMaxP - e.labelMinP);
                            B.iToD({
                                mark: o,
                                x: n,
                                y: a,
                                oy: L.DIMENSION.H_MA4K,
                                ox: L.DIMENSION.posX,
                                e: i
                            }, !0, !1)
                        }
                    }
                }),
                u = d.getG()
            }
            var o, s, r, l, c, d, u, m = {}, f = 1.3, v = 1.3, g = "solid", b = isNaN(a.nfloat) ? 2 : a.nfloat, y = e.isMain, N = function(e) {
                if (o = p({
                    linetype: "solid",
                    linecolor: m
                }, e || {}),
                m = o.linecolor,
                r = m.K_N,
                s = m.K_FALL,
                l = m.K_RISE,
                c = m.K_CL,
                !o.linetype && (o.linetype = g),
                L.datas.candle = o.linetype,
                0 == o.linetype.indexOf("line") || 0 == o.linetype.indexOf("mountain")) {
                    var t = Number(o.linetype.split("_")[1]);
                    (isNaN(t) || 0 >= t) && (t = v),
                    f = t
                }
            }, _ = function(t, n) {
                u.fillStyle = L.COLOR.K_EXT;
                for (var a, i, o, s = !1, r = !1, l = e.datas, c = l.length; c--; ) {
                    if (o = l[c],
                    a = n,
                    !s && o.high == e.rangeMax) {
                        s = !0;
                        var h = o.high.toFixed(b);
                        99 > a ? u.textAlign = "left" : a > L.DIMENSION.w_k - 99 ? (u.textAlign = "right",
                        a -= 5) : u.textAlign = "center",
                        i = o.hy,
                        i < L.STYLE.FONT_SIZE && (i = L.STYLE.FONT_SIZE + 2),
                        u.fillText(h, a, i)
                    }
                    if (a = n,
                    !r && o.low == e.rangeMin) {
                        r = !0;
                        var d = o.low.toFixed(b);
                        99 > a ? u.textAlign = "left" : a > L.DIMENSION.w_k - 99 ? (u.textAlign = "right",
                        a -= 5) : u.textAlign = "center",
                        i = Math.floor(o.ly + L.STYLE.FONT_SIZE + 2),
                        i > L.DIMENSION.h_k + .5 * L.STYLE.FONT_SIZE - 3 && (i = L.DIMENSION.h_k),
                        u.fillText(d, a, i)
                    }
                    if (r && s)
                        break;
                    n -= t,
                    0 > n && (n = 0)
                }
            }, w = function() {
                var t = e.datas
                  , n = t.length
                  , a = L.DIMENSION.w_k / Math.max(n, L.PARAM.minCandleNum)
                  , i = .5 * a
                  , o = z.x - a;
                d.beginPath();
                for (var s, r, l = 0; n > l; l++)
                    s = t[l],
                    r = s.vy,
                    d.drawVStickC(o, r, i, L.DIMENSION.h_k, L.COLOR.V_SD),
                    o += a;
                d.stroke()
            }, k = function() {
                for (var t, n, a = e.datas, i = a.length, s = L.DIMENSION.w_k / Math.max(i, L.PARAM.minCandleNum), r = z.x - .4 * s, l = 0; i > l; l++)
                    n = a[l],
                    t = n.cy,
                    0 == l ? (d.newStyle(c, !0, f),
                    d.moveTo(r, t)) : d.lineTo(r, t),
                    n.ix = r,
                    r += s;
                d.stroke(),
                0 == o.linetype.indexOf("mountain") && (r -= s,
                d.lineTo(r, L.DIMENSION.h_k),
                d.lineTo(z.x - .4 * s, L.DIMENSION.h_k),
                d.newFillStyle_rgba(L.COLOR.M_ARR, L.DIMENSION.h_k, L.COLOR.M_ARR_A),
                d.fill()),
                y && L.custom.show_ext_marks && _(s, r)
            }, M = function() {
                for (var t, n, a, i, o = e.datas, c = o.length, h = L.DIMENSION.w_k / Math.max(c, L.PARAM.minCandleNum), u = .6 * h, p = -1, m = 1, f = 0; 3 > f; f++) {
                    switch (p) {
                    case -1:
                        i = s;
                        break;
                    case 0:
                        i = r;
                        break;
                    case 1:
                        i = l
                    }
                    for (t = z.x - h,
                    d.beginPath(),
                    a = 0; c > a; a++)
                        n = o[a],
                        n.isFake || (n.kke_cs == p && d.drawCandleRect(t, n.oy, n.cy, u, i, n.kke_cs == m),
                        0 == f && (n.ix = t + u)),
                        t += h;
                    for (d.stroke(),
                    t = z.x - h,
                    d.beginPath(),
                    a = 0; c > a; a++)
                        n = o[a],
                        n.isFake || n.kke_cs == p && d.drawCandleLineRect(t, n.hy, n.oy, n.cy, n.ly, u, i, n.kke_cs == m),
                        t += h;
                    d.stroke(),
                    p++
                }
                y && L.custom.show_ext_marks && _(h, t)
            }, S = function() {
                var t, n, a, i = e.datas, o = i.length, c = L.DIMENSION.w_k / Math.max(o, L.PARAM.minCandleNum), h = .6 * c, u = -1;
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
                        p = l
                    }
                    for (t = z.x - c,
                    d.beginPath(),
                    a = 0; o > a; a++)
                        n = i[a],
                        n.isFake || (n.kke_cs == u && d.drawCandleRect_solid(t, n.oy, n.cy, h, p),
                        0 == m && (n.ix = t + h)),
                        t += c;
                    for (d.stroke(),
                    t = z.x - c,
                    d.beginPath(),
                    a = 0; o > a; a++)
                        n = i[a],
                        n.isFake || n.kke_cs == u && d.drawCandleLineRect(t, n.hy, n.oy, n.cy, n.ly, h, p, !1),
                        t += c;
                    d.stroke(),
                    u++
                }
                y && L.custom.show_ext_marks && _(c, t)
            }, I = function() {
                for (var t, n, a, i, o = e.datas, c = o.length, h = L.DIMENSION.w_k / Math.max(c, L.PARAM.minCandleNum), u = .6 * h, p = -1, m = 0; 3 > m; m++) {
                    switch (p) {
                    case -1:
                        i = s;
                        break;
                    case 0:
                        i = r;
                        break;
                    case 1:
                        i = l
                    }
                    for (t = z.x - h,
                    d.beginPath(),
                    a = 0; c > a; a++)
                        n = o[a],
                        n.isFake || (0 == m && (n.ix = t + u),
                        n.kke_cs == p && d.drawOhlc(t, n.oy, n.hy, n.ly, n.cy, u, i)),
                        t += h;
                    d.stroke(),
                    p++
                }
                y && L.custom.show_ext_marks && _(h, t)
            }, A = function() {
                y && d.drawBg(z.x);
                var t = e.datas;
                if (t) {
                    var n = 0 == o.linetype.indexOf("line") || 0 == o.linetype.indexOf("mountain")
                      , a = 0 == o.linetype.indexOf("hollow")
                      , i = 0 == o.linetype.indexOf("ohlc");
                    d.clear(n, L.PARAM.getHd()),
                    d.newGStyle({
                        textBaseline: "bottom",
                        font: L.STYLE.FONT_SIZE + "px " + L.STYLE.FONT_FAMILY
                    }),
                    y && L.custom.show_underlay_vol && w(),
                    n ? k() : a ? M() : i ? I() : S()
                }
            };
            this.draw = A,
            this.clear = function(e) {
                e ? d.clear(!1, L.PARAM.getHd()) : (d.remove(),
                d = null)
            }
            ,
            this.resize = function() {
                d.resize({
                    mh: L.DIMENSION.H_MA4K
                }),
                A()
            }
            ,
            this.setLineStyle = N,
            this.getLineStyle = function() {
                return o
            }
            ,
            N(a),
            i()
        }
        function M() {
            var e, n, l, h, d = this, f = [], g = .05, y = function() {
                var e, t, n = Number.MAX_VALUE, i = -Number.MAX_VALUE, o = f.length, s = o > 1 || "percent" == L.datas.scaleType;
                L.custom.k_overlay && (s = !1);
                for (var r, l, c, h, d = s ? "Percent" : "Price", u = o; u--; )
                    e = f[u],
                    a.scalerange ? c = a.scalerange : (h = e.getPriceTech(),
                    s || !h ? c = [i, n] : (t = h && h.getMaxMin(),
                    c = t || [i, n])),
                    r = e["min" + d],
                    l = e["max" + d],
                    isFinite(r) && isFinite(l) && (n = Math.min(n, r, c[1]),
                    i = Math.max(i, l, c[0]));
                var p;
                p = a.scalerange ? a.scalerange.concat(4) : 1 == a.pcm ? .0199 > i - n ? [i, n, 1] : v(i, n, 2, !1, !0) : v(i, n, a.nfloat, !1, !0, g);
                for (var m = o; m--; )
                    e = f[m],
                    e.setPricePos(p, s)
            }, N = function() {
                (V.start < 1 || !L.custom.smooth) && z.resetX();
                for (var e = f.length; e--; )
                    f[e].draw()
            }, w = function() {
                V.start = V.end = 0 / 0,
                V.currentLength = 0 / 0,
                n = void 0
            }, k = function(t) {
                w();
                for (var n, a = f.length, i = 0; a > i; i++)
                    n = f[i],
                    n.onViewChange();
                y(),
                N(),
                t || Y.onRange(e, a > 1)
            }, M = [], S = !1, I = function(t) {
                return t.isErr ? (t !== e && d.removeCompare([t.symbol]),
                !0) : t.kDb.get() ? !0 : (t.initData(R),
                !1)
            }, A = function(e) {
                if (e && t.isFunc(e.callback)) {
                    for (var n = !1, a = M.length; a--; )
                        if (e.callback === M[a]) {
                            n = !0;
                            break
                        }
                    !n && M.push(e.callback)
                }
            }, C = function() {
                for (var t, n = !0, a = f.length; a--; )
                    t = f[a],
                    t == e || I(t) || (n = !1,
                    S = !0);
                return n
            }, R = function(t, n) {
                if (A(n),
                I(e)) {
                    if (e.isErr)
                        return void (e.isErr = !1);
                    if (B.patcher.switchFloater(),
                    z.resetX(0),
                    C())
                        for (S = !1,
                        k(t); M.length; ) {
                            var a = M.shift();
                            a()
                        }
                    if (Y.onViewChanged(),
                    t)
                        return;
                    Y.onDataUpdate(),
                    Y.onViewPrice()
                }
            }, H = function(t) {
                (t || n && V.dataLength != n) && Y.onRange(e, f.length > 1),
                n = V.dataLength
            }, D = function(e) {
                (e || V.end == V.dataLength) && (B.update(),
                y(),
                N(),
                H(!0)),
                Y.onDataUpdate(),
                !B.isIng() && Y.onViewPrice()
            }, K = function(e) {
                clearTimeout(h),
                !P && x.parentNode && "none" != x.style.display && (h = setTimeout(D, e || 200))
            }, T = function() {
                if (!S)
                    for (var e, t = f.length; t--; )
                        e = f[t],
                        e.doUpdate(K)
            }, U = function() {
                if (clearInterval(l),
                !isNaN(a.rate)) {
                    var e = 1e3 * a.rate;
                    e > 0 && (l = setTimeout(U, e))
                }
                T()
            };
            this.mM = new function() {
                var n = function(a, i, o) {
                    var l, c;
                    switch (i) {
                    case "price":
                        if (l = s,
                        c = "initPt",
                        t.isObj(a))
                            a.name && "TZY" === String(a.name).toUpperCase() && (g = .2);
                        else if (t.isArr(a))
                            for (var h, d = a.length; d--; )
                                if (h = a[d],
                                h && h.name && "TZY" === String(h.name).toUpperCase()) {
                                    g = .2;
                                    break
                                }
                        break;
                    case "tech":
                        l = r,
                        c = "initTc"
                    }
                    c && (l ? e[c](a, o) : KKE.api("plugins.techcharts.get", {
                        type: i
                    }, function(e) {
                        r = e.tChart,
                        s = e.pChart,
                        n(a, i, o)
                    }))
                }
                  , a = function(t, n) {
                    var a;
                    switch (n) {
                    case "price":
                        a = "removePt",
                        g = .05;
                        break;
                    case "tech":
                        a = "removeTc";
                        break;
                    default:
                        return
                    }
                    e && e[a](t)
                }
                  , i = function(t) {
                    return o ? (E ? (E.sh(t),
                    (t.from || t.to) && E.dateFromTo(t.from, t.to)) : (e.initRs(),
                    i(t),
                    O.appendChild(E.getBody())),
                    void j.resizeAll(!0)) : void KKE.api("plugins.rangeselector.get", null, function(e) {
                        o = e,
                        i(t)
                    })
                };
                this.showRs = i,
                this.newAC = n,
                this.removeAC = a,
                this.togglePt = function(t, n) {
                    e && (e.togglePt(t, n),
                    R())
                }
            }
            ;
            var F = new function() {
                var n, i, o, s, r = !1, l = !1, h = function() {
                    i || (i = c("div"),
                    i.style.margin = "0 auto"),
                    i.style.width = .8 * L.DIMENSION.getStageW() + "px",
                    i.style.height = .83 * L.DIMENSION.h_k + "px"
                }, d = function(e) {
                    n.dateTo(e.date, function(e) {
                        1 != e && q.showTip({
                            txt: _.nohistoryt,
                            parent: x
                        })
                    })
                }, u = function(t) {
                    if (o && n) {
                        l = !0;
                        var a = n.getSymbols()[0];
                        a != e.symbol && n.newSymbol({
                            symbol: e.symbol
                        }),
                        n.resize(),
                        d(t),
                        n.show(i)
                    }
                }, p = function() {
                    l = !1
                }, f = function(n) {
                    var a = {
                        txt: e.getName() + "(" + e.symbol + ") " + m.ds(n.date),
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
                    return o || (o = new t.TipM(L.COLOR)),
                    a.content = i,
                    a
                }, v = function(t) {
                    var s = f(t);
                    if (o.genTip(s),
                    n)
                        u(t);
                    else {
                        if (r)
                            return;
                        r = !0,
                        KKE.api("chart.h5t.get", {
                            symbol: e.symbol,
                            dom: i,
                            nfloat: a.nfloat
                        }, function(e) {
                            n = e,
                            r = !1,
                            u(t)
                        })
                    }
                };
                this.resetHisT = function() {
                    o && o.hide()
                }
                ,
                this.isShowing = function() {
                    return l
                }
                ,
                this.historyT = function() {
                    if ("CN" === t.market(e.symbol)) {
                        s = B.getInteractiveIdx();
                        var n = e.datas[s];
                        if (n) {
                            if (n.date.getFullYear() < 2008)
                                return void q.showTip({
                                    txt: _.historyt08,
                                    parent: x
                                });
                            switch (L.custom.history_t) {
                            case "layer":
                                h(),
                                v(n);
                                break;
                            case "window":
                                var a = "http://finance.sina.com.cn/h5charts/tchart.html?symbol=$symbol&date=$date&rangeselector=true&indicator=tvol";
                                a = a.replace("$symbol", e.symbol).replace("$date", m.ds(n.date));
                                var i = "width=600,height=375,location=0,menubar=0,titlebar=0,toolbar=0,alwaysRaised=1";
                                window.open(a, "_blank", i);
                                break;
                            default:
                                return
                            }
                        }
                    }
                }
            }
            ;
            this.h5tM = F,
            this.getAllStock = function() {
                return f
            }
            ,
            this.getMainStock = function() {
                return e
            }
            ,
            this.getAllSymbols = function() {
                for (var e = [], t = 0, n = f.length; n > t; t++)
                    e.push(f[t].symbol);
                return e
            }
            ;
            var $ = function() {
                d.mM.togglePt(f.length > 1 ? {
                    v: !1
                } : V.viewId == _.URLHASH.KCL || V.viewId == _.URLHASH.KCLF || V.viewId == _.URLHASH.KCLB ? {
                    v: !1
                } : {
                    v: !0
                })
            }
              , W = function(t, n, a, i, o) {
                if (!a && z.resetX(),
                !(n - t < L.PARAM.minCandleNum || n > V.dataLength || 0 > t || n - t > L.PARAM.maxCandleNum)) {
                    V.start = t,
                    V.end = n,
                    V.currentLength = n - t;
                    for (var s, r = f.length, l = 0; r > l; l++)
                        s = f[l],
                        s.setRange(i);
                    y(),
                    N(),
                    o || Y.onRange(e, r > 1)
                }
            };
            this.onChangeView = R,
            this.showYTD = function(t, n) {
                V.viewId = _.URLHASH.KD + t,
                R(!0);
                var a = e.getYtdIndex(n);
                a && W(a[0], a[1] + 1)
            }
            ,
            this.moving = W,
            this.callSdDraw = N;
            var G = function(t, n) {
                var a = t instanceof i ? t : new i(t,n);
                n && (e = a),
                f.push(a),
                $(),
                R()
            }
              , X = function(n) {
                if ("mink" == _.URLHASH.gt(V.viewId).type) {
                    var a = t.market(n.symbol)
                      , i = t.market(e.symbol);
                    if (a != i && ("US" == a || "US" == i))
                        return !1
                }
                return !0
            };
            this.compare = function(e) {
                for (var n = e.callback, a = f.length; a--; )
                    if (f[a].symbol == e.symbol)
                        return void (t.isFunc(n) && n({
                            code: 1,
                            msg: "comparing same symbol"
                        }));
                X(e) ? G(e, !1) : t.isFunc(n) && n({
                    code: 2,
                    msg: "invalid comparing market or period"
                })
            }
            ,
            this.removeCompare = function(e, t) {
                for (var n, a, i = !1, o = e.length; o--; ) {
                    a = e[o];
                    for (var s = f.length; s--; )
                        if (a == f[s].symbol) {
                            i = !0,
                            n = f.splice(s, 1)[0],
                            n.clear(t),
                            n = null;
                            break
                        }
                }
                i && !t && ($(),
                y(),
                N())
            }
            ;
            var Z, J = function(e) {
                e ? D() : V.end == V.dataLength && B.update()
            }, Q = !1, ee = 0, te = function() {
                clearTimeout(Z),
                Q = !1,
                ee = 0
            }, ne = function() {
                Z = setTimeout(function() {
                    ee > 0 && K(1),
                    te()
                }, 500)
            };
            this.pushData = function(e, t) {
                var n = !1;
                switch (Number(t)) {
                case 0:
                    te();
                    break;
                case 1:
                    te(),
                    n = !0;
                    break;
                case 2:
                    Q || (Q = !0,
                    ne())
                }
                for (var a = e.length; a--; )
                    for (var i = f.length; i--; )
                        if (f[i].symbol === e[a].symbol && e[a].data) {
                            ee++,
                            f[i].doUpdate(b(J, null, n), !1, e[a].data, e[a].market);
                            break
                        }
            }
            ,
            this.setScale = function(e) {
                L.datas.scaleType = e,
                y(),
                N()
            }
            ,
            this.setLineStyle = function(n) {
                if (n) {
                    !t.isArr(n) && (n = [n]);
                    for (var a = n.length; a--; ) {
                        var i = n[a];
                        if (i.hasOwnProperty("symbol")) {
                            for (var o = i.symbol, s = f.length; s--; )
                                if (f[s].symbol == o) {
                                    f[s].setLineStyle(i),
                                    f[s].draw();
                                    break
                                }
                        } else
                            e.setLineStyle(i),
                            e.draw()
                    }
                } else
                    e.setLineStyle(),
                    e.draw()
            }
            ,
            this.onResize = function(e) {
                for (var t = f.length; t--; )
                    f[t].resize(e)
            }
            ;
            var ae = -1
              , ie = -1
              , oe = function(e, t) {
                var n = V.start
                  , a = V.end
                  , i = e / Math.abs(e)
                  , o = i * Math.ceil((a - n) / L.PARAM.zoomUnit);
                if (Math.abs(o) > L.PARAM.zoomLimit && (o = i * L.PARAM.zoomLimit),
                L.custom.centerZoom) {
                    var s = t ? t.layerX / L.DIMENSION.w_k : .5;
                    s < L.PARAM.zoomArea ? a = Math.min(a - o * Math.abs(o), V.dataLength) : s > 1 - L.PARAM.zoomArea ? n = Math.max(n + o * Math.abs(o), 0) : (n = Math.max(n + o * Math.abs(o), 0),
                    a = Math.min(a - o * Math.abs(o), V.dataLength))
                } else
                    n = Math.max(n + o * Math.abs(o), 0);
                return n == ae && a == ie ? [-1] : (ae = n,
                ie = a,
                [n, a])
            };
            this.onWheel = function(e) {
                if (!F.isShowing()) {
                    var t = e.detail || -1 * e.wheelDelta;
                    if (0 != t) {
                        var n = oe(t, e);
                        W(n[0], n[1])
                    }
                }
            }
            ,
            this.onKb = function(e) {
                if ("keyup" == e.type)
                    return void B.iToKb(null, !0);
                var t = e.keyCode;
                if (F.isShowing())
                    return void (27 == t && F.resetHisT());
                switch (t) {
                case 38:
                case 40:
                    var n = oe(38 == t ? 1 : -1);
                    W(n[0], n[1]);
                    break;
                case 37:
                case 39:
                    var a = B.iToKb(37 == t ? -1 : 1);
                    a && (W(V.start + a, V.end + a),
                    B.iToKb(0));
                    break;
                case 13:
                    F.historyT();
                    break;
                default:
                    return
                }
                u.preventDefault(e)
            }
            ,
            this.zoomApi = function(e) {
                var t = oe(e ? 1 : -1);
                W(t[0], t[1])
            }
            ,
            this.moveApi = function(e) {
                var t = V.start
                  , n = V.end;
                t += e,
                n += e,
                n > V.dataLength && (n = V.dataLength,
                t = V.start + n - V.end),
                0 > t && (t = 0,
                n = V.end - V.start),
                W(t, n)
            }
            ,
            this.shareTo = function(e) {
                e = p({
                    type: "weibo",
                    url: window.location.href,
                    wbtext: "",
                    qrwidth: 100,
                    qrheight: 100,
                    extra: void 0
                }, e || {});
                var n = String(e.type).toLowerCase();
                switch (n) {
                case "qrcode":
                    KKE.api("utils.qrcode.createcanvas", {
                        text: e.url,
                        width: e.qrwidth,
                        height: e.qrheight
                    }, function(e) {
                        q.showTip({
                            content: e,
                            txt: '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                            parent: x,
                            btnLb: "\u5173\u95ed"
                        })
                    });
                    break;
                default:
                    t.grabM.shareTo({
                        ctn: x,
                        w: L.DIMENSION.getStageW(),
                        h: L.DIMENSION.getStageH() - (O.clientHeight || 0),
                        ignoreZIdxArr: [L.PARAM.I_Z_INDEX],
                        ignoreIdArr: [L.PARAM.LOGO_ID],
                        priorZIdx: L.PARAM.G_Z_INDEX,
                        nologo: !1,
                        top: L.DIMENSION.posY + L.DIMENSION.H_MA4K + 17,
                        right: L.DIMENSION.RIGHT_W + L.DIMENSION.K_RIGHT_W,
                        LOGO_W: L.DIMENSION.LOGO_W,
                        LOGO_H: L.DIMENSION.LOGO_H,
                        color: L.COLOR.LOGO,
                        bgColor: L.COLOR.BG,
                        txt: e.wbtext,
                        url: e.url,
                        extra: e.extra
                    })
                }
            }
            ,
            this.getExtraData = function(n) {
                if (n = p({
                    symbol: e.symbol,
                    name: null,
                    clone: !0
                }, n || {}),
                !n.name)
                    return null;
                for (var a, i, o = f.length; o--; )
                    if (f[o].symbol === n.symbol) {
                        a = f[o];
                        break
                    }
                if (a) {
                    var s;
                    "currentK" == n.name ? (s = a.kDb.get(),
                    i = n.clone ? t.clone(s, null) : s) : (s = a.extraDataObj[n.name],
                    i = n.clone ? t.clone(s, null) : s)
                }
                return i
            }
            ,
            this.updateDataAll = U,
            this.outputNewRange = H,
            this.dcReset = function() {
                clearInterval(l),
                clearTimeout(h);
                for (var e, t = f.length; t--; )
                    e = f.splice(t, 1)[0],
                    e.clear(),
                    e = null
            }
            ,
            this.dcInit = function(e) {
                G(e, !0),
                U()
            }
        }
        t.xh5_EvtDispatcher.call(this);
        var S = this;
        a = p({
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
        }, a || {
            WANGXuan: "wangxuan2@staff.sina.com.cn",
            VER: "2.11.0"
        });
        var L;
        !function() {
            if (!a.symbol && (a.symbol = "sh000001"),
            a.symbol = String(a.symbol),
            a.rawSymbol = String(a.symbol),
            a.symbol = "LSE" === t.market(a.symbol) ? t.strUtil.replaceStr(a.symbol) : a.symbol.replace(".", "$"),
            L = e.getSetting(["_", a.symbol, "_", Math.floor(1234567890 * Math.random() + 1) + Math.floor(9876543210 * Math.random() + 1)].join("")),
            0 == location.protocol.indexOf("https:") && (a.ssl = !0),
            isNaN(a.rate) && (a.rate = L.PARAM.updateRate),
            !isNaN(a.mincandlenum) && a.mincandlenum > 0 && (L.PARAM.minCandleNum = a.mincandlenum),
            !isNaN(a.candlenum) && a.candlenum >= L.PARAM.minCandleNum && (L.PARAM.defaultCandleNum = a.candlenum),
            isNaN(a.maxcandlenum) || (L.PARAM.maxCandleNum = a.maxcandlenum),
            !isNaN(a.zoomunit) && a.zoomunit > L.PARAM.minCandleNum && (L.PARAM.zoomUnit = a.zoomunit),
            !isNaN(a.zoomlimit) && a.zoomlimit > 0 && (L.PARAM.zoomLimit = Math.round(a.zoomlimit)),
            g.noH5) {
                if ("undefined" == typeof FlashCanvas || a.fh5)
                    return void (t.isFunc(a.noh5) && a.noh5(a));
                L.PARAM.isFlash = !0
            }
            if (L.PARAM.isFlash && (L.COLOR.F_BG = "#fff"),
            a.reorder || (L.custom.indicator_reorder = !1),
            a.reheight || (L.custom.indicator_reheight = !1),
            a.dim)
                for (var n in a.dim)
                    a.dim.hasOwnProperty(n) && t.isNum(L.DIMENSION[n]) && (L.DIMENSION[n] = a.dim[n])
        }();
        var I, A, x, C, R, H, D, O, K, T, U, E, F, P = !1, $ = 0, V = {
            viewId: _.URLHASH.vi(a.view || "kd"),
            dataLength: 0 / 0,
            start: 0 / 0,
            end: 0 / 0,
            currentLength: 0 / 0,
            startDate: void 0,
            endDate: void 0,
            movY: 0
        }, z = {
            x: 0,
            resetX: function(e) {
                this.x = isNaN(e) ? L.DIMENSION.w_k / Math.max(V.currentLength, L.PARAM.minCandleNum) : e
            }
        }, q = new function() {
            var e;
            this.showTip = function(n) {
                e || (e = new t.TipM(L.COLOR)),
                e.genTip(n)
            }
            ,
            this.hideTip = function() {
                e && e.hide()
            }
        }
        , Y = new function() {
            var e = function() {
                var e = K.get(V.viewId);
                return e ? e[e.length - 1] : null
            };
            this.onRange = function(e, n) {
                !P && t.isFunc(a.onrange) && a.onrange({
                    isCompare: n,
                    data: e.datas,
                    viewRangeState: t.clone(V, null),
                    width: L.DIMENSION.w_k,
                    height: L.DIMENSION.h_k,
                    left: L.DIMENSION.posX,
                    top: L.DIMENSION.H_MA4K,
                    range: [e.labelMaxP, e.labelMinP, e.labelMaxVol],
                    minCandleNum: L.PARAM.minCandleNum
                })
            }
            ;
            var n = [];
            this.onViewPrice = function(i, o, s, r, l, c) {
                if (!P && t.isFunc(a.onviewprice)) {
                    if (!i) {
                        if (i = e(),
                        !i)
                            return;
                        o = V.currentLength - 1
                    }
                    if (!s) {
                        for (; n.length; )
                            n.length--;
                        for (var h, d, u, p, m = I.getAllStock(), f = 0, v = m.length; v > f; f++)
                            p = m[f],
                            h = p.datas,
                            !h || h.length <= o || (d = p.getName(),
                            u = h[o],
                            !r && m[f].isMain && (r = h),
                            n.push({
                                name: d,
                                data: u,
                                rangedata: h,
                                symbol: p.symbol,
                                color: p.getLineStyle().linecolor
                            }));
                        s = n
                    }
                    l || (l = I.getMainStock().getName()),
                    a.onviewprice({
                        data: t.clone(i, null),
                        rangedata: r,
                        idx: o,
                        left: L.DIMENSION.posX,
                        top: L.DIMENSION.H_MA4K,
                        data_array: s,
                        curname: l,
                        interacting: !!c
                    })
                }
            }
            ,
            this.onDataUpdate = function() {
                if (t.isFunc(a.ondataupdate)) {
                    var n = e();
                    n && a.ondataupdate({
                        data: t.clone(n, null),
                        idx: V.currentLength - 1,
                        left: L.DIMENSION.posX,
                        top: L.DIMENSION.H_MA4K
                    })
                }
            }
            ,
            this.onViewChanged = function() {
                t.isFunc(a.onviewchanged) && a.onviewchanged({
                    viewRangeState: t.clone(V, null)
                })
            }
            ,
            this.onInnerResize = function(e) {
                t.isFunc(a.oninnerresize) && a.oninnerresize(e)
            }
            ,
            this.onTechChanged = function(e) {
                t.isFunc(a.ontechchanged) && a.ontechchanged({
                    Indicator: e
                })
            }
            ,
            this.shortClickHandler = function() {
                t.isFunc(a.onshortclickmain) && a.onshortclickmain()
            }
        }
        , j = new function() {
            var e, n, i, o, s, r = 37, h = function(e, t, n) {
                var i = !1;
                isNaN(e) && (e = a.w || A.offsetWidth),
                isNaN(t) && (t = a.h || A.offsetHeight - a.mh);
                for (var o, s = O.clientHeight || 0, r = D.clientHeight || 0, l = L.DIMENSION.getOneWholeTH(), c = 0, h = D.childNodes, d = h.length, u = 0, p = h.length; p--; )
                    o = h[p],
                    o.id.indexOf("blankctn") >= 0 ? (c = o.offsetHeight,
                    d--,
                    u += c) : u += l;
                return !isNaN(n) && (r -= n),
                r / (t - s) > 1 && (r = u,
                i = !0),
                L.DIMENSION.setStageW(e),
                1 == $ ? d > 0 && (L.DIMENSION.setStageH(t, d * l + c + s),
                i = !0,
                $ = 0) : L.DIMENSION.setStageH(t, r + s),
                i
            }, d = function() {
                s && (s.style.display = L.custom.show_logo ? "" : "none")
            }, p = function() {
                F = new t.LoadingSign,
                F.appendto(C)
            }, m = function() {
                F.setPosition()
            }, f = function(e, n, a) {
                var o = h(n, a, 0 / 0);
                if (e || n && a) {
                    if (!I)
                        return;
                    I.onResize(o),
                    B.onResize()
                }
                i.style.left = "1px",
                i.style.top = L.DIMENSION.h_k + L.DIMENSION.H_MA4K + "px",
                d(),
                m(),
                t.stc("k_wh", [L.DIMENSION.getStageW(), L.DIMENSION.getStageH()])
            }, v = function() {
                A = l(a.domid) || a.dom,
                A || (A = c("div"),
                document.body.appendChild(A)),
                x = c("div"),
                x.style.position = "relative",
                x.style.outlineStyle = "none",
                x.style.webkitUserSelect = x.style.userSelect = x.style.MozUserSelect = "none",
                C = c("div", "mainarea_" + L.uid),
                R = c("div"),
                C.appendChild(R),
                H = c("div"),
                H.style.position = "absolute",
                H.style.fontSize = H.style.lineHeight = L.STYLE.FONT_SIZE + "px",
                H.style.width = "100%",
                C.appendChild(H),
                x.appendChild(C),
                D = c("div"),
                x.appendChild(D),
                O = c("div"),
                x.appendChild(O),
                e = new N({
                    width: r,
                    height: L.DIMENSION.H_TIME_PART
                }),
                n = e.g,
                i = e.canvas,
                i.style.position = "absolute",
                x.appendChild(i),
                A.appendChild(x)
            }, b = function(e) {
                var n = !1;
                if (e) {
                    E && (n = E.setTheme(e));
                    for (var a in e)
                        e.hasOwnProperty(a) && L.COLOR.hasOwnProperty(a) && L.COLOR[a] !== e[a] && (L.COLOR[a] = e[a],
                        n = !0);
                    t.stc("k_thm", e)
                }
                return n && w.styleLogo({
                    logo: s,
                    color: L.COLOR.LOGO
                }),
                n
            }, y = function(e) {
                !L.custom.mousewheel_zoom || document.activeElement !== x && document.activeElement.parentNode !== x || (I && I.onWheel(e),
                u.preventDefault(e),
                u.stopPropagation(e))
            }, k = function(e) {
                L.custom.keyboard && I && I.onKb(e)
            }, M = function() {
                t.xh5_deviceUtil.istd || (g.info.name.match(/firefox/i) ? u.addHandler(x, "DOMMouseScroll", y) : u.addHandler(x, "mousewheel", y),
                x.tabIndex = 0,
                u.addHandler(x, "keyup", k),
                u.addHandler(x, "keydown", k))
            }, S = function(e) {
                s = e,
                x.appendChild(e)
            };
            v(),
            p(),
            b(a.theme),
            f(),
            M(),
            w.getLogo({
                cb: S,
                id: L.PARAM.LOGO_ID,
                isShare: !1,
                top: L.DIMENSION.posY + L.DIMENSION.H_MA4K + 17,
                right: L.DIMENSION.RIGHT_W + L.DIMENSION.K_RIGHT_W,
                LOGO_W: L.DIMENSION.LOGO_W,
                LOGO_H: L.DIMENSION.LOGO_H,
                color: L.COLOR.LOGO
            }),
            g.noH5 && (q.showTip({
                txt: a.nohtml5info || _.nohtml5info,
                parent: x
            }),
            t.stc("k_nh5")),
            this.resizeAll = f,
            this.innerResize = function(e) {
                I && (h(0 / 0, 0 / 0, e),
                I.onResize(),
                B.onResize(),
                m(),
                Y.onInnerResize({
                    height: L.DIMENSION.h_k
                }))
            }
            ,
            this.initTheme = b,
            this.drawReMark = function(t) {
                if (t) {
                    if (i.style.display = "",
                    o == t)
                        return;
                    var a = L.DIMENSION.H_TIME_PART;
                    o = t,
                    e.resize({
                        width: r,
                        height: a,
                        hd: L.PARAM.getHd()
                    }),
                    n.font = "12px " + L.STYLE.FONT_FAMILY,
                    n.textBaseline = "top",
                    n.fillStyle = L.COLOR.REMARK_BG,
                    n.fillRect(0, 0, r, a),
                    n.fillStyle = L.COLOR.REMARK_T,
                    n.fillText(t, 0, 0)
                } else
                    i.style.display = "none"
            }
        }
        , B = new function() {
            var e, n, i, o, s = t.market(a.symbol), r = /^forex|^HF/.test(s), d = isNaN(a.nfloat) ? 2 : a.nfloat, u = 150, p = new function() {
                var t = function(t) {
                    var n = e.body.style;
                    t && L.custom.show_floater ? (n.backgroundColor = L.COLOR.F_BG,
                    n.color = L.COLOR.F_T,
                    n.border = "1px solid " + L.COLOR.F_BR,
                    n.display = "") : n.display = "none"
                };
                this.pv = function(n) {
                    var a = e.body.style
                      , i = Math.max(L.DIMENSION.posX, 55) + 9;
                    a.left = (n.x > L.DIMENSION.getStageW() >> 1 ? i : L.DIMENSION.getStageW() - u - 9) + "px",
                    a.top = (n.y || 0) + "px",
                    t(!0)
                }
                ,
                this.showFloater = t
            }
            , f = function() {
                function a() {
                    var e, n, a = "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;", i = "font-weight:normal;border:0;height:16px;text-align:center", o = "text-align:left;font-weight:normal;border:0;height:16px;padding:0", s = "text-align:right;border:0;height:16px;padding:0", h = c("div"), p = h.style;
                    p.position = "absolute",
                    p.zIndex = L.PARAM.I_Z_INDEX + 2,
                    p.padding = "2px",
                    p.width = u + "px",
                    p.lineHeight = "16px",
                    p.display = "none",
                    p.fontSize = "12px";
                    var f, v, g, b, N = c("table"), _ = c("thead"), w = c("tbody");
                    N.style.cssText = a,
                    f = c("tr"),
                    v = c("th"),
                    v.setAttribute("colspan", "2"),
                    v.style.cssText = i;
                    var k = c("span");
                    v.appendChild(k),
                    f.appendChild(v),
                    _.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.setAttribute("colspan", "2"),
                    v.style.cssText = i;
                    var M = c("span");
                    v.appendChild(M),
                    f.appendChild(v),
                    w.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u5f00\u76d8";
                    var S = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(S),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u6700\u9ad8";
                    var I = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(I),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u6700\u4f4e";
                    var A = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(A),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u6536\u76d8";
                    var x = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(x),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u6da8\u8dcc";
                    var C = c("span");
                    if (g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(C),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    !r) {
                        f = c("tr"),
                        v = c("th"),
                        v.style.cssText = o,
                        g = c("td"),
                        b = c("span"),
                        b.innerHTML = "\u6210\u4ea4";
                        var R = c("span");
                        g.style.cssText = s,
                        v.appendChild(b),
                        g.appendChild(R),
                        f.appendChild(v),
                        f.appendChild(g),
                        w.appendChild(f),
                        f = c("tr"),
                        v = c("th"),
                        v.style.cssText = o,
                        g = c("td"),
                        b = c("span"),
                        b.innerHTML = "\u6362\u624b";
                        var H = c("span");
                        g.style.cssText = s,
                        v.appendChild(b),
                        g.appendChild(H),
                        f.appendChild(v),
                        f.appendChild(g),
                        w.appendChild(f),
                        H.innerHTML = "--"
                    }
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u632f\u5e45";
                    var D = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(D),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u76d8\u540e\u91cf";
                    var O = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(O),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f.id = "__floatingPostVolume",
                    f.style.display = "none",
                    f = c("tr"),
                    v = c("th"),
                    v.style.cssText = o,
                    g = c("td"),
                    b = c("span"),
                    b.innerHTML = "\u76d8\u540e\u989d";
                    var K = c("span");
                    g.style.cssText = s,
                    v.appendChild(b),
                    g.appendChild(K),
                    f.appendChild(v),
                    f.appendChild(g),
                    w.appendChild(f),
                    f.id = "__floatingPostAmount",
                    f.style.display = "none",
                    O.innerHTML = K.innerHTML = "--",
                    N.appendChild(_),
                    N.appendChild(w),
                    N.style.width = "100%",
                    h.appendChild(N);
                    var T, U, E = function(e, t) {
                        var n = L.COLOR.F_N;
                        return e > t ? n = L.COLOR.F_RISE : t > e && (n = L.COLOR.F_FALL),
                        n
                    }, F = function(e, t) {
                        return t ? "(" + ((e - t) / Math.abs(t) * 100).toFixed(2) + "%)" : "(--%)"
                    };
                    this.setFloaterData = function(a) {
                        if (e = a.name || a.symbol || e || "",
                        k.innerHTML = e,
                        T = a.data || n) {
                            n = T,
                            U = a.stock || U;
                            var i = U.market
                              , o = "";
                            switch (i) {
                            case "CN":
                            case "OTC":
                            case "REPO":
                                o = t.isCNK(U.symbol) ? "\u80a1" : "\u624b";
                                break;
                            case "US":
                            case "HK":
                                o = "\u80a1";
                                break;
                            default:
                                o = ""
                            }
                            var s = T.percent
                              , c = T.open
                              , h = T.close
                              , u = T.high
                              , p = T.low
                              , f = h / (1 + s) || T.prevclose;
                            M.innerHTML = m.ds(T.date, "/") + "/" + m.nw(T.date.getDay()) + (T.time || "");
                            var v = 1 > f || 1 > u || 1 > p ? 4 : d;
                            S.innerHTML = c.toFixed(v) + F(c, f, v),
                            I.innerHTML = u.toFixed(v) + F(u, f, v),
                            A.innerHTML = p.toFixed(v) + F(p, f, v),
                            x.innerHTML = h.toFixed(v) + F(h, f, v),
                            s = isNaN(s) || !isFinite(s) ? "--" : (100 * s).toFixed(2),
                            C.innerHTML = T.change.toFixed(v) + "(" + s + "%)";
                            var g = isNaN(T.ampP) ? "--" : (100 * T.ampP).toFixed(2);
                            if (T.ampP === 1 / 0 && (g = "--"),
                            D.innerHTML = T.amplitude.toFixed(v) + "(" + g + "%)",
                            C.style.color = E(s, 0),
                            S.style.color = E(c, f),
                            I.style.color = E(u, f),
                            A.style.color = E(p, f),
                            x.style.color = E(h, f),
                            r || (R.innerHTML = y(T.volume, 2) + o),
                            H && U) {
                                var b = U.extraDataObj.rsAmount;
                                if (b) {
                                    for (var N, _ = 0, w = b.length; w > _; _++)
                                        if (T.date >= b[_].date) {
                                            N = b[_].amount;
                                            break
                                        }
                                    U.hq && U.hq.isKCB && N && (N *= 100),
                                    N && (H.innerHTML = (T.volume / N).toFixed(2) + "%")
                                } else
                                    H.innerHTML = "--"
                            }
                            24 === V.viewId || 23 === V.viewId || 25 === V.viewId ? U.hq && U.hq.isKCB && (l("__floatingPostVolume").style.display = "table-row",
                            l("__floatingPostAmount").style.display = "table-row",
                            T.postVol ? (O.innerHTML = y(T.postVol, 0) + o,
                            K.innerHTML = y(T.postAmt, 2)) : (K.innerHTML = "--",
                            O.innerHTML = "--")) : (l("__floatingPostVolume").style.display = "none",
                            l("__floatingPostAmount").style.display = "none")
                        }
                    }
                    ,
                    this.body = h,
                    this.reset = function() {
                        e = null,
                        n = null
                    }
                }
                n = new a,
                e = n
            }, v = function() {
                function e(e) {
                    var t = c("div")
                      , n = c("div")
                      , a = c("span")
                      , i = 12
                      , o = e.isH
                      , s = function() {
                        if (n.style.borderStyle = "dashed",
                        n.style.borderColor = L.COLOR.IVH_LINE,
                        a.style.backgroundColor = L.COLOR[e.txtBgCN],
                        a.style.color = L.COLOR[e.txtCN],
                        o)
                            n.style.borderWidth = "1px 0 0 0",
                            t.style.width = n.style.width = L.DIMENSION.getStageW() + "px",
                            a.style.top = -(.6 * L.STYLE.FONT_SIZE) + "px",
                            a.style.width = L.DIMENSION.extend_draw ? "" : L.DIMENSION.posX + "px",
                            a.style.left = 0,
                            a.style.padding = "1px 0";
                        else {
                            n.style.borderWidth = "0 1px 0 0";
                            var i, s, r = L.DIMENSION.H_MA4K + L.DIMENSION.H_T_B;
                            L.DIMENSION.getStageH() < 0 ? (i = D.clientHeight,
                            s = i - r) : (i = L.DIMENSION.getStageH() - O.clientHeight || 0,
                            s = L.DIMENSION.h_k),
                            i -= r,
                            i += L.DIMENSION.I_V_O,
                            t.style.height = n.style.height = i + "px",
                            a.style.top = s + "px",
                            a.style.padding = "2px 2px 1px"
                        }
                    };
                    t.style.position = "absolute",
                    t.style.zIndex = L.PARAM.I_Z_INDEX - 2,
                    a.style.position = n.style.position = "absolute",
                    n.style.zIndex = 0,
                    a.style.zIndex = 1,
                    a.style.font = L.STYLE.FONT_SIZE + "px " + L.STYLE.FONT_FAMILY,
                    a.style.whiteSpace = "nowrap",
                    a.style.lineHeight = i + "px",
                    e.txtA && (a.style.textAlign = e.txtA),
                    s(),
                    t.appendChild(a),
                    t.appendChild(n);
                    var r = function(e) {
                        e ? "" != t.style.display && (t.style.display = "") : "none" != t.style.display && (t.style.display = "none")
                    };
                    this.pv = function(e) {
                        if (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"),
                        a.innerHTML = e.v || "",
                        !isNaN(e.x)) {
                            e.x < 0 && (e.x = 0);
                            var n = e.x + (e.ox || 0)
                              , i = L.DIMENSION.getStageW();
                            n = ~~(n + .5),
                            n -= 1,
                            t.style.left = n + "px";
                            var o = a.offsetWidth || 66
                              , s = o >> 1;
                            e.x < s ? s = e.x : n + s > i && (s = n + o - i),
                            a.style.left = -s + "px"
                        }
                        r(!0)
                    }
                    ,
                    this.display = r,
                    this.body = t,
                    this.resize = s,
                    r(!1)
                }
                i = new e({
                    isH: !0,
                    txtCN: "P_TC",
                    txtBgCN: "P_BG",
                    txtA: "right"
                }),
                o = new e({
                    isH: !1,
                    txtCN: "T_TC",
                    txtBgCN: "T_BG",
                    txtA: "center"
                }),
                x.appendChild(o.body)
            }, g = function() {
                i.display(!1),
                o.display(!1),
                p.showFloater(!1)
            }, b = function(e) {
                T && T.indirectI(e),
                U && U.indirectI(e)
            }, N = !1, w = !1, k = 0 / 0, M = !1;
            this.getInteractiveIdx = function() {
                return k
            }
            ,
            this.isIng = function() {
                return N
            }
            ,
            this.isMoving = function() {
                return M
            }
            ;
            var A = 0 / 0
              , R = 0 / 0
              , H = [];
            this.iToD = function(t, n, a) {
                if (!t.e || !w) {
                    var s = t.x
                      , r = t.ox || 0
                      , l = t.y
                      , c = t.oy || 0
                      , h = t.e ? t.e.target : null;
                    if (!a) {
                        if (A == s && R == l)
                            return;
                        A = s,
                        R = l
                    }
                    if (h) {
                        var u = h.style.height.split("px")[0];
                        (0 > l || l > u) && (s = 0 / 0,
                        l = 0 / 0)
                    }
                    var m = V.currentLength
                      , f = Math.max(m, L.PARAM.minCandleNum);
                    s += L.DIMENSION.w_k / f - z.x;
                    var v = Math.floor(s * f / L.DIMENSION.w_k);
                    if (0 > v ? v = 0 : v >= m && (v = m - 1),
                    !isNaN(v) && (k = v),
                    isNaN(s) && isNaN(l))
                        return N = !1,
                        g(),
                        b(Number.MAX_VALUE),
                        void Y.onViewPrice();
                    N = V.end != V.dataLength ? !0 : m - 1 > v;
                    for (var y, M, x, C, D, O, K, T = Number(t.mark); H.length; )
                        H.length--;
                    if (n) {
                        var U = I.getAllStock()
                          , E = U.length
                          , F = E > 1 || "percent" == L.datas.scaleType;
                        L.custom.k_overlay && (F = !1);
                        for (var P, $, q, j, B = Number.MAX_VALUE, W = 0; E > W; W++)
                            q = U[W],
                            D = q.datas,
                            !D || D.length <= v || (P = q.getName(),
                            $ = D[v],
                            H.push({
                                name: P,
                                data: $,
                                rangedata: D,
                                symbol: q.symbol,
                                color: q.getLineStyle().linecolor
                            }),
                            $.isFake || (j = Math.abs($.cy - l),
                            B > j && (B = j,
                            C = q,
                            x = $,
                            K = D,
                            M = P,
                            y = C.symbol)));
                        if (F)
                            O = 100 * T,
                            O = Math.abs(O) > 999 ? Math.floor(O) : O.toFixed(2),
                            O += "%";
                        else if (O = T > 99999 ? Math.floor(T) : T.toFixed(T > 9999 ? 1 : d),
                        L.custom.show_k_rangepercent && C) {
                            var G = (T - C.prevclose) / C.prevclose * 100;
                            G = isNaN(G) || !isFinite(G) ? "--" : G.toFixed(d),
                            O += "<br/>" + G + "%"
                        }
                    } else {
                        if (C = I.getMainStock(),
                        D = C.datas,
                        !D || D.length <= v)
                            return;
                        x = D[v],
                        K = D,
                        M = C.getName(),
                        y = C.symbol;
                        var X = Math.abs(T);
                        O = X > 99999 ? Math.floor(T) : T.toFixed(X > 9999 ? 1 : d),
                        H.push({
                            name: M,
                            data: x,
                            rangedata: K,
                            symbol: y,
                            color: C.getLineStyle().linecolor
                        })
                    }
                    if (x) {
                        var Z = s;
                        L.custom.stick && (s = x.ix || s),
                        e && (e.setFloaterData({
                            symbol: y,
                            name: M,
                            data: x,
                            stock: C,
                            arr: H
                        }),
                        p.pv({
                            x: Z,
                            y: L.DIMENSION.K_F_T
                        })),
                        i.pv({
                            y: l,
                            v: O,
                            oy: c
                        }),
                        o.pv({
                            x: s,
                            ox: r,
                            y: L.DIMENSION.H_MA4K,
                            v: x.day + " " + (x.time || "")
                        }),
                        b(v),
                        !M && (M = y || "--"),
                        Y.onViewPrice(x, v, H, K, M, !0),
                        S.re(_.e.I_EVT, t.e)
                    }
                }
            }
            ;
            var K, E, F;
            this.iToKb = function(e, t) {
                if (t)
                    return void (w = !1);
                if (w = !0,
                k += e,
                !h(C, B.iHLineO.body) && C.appendChild(B.iHLineO.body),
                K = I.getMainStock(),
                F = K.getName(),
                E = K.datas,
                !E)
                    return void 0;
                if (0 > k)
                    return k = 0,
                    -1;
                if (k >= E.length)
                    return k = E.length - 1,
                    1;
                var n = E[k];
                if (!n)
                    return void 0;
                var a = {
                    mark: K.labelMaxP - n.cy / L.DIMENSION.h_k * (K.labelMaxP - K.labelMinP),
                    x: n.ix,
                    y: n.cy,
                    oy: L.DIMENSION.H_MA4K,
                    ox: L.DIMENSION.posX
                };
                return void this.iToD(a, !0, !0)
            }
            ;
            var P;
            this.globalDragHandler = function(e, t, n, a, i) {
                if (isNaN(e) && isNaN(t))
                    return P = 0 / 0,
                    M = !1,
                    void S.re(_.e.I_EVT, i);
                g();
                var o = V.start
                  , s = V.end
                  , r = s - o;
                isNaN(P) && (P = e);
                var l = t - P
                  , c = V.dataLength
                  , h = L.DIMENSION.w_k / r;
                if (Math.abs(l) < h) {
                    if (L.custom.smooth && h > 4) {
                        if (s >= c && 0 > l)
                            return;
                        if (1 > o && l > 0)
                            return;
                        z.x = l,
                        I.callSdDraw()
                    }
                } else {
                    P = t;
                    var d = Math.round(l * r / L.DIMENSION.w_k);
                    o -= d,
                    s -= d,
                    s >= c && (s = c,
                    o = s - r),
                    0 > o && (o = 0,
                    s = r),
                    (V.start != o || V.end != s) && (z.resetX(0),
                    V.movY = a - n,
                    I.moving(o, s, !0),
                    M = !0)
                }
            }
            ,
            this.shortClickHandler = function() {
                Y.shortClickHandler()
            }
            ,
            this.zoomView = function(e, t) {
                var n = -Number(e);
                0 == n && (n = 1);
                var a = V.start
                  , i = V.end
                  , o = n * Math.ceil((i - a) / L.PARAM.zoomUnit);
                if (Math.abs(o) > L.PARAM.zoomLimit && (o = n * L.PARAM.zoomLimit),
                L.custom.centerZoom) {
                    var s = Math.min.apply(Math, t)
                      , r = s / L.DIMENSION.w_k
                      , l = Math.max.apply(Math, t)
                      , c = l / L.DIMENSION.w_k;
                    r < L.PARAM.zoomArea ? i = Math.min(i - o * Math.abs(o), V.dataLength) : c > 1 - L.PARAM.zoomArea ? a = Math.max(a + o * Math.abs(o), 0) : (a = Math.max(a + o * Math.abs(o), 0),
                    i = Math.min(i - o * Math.abs(o), V.dataLength))
                } else
                    a = Math.max(a + o * Math.abs(o), 0);
                I.moving(a, i)
            }
            ,
            f(),
            v(),
            this.onResize = function() {
                i.resize(),
                o.resize()
            }
            ,
            this.iHLineO = i,
            this.hideIUis = g,
            this.update = function() {
                N || (b(Number.MAX_VALUE),
                e && e.setFloaterData({}))
            }
            ,
            this.iReset = function() {
                e.reset && e.reset()
            }
            ,
            this.patcher = new function() {
                var a, i = {}, o = function() {
                    if (a) {
                        e.body.parentNode && e.body.parentNode.removeChild(e.body);
                        var t = "vid_" + V.viewId;
                        if (a[t]) {
                            var o;
                            o = i[t] ? i[t] : i[t] = new a[t],
                            e = o
                        } else
                            e = n
                    } else
                        e = n;
                    !h(x, e.body) && x.appendChild(e.body)
                };
                this.customFloater = function(e) {
                    a = e,
                    o(),
                    t.stc("k_fl", e)
                }
                ,
                this.switchFloater = o
            }
        }
        ;
        I = new M;
        var W = new function() {
            var e = this;
            this.resize = function(e, t) {
                j.resizeAll(!0, e, t)
            }
            ;
            var n, a = function(n, a) {
                if (L.hasOwnProperty(n)) {
                    for (var i in a)
                        if (a.hasOwnProperty(i) && t.isFunc(a[i]))
                            return;
                    "DIMENSION" == n && ($ = 1),
                    p(L[n], a),
                    t.stc(n, a),
                    e.resize()
                }
            }, i = function(e, n) {
                var a;
                if (L.hasOwnProperty(e)) {
                    a = t.clone(L[e], null);
                    for (var i in a)
                        if (a.hasOwnProperty(i))
                            if (t.isFunc(a[i]))
                                a[i] = null,
                                delete a[i];
                            else if (n)
                                for (var o = n.length; o--; )
                                    typeof a[i] === n[o] && (a[i] = null,
                                    delete a[i])
                }
                return a
            }, o = function(e, t, n) {
                n = p({
                    toremove: !1,
                    isexclusive: !1,
                    callback: void 0,
                    addon: !1
                }, n || {}),
                n.toremove ? I.mM.removeAC(t, e) : n.isexclusive ? (I.mM.removeAC(null, e),
                I.mM.newAC(t, e, n)) : I.mM.newAC(t, e, n)
            };
            this.setLineStyle = function(e, a) {
                a || (n = e),
                I.setLineStyle(e),
                t.stc("k_style", e)
            }
            ,
            this.showScale = function(e) {
                I.setScale(e),
                t.stc("k_scale", e)
            }
            ,
            this.pushData = function(e, n) {
                !t.isArr(e) && (e = [e]),
                I.pushData(e, n)
            }
            ;
            var s, r, c = [], h = function() {
                if (c.length) {
                    var e = c.shift();
                    I.pushData([e], 1)
                } else
                    clearInterval(r)
            }, d = function() {
                r = setInterval(h, 1)
            };
            this.pushTr = function(e) {
                if (e && e.data) {
                    for (var t, n = e.data.split(","), a = e.symbol, i = e.market, o = 0, r = n.length; r > o; o++)
                        t = {
                            symbol: a,
                            data: n[o],
                            market: i
                        },
                        c.push(t);
                    clearTimeout(s),
                    s = setTimeout(d, 20)
                }
            }
            ,
            this.hide = function(e) {
                P = !0,
                B.hideIUis(),
                t.$CONTAINS(A, x) && A.removeChild(x),
                e && I.dcReset()
            }
            ,
            this.show = function(e) {
                P = !1,
                e && (t.isStr(e) && (e = l(e)),
                A = e),
                t.$CONTAINS(A, x) || (A.appendChild(x),
                j.resizeAll(!0)),
                I.outputNewRange(!0),
                Y.onViewPrice()
            }
            ;
            var u = 0
              , m = !1
              , f = function(e) {
                var t;
                switch (e) {
                case 1:
                    t = "\u540e\u590d\u6743";
                    break;
                case -1:
                    t = "\u524d\u590d\u6743"
                }
                j.drawReMark(t)
            }
              , v = []
              , g = []
              , y = function() {
                for (; v.length; ) {
                    var e = v.pop();
                    g.length--,
                    I.compare(e)
                }
            }
              , N = function() {
                for (var e, t = I.getMainStock().symbol, n = I.getMainStock().market, a = I.getAllStock(), i = a.length; i--; ) {
                    e = a[i];
                    var o = e.symbol;
                    if (o != t) {
                        var s = e.market;
                        s != n && ("US" == s || "US" == n || "HK" == s || "HK" == n || "OTC" == s || "OTC" == n || "option_cn" == s || "option_cn" == n) && (v.push(e),
                        g.push(o))
                    }
                }
                g.length && I.removeCompare(g, !0)
            }
              , w = function() {
                m = !1,
                e.setLineStyle(void 0, !0),
                e.showScale(void 0),
                I.mM.togglePt({
                    v: !0,
                    ytd: !0
                })
            }
              , k = function(e) {
                "mink" == _.URLHASH.gt(e).type ? (V.viewId = e,
                f(),
                N()) : (e += u,
                V.viewId = e,
                f(u),
                y())
            }
              , M = new function() {
                this.isClMode = !1,
                this.exitClMode = function() {
                    this.isClMode = !1,
                    e.setLineStyle(n, !0),
                    I.mM.togglePt({
                        v: !0,
                        ytd: !0
                    })
                }
                ,
                this.enterClMode = function() {
                    this.isClMode = !0;
                    var t = n && "mountain" == n.linetype ? "mountain" : "line";
                    e.setLineStyle({
                        linetype: t,
                        linecolor: {
                            K_CL: L.COLOR.T_P
                        }
                    }, !0),
                    I.mM.togglePt({
                        v: !1,
                        ytd: !0
                    })
                }
            }
              , C = !0;
            this.showView = function(e, n, a) {
                B.hideIUis(),
                C ? setTimeout(function() {
                    C = !1
                }, 99) : F.hide();
                var i = t.isNum(e) ? _.URLHASH.vn(e) : _.URLHASH.vi(e);
                if (i) {
                    if (m && w(),
                    i == _.URLHASH.KCL)
                        M.enterClMode();
                    else {
                        M.isClMode && M.exitClMode();
                        var o = I.getAllStock()
                          , s = o && o.length > 1;
                        s && I.mM.togglePt({
                            v: !1
                        })
                    }
                    k(i),
                    I.onChangeView(!1, n),
                    t.stc("k_v", e),
                    !a && t.suda("vw", e)
                }
            }
            ;
            var R = !1;
            this.showYTD = function(e, n) {
                R = !!e,
                B.hideIUis(),
                m || (m = !0,
                this.setLineStyle({
                    linetype: "line",
                    linecolor: {
                        K_CL: L.COLOR.T_P
                    }
                }, !0),
                !R && this.showScale("percent"),
                I.mM.togglePt({
                    v: !1,
                    ytd: !0
                })),
                f(u),
                I.showYTD(u, R),
                t.stc("k_v", _.URLHASH.NYTD),
                !n && t.suda("vw", _.URLHASH.NYTD)
            }
            ,
            this.showYear = function() {
                this.showYTD(!0)
            }
            ,
            this.setReK = function(e) {
                if (e = parseInt(e),
                !(isNaN(e) || Math.abs(e) > 1)) {
                    u = e;
                    var n = _.URLHASH.gt(V.viewId);
                    t.stc("k_re", e);
                    var a = e;
                    "-1" == a && (a = "_1"),
                    t.suda("k_re", "k_re" + a),
                    "mink" != n.type && (m ? this.showYTD(R, !0) : this.showView(n.baseid, void 0, !0))
                }
            }
            ;
            var H = function(e) {
                var n;
                return n = t.isStr(e) ? e.split(",") : [e.symbol]
            };
            this.compare = function(e, n) {
                if (n) {
                    for (var a = H(e), i = a.length; i--; )
                        for (var o = g.length; o--; )
                            if (a[i] == g[o]) {
                                g.splice(o, 1),
                                v.splice(o, 1);
                                break
                            }
                    I.removeCompare(H(e))
                } else
                    I.compare(e),
                    t.suda("k_comp");
                t.stc("k_comp", {
                    rm: n,
                    o: e
                })
            }
            ;
            var D = 0;
            this.tCharts = function(e, n) {
                o("tech", e, n),
                n && !n.noLog && (0 == D ? D = 1 : t.sudaLog())
            }
            ;
            var O = 0;
            this.pCharts = function(e, n) {
                o("price", e, n),
                n && !n.noLog && (0 == O ? O = 1 : t.sudaLog())
            }
            ,
            this.showPCharts = function(e) {
                e && (I.mM.togglePt(e),
                t.stc("k_sp", e))
            }
            ,
            this.getIndicators = function() {
                var e = T ? T.getLog() : null
                  , t = U ? U.getLog() : null;
                return {
                    tCharts: e,
                    pCharts: t
                }
            }
            ,
            this.getIndicatorData = function() {
                var e = T ? T.getExistingCharts() : null
                  , t = U ? U.getExistingCharts() : null;
                return {
                    tCharts: e,
                    pCharts: t
                }
            }
            ;
            var z;
            this.showRangeSelector = function(e) {
                z = p({
                    display: !0,
                    from: void 0,
                    to: void 0
                }, e || {}),
                I.mM.showRs(z),
                t.stc("k_rs", e)
            }
            ,
            this.dateFromTo = function(e, n, a) {
                E && (E.dateFromTo(e, n, a),
                t.stc("k_ft", [e, n, a]))
            }
            ,
            this.setCustom = b(a, this, "custom"),
            this.setTheme = function(e) {
                var t = j.initTheme(e);
                t && (this.setLineStyle({
                    linecolor: e
                }),
                this.resize())
            }
            ,
            this.setDimension = b(a, this, "DIMENSION"),
            this.getDimension = b(i, null, "DIMENSION", ["boolean"]),
            this.newSymbol = function(e) {
                if (B.hideIUis(),
                B.iReset(),
                I.dcReset(),
                I.dcInit(e),
                q.hideTip(),
                T) {
                    var n = T.getLog();
                    T = null,
                    n && this.tCharts(n)
                }
                if (U) {
                    var a = U.getLog();
                    U = null,
                    a && this.pCharts(a)
                }
                z && (z.from = void 0,
                z.to = void 0,
                I.mM.showRs(z)),
                I.h5tM.resetHisT(),
                t.stc("k_ns", e)
            }
            ,
            this.toggleExtend = function() {
                var e = L.DIMENSION.extend_draw
                  , t = L.DIMENSION.posX;
                a.call(this, "DIMENSION", {
                    extend_draw: !e,
                    posX: t > 9 ? 7 : 55
                }),
                this.resize()
            }
            ,
            this.shareTo = function(e) {
                I.shareTo(e),
                t.stc("k_share", e);
                var n = e && e.type ? e.type : "weibo";
                t.suda("share", n)
            }
            ,
            this.getChartId = function() {
                return L.uid
            }
            ,
            this.getSymbols = function() {
                return I.getAllSymbols()
            }
            ,
            this.patcher = {
                iMgr: B.patcher
            },
            this.getExtraData = function(e) {
                return I.getExtraData(e)
            }
            ,
            this.getCurrentData = function() {
                var e = K.get(V.viewId);
                return e && (e = e[e.length - 1]),
                t.clone(e, null)
            }
            ,
            this.getCurrentRange = function() {
                for (var e, t, n, a = [], i = I.getAllStock(), o = 0, s = i.length; s > o; o++)
                    n = i[o],
                    t = n.getName(),
                    e = n.datas,
                    a.push({
                        name: t,
                        rangedata: e,
                        symbol: n.symbol
                    });
                return a
            }
            ,
            this.zoom = function(e) {
                I.zoomApi(e),
                t.stc("k_zoom", e, 9e3)
            }
            ,
            this.rangeMove = function(e, t) {
                I.moving(e, t)
            }
            ,
            this.move = function(e) {
                e = parseInt(e),
                isNaN(e) || (I.moveApi(e),
                t.stc("k_move", e, 9e3))
            }
            ,
            this.update = function() {
                I.updateDataAll(),
                t.stc("k_up", 9e3)
            }
            ,
            this.type = "h5k",
            this.me = S
        }
        ;
        return I.dcInit(a),
        W
    }
    function i() {
        this.get = function(e, n) {
            t.stc("h5k_get");
            var i = new a(e);
            t.isFunc(n) && n(i),
            t.suda("h5k_" + t.market(e.symbol))
        }
        ,
        this.dual = function(e, n) {
            t.stc("h5k_dual"),
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
                })
            };
            i.me.al(_.e.K_DATA_LOADED, o, !1),
            t.isFunc(n) && n(i),
            t.suda("dual_" + t.market(e.symbol))
        }
        ,
        this.tick = function(e, n) {
            t.stc("h5k_tick"),
            e.pcm = 1,
            e.view = _.URLHASH.NKMS,
            e.rate = 600,
            e.linetype = "line";
            var i = new a(e,!0);
            t.isFunc(n) && n(i),
            KKE.api("patch.atick.customfloater", {
                chart: i
            }, function(e) {
                i.patcher.iMgr.customFloater(e)
            }),
            i.setCustom({
                smooth: !1
            }),
            t.suda("tick_" + t.market(e.symbol))
        }
    }
    var o, s, r, l = t.$DOM, c = t.$C, h = t.$CONTAINS, d = t.xh5_PosUtil, u = t.xh5_EvtUtil, p = t.oc, m = t.dateUtil, f = m.stbd, v = t.xh5_ADJUST_HIGH_LOW.c, g = t.xh5_BrowserUtil, b = t.fBind, y = t.strUtil.ps, N = n.xh5_Canvas, _ = e.globalCfg, w = t.logoM;
    return t.fInherit(a, t.xh5_EvtDispatcher),
    i
});
;
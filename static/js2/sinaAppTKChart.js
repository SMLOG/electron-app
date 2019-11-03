xh5_define("plugins.sinaAppTKChart", ["utils.util"], function(t) {
    "use strict";
    function e() {
        var t = navigator.userAgent.toLowerCase();
        return t.indexOf("android") > 0 ? /ucbrowser|huawei|honor|samsung|sm-/.test(t) : 0
    }
    function i(t) {
        t.stopPropagation()
    }
    function a(t) {
        t.preventDefault(),
        t.stopPropagation()
    }
    function r(t) {
        return document.createElement(t)
    }
    function n(t, e) {
        e = e || "block";
        var i = t.style;
        t && (i.display = "none" === i.display ? e : "none")
    }
    function h(t) {
        t.style.display = "none"
    }
    function o(t) {
        var e, i = "undefined" == typeof getComputedStyle ? t.currentStyle : getComputedStyle(t);
        return i.height ? (e = parseFloat(i.width),
        "content-box" === i.boxSizing && (e = e + parseFloat(i.paddingLeft) + parseFloat(i.paddingRight) + parseFloat(i.borderLeftWidth) + parseFloat(i.borderRightWidth))) : e = t.clientWidth || parseFloat(t.style.width),
        0 | e
    }
    function s(t) {
        var e, i = "undefined" == typeof getComputedStyle ? t.currentStyle : getComputedStyle(t);
        return i.height ? (e = parseFloat(i.height),
        "content-box" === i.boxSizing && (e = e + parseFloat(i.paddingTop) + parseFloat(i.paddingBottom) + parseFloat(i.borderTopWidth) + parseFloat(i.borderBottomWidth))) : e = t.clientHeight || parseFloat(t.style.height),
        0 | e
    }
    function l(t) {
        return null === t ? "Null" : void 0 === t ? "Undefined" : X.call(t).slice(8, -1)
    }
    function c(t, e, i) {
        if (!e)
            return t;
        t || (t = {});
        for (var a in e)
            e.hasOwnProperty(a) && ("Object" === l(e[a]) ? (!t[a] && (t[a] = {}),
            c(t[a], e[a], i)) : !i && a in t || (t[a] = e[a]));
        return t
    }
    function p(t, e) {
        if (t = Number(t),
        isNaN(t))
            return "-";
        var i = Math.abs(t);
        return 1e5 > i ? t.toFixed(0) : 1e7 > i ? (t / 1e4).toFixed(e) + "\u4e07" : 1e8 > i ? (t / 1e7).toFixed(e) + "\u5343\u4e07" : (t / 1e8).toFixed(e) + "\u4ebf"
    }
    function d(t) {
        return "forex" == H(t) && (t = t.slice(-6)),
        "BTC" == H(t) && (t = t.replace("btc_btc", "")),
        t = t.split("_"),
        t = t[t.length - 1].toUpperCase()
    }
    function m(t) {
        return /^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(t)
    }
    function u(t, e, i) {
        t = "prototype"in t ? t.prototype : t,
        e = "prototype"in e ? e.prototype : e;
        for (var a in e)
            e.hasOwnProperty(a) && (i ? null != e[a] : null == t[a]) && (t[a] = e[a]);
        return t
    }
    function f(t) {
        switch (t) {
        case "t1":
        case "t5":
            return "tChart";
        case "repay":
            return "repayChart";
        case "predict":
            return "predictChart";
        case "networth":
            return "netWorthChart";
        default:
            return "kChart"
        }
    }
    function y(t, e, i) {
        var a = document.createElement("ul")
          , r = e.more
          , n = r.length;
        c(a.style, e.subNavStyle, !0),
        a.style.display = "none";
        for (var h = 0, o = 0; n > h; h++) {
            var s = document.createElement("li");
            a.appendChild(s),
            c(s.style, e.subNavItemStyle, !0),
            "app" != r[h] || j ? s.innerHTML = e.viewMap[r[h]] : (i.more[o] && (s.innerHTML = i.more[o].name,
            s.setAttribute(e.attributeDj, i.more[o].v)),
            o++),
            s.setAttribute("type", "subNav"),
            s.setAttribute(e.attributeName, r[h])
        }
        t.appendChild(a)
    }
    function k(t, e, i, a) {
        var r = document.createElement("ul")
          , o = e.list
          , s = o.length;
        t.appendChild(r),
        r.style.display = "none",
        c(r.style, e.navTopStyle, !0);
        for (var l = 0, p = 0; s > l; l++) {
            var d = document.createElement("li");
            r.appendChild(d),
            c(d.style, e.navItemStyle, !0),
            "app" !== o[l] || j ? d.innerHTML = e.viewMap[o[l]] : (i.tabs[p] ? (d.innerHTML = i.tabs[p].name || "B/S\u70b9",
            d.setAttribute(e.attributeDj, i.tabs[p].v)) : d.innerHTML = i.tabName[p] || "B/S\u70b9",
            p++),
            d.setAttribute("type", "nav"),
            "more" === o[l] ? (y(d, e, i),
            a.moreView = d,
            d.addEventListener("click", function() {
                n(this.querySelector("ul"))
            })) : (d.setAttribute(e.attributeName, o[l]),
            d.addEventListener("click", function() {
                for (var e = t.querySelectorAll("li>ul"), i = e.length; i--; )
                    h(e[i])
            }))
        }
        return r
    }
    function C(t, e) {
        this.parent = t,
        this.param = e,
        this._init()
    }
    function v(t, e, i) {
        var a = t.getAttribute("type");
        "nav" == a ? c(t.style, e, !0) : "subNav" == a && c(t.style, i, !0)
    }
    function b(t) {
        var e = {
            t1: "touzi_wap_v2_hq_04",
            t5: "touzi_wap_v2_hq_05",
            kcl: "touzi_wap_v2_hq_06",
            dk: "touzi_wap_v2_hq_07",
            kd: "touzi_wap_v2_hq_08",
            kw: "touzi_wap_v2_hq_09",
            km: "touzi_wap_v2_hq_10",
            k5: "touzi_wap_v2_hq_11",
            k15: "touzi_wap_v2_hq_12",
            k30: "touzi_wap_v2_hq_13",
            k60: "touzi_wap_v2_hq_14"
        };
        e[t] && V(e[t], null, "touzi_wap_v2_hq")
    }
    function w(t, e, i) {
        return t + ': <span style="color: ' + i + '">' + e + "</span>"
    }
    function S(t) {
        return -1 == ["HF", "forex_yt", "forex"].indexOf(t)
    }
    function g(t, e) {
        this.parent = t,
        this.param = e,
        this._init(),
        this.simple(!0)
    }
    function x(t, e) {
        if ("LI" == t.target.nodeName) {
            for (var i = t.target, a = this.querySelectorAll("li"), r = a.length; r--; )
                c(a[r].style, e.itemNormalStyle, !0),
                a[r].setAttribute("selected", "false");
            c(i.style, e.itemActiveStyle, !0),
            i.setAttribute("selected", "true")
        }
    }
    function _(t, e) {
        this.parent = t,
        this.param = e,
        this._init(),
        this.isShow = !0,
        this.hide()
    }
    function A(t, e) {
        this.parent = t,
        this.param = e,
        this._init()
    }
    function I(t, e) {
        var i = !1
          , a = H(t);
        switch (a) {
        case "BTC":
        case "forex":
        case "forex_yt":
            e.on("viewChange", function(a) {
                if (e.kChart)
                    if ("k1" === a) {
                        if (e.kChart.setLineStyle({
                            linetype: "line"
                        }),
                        !i) {
                            var r = new Date
                              , n = 60 * r.getTimezoneOffset() * 1e3;
                            r.setTime(r.getTime() + n),
                            r.setHours(r.getHours() + 4),
                            e.kChart.dateFromTo(r, new Date(99999,9,9)),
                            KKE.api("patch.forex.newhqtime", {
                                symbol: t,
                                timeSymbol: "sys_time",
                                interval: 30,
                                offset: 30
                            }, function(i) {
                                i && e.kChart.pushData({
                                    symbol: t,
                                    data: i
                                })
                            }),
                            i = !0,
                            e.hideKTechM("MA")
                        }
                    } else
                        e.kChart.setLineStyle({
                            linetype: "solid"
                        })
            })
        }
    }
    function L(t, e) {
        this.parent = t,
        this.param = e;
        var i = r("div")
          , n = i.style;
        c(n, e.style, !0);
        var h = r("div")
          , o = h.style;
        c(o, e.zoomInStyle, !0),
        h.addEventListener("click", function(e) {
            t.chart.chart.zoom(!0),
            a(e)
        }),
        i.appendChild(h);
        var s = r("div")
          , l = s.style;
        c(l, e.zoomOutStyle, !0),
        s.addEventListener("click", function(e) {
            t.chart.chart.zoom(!1),
            a(e),
            M(t, "zoom")
        }),
        i.appendChild(s),
        this.dom = i,
        t.param.wrap.dom.appendChild(i)
    }
    function D(t, e) {
        this.parent = t,
        this.param = e;
        var i = r("div")
          , a = i.style;
        c(a, e.closeBoxStyle, !0);
        var n = r("div")
          , h = n.style;
        c(h, e.closeStyle, !0),
        n.addEventListener("click", function() {
            window.h5chart.closeClickChart()
        }),
        i.appendChild(n),
        this.dom = i,
        t.param.wrap.dom.appendChild(i)
    }
    function T(t, e) {
        this.parent = t,
        this.param = e;
        var i = r("div")
          , a = r("div")
          , n = i.style
          , h = a.style;
        c(n, e.style, !0),
        n.width = t._calcChartWidth() + "px",
        n.height = t._calcChartHeight() + "px",
        h.width = "100%",
        h.height = "100%",
        h.position = "absolute",
        h.background = "rgba(0,0,0)",
        h.zIndex = "999",
        h.top = 0,
        this.maskDom = a,
        this.parent.chart.dom.appendChild(a)
    }
    function N(t, e) {
        this.parent = t,
        this.param = e,
        this.bag = "http://file.finance.sina.com.cn/finapp/apks/sinafinance_h5chart.apk";
        var i = {
            eventid: e.key || "universal_callup",
            subname: e.value || "chart_CN_bs",
            uatrackKey: e.key || "universal_callup",
            androidInstallUrl: e.apk || this.bag,
            needOpenSource: !1
        };
        this.sfc = null,
        "undefined" != typeof SinaFinanceCallUp && (this.sfc = new SinaFinanceCallUp.CallUpSinaFinance(i))
    }
    function B(t, e) {
        this.parent = t,
        this.param = e;
        var i = this
          , n = r("div")
          , h = n.style;
        c(h, e.style, !0);
        var o, s = {
            eventid: "callup_zhengu",
            subname: "fromWapHq",
            uatrackKey: "callup_zhengu",
            needOpenSource: !1
        };
        "undefined" != typeof SinaFinanceCallUp && (o = new SinaFinanceCallUp.CallUpSinaFinance(s)),
        n.addEventListener("click", function(t) {
            var e = "http://finance.sina.cn/finance_zt/financeapp/hqzg.shtml?stockcode=@symbol".replace("@symbol", i.parent.symbol)
              , r = m(i.parent.symbol) ? e : "http://finance.sina.cn/finance_zt/financeapp/znzg.shtml";
            o && o.tryDirectCall({
                callpagetype: "2",
                subtype: "1",
                symbol: i.parent.symbol,
                position: "fromwaphq",
                iostoh5: r,
                isDownload: !1,
                callfailUrl: r,
                openBrowser: function() {
                    window.open(r, "_self")
                }
            }),
            V("dsjzg", null, "hq_center_hs"),
            a(t)
        }),
        this.dom = n,
        t.param.wrap.dom.appendChild(n)
    }
    function M(t, e, i) {
        var a = t.param.callUpApp;
        1 != a.isCall && (0 == a.isSE ? a.SEList.indexOf(e) > -1 && a.callBack && a.callBack({
            pos: a.pix + t.market + "_" + i,
            key: "universal_callup",
            androidurl: a.bag
        }) : a.noSEList.indexOf(e) > -1 && a.callBack && a.callBack({
            pos: a.pix + t.market + "_" + i,
            key: "universal_callup",
            androidurl: a.bag
        }))
    }
    function z(t) {
        for (var e = Z.length; e--; )
            if (t.match(Z[e]))
                return !0;
        return !1
    }
    function F(t) {
        t.chart.kInitParam.theme.K_RISE = "#00a800",
        t.chart.kInitParam.theme.K_FALL = "#f11200",
        t.chart.kInitParam.theme.T_RISE = "#00a800",
        t.chart.kInitParam.theme.T_FALL = "#f11200",
        t.chart.tInitParam.theme.K_RISE = "#00a800",
        t.chart.tInitParam.theme.K_FALL = "#f11200",
        t.chart.tInitParam.theme.T_RISE = "#00a800",
        t.chart.tInitParam.theme.T_FALL = "#f11200",
        t.info.upColor = "#00a800",
        t.info.downColor = "#f11200"
    }
    function R(t) {
        return ["sh000001", "sz399001", "sz399006", "sz399415", "sz399416", "sz399300", "sz000300"].indexOf(t) > -1
    }
    function K(t) {
        for (var e = ["USDTRY", "USDZAR", "AUDUSD", "USDCAD", "USDCHF", "USDCNH", "CZKUSD", "DKKUSD", "EURUSD", "GBPUSD", "USDHKD", "USDHUF", "ILSUSD", "USDINR", "USDJPY", "USDMXN", "MYRUSD", "USDNOK", "NZDUSD", "PLNUSD", "USDRUB", "SEKUSD", "SGDUSD", "ARSUSD", "USDPHP", "USDKRW", "USDIDR"], i = e.length; i--; )
            if (t === "fx_s" + e[i].toLowerCase())
                return !0;
        return !1
    }
    function O(t, e, i) {
        var a = H(e);
        if (i)
            t.tab.list = ["networth", "repay"],
            t.chart.initView = "networth",
            Number(i.flashType[1]) && (t.tab.list.unshift("predict"),
            t.chart.initView = "predict"),
            Number(i.flashType[0]) && (t.tab.list.unshift("more"),
            t.chart.initView = "t1"),
            t.tab.more = ["t1", "t5", "kd", "kw", "km"],
            t.tab.viewMap.more = "\u884c\u60c5\u8d70\u52bf",
            t.info.toFixedNum = 4;
        else {
            var r = "";
            switch (a) {
            case "CN":
                m(e) && (t.tech.kChart.rek = [-1, 0, 1],
                r = decodeURIComponent(W.load("sina_hqchart_rek")),
                r = "null" === r ? -1 : Number(r.replace('"rek', "").replace(/"/g, "")),
                t.chart.kChart.setReK = r),
                t.tab.list = ["t1", "t5", "kd", "kw", "km", "more"];
                break;
            case "HK":
                t.tech.kChart.rek = [-1, 0, 1],
                r = decodeURIComponent(W.load("sina_hqchart_rek")),
                r = "null" === r ? -1 : Number(r.replace('"rek', "").replace(/"/g, "")),
                t.chart.kChart.setReK = r,
                t.tab.list = ["t1", "t5", "kcl", "kd", "kw", "km"],
                t.chart.kInitParam.rate = 0,
                t.chart.tInitParam.rate = 0,
                t.info.toFixedNum = 3,
                F(t);
                break;
            case "US":
                t.tech.kChart.rek = [-1, 0],
                r = decodeURIComponent(W.load("sina_hqchart_rek")),
                r = "null" === r ? -1 : Number(r.replace('"rek', "").replace(/"/g, "")),
                t.chart.kChart.setReK = r,
                F(t);
                break;
            case "LSE":
                t.tab.list = ["t1", "kd", "kw", "km"],
                t.chart.tChart.showScale = "pct",
                t.info.toFixedNum = t.chart.tInitParam.ennfloat && t.chart.tInitParam.nfloat ? t.chart.tInitParam.nfloat : 3;
                break;
            case "GOODS":
                t.tab.list = ["t1", "kd", "kw", "km"],
                t.chart.tChart.showScale = "pct";
                break;
            case "MSCI":
            case "global_index":
                t.tab.list = ["t1", "kcl", "kd", "kw", "km"],
                t.chart.tChart.tCharts = [{
                    name: "MACD"
                }],
                t.chart.kChart.tCharts = [{
                    name: "MACD"
                }],
                t.tech.tChart.pCharts = [],
                t.tech.tChart.tCharts = ["null", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                t.tech.kChart.pCharts = ["MA", "BBIBOLL", "BOLL", "EXPMA", "SAR"],
                t.tech.kChart.tCharts = ["null", "MACD", "ASI", "BIAS", "BRAR", "CCI", "DMA", "DMI", "KDJ", "PSY", "ROC", "RSI", "SAR", "TRIX", "WR"],
                t.chart.tChart.showScale = "pct";
                break;
            case "forex":
            case "forex_yt":
                t.tab.list = ["k1", "kd", "kw", "km", "more"],
                t.tab.more = "forex_yt" === a ? ["k5", "k30"] : ["k5", "k15", "k30", "k60", "k240"],
                t.chart.initView = K(e) ? "k1" : "kd",
                t.chart.kInitParam.nfloat = 4,
                t.chart.kInitParam.newthour = "forex_yt" === a ? 6 : 7,
                t.chart.kChart.tCharts = [{
                    name: "MACD"
                }],
                t.chart.kChart.pCharts = [],
                t.tech.kChart.pCharts = ["MA", "BBIBOLL", "BOLL", "EXPMA", "SAR"],
                t.tech.kChart.tCharts = ["null", "MACD", "ASI", "BIAS", "BRAR", "CCI", "DMA", "DMI", "KDJ", "PSY", "ROC", "RSI", "SAR", "TRIX", "WR"],
                t.info.toFixedNum = 4,
                t.chart.kChart.showRangeSelector = {
                    display: !1
                },
                F(t);
                break;
            case "BTC":
                t.tab.list = "btc_btcokcoin" === e ? ["kd", "kw", "km", "more"] : ["k1", "kd", "kw", "km", "more"],
                t.tab.more = ["k15"],
                t.chart.initView = "btc_btcokcoin" === e ? "kd" : "k1",
                t.chart.kInitParam.nfloat = 2,
                t.chart.kInitParam.newthour = 0,
                t.chart.kChart.tCharts = [{
                    name: "MACD"
                }],
                t.chart.kChart.pCharts = [],
                t.info.toFixedNum = 2,
                t.chart.kChart.showRangeSelector = {
                    display: !1
                },
                F(t);
                break;
            case "HF":
                t.chart.tChart.tCharts = [{
                    name: "MACD"
                }],
                t.chart.kChart.tCharts = [{
                    name: "MACD"
                }],
                t.tech.tChart.pCharts = [],
                t.tech.tChart.tCharts = ["null", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                t.tech.kChart.pCharts = ["MA", "BBIBOLL", "BOLL", "EXPMA", "SAR"],
                t.tech.kChart.tCharts = ["null", "MACD", "ASI", "BIAS", "BRAR", "CCI", "DMA", "DMI", "KDJ", "PSY", "ROC", "RSI", "SAR", "TRIX", "WR"],
                t.tab.list = ["t1", "kcl", "kd", "kw", "km", "more"],
                t.tab.more = ["k5", "k15", "k30", "k60"],
                t.chart.tChart.showScale = "pct",
                t.chart.tInitParam.tchartobject = {
                    t: ["MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"]
                },
                t.chart.kInitParam.tchartobject = {
                    k: ["MACD", "ASI", "BIAS", "BRAR", "CCI", "DMA", "DMI", "KDJ", "PSY", "ROC", "RSI", "SAR", "TRIX", "WR"]
                },
                ~["hf_ES"].indexOf(e) ? t.info.toFixedNum = 2 : ~["hf_DXF", "hf_SF", "hf_CD", "hf_JY", "hf_BP", "hf_EC"].indexOf(e) ? (t.info.toFixedNum = 4,
                t.info.percentToFixedNum = 4) : t.info.toFixedNum = 3;
                break;
            case "NF":
                t.tab.list = ["t1", "t5", "kd", "k30", "k60", "more"],
                t.tab.more = ["k5", "k15", "kcl", "kw", "km"],
                t.chart.tChart.showScale = "pct",
                t.tech.tChart.tCharts = ["null", "TVOL", "POSITION", "LB", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"];
                break;
            case "OTC":
                "sb899001" === e || "sb899305" === e || "sb899306" === e || "sb899307" === e || "sb899003" === e ? (t.tab.list = ["kcl", "kd", "kw", "km"],
                t.chart.initView = "kcl") : t.tab.list = ["t1", "kcl", "kd", "kw", "km"]
            }
        }
    }
    function U(t, e) {
        Y.call(this);
        var i = t.chart.symbol
          , a = this;
        if (this.symbol = t.chart.symbol,
        t.chart.isFund) {
            var r = "https://app.xincai.com/fund/api/jsonp.json/$cb/XinCaiFundService.getFlashDataStep1?symbol=$symbol&___qn=1";
            r = r.replace("$cb", "var%20FundData=").replace("$symbol", i),
            q(r, function() {
                t.chart.isFund = FundData,
                O($, i, FundData),
                a._init(t)
            })
        } else
            O($, i),
            this._init(t, e)
    }
    function E() {
        return window.chart ? "vertical" == window.chart.direction : !1
    }
    function P() {
        this.VERSION = "1.2.13",
        this.get = function(e, i) {
            function a(e) {
                r.off(e, a),
                t.isFunc(i) && i(r)
            }
            var r = new U(e,i);
            r.on("AppTKChartLoaded", a, !1)
        }
    }
    var H = t.market
      , V = t.suda
      , q = t.load
      , W = t.localSL
      , X = Object.prototype.toString
      , j = e()
      , Y = function() {
        var t = Array.prototype.slice
          , e = function() {
            this.eventList = {}
        };
        return e.prototype = {
            constructor: e,
            on: function(t, e, i, a) {
                var r = this.eventList;
                return e && t ? (r[t] || (r[t] = []),
                r[t].push({
                    handler: e,
                    one: a,
                    ctx: i || this
                }),
                this) : this
            },
            one: function(t, e, i) {
                this.on(t, e, i, !0)
            },
            off: function(t, e) {
                var i = this.eventList;
                if (!t)
                    return this.eventList = {},
                    this;
                if (e) {
                    if (i[t]) {
                        for (var a = [], r = 0, n = i[t].length; n > r; r++)
                            i[t][r].handler != e && a.push(i[t][r]);
                        i[t] = a
                    }
                    i[t] && 0 === i[t].length && delete i[t]
                } else
                    delete i[t]
            },
            trigger: function(e) {
                if (this.eventList[e]) {
                    var i = arguments
                      , a = i.length;
                    a > 3 && (i = t.call(i, 1));
                    for (var r = this.eventList[e], n = r.length, h = 0; n > h; ) {
                        switch (a) {
                        case 1:
                            r[h].handler.call(r[h].ctx);
                            break;
                        case 2:
                            r[h].handler.call(r[h].ctx, i[1]);
                            break;
                        case 3:
                            r[h].handler.call(r[h].ctx, i[1], i[2]);
                            break;
                        default:
                            r[h].handler.apply(r[h].ctx, i)
                        }
                        r[h].one ? (r.splice(h, 1),
                        n--) : h++
                    }
                }
                return this
            }
        },
        e
    }();
    C.prototype = {
        constructor: C,
        _init: function() {
            var t, e = this.param, i = this.parent, a = r("div");
            c(a.style, e.style, !0),
            i.param.wrap.dom.appendChild(a),
            this.nav = k(a, this.param, this.parent.param.bsCallUp, this),
            this.dom = a,
            t = this.nav.querySelector("[" + e.attributeName + "=" + i.param.chart.initView + "]"),
            v(t, e.navItemActiveStyle, e.subNavItemActiveStyle),
            this.selectedView = t,
            this.resize(),
            this.bindClickEvent()
        },
        setStyle: function() {
            this.nav.style.display = "block",
            this.resize()
        },
        setView: function(t) {
            var e = this.param
              , i = t
              , a = this.nav.querySelector("[" + e.attributeName + "=" + i + "]");
            v(this.selectedView, e.navItemStyle, e.subNavItemStyle),
            this.selectedView = a,
            v(a, e.navItemActiveStyle, e.subNavItemActiveStyle)
        },
        bindClickEvent: function() {
            var t, e = this, i = this.param, a = this.parent;
            this.nav.addEventListener("click", function(r) {
                var n = r.target
                  , h = n.getAttribute(i.attributeName)
                  , o = n.getAttribute(i.attributeDj)
                  , s = n.getAttribute("type");
                if (h) {
                    if (location.origin.match("touzi") && b(h),
                    a.chart) {
                        if (!j && "app" === h) {
                            switch (a.market) {
                            case "CN":
                                a.bsCallUp.callNew(o);
                                break;
                            case "US":
                            case "HK":
                                a.bsCallUp.callNew(o)
                            }
                            return
                        }
                        if (a.chart.showView(h),
                        "dk" === h)
                            R(e.parent.symbol) ? (a.chart.chart.showKTechM("DPDK"),
                            a.chart.chart.switchKTech("DPDKS")) : (a.chart.chart.showKTechM("TZY"),
                            a.chart.chart.switchKTech("TZYS")),
                            a.tech && a.tech.hide();
                        else if (a.chart.chart.hideKTechM("TZY"),
                        a.chart.chart.hideKTechM("DPDK"),
                        a.tech)
                            switch (a.chart.chart.getChartType()) {
                            case "tChart":
                                a.tech.param.tChart.show && "vertical" != a.direction ? (a.tech.show(),
                                a.tech.switchTechList("tChart")) : a.tech.hide();
                                break;
                            case "kChart":
                                if (a.tech.param.kChart.show && "vertical" != a.direction ? (a.tech.show(),
                                a.tech.switchTechList("kChart")) : a.tech.hide(),
                                "dk" === t) {
                                    var l = e.parent.tech.kChart.tCharts.querySelector("[selected=true]");
                                    a.chart.chart.switchKTech(l ? l.getAttribute("value") : "volume")
                                }
                                if ("k1" === h)
                                    a.chart.chart.hideKTechM("MA");
                                else {
                                    var c = e.parent.tech.kChart.pCharts.querySelector("[selected=true]");
                                    c && "MA" === c.getAttribute("value") && a.chart.chart.showKTechM("MA")
                                }
                                break;
                            default:
                                a.tech.hide()
                            }
                        a.resize(),
                        t = h
                    }
                    v(e.selectedView, i.navItemStyle, i.subNavItemStyle),
                    v(n, i.navItemActiveStyle, i.subNavItemActiveStyle),
                    e.moreView && ("subNav" !== s ? v(e.moreView, i.navItemStyle, i.subNavItemStyle) : v(e.moreView, i.navItemActiveStyle, i.subNavItemActiveStyle)),
                    e.selectedView = n
                }
            })
        },
        resize: function() {
            for (var t = this.nav, e = this.nav.querySelectorAll("ul li"), i = this.param.list, a = o(t) / i.length, r = e.length; r--; )
                e[r].style.width = a + "px"
        },
        moveTo: function(t) {
            var e = this.nav.querySelector("li>ul");
            "bottom" == t ? (this.parent.param.wrap.dom.appendChild(this.dom),
            c(this.nav.style, this.param.navBottomStyle, !0),
            e && (e.style.bottom = "100%")) : (this.parent.param.wrap.dom.insertBefore(this.dom, this.parent.param.wrap.dom.firstChild),
            c(this.nav.style, this.param.navTopStyle, !0),
            e && (e.style.bottom = ""))
        }
    };
    var J = ["t", "k", "netWorth", "repay", "predict"];
    g.prototype = {
        constructor: g,
        _init: function() {
            var e = this.parent
              , i = this.param
              , a = r("div")
              , n = a.style;
            c(n, this.isSimple ? i.simpleStyle : i.completeStyle, !0),
            this.dom = a,
            this.isCNK = t.isCNK(this.parent.symbol),
            e.param.wrap.dom.appendChild(a),
            this._initDoms()
        },
        simple: function(e) {
            "undefined" == typeof e && (e = !0);
            var i = this.param;
            if (this.isSimple = e,
            e) {
                c(this.dom.style, i.simpleStyle, !0),
                this.doms.nameBox.style.display = "none",
                this.doms.price.style.display = "none";
                for (var a = J.length; a--; )
                    if ("k" === J[a]) {
                        var r = t.isCNK(this.parent.symbol) ? "CNKSimpleDetailStyle" : "simpleDetailStyle";
                        c(this.doms[J[a] + "Detail"].style, i[r], !0)
                    } else
                        c(this.doms[J[a] + "Detail"].style, i.simpleDetailStyle, !0)
            } else
                for (c(this.dom.style, i.completeStyle, !0),
                this.doms.nameBox.style.display = "block",
                this.doms.price.style.display = "block",
                a = J.length; a--; )
                    if ("k" === J[a]) {
                        var n = t.isCNK(this.parent.symbol) ? "CNKCompleteDetailStyle" : "completeDetailStyle";
                        c(this.doms[J[a] + "Detail"].style, i[n], !0)
                    } else
                        c(this.doms[J[a] + "Detail"].style, i.completeDetailStyle, !0)
        },
        _initDoms: function() {
            function t(t, a) {
                var h = r("div");
                i.appendChild(h),
                n.doms[t + "Detail"] = h;
                var o;
                o = "k" === t && n.isCNK ? "CNKDetailItemStyle" : "DetailItemStyle";
                for (var l = 0; a > l; l++) {
                    var p = r("div")
                      , d = p.style;
                    i.appendChild(p),
                    c(d, e[t + o], !0),
                    d.lineHeight = s(p) + "px",
                    h.appendChild(p)
                }
            }
            var e = this.param
              , i = r("div")
              , a = i.style
              , n = this;
            this.doms = {},
            a.height = "100%",
            a.width = "100%",
            this.dom.appendChild(i);
            var h = r("div");
            i.appendChild(h),
            c(h.style, e.nameBoxStyle, !0),
            this.doms.nameBox = h;
            var o = r("div");
            h.appendChild(o),
            c(o.style, e.nameStyle, !0),
            this.doms.name = o;
            var l = r("div");
            h.appendChild(l),
            c(l.style, e.symbolStyle, !0),
            this.doms.symbol = l;
            var p = r("div")
              , d = p.style;
            i.appendChild(p),
            c(p.style, e.priceStyle, !0),
            d.lineHeight = s(p) + "px",
            this.doms.price = p;
            var m = this.isCNK ? 8 : 6;
            return t("t", 6),
            t("k", m),
            t("netWorth", 2),
            t("repay", 1),
            t("predict", 3),
            this.doms.dom = i,
            i
        },
        _displayNoneExcept: function(t) {
            for (var e = J.length; e--; )
                J[e] !== t && (this.doms[J[e] + "Detail"].style.display = "none")
        },
        _showDetailInfo: function(t, e, i) {
            var a, r, n = e.percent, h = this.param, o = h.toFixedNum, s = this.param.percentToFixedNum, l = h.upColor, c = h.downColor, d = h.levelColor;
            if (isNaN(n) && (n = 0),
            "tChart" == t) {
                this._displayNoneExcept("t");
                var m, u;
                "LSE" === this.parent.market || "MSCI" === this.parent.market ? (m = Number(e.price).toFixed(o),
                u = "-") : (m = e.price,
                u = e.avg_price),
                a = this.doms.tDetail,
                r = e.price / (1 + n),
                a.childNodes[0].innerHTML = w("\u4ef7", m, n > 0 ? l : 0 > n ? c : d),
                a.childNodes[1].innerHTML = w("\u5747", isNaN(e.avg_price) ? "-" : u, e.avg_price > r ? l : e.avg_price < r ? c : d),
                a.childNodes[2].innerHTML = w("\u5e45", (100 * n).toFixed(s) + "%", n > 0 ? l : 0 > n ? c : d),
                a.childNodes[3].innerHTML = this.parent.hasVolume ? "\u91cf: " + p(e.volume, 2) : ""
            } else if ("kChart" == t) {
                this._displayNoneExcept("k"),
                a = this.doms.kDetail,
                r = e.close / (1 + n);
                var f = [w("\u5f00", e.open.toFixed(o), e.open > r ? l : e.open < r ? c : d), w("\u9ad8", e.high.toFixed(o), e.high > r ? l : e.high < r ? c : d), w("\u5e45", (100 * n).toFixed(s) + "%", n > 0 ? l : 0 > n ? c : d), w("\u6536", e.close.toFixed(o), n > 0 ? l : 0 > n ? c : d), w("\u4f4e", e.low.toFixed(o), e.low > r ? l : e.low < r ? c : d), this.parent.hasVolume ? "\u91cf: " + p(e.volume, 2) : ""]
                  , y = [this.parent.hasVolume ? "\u76d8\u540e\u91cf: " + p(e.postVol, 2) : "", this.parent.hasVolume ? "\u76d8\u540e\u989d: " + p(e.postAmt, 2) : ""]
                  , k = this.parent.tab.selectedView
                  , C = 6
                  , v = a.childNodes.length;
                k && "kd" === k.dataset.view && this.isCNK && (f.splice(3, 0, y[0]),
                f.push(y[1]),
                C = a.childNodes.length,
                v = C);
                for (var b = 0; v > b; b++)
                    a.childNodes[b].innerHTML = b >= C ? "" : f[b]
            } else if ("netWorthChart" == t)
                this._displayNoneExcept("netWorth"),
                a = this.doms.netWorthDetail,
                i.length > 1 && (a.childNodes[0].innerHTML = w(i[0].name, i[0].data.close.toFixed(h.toFixedNum)),
                a.childNodes[1].innerHTML = w(i[1].name, i[1].data.close.toFixed(h.toFixedNum)));
            else if ("repayChart" === t) {
                this._displayNoneExcept("repay"),
                a = this.doms.repayDetail;
                var S = "";
                this.parent.tab.param.viewMap && this.parent.tab.param.viewMap.repay && (S = this.parent.tab.param.viewMap.repay),
                a.childNodes[0].innerHTML = w(S || "\u5386\u53f2\u56de\u62a5", e.close.toFixed(h.toFixedNum))
            } else
                "predictChart" === t && (this._displayNoneExcept("predict"),
                a = this.doms.predictDetail,
                r = e.price / (1 + n),
                a.childNodes[0].innerHTML = w("\u4f30", e.price.toFixed(o), n > 0 ? l : 0 > n ? c : d),
                a.childNodes[1].innerHTML = w("\u5747", isNaN(e.avg_price) ? "-" : e.avg_price.toFixed(o), e.avg_price > r ? l : e.avg_price < r ? c : d),
                a.childNodes[2].innerHTML = w("\u5e45", (100 * n).toFixed(s) + "%", n > 0 ? l : 0 > n ? c : d));
            a.style.display = "block"
        },
        _showSimple: function(t, e) {
            var i = t.data;
            t.interacting ? (this.dom.style.display = "block",
            this._showDetailInfo(e, i, t.data_array)) : this.dom.style.display = "none"
        },
        _showComplete: function(t, e) {
            var i, a = this.param, r = this.doms.price, n = this.doms.symbol, h = this.doms.name, o = t.data, s = this.parent.chart.param.isFund;
            h.innerHTML = s ? s.name : t.curname,
            n.innerHTML = d(this.parent.param.chart.symbol),
            i = o.percent,
            r.style.color = i > 0 ? a.upColor : 0 > i ? a.downColor : a.levelColor,
            this._showDetailInfo(e, o, t.data_array),
            r.innerHTML = "tChart" == e ? Number(o.price).toFixed(a.toFixedNum) : "kChart" == e ? o.close.toFixed(a.toFixedNum) : ""
        },
        show: function(t, e) {
            this[this.isSimple ? "_showSimple" : "_showComplete"](t, e)
        }
    },
    _.prototype = {
        constructor: _,
        _init: function() {
            var t = this.parent
              , e = this.param
              , i = r("div")
              , a = i.style;
            c(a, e.style, !0),
            this.dom = i;
            this._initTechList("tChart"),
            this._initTechList("kChart");
            this.switchTechList(f(t.param.chart.initView)),
            this.resize(),
            t.param.wrap.dom.appendChild(i)
        },
        switchTechStyle: function(t, e) {
            for (var i = this.param, a = e.Indicator, r = this[t].tCharts.querySelectorAll("li"), n = r.length; n--; )
                c(r[n].style, i.itemNormalStyle, !0),
                r[n].setAttribute("selected", "false"),
                r[n].getAttribute("value") === a.name && c(r[n].style, i.itemActiveStyle, !0);
            e.Indicator.name != this.parent.chart.param.tChart.tCharts[0].name && e.Indicator.name != this.parent.chart.param.kChart.tCharts[0].name && M(this.parent, "tech", t + "_" + e.Indicator.name)
        },
        switchTechList: function(t) {
            this.tChart && (this.tChart.dom.style.display = "none"),
            this.kChart && (this.kChart.dom.style.display = "none"),
            ("tChart" == t || "kChart" == t) && (this[t] ? this[t].dom.style.display = "block" : this._initTechList(t),
            this.isShow = !0)
        },
        _initTechList: function(t) {
            var e, i, a, n = this.parent, h = this.dom, o = this.param, s = r("div"), l = s.style;
            return this[t] = {},
            l.width = "100%",
            l.height = "100%",
            o[t].rek && o[t].rek.length && (e = this._initOneList(s, o[t].rek, n.param.chart[t].setReK),
            e.addEventListener("click", function(t) {
                x.call(this, t, o),
                n.chart.chart.setReK(t.target.getAttribute("value")),
                W.save("sina_hqchart_rek", "rek" + t.target.getAttribute("value"))
            })),
            i = this._initOneList(s, o[t].pCharts, n.param.chart[t].pCharts, !0),
            i.addEventListener("click", function(e) {
                var i = e.target;
                "LI" == e.target.nodeName && ("true" == i.getAttribute("selected") ? (i.setAttribute("selected", "false"),
                c(i.style, o.itemNormalStyle, !0),
                n.chart.chart["tChart" == t ? "hideTTechM" : "hideKTechM"](i.getAttribute("value"))) : (i.setAttribute("selected", "true"),
                c(i.style, o.itemActiveStyle, !0),
                n.chart.chart["tChart" == t ? "showTTechM" : "showKTechM"](i.getAttribute("value"))),
                M(n, "tech", t + "_" + i.getAttribute("value")))
            }),
            a = this._initOneList(s, o[t].tCharts, n.param.chart[t].tCharts, !0),
            a.addEventListener("click", function(e) {
                x.call(this, e, o),
                n.chart.chart["tChart" == t ? "switchTTech" : "switchKTech"](e.target.getAttribute("value"))
            }),
            this[t].rek = e,
            this[t].pCharts = i,
            this[t].tCharts = a,
            this[t].dom = s,
            h.appendChild(s),
            s
        },
        _initOneList: function(t, e, i, a) {
            var n = r("ul")
              , h = this.param
              , o = h.techMap;
            c(n.style, h.boxStyle, !0);
            for (var s = 0, p = e.length; p > s; s++) {
                var d = r("li");
                if (d.innerHTML = o[e[s]] ? o[e[s]] : e[s],
                d.setAttribute("value", e[s]),
                "Array" == l(i)) {
                    c(d.style, h.itemNormalStyle, !0);
                    for (var m = i.length; m--; )
                        if (i[m].name == e[s]) {
                            c(d.style, h.itemActiveStyle, !0),
                            a && d.setAttribute("selected", "true");
                            break
                        }
                } else
                    e[s] == i ? c(d.style, h.itemActiveStyle, !0) : c(d.style, h.itemNormalStyle, !0);
                n.appendChild(d)
            }
            return t.appendChild(n),
            n
        },
        resize: function() {
            var t, e, i = this.tChart, a = this.kChart, r = this.parent._calcChartHeight(), n = 42, h = .5, o = .5, s = 3;
            t = 3 * n,
            this.dom.style.height = r + "px",
            i && (i.pCharts.style.height = r * h + "px",
            i.tCharts.style.height = r * o + "px"),
            a && (a.rek ? (e = r - t,
            n * s > e && (e = r > n * s ? s * n : r,
            t = r - e),
            a.rek.style.height = t + "px") : e = r,
            a.pCharts.style.height = e * h + "px",
            a.tCharts.style.height = e * o + "px")
        },
        show: function() {
            this.dom.style.display = "block",
            this.isShow = !0
        },
        hide: function() {
            this.dom.style.display = "none",
            this.isShow = !1
        }
    },
    A.prototype = {
        constructor: A,
        _init: function() {
            this._initWrap();
            var t = this
              , e = this.parent
              , i = this.param;
            KKE.api("plugins.lightTKChart.get", c(i, {
                dom: this.childDom,
                kInitParam: {
                    onviewprice: function(t) {
                        e.info.show(t, "kChart")
                    },
                    ontechchanged: function(t) {
                        e.tech.switchTechStyle("kChart", t)
                    },
                    onshortclickmain: function() {
                        E()
                    }
                },
                tInitParam: {
                    onviewprice: function(t) {
                        e.info.show(t, "tChart")
                    },
                    ontechchanged: function(t) {
                        e.tech.switchTechStyle("tChart", t)
                    },
                    onshortclickmain: function() {
                        E()
                    }
                },
                netWorthInitParam: {
                    onviewprice: function(t) {
                        e.info.show(t, "netWorthChart")
                    }
                },
                repayInitParam: {
                    onviewprice: function(t) {
                        e.info.show(t, "repayChart")
                    }
                },
                predictInitParam: {
                    onviewprice: function(t) {
                        e.info.show(t, "predictChart")
                    }
                }
            }, !0), function(e) {
                t.chart = e,
                t.parent.trigger("AppTKChartLoaded", null),
                t.parent.tab.setStyle(),
                I(i.symbol, e)
            })
        },
        _initWrap: function() {
            var t = this.parent
              , e = this.param
              , i = t.param.wrap.dom
              , a = r("div")
              , n = r("div")
              , h = a.style
              , o = n.style;
            c(h, e.style, !0),
            h.position = "relative",
            h.width = t._calcChartWidth() + "px",
            h.height = t._calcChartHeight() + "px",
            o.width = "100%",
            o.height = "100%",
            this.dom = a,
            this.childDom = n,
            a.appendChild(n),
            i.appendChild(a)
        },
        resize: function() {
            var t = this.dom
              , e = t.style
              , i = this.parent;
            e.width = i._calcChartWidth() + "px",
            e.height = i._calcChartHeight() + "px",
            this.chart && this.chart.resize()
        },
        showView: function(t, e) {
            this.chart && (this.chart.showView("dk" == t ? "kd" : t),
            M(this.parent, t, t),
            this.currentView = t),
            e && this.parent.tab.setView(e)
        }
    },
    L.prototype = {
        moveTo: function(t, e) {
            this.dom.style.right = t,
            this.dom.style.bottom = e
        }
    },
    D.prototype = {
        show: function() {
            this.dom.style.display = "block"
        },
        hide: function() {
            this.dom.style.display = "none"
        }
    },
    T.prototype = {
        show: function() {
            this.maskDom.style.display = "block"
        },
        hide: function() {
            this.maskDom.style.display = "none"
        }
    },
    N.prototype = {
        callNew: function(t) {
            var e = this.parent.param.callUpApp;
            e && e.callBack({
                key: "universal_callup",
                pos: e.pix + this.parent.market + "_" + t,
                androidurl: this.bag
            })
        },
        call: function() {
            this.sfc && this.sfc.tryDirectCall({
                callpagetype: "2",
                symbol: this.parent.symbol,
                position: this.param.value || "chart_CN_bs"
            })
        }
    },
    B.prototype = {
        moveTo: function(t, e) {
            this.dom.style.right = t,
            this.dom.style.bottom = e
        }
    };
    var $ = {
        tab: {
            list: ["t1", "t5", "kd", "kw", "km", "more"],
            more: ["kcl", "k5", "k15", "k30", "k60"],
            viewMap: {
                t1: "\u5206\u65f6",
                t5: "\u4e94\u65e5",
                kd: "\u65e5K",
                kw: "\u5468K",
                km: "\u6708K",
                ky: "\u5e74K",
                kcl: "\u5e74\u7ebf",
                k1: "1\u5206",
                k5: "5\u5206",
                k15: "15\u5206",
                k30: "30\u5206",
                k60: "60\u5206",
                k240: "4\u5c0f\u65f6",
                more: "\u66f4\u591a",
                dk: "B/S\u70b9",
                app: "B/S\u70b9",
                predict: "\u51c0\u503c\u9884\u6d4b",
                networth: "\u5386\u53f2\u51c0\u503c",
                repay: "\u5386\u53f2\u56de\u62a5"
            },
            style: {
                "float": "left",
                width: "100%",
                height: "35px",
                lineHeight: "35px",
                textAlign: "center",
                fontSize: "14px",
                backgroundColor: "#F0F0F0",
                listStyle: "none"
            },
            navTopStyle: {
                width: "100%",
                height: "100%",
                listStyle: "none"
            },
            navBottomStyle: {
                margin: "auto",
                width: "80%",
                height: "100%",
                listStyle: "none"
            },
            navItemStyle: {
                position: "relative",
                "float": "left",
                listStyle: "none",
                height: "35px",
                color: "#000",
                backgroundColor: "",
                borderBottom: "",
                boxSizing: "border-box",
                webkitBoxSizing: "border-box"
            },
            navItemActiveStyle: {
                color: "#0099ff",
                backgroundColor: "#fff",
                borderBottom: "2px solid #0099ff"
            },
            subNavStyle: {
                position: "absolute",
                width: "100%",
                zIndex: 999,
                listStyle: "none"
            },
            subNavItemStyle: {
                color: "#000",
                backgroundColor: "#F0F0F0"
            },
            subNavItemActiveStyle: {
                color: "#0099ff",
                backgroundColor: "#E8E8E8"
            },
            attributeDj: "data-dj",
            attributeName: "data-view"
        },
        chart: {
            symbol: "sh000001",
            initView: "t1",
            style: {
                "float": "left",
                width: "90%"
            },
            kInitParam: {
                theme: {},
                dim: {
                    H_T_G: 45
                },
                candlenum: 40
            },
            tInitParam: {
                theme: {},
                dim: {
                    H_T_G: 45
                }
            },
            netWorthInitParam: {
                theme: {
                    K_CL: "#00c1eb"
                },
                dual: {
                    theme: {
                        K_CL: "#fe6623"
                    }
                },
                rate: 0,
                nfloat: 4
            },
            repayInitParam: {
                theme: {
                    K_CL: "#987654"
                },
                rate: 0,
                nfloat: 4
            },
            predictInitParam: {
                nfloat: 4
            },
            kChart: {
                setCustom: {
                    allow_indicator_edit: !0,
                    storage_lv: 2,
                    touch_prevent: !1
                },
                setReK: 0,
                tCharts: [{
                    name: "VOLUME"
                }],
                pCharts: [{
                    name: "MA"
                }]
            },
            tChart: {
                setCustom: {
                    allow_indicator_edit: !0,
                    storage_lv: 2,
                    touch_prevent: !1
                },
                tCharts: [{
                    name: "TVOL"
                }],
                pCharts: []
            },
            netWorthChart: {},
            repayChart: {},
            predictChart: {
                tCharts: [{
                    name: "ADL"
                }]
            }
        },
        info: {
            simpleStyle: {
                width: "100%",
                height: "35px",
                paddingTop: "",
                lineHeight: "15px",
                textAlign: "left",
                display: "none",
                position: "absolute",
                color: "#000",
                backgroundColor: "#fff",
                boxSizing: "content-box",
                webkitBoxSizing: "content-box"
            },
            completeStyle: {
                width: "100%",
                height: "40px",
                paddingTop: "5px",
                lineHeight: "",
                textAlign: "left",
                "float": "left",
                display: "block",
                position: "",
                color: "#000",
                backgroundColor: "#F0F0F0",
                boxSizing: "content-box",
                webkitBoxSizing: "content-box"
            },
            nameBoxStyle: {
                "float": "left",
                width: "20%",
                height: "100%",
                paddingLeft: "10px",
                boxSizing: "border-box",
                webkitBoxSizing: "border-box"
            },
            nameStyle: {
                fontSize: "17px",
                color: "black",
                height: "24px",
                lineHeight: "24px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            },
            symbolStyle: {
                fontSize: "13px",
                color: "#999999",
                height: "16px",
                lineHeight: "16px"
            },
            priceStyle: {
                "float": "left",
                width: "25%",
                height: "100%",
                fontSize: "26px"
            },
            simpleDetailStyle: {
                "float": "left",
                width: "90%",
                height: "100%",
                fontSize: "13px",
                marginLeft: "10%"
            },
            CNKCompleteDetailStyle: {
                "float": "left",
                width: "55%",
                marginLeft: "",
                height: "100%",
                fontSize: "10px"
            },
            completeDetailStyle: {
                "float": "left",
                width: "55%",
                marginLeft: "",
                height: "100%",
                fontSize: "13px"
            },
            tDetailItemStyle: {
                "float": "left",
                width: "50%",
                height: "50%"
            },
            kDetailItemStyle: {
                "float": "left",
                width: "33%",
                height: "50%"
            },
            CNKSimpleDetailStyle: {
                "float": "left",
                height: "100%",
                width: "100%",
                fontSize: "10px",
                marginLeft: "2%"
            },
            kCNKDetailItemStyle: {
                "float": "left",
                width: "25%",
                height: "50%"
            },
            netWorthDetailItemStyle: {
                "float": "left",
                width: "50%",
                height: "100%"
            },
            repayDetailItemStyle: {
                width: "100%",
                height: "100%"
            },
            predictDetailItemStyle: {
                "float": "left",
                width: "33%",
                height: "100%"
            },
            upColor: "#f11200",
            downColor: "#00a800",
            levelColor: "black",
            toFixedNum: 2,
            percentToFixedNum: 2
        },
        tech: {
            show: !0,
            style: {
                width: "10%",
                "float": "left"
            },
            boxStyle: {
                width: "100%",
                textAlign: "center",
                borderTop: "1px solid #888",
                overflowY: "auto",
                backgroundColor: "#F0F0F0",
                fontSize: "12px",
                listStyle: "none",
                margin: 0,
                padding: 0
            },
            kChart: {
                show: !0,
                tCharts: ["null", "VOLUME", "ASI", "BIAS", "BRAR", "CCI", "DMA", "DMI", "EMV", "KDJ", "MACD", "OBV", "PSY", "ROC", "RSI", "SAR", "TRIX", "VR", "WR", "WVAD", "EMV"],
                pCharts: ["VOLUME", "MA", "BBIBOLL", "BOLL", "EXPMA", "SAR"]
            },
            tChart: {
                show: !0,
                tCharts: ["null", "TVOL", "LB", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                pCharts: ["VOLUME"]
            },
            itemNormalStyle: {
                color: "#000",
                padding: "10px 0"
            },
            itemActiveStyle: {
                color: "#09f",
                padding: "10px 0"
            },
            techMap: {
                "null": "\u65e0",
                "-1": "\u524d\u590d\u6743",
                0: "\u4e0d\u590d\u6743",
                1: "\u540e\u590d\u6743",
                VOLUME: "\u6210\u4ea4\u91cf",
                TVOL: "\u6210\u4ea4\u91cf",
                POSITION: "\u6301\u4ed3\u91cf",
                LB: "\u91cf\u6bd4"
            }
        },
        wrap: {
            style: {
                position: "relative",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                webkitTouchCallout: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                webkitTapHighlightColor: "rgba(0,0,0,0)"
            }
        },
        zoomBar: {
            show: !0,
            style: {
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "70px",
                height: "30px",
                overflow: "hidden",
                zIndex: 998
            },
            zoomOutStyle: {
                width: "30px",
                height: "30px",
                backgroundPosition: "0 0",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                "float": "right",
                backgroundImage: "url(//n.sinaimg.cn/finance/201706cn/icon_add.png)"
            },
            zoomInStyle: {
                width: "30px",
                height: "30px",
                backgroundPosition: "0 0",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                "float": "left",
                backgroundImage: "url(//n.sinaimg.cn/finance/201706cn/icon_subtract.png)"
            }
        },
        closeBtn: {
            show: !1,
            closeBoxStyle: {
                padding: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                background: "#F0F0F0",
                textAlign: "center",
                overflow: "hidden",
                width: "35px",
                height: "35px"
            },
            closeStyle: {
                width: "20px",
                height: "20px",
                backgroundPosition: "0 0",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                backgroundImage: "url(//n.sinaimg.cn/finance/app/h5chart/icon/iconclose2x.png)",
                margin: "8px 5px"
            }
        },
        mask: {
            show: !1
        },
        clinicStock: {
            show: !1,
            style: {
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "30px",
                height: "31px",
                overflow: "hidden",
                zIndex: 998,
                backgroundPosition: "0 0",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                "float": "right",
                display:'none',
                backgroundImage: "url(//n.sinaimg.cn/finance/201706cn/icon_zhen.png)"
            }
        },
        callUpApp: {
            isCall: 1,
            isSE: 1,
            pix: "chart_",
            bag: "http://file.finance.sina.com.cn/finapp/apks/sinafinance_h5chart.apk",
            SEList: ["km", "kw", "k5", "k15", "k30", "k60", "k240", "zoom", "tech"],
            noSEList: ["t5", "k1", "kd", "kw", "km", "kcl", "k5", "k15", "k30", "k60", "k240", "zoom", "tech"],
            callBack: null
        },
        bsCallUp: {
            tabs: [],
            tabName: ["B/S\u70b9"],
            mores: [],
            moreName: ["B/S\u70b9"],
            pix: "chart_",
            show: !1,
            value: "",
            key: "",
            apk: "http://file.finance.sina.com.cn/finapp/apks/sinafinance_h5chart.apk"
        }
    }
      , Z = []
      , G = U.prototype;
    return G._init = function(e) {
        var n = this.symbol;
        if (j && (e.tab && delete e.tab.more,
        e.tab && e.tab.list)) {
            for (var h = 0, o = e.tab.list.length; o--; )
                "app" == e.tab.list[o] && (h = 1);
            1 == h && delete e.tab.list
        }
        this.param = c(e, $),
        this.market = H(n),
        this.hasVolume = S(this.market);
        var s = this.param.wrap.dom;
        if (c(s.style, this.param.wrap.style, !0),
        s.addEventListener("click", i),
        s.addEventListener("touchstart", i),
        s.addEventListener("touchmove", i),
        z(window.location.href) && 1 != t.localSL.load("tipToApp", "cookie")) {
            t.localSL.save("tipToApp", !0, {
                mode: "cookie",
                expires: 10
            });
            var l = r("div")
              , p = l.style;
            p.position = "absolute",
            p.left = "50%",
            p.top = "50%",
            p.width = "300px",
            p.height = "140px",
            p.marginLeft = "-150px",
            p.marginTop = "-90px",
            p.backgroundColor = "rgba(0, 0, 0, 0.8)",
            p.zIndex = "999";
            var d = r("span")
              , m = d.style;
            m.display = "inline-block",
            m.width = "100%",
            m.height = "100px",
            m.lineHeight = "100px",
            m.textAlign = "center",
            m.color = "#fff",
            m.borderBottom = "1px solid #959595",
            d.innerHTML = "\u524d\u5f80\u65b0\u6d6a\u8d22\u7ecf\u5ba2\u6237\u7aef\u67e5\u770b\u5b8c\u6574\u884c\u60c5",
            l.appendChild(d);
            var u = r("span")
              , f = u.style;
            f.display = "inline-block",
            f["float"] = "left",
            f.width = "50%",
            f.height = "40px",
            f.lineHeight = "40px",
            f.textAlign = "center",
            f.color = "#fff",
            u.innerHTML = "\u6682\u4e0d\u524d\u5f80",
            l.appendChild(u);
            var y = r("span")
              , k = y.style;
            k.display = "inline-block",
            k["float"] = "left",
            k.width = "50%",
            k.height = "40px",
            k.lineHeight = "40px",
            k.textAlign = "center",
            k.color = "#fff",
            y.innerHTML = "\u7acb\u5373\u524d\u5f80",
            l.appendChild(y),
            s.appendChild(l),
            p.display = "none",
            s.addEventListener("click", function(t) {
                p.display = "block",
                t && a(t)
            }),
            y.addEventListener("click", function() {
                p.display = "none",
                s.removeChild(l),
                window.location = "sinafinance://type=2&stocktype=cn&symbol=" + n,
                setTimeout(function() {
                    window.location = "https://stock.sina.com.cn/iphone/jump?type=2&stocktype=cn&symbol=" + n
                }, 1e3)
            }),
            u.addEventListener("click", function() {
                p.display = "none",
                s.removeChild(l)
            })
        }
        this.tab = new C(this,e.tab),
        this.info = new g(this,e.info),
        e.tech.show && (this.tech = new _(this,e.tech)),
        this.chart = new A(this,e.chart),
        e.zoomBar.show && (this.zoomBar = new L(this,e.zoomBar)),
        e.closeBtn.show && (this.closeBtn = new D(this,e.closeBtn)),
        e.mask.show && (this.mask = new T(this,e.mask));
        var v = /^sz100\d{3}|sz101\d{3}|sz106\d{3}|sz107\d{3}|sz108\d{3}|sz109\d{3}|sz111\d{3}|sz112\d{3}|sz115\d{3}|sz12\d{4}|sz13\d{4}$/
          , b = /^sh020\d{3}|sh20\d{4}|sh1\d{5}|sh009\d{3}|sh010\d{3}|sh018\d{3}|^sh019\d{3}$/;
        "CN" === this.market && (v.test(this.symbol) || b.test(this.symbol) || e.clinicStock.show && (this.clinicStock = new B(this,e.clinicStock))),
        e.bsCallUp.show && (this.bsCallUp = new N(this,e.bsCallUp)),
        this.setDirection("vertical")
    }
    ,
    G.setDirection = function(t) {
        var e = this.chart.chart ? this.chart.chart.currentView : this.chart.param.initView
          , i = f(e);
        "vertical" == t ? (this.tech && this.tech.hide(),
        this.tab.moveTo("top"),
        this.info.simple(!0),
        this.zoomBar && this.zoomBar.moveTo(this.clinicStock ? "50px" : "10px", "35px"),
        this.clinicStock && this.clinicStock.moveTo("10px", "35px"),
        this.closeBtn && this.closeBtn.hide(),
        this.mask && this.mask.show()) : (this.tech && ("dk" == e ? this.tech.hide() : ("tChart" === i ? this.tech.param.tChart.show && this.tech.show() : "kChart" === i && this.tech.param.kChart.show && this.tech.show(),
        this.tech.switchTechList(f(e)))),
        this.tab.moveTo("bottom"),
        this.info.simple(!1),
        this.zoomBar && this.zoomBar.moveTo(this.clinicStock ? "50px" : "10px", "70px"),
        this.clinicStock && this.clinicStock.moveTo("10px", "70px"),
        this.closeBtn && this.closeBtn.show(),
        this.mask && this.mask.hide()),
        this.direction = t,
        this.resize(),
        this.update()
    }
    ,
    G.setCustom = function(t) {
        this.chart && this.chart.chart ? this.chart.chart.setCustom(t) : (c(this.param.chart.kChart.setCustom, t, !0),
        c(this.param.chart.tChart.setCustom, t, !0))
    }
    ,
    G.resize = function() {
        this.tab && this.tab.resize(),
        this.tech && this.tech.isShow && this.tech.resize(),
        this.chart && this.chart.resize()
    }
    ,
    G.appendTo = function(t) {
        t.appendChild(this.param.wrap.dom),
        this.resize()
    }
    ,
    G.update = function() {
        this.chart && this.chart.chart && this.chart.chart.update()
    }
    ,
    G.pushData = function(t, e) {
        this.chart && this.chart.chart && this.chart.chart.pushData(t, e)
    }
    ,
    G.callUpApp = function(t) {
        t && t.isCallUp && (this.param.callUpApp.isCall = t.isCallUp)
    }
    ,
    G._calcChartHeight = function() {
        var t = this.param.wrap.dom
          , e = s(t);
        return this.tab && (e -= s(this.tab.dom)),
        this.info && !this.info.isSimple && (e -= s(this.info.dom)),
        e
    }
    ,
    G._calcChartWidth = function() {
        var t = this.param.wrap.dom
          , e = o(t);
        return this.tech && this.tech.isShow && (e = e - o(this.tech.dom) - 1),
        e
    }
    ,
    window.shortClickChart = E,
    u(U, Y),
    P
});
;
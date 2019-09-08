xh5_define("plugins.indicatortab", ["utils.util"], function(utils_util) {
    "use strict";
    function i(i) {
        function o(i) {
            if (!i)
                return void 0;
            utils_util.isArr(i) || (i = [i]);
            for (var n, a = [], e = 0, r = i.length; r > e; e++)
                n = {
                    name: i[e]
                },
                a.push(n);
            return a
        }
        function l() {
            function t(t) {
                e.save({
                    options: {
                        mode: "cookie",
                        path: "/",
                        expires: 71996400
                    },
                    uid: ["kke_indicator_news", (new Date).getTime()].join("|"),
                    key: "kke_indicator_news",
                    value: t
                })
            }
            function n() {
                var t = !1;
                return e.load({
                    options: "cookie",
                    uid: ["kke_indicator_news", (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                    key: "kke_indicator_news"
                }, function(i) {
                    return '"BRAR"' == i ? (t = i,
                    !0) : t = !1
                }, !0),
                t
            }
            function r(t) {
                n() || "k" == i.type && (u.main.ctn = a("span"),
                h.appendChild(u.main.ctn),
                s(t, u.main.ctn),
                o())
            }
            function o() {
                var t, i = f.childNodes, e = i.length;
                if (!n())
                    for (t = 0; e > t; t++)
                        i[t].getAttribute("data-indicator") == u.child.name[0] && (u.child.ctn = a("span"),
                        i[t].appendChild(u.child.ctn),
                        s(u.child, u.child.ctn))
            }
            function l() {
                n() || (u.main.ctn.style.display = u.child.ctn.style.display = "none",
                t(u.child.name[0]))
            }
            function s() {}
            function c(t) {
                h = t
            }
            function d(t) {
                f = t
            }
            var h, f, u = {
                main: {
                    ctn: void 0,
                    position: "absolute",
                    display: "block",
                    text: "",
                    radius: 15
                },
                child: {
                    ctn: void 0,
                    num: 0,
                    left: "0px",
                    position: "relative",
                    display: "none",
                    name: ["BRAR"],
                    text: "",
                    radius: 7
                }
            };
            return {
                cfg: u,
                displayAllCircle: l,
                initChildCircle: o,
                initCircle: r,
                getChildParentCtn: d,
                getMainParentCtn: c
            }
        }
        function s() {
            var n, a, e, o = "data-indicator", l = 50, s = new function() {
                var s = function() {
                    for (var n, e = a.childNodes.length; e--; )
                        n = a.childNodes[e],
                        utils_util.cssUtil.rmCls(n, i.cssclass.active)
                }
                  , c = function(n) {
                    r.preventDefault(n);
                    var a = r.getTarget(n);
                    y = a;
                    var e = a.getAttribute(o);
                    if (w = e,
                    e) {
                        s(),
                        utils_util.cssUtil.adCls(a, i.cssclass.active);
                        for (var l = [].concat(m).concat({
                            name: e
                        }).concat(C), c = b.length; c--; )
                            b[c].tCharts(l, {
                                isexclusive: !0
                            });
                        "\u65e0" == e && (e = "none_indicator"),
                        e == x.cfg.child.name && x.displayAllCircle(),
                        utils_util.suda(i.type + "_" + e)
                    }
                }
                  , h = function(t) {
                    r.preventDefault(t);
                    var i = r.getTarget(t)
                      , n = i.getAttribute("data-dir");
                    d.drawTabs(n),
                    x.initChildCircle()
                };
                this.init = function() {
                    e = utils_util.$C("div"),
                    n = utils_util.$C("div"),
                    a = utils_util.$C("ul"),
                    r.addHandler(e, "click", h),
                    utils_util.xh5_deviceUtil.allowt && r.addHandler(e, "touchend", h),
                    r.addHandler(a, "click", c),
                    utils_util.xh5_deviceUtil.allowt && r.addHandler(a, "touchend", c),
                    i.arrowleft ? (e.style.styleFloat = e.style.cssFloat = "left",
                    e.style.margin = [0, 9, 0, i.posX, ""].join("px "),
                    n.style.margin = [0, i.rightW, 0, i.posX + l, ""].join("px ")) : (e.style.styleFloat = e.style.cssFloat = "right",
                    e.style.margin = [0, i.rightW, 0, 0, ""].join("px "),
                    n.style.margin = [0, l + i.rightW, 0, i.posX, ""].join("px "));
                    var o = a.style;
                    o.listStyle = "none",
                    o.padding = 0,
                    o.margin = 0,
                    n.appendChild(a),
                    v && v.appendChild(e),
                    v && v.appendChild(n),
                    x.getChildParentCtn(a),
                    x.getMainParentCtn(e)
                }
            }
            , c = new function() {
                function n(n) {
                    var a = utils_util.$C("span");
                    return a.className = i.cssclass.arrow,
                    a.innerHTML = n ? "\u25b2" : "\u25bc",
                    a.setAttribute("data-dir", n ? "-1" : "1"),
                    a
                }
                var a, r;
                this.init = function() {
                    a = new n(!0),
                    r = new n,
                    e.appendChild(a),
                    e.appendChild(r)
                }
                ,
                this.changeColor = function(t) {
                    a.style.color = r.style.color = t ? "#000" : "#ccc"
                }
            }
            , d = new function() {
                var e = 0;
                this.activeTab = function() {
                    var n = a.childNodes[i.active];
                    n && (utils_util.cssUtil.adCls(n, i.cssclass.active),
                    y = n,
                    w = n.getAttribute(o))
                }
                ,
                this.drawTabs = function(r) {
                    var l = n.offsetWidth
                      , s = Math.min(7, Math.floor(l / (k + 2)))
                      , d = g.length;
                    c.changeColor(d > s),
                    isNaN(r) && (r = 0);
                    var h = e + r * s;
                    0 > h ? h = 0 : h >= d && (h = e),
                    e = h;
                    for (var f, p = Math.min(d, h + s), v = p - h; a.childNodes.length < v; )
                        f = utils_util.$C("li"),
                        a.appendChild(f);
                    for (; a.childNodes.length > v; )
                        a.removeChild(a.lastChild);
                    for (; p > h; h++) {
                        var m = g[h]
                          , C = u(m) || m;
                        f = a.childNodes[h - e],
                        f.innerHTML = C,
                        f.setAttribute(o, m),
                        f.className = i.cssclass.normal,
                        w === m && utils_util.cssUtil.adCls(f, i.cssclass.active),
                        f.style.width = k + "px"
                    }
                }
            }
            ;
            s.init(),
            c.init(),
            d.drawTabs(),
            d.activeTab()
        }
        function c() {
            var n = ["list-style:none", "float:left", "background:#efefef", "border:1px solid #d5d5d5", "color:#888", "margin-left:-1px", "line-height:" + i.tabheight + "px", "text-align:center", "font-size:12px", "cursor:pointer"];
            n = "." + p.normal + "{" + n.join(";") + "}";
            var a = ["background:#494949; color:#fff; border-color:#999;"];
            a = "." + p.active + "{" + a.join(";") + "}";
            var e = ["float:left; width:20px; cursor:pointer; text-align:center; margin:0 1px; border:1px solid #eee;", "line-height:" + i.tabheight + "px"];
            e = "." + p.arrow + "{" + e.join(";") + "}";
            var r = "." + p.arrow + ":hover {filter:Alpha(Opacity=60);opacity:0.6;}"
              , o = n + a + e + r;
            utils_util.cssUtil.inject(o)
        }
        var d = ["VOLUME", "MACD", "KDJ", "RSI", "BOLL", "WR", "DMI", "BBIBOLL", "ROC", "PSY", "OBV", "WVAD", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI"]
          , h = ["TVOL", "LB"]
          , f = [{
            name: "TFLOW",
            alias: "\u51c0\u4e70\u5165"
        }, {
            name: "LB",
            alias: "\u91cf\u6bd4"
        }, {
            name: "POSITION",
            alias: "\u6301\u4ed3\u91cf"
        }, {
            name: "TZYS",
            alias: "\u6536\u76ca\u5bf9\u6bd4"
        }, {
            name: "DPDKS",
            alias: "\u591a\u7a7a\u6536\u76ca"
        }]
          , u = function(t) {
            for (var i, n, a = f.length; a--; )
                if (n = f[a],
                n.name.toUpperCase() == t.toUpperCase()) {
                    i = n.alias;
                    break
                }
            return i
        }
          , p = {
            normal: "kke_indicators_tab_normal",
            active: "kke_indicators_tab_active",
            arrow: "kke_indicators_tab_arrow"
        };
        i = n({
            posX: 54,
            rightW: 1,
            tabwidth: 61,
            tabheight: 20,
            type: "k",
            domid: void 0,
            charts: void 0,
            tabs: void 0,
            fix: {
                firsts: void 0,
                lasts: void 0
            },
            cssclass: {
                normal: p.normal,
                active: p.active,
                arrow: p.arrow
            },
            arrowleft: !0,
            active: 0
        }, i || {});
        var v = utils_util.$DOM(i.domid)
          , g = i.tabs || ("k" == i.type ? d : h)
          , m = o(i.fix.firsts)
          , C = o(i.fix.lasts)
          , b = i.charts;
        utils_util.isArr(b) || (b = [b]);
        var y, w, k = i.tabwidth, x = new l;
        c(),
        s(),
        "hf_" != i.domid.split("__")[1].substring(0, 3) && x.initCircle({
            display: "block",
            text: 1,
            radius: 15
        }),
        this.getCurrentTab = function() {
            return y
        }
        ,
        this.getCurrentIndicatorName = function() {
            return w
        }
    }
    var n = utils_util.oc
      , a = utils_util.$C
      , e = utils_util.bridge
      , r = utils_util.xh5_EvtUtil;
    return new function() {
        this.VER = "1.2.4",
        KKE.cls.IndicatorTab = i,
        this.get = function(config, callback) {
            var e = new i(config);
            utils_util.isFunc(callback) && callback(e)
        }
    }
});
;xh5_define("plugins.menu", ["utils.util"], function(e) {
    "use strict";
    function t(t) {
        function i(a) {
            var n = "touzi_pc_v2_market_today";
            if (t.user_obj.mt && "cntouzi2" == t.user_obj.mt)
                switch (a) {
                case "ts":
                case "t1":
                    e.suda(n + "_05", null, n);
                    break;
                case "t5":
                    e.suda(n + "_06", null, n);
                    break;
                case "kcl":
                    e.suda(n + "_07", null, n);
                    break;
                case "kdd":
                    e.suda(n + "_08", null, n);
                    break;
                case "kd":
                    e.suda(n + "_09", null, n);
                    break;
                case "kw":
                    e.suda(n + "_10", null, n);
                    break;
                case "km":
                    e.suda(n + "_11", null, n);
                    break;
                case "k5":
                    e.suda(n + "_12", null, n);
                    break;
                case "k15":
                    e.suda(n + "_13", null, n);
                    break;
                case "k30":
                    e.suda(n + "_14", null, n);
                    break;
                case "k60":
                    e.suda(n + "_15", null, n)
                }
        }
        function u(e) {
            r.preventDefault(e),
            r.stopPropagation(e);
            var t = r.getTarget(e);
            if (t.getAttribute("data-a") && (t = t.parentNode),
            L != t || "more" === t.getAttribute("data-view")) {
                L = t;
                var a = t.innerHTML;
                if (a) {
                    if ("more" === t.getAttribute("data-view"))
                        return void I(t);
                    A(),
                    o(f) && (o(f).style.display = "none"),
                    R(t),
                    w.setPPT("none"),
                    F(t),
                    w.chooseTab.tab = t.getAttribute("data-view"),
                    w.re("KKE_MENU_CLICK_TAB", null)
                }
            }
        }
        function p(a) {
            for (var n, o, i = v.length, r = 0; i > r; r++) {
                n = v[r].tChart,
                o = v[r].kChart,
                n && n.hide();
                var s = new Date
                  , l = new Date;
                if (o) {
                    o.show();
                    var c = a.getAttribute("data-view");
                    switch (c) {
                    case "km12":
                        s.setDate(s.getDate() - 264);
                        break;
                    case "km1":
                        s.setDate(s.getDate() - 22);
                        break;
                    case "km3":
                        s.setDate(s.getDate() - 66);
                        break;
                    case "kcl":
                    }
                    if ("km1" == c || "km3" == c || "km12" == c)
                        o.showYTD(),
                        o.dateFromTo(s, l);
                    else if ("ytd" == c)
                        o.showYTD();
                    else if ("kdd" == c)
                        e.suda("m_bs"),
                        ("cnlv1" == t.user_obj.mt || "cnlv2" == t.user_obj.mt || "cntouzi2" == t.user_obj.mt || "cnlv1wap" == t.user_obj.mt) && (O = 1,
                        o.showView("kd"),
                        w.setPPT("block"),
                        o.setDimension({
                            I_V_O: 0
                        }),
                        o.pCharts([{
                            name: t.user_obj.DKpChart
                        }], {
                            isexclusive: !0,
                            noLog: 1
                        }),
                        "cnlv1wap" != t.user_obj.mt ? o.tCharts([{
                            name: t.user_obj.DKtChart
                        }, {
                            name: "volume"
                        }], {
                            isexclusive: !0,
                            noLog: 1
                        }) : o.tCharts([{
                            name: t.user_obj.DKtChart
                        }], {
                            isexclusive: !0,
                            noLog: 1
                        }),
                        "TZY" == t.user_obj.DKpChart && o.setReK(-1),
                        o.setLineStyle({
                            linetype: "solid"
                        }));
                    else if ("k1" == c) {
                        o.showView(c),
                        o.setLineStyle({
                            linetype: "line"
                        }),
                        o.pCharts(null, {
                            toremove: !0,
                            noLog: 1
                        });
                        var u = 60 * s.getTimezoneOffset() * 1e3;
                        s.setTime(s.getTime() + u),
                        s.setHours(s.getHours() + 4),
                        l = new Date(99999,9,9),
                        o.dateFromTo(s, l),
                        KKE.api("patch.forex.newhqtime", {
                            symbol: t.user_obj.symbol,
                            timeSymbol: "sys_time",
                            interval: 30,
                            offset: 30
                        }, function(e) {
                            e && o.pushData({
                                symbol: t.user_obj.symbol,
                                data: e
                            })
                        }),
                        o.showRangeSelector({
                            from: s,
                            to: l
                        })
                    } else {
                        if ("cnlv1" == t.user_obj.mt || "cnlv2" == t.user_obj.mt || "cntouzi2" == t.user_obj.mt || "cnlv1wap" == t.user_obj.mt) {
                            if (O > 0) {
                                O = 0;
                                var p;
                                if ("cnlv1wap" != t.user_obj.mt)
                                    switch (t.user_obj.indicatorTabLogger.h5k && (p = t.user_obj.indicatorTabLogger.h5k.getCurrentIndicatorName()),
                                    p = p || "MACD",
                                    x) {
                                    case "HF":
                                    case "global_index":
                                        o.tCharts([{
                                            name: p
                                        }, {
                                            name: "BLANKCTN"
                                        }], {
                                            isexclusive: !0,
                                            callback: function() {
                                                1 == m && (m = 2,
                                                t.user_obj.indicatorTab(o))
                                            },
                                            noLog: 1
                                        });
                                        break;
                                    default:
                                        o.tCharts([{
                                            name: "VOLUME"
                                        }, {
                                            name: p
                                        }, {
                                            name: "BLANKCTN"
                                        }], {
                                            isexclusive: !0,
                                            callback: function() {
                                                1 == m && (m = 2,
                                                t.user_obj.indicatorTab(o))
                                            },
                                            noLog: 1
                                        })
                                    }
                                else
                                    o.tCharts([{
                                        name: "MACD"
                                    }], {
                                        isexclusive: !0,
                                        noLog: 1
                                    });
                                "kcl" == c ? o.pCharts([], {
                                    isexclusive: !0,
                                    callback: function() {
                                        b.kChart.setCustom.show_underlay_vol && o.setCustom({
                                            show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                        })
                                    },
                                    noLog: 1
                                }) : o.pCharts(b.kChart.pCharts, {
                                    isexclusive: !0,
                                    callback: function() {
                                        b.kChart.setCustom.show_underlay_vol && o.setCustom({
                                            show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                        })
                                    },
                                    noLog: 1
                                }),
                                o.setDimension({
                                    I_V_O: -22
                                })
                            } else
                                "kcl" == c ? o.showView(c) : o.pCharts(b.kChart.pCharts, {
                                    isexclusive: !0,
                                    callback: function() {
                                        b.kChart.setCustom.show_underlay_vol && o.setCustom({
                                            show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                        })
                                    },
                                    noLog: 1
                                });
                            h(t.user_obj.symbol) && a.getAttribute("data-id") && o.setReK("cnlv1wap" == t.user_obj.mt ? 0 : b.kChart.setReK)
                        }
                        o.showView(c),
                        ("forex" == t.user_obj.market || "forex_yt" == t.user_obj.market || "BTC" == t.user_obj.market) && o.pCharts(b.kChart.pCharts, {
                            isexclusive: !0,
                            callback: function() {
                                b.kChart.setCustom.show_underlay_vol && o.setCustom({
                                    show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                })
                            },
                            noLog: 1
                        }),
                        "kcl" !== c && o.setLineStyle({
                            linetype: b.kChart.setLineStyle.linetype
                        })
                    }
                    a.getAttribute("data-id") ? a.childNodes[1] && (a.childNodes[1].style.display = "none") : (a.parentNode && (a.parentNode.style.display = "none"),
                    "CN" != x && "HK" !== x || !a.getAttribute("data-rek") || (o.setReK(Number(a.getAttribute("data-rek"))),
                    E = a.getAttribute("data-rek"),
                    b.kChart.setReK = a.getAttribute("data-rek"),
                    d.save({
                        uid: [t.user_obj.CFGSETTING_IFRAME_PREFIX, (new Date).getTime()].join("|"),
                        key: t.user_obj.CFGSETTING_IFRAME_PREFIX,
                        value: b
                    })))
                } else
                    a.childNodes[1] && (a.childNodes[1].style.display = "none"),
                    "kdd" !== a.getAttribute("data-view") && (m = 2),
                    v[r].initK(null, a.getAttribute("data-view"), a.getAttribute("data-rek")),
                    a.getAttribute("data-rek") && (E = a.getAttribute("data-rek") || _ || 0,
                    a.parentNode && (a.parentNode.style.display = "none"))
            }
        }
        function h(e) {
            return /^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(e)
        }
        e.xh5_EvtDispatcher.call(this);
        var b = t.user_obj.settingCfg
          , v = []
          , g = {
            tab: [{
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
            }, {
                lab: "5\u65e5",
                v: "t5",
                t: "T"
            }, {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
            }, {
                lab: "\u5468K",
                v: "kw",
                t: "K"
            }, {
                lab: "\u6708K",
                v: "km",
                t: "K"
            }, {
                lab: "5\u5206",
                v: "k5",
                t: "K"
            }, {
                lab: "15\u5206",
                v: "k15",
                t: "K"
            }, {
                lab: "30\u5206",
                v: "k30",
                t: "K"
            }, {
                lab: "60\u5206",
                v: "k60",
                t: "K"
            }, {
                lab: "\u66f4\u591a",
                v: "more",
                t: "K"
            }],
            clsName: {
                normal: "kke_menus_tab_normal",
                edage: "kke_menus_tab_edage",
                active: "kke_menus_tab_active",
                active_a: "kke_menus_tab_active_a",
                rek: "kke_menus_tab_rek",
                more: "kke_menus_tab_more",
                up: "kke_menu_tab_up",
                down: "kke_menu_tab_down"
            },
            clsStyle: {
                cnnormal: "{width:39px;height:25px;line-height:25px;margin-top:3px;float:left;background:#EFF5FF;border:1px solid #EFF5FF;color:#08237a;text-align:center;font-size:12px;cursor:pointer;}",
                normal: "{width:43px;height:25px;line-height:25px;margin-top:3px;float:left;background:#EFF5FF;border:1px solid #EFF5FF;color:#08237a;text-align:center;font-size:12px;cursor:pointer;}",
                active: "{background-color:#ffffff;border-top:2px solid #062784;border-left:1px solid #dde4f4;border-right:1px solid #dde4f4;border-bottom:1px solid #ffffff;cursor:pointer;}",
                active_a: "{border-bottom:2px #3990e6 solid;display:inline-block;color:#3990e6;}",
                edage: "{width:100%;height:30px;border-top: 1px solid #dde4f4;border-bottom: 1px solid #dde4f4;background-color: #EFF5FF;position: relative;z-index: 233;}",
                rek: "{list-style:none;border:1px solid #dde4f4;margin-bottom:-1px;height:23px;line-height:23px;text-align:center;cursor:pointer;background-color:#EFF5FF;}"
            }
        }
          , k = {
            normal: "{height:35px;line-height:35px;position:relative;float:left;background:#ffffff;border:1px solid #ffffff;color:#1a1a1a;text-align:center;font-size:14px;cursor:pointer;}",
            active: "{background-color:#ffffff;color:#3990e6;border-left:1px solid #ffffff;border-right:1px solid #ffffff;cursor:default;}",
            active_a: "{border-bottom:2px #3990e6 solid;margin-bottom:-2px;display:inline-block;color:#3990e6;}",
            edage: "{width:100%;height:37px;border-top: 1px solid #dde4f4;border-bottom: 1px solid #dde4f4;background-color: #ffffff;position: relative;z-index: 233;font-weight:bold;}",
            rek: "{list-style:none;border:1px solid #f0f0f0;margin-bottom:-1px;height:33px;line-height:33px;text-align:center;cursor:pointer;background-color:#f0f0f0;color:#1a1a1a;}",
            more: '{position: absolute;width: 13px;height: 9px;background-image:url("//www.sinaimg.cn/cj/finance_images/ua_ico.png");float: left;top:50%;margin-top:-4px;left: 50%;margin-left: 12px;}',
            up: "{background-position: 2px -105px;}",
            down: "{background-position: 2px -78px;}"
        };
        (t.iswap || t.menu_wapmore) && (g.clsStyle = k);
        var f = "KKE_more_" + 12345 * Math.random();
        t = n({
            type: "C",
            tchart: void 0,
            kchart: void 0,
            menu_dom_id: void 0,
            active: 0,
            tab: [{
                lab: "\u5206\u65f6",
                v: "ts",
                t: "T"
            }, {
                lab: "5\u65e5",
                v: "t5",
                t: "T"
            }, {
                lab: "\u65e5K",
                v: "kd",
                t: "K"
            }, {
                lab: "\u5468K",
                v: "kw",
                t: "K"
            }, {
                lab: "\u6708K",
                v: "km",
                t: "K"
            }, {
                lab: "5\u5206",
                v: "k5",
                t: "K"
            }, {
                lab: "15\u5206",
                v: "k15",
                t: "K"
            }, {
                lab: "30\u5206",
                v: "k30",
                t: "K"
            }, {
                lab: "60\u5206",
                v: "k60",
                t: "K"
            }, {
                lab: "\u66f4\u591a",
                v: "more",
                t: "K"
            }],
            tabPosX: 15,
            clsName: {
                edage: g.clsName.edage,
                normal: g.clsName.normal,
                active: g.clsName.active,
                active_a: g.clsName.active_a,
                rek: g.clsName.rek,
                more: g.clsName.more || void 0,
                up: g.clsName.up || void 0,
                down: g.clsName.down || void 0
            },
            menu_rek: void 0,
            cb: void 0,
            me: void 0,
            menu_wapmore: void 0,
            user_obj: {
                symbol: "sh000001"
            },
            more: void 0
        }, t || {}),
        t.me && v.push(t.me);
        var _, w = this, K = o(t.menu_dom_id), C = t.active || 0, y = t.tab || g.tab, T = [], N = [], x = e.market(t.user_obj && t.user_obj.symbol || "sh000001"), S = function(e, a) {
            var n = a.normal
              , o = a.active
              , i = a.edage
              , r = a.rek;
            ("cnlv1" == t.user_obj.mt || "cnlv2" == t.user_obj.mt) && (n = a.cnnormal),
            n = "." + e.normal + n + "\n",
            o = "." + e.active + o + "\n",
            i = "." + e.edage + i + "\n",
            r = "." + e.rek + r + "\n";
            var s = n + o + i + r;
            if (t.iswap || t.menu_wapmore) {
                var c = a.active_a
                  , d = a.active_a
                  , m = a.more
                  , u = a.up
                  , p = a.down;
                c = "." + e.active + " a" + c + "\n",
                d = "." + e.active_a + d + "\n",
                m = "." + e.more + m + "\n",
                u = "." + e.up + u + "\n",
                p = "." + e.down + p + "\n";
                var h = t.iswap ? "" : "." + e.normal + " a:hover" + a.active_a + "\n";
                s += c + d + h + m + u + p
            }
            l.inject(s)
        }, D = function() {
            var e = T[C];
            e && l.adCls(e, t.clsName.active)
        }, A = function() {
            for (var e, a = T.length; a--; )
                e = T[a],
                l.rmCls(e, t.clsName.active),
                l.rmCls(e.childNodes[0], t.clsName.active),
                l.rmCls(e.childNodes[0], t.clsName.active_a);
            for (var n, o = N.length; o--; )
                n = N[o],
                l.rmCls(n.childNodes[0], t.clsName.active_a),
                l.rmCls(n, t.clsName.active)
        };
        this.chooseTab = {
            tye: "T",
            tab: "t1"
        };
        var L, I = function(e) {
            "" == e.childNodes[2].style.display ? (e.childNodes[2].style.display = "none",
            l.rmCls(e.childNodes[1], t.clsName.up),
            l.adCls(e.childNodes[1], t.clsName.down)) : (e.childNodes[2].style.display = "",
            l.rmCls(e.childNodes[1], t.clsName.down),
            l.adCls(e.childNodes[1], t.clsName.up))
        }, R = function(a) {
            if (a.getAttribute("data-id"))
                if ("k5" !== a.getAttribute("data-view") && "k15" !== a.getAttribute("data-view") && "k30" !== a.getAttribute("data-view") && "k60" !== a.getAttribute("data-view") && "km3" !== a.getAttribute("data-view") && "km1" !== a.getAttribute("data-view") && "km12" !== a.getAttribute("data-view") || !t.iswap && !t.menu_wapmore || (l.rmCls(a.parentNode.parentNode.childNodes[1], t.clsName.up),
                l.adCls(a.parentNode.parentNode.childNodes[1], t.clsName.down),
                l.adCls(a.parentNode.parentNode.childNodes[0], t.clsName.active),
                l.adCls(a.parentNode.parentNode.childNodes[0], t.clsName.active_a)),
                t.menu_wapmore)
                    l.adCls(a.childNodes[0], t.clsName.active_a);
                else {
                    var n = e.getCSS(a).color;
                    l.adCls(a, t.clsName.active),
                    a.childNodes[1] && (a.childNodes[1].style.color = n)
                }
            else
                t.menu_wapmore ? l.adCls(a.parentNode.parentNode.childNodes[0], t.clsName.active_a) : l.adCls(a.parentNode.parentNode, t.clsName.active)
        }, F = function(e) {
            var a = v.length;
            if ("T" == e.getAttribute("data-type")) {
                for (var n, o, r = 0; a > r; r++)
                    n = v[r].tChart,
                    o = v[r].kChart,
                    o && o.hide(),
                    n && (n.show(),
                    n.showView(e.getAttribute("data-view")));
                var s;
                "cnlv1wap" != t.user_obj.mt && (t.user_obj.indicatorTabLogger.h5t && (s = t.user_obj.indicatorTabLogger.h5t.getCurrentIndicatorName()),
                ("HF" == x || "global_index" == x) && (s = "X"),
                s || 2 != m || (m = 3,
                t.user_obj.indicatorTab(n))),
                w.chooseTab.tye = "T"
            } else
                w.chooseTab.tye = "K",
                p(e);
            i(e.getAttribute("data-view"))
        }, E = 0, O = 9, M = function() {
            var e = a("div");
            K && K.appendChild(e),
            e.className = t.clsName.edage;
            var n = function(n, o) {
                o = o || 0;
                var i = a("div");
                T.push(i),
                e.appendChild(i),
                i.className = t.clsName.normal,
                i.style.marginLeft = o + "px",
                (t.iswap || t.menu_wapmore) && (i.style.width = 100 / t.tab.length - 1 + "%"),
                i.setAttribute("data-id", "KKE_tab_" + y[n].v),
                i.setAttribute("data-view", y[n].v),
                i.setAttribute("data-type", y[n].t),
                r.addHandler(i, "click", u),
                s.allowt && r.addHandler(i, "touchend", u),
                "kdd" === y[n].v;
                var l = a("a");
                if (l.innerHTML = y[n].lab,
                l.setAttribute("data-a", "a"),
                i.appendChild(l),
                "more" == y[n].v) {
                    var c = a("div");
                    c.setAttribute("data-a", "a"),
                    c.className = t.clsName.more + " " + t.clsName.down,
                    i.appendChild(c)
                }
                return i
            }
              , o = function(e) {
                var a = function(e) {
                    r.preventDefault(e),
                    r.getTarget(e).childNodes[1] && (r.getTarget(e).childNodes[1].style.display = "")
                };
                r.addHandler(e, "touchstart", a),
                r.addHandler(e, "mouseover", a);
                var n = function(e) {
                    r.preventDefault(e);
                    var a = r.getTarget(e)
                      , n = r.getRelatedTarget(e);
                    n && a !== n && c(a, n) || a.childNodes[1] && (a.childNodes[1].style.display = "none"),
                    a.parentNode && a.parentNode.childNodes[1] && a.parentNode.childNodes[0].getAttribute("data-a") && !t.menu_wapmore && (a.parentNode.childNodes[1].style.display = "none")
                };
                r.addHandler(e, "touchend", n),
                r.addHandler(e, "mouseout", n)
            }
              , i = function() {
                for (var e = t.show, a = 0; a < y.length; a++)
                    if (!e || -1 != e.indexOf(y[a].v))
                        switch (y[a].v) {
                        case "kd":
                        case "kw":
                        case "km":
                        case "ky":
                        case "kcl":
                            var i = n(a);
                            t.menu_rek && (h(t.user_obj.symbol) && H(i),
                            "HK" === t.user_obj.market && H(i)),
                            o(i);
                            break;
                        case "more":
                            t.more && (i = n(a),
                            B(i));
                            break;
                        default:
                            t.iswap || t.menu_wapmore ? n(a) : 0 == a ? n(a, t.tabPosX) : n(a)
                        }
            };
            i(),
            S(g.clsName, g.clsStyle),
            D()
        }, H = function(e) {
            var n = a("ul");
            n.style.display = "none",
            n.style.position = "relative",
            n.style.padding = n.style.margin = 0,
            e && e.appendChild(n);
            for (var o = [{
                lab: "\u540e\u590d\u6743",
                v: 1
            }, {
                lab: "\u524d\u590d\u6743",
                v: -1
            }, {
                lab: "\u4e0d\u590d\u6743",
                v: 0
            }], i = 3; i--; ) {
                var s = a("li");
                s.className = t.clsName.rek,
                s.setAttribute("data-rek", o[i].v),
                s.setAttribute("data-view", e.getAttribute("data-view"));
                var l = a("a");
                l.setAttribute("data-a", "a"),
                l.innerHTML = o[i].lab,
                s.appendChild(l),
                n.appendChild(s),
                r.addHandler(e, "touchend", u),
                r.addHandler(e, "click", u)
            }
            var d = function(e) {
                r.preventDefault(e);
                var t = r.getTarget(e).parentNode
                  , a = r.getRelatedTarget(e)
                  , n = r.getTarget(e);
                a && t !== a && c(t, a) || n.getAttribute("data-rek") && (t.style.display = "none"),
                c(t.parentNode, a) || t.getAttribute("data-rek") && (t.parentNode.style.display = "none")
            };
            r.addHandler(n, "touchend", d),
            r.addHandler(n, "mouseout", d)
        }, B = function(e) {
            var n = a("ul");
            n.id = f,
            n.style.display = "none",
            n.style.padding = n.style.margin = 0,
            e && e.appendChild(n);
            for (var o = t.more, i = 0, s = o.length; s > i; i++) {
                var l = o[i]
                  , d = a("li");
                d.className = t.clsName.rek,
                d.setAttribute("data-id", "KKE_tab_" + l.v),
                d.setAttribute("data-view", l.v);
                var m = a("a");
                m.setAttribute("data-a", "a"),
                m.innerHTML = l.lab,
                d.appendChild(m),
                n.appendChild(d),
                r.addHandler(e, "touchend", u),
                r.addHandler(e, "click", u),
                N.push(d)
            }
            if (!t.iswap) {
                var p = function(e) {
                    r.preventDefault(e);
                    var t = r.getTarget(e).parentNode.parentNode
                      , a = r.getRelatedTarget(e)
                      , n = r.getTarget(e).parentNode;
                    a && t !== a && c(t, a) || (n.getAttribute("data-id") && (t.style.display = "none"),
                    t.getAttribute("data-view") && (n.style.display = "none"))
                };
                r.addHandler(n, "touchend", p),
                r.addHandler(n, "mouseout", p)
            }
        };
        M(),
        this.setPPT = function(e) {
            window.chartPPT_panel && (window.chartPPT_panel.style.display = e)
        }
        ,
        this.setTKChart = function(e) {
            v = e
        }
        ,
        this.setTarget = function(e) {
            if (C = e,
            C < T.length) {
                L = T[e],
                A();
                var a = T[C];
                a && l.adCls(a, t.clsName.active);
                for (var n = v.length; n--; ) {
                    var o = v[n].kChart;
                    o && o.showView(y[C].v)
                }
            }
        }
        ,
        this.setCfg = function(e) {
            b = e
        }
        ,
        this.setChart = function(e) {
            if (L && "kdd" !== L.getAttribute("data-view") && (m = 2),
            e && e.k) {
                var a;
                for (a = 0; a < v.length; a++)
                    e.o.symbol == v[a].chartUserobj.symbol && (v[a].kChart = e.k);
                for ("CN" == x && "cnlv1wap" !== t.user_obj.mt && (E = _ = t.user_obj.settingCfg.kChart.setReK),
                a = 0; a < v.length; a++) {
                    var n = v[a].kChart;
                    L && L.view && n.showView(L.view),
                    L && L.getAttribute("data-rek") && ("CN" === x || "HK" === x) && (n.setReK(Number(L.getAttribute("data-rek"))),
                    b.kChart.setReK = L.getAttribute("data-rek"),
                    d.save({
                        uid: [t.user_obj.CFGSETTING_IFRAME_PREFIX, (new Date).getTime()].join("|"),
                        key: t.user_obj.CFGSETTING_IFRAME_PREFIX,
                        value: b
                    })),
                    L && !L.getAttribute("data-rek") && _ && h(t.user_obj.symbol) && "kdd" != L.getAttribute("data-view") && n.setReK(_)
                }
            }
        }
    }
    var a = e.$C
      , n = e.oc
      , o = e.$DOM
      , i = e.isFunc
      , r = e.xh5_EvtUtil
      , s = e.xh5_deviceUtil
      , l = e.cssUtil
      , c = e.$CONTAINS
      , d = e.bridge
      , m = 1;
    return e.fInherit(t, e.xh5_EvtDispatcher),
    new function() {
        this.VER = "1.1.8",
        this.get = function(e, a) {
            var n = new t(e);
            i(a) && a(n)
        }
    }
});
;xh5_define("plugins.compare", ["utils.util"], function(e) {
    function t(t) {
        function l(e) {
            return "string" == typeof e ? e.replace(/\./g, "$") : l(e + "").split(",")
        }
        function r(e) {
            return "string" == typeof e ? e.replace(/\$/g, ".") : r(e + "").split(",")
        }
        function c() {
            var e = y.clsName.edage
              , a = y.clsName.label
              , n = y.clsName.panel
              , i = y.clsName.panel_popup
              , s = y.clsName.list
              , l = y.clsName.dellist
              , r = y.clsName.item
              , c = y.clsName.alert
              , d = y.clsName.button
              , h = y.clsName.input
              , u = "\n";
            t.delistPos && (y.clsStyle = y.weiboclsStyle),
            e = "." + e + y.clsStyle.edage + u,
            a = "." + a + y.clsStyle.label + u,
            s = "." + s + y.clsStyle.list + u,
            l = "." + l + y.clsStyle.dellist + u,
            r = "." + r + y.clsStyle.item + u,
            n = "." + n + y.clsStyle.panel + u,
            i = "." + i + y.clsStyle.popup + u,
            h = "." + h + y.clsStyle.input + u,
            c = "." + c + y.clsStyle.alert + u,
            d = "." + d + y.clsStyle.button;
            var m = "." + y.clsName.button + " a" + y.clsStyle.button_a + u + "." + y.clsName.button + " a:hover" + y.clsStyle.button_a_hover + u
              , p = "." + y.clsName.more + y.clsStyle.more + u
              , b = "." + y.clsName.more + " a" + y.clsStyle.button_a + u + "." + y.clsName.more + " a:hover" + y.clsStyle.button_a_hover + u
              , f = e + a + n + i + d + m + h + s + l + r + p + b + c;
            o.inject(f)
        }
        function d() {
            var e, a = e = '<div id="h5tk_compareLabel_' + t.id + '" class=' + y.clsName.list + "></div>";
            t.delistPos ? a = "" : e = "";
            var n = '<div class="' + y.clsName.edage + '"><h4 class=' + y.clsName.label + '>\u5bf9\u6bd4\uff1a</h4><div class="' + y.clsName.panel + '" id="h5tk_compareIndex_" ' + t.id + '></div><input type="text" id="h5tk_compareTxt_' + t.id + '" class="' + y.clsName.input + '"><span class="' + y.clsName.button + '" id="h5tk_compareBtn_' + t.id + '"><a>\u5bf9\u6bd4</a></span><span class="' + y.clsName.more + '" id="h5tk_comparemoreBtn_' + t.id + '"><a>\u66f4\u591a</a></span><div class="' + y.clsName.alert + '" id="h5tk_compareMsg_' + t.id + '"></div>' + e + "</div>";
            i(t.compare_dom_id).innerHTML = a + n
        }
        function h() {
            C = new k,
            C.bind({
                position: t.position,
                input: "h5tk_compareTxt_" + t.id,
                "default": "\u8f93\u5165\u8bc1\u5238\u4ee3\u7801\u6216\u540d\u79f0",
                width: 280,
                type: "11,12,13,14,15,31,41,71,73,81",
                head: ["\u9009\u9879", "\u7c7b\u578b", "\u4ee3\u7801", "\u4e2d\u6587\u540d\u79f0"],
                body: [-1, -2, 2, 4],
                callback: _
            })
        }
        function u(e, t) {
            i(e).style.display = "block",
            i(e).innerHTML = t,
            clearTimeout(K),
            K = setTimeout(function() {
                i(e).style.display = "none"
            }, S)
        }
        function m(e, n) {
            var o = a("div")
              , l = a("span")
              , r = a("span");
            return o.appendChild(l),
            o.appendChild(r),
            i("h5tk_compareLabel_" + t.id).appendChild(o),
            l.className = y.clsName.dellist,
            r.className = y.clsName.item,
            r.style.color = n,
            r.innerHTML = e.name,
            o.setAttribute("data-symbol", e.symbol),
            s.addHandler(o, "click", function() {
                var e, a = this.getAttribute("data-symbol");
                if (w)
                    for (e = 0; e < w.length; e++)
                        w[e].compare({
                            symbol: a
                        }, !0);
                for (e = T.length - 1; e >= 0; e--)
                    T[e].symbol == a && (T.splice(e, 1),
                    t.color.push(t.color[e]),
                    t.color.splice(e, 1));
                i("h5tk_compareLabel_" + t.id).removeChild(this),
                T.length <= 0 && (i("h5tk_compareLabel_" + t.id).style.display = "none",
                t.delistPos && (i("h5tk_compareTxt_" + t.id).style.width = "396px"))
            }),
            o
        }
        function p(e) {
            KKE && KKE.api("datas.hq.get", {
                symbol: e
            }, function(a) {
                if (!a.data[0].name)
                    return void u("h5tk_compareMsg_" + t.id, L.delist);
                var n = a.data[0].name.length > 4 ? a.data[0].name.substring(0, 4) + ".." : a.data[0].name
                  , o = {
                    symbol: e,
                    name: n
                };
                if (T.push(o),
                m(o, t.color[T.length - 1]),
                w)
                    for (var s = 0; s < w.length; s++)
                        w[s].compare({
                            symbol: e,
                            linecolor: {
                                K_N: t.color[T.length - 1]
                            }
                        });
                i("h5tk_compareLabel_" + t.id).style.display = "block",
                t.delistPos && (i("h5tk_compareTxt_" + t.id).style.width = "126px")
            })
        }
        function b(t, a) {
            var n, i, o = e.market(t), s = "http:";
            switch (o) {
            case "HK":
                n = t.replace("rt_hk", ""),
                n = n.replace("hk", ""),
                i = s + "//stock.finance.sina.com.cn/hkstock/quotes/" + n + ".html";
                break;
            case "US":
                n = t.replace("gb_", ""),
                n = 1 == a ? l(n) : r(n),
                i = s + "//stock.finance.sina.com.cn/usstock/quotes/" + n + ".html";
                break;
            case "OTC":
                n = t,
                i = s + "//stock.finance.sina.com.cn/thirdmarket/quotes/" + n + ".html";
                break;
            case "forex":
                ("DINIW" != t || "USDCNY" != t) && (n = t.replace("fx_", "")),
                i = s + "//finance.sina.com.cn/money/forex/hq/" + n + ".shtml";
                break;
            default:
                n = t,
                i = s + "//finance.sina.com.cn/realstock/company/" + n + "/nc.shtml"
            }
            return {
                symbol: n,
                url: i
            }
        }
        function f(e) {
            var a = b(e, 1).symbol;
            void 0 == a && (a = ""),
            i("h5tk_compareTxt_" + t.id).value = a,
            i("h5tk_compareTxt_" + t.id).setAttribute("data-symbol", e)
        }
        function _(e) {
            if (f(e),
            e === w[0].chartUserobj.symbol)
                return void u("h5tk_compareMsg_" + t.id, L.added);
            if (!e || "\u8f93\u5165\u8bc1\u5238\u4ee3\u7801\u6216\u540d\u79f0" == e)
                return void u("h5tk_compareMsg_" + t.id, L.no);
            if (T.length >= N)
                return void u("h5tk_compareMsg_" + t.id, L.more);
            for (var a = 0; a < T.length; a++)
                if (T[a].symbol == e)
                    return void u("h5tk_compareMsg_" + t.id, L.added);
            x = e,
            p(e)
        }
        function g() {
            s.addHandler(i("h5tk_compareBtn_" + t.id), "click", function() {
                var e = C.stockInfo()
                  , a = i("h5tk_compareTxt_" + t.id).getAttribute("data-symbol");
                if ("" !== a) {
                    for (var n = 0, o = 0; o < e.length; o++)
                        if (a == e[o].symbol) {
                            _(e[o].symbol),
                            n = 1;
                            break
                        }
                    0 == n && _(e[0].symbol)
                }
            });
            var a = e.urlUtil.getMainUrl()
              , n = 0;
            /.*(sina.com.cn|sina.cn).*/.test(a) && (n = 1),
            0 == n && (i("h5tk_comparemoreBtn_" + t.id).style.display = "block"),
            s.addHandler(i("h5tk_comparemoreBtn_" + t.id), "click", function() {
                var e = b(t.userObj.symbol).url;
                window.open(e)
            })
        }
        function v() {
            c(),
            d(),
            h(),
            g()
        }
        var k = function() {
            this._stringOriginalUrl = "//suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@",
            this._stringUrl = "",
            this._elementScriptLoader = null,
            this._elementContainer = null,
            this._stringOriginalValue = "",
            this._stringLastValue = "",
            this._functionCallback = null,
            this._elementLineCurrent = null,
            this._objectHtml = {},
            this._objectData = {},
            this._booleanHideDelay = !1,
            this._stringBrowserType = "",
            this._objectType = {
                11: "A \u80a1",
                12: "B \u80a1",
                13: "\u6743\u8bc1",
                14: "\u671f\u8d27",
                15: "\u503a\u5238",
                21: "\u5f00\u57fa",
                22: "ETF",
                23: "LOF",
                24: "\u8d27\u57fa",
                25: "QDII",
                26: "\u5c01\u57fa",
                31: "\u6e2f\u80a1",
                32: "\u7a9d\u8f6e",
                33: "\u6e2f\u6307\u6570",
                41: "\u7f8e\u80a1",
                42: "\u5916\u671f",
                71: "\u5916\u6c47",
                73: "OTC",
                81: "\u503a\u5238",
                82: "\u503a\u5238"
            },
            this._objectConfig = {
                position: null,
                input: null,
                loader: null,
                value: null,
                "default": null,
                type: 0,
                max: 10,
                width: 220,
                link: null,
                target: "_blank",
                head: ["\u9009\u9879", "\u4ee3\u7801", "\u540d\u79f0"],
                body: [-1, 2, 4],
                fix: {
                    firefox: [1, 1]
                },
                onshow: function() {},
                onhide: function() {},
                hideSelectForIE6: !1,
                callback: null
            },
            this._getElement = function(e) {
                return document.getElementById(e)
            }
            ,
            this._getRandom = function() {
                return (new Date).getTime()
            }
            ,
            this._bind = function(e, t) {
                var a = this;
                return function() {
                    var n = null;
                    if ("undefined" != typeof t) {
                        for (var i = 0; i < arguments.length; i++)
                            t.push(arguments[i]);
                        n = t
                    } else
                        n = arguments;
                    return e.apply(a, n)
                }
            }
            ,
            this._aevent = function(e, t, a) {
                window.addEventListener ? e.addEventListener(t, a, !1) : window.attachEvent && e.attachEvent("on" + t, a)
            }
            ,
            this._position = function() {
                var e = 0
                  , t = 0
                  , a = this._elementInput;
                do {
                    if (e += a.offsetTop || 0,
                    t += a.offsetLeft || 0,
                    "relative" != a.style.position)
                        break;
                    a = a.offsetParent
                } while (a);var n = [1 * this._elementInput.parentNode.style.borderTopWidth.replace("px", ""), 1 * this._elementInput.parentNode.style.borderLeftWidth.replace("px", "")];
                __arrayPositionFix = [0, 0],
                this._elementContainer.style.top != e + "px" && (this._elementContainer.style.top = e - n[0] + __arrayPositionFix[0] + "px"),
                this._elementContainer.style.left != t + "px" && (this._elementContainer.style.left = t - n[1] + __arrayPositionFix[1] + "px");
                var i = this._elementInput.style.borderTopWidth
                  , o = this._elementInput.style.borderBottomWidth
                  , s = this._elementInput.clientHeight;
                s += "" != i ? 1 * i.replace("px", "") : 2,
                s += "" != o ? 1 * o.replace("px", "") : 2,
                this._elementContainer.style.marginTop != s + "px" && (this._elementContainer.style.marginTop = s + "px")
            }
            ,
            this._getType = function(e) {
                return {
                    1: "stock",
                    2: "fund",
                    3: "hk",
                    4: "us"
                }[e.substr(0, 1)]
            }
            ,
            this._fill = function() {
                var e = this._elementInput.value;
                if ("key_" + e in this._objectData && "" != this._objectData["key_" + e]) {
                    null == this._elementContainer && (this._elementContainer = document.createElement("div"),
                    this._elementContainer.style.cssText += "display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:" + this._objectConfig.width + "px; z-index:999;",
                    this._elementInput.parentNode.insertBefore(this._elementContainer, this._elementInput),
                    this._elementContainer.suggest = this),
                    this._position();
                    var t = "";
                    if (t += '<table style="border-collapse:collapse; line-height:18px; border:2px solid #EEE; background-color:#FFF; font-size:12px; text-align:center; color:#999; width:' + (this._objectConfig.width - 2) + 'px;">',
                    null != this._objectConfig.head) {
                        t += '<tr style="background-color:#F3F3F3;">';
                        for (var a in this._objectConfig.head)
                            this._objectConfig.head.hasOwnProperty(a) && (t += "<td>" + this._objectConfig.head[a] + "</td>");
                        t += "</tr>"
                    }
                    for (var n = (this._objectData["key_" + e] || "").replace(/&amp;/g, "&").replace(/;$/, "").split(";"), i = n.length > this._objectConfig.max ? this._objectConfig.max : n.length, o = "parentNode.parentNode.parentNode['suggest']", a = 0; i > a; a++) {
                        var s = n[a].split(",");
                        if (s[-1] = s[0].replace(new RegExp(e.toLowerCase().replace(/(^\s*)|(\s*$)/g, "").replace(/\./g, function(e) {
                            return "\\" + e
                        }),"gi"), function(e) {
                            return '<span style="color:#F00;">' + e + "</span>"
                        }),
                        s[-2] = s[1]in this._objectType ? this._objectType[s[1]] : "\u2014\u2014",
                        null == this._objectConfig.link || "" == this._objectConfig.link)
                            var l = ['<td style="padding:0px;"><span style="display:block; padding:1px;">', "</span></td>"];
                        else {
                            var r = this._objectConfig.link.replace(/@type@/g, this._getType(s[1]) || s[1]).replace(/@code@/g, this._getFullCode(s));
                            for (var c in s)
                                s.hasOwnProperty(c) && (r = r.replace(new RegExp("@" + c + "@","g"), s[c]));
                            var l = ['<td style="padding:0px;"><a href="' + r + '" hidefocus="true" onmousedown="return this.parentNode.parentNode.' + o + "['hidepause'](this);\" onclick=\"return this.parentNode.parentNode." + o + '[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="' + this._objectConfig.target + '">', "</a></td>"]
                        }
                        t += '<tr id="' + n[a] + '" style="cursor:pointer;" onmouseover="this.' + o + "['mouseoverLine'](this);\" onmouseout=\"this." + o + "['mouseoutLine'](this);\" onmousedown=\"this." + o + "['setLineMouse'](this);\">";
                        for (var c in this._objectConfig.body)
                            this._objectConfig.body.hasOwnProperty(c) && (t += l[0] + s[this._objectConfig.body[c]] + l[1]);
                        t += "</tr>"
                    }
                    t += "</table>",
                    this._objectHtml["key_" + e] = t,
                    this._elementLineCurrent = null,
                    document.createElement("div"),
                    this._elementContainer.innerHTML = this._objectHtml["key_" + e],
                    this._show(),
                    this._filled()
                } else
                    this._hide()
            }
            ,
            this._color = function(e) {
                var t = "";
                e._booleanArrow && e._booleanMouse ? t = "#F8FBDF" : e._booleanArrow ? t = "#F1F5FC" : e._booleanMouse && (t = "#FCFEDF"),
                e.style.backgroundColor != t && (e.style.backgroundColor = t)
            }
            ,
            this.mouseoverLine = function(e) {
                e._booleanMouse = !0,
                this._color(e)
            }
            ,
            this.mouseoutLine = function(e) {
                e._booleanMouse = !1,
                this._color(e)
            }
            ,
            this.setLineMouse = function(e) {
                this.setLine(e),
                null != this._functionCallback && this._functionCallback(this._elementInput.value, e.id.split(","))
            }
            ,
            this._getFullCode = function(e) {
                var t;
                switch (e[1]) {
                case "11":
                case "12":
                case "13":
                case "14":
                case "15":
                case "21":
                case "22":
                case "23":
                case "24":
                case "25":
                case "26":
                    return e[3];
                case "71":
                    return t = "DINIW" === e[2] || "USDCNY" === e[2] ? e[2] : "fx_s" + e[2];
                case "73":
                    return t = "sb" + e[2];
                case "31":
                case "32":
                case "33":
                    return t = "rt_hk" + e[2];
                case "41":
                    return t = "gb_" + e[2];
                default:
                    return e[2]
                }
            }
            ,
            this.setLine = function(e) {
                var t = e.id.split(",")
                  , a = this._objectConfig.value;
                if (null != a && "" != a) {
                    for (var n = 0; n < t.length; n++)
                        a = a.replace(new RegExp("@" + n + "@","g"), t[n]);
                    var i = a
                } else
                    var i = this._getFullCode(t);
                for (var o = e.id, n = 2; 5 > n; n++)
                    this._objectData["key_" + t[n]] = o + ";";
                this._stringLastValue = i,
                this._elementInput.value = i,
                null != this._elementLineCurrent && (this._elementLineCurrent._booleanArrow = !1,
                this._color(this._elementLineCurrent)),
                e._booleanArrow = !0,
                this._color(e),
                this._elementLineCurrent = e
            }
            ,
            this._show = function() {
                if (null != this._elementContainer) {
                    if (this._elementContainer.style.display = "",
                    this._objectConfig.onshow(),
                    this._objectConfig.hideSelectForIE6 && "ie6" == this._stringBrowserType)
                        for (var e = document.getElementsByTagName("select"), t = 0; t < e.length; t++)
                            e[t].style.visibility = "hidden";
                    if (null != this._objectConfig.position) {
                        var a = window.getComputedStyle(this._elementContainer).height;
                        a = Number(a.replace("px", "")),
                        a && "auto" != a && (this._elementContainer.style.top = -(a + 26) + "px")
                    }
                }
            }
            ,
            this.hidepause = function() {
                this._booleanHideDelay = !0
            }
            ,
            this.hideresume = function() {
                this._booleanHideDelay = !1,
                this._hideNow()
            }
            ,
            this._hide = function() {
                0 == this._booleanHideDelay && this._hideNow()
            }
            ,
            this._hideNow = function() {
                if (null != this._elementContainer && (this._elementContainer.style.display = "none",
                this._objectConfig.onhide(),
                this._objectConfig.hideSelectForIE6 && "ie6" == this._stringBrowserType))
                    for (var e = document.getElementsByTagName("select"), t = 0; t < e.length; t++)
                        e[t].style.visibility = "visible"
            }
            ,
            this._load = function(e, t, a) {
                null == this._elementScriptLoader && (this._elementScriptLoader = document.createElement("div"),
                this._elementScriptLoader.style.display = "none",
                this._elementInput.parentNode.insertBefore(this._elementScriptLoader, this._elementInput));
                var n = "suggestdata_" + this._getRandom()
                  , i = document.createElement("script");
                i.type = "text/javascript",
                i.charset = "gb2312",
                i.src = this._stringUrl.replace("@NAME@", n).replace("@KEY@", encodeURIComponent(e.toLowerCase())),
                i._object = this,
                t && (i._functionCallbackTrue = t),
                a && (i._functionCallbackFalse = a),
                i._stringValue = e,
                i._stringName = n,
                i[document.all ? "onreadystatechange" : "onload"] = function() {
                    if (!document.all || "loaded" == this.readyState || "complete" == this.readyState) {
                        var e = window[this._stringName];
                        "undefined" != typeof e ? (this._object._objectData["key_" + this._stringValue] = e,
                        this._functionCallbackTrue(e),
                        window[this._stringName] = null) : this._functionCallbackFasle && this._functionCallbackFasle(""),
                        this._object = null,
                        this._stringValue = null,
                        this._stringName = null,
                        this[document.all ? "onreadystatechange" : "onload"] = null,
                        this.parentNode.removeChild(this)
                    }
                }
                ,
                this._elementScriptLoader.appendChild(i)
            }
            ,
            this._check = function() {
                var e = this._elementInput.value;
                this._stringLastValue != e ? (this._stringLastValue = e,
                "" != e ? "key_" + e in this._objectData ? this._fill() : this._load(e, this._bind(this._fill), this._bind(this._hide)) : (null != this._elementContainer && (this._elementLineCurrent = null,
                this._elementContainer.innerHTML = ""),
                this._hide())) : this._show()
            }
            ,
            this._eventFocus = function() {
                this._elementInput.value == this._stringOriginalValue && (this._elementInput.value = ""),
                this._stringLastValue = "",
                this._check()
            }
            ,
            this._eventBlur = function() {
                "" == this._elementInput.value && (this._elementInput.value = this._stringOriginalValue),
                this._stringLastValue = "",
                this._hide()
            }
            ,
            this._eventButtonUp = function() {
                this._allData = this._firstData = "undefined";
                var e = arguments[0] || window.event
                  , t = null == this._objectConfig.head ? 0 : 1;
                switch (e.keyCode) {
                case 38:
                    null != this._elementContainer && null != this._elementContainer.firstChild && this.setLine(this._elementContainer.firstChild.rows[this._elementLineCurrent && this._elementLineCurrent.rowIndex != t ? this._elementLineCurrent.rowIndex - 1 : this._elementContainer.firstChild.rows.length - 1]);
                    break;
                case 40:
                    null != this._elementContainer && null != this._elementContainer.firstChild && this.setLine(this._elementContainer.firstChild.rows[this._elementLineCurrent && this._elementLineCurrent.rowIndex != this._elementContainer.firstChild.rows.length - 1 ? this._elementLineCurrent.rowIndex + 1 : t]);
                    break;
                case 13:
                    null != this._elementContainer && (null != this._elementLineCurrent && this.setLine(this._elementLineCurrent),
                    null != this._functionCallback && this._functionCallback(this._elementInput.value, this._elementLineCurrent ? this._elementLineCurrent.id.split(",") : [])),
                    this._hide();
                    break;
                default:
                    this._check()
                }
                this._filled()
            }
            ,
            this._firstData = "undefined",
            this._allData = "undefined",
            this._filled = function() {
                var e = (null == this._objectConfig.head ? 0 : 1,
                this._objectData["key_" + this._elementInput.value]);
                if (e) {
                    for (var t, a, n = e.split(";"), i = [], o = 0; o < n.length; o++)
                        t = n[o].split(","),
                        t[3] = this._getFullCode(t),
                        a = {
                            user: t[0],
                            type: t[1],
                            code: t[2],
                            symbol: t[3],
                            name: t[4],
                            py: t[5]
                        },
                        0 == o && (this._firstData = a),
                        i.push(a);
                    this._allData = i
                }
            }
            ,
            this.stockInfo = function() {
                return this._allData
            }
            ,
            this.getCodeFromCache = function(e) {
                return "key_" + e in this._objectData ? this._objectData["key_" + e] : void 0
            }
            ,
            this.getCode = function(e, t) {
                "key_" + e in this._objectData ? t(this._objectData["key_" + e]) : this._load(e, t, t)
            }
            ,
            this.changeType = function(e) {
                if (this._objectHtml = {},
                this._objectData = {},
                this._elementInput.value = this._stringOriginalValue,
                "undefined" != typeof e) {
                    var t = "";
                    switch (e.toLowerCase()) {
                    case "stock":
                        t = "11,12,13,14,15";
                        break;
                    case "fund":
                        t = "21,22,23,24,25,26";
                        break;
                    case "hkstock":
                        t = "31";
                        break;
                    case "hk":
                        t = "31,33,32";
                        break;
                    case "usstock":
                        t = "41";
                        break;
                    case "us":
                        t = "41,42";
                        break;
                    case "fx":
                        t = "71";
                        break;
                    default:
                        t = e
                    }
                    this._stringUrl = this._stringOriginalUrl.replace("@TYPE@", t)
                } else
                    this._stringUrl = this._stringOriginalUrl.replace("type=@TYPE@&", "");
                this._objectConfig.type = e
            }
            ,
            this.changeLink = function(e) {
                this._objectConfig.link = e,
                this._fill(),
                this._hide()
            }
            ,
            this.clear = function() {
                this._stringLastValue = null,
                this._elementInput.value = "",
                this._check(),
                this._elementInput.value = this._stringOriginalValue
            }
            ,
            this.bind = function(e) {
                if ("undefined" != typeof e)
                    for (var t in e)
                        this._objectConfig[t] = e[t];
                this._elementInput = "string" == typeof this._objectConfig.input ? document.getElementById(this._objectConfig.input) : this._objectConfig.input,
                null != this._objectConfig.loader && (this._elementScriptLoader = "string" == typeof this._objectConfig.loader ? document.getElementById(this._objectConfig.loader) : this._objectConfig.loader),
                this._elementInput && (this._stringOriginalValue = null == this._objectConfig["default"] || "" == this._objectConfig["default"] ? this._elementInput.value : this._objectConfig["default"],
                this.changeType(this._objectConfig.type),
                this._elementInput.value = this._stringOriginalValue,
                this._elementInput.setAttribute("autocomplete", "off"),
                this._elementInput.autoComplete = "off",
                this._aevent(this._elementInput, "focus", this._bind(this._eventFocus)),
                this._aevent(this._elementInput, "blur", this._bind(this._eventBlur)),
                this._aevent(this._elementInput, "keyup", this._bind(this._eventButtonUp)),
                this._aevent(this._elementInput, "mouseup", this._bind(this._eventButtonUp)),
                this._functionCallback = this._objectConfig.callback)
            }
        }
          , y = {
            clsName: {
                edage: "kke_compare_edage",
                label: "kke_compare_label",
                alert: "kke_compare_alert",
                panel: "kke_compare_panel",
                panel_popup: "kke_compare_panel_popup",
                input: "kke_compare_input",
                list: "kke_compare_list",
                dellist: "kke_compare_dellist",
                item: "kke_compare_item",
                button: "kke_compare_button",
                more: "kke_compare_more"
            },
            clsStyle: {
                edage: "{width:100%;position:relative;float:left;margin-left:10px;}",
                label: "{float:left;color:#1a1a1a;font-family:Microsoft Yahei,Arial;font-weight:bold;padding:0;margin:0;}",
                alert: "{position:absolute;display:none;top:-30px; height:25px;line-height:25px;color:#ff0000; padding-left:5px; width:190px;left:60px;border:1px solid #ccc;background:#fff;}",
                panel: "{float:left;}",
                popup: "{float:left;display:none;}",
                input: "{float:left;width:396px;color:#969696;font-family:Microsoft Yahei,Arial;}",
                list: "{height:25px; background:#FFFFFF; line-height:24px; text-align:center;margin-left:55px; display:none;}",
                dellist: "{background:url(//www.sinaimg.cn/cj/yw/img/bg_compare.png) #fff no-repeat 2px -20px; float:left; cursor:pointer; margin:2px 5px 2px 0;width:18px;height:18px;border:1px solid #c4cbcf;}",
                item: "{ float:left;margin-right:30px;margin-bottom:3px;font-size:13px;line-height:24px;text-align:center;color:#f69931;cursor:pointer;}",
                button: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;}",
                more: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;display:none;}",
                button_a: "{display:inline-block;width:50px;border:1px solid #d5d5d5;}",
                button_a_hover: "{background-color:#494949;color:#ffffff;}"
            },
            weiboclsStyle: {
                edage: "{width:100%;position:relative;float:left;margin-left:2px;}",
                label: "{float:left;color:#1a1a1a;font-family:Microsoft Yahei,Arial;font-weight:bold;padding:0;margin:0;}",
                alert: "{position:absolute;display:none;top:-30px; height:25px;line-height:25px;color:#ff0000; padding-left:5px; width:190px;left:36px;border:1px solid #ccc;background:#fff;}",
                panel: "{float:left;}",
                popup: "{float:left;display:none;}",
                input: "{float:left;width:396px;color:#969696;font-family:Microsoft Yahei,Arial;}",
                list: "{height:25px; background:#FFFFFF; line-height:24px; text-align:center;/*margin-left:55px;*/ display:none;}",
                dellist: "{background:url(//www.sinaimg.cn/cj/yw/img/bg_compare.png) #fff no-repeat 0px -22px; float:left; cursor:pointer; margin:4px 1px 2px 1px;width:14px;height:14px;border:1px solid #c4cbcf;}",
                item: "{ float:left;margin-right:10px;margin-bottom:3px;font-size:13px;line-height:24px;text-align:center;color:#f69931;cursor:pointer;}",
                button: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;}",
                more: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;display:none;}",
                button_a: "{display:inline-block;width:50px;border:1px solid #d5d5d5;}",
                button_a_hover: "{background-color:#494949;color:#ffffff;}"
            }
        }
          , w = [];
        t = n({
            clsName: {
                edage: y.clsName.edage,
                normal: y.clsName.label,
                alert: y.clsName.alert,
                list: y.clsName.list,
                dellist: y.clsName.dellist,
                panel: y.clsName.panel,
                button: y.clsName.button,
                more: y.clsName.more,
                panel_popup: y.clsName.panel_popup
            },
            flashDom: void 0,
            delistPos: void 0,
            compare_dom_id: void 0,
            position: null,
            userObj: {
                symbol: "sh000001"
            }
        }, t || null),
        t.id = t.compare_dom_id.split("_")[2],
        w.push(t.tkchart);
        var C, K, x, T = [], N = 4, L = {
            no: "\u8bf7\u9009\u62e9\u8981\u5bf9\u6bd4\u7684\u8bc1\u5238\u4ee3\u7801\u540d\u79f0\u62fc\u97f3",
            added: "\u5df2\u7ecf\u6dfb\u52a0\u4e86\u8be5\u8bc1\u5238",
            delist: "\u6b64\u8bc1\u5238\u5df2\u9000\u5e02",
            more: "\u6700\u591a\u53ef\u5bf9\u6bd45\u53ea\u8bc1\u5238"
        }, S = 2e3;
        v()
    }
    var a = e.$C
      , n = e.oc
      , i = e.$DOM
      , o = e.cssUtil
      , s = e.xh5_EvtUtil
      , l = e.isFunc;
    return new function() {
        this.VER = "1.0.0",
        this.get = function(e, a) {
            var n = new t(e);
            l(a) && a(n)
        }
    }
});
;xh5_define("plugins.userpanel", ["utils.util"], function(e) {
    "use strict";
    function t(e, t, a) {
        a = a || {};
        var n = l(e)
          , o = n.style;
        return a.left && (o.left = a.left),
        a.right && (o.right = a.right),
        a.top && (o.top = a.top),
        a.bottom && (o.bottom = a.bottom),
        a.width && (o.width = a.width),
        a.height && (o.height = a.height),
        t.appendChild(n),
        n
    }
    function a(e) {
        u.preventDefault(e),
        u.stopPropagation(e)
    }
    function n(e) {
        function t(t) {
            p.save({
                options: {
                    mode: "cookie",
                    path: "/",
                    expires: 71996400
                },
                uid: [e.userObj.EXTEND_PERFIX, (new Date).getTime()].join("|"),
                key: e.userObj.EXTEND_PERFIX,
                value: t
            })
        }
        function a() {
            var t = !1;
            return p.load({
                options: "cookie",
                uid: [e.userObj.EXTEND_PERFIX, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                key: e.userObj.EXTEND_PERFIX
            }, function(e) {
                e && (t = e)
            }, !0),
            t
        }
        function n(t) {
            if (a())
                return void (d = []);
            var n = l("span");
            u.cont = n,
            s(t, n),
            c(e.userObj.dom_id).appendChild(n),
            o()
        }
        function o() {
            for (var t = l("span"), a = 0; a < d.length; a++)
                d[a].child = t,
                t.style.display = "none",
                s(d[a], t),
                c(e.userObj.dom_id).appendChild(t)
        }
        function i(e) {
            for (var t = 0; t < d.length; t++)
                d[t].child.style.display = "none"
        }
        function r(e) {
            if (!(d.length <= 0)) {
                for (var a = 0, n = 0; n < d.length; n++)
                    e.name == d[n].name && (d[n].value = 1,
                    d[n].child.style.display = "none"),
                    1 == d[n].value && a++;
                a == d.length && (u.value = d.length,
                u.cont.style.display = "none",
                t("trade"))
            }
        }
        function s() {}
        var d = [{
            right: "0px",
            name: "trade",
            value: 0,
            child: null,
            display: "none",
            text: "",
            radius: 6
        }];
        if (e && "cntouzi2" == e.userObj.mt)
            for (var h = 0; h < d.length; h++)
                ;
        var u = {
            value: 0,
            cont: null
        };
        this.mainCircle = n,
        this.visibleChild = r,
        this.childDisplay = i
    }
    function o(t, a) {
        function n(e, t) {
            for (var a in e)
                e.hasOwnProperty(a) && (e[a] = t + e[a])
        }
        var o = "sinafinancehtml5settingcfgpanel"
          , i = {
            LOADED: "loaded",
            HIDE: "hide",
            EDIT: "edit",
            OPEN: "open",
            DRAGSTART: "dragstart",
            DRAGGING: "dragging"
        };
        n(i, r.CFGSETTING_IFRAME_PREFIX);
        var l, s, d, p, h = 350, m = 344, f = this, g = function(e) {
            var t = e.data;
            if (t)
                switch (t = JSON.parse(t),
                t.cmd) {
                case i.LOADED:
                    a && a();
                    break;
                case i.HIDE:
                    f.hide();
                    break;
                case i.EDIT:
                    var n = t.cmd.split("~")[1];
                    s[n](t.data);
                    break;
                case i.DRAGSTART:
                    d = +l.style.left.replace(/[^0-9.]/g, ""),
                    p = +l.style.top.replace(/[^0-9.]/g, "");
                    break;
                case i.DRAGGING:
                    var o = t.data;
                    l.style.left = d + o.movedX + "px",
                    l.style.top = p + o.movedY + "px"
                }
        }, b = function() {
            if (!l) {
                var a = e.xh5_BrowserUtil.noH5 ? "1px solid #000" : "6px solid rgba(200,200,200,0.6)";
                l = e.iframer({
                    attribute: {
                        id: o,
                        src: t.url
                    },
                    style: {
                        margin: "0 auto",
                        height: m + "px",
                        width: h + "px",
                        border: a,
                        position: "absolute",
                        zIndex: t.z
                    }
                }),
                u.addHandler(window, "message", g);
                var n = function(e) {
                    u.preventDefault(e),
                    u.stopPropagation(e)
                }
                  , i = e.xh5_BrowserUtil.info.name.match(/firefox/i) ? "DOMMouseScroll" : "mousewheel";
                u.addHandler(l, i, n)
            }
        };
        this.sendOriginalData = function(e, t) {
            l && (s = t,
            l.contentWindow.postMessage(JSON.stringify({
                cmd: i.OPEN,
                data: e
            }), "*"))
        }
        ,
        this.isShow = !1,
        this.show = function(e) {
            if (l) {
                var t, a;
                e.changedTouches ? (t = e.changedTouches[0].clientX,
                a = e.changedTouches[0].clientY) : (t = e.clientX,
                a = e.clientY);
                var n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                  , o = c(r.dom_id).offsetWidth;
                a + m + 30 > n && (a = Math.max(n - m - 30, 1)),
                t = t > o ? t - o + (o - h) / 2 : (o - h) / 2,
                l.style.left = t + "px",
                l.style.top = (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop) + a + "px",
                l.style.display = "",
                this.isShow = !0
            }
        }
        ,
        this.hide = function() {
            l.style.display = "none",
            this.isShow = !1
        }
        ,
        b()
    }
    function i(i) {
        function p() {
            function t(e) {
                return ["US", "HK", "forex"].indexOf(e) > -1
            }
            function n(e) {
                H = !0,
                S = +x.left.replace(/[^0-9.]/g, ""),
                D = +x.top.replace(/[^0-9.]/g, ""),
                e.targetTouches ? (L = e.targetTouches[0].clientX,
                A = e.targetTouches[0].clientY) : (L = e.clientX,
                A = e.clientY)
            }
            function o(e) {
                T.cursor = "move",
                H && (e.targetTouches ? (I = e.targetTouches[0].clientX - L,
                E = e.targetTouches[0].clientY - A) : (I = e.clientX - L,
                E = e.clientY - A),
                x.left = +S + +I + "px",
                x.top = +D + +E + "px",
                u.stopPropagation(e)),
                u.preventDefault(e)
            }
            function s() {
                H = !1,
                T.cursor = ""
            }
            function c(e) {
                for (var t = _.length; t--; )
                    if (_[t].value == e)
                        return t
            }
            function d(e, t, a, n) {
                var o = l("div")
                  , i = o.style;
                o.title = e,
                i["float"] = "left",
                i.width = "26px",
                i.height = "26px",
                i.margin = "2px",
                i.border = "1px solid #D7DDEB",
                i.overflow = "hidden",
                F.appendChild(o);
                var r = l("select")
                  , s = r.style;
                s.width = "45px",
                s.height = "26px",
                s.lineHeight = "26px",
                s.margin = 0,
                s.outline = "none",
                s.border = "none",
                s.cursor = "pointer",
                s.textAlign = "start",
                s.font = "18px \u5fae\u8f6f\u96c5\u9ed1",
                s.color = "#747574",
                s.background = "white";
                for (var c = 0, d = t.length; d > c; c++) {
                    var p = l("option");
                    p.value = t[c],
                    p.innerHTML = a[c],
                    n(t[c], p),
                    r.appendChild(p)
                }
                return o.appendChild(r),
                r
            }
            function p(e, t) {
                u.addHandler(e, "click", a),
                e.style.cursor = "not-allowed",
                e.style.backgroundPosition = t.normalPos,
                t.value == y.param.paintTool && y.setPaintTool("Close")
            }
            function h(e) {
                u.removeHandler(e, "click", a),
                e.style.cursor = "pointer"
            }
            function m(e) {
                for (var t = F.querySelectorAll("li"), a = t.length; a--; )
                    for (var n = _.length; n--; )
                        if (_[n].value == t[a].getAttribute("value")) {
                            _[n].konly && (e ? p(t[a], _[n]) : h(t[a]));
                            break
                        }
            }
            var f = t(r.market)
              , g = "//n.sinaimg.cn/finance/chartimg/painttool_icons.png"
              , b = j ? e.getSUrl(g) : g
              , v = b + "?20160713"
              , _ = [{
                name: "\u7ebf\u6bb5",
                value: "Segment",
                normalPos: "-37px -35px",
                lightPos: "-173px -35px"
            }, {
                name: "\u76f4\u7ebf",
                value: "Line",
                normalPos: "-68px -35px",
                lightPos: "-204px -35px"
            }, {
                name: "\u6c34\u5e73\u7ebf",
                value: "Level",
                normalPos: "-6px -97px",
                lightPos: "-142px -97px"
            }, {
                name: "\u5e73\u884c\u7ebf",
                value: "ParallelLine",
                normalPos: "-6px -66px",
                lightPos: "-142px -66px"
            }, {
                name: "\u5e73\u884c\u7ebf\u6bb5",
                value: "ParallelSegment",
                normalPos: "-6px -190px",
                lightPos: "-142px -190px"
            }, {
                name: "\u6ce2\u6d6a\u7ebf",
                value: "Wave",
                normalPos: "-6px -252px",
                lightPos: "-142px -252px"
            }, {
                name: "\u77e9\u5f62",
                value: "Rect",
                normalPos: "-68px -66px",
                lightPos: "-204px -66px"
            }, {
                name: "\u5e73\u884c\u56db\u8fb9\u5f62",
                value: "Parallelogram",
                normalPos: "-37px -190px",
                lightPos: "-173px -190px"
            }, {
                name: "\u4e09\u89d2\u5f62",
                value: "Triangle",
                normalPos: "-37px -252px",
                lightPos: "-173px -252px"
            }, {
                name: "\u5468\u671f\u7ebf",
                value: "CycleLine",
                normalPos: "-37px -66px",
                lightPos: "-173px -66px"
            }, {
                name: "\u6590\u6ce2\u90a3\u5951\u5468\u671f\u7ebf",
                value: "Fibonacci",
                normalPos: "-68px -190px",
                lightPos: "-204px -190px"
            }, {
                name: "\u7ebf\u6027\u56de\u5f52\u5e26(K\u7ebf)",
                value: "LinearRegressionBand",
                normalPos: "-6px -221px",
                lightPos: "-142px -221px",
                konly: !0
            }, {
                name: "\u9ec4\u91d1\u7ebf",
                value: "GoldenSection",
                normalPos: "-37px -221px",
                lightPos: "-173px -221px"
            }, {
                name: "\u767e\u5206\u6bd4\u7ebf",
                value: "PercentLine",
                normalPos: "-68px -221px",
                lightPos: "-204px -221px"
            }, {
                name: "\u6d4b\u91cf\u5c3a",
                value: "Ruler",
                normalPos: "-6px -159px",
                lightPos: "-142px -159px"
            }, {
                name: "\u4e0a\u7bad\u5934",
                value: f ? "GreenUpArrow" : "RedUpArrow",
                normalPos: "-68px -128px",
                lightPos: "-204px -128px"
            }, {
                name: "\u4e0b\u7bad\u5934",
                value: f ? "RedDownArrow" : "GreenDownArrow",
                normalPos: "-37px -128px",
                lightPos: "-173px -128px"
            }, {
                name: "\u81ea\u7531\u7bad\u5934",
                value: "FreeArrow",
                normalPos: "-68px -252px",
                lightPos: "-204px -252px"
            }, {
                name: "\u505c\u6b62\u753b\u56fe",
                value: "Close",
                normalPos: "-6px -35px",
                lightPos: "-142px -35px",
                once: !0
            }, {
                name: "\u7f16\u8f91\u56fe\u5f62",
                value: "Edit",
                normalPos: "-37px -97px",
                lightPos: "-173px -97px"
            }, {
                name: "\u6587\u672c",
                value: "Write",
                normalPos: "-68px -97px",
                lightPos: "-204px -97px"
            }, {
                name: "\u64a4\u9500",
                value: "Revoke",
                normalPos: "-6px -128px",
                lightPos: "-6px -128px",
                once: !0
            }, {
                name: "\u5220\u9664\u9009\u4e2d",
                value: "Delete",
                normalPos: "-37px -159px",
                lightPos: "-173px -159px"
            }, {
                name: "\u6e05\u7a7a",
                value: "Empty",
                normalPos: "-68px -159px",
                lightPos: "-204px -159px",
                once: !0
            }]
              , k = this
              , y = r.paintTool
              , w = l("div")
              , x = w.style;
            x.position = "absolute",
            x.width = "102px",
            x.left = "100px",
            x.top = "100px",
            x.zIndex = 8890;
            var C = l("div")
              , T = C.style;
            T["float"] = "left",
            T.width = "100%",
            T.height = "30px",
            T.lineHeight = "30px",
            T.border = "1px solid #A7BEE4",
            T.boxSizing = "border-box",
            T.mozBoxSizing = "border-box",
            T.webkitBoxSizing = "border-box",
            T.fontSize = "14px",
            T.textIndent = "5px",
            T.backgroundColor = "#CFDEF6",
            T.color = "#3D5E96",
            T.webkitUserSelect = "none",
            T.mozUserSelect = "none",
            T.userSelect = "none",
            C.innerHTML = "\u753b\u56fe\u5de5\u5177";
            var K = l("span")
              , N = K.style;
            N.position = "absolute",
            N.height = "16px",
            N.width = "16px",
            N.right = "4px",
            N.top = "7px",
            N.background = "url(" + v + ") -81px -7px no-repeat",
            N.color = "#759ADC",
            K.title = "\u5173\u95ed",
            K.setAttribute("value", "Close"),
            u.addHandler(K, "mousemove", function(e) {
                e.target.style.cursor = "pointer",
                u.stopPropagation(e)
            }),
            u.addHandler(K, "click", function(e) {
                k.hide(),
                u.stopPropagation(e)
            }),
            C.appendChild(K);
            var S, D, L, A, I, E, H = !1;
            "ontouchend"in window && (u.addHandler(C, "touchstart", n),
            u.addHandler(C, "touchmove", o),
            u.addHandler(C, "touchend", s)),
            u.addHandler(C, "mousedown", n),
            u.addHandler(C, "mousemove", o),
            u.addHandler(C, "mouseup", s),
            u.addHandler(C, "mouseout", s),
            w.appendChild(C);
            var F = l("ul")
              , P = F.style;
            P["float"] = "left",
            P.top = "30px",
            P.width = "100%",
            P.border = "1px solid #D7DCEB",
            P.padding = "4px 2px 4px 2px",
            P.backgroundColor = "#EEF3FD",
            P.boxSizing = "border-box",
            P.mozBoxSizing = "border-box",
            P.webkitBoxSizing = "border-box",
            P.listStyle = "none",
            P.overflow = "hidden",
            P.margin = 0;
            var R = null;
            u.addHandler(F, "click", function(e) {
                if ("LI" == e.target.tagName) {
                    var t, a, n, o = e.target, i = o.style, r = o.getAttribute("value"), l = c(r);
                    if ("undefined" != typeof l)
                        return R && (t = c(R.getAttribute("value")),
                        "undefined" != typeof t && (n = _[t])),
                        a = _[l],
                        r ? void (R ? o == R ? a.once ? y.setPaintTool(r) : (i.backgroundPosition = a.normalPos,
                        y.setPaintTool("Close"),
                        R = null) : (n && (R.style.backgroundPosition = n.normalPos),
                        y.setPaintTool(r),
                        a.once ? (y.setPaintTool("Close"),
                        R = null) : (i.backgroundPosition = a.lightPos,
                        R = o)) : (y.setPaintTool(r),
                        a.once ? y.setPaintTool("Close") : (i.backgroundPosition = a.lightPos,
                        R = o))) : (n && (R.style.backgroundPosition = n.normalPos),
                        R = null,
                        void y.setPaintTool("Close"))
                }
            });
            for (var O = 0, M = _.length; M > O; O++) {
                var B = l("li")
                  , U = B.style;
                U["float"] = "left",
                U.width = "28px",
                U.height = "28px",
                U.margin = "2px",
                U.backgroundImage = "url(" + v + ")",
                U.backgroundRepeat = "no-repeat",
                U.backgroundPosition = _[O].normalPos,
                _[O].value && (B.title = _[O].name,
                B.setAttribute("value", _[O].value),
                B.setAttribute("selected", "false"),
                u.addHandler(B, "mouseover", function(e) {
                    P.cursor = "pointer",
                    e.target.style.boxShadow = "2px 2px 2px #AEC7E3"
                }),
                u.addHandler(B, "mouseout", function(e) {
                    P.cursor = "",
                    e.target.style.boxShadow = ""
                })),
                F.appendChild(B)
            }
            var z = l("div")
              , V = z.style;
            z.title = "\u989c\u8272",
            V["float"] = "left",
            V.border = "2px solid #D7DDEB",
            V.width = "24px",
            V.height = "24px",
            V.margin = "2px",
            V.backgroundColor = y.param.style.strokeStyle,
            u.addHandler(z, "click", function(t) {
                e.colorPicker.show(t.pageX - e.colorPicker.param.width / 2, t.pageY, this, V.backgroundColor)
            }),
            u.addHandler(z, "mouseover", function() {
                V.cursor = "pointer"
            }),
            e.colorPicker.al("ok", function() {
                z == arguments[1][1] && (V.backgroundColor = arguments[1][0].rgb,
                y.setStyle({
                    strokeStyle: arguments[1][0].rgb
                }))
            }),
            F.appendChild(z);
            var X = d("\u5b57\u53f7", ["12px", "18px", "24px"], ["\u5c0f", "\u4e2d", "\u5927"], function(e, t) {
                var a = y.param.style.font;
                a.match(e) && t.setAttribute("selected", "true")
            });
            u.addHandler(X, "change", function() {
                y.setStyle({
                    font: y.param.style.font.replace(/[\s\S]+px/, X.value)
                })
            });
            var G = d("\u7ebf\u5bbd", [1, 2, 4], ["\u7ec6", "\u4e2d", "\u7c97"], function(e, t) {
                var a = y.param.style.lineWidth;
                a == e && t.setAttribute("selected", "true")
            });
            u.addHandler(G, "change", function() {
                y.setStyle({
                    lineWidth: G.value
                })
            }),
            w.appendChild(F),
            x.display = "none",
            document.body.appendChild(w),
            i.menu.al("KKE_MENU_CLICK_TAB", function() {
                k.isShow && m("T" == i.menu.chooseTab.tye)
            }),
            this.isShow = !1,
            this.show = function(e, t) {
                this.isShow || ("undefined" != typeof e && (x.left = e + "px"),
                "undefined" != typeof t && (x.top = t + "px"),
                x.display = "",
                this.isShow = !0,
                m("T" == i.menu.chooseTab.tye))
            }
            ,
            this.hide = function() {
                x.display = "none",
                y.setPaintTool("Close");
                var t;
                R && (t = c(R.getAttribute("value"))),
                e.isNum(t) && (R.style.backgroundPosition = _[t].normalPos,
                R = null),
                this.isShow = !1
            }
        }
        function f() {
            function t() {
                var e = i.chart.tChart || i.chart.kChart;
                return e.getSymbols()[0]
            }
            function a() {
                var e = m.load(F);
                return e ? JSON.parse(e) : void 0
            }
            function n() {
                var e = i.chart.tChart || i.chart.kChart;
                return e.getCurrentData() && (e.getCurrentData().price || e.getCurrentData().close)
            }
            function o() {
                for (var e = n(), t = 0, a = 0, o = 0, i = 0, r = 0, l = 0, s = de.childNodes, c = 1, d = s.length; d > c; c++) {
                    var p = s[c].childNodes
                      , h = Number(p[4].innerHTML);
                    h && ("buy" == p[1].childNodes[0].value ? (t += h,
                    a += +p[3].childNodes[0].value) : (t -= h,
                    a -= +p[3].childNodes[0].value))
                }
                a ? (o = e * a - t,
                i = e - o / Math.abs(a),
                r = i > 0 ? (e - i) / i * 100 : 0,
                l = e * a) : o = -t,
                ue.childNodes[0].innerHTML = a,
                ue.childNodes[1].innerHTML = i.toFixed(3),
                ue.childNodes[2].innerHTML = e,
                ue.childNodes[3].innerHTML = r.toFixed(2),
                ue.childNodes[4].innerHTML = o.toFixed(2),
                ue.childNodes[5].innerHTML = l.toFixed(2),
                v()
            }
            function s(e) {
                ee = !0,
                $ = +B.left.replace(/[^0-9.]/g, ""),
                W = +B.top.replace(/[^0-9.]/g, ""),
                e.targetTouches ? (q = e.targetTouches[0].clientX,
                J = e.targetTouches[0].clientY) : (q = e.clientX,
                J = e.clientY)
            }
            function c(e) {
                z.cursor = "move",
                ee && (e.targetTouches ? (Z = e.targetTouches[0].clientX - q,
                Q = e.targetTouches[0].clientY - J) : (Z = e.clientX - q,
                Q = e.clientY - J),
                B.left = +$ + +Z + "px",
                B.top = +W + +Q + "px",
                u.stopPropagation(e)),
                u.preventDefault(e)
            }
            function d() {
                ee = !1,
                z.cursor = ""
            }
            function p(e) {
                var t = l("span")
                  , a = t.style;
                return a.width = "42px",
                a.height = "24px",
                a.textAlign = "center",
                a.font = j,
                a.lineHeight = "24px",
                a.cursor = "pointer",
                a.margin = "8px 10px 0 0",
                a.textIndent = 0,
                a["float"] = "right",
                a.color = "#494949",
                a.backgroundColor = "#E4E4E4",
                a.borderRadius = "2px",
                t.innerHTML = e,
                u.addHandler(t, "mouseover", function() {
                    a.color = "#fff",
                    a.backgroundColor = "#628BD2"
                }),
                u.addHandler(t, "mouseout", function() {
                    a.color = "#494949",
                    a.backgroundColor = "#E4E4E4"
                }),
                t
            }
            function h() {
                for (var e = [], t = de.childNodes, a = !1, n = 1, o = t.length; o > n; n++) {
                    var i = t[n].childNodes
                      , r = Number(i[4].innerHTML);
                    if (r) {
                        for (var l = [], s = 0; 4 > s; s++)
                            l.push(i[s].childNodes[0].value);
                        e.push(l),
                        a = !0
                    }
                }
                return a ? {
                    ifShow: re.checked,
                    data: e,
                    count: {
                        allVolume: ue.childNodes[0].innerHTML,
                        costPrice: ue.childNodes[1].innerHTML,
                        nowPrice: ue.childNodes[2].innerHTML,
                        profitPercent: ue.childNodes[3].innerHTML,
                        profit: ue.childNodes[4].innerHTML,
                        marketValue: ue.childNodes[5].innerHTML
                    },
                    date: +new Date
                } : void 0
            }
            function f(e, t) {
                return e.toDateString() == t.toDateString()
            }
            function g(e) {
                var t = i.chart.kChart;
                if (t) {
                    for (var a = t.getExtraData({
                        name: "currentK",
                        clone: !1
                    }), n = [], o = [], r = 0, l = e.length; l > r; r++)
                        for (var s = new Date(+new Date(e[r][0]) + 576e5 - 1), c = a.length; c--; ) {
                            if (f(a[c].date, s)) {
                                "buy" == e[r][1] ? n.push([[c, e[r][2]]]) : o.push([[c, e[r][2]]]);
                                break
                            }
                            if (a[c].date < s)
                                break
                        }
                    return {
                        buy: n,
                        sell: o
                    }
                }
            }
            function b(e) {
                !e && (e = t() + "|23"),
                r.paintTool.empty(e, "buyandsell")
            }
            function v() {
                if (r.paintTool && r.paintTool.param) {
                    var e = t() + "|23"
                      , n = t() + "|t";
                    b(e),
                    b(n);
                    var o = r.paintTool.param.shapeListName;
                    if (o == e || o == n) {
                        if (P.isShow && re.checked || !P.isShow) {
                            var i = P.isShow ? h() : a();
                            if (i && i.ifShow)
                                if (o == e) {
                                    var l = g(i.data);
                                    l && (r.paintTool.addShapeList(e, "buyandsell", "UpArrow", l.buy, {
                                        fillStyle: "red"
                                    }),
                                    r.paintTool.addShapeList(e, "buyandsell", "DownArrow", l.sell, {
                                        fillStyle: "green"
                                    }),
                                    r.paintTool.addShapeList(e, "buyandsell", "Level", [[[0, +i.count.costPrice]]], {
                                        strokeStyle: "black"
                                    }))
                                } else
                                    r.paintTool.addShapeList(n, "buyandsell", "Level", [[[0, +i.count.costPrice]]], {
                                        strokeStyle: "black"
                                    })
                        }
                        r.paintTool.paint()
                    }
                }
            }
            function _() {
                var e = l("table")
                  , t = e.style;
                return t.width = "100%",
                t.textAlign = "center",
                t.borderCollapse = "collapse",
                e.border = "0",
                e.cellpadding = "0",
                e.cellspacing = "0",
                e
            }
            function k(e) {
                var t = l("td")
                  , a = t.style;
                if (a.border = "solid 1px #e5e5e5",
                a.textAlign = "center",
                a.font = j,
                e && e.length)
                    for (var n = 0, o = e.length; o > n; n++)
                        t.appendChild(e[n]);
                return t
            }
            function y(e) {
                var t = l("tr")
                  , a = t.style;
                a.height = "30px",
                a.background = "#eef1f8";
                for (var n = 0, o = e.length; o > n; n++) {
                    var i = l("th")
                      , r = i.style;
                    r.font = R,
                    r.border = "solid 1px #e5e5e5",
                    r.textAlign = "center",
                    i.innerHTML = e[n],
                    t.appendChild(i)
                }
                return t
            }
            function w() {
                var e = new Date
                  , t = e.getMonth() + 1
                  , a = e.getDate();
                return 10 > t && (t = "0" + t),
                10 > a && (a = "0" + a),
                [e.getFullYear(), t, a].join("-")
            }
            function x(e) {
                e.font = j,
                e.textAlign = "center",
                e.border = "none",
                e.outline = "none"
            }
            function C(e, t, a, n) {
                for (var o = 0, i = t.length; i > o; o++) {
                    var r = l("option");
                    r.value = t[o][0],
                    a == t[o][0] && (r.selected = !0),
                    r.innerHTML = t[o][1],
                    r.style.font = n,
                    e.appendChild(r)
                }
            }
            function T() {
                var e = l("span")
                  , t = e.style;
                return t.display = "inline-block",
                t.width = "16px",
                t.height = "16px",
                t.lineHeight = "16px",
                t.margin = "2px",
                t.borderRadius = "2px",
                t.color = "#fff",
                t.backgroundColor = "#628BD2",
                t.cursor = "pointer",
                t.userSelect = "none",
                t.webkitUserSelect = "none",
                t.msUserSelect = "none",
                t.mosUserSelect = "none",
                e
            }
            function K(e) {
                var t = u.getEvent(e).target.parentNode.parentNode;
                t.nextSibling ? de.insertBefore(D(), t.nextSibling) : de.appendChild(D())
            }
            function N() {
                var e = de.childNodes[1];
                if (e) {
                    for (var t = e.querySelectorAll("input"), a = t.length; a--; )
                        t[a].value = 0 == a ? w() : "";
                    e.childNodes[4].innerHTML = ""
                } else
                    de.appendChild(D())
            }
            function S(e) {
                var t = u.getEvent(e).target.parentNode.parentNode;
                de.childNodes.length > 2 ? de.removeChild(t) : N(),
                o()
            }
            function D(e) {
                function t() {
                    g.innerHTML = (p.value * m.value).toFixed(2)
                }
                function a() {
                    t(),
                    o()
                }
                var n = l("tr")
                  , i = n.style;
                i.height = "24px";
                var r = l("input")
                  , s = r.style;
                x(s),
                r.setAttribute("type", "date"),
                r.setAttribute("value", e ? e[0] : w()),
                s.width = "120px",
                u.addHandler(r, "input", function(e) {
                    var t = u.getEvent(e).target;
                    t.value = t.value.replace(/[^\d-]/g, "").split(/-+/).slice(0, 3).join("-"),
                    v()
                }),
                n.appendChild(k([r]));
                var c = l("select")
                  , d = c.style;
                x(d),
                C(c, [["buy", "\u4e70\u5165"], ["sell", "\u5356\u51fa"]], e ? e[1] : "", j),
                u.addHandler(c, "change", o),
                n.appendChild(k([c]));
                var p = l("input")
                  , h = p.style;
                x(h),
                p.setAttribute("step", "0.01"),
                p.setAttribute("min", "0"),
                p.setAttribute("max", "99999"),
                h.width = "60px",
                e && (p.value = e[2]),
                u.addHandler(p, "input", function(e) {
                    var t = u.getEvent(e).target;
                    t.value = t.value.replace(/[^\d\.]/g, "").split(/\.+/).slice(0, 2).join("."),
                    t.value > 99999 && (t.value = 99999)
                }),
                n.appendChild(k([p]));
                var m = l("input")
                  , f = m.style;
                x(f),
                m.setAttribute("step", "1"),
                m.setAttribute("min", "0"),
                m.setAttribute("max", "9999999999999"),
                f.width = "100px",
                e && (m.value = e[3]),
                u.addHandler(m, "input", function(e) {
                    var t = u.getEvent(e).target;
                    t.value = t.value.replace(/[^\d]/g, ""),
                    t.value > 9999999999999 && (t.value = 9999999999999)
                }),
                n.appendChild(k([m]));
                var g = k();
                g.style.font = j,
                n.appendChild(g),
                e && t(),
                u.addHandler(p, "input", a),
                u.addHandler(m, "input", a);
                var b = T();
                b.innerHTML = "+",
                u.addHandler(b, "click", K);
                var _ = T();
                return _.innerHTML = "-",
                u.addHandler(_, "click", S),
                n.appendChild(k([b, _])),
                n
            }
            function L() {
                var e = a();
                e ? (I(),
                E(e),
                re.checked = e.ifShow) : N(),
                o()
            }
            function A(e) {
                u.removeHandler(e.childNodes[5].childNodes[0], "click", K),
                u.removeHandler(e.childNodes[5].childNodes[1], "click", S)
            }
            function I() {
                for (var e = de.childNodes, t = e.length - 1; t > 0; t--)
                    A(e[t]),
                    de.removeChild(e[t])
            }
            function E(e) {
                for (var t = e.data, a = 0, n = t.length; n > a; a++)
                    de.appendChild(D(t[a]))
            }
            function H() {
                var e = n();
                e != ge && (o(),
                ge = e)
            }
            var F = "sinatkchart_tradehistory_" + t()
              , P = this
              , j = "12px Arial"
              , R = "14px Arial"
              , O = 1e3
              , M = l("div")
              , B = M.style;
            B.position = "absolute",
            B.width = "580px",
            B.maxHeight = "400px",
            B.overflow = "hidden",
            B.left = "100px",
            B.top = "100px",
            B.zIndex = 8891,
            B.background = "#fff",
            B.border = "6px solid rgba(200, 200, 200, 0.6)";
            var U = l("div")
              , z = U.style;
            z.height = "40px",
            z.width = "100%",
            z.backgroundColor = "#fff",
            z.fontSize = "16px",
            z.fontWeight = "bold",
            z.textIndent = "10px",
            z.lineHeight = "44px",
            U.innerHTML = "\u4ea4\u6613\u65e5\u5fd7",
            M.appendChild(U);
            var V = document.createElement("span")
              , X = V.style;
            X.display = "inline-block",
            X.lineHeight = "12px",
            X.width = "12px",
            X.height = "12px",
            X.border = "1px solid #628BD2",
            X.color = "#628BD2",
            X.borderRadius = "12px",
            X.fontSize = "12px",
            X.cursor = "help",
            X.textAlign = "left",
            X.marginLeft = "5px",
            X.textIndent = "3px",
            V.innerHTML = "?",
            U.appendChild(V);
            var G = document.createElement("div")
              , Y = G.style;
            Y.display = "none",
            Y.position = "absolute",
            Y.width = "240px",
            Y.left = "5px",
            Y.top = "35px",
            Y.padding = "5px",
            Y.border = "1px solid #AEC7E3",
            Y.zIndex = "99999",
            Y.fontSize = "12px",
            Y.fontWeight = "normal",
            Y.lineHeight = "14px",
            Y.backgroundColor = "#fff",
            Y.boxShadow = "2px 2px 2px #AEC7E3",
            U.appendChild(G),
            u.addHandler(V, "mouseover", function(e) {
                var t = e ? e.target || e.srcElement : null;
                t && (G.style.display = "",
                G.innerHTML = "\u201c\u4ea4\u6613\u65e5\u5fd7\u201d\u529f\u80fd\u4f7f\u60a8\u5728\u65e5K\u7ebf\u56fe\u4e2d\u53ef\u89c6\u5316\u7684\u67e5\u770b\u6301\u4ed3\u6210\u672c\u7ebf\u4e0e\u6700\u65b0\u80a1\u4ef7\u7684\u8ddd\u79bb\u3002\u540c\u65f6\uff0c\u60a8\u4e5f\u53ef\u4ee5\u901a\u8fc7\u589e\u52a0\u4e00\u7b14\u201c\u4e70\u5165/\u5356\u51fa\u201d\u64cd\u4f5c\uff0c\u5728\u56fe\u8868\u4e0b\u65b9\u7684\u6c47\u603b\u680f\u4e2d\u5feb\u901f\u770b\u5230\u6b64\u64cd\u4f5c\u540e\u6210\u672c\u4ef7\u3001\u76c8\u4e8f\u6bd4\u7b49\u7684\u53d8\u5316\u60c5\u51b5\uff08\u672a\u8ba1\u7b97\u4f63\u91d1\u548c\u7a0e\u7387\uff09\uff0c\u4e3a\u60a8\u505a\u51fa\u4ea4\u6613\u51b3\u7b56\u63d0\u4f9b\u4fbf\u5229\u3002")
            }),
            u.addHandler(V, "mouseout", function() {
                G.style.display = "none"
            });
            var $, W, q, J, Z, Q, ee = !1;
            "ontouchend"in window && (u.addHandler(U, "touchstart", s),
            u.addHandler(U, "touchmove", c),
            u.addHandler(U, "touchend", d)),
            u.addHandler(U, "mousedown", s),
            u.addHandler(U, "mousemove", c),
            u.addHandler(U, "mouseup", d),
            u.addHandler(U, "mouseout", d);
            var te = p("\u786e\u5b9a");
            u.addHandler(te, "click", function() {
                P.hide();
                var t = h();
                t ? (m.save(F, t),
                SUDA.uaTrack("chart_tradelog", r.symbol + "$$$$" + JSON.stringify(t)),
                e.suda("tradelog")) : m.remove(F),
                v()
            }),
            U.appendChild(te);
            var ae = p("\u53d6\u6d88");
            u.addHandler(ae, "click", function() {
                P.hide(),
                v()
            }),
            U.appendChild(ae);
            var ne = p("\u6e05\u7a7a");
            u.addHandler(ne, "click", function() {
                I(),
                N(),
                o()
            }),
            U.appendChild(ne);
            var oe = l("label")
              , ie = oe.style;
            ie["float"] = "right",
            ie.font = j,
            ie.margin = "12px 10px 0 0",
            ie.textIndent = "0",
            ie.cursor = "pointer",
            oe.innerHTML = "\u7ed8\u5236\u4ea4\u6613\u70b9";
            var re = l("input")
              , le = re.style;
            re.type = "checkbox",
            le.margin = "1px",
            le.verticalAlign = "bottom",
            le["float"] = "left",
            re.checked = !0,
            u.addHandler(re, "change", v),
            oe.appendChild(re),
            U.appendChild(oe);
            var se = l("div")
              , ce = se.style;
            ce.width = "100%",
            ce.maxHeight = "305px",
            ce.overflow = "auto",
            M.appendChild(se);
            var de = _();
            se.appendChild(de),
            de.appendChild(y(["\u65e5\u671f", "\u7c7b\u578b", "\u6210\u4ea4\u4ef7", "\u6210\u4ea4\u91cf", "\u6210\u4ea4\u989d", "\u64cd\u4f5c"]));
            var pe = _()
              , he = ["\u6301\u4ed3\u91cf", "\u6210\u672c\u4ef7", "\u5e02\u4ef7", "\u76c8\u4e8f\u6bd4(%)", "\u76c8\u4e8f", "\u5e02\u503c"]
              , ue = l("tr");
            ue.style.height = "24px";
            for (var me = he.length; me--; )
                ue.appendChild(k());
            pe.appendChild(y(he)),
            pe.appendChild(ue),
            M.appendChild(pe),
            L(),
            B.display = "none",
            document.body.appendChild(M);
            var fe, ge = n();
            this.isShow = !1,
            this.show = function(e, t) {
                this.isShow || (L(),
                "undefined" != typeof e && (B.left = e + "px"),
                "undefined" != typeof t && (B.top = t + "px"),
                B.display = "",
                this.isShow = !0,
                fe = setInterval(H, O))
            }
            ,
            this.hide = function() {
                B.display = "none",
                this.isShow = !1,
                clearInterval(fe)
            }
            ,
            this.repaint = v
        }
        function b(e, t) {
            (23 == t || "t" == t) && (D || (D = new f),
            D.repaint())
        }
        function v() {
            i = s({
                className: G.className,
                css: G.classStyle
            }, i || null)
        }
        function _() {
            var e = "." + i.className.ctn + i.css.ctn
              , t = "." + i.className.fullscreen + i.css.fullscreen
              , a = "." + i.className.fullscreen + ":hover" + i.css.hover
              , n = "." + i.className.more + i.css.more
              , o = "." + i.className.more + ":hover" + i.css.hover
              , r = e + n + o + t + a;
            h.inject(r)
        }
        function k() {
            var t = l("div");
            t.className = i.className.ctn,
            c(i.userObj.dom_id).appendChild(t);
            var n, o = ["click", "touchend"];
            for (X = l("div"),
            X.title = "\u5168\u5c4f\u67e5\u770b",
            X.className = i.className.fullscreen,
            n = o.length; n--; )
                u.addHandler(X, o[n], w);
            if (!e.xh5_BrowserUtil.noH5) {
                var r;
                try {
                    r = document.location.href
                } catch (s) {}
                r && t.appendChild(X)
            }
            var d = l("div");
            d.title = "\u66f4\u591a",
            d.className = i.className.more;
            var p = new U(c(i.userObj.dom_id),i);
            for (n = o.length; n--; )
                u.addHandler(d, o[n], function(e) {
                    u.preventDefault(e),
                    p.isshow ? p.hide() : p.show()
                });
            t.appendChild(d),
            V = l("div"),
            V.style.width = "100%",
            V.style.height = "100%",
            V.style.backgroundColor = e.xh5_BrowserUtil.noH5 ? "#000" : "rgba(0,0,0, 0.7)",
            V.style.position = "fixed",
            V.style.zIndex = 8888,
            V.style.display = "none",
            V.style.top = 0,
            V.style.left = 0,
            u.addHandler(V, "mousewheel", a),
            u.addHandler(V, "DOMMouseScroll", a),
            z = l("div"),
            z.style.backgroundColor = "#fff",
            z.style.width = "96%",
            z.style.height = "98%",
            z.style.top = "1%",
            z.style.left = "2%",
            z.style.zIndex = 8889,
            z.style.position = "fixed",
            z.style.textAlign = "left",
            u.addHandler(z, "mousewheel", a),
            u.addHandler(z, "DOMMouseScroll", a)
        }
        function y() {
            i.userObj.mt && "cntouzi2" == i.userObj.mt && e.suda("touzi_pc_v2_market_today_16", null, "touzi_pc_v2_market_today")
        }
        function w(t) {
            u.preventDefault(t),
            W || (W = !0,
            document.body.appendChild(V),
            document.body.appendChild(z)),
            $ ? (X.title = "\u5168\u5c4f\u67e5\u770b",
            X.style.background = 'url("' + M + '") no-repeat 0px -24px',
            V.style.display = z.style.display = "none",
            Y.insertBefore(c(i.userObj.dom_id), Y.firstChild)) : (X.title = "\u9000\u51fa\u5168\u5c4f",
            X.style.background = 'url("' + M + '") no-repeat -1px 0px',
            V.style.display = z.style.display = "",
            z.appendChild(c(i.userObj.dom_id)),
            e.suda("tool_fullscreen"),
            y()),
            i.chart && i.chart.onresize(),
            $ = !$
        }
        function x(e) {
            return /^sh020\d{3}$/.test(e) ? "bond" : /^sz108\d{3}$/.test(e) ? "bond" : /^sh(009|010)\d{3}$/.test(e) ? "bond" : /^sz10\d{4}$/.test(e) ? "bond" : /^sh(100|110|112|113)\d{3}$/.test(e) ? "bond" : /^sz12\d{4}$/.test(e) ? "bond" : /^sh(105|120|129|139)\d{3}$/.test(e) ? "bond" : /^sz11\d{4}$/.test(e) ? "bond" : "CN"
        }
        function C() {
            var t, a = "";
            switch (i.menu.chooseTab.tab) {
            case "t1":
            case "ts":
                t = "1\u65e5";
                break;
            case "t5":
                t = "5\u65e5";
                break;
            case "kd":
                t = "\u65e5K";
                break;
            case "kw":
                t = "\u5468K";
                break;
            case "km":
                t = "\u6708K";
                break;
            case "k5":
                t = "5\u5206\u949fK";
                break;
            case "k15":
                t = "15\u5206\u949fK";
                break;
            case "k30":
                t = "30\u5206\u949fK";
                break;
            case "k60":
                t = "60\u5206\u949fK";
                break;
            case "kdd":
                t = "\u591a\u7a7a\u65e5K";
                break;
            case "YTD":
                t = "\u4eca\u5e74\u4ee5\u6765\u5e74";
                break;
            case "km1":
                t = "\u4e00\u6708\u5e74";
                break;
            case "km3":
                t = "\u4e09\u6708\u5e74";
                break;
            case "km12":
                t = "\u4e00\u5e74\u5e74";
                break;
            case "kcl":
                t = "\u5e74";
                break;
            default:
                t = ""
            }
            var n, o, r = i.userObj.symbol, l = e.market(r);
            switch (l) {
            case "CN":
                o = r,
                n = "bond" == x(r) ? "//money.finance.sina.com.cn/bond/quotes/" + r + ".html" : "//finance.sina.com.cn/realstock/company/" + r + "/nc.shtml";
                break;
            case "US":
                o = r.replace("gb_", ""),
                o = o.replace("$", ""),
                n = "//stock.finance.sina.com.cn/usstock/quotes/" + o + ".html";
                break;
            case "OTC":
                o = r.replace("sb", ""),
                n = "//stock.finance.sina.com.cn/thirdmarket/quotes/" + r + ".html";
                break;
            case "HK":
                o = r.replace(/rt_hk|hk/, ""),
                n = "//stock.finance.sina.com.cn/hkstock/quotes/" + o + ".html";
                break;
            default:
                n = "//finance.sina.com.cn",
                o = r
            }
            var s = "#\u65b0\u6d6a\u8d22\u7ecf\u884c\u60c5\u56fe#";
            switch (i.menu.chooseTab.tye) {
            case "T":
                i.chart.tChart.shareTo({
                    url: n,
                    wbtext: s + a + "(#" + o + "#)\u884c\u60c5\u8d70\u52bf_" + t + "\u5206\u65f6"
                });
                break;
            case "K":
                i.chart.kChart.shareTo({
                    url: n,
                    wbtext: s + a + "(#" + o + "#)\u884c\u60c5\u8d70\u52bf_" + t + "\u7ebf"
                });
                break;
            default:
                i.chart.tChart.shareTo({
                    url: n,
                    wbtext: s + a + "(#" + o + "#)\u884c\u60c5\u8d70\u52bf"
                })
            }
        }
        function T(e) {
            q = new n(e);
            var t = 55;
            e && "cntouzi2" == e.userObj.mt && (t = 65),
            q.mainCircle({
                h: t,
                display: "block",
                text: 1,
                radius: 15
            })
        }
        function K() {
            v(),
            i.userObj.dom_id && (_(),
            k(),
            T(i))
        }
        var N, S, D, L = !1, A = {
            edit: function(e) {
                L = !1,
                i.chart.setTKChart(e)
            }
        }, I = function(t) {
            N ? (N.sendOriginalData(r.settingCfg, A),
            N.isShow ? N.hide() : (e.suda("tool_setting"),
            N.show(t))) : N = new o({
                url: g,
                z: 9999
            },d(I, null, t)),
            L = !0
        }, E = function(t) {
            S || (S = new p,
            i.chart && r.paintTool && (i.chart.paintTool = r.paintTool)),
            S.isShow ? S.hide() : (e.suda("tool_painter"),
            S.show(t.pageX + 102 < document.body.offsetWidth ? t.pageX + 20 : t.pageX - 122, t.pageY - 65))
        };
        i.chart.al("PAINTTOOL_VIEW_CHANGEED", b);
        var H = function() {
            D || (D = new f),
            D.isShow ? D.hide() : (e.suda("tool_trade"),
            D.show(window.innerWidth / 2 - 290, window.scrollY + window.innerHeight / 2 - 120))
        }
          , F = function() {
            var t = navigator.userAgent || ""
              , a = e.urlUtil.getMainUrl()
              , n = "wangxuan2@staff.sina.com.cn?cc=yangwen@staff.sina.com.cn"
              , o = encodeURIComponent("\u884c\u60c5\u56fe\u610f\u89c1\u53cd\u9988")
              , i = encodeURIComponent("\u3010\u9644\u52a0\u4fe1\u606f\uff0c\u4fbf\u4e8e\u8c03\u8bd5\uff1a\u201c\u8bbf\u95ee\u9875\u9762\u5730\u5740\uff1a" + a + " \u6d4f\u89c8\u5668\u4fe1\u606f\uff1a" + t + "\u201d\u3011\u5982\u60a8\u6709\u4efb\u4f55\u7591\u95ee\u3001\u610f\u89c1\u548c\u5efa\u8bae\uff0c\u53ef\u901a\u8fc7\u7535\u5b50\u90ae\u4ef6\u7684\u65b9\u5f0f\u4e0e\u6211\u4eec\u5efa\u7acb\u8054\u7cfb\uff1a")
              , r = ["mailto:", n, "&subject=", o, "&body=", i].join("");
            window.open(r, "_blank")
        }
          , P = {
            weibo: C,
            qrcode: function(e, t) {
                switch (t.menu.chooseTab.tye) {
                case "K":
                    i.chart.kChart.shareTo({
                        type: "qrcode"
                    });
                    break;
                default:
                case "T":
                    i.chart.tChart.shareTo({
                        type: "qrcode"
                    })
                }
            },
            painter: E,
            trade: H,
            setting: I,
            contact: F
        }
          , j = 0 == location.protocol.indexOf("https:") ? !0 : !1
          , R = [{
            title: "\u504f\u597d\u8bbe\u7f6e",
            p: "setting"
        }];
        e.xh5_BrowserUtil.noH5 || (R = R.concat([{
            title: "\u753b\u56fe\u5de5\u5177",
            p: "painter"
        }, {
            title: "\u4ea4\u6613\u65e5\u5fd7",
            p: "trade"
        }, {
            title: "\u5206\u4eab\u5230\u5fae\u535a",
            p: "weibo"
        }, {
            title: "\u626b\u63cf\u4e8c\u7ef4\u7801",
            p: "qrcode"
        }]));
        var O = "//n.sinaimg.cn/finance/chartimg/chart_setting_icons.png?2017"
          , M = j ? e.getSUrl(O) : O
          , B = {
            show: !1,
            zIndex: 301,
            backgroundColor: "#fff",
            toolList: R,
            toolBox: {
                right: "1px",
                top: "31px"
            },
            toolItem: {
                width: "30px",
                height: "29px"
            },
            toolListBG: {
                setting: 'url("' + M + '") no-repeat 4px -115px',
                painter: 'url("' + M + '") no-repeat 3px -167px',
                trade: 'url("' + M + '") no-repeat 4px -195px',
                weibo: 'url("' + M + '") no-repeat 3px -44px',
                qrcode: 'url("' + M + '") no-repeat 3px -92px',
                contact: 'url("' + M + '") no-repeat 3px -44px'
            }
        }
          , U = function(e, t) {
            this.parent = e,
            this.param = s(B, t || null),
            this._init()
        };
        U.prototype = {
            constructor: U,
            _init: function() {
                var a = this
                  , n = this.param
                  , o = this.parent
                  , i = t("div", o, n.toolBox)
                  , r = i.style
                  , l = n.toolList;
                r.cursor = "pointer",
                r.position = "absolute",
                r.zIndex = n.zIndex,
                r.backgroundColor = n.backgroundColor,
                r.display = n.show ? "" : "none",
                this.isshow = n.show,
                this.wrap = i;
                for (var s = 0, c = l.length; c > s; s++) {
                    var d = l[s]
                      , p = d.p;
                    if (p in P) {
                        var h = t("div", i, n.toolItem);
                        h.title = d.title;
                        var m = h.style;
                        0 == s && (m.borderTop = "1px solid #dde4f4"),
                        m.borderRight = m.borderBottom = m.borderLeft = "1px solid #dde4f4",
                        m.background = n.toolListBG[p],
                        m.backgroundColor = "#f7f7f7",
                        h.setAttribute("tool-type", p)
                    }
                }
                u.addHandler(i, "click", function(t) {
                    var o = P
                      , i = u.getTarget(t).getAttribute("tool-type");
                    ("weibo" == i || "qrcode" == i) && e.suda("tool_" + i),
                    q.visibleChild({
                        name: i
                    }),
                    o[i] && o[i](t, n),
                    a.hide()
                }),
                u.addHandler(i, "mouseover", function(e) {
                    u.getTarget(e).style.filter = "Alpha(Opacity=70)",
                    u.getTarget(e).style.opacity = .7
                }),
                u.addHandler(i, "mouseout", function(e) {
                    u.getTarget(e).style.filter = "",
                    u.getTarget(e).style.opacity = 1
                })
            },
            show: function(t, a) {
                var n = this.wrap
                  , o = n.style;
                this.isshow || ("undefined" != typeof t && (o.left = t + "px"),
                "undefined" != typeof a && (o.top = a + "px"),
                o.display = "",
                this.isshow = !0,
                q.childDisplay(),
                e.suda("tool_more"),
                i.userObj.mt && "cntouzi2" == i.userObj.mt && e.suda("touzi_pc_v2_market_today_17", null, "touzi_pc_v2_market_today"))
            },
            hide: function() {
                this.wrap.style.display = "none",
                this.isshow = !1,
                q.childDisplay(1)
            }
        };
        var z, V, X, G = {
            classStyle: {
                ctn: "{position:absolute;right:0;top:4px;z-index:301;}\n",
                hover: "{filter:Alpha(Opacity=70);opacity:0.7;}\n",
                fullscreen: '{float:left;width:22px;height:22px;cursor:pointer;margin-right:5px;background: url("' + M + '") no-repeat 0px -24px;}\n',
                more: '{float:left;width:22px;height:22px;cursor:pointer;margin-right:5px;background: url("' + M + '") no-repeat 7px -72px;}\n'
            },
            className: {
                ctn: "kke_cfg_ctn",
                fullscreen: "kke_cfg_fullscreen",
                more: "kke_cfg_share"
            }
        }, Y = c(i.userObj.dom_id).parentNode, $ = !1, W = !1;
        window.charttest = {
            fs: w
        };
        var q;
        K(),
        i.chart && (i.chart.showTradeBox = H)
    }
    var r, l = e.$C, s = e.oc, c = e.$DOM, d = e.fBind, p = e.bridge, h = e.cssUtil, u = e.xh5_EvtUtil, m = e.localSL, f = e.isFunc, g = "https://current.sina.com.cn/sinatkchart/settingpanel.html?20161230a";
    return new function() {
        this.VER = "1.2.8",
        this.get = function(e, t) {
            r = e.userObj;
            var a = new i(e);
            f(t) && t(a)
        }
    }
});
;xh5_define("plugins.sinaTKChart", ["utils.util"], function(t) {
    "use strict";
    function e(e) {
        function n(t) {
            return /^sh000001|sz399001|sz399006|sz399415|sz399416|sz399300|sz000300$/.test(t) ? (x.DKpChart = "dpdk",
            x.DKtChart = "dpdks",
            !0) : !1
        }
        function p(t, e) {
            var a = "#f11200"
              , n = "#00a800"
              , o = "#666666";
            if ("US" == x.market || "HK" == x.market || "LSE" === x.market) {
                var i = a;
                a = n,
                n = i
            }
            var r = e ? e : 0
              , s = o;
            return t > r ? s = a : r > t && (s = n),
            s
        }
        function h(t) {
            for (var e = ["USDTRY", "USDZAR", "AUDUSD", "USDCAD", "USDCHF", "USDCNH", "CZKUSD", "DKKUSD", "EURUSD", "GBPUSD", "USDHKD", "USDHUF", "ILSUSD", "USDINR", "USDJPY", "USDMXN", "MYRUSD", "USDNOK", "NZDUSD", "PLNUSD", "USDRUB", "SEKUSD", "SGDUSD", "ARSUSD", "USDPHP", "USDKRW", "USDIDR"], a = e.length; a--; )
                if (t === "fx_s" + e[a].toLowerCase())
                    return !0;
            return !1
        }
        function u(t) {
            var o = {
                api: {
                    t: {},
                    k: {}
                },
                param: {
                    t: {},
                    k: {}
                }
            }
              , i = {
                K_RISE: "#23bc01",
                K_FALL: "#f11200",
                T_RISE: "#23bc01",
                T_FALL: "#f11200",
                F_RISE: "#23bc01",
                F_FALL: "#f11200"
            }
              , r = {
                dim: {},
                menu: {
                    menu_rek: !1,
                    user_obj: x,
                    tab: [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }]
                },
                param: {
                    t: {
                        theme: i
                    },
                    k: {
                        theme: i
                    }
                },
                api: {
                    t: {
                        tCharts: [[{
                            name: "TVOL"
                        }]],
                        setCustom: {
                            show_floater: !1,
                            mousewheel_zoom: !1,
                            touch_prevent: !1
                        }
                    },
                    k: {
                        tCharts: [[{
                            name: "VOLUME"
                        }]],
                        setCustom: {
                            show_floater: !1,
                            touch_prevent: !1
                        },
                        showRangeSelector: {
                            display: !1
                        }
                    }
                }
            }
              , s = {
                dim: {},
                menu: {
                    user_obj: x,
                    menu_rek: !1
                },
                param: {
                    t: {
                        theme: i
                    },
                    k: {
                        theme: i
                    }
                },
                api: {
                    t: {
                        setCustom: {
                            indicator_reheight: !0,
                            allow_indicator_edit: !0,
                            storage_lv: 2
                        },
                        showRangeSelector: {
                            display: !0
                        }
                    },
                    k: {
                        setCustom: {
                            indicator_reheight: !0,
                            allow_indicator_edit: !0,
                            storage_lv: 2
                        },
                        showRangeSelector: {
                            display: !0
                        }
                    }
                }
            };
            if (x.iswap || x.menu && x.menu.menu_wapmore) {
                var l = {
                    tCharts: O,
                    setCustom: {
                        allow_indicator_edit: !0,
                        mousewheel_zoom: !0
                    }
                };
                switch (x.menu && x.menu.menu_wapmore && ("HK" != t && (l.showRangeSelector = {
                    display: !0
                }),
                r.api.t = l,
                r.api.k = {
                    pCharts: [[{
                        name: "MA"
                    }]],
                    tCharts: E,
                    setCustom: {
                        allow_indicator_edit: !0,
                        mousewheel_zoom: !0
                    },
                    showRangeSelector: {
                        display: !0
                    }
                }),
                t) {
                case "OTC":
                    r.param = o.param;
                    break;
                case "global_index":
                    r.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }];
                    break;
                case "op_m":
                    r.menu.tab = [{
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }];
                    break;
                case "US":
                    switch (r.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "5\u65e5",
                        v: "t5",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u66f4\u591a",
                        v: "more",
                        t: "K"
                    }],
                    r.menu.more = [{
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "1\u6708",
                        v: "km1",
                        t: "K"
                    }, {
                        lab: "3\u6708",
                        v: "km3",
                        t: "K"
                    }, {
                        lab: "1\u5e74",
                        v: "km12",
                        t: "K"
                    }],
                    r.api.t.setLineStyle = {
                        linetype: "mountain"
                    },
                    r.api.t.showScale = "pct",
                    x.symbol) {
                    case "gb_dji":
                        x.symbol = "gb_$dji";
                        break;
                    case "gb_ixic":
                        x.symbol = "gb_$ixic";
                        break;
                    case "gb_inx":
                        x.symbol = "gb_$inx"
                    }
                    break;
                case "CN":
                case "REPO":
                    var c = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u66f4\u591a",
                        v: "more",
                        t: "K"
                    }]
                      , m = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "B/S\u70b9",
                        v: "kdd",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u66f4\u591a",
                        v: "more",
                        t: "K"
                    }];
                    r.menu.tab = N(x.symbol) && x.mt && (x.iswap || x.menu && !x.menu.menu_wapmore) ? m : c,
                    r.menu.more = [{
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }],
                    r.param = o.param;
                    break;
                case "HF":
                    r.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }],
                    r.api.t.showScale = "pct",
                    r.param = o.param;
                    break;
                case "HK":
                }
                o = r
            } else {
                switch (t) {
                case "GOODS":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }],
                    s.api.t = {
                        tCharts: [[{
                            name: "TVOL"
                        }, {
                            name: "BLANKCTN"
                        }], {
                            callback: function() {
                                R(T)
                            }
                        }],
                        setCustom: {
                            allow_indicator_edit: !0,
                            storage_lv: 2,
                            mousewheel_zoom: !1
                        }
                    },
                    s.api.t.showScale = "pct",
                    s.param = o.param;
                    break;
                case "LSE":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "ts",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }],
                    s.api.t = {
                        setCustom: {
                            allow_indicator_edit: !0,
                            storage_lv: 2,
                            mousewheel_zoom: !1
                        }
                    },
                    s.api.t.showScale = "pct";
                    break;
                case "BTC":
                    var d = "btc_btcokcoin" == x.symbol ? [{
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }] : [{
                        lab: "1\u5206",
                        v: "k1",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }];
                    s.menu.tab = d,
                    s.param.k.view = "kd";
                    break;
                case "forex":
                case "forex_yt":
                    s.menu.tab = "forex" == t ? [{
                        lab: "1\u5206",
                        v: "k1",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }, {
                        lab: "4H",
                        v: "k240",
                        t: "K"
                    }] : [{
                        lab: "1\u5206",
                        v: "k1",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }],
                    s.param.k.view = h(x.symbol) ? "k1" : "kd",
                    s.param = {
                        t: {
                            theme: null
                        },
                        k: {
                            theme: null
                        }
                    },
                    s.param.k.nfloat = 4;
                    break;
                case "OTC":
                    s.menu.tab = a(e.symbol) ? [{
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }] : [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }],
                    s.param = o.param,
                    s.param.k.candlenum = 70,
                    s.api.t = {
                        tCharts: [[{
                            name: "TVOL"
                        }, {
                            name: "LB"
                        }, {
                            name: "BLANKCTN"
                        }], {
                            callback: function() {
                                R(T)
                            }
                        }],
                        setCustom: {
                            allow_indicator_edit: !0,
                            storage_lv: 2,
                            mousewheel_zoom: !1
                        }
                    };
                    break;
                case "US":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "5\u65e5",
                        v: "t5",
                        t: "T"
                    }, {
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "YTD",
                        v: "ytd",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }],
                    s.api.t.setLineStyle = {
                        linetype: "mountain"
                    },
                    s.api.t.showScale = "pct";
                    break;
                case "HK":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "5\u65e5",
                        v: "t5",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }],
                    s.menu.menu_rek = !0;
                    break;
                case "op_m":
                    s.menu.tab = [{
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }];
                    break;
                case "global_index":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }],
                    s.api.t.setCustom.mousewheel_zoom = !1,
                    s.api.t.showRangeSelector.display = !1;
                    break;
                case "HF":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }],
                    s.api.t.showScale = "pct",
                    s.tchartobject = {
                        t: ["MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                        k: ["MACD", "ASI", "BIAS", "BRAR", "CCI", "DMA", "DMI", "KDJ", "PSY", "ROC", "RSI", "SAR", "TRIX", "WR"]
                    },
                    s.param = o.param,
                    s.api.t.setCustom.mousewheel_zoom = !1,
                    s.api.t.showRangeSelector.display = !1;
                    break;
                case "CN":
                case "REPO":
                    s.menu.tab = x.mt && ("cnlv1" == x.mt || "cnlv2" == x.mt || "cntouzi2" == x.mt) && n(x.symbol) || N(x.symbol) ? [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "5\u65e5",
                        v: "t5",
                        t: "T"
                    }, {
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "B/S\u70b9",
                        v: "kdd",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }] : [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "5\u65e5",
                        v: "t5",
                        t: "T"
                    }, {
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }],
                    s.menu.menu_rek = !0,
                    s.param = o.param;
                    break;
                case "NF":
                    s.menu.tab = [{
                        lab: "\u5206\u65f6",
                        v: "t1",
                        t: "T"
                    }, {
                        lab: "5\u65e5",
                        v: "t5",
                        t: "T"
                    }, {
                        lab: "\u5e74\u7ebf",
                        v: "kcl",
                        t: "K"
                    }, {
                        lab: "\u65e5K",
                        v: "kd",
                        t: "K"
                    }, {
                        lab: "\u5468K",
                        v: "kw",
                        t: "K"
                    }, {
                        lab: "\u6708K",
                        v: "km",
                        t: "K"
                    }, {
                        lab: "\u5e74K",
                        v: "ky",
                        t: "K"
                    }, {
                        lab: "5\u5206",
                        v: "k5",
                        t: "K"
                    }, {
                        lab: "15\u5206",
                        v: "k15",
                        t: "K"
                    }, {
                        lab: "30\u5206",
                        v: "k30",
                        t: "K"
                    }, {
                        lab: "60\u5206",
                        v: "k60",
                        t: "K"
                    }],
                    s.api.t.tCharts = [[{
                        name: "TVOL"
                    }, {
                        name: "POSITION"
                    }, {
                        name: "BLANKCTN"
                    }], {
                        callback: function() {
                            R(T)
                        }
                    }],
                    s.api.t.showScale = "pct",
                    s.param = o.param
                }
                o = s
            }
            return o
        }
        function b(t) {
            for (var e, a = 0; 6 > a; a++)
                e = o("span"),
                e.style.display = "block",
                e.style.styleFloat = "left",
                e.style.cssFloat = "left",
                e.style.width = "33%",
                e.style.lineHeight = "normal",
                t.appendChild(e)
        }
        function v() {
            P.dim = {
                H_T_G: 40,
                H_T_T: 0,
                posX: 55
            },
            z.dim = {
                H_T_G: 40,
                H_T_T: 0,
                posX: 45
            },
            z.candlenum = 45
        }
        function k(t) {
            switch (t) {
            case 0:
            case 1:
            case 2:
                return "t";
            case 23:
            case 24:
            case 25:
                return 23;
            case 167:
            case 168:
            case 169:
                return 167;
            case 719:
            case 720:
            case 721:
                return 719;
            default:
                return t
            }
        }
        function f(e) {
            if (e.info.data) {
                var a = e.info.viewRangeState
                  , n = k(a.viewId);
                if (!isNaN(a.start) && !isNaN(a.end)) {
                    var o, i, r, s, l, c, m = document.getElementById("mainarea_" + e.chart.getChartId());
                    if ("t" == e.type ? (s = e.info.data[0].length,
                    l = [a.start * s, a.end * s - 1],
                    c = e.chart.getSymbols()[0] + "|" + n) : (l = a.dataLength < e.info.minCandleNum ? [0, e.info.minCandleNum - 1] : [a.start, a.end],
                    c = e.chart.getSymbols()[0] + "|" + n),
                    e.info.isCompare ? "t" == e.type ? (i = e.info.data[0][0].prevclose,
                    o = [(e.info.range[0] + 1) * i, (e.info.range[1] + 1) * i]) : (r = e.info.data[0],
                    i = r.close / (1 + r.percent),
                    o = [(e.info.range[1] + 1) * i, (e.info.range[0] + 1) * i]) : o = "t" == e.type ? e.info.range : [e.info.range[1], e.info.range[0]],
                    x.dotTool && "k" == e.type)
                        if (x.dotTool.inited)
                            ~[23, 24, 25, 364, 365, 366].indexOf(n) ? (x.dotTool.show(),
                            x.dotTool.update({
                                zoom: l,
                                domain: o,
                                width: e.info.width,
                                height: e.info.height,
                                top: e.info.top,
                                left: e.info.left,
                                rangeData: e.info.data
                            })) : x.dotTool.hide();
                        else {
                            var d = x.settingCfg.tkChart.showDotTool;
                            x.dotTool.init({
                                parentDiv: m,
                                width: e.info.width,
                                height: e.info.height,
                                top: e.info.top,
                                left: e.info.left,
                                zoom: l,
                                domain: o,
                                rangeData: e.info.data,
                                onclick: function(e) {
                                    t.suda("go_LHB"),
                                    window.open(e.data[0].url)
                                },
                                tip: {
                                    show: !0,
                                    formatter: function(t) {
                                        return t.date + ":\u9f99\u864e\u699c"
                                    }
                                },
                                alwaysHide: d && !d.alwaysShow
                            })
                        }
                    if (x.paintTool)
                        if (x.paintTool.param) {
                            var p = {
                                zoom: l,
                                domain: o,
                                parentDiv: m,
                                width: e.info.width,
                                height: e.info.height,
                                top: e.info.top,
                                left: e.info.left,
                                shapeListName: c
                            };
                            "k" == e.type && (p.data = S.getExtraData({
                                name: "currentK",
                                clone: !1
                            })),
                            x.paintTool.update(p)
                        } else {
                            var h = {
                                shapeListName: c,
                                localStorage: !0,
                                parentDiv: m,
                                width: e.info.width,
                                height: e.info.height,
                                top: e.info.top,
                                left: e.info.left,
                                showZIndex: 35,
                                interactZIndex: 55,
                                zoom: l,
                                domain: e.info.range,
                                style: {
                                    strokeStyle: "#000",
                                    lineWidth: 1
                                },
                                paintOnEachCenter: !0,
                                saveKeyPreName: "sinatkchart_paintSth_",
                                checkIfNotSave: function(t) {
                                    return t && t.match(/sinatkchart_paintSth_[\S]*\|(t|5|15|30|60)/)
                                }
                            };
                            "k" == e.type && (h.data = S.getExtraData({
                                name: "currentK",
                                clone: !1
                            })),
                            x.paintTool.init(h)
                        }
                    n != j && L.re("PAINTTOOL_VIEW_CHANGEED", n),
                    j = n
                }
            }
        }
        function g() {
            var a = (new Date).getTime() + Math.floor(987654321 * Math.random() + 1);
            return {
                charts_dom_id: "KKE_chart_" + a,
                charts_Start: "T",
                charts_hasTChart: !1,
                stock_stutas: void 0,
                compare: {
                    color: ["#f69931", "#f2c700", "#3e4de1", "#bf58ef"],
                    userObj: x,
                    tkchart: L,
                    dis_compare: !1,
                    compare_dom_id: "KKE_compare_" + a,
                    compare_dom_left: "5px",
                    compare_dom_h: 23
                },
                menu: {
                    dis_menu: !0,
                    menu_rek: void 0,
                    menu_wapmore: !1,
                    menu_dom_id: "KKE_menu_" + a,
                    menu_dom_h: 30
                },
                zoom: {
                    zoom_btn: !1
                },
                range: {
                    rangeCon: "",
                    rangeColor: ["#666", "#666", "#666", "#666", "#666", "#666"],
                    rangeLabel: "margin-left:2px;margin-right:1px;border:#ffffff solid 1px;padding: 1px 2px;text-align: center;",
                    rangeValue: "display: inline-block;",
                    range_font: void 0,
                    range_dom_id: "KKE_range_" + a,
                    range_dom_h: 20,
                    dis_range: !0
                },
                dim: {
                    H_T_B: 0,
                    H_BLK: 22,
                    I_V_O: -22
                },
                param: {
                    t: {
                        onrange: function(t) {
                            f({
                                chart: T,
                                info: t,
                                type: "t"
                            })
                        },
                        oninnerresize: function(t) {
                            e.paintTool && e.paintTool.resize(t)
                        },
                        onviewprice: function(e) {
                            if (e.data && r(X.range.range_dom_id)) {
                                var a = e.data
                                  , n = x.iswap || x.menu && x.menu.menu_wapmore ? a.time : a.day
                                  , o = Number(a.volume);
                                Number(o) < 0 && (o = 0),
                                a.price < 0 && (a.price = 0);
                                var i = 2;
                                if (x) {
                                    switch (x.market) {
                                    case "US":
                                    case "HK":
                                        i = x.param && x.param.t && x.param.t.nfloat ? x.param.t.nfloat : t.strUtil.nfloat(a.price);
                                        break;
                                    case "LSE":
                                        i = 3
                                    }
                                    x.param && x.param.t && x.param.t.ennfloat && (i = x.param.t.nfloat || 2)
                                }
                                a.percent = isNaN(a.percent) ? "--" : (100 * a.percent).toFixed(2),
                                o = 0 == o ? 0 : t.strUtil.vs(o, !0);
                                var s = Number(a.avg_price).toFixed(i)
                                  , l = [n, " \u4ef7:", Number(a.price).toFixed(i), " \u5747:", s, " \u91cf:", o, " \u5e45:", a.percent + "%"];
                                if (x) {
                                    var c = x.market;
                                    if ("US" === c && l.splice(3, 2),
                                    "HK" === c) {
                                        var m = x.symbol.length;
                                        x.symbol.substring(m - 1, m) >= "A" && (s = l[4] = "-")
                                    }
                                    ("LSE" === c || "US" === c) && (s = "--")
                                }
                                var d;
                                if (x.iswap || x.menu && x.menu.menu_wapmore) {
                                    var h = r(X.range.range_dom_id).childNodes;
                                    for (d = 0; d < h.length; d++) {
                                        var u;
                                        h[d].innerHTML = "",
                                        l[2 * d] && (u = 0 == d ? l[2 * d] : l[2 * d - 1] + l[2 * d],
                                        h[d].innerHTML = u)
                                    }
                                } else {
                                    var b = e.curname.length > 4 ? e.curname.substring(0, 5) + ".." : e.curname;
                                    (t.isObj(e.data_array) && e.data_array.length > 1 || e.data_array > 1) && (l[0] = l[0] + " [" + b + "] ");
                                    var v, k;
                                    "HF" == x.market ? v = k = "" : (v = '<span style="color:' + W.range.rangeColor[2] + ';" class="' + W.range.rangeLabel + '">\u91cf</span>',
                                    k = '<span class="' + W.range.rangeValue + '">' + o + "</span>");
                                    var f = [l[0], '<span style="color:' + W.range.rangeColor[0] + ';" class="' + W.range.rangeLabel + '">\u4ef7</span>', '<span style="color:' + p(a.change) + ';" class="' + W.range.rangeValue + '">' + Number(a.price).toFixed(i) + "</span>", '<span style="color:' + W.range.rangeColor[1] + ';" class="' + W.range.rangeLabel + '">\u5747</span>', '<span style="color:' + p(a.change) + ';" class="' + W.range.rangeValue + '">' + s + "</span>", v, k, '<span style="color:' + W.range.rangeColor[3] + ';" class="' + W.range.rangeLabel + '">\u5e45</span>', '<span style="color:' + p(a.change) + ';" class="' + W.range.rangeValue + '">' + a.percent + "%</span>"];
                                    if ("cntouzi2" != x.mt)
                                        for (d = 0; d < f.length; d++)
                                            f[d] = f[d].replace('" class="', " "),
                                            f[d] = f[d].replace("class", "style");
                                    r(X.range.range_dom_id).innerHTML = f.join("")
                                }
                            }
                        }
                    },
                    k: {
                        onrange: function(t) {
                            f({
                                chart: S,
                                info: t,
                                type: "k"
                            })
                        },
                        oninnerresize: function(t) {
                            e.paintTool && e.paintTool.resize(t),
                            e.dotTool && e.dotTool.update(t)
                        },
                        onviewprice: function(e) {
                            if (r(X.range.range_dom_id)) {
                                var a = e.data
                                  , n = a.close / (1 + Number(a.percent));
                                a.percent = isNaN(a.percent) ? "--" : (100 * a.percent).toFixed(2),
                                a.ampP = isNaN(a.ampP) ? "--" : (100 * a.ampP).toFixed(2);
                                var o = Number(a.volume);
                                o = 0 == o ? 0 : t.strUtil.vs(o, !0);
                                var i = "";
                                if (D && "CN" == x.market && N(x.symbol) || "HK" === x.market) {
                                    var s = 0;
                                    d.load({
                                        uid: [x.CFGSETTING_IFRAME_PREFIX, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                                        key: x.CFGSETTING_IFRAME_PREFIX
                                    }, function(t) {
                                        if (s = t ? JSON.parse(t).kChart.setReK : 0,
                                        "kd" == D.chooseTab.tab || "kw" == D.chooseTab.tab || "km" == D.chooseTab.tab || "kcl" == D.chooseTab.tab)
                                            switch (s) {
                                            case "0":
                                                i = "";
                                                break;
                                            case "1":
                                                i = '<span style="color:#ff0000">[\u540e\u590d\u6743]</span>';
                                                break;
                                            case "-1":
                                                i = '<span style="color:#ff0000">[\u524d\u590d\u6743]</span>'
                                            }
                                        else
                                            "kdd" == D.chooseTab.tab && (i = '<span style="color:#ff0000">[\u524d\u590d\u6743]</span>')
                                    }, !0)
                                }
                                if (e.data_array.length > 1) {
                                    var l = e.curname.length > 4 ? e.curname.substring(0, 5) + ".." : e.curname;
                                    i = '<span style="color:#000000">[' + l + "]</span>"
                                }
                                var c = [a.day, " ", a.time || "", i, " \u5f00:", a.open.toFixed(2), " \u9ad8:", a.high.toFixed(2), " \u5e45:", a.percent + "%", " \u6536:", a.close && a.close.toFixed(2), " \u4f4e:", a.low.toFixed(2), " \u91cf:", o];
                                if (x.iswap || x.menu && x.menu.menu_wapmore) {
                                    var m = r(X.range.range_dom_id).childNodes;
                                    c.splice(0, 4),
                                    c.unshift(a.day);
                                    for (var h, u = 0, b = m.length; b > u; u++)
                                        h = 0 == u ? c[2 * u] : c[2 * u - 1] + c[2 * u],
                                        m[u].innerHTML = h
                                } else {
                                    var v, k;
                                    "HF" == x.market ? v = k = "" : (k = '<span style="color:' + W.range.rangeColor[4] + ';" class="' + W.range.rangeLabel + '">\u91cf</span>',
                                    v = '<span class="' + W.range.rangeValue + '">' + o + "</span>");
                                    var f = [c[0], '<span style="color:' + W.range.rangeColor[0] + ';" class="' + W.range.rangeLabel + '">\u5f00</span>', '<span style="color:' + p(a.open, n) + ';" class="' + W.range.rangeValue + '">' + a.open.toFixed(2) + "</span>", '<span style="color:' + W.range.rangeColor[1] + ';" class="' + W.range.rangeLabel + '">\u9ad8</span>', '<span style="color:' + p(a.high, n) + ';" class="' + W.range.rangeValue + '">' + a.high.toFixed(2) + "</span>", '<span style="color:' + W.range.rangeColor[2] + ';" class="' + W.range.rangeLabel + '">\u6536</span>', '<span style="color:' + p(a.close, n) + ';" class="' + W.range.rangeValue + '">' + a.close.toFixed(2) + "</span>", '<span style="color:' + W.range.rangeColor[3] + ';" class="' + W.range.rangeLabel + '">\u4f4e</span>', '<span style="color:' + p(a.low, n) + ';" class="' + W.range.rangeValue + '">' + a.low.toFixed(2) + "</span>", k, v, '<span style="color:' + p(a.change) + ';margin-left: 4px;;" class="' + W.range.rangeValue + '">' + a.percent + "%</span>"];
                                    if ("CN" !== x.market || 23 !== j && 24 !== j && 25 !== j || !t.isCNK(x.symbol) || a.postVol && (f = f.concat(['<span style="color:' + W.range.rangeColor[4] + ';" class="' + W.range.rangeLabel + '">\u76d8\u540e\u91cf|\u989d</span>', '<span class="' + W.range.rangeValue + '">' + (0 === a.postVol ? 0 : t.strUtil.vs(a.postVol, !0)) + " " + (0 === a.postAmt ? 0 : t.strUtil.vs(a.postAmt, !0)) + "</span>"])),
                                    "cntouzi2" != x.mt)
                                        for (u = 0; u < f.length; u++)
                                            f[u] = f[u].replace('" class="', " "),
                                            f[u] = f[u].replace("class", "style");
                                    r(X.range.range_dom_id).innerHTML = f.join("")
                                }
                            }
                        }
                    }
                },
                api: {
                    t: {
                        setCustom: {
                            show_underlay_vol: !1
                        },
                        tCharts: O
                    },
                    k: {
                        setCustom: {
                            show_underlay_vol: !1
                        },
                        pCharts: [[{
                            name: "MA"
                        }]],
                        tCharts: E
                    }
                }
            }
        }
        function K(t) {
            for (var e = [], a = 0, n = t.length; n > a; a++)
                e.push({
                    date: t[a].dt.replace(/-/g, "/"),
                    data: [{
                        url: t[a].url
                    }]
                });
            return e
        }
        function _() {
            var t = h(x.symbol) ? "k1" : "kd";
            "k1" != t && C({
                view: t
            });
            var e = new Date
              , a = new Date;
            "k1" == t && S.showView("k1", {
                callback: function() {
                    S.setLineStyle({
                        linetype: "line"
                    }),
                    S.pCharts(null, {
                        toremove: !0,
                        noLog: 1
                    });
                    var t = 60 * e.getTimezoneOffset() * 1e3;
                    e.setTime(e.getTime() + t),
                    e.setHours(e.getHours() + 4),
                    a = new Date(99999,9,9),
                    S.dateFromTo(e, a),
                    KKE.api("patch.forex.newhqtime", {
                        symbol: x.symbol,
                        timeSymbol: "sys_time",
                        interval: 30,
                        offset: 30
                    }, function(t) {
                        t && S.pushData({
                            symbol: x.symbol,
                            data: t
                        }),
                        S.pCharts(null, {
                            toremove: !0,
                            noLog: 1
                        })
                    })
                }
            })
        }
        function w() {
            m.get("kke_CnLv1_PPT_v2") || !x.mt || "cnlv1" != x.mt && "cnlv2" != x.mt || KKE.api("tools.pptsetting.get", function() {
                KKE.api("ppt.ppt.get", {
                    menu: D,
                    userObj: x
                }, null)
            }, null)
        }
        function y() {
            KKE.api("plugins.paintSth.get", {}, function(t) {
                x.paintTool = t,
                t.bind("save", function() {
                    try {
                        var t = JSON.parse(arguments[1]);
                        for (var e in t)
                            if (t.hasOwnProperty(e))
                                for (var a = t[e].length; a--; )
                                    delete t[e][a].style;
                        SUDA.uaTrack("chart_draw", encodeURIComponent(arguments[0]) + "$$$$" + encodeURIComponent(JSON.stringify(t)))
                    } catch (n) {}
                })
            }),
            x.uParam = W.menu.menu_dom_h + 2 + W.range.range_dom_h,
            KKE.api("plugins.userpanel.get", {
                userObj: x,
                chartId: W.domid,
                menu: D,
                chart: L
            }, function() {})
        }
        function C(t) {
            if (!W.iswap && !W.menu.menu_wapmore) {
                for (var e = 0; e < W.menu.tab.length; e++) {
                    var a = W.menu.tab[e].v;
                    if (a == t.view) {
                        !t.active && (t.active = e);
                        break
                    }
                }
                D && (D.chooseTab.tye = "t" == t.view.substring(0, 1) ? "T" : "K",
                D.setTarget(t.active || 0))
            }
        }
        t.xh5_EvtDispatcher.call(this);
        var T, S, D, L = this, x = e;
        this.me = L;
        var I = {}
          , R = function(t) {
            var e, a, n, o, i = t.getChartId(), r = "blankctn_" + i, s = t.type;
            if ("h5k" == s) {
                switch (e = "HF" != x.market ? ["\u65e0", "MACD", "KDJ", "RSI", "BOLL", "WR", "DMI", "BBIBOLL", "ROC", "PSY", "OBV", "WVAD", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI", "VR", "EMV", "BRAR"] : ["\u65e0", "MACD", "KDJ", "RSI", "BOLL", "WR", "DMI", "BBIBOLL", "ROC", "PSY", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI", "BRAR"],
                x.market) {
                case "HF":
                case "forex":
                case "forex_yt":
                case "BTC":
                case "global_index":
                    a = "\u65e0";
                    break;
                default:
                    a = "VOLUME"
                }
                o = 1,
                n = "k"
            } else {
                switch (o = 60,
                x.market) {
                case "HF":
                case "global_index":
                    e = ["\u65e0", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                    a = "\u65e0";
                    break;
                case "NF":
                    e = ["\u65e0", "POSITION", "LB", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                    a = "TVOL";
                    break;
                default:
                    e = "cnlv2" == x.mt ? ["\u65e0", "TFLOW", "LB", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"] : ["\u65e0", "LB", "MACD", "BOLL", "RSI", "BBIBOLL", "ROC", "TRIX", "DMA", "EXPMA", "BIAS", "VR"],
                    a = "TVOL"
                }
                n = "t"
            }
            KKE.api("plugins.indicatortab.get", {
                charts: [t],
                rightW: o,
                fix: {
                    firsts: [a],
                    lasts: ["BLANKCTN"]
                },
                tabs: e,
                active: 1,
                type: n,
                domid: r
            }, function(t) {
                I[s] = t
            })
        }
          , A = {
            kChart: {
                pCharts: [{
                    name: "MA"
                }],
                setCustom: {
                    centerZoom: !0,
                    history_t: "window",
                    show_k_rangepercent: !0,
                    show_ext_marks: !0,
                    show_floater: !0
                },
                setReK: 0,
                setLineStyle: {
                    linetype: "solid"
                }
            },
            tChart: {
                setCustom: {
                    show_floater: !0
                },
                setLineStyle: {
                    linetype: "line"
                }
            },
            tkChart: {
                showView: "t1",
                showDotTool: {
                    alwaysShow: !0
                }
            }
        };
        x.indicatorTab = R,
        x.indicatorTabLogger = I,
        x.CFGSETTING_IFRAME_PREFIX = "sinatkchart_settingcfgpanel~",
        x.REKSETTING_PREFIX = "sinatkchart_reksetting~",
        x.REKSETTING_COOKIE = "kCookieRek",
        x.EXTEND_PERFIX = "sinatkchart_extendsettingV2",
        x.settingCfg = void 0,
        x.settingRek = void 0,
        x.market = t.market(x.symbol),
        x.DKpChart = "TZY",
        x.DKtChart = "TZYS";
        var N = function(t) {
            return /^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(t)
        };
        !function() {
            d.load({
                uid: [x.CFGSETTING_IFRAME_PREFIX, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                key: x.CFGSETTING_IFRAME_PREFIX
            }, function(t) {
                t ? x.settingCfg = i(A, JSON.parse(t)) : ("US" == x.market && (A.tChart.setLineStyle.linetype = "mountain"),
                x.settingCfg = A)
            }, !0)
        }();
        var O;
        !function() {
            switch (x.market) {
            case "NF":
                O = [[{
                    name: "POSITION"
                }, {
                    name: "TVOL"
                }, {
                    name: "LB"
                }, {
                    name: "BLANKCTN"
                }], {
                    callback: function() {
                        R(T)
                    }
                }];
                break;
            case "HF":
            case "global_index":
                O = [[{
                    name: "MACD"
                }, {
                    name: "BLANKCTN"
                }], {
                    callback: function() {
                        R(T)
                    }
                }];
                break;
            default:
                O = "cnlv2" == x.mt ? [[{
                    name: "TVOL"
                }, {
                    name: "TFLOW"
                }, {
                    name: "BLANKCTN"
                }], {
                    callback: function() {
                        R(T)
                    }
                }] : [[{
                    name: "TVOL"
                }, {
                    name: "LB"
                }, {
                    name: "BLANKCTN"
                }], {
                    callback: function() {
                        R(T)
                    }
                }]
            }
        }();
        var E;
        switch (x.market) {
        case "HF":
        case "forex_yt":
        case "BTC":
        case "forex":
            E = [[{
                name: "MACD"
            }, {
                name: "BLANKCTN"
            }], {
                callback: function() {
                    R(S)
                }
            }];
            break;
        default:
            E = [[{
                name: "VOLUME"
            }, {
                name: "MACD"
            }, {
                name: "BLANKCTN"
            }], {
                callback: function() {
                    R(S)
                }
            }]
        }
        var F, B, M, U, V, H, P, z, X, j, G, W = void 0, $ = function(t, e) {
            KKE.api("plugins.compare.get", W.compare, function(a) {
                G = a,
                t.appendChild(e)
            })
        }, Y = function(t) {
            W.menu.dis_menu ? (B = o("div"),
            B.id = W.menu.menu_dom_id,
            x.iswap && (W.menu.menu_dom_h = 39),
            B.style.height = W.menu.menu_dom_h + "px",
            W.menu.iswap = x.iswap,
            t.appendChild(B)) : W.menu.menu_dom_h = 0
        }, Z = function() {
            W.compare.dis_compare ? (V = o("div"),
            V.id = W.compare.compare_dom_id,
            V.style.clear = "both",
            V.style.marginLeft = W.compare.compare_dom_left,
            V.style.paddingTop = "7px",
            V.style.lineHeight = V.style.height = W.compare.compare_dom_h + "px",
            W.compare.compare_dom_h = 30) : W.compare.compare_dom_h = 0
        }, J = function(t) {
            if (W.range.dis_range) {
                if (U = o("div"),
                U.id = W.range.range_dom_id,
                U.style.clear = "both",
                U.style.whiteSpace = "nowrap",
                W.range.rangeCon ? U.className = W.range.rangeCon : U.style.marginLeft = "5px",
                x.iswap || W.menu.menu_wapmore)
                    U.style.fontSize = "10px",
                    U.style.marginLeft = "25px",
                    b(U),
                    W.range.range_dom_h = 30,
                    U.style.height = W.range.range_dom_h + "px";
                else {
                    U.style.fontSize = "12px";
                    var e = 4;
                    U.style.paddingTop = e + "px",
                    U.style.lineHeight = U.style.height = W.range.range_dom_h + "px",
                    W.range.range_dom_h += e
                }
                t.appendChild(U)
            } else
                W.range_dom_h = 0
        }, q = function(t) {
            Y(t),
            J(t),
            Z(t)
        }, Q = function(t) {
            W.compare.dis_compare ? (t.appendChild(V),
            $(t, V)) : W.compare.compare_dom_h = 0
        }, tt = function() {
            W.charts_hasTChart || "US" !== x.market || 1 !== W.stock_stutas || (W.menu.tab = [{
                lab: "\u65e5K",
                v: "kd",
                t: "K"
            }, {
                lab: "\u5468K",
                v: "kw",
                t: "K"
            }, {
                lab: "\u6708K",
                v: "km",
                t: "K"
            }])
        }, et = function() {
            var e = t.$C("div");
            return e.style.width = e.style.height = "100%",
            e.style.position = "relative",
            x.dom_id = e.id = "tkChart_wwy" + x.symbol,
            e
        }, at = function() {
            var h5FigureDIV = r(x.dom_id)
              , e = et();
            h5FigureDIV.appendChild(e),
            e.style.webkitUserSelect = e.style.userSelect = e.style.MozUserSelect = "none",
            X = g(),
            W = i(X, W || null),
            W = P = z = i(W, x || null),
            W.domid = X.charts_dom_id,
            W.symbol = x.symbol,
            ("forex" == x.market || "forex_yt" == x.market || "BTC" == x.market) && (W.charts_Start = "K"),
            H = u(x.market),
            W = i(W, H),
            W = i(W, x),
            P = i(W.param.t, P || null),
            z = i(W.param.k, z || null),
            z.pcm = 2,
            x.iswap && v(),
            M = o("div"),
            M.id = X.charts_dom_id,
            q(e);
            var a = e.offsetHeight
              , n = e.offsetHeight - W.menu.menu_dom_h - 2 - W.range.range_dom_h - W.compare.compare_dom_h
              , s = n / a * 100;
            M.style.height = s + "%",
            e.appendChild(M),
            Q(e),
            tt(),
            "op_m" == x.market && (W.charts_Start = "K"),
            F = W.api
        }, nt = function() {
            var e = x.settingCfg.kChart;
            for (var a in e)
                e.hasOwnProperty(a) && "setCustom" == a && S[a](e[a]);
            D && D.setPPT("block"),
            S.setCustom({
                allow_indicator_edit: !0
            }),
            S.setCustom({
                storage_lv: 2
            }),
            t.suda("m_bs"),
            S.showView("kd"),
            S.setDimension({
                I_V_O: 0
            }),
            S.pCharts([{
                name: x.DKpChart
            }], {
                isexclusive: !0,
                noLog: 1
            }),
            "cnlv1wap" == x.mt ? (S.tCharts([{
                name: x.DKtChart
            }], {
                isexclusive: !0,
                noLog: 1
            }),
            S.showRangeSelector({
                display: !1
            })) : (S.tCharts([{
                name: x.DKtChart
            }, {
                name: "volume"
            }], {
                isexclusive: !0,
                noLog: 1
            }),
            S.showRangeSelector({
                display: !0
            })),
            "TZY" == x.DKpChart && S.setReK(-1)
        }, ot = function(t) {
            var e = new Date
              , a = new Date;
            switch (t) {
            case "km12":
                e.setDate(e.getDate() - 264);
                break;
            case "km1":
                e.setDate(e.getDate() - 22);
                break;
            case "km3":
                e.setDate(e.getDate() - 66);
                break;
            case "ytd":
                e = new Date(e.getFullYear(),0,1);
                break;
            case "k1":
                var n = 60 * e.getTimezoneOffset() * 1e3;
                e.setTime(e.getTime() + n),
                e.setHours(e.getHours() + 4),
                a = new Date(99999,9,9),
                S.dateFromTo(e, a),
                KKE.api("patch.forex.newhqtime", {
                    symbol: x.symbol,
                    timeSymbol: "sys_time",
                    interval: 30,
                    offset: 30
                }, function(t) {
                    t && S.pushData({
                        symbol: symbol,
                        data: t
                    })
                })
            }
            S.showView("kd", {
                callback: function() {
                    S.setLineStyle({
                        linetype: "line"
                    })
                }
            }),
            S.showYTD(),
            S.showRangeSelector({
                from: e,
                to: a
            })
        }, it = function(t, e, a) {
            var n = void 0;
            n = "t" == e ? x.settingCfg.tChart : x.settingCfg.kChart;
            for (var o in n)
                if (n.hasOwnProperty(o))
                    if ("pCharts" == o || "tCharts" == o) {
                        if (D && "k1" == D.chooseTab.tab)
                            continue;
                        t[o](n[o], {
                            isexclusive: !0,
                            callback: function() {
                                n.setCustom && n.setCustom.show_underlay_vol && t.setCustom({
                                    show_underlay_vol: n.setCustom.show_underlay_vol
                                })
                            }
                        })
                    } else if ("setReK" == o)
                        N(x.symbol) && t[o](n[o]),
                        "HK" === x.market && t[o](n[o]);
                    else if ("showView" == o)
                        L[o]({
                            view: n[o]
                        });
                    else {
                        if (D && "kcl" == D.chooseTab.tab && "setLineStyle" == o) {
                            t.setLineStyle.linetype = "line";
                            continue
                        }
                        t[o](n[o])
                    }
            if ("init" == a)
                for (o in x.settingCfg.tkChart)
                    x.settingCfg.tkChart.hasOwnProperty(o) && L[o]("showView" === o ? {
                        view: x.settingCfg.tkChart[o]
                    } : x.settingCfg.tkChart[o])
        }, rt = function() {
            if (T && T.getSymbols().length > 1)
                for (var t = "line", e = 1; e < T.getSymbols().length; e++)
                    S.compare({
                        symbol: T.getSymbols()[e],
                        linecolor: {
                            K_N: W.compare.color[e - 1]
                        },
                        linetype: t
                    })
        }, st = 0, lt = function(a, n, o, i) {
            st > 0 || (st++,
            KKE.api("chart.h5k.get", z, function(t) {
                if (L.kChart = S = t,
                n && "kdd" == n)
                    nt(),
                    i && C({
                        view: n,
                        active: i
                    });
                else {
                    for (var e in F.k)
                        if (F.k.hasOwnProperty(e)) {
                            var r = F.k[e];
                            c(r) || (r = [r]),
                            ("pCharts" != e || W.iswap) && s(S[e]) && S[e].apply(null, r)
                        }
                    "km1" == n || "km3" == n || "km12" == n || "ytd" == n ? ot(n) : n && S.showView(n),
                    (o && N(x.symbol) || o && "HK" === x.market) && S.setReK("cnlv1wap" === x.mt ? 0 : o),
                    W.iswap || "cnlv1wap" == x.mt ? "cnlv1wap" === x.mt && S.tCharts([{
                        name: "MACD"
                    }], {
                        isexclusive: !0,
                        noLog: 1
                    }) : (D && it(S),
                    "kcl" == n && S.showView(n))
                }
                if (rt(),
                a) {
                    var l = x.iswap || W.menu.menu_wapmore ? 1 : 2;
                    D && D.setTarget(l),
                    S.compare(a.obj, a.rm)
                }
                D ? (D.setChart({
                    k: S,
                    o: x
                }),
                i && C({
                    view: n,
                    active: i
                })) : W.menu.dis_menu && mt(W.menu, {
                    type: "k",
                    chart: S
                }, function() {
                    it(S),
                    _()
                })
            }),
            L.chartUserobj = x,
            "CN" === t.market(e.symbol) && N(e.symbol) && KKE.api("plugins.dotTool.get", {}, function(e) {
                x.dotTool = e;
                var a = new Date;
                a = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
                t.load("//finance.sina.com.cn/touzi/lhstockskx/" + x.symbol + ".js?" + a, function() {
                    x.dotTool.pushData({
                        key: "tzylhb",
                        data: K(window["tzy_lhstock_kx_" + x.symbol]),
                        dotStyle: {
                            position: "absolute",
                            width: "8px",
                            height: "8px",
                            borderRadius: "8px",
                            color: "white",
                            backgroundColor: "#349FF9",
                            zIndex: 99,
                            opacity: 1,
                            filter: "alpha(opacity=100)",
                            boxShadow: null
                        },
                        dotHoverStyle: {
                            opacity: .8,
                            filter: "alpha(opacity=80)",
                            boxShadow: "0px 0px 5px 2px #349FF9"
                        },
                        tipStyle: {
                            position: "absolute",
                            backgroundColor: "#349FF9",
                            color: "white",
                            zIndex: 999,
                            padding: "5px 10px",
                            textIndent: "18px",
                            borderRadius: "5px",
                            backgroundImage: "url(//n.sinaimg.cn/finance/h5chart/toast.png)",
                            backgroundPosition: "0px -55px",
                            minWidth: "110px",
                            lineHeight: "15px",
                            height: "15px",
                            fontSize: "12px"
                        }
                    })
                })
            }))
        }, ct = function() {
            KKE.api("chart.h5t.get", P, function(t) {
                var e = x.market;
                L.tChart = T = t;
                for (var a in F.t)
                    if (F.t.hasOwnProperty(a)) {
                        var n = F.t[a];
                        c(n) || (n = [n]),
                        s(T[a]) && ("US" != e || 1 !== W.stock_stutas) && T[a].apply(null, n)
                    }
                D ? D.setChart({
                    t: T
                }) : W.menu.dis_menu && mt(W.menu, {
                    type: "t",
                    chart: T
                }),
                W.iswap || W.menu.menu_wapmore || it(T, "t", "t1" == x.settingCfg.tkChart.showView ? "click" : "init"),
                W.menu.dis_menu || L.re("T_DATA_LOADED", null)
            })
        };
        this.menuTab = D,
        this.setTKChart = function(t) {
            x.settingCfg = t,
            D && D.setCfg(t),
            D && "kdd" != D.chooseTab.tab && "k1" != D.chooseTab.tab && (S && it(S),
            T && it(T, "t")),
            t.tkChart.showDotTool && this.showDotTool(t.tkChart.showDotTool),
            d.save({
                uid: [x.CFGSETTING_IFRAME_PREFIX, (new Date).getTime()].join("|"),
                key: x.CFGSETTING_IFRAME_PREFIX,
                value: t
            })
        }
        ;
        var mt = function(t, a, n) {
            var o = a.type
              , i = {};
            switch (o) {
            case "t":
                i = {
                    t: a.chart
                };
                break;
            case "k":
                i = {
                    k: a.chart
                }
            }
            W.menu.me = L,
            W.menu[o + "chart"] = a.chart,
            KKE.api("plugins.menu.get", W.menu, function(t) {
                L.re("T_DATA_LOADED", null),
                D = t,
                L.menuTab = D,
                W.iswap || W.menu.menu_wapmore || (e.nocfg || y(),
                w()),
                "forex" == x.market || "forex_yt" == x.market ? pt ? C(pt) : D.chooseTab = {
                    tye: "K",
                    tab: "kd"
                } : C({
                    view: x.settingCfg.tkChart.showView
                }),
                n && n()
            })
        }
          , dt = function(e) {
            if (t.isStr(e)) {
                var a = String(e).toLowerCase();
                switch (a) {
                case "t":
                    ct();
                    break;
                case "k":
                    lt()
                }
                l.addHandler(window, "resize", function() {
                    L.onresize()
                })
            }
        };
        at(),
        dt(W.charts_Start),
        this.chartUserobj = x,
        this.initK = lt,
        this.initT = ct,
        this.compare = function(e, a) {
            var n = t.market(e.symbol)
              , o = x.market;
            if (e.linetype || (e.linetype = "line"),
            n === o)
                T && T.compare(e, a),
                S && S.compare(e, a);
            else if (T && T.hide(),
            S) {
                var i = x.iswap || W.menu.menu_wapmore ? 1 : 2;
                D && D.setTarget("kdd" == D.chooseTab.tab ? 3 : i),
                S.show(),
                S.compare(e, a)
            } else
                lt({
                    obj: e,
                    rm: a
                })
        }
        ;
        var pt, ht = new function() {
            var t = 0
              , e = function(a, n, o) {
                var i;
                o || (o = 100);
                try {
                    i = S
                } catch (r) {}
                return i ? n() : void (t++ < 10 && setTimeout(function() {
                    e(a, n, o)
                }, 1.2 * o))
            };
            this.waitFor = e
        }
        , ut = 0;
        this.showView = function(t) {
            if (t.active && 0 == ut && "t1" != x.settingCfg.tkChart.showView)
                return ut++,
                void ht.waitFor("", function() {
                    "kdd" == t.view ? (nt(),
                    C(t)) : L.showView(t),
                    ut = 0
                });
            switch (t.view) {
            case "t1":
            case "ts":
                S && S.hide(),
                T.showView(t.view);
                break;
            case "t5":
                T.showView(t.view);
                break;
            case "ytd":
            case "kdd":
            case "kd":
            case "kw":
            case "km":
            case "kcl":
            case "k5":
            case "k15":
            case "k30":
            case "k60":
                T && T.hide(),
                S ? S.showView(t.view) : lt(!1, t.view, void 0, t.active)
            }
            pt = t,
            C(t)
        }
        ,
        this.showDotTool = function(t) {
            var e = t.alwaysShow;
            x.dotTool && (e ? x.dotTool.show(!0) : x.dotTool.hide(!0))
        }
        ,
        this.pushData = function(t) {
            T && T.pushData(t.obj, t.num),
            x.iswap || W.menu.menu_wapmore || S && S.pushData(t.obj, t.num)
        }
        ,
        this.resizePaintTool = function() {
            var t, e, a = x.paintTool, n = x.dotTool;
            D && ("K" == D.chooseTab.tye && S ? (e = S.getDimension(),
            t = {
                width: e.w_k,
                height: e.h_k,
                left: e.RIGHT_W,
                top: e.T_F_T
            }) : T && (e = T.getDimension(),
            t = {
                width: e.w_t,
                height: e.h_t,
                left: e.RIGHT_W,
                top: e.T_F_T
            }),
            t && a && a.resize(t),
            t && n && n.update(t))
        }
        ,
        this.onresize = function() {
            T && T.resize(),
            S && S.resize(),
            L.resizePaintTool()
        }
        ,
        this.update = function() {
            T && T.update(),
            S && S.update()
        }
        ,
        this.param = W
    }
    function a(t) {
        return "sb899001" === t || "sb899305" === t || "sb899306" === t || "sb899307" === t || "sb899003" === t
    }
    function n() {
        this.VER = "1.4.2",
        this.get = function(config, callback) {
            var i = new e(config)
              , r = function(e) {
                i.me.rl(e, r),
                t.isFunc(callback) && callback(i),
                window.sinaTKChartV1 = i,
                a(config.symbol) && i.showView({
                    view: "kcl",
                    active: 0
                })
            };
            i.me.al("T_DATA_LOADED", r, !1)
        }
    }
    var o = t.$C
      , i = t.oc
      , r = t.$DOM
      , s = t.isFunc
      , l = t.xh5_EvtUtil
      , c = t.isArr
      , m = t.cookieUtil
      , d = t.bridge;
    return t.fInherit(e, t.xh5_EvtDispatcher),
    n
});
;
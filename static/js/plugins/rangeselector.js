xh5_define("plugins.rangeselector", ["utils.util", "utils.painter", "cfgs.settinger"], function(t, e, n) {
    "use strict";
    function o(e) {
        this.VER = "2.0.9",
        e = s({
            stockData: null,
            setting: null,
            rc: function() {},
            usrCfg: null,
            witht5: 0
        }, e);
        var n, o = e.setting, c = e.stockData, h = c.viewState, f = o.PARAM.isFlash, m = o.PARAM.minCandleNum, v = 30, w = {
            theme: {
                BLOCK: "#494949",
                BLOCK_TOP: "#fff",
                BLOCK_BOTTOM: "#494949",
                BAR: "#eee",
                BAR_BORDER: "#9fa4b0",
                TOP_BORDER: "#494949",
                R_BORDER: "#ddd",
                L_BORDER: "#ddd",
                B_BORDER: "#ddd",
                TRENDLINE: "#aaa",
                TIMELINE: "#ddd",
                TIMETXT: "#555"
            },
            thumb: {
                width: 6
            },
            border: {
                value: 1,
                top: 2,
                v: function() {
                    return this.value + this.top
                }
            },
            body: {
                fontsize: 12
            },
            domid: ""
        }, p = s(w, e.usrCfg), g = p.theme, D = new function() {
            function s(t) {
                var e = t;
                if (0 >= e)
                    return 0;
                e > L && (e = L);
                for (var n = 10, o = L / n, i = 0, s = 1; n >= s; s++)
                    if (o * s >= e) {
                        i = s / 2;
                        break
                    }
                return Math.floor(i)
            }
            function w(t) {
                e.rc(k, z, !1, !0, t)
            }
            function D(t) {
                if (n) {
                    var e = n.length;
                    if (!(1 > e)) {
                        C = L / e;
                        var i = S.getX() < 0 ? 0 : Math.ceil(S.getX() / C)
                          , a = Math.ceil((X.getX() >= L ? L : X.getX()) / C);
                        if (o.datas.isT)
                            i = s(S.getX()),
                            a = s(X.getX()),
                            i == a && (S.isDown ? i -= 1 : X.isDown && (a += 1)),
                            0 > i ? (i = 0,
                            a = 1) : a > 5 && (a--,
                            i--),
                            h.start = i,
                            h.end = a;
                        else {
                            if (a > e && (a = e),
                            m > a - i) {
                                var d = m + i - a;
                                S.isDown ? i >= d ? i -= d : (i = 0,
                                a = Math.min(m, e)) : X.isDown && (e > a + d ? a += d : (a = e,
                                i = e - m,
                                0 > i && (i = 0)))
                            }
                            k = i,
                            z = a,
                            w(t)
                        }
                    }
                }
            }
            function y() {
                var t = 0 == o.PARAM.withT5 ? 1 : 5
                  , e = L / t;
                S.setX(h.start * e),
                X.setX(h.end * e),
                k = h.start,
                z = h.end,
                N(),
                w()
            }
            function b(t) {
                t = a.getEvent(t),
                B.getX() > M.getX() ? (S = M,
                X = B) : (S = B,
                X = M);
                var e, n = L, o = (d.istd ? t.touches[0] : t).clientX;
                if (_.isDown) {
                    e = o - _.downMx + _.downOx;
                    var i = _.distance;
                    0 > e ? e = 0 : e + i > n && (e = n - i),
                    B.setX(e),
                    M.setX(e + i)
                } else {
                    var s = B.isDown ? B : M;
                    e = o - s.downMx + s.downOx,
                    0 > e ? e = 0 : e > n && (e = n),
                    s.setX(e)
                }
                N(),
                D()
            }
            function E() {
                function t() {
                    n.style.width = p.thumb.width + "px",
                    n.style.height = o.DIMENSION.H_RS - p.border.v() + "px",
                    n.style.backgroundColor = g.BAR,
                    n.style.border = "1px solid " + g.BAR_BORDER
                }
                var e = this
                  , n = i("div");
                n.style.position = "absolute",
                n.style.cursor = "col-resize",
                n.style.top = 0,
                n.style.zIndex = v + 1,
                n.onselectstart = n.onmousedown = function() {
                    return !1
                }
                ,
                t(),
                this.isDown = !1,
                this.downMx = 0,
                this.downOx = 0;
                for (var s = {
                    iInit: function(t) {
                        e.isDown = !0,
                        t = a.getEvent(t),
                        e.downMx = (d.istd ? t.touches[0] : t).clientX,
                        e.downOx = e.getX()
                    },
                    iEnd: function() {
                        e.isDown = !1,
                        o.datas.isT && y()
                    },
                    mD: function(t) {
                        this.iInit(t),
                        f ? (a.addHandler(document, "mouseup", r.onmouseup || function() {}
                        ),
                        a.addHandler(document, "mousemove", b)) : (a.addHandler(window, "mouseup", s),
                        a.addHandler(window, "mousemove", b))
                    },
                    mU: function() {
                        this.iEnd(),
                        f ? (a.removeHandler(document, "mousemove", b),
                        a.removeHandler(document, "mouseup", r.onmouseup || function() {}
                        )) : (a.removeHandler(window, "mousemove", b),
                        a.removeHandler(window, "mouseup", s))
                    },
                    tE: function() {
                        this.iEnd(),
                        a.removeHandler(window, "touchmove", b),
                        a.removeHandler(window, "touchend", s)
                    },
                    tS: function(t) {
                        a.preventDefault(t),
                        this.iInit(t),
                        a.addHandler(window, "touchend", s),
                        a.addHandler(window, "touchmove", b)
                    },
                    handleEvent: function(t) {
                        switch (t.type) {
                        case "mousedown":
                            this.mD(t);
                            break;
                        case "mouseup":
                            this.mU();
                            break;
                        case "touchend":
                            this.tE();
                            break;
                        case "touchstart":
                            this.tS(t)
                        }
                    }
                }, r = new function() {
                    this.onmouseup = function() {
                        s.mU()
                    }
                    ,
                    this.onmousedown = function(t) {
                        s.mD(t)
                    }
                    ,
                    this.onmousemove = function(t) {
                        b(t)
                    }
                }
                , u = d.istd ? ["touchstart"] : ["mousedown"], l = 0, c = u.length; c > l; l++)
                    f ? a.addHandler(n, u[l], r["on" + u[l]] || function() {}
                    ) : a.addHandler(n, u[l], s);
                this.body = n,
                this.getX = function() {
                    return 1 * (n.style.left.split("px")[0] || 0)
                }
                ,
                this.setX = function(t) {
                    n.style.left = t + "px"
                }
                ,
                this.resize = t
            }
            function I() {
                function e() {
                    s.style.height = o.DIMENSION.H_RS - p.border.v() + "px",
                    s.style.backgroundColor = f ? g.BLOCK : t.hex2dec(g.BLOCK, .5),
                    s.style.borderTop = "1px solid " + g.BLOCK_TOP,
                    s.style.borderBottom = "1px solid " + g.BLOCK_BOTTOM
                }
                var n = this
                  , s = i("div");
                s.style.position = "absolute",
                s.style.cursor = "move",
                s.style.top = 0,
                s.style.zIndex = v,
                e(),
                this.isDown = !1,
                this.downMx = 0,
                this.downOx = 0,
                this.distance = 0;
                for (var r = {
                    iInit: function(t) {
                        n.isDown = !0,
                        B.isDown = M.isDown = !0,
                        n.distance = Math.abs(B.getX() - M.getX()),
                        t = a.getEvent(t),
                        n.downMx = (d.istd ? t.touches[0] : t).clientX,
                        n.downOx = n.getX()
                    },
                    iEnd: function() {
                        n.isDown = !1,
                        B.isDown = M.isDown = !1,
                        o.datas.isT && y()
                    },
                    tE: function() {
                        this.iEnd(),
                        a.removeHandler(window, "touchmove", b),
                        a.removeHandler(window, "touchend", r)
                    },
                    tS: function(t) {
                        a.preventDefault(t),
                        this.iInit(t),
                        a.addHandler(window, "touchend", r),
                        a.addHandler(window, "touchmove", b)
                    },
                    mD: function(t) {
                        this.iInit(t),
                        f ? (a.addHandler(document, "mouseup", u.onmouseup || function() {}
                        ),
                        a.addHandler(document, "mousemove", b)) : (a.addHandler(window, "mouseup", r),
                        a.addHandler(window, "mousemove", b))
                    },
                    mU: function() {
                        this.iEnd(),
                        f ? (a.removeHandler(document, "mousemove", b),
                        a.removeHandler(document, "mouseup", u.onmouseup || function() {}
                        )) : (a.removeHandler(window, "mousemove", b),
                        a.removeHandler(window, "mouseup", r))
                    },
                    handleEvent: function(t) {
                        switch (t.type) {
                        case "mousedown":
                            this.mD(t);
                            break;
                        case "mouseup":
                            this.mU();
                            break;
                        case "touchend":
                            this.tE();
                            break;
                        case "touchstart":
                            this.tS(t)
                        }
                    }
                }, u = new function() {
                    this.onmouseup = function() {
                        r.mU()
                    }
                    ,
                    this.onmousedown = function(t) {
                        r.mD(t)
                    }
                }
                , l = d.istd ? ["touchstart"] : ["mousedown"], c = 0, h = l.length; h > c; c++)
                    f ? a.addHandler(s, l[c], u["on" + l[c]] || function() {}
                    ) : a.addHandler(s, l[c], r);
                this.body = s,
                this.getX = function() {
                    return 1 * (s.style.left.split("px")[0] || 0)
                }
                ,
                this.setX = function(t) {
                    s.style.left = t + "px"
                }
                ,
                this.resize = e
            }
            function N() {
                var t = S.getX()
                  , e = X.getX() - t;
                0 > e && (e = 0),
                _.body.style.left = t + "px",
                _.body.style.width = e + "px"
            }
            var R = i("div");
            a.addHandler(R, "touchstart", function(t) {
                o.custom.touch_prevent && a.preventDefault(t)
            }),
            this.ctn = R;
            var O, T, H, x, B, M, S, X, _, L, C, k, z, A, P, U = function() {
                O = i("div"),
                O.style.position = "relative",
                O.onselectstart = O.onmousedown = function() {
                    return !1
                }
                ,
                T = new r,
                x = T.g,
                H = T.canvas,
                H.style.borderWidth = p.border.value + "px",
                H.style.borderTopWidth = p.border.top + "px",
                H.style.borderStyle = "solid",
                H.style.zIndex = 0,
                O.appendChild(H),
                B = new E,
                M = new E,
                S = B,
                X = M,
                O.appendChild(B.body),
                O.appendChild(M.body),
                _ = new I,
                O.appendChild(_.body),
                R.style.clear = "both",
                R.appendChild(O)
            }, K = function(e, o, i) {
                if (n && t.isDate(e) && t.isDate(o)) {
                    if (e > o) {
                        var s = e;
                        e = o,
                        o = s
                    }
                    var a, d, r = n.length;
                    e <= n[0].date && (a = 0),
                    o >= n[r - 1].date && (d = r);
                    for (var u = 0; r > u; u++)
                        if (isNaN(a) && n[u].date >= e && (a = u),
                        isNaN(d) && n[u].date >= o && (d = u),
                        !isNaN(a) && !isNaN(d)) {
                            m > d - a && (a = 0 > a - m ? 0 : a - m);
                            break
                        }
                    isNaN(a) && (a = 0),
                    isNaN(d) && (d = r);
                    var l = L / r;
                    B.setX(a * l),
                    M.setX(d * l),
                    N(),
                    D(i)
                }
            }, V = [], W = -1, F = 50, G = function() {
                A = Number.MAX_VALUE,
                P = -Number.MAX_VALUE;
                for (var t, e = n.length, o = 0; e > o; o++)
                    t = n[o].close || n[o].price,
                    1e-4 > t || (t > P && (P = t),
                    A > t && (A = t))
            }, q = function() {
                for (; V.length; )
                    V.length--;
                for (var t, e, i = 0, s = n.length; s > i; i++)
                    t = n[i],
                    e = t.close || t.price,
                    V.push({
                        y: u.pp(e, A, P, o.DIMENSION.H_RS),
                        d: t.date
                    })
            }, Y = function(t, e) {
                var n = x.measureText(e).width
                  , i = n >> 1
                  , s = t - i;
                x.fillText(e, s, o.DIMENSION.H_RS - p.body.fontsize - 5),
                W = t
            }, $ = function(t, e) {
                if (!(10 > t || W > 0 && W + F >= t || t > L - F / 2)) {
                    var n = x.measureText(e).width
                      , i = n >> 1
                      , s = t - i;
                    x.fillText(e, s, o.DIMENSION.H_RS - p.body.fontsize - 5),
                    W = t
                }
            }, j = function() {
                W = -1,
                T.resize({
                    width: L,
                    height: o.DIMENSION.H_RS - p.border.v()
                })
            }, J = function() {
                x.beginPath(),
                x.strokeStyle = g.TRENDLINE;
                var t;
                o.datas.isT && c.date == c.hq.today && (t = !0);
                for (var e, n = V.length, i = L / n, s = 0, a = 0; n > a; a++)
                    e = V[a].y,
                    t && (c.realLen < 0 && (c.realLen = o.datas.tDataLen),
                    o.datas.isT && a > 4 * o.datas.tDataLen && c.realLen <= a - 4 * o.datas.tDataLen) || (0 == a ? x.moveTo(s, e) : x.lineTo(s, e),
                    s += i);
                x.stroke()
            }, Q = function() {
                x.beginPath(),
                x.textBaseline = "top",
                x.textAlign = "left",
                x.font = p.body.fontsize + "px Helvetica,Arial,sans-serif",
                x.fillStyle = g.TIMETXT,
                x.strokeStyle = g.TIMELINE;
                var t, n, i;
                if (o.datas.isT) {
                    var s = 0 == e.witht5 ? 1 : 5;
                    t = 0,
                    n = L / s,
                    i = 0;
                    for (var a = 0, d = n / 2; s > t; t++,
                    a += o.datas.tDataLen) {
                        var r = V[a].d
                          , u = 1 + r.getMonth() + "/" + r.getDate();
                        i = ~~(i + .5),
                        i -= .5,
                        x.moveTo(i, 0),
                        x.lineTo(i, o.DIMENSION.H_RS),
                        Y(d, u),
                        i += n,
                        d += n
                    }
                } else {
                    var c = l.URLHASH.gt(h.viewId)
                      , f = "mink" == c.type
                      , m = f ? "getHours" : "getFullYear"
                      , v = V.length;
                    t = 0,
                    n = L / v,
                    i = 0;
                    for (var w, D, y = 90, b = void 0, E = -1; v > t; t++)
                        D = V[t].d,
                        w = D[m](),
                        w != b && (b = w,
                        i > E + y && (i = ~~(i + .5),
                        i -= .5,
                        E = i,
                        x.moveTo(i, 0),
                        x.lineTo(i, o.DIMENSION.H_RS),
                        f && (w += ":00"),
                        $(i, w))),
                        i += n
                }
                x.stroke()
            };
            this.setV = function(t) {
                R.style.display = t.display ? "" : "none"
            }
            ,
            this.getV = function() {
                return "none" != R.style.display
            }
            ,
            this.fromInputDates = K;
            var Z = 3;
            this.drawBgLine = function(t) {
                if (n) {
                    if (t) {
                        if (Z-- > 0)
                            return;
                        Z = 9
                    }
                    G(),
                    q(),
                    j(),
                    J(),
                    Q()
                }
            }
            ,
            this.locBarPos = function() {
                if (n) {
                    var t = L / (o.datas.isT ? 0 == e.witht5 ? 1 : 5 : n.length);
                    B.setX(h.start * t),
                    M.setX(h.end * t),
                    S = B,
                    X = M,
                    N()
                }
            }
            ,
            this.resize = function() {
                var t = o.DIMENSION.posX;
                L = o.datas.isT ? o.DIMENSION.getStageW() - t - 2 * p.border.value - p.thumb.width - o.DIMENSION.RIGHT_W : o.DIMENSION.getStageW() - t - 2 * p.border.value - p.thumb.width - o.DIMENSION.K_RIGHT_W,
                O.style.marginLeft = t + "px",
                T.resize({
                    width: L,
                    height: o.DIMENSION.H_RS - p.border.v()
                }),
                B.resize(),
                M.resize(),
                _.resize(),
                H.style.borderTopColor = g.TOP_BORDER,
                H.style.borderRightColor = g.R_BORDER,
                H.style.borderBottomColor = g.B_BORDER,
                H.style.borderLeftColor = g.L_BORDER
            }
            ,
            U(),
            this.resize()
        }
        ;
        this.onResize = function() {
            D.resize(),
            D.locBarPos(),
            D.drawBgLine()
        }
        ;
        var y;
        this.setDataRange = function(t) {
            t || (y && n && (D.locBarPos(),
            D.fromInputDates(y.start, y.end, y.disableCb),
            y = null),
            D.getV() && D.locBarPos())
        }
        ,
        this.linkData = function(t) {
            if (D) {
                if (o.datas.isT) {
                    if (c.tDb) {
                        var e = c.tDb.get();
                        if (e) {
                            n = [];
                            for (var i = 0; i < e.length; i++)
                                n = n.concat(e[i])
                        }
                    }
                } else
                    c.kDb && (n = c.kDb.get());
                D.getV() && D.drawBgLine(t)
            }
        }
        ,
        this.getBody = function() {
            return D.ctn
        }
        ,
        this.sh = function(t) {
            D.setV(t),
            t.display && (this.linkData(),
            this.setDataRange())
        }
        ,
        this.clear = function() {
            n = null,
            t.domGc(D.ctn),
            D = null
        }
        ,
        this.dateFromTo = function(t, e, o) {
            n ? D.fromInputDates(t, e, o) : y = {
                start: t,
                end: e,
                disableCb: o
            }
        }
        ,
        this.setTheme = function(e) {
            var n = !1;
            for (var o in e)
                e.hasOwnProperty(o) && t.isColorRGB(e[o]) && g.hasOwnProperty(o) && g[o] !== e[o] && (g[o] = e[o],
                n = !0);
            return n
        }
    }
    var i = t.$C
      , s = t.oc
      , a = t.xh5_EvtUtil
      , d = t.xh5_deviceUtil
      , r = e.xh5_Canvas
      , u = t.xh5_PosUtil
      , l = n.globalCfg;
    return new function() {
        this.get = function(e, n) {
            t.isFunc(n) && n(o)
        }
    }
});

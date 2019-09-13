xh5_define("plugins.paintSth", [], function() {
    function t(t, e) {
        var i = function() {},
            a = t.prototype;
        i.prototype = e.prototype,
            t.prototype = new i;
        for (var n in a)
            a.hasOwnProperty(n) && (t.prototype[n] = a[n]);
        t.prototype.constructor = t
    }

    function e(t, a) {
        var r = n(t);
        for (var o in a)
            a.hasOwnProperty(o) && ("Object" === i(a[o]) ? (!r[o] && (r[o] = {}),
                r[o] = e(r[o], a[o])) : r[o] = a[o]);
        return r
    }

    function i(t) {
        return null === t ? "Null" : void 0 === t ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1)
    }

    function a(t, e) {
        var i = t.changedTouches ? t.changedTouches[0].clientX : t.clientX,
            a = t.changedTouches ? t.changedTouches[0].clientY : t.clientY,
            n = e.getBoundingClientRect();
        return [i - n.left, a - n.top]
    }

    function n(t, e) {
        var a, r = i(t);
        if ("Object" === r)
            a = {};
        else {
            if ("Array" !== r)
                return t;
            a = []
        }
        for (var o in t)
            if (t.hasOwnProperty(o)) {
                var s = t[o];
                a[o] = e && ("Object" === i(s) || "Array" === i(s)) ? n(s, e) : s
            }
        return a
    }

    function r() {
        var t = document.createElement("canvas").getContext("2d");
        if (t) {
            var e = Math.ceil(window.devicePixelRatio || 1),
                i = t.webkitBackingStorePixelRatio || 1;
            return e / i
        }
        return 1
    }

    function o() {
        if (!c) {
            var t = document.createElement("canvas");
            c = t.getContext("2d")
        }
        return c
    }

    function s(t, e) {
        var i, a, n, r = -1,
            o = t.length;
        if (1 === arguments.length) {
            for (; ++r < o;)
                if (null != (a = t[r]) && a >= a) {
                    i = a,
                        n = r;
                    break
                }
            for (; ++r < o;)
                null != (a = t[r]) && a > i && (i = a,
                    n = r)
        } else {
            for (; ++r < o;)
                if (null != (a = e ? e.call(t, t[r], r) : t[r]) && a >= a) {
                    i = a,
                        n = r;
                    break
                }
            for (; ++r < o;)
                null != (a = e ? e.call(t, t[r], r) : t[r]) && a > i && (i = a,
                    n = r)
        }
        return {
            index: n,
            value: i
        }
    }

    function h(t) {
        if (!t)
            return !1;
        var e = t.fillStyle;
        return null != e && "none" !== e
    }

    function l(t) {
        if (!t)
            return !1;
        var e = t.strokeStyle;
        return null != e && "none" !== e && t.lineWidth > 0
    }

    function u() {
        this.VERSION = "1.0.12",
            this.get = function(t, e) {
                var i = new S;
                e(i)
            }
    }
    var c, f = r(),
        d = 10,
        p = function() {
            var t = "undefined" == typeof Float32Array ? Array : Float32Array,
                e = {
                    create: function(e, i) {
                        var a = new t(2);
                        return a[0] = e || 0,
                            a[1] = i || 0,
                            a
                    },
                    copy: function(t, e) {
                        return t[0] = e[0],
                            t[1] = e[1],
                            t
                    },
                    clone: function(e) {
                        var i = new t(2);
                        return i[0] = e[0],
                            i[1] = e[1],
                            i
                    },
                    set: function(t, e, i) {
                        return t[0] = e,
                            t[1] = i,
                            t
                    },
                    add: function(t, e, i) {
                        return t[0] = e[0] + i[0],
                            t[1] = e[1] + i[1],
                            t
                    },
                    scaleAndAdd: function(t, e, i, a) {
                        return t[0] = e[0] + i[0] * a,
                            t[1] = e[1] + i[1] * a,
                            t
                    },
                    sub: function(t, e, i) {
                        return t[0] = e[0] - i[0],
                            t[1] = e[1] - i[1],
                            t
                    },
                    len: function(t) {
                        return Math.sqrt(this.lenSquare(t))
                    },
                    lenSquare: function(t) {
                        return t[0] * t[0] + t[1] * t[1]
                    },
                    mul: function(t, e, i) {
                        return t[0] = e[0] * i[0],
                            t[1] = e[1] * i[1],
                            t
                    },
                    div: function(t, e, i) {
                        return t[0] = e[0] / i[0],
                            t[1] = e[1] / i[1],
                            t
                    },
                    dot: function(t, e) {
                        return t[0] * e[0] + t[1] * e[1]
                    },
                    scale: function(t, e, i) {
                        return t[0] = e[0] * i,
                            t[1] = e[1] * i,
                            t
                    },
                    normalize: function(t, i) {
                        var a = e.len(i);
                        return 0 === a ? (t[0] = 0,
                                t[1] = 0) : (t[0] = i[0] / a,
                                t[1] = i[1] / a),
                            t
                    },
                    distance: function(t, e) {
                        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
                    },
                    distanceSquare: function(t, e) {
                        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
                    },
                    negate: function(t, e) {
                        return t[0] = -e[0],
                            t[1] = -e[1],
                            t
                    },
                    lerp: function(t, e, i, a) {
                        return t[0] = e[0] + a * (i[0] - e[0]),
                            t[1] = e[1] + a * (i[1] - e[1]),
                            t
                    },
                    applyTransform: function(t, e, i) {
                        var a = e[0],
                            n = e[1];
                        return t[0] = i[0] * a + i[2] * n + i[4],
                            t[1] = i[1] * a + i[3] * n + i[5],
                            t
                    },
                    min: function(t, e, i) {
                        return t[0] = Math.min(e[0], i[0]),
                            t[1] = Math.min(e[1], i[1]),
                            t
                    },
                    max: function(t, e, i) {
                        return t[0] = Math.max(e[0], i[0]),
                            t[1] = Math.max(e[1], i[1]),
                            t
                    },
                    pointProjToLine: function(t, i, a) {
                        var n = e.create(a[0] - t[0], a[1] - t[1]),
                            r = e.create(i[0] - t[0], i[1] - t[1]),
                            o = e.lenSquare(r),
                            s = e.dot(r, n),
                            h = s / o,
                            l = e.scale(e.create(), r, h);
                        return [t[0] + l[0], t[1] + l[1]]
                    }
                };
            return e.length = e.len,
                e.lengthSquare = e.lenSquare,
                e.dist = e.distance,
                e.distSquare = e.distanceSquare,
                e
        }(),
        v = function() {
            function t(t) {
                return t > -x && x > t
            }

            function e(t) {
                return t > x || -x > t
            }

            function i(t, e, i, a, n) {
                var r = 1 - n;
                return r * r * (r * t + 3 * n * e) + n * n * (n * a + 3 * r * i)
            }

            function a(t, e, i, a, n) {
                var r = 1 - n;
                return 3 * (((e - t) * r + 2 * (i - e) * n) * r + (a - i) * n * n)
            }

            function n(e, i, a, n, r, o) {
                var s = n + 3 * (i - a) - e,
                    h = 3 * (a - 2 * i + e),
                    l = 3 * (i - e),
                    u = e - r,
                    c = h * h - 3 * s * l,
                    f = h * l - 9 * s * u,
                    d = l * l - 3 * h * u,
                    p = 0;
                if (t(c) && t(f))
                    if (t(h))
                        o[0] = 0;
                    else {
                        var v = -l / h;
                        v >= 0 && 1 >= v && (o[p++] = v)
                    }
                else {
                    var y = f * f - 4 * c * d;
                    if (t(y)) {
                        var x = f / c,
                            v = -h / s + x,
                            w = -x / 2;
                        v >= 0 && 1 >= v && (o[p++] = v),
                            w >= 0 && 1 >= w && (o[p++] = w)
                    } else if (y > 0) {
                        var S = m(y),
                            P = c * h + 1.5 * s * (-f + S),
                            L = c * h + 1.5 * s * (-f - S);
                        P = 0 > P ? -g(-P, T) : g(P, T),
                            L = 0 > L ? -g(-L, T) : g(L, T);
                        var v = (-h - (P + L)) / (3 * s);
                        v >= 0 && 1 >= v && (o[p++] = v)
                    } else {
                        var b = (2 * c * h - 3 * s * f) / (2 * m(c * c * c)),
                            C = Math.acos(b) / 3,
                            k = m(c),
                            M = Math.cos(C),
                            v = (-h - 2 * k * M) / (3 * s),
                            w = (-h + k * (M + _ * Math.sin(C))) / (3 * s),
                            D = (-h + k * (M - _ * Math.sin(C))) / (3 * s);
                        v >= 0 && 1 >= v && (o[p++] = v),
                            w >= 0 && 1 >= w && (o[p++] = w),
                            D >= 0 && 1 >= D && (o[p++] = D)
                    }
                }
                return p
            }

            function r(i, a, n, r, o) {
                var s = 6 * n - 12 * a + 6 * i,
                    h = 9 * a + 3 * r - 3 * i - 9 * n,
                    l = 3 * a - 3 * i,
                    u = 0;
                if (t(h)) {
                    if (e(s)) {
                        var c = -l / s;
                        c >= 0 && 1 >= c && (o[u++] = c)
                    }
                } else {
                    var f = s * s - 4 * h * l;
                    if (t(f))
                        o[0] = -s / (2 * h);
                    else if (f > 0) {
                        var d = m(f),
                            c = (-s + d) / (2 * h),
                            p = (-s - d) / (2 * h);
                        c >= 0 && 1 >= c && (o[u++] = c),
                            p >= 0 && 1 >= p && (o[u++] = p)
                    }
                }
                return u
            }

            function o(t, e, i, a, n, r) {
                var o = (e - t) * n + t,
                    s = (i - e) * n + e,
                    h = (a - i) * n + i,
                    l = (s - o) * n + o,
                    u = (h - s) * n + s,
                    c = (u - l) * n + l;
                r[0] = t,
                    r[1] = o,
                    r[2] = l,
                    r[3] = c,
                    r[4] = c,
                    r[5] = u,
                    r[6] = h,
                    r[7] = a
            }

            function s(t, e, a, n, r, o, s, h, l, u, c) {
                var f, d, p, v, g, x = .005,
                    _ = 1 / 0;
                S[0] = l,
                    S[1] = u;
                for (var T = 0; 1 > T; T += .05)
                    P[0] = i(t, a, r, s, T),
                    P[1] = i(e, n, o, h, T),
                    v = y(S, P),
                    _ > v && (f = T,
                        _ = v);
                _ = 1 / 0;
                for (var b = 0; 32 > b && !(w > x); b++)
                    d = f - x,
                    p = f + x,
                    P[0] = i(t, a, r, s, d),
                    P[1] = i(e, n, o, h, d),
                    v = y(P, S),
                    d >= 0 && _ > v ? (f = d,
                        _ = v) : (L[0] = i(t, a, r, s, p),
                        L[1] = i(e, n, o, h, p),
                        g = y(L, S),
                        1 >= p && _ > g ? (f = p,
                            _ = g) : x *= .5);
                return c && (c[0] = i(t, a, r, s, f),
                        c[1] = i(e, n, o, h, f)),
                    m(_)
            }

            function h(t, e, i, a) {
                var n = 1 - a;
                return n * (n * t + 2 * a * e) + a * a * i
            }

            function l(t, e, i, a) {
                return 2 * ((1 - a) * (e - t) + a * (i - e))
            }

            function u(i, a, n, r, o) {
                var s = i - 2 * a + n,
                    h = 2 * (a - i),
                    l = i - r,
                    u = 0;
                if (t(s)) {
                    if (e(h)) {
                        var c = -l / h;
                        c >= 0 && 1 >= c && (o[u++] = c)
                    }
                } else {
                    var f = h * h - 4 * s * l;
                    if (t(f)) {
                        var c = -h / (2 * s);
                        c >= 0 && 1 >= c && (o[u++] = c)
                    } else if (f > 0) {
                        var d = m(f),
                            c = (-h + d) / (2 * s),
                            p = (-h - d) / (2 * s);
                        c >= 0 && 1 >= c && (o[u++] = c),
                            p >= 0 && 1 >= p && (o[u++] = p)
                    }
                }
                return u
            }

            function c(t, e, i) {
                var a = t + i - 2 * e;
                return 0 === a ? .5 : (t - e) / a
            }

            function f(t, e, i, a, n) {
                var r = (e - t) * a + t,
                    o = (i - e) * a + e,
                    s = (o - r) * a + r;
                n[0] = t,
                    n[1] = r,
                    n[2] = s,
                    n[3] = s,
                    n[4] = o,
                    n[5] = i
            }

            function d(t, e, i, a, n, r, o, s, l) {
                var u, c = .005,
                    f = 1 / 0;
                S[0] = o,
                    S[1] = s;
                for (var d = 0; 1 > d; d += .05) {
                    P[0] = h(t, i, n, d),
                        P[1] = h(e, a, r, d);
                    var p = y(S, P);
                    f > p && (u = d,
                        f = p)
                }
                f = 1 / 0;
                for (var v = 0; 32 > v && !(w > c); v++) {
                    var g = u - c,
                        x = u + c;
                    P[0] = h(t, i, n, g),
                        P[1] = h(e, a, r, g);
                    var p = y(P, S);
                    if (g >= 0 && f > p)
                        u = g,
                        f = p;
                    else {
                        L[0] = h(t, i, n, x),
                            L[1] = h(e, a, r, x);
                        var _ = y(L, S);
                        1 >= x && f > _ ? (u = x,
                            f = _) : c *= .5
                    }
                }
                return l && (l[0] = h(t, i, n, u),
                        l[1] = h(e, a, r, u)),
                    m(f)
            }
            var v = p.create,
                y = p.distSquare,
                g = Math.pow,
                m = Math.sqrt,
                x = 1e-8,
                w = 1e-4,
                _ = m(3),
                T = 1 / 3,
                S = v(),
                P = v(),
                L = v();
            return {
                cubicAt: i,
                cubicDerivativeAt: a,
                cubicRootAt: n,
                cubicExtrema: r,
                cubicSubdivide: o,
                cubicProjectPoint: s,
                quadraticAt: h,
                quadraticDerivativeAt: l,
                quadraticRootAt: u,
                quadraticExtremum: c,
                quadraticSubdivide: f,
                quadraticProjectPoint: d
            }
        }(),
        y = function() {
            var t = {},
                e = Math.min,
                i = Math.max,
                a = Math.sin,
                n = Math.cos,
                r = p.create(),
                o = p.create(),
                s = p.create(),
                h = 2 * Math.PI;
            t.fromPoints = function(t, a, n) {
                    if (0 !== t.length) {
                        var r, o = t[0],
                            s = o[0],
                            h = o[0],
                            l = o[1],
                            u = o[1];
                        for (r = 1; r < t.length; r++)
                            o = t[r],
                            s = e(s, o[0]),
                            h = i(h, o[0]),
                            l = e(l, o[1]),
                            u = i(u, o[1]);
                        a[0] = s,
                            a[1] = l,
                            n[0] = h,
                            n[1] = u
                    }
                },
                t.fromLine = function(t, a, n, r, o, s) {
                    o[0] = e(t, n),
                        o[1] = e(a, r),
                        s[0] = i(t, n),
                        s[1] = i(a, r)
                };
            var l = [],
                u = [];
            return t.fromCubic = function(t, a, n, r, o, s, h, c, f, d) {
                    var p, y = v.cubicExtrema,
                        g = v.cubicAt,
                        m = y(t, n, o, h, l);
                    for (f[0] = 1 / 0,
                        f[1] = 1 / 0,
                        d[0] = -(1 / 0),
                        d[1] = -(1 / 0),
                        p = 0; m > p; p++) {
                        var x = g(t, n, o, h, l[p]);
                        f[0] = e(x, f[0]),
                            d[0] = i(x, d[0])
                    }
                    for (m = y(a, r, s, c, u),
                        p = 0; m > p; p++) {
                        var w = g(a, r, s, c, u[p]);
                        f[1] = e(w, f[1]),
                            d[1] = i(w, d[1])
                    }
                    f[0] = e(t, f[0]),
                        d[0] = i(t, d[0]),
                        f[0] = e(h, f[0]),
                        d[0] = i(h, d[0]),
                        f[1] = e(a, f[1]),
                        d[1] = i(a, d[1]),
                        f[1] = e(c, f[1]),
                        d[1] = i(c, d[1])
                },
                t.fromQuadratic = function(t, a, n, r, o, s, h, l) {
                    var u = v.quadraticExtremum,
                        c = v.quadraticAt,
                        f = i(e(u(t, n, o), 1), 0),
                        d = i(e(u(a, r, s), 1), 0),
                        p = c(t, n, o, f),
                        y = c(a, r, s, d);
                    h[0] = e(t, o, p),
                        h[1] = e(a, s, y),
                        l[0] = i(t, o, p),
                        l[1] = i(a, s, y)
                },
                t.fromArc = function(t, e, i, l, u, c, f, d, v) {
                    var y = p.min,
                        g = p.max,
                        m = Math.abs(u - c);
                    if (1e-4 > m % h && m > 1e-4)
                        return d[0] = t - i,
                            d[1] = e - l,
                            v[0] = t + i,
                            void(v[1] = e + l);
                    if (r[0] = n(u) * i + t,
                        r[1] = a(u) * l + e,
                        o[0] = n(c) * i + t,
                        o[1] = a(c) * l + e,
                        y(d, r, o),
                        g(v, r, o),
                        u %= h,
                        0 > u && (u += h),
                        c %= h,
                        0 > c && (c += h),
                        u > c && !f ? c += h : c > u && f && (u += h),
                        f) {
                        var x = c;
                        c = u,
                            u = x
                    }
                    for (var w = 0; c > w; w += Math.PI / 2)
                        w > u && (s[0] = n(w) * i + t,
                            s[1] = a(w) * l + e,
                            y(d, s, d),
                            g(v, s, v))
                },
                t
        }(),
        g = function() {
            function t(t, e, i, a) {
                this.x = t,
                    this.y = e,
                    this.width = i,
                    this.height = a
            }
            var e = p.applyTransform,
                i = Math.min,
                a = Math.abs,
                n = Math.max;
            return t.prototype = {
                    constructor: t,
                    union: function(t) {
                        var e = i(t.x, this.x),
                            a = i(t.y, this.y);
                        this.width = n(t.x + t.width, this.x + this.width) - e,
                            this.height = n(t.y + t.height, this.y + this.height) - a,
                            this.x = e,
                            this.y = a
                    },
                    applyTransform: function() {
                        var t = [],
                            n = [];
                        return function(r) {
                            r && (t[0] = this.x,
                                t[1] = this.y,
                                n[0] = this.x + this.width,
                                n[1] = this.y + this.height,
                                e(t, t, r),
                                e(n, n, r),
                                this.x = i(t[0], n[0]),
                                this.y = i(t[1], n[1]),
                                this.width = a(n[0] - t[0]),
                                this.height = a(n[1] - t[1]))
                        }
                    }(),
                    contain: function(t, e) {
                        var i = this;
                        return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height
                    },
                    clone: function() {
                        return new t(this.x, this.y, this.width, this.height)
                    },
                    copy: function(t) {
                        this.x = t.x,
                            this.y = t.y,
                            this.width = t.width,
                            this.height = t.height
                    }
                },
                t
        }(),
        m = function() {
            var t = {
                    M: 1,
                    L: 2,
                    C: 3,
                    Q: 4,
                    A: 5,
                    Z: 6,
                    R: 7
                },
                e = [],
                i = [],
                a = [],
                n = [],
                r = Math.min,
                o = Math.max,
                s = Math.cos,
                h = Math.sin,
                l = Math.sqrt,
                u = Math.abs,
                c = "undefined" != typeof Float32Array,
                d = function() {
                    this.data = [],
                        this._len = 0,
                        this._ctx = null,
                        this._xi = 0,
                        this._yi = 0,
                        this._x0 = 0,
                        this._y0 = 0,
                        this._ux = 0,
                        this._uy = 0
                };
            return d.prototype = {
                    constructor: d,
                    _lineDash: null,
                    _dashOffset: 0,
                    _dashIdx: 0,
                    _dashSum: 0,
                    setScale: function(t, e) {
                        this._ux = u(1 / f / t) || 0,
                            this._uy = u(1 / f / e) || 0
                    },
                    getContext: function() {
                        return this._ctx
                    },
                    beginPath: function(t) {
                        return this._ctx = t,
                            t && t.beginPath(),
                            this._len = 0,
                            this._lineDash && (this._lineDash = null,
                                this._dashOffset = 0),
                            this
                    },
                    moveTo: function(e, i) {
                        return this.addData(t.M, e, i),
                            this._ctx && this._ctx.moveTo(e, i),
                            this._x0 = e,
                            this._y0 = i,
                            this._xi = e,
                            this._yi = i,
                            this
                    },
                    lineTo: function(e, i) {
                        var a = u(e - this._xi) > this._ux || u(i - this._yi) > this._uy || 0 === this._len;
                        return this.addData(t.L, e, i),
                            this._ctx && a && (this._needsDash() ? this._dashedLineTo(e, i) : this._ctx.lineTo(e, i)),
                            a && (this._xi = e,
                                this._yi = i),
                            this
                    },
                    bezierCurveTo: function(e, i, a, n, r, o) {
                        return this.addData(t.C, e, i, a, n, r, o),
                            this._ctx && (this._needsDash() ? this._dashedBezierTo(e, i, a, n, r, o) : this._ctx.bezierCurveTo(e, i, a, n, r, o)),
                            this._xi = r,
                            this._yi = o,
                            this
                    },
                    quadraticCurveTo: function(e, i, a, n) {
                        return this.addData(t.Q, e, i, a, n),
                            this._ctx && (this._needsDash() ? this._dashedQuadraticTo(e, i, a, n) : this._ctx.quadraticCurveTo(e, i, a, n)),
                            this._xi = a,
                            this._yi = n,
                            this
                    },
                    arc: function(e, i, a, n, r, o) {
                        return this.addData(t.A, e, i, a, a, n, r - n, 0, o ? 0 : 1),
                            this._ctx && this._ctx.arc(e, i, a, n, r, o),
                            this._xi = s(r) * a + e,
                            this._xi = h(r) * a + e,
                            this
                    },
                    arcTo: function(t, e, i, a, n) {
                        return this._ctx && this._ctx.arcTo(t, e, i, a, n),
                            this
                    },
                    rect: function(e, i, a, n) {
                        return this._ctx && this._ctx.rect(e, i, a, n),
                            this.addData(t.R, e, i, a, n),
                            this
                    },
                    closePath: function() {
                        this.addData(t.Z);
                        var e = this._ctx,
                            i = this._x0,
                            a = this._y0;
                        return e && (this._needsDash() && this._dashedLineTo(i, a),
                                e.closePath()),
                            this._xi = i,
                            this._yi = a,
                            this
                    },
                    fill: function(t) {
                        t && t.fill(),
                            this.toStatic()
                    },
                    stroke: function(t) {
                        t && t.stroke(),
                            this.toStatic()
                    },
                    setLineDash: function(t) {
                        if (t instanceof Array) {
                            this._lineDash = t,
                                this._dashIdx = 0;
                            for (var e = 0, i = 0; i < t.length; i++)
                                e += t[i];
                            this._dashSum = e
                        }
                        return this
                    },
                    setLineDashOffset: function(t) {
                        return this._dashOffset = t,
                            this
                    },
                    len: function() {
                        return this._len
                    },
                    setData: function(t) {
                        var e = t.length;
                        this.data && this.data.length == e || !c || (this.data = new Float32Array(e));
                        for (var i = 0; e > i; i++)
                            this.data[i] = t[i];
                        this._len = e
                    },
                    appendPath: function(t) {
                        t instanceof Array || (t = [t]);
                        for (var e = t.length, i = 0, a = this._len, n = 0; e > n; n++)
                            i += t[n].len();
                        c && this.data instanceof Float32Array && (this.data = new Float32Array(a + i));
                        for (var n = 0; e > n; n++)
                            for (var r = t[n].data, o = 0; o < r.length; o++)
                                this.data[a++] = r[o];
                        this._len = a
                    },
                    addData: function(t) {
                        var e = this.data;
                        this._len + arguments.length > e.length && (this._expandData(),
                            e = this.data);
                        for (var i = 0; i < arguments.length; i++)
                            e[this._len++] = arguments[i];
                        this._prevCmd = t
                    },
                    _expandData: function() {
                        if (!(this.data instanceof Array)) {
                            for (var t = [], e = 0; e < this._len; e++)
                                t[e] = this.data[e];
                            this.data = t
                        }
                    },
                    afterPathBuild: function() {
                        this.data.length != this._len && this._expandData()
                    },
                    _needsDash: function() {
                        return this._lineDash
                    },
                    _dashedLineTo: function(t, e) {
                        var i, a, n = this._dashSum,
                            s = this._dashOffset,
                            h = this._lineDash,
                            u = this._ctx,
                            c = this._xi,
                            f = this._yi,
                            d = t - c,
                            p = e - f,
                            v = l(d * d + p * p),
                            y = c,
                            g = f,
                            m = h.length;
                        for (d /= v,
                            p /= v,
                            0 > s && (s = n + s),
                            s %= n,
                            y -= s * d,
                            g -= s * p; d > 0 && t >= y || 0 > d && y >= t || 0 == d && (p > 0 && e >= g || 0 > p && g >= e);)
                            a = this._dashIdx,
                            i = h[a],
                            y += d * i,
                            g += p * i,
                            this._dashIdx = (a + 1) % m,
                            d > 0 && c > y || 0 > d && y > c || p > 0 && f > g || 0 > p && g > f || u[a % 2 ? "moveTo" : "lineTo"](d >= 0 ? r(y, t) : o(y, t), p >= 0 ? r(g, e) : o(g, e));
                        d = y - t,
                            p = g - e,
                            this._dashOffset = -l(d * d + p * p)
                    },
                    _dashedBezierTo: function(t, e, i, a, n, r) {
                        var o, s, h, u, c, f = this._dashSum,
                            d = this._dashOffset,
                            p = this._lineDash,
                            y = this._ctx,
                            g = this._xi,
                            m = this._yi,
                            x = v.cubicAt,
                            w = 0,
                            _ = this._dashIdx,
                            T = p.length,
                            S = 0;
                        for (0 > d && (d = f + d),
                            d %= f,
                            o = 0; 1 > o; o += .1)
                            s = x(g, t, i, n, o + .1) - x(g, t, i, n, o),
                            h = x(m, e, a, r, o + .1) - x(m, e, a, r, o),
                            w += l(s * s + h * h);
                        for (; T > _ && (S += p[_],
                                !(S > d)); _++)
                        ;
                        for (o = (S - d) / w; 1 >= o;)
                            u = x(g, t, i, n, o),
                            c = x(m, e, a, r, o),
                            _ % 2 ? y.moveTo(u, c) : y.lineTo(u, c),
                            o += p[_] / w,
                            _ = (_ + 1) % T;
                        _ % 2 !== 0 && y.lineTo(n, r),
                            s = n - u,
                            h = r - c,
                            this._dashOffset = -l(s * s + h * h)
                    },
                    _dashedQuadraticTo: function(t, e, i, a) {
                        var n = i,
                            r = a;
                        i = (i + 2 * t) / 3,
                            a = (a + 2 * e) / 3,
                            t = (this._xi + 2 * t) / 3,
                            e = (this._yi + 2 * e) / 3,
                            this._dashedBezierTo(t, e, i, a, n, r)
                    },
                    toStatic: function() {
                        var t = this.data;
                        t instanceof Array && (t.length = this._len,
                            c && (this.data = new Float32Array(t)))
                    },
                    getBoundingRect: function() {
                        e[0] = e[1] = a[0] = a[1] = Number.MAX_VALUE,
                            i[0] = i[1] = n[0] = n[1] = -Number.MAX_VALUE;
                        for (var r = this.data, o = 0, l = 0, u = 0, c = 0, f = 0; f < r.length;) {
                            var d = r[f++];
                            switch (1 == f && (o = r[f],
                                    l = r[f + 1],
                                    u = o,
                                    c = l),
                                d) {
                                case t.M:
                                    u = r[f++],
                                        c = r[f++],
                                        o = u,
                                        l = c,
                                        a[0] = u,
                                        a[1] = c,
                                        n[0] = u,
                                        n[1] = c;
                                    break;
                                case t.L:
                                    y.fromLine(o, l, r[f], r[f + 1], a, n),
                                        o = r[f++],
                                        l = r[f++];
                                    break;
                                case t.C:
                                    y.fromCubic(o, l, r[f++], r[f++], r[f++], r[f++], r[f], r[f + 1], a, n),
                                        o = r[f++],
                                        l = r[f++];
                                    break;
                                case t.Q:
                                    y.fromQuadratic(o, l, r[f++], r[f++], r[f], r[f + 1], a, n),
                                        o = r[f++],
                                        l = r[f++];
                                    break;
                                case t.A:
                                    var v = r[f++],
                                        m = r[f++],
                                        x = r[f++],
                                        w = r[f++],
                                        _ = r[f++],
                                        T = r[f++] + _,
                                        S = (r[f++],
                                            1 - r[f++]);
                                    1 == f && (u = s(_) * x + v,
                                            c = h(_) * w + m),
                                        y.fromArc(v, m, x, w, _, T, S, a, n),
                                        o = s(T) * x + v,
                                        l = h(T) * w + m;
                                    break;
                                case t.R:
                                    u = o = r[f++],
                                        c = l = r[f++];
                                    var P = r[f++],
                                        L = r[f++];
                                    y.fromLine(u, c, u + P, c + L, a, n);
                                    break;
                                case t.Z:
                                    o = u,
                                        l = c
                            }
                            p.min(e, e, a),
                                p.max(i, i, n)
                        }
                        return 0 === f && (e[0] = e[1] = i[0] = i[1] = 0),
                            new g(e[0], e[1], i[0] - e[0], i[1] - e[1])
                    }
                },
                d.CMD = t,
                d
        }(),
        x = function() {
            function t(t, e) {
                return Math.abs(t - e) < y
            }

            function e() {
                var t = x[0];
                x[0] = x[1],
                    x[1] = t
            }

            function i(t, i, a, n, r, o, s, h, l, u) {
                if (u > i && u > n && u > o && u > h || i > u && n > u && o > u && h > u)
                    return 0;
                var c = v.cubicRootAt(i, n, o, h, u, g);
                if (0 === c)
                    return 0;
                for (var f, d, p = 0, y = -1, m = 0; c > m; m++) {
                    var w = g[m],
                        _ = v.cubicAt(t, a, r, s, w);
                    l > _ || (0 > y && (y = v.cubicExtrema(i, n, o, h, x),
                            x[1] < x[0] && y > 1 && e(),
                            f = v.cubicAt(i, n, o, h, x[0]),
                            y > 1 && (d = v.cubicAt(i, n, o, h, x[1]))),
                        p += 2 == y ? w < x[0] ? i > f ? 1 : -1 : w < x[1] ? f > d ? 1 : -1 : d > h ? 1 : -1 : w < x[0] ? i > f ? 1 : -1 : f > h ? 1 : -1)
                }
                return p
            }

            function a(t, e, i, a, n, r, o, s) {
                if (s > e && s > a && s > r || e > s && a > s && r > s)
                    return 0;
                var h = v.quadraticRootAt(e, a, r, s, g);
                if (0 === h)
                    return 0;
                var l = v.quadraticExtremum(e, a, r);
                if (l >= 0 && 1 >= l) {
                    for (var u = 0, c = v.quadraticAt(e, a, r, l), f = 0; h > f; f++) {
                        var d = v.quadraticAt(t, i, n, g[f]);
                        o > d || (u += g[f] < l ? e > c ? 1 : -1 : c > r ? 1 : -1)
                    }
                    return u
                }
                var d = v.quadraticAt(t, i, n, g[0]);
                return o > d ? 0 : e > r ? 1 : -1
            }

            function n(t, e, i, a, n, r, h, l) {
                if (l -= e,
                    l > i || -i > l)
                    return 0;
                var u = Math.sqrt(i * i - l * l);
                g[0] = -u,
                    g[1] = u;
                var c = Math.abs(a - n);
                if (1e-4 > c)
                    return 0;
                if (1e-4 > c % o) {
                    a = 0,
                        n = o;
                    var f = r ? 1 : -1;
                    return h >= g[0] + t && h <= g[1] + t ? f : 0
                }
                if (r) {
                    var u = a;
                    a = s(n),
                        n = s(u)
                } else
                    a = s(a),
                    n = s(n);
                a > n && (n += o);
                for (var d = 0, p = 0; 2 > p; p++) {
                    var v = g[p];
                    if (v + t > h) {
                        var y = Math.atan2(l, v),
                            f = r ? 1 : -1;
                        0 > y && (y = o + y),
                            (y >= a && n >= y || y + o >= a && n >= y + o) && (y > Math.PI / 2 && y < 1.5 * Math.PI && (f = -f),
                                d += f)
                    }
                }
                return d
            }

            function r(e, r, o, s, h) {
                for (var v = 0, y = 0, g = 0, m = 0, x = 0, w = 0; w < e.length;) {
                    var _ = e[w++];
                    if (_ === d.M && w > 1 && (o || (v += f(y, g, m, x, s, h)),
                            0 !== v))
                        return !0;
                    switch (1 == w && (y = e[w],
                            g = e[w + 1],
                            m = y,
                            x = g),
                        _) {
                        case d.M:
                            m = e[w++],
                                x = e[w++],
                                y = m,
                                g = x;
                            break;
                        case d.L:
                            if (o) {
                                if (p(y, g, e[w], e[w + 1], r, s, h))
                                    return !0
                            } else
                                v += f(y, g, e[w], e[w + 1], s, h) || 0;
                            y = e[w++],
                                g = e[w++];
                            break;
                        case d.C:
                            if (o) {
                                if (l.containStroke(y, g, e[w++], e[w++], e[w++], e[w++], e[w], e[w + 1], r, s, h))
                                    return !0
                            } else
                                v += i(y, g, e[w++], e[w++], e[w++], e[w++], e[w], e[w + 1], s, h) || 0;
                            y = e[w++],
                                g = e[w++];
                            break;
                        case d.Q:
                            if (o) {
                                if (u.containStroke(y, g, e[w++], e[w++], e[w], e[w + 1], r, s, h))
                                    return !0
                            } else
                                v += a(y, g, e[w++], e[w++], e[w], e[w + 1], s, h) || 0;
                            y = e[w++],
                                g = e[w++];
                            break;
                        case d.A:
                            var T = e[w++],
                                S = e[w++],
                                P = e[w++],
                                L = e[w++],
                                b = e[w++],
                                C = e[w++],
                                k = (e[w++],
                                    1 - e[w++]),
                                M = Math.cos(b) * P + T,
                                D = Math.sin(b) * L + S;
                            w > 1 ? v += f(y, g, M, D, s, h) : (m = M,
                                x = D);
                            var A = (s - T) * L / P + T;
                            if (o) {
                                if (c.containStroke(T, S, L, b, b + C, k, r, A, h))
                                    return !0
                            } else
                                v += n(T, S, L, b, b + C, k, A, h);
                            y = Math.cos(b + C) * P + T,
                                g = Math.sin(b + C) * L + S;
                            break;
                        case d.R:
                            m = y = e[w++],
                                x = g = e[w++];
                            var N = e[w++],
                                I = e[w++],
                                M = m + N,
                                D = x + I;
                            if (o) {
                                if (p(m, x, M, x, r, s, h) || p(M, x, M, D, r, s, h) || p(M, D, m, D, r, s, h) || p(m, D, m, x, r, s, h))
                                    return !0
                            } else
                                v += f(M, x, M, D, s, h),
                                v += f(m, D, m, x, s, h);
                            break;
                        case d.Z:
                            if (o) {
                                if (p(y, g, m, x, r, s, h))
                                    return !0
                            } else if (v += f(y, g, m, x, s, h),
                                0 !== v)
                                return !0;
                            y = m,
                                g = x
                    }
                }
                return o || t(g, x) || (v += f(y, g, m, x, s, h) || 0),
                    0 !== v
            }
            var o = 2 * Math.PI,
                s = function(t) {
                    return t %= o,
                        0 > t && (t += o),
                        t
                },
                h = {
                    containStroke: function(t, e, i, a, n, r, o) {
                        if (0 === n)
                            return !1;
                        var s = n,
                            h = 0,
                            l = t;
                        if (o > e + s && o > a + s || e - s > o && a - s > o || r > t + s && r > i + s || t - s > r && i - s > r)
                            return !1;
                        if (t === i)
                            return Math.abs(r - t) <= s / 2;
                        h = (e - a) / (t - i),
                            l = (t * a - i * e) / (t - i);
                        var u = h * r - o + l,
                            c = u * u / (h * h + 1);
                        return s / 2 * s / 2 >= c
                    }
                },
                l = {
                    containStroke: function(t, e, i, a, n, r, o, s, h, l, u) {
                        if (0 === h)
                            return !1;
                        var c = h;
                        if (u > e + c && u > a + c && u > r + c && u > s + c || e - c > u && a - c > u && r - c > u && s - c > u || l > t + c && l > i + c && l > n + c && l > o + c || t - c > l && i - c > l && n - c > l && o - c > l)
                            return !1;
                        var f = v.cubicProjectPoint(t, e, i, a, n, r, o, s, l, u, null);
                        return c / 2 >= f
                    }
                },
                u = {
                    containStroke: function(t, e, i, a, n, r, o, s, h) {
                        if (0 === o)
                            return !1;
                        var l = o;
                        if (h > e + l && h > a + l && h > r + l || e - l > h && a - l > h && r - l > h || s > t + l && s > i + l && s > n + l || t - l > s && i - l > s && n - l > s)
                            return !1;
                        var u = v.quadraticProjectPoint(t, e, i, a, n, r, s, h, null);
                        return l / 2 >= u
                    }
                },
                c = {
                    containStroke: function(t, e, i, a, n, r, h, l, u) {
                        if (0 === h)
                            return !1;
                        var c = h;
                        l -= t,
                            u -= e;
                        var f = Math.sqrt(l * l + u * u);
                        if (f - c > i || i > f + c)
                            return !1;
                        if (Math.abs(a - n) % o < 1e-4)
                            return !0;
                        if (r) {
                            var d = a;
                            a = s(n),
                                n = s(d)
                        } else
                            a = s(a),
                            n = s(n);
                        a > n && (n += o);
                        var p = Math.atan2(u, l);
                        return 0 > p && (p += o),
                            p >= a && n >= p || p + o >= a && n >= p + o
                    }
                },
                f = function(t, e, i, a, n, r) {
                    if (r > e && r > a || e > r && a > r)
                        return 0;
                    if (a === e)
                        return 0;
                    var o = e > a ? 1 : -1,
                        s = (r - e) / (a - e),
                        h = s * (i - t) + t;
                    return h > n ? o : 0
                },
                d = m.CMD,
                p = h.containStroke,
                y = 1e-4,
                g = [-1, -1, -1],
                x = [-1, -1];
            return {
                contain: function(t, e, i) {
                    return r(t, 0, !1, e, i)
                },
                containStroke: function(t, e, i, a) {
                    return r(t, e, !0, i, a)
                }
            }
        }(),
        w = function() {
            function t(t, e) {
                var o = t + ":" + e;
                if (i[o])
                    return i[o];
                for (var s = (t + "").split("\n"), h = 0, l = 0, u = s.length; u > l; l++)
                    h = Math.max(r.measureText(s[l], e).width, h);
                return a > n && (a = 0,
                        i = {}),
                    a++,
                    i[o] = h,
                    h
            }

            function e(e, i, a, n) {
                var r = ((e || "") + "").split("\n").length,
                    o = t(e, i),
                    s = t("国", i),
                    h = r * s,
                    l = new g(0, 0, o, h);
                switch (l.lineHeight = s,
                    n) {
                    case "bottom":
                    case "alphabetic":
                        l.y -= s;
                        break;
                    case "middle":
                        l.y -= s / 2
                }
                switch (a) {
                    case "end":
                    case "right":
                        l.x -= l.width;
                        break;
                    case "center":
                        l.x -= l.width / 2
                }
                return l
            }
            var i = {},
                a = 0,
                n = 5e3,
                r = {
                    getWidth: t,
                    getBoundingRect: e,
                    measureText: function(t, e) {
                        var i = o();
                        return i.font = e,
                            i.measureText(t)
                    }
                };
            return r
        }(),
        _ = function() {
            var t = function() {
                this.eventList = {}
            };
            return t.prototype = {
                    bind: function(t, e, i, a) {
                        var n = this.eventList;
                        return e && t ? (n[t] || (n[t] = []),
                            n[t].push({
                                handler: e,
                                one: a,
                                ctx: i || this
                            }),
                            this) : this
                    },
                    unbind: function(t, e) {
                        var i = this.eventList;
                        if (!t)
                            return this.eventList = {},
                                this;
                        if (e) {
                            if (i[t]) {
                                for (var a = [], n = 0, r = i[t].length; r > n; n++)
                                    i[t][n].handler != e && a.push(i[t][n]);
                                i[t] = a
                            }
                            i[t] && 0 === i[t].length && delete i[t]
                        } else
                            delete i[t]
                    },
                    dispatch: function(t) {
                        if (this.eventList[t]) {
                            var e = arguments,
                                i = e.length;
                            i > 3 && (e = util.slice.call(e, 1));
                            for (var a = this.eventList[t], n = a.length, r = 0; n > r;) {
                                switch (i) {
                                    case 1:
                                        a[r].handler.call(a[r].ctx);
                                        break;
                                    case 2:
                                        a[r].handler.call(a[r].ctx, e[1]);
                                        break;
                                    case 3:
                                        a[r].handler.call(a[r].ctx, e[1], e[2]);
                                        break;
                                    default:
                                        a[r].handler.apply(a[r].ctx, e)
                                }
                                a[r].one ? (a.splice(r, 1),
                                    n--) : r++
                            }
                        }
                        return this
                    }
                },
                t
        }(),
        T = function() {
            function e(t, e, i) {
                for (var a, n = t.length, r = this.layout, o = this.points, s = o[0][1], h = o[1][1], l = r[0][0], u = r[1][0], c = this.paintTool, f = c.param, d = f.width, p = h - s, v = 0; n > v; v++)
                    a = c._value2Y(p * t[v] + s),
                    u > l ? (e.moveTo(l, a),
                        e.lineTo(d, a)) : (e.moveTo(l, a),
                        e.lineTo(0, a));
                if (!i) {
                    var y = e.getContext(),
                        g = (this.style.lineWidth || 1) / 2;
                    for (y.save(),
                        y.fillStyle = this.style.strokeStyle || this.style.fillStyle,
                        y.textAlign = "center",
                        v = 0; n > v; v++)
                        a = c._value2Y(p * t[v] + s),
                        y.fillText((100 * t[v]).toFixed(1) + "% " + (s + p * t[v]).toFixed(1), u, a - g);
                    y.restore()
                }
            }
            var i = function(t) {
                t = t || {},
                    t.paintTool && (this.paintTool = t.paintTool),
                    t.style && (this.style = t.style),
                    this.style.layoutPointRadius = 2 * (this.style.lineWidth || 1) + 3,
                    this.path = new m,
                    this.layout = [],
                    this.points = []
            };
            i.prototype = {
                constructor: i,
                ignore: !1,
                display: !0,
                beforeDraw: function(t) {
                    t.save();
                    var e = this.style.lineWidth;
                    e && e % 2 == 0 && t.translate(.5, .5)
                },
                afterDraw: function(t) {
                    t.restore()
                },
                getStyle: function() {
                    return this.style
                },
                setStyle: function(t, e) {
                    for (var i in e)
                        e.hasOwnProperty(i) && (t[i] = e[i])
                },
                setShowLayoutPoint: function(t) {
                    this.style.showLayoutPoint = t
                },
                draw: function(t) {
                    var e = this.path,
                        i = this.getStyle();
                    this.setStyle(t, i),
                        this.beforeDraw(t),
                        e.beginPath(t);
                    var a = !!t.setLineDash,
                        n = i.lineDash,
                        r = i.lineDashOffset;
                    n && !a && (e.setLineDash(n),
                            r && e.setLineDashOffset(r)),
                        this.drawPath(e),
                        e.afterPathBuild(),
                        i.fillStyle && e.fill(t),
                        n && a && (t.setLineDash(n),
                            t.lineDashOffset = r),
                        i.strokeStyle && e.stroke(t),
                        this.afterDraw(t),
                        this.style.showLayoutPoint && this.drawLayoutPoint(t)
                },
                drawLayoutPoint: function(t) {
                    t.beginPath();
                    var e = this.layout,
                        i = this.style.layoutPointRadius;
                    t.fillStyle = this.style.layoutPointColor;
                    for (var a = e.length; a--;)
                        t.moveTo(e[a][0] + i, e[a][1]),
                        t.arc(e[a][0], e[a][1], i, 0, 2 * Math.PI);
                    t.fill(),
                        t.closePath()
                },
                drawPath: function() {
                    throw new Error("drawPath not implemented in " + this.type)
                },
                updateBoundingRect: function() {
                    var t = this.style,
                        e = this.path;
                    e.beginPath(this.paintTool.interactCtx),
                        this.drawPath(e, !0);
                    var i = e.getBoundingRect();
                    if (l(t)) {
                        var a = t.lineWidth < d ? d : t.lineWidth;
                        i.width += a,
                            i.height += a,
                            i.x -= a / 2,
                            i.y -= a / 2
                    }
                    return this._rect = i,
                        i
                },
                getBoundingRect: function() {
                    return !this._rect && this.updateBoundingRect(),
                        this._rect
                },
                contain: function(t, e) {
                    var i = this.style,
                        a = this.getBoundingRect();
                    if (a.contain(t, e)) {
                        var n = this.path.data;
                        if (l(i)) {
                            var r = i.lineWidth;
                            if (x.containStroke(n, d > r ? d : r, t, e))
                                return !0
                        }
                        if (h(i))
                            return x.contain(n, t, e)
                    }
                    return !1
                }
            };
            var a = function(t) {
                i.call(this, t)
            };
            a.prototype = {
                    type: "DownTringle",
                    pointsNum: 1,
                    drawPath: function(t) {
                        if (this.layout) {
                            var e = this.layout,
                                i = e[0][0],
                                a = e[0][1],
                                n = 5;
                            t.moveTo(i, a),
                                t.lineTo(i - n, a - n),
                                t.lineTo(i + n, a - n),
                                t.lineTo(i, a)
                        }
                    },
                    init: function() {
                        return this.style.fillStyle = "gray",
                            this
                    }
                },
                t(a, i);
            var n = function(t) {
                i.call(this, t)
            };
            n.prototype = {
                    type: "FreeArrow",
                    pointsNum: 2,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e = Math.PI / 3,
                                i = 10 * (+(this.style.lineWidth || 1) + 2),
                                a = this.layout,
                                n = a[0][0],
                                r = a[0][1],
                                o = a[1][0],
                                s = a[1][1],
                                h = Math.atan2(s - r, o - n),
                                l = Math.sqrt(Math.pow(o - n, 2) + Math.pow(s - r, 2));
                            l < Math.cos(e / 2) * i && (i = l / Math.cos(e / 2)),
                                i /= 2,
                                e /= 2;
                            var u = [];
                            u[0] = n,
                                u[1] = r,
                                u[6] = o,
                                u[7] = s,
                                u[8] = o - i * Math.cos(h + e),
                                u[9] = s - i * Math.sin(h + e),
                                u[4] = o - i * Math.cos(h - e),
                                u[5] = s - i * Math.sin(h - e);
                            var c = (u[4] + u[8]) / 2,
                                f = (u[5] + u[9]) / 2;
                            u[2] = (u[4] + c) / 2,
                                u[3] = (u[5] + f) / 2,
                                u[10] = (u[8] + c) / 2,
                                u[11] = (u[9] + f) / 2,
                                t.moveTo(u[0], u[1]),
                                t.lineTo(u[2], u[3]),
                                t.lineTo(u[4], u[5]),
                                t.lineTo(u[6], u[7]),
                                t.lineTo(u[8], u[9]),
                                t.lineTo(u[10], u[11]),
                                t.closePath()
                        }
                    },
                    init: function() {
                        return this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle),
                                this.style.strokeStyle = void 0),
                            this
                    }
                },
                t(n, i);
            var r = function(t) {
                i.call(this, t)
            };
            r.prototype = {
                    type: "UpArrow",
                    pointsNum: 1,
                    drawPath: function(t) {
                        if (this.layout) {
                            var e = this.layout,
                                i = e[0][0],
                                a = e[0][1],
                                n = +(this.style.lineWidth || 1) + 1;
                            t.moveTo(i, a),
                                t.lineTo(i - 3 * n, a + 3 * n),
                                t.lineTo(i - n, a + 3 * n),
                                t.lineTo(i - n, a + 6 * n),
                                t.lineTo(i + n, a + 6 * n),
                                t.lineTo(i + n, a + 3 * n),
                                t.lineTo(i + 3 * n, a + 3 * n),
                                t.lineTo(i, a)
                        }
                    },
                    init: function() {
                        return this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle),
                                this.style.strokeStyle = void 0),
                            this
                    }
                },
                t(r, i);
            var o = function(t) {
                i.call(this, t)
            };
            o.prototype = {
                    type: "DownArrow",
                    pointsNum: 1,
                    drawPath: function(t) {
                        if (this.layout) {
                            var e = this.layout,
                                i = e[0][0],
                                a = e[0][1],
                                n = +(this.style.lineWidth || 1) + 1;
                            t.moveTo(i, a),
                                t.lineTo(i - 3 * n, a - 3 * n),
                                t.lineTo(i - n, a - 3 * n),
                                t.lineTo(i - n, a - 6 * n),
                                t.lineTo(i + n, a - 6 * n),
                                t.lineTo(i + n, a - 3 * n),
                                t.lineTo(i + 3 * n, a - 3 * n),
                                t.lineTo(i, a)
                        }
                    },
                    init: function() {
                        return this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle),
                                this.style.strokeStyle = void 0),
                            this
                    }
                },
                t(o, i);
            var u = function(t) {
                r.call(this, t)
            };
            u.prototype = {
                    type: "RedUpArrow",
                    init: function() {
                        return this.style.fillStyle = "red",
                            this.style.strokeStyle = void 0,
                            this
                    }
                },
                t(u, r);
            var c = function(t) {
                r.call(this, t)
            };
            c.prototype = {
                    type: "GreenUpArrow",
                    init: function() {
                        return this.style.fillStyle = "green",
                            this.style.strokeStyle = void 0,
                            this
                    }
                },
                t(c, r);
            var f = function(t) {
                o.call(this, t)
            };
            f.prototype = {
                    type: "GreenDownArrow",
                    init: function() {
                        return this.style.fillStyle = "green",
                            this.style.strokeStyle = void 0,
                            this
                    }
                },
                t(f, o);
            var p = function(t) {
                o.call(this, t)
            };
            p.prototype = {
                    type: "RedDownArrow",
                    init: function() {
                        return this.style.fillStyle = "red",
                            this.style.strokeStyle = void 0,
                            this
                    }
                },
                t(p, o);
            var v = function(t) {
                i.call(this, t)
            };
            v.prototype = {
                    type: "Text",
                    pointsNum: "Text",
                    drawPath: function(t) {
                        var e = this.layout,
                            i = this.style,
                            a = e[0][0] || 0,
                            n = e[0][1] || 0,
                            r = i.text,
                            o = i.fillStyle,
                            s = i.strokeStyle;
                        if (null != r && (r += ""),
                            r) {
                            if (i.textVerticalAlign) {
                                var h = w.getBoundingRect(r, t.font, i.textAlign, "top");
                                switch (t.textBaseline = "middle",
                                    i.textVerticalAlign) {
                                    case "middle":
                                        n -= h.height / 2 - h.lineHeight / 2;
                                        break;
                                    case "bottom":
                                        n -= h.height - h.lineHeight / 2;
                                        break;
                                    default:
                                        n += h.lineHeight / 2
                                }
                            } else
                                t.textBaseline = i.textBaseline;
                            for (var l = w.measureText("国", t.font).width, u = r.split("\n"), c = 0; c < u.length; c++)
                                o && t.fillText(u[c], a, n),
                                s && t.strokeText(u[c], a, n),
                                n += l
                        }
                    },
                    updateBoundingRect: function() {
                        var t = this.style,
                            e = this.layout[0],
                            i = t.textVerticalAlign,
                            a = w.getBoundingRect(t.text + "", t.font, t.textAlign, i ? "top" : t.textBaseline);
                        switch (i) {
                            case "middle":
                                a.y -= a.height / 2;
                                break;
                            case "bottom":
                                a.y -= a.height
                        }
                        return a.x += e[0] || 0,
                            a.y += e[1] || 0,
                            this._rect = a,
                            a
                    },
                    contain: function(t, e) {
                        var i = this.getBoundingRect();
                        return i.contain(t, e)
                    },
                    draw: function(t) {
                        this.beforeDraw(t);
                        var e = this.getStyle();
                        this.setStyle(t, e),
                            t.beginPath(),
                            this.drawPath(t),
                            t.closePath(),
                            this.afterDraw(t),
                            this.style.showLayoutPoint && this.drawLayoutPoint(t)
                    },
                    init: function(t) {
                        return t ? (this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle),
                                this.style.strokeStyle = void 0),
                            this.style.text = t,
                            this.style.textBaseline = "top",
                            this) : !1
                    }
                },
                t(v, i);
            var y = function(t) {
                i.call(this, t)
            };
            y.prototype = {
                    type: "Line",
                    pointsNum: 2,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a, n, r = this.layout,
                                o = r[0][0],
                                s = r[0][1],
                                h = r[1][0],
                                l = r[1][1],
                                u = (l - s) / (h - o),
                                c = s - u * o,
                                f = this.paintTool.showCanvas.height,
                                d = this.paintTool.showCanvas.width;
                            switch (!0) {
                                case u == -(1 / 0):
                                case u == 1 / 0:
                                    e = o,
                                        i = 0,
                                        a = h,
                                        n = f;
                                    break;
                                case 0 > u:
                                    e = 0,
                                        i = c,
                                        a = -c / u,
                                        n = 0;
                                    break;
                                case 0 == u:
                                    e = 0,
                                        i = s,
                                        a = d,
                                        n = l;
                                    break;
                                case u > 0:
                                    e = 0,
                                        i = c,
                                        a = (f - c) / u,
                                        n = f
                            }
                            t.moveTo(e, i),
                                t.lineTo(a, n)
                        }
                    }
                },
                t(y, i);
            var g = function(t) {
                i.call(this, t)
            };
            g.prototype = {
                    type: "Level",
                    pointsNum: 1,
                    drawPath: function(t, e) {
                        if (this.layout) {
                            var i = this.paintTool,
                                a = i.showCanvas.width,
                                n = this.layout;
                            if (t.moveTo(0, n[0][1]),
                                t.lineTo(a, n[0][1]),
                                !e) {
                                var r = t.getContext(),
                                    o = (this.style.lineWidth || 1) / 2;
                                r.save(),
                                    r.fillStyle = this.style.strokeStyle || this.style.fillStyle;
                                var s = this.points[0][1].toFixed(2);
                                r.fillText(s, 0, n[0][1] - o),
                                    r.restore()
                            }
                        }
                    }
                },
                t(g, i);
            var _ = function(t) {
                i.call(this, t)
            };
            _.prototype = {
                    type: "Segment",
                    pointsNum: 2,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e = this.layout;
                            t.moveTo(e[0][0], e[0][1]),
                                t.lineTo(e[1][0], e[1][1])
                        }
                    }
                },
                t(_, i);
            var T = function(t) {
                i.call(this, t)
            };
            T.prototype = {
                    type: "Rect",
                    pointsNum: 2,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e = this.layout,
                                i = e[0][0],
                                a = e[0][1],
                                n = e[1][0],
                                r = e[1][1];
                            t.rect(i, a, n - i, r - a)
                        }
                    }
                },
                t(T, i);
            var S = function(t) {
                i.call(this, t)
            };
            S.prototype = {
                    type: "Triangle",
                    pointsNum: 3,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a = this.layout,
                                n = a[0][0],
                                r = a[0][1],
                                o = a[1][0],
                                s = a[1][1];
                            a[2] && (e = a[2][0],
                                    i = a[2][1]),
                                t.moveTo(n, r),
                                t.lineTo(o, s),
                                e && (t.lineTo(e, i),
                                    t.lineTo(n, r))
                        }
                    }
                },
                t(S, i);
            var P = function(t) {
                i.call(this, t)
            };
            P.prototype = {
                    type: "QuadraticCurve",
                    pointsNum: 3,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a = this.layout,
                                n = a[0][0],
                                r = a[0][1],
                                o = a[1][0],
                                s = a[1][1];
                            a[2] ? (e = a[2][0],
                                i = a[2][1],
                                t.moveTo(n, r),
                                t.quadraticCurveTo(e, i, o, s)) : (t.moveTo(n, r),
                                t.lineTo(o, s))
                        }
                    }
                },
                t(P, i);
            var L = function(t) {
                i.call(this, t)
            };
            L.prototype = {
                    type: "Parallelogram",
                    pointsNum: 3,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a, n, r = this.layout,
                                o = r[0][0],
                                s = r[0][1],
                                h = r[1][0],
                                l = r[1][1];
                            r[2] && (e = r[2][0],
                                    i = r[2][1],
                                    a = r[2][0] - r[1][0] + r[0][0],
                                    n = r[2][1] - r[1][1] + r[0][1]),
                                t.moveTo(o, s),
                                t.lineTo(h, l),
                                e && (t.lineTo(e, i),
                                    t.lineTo(a, n),
                                    t.lineTo(o, s))
                        }
                    }
                },
                t(L, i);
            var b = function(t) {
                i.call(this, t)
            };
            b.prototype = {
                    type: "ParallelSegment",
                    pointsNum: 3,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a = this.layout,
                                n = a[0][0],
                                r = a[0][1],
                                o = a[1][0],
                                s = a[1][1];
                            a[2] && (e = a[2][0] - a[1][0] + a[0][0],
                                    i = a[2][1] - a[1][1] + a[0][1]),
                                t.moveTo(n, r),
                                t.lineTo(o, s),
                                a[2] && (t.moveTo(e + (o - n), i + (s - r)),
                                    t.lineTo(e, i))
                        }
                    }
                },
                t(b, i);
            var C = function(t) {
                i.call(this, t)
            };
            C.prototype = {
                    type: "ParallelLine",
                    pointsNum: 3,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a, n, r, o, s = this.layout,
                                h = s[0][0],
                                l = s[0][1],
                                u = s[1][0],
                                c = s[1][1],
                                f = (c - l) / (u - h),
                                d = l - f * h,
                                p = this.paintTool.showCanvas.height,
                                v = this.paintTool.showCanvas.width;
                            s[2] && (e = s[2][0],
                                    i = s[2][1],
                                    a = s[2][0] - s[1][0] + s[0][0],
                                    n = s[2][1] - s[1][1] + s[0][1]),
                                r = this.getBoundryXY(v, p, h, l, u, c, f, d),
                                t.moveTo(r.xF, r.yF),
                                t.lineTo(r.xT, r.yT),
                                s[2] && (d = n - f * a,
                                    o = this.getBoundryXY(v, p, a, n, e, i, f, d),
                                    t.moveTo(o.xF, o.yF),
                                    t.lineTo(o.xT, o.yT))
                        }
                    },
                    getBoundryXY: function(t, e, i, a, n, r, o, s) {
                        var h, l, u, c;
                        switch (!0) {
                            case o == -(1 / 0):
                            case o == 1 / 0:
                                h = i,
                                    l = 0,
                                    u = n,
                                    c = e;
                                break;
                            case 0 > o:
                                h = 0,
                                    l = s,
                                    u = -s / o,
                                    c = 0;
                                break;
                            case 0 == o:
                                h = 0,
                                    l = a,
                                    u = t,
                                    c = r;
                                break;
                            case o > 0:
                                h = 0,
                                    l = s,
                                    u = (e - s) / o,
                                    c = e
                        }
                        return {
                            xF: h,
                            yF: l,
                            xT: u,
                            yT: c
                        }
                    }
                },
                t(C, i);
            var k = function(t) {
                i.call(this, t)
            };
            k.prototype = {
                    type: "Pen",
                    pointsNum: "Pen",
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e = this.layout;
                            t.moveTo(e[0][0], e[0][1]);
                            for (var i = 1, a = e.length; a > i; i++)
                                t.lineTo(e[i][0], e[i][1])
                        }
                    }
                },
                t(k, i);
            var M = function(t) {
                i.call(this, t)
            };
            M.prototype = {
                    type: "BezierCurve",
                    pointsNum: 4,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i, a, n, r = this.layout,
                                o = r[0][0],
                                s = r[0][1],
                                h = r[1][0],
                                l = r[1][1];
                            r[3] ? (e = r[2][0],
                                i = r[2][1],
                                a = r[3][0],
                                n = r[3][1],
                                t.moveTo(o, s),
                                t.bezierCurveTo(e, i, a, n, h, l)) : r[2] ? (e = r[2][0],
                                i = r[2][1],
                                t.moveTo(o, s),
                                t.quadraticCurveTo(e, i, h, l)) : (t.moveTo(o, s),
                                t.lineTo(h, l))
                        }
                    }
                },
                t(M, i);
            var D = function(t) {
                i.call(this, t)
            };
            D.prototype = {
                    type: "Fibonacci",
                    pointsNum: 2,
                    drawPath: function(t, e) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var i = this.points[1][0] - this.points[0][0];
                            if (0 != i) {
                                for (var a, n = this.layout, r = n[0][0], o = this.paintTool, s = this.paintTool.param, h = s.width, l = s.height, u = this.points[0][0], c = 1, f = 0, d = r; i > 0 && h > d || 0 > i && d > 0;)
                                    t.moveTo(d, 0),
                                    t.lineTo(d, l),
                                    a = f,
                                    f = c,
                                    c = a + c,
                                    d = o._index2X(u + c * i);
                                if (!e) {
                                    var p = t.getContext(),
                                        v = (this.style.lineWidth || 1) / 2;
                                    for (p.save(),
                                        p.fillStyle = this.style.strokeStyle || this.style.fillStyle,
                                        p.textBaseline = "top",
                                        c = 1,
                                        f = 0,
                                        d = r; i > 0 && h > d || 0 > i && d > 0;)
                                        a = f,
                                        f = c,
                                        c = a + c,
                                        d = o._index2X(u + c * i),
                                        p.fillText(c.toFixed(0), d + v, 0);
                                    p.restore()
                                }
                            }
                        }
                    }
                },
                t(D, i);
            var A = function(t) {
                i.call(this, t)
            };
            A.prototype = {
                    type: "CycleLine",
                    pointsNum: 2,
                    drawPath: function(t, e) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var i, a = this.points,
                                n = this.paintTool,
                                r = this.paintTool.param,
                                o = r.width,
                                s = r.height,
                                h = a[0][0],
                                l = a[1][0] - a[0][0],
                                u = h;
                            do
                                i = n._index2X(u),
                                t.moveTo(i, 0),
                                t.lineTo(i, s),
                                u += l;
                            while (0 > l && i > 0 || l > 0 && o > i);
                            if (!e) {
                                var c = t.getContext(),
                                    f = (this.style.lineWidth || 1) / 2;
                                c.save(),
                                    c.fillStyle = this.style.strokeStyle || this.style.fillStyle,
                                    c.textBaseline = "top",
                                    u = h;
                                do
                                    i = n._index2X(u),
                                    t.moveTo(i, 0),
                                    t.lineTo(i, s),
                                    c.fillText((u - h).toFixed(0), i + f, 0),
                                    u += l;
                                while (0 > l && i > 0 || l > 0 && o > i);
                                c.restore()
                            }
                        }
                    }
                },
                t(A, i);
            var N = function(t) {
                i.call(this, t)
            };
            N.prototype = {
                    type: "GoldenSection",
                    pointsNum: 2,
                    drawPath: function(t, i) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var a = [0, .236, .382, .5, .618, .809, 1, 1.382, 1.5, 1.618, 2, 2.382, 2.618, 4.236, 6.854];
                            e.call(this, a, t, i)
                        }
                    }
                },
                t(N, i);
            var I = function(t) {
                i.call(this, t)
            };
            I.prototype = {
                    type: "PercentLine",
                    pointsNum: 2,
                    drawPath: function(t, i) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var a = [0, .125, .25, .333, .375, .5, .625, .667, .75, .875, 1];
                            e.call(this, a, t, i)
                        }
                    }
                },
                t(I, i);
            var B = function(t) {
                i.call(this, t)
            };
            B.prototype = {
                    type: "LinearRegressionBand",
                    pointsNum: 2,
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e, i = this.layout,
                                a = i[0][0],
                                n = i[1][0],
                                r = this.paintTool,
                                o = this.paintTool.param,
                                h = o.height,
                                l = o.data,
                                u = o.xScale,
                                c = o.zoom[0],
                                f = Math.floor(a / u),
                                d = Math.floor(n / u),
                                p = Math.abs(d - f) + 1;

                            if (!(2 > p)) {
                                d + c > l.length - 1 && (d = l.length - c - 1,
                                        f = d - p + 1),
                                    0 > f + c && (f = 0,
                                        d = f + p - 1),
                                    a = r._index2X(f + c),
                                    n = r._index2X(d + c),
                                    e = (n - a) / (p - 1);
                                for (var v = a, y = [], g = 0; p > g; g++)
                                    y.push([v, r._value2Y(l[c + f + (d > f ? g : -g)].close)]),
                                    v += e;
                                var m, x, w = 0,
                                    _ = 0,
                                    T = 0,
                                    S = 0;
                                for (g = 0; p > g; g++)
                                    w += y[g][0],
                                    _ += y[g][1];
                                for (w /= p,
                                    _ /= p,
                                    g = 0; p > g; g++)
                                    T += y[g][0] * y[g][1],
                                    S += y[g][0] * y[g][0];
                                x = (T - p * w * _) / (S - p * w * w),
                                    m = _ - x * w;
                                var P = m + x * a,
                                    L = m + x * n;
                                t.moveTo(a, P),
                                    t.lineTo(n, L),
                                    this.layout[0][0] = a,
                                    this.layout[0][1] = P,
                                    this.layout[1][0] = n,
                                    this.layout[1][1] = L;
                                var b, C;
                                d > f ? (b = f + c,
                                    C = d + c) : (b = d + c,
                                    C = f + c);
                                var k = l.slice(b, C + 1),
                                    M = s(k, function(t, e) {
                                        return m + x * r._index2X(b + e) - r._value2Y(t.high)
                                    }),
                                    D = r._value2Y(l[b + M.index].high) - r._index2X(b + M.index) * x,
                                    A = D + x * a,
                                    N = D + x * n;
                                t.moveTo(a, A),
                                    t.lineTo(n, N);
                                var I = s(k, function(t, e) {
                                        return r._value2Y(t.low) - (m + x * r._index2X(b + e))
                                    }),
                                    B = r._value2Y(l[b + I.index].low) - r._index2X(b + I.index) * x,
                                    R = B + x * a,
                                    X = B + x * n;
                                t.moveTo(a, R),
                                    t.lineTo(n, X),
                                    t.moveTo(a, 0),
                                    t.lineTo(a, h),
                                    t.moveTo(n, 0),
                                    t.lineTo(n, h)
                            }
                        }
                    },
                    init: function() {
                        return this.paintTool.param.data ? this : !1
                    }
                },
                t(B, i);
            var R = function(t) {
                i.call(this, t)
            };
            R.prototype = {
                    type: "Ruler",
                    pointsNum: 2,
                    drawPath: function(t, e) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var i = this.layout,
                                a = i[0][1],
                                n = i[1][1],
                                r = i[0][0],
                                o = i[1][0];
                            if (t.moveTo(r, a),
                                t.lineTo(o, a),
                                t.lineTo(o, n),
                                t.lineTo(r, a),
                                !e) {
                                var s, h, l, u, c, f = t.getContext(),
                                    d = (this.style.lineWidth || 1) / 2,
                                    p = this.points[0][1],
                                    v = this.points[1][1],
                                    y = this.points[0][0],
                                    g = this.points[1][0],
                                    m = Math.atan2(n - a, o - r),
                                    x = Math.abs(m / Math.PI * 180),
                                    w = Math.min(Math.abs(o - r), Math.abs(n - a), 15);
                                x > 90 && (x = 180 - x),
                                    u = v > p ? d : -d,
                                    c = g > y ? d : -d,
                                    f.save(),
                                    f.moveTo(r, a),
                                    f.fillStyle = this.style.strokeStyle || this.style.fillStyle,
                                    f.textBaseline = v > p ? "bottom" : "top",
                                    f.textAlign = "center",
                                    f.fillText((g - y).toFixed(0), (r + o) / 2, a + u),
                                    f.textAlign = g > y ? "right" : "left",
                                    f.fillText(p.toFixed(2), o + c, a),
                                    f.textBaseline = v > p ? "top" : "bottom",
                                    f.fillText(v.toFixed(2), o + c, n),
                                    f.textBaseline = "middle",
                                    f.fillText((v - p).toFixed(2) + "(" + ((v - p) / p * 100).toFixed(2) + "%)", o + c, (a + n) / 2),
                                    g > y ? (f.textAlign = "left",
                                        v > p ? (s = m,
                                            h = 0) : (s = 0,
                                            h = m),
                                        l = m / 2) : (f.textAlign = "right",
                                        v > p ? (s = -Math.PI,
                                            h = m,
                                            l = (m - Math.PI) / 2) : (s = m,
                                            h = Math.PI,
                                            l = (m + Math.PI) / 2)),
                                    f.arc(r, a, w, s, h),
                                    w += 3,
                                    f.fillText(x.toFixed(0) + "°", r + Math.cos(l) * w + c, a + Math.sin(l) * w),
                                    f.restore()
                            }
                        }
                    }
                },
                t(R, i);
            var X = function(t) {
                i.call(this, t)
            };
            return X.prototype = {
                    type: "Wave",
                    pointsNum: "Wave",
                    drawPath: function(t) {
                        if (this.layout && !(this.layout.length < 2)) {
                            var e = this.layout;
                            t.moveTo(e[0][0], e[0][1]);
                            for (var i = 0, a = e.length; a > i; i++)
                                t.lineTo(e[i][0], e[i][1])
                        }
                    }
                },
                t(X, i), {
                    Base: i,
                    DownTringle: a,
                    FreeArrow: n,
                    UpArrow: r,
                    DownArrow: o,
                    RedUpArrow: u,
                    GreenUpArrow: c,
                    GreenDownArrow: f,
                    RedDownArrow: p,
                    Text: v,
                    Segment: _,
                    Line: y,
                    Level: g,
                    Rect: T,
                    QuadraticCurve: P,
                    BezierCurve: M,
                    Triangle: S,
                    Parallelogram: L,
                    ParallelLine: C,
                    ParallelSegment: b,
                    Pen: k,
                    CycleLine: A,
                    Fibonacci: D,
                    GoldenSection: N,
                    PercentLine: I,
                    LinearRegressionBand: B,
                    Ruler: R,
                    Wave: X
                }
        }(),
        S = function() {
            _.call(this)
        },
        P = {
            localStorage: !1,
            parentDiv: void 0,
            width: void 0,
            height: void 0,
            top: 0,
            left: 0,
            showZIndex: 35,
            interactZIndex: 55,
            zoom: void 0,
            domain: void 0,
            style: {
                layoutPointRadius: 5,
                layoutPointColor: "rgba(0, 0, 0, 0.5)",
                showLayoutPoint: !1,
                lineWidth: 1,
                font: "12px arial"
            },
            paintTool: "Close",
            shapeListName: "default",
            shapeListType: "paintTool",
            paintOnEachCenter: !1,
            rangeData: void 0,
            data: void 0,
            saveKeyPreName: void 0,
            checkIfNotSave: void 0
        };
    return S.prototype = {
            Shapes: T,
            init: function(t) {
                if (!this.parentDiv) {
                    var i = e(P, t);
                    this.param = i,
                        this._initWH(),
                        this._initZoom(),
                        this._initDomain();
                    var a = i.parentDiv;
                    this.dpr = f,
                        this.showCanvas = this._createCanvas(a, i.showZIndex),
                        this.interactCanvas = this._createCanvas(a, i.interactZIndex),
                        this.interactCanvas.tabIndex = 0,
                        this.interactCanvas.style.outline = "none",
                        this.showCtx = this.showCanvas.getContext("2d"),
                        this.interactCtx = this.interactCanvas.getContext("2d"),
                        this.hdContext(),
                        this._setParentDiv(a),
                        this.interactCanvas.style.display = "Close" === i.paintTool ? "none" : "",
                        this._setScale(),
                        this.shapeList = {},
                        this.shapeList[i.shapeListName] = {},
                        this.shapeList[i.shapeListName][i.shapeListType] = [],
                        this._addPaintEvent(),
                        i.localStorage && this._restoreLocalStorage(),
                        this.refresh()
                }
            },
            hdContext: function() {
                var t = this.dpr;
                1 != t && (this.showCtx.scale(t, t),
                    this.interactCtx.scale(t, t))
            },
            _initWH: function() {
                var t = this.param,
                    e = t.parentDiv;
                !t.width && (t.width = e.offsetWidth),
                    !t.height && (t.height = e.offsetHeight)
            },
            _initZoom: function() {
                var t = this.param;
                t.zoom || (t.zoom = [0, t.width])
            },
            _initDomain: function() {
                var t = this.param;
                t.domain || (t.domain = [0, t.height])
            },
            _addPaintEvent: function() {
                function t(t) {
                    t.layout.pop(),
                        t.points.pop()
                }

                function e(t, e, i) {
                    t.layout.push(e),
                        t.points.push(i)
                }

                function r(r) {
                    if (0 == r.which || 1 == r.which) {
                        var o = L._curPaintTool,
                            s = L._painting,
                            u = L._draggedShape;
                        if (g = a(r, C),
                            y = L._getIndexAndValue(g),
                            b.paintOnEachCenter && (g = L._getXAndY(y)),
                            h = g[0],
                            l = g[1],
                            A = L.getCurrentShapeList(),
                            p = L._getPointIndexByXY(g),
                            d = L._getShapeIndexByXY(g),
                            void 0 === p || s)
                            if ("Number" != i(d) || s) {
                                if (T.hasOwnProperty(b.paintTool)) {
                                    if (s = !0,
                                        !o) {
                                        if (o = new T[b.paintTool]({
                                                paintTool: L,
                                                style: n(b.style, !0)
                                            }),
                                            o.init && o.init() === !1)
                                            return s = !1,
                                                void(o = null);
                                        o.setShowLayoutPoint(!0)
                                    }
                                    if ("Number" === i(o.pointsNum))
                                        o.layout.length > 2 && t(o),
                                        e(o, g, y),
                                        L.clear(C),
                                        o.draw(k);
                                    else {
                                        switch (o.pointsNum) {
                                            case "Pen":
                                                o.setShowLayoutPoint(!1);
                                                break;
                                            case "Wave":
                                                if (1 != r.which)
                                                    return s = !1,
                                                        void(o = null);
                                                t(o)
                                        }
                                        e(o, g, y)
                                    }
                                }
                                switch (b.paintTool) {
                                    case "Select":
                                        D = !0
                                }
                            } else
                                u = A[d],
                                "Pen" != u.type && u.setShowLayoutPoint(!0),
                                f = n(u.layout, !0),
                                u.display = !1,
                                u.draw(k),
                                L.clear(),
                                L.paint();
                        else
                            u = p.shape,
                            v = p.index,
                            f = n(u.layout, !0),
                            u.display = !1,
                            u.draw(k),
                            L.clear(),
                            L.paint();
                        L._selectedShape = null,
                            L._painting = s,
                            L._curPaintTool = o,
                            L._draggedShape = u,
                            r.preventDefault(),
                            r.stopPropagation()
                    }
                }

                function o(n) {
                    var r = L._curPaintTool,
                        o = L._painting,
                        s = L._draggedShape;
                    if (g = a(n, C),
                        y = L._getIndexAndValue(g),
                        b.paintOnEachCenter && (g = L._getXAndY(y)),
                        o || (s ? p ? C.style.cursor = "pointer" : "Number" == i(d) && (C.style.cursor = "move") : C.style.cursor = void 0 !== L._getPointIndexByXY(g) ? "pointer" : void 0 !== L._getShapeIndexByXY(g) ? "move" : "Write" == b.paintTool ? "text" : ""),
                        s) {
                        if (s.updateBoundingRect(),
                            u = g[0] - h,
                            c = g[1] - l,
                            p)
                            s.layout[v][0] = f[v][0] + u,
                            s.layout[v][1] = f[v][1] + c;
                        else if ("Number" == i(d))
                            for (var m = s.layout.length; m--;)
                                s.layout[m][0] = f[m][0] + u,
                                s.layout[m][1] = f[m][1] + c;
                        s.points = L._layout2Points(s.layout),
                            L.clear(C),
                            s.draw(k)
                    } else {
                        if (o)
                            if (L.clear(C),
                                "Number" === i(r.pointsNum))
                                1 === r.pointsNum ? (r.layout[0] = g,
                                    r.points[0] = y) : r.pointsNum > 1 && (r.layout.length > 1 && t(r),
                                    e(r, g, y)),
                                r.draw(k);
                            else {
                                switch (r.pointsNum) {
                                    case "Wave":
                                        S || (S = new T.Text({
                                                style: {
                                                    text: "右键\n结束",
                                                    fillStyle: "#000"
                                                }
                                            })),
                                            S.layout = [
                                                [g[0] + 10, g[1]]
                                            ],
                                            S.draw(k),
                                            r.layout.length > 1 && t(r)
                                }
                                e(r, g, y),
                                    r.draw(k)
                            }
                        switch (b.paintTool) {
                            case "Delete":
                                C.style.cursor = void 0 !== L._getShapeIndexByXY(g) ? "pointer" : "";
                                break;
                            case "Select":
                                D && (P || (P = new T.Rect({
                                        style: {
                                            strokeStyle: "#000",
                                            fillStyle: "rgba(0, 0, 0, 0.1)"
                                        }
                                    })),
                                    L.clear(C),
                                    P.layout = [
                                        [h, l], g
                                    ],
                                    P.draw(k));
                                break;
                            case "Hover":
                                var x = L._getShapeIndexByXY(g);
                                void 0 !== x ? L.dispatch("hover", {
                                    x: g[0],
                                    y: g[1],
                                    index: x,
                                    target: A[x],
                                    shapeListType: L.param.shapeListType
                                }) : L.dispatch("unhover", {
                                    x: g[0],
                                    y: g[1]
                                })
                        }
                    }
                    L._painting = o,
                        L._curPaintTool = r,
                        L._draggedShape = s,
                        n.preventDefault(),
                        n.stopPropagation()
                }

                function s(r) {
                    function o() {
                        for (var t, e = m.value.split(/\s/), i = b.style.font, a = w.measureText("国", i).width, n = 0, r = e.length; r--;) {
                            var o = w.measureText(e[r], i).width;
                            o > n && (t = e[r],
                                n = o)
                        }
                        m.style.width = n + S + "px",
                            m.style.height = a * e.length + "px"
                    }
                    if (0 == r.which || 1 == r.which || 3 == r.which) {
                        var s, u = L._curPaintTool,
                            c = L._painting,
                            f = L._draggedShape;
                        if (g = a(r, C),
                            y = L._getIndexAndValue(g),
                            f)
                            f.display = !0,
                            L.clear(C),
                            L.paint(),
                            p = null,
                            v = void 0,
                            s = f,
                            f = null;
                        else {
                            if (c)
                                if (L.clear(C),
                                    "Number" === i(u.pointsNum)) {
                                    if (y = L._getIndexAndValue(g),
                                        e(u, g, y),
                                        u.draw(k),
                                        2 == u.pointsNum && u.layout.length == u.pointsNum)
                                        L.clear(C),
                                        c = !1,
                                        u = null;
                                    else if (u.layout.length > u.pointsNum) {
                                        for (c = !1; u.layout.length > u.pointsNum;)
                                            t(u);
                                        L.clear(C),
                                            u.draw(M),
                                            A.push(u),
                                            s = u,
                                            u = null
                                    }
                                } else
                                    switch (u.pointsNum) {
                                        case "Pen":
                                            u.draw(M),
                                                c = !1,
                                                A.push(u),
                                                s = u,
                                                u = null;
                                            break;
                                        case "Wave":
                                            1 == r.which ? (e(u, g, y),
                                                u.draw(k)) : (u.draw(M),
                                                c = !1,
                                                A.push(u),
                                                s = u,
                                                u = null)
                                    }
                            switch (b.paintTool) {
                                case "Select":
                                    D && (L.clear(C),
                                        L.select([
                                            [h, l], g
                                        ]),
                                        D = !1);
                                    break;
                                case "Write":
                                    if (m || (m = document.createElement("textArea"),
                                            x = m.style,
                                            x.position = "absolute",
                                            x.left = r.pageX + "px",
                                            x.top = r.pageY + "px",
                                            x.border = 0,
                                            x.outline = "none",
                                            x.padding = "1px 0",
                                            x.zIndex = 9999,
                                            x.overflow = "hidden",
                                            x.resize = "none",
                                            x.wrap = "off",
                                            m.addEventListener("blur", function() {
                                                L._writingText && (m.value.length && (_.init(m.value),
                                                        _.draw(M),
                                                        A.push(_)),
                                                    L._writingText = null,
                                                    m.value = "",
                                                    x.display = "none")
                                            }),
                                            m.addEventListener("input", o),
                                            document.body.appendChild(m)),
                                        L._writingText)
                                        m.blur();
                                    else {
                                        x.left = r.pageX + "px",
                                            x.top = r.pageY + "px",
                                            x.display = "",
                                            m.focus(),
                                            _ = new T.Text({
                                                paintTool: L,
                                                style: n(b.style, !0)
                                            });
                                        var d = _.style.font,
                                            S = w.measureText("国", d).width;
                                        x.font = d,
                                            x.color = b.style.strokeStyle,
                                            x.lineHeight = S + "px",
                                            x.height = S + "px",
                                            x.width = S + "px",
                                            _.layout[0] = g,
                                            _.points[0] = y,
                                            L._writingText = _
                                    }
                            }
                        }
                        L._selectedShape = s,
                            L._painting = c,
                            L._curPaintTool = u,
                            L._draggedShape = f,
                            r.preventDefault(),
                            r.stopPropagation()
                    }
                }
                var h, l, u, c, f, d, p, v, y, g, m, x, _, S, P, L = this,
                    b = this.param,
                    C = this.interactCanvas,
                    k = this.interactCtx,
                    M = this.showCtx,
                    D = !1,
                    A = L.getCurrentShapeList();
                this._curPaintTool = null,
                    this._painting = !1,
                    this._selectedShape = null,
                    this._draggedShape = null,
                    C.addEventListener("mousedown", r),
                    C.addEventListener("mousemove", o),
                    C.addEventListener("mouseup", s),
                    C.oncontextmenu = function() {
                        return !1
                    },
                    L.param.onHover && L.bind("hover", L.param.onHover),
                    L.param.unHover && L.bind("unhover", L.param.unHover),
                    L.param.onClick && L.bind("click", L.param.onClick),
                    C.addEventListener("mouseout", function() {
                        L.dispatch("unhover")
                    }),
                    "ontouchstart" in window && (C.addEventListener("touchstart", r),
                        C.addEventListener("touchmove", o),
                        C.addEventListener("touchend", s)),
                    C.addEventListener("click", function(t) {
                        switch (L._writingText || this.focus(),
                            g = a(t, C),
                            y = L._getIndexAndValue(g),
                            b.paintTool) {
                            case "Delete":
                                L.remove(g);
                                break;
                            case "Hover":
                                var e = L._getShapeIndexByXY(g);
                                void 0 !== e && L.dispatch("click", {
                                    x: g[0],
                                    y: g[1],
                                    index: e,
                                    target: A[e],
                                    shapeListType: L.param.shapeListType
                                })
                        }
                        t.preventDefault(),
                            t.stopPropagation()
                    }),
                    C.addEventListener("keydown", function(t) {
                        switch (t.which) {
                            case 8:
                            case 46:
                                if (L._selectedShape) {
                                    var e = L.getCurrentShapeList(),
                                        i = e.indexOf(L._selectedShape);
                                    i > -1 && (e.splice(i, 1),
                                        L.paint(),
                                        L._selectedShape = null)
                                } else
                                    "Close" != L.param.paintTool && L.revoke()
                        }
                    }),
                    b.localStorage && (L.param.onSave && L.bind("save", L.param.onSave),
                        window.addEventListener("unload", function() {
                            L._showLayoutPoint(!1),
                                L.save2LocalStorage()
                        }),
                        window.addEventListener("beforeunload", function() {
                            L._showLayoutPoint(!1),
                                L.save2LocalStorage()
                        }))
            },
            getCurrentShapeList: function() {
                return this.shapeList[this.param.shapeListName][this.param.shapeListType]
            },
            _getPointIndexByXY: function(t) {
                for (var e, i, a = this.getCurrentShapeList(), n = a.length; n--;) {
                    i = a[n].layout,
                        e = a[n].style.layoutPointRadius;
                    for (var r = i.length; r-- && !a[n].ignore && a[n].style.showLayoutPoint;) {
                        var o = i[r];
                        if (Math.abs(t[0] - o[0]) < e && Math.abs(t[1] - o[1]) < e)
                            return {
                                index: r,
                                shape: a[n]
                            }
                    }
                }
            },
            _getShapeIndexByXY: function(t) {
                for (var e = this.getCurrentShapeList(), i = !1, a = e.length; a--;)
                    if (!e[a].ignore && e[a].contain && (i = e[a].contain(t[0], t[1])),
                        i)
                        return a
            },
            _layout2Points: function(t) {
                for (var e = [], i = t.length; i--;)
                    e[i] = this._getIndexAndValue(t[i]);
                return e
            },
            _points2Layout: function(t) {
                for (var e = [], i = t.length; i--;)
                    e[i] = this._getXAndY(t[i]);
                return e
            },
            intersectRect: function(t) {
                var e = this.param;
                return !(0 > t.x + t.width || e.width < t.x || 0 > t.y + t.height || e.height < t.y)
            },
            paint: function() {
                var t = this.param.shapeListName,
                    e = this.shapeList,
                    i = this.showCtx;
                if (e[t]) {
                    this.clear();
                    for (var a in e[t])
                        if (e[t].hasOwnProperty(a))
                            for (var n = e[t][a], r = 0, o = n.length; o > r; r++)
                                !n[r].ignore && n[r].display && this.intersectRect(n[r].getBoundingRect()) && n[r].draw(i)
                }
            },
            refresh: function() {
                var t = this.param.shapeListName,
                    e = this.shapeList;
                for (var i in e[t])
                    if (e[t].hasOwnProperty(i))
                        for (var a = e[t][i], n = 0, r = a.length; r > n; n++)
                            !a[n].ignore && a[n].display && (a[n].layout = this._points2Layout(a[n].points),
                                a[n].updateBoundingRect());
                this.paint()
            },
            update: function(t) {
                var e = this.param;
                this.checkIfNeedUpdate(t) && (t.zoom && (e.zoom = t.zoom),
                    t.domain && (e.domain = t.domain),
                    t.parentDiv && t.parentDiv != this.parentDiv && this._setParentDiv(t.parentDiv),
                    t.shapeListName && t.shapeListName != e.shapeListName && this._setShapeList(t.shapeListName),
                    e.rangeData = t.rangeData ? t.rangeData : void 0,
                    e.data = t.data ? t.data : void 0,
                    this._setWHLT(t),
                    this._setScale(),
                    this.refresh())
            },
            checkIfNeedUpdate: function(t) {
                var e = this.param,
                    a = !1;
                for (var n in t)
                    if (t.hasOwnProperty(n))
                        switch (i(t[n])) {
                            case "Number":
                            case "String":
                            case "Object":
                                t[n] != e[n] && (a = !0);
                                break;
                            case "Array":
                                if (e[n])
                                    for (var r = t[n].length; r--;)
                                        t[n][r] != e[n][r] && (a = !0)
                        }
                return a
            },
            _setShapeList: function(t) {
                var e = this.shapeList,
                    i = this.param;
                i.localStorage && (this._showLayoutPoint(!1),
                        this.save2LocalStorage()),
                    !e[t] && (e[t] = {}),
                    !e[t][i.shapeListType] && (e[t][i.shapeListType] = []),
                    i.shapeListName = t,
                    i.localStorage && this._restoreLocalStorage()
            },
            empty: function(t, e) {
                var i = e || "paintTool",
                    a = t || this.param.shapeListName,
                    n = this.param.emptyConfirmText;
                (!n || confirm(n)) && (this.shapeList[a] && this.shapeList[a][i] && (this.shapeList[a][i].length = 0),
                    this.clear(),
                    "paintTool" == i && this.clearPaintState())
            },
            clear: function(t) {
                var e = t || this.showCanvas;
                e.getContext("2d").clearRect(0, 0, e.width, e.height)
            },
            revoke: function(t) {
                var e = t || "paintTool";
                this.shapeList[this.param.shapeListName][e].pop(),
                    this.paint()
            },
            remove: function(t) {
                var e = this._getShapeIndexByXY(t);
                "Number" == i(e) && (this.getCurrentShapeList().splice(e, 1),
                    this.paint())
            },
            select: function(t) {
                var e = this._layout2Points(t);
                return console.log([e[0][0], e[1][0]]),
                    [e[0][0], e[1][0]]
            },
            resize: function(t) {
                this.param && (this._setWHLT(t),
                    this._setScale(),
                    this.refresh())
            },
            setStyle: function(t) {
                var e = this.param.style;
                for (var i in t)
                    t.hasOwnProperty(i) && (e[i] = t[i])
            },
            _setScale: function() {
                var t = this.param,
                    e = t.zoom;
                t.xScale = t.width / (e[1] - e[0]),
                    t.yScale = t.height / (t.domain[1] - t.domain[0])
            },
            _x2Index: function(t) {
                var e = this.param;
                return Math.floor(t / e.xScale) + e.zoom[0]
            },
            _y2Value: function(t) {
                var e = this.param;
                return e.domain[1] - t / e.yScale
            },
            _getIndexAndValue: function(t) {
                return [this._x2Index(t[0]), this._y2Value(t[1])]
            },
            _index2X: function(t) {
                var e = this.param;
                return Math.round((t - e.zoom[0] + .5) * e.xScale - .5) + .5
            },
            _value2Y: function(t) {
                var e = this.param;
                return Math.round((e.domain[1] - t) * e.yScale - .5) + .5
            },
            _getXAndY: function(t) {
                return [this._index2X(t[0]), this._value2Y(t[1])]
            },
            _createCanvas: function(t, e) {
                var i = this.param,
                    a = this.dpr,
                    n = document.createElement("canvas");
                return n.style.position = "absolute",
                    n.width = i.width * a,
                    n.height = i.height * a,
                    n.style.top = i.top + "px",
                    n.style.left = i.left + "px",
                    n.style.width = i.width + "px",
                    n.style.height = i.height + "px",
                    n.style.zIndex = e,
                    n
            },
            _setParentDiv: function(t) {
                this.parentDiv != t && (this.parentDiv = t,
                    this.parentDiv.firstChild ? (this.parentDiv.insertBefore(this.interactCanvas, this.parentDiv.firstChild),
                        this.parentDiv.insertBefore(this.showCanvas, this.parentDiv.firstChild)) : (this.parentDiv.appendChild(this.interactCanvas),
                        this.parentDiv.appendChild(this.showCanvas)))
            },
            _setWHLT: function(t) {
                var e = this.showCanvas,
                    i = this.interactCanvas,
                    a = this.param,
                    n = this.dpr,
                    r = t.left,
                    o = t.top,
                    s = t.width,
                    h = t.height;
                r && (a.left = r),
                    o && (a.top = o),
                    s && (a.width = s),
                    h && (a.height = h),
                    e.style.left = a.left + "px",
                    e.style.top = a.top + "px",
                    e.style.width = a.width + "px",
                    e.style.height = a.height + "px",
                    e.width = a.width * n,
                    e.height = a.height * n,
                    i.style.left = a.left + "px",
                    i.style.top = a.top + "px",
                    i.style.width = a.width + "px",
                    i.style.height = a.height + "px",
                    i.width = a.width * n,
                    i.height = a.height * n,
                    this.hdContext()
            },
            _showLayoutPoint: function(t) {
                var e = this.getCurrentShapeList();
                if (e) {
                    for (var i = e.length; i--;)
                        e[i].setShowLayoutPoint(t);
                    this.clear(),
                        this.paint()
                }
            },
            save2LocalStorage: function(t) {
                var e, a = window.localStorage,
                    n = this.param;
                if (t = t || n.shapeListName,
                    e = (n.saveKeyPreName ? n.saveKeyPreName : "") + t,
                    "Function" !== i(n.checkIfNotSave) || !n.checkIfNotSave(e)) {
                    var r = this.shapeList[t],
                        o = {},
                        s = !1;
                    if (r) {
                        for (var h in r)
                            if (r.hasOwnProperty(h)) {
                                o[h] = [];
                                for (var l = 0, u = r[h].length; u > l; l++)
                                    s = !0,
                                    o[h][l] = {},
                                    o[h][l].type = r[h][l].type,
                                    o[h][l].points = r[h][l].points,
                                    o[h][l].style = r[h][l].style
                            }
                        if (s) {
                            if (a) {
                                var c = JSON.stringify(o);
                                a.getItem(e) != c && (a.setItem(e, c),
                                    this.dispatch("save", e, c))
                            }
                        } else
                            a.removeItem(e)
                    }
                }
            },
            _restoreLocalStorage: function() {
                var t = window.localStorage,
                    e = this.param,
                    i = e.shapeListName,
                    a = (e.saveKeyPreName ? e.saveKeyPreName : "") + i,
                    n = t && t.getItem(a);
                n && (this.shapeList[i] = this._restoreShapeList(JSON.parse(n.toString())))
            },
            _restoreShapeList: function(t) {
                var e = {};
                for (var i in t)
                    if (t.hasOwnProperty(i)) {
                        var a = t[i];
                        e[i] = [];
                        for (var n = a.length; n--;)
                            e[i][n] = new T[a[n].type]({
                                paintTool: this,
                                style: a[n].style
                            }),
                            e[i][n].points = a[n].points
                    }
                return e
            },
            addShapeList: function(t, i, a, n, r) {
                var o, s, h, l = this.shapeList,
                    u = t || this.param.shapeListName;
                !l[u] && (l[u] = {}),
                    o = l[u],
                    !o[i] && (o[i] = []),
                    s = o[i];
                for (var c = 0, f = n.length; f > c; c++)
                    h = new T[a]({
                        paintTool: this,
                        style: e(P.style, r)
                    }),
                    (!h.init || h.init()) && (h.points = n[c],
                        h.layout = this._points2Layout(n[c]),
                        s.push(h));
                this.paint()
            },
            clearPaintState: function() {
                this._curPaintTool = null,
                    this._painting = !1,
                    this._selectedShape = null,
                    this._draggedShape && (this._draggedShape.display = !0,
                        this._draggedShape = null,
                        this.clear(),
                        this.paint()),
                    this.clear(this.interactCanvas)
            },
            setPaintTool: function(t) {
                switch (this.param.paintTool = t,
                    t) {
                    case "Empty":
                        this.empty();
                        break;
                    case "Revoke":
                        this.revoke();
                        break;
                    default:
                        this.interactCanvas.style.cursor = ""
                }
                this._showLayoutPoint(!1),
                    "Close" == t ? this.interactCanvas.style.display = "none" : (this.interactCanvas.style.display = "",
                        this.interactCanvas.focus()),
                    this.clearPaintState()
            },
            addCustomShape: function(e) {
                var i = e.type;
                T[i] = function(t) {
                        T.Base.call(this, t)
                    },
                    T[i].type = e.type,
                    T[i].prototype = e,
                    t(T[i], T.Base)
            },
            getImageData: function() {
                var t = this.showCanvas,
                    e = this.showCanvas.getContext("2d");
                return e.getImageData(0, 0, t.width, t.height)
            }
        },
        t(S, _),
        u
});;
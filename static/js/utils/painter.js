xh5_define("utils.painter", ["utils.util", "cfgs.settinger"], function(t, e) {
  "use strict";
  function i() {
    function e(t) {
      function e(t) {
        s = t.hd || s;
        var e = t.width || i.width || 0,
          a = t.height || i.height || 0,
          o = s;
        switch (((i.style.width = e + "px"), (i.style.height = a + "px"), o)) {
          case 0:
            break;
          case 1:
            (o = xh5_BrowserUtil.hdpr), (e *= o), (a *= o);
            break;
          default:
            (e *= o), (a *= o);
        }
        (i.height = i.width = 0),
          (i.height = a),
          (i.width = e),
          o && 1 != o && n.scale(o, o);
      }
      this.VER = "2.0.1";
      var i = a("canvas");
      "undefined" != typeof FlashCanvas && FlashCanvas.initElement(i);
      var n = i.getContext("2d"),
        s = 1;
      t && e(t), (this.canvas = i), (this.g = n), (this.resize = e);
    }
    function i(i) {
      var a,
        r,
        s,
        o,
        l,
        h,
        m,
        c,
        f,
        p = i.parentObj,
        b = i.ctn,
        g = p.sd,
        N = p.setting,
        _ = 0,
        v = N.DIMENSION.H_TIME_PART,
        S = p.nu,
        y = p.fixScale,
        T = 99999,
        w = function() {
          (a = new e()),
            (r = a.canvas),
            (s = a.g),
            (r.style.position = "absolute"),
            (r.style.zIndex = 0),
            xh5_EvtUtil.addHandler(r, "touchstart", function(t) {
              N.custom.touch_prevent && xh5_EvtUtil.preventDefault(t);
            }),
            b.appendChild(r);
        },
        k = function(t) {
          (t = t || {}),
            (o = N.DIMENSION.getStageW()),
            (_ = isNaN(t.mh) ? _ : t.mh),
            (l = N.DIMENSION.posX),
            (h = N.DIMENSION.RIGHT_W),
            (m = N.DIMENSION.K_RIGHT_W),
            (c = isNaN(t.h) ? c : t.h),
            (v = isNaN(t.eh) ? v : t.eh),
            a.resize({
              width: o,
              height: c + v + _,
              hd: N.PARAM.getHd()
            }),
            (s.font = N.STYLE.FONT_SIZE + "px " + N.STYLE.FONT_FAMILY);
        },
        D = function(t, e, i, a) {
          (t = ~~(t + 0.5)),
            (t -= 0.5),
            (e = ~~(e + 0.5)),
            (e -= 0.5),
            (i = ~~(i + 0.5)),
            (i -= 0.5),
            s.beginPath(),
            a
              ? (s.moveTo(t, i), s.lineTo(e, i))
              : (s.moveTo(i, t), s.lineTo(i, e)),
            s.stroke();
        },
        P = function(t, e) {
          var i;
          return (
            y
              ? (i = isNaN(e)
                  ? 0 > t
                    ? Math.floor(t)
                    : Math.ceil(t)
                  : t.toFixed(e))
              : ((t = (1e4 * t).toFixed(0)),
                (i = t / 1e4),
                i > T && (i = Math.floor(i))),
            i
          );
        },
        O = new (function() {
          var e,
            i,
            a,
            r,
            n,
            d = 4,
            m = g.futureTime || window["kke_future_" + g.symbol],
            f = function() {
              if (
                !(
                  g.business ||
                  (!isNaN(N.custom.mini_threshold.height) &&
                    c < N.custom.mini_threshold.height)
                )
              ) {
                var e = N.DIMENSION.extend_draw,
                  i = l;
                e
                  ? ((s.textAlign = "left"), (s.textBaseline = "top"))
                  : (s.textAlign = "right"),
                  (s.fillStyle = N.COLOR.T_N),
                  (s.strokeStyle = N.COLOR.GRID),
                  N.DIMENSION.getStageH() < 0 &&
                    "TFLOW" == g.name &&
                    (g.labelPriceCount = 4),
                  !g.isSC && N.DIMENSION.h_t < 150 && (g.labelPriceCount = 2);
                for (
                  var a,
                    r,
                    n,
                    u,
                    d,
                    m = g.labelMaxP,
                    f = S ? t.strUtil.nu(m) : null,
                    p = g.labelMinP,
                    b = g.labelPriceCount,
                    v = N.DIMENSION.posX,
                    y = m - p,
                    w = c / b,
                    k = 0;
                  b >= k;
                  k++
                ) {
                  (d = k * w + _),
                    (s.fillStyle = N.COLOR.T_N),
                    (n = m - (k * y) / b),
                    n > 0
                      ? (s.fillStyle = N.COLOR.T_RISE)
                      : 0 > n && (s.fillStyle = N.COLOR.T_FALL),
                    e
                      ? k == b && (s.textBaseline = "bottom")
                      : (s.textBaseline =
                          0 == k ? "top" : k == b ? "bottom" : "middle");
                  var O;
                  if (g.isCompare) {
                    if (g.dAdd <= 1)
                      (n *= 100),
                        (u = n.toFixed(2)),
                        (u += "%"),
                        s.fillText(u, v, d),
                        s.fillText(
                          u,
                          v + N.DIMENSION.w_t + s.measureText(u).width,
                          d
                        );
                    else {
                      O = g.datas[0][0].prevclose;
                      var x,
                        C = n;
                      (C *= 100),
                        (x = C.toFixed(2)),
                        (x += "%"),
                        e
                          ? s.fillText(
                              x,
                              N.DIMENSION.w_t - s.measureText(x).width,
                              d
                            )
                          : s.fillText(
                              x,
                              v + N.DIMENSION.w_t + s.measureText(x).width,
                              d
                            ),
                        (n = n * O + O),
                        (u = n.toFixed(2)),
                        s.fillText(u, v, d);
                    }
                    D(i, o - h, d, !0);
                  } else {
                    if (g.isSC)
                      if (((s.fillStyle = N.COLOR.K_P), S)) {
                        var M = g.name && "TFLOW" == g.name ? 2 : 0;
                        (n /= f[0]),
                          0 == k || k == b
                            ? ((u = k >= b ? f[1] : P(n, M)),
                              ("NaN" == u || "" == u) && (u = 0))
                            : (u = "");
                      } else
                        (u = 0 == k || k == b ? n.toFixed(1 > p ? 4 : 2) : 0),
                          0 == u && 0 != k && k != b && (u = "");
                    else {
                      if (N.DIMENSION.h_t < 0) return;
                      O = g.datas[0][0].prevclose;
                      var K = "HK" == g.market ? 3 : 4,
                        I = 1 > p ? K : g.nfloat || 2;
                      (I = 0 > p ? 2 : g.nfloat || 2),
                        "HF" == t.market(g.symbol)
                          ? 3 > p
                            ? (I = 4)
                            : 99 > p && (I = 3)
                          : "HK" == g.market || "US" == g.market
                          ? (I = t.strUtil.nfloat(p))
                          : "LSE" === g.market && (I = 3),
                        g.ennfloat && (I = g.nfloat),
                        (u = Math.abs(n) > T ? Math.floor(n) : n.toFixed(I)),
                        (a = (100 * (n - O)) / O),
                        (s.fillStyle =
                          a > 0
                            ? N.COLOR.T_RISE
                            : 0 > a
                            ? N.COLOR.T_FALL
                            : N.COLOR.T_N),
                        (r = isNaN(a) ? "--%" : a.toFixed(2) + "%"),
                        isFinite(a) || (r = "--%"),
                        e
                          ? g.simple
                            ? (0 === k || k === b) &&
                              s.fillText(
                                r,
                                v + N.DIMENSION.w_t - s.measureText(r).width,
                                d
                              )
                            : s.fillText(
                                r,
                                v + N.DIMENSION.w_t - s.measureText(r).width,
                                d
                              )
                          : s.fillText(
                              r,
                              v + N.DIMENSION.w_t + s.measureText(r).width,
                              d
                            );
                    }
                    g.simple
                      ? (0 === k || k === b) && s.fillText(u, v, d)
                      : (s.fillText(u, v, d), D(i, o - h, d, !0));
                  }
                }
              }
            },
            b = function(e) {
              g && t.market(g.symbol), N.DIMENSION.w_t;
              g.simple || D(_, c + _, e, !1);
            },
            v = function(t, i, a, r, n) {
              if (!g.simple && ((e = t), p.dt)) {
                var o = s.measureText(i).width,
                  l = 0;
                if (
                  ((l = 0 == a ? 0 : a == r - 1 ? -o : -o / 2),
                  0 == r && (l = n / 2 - o / 2),
                  g.business)
                ) {
                  s.font = "14px " + N.STYLE.FONT_FAMILY;
                  var u = 10;
                  (0 == a || a == r - 1) &&
                    s.fillText(i, t + l, _ + c + N.STYLE.FONT_SIZE + 2 + u);
                } else s.fillText(i, t + l, _ + c + N.STYLE.FONT_SIZE + 2);
              }
            },
            y = function(t) {
              var e = t.replace("nf_", "").replace(/[\d]+$/, "");
              return "TF" == e || "T" == e ? "CFF" : "NF";
            },
            w = 30,
            O = "ignore",
            x = "ignoreT",
            C = function() {
              var e,
                s = g && t.market(g.symbol);
              switch (s) {
                case "US":
                  d = 7;
                  break;
                case "HK":
                  d = 5;
                  break;
                case "NF":
                case "HF":
                  d = 0;
                  break;
                default:
                  d = 4;
              }
              if (!i) {
                switch (s) {
                  case "HF":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [["06:00", "23:59"], ["00:00", "05:00"]]
                    );
                    break;
                  case "NF":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [["09:00", "23:29"], ["13:00", "02:59"]]
                    );
                    break;
                  case "global_index":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [["06:00", "23:59"], ["00:00", "05:00"]]
                    );
                    break;
                  default:
                    i = t.tUtil.gata(s);
                }
                for (
                  ("CFF" == y(g.symbol) || "hf_CHA50CFD" === g.symbol) &&
                    (w = 15),
                    a = [],
                    e = 0;
                  e < i.length;
                  e += w
                )
                  a.push(i[e]);
                a[a.length - 1] !== i[i.length - 1] &&
                  (a[a.length - 1] = i[i.length - 1]);
              }
              (r = []), (n = []);
              var o = N.DIMENSION.w_t,
                l = 370,
                u = 70,
                h = 35,
                c = o / a.length,
                f = 0,
                b = 0;
              if (p.dt && "HK" == s) {
                var _ = g.hq.time;
                p.dt &&
                  _ > "15:59" &&
                  (_ > "16:09" && (_ = "16:09"), (a[a.length - 1] = _)),
                  (l = 415);
              }
              for (e = 0; e < a.length; e++)
                0 == e || e == a.length - 1
                  ? (r.push(a[e]), n.push(x))
                  : e == d
                  ? (r.push(a[e]), n.push(a[e]))
                  : l > o
                  ? r.push(O)
                  : e > 0 && d > e
                  ? c * (e - f) > u && c * (d - e) > u
                    ? (r.push(a[e]), (f = e))
                    : r.push(O)
                  : (d > f && (f = d),
                    c * (e - f) > u && c * (a.length - 1 - e) > u
                      ? (r.push(a[e]), (f = e))
                      : r.push(O)),
                  0 != e &&
                    e != d &&
                    e != a.length - 1 &&
                    (e > 0 && d > e
                      ? c * (e - b) > h && c * (d - e) > h
                        ? (n.push(a[e]), (b = e))
                        : n.push(x)
                      : (d > b && (b = d),
                        c * (e - b) > h && c * (a.length - 1 - e) > h
                          ? (n.push(a[e]), (b = e))
                          : n.push(x)));
              switch (s) {
                case "NF":
                  m &&
                    ("21:00" != m.time[0][0]
                      ? (d = 15 == w ? (N.DIMENSION._w <= 550 ? 9 : 0) : 4)
                      : l > o && (d = Math.floor(n.length / 2))),
                    (r[r.length - 1] = 30 == w ? "15:00" : "15:15");
                  var v = a[d].split(":");
                  59 == v[1] && (a[d] = Number(v[0]) + 1 + ":00"),
                    (r[d] = a[d]);
                  break;
                case "HF":
                  l > o && (d = Math.floor(n.length / 2)), (r[d] = a[d]);
              }
            },
            M = function() {
              var i = N.DIMENSION.w_t;
              if (
                isNaN(N.custom.mini_threshold.width) ||
                !(i < N.custom.mini_threshold.width)
              ) {
                (s.textBaseline = "bottom"),
                  (s.textAlign = "left"),
                  (s.strokeStyle = N.COLOR.TIME_L),
                  (s.fillStyle = N.COLOR.TIME_S),
                  (e = l);
                var o = g.datas,
                  h = o.length,
                  m = g && t.market(g.symbol),
                  c = a.length,
                  f = 1;
                "NF" == m && "CFF" == y(g.symbol) && (f = 1);
                var _ = i / Math.max(c - f, 5),
                  S = l,
                  T = 550;
                if ((N.DIMENSION.getStageH() < 0 && (p.dt = !0), p.dt)) {
                  var w;
                  if (1 == h || h > 6)
                    for (w = 0; c > w; w++)
                      r[w] !== O && v(S, r[w], w, c),
                        "HF" == m || "NF" == m
                          ? r[w] !== O &&
                            n[w] !== x &&
                            (w == d ? b(S, d) : b(S))
                          : g.business ||
                            (n[w] !== x && (w == d ? b(S, d) : b(S))),
                        (S += _);
                  else if (6 > h)
                    for (_ = i / h, w = 0; h > w; w++)
                      N.DIMENSION._w < T
                        ? v(
                            S,
                            dateUtil.ds(o[w][0].date, "/", !1, !0, !1, !1),
                            w,
                            0,
                            _
                          )
                        : v(
                            S,
                            dateUtil.ds(o[w][0].date, "/") +
                              "/" +
                              dateUtil.nw(o[w][0].date.getDay()),
                            w,
                            0,
                            _
                          ),
                        0 != w && b(S),
                        (S += _);
                }
              }
            };
          this.drawFrames = function() {
            k(), C(), M(), f();
          };
        })(),
        x = new (function() {
          this.iOffsetX = 0;
          var e,
            i,
            a,
            r,
            n,
            u = this,
            h = 0,
            b = 22,
            v = 99,
            y = function(t, e, i) {
              if (isNaN(i)) {
                if (h + v >= t || t >= o - v) return;
                D(_ + 1, c + _, t, !1);
              }
              if (((h = t), p.dt)) {
                var a,
                  r = c + _ + N.STYLE.FONT_SIZE + 3;
                switch (i) {
                  case 1:
                    s.fillText(e, t, r);
                    break;
                  case 2:
                    (a = s.measureText(e).width), s.fillText(e, t - a, r);
                    break;
                  case 3:
                    break;
                  default:
                    (a = s.measureText(e).width),
                      s.fillText(e, t - (a >> 1), r);
                }
              }
            },
            T = function() {
              var e = N.DIMENSION.w_k;
              if (
                isNaN(N.custom.mini_threshold.width) ||
                !(e < N.custom.mini_threshold.width)
              ) {
                (s.textBaseline = "bottom"),
                  (s.textAlign = "left"),
                  (s.strokeStyle = N.COLOR.TIME_L),
                  (s.fillStyle = N.COLOR.TIME_S),
                  (h = l);
                var i,
                  a = g.datas,
                  r = a.length;
                switch (f) {
                  case globalCfg.URLHASH.KMS:
                    i = "sec";
                    break;
                  case globalCfg.URLHASH.K1:
                    i = "h";
                    break;
                  case globalCfg.URLHASH.K5:
                  case globalCfg.URLHASH.K15:
                  case globalCfg.URLHASH.K30:
                  case globalCfg.URLHASH.K60:
                  case globalCfg.URLHASH.K240:
                    i = (60 / f) * 24 > r ? "h" : "d";
                    break;
                  case globalCfg.URLHASH.KD:
                  case globalCfg.URLHASH.KDF:
                  case globalCfg.URLHASH.KDB:
                  case globalCfg.URLHASH.KCL:
                  case globalCfg.URLHASH.KCLF:
                  case globalCfg.URLHASH.KCLB:
                    i = r > 300 ? "y" : 28 > r ? "w" : "m";
                    break;
                  default:
                    i = r > 300 ? "y" : "m";
                }
                for (
                  var n,
                    o,
                    m,
                    c,
                    p,
                    _,
                    S = e / Math.max(r, N.PARAM.minCandleNum),
                    T = u.iOffsetX + l + 0.6 * S,
                    w = e / v,
                    k = e / (S * b),
                    D = Math.ceil(k / w),
                    P = 0,
                    O = 0,
                    x = -1,
                    C = -1,
                    M = -1,
                    K = -1,
                    I = -1,
                    E = 0;
                  r > E;
                  E++
                )
                  if (
                    ((_ = a[E]),
                    (p = _.date),
                    (o = p.getMonth()),
                    (n = p.getFullYear()),
                    0 != E)
                  )
                    if (E >= r - 1)
                      y(
                        T + S / 2,
                        n + "/" + (o + 1) + "/" + p.getDate(),
                        r >= N.PARAM.minCandleNum ? 2 : 3
                      );
                    else {
                      switch (i) {
                        case "sec":
                          var R = p.getSeconds();
                          R != K &&
                            ((R = t.strUtil.zp(R)),
                            (c = t.strUtil.zp(p.getMinutes())),
                            (m = t.strUtil.zp(p.getHours())),
                            y(T, m + ":" + c + ":" + R)),
                            (K = Number(R));
                          break;
                        case "min":
                          (c = p.getMinutes()),
                            c != M &&
                              ((c = t.strUtil.zp(c)),
                              (m = t.strUtil.zp(p.getHours())),
                              y(T, m + ":" + c)),
                            (M = Number(c));
                          break;
                        case "h":
                          (m = p.getHours()),
                            m != C &&
                              ((c = t.strUtil.zp(p.getMinutes())),
                              y(T, m + ":" + c)),
                            (C = m);
                          break;
                        case "d":
                          var L = p.getDate();
                          L != P && y(T, n + "/" + (o + 1) + "/" + L), (P = L);
                          break;
                        case "w":
                          var F = p.getDay();
                          I > F && y(T, o + 1 + "/" + p.getDate()), (I = F);
                          break;
                        default:
                        case "m":
                          o == x || o % D || y(T, n + "/" + (o + 1)), (x = o);
                          break;
                        case "y":
                          n != O && y(T, n), (O = n);
                      }
                      T += S;
                    }
                  else y(l, n + "/" + (o + 1) + "/" + p.getDate(), 1);
              }
            },
            w = 37,
            O = function() {
              (s.fillStyle = N.COLOR.K_PCT),
                (s.textBaseline = "top"),
                (s.textAlign = "right");
              for (
                var t,
                  e,
                  i = g.nfloat || 2,
                  a = g.prevclose,
                  r = g.labelPriceCount,
                  n = 0,
                  l = c / r,
                  u = g.labelMaxP,
                  h = g.labelMinP,
                  p = u - h;
                r >= n;
                n++
              )
                if (!(w > l && 1 & n)) {
                  (e = n * l + _),
                    0 == n && e++,
                    (t = u - (n * p) / r),
                    n == r && (s.textBaseline = "bottom");
                  var b;
                  f === globalCfg.URLHASH.KMS || f === globalCfg.URLHASH.K1
                    ? ((b = (((t - a) / a) * 100).toFixed(i) + "%"),
                      (s.fillStyle =
                        t > a
                          ? N.COLOR.K_MS_RISE
                          : a > t
                          ? N.COLOR.K_MS_FALL
                          : N.COLOR.K_MS_N))
                    : (b = Math.round(((t - a) / a) * 100) + "%"),
                    s.fillText(b, o - m, e);
                }
            },
            x = function() {
              var e;
              switch (N.custom.k_0pct) {
                case "hq":
                  e = g.hq.prevclose;
                  break;
                case "range":
                  e = g.prevclose;
                  break;
                default:
                  return;
              }
              var i = t.xh5_PosUtil.pp(e, g.labelMinP, g.labelMaxP, c) + _;
              (i = ~~(i + 0.5)), (i -= 0.5);
              var a = l,
                r = 5;
              for (s.beginPath(); o - m > a; )
                s.moveTo(a, i), (a += r), s.lineTo(a, i), (a += r);
              (s.strokeStyle = N.COLOR.T_PREV), s.stroke();
            },
            C = function() {
              if (
                isNaN(N.custom.mini_threshold.height) ||
                !(c < N.custom.mini_threshold.height)
              ) {
                var e = N.DIMENSION.extend_draw;
                (s.fillStyle = N.COLOR.K_P), (s.strokeStyle = N.COLOR.GRID);
                var i = l;
                e
                  ? ((s.textAlign = "left"), (s.textBaseline = "top"))
                  : (s.textAlign = "right");
                for (
                  var a,
                    r,
                    n,
                    u = g.labelPriceCount,
                    h = 0,
                    p = N.DIMENSION.posX,
                    b = c / u,
                    v = g.labelMaxP,
                    y = g.labelMinP,
                    T = v - y,
                    k = g.prevclose,
                    C = S ? t.strUtil.nu(v) : null;
                  u >= h;
                  h++
                )
                  (w > b && 1 & h) ||
                    ((r = h * b + _),
                    0 == h && r++,
                    (a = v - (h * T) / u),
                    g.isCompare && (a *= 100),
                    S ? ((a /= C[0]), (n = h >= u ? C[1] : P(a))) : (n = P(a)),
                    g.isCompare && (n += "%"),
                    e
                      ? h == u && (s.textBaseline = "bottom")
                      : (s.textBaseline =
                          0 == h ? "top" : h == u ? "bottom" : "middle"),
                    f === globalCfg.URLHASH.KMS &&
                      k &&
                      (s.fillStyle =
                        a > k
                          ? N.COLOR.K_MS_RISE
                          : k > a
                          ? N.COLOR.K_MS_FALL
                          : N.COLOR.K_MS_N),
                    s.fillText(n, p, r),
                    D(i, o - m, r, !0));
                k &&
                  (g.isCompare ||
                    (N.custom.show_k_rangepercent && O(),
                    "no" != N.custom.k_0pct && x()));
              }
            };
          this.drawFrames = function(t) {
            (t ||
              g.datas[0].date != a ||
              g.datas[g.datas.length - 1].date != r ||
              g.labelMaxP != e ||
              g.labelMinP != i ||
              f != n) &&
              (k(), C(), T()),
              (n = g.viewState.viewId),
              (a = g.datas[0].date),
              (r = g.datas[g.datas.length - 1].date),
              (e = g.labelMaxP),
              (i = g.labelMinP);
          };
        })();
      (this.drawBg = function(t, e) {
        g.datas &&
          ((f = g.viewState.viewId),
          N.datas.isT
            ? O.drawFrames(t)
            : (isNaN(e) || ((x.iOffsetX = e), (t = !0)), x.drawFrames(t)));
      }),
        (this.respos = function(t) {
          k(t),
            (r.style.left = 0),
            (r.style.top = N.DIMENSION.posY + "px"),
            this.drawBg(!0);
        }),
        (this.gc = function() {
          t.domGc(r);
        }),
        w();
    }
    function m(e) {
      var i,
        parentObj = e.parentObj,
        ctn = e.ctn,
        iMgr = parentObj.iMgr,
        d = fBind(parentObj.iTo, null, ctn),
        iClk = parentObj.iClk,
        globalDragHandler = iMgr.globalDragHandler,
        zoomView = iMgr.zoomView,
        shortClickHandler = iMgr.shortClickHandler,
        setting = parentObj.setting,
        isFlash = setting.PARAM.isFlash,
        isNotFlash = !isFlash,
        _ = !1,
        v = 300,
        S = {
          isM: !1,
          isTch: !1,
          isP: !1,
          tCount: void 0,
          tXOff: -1,
          isPv: !1,
          lastIy: null,
          mDx: 0 / 0,
          mDy: 0 / 0,
          isClk: 0,
          isTMin: !1,
          mvOx: 0,
          vP: function(event) {
            var offsetX, offsetY;
            if (event.changedTouches) {
              xh5_EvtUtil.preventDefault(event),
                xh5_EvtUtil.stopPropagation(event);
              var a = xh5_EvtUtil.getTarget(event),
                r = event.changedTouches[0],
                s = a.getBoundingClientRect(),
                o = s.left,
                l = s.top;
              (offsetX = r.clientX - o), (offsetY = r.clientY - l);
            } else
              (offsetX = event.offsetX),
                isNaN(offsetX) && (offsetX = event.layerX),
                (offsetY = event.offsetY),
                isNaN(offsetY) && (offsetY = event.layerY);
            d(offsetX, offsetY, event);
          },
          vH: function(t) {
            if (!(this.isClk > 0) && setting.custom.allow_move) {
              xh5_EvtUtil.preventDefault(t), xh5_EvtUtil.stopPropagation(t);
              var e = t.changedTouches ? t.changedTouches[0].pageX : t.layerX;
              isNaN(e) && (e = t.offsetX);
              var i = t.changedTouches ? t.changedTouches[0].pageY : t.layerY;
              isNaN(i) && (i = t.offsetY),
                globalDragHandler(this.mDx, e, this.mDy, i);
            }
          },
          onMousedown: function(t) {
            (this.mDx = isNaN(t.layerX) ? t.offsetX : t.layerX),
              (this.mDy = isNaN(t.layerY) ? t.offsetY : t.layerY),
              (this.isM = this.isP = !0),
              (this.isClk = 2),
              w(!0);
          },
          onMousemove: function(event) {
            this.isTch ||
              ((_ = !0),
              this.isClk--,
              this.isP ? this.vH(event) : this.vP(event));
          },
          onMouseup: function(t) {
            (this.mDx = 0 / 0),
              (this.mDy = 0 / 0),
              (this.isM = this.isP = !1),
              globalDragHandler(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
              this.isClk > 0 && iClk && ((this.isClk = 0), iClk()),
              w(!1);
          },
          onMouseout: function() {
            (this.isClk = 0),
              (this.isM = this.isP = _ = !1),
              d(0 / 0, 0 / 0),
              w(!1);
          },
          tR: function() {
            clearTimeout(this.tCount), (this.isPv = this.isTMin = !1);
          },
          gR: function() {
            this.tR(), (this.tXOff = -1);
          },
          tCheck: function(t) {
            this.mvOx = t.touches[0].pageX;
            var e = this;
            (e.isClk = 2),
              (this.tCount = setTimeout(function() {
                (e.isPv = !0), e.vP(t), (e.isClk = 0);
              }, v));
          },
          onTouchend: function(t) {
            setting.custom.touch_prevent && xh5_EvtUtil.preventDefault(t),
              this.isPv || shortClickHandler(),
              this.tR(),
              (this.isTch = _ = !1),
              (this.mDx = 0 / 0),
              (this.mDy = 0 / 0),
              d(0 / 0, 0 / 0),
              globalDragHandler(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
              this.isClk > 0 && iClk && ((this.isClk = 0), iClk());
          },
          onTouchMove: function(t) {
            if ((this.isClk--, 1 == t.touches.length)) {
              if (
                !this.isPv &&
                !this.isTMin &&
                Math.abs(this.mvOx - t.touches[0].pageX) < 5
              )
                return;
              (this.isTMin = !0),
                clearTimeout(this.tCount),
                this.isPv ? this.vP(t) : this.vH(t);
            } else if (2 == t.touches.length) {
              xh5_EvtUtil.preventDefault(t);
              var e = t.touches[0],
                i = t.touches[1];
              if (this.tXOff >= 0) {
                var a = Math.abs(e.pageX - i.pageX);
                if (a != this.tXOff) {
                  var r = xh5_EvtUtil.getTarget(t),
                    s = xh5_HtmlPosUtil.pageX(r),
                    l = e.pageX - s,
                    u = i.pageX - s;
                  zoomView(a < this.tXOff, [l, u]);
                }
              }
              this.tXOff = Math.abs(e.pageX - i.pageX);
            }
          },
          onTouchStart: function(t) {
            switch (
              (this.tR(),
              setting.custom.touch_prevent && xh5_EvtUtil.preventDefault(t),
              (this.isTch = _ = !0),
              (this.lastIy = t.touches[0].pageY),
              (this.mDx = t.changedTouches[0].pageX),
              (this.mDy = t.changedTouches[0].pageY),
              t.touches.length)
            ) {
              case 1:
                this.tCheck(t);
                break;
              case 2:
                this.gR();
            }
          },
          handleEvent: function(event) {
            if (setting.custom.mouse_and_touch)
              switch (event.type) {
                case "mouseup":
                  this.onMouseup(event);
                  break;
                case "mousedown":
                  this.onMousedown(event);
                  break;
                case "mouseout":
                  this.onMouseout();
                  break;
                case "mousemove":
                  this.onMousemove(event);
                  break;
                case "touchend":
                  this.onTouchend(event);
                  break;
                case "touchmove":
                  this.onTouchMove(event);
                  break;
                case "touchstart":
                  this.onTouchStart(event);
              }
          }
        },
        y = new (function() {
          (this.onmouseup = function(t) {
            setting.custom.mouse_and_touch && S.onMouseup(t);
          }),
            (this.onmousedown = function(t) {
              setting.custom.mouse_and_touch && S.onMousedown(t);
            }),
            (this.onmouseout = function() {
              setting.custom.mouse_and_touch && S.onMouseout();
            }),
            (this.onmousemove = function(t) {
              setting.custom.mouse_and_touch && S.onMousemove(t);
            });
        })(),
        T = function() {
          isNotFlash
            ? (i = a("canvas"))
            : ((i = a("div")),
              (i.style.backgroundColor = "#eee"),
              (i.style.opacity = 0),
              (i.style.filter = "alpha(opacity=0)")),
            (i.style.position = "absolute"),
            (i.style.zIndex = setting.PARAM.I_Z_INDEX);
          var t;
          xh5_deviceUtil.istd
            ? (t = ["touchend", "touchmove", "touchstart"])
            : ((t = ["mousedown", "mouseup", "mousemove", "mouseout"]),
              xh5_deviceUtil.allowt &&
                (t = t.concat(["touchend", "touchmove", "touchstart"])));
          for (var e = t.length; e--; )
            isNotFlash
              ? xh5_EvtUtil.addHandler(i, t[e], S)
              : xh5_EvtUtil.addHandler(
                  i,
                  t[e],
                  y["on" + t[e]] || function() {}
                );
          ctn.appendChild(i);
        },
        w = function(t) {
          t
            ? ((i.style.cursor = "grabbing"),
              (i.style.cursor = "-webkit-grabbing"))
            : (i.style.cursor = "default");
        };
      (this.respos = function(t) {
        (i.style.top = setting.DIMENSION.posY + t.mh + "px"),
          (i.style.left = setting.DIMENSION.posX + "px");
        var e;
        (e = setting.datas.isT ? setting.DIMENSION.w_t : setting.DIMENSION.w_k),
          (i.style.width = e + "px"),
          (i.style.height = t.h + "px");
      }),
        (this.gc = function() {
          t.domGc(i);
        }),
        T();
    }
    function c(e) {
      (this.VER = "2.2.8"),
        (e = oc(
          {
            setting: void 0,
            sd: void 0,
            ctn: void 0,
            reO: void 0,
            withHBg: !1,
            nu: !1,
            dt: !0,
            fixScale: !0,
            iTo: function() {},
            iMgr: void 0,
            iClk: void 0
          },
          e || {}
        ));
      var n,
        s,
        o,
        l,
        u,
        d = e.setting,
        c = function() {
          e.ctn
            ? (n = e.ctn)
            : ((n = a("div")), (n.style.position = "relative"));
        },
        f = function() {
          (s = a("canvas")),
            "undefined" != typeof FlashCanvas && FlashCanvas.initElement(s),
            (s.style.position = "absolute"),
            (s.style.zIndex = d.PARAM.G_Z_INDEX),
            (o = s.getContext("2d")),
            n.appendChild(s);
        },
        p = function() {
          u = new m({
            parentObj: e,
            ctn: n
          });
        },
        b = function() {
          l = new i({
            parentObj: e,
            ctn: n
          });
        },
        g = function(t) {
          t = t || {};
          var e,
            i,
            a = isNaN(t.mh) ? d.DIMENSION.H_T_T : t.mh,
            o = isNaN(t.eh) ? d.DIMENSION.H_TIME_PART : t.eh,
            h = d.PARAM.getHd();
          switch (
            ((e = d.datas.isT ? d.DIMENSION.w_t : d.DIMENSION.w_k),
            (i = isNaN(t.h) ? d.DIMENSION.h_k : t.h),
            (t.h = i),
            (t.mh = a),
            (t.eh = o),
            (n.style.height = i + a + o + "px"),
            (s.style.top = d.DIMENSION.posY + a + "px"),
            (s.style.left = d.DIMENSION.posX + "px"),
            (s.style.width = e + "px"),
            (s.style.height = i + "px"),
            h)
          ) {
            case 0:
              break;
            case 1:
              (h = xh5_BrowserUtil.hdpr), (e *= h), (i *= h);
              break;
            default:
              (e *= h), (i *= h);
          }
          (s.width = e), (s.height = i), u && u.respos(t), l && l.respos(t);
        };
      (this.resize = g),
        (this.getCanvas = function() {
          return s;
        }),
        (this.getG = function() {
          return o;
        }),
        (this.getWrap = function() {
          return n;
        });
      var N;
      (this.scale = function(t) {
        switch (t) {
          case 0:
            return;
          case 1:
            t = xh5_BrowserUtil.hdpr;
        }
        t && o.scale(t, t);
      }),
        (this.newGStyle = function(t) {
          for (var e in t) t.hasOwnProperty(e) && (o[e] = t[e]);
        }),
        (this.newStyle = function(t, e, i) {
          (N = o.strokeStyle = t), e && o.beginPath(), i && (o.lineWidth = i);
        }),
        (this.newFillStyle = function(t, e) {
          if (t && !(t.length < 1)) {
            var i = t.length;
            if (1 == i) o.fillStyle = t[0];
            else if (i > 1) {
              for (
                var a = o.createLinearGradient(0, 0, 0, e), r = 0;
                i > r;
                r++
              )
                a.addColorStop((1 / (i - 1)) * r, t[r]);
              o.fillStyle = a;
            }
          }
        }),
        (this.newFillStyle_rgba = function(e, i, a) {
          for (
            var r = t.isArr(a) ? a : [a],
              n = o.createLinearGradient(0, 0, 0, i),
              s = 0,
              l = e.length;
            l > s;
            s++
          )
            n.addColorStop((1 / (l - 1)) * s, t.hex2dec(e[s], r[s] || 0));
          o.fillStyle = n;
        }),
        (this.clear = function(t, e) {
          (s.width = s.width),
            t &&
              (N && o.strokeStyle != N && (o.strokeStyle = N), o.beginPath()),
            this.scale(e);
        }),
        (this.clearLimit = function(t, e) {
          o.clearRect(t, 0, e, s.height), o.beginPath();
        }),
        (this.beginPath = function() {
          o.beginPath();
        }),
        (this.closePath = function() {
          o.closePath();
        }),
        (this.fill = function() {
          o.fill();
        }),
        (this.stroke = function() {
          o.stroke();
        }),
        (this.save = function() {
          o.save();
        }),
        (this.translate = function(t, e) {
          o.translate(t, e);
        }),
        (this.restore = function() {
          o.restore();
        }),
        (this.moveTo = function(t, e) {
          o.moveTo(t, e);
        }),
        (this.lineTo = function(t, e) {
          o.lineTo(t, e);
        }),
        (this.drawDot = function(t, e, i, a) {
          a && o.moveTo(t, e), o.arc(t, e, i, 0, 2 * Math.PI);
        }),
        (this.arc = function(t, e, i, a, r, n) {
          o.arc(t, e, i, a, r, n);
        }),
        (this.drawCandleRect = function(t, e, i, a, r, n) {
          if (e != i && !(2 > a)) {
            var s = i - e;
            (t += 0.5 * a),
              (a = ~~(a + 0.5)),
              (t = ~~(t + 0.5)),
              (e = ~~(e + 0.5)),
              (s = ~~(s + 0.5)),
              (o.lineWidth = 1),
              n
                ? ((t -= 0.5),
                  (e -= 0.5),
                  (o.strokeStyle = r),
                  o.strokeRect(t, e, a, s))
                : (1 > s && (s = 1),
                  (o.fillStyle = r),
                  o.fillRect(t, e, a, s),
                  (t -= 0.5),
                  (e -= 0.5),
                  (o.strokeStyle = r),
                  o.strokeRect(t, e, a, s));
          }
        }),
        (this.drawCandleRect_solid = function(t, e, i, a, r) {
          if (e != i && !(2 > a)) {
            var n = i - e;
            (t += 0.5 * a),
              (a = ~~(a + 0.5)),
              (t = ~~(t + 0.5)),
              (e = ~~(e + 0.5)),
              (n = ~~(n + 0.5)),
              (o.lineWidth = 1),
              (o.fillStyle = r),
              o.fillRect(t, e, a, n),
              (t -= 0.5),
              (e -= 0.5),
              (o.strokeStyle = r),
              o.strokeRect(t, e, a, n);
          }
        }),
        (this.drawCandleLineRect = function(t, e, i, a, r, n, s, l) {
          if (
            ((t += n),
            (t = ~~(t + 0.5)),
            (o.strokeStyle = s),
            (o.lineWidth = 1),
            e != r)
          ) {
            if (((t -= 0.5), o.moveTo(t, e), l && n >= 2)) {
              var u = Math.min(i, a),
                h = Math.max(i, a);
              o.lineTo(t, u), o.moveTo(t, h);
            }
            o.lineTo(t, r);
          }
          if (i == a) {
            var d = 0.5 * n;
            (d = ~~(d + 0.5)),
              0.5 > d && (d = 0.5),
              (i = ~~(i + 0.5)),
              (i -= 0.5),
              o.moveTo(t - d, i),
              o.lineTo(t + d, i);
          }
        }),
        (this.drawOhlc = function(t, e, i, a, r, n, s) {
          (o.strokeStyle = s), (o.lineWidth = 1);
          var l = 0.5 * n;
          (l = ~~(l + 0.5)),
            0.5 > l && (l = 0.5),
            (t += n),
            (t = ~~(t + 0.5)),
            (e = ~~(e + 0.5)),
            (e -= 0.5),
            o.moveTo(t - l, e),
            o.lineTo(t, e),
            (r = ~~(r + 0.5)),
            (r -= 0.5),
            o.moveTo(t, r),
            o.lineTo(t + l, r),
            (t -= 0.5),
            o.moveTo(t, i),
            o.lineTo(t, a);
        }),
        (this.drawVStickC = function(t, e, i, a, r) {
          (t += i),
            (i = ~~(i + 0.5)),
            1 > i && (i = 1),
            (t = ~~(t + 0.5)),
            1 & i && (t -= 0.5),
            (e = ~~(e + 0.5)),
            (a = ~~(a - 0.5)),
            (o.strokeStyle = r),
            (o.lineWidth = i),
            o.moveTo(t, e),
            o.lineTo(t, e + a);
        }),
        (this.drawVStickRect = function(t, e, i, a, r, n) {
          t += 0.5 * i;
          var s = i;
          (t = ~~(t + 0.5)),
            (s = ~~(s + 0.5)),
            (e = ~~(e + 0.5)),
            (a = ~~(a + 0.5)),
            0 == a && (a = 1),
            n
              ? (0.5 > s && (s = 0.5),
                (o.fillStyle = r),
                o.fillRect(t, e, s, a))
              : ((t -= 0.5),
                (e -= 0.5),
                (o.strokeStyle = r),
                o.strokeRect(t, e, s, a));
        }),
        (this.drawBg = function(t) {
          l && l.drawBg(!1, t);
        }),
        (this.remove = function() {
          t.domGc(s), u && u.gc(), l && l.gc();
        }),
        c(),
        f(),
        e.withHBg && (p(), b()),
        g(e.reO);
    }
    (this.xh5_ibPainter = c), (this.xh5_Canvas = e);
  }
  var a = t.$C,
    xh5_BrowserUtil = t.xh5_BrowserUtil,
    xh5_EvtUtil = t.xh5_EvtUtil,
    xh5_deviceUtil = t.xh5_deviceUtil,
    xh5_HtmlPosUtil = t.xh5_HtmlPosUtil,
    fBind = t.fBind,
    dateUtil = t.dateUtil,
    oc = t.oc,
    globalCfg = e.globalCfg;
  return i;
});

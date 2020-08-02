xh5_define("datas.t", ["utils.util"], function(e) {
  var t = e,
    a = e.HQ_DOMAIN,
    r = t.load,
    n = t.dateUtil,
    i = t.tUtil,
    l = 0 == location.protocol.indexOf("https:"),
    s = {
      isBond: function(e) {
        return /^(sh204\d{3}|sz1318\d{2})$/.test(e)
          ? "bond"
          : /^sh020\d{3}$/.test(e)
          ? "bond"
          : /^sz108\d{3}$/.test(e)
          ? "bond"
          : /^sh(009|010|018)\d{3}$/.test(e)
          ? "bond"
          : /^sz10\d{4}$/.test(e)
          ? "bond"
          : /^sh(100|110|112|113)\d{3}$/.test(e)
          ? "bond"
          : /^sz12\d{4}$/.test(e)
          ? "bond"
          : /^sh(105|120|129|139)\d{3}$/.test(e)
          ? "bond"
          : /^sz11\d{4}$/.test(e)
          ? "bond"
          : !1;
      },
      us: function(e, t, a) {
        for (var r, n = e.split(";"), i = [], l = 0, s = n.length; s > l; l++) {
          var o,
            c,
            p,
            d,
            m,
            u = n[l].split(",");
          0 == l
            ? (a
                ? ((o = u[1].split(":")[0] + ":" + u[1].split(":")[1]),
                  (c = u[0]),
                  (p = Number(u[4])),
                  (d = Number(u[2])),
                  (m = Number(u[5]) || Number(u[4])))
                : ((m = t.prevclose),
                  (o = u[0].split(":")[0] + ":" + u[0].split(":")[1]),
                  (p = Number(u[3])),
                  (d = Number(u[1]))),
              (r = { prevclose: m, d: c, m: o, p: p, v: d, avp: p }))
            : ((o = u[0].split(":")[0] + ":" + u[0].split(":")[1]),
              (p = Number(u[3])),
              (d = Number(u[1])),
              (r = { m: o, p: p, v: d, avp: p })),
            i.push(r),
            a &&
              l == s - 1 &&
              "16:00" > o &&
              ((r = { m: "16:00", p: p, v: 0, avp: p }), i.push(r));
        }
        return i;
      },
      optionCn: function(e, t, a) {
        if (typeof e.length < 1) return [];
        for (
          var r, n, l, s, o = i.gata(a), c = [], p = e.length, d = 0, m = 0;
          p > d;
          d++
        )
          (l = e[d]),
            o[o.length - 1] < l.m ||
              (0 == m && Number(l.p) <= 0 && (l.p = t.price || t.prevclose),
              m++,
              Number(l.p) > 0 && (r = Number(l.p)),
              Number(l.p) <= 0 && (l.p = r || 0),
              Number(l.a) > 0 && (n = Number(l.a)),
              Number(l.a) <= 0 && (l.a = n || r || 0),
              Number(l.v) < 0 && (l.v = 0),
              (s = {
                m: l.i,
                p: Number(l.p),
                avp: Number(l.a),
                v: Number(l.v),
                iy: Number(l.t),
              }),
              0 == d && (s.d = l.d),
              c.push(s));
        return c;
      },
      opm: function() {
        return [];
      },
      gbIndex: function(t, a, r, n, l) {
        if (typeof t.length < 1) return [];
        var s,
          o,
          c = i.gata(r, l.time),
          p = [],
          d = t.length,
          m = 0;
        n && (d = c.length);
        for (
          var u, b, v = 0, g = 0;
          d > v &&
          ((o = t[v]),
          (u = 0),
          0 == v && (u = n ? 1 : 4),
          0 == g && Number(o[1 + u]) <= 0 && (o[1 + u] = a.price),
          !(a.index > 0 && !n && a.index <= e.arrIndexOf(c, o[u])));
          v++
        )
          g++,
            o && Number(o[1 + u]) > 0 && (s = Number(o[1 + u])),
            o && Number(o[1 + u]) <= 0 && (o[1 + u] = s || 0),
            o
              ? ((m += Number(o[1 + u])),
                (b = { m: o[u], p: Number(o[1 + u]), avp: m / (v + 1), v: 0 }),
                0 == v &&
                  ((b.d = o[0]),
                  (b.prevclose = n ? Number(o[u]) || b.p : a.prevclose),
                  n &&
                    (o[1 + u].split(":").length > 1 &&
                      (b.p = b.avp = Number(o[3])),
                    isNaN(m) && ((m = Number(o[3])), (b.avp = m)))))
              : n &&
                (b = {
                  m: c[v],
                  p: p[p.length - 1].p,
                  avp: p[p.length - 1].avp,
                  v: 0,
                }),
            p.push(b);
        return p;
      },
      hf: function(e, a, r, i, l) {
        var s = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: n.ds(a.date),
            time: a.time,
          },
          td1: e,
          market: r,
          timeRange: l.time,
        }).td1;
        return (
          s.length > 1 &&
            ((s[0].today = s[0].date), (s[0].date = t.dateUtil.sd(s[0].date))),
          s
        );
      },
      msci: function(e, a, r) {
        var i = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: n.ds(a.date),
            time: a.time,
          },
          td1: e,
          market: r,
          timeRange: [
            ["07:00", "23:59"],
            ["00:00", "06:00"],
          ],
        }).td1;
        return (
          i.length > 1 &&
            ((i[0].today = i[0].date), (i[0].date = t.dateUtil.sd(i[0].date))),
          i
        );
      },
      goods: function(e, a, r, i, l) {
        var s = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: n.ds(a.date),
            time: a.time,
          },
          td1: e,
          market: r,
          timeRange: l,
        }).td1;
        return (
          s.length > 1 &&
            ((s[0].today = s[0].date), (s[0].date = t.dateUtil.sd(s[0].date))),
          s
        );
      },
      hk: function(e, t, a) {
        if (typeof e.length < 1) return [];
        for (
          var r,
            n,
            l,
            s = i.gata(a),
            o = [],
            c = e.length,
            p = 0,
            d = 0,
            m = 0,
            u = 0;
          c > m;
          m++
        )
          (n = e[m]),
            (d += Number(n.a)),
            (p += Number(n.v)),
            n.m && (n.m = n.m.split(":")[0] + ":" + n.m.split(":")[1]),
            s[s.length - 1] < n.m ||
              (0 == u && Number(n.p) <= 0 && (n.p = t.price || t.prevclose),
              u++,
              Number(n.p) > 0 && (r = Number(n.p)),
              Number(n.p) <= 0 && (n.p = r || 0),
              0 >= p && (p = 1),
              (l = { m: n.m, p: Number(n.p), avp: d / p, v: Number(n.v) }),
              o.push(l));
        return o;
      },
      otc: function(e, t, a) {
        if (typeof e.length < 1) return [];
        for (
          var r, n, l, s, o = i.gata(a), c = [], p = e.length, d = 0, m = 0;
          p > d;
          d++
        ) {
          s = e[d];
          var u = s.m.split(":"),
            b = u[0] + ":" + u[1];
          o[o.length - 1] < b ||
            (0 == m && Number(s.p) <= 0 && (s.p = t.price || t.prevclose),
            m++,
            Number(s.p) > 0 && (r = Number(s.p)),
            Number(s.p) <= 0 && (s.p = r || 0),
            Number(s.avg) > 0 && (n = Number(s.avg)),
            Number(s.avg) <= 0 && (s.avg = n || r || 0),
            (l = {
              p: Number(s.p),
              m: b,
              avp: Number(s.avg),
              v: Number(s.v) / 1e3,
            }),
            c.push(l));
        }
        return (
          c.length >= 0 &&
            t.time > "14:59" &&
            (c[0] = { m: "14:59", p: t.price, avp: t.price, v: 0 }),
          c
        );
      },
      lse: function(e, t, a, r) {
        if (typeof e.length < 1) return [];
        for (var n, l, s = (i.gtlse(), []), o = 0, c = e.length; c > o; o++) {
          var p = e[o];
          r || ((n = t.today), (l = t.prevclose));
          var d = {
            d: n,
            m: p.m,
            p: Number(p.p),
            avp: Number(p.a),
            prevclose: l,
            v: Number(p.v),
          };
          s.push(d);
        }
        return s;
      },
      futures: function(e, a, r, i, l) {
        var s = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: n.ds(a.date),
            time: a.time,
          },
          td1: e,
          market: r,
          timeRange: l.time,
        }).td1;
        return (
          s.length > 1 &&
            ((s[0].prevclose = a.prevclose),
            (s[0].today = s[0].date),
            (s[0].date = t.dateUtil.sd(s[0].date))),
          s
        );
      },
      gdf: function(e, a, r) {
        if (!e || e.length < 9 || !a) return null;
        var n = r ? e : t.xh5_S_KLC_D(e),
          i = t.dateUtil.dd(a);
        6 == i.getDay() && i.setDate(i.getDate() - 1),
          0 == i.getDay() && i.setDate(i.getDate() - 2);
        for (
          var l,
            s = new Date(i.getFullYear() - 3, i.getMonth(), i.getDate()),
            o = 0,
            c = 0,
            p = 0,
            d = n.length;
          d > p;
          p++
        )
          (l = n[p]),
            l.getTime() <= s.getTime() &&
              n[p + 1].getTime() >= s.getTime() &&
              (o = p),
            t.dateUtil.stbd(l, i) && (c = p + 1);
        return n.slice(o, c);
      },
      c2b: function(e) {
        e = e.replace(" ", "+");
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
          e
        );
        return t >= 0 ? t : 0;
      },
      db: function(e) {
        if (!e) return [];
        for (var t, a, r = [], n = 0, i = 0, l = 0, s = e.length; s > l; l++)
          (t = this.c2b(e.charAt(l))),
            (a = 6 & i ? (7 & i) ^ 7 : 5),
            (n |= (t >> (5 - a)) << ((7 ^ i) - a)),
            64767 == n && 63 == t && (n = 65535),
            i > 25 && ((i -= 32), (r[r.length] = n), (n = 0)),
            (n |= (t & ((1 << (5 - a)) - 1)) << ((7 | i) + 4 + a)),
            (i += 6);
        return r;
      },
      fB: function(t, a, r, n) {
        t.splice(360, 3);
        for (
          var l, s = [], o = i.gata(r), c = 3 * o.length, p = 0, d = 0, m = 0;
          c > m;
          m += 3
        )
          (d = Math.floor(m / 3)),
            a
              ? (s[s.length] = { time: o[d], price: t[m + 1] / 1e3 })
              : ((s[s.length] = {
                  time: o[d],
                  avg_price: t[m] / 1e3,
                  price: t[m + 1] / 1e3,
                  volume: t[m + 2] / 100,
                }),
                e.isRepos(n.symbol) &&
                  ((s[d].avg_price = s[d].price), (s[d].volume *= 10)),
                /^(hy|gn|dy)\d+/.test(n.symbol) && (s[d].volume *= 100),
                e.isCNK(n.symbol) && (s[d].volume *= 100),
                s[d].volume > 0 && (p += s[d].volume),
                s[d] &&
                  0 == s[d].price &&
                  (0 == d
                    ? (s[d].price = s[d].avg_price = n.prevclose)
                    : ((s[d].price = s[d - 1].price),
                      (s[d].avg_price = s[d - 1].price))),
                s[d].avg_price > 0 && (l = s[d].avg_price));
        return (
          s[0].price < 0 && (s[0].price = s[0].avg_price = p = 0),
          a || ((s[0].totalVolume = p), (s[0].totalAmount = p * l)),
          (s[0].index = n.index),
          (s[0].prevclose = n.prevclose),
          (s[0].symbol = n.symbol),
          (s[0].name = n.name),
          (s[0].today = n.today),
          (s[0].date = n.date),
          (s[0].lastfive = n.lastfive),
          s
        );
      },
      ctdf: function(a, r, n, l) {
        for (var s, o, c, p, d = [], m = r, u = 0, b = a.length; b > u; u++) {
          d[d.length] =
            0 == u && "" == a[0]
              ? i.gltbt(1, n.prevclose)
              : t.xh5_S_KLC_D(a[u]);
          var v,
            g = 0;
          d[u].splice(120, 1);
          var f;
          for (
            e.isRepos(n.symbol)
              ? ((f = 271), d[u].splice(f, d[u].length - f))
              : (f = 241),
              o = 0,
              c = f;
            c > o;
            o++
          )
            d[u][o] &&
              0 == d[u][o].price &&
              (0 == o
                ? (d[u][o].price = d[u][o].avg_price = d[u][o].prevclose)
                : ((d[u][o].price = d[u][o - 1].price),
                  (d[u][o].avg_price = d[u][o - 1].avg_price))),
              e.isRepos(n.symbol) &&
                (d[u][o]
                  ? ((d[u][o].avg_price = d[u][o].price),
                    (d[u][o].volume *= 10))
                  : (d[u][o] = {
                      price: -0.01,
                      avg_price: -0.01,
                      volume: -0.01,
                    })),
              (v = d[u][o].volume *= 0.01),
              /^(hy|gn|dy)\d+/.test(n.symbol) && (d[u][o].volume *= 100),
              e.isCNK(n.symbol) && (d[u][o].volume *= 100),
              (g += v);
          (d[u][0].totalVolume = g),
            (d[u][0].prevclose = d[u][0].prevclose || d[u][0].price);
        }
        var f = d.length;
        for (
          f > 5 && d.splice(0, f - 5), s = [m], f = l.length, u = f - 2;
          u > f - 6;
          u--
        )
          for (o = 0, p = d.length; p > o; o++) {
            if (t.dateUtil.stbd(d[o][0].date, l[u])) {
              s.unshift(i.azft(d[o], e.isRepos(n.symbol) ? "REPO" : "CN"));
              break;
            }
            if (o == d.length - 1) {
              var h = s[0][0].prevclose;
              s.unshift(i.gltbt(1, h)),
                (s[0][0].date = t.dateUtil.dd(l[u])),
                (s[0][0].prevclose = h);
            }
          }
        return s;
      },
      ctdb: function(t, a, r, n, l, s) {
        for (var o = a, c = [o], p = n.length, d = p - 2; d > p - 6; d--)
          c.unshift(
            "HF" == e.market(r.symbol)
              ? i.gltbt(1, r.prevclose, !1, l, [n[d]], s.time)
              : "NF" == e.market(r.symbol)
              ? i.gltbt(1, r.prevclose, !1, l, [n[d]], s.time)
              : "global_index" == e.market(r.symbol)
              ? i.gltbt(1, r.prevclose, !1, l, [n[d]], s.time)
              : i.gltbt(1, r.prevclose, !1, l, [n[d]])
          );
        return c;
      },
      fund: function(e) {
        var t = [];
        if (e)
          for (
            var a = e.detail.split(","), r = 0, n = 0, i = a.length;
            i > n;
            n += 2
          ) {
            r += Number(a[n + 1]);
            var l = {
              p: Number(a[n + 1]),
              avp: Number(r / (n / 2 + 1)),
              m: a[n],
            };
            0 == n &&
              (l.prevclose = Number("09:30" == a[n] ? e.yes : a[n + 1])),
              t.push(l);
          }
        return t;
      },
      pkt: function(e, a, r, n, l) {
        if (typeof e.length < 1) return [];
        var s,
          o = !1,
          c = e,
          p = i.s0(a.date.getHours()) + ":" + i.s0(a.date.getMinutes());
        switch (r) {
          case "HF":
            (s = i.gata(r, l.time)),
              c.length <= 0 &&
                c.push({ d: a.today, price: a.price, prevclose: a.prevclose }),
              c[0].d < a.today &&
                p > l.time[0][0] &&
                (p = l.time[l.time.length - 1][1]);
            break;
          case "NF":
            s = i.gata(r, l.time);
            break;
          case "global_index":
            s = i.gata(r, l.time);
            break;
          default:
            s = i.gata(r);
        }
        for (var d, m = [], u = 0, b = 0, v = s.length; v > b; b++) {
          if (
            ((d = {}),
            (m[m.length] = d),
            (d.time = s[b]),
            (d.volume = d.price = -1),
            (d.avg_price = -1),
            p)
          ) {
            if (o && !n) continue;
            p == d.time && (o = !0);
          }
          for (var g = s[0], f = u, h = c.length; h > f; f++) {
            var _ = c[f],
              y = String(_.m).substring(0, 5);
            if (y == s[b]) {
              y == g &&
                ((d.symbol = a.symbol),
                (d.name = a.name),
                n
                  ? ((d.prevclose = Number(e[0].prevclose) || Number(e[0].p)),
                    (d.date = t.dateUtil.sd(e[0].d)),
                    (d.today = e[0].d))
                  : ((d.prevclose = a.prevclose),
                    "HF" == r || "NF" == r
                      ? ((d.date = t.dateUtil.sd(e[0].d) || a.date),
                        (d.today = e[0].d || a.today))
                      : ((d.date = a.date), (d.today = a.today))),
                "fund" == r && (d.prevclose = e[0].prevclose)),
                (d.volume = _.v || 0),
                (d.avg_price = _.avp),
                (d.price = _.p),
                _.iy && (d.holdPosition = _.iy),
                c.splice(f, 1);
              break;
            }
            y > s[b] ||
            ("global_index" == r && "00:00" == y && y < s[b]) ||
            ("NF" == r && "21:00" == g && d.time > "21:00" && y < s[b])
              ? (0 == b
                  ? n
                    ? ((d.price = e[0].p),
                      (d.prevclose = e[0].prevclose || d.price),
                      (d.avg_price = e[0].avp),
                      (d.date = t.dateUtil.sd(e[0].d)),
                      (d.today = e[0].d))
                    : ((d.price =
                        "US" === r || "HK" === r
                          ? a.prevclose
                          : a.open || a.prevclose),
                      (d.prevclose = a.prevclose),
                      (d.avg_price = d.price),
                      (d.symbol = a.symbol),
                      (d.name = a.name),
                      "NF" === r
                        ? ((d.date = t.dateUtil.sd(e[0].d) || a.date),
                          (d.today = e[0].d || a.today))
                        : ((d.date = a.date), (d.today = a.today)))
                  : ((d.price = m[b - 1].price),
                    (d.avg_price = m[b - 1].avg_price),
                    ("option_cn" == r || "op_m" == r || "NF" == r) &&
                      (d.holdPosition = m[b - 1].holdPosition)),
                (d.volume = -0.01))
              : 0 != b ||
                n ||
                ((d.price =
                  "US" == r
                    ? e[f].p || a.prevclose
                    : e[f].p || a.open || a.prevclose),
                (d.prevclose = a.prevclose),
                (d.avg_price = e[f].avp || d.price),
                (d.symbol = a.symbol),
                (d.name = a.name),
                (d.volume = 0),
                "HF" == r || "NF" == r
                  ? ((d.date = t.dateUtil.sd(e[0].d) || a.date),
                    (d.today = e[0].d || a.today))
                  : ((d.date = a.date), (d.today = a.today)));
          }
        }
        return (m[0].index = v - 1), m;
      },
    };
  return new (function() {
    this.VER = "2.8.0";
    var o = "http://finance.sina.com.cn/realstock/company/klc_td_sh.txt",
      c = {
        REPO: {
          T_Head_STR: "hq_str_ml_",
          T_EMI_URL: "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
          T_URL: "http://" + a + ".sinajs.cn/?_=$rn&list=$symbol",
          T5_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm_nhg.js?day=$rn",
          TRADING_DATES_URL: o,
          HISTORY_DATA_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
          LAST5_URL:
            "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn",
        },
        CN: {
          T_Head_STR: "hq_str_ml_",
          T_EMI_URL: "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
          T_URL: "http://" + a + ".sinajs.cn/?_=$rn&list=$symbol",
          T5_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm.js?day=$rn",
          TRADING_DATES_URL: o,
          HISTORY_DATA_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
          LAST5_URL:
            "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn",
        },
        option_cn: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
          T5_URL:
            "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getFiveDayLine?symbol=$symbol&random=$rn&callback=$cb=",
          TRADING_DATES_URL: o,
        },
        op_m: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/futures/api/openapi.php/FutureOptionAllService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
          TRADING_DATES_URL: o,
        },
        US: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb=/US_MinlineNService.getMinline?symbol=$symbol&day=1&random=$rn",
          T5_URL:
            "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinlineNService.getMinline?symbol=$symbol&day=5&random=$rn",
          TRADING_DATES_URL:
            "http://stock.finance.sina.com.cn/usstock/api/openapi.php/US_MinKService.getTradeDays?&start_day=$start&end_day=$end&callback=$cb=",
        },
        HK: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/hkstock/api/openapi.php/HK_StockService.getHKMinline?symbol=$symbol&random=$rn&callback=$cb=",
          T5_URL:
            "http://quotes.sina.cn/hk/api/openapi.php/HK_MinlineService.getMinline?symbol=$symbol&day=5&callback=$cb=",
          LAST5_URL:
            "http://stock.finance.sina.com.cn/hkstock/api/jsonp_v2.php/$cb/HK_StockService.getStock5DayAvgVolume?symbol=$symbol",
          TRADING_DATES_URL: o,
        },
        fund: {
          T_Head_STR: "t1",
          T_URL:
            "http://app.xincai.com/fund/api/jsonp.json/$cb=/XinCaiFundService.getFundYuCeNav?symbol=$symbol&___qn=3",
          TRADING_DATES_URL: o,
        },
        global_index: {
          T_Head_STR: "t1",
          T_URL:
            "//stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb=/Global_IndexService.getTimeLine?symbol=$symbol",
          TRADING_DATES_URL: o,
        },
        CFF: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
          T5_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
          TRADING_DATES_URL: o,
        },
        OTC: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/thirdmarket/api/openapi.php/NQHQService.minline?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: o,
        },
        NF: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
          T5_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
          TRADING_DATES_URL: o,
        },
        HF: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFuturesMinLine?symbol=$symbol&callback=$cb=",
          T5_URL:
            "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFutures5MLine?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: o,
        },
        GOODS: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/openapi.php/SpotService.getMinLine?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: o,
        },
        MSCI: {
          T_Head_STR: "t1",
          T_URL:
            "http://quotes.sina.cn/msci/api/openapi.php/MSCIService.getMinLine?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: o,
        },
        LSE: {
          T_Head_STR: "t1",
          T_URL:
            "http://quotes.sina.cn/lse/api/openapi.php/LSEService.minline?symbol=$symbol&type=1&callback=$cb=",
          TRADING_DATES_URL: o,
        },
      },
      p = {},
      d = 0,
      m = function(t, a, r) {
        var n = e.market(a),
          i = c[n][r];
        return (l || t) && (i = e.getSUrl(i)), i;
      },
      u = 0;
    this.get = function(a, n) {
      var l,
        o,
        v,
        g = a.symbol,
        f = e.market(g),
        h = a.date,
        _ = a.withT5,
        y = a.withI,
        k = a.ssl;
      u = a.dist5;
      var T = { msg: null, data: { td1: null, td5: null, hq: null } };
      switch (((v = l = g), f)) {
        case "HK":
          (g = "rt" == g.substring(0, 2) ? g.slice(3) : g),
            (l = g),
            (o = l.replace("hk", ""));
          break;
        case "US":
          (v +=
            1 === a.assisthq
              ? "," + g + ",gb_ixic,sys_time"
              : "," + g + ",sys_time"),
            (l = o = g.replace("gb_", "")),
            (o = o.replace("$", ".")),
            (l = l.replace(".", ""));
          break;
        case "OTC":
          o = g.replace("sb", "");
          break;
        case "fund":
          o = g.replace("fu_", "");
          break;
        case "CFF":
          o = g.replace("CFF_RE_", "");
          break;
        case "CN":
        case "REPO":
          o = "ml_" + g;
          break;
        case "global_index":
          o = g.replace("znb_", "");
          break;
        case "op_m":
          o = l = g.replace("P_OP_", "");
          break;
        case "HF":
          o = g.replace("hf_", "");
          break;
        case "GOODS":
          o = g.replace("gds_", "");
          break;
        case "MSCI":
          o = g.replace("msci_", "");
          break;
        case "NF":
          o = g.replace("nf_", "");
          break;
        case "LSE":
          (l = o = g.replace("lse_", "")),
            (o = o.replace("$", ".")),
            (l = l.replace(/\W/g, ""));
          break;
        default:
          o = g;
      }
      var N = function(e) {
          var t, a, r;
          return h
            ? ((r = h.split("-")[1] || "01"),
              (a = h.split("-")[0]),
              h.split("-")[1] &&
                Number(h.split("-")[1]) < 10 &&
                ((r = "0" + Number(h.split("-")[1])),
                (h = a + "-" + r + "-" + h.split("-")[2])),
              (t = "MLC_" + g + "_" + a + "_" + r),
              { lc: t, year: a, month: r })
            : ((h = e), null);
        },
        hist = function(a) {
          r(
            m(k, g, "HISTORY_DATA_URL")
              .replace("$symbol", g)
              .replace("$y", a.year)
              .replace("$m", a.month)
              .replace("$date", h),
            function() {
              var l = String(window[a.lc]);
              if (((window[a.lc] = null), (T.msg = "history"), l)) {
                for (
                  var o,
                    c,
                    d,
                    u,
                    b = String(l).split(","),
                    v = [],
                    _ = b.length,
                    y = i.gata(f),
                    N = 0;
                  _ > N;
                  N++
                ) {
                  (v[N] = t.xh5_S_KLC_D(b[N])),
                    (o = v[N].shift()),
                    (v[N][0].prevclose = o.prevclose),
                    (v[N][0].date = o.date),
                    v[N].splice(120, 1),
                    (c = 0);
                  for (var R = 0; 241 > R; R++)
                    (d = e.isCNK(g) ? v[N][R].volume : (v[N][R].volume /= 100)),
                      (c += d),
                      (v[N][R].time = y[R]);
                  var $ = t.dateUtil.ds(o.date);
                  $ == h && (u = v[N]), (v[N][0].totalVolume = c);
                }
                if (v.length < 5)
                  return void r(
                    m(k, g, "TRADING_DATES_URL"),
                    function() {
                      for (
                        var e = window.datelist,
                          r = v.length,
                          l = s.gdf(e, t.dateUtil.sd(h)),
                          o = 5 - r;
                        o > 0;
                        o--
                      )
                        v.unshift(
                          i.gltbt(1, v[0][0].price, !1, f, [
                            l[l.length - 5 + o],
                          ])
                        );
                      (T.data.td1 = u),
                        (T.data.td5 = v),
                        (p[g + a.year + a.month] = T),
                        t.isFunc(n) && n(T);
                    },
                    null,
                    { symbol: g, market: f, type: "tradedate" }
                  );
                (T.data.td1 = u),
                  (T.data.td5 = v),
                  (p[g + a.year + a.month] = T),
                  t.isFunc(n) && n(T);
              }
            },
            function() {
              (T.msg = "nohistory"), t.isFunc(n) && n(T);
            },
            { market: f, symbol: g, type: "historydata" }
          );
        },
        his0 = function(e) {
          return p[g + e.year + e.month]
            ? void (t.isFunc(n) && n(p[g + e.year + e.month]))
            : void hist(e);
        },
        S = function(e, t, a) {
          var r;
          switch (f) {
            case "OTC":
              r = s.otc(e.result.data, t, f);
              break;
            case "US":
              r = s.us(String(e), t);
              break;
            case "HK":
              r = s.hk(e.result.data, t, f);
              break;
            case "fund":
              r = s.fund(e);
              break;
            case "CFF":
              r = s.futures(e, t);
              break;
            case "global_index":
              r = s.gbIndex(e, t, f, !1, a);
              break;
            case "NF":
              r = s.futures(e, t, f, !1, a);
              break;
            case "GOODS":
              r = s.goods(e.result.data, t, f, !1, [
                ["20:00", "23:59"],
                ["00:00", "02:29"],
                ["09:00", "15:30"],
              ]);
              break;
            case "MSCI":
              r = s.msci(e.result.data, t, f, !1, [
                ["07:00", "23:59"],
                ["00:00", "06:00"],
              ]);
              break;
            case "option_cn":
              r = s.optionCn(e.result.data, t, "CN");
              break;
            case "op_m":
              r = s.opm(e.result.data, t, "CN");
              break;
            case "LSE":
              r = s.lse(e.result.data, t, f, !1);
              break;
            case "CN":
            case "REPO":
              r = s.db(e);
              break;
            case "HF":
              r = s.hf(e.result.data.minLine_1d, t, f, !1, a);
          }
          if ("CN" == f || "REPO" == f) r = s.fB(r, !1, f, t);
          else if ("NF" === f || "HF" === f || "GOODS" === f || "MSCI" === f);
          else {
            r = s.pkt(r, t, f, !1, a);
            var n = t.time;
            "HK" == f &&
              n > "15:59" &&
              (n > "16:09" && (n = "16:09"),
              (r[r.length - 1].price = t.price),
              (r[r.length - 1].avg_price = r[r.length - 2].avg_price),
              (r[r.length - 1].time = n),
              (r[r.length - 1].volume = 0),
              r[r.length - 1].avg_price < 0 &&
                (r[r.length - 1].avg_price = t.price));
          }
          return r;
        },
        U = function(i, c, p) {
          var d,
            u = 3;
          if (d && d.length > 600) b(i, g, c, d, n, a.dataformatter, k);
          else if ((u--, u > 0))
            if ("US" == f) {
              var h = e.dateUtil.ds(
                new Date(
                  i.date.getFullYear(),
                  i.date.getMonth() - 2,
                  i.date.getDate()
                ),
                "-"
              );
              r(
                m(k, v, "TRADING_DATES_URL")
                  .replace("$start", h)
                  .replace("$end", i.today)
                  .replace("$cb", "var usHistorydate"),
                function() {
                  for (
                    var r = window.usHistorydate.result.data, p = r.length;
                    p--;

                  )
                    r[p] = e.dateUtil.sd(r[p]);
                  r.length > 0 &&
                    !t.dateUtil.stbd(r[r.length - 1], i.date) &&
                    r.push(i.date),
                    (d = s.gdf(r, i.date, !0)),
                    b(i, g, c, d, f, n, a.dataformatter, k, l, o);
                },
                null,
                { symbol: i.symbol, market: f, type: "tradedate" }
              );
            } else
              r(
                m(k, g, "TRADING_DATES_URL"),
                function() {
                  var e = window.datelist;
                  (d = s.gdf(e, i.date)),
                    b(i, g, c, d, f, n, a.dataformatter, k, null, null, p);
                },
                null,
                { symbol: i.symbol, market: f, type: "tradedate" }
              );
          else null();
        },
        L = function(e, a) {
          r(
            e,
            function() {
              var e = window[c[f].T_Head_STR + l];
              window[c[f].T_Head_STR + l] = null;
              var r,
                s = window["kke_future_" + a.symbol] || {
                  time: [
                    ["06:00", "23:59"],
                    ["00:00", "05:00"],
                  ],
                },
                o = window["kke_future_" + a.symbol] || {
                  time: [
                    ["09:30", "11:29"],
                    ["13:00", "02:59"],
                  ],
                },
                p = window["kke_global_index_" + a.symbol] || {
                  time: [
                    ["09:30", "11:29"],
                    ["13:00", "02:59"],
                  ],
                };
              if (
                "" == e ||
                null == e ||
                (e.result && null == e.result.data) ||
                (e.result && e.result.data && e.result.data.length <= 0) ||
                (e.result &&
                  e.result.data.minLine_1d &&
                  e.result.data.minLine_1d.length <= 0) ||
                e.__ERROR
              )
                switch (((T.msg = "empty"), f)) {
                  case "HF":
                    var m = new Date(a.date);
                    s.time[s.time.length - 1][1] > a.time &&
                      m.setDate(a.date.getDate() - 1),
                      (r = i.gltbt(1, a.prevclose, !0, f, [m], s.time));
                    break;
                  case "NF":
                    r = i.gltbt(1, a.prevclose, !0, f, [a.date], o.time);
                    break;
                  case "global_index":
                    r = i.gltbt(1, a.prevclose, !0, f, [a.date], p.time);
                    break;
                  default:
                    r = i.gltbt(1, a.prevclose, !0, f, [a.date]);
                }
              else
                switch (((T.msg = ""), f)) {
                  case "HF":
                    {
                      var u = a.today.split("-");
                      u[0] +
                        "-" +
                        (Number(u[1]) < 10 ? "0" + u[1] : u[1]) +
                        "-" +
                        (Number(u[2]) < 10 ? "0" + u[2] : u[2]);
                    }
                    (r = S(e, a, s)),
                      "hf_ES" == a.symbol &&
                        a.time > s.time[0][0] &&
                        !t.dateUtil.stbd(r[0].date, a.date) &&
                        (r = i.gltbt(1, a.prevclose, !0, f, [a.date], s.time));
                    break;
                  case "NF":
                    r = S(e, a, o);
                    break;
                  case "global_index":
                    r = S(e, a, p);
                    break;
                  default:
                    r = S(e, a);
                }
              if (
                (r && !r[0].date && (r[0].date = a.date), (T.data.td1 = r), !_)
              )
                return (
                  0 != d && (r[0].lastfive = d), void (t.isFunc(n) && n(T))
                );
              switch (f) {
                case "HF":
                  U(a, r, s);
                  break;
                case "NF":
                  U(a, r, o);
                  break;
                case "global_index":
                  U(a, r, p);
                  break;
                default:
                  U(a, r);
              }
            },
            function() {},
            { market: f, symbol: a.symbol, type: "t1" }
          );
        },
        D = function() {
          "LSE" === f && (v = e.strUtil.replaceStr(v)),
            KKE.api(
              "datas.hq.get",
              { symbol: v, withI: y, cancelEtag: !0, ssl: k },
              function(e) {
                var a = e.data[0];
                if (
                  ((T.data.hq = a),
                  a.name || (a.name = v),
                  !a.name && "CFF" != f)
                )
                  return (T.msg = "error"), void (t.isFunc(n) && n(T));
                var r = m(k, g, "T_URL")
                    .replace("$rn", new Date().getTime())
                    .replace("$symbol", o)
                    .replace("$cb", "var t1" + l),
                  i = N(a.today);
                return "CN" != f ||
                  t.dateUtil.stbd(t.dateUtil.sd(a.today), t.dateUtil.sd(h))
                  ? void L(r, a)
                  : void his0(i);
              }
            );
        };
      D();
    };
    var b = function(e, a, l, o, c, p, b, v, g, f, h) {
      var _ = { msg: null, data: { td1: null, td5: null, hq: null } };
      if (
        ((_.data.hq = e),
        (_.data.td1 = l),
        e.name || (e.name = e.symbol),
        !e.name && "CFF" != c)
      )
        return (_.msg = "error"), void (t.isFunc(p) && p(_));
      var y = function() {
          var u,
            b = a.replace("hk", "");
          r(
            m(v, a, "T5_URL")
              .replace("$symbol", b)
              .replace("$cb", "var __hkT5"),
            function() {
              var b = window.__hkT5,
                g = b.result.data;
              g && g.length > 0
                ? (g.forEach(function(e, t) {
                    var a = 0;
                    if (
                      (e.forEach(function(t, a) {
                        "12:00:00" == t.m && e.splice(a, 1);
                      }),
                      e.forEach(function(t, r) {
                        var i = t.m.split(":");
                        t.date && ((t.today = t.date), (t.date = n.sd(t.date))),
                          t.prevclose && (t.prevclose = Number(t.prevclose)),
                          (t.time = i[0] + ":" + i[1]),
                          (t.price =
                            0 === r
                              ? Number(t.price) || Number(t.prevclose)
                              : Number(t.price) || e[r - 1].price),
                          (t.volume = Number(t.volume)),
                          (a += Number(t.price)),
                          (t.avg_price = Number(a) / (r + 1));
                      }),
                      4 > t && e.length < 331)
                    )
                      for (
                        var r = 0,
                          l = e.length,
                          s = i.gthk(),
                          o = 0,
                          c = s.length;
                        c > o;
                        o++
                      ) {
                        for (var p = s[o], d = r; l > d; d++) {
                          var m = e[d].time.substring(0, 5);
                          if (p === m) {
                            r++;
                            break;
                          }
                          if (0 !== o) {
                            var u = {
                              avg_price: e[o].avg_price,
                              m: s[r] + ":00",
                              time: s[r],
                              price: e[o].price,
                              volume: 0,
                            };
                            e.push(u);
                          }
                        }
                        if (c > r && r >= e.length) {
                          var b = {
                            avg_price: e[o].avg_price,
                            m: s[r] + ":00",
                            time: s[r],
                            price: e[o].price,
                            volume: 0,
                          };
                          e.push(b), r++;
                        }
                      }
                  }),
                  g.length <= 4
                    ? ((u = s.ctdb(5, l, e, o, c)),
                      u.forEach(function(e) {
                        g.forEach(function(t) {
                          e[0].date == t[0].date && (e = t);
                        });
                      }),
                      (_.data.td5 = u))
                    : (n.stbd(g[g.length - 2][0].date, l[0].date) &&
                        ((l[0].today = g[g.length - 1][0].today),
                        (l[0].date = g[g.length - 1][0].date)),
                      (g[g.length - 1] = l),
                      (_.data.td5 = g)))
                : ((u = s.ctdb(5, l, e, o, c)), (_.data.td5 = u));
              var f = "lastfive" + a,
                h = a.substring(2);
              r(
                m(v, a, "LAST5_URL")
                  .replace("$rn", new Date().getHours())
                  .replace("$symbol", h)
                  .replace("$cb", "var " + f + "="),
                function() {
                  var e = window[f];
                  return e
                    ? ((_.data.td5[4][0].lastfive = d = Number(e.volume)),
                      void (t.isFunc(p) && p(_)))
                    : void (t.isFunc(p) && p(_));
                },
                function() {
                  (_.data.td5 = u), t.isFunc(p) && p(_);
                },
                { symbol: e.symbol, market: c, type: "lastfive" }
              );
            }
          );
        },
        k = function() {
          r(
            m(v, a, "T5_URL")
              .replace("$rn", new Date().getTime())
              .replace("$symbol", f)
              .replace("$cb", "var t5" + g + "="),
            function() {
              var r = String(window["t5" + g]),
                n = [],
                d = r.split(" ");
              d.shift();
              for (var m = d.length; m--; ) {
                var u = s.us(d[m], e, !0);
                d[m] = s.pkt(u, e, c, !0);
              }
              if (((window["t5" + a] = null), "" == r)) _.msg = "empty";
              else {
                _.msg = "";
                var b = o.length,
                  v = 0,
                  f = d.length,
                  h = [];
                for (m = b - 1; m > b - 6; m--)
                  h.unshift(i.gltbt(1, e.prevclose, !1, "US", [o[m]]));
                for (m = b - 1; m > b - 6; m--) {
                  for (var y, k = 0, T = 0; f > T; T++)
                    t.dateUtil.stbd(o[m], d[T][0].date) &&
                      ((y = d[T]), (k = 1), (v = T));
                  0 == k &&
                    (y = i.gltbt(1, h[v][0].prevclose, !1, "US", [o[m]])),
                    n.unshift(y);
                }
              }
              (n[4] = l), (_.data.td5 = n), t.isFunc(p) && p(_);
            },
            null,
            { market: c, symbol: e.symbol, type: "t5" }
          );
        },
        T = function(n) {
          var i = "CFF_RE_" == a.substring(0, 7) ? a.slice(7) : a;
          r(
            m(v, a, "T5_URL")
              .replace("$rn", new Date().getTime())
              .replace("$symbol", i)
              .replace("$cb", "var t5" + a),
            function() {
              var r = window["t5" + a],
                i = [];
              if (((window["t5" + a] = null), "" == r)) _.msg = "empty";
              else {
                if (void 0 == r) return (_.msg = "data error."), void N();
                _.msg = "";
                for (var o = [], d = r.length, m = 0; d > m; m++) {
                  var u = s.futures(r[m], e, c, "his", n);
                  if (!t.dateUtil.stbd(t.dateUtil.sd(u[0].d), e.date)) {
                    var b = s.pkt(u, e, c, !0);
                    o.push(b), i.push(b);
                  }
                }
              }
              (i[4] = l), (_.data.td5 = i), t.isFunc(p) && p(_);
            },
            null,
            { market: c, symbol: e.symbol, type: "t5" }
          );
        },
        N = function(a) {
          (_.data.td5 = s.ctdb(5, l, e, o, c, a)), t.isFunc(p) && p(_);
        },
        R = function(n) {
          r(
            m(v, a, "T5_URL")
              .replace("$symbol", a.replace("nf_", ""))
              .replace("$cb", "var t5" + a),
            function() {
              var r = window["t5" + a],
                i = [];
              if (((window["t5" + a] = null), "" == r))
                return (_.msg = "empty"), void N(n);
              if (void 0 == r) return (_.msg = "data error."), void N(n);
              _.msg = "";
              var s = __RepairData({
                hq: e,
                market: c,
                timeRange: n.time,
                td5: r,
              });
              for (
                i = s.td5,
                  i.forEach(function(e) {
                    (e[0].today = e[0].date),
                      (e[0].date = t.dateUtil.sd(e[0].date));
                  });
                i.length > 5;

              )
                i.shift();
              l[0].today !== i[4][0].today
                ? (i.length >= 5 && i.shift(), i.push(l))
                : (i[4] = l),
                (_.data.td5 = i),
                t.isFunc(p) && p(_);
            },
            null,
            { market: c, symbol: e.symbol, type: "t5" }
          );
        },
        $ = function(n) {
          r(
            m(v, a, "T5_URL")
              .replace("$symbol", a.replace("hf_", ""))
              .replace("$cb", "var t5" + a),
            function() {
              var r = window["t5" + a],
                o = [];
              if (((window["t5" + a] = null), "" == r)) _.msg = "empty";
              else {
                if (void 0 == r) return (_.msg = "data error."), void N();
                _.msg = "";
                for (
                  var d = [],
                    m = r.result.data[a.replace("hf_", "")].length,
                    u = 0;
                  m > u;
                  u++
                ) {
                  var b = s.hf(
                    r.result.data[a.replace("hf_", "")][u],
                    e,
                    c,
                    "his",
                    n
                  );
                  if (!t.dateUtil.stbd(t.dateUtil.sd(b[0].d), e.date)) {
                    var v = s.pkt(b, e, c, !0, n);
                    d.push(v);
                  }
                }
                for (
                  var g = [], f = l[0].date || e.date, h = 1;
                  g.length < 6;

                ) {
                  var y = new Date(f);
                  y.setDate(f.getDate() - h),
                    6 != y.getDay() && 0 != y.getDay() && g.push(y),
                    h++;
                }
                var k,
                  T = g.length,
                  R = 1;
                for (u = 0; T > u; u++) {
                  for (k = R; k <= d.length && !(o.length > 3); k++) {
                    if (t.dateUtil.stbd(d[d.length - k][0].date, g[u])) {
                      o.unshift(d[d.length - k]), R++;
                      break;
                    }
                    if (k == d.length - 1) {
                      for (var $ = 0, S = 1; S <= d.length; S++)
                        t.dateUtil.stbd(d[d.length - S][0].date, g[u]) &&
                          ($ = 1);
                      0 == $ &&
                        o.unshift(
                          i.gltbt(
                            1,
                            d[d.length - 1][0].prevclose,
                            !1,
                            c,
                            [g[u]],
                            n.time
                          )
                        );
                    }
                  }
                  R >= d.length &&
                    o.length <= 3 &&
                    !t.dateUtil.stbd(o[0][0].date, g[u]) &&
                    o.unshift(
                      i.gltbt(
                        1,
                        d[d.length - 1][0].prevclose,
                        !1,
                        c,
                        [g[u]],
                        n.time
                      )
                    );
                }
              }
              (o[4] = l), (_.data.td5 = o), t.isFunc(p) && p(_);
            },
            null,
            { market: c, symbol: e.symbol, type: "t5" }
          );
        },
        S = function() {
          r(
            m(v, a, "T5_URL")
              .replace("$rn", new Date().getTime())
              .replace("$symbol", a)
              .replace("$cb", "var t5" + a),
            function() {
              var r = window["t5" + a],
                n = o.length,
                c = [];
              if (((window["t5" + a] = null), "" == r)) _.msg = "empty";
              else {
                _.msg = "";
                for (var d = r.result.data.length, m = 0; d > m; m++) {
                  var u = s.optionCn(r.result.data[m], e, "CN"),
                    b = s.pkt(u, e, "CN", !0);
                  c.push(b);
                }
                var v = c[0] ? c[0][0].prevclose : e.prevclose;
                for (m = n - 1 - d; m > n - 6; m--)
                  c.unshift(i.gltbt(1, v, !1, "CN", [o[m]]));
              }
              (c[4] = l), (_.data.td5 = c), t.isFunc(p) && p(_);
            },
            null,
            { market: c, symbol: e.symbol, type: "t5" }
          );
        },
        U = function() {
          r(
            m(v, a, "T5_URL")
              .replace("$symbol", a)
              .replace("$rn", e.today),
            function() {
              var n = "lastfive" + a,
                i = window["KLC_ML_" + a];
              window["KLC_ML_" + a] = null;
              var u, b;
              "" == i
                ? ((_.msg = "empty"), (u = s.ctdb(5, l, e, o, c)))
                : ((_.msg = ""), (b = i.split(",")), (u = s.ctdf(b, l, e, o))),
                s.isBond(a)
                  ? ((_.data.td5 = u), t.isFunc(p) && p(_))
                  : r(
                      m(v, a, "LAST5_URL")
                        .replace("$rn", new Date().getHours())
                        .replace("$symbol", a),
                      function() {
                        var a = window[n];
                        if (!a || !a.lastfive)
                          return (_.data.td5 = u), void (t.isFunc(p) && p(_));
                        for (var r = a.lastfive.length; r--; )
                          for (var i = a.lastfive[r].d, l = u.length - 1; l--; )
                            if (t.dateUtil.stbds(u[l][0].date, i, null)) {
                              u[l][0].lastfive = Number(a.lastfive[r].c);
                              break;
                            }
                        (d = e.lastfive ? e.lastfive : 0),
                          (_.data.td5 = u),
                          t.isFunc(p) && p(_);
                      },
                      function() {
                        (_.data.td5 = u), t.isFunc(p) && p(_);
                      },
                      { market: c, symbol: e.symbol, type: "lastfive" }
                    );
            },
            function() {
              (_.data.td5 = s.ctdb(5, l, e, o, c)),
                (_.msg = "error"),
                t.isFunc(p) && p(_);
            },
            { market: c, symbol: e.symbol, type: "t5" }
          );
        };
      switch (c) {
        case "HK":
          y();
          break;
        case "US":
          k();
          break;
        case "CFF":
          T(h);
          break;
        case "OTC":
        case "fund":
          N();
          break;
        case "LSE":
          N();
          break;
        case "NF":
          0 == u ? N(h) : R(h);
          break;
        case "option_cn":
          S();
          break;
        case "global_index":
          N(h);
          break;
        case "op_m":
        case "GOODS":
        case "MSCI":
          N();
          break;
        case "CN":
        case "REPO":
          U();
          break;
        case "HF":
          0 == u ? N(h) : $(h);
          break;
        case "":
      }
    };
  })();
});

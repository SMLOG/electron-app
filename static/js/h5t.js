function __RepairData(e) {
  this.VERSION = "1.0.4";
  var t = e,
    r = t.market.toLowerCase(),
    i = -1,
    a = 0,
    n = {
      current: function(e) {
        var t;
        if (
          ((t =
            "Date" === __Utils.tp(e.hq.date)
              ? __Utils.ds(e.hq.date)
              : e.hq.date),
          0 === e.index)
        )
          switch (
            ((e.item.price = e.hq.prevclose),
            (e.item.prevclose = e.hq.prevclose),
            (e.item.date = t),
            r)
          ) {
            case "nf":
              (e.item.holdPosition = a), (e.item.avg_price = e.hq.prevclose);
              break;
            case "goods":
              e.item.avg_price = e.hq.prevclose;
              break;
            case "hf":
              (e.item.price = e.one.prevclose || e.hq.prevclose),
                (e.item.avg_price = i);
          }
        else
          switch (((e.item.price = e.datas[e.index - 1].price), r)) {
            case "nf":
              (e.item.holdPosition = e.datas[e.index - 1].holdPosition),
                (e.item.avg_price = e.datas[e.index - 1].avg_price);
              break;
            case "goods":
              e.item.avg_price = e.datas[e.index - 1].avg_price;
              break;
            case "hf":
              e.item.avg_price = i;
          }
        e.item.volume = a;
      },
      history: function(e, t) {
        if (0 === e.index)
          switch (
            ((e.item.prevclose = e.one.prevclose || e.one.price || 1),
            (e.item.price = e.one.prevclose),
            (e.item.date = e.one.date || "2019-01-03"),
            t.market)
          ) {
            case "nf":
              (e.item.holdPosition = t.zero),
                (e.item.avg_price = e.one.avg_price || e.one.pirce);
              break;
            case "hf":
              e.item.avg_price = t.forgePrice;
          }
        else
          switch (((e.item.price = e.datas[e.index - 1].price), r)) {
            case "nf":
              (e.item.holdPosition = e.datas[e.index - 1].holdPosition),
                (e.item.avg_price = e.datas[e.index - 1].avg_price);
              break;
            case "hf":
              e.item.avg_price = t.forgePrice;
          }
        e.item.volume = a;
      }
    },
    o = function(e, t) {
      if (e.length > 1) {
        for (var r = 0; r < e.length - 1; r++)
          if (e[r][1] > e[r + 1][0]) {
            if (t > e[r][1]) return e[r][1];
            if (t < e[r + 1][0]) return e[r][1];
          } else if (t > e[r][1] && t < e[r + 1][0]) return e[r][1];
        return e[e.length - 1][1];
      }
      return e[e.length - 1][1];
    },
    c = {
      handle: function(e) {
        if (e.history)
          n.history(e, {
            zero: a,
            market: r,
            forgePrice: i
          });
        else {
          var t = e.times.indexOf(e.hq.time);
          if (-1 !== t) e.index <= t && n.current(e);
          else {
            var c = e.times.indexOf(o(e.tRange, e.hq.time));
            c > e.index && n.current(e);
          }
        }
      }
    },
    s = {
      nf: function(e) {
        for (var r = [], i = 0, a = t.td5.length; a > i; i++) {
          var n = d[e]({
            hq: t.hq,
            td1: t.td5[i],
            market: t.market,
            history: 1,
            timeRange: t.timeRange
          });
          r.push(n);
        }
        for (; r.length < 5; ) {
          var o = r.length;
          if (o >= 1) {
            var c = r[0][0].date,
              s = __Utils.sd(c);
            for (
              s.setDate(s.getDate() - 1);
              0 === s.getDay() && 6 === s.getDay();

            )
              s.setDate(s.getDate() - 1);
            var m = __Utils.ds(s),
              l = __Utils.lf.makePerMarketData(t);
            r.unshift(__Utils.lf.makeNewData(1, r[0][0].prevclose, [m], l));
          }
        }
        return r;
      }
    },
    d = {
      xv: function(e, t, r) {
        (e.date = this.ty(t)),
          r ||
            ((e.price = t.price),
            (e.avg_price = t.price),
            (e.prevclose = t.prevclose),
            (e.volume = 0));
      },
      ty: function(e) {
        return "Date" === __Utils.tp(e.date) ? __Utils.ds(e.date) : e.date;
      },
      commonHandle: function(e, t) {
        var r,
          a = [],
          n = __Utils.lf.makePerMarketData(e);
        return (
          n.forEach(function(e, r) {
            var n = {
              price: i,
              avg_price: i,
              time: e,
              volume: i
            };
            "nf" === t.toLowerCase() && (n.holdPosition = i),
              0 === r && ((n.date = i), (n.prevclose = i)),
              a.push(n);
          }),
          e.hq ||
            (e.hq = {
              time: "09:00",
              price: 1,
              prevclose: 1,
              date: __Utils.ds(new Date())
            }),
          (r =
            (e.td1 && e.td1.length <= 0) || !e.td1
              ? this.noData(e)
              : this[t.toLowerCase() + "Parse"](e)),
          {
            times: n,
            datas: a,
            forge: i,
            one: r,
            hqIndex: n.indexOf(e.hq.time)
          }
        );
      },
      noData: function(e) {
        var t = {
          price: 1,
          prevclose: 1,
          avg_price: 1,
          date: new Date(),
          volume: 0,
          holdPosition: 0
        };
        return e.hq
          ? {
              price: e.hq.price,
              prevclose: e.hq.prevclose,
              avg_price: e.hq.price,
              date: e.hq.date,
              volume: e.hq.totalVolume || 0,
              holdPosition: 0
            }
          : t;
      },
      nfParse: function(e) {
        return {
          price: 1 * e.td1[0][1],
          prevclose: 1 * e.td1[0][5] || 1 * e.td1[0][1],
          avg_price: 1 * e.td1[0][2] || 1 * e.td1[0][1],
          date: e.td1[0][6],
          volume: 1 * e.td1[0][3],
          holdPosition: 1 * e.td1[0][4]
        };
      },
      hfParse: function(e) {
        return {
          price: 1 * e.td1[0][5],
          prevclose: 1 * e.td1[0][1] || 1 * e.td1[0][5],
          avg_price: i,
          date: e.td1[0][0],
          volume: 1 * e.td1[0][6]
        };
      },
      msciParse: function(e) {
        return {
          price: 1 * e.td1[0].price,
          prevclose: 1 * e.hq.prevclose,
          avg_price: i,
          date: e.hq.date,
          volume: i
        };
      },
      goodsParse: function(e) {
        return {
          price: 1 * e.td1[0][1],
          prevclose: 1 * e.td1[0][4] || 1 * e.td1[0][1],
          avg_price: 1 * e.td1[0][2] || 1 * e.td1[0][1],
          date: e.td1[0][5],
          volume: 1 * e.td1[0][3]
        };
      },
      commonSecond: function(e, t) {
        t.td1 || (t.td1 = []);
        for (var a, n = 0, s = 0; s < e.datas.length; s++) {
          if (((a = e.datas[s]), !t.history))
            if (-1 !== e.hqIndex) {
              if (s > e.hqIndex) break;
            } else if (
              ((e.hqIndex = e.times.indexOf(o(t.timeRange, t.hq.time))),
              s > e.hqIndex)
            )
              break;
          for (var d, m = n; m < t.td1.length; m++)
            if (((d = t.td1[m]), "msci" === r)) {
              if (d.m === a.time) {
                (a.price = Number(1 * d.p)),
                  (a.avg_price = i),
                  (a.volume = i),
                  n++;
                break;
              }
            } else if (d[0] === a.time) {
              (a.price = Number(d[1])),
                (a.avg_price = Number(d[2]) || Number(d[1])),
                (a.volume = Number(d[3])),
                "nf" === r && (a.holdPosition = Number(d[4])),
                0 === s &&
                  (0 === m
                    ? "goods" === r
                      ? ((a.date = d[5]),
                        (a.prevclose = Number(d[4]) || Number(d[1])))
                      : ((a.date = d[6]),
                        (a.prevclose = Number(d[5]) || Number(d[1])))
                    : "goods" === r
                    ? ((a.date = t.td1[0][5]),
                      (a.prevclose =
                        Number(t.td1[0][4]) || Number(t.td1[0][1])))
                    : ((a.date = t.td1[0][6]),
                      (a.prevclose =
                        Number(t.td1[0][5]) || Number(t.td1[0][1])))),
                n++;
              break;
            }
          a.price === i &&
            c.handle({
              history: t.history,
              one: e.one,
              hq: t.hq,
              datas: e.datas,
              item: a,
              times: e.times,
              index: s,
              tRange: t.timeRange
            });
        }
        return e.datas;
      },
      msci: function(e) {
        var t = this.commonHandle(e, r);
        return this.commonSecond(t, e);
      },
      goods: function(e) {
        var t = this.commonHandle(e, r);
        return this.commonSecond(t, e);
      },
      nf: function(e) {
        var t = this.commonHandle(e, r);
        return this.commonSecond(t, e);
      },
      hf: function(e) {
        var t = this.commonHandle(e, r);
        if (0 === t) return [];
        for (var n, s = this.ty(e.hq), d = 0, m = 0; m < t.datas.length; m++) {
          if (((n = t.datas[m]), -1 !== t.hqIndex)) {
            if (m > t.hqIndex) break;
          } else if (
            ((t.hqIndex = t.times.indexOf(o(e.timeRange, e.hq.time))),
            m > t.hqIndex)
          )
            break;
          for (var l, p = d; p < e.td1.length; p++) {
            var h = 0 === p ? 4 : 0;
            if (((l = e.td1[p]), l[h] === n.time)) {
              0 === m
                ? ((n.price = 1 * l[5] ? 1 * l[5] : 1 * l[1]),
                  (n.volume = 1 * l[6] || a),
                  (n.avg_price = i),
                  0 === p
                    ? ((n.date = l[0] || s),
                      (n.prevclose = e.hq.prevclose || 1 * l[1]))
                    : ((n.date = e.td1[0][0] || s),
                      (n.prevclose = e.hq.prevclose || 1 * l[1]),
                      (n.price = 1 * e.td1[0][5]),
                      (n.volume = 1 * e.td1[0][6])))
                : 0 === p
                ? n.price < 0 &&
                  ((n.price = 1 * l[5]),
                  (n.avg_price = i),
                  (n.volume = 1 * l[6]))
                : n.price < 0 &&
                  ((n.price = 1 * l[1]),
                  (n.avg_price = i),
                  (n.volume = 1 * l[2])),
                d++;
              break;
            }
          }
          n.price === i &&
            c.handle({
              one: t.one,
              hq: e.hq,
              datas: t.datas,
              item: n,
              times: t.times,
              index: m,
              tRange: e.timeRange
            });
        }
        return __Utils.produceAvg(t.datas), t.datas;
      }
    },
    m = {
      td1: [],
      td5: []
    },
    l = function() {
      var e = r;
      (m.td1 = d[e](t)),
        t.td5 &&
          ((m.td5 = []),
          (m.td5 = s[e](e)),
          t.td1 &&
            m.td1[0].date !== m.td5[4][0].date &&
            (m.td5.shift(), m.td5.push(m.td1)));
    };
  return l(), m;
}
var __Utils = {
  tp: function(e) {
    return toString.call(e).slice(8, -1);
  },
  mr: {
    cn: [["09:30", "11:29"], ["13:00", "15:00"]],
    hk: [["09:30", "11:59"], ["13:00", "16:00"]],
    us: [["9:30", "16:00"]],
    uk: [["8:00", "16:30"]],
    repo: [["9:30", "11:29"], ["13:00", "15:30"]],
    goods: [["20:00", "23:59"], ["00:00", "02:29"], ["09:00", "15:30"]],
    msci: [["07:00", "23:59"], ["00:00", "06:00"]],
    nf: void 0,
    hf: void 0,
    gb: void 0,
    custom: void 0
  },
  produceAvg: function(e) {
    for (
      var t, r = 0, i = 0;
      i < e.length && ((t = e[i]), !(t.price <= 0));
      i++
    )
      (r += t.price), (t.avg_price = r / (i + 1));
  },
  lf: {
    split: function() {
      return String.prototype.split.call(arguments[0], arguments[1]);
    },
    makeNewData: function(e, t, r, i, a) {
      for (
        var n, o = [], c = i, s = c.length, d = "0", m = 0, l = 0, p = e * s;
        p > m;
        m++
      )
        (n = {
          time: c[m % s],
          price: d,
          avg_price: d,
          volume: d,
          holdPosition: d
        }),
          m % s == 0 && r && ((n.date = r[l]), l++),
          o.push(n),
          a || (o[m].price = o[m].avg_price = t);
      return (
        (o[0].price = o[0].avg_price = o[0].prevclose = t),
        (o[0].volume = d),
        (o[0].holdPosition = d),
        o
      );
    },
    fillZero: function(e) {
      return (
        (e = parseInt(Number(e))),
        0 > e ? "" : 10 > e ? "0" + String(e) : String(e)
      );
    },
    makeBunchArr: function(e, t) {
      for (var r = [], i = 60, a = e; t >= a; a++)
        r.push(this.fillZero(a / i) + ":" + this.fillZero(a % i));
      return r;
    },
    mixBunchArr: function(e) {
      for (var t, r, i, a, n, o, c, s = [], d = 0, m = e.length; m > d; d++)
        (t = e[d][0]),
          (r = e[d][1]),
          (n = t.split(":")),
          (o = r.split(":")),
          (i = 60 * Number(n[0]) + Number(n[1])),
          (a = 60 * Number(o[0]) + Number(o[1])),
          (c = this.makeBunchArr(i, a)),
          (s = s.concat(c));
      return s;
    },
    makePerMarketData: function(e) {
      return e.timeRange
        ? ((__Utils.mr.custom = e.timeRange), this.mixBunchArr(e.timeRange))
        : e.market
        ? this.mixBunchArr(__Utils.marketRange[e.market])
        : [];
    }
  },
  sd: function(e, t) {
    var r = e.split("-"),
      i = r[0],
      a = r[1] - 1 || 0,
      n = r[2] || 1,
      o = 0,
      c = 0,
      s = 0;
    return (
      t &&
        ((r = t.split(":")), (o = r[0] || 0), (c = r[1] || 0), (s = r[2] || 0)),
      new Date(i, a, n, o, c, s)
    );
  },
  ds: function(e, t, r, i, a, n) {
    "undefined" == typeof t && (t = "-");
    var o = [];
    if ((i || o.push(e[r ? "getUTCFullYear" : "getFullYear"]()), !a)) {
      var c = e[r ? "getUTCMonth" : "getMonth"]() + 1;
      o.push(10 > c ? "0" + c : c);
    }
    if (!n) {
      var s = e[r ? "getUTCDate" : "getDate"]();
      o.push(10 > s ? "0" + s : s);
    }
    return o.join(t);
  }
};
xh5_define("datas.t", ["utils.util"], function(utils_util) {
  var _utils_util = utils_util,
    a = utils_util.HQ_DOMAIN,
    load = _utils_util.load,
    dateUtil = _utils_util.dateUtil,
    tUtil = _utils_util.tUtil,
    isHttps = 0 == location.protocol.indexOf("https:"),
    o = {
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
        for (var r, i = e.split(";"), n = [], s = 0, o = i.length; o > s; s++) {
          var l,
            c,
            d,
            p,
            m,
            u = i[s].split(",");
          0 == s
            ? (a
                ? ((l = u[1].split(":")[0] + ":" + u[1].split(":")[1]),
                  (c = u[0]),
                  (d = Number(u[4])),
                  (p = Number(u[2])),
                  (m = Number(u[5]) || Number(u[4])))
                : ((m = t.prevclose),
                  (l = u[0].split(":")[0] + ":" + u[0].split(":")[1]),
                  (d = Number(u[3])),
                  (p = Number(u[1]))),
              (r = {
                prevclose: m,
                d: c,
                m: l,
                p: d,
                v: p,
                avp: d
              }))
            : ((l = u[0].split(":")[0] + ":" + u[0].split(":")[1]),
              (d = Number(u[3])),
              (p = Number(u[1])),
              (r = {
                m: l,
                p: d,
                v: p,
                avp: d
              })),
            n.push(r),
            a &&
              s == o - 1 &&
              "16:00" > l &&
              ((r = {
                m: "16:00",
                p: d,
                v: 0,
                avp: d
              }),
              n.push(r));
        }
        return n;
      },
      optionCn: function(e, t, a) {
        if (typeof e.length < 1) return [];
        for (
          var r, i, s, o, l = tUtil.gata(a), c = [], d = e.length, p = 0, m = 0;
          d > p;
          p++
        )
          (s = e[p]),
            l[l.length - 1] < s.m ||
              (0 == m && Number(s.p) <= 0 && (s.p = t.price || t.prevclose),
              m++,
              Number(s.p) > 0 && (r = Number(s.p)),
              Number(s.p) <= 0 && (s.p = r || 0),
              Number(s.a) > 0 && (i = Number(s.a)),
              Number(s.a) <= 0 && (s.a = i || r || 0),
              Number(s.v) < 0 && (s.v = 0),
              (o = {
                m: s.i,
                p: Number(s.p),
                avp: Number(s.a),
                v: Number(s.v),
                iy: Number(s.t)
              }),
              0 == p && (o.d = s.d),
              c.push(o));
        return c;
      },
      opm: function() {
        return [];
      },
      gbIndex: function(t, a, r, i, s) {
        if (typeof t.length < 1) return [];
        var o,
          l,
          c = tUtil.gata(r, s.time),
          d = [],
          p = t.length,
          m = 0;
        i && (p = c.length);
        for (
          var u, v, h = 0, b = 0;
          p > h &&
          ((l = t[h]),
          (u = 0),
          0 == h && (u = i ? 1 : 4),
          0 == b && Number(l[1 + u]) <= 0 && (l[1 + u] = a.price),
          !(a.index > 0 && !i && a.index <= utils_util.arrIndexOf(c, l[u])));
          h++
        )
          b++,
            l && Number(l[1 + u]) > 0 && (o = Number(l[1 + u])),
            l && Number(l[1 + u]) <= 0 && (l[1 + u] = o || 0),
            l
              ? ((m += Number(l[1 + u])),
                (v = {
                  m: l[u],
                  p: Number(l[1 + u]),
                  avp: m / (h + 1),
                  v: 0
                }),
                0 == h &&
                  ((v.d = l[0]),
                  (v.prevclose = i ? Number(l[u]) || v.p : a.prevclose),
                  i &&
                    (l[1 + u].split(":").length > 1 &&
                      (v.p = v.avp = Number(l[3])),
                    isNaN(m) && ((m = Number(l[3])), (v.avp = m)))))
              : i &&
                (v = {
                  m: c[h],
                  p: d[d.length - 1].p,
                  avp: d[d.length - 1].avp,
                  v: 0
                }),
            d.push(v);
        return d;
      },
      hf: function(e, a, r, n, s) {
        var o = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: dateUtil.ds(a.date),
            time: a.time
          },
          td1: e,
          market: r,
          timeRange: s.time
        }).td1;
        return (
          o.length > 1 &&
            ((o[0].today = o[0].date), (o[0].date = _utils_util.dateUtil.sd(o[0].date))),
          o
        );
      },
      msci: function(e, a, r) {
        var n = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: dateUtil.ds(a.date),
            time: a.time
          },
          td1: e,
          market: r,
          timeRange: [["07:00", "23:59"], ["00:00", "06:00"]]
        }).td1;
        return (
          n.length > 1 &&
            ((n[0].today = n[0].date), (n[0].date = _utils_util.dateUtil.sd(n[0].date))),
          n
        );
      },
      goods: function(e, a, r, n, s) {
        var o = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: dateUtil.ds(a.date),
            time: a.time
          },
          td1: e,
          market: r,
          timeRange: s
        }).td1;
        return (
          o.length > 1 &&
            ((o[0].today = o[0].date), (o[0].date = _utils_util.dateUtil.sd(o[0].date))),
          o
        );
      },
      hk: function(e, t, a) {
        if (typeof e.length < 1) return [];
        for (
          var r,
            i,
            s,
            o = tUtil.gata(a),
            l = [],
            c = e.length,
            d = 0,
            p = 0,
            m = 0,
            u = 0;
          c > m;
          m++
        )
          (i = e[m]),
            (p += Number(i.a)),
            (d += Number(i.v)),
            i.m && (i.m = i.m.split(":")[0] + ":" + i.m.split(":")[1]),
            o[o.length - 1] < i.m ||
              (0 == u && Number(i.p) <= 0 && (i.p = t.price || t.prevclose),
              u++,
              Number(i.p) > 0 && (r = Number(i.p)),
              Number(i.p) <= 0 && (i.p = r || 0),
              0 >= d && (d = 1),
              (s = {
                m: i.m,
                p: Number(i.p),
                avp: p / d,
                v: Number(i.v)
              }),
              l.push(s));
        return l;
      },
      otc: function(e, t, a) {
        if (typeof e.length < 1) return [];
        for (
          var r, i, s, o, l = tUtil.gata(a), c = [], d = e.length, p = 0, m = 0;
          d > p;
          p++
        ) {
          o = e[p];
          var u = o.m.split(":"),
            v = u[0] + ":" + u[1];
          l[l.length - 1] < v ||
            (0 == m && Number(o.p) <= 0 && (o.p = t.price || t.prevclose),
            m++,
            Number(o.p) > 0 && (r = Number(o.p)),
            Number(o.p) <= 0 && (o.p = r || 0),
            Number(o.avg) > 0 && (i = Number(o.avg)),
            Number(o.avg) <= 0 && (o.avg = i || r || 0),
            (s = {
              p: Number(o.p),
              m: v,
              avp: Number(o.avg),
              v: Number(o.v) / 1e3
            }),
            c.push(s));
        }
        return (
          c.length >= 0 &&
            t.time > "14:59" &&
            (c[0] = {
              m: "14:59",
              p: t.price,
              avp: t.price,
              v: 0
            }),
          c
        );
      },
      lse: function(e, t, a, r) {
        if (typeof e.length < 1) return [];
        for (var i, s, o = (tUtil.gtlse(), []), l = 0, c = e.length; c > l; l++) {
          var d = e[l];
          r || ((i = t.today), (s = t.prevclose));
          var p = {
            d: i,
            m: d.m,
            p: Number(d.p),
            avp: Number(d.a),
            prevclose: s,
            v: Number(d.v)
          };
          o.push(p);
        }
        return o;
      },
      futures: function(e, a, r, n, s) {
        var o = __RepairData({
          hq: {
            price: a.price,
            prevclose: a.prevclose,
            date: dateUtil.ds(a.date),
            time: a.time
          },
          td1: e,
          market: r,
          timeRange: s.time
        }).td1;
        return (
          o.length > 1 &&
            ((o[0].prevclose = a.prevclose),
            (o[0].today = o[0].date),
            (o[0].date = _utils_util.dateUtil.sd(o[0].date))),
          o
        );
      },
      gdf: function(e, a, r) {
        if (!e || e.length < 9 || !a) return null;
        var i = r ? e : _utils_util.xh5_S_KLC_D(e),
          n = _utils_util.dateUtil.dd(a);
        6 == n.getDay() && n.setDate(n.getDate() - 1),
          0 == n.getDay() && n.setDate(n.getDate() - 2);
        for (
          var s,
            o = new Date(n.getFullYear() - 3, n.getMonth(), n.getDate()),
            l = 0,
            c = 0,
            d = 0,
            p = i.length;
          p > d;
          d++
        )
          (s = i[d]),
            s.getTime() <= o.getTime() &&
              i[d + 1].getTime() >= o.getTime() &&
              (l = d),
            _utils_util.dateUtil.stbd(s, n) && (c = d + 1);
        return i.slice(l, c);
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
        for (var t, a, r = [], i = 0, n = 0, s = 0, o = e.length; o > s; s++)
          (t = this.c2b(e.charAt(s))),
            (a = 6 & n ? (7 & n) ^ 7 : 5),
            (i |= (t >> (5 - a)) << ((7 ^ n) - a)),
            64767 == i && 63 == t && (i = 65535),
            n > 25 && ((n -= 32), (r[r.length] = i), (i = 0)),
            (i |= (t & ((1 << (5 - a)) - 1)) << ((7 | n) + 4 + a)),
            (n += 6);
        return r;
      },
      fB: function(t, a, r, i) {
        t.splice(360, 3);
        for (
          var s, o = [], l = tUtil.gata(r), c = 3 * l.length, d = 0, p = 0, m = 0;
          c > m;
          m += 3
        )
          (p = Math.floor(m / 3)),
            a
              ? (o[o.length] = {
                  time: l[p],
                  price: t[m + 1] / 1e3
                })
              : ((o[o.length] = {
                  time: l[p],
                  avg_price: t[m] / 1e3,
                  price: t[m + 1] / 1e3,
                  volume: t[m + 2] / 100
                }),
                utils_util.isRepos(i.symbol) &&
                  ((o[p].avg_price = o[p].price), (o[p].volume *= 10)),
                /^(hy|gn|dy)\d+/.test(i.symbol) && (o[p].volume *= 100),
                utils_util.isCNK(i.symbol) && (o[p].volume *= 100),
                o[p].volume > 0 && (d += o[p].volume),
                o[p] &&
                  0 == o[p].price &&
                  (0 == p
                    ? (o[p].price = o[p].avg_price = i.prevclose)
                    : ((o[p].price = o[p - 1].price),
                      (o[p].avg_price = o[p - 1].price))),
                o[p].avg_price > 0 && (s = o[p].avg_price));
        return (
          o[0].price < 0 && (o[0].price = o[0].avg_price = d = 0),
          a || ((o[0].totalVolume = d), (o[0].totalAmount = d * s)),
          (o[0].index = i.index),
          (o[0].prevclose = i.prevclose),
          (o[0].symbol = i.symbol),
          (o[0].name = i.name),
          (o[0].today = i.today),
          (o[0].date = i.date),
          (o[0].lastfive = i.lastfive),
          o
        );
      },
      ctdf: function(a, r, i, s) {
        for (var o, l, c, d, p = [], m = r, u = 0, v = a.length; v > u; u++) {
          p[p.length] =
            0 == u && "" == a[0]
              ? tUtil.gltbt(1, i.prevclose)
              : _utils_util.xh5_S_KLC_D(a[u]);
          var h,
            b = 0;
          p[u].splice(120, 1);
          var f;
          for (
            utils_util.isRepos(i.symbol)
              ? ((f = 271), p[u].splice(f, p[u].length - f))
              : (f = 241),
              l = 0,
              c = f;
            c > l;
            l++
          )
            p[u][l] &&
              0 == p[u][l].price &&
              (0 == l
                ? (p[u][l].price = p[u][l].avg_price = p[u][l].prevclose)
                : ((p[u][l].price = p[u][l - 1].price),
                  (p[u][l].avg_price = p[u][l - 1].avg_price))),
              utils_util.isRepos(i.symbol) &&
                (p[u][l]
                  ? ((p[u][l].avg_price = p[u][l].price),
                    (p[u][l].volume *= 10))
                  : (p[u][l] = {
                      price: -0.01,
                      avg_price: -0.01,
                      volume: -0.01
                    })),
              (h = p[u][l].volume *= 0.01),
              /^(hy|gn|dy)\d+/.test(i.symbol) && (p[u][l].volume *= 100),
              utils_util.isCNK(i.symbol) && (p[u][l].volume *= 100),
              (b += h);
          (p[u][0].totalVolume = b),
            (p[u][0].prevclose = p[u][0].prevclose || p[u][0].price);
        }
        var f = p.length;
        for (
          f > 5 && p.splice(0, f - 5), o = [m], f = s.length, u = f - 2;
          u > f - 6;
          u--
        )
          for (l = 0, d = p.length; d > l; l++) {
            if (_utils_util.dateUtil.stbd(p[l][0].date, s[u])) {
              o.unshift(
                tUtil.azft(p[l], utils_util.isRepos(i.symbol) ? "REPO" : "CN")
              );
              break;
            }
            if (l == p.length - 1) {
              var g = o[0][0].prevclose;
              o.unshift(tUtil.gltbt(1, g)),
                (o[0][0].date = _utils_util.dateUtil.dd(s[u])),
                (o[0][0].prevclose = g);
            }
          }
        return o;
      },
      ctdb: function(t, a, r, i, s, o) {
        for (var l = a, c = [l], d = i.length, p = d - 2; p > d - 6; p--)
          c.unshift(
            "HF" == utils_util.market(r.symbol)
              ? tUtil.gltbt(1, r.prevclose, !1, s, [i[p]], o.time)
              : "NF" == utils_util.market(r.symbol)
              ? tUtil.gltbt(1, r.prevclose, !1, s, [i[p]], o.time)
              : "global_index" == utils_util.market(r.symbol)
              ? tUtil.gltbt(1, r.prevclose, !1, s, [i[p]], o.time)
              : tUtil.gltbt(1, r.prevclose, !1, s, [i[p]])
          );
        return c;
      },
      fund: function(e) {
        var t = [];
        if (e)
          for (
            var a = e.detail.split(","), r = 0, i = 0, n = a.length;
            n > i;
            i += 2
          ) {
            r += Number(a[i + 1]);
            var s = {
              p: Number(a[i + 1]),
              avp: Number(r / (i / 2 + 1)),
              m: a[i]
            };
            0 == i &&
              (s.prevclose = Number("09:30" == a[i] ? e.yes : a[i + 1])),
              t.push(s);
          }
        return t;
      },
      pkt: function(e, a, r, i, s) {
        if (typeof e.length < 1) return [];
        var o,
          l = !1,
          c = e,
          d = tUtil.s0(a.date.getHours()) + ":" + tUtil.s0(a.date.getMinutes());
        switch (r) {
          case "HF":
            (o = tUtil.gata(r, s.time)),
              c.length <= 0 &&
                c.push({
                  d: a.today,
                  price: a.price,
                  prevclose: a.prevclose
                }),
              c[0].d < a.today &&
                d > s.time[0][0] &&
                (d = s.time[s.time.length - 1][1]);
            break;
          case "NF":
            o = tUtil.gata(r, s.time);
            break;
          case "global_index":
            o = tUtil.gata(r, s.time);
            break;
          default:
            o = tUtil.gata(r);
        }
        for (var p, m = [], u = 0, v = 0, h = o.length; h > v; v++) {
          if (
            ((p = {}),
            (m[m.length] = p),
            (p.time = o[v]),
            (p.volume = p.price = -1),
            (p.avg_price = -1),
            d)
          ) {
            if (l && !i) continue;
            d == p.time && (l = !0);
          }
          for (var b = o[0], f = u, g = c.length; g > f; f++) {
            var _ = c[f],
              y = String(_.m).substring(0, 5);
            if (y == o[v]) {
              y == b &&
                ((p.symbol = a.symbol),
                (p.name = a.name),
                i
                  ? ((p.prevclose = Number(e[0].prevclose) || Number(e[0].p)),
                    (p.date = _utils_util.dateUtil.sd(e[0].d)),
                    (p.today = e[0].d))
                  : ((p.prevclose = a.prevclose),
                    "HF" == r || "NF" == r
                      ? ((p.date = _utils_util.dateUtil.sd(e[0].d) || a.date),
                        (p.today = e[0].d || a.today))
                      : ((p.date = a.date), (p.today = a.today))),
                "fund" == r && (p.prevclose = e[0].prevclose)),
                (p.volume = _.v || 0),
                (p.avg_price = _.avp),
                (p.price = _.p),
                _.iy && (p.holdPosition = _.iy),
                c.splice(f, 1);
              break;
            }
            y > o[v] ||
            ("global_index" == r && "00:00" == y && y < o[v]) ||
            ("NF" == r && "21:00" == b && p.time > "21:00" && y < o[v])
              ? (0 == v
                  ? i
                    ? ((p.price = e[0].p),
                      (p.prevclose = e[0].prevclose || p.price),
                      (p.avg_price = e[0].avp),
                      (p.date = _utils_util.dateUtil.sd(e[0].d)),
                      (p.today = e[0].d))
                    : ((p.price =
                        "US" === r || "HK" === r
                          ? a.prevclose
                          : a.open || a.prevclose),
                      (p.prevclose = a.prevclose),
                      (p.avg_price = p.price),
                      (p.symbol = a.symbol),
                      (p.name = a.name),
                      "NF" === r
                        ? ((p.date = _utils_util.dateUtil.sd(e[0].d) || a.date),
                          (p.today = e[0].d || a.today))
                        : ((p.date = a.date), (p.today = a.today)))
                  : ((p.price = m[v - 1].price),
                    (p.avg_price = m[v - 1].avg_price),
                    ("option_cn" == r || "op_m" == r || "NF" == r) &&
                      (p.holdPosition = m[v - 1].holdPosition)),
                (p.volume = -0.01))
              : 0 != v ||
                i ||
                ((p.price =
                  "US" == r
                    ? e[f].p || a.prevclose
                    : e[f].p || a.open || a.prevclose),
                (p.prevclose = a.prevclose),
                (p.avg_price = e[f].avp || p.price),
                (p.symbol = a.symbol),
                (p.name = a.name),
                (p.volume = 0),
                "HF" == r || "NF" == r
                  ? ((p.date = _utils_util.dateUtil.sd(e[0].d) || a.date),
                    (p.today = e[0].d || a.today))
                  : ((p.date = a.date), (p.today = a.today)));
          }
        }
        return (m[0].index = h - 1), m;
      }
    };
  return new (function() {
    this.VER = "2.8.0";
    var l = "http://finance.sina.com.cn/realstock/company/klc_td_sh.txt",
      c = {
        REPO: {
          T_Head_STR: "hq_str_ml_",
          T_EMI_URL: "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
          T_URL: "http://" + a + ".sinajs.cn/?_=$rn&list=$symbol",
          T5_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm_nhg.js?day=$rn",
          TRADING_DATES_URL: l,
          HISTORY_DATA_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
          LAST5_URL:
            "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn"
        },
        CN: {
          T_Head_STR: "hq_str_ml_",
          T_EMI_URL: "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
          T_URL: "http://" + a + ".sinajs.cn/?_=$rn&list=$symbol",
          T5_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm.js?day=$rn",
          TRADING_DATES_URL: l,
          HISTORY_DATA_URL:
            "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
          LAST5_URL:
            "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn"
        },
        option_cn: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
          T5_URL:
            "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getFiveDayLine?symbol=$symbol&random=$rn&callback=$cb=",
          TRADING_DATES_URL: l
        },
        op_m: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/futures/api/openapi.php/FutureOptionAllService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
          TRADING_DATES_URL: l
        },
        US: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb=/US_MinlineNService.getMinline?symbol=$symbol&day=1&random=$rn",
          T5_URL:
            "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinlineNService.getMinline?symbol=$symbol&day=5&random=$rn",
          TRADING_DATES_URL:
            "http://stock.finance.sina.com.cn/usstock/api/openapi.php/US_MinKService.getTradeDays?&start_day=$start&end_day=$end&callback=$cb="
        },
        HK: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/hkstock/api/openapi.php/HK_StockService.getHKMinline?symbol=$symbol&random=$rn&callback=$cb=",
          T5_URL:
            "http://quotes.sina.cn/hk/api/openapi.php/HK_MinlineService.getMinline?symbol=$symbol&day=5&callback=$cb=",
          LAST5_URL:
            "http://stock.finance.sina.com.cn/hkstock/api/jsonp_v2.php/$cb/HK_StockService.getStock5DayAvgVolume?symbol=$symbol",
          TRADING_DATES_URL: l
        },
        fund: {
          T_Head_STR: "t1",
          T_URL:
            "http://app.xincai.com/fund/api/jsonp.json/$cb=/XinCaiFundService.getFundYuCeNav?symbol=$symbol&___qn=3",
          TRADING_DATES_URL: l
        },
        global_index: {
          T_Head_STR: "t1",
          T_URL:
            "//stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb=/Global_IndexService.getTimeLine?symbol=$symbol",
          TRADING_DATES_URL: l
        },
        CFF: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
          T5_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
          TRADING_DATES_URL: l
        },
        OTC: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock.finance.sina.com.cn/thirdmarket/api/openapi.php/NQHQService.minline?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: l
        },
        NF: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
          T5_URL:
            "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
          TRADING_DATES_URL: l
        },
        HF: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFuturesMinLine?symbol=$symbol&callback=$cb=",
          T5_URL:
            "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFutures5MLine?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: l
        },
        GOODS: {
          T_Head_STR: "t1",
          T_URL:
            "http://stock2.finance.sina.com.cn/futures/api/openapi.php/SpotService.getMinLine?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: l
        },
        MSCI: {
          T_Head_STR: "t1",
          T_URL:
            "http://quotes.sina.cn/msci/api/openapi.php/MSCIService.getMinLine?symbol=$symbol&callback=$cb=",
          TRADING_DATES_URL: l
        },
        LSE: {
          T_Head_STR: "t1",
          T_URL:
            "http://quotes.sina.cn/lse/api/openapi.php/LSEService.minline?symbol=$symbol&type=1&callback=$cb=",
          TRADING_DATES_URL: l
        }
      },
      d = {},
      p = 0,
      m = function(t, a, r) {
        var i = utils_util.market(a),
          n = c[i][r];
        return (isHttps || t) && (n = utils_util.getSUrl(n)), n;
      },
      u = 0;
    this.get = function(config, callback) {
      var s,
        l,
        h,
        b = config.symbol,
        f = utils_util.market(b),
        g = config.date,
        _ = config.withT5,
        y = config.withI,
        k = config.ssl;
      u = config.dist5;
      var N = {
        msg: null,
        data: {
          td1: null,
          td5: null,
          hq: null
        }
      };
      switch (((h = s = b), f)) {
        case "HK":
          (b = "rt" == b.substring(0, 2) ? b.slice(3) : b),
            (s = b),
            (l = s.replace("hk", ""));
          break;
        case "US":
          (h +=
            1 === config.assisthq
              ? "," + b + ",gb_ixic,sys_time"
              : "," + b + ",sys_time"),
            (s = l = b.replace("gb_", "")),
            (l = l.replace("$", ".")),
            (s = s.replace(".", ""));
          break;
        case "OTC":
          l = b.replace("sb", "");
          break;
        case "fund":
          l = b.replace("fu_", "");
          break;
        case "CFF":
          l = b.replace("CFF_RE_", "");
          break;
        case "CN":
        case "REPO":
          l = "ml_" + b;
          break;
        case "global_index":
          l = b.replace("znb_", "");
          break;
        case "op_m":
          l = s = b.replace("P_OP_", "");
          break;
        case "HF":
          l = b.replace("hf_", "");
          break;
        case "GOODS":
          l = b.replace("gds_", "");
          break;
        case "MSCI":
          l = b.replace("msci_", "");
          break;
        case "NF":
          l = b.replace("nf_", "");
          break;
        case "LSE":
          (s = l = b.replace("lse_", "")),
            (l = l.replace("$", ".")),
            (s = s.replace(/\W/g, ""));
          break;
        default:
          l = b;
      }
      var R = function(e) {
          var t, a, r;
          return g
            ? ((r = g.split("-")[1] || "01"),
              (a = g.split("-")[0]),
              g.split("-")[1] &&
                Number(g.split("-")[1]) < 10 &&
                ((r = "0" + Number(g.split("-")[1])),
                (g = a + "-" + r + "-" + g.split("-")[2])),
              (t = "MLC_" + b + "_" + a + "_" + r),
              {
                lc: t,
                year: a,
                month: r
              })
            : ((g = e), null);
        },
        T = function(a) {
          load(
            m(k, b, "HISTORY_DATA_URL")
              .replace("$symbol", b)
              .replace("$y", a.year)
              .replace("$m", a.month)
              .replace("$date", g),
            function() {
              var s = String(window[a.lc]);
              if (((window[a.lc] = null), (N.msg = "history"), s)) {
                for (
                  var l,
                    c,
                    p,
                    u,
                    v = String(s).split(","),
                    h = [],
                    _ = v.length,
                    y = tUtil.gata(f),
                    R = 0;
                  _ > R;
                  R++
                ) {
                  (h[R] = _utils_util.xh5_S_KLC_D(v[R])),
                    (l = h[R].shift()),
                    (h[R][0].prevclose = l.prevclose),
                    (h[R][0].date = l.date),
                    h[R].splice(120, 1),
                    (c = 0);
                  for (var T = 0; 241 > T; T++)
                    (p = utils_util.isCNK(b)
                      ? h[R][T].volume
                      : (h[R][T].volume /= 100)),
                      (c += p),
                      (h[R][T].time = y[T]);
                  var U = _utils_util.dateUtil.ds(l.date);
                  U == g && (u = h[R]), (h[R][0].totalVolume = c);
                }
                if (h.length < 5)
                  return void load(
                    m(k, b, "TRADING_DATES_URL"),
                    function() {
                      for (
                        var e = window.datelist,
                          r = h.length,
                          s = o.gdf(e, _utils_util.dateUtil.sd(g)),
                          l = 5 - r;
                        l > 0;
                        l--
                      )
                        h.unshift(
                          tUtil.gltbt(1, h[0][0].price, !1, f, [
                            s[s.length - 5 + l]
                          ])
                        );
                      (N.data.td1 = u),
                        (N.data.td5 = h),
                        (d[b + a.year + a.month] = N),
                        _utils_util.isFunc(callback) && callback(N);
                    },
                    null,
                    {
                      symbol: b,
                      market: f,
                      type: "tradedate"
                    }
                  );
                (N.data.td1 = u),
                  (N.data.td5 = h),
                  (d[b + a.year + a.month] = N),
                  _utils_util.isFunc(callback) && callback(N);
              }
            },
            function() {
              (N.msg = "nohistory"), _utils_util.isFunc(callback) && callback(N);
            },
            {
              market: f,
              symbol: b,
              type: "historydata"
            }
          );
        },
        U = function(e) {
          return d[b + e.year + e.month]
            ? void (_utils_util.isFunc(callback) && callback(d[b + e.year + e.month]))
            : void T(e);
        },
        S = function(e, t, a) {
          var r;
          switch (f) {
            case "OTC":
              r = o.otc(e.result.data, t, f);
              break;
            case "US":
              r = o.us(String(e), t);
              break;
            case "HK":
              r = o.hk(e.result.data, t, f);
              break;
            case "fund":
              r = o.fund(e);
              break;
            case "CFF":
              r = o.futures(e, t);
              break;
            case "global_index":
              r = o.gbIndex(e, t, f, !1, a);
              break;
            case "NF":
              r = o.futures(e, t, f, !1, a);
              break;
            case "GOODS":
              r = o.goods(e.result.data, t, f, !1, [
                ["20:00", "23:59"],
                ["00:00", "02:29"],
                ["09:00", "15:30"]
              ]);
              break;
            case "MSCI":
              r = o.msci(e.result.data, t, f, !1, [
                ["07:00", "23:59"],
                ["00:00", "06:00"]
              ]);
              break;
            case "option_cn":
              r = o.optionCn(e.result.data, t, "CN");
              break;
            case "op_m":
              r = o.opm(e.result.data, t, "CN");
              break;
            case "LSE":
              r = o.lse(e.result.data, t, f, !1);
              break;
            case "CN":
            case "REPO":
              r = o.db(e);
              break;
            case "HF":
              r = o.hf(e.result.data.minLine_1d, t, f, !1, a);
          }
          if ("CN" == f || "REPO" == f) r = o.fB(r, !1, f, t);
          else if ("NF" === f || "HF" === f || "GOODS" === f || "MSCI" === f);
          else {
            r = o.pkt(r, t, f, !1, a);
            var i = t.time;
            "HK" == f &&
              i > "15:59" &&
              (i > "16:09" && (i = "16:09"),
              (r[r.length - 1].price = t.price),
              (r[r.length - 1].avg_price = r[r.length - 2].avg_price),
              (r[r.length - 1].time = i),
              (r[r.length - 1].volume = 0),
              r[r.length - 1].avg_price < 0 &&
                (r[r.length - 1].avg_price = t.price));
          }
          return r;
        },
        $ = function(n, c, d) {
          var p,
            u = 3;
          if (p && p.length > 600)
            tradeDatesUrlcallback(n, b, c, p, callback, config.dataformatter, k);
          else if ((u--, u > 0))
            if ("US" == f) {
              var g = utils_util.dateUtil.ds(
                new Date(
                  n.date.getFullYear(),
                  n.date.getMonth() - 2,
                  n.date.getDate()
                ),
                "-"
              );
              load(
                m(k, h, "TRADING_DATES_URL")
                  .replace("$start", g)
                  .replace("$end", n.today)
                  .replace("$cb", "var usHistorydate"),
                function() {
                  for (
                    var r = window.usHistorydate.result.data, d = r.length;
                    d--;

                  )
                    r[d] = utils_util.dateUtil.sd(r[d]);
                  r.length > 0 &&
                    !_utils_util.dateUtil.stbd(r[r.length - 1], n.date) &&
                    r.push(n.date),
                    (p = o.gdf(r, n.date, !0)),
                    tradeDatesUrlcallback(n, b, c, p, f, callback, config.dataformatter, k, s, l);
                },
                null,
                {
                  symbol: n.symbol,
                  market: f,
                  type: "tradedate"
                }
              );
            } else
              load(
                m(k, b, "TRADING_DATES_URL"),
                function() {
                  var datelist = window.datelist;
                  (p = o.gdf(datelist, n.date)),
                    tradeDatesUrlcallback(
                      n,
                      b,
                      c,
                      p,
                      f,
                      callback,
                      config.dataformatter,
                      k,
                      null,
                      null,
                      d
                    );
                },
                null,
                {
                  symbol: n.symbol,
                  market: f,
                  type: "tradedate"
                }
              );
          else null();
        },
        D = function(e, a) {
          load(
            e,
            function() {
              var e = window[c[f].T_Head_STR + s];
              window[c[f].T_Head_STR + s] = null;
              var r,
                o = window["kke_future_" + a.symbol] || {
                  time: [["06:00", "23:59"], ["00:00", "05:00"]]
                },
                l = window["kke_future_" + a.symbol] || {
                  time: [["09:30", "11:29"], ["13:00", "02:59"]]
                },
                d = window["kke_global_index_" + a.symbol] || {
                  time: [["09:30", "11:29"], ["13:00", "02:59"]]
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
                switch (((N.msg = "empty"), f)) {
                  case "HF":
                    r = tUtil.gltbt(1, a.prevclose, !0, f, [a.date], o.time);
                    break;
                  case "NF":
                    r = tUtil.gltbt(1, a.prevclose, !0, f, [a.date], l.time);
                    break;
                  case "global_index":
                    r = tUtil.gltbt(1, a.prevclose, !0, f, [a.date], d.time);
                    break;
                  default:
                    r = tUtil.gltbt(1, a.prevclose, !0, f);
                }
              else
                switch (((N.msg = ""), f)) {
                  case "HF":
                    var m = a.today.split("-"),
                      u =
                        m[0] +
                        "-" +
                        (Number(m[1]) < 10 ? "0" + m[1] : m[1]) +
                        "-" +
                        (Number(m[2]) < 10 ? "0" + m[2] : m[2]);
                    (r =
                      u < e.result.data.minLine_1d[0][0]
                        ? tUtil.gltbt(1, a.prevclose, !0, f, null, o.time)
                        : S(e, a, o)),
                      "hf_ES" == a.symbol &&
                        a.time > o.time[0][0] &&
                        !_utils_util.dateUtil.stbd(r[0].date, a.date) &&
                        (r = tUtil.gltbt(1, a.prevclose, !0, f, [a.date], o.time));
                    break;
                  case "NF":
                    r = S(e, a, l);
                    break;
                  case "global_index":
                    r = S(e, a, d);
                    break;
                  default:
                    r = S(e, a);
                }
              if (
                (r && !r[0].date && (r[0].date = a.date), (N.data.td1 = r), !_)
              )
                return (
                  0 != p && (r[0].lastfive = p),
                  void (_utils_util.isFunc(callback) && callback(N))
                );
              switch (f) {
                case "HF":
                  $(a, r, o);
                  break;
                case "NF":
                  $(a, r, l);
                  break;
                case "global_index":
                  $(a, r, d);
                  break;
                default:
                  $(a, r);
              }
            },
            function() {},
            {
              market: f,
              symbol: a.symbol,
              type: "t1"
            }
          );
        },
        L = function() {
          "LSE" === f && (h = utils_util.strUtil.replaceStr(h)),
            KKE.api(
              "datas.hq.get",
              {
                symbol: h,
                withI: y,
                cancelEtag: !0,
                ssl: k
              },
              function(e) {
                var a = e.data[0];
                if (
                  ((N.data.hq = a),
                  a.name || (a.name = h),
                  !a.name && "CFF" != f)
                )
                  return (
                    (N.msg = "error"), void (_utils_util.isFunc(callback) && callback(N))
                  );
                var r = m(k, b, "T_URL")
                    .replace("$rn", new Date().getTime())
                    .replace("$symbol", l)
                    .replace("$cb", "var t1" + s),
                  n = R(a.today);
                return "CN" != f ||
                  _utils_util.dateUtil.stbd(_utils_util.dateUtil.sd(a.today), _utils_util.dateUtil.sd(g))
                  ? void D(r, a)
                  : void U(n);
              }
            );
        };
      L();
    };
    var tradeDatesUrlcallback = function(hqObj, papercode, timeDatasArr, dateArr, marketCode, callback, dataformatter, h, b, f, g) {
      var dataObj = {
        msg: null,
        data: {
          td1: null,
          td5: null,
          hq: null
        }
      };
      if (
        ((dataObj.data.hq = hqObj),
        (dataObj.data.td1 = timeDatasArr),
        hqObj.name || (hqObj.name = hqObj.symbol),
        !hqObj.name && "CFF" != marketCode)
      )
        return (dataObj.msg = "error"), void (_utils_util.isFunc(callback) && callback(dataObj));
      var y = function() {
          var u,
            v = papercode.replace("hk", "");
          load(
            m(h, papercode, "T5_URL")
              .replace("$symbol", v)
              .replace("$cb", "var __hkT5"),
            function() {
              var v = window.__hkT5,
                b = v.result.data;
              b && b.length > 0
                ? (b.forEach(function(e, t) {
                    var a = 0;
                    if (
                      (e.forEach(function(t, a) {
                        "12:00:00" == t.m && e.splice(a, 1);
                      }),
                      e.forEach(function(e, t) {
                        var r = e.m.split(":");
                        e.date && ((e.today = e.date), (e.date = dateUtil.sd(e.date))),
                          e.prevclose && (e.prevclose = Number(e.prevclose)),
                          (e.time = r[0] + ":" + r[1]),
                          (e.price = Number(e.price)),
                          (e.volume = Number(e.volume)),
                          (a += Number(e.price)),
                          (e.avg_price = Number(a) / (t + 1));
                      }),
                      4 > t && e.length < 331)
                    )
                      for (
                        var r = 0,
                          s = e.length,
                          o = tUtil.gthk(),
                          l = 0,
                          c = o.length;
                        c > l;
                        l++
                      ) {
                        for (var d = o[l], p = r; s > p; p++) {
                          var m = e[p].time.substring(0, 5);
                          if (d === m) {
                            r++;
                            break;
                          }
                          if (0 !== l) {
                            var u = {
                              avg_price: e[l].avg_price,
                              m: o[r] + ":00",
                              time: o[r],
                              price: e[l].price,
                              volume: 0
                            };
                            e.push(u);
                          }
                        }
                        if (c > r && r >= e.length) {
                          var v = {
                            avg_price: e[l].avg_price,
                            m: o[r] + ":00",
                            time: o[r],
                            price: e[l].price,
                            volume: 0
                          };
                          e.push(v), r++;
                        }
                      }
                  }),
                  b.length <= 4
                    ? ((u = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode)),
                      u.forEach(function(e) {
                        b.forEach(function(t) {
                          e[0].date == t[0].date && (e = t);
                        });
                      }),
                      (dataObj.data.td5 = u))
                    : (dateUtil.stbd(b[b.length - 2][0].date, timeDatasArr[0].date) &&
                        ((timeDatasArr[0].today = b[b.length - 1][0].today),
                        (timeDatasArr[0].date = b[b.length - 1][0].date)),
                      (b[b.length - 1] = timeDatasArr),
                      (dataObj.data.td5 = b)))
                : ((u = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode)), (dataObj.data.td5 = u));
              var f = "lastfive" + papercode,
                g = papercode.substring(2);
              load(
                m(h, papercode, "LAST5_URL")
                  .replace("$rn", new Date().getHours())
                  .replace("$symbol", g)
                  .replace("$cb", "var " + f + "="),
                function() {
                  var e = window[f];
                  return e
                    ? ((dataObj.data.td5[4][0].lastfive = p = Number(e.volume)),
                      void (_utils_util.isFunc(callback) && callback(dataObj)))
                    : void (_utils_util.isFunc(callback) && callback(dataObj));
                },
                function() {
                  (dataObj.data.td5 = u), _utils_util.isFunc(callback) && callback(dataObj);
                },
                {
                  symbol: hqObj.symbol,
                  market: marketCode,
                  type: "lastfive"
                }
              );
            }
          );
        },
        k = function() {
          load(
            m(h, papercode, "T5_URL")
              .replace("$rn", new Date().getTime())
              .replace("$symbol", f)
              .replace("$cb", "var t5" + b + "="),
            function() {
              var r = String(window["t5" + b]),
                i = [],
                p = r.split(" ");
              p.shift();
              for (var m = p.length; m--; ) {
                var u = o.us(p[m], hqObj, !0);
                p[m] = o.pkt(u, hqObj, marketCode, !0);
              }
              if (((window["t5" + papercode] = null), "" == r)) dataObj.msg = "empty";
              else {
                dataObj.msg = "";
                var v = dateArr.length,
                  h = 0,
                  f = p.length,
                  g = [];
                for (m = v - 1; m > v - 6; m--)
                  g.unshift(tUtil.gltbt(1, hqObj.prevclose, !1, "US", [dateArr[m]]));
                for (m = v - 1; m > v - 6; m--) {
                  for (var y, k = 0, N = 0; f > N; N++)
                    _utils_util.dateUtil.stbd(dateArr[m], p[N][0].date) &&
                      ((y = p[N]), (k = 1), (h = N));
                  0 == k &&
                    (y = tUtil.gltbt(1, g[h][0].prevclose, !1, "US", [dateArr[m]])),
                    i.unshift(y);
                }
              }
              (i[4] = timeDatasArr), (dataObj.data.td5 = i), _utils_util.isFunc(callback) && callback(dataObj);
            },
            null,
            {
              market: marketCode,
              symbol: hqObj.symbol,
              type: "t5"
            }
          );
        },
        N = function(i) {
          var n = "CFF_RE_" == papercode.substring(0, 7) ? papercode.slice(7) : papercode;
          load(
            m(h, papercode, "T5_URL")
              .replace("$rn", new Date().getTime())
              .replace("$symbol", n)
              .replace("$cb", "var t5" + papercode),
            function() {
              var r = window["t5" + papercode],
                n = [];
              if (((window["t5" + papercode] = null), "" == r)) dataObj.msg = "empty";
              else {
                if (void 0 == r) return (dataObj.msg = "data error."), void R();
                dataObj.msg = "";
                for (var l = [], p = r.length, m = 0; p > m; m++) {
                  var u = o.futures(r[m], hqObj, marketCode, "his", i);
                  if (!_utils_util.dateUtil.stbd(_utils_util.dateUtil.sd(u[0].d), hqObj.date)) {
                    var v = o.pkt(u, hqObj, marketCode, !0);
                    l.push(v), n.push(v);
                  }
                }
              }
              (n[4] = timeDatasArr), (dataObj.data.td5 = n), _utils_util.isFunc(callback) && callback(dataObj);
            },
            null,
            {
              market: marketCode,
              symbol: hqObj.symbol,
              type: "t5"
            }
          );
        },
        R = function(a) {
          (dataObj.data.td5 = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode, a)), _utils_util.isFunc(callback) && callback(dataObj);
        },
        T = function(i) {
          load(
            m(h, papercode, "T5_URL")
              .replace("$symbol", papercode.replace("nf_", ""))
              .replace("$cb", "var t5" + papercode),
            function() {
              var r = window["t5" + papercode],
                n = [];
              if (((window["t5" + papercode] = null), "" == r))
                return (dataObj.msg = "empty"), void R(i);
              if (void 0 == r) return (dataObj.msg = "data error."), void R(i);
              dataObj.msg = "";
              var o = __RepairData({
                hq: hqObj,
                market: marketCode,
                timeRange: i.time,
                td5: r
              });
              for (
                n = o.td5,
                  n.forEach(function(e) {
                    (e[0].today = e[0].date),
                      (e[0].date = _utils_util.dateUtil.sd(e[0].date));
                  });
                n.length > 5;

              )
                n.shift();
              timeDatasArr[0].today !== n[4][0].today
                ? (n.length >= 5 && n.shift(), n.push(timeDatasArr))
                : (n[4] = timeDatasArr),
                (dataObj.data.td5 = n),
                _utils_util.isFunc(callback) && callback(dataObj);
            },
            null,
            {
              market: marketCode,
              symbol: hqObj.symbol,
              type: "t5"
            }
          );
        },
        U = function(i) {
          load(
            m(h, papercode, "T5_URL")
              .replace("$symbol", papercode.replace("hf_", ""))
              .replace("$cb", "var t5" + papercode),
            function() {
              var r = window["t5" + papercode],
                l = [];
              if (((window["t5" + papercode] = null), "" == r)) dataObj.msg = "empty";
              else {
                if (void 0 == r) return (dataObj.msg = "data error."), void R();
                dataObj.msg = "";
                for (
                  var p = [],
                    m = r.result.data[papercode.replace("hf_", "")].length,
                    u = 0;
                  m > u;
                  u++
                ) {
                  var v = o.hf(
                    r.result.data[papercode.replace("hf_", "")][u],
                    hqObj,
                    marketCode,
                    "his",
                    i
                  );
                  if (!_utils_util.dateUtil.stbd(_utils_util.dateUtil.sd(v[0].d), hqObj.date)) {
                    var h = o.pkt(v, hqObj, marketCode, !0, i);
                    p.push(h);
                  }
                }
                for (
                  var b = [], f = timeDatasArr[0].date || hqObj.date, g = 1;
                  b.length < 6;

                ) {
                  var y = new Date(f);
                  y.setDate(f.getDate() - g),
                    6 != y.getDay() && 0 != y.getDay() && b.push(y),
                    g++;
                }
                var k,
                  N = b.length,
                  T = 1;
                for (u = 0; N > u; u++) {
                  for (k = T; k <= p.length && !(l.length > 3); k++) {
                    if (_utils_util.dateUtil.stbd(p[p.length - k][0].date, b[u])) {
                      l.unshift(p[p.length - k]), T++;
                      break;
                    }
                    if (k == p.length - 1) {
                      for (var U = 0, S = 1; S <= p.length; S++)
                        _utils_util.dateUtil.stbd(p[p.length - S][0].date, b[u]) &&
                          (U = 1);
                      0 == U &&
                        l.unshift(
                          tUtil.gltbt(
                            1,
                            p[p.length - 1][0].prevclose,
                            !1,
                            marketCode,
                            [b[u]],
                            i.time
                          )
                        );
                    }
                  }
                  T >= p.length &&
                    l.length <= 3 &&
                    !_utils_util.dateUtil.stbd(l[0][0].date, b[u]) &&
                    l.unshift(
                      tUtil.gltbt(
                        1,
                        p[p.length - 1][0].prevclose,
                        !1,
                        marketCode,
                        [b[u]],
                        i.time
                      )
                    );
                }
              }
              (l[4] = timeDatasArr), (dataObj.data.td5 = l), _utils_util.isFunc(callback) && callback(dataObj);
            },
            null,
            {
              market: marketCode,
              symbol: hqObj.symbol,
              type: "t5"
            }
          );
        },
        S = function() {
          load(
            m(h, papercode, "T5_URL")
              .replace("$rn", new Date().getTime())
              .replace("$symbol", papercode)
              .replace("$cb", "var t5" + papercode),
            function() {
              var r = window["t5" + papercode],
                i = dateArr.length,
                c = [];
              if (((window["t5" + papercode] = null), "" == r)) dataObj.msg = "empty";
              else {
                dataObj.msg = "";
                for (var p = r.result.data.length, m = 0; p > m; m++) {
                  var u = o.optionCn(r.result.data[m], hqObj, "CN"),
                    v = o.pkt(u, hqObj, "CN", !0);
                  c.push(v);
                }
                var h = c[0] ? c[0][0].prevclose : hqObj.prevclose;
                for (m = i - 1 - p; m > i - 6; m--)
                  c.unshift(tUtil.gltbt(1, h, !1, "CN", [dateArr[m]]));
              }
              (c[4] = timeDatasArr), (dataObj.data.td5 = c), _utils_util.isFunc(callback) && callback(dataObj);
            },
            null,
            {
              market: marketCode,
              symbol: hqObj.symbol,
              type: "t5"
            }
          );
        },
        $ = function() {
          load(
            m(h, papercode, "T5_URL")
              .replace("$symbol", papercode)
              .replace("$rn", hqObj.today),
            function() {
              var i = "lastfive" + papercode,
                n = window["KLC_ML_" + papercode];
              window["KLC_ML_" + papercode] = null;
              var u, v;
              "" == n
                ? ((dataObj.msg = "empty"), (u = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode)))
                : ((dataObj.msg = ""), (v = n.split(",")), (u = o.ctdf(v, timeDatasArr, hqObj, dateArr))),
                o.isBond(papercode)
                  ? ((dataObj.data.td5 = u), _utils_util.isFunc(callback) && callback(dataObj))
                  : load(
                      m(h, papercode, "LAST5_URL")
                        .replace("$rn", new Date().getHours())
                        .replace("$symbol", papercode),
                      function() {
                        var a = window[i];
                        if (!a || !a.lastfive)
                          return (dataObj.data.td5 = u), void (_utils_util.isFunc(callback) && callback(dataObj));
                        for (var r = a.lastfive.length; r--; )
                          for (var n = a.lastfive[r].d, s = u.length - 1; s--; )
                            if (_utils_util.dateUtil.stbds(u[s][0].date, n, null)) {
                              u[s][0].lastfive = Number(a.lastfive[r].c);
                              break;
                            }
                        (p = hqObj.lastfive ? hqObj.lastfive : 0),
                          (dataObj.data.td5 = u),
                          _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      function() {
                        (dataObj.data.td5 = u), _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      {
                        market: marketCode,
                        symbol: hqObj.symbol,
                        type: "lastfive"
                      }
                    );
            },
            function() {
              (dataObj.data.td5 = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode)),
                (dataObj.msg = "error"),
                _utils_util.isFunc(callback) && callback(dataObj);
            },
            {
              market: marketCode,
              symbol: hqObj.symbol,
              type: "t5"
            }
          );
        };
      switch (marketCode) {
        case "HK":
          y();
          break;
        case "US":
          k();
          break;
        case "CFF":
          N(g);
          break;
        case "OTC":
        case "fund":
          R();
          break;
        case "LSE":
          R();
          break;
        case "NF":
          0 == u ? R(g) : T(g);
          break;
        case "option_cn":
          S();
          break;
        case "global_index":
          R(g);
          break;
        case "op_m":
        case "GOODS":
        case "MSCI":
          R();
          break;
        case "CN":
        case "REPO":
          $();
          break;
        case "HF":
          0 == u ? R(g) : U(g);
          break;
        case "":
      }
    };
  })();
});
xh5_define(
  "chart.h5t",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(cfgs_settinger, utils_util, utils_painter) {
    "use strict";
    function chart_h5t(config) {
      console.log("hello");
      function chart_h51(e, a) {
        function onViewChange(e) {
          $.setDataRange(e),
            whatis1 && (whatis1.linkData(e), whatis1.setDataRange()),
            k && (k.linkData(e), k.setDataRange()),
            D && (D.linkData(e), D.setDataRange());
        }
        function c() {
          a && (j = tDb),
            me.update(null, !0),
            "CN" === marketCode && !/^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol);
        }
        e = utils_util_oc(
          {
            symbol: void 0,
            datas: {
              t1: {
                url: void 0,
                dataformatter: void 0
              },
              t5: {
                url: void 0,
                dataformatter: void 0
              }
            },
            linecolor: void 0,
            linetype: void 0
          },
          e || {}
        );
        console.log('stockData');
        console.log(this);
        var d,
          stockData = this,
          marketCode = utils_util.market(e.symbol),
          marketCodeToID = function(e) {
            switch (e) {
              case "CN":
                return 1;
              case "HK":
                return 2;
              case "US":
                return 3;
            }
            return 1;
          };
        (this.business = e.business), (this.simple = e.simple);
        var y = !0;
        (this.dp = e.dp),
          (this.marketNum = marketCodeToID),
          (this.isErr = !1),
          (this.witht5 = !0),
          (this.symbol = e.symbol),
          (this.isMain = a),
          (this.isCompare = !1),
          (this.dAdd = 0),
          (this.uid = e.symbol + Math.random()),
          (this.datas = null),
          (this.dataLen = 0),
          (this.dataLenOffset = 0),
          (this.prevclose = void 0),
          (this.labelMaxP = 0),
          (this.maxPrice = 0),
          (this.labelMinP = Number.MAX_VALUE),
          (this.minPrice = Number.MAX_VALUE),
          (this.labelMaxVol = 0),
          (this.maxVolume = 0),
          (this.minPercent = Number.MAX_VALUE),
          (this.maxPercent = -Number.MAX_VALUE),
          (this.labelPriceCount = void 0),
          (this.isTotalRedraw = !0),
          (this.realLen = 0),
          (this.nfloat = 0 === config.nfloat ? config.nfloat : config.nfloat || 2),
          (this.ennfloat = config.ennfloat),
          (this.market = marketCode),
          (this.date = null),
          (this.hq = null),
          (this.futureTime = x || w || T),
          (this.gbiTime = T),
          (this.preData = {
            data: 0,
            vPos: null
          }),
          (this.needMarket = marketCode),
          (this.changeMarket = function(e) {
            var a,
              i = [],
              r = e;
            if (((H = A.tcd(I)), marketCodeToID(stockData.needMarket) != marketCodeToID(I))) {
              (a = tDb.get()), (d = utils_util.tUtil.gata(I));
              for (var n = 0; n < a.length; n++)
                marketCodeToID(stockData.needMarket) < marketCodeToID(I)
                  ? (i.push(A.aduk(a[n], stockData.market, I, curDate, a[n][0].date)),
                    (stockData.realLen = utils_util.arrIndexOf(
                      d,
                      curDate.getHours() +
                        ":" +
                        utils_util.strUtil.zp(curDate.getMinutes())
                    )),
                    stockData.realLen < 0 && (stockData.realLen = H))
                  : (i.push(A.rmuk(a[n], I, r)),
                    (stockData.realLen = utils_util.arrIndexOf(
                      d,
                      curDate.getHours() +
                        ":" +
                        utils_util.strUtil.zp(curDate.getMinutes())
                    )));
              (stockData.needMarket = I),
                tDb.initTState(i),
                (stockData.datas = i[4]),
                $.setDataRange(),
                $.createPlayingData();
            }
          });
        var whatis1,
          k,
          D,
          L,
          curDate,
          P = new S(this, e);
        (this.getName = function() {
          return L || "";
        }),
          (this.getStockType = function() {
            var e;
            return stockData.hq && (e = stockData.hq.type), e || "";
          }),
          (this.viewState = ee);
        var tDb = new (function() {
            var a = {},
              r = {
                rsAmount: void 0
              },
              n = function(e) {
                if (e) {
                  var r,
                    n = e.length,
                    o = [];
                  if ((utils_util.clone(e, o), o.length > 5)) {
                    if (config.date) {
                      for (
                        var s,
                          l = Number(config.date.split("-")[2]),
                          c = 0,
                          d = 0,
                          m = 0,
                          p = o.length;
                        p > m;
                        m++
                      )
                        (s = o[m][0].date.getDate()),
                          0 == m
                            ? (c = Math.abs(s - l))
                            : c > Math.abs(s - l) &&
                              ((c = Math.abs(s - l)), (d = m));
                      d >= 5
                        ? ((r = o.splice(d - 4, 5)),
                          (ee.start = 4),
                          (ee.end = 5))
                        : ((r = o.splice(0, 5)),
                          (ee.start = d),
                          (ee.end = d + 1)),
                        (a.tv = ee.start),
                        (a.tb = ee.end);
                    }
                  } else (r = o), (a.tv = config.date ? 0 : 4), (a.tb = n);
                  a.t = r;
                }
              };
            (this.get = function(e) {
              return e ? a[e] : a.t;
            }),
              (this.set = function(e, t) {
                "undefined" != typeof a[e] && (a[e] = t);
              }),
              (this.initState = n),
              (this.initTState = function(e) {
                n(e);
              }),
              (this.extraDataObj = r),
              (this.initExtraData = function() {
                var a = config.ssl ? "https" : "http",
                  n =
                    a +
                    "://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol",
                  o = "KKE_ShareAmount_" + e.symbol;
                utils_util.load(
                  n
                    .replace("$symbol", e.symbol)
                    .replace("$rn", String(new Date().getDate()))
                    .replace("$cb", "var%20" + o + "="),
                  function() {
                    var e = window[o];
                    if (e) {
                      for (var t, a = [], i = e.length; i--; )
                        (t = e[i]),
                          a.push({
                            amount: Number(t.amount),
                            date: dateUtil.sd(t.date)
                          });
                      a.length && (r.rsAmount = a);
                    }
                  }
                );
              }),
              (this.gc = function() {
                (a = null), (r = null);
              });
          })(),
          $ = new (function() {
            var e, t, createPlayingData;
            (e = function() {
              (stockData.minPrice = Number.MAX_VALUE),
                (stockData.maxPrice = 0),
                (stockData.minPercent = Number.MAX_VALUE),
                (stockData.maxPercent = -Number.MAX_VALUE),
                (stockData.minavgPrice = Number.MAX_VALUE),
                (stockData.maxavgPrice = 0),
                (stockData.maxVolume = 0);
            }),
              (t = function() {
                function e(e) {
                  var t = Math.max(
                      Math.abs(e - stockData.maxPrice),
                      Math.abs(e - stockData.minPrice)
                    ),
                    a = Math.max(
                      Math.abs(e - stockData.maxavgPrice),
                      Math.abs(e - stockData.minavgPrice)
                    );
                  switch (
                    (t / e > 0.45 && "US" != I && (cfg.datas.scaleType = "price"),
                    t / e > 0.1 &&
                      "newstock" == cfg.datas.scaleType &&
                      (cfg.datas.scaleType = "price"),
                    cfg.datas.scaleType)
                  ) {
                    case "newstock":
                      (stockData.minPrice = Number(e) - 0.45 * e),
                        (stockData.maxPrice = Number(e) + 0.45 * e);
                      break;
                    case "tpct":
                      (stockData.minPrice =
                        stockData.minPrice < Number(e) - 0.1 * e
                          ? stockData.minPrice
                          : Number(e) - 0.1 * e),
                        (stockData.maxPrice =
                          stockData.maxPrice > Number(e) + 0.1 * e
                            ? stockData.maxPrice
                            : Number(e) + 0.1 * e);
                      break;
                    case "pct":
                      var i = stockData.maxPrice - stockData.minPrice;
                      (stockData.minPrice -= 0.05 * i), (stockData.maxPrice += 0.05 * i);
                      break;
                    case "price":
                    default:
                      (stockData.minPrice = Number(e) - Number(t)),
                        (stockData.maxPrice = Number(e) + Number(t)),
                        (stockData.minavgPrice = Number(e) - Number(a)),
                        (stockData.maxavgPrice = Number(e) + Number(a));
                  }
                  (stockData.maxPercent = Math.max((stockData.maxPrice - e) / e, 0)),
                    (stockData.minPercent = Math.min((stockData.minPrice - e) / e, 0)),
                    (stockData.maxavgPercent = Math.max((stockData.maxavgPrice - e) / e, 0)),
                    (stockData.minavgPercent = Math.min((stockData.minavgPrice - e) / e, 0));
                }
                (stockData.isCompare = X.getAllStock().length > 1), (stockData.dAdd = X.dAdd);
                var t;
                stockData.datas &&
                  0 == stockData.datas[0][0].volume &&
                  stockData.hq.time > "09:30" &&
                  "CN" == stockData.market &&
                  (t = stockData.datas[0][0].price),
                  (stockData.preData.data = stockData.hq.preopen
                    ? t
                      ? t
                      : stockData.hq.preopen
                    : stockData.preData.data);
                for (var a = 0, r = stockData.datas.length; r > a; a++) {
                  for (
                    var n,
                      o = Number(stockData.datas[0][0].prevclose),
                      s = 0,
                      l = stockData.dataLen;
                    l > s;
                    s++
                  ) {
                    if (
                      ((n = stockData.datas[a][s]),
                      "LSE" === stockData.market || "MSCI" === stockData.market)
                    ) {
                      if (n.price <= 0) continue;
                    } else if (n.price <= 0 || n.avg_price <= 0) continue;
                    ("HK" == stockData.market && stockData.hq && "indx" == stockData.hq.type) ||
                    "LSE" == stockData.market ||
                    "MSCI" === stockData.market
                      ? ((stockData.maxPrice = Math.max(stockData.maxPrice, n.price, o)),
                        (stockData.minPrice = Math.min(stockData.minPrice, n.price, o)))
                      : stbd(stockData.datas[a][0].date, stockData.hq.date) && "CN" == stockData.market
                      ? ((stockData.maxPrice = Math.max(
                          stockData.maxPrice,
                          n.price,
                          n.avg_price,
                          o,
                          stockData.preData.data
                        )),
                        (stockData.minPrice = Math.min(
                          stockData.minPrice,
                          n.price,
                          n.avg_price,
                          o,
                          stockData.preData.data
                        )))
                      : ((stockData.maxPrice = Math.max(
                          stockData.maxPrice,
                          n.price,
                          n.avg_price,
                          o
                        )),
                        (stockData.minPrice = Math.min(
                          stockData.minPrice,
                          n.price,
                          n.avg_price,
                          o
                        ))),
                      stbd(stockData.datas[a][0].date, stockData.hq.date) && "CN" == stockData.market
                        ? ((stockData.maxavgPrice = Math.max(
                            stockData.maxavgPrice,
                            n.price,
                            o,
                            stockData.preData.data
                          )),
                          (stockData.minavgPrice = Math.min(
                            stockData.minavgPrice,
                            n.price,
                            o,
                            stockData.preData.data
                          )))
                        : ((stockData.maxavgPrice = Math.max(
                            stockData.maxavgPrice,
                            n.price,
                            o
                          )),
                          (stockData.minavgPrice = Math.min(
                            stockData.minavgPrice,
                            n.price,
                            o
                          ))),
                      (stockData.labelMaxVol = stockData.maxVolume = Math.max(
                        stockData.maxVolume,
                        0,
                        n.volume
                      ));
                  }
                  e(o);
                }
                (stockData.minPrice < -1e8 || stockData.maxPrice - stockData.minPrice < 1e-6) &&
                  (dateUtil.stbd(stockData.datas[0][0].date, stockData.hq.date) &&
                    ((stockData.datas[0][0].price = stockData.hq.price),
                    (stockData.datas[0][0].avg_price = stockData.hq.price),
                    (stockData.datas[0][0].prevclose = stockData.hq.prevclose),
                    (stockData.datas[0][0].volume = stockData.hq.totalVolume)),
                  (stockData.minPrice = o - 0.01 * o),
                  (stockData.maxPrice = o + 0.01 * o),
                  (stockData.maxPercent = 0.01),
                  (stockData.minPercent = -0.01),
                  stockData.hq.totalVolume > 0 &&
                    dateUtil.stbd(stockData.datas[0][0].date, stockData.hq.date) &&
                    !isNaN(stockData.hq.totalAmount) &&
                    (stockData.datas[0][0].volume =
                      stockData.hq.totalAmount / stockData.hq.totalVolume));
                var c = g(stockData.maxVolume, 0, 0, !0);
                stockData.labelMaxVol = c[0];
                var d = 0.005;
                stockData.maxPercent < d &&
                  ("US" !== stockData.market || "LSE" !== stockData.market) &&
                  "pct" !== cfg.datas.scaleType &&
                  ((stockData.minPrice = stockData.maxavgPrice = o - o * d),
                  (stockData.maxPrice = stockData.minavgPrice = o + o * d),
                  (stockData.maxPercent = stockData.maxavgPercent = d),
                  (stockData.minPercent = stockData.minavgPercent = -d));
                var p;
                /^s[hz]51\d{4}$/.test(config.symbol) && (p = "fund"),
                  p &&
                    "fund" === p &&
                    "pct" !== cfg.datas.scaleType &&
                    d > Math.abs(stockData.minPercent) &&
                    ((d = Math.abs(stockData.minPercent)), (config.nfloat = stockData.nfloat = 3)),
                  ("gb_brk$a" === stockData.symbol || "usr_brk$a" === stockData.symbol) &&
                    (config.nfloat = stockData.nfloat = 1);
              }),
              (createPlayingData = function() {
                var e,
                  t,
                  a,
                  i = cfg.DIMENSION.h_t,
                  r = i * cfg.DIMENSION.P_HV,
                  n = i * (1 - cfg.DIMENSION.P_HV);
                (t = stockData.labelMinP), (a = stockData.labelMaxP);
                var o,
                  s = stockData.labelMaxVol;
                if (stockData.datas) {
                  var l = stockData.datas.length;
                  for (e = 0; l > e; e++) {
                    o = stockData.datas[0][0].prevclose;
                    for (
                      var c,
                        d = cfg.custom.show_underlay_vol,
                        h = stockData.isCompare ? "ppp" : "pp",
                        u = stockData.dataLen,
                        v = 0;
                      u > v;
                      v++
                    ) {
                      if (((c = stockData.datas[e][v]), !c)) return;
                      c.price <= 0 &&
                        stockData.realLen >= v &&
                        v > 0 &&
                        ((c.price = stockData.hq.price),
                        (c.avg_price = stockData.datas[e][v - 1].avg_price),
                        (c.volume = 0)),
                        (c.change = c.price - o),
                        (c.percent = c.change / o),
                        (c.py = xh5_PosUtil[h](c.price, t, a, i, o)),
                        (c.ay = xh5_PosUtil[h](c.avg_price, t, a, i, o)),
                        d && (c.vy = xh5_PosUtil.vp(c.volume, s, r) + n);
                    }
                  }
                  stockData.preData.vPos =
                    "CN" == stockData.market &&
                    1 == l &&
                    stbd(stockData.hq.date, stockData.datas[0][0].date)
                      ? xh5_PosUtil[h](stockData.preData.data, t, a, i, o)
                      : null;
                }
              }),
              (this.createPlayingData = createPlayingData),
              (this.extValues = function() {
                e(), t();
              }),
              (this.setDataRange = function(a) {
                var i = tDb.get();
                if (i) {
                  ee.dataLength = i.length;
                  var r = ee.start,
                    n = ee.end;
                  isNaN(r) || isNaN(n)
                    ? ((n = tDb.get("tb") || 5),
                      (r = tDb.get("tv") || 4),
                      (ee.start = r),
                      (ee.end = n))
                    : (a && n + 1 > i.length && (ee.end = n = i.length),
                      tDb.set("tv", r),
                      tDb.set("tb", n));
                  var o = [],
                    s = [];
                  if (i.length < 2) (s = i), o.push(i);
                  else
                    for (var l = r; n > l; l++)
                      (s = s.concat(i[l])), o.push(i[l]);
                  (stockData.datas = o),
                    (stockData.lineDatas = s),
                    (stockData.dataLen = o[0].length),
                    e(),
                    t();
                }
              });
          })(),
          K = {},
          B = !1,
          ae = !1,
          ie = {},
          curTime = new Date().getTime(),
          le = function() {
            var e;
            (curDate = new Date()),
              (e = 60 * curDate.getTimezoneOffset() * 1e3),
              curDate.setTime(curDate.getTime() + e),
              curDate.setHours(curDate.getHours() + 8);
          },
          ce = function(e) {
            if ((le(), !d))
              switch (I) {
                case "HF":
                  d = utils_util.tUtil.gata(I, w.time);
                  break;
                case "NF":
                  d = utils_util.tUtil.gata(I, x.time);
                  break;
                case "global_index":
                  d = utils_util.tUtil.gata(I, T.time);
                  break;
                default:
                  d = utils_util.tUtil.gata(I);
              }
            e.index = utils_util.arrIndexOf(d, e.time);
            var a = e.index;
            switch (stockData.market) {
              case "CN":
              case "REPO":
              case "option_cn":
              case "fund":
              case "OTC":
              case "global_index":
              case "NF":
                e.index < 0 &&
                  (e.time >= "11:30" &&
                    e.time < "13:00" &&
                    (a = utils_util.arrIndexOf(d, "11:29")),
                  "NF" == stockData.market &&
                    ("21:00" == x.time[0][0]
                      ? e.time < "09:00" &&
                        e.time >= "02:30" &&
                        (a = utils_util.arrIndexOf(d, "09:00"))
                      : e.time <= x.time[0][0] &&
                        (a = utils_util.arrIndexOf(d, x.time[0][0]))));
                break;
              case "HK":
                e.time >= "12:00" && e.time < "13:00" && (a = 150),
                  e.time >= "16:00" && e.time < "16:10" && (a = d.length - 1);
                break;
              case "HF":
                "hf_CHA50CFD" == stockData.symbol &&
                  e.time > "16:35" &&
                  e.time < "17:00" &&
                  (a = 455);
            }
            if (
              ((e.index = a),
              (stockData.realLen = a),
              (stockData.hq.open == stockData.hq.prevclose &&
                stockData.hq.high == stockData.hq.prevclose &&
                stockData.hq.low == stockData.hq.prevclose &&
                0 > a) ||
                stockData.hq.time < "09:30")
            )
              switch (stockData.market) {
                case "CN":
                  stockData.realLen = stockData.hq.time >= "15:00" ? H - 1 : 0;
                  break;
                case "REPO":
                  stockData.realLen = stockData.hq.time >= "15:30" ? H - 1 : 0;
                  break;
                case "NF":
                case "HF":
                case "global_index":
                case "LSE":
                case "GOODS":
                case "MSCI":
                  break;
                default:
                  stockData.realLen = 0;
              }
          },
          de = function(e, t) {
            var a = e.getTime(),
              i = t.getTime();
            return Math.floor((a - i) / 864e5) > 5;
          },
          me = new (function() {
            var a,
              n = !0,
              o = function(e) {
                var a;
                switch (I) {
                  case "HF":
                    a = w.time;
                    break;
                  case "NF":
                    a = x.time;
                    break;
                  case "global_index":
                    a = T.time;
                    break;
                  default:
                    a = [];
                }
                var i = utils_util.tUtil.gltbt(
                  1,
                  e.price,
                  !0,
                  stockData.needMarket,
                  [e.date],
                  a
                );
                "NF" == I && e.time >= "21:00"
                  ? ((i[0].date = dateUtil.dd(e.date)),
                    i[0].date.setDate(e.date.getDate() + 1))
                  : (i[0].date = dateUtil.dd(e.date)),
                  (i[0].prevclose = e.price),
                  (i[0].price = e.price),
                  (i[0].volume = 0);
                for (
                  var r = 0, n = 0, o = tDb.get(), s = 0, l = o.length;
                  l > s;
                  s++
                )
                  o[s][0].totalVolume &&
                    ((n += Number(o[s][0].totalVolume)), r++);
                (i[0].lastfive = n / r / 390 || 0),
                  stbd(o[4][0].date, e.date)
                    ? "NF" == I && e.time >= "21:00"
                      ? (o.shift(), o.push(i))
                      : (o[4] = i)
                    : (o.shift(), o.push(i)),
                  tDb.initTState(o),
                  (stockData.datas = [o[4]]),
                  (stockData.date = dateUtil.ds(e.date)),
                  (stockData.realLen = 0);
              },
              s = 0,
              l = function(e, a, l) {
                function c() {
                  switch (
                    (o(stockData.hq), onViewChange(), $.createPlayingData(), stockData.market)
                  ) {
                    case "US":
                      $.extValues();
                      break;
                    case "NF":
                      x.inited = 1;
                  }
                  utils_util.isFunc(a) && a();
                }
                function p() {
                  var e = new Date().getTime() - curTime;
                  return !isNaN(te) &&
                    te > 0 &&
                    e >= 1e3 * Number(te) &&
                    0 != stockData.realLen &&
                    stockData.hq.isUpdateTime
                    ? ((curTime = new Date().getTime()), g(b, stockData.hq, a), !0)
                    : !1;
                }
                function h() {
                  function i() {
                    stbd(stockData.hq.date, y[4][0].date) &&
                      stockData.hq.time > "16:00" &&
                      o.price < 0 &&
                      ((o.price = stockData.hq.price),
                      (o.avg_price = y[4][y[4].length - 2].avg_price),
                      (o.volume = 0));
                  }
                  function n() {
                    stbd(stockData.hq.date, y[4][0].date) &&
                      stockData.hq.time > "16:00" &&
                      ((o.price = stockData.hq.price),
                      (o.avg_price = y[4][y[4].length - 2].avg_price),
                      (o.volume = 0),
                      (o.time = stockData.hq.time),
                      o.avg_price < 0 && (o.avg_price = stockData.hq.price));
                  }
                  if (!stockData.hq.isUpdateTime) {
                    var o = y[4][y[4].length - 1];
                    switch (stockData.market) {
                      case "US":
                        i();
                        break;
                      case "HK":
                        n();
                    }
                    return (
                      ce(stockData.hq),
                      onViewChange(!0),
                      $.createPlayingData(),
                      utils_util.isFunc(a) && a(),
                      !0
                    );
                  }
                  return (
                    "HK" == stockData.market && l && g(b, e, a),
                    (stockData.date =
                      "NF" == stockData.market && stockData.hq.time >= "21:00"
                        ? dateUtil.ds(y[4][0].date)
                        : stockData.hq.today),
                    !1
                  );
                }
                var b,
                  y = tDb.get();
                switch (stockData.needMarket) {
                  case "HF":
                    d = utils_util.tUtil.gata(stockData.needMarket, w.time);
                    break;
                  case "NF":
                    d = utils_util.tUtil.gata(stockData.needMarket, x.time);
                    break;
                  case "global_index":
                    d = utils_util.tUtil.gata(stockData.needMarket, T.time);
                    break;
                  default:
                    d = utils_util.tUtil.gata(stockData.needMarket);
                }
                if (e && e.date && stockData.datas && !config.date) {
                  if (((n = !1), (b = y[4]), stockData.hq.isDateChange)) {
                    if (
                      ("NF" == stockData.market && x && x.time[0][0] < "21:00") ||
                      "NF" != stockData.market
                    )
                      return void c();
                  } else if (
                    ("CN" == stockData.market &&
                      !stbd(stockData.hq.date, y[4][0].date) &&
                      stockData.hq.time < "09:05") ||
                    ("NF" == stockData.market &&
                      stbd(stockData.hq.date, y[4][0].date) &&
                      x &&
                      "21:00" == x.time[0][0] &&
                      stockData.hq.time >= x.time[0][0]) ||
                    ("HF" == stockData.market &&
                      !stbd(stockData.hq.date, y[4][0].date) &&
                      0 != stockData.hq.date.getDay() &&
                      6 != stockData.hq.date.getDay() &&
                      stockData.hq.time >= w.time[0][0])
                  )
                    return void c();
                  if (!p() && !h()) {
                    if ((stockData.datas && (K = y[4][0]), de(e.date, y[4][0].date)))
                      return void (stockData.realLen = H);
                    (L = e.name || ""), (stockData.hq = e);
                    var _ =
                      e.date.getHours() < 10
                        ? "0" + e.date.getHours()
                        : e.date.getHours();
                    if (
                      ((stockData.time =
                        _ + ":" + utils_util.strUtil.zp(e.date.getMinutes())),
                      0 == e.index && u(b, e),
                      utils_util.arrIndexOf(d, stockData.time) &&
                        e.index > 0 &&
                        (utils_util.arrIndexOf(d, stockData.time) - stockData.realLen <= 1
                          ? u(b, e)
                          : g(b, e, a),
                        1 == e.index && 0 == s))
                    )
                      return (s = 1), void g(b, e, a);
                    R(stockData.market) &&
                      ((stockData.hq.open == stockData.hq.prevclose &&
                        stockData.hq.high == stockData.hq.prevclose &&
                        stockData.hq.low == stockData.hq.prevclose &&
                        stockData.hq.index < 0) ||
                        e.time < "09:30") &&
                      ("CN" == stockData.market
                        ? ((b[0].avg_price = e.price),
                          (b[0].volume = e.totalVolume))
                        : "option_cn" == stockData.market
                        ? ((b[0].inventory = e.position || e.holdingAmount),
                          (b[0].holdPosition = e.position || e.holdingAmount))
                        : "HK" == stockData.market &&
                          (b[0].avg_price =
                            e.totalAmount / e.totalVolume || e.price)),
                      5 == ee.end && (onViewChange(!0), $.createPlayingData()),
                      utils_util.isFunc(a) && a();
                  }
                }
              },
              c = -1,
              p = -1,
              h = -1,
              u = function(e, t) {
                var i = e;
                ce(t);
                var r = i[stockData.realLen];
                r &&
                  (K && !a
                    ? (B
                        ? ((t.volume = c =
                            t.totalVolume - (K.totalVolume || 0)),
                          (t.amount = p = t.volume * t.price),
                          (t.totalAmount = t.amount + K.totalAmount),
                          (t.avg_price = h =
                            t.totalAmount / t.totalVolume || t.price))
                        : ((t.volume = 0),
                          (t.avg_price = h =
                            K.totalAmount / K.totalVolume || t.price),
                          (t.totalAmount = t.totalVolume * t.avg_price),
                          (B = !0)),
                      (K.totalVolume = t.totalVolume),
                      (K.totalAmount = t.totalAmount))
                    : (ae
                        ? (t.volume = t.totalVolume - ie.totalVolume || 0)
                        : ((t.volume = 0), (ae = !0)),
                      (ie.totalVolume = t.totalVolume)),
                  ("option_cn" == stockData.market || "NF" == stockData.market) &&
                    ((r.inventory = t.position || t.holdingAmount),
                    (r.holdPosition = t.position || t.holdingAmount)),
                  "CN" == stockData.market
                    ? (r.avg_price = t.avg_price || r.price)
                    : (t.index > 1
                        ? (r.avg_price =
                            (r.avg_price > 0 && r.avg_price) ||
                            (i[t.index - 1].avg_price * t.index + t.price) /
                              (t.index + 1) ||
                            r.price)
                        : "fund" == stockData.market ||
                          (r.avg_price = r.price || t.price),
                      0 == t.index &&
                        (r.avg_price =
                          t.totalAmount / t.totalVolume || t.price),
                      (r.volume = r.volume || 0)),
                  isNaN(t.volume) && (t.volume = 0),
                  "HK" != stockData.market &&
                    "NF" != stockData.market &&
                    (r.volume += t.volume),
                  (r.price = t.price),
                  r.volume <= 0 && (r.volume = 0));
              },
              g = function(a, n, o) {
                var s = {
                  symbol: n.symbol,
                  date: n.today,
                  withT5: 0,
                  withI: !1,
                  faker: "",
                  dataformatter: e.datas.t1.dataformatter,
                  ssl: config.ssl,
                  assisthq: config.assisthq
                };
                (B = ae = !1),
                  "LSE" == stockData.market && (s.symbol = config.rawsymbol),
                  KKE.api("datas.t.get", s, function(e) {
                    (a = e.data.td1), ce(stockData.hq);
                    var i = tDb.get();
                    ("NF" == stockData.market &&
                      ("21:00" == x.time[0][0] &&
                        stockData.hq.time >= x.time[0][0] &&
                        0 != stockData.hq.date.getDay() &&
                        6 != stockData.hq.date.getDay() &&
                        (a[0].date = i[4][0].date),
                      ("09:30" == x.time[0][0] || "09:15" == x.time[0][0]) &&
                        stbd(i[4][0].date, stockData.hq.date) &&
                        stockData.hq.time <= x.time[0][0])) ||
                      ("HF" == stockData.market &&
                        stockData.hq.time > w.time[0][0] &&
                        0 != stockData.hq.date.getDay() &&
                        6 != stockData.hq.date.getDay() &&
                        (a[0].date = stockData.hq.date),
                      (i[4] = a),
                      tDb.initTState(i),
                      "CN" == stockData.market &&
                        "HK" == stockData.needMarket &&
                        ((stockData.needMarket = "CN"), X.changeData(stockData)),
                      5 == ee.end && (onViewChange(!0), $.createPlayingData()),
                      utils_util.isFunc(o) && o());
                  });
              },
              b = function(a, r, n) {
                var o = {
                  symbol: r.symbol,
                  date: r.today,
                  withT5: 1,
                  dist5: 1,
                  withI: !1,
                  faker: "",
                  dataformatter: e.datas.t1.dataformatter,
                  ssl: config.ssl
                };
                (B = ae = !1),
                  "LSE" == stockData.market && (o.symbol = config.rawsymbol),
                  KKE.api("datas.t.get", o, function(e) {
                    (a = e.data.td1),
                      tDb.initTState(e.data.td5),
                      ce(stockData.hq),
                      utils_util.isFunc(n) && n(),
                      X.moving(ee.start, ee.end, "T5"),
                      J.hide();
                  });
              };
            (this.updateT5Data = b),
              (this.update = function(a, r, o, s, c) {
                var d,
                  m,
                  p,
                  h = "",
                  u = "";
                (p = s ? s : utils_util.market(e.symbol)),
                  "US" === p
                    ? (h = 1 === config.assisthq ? ",gb_ixic" : u)
                    : "HK" === p && (h = 1 === config.assisthq ? ",rt_hkHSI" : u),
                  o
                    ? ((d = "datas.hq.parse"),
                      (m = {
                        symbol: e.symbol + h,
                        hqStr: o,
                        market: p,
                        ssl: config.ssl
                      }))
                    : ((d = "datas.hq.get"),
                      (m = {
                        symbol: e.symbol + h,
                        delay: !0,
                        cancelEtag: n,
                        ssl: config.ssl
                      })),
                  KKE.api(d, m, function(t) {
                    l(t.dataObj[e.symbol], a, c);
                  });
              });
          })(),
          pe = new (function() {
            var r = void 0,
              o = 1,
              s = function(e) {
                o > 2 ||
                  (E.re(globalCfg.e.T_DATA_LOADED), utils_util.isFunc(e) && e(), o++);
              },
              l = function(e) {
                var t = e,
                  a = !1;
                return (a =
                  t.open == t.prevclose &&
                  t.high == t.prevclose &&
                  t.low == t.prevclose &&
                  t.index < 0
                    ? !0
                    : t.time < "09:30");
              },
              c = function(a, i) {
                var r,
                  n,
                  o = a;
                switch (I) {
                  case "HF":
                    n = w.time;
                    break;
                  case "NF":
                    n = x.time;
                    break;
                  case "global_index":
                    n = T.time;
                    break;
                  default:
                    n = [];
                }
                var s = utils_util.tUtil.gltbt(
                  1,
                  o.hq.price,
                  !0,
                  stockData.market,
                  [o.hq.date],
                  n
                );
                return (
                  (s[0].name = o.hq.name),
                  (s[0].symbol = e.symbol),
                  (s[0].today = utils_util.dateUtil.ds(o.hq.date, "-")),
                  (r = i),
                  (r[4] = s),
                  (stockData.realLen = 0),
                  r
                );
              };
            this.initData = function(o) {
              var p = ee.viewId;
              if (r != p) {
                (r = p), null != stockData.datas && tDb.initTState(p, stockData.tDb.get());
                var h = {
                  assisthq: config.assisthq,
                  ssl: config.ssl,
                  symbol: e.symbol,
                  date: config.date,
                  withT5: 1,
                  dist5: config.dist5,
                  withI: !0,
                  faker: stockData.needMarket,
                  dataformatter: e.datas.t1.dataformatter
                };
                switch (stockData.needMarket) {
                  case "HF":
                    d = utils_util.tUtil.gata(stockData.needMarket, w.time);
                    break;
                  case "NF":
                    d = utils_util.tUtil.gata(stockData.needMarket, x.time);
                    break;
                  case "global_index":
                    d = utils_util.tUtil.gata(stockData.needMarket, T.time);
                    break;
                  case "LSE":
                    h.symbol = config.rawsymbol;
                  default:
                    d = utils_util.tUtil.gata(stockData.needMarket);
                }
                J.show(),
                  KKE.api("datas.t.get", h, function(e) {
                    X.hasHistory && "history" == e.msg && X.hasHistory(M);
                    var d = e.data.hq.status,
                      p = "",
                      u = Number(e.data.hq.state);
                    if ("empty" == e.msg)
                      switch (stockData.market) {
                        case "CN":
                          3 == d &&
                            ((p = globalCfg.delisted),
                            q.showTip({
                              txt: p,
                              parent: V,
                              noBtn: !0
                            }));
                      }
                    if ("error" == e.msg || "nohistory" == e.msg) {
                      if (
                        (a &&
                          "nohistory" == e.msg &&
                          ((M = 0),
                          X.hasHistory && X.hasHistory(M),
                          q.showTip({
                            txt: globalCfg.nohistoryt,
                            parent: V,
                            noBtn: !0
                          })),
                        (stockData.isErr = !0),
                        a && e.data && e.data.hq)
                      ) {
                        if (d)
                          switch (stockData.market) {
                            case "CN":
                              switch (d) {
                                case 2:
                                  p = globalCfg.notlisted;
                                  break;
                                case 3:
                                  p = globalCfg.delisted;
                                  break;
                                case 0:
                                  p = globalCfg.norecord;
                              }
                              break;
                            case "HK":
                              switch (d) {
                                case 5:
                                  p = globalCfg.notlisted;
                                  break;
                                case 0:
                                  p = globalCfg.delisted;
                              }
                          }
                        else p = globalCfg.norecord;
                        if (p && 0 != u) {
                          var v,
                            g = {
                              txt: p,
                              parent: V,
                              noBtn: !0
                            };
                          if (!(cfg.DIMENSION.getStageW() < 200))
                            return (
                              q.showTip({
                                txt: p,
                                parent: V,
                                noBtn: !0
                              }),
                              void J.hide()
                            );
                          (g.bgStyle = {
                            padding: 0,
                            top: "0px"
                          }),
                            v ||
                              ((v = new utils_util.TipM(cfg.COLOR)), v.genTip(g));
                        }
                      }
                      if (0 != u && 7 != u) {
                        if ((X.onResize(), 1 != d))
                          return void X.removeCompare([h.symbol]);
                        stockData.isErr = !1;
                      } else stockData.isErr = !1;
                    }
                    (stockData.hq = e.data.hq), (r = void 0), (h.td1 = e.data.td1);
                    var b;
                    curDate = new Date();
                    var y = 60 * curDate.getTimezoneOffset() * 1e3;
                    if (
                      (curDate.setTime(curDate.getTime() + y),
                      curDate.setHours(curDate.getHours() + 8),
                      (L = stockData.hq.name || ""),
                      ce(stockData.hq),
                      l(stockData.hq, e.data.td5) && R(stockData.market)
                        ? "history" == e.msg
                          ? ((b = e.data.td5),
                            b[4][0].date || (b[4][0].date = stockData.hq.date))
                          : (b = c(stockData, e.data.td5))
                        : ((b = e.data.td5),
                          "NF" != stockData.market ||
                            !x ||
                            ("09:30" != x.time[0][0] &&
                              "09:15" != x.time[0][0]) ||
                            (stbd(b[4][0].date, stockData.hq.date) &&
                              stockData.hq.time <= x.time[0][0] &&
                              (b = c(stockData, e.data.td5))),
                          b && !b[4][0].date && (b[4][0].date = stockData.hq.date)),
                      (X.historyData = b),
                      (stockData.date =
                        (e.data.td1 && e.data.td1[0].today) || stockData.hq.date),
                      tDb.initTState(b),
                      s(o),
                      1 == O && (n.dateTo(config.historytime, config.historycb), (O = 0)),
                      J.hide(),
                      config.loadedChart)
                    )
                      if (utils_util.isFunc(config.loadedChart)) config.loadedChart();
                      else if (window[config.loadedChart]) window[config.loadedChart]();
                      else
                        try {
                          window.h5chart.loadedChart();
                        } catch (_) {}
                  });
              }
            };
          })();
        (this.tDb = tDb),
          (this.initData = pe.initData),
          (this.initT5Data = me.updateT5Data),
          (this.doUpdate = me.update),
          (this.onViewChange = onViewChange),
          (this.setPricePos = function(e, t) {
            (stockData.labelMaxP = e[0]),
              (stockData.labelMinP = e[1]),
              (stockData.labelPriceCount = e[2]),
              (stockData.isCompare = t),
              $.createPlayingData(),
              k && k.setPricePos(e);
          }),
          (this.setRange = function() {
            $.setDataRange(),
              whatis1 && whatis1.setDataRange(),
              k && k.setDataRange(),
              D && D.setDataRange();
          }),
          (this.draw = function() {
            P.draw(), whatis1 && whatis1.allDraw(), k && k.allDraw();
          }),
          (this.resize = function(e) {
            $.createPlayingData(),
              P.resize(),
              whatis1 && whatis1.onResize(e),
              k && k.onResize(),
              D && D.onResize();
          }),
          (this.clear = function() {
            P.clear(),
              whatis1 && (whatis1.clear(), (whatis1 = null)),
              k && (k.clear(), (k = null)),
              D && (D.clear(), (D = null)),
              a && (Q = null);
          }),
          (this.getPriceTech = function() {
            return k || null;
          }),
          (this.removePt = function(e) {
            if (e) {
              !utils_util.isArr(e) && (e = [e]);
              for (var a = e.length; a--; )
                if (e[a].name && "VOLUME" === e[a].name.toUpperCase()) {
                  e.splice(a, 1), (cfg.custom.show_underlay_vol = !1);
                  break;
                }
            } else cfg.custom.show_underlay_vol = !1;
            k && k.removeChart(e);
          }),
          (this.togglePt = function(e) {
            k && (y = k.showHide(e));
          });
        var he = function(e, a, i) {
          e && initMgr.resizeAll(!0),
            X.onChangeView(),
            a && utils_util.isFunc(a.callback) && a.callback(),
            i && ne.onTechChanged(i[0]);
        };
        (this.initPt = function(e, r) {
          if (e) {
            !utils_util.isArr(e) && (e = [e]);
            for (var n = e.length; n--; )
              if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                e.splice(n, 1), (cfg.custom.show_underlay_vol = !0);
                break;
              }
            k ||
              ((k = new pChart({
                iMgr: iMgr,
                stockData: stockData,
                chartArea: G,
                titleArea: z,
                cb: he,
                type: "t",
                cfg: cfg,
                usrObj: config
              })),
              a && (Z = k)),
              k.createChart(e, r);
          }
        }),
          (this.initTc = function(e, t) {
            whatis1 ||
              ((whatis1 = new tChart({
                stockData: stockData,
                iMgr: iMgr,
                subArea: subArea,
                cb: he,
                cfg: cfg,
                type: "option_cn" == I ? "p" : "t",
                usrObj: config,
                initMgr: initMgr
              })),
              a && (Y = whatis1)),
              whatis1.createChart(e, t);
          }),
          (this.removeTc = function(e) {
            whatis1 && whatis1.removeChart(e);
          }),
          (this.initRs = function() {
            D ||
              ((D = new o({
                stockData: stockData,
                setting: cfg,
                state: ee,
                rc: X.moving,
                witht5: 1
              })),
              (Q = D)),
              D.linkData();
          }),
          (this.setTLineStyle = P.setTLineStyle),
          c();
      }
      function S(e, r) {
        function n() {
          var r = e.isMain;
          if (r) (l = cfg.COLOR.T_P), (c = cfg.COLOR.T_AVG);
          else {
            2 != X.dAdd || o.linecolor || (o.linecolor = config.overlaycolor);
            var n = o.linecolor || "#cccccc";
            l = n.K_N || n.T_N || "#" + utils_util.randomColor();
          }
          s = new utils_painter.xh5_ibPainter({
            setting: cfg,
            sd: e,
            withHBg: r,
            ctn: K,
            iMgr: iMgr,
            reO: {
              mh: cfg.DIMENSION.H_MA4K
            },
            iTo: function(t, a, i, r) {
              if (
                (!fCONTAINS(t, iMgr.iHLineO.body) && t.appendChild(iMgr.iHLineO.body),
                e && e.datas)
              ) {
                var n,
                  o,
                  s = e.datas[0][0].prevclose;
                2 == e.dAdd
                  ? (n =
                      e.labelMaxP * s +
                      s -
                      (i / cfg.DIMENSION.h_t) *
                        (e.labelMaxP * s + s - (e.labelMinP * s + s)))
                  : ((n =
                      e.labelMaxP -
                      (i / cfg.DIMENSION.h_t) * (e.labelMaxP - e.labelMinP)),
                    (o = Number((100 * (n - s)) / s).toFixed(2) + "%")),
                  iMgr.iToD(
                    {
                      mark: n,
                      rmark: o,
                      x: a,
                      y: i,
                      oy: cfg.DIMENSION.H_MA4K,
                      ox: cfg.DIMENSION.posX,
                      e: r
                    },
                    !0,
                    !1
                  );
              }
            }
          });
        }
        var o,
          s,
          l,
          c,
          d,
          h = {},
          v = 1,
          f = function(e) {
            o = utils_util_oc(
              {
                linetype: "line_" + v,
                linecolor: o ? o.linecolor || {} : {}
              },
              e || {}
            );
            var t = [];
            e &&
              e.linetype &&
              ((t = e.linetype.split("_")),
              t.length > 1 &&
                ("line" == t[0] || "mountain" == t[0]) &&
                (v = Number(t[1]) || 1)),
              (h = o.linecolor || {}),
              (l = h.K_N || h.T_N || cfg.COLOR.T_P),
              (c = h.T_AVG || cfg.COLOR.T_AVG),
              (d = h.T_PREV || cfg.COLOR.T_PREV);
          },
          g = function() {
            function a() {
              if (e.isMain && cfg.custom.show_underlay_vol) {
                for (var t, a = cfg.COLOR.V_SD, i = D; N > i; i++)
                  (S = y[i]),
                    (t = S.vy),
                    s.drawVStickC(M, t, I, cfg.DIMENSION.h_t, a),
                    (M += T);
                s.stroke(), (s.getG().lineWidth = 1);
              }
            }
            function r() {
              if (
                (!e.isCompare || (2 == e.dAdd && e.isMain)) &&
                !(
                  ("HK" == e.market && e.hq && "indx" == e.hq.type) ||
                  "US" === e.market ||
                  "LSE" === e.market ||
                  "MSCI" === e.market
                )
              ) {
                for (
                  M = T * (0.5 + D), s.newStyle(c, !0, v), k = D;
                  N > k && ((S = y[k]), !(S.price <= 0));
                  k++
                ) {
                  if (5 == ee.end && "CN" == e.market && Z)
                    for (var t = Z.getLog(), a = 0; a < t.length; a++)
                      if ("EWI" == t[a].name && k > (N / H - 1) * H)
                        return void s.stroke();
                  k == D || k % H == 0
                    ? s.moveTo(M, y[k].ay)
                    : s.lineTo(M, y[k].ay),
                    (M += T);
                }
                s.stroke();
              }
            }
            function n() {
              s.newStyle(l, !0, v),
                (M = T * (0.5 + D)),
                "CN" == e.market &&
                  e.preData.vPos &&
                  (0 == e.realLen && e.hq
                    ? e.hq.time > "09:29"
                      ? (s.moveTo(0, e.preData.vPos),
                        y[0].py || (y[0].py = e.preData.vPos),
                        s.lineTo(M, y[0].py))
                      : s.drawDot(M, e.preData.vPos, 1)
                    : (s.moveTo(0, e.preData.vPos),
                      y[0].py || (y[0].py = e.preData.vPos),
                      s.lineTo(M, y[0].py)),
                  s.stroke());
            }
            function m() {
              var e;
              for (k = D; N > k && ((S = y[k]), !(S.price <= 0)); k++)
                (e = S.py),
                  k == D || k % H == 0
                    ? s.moveTo(M, e)
                    : k % config.modulo == 0 && s.lineTo(M, e),
                  (S.ix = M),
                  (M += T);
              (O = M),
                (L = e),
                s.stroke(),
                config.business &&
                  h({
                    xPos: M,
                    yPos: e
                  });
            }
            function h(e) {
              s.newStyle(l, !0, 0.5),
                s.drawDot(e.xPos, e.yPos, 3, !0),
                s.newFillStyle_rgba(cfg.COLOR.M_ARR, 3, 1),
                s.fill(),
                s.stroke();
            }
            function u() {
              function t() {
                s.lineTo(M, cfg.DIMENSION.h_t),
                  s.lineTo(0.5 * T, cfg.DIMENSION.h_t),
                  s.newFillStyle_rgba(
                    cfg.COLOR.M_ARR,
                    cfg.DIMENSION.h_t,
                    cfg.COLOR.M_ARR_A
                  ),
                  s.fill();
              }
              if (w && !e.isCompare)
                if (e.datas.length < 2) (M -= T), t();
                else {
                  M = 0.5 * T;
                  var a;
                  for (
                    s.newStyle(l, !0, v), k = 0;
                    N > k && ((S = y[k]), !(S.price <= 0));
                    k++
                  )
                    (a = S.py),
                      0 == k ? s.moveTo(M, a) : s.lineTo(M, a),
                      (M += T);
                  t();
                }
            }
            function f() {
              (d = cfg.COLOR.T_PREV), s.newStyle(d, !0, 1);
              var t,
                a = 0,
                r = 5;
              for (
                t =
                  e.isCompare && e.isMain && "pct" === cfg.datas.scaleType
                    ? xh5_PosUtil.pp(0, e.labelMinP, e.labelMaxP, cfg.DIMENSION.h_t)
                    : xh5_PosUtil.pp(
                        e.datas[0][0].prevclose,
                        e.minPrice,
                        e.maxPrice,
                        cfg.DIMENSION.h_t
                      ),
                  t = ~~(t + 0.5),
                  t -= 0.5;
                a < cfg.DIMENSION.w_t;

              )
                s.moveTo(a, t), (a += r), s.lineTo(a, t), (a += r);
              if ((e.isMain && s.stroke(), config.business)) {
                var n = e.hq.price.toFixed(2),
                  o = s.getG(),
                  l = o.measureText(n).width,
                  c = cfg.DIMENSION.w_t - l,
                  m = l + 10;
                O > c && (O = c),
                  10 > O && (O = 20),
                  30 > L && (L = 30),
                  (o.fillStyle = "#EB9A47");
                var h = g(O - 10, L - 25, m, 20);
                b(h, 5, o),
                  o.beginPath(),
                  (o.fillStyle = "#fff"),
                  o.fillText(n, O - 5, L - 10),
                  s.fill();
              }
            }
            function g(e, t, a, i) {
              return {
                x: e,
                y: t,
                width: a,
                height: i
              };
            }
            function b(e, t, a) {
              var i = C(e.x + t, e.y),
                r = C(e.x + e.width, e.y),
                n = C(e.x + e.width, e.y + e.height),
                o = C(e.x, e.y + e.height),
                s = C(e.x, e.y);
              a.beginPath(),
                a.moveTo(i.x, i.y),
                a.arcTo(r.x, r.y, n.x, n.y, t),
                a.arcTo(n.x, n.y, o.x, o.y, t),
                a.arcTo(o.x, o.y, s.x, s.y, t),
                a.arcTo(s.x, s.y, i.x, i.y, t),
                a.stroke(),
                a.fill();
            }
            if (!(cfg.DIMENSION.getStageH() < 0)) {
              e.isMain && s.drawBg("T");
              var y = [];
              if (e.datas) {
                for (var _ = 0; _ < e.datas.length; _++)
                  y = y.concat(e.datas[_]);
                var N = y.length;
                if (y) {
                  var k,
                    S,
                    D,
                    w = o.linetype && 0 == o.linetype.indexOf("mountain"),
                    x = e.datas.length * H,
                    T = cfg.DIMENSION.w_t / Math.max(x, cfg.PARAM.minCandleNum),
                    I = 0.5 * T,
                    M = 0;
                  e.isTotalRedraw
                    ? ((D = 0), s.clear(!0, cfg.PARAM.getHd()))
                    : ((D = x - 2),
                      0 > D && (D = 0),
                      (M += T * D),
                      s.clearLimit(M + I, T + I));
                  var O = 0,
                    L = 0,
                    C = function(e, t) {
                      return {
                        x: e,
                        y: t
                      };
                    };
                  a(),
                    "sh000012" != e.symbol &&
                      "sh000013" != e.symbol &&
                      (config.business ||
                        config.simple ||
                        utils_util.isRepos(e.symbol) ||
                        r()),
                    n(),
                    m(),
                    u(),
                    f();
                }
              }
            }
          };
        (this.draw = g),
          (this.clear = function() {
            s.remove(), (s = null);
          }),
          (this.resize = function() {
            s.resize({
              mh: cfg.DIMENSION.H_MA4K
            }),
              g();
          }),
          (this.setTLineStyle = f),
          f(r),
          n();
      }
      function D() {
        var mainStock,
          a = this,
          allStocks = [];
        (this.getAllStock = function() {
          return allStocks;
        }),
          (this.getMainStock = function() {
            return mainStock;
          }),
          (this.getAllSymbols = function() {
            for (var e = [], t = 0, a = allStocks.length; a > t; t++)
              e.push(allStocks[t].symbol);
            return e;
          });
        var c = function() {
            var e,
              t = cfg.DIMENSION.h_t;
            return config.business
              ? (e = 0)
              : config.appMode
              ? 2
              : (e = 100 > t ? 2 : 180 > t ? 4 : 300 > t ? 6 : 8);
          },
          d = function() {
            for (
              var e,
                t,
                a,
                i = Number.MAX_VALUE,
                r = -Number.MAX_VALUE,
                o = allStocks.length,
                s = o > 1,
                l = s ? "avgPercent" : "Price",
                d = o;
              d--;

            )
              (e = allStocks[d]),
                (a = e.getPriceTech()),
                a &&
                  !s &&
                  a.getMaxMin()[0] &&
                  ((r = a.getMaxMin()[0]), (i = a.getMaxMin()[1])),
                (t = [r, i]),
                (i = Math.min(i, e["min" + l], t[1])),
                (r = Math.max(r, e["max" + l], t[0]));
            if (Z) {
              var m = Z.getLog(),
                p = m.length;
              for (d = 0; p > d; d++)
                if ("EWI" == m[d].name || "MA" == m[d].name) {
                  var h = allStocks[0].datas[0][0].prevclose,
                    u = Math.max(Math.abs(h - r), Math.abs(h - i));
                  (r = h + u), (i = h - u);
                }
            }
            for (var v = c(), f = o; f--; )
              (e = allStocks[f]), e.setPricePos([r, i, v], s);
          },
          m = function(e) {
            if (e) e.draw();
            else for (var t = allStocks.length; t--; ) allStocks[t].draw();
          },
          p = function(t) {
            1 == ee.viewId || 0 == ee.viewId
              ? config.date
                ? a.moving(ee.start, ee.end)
                : a.moving(4, 5, !1)
              : a.moving(ee.start, ee.end, !1),
              t || ne.onRange(mainStock);
          },
          v = function(e) {
            return e.isErr
              ? (utils_util.trace.error("err symbol data"),
                a.removeCompare([e.symbol]),
                !0)
              : e.tDb.get()
              ? !0
              : (e.initData(b), !1);
          },
          f = [],
          g = function(e) {
            if (e && utils_util.isFunc(e.callback)) {
              for (var a = !1, i = f.length; i--; )
                if (e.callback === f[i]) {
                  a = !0;
                  break;
                }
              !a && f.push(e.callback);
            }
          },
          b = function(a, i) {
            if ((g(i), v(mainStock))) {
              if (mainStock.isErr)
                return (
                  utils_util.trace.error("err main symbol"), void (mainStock.isErr = !1)
                );
              iMgr.patcher.switchFloater();
              for (var r, o = !0, s = allStocks.length; s--; )
                (r = allStocks[s]), r == mainStock || v(r) || (o = !1);
              if (o) {
                for (s = allStocks.length; s--; )
                  allStocks[s].marketNum(allStocks[s].needMarket) > allStocks[s].marketNum(I) &&
                    (I = allStocks[s].needMarket);
                for (s = allStocks.length; s--; ) O(allStocks[s]);
                for (p(a); f.length; ) {
                  var l = f.shift();
                  l();
                }
              }
              if ((ne.onViewChanged(), a)) return;
              ne.onViewPrice(), ne.onDataUpdate();
            }
          },
          _ = function() {
            ne.onRange(mainStock);
          };
        (this.getExtraData = function(a) {
          if (
            ((a = utils_util_oc(
              {
                symbol: mainStock.symbol,
                name: null,
                clone: !0
              },
              a || {}
            )),
            !a.name)
          )
            return null;
          for (var i, r, o = allStocks.length; o--; )
            if (allStocks[o].symbol === a.symbol) {
              i = allStocks[o];
              break;
            }
          if (i) {
            var s;
            "t1" == a.name || "t5" == a.name
              ? ((s = i.tDb.get()), (r = a.clone ? utils_util.clone(s) : s))
              : (r = null);
          }
          return r;
        }),
          (this.shareTo = function(e) {
            e = utils_util_oc(
              {
                type: "weibo",
                url: window.location.href,
                wbtext: "",
                qrwidth: 100,
                qrheight: 100,
                extra: void 0
              },
              e
            );
            var a = String(e.type).toLowerCase();
            switch (a) {
              case "qrcode":
                KKE.api(
                  "utils.qrcode.createcanvas",
                  {
                    text: e.url,
                    width: e.qrwidth,
                    height: e.qrheight
                  },
                  function(e) {
                    q.showTip({
                      content: e,
                      txt:
                        '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                      parent: V,
                      btnLb: "\u5173\u95ed"
                    });
                  }
                );
                break;
              default:
                utils_util.grabM.shareTo({
                  ctn: V,
                  w: cfg.DIMENSION.getStageW(),
                  h: cfg.DIMENSION.getStageH() - (B.clientHeight || 0),
                  ignoreZIdxArr: [cfg.PARAM.I_Z_INDEX],
                  ignoreIdArr: [cfg.PARAM.LOGO_ID],
                  priorZIdx: cfg.PARAM.G_Z_INDEX,
                  nologo: !1,
                  top: cfg.DIMENSION.posY + cfg.DIMENSION.H_MA4K + 17,
                  right: cfg.DIMENSION.RIGHT_W + cfg.DIMENSION.K_RIGHT_W,
                  LOGO_W: cfg.DIMENSION.LOGO_W,
                  LOGO_H: cfg.DIMENSION.LOGO_H,
                  color: cfg.COLOR.LOGO,
                  bgColor: cfg.COLOR.BG,
                  txt: e.wbtext,
                  url: e.url,
                  extra: e.extra
                });
            }
          });
        var N,
          k,
          S = function() {
            iMgr.update(), d(), m(), _(), iMgr.isIng() || ne.onViewPrice();
          },
          D = function() {
            clearTimeout(k),
              !ae &&
                V.parentNode &&
                "none" != V.style.display &&
                (k = setTimeout(S, 200));
          },
          w = function(e) {
            if ((clearInterval(N), !isNaN(config.rate))) {
              var t = 1e3 * config.rate;
              t > 0 && (N = setTimeout(w, t));
            }
            for (var a, r = allStocks.length; r--; )
              (a = allStocks[r]), a.doUpdate(D, null, null, null, e);
          },
          x = function() {
            ee.viewId = 2;
            for (var e, t = allStocks.length; t--; )
              (e = allStocks[t]), e.initT5Data(e.datas, e.hq, b);
          };
        (this.updateDataAll = w), (this.update5Data = x);
        var T = function(t, a) {
            var i = new chart_h51(t, a);
            a && (mainStock = i), (allStocks[allStocks.length] = i), L(), b();
          },
          M = function(e) {
            for (var t, a, i = e, r = 0, o = 0; r < allStocks.length; r++)
              (a = allStocks[r]),
                a.marketNum(a.market) == a.marketNum(i)
                  ? o++
                  : (t = t
                      ? a.marketNum(a.market) > a.marketNum(t)
                        ? a.market
                        : t
                      : a.market),
                r == allStocks.length - 1 && 0 == o && (I = t);
            for (r = allStocks.length; r--; ) O(allStocks[r], i);
          },
          O = function(e, t) {
            e.changeMarket(t);
          };
        this.changeData = O;
        var L = function() {
            if (allStocks.length > 1)
              a.mM.togglePt({
                v: !1
              });
            else {
              if (allStocks.length <= 0) return;
              a.mM.togglePt({
                v: !0
              });
            }
          },
          R = function(e) {
            var t = ee.start,
              a = ee.end;
            return (
              (t = Math.max(t + e, 0)),
              0 == t && 5 >= a && 0 == ee.start && a++,
              t >= a && (t = a - 1),
              a > 5 && (a = 5),
              [t, a]
            );
          };
        (this.onWheel = function(e) {
          var t = -1 * e.detail || e.wheelDelta;
          if (0 != t) {
            t = t > 0 ? -1 : 1;
            var i = R(t);
            a.moving(i[0], i[1], "wheel");
          }
        }),
          (this.onKb = function(e) {
            var t = e.keyCode;
            switch (t) {
              case 38:
              case 40:
                var i = R(38 == t ? 1 : -1);
                a.moving(i[0], i[1], "Key");
                break;
              case 37:
              case 39:
                iMgr.iToKb(37 == t ? -1 : 1);
                break;
              default:
                return;
            }
            xh5_EvtUtil.preventDefault(e);
          }),
          (this.zoomApi = function(e) {
            var t = R(e ? 1 : -1);
            a.moving(t[0], t[1], "zoom");
          }),
          (this.moveApi = function(e) {
            var t = ee.start,
              i = ee.end;
            (t += e),
              (i += e),
              i > 5 && ((t = 4), (i = 5)),
              0 > t && ((t = 0), (i = 1)),
              a.moving(t, i, "move");
          }),
          (this.setViewData = p),
          (this.onChangeView = b);
        var A = 1;
        (this.moving = function(t, a, i, r) {
          (ee.start = t),
            (ee.end = a),
            ((4 != t && 5 != a) || (0 != t && 5 != a)) && (ee.viewId = 0),
            r && 4 != t && 1 == A && ((i = "rs"), (A = 2), (C = 0)),
            ("HF" == I || "NF" == I) &&
              0 == C &&
              i &&
              (J.show(), x("t5"), (C = 1), (A = 2));
          for (var o, s = allStocks.length; s--; )
            (o = allStocks[s]), o.setRange(), o.onViewChange();
          d(), m(), ne.onRange(mainStock);
        }),
          (this.dAdd = 0),
          (this.compare = function(e) {
            for (var t = allStocks.length; t--; ) if (allStocks[t].symbol == e.symbol) return;
            T(e, !1);
          }),
          (this.removeCompare = function(e) {
            for (var t, a, i = "CN", r = e.length; r--; ) {
              a = e[r];
              for (var o = allStocks.length; o--; )
                if (a == allStocks[o].symbol) {
                  (t = allStocks.splice(o, 1)[0]),
                    (i = t.market),
                    t.clear(),
                    (t = null);
                  break;
                }
            }
            M(i), L(), d(), m(), ne.onRange(allStocks[0]);
          }),
          (this.onResize = function(e) {
            for (var t = allStocks.length; t--; ) allStocks[t].resize(e);
          }),
          (this.dcReset = function() {
            for (var e, t = allStocks.length; t--; )
              (e = allStocks.splice(t, 1)[0]), e.clear(), (e = null);
          }),
          (this.setScale = function(e) {
            cfg.datas.scaleType = e;
          }),
          (this.setTLineStyle = function(a) {
            if (a) {
              !utils_util.isArr(a) && (a = [a]);
              for (var i = a.length; i--; ) {
                var r = a[i];
                if (r.hasOwnProperty("symbol")) {
                  for (var o = r.symbol, s = allStocks.length; s--; )
                    if (allStocks[s].symbol == o) {
                      allStocks[s].setTLineStyle(r), allStocks[s].draw();
                      break;
                    }
                } else mainStock.setTLineStyle(r), mainStock.draw();
              }
            } else mainStock.setTLineStyle(), mainStock.draw();
          });
        var E,
          P = function(e) {
            e ? S() : iMgr.update();
          },
          H = !1,
          F = 0,
          $ = function() {
            clearTimeout(E), (H = !1), (F = 0);
          },
          K = function() {
            E = setTimeout(function() {
              F > 0 && S(), $();
            }, 500);
          };
        (this.pushData = function(e, t) {
          var a = !1;
          switch (Number(t)) {
            case 1:
              $(), (a = !0);
              break;
            case 2:
              H || ((H = !0), K());
              break;
            case 0:
              $();
          }
          for (var i = e.length; i--; )
            for (var r = allStocks.length; r--; )
              if (allStocks[r].symbol == e[i].symbol && e[i].data) {
                F++, allStocks[r].doUpdate(fBind(P, null, a), !1, e[i].data, e[i].market);
                break;
              }
        }),
          (this.dcInit = function(e) {
            T(e, !0), w();
          }),
          (this.mM = new (function() {
            var t = function(a, type, r) {
                console.log(a);
                var chart, method;
                switch (type) {
                  case "price":
                    (chart = pChart), (method = "initPt");
                    break;
                  case "tech":
                    (chart = tChart), (method = "initTc");
                }
                method &&
                  (chart
                    ? mainStock[method](a, r)
                    : KKE.api(
                        "plugins.techcharts.get",
                        {
                          type: type
                        },
                        function(e) {
                          (tChart = e.tChart), (pChart = e.pChart), t(a, type, r);
                        }
                      ));
              },
              a = function(t, a) {
                var i;
                switch (a) {
                  case "price":
                    i = "removePt";
                    break;
                  case "tech":
                    i = "removeTc";
                }
                i && mainStock && (mainStock[i](t), b());
              },
              i = function(t) {
                return o
                  ? (Q
                      ? Q.sh(t)
                      : (mainStock.initRs(), i(t), B.appendChild(Q.getBody())),
                    void initMgr.resizeAll(!0))
                  : void KKE.api("plugins.rangeselector.get", null, function(
                      e
                    ) {
                      (o = e), i(t);
                    });
              };
            (this.showRs = i),
              (this.newAC = t),
              (this.removeAC = a),
              (this.togglePt = function(t) {
                mainStock && (mainStock.togglePt(t), b());
              });
          })());
      }
      var w,
        x,
        T,
        I = "CN",
        M = 1,
        O = 0,
        L = "\u624b",
        C = 0;
      (x = config._nf_window_var), (w = config._hf_window_var), (T = config._gbi_window_var);
      var R = function(e) {
          return (
            "CN" === e ||
            "US" === e ||
            "HK" === e ||
            "OTC" === e ||
            "REPO" === e ||
            "option_cn" === e
          );
        },
        A = {
          tcd: function(e) {
            var a;
            switch (e) {
              case "HF":
                a = utils_util.tUtil.gtAll(w.time).length;
                break;
              case "REPO":
                (a = 271), (L = "");
                break;
              case "LSE":
                (a = 511), (L = "");
                break;
              case "GOODS":
                (a = 781), (L = "");
                break;
              case "MSCI":
                (a = utils_util.tUtil.gtmsci().length), (L = "");
                break;
              case "CN":
                (a = 241),
                  utils_util.isRepos(config.symbol) && (L = ""),
                  utils_util.isCNK(config.symbol) && (L = "\u80a1");
                break;
              case "option_cn":
              case "op_m":
                (a = 241), (L = "");
                break;
              case "HK":
                (a = 331), (L = "");
                break;
              case "US":
                (a = 391), (L = "");
                break;
              case "NF":
                (a = utils_util.tUtil.gtAll(x.time).length), (L = "");
                break;
              case "global_index":
                a = utils_util.tUtil.gtAll(T.time).length;
                break;
              default:
                a = 241;
            }
            return a;
          },
          rmuk: function(e, t, a) {
            var i,
              r,
              n = e;
            return (
              "HK" == a
                ? ((i = n.splice(0, 120)), (r = i.concat(n.splice(30, 121))))
                : "US" == a || (r = e),
              r
            );
          },
          aduk: function(e, a, i, r, n) {
            var o,
              s,
              l,
              c,
              d,
              m = e,
              p = a,
              h = i,
              u = [],
              f = [],
              g = r.getHours() + ":" + utils_util.strUtil.zp(r.getMinutes()),
              b = utils_util.tUtil.gata(i),
              y = dateUtil.stbd(r, n) ? utils_util.arrIndexOf(b, g) : 0;
            "HK" == p &&
              "US" == i &&
              ((s = [["12:01", "12:59"]]),
              (u = [1]),
              (l = m[150]),
              (c = m[m.length - 1])),
              ("CN" == p || "option_cn" == p) &&
                ("HK" == h
                  ? ((s = [["11:30", "11:59"], ["15:01", "16:00"]]),
                    (u = [0, 2]),
                    (l = m[119]),
                    (c = m[m.length - 1]))
                  : ((s = [
                      ["11:30", "11:59"],
                      ["12:00", "12:59"],
                      ["15:01", "16:00"]
                    ]),
                    (u = [0, 1, 2]),
                    (l = m[119]),
                    (c = m[m.length - 1])));
            for (var _ = 0, N = u.length; N > _; _++) {
              for (
                var k,
                  S,
                  D,
                  w = utils_util.tUtil.gtr([s[_]]),
                  x = [],
                  T = 0,
                  I = w.length;
                I > T;
                T++
              )
                u[_] < 2
                  ? (("CN" == p || "option_cn" == p) &&
                      (y > 120 && 150 > y
                        ? ((S = y - 120), (D = S > T ? l.price : -0.01))
                        : (D = l.price)),
                    "HK" == p && y > 150 && 180 > y && (S = y - 150),
                    (k = {
                      time: w[T],
                      price: D,
                      avg_price: D,
                      volume: 0,
                      fake: u[_]
                    }))
                  : (("CN" == p || "option_cn" == p) &&
                      (y > 272
                        ? ((S = y - 272), (D = S > T ? c.price : -0.01))
                        : (D = c.price)),
                    (k = {
                      time: w[T],
                      price: D,
                      avg_price: D,
                      volume: 0,
                      fake: u[_]
                    })),
                  x.push(k);
              f.push(x);
            }
            return (
              "HK" == a && ((d = m.splice(0, 151)), (o = d.concat(f[0], m))),
              ("CN" == a || "option_cn" == p) &&
                ("US" == h
                  ? ((d = m.splice(0, 120)),
                    (o = d.concat(f[0], f[1], m, f[2])))
                  : "HK" == h &&
                    ((d = m.splice(0, 120)), (o = d.concat(f[0], m, f[1])))),
              o
            );
          }
        };
      utils_util.xh5_EvtDispatcher.call(this);
      var E = this;
      (config = utils_util_oc(
        {
          symbol: "sh000001",
          ssl: !0,
          business: !1,
          simple: !1,
          datas: {
            t1: {
              url: void 0,
              dataformatter: void 0
            },
            t5: {
              url: void 0,
              dataformatter: void 0
            }
          },
          assisthq: 1,
          dim: null,
          theme: null,
          view: "ts",
          rate: 3,
          modulo: 1,
          t_rate: 0 / 0,
          fh5: !1,
          noh5: null,
          reorder: !0,
          reheight: !0,
          dist5: 0,
          w: void 0,
          h: void 0,
          mh: 0,
          date: null,
          dp: !1,
          onrange: void 0,
          onviewprice: void 0,
          ondataupdate: void 0,
          onviewchanged: void 0,
          ontechchanged: void 0,
          onshortclickmain: void 0,
          nfloat: 2,
          ennfloat: !1,
          trace: void 0,
          overlaycolor: void 0,
          nohtml5info: void 0,
          tchartobject: {
            t: void 0,
            k: void 0
          }
        },
        config || {
          YANGWEN: "yangwen@staff.sina.com.cn",
          VER: "2.6.0"
        }
      )),
        !config.symbol && (config.symbol = "sh000001"),
        (config.symbol = String(config.symbol)),
        (config.rawsymbol = String(config.symbol)),
        (config.symbol =
          "LSE" === utils_util.market(config.symbol)
            ? utils_util.strUtil.replaceStr(config.symbol)
            : config.symbol.replace(".", "$")),
        0 == location.protocol.indexOf("https:") && (config.ssl = !0);
      var P =
          "_" +
          config.symbol +
          "_" +
          Math.floor(1234567890 * Math.random() + 1) +
          Math.floor(9876543210 * Math.random() + 1),
        cfg = cfgs_settinger.getSetting(P);
      (cfg.datas.isT = !0),
        config.reorder || (cfg.custom.indicator_reorder = !1),
        config.reheight || (cfg.custom.indicator_reheight = !1),
        (I = utils_util.market(config.symbol)),
        (cfg.datas.tDataLen = A.tcd(I));
      var H = cfg.datas.tDataLen,
        q = new (function() {
          var e;
          (this.showTip = function(a) {
            e || (e = new utils_util.TipM(cfg.COLOR)), e.genTip(a);
          }),
            (this.hideTip = function() {
              e && e.hide();
            });
        })();
      if (xh5_BrowserUtil.noH5) {
        if ("undefined" == typeof FlashCanvas || config.fh5)
          return void (utils_util.isFunc(config.noh5) && config.noh5(config));
        cfg.PARAM.isFlash = !0;
      }
      if (
        (cfg.PARAM.isFlash &&
          ((cfg.COLOR.K_EXT_BG = "#fff"), (cfg.COLOR.F_BG = "#fff")),
        config.dim)
      )
        for (var F in config.dim)
          config.dim.hasOwnProperty(F) &&
            utils_util.isNum(cfg.DIMENSION[F]) &&
            (cfg.DIMENSION[F] = config.dim[F]);
      var $,
        V,
        K,
        G,
        z,
        subArea,
        B,
        X,
        j,
        Y,
        Z,
        Q,
        J,
        ee = {
          viewId: globalCfg.URLHASH.vi(config.view || "ts"),
          dataLength: void 0,
          start: void 0,
          end: void 0,
          startDate: void 0,
          endDate: void 0
        },
        te = isNaN(config.t_rate) ? cfg.PARAM.T_RATE : config.t_rate,
        ae = !1,
        ie = 0,
        initMgr = new (function() {
          var e,
            a = function(e, t, a) {
              var r = !1;
              isNaN(e) && (e = config.w || $.offsetWidth),
                isNaN(t) && (t = config.h || $.offsetHeight - config.mh);
              for (
                var n,
                  o = B.clientHeight || 0,
                  s = subArea.clientHeight || 0,
                  l = cfg.DIMENSION.getOneWholeTH(),
                  c = 0,
                  d = subArea.childNodes,
                  m = d.length,
                  p = 0,
                  h = d.length;
                h--;

              )
                (n = d[h]),
                  n.id.indexOf("blankctn") >= 0
                    ? ((c = n.offsetHeight), m--, (p += c))
                    : (p += l);
              return (
                !isNaN(a) && (s -= a),
                s / (t - o) > 1 && ((s = p), (r = !0)),
                cfg.DIMENSION.setStageW(e),
                1 == ie
                  ? m > 0 &&
                    (cfg.DIMENSION.setStageH(t, m * l + c + o),
                    (r = !0),
                    (ie = 0))
                  : cfg.DIMENSION.setStageH(t, s + o),
                0 > t &&
                  ((cfg.DIMENSION.H_T_G = cfg.DIMENSION.H_T_G - cfg.DIMENSION.H_T_T),
                  (cfg.DIMENSION.H_T_B = cfg.DIMENSION.H_TIME_PART)),
                r
              );
            },
            r = function() {
              J.setPosition();
            },
            n = function() {
              e && (e.style.display = cfg.custom.show_logo ? "" : "none");
            },
            o = function(e, i, o) {
              var s = a(i, o, 0 / 0);
              if (e || (i && o)) {
                if (!X) return;
                X.onResize(s), iMgr.onResize();
              }
              r(),
                n(),
                utils_util.stc("t_wh", [
                  cfg.DIMENSION.getStageW(),
                  cfg.DIMENSION.getStageH()
                ]);
            },
            s = function() {
              ($ = f$DOM(config.domid) || config.dom),
                $ ||
                  (($ = utils_util_$C("div")),
                  document.body.appendChild($),
                  utils_util.trace.error("missing of dom id")),
                (V = utils_util_$C("div")),
                (V.style.position = "relative"),
                (V.style.outlineStyle = "none"),
                (V.style.webkitUserSelect = V.style.userSelect = V.style.MozUserSelect =
                  "none"),
                (K = utils_util_$C("div", "mainarea_" + cfg.uid)),
                (G = utils_util_$C("div")),
                K.appendChild(G),
                (z = utils_util_$C("div")),
                (z.style.position = "absolute"),
                (z.style.fontSize = cfg.STYLE.FONT_SIZE + "px"),
                K.appendChild(z),
                V.appendChild(K),
                (subArea = utils_util_$C("div")),
                V.appendChild(subArea),
                (B = utils_util_$C("div")),
                V.appendChild(B),
                $.appendChild(V),
                (J = new utils_util.LoadingSign()),
                J.appendto(K, cfg);
            },
            l = function(a) {
              var i = !1;
              if (a) {
                Q && (i = Q.setTheme(a));
                for (var r in a)
                  a.hasOwnProperty(r) &&
                    cfg.COLOR.hasOwnProperty(r) &&
                    cfg.COLOR[r] !== a[r] &&
                    ((cfg.COLOR[r] = a[r]), (i = !0));
                utils_util.stc("t_thm", a);
              }
              return (
                i &&
                  logoM.styleLogo({
                    logo: e,
                    color: cfg.COLOR.LOGO
                  }),
                i
              );
            },
            m = function(e) {
              !cfg.custom.mousewheel_zoom ||
                (document.activeElement !== V &&
                  document.activeElement.parentNode !== V) ||
                (X && X.onWheel(e), xh5_EvtUtil.preventDefault(e), xh5_EvtUtil.stopPropagation(e));
            },
            p = function(e) {
              cfg.custom.keyboard && X && X.onKb(e);
            },
            u = function() {
              utils_util.xh5_deviceUtil.istd ||
                (xh5_BrowserUtil.info.name.match(/firefox/i)
                  ? xh5_EvtUtil.addHandler(V, "DOMMouseScroll", m)
                  : xh5_EvtUtil.addHandler(V, "mousewheel", m),
                (V.tabIndex = 0),
                xh5_EvtUtil.addHandler(V, "keydown", p));
            },
            v = function(t) {
              (e = t), V.appendChild(t);
            },
            f = function() {
              s(),
                l(config.theme),
                o(),
                u(),
                cfg.DIMENSION.h_t < 0 &&
                  ((K.style.display = "none"),
                  (cfg.custom.indicator_reorder = !1),
                  (cfg.custom.indicator_reheight = !1)),
                logoM.getLogo({
                  cb: v,
                  id: cfg.PARAM.LOGO_ID,
                  isShare: !1,
                  top: cfg.DIMENSION.posY + cfg.DIMENSION.H_MA4K + 17,
                  right: cfg.DIMENSION.RIGHT_W + cfg.DIMENSION.K_RIGHT_W,
                  LOGO_W: cfg.DIMENSION.LOGO_W,
                  LOGO_H: cfg.DIMENSION.LOGO_H,
                  color: cfg.COLOR.LOGO
                }),
                xh5_BrowserUtil.noH5 &&
                  (q.showTip({
                    txt: config.nohtml5info || globalCfg.nohtml5info,
                    parent: V
                  }),
                  utils_util.stc("t_nh5"));
            };
          f(),
            (this.resizeAll = o),
            (this.innerResize = function(e) {
              X &&
                (a(0 / 0, 0 / 0, e),
                X.onResize(),
                iMgr.onResize(),
                r(),
                ne.onInnerResize({
                  height: cfg.DIMENSION.h_t
                }));
            }),
            (this.initTheme = l);
        })(),
        ne = new (function() {
          var e = 0,
            a = function(a, r) {
              var n = H - 1,
                o = X.getAllStock()[0];
              if (
                o &&
                o.datas &&
                (stbd(o.datas[o.datas.length - 1][0].date, o.hq.date)
                  ? (r = o.realLen < 0 || o.realLen > n ? n : (n = o.realLen))
                  : "NF" == I && x && "21:00" == x.time[0][0]
                  ? (r = n = o.realLen)
                  : o.realLen < 0 || o.realLen > n
                  ? (r = n)
                  : ((r = n),
                    o.datas[o.datas.length - 1][r].price < 0 &&
                      (r = o.realLen)),
                (a = o.datas[o.datas.length - 1][r]),
                a && a.time)
              ) {
                var s, l;
                if (
                  ("HF" == I
                    ? ((s = w.time[0][0]),
                      s > a.time
                        ? ((s = o.datas[o.datas.length - 1][0].date),
                          (l = new Date(s)),
                          "hf_CHA50CFD" !== config.symbol &&
                            l.setDate(l.getDate() + 1))
                        : (l = o.datas[o.datas.length - 1][0].date))
                    : "NF" == I
                    ? ((s = x.time[0][0]),
                      s < a.time && "21:00" == s
                        ? ((s = o.datas[o.datas.length - 1][0].date),
                          (l = new Date(s)),
                          l.setDate(l.getDate() - 1))
                        : (l = o.datas[o.datas.length - 1][0].date))
                    : (l = o.datas[o.datas.length - 1][0].date),
                  "US" == I &&
                    o.hq &&
                    o.datas &&
                    o.datas.length > 0 &&
                    o.hq.today === o.datas[o.datas.length - 1][0].today)
                ) {
                  var c = o.datas[o.datas.length - 1][r];
                  -1 == c.price &&
                    ((c.price = c.avg_price = o.hq.price),
                    (c.change = o.hq.price - o.hq.prevclose),
                    (c.percent =
                      (o.hq.price - o.hq.prevclose) / o.hq.prevclose));
                }
                return (
                  (a.day =
                    utils_util.dateUtil.ds(l, "/", !1) +
                    "/" +
                    utils_util.dateUtil.nw(l.getDay()) +
                    (a.time || "")),
                  (e = r),
                  utils_util.clone(a)
                );
              }
            };
          (this.currentData = a),
            (this.onDataUpdate = function() {
              if (utils_util.isFunc(config.ondataupdate)) {
                var e = a();
                e &&
                  config.ondataupdate({
                    data: utils_util.clone(e),
                    idx: ee.currentLength - 1,
                    left: cfg.DIMENSION.posX,
                    top: cfg.DIMENSION.H_MA4K
                  });
              }
            }),
            (this.onInnerResize = function(e) {
              utils_util.isFunc(config.oninnerresize) && config.oninnerresize(e);
            }),
            (this.onRange = function(e) {
              !ae &&
                utils_util.isFunc(config.onrange) &&
                e &&
                config.onrange({
                  isCompare: e.isCompare,
                  data: utils_util.clone(e.datas),
                  width: cfg.DIMENSION.w_t,
                  height: cfg.DIMENSION.h_t,
                  viewRangeState: utils_util.clone(ee),
                  range: [e.labelMinP, e.labelMaxP, e.labelMaxVol],
                  left: cfg.DIMENSION.posX,
                  top: cfg.DIMENSION.H_MA4K
                });
            }),
            (this.onViewChanged = function() {
              utils_util.isFunc(config.onviewchanged) &&
                config.onviewchanged({
                  viewRangeState: utils_util.clone(ee)
                });
            }),
            (this.onViewPrice = function(r, n, o, s) {
              if (!ae && utils_util.isFunc(config.onviewprice)) {
                if ((r || (r = a(r, n)), !r)) return;
                o || (o = X.getMainStock().getName());
                var l,
                  c,
                  d = utils_util.clone(r);
                config.ennfloat
                  ? ((l = config.nfloat), (c = config.nfloat))
                  : ((l = utils_util.strUtil.nfloat(d.price)),
                    (c = utils_util.strUtil.nfloat(d.avg_price))),
                  (d.price = Number(d.price.toFixed(l))),
                  (d.avg_price = Number(d.avg_price.toFixed(c)));
                var m = config.symbol.length;
                "HK" == I &&
                  config.symbol.substring(m - 1, m) >= "A" &&
                  (d.avg_price = 0 / 0),
                  d.volume && d.volume < 0 && (d.volume = 0),
                  config.onviewprice({
                    curname: o || "",
                    data_array: X.getAllStock().length,
                    data: d,
                    idx: e,
                    left: cfg.DIMENSION.posX,
                    top: cfg.DIMENSION.H_MA4K,
                    interacting: !!s
                  });
              }
            }),
            (this.onTechChanged = function(e) {
              utils_util.isFunc(config.ontechchanged) &&
                config.ontechchanged({
                  Indicator: e
                });
            }),
            (this.shortClickHandler = function() {
              utils_util.isFunc(config.onshortclickmain) && config.onshortclickmain();
            });
        })(),
        iMgr = new (function() {
          var e,
            a,
            r,
            n,
            o,
            s = config.nfloat,
            l = 137,
            c = new (function() {
              var t = function(t) {
                var a = e.body.style;
                t && cfg.custom.show_floater
                  ? ((a.backgroundColor = cfg.COLOR.F_BG),
                    (a.color = cfg.COLOR.F_T),
                    (a.border = "1px solid " + cfg.COLOR.F_BR),
                    (a.display = ""))
                  : (a.display = "none");
              };
              (this.pv = function(a) {
                var i = e.body.style,
                  r = Math.max(cfg.DIMENSION.posX, 55) + 9,
                  n = cfg.DIMENSION.posX < 55 ? 9 : 0,
                  o = cfg.DIMENSION.getStageW() - l - 9 - cfg.DIMENSION.RIGHT_W - n;
                (i.left =
                  (a.x > (cfg.DIMENSION.getStageW() - cfg.DIMENSION.RIGHT_W) >> 1
                    ? r
                    : o) + "px"),
                  (i.top = (a.y || 0) + "px"),
                  t(!0);
              }),
                (this.showFloater = t);
            })(),
            p = function() {
              function r() {
                var e = X.getAllStock()[0];
                return (
                  !("HK" != e.market || "indx" != e.hq.type) ||
                  "LSE" === e.market ||
                  "MSCI" === e.market
                );
              }
              function n() {
                var e,
                  a,
                  n,
                  o =
                    "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;",
                  c =
                    "font-weight:normal;border:0;height:16px;text-align:center;",
                  m =
                    "text-align:left;font-weight:normal;border:0;height:16px;",
                  p = "text-align:right;border:0;height:16px;",
                  h = utils_util_$C("div");
                (h.style.position = "absolute"),
                  (h.style.zIndex = cfg.PARAM.I_Z_INDEX + 2),
                  (h.style.padding = "2px"),
                  (h.style.width = l + "px"),
                  (h.style.lineHeight = "16px"),
                  (h.style.display = "none"),
                  (h.style.fontSize = "12px");
                var u,
                  v,
                  f,
                  g,
                  b = utils_util_$C("table"),
                  y = utils_util_$C("thead"),
                  N = utils_util_$C("tbody");
                (b.style.cssText = o),
                  (u = utils_util_$C("tr")),
                  (v = utils_util_$C("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = c);
                var k = utils_util_$C("span");
                v.appendChild(k),
                  u.appendChild(v),
                  y.appendChild(u),
                  (u = utils_util_$C("tr")),
                  (u.style.textAlign = "center"),
                  (v = utils_util_$C("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = c);
                var S = utils_util_$C("span");
                v.appendChild(S),
                  u.appendChild(v),
                  N.appendChild(u),
                  (u = utils_util_$C("tr")),
                  (v = utils_util_$C("th")),
                  (v.style.cssText = m),
                  (f = utils_util_$C("td")),
                  (v.style.fontWeight = "normal"),
                  (g = utils_util_$C("span")),
                  (g.innerHTML = "\u4ef7\u683c");
                var D = utils_util_$C("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  f.appendChild(D),
                  (v.style.fontWeight = "normal"),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = utils_util_$C("tr")),
                  (v = utils_util_$C("th")),
                  (v.style.cssText = m),
                  (v.style.fontWeight = "normal"),
                  (f = utils_util_$C("td")),
                  (g = utils_util_$C("span")),
                  (g.innerHTML = "\u5747\u4ef7");
                var w = utils_util_$C("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  (v.style.fontWeight = "normal"),
                  f.appendChild(w),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = utils_util_$C("tr")),
                  (v = utils_util_$C("th")),
                  (v.style.cssText = m),
                  (f = utils_util_$C("td")),
                  (v.style.fontWeight = "normal"),
                  (g = utils_util_$C("span")),
                  (g.innerHTML = "\u6da8\u8dcc");
                var x = utils_util_$C("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  f.appendChild(x),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = utils_util_$C("tr")),
                  (v = utils_util_$C("th")),
                  (v.style.cssText = m),
                  (f = utils_util_$C("td")),
                  (v.style.fontWeight = "normal"),
                  (g = utils_util_$C("span")),
                  (g.innerHTML = "\u6210\u4ea4");
                var T = utils_util_$C("span");
                (f.style.cssText = p),
                  "HF" != I &&
                    (v.appendChild(g),
                    f.appendChild(T),
                    u.appendChild(v),
                    u.appendChild(f),
                    N.appendChild(u)),
                  b.appendChild(y),
                  b.appendChild(N),
                  (b.style.width = "100%"),
                  h.appendChild(b);
                var M = function(e, t) {
                  var a = cfg.COLOR.F_N;
                  return (
                    e > t
                      ? (a = cfg.COLOR.F_RISE)
                      : t > e && (a = cfg.COLOR.F_FALL),
                    a
                  );
                };
                (this.setFloaterData = function(o) {
                  if (
                    ((e = o.name || e || ""),
                    (k.innerHTML = e),
                    (n = o.time || n),
                    (a = o.data || a))
                  ) {
                    S.innerHTML = n;
                    var l = a,
                      c = Number(l.percent),
                      d = Number(l.price),
                      m = Number(l.prevclose),
                      p = Number(l.avg_price),
                      h = l.change,
                      u = 1 > d || 1 > p ? 4 : s;
                    "HK" == I || "US" == I || "HF" == I
                      ? (u = utils_util.strUtil.nfloat(d))
                      : "LSE" === I && (u = 3),
                      config.ennfloat && (u = config.nfloat),
                      (c = isNaN(c) ? "--" : (100 * c).toFixed(2)),
                      (D.innerHTML = d.toFixed(u)),
                      (w.innerHTML = r() ? "--" : p.toFixed(u)),
                      (x.innerHTML = h.toFixed(u) + "(" + c + "%)");
                    var v = 2;
                    utils_util.isCNK(config.symbol) && (v = 0),
                      (T.innerHTML = strUtil_ps(l.volume < 0 ? 0 : l.volume, v) + L),
                      (x.style.color = M(c, 0)),
                      (w.style.color = M(p - m, 0)),
                      (D.style.color = M(c, 0));
                  }
                }),
                  (this.body = h);
              }
              (a = new n()), (e = a);
            },
            h = function() {
              function e(e) {
                var t = utils_util_$C("div"),
                  a = utils_util_$C("div"),
                  i = utils_util_$C("span"),
                  r = utils_util_$C("span"),
                  n = e.isH,
                  o = 12,
                  s = function() {
                    if (
                      ((a.style.borderStyle = "dashed"),
                      (a.style.borderColor = cfg.COLOR.IVH_LINE),
                      (i.style.backgroundColor = r.style.backgroundColor =
                        cfg.COLOR[e.txtBgCN]),
                      (i.style.color = r.style.color = cfg.COLOR[e.txtCN]),
                      n)
                    )
                      (a.style.borderWidth = "1px 0 0 0"),
                        (t.style.width = a.style.width =
                          cfg.DIMENSION.getStageW() - cfg.DIMENSION.RIGHT_W + "px"),
                        (i.style.top = -(0.6 * cfg.STYLE.FONT_SIZE) + "px"),
                        (r.style.top = -(0.6 * cfg.STYLE.FONT_SIZE) + "px"),
                        (i.style.left = 0),
                        (r.style.left = cfg.DIMENSION.extend_draw
                          ? ""
                          : cfg.DIMENSION.getStageW() -
                            cfg.DIMENSION.RIGHT_W +
                            "px"),
                        (r.style.right = 0),
                        (i.style.width = r.style.width = cfg.DIMENSION.extend_draw
                          ? ""
                          : cfg.DIMENSION.posX + "px"),
                        (i.style.padding = "1px 0"),
                        (r.style.padding = "1px 0");
                    else {
                      a.style.borderWidth = "0 1px 0 0";
                      var o,
                        s,
                        l = cfg.DIMENSION.H_MA4K + cfg.DIMENSION.H_T_B;
                      cfg.DIMENSION.getStageH() < 0
                        ? ((o = subArea.clientHeight), (s = o - l))
                        : ((o = cfg.DIMENSION.getStageH() - B.clientHeight || 0),
                          (s = cfg.DIMENSION.h_t)),
                        (o -= l),
                        (o += cfg.DIMENSION.I_V_O),
                        (t.style.height = a.style.height = o + "px"),
                        (i.style.top = s + "px"),
                        (i.style.padding = "2px 2px 1px");
                    }
                  };
                (t.style.position = "absolute"),
                  (t.style.zIndex = cfg.PARAM.I_Z_INDEX - 2),
                  (i.style.position = r.style.position = a.style.position =
                    "absolute"),
                  (a.style.zIndex = 0),
                  (i.style.zIndex = r.style.zIndex = 1),
                  (i.style.font = r.style.font =
                    cfg.STYLE.FONT_SIZE + "px " + cfg.STYLE.FONT_FAMILY),
                  (i.style.whiteSpace = r.style.whiteSpace = "nowrap"),
                  (i.style.lineHeight = o + "px"),
                  (r.style.lineHeight = o + "px"),
                  e.txtA &&
                    (i.style.textAlign = e.txtA) &&
                    (r.style.textAlign = "left"),
                  e.txtBgCN &&
                    (i.style.backgroundColor = cfg.COLOR[e.txtBgCN]) &&
                    (r.style.backgroundColor = cfg.COLOR[e.txtBgCN]),
                  s(),
                  t.appendChild(i),
                  n && t.appendChild(r),
                  t.appendChild(a);
                var l = function(e) {
                  e
                    ? "" != t.style.display && (t.style.display = "")
                    : "none" != t.style.display && (t.style.display = "none");
                };
                (this.pv = function(e) {
                  if (
                    (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"),
                    (i.innerHTML = e.v || ""),
                    e.p
                      ? ((r.innerHTML = isNaN(Number(e.p.replace("%", "")))
                          ? "0.00%"
                          : e.p),
                        (r.style.display = ""))
                      : (r.style.display = "none"),
                    !isNaN(e.x))
                  ) {
                    var a = e.x + (e.ox || 0),
                      n = cfg.DIMENSION.getStageW();
                    t.style.left = a + "px";
                    var o = i.offsetWidth;
                    if ((0 >= o && (o = 112), o > 0)) {
                      var s = o >> 1;
                      e.x < s
                        ? (s = e.x)
                        : a + s > n - cfg.DIMENSION.posX &&
                          (s = a + o - n + cfg.DIMENSION.posX),
                        (i.style.left = -s + "px");
                    }
                  }
                  l(!0);
                }),
                  (this.display = l),
                  (this.body = t),
                  (this.resize = s),
                  l(!1);
              }
              (r = new e({
                isH: !0,
                txtCN: "P_TC",
                txtBgCN: "P_BG",
                txtA: "right"
              })),
                (n = new e({
                  isH: !1,
                  txtCN: "T_TC",
                  txtBgCN: "T_BG",
                  txtA: "center"
                })),
                V.appendChild(n.body);
            },
            u = function() {
              r.display(!1), n.display(!1), c.showFloater(!1);
            },
            g = function() {
              var e = X.getAllStock(),
                t = e[0].datas.length,
                a = 0;
              return (
                e[0].realLen >= 0 &&
                  (a =
                    5 == ee.end
                      ? e[0].realLen + cfg.datas.tDataLen * (t - 1)
                      : cfg.datas.tDataLen * (t - 1)),
                a
              );
            },
            b = function(e) {
              e > 2e3 && (e = g()),
                0 > e || (Y && Y.indirectI(e), Z && Z.indirectI(e));
            },
            y = function() {
              b(g()), Y && Y.allDraw();
            },
            k = !0,
            S = 0,
            D = 0,
            T = 0 / 0,
            M = 0 / 0;
          (this.iToD = function(a, o, l) {
            var d = a.x,
              m = a.ox || 0,
              p = a.y,
              h = a.oy || 0,
              g = a.mark,
              y = a.rmark,
              _ = a.e ? a.e.target : null;
            if (!l) {
              if (T == d && M == p) return;
              (T = d), (M = p);
            }
            if (_) {
              var O = _.style.height.split("px")[0];
              (0 > p || p > Number(O)) && ((d = 0 / 0), (p = 0 / 0));
            }
            var L,
              C = X.getAllStock(),
              A = C.length,
              P = H,
              q = A > 1,
              F = C[0].datas.length,
              $ = P * F,
              V = Math.floor((d * $) / cfg.DIMENSION.w_t);
            if (isNaN(d) && isNaN(p)) {
              if (((k = !0), u(), stbd(C[0].datas[F - 1][0].date, C[0].hq.date))) {
                var K;
                (K =
                  C[0].realLen >= 0
                    ? (P - 1) * (F - 1) + C[0].realLen
                    : Number.MAX_VALUE),
                  b(K);
              } else b(Number.MAX_VALUE);
              return void ne.onViewPrice();
            }
            (k = !1), (D = V);
            for (
              var G,
                z,
                W,
                B,
                j,
                Y,
                Z,
                Q,
                J,
                te = [],
                ae = Number.MAX_VALUE,
                ie = A;
              ie--;

            )
              if (((Z = C[ie].datas), (te = te.concat(Z)), Z)) {
                var re = Math.floor(V / P),
                  oe = V % P;
                if (!Z[re]) return;
                if (
                  ((Q = Z[re][oe]),
                  (Q.date = Z[re][0].date),
                  q && C[ie].dAdd <= 1)
                )
                  (J = Math.abs(Q.py - p)),
                    ae > J &&
                      ((z = ie),
                      (ae = J),
                      (L = Q),
                      (W = C[ie]),
                      (B = C[ie].getName()),
                      (j = C[ie].getStockType())),
                    (y = G = o ? (100 * g).toFixed(2) + "%" : g.toFixed(s));
                else {
                  switch (
                    ((z = ie),
                    (W = C[ie]),
                    (B = C[ie].getName()),
                    (j = C[ie].getStockType()),
                    I)
                  ) {
                    case "HK":
                    case "US":
                    case "HF":
                      (Y = config.ennfloat ? s : utils_util.strUtil.nfloat(g)),
                        (G = g.toFixed(Y));
                      break;
                    case "LSE":
                      (Y = config.ennfloat ? s : 3), (G = g.toFixed(Y));
                      break;
                    default:
                      G = g.toFixed(
                        (1 > g && g > 0) || (g > -1 && 0 > g) ? 4 : s
                      );
                  }
                  (G = g > 99999 ? Math.floor(g) : g > 9999 ? g.toFixed(1) : G),
                    (L = Q);
                }
              }
            var se = Q && Q.date;
            S = 0 == C[0].realLen ? 0 : C[0].realLen - 1;
            var le = "string" != typeof C[0].date ? dateUtil.ds(C[0].date) : C[0].date;
            if (F > 1) {
              W.realLen < 0 && (W.realLen = H);
              var ce = $ - P + W.realLen;
              5 == ee.end && V >= ce && ((V = ce), (L = te[re][V % H]));
            } else {
              if (dateUtil.stbd(se, dateUtil.sd(le)))
                -1 === W.realLen && (W.realLen = H),
                  V >= W.realLen && (V = W.realLen);
              else
                switch (I) {
                  case "HF":
                  case "NF":
                    V >= W.realLen && 4 == ee.start && (V = W.realLen);
                    break;
                  default:
                    S = H - 1;
                }
              R(I) &&
              dateUtil.stbd(se, dateUtil.sd(le)) &&
              W.hq &&
              W.hq.time >= "09:00" &&
              W.hq.time < "09:30"
                ? (L = {
                    price: W.hq.preopen,
                    avg_price: W.hq.preopen,
                    prevclose: W.hq.prevclose,
                    percent: (W.hq.open - W.hq.prevclose) / W.hq.prevclose,
                    change: W.hq.preopen - W.hq.price,
                    volume: W.hq.totalVolume,
                    ix: 0.1,
                    time: W.hq.time
                  })
                : ((L = W.datas[0][V]),
                  (L.prevclose = W.datas[0][0].prevclose));
            }
            if (L && (L.date || (L.date = se), !L || L.date)) {
              var de = d;
              cfg.custom.stick && (d = L.ix || d);
              var me, pe;
              "HF" == I
                ? ((me = w.time[0][0]),
                  me > L.time
                    ? ((me = L.date),
                      (pe = new Date(me)),
                      pe.setDate(pe.getDate() + 1))
                    : (pe = L.date))
                : "NF" == I
                ? ((me = x.time[0][0]),
                  me <= L.time && "21:00" == me
                    ? ((me = L.date),
                      (pe = new Date(me)),
                      pe.setDate(pe.getDate() - 1),
                      0 == pe.getDay() && pe.setDate(pe.getDate() - 2))
                    : L.time < "03:00" && 1 == L.date.getDay()
                    ? ((pe = new Date(L.date)), pe.setDate(pe.getDate() - 2))
                    : (pe = L.date))
                : (pe = L.date);
              var he =
                utils_util.dateUtil.ds(pe, "/", !1) +
                "/" +
                utils_util.dateUtil.nw(pe.getDay()) +
                (L.time || "");
              ("GOODS" === I || "hf_CHA50CFD" === config.symbol || "HF" === I) &&
                (he = L.time || "--"),
                (L.day = he),
                e &&
                  (e.setFloaterData({
                    stocktype: j,
                    name: B,
                    time: he,
                    data: L
                  }),
                  c.pv({
                    x: de,
                    y: cfg.DIMENSION.T_F_T
                  })),
                r.pv({
                  y: p,
                  oy: h,
                  v: G,
                  p: y
                }),
                n.pv({
                  v: he,
                  x: d,
                  ox: m,
                  y: cfg.DIMENSION.H_MA4K
                }),
                b(V),
                ne.onViewPrice(L, V, B, !k),
                E.re(globalCfg.e.I_EVT, a.e);
            }
          }),
            (this.globalDragHandler = function(e, t, a, i, r) {
              isNaN(e) && isNaN(t) && E.re(globalCfg.e.I_EVT, r);
            }),
            (this.shortClickHandler = function() {
              ne.shortClickHandler();
            }),
            (this.zoomView = function() {}),
            p(),
            h(),
            (this.onResize = function() {
              r.resize(), n.resize();
            }),
            (this.iHLineO = r),
            (this.hideIUis = u),
            (this.iToKb = function(e) {
              (D += e), (S = D);
              var t = X.getAllStock(),
                a = t[0].datas.length,
                i = t[0].datas[0][D],
                r = t.length,
                n = t[0].realLen,
                o = "string" != typeof t[0].date ? dateUtil.ds(t[0].date) : t[0].date;
              1 >= a
                ? dateUtil.stbd(t[0].datas[0][0].date, dateUtil.sd(o))
                  ? 0 > n && (n = H)
                  : (n = H)
                : dateUtil.stbd(t[0].datas[a - 1][0].date, dateUtil.sd(o)) || (n = H);
              var s = H > n ? n + 1 : n;
              if (0 > D) {
                var l = H > n ? n : n - 1;
                (S = D = (a - 1) * H + l), (i = t[0].datas[a - 1][l]);
              } else if (D >= s + (a - 1) * H)
                if (dateUtil.stbd(t[0].datas[a - 1][0].date, dateUtil.sd(o)) && 0 > e) {
                  var c = 0;
                  (c = a > 1 ? n - 1 + H * (a - 1) : n - 1),
                    (S = D = c),
                    (i = t[0].datas[0][S]);
                } else (S = D = 0), (i = t[0].datas[0][0]);
              !fCONTAINS(K, iMgr.iHLineO.body) && K.appendChild(iMgr.iHLineO.body);
              var d = Math.floor(S / H);
              D >= H && (i = t[0].datas[d][S - d * H]),
                (i.date = t[0].datas[d][0].date);
              var p = r > 1 ? i.percent : i.price,
                h = {
                  idx: D,
                  name: t[0].getName(),
                  mark: p,
                  datas: t[0].datas,
                  data: i,
                  x: i.ix,
                  y: i.py,
                  oy: cfg.DIMENSION.H_MA4K,
                  ox: cfg.DIMENSION.posX
                };
              this.iToD(h, !0, !0);
            }),
            (this.isIng = function() {
              return !k;
            }),
            (this.isMoving = function() {
              return !1;
            }),
            (this.iReset = function() {}),
            (this.patcher = new (function() {
              var i,
                r = {},
                n = function() {
                  if (i) {
                    e.body.parentNode && e.body.parentNode.removeChild(e.body);
                    var t = "vid_" + ee.viewId;
                    if (i[t]) {
                      var n;
                      (n = r[t] ? r[t] : (r[t] = new i[t]())), (e = n);
                    } else e = a;
                  } else e = a;
                  !fCONTAINS(V, e.body) && V.appendChild(e.body);
                };
              (this.customFloater = function(e) {
                (i = e), n(), utils_util.stc("t_fl", e);
              }),
                (this.switchFloater = n);
            })()),
            (this.update = function() {
              var a = X.getAllStock();
              if (a) {
                var i,
                  r = a[0],
                  n = r.datas.length,
                  s = 0;
                if (r) {
                  if (
                    (D > n * (H - 1) && (D = 0),
                    (i = Math.floor(D / (H - 1))),
                    n == i && (i -= 1),
                    D > H - 1)
                  ) {
                    var l = D - H * i;
                    s =
                      stbd(r.datas[i][0].date, r.hq.date) && l > S ? r.realLen : l;
                  } else s = 1 == n && 0 == i && D > S ? r.realLen : D;
                  if (
                    ((i = 0 > i ? 0 : i),
                    (s = 0 > s ? 0 : s),
                    (o = r.datas[i][s]))
                  )
                    if (
                      ((o.day =
                        utils_util.dateUtil.ds(r.datas[i][0].date, "/", !1) +
                        "/" +
                        utils_util.dateUtil.nw(r.datas[i][0].date.getDay()) +
                        (o.time || "")),
                      e && e.setFloaterData({}),
                      k)
                    )
                      if (stbd(r.datas[n - 1][0].date, r.hq.date))
                        (s = r.realLen >= 0 ? r.realLen : H - 1),
                          (s += (n - 1) * H),
                          (s = 0 > s ? Number.MAX_VALUE : s),
                          b(s);
                      else {
                        if ("NF" == I && r.hq.time >= "21:00")
                          return (
                            r.realLen >= 0 && (s = r.realLen),
                            void (
                              4 == ee.start &&
                              5 == ee.end &&
                              ne.onViewPrice(o, s, void 0, !k)
                            )
                          );
                        y();
                      }
                    else if ("HF" == I)
                      4 == ee.start &&
                        5 == ee.end &&
                        ne.onViewPrice(o, s, void 0, !k);
                    else if ("NF" == I) {
                      var c = new Date(o.date);
                      o.date &&
                        o.time >= "21:00" &&
                        (c.setDate(
                          1 == o.date.getDay()
                            ? c.getDate() - 3
                            : c.getDate() - 1
                        ),
                        (o.day =
                          utils_util.dateUtil.ds(c, "/", !1) +
                          "/" +
                          utils_util.dateUtil.nw(c.getDay()) +
                          (o.time || ""))),
                        ne.onViewPrice(o, s, void 0, !k);
                    } else ne.onViewPrice(o, s, void 0, !k);
                }
              }
            });
        })();
      return (
        (n = new (function() {
          var e = this,
            a = function(a, i) {
              if (cfg.hasOwnProperty(a)) {
                for (var r in i)
                  if (i.hasOwnProperty(r) && utils_util.isFunc(i[r]))
                    return void utils_util.trace.error("illegal operation:", r);
                "DIMENSION" == a && (ie = 1),
                  utils_util_oc(cfg[a], i),
                  utils_util.stc(a, i),
                  e.resize();
              } else utils_util.trace.error("not exist param:", a);
            },
            r = function(e, a) {
              var i;
              if (cfg.hasOwnProperty(e)) {
                i = utils_util.clone(cfg[e]);
                for (var r in i)
                  if (i.hasOwnProperty(r) && utils_util.isFunc(i[r]))
                    (i[r] = null), delete i[r];
                  else if (a)
                    for (var n = a.length; n--; )
                      typeof i[r] === a[n] && ((i[r] = null), delete i[r]);
              }
              return i;
            },
            n = function(e, t, a) {
              (a = utils_util_oc(
                {
                  toremove: !1,
                  isexclusive: !1,
                  callback: void 0
                },
                a
              )),
                a.toremove
                  ? X.mM.removeAC(t, e)
                  : a.isexclusive
                  ? (X.mM.removeAC(null, e), X.mM.newAC(t, e, a))
                  : X.mM.newAC(t, e, a);
            },
            o = function(e) {
              (ee.viewId = e), (ee.start = 1 == e ? 4 : 0), (ee.end = 5);
            };
          this.pushData = function(e, a) {
            !utils_util.isArr(e) && (e = [e]), X.pushData(e, a);
          };
          var s;
          (this.pushTr = function(e) {
            e &&
              e.data &&
              (clearTimeout(s),
              (s = setTimeout(function() {
                var t = e.data.split(","),
                  a = e.symbol,
                  i = e.market,
                  r = {
                    symbol: a,
                    data: t[t.length - 1],
                    market: i
                  };
                X.pushData([r], 1);
              }, 20)));
          }),
            (this.setScale = function(e) {
              X.setScale(e), utils_util.stc("t_scale", e);
            });
          var l = !0;
          this.showView = function(e, a) {
            iMgr.hideIUis(), l ? (l = !1) : J.hide();
            var r = globalCfg.URLHASH.vi(e);
            if (config.date) return (config.date = ""), o(r), void this.newSymbol(config);
            var n = X.getAllStock()[0];
            if (
              (ne.onRange(n),
              utils_util.stc("t_v", e),
              utils_util.suda("vw", e),
              ee.viewId != r)
            ) {
              if ((o(r), ("HF" == I || "NF" == I) && "t5" == e && 0 == C))
                return J.show(), (C = 1), void X.update5Data(e);
              X.onChangeView(!1, a), ne && ne.onViewPrice();
            }
          };
          var d = function(e) {
              var a;
              return (a = utils_util.isStr(e.symbol)
                ? e.symbol.split(",")
                : [e.symbol]);
            },
            m = [];
          (this.overlay = function(e, t) {
            if (X && 1 != X.dAdd)
              if (t) {
                X.removeCompare(d(e));
                for (var a = 0; a < m.length; a++)
                  e.symbol == m[a] && m.splice(a, 1);
                X.getAllStock().length <= 1 && (X.dAdd = 0);
              } else
                (config.overlaycolor = e.linecolor || {
                  K_N: "#cccccc"
                }),
                  (X.dAdd = 2),
                  X.compare(e),
                  m.push(e.symbol);
          }),
            (this.compare = function(e, a) {
              if (X) {
                var i,
                  r = 0;
                if (a) {
                  if (
                    ((i = utils_util.isStr(e) ? e.split(",") : [e.symbol]),
                    1 == X.dAdd && X.removeCompare(i),
                    X.getAllStock().length <= 1)
                  ) {
                    for (r = 0; r < m.length; r++)
                      (X.dAdd = 2),
                        X.compare({
                          symbol: m[r]
                        });
                    m.length < 1 && (X.dAdd = 0);
                  }
                } else
                  2 == X.dAdd && X.removeCompare(m),
                    (X.dAdd = 1),
                    X.compare(e),
                    utils_util.suda("t_comp");
                utils_util.stc("t_comp", {
                  rm: a,
                  o: e
                });
              }
            });
          var p = 0;
          this.tCharts = function(e, a) {
            n("tech", e, a),
              a && !a.noLog && (0 == p ? (p = 1) : utils_util.sudaLog());
          };
          var h = 0;
          (this.pCharts = function(e, a) {
            n("price", e, a),
              a && !a.noLog && (0 == h ? (h = 1) : utils_util.sudaLog());
          }),
            (this.showPCharts = function(e) {
              e && (X.mM.togglePt(e), utils_util.stc("t_sp", e));
            }),
            (this.getIndicators = function() {
              var e = Y ? Y.getLog() : null,
                t = Z ? Z.getLog() : null;
              return {
                tCharts: e,
                pCharts: t
              };
            });
          var f;
          (this.showRangeSelector = function(e) {
            (f = utils_util_oc(
              {
                dispaly: !0,
                from: void 0,
                to: void 0
              },
              e
            )),
              X.mM.showRs(f),
              utils_util.stc("t_rs", e);
          }),
            (this.setLineStyle = function(e) {
              X && X.setTLineStyle(e), utils_util.stc("t_style", e);
            }),
            (this.setCustom = fBind(a, this, "custom")),
            (this.setDimension = fBind(a, this, "DIMENSION")),
            (this.getDimension = fBind(r, null, "DIMENSION", ["boolean"])),
            (this.setTheme = function(e) {
              var t = initMgr.initTheme(e);
              t &&
                (this.setLineStyle({
                  linecolor: e
                }),
                this.resize());
            }),
            (this.newSymbol = function(e) {
              if (
                ((config.symbol = e.symbol),
                (config.date = e.date),
                iMgr.hideIUis(),
                iMgr.iReset(),
                X.dcReset(),
                X.dcInit(config),
                q.hideTip(),
                Y)
              ) {
                var a = Y.getLog();
                (Y = null), a && this.tCharts(a);
              }
              if (Z) {
                var r = Z.getLog();
                (Z = null), r && this.pCharts(r);
              }
              f && ((f.from = void 0), (f.to = void 0), X.mM.showRs(f)),
                utils_util.stc("t_ns", e);
            }),
            (this.resize = function(e, t) {
              initMgr.resizeAll(!0, e, t);
            }),
            (this.hide = function(e) {
              (ae = !0),
                iMgr.hideIUis(),
                utils_util.$CONTAINS($, V) && $.removeChild(V),
                e && X.dcReset();
            }),
            (this.show = function(e) {
              (ae = !1),
                e && (utils_util.isStr(e) && (e = f$DOM(e)), ($ = e)),
                utils_util.$CONTAINS($, V) ||
                  ($.appendChild(V), initMgr.resizeAll(!0)),
                ne && ne.onViewPrice();
            }),
            (this.shareTo = function(e) {
              X.shareTo(e), utils_util.stc("t_share", e);
              var a = e && e.type ? e.type : "weibo";
              utils_util.suda("share", a);
            }),
            (this.getChartId = function() {
              return cfg.uid;
            }),
            (this.dateTo = function(e, a) {
              (config.historytime = e), (config.historycb = a);
              var r = e;
              "object" == typeof e ? (r = dateUtil.ds(e, "-")) : (e = dateUtil.sd(e));
              var n = j.get();
              if (null == n) return void (O = 1);
              for (var o = n.length, s = 0; o > s; s++)
                if (dateUtil.stbd(e, n[s][0].date))
                  return void X.moving(s, s + 1, "dateTo");
              (config.date = r),
                (X.hasHistory = a),
                utils_util.stc("t_ft", r),
                this.newSymbol(config);
            }),
            (this.showScale = function(e) {
              X && X.setScale(e);
            }),
            (this.resize = function(e, t) {
              initMgr.resizeAll(!0, e, t);
            }),
            (this.showCompatibleTip = function(e) {
              initMgr.showCompatibleTip(e);
            }),
            (this.toggleExtend = function(e) {
              var t,
                i = cfg.DIMENSION.posX;
              (t = e ? "on" == !e : cfg.DIMENSION.extend_draw),
                a.call(this, "DIMENSION", {
                  extend_draw: !t,
                  posX: i > 9 ? cfg.DIMENSION.extend_padding : 55,
                  RIGHT_W: i > 9 ? cfg.DIMENSION.extend_padding : 55
                }),
                this.resize();
            }),
            (this.historyData = function() {
              return X.historyData;
            }),
            (this.getExtraData = function(e) {
              return X.getExtraData(e);
            }),
            (this.patcher = {
              iMgr: iMgr.patcher
            }),
            (this.zoom = function(e) {
              X.zoomApi(e), utils_util.stc("t_zoom", e, 9e3);
            }),
            (this.move = function(e) {
              (e = parseInt(e)),
                isNaN(e) || (X.moveApi(e), utils_util.stc("t_move", e, 9e3));
            }),
            (this.getSymbols = function() {
              return X.getAllSymbols();
            }),
            (this.update = function() {
              X.updateDataAll(1), utils_util.stc("t_up", "update", 9e3);
            }),
            (this.getCurrentData = function() {
              return ne.currentData();
            }),
            (this.viewState = ee),
            (this.me = E),
            (this.type = "h5t");
        })()),
        (X = new D()),
        X.dcInit(config),
        n
      );
    }
    function chart_h5t$() {
        console.log('test');
      function e(config, callback) {
        var r = new chart_h5t(config),
          n = function(e) {
            r.me.rl(e, n);
          };
        r.me.al(globalCfg.e.T_DATA_LOADED, n), utils_util.isFunc(callback) && callback(r);
      }
      this.get = function(config, callback) {
        utils_util.stc("h5t_get"),
          utils_util.suda("h5t_" + utils_util.market(config.symbol));
        var r;
        0 == location.protocol.indexOf("https:") && (r = !0);
        var n = utils_util.market(config.symbol),
          o =
            "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InterfaceInfoService.getMarket?category=$market&symbol=$symbol",
          s =
            "//stock.finance.sina.com.cn/usstock/api/jsonp.php/var $cb=/Global_IndexService.getTradeTime?symbol=$symbol&category=index";
        switch ((r && (o = utils_util.getSUrl(o)), n)) {
          case "HF":
            var l = "kke_future_" + config.symbol;
            utils_util.load(
              o
                .replace("$symbol", config.symbol.replace("hf_", ""))
                .replace("$market", "hf")
                .replace("$cb", "var " + l),
              function() {
                (l = window[l] || {
                  time: [["06:00", "23:59"], ["00:00", "05:00"]]
                }),
                  (config._hf_window_var = l),
                  e(config, callback);
              },
              null,
              {
                symbol: config.symbol,
                market: n,
                type: "init_hf"
              }
            );
            break;
          case "NF":
            var c = "kke_future_" + config.symbol,
              d = config.symbol.replace("nf_", "").replace(/[\d]+$/, "");
            utils_util.load(
              o
                .replace("$symbol", d)
                .replace("$market", "nf")
                .replace("$cb", "var " + c),
              function() {
                (c = window[c] || {
                  time: [["09:30", "11:29"], ["13:00", "02:59"]]
                }),
                  (c.inited = 0),
                  (config._nf_window_var = c),
                  e(config, callback);
              },
              null,
              {
                symbol: config.symbol,
                market: n,
                type: "init_nf"
              }
            );
            break;
          case "global_index":
            var m = "kke_global_index_" + config.symbol;
            utils_util.load(
              s
                .replace("$symbol", config.symbol.replace("znb_", ""))
                .replace("$cb", m),
              function() {
                (m = window[m] || {
                  time: [["06:00", "23:59"], ["00:00", "05:00"]]
                }),
                  (config._gbi_window_var = m),
                  e(config, callback);
              },
              null,
              {
                symbol: config.symbol,
                market: n,
                type: "init_global"
              }
            );
            break;
          default:
            e(config, callback);
        }
      };
    }
    var n,
      o,
      pChart,
      tChart,
      f$DOM = utils_util.$DOM,
      utils_util_$C = utils_util.$C,
      fCONTAINS = utils_util.$CONTAINS,
      xh5_PosUtil = utils_util.xh5_PosUtil,
      xh5_EvtUtil = utils_util.xh5_EvtUtil,
      utils_util_oc = utils_util.oc,
      dateUtil = utils_util.dateUtil,
      stbd = utils_util.dateUtil.stbd,
      g = utils_util.xh5_ADJUST_HIGH_LOW.c,
      xh5_BrowserUtil = utils_util.xh5_BrowserUtil,
      fBind = utils_util.fBind,
      strUtil_ps = utils_util.strUtil.ps,
      globalCfg = cfgs_settinger.globalCfg,
      logoM = utils_util.logoM;
    return utils_util.fInherit(chart_h5t, utils_util.xh5_EvtDispatcher), chart_h5t$;
  }
);

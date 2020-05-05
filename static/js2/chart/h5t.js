function __RepairData(e) {
  this.VERSION = "1.0.4";
  var t = e,
    a = t.market.toLowerCase(),
    r = -1,
    i = 0,
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
            a)
          ) {
            case "nf":
            case "option_cn":
              (e.item.holdPosition = i), (e.item.avg_price = e.hq.prevclose);
              break;
            case "goods":
            case "otc":
              e.item.avg_price = e.hq.prevclose;
              break;
            case "hf":
              (e.item.price = e.one.prevclose || e.hq.prevclose),
                (e.item.avg_price = r);
          }
        else
          switch (((e.item.price = e.datas[e.index - 1].price), a)) {
            case "us":
              e.item.avg_price = e.datas[e.index].price;
              break;
            case "nf":
            case "option_cn":
              (e.item.holdPosition = e.datas[e.index - 1].holdPosition),
                (e.item.avg_price = e.datas[e.index - 1].avg_price);
              break;
            case "goods":
            case "otc":
            case "hk":
            case "cn":
            case "fund":
            case "msci":
            case "lse":
              e.item.avg_price = e.datas[e.index - 1].avg_price;
              break;
            case "hf":
              e.item.avg_price = r;
          }
        e.item.volume = i;
      },
      history: function(e, t) {
        var r,
          n = new Date(e.hq.today);
        for (n.setDate(n.getDate() - 1); 0 === n.getDay() && 6 === n.getDay(); )
          n.setDate(n.getDate() - 1);
        if (((r = __Utils.ds(n)), 0 === e.index))
          switch (
            ((e.item.prevclose = e.one.prevclose || e.one.price || 1),
            (e.item.price = e.one.prevclose),
            (e.item.date = e.one.date || r || "2019-01-03"),
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
          switch (((e.item.price = e.datas[e.index - 1].price), a)) {
            case "otc":
              e.item.avg_price = e.datas[e.index - 1].avg_price;
              break;
            case "nf":
            case "option_cn":
              (e.item.holdPosition = e.datas[e.index - 1].holdPosition),
                (e.item.avg_price = e.datas[e.index - 1].avg_price);
              break;
            case "hf":
              e.item.avg_price = t.forgePrice;
          }
        e.item.volume = i;
      },
    },
    s = function(e, t) {
      if (e.length > 1) {
        for (var a = 0; a < e.length - 1; a++)
          if (e[a][1] > e[a + 1][0]) {
            if (t > e[a][1]) return e[a][1];
            if (t < e[a + 1][0]) return e[a][1];
          } else if (t > e[a][1] && t < e[a + 1][0]) return e[a][1];
        return e[e.length - 1][1];
      }
      return e[e.length - 1][1];
    },
    o = {
      handle: function(e) {
        if (e.history) n.history(e, { zero: i, market: a, forgePrice: r });
        else {
          var t = e.times.indexOf(e.hq.time);
          if (-1 !== t) e.index <= t && n.current(e);
          else {
            var o = e.times.indexOf(s(e.tRange, e.hq.time));
            o > e.index && n.current(e);
          }
        }
      },
    },
    c = {
      common: function(e) {
        for (var a = [], r = 0, i = t.td5.length; i > r; r++) {
          var n = m(e) ? e : "moreHandle",
            s = l[n]({
              hq: t.hq,
              td1: t.td5[r],
              market: e,
              history: 1,
              timeRange: t.timeRange,
            });
          a.push(s);
        }
        for (; a.length < 5; ) {
          var o = a.length;
          if (o >= 1) {
            var c = a[0][0].date,
              d = __Utils.sd(c);
            for (
              d.setDate(d.getDate() - 1);
              0 === d.getDay() && 6 === d.getDay();

            )
              d.setDate(d.getDate() - 1);
            var p = __Utils.ds(d),
              u = __Utils.lf.makePerMarketData(t);
            a.unshift(__Utils.lf.makeNewData(1, a[0][0].prevclose, [p], u));
          }
        }
        return a;
      },
    },
    l = {
      xv: function(e, t, a) {
        (e.date = this.ty(t)),
          a ||
            ((e.price = t.price),
            (e.avg_price = t.price),
            (e.prevclose = t.prevclose),
            (e.volume = 0));
      },
      ty: function(e) {
        return "Date" === __Utils.tp(e.date) ? __Utils.ds(e.date) : e.date;
      },
      commonHandle: function(e, t) {
        var a,
          i = [],
          n = __Utils.lf.makePerMarketData(e);
        return (
          n.forEach(function(e, a) {
            var n = { price: r, avg_price: r, time: e, volume: r };
            "nf" === t.toLowerCase() && (n.holdPosition = r),
              0 === a && ((n.date = r), (n.prevclose = r)),
              i.push(n);
          }),
          e.hq ||
            (e.hq = {
              time: "09:00",
              price: 1,
              prevclose: 1,
              date: __Utils.ds(new Date()),
            }),
          (a =
            (e.td1 && e.td1.length <= 0) || !e.td1
              ? this.noData(e)
              : this[t.toLowerCase() + "Parse"](e)),
          {
            times: n,
            datas: i,
            forge: r,
            one: a,
            hqIndex: n.indexOf(e.hq.time),
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
          holdPosition: 0,
        };
        return e.hq
          ? {
              price: e.hq.price,
              prevclose: e.hq.prevclose,
              avg_price: e.hq.price,
              date: e.hq.date,
              volume: e.hq.totalVolume || 0,
              holdPosition: 0,
            }
          : t;
      },
      fundParse: function(e) {
        return {
          price: 1 * e.td1[0].price,
          prevclose: 1 * e.td1[0].prevclose || e.hq.prevclose,
          avg_price: 1 * e.td1[0].avg_price,
          date: e.hq.date,
          volume: r,
        };
      },
      hkParse: function(e) {
        return {
          price: e.history ? 1 * e.td1[0].price : 1 * e.td1[0].p,
          prevclose: e.history ? 1 * e.td1[0].prevclose : e.hq.prevclose,
          avg_price: e.history
            ? 1 * e.td1[0].avg_price
            : 1 * e.td1[0].avg_price,
          date: e.history ? e.td1[0].date : e.hq.date,
          volume: e.history ? 1 * e.td1[0].volume : 1 * e.td1[0].v,
        };
      },
      usParse: function(e) {
        return {
          price: 1 * e.td1[0][3],
          prevclose: e.history
            ? 1 * e.td1[0][4] || 1 * e.td1[0][3]
            : e.hq.prevclose,
          avg_price: 1 * e.td1[0][3],
          date: e.history ? e.td1[0][5] : e.hq.date,
          volume: 1 * e.td1[0][1],
        };
      },
      lseParse: function(e) {
        return {
          price: 1 * e.td1[0].p,
          prevclose: e.hq.prevclose,
          avg_price: 1 * e.td1[0].a,
          date: e.hq.date,
          volume: 1 * e.td1[0].v,
        };
      },
      otcParse: function(e) {
        return {
          price: 1 * e.td1[0].p,
          prevclose: e.hq.prevclose,
          avg_price: 1 * e.td1[0].avg,
          date: e.hq.date,
          volume: 1 * e.td1[0].v,
        };
      },
      nfParse: function(e) {
        return {
          price: 1 * e.td1[0][1],
          prevclose: 1 * e.td1[0][5] || 1 * e.td1[0][1],
          avg_price: 1 * e.td1[0][2] || 1 * e.td1[0][1],
          date: e.td1[0][6],
          volume: 1 * e.td1[0][3],
          holdPosition: 1 * e.td1[0][4],
        };
      },
      hfParse: function(e) {
        return {
          price: 1 * e.td1[0][5],
          prevclose: 1 * e.td1[0][1] || 1 * e.td1[0][5],
          avg_price: r,
          date: e.td1[0][0],
          volume: 1 * e.td1[0][6],
        };
      },
      msciParse: function(e) {
        return {
          price: 1 * e.td1[0].price,
          prevclose: e.hq.prevclose,
          avg_price: r,
          date: e.hq.date,
          volume: 0,
        };
      },
      global_indexParse: function(e) {
        return {
          price: 1 * e.td1[0][1],
          prevclose: 1 * e.td1[0][5] || 1 * e.td1[0][1],
          avg_price: 1 * e.td1[0][2],
          date: e.td1[0][4],
          volume: e.td1[0][3],
        };
      },
      goodsParse: function(e) {
        return {
          price: 1 * e.td1[0][1],
          prevclose: 1 * e.td1[0][4] || 1 * e.td1[0][1],
          avg_price: 1 * e.td1[0][2] || 1 * e.td1[0][1],
          date: e.td1[0][5],
          volume: 1 * e.td1[0][3],
        };
      },
      option_cnParse: function(e) {
        return {
          price: 1 * e.td1[0].p,
          prevclose: e.history
            ? 1 * e.td1[0].prevclose || 1 * e.td1[0].p
            : e.hq.prevclose,
          avg_price: 1 * e.td1[0].a,
          date: e.td1[0].d,
          volume: e.td1[0].v,
        };
      },
      commonSecond: function(e, t) {
        t.td1 || (t.td1 = []);
        for (var i, n = 0, c = 0; c < e.datas.length; c++) {
          if (((i = e.datas[c]), !t.history))
            if (-1 !== e.hqIndex) {
              if (c > e.hqIndex) break;
            } else if (
              ((e.hqIndex = e.times.indexOf(s(t.timeRange, t.hq.time))),
              c > e.hqIndex)
            )
              break;
          for (var l, d = n; d < t.td1.length; d++)
            if (((l = t.td1[d]), "fund" === a)) {
              if (l.time === i.time) {
                (i.price = Number(l.price)),
                  0 === c &&
                    ((i.prevclose = t.hq.prevclose), (i.date = t.hq.date)),
                  n++;
                break;
              }
            } else if ("hk" === a) {
              if (l.m === i.time + ":00") {
                (i.price = Number(t.history ? l.price : l.p)),
                  (i.avg_price = Number(t.history ? l.price : l.avg_price)),
                  (i.volume = Number(t.history ? l.volume : l.v)),
                  0 === c &&
                    (0 === d
                      ? ((i.prevclose = t.history
                          ? Number(l.prevclose)
                          : t.hq.prevclose),
                        (i.date = t.history ? l.date : t.hq.date))
                      : ((i.prevclose = t.history
                          ? Number(t.td1[0].prevclose)
                          : t.hq.prevclose),
                        (i.date = t.history ? t.td1[0].date : t.hq.date))),
                  n++;
                break;
              }
            } else if ("option_cn" === a) {
              if (l.i === i.time + ":00") {
                (i.price = t.history
                  ? Number(l.p)
                  : Number(l.p) <= 0
                  ? t.hq.price
                  : Number(l.p)),
                  (i.volume = Number(l.v)),
                  (i.avg_price = Number(l.a)),
                  (i.holdPosition = Number(l.t)),
                  0 === c &&
                    (0 === d
                      ? ((i.prevclose = Number(l.p)), (i.date = l.d))
                      : ((i.avg_price = t.history
                          ? Number(t.td1[0].a)
                          : Number(l.a) <= 0
                          ? t.hq.prevclose
                          : Number(l.a)),
                        (i.prevclose = t.history
                          ? Number(t.td1[0].p)
                          : t.hq.prevclose),
                        (i.date = t.td1[0].d))),
                  n++;
                break;
              }
            } else if ("us" === a) {
              if (l[0] === i.time + ":00") {
                (i.price = Number(l[3])),
                  (i.volume = Number(l[1])),
                  (i.avg_price = Number(l[3])),
                  0 === c &&
                    (0 === d
                      ? ((i.prevclose = t.history
                          ? Number(l[4]) || Number(l[3])
                          : t.hq.prevclose),
                        (i.date = t.history ? l[5] : t.hq.date))
                      : ((i.prevclose = t.history
                          ? Number(t.td1[0][4]) || Number(t.td1[0][3])
                          : t.hq.prevclose),
                        (i.date = t.history ? t.td1[0][5] : t.hq.date))),
                  n++;
                break;
              }
            } else if ("otc" === a)
              l.m === i.time + ":00" &&
                ((i.price = Number(l.p)),
                (i.avg_price = Number(l.avg)),
                (i.volume = Number(l.v)),
                0 === c &&
                  ((i.prevclose = t.hq.prevclose), (i.date = t.hq.date)));
            else if ("lse" === a) {
              if (l.m === i.time + ":00") {
                (i.price = Number(l.p)),
                  (i.avg_price = Number(l.a)),
                  (i.volume = Number(l.v)),
                  0 === c &&
                    ((i.prevclose = t.hq.prevclose), (i.date = t.hq.date)),
                  n++;
                break;
              }
            } else if ("global_index" === a) {
              if (l[0] === i.time) {
                (i.price = Number(l[1])),
                  (i.avg_price = Number(l[2])),
                  (i.volume = Number(l[3])),
                  0 === c &&
                    ((i.date = t.td1[0][4] || t.hq.date),
                    (i.prevclose = t.hq.prevclose)),
                  n++;
                break;
              }
            } else if ("msci" === a) {
              if (l.m === i.time) {
                (i.price = Number(1 * l.p)),
                  (i.avg_price = r),
                  (i.volume = 0),
                  0 === c &&
                    ((i.date = t.hq.date), (i.prevclose = t.hq.prevclose)),
                  n++;
                break;
              }
            } else if (l[0] === i.time) {
              (i.price = Number(l[1])),
                (i.avg_price = Number(l[2]) || Number(l[1])),
                (i.volume = Number(l[3])),
                "nf" === a && (i.holdPosition = Number(l[4])),
                0 === c &&
                  (0 === d
                    ? "goods" === a
                      ? ((i.date = l[5]),
                        (i.prevclose = Number(l[4]) || Number(l[1])))
                      : ((i.date = l[6]),
                        (i.prevclose = Number(l[5]) || Number(l[1])))
                    : "goods" === a
                    ? ((i.date = t.td1[0][5]),
                      (i.prevclose =
                        Number(t.td1[0][4]) || Number(t.td1[0][1])))
                    : ((i.date = t.td1[0][6]),
                      (i.prevclose =
                        Number(t.td1[0][5]) || Number(t.td1[0][1])))),
                n++;
              break;
            }
          i.price === r &&
            o.handle({
              history: t.history,
              one: e.one,
              hq: t.hq,
              datas: e.datas,
              item: i,
              times: e.times,
              index: c,
              tRange: t.timeRange,
            });
        }
        return e.datas;
      },
      moreHandle: function(e) {
        var t = this.commonHandle(e, a),
          r = this.commonSecond(t, e);
        return (p(a) || ("hk" === a && e.history)) && __Utils.produceAvg(r), r;
      },
      hf: function(e) {
        var t = this.commonHandle(e, a);
        if (0 === t) return [];
        for (var n, c = this.ty(e.hq), l = 0, d = 0; d < t.datas.length; d++) {
          if (((n = t.datas[d]), -1 !== t.hqIndex)) {
            if (d > t.hqIndex) break;
          } else if (
            ((t.hqIndex = t.times.indexOf(s(e.timeRange, e.hq.time))),
            d > t.hqIndex)
          )
            break;
          for (var p, m = l; m < e.td1.length; m++) {
            var u = 0 === m ? 4 : 0;
            if (((p = e.td1[m]), p[u] === n.time)) {
              0 === d
                ? ((n.price = 1 * p[5] ? 1 * p[5] : 1 * p[1]),
                  (n.volume = 1 * p[6] || i),
                  (n.avg_price = r),
                  0 === m
                    ? ((n.date = p[0] || c),
                      (n.prevclose = e.hq.prevclose || 1 * p[1]))
                    : ((n.date = e.td1[0][0] || c),
                      (n.prevclose = e.hq.prevclose || 1 * p[1]),
                      (n.price = 1 * e.td1[0][5]),
                      (n.volume = 1 * e.td1[0][6])))
                : 0 === m
                ? n.price < 0 &&
                  ((n.price = 1 * p[5]),
                  (n.avg_price = r),
                  (n.volume = 1 * p[6]))
                : n.price < 0 &&
                  ((n.price = 1 * p[1]),
                  (n.avg_price = r),
                  (n.volume = 1 * p[2])),
                l++;
              break;
            }
          }
          n.price === r &&
            o.handle({
              one: t.one,
              hq: e.hq,
              datas: t.datas,
              item: n,
              times: t.times,
              index: d,
              tRange: e.timeRange,
            });
        }
        return __Utils.produceAvg(t.datas), t.datas;
      },
    },
    d = { td1: [], td5: [] },
    p = function(e) {
      return -1 !== ["fund", "global_index"].indexOf(e);
    },
    m = function(e) {
      return (
        -1 ===
        [
          "us",
          "hk",
          "nf",
          "goods",
          "msci",
          "global_index",
          "lse",
          "otc",
          "option_cn",
          "fund",
        ].indexOf(e)
      );
    },
    u = function() {
      var e = a;
      (d.td1 = m(e) ? l[e](t) : l.moreHandle(t)),
        t.td5 && ((d.td5 = []), (d.td5 = c.common(e)));
    };
  return u(), d;
}
var __Utils = {
  tp: function(e) {
    return toString.call(e).slice(8, -1);
  },
  mr: {
    cn: [
      ["09:30", "11:29"],
      ["13:00", "15:00"],
    ],
    hk: [
      ["09:30", "11:59"],
      ["13:00", "16:00"],
    ],
    us: [["9:30", "16:00"]],
    uk: [["8:00", "16:30"]],
    repo: [
      ["9:30", "11:29"],
      ["13:00", "15:30"],
    ],
    goods: [
      ["20:00", "23:59"],
      ["00:00", "02:29"],
      ["09:00", "15:30"],
    ],
    msci: [
      ["07:00", "23:59"],
      ["00:00", "06:00"],
    ],
    nf: void 0,
    hf: void 0,
    gb: void 0,
    custom: void 0,
  },
  produceAvg: function(e) {
    for (
      var t, a = 0, r = 0;
      r < e.length && ((t = e[r]), !(t.price <= 0));
      r++
    )
      (a += t.price), (t.avg_price = a / (r + 1));
  },
  lf: {
    split: function() {
      return String.prototype.split.call(arguments[0], arguments[1]);
    },
    makeNewData: function(e, t, a, r, i) {
      for (
        var n, s = [], o = r, c = o.length, l = 0, d = 0, p = 0, m = e * c;
        m > d;
        d++
      )
        (n = {
          time: o[d % c],
          price: l,
          avg_price: l,
          volume: l,
          holdPosition: l,
        }),
          d % c == 0 && a && ((n.date = a[p]), p++),
          s.push(n),
          i || (s[d].price = s[d].avg_price = t);
      return (
        (s[0].price = s[0].avg_price = s[0].prevclose = t),
        (s[0].volume = l),
        (s[0].holdPosition = l),
        s
      );
    },
    fillZero: function(e) {
      return (
        (e = parseInt(Number(e))),
        0 > e ? "" : 10 > e ? "0" + String(e) : String(e)
      );
    },
    makeBunchArr: function(e, t) {
      for (var a = [], r = 60, i = e; t >= i; i++)
        a.push(this.fillZero(i / r) + ":" + this.fillZero(i % r));
      return a;
    },
    mixBunchArr: function(e) {
      for (var t, a, r, i, n, s, o, c = [], l = 0, d = e.length; d > l; l++)
        (t = e[l][0]),
          (a = e[l][1]),
          (n = t.split(":")),
          (s = a.split(":")),
          (r = 60 * Number(n[0]) + Number(n[1])),
          (i = 60 * Number(s[0]) + Number(s[1])),
          (o = this.makeBunchArr(r, i)),
          (c = c.concat(o));
      return c;
    },
    makePerMarketData: function(e) {
      return e.timeRange
        ? ((__Utils.mr.custom = e.timeRange), this.mixBunchArr(e.timeRange))
        : e.market
        ? this.mixBunchArr(__Utils.mr[e.market])
        : [];
    },
  },
  sd: function(e, t) {
    var a = e.split("-"),
      r = a[0],
      i = a[1] - 1 || 0,
      n = a[2] || 1,
      s = 0,
      o = 0,
      c = 0;
    return (
      t &&
        ((a = t.split(":")), (s = a[0] || 0), (o = a[1] || 0), (c = a[2] || 0)),
      new Date(r, i, n, s, o, c)
    );
  },
  ds: function(e, t, a, r, i, n) {
    "undefined" == typeof t && (t = "-");
    var s = [];
    if ((r || s.push(e[a ? "getUTCFullYear" : "getFullYear"]()), !i)) {
      var o = e[a ? "getUTCMonth" : "getMonth"]() + 1;
      s.push(10 > o ? "0" + o : o);
    }
    if (!n) {
      var c = e[a ? "getUTCDate" : "getDate"]();
      s.push(10 > c ? "0" + c : c);
    }
    return s.join(t);
  },
};
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
        R = function(a) {
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
        $ = function(e) {
          return p[g + e.year + e.month]
            ? void (t.isFunc(n) && n(p[g + e.year + e.month]))
            : void R(e);
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
                  : void $(i);
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
xh5_define(
  "chart.h5t",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(e, t, a) {
    "use strict";
    function i(i) {
      function r(e, a) {
        function r(e) {
          $.setDataRange(e),
            _ && (_.linkData(e), _.setDataRange()),
            k && (k.linkData(e), k.setDataRange()),
            D && (D.linkData(e), D.setDataRange());
        }
        function c() {
          a && (j = F),
            me.update(null, !0),
            "CN" === h && !/^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol);
        }
        e = u(
          {
            symbol: void 0,
            datas: {
              t1: { url: void 0, dataformatter: void 0 },
              t5: { url: void 0, dataformatter: void 0 },
            },
            linecolor: void 0,
            linetype: void 0,
          },
          e || {}
        );
        var d,
          m = this,
          h = t.market(e.symbol),
          b = function(e) {
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
          (this.marketNum = b),
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
          (this.nfloat = 0 === i.nfloat ? i.nfloat : i.nfloat || 2),
          (this.ennfloat = i.ennfloat),
          (this.market = h),
          (this.date = null),
          (this.hq = null),
          (this.futureTime = x || w || T),
          (this.gbiTime = T),
          (this.preData = { data: 0, vPos: null }),
          (this.needMarket = h),
          (this.changeMarket = function(e) {
            var a,
              i = [],
              r = e;
            if (((U = A.tcd(I)), b(m.needMarket) != b(I))) {
              (a = F.get()), (d = t.tUtil.gata(I));
              for (var n = 0; n < a.length; n++)
                b(m.needMarket) < b(I)
                  ? (i.push(A.aduk(a[n], m.market, I, C, a[n][0].date)),
                    (m.realLen = t.arrIndexOf(
                      d,
                      C.getHours() + ":" + t.strUtil.zp(C.getMinutes())
                    )),
                    m.realLen < 0 && (m.realLen = U))
                  : (i.push(A.rmuk(a[n], I, r)),
                    (m.realLen = t.arrIndexOf(
                      d,
                      C.getHours() + ":" + t.strUtil.zp(C.getMinutes())
                    )));
              (m.needMarket = I),
                F.initTState(i),
                (m.datas = i[4]),
                $.setDataRange(),
                $.createPlayingData();
            }
          });
        var _,
          k,
          D,
          L,
          C,
          q = new S(this, e);
        (this.getName = function() {
          return L || "";
        }),
          (this.getStockType = function() {
            var e;
            return m.hq && (e = m.hq.type), e || "";
          }),
          (this.viewState = ee);
        var F = new (function() {
            var a = {},
              r = { rsAmount: void 0 },
              n = function(e) {
                if (e) {
                  var r,
                    n = e.length,
                    o = [];
                  if ((t.clone(e, o), o.length > 5)) {
                    if (i.date) {
                      for (
                        var s,
                          l = Number(i.date.split("-")[2]),
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
                  } else (r = o), (a.tv = i.date ? 0 : 4), (a.tb = n);
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
                var a = i.ssl ? "https" : "http",
                  n =
                    a +
                    "://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol",
                  o = "KKE_ShareAmount_" + e.symbol;
                t.load(
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
                            date: v.sd(t.date),
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
            var e, t, a;
            (e = function() {
              (m.minPrice = Number.MAX_VALUE),
                (m.maxPrice = 0),
                (m.minPercent = Number.MAX_VALUE),
                (m.maxPercent = -Number.MAX_VALUE),
                (m.minavgPrice = Number.MAX_VALUE),
                (m.maxavgPrice = 0),
                (m.maxVolume = 0);
            }),
              (t = function() {
                function e(e) {
                  var t = Math.max(
                      Math.abs(e - m.maxPrice),
                      Math.abs(e - m.minPrice)
                    ),
                    a = Math.max(
                      Math.abs(e - m.maxavgPrice),
                      Math.abs(e - m.minavgPrice)
                    );
                  switch (
                    (t / e > 0.45 && "US" != I && (E.datas.scaleType = "price"),
                    t / e > 0.1 &&
                      "newstock" == E.datas.scaleType &&
                      (E.datas.scaleType = "price"),
                    E.datas.scaleType)
                  ) {
                    case "newstock":
                      (m.minPrice = Number(e) - 0.45 * e),
                        (m.maxPrice = Number(e) + 0.45 * e);
                      break;
                    case "tpct":
                      (m.minPrice =
                        m.minPrice < Number(e) - 0.1 * e
                          ? m.minPrice
                          : Number(e) - 0.1 * e),
                        (m.maxPrice =
                          m.maxPrice > Number(e) + 0.1 * e
                            ? m.maxPrice
                            : Number(e) + 0.1 * e);
                      break;
                    case "pct":
                      var i = m.maxPrice - m.minPrice;
                      (m.minPrice -= 0.05 * i), (m.maxPrice += 0.05 * i);
                      break;
                    case "price":
                    default:
                      (m.minPrice = Number(e) - Number(t)),
                        (m.maxPrice = Number(e) + Number(t)),
                        (m.minavgPrice = Number(e) - Number(a)),
                        (m.maxavgPrice = Number(e) + Number(a));
                  }
                  (m.maxPercent = Math.max((m.maxPrice - e) / e, 0)),
                    (m.minPercent = Math.min((m.minPrice - e) / e, 0)),
                    (m.maxavgPercent = Math.max((m.maxavgPrice - e) / e, 0)),
                    (m.minavgPercent = Math.min((m.minavgPrice - e) / e, 0));
                }
                (m.isCompare = X.getAllStock().length > 1), (m.dAdd = X.dAdd);
                var t;
                m.datas &&
                  0 == m.datas[0][0].volume &&
                  m.hq.time > "09:30" &&
                  "CN" == m.market &&
                  (t = m.datas[0][0].price),
                  (m.preData.data = m.hq.preopen
                    ? t
                      ? t
                      : m.hq.preopen
                    : m.preData.data);
                for (var a = 0, r = m.datas.length; r > a; a++) {
                  for (
                    var n,
                      o = Number(m.datas[0][0].prevclose),
                      s = 0,
                      l = m.dataLen;
                    l > s;
                    s++
                  ) {
                    if (
                      ((n = m.datas[a][s]),
                      "LSE" === m.market || "MSCI" === m.market)
                    ) {
                      if (n.price <= 0) continue;
                    } else if (n.price <= 0 || n.avg_price <= 0) continue;
                    ("HK" == m.market && m.hq && "indx" == m.hq.type) ||
                    "LSE" == m.market ||
                    "MSCI" === m.market
                      ? ((m.maxPrice = Math.max(m.maxPrice, n.price, o)),
                        (m.minPrice = Math.min(m.minPrice, n.price, o)))
                      : f(m.datas[a][0].date, m.hq.date) && "CN" == m.market
                      ? ((m.maxPrice = Math.max(
                          m.maxPrice,
                          n.price,
                          n.avg_price,
                          o,
                          m.preData.data
                        )),
                        (m.minPrice = Math.min(
                          m.minPrice,
                          n.price,
                          n.avg_price,
                          o,
                          m.preData.data
                        )))
                      : ((m.maxPrice = Math.max(
                          m.maxPrice,
                          n.price,
                          n.avg_price,
                          o
                        )),
                        (m.minPrice = Math.min(
                          m.minPrice,
                          n.price,
                          n.avg_price,
                          o
                        ))),
                      f(m.datas[a][0].date, m.hq.date) && "CN" == m.market
                        ? ((m.maxavgPrice = Math.max(
                            m.maxavgPrice,
                            n.price,
                            o,
                            m.preData.data
                          )),
                          (m.minavgPrice = Math.min(
                            m.minavgPrice,
                            n.price,
                            o,
                            m.preData.data
                          )))
                        : ((m.maxavgPrice = Math.max(
                            m.maxavgPrice,
                            n.price,
                            o
                          )),
                          (m.minavgPrice = Math.min(
                            m.minavgPrice,
                            n.price,
                            o
                          ))),
                      (m.labelMaxVol = m.maxVolume = Math.max(
                        m.maxVolume,
                        0,
                        n.volume
                      ));
                  }
                  e(o);
                }
                (m.minPrice < -1e8 || m.maxPrice - m.minPrice < 1e-6) &&
                  (v.stbd(m.datas[0][0].date, m.hq.date) &&
                    ((m.datas[0][0].price = m.hq.price),
                    (m.datas[0][0].avg_price = m.hq.price),
                    (m.datas[0][0].prevclose = m.hq.prevclose),
                    (m.datas[0][0].volume = m.hq.totalVolume)),
                  (m.minPrice = o - 0.01 * o),
                  (m.maxPrice = o + 0.01 * o),
                  (m.maxPercent = 0.01),
                  (m.minPercent = -0.01),
                  m.hq.totalVolume > 0 &&
                    v.stbd(m.datas[0][0].date, m.hq.date) &&
                    !isNaN(m.hq.totalAmount) &&
                    (m.datas[0][0].volume =
                      m.hq.totalAmount / m.hq.totalVolume));
                var c = g(m.maxVolume, 0, 0, !0);
                m.labelMaxVol = c[0];
                var d = 0.005;
                m.maxPercent < d &&
                  ("US" !== m.market || "LSE" !== m.market) &&
                  "pct" !== E.datas.scaleType &&
                  ((m.minPrice = m.maxavgPrice = o - o * d),
                  (m.maxPrice = m.minavgPrice = o + o * d),
                  (m.maxPercent = m.maxavgPercent = d),
                  (m.minPercent = m.minavgPercent = -d));
                var p;
                /^s[hz]51\d{4}$/.test(i.symbol) && (p = "fund"),
                  p &&
                    "fund" === p &&
                    "pct" !== E.datas.scaleType &&
                    d > Math.abs(m.minPercent) &&
                    ((d = Math.abs(m.minPercent)), (i.nfloat = m.nfloat = 3)),
                  ("gb_brk$a" === m.symbol || "usr_brk$a" === m.symbol) &&
                    (i.nfloat = m.nfloat = 1);
              }),
              (a = function() {
                var e,
                  t,
                  a,
                  i = E.DIMENSION.h_t,
                  r = i * E.DIMENSION.P_HV,
                  n = i * (1 - E.DIMENSION.P_HV);
                (t = m.labelMinP), (a = m.labelMaxP);
                var o,
                  s = m.labelMaxVol;
                if (m.datas) {
                  var l = m.datas.length;
                  for (e = 0; l > e; e++) {
                    o = m.datas[0][0].prevclose;
                    for (
                      var c,
                        d = E.custom.show_underlay_vol,
                        h = m.isCompare ? "ppp" : "pp",
                        u = m.dataLen,
                        v = 0;
                      u > v;
                      v++
                    ) {
                      if (((c = m.datas[e][v]), !c)) return;
                      c.price <= 0 &&
                        m.realLen >= v &&
                        v > 0 &&
                        ((c.price = m.hq.price),
                        (c.avg_price = m.datas[e][v - 1].avg_price),
                        (c.volume = 0)),
                        (c.change = c.price - o),
                        (c.percent = c.change / o),
                        (c.py = p[h](c.price, t, a, i, o)),
                        (c.ay = p[h](c.avg_price, t, a, i, o)),
                        d && (c.vy = p.vp(c.volume, s, r) + n);
                    }
                  }
                  m.preData.vPos =
                    "CN" == m.market &&
                    1 == l &&
                    f(m.hq.date, m.datas[0][0].date)
                      ? p[h](m.preData.data, t, a, i, o)
                      : null;
                }
              }),
              (this.createPlayingData = a),
              (this.extValues = function() {
                e(), t();
              }),
              (this.setDataRange = function(a) {
                var i = F.get();
                if (i) {
                  ee.dataLength = i.length;
                  var r = ee.start,
                    n = ee.end;
                  isNaN(r) || isNaN(n)
                    ? ((n = F.get("tb") || 5),
                      (r = F.get("tv") || 4),
                      (ee.start = r),
                      (ee.end = n))
                    : (a && n + 1 > i.length && (ee.end = n = i.length),
                      F.set("tv", r),
                      F.set("tb", n));
                  var o = [],
                    s = [];
                  if (i.length < 2) (s = i), o.push(i);
                  else
                    for (var l = r; n > l; l++)
                      (s = s.concat(i[l])), o.push(i[l]);
                  (m.datas = o),
                    (m.lineDatas = s),
                    (m.dataLen = o[0].length),
                    e(),
                    t();
                }
              });
          })(),
          K = {},
          B = !1,
          ae = !1,
          ie = {},
          se = new Date().getTime(),
          le = function() {
            var e;
            (C = new Date()),
              (e = 60 * C.getTimezoneOffset() * 1e3),
              C.setTime(C.getTime() + e),
              C.setHours(C.getHours() + 8);
          },
          ce = function(e) {
            if ((le(), !d))
              switch (I) {
                case "HF":
                  d = t.tUtil.gata(I, w.time);
                  break;
                case "NF":
                  d = t.tUtil.gata(I, x.time);
                  break;
                case "global_index":
                  d = t.tUtil.gata(I, T.time);
                  break;
                default:
                  d = t.tUtil.gata(I);
              }
            e.index = t.arrIndexOf(d, e.time);
            var a = e.index;
            switch (m.market) {
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
                    (a = t.arrIndexOf(d, "11:29")),
                  "NF" == m.market &&
                    ("21:00" == x.time[0][0]
                      ? e.time < "09:00" &&
                        e.time >= "02:30" &&
                        (a = t.arrIndexOf(d, "09:00"))
                      : e.time <= x.time[0][0] &&
                        (a = t.arrIndexOf(d, x.time[0][0]))));
                break;
              case "HK":
                e.time >= "12:00" && e.time < "13:00" && (a = 150),
                  e.time >= "16:00" && e.time < "16:10" && (a = d.length - 1);
                break;
              case "HF":
                "hf_CHA50CFD" == m.symbol &&
                  e.time > "16:35" &&
                  e.time < "17:00" &&
                  (a = 455);
            }
            if (
              ((e.index = a),
              (m.realLen = a),
              (m.hq.open == m.hq.prevclose &&
                m.hq.high == m.hq.prevclose &&
                m.hq.low == m.hq.prevclose &&
                0 > a) ||
                m.hq.time < "09:30")
            )
              switch (m.market) {
                case "CN":
                  m.realLen = m.hq.time >= "15:00" ? U - 1 : 0;
                  break;
                case "REPO":
                  m.realLen = m.hq.time >= "15:30" ? U - 1 : 0;
                  break;
                case "NF":
                case "HF":
                case "global_index":
                case "LSE":
                case "GOODS":
                case "MSCI":
                  break;
                default:
                  m.realLen = 0;
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
                var i = t.tUtil.gltbt(
                  1,
                  e.price,
                  !0,
                  m.needMarket,
                  [e.date],
                  a
                );
                "NF" == I && e.time >= "21:00"
                  ? ((i[0].date = v.dd(e.date)),
                    i[0].date.setDate(e.date.getDate() + 1))
                  : (i[0].date = v.dd(e.date)),
                  (i[0].prevclose = e.price),
                  (i[0].price = e.price),
                  (i[0].volume = 0);
                for (
                  var r = 0, n = 0, o = F.get(), s = 0, l = o.length;
                  l > s;
                  s++
                )
                  o[s][0].totalVolume &&
                    ((n += Number(o[s][0].totalVolume)), r++);
                (i[0].lastfive = n / r / 390 || 0),
                  f(o[4][0].date, e.date)
                    ? "NF" == I && e.time >= "21:00"
                      ? (o.shift(), o.push(i))
                      : (o[4] = i)
                    : (o.shift(), o.push(i)),
                  F.initTState(o),
                  (m.datas = [o[4]]),
                  (m.date = v.ds(e.date)),
                  (m.realLen = 0);
              },
              s = 0,
              l = function(e, a, l) {
                function c() {
                  switch ((o(m.hq), r(), $.createPlayingData(), m.market)) {
                    case "US":
                      $.extValues();
                      break;
                    case "NF":
                      x.inited = 1;
                  }
                  t.isFunc(a) && a();
                }
                function p() {
                  var e = new Date().getTime() - se;
                  return !isNaN(te) &&
                    te > 0 &&
                    e >= 1e3 * Number(te) &&
                    0 != m.realLen &&
                    m.hq.isUpdateTime
                    ? ((se = new Date().getTime()), g(b, m.hq, a), !0)
                    : !1;
                }
                function h() {
                  function i() {
                    f(m.hq.date, y[4][0].date) &&
                      m.hq.time > "16:00" &&
                      o.price < 0 &&
                      ((o.price = m.hq.price),
                      (o.avg_price = y[4][y[4].length - 2].avg_price),
                      (o.volume = 0));
                  }
                  function n() {
                    f(m.hq.date, y[4][0].date) &&
                      m.hq.time > "16:00" &&
                      ((o.price = m.hq.price),
                      (o.avg_price = y[4][y[4].length - 2].avg_price),
                      (o.volume = 0),
                      (o.time = m.hq.time),
                      o.avg_price < 0 && (o.avg_price = m.hq.price));
                  }
                  if (!m.hq.isUpdateTime) {
                    var o = y[4][y[4].length - 1];
                    switch (m.market) {
                      case "US":
                        i();
                        break;
                      case "HK":
                        n();
                    }
                    return (
                      ce(m.hq),
                      r(!0),
                      $.createPlayingData(),
                      t.isFunc(a) && a(),
                      !0
                    );
                  }
                  return (
                    "HK" == m.market && l && g(b, e, a),
                    (m.date =
                      "NF" == m.market && m.hq.time >= "21:00"
                        ? v.ds(y[4][0].date)
                        : m.hq.today),
                    !1
                  );
                }
                var b,
                  y = F.get();
                switch (m.needMarket) {
                  case "HF":
                    d = t.tUtil.gata(m.needMarket, w.time);
                    break;
                  case "NF":
                    d = t.tUtil.gata(m.needMarket, x.time);
                    break;
                  case "global_index":
                    d = t.tUtil.gata(m.needMarket, T.time);
                    break;
                  default:
                    d = t.tUtil.gata(m.needMarket);
                }
                if (e && e.date && m.datas && !i.date) {
                  if (((n = !1), (b = y[4]), m.hq.isDateChange)) {
                    if (
                      ("NF" == m.market && x && x.time[0][0] < "21:00") ||
                      "NF" != m.market
                    )
                      return void c();
                  } else if (
                    ("CN" == m.market &&
                      !f(m.hq.date, y[4][0].date) &&
                      m.hq.time < "09:05") ||
                    ("NF" == m.market &&
                      f(m.hq.date, y[4][0].date) &&
                      x &&
                      "21:00" == x.time[0][0] &&
                      m.hq.time >= x.time[0][0])
                  )
                    return void c();
                  if (!p() && !h()) {
                    if ((m.datas && (K = y[4][0]), de(e.date, y[4][0].date)))
                      return void (m.realLen = U);
                    (L = e.name || ""), (m.hq = e);
                    var _ =
                      e.date.getHours() < 10
                        ? "0" + e.date.getHours()
                        : e.date.getHours();
                    if (
                      ((m.time = _ + ":" + t.strUtil.zp(e.date.getMinutes())),
                      0 == e.index && u(b, e),
                      t.arrIndexOf(d, m.time) &&
                        e.index > 0 &&
                        (t.arrIndexOf(d, m.time) - m.realLen <= 1
                          ? u(b, e)
                          : "US" !== m.market && g(b, e, a),
                        1 == e.index && 0 == s))
                    )
                      return (s = 1), void g(b, e, a);
                    R(m.market) &&
                      ((m.hq.open == m.hq.prevclose &&
                        m.hq.high == m.hq.prevclose &&
                        m.hq.low == m.hq.prevclose &&
                        m.hq.index < 0) ||
                        e.time < "09:30") &&
                      ("CN" == m.market
                        ? ((b[0].avg_price = e.price),
                          (b[0].volume = e.totalVolume))
                        : "option_cn" == m.market
                        ? ((b[0].inventory = e.position || e.holdingAmount),
                          (b[0].holdPosition = e.position || e.holdingAmount))
                        : "HK" == m.market &&
                          (b[0].avg_price =
                            e.totalAmount / e.totalVolume || e.price)),
                      5 == ee.end && (r(!0), $.createPlayingData()),
                      t.isFunc(a) && a();
                  }
                }
              },
              c = -1,
              p = -1,
              h = -1,
              u = function(e, t) {
                var i = e;
                ce(t);
                var r = i[m.realLen];
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
                  ("option_cn" == m.market || "NF" == m.market) &&
                    ((r.inventory = t.position || t.holdingAmount),
                    (r.holdPosition = t.position || t.holdingAmount)),
                  "CN" == m.market
                    ? (r.avg_price = t.avg_price || r.price)
                    : (t.index > 1
                        ? (r.avg_price =
                            (r.avg_price > 0 && r.avg_price) ||
                            (i[t.index - 1].avg_price * t.index + t.price) /
                              (t.index + 1) ||
                            r.price)
                        : "fund" == m.market ||
                          (r.avg_price = r.price || t.price),
                      0 == t.index &&
                        (r.avg_price =
                          t.totalAmount / t.totalVolume || t.price),
                      (r.volume = r.volume || 0)),
                  isNaN(t.volume) && (t.volume = 0),
                  "HK" != m.market &&
                    "NF" != m.market &&
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
                  ssl: i.ssl,
                  assisthq: i.assisthq,
                };
                (B = ae = !1),
                  "LSE" == m.market && (s.symbol = i.rawsymbol),
                  KKE.api("datas.t.get", s, function(e) {
                    (a = e.data.td1), ce(m.hq);
                    var i = F.get();
                    ("NF" == m.market &&
                      ("21:00" == x.time[0][0] &&
                        m.hq.time >= x.time[0][0] &&
                        0 != m.hq.date.getDay() &&
                        6 != m.hq.date.getDay() &&
                        (a[0].date = i[4][0].date),
                      ("09:30" == x.time[0][0] || "09:15" == x.time[0][0]) &&
                        f(i[4][0].date, m.hq.date) &&
                        m.hq.time <= x.time[0][0])) ||
                      ("HF" == m.market &&
                        m.hq.time > w.time[0][0] &&
                        0 != m.hq.date.getDay() &&
                        6 != m.hq.date.getDay() &&
                        (a[0].date = m.hq.date),
                      (i[4] = a),
                      F.initTState(i),
                      "CN" == m.market &&
                        "HK" == m.needMarket &&
                        ((m.needMarket = "CN"), X.changeData(m)),
                      5 == ee.end && (r(!0), $.createPlayingData()),
                      t.isFunc(o) && o());
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
                  ssl: i.ssl,
                };
                (B = ae = !1),
                  "LSE" == m.market && (o.symbol = i.rawsymbol),
                  KKE.api("datas.t.get", o, function(e) {
                    (a = e.data.td1),
                      F.initTState(e.data.td5),
                      ce(m.hq),
                      t.isFunc(n) && n(),
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
                if (((p = s ? s : t.market(e.symbol)), "US" === p))
                  h = 1 === i.assisthq ? ",gb_ixic" : u;
                else if ("HK" === p) {
                  var v =
                    "hk" === e.symbol.substring(0, 2) ? ",hkHSI" : ",rt_hkHSI";
                  h = 1 === i.assisthq ? v : u;
                }
                o
                  ? ((d = "datas.hq.parse"),
                    (m = {
                      symbol: e.symbol + h,
                      hqStr: o,
                      market: p,
                      ssl: i.ssl,
                    }))
                  : ((d = "datas.hq.get"),
                    (m = {
                      symbol: e.symbol + h,
                      delay: !0,
                      cancelEtag: n,
                      ssl: i.ssl,
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
                o > 2 || (P.re(N.e.T_DATA_LOADED), t.isFunc(e) && e(), o++);
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
                var s = t.tUtil.gltbt(
                  1,
                  o.hq.price,
                  !0,
                  m.market,
                  [o.hq.date],
                  n
                );
                return (
                  (s[0].name = o.hq.name),
                  (s[0].symbol = e.symbol),
                  (s[0].today = t.dateUtil.ds(o.hq.date, "-")),
                  (r = i),
                  (r[4] = s),
                  (m.realLen = 0),
                  r
                );
              };
            this.init = function(o) {
              var p = ee.viewId;
              if (r != p) {
                (r = p), null != m.datas && F.initTState(p, m.tDb.get());
                var h = {
                  assisthq: i.assisthq,
                  ssl: i.ssl,
                  symbol: e.symbol,
                  date: i.date,
                  withT5: 1,
                  dist5: i.dist5,
                  withI: !0,
                  faker: m.needMarket,
                  dataformatter: e.datas.t1.dataformatter,
                };
                switch (m.needMarket) {
                  case "HF":
                    d = t.tUtil.gata(m.needMarket, w.time);
                    break;
                  case "NF":
                    d = t.tUtil.gata(m.needMarket, x.time);
                    break;
                  case "global_index":
                    d = t.tUtil.gata(m.needMarket, T.time);
                    break;
                  case "LSE":
                    h.symbol = i.rawsymbol;
                  default:
                    d = t.tUtil.gata(m.needMarket);
                }
                J.show(),
                  KKE.api("datas.t.get", h, function(e) {
                    X.hasHistory && "history" == e.msg && X.hasHistory(M);
                    var d = e.data.hq.status,
                      p = "",
                      u = Number(e.data.hq.state);
                    if ("empty" == e.msg)
                      switch (m.market) {
                        case "CN":
                          3 == d &&
                            ((p = N.delisted),
                            H.showTip({ txt: p, parent: V, noBtn: !0 }));
                      }
                    if ("error" == e.msg || "nohistory" == e.msg) {
                      if (
                        (a &&
                          "nohistory" == e.msg &&
                          ((M = 0),
                          X.hasHistory && X.hasHistory(M),
                          H.showTip({
                            txt: N.nohistoryt,
                            parent: V,
                            noBtn: !0,
                          })),
                        (m.isErr = !0),
                        a && e.data && e.data.hq)
                      ) {
                        if (d)
                          switch (m.market) {
                            case "CN":
                              switch (d) {
                                case 2:
                                  p = N.notlisted;
                                  break;
                                case 3:
                                  p = N.delisted;
                                  break;
                                case 0:
                                  p = N.norecord;
                              }
                              break;
                            case "HK":
                              switch (d) {
                                case 5:
                                  p = N.notlisted;
                                  break;
                                case 0:
                                  p = N.delisted;
                              }
                          }
                        else p = N.norecord;
                        if (p && 0 != u) {
                          var v,
                            g = { txt: p, parent: V, noBtn: !0 };
                          if (!(E.DIMENSION.getStageW() < 200))
                            return (
                              H.showTip({ txt: p, parent: V, noBtn: !0 }),
                              void J.hide()
                            );
                          (g.bgStyle = { padding: 0, top: "0px" }),
                            v || ((v = new t.TipM(E.COLOR)), v.genTip(g));
                        }
                      }
                      if (0 != u && 7 != u) {
                        if ((X.onResize(), 1 != d))
                          return void X.removeCompare([h.symbol]);
                        m.isErr = !1;
                      } else m.isErr = !1;
                    }
                    (m.hq = e.data.hq), (r = void 0), (h.td1 = e.data.td1);
                    var b;
                    C = new Date();
                    var y = 60 * C.getTimezoneOffset() * 1e3;
                    if (
                      (C.setTime(C.getTime() + y),
                      C.setHours(C.getHours() + 8),
                      (L = m.hq.name || ""),
                      ce(m.hq),
                      l(m.hq, e.data.td5) && R(m.market)
                        ? "history" == e.msg
                          ? ((b = e.data.td5),
                            b[4][0].date || (b[4][0].date = m.hq.date))
                          : (b = c(m, e.data.td5))
                        : ((b = e.data.td5),
                          "NF" != m.market ||
                            !x ||
                            ("09:30" != x.time[0][0] &&
                              "09:15" != x.time[0][0]) ||
                            (f(b[4][0].date, m.hq.date) &&
                              m.hq.time <= x.time[0][0] &&
                              (b = c(m, e.data.td5))),
                          b && !b[4][0].date && (b[4][0].date = m.hq.date)),
                      (X.historyData = b),
                      (m.date =
                        (e.data.td1 && e.data.td1[0].today) || m.hq.date),
                      F.initTState(b),
                      s(o),
                      1 == O && (n.dateTo(i.historytime, i.historycb), (O = 0)),
                      J.hide(),
                      i.loadedChart)
                    )
                      if (t.isFunc(i.loadedChart)) i.loadedChart();
                      else if (window[i.loadedChart]) window[i.loadedChart]();
                      else
                        try {
                          window.h5chart.loadedChart();
                        } catch (_) {}
                  });
              }
            };
          })();
        (this.tDb = F),
          (this.initData = pe.init),
          (this.initT5Data = me.updateT5Data),
          (this.doUpdate = me.update),
          (this.onViewChange = r),
          (this.setPricePos = function(e, t) {
            (m.labelMaxP = e[0]),
              (m.labelMinP = e[1]),
              (m.labelPriceCount = e[2]),
              (m.isCompare = t),
              $.createPlayingData(),
              k && k.setPricePos(e);
          }),
          (this.setRange = function() {
            $.setDataRange(),
              _ && _.setDataRange(),
              k && k.setDataRange(),
              D && D.setDataRange();
          }),
          (this.draw = function() {
            q.draw(), _ && _.allDraw(), k && k.allDraw();
          }),
          (this.resize = function(e) {
            $.createPlayingData(),
              q.resize(),
              _ && _.onResize(e),
              k && k.onResize(),
              D && D.onResize();
          }),
          (this.clear = function() {
            q.clear(),
              _ && (_.clear(), (_ = null)),
              k && (k.clear(), (k = null)),
              D && (D.clear(), (D = null)),
              a && (Q = null);
          }),
          (this.getPriceTech = function() {
            return k || null;
          }),
          (this.removePt = function(e) {
            if (e) {
              !t.isArr(e) && (e = [e]);
              for (var a = e.length; a--; )
                if (e[a].name && "VOLUME" === e[a].name.toUpperCase()) {
                  e.splice(a, 1), (E.custom.show_underlay_vol = !1);
                  break;
                }
            } else E.custom.show_underlay_vol = !1;
            k && k.removeChart(e);
          }),
          (this.togglePt = function(e) {
            k && (y = k.showHide(e));
          });
        var he = function(e, a, i) {
          e && re.resizeAll(!0),
            X.onChangeView(),
            a && t.isFunc(a.callback) && a.callback(),
            i && ne.onTechChanged(i[0]);
        };
        (this.initPt = function(e, r) {
          if (e) {
            !t.isArr(e) && (e = [e]);
            for (var n = e.length; n--; )
              if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                e.splice(n, 1), (E.custom.show_underlay_vol = !0);
                break;
              }
            k ||
              ((k = new s({
                iMgr: oe,
                stockData: m,
                chartArea: G,
                titleArea: z,
                cb: he,
                type: "t",
                cfg: E,
                usrObj: i,
              })),
              a && (Z = k)),
              k.createChart(e, r);
          }
        }),
          (this.initTc = function(e, t) {
            _ ||
              ((_ = new l({
                stockData: m,
                iMgr: oe,
                subArea: W,
                cb: he,
                cfg: E,
                type: "option_cn" == I ? "p" : "t",
                usrObj: i,
                initMgr: re,
              })),
              a && (Y = _)),
              _.createChart(e, t);
          }),
          (this.removeTc = function(e) {
            _ && _.removeChart(e);
          }),
          (this.initRs = function() {
            D ||
              ((D = new o({
                stockData: m,
                setting: E,
                state: ee,
                rc: X.moving,
                witht5: 1,
              })),
              (Q = D)),
              D.linkData();
          }),
          (this.setTLineStyle = q.setTLineStyle),
          c();
      }
      function S(e, r) {
        function n() {
          var r = e.isMain;
          if (r) (l = E.COLOR.T_P), (c = E.COLOR.T_AVG);
          else {
            2 != X.dAdd || o.linecolor || (o.linecolor = i.overlaycolor);
            var n = o.linecolor || "#cccccc";
            l = n.K_N || n.T_N || "#" + t.randomColor();
          }
          s = new a.xh5_ibPainter({
            setting: E,
            sd: e,
            withHBg: r,
            ctn: K,
            iMgr: oe,
            reO: { mh: E.DIMENSION.H_MA4K },
            iTo: function(t, a, i, r) {
              if (
                (!m(t, oe.iHLineO.body) && t.appendChild(oe.iHLineO.body),
                e && e.datas)
              ) {
                var n,
                  o,
                  s = e.datas[0][0].prevclose;
                2 == e.dAdd
                  ? (n =
                      e.labelMaxP * s +
                      s -
                      (i / E.DIMENSION.h_t) *
                        (e.labelMaxP * s + s - (e.labelMinP * s + s)))
                  : ((n =
                      e.labelMaxP -
                      (i / E.DIMENSION.h_t) * (e.labelMaxP - e.labelMinP)),
                    (o = Number((100 * (n - s)) / s).toFixed(2) + "%")),
                  oe.iToD(
                    {
                      mark: n,
                      rmark: o,
                      x: a,
                      y: i,
                      oy: E.DIMENSION.H_MA4K,
                      ox: E.DIMENSION.posX,
                      e: r,
                    },
                    !0,
                    !1
                  );
              }
            },
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
            o = u(
              { linetype: "line_" + v, linecolor: o ? o.linecolor || {} : {} },
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
              (l = h.K_N || h.T_N || E.COLOR.T_P),
              (c = h.T_AVG || E.COLOR.T_AVG),
              (d = h.T_PREV || E.COLOR.T_PREV);
          },
          g = function() {
            function a() {
              if (e.isMain && E.custom.show_underlay_vol) {
                for (var t, a = E.COLOR.V_SD, i = D; N > i; i++)
                  (S = y[i]),
                    (t = S.vy),
                    s.drawVStickC(M, t, I, E.DIMENSION.h_t, a),
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
                      if ("EWI" == t[a].name && k > (N / U - 1) * U)
                        return void s.stroke();
                  k == D || k % U == 0
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
                  k == D || k % U == 0
                    ? s.moveTo(M, e)
                    : k % i.modulo == 0 && s.lineTo(M, e),
                  (S.ix = M),
                  (M += T);
              (O = M),
                (L = e),
                s.stroke(),
                i.business && h({ xPos: M, yPos: e });
            }
            function h(e) {
              s.newStyle(l, !0, 0.5),
                s.drawDot(e.xPos, e.yPos, 3, !0),
                s.newFillStyle_rgba(E.COLOR.M_ARR, 3, 1),
                s.fill(),
                s.stroke();
            }
            function u() {
              function t() {
                s.lineTo(M, E.DIMENSION.h_t),
                  s.lineTo(0.5 * T, E.DIMENSION.h_t),
                  s.newFillStyle_rgba(
                    E.COLOR.M_ARR,
                    E.DIMENSION.h_t,
                    E.COLOR.M_ARR_A
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
              (d = E.COLOR.T_PREV), s.newStyle(d, !0, 1);
              var t,
                a = 0,
                r = 5;
              for (
                t =
                  e.isCompare && e.isMain && "pct" === E.datas.scaleType
                    ? p.pp(0, e.labelMinP, e.labelMaxP, E.DIMENSION.h_t)
                    : p.pp(
                        e.datas[0][0].prevclose,
                        e.minPrice,
                        e.maxPrice,
                        E.DIMENSION.h_t
                      ),
                  t = ~~(t + 0.5),
                  t -= 0.5;
                a < E.DIMENSION.w_t;

              )
                s.moveTo(a, t), (a += r), s.lineTo(a, t), (a += r);
              if ((e.isMain && s.stroke(), i.business)) {
                var n = e.hq.price.toFixed(2),
                  o = s.getG(),
                  l = o.measureText(n).width,
                  c = E.DIMENSION.w_t - l,
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
              return { x: e, y: t, width: a, height: i };
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
            if (!(E.DIMENSION.getStageH() < 0)) {
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
                    x = e.datas.length * U,
                    T = E.DIMENSION.w_t / Math.max(x, E.PARAM.minCandleNum),
                    I = 0.5 * T,
                    M = 0;
                  e.isTotalRedraw
                    ? ((D = 0), s.clear(!0, E.PARAM.getHd()))
                    : ((D = x - 2),
                      0 > D && (D = 0),
                      (M += T * D),
                      s.clearLimit(M + I, T + I));
                  var O = 0,
                    L = 0,
                    C = function(e, t) {
                      return { x: e, y: t };
                    };
                  a(),
                    "sh000012" != e.symbol &&
                      "sh000013" != e.symbol &&
                      (i.business || i.simple || t.isRepos(e.symbol) || r()),
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
            s.resize({ mh: E.DIMENSION.H_MA4K }), g();
          }),
          (this.setTLineStyle = f),
          f(r),
          n();
      }
      function D() {
        var e,
          a = this,
          n = [];
        (this.getAllStock = function() {
          return n;
        }),
          (this.getMainStock = function() {
            return e;
          }),
          (this.getAllSymbols = function() {
            for (var e = [], t = 0, a = n.length; a > t; t++)
              e.push(n[t].symbol);
            return e;
          });
        var c = function() {
            var e,
              t = E.DIMENSION.h_t;
            return i.business
              ? (e = 0)
              : i.appMode
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
                o = n.length,
                s = o > 1,
                l = s ? "avgPercent" : "Price",
                d = o;
              d--;

            )
              (e = n[d]),
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
                  var h = n[0].datas[0][0].prevclose,
                    u = Math.max(Math.abs(h - r), Math.abs(h - i));
                  (r = h + u), (i = h - u);
                }
            }
            for (var v = c(), f = o; f--; )
              (e = n[f]), e.setPricePos([r, i, v], s);
          },
          m = function(e) {
            if (e) e.draw();
            else for (var t = n.length; t--; ) n[t].draw();
          },
          p = function(t) {
            1 == ee.viewId || 0 == ee.viewId
              ? i.date
                ? a.moving(ee.start, ee.end)
                : a.moving(4, 5, !1)
              : a.moving(ee.start, ee.end, !1),
              t || ne.onRange(e);
          },
          v = function(e) {
            return e.isErr
              ? (t.trace.error("err symbol data"),
                a.removeCompare([e.symbol]),
                !0)
              : e.tDb.get()
              ? !0
              : (e.initData(b), !1);
          },
          f = [],
          g = function(e) {
            if (e && t.isFunc(e.callback)) {
              for (var a = !1, i = f.length; i--; )
                if (e.callback === f[i]) {
                  a = !0;
                  break;
                }
              !a && f.push(e.callback);
            }
          },
          b = function(a, i) {
            if ((g(i), v(e))) {
              if (e.isErr)
                return t.trace.error("err main symbol"), void (e.isErr = !1);
              oe.patcher.switchFloater();
              for (var r, o = !0, s = n.length; s--; )
                (r = n[s]), r == e || v(r) || (o = !1);
              if (o) {
                for (s = n.length; s--; )
                  n[s].marketNum(n[s].needMarket) > n[s].marketNum(I) &&
                    (I = n[s].needMarket);
                for (s = n.length; s--; ) O(n[s]);
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
            ne.onRange(e);
          };
        (this.getExtraData = function(a) {
          if (
            ((a = u({ symbol: e.symbol, name: null, clone: !0 }, a || {})),
            !a.name)
          )
            return null;
          for (var i, r, o = n.length; o--; )
            if (n[o].symbol === a.symbol) {
              i = n[o];
              break;
            }
          if (i) {
            var s;
            "t1" == a.name || "t5" == a.name
              ? ((s = i.tDb.get()), (r = a.clone ? t.clone(s) : s))
              : (r = null);
          }
          return r;
        }),
          (this.shareTo = function(e) {
            e = u(
              {
                type: "weibo",
                url: window.location.href,
                wbtext: "",
                qrwidth: 100,
                qrheight: 100,
                extra: void 0,
              },
              e
            );
            var a = String(e.type).toLowerCase();
            switch (a) {
              case "qrcode":
                KKE.api(
                  "utils.qrcode.createcanvas",
                  { text: e.url, width: e.qrwidth, height: e.qrheight },
                  function(e) {
                    H.showTip({
                      content: e,
                      txt:
                        '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                      parent: V,
                      btnLb: "\u5173\u95ed",
                    });
                  }
                );
                break;
              default:
                t.grabM.shareTo({
                  ctn: V,
                  w: E.DIMENSION.getStageW(),
                  h: E.DIMENSION.getStageH() - (B.clientHeight || 0),
                  ignoreZIdxArr: [E.PARAM.I_Z_INDEX],
                  ignoreIdArr: [E.PARAM.LOGO_ID],
                  priorZIdx: E.PARAM.G_Z_INDEX,
                  nologo: !1,
                  top: E.DIMENSION.posY + E.DIMENSION.H_MA4K + 17,
                  right: E.DIMENSION.RIGHT_W + E.DIMENSION.K_RIGHT_W,
                  LOGO_W: E.DIMENSION.LOGO_W,
                  LOGO_H: E.DIMENSION.LOGO_H,
                  color: E.COLOR.LOGO,
                  bgColor: E.COLOR.BG,
                  txt: e.wbtext,
                  url: e.url,
                  extra: e.extra,
                });
            }
          });
        var N,
          k,
          S = function() {
            oe.update(), d(), m(), _(), oe.isIng() || ne.onViewPrice();
          },
          D = function() {
            clearTimeout(k),
              !ae &&
                V.parentNode &&
                "none" != V.style.display &&
                (k = setTimeout(S, 200));
          },
          w = function(e) {
            if ((clearInterval(N), !isNaN(i.rate))) {
              var t = 1e3 * i.rate;
              t > 0 && (N = setTimeout(w, t));
            }
            for (var a, r = n.length; r--; )
              (a = n[r]), a.doUpdate(D, null, null, null, e);
          },
          x = function() {
            ee.viewId = 2;
            for (var e, t = n.length; t--; )
              (e = n[t]), e.initT5Data(e.datas, e.hq, b);
          };
        (this.updateDataAll = w), (this.update5Data = x);
        var T = function(t, a) {
            var i = new r(t, a);
            a && (e = i), (n[n.length] = i), L(), b();
          },
          M = function(e) {
            for (var t, a, i = e, r = 0, o = 0; r < n.length; r++)
              (a = n[r]),
                a.marketNum(a.market) == a.marketNum(i)
                  ? o++
                  : (t = t
                      ? a.marketNum(a.market) > a.marketNum(t)
                        ? a.market
                        : t
                      : a.market),
                r == n.length - 1 && 0 == o && (I = t);
            for (r = n.length; r--; ) O(n[r], i);
          },
          O = function(e, t) {
            e.changeMarket(t);
          };
        this.changeData = O;
        var L = function() {
            if (n.length > 1) a.mM.togglePt({ v: !1 });
            else {
              if (n.length <= 0) return;
              a.mM.togglePt({ v: !0 });
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
                oe.iToKb(37 == t ? -1 : 1);
                break;
              default:
                return;
            }
            h.preventDefault(e);
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
          for (var o, s = n.length; s--; )
            (o = n[s]), o.setRange(), o.onViewChange();
          d(), m(), ne.onRange(e);
        }),
          (this.dAdd = 0),
          (this.compare = function(e) {
            for (var t = n.length; t--; ) if (n[t].symbol == e.symbol) return;
            T(e, !1);
          }),
          (this.removeCompare = function(e) {
            for (var t, a, i = "CN", r = e.length; r--; ) {
              a = e[r];
              for (var o = n.length; o--; )
                if (a == n[o].symbol) {
                  (t = n.splice(o, 1)[0]),
                    (i = t.market),
                    t.clear(),
                    (t = null);
                  break;
                }
            }
            M(i), L(), d(), m(), ne.onRange(n[0]);
          }),
          (this.onResize = function(e) {
            for (var t = n.length; t--; ) n[t].resize(e);
          }),
          (this.dcReset = function() {
            for (var e, t = n.length; t--; )
              (e = n.splice(t, 1)[0]), e.clear(), (e = null);
          }),
          (this.setScale = function(e) {
            E.datas.scaleType = e;
          }),
          (this.setTLineStyle = function(a) {
            if (a) {
              !t.isArr(a) && (a = [a]);
              for (var i = a.length; i--; ) {
                var r = a[i];
                if (r.hasOwnProperty("symbol")) {
                  for (var o = r.symbol, s = n.length; s--; )
                    if (n[s].symbol == o) {
                      n[s].setTLineStyle(r), n[s].draw();
                      break;
                    }
                } else e.setTLineStyle(r), e.draw();
              }
            } else e.setTLineStyle(), e.draw();
          });
        var P,
          q = function(e) {
            e ? S() : oe.update();
          },
          U = !1,
          F = 0,
          $ = function() {
            clearTimeout(P), (U = !1), (F = 0);
          },
          K = function() {
            P = setTimeout(function() {
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
              U || ((U = !0), K());
              break;
            case 0:
              $();
          }
          for (var i = e.length; i--; )
            for (var r = n.length; r--; )
              if (n[r].symbol == e[i].symbol && e[i].data) {
                F++, n[r].doUpdate(y(q, null, a), !1, e[i].data, e[i].market);
                break;
              }
        }),
          (this.dcInit = function(e) {
            T(e, !0), w();
          }),
          (this.mM = new (function() {
            var t = function(a, i, r) {
                var n, o;
                switch (i) {
                  case "price":
                    (n = s), (o = "initPt");
                    break;
                  case "tech":
                    (n = l), (o = "initTc");
                }
                o &&
                  (n
                    ? e[o](a, r)
                    : KKE.api("plugins.techcharts.get", { type: i }, function(
                        e
                      ) {
                        (l = e.tChart), (s = e.pChart), t(a, i, r);
                      }));
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
                i && e && (e[i](t), b());
              },
              i = function(t) {
                return o
                  ? (Q
                      ? Q.sh(t)
                      : (e.initRs(), i(t), B.appendChild(Q.getBody())),
                    void re.resizeAll(!0))
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
                e && (e.togglePt(t), b());
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
      (x = i._nf_window_var), (w = i._hf_window_var), (T = i._gbi_window_var);
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
                a = t.tUtil.gtAll(w.time).length;
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
                (a = t.tUtil.gtmsci().length), (L = "");
                break;
              case "CN":
                (a = 241),
                  t.isRepos(i.symbol) && (L = ""),
                  t.isCNK(i.symbol) && (L = "\u80a1");
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
                (a = t.tUtil.gtAll(x.time).length), (L = "");
                break;
              case "global_index":
                a = t.tUtil.gtAll(T.time).length;
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
              g = r.getHours() + ":" + t.strUtil.zp(r.getMinutes()),
              b = t.tUtil.gata(i),
              y = v.stbd(r, n) ? t.arrIndexOf(b, g) : 0;
            "HK" == p &&
              "US" == i &&
              ((s = [["12:01", "12:59"]]),
              (u = [1]),
              (l = m[150]),
              (c = m[m.length - 1])),
              ("CN" == p || "option_cn" == p) &&
                ("HK" == h
                  ? ((s = [
                      ["11:30", "11:59"],
                      ["15:01", "16:00"],
                    ]),
                    (u = [0, 2]),
                    (l = m[119]),
                    (c = m[m.length - 1]))
                  : ((s = [
                      ["11:30", "11:59"],
                      ["12:00", "12:59"],
                      ["15:01", "16:00"],
                    ]),
                    (u = [0, 1, 2]),
                    (l = m[119]),
                    (c = m[m.length - 1])));
            for (var _ = 0, N = u.length; N > _; _++) {
              for (
                var k,
                  S,
                  D,
                  w = t.tUtil.gtr([s[_]]),
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
                      fake: u[_],
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
                      fake: u[_],
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
          },
        };
      t.xh5_EvtDispatcher.call(this);
      var P = this;
      (i = u(
        {
          symbol: "sh000001",
          ssl: !0,
          business: !1,
          simple: !1,
          datas: {
            t1: { url: void 0, dataformatter: void 0 },
            t5: { url: void 0, dataformatter: void 0 },
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
          tchartobject: { t: void 0, k: void 0 },
        },
        i || { YANGWEN: "yangwen@staff.sina.com.cn", VER: "2.6.0" }
      )),
        !i.symbol && (i.symbol = "sh000001"),
        (i.symbol = String(i.symbol)),
        (i.rawsymbol = String(i.symbol)),
        (i.symbol =
          "LSE" === t.market(i.symbol)
            ? t.strUtil.replaceStr(i.symbol)
            : i.symbol.replace(".", "$")),
        0 == location.protocol.indexOf("https:") && (i.ssl = !0);
      var q =
          "_" +
          i.symbol +
          "_" +
          Math.floor(1234567890 * Math.random() + 1) +
          Math.floor(9876543210 * Math.random() + 1),
        E = e.getSetting(q);
      (E.datas.isT = !0),
        i.reorder || (E.custom.indicator_reorder = !1),
        i.reheight || (E.custom.indicator_reheight = !1),
        (I = t.market(i.symbol)),
        (E.datas.tDataLen = A.tcd(I));
      var U = E.datas.tDataLen,
        H = new (function() {
          var e;
          (this.showTip = function(a) {
            e || (e = new t.TipM(E.COLOR)), e.genTip(a);
          }),
            (this.hideTip = function() {
              e && e.hide();
            });
        })();
      if (b.noH5) {
        if ("undefined" == typeof FlashCanvas || i.fh5)
          return void (t.isFunc(i.noh5) && i.noh5(i));
        E.PARAM.isFlash = !0;
      }
      if (
        (E.PARAM.isFlash &&
          ((E.COLOR.K_EXT_BG = "#fff"), (E.COLOR.F_BG = "#fff")),
        i.dim)
      )
        for (var F in i.dim)
          i.dim.hasOwnProperty(F) &&
            t.isNum(E.DIMENSION[F]) &&
            (E.DIMENSION[F] = i.dim[F]);
      var $,
        V,
        K,
        G,
        z,
        W,
        B,
        X,
        j,
        Y,
        Z,
        Q,
        J,
        ee = {
          viewId: N.URLHASH.vi(i.view || "ts"),
          dataLength: void 0,
          start: void 0,
          end: void 0,
          startDate: void 0,
          endDate: void 0,
        },
        te = isNaN(i.t_rate) ? E.PARAM.T_RATE : i.t_rate,
        ae = !1,
        ie = 0,
        re = new (function() {
          var e,
            a = function(e, t, a) {
              var r = !1;
              isNaN(e) && (e = i.w || $.offsetWidth),
                isNaN(t) && (t = i.h || $.offsetHeight - i.mh);
              for (
                var n,
                  o = B.clientHeight || 0,
                  s = W.clientHeight || 0,
                  l = E.DIMENSION.getOneWholeTH(),
                  c = 0,
                  d = W.childNodes,
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
                E.DIMENSION.setStageW(e),
                1 == ie
                  ? m > 0 &&
                    (E.DIMENSION.setStageH(t, m * l + c + o),
                    (r = !0),
                    (ie = 0))
                  : E.DIMENSION.setStageH(t, s + o),
                0 > t &&
                  ((E.DIMENSION.H_T_G = E.DIMENSION.H_T_G - E.DIMENSION.H_T_T),
                  (E.DIMENSION.H_T_B = E.DIMENSION.H_TIME_PART)),
                r
              );
            },
            r = function() {
              J.setPosition();
            },
            n = function() {
              e && (e.style.display = E.custom.show_logo ? "" : "none");
            },
            o = function(e, i, o) {
              var s = a(i, o, 0 / 0);
              if (e || (i && o)) {
                if (!X) return;
                X.onResize(s), oe.onResize();
              }
              r(),
                n(),
                t.stc("t_wh", [
                  E.DIMENSION.getStageW(),
                  E.DIMENSION.getStageH(),
                ]);
            },
            s = function() {
              ($ = c(i.domid) || i.dom),
                $ ||
                  (($ = d("div")),
                  document.body.appendChild($),
                  t.trace.error("missing of dom id")),
                (V = d("div")),
                (V.style.position = "relative"),
                (V.style.outlineStyle = "none"),
                (V.style.webkitUserSelect = V.style.userSelect = V.style.MozUserSelect =
                  "none"),
                (K = d("div", "mainarea_" + E.uid)),
                (G = d("div")),
                K.appendChild(G),
                (z = d("div")),
                (z.style.position = "absolute"),
                (z.style.fontSize = E.STYLE.FONT_SIZE + "px"),
                K.appendChild(z),
                V.appendChild(K),
                (W = d("div")),
                V.appendChild(W),
                (B = d("div")),
                V.appendChild(B),
                $.appendChild(V),
                (J = new t.LoadingSign()),
                J.appendto(K, E);
            },
            l = function(a) {
              var i = !1;
              if (a) {
                Q && (i = Q.setTheme(a));
                for (var r in a)
                  a.hasOwnProperty(r) &&
                    E.COLOR.hasOwnProperty(r) &&
                    E.COLOR[r] !== a[r] &&
                    ((E.COLOR[r] = a[r]), (i = !0));
                t.stc("t_thm", a);
              }
              return i && k.styleLogo({ logo: e, color: E.COLOR.LOGO }), i;
            },
            m = function(e) {
              !E.custom.mousewheel_zoom ||
                (document.activeElement !== V &&
                  document.activeElement.parentNode !== V) ||
                (X && X.onWheel(e), h.preventDefault(e), h.stopPropagation(e));
            },
            p = function(e) {
              E.custom.keyboard && X && X.onKb(e);
            },
            u = function() {
              t.xh5_deviceUtil.istd ||
                (b.info.name.match(/firefox/i)
                  ? h.addHandler(V, "DOMMouseScroll", m)
                  : h.addHandler(V, "mousewheel", m),
                (V.tabIndex = 0),
                h.addHandler(V, "keydown", p));
            },
            v = function(t) {
              (e = t), V.appendChild(t);
            },
            f = function() {
              s(),
                l(i.theme),
                o(),
                u(),
                E.DIMENSION.h_t < 0 &&
                  ((K.style.display = "none"),
                  (E.custom.indicator_reorder = !1),
                  (E.custom.indicator_reheight = !1)),
                k.getLogo({
                  cb: v,
                  id: E.PARAM.LOGO_ID,
                  isShare: !1,
                  top: E.DIMENSION.posY + E.DIMENSION.H_MA4K + 17,
                  right: E.DIMENSION.RIGHT_W + E.DIMENSION.K_RIGHT_W,
                  LOGO_W: E.DIMENSION.LOGO_W,
                  LOGO_H: E.DIMENSION.LOGO_H,
                  color: E.COLOR.LOGO,
                }),
                b.noH5 &&
                  (H.showTip({
                    txt: i.nohtml5info || N.nohtml5info,
                    parent: V,
                  }),
                  t.stc("t_nh5"));
            };
          f(),
            (this.resizeAll = o),
            (this.innerResize = function(e) {
              X &&
                (a(0 / 0, 0 / 0, e),
                X.onResize(),
                oe.onResize(),
                r(),
                ne.onInnerResize({ height: E.DIMENSION.h_t }));
            }),
            (this.initTheme = l);
        })(),
        ne = new (function() {
          var e = 0,
            a = function(a, r) {
              var n = U - 1,
                o = X.getAllStock()[0];
              if (
                o &&
                o.datas &&
                (f(o.datas[o.datas.length - 1][0].date, o.hq.date)
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
                          "hf_CHA50CFD" !== i.symbol &&
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
                    t.dateUtil.ds(l, "/", !1) +
                    "/" +
                    t.dateUtil.nw(l.getDay()) +
                    (a.time || "")),
                  (e = r),
                  t.clone(a)
                );
              }
            };
          (this.currentData = a),
            (this.onDataUpdate = function() {
              if (t.isFunc(i.ondataupdate)) {
                var e = a();
                e &&
                  i.ondataupdate({
                    data: t.clone(e),
                    idx: ee.currentLength - 1,
                    left: E.DIMENSION.posX,
                    top: E.DIMENSION.H_MA4K,
                  });
              }
            }),
            (this.onInnerResize = function(e) {
              t.isFunc(i.oninnerresize) && i.oninnerresize(e);
            }),
            (this.onRange = function(e) {
              !ae &&
                t.isFunc(i.onrange) &&
                e &&
                i.onrange({
                  isCompare: e.isCompare,
                  data: t.clone(e.datas),
                  width: E.DIMENSION.w_t,
                  height: E.DIMENSION.h_t,
                  viewRangeState: t.clone(ee),
                  range: [e.labelMinP, e.labelMaxP, e.labelMaxVol],
                  left: E.DIMENSION.posX,
                  top: E.DIMENSION.H_MA4K,
                });
            }),
            (this.onViewChanged = function() {
              t.isFunc(i.onviewchanged) &&
                i.onviewchanged({ viewRangeState: t.clone(ee) });
            }),
            (this.onViewPrice = function(r, n, o, s) {
              if (!ae && t.isFunc(i.onviewprice)) {
                if ((r || (r = a(r, n)), !r)) return;
                o || (o = X.getMainStock().getName());
                var l,
                  c,
                  d = t.clone(r);
                i.ennfloat
                  ? ((l = i.nfloat), (c = i.nfloat))
                  : ((l = t.strUtil.nfloat(d.price)),
                    (c = t.strUtil.nfloat(d.avg_price))),
                  (d.price = Number(d.price.toFixed(l))),
                  (d.avg_price = Number(d.avg_price.toFixed(c)));
                var m = i.symbol.length;
                "HK" == I &&
                  i.symbol.substring(m - 1, m) >= "A" &&
                  (d.avg_price = 0 / 0),
                  d.volume && d.volume < 0 && (d.volume = 0),
                  i.onviewprice({
                    curname: o || "",
                    data_array: X.getAllStock().length,
                    data: d,
                    idx: e,
                    left: E.DIMENSION.posX,
                    top: E.DIMENSION.H_MA4K,
                    interacting: !!s,
                  });
              }
            }),
            (this.onTechChanged = function(e) {
              t.isFunc(i.ontechchanged) && i.ontechchanged({ Indicator: e });
            }),
            (this.shortClickHandler = function() {
              t.isFunc(i.onshortclickmain) && i.onshortclickmain();
            });
        })(),
        oe = new (function() {
          var e,
            a,
            r,
            n,
            o,
            s = i.nfloat,
            l = 137,
            c = new (function() {
              var t = function(t) {
                var a = e.body.style;
                t && E.custom.show_floater
                  ? ((a.backgroundColor = E.COLOR.F_BG),
                    (a.color = E.COLOR.F_T),
                    (a.border = "1px solid " + E.COLOR.F_BR),
                    (a.display = ""))
                  : (a.display = "none");
              };
              (this.pv = function(a) {
                var i = e.body.style,
                  r = Math.max(E.DIMENSION.posX, 55) + 9,
                  n = E.DIMENSION.posX < 55 ? 9 : 0,
                  o = E.DIMENSION.getStageW() - l - 9 - E.DIMENSION.RIGHT_W - n;
                (i.left =
                  (a.x > (E.DIMENSION.getStageW() - E.DIMENSION.RIGHT_W) >> 1
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
                  h = d("div");
                (h.style.position = "absolute"),
                  (h.style.zIndex = E.PARAM.I_Z_INDEX + 2),
                  (h.style.padding = "2px"),
                  (h.style.width = l + "px"),
                  (h.style.lineHeight = "16px"),
                  (h.style.display = "none"),
                  (h.style.fontSize = "12px");
                var u,
                  v,
                  f,
                  g,
                  b = d("table"),
                  y = d("thead"),
                  N = d("tbody");
                (b.style.cssText = o),
                  (u = d("tr")),
                  (v = d("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = c);
                var k = d("span");
                v.appendChild(k),
                  u.appendChild(v),
                  y.appendChild(u),
                  (u = d("tr")),
                  (u.style.textAlign = "center"),
                  (v = d("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = c);
                var S = d("span");
                v.appendChild(S),
                  u.appendChild(v),
                  N.appendChild(u),
                  (u = d("tr")),
                  (v = d("th")),
                  (v.style.cssText = m),
                  (f = d("td")),
                  (v.style.fontWeight = "normal"),
                  (g = d("span")),
                  (g.innerHTML = "\u4ef7\u683c");
                var D = d("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  f.appendChild(D),
                  (v.style.fontWeight = "normal"),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = d("tr")),
                  (v = d("th")),
                  (v.style.cssText = m),
                  (v.style.fontWeight = "normal"),
                  (f = d("td")),
                  (g = d("span")),
                  (g.innerHTML = "\u5747\u4ef7");
                var w = d("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  (v.style.fontWeight = "normal"),
                  f.appendChild(w),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = d("tr")),
                  (v = d("th")),
                  (v.style.cssText = m),
                  (f = d("td")),
                  (v.style.fontWeight = "normal"),
                  (g = d("span")),
                  (g.innerHTML = "\u6da8\u8dcc");
                var x = d("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  f.appendChild(x),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = d("tr")),
                  (v = d("th")),
                  (v.style.cssText = m),
                  (f = d("td")),
                  (v.style.fontWeight = "normal"),
                  (g = d("span")),
                  (g.innerHTML = "\u6210\u4ea4");
                var T = d("span");
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
                  var a = E.COLOR.F_N;
                  return (
                    e > t
                      ? (a = E.COLOR.F_RISE)
                      : t > e && (a = E.COLOR.F_FALL),
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
                      ? (u = t.strUtil.nfloat(d))
                      : "LSE" === I && (u = 3),
                      i.ennfloat && (u = i.nfloat),
                      (c = isNaN(c) ? "--" : (100 * c).toFixed(2)),
                      (D.innerHTML = d.toFixed(u)),
                      (w.innerHTML = r() ? "--" : p.toFixed(u)),
                      (x.innerHTML = h.toFixed(u) + "(" + c + "%)");
                    var v = 2;
                    t.isCNK(i.symbol) && (v = 0),
                      (T.innerHTML = _(l.volume < 0 ? 0 : l.volume, v) + L),
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
                var t = d("div"),
                  a = d("div"),
                  i = d("span"),
                  r = d("span"),
                  n = e.isH,
                  o = 12,
                  s = function() {
                    if (
                      ((a.style.borderStyle = "dashed"),
                      (a.style.borderColor = E.COLOR.IVH_LINE),
                      (i.style.backgroundColor = r.style.backgroundColor =
                        E.COLOR[e.txtBgCN]),
                      (i.style.color = r.style.color = E.COLOR[e.txtCN]),
                      n)
                    )
                      (a.style.borderWidth = "1px 0 0 0"),
                        (t.style.width = a.style.width =
                          E.DIMENSION.getStageW() - E.DIMENSION.RIGHT_W + "px"),
                        (i.style.top = -(0.6 * E.STYLE.FONT_SIZE) + "px"),
                        (r.style.top = -(0.6 * E.STYLE.FONT_SIZE) + "px"),
                        (i.style.left = 0),
                        (r.style.left = E.DIMENSION.extend_draw
                          ? ""
                          : E.DIMENSION.getStageW() -
                            E.DIMENSION.RIGHT_W +
                            "px"),
                        (r.style.right = 0),
                        (i.style.width = r.style.width = E.DIMENSION.extend_draw
                          ? ""
                          : E.DIMENSION.posX + "px"),
                        (i.style.padding = "1px 0"),
                        (r.style.padding = "1px 0");
                    else {
                      a.style.borderWidth = "0 1px 0 0";
                      var o,
                        s,
                        l = E.DIMENSION.H_MA4K + E.DIMENSION.H_T_B;
                      E.DIMENSION.getStageH() < 0
                        ? ((o = W.clientHeight), (s = o - l))
                        : ((o = E.DIMENSION.getStageH() - B.clientHeight || 0),
                          (s = E.DIMENSION.h_t)),
                        (o -= l),
                        (o += E.DIMENSION.I_V_O),
                        (t.style.height = a.style.height = o + "px"),
                        (i.style.top = s + "px"),
                        (i.style.padding = "2px 2px 1px");
                    }
                  };
                (t.style.position = "absolute"),
                  (t.style.zIndex = E.PARAM.I_Z_INDEX - 2),
                  (i.style.position = r.style.position = a.style.position =
                    "absolute"),
                  (a.style.zIndex = 0),
                  (i.style.zIndex = r.style.zIndex = 1),
                  (i.style.font = r.style.font =
                    E.STYLE.FONT_SIZE + "px " + E.STYLE.FONT_FAMILY),
                  (i.style.whiteSpace = r.style.whiteSpace = "nowrap"),
                  (i.style.lineHeight = o + "px"),
                  (r.style.lineHeight = o + "px"),
                  e.txtA &&
                    (i.style.textAlign = e.txtA) &&
                    (r.style.textAlign = "left"),
                  e.txtBgCN &&
                    (i.style.backgroundColor = E.COLOR[e.txtBgCN]) &&
                    (r.style.backgroundColor = E.COLOR[e.txtBgCN]),
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
                      n = E.DIMENSION.getStageW();
                    t.style.left = a + "px";
                    var o = i.offsetWidth;
                    if ((0 >= o && (o = 112), o > 0)) {
                      var s = o >> 1;
                      e.x < s
                        ? (s = e.x)
                        : a + s > n - E.DIMENSION.posX &&
                          (s = a + o - n + E.DIMENSION.posX),
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
                txtA: "right",
              })),
                (n = new e({
                  isH: !1,
                  txtCN: "T_TC",
                  txtBgCN: "T_BG",
                  txtA: "center",
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
                      ? e[0].realLen + E.datas.tDataLen * (t - 1)
                      : E.datas.tDataLen * (t - 1)),
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
              q = U,
              H = A > 1,
              F = C[0].datas.length,
              $ = q * F,
              V = Math.floor((d * $) / E.DIMENSION.w_t);
            if (isNaN(d) && isNaN(p)) {
              if (((k = !0), u(), f(C[0].datas[F - 1][0].date, C[0].hq.date))) {
                var K;
                (K =
                  C[0].realLen >= 0
                    ? (q - 1) * (F - 1) + C[0].realLen
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
                var re = Math.floor(V / q),
                  oe = V % q;
                if (!Z[re]) return;
                if (
                  ((Q = Z[re][oe]),
                  (Q.date = Z[re][0].date),
                  H && C[ie].dAdd <= 1)
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
                      (Y = i.ennfloat ? s : t.strUtil.nfloat(g)),
                        (G = g.toFixed(Y));
                      break;
                    case "LSE":
                      (Y = i.ennfloat ? s : 3), (G = g.toFixed(Y));
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
            var le = "string" != typeof C[0].date ? v.ds(C[0].date) : C[0].date;
            if (F > 1) {
              W.realLen < 0 && (W.realLen = U);
              var ce = $ - q + W.realLen;
              5 == ee.end && V >= ce && ((V = ce), (L = te[re][V % U]));
            } else {
              if (v.stbd(se, v.sd(le)))
                -1 === W.realLen && (W.realLen = U),
                  V >= W.realLen && (V = W.realLen);
              else
                switch (I) {
                  case "HF":
                  case "NF":
                    V >= W.realLen && 4 == ee.start && (V = W.realLen);
                    break;
                  default:
                    S = U - 1;
                }
              R(I) &&
              v.stbd(se, v.sd(le)) &&
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
                    time: W.hq.time,
                  })
                : ((L = W.datas[0][V]),
                  (L.prevclose = W.datas[0][0].prevclose));
            }
            if (L && (L.date || (L.date = se), !L || L.date)) {
              var de = d;
              E.custom.stick && (d = L.ix || d);
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
                t.dateUtil.ds(pe, "/", !1) +
                "/" +
                t.dateUtil.nw(pe.getDay()) +
                (L.time || "");
              ("GOODS" === I || "hf_CHA50CFD" === i.symbol || "HF" === I) &&
                (he = L.time || "--"),
                (L.day = he),
                e &&
                  (e.setFloaterData({
                    stocktype: j,
                    name: B,
                    time: he,
                    data: L,
                  }),
                  c.pv({ x: de, y: E.DIMENSION.T_F_T })),
                r.pv({ y: p, oy: h, v: G, p: y }),
                n.pv({ v: he, x: d, ox: m, y: E.DIMENSION.H_MA4K }),
                b(V),
                ne.onViewPrice(L, V, B, !k),
                P.re(N.e.I_EVT, a.e);
            }
          }),
            (this.globalDragHandler = function(e, t, a, i, r) {
              isNaN(e) && isNaN(t) && P.re(N.e.I_EVT, r);
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
                o = "string" != typeof t[0].date ? v.ds(t[0].date) : t[0].date;
              1 >= a
                ? v.stbd(t[0].datas[0][0].date, v.sd(o))
                  ? 0 > n && (n = U)
                  : (n = U)
                : v.stbd(t[0].datas[a - 1][0].date, v.sd(o)) || (n = U);
              var s = U > n ? n + 1 : n;
              if (0 > D) {
                var l = U > n ? n : n - 1;
                (S = D = (a - 1) * U + l), (i = t[0].datas[a - 1][l]);
              } else if (D >= s + (a - 1) * U)
                if (v.stbd(t[0].datas[a - 1][0].date, v.sd(o)) && 0 > e) {
                  var c = 0;
                  (c = a > 1 ? n - 1 + U * (a - 1) : n - 1),
                    (S = D = c),
                    (i = t[0].datas[0][S]);
                } else (S = D = 0), (i = t[0].datas[0][0]);
              !m(K, oe.iHLineO.body) && K.appendChild(oe.iHLineO.body);
              var d = Math.floor(S / U);
              D >= U && (i = t[0].datas[d][S - d * U]),
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
                  oy: E.DIMENSION.H_MA4K,
                  ox: E.DIMENSION.posX,
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
                  !m(V, e.body) && V.appendChild(e.body);
                };
              (this.customFloater = function(e) {
                (i = e), n(), t.stc("t_fl", e);
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
                    (D > n * (U - 1) && (D = 0),
                    (i = Math.floor(D / (U - 1))),
                    n == i && (i -= 1),
                    D > U - 1)
                  ) {
                    var l = D - U * i;
                    s =
                      f(r.datas[i][0].date, r.hq.date) && l > S ? r.realLen : l;
                  } else s = 1 == n && 0 == i && D > S ? r.realLen : D;
                  if (
                    ((i = 0 > i ? 0 : i),
                    (s = 0 > s ? 0 : s),
                    (o = r.datas[i][s]))
                  )
                    if (
                      ((o.day =
                        t.dateUtil.ds(r.datas[i][0].date, "/", !1) +
                        "/" +
                        t.dateUtil.nw(r.datas[i][0].date.getDay()) +
                        (o.time || "")),
                      e && e.setFloaterData({}),
                      k)
                    )
                      if (f(r.datas[n - 1][0].date, r.hq.date))
                        (s = r.realLen >= 0 ? r.realLen : U - 1),
                          (s += (n - 1) * U),
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
                          t.dateUtil.ds(c, "/", !1) +
                          "/" +
                          t.dateUtil.nw(c.getDay()) +
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
              if (E.hasOwnProperty(a)) {
                for (var r in i)
                  if (i.hasOwnProperty(r) && t.isFunc(i[r]))
                    return void t.trace.error("illegal operation:", r);
                "DIMENSION" == a && (ie = 1),
                  u(E[a], i),
                  t.stc(a, i),
                  e.resize();
              } else t.trace.error("not exist param:", a);
            },
            r = function(e, a) {
              var i;
              if (E.hasOwnProperty(e)) {
                i = t.clone(E[e]);
                for (var r in i)
                  if (i.hasOwnProperty(r) && t.isFunc(i[r]))
                    (i[r] = null), delete i[r];
                  else if (a)
                    for (var n = a.length; n--; )
                      typeof i[r] === a[n] && ((i[r] = null), delete i[r]);
              }
              return i;
            },
            n = function(e, t, a) {
              (a = u({ toremove: !1, isexclusive: !1, callback: void 0 }, a)),
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
            !t.isArr(e) && (e = [e]), X.pushData(e, a);
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
                  r = { symbol: a, data: t[t.length - 1], market: i };
                X.pushData([r], 1);
              }, 20)));
          }),
            (this.setScale = function(e) {
              X.setScale(e), t.stc("t_scale", e);
            });
          var l = !0;
          this.showView = function(e, a) {
            oe.hideIUis(), l ? (l = !1) : J.hide();
            var r = N.URLHASH.vi(e);
            if (i.date) return (i.date = ""), o(r), void this.newSymbol(i);
            var n = X.getAllStock()[0];
            if (
              (ne.onRange(n), t.stc("t_v", e), t.suda("vw", e), ee.viewId != r)
            ) {
              if ((o(r), ("HF" == I || "NF" == I) && "t5" == e && 0 == C))
                return J.show(), (C = 1), void X.update5Data(e);
              X.onChangeView(!1, a), ne && ne.onViewPrice();
            }
          };
          var d = function(e) {
              var a;
              return (a = t.isStr(e.symbol) ? e.symbol.split(",") : [e.symbol]);
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
                (i.overlaycolor = e.linecolor || { K_N: "#cccccc" }),
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
                    ((i = t.isStr(e) ? e.split(",") : [e.symbol]),
                    1 == X.dAdd && X.removeCompare(i),
                    X.getAllStock().length <= 1)
                  ) {
                    for (r = 0; r < m.length; r++)
                      (X.dAdd = 2), X.compare({ symbol: m[r] });
                    m.length < 1 && (X.dAdd = 0);
                  }
                } else
                  2 == X.dAdd && X.removeCompare(m),
                    (X.dAdd = 1),
                    X.compare(e),
                    t.suda("t_comp");
                t.stc("t_comp", { rm: a, o: e });
              }
            });
          var p = 0;
          this.tCharts = function(e, a) {
            n("tech", e, a), a && !a.noLog && (0 == p ? (p = 1) : t.sudaLog());
          };
          var h = 0;
          (this.pCharts = function(e, a) {
            n("price", e, a), a && !a.noLog && (0 == h ? (h = 1) : t.sudaLog());
          }),
            (this.showPCharts = function(e) {
              e && (X.mM.togglePt(e), t.stc("t_sp", e));
            }),
            (this.getIndicators = function() {
              var e = Y ? Y.getLog() : null,
                t = Z ? Z.getLog() : null;
              return { tCharts: e, pCharts: t };
            });
          var f;
          (this.showRangeSelector = function(e) {
            (f = u({ dispaly: !0, from: void 0, to: void 0 }, e)),
              X.mM.showRs(f),
              t.stc("t_rs", e);
          }),
            (this.setLineStyle = function(e) {
              X && X.setTLineStyle(e), t.stc("t_style", e);
            }),
            (this.setCustom = y(a, this, "custom")),
            (this.setDimension = y(a, this, "DIMENSION")),
            (this.getDimension = y(r, null, "DIMENSION", ["boolean"])),
            (this.setTheme = function(e) {
              var t = re.initTheme(e);
              t && (this.setLineStyle({ linecolor: e }), this.resize());
            }),
            (this.newSymbol = function(e) {
              if (
                ((i.symbol = e.symbol),
                (i.date = e.date),
                oe.hideIUis(),
                oe.iReset(),
                X.dcReset(),
                X.dcInit(i),
                H.hideTip(),
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
                t.stc("t_ns", e);
            }),
            (this.resize = function(e, t) {
              re.resizeAll(!0, e, t);
            }),
            (this.hide = function(e) {
              (ae = !0),
                oe.hideIUis(),
                t.$CONTAINS($, V) && $.removeChild(V),
                e && X.dcReset();
            }),
            (this.show = function(e) {
              (ae = !1),
                e && (t.isStr(e) && (e = c(e)), ($ = e)),
                t.$CONTAINS($, V) || ($.appendChild(V), re.resizeAll(!0)),
                ne && ne.onViewPrice();
            }),
            (this.shareTo = function(e) {
              X.shareTo(e), t.stc("t_share", e);
              var a = e && e.type ? e.type : "weibo";
              t.suda("share", a);
            }),
            (this.getChartId = function() {
              return E.uid;
            }),
            (this.dateTo = function(e, a) {
              (i.historytime = e), (i.historycb = a);
              var r = e;
              "object" == typeof e ? (r = v.ds(e, "-")) : (e = v.sd(e));
              var n = j.get();
              if (null == n) return void (O = 1);
              for (var o = n.length, s = 0; o > s; s++)
                if (v.stbd(e, n[s][0].date))
                  return void X.moving(s, s + 1, "dateTo");
              (i.date = r),
                (X.hasHistory = a),
                t.stc("t_ft", r),
                this.newSymbol(i);
            }),
            (this.showScale = function(e) {
              X && X.setScale(e);
            }),
            (this.resize = function(e, t) {
              re.resizeAll(!0, e, t);
            }),
            (this.showCompatibleTip = function(e) {
              re.showCompatibleTip(e);
            }),
            (this.toggleExtend = function(e) {
              var t,
                i = E.DIMENSION.posX;
              (t = e ? "on" == !e : E.DIMENSION.extend_draw),
                a.call(this, "DIMENSION", {
                  extend_draw: !t,
                  posX: i > 9 ? E.DIMENSION.extend_padding : 55,
                  RIGHT_W: i > 9 ? E.DIMENSION.extend_padding : 55,
                }),
                this.resize();
            }),
            (this.historyData = function() {
              return X.historyData;
            }),
            (this.getExtraData = function(e) {
              return X.getExtraData(e);
            }),
            (this.patcher = { iMgr: oe.patcher }),
            (this.zoom = function(e) {
              X.zoomApi(e), t.stc("t_zoom", e, 9e3);
            }),
            (this.move = function(e) {
              (e = parseInt(e)),
                isNaN(e) || (X.moveApi(e), t.stc("t_move", e, 9e3));
            }),
            (this.getSymbols = function() {
              return X.getAllSymbols();
            }),
            (this.update = function() {
              X.updateDataAll(1), t.stc("t_up", "update", 9e3);
            }),
            (this.getCurrentData = function() {
              return ne.currentData();
            }),
            (this.viewState = ee),
            (this.me = P),
            (this.type = "h5t");
        })()),
        (X = new D()),
        X.dcInit(i),
        n
      );
    }
    function r() {
      function e(e, a) {
        var r = new i(e),
          n = function(e) {
            r.me.rl(e, n);
          };
        r.me.al(N.e.T_DATA_LOADED, n), t.isFunc(a) && a(r);
      }
      this.get = function(a, i) {
        t.stc("h5t_get"), t.suda("h5t_" + t.market(a.symbol));
        var r;
        0 == location.protocol.indexOf("https:") && (r = !0);
        var n = t.market(a.symbol),
          o =
            "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InterfaceInfoService.getMarket?category=$market&symbol=$symbol",
          s =
            "//stock.finance.sina.com.cn/usstock/api/jsonp.php/var $cb=/Global_IndexService.getTradeTime?symbol=$symbol&category=index";
        switch ((r && (o = t.getSUrl(o)), n)) {
          case "HF":
            var l = "kke_future_" + a.symbol;
            t.load(
              o
                .replace("$symbol", a.symbol.replace("hf_", ""))
                .replace("$market", "hf")
                .replace("$cb", "var " + l),
              function() {
                (l = window[l] || {
                  time: [
                    ["06:00", "23:59"],
                    ["00:00", "05:00"],
                  ],
                }),
                  (a._hf_window_var = l),
                  e(a, i);
              },
              null,
              { symbol: a.symbol, market: n, type: "init_hf" }
            );
            break;
          case "NF":
            var c = "kke_future_" + a.symbol,
              d = a.symbol.replace("nf_", "").replace(/[\d]+$/, "");
            t.load(
              o
                .replace("$symbol", d)
                .replace("$market", "nf")
                .replace("$cb", "var " + c),
              function() {
                (c = window[c] || {
                  time: [
                    ["09:30", "11:29"],
                    ["13:00", "02:59"],
                  ],
                }),
                  (c.inited = 0),
                  (a._nf_window_var = c),
                  e(a, i);
              },
              null,
              { symbol: a.symbol, market: n, type: "init_nf" }
            );
            break;
          case "global_index":
            var m = "kke_global_index_" + a.symbol;
            t.load(
              s
                .replace("$symbol", a.symbol.replace("znb_", ""))
                .replace("$cb", m),
              function() {
                (m = window[m] || {
                  time: [
                    ["06:00", "23:59"],
                    ["00:00", "05:00"],
                  ],
                }),
                  (a._gbi_window_var = m),
                  e(a, i);
              },
              null,
              { symbol: a.symbol, market: n, type: "init_global" }
            );
            break;
          default:
            e(a, i);
        }
      };
    }
    var n,
      o,
      s,
      l,
      c = t.$DOM,
      d = t.$C,
      m = t.$CONTAINS,
      p = t.xh5_PosUtil,
      h = t.xh5_EvtUtil,
      u = t.oc,
      v = t.dateUtil,
      f = t.dateUtil.stbd,
      g = t.xh5_ADJUST_HIGH_LOW.c,
      b = t.xh5_BrowserUtil,
      y = t.fBind,
      _ = t.strUtil.ps,
      N = e.globalCfg,
      k = t.logoM;
    return t.fInherit(i, t.xh5_EvtDispatcher), r;
  }
);

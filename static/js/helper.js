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
// endRepair

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
  produceAvg: function(arr) {
    for (
      var t, r = 0, i = 0;
      i < arr.length && ((t = arr[i]), !(t.price <= 0));
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
// end util

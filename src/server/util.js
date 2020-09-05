export const dataUtil = {
  dd: function(t) {
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  },
  ddt: function(t) {
    return new Date(t.getTime());
  },
  isSameDate: function(t, e) {
    return t &&
      e &&
      t.getFullYear() == e.getFullYear() &&
      t.getMonth() == e.getMonth()
      ? t.getDate() == e.getDate()
      : !1;
  },
  isSameTime: function(t, e) {
    return t && e ? t.getTime() == e.getTime() : !1;
  },
  stbs: function(t, e, i, n) {
    return t.getFullYear() == e && t.getMonth() == i ? t.getDate() == n : !1;
  },
  stbds: function(t, e, i) {
    !i && (i = "-");
    var n = e.split(i);
    return this.stbs(t, Number(n[0]), Number(n[1]) - 1, Number(n[2]));
  },
  ds: function(t, e, i, n, r, a) {
    "undefined" == typeof e && (e = "-");
    var o = [];
    if ((n || o.push(t[i ? "getUTCFullYear" : "getFullYear"]()), !r)) {
      var s = t[i ? "getUTCMonth" : "getMonth"]() + 1;
      o.push(10 > s ? "0" + s : s);
    }
    if (!a) {
      var l = t[i ? "getUTCDate" : "getDate"]();
      o.push(10 > l ? "0" + l : l);
    }
    return o.join(e);
  },
  dss: function(t, e, i) {
    var n = this.ds(t, e, i),
      r = [t["get" + (i ? "UTC" : "") + "Hours"]()],
      a = [t["get" + (i ? "UTC" : "") + "Minutes"]()],
      o = [t["get" + (i ? "UTC" : "") + "Seconds"]()],
      s = [
        10 > r ? "0" + r : r,
        10 > a ? "0" + a : a,
        10 > o ? "0" + o : o,
      ].join(":");
    return [n, s].join(" ");
  },
  dst: function(t, e, i) {
    var n = [t["get" + (i ? "UTC" : "") + "Hours"]()],
      r = [t["get" + (i ? "UTC" : "") + "Minutes"]()],
      a = [10 > n ? "0" + n : n, 10 > r ? "0" + r : r];
    if (e) {
      var o = [t["get" + (i ? "UTC" : "") + "Seconds"]()];
      a.push(10 > o ? "0" + o : o);
    }
    return a.join(":");
  },
  sd: function(t, e) {
    var i = t.split("-"),
      n = i[0],
      r = i[1] - 1 || 0,
      a = i[2] || 1,
      o = 0,
      s = 0,
      l = 0;
    return (
      e &&
        ((i = e.split(":")), (o = i[0] || 0), (s = i[1] || 0), (l = i[2] || 0)),
      new Date(n, r, a, o, s, l)
    );
  },
  ssd: function(t) {
    var e = t.split(" "),
      i = e[0],
      n = e[1];
    return this.sd(i, n);
  },
  gw: function(t, e) {
    var i = 6048e5,
      n = 2592e5,
      r = (t.getTime() - n) / i,
      a = (e.getTime() - n) / i;
    return Math.floor(r) == Math.floor(a);
  },
  gm: function(t, e) {
    return t.getFullYear() == e.getFullYear()
      ? t.getMonth() == e.getMonth()
      : !1;
  },
  gy: function(t, e) {
    return t.getFullYear() == e.getFullYear();
  },
  weekname: [
    "\u65e5",
    "\u4e00",
    "\u4e8c",
    "\u4e09",
    "\u56db",
    "\u4e94",
    "\u516d",
    "\u65e5",
  ],
  nw: function(t) {
    return this.weekname[t] || "";
  },
};
export const kUtil = {
  mw: function(datas, last, prevClose, n, r) {
    "number" != typeof n && (n = 0);
    var len = datas.length,
      o = datas[0];
    n > 1 && (o.volume /= n);
    var s,
      wArr = [],
      mArr = [],
      yArr = [];
    if (1 == len) {
      wArr[0] = {
        open: last.open,
        high: last.high,
        low: last.low,
        close: last.price,
        volume: last.totalVolume,
        amount: last.totalAmount,
        date: dataUtil.dd(last.date),
      };
      mArr[0] = {
        open: last.open,
        high: last.high,
        low: last.low,
        close: last.price,
        volume: last.totalVolume,
        amount: last.totalAmount,
        date: dataUtil.dd(last.date),
      };
      yArr[0] = {
        open: last.open,
        high: last.high,
        low: last.low,
        close: last.price,
        volume: last.totalVolume,
        amount: last.totalAmount,
        date: dataUtil.dd(last.date),
      };
    } else {
      for (
        var h,
          open = o.open,
          high = o.high,
          low = o.low,
          close = o.close,
          volume = o.volume,
          date = o.date,
          amount = o.amount,
          open2 = o.open,
          high2 = o.high,
          low2 = o.low,
          close2 = o.close,
          volume2 = o.volume,
          date2 = o.date,
          amount2 = o.amount,
          open3 = o.open,
          high3 = o.high,
          low3 = o.low,
          close3 = o.close,
          volume3 = o.volume,
          date3 = o.date,
          amount3 = o.amount,
          I = 1;
        len > I;
        I++
      ) {
        o = datas[I];
        n > 1 && (o.volume /= n);
        if (dataUtil.gw(datas[I - 1].date, o.date)) {
          o.high > high && (high = o.high),
            o.low < low && (low = o.low),
            (close = o.close),
            (volume += o.volume),
            (amount += o.amount),
            (date = o.date);
        } else {
          isNaN(r) ||
            ((s = date.getDay()),
            0 == s && (s = 7),
            (h = s - r),
            h > 0 &&
              ((date = dataUtil.ddt(date)), date.setDate(date.getDate() - h))),
            wArr.push({
              open: open,
              high: high,
              low: low,
              close: close,
              volume: volume,
              date: date,
              amount: amount,
            }),
            (open = o.open),
            (high = o.high),
            (low = o.low),
            (close = o.close),
            (volume = o.volume),
            (amount = o.amount),
            (date = o.date);
        }

        dataUtil.gm(datas[I - 1].date, o.date)
          ? (o.high > high2 && (high2 = o.high),
            o.low < low2 && (low2 = o.low),
            (close2 = o.close),
            (volume2 += o.volume),
            (amount2 += o.amount),
            (date2 = o.date))
          : (isNaN(r) ||
              ((s = date2.getDay()),
              0 == s && (s = 7),
              (h = s - r),
              h > 0 &&
                ((date2 = dataUtil.ddt(date2)),
                date2.setDate(date2.getDate() - h))),
            mArr.push({
              open: open2,
              high: high2,
              low: low2,
              close: close2,
              volume: volume2,
              date: date2,
              amount: amount2,
            }),
            (open2 = o.open),
            (high2 = o.high),
            (low2 = o.low),
            (close2 = o.close),
            (volume2 = o.volume),
            (amount2 = o.amount),
            (date2 = o.date));
        dataUtil.gy(datas[I - 1].date, o.date)
          ? (o.high > high3 && (high3 = o.high),
            o.low < low3 && (low3 = o.low),
            (close3 = o.close),
            (volume3 += o.volume),
            (amount3 += o.amount),
            (date3 = o.date))
          : (yArr.push({
              open: open3,
              high: high3,
              low: low3,
              close: close3,
              volume: volume3,
              date: date3,
              amount: amount3,
            }),
            (open3 = o.open),
            (high3 = o.high),
            (low3 = o.low),
            (close3 = o.close),
            (volume3 = o.volume),
            (date3 = o.date));
        if (I == len - 1) {
          wArr.push({
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
            date: date,
            amount: amount,
          });
          mArr.push({
            open: open2,
            high: high2,
            low: low2,
            close: close2,
            volume: volume2,
            date: date2,
            amount: amount2,
          });
          yArr.push({
            open: open3,
            high: high3,
            low: low3,
            close: close3,
            volume: volume3,
            date: date3,
            amount: amount3,
          });
        }
      }
    }
    return (
      (wArr[0].prevclose = prevClose),
      (mArr[0].prevclose = prevClose),
      (yArr[0].prevclose = prevClose),
      [wArr, mArr, yArr]
    );
  },
  nc: function(t, e, i, n) {
    if (t && !(t.length < 1)) {
      n = n || {};
      var r = t[t.length - 1];
      if (
        (168 == i && dataUtil.gw(r.date, e.date)) ||
        (720 == i && dataUtil.gm(r.date, e.date))
      )
        return (
          (r.day = String(e.today)
            .split("-")
            .join("/")),
          void (r.date = dataUtil.dd(e.date))
        );
      r = t[t.length - 1];
      var a = r.close,
        o = e.price - a,
        s = o / a;
      t.push({
        open: isNaN(n.price) ? a : n.price,
        high: isNaN(n.price) ? e.high : n.price,
        low: isNaN(n.price) ? e.low : n.price,
        close: isNaN(n.price) ? e.price : n.price,
        volume: isNaN(n.volume) ? e.totalVolume : n.volume,
        amount: isNaN(n.amount) ? e.totalAmount : n.amount,
        percent: s,
        day: String(e.today)
          .split("-")
          .join("/"),
        date: dataUtil.ddt(e.date),
        time: e.time,
        ampP: 0,
        amplitude: 0,
        change: o,
        kke_cs: 0,
      });
    }
  },
  pd: function(t, e) {
    var i = t.length,
      n = t[0],
      r = n.prevclose;
    (isNaN(r) || 0 >= r) && (r = n.open);
    for (var a = 0; i > a; a++) {
      if (
        ((n = t[a]),
        e && e.usePc && (r = n.prevclose),
        (n.amplitude = n.high - n.low),
        (n.ampP = n.amplitude / r),
        (n.change = n.close - r),
        (n.percent = n.change / r),
        (r = n.close),
        n.day)
      ) {
        var o = n.day.split(" ");
        (n.day = o[0]),
          (n.time = o[1].slice(0, 5)),
          (n.date = dataUtil.sd(n.day, n.time)),
          (n.day = n.day.split("-").join("/"));
      } else {
        var s = n.date,
          l = A.zp(s.getMonth() + 1),
          u = A.zp(s.getDate());
        n.day = [s.getFullYear(), l, u].join("/");
      }
      n.kke_cs = n.close > n.open ? 1 : n.open > n.close ? -1 : 0;
    }
  },
  ms: function(t, e, i, n, r) {
    return (
      i > t && (t += 24), Math.max(1, Math.ceil((60 * (t - i) + e - n) / r))
    );
  },
  spk: function(t, e, i, n, r) {
    if (t == e) return !0;
    var a = t.split(":"),
      o = Number(a[0]),
      s = Number(a[1]);
    a = e.split(":");
    var l = Number(a[0]),
      u = Number(a[1]);
    if ((o > l && 3 > o - l) || (o == l && s >= u)) return !0;
    if (60 != n || (r && /^forex/.test(r))) {
      a = i.split(":");
      var c = Number(a[0]),
        h = Number(a[1]),
        d = this.ms(o, s, c, h, n),
        f = this.ms(l, u, c, h, n);
      return d == f;
    }
    return ("10:30" != t && "11:30" != t && "14:00" != t && "15:00" != t) ||
      u == s
      ? !0
      : !1;
  },
  yd: function(t) {
    for (
      var e = t[t.length - 1].date.getFullYear(), i = [], n = t.length;
      n-- && t[n].date.getFullYear() == e;

    )
      i[i.length] = t[n];
    return (
      i.reverse(),
      (i[0].prevclose = t[n]
        ? t[n].prevclose || t[n].close
        : i[0].prevclose || i[0].close),
      i
    );
  },
  rd: function(t, e) {
    var i = [],
      n = dataUtil.dd(e);
    n.setFullYear(n.getFullYear() - 5);
    for (var r = t.length; r-- && !(t[r].date < n); ) i[i.length] = t[r];
    return i.reverse(), (i[0].prevclose = t[r] ? t[r].close : i[0].close), i;
  },
  adbd: function(t, e, i, n) {
    for (
      var r,
        a,
        o,
        s,
        l = i ? dataUtil.isSameTime : dataUtil.isSameDate,
        u = t.length,
        c = e.length;
      c--;

    ) {
      if (((o = e[c].date), 1 > u)) {
        c = e.length - t.length;
        for (var h = [], d = t[0]; c-- > 0; ) {
          if (((a = w(d) || {}), (a.isFake = !0), (a.kke_cs = 0), n))
            for (r in a) a.hasOwnProperty(r) && m(a[r]) && (a[r] = 0);
          h.push(a);
        }
        t = h.concat(t);
        break;
      }
      for (var f = u--; f-- && ((s = t[f].date), !l(o, s)); ) {
        if (o > s) {
          if (((a = w(t[f])), (a.isFake = !0), (a.date = o), (a.kke_cs = 0), n))
            for (r in a) a.hasOwnProperty(r) && m(a[r]) && (a[r] = 0);
          t.splice(++f, 0, a), u++;
          break;
        }
        t.splice(f, 1), u--;
      }
    }
    return u > 0 && t.splice(0, u), t;
  },
  ayd: function(t, e, i, n, r) {
    for (
      var a, o, s, l, u = dataUtil.isSameDate, c = t.length, h = e.length;
      h--;

    )
      if (((s = e[h]), !(s > r))) {
        if (n > s && !dataUtil.isSameDate(s, n)) break;
        for (var d = c--; d-- && ((l = t[d].date), !u(s, l)); ) {
          if (s > l) {
            o = w(t[d]);
            var f = o.close;
            for (a in o) o.hasOwnProperty(a) && m(o[a]) && (o[a] = 0);
            (o.open = o.high = o.low = o.close = f),
              (o.date = s),
              t.splice(++d, 0, o),
              c++;
            break;
          }
          t.splice(d, 1), c--;
        }
      }
    return c > 0 && t.splice(0, c), t;
  },
};

export function dateFormat(dateS, part) {
  if (dateS == "-" || typeof dateS == "undefined") {
    return "-";
  }
  if (dateS.length > 10) {
    dateS = dateS.split("T")[0].replace(/-/g, "/");
  }
  var date = new Date(dateS);
  var redate = "";
  part = part == null ? "yyyy-MM-dd HH:mm:ss" : part;
  var y = date.getFullYear();
  var M = date.getMonth() + 1;
  var d = date.getDate();
  var H = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var MM = M > 9 ? M : "0" + M;
  var dd = d > 9 ? d : "0" + d;
  var HH = H > 9 ? H : "0" + H;
  var mm = m > 9 ? m : "0" + m;
  var ss = s > 9 ? s : "0" + s;
  redate = part
    .replace("yyyy", y)
    .replace("MM", MM)
    .replace("dd", dd)
    .replace("HH", HH)
    .replace("mm", mm)
    .replace("ss", ss)
    .replace("M", M)
    .replace("d", d)
    .replace("H", H)
    .replace("m", m)
    .replace("s", s);
  return redate;
}

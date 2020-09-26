//1
export const i1 = {
  findArrayMax: function(t) {
    for (var e = [0], i = 0; i < t.length; i++)
      isNaN(t[i]) || e.push(parseFloat(t[i]));
    return (
      e.sort(function(t, e) {
        return e - t;
      }),
      e[0]
    );
  },
  findArrayMin: function(t) {
    for (var e = [0], i = 0; i < t.length; i++)
      isNaN(t[i]) || e.push(parseFloat(t[i]));
    return (
      e.sort(function(t, e) {
        return t - e;
      }),
      e[0]
    );
  },
  formatNumUnit: function(t, e, i) {
    if ("-" == t || "" == t || void 0 === t) return t;
    var n;
    if (
      ((e = e < 0 ? 0 : e),
      void 0 === i && (i = 5),
      (n = i < 5 ? 5 : i),
      void 0 === e)
    )
      if (Math.abs(t) < 0.01) {
        for (var a = Math.abs(t), o = 2, r = 1; r < 10; r++)
          if (a * Math.pow(10, r) > 1) {
            o = r + 1;
            break;
          }
        (e = o), (n = o + 2);
      } else {
        var s = (t + "").split(".");
        s[1] && (e = s[1].length > 4 ? 4 : s[1].length);
      }
    try {
      t = parseFloat(t);
    } catch (e) {
      return t;
    }
    var l,
      h = Math.abs(t),
      d = h / t,
      c = "";
    return (
      h >= 1e4 && h < 1e8
        ? ((c = "万"), (h /= 1e4))
        : h >= 1e8
        ? ((c = "亿"), (h /= 1e8))
        : h >= 1e12 && ((c = "万亿"), (h /= 1e12)),
      (h + "").indexOf(".") == n - 1 && (n += 1),
      (l = h.toFixed(e).substr(0, n)),
      d < 0 && (l = "-" + l),
      l.indexOf(".") == l.length - 1 && (l = l.substr(0, l.length - 1)),
      l + c
    );
  },
  secondsToTime: function(t) {
    function e(t) {
      return t >= 10 ? t : "0" + t;
    }
    var i = (t / 3600) % 24,
      n = Math.floor(i),
      a = i % 1,
      o = Math.round(60 * a);
    return e(n) + ":" + e(o);
  },
  floatToEven: function(t) {
    var e = Math.floor(t);
    return parseInt(t) % 2 == 0 ? e : e + 1;
  },
  dateFormat: function(t, e) {
    var i = {
      "M+": e.getMonth() + 1,
      "d+": e.getDate(),
      "h+": e.getHours(),
      "m+": e.getMinutes(),
      "s+": e.getSeconds(),
      "q+": Math.floor((e.getMonth() + 3) / 3),
      S: e.getMilliseconds(),
    };
    /(y+)/.test(t) &&
      (t = t.replace(
        RegExp.$1,
        (e.getFullYear() + "").substr(4 - RegExp.$1.length)
      ));
    for (var n in i)
      new RegExp("(" + n + ")").test(t) &&
        (t = t.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? i[n]
            : ("00" + i[n]).substr(("" + i[n]).length)
        ));
    return t;
  },
  URLObjToStr: function(t) {
    var e = [];
    for (var i in t) e.push(i + "=" + t[i]);
    return e.join("&");
  },
};

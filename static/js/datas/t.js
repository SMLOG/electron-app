xh5_define("datas.t", ["utils.util"], function(utils_util) {
  var _utils_util = utils_util,
      a = utils_util.HQ_DOMAIN,
      load = _utils_util.load,
      dateUtil = _utils_util.dateUtil,
      tUtil = _utils_util.tUtil,
      isHttps = 0 == location.protocol.indexOf("https:"),
      o = {
          isBond: function(e) {
              return /^(sh204\d{3}|sz1318\d{2})$/.test(e) ?
                  "bond" :
                  /^sh020\d{3}$/.test(e) ?
                  "bond" :
                  /^sz108\d{3}$/.test(e) ?
                  "bond" :
                  /^sh(009|010|018)\d{3}$/.test(e) ?
                  "bond" :
                  /^sz10\d{4}$/.test(e) ?
                  "bond" :
                  /^sh(100|110|112|113)\d{3}$/.test(e) ?
                  "bond" :
                  /^sz12\d{4}$/.test(e) ?
                  "bond" :
                  /^sh(105|120|129|139)\d{3}$/.test(e) ?
                  "bond" :
                  /^sz11\d{4}$/.test(e) ?
                  "bond" :
                  !1;
          },
          us: function(e, t, a) {
              for (var r, i = e.split(";"), n = [], s = 0, o = i.length; o > s; s++) {
                  var l,
                      c,
                      d,
                      p,
                      m,
                      u = i[s].split(",");
                  0 == s ?
                      (a ?
                          ((l = u[1].split(":")[0] + ":" + u[1].split(":")[1]),
                              (c = u[0]),
                              (d = Number(u[4])),
                              (p = Number(u[2])),
                              (m = Number(u[5]) || Number(u[4]))) :
                          ((m = t.prevclose),
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
                          })) :
                      ((l = u[0].split(":")[0] + ":" + u[0].split(":")[1]),
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
                  var r, i, s, o, l = tUtil.gata(a), c = [], d = e.length, p = 0, m = 0; d > p; p++
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
                  var u, v, h = 0, b = 0; p > h &&
                  ((l = t[h]),
                      (u = 0),
                      0 == h && (u = i ? 1 : 4),
                      0 == b && Number(l[1 + u]) <= 0 && (l[1 + u] = a.price),
                      !(a.index > 0 && !i && a.index <= utils_util.arrIndexOf(c, l[u]))); h++
              )
                  b++,
                  l && Number(l[1 + u]) > 0 && (o = Number(l[1 + u])),
                  l && Number(l[1 + u]) <= 0 && (l[1 + u] = o || 0),
                  l ?
                  ((m += Number(l[1 + u])),
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
                              isNaN(m) && ((m = Number(l[3])), (v.avp = m))))) :
                  i &&
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
                  ((o[0].today = o[0].date),
                      (o[0].date = _utils_util.dateUtil.sd(o[0].date))),
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
                  timeRange: [
                      ["07:00", "23:59"],
                      ["00:00", "06:00"]
                  ]
              }).td1;
              return (
                  n.length > 1 &&
                  ((n[0].today = n[0].date),
                      (n[0].date = _utils_util.dateUtil.sd(n[0].date))),
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
                  ((o[0].today = o[0].date),
                      (o[0].date = _utils_util.dateUtil.sd(o[0].date))),
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
                      u = 0; c > m; m++
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
                  var r, i, s, o, l = tUtil.gata(a), c = [], d = e.length, p = 0, m = 0; d > p; p++
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
              for (
                  var i, s, o = (tUtil.gtlse(), []), l = 0, c = e.length; c > l; l++
              ) {
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
                      p = i.length; p > d; d++
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
                  var s,
                      o = [],
                      l = tUtil.gata(r),
                      c = 3 * l.length,
                      d = 0,
                      p = 0,
                      m = 0; c > m; m += 3
              )
                  (p = Math.floor(m / 3)),
                  a ?
                  (o[o.length] = {
                      time: l[p],
                      price: t[m + 1] / 1e3
                  }) :
                  ((o[o.length] = {
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
                      (0 == p ?
                          (o[p].price = o[p].avg_price = i.prevclose) :
                          ((o[p].price = o[p - 1].price),
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
                      0 == u && "" == a[0] ?
                      tUtil.gltbt(1, i.prevclose) :
                      _utils_util.xh5_S_KLC_D(a[u]);
                  var h,
                      b = 0;
                  p[u].splice(120, 1);
                  var f;
                  for (
                      utils_util.isRepos(i.symbol) ?
                      ((f = 271), p[u].splice(f, p[u].length - f)) :
                      (f = 241),
                      l = 0,
                      c = f; c > l; l++
                  )
                      p[u][l] &&
                      0 == p[u][l].price &&
                      (0 == l ?
                          (p[u][l].price = p[u][l].avg_price = p[u][l].prevclose) :
                          ((p[u][l].price = p[u][l - 1].price),
                              (p[u][l].avg_price = p[u][l - 1].avg_price))),
                      utils_util.isRepos(i.symbol) &&
                      (p[u][l] ?
                          ((p[u][l].avg_price = p[u][l].price),
                              (p[u][l].volume *= 10)) :
                          (p[u][l] = {
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
                  f > 5 && p.splice(0, f - 5), o = [m], f = s.length, u = f - 2; u > f - 6; u--
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
                      "HF" == utils_util.market(r.symbol) ?
                      tUtil.gltbt(1, r.prevclose, !1, s, [i[p]], o.time) :
                      "NF" == utils_util.market(r.symbol) ?
                      tUtil.gltbt(1, r.prevclose, !1, s, [i[p]], o.time) :
                      "global_index" == utils_util.market(r.symbol) ?
                      tUtil.gltbt(1, r.prevclose, !1, s, [i[p]], o.time) :
                      tUtil.gltbt(1, r.prevclose, !1, s, [i[p]])
                  );
              return c;
          },
          fund: function(e) {
              var t = [];
              if (e)
                  for (
                      var a = e.detail.split(","), r = 0, i = 0, n = a.length; n > i; i += 2
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
                                  i ?
                                  ((p.prevclose = Number(e[0].prevclose) || Number(e[0].p)),
                                      (p.date = _utils_util.dateUtil.sd(e[0].d)),
                                      (p.today = e[0].d)) :
                                  ((p.prevclose = a.prevclose),
                                      "HF" == r || "NF" == r ?
                                      ((p.date = _utils_util.dateUtil.sd(e[0].d) || a.date),
                                          (p.today = e[0].d || a.today)) :
                                      ((p.date = a.date), (p.today = a.today))),
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
                          ("NF" == r && "21:00" == b && p.time > "21:00" && y < o[v]) ?
                          (0 == v ?
                              i ?
                              ((p.price = e[0].p),
                                  (p.prevclose = e[0].prevclose || p.price),
                                  (p.avg_price = e[0].avp),
                                  (p.date = _utils_util.dateUtil.sd(e[0].d)),
                                  (p.today = e[0].d)) :
                              ((p.price =
                                      "US" === r || "HK" === r ?
                                      a.prevclose :
                                      a.open || a.prevclose),
                                  (p.prevclose = a.prevclose),
                                  (p.avg_price = p.price),
                                  (p.symbol = a.symbol),
                                  (p.name = a.name),
                                  "NF" === r ?
                                  ((p.date = _utils_util.dateUtil.sd(e[0].d) || a.date),
                                      (p.today = e[0].d || a.today)) :
                                  ((p.date = a.date), (p.today = a.today))) :
                              ((p.price = m[v - 1].price),
                                  (p.avg_price = m[v - 1].avg_price),
                                  ("option_cn" == r || "op_m" == r || "NF" == r) &&
                                  (p.holdPosition = m[v - 1].holdPosition)),
                              (p.volume = -0.01)) :
                          0 != v ||
                          i ||
                          ((p.price =
                                  "US" == r ?
                                  e[f].p || a.prevclose :
                                  e[f].p || a.open || a.prevclose),
                              (p.prevclose = a.prevclose),
                              (p.avg_price = e[f].avp || p.price),
                              (p.symbol = a.symbol),
                              (p.name = a.name),
                              (p.volume = 0),
                              "HF" == r || "NF" == r ?
                              ((p.date = _utils_util.dateUtil.sd(e[0].d) || a.date),
                                  (p.today = e[0].d || a.today)) :
                              ((p.date = a.date), (p.today = a.today)));
                  }
              }
              return (m[0].index = h - 1), m;
          }
      };
  return new(function() {
      this.VER = "2.8.0";
      var l = "http://finance.sina.com.cn/realstock/company/klc_td_sh.txt",
          c = {
              REPO: {
                  T_Head_STR: "hq_str_ml_",
                  T_EMI_URL: "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
                  T_URL: "http://" + a + ".sinajs.cn/?_=$rn&list=$symbol",
                  T5_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm_nhg.js?day=$rn",
                  TRADING_DATES_URL: l,
                  HISTORY_DATA_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
                  LAST5_URL: "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn"
              },
              CN: {
                  T_Head_STR: "hq_str_ml_",
                  T_EMI_URL: "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
                  T_URL: "http://" + a + ".sinajs.cn/?_=$rn&list=$symbol",
                  T5_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm.js?day=$rn",
                  TRADING_DATES_URL: l,
                  HISTORY_DATA_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
                  LAST5_URL: "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn"
              },
              option_cn: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
                  T5_URL: "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getFiveDayLine?symbol=$symbol&random=$rn&callback=$cb=",
                  TRADING_DATES_URL: l
              },
              op_m: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock.finance.sina.com.cn/futures/api/openapi.php/FutureOptionAllService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
                  TRADING_DATES_URL: l
              },
              US: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb=/US_MinlineNService.getMinline?symbol=$symbol&day=1&random=$rn",
                  T5_URL: "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinlineNService.getMinline?symbol=$symbol&day=5&random=$rn",
                  TRADING_DATES_URL: "http://stock.finance.sina.com.cn/usstock/api/openapi.php/US_MinKService.getTradeDays?&start_day=$start&end_day=$end&callback=$cb="
              },
              HK: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock.finance.sina.com.cn/hkstock/api/openapi.php/HK_StockService.getHKMinline?symbol=$symbol&random=$rn&callback=$cb=",
                  T5_URL: "http://quotes.sina.cn/hk/api/openapi.php/HK_MinlineService.getMinline?symbol=$symbol&day=5&callback=$cb=",
                  LAST5_URL: "http://stock.finance.sina.com.cn/hkstock/api/jsonp_v2.php/$cb/HK_StockService.getStock5DayAvgVolume?symbol=$symbol",
                  TRADING_DATES_URL: l
              },
              fund: {
                  T_Head_STR: "t1",
                  T_URL: "http://app.xincai.com/fund/api/jsonp.json/$cb=/XinCaiFundService.getFundYuCeNav?symbol=$symbol&___qn=3",
                  TRADING_DATES_URL: l
              },
              global_index: {
                  T_Head_STR: "t1",
                  T_URL: "//stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb=/Global_IndexService.getTimeLine?symbol=$symbol",
                  TRADING_DATES_URL: l
              },
              CFF: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
                  T5_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
                  TRADING_DATES_URL: l
              },
              OTC: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock.finance.sina.com.cn/thirdmarket/api/openapi.php/NQHQService.minline?symbol=$symbol&callback=$cb=",
                  TRADING_DATES_URL: l
              },
              NF: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
                  T5_URL: "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
                  TRADING_DATES_URL: l
              },
              HF: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFuturesMinLine?symbol=$symbol&callback=$cb=",
                  T5_URL: "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFutures5MLine?symbol=$symbol&callback=$cb=",
                  TRADING_DATES_URL: l
              },
              GOODS: {
                  T_Head_STR: "t1",
                  T_URL: "http://stock2.finance.sina.com.cn/futures/api/openapi.php/SpotService.getMinLine?symbol=$symbol&callback=$cb=",
                  TRADING_DATES_URL: l
              },
              MSCI: {
                  T_Head_STR: "t1",
                  T_URL: "http://quotes.sina.cn/msci/api/openapi.php/MSCIService.getMinLine?symbol=$symbol&callback=$cb=",
                  TRADING_DATES_URL: l
              },
              LSE: {
                  T_Head_STR: "t1",
                  T_URL: "http://quotes.sina.cn/lse/api/openapi.php/LSEService.minline?symbol=$symbol&type=1&callback=$cb=",
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
                      1 === config.assisthq ?
                      "," + b + ",gb_ixic,sys_time" :
                      "," + b + ",sys_time"),
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
                  return g ?
                      ((r = g.split("-")[1] || "01"),
                          (a = g.split("-")[0]),
                          g.split("-")[1] &&
                          Number(g.split("-")[1]) < 10 &&
                          ((r = "0" + Number(g.split("-")[1])),
                              (g = a + "-" + r + "-" + g.split("-")[2])),
                          (t = "MLC_" + b + "_" + a + "_" + r), {
                              lc: t,
                              year: a,
                              month: r
                          }) :
                      ((g = e), null);
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
                                      R = 0; _ > R; R++
                              ) {
                                  (h[R] = _utils_util.xh5_S_KLC_D(v[R])),
                                  (l = h[R].shift()),
                                  (h[R][0].prevclose = l.prevclose),
                                  (h[R][0].date = l.date),
                                  h[R].splice(120, 1),
                                      (c = 0);
                                  for (var T = 0; 241 > T; T++)
                                      (p = utils_util.isCNK(b) ?
                                          h[R][T].volume :
                                          (h[R][T].volume /= 100)),
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
                                                  l = 5 - r; l > 0; l--
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
                                      null, {
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
                          (N.msg = "nohistory"),
                          _utils_util.isFunc(callback) && callback(N);
                      }, {
                          market: f,
                          symbol: b,
                          type: "historydata"
                      }
                  );
              },
              U = function(e) {
                  return d[b + e.year + e.month] ?
                      void(
                          _utils_util.isFunc(callback) &&
                          callback(d[b + e.year + e.month])
                      ) :
                      void T(e);
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
                      tradeDatesUrlcallback(
                          n,
                          b,
                          c,
                          p,
                          callback,
                          config.dataformatter,
                          k
                      );
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
                                      var r = window.usHistorydate.result.data, d = r.length; d--;

                                  )
                                      r[d] = utils_util.dateUtil.sd(r[d]);
                                  r.length > 0 &&
                                      !_utils_util.dateUtil.stbd(r[r.length - 1], n.date) &&
                                      r.push(n.date),
                                      (p = o.gdf(r, n.date, !0)),
                                      tradeDatesUrlcallback(
                                          n,
                                          b,
                                          c,
                                          p,
                                          f,
                                          callback,
                                          config.dataformatter,
                                          k,
                                          s,
                                          l
                                      );
                              },
                              null, {
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
                              null, {
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
                                  time: [
                                      ["06:00", "23:59"],
                                      ["00:00", "05:00"]
                                  ]
                              },
                              l = window["kke_future_" + a.symbol] || {
                                  time: [
                                      ["09:30", "11:29"],
                                      ["13:00", "02:59"]
                                  ]
                              },
                              d = window["kke_global_index_" + a.symbol] || {
                                  time: [
                                      ["09:30", "11:29"],
                                      ["13:00", "02:59"]
                                  ]
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
                                          u < e.result.data.minLine_1d[0][0] ?
                                          tUtil.gltbt(1, a.prevclose, !0, f, null, o.time) :
                                          S(e, a, o)),
                                      "hf_ES" == a.symbol &&
                                          a.time > o.time[0][0] &&
                                          !_utils_util.dateUtil.stbd(r[0].date, a.date) &&
                                          (r = tUtil.gltbt(
                                              1,
                                              a.prevclose,
                                              !0,
                                              f,
                                              [a.date],
                                              o.time
                                          ));
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
                                  void(_utils_util.isFunc(callback) && callback(N))
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
                      function() {}, {
                          market: f,
                          symbol: a.symbol,
                          type: "t1"
                      }
                  );
              },
              L = function() {
                  "LSE" === f && (h = utils_util.strUtil.replaceStr(h)),
                      KKE.api(
                          "datas.hq.get", {
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
                                      (N.msg = "error"),
                                      void(_utils_util.isFunc(callback) && callback(N))
                                  );
                              var r = m(k, b, "T_URL")
                                  .replace("$rn", new Date().getTime())
                                  .replace("$symbol", l)
                                  .replace("$cb", "var t1" + s),
                                  n = R(a.today);
                              return "CN" != f ||
                                  _utils_util.dateUtil.stbd(
                                      _utils_util.dateUtil.sd(a.today),
                                      _utils_util.dateUtil.sd(g)
                                  ) ?
                                  void D(r, a) :
                                  void U(n);
                          }
                      );
              };
          L();
      };
      var tradeDatesUrlcallback = function(
          hqObj,
          papercode,
          timeDatasArr,
          dateArr,
          marketCode,
          callback,
          dataformatter,
          h,
          b,
          f,
          g
      ) {
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
              return (
                  (dataObj.msg = "error"),
                  void(_utils_util.isFunc(callback) && callback(dataObj))
              );
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
                          b && b.length > 0 ?
                              (b.forEach(function(e, t) {
                                      var a = 0;
                                      if (
                                          (e.forEach(function(t, a) {
                                                  "12:00:00" == t.m && e.splice(a, 1);
                                              }),
                                              e.forEach(function(e, t) {
                                                  var r = e.m.split(":");
                                                  e.date &&
                                                      ((e.today = e.date), (e.date = dateUtil.sd(e.date))),
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
                                                  c = o.length; c > l; l++
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
                                  b.length <= 4 ?
                                  ((u = o.ctdb(
                                          5,
                                          timeDatasArr,
                                          hqObj,
                                          dateArr,
                                          marketCode
                                      )),
                                      u.forEach(function(e) {
                                          b.forEach(function(t) {
                                              e[0].date == t[0].date && (e = t);
                                          });
                                      }),
                                      (dataObj.data.td5 = u)) :
                                  (dateUtil.stbd(
                                          b[b.length - 2][0].date,
                                          timeDatasArr[0].date
                                      ) &&
                                      ((timeDatasArr[0].today = b[b.length - 1][0].today),
                                          (timeDatasArr[0].date = b[b.length - 1][0].date)),
                                      (b[b.length - 1] = timeDatasArr),
                                      (dataObj.data.td5 = b))) :
                              ((u = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode)),
                                  (dataObj.data.td5 = u));
                          var f = "lastfive" + papercode,
                              g = papercode.substring(2);
                          load(
                              m(h, papercode, "LAST5_URL")
                              .replace("$rn", new Date().getHours())
                              .replace("$symbol", g)
                              .replace("$cb", "var " + f + "="),
                              function() {
                                  var e = window[f];
                                  return e ?
                                      ((dataObj.data.td5[4][0].lastfive = p = Number(e.volume)),
                                          void(_utils_util.isFunc(callback) && callback(dataObj))) :
                                      void(_utils_util.isFunc(callback) && callback(dataObj));
                              },
                              function() {
                                  (dataObj.data.td5 = u),
                                  _utils_util.isFunc(callback) && callback(dataObj);
                              }, {
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
                          for (var m = p.length; m--;) {
                              var u = o.us(p[m], hqObj, !0);
                              p[m] = o.pkt(u, hqObj, marketCode, !0);
                          }
                          if (((window["t5" + papercode] = null), "" == r))
                              dataObj.msg = "empty";
                          else {
                              dataObj.msg = "";
                              var v = dateArr.length,
                                  h = 0,
                                  f = p.length,
                                  g = [];
                              for (m = v - 1; m > v - 6; m--)
                                  g.unshift(
                                      tUtil.gltbt(1, hqObj.prevclose, !1, "US", [dateArr[m]])
                                  );
                              for (m = v - 1; m > v - 6; m--) {
                                  for (var y, k = 0, N = 0; f > N; N++)
                                      _utils_util.dateUtil.stbd(dateArr[m], p[N][0].date) &&
                                      ((y = p[N]), (k = 1), (h = N));
                                  0 == k &&
                                      (y = tUtil.gltbt(1, g[h][0].prevclose, !1, "US", [
                                          dateArr[m]
                                      ])),
                                      i.unshift(y);
                              }
                          }
                          (i[4] = timeDatasArr),
                          (dataObj.data.td5 = i),
                          _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      null, {
                          market: marketCode,
                          symbol: hqObj.symbol,
                          type: "t5"
                      }
                  );
              },
              N = function(i) {
                  var n =
                      "CFF_RE_" == papercode.substring(0, 7) ?
                      papercode.slice(7) :
                      papercode;
                  load(
                      m(h, papercode, "T5_URL")
                      .replace("$rn", new Date().getTime())
                      .replace("$symbol", n)
                      .replace("$cb", "var t5" + papercode),
                      function() {
                          var r = window["t5" + papercode],
                              n = [];
                          if (((window["t5" + papercode] = null), "" == r))
                              dataObj.msg = "empty";
                          else {
                              if (void 0 == r) return (dataObj.msg = "data error."), void R();
                              dataObj.msg = "";
                              for (var l = [], p = r.length, m = 0; p > m; m++) {
                                  var u = o.futures(r[m], hqObj, marketCode, "his", i);
                                  if (
                                      !_utils_util.dateUtil.stbd(
                                          _utils_util.dateUtil.sd(u[0].d),
                                          hqObj.date
                                      )
                                  ) {
                                      var v = o.pkt(u, hqObj, marketCode, !0);
                                      l.push(v), n.push(v);
                                  }
                              }
                          }
                          (n[4] = timeDatasArr),
                          (dataObj.data.td5 = n),
                          _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      null, {
                          market: marketCode,
                          symbol: hqObj.symbol,
                          type: "t5"
                      }
                  );
              },
              R = function(a) {
                  (dataObj.data.td5 = o.ctdb(
                      5,
                      timeDatasArr,
                      hqObj,
                      dateArr,
                      marketCode,
                      a
                  )),
                  _utils_util.isFunc(callback) && callback(dataObj);
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
                              }); n.length > 5;

                          )
                              n.shift();
                          timeDatasArr[0].today !== n[4][0].today ?
                              (n.length >= 5 && n.shift(), n.push(timeDatasArr)) :
                              (n[4] = timeDatasArr),
                              (dataObj.data.td5 = n),
                              _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      null, {
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
                          if (((window["t5" + papercode] = null), "" == r))
                              dataObj.msg = "empty";
                          else {
                              if (void 0 == r) return (dataObj.msg = "data error."), void R();
                              dataObj.msg = "";
                              for (
                                  var p = [],
                                      m = r.result.data[papercode.replace("hf_", "")].length,
                                      u = 0; m > u; u++
                              ) {
                                  var v = o.hf(
                                      r.result.data[papercode.replace("hf_", "")][u],
                                      hqObj,
                                      marketCode,
                                      "his",
                                      i
                                  );
                                  if (
                                      !_utils_util.dateUtil.stbd(
                                          _utils_util.dateUtil.sd(v[0].d),
                                          hqObj.date
                                      )
                                  ) {
                                      var h = o.pkt(v, hqObj, marketCode, !0, i);
                                      p.push(h);
                                  }
                              }
                              for (
                                  var b = [], f = timeDatasArr[0].date || hqObj.date, g = 1; b.length < 6;

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
                                      if (
                                          _utils_util.dateUtil.stbd(p[p.length - k][0].date, b[u])
                                      ) {
                                          l.unshift(p[p.length - k]), T++;
                                          break;
                                      }
                                      if (k == p.length - 1) {
                                          for (var U = 0, S = 1; S <= p.length; S++)
                                              _utils_util.dateUtil.stbd(
                                                  p[p.length - S][0].date,
                                                  b[u]
                                              ) && (U = 1);
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
                          (l[4] = timeDatasArr),
                          (dataObj.data.td5 = l),
                          _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      null, {
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
                          if (((window["t5" + papercode] = null), "" == r))
                              dataObj.msg = "empty";
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
                          (c[4] = timeDatasArr),
                          (dataObj.data.td5 = c),
                          _utils_util.isFunc(callback) && callback(dataObj);
                      },
                      null, {
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
                              ?
                              ((dataObj.msg = "empty"),
                                  (u = o.ctdb(5, timeDatasArr, hqObj, dateArr, marketCode))) :
                              ((dataObj.msg = ""),
                                  (v = n.split(",")),
                                  (u = o.ctdf(v, timeDatasArr, hqObj, dateArr))),
                              o.isBond(papercode) ?
                              ((dataObj.data.td5 = u),
                                  _utils_util.isFunc(callback) && callback(dataObj)) :
                              load(
                                  m(h, papercode, "LAST5_URL")
                                  .replace("$rn", new Date().getHours())
                                  .replace("$symbol", papercode),
                                  function() {
                                      var a = window[i];
                                      if (!a || !a.lastfive)
                                          return (
                                              (dataObj.data.td5 = u),
                                              void(
                                                  _utils_util.isFunc(callback) && callback(dataObj)
                                              )
                                          );
                                      for (var r = a.lastfive.length; r--;)
                                          for (var n = a.lastfive[r].d, s = u.length - 1; s--;)
                                              if (
                                                  _utils_util.dateUtil.stbds(u[s][0].date, n, null)
                                              ) {
                                                  u[s][0].lastfive = Number(a.lastfive[r].c);
                                                  break;
                                              }
                                              (p = hqObj.lastfive ? hqObj.lastfive : 0),
                                              (dataObj.data.td5 = u),
                                      _utils_util.isFunc(callback) && callback(dataObj);
                                  },
                                  function() {
                                      (dataObj.data.td5 = u),
                                      _utils_util.isFunc(callback) && callback(dataObj);
                                  }, {
                                      market: marketCode,
                                      symbol: hqObj.symbol,
                                      type: "lastfive"
                                  }
                              );
                      },
                      function() {
                          (dataObj.data.td5 = o.ctdb(
                              5,
                              timeDatasArr,
                              hqObj,
                              dateArr,
                              marketCode
                          )),
                          (dataObj.msg = "error"),
                          _utils_util.isFunc(callback) && callback(dataObj);
                      }, {
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
// end data.t
xh5_define("datas.hq", ["utils.util"], function(utils_util) {
  "use strict";
  var t = utils_util.load,
      r = utils_util.fBind,
      a = utils_util.market,
      i = utils_util.cookieUtil,
      n = utils_util.dateUtil,
      m = utils_util.tUtil,
      u = 0 == location.protocol.indexOf("https:"),
      s = utils_util.HQ_DOMAIN,
      o = new(function() {
          var e,
              r = "sinaH5EtagStatus",
              a = {
                  domain: "",
                  path: "/",
                  expires: 3600
              },
              n = "n",
              m = "y",
              o = 0,
              d =
              (u ? "https" : "http") + "://" + s + ".sinajs.cn/list=sys_hqEtagMode",
              l = function() {
                  t(d, function() {
                      var t = window.hq_str_sys_hqEtagMode;
                      0 == o ?
                          (o = t) :
                          (o == t ?
                              ((e = !1), i.set(r, n, a)) :
                              ((e = !0), i.set(r, m, a)),
                              (o = 0));
                  });
              },
              b = function() {
                  var t = i.get(r);
                  switch (t) {
                      case n:
                          e = !1;
                          break;
                      case m:
                          e = !0;
                          break;
                      default:
                          (e = !1), l();
                  }
              };
          b(),
              setInterval(b, 2e3),
              (this.isETag = function() {
                  return e;
              });
      })(),
      d = function(e, t) {
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
      l = function() {
          function i(t, r, a) {
              var i = {},
                  n = f[t];
              n ||
                  ((n = {
                          symbol: t
                      }),
                      (f[t] = n));
              var m = _.trHandler(a, n);
              m && (n.trstr = a), (i[t] = n);
              var u = {
                  msg: "",
                  dataObj: i
              };
              return utils_util.isFunc(r) && r(u), u;
          }

          function l(e) {
              return /^nf_(IF|IC|IH|TF|TS)\w+$/.test(e) ?
                  "CFF" :
                  /^nf_T(\d{4}|0)$/.test(e) ?
                  "CFF" :
                  "NF";
          }

          function b(paperCodesStr, callback, i, n) {
              if (n && --n.count > 0) return null;
              for (
                  var paperCode,
                      marketCode,
                      s,
                      hqStr,
                      hqStr_i,
                      hqStrDataArr,
                      p,
                      paperCodeArr = paperCodesStr.split(","),
                      data = [],
                      dataObj = {},
                      f = 0,
                      length = paperCodeArr.length; length > f; f++
              ) {
                  if (
                      ((paperCode = paperCodeArr[f]),
                          (s = g[paperCode]),
                          s ||
                          ((s = {
                                  symbol: paperCode
                              }),
                              (g[paperCode] = s)),
                          (marketCode = a(paperCode)),
                          i)
                  )
                      hqStr = i;
                  else
                      switch (((hqStr = window["hq_str_" + paperCode]), marketCode)) {
                          case "HK":
                              (hqStr_i =
                                  window["hq_str_" + paperCode.replace("rt_", "") + "_i"]),
                              (p = window.hq_str_rt_hkHSI);
                              break;
                          case "US":
                              p =
                                  window.hq_str_gb_$ixic ||
                                  window.hq_str_gb_ixic ||
                                  window.hq_str_gb_$dji ||
                                  window.hq_str_gb_dji;
                              break;
                          default:
                              hqStr_i = window["hq_str_" + paperCode + "_i"];
                      }
                  hqStrDataArr = hqStr && hqStr.length > 0 ? hqStr.split(",") : void 0;
                  var P;
                  switch (marketCode) {
                      case "REPO":
                          P = _;
                          break;
                      case "CN":
                          P = _;
                          break;
                      case "CNI":
                          P = _;
                          break;
                      case "US":
                          P = x;
                          break;
                      case "HK":
                          P = A;
                          break;
                      case "OTC":
                          P = F;
                          break;
                      case "HF":
                          P = j;
                          break;
                      case "GOODS":
                          P = q;
                          break;
                      case "NF":
                          P = "CFF" == l(paperCode) ? D : C;
                          break;
                      case "global_index":
                          P = O;
                          break;
                      case "fund":
                          P = k;
                          break;
                      case "op_m":
                      case "option_cn":
                          P = E;
                          break;
                      case "forex":
                      case "forex_yt":
                          P = S;
                          break;
                      case "CFF":
                          P = D;
                          break;
                      case "BTC":
                          P = y;
                          break;
                      case "MSCI":
                          P = T;
                          break;
                      case "LSE":
                          P = U;
                          break;
                      default:
                          P = void 0;
                  }
                  var w = !0;
                  P && (w = P.update(hqStrDataArr, s, hqStr_i, p)),
                      w && (s.hqstr = hqStr),
                      data.push(s),
                      (dataObj[paperCode] = s);
              }
              var H = {
                  msg: "",
                  data: data,
                  dataObj: dataObj
              };
              return utils_util.isFunc(callback) && callback(H), H;
          }

          function p(t) {
              var r = 40,
                  a = t.split(","),
                  i = [];
              for (a = utils_util.uae(a); a.length > r;) i.push(a.splice(0, r));
              return i.push(a.splice(0, a.length)), i;
          }
          this.VER = "2.8.0";
          var N,
              h = {
                  "00": "",
                  "01": "停牌一小时",
                  "02": "停牌一天",
                  "03": "连续停牌",
                  "04": "盘中停牌",
                  "05": "停牌半天",
                  "06": "停牌半小时",
                  "07": "暂停",
                  "08": "可恢复交易熔断",
                  "09": "不可恢复交易熔断"
              },
              c = new Date().getTime(),
              g = {},
              f = {},
              v = new(function() {
                  var e = s + ".sinajs.cn",
                      r = "://" + e + "/?_=$rn&list=$symbol",
                      a = "://" + e + "/etag.php?_=" + c + "&list=$symbol",
                      i = function(e) {
                          var t,
                              i = u ? "https" : e.ssl ? "https" : "http";
                          return (t = e.cancelEtag ?
                              i + r.replace("$rn", String(Math.random())) :
                              i +
                              (o.isETag() ? a : r.replace("$rn", String(Math.random()))));
                      };
                  return function(e, r, a) {
                      a = a || {};
                      t(i(a).replace("$symbol", e), r);
                  };
              })(),
              P = function(e) {
                  var t = e.timeStr || "",
                      r = e.dateStr || "",
                      a = e.tArr || void 0,
                      i = e.hqObj || {},
                      u = e.dateDiv || "-",
                      s = t.split(":"),
                      o = Number(s[0]) || 0,
                      d = Number(s[1]) || 0,
                      l = Number(s[2]) || 0,
                      b = [m.s0(o), m.s0(d)].join(":"),
                      p = 0 / 0;
                  if (a)
                      if (a.indexOf) p = a.indexOf(b);
                      else
                          for (var N = a.length; N--;)
                              if (a[N] == b) {
                                  p = N;
                                  break;
                              }
                  var h = {
                          time: b,
                          isUpdateTime: isNaN(p) ? !0 : Boolean(p >= 0),
                          index: p
                      },
                      c = r.split(u),
                      g = ~~Number(c[0]),
                      f = ~~(Number(c[1]) - 1),
                      v = ~~Number(c[2]),
                      P = {
                          isErrData: !1,
                          isDateChange: !1,
                          date: i.date,
                          today: [g, f + 1, v].join("-")
                      };
                  if (i.date) {
                      var w = new Date(g, f, v, o, d, l),
                          y = n.stbd(i.date, w);
                      y
                          ?
                          w >= i.date ?
                          P.date.setHours(o, d, l) :
                          (P.isErrData = !0) :
                          ((P.isDateChange = Boolean(w > i.date)),
                              P.isDateChange ? (P.date = w) : (P.isErrData = !0));
                  } else r ? (P.date = new Date(g, f, v, o, d, l)) : (P.isErrData = !0);
                  return {
                      datePart: P,
                      timePart: h
                  };
              },
              w = {
                  swap: function(e) {
                      var t,
                          r = e.split(","),
                          a = "";
                      (r[8] = "TP" == r[8] ? "03" : "00"),
                      (t = [
                          0,
                          4,
                          3,
                          7,
                          5,
                          6,
                          26,
                          46,
                          10,
                          11,
                          36,
                          26,
                          37,
                          27,
                          38,
                          28,
                          39,
                          29,
                          40,
                          30,
                          56,
                          46,
                          57,
                          47,
                          58,
                          48,
                          59,
                          49,
                          60,
                          50,
                          2,
                          1,
                          8
                      ]);
                      for (var i = 0; i < t.length; i++) a += r[t[i]] + ",";
                      return (a = a.slice(0, a.length - 1));
                  },
                  kak: function(e, t) {
                      var r;
                      switch (t) {
                          case "CN_2":
                              r = this.swap(e);
                              break;
                          default:
                              r = e;
                      }
                      return r;
                  }
              },
              y = new(function() {
                  var e;
                  this.update = function(t, r) {
                      if (!t) return !1;
                      e || (e = m.gtr([
                          ["0:00", "23:59"]
                      ]));
                      var a = e,
                          i = "00:00",
                          n = t[11],
                          u = t[0],
                          s = P({
                              dateStr: n,
                              timeStr: u,
                              hqObj: r,
                              tArr: a,
                              start: i
                          });
                      if (s.datePart.isErrData) return !1;
                      (r.date = s.datePart.date),
                      (r.today = s.datePart.today),
                      (r.time = s.timePart.time),
                      (r.index = s.timePart.index),
                      (r.isUpdateTime = s.timePart.isUpdateTime),
                      (r.name = String(t[9]));
                      var o = Number(t[3]) || 0;
                      return (
                          (r.prevclose = o),
                          (r.open = Number(t[5]) || o),
                          (r.high = Number(t[6]) || o),
                          (r.low = Number(t[7]) || o),
                          (r.price = Number(t[8]) || o),
                          (r.totalVolume = 0),
                          !0
                      );
                  };
              })(),
              S = new(function() {
                  var e, t;
                  this.update = function(r, a) {
                      if (!r) return !1;
                      e || (e = m.gtr([
                          ["6:00", "23:59"],
                          ["0:00", "5:59"]
                      ]));
                      var i = e,
                          n = "06:00",
                          u = 17,
                          s = a.symbol;
                      0 !== s.indexOf("fx_") &&
                          ((u = 10),
                              "DINIW" == s &&
                              (t || (t = m.gtr([
                                      ["6:00", "23:59"],
                                      ["0:00", "5:59"]
                                  ])),
                                  (i = t),
                                  (n = "06:00")));
                      var o = r[u],
                          d = r[0],
                          l = P({
                              dateStr: o,
                              timeStr: d,
                              hqObj: a,
                              tArr: i,
                              start: n
                          });
                      if (l.datePart.isErrData) return !1;
                      (a.date = l.datePart.date),
                      (a.today = l.datePart.today),
                      (a.time = l.timePart.time),
                      (a.index = l.timePart.index),
                      (a.isUpdateTime = l.timePart.isUpdateTime),
                      (a.name = String(r[9]));
                      var b = Number(r[3]) || 0;
                      return (
                          (a.prevclose = b),
                          (a.open = Number(r[5]) || b),
                          (a.high = Number(r[6]) || b),
                          (a.low = Number(r[7]) || b),
                          (a.price = Number(r[8]) || b),
                          (a.totalVolume = 0),
                          !0
                      );
                  };
              })(),
              _ = new(function() {
                  var t,
                      r,
                      a = function(r, a) {
                          if (!r) return !1;
                          t || (t = utils_util.isRepos(a.symbol) ? m.gtrepo() : m.gta());
                          var i = 100;
                          /[gz]/.test(a.type) ?
                              (i = 10) :
                              utils_util.isRepos(a.symbol) ?
                              (i = 10) :
                              (/^(sh000|sh580)\d+/.test(a.symbol) ||
                                  /^(hy|gn|dy)\d+/.test(a.symbol)) &&
                              (i = 1),
                              utils_util.isCNK(a.symbol) && (i = 1);
                          var n = r[30],
                              u = r[31],
                              s = P({
                                  dateStr: n,
                                  timeStr: u,
                                  hqObj: a,
                                  tArr: t,
                                  start: "09:30"
                              });
                          if (s.datePart.isErrData) return !1;
                          if (
                              ((a.date = s.datePart.date),
                                  (a.isDateChange = s.datePart.isDateChange),
                                  (a.today = s.datePart.today),
                                  (a.time = s.timePart.time),
                                  (a.index = s.timePart.index),
                                  (a.isUpdateTime = s.timePart.isUpdateTime),
                                  !s.timePart.isUpdateTime)
                          ) {
                              var o,
                                  d,
                                  l = a.time.split(":"),
                                  b = Number(l[0]),
                                  p = Number(l[1]);
                              switch (b) {
                                  case 11:
                                      36 > p && ((a.isUpdateTime = !0), (a.index = 119));
                                      break;
                                  case 15:
                                      utils_util.isRepos(a.symbol) ?
                                          ((o = 40), (d = 270)) :
                                          ((o = 40), (d = 240)),
                                          o > p && ((a.isUpdateTime = !0), (a.index = d));
                              }
                          }
                          (a.name = String(r[0])),
                          (a.isNewListed = Boolean(0 == a.name.indexOf("N")));
                          var N = Number(r[2]) || 0;
                          (a.prevclose = N),
                          (a.preopen = Number(r[1]) || Number(r[6]) || Number(r[7]) || N),
                          (a.open = Number(r[1]) || N),
                          (a.price = Number(r[3]) || N),
                          (a.high = Number(r[4]) || N),
                          (a.low = Number(r[5]) || N),
                          (a.buy = Number(r[6])),
                          (a.sell = Number(r[7]));
                          var c = Number(r[8]) || 0;
                          (c /= i),
                          (a.totalVolume = c),
                          (a.totalAmount = Number(r[9]) || 0);
                          var g = r.length >= 34 ? r[33].split("|") : [];
                          (a.isKCBF = g.length > 0),
                          a.isKCBF &&
                              ((a.KCBState = g[0]),
                                  (a.postVolume = Number(g[1]) || 0),
                                  (a.postAmount = Number(g[2]) || 0));
                          var f = r[32];
                          return (
                              (a.state = f),
                              (a.isStopDay = "02" == f || "03" == f),
                              (a.statusStr = h[f] || ""),
                              !0
                          );
                      },
                      i = function(e, t) {
                          var r = e.split(",");
                          if (r && !(r.length < 16)) {
                              (t.type = String(r[0]).toLowerCase()),
                              (t.lastfive = Number(r[6])),
                              (t.fc = Number(r[8])),
                              (t.issueprice = Number(r[14])),
                              (t.status = Number(r[15]));
                              var a = r[23].split("|");
                              (t.isKCB = !("X" === a[0])),
                              (t.KCBType = a[0]),
                              (t.issuedCapital = Number(a[4])),
                              (t.totalRegisteredCapital = Number(a[3])),
                              (t.minimumPrice = a[2]),
                              (t.sameShareAndRight = a[1]);
                          }
                      },
                      u = function(t, a) {
                          r || (r = m.gtr([
                              ["9:15", "11:30"],
                              ["13:00", "15:01"]
                          ]));
                          var i = g[a.symbol] || {},
                              u = i.date;
                          utils_util.isDate(u) || (u = new Date());
                          var s = t.split("|"),
                              o = n.ds(u),
                              d = s[1],
                              l = P({
                                  dateStr: o,
                                  timeStr: d,
                                  hqObj: a,
                                  tArr: r,
                                  start: "09:15"
                              });
                          return l.datePart.isErrData ?
                              !1 :
                              l.datePart.date.getHours() - u.getHours() > 2 ?
                              !1 :
                              ((a.date = l.datePart.date),
                                  (a.isDateChange = l.datePart.isDateChange),
                                  (a.today = l.datePart.today),
                                  (a.time = l.timePart.time),
                                  (a.index = l.timePart.index),
                                  (a.isUpdateTime = l.timePart.isUpdateTime),
                                  (a.name = i.name || ""),
                                  (a.isNewListed = Boolean(0 == a.name.indexOf("N"))),
                                  (a.price = Number(s[2])),
                                  (a.trvolume = 0.01 * (Number(s[3]) || 0)),
                                  (a.tramount = Number(s[4]) || 0),
                                  (a.trbs = Number(s[7]) || 0),
                                  !0);
                      };
                  (this.trHandler = function(e, t) {
                      return u(e, t);
                  }),
                  (this.update = function(hqStrDataArr, stockObj, hqStr_i) {
                      var n = !0;
                      return (
                          hqStr_i && i(hqStr_i, stockObj),
                          hqStrDataArr && (n = a(hqStrDataArr, stockObj)),
                          n
                      );
                  });
              })(),
              D = new(function() {
                  var e;
                  this.update = function(t, r) {
                      if (!t) return !1;
                      e ||
                          (e = m.gata(
                              a(r.symbol),
                              (window["kke_future_" + r.symbol] &&
                                  window["kke_future_" + r.symbol].time) || [
                                  ["09:30", "11:29"],
                                  ["13:00", "02:59"]
                              ]
                          ));
                      var i = t[36],
                          n = t[37],
                          u = P({
                              dateStr: i,
                              timeStr: n,
                              hqObj: r,
                              tArr: e,
                              start: e[0]
                          });
                      if (u.datePart.isErrData) return !1;
                      (r.name = t[49] || r.symbol.replace("CFF_RE_", "")),
                      (r.date = u.datePart.date),
                      (r.isDateChange = u.datePart.isDateChange),
                      (r.today = u.datePart.today),
                      (r.time = u.timePart.time),
                      (r.index = u.timePart.index),
                      (r.isUpdateTime = u.timePart.isUpdateTime);
                      var s = Number(t[14]) || Number(t[13]) || 0;
                      return (
                          (r.settlement = r.prevclose = s),
                          (r.open = Number(t[0]) || s),
                          (r.price = Number(t[3]) || s),
                          (r.high = Number(t[1]) || s),
                          (r.low = Number(t[2]) || s),
                          (r.preopen = r.open),
                          (r.totalVolume = Number(t[4]) || 0),
                          (r.totalAmount = Number(t[5]) || 0),
                          (r.holdingAmount = Number(t[6]) || 0),
                          (r.preHoldingAmount = Number(t[15]) || 0),
                          (r.iscff = 1),
                          (r.withNight = !1),
                          !0
                      );
                  };
              })(),
              x = new(function() {
                  var t,
                      r = function(t) {
                          if (!t || t.length < 9) return null;
                          for (
                              var r,
                                  a = [
                                      "Jan",
                                      "Feb",
                                      "Mar",
                                      "Apr",
                                      "May",
                                      "Jun",
                                      "Jul",
                                      "Aug",
                                      "Sep",
                                      "Oct",
                                      "Nov",
                                      "Dec"
                                  ],
                                  i = t.split(" "),
                                  n = new Date(),
                                  m = n.getFullYear(),
                                  u = 0,
                                  s = a.length; s > u; u++
                          )
                              if (String(i[0]).toUpperCase() == String(a[u]).toUpperCase()) {
                                  r = u;
                                  break;
                              }
                          var o = parseInt(Number(i[1])),
                              d = String(i[2]),
                              l = d.toUpperCase().indexOf("PM") > 0,
                              b = d.split(":"),
                              p = parseInt(Number(b[0]));
                          l && 12 != p && (p += 12);
                          var N = b[1],
                              h = N.slice(0, -2),
                              c = [
                                  utils_util.strUtil.zp(p),
                                  utils_util.strUtil.zp(h),
                                  "00"
                              ].join(":"),
                              g = new Date(m, r, o);
                          if (+g > +n) {
                              if (!(0 == n.getMonth() && n.getDate() < 7)) return null;
                              m--, (g = new Date(m, r, o));
                          }
                          var f = [
                              g.getFullYear(),
                              utils_util.strUtil.zp(g.getMonth() + 1),
                              utils_util.strUtil.zp(g.getDate())
                          ].join("-");
                          return [c, f];
                      },
                      a = function(e, t) {
                          if (e && t) {
                              var r = e.split(",");
                              !r ||
                                  r.length < 3 ||
                                  ((t.exchange = r[0]),
                                      (t.industry = r[1]),
                                      (t.issueprice = r[2]));
                          }
                      },
                      i = function(e, a, i) {
                          function u(e) {
                              return (
                                  0 === parseInt(e[2]) &&
                                  0 === parseInt(e[4]) &&
                                  0 === parseInt(e[5]) &&
                                  0 === parseInt(e[6]) &&
                                  0 === parseInt(e[7]) &&
                                  0 === parseInt(e[10])
                              );
                          }
                          if (!e || e.length < 28) return !1;
                          t || (t = m.gtus());
                          var s,
                              o = !1;
                          i ? ((s = i.split(",")), (o = u(s))) : (o = u(e));
                          var d;
                          if (((a.prevclose = Number(e[26]) || Number(e[1]) || 0), o)) {
                              (a.high = a.prevclose),
                              (a.open = a.prevclose),
                              (a.low = a.prevclose);
                              var l = new Date(
                                  (window.hq_str_sys_time ?
                                      new Date(1e3 * window.hq_str_sys_time) :
                                      new Date()) - 432e5
                              );
                              d = [
                                  "09:10",
                                  l.getFullYear() + "-" + (l.getMonth() + 1) + "-" + l.getDate()
                              ];
                          } else
                              (a.open = Number(e[5]) || a.prevclose),
                              (a.high = Number(e[6]) || a.prevclose),
                              (a.low = Number(e[7]) || a.prevclose),
                              (d = r(String(s ? s[25] : e[25])));
                          if (
                              ((a.name = e[0]),
                                  (a.price = Number(e[1]) || a.open),
                                  (a.preopen = a.open),
                                  (a.totalVolume = Number(e[10]) || 0),
                                  (a.isUnlisted =
                                      0 == a.price && 0 == Number(e[8]) && 0 == Number(e[9])),
                                  d)
                          ) {
                              var b = P({
                                  dateStr: d[1],
                                  timeStr: d[0],
                                  hqObj: a,
                                  tArr: t
                              });
                              (a.date = b.datePart.date),
                              (a.isDateChange = b.datePart.isDateChange),
                              (a.today = b.datePart.today),
                              (a.time = b.timePart.time),
                              (a.index = b.timePart.index),
                              (a.isUpdateTime = b.timePart.isUpdateTime),
                              (n = !0);
                          }
                          return !0;
                      },
                      n = !1;
                  this.update = function(e, t, r, n) {
                      var m;
                      return r && a(r, t), e && (m = i(e, t, n)), m;
                  };
              })(),
              T = new(function() {
                  var e;
                  this.update = function(t, r) {
                      if (!t) return !1;
                      e || (e = m.gtmsci());
                      var a = n.dss(new Date(1 * t[6]), "-").split(" "),
                          i = a[0],
                          u = a[1],
                          s = "07:00",
                          o = P({
                              dateStr: i,
                              dateDiv: "-",
                              timeStr: u,
                              hqObj: r,
                              tArr: e,
                              start: s
                          });
                      (r.date = o.datePart.date),
                      (r.isDateChange = o.datePart.isDateChange),
                      (r.today = o.datePart.today),
                      (r.time = o.timePart.time),
                      (r.index = o.timePart.index),
                      (r.isUpdateTime = o.timePart.isUpdateTime),
                      (r.name = t[1]);
                      var d = Number(t[22]) || 0;
                      return (
                          (r.prevclose = d),
                          (r.open = Number(t[21]) || d),
                          (r.preopen = r.open),
                          (r.high = Number(t[19]) || d),
                          (r.low = Number(t[20]) || d),
                          (r.price = Number(t[4]) || d),
                          (r.totalVolume = 0),
                          (r.totalAmount = 0),
                          !0
                      );
                  };
              })(),
              U = new(function() {
                  var e,
                      t = function(t, r, a) {
                          if (!t) return !1;
                          e || (e = m.gtlse());
                          var i = t[8].split(" "),
                              u = (a && a.split(",")) || [],
                              s = i[0],
                              o = i[1],
                              d = "08:00";
                          s || ((s = n.ds(new Date())), (o = d)), d > o && (o = d);
                          var l = P({
                              dateStr: s,
                              dateDiv: "-",
                              timeStr: o,
                              hqObj: r,
                              tArr: e,
                              start: "08:00"
                          });
                          (r.date = l.datePart.date),
                          (r.isDateChange = l.datePart.isDateChange),
                          (r.today = l.datePart.today),
                          (r.time = l.timePart.time),
                          (r.index = l.timePart.index),
                          (r.isUpdateTime = l.timePart.isUpdateTime),
                          (r.name = u[0] || u[1] || String(t[0]));
                          var b = Number(t[5]) || 0;
                          return (
                              u.length > 6 &&
                              u[5] &&
                              ((r.issueprice = Number(u[5])),
                                  n.stbd(n.sd(u[6]), r.date) && (b = r.issueprice)),
                              (r.prevclose = b),
                              (r.open = Number(t[3]) || b),
                              (r.preopen = r.open || r.price),
                              (r.high = Number(t[2]) || b),
                              (r.low = Number(t[4]) || b),
                              (r.buy = Number(t[9])),
                              (r.sell = Number(t[11])),
                              (r.price = Number(t[1]) || b),
                              (r.totalVolume = Number(t[6]) || 0),
                              (r.totalAmount = Number(t[7]) || 0),
                              (r.state = t[13]),
                              (r.stateUpdate = t[14]),
                              (r.stateTimeStart = t[15]),
                              (r.stateTimeEnd = t[16]),
                              (r.dataSource = t[17]),
                              !0
                          );
                      };
                  this.update = function(e, r, a) {
                      var i;
                      return e && (i = t(e, r, a)), i;
                  };
              })(),
              k = new(function() {
                  var e;
                  this.update = function(t, r) {
                      if (!t) return !1;
                      e || (e = m.gthk());
                      var a = t[7],
                          i = t[1],
                          n = P({
                              dateStr: a,
                              dateDiv: "-",
                              timeStr: i,
                              hqObj: r,
                              tArr: e,
                              start: "09:30"
                          });
                      return (
                          (r.date = n.datePart.date),
                          (r.isDateChange = n.datePart.isDateChange),
                          (r.today = n.datePart.today),
                          (r.time = n.timePart.time),
                          (r.index = n.timePart.index),
                          (r.isUpdateTime = n.timePart.isUpdateTime),
                          (r.name = String(t[0])),
                          (r.volume = 0),
                          (r.price = Number(t[2])),
                          (r.prevprice = r.prevclose = Number(t[3])),
                          !0
                      );
                  };
              })(),
              C = new(function() {
                  this.update = function(e, t) {
                      if (!e) return !1;
                      var r = (window["kke_future_" + t.symbol] &&
                              window["kke_future_" + t.symbol].time) || [
                              ["09:30", "11:29"],
                              ["13:00", "02:59"]
                          ],
                          i = m.gata(a(t.symbol), r),
                          n = e[1],
                          u = e[17],
                          s = n.slice(0, 2) + ":" + n.slice(2, 4),
                          o = P({
                              dateStr: u,
                              dateDiv: "-",
                              timeStr: s,
                              hqObj: t,
                              tArr: i,
                              start: i[0]
                          });
                      (t.date = o.datePart.date),
                      (t.isDateChange = o.datePart.isDateChange),
                      (t.today = o.datePart.today),
                      (t.time = o.timePart.time),
                      (t.index = o.timePart.index),
                      (t.isUpdateTime = o.timePart.isUpdateTime),
                      o.timePart.index < 0 &&
                          ((t.time = d(r, t.time)), (t.index = i.indexOf(t.time))),
                          i[0] > "15:00" &&
                          ("00:00" == r[1][0] ?
                              s > r[1][1] && "09:00" > s && (t.index = i.indexOf(r[1][1])) :
                              s > r[0][1] &&
                              "09:00" > s &&
                              (t.index = i.indexOf(r[0][1]))),
                          (t.name = String(e[0]));
                      var l = Number(e[10]) || 0;
                      return (
                          (t.prevclose = l),
                          (t.open = Number(e[2]) || l),
                          (t.preopen = t.open || t.price),
                          (t.high = Number(e[3]) || l),
                          (t.low = Number(e[4]) || l),
                          (t.close = Number(e[5]) || l),
                          (t.buy = Number(e[6])),
                          (t.sell = Number(e[7])),
                          (t.price = Number(e[8]) || l),
                          (t.activeprevclose = Number(e[9])),
                          (t.buyAmount = Number(e[11])),
                          (t.sellAmount = Number(e[12])),
                          (t.holdingAmount = Number(e[13])),
                          (t.totalVolume = Number(e[14]) || 0),
                          (t.exchange = e[15]),
                          (t.futuresType = e[16]),
                          (t.isHot = Number(e[18])),
                          (t.day5Highest = Number(e[19])),
                          (t.day5Lowest = Number(e[20])),
                          (t.day10Highest = Number(e[21])),
                          (t.day10Lowest = Number(e[22])),
                          (t.day20Highest = Number(e[23])),
                          (t.day20Lowest = Number(e[24])),
                          (t.day55Highest = Number(e[25])),
                          (t.day55Lowest = Number(e[26])),
                          (t.weighted = Number(e[27])),
                          (t.withNight = i[0] > "15:00"),
                          !0
                      );
                  };
              })(),
              A = new(function() {
                  var e,
                      t = function(t, r, a) {
                          if (!t) return !1;
                          e || (e = m.gthk());
                          var i;
                          a &&
                              ((i = a.split(",")),
                                  i[17] >= t[17] && (t[17] = i[17]),
                                  i[18] >= t[18] && (t[18] = i[18]));
                          var n = t[17],
                              u = t[18],
                              s =
                              (t[24],
                                  P({
                                      dateStr: n,
                                      dateDiv: "/",
                                      timeStr: u,
                                      hqObj: r,
                                      tArr: e,
                                      start: "09:30"
                                  }));
                          (r.date = s.datePart.date || new Date()),
                          (r.isDateChange = s.datePart.isDateChange),
                          (r.today = s.datePart.today);
                          var o = !1;
                          (!r.time ||
                              (s.timePart.time > "09:29" && r.time < s.timePart.time)) &&
                          (o = !0),
                          (r.time = s.timePart.time),
                          (r.index = s.timePart.index),
                          (r.isUpdateTime = s.timePart.isUpdateTime),
                          s.timePart.isUpdateTime ||
                              (r.time > "16:00" &&
                                  r.time < "16:20" &&
                                  (r.index = e.length - 1)),
                              o && (r.isUpdateTime = !0),
                              (r.name = r.cnName || String(t[1]));
                          var d = Number(t[3]) || Number(t[2]) || 0;
                          return (
                              (r.prevclose = d),
                              (r.open = Number(t[2]) || d),
                              (r.preopen =
                                  Number(t[2]) || Number(t[9]) || Number(t[10]) || d),
                              (r.price = Number(t[6]) || d),
                              (r.high = Number(t[4]) || d),
                              (r.low = Number(t[5]) || d),
                              (r.totalVolume = Number(t[12]) || 1e3 * Number(t[11]) || 0),
                              (r.totalAmount = Number(t[11]) || 0),
                              !0
                          );
                      },
                      r = function(e, t) {
                          var r = e.split(",");
                          !r ||
                              r.length < 15 ||
                              ((t.type = String(r[0]).toLowerCase()),
                                  (t.lastfive = 0),
                                  (t.status = Number(r[14])),
                                  (t.issueprice = Number(r[16])),
                                  (t.cnName = r[19]));
                      };
                  this.update = function(e, a, i, n) {
                      var m = !0;
                      return i && r(i, a), e && (m = t(e, a, n)), m;
                  };
              })(),
              O = new(function() {
                  this.update = function(e, t) {
                      if (!e) return !1;
                      var r = m.gata(
                              a(t.symbol),
                              (window["kke_global_index_" + t.symbol] &&
                                  window["kke_global_index_" + t.symbol].time) || [
                                  ["06:00", "23:59"],
                                  ["00:00", "05:00"]
                              ]
                          ),
                          i = r,
                          n = r[0],
                          u = 6,
                          s = e[u],
                          o = e[7];
                      "znb_NKY" === t.symbol &&
                          "11:29" > o &&
                          o > "10:29" &&
                          (o = "10:29");
                      var d = P({
                          dateStr: s,
                          timeStr: o,
                          tArr: i,
                          start: n,
                          hqObj: t
                      });
                      if (d.datePart.isErrData) return !1;
                      (t.date = d.datePart.date),
                      (t.today = d.datePart.today),
                      (t.time = d.timePart.time),
                      (t.index = d.timePart.index),
                      (t.isUpdateTime = d.timePart.isUpdateTime),
                      (t.name = String(e[0]));
                      var l = Number(e[9]) || 0;
                      return (
                          (t.prevclose = l),
                          (t.open = Number(e[8]) || l),
                          (t.price = Number(e[1]) || l),
                          (t.high = Number(e[10]) || l),
                          (t.low = Number(e[11]) || l),
                          (t.buy = Number(e[9])),
                          (t.sell = Number(e[9])),
                          (t.totalVolume = Number(e[12]) || 0),
                          (t.holdingAmount = 0),
                          !0
                      );
                  };
              })(),
              q = new(function() {
                  this.update = function(e, t) {
                      if (!e) return !1;
                      var r = m.gtgds(),
                          a = r,
                          i = r[0],
                          n = 12,
                          u = e[n],
                          s = e[6],
                          o = P({
                              dateStr: u,
                              timeStr: s,
                              tArr: a,
                              start: i,
                              hqObj: t
                          });
                      if (o.datePart.isErrData) return !1;
                      (t.date = o.datePart.date),
                      (t.today = o.datePart.today),
                      (t.time = o.timePart.time),
                      (t.index = o.timePart.index),
                      (t.isUpdateTime = o.timePart.isUpdateTime),
                      (t.name = String(e[13]));
                      var d = Number(e[7]) || 0;
                      return (
                          (t.prevclose = d),
                          (t.open = Number(e[8]) || d),
                          (t.price = Number(e[0]) || d),
                          (t.high = Number(e[4]) || d),
                          (t.low = Number(e[5]) || d),
                          (t.buy = Number(e[2])),
                          (t.sell = Number(e[3])),
                          (t.buyAmount = Number(e[10])),
                          (t.sellAmount = Number(e[11])),
                          (t.holdingAmount = Number(e[9])),
                          (t.withNight = !0),
                          !0
                      );
                  };
              })(),
              j = new(function() {
                  this.update = function(e, t) {
                      if (!e) return !1;
                      var r = m.gata(
                              a(t.symbol),
                              (window["kke_future_" + t.symbol] &&
                                  window["kke_future_" + t.symbol].time) || [
                                  ["06:00", "23:59"],
                                  ["00:00", "05:00"]
                              ]
                          ),
                          i = r,
                          n = r[0],
                          u = 12,
                          s = e[u],
                          o = e[6],
                          d = P({
                              dateStr: s,
                              timeStr: o,
                              tArr: i,
                              start: n,
                              hqObj: t
                          });
                      if (d.datePart.isErrData) return !1;
                      (t.date = d.datePart.date),
                      (t.today = d.datePart.today),
                      (t.time = d.timePart.time),
                      (t.index = d.timePart.index),
                      (t.isUpdateTime = d.timePart.isUpdateTime),
                      (t.name = String(e[13]));
                      var l = Number(e[7]) || Number(e[8]) || Number(e[0]) || 0;
                      return (
                          (t.prevclose = l),
                          (t.open = Number(e[8]) || l),
                          (t.price = Number(e[0]) || l),
                          (t.high = Number(e[4]) || l),
                          (t.low = Number(e[5]) || l),
                          (t.buy = Number(e[2])),
                          (t.sell = Number(e[3])),
                          (t.buyAmount = Number(e[10])),
                          (t.sellAmount = Number(e[11])),
                          (t.holdingAmount = Number(e[9])),
                          !0
                      );
                  };
              })(),
              E = new(function() {
                  var e;
                  this.update = function(t, r) {
                      if (!t) return !1;
                      e || (e = m.gta());
                      var a = t[32],
                          i = a.split(" "),
                          n = i[0],
                          u = i[1],
                          s = P({
                              dateStr: n,
                              timeStr: u,
                              hqObj: r,
                              tArr: e,
                              start: "09:30"
                          });
                      if (s.datePart.isErrData) return !1;
                      (r.date = s.datePart.date),
                      (r.isDateChange = s.datePart.isDateChange),
                      (r.today = s.datePart.today),
                      (r.time = s.timePart.time),
                      (r.index = s.timePart.index),
                      (r.isUpdateTime = s.timePart.isUpdateTime),
                      (r.name = String(t[37])),
                      (r.isNewListed = Boolean(0 == r.name.indexOf("N")));
                      var o = Number(t[44]) || 0;
                      return (
                          (r.prevclose = o),
                          (r.preopen = Number(t[9]) || o),
                          (r.open = Number(t[9]) || o),
                          (r.price = Number(t[2]) || o),
                          (r.high = Number(t[39]) || o),
                          (r.low = Number(t[40]) || o),
                          (r.position = Number(t[5]) || 0),
                          (r.totalVolume = Number(t[41]) || 0),
                          (r.totalAmount = Number(t[42]) || 0),
                          !0
                      );
                  };
              })(),
              F = new(function() {
                  var e;
                  this.update = function(t, r) {
                      if (!t) return !1;
                      e || (e = m.gta());
                      var a = t[30],
                          i = t[31],
                          n = P({
                              dateStr: a,
                              timeStr: i,
                              hqObj: r,
                              tArr: e,
                              start: "09:30"
                          });
                      if (n.datePart.isErrData) return !1;
                      if (
                          ((r.date = n.datePart.date),
                              (r.isDateChange = n.datePart.isDateChange),
                              (r.today = n.datePart.today),
                              (r.time = n.timePart.time),
                              (r.index = n.timePart.index),
                              (r.isUpdateTime = n.timePart.isUpdateTime),
                              !n.timePart.isUpdateTime)
                      ) {
                          var u = r.time.split(":"),
                              s = Number(u[0]),
                              o = Number(u[1]);
                          switch (s) {
                              case 11:
                                  59 > o && (r.isUpdateTime = !0);
                                  break;
                              case 15:
                                  31 > o && (r.isUpdateTime = !0);
                          }
                      }
                      (r.name = String(t[0])),
                      (r.isNewListed = Boolean(0 == r.name.indexOf("N")));
                      var d = Number(t[2]) || 0;
                      (r.prevclose = d),
                      (r.preopen = Number(t[1]) || Number(t[6]) || Number(t[7]) || d),
                      (r.open = Number(t[1]) || d),
                      (r.price = Number(t[3]) || d),
                      (r.high = Number(t[4]) || d),
                      (r.low = Number(t[5]) || d),
                      (r.buy = Number(t[6])),
                      (r.sell = Number(t[7])),
                      (r.totalVolume = Number(t[8]) / 1e3 || 0),
                      (r.totalAmount = Number(t[9]) || 0);
                      var l = t[32];
                      return (
                          (r.state = l),
                          (r.isStopDay = "02" == l || "03" == l),
                          (r.statusStr = h[l] || ""),
                          !0
                      );
                  };
              })(),
              H = [],
              I = "",
              V = "",
              B = function(e) {
                  for (var t = H.length; t--;) H[t](e), (H[t] = null), H.length--;
              };
          (this.get = function(e, t) {
              var i,
                  n = e.symbol,
                  m = e.withI,
                  u = n,
                  s = 0;
              if (m)
                  for (var o, d = n.split(","), l = d.length; l > s; s++) {
                      o = d[s];
                      var h;
                      (h = "HK" == a(o) ? o.replace("rt_", "") + "_i" : o + "_i"),
                      (u += "," + h);
                  }
              var c, g;
              if (e.delay)
                  (I += n + ","),
                  (V += u + ","),
                  H.push(t),
                  clearTimeout(N),
                  (N = setTimeout(function() {
                      for (
                          V = V.substring(0, V.length - 1),
                          I = I.substring(0, I.length - 1),
                          i = p(V),
                          g = i.length,
                          c = {
                              count: g
                          },
                          s = 0; g > s; s++
                      )
                          v(i[s].join(","), r(b, null, I, B, null, c), e);
                      (I = ""), (V = "");
                  }, 10000));
              else
                  for (
                      i = p(u),
                      g = i.length,
                      c = {
                          count: g
                      },
                      s = 0; g > s; s++
                  )
                      v(i[s].join(","), r(b, null, n, t, null, c), e);
          }),
          (this.parse = function(t, r) {
              var a,
                  n = t.symbol;
              switch (t.market) {
                  case "CN_TR":
                      a = i(n, null, t.hqStr);
                      break;
                  default:
                      var m = w.kak(t.hqStr, t.market);
                      a = b(n, null, m, null);
              }
              utils_util.isFunc(r) && r(a);
          });
      };
  return l;
});
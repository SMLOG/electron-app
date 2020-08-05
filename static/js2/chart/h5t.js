xh5_define(
  "chart.h5t",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(settinger, util, painter) {
    "use strict";
    function s2(conf) {
      function rra(conf2, isMain) {
        function onViewChange(e) {
          ooo1.setDataRange(e);
          eee1 && (eee1.linkData(e), eee1.setDataRange());
          kkk1 && (kkk1.linkData(e), kkk1.setDataRange());
          ddd1 && (ddd1.linkData(e), ddd1.setDataRange());
        }
        function c() {
          isMain && (jjj = tDb),
            vvv.update(null, !0),
            "CN" === market &&
              !/^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(conf2.symbol);
        }
        conf2 = oc(
          {
            symbol: void 0,
            datas: {
              t1: { url: void 0, dataformatter: void 0 },
              t5: { url: void 0, dataformatter: void 0 },
            },
            linecolor: void 0,
            linetype: void 0,
          },
          conf2 || {}
        );
        var dd1,
          _this = this,
          market = util.market(conf2.symbol),
          market2Num = function(e) {
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
        this.business = conf2.business;
        this.simple = conf2.simple;
        this.dp = conf2.dp;
        this.marketNum = market2Num;
        this.isErr = !1;
        this.witht5 = !0;
        this.symbol = conf2.symbol;
        this.isMain = isMain;
        this.isCompare = !1;
        this.dAdd = 0;
        this.uid = conf2.symbol + Math.random();
        this.datas = null;
        this.dataLen = 0;
        this.dataLenOffset = 0;
        this.prevclose = void 0;
        this.labelMaxP = 0;
        this.maxPrice = 0;
        this.labelMinP = Number.MAX_VALUE;
        this.minPrice = Number.MAX_VALUE;
        this.labelMaxVol = 0;
        this.maxVolume = 0;
        this.minPercent = Number.MAX_VALUE;
        this.maxPercent = -Number.MAX_VALUE;
        this.labelPriceCount = void 0;
        this.isTotalRedraw = !0;
        this.realLen = 0;
        this.nfloat = 0 === conf.nfloat ? conf.nfloat : conf.nfloat || 2;
        this.ennfloat = conf.ennfloat;
        this.market = market;
        this.date = null;
        this.hq = null;
        this.futureTime = futureTime1 || futureTime2 || gbiTime;
        this.gbiTime = gbiTime;
        this.preData = { data: 0, vPos: null };
        this.needMarket = market;
        this.changeMarket = function(e) {
          var a,
            i = [],
            r = e;
          U = A.tcd(needmarket);
          if (market2Num(_this.needMarket) != market2Num(needmarket)) {
            a = tDb.get();
            dd1 = util.tUtil.gata(needmarket);
            for (var n = 0; n < a.length; n++)
              market2Num(_this.needMarket) < market2Num(needmarket)
                ? (i.push(
                    A.aduk(a[n], _this.market, needmarket, ccc2, a[n][0].date)
                  ),
                  (_this.realLen = util.arrIndexOf(
                    dd1,
                    ccc2.getHours() + ":" + util.strUtil.zp(ccc2.getMinutes())
                  )),
                  _this.realLen < 0 && (_this.realLen = U))
                : (i.push(A.rmuk(a[n], needmarket, r)),
                  (_this.realLen = util.arrIndexOf(
                    dd1,
                    ccc2.getHours() + ":" + util.strUtil.zp(ccc2.getMinutes())
                  )));
            _this.needMarket = needmarket;
            tDb.initTState(i);
            _this.datas = i[4];
            ooo1.setDataRange();
            ooo1.createPlayingData();
          }
        };
        var eee1,
          kkk1,
          ddd1,
          ooo3,
          ccc2,
          qqq = new S(this, conf2);
        this.getName = function() {
          return ooo3 || "";
        };
        this.getStockType = function() {
          var e;
          return _this.hq && (e = _this.hq.type), e || "";
        };
        this.viewState = viewState;
        var tDb = new (function() {
            var db = {},
              extraDataObj = { rsAmount: void 0 },
              initState = function(ee3) {
                if (ee3) {
                  var r,
                    n = ee3.length,
                    o = [];
                  util.clone(ee3, o);
                  if (o.length > 5) {
                    if (conf.date) {
                      for (
                        var s,
                          l = Number(conf.date.split("-")[2]),
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
                          (viewState.start = 4),
                          (viewState.end = 5))
                        : ((r = o.splice(0, 5)),
                          (viewState.start = d),
                          (viewState.end = d + 1)),
                        (db.tv = viewState.start),
                        (db.tb = viewState.end);
                    }
                  } else (r = o), (db.tv = conf.date ? 0 : 4), (db.tb = n);
                  db.t = r;
                }
              };
            this.get = function(e) {
              return e ? db[e] : db.t;
            };
            this.set = function(e, t) {
              "undefined" != typeof db[e] && (db[e] = t);
            };
            this.initState = initState;
            this.initTState = function(e) {
              initState(e);
            };
            this.extraDataObj = extraDataObj;
            this.initExtraData = function() {
              var a = conf.ssl ? "https" : "http",
                n =
                  a +
                  "://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol",
                o = "KKE_ShareAmount_" + conf2.symbol;
              util.load(
                n
                  .replace("$symbol", conf2.symbol)
                  .replace("$rn", String(new Date().getDate()))
                  .replace("$cb", "var%20" + o + "="),
                function() {
                  var e = window[o];
                  if (e) {
                    for (var t, a = [], i = e.length; i--; )
                      (t = e[i]),
                        a.push({
                          amount: Number(t.amount),
                          date: dateUtil.sd(t.date),
                        });
                    a.length && (extraDataObj.rsAmount = a);
                  }
                }
              );
            };
            this.gc = function() {
              db = null;
              extraDataObj = null;
            };
          })(),
          ooo1 = new (function() {
            var _default, t, createPlayingData;
            _default = function() {
              _this.minPrice = Number.MAX_VALUE;
              _this.maxPrice = 0;
              _this.minPercent = Number.MAX_VALUE;
              _this.maxPercent = -Number.MAX_VALUE;
              _this.minavgPrice = Number.MAX_VALUE;
              _this.maxavgPrice = 0;
              _this.maxVolume = 0;
            };
            t = function() {
              function e(e) {
                var t = Math.max(
                    Math.abs(e - _this.maxPrice),
                    Math.abs(e - _this.minPrice)
                  ),
                  a = Math.max(
                    Math.abs(e - _this.maxavgPrice),
                    Math.abs(e - _this.minavgPrice)
                  );
                switch (
                  (t / e > 0.45 &&
                    "US" != needmarket &&
                    (E.datas.scaleType = "price"),
                  t / e > 0.1 &&
                    "newstock" == E.datas.scaleType &&
                    (E.datas.scaleType = "price"),
                  E.datas.scaleType)
                ) {
                  case "newstock":
                    (_this.minPrice = Number(e) - 0.45 * e),
                      (_this.maxPrice = Number(e) + 0.45 * e);
                    break;
                  case "tpct":
                    (_this.minPrice =
                      _this.minPrice < Number(e) - 0.1 * e
                        ? _this.minPrice
                        : Number(e) - 0.1 * e),
                      (_this.maxPrice =
                        _this.maxPrice > Number(e) + 0.1 * e
                          ? _this.maxPrice
                          : Number(e) + 0.1 * e);
                    break;
                  case "pct":
                    var i = _this.maxPrice - _this.minPrice;
                    (_this.minPrice -= 0.05 * i), (_this.maxPrice += 0.05 * i);
                    break;
                  case "price":
                  default:
                    (_this.minPrice = Number(e) - Number(t)),
                      (_this.maxPrice = Number(e) + Number(t)),
                      (_this.minavgPrice = Number(e) - Number(a)),
                      (_this.maxavgPrice = Number(e) + Number(a));
                }
                (_this.maxPercent = Math.max((_this.maxPrice - e) / e, 0)),
                  (_this.minPercent = Math.min((_this.minPrice - e) / e, 0)),
                  (_this.maxavgPercent = Math.max(
                    (_this.maxavgPrice - e) / e,
                    0
                  )),
                  (_this.minavgPercent = Math.min(
                    (_this.minavgPrice - e) / e,
                    0
                  ));
              }
              _this.isCompare = xxx.getAllStock().length > 1;
              _this.dAdd = xxx.dAdd;
              var t;
              _this.datas &&
                0 == _this.datas[0][0].volume &&
                _this.hq.time > "09:30" &&
                "CN" == _this.market &&
                (t = _this.datas[0][0].price),
                (_this.preData.data = _this.hq.preopen
                  ? t
                    ? t
                    : _this.hq.preopen
                  : _this.preData.data);
              for (var a = 0, r = _this.datas.length; r > a; a++) {
                for (
                  var n,
                    o = Number(_this.datas[0][0].prevclose),
                    s = 0,
                    l = _this.dataLen;
                  l > s;
                  s++
                ) {
                  if (
                    ((n = _this.datas[a][s]),
                    "LSE" === _this.market || "MSCI" === _this.market)
                  ) {
                    if (n.price <= 0) continue;
                  } else if (n.price <= 0 || n.avg_price <= 0) continue;
                  ("HK" == _this.market &&
                    _this.hq &&
                    "indx" == _this.hq.type) ||
                  "LSE" == _this.market ||
                  "MSCI" === _this.market
                    ? ((_this.maxPrice = Math.max(_this.maxPrice, n.price, o)),
                      (_this.minPrice = Math.min(_this.minPrice, n.price, o)))
                    : stbd(_this.datas[a][0].date, _this.hq.date) &&
                      "CN" == _this.market
                    ? ((_this.maxPrice = Math.max(
                        _this.maxPrice,
                        n.price,
                        n.avg_price,
                        o,
                        _this.preData.data
                      )),
                      (_this.minPrice = Math.min(
                        _this.minPrice,
                        n.price,
                        n.avg_price,
                        o,
                        _this.preData.data
                      )))
                    : ((_this.maxPrice = Math.max(
                        _this.maxPrice,
                        n.price,
                        n.avg_price,
                        o
                      )),
                      (_this.minPrice = Math.min(
                        _this.minPrice,
                        n.price,
                        n.avg_price,
                        o
                      ))),
                    stbd(_this.datas[a][0].date, _this.hq.date) &&
                    "CN" == _this.market
                      ? ((_this.maxavgPrice = Math.max(
                          _this.maxavgPrice,
                          n.price,
                          o,
                          _this.preData.data
                        )),
                        (_this.minavgPrice = Math.min(
                          _this.minavgPrice,
                          n.price,
                          o,
                          _this.preData.data
                        )))
                      : ((_this.maxavgPrice = Math.max(
                          _this.maxavgPrice,
                          n.price,
                          o
                        )),
                        (_this.minavgPrice = Math.min(
                          _this.minavgPrice,
                          n.price,
                          o
                        ))),
                    (_this.labelMaxVol = _this.maxVolume = Math.max(
                      _this.maxVolume,
                      0,
                      n.volume
                    ));
                }
                e(o);
              }
              (_this.minPrice < -1e8 ||
                _this.maxPrice - _this.minPrice < 1e-6) &&
                (dateUtil.stbd(_this.datas[0][0].date, _this.hq.date) &&
                  ((_this.datas[0][0].price = _this.hq.price),
                  (_this.datas[0][0].avg_price = _this.hq.price),
                  (_this.datas[0][0].prevclose = _this.hq.prevclose),
                  (_this.datas[0][0].volume = _this.hq.totalVolume)),
                (_this.minPrice = o - 0.01 * o),
                (_this.maxPrice = o + 0.01 * o),
                (_this.maxPercent = 0.01),
                (_this.minPercent = -0.01),
                _this.hq.totalVolume > 0 &&
                  dateUtil.stbd(_this.datas[0][0].date, _this.hq.date) &&
                  !isNaN(_this.hq.totalAmount) &&
                  (_this.datas[0][0].volume =
                    _this.hq.totalAmount / _this.hq.totalVolume));
              var c = ccc(_this.maxVolume, 0, 0, !0);
              _this.labelMaxVol = c[0];
              var d = 0.005;
              _this.maxPercent < d &&
                ("US" !== _this.market || "LSE" !== _this.market) &&
                "pct" !== E.datas.scaleType &&
                ((_this.minPrice = _this.maxavgPrice = o - o * d),
                (_this.maxPrice = _this.minavgPrice = o + o * d),
                (_this.maxPercent = _this.maxavgPercent = d),
                (_this.minPercent = _this.minavgPercent = -d));
              var p;
              /^s[hz]51\d{4}$/.test(conf.symbol) && (p = "fund"),
                p &&
                  "fund" === p &&
                  "pct" !== E.datas.scaleType &&
                  d > Math.abs(_this.minPercent) &&
                  ((d = Math.abs(_this.minPercent)),
                  (conf.nfloat = _this.nfloat = 3)),
                ("gb_brk$a" === _this.symbol || "usr_brk$a" === _this.symbol) &&
                  (conf.nfloat = _this.nfloat = 1);
            };
            createPlayingData = function() {
              var e,
                labelMinP,
                labelMaxP,
                h_t = E.DIMENSION.h_t,
                r = h_t * E.DIMENSION.P_HV,
                n = h_t * (1 - E.DIMENSION.P_HV);
              labelMinP = _this.labelMinP;
              labelMaxP = _this.labelMaxP;
              var prevclose,
                labelMaxVol = _this.labelMaxVol;
              if (_this.datas) {
                var length = _this.datas.length;
                for (e = 0; length > e; e++) {
                  prevclose = _this.datas[0][0].prevclose;
                  for (
                    var c,
                      show_underlay_vol = E.custom.show_underlay_vol,
                      h = _this.isCompare ? "ppp" : "pp",
                      dataLen = _this.dataLen,
                      v = 0;
                    dataLen > v;
                    v++
                  ) {
                    if (((c = _this.datas[e][v]), !c)) return;
                    c.price <= 0 &&
                      _this.realLen >= v &&
                      v > 0 &&
                      ((c.price = _this.hq.price),
                      (c.avg_price = _this.datas[e][v - 1].avg_price),
                      (c.volume = 0));
                    c.change = c.price - prevclose;
                    c.percent = c.change / prevclose;
                    c.py = xh5_PosUtil[h](
                      c.price,
                      labelMinP,
                      labelMaxP,
                      h_t,
                      prevclose
                    );
                    c.ay = xh5_PosUtil[h](
                      c.avg_price,
                      labelMinP,
                      labelMaxP,
                      h_t,
                      prevclose
                    );
                    show_underlay_vol &&
                      (c.vy = xh5_PosUtil.vp(c.volume, labelMaxVol, r) + n);
                  }
                }
                _this.preData.vPos =
                  "CN" == _this.market &&
                  1 == length &&
                  stbd(_this.hq.date, _this.datas[0][0].date)
                    ? xh5_PosUtil[h](
                        _this.preData.data,
                        labelMinP,
                        labelMaxP,
                        h_t,
                        prevclose
                      )
                    : null;
              }
            };
            this.createPlayingData = createPlayingData;
            this.extValues = function() {
              _default(), t();
            };
            this.setDataRange = function(a) {
              var i = tDb.get();
              if (i) {
                viewState.dataLength = i.length;
                var r = viewState.start,
                  n = viewState.end;
                isNaN(r) || isNaN(n)
                  ? ((n = tDb.get("tb") || 5),
                    (r = tDb.get("tv") || 4),
                    (viewState.start = r),
                    (viewState.end = n))
                  : (a && n + 1 > i.length && (viewState.end = n = i.length),
                    tDb.set("tv", r),
                    tDb.set("tb", n));
                var datas = [],
                  lineDatas = [];
                if (i.length < 2) (lineDatas = i), datas.push(i);
                else
                  for (var l = r; n > l; l++)
                    (lineDatas = lineDatas.concat(i[l])), datas.push(i[l]);
                _this.datas = datas;
                _this.lineDatas = lineDatas;
                _this.dataLen = datas[0].length;
                _default();
                t();
              }
            };
          })();
        var K = {},
          B = !1,
          ae = !1,
          ie = {},
          se = new Date().getTime(),
          le = function() {
            var e;
            ccc2 = new Date();
            e = 60 * ccc2.getTimezoneOffset() * 1e3;
            ccc2.setTime(ccc2.getTime() + e);
            ccc2.setHours(ccc2.getHours() + 8);
          },
          initDatalen = function(e) {
            le();
            if (!dd1)
              switch (needmarket) {
                case "HF":
                  dd1 = util.tUtil.gata(needmarket, futureTime2.time);
                  break;
                case "NF":
                  dd1 = util.tUtil.gata(needmarket, futureTime1.time);
                  break;
                case "global_index":
                  dd1 = util.tUtil.gata(needmarket, gbiTime.time);
                  break;
                default:
                  dd1 = util.tUtil.gata(needmarket);
              }
            e.index = util.arrIndexOf(dd1, e.time);
            var a = e.index;
            switch (_this.market) {
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
                    (a = util.arrIndexOf(dd1, "11:29")),
                  "NF" == _this.market &&
                    ("21:00" == futureTime1.time[0][0]
                      ? e.time < "09:00" &&
                        e.time >= "02:30" &&
                        (a = util.arrIndexOf(dd1, "09:00"))
                      : e.time <= futureTime1.time[0][0] &&
                        (a = util.arrIndexOf(dd1, futureTime1.time[0][0]))));
                break;
              case "HK":
                e.time >= "12:00" && e.time < "13:00" && (a = 150),
                  e.time >= "16:00" && e.time < "16:10" && (a = dd1.length - 1);
                break;
              case "HF":
                "hf_CHA50CFD" == _this.symbol &&
                  e.time > "16:35" &&
                  e.time < "17:00" &&
                  (a = 455);
            }
            if (
              ((e.index = a),
              (_this.realLen = a),
              (_this.hq.open == _this.hq.prevclose &&
                _this.hq.high == _this.hq.prevclose &&
                _this.hq.low == _this.hq.prevclose &&
                0 > a) ||
                _this.hq.time < "09:30")
            )
              switch (_this.market) {
                case "CN":
                  _this.realLen = _this.hq.time >= "15:00" ? U - 1 : 0;
                  break;
                case "REPO":
                  _this.realLen = _this.hq.time >= "15:30" ? U - 1 : 0;
                  break;
                case "NF":
                case "HF":
                case "global_index":
                case "LSE":
                case "GOODS":
                case "MSCI":
                  break;
                default:
                  _this.realLen = 0;
              }
          },
          time1 = function(e, t) {
            var a = e.getTime(),
              i = t.getTime();
            return Math.floor((a - i) / 864e5) > 5;
          },
          vvv = new (function() {
            var a,
              n = !0,
              o = function(e) {
                var a;
                switch (needmarket) {
                  case "HF":
                    a = futureTime2.time;
                    break;
                  case "NF":
                    a = futureTime1.time;
                    break;
                  case "global_index":
                    a = gbiTime.time;
                    break;
                  default:
                    a = [];
                }
                var i = util.tUtil.gltbt(
                  1,
                  e.price,
                  !0,
                  _this.needMarket,
                  [e.date],
                  a
                );
                "NF" == needmarket && e.time >= "21:00"
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
                    ? "NF" == needmarket && e.time >= "21:00"
                      ? (o.shift(), o.push(i))
                      : (o[4] = i)
                    : (o.shift(), o.push(i)),
                  tDb.initTState(o),
                  (_this.datas = [o[4]]),
                  (_this.date = dateUtil.ds(e.date)),
                  (_this.realLen = 0);
              },
              s = 0,
              l = function(e, a, l) {
                function c() {
                  o(_this.hq);
                  onViewChange();
                  ooo1.createPlayingData();
                  switch (_this.market) {
                    case "US":
                      ooo1.extValues();
                      break;
                    case "NF":
                      futureTime1.inited = 1;
                  }
                  util.isFunc(a) && a();
                }
                function p() {
                  var e = new Date().getTime() - se;
                  return !isNaN(t_rate) &&
                    t_rate > 0 &&
                    e >= 1e3 * Number(t_rate) &&
                    0 != _this.realLen &&
                    _this.hq.isUpdateTime
                    ? ((se = new Date().getTime()),
                      loadtdatas(b, _this.hq, a),
                      !0)
                    : !1;
                }
                function h() {
                  function i() {
                    stbd(_this.hq.date, y[4][0].date) &&
                      _this.hq.time > "16:00" &&
                      o.price < 0 &&
                      ((o.price = _this.hq.price),
                      (o.avg_price = y[4][y[4].length - 2].avg_price),
                      (o.volume = 0));
                  }
                  function n() {
                    stbd(_this.hq.date, y[4][0].date) &&
                      _this.hq.time > "16:00" &&
                      ((o.price = _this.hq.price),
                      (o.avg_price = y[4][y[4].length - 2].avg_price),
                      (o.volume = 0),
                      (o.time = _this.hq.time),
                      o.avg_price < 0 && (o.avg_price = _this.hq.price));
                  }
                  if (!_this.hq.isUpdateTime) {
                    var o = y[4][y[4].length - 1];
                    switch (_this.market) {
                      case "US":
                        i();
                        break;
                      case "HK":
                        n();
                    }
                    initDatalen(_this.hq);
                    onViewChange(!0);
                    ooo1.createPlayingData();
                    util.isFunc(a) && a();
                    return !0;
                  }
                  "HK" == _this.market && l && loadtdatas(b, e, a);
                  _this.date =
                    "NF" == _this.market && _this.hq.time >= "21:00"
                      ? dateUtil.ds(y[4][0].date)
                      : _this.hq.today;
                  return !1;
                }
                var b,
                  y = tDb.get();
                switch (_this.needMarket) {
                  case "HF":
                    dd1 = util.tUtil.gata(_this.needMarket, futureTime2.time);
                    break;
                  case "NF":
                    dd1 = util.tUtil.gata(_this.needMarket, futureTime1.time);
                    break;
                  case "global_index":
                    dd1 = util.tUtil.gata(_this.needMarket, gbiTime.time);
                    break;
                  default:
                    dd1 = util.tUtil.gata(_this.needMarket);
                }
                if (e && e.date && _this.datas && !conf.date) {
                  n = !1;
                  b = y[4];
                  if (_this.hq.isDateChange) {
                    if (
                      ("NF" == _this.market &&
                        futureTime1 &&
                        futureTime1.time[0][0] < "21:00") ||
                      "NF" != _this.market
                    )
                      return void c();
                  } else if (
                    ("CN" == _this.market &&
                      !stbd(_this.hq.date, y[4][0].date) &&
                      _this.hq.time < "09:05") ||
                    ("NF" == _this.market &&
                      stbd(_this.hq.date, y[4][0].date) &&
                      futureTime1 &&
                      "21:00" == futureTime1.time[0][0] &&
                      _this.hq.time >= futureTime1.time[0][0])
                  )
                    return void c();
                  if (!p() && !h()) {
                    if (
                      (_this.datas && (K = y[4][0]),
                      time1(e.date, y[4][0].date))
                    )
                      return void (_this.realLen = U);
                    ooo3 = e.name || "";
                    _this.hq = e;
                    var _ =
                      e.date.getHours() < 10
                        ? "0" + e.date.getHours()
                        : e.date.getHours();
                    if (
                      ((_this.time =
                        _ + ":" + util.strUtil.zp(e.date.getMinutes())),
                      0 == e.index && u(b, e),
                      util.arrIndexOf(dd1, _this.time) &&
                        e.index > 0 &&
                        (util.arrIndexOf(dd1, _this.time) - _this.realLen <= 1
                          ? u(b, e)
                          : "US" !== _this.market && loadtdatas(b, e, a),
                        1 == e.index && 0 == s))
                    )
                      return (s = 1), void loadtdatas(b, e, a);
                    R(_this.market) &&
                      ((_this.hq.open == _this.hq.prevclose &&
                        _this.hq.high == _this.hq.prevclose &&
                        _this.hq.low == _this.hq.prevclose &&
                        _this.hq.index < 0) ||
                        e.time < "09:30") &&
                      ("CN" == _this.market
                        ? ((b[0].avg_price = e.price),
                          (b[0].volume = e.totalVolume))
                        : "option_cn" == _this.market
                        ? ((b[0].inventory = e.position || e.holdingAmount),
                          (b[0].holdPosition = e.position || e.holdingAmount))
                        : "HK" == _this.market &&
                          (b[0].avg_price =
                            e.totalAmount / e.totalVolume || e.price));
                    5 == viewState.end &&
                      (onViewChange(!0), ooo1.createPlayingData());
                    util.isFunc(a) && a();
                  }
                }
              },
              c = -1,
              p = -1,
              h = -1,
              u = function(e, t) {
                var i = e;
                initDatalen(t);
                var r = i[_this.realLen];
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
                  ("option_cn" == _this.market || "NF" == _this.market) &&
                    ((r.inventory = t.position || t.holdingAmount),
                    (r.holdPosition = t.position || t.holdingAmount)),
                  "CN" == _this.market
                    ? (r.avg_price = t.avg_price || r.price)
                    : (t.index > 1
                        ? (r.avg_price =
                            (r.avg_price > 0 && r.avg_price) ||
                            (i[t.index - 1].avg_price * t.index + t.price) /
                              (t.index + 1) ||
                            r.price)
                        : "fund" == _this.market ||
                          (r.avg_price = r.price || t.price),
                      0 == t.index &&
                        (r.avg_price =
                          t.totalAmount / t.totalVolume || t.price),
                      (r.volume = r.volume || 0)),
                  isNaN(t.volume) && (t.volume = 0),
                  "HK" != _this.market &&
                    "NF" != _this.market &&
                    (r.volume += t.volume),
                  (r.price = t.price),
                  r.volume <= 0 && (r.volume = 0));
              },
              loadtdatas = function(td1, n, o) {
                var params = {
                  symbol: n.symbol,
                  date: n.today,
                  withT5: 0,
                  withI: !1,
                  faker: "",
                  dataformatter: conf2.datas.t1.dataformatter,
                  ssl: conf.ssl,
                  assisthq: conf.assisthq,
                };
                B = ae = !1;
                "LSE" == _this.market && (params.symbol = conf.rawsymbol);
                KKE.api("datas.t.get", params, function(ret) {
                  td1 = ret.data.td1;
                  initDatalen(_this.hq);
                  var i = tDb.get();
                  ("NF" == _this.market &&
                    ("21:00" == futureTime1.time[0][0] &&
                      _this.hq.time >= futureTime1.time[0][0] &&
                      0 != _this.hq.date.getDay() &&
                      6 != _this.hq.date.getDay() &&
                      (td1[0].date = i[4][0].date),
                    ("09:30" == futureTime1.time[0][0] ||
                      "09:15" == futureTime1.time[0][0]) &&
                      stbd(i[4][0].date, _this.hq.date) &&
                      _this.hq.time <= futureTime1.time[0][0])) ||
                    ("HF" == _this.market &&
                      _this.hq.time > futureTime2.time[0][0] &&
                      0 != _this.hq.date.getDay() &&
                      6 != _this.hq.date.getDay() &&
                      (td1[0].date = _this.hq.date),
                    (i[4] = td1),
                    tDb.initTState(i),
                    "CN" == _this.market &&
                      "HK" == _this.needMarket &&
                      ((_this.needMarket = "CN"), xxx.changeData(_this)),
                    5 == viewState.end &&
                      (onViewChange(!0), ooo1.createPlayingData()),
                    util.isFunc(o) && o());
                });
              },
              loadt5datas = function(td1, r, n) {
                var params = {
                  symbol: r.symbol,
                  date: r.today,
                  withT5: 1,
                  dist5: 1,
                  withI: !1,
                  faker: "",
                  dataformatter: conf2.datas.t1.dataformatter,
                  ssl: conf.ssl,
                };
                B = ae = !1;
                "LSE" == _this.market && (params.symbol = conf.rawsymbol);
                KKE.api("datas.t.get", params, function(e) {
                  td1 = e.data.td1;
                  tDb.initTState(e.data.td5);
                  initDatalen(_this.hq);
                  util.isFunc(n) && n();
                  xxx.moving(viewState.start, viewState.end, "T5");
                  J.hide();
                });
              };
            (this.updateT5Data = loadt5datas),
              (this.update = function(a, r, o, s, c) {
                var d,
                  m,
                  p,
                  h = "",
                  u = "";
                if (((p = s ? s : util.market(conf2.symbol)), "US" === p))
                  h = 1 === conf.assisthq ? ",gb_ixic" : u;
                else if ("HK" === p) {
                  var v =
                    "hk" === conf2.symbol.substring(0, 2)
                      ? ",hkHSI"
                      : ",rt_hkHSI";
                  h = 1 === conf.assisthq ? v : u;
                }
                o
                  ? ((d = "datas.hq.parse"),
                    (m = {
                      symbol: conf2.symbol + h,
                      hqStr: o,
                      market: p,
                      ssl: conf.ssl,
                    }))
                  : ((d = "datas.hq.get"),
                    (m = {
                      symbol: conf2.symbol + h,
                      delay: !0,
                      cancelEtag: n,
                      ssl: conf.ssl,
                    })),
                  KKE.api(d, m, function(t) {
                    l(t.dataObj[conf2.symbol], a, c);
                  });
              });
          })(),
          pe = new (function() {
            var r = void 0,
              o = 1,
              s = function(e) {
                o > 2 ||
                  (_me.re(globalCfg.e.T_DATA_LOADED),
                  util.isFunc(e) && e(),
                  o++);
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
                switch (needmarket) {
                  case "HF":
                    n = futureTime2.time;
                    break;
                  case "NF":
                    n = futureTime1.time;
                    break;
                  case "global_index":
                    n = gbiTime.time;
                    break;
                  default:
                    n = [];
                }
                var s = util.tUtil.gltbt(
                  1,
                  o.hq.price,
                  !0,
                  _this.market,
                  [o.hq.date],
                  n
                );
                return (
                  (s[0].name = o.hq.name),
                  (s[0].symbol = conf2.symbol),
                  (s[0].today = util.dateUtil.ds(o.hq.date, "-")),
                  (r = i),
                  (r[4] = s),
                  (_this.realLen = 0),
                  r
                );
              };
            this.init = function(o) {
              var p = viewState.viewId;
              if (r != p) {
                (r = p),
                  null != _this.datas && tDb.initTState(p, _this.tDb.get());
                var h = {
                  assisthq: conf.assisthq,
                  ssl: conf.ssl,
                  symbol: conf2.symbol,
                  date: conf.date,
                  withT5: 1,
                  dist5: conf.dist5,
                  withI: !0,
                  faker: _this.needMarket,
                  dataformatter: conf2.datas.t1.dataformatter,
                };
                switch (_this.needMarket) {
                  case "HF":
                    dd1 = util.tUtil.gata(_this.needMarket, futureTime2.time);
                    break;
                  case "NF":
                    dd1 = util.tUtil.gata(_this.needMarket, futureTime1.time);
                    break;
                  case "global_index":
                    dd1 = util.tUtil.gata(_this.needMarket, gbiTime.time);
                    break;
                  case "LSE":
                    h.symbol = conf.rawsymbol;
                  default:
                    dd1 = util.tUtil.gata(_this.needMarket);
                }
                J.show(),
                  KKE.api("datas.t.get", h, function(e) {
                    xxx.hasHistory && "history" == e.msg && xxx.hasHistory(M);
                    var d = e.data.hq.status,
                      p = "",
                      u = Number(e.data.hq.state);
                    if ("empty" == e.msg)
                      switch (_this.market) {
                        case "CN":
                          3 == d &&
                            ((p = globalCfg.delisted),
                            tip.showTip({ txt: p, parent: V, noBtn: !0 }));
                      }
                    if ("error" == e.msg || "nohistory" == e.msg) {
                      if (
                        (isMain &&
                          "nohistory" == e.msg &&
                          ((M = 0),
                          xxx.hasHistory && xxx.hasHistory(M),
                          tip.showTip({
                            txt: globalCfg.nohistoryt,
                            parent: V,
                            noBtn: !0,
                          })),
                        (_this.isErr = !0),
                        isMain && e.data && e.data.hq)
                      ) {
                        if (d)
                          switch (_this.market) {
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
                            g = { txt: p, parent: V, noBtn: !0 };
                          if (!(E.DIMENSION.getStageW() < 200))
                            return (
                              tip.showTip({ txt: p, parent: V, noBtn: !0 }),
                              void J.hide()
                            );
                          (g.bgStyle = { padding: 0, top: "0px" }),
                            v || ((v = new util.TipM(E.COLOR)), v.genTip(g));
                        }
                      }
                      if (0 != u && 7 != u) {
                        if ((xxx.onResize(), 1 != d))
                          return void xxx.removeCompare([h.symbol]);
                        _this.isErr = !1;
                      } else _this.isErr = !1;
                    }
                    (_this.hq = e.data.hq), (r = void 0), (h.td1 = e.data.td1);
                    var b;
                    ccc2 = new Date();
                    var y = 60 * ccc2.getTimezoneOffset() * 1e3;
                    if (
                      (ccc2.setTime(ccc2.getTime() + y),
                      ccc2.setHours(ccc2.getHours() + 8),
                      (ooo3 = _this.hq.name || ""),
                      initDatalen(_this.hq),
                      l(_this.hq, e.data.td5) && R(_this.market)
                        ? "history" == e.msg
                          ? ((b = e.data.td5),
                            b[4][0].date || (b[4][0].date = _this.hq.date))
                          : (b = c(_this, e.data.td5))
                        : ((b = e.data.td5),
                          "NF" != _this.market ||
                            !futureTime1 ||
                            ("09:30" != futureTime1.time[0][0] &&
                              "09:15" != futureTime1.time[0][0]) ||
                            (stbd(b[4][0].date, _this.hq.date) &&
                              _this.hq.time <= futureTime1.time[0][0] &&
                              (b = c(_this, e.data.td5))),
                          b && !b[4][0].date && (b[4][0].date = _this.hq.date)),
                      (xxx.historyData = b),
                      (_this.date =
                        (e.data.td1 && e.data.td1[0].today) || _this.hq.date),
                      tDb.initTState(b),
                      s(o),
                      1 == O &&
                        (n.dateTo(conf.historytime, conf.historycb), (O = 0)),
                      J.hide(),
                      conf.loadedChart)
                    )
                      if (util.isFunc(conf.loadedChart)) conf.loadedChart();
                      else if (window[conf.loadedChart])
                        window[conf.loadedChart]();
                      else
                        try {
                          window.h5chart.loadedChart();
                        } catch (_) {}
                  });
              }
            };
          })();
        this.tDb = tDb;
        this.initData = pe.init;
        this.initT5Data = vvv.updateT5Data;
        this.doUpdate = vvv.update;
        this.onViewChange = onViewChange;
        this.setPricePos = function(e, t) {
          (_this.labelMaxP = e[0]),
            (_this.labelMinP = e[1]),
            (_this.labelPriceCount = e[2]),
            (_this.isCompare = t),
            ooo1.createPlayingData(),
            kkk1 && kkk1.setPricePos(e);
        };
        this.setRange = function() {
          ooo1.setDataRange(),
            eee1 && eee1.setDataRange(),
            kkk1 && kkk1.setDataRange(),
            ddd1 && ddd1.setDataRange();
        };
        this.draw = function() {
          qqq.draw(), eee1 && eee1.allDraw(), kkk1 && kkk1.allDraw();
        };
        this.resize = function(e) {
          ooo1.createPlayingData(),
            qqq.resize(),
            eee1 && eee1.onResize(e),
            kkk1 && kkk1.onResize(),
            ddd1 && ddd1.onResize();
        };
        this.clear = function() {
          qqq.clear(),
            eee1 && (eee1.clear(), (eee1 = null)),
            kkk1 && (kkk1.clear(), (kkk1 = null)),
            ddd1 && (ddd1.clear(), (ddd1 = null)),
            isMain && (Q = null);
        };
        this.getPriceTech = function() {
          return kkk1 || null;
        };
        this.removePt = function(e) {
          if (e) {
            !util.isArr(e) && (e = [e]);
            for (var a = e.length; a--; )
              if (e[a].name && "VOLUME" === e[a].name.toUpperCase()) {
                e.splice(a, 1), (E.custom.show_underlay_vol = !1);
                break;
              }
          } else E.custom.show_underlay_vol = !1;
          kkk1 && kkk1.removeChart(e);
        };
        this.togglePt = function(e) {
          kkk1 && (fBind = kkk1.showHide(e));
        };
        var he = function(e, a, i) {
          e && re.resizeAll(!0),
            xxx.onChangeView(),
            a && util.isFunc(a.callback) && a.callback(),
            i && ne.onTechChanged(i[0]);
        };
        this.initPt = function(e, r) {
          if (e) {
            !util.isArr(e) && (e = [e]);
            for (var n = e.length; n--; )
              if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                e.splice(n, 1), (E.custom.show_underlay_vol = !0);
                break;
              }
            kkk1 ||
              ((kkk1 = new s({
                iMgr: oe,
                stockData: _this,
                chartArea: G,
                titleArea: z,
                cb: he,
                type: "t",
                cfg: E,
                usrObj: conf,
              })),
              isMain && (ispCharts = kkk1)),
              kkk1.createChart(e, r);
          }
        };
        this.initTc = function(e, t) {
          eee1 ||
            ((eee1 = new l({
              stockData: _this,
              iMgr: oe,
              subArea: W,
              cb: he,
              cfg: E,
              type: "option_cn" == needmarket ? "p" : "t",
              usrObj: conf,
              initMgr: re,
            })),
            isMain && (istCharts = eee1)),
            eee1.createChart(e, t);
        };
        this.removeTc = function(e) {
          eee1 && eee1.removeChart(e);
        };
        this.initRs = function() {
          ddd1 ||
            ((ddd1 = new o({
              stockData: _this,
              setting: E,
              state: viewState,
              rc: xxx.moving,
              witht5: 1,
            })),
            (Q = ddd1)),
            ddd1.linkData();
        };
        this.setTLineStyle = qqq.setTLineStyle;
        c();
      }
      function S(e, r) {
        function n() {
          var r = e.isMain;
          if (r) (l = E.COLOR.T_P), (c = E.COLOR.T_AVG);
          else {
            2 != xxx.dAdd || o.linecolor || (o.linecolor = conf.overlaycolor);
            var n = o.linecolor || "#cccccc";
            l = n.K_N || n.T_N || "#" + util.randomColor();
          }
          s = new painter.xh5_ibPainter({
            setting: E,
            sd: e,
            withHBg: r,
            ctn: mainareaDom,
            iMgr: oe,
            reO: { mh: E.DIMENSION.H_MA4K },
            iTo: function(t, a, i, r) {
              if (
                (!$CONTAINS(t, oe.iHLineO.body) &&
                  t.appendChild(oe.iHLineO.body),
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
            o = oc(
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
                  if (5 == viewState.end && "CN" == e.market && ispCharts)
                    for (var t = ispCharts.getLog(), a = 0; a < t.length; a++)
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
                    : k % conf.modulo == 0 && s.lineTo(M, e),
                  (S.ix = M),
                  (M += T);
              (O = M),
                (L = e),
                s.stroke(),
                conf.business && h({ xPos: M, yPos: e });
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
                    ? xh5_PosUtil.pp(
                        0,
                        e.labelMinP,
                        e.labelMaxP,
                        E.DIMENSION.h_t
                      )
                    : xh5_PosUtil.pp(
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
              if ((e.isMain && s.stroke(), conf.business)) {
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
                      (conf.business ||
                        conf.simple ||
                        util.isRepos(e.symbol) ||
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
            s.resize({ mh: E.DIMENSION.H_MA4K }), g();
          }),
          (this.setTLineStyle = f),
          f(r),
          n();
      }
      function ddd() {
        var mainStock,
          me = this,
          allStocks = [];
        this.getAllStock = function() {
          return allStocks;
        };
        this.getMainStock = function() {
          return mainStock;
        };
        this.getAllSymbols = function() {
          for (var e = [], t = 0, a = allStocks.length; a > t; t++)
            e.push(allStocks[t].symbol);
          return e;
        };
        var c = function() {
            var e,
              t = E.DIMENSION.h_t;
            return conf.business
              ? (e = 0)
              : conf.appMode
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
            if (ispCharts) {
              var m = ispCharts.getLog(),
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
          setViewData = function(t) {
            1 == viewState.viewId || 0 == viewState.viewId
              ? conf.date
                ? me.moving(viewState.start, viewState.end)
                : me.moving(4, 5, !1)
              : me.moving(viewState.start, viewState.end, !1),
              t || ne.onRange(mainStock);
          },
          v = function(e) {
            return e.isErr
              ? (util.trace.error("err symbol data"),
                me.removeCompare([e.symbol]),
                !0)
              : e.tDb.get()
              ? !0
              : (e.initData(onChangeView), !1);
          },
          f = [],
          g = function(e) {
            if (e && util.isFunc(e.callback)) {
              for (var a = !1, i = f.length; i--; )
                if (e.callback === f[i]) {
                  a = !0;
                  break;
                }
              !a && f.push(e.callback);
            }
          },
          onChangeView = function(a, i) {
            g(i);
            if (v(mainStock)) {
              if (mainStock.isErr)
                return (
                  util.trace.error("err main symbol"),
                  void (mainStock.isErr = !1)
                );
              oe.patcher.switchFloater();
              for (var r, o = !0, s = allStocks.length; s--; )
                (r = allStocks[s]), r == mainStock || v(r) || (o = !1);
              if (o) {
                for (s = allStocks.length; s--; )
                  allStocks[s].marketNum(allStocks[s].needMarket) >
                    allStocks[s].marketNum(needmarket) &&
                    (needmarket = allStocks[s].needMarket);
                for (s = allStocks.length; s--; ) changeData(allStocks[s]);
                for (setViewData(a); f.length; ) {
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
        this.getExtraData = function(a) {
          if (
            ((a = oc(
              { symbol: mainStock.symbol, name: null, clone: !0 },
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
              ? ((s = i.tDb.get()), (r = a.clone ? util.clone(s) : s))
              : (r = null);
          }
          return r;
        };
        this.shareTo = function(e) {
          e = oc(
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
                  tip.showTip({
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
              util.grabM.shareTo({
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
        };
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
          updateDataAll = function(e) {
            if ((clearInterval(N), !isNaN(conf.rate))) {
              var t = 1e3 * conf.rate;
              t > 0 && (N = setTimeout(updateDataAll, t));
            }
            for (var a, r = allStocks.length; r--; )
              (a = allStocks[r]), a.doUpdate(D, null, null, null, e);
          },
          update5Data = function() {
            viewState.viewId = 2;
            for (var e, t = allStocks.length; t--; )
              (e = allStocks[t]), e.initT5Data(e.datas, e.hq, onChangeView);
          };
        this.updateDataAll = updateDataAll;
        this.update5Data = update5Data;
        var addCompare = function(t, a) {
            var i = new rra(t, a);
            a && (mainStock = i);
            allStocks[allStocks.length] = i;
            L();
            onChangeView();
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
                r == allStocks.length - 1 && 0 == o && (needmarket = t);
            for (r = allStocks.length; r--; ) changeData(allStocks[r], i);
          },
          changeData = function(e, t) {
            e.changeMarket(t);
          };
        this.changeData = changeData;
        var L = function() {
            if (allStocks.length > 1) me.mM.togglePt({ v: !1 });
            else {
              if (allStocks.length <= 0) return;
              me.mM.togglePt({ v: !0 });
            }
          },
          R = function(e) {
            var t = viewState.start,
              a = viewState.end;
            return (
              (t = Math.max(t + e, 0)),
              0 == t && 5 >= a && 0 == viewState.start && a++,
              t >= a && (t = a - 1),
              a > 5 && (a = 5),
              [t, a]
            );
          };
        this.onWheel = function(e) {
          var t = -1 * e.detail || e.wheelDelta;
          if (0 != t) {
            t = t > 0 ? -1 : 1;
            var i = R(t);
            me.moving(i[0], i[1], "wheel");
          }
        };
        this.onKb = function(e) {
          var t = e.keyCode;
          switch (t) {
            case 38:
            case 40:
              var i = R(38 == t ? 1 : -1);
              me.moving(i[0], i[1], "Key");
              break;
            case 37:
            case 39:
              oe.iToKb(37 == t ? -1 : 1);
              break;
            default:
              return;
          }
          xh5_EvtUtil.preventDefault(e);
        };
        this.zoomApi = function(e) {
          var t = R(e ? 1 : -1);
          me.moving(t[0], t[1], "zoom");
        };
        this.moveApi = function(e) {
          var t = viewState.start,
            i = viewState.end;
          (t += e),
            (i += e),
            i > 5 && ((t = 4), (i = 5)),
            0 > t && ((t = 0), (i = 1)),
            me.moving(t, i, "move");
        };
        this.setViewData = setViewData;
        this.onChangeView = onChangeView;
        var A = 1;
        this.moving = function(t, a, i, r) {
          (viewState.start = t),
            (viewState.end = a),
            ((4 != t && 5 != a) || (0 != t && 5 != a)) &&
              (viewState.viewId = 0),
            r && 4 != t && 1 == A && ((i = "rs"), (A = 2), (C = 0)),
            ("HF" == needmarket || "NF" == needmarket) &&
              0 == C &&
              i &&
              (J.show(), update5Data("t5"), (C = 1), (A = 2));
          for (var o, s = allStocks.length; s--; )
            (o = allStocks[s]), o.setRange(), o.onViewChange();
          d(), m(), ne.onRange(mainStock);
        };
        this.dAdd = 0;
        this.compare = function(e) {
          for (var t = allStocks.length; t--; )
            if (allStocks[t].symbol == e.symbol) return;
          addCompare(e, !1);
        };
        this.removeCompare = function(e) {
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
        };
        this.onResize = function(e) {
          for (var t = allStocks.length; t--; ) allStocks[t].resize(e);
        };
        this.dcReset = function() {
          for (var e, t = allStocks.length; t--; )
            (e = allStocks.splice(t, 1)[0]), e.clear(), (e = null);
        };
        this.setScale = function(e) {
          E.datas.scaleType = e;
        };
        this.setTLineStyle = function(a) {
          if (a) {
            !util.isArr(a) && (a = [a]);
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
        };
        var P,
          q = function(e) {
            e ? S() : oe.update();
          },
          U = !1,
          F = 0,
          clearTO = function() {
            clearTimeout(P), (U = !1), (F = 0);
          },
          setTO = function() {
            P = setTimeout(function() {
              F > 0 && S(), clearTO();
            }, 500);
          };
        this.pushData = function(e, t) {
          var a = !1;
          switch (Number(t)) {
            case 1:
              clearTO(), (a = !0);
              break;
            case 2:
              U || ((U = !0), setTO());
              break;
            case 0:
              clearTO();
          }
          for (var i = e.length; i--; )
            for (var r = allStocks.length; r--; )
              if (allStocks[r].symbol == e[i].symbol && e[i].data) {
                F++,
                  allStocks[r].doUpdate(
                    fBind(q, null, a),
                    !1,
                    e[i].data,
                    e[i].market
                  );
                break;
              }
        };
        this.dcInit = function(e) {
          addCompare(e, !0), updateDataAll();
        };
        this.mM = new (function() {
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
                  ? mainStock[o](a, r)
                  : KKE.api("plugins.techcharts.get", { type: i }, function(e) {
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
              i && mainStock && (mainStock[i](t), onChangeView());
            },
            i = function(t) {
              return o
                ? (Q
                    ? Q.sh(t)
                    : (mainStock.initRs(), i(t), B.appendChild(Q.getBody())),
                  void re.resizeAll(!0))
                : void KKE.api("plugins.rangeselector.get", null, function(e) {
                    (o = e), i(t);
                  });
            };
          (this.showRs = i),
            (this.newAC = t),
            (this.removeAC = a),
            (this.togglePt = function(t) {
              mainStock && (mainStock.togglePt(t), onChangeView());
            });
        })();
      }
      var futureTime2,
        futureTime1,
        gbiTime,
        needmarket = "CN",
        M = 1,
        O = 0,
        L = "手",
        C = 0;
      (futureTime1 = conf._nf_window_var),
        (futureTime2 = conf._hf_window_var),
        (gbiTime = conf._gbi_window_var);
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
                a = util.tUtil.gtAll(futureTime2.time).length;
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
                (a = util.tUtil.gtmsci().length), (L = "");
                break;
              case "CN":
                (a = 241),
                  util.isRepos(conf.symbol) && (L = ""),
                  util.isCNK(conf.symbol) && (L = "\u80a1");
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
                (a = util.tUtil.gtAll(futureTime1.time).length), (L = "");
                break;
              case "global_index":
                a = util.tUtil.gtAll(gbiTime.time).length;
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
              g = r.getHours() + ":" + util.strUtil.zp(r.getMinutes()),
              b = util.tUtil.gata(i),
              y = dateUtil.stbd(r, n) ? util.arrIndexOf(b, g) : 0;
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
                  w = util.tUtil.gtr([s[_]]),
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
      util.xh5_EvtDispatcher.call(this);
      var _me = this;
      conf = oc(
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
        conf || { YANGWEN: "yangwen@staff.sina.com.cn", VER: "2.6.0" }
      );
      !conf.symbol && (conf.symbol = "sh000001"),
        (conf.symbol = String(conf.symbol));
      conf.rawsymbol = String(conf.symbol);
      conf.symbol =
        "LSE" === util.market(conf.symbol)
          ? util.strUtil.replaceStr(conf.symbol)
          : conf.symbol.replace(".", "$");
      0 == location.protocol.indexOf("https:") && (conf.ssl = !0);
      var q =
          "_" +
          conf.symbol +
          "_" +
          Math.floor(1234567890 * Math.random() + 1) +
          Math.floor(9876543210 * Math.random() + 1),
        E = settinger.getSetting(q);
      E.datas.isT = !0;
      conf.reorder || (E.custom.indicator_reorder = !1);
      conf.reheight || (E.custom.indicator_reheight = !1);
      needmarket = util.market(conf.symbol);
      E.datas.tDataLen = A.tcd(needmarket);
      var U = E.datas.tDataLen,
        tip = new (function() {
          var e;
          this.showTip = function(a) {
            e || (e = new util.TipM(E.COLOR)), e.genTip(a);
          };
          this.hideTip = function() {
            e && e.hide();
          };
        })();
      if (xh5_BrowserUtil.noH5) {
        if ("undefined" == typeof FlashCanvas || conf.fh5)
          return void (util.isFunc(conf.noh5) && conf.noh5(conf));
        E.PARAM.isFlash = !0;
      }
      if (
        (E.PARAM.isFlash &&
          ((E.COLOR.K_EXT_BG = "#fff"), (E.COLOR.F_BG = "#fff")),
        conf.dim)
      )
        for (var F in conf.dim)
          conf.dim.hasOwnProperty(F) &&
            util.isNum(E.DIMENSION[F]) &&
            (E.DIMENSION[F] = conf.dim[F]);
      var $,
        V,
        mainareaDom,
        G,
        z,
        W,
        B,
        xxx,
        jjj,
        istCharts,
        ispCharts,
        Q,
        J,
        viewState = {
          viewId: globalCfg.URLHASH.vi(conf.view || "ts"),
          dataLength: void 0,
          start: void 0,
          end: void 0,
          startDate: void 0,
          endDate: void 0,
        },
        t_rate = isNaN(conf.t_rate) ? E.PARAM.T_RATE : conf.t_rate,
        ae = !1,
        ie = 0,
        re = new (function() {
          var e,
            a = function(e, t, a) {
              var r = !1;
              isNaN(e) && (e = conf.w || $.offsetWidth),
                isNaN(t) && (t = conf.h || $.offsetHeight - conf.mh);
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
            resizeAll = function(e, i, o) {
              var s = a(i, o, 0 / 0);
              if (e || (i && o)) {
                if (!xxx) return;
                xxx.onResize(s), oe.onResize();
              }
              r(),
                n(),
                util.stc("t_wh", [
                  E.DIMENSION.getStageW(),
                  E.DIMENSION.getStageH(),
                ]);
            },
            createDoms = function() {
              $ = $DOM(conf.domid) || conf.dom;
              $ ||
                (($ = $C("div")),
                document.body.appendChild($),
                util.trace.error("missing of dom id"));
              V = $C("div");
              V.style.position = "relative";
              V.style.outlineStyle = "none";
              V.style.webkitUserSelect = V.style.userSelect = V.style.MozUserSelect =
                "none";
              mainareaDom = $C("div", "mainarea_" + E.uid);
              G = $C("div");
              mainareaDom.appendChild(G);
              z = $C("div");
              z.style.position = "absolute";
              z.style.fontSize = E.STYLE.FONT_SIZE + "px";
              mainareaDom.appendChild(z);
              V.appendChild(mainareaDom);
              W = $C("div");
              V.appendChild(W);
              B = $C("div");
              V.appendChild(B);
              $.appendChild(V);
              J = new util.LoadingSign();
              J.appendto(mainareaDom, E);
            },
            initTheme = function(a) {
              var i = !1;
              if (a) {
                Q && (i = Q.setTheme(a));
                for (var r in a)
                  a.hasOwnProperty(r) &&
                    E.COLOR.hasOwnProperty(r) &&
                    E.COLOR[r] !== a[r] &&
                    ((E.COLOR[r] = a[r]), (i = !0));
                util.stc("t_thm", a);
              }
              return i && logoM.styleLogo({ logo: e, color: E.COLOR.LOGO }), i;
            },
            m = function(e) {
              !E.custom.mousewheel_zoom ||
                (document.activeElement !== V &&
                  document.activeElement.parentNode !== V) ||
                (xxx && xxx.onWheel(e),
                xh5_EvtUtil.preventDefault(e),
                xh5_EvtUtil.stopPropagation(e));
            },
            p = function(e) {
              E.custom.keyboard && xxx && xxx.onKb(e);
            },
            u = function() {
              util.xh5_deviceUtil.istd ||
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
              createDoms(),
                initTheme(conf.theme),
                resizeAll(),
                u(),
                E.DIMENSION.h_t < 0 &&
                  ((mainareaDom.style.display = "none"),
                  (E.custom.indicator_reorder = !1),
                  (E.custom.indicator_reheight = !1)),
                logoM.getLogo({
                  cb: v,
                  id: E.PARAM.LOGO_ID,
                  isShare: !1,
                  top: E.DIMENSION.posY + E.DIMENSION.H_MA4K + 17,
                  right: E.DIMENSION.RIGHT_W + E.DIMENSION.K_RIGHT_W,
                  LOGO_W: E.DIMENSION.LOGO_W,
                  LOGO_H: E.DIMENSION.LOGO_H,
                  color: E.COLOR.LOGO,
                }),
                xh5_BrowserUtil.noH5 &&
                  (tip.showTip({
                    txt: conf.nohtml5info || globalCfg.nohtml5info,
                    parent: V,
                  }),
                  util.stc("t_nh5"));
            };
          f();
          this.resizeAll = resizeAll;
          this.innerResize = function(e) {
            xxx &&
              (a(0 / 0, 0 / 0, e),
              xxx.onResize(),
              oe.onResize(),
              r(),
              ne.onInnerResize({ height: E.DIMENSION.h_t }));
          };
          this.initTheme = initTheme;
        })(),
        ne = new (function() {
          var e = 0,
            currentData = function(a, r) {
              var n = U - 1,
                o = xxx.getAllStock()[0];
              if (
                o &&
                o.datas &&
                (stbd(o.datas[o.datas.length - 1][0].date, o.hq.date)
                  ? (r = o.realLen < 0 || o.realLen > n ? n : (n = o.realLen))
                  : "NF" == needmarket &&
                    futureTime1 &&
                    "21:00" == futureTime1.time[0][0]
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
                  ("HF" == needmarket
                    ? ((s = futureTime2.time[0][0]),
                      s > a.time
                        ? ((s = o.datas[o.datas.length - 1][0].date),
                          (l = new Date(s)),
                          "hf_CHA50CFD" !== conf.symbol &&
                            l.setDate(l.getDate() + 1))
                        : (l = o.datas[o.datas.length - 1][0].date))
                    : "NF" == needmarket
                    ? ((s = futureTime1.time[0][0]),
                      s < a.time && "21:00" == s
                        ? ((s = o.datas[o.datas.length - 1][0].date),
                          (l = new Date(s)),
                          l.setDate(l.getDate() - 1))
                        : (l = o.datas[o.datas.length - 1][0].date))
                    : (l = o.datas[o.datas.length - 1][0].date),
                  "US" == needmarket &&
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
                    util.dateUtil.ds(l, "/", !1) +
                    "/" +
                    util.dateUtil.nw(l.getDay()) +
                    (a.time || "")),
                  (e = r),
                  util.clone(a)
                );
              }
            };
          this.currentData = currentData;
          this.onDataUpdate = function() {
            if (util.isFunc(conf.ondataupdate)) {
              var e = currentData();
              e &&
                conf.ondataupdate({
                  data: util.clone(e),
                  idx: viewState.currentLength - 1,
                  left: E.DIMENSION.posX,
                  top: E.DIMENSION.H_MA4K,
                });
            }
          };
          (this.onInnerResize = function(e) {
            util.isFunc(conf.oninnerresize) && conf.oninnerresize(e);
          }),
            (this.onRange = function(e) {
              !ae &&
                util.isFunc(conf.onrange) &&
                e &&
                conf.onrange({
                  isCompare: e.isCompare,
                  data: util.clone(e.datas),
                  width: E.DIMENSION.w_t,
                  height: E.DIMENSION.h_t,
                  viewRangeState: util.clone(viewState),
                  range: [e.labelMinP, e.labelMaxP, e.labelMaxVol],
                  left: E.DIMENSION.posX,
                  top: E.DIMENSION.H_MA4K,
                });
            });
          this.onViewChanged = function() {
            util.isFunc(conf.onviewchanged) &&
              conf.onviewchanged({ viewRangeState: util.clone(viewState) });
          };
          this.onViewPrice = function(r, n, o, s) {
            if (!ae && util.isFunc(conf.onviewprice)) {
              if ((r || (r = currentData(r, n)), !r)) return;
              o || (o = xxx.getMainStock().getName());
              var l,
                c,
                d = util.clone(r);
              conf.ennfloat
                ? ((l = conf.nfloat), (c = conf.nfloat))
                : ((l = util.strUtil.nfloat(d.price)),
                  (c = util.strUtil.nfloat(d.avg_price))),
                (d.price = Number(d.price.toFixed(l))),
                (d.avg_price = Number(d.avg_price.toFixed(c)));
              var m = conf.symbol.length;
              "HK" == needmarket &&
                conf.symbol.substring(m - 1, m) >= "A" &&
                (d.avg_price = 0 / 0),
                d.volume && d.volume < 0 && (d.volume = 0),
                conf.onviewprice({
                  curname: o || "",
                  data_array: xxx.getAllStock().length,
                  data: d,
                  idx: e,
                  left: E.DIMENSION.posX,
                  top: E.DIMENSION.H_MA4K,
                  interacting: !!s,
                });
            }
          };
          this.onTechChanged = function(e) {
            util.isFunc(conf.ontechchanged) &&
              conf.ontechchanged({ Indicator: e });
          };
          this.shortClickHandler = function() {
            util.isFunc(conf.onshortclickmain) && conf.onshortclickmain();
          };
        })(),
        oe = new (function() {
          var e,
            a,
            iHLineO,
            n,
            o,
            s = conf.nfloat,
            l = 137,
            c = new (function() {
              var showFloater = function(t) {
                var a = e.body.style;
                t && E.custom.show_floater
                  ? ((a.backgroundColor = E.COLOR.F_BG),
                    (a.color = E.COLOR.F_T),
                    (a.border = "1px solid " + E.COLOR.F_BR),
                    (a.display = ""))
                  : (a.display = "none");
              };
              this.pv = function(a) {
                var i = e.body.style,
                  r = Math.max(E.DIMENSION.posX, 55) + 9,
                  n = E.DIMENSION.posX < 55 ? 9 : 0,
                  o = E.DIMENSION.getStageW() - l - 9 - E.DIMENSION.RIGHT_W - n;
                (i.left =
                  (a.x > (E.DIMENSION.getStageW() - E.DIMENSION.RIGHT_W) >> 1
                    ? r
                    : o) + "px"),
                  (i.top = (a.y || 0) + "px"),
                  showFloater(!0);
              };
              this.showFloater = showFloater;
            })(),
            p = function() {
              function r() {
                var e = xxx.getAllStock()[0];
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
                  h = $C("div");
                h.style.position = "absolute";
                h.style.zIndex = E.PARAM.I_Z_INDEX + 2;
                (h.style.padding = "2px"),
                  (h.style.width = l + "px"),
                  (h.style.lineHeight = "16px"),
                  (h.style.display = "none"),
                  (h.style.fontSize = "12px");
                var u,
                  v,
                  f,
                  g,
                  b = $C("table"),
                  y = $C("thead"),
                  N = $C("tbody");
                (b.style.cssText = o),
                  (u = $C("tr")),
                  (v = $C("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = c);
                var k = $C("span");
                v.appendChild(k),
                  u.appendChild(v),
                  y.appendChild(u),
                  (u = $C("tr")),
                  (u.style.textAlign = "center"),
                  (v = $C("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = c);
                var S = $C("span");
                v.appendChild(S),
                  u.appendChild(v),
                  N.appendChild(u),
                  (u = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = m),
                  (f = $C("td")),
                  (v.style.fontWeight = "normal"),
                  (g = $C("span")),
                  (g.innerHTML = "\u4ef7\u683c");
                var D = $C("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  f.appendChild(D),
                  (v.style.fontWeight = "normal"),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = m),
                  (v.style.fontWeight = "normal"),
                  (f = $C("td")),
                  (g = $C("span")),
                  (g.innerHTML = "\u5747\u4ef7");
                var w = $C("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  (v.style.fontWeight = "normal"),
                  f.appendChild(w),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = m),
                  (f = $C("td")),
                  (v.style.fontWeight = "normal"),
                  (g = $C("span")),
                  (g.innerHTML = "\u6da8\u8dcc");
                var x = $C("span");
                (f.style.cssText = p),
                  v.appendChild(g),
                  f.appendChild(x),
                  u.appendChild(v),
                  u.appendChild(f),
                  N.appendChild(u),
                  (u = $C("tr")),
                  (v = $C("th")),
                  (v.style.cssText = m),
                  (f = $C("td")),
                  (v.style.fontWeight = "normal"),
                  (g = $C("span")),
                  (g.innerHTML = "\u6210\u4ea4");
                var T = $C("span");
                (f.style.cssText = p),
                  "HF" != needmarket &&
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
                this.setFloaterData = function(o) {
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
                    "HK" == needmarket ||
                    "US" == needmarket ||
                    "HF" == needmarket
                      ? (u = util.strUtil.nfloat(d))
                      : "LSE" === needmarket && (u = 3),
                      conf.ennfloat && (u = conf.nfloat),
                      (c = isNaN(c) ? "--" : (100 * c).toFixed(2)),
                      (D.innerHTML = d.toFixed(u)),
                      (w.innerHTML = r() ? "--" : p.toFixed(u)),
                      (x.innerHTML = h.toFixed(u) + "(" + c + "%)");
                    var v = 2;
                    util.isCNK(conf.symbol) && (v = 0),
                      (T.innerHTML = ps(l.volume < 0 ? 0 : l.volume, v) + L),
                      (x.style.color = M(c, 0)),
                      (w.style.color = M(p - m, 0)),
                      (D.style.color = M(c, 0));
                  }
                };
                this.body = h;
              }
              a = new n();
              e = a;
            },
            h = function() {
              function e(e) {
                var body = $C("div"),
                  a = $C("div"),
                  i = $C("span"),
                  r = $C("span"),
                  n = e.isH,
                  o = 12,
                  resize = function() {
                    if (
                      ((a.style.borderStyle = "dashed"),
                      (a.style.borderColor = E.COLOR.IVH_LINE),
                      (i.style.backgroundColor = r.style.backgroundColor =
                        E.COLOR[e.txtBgCN]),
                      (i.style.color = r.style.color = E.COLOR[e.txtCN]),
                      n)
                    )
                      (a.style.borderWidth = "1px 0 0 0"),
                        (body.style.width = a.style.width =
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
                        (body.style.height = a.style.height = o + "px"),
                        (i.style.top = s + "px"),
                        (i.style.padding = "2px 2px 1px");
                    }
                  };
                (body.style.position = "absolute"),
                  (body.style.zIndex = E.PARAM.I_Z_INDEX - 2),
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
                  resize(),
                  body.appendChild(i),
                  n && body.appendChild(r),
                  body.appendChild(a);
                var display = function(e) {
                  e
                    ? "" != body.style.display && (body.style.display = "")
                    : "none" != body.style.display &&
                      (body.style.display = "none");
                };
                this.pv = function(e) {
                  if (
                    (!isNaN(e.y) && (body.style.top = e.y + (e.oy || 0) + "px"),
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
                    body.style.left = a + "px";
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
                  display(!0);
                };
                this.display = display;
                this.body = body;
                this.resize = resize;
                display(!1);
              }
              (iHLineO = new e({
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
            hideIUis = function() {
              iHLineO.display(!1);
              n.display(!1);
              c.showFloater(!1);
            },
            g = function() {
              var e = xxx.getAllStock(),
                t = e[0].datas.length,
                a = 0;
              e[0].realLen >= 0 &&
                (a =
                  5 == viewState.end
                    ? e[0].realLen + E.datas.tDataLen * (t - 1)
                    : E.datas.tDataLen * (t - 1));
              return a;
            },
            b = function(e) {
              e > 2e3 && (e = g()),
                0 > e ||
                  (istCharts && istCharts.indirectI(e),
                  ispCharts && ispCharts.indirectI(e));
            },
            y = function() {
              b(g());
              istCharts && istCharts.allDraw();
            },
            k = !0,
            S = 0,
            D = 0,
            T = 0 / 0,
            M = 0 / 0;
          this.iToD = function(a, o, l) {
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
              C = xxx.getAllStock(),
              A = C.length,
              q = U,
              H = A > 1,
              F = C[0].datas.length,
              $ = q * F,
              V = Math.floor((d * $) / E.DIMENSION.w_t);
            if (isNaN(d) && isNaN(p)) {
              if (
                ((k = !0),
                hideIUis(),
                stbd(C[0].datas[F - 1][0].date, C[0].hq.date))
              ) {
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
                    needmarket)
                  ) {
                    case "HK":
                    case "US":
                    case "HF":
                      (Y = conf.ennfloat ? s : util.strUtil.nfloat(g)),
                        (G = g.toFixed(Y));
                      break;
                    case "LSE":
                      (Y = conf.ennfloat ? s : 3), (G = g.toFixed(Y));
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
            var le =
              "string" != typeof C[0].date ? dateUtil.ds(C[0].date) : C[0].date;
            if (F > 1) {
              W.realLen < 0 && (W.realLen = U);
              var ce = $ - q + W.realLen;
              5 == viewState.end && V >= ce && ((V = ce), (L = te[re][V % U]));
            } else {
              if (dateUtil.stbd(se, dateUtil.sd(le)))
                -1 === W.realLen && (W.realLen = U),
                  V >= W.realLen && (V = W.realLen);
              else
                switch (needmarket) {
                  case "HF":
                  case "NF":
                    V >= W.realLen && 4 == viewState.start && (V = W.realLen);
                    break;
                  default:
                    S = U - 1;
                }
              R(needmarket) &&
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
                    time: W.hq.time,
                  })
                : ((L = W.datas[0][V]),
                  (L.prevclose = W.datas[0][0].prevclose));
            }
            if (L && (L.date || (L.date = se), !L || L.date)) {
              var de = d;
              E.custom.stick && (d = L.ix || d);
              var me, pe;
              "HF" == needmarket
                ? ((me = futureTime2.time[0][0]),
                  me > L.time
                    ? ((me = L.date),
                      (pe = new Date(me)),
                      pe.setDate(pe.getDate() + 1))
                    : (pe = L.date))
                : "NF" == needmarket
                ? ((me = futureTime1.time[0][0]),
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
                util.dateUtil.ds(pe, "/", !1) +
                "/" +
                util.dateUtil.nw(pe.getDay()) +
                (L.time || "");
              ("GOODS" === needmarket ||
                "hf_CHA50CFD" === conf.symbol ||
                "HF" === needmarket) &&
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
                iHLineO.pv({ y: p, oy: h, v: G, p: y }),
                n.pv({ v: he, x: d, ox: m, y: E.DIMENSION.H_MA4K }),
                b(V),
                ne.onViewPrice(L, V, B, !k),
                _me.re(globalCfg.e.I_EVT, a.e);
            }
          };
          this.globalDragHandler = function(e, t, a, i, r) {
            isNaN(e) && isNaN(t) && _me.re(globalCfg.e.I_EVT, r);
          };
          this.shortClickHandler = function() {
            ne.shortClickHandler();
          };
          this.zoomView = function() {};
          p();
          h();
          this.onResize = function() {
            iHLineO.resize(), n.resize();
          };
          this.iHLineO = iHLineO;
          this.hideIUis = hideIUis;
          this.iToKb = function(e) {
            (D += e), (S = D);
            var t = xxx.getAllStock(),
              a = t[0].datas.length,
              i = t[0].datas[0][D],
              r = t.length,
              n = t[0].realLen,
              o =
                "string" != typeof t[0].date
                  ? dateUtil.ds(t[0].date)
                  : t[0].date;
            1 >= a
              ? dateUtil.stbd(t[0].datas[0][0].date, dateUtil.sd(o))
                ? 0 > n && (n = U)
                : (n = U)
              : dateUtil.stbd(t[0].datas[a - 1][0].date, dateUtil.sd(o)) ||
                (n = U);
            var s = U > n ? n + 1 : n;
            if (0 > D) {
              var l = U > n ? n : n - 1;
              (S = D = (a - 1) * U + l), (i = t[0].datas[a - 1][l]);
            } else if (D >= s + (a - 1) * U)
              if (
                dateUtil.stbd(t[0].datas[a - 1][0].date, dateUtil.sd(o)) &&
                0 > e
              ) {
                var c = 0;
                (c = a > 1 ? n - 1 + U * (a - 1) : n - 1),
                  (S = D = c),
                  (i = t[0].datas[0][S]);
              } else (S = D = 0), (i = t[0].datas[0][0]);
            !$CONTAINS(mainareaDom, oe.iHLineO.body) &&
              mainareaDom.appendChild(oe.iHLineO.body);
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
          };
          this.isIng = function() {
            return !k;
          };
          this.isMoving = function() {
            return !1;
          };
          this.iReset = function() {};
          this.patcher = new (function() {
            var i,
              r = {},
              n = function() {
                if (i) {
                  e.body.parentNode && e.body.parentNode.removeChild(e.body);
                  var t = "vid_" + viewState.viewId;
                  if (i[t]) {
                    var n;
                    (n = r[t] ? r[t] : (r[t] = new i[t]())), (e = n);
                  } else e = a;
                } else e = a;
                !$CONTAINS(V, e.body) && V.appendChild(e.body);
              };
            (this.customFloater = function(e) {
              (i = e), n(), util.stc("t_fl", e);
            }),
              (this.switchFloater = n);
          })();
          this.update = function() {
            var a = xxx.getAllStock();
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
                    stbd(r.datas[i][0].date, r.hq.date) && l > S
                      ? r.realLen
                      : l;
                } else s = 1 == n && 0 == i && D > S ? r.realLen : D;
                if (
                  ((i = 0 > i ? 0 : i),
                  (s = 0 > s ? 0 : s),
                  (o = r.datas[i][s]))
                )
                  if (
                    ((o.day =
                      util.dateUtil.ds(r.datas[i][0].date, "/", !1) +
                      "/" +
                      util.dateUtil.nw(r.datas[i][0].date.getDay()) +
                      (o.time || "")),
                    e && e.setFloaterData({}),
                    k)
                  )
                    if (stbd(r.datas[n - 1][0].date, r.hq.date))
                      (s = r.realLen >= 0 ? r.realLen : U - 1),
                        (s += (n - 1) * U),
                        (s = 0 > s ? Number.MAX_VALUE : s),
                        b(s);
                    else {
                      if ("NF" == needmarket && r.hq.time >= "21:00")
                        return (
                          r.realLen >= 0 && (s = r.realLen),
                          void (
                            4 == viewState.start &&
                            5 == viewState.end &&
                            ne.onViewPrice(o, s, void 0, !k)
                          )
                        );
                      y();
                    }
                  else if ("HF" == needmarket)
                    4 == viewState.start &&
                      5 == viewState.end &&
                      ne.onViewPrice(o, s, void 0, !k);
                  else if ("NF" == needmarket) {
                    var c = new Date(o.date);
                    o.date &&
                      o.time >= "21:00" &&
                      (c.setDate(
                        1 == o.date.getDay() ? c.getDate() - 3 : c.getDate() - 1
                      ),
                      (o.day =
                        util.dateUtil.ds(c, "/", !1) +
                        "/" +
                        util.dateUtil.nw(c.getDay()) +
                        (o.time || ""))),
                      ne.onViewPrice(o, s, void 0, !k);
                  } else ne.onViewPrice(o, s, void 0, !k);
              }
            }
          };
        })();

      n = new (function() {
        var e = this,
          a = function(a, i) {
            if (E.hasOwnProperty(a)) {
              for (var r in i)
                if (i.hasOwnProperty(r) && util.isFunc(i[r]))
                  return void util.trace.error("illegal operation:", r);
              "DIMENSION" == a && (ie = 1),
                oc(E[a], i),
                util.stc(a, i),
                e.resize();
            } else util.trace.error("not exist param:", a);
          },
          r = function(e, a) {
            var i;
            if (E.hasOwnProperty(e)) {
              i = util.clone(E[e]);
              for (var r in i)
                if (i.hasOwnProperty(r) && util.isFunc(i[r]))
                  (i[r] = null), delete i[r];
                else if (a)
                  for (var n = a.length; n--; )
                    typeof i[r] === a[n] && ((i[r] = null), delete i[r]);
            }
            return i;
          },
          n = function(e, t, a) {
            (a = oc({ toremove: !1, isexclusive: !1, callback: void 0 }, a)),
              a.toremove
                ? xxx.mM.removeAC(t, e)
                : a.isexclusive
                ? (xxx.mM.removeAC(null, e), xxx.mM.newAC(t, e, a))
                : xxx.mM.newAC(t, e, a);
          },
          o = function(e) {
            (viewState.viewId = e),
              (viewState.start = 1 == e ? 4 : 0),
              (viewState.end = 5);
          };
        this.pushData = function(e, a) {
          !util.isArr(e) && (e = [e]), xxx.pushData(e, a);
        };
        var s;
        this.pushTr = function(e) {
          e &&
            e.data &&
            (clearTimeout(s),
            (s = setTimeout(function() {
              var t = e.data.split(","),
                r = {
                  symbol: e.symbol,
                  data: t[t.length - 1],
                  market: e.market,
                };
              xxx.pushData([r], 1);
            }, 20)));
        };
        this.setScale = function(e) {
          xxx.setScale(e);
          util.stc("t_scale", e);
        };
        var l = !0;
        this.showView = function(e, a) {
          oe.hideIUis(), l ? (l = !1) : J.hide();
          var viewId = globalCfg.URLHASH.vi(e);
          if (conf.date)
            return (conf.date = ""), o(viewId), void this.newSymbol(conf);
          var n = xxx.getAllStock()[0];
          ne.onRange(n);
          util.stc("t_v", e);
          util.suda("vw", e);
          if (viewState.viewId != viewId) {
            if (
              (o(viewId),
              ("HF" == needmarket || "NF" == needmarket) && "t5" == e && 0 == C)
            )
              return J.show(), (C = 1), void xxx.update5Data(e);
            xxx.onChangeView(!1, a), ne && ne.onViewPrice();
          }
        };
        var strSymbols = function(e) {
            var a;
            return (a = util.isStr(e.symbol)
              ? e.symbol.split(",")
              : [e.symbol]);
          },
          m = [];
        this.overlay = function(e, t) {
          if (xxx && 1 != xxx.dAdd)
            if (t) {
              xxx.removeCompare(strSymbols(e));
              for (var a = 0; a < m.length; a++)
                e.symbol == m[a] && m.splice(a, 1);
              xxx.getAllStock().length <= 1 && (xxx.dAdd = 0);
            } else
              (conf.overlaycolor = e.linecolor || { K_N: "#cccccc" }),
                (xxx.dAdd = 2),
                xxx.compare(e),
                m.push(e.symbol);
        };
        this.compare = function(e, a) {
          if (xxx) {
            var i,
              r = 0;
            if (a) {
              if (
                ((i = util.isStr(e) ? e.split(",") : [e.symbol]),
                1 == xxx.dAdd && xxx.removeCompare(i),
                xxx.getAllStock().length <= 1)
              ) {
                for (r = 0; r < m.length; r++)
                  (xxx.dAdd = 2), xxx.compare({ symbol: m[r] });
                m.length < 1 && (xxx.dAdd = 0);
              }
            } else
              2 == xxx.dAdd && xxx.removeCompare(m),
                (xxx.dAdd = 1),
                xxx.compare(e),
                util.suda("t_comp");
            util.stc("t_comp", { rm: a, o: e });
          }
        };
        var p = 0;
        this.tCharts = function(e, a) {
          n("tech", e, a);
          a && !a.noLog && (0 == p ? (p = 1) : util.sudaLog());
        };
        var h = 0;
        this.pCharts = function(e, a) {
          n("price", e, a);
          a && !a.noLog && (0 == h ? (h = 1) : util.sudaLog());
        };
        this.showPCharts = function(e) {
          e && (xxx.mM.togglePt(e), util.stc("t_sp", e));
        };
        this.getIndicators = function() {
          var e = istCharts ? istCharts.getLog() : null,
            t = ispCharts ? ispCharts.getLog() : null;
          return { tCharts: e, pCharts: t };
        };
        var f;
        this.showRangeSelector = function(e) {
          f = oc({ dispaly: !0, from: void 0, to: void 0 }, e);
          xxx.mM.showRs(f);
          util.stc("t_rs", e);
        };
        this.setLineStyle = function(e) {
          xxx && xxx.setTLineStyle(e);
          util.stc("t_style", e);
        };
        this.setCustom = fBind(a, this, "custom");
        this.setDimension = fBind(a, this, "DIMENSION");
        this.getDimension = fBind(r, null, "DIMENSION", ["boolean"]);
        this.setTheme = function(e) {
          var t = re.initTheme(e);
          t && (this.setLineStyle({ linecolor: e }), this.resize());
        };
        this.newSymbol = function(e) {
          conf.symbol = e.symbol;
          conf.date = e.date;
          oe.hideIUis();
          oe.iReset();
          xxx.dcReset();
          xxx.dcInit(conf);
          tip.hideTip();
          if (istCharts) {
            var a = istCharts.getLog();
            istCharts = null;
            a && this.tCharts(a);
          }
          if (ispCharts) {
            var r = ispCharts.getLog();
            ispCharts = null;
            r && this.pCharts(r);
          }
          f && ((f.from = void 0), (f.to = void 0), xxx.mM.showRs(f));
          util.stc("t_ns", e);
        };
        this.resize = function(e, t) {
          re.resizeAll(!0, e, t);
        };
        this.hide = function(e) {
          ae = !0;
          oe.hideIUis();
          util.$CONTAINS($, V) && $.removeChild(V);
          e && xxx.dcReset();
        };
        this.show = function(e) {
          ae = !1;
          e && (util.isStr(e) && (e = $DOM(e)), ($ = e));
          util.$CONTAINS($, V) || ($.appendChild(V), re.resizeAll(!0));
          ne && ne.onViewPrice();
        };
        this.shareTo = function(e) {
          xxx.shareTo(e), util.stc("t_share", e);
          var a = e && e.type ? e.type : "weibo";
          util.suda("share", a);
        };
        this.getChartId = function() {
          return E.uid;
        };
        this.dateTo = function(time, cb) {
          conf.historytime = time;
          conf.historycb = cb;
          var r = time;
          "object" == typeof time
            ? (r = dateUtil.ds(time, "-"))
            : (time = dateUtil.sd(time));
          var n = jjj.get();
          if (null == n) return void (O = 1);
          for (var o = n.length, s = 0; o > s; s++)
            if (dateUtil.stbd(time, n[s][0].date))
              return void xxx.moving(s, s + 1, "dateTo");
          conf.date = r;
          xxx.hasHistory = cb;
          util.stc("t_ft", r);
          this.newSymbol(conf);
        };
        this.showScale = function(e) {
          xxx && xxx.setScale(e);
        };
        this.resize = function(e, t) {
          re.resizeAll(!0, e, t);
        };
        this.showCompatibleTip = function(e) {
          re.showCompatibleTip(e);
        };
        this.toggleExtend = function(e) {
          var t,
            i = E.DIMENSION.posX;
          t = e ? "on" == !e : E.DIMENSION.extend_draw;
          a.call(this, "DIMENSION", {
            extend_draw: !t,
            posX: i > 9 ? E.DIMENSION.extend_padding : 55,
            RIGHT_W: i > 9 ? E.DIMENSION.extend_padding : 55,
          });
          this.resize();
        };
        this.historyData = function() {
          return xxx.historyData;
        };
        this.getExtraData = function(e) {
          return xxx.getExtraData(e);
        };
        this.patcher = { iMgr: oe.patcher };
        this.zoom = function(e) {
          xxx.zoomApi(e);
          util.stc("t_zoom", e, 9e3);
        };
        this.move = function(e) {
          e = parseInt(e);
          isNaN(e) || (xxx.moveApi(e), util.stc("t_move", e, 9e3));
        };
        this.getSymbols = function() {
          return xxx.getAllSymbols();
        };
        this.update = function() {
          xxx.updateDataAll(1);
          util.stc("t_up", "update", 9e3);
        };
        this.getCurrentData = function() {
          return ne.currentData();
        };
        this.viewState = viewState;
        this.me = _me;
        this.type = "h5t";
      })();
      xxx = new ddd();
      xxx.dcInit(conf);
      return n;
    }
    function out() {
      function s1(conf, cb) {
        var r = new s2(conf),
          n = function(e) {
            r.me.rl(e, n);
          };
        r.me.al(globalCfg.e.T_DATA_LOADED, n);
        util.isFunc(cb) && cb(r);
      }
      this.get = function(conf, cb) {
        util.stc("h5t_get"), util.suda("h5t_" + util.market(conf.symbol));
        var r;
        0 == location.protocol.indexOf("https:") && (r = !0);
        var market = util.market(conf.symbol),
          o =
            "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InterfaceInfoService.getMarket?category=$market&symbol=$symbol",
          s =
            "//stock.finance.sina.com.cn/usstock/api/jsonp.php/var $cb=/Global_IndexService.getTradeTime?symbol=$symbol&category=index";
        r && (o = util.getSUrl(o));
        switch (market) {
          case "HF":
            var l = "kke_future_" + conf.symbol;
            util.load(
              o
                .replace("$symbol", conf.symbol.replace("hf_", ""))
                .replace("$market", "hf")
                .replace("$cb", "var " + l),
              function() {
                (l = window[l] || {
                  time: [
                    ["06:00", "23:59"],
                    ["00:00", "05:00"],
                  ],
                }),
                  (conf._hf_window_var = l),
                  s1(conf, cb);
              },
              null,
              { symbol: conf.symbol, market: market, type: "init_hf" }
            );
            break;
          case "NF":
            var c = "kke_future_" + conf.symbol,
              d = conf.symbol.replace("nf_", "").replace(/[\d]+$/, "");
            util.load(
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
                  (conf._nf_window_var = c),
                  s1(conf, cb);
              },
              null,
              { symbol: conf.symbol, market: market, type: "init_nf" }
            );
            break;
          case "global_index":
            var m = "kke_global_index_" + conf.symbol;
            util.load(
              s
                .replace("$symbol", conf.symbol.replace("znb_", ""))
                .replace("$cb", m),
              function() {
                (m = window[m] || {
                  time: [
                    ["06:00", "23:59"],
                    ["00:00", "05:00"],
                  ],
                }),
                  (conf._gbi_window_var = m),
                  s1(conf, cb);
              },
              null,
              { symbol: conf.symbol, market: market, type: "init_global" }
            );
            break;
          default:
            s1(conf, cb);
        }
      };
    }
    var n,
      o,
      s,
      l,
      $DOM = util.$DOM,
      $C = util.$C,
      $CONTAINS = util.$CONTAINS,
      xh5_PosUtil = util.xh5_PosUtil,
      xh5_EvtUtil = util.xh5_EvtUtil,
      oc = util.oc,
      dateUtil = util.dateUtil,
      stbd = util.dateUtil.stbd,
      ccc = util.xh5_ADJUST_HIGH_LOW.c,
      xh5_BrowserUtil = util.xh5_BrowserUtil,
      fBind = util.fBind,
      ps = util.strUtil.ps,
      globalCfg = settinger.globalCfg,
      logoM = util.logoM;
    return util.fInherit(s2, util.xh5_EvtDispatcher), out;
  }
);

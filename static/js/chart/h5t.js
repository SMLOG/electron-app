xh5_define(
  "chart.h5t",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(cfgs_settinger, utils_util, utils_painter) {
      "use strict";

      function ViewManger(viewManangerConfig) {
          function STData(stdDataOptions, isMain) {
              function onViewChange(e) {
                  _stData_$_obj.setDataRange(e),
                      _stData_tChartObj &&
                      (_stData_tChartObj.linkData(e), _stData_tChartObj.setDataRange()),
                      k && (k.linkData(e), k.setDataRange()),
                      D && (D.linkData(e), D.setDataRange());
              }

              function c() {
                  isMain && (whatJ = _stData_tDb_obj),
                      _stData_me_obj.update(null, !0),
                      "CN" === marketCode &&
                      !/^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(stdDataOptions.symbol);
              }
              stdDataOptions = copyProperties({
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
                  stdDataOptions || {}
              ); //stdDataOptions

              var d;
              var _stDataMe = this;
              var marketCode = utils_util.market(stdDataOptions.symbol);
              var marketCodeToID = function(code) {
                  switch (code) {
                      case "CN":
                          return 1;
                      case "HK":
                          return 2;
                      case "US":
                          return 3;
                  }
                  return 1;
              };

              this.business = stdDataOptions.business;
              this.simple = stdDataOptions.simple;
              var y = !0;
              this.dp = stdDataOptions.dp;
              this.marketNum = marketCodeToID;
              this.isErr = !1;
              this.witht5 = !0;
              this.symbol = stdDataOptions.symbol;
              this.isMain = isMain;
              this.isCompare = !1;
              this.dAdd = 0;
              this.uid = stdDataOptions.symbol + Math.random();
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
              this.nfloat =
                  0 === viewManangerConfig.nfloat ?
                  viewManangerConfig.nfloat :
                  viewManangerConfig.nfloat || 2;
              this.ennfloat = viewManangerConfig.ennfloat;
              this.market = marketCode;
              this.date = null;
              this.hq = null;
              this.futureTime = _nf_window_var || _hf_window_var || _gbi_window_var;
              this.gbiTime = _gbi_window_var;
              this.preData = {
                  data: 0,
                  vPos: null
              };
              this.needMarket = marketCode;

              this.changeMarket = function(e) {
                  var a,
                      i = [],
                      r = e;
                  if (
                      ((tDataLen = ObjectA.tcd(marketCode)),
                          marketCodeToID(_stDataMe.needMarket) != marketCodeToID(marketCode))
                  ) {
                      a = _stData_tDb_obj.get();
                      d = utils_util.tUtil.gata(marketCode);
                      for (var n = 0; n < a.length; n++)
                          marketCodeToID(_stDataMe.needMarket) < marketCodeToID(marketCode) ?
                          (i.push(
                                  ObjectA.aduk(
                                      a[n],
                                      _stDataMe.market,
                                      marketCode,
                                      curDate,
                                      a[n][0].date
                                  )
                              ),
                              (_stDataMe.realLen = utils_util.arrIndexOf(
                                  d,
                                  curDate.getHours() +
                                  ":" +
                                  utils_util.strUtil.zp(curDate.getMinutes())
                              )),
                              _stDataMe.realLen < 0 && (_stDataMe.realLen = tDataLen)) :
                          (i.push(ObjectA.rmuk(a[n], marketCode, r)),
                              (_stDataMe.realLen = utils_util.arrIndexOf(
                                  d,
                                  curDate.getHours() +
                                  ":" +
                                  utils_util.strUtil.zp(curDate.getMinutes())
                              )));
                      (_stDataMe.needMarket = marketCode),
                      _stData_tDb_obj.initTState(i),
                          (_stDataMe.datas = i[4]),
                          _stData_$_obj.setDataRange(),
                          _stData_$_obj.createPlayingData();
                  }
              }; //

              var _stData_tChartObj,
                  k,
                  D,
                  L,
                  curDate,
                  stockUI = new StockUI(this, stdDataOptions);
              this.getName = function() {
                  return L || "";
              };
              this.getStockType = function() {
                  var e;
                  return _stDataMe.hq && (e = _stDataMe.hq.type), e || "";
              };

              this.viewState = viewState;

              var _stData_tDb_obj = new(function() {
                  var a = {};
                  var r = {
                      rsAmount: void 0
                  };
                  var n = function(e) {
                      if (e) {
                          var r,
                              n = e.length,
                              o = [];
                          if ((utils_util.clone(e, o), o.length > 5)) {
                              if (viewManangerConfig.date) {
                                  for (
                                      var s,
                                          l = Number(viewManangerConfig.date.split("-")[2]),
                                          c = 0,
                                          d = 0,
                                          m = 0,
                                          p = o.length; p > m; m++
                                  )
                                      (s = o[m][0].date.getDate()),
                                      0 == m ?
                                      (c = Math.abs(s - l)) :
                                      c > Math.abs(s - l) &&
                                      ((c = Math.abs(s - l)), (d = m));
                                  d >= 5 ?
                                      ((r = o.splice(d - 4, 5)),
                                          (viewState.start = 4),
                                          (viewState.end = 5)) :
                                      ((r = o.splice(0, 5)),
                                          (viewState.start = d),
                                          (viewState.end = d + 1)),
                                      (a.tv = viewState.start),
                                      (a.tb = viewState.end);
                              }
                          } else
                              (r = o), (a.tv = viewManangerConfig.date ? 0 : 4), (a.tb = n);
                          a.t = r;
                      }
                  };
                  this.get = function(e) {
                      return e ? a[e] : a.t;
                  };
                  this.set = function(e, t) {
                      "undefined" != typeof a[e] && (a[e] = t);
                  };
                  this.initState = n;
                  this.initTState = function(e) {
                      n(e);
                  };
                  this.extraDataObj = r;
                  this.initExtraData = function() {
                      var http = viewManangerConfig.ssl ? "https" : "http",
                          n =
                          http +
                          "://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol",
                          o = "KKE_ShareAmount_" + stdDataOptions.symbol;
                      utils_util.load(
                          n
                          .replace("$symbol", stdDataOptions.symbol)
                          .replace("$rn", String(new Date().getDate()))
                          .replace("$cb", "var%20" + o + "="),
                          function() {
                              var e = window[o];
                              if (e) {
                                  for (var t, a = [], i = e.length; i--;)
                                      (t = e[i]),
                                      a.push({
                                          amount: Number(t.amount),
                                          date: dateUtil.sd(t.date)
                                      });
                                  a.length && (r.rsAmount = a);
                              }
                          }
                      );
                  };
                  this.gc = function() {
                      a = null;
                      r = null;
                  };
              })();

              var _stData_$_obj = new(function() {
                  var set_stDataMeDefaultVal;
                  set_stDataMeDefaultVal = function() {
                      (_stDataMe.minPrice = Number.MAX_VALUE),
                      (_stDataMe.maxPrice = 0),
                      (_stDataMe.minPercent = Number.MAX_VALUE),
                      (_stDataMe.maxPercent = -Number.MAX_VALUE),
                      (_stDataMe.minavgPrice = Number.MAX_VALUE),
                      (_stDataMe.maxavgPrice = 0),
                      (_stDataMe.maxVolume = 0);
                  };
                  var t = function() {
                      function e(e) {
                          var t = Math.max(
                                  Math.abs(e - _stDataMe.maxPrice),
                                  Math.abs(e - _stDataMe.minPrice)
                              ),
                              a = Math.max(
                                  Math.abs(e - _stDataMe.maxavgPrice),
                                  Math.abs(e - _stDataMe.minavgPrice)
                              );
                          switch (
                              (t / e > 0.45 &&
                                  "US" != marketCode &&
                                  (cfg.datas.scaleType = "price"),
                                  t / e > 0.1 &&
                                  "newstock" == cfg.datas.scaleType &&
                                  (cfg.datas.scaleType = "price"),
                                  cfg.datas.scaleType)
                          ) {
                              case "newstock":
                                  (_stDataMe.minPrice = Number(e) - 0.45 * e),
                                  (_stDataMe.maxPrice = Number(e) + 0.45 * e);
                                  break;
                              case "tpct":
                                  (_stDataMe.minPrice =
                                      _stDataMe.minPrice < Number(e) - 0.1 * e ?
                                      _stDataMe.minPrice :
                                      Number(e) - 0.1 * e),
                                  (_stDataMe.maxPrice =
                                      _stDataMe.maxPrice > Number(e) + 0.1 * e ?
                                      _stDataMe.maxPrice :
                                      Number(e) + 0.1 * e);
                                  break;
                              case "pct":
                                  var i = _stDataMe.maxPrice - _stDataMe.minPrice;
                                  (_stDataMe.minPrice -= 0.05 * i),
                                  (_stDataMe.maxPrice += 0.05 * i);
                                  break;
                              case "price":
                              default:
                                  (_stDataMe.minPrice = Number(e) - Number(t)),
                                  (_stDataMe.maxPrice = Number(e) + Number(t)),
                                  (_stDataMe.minavgPrice = Number(e) - Number(a)),
                                  (_stDataMe.maxavgPrice = Number(e) + Number(a));
                          }
                          (_stDataMe.maxPercent = Math.max(
                              (_stDataMe.maxPrice - e) / e,
                              0
                          )),
                          (_stDataMe.minPercent = Math.min(
                              (_stDataMe.minPrice - e) / e,
                              0
                          )),
                          (_stDataMe.maxavgPercent = Math.max(
                              (_stDataMe.maxavgPrice - e) / e,
                              0
                          )),
                          (_stDataMe.minavgPercent = Math.min(
                              (_stDataMe.minavgPrice - e) / e,
                              0
                          ));
                      }
                      (_stDataMe.isCompare = view.getAllStock().length > 1),
                      (_stDataMe.dAdd = view.dAdd);
                      var t;
                      _stDataMe.datas &&
                          0 == _stDataMe.datas[0][0].volume &&
                          _stDataMe.hq.time > "09:30" &&
                          "CN" == _stDataMe.market &&
                          (t = _stDataMe.datas[0][0].price),
                          (_stDataMe.preData.data = _stDataMe.hq.preopen ?
                              t ?
                              t :
                              _stDataMe.hq.preopen :
                              _stDataMe.preData.data);
                      for (var a = 0, r = _stDataMe.datas.length; r > a; a++) {
                          for (
                              var n,
                                  o = Number(_stDataMe.datas[0][0].prevclose),
                                  s = 0,
                                  l = _stDataMe.dataLen; l > s; s++
                          ) {
                              if (
                                  ((n = _stDataMe.datas[a][s]),
                                      "LSE" === _stDataMe.market || "MSCI" === _stDataMe.market)
                              ) {
                                  if (n.price <= 0) continue;
                              } else if (n.price <= 0 || n.avg_price <= 0) continue;
                              ("HK" == _stDataMe.market &&
                                  _stDataMe.hq &&
                                  "indx" == _stDataMe.hq.type) ||
                              "LSE" == _stDataMe.market ||
                                  "MSCI" === _stDataMe.market ?
                                  ((_stDataMe.maxPrice = Math.max(
                                          _stDataMe.maxPrice,
                                          n.price,
                                          o
                                      )),
                                      (_stDataMe.minPrice = Math.min(
                                          _stDataMe.minPrice,
                                          n.price,
                                          o
                                      ))) :
                                  stbd(_stDataMe.datas[a][0].date, _stDataMe.hq.date) &&
                                  "CN" == _stDataMe.market ?
                                  ((_stDataMe.maxPrice = Math.max(
                                          _stDataMe.maxPrice,
                                          n.price,
                                          n.avg_price,
                                          o,
                                          _stDataMe.preData.data
                                      )),
                                      (_stDataMe.minPrice = Math.min(
                                          _stDataMe.minPrice,
                                          n.price,
                                          n.avg_price,
                                          o,
                                          _stDataMe.preData.data
                                      ))) :
                                  ((_stDataMe.maxPrice = Math.max(
                                          _stDataMe.maxPrice,
                                          n.price,
                                          n.avg_price,
                                          o
                                      )),
                                      (_stDataMe.minPrice = Math.min(
                                          _stDataMe.minPrice,
                                          n.price,
                                          n.avg_price,
                                          o
                                      ))),
                                  stbd(_stDataMe.datas[a][0].date, _stDataMe.hq.date) &&
                                  "CN" == _stDataMe.market ?
                                  ((_stDataMe.maxavgPrice = Math.max(
                                          _stDataMe.maxavgPrice,
                                          n.price,
                                          o,
                                          _stDataMe.preData.data
                                      )),
                                      (_stDataMe.minavgPrice = Math.min(
                                          _stDataMe.minavgPrice,
                                          n.price,
                                          o,
                                          _stDataMe.preData.data
                                      ))) :
                                  ((_stDataMe.maxavgPrice = Math.max(
                                          _stDataMe.maxavgPrice,
                                          n.price,
                                          o
                                      )),
                                      (_stDataMe.minavgPrice = Math.min(
                                          _stDataMe.minavgPrice,
                                          n.price,
                                          o
                                      ))),
                                  (_stDataMe.labelMaxVol = _stDataMe.maxVolume = Math.max(
                                      _stDataMe.maxVolume,
                                      0,
                                      n.volume
                                  ));
                          }
                          e(o);
                      }
                      (_stDataMe.minPrice < -1e8 ||
                          _stDataMe.maxPrice - _stDataMe.minPrice < 1e-6) &&
                      (dateUtil.stbd(_stDataMe.datas[0][0].date, _stDataMe.hq.date) &&
                          ((_stDataMe.datas[0][0].price = _stDataMe.hq.price),
                              (_stDataMe.datas[0][0].avg_price = _stDataMe.hq.price),
                              (_stDataMe.datas[0][0].prevclose = _stDataMe.hq.prevclose),
                              (_stDataMe.datas[0][0].volume = _stDataMe.hq.totalVolume)),
                          (_stDataMe.minPrice = o - 0.01 * o),
                          (_stDataMe.maxPrice = o + 0.01 * o),
                          (_stDataMe.maxPercent = 0.01),
                          (_stDataMe.minPercent = -0.01),
                          _stDataMe.hq.totalVolume > 0 &&
                          dateUtil.stbd(
                              _stDataMe.datas[0][0].date,
                              _stDataMe.hq.date
                          ) &&
                          !isNaN(_stDataMe.hq.totalAmount) &&
                          (_stDataMe.datas[0][0].volume =
                              _stDataMe.hq.totalAmount / _stDataMe.hq.totalVolume));
                      var c = g(_stDataMe.maxVolume, 0, 0, !0);
                      _stDataMe.labelMaxVol = c[0];
                      var d = 0.005;
                      _stDataMe.maxPercent < d &&
                          ("US" !== _stDataMe.market || "LSE" !== _stDataMe.market) &&
                          "pct" !== cfg.datas.scaleType &&
                          ((_stDataMe.minPrice = _stDataMe.maxavgPrice = o - o * d),
                              (_stDataMe.maxPrice = _stDataMe.minavgPrice = o + o * d),
                              (_stDataMe.maxPercent = _stDataMe.maxavgPercent = d),
                              (_stDataMe.minPercent = _stDataMe.minavgPercent = -d));
                      var p;
                      /^s[hz]51\d{4}$/.test(viewManangerConfig.symbol) && (p = "fund"),
                          p &&
                          "fund" === p &&
                          "pct" !== cfg.datas.scaleType &&
                          d > Math.abs(_stDataMe.minPercent) &&
                          ((d = Math.abs(_stDataMe.minPercent)),
                              (viewManangerConfig.nfloat = _stDataMe.nfloat = 3)),
                          ("gb_brk$a" === _stDataMe.symbol ||
                              "usr_brk$a" === _stDataMe.symbol) &&
                          (viewManangerConfig.nfloat = _stDataMe.nfloat = 1);
                  };
                  var createPlayingData = function() {
                      var e,
                          t,
                          a,
                          i = cfg.DIMENSION.h_t,
                          r = i * cfg.DIMENSION.P_HV,
                          n = i * (1 - cfg.DIMENSION.P_HV);
                      (t = _stDataMe.labelMinP), (a = _stDataMe.labelMaxP);
                      var o,
                          s = _stDataMe.labelMaxVol;
                      if (_stDataMe.datas) {
                          var l = _stDataMe.datas.length;
                          for (e = 0; l > e; e++) {
                              o = _stDataMe.datas[0][0].prevclose;
                              for (
                                  var c,
                                      d = cfg.custom.show_underlay_vol,
                                      h = _stDataMe.isCompare ? "ppp" : "pp",
                                      u = _stDataMe.dataLen,
                                      v = 0; u > v; v++
                              ) {
                                  if (((c = _stDataMe.datas[e][v]), !c)) return;
                                  c.price <= 0 &&
                                      _stDataMe.realLen >= v &&
                                      v > 0 &&
                                      ((c.price = _stDataMe.hq.price),
                                          (c.avg_price = _stDataMe.datas[e][v - 1].avg_price),
                                          (c.volume = 0)),
                                      (c.change = c.price - o),
                                      (c.percent = c.change / o),
                                      (c.py = xh5_PosUtil[h](c.price, t, a, i, o)),
                                      (c.ay = xh5_PosUtil[h](c.avg_price, t, a, i, o)),
                                      d && (c.vy = xh5_PosUtil.vp(c.volume, s, r) + n);
                              }
                          }
                          _stDataMe.preData.vPos =
                              "CN" == _stDataMe.market &&
                              1 == l &&
                              stbd(_stDataMe.hq.date, _stDataMe.datas[0][0].date) ?
                              xh5_PosUtil[h](_stDataMe.preData.data, t, a, i, o) :
                              null;
                      }
                  };
                  this.createPlayingData = createPlayingData;
                  this.extValues = function() {
                      set_stDataMeDefaultVal(), t();
                  };
                  this.setDataRange = function(a) {
                      var i = _stData_tDb_obj.get();
                      if (i) {
                          viewState.dataLength = i.length;
                          var r = viewState.start,
                              n = viewState.end;
                          isNaN(r) || isNaN(n) ?
                              ((n = _stData_tDb_obj.get("tb") || 5),
                                  (r = _stData_tDb_obj.get("tv") || 4),
                                  (viewState.start = r),
                                  (viewState.end = n)) :
                              (a && n + 1 > i.length && (viewState.end = n = i.length),
                                  _stData_tDb_obj.set("tv", r),
                                  _stData_tDb_obj.set("tb", n));
                          var o = [],
                              s = [];
                          if (i.length < 2)(s = i), o.push(i);
                          else
                              for (var l = r; n > l; l++)
                                  (s = s.concat(i[l])), o.push(i[l]);
                          (_stDataMe.datas = o),
                          (_stDataMe.lineDatas = s),
                          (_stDataMe.dataLen = o[0].length),
                          set_stDataMeDefaultVal(),
                              t();
                      }
                  };
              })();
              //_stData_$_obj

              var K = {},
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
                          switch (marketCode) {
                              case "HF":
                                  d = utils_util.tUtil.gata(marketCode, _hf_window_var.time);
                                  break;
                              case "NF":
                                  d = utils_util.tUtil.gata(marketCode, _nf_window_var.time);
                                  break;
                              case "global_index":
                                  d = utils_util.tUtil.gata(marketCode, _gbi_window_var.time);
                                  break;
                              default:
                                  d = utils_util.tUtil.gata(marketCode);
                          }
                      e.index = utils_util.arrIndexOf(d, e.time);
                      var a = e.index;
                      switch (_stDataMe.market) {
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
                                      "NF" == _stDataMe.market &&
                                      ("21:00" == _nf_window_var.time[0][0] ?
                                          e.time < "09:00" &&
                                          e.time >= "02:30" &&
                                          (a = utils_util.arrIndexOf(d, "09:00")) :
                                          e.time <= _nf_window_var.time[0][0] &&
                                          (a = utils_util.arrIndexOf(
                                              d,
                                              _nf_window_var.time[0][0]
                                          ))));
                              break;
                          case "HK":
                              e.time >= "12:00" && e.time < "13:00" && (a = 150),
                                  e.time >= "16:00" && e.time < "16:10" && (a = d.length - 1);
                              break;
                          case "HF":
                              "hf_CHA50CFD" == _stDataMe.symbol &&
                                  e.time > "16:35" &&
                                  e.time < "17:00" &&
                                  (a = 455);
                      }
                      if (
                          ((e.index = a),
                              (_stDataMe.realLen = a),
                              (_stDataMe.hq.open == _stDataMe.hq.prevclose &&
                                  _stDataMe.hq.high == _stDataMe.hq.prevclose &&
                                  _stDataMe.hq.low == _stDataMe.hq.prevclose &&
                                  0 > a) ||
                              _stDataMe.hq.time < "09:30")
                      )
                          switch (_stDataMe.market) {
                              case "CN":
                                  _stDataMe.realLen =
                                      _stDataMe.hq.time >= "15:00" ? tDataLen - 1 : 0;
                                  break;
                              case "REPO":
                                  _stDataMe.realLen =
                                      _stDataMe.hq.time >= "15:30" ? tDataLen - 1 : 0;
                                  break;
                              case "NF":
                              case "HF":
                              case "global_index":
                              case "LSE":
                              case "GOODS":
                              case "MSCI":
                                  break;
                              default:
                                  _stDataMe.realLen = 0;
                          }
                  }
              //
              var de = function(e, t) {
                  var a = e.getTime(),
                      i = t.getTime();
                  return Math.floor((a - i) / 864e5) > 5;
              }
              var _stData_me_obj = new(function() {
                  var a,
                      n = !0,
                      o = function(e) {
                          var a;
                          switch (marketCode) {
                              case "HF":
                                  a = _hf_window_var.time;
                                  break;
                              case "NF":
                                  a = _nf_window_var.time;
                                  break;
                              case "global_index":
                                  a = _gbi_window_var.time;
                                  break;
                              default:
                                  a = [];
                          }
                          var i = utils_util.tUtil.gltbt(
                              1,
                              e.price,
                              !0,
                              _stDataMe.needMarket,
                              [e.date],
                              a
                          );
                          "NF" == marketCode && e.time >= "21:00" ?
                              ((i[0].date = dateUtil.dd(e.date)),
                                  i[0].date.setDate(e.date.getDate() + 1)) :
                              (i[0].date = dateUtil.dd(e.date)),
                              (i[0].prevclose = e.price),
                              (i[0].price = e.price),
                              (i[0].volume = 0);
                          for (
                              var r = 0,
                                  n = 0,
                                  o = _stData_tDb_obj.get(),
                                  s = 0,
                                  l = o.length; l > s; s++
                          )
                              o[s][0].totalVolume &&
                              ((n += Number(o[s][0].totalVolume)), r++);
                          (i[0].lastfive = n / r / 390 || 0),
                          stbd(o[4][0].date, e.date) ?
                              "NF" == marketCode && e.time >= "21:00" ?
                              (o.shift(), o.push(i)) :
                              (o[4] = i) :
                              (o.shift(), o.push(i)),
                              _stData_tDb_obj.initTState(o),
                              (_stDataMe.datas = [o[4]]),
                              (_stDataMe.date = dateUtil.ds(e.date)),
                              (_stDataMe.realLen = 0);
                      },
                      s = 0,
                      l = function(e, a, l) {
                          function c() {
                              switch (
                                  (o(_stDataMe.hq),
                                      onViewChange(),
                                      _stData_$_obj.createPlayingData(),
                                      _stDataMe.market)
                              ) {
                                  case "US":
                                      _stData_$_obj.extValues();
                                      break;
                                  case "NF":
                                      _nf_window_var.inited = 1;
                              }
                              utils_util.isFunc(a) && a();
                          }

                          function p() {
                              var e = new Date().getTime() - curTime;
                              return !isNaN(t_rate) &&
                                  t_rate > 0 &&
                                  e >= 1e3 * Number(t_rate) &&
                                  0 != _stDataMe.realLen &&
                                  _stDataMe.hq.isUpdateTime ?
                                  ((curTime = new Date().getTime()),
                                      g(b, _stDataMe.hq, a),
                                      !0) :
                                  !1;
                          }

                          function h() {
                              function i() {
                                  stbd(_stDataMe.hq.date, y[4][0].date) &&
                                      _stDataMe.hq.time > "16:00" &&
                                      o.price < 0 &&
                                      ((o.price = _stDataMe.hq.price),
                                          (o.avg_price = y[4][y[4].length - 2].avg_price),
                                          (o.volume = 0));
                              }

                              function n() {
                                  stbd(_stDataMe.hq.date, y[4][0].date) &&
                                      _stDataMe.hq.time > "16:00" &&
                                      ((o.price = _stDataMe.hq.price),
                                          (o.avg_price = y[4][y[4].length - 2].avg_price),
                                          (o.volume = 0),
                                          (o.time = _stDataMe.hq.time),
                                          o.avg_price < 0 && (o.avg_price = _stDataMe.hq.price));
                              }
                              if (!_stDataMe.hq.isUpdateTime) {
                                  var o = y[4][y[4].length - 1];
                                  switch (_stDataMe.market) {
                                      case "US":
                                          i();
                                          break;
                                      case "HK":
                                          n();
                                  }
                                  return (
                                      ce(_stDataMe.hq),
                                      onViewChange(!0),
                                      _stData_$_obj.createPlayingData(),
                                      utils_util.isFunc(a) && a(),
                                      !0
                                  );
                              }
                              return (
                                  "HK" == _stDataMe.market && l && g(b, e, a),
                                  (_stDataMe.date =
                                      "NF" == _stDataMe.market && _stDataMe.hq.time >= "21:00" ?
                                      dateUtil.ds(y[4][0].date) :
                                      _stDataMe.hq.today),
                                  !1
                              );
                          }
                          var b,
                              y = _stData_tDb_obj.get();
                          switch (_stDataMe.needMarket) {
                              case "HF":
                                  d = utils_util.tUtil.gata(
                                      _stDataMe.needMarket,
                                      _hf_window_var.time
                                  );
                                  break;
                              case "NF":
                                  d = utils_util.tUtil.gata(
                                      _stDataMe.needMarket,
                                      _nf_window_var.time
                                  );
                                  break;
                              case "global_index":
                                  d = utils_util.tUtil.gata(
                                      _stDataMe.needMarket,
                                      _gbi_window_var.time
                                  );
                                  break;
                              default:
                                  d = utils_util.tUtil.gata(_stDataMe.needMarket);
                          }
                          if (
                              e &&
                              e.date &&
                              _stDataMe.datas &&
                              !viewManangerConfig.date
                          ) {
                              if (((n = !1), (b = y[4]), _stDataMe.hq.isDateChange)) {
                                  if (
                                      ("NF" == _stDataMe.market &&
                                          _nf_window_var &&
                                          _nf_window_var.time[0][0] < "21:00") ||
                                      "NF" != _stDataMe.market
                                  )
                                      return void c();
                              } else if (
                                  ("CN" == _stDataMe.market &&
                                      !stbd(_stDataMe.hq.date, y[4][0].date) &&
                                      _stDataMe.hq.time < "09:05") ||
                                  ("NF" == _stDataMe.market &&
                                      stbd(_stDataMe.hq.date, y[4][0].date) &&
                                      _nf_window_var &&
                                      "21:00" == _nf_window_var.time[0][0] &&
                                      _stDataMe.hq.time >= _nf_window_var.time[0][0]) ||
                                  ("HF" == _stDataMe.market &&
                                      !stbd(_stDataMe.hq.date, y[4][0].date) &&
                                      0 != _stDataMe.hq.date.getDay() &&
                                      6 != _stDataMe.hq.date.getDay() &&
                                      _stDataMe.hq.time >= _hf_window_var.time[0][0])
                              )
                                  return void c();
                              if (!p() && !h()) {
                                  if (
                                      (_stDataMe.datas && (K = y[4][0]),
                                          de(e.date, y[4][0].date))
                                  )
                                      return void(_stDataMe.realLen = tDataLen);
                                  (L = e.name || ""), (_stDataMe.hq = e);
                                  var _ =
                                      e.date.getHours() < 10 ?
                                      "0" + e.date.getHours() :
                                      e.date.getHours();
                                  if (
                                      ((_stDataMe.time =
                                              _ + ":" + utils_util.strUtil.zp(e.date.getMinutes())),
                                          0 == e.index && u(b, e),
                                          utils_util.arrIndexOf(d, _stDataMe.time) &&
                                          e.index > 0 &&
                                          (utils_util.arrIndexOf(d, _stDataMe.time) -
                                              _stDataMe.realLen <=
                                              1 ?
                                              u(b, e) :
                                              g(b, e, a),
                                              1 == e.index && 0 == s))
                                  )
                                      return (s = 1), void g(b, e, a);
                                  R(_stDataMe.market) &&
                                      ((_stDataMe.hq.open == _stDataMe.hq.prevclose &&
                                              _stDataMe.hq.high == _stDataMe.hq.prevclose &&
                                              _stDataMe.hq.low == _stDataMe.hq.prevclose &&
                                              _stDataMe.hq.index < 0) ||
                                          e.time < "09:30") &&
                                      ("CN" == _stDataMe.market ?
                                          ((b[0].avg_price = e.price),
                                              (b[0].volume = e.totalVolume)) :
                                          "option_cn" == _stDataMe.market ?
                                          ((b[0].inventory = e.position || e.holdingAmount),
                                              (b[0].holdPosition = e.position || e.holdingAmount)) :
                                          "HK" == _stDataMe.market &&
                                          (b[0].avg_price =
                                              e.totalAmount / e.totalVolume || e.price)),
                                      5 == viewState.end &&
                                      (onViewChange(!0), _stData_$_obj.createPlayingData()),
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
                          var r = i[_stDataMe.realLen];
                          r &&
                              (K && !a ?
                                  (B ?
                                      ((t.volume = c =
                                              t.totalVolume - (K.totalVolume || 0)),
                                          (t.amount = p = t.volume * t.price),
                                          (t.totalAmount = t.amount + K.totalAmount),
                                          (t.avg_price = h =
                                              t.totalAmount / t.totalVolume || t.price)) :
                                      ((t.volume = 0),
                                          (t.avg_price = h =
                                              K.totalAmount / K.totalVolume || t.price),
                                          (t.totalAmount = t.totalVolume * t.avg_price),
                                          (B = !0)),
                                      (K.totalVolume = t.totalVolume),
                                      (K.totalAmount = t.totalAmount)) :
                                  (ae ?
                                      (t.volume = t.totalVolume - ie.totalVolume || 0) :
                                      ((t.volume = 0), (ae = !0)),
                                      (ie.totalVolume = t.totalVolume)),
                                  ("option_cn" == _stDataMe.market ||
                                      "NF" == _stDataMe.market) &&
                                  ((r.inventory = t.position || t.holdingAmount),
                                      (r.holdPosition = t.position || t.holdingAmount)),
                                  "CN" == _stDataMe.market ?
                                  (r.avg_price = t.avg_price || r.price) :
                                  (t.index > 1 ?
                                      (r.avg_price =
                                          (r.avg_price > 0 && r.avg_price) ||
                                          (i[t.index - 1].avg_price * t.index + t.price) /
                                          (t.index + 1) ||
                                          r.price) :
                                      "fund" == _stDataMe.market ||
                                      (r.avg_price = r.price || t.price),
                                      0 == t.index &&
                                      (r.avg_price =
                                          t.totalAmount / t.totalVolume || t.price),
                                      (r.volume = r.volume || 0)),
                                  isNaN(t.volume) && (t.volume = 0),
                                  "HK" != _stDataMe.market &&
                                  "NF" != _stDataMe.market &&
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
                              dataformatter: stdDataOptions.datas.t1.dataformatter,
                              ssl: viewManangerConfig.ssl,
                              assisthq: viewManangerConfig.assisthq
                          };
                          (B = ae = !1),
                          "LSE" == _stDataMe.market &&
                              (s.symbol = viewManangerConfig.rawsymbol),
                              KKE.api("datas.t.get", s, function(e) {
                                  (a = e.data.td1), ce(_stDataMe.hq);
                                  var i = _stData_tDb_obj.get();
                                  ("NF" == _stDataMe.market &&
                                      ("21:00" == _nf_window_var.time[0][0] &&
                                          _stDataMe.hq.time >= _nf_window_var.time[0][0] &&
                                          0 != _stDataMe.hq.date.getDay() &&
                                          6 != _stDataMe.hq.date.getDay() &&
                                          (a[0].date = i[4][0].date),
                                          ("09:30" == _nf_window_var.time[0][0] ||
                                              "09:15" == _nf_window_var.time[0][0]) &&
                                          stbd(i[4][0].date, _stDataMe.hq.date) &&
                                          _stDataMe.hq.time <= _nf_window_var.time[0][0])) ||
                                  ("HF" == _stDataMe.market &&
                                      _stDataMe.hq.time > _hf_window_var.time[0][0] &&
                                      0 != _stDataMe.hq.date.getDay() &&
                                      6 != _stDataMe.hq.date.getDay() &&
                                      (a[0].date = _stDataMe.hq.date),
                                      (i[4] = a),
                                      _stData_tDb_obj.initTState(i),
                                      "CN" == _stDataMe.market &&
                                      "HK" == _stDataMe.needMarket &&
                                      ((_stDataMe.needMarket = "CN"),
                                          view.changeData(_stDataMe)),
                                      5 == viewState.end &&
                                      (onViewChange(!0), _stData_$_obj.createPlayingData()),
                                      utils_util.isFunc(o) && o());
                              });
                      },
                      updateT5Data = function(a, r, n) {
                          var o = {
                              symbol: r.symbol,
                              date: r.today,
                              withT5: 1,
                              dist5: 1,
                              withI: !1,
                              faker: "",
                              dataformatter: stdDataOptions.datas.t1.dataformatter,
                              ssl: viewManangerConfig.ssl
                          };
                          (B = ae = !1),
                          "LSE" == _stDataMe.market &&
                              (o.symbol = viewManangerConfig.rawsymbol),
                              KKE.api("datas.t.get", o, function(e) {
                                  (a = e.data.td1),
                                  _stData_tDb_obj.initTState(e.data.td5),
                                      ce(_stDataMe.hq),
                                      utils_util.isFunc(n) && n(),
                                      view.moving(viewState.start, viewState.end, "T5"),
                                      J.hide();
                              });
                      };
                  (this.updateT5Data = updateT5Data),
                  (this.update = function(a, r, o, s, c) {
                      var apiname,
                          apiOptions,
                          p,
                          h = "",
                          u = "";
                      (p = s ? s : utils_util.market(stdDataOptions.symbol)),
                      "US" === p
                          ?
                          (h = 1 === viewManangerConfig.assisthq ? ",gb_ixic" : u) :
                          "HK" === p &&
                          (h = 1 === viewManangerConfig.assisthq ? ",rt_hkHSI" : u),
                          o ?
                          ((apiname = "datas.hq.parse"),
                              (apiOptions = {
                                  symbol: stdDataOptions.symbol + h,
                                  hqStr: o,
                                  market: p,
                                  ssl: viewManangerConfig.ssl
                              })) :
                          ((apiname = "datas.hq.get"),
                              (apiOptions = {
                                  symbol: stdDataOptions.symbol + h,
                                  delay: !0,
                                  cancelEtag: n,
                                  ssl: viewManangerConfig.ssl
                              })),
                          KKE.api(apiname, apiOptions, function(t) {
                              l(t.dataObj[stdDataOptions.symbol], a, c);
                          });
                  });
              })();
              //_stData_me_obj
              var pe = new(function() {
                  var r = void 0,
                      o = 1,
                      s = function(e) {
                          o > 2 ||
                              (chart_h5tObj.re(globalCfg.e.T_DATA_LOADED),
                                  utils_util.isFunc(e) && e(),
                                  o++);
                      },
                      l = function(e) {
                          var t = e,
                              a = !1;
                          return (a =
                              t.open == t.prevclose &&
                              t.high == t.prevclose &&
                              t.low == t.prevclose &&
                              t.index < 0 ?
                              !0 :
                              t.time < "09:30");
                      },
                      c = function(a, i) {
                          var r,
                              n,
                              o = a;
                          switch (marketCode) {
                              case "HF":
                                  n = _hf_window_var.time;
                                  break;
                              case "NF":
                                  n = _nf_window_var.time;
                                  break;
                              case "global_index":
                                  n = _gbi_window_var.time;
                                  break;
                              default:
                                  n = [];
                          }
                          var s = utils_util.tUtil.gltbt(
                              1,
                              o.hq.price,
                              !0,
                              _stDataMe.market,
                              [o.hq.date],
                              n
                          );
                          return (
                              (s[0].name = o.hq.name),
                              (s[0].symbol = stdDataOptions.symbol),
                              (s[0].today = utils_util.dateUtil.ds(o.hq.date, "-")),
                              (r = i),
                              (r[4] = s),
                              (_stDataMe.realLen = 0),
                              r
                          );
                      };
                  this.initData = function(o) {
                      var p = viewState.viewId;
                      if (r != p) {
                          (r = p),
                          null != _stDataMe.datas &&
                              _stData_tDb_obj.initTState(p, _stDataMe.tDb.get());
                          var h = {
                              assisthq: viewManangerConfig.assisthq,
                              ssl: viewManangerConfig.ssl,
                              symbol: stdDataOptions.symbol,
                              date: viewManangerConfig.date,
                              withT5: 1,
                              dist5: viewManangerConfig.dist5,
                              withI: !0,
                              faker: _stDataMe.needMarket,
                              dataformatter: stdDataOptions.datas.t1.dataformatter
                          };
                          switch (_stDataMe.needMarket) {
                              case "HF":
                                  d = utils_util.tUtil.gata(
                                      _stDataMe.needMarket,
                                      _hf_window_var.time
                                  );
                                  break;
                              case "NF":
                                  d = utils_util.tUtil.gata(
                                      _stDataMe.needMarket,
                                      _nf_window_var.time
                                  );
                                  break;
                              case "global_index":
                                  d = utils_util.tUtil.gata(
                                      _stDataMe.needMarket,
                                      _gbi_window_var.time
                                  );
                                  break;
                              case "LSE":
                                  h.symbol = viewManangerConfig.rawsymbol;
                              default:
                                  d = utils_util.tUtil.gata(_stDataMe.needMarket);
                          }
                          J.show(),
                              KKE.api("datas.t.get", h, function(e) {
                                  view.hasHistory && "history" == e.msg && view.hasHistory(M);
                                  var d = e.data.hq.status,
                                      p = "",
                                      u = Number(e.data.hq.state);
                                  if ("empty" == e.msg)
                                      switch (_stDataMe.market) {
                                          case "CN":
                                              3 == d &&
                                                  ((p = globalCfg.delisted),
                                                      tipObj.showTip({
                                                          txt: p,
                                                          parent: V,
                                                          noBtn: !0
                                                      }));
                                      }
                                  if ("error" == e.msg || "nohistory" == e.msg) {
                                      if (
                                          (isMain &&
                                              "nohistory" == e.msg &&
                                              ((M = 0),
                                                  view.hasHistory && view.hasHistory(M),
                                                  tipObj.showTip({
                                                      txt: globalCfg.nohistoryt,
                                                      parent: V,
                                                      noBtn: !0
                                                  })),
                                              (_stDataMe.isErr = !0),
                                              isMain && e.data && e.data.hq)
                                      ) {
                                          if (d)
                                              switch (_stDataMe.market) {
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
                                                      tipObj.showTip({
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
                                                  ((v = new utils_util.TipM(cfg.COLOR)),
                                                      v.genTip(g));
                                          }
                                      }
                                      if (0 != u && 7 != u) {
                                          if ((view.onResize(), 1 != d))
                                              return void view.removeCompare([h.symbol]);
                                          _stDataMe.isErr = !1;
                                      } else _stDataMe.isErr = !1;
                                  }
                                  (_stDataMe.hq = e.data.hq),
                                  (r = void 0),
                                  (h.td1 = e.data.td1);
                                  var b;
                                  curDate = new Date();
                                  var y = 60 * curDate.getTimezoneOffset() * 1e3;
                                  if (
                                      (curDate.setTime(curDate.getTime() + y),
                                          curDate.setHours(curDate.getHours() + 8),
                                          (L = _stDataMe.hq.name || ""),
                                          ce(_stDataMe.hq),
                                          l(_stDataMe.hq, e.data.td5) && R(_stDataMe.market) ?
                                          "history" == e.msg ?
                                          ((b = e.data.td5),
                                              b[4][0].date || (b[4][0].date = _stDataMe.hq.date)) :
                                          (b = c(_stDataMe, e.data.td5)) :
                                          ((b = e.data.td5),
                                              "NF" != _stDataMe.market ||
                                              !_nf_window_var ||
                                              ("09:30" != _nf_window_var.time[0][0] &&
                                                  "09:15" != _nf_window_var.time[0][0]) ||
                                              (stbd(b[4][0].date, _stDataMe.hq.date) &&
                                                  _stDataMe.hq.time <= _nf_window_var.time[0][0] &&
                                                  (b = c(_stDataMe, e.data.td5))),
                                              b &&
                                              !b[4][0].date &&
                                              (b[4][0].date = _stDataMe.hq.date)),
                                          (view.historyData = b),
                                          (_stDataMe.date =
                                              (e.data.td1 && e.data.td1[0].today) ||
                                              _stDataMe.hq.date),
                                          _stData_tDb_obj.initTState(b),
                                          s(o),
                                          1 == O &&
                                          (viewHelper.dateTo(
                                                  viewManangerConfig.historytime,
                                                  viewManangerConfig.historycb
                                              ),
                                              (O = 0)),
                                          J.hide(),
                                          viewManangerConfig.loadedChart)
                                  )
                                      if (utils_util.isFunc(viewManangerConfig.loadedChart))
                                          viewManangerConfig.loadedChart();
                                      else if (window[viewManangerConfig.loadedChart])
                                      window[viewManangerConfig.loadedChart]();
                                  else
                                      try {
                                          window.h5chart.loadedChart();
                                      } catch (_) {}
                              });
                      }
                  };
              })();
              //
              (this.tDb = _stData_tDb_obj),
              (this.initData = pe.initData),
              (this.initT5Data = _stData_me_obj.updateT5Data),
              (this.doUpdate = _stData_me_obj.update),
              (this.onViewChange = onViewChange),
              (this.setPricePos = function(e, t) {
                  (_stDataMe.labelMaxP = e[0]),
                  (_stDataMe.labelMinP = e[1]),
                  (_stDataMe.labelPriceCount = e[2]),
                  (_stDataMe.isCompare = t),
                  _stData_$_obj.createPlayingData(),
                      k && k.setPricePos(e);
              }),
              (this.setRange = function() {
                  _stData_$_obj.setDataRange(),
                      _stData_tChartObj && _stData_tChartObj.setDataRange(),
                      k && k.setDataRange(),
                      D && D.setDataRange();
              }),
              (this.draw = function() {
                  stockUI.draw(),
                      _stData_tChartObj && _stData_tChartObj.allDraw(),
                      k && k.allDraw();
              }),
              (this.resize = function(e) {
                  _stData_$_obj.createPlayingData(),
                      stockUI.resize(),
                      _stData_tChartObj && _stData_tChartObj.onResize(e),
                      k && k.onResize(),
                      D && D.onResize();
              }),
              (this.clear = function() {
                  stockUI.clear(),
                      _stData_tChartObj &&
                      (_stData_tChartObj.clear(), (_stData_tChartObj = null)),
                      k && (k.clear(), (k = null)),
                      D && (D.clear(), (D = null)),
                      isMain && (Q = null);
              }),
              (this.getPriceTech = function() {
                  return k || null;
              }),
              (this.removePt = function(e) {
                  if (e) {
                      !utils_util.isArr(e) && (e = [e]);
                      for (var a = e.length; a--;)
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
                      view.onChangeView(),
                      a && utils_util.isFunc(a.callback) && a.callback(),
                      i && ne.onTechChanged(i[0]);
              };
              (this.initPt = function(e, r) {
                  if (e) {
                      !utils_util.isArr(e) && (e = [e]);
                      for (var n = e.length; n--;)
                          if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                              e.splice(n, 1), (cfg.custom.show_underlay_vol = !0);
                              break;
                          }
                      k ||
                          ((k = new pChart({
                                  iMgr: iMgr,
                                  stockData: _stDataMe,
                                  chartArea: G,
                                  titleArea: z,
                                  cb: he,
                                  type: "t",
                                  cfg: cfg,
                                  usrObj: viewManangerConfig
                              })),
                              isMain && (Z = k)),
                          k.createChart(e, r);
                  }
              }),
              (this.initTc = function(chartlist, options) {
                  _stData_tChartObj ||
                      ((_stData_tChartObj = new tChart({
                              stockData: _stDataMe,
                              iMgr: iMgr,
                              subArea: subArea,
                              cb: he,
                              cfg: cfg,
                              type: "option_cn" == marketCode ? "p" : "t",
                              usrObj: viewManangerConfig,
                              initMgr: initMgr
                          })),
                          isMain && (Y = _stData_tChartObj)),
                      _stData_tChartObj.createChart(chartlist, options);
              }),
              (this.removeTc = function(e) {
                  _stData_tChartObj && _stData_tChartObj.removeChart(e);
              }),
              (this.initRs = function() {
                  D ||
                      ((D = new o({
                              stockData: _stDataMe,
                              setting: cfg,
                              state: viewState,
                              rc: view.moving,
                              witht5: 1
                          })),
                          (Q = D)),
                      D.linkData();
              }),
              (this.setTLineStyle = stockUI.setTLineStyle),
              c();
          }

          //end STDATA

          function StockUI(stockData, options) {
              function n() {
                  var r = stockData.isMain;
                  if (r)(l = cfg.COLOR.T_P), (c = cfg.COLOR.T_AVG);
                  else {
                      2 != view.dAdd ||
                          o.linecolor ||
                          (o.linecolor = viewManangerConfig.overlaycolor);
                      var n = o.linecolor || "#cccccc";
                      l = n.K_N || n.T_N || "#" + utils_util.randomColor();
                  }
                  s = new utils_painter.xh5_ibPainter({
                      setting: cfg,
                      sd: stockData,
                      withHBg: r,
                      ctn: K,
                      iMgr: iMgr,
                      reO: {
                          mh: cfg.DIMENSION.H_MA4K
                      },
                      iTo: function(t, a, i, r) {
                          if (
                              (!fCONTAINS(t, iMgr.iHLineO.body) &&
                                  t.appendChild(iMgr.iHLineO.body),
                                  stockData && stockData.datas)
                          ) {
                              var n,
                                  o,
                                  s = stockData.datas[0][0].prevclose;
                              2 == stockData.dAdd ?
                                  (n =
                                      stockData.labelMaxP * s +
                                      s -
                                      (i / cfg.DIMENSION.h_t) *
                                      (stockData.labelMaxP * s +
                                          s -
                                          (stockData.labelMinP * s + s))) :
                                  ((n =
                                          stockData.labelMaxP -
                                          (i / cfg.DIMENSION.h_t) *
                                          (stockData.labelMaxP - stockData.labelMinP)),
                                      (o = Number((100 * (n - s)) / s).toFixed(2) + "%")),
                                  iMgr.iToD({
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
                  setTLineStyle = function(e) {
                      o = copyProperties({
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
                  draw = function() {
                      function a() {
                          if (stockData.isMain && cfg.custom.show_underlay_vol) {
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
                              (!stockData.isCompare ||
                                  (2 == stockData.dAdd && stockData.isMain)) &&
                              !(
                                  ("HK" == stockData.market &&
                                      stockData.hq &&
                                      "indx" == stockData.hq.type) ||
                                  "US" === stockData.market ||
                                  "LSE" === stockData.market ||
                                  "MSCI" === stockData.market
                              )
                          ) {
                              for (
                                  M = T * (0.5 + D), s.newStyle(c, !0, v), k = D; N > k && ((S = y[k]), !(S.price <= 0)); k++
                              ) {
                                  if (5 == viewState.end && "CN" == stockData.market && Z)
                                      for (var t = Z.getLog(), a = 0; a < t.length; a++)
                                          if (
                                              "EWI" == t[a].name &&
                                              k > (N / tDataLen - 1) * tDataLen
                                          )
                                              return void s.stroke();
                                  k == D || k % tDataLen == 0 ?
                                      s.moveTo(M, y[k].ay) :
                                      s.lineTo(M, y[k].ay),
                                      (M += T);
                              }
                              s.stroke();
                          }
                      }

                      function n() {
                          s.newStyle(l, !0, v),
                              (M = T * (0.5 + D)),
                              "CN" == stockData.market &&
                              stockData.preData.vPos &&
                              (0 == stockData.realLen && stockData.hq ?
                                  stockData.hq.time > "09:29" ?
                                  (s.moveTo(0, stockData.preData.vPos),
                                      y[0].py || (y[0].py = stockData.preData.vPos),
                                      s.lineTo(M, y[0].py)) :
                                  s.drawDot(M, stockData.preData.vPos, 1) :
                                  (s.moveTo(0, stockData.preData.vPos),
                                      y[0].py || (y[0].py = stockData.preData.vPos),
                                      s.lineTo(M, y[0].py)),
                                  s.stroke());
                      }

                      function m() {
                          var e;
                          for (k = D; N > k && ((S = y[k]), !(S.price <= 0)); k++)
                              (e = S.py),
                              k == D || k % tDataLen == 0 ?
                              s.moveTo(M, e) :
                              k % viewManangerConfig.modulo == 0 && s.lineTo(M, e),
                              (S.ix = M),
                              (M += T);
                          (O = M),
                          (L = e),
                          s.stroke(),
                              viewManangerConfig.business &&
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
                          if (w && !stockData.isCompare)
                              if (stockData.datas.length < 2)(M -= T), t();
                              else {
                                  M = 0.5 * T;
                                  var a;
                                  for (
                                      s.newStyle(l, !0, v), k = 0; N > k && ((S = y[k]), !(S.price <= 0)); k++
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
                              stockData.isCompare &&
                              stockData.isMain &&
                              "pct" === cfg.datas.scaleType ?
                              xh5_PosUtil.pp(
                                  0,
                                  stockData.labelMinP,
                                  stockData.labelMaxP,
                                  cfg.DIMENSION.h_t
                              ) :
                              xh5_PosUtil.pp(
                                  stockData.datas[0][0].prevclose,
                                  stockData.minPrice,
                                  stockData.maxPrice,
                                  cfg.DIMENSION.h_t
                              ),
                              t = ~~(t + 0.5),
                              t -= 0.5; a < cfg.DIMENSION.w_t;

                          )
                              s.moveTo(a, t), (a += r), s.lineTo(a, t), (a += r);
                          if (
                              (stockData.isMain && s.stroke(), viewManangerConfig.business)
                          ) {
                              var n = stockData.hq.price.toFixed(2),
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
                          stockData.isMain && s.drawBg("T");
                          var y = [];
                          if (stockData.datas) {
                              for (var _ = 0; _ < stockData.datas.length; _++)
                                  y = y.concat(stockData.datas[_]);
                              var N = y.length;
                              if (y) {
                                  var k,
                                      S,
                                      D,
                                      w = o.linetype && 0 == o.linetype.indexOf("mountain"),
                                      x = stockData.datas.length * tDataLen,
                                      T = cfg.DIMENSION.w_t / Math.max(x, cfg.PARAM.minCandleNum),
                                      I = 0.5 * T,
                                      M = 0;
                                  stockData.isTotalRedraw ?
                                      ((D = 0), s.clear(!0, cfg.PARAM.getHd())) :
                                      ((D = x - 2),
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
                                      "sh000012" != stockData.symbol &&
                                      "sh000013" != stockData.symbol &&
                                      (viewManangerConfig.business ||
                                          viewManangerConfig.simple ||
                                          utils_util.isRepos(stockData.symbol) ||
                                          r()),
                                      n(),
                                      m(),
                                      u(),
                                      f();
                              }
                          }
                      }
                  };
              (this.draw = draw),
              (this.clear = function() {
                  s.remove(), (s = null);
              }),
              (this.resize = function() {
                  s.resize({
                          mh: cfg.DIMENSION.H_MA4K
                      }),
                      draw();
              }),
              (this.setTLineStyle = setTLineStyle),
              setTLineStyle(options),
                  n();
          }
          // END STOCKUI
          function View() {
              var view_mainStock,
                  viewMe = this,
                  allStocks = [];
              (this.getAllStock = function() {
                  return allStocks;
              }),
              (this.getMainStock = function() {
                  return view_mainStock;
              }),
              (this.getAllSymbols = function() {
                  for (var e = [], t = 0, a = allStocks.length; a > t; t++)
                      e.push(allStocks[t].symbol);
                  return e;
              });
              var c = function() {
                      var e,
                          t = cfg.DIMENSION.h_t;
                      return viewManangerConfig.business ?
                          (e = 0) :
                          viewManangerConfig.appMode ?
                          2 :
                          (e = 100 > t ? 2 : 180 > t ? 4 : 300 > t ? 6 : 8);
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
                              d = o; d--;

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
                      for (var v = c(), f = o; f--;)
                          (e = allStocks[f]), e.setPricePos([r, i, v], s);
                  },
                  m = function(e) {
                      if (e) e.draw();
                      else
                          for (var t = allStocks.length; t--;) allStocks[t].draw();
                  },
                  p = function(t) {
                      1 == viewState.viewId || 0 == viewState.viewId ?
                          viewManangerConfig.date ?
                          viewMe.moving(viewState.start, viewState.end) :
                          viewMe.moving(4, 5, !1) :
                          viewMe.moving(viewState.start, viewState.end, !1),
                          t || ne.onRange(view_mainStock);
                  },
                  v = function(e) {
                      return e.isErr ?
                          (utils_util.trace.error("err symbol data"),
                              viewMe.removeCompare([e.symbol]),
                              !0) :
                          e.tDb.get() ?
                          !0 :
                          (e.initData(b), !1);
                  },
                  f = [],
                  g = function(e) {
                      if (e && utils_util.isFunc(e.callback)) {
                          for (var a = !1, i = f.length; i--;)
                              if (e.callback === f[i]) {
                                  a = !0;
                                  break;
                              }! a && f.push(e.callback);
                      }
                  },
                  b = function(a, i) {
                      if ((g(i), v(view_mainStock))) {
                          if (view_mainStock.isErr)
                              return (
                                  utils_util.trace.error("err main symbol"),
                                  void(view_mainStock.isErr = !1)
                              );
                          iMgr.patcher.switchFloater();
                          for (var r, o = !0, s = allStocks.length; s--;)
                              (r = allStocks[s]), r == view_mainStock || v(r) || (o = !1);
                          if (o) {
                              for (s = allStocks.length; s--;)
                                  allStocks[s].marketNum(allStocks[s].needMarket) >
                                  allStocks[s].marketNum(marketCode) &&
                                  (marketCode = allStocks[s].needMarket);
                              for (s = allStocks.length; s--;) changeData(allStocks[s]);
                              for (p(a); f.length;) {
                                  var l = f.shift();
                                  l();
                              }
                          }
                          if ((ne.onViewChanged(), a)) return;
                          ne.onViewPrice(), ne.onDataUpdate();
                      }
                  },
                  _ = function() {
                      ne.onRange(view_mainStock);
                  };
              (this.getExtraData = function(a) {
                  if (
                      ((a = copyProperties({
                                  symbol: view_mainStock.symbol,
                                  name: null,
                                  clone: !0
                              },
                              a || {}
                          )),
                          !a.name)
                  )
                      return null;
                  for (var i, r, o = allStocks.length; o--;)
                      if (allStocks[o].symbol === a.symbol) {
                          i = allStocks[o];
                          break;
                      }
                  if (i) {
                      var s;
                      "t1" == a.name || "t5" == a.name ?
                          ((s = i.tDb.get()), (r = a.clone ? utils_util.clone(s) : s)) :
                          (r = null);
                  }
                  return r;
              }),
              (this.shareTo = function(e) {
                  e = copyProperties({
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
                              "utils.qrcode.createcanvas", {
                                  text: e.url,
                                  width: e.qrwidth,
                                  height: e.qrheight
                              },
                              function(e) {
                                  tipObj.showTip({
                                      content: e,
                                      txt: '<p style="margin:0 0 9px 0;">扫描二维码</p>',
                                      parent: V,
                                      btnLb: "关闭"
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
                      if ((clearInterval(N), !isNaN(viewManangerConfig.rate))) {
                          var t = 1e3 * viewManangerConfig.rate;
                          t > 0 && (N = setTimeout(w, t));
                      }
                      for (var a, r = allStocks.length; r--;)
                          (a = allStocks[r]), a.doUpdate(D, null, null, null, e);
                  },
                  x = function() {
                      viewState.viewId = 2;
                      for (var e, t = allStocks.length; t--;)
                          (e = allStocks[t]), e.initT5Data(e.datas, e.hq, b);
                  };
              (this.updateDataAll = w), (this.update5Data = x);
              var _view_createStockData = function(options, isMain) {
                      var stockData = new STData(options, isMain);
                      isMain && (view_mainStock = stockData),
                          (allStocks[allStocks.length] = stockData),
                          toggleP(),
                          b();
                  },
                  M = function(e) {
                      for (var t, a, i = e, r = 0, o = 0; r < allStocks.length; r++)
                          (a = allStocks[r]),
                          a.marketNum(a.market) == a.marketNum(i) ?
                          o++
                          :
                          (t = t ?
                              a.marketNum(a.market) > a.marketNum(t) ?
                              a.market :
                              t :
                              a.market),
                          r == allStocks.length - 1 && 0 == o && (marketCode = t);
                      for (r = allStocks.length; r--;) changeData(allStocks[r], i);
                  },
                  changeData = function(e, t) {
                      e.changeMarket(t);
                  };
              this.changeData = changeData;
              var toggleP = function() {
                      if (allStocks.length > 1)
                          viewMe.mM.togglePt({
                              v: !1
                          });
                      else {
                          if (allStocks.length <= 0) return;
                          viewMe.mM.togglePt({
                              v: !0
                          });
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
              (this.onWheel = function(e) {
                  var t = -1 * e.detail || e.wheelDelta;
                  if (0 != t) {
                      t = t > 0 ? -1 : 1;
                      var i = R(t);
                      viewMe.moving(i[0], i[1], "wheel");
                  }
              }),
              (this.onKb = function(e) {
                  var t = e.keyCode;
                  switch (t) {
                      case 38:
                      case 40:
                          var i = R(38 == t ? 1 : -1);
                          viewMe.moving(i[0], i[1], "Key");
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
                  viewMe.moving(t[0], t[1], "zoom");
              }),
              (this.moveApi = function(e) {
                  var t = viewState.start,
                      i = viewState.end;
                  (t += e),
                  (i += e),
                  i > 5 && ((t = 4), (i = 5)),
                      0 > t && ((t = 0), (i = 1)),
                      viewMe.moving(t, i, "move");
              }),
              (this.setViewData = p),
              (this.onChangeView = b);
              var A = 1;
              (this.moving = function(t, a, i, r) {
                  (viewState.start = t),
                  (viewState.end = a),
                  ((4 != t && 5 != a) || (0 != t && 5 != a)) &&
                  (viewState.viewId = 0),
                  r && 4 != t && 1 == A && ((i = "rs"), (A = 2), (C = 0)),
                      ("HF" == marketCode || "NF" == marketCode) &&
                      0 == C &&
                      i &&
                      (J.show(), x("t5"), (C = 1), (A = 2));
                  for (var o, s = allStocks.length; s--;)
                      (o = allStocks[s]), o.setRange(), o.onViewChange();
                  d(), m(), ne.onRange(view_mainStock);
              }),
              (this.dAdd = 0),
              (this.compare = function(e) {
                  for (var t = allStocks.length; t--;)
                      if (allStocks[t].symbol == e.symbol) return;
                  _view_createStockData(e, !1);
              }),
              (this.removeCompare = function(e) {
                  for (var t, a, i = "CN", r = e.length; r--;) {
                      a = e[r];
                      for (var o = allStocks.length; o--;)
                          if (a == allStocks[o].symbol) {
                              (t = allStocks.splice(o, 1)[0]),
                              (i = t.market),
                              t.clear(),
                                  (t = null);
                              break;
                          }
                  }
                  M(i), toggleP(), d(), m(), ne.onRange(allStocks[0]);
              }),
              (this.onResize = function(e) {
                  for (var t = allStocks.length; t--;) allStocks[t].resize(e);
              }),
              (this.dcReset = function() {
                  for (var e, t = allStocks.length; t--;)
                      (e = allStocks.splice(t, 1)[0]), e.clear(), (e = null);
              }),
              (this.setScale = function(e) {
                  cfg.datas.scaleType = e;
              }),
              (this.setTLineStyle = function(a) {
                  if (a) {
                      !utils_util.isArr(a) && (a = [a]);
                      for (var i = a.length; i--;) {
                          var r = a[i];
                          if (r.hasOwnProperty("symbol")) {
                              for (var o = r.symbol, s = allStocks.length; s--;)
                                  if (allStocks[s].symbol == o) {
                                      allStocks[s].setTLineStyle(r), allStocks[s].draw();
                                      break;
                                  }
                          } else view_mainStock.setTLineStyle(r), view_mainStock.draw();
                      }
                  } else view_mainStock.setTLineStyle(), view_mainStock.draw();
              });
              var E;
              var P = function(e) {
                  e ? S() : iMgr.update();
              };
              var H = !1;
              var F = 0;
              var $ = function() {
                  clearTimeout(E), (H = !1), (F = 0);
              };
              var K = function() {
                  E = setTimeout(function() {
                      F > 0 && S(), $();
                  }, 500);
              };
              this.pushData = function(e, t) {
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
                  for (var i = e.length; i--;)
                      for (var r = allStocks.length; r--;)
                          if (allStocks[r].symbol == e[i].symbol && e[i].data) {
                              F++,
                              allStocks[r].doUpdate(
                                  fBind(P, null, a),
                                  !1,
                                  e[i].data,
                                  e[i].market
                              );
                              break;
                          }
              };
              this.dcInit = function(config) {
                  _view_createStockData(config, !0), w();
              };
              this.mM = new(function() {
                  var newAC = function(chartlist, type, options) {
                      console.log(chartlist);
                      var chart, method;
                      switch (type) {
                          case "price":
                              (chart = pChart), (method = "initPt");
                              break;
                          case "tech":
                              (chart = tChart), (method = "initTc");
                      }

                      if (method) {
                          if (chart) view_mainStock[method](chartlist, options);
                          else
                              KKE.api(
                                  "plugins.techcharts.get", {
                                      type: type
                                  },
                                  function(e) {
                                      tChart = e.tChart;
                                      pChart = e.pChart;
                                      newAC(chartlist, type, options);
                                  }
                              );
                      }
                  };
                  var removeAC = function(t, a) {
                      var i;
                      switch (a) {
                          case "price":
                              i = "removePt";
                              break;
                          case "tech":
                              i = "removeTc";
                      }
                      i && view_mainStock && (view_mainStock[i](t), b());
                  };
                  var showRs = function(t) {
                      return o ?
                          (Q ?
                              Q.sh(t) :
                              (view_mainStock.initRs(),
                                  showRs(t),
                                  B.appendChild(Q.getBody())),
                              void initMgr.resizeAll(!0)) :
                          void KKE.api("plugins.rangeselector.get", null, function(e) {
                              (o = e), showRs(t);
                          });
                  };
                  this.showRs = showRs;
                  this.newAC = newAC;
                  this.removeAC = removeAC;
                  this.togglePt = function(t) {
                      view_mainStock && (view_mainStock.togglePt(t), b());
                  };
              })();
          }
          //END VIEW

          var _hf_window_var,
              _nf_window_var,
              _gbi_window_var,
              marketCode = "CN",
              M = 1,
              O = 0,
              unitShou = "手",
              C = 0;
          (_nf_window_var = viewManangerConfig._nf_window_var),
          (_hf_window_var = viewManangerConfig._hf_window_var),
          (_gbi_window_var = viewManangerConfig._gbi_window_var);
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
              ObjectA = {
                  tcd: function(e) {
                      var a;
                      switch (e) {
                          case "HF":
                              a = utils_util.tUtil.gtAll(_hf_window_var.time).length;
                              break;
                          case "REPO":
                              (a = 271), (unitShou = "");
                              break;
                          case "LSE":
                              (a = 511), (unitShou = "");
                              break;
                          case "GOODS":
                              (a = 781), (unitShou = "");
                              break;
                          case "MSCI":
                              (a = utils_util.tUtil.gtmsci().length), (unitShou = "");
                              break;
                          case "CN":
                              (a = 241),
                              utils_util.isRepos(viewManangerConfig.symbol) &&
                                  (unitShou = ""),
                                  utils_util.isCNK(viewManangerConfig.symbol) &&
                                  (unitShou = "股");
                              break;
                          case "option_cn":
                          case "op_m":
                              (a = 241), (unitShou = "");
                              break;
                          case "HK":
                              (a = 331), (unitShou = "");
                              break;
                          case "US":
                              (a = 391), (unitShou = "");
                              break;
                          case "NF":
                              (a = utils_util.tUtil.gtAll(_nf_window_var.time).length),
                              (unitShou = "");
                              break;
                          case "global_index":
                              a = utils_util.tUtil.gtAll(_gbi_window_var.time).length;
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
                          "HK" == a ?
                          ((i = n.splice(0, 120)), (r = i.concat(n.splice(30, 121)))) :
                          "US" == a || (r = e),
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
                          ((s = [
                                  ["12:01", "12:59"]
                              ]),
                              (u = [1]),
                              (l = m[150]),
                              (c = m[m.length - 1])),
                          ("CN" == p || "option_cn" == p) &&
                          ("HK" == h ?
                              ((s = [
                                      ["11:30", "11:59"],
                                      ["15:01", "16:00"]
                                  ]),
                                  (u = [0, 2]),
                                  (l = m[119]),
                                  (c = m[m.length - 1])) :
                              ((s = [
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
                                  I = w.length; I > T; T++
                          )
                              u[_] < 2 ?
                              (("CN" == p || "option_cn" == p) &&
                                  (y > 120 && 150 > y ?
                                      ((S = y - 120), (D = S > T ? l.price : -0.01)) :
                                      (D = l.price)),
                                  "HK" == p && y > 150 && 180 > y && (S = y - 150),
                                  (k = {
                                      time: w[T],
                                      price: D,
                                      avg_price: D,
                                      volume: 0,
                                      fake: u[_]
                                  })) :
                              (("CN" == p || "option_cn" == p) &&
                                  (y > 272 ?
                                      ((S = y - 272), (D = S > T ? c.price : -0.01)) :
                                      (D = c.price)),
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
                          ("US" == h ?
                              ((d = m.splice(0, 120)),
                                  (o = d.concat(f[0], f[1], m, f[2]))) :
                              "HK" == h &&
                              ((d = m.splice(0, 120)), (o = d.concat(f[0], m, f[1])))),
                          o
                      );
                  }
              };
          utils_util.xh5_EvtDispatcher.call(this);
          var chart_h5tObj = this;
          //copy properties
          viewManangerConfig = copyProperties({
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
              viewManangerConfig || {
                  YANGWEN: "yangwen@staff.sina.com.cn",
                  VER: "2.6.0"
              }
          );

          if (!viewManangerConfig.symbol) viewManangerConfig.symbol = "sh000001";

          viewManangerConfig.symbol = String(viewManangerConfig.symbol);

          viewManangerConfig.rawsymbol = String(viewManangerConfig.symbol);
          viewManangerConfig.symbol =
              "LSE" === utils_util.market(viewManangerConfig.symbol) ?
              utils_util.strUtil.replaceStr(viewManangerConfig.symbol) :
              viewManangerConfig.symbol.replace(".", "$");

          if (0 == location.protocol.indexOf("https:")) viewManangerConfig.ssl = !0;
          var randomKey =
              "_" +
              viewManangerConfig.symbol +
              "_" +
              Math.floor(1234567890 * Math.random() + 1) +
              Math.floor(9876543210 * Math.random() + 1);

          var cfg = cfgs_settinger.getSetting(randomKey);

          cfg.datas.isT = !0;
          viewManangerConfig.reorder || (cfg.custom.indicator_reorder = !1);
          viewManangerConfig.reheight || (cfg.custom.indicator_reheight = !1);
          marketCode = utils_util.market(viewManangerConfig.symbol);
          cfg.datas.tDataLen = ObjectA.tcd(marketCode);
          var tDataLen = cfg.datas.tDataLen;
          var tipObj = new(function() {
              var e;
              this.showTip = function(a) {
                  e || (e = new utils_util.TipM(cfg.COLOR)), e.genTip(a);
              };
              this.hideTip = function() {
                  e && e.hide();
              };
          })();

          if (xh5_BrowserUtil.noH5) {
              if ("undefined" == typeof FlashCanvas || viewManangerConfig.fh5)
                  return void(
                      utils_util.isFunc(viewManangerConfig.noh5) &&
                      viewManangerConfig.noh5(viewManangerConfig)
                  );
              cfg.PARAM.isFlash = !0;
          }
          if (
              (cfg.PARAM.isFlash &&
                  ((cfg.COLOR.K_EXT_BG = "#fff"), (cfg.COLOR.F_BG = "#fff")),
                  viewManangerConfig.dim)
          )
              for (var F in viewManangerConfig.dim) {
                  if (
                      viewManangerConfig.dim.hasOwnProperty(F) &&
                      utils_util.isNum(cfg.DIMENSION[F])
                  )
                      cfg.DIMENSION[F] = viewManangerConfig.dim[F];
              }

          var $,
              V,
              K,
              G,
              z,
              subArea,
              B,
              view,
              whatJ,
              Y,
              Z,
              Q,
              J,
              viewState = {
                  viewId: globalCfg.URLHASH.vi(viewManangerConfig.view || "ts"),
                  dataLength: void 0,
                  start: void 0,
                  end: void 0,
                  startDate: void 0,
                  endDate: void 0
              },
              t_rate = isNaN(viewManangerConfig.t_rate) ?
              cfg.PARAM.T_RATE :
              viewManangerConfig.t_rate,
              ae = !1,
              ie = 0;
          var initMgr = new(function() {
              var e;
              var a = function(e, t, a) {
                  var r = !1;
                  isNaN(e) && (e = viewManangerConfig.w || $.offsetWidth),
                      isNaN(t) &&
                      (t =
                          viewManangerConfig.h || $.offsetHeight - viewManangerConfig.mh);
                  for (
                      var n,
                          o = B.clientHeight || 0,
                          s = subArea.clientHeight || 0,
                          l = cfg.DIMENSION.getOneWholeTH(),
                          c = 0,
                          d = subArea.childNodes,
                          m = d.length,
                          p = 0,
                          h = d.length; h--;

                  )
                      (n = d[h]),
                      n.id.indexOf("blankctn") >= 0 ?
                      ((c = n.offsetHeight), m--, (p += c)) :
                      (p += l);
                  return (
                      !isNaN(a) && (s -= a),
                      s / (t - o) > 1 && ((s = p), (r = !0)),
                      cfg.DIMENSION.setStageW(e),
                      1 == ie ?
                      m > 0 &&
                      (cfg.DIMENSION.setStageH(t, m * l + c + o), (r = !0), (ie = 0)) :
                      cfg.DIMENSION.setStageH(t, s + o),
                      0 > t &&
                      ((cfg.DIMENSION.H_T_G =
                              cfg.DIMENSION.H_T_G - cfg.DIMENSION.H_T_T),
                          (cfg.DIMENSION.H_T_B = cfg.DIMENSION.H_TIME_PART)),
                      r
                  );
              };
              var r = function() {
                  J.setPosition();
              };
              var n = function() {
                  e && (e.style.display = cfg.custom.show_logo ? "" : "none");
              };
              var o = function(e, i, o) {
                  var s = a(i, o, 0 / 0);
                  if (e || (i && o)) {
                      if (!view) return;
                      view.onResize(s), iMgr.onResize();
                  }
                  r(),
                      n(),
                      utils_util.stc("t_wh", [
                          cfg.DIMENSION.getStageW(),
                          cfg.DIMENSION.getStageH()
                      ]);
              };
              var s = function() {
                  ($ = f$DOM(viewManangerConfig.domid) || viewManangerConfig.dom),
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
              };
              var l = function(a) {
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
              };
              var m = function(e) {
                  !cfg.custom.mousewheel_zoom ||
                      (document.activeElement !== V &&
                          document.activeElement.parentNode !== V) ||
                      (view && view.onWheel(e),
                          xh5_EvtUtil.preventDefault(e),
                          xh5_EvtUtil.stopPropagation(e));
              };
              var p = function(e) {
                  cfg.custom.keyboard && view && view.onKb(e);
              };
              var u = function() {
                  utils_util.xh5_deviceUtil.istd ||
                      (xh5_BrowserUtil.info.name.match(/firefox/i) ?
                          xh5_EvtUtil.addHandler(V, "DOMMouseScroll", m) :
                          xh5_EvtUtil.addHandler(V, "mousewheel", m),
                          (V.tabIndex = 0),
                          xh5_EvtUtil.addHandler(V, "keydown", p));
              };
              var v = function(t) {
                  (e = t), V.appendChild(t);
              };
              var f = function() {
                  s(),
                      l(viewManangerConfig.theme),
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
                      (tipObj.showTip({
                              txt: viewManangerConfig.nohtml5info || globalCfg.nohtml5info,
                              parent: V
                          }),
                          utils_util.stc("t_nh5"));
              };

              f();
              this.resizeAll = o;
              this.innerResize = function(e) {
                  view &&
                      (a(0 / 0, 0 / 0, e),
                          view.onResize(),
                          iMgr.onResize(),
                          r(),
                          ne.onInnerResize({
                              height: cfg.DIMENSION.h_t
                          }));
              };
              this.initTheme = l;
          })();
          var ne = new(function() {
              var e = 0,
                  a = function(a, r) {
                      var n = tDataLen - 1,
                          o = view.getAllStock()[0];
                      if (
                          o &&
                          o.datas &&
                          (stbd(o.datas[o.datas.length - 1][0].date, o.hq.date) ?
                              (r = o.realLen < 0 || o.realLen > n ? n : (n = o.realLen)) :
                              "NF" == marketCode &&
                              _nf_window_var &&
                              "21:00" == _nf_window_var.time[0][0] ?
                              (r = n = o.realLen) :
                              o.realLen < 0 || o.realLen > n ?
                              (r = n) :
                              ((r = n),
                                  o.datas[o.datas.length - 1][r].price < 0 && (r = o.realLen)),
                              (a = o.datas[o.datas.length - 1][r]),
                              a && a.time)
                      ) {
                          var s, l;
                          if (
                              ("HF" == marketCode ?
                                  ((s = _hf_window_var.time[0][0]),
                                      s > a.time ?
                                      ((s = o.datas[o.datas.length - 1][0].date),
                                          (l = new Date(s)),
                                          "hf_CHA50CFD" !== viewManangerConfig.symbol &&
                                          l.setDate(l.getDate() + 1)) :
                                      (l = o.datas[o.datas.length - 1][0].date)) :
                                  "NF" == marketCode ?
                                  ((s = _nf_window_var.time[0][0]),
                                      s < a.time && "21:00" == s ?
                                      ((s = o.datas[o.datas.length - 1][0].date),
                                          (l = new Date(s)),
                                          l.setDate(l.getDate() - 1)) :
                                      (l = o.datas[o.datas.length - 1][0].date)) :
                                  (l = o.datas[o.datas.length - 1][0].date),
                                  "US" == marketCode &&
                                  o.hq &&
                                  o.datas &&
                                  o.datas.length > 0 &&
                                  o.hq.today === o.datas[o.datas.length - 1][0].today)
                          ) {
                              var c = o.datas[o.datas.length - 1][r]; -
                              1 == c.price &&
                                  ((c.price = c.avg_price = o.hq.price),
                                      (c.change = o.hq.price - o.hq.prevclose),
                                      (c.percent = (o.hq.price - o.hq.prevclose) / o.hq.prevclose));
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
                  if (utils_util.isFunc(viewManangerConfig.ondataupdate)) {
                      var e = a();
                      e &&
                          viewManangerConfig.ondataupdate({
                              data: utils_util.clone(e),
                              idx: viewState.currentLength - 1,
                              left: cfg.DIMENSION.posX,
                              top: cfg.DIMENSION.H_MA4K
                          });
                  }
              }),
              (this.onInnerResize = function(e) {
                  utils_util.isFunc(viewManangerConfig.oninnerresize) &&
                      viewManangerConfig.oninnerresize(e);
              }),
              (this.onRange = function(e) {
                  !ae &&
                      utils_util.isFunc(viewManangerConfig.onrange) &&
                      e &&
                      viewManangerConfig.onrange({
                          isCompare: e.isCompare,
                          data: utils_util.clone(e.datas),
                          width: cfg.DIMENSION.w_t,
                          height: cfg.DIMENSION.h_t,
                          viewRangeState: utils_util.clone(viewState),
                          range: [e.labelMinP, e.labelMaxP, e.labelMaxVol],
                          left: cfg.DIMENSION.posX,
                          top: cfg.DIMENSION.H_MA4K
                      });
              }),
              (this.onViewChanged = function() {
                  utils_util.isFunc(viewManangerConfig.onviewchanged) &&
                      viewManangerConfig.onviewchanged({
                          viewRangeState: utils_util.clone(viewState)
                      });
              }),
              (this.onViewPrice = function(r, n, o, s) {
                  if (!ae && utils_util.isFunc(viewManangerConfig.onviewprice)) {
                      if ((r || (r = a(r, n)), !r)) return;
                      o || (o = view.getMainStock().getName());
                      var l,
                          c,
                          d = utils_util.clone(r);
                      viewManangerConfig.ennfloat ?
                          ((l = viewManangerConfig.nfloat),
                              (c = viewManangerConfig.nfloat)) :
                          ((l = utils_util.strUtil.nfloat(d.price)),
                              (c = utils_util.strUtil.nfloat(d.avg_price))),
                          (d.price = Number(d.price.toFixed(l))),
                          (d.avg_price = Number(d.avg_price.toFixed(c)));
                      var m = viewManangerConfig.symbol.length;
                      "HK" == marketCode &&
                          viewManangerConfig.symbol.substring(m - 1, m) >= "A" &&
                          (d.avg_price = 0 / 0),
                          d.volume && d.volume < 0 && (d.volume = 0),
                          viewManangerConfig.onviewprice({
                              curname: o || "",
                              data_array: view.getAllStock().length,
                              data: d,
                              idx: e,
                              left: cfg.DIMENSION.posX,
                              top: cfg.DIMENSION.H_MA4K,
                              interacting: !!s
                          });
                  }
              }),
              (this.onTechChanged = function(e) {
                  utils_util.isFunc(viewManangerConfig.ontechchanged) &&
                      viewManangerConfig.ontechchanged({
                          Indicator: e
                      });
              }),
              (this.shortClickHandler = function() {
                  utils_util.isFunc(viewManangerConfig.onshortclickmain) &&
                      viewManangerConfig.onshortclickmain();
              });
          })();
          var iMgr = new(function() {
              var e,
                  a,
                  r,
                  n,
                  o,
                  s = viewManangerConfig.nfloat,
                  l = 137,
                  c = new(function() {
                      var t = function(t) {
                          var a = e.body.style;
                          t && cfg.custom.show_floater ?
                              ((a.backgroundColor = cfg.COLOR.F_BG),
                                  (a.color = cfg.COLOR.F_T),
                                  (a.border = "1px solid " + cfg.COLOR.F_BR),
                                  (a.display = "")) :
                              (a.display = "none");
                      };
                      (this.pv = function(a) {
                          var i = e.body.style,
                              r = Math.max(cfg.DIMENSION.posX, 55) + 9,
                              n = cfg.DIMENSION.posX < 55 ? 9 : 0,
                              o =
                              cfg.DIMENSION.getStageW() - l - 9 - cfg.DIMENSION.RIGHT_W - n;
                          (i.left =
                              (a.x > (cfg.DIMENSION.getStageW() - cfg.DIMENSION.RIGHT_W) >> 1 ?
                                  r :
                                  o) + "px"),
                          (i.top = (a.y || 0) + "px"),
                          t(!0);
                      }),
                      (this.showFloater = t);
                  })(),
                  p = function() {
                      function r() {
                          var e = view.getAllStock()[0];
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
                              m = "text-align:left;font-weight:normal;border:0;height:16px;",
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
                              (g.innerHTML = "价格");
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
                              (g.innerHTML = "均价");
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
                              (g.innerHTML = "涨跌");
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
                              (g.innerHTML = "成交");
                          var T = utils_util_$C("span");
                          (f.style.cssText = p),
                          "HF" != marketCode &&
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
                                  e > t ?
                                  (a = cfg.COLOR.F_RISE) :
                                  t > e && (a = cfg.COLOR.F_FALL),
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
                                  "HK" == marketCode || "US" == marketCode || "HF" == marketCode ?
                                      (u = utils_util.strUtil.nfloat(d)) :
                                      "LSE" === marketCode && (u = 3),
                                      viewManangerConfig.ennfloat &&
                                      (u = viewManangerConfig.nfloat),
                                      (c = isNaN(c) ? "--" : (100 * c).toFixed(2)),
                                      (D.innerHTML = d.toFixed(u)),
                                      (w.innerHTML = r() ? "--" : p.toFixed(u)),
                                      (x.innerHTML = h.toFixed(u) + "(" + c + "%)");
                                  var v = 2;
                                  utils_util.isCNK(viewManangerConfig.symbol) && (v = 0),
                                      (T.innerHTML =
                                          strUtil_ps(l.volume < 0 ? 0 : l.volume, v) + unitShou),
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
                                          cfg.DIMENSION.getStageW() -
                                          cfg.DIMENSION.RIGHT_W +
                                          "px"),
                                      (i.style.top = -(0.6 * cfg.STYLE.FONT_SIZE) + "px"),
                                      (r.style.top = -(0.6 * cfg.STYLE.FONT_SIZE) + "px"),
                                      (i.style.left = 0),
                                      (r.style.left = cfg.DIMENSION.extend_draw ?
                                          "" :
                                          cfg.DIMENSION.getStageW() -
                                          cfg.DIMENSION.RIGHT_W +
                                          "px"),
                                      (r.style.right = 0),
                                      (i.style.width = r.style.width = cfg.DIMENSION.extend_draw ?
                                          "" :
                                          cfg.DIMENSION.posX + "px"),
                                      (i.style.padding = "1px 0"),
                                      (r.style.padding = "1px 0");
                                  else {
                                      a.style.borderWidth = "0 1px 0 0";
                                      var o,
                                          s,
                                          l = cfg.DIMENSION.H_MA4K + cfg.DIMENSION.H_T_B;
                                      cfg.DIMENSION.getStageH() < 0 ?
                                          ((o = subArea.clientHeight), (s = o - l)) :
                                          ((o = cfg.DIMENSION.getStageH() - B.clientHeight || 0),
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
                                  ?
                                  "" != t.style.display && (t.style.display = "") :
                                  "none" != t.style.display && (t.style.display = "none");
                          };
                          (this.pv = function(e) {
                              if (
                                  (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"),
                                      (i.innerHTML = e.v || ""),
                                      e.p ?
                                      ((r.innerHTML = isNaN(Number(e.p.replace("%", ""))) ?
                                              "0.00%" :
                                              e.p),
                                          (r.style.display = "")) :
                                      (r.style.display = "none"),
                                      !isNaN(e.x))
                              ) {
                                  var a = e.x + (e.ox || 0),
                                      n = cfg.DIMENSION.getStageW();
                                  t.style.left = a + "px";
                                  var o = i.offsetWidth;
                                  if ((0 >= o && (o = 112), o > 0)) {
                                      var s = o >> 1;
                                      e.x < s ?
                                          (s = e.x) :
                                          a + s > n - cfg.DIMENSION.posX &&
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
                      var e = view.getAllStock(),
                          t = e[0].datas.length,
                          a = 0;
                      return (
                          e[0].realLen >= 0 &&
                          (a =
                              5 == viewState.end ?
                              e[0].realLen + cfg.datas.tDataLen * (t - 1) :
                              cfg.datas.tDataLen * (t - 1)),
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
                      C = view.getAllStock(),
                      A = C.length,
                      P = tDataLen,
                      q = A > 1,
                      F = C[0].datas.length,
                      $ = P * F,
                      V = Math.floor((d * $) / cfg.DIMENSION.w_t);
                  if (isNaN(d) && isNaN(p)) {
                      if (
                          ((k = !0), u(), stbd(C[0].datas[F - 1][0].date, C[0].hq.date))
                      ) {
                          var K;
                          (K =
                              C[0].realLen >= 0 ?
                              (P - 1) * (F - 1) + C[0].realLen :
                              Number.MAX_VALUE),
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
                          ie = A; ie--;

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
                                      marketCode)
                              ) {
                                  case "HK":
                                  case "US":
                                  case "HF":
                                      (Y = viewManangerConfig.ennfloat ?
                                          s :
                                          utils_util.strUtil.nfloat(g)),
                                      (G = g.toFixed(Y));
                                      break;
                                  case "LSE":
                                      (Y = viewManangerConfig.ennfloat ? s : 3),
                                      (G = g.toFixed(Y));
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
                      W.realLen < 0 && (W.realLen = tDataLen);
                      var ce = $ - P + W.realLen;
                      5 == viewState.end &&
                          V >= ce &&
                          ((V = ce), (L = te[re][V % tDataLen]));
                  } else {
                      if (dateUtil.stbd(se, dateUtil.sd(le)))
                          -
                          1 === W.realLen && (W.realLen = tDataLen),
                          V >= W.realLen && (V = W.realLen);
                      else
                          switch (marketCode) {
                              case "HF":
                              case "NF":
                                  V >= W.realLen && 4 == viewState.start && (V = W.realLen);
                                  break;
                              default:
                                  S = tDataLen - 1;
                          }
                      R(marketCode) &&
                          dateUtil.stbd(se, dateUtil.sd(le)) &&
                          W.hq &&
                          W.hq.time >= "09:00" &&
                          W.hq.time < "09:30" ?
                          (L = {
                              price: W.hq.preopen,
                              avg_price: W.hq.preopen,
                              prevclose: W.hq.prevclose,
                              percent: (W.hq.open - W.hq.prevclose) / W.hq.prevclose,
                              change: W.hq.preopen - W.hq.price,
                              volume: W.hq.totalVolume,
                              ix: 0.1,
                              time: W.hq.time
                          }) :
                          ((L = W.datas[0][V]), (L.prevclose = W.datas[0][0].prevclose));
                  }
                  if (L && (L.date || (L.date = se), !L || L.date)) {
                      var de = d;
                      cfg.custom.stick && (d = L.ix || d);
                      var me, pe;
                      "HF" == marketCode
                          ?
                          ((me = _hf_window_var.time[0][0]),
                              me > L.time ?
                              ((me = L.date),
                                  (pe = new Date(me)),
                                  pe.setDate(pe.getDate() + 1)) :
                              (pe = L.date)) :
                          "NF" == marketCode ?
                          ((me = _nf_window_var.time[0][0]),
                              me <= L.time && "21:00" == me ?
                              ((me = L.date),
                                  (pe = new Date(me)),
                                  pe.setDate(pe.getDate() - 1),
                                  0 == pe.getDay() && pe.setDate(pe.getDate() - 2)) :
                              L.time < "03:00" && 1 == L.date.getDay() ?
                              ((pe = new Date(L.date)), pe.setDate(pe.getDate() - 2)) :
                              (pe = L.date)) :
                          (pe = L.date);
                      var he =
                          utils_util.dateUtil.ds(pe, "/", !1) +
                          "/" +
                          utils_util.dateUtil.nw(pe.getDay()) +
                          (L.time || "");
                      ("GOODS" === marketCode ||
                          "hf_CHA50CFD" === viewManangerConfig.symbol ||
                          "HF" === marketCode) &&
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
                          chart_h5tObj.re(globalCfg.e.I_EVT, a.e);
                  }
              }),
              (this.globalDragHandler = function(e, t, a, i, r) {
                  isNaN(e) && isNaN(t) && chart_h5tObj.re(globalCfg.e.I_EVT, r);
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
                      var t = view.getAllStock(),
                          a = t[0].datas.length,
                          i = t[0].datas[0][D],
                          r = t.length,
                          n = t[0].realLen,
                          o =
                          "string" != typeof t[0].date ?
                          dateUtil.ds(t[0].date) :
                          t[0].date;
                      1 >= a ?
                          dateUtil.stbd(t[0].datas[0][0].date, dateUtil.sd(o)) ?
                          0 > n && (n = tDataLen) :
                          (n = tDataLen) :
                          dateUtil.stbd(t[0].datas[a - 1][0].date, dateUtil.sd(o)) ||
                          (n = tDataLen);
                      var s = tDataLen > n ? n + 1 : n;
                      if (0 > D) {
                          var l = tDataLen > n ? n : n - 1;
                          (S = D = (a - 1) * tDataLen + l), (i = t[0].datas[a - 1][l]);
                      } else if (D >= s + (a - 1) * tDataLen)
                          if (
                              dateUtil.stbd(t[0].datas[a - 1][0].date, dateUtil.sd(o)) &&
                              0 > e
                          ) {
                              var c = 0;
                              (c = a > 1 ? n - 1 + tDataLen * (a - 1) : n - 1),
                              (S = D = c),
                              (i = t[0].datas[0][S]);
                          } else(S = D = 0), (i = t[0].datas[0][0]);
                      !fCONTAINS(K, iMgr.iHLineO.body) &&
                          K.appendChild(iMgr.iHLineO.body);
                      var d = Math.floor(S / tDataLen);
                      D >= tDataLen && (i = t[0].datas[d][S - d * tDataLen]),
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
                  (this.patcher = new(function() {
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
                              !fCONTAINS(V, e.body) && V.appendChild(e.body);
                          };
                      (this.customFloater = function(e) {
                          (i = e), n(), utils_util.stc("t_fl", e);
                      }),
                      (this.switchFloater = n);
                  })()),
                  (this.update = function() {
                      var a = view.getAllStock();
                      if (a) {
                          var i,
                              r = a[0],
                              n = r.datas.length,
                              s = 0;
                          if (r) {
                              if (
                                  (D > n * (tDataLen - 1) && (D = 0),
                                      (i = Math.floor(D / (tDataLen - 1))),
                                      n == i && (i -= 1),
                                      D > tDataLen - 1)
                              ) {
                                  var l = D - tDataLen * i;
                                  s =
                                      stbd(r.datas[i][0].date, r.hq.date) && l > S ?
                                      r.realLen :
                                      l;
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
                                          (s = r.realLen >= 0 ? r.realLen : tDataLen - 1),
                                          (s += (n - 1) * tDataLen),
                                          (s = 0 > s ? Number.MAX_VALUE : s),
                                          b(s);
                                      else {
                                          if ("NF" == marketCode && r.hq.time >= "21:00")
                                              return (
                                                  r.realLen >= 0 && (s = r.realLen),
                                                  void(
                                                      4 == viewState.start &&
                                                      5 == viewState.end &&
                                                      ne.onViewPrice(o, s, void 0, !k)
                                                  )
                                              );
                                          y();
                                      }
                              else if ("HF" == marketCode)
                                  4 == viewState.start &&
                                  5 == viewState.end &&
                                  ne.onViewPrice(o, s, void 0, !k);
                              else if ("NF" == marketCode) {
                                  var c = new Date(o.date);
                                  o.date &&
                                      o.time >= "21:00" &&
                                      (c.setDate(
                                              1 == o.date.getDay() ? c.getDate() - 3 : c.getDate() - 1
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

          viewHelper = new(function() {
              var me = this,
                  a = function(a, i) {
                      if (cfg.hasOwnProperty(a)) {
                          for (var r in i)
                              if (i.hasOwnProperty(r) && utils_util.isFunc(i[r]))
                                  return void utils_util.trace.error("illegal operation:", r);
                          "DIMENSION" == a && (ie = 1),
                              copyProperties(cfg[a], i),
                              utils_util.stc(a, i),
                              me.resize();
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
                              for (var n = a.length; n--;)
                                  typeof i[r] === a[n] && ((i[r] = null), delete i[r]);
                      }
                      return i;
                  },
                  removeorAddAC = function(chartList, techType, options) {
                      options = copyProperties({
                              toremove: !1,
                              isexclusive: !1,
                              callback: void 0
                          },
                          options
                      );
                      if (options.toremove) {
                          view.mM.removeAC(techType, chartList);
                      } else {
                          if (options.isexclusive) {
                              view.mM.removeAC(null, chartList);
                              view.mM.newAC(techType, chartList, options);
                          } else {
                              view.mM.newAC(techType, chartList, options);
                          }
                      }
                  },
                  updateViewId = function(viewId) {
                      (viewState.viewId = viewId),
                      (viewState.start = 1 == viewId ? 4 : 0),
                      (viewState.end = 5);
                  };
              this.pushData = function(e, a) {
                  !utils_util.isArr(e) && (e = [e]), view.pushData(e, a);
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
                              view.pushData([r], 1);
                          }, 20)));
              }),
              (this.setScale = function(e) {
                  view.setScale(e), utils_util.stc("t_scale", e);
              });
              var l = !0;
              this.showView = function(e, a) {
                  iMgr.hideIUis(), l ? (l = !1) : J.hide();
                  var r = globalCfg.URLHASH.vi(e);
                  if (viewManangerConfig.date)
                      return (
                          (viewManangerConfig.date = ""),
                          updateViewId(r),
                          void this.newSymbol(viewManangerConfig)
                      );
                  var n = view.getAllStock()[0];
                  if (
                      (ne.onRange(n),
                          utils_util.stc("t_v", e),
                          utils_util.suda("vw", e),
                          viewState.viewId != r)
                  ) {
                      if (
                          (updateViewId(r),
                              ("HF" == marketCode || "NF" == marketCode) && "t5" == e && 0 == C)
                      )
                          return J.show(), (C = 1), void view.update5Data(e);
                      view.onChangeView(!1, a), ne && ne.onViewPrice();
                  }
              };
              var d = function(e) {
                      var a;
                      return (a = utils_util.isStr(e.symbol) ?
                          e.symbol.split(",") :
                          [e.symbol]);
                  },
                  m = [];
              (this.overlay = function(e, t) {
                  if (view && 1 != view.dAdd)
                      if (t) {
                          view.removeCompare(d(e));
                          for (var a = 0; a < m.length; a++)
                              e.symbol == m[a] && m.splice(a, 1);
                          view.getAllStock().length <= 1 && (view.dAdd = 0);
                      } else
                          (viewManangerConfig.overlaycolor = e.linecolor || {
                              K_N: "#cccccc"
                          }),
                          (view.dAdd = 2),
                          view.compare(e),
                          m.push(e.symbol);
              }),
              (this.compare = function(e, a) {
                  if (view) {
                      var i,
                          r = 0;
                      if (a) {
                          if (
                              ((i = utils_util.isStr(e) ? e.split(",") : [e.symbol]),
                                  1 == view.dAdd && view.removeCompare(i),
                                  view.getAllStock().length <= 1)
                          ) {
                              for (r = 0; r < m.length; r++)
                                  (view.dAdd = 2),
                                  view.compare({
                                      symbol: m[r]
                                  });
                              m.length < 1 && (view.dAdd = 0);
                          }
                      } else
                          2 == view.dAdd && view.removeCompare(m),
                          (view.dAdd = 1),
                          view.compare(e),
                          utils_util.suda("t_comp");
                      utils_util.stc("t_comp", {
                          rm: a,
                          o: e
                      });
                  }
              });
              var p = 0;
              this.tCharts = function(e, a) {
                  removeorAddAC("tech", e, a),
                      a && !a.noLog && (0 == p ? (p = 1) : utils_util.sudaLog());
              };
              var h = 0;
              this.pCharts = function(e, a) {
                  removeorAddAC("price", e, a),
                      a && !a.noLog && (0 == h ? (h = 1) : utils_util.sudaLog());
              };
              (this.showPCharts = function(e) {
                  e && (view.mM.togglePt(e), utils_util.stc("t_sp", e));
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
                  (f = copyProperties({
                          dispaly: !0,
                          from: void 0,
                          to: void 0
                      },
                      e
                  )),
                  view.mM.showRs(f),
                      utils_util.stc("t_rs", e);
              }),
              (this.setLineStyle = function(e) {
                  view && view.setTLineStyle(e), utils_util.stc("t_style", e);
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
                      ((viewManangerConfig.symbol = e.symbol),
                          (viewManangerConfig.date = e.date),
                          iMgr.hideIUis(),
                          iMgr.iReset(),
                          view.dcReset(),
                          view.dcInit(viewManangerConfig),
                          tipObj.hideTip(),
                          Y)
                  ) {
                      var a = Y.getLog();
                      (Y = null), a && this.tCharts(a);
                  }
                  if (Z) {
                      var r = Z.getLog();
                      (Z = null), r && this.pCharts(r);
                  }
                  f && ((f.from = void 0), (f.to = void 0), view.mM.showRs(f)),
                      utils_util.stc("t_ns", e);
              }),
              (this.resize = function(e, t) {
                  initMgr.resizeAll(!0, e, t);
              }),
              (this.hide = function(e) {
                  (ae = !0),
                  iMgr.hideIUis(),
                      utils_util.$CONTAINS($, V) && $.removeChild(V),
                      e && view.dcReset();
              }),
              (this.show = function(e) {
                  (ae = !1),
                  e && (utils_util.isStr(e) && (e = f$DOM(e)), ($ = e)),
                      utils_util.$CONTAINS($, V) ||
                      ($.appendChild(V), initMgr.resizeAll(!0)),
                      ne && ne.onViewPrice();
              }),
              (this.shareTo = function(e) {
                  view.shareTo(e), utils_util.stc("t_share", e);
                  var a = e && e.type ? e.type : "weibo";
                  utils_util.suda("share", a);
              }),
              (this.getChartId = function() {
                  return cfg.uid;
              }),
              (this.dateTo = function(e, a) {
                  (viewManangerConfig.historytime = e),
                  (viewManangerConfig.historycb = a);
                  var r = e;
                  "object" == typeof e
                      ?
                      (r = dateUtil.ds(e, "-")) :
                      (e = dateUtil.sd(e));
                  var n = whatJ.get();
                  if (null == n) return void(O = 1);
                  for (var o = n.length, s = 0; o > s; s++)
                      if (dateUtil.stbd(e, n[s][0].date))
                          return void view.moving(s, s + 1, "dateTo");
                  (viewManangerConfig.date = r),
                  (view.hasHistory = a),
                  utils_util.stc("t_ft", r),
                      this.newSymbol(viewManangerConfig);
              }),
              (this.showScale = function(e) {
                  view && view.setScale(e);
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
                  return view.historyData;
              }),
              (this.getExtraData = function(e) {
                  return view.getExtraData(e);
              }),
              (this.patcher = {
                  iMgr: iMgr.patcher
              }),
              (this.zoom = function(e) {
                  view.zoomApi(e), utils_util.stc("t_zoom", e, 9e3);
              }),
              (this.move = function(e) {
                  (e = parseInt(e)),
                  isNaN(e) || (view.moveApi(e), utils_util.stc("t_move", e, 9e3));
              }),
              (this.getSymbols = function() {
                  return view.getAllSymbols();
              }),
              (this.update = function() {
                  view.updateDataAll(1), utils_util.stc("t_up", "update", 9e3);
              }),
              (this.getCurrentData = function() {
                  return ne.currentData();
              }),
              (this.viewState = viewState),
              (this.me = chart_h5tObj),
              (this.type = "h5t");
          })();
          view = new View();
          view.dcInit(viewManangerConfig);
          return viewHelper;
      }

      function entityFun() {
          console.log("test");

          function createChartH5tAndInvokeCallBack(config, callback) {
              var viewManager = new ViewManger(config);
              var n = function(e) {
                  viewManager.me.rl(e, n);
              };
              viewManager.me.al(globalCfg.e.T_DATA_LOADED, n);
              utils_util.isFunc(callback) && callback(viewManager);
          }
          this.get = function(config, callback) {
              utils_util.stc("h5t_get"),
                  utils_util.suda("h5t_" + utils_util.market(config.symbol));
              var r;
              0 == location.protocol.indexOf("https:") && (r = !0);
              var market = utils_util.market(config.symbol),
                  url =
                  "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InterfaceInfoService.getMarket?category=$market&symbol=$symbol",
                  globalurl =
                  "//stock.finance.sina.com.cn/usstock/api/jsonp.php/var $cb=/Global_IndexService.getTradeTime?symbol=$symbol&category=index";
              switch ((r && (url = utils_util.getSUrl(url)), market)) {
                  case "HF":
                      var l = "kke_future_" + config.symbol;
                      utils_util.load(
                          url
                          .replace("$symbol", config.symbol.replace("hf_", ""))
                          .replace("$market", "hf")
                          .replace("$cb", "var " + l),
                          function() {
                              (l = window[l] || {
                                  time: [
                                      ["06:00", "23:59"],
                                      ["00:00", "05:00"]
                                  ]
                              }),
                              (config._hf_window_var = l),
                              createChartH5tAndInvokeCallBack(config, callback);
                          },
                          null, {
                              symbol: config.symbol,
                              market: market,
                              type: "init_hf"
                          }
                      );
                      break;
                  case "NF":
                      var c = "kke_future_" + config.symbol,
                          d = config.symbol.replace("nf_", "").replace(/[\d]+$/, "");
                      utils_util.load(
                          url
                          .replace("$symbol", d)
                          .replace("$market", "nf")
                          .replace("$cb", "var " + c),
                          function() {
                              (c = window[c] || {
                                  time: [
                                      ["09:30", "11:29"],
                                      ["13:00", "02:59"]
                                  ]
                              }),
                              (c.inited = 0),
                              (config._nf_window_var = c),
                              createChartH5tAndInvokeCallBack(config, callback);
                          },
                          null, {
                              symbol: config.symbol,
                              market: market,
                              type: "init_nf"
                          }
                      );
                      break;
                  case "global_index":
                      var m = "kke_global_index_" + config.symbol;
                      utils_util.load(
                          globalurl
                          .replace("$symbol", config.symbol.replace("znb_", ""))
                          .replace("$cb", m),
                          function() {
                              (m = window[m] || {
                                  time: [
                                      ["06:00", "23:59"],
                                      ["00:00", "05:00"]
                                  ]
                              }),
                              (config._gbi_window_var = m),
                              createChartH5tAndInvokeCallBack(config, callback);
                          },
                          null, {
                              symbol: config.symbol,
                              market: market,
                              type: "init_global"
                          }
                      );
                      break;
                  default:
                      createChartH5tAndInvokeCallBack(config, callback);
              }
          };
      }
      var viewHelper,
          o,
          pChart,
          tChart,
          f$DOM = utils_util.$DOM,
          utils_util_$C = utils_util.$C,
          fCONTAINS = utils_util.$CONTAINS,
          xh5_PosUtil = utils_util.xh5_PosUtil,
          xh5_EvtUtil = utils_util.xh5_EvtUtil,
          copyProperties = utils_util.oc,
          dateUtil = utils_util.dateUtil,
          stbd = utils_util.dateUtil.stbd,
          g = utils_util.xh5_ADJUST_HIGH_LOW.c,
          xh5_BrowserUtil = utils_util.xh5_BrowserUtil,
          fBind = utils_util.fBind,
          strUtil_ps = utils_util.strUtil.ps,
          globalCfg = cfgs_settinger.globalCfg,
          logoM = utils_util.logoM;
      return (
          utils_util.fInherit(ViewManger, utils_util.xh5_EvtDispatcher), entityFun
      );
  }
);
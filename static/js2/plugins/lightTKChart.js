xh5_define("plugins.lightTKChart", [], function() {
  "use strict";
  function t(t) {
    return null === t
      ? "Null"
      : void 0 === t
      ? "Undefined"
      : toString.call(t).slice(8, -1);
  }
  function i(h, e, r) {
    if (!e) return h;
    h || (h = {});
    for (var a in e)
      e.hasOwnProperty(a) &&
        ("Object" === t(e[a])
          ? (!h[a] && (h[a] = {}), i(h[a], e[a], r))
          : (!r && a in h) || (h[a] = e[a]));
    return h;
  }
  function copyPrototype(to, from, h) {
    (to = "prototype" in to ? to.prototype : to),
      (from = "prototype" in from ? from.prototype : from);
    for (var e in from)
      from.hasOwnProperty(e) &&
        (h ? null != from[e] : null == to[e]) &&
        (to[e] = from[e]);
    return to;
  }
  function e(t, i) {
    for (var h in i) i.hasOwnProperty(h) && t[h] && t[h](i[h]);
  }
  function toChart(t) {
    switch (t) {
      case "t1":
      case "t5":
        return "tChart";
      case "repay":
        return "repayChart";
      case "predict":
        return "predictChart";
      case "networth":
        return "netWorthChart";
      default:
        return "kChart";
    }
  }
  function GET(t, h) {
    getCommonEvent.call(this);
    t = this.param = i(t, initConf);
    this.param = t;
    this.currentView = t.initView;
    this.dom = document.getElementById(t.domId);
    this._init(h);
    this.me = this;
  }
  function x2005(t) {
    return "x2005" != t.t2 && "x3021" != t.t2;
  }
  function n(t) {
    return {
      day: {
        wfn: "xh5Fund",
        url: "//finance.sina.com.cn/fund/api/xh5Fund/nav/" + t + ".js",
      },
    };
  }
  function o(t, i, h, e, rm) {
    var r = this;
    r.param[t][i] = [
      {
        name: h,
      },
    ];
    this[t] &&
      this[t][i](
        [
          {
            name: h,
          },
        ],
        {
          isexclusive: !1,
          toremove: rm,
          callback: function() {
            e && e(t, i, h);
          },
        }
      );
  }
  function c(t, i, h, e, r) {
    var a = this,
      s = a.param[t][i];
    !s && (s = []);
    for (var n = s.length; n--; ) if (s[n].name == h) return;
    s.push({
      name: h,
    });
    this[t] &&
      this[t][i](
        [
          {
            name: h,
          },
        ],
        {
          toremove: e,
          callback: function() {
            (a.param[t][i] = s), r && r(t, i, h);
          },
          noLog: 1,
        }
      );
  }
  function C(t, i, h, e) {
    var r = this,
      a = r.param[t][i];
    if (a)
      for (var s = a.length; s--; )
        if (a[s].name == h)
          return (
            a.splice(s, 1),
            void (
              this[t] &&
              this[t][i](
                [
                  {
                    name: h,
                  },
                ],
                {
                  toremove: !0,
                  callback: function() {
                    (r.param[t][i] = a), e && e(t, i, h);
                  },
                  noLog: 1,
                }
              )
            )
          );
  }
  function PGET() {
    this.VERSION = "1.1.4";
    this.get = function(t, i) {
      new GET(t, i);
    };
  }
  var toString = Object.prototype.toString,
    getCommonEvent = (function() {
      var slice = Array.prototype.slice,
        CommonEvent = function() {
          this.eventList = {};
        };
      CommonEvent.prototype = {
        constructor: CommonEvent,
        on: function(eventType, handler, ctx, one) {
          var r = this.eventList;
          return handler && eventType
            ? (r[eventType] || (r[eventType] = []),
              r[eventType].push({
                handler: handler,
                one: one,
                ctx: ctx || this,
              }),
              this)
            : this;
        },
        one: function(eventType, handler, ctx) {
          this.on(eventType, handler, ctx, !0);
        },
        off: function(eventType, handler) {
          var h = this.eventList;
          if (!eventType) return (this.eventList = {}), this;
          if (handler) {
            if (h[eventType]) {
              for (var e = [], r = 0, a = h[eventType].length; a > r; r++)
                h[eventType][r].handler != handler && e.push(h[eventType][r]);
              h[eventType] = e;
            }
            h[eventType] && 0 === h[eventType].length && delete h[eventType];
          } else delete h[eventType];
        },
        trigger: function(eventType) {
          if (this.eventList[eventType]) {
            var args = arguments,
              len = args.length;
            len > 3 && (args = slice.call(args, 1));
            for (
              var r = this.eventList[eventType], a = r.length, s = 0;
              a > s;

            ) {
              switch (len) {
                case 1:
                  r[s].handler.call(r[s].ctx);
                  break;
                case 2:
                  r[s].handler.call(r[s].ctx, args[1]);
                  break;
                case 3:
                  r[s].handler.call(r[s].ctx, args[1], args[2]);
                  break;
                default:
                  r[s].handler.apply(r[s].ctx, args);
              }
              r[s].one ? (r.splice(s, 1), a--) : s++;
            }
          }
          return this;
        },
      };
      return CommonEvent;
    })(),
    initConf = {
      domId: void 0,
      initView: "t1",
      symbol: "sh000001",
      kInitParam: {},
      tInitParam: {},
      kChart: {
        setCustom: {
          show_underlay_vol: !1,
          show_ext_marks: !0,
          show_floater: !1,
          show_k_rangepercent: !1,
        },
        setDimension: {
          posX: 45,
        },
        setReK: 0,
        tCharts: [],
        pCharts: [],
      },
      tChart: {
        setCustom: {
          show_underlay_vol: !1,
          show_floater: !1,
        },
        setDimension: {},
        tCharts: [],
      },
      netWorthChart: {
        setCustom: {
          show_underlay_vol: !1,
          show_floater: !1,
          show_k_rangepercent: !1,
          tchart_tap: !1,
        },
      },
      repayChart: {
        setLineStyle: {
          linetype: "line",
        },
        setCustom: {
          show_underlay_vol: !1,
          show_floater: !1,
        },
        showScale: "percent",
      },
      predictChart: {
        setCustom: {
          mousewheel_zoom: !1,
          show_underlay_vol: !1,
          show_floater: !1,
          keyboard: !1,
        },
      },
    },
    m = ["tChart", "kChart", "netWorthChart", "repayChart", "predictChart"],
    GETp = GET.prototype;
  GETp.getChartType = function() {
    return toChart(this.currentView);
  };
  GETp._initTChart = function(t) {
    var h = this,
      a = this.param,
      tChart = a.tChart,
      n = a.symbol;
    a.isFund && (n = a.isFund.exchange.slice(4, 6).toLowerCase() + n),
      (this.isPendingTChart = !0),
      KKE.api(
        "chart.h5t.get",
        i(
          {
            domid: a.domId,
            dom: a.dom,
            symbol: n,
          },
          a.tInitParam
        ),
        function(i) {
          e(i, tChart),
            h.inited &&
              i.showView(h.currentView, {
                callback: function() {
                  h.trigger("viewChange", h.currentView);
                },
              }),
            (h.inited = 1),
            "tChart" === toChart(a.initView) &&
              h.trigger("chartInited", a.initView),
            (h.tChart = i),
            (h.isPendingTChart = !1),
            t && t(h);
        }
      );
  };
  GETp._initKChart = function(t) {
    var h = this,
      a = this.param,
      s = a.kChart,
      n = a.symbol;
    a.isFund && (n = a.isFund.exchange.slice(4, 6).toLowerCase() + n),
      (this.isPendingKChart = !0),
      KKE.api(
        "chart.h5k.get",
        i(
          {
            domid: a.domId,
            dom: a.dom,
            symbol: n,
            view: h.currentView,
          },
          a.kInitParam
        ),
        function(i) {
          e(i, s),
            i.showView(h.currentView, {
              callback: function() {
                h.trigger("viewChange", h.currentView);
              },
            }),
            "kChart" === toChart(a.initView) &&
              h.trigger("chartInited", a.initView),
            (h.kChart = i),
            (h.isPendingKChart = !1),
            t && t(h);
        }
      );
  };
  GETp._initNetWorthChart = function(t) {
    var h = this,
      a = this.param,
      o = a.netWorthChart,
      c = a.symbol;
    (this.isPendingNetWorthChart = !0),
      KKE.api(
        "chart.h5k.dual",
        i(
          {
            symbol: "dwjz_" + c,
            name: x2005(a.isFund)
              ? "\u5355\u4f4d\u51c0\u503c"
              : "\u4e03\u65e5\u5e74\u5316\u6536\u76ca\u7387",
            datas: n(c),
            dual: {
              symbol: "ljjz_" + c,
              name: x2005(a.isFund)
                ? "\u7d2f\u8ba1\u51c0\u503c"
                : "\u4e07\u4efd\u6536\u76ca",
              datas: n(c),
            },
            domid: a.domId,
            dom: a.dom,
          },
          a.netWorthInitParam
        ),
        function(i) {
          e(i, o),
            "netWorthChart" === toChart(a.initView) &&
              h.trigger("chartInited", a.initView),
            (h.netWorthChart = i),
            (h.isPendingNetWorthChart = !1),
            t && t(h);
        }
      );
  };
  GETp._initRepayChart = function(t) {
    var h = this,
      a = this.param,
      s = a.repayChart,
      o = a.symbol;
    (this.isPendingRepayChart = !0),
      KKE.api(
        "chart.h5k.get",
        i(
          {
            pcm: 2,
            symbol: "lshb_" + o,
            name: "\u5386\u53f2\u56de\u62a5",
            datas: n(o),
            domid: a.domId,
            dom: a.dom,
          },
          a.repayInitParam
        ),
        function(i) {
          e(i, s),
            "repayChart" === toChart(a.initView) &&
              h.trigger("chartInited", a.initView),
            (h.repayChart = i),
            (h.isPendingRepayChart = !1),
            t && t(h);
        }
      );
  };
  GETp._initPredictChart = function(t) {
    var h = this,
      a = this.param,
      s = a.predictChart,
      n = a.symbol;
    (this.isPendingPredictChart = !0),
      KKE.api(
        "chart.h5t.get",
        i(
          {
            domid: a.domId,
            symbol: "fu_" + n,
            dom: a.dom,
          },
          a.predictInitParam
        ),
        function(i) {
          e(i, s),
            "predictChart" === toChart(a.initView) &&
              h.trigger("chartInited", a.initView),
            (h.predictChart = i),
            (h.isPendingPredictChart = !1),
            t && t(h);
        }
      );
  };
  GETp._init = function(t) {
    switch (this.getChartType()) {
      case "tChart":
        this._initTChart(t);
        break;
      case "kChart":
        this._initKChart(t);
        break;
      case "netWorthChart":
        this._initNetWorthChart(t);
        break;
      case "repayChart":
        this._initRepayChart(t);
        break;
      case "predictChart":
        this._initPredictChart(t);
    }
  };
  GETp.hideExcept = function(t) {
    for (var i = m.length; i--; ) m[i] !== t && this[m[i]] && this[m[i]].hide();
  };
  GETp.showView = function(t, i) {
    var h = this;
    if (t && t !== this.currentView)
      switch (((this.currentView = t), this.getChartType())) {
        case "tChart":
          this.tChart
            ? (this.tChart.show(this.dom),
              this.tChart.showView(t, {
                callback: function() {
                  h.trigger("viewChange", t), i && i();
                },
              }))
            : this.isPendingTChart || this._initTChart(i),
            this.hideExcept("tChart");
          break;
        case "kChart":
          this.kChart
            ? (this.kChart.show(this.dom),
              this.kChart.showView(t, {
                callback: function() {
                  h.trigger("viewChange", t), i && i();
                },
              }))
            : this.isPendingKChart || this._initKChart(i),
            this.hideExcept("kChart");
          break;
        case "netWorthChart":
          this.netWorthChart
            ? this.netWorthChart.show(this.dom)
            : this.isPendingNetWorthChart || this._initNetWorthChart(i),
            this.hideExcept("netWorthChart");
          break;
        case "repayChart":
          this.repayChart
            ? this.repayChart.show(this.dom)
            : this.isPendingRepayChart || this._initRepayChart(i),
            this.hideExcept("repayChart");
          break;
        case "predictChart":
          this.predictChart
            ? this.predictChart.show(this.dom)
            : this.isPendingPredictChart || this._initPredictChart(i),
            this.hideExcept("predictChart");
      }
  };
  GETp.getCurrentChart = function() {
    return this[this.getChartType()];
  };
  GETp.show = function(t) {
    (this.dom = t), this.getCurrentChart().show(t);
  };
  GETp.hide = function(t, i) {
    i ? this[i] && this[i].hide(t) : this.getCurrentChart().hide(t);
  };
  GETp.setReK = function(t) {
    (this.param.kChart.setReK = t), this.kChart && this.kChart.setReK(t);
  };
  GETp.resize = function(t, i) {
    for (var h = m.length; h--; ) this[m[h]] && this[m[h]].resize(t, i);
  };
  GETp.update = function() {
    for (var t = m.length; t--; ) this[m[t]] && this[m[t]].update();
  };
  GETp.switchKTech = function(t, i, r) {
    o.call(this, "kChart", "tCharts", t, i, r);
  };
  GETp.switchTTech = function(t, i) {
    o.call(this, "tChart", "tCharts", t, i);
  };
  GETp.switchTech = function(t, i) {
    switch (this.getChartType()) {
      case "tChart":
        this.switchTTech(t, i);
        break;
      case "kChart":
        this.switchKTech(t, i);
    }
  };
  GETp.switchKTechM = function(t, i) {
    o.call(this, "kChart", "pCharts", t, i);
  };
  GETp.switchTTechM = function(t, i) {
    o.call(this, "tChart", "pCharts", t, i);
  };
  GETp.switchTechM = function(t, i) {
    switch (this.getChartType()) {
      case "tChart":
        this.switchTTechM(t, i);
        break;
      case "kChart":
        this.switchKTechM(t, i);
    }
  };
  GETp.showKTechM = function(t, i) {
    c.call(this, "kChart", "pCharts", t, !1, i);
  };
  GETp.showTTechM = function(t, i) {
    c.call(this, "tChart", "pCharts", t, !1, i);
  };
  GETp.showTechM = function(t, i) {
    switch (this.getChartType()) {
      case "tChart":
        this.showTTechM(t, i);
        break;
      case "kChart":
        this.showKTechM(t, i);
    }
  };
  GETp.hideKTechM = function(t, i) {
    c.call(this, "kChart", "pCharts", t, !0, i);
  };
  GETp.hideTTechM = function(t, i) {
    c.call(this, "tChart", "pCharts", t, !0, i);
  };
  GETp.hideTechM = function(t, i) {
    switch (this.getChartType()) {
      case "tChart":
        this.showTTechM(t, i);
        break;
      case "kChart":
        this.showKTechM(t, i);
    }
  };
  GETp.setCustom = function(t) {
    for (var i in t)
      t.hasOwnProperty(i) &&
        ((this.param.tChart.setCustom[i] = t[i]),
        (this.param.kChart.setCustom[i] = t[i]));
    this.tChart && this.tChart.setCustom(t),
      this.kChart && this.kChart.setCustom(t);
  };
  GETp.setDimension = function(t) {
    for (var i in t)
      t.hasOwnProperty(i) && (this.param.kChart.setDimension[i] = t[i]);
    this.kChart && this.kChart.setDimension(t);
  };
  GETp.hideKTechM = function(t, i) {
    C.call(this, "kChart", "pCharts", t, i);
  };
  GETp.hideTTechM = function(t, i) {
    C.call(this, "tChart", "pCharts", t, i);
  };
  GETp.hideTechM = function(t, i) {
    switch (this.getChartType()) {
      case "tChart":
        this.hideTTechM(t, i);
        break;
      case "kChart":
        this.hideKTechM(t, i);
    }
  };
  GETp.showRangeSelector = function(t) {
    arguments.length || (t = !0),
      this.tChart
        ? this.tChart.showRangeSelector({
            display: t,
          })
        : (this.param.tChart.showRangeSelector = {
            display: t,
          }),
      this.kChart
        ? this.kChart.showRangeSelector({
            display: t,
          })
        : (this.param.kChart.showRangeSelector = {
            display: t,
          });
  };
  GETp.pushData = function(t, i) {
    this.tChart && this.tChart.pushData(t, i),
      this.kChart && this.kChart.pushData(t, i);
  };
  GETp.toggleExtend = function() {
    this.tChart && this.tChart.toggleExtend(),
      this.kChart && this.kChart.toggleExtend();
  };
  GETp.zoom = function(t, i) {
    i || (i = this.getChartType()), this[i] && this[i].zoom(t);
  };
  copyPrototype(GET, getCommonEvent);
  return PGET;
});

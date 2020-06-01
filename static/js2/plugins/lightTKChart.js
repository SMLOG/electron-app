xh5_define("plugins.lightTKChart", ["utils.util"], function() {
  "use strict";
  function t(t) {
    return null === t
      ? "Null"
      : void 0 === t
      ? "Undefined"
      : d.call(t).slice(8, -1);
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
  function h(t, i, h) {
    (t = "prototype" in t ? t.prototype : t),
      (i = "prototype" in i ? i.prototype : i);
    for (var e in i)
      i.hasOwnProperty(e) && (h ? null != i[e] : null == t[e]) && (t[e] = i[e]);
    return t;
  }
  function e(t, i) {
    for (var h in i) i.hasOwnProperty(h) && t[h] && t[h](i[h]);
  }
  function r(t) {
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
  function a(t, h) {
    l.call(this),
      (t = this.param = i(t, p)),
      (this.param = t),
      (this.currentView = t.initView),
      (this.dom = document.getElementById(t.domId)),
      this._init(h),
      (this.me = this);
  }
  function s(t) {
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
    (r.param[t][i] = [
      {
        name: h,
      },
    ]),
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
    }),
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
  function u() {
    (this.VERSION = "1.1.4"),
      (this.get = function(t, i) {
        new a(t, i);
      });
  }
  var d = Object.prototype.toString,
    l = (function() {
      var t = Array.prototype.slice,
        i = function() {
          this.eventList = {};
        };
      return (
        (i.prototype = {
          constructor: i,
          on: function(t, i, h, e) {
            var r = this.eventList;
            return i && t
              ? (r[t] || (r[t] = []),
                r[t].push({
                  handler: i,
                  one: e,
                  ctx: h || this,
                }),
                this)
              : this;
          },
          one: function(t, i, h) {
            this.on(t, i, h, !0);
          },
          off: function(t, i) {
            var h = this.eventList;
            if (!t) return (this.eventList = {}), this;
            if (i) {
              if (h[t]) {
                for (var e = [], r = 0, a = h[t].length; a > r; r++)
                  h[t][r].handler != i && e.push(h[t][r]);
                h[t] = e;
              }
              h[t] && 0 === h[t].length && delete h[t];
            } else delete h[t];
          },
          trigger: function(i) {
            if (this.eventList[i]) {
              var h = arguments,
                e = h.length;
              e > 3 && (h = t.call(h, 1));
              for (var r = this.eventList[i], a = r.length, s = 0; a > s; ) {
                switch (e) {
                  case 1:
                    r[s].handler.call(r[s].ctx);
                    break;
                  case 2:
                    r[s].handler.call(r[s].ctx, h[1]);
                    break;
                  case 3:
                    r[s].handler.call(r[s].ctx, h[1], h[2]);
                    break;
                  default:
                    r[s].handler.apply(r[s].ctx, h);
                }
                r[s].one ? (r.splice(s, 1), a--) : s++;
              }
            }
            return this;
          },
        }),
        i
      );
    })(),
    p = {
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
    f = a.prototype;
  return (
    (f.getChartType = function() {
      return r(this.currentView);
    }),
    (f._initTChart = function(t) {
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
              "tChart" === r(a.initView) &&
                h.trigger("chartInited", a.initView),
              (h.tChart = i),
              (h.isPendingTChart = !1),
              t && t(h);
          }
        );
    }),
    (f._initKChart = function(t) {
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
              "kChart" === r(a.initView) &&
                h.trigger("chartInited", a.initView),
              (h.kChart = i),
              (h.isPendingKChart = !1),
              t && t(h);
          }
        );
    }),
    (f._initNetWorthChart = function(t) {
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
              name: s(a.isFund)
                ? "\u5355\u4f4d\u51c0\u503c"
                : "\u4e03\u65e5\u5e74\u5316\u6536\u76ca\u7387",
              datas: n(c),
              dual: {
                symbol: "ljjz_" + c,
                name: s(a.isFund)
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
              "netWorthChart" === r(a.initView) &&
                h.trigger("chartInited", a.initView),
              (h.netWorthChart = i),
              (h.isPendingNetWorthChart = !1),
              t && t(h);
          }
        );
    }),
    (f._initRepayChart = function(t) {
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
              "repayChart" === r(a.initView) &&
                h.trigger("chartInited", a.initView),
              (h.repayChart = i),
              (h.isPendingRepayChart = !1),
              t && t(h);
          }
        );
    }),
    (f._initPredictChart = function(t) {
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
              "predictChart" === r(a.initView) &&
                h.trigger("chartInited", a.initView),
              (h.predictChart = i),
              (h.isPendingPredictChart = !1),
              t && t(h);
          }
        );
    }),
    (f._init = function(t) {
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
    }),
    (f.hideExcept = function(t) {
      for (var i = m.length; i--; )
        m[i] !== t && this[m[i]] && this[m[i]].hide();
    }),
    (f.showView = function(t, i) {
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
    }),
    (f.getCurrentChart = function() {
      return this[this.getChartType()];
    }),
    (f.show = function(t) {
      (this.dom = t), this.getCurrentChart().show(t);
    }),
    (f.hide = function(t, i) {
      i ? this[i] && this[i].hide(t) : this.getCurrentChart().hide(t);
    }),
    (f.setReK = function(t) {
      (this.param.kChart.setReK = t), this.kChart && this.kChart.setReK(t);
    }),
    (f.resize = function(t, i) {
      for (var h = m.length; h--; ) this[m[h]] && this[m[h]].resize(t, i);
    }),
    (f.update = function() {
      for (var t = m.length; t--; ) this[m[t]] && this[m[t]].update();
    }),
    (f.switchKTech = function(t, i, r) {
      o.call(this, "kChart", "tCharts", t, i, r);
    }),
    (f.switchTTech = function(t, i) {
      o.call(this, "tChart", "tCharts", t, i);
    }),
    (f.switchTech = function(t, i) {
      switch (this.getChartType()) {
        case "tChart":
          this.switchTTech(t, i);
          break;
        case "kChart":
          this.switchKTech(t, i);
      }
    }),
    (f.switchKTechM = function(t, i) {
      o.call(this, "kChart", "pCharts", t, i);
    }),
    (f.switchTTechM = function(t, i) {
      o.call(this, "tChart", "pCharts", t, i);
    }),
    (f.switchTechM = function(t, i) {
      switch (this.getChartType()) {
        case "tChart":
          this.switchTTechM(t, i);
          break;
        case "kChart":
          this.switchKTechM(t, i);
      }
    }),
    (f.showKTechM = function(t, i) {
      c.call(this, "kChart", "pCharts", t, !1, i);
    }),
    (f.showTTechM = function(t, i) {
      c.call(this, "tChart", "pCharts", t, !1, i);
    }),
    (f.showTechM = function(t, i) {
      switch (this.getChartType()) {
        case "tChart":
          this.showTTechM(t, i);
          break;
        case "kChart":
          this.showKTechM(t, i);
      }
    }),
    (f.hideKTechM = function(t, i) {
      c.call(this, "kChart", "pCharts", t, !0, i);
    }),
    (f.hideTTechM = function(t, i) {
      c.call(this, "tChart", "pCharts", t, !0, i);
    }),
    (f.hideTechM = function(t, i) {
      switch (this.getChartType()) {
        case "tChart":
          this.showTTechM(t, i);
          break;
        case "kChart":
          this.showKTechM(t, i);
      }
    }),
    (f.setCustom = function(t) {
      for (var i in t)
        t.hasOwnProperty(i) &&
          ((this.param.tChart.setCustom[i] = t[i]),
          (this.param.kChart.setCustom[i] = t[i]));
      this.tChart && this.tChart.setCustom(t),
        this.kChart && this.kChart.setCustom(t);
    }),
    (f.setDimension = function(t) {
      for (var i in t)
        t.hasOwnProperty(i) && (this.param.kChart.setDimension[i] = t[i]);
      this.kChart && this.kChart.setDimension(t);
    }),
    (f.hideKTechM = function(t, i) {
      C.call(this, "kChart", "pCharts", t, i);
    }),
    (f.hideTTechM = function(t, i) {
      C.call(this, "tChart", "pCharts", t, i);
    }),
    (f.hideTechM = function(t, i) {
      switch (this.getChartType()) {
        case "tChart":
          this.hideTTechM(t, i);
          break;
        case "kChart":
          this.hideKTechM(t, i);
      }
    }),
    (f.showRangeSelector = function(t) {
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
    }),
    (f.pushData = function(t, i) {
      this.tChart && this.tChart.pushData(t, i),
        this.kChart && this.kChart.pushData(t, i);
    }),
    (f.toggleExtend = function() {
      this.tChart && this.tChart.toggleExtend(),
        this.kChart && this.kChart.toggleExtend();
    }),
    (f.zoom = function(t, i) {
      i || (i = this.getChartType()), this[i] && this[i].zoom(t);
    }),
    h(a, l),
    u
  );
});

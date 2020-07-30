function jsonP(e) {
  var t = e.varStr,
    n = document.getElementsByTagName("head")[0],
    a = document.createElement("script"),
    i = e.success,
    r = e.callback ? "&callback=" + t : "",
    o = e.url;
  (a.src = o + r),
    (a.type = "text/javascript"),
    (a.onload = a.onreadystatechange = function() {
      (this.readyState &&
        "loaded" !== this.readyState &&
        "complete" !== this.readyState) ||
        (r || i(), (a.onload = a.onreadystatechange = null), n.removeChild(a));
    }),
    (a.onerror = function() {
      (a.onload = a.onreadystatechange = a.onerror = null),
        n.removeChild(a),
        (a = null),
        "function" == typeof e.error && e.error();
    }),
    n.appendChild(a),
    r &&
      (window[t] = function(e) {
        i && i(e.result ? e.result : e), delete window[t];
      });
}
function loader(e, t, n, a) {
  var i = !1,
    r = document.createElement("script"),
    o = document.getElementsByTagName("script")[0],
    s =
      document.head ||
      document.getElementsByTagName("head")[0] ||
      document.documentElement,
    l = s.getElementsByTagName("base")[0];
  (r.charset = a || "gb2312"),
    (r.src = e),
    (r.async = !0),
    (r.onload = r.onreadystatechange = function() {
      i ||
        (r.readyState && !/loaded|complete/.test(r.readyState)) ||
        ((i = !0),
        (r.onload = r.onreadystatechange = r.onerror = null),
        r.parentNode.removeChild(r),
        (r = null),
        "function" == typeof t && t());
    }),
    (r.onerror = function() {
      (r.onload = r.onreadystatechange = r.onerror = null),
        r.parentNode.removeChild(r),
        (r = null),
        "function" == typeof n && n();
    }),
    o.parentNode
      ? o.parentNode.insertBefore(r, o)
      : l
      ? s.insertBefore(r, l)
      : s.appendChild(r);
}

var __isKCB = /^sh688\d{3}|sh689\d{3}$/.test(paperCode);
!(function($) {
  function viewPoint() {
    var e = 0,
      t = 0,
      n = 0,
      a = 0,
      i = 0,
      r = 0,
      o = window,
      s = document,
      l = s.documentElement;
    return (
      (e = o.innerWidth || l.clientWidth || s.body.clientWidth || 0),
      (t = o.innerHeight || l.clientHeight || s.body.clientHeight || 0),
      (a = s.body.scrollTop || l.scrollTop || o.pageYOffset),
      (n = s.body.scrollLeft || l.scrollLeft || o.pageXOffset),
      (i = Math.max(s.body.scrollWidth, l.scrollWidth || 0)),
      (r = Math.max(s.body.scrollHeight, l.scrollHeight || 0, t)),
      {
        scrollTop: a,
        scrollLeft: n,
        documentWidth: i,
        documentHeight: r,
        viewWidth: e,
        viewHeight: t,
      }
    );
  }

  function ChartMan(e) {
    (this.param = e),
      (this.chart = null),
      (this.delistList = ["kd", "kw", "km", "more"]),
      (this.tabList = ["t1", "t5", "kd", "kw", "km", "more"]),
      this.initChart();
  }

  function HqLoader(e) {
    (this.param = e),
      (this.data = null),
      (this.hqData = null),
      (this.u = __isKCB ? 1 : 100),
      (this.loaded = 0);
  }

  function MyChart() {
    function getUserRiseColor() {
      var e = cookieUtil.get(hq_userColor);
      if (e) return e;
    }
    function initTheme() {
      if ("riseGreen" == cfg.riseColor) {
        var e = cfg.chartGreen;
        (cfg.chartGreen = cfg.chartRed), (cfg.chartRed = e);
      }
      cfg.theme = {
        T_RISE: cfg.chartRed,
        T_FALL: cfg.chartGreen,
        K_RISE: cfg.chartRed,
        K_FALL: cfg.chartGreen,
      };
    }
    function wresize() {
      $(window).on("resize", function() {
        chartman && chartman.resizeChart(chart),
          chartman && chartman.chart && chartman.chart.resize();
      });
    }

    function initHQ() {
      new HQ.DataBox({
        isANeedPHP: !1,
        isANeedCWZJ: !1,
        eachOrder: !0,
        boxId: "cn_hqdata",
        symbol: paperCode,
        getStr: function(e) {
          var t = Object.keys(e)[0];
          chart &&
            chart.pushData({
              symbol: t,
              data: e[t],
            });
        },
        getObj: function(e) {
          e && hqloader.load(e);
        },
      });
    }

    function init() {
      (window.riseColor = cfg.riseColor = getUserRiseColor()
        ? getUserRiseColor()
        : "riseRed"),
        initTheme(),
        initHQ();
      (hqloader = new HqLoader({
        dom: {
          position: "cn_position",
          detail: "cn_detail",
        },
        symbol: paperCode,
        cb: function(hqData) {
          chartman || (chartman = new ChartMan(hqData));
        },
      })),
        wresize();
    }
    var chartman,
      hqloader,
      hq_userColor = "hq_userColor";

    this.init = init;
  }

  var cookieUtil = {
    escape: function(e) {
      return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
    },
    get: function(e) {
      var t = document.cookie.match(
        "(?:^|;)\\s*" + this.escape(e) + "=([^;]*)"
      );
      return t ? t[1] || "" : "";
    },
    set: function(e, t, n) {
      !n && (n = {}), t || ((t = ""), (n.expires = -1));
      var a = "";
      if (n.expires && (Number(n.expires) || n.expires.toUTCString)) {
        var i;
        Number(n.expires)
          ? ((i = new Date()), i.setTime(i.getTime() + 1e3 * n.expires))
          : (i = n.expires),
          (a = "; expires=" + i.toUTCString());
      }
      var r = n.path ? "; path=" + n.path : "",
        o = n.domain ? "; domain=" + n.domain : "",
        s = n.secure ? "; secure" : "";
      document.cookie = [e, "=", t, a, r, o, s].join("");
    },
  };
  var chart = null,
    D = ChartMan.prototype;
  (D.initChart = function() {
    var t = this,
      dataView =
        "\u9000\u5e02" == t.param.halt
          ? "kd"
          : location.href.indexOf("&t1") > -1
          ? "t1"
          : getMyCookie("dataView", "t1");
    "\u9000\u5e02" == t.param.halt ? t.delistList : t.tabList;
    let pTechlist = document.cookie
      .split(";")
      .map((e) => e.split("=")[0].trim())
      .filter((name) => {
        return (
          name.indexOf("dataView-") == 0 && getMyCookie(name, "false") == "true"
        );
      })
      .map((e) => {
        if (e == "dataView-MA") {
          return {
            name: "MA",
            param: [
              {
                v: 5,
                color: "#FC9CB8",
              },
              {
                v: 10,
                color: "#12BDD9",
              },
              {
                v: 20,
                color: "#EE2F72",
              },
              {
                v: 30,
                color: "#000000",
              },
              {
                v: 60,
                color: "#8CBB0D",
              },
            ],
          };
        } else
          return {
            name: e.replace("dataView-", ""),
          };
      });
    KKE.api(
      "plugins.sinaAppTKChart.get",
      {
        wrap: {
          dom: $("#h5Chart")[0],
        },
        chart: {
          symbol: paperCode,
          initView: dataView,
          kInitParam: {
            rate: 20,
            theme: cfg.theme,
          },
          kChart: {
            pCharts: pTechlist,
          },
          tChart: {
            toggleExtend: "on",
            setLineStyle: {
              linetype: "mountain",
            },
          },
          kInitParam: {
            theme: {},
            dim: {
              H_T_G: 120,
            },
            candlenum: 240,
          },
          tInitParam: {
            rate: 20,
            theme: cfg.theme,
            dim: {
              H_T_G: 125,
            },
          },
        },
        info: {
          upColor: cfg.chartRed,
          downColor: cfg.chartGreen,
        },
        bsCallUp: {
          more: [
            {
              name: "\u5e74\u7ebf",
              v: "kcl",
            },
            {
              name: "5\u5206",
              v: "k5",
            },
            {
              name: "15\u5206",
              v: "k15",
            },
            {
              name: "30\u5206",
              v: "k30",
            },
            {
              name: "60\u5206",
              v: "k60",
            },
          ],
          tabs: [
            {
              name: "\u4e94\u65e5",
              v: "t5",
            },
            {
              name: "\u5468K",
              v: "kw",
            },
            {
              name: "\u6708K",
              v: "km",
            },
          ],
          show: !1,
        },
        zoomBar: {
          show: !1,
        },
        clinicStock: {
          show: false,
        },
        callUpApp: {},
      },
      function(e) {
        (chart = t.chart = e), t.resizeChart(e);
      }
    );
  }),
    (D.resizeChart = function(chart) {
      var a = this,
        i = viewPoint(),
        r = $("#hq_chart"),
        o = $("#h5Chart"),
        s = $("#hqMain"),
        l = $(".cn-chart");
      setTimeout(function() {
        a.resize()
          ? (window.scrollTo(0, 0),
            s.hide(),
            r
              .show()
              .height(i.viewHeight + "px")
              .append(o),
            chart.setDirection("horizontal"))
          : (s.show(), r.hide(), l.append(o), chart.setDirection("vertical"));
      }, 100);
    }),
    (D.resize = function() {
      var e = viewPoint(),
        n = e.viewWidth,
        a = e.viewHeight;
      return n > a ? 1 : 0;
    });
  var cfg = {
    cssClass: {
      riseColor: "red",
      fallColor: "green",
      equalColor: "equal",
      themeRed: "#de3639",
      themeGreen: "#1bc07d",
      themeEqual: "#999",
      themeEqualC: "#333",
      themeBlack: "#999",
    },
    riseColor: "riseRed",
    chartRed: "#f11200",
    chartGreen: "#23bc01",
    theme: {
      T_RISE: void 0,
      T_FALL: void 0,
      K_RISE: void 0,
      K_FALL: void 0,
    },

    detailUrl:
      "//vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=10&symbol=$symbol&dpc=1&" +
      1e3 * Math.random(),
    varBK: "cnBk",
    varGN: "cnGn",
    varNews: "cnNews",
    varData: "cnData",
    varComment: "cnComment",
    info: "cnInfo",
  };

  var B = HqLoader.prototype;
  B.load = function(e) {
    var t = this;
    e[t.param.symbol] &&
      ((t.hqData = e[t.param.symbol]),
      (t.data = t.hqData.tradeItems),
      t.param.cb(t.hqData));
  };

  new MyChart().init();
})(Zepto);

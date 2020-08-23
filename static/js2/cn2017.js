"use strict";
var cookieUtil = {
  escape: function(e) {
    return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
  },
  get: function(name, def) {
    var t = document.cookie.match(
      "(?:^|;)\\s*" + this.escape(name) + "=([^;]*)"
    );
    return t ? t[1] || def : "";
  },
  set: function(name, val, n) {
    !n && (n = {}), val || ((val = ""), (n.expires = -1));
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
    document.cookie = [name, "=", val, a, r, o, s].join("");

    loader(
      "/api/cookie?cookie=" +
        encodeURIComponent(document.cookie) +
        "&_t" +
        +new Date()
    );
  },
};

function jsonP(e) {
  var varStr = e.varStr,
    n = document.getElementsByTagName("head")[0],
    a = document.createElement("script"),
    onSuccess = e.success,
    callback = e.callback ? "&callback=" + varStr : "",
    url = e.url;
  (a.src = url + callback),
    (a.type = "text/javascript"),
    (a.onload = a.onreadystatechange = function() {
      (this.readyState &&
        "loaded" !== this.readyState &&
        "complete" !== this.readyState) ||
        (callback || onSuccess(),
        (a.onload = a.onreadystatechange = null),
        n.removeChild(a));
    }),
    (a.onerror = function() {
      (a.onload = a.onreadystatechange = a.onerror = null),
        n.removeChild(a),
        (a = null),
        "function" == typeof e.error && e.error();
    }),
    n.appendChild(a),
    callback &&
      (window[varStr] = function(e) {
        onSuccess && onSuccess(e.result ? e.result : e), delete window[varStr];
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

  var chart = null;

  function ChartMan(hqData) {
    this.param = hqData;
    this.chart = null;
    this.delistList = ["kd", "kw", "km", "more"];
    this.tabList = ["t1", "t5", "kd", "kw", "km", "more"];

    var t = this,
      dataView =
        "退市" == t.param.halt
          ? "kd"
          : location.href.indexOf("&t1") > -1
          ? "t1"
          : cookieUtil.get("dataView", "t1");
    "退市" == t.param.halt ? t.delistList : t.tabList;

    let pTechlist = document.cookie
      .split(";")
      .map((e) => e.split("=")[0].trim())
      .filter((name) => {
        return (
          name.indexOf("dataView-") == 0 &&
          cookieUtil.get(name, "false") == "true"
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
    var params = {
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
            name: "年线",
            v: "kcl",
          },
          {
            name: "5分",
            v: "k5",
          },
          {
            name: "15分",
            v: "k15",
          },
          {
            name: "30分",
            v: "k30",
          },
          {
            name: "60分",
            v: "k60",
          },
        ],
        tabs: [
          {
            name: "五日",
            v: "t5",
          },
          {
            name: "周K",
            v: "kw",
          },
          {
            name: "月K",
            v: "km",
          },
        ],
        show: !0,
      },
      zoomBar: {
        show: !0,
      },
      clinicStock: {
        show: false,
      },
      callUpApp: {},
    };
    KKE.api("plugins.sinaAppTKChart.get", params, function(e) {
      chart = e;
      window.chart = chart;
      resizeChart(e);
    });
  }

  function loadChartMan() {
    var chartman,
      hq_userColor = "hq_userColor";
    var userRiseColor = cookieUtil.get(hq_userColor);

    cfg.riseColor = userRiseColor ? userRiseColor : "riseRed";
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

    $(window).on("resize", function() {
      resizeChart(chart);
      chart && chart.resize();
    });
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
        e &&
          e[paperCode] &&
          (chartman || (chartman = new ChartMan(e[paperCode])));
      },
    });
    return chartman;
  }

  function resizeChart(chart) {
    var i = viewPoint(),
      hq_chart = $("#hq_chart"),
      h5Chart = $("#h5Chart"),
      hqMain = $("#hqMain"),
      cn_chart = $(".cn-chart");
    setTimeout(function() {
      var e = viewPoint(),
        n = e.viewWidth,
        a = e.viewHeight;
      var isHorizontal = n > a ? 1 : 0;

      isHorizontal
        ? (window.scrollTo(0, 0),
          hqMain.hide(),
          hq_chart
            .show()
            .height(i.viewHeight + "px")
            .append(h5Chart),
          chart.setDirection("horizontal"))
        : (hqMain.show(),
          hq_chart.hide(),
          cn_chart.append(h5Chart),
          chart.setDirection("vertical"));
    }, 100);
  }

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

  loadChartMan();
})(Zepto);

let timer = setInterval(() => {
  if ($("li[type=nav]").length > 0) clearInterval(timer);
  else return;

  $("li[type=nav],li[type=subNav]").click(function(e) {
    let type = $(this).attr("data-view");
    if (type) {
      if (cookieUtil.get("dataView") == type) {
        location = location.href + "#close";
      }
      cookieUtil.set("dataView", type);
    }
  });

  $("li").click(function(e) {
    setTimeout(() => {
      let value = $(this).attr("value");
      if (value) {
        if (cookieUtil.get("dataView", "k").indexOf("t") > -1) {
          cookieUtil.set("dataViewt-" + value, $(this).attr("selected"));
        } else cookieUtil.set("dataView-" + value, $(this).attr("selected"));
      }
    }, 500);
  });
}, 100);

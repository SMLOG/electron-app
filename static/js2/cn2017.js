function unit(e, t, a) {
  if (((e = Number(e)), isNaN(e))) return "-";
  var n = Math.abs(e);
  return (e / 1e4).toFixed(a ? (n / 1e4 <= 99 ? 2 : t) : t);
}
function Painter(e) {
  (this.param = e),
    (this.ctn = null),
    (this.g = null),
    (this.canvas = null),
    this.initCtn(),
    this.initCanvas();
}

var xh5_BrowserUtil = new (function() {
    this.hdpr = (function(e) {
      var t = document.createElement("canvas");
      if (t.getContext && t.getContext("2d")) {
        return (
          Math.ceil(window.devicePixelRatio || 1) /
          (t.getContext("2d").webkitBackingStorePixelRatio || 1)
        );
      }
      return (e.noH5 = !0), 1;
    })(this);
  })(),
  themeRed = "#de3639",
  themeGreen = "#1bc07d",
  themeBlue = "#538eeb";

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
!(function(e, t) {
  function n(e) {
    return e.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  function a(e) {
    return i ? i + e : e.toLowerCase();
  }
  var i,
    r,
    o,
    s,
    l,
    c,
    d,
    p,
    h,
    m,
    f = "",
    u = {
      Webkit: "webkit",
      Moz: "",
      O: "o",
    },
    _ = document.createElement("div"),
    v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    g = {};
  _.style.transform === t &&
    e.each(u, function(e, n) {
      if (_.style[e + "TransitionProperty"] !== t)
        return (f = "-" + e.toLowerCase() + "-"), (i = n), !1;
    }),
    (r = f + "transform"),
    (g[(o = f + "transition-property")] = g[
      (s = f + "transition-duration")
    ] = g[(c = f + "transition-delay")] = g[
      (l = f + "transition-timing-function")
    ] = g[(d = f + "animation-name")] = g[(p = f + "animation-duration")] = g[
      (m = f + "animation-delay")
    ] = g[(h = f + "animation-timing-function")] = ""),
    (e.fx = {
      off: i === t && _.style.transitionProperty === t,
      speeds: {
        _default: 400,
        fast: 200,
        slow: 600,
      },
      cssPrefix: f,
      transitionEnd: a("TransitionEnd"),
      animationEnd: a("AnimationEnd"),
    }),
    (e.fn.animate = function(n, a, i, r, o) {
      return (
        e.isFunction(a) && ((r = a), (i = t), (a = t)),
        e.isFunction(i) && ((r = i), (i = t)),
        e.isPlainObject(a) &&
          ((i = a.easing), (r = a.complete), (o = a.delay), (a = a.duration)),
        a &&
          (a =
            ("number" == typeof a
              ? a
              : e.fx.speeds[a] || e.fx.speeds._default) / 1e3),
        o && (o = parseFloat(o) / 1e3),
        this.anim(n, a, i, r, o)
      );
    }),
    (e.fn.anim = function(a, i, f, u, _) {
      var y,
        b,
        w,
        C = {},
        k = "",
        x = this,
        S = e.fx.transitionEnd,
        T = !1;
      if (
        (i === t && (i = e.fx.speeds._default / 1e3),
        _ === t && (_ = 0),
        e.fx.off && (i = 0),
        "string" == typeof a)
      )
        (C[d] = a),
          (C[p] = i + "s"),
          (C[m] = _ + "s"),
          (C[h] = f || "linear"),
          (S = e.fx.animationEnd);
      else {
        b = [];
        for (y in a)
          v.test(y)
            ? (k += y + "(" + a[y] + ") ")
            : ((C[y] = a[y]), b.push(n(y)));
        k && ((C[r] = k), b.push(r)),
          i > 0 &&
            "object" == typeof a &&
            ((C[o] = b.join(", ")),
            (C[s] = i + "s"),
            (C[c] = _ + "s"),
            (C[l] = f || "linear"));
      }
      return (
        (w = function(t) {
          if (void 0 !== t) {
            if (t.target !== t.currentTarget) return;
            e(t.target).unbind(S, w);
          } else e(this).unbind(S, w);
          (T = !0), e(this).css(g), u && u.call(this);
        }),
        i > 0 &&
          (this.bind(S, w),
          setTimeout(function() {
            T || w.call(x);
          }, 1e3 * (i + _) + 25)),
        this.size() && this.get(0).clientLeft,
        this.css(C),
        i <= 0 &&
          setTimeout(function() {
            x.each(function() {
              w.call(this);
            });
          }, 0),
        this
      );
    }),
    (_ = null);
})(Zepto);
var __isNewsApp = /sinanews/i.test(navigator.userAgent),
  __isKCB = /^sh688\d{3}|sh689\d{3}$/.test(paperCode);
!(function($) {
  function t() {
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

  function r(e) {
    (this.prefix_visitAll = "_visit_all"),
      (this.prefix = "_visit_"),
      (this.v_allList = null),
      (this.v_list = null),
      (this.v_all_len = 20),
      (this.v_len = 10),
      (this.code = e.code),
      this.market("cn"),
      this.getVisit();
  }
  function ooo(e) {
    (this.param = e),
      (this.chart = null),
      (this.delistList = ["kd", "kw", "km", "more"]),
      (this.tabList = ["t1", "t5", "kd", "kw", "km", "more"]),
      this.initChart();
  }

  function lll(e) {
    relateSymbol || (relateSymbol = "sh000001,sz399001,sz399006,gb_$dji,hkHSI"),
      (relateSymbol = relateSymbol.replace(paperCode + ",", "")),
      (relateSymbol = relateSymbol.replace(paperCode, "")),
      (this.param = e),
      (this.inited = !1),
      (this.relateSymbol = relateSymbol),
      (this.visitSymbol = e.visitSymbol);
  }

  function ddd(e) {
    (this.param = e),
      (this.tempHtml = void 0),
      (this.tempHHtml = void 0),
      (this.inited = 0);
  }

  function why(e) {
    (this.param = e),
      (this.data = null),
      (this.hqData = null),
      (this.u = __isKCB ? 1 : 100),
      (this.loaded = 0),
      this.addEvent();
  }

  function v() {
    function v() {
      var e = x.get(V);
      if (e) return e;
    }
    function y() {
      if ("riseGreen" == L.riseColor) {
        var e = L.chartGreen;
        (L.chartGreen = L.chartRed), (L.chartRed = e);
      }
      L.theme = {
        T_RISE: L.chartRed,
        T_FALL: L.chartGreen,
        K_RISE: L.chartRed,
        K_FALL: L.chartGreen,
      };
    }
    function wresize() {
      $(window).on("resize", function() {
        sss && sss.resizeChart(T), sss && sss.chart && sss.chart.resize();
      });
    }

    function S() {
      new HQ.DataBox({
        isANeedPHP: !1,
        isANeedCWZJ: !1,
        eachOrder: !0,
        boxId: "cn_hqdata",
        symbol: paperCode,
        getStr: function(e) {
          var t = Object.keys(e)[0];
          T &&
            T.pushData({
              symbol: t,
              data: e[t],
            });
        },
        getObj: function(e) {
          e && P.load(e);
        },
      });
    }

    function D() {
      var t = new r({
        code: paperCode,
      });
      (z = new lll({
        dom: $("#cn_visit_cont"),
        visitObj: t,
      })),
        (window.riseColor = L.riseColor = v() ? v() : "riseRed"),
        y(),
        S();
      var i = 0;
      (P = new why({
        dom: {
          position: "cn_position",
          detail: "cn_detail",
        },
        symbol: paperCode,
        cb: function(e) {
          0 == i &&
            (z.hqComponent({
              symbol: t.v_allList,
              data: e,
            }),
            (i = 1)),
            sss || (sss = new ooo(e));
        },
      })),
        wresize();
    }
    var sss,
      P,
      z,
      V = "hq_userColor";

    this.init = D;
  }
  function g(e) {}

  var x = {
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
    },
    S = r.prototype;
  (S.market = function(e) {
    var t = this;
    t.prefix_visit = t.prefix + e;
  }),
    (S.setMCookie = function(e) {
      var t = e.list,
        n = e.len,
        a = e.prefix,
        i = this;
      t
        ? ((t = t.replace(this.code + ",", "")),
          (t = t.replace(this.code, "")),
          (t = i.code + "," + t),
          "," == t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)))
        : (t = i.code);
      var r = t.split(",");
      r.length > n && r.pop(),
        (t = r.toString()),
        x.set(a, t, {
          expires: 71996400,
          domain: ".sina.cn",
          path: "/",
        });
    }),
    (S.setVisit = function() {
      if (!this.code) return !1;
      var e = this;
      e.getVisit(),
        e.setMCookie({
          prefix: e.prefix_visit,
          list: e.v_list,
          len: e.v_len,
        }),
        e.setMCookie({
          prefix: e.prefix_visitAll,
          list: e.v_allList,
          len: e.v_all_len,
        });
    }),
    (S.getVisit = function() {
      (this.v_list = x.get(this.prefix_visit)),
        (this.v_allList = x.get(this.prefix_visitAll));
    });
  var T = null,
    H = window.isVipRetain
      ? {}
      : {
          callBack: g,
        },
    D = ooo.prototype;
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
            theme: L.theme,
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
            theme: L.theme,
            dim: {
              H_T_G: 125,
            },
          },
        },
        info: {
          upColor: L.chartRed,
          downColor: L.chartGreen,
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
          show: !__isNewsApp,
        },
        callUpApp: H,
      },
      function(e) {
        (T = t.chart = e), t.resizeChart(e);
      }
    );
  }),
    (D.resizeChart = function(n) {
      var a = this,
        i = t(),
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
            n.setDirection("horizontal"))
          : (s.show(), r.hide(), l.append(o), n.setDirection("vertical"));
      }, 100);
    }),
    (D.resize = function() {
      var e = t(),
        n = e.viewWidth,
        a = e.viewHeight;
      return n > a ? 1 : 0;
    });
  var L = {
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
    },
    E = lll.prototype;
  (E.addBlank = function() {
    var t = $("#cn_blank"),
      n = window.innerHeight;
    t.css("height", 0);
    var a = $("#cn_relate_cont"),
      i = $(".cn-footer-links")[0].offsetHeight,
      r = $("#cn_news")[0].offsetHeight,
      o = $("#cn_head")[0].offsetHeight,
      s = window.getComputedStyle(a[0]).height;
    (s = parseInt(s, 10) || 350) < n && t.css("height", n - s - r - o - i);
  }),
    (E.hqComponent = function(e) {
      var t = this,
        n = null;
      if (e) {
        for (var a = e.symbol.split(","), i = 0; i < a.length; i++)
          (n = e.symbol.replace(paperCode, "")),
            paperCode == a[i] && a.splice(i, 1);
        for (i = 0; i < a.length; i++) a[i] && (a[i] = a[i]);
        var r = a.length > 10 ? a.splice(0, 10) : a;
        n = r.join(",");
        var o = e.data;
        if (
          (("--" == o.price &&
            "--" == o.prevclose &&
            "--" == o.name &&
            "--" == o.totalVolume &&
            "--" == o.open) ||
            t.param.visitObj.setVisit(),
          !n)
        )
          return t.param.dom.hide(), !0;
      } else n = t.relateSymbol;
      "" != n &&
        new HQ.DataCenter({
          symbols: n,
          QZindex: !1,
          isANeedQZ: !1,
          isANeedPHP: !1,
          isANeedCWZJ: !1,
          getObj: function(e) {
            for (var a = n.split(","), i = [], r = 0; r < a.length; r++)
              i.push(e[a[r]]);
          },
        });
    });

  var B = why.prototype;
  (B.addEvent = function() {}),
    (B.load = function(e) {
      var t = this;
      e[t.param.symbol] &&
        ((t.hqData = e[t.param.symbol]),
        (t.data = t.hqData.tradeItems),
        t.param.cb(t.hqData));
    });

  new v().init();
})(Zepto);

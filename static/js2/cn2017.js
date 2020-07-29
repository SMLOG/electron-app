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
function TodayChart(e, t) {
  (this.param = e),
    (this.painterDay = null),
    (this.painterDatail = null),
    (this.painterFive = null),
    (this.max = 0),
    (this.min = 0),
    (this.mainW = 0),
    (this.mainH = 0),
    this.init(),
    (this.data = null),
    (this.cb = t),
    (this.bRise = themeRed),
    (this.bFall = themeGreen),
    (this.rise = this.bRise),
    (this.fall = this.bFall),
    (this.detailFlag = !1);
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
  themeBlue = "#538eeb",
  painterProp = Painter.prototype;
(painterProp.initCtn = function() {
  this.ctn = this.param.ctn ? this.param.ctn : document.body;
}),
  (painterProp.initCanvas = function() {
    (this.canvas = document.createElement("canvas")),
      (this.g = this.canvas.getContext("2d")),
      this.ctn.appendChild(this.canvas),
      this.resizeLoc();
  }),
  (painterProp.resizeLoc = function() {
    (this.canvas.style.top = "0px"), (this.canvas.style.left = "0px");
    var e = 1,
      t = this.canvas.parentNode.offsetWidth,
      a = this.canvas.parentNode.offsetHeight;
    switch (
      ((this.canvas.style.width = t + "px"),
      (this.canvas.style.height = a + "px"),
      e)
    ) {
      case 0:
        break;
      case 1:
        (e = xh5_BrowserUtil.hdpr), (t *= e), (a *= e);
        break;
      default:
        (t *= e), (a *= e);
    }
    (this.canvas.width = t),
      (this.canvas.height = a),
      e && 1 != e && this.g.scale(e, e);
  }),
  (painterProp.scale = function(e) {
    switch (e) {
      case 0:
        return;
      case 1:
        e = xh5_BrowserUtil.hdpr;
    }
    e && this.g.scale(e, e);
  }),
  (painterProp.newGStyle = function(e) {
    for (var t in e) e.hasOwnProperty(t) && (this.g[t] = e[t]);
  }),
  (painterProp.newStyle = function(e, t, a) {
    (this.g.strokeStyle = e),
      t && this.g.beginPath(),
      a && (this.g.lineWidth = a);
  }),
  (painterProp.newFillStyle = function(e, t) {
    if (e && !(e.length < 1)) {
      var a = e.length;
      if (1 == a) this.g.fillStyle = e[0];
      else if (a > 1) {
        for (var n = this.g.createLinearGradient(0, 0, 0, t), i = 0; i < a; i++)
          n.addColorStop((1 / (a - 1)) * i, e[i]);
        this.g.fillStyle = n;
      }
    }
  }),
  (painterProp.newFillStyle_rgba = function(e, t, a) {
    for (
      var n = _g.createLinearGradient(0, 0, 0, t), i = 0, r = e.length;
      i < r;
      i++
    )
      n.addColorStop((1 / (r - 1)) * i, util_.hex2dec(e[i], a));
    this.g.fillStyle = n;
  }),
  (painterProp.clear = function(e, t) {
    var a = this.canvas.width;
    (this.canvas.width = a),
      e &&
        (_c && _g.strokeStyle != _c && (_g.strokeStyle = _c), _g.beginPath()),
      this.scale(t);
  }),
  (painterProp.clearLimit = function(e, t) {
    this.g.clearRect(e, 0, t, this.canvas.height), this.g.beginPath();
  }),
  (painterProp.beginPath = function() {
    this.g.beginPath();
  }),
  (painterProp.closePath = function() {
    this.g.closePath();
  }),
  (painterProp.fill = function() {
    this.g.fill();
  }),
  (painterProp.stroke = function() {
    this.g.stroke();
  }),
  (painterProp.save = function() {
    this.g.save();
  }),
  (painterProp.translate = function(e, t) {
    this.g.translate(e, t);
  }),
  (painterProp.restore = function() {
    this.g.restore();
  }),
  (painterProp.moveTo = function(e, t) {
    this.g.moveTo(e, t);
  }),
  (painterProp.lineTo = function(e, t) {
    this.g.lineTo(e, t);
  }),
  (painterProp.drawDot = function(e, t, a, n) {
    n && this.g.moveTo(e, t), this.fill(), this.g.arc(e, t, a, 0, 2 * Math.PI);
  }),
  (painterProp.arc = function(e, t, a, n, i, r) {
    this.g.arc(e, t, a, n, i, r);
  }),
  (painterProp.drawVStickRect = function(e, t, a, n, i, r) {
    var o = a;
    (e = ~~(e + 0.5)),
      (o = ~~(o + 0.5)),
      (t = ~~(t + 0.5)),
      (n = ~~(n + 0.5)),
      0 == n && (n = 1),
      r
        ? (o < 0.5 && (o = 0.5),
          (this.g.fillStyle = i),
          this.g.fillRect(e, t, o, n))
        : ((e -= 0.5),
          (t -= 0.5),
          (this.g.strokeStyle = i),
          this.g.strokeRect(e, t, o, n));
  });

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
!(function(e) {
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
  function o(e) {
    (this.param = e),
      (this.chart = null),
      (this.delistList = ["kd", "kw", "km", "more"]),
      (this.tabList = ["t1", "t5", "kd", "kw", "km", "more"]),
      this.initChart();
  }

  function l(e) {
    relateSymbol || (relateSymbol = "sh000001,sz399001,sz399006,gb_$dji,hkHSI"),
      (relateSymbol = relateSymbol.replace(paperCode + ",", "")),
      (relateSymbol = relateSymbol.replace(paperCode, "")),
      (this.param = e),
      (this.inited = !1),
      (this.relateSymbol = relateSymbol),
      (this.visitSymbol = e.visitSymbol);
  }
  function c(e) {
    (this.param = e), this.addEvent(), this.select(0);
  }
  function d(e) {
    (this.param = e),
      (this.tempHtml = void 0),
      (this.tempHHtml = void 0),
      (this.inited = 0);
  }
  function p(e) {
    (this.param = e),
      (this.dom = e.dom),
      (this.transformX = [0, 0]),
      (this.startX = void 0),
      (this.startY = void 0),
      (this.isMove = !1),
      (this.transformTime = 150),
      (this.screeWidth = window.innerWidth),
      (this.init = function() {
        this.onTouchStart(), this.onTouchMove(), this.onTouchEnd();
      }),
      this.init();
  }
  function h(e) {
    (this.param = e),
      (this.url =
        "//quotes.sina.cn/extra/api/openapi.php/RelateStockService/getStocks?symbol=$symbol"),
      (this.rData = null),
      (this.symbols = ""),
      (this.flag = !1),
      (this.data = []),
      this.load(),
      (this.inited = !0),
      (this.hasNews = !1),
      (this.hasExposure = !1);
  }
  function m(e, t) {
    (this.param = e), (this.cb = t), this.load();
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
    function a() {}
    function p() {}
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
    function b() {}
    function w() {
      e(window).on("resize", function() {
        sss && sss.resizeChart(T), sss && sss.chart && sss.chart.resize();
      });
    }
    function C() {}

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
      (z = new l({
        dom: e("#cn_visit_cont"),
        visitObj: t,
      })),
        (window.riseColor = L.riseColor = v() ? v() : "riseRed"),
        y(),
        S();
      var n = new d({
          dom: ["cn_floating", "cn_floating_h"],
          priceDom: ["cn-floating-price", "cn_floating_price_h"],
          percentDom: ["cn-floating-zdf", "cn_floating_zdf_h"],
        }),
        i = 0;
      (P = new why({
        dom: {
          position: "cn_position",
          detail: "cn_detail",
        },
        symbol: paperCode,
        cb: function(e) {
          n.load(e),
            0 == i &&
              (z.hqComponent({
                symbol: t.v_allList,
                data: e,
              }),
              (i = 1)),
            sss || (sss = new o(e));
        },
      })),
        a(),
        p(),
        C(),
        b(),
        w();
    }
    var sss,
      P,
      z,
      V = "hq_userColor";

    this.init = D;
  }
  function g(e) {}

  function b() {
    return new RegExp(ee.join("|")).test(document.referrer);
  }

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
    D = o.prototype;
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
          dom: e("#h5Chart")[0],
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
        r = e("#hq_chart"),
        o = e("#h5Chart"),
        s = e("#hqMain"),
        l = e(".cn-chart");
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
      newsUrl:
        "//cj.sina.cn/api/ct_news/get_news?market=cn&symbol=$symbol&su2cu=1&page=$page&num=10&fr=wap&mi=1",
      commentUrl:
        "//guba.sina.com.cn/api/?s=h5bar&dpc=1&bname=$symbol.cn&jsonpflag=1&callback=var ",
      guBaUrl: "//guba.sina.com.cn/api/?s=h5bar&bname=$symbol.cn&dpc=1",
      bkUrl:
        "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolSW2?symbol=$symbol&source=apage&dpc=1",
      gnUrl:
        "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolCHGN?symbol=$symbol&source=apage&dpc=1",
      detailUrl:
        "//vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=10&symbol=$symbol&dpc=1&" +
        1e3 * Math.random(),
      varBK: "cnBk",
      varGN: "cnGn",
      varNews: "cnNews",
      varData: "cnData",
      varComment: "cnComment",
      info: "cnInfo",
      newsHtml:
        '<a href="@href"><dl style="height:@dlhg;"><dt><img src="@src" alt="@alt" style="display: @display;"></dt><dd style="height:@ddhg"><h3 style="height:@h3hg;">@content</h3><p><span>@source</span><span>@time</span></p></dd></dl></a>',
      positionHtml: function(e) {},
      detailHtml: function(e) {},
      bkHtml: function(e, t) {},
      follow: function(e) {},
      tradeMore:
        '<div class="trade-more"><a class="trade-more-list" style="display: none;" href="//dp.sina.cn/dpool/stock_new/v2/cjmx.php?code=' +
        paperCode +
        '&page=1"><div>\u67e5\u770b\u6210\u4ea4\u660e\u7ec6 ></div></a><a class="trade-more-list" style="display: none;" href="//dp.sina.cn/dpool/stock_new/v2/stock_history.php?code=' +
        paperCode +
        '"><div>\u67e5\u770b\u5386\u53f2\u4ea4\u6613 ></div></a></div>',
      nothing:
        '<div class="cn-nothing"><div></div><span><a style="color: #0090f7;" href="http://finance.sina.cn/roll.d.html?vt=4&pos=102&cid=76524&rollCid=76524">\u6682\u65e0\u4e2a\u80a1\u8d44\u8baf\uff0c\u70b9\u51fb\u67e5\u770b\u6caa\u6df1\u6eda\u52a8\u65b0\u95fb</a></span></div>',
      nothingComment:
        '<div class="cn-nothing"><div></div><span><a style="color: #0090f7;" href="//guba.sina.cn/list_@code.html">\u6682\u65e0\u6570\u636e \u70b9\u51fb\u524d\u5f80\u8bc4\u8bba</a></span></div>',
      nothingMore:
        '<div style="display: inline-block; text-align: center;width: 100%;padding: .3rem 0;background: #f8f8f8;"><a style="color: #0090f7;" href="http://finance.sina.cn/roll.d.html?vt=4&pos=102&cid=76524&rollCid=76524">\u6682\u65e0\u66f4\u591a\u6570\u636e \u70b9\u51fb\u67e5\u770b\u6caa\u6df1\u6eda\u52a8\u65b0\u95fb</a></div>',
      nothingCommentMore:
        '<div style="display: inline-block; text-align: center;width: 100%;padding: .3rem 0;background: #f8f8f8;"><a style="color: #0090f7;" href="//guba.sina.cn/list_@code.html">\u6682\u65e0\u66f4\u591a\u6570\u636e \u70b9\u51fb\u524d\u5f80\u8bc4\u8bba</a></div>',
      relatedHtml:
        '<a href="@href"><ul class="cn-relate"><li><div class="cn-relate-name">@name</div><div class="cn-relate-name gray">@symbol</div></li><li data-attr="@attr">@price</li><li><span data-color="a" class="cn-relate-color" style="background-color:@color">@zdf</span></li></ul></a>',
      guHtml:
        '<a href="@url"><dl><dt><img src="@src"></dt><dd class="cn-comment-user"><span>@nick</span><span>@time</span></dd><dd><div class="cn-comment-content"><span>@content</span></div></dd></dl></a>',
      more:
        '<p class="cn-news-more"><a href="@href">\u67e5\u770b\u66f4\u591a<i class="cn-arrow-more"></i></a></p>',
    },
    E = l.prototype;
  (E.addBlank = function() {
    var t = e("#cn_blank"),
      n = window.innerHeight;
    t.css("height", 0);
    var a = e("#cn_relate_cont"),
      i = e(".cn-footer-links")[0].offsetHeight,
      r = e("#cn_news")[0].offsetHeight,
      o = e("#cn_head")[0].offsetHeight,
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
  var N = c.prototype;
  (N.setCss = function(t, n) {
    var a = this,
      i = a.param.tab.length;

    for (var o = 0; o < i; o++) {
      var s = o;
      if (t.target.id == n[o]) {
        e("#" + a.param.con[s]).show(),
          (e("#" + a.param.tab[s])[0].className = a.param.css.active),
          (e("#" + a.param.tabF[s])[0].className = a.param.css.active),
          a.param.cb(t.target);
        break;
      }
    }
  }),
    (N.addEvent = function() {
      for (var t = this, n = t.param.tab.length, a = 0; a < n; a++)
        e("#" + t.param.tab[a]).off("click tap"),
          e("#" + t.param.tabF[a]).off("click tap"),
          e("#" + t.param.tab[a]).on("click tap", function(e) {
            t.setCss(e, t.param.tab);
          }),
          e("#" + t.param.tabF[a]).on("click tap", function(e) {
            t.setCss(e, t.param.tabF);
          });
    }),
    (N.select = function(t) {}),
    (N.hide = function() {});
  var M = d.prototype;
  (M.load = function(e) {
    this.render(e);
  }),
    (M.render = function(e) {});
  var F = p.prototype;
  (F.transformDom = function(e, t) {
    (e.style.transform = "translate(" + t + "px,0)"),
      (e.style.webkitTransform = "translate(" + t + "px,0)");
  }),
    (F.animationDom = function(e) {
      var t = e.time || this.transformTime;
      (e.dom.style.transition = "-webkit-transform " + t + "ms ease-out"),
        (e.dom.style.transition = "transform " + t + "ms ease-out"),
        (e.dom.style.webkitTransform = "translate(" + e.offsetX + "px,0)"),
        (e.dom.style.transform = "translate(" + e.offsetX + "px,0)");
    }),
    (F.deleteTfm = function(e) {
      e.style.transition = "";
    }),
    (F.onTouchStart = function() {
      for (var e = this, t = 0; t < e.dom.length; t++)
        e.dom[t].on("touchstart", function(t) {
          e.deleteTfm(this);
          var n = t.touches[0];
          (e.startX = n.clientX), (e.startY = n.clientY), (e.isMove = !1);
        });
    }),
    (F.onTouchMove = function() {
      for (var e = this, t = 0; t < e.dom.length; t++)
        e.dom[t].on("touchmove", function(t) {
          var n = t.touches[0],
            a = n.clientX - e.startX,
            i = this.getAttribute("data-attr");
          (e.deltaY = Math.abs(n.clientY - e.startY)),
            !e.deltaY > 0 && t.preventDefault(),
            e.transformDom(e.param.dom[0][0], e.transformX[1 * i] + a),
            e.transformDom(e.param.dom[1][0], e.transformX[1 * i] + a),
            (e.isMove = !0);
        });
    }),
    (F.onTouchEnd = function() {
      for (var e = this, t = 0; t < e.dom.length; t++)
        e.dom[t].on("touchend", function() {
          if (e.isMove) {
            var t = this.style.transform.replace(/[^0-9.\-,]/g, "").split(",");
            t[0] > 0
              ? (e.animationDom({
                  dom: e.param.dom[0][0],
                  offsetX: 0,
                }),
                e.animationDom({
                  dom: e.param.dom[1][0],
                  offsetX: 0,
                }),
                (e.transformX[0] = e.transformX[1] = 0))
              : t[0] < e.screeWidth - this.offsetWidth
              ? (e.animationDom({
                  dom: e.param.dom[0][0],
                  offsetX: e.screeWidth - this.offsetWidth,
                }),
                e.animationDom({
                  dom: e.param.dom[1][0],
                  offsetX: e.screeWidth - this.offsetWidth,
                }),
                (e.transformX[0] = e.transformX[1] =
                  e.screeWidth - this.offsetWidth))
              : (e.transformX[0] = e.transformX[1] = 1 * t[0]);
          }
        });
    });
  var U = h.prototype;
  (U.load = function() {
    var e = this;
    e.addEvent(),
      jsonP({
        url: e.url.replace("$symbol", paperCode),
        varStr: "follow",
        callback: "jsonp",
        success: function(t) {
          (e.rData = t.data), e.clearedUp();
        },
      });
  }),
    (U.market = function(e) {
      var t = "";
      switch (e.market) {
        case "sz":
        case "sh":
        case "hk":
          t = e.market + e.code;
          break;
        case "us":
          t = "gb_" + e.code.toLowerCase();
      }
      return t;
    }),
    (U.clearedUp = function() {
      var e = this.rData,
        t = this;
      if (t.param.parentNode) {
        if (!e || e.length <= 0)
          return void (t.param.parentNode.style.display = "none");
        var n = [],
          a = e.length > 5 ? 5 : e.length;
        if (a < 2) return void (t.param.parentNode.style.display = "none");
        (t.hasNews = !0), (t.param.parentNode.style.display = "block");
        for (var i = 0; i < a; i++) {
          var r = e[i],
            o = {
              name: r.r_name,
              symbol: this.market({
                code: r.r_code,
                market: r.r_market,
              }),
              code: r.r_code,
              title: r.news_title,
              news_url: r.news_url,
              stockUrl: r.url,
            };
          n.push(o.symbol), this.data.push(o);
        }
        (this.symbols = n.join(",")),
          new HQ.DataCenter({
            symbols: this.symbols,
            getObj: function(e) {
              t.merge(e);
            },
          });
      }
    }),
    (U.addEvent = function() {
      var t = document.querySelector("." + this.param.pop),
        n = this,
        a = 0,
        i = 0;
      window.addEventListener("click", function() {
        (a = new Date().getTime() - i),
          (i = 0),
          a > 10 && ((n.flag = !1), (t.style.display = "none"));
      });
    }),
    (U.merge = function(e) {
      var t = this;
      for (var n in e)
        for (var a = 0; a < t.data.length; a++)
          if (n === t.data[a].symbol) {
            (t.data[a].price = e[n].price),
              (t.data[a].percent = e[n].percent),
              (t.data[a].change = e[n].change);
            var i = L.cssClass.themeGreen,
              r = L.cssClass.themeRed,
              o = null;
            switch (e[n].type) {
              case "green":
                o = i;
                break;
              case "red":
                o = r;
                break;
              case "equal":
                o = L.cssClass.themeEqualC;
            }
            t.data[a].color = o;
            break;
          }
      t.render();
    }),
    (U.render = function() {
      for (var e = this, t = e.data.length, n = "", a = 0; a < t; a++) {
        var i = e.data[a];
        n += L.follow(i);
      }
      (e.param.dom.parentNode.style.width = 4.3 * t + 0.3 + "rem"),
        (e.param.dom.innerHTML = n);
    });
  var q = m.prototype;
  (q.load = function() {
    var t = this,
      n = Math.floor(1e3 * Math.random());
    loader(
      t.param.url
        .replace("$symbol", paperCode)
        .replace("$cb", this.param.varStr + n),
      function() {
        var a = window[t.param.varStr + n],
          i = a;
        i
          ? (i.length <= 0 ? e("#" + t.param.pDom).hide() : t.render(i),
            "cn_bk_hy" == t.param.dom && t.cb && t.cb(i))
          : e("#" + t.param.pDom).hide();
      },
      function() {
        e("#" + t.param.pDom).hide(), console.log("error...");
      }
    );
  }),
    (q.render = function(e) {});
  var B = why.prototype;
  (B.addEvent = function() {}),
    (B.load = function(e) {
      var t = this;
      e[t.param.symbol] &&
        ((t.hqData = e[t.param.symbol]),
        (t.data = t.hqData.tradeItems),
        t.param.cb(t.hqData));
    }),
    (B.updateRender = function() {}),
    (B.render = function() {});

  new v().init();
})(Zepto);

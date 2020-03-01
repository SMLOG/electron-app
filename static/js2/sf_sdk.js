var xh5_define,
  KKE = KKE || {};
~(function(e) {
  "use strict";
  function t(e, t, r) {
    if (!m.isStr(e)) return void m.err(r, [i.CMD_UNEXIST, e].join(":"));
    t = t || {};
    var a = e.split("."),
      n = a.splice(a.length - 1, a.length).join(""),
      u = a.splice(a.length - 1, a.length).join(""),
      s = a.splice(0, a.length),
      o = s.join("."),
      d = [o, u].join(".");
    l.relyCall(
      d,
      function() {
        var a = l.modsTree,
          o = void 0;
        do {
          var d = s.shift();
          if (((o = o ? o[d] : a[d]), !o))
            return void m.err(r, [i.MOD_ERR, u].join(":"));
        } while (s.length);
        var c = o[u] || {},
          b = c.entity || {},
          p = b[n];
        "undefined" == typeof p
          ? m.err(r, [i.CMD_UNEXIST, e].join(":"))
          : m.isFunc(p)
          ? p(t, r)
          : m.isFunc(r) && r(p);
      },
      t.modUrl || null
    );
  }
  for (
    var r,
      a,
      i = {
        SDK_REG: new RegExp("sf_sdk.js", u),
        isLocal: !1,
        isDebug: !1,
        isSSL: !0,
        custom_mod_url: void 0,
        MOD_URL: "js/$moduleName.js",
        MOD_URL_PROD:
          "http://finance.sina.com.cn/sinafinancesdk/js/$moduleName.js",
        MOD_URL_PROD_S:
          "https://finance.sina.com.cn/sinafinancesdk/js/$moduleName.js",
        getModUrl: function() {
          return this.custom_mod_url
            ? this.custom_mod_url + "/$moduleName.js"
            : this.isLocal
            ? this.MOD_URL
            : this.isSSL
            ? this.MOD_URL_PROD_S
            : this.MOD_URL_PROD;
        },
        CMD_404: "error occured while loading",
        CMD_UNEXIST: "calling nonexistent API",
        MOD_ERR: "erroneous module",
        MOD_DEF_ERR: "illegal module",
        DEP_ERR: "error def module"
      },
      n = document.getElementsByTagName("script"),
      u = n.length;
    u--;

  )
    if (((r = n[u]), (a = r.src || ""), i.SDK_REG.test(a))) {
      for (var s, o = r.attributes.length; o--; )
        (s = r.attributes[o]),
          "ssl" == s.name && (i.isSSL = "true" == s.value),
          "debug" == s.name && (i.isDebug = "true" == s.value),
          "local" == s.name && (i.isLocal = "true" == s.value),
          "murl" == s.name && (i.custom_mod_url = s.value);
      break;
    }
  0 == location.protocol.indexOf("https:") && (i.isSSL = !0);
  var m = new (function() {
      function e(e, t, r, a) {
        var i = !1,
          n = document.createElement("script"),
          u = document.getElementsByTagName("script")[0],
          s =
            document.head ||
            document.getElementsByTagName("head")[0] ||
            document.documentElement,
          o = s.getElementsByTagName("base")[0];
        (n.charset = a || "gb2312"),
          (n.src = e),
          (n.async = !0),
          (n.onload = n.onreadystatechange = function() {
            i ||
              (n.readyState && !/loaded|complete/.test(String(n.readyState))) ||
              ((i = !0),
              (n.onload = n.onreadystatechange = n.onerror = null),
              n.parentNode.removeChild(n),
              (n = null),
              "function" == typeof t && t());
          }),
          (n.onerror = function() {
            (n.onload = n.onreadystatechange = n.onerror = null),
              n.parentNode.removeChild(n),
              (n = null),
              "function" == typeof r && r();
          }),
          u.parentNode
            ? u.parentNode.insertBefore(n, u)
            : o
            ? s.insertBefore(n, o)
            : s.appendChild(n);
      }
      this.fBind = function(e, t) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function() {
          return e.apply(t, r.concat(Array.prototype.slice.call(arguments)));
        };
      };
      var t = function(e) {
        return function(t) {
          return {}.toString.call(t) == "[object " + e + "]";
        };
      };
      (this.isStr = t("String")),
        (this.isFunc = t("Function")),
        (this.isArr = t("Array")),
        (this.trace = (function(e) {
          return {
            log: function() {
              e && e.log && e.log.apply(e, arguments);
            },
            error: function() {
              e && e.error && e.error.apply(e, arguments);
            }
          };
        })(null)),
        (this.err = function(e, t) {
          this.isFunc(e) && e({ msg: t, data: null }), this.trace.error(t);
        }),
        (this.load = e);
    })(),
    d = ["datas.hq", "datas.k", "datas.t", "utils.util"],
    l = new (function() {
      function e(e, t, a) {
        if (3 != arguments.length) return void m.trace.error(i.MOD_DEF_ERR, e);
        var n = r(e),
          u = n[0],
          o = n[1],
          d = u[o];
        d
          ? (d.init = !0)
          : (d = u[o] = { init: !0, name: e, funcQ: [], entity: void 0 }),
          m.isStr(t) && (t = [t]);
        for (var l, b = t.length; b--; )
          if (((l = t[b]), l.indexOf("*") > -1)) {
            t.splice(b, 1);
            var p = l.split(".");
            p.splice(p.length - 1, p.length);
            var h = p.join(".");
            t = t.concat(c(h, e));
            break;
          }
        s(t, t.slice(0), d, a);
      }
      var t = {},
        r = function(e) {
          for (
            var r,
              a = e.split("."),
              i = a.splice(a.length - 1, a.length).join(""),
              n = a.splice(0, a.length),
              u = n.join("."),
              s = void 0;
            n.length;

          ) {
            var o = n.shift();
            s
              ? ((r = s[o]), r || (r = s[o] = {}))
              : ((r = t[o]), r || (r = t[o] = {})),
              (s = r);
          }
          return [s, i, u];
        },
        a = function(e) {
          for (; e.funcQ.length; ) {
            var t = e.funcQ.shift();
            m.isFunc(t) && t();
          }
        },
        n = function(e) {
          if (!e) return null;
          for (var r = [], a = [], n = 0, u = e.length; u > n; n++) {
            for (var s, o = e[n].split("."), d = void 0; o.length; )
              if (((s = o.shift()), (d = d ? d[s] : t[s]), !d)) {
                m.trace.error(i.DEP_ERR, o.toString());
                break;
              }
            a.push(d.entity), r.push(s);
          }
          return { n: r, e: a };
        },
        u = function(e, r, i) {
          var u = r.toString(),
            s = 0 == u.indexOf("function");
          if (s) {
            var o = n(i),
              d = r.apply(null, o.e.concat(t));
            e.entity = m.isFunc(d) ? new d() : d;
          } else e.entity = r;
          a(e);
        },
        s = function(e, t, r, a) {
          t.length ? b(t.shift(), m.fBind(s, this, e, t, r, a)) : u(r, a, e);
        },
        o = function(e, t, r) {
          (t = t.replace(/\./g, "/")), r && (r += "$moduleName.js");
          var a = r || i.getModUrl();
          m.load(
            a.replace("$moduleName", t),
            null,
            m.fBind(m.trace.error, this, i.CMD_404, e.name)
          );
        },
        l = function(e, t) {
          m.isArr(e) && (e = e.join("."));
          var a = r(e),
            i = a[0],
            n = a[1],
            u = i[n];
          return (
            u ||
              ((u = { init: !1, name: e, funcQ: [], entity: void 0 }),
              (i[n] = u),
              o(u, e, t)),
            u
          );
        },
        c = function(e, t) {
          for (var r, a = [], i = d.length; i--; )
            (r = d[i]),
              0 == r.indexOf(e) && -1 == r.indexOf(t) && (a[a.length] = r);
          return a;
        },
        b = function(e, t, r) {
          var a = l(e, r);
          m.isFunc(t) && (a.init ? t() : a.funcQ.push(t));
        };
      (this.modsTree = t), (this.relyCall = b), (xh5_define = e);
    })();
  (e.api = t),
    (e.cls = {}),
    (e.istLL = "KKE|1.0.4|WANGXuan|SinaFinance|wangxuan2@staff.sina.com.cn");
})(KKE);
xh5_define("utils.util", [], function() {
  return function() {
    function t(t, e) {
      var i = x(e.prototype);
      (i.constructor = t), (t.prototype = i);
    }
    function e() {
      this.evtObj = {};
    }
    function i(t, e) {
      var i = Array.prototype.slice.call(arguments, 2);
      return function() {
        return t.apply(e, i.concat(Array.prototype.slice.call(arguments)));
      };
    }
    function n() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    function r(t, e) {
      e || (t = t.toLowerCase());
      for (var i, n = 1315423911, r = t.length; r--; )
        (i = t.charCodeAt(r)), (n ^= (n << 5) + i + (n >> 2));
      return 2147483647 & n;
    }
    function a(t, e, i, n) {
      var r = !1,
        a = document.createElement("script"),
        o = document.getElementsByTagName("script")[0],
        s =
          document.head ||
          document.getElementsByTagName("head")[0] ||
          document.documentElement,
        l = s.getElementsByTagName("base")[0];
      n = n || {};
      var u;
      (a.charset = n.charset || "gb18030"),
        (a.src = t),
        (a.async = !0),
        (a.onload = a.onreadystatechange = function() {
          if (!r && (!a.readyState || /loaded|complete/.test(a.readyState))) {
            if (u) {
              var t = new Date() - u,
                i = n.market.toLowerCase(),
                o = n.type.toLowerCase();
              k.sima({
                simadata: { cre: i, mod: o, during: t },
                symbol: n.symbol,
                type: n.type
              });
            }
            (r = !0),
              (a.onload = a.onreadystatechange = a.onerror = null),
              a.parentNode.removeChild(a),
              (a = null),
              "function" == typeof e && e();
          }
        }),
        (a.onerror = function() {
          if (u) {
            var t = new Date() - u,
              e = n.market.toLowerCase(),
              r = n.type.toLowerCase();
            k.sima({
              simadata: { cre: e, mod: r, during: t, error_type: "err" },
              symbol: n.symbol,
              type: n.type
            });
          }
          (a.onload = a.onreadystatechange = a.onerror = null),
            a.parentNode.removeChild(a),
            (a = null),
            "function" == typeof i && i();
        }),
        n.market && n.type && n.symbol && (u = new Date()),
        o.parentNode
          ? o.parentNode.insertBefore(a, o)
          : l
          ? s.insertBefore(a, l)
          : s.appendChild(a);
    }
    function o() {
      function t(t) {
        var e = t.style;
        for (var i in e) e.hasOwnProperty(i) && (t.dom.style[i] = e[i]);
      }
      function e() {
        for (
          var t = [
              "@keyframes KKELoading",
              "@-webkit-keyframes KKELoading",
              "@-moz-keyframes KKELoading"
            ],
            e = 0,
            i = t.length;
          i > e;
          e++
        )
          u.cssUtil.inject(t[e] + l.scaleY);
      }
      function i() {
        if ((e(), !r)) {
          (r = u.$C("div")), t({ dom: r, style: l.ctn });
          for (var i = 0.1, n = 0, a = l.color.length; a > n; n++) {
            var o = u.$C("span");
            t({ dom: o, style: l.item });
            var s = u.clone(l.delay, s),
              c = -1 + i * n + "s";
            for (var h in s) s.hasOwnProperty(h) && (s[h] = c);
            t({ dom: o, style: s }),
              (o.style.background = l.color[n]),
              r.appendChild(o);
          }
        }
      }
      function n() {
        clearTimeout(o),
          (o = setTimeout(function() {
            "none" != r.style.display && (r.style.display = "none");
          }, 9e3));
      }
      var r,
        a,
        o,
        s,
        l = {
          ctn: {
            width: "40px",
            height: "30px",
            margin: 0,
            display: "none",
            position: "absolute",
            zIndex: 1
          },
          item: {
            display: "inline-block",
            width: "4px",
            height: "30px",
            margin: "0px 2px",
            borderRadius: "5px",
            animation: "KKELoading 1.2s infinite",
            webkitAnimation: "KKELoading 1.2s infinite",
            MozAnimation: "KKELoading 1.2s infinite"
          },
          color: ["#FF5472", "#FF706E", "#FF8762", "#FFAF4C", "#FFD53E"],
          delay: {
            animationDelay: -1,
            webkitAnimationDelay: -1,
            MozAnimationDelay: -1
          },
          scaleY:
            "{0%,40%,100%{-moz-transform:scaleY(0.2);-webkit-transform:scaleY(0.2);transform:scaleY(0.2);}20%,60%{-moz-transform:scaleY(1);-webkit-transform:scaleY(1);transform:scaleY(1);}}"
        };
      i(),
        (this.appendto = function(t, e) {
          (a = t), (s = e), a.appendChild(r);
        }),
        (this.setPosition = function() {
          a && a.offsetHeight > 0
            ? ((r.style.top = (a.offsetHeight - v(l.ctn.height)) / 2 + "px"),
              (r.style.left = (a.offsetWidth - v(l.ctn.width)) / 2 + "px"))
            : s &&
              s.DIMENSION.h_t &&
              ((r.style.top = (s.DIMENSION.h_t - v(l.ctn.height)) / 2 + "px"),
              (r.style.left = (s.DIMENSION._w - v(l.ctn.width)) / 2 + "px"));
        }),
        (this.show = function() {
          n(), (r.style.display = "");
        }),
        (this.hide = function() {
          clearTimeout(o), (r.style.display = "none");
        });
    }
    function s(t) {
      t = t || {};
      var e,
        i,
        n,
        r,
        a,
        o,
        s = u.$C("div"),
        l = 70,
        c = function() {
          clearTimeout(o),
            i && ((i.style.display = "none"), (s.innerHTML = "")),
            e && f(e.closeCb) && e.closeCb();
        },
        h = function(h) {
          if (((e = h), clearTimeout(o), !i)) {
            (i = u.$C("div")),
              (i.style.width = "100%"),
              (i.style.height = "100%"),
              (i.style.position = "absolute"),
              (i.style.zIndex = l),
              (i.style.top = 0),
              (i.style.textAlign = "center"),
              (n = u.$C("div")),
              (r = u.$C("div")),
              (a = u.$C("span")),
              (s.style.fontSize = "12px"),
              (s.style.margin = "9px auto"),
              (n.style.position = "absolute"),
              (n.style.top = 0),
              (n.style.left = 0),
              (n.style.width = "100%"),
              (n.style.height = "100%"),
              (n.style.backgroundColor = t.TIP_ARR
                ? t.TIP_ARR[2] || "#fff"
                : "#fff"),
              (n.style.opacity = 0.5),
              (n.style.filter = "alpha(opacity=50)"),
              (r.style.padding = "1px 3px 10px"),
              (r.style.top = t.TIP_ARR ? t.TIP_ARR[4] || "26%" : "26%"),
              (r.style.position = "relative"),
              (r.style.margin = "0 auto"),
              (r.style.width = "100%"),
              (a.style.cursor = "pointer"),
              (a.style.display = "block"),
              (a.style.margin = "0 auto"),
              (a.style.lineHeight = a.style.height = "28px"),
              (a.style.width = "60px"),
              (a.style.fontSize = "14px"),
              (a.style.borderRadius = "3px"),
              u.xh5_EvtUtil.addHandler(a, "click", c),
              r.appendChild(s);
            var d = !(!t.TIP_ARR || !t.TIP_ARR[3]);
            !d && i.appendChild(n), i.appendChild(r);
          }
          (i.style.display = ""),
            (s.style.color =
              "undefined" != typeof h.fontColor
                ? h.fontColor
                : t.TIP_ARR
                ? t.TIP_ARR[1] || "#fff"
                : "#fff");
          var f = t.TIP_ARR ? t.TIP_ARR[0] || "#000" : "#000";
          if (
            ((r.style.backgroundColor = u.xh5_BrowserUtil.noH5
              ? f
              : u.hex2dec(f, 0.8)),
            h.bgStyle)
          )
            for (var p in h.bgStyle)
              h.bgStyle.hasOwnProperty(p) && (r.style[p] = h.bgStyle[p]);
          if (
            ((s.innerHTML = h.txt || ""),
            h.content && s.appendChild(h.content),
            !isNaN(h.autoHide) &&
              h.autoHide > 0 &&
              setTimeout(c, 1e3 * h.autoHide),
            h.noBtn
              ? u.$CONTAINS(r, a) && r.removeChild(a)
              : ((a.innerHTML = h.btnLb || "\u786e\u5b9a"),
                (a.style.background = t.BTN_ARR
                  ? t.BTN_ARR[0] || "#2b9dfc"
                  : "#2b9dfc"),
                (a.style.color = t.BTN_ARR ? t.BTN_ARR[1] || "#fff" : "#fff"),
                !u.$CONTAINS(r, a) && r.appendChild(a)),
            h.extraBtn)
          )
            for (var m = 0, g = h.extraBtn, v = g.length; v > m; m++) {
              var b = g[m],
                N = u.$C("input");
              (N.type = "button"),
                (N.value = b.value),
                (N.style.marginTop = "20px"),
                (N.style.cursor = "pointer"),
                u.xh5_EvtUtil.addHandler(N, "click", b.onClk),
                r.appendChild(N);
            }
          return h.parent.appendChild(i), i;
        };
      (this.genTip = h), (this.hide = c);
    }
    function l() {
      var t = "hq";
      return (
        location.hostname.indexOf("sina.cn") > -1 &&
          ((t = "w"), location.pathname.indexOf("appchart") > -1 && (t = "a")),
        t
      );
    }
    this.VER = "2.5.1";
    var u = this,
      c = function(t) {
        return function(e) {
          return {}.toString.call(e) == "[object " + t + "]";
        };
      },
      h = c("Object"),
      d = c("String"),
      f = c("Function"),
      p = c("Array"),
      m = c("Number"),
      g = c("Date");
    (this.isObj = h),
      (this.isStr = d),
      (this.isFunc = f),
      (this.isArr = p),
      (this.isNum = m),
      (this.isDate = g);
    var v = function(t) {
      return parseInt(t, 10);
    };
    this.uae = function(t) {
      for (var e, i = [], n = {}, r = 0, a = t.length; a > r; r++)
        (e = t[r]), 1 !== n[e] && ((n[e] = 1), (i[i.length] = e));
      return i;
    };
    var b = new (function() {
      var t;
      if (XMLHttpRequest) t = new XMLHttpRequest();
      else if (ActiveXObject)
        try {
          t = new ActiveXObject("MSXML2.XMLHTTP");
        } catch (e) {
          try {
            t = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (i) {}
        }
      this.send = function(e, i, n, r) {
        if (!t || !e) return void (n && n("error while sending"));
        if (
          ((e += e.indexOf("?") < 0 ? "?" : "&"),
          (e += "_=" + new Date().getTime()),
          (r = r || "POST"),
          (t.onreadystatechange = function() {
            if (4 == t.readyState) {
              var e;
              200 == t.status && (e = t.responseText), n && n(e);
            }
          }),
          t.open(r, e, !0),
          "POST" == r)
        ) {
          t.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded;"
          );
          var a = "";
          for (var o in i)
            i.hasOwnProperty(o) &&
              (a +=
                [encodeURIComponent(o), encodeURIComponent(i[o])].join("=") +
                "&");
          t.send(a);
        } else t.send(null);
      };
    })();
    (this.POST =
      "undefined" != typeof jQuery && jQuery.post ? jQuery.post : b.send),
      (this.trace = (function(t) {
        return {
          log: function() {
            t && t.log && t.log.apply(t, arguments);
          },
          error: function() {
            t && t.error && t.error.apply(t, arguments);
          }
        };
      })(null));
    var N = function(t, e) {
      var i = -1;
      if (t.indexOf) i = t.indexOf(e);
      else
        for (var n = t.length; n--; )
          if (t[n] === e) {
            i = n;
            break;
          }
      return i;
    };
    this.arrIndexOf = N;
    var y = function(t, e) {
      if (null == t || "object" != typeof t) return t;
      if (
        t.constructor == Date ||
        t.constructor == RegExp ||
        f(t) ||
        d(t) ||
        t.constructor == Number ||
        t.constructor == Boolean
      )
        return new t.constructor(t);
      e = e || new t.constructor();
      for (var i in t)
        t.hasOwnProperty(i) &&
          (e[i] = "undefined" == typeof e[i] ? y(t[i], null) : e[i]);
      return e;
    };
    this.clone = y;
    var w = function(t) {
      if (!t) return t;
      var e = {};
      for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
      return e;
    };
    (this.co = w),
      (this.oc = function(t, e) {
        if (!t) return e;
        for (var i in e)
          e.hasOwnProperty(i) &&
            (t[i] = h(t[i]) && h(e[i]) ? arguments.callee(t[i], e[i]) : e[i]);
        return t;
      });
    var x = function(t) {
      function e() {}
      return (e.prototype = t), new e();
    };
    (this.fInherit = t),
      (this.urlUtil = new (function() {
        (this.getUrlParam = function() {
          var t,
            e = {};
          try {
            t = location.search.substring(1);
          } catch (i) {}
          if (t)
            for (var n, r, a, o = t.split("&"), s = o.length, l = 0; s > l; l++)
              (a = o[l].indexOf("=")),
                -1 != a &&
                  ((n = o[l].substring(0, a)),
                  (r = o[l].substring(a + 1)),
                  (e[n] = r));
          return e;
        }),
          (this.getMainUrl = function() {
            return window.location != window.parent.location
              ? document.referrer
              : document.location.href;
          });
      })()),
      (this.xh5_BrowserUtil = new (function() {
        (this.info = (function() {
          var t,
            e = navigator.userAgent,
            i =
              e.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
              ) || [];
          return /trident/i.test(i[1])
            ? ((t = /\brv[ :]+(\d+)/g.exec(e) || []),
              { name: "IE ", version: t[1] || "" })
            : "Chrome" === i[1] && ((t = e.match(/\bOPR\/(\d+)/)), null != t)
            ? { name: "Opera", version: t[1] }
            : ((i = i[2]
                ? [i[1], i[2]]
                : [navigator.appName, navigator.appVersion, "-?"]),
              null != (t = e.match(/version\/(\d+)/i)) && i.splice(1, 1, t[1]),
              { name: i[0], version: i[1] });
        })()),
          (this.noH5 = !1),
          (this.hdpr = (function(t) {
            var e = document.createElement("canvas");
            if (e.getContext && e.getContext("2d")) {
              var i = Math.ceil(window.devicePixelRatio || 1),
                n = e.getContext("2d").webkitBackingStorePixelRatio || 1;
              return i / n;
            }
            return (t.noH5 = !0), 1;
          })(this));
      })()),
      (this.xh5_deviceUtil = (function() {
        return {
          istd: (function() {
            if ("ontouchend" in window) {
              var t;
              try {
                t = navigator.userAgent;
              } catch (e) {}
              return t && t.indexOf("Windows NT") > 0 ? !1 : !0;
            }
            return !1;
          })(),
          allowt: "ontouchend" in window
        };
      })());
    var S = (function() {
      function t(t) {
        return (
          (t = JSON.stringify(t)), t || (t = ""), (t = encodeURIComponent(t))
        );
      }
      function e(t) {
        try {
          t = JSON.parse(t);
        } catch (e) {
          t = decodeURIComponent(t);
        }
        return t;
      }
      function i(e, i, n) {
        if (((n = n || {}), void 0 != e && void 0 != i)) {
          var r, a, o, s;
          (a = n.path ? "; path=" + n.path : ""),
            (o = n.domain ? "; domain=" + n.domain : ""),
            (s = n.secure ? "; secure" : "");
          var l,
            c = n.expires;
          switch (u(c)) {
            case "Number":
              (l = new Date()), l.setTime(l.getTime() + 1e3 * c);
              break;
            case "String":
              (l = new Date(c)), "Invalid Date" == l && (l = "");
              break;
            case "Date":
              l = c;
          }
          (r = l ? "; expires=" + l.toUTCString() : ""),
            (document.cookie = [
              encodeURIComponent(e),
              "=",
              t(i),
              r,
              a,
              o,
              s
            ].join(""));
        }
      }
      function n(t) {
        var i = document.cookie.match(
          "(?:^|;)\\s*" + encodeURIComponent(t) + "=([^;]*)"
        );
        return i ? e(i[1]) || "" : null;
      }
      function r(t) {
        document.cookie =
          encodeURIComponent(t) + "=;expires=" + new Date(0).toUTCString();
      }
      function a(e, i) {
        void 0 != e &&
          void 0 != i &&
          localStorage.setItem(encodeURIComponent(e), t(i));
      }
      function o(t) {
        var i = localStorage.getItem(encodeURIComponent(t));
        return e(i);
      }
      function s(t) {
        localStorage.removeItem(encodeURIComponent(t));
      }
      var l = Object.prototype.toString,
        u = function(t) {
          return null === t
            ? "Null"
            : void 0 === t
            ? "Undefined"
            : l.call(t).slice(8, -1);
        },
        c = (function() {
          if (
            "object" == typeof localStorage &&
            localStorage &&
            localStorage.setItem
          ) {
            var t = "KKE_LOCALSTORAGE_TESTing";
            try {
              return (
                localStorage.removeItem(t),
                localStorage.setItem(t, t),
                localStorage.removeItem(t),
                !0
              );
            } catch (e) {
              return !1;
            }
          }
          return !1;
        })();
      return {
        hasls: c,
        save: function(t, e, n) {
          n = n || {};
          var r = n.mode;
          if (r)
            switch (r) {
              case "localStorage":
                if (!c) return;
                a(t, e);
                break;
              case "cookie":
                i(t, e, n);
            }
          else if (c)
            try {
              s(t), a(t, e);
            } catch (o) {}
          else i(t, e, n);
        },
        load: function(t, e) {
          var i;
          if (("Object" == u(e) && (e = e.mode), e))
            switch (e) {
              case "localStorage":
                if (!c) return;
                i = o(t);
                break;
              case "cookie":
                i = n(t);
            }
          else c && (i = o(t)), !i && (i = n(t));
          return i;
        },
        remove: function(t, e) {
          if (("Object" == u(e) && (e = e.mode), e))
            switch (e) {
              case "localStorage":
                if (!c) return;
                s(t);
                break;
              case "cookie":
                r(t);
            }
          else c && s(t), r(t);
        },
        clear: function(t) {
          c && s(t);
        }
      };
    })();
    (this.localSL = S),
      (this.xh5_EvtUtil = {
        addHandler: function(t, e, i) {
          t &&
            (t.addEventListener
              ? t.addEventListener(e, i, !1)
              : t.attachEvent
              ? t.attachEvent("on" + e, i)
              : (t["on" + e] = i));
        },
        removeHandler: function(t, e, i) {
          t &&
            (t.removeEventListener
              ? t.removeEventListener(e, i, !1)
              : t.detachEvent
              ? t.detachEvent("on" + e, i)
              : (t["on" + e] = null));
        },
        getEvent: function(t) {
          return t ? t : window.event;
        },
        getTarget: function(t) {
          return (
            !t && (t = this.getEvent()), t ? t.target || t.srcElement : null
          );
        },
        preventDefault: function(t) {
          !t && (t = this.getEvent()),
            t && (t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
        },
        stopPropagation: function(t) {
          !t && (t = this.getEvent()),
            t &&
              (t.stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0));
        },
        getRelatedTarget: function(t) {
          return (
            !t && (t = this.getEvent()),
            t.relatedTarget
              ? t.relatedTarget
              : t.toElement
              ? t.toElement
              : t.fromElement
              ? t.fromElement
              : null
          );
        },
        getWheelDelta: function(t) {
          return (
            !t && (t = this.getEvent()),
            t
              ? t.wheelDelta
                ? client.engine.opera && client.engine.opera < 9.5
                  ? -t.wheelDelta
                  : t.wheelDelta
                : 40 * -t.detail
              : 0
          );
        }
      }),
      (e.prototype.al = function(t, e, i) {
        (i && this.evtObj[t]) ||
          (!this.evtObj[t] && (this.evtObj[t] = []), this.evtObj[t].push(e));
      }),
      (e.prototype.rl = function(t, e) {
        var i = this.evtObj[t];
        if (p(i)) for (var n = i.length; n--; ) i[n] == e && i.splice(n, 1);
      }),
      (e.prototype.re = function(t, e) {
        var i = this.evtObj[t];
        if (p(i))
          for (var n = 0, r = i.length; r > n; n++)
            "function" == typeof i[n] && i[n](t, e);
      }),
      (this.xh5_EvtDispatcher = e),
      (this.$DOM = function(t, e) {
        return (e = e || document), e.getElementById(t);
      }),
      (this.$C = function(t, e) {
        var i = document.createElement(t);
        return e && (i.id = e), i;
      }),
      (this.$T = function(t) {
        return document.createTextNode(t);
      }),
      (this.$CONTAINS = function(t, e) {
        if (t.compareDocumentPosition)
          return t === e || !!(16 & t.compareDocumentPosition(e));
        if (t.contains && 1 === e.nodeType) return t.contains(e) && t !== e;
        for (; (e = e.parentNode); ) if (e === t) return !0;
        return !1;
      }),
      (this.getTextNodes = function(t) {
        var e = [];
        for (t = t.firstChild; t; t = t.nextSibling)
          3 == t.nodeType ? e.push(t) : (e = e.concat(arguments.callee(t)));
        return e;
      }),
      (this.getCSS = function(t) {
        var e = null;
        return (e = window.getComputedStyle
          ? window.getComputedStyle(t)
          : t.currentStyle);
      }),
      (this.fBind = i),
      (this.isColor = function(t) {
        return /^#[0-9a-fA-F]{3,6}$/.test(t);
      }),
      (this.isColorRGB = function(t) {
        return /(^#[0-9a-fA-F]{3,6}$)|(^rgba?\(.{5,16}\)$)/.test(t);
      }),
      (this.randomColor = function() {
        for (
          var t = Math.floor(16777215 * Math.random()).toString(16);
          t.length < 6;

        )
          t += "0";
        return t;
      }),
      (this.hex2dec = function(t, e, i) {
        if (0 == t.indexOf("rgb")) return t;
        t = t.replace(/#|0x/i, "");
        var n, r, a;
        t.replace(/(\w{6})|(\w{3})/, function(e, i, o) {
          if (i) (n = t.slice(0, 2)), (r = t.slice(2, 4)), (a = t.slice(4));
          else {
            if (!o) return [0, 0, 0];
            var s = t.split("");
            (n = s[0]),
              (n += String(n)),
              (r = s[1]),
              (r += String(r)),
              (a = s[2]),
              (a += String(a));
          }
        });
        var o;
        return isNaN(e)
          ? ((o = [parseInt(n, 16), parseInt(r, 16), parseInt(a, 16)]),
            i ? o : "rgb($color)".replace("$color", o.join(",")))
          : ((o = [parseInt(n, 16), parseInt(r, 16), parseInt(a, 16), e]),
            i ? o : "rgba($color)".replace("$color", o.join(",")));
      }),
      (this.getTimestamp = n),
      (this.cssUtil = {
        inject: function(t) {
          var e = document.createElement("style"),
            i =
              document.head ||
              document.getElementsByTagName("head")[0] ||
              document.documentElement;
          (e.type = "text/css"),
            e.styleSheet
              ? (e.styleSheet.cssText = t)
              : e.appendChild(document.createTextNode(t)),
            i.appendChild(e);
        },
        adCls: function(t, e) {
          if (t.className != e) {
            var i = t.className.split(" ");
            for (var n in i) if (i.hasOwnProperty(n) && i[n] == e) return;
            "" == t.className ? (t.className = e) : (t.className += " " + e);
          }
        },
        rmCls: function(t, e) {
          if (-1 != t.className.indexOf(e))
            if (t.className == e) t.className = "";
            else {
              var i = t.className.split(" "),
                n = "";
              for (var r in i)
                if (i.hasOwnProperty(r)) {
                  if (i[r] == e) continue;
                  "" != n && (n += " "), (n += i[r]);
                }
              t.className = n;
            }
        }
      }),
      (this.load = a);
    var _,
      T = new (function() {
        var t = _ || {};
        _ = t;
        var e = function(e, i) {
          for (var n = t[e][i ? "errCbArr" : "cbArr"], r = n.length; r--; ) {
            var a = n[r];
            f(a) && a();
          }
          (t[e] = null), delete t[e];
        };
        this.load = function(n, o, s, l) {
          var u = "urlhash_" + r(n);
          for (var c in t)
            if (t.hasOwnProperty(c) && c == u)
              return t[c].cbArr.push(o), void t[c].errCbArr.push(s);
          (t[u] = { url: n, cbArr: [o], errCbArr: [s] }),
            a(n, i(e, this, u), i(e, this, u, !0), l);
        };
      })();
    (this.relyLoader = T),
      (this.iframer = function(t, e) {
        function i() {
          if (document && document.body) {
            clearInterval(r), (o = 0);
            var t = document.body;
            t.insertBefore(n, t.firstChild), n.setAttribute("data-ready", "1");
          } else o++ > 9 && (clearInterval(r), f(e) && e());
        }
        var n,
          r,
          a = t.attribute
            ? t.attribute.id || "_kkeiframe" + new Date().getTime()
            : "_kkeiframe" + new Date().getTime(),
          o = 0;
        if (!(n = document.getElementById(a))) {
          if (
            ((n = document.createElement("iframe")),
            n.setAttribute("data-ready", "0"),
            t.attribute)
          )
            for (var s in t.attribute)
              t.attribute.hasOwnProperty(s) && (n[s] = t.attribute[s]);
          if (
            ((n.style.height = n.style.width = 0),
            (n.style.borderStyle = "none"),
            (n.style.position = "absolute"),
            (n.style.zIndex = -9),
            (n.style.display = "none"),
            t.style)
          )
            for (var l in t.style)
              t.style.hasOwnProperty(l) && (n.style[l] = t.style[l]);
          (r = setInterval(i, 500)), i();
        }
        return n;
      }),
      (this.ca = function(t) {
        if (t) for (; t.length > 0; ) t.length--;
      }),
      (this.isRepos = function(t) {
        return /^(sh204\d{3}|sz1318\d{2})$/.test(t);
      }),
      (this.isCNK = function(t) {
        return /^(sh688\d{3}|sh689\d{3})$/.test(t) ? "CNK" : void 0;
      }),
      (this.market = function(t) {
        return /^(sh204\d{3}|sz1318\d{2})$/.test(t)
          ? "REPO"
          : /^s[hz]\d{6}$/.test(t)
          ? "CN"
          : /^GN|gn\d{7}$/.test(t)
          ? "CN"
          : /^HY|hy\d{7}$/.test(t)
          ? "CN"
          : /^DY|dy\d{7}$/.test(t)
          ? "CN"
          : /^s[hz]\d{6}_i$/.test(t)
          ? "CNI"
          : /^sb[48]\d{5}$/.test(t)
          ? "OTC"
          : /^[48]\d{5}$/.test(t)
          ? "OTC"
          : /^otc_\d{6}$/.test(t)
          ? "OTC"
          : /^btc_\w+/.test(t)
          ? "BTC"
          : /^gb_.+$/.test(t)
          ? "US"
          : /^(hk|rt_hk)\w+/.test(t)
          ? "HK"
          : /^hf_\w+/.test(t)
          ? "HF"
          : /^lse_.+$/.test(t)
          ? "LSE"
          : /^nf_\w+/.test(t)
          ? "NF"
          : /^gds_\w+/.test(t)
          ? "GOODS"
          : /^f_\d{6}$/.test(t) ||
            /^fu_\d{6}$/.test(t) ||
            /^pwbfbyd_\d{6}$/.test(t) ||
            /^pwbfbjd_\d{6}$/.test(t) ||
            /^pwbfbnd_\d{6}$/.test(t) ||
            /^ljjz_\d{6}$/.test(t) ||
            /^dwjz_\d{6}$/.test(t) ||
            /^lshb_\d{6}$/.test(t)
          ? "fund"
          : /^CON_OP_\w+/.test(t)
          ? "option_cn"
          : /^P_OP_\w+/.test(t)
          ? "op_m"
          : /^znb_\w+/.test(t)
          ? "global_index"
          : /^fx_.+$/.test(t)
          ? "forex"
          : /^(DINIW|USDCNY)$/.test(t)
          ? "forex_yt"
          : /^CFF_RE_.+$/.test(t)
          ? "CFF"
          : /^msci_\w+/.test(t)
          ? "MSCI"
          : /\d+$/.test(t)
          ? "NF"
          : void 0;
      }),
      (this.cookieUtil = {
        escape: function(t) {
          return t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
        },
        get: function(t) {
          var e = document.cookie.match(
            "(?:^|;)\\s*" + this.escape(t) + "=([^;]*)"
          );
          return e ? e[1] || "" : "";
        },
        set: function(t, e, i) {
          !i && (i = {}), e || ((e = ""), (i.expires = -1));
          var n = "";
          if (i.expires && (Number(i.expires) || i.expires.toUTCString)) {
            var r;
            Number(i.expires)
              ? ((r = new Date()), r.setTime(r.getTime() + 1e3 * i.expires))
              : (r = i.expires),
              (n = "; expires=" + r.toUTCString());
          }
          var a = i.path ? "; path=" + i.path : "",
            o = i.domain ? "; domain=" + i.domain : "",
            s = i.secure ? "; secure" : "";
          document.cookie = [t, "=", e, n, a, o, s].join("");
        }
      });
    var k = new (function() {
      function t(e) {
        a(
          e.url,
          function() {
            for (var t = e.f(); t && e.q.length; ) {
              var i = e.q.shift();
              t.apply(null, i);
            }
          },
          function() {
            --e.count && t(e), e.count < 1 && (e.q = []);
          }
        );
      }
      function e(e) {
        setTimeout(function() {
          var i = !!e.f();
          !i && t(e);
        }, 2e3);
      }
      function i(t) {
        if ("undefined" != typeof SIMA) {
          for (var e, i = s.length; i--; )
            if (((e = s[i]), e.symbol == t.symbol && e.type == t.type)) return;
          s.push(t);
        }
        var n = t.simadata,
          r = { action: "hq", data: n, pk: "179824" };
        try {
          SIMA(r);
        } catch (a) {
          o.count && o.q.push([t]);
        }
      }
      var n = navigator.userAgent || "unknownUa";
      n = encodeURIComponent("_UA_" + n);
      var r = {
          url:
            "https://mjs.sinaimg.cn/umd/base-tools-SUDA/1.0.2/index.all.min.js",
          q: [],
          count: 5,
          f: function() {
            return "undefined" == typeof SUDA ? void 0 : SUDA.uaTrack;
          }
        },
        o = {
          url: "https://news.sina.com.cn/js/pctianyi/sima.js",
          q: [],
          count: 5,
          f: function() {
            return "undefined" == typeof SIMA ? void 0 : i;
          }
        };
      e(o), e(r);
      var s = [];
      this.sima = i;
      var l,
        u,
        c = [],
        h = function() {
          for (
            var t,
              e = "chart_finance",
              i = "",
              a = ",",
              o = "",
              s = 0,
              u = c.length;
            u > s;
            s++
          )
            (t = c[s]), (o += [t.k, t.v].join(i) + a);
          for (; c.length; ) c.length--;
          if (o !== l) {
            (l = o), (o += n);
            try {
              SUDA.uaTrack(e, o);
            } catch (h) {
              r.count && r.q.push([e, o]);
            }
          }
        };
      this.s = function(t, e, i) {
        if (t) {
          (isNaN(i) || 0 > i) && (i = 3e3),
            (e = JSON.stringify(e)),
            e || (e = ""),
            (e = encodeURIComponent(e));
          for (var n = c.length; n--; )
            if (c[n].k == t) {
              c.splice(n, 1);
              break;
            }
          c.push({ k: t, v: e }), clearTimeout(u), (u = setTimeout(h, i));
        }
      };
      var d, f;
      (this.s2 = function(t, e, i) {
        if (((i = i || "chart_detail"), f != t || d != i)) {
          (d = i),
            (f = t),
            setTimeout(function() {
              (d = void 0), (f = void 0);
            }, 99);
          try {
            SUDA.uaTrack(i, e || t);
          } catch (n) {
            r.count && r.q.push([i, e || t]);
          }
        }
      }),
        (this.log = function() {
          try {
            SUDA.log();
          } catch (t) {}
        });
    })();
    (this.sudaLog = k.log),
      (this.stc = k.s),
      (this.suda = k.s2),
      (this.xh5_PosUtil = {
        pp: function(t, e, i, n) {
          return isNaN(t) || e >= t
            ? n
            : t >= i
            ? 1
            : Math.max(n * (1 - (t - e) / (i - e)), 1);
        },
        ppp: function(t, e, i, n, r) {
          return (t = (t - r) / r), this.pp(t, e, i, n);
        },
        vp: function(t, e, i) {
          return isNaN(t) || 0 >= t ? i - 1 : i * (1 - t / e);
        }
      }),
      (this.xh5_HtmlPosUtil = {
        pageX: function(t) {
          return t.offsetParent
            ? t.offsetLeft + this.pageX(t.offsetParent)
            : t.offsetLeft;
        },
        pageY: function(t) {
          return t.offsetParent
            ? t.offsetTop + this.pageY(t.offsetParent)
            : t.offsetTop;
        },
        parentX: function(t) {
          return t.parentNode == t.offsetParent
            ? t.offsetLeft
            : this.pageX(t) - this.pageX(t.parentNode);
        },
        parentY: function(t) {
          return t.parentNode == t.offsetParent
            ? t.offsetTop
            : this.pageY(t) - this.pageY(t.parentNode);
        }
      }),
      (this.xh5_ADJUST_HIGH_LOW = new (function() {
        var t = function(t) {
            var e = parseInt(Math.round(100 * t));
            return e % 100 != 0 &&
              (e % 10 == 0 && (e *= 0.1), e % 5 != 0 && e % 2 != 0)
              ? !0
              : !1;
          },
          e = function(t, e) {
            if (e)
              for (; t > 5; )
                if (t % 2 == 0) t *= 0.5;
                else {
                  if (t % 3 != 0) break;
                  t /= 3;
                }
            else
              t > 9 &&
                (t % 3 == 0
                  ? (t /= 3)
                  : t % 4 == 0
                  ? (t *= 0.25)
                  : t % 2 == 0 && (t *= 0.5));
            return t;
          };
        this.c = function(i, n, r, a, o, s) {
          if (isNaN(i) || isNaN(n) || n > i) return [0, 0, 0];
          isNaN(s) || ((s = (i - n) * s), (i += s), (n -= s));
          for (
            var l,
              u,
              c,
              h,
              d,
              f,
              p,
              m,
              g,
              v,
              b,
              N,
              y,
              w,
              x = -1e-6,
              S = 0.5 * (n + i),
              _ = a
                ? [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20]
                : [4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20],
              T = [1, 2, 3, 4, 5, 6, 8],
              k = !1,
              C = T.length,
              A = 0,
              D = _.length;
            D > A;
            A++
          )
            for (
              k = !1, y = _[A], c = (i - n) / y, m = Math.pow(10, 0 - r);
              !k;

            ) {
              for (w = 0; C > w; w++)
                if (
                  ((h = m * T[w]),
                  h - c > x &&
                    (1 & y
                      ? ((d = Math.round((S + 0.5 * h) / h) * h),
                        (b = (d + 0.5 * (y - 1) * h).toFixed(5)),
                        (N = (d - 0.5 * (y + 1) * h).toFixed(5)))
                      : ((d = Math.round(S / h) * h),
                        (b = (d + 0.5 * y * h).toFixed(5)),
                        (N = (d - 0.5 * y * h).toFixed(5))),
                    (f = Number(b)),
                    (p = Number(N)),
                    f - i > x && x > p - n))
                ) {
                  if (((k = !0), 0 > p && !o && ((f -= p), (p = 0)), !g)) {
                    (g = f - p), (l = f), (u = p), (v = y);
                    break;
                  }
                  var P = (f - p) / e(y);
                  if (
                    1 != Math.round(100 * P) &&
                    1 != Math.round(10 * P) &&
                    t(P)
                  )
                    break;
                  if (f - p > g) break;
                  if (f - p == g) {
                    var O = l - i,
                      M = n - u,
                      R = Math.abs(O - M);
                    (O = f - i), (M = n - p);
                    var I = Math.abs(O - M);
                    if (I >= R) break;
                  }
                  if (t(f)) break;
                  if (t(p)) break;
                  (g = f - p), (l = f), (u = p), (v = y);
                  break;
                }
              m *= 10;
            }
          return (v = e(v, a)), [l, u, v];
        };
      })()),
      (this.xh5_S_KLC_D = function(t) {
        var e,
          i,
          n,
          r,
          a,
          o,
          s,
          l = (arguments, 864e5),
          u = 7657,
          c = [],
          h = [],
          d = ~(3 << 30),
          f = 1 << 30,
          p = [0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30],
          m = Math,
          g = function() {
            var l, u;
            for (l = 0; 64 > l; l++)
              (h[l] = m.pow(2, l)),
                26 > l &&
                  ((c[l] = v(l + 65)),
                  (c[l + 26] = v(l + 97)),
                  10 > l && (c[l + 52] = v(l + 48)));
            for (
              c.push("+", "/"),
                c = c.join(""),
                i = t.split(""),
                n = i.length,
                l = 0;
              n > l;
              l++
            )
              i[l] = c.indexOf(i[l]);
            return (
              (r = {}),
              (e = o = 0),
              (a = {}),
              (u = w([12, 6])),
              (s = 63 ^ u[1]),
              { _1479: T, _136: _, _200: S, _139: k, _197: _mi_run }[
                "_" + u[0]
              ] ||
                function() {
                  return [];
                }
            );
          },
          v = String.fromCharCode,
          b = function(t) {
            return t === {}._;
          },
          N = function() {
            var t, e;
            for (t = y(), e = 1; ; ) {
              if (!y()) return e * (2 * t - 1);
              e++;
            }
          },
          y = function() {
            var t;
            return e >= n
              ? 0
              : ((t = i[e] & (1 << o)), o++, o >= 6 && ((o -= 6), e++), !!t);
          },
          w = function(t, r, a) {
            var s, l, u, c, d;
            for (
              l = [], u = 0, r || (r = []), a || (a = []), s = 0;
              s < t.length;
              s++
            )
              if (((c = t[s]), (u = 0), c)) {
                if (e >= n) return l;
                if (t[s] <= 0) u = 0;
                else if (t[s] <= 30) {
                  for (
                    ;
                    (d = 6 - o),
                      (d = c > d ? d : c),
                      (u |= ((i[e] >> o) & ((1 << d) - 1)) << (t[s] - c)),
                      (o += d),
                      o >= 6 && ((o -= 6), e++),
                      (c -= d),
                      !(0 >= c);

                  );
                  r[s] && u >= h[t[s] - 1] && (u -= h[t[s]]);
                } else
                  (u = w([30, t[s] - 30], [0, r[s]])),
                    a[s] || (u = u[0] + u[1] * h[30]);
                l[s] = u;
              } else l[s] = 0;
            return l;
          },
          x = function(t) {
            var e, i, n;
            for (t > 1 && (e = 0), e = 0; t > e; e++)
              r.d++, (n = r.d % 7), (3 == n || 4 == n) && (r.d += 5 - n);
            return (i = new Date()), i.setTime((u + r.d) * l), i;
          },
          S = function() {
            var t, i, a, o, l;
            if (s >= 1) return [];
            for (
              r.d = w([18], [1])[0] - 1,
                a = w([3, 3, 30, 6]),
                r.p = a[0],
                r.ld = a[1],
                r.cd = a[2],
                r.c = a[3],
                r.m = m.pow(10, r.p),
                r.pc = r.cd / r.m,
                i = [],
                t = 0;
              (o = { d: 1 }),
                y() &&
                  ((a = w([3])[0]),
                  0 == a
                    ? (o.d = w([6])[0])
                    : 1 == a
                    ? ((r.d = w([18])[0]), (o.d = 0))
                    : (o.d = a)),
                (l = { day: x(o.d) }),
                y() && (r.ld += N()),
                (a = w([3 * r.ld], [1])),
                (r.cd += a[0]),
                (l.close = r.cd / r.m),
                i.push(l),
                !(e >= n) && (e != n - 1 || 63 & (r.c ^ (t + 1)));
              t++
            );
            return (i[0].prevclose = r.pc), i;
          },
          _ = function() {
            var t, i, a, o, l, u, c, h, d, f, p;
            if (s > 2) return [];
            for (
              c = [],
                d = { v: "volume", p: "price", a: "avg_price" },
                r.d = w([18], [1])[0] - 1,
                h = { day: x(1) },
                a = w(1 > s ? [3, 3, 4, 1, 1, 1, 5] : [4, 4, 4, 1, 1, 1, 3]),
                t = 0;
              7 > t;
              t++
            )
              r[["la", "lp", "lv", "tv", "rv", "zv", "pp"][t]] = a[t];
            for (
              r.m = m.pow(10, r.pp),
                s >= 1
                  ? ((a = w([3, 3])), (r.c = a[0]), (a = a[1]))
                  : ((a = 5), (r.c = 2)),
                r.pc = w([6 * a])[0],
                h.pc = r.pc / r.m,
                r.cp = r.pc,
                r.da = 0,
                r.sa = r.sv = 0,
                t = 0;
              !(e >= n) && (e != n - 1 || 7 & (r.c ^ t));
              t++
            ) {
              for (l = {}, o = {}, f = r.tv ? y() : 1, i = 0; 3 > i; i++)
                if (
                  ((p = ["v", "p", "a"][i]),
                  (f ? y() : 0) && ((a = N()), (r["l" + p] += a)),
                  (u = "v" == p && r.rv ? y() : 1),
                  (a =
                    w([3 * r["l" + p] + ("v" == p ? 7 * u : 0)], [!!i])[0] *
                    (u ? 1 : 100)),
                  (o[p] = a),
                  "v" == p)
                ) {
                  if (
                    !(l[d[p]] = a) &&
                    (s > 1 || 241 > t) &&
                    (r.zv ? !y() : 1)
                  ) {
                    o.p = 0;
                    break;
                  }
                } else "a" == p && (r.da = (1 > s ? 0 : r.da) + o.a);
              (r.sv += o.v),
                (l[d.p] = (r.cp += o.p) / r.m),
                (r.sa += o.v * r.cp),
                (l[d.a] = b(o.a)
                  ? t
                    ? c[t - 1][d.a]
                    : l[d.p]
                  : r.sv
                  ? ((m.floor((r.sa * (2e3 / r.m) + r.sv) / r.sv) >> 1) +
                      r.da) /
                    1e3
                  : l[d.p] + r.da / 1e3),
                c.push(l);
            }
            return (c[0].date = h.day), (c[0].prevclose = h.pc), c;
          },
          T = function() {
            var t, e, i, n, a, o, l;
            if (s >= 1) return [];
            for (
              r.lv = 0,
                r.ld = 0,
                r.cd = 0,
                r.cv = [0, 0],
                r.p = w([6])[0],
                r.d = w([18], [1])[0] - 1,
                r.m = m.pow(10, r.p),
                a = w([3, 3]),
                r.md = a[0],
                r.mv = a[1],
                t = [];
              (a = w([6])), a.length;

            ) {
              if (((i = { c: a[0] }), (n = {}), (i.d = 1), 32 & i.c))
                for (;;) {
                  if (((a = w([6])[0]), 63 == (16 | a))) {
                    (l = 16 & a ? "x" : "u"),
                      (a = w([3, 3])),
                      (i[l + "_d"] = a[0] + r.md),
                      (i[l + "_v"] = a[1] + r.mv);
                    break;
                  }
                  if (32 & a) {
                    (o = 8 & a ? "d" : "v"),
                      (l = 16 & a ? "x" : "u"),
                      (i[l + "_" + o] = (7 & a) + r["m" + o]);
                    break;
                  }
                  if (
                    ((o = 15 & a),
                    0 == o
                      ? (i.d = w([6])[0])
                      : 1 == o
                      ? ((r.d = o = w([18])[0]), (i.d = 0))
                      : (i.d = o),
                    !(16 & a))
                  )
                    break;
                }
              n.date = x(i.d);
              for (o in { v: 0, d: 0 })
                b(i["x_" + o]) || (r["l" + o] = i["x_" + o]),
                  b(i["u_" + o]) && (i["u_" + o] = r["l" + o]);
              for (
                i.l_l = [i.u_d, i.u_d, i.u_d, i.u_d, i.u_v],
                  l = p[15 & i.c],
                  1 & i.u_v && (l = 31 - l),
                  16 & i.c && (i.l_l[4] += 2),
                  e = 0;
                5 > e;
                e++
              )
                l & (1 << (4 - e)) && i.l_l[e]++, (i.l_l[e] *= 3);
              (i.d_v = w(i.l_l, [1, 0, 0, 1, 1], [0, 0, 0, 0, 1])),
                (o = r.cd + i.d_v[0]),
                (n.open = o / r.m),
                (n.high = (o + i.d_v[1]) / r.m),
                (n.low = (o - i.d_v[2]) / r.m),
                (n.close = (o + i.d_v[3]) / r.m),
                (a = i.d_v[4]),
                "number" == typeof a && (a = [a, a >= 0 ? 0 : -1]),
                (r.cd = o + i.d_v[3]),
                (l = r.cv[0] + a[0]),
                (r.cv = [
                  l & d,
                  r.cv[1] + a[1] + !!(((r.cv[0] & d) + (a[0] & d)) & f)
                ]),
                (n.volume = (r.cv[0] & (f - 1)) + r.cv[1] * f),
                t.push(n);
            }
            return t;
          },
          k = function() {
            var t, e, i, n;
            if (s > 1) return [];
            for (
              r.l = 0, n = -1, r.d = w([18])[0] - 1, i = w([18])[0];
              r.d < i;

            )
              (e = x(1)),
                0 >= n
                  ? (y() && (r.l += N()),
                    (n = w([3 * r.l], [0])[0] + 1),
                    t || ((t = [e]), n--))
                  : t.push(e),
                n--;
            return t;
          };
        return (
          (_mi_run = function() {
            var t, i, a, o;
            if (s >= 1) return [];
            for (
              r.f = w([6])[0],
                r.c = w([6])[0],
                a = [],
                r.dv = [],
                r.dl = [],
                t = 0;
              t < r.f;
              t++
            )
              (r.dv[t] = 0), (r.dl[t] = 0);
            for (t = 0; !(e >= n) && (e != n - 1 || 7 & (r.c ^ t)); t++) {
              for (o = [], i = 0; i < r.f; i++)
                y() && (r.dl[i] += N()),
                  (r.dv[i] += w([3 * r.dl[i]], [1])[0]),
                  (o[i] = r.dv[i]);
              a.push(o);
            }
            return a;
          }),
          g()()
        );
      });
    var C = {
      dd: function(t) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate());
      },
      ddt: function(t) {
        return new Date(t.getTime());
      },
      stbd: function(t, e) {
        return t &&
          e &&
          t.getFullYear() == e.getFullYear() &&
          t.getMonth() == e.getMonth()
          ? t.getDate() == e.getDate()
          : !1;
      },
      stbdt: function(t, e) {
        return t && e ? t.getTime() == e.getTime() : !1;
      },
      stbs: function(t, e, i, n) {
        return t.getFullYear() == e && t.getMonth() == i
          ? t.getDate() == n
          : !1;
      },
      stbds: function(t, e, i) {
        !i && (i = "-");
        var n = e.split(i);
        return this.stbs(t, Number(n[0]), Number(n[1]) - 1, Number(n[2]));
      },
      ds: function(t, e, i, n, r, a) {
        "undefined" == typeof e && (e = "-");
        var o = [];
        if ((n || o.push(t[i ? "getUTCFullYear" : "getFullYear"]()), !r)) {
          var s = t[i ? "getUTCMonth" : "getMonth"]() + 1;
          o.push(10 > s ? "0" + s : s);
        }
        if (!a) {
          var l = t[i ? "getUTCDate" : "getDate"]();
          o.push(10 > l ? "0" + l : l);
        }
        return o.join(e);
      },
      dss: function(t, e, i) {
        var n = this.ds(t, e, i),
          r = [t["get" + (i ? "UTC" : "") + "Hours"]()],
          a = [t["get" + (i ? "UTC" : "") + "Minutes"]()],
          o = [t["get" + (i ? "UTC" : "") + "Seconds"]()],
          s = [
            10 > r ? "0" + r : r,
            10 > a ? "0" + a : a,
            10 > o ? "0" + o : o
          ].join(":");
        return [n, s].join(" ");
      },
      dst: function(t, e, i) {
        var n = [t["get" + (i ? "UTC" : "") + "Hours"]()],
          r = [t["get" + (i ? "UTC" : "") + "Minutes"]()],
          a = [10 > n ? "0" + n : n, 10 > r ? "0" + r : r];
        if (e) {
          var o = [t["get" + (i ? "UTC" : "") + "Seconds"]()];
          a.push(10 > o ? "0" + o : o);
        }
        return a.join(":");
      },
      sd: function(t, e) {
        var i = t.split("-"),
          n = i[0],
          r = i[1] - 1 || 0,
          a = i[2] || 1,
          o = 0,
          s = 0,
          l = 0;
        return (
          e &&
            ((i = e.split(":")),
            (o = i[0] || 0),
            (s = i[1] || 0),
            (l = i[2] || 0)),
          new Date(n, r, a, o, s, l)
        );
      },
      ssd: function(t) {
        var e = t.split(" "),
          i = e[0],
          n = e[1];
        return this.sd(i, n);
      },
      gw: function(t, e) {
        var i = 6048e5,
          n = 2592e5,
          r = (t.getTime() - n) / i,
          a = (e.getTime() - n) / i;
        return Math.floor(r) == Math.floor(a);
      },
      gm: function(t, e) {
        return t.getFullYear() == e.getFullYear()
          ? t.getMonth() == e.getMonth()
          : !1;
      },
      gy: function(t, e) {
        return t.getFullYear() == e.getFullYear();
      },
      weekname: [
        "\u65e5",
        "\u4e00",
        "\u4e8c",
        "\u4e09",
        "\u56db",
        "\u4e94",
        "\u516d",
        "\u65e5"
      ],
      nw: function(t) {
        return this.weekname[t] || "";
      }
    };
    (this.dateUtil = C), (this.LoadingSign = o);
    var A = {
      replaceStr: function(t) {
        return t.replace(/[^0-9a-z_]/gi, function(t) {
          return "$" + t.charCodeAt(0).toString(16);
        });
      },
      nfloat: function(t) {
        var e = 0;
        return (
          t >= 1e5
            ? (e = 0)
            : t >= 100 && 1e5 > t
            ? (e = 2)
            : t > 10 && 99 > t
            ? (e = 3)
            : ((10 >= t && t > 0) || (t > -1 && 0 > t)) && (e = 4),
          e
        );
      },
      trim: function(t) {
        return t.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
      },
      ps: function(t, e) {
        if (((t = Number(t)), isNaN(t))) return "-";
        var i = Math.abs(t);
        return 1e5 > i
          ? t.toFixed(e)
          : 1e7 > i
          ? (t / 1e4).toFixed(e) + "\u4e07"
          : 1e8 > i
          ? (t / 1e7).toFixed(e) + "\u5343\u4e07"
          : (t / 1e8).toFixed(e) + "\u4ebf";
      },
      nu: function(t) {
        return (
          (t = Number(t)),
          (t = Math.abs(t)),
          1e5 > t || isNaN(t)
            ? [1, ""]
            : 1e7 > t
            ? [1e4, "\u4e07"]
            : 1e8 > t
            ? [1e7, "\u5343\u4e07"]
            : [1e8, "\u4ebf"]
        );
      },
      vs: function(t, e) {
        var i,
          n = "";
        return (
          t > 1e12
            ? ((i = (t / 1e12).toFixed(0)), (n = "\u4e07\u4ebf"))
            : t > 1e8
            ? ((i = (t / 1e8).toFixed(2)), (n = "\u4ebf"))
            : t > 1e5
            ? ((i = (t / 1e4).toFixed(2)), (n = "\u4e07"))
            : (i = t >= 1 ? t.toFixed(0) : "-"),
          e ? i + n : i
        );
      },
      zp: function(t) {
        return (t = String(t)), t.length < 2 ? "0" + t : t;
      }
    };
    (this.strUtil = A),
      (this.tUtil = {
        s0: function(t) {
          return (
            (t = parseInt(Number(t))),
            0 > t ? "" : 10 > t ? "0" + String(t) : String(t)
          );
        },
        tIWS: function(t, e) {
          for (var i = [], n = t; e >= n; n++)
            i.push(this.s0(n / 60) + ":" + this.s0(n % 60));
          return i;
        },
        gtr: function(t) {
          for (var e, i, n, r, a, o = [], s = 0, l = t.length; l > s; s++)
            (e = t[s][0]),
              (i = t[s][1]),
              (n = 60 * Number(e.split(":")[0]) + Number(e.split(":")[1])),
              (r = 60 * Number(i.split(":")[0]) + Number(i.split(":")[1])),
              (a = this.tIWS(n, r)),
              (o = o.concat(a));
          return o;
        },
        tradingA: [],
        gta: function() {
          return (
            this.tradingA.length ||
              (this.tradingA = this.gtr([
                ["9:30", "11:29"],
                ["13:00", "15:00"]
              ])),
            this.tradingA
          );
        },
        tradingRepo: [],
        gtrepo: function() {
          return (
            this.tradingRepo.length ||
              (this.tradingRepo = this.gtr([
                ["9:30", "11:29"],
                ["13:00", "15:30"]
              ])),
            this.tradingRepo
          );
        },
        tradingUs: [],
        gtus: function() {
          return (
            this.tradingUs.length ||
              (this.tradingUs = this.gtr([["9:30", "16:00"]])),
            this.tradingUs
          );
        },
        tradingLSE: [],
        gtlse: function() {
          return (
            this.tradingLSE.length ||
              (this.tradingLSE = this.gtr([["8:00", "16:30"]])),
            this.tradingLSE
          );
        },
        tradingMSCI: [],
        gtmsci: function() {
          return (
            this.tradingMSCI.length ||
              (this.tradingMSCI = this.gtr([
                ["07:00", "23:59"],
                ["00:00", "06:00"]
              ])),
            this.tradingMSCI
          );
        },
        tradingGDS: [],
        gtgds: function() {
          return (
            this.tradingGDS.length ||
              (this.tradingGDS = this.gtr([
                ["20:00", "23:59"],
                ["00:00", "02:29"],
                ["09:00", "15:30"]
              ])),
            this.tradingGDS
          );
        },
        tradingHk: [],
        gthk: function() {
          return (
            this.tradingHk.length ||
              (this.tradingHk = this.gtr([
                ["09:30", "11:59"],
                ["13:00", "16:00"]
              ])),
            this.tradingHk
          );
        },
        trading: [],
        gtAll: function(t) {
          return (this.trading = this.gtr(t)), this.trading;
        },
        gata: function(t, e) {
          var i;
          switch (t) {
            case "REPO":
              i = this.gtrepo();
              break;
            case "US":
              i = this.gtus();
              break;
            case "HK":
              i = this.gthk();
              break;
            case "MSCI":
              i = this.gtmsci();
              break;
            case "NF":
              i = this.gtAll(e);
              break;
            case "LSE":
              i = this.gtlse();
              break;
            case "HF":
            case "global_index":
              i = this.gtAll(e);
              break;
            case "GOODS":
              i = this.gtgds();
              break;
            default:
            case "CN":
              i = this.gta();
          }
          return i;
        },
        ist: function(t, e) {
          return (t = t.toUpperCase()), N(this.gata(t), e) >= 0;
        },
        gltbt: function(t, e, i, n, r, a) {
          for (
            var o,
              s = [],
              l = this.gata(n, a),
              u = l.length,
              c = 0,
              h = 0,
              d = t * u;
            d > c;
            c++
          )
            (o = {
              time: l[c % u],
              price: 0,
              percent: 0,
              avg_price: 0,
              volume: -0.01,
              holdPosition: 0,
              inventory: 0
            }),
              c % u == 0 && r && ((o.date = r[h]), h++),
              s.push(o),
              i || (s[c].price = s[c].avg_price = e);
          return (
            (s[0].price = s[0].avg_price = s[0].prevclose = e),
            (s[0].volume = s[0].totalVolume = s[0].totalAmount = 0),
            (s[0].holdPosition = 0),
            (s[0].inventory = 0),
            s
          );
        },
        azft: function(t, e) {
          if (!t) return t;
          for (var i = this.gata(e), n = 0, r = t.length; r > n; n++)
            t[n].time = i[n];
          return t[0].date.setHours(0), t;
        }
      }),
      (this.kUtil = {
        mw: function(t, e, i, n, r) {
          "number" != typeof n && (n = 0);
          var a = t.length,
            o = t[0];
          n > 1 && (o.volume /= n);
          var s,
            l = [],
            u = [],
            c = [];
          if (1 == a)
            (l[0] = {
              open: e.open,
              high: e.high,
              low: e.low,
              close: e.price,
              volume: e.totalVolume,
              amount: e.totalAmount,
              date: C.dd(e.date)
            }),
              (u[0] = {
                open: e.open,
                high: e.high,
                low: e.low,
                close: e.price,
                volume: e.totalVolume,
                amount: e.totalAmount,
                date: C.dd(e.date)
              }),
              (c[0] = {
                open: e.open,
                high: e.high,
                low: e.low,
                close: e.price,
                volume: e.totalVolume,
                amount: e.totalAmount,
                date: C.dd(e.date)
              });
          else
            for (
              var h,
                d = o.open,
                f = o.high,
                p = o.low,
                m = o.close,
                g = o.volume,
                v = o.date,
                b = o.amount,
                N = o.open,
                y = o.high,
                w = o.low,
                x = o.close,
                S = o.volume,
                _ = o.date,
                T = o.amount,
                k = o.open,
                A = o.high,
                D = o.low,
                P = o.close,
                O = o.volume,
                M = o.date,
                R = o.amount,
                I = 1;
              a > I;
              I++
            )
              (o = t[I]),
                n > 1 && (o.volume /= n),
                C.gw(t[I - 1].date, o.date)
                  ? (o.high > f && (f = o.high),
                    o.low < p && (p = o.low),
                    (m = o.close),
                    (g += o.volume),
                    (b += o.amount),
                    (v = o.date))
                  : (isNaN(r) ||
                      ((s = v.getDay()),
                      0 == s && (s = 7),
                      (h = s - r),
                      h > 0 && ((v = C.ddt(v)), v.setDate(v.getDate() - h))),
                    l.push({
                      open: d,
                      high: f,
                      low: p,
                      close: m,
                      volume: g,
                      date: v,
                      amount: b
                    }),
                    (d = o.open),
                    (f = o.high),
                    (p = o.low),
                    (m = o.close),
                    (g = o.volume),
                    (b = o.amount),
                    (v = o.date)),
                C.gm(t[I - 1].date, o.date)
                  ? (o.high > y && (y = o.high),
                    o.low < w && (w = o.low),
                    (x = o.close),
                    (S += o.volume),
                    (T += o.amount),
                    (_ = o.date))
                  : (isNaN(r) ||
                      ((s = _.getDay()),
                      0 == s && (s = 7),
                      (h = s - r),
                      h > 0 && ((_ = C.ddt(_)), _.setDate(_.getDate() - h))),
                    u.push({
                      open: N,
                      high: y,
                      low: w,
                      close: x,
                      volume: S,
                      date: _,
                      amount: T
                    }),
                    (N = o.open),
                    (y = o.high),
                    (w = o.low),
                    (x = o.close),
                    (S = o.volume),
                    (T = o.amount),
                    (_ = o.date)),
                C.gy(t[I - 1].date, o.date)
                  ? (o.high > A && (A = o.high),
                    o.low < D && (D = o.low),
                    (P = o.close),
                    (O += o.volume),
                    (R += o.amount),
                    (M = o.date))
                  : (c.push({
                      open: k,
                      high: A,
                      low: D,
                      close: P,
                      volume: O,
                      date: M,
                      amount: R
                    }),
                    (k = o.open),
                    (A = o.high),
                    (D = o.low),
                    (P = o.close),
                    (O = o.volume),
                    (M = o.date)),
                I == a - 1 &&
                  (l.push({
                    open: d,
                    high: f,
                    low: p,
                    close: m,
                    volume: g,
                    date: v,
                    amount: b
                  }),
                  u.push({
                    open: N,
                    high: y,
                    low: w,
                    close: x,
                    volume: S,
                    date: _,
                    amount: T
                  }),
                  c.push({
                    open: k,
                    high: A,
                    low: D,
                    close: P,
                    volume: O,
                    date: M,
                    amount: R
                  }));
          return (
            (l[0].prevclose = i),
            (u[0].prevclose = i),
            (c[0].prevclose = i),
            [l, u, c]
          );
        },
        nc: function(t, e, i, n) {
          if (t && !(t.length < 1)) {
            n = n || {};
            var r = t[t.length - 1];
            if (
              (168 == i && C.gw(r.date, e.date)) ||
              (720 == i && C.gm(r.date, e.date))
            )
              return (
                (r.day = String(e.today)
                  .split("-")
                  .join("/")),
                void (r.date = C.dd(e.date))
              );
            r = t[t.length - 1];
            var a = r.close,
              o = e.price - a,
              s = o / a;
            t.push({
              open: isNaN(n.price) ? a : n.price,
              high: isNaN(n.price) ? e.high : n.price,
              low: isNaN(n.price) ? e.low : n.price,
              close: isNaN(n.price) ? e.price : n.price,
              volume: isNaN(n.volume) ? e.totalVolume : n.volume,
              amount: isNaN(n.amount) ? e.totalAmount : n.amount,
              percent: s,
              day: String(e.today)
                .split("-")
                .join("/"),
              date: C.ddt(e.date),
              time: e.time,
              ampP: 0,
              amplitude: 0,
              change: o,
              kke_cs: 0
            });
          }
        },
        pd: function(t, e) {
          var i = t.length,
            n = t[0],
            r = n.prevclose;
          (isNaN(r) || 0 >= r) && (r = n.open);
          for (var a = 0; i > a; a++) {
            if (
              ((n = t[a]),
              e && e.usePc && (r = n.prevclose),
              (n.amplitude = n.high - n.low),
              (n.ampP = n.amplitude / r),
              (n.change = n.close - r),
              (n.percent = n.change / r),
              (r = n.close),
              n.day)
            ) {
              var o = n.day.split(" ");
              (n.day = o[0]),
                (n.time = o[1].slice(0, 5)),
                (n.date = C.sd(n.day, n.time)),
                (n.day = n.day.split("-").join("/"));
            } else {
              var s = n.date,
                l = A.zp(s.getMonth() + 1),
                u = A.zp(s.getDate());
              n.day = [s.getFullYear(), l, u].join("/");
            }
            n.kke_cs = n.close > n.open ? 1 : n.open > n.close ? -1 : 0;
          }
        },
        ms: function(t, e, i, n, r) {
          return (
            i > t && (t += 24),
            Math.max(1, Math.ceil((60 * (t - i) + e - n) / r))
          );
        },
        spk: function(t, e, i, n, r) {
          if (t == e) return !0;
          var a = t.split(":"),
            o = Number(a[0]),
            s = Number(a[1]);
          a = e.split(":");
          var l = Number(a[0]),
            u = Number(a[1]);
          if ((o > l && 3 > o - l) || (o == l && s >= u)) return !0;
          if (60 != n || (r && /^forex/.test(r))) {
            a = i.split(":");
            var c = Number(a[0]),
              h = Number(a[1]),
              d = this.ms(o, s, c, h, n),
              f = this.ms(l, u, c, h, n);
            return d == f;
          }
          return ("10:30" != t &&
            "11:30" != t &&
            "14:00" != t &&
            "15:00" != t) ||
            u == s
            ? !0
            : !1;
        },
        yd: function(t) {
          for (
            var e = t[t.length - 1].date.getFullYear(), i = [], n = t.length;
            n-- && t[n].date.getFullYear() == e;

          )
            i[i.length] = t[n];
          return (
            i.reverse(),
            (i[0].prevclose = t[n]
              ? t[n].prevclose || t[n].close
              : i[0].prevclose || i[0].close),
            i
          );
        },
        rd: function(t, e) {
          var i = [],
            n = C.dd(e);
          n.setFullYear(n.getFullYear() - 5);
          for (var r = t.length; r-- && !(t[r].date < n); ) i[i.length] = t[r];
          return (
            i.reverse(), (i[0].prevclose = t[r] ? t[r].close : i[0].close), i
          );
        },
        adbd: function(t, e, i, n) {
          for (
            var r,
              a,
              o,
              s,
              l = i ? C.stbdt : C.stbd,
              u = t.length,
              c = e.length;
            c--;

          ) {
            if (((o = e[c].date), 1 > u)) {
              c = e.length - t.length;
              for (var h = [], d = t[0]; c-- > 0; ) {
                if (((a = w(d) || {}), (a.isFake = !0), (a.kke_cs = 0), n))
                  for (r in a) a.hasOwnProperty(r) && m(a[r]) && (a[r] = 0);
                h.push(a);
              }
              t = h.concat(t);
              break;
            }
            for (var f = u--; f-- && ((s = t[f].date), !l(o, s)); ) {
              if (o > s) {
                if (
                  ((a = w(t[f])),
                  (a.isFake = !0),
                  (a.date = o),
                  (a.kke_cs = 0),
                  n)
                )
                  for (r in a) a.hasOwnProperty(r) && m(a[r]) && (a[r] = 0);
                t.splice(++f, 0, a), u++;
                break;
              }
              t.splice(f, 1), u--;
            }
          }
          return u > 0 && t.splice(0, u), t;
        },
        ayd: function(t, e, i, n, r) {
          for (var a, o, s, l, u = C.stbd, c = t.length, h = e.length; h--; )
            if (((s = e[h]), !(s > r))) {
              if (n > s && !C.stbd(s, n)) break;
              for (var d = c--; d-- && ((l = t[d].date), !u(s, l)); ) {
                if (s > l) {
                  o = w(t[d]);
                  var f = o.close;
                  for (a in o) o.hasOwnProperty(a) && m(o[a]) && (o[a] = 0);
                  (o.open = o.high = o.low = o.close = f),
                    (o.date = s),
                    t.splice(++d, 0, o),
                    c++;
                  break;
                }
                t.splice(d, 1), c--;
              }
            }
          return c > 0 && t.splice(0, c), t;
        }
      }),
      (this.domGc = new (function() {
        var t = u.$C("div");
        return (
          (t.style.display = "none"),
          function(e, i) {
            if (e) {
              if (e.hasChildNodes())
                for (; e.childNodes.length > 0; ) e.removeChild(e.firstChild);
              if (i) return void (e.innerHTML = "");
              t.appendChild(e), (t.innerHTML = "");
            }
          }
        );
      })()),
      (this.getSUrl = function(t) {
        if (!t) return null;
        var e,
          i = t.match(/(\w*:\/\/)?([^\/]+)(\/+.*)?/i),
          n = i[2],
          r = i[3];
        return (e = ["https://", n, r].join(""));
      }),
      (this.TipM = s),
      (this.logoM = new (function() {
        var t =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAYAAAB5LPGYAAAZEUlEQVR4nO18eZhcVZn3G+ha++77dtZ7qzohHXpJ6AXC5vopyqgsMiMQP0QlBkQHEfQBJMoyjBANGmUgQGDQQQdEEoKiSBDEQTDgJEDAEfiAkJ2QNAlZO+f7o251bleqOyGDRGb69zzv01X33POec+5577ueaoB3AHM/cfJRO6afe8/9nzr9C+/EeGMYwxBmaObHXz6kc/1A+xRxvU+uybbNNL3pv4snLDpRUk86UPMbw/8stH5Q1o8EgHEAAB9U1e71XX2bV3b2io3d/eJkzTo2va+wqK399k3d/WJwylRxmm5/+MBNeQz/UzDuofGHLnj+0MkbACAHAActbe96fG1Xn1jV2SuWtU9+Nr0v99iEjp8NdPeL17r6xMLKxHvqDAIA60tucOZszK9kAO4BWcUY3l1QAXQAgOmWe/zOKVPFHyZ0PAUAcFVIvzbQ3S+Wd/SIVZ29YsnE7j9OLcjVn8Xjf7whvb6xs2/wA6o6GQDgQhed8cqhh728uftwsXPKVNFdKCQHcl1jeBfgIi86/654wp0AAL+uTvr1+q4+8cKkwzY+2Dbp7hUdPbte7egRy1N6taNHrOzo2fZaV594Jf2+urN359c9NOMWWpm3qftwsbKzV7zR3S9+QOKLDvTaxvA3jgDAWt/V9+btvG3hcZLevqazZ/urqWCt7eoT9c+NtLyBXu/qF+u7+sTyjh6xrqtP/LLafhekPuQYxjAiLg2iszd194tXOw7bvLKzZ92KVKBWdfaK17v6xRvd/WJNZ69Y2dH7xsqO3oFVHT2DA939YkN3v1jV2buHIC7v6BED3YeLU3T7yAO9tjH87WPcIxM6/pDVdKvTSPe59u5n5tJk1hmGc8KUvNTeXiqh9lIJdeSlidMs6/hrEb/mz5OmvLAx9QOztKGrX8xG7JsHenFj+BvHiZp1zIbOvl11wdnY3S+WTZq85NOGfRIAFPbW3wBQZkf0GwPd/TuzZnn17mg5/9dfxRjetZifHPKjut+2obtf3M7bbrIBpHq7UlaOC1z/LhJFS5EfPKyr6lnN+HzLx5+t86kHKmu7+rb0FIvsnVvNGN5tkJZN6l6+qrNXvNbVJ+Ynh9yRbXQsa2ZCmYgJHaIK48I2zaaR7e/aJj20trNvSADXd/Xt7JWkQ96ZpYzhXYfJeXn8ms7ewZW1AGOgq1gk9TZZlj9SoVzEhIqEMsEx2cYQ3hUTKijCKyGjJeuYjegVdX9wRUePWN3Zs6H9byMJ3XKAxzYO0NitAFDch/ty0GQ//+r4iKZ1DKQR7qPjO36XbQtcb0FCmfBs93uGqn4F+8ENDOE3OSYiJnQAALxGfj9h4+fVzfD6rn5xX3Xive/YYpqjNfS8O0PPu3M/+7dA7QXKCnCrZRjnSUXpPfvQ3ydRtBQH4e8B4KC3MG4RakKrjUAG7MU/l8vlj8aU/j9VVU/e22CB694eY7I8n89PSi+Ng1pRQh9lDlrabpx00kkHv4W17QYF8FZ09A6s6+oTj43vfCzbFvrBcxThp+vfSRg9kQqfoGH0J2jQKlUoha90HLZ2Rar93uzu33W8rB+xXxN7GxF5wX9UKBMA4Ddp1gqFwofK5fLxpqadrinaF3VVvSJwnHmB5z/MIvQyJ3QDAKB6B0NVP1PlsYgJ3dhaLL53b+OTEL0YE7oLAIJ9nrPr/yzGZIBjsiVLDJMtFOFVDJNVuVyuczQevuP+qMK4KBQKbaPdZ+vm5W08FrZpzoFUW6qSdGJC2dYYk62Nc+CYbGEIb6ZRtJohvEqTlCdnzZpV2te17YFfVibesaG7X6zt7N32cdnozyzgX2NCB8q53BRVVj8TE7qdYyIqlAtV3ePES2FRddIvXuvqEys6esSm7sPFTB99eb8ntZ+wTfOi0PNuCRzn5tDzbglc9yYSRf+VUCZQEMwPXPem0PNuCb3gZgDQVVk+s8pjUaFMVBgXCaE7aYQ2sQi9TEK02LPdhb5tfwdqb3sdRd+2b6gwLjgmm8vl8ocAAAxVPTNw/esj17+tTqHnzWMIr6tQJkgYLgo975bI9W8LPG9e4Hg/8G33CtgzSxAlhG4Lff9hTVEuURTlYkVRLtYU5RJD02ZyTLZShJYDwGibXmYRWouD4MnRnpep6zOqPBa2YX43e71YLB6rKcolzUiV5QsNTfsmx2RjhXFRyOev2ucNaoaeglxd39W3bkN3v3imffKzvQWlkjYFNELPVXlc25xaMDKgKdoXs/2PlaSJD7cd+sDG9EDC6539A5f6+HP/rUntH2QcRvdThBczTJYRhJ6iCD1FIvQ4DsJHSIT+yAlZRsLoCRJGiwAgF3rewpjQrcVi8egCFBKomVsJ9u4ztkS+f2+1pjkuA4AWhvCqmFDhO94vs+TZzp2ubf8kcN170mu/QH7weIVxEXn+ImioFGmKclqVx6K1tbWZdg0Swna6ln3DaJMrlUr9FcaFpVvnj3SPrih/X+WxsHXz2r2stRFS6Pl3JIQOOob1jbfYtzk+oRh9z0+a8uz2KUeINZ09G64O6ZdDABMAynlFObVomhcdLMtnAICVdjn4OFWdfD2pXPt6V+/2bZOPEBs6+3Y90NZ+x4db9UmjDPXXxDgAKESuf1vk+3MbGw3DODnGbKkkSUell0xO6JbQ9X+9n+MZra2tHwCobXiVceFa9h7jNoMma2dUeSxUVd3jRQ0d706OySaovQhG6HqLDE07DwBAU5RzU+H8P6qqfiZy/bm+6w6jwHG+j4PgdzGhAgXhr0LH/ZfQda+DTDBYLpc/UuWxCNzdz8nUtE+XcqWe0eYtSdKJMSbrYkI3SpJ04j49pbeAlu9F9KsvTJr8kjhsqnitq3f7g23tD9xI4su/6gZfPN8OZlwZoG/eWz3krufaJ788OGWq2DHlCLFsYveLN+LkO8dJevvbPaH9wEHIDx6uMC6kYrF+XhE0WT6+ymMR+eGiIgADAJBl+eNVHgtT18/eV97lcnlyswZT1y9LBeOD+8IodP1fx4TuKgDEDU0yx2Rj4HrzAQAkSTqhLU6E0qr8PQBA5PmLOMJvAICH/OBXHOFXWISGiEToLwzhN2NCBcNkC4nQ8zxCy0ktCCoB1IQvJnTQse3v1wf1HOeq8XEiHMtqWrkqFAptgev/uMK4CFzv36C5P71PaMnlcp26opyqKcpFlmF82zbNf9JV9cK8LH8MAAIdQP2U4XxgDmLfXFCZsPDpid3PvHJozysvd/Qsf+nQw164v9r+2M+T8bdd5IXT3ydJE6AW3bVAPt8uScopuqp/3XWcWYHr3hQ4zjzHsq7RZO3T0DwdI5dKpamaLE8zNO1iz3W/59nOPM925vmuO9fWzSs0RTm9AIXGjRoRcln+KIvIE3UTpivKKQllm13bHmZqAte9KSFsVxGA7wPbXOD7P0oo22Xq5tca2sbhIHo8IVRgP1gWuv6To5P3h5jQ7cgPH4MG89va2vq+Ko+Fpmn/FwDAs6xbY0K3QRr5xoRuCz2vnlnIQ81VqBMUAQgNo+cSyoRvu3MzbeMAoMVSjc9VKN/mOs6/pjzNwHHmtPFYjGBOI8+yvh0TOlh3wwLXu7EIQPfhmQ1DydC0c2kY/SfHZFdCmWhGMWXbLNe9fRQ+2Qem51T1LM/zFtLU/xniRehuokxUKBMc4eWlUqk3y8y17e9V04Xt0S/LD5M3LMP4BjQ/WVMOXPee0PcXB56/GAXhEhyhp33HeSj0/cUVxkWFMhG63qOh6z0Wef7jxWLxKBxG/0WC8FmouRr6CGRCbQMPMjTtH5M0WPFtdzYAyAAAhUKhkhC6LfL8pbqq/7OhalePRqHrPVBhXBiatseGu6Y5O42YEQDkOMJroyD4DUBNG1Z5LHRV/fwIe2OQMHqyvg+yLP9dtjGfzx/SlgZcLMKrSRitYQhvrDAuLMP4UvbeUqnU79v2DQll2xPKhGNZsyRJOiZ0vflVxgUnZEvq++49v1koFGIcRX/IVjQaPyeUiRjXPnuWcysAgGVY/0wR/ovr+r+yLPsnjuPcrap63ak9CEfoj5WUD8dE1FM0dapfq1OlllPMCneZIbKmUh+/1mdndn6N/UulUrO0jmXq+lWGps0yNG2WpmpX66p6lWkYN1qGcYOqqJdpivYtQ9WuNjRtlq7rV8qy/NH6WAzjrRyTbTSMBnAYrqMIb+GYbEuv/bkuaAAAqqROTygTVR4LRVGOAwDQdX166s99Zq+bAQCObX+/wrgolUp9DU0HE4ReIEH4RF0IqjwWuqKcDQDgWc6tCWWiidkGALBohP7EMFnJIvTnuGamrYZ7DEPTzlNl+UxT06ZxTP5SoUxosvxpAIBcLtdlatpFOIierjIuYkI3u6Y5u1AoVLJMdEU5lWGyssq4IAi/WMjlps+ZM2fEJLZKEXqqvpkxoQIHwWJDVT9XbGk5stTScrgqqSe7pjmbRujlKo+FXC5/FAAAheGjQ0JKqKjyWKiSdDJA7W3imOzMCkhMqCBhtMx3vDt8x/0ZjdC6bHtCqAgcZ8jhL5VK/SQMH7VN80pVkk4stbT05/P5iblcrkdRlFNxED2eFcKEMmFq2rR92WQA0GgYPaeq6vRmjYamXVKhXNi6eZmuqmfpqnpW6AULKowL17av1VX1LF3XZzRqEQAAXVWnK4pySv176Hn3xoQOlnO5w6Bm1tQMNSZufYbwKhJGr0BDIjmfz0+qMi4szbgEAMDW9SsqjIvURcixCK0hYfinJsuJWIT+k0V4tSRJx3CE1wae/8vRHo5r2XMrlA/U11fO5SbXsx04jB5L6/3OKCyCyK/5hJairr311lub1/t1RZ9RqZXRhjbRGPlNNVzbvjId2GCYvJ4VIIbwKqg9VDA07ctJhm9M6HZVkk6AWkkHAAAkSTp5mAARKhzbnpMZb9TkpSbLH8uOkRAqSqXS1Ca3FgAghFqiNwAAz9TNC6osFnpNUPz0egipViBB+CRDeB1kTHrguvNjQt+EWvlqX2FRhNfXnX6K8BYaoQ0kCNfQCG2iCG9hCG+tE0d4R5XHwnec6xsZ6ap6foVxkcvlugAAaBg9R6NoCQBAqVQ6vMpiYRnWzGyffD4/kSL8Isd4PQC0tRaL762Zab3piwcANgmjBzkhr5dywzRwTpblaQWAt/TTCVPTTgeAkYNPWzdvyW5iKkiboyB4xLOsH+iKfnaxWDwKGuqAxWLxmKRBcP3UNAMAREH4m6xWTR3qYZBK0gmNPORaoJOFI5WkE1zTvtKznTtQED1EEX4mn88fYhnGpdn+JEQvAkB5jzWa5reqPB5MKBtMKBusULYtxmRHqrl3JpTtTCgbrPJ40DbNrwNAWGF82HoAwEko2xp5/i/28sz1tLJwMACALMsfq0WG/l26os/QFX0GDtHi1G+6xlT0s01FO6dOqqp+zpS1aY1mDQAAB8HvKUKvAsBBuVyuq1rzE89L9/HKKouHmW2lXP5wQtkAR/iVegnNc5x5afVjD/65XK6LRNHSGJO/5PP5iekavHw+3w61CgjxbPennuPcHbju/MB153u28++uZf+b7zg/r18LXHd+6HkLNbkWKI0KSzMuTTP2otFcJmR38EERfl6r5fkAAMBQja80Co9SLh+XNkcM4U1xps0yjJmNY7um+d0kowFTjVN3Wl3Xtq+NEV5bn0OFMlGhXHCENwGAhoPwyayQp1HdHtAk6VhDVU/SZO3juqKcahvGuTGhIvS832iy/DFNkj6hKdpp6dtqWYYxs8pi0VrcnejNOPgjaQ4AAPBtd26F8UG1tfV9AACubc2tMi5KudxQ/szQtC+nvts/NGGhe5b1bd9xb4Phye6oQplwrZpm9B3n+gphO6CmtQ/GEXqeRXgdpPVkWzcvqDAucBAuBoD6AZIiQ3gVCqMl0BCsSZL0yYSyXak1XEHD6DkW4YEK4zs4oS8BQKsqSZ9Efrg08vyUvCU0QpsrlAkShC/tvu4vRX64VC6X93BPmsFEfnhvknH0mwUIdcc/V/NjasXpzH0U4eWQaklNUU5vML+7GqNbAGjBQTTkeyaEisD17wKoRY0c4T/XeaRz2oaD4PeB694ot7ZOy+fz47M+ZrOoLgtNlqfZunkhAECxWDyqymKhStKJpVKpX5blrN8ocUxeIxF6GlItBgDg2UOaozrSGMVi8cgK4wIF4X9ATRMXaISWpyeDhtyJXC7XVaFM4CAYOtxRKBTaPNv5foXxHTGhOwPHG6q7AgCoNXdls1QsvgcA9JjQLa7lXJc2I47pElPXLwAAD3nB/CqPReh5t0PGcpVKpcPTo3KXN85dluUzaBQtCVzvbsewrtNV9XJT085RFOWUuslvBhwEv48J3QoA9kj37BMkSTrWNs3LAtdbQCL0FCdkS6MgJpQJpbX1tNrA0VPDzK/j/LDOK/S8n2Y1UxopDqtn5nK5Lo7J4DABaq0JAgqjB5OG/uVcuTvb39C084YEFBNBI7QOaimRPSDL8kdqfpX7YwAY51jW9TGh2wuFQoUi9GqFcpHP5ycAADiGdWkbT4Sqqp/MsChxTFajMFoKI/+AqoCjaElC2fa6uatXPxzbvrnx5tD1HkgoE7ZuXujZzs0JYbtiTNalwkGb8FchTe76jvMvFcZF4DhXF2sCCQBQ1hXl1BiTtRXGhanrX21kYJvmZWl03SxTsD/H0VhM6GDoBfe/5Z5JktiaoswCADzCLV7k+/c1BgnpRlkck81Z4ZGK0jFpP41hsjprfh1zd0a9Dts0v97ge24GAKucy3U1mvZm6QsURL/Nas/Q9e5utohcLtedULYNB9F9UHvIeYrISuT7DwEAWIbxjTaeCNs05xShSBPKtkd+8FvIHI0qlUpHpDXRPTRHHZZhXFzlsXCs3UGAZRgzqzwWUi34GoZSqdSTELYjdW9eVWtlq70GN6amnVaLRMPfJJQJTuhqqOUEyxzjFQzhF+Xmgdg4FEZLOCarYS/BXYo8ALip66A0u8GQ1c9WeSwMTTt3H/gNx5QpU96PPF9whNe6tn1tWiJKoBbhknK5/CEShs9mBSH0vJ8CALQWWt+fNY80jIZ+15E6vsMEqFn5KQqCR7JaLvLDB9NFndlgvkXouve0FlrfX8qVelVZ/SwOgvs5JrvqwscRfjlNcQxDuVyeHBO6Hgfhk/WHWM7lJqfO+z8C1Mw9DsJHTE2blqaV3mw8nmSb5uWpg9/06Fg+n59UoXx7araHzCYJwic4JhthdzpFlyTpBN+2vwsA41RZrq0V4bWaopwGezkPaOrm2W08FpHr/xwACo7lXJf6eY8AQCkNLJpagSIAqzAufGdYYAUA0CIVi0erkjrds6xrPNtdQMLoSRahNQlhOxjGK2CE3+yEXnB3gtkOyBxF22ccPfXIH0SuNyQkCaGCE7KFY/Iax2RzVsASygTyg/sgPXKUDUDSaG6oPug5zg+zWpNhshL2fIM4x3RrVkh1VT0fAKC1tfWDFTo8KMomnof9xWRn4HnzoOaI7wHLMD7LEHoYMv6JbZqzK4yLfD6f/RlAOfS8n6TJ41Ma2IzDYbQ0TTE1OzmcI2H4aFpbPiZznXFMduEoWlrLIXoLY0IHqoyLwPHm1W/SZO2MBNNNVcYFCdEztmleVKzVqIeSxPl8fkLdrwsc52bYLdBlHEaPpadmfgG73QMZambcAwC9WCyywHVr6yuXG/8vj8oQXpdQto2G0UtREDziO85tpq7/k67qnzd18wJVkk6QGkhXlE9RhDYxhNepqnpSY3uaDx75pPt7jj727sjzd1c5MhWKbOmNhNGy9HjVkI/g2fa8IfNX83nqmynFmAxFrVUei9Dx/r1xbMswvlLl8dAYqUDUc0UtvuNeFxM6OFI5kCD8gmfbc8rl8pQRF5h5wCSM7sVh9AgNoz9VGK875/XN0pEfPDRSbiyfz09INcctTXgf5FjWNU3ydrnQ8+7Mzhn5wUOaopxTgD3TH/l8fkLguD/imAy28UQwTF5MtXCLY1nXpJWgrbredH6TOMZPm6b5NUgFU9O0L6UHYgcTyrZWGBdVHtddoUYt25KOZUMT/5Zj/HQbj0WVNdLQ8bvBKuPD23gsqjzeMUJFpoYgCMq5XK5PU7QvOoZ1Xej5d4autyDy/bt8251r6voFxWLxaGjy1qNgdwUkTOuQKRxT1y8z1RrZun5FKZdrjH5BlaSTbF2/wlT1y0xdvzzNZQ07sp3L5bpNXT/bMozvmJrxXUPTLtZkeVqpVOqBt5YIdiM/XBh5/qLQCxaYmnYODK8wSDiKfqvretP/ZWho2hkJ4xvlcvn4Js1K6AULSBQtheFR4MHID+7DQbjY0Iwvwb4dZoBCoVA1Ne2cTLJ3nGNYMyM/vKNQGPWwxTCfTimXP4SC4HbPtueZuv5DQzMulmq53LeKvJTPt+fz+UkjUHt+hPZmeca3CypFeMVQVKwop/61BnoHMdq/BqlHn6P5Z82c+ta99BnD/qBQKLTVqwjpsW95r53GMIa3C8Vi8b11v8a17SsO9HzG8L8MuqKcmkbAm4pQpAd6PmP4XwYrrWN6tjNn73ePYQxvM/It+Us8y34T9if5OIYx/Hcx4/Off/85X/jCJw70PMbw7sT/BxKFMrtCLlbqAAAAAElFTkSuQmCC",
          e = u.$C("img"),
          i = !1,
          n = [],
          r = [],
          a = function() {
            u.xh5_EvtUtil.addHandler(e, "load", function() {
              for (i = !0; n.length; ) {
                var t = n.shift();
                s(t);
              }
            }),
              (e.src = t);
          },
          o = function(t) {
            if (t.logo && !u.xh5_BrowserUtil.noH5) {
              var e = t.logo;
              t.color || (t.color = "#ccc");
              var i = u.hex2dec(t.color, 0 / 0, !0);
              (!i || i.length < 3) && (i = [200, 200, 200]);
              for (
                var n = e.getContext("2d"),
                  r = n.getImageData(0, 0, e.width, e.height),
                  a = i[0],
                  o = i[1],
                  s = i[2],
                  l = 0,
                  c = r.data.length;
                c > l;
                l += 4
              )
                0 != r.data[l + 3] &&
                  ((r.data[l] = a), (r.data[l + 1] = o), (r.data[l + 2] = s));
              n.putImageData(r, 0, 0);
            }
          },
          s = function(t) {
            if (u.xh5_BrowserUtil.noH5) return null;
            if (!i) {
              for (var a = n.length; a--; ) if (n[a].id == t.id) return null;
              return n.push(t), null;
            }
            var s;
            (s = u.$C("canvas", t.id)),
              (s.style.zIndex = 0),
              r.push(s),
              (s.style.position = "absolute"),
              (s.style.top = t.top + "px"),
              (s.style.right = t.right + "px"),
              (s.width = e.width),
              (s.height = e.height),
              (s.style.width = t.LOGO_W + "px"),
              (s.style.height = t.LOGO_H + "px");
            var l = s.getContext("2d");
            if (t.isShare) {
              var c = u.xh5_BrowserUtil.hdpr;
              if (2 > c) {
                var h = c / 2;
                l.scale(h, h);
              }
            }
            return (
              l.drawImage(e, 0, 0),
              o({ logo: s, color: t.color }),
              f(t.cb) && t.cb(s),
              s
            );
          };
        (this.getLogo = s), (this.styleLogo = o), a();
      })()),
      (this.grabM = new (function() {
        var t = function(t) {
            var e = t.dom,
              i = t.child;
            if (!e || !i) return null;
            d(e) && (e = u.$DOM(e));
            var n = e.getElementsByTagName(i);
            if (!n || n.length < 1) return null;
            var r = u.xh5_BrowserUtil.hdpr,
              a = e.offsetWidth,
              o = e.offsetHeight,
              s = u.$C("canvas"),
              l = s.getContext("2d");
            (s.style.width = a + "px"),
              (s.style.height = o + "px"),
              (s.width = a * r),
              (s.height = o * r),
              1 != r && l.scale(r, r);
            var c = u.xh5_HtmlPosUtil.pageX(e),
              h = u.xh5_HtmlPosUtil.pageY(e),
              f = u.xh5_HtmlPosUtil.parentY(e);
            l.textBaseline = "top";
            for (var p, m, g = 0, v = n.length; v > g; g++) {
              (p = n[g]), (m = u.getCSS(p));
              var b = u.xh5_HtmlPosUtil.pageX(p) - c,
                N = u.xh5_HtmlPosUtil.pageY(p) - h,
                y = Number(m.paddingLeft.split("px")[0]),
                w =
                  0.5 *
                  (Number(m.lineHeight.split("px")[0]) -
                    Number(m.fontSize.split("px")[0]));
              (l.fillStyle = m.backgroundColor),
                l.fillRect(b, N, p.offsetWidth, p.offsetHeight),
                (l.font = [m.fontSize, m.fontFamily].join(" ")),
                (l.fillStyle = m.color),
                l.fillText(p.innerHTML, b + y, N + w);
            }
            return { canvas: s, x: c, y: f };
          },
          e = function(t, e) {
            if (u.POST) {
              var i = e.txt || "",
                n = e.url || "",
                r = "_" + Math.floor(1e3 * Math.random());
              window.open("about:blank", r);
              var a = u.getSUrl(
                "http://stock.finance.sina.com.cn/misc/userapi/Pic4Weibo.php"
              );
              u.POST(a, { imgData: t, symbol: "imgData" }, function(t) {
                t &&
                  t.match(/^http.+/) &&
                  ((t = encodeURIComponent(t)),
                  (t =
                    "http://service.weibo.com/share/share.php?source=bookmark&title=" +
                    encodeURIComponent(i) +
                    "&url=" +
                    encodeURIComponent(n) +
                    "&pic=" +
                    t),
                  window.open(t, r));
              });
            }
          },
          i = function(i) {
            if (!u.xh5_BrowserUtil.noH5) {
              var n = i.ctn;
              if (n) {
                for (
                  var r,
                    a,
                    o = n.getElementsByTagName("canvas"),
                    s = i.w || n.offsetWidth,
                    l = i.h || n.offsetHeight,
                    c = u.xh5_BrowserUtil.hdpr,
                    h = [],
                    d = u.xh5_HtmlPosUtil.pageX(n),
                    f = u.xh5_HtmlPosUtil.pageY(n),
                    m = o.length;
                  m--;

                ) {
                  (a = o[m]), (r = a.style.zIndex);
                  var g,
                    v = !1;
                  for (g = i.ignoreZIdxArr.length; g--; )
                    if (r == i.ignoreZIdxArr[g]) {
                      v = !0;
                      break;
                    }
                  if (!v) {
                    for (g = i.ignoreIdArr.length; g--; )
                      if (a.id == i.ignoreIdArr[g]) {
                        v = !0;
                        break;
                      }
                    if (!v) {
                      var b = {
                        canvas: a,
                        x: u.xh5_HtmlPosUtil.pageX(a) - d,
                        y: u.xh5_HtmlPosUtil.pageY(a) - f
                      };
                      h.push(b);
                    }
                  }
                }
                if (!i.nologo) {
                  var N = u.logoM.getLogo({
                    cb: null,
                    id: "share_logo",
                    isShare: !0,
                    top: i.top,
                    right: i.right,
                    LOGO_W: i.LOGO_W,
                    LOGO_H: i.LOGO_H,
                    color: i.color
                  });
                  N &&
                    h.push({
                      canvas: N,
                      x: s - Number(N.style.right.split("px")[0]) - i.LOGO_W,
                      y: Number(N.style.top.split("px")[0])
                    });
                }
                if (i.extra) {
                  !p(i.extra) && (i.extra = [i.extra]);
                  for (var y = 0, w = i.extra.length; w > y; y++) {
                    var x = t(i.extra[y]);
                    x && (h = h.concat(x));
                  }
                }
                var S = u.$C("canvas"),
                  _ = S.getContext("2d");
                (S.style.width = s + "px"),
                  (S.style.height = l + "px"),
                  (S.width = s * c),
                  (S.height = l * c),
                  (_.fillStyle = i.bgColor),
                  _.fillRect(0, 0, s, l);
                for (var T = 0, k = h.length; k > T; T++) {
                  var C = h[T];
                  _.drawImage(C.canvas, C.x * c, C.y * c);
                }
                e(S.toDataURL("image/png").substring(22), i);
              }
            }
          };
        this.shareTo = i;
      })()),
      (this.bridge = new (function() {
        function t(t, e) {
          for (var i in t) t.hasOwnProperty(i) && (t[i] = e + t[i]);
        }
        var e,
          i,
          n = !1,
          r = "sinatkchart_SLBridge~",
          a = {
            SAVE: "save",
            LOAD: "load",
            REMOVE: "remove",
            DATA: "data",
            READY: "ready"
          };
        t(a, r);
        var o = [],
          s = {},
          l = [],
          c = function(t) {
            var e = t,
              i = e.key,
              n = e.options,
              r = e.value;
            S.save(i, r, n);
          },
          h = function(t) {
            n || i || l.push([t]);
          },
          d = function(t) {
            var e = t,
              i = e.key,
              n = e.options;
            return S.load(i, n);
          },
          f = function(t, e) {
            return n ? void 0 : i ? void (s[t.uid] = e) : void o.push([t, e]);
          },
          p = function(t, e, i) {
            var n = d(t);
            e(n), i || f(t, e);
          },
          m = function(t, e) {
            t && (c(t), e || h(t));
          },
          g = new (function() {
            var t = function(t) {
                if (t && t.type) {
                  var e = t.type;
                  if (-1 != e.indexOf(r)) return e;
                }
                return void 0;
              },
              e = function() {
                for (var t; o.length; ) (t = o.shift()), p(t[0], t[1]);
                for (; l.length; ) (t = l.shift()), m(t[0]);
              };
            this.onMsg = function(i) {
              var n;
              try {
                n = JSON.parse(i.data);
              } catch (r) {}
              var o = t(n);
              if (o)
                switch (o) {
                  case a.READY:
                    e();
                    break;
                  case a.DATA:
                    if (!u.isFunc(s[n.uid])) return;
                    s[n.uid](n.result), (s[n.uid] = null), delete s[n.uid];
                }
            };
          })();
        u.xh5_EvtUtil.addHandler(window, "message", g.onMsg),
          (this.load = p),
          (this.save = m),
          (this.getStatus = function() {
            return i && !n && "1" == e.getAttribute("data-ready");
          });
      })()),
      (this.colorPicker = (function() {
        function t(t, e) {
          var i = function() {},
            n = t.prototype;
          (i.prototype = e.prototype), (t.prototype = new i());
          for (var r in n) n.hasOwnProperty(r) && (t.prototype[r] = n[r]);
          t.prototype.constructor = t;
        }
        function e(t, i, n) {
          if (!i) return t;
          t || (t = {});
          for (var r in i)
            i.hasOwnProperty(r) &&
              ("Object" === A(i[r])
                ? (!t[r] && (t[r] = {}), e(t[r], i[r], n))
                : (!n && r in t) || (t[r] = i[r]));
          return t;
        }
        function i(t) {
          var e =
            "undefined" == typeof getComputedStyle
              ? t.currentStyle
              : getComputedStyle(t);
          return e
            ? ((t.clientWidth || v(e.width) || v(t.style.width)) -
                (v(e.paddingLeft) || 0) -
                (v(e.paddingRight) || 0)) |
                0
            : 0;
        }
        function n(t) {
          var e =
            "undefined" == typeof getComputedStyle
              ? t.currentStyle
              : getComputedStyle(t);
          return e
            ? ((t.clientHeight || v(e.height) || v(t.style.height)) -
                (v(e.paddingTop) || 0) -
                (v(e.paddingBottom) || 0)) |
                0
            : 0;
        }
        function r(t) {
          return t.getBoundingClientRect
            ? t.getBoundingClientRect()
            : { left: 0, top: 0 };
        }
        function a(t) {
          var e = t.getContext("2d");
          e.clearRect(0, 0, t.width, t.height);
        }
        function o(t, e) {
          var r = document.createElement("canvas"),
            a = r.style,
            o = i(t),
            s = n(t),
            l = o * e.width,
            u = s * e.height;
          return (
            (r.width = l),
            (r.height = u),
            (a.position = "absolute"),
            (a.width = l + "px"),
            (a.height = u + "px"),
            (a.left = o * e.left + "px"),
            (a.top = s * e.top + "px"),
            t.appendChild(r),
            r
          );
        }
        function s(t, e) {
          var r = document.createElement("ul"),
            a = r.style,
            o = e.label,
            s = i(t),
            u = n(t);
          (a.listStyle = "none"),
            (a.padding = 0),
            (a.margin = 0),
            (a.font = e.font),
            (a.position = "absolute"),
            (a.left = s * e.left + "px"),
            (a.top = u * e.top + "px");
          for (var c = 0, h = o.length; h > c; c++) l(r, c, e);
          return t.appendChild(r), r;
        }
        function l(t, e, i) {
          var n = document.createElement("li"),
            r = document.createElement("label"),
            a = document.createElement("input"),
            o = r.style,
            s = n.style,
            l = a.style;
          return (
            (r.innerHTML = i.label[e]),
            (o.textAlign = "right"),
            (o.display = "inline-block"),
            (o.width = i.labelWidth + "px"),
            (o.color = i.color),
            "number" == i.type && (a.type = "number"),
            (l.width = i.inputWidth + "px"),
            (s.marginBottom = i.gap + "px"),
            _(a, "mousemove", function(t) {
              T(t);
            }),
            n.appendChild(r),
            n.appendChild(a),
            t.appendChild(n),
            n
          );
        }
        function c(t, e) {
          var r = document.createElement("div"),
            a = r.style,
            o = i(t),
            s = n(t);
          return (
            (a.position = "absolute"),
            (a.left = o * e.left + "px"),
            (a.top = s * e.top + "px"),
            (a.width = o * e.width + "px"),
            (a.height = s * e.height + "px"),
            t.appendChild(r),
            r
          );
        }
        function h(t, e) {
          function i(i) {
            (i = P(e, i)),
              t._onmousemove(i.NyanX, i.NyanY),
              t.onmousemove && t.onmousemove(t);
          }
          function n(t) {
            (o = !0), i(t);
          }
          function r(t) {
            o && i(t), T(t), k(t);
          }
          function a() {
            o && (o = !1);
          }
          var o = !1;
          "ontouchend" in window
            ? (_(e, "touchstart", n), _(e, "touchmove", r), _(e, "touchend", a))
            : (_(e, "mousedown", n),
              _(e, "mousemove", r),
              _(e, "mouseup", a),
              _(e, "mouseout", a));
        }
        function d(t, e, i) {
          return (t = Math.round(t)), e > t ? e : t > i ? i : t;
        }
        function f(t, e, i) {
          return e > t ? e : t > i ? i : t;
        }
        function p(t) {
          return t.length && "%" === t.charAt(t.length - 1)
            ? d((parseFloat(t) / 100) * 255, 0, 255)
            : d(parseInt(t, 10), 0, 255);
        }
        function m(t) {
          return t.length && "%" === t.charAt(t.length - 1)
            ? f(parseFloat(t) / 100, 0, 1)
            : f(parseFloat(t), 0, 1);
        }
        function g(t, e, i) {
          return (
            0 > i ? (i += 1) : i > 1 && (i -= 1),
            1 > 6 * i
              ? t + (e - t) * i * 6
              : 1 > 2 * i
              ? e
              : 2 > 3 * i
              ? t + (e - t) * (2 / 3 - i) * 6
              : t
          );
        }
        function b(t) {
          var e = (((parseFloat(t[0]) % 360) + 360) % 360) / 360,
            i = m(t[1]),
            n = m(t[2]),
            r = 0.5 >= n ? n * (i + 1) : n + i - n * i,
            a = 2 * n - r;
          return [
            f(255 * g(a, r, e + 1 / 3), 0, 255),
            f(255 * g(a, r, e), 0, 255),
            f(255 * g(a, r, e - 1 / 3), 0, 255)
          ];
        }
        function N(t) {
          if (t) {
            var e,
              i,
              n = t[0] / 255,
              r = t[1] / 255,
              a = t[2] / 255,
              o = Math.min(n, r, a),
              s = Math.max(n, r, a),
              l = s - o,
              u = (s + o) / 2;
            if (0 === l) (e = 0), (i = 0);
            else {
              i = 0.5 > u ? l / (s + o) : l / (2 - s - o);
              var c = ((s - n) / 6 + l / 2) / l,
                h = ((s - r) / 6 + l / 2) / l,
                d = ((s - a) / 6 + l / 2) / l;
              n === s
                ? (e = d - h)
                : r === s
                ? (e = 1 / 3 + c - d)
                : a === s && (e = 2 / 3 + h - c),
                0 > e && (e += 1),
                e > 1 && (e -= 1);
            }
            return [360 * e, i, u];
          }
        }
        function y(t) {
          if (t) {
            t += "";
            var e = t.replace(/ /g, "").toLowerCase();
            if ("#" !== e.charAt(0)) {
              var i = e.indexOf("("),
                n = e.indexOf(")");
              if (-1 !== i && n + 1 === e.length) {
                var r = e.substr(0, i),
                  a = e.substr(i + 1, n - (i + 1)).split(",");
                switch (r) {
                  case "rgb":
                    if (3 !== a.length) return;
                    return [p(a[0]), p(a[1]), p(a[2])];
                  case "hsl":
                    if (3 !== a.length) return;
                    return b(a);
                  default:
                    return;
                }
              }
            } else {
              if (4 === e.length) {
                var o = parseInt(e.substr(1), 16);
                if (!(o >= 0 && 4095 >= o)) return;
                return [
                  ((3840 & o) >> 4) | ((3840 & o) >> 8),
                  (240 & o) | ((240 & o) >> 4),
                  (15 & o) | ((15 & o) << 4)
                ];
              }
              if (7 === e.length) {
                if (
                  ((o = parseInt(e.substr(1), 16)), !(o >= 0 && 16777215 >= o))
                )
                  return;
                return [(16711680 & o) >> 16, (65280 & o) >> 8, 255 & o];
              }
            }
          }
        }
        function w(t) {
          var e = [(+t[0]).toFixed(0), (+t[1]).toFixed(0), (+t[2]).toFixed(0)];
          return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2])
            .toString(16)
            .slice(1);
        }
        function x(t) {
          var e = [
            t[0].toFixed(0),
            (100 * t[1]).toFixed(0) + "%",
            (100 * t[2]).toFixed(0) + "%"
          ];
          return "hsl(" + e.join(",") + ")";
        }
        function S(t, e) {
          if (t) {
            var i = "Array" == A(t) ? t : y(t);
            switch (e) {
              case "rgb":
                return e + "(" + i.join(",") + ")";
              case "hex":
                return "#" + w(i);
              case "hsl":
                return x(N(i));
            }
          }
        }
        if ("undefined" != typeof getComputedStyle) {
          var _ = (function() {
              return window.addEventListener
                ? function(t, e, i) {
                    t.addEventListener(e, i);
                  }
                : function(t, e, i) {
                    t.attachEvent("on" + e, i);
                  };
            })(),
            T = (function() {
              return window.addEventListener
                ? function(t) {
                    t.stopPropagation();
                  }
                : function(t) {
                    t.cancelBubble = !0;
                  };
            })(),
            k = (function() {
              return window.addEventListener
                ? function(t) {
                    t.preventDefault();
                  }
                : function(t) {
                    t.returnValue = !1;
                  };
            })(),
            C = Object.prototype.toString,
            A = function(t) {
              return null === t
                ? "Null"
                : void 0 === t
                ? "Undefined"
                : C.call(t).slice(8, -1);
            },
            D = function(t, e) {
              if (!t) return -1;
              if (t.indexOf) return t.indexOf(e);
              for (var i = t.length; i--; ) if (t[i] === e) return i;
            },
            P = function(t, e) {
              if (((e = e || window.event), null != e.NyanX)) return e;
              var i = e.type,
                n = i && D(i, "touch") >= 0;
              if (n) {
                var a =
                  "touchend" != i ? e.targetTouches[0] : e.changedTouches[0];
                if (a) {
                  var o = r(t);
                  (e.NyanX = a.clientX - o.left), (e.NyanY = a.clientY - o.top);
                }
              } else {
                var s = r(t);
                (e.NyanX = e.clientX - s.left),
                  (e.NyanY = e.clientY - s.top),
                  (e.NyanDelta = e.wheelDelta
                    ? e.wheelDelta / 120
                    : -(e.detail || 0) / 3);
              }
              return e;
            },
            O = {
              width: 320,
              height: 200,
              zIndex: 10002,
              backgroundColor: "#444",
              wrapShadow: "3px 3px 4px rgba(0, 0, 0, 0.4)",
              color: "#66ccff",
              picker: {
                left: 0.05,
                top: 0.15,
                width: 0.4,
                height: 0.65,
                size: 10,
                color: "#000",
                lineWidth: 1
              },
              slider: { left: 0.5, top: 0.15, width: 0.05, height: 0.65 },
              rgbBox: {
                label: ["R:", "G:", "B:"],
                font: "12px Microsoft YaHei",
                color: "#FFFEFA",
                gap: 8,
                type: "number",
                labelWidth: 15,
                inputWidth: 36,
                left: 0.6,
                top: 0.15
              },
              hslBox: {
                label: ["H:", "S:", "L:"],
                font: "12px Microsoft YaHei",
                color: "#FFFEFA",
                gap: 8,
                type: "number",
                labelWidth: 15,
                inputWidth: 36,
                left: 0.78,
                top: 0.15
              },
              hexBox: {
                label: ["#"],
                font: "12px Microsoft YaHei",
                color: "#FFFEFA",
                labelWidth: 15,
                inputWidth: 60,
                left: 0.03,
                top: 0.85
              },
              colorBox: { left: 0.63, top: 0.6, width: 0.32, height: 0.2 },
              okBtn: {
                text: "\u786e\u5b9a",
                backgroundColor: "#6C6C6C",
                color: "#FFFEFA",
                font: "12px Microsoft YaHei",
                left: 0.65,
                top: 0.87,
                width: 0.12,
                height: 0.1
              },
              cancelBtn: {
                text: "\u53d6\u6d88",
                backgroundColor: "#6C6C6C",
                color: "#FFFEFA",
                font: "12px Microsoft YaHei",
                left: 0.83,
                top: 0.87,
                width: 0.12,
                height: 0.1
              }
            },
            M = function(t, i) {
              e(this, i),
                (this.background = o(t, i)),
                (this.layer = o(t, i)),
                (this.H = 0),
                (this.S = 0),
                h(this, this.layer),
                this.paintBG();
            };
          M.prototype = {
            constructor: M,
            paintBG: function() {
              for (
                var t = this.background,
                  e = t.getContext("2d"),
                  i = t.width,
                  n = t.height,
                  r = e.createLinearGradient(0, 0, i, 0),
                  a = 0;
                1 > a;
                a += 1 / 6
              )
                r.addColorStop(a, "hsl(" + 360 * a + " , 100%, 50%)");
              (e.fillStyle = r),
                e.fillRect(0, 0, i, n),
                (r = e.createLinearGradient(0, 0, 0, n)),
                r.addColorStop(0, "hsla(0, 0%, 50%, 0)"),
                r.addColorStop(1, "hsla(0, 0%, 50%, 1)"),
                (e.fillStyle = r),
                e.fillRect(0, 0, i, n);
            },
            _onmousemove: function(t, e) {
              var r = this.layer,
                a = i(r),
                o = n(r);
              (this.H = (t / a) * 360), (this.S = (o - e) / o);
            },
            updatePoint: function() {
              var t = this.layer,
                e = t.getContext("2d"),
                r = this.size,
                a = i(t),
                o = n(t),
                s = (this.H * a) / 360,
                l = o - this.S * o;
              e.clearRect(0, 0, t.width, t.height),
                e.beginPath(),
                e.moveTo(s - r, l),
                e.lineTo(s + r, l),
                e.moveTo(s, l - r),
                e.lineTo(s, l + r),
                (e.strokeStyle = "black"),
                (e.lineWidth = 2),
                e.stroke();
            },
            update: function(t) {
              (this.H = t[0]), (this.S = t[1]), this.updatePoint();
            }
          };
          var R = function(t, i) {
            e(this, i),
              (this.background = o(t, i)),
              (this.layer = o(t, i)),
              (this.L = 0.5),
              h(this, this.layer);
          };
          R.prototype = {
            constructor: R,
            paintBG: function(t) {
              var e = this.background,
                i = e.getContext("2d"),
                n = e.width,
                r = e.height,
                o = i.createLinearGradient(0, 0, 0, r);
              a(e),
                o.addColorStop(0, "#fff"),
                o.addColorStop(
                  0.5,
                  "hsl(" +
                    (+t[0]).toFixed(0) +
                    ", " +
                    (100 * t[1]).toFixed(0) +
                    "%, 50%)"
                ),
                o.addColorStop(1, "#000"),
                (i.fillStyle = o),
                i.fillRect(0, 0, n, r);
            },
            _onmousemove: function(t, e) {
              var i = this.layer,
                r = n(i);
              this.L = (r - e) / r;
            },
            updatePoint: function(t) {
              for (
                var e = this.layer,
                  i = e.getContext("2d"),
                  r = n(e),
                  a = r - this.L * r,
                  o = b(t),
                  s = o.length;
                s--;

              )
                o[s] = (255 - o[s]).toFixed(0);
              i.clearRect(0, 0, e.width, e.height),
                i.beginPath(),
                i.moveTo(0, a + 0.5),
                i.lineTo(e.width, a + 0.5),
                (i.strokeStyle = S(o, "hex")),
                (i.lineWidth = 3),
                i.stroke();
            },
            update: function(t) {
              (this.L = t[2]), this.paintBG(t), this.updatePoint(t);
            }
          };
          var I = function(t, e) {
            var i = this;
            (this.box = s(t, e)),
              _(this.box, "input", function(t) {
                (t.target.value = d(t.target.value, 0, 255)),
                  i.oninput && i.oninput(t);
              });
          };
          I.prototype = {
            constructor: I,
            getRGB: function() {
              var t = this.box.childNodes;
              return (
                "rgb(" +
                t[0].childNodes[1].value +
                ", " +
                t[1].childNodes[1].value +
                ", " +
                t[2].childNodes[1].value +
                ")"
              );
            },
            getRGBArr: function() {
              var t = this.box.childNodes;
              return [
                t[0].childNodes[1].value,
                t[1].childNodes[1].value,
                t[2].childNodes[1].value
              ];
            },
            update: function(t) {
              for (
                var e = this.box.childNodes, i = b(t), n = 0, r = i.length;
                r > n;
                n++
              )
                e[n].childNodes[1].value = (+i[n]).toFixed(0);
            }
          };
          var E = function(t, e) {
            var i = this;
            this.box = s(t, e);
            var n = this.box.childNodes;
            _(n[0].childNodes[1], "input", function(t) {
              (t.target.value = d(t.target.value, 0, 360)),
                i.oninput && i.oninput(t);
            }),
              _(n[1].childNodes[1], "input", function(t) {
                (t.target.value = d(t.target.value, 0, 100)),
                  i.oninput && i.oninput(t);
              }),
              _(n[2].childNodes[1], "input", function(t) {
                (t.target.value = d(t.target.value, 0, 100)),
                  i.oninput && i.oninput(t);
              });
          };
          E.prototype = {
            constructor: E,
            getHSL: function() {
              var t = this.box.childNodes;
              return (
                "hsl(" +
                t[0].childNodes[1].value +
                ", " +
                t[1].childNodes[1].value +
                "%, " +
                t[2].childNodes[1].value +
                "% )"
              );
            },
            getHSLArr: function() {
              var t = this.box.childNodes;
              return [
                t[0].childNodes[1].value,
                t[1].childNodes[1].value / 100,
                t[2].childNodes[1].value / 100
              ];
            },
            update: function(t) {
              for (var e = this.box.childNodes, i = 0, n = t.length; n > i; i++)
                e[i].childNodes[1].value = (i > 0 ? 100 * t[i] : +t[i]).toFixed(
                  0
                );
            }
          };
          var F = function(t, e) {
            var i = this;
            this.box = s(t, e);
            var n = this.box.childNodes;
            _(n[0].childNodes[1], "input", function(t) {
              t.target.value = t.target.value
                .replace(/[^0-9A-Fa-f]/g, "")
                .slice(0, 6);
              var e = t.target.value.length;
              6 == e && i.oninput && i.oninput(t);
            });
          };
          F.prototype = {
            constructor: F,
            getHEX: function() {
              return "#" + this.box.childNodes[0].childNodes[1].value;
            },
            update: function(t) {
              var e = this.box.childNodes;
              e[0].childNodes[1].value = w(b(t));
            }
          };
          var L = function(t, e) {
              this.btn = c(t, e);
              var i = this.btn.style;
              (this.btn.innerHTML = e.text),
                (i.font = e.font),
                (i.lineHeight = n(t) * e.height + "px"),
                (i.textAlign = "center"),
                (i.backgroundColor = e.backgroundColor),
                (i.color = e.color),
                (i.cursor = "pointer");
            },
            H = function(t, e) {
              (this.box = c(t, e)), (this.box.style.backgroundColor = "#000");
            };
          H.prototype = {
            constructor: H,
            update: function(t) {
              for (var e = b(t), i = e.length; i--; ) e[i] = (+e[i]).toFixed(0);
              this.box.style.backgroundColor =
                "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
            }
          };
          var K = function(t) {
            (t = t || {}),
              (this.param = e(t, O)),
              (this.inited = !1),
              u.xh5_EvtDispatcher.call(this);
          };
          return (
            (K.prototype = {
              constructor: K,
              init: function() {
                if (!this.inited) {
                  var t = this.param,
                    e = N(y(t.color));
                  this._initDoms(t),
                    this._initEvent(),
                    this.update(e),
                    document.body.appendChild(this.wrap),
                    (this.inited = !0);
                }
              },
              _initDoms: function(t) {
                var e = document.createElement("div"),
                  i = e.style;
                (i.position = "absolute"),
                  (i.width = t.width + "px"),
                  (i.height = t.height + "px"),
                  (i.zIndex = t.zIndex),
                  (i.backgroundColor = t.backgroundColor),
                  (i.boxShadow = t.wrapShadow),
                  (i.transition = "opacity 0.2s ease-in-out 0s"),
                  (i.opacity = 0),
                  (i.visibility = "hidden"),
                  (i.userSelect = "none"),
                  (i.webkitUserSelect = "none"),
                  (i.msUserSelect = "none"),
                  (i.mosUserSelect = "none"),
                  (this.wrap = e),
                  (this.picker = new M(e, t.picker)),
                  (this.slider = new R(e, t.slider)),
                  (this.rgbBox = new I(e, t.rgbBox)),
                  (this.hslBox = new E(e, t.hslBox)),
                  (this.hexBox = new F(e, t.hexBox)),
                  (this.colorBox = new H(e, t.colorBox)),
                  (this.okBtn = new L(e, t.okBtn)),
                  (this.cancelBtn = new L(e, t.cancelBtn));
              },
              _initEvent: function() {
                function t(t) {
                  (y = !0),
                    (n = +b.left.replace(/[^0-9.]/g, "")),
                    (r = +b.top.replace(/[^0-9.]/g, "")),
                    t.targetTouches
                      ? ((a = t.targetTouches[0].clientX),
                        (o = t.targetTouches[0].clientY))
                      : ((a = t.clientX), (o = t.clientY));
                }
                function e(t) {
                  y &&
                    (t.targetTouches
                      ? ((s = t.targetTouches[0].clientX - a),
                        (l = t.targetTouches[0].clientY - o))
                      : ((s = t.clientX - a), (l = t.clientY - o)),
                    (b.left = +n + +s + "px"),
                    (b.top = +r + +l + "px"),
                    T(t)),
                    k(t);
                }
                function i() {
                  y = !1;
                }
                var n,
                  r,
                  a,
                  o,
                  s,
                  l,
                  u = this,
                  c = this.wrap,
                  h = this.picker,
                  d = this.slider,
                  f = this.rgbBox,
                  p = this.hslBox,
                  m = this.hexBox,
                  g = this.okBtn,
                  v = this.cancelBtn,
                  b = c.style,
                  y = !1;
                "ontouchend" in window
                  ? (_(c, "touchstart", t),
                    _(c, "touchmove", e),
                    _(c, "touchend", i))
                  : (_(c, "mousedown", t),
                    _(c, "mousemove", e),
                    _(c, "mouseup", i),
                    _(c, "mouseout", i)),
                  (h.onmousemove = function() {
                    u.update([h.H, h.S, d.L]);
                  }),
                  (d.onmousemove = function() {
                    u.update([h.H, h.S, d.L]);
                  }),
                  (p.oninput = function() {
                    u.update(p.getHSLArr());
                  }),
                  (f.oninput = function() {
                    u.update(N(f.getRGBArr()));
                  }),
                  (m.oninput = function() {
                    u.update(m.getHEX());
                  }),
                  _(g.btn, "click", function() {
                    u.hide(),
                      u.re("ok", [
                        {
                          rgb: f.getRGB(),
                          hsl: p.getHSL(),
                          hex: S(p.getHSL(), "hex")
                        },
                        u.target
                      ]),
                      u.onok &&
                        u.onok(
                          {
                            rgb: f.getRGB(),
                            hsl: p.getHSL(),
                            hex: S(p.getHSL(), "hex")
                          },
                          u.target
                        );
                  }),
                  _(v.btn, "click", function() {
                    u.hide();
                  });
              },
              show: function(t, e, i, n) {
                !this.inited && this.init();
                var r = this.wrap,
                  a = r.style;
                (a.left = (t ? t : 0) + "px"),
                  (a.top = (e ? e : 0) + "px"),
                  (a.visibility = "visible"),
                  (a.opacity = 1),
                  n && this.update(n),
                  (this.target = i);
              },
              hide: function() {
                if (this.inited) {
                  var t = this.wrap,
                    e = t.style;
                  (e.visibility = "hidden"), (e.opacity = 0);
                }
              },
              update: function(t) {
                var e = "Array" == A(t) ? t : N(y(t));
                this.picker.update(e),
                  this.slider.update(e),
                  this.rgbBox.update(e),
                  this.hslBox.update(e),
                  this.hexBox.update(e),
                  this.colorBox.update(e);
              }
            }),
            t(K, u.xh5_EvtDispatcher),
            new K()
          );
        }
      })()),
      (this.HQ_DOMAIN = l());
  };
});

xh5_define("cfgs.settinger", [], function() {
  "use strict";
  function e(e) {
    (this.uid = e),
      (this.custom = {
        show_underlay_vol: !0,
        show_ext_marks: !0,
        show_floater: !0,
        mousewheel_zoom: !0,
        keyboard: !0,
        history_t: "window",
        allow_move: !0,
        mouse_and_touch: !0,
        tchart_tap: !0,
        show_k_rangepercent: !0,
        k_0pct: "no",
        touch_prevent: !0,
        mini_threshold: { width: 0 / 0, height: 0 / 0 },
        show_logo: !1,
        k_overlay: !1,
        stick: !0,
        smooth: !1,
        indicatorpanel_url:
          "https://current.sina.com.cn/sinatkchart/indicatorpanel.html?20160704",
        allow_indicator_edit: !0,
        storage_lv: 2,
        indicator_reorder: !0,
        indicator_cvs_title: !1,
        indicator_reheight: !1,
        centerZoom: !0
      }),
      (this.PARAM = {
        K_CL_NUM: 260,
        updateRate: 5,
        T_RATE: 120,
        minCandleNum: 25,
        maxCandleNum: 0 / 0,
        defaultCandleNum: 480,
        zoomUnit: 90,
        zoomLimit: 10,
        zoomArea: 0.15,
        I_Z_INDEX: 50,
        G_Z_INDEX: 30,
        _hd: 1,
        setHd: function(e) {
          "number" == typeof e && (this._hd = e);
        },
        getHd: function() {
          return this._hd;
        },
        isFlash: !1,
        LOGO_ID: "KKE_sina_finance_logo"
      }),
      (this.DIMENSION = {
        extend_draw: !1,
        extend_padding: 7,
        LOGO_W: 80,
        LOGO_H: 20,
        posY: 0,
        posX: 55,
        RIGHT_W: 55,
        K_RIGHT_W: 9,
        _w: void 0,
        _h: void 0,
        w_t: void 0,
        w_k: void 0,
        h_t: void 0,
        h_k: void 0,
        P_HV: 0.28,
        H_MA4K: 13,
        H_TIME_PART: 13,
        K_F_T: 47,
        T_F_T: 13,
        H_T_T: 14,
        W_T_L: 43,
        H_T_G: 60,
        H_BLK: 50,
        H_T_B: 7,
        I_V_O: 0,
        getOneWholeTH: function() {
          return this.H_T_T + this.H_T_G;
        },
        H_RS: 30,
        setStageW: function(e) {
          (this._w = e),
            (this.w_k = e - this.posX - this.K_RIGHT_W),
            (this.w_t = e - this.posX - this.RIGHT_W);
        },
        setStageH: function(e, t) {
          (this._h = e),
            (this.h_k = this.h_t = e - t - this.H_TIME_PART - this.H_MA4K);
        },
        getStageW: function() {
          return this._w;
        },
        getStageH: function() {
          return this._h;
        }
      }),
      (this.STYLE = {
        FONT_SIZE: 12,
        FONT_FAMILY: "helvetica,arial,sans-serif"
      }),
      (this.COLOR = {
        BG: "#fff",
        T_P: "#007cc8",
        T_AVG: "#000000",
        T_PREV: "#9b9b9b",
        K_RISE: "#f11200",
        K_FALL: "#00a800",
        K_N: "#000000",
        K_CL: "#007cc8",
        K_MS_RISE: "#f11200",
        K_MS_FALL: "#00a800",
        K_MS_N: "#000000",
        T_RISE: "#f11200",
        T_FALL: "#00a800",
        T_N: "#000000",
        F_RISE: "#f11200",
        F_FALL: "#00a800",
        F_N: "#000000",
        F_BG: "rgba(255,255,255,.9)",
        F_BR: "#000",
        F_T: "#000",
        K_EXT: "#080208",
        T_T: "#777",
        K_P: "#555",
        V_SD: "#dddddd",
        M_ARR: ["#fff", "#BCD4F9"],
        M_ARR_A: [0.5, 0],
        TIME_S: "#000000",
        TIME_L: "#eeeeee",
        GRID: "#eee",
        IVH_LINE: "#494949",
        P_TC: "#fff",
        P_BG: "#494949",
        T_TC: "#fff",
        T_BG: "#494949",
        REMARK_T: "#fff",
        REMARK_BG: "#494949",
        K_PCT: "#ccc",
        BTN_ARR: ["#2b9dfc", "#fff"],
        TIP_ARR: ["#000", "#fff", null, !1, null],
        LOGO: "#ccc"
      }),
      (this.datas = {
        s: "sh000001",
        mode: "",
        tDataLen: 241,
        t: "",
        isT: !1,
        scaleType: "price",
        candle: "solid"
      });
  }
  var t = {
    URLHASH: {
      TS: 1,
      T1: 1,
      T5: 5,
      FAKE_T5: 2,
      NTS: "ts",
      NT5: "t5",
      KD: 24,
      KW: 168,
      KM: 720,
      KCL: 365,
      KY: 8760,
      KDF: 23,
      KDB: 25,
      KWF: 167,
      KWB: 169,
      KMF: 719,
      KMB: 721,
      KCLF: 364,
      KCLB: 366,
      KYF: 8759,
      KYB: 8761,
      NKD: "kd",
      NKW: "kw",
      NKM: "km",
      NKCL: "kcl",
      NKY: "ky",
      NKYF: "kyf",
      NKYB: "kyb",
      NKDF: "kdf",
      NKDB: "kdb",
      NKWF: "kwf",
      NKWB: "kwb",
      NKMF: "kmf",
      NKMB: "kmb",
      NKCLF: "kclf",
      NKCLB: "kclb",
      K1: 1,
      K5: 5,
      K15: 15,
      K30: 30,
      K60: 60,
      K240: 240,
      NK1: "k1",
      NK5: "k5",
      NK15: "k15",
      NK30: "k30",
      NK60: "k60",
      NK240: "k240",
      KMS: 1e3,
      NKMS: "kms",
      KYTD: 983,
      NYTD: "kytd",
      vn: function(e) {
        for (var t in this)
          if (
            this.hasOwnProperty(t) &&
            "number" == typeof this[t] &&
            e == this[t]
          )
            return this[t];
        return void 0;
      },
      vi: function(e) {
        switch (e) {
          case this.NTS:
            return this.TS;
          case this.NT5:
            return this.FAKE_T5;
          default:
            return this[e.toUpperCase()];
        }
      },
      gt: function(e) {
        var t;
        switch (e) {
          case this.KMS:
            t = { type: "msk" };
            break;
          case this.K1:
          case this.K5:
          case this.K15:
          case this.K30:
          case this.K60:
          case this.K240:
            t = { type: "mink" };
            break;
          case this.KDF:
          case this.KWF:
          case this.KMF:
          case this.KYF:
          case this.KCLF:
            t = { type: "rek", dir: "q" };
            break;
          case this.KDB:
          case this.KWB:
          case this.KMB:
          case this.KYB:
          case this.KCLB:
            t = { type: "rek", dir: "h" };
            break;
          default:
            t = { type: "k" };
        }
        switch (e) {
          case this.KD:
          case this.KDF:
          case this.KDB:
            t.baseid = this.KD;
            break;
          case this.KW:
          case this.KWF:
          case this.KWB:
            t.baseid = this.KW;
            break;
          case this.KM:
          case this.KMF:
          case this.KMB:
            t.baseid = this.KM;
            break;
          case this.KY:
          case this.KYF:
          case this.KYB:
            t.baseid = this.KY;
            break;
          case this.KCL:
          case this.KCLF:
          case this.KCLB:
            t.baseid = this.KCL;
            break;
          default:
            t.baseid = e;
        }
        return t;
      }
    },
    e: {
      K_DATA_LOADED: "kDataLoaded",
      T_DATA_LOADED: "tDataLoaded",
      I_EVT: "iEvent"
    },
    nohtml5info:
      "\u68c0\u6d4b\u5230\u60a8\u7684\u6d4f\u89c8\u5668\u8fc7\u65e7\u4e14\u4e0d\u652f\u6301HTML 5\uff0c\u5f53\u524d\u4ee5\u517c\u5bb9\u6a21\u5f0f\u8fd0\u884c\u3002<br/>\u4e3a\u83b7\u5f97\u66f4\u597d\u7684\u4f53\u9a8c\u53ca\u5b8c\u5584\u7684\u529f\u80fd\uff0c\u5efa\u8bae\u4f7f\u7528<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/40975.html' target='_blank'>\u8c37\u6b4cChrome</a>\u6d4f\u89c8\u5668\uff0c\u6216\u5347\u7ea7\u5230\u60a8\u6d4f\u89c8\u5668\u7684<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/58979.html' target='_blank'>\u6700\u65b0\u7248\u672c</a>\u3002",
    historyt08:
      "\u5f53\u524d\u63d0\u4f9bA\u80a12008\u5e74\u4ee5\u6765\u7684\u5386\u53f2\u5206\u65f6\u8d70\u52bf\u67e5\u8be2",
    nohistoryt:
      "\u65e0\u6b64\u8bc1\u5238\u6b64\u65f6\u6bb5\u5386\u53f2\u5206\u65f6\u6570\u636e",
    norecord: "\u8bc1\u5238\u4ee3\u7801\u65e0\u8bb0\u5f55",
    notlisted: "\u672a\u4e0a\u5e02",
    delisted: "\u9000\u5e02",
    nodata: "\u672a\u52a0\u8f7d\u5230\u6709\u6548\u6570\u636e",
    noredata: "\u90e8\u5206\u8bc1\u5238\u65e0\u590d\u6743\u6570\u636e"
  };
  return new (function() {
    this.VER = "2.0.31";
    var r = [];
    (this.getSetting = function(t) {
      for (var a, i = r.length; i--; ) if (((a = r[i]), t == a.uid)) return a;
      return (a = new e(t)), r.push(a), a;
    }),
      (this.globalCfg = t);
  })();
});

xh5_define("datas.hq", ["utils.util"], function(e) {
  "use strict";
  var t = e.load,
    r = e.fBind,
    a = e.market,
    i = e.cookieUtil,
    n = e.dateUtil,
    m = e.tUtil,
    u = 0 == location.protocol.indexOf("https:"),
    s = e.HQ_DOMAIN,
    o = new (function() {
      var e,
        r = "sinaH5EtagStatus",
        a = { domain: "", path: "/", expires: 3600 },
        n = "n",
        m = "y",
        o = 0,
        d =
          (u ? "https" : "http") + "://" + s + ".sinajs.cn/list=sys_hqEtagMode",
        l = function() {
          t(d, function() {
            var t = window.hq_str_sys_hqEtagMode;
            0 == o
              ? (o = t)
              : (o == t
                  ? ((e = !1), i.set(r, n, a))
                  : ((e = !0), i.set(r, m, a)),
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
        n || ((n = { symbol: t }), (f[t] = n));
        var m = _.trHandler(a, n);
        m && (n.trstr = a), (i[t] = n);
        var u = { msg: "", dataObj: i };
        return e.isFunc(r) && r(u), u;
      }
      function l(e) {
        return /^nf_(IF|IC|IH|TF|TS)\w+$/.test(e)
          ? "CFF"
          : /^nf_T(\d{4}|0)$/.test(e)
          ? "CFF"
          : "NF";
      }
      function b(t, r, i, n) {
        if (n && --n.count > 0) return null;
        for (
          var m,
            u,
            s,
            o,
            d,
            b,
            p,
            N = t.split(","),
            h = [],
            c = {},
            f = 0,
            v = N.length;
          v > f;
          f++
        ) {
          if (
            ((m = N[f]),
            (s = g[m]),
            s || ((s = { symbol: m }), (g[m] = s)),
            (u = a(m)),
            i)
          )
            o = i;
          else
            switch (((o = window["hq_str_" + m]), u)) {
              case "HK":
                (d = window["hq_str_" + m.replace("rt_", "") + "_i"]),
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
                d = window["hq_str_" + m + "_i"];
            }
          b = o && o.length > 0 ? o.split(",") : void 0;
          var P;
          switch (u) {
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
              P = "CFF" == l(m) ? D : C;
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
          P && (w = P.update(b, s, d, p)),
            w && (s.hqstr = o),
            h.push(s),
            (c[m] = s);
        }
        var H = { msg: "", data: h, dataObj: c };
        return e.isFunc(r) && r(H), H;
      }
      function p(t) {
        var r = 40,
          a = t.split(","),
          i = [];
        for (a = e.uae(a); a.length > r; ) i.push(a.splice(0, r));
        return i.push(a.splice(0, a.length)), i;
      }
      this.VER = "2.8.0";
      var N,
        h = {
          "00": "",
          "01": "\u505c\u724c\u4e00\u5c0f\u65f6",
          "02": "\u505c\u724c\u4e00\u5929",
          "03": "\u8fde\u7eed\u505c\u724c",
          "04": "\u76d8\u4e2d\u505c\u724c",
          "05": "\u505c\u724c\u534a\u5929",
          "06": "\u505c\u724c\u534a\u5c0f\u65f6",
          "07": "\u6682\u505c",
          "08": "\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad",
          "09": "\u4e0d\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad"
        },
        c = new Date().getTime(),
        g = {},
        f = {},
        v = new (function() {
          var e = s + ".sinajs.cn",
            r = "://" + e + "/?_=$rn&list=$symbol",
            a = "://" + e + "/etag.php?_=" + c + "&list=$symbol",
            i = function(e) {
              var t,
                i = u ? "https" : e.ssl ? "https" : "http";
              return (t = e.cancelEtag
                ? i + r.replace("$rn", String(Math.random()))
                : i +
                  (o.isETag() ? a : r.replace("$rn", String(Math.random()))));
            };
          return function(e, r, a) {
            (a = a || {}), t(i(a).replace("$symbol", e), r);
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
              for (var N = a.length; N--; )
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
              ? w >= i.date
                ? P.date.setHours(o, d, l)
                : (P.isErrData = !0)
              : ((P.isDateChange = Boolean(w > i.date)),
                P.isDateChange ? (P.date = w) : (P.isErrData = !0));
          } else r ? (P.date = new Date(g, f, v, o, d, l)) : (P.isErrData = !0);
          return { datePart: P, timePart: h };
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
        y = new (function() {
          var e;
          this.update = function(t, r) {
            if (!t) return !1;
            e || (e = m.gtr([["0:00", "23:59"]]));
            var a = e,
              i = "00:00",
              n = t[11],
              u = t[0],
              s = P({ dateStr: n, timeStr: u, hqObj: r, tArr: a, start: i });
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
        S = new (function() {
          var e, t;
          this.update = function(r, a) {
            if (!r) return !1;
            e ||
              (e = m.gtr([
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
                (t ||
                  (t = m.gtr([
                    ["6:00", "23:59"],
                    ["0:00", "5:59"]
                  ])),
                (i = t),
                (n = "06:00")));
            var o = r[u],
              d = r[0],
              l = P({ dateStr: o, timeStr: d, hqObj: a, tArr: i, start: n });
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
        _ = new (function() {
          var t,
            r,
            a = function(r, a) {
              if (!r) return !1;
              t || (t = e.isRepos(a.symbol) ? m.gtrepo() : m.gta());
              var i = 100;
              /[gz]/.test(a.type)
                ? (i = 10)
                : e.isRepos(a.symbol)
                ? (i = 10)
                : (/^(sh000|sh580)\d+/.test(a.symbol) ||
                    /^(hy|gn|dy)\d+/.test(a.symbol)) &&
                  (i = 1),
                e.isCNK(a.symbol) && (i = 1);
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
                    e.isRepos(a.symbol)
                      ? ((o = 40), (d = 270))
                      : ((o = 40), (d = 240)),
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
              r ||
                (r = m.gtr([
                  ["9:15", "11:30"],
                  ["13:00", "15:01"]
                ]));
              var i = g[a.symbol] || {},
                u = i.date;
              e.isDate(u) || (u = new Date());
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
              return l.datePart.isErrData
                ? !1
                : l.datePart.date.getHours() - u.getHours() > 2
                ? !1
                : ((a.date = l.datePart.date),
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
            (this.update = function(e, t, r) {
              var n = !0;
              return r && i(r, t), e && (n = a(e, t)), n;
            });
        })(),
        D = new (function() {
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
              u = P({ dateStr: i, timeStr: n, hqObj: r, tArr: e, start: e[0] });
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
        x = new (function() {
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
                  s = a.length;
                s > u;
                u++
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
                c = [e.strUtil.zp(p), e.strUtil.zp(h), "00"].join(":"),
                g = new Date(m, r, o);
              if (+g > +n) {
                if (!(0 == n.getMonth() && n.getDate() < 7)) return null;
                m--, (g = new Date(m, r, o));
              }
              var f = [
                g.getFullYear(),
                e.strUtil.zp(g.getMonth() + 1),
                e.strUtil.zp(g.getDate())
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
                  (window.hq_str_sys_time
                    ? new Date(1e3 * window.hq_str_sys_time)
                    : new Date()) - 432e5
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
                var b = P({ dateStr: d[1], timeStr: d[0], hqObj: a, tArr: t });
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
        T = new (function() {
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
        U = new (function() {
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
        k = new (function() {
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
        C = new (function() {
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
                ("00:00" == r[1][0]
                  ? s > r[1][1] && "09:00" > s && (t.index = i.indexOf(r[1][1]))
                  : s > r[0][1] &&
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
        A = new (function() {
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
        O = new (function() {
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
            var d = P({ dateStr: s, timeStr: o, tArr: i, start: n, hqObj: t });
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
        q = new (function() {
          this.update = function(e, t) {
            if (!e) return !1;
            var r = m.gtgds(),
              a = r,
              i = r[0],
              n = 12,
              u = e[n],
              s = e[6],
              o = P({ dateStr: u, timeStr: s, tArr: a, start: i, hqObj: t });
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
        j = new (function() {
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
              d = P({ dateStr: s, timeStr: o, tArr: i, start: n, hqObj: t });
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
        E = new (function() {
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
        F = new (function() {
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
          for (var t = H.length; t--; ) H[t](e), (H[t] = null), H.length--;
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
                  c = { count: g },
                  s = 0;
                g > s;
                s++
              )
                v(i[s].join(","), r(b, null, I, B, null, c), e);
              (I = ""), (V = "");
            }, 100));
        else
          for (i = p(u), g = i.length, c = { count: g }, s = 0; g > s; s++)
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
          e.isFunc(r) && r(a);
        });
    };
  return l;
});
xh5_define("utils.painter", ["utils.util", "cfgs.settinger"], function(t, e) {
  "use strict";
  function i() {
    function e(t) {
      function e(t) {
        s = t.hd || s;
        var e = t.width || i.width || 0,
          a = t.height || i.height || 0,
          o = s;
        switch (((i.style.width = e + "px"), (i.style.height = a + "px"), o)) {
          case 0:
            break;
          case 1:
            (o = r.hdpr), (e *= o), (a *= o);
            break;
          default:
            (e *= o), (a *= o);
        }
        (i.height = i.width = 0),
          (i.height = a),
          (i.width = e),
          o && 1 != o && n.scale(o, o);
      }
      this.VER = "2.0.1";
      var i = a("canvas");
      "undefined" != typeof FlashCanvas && FlashCanvas.initElement(i);
      var n = i.getContext("2d"),
        s = 1;
      t && e(t), (this.canvas = i), (this.g = n), (this.resize = e);
    }
    function i(i) {
      var a,
        r,
        s,
        o,
        l,
        h,
        m,
        c,
        f,
        p = i.parentObj,
        b = i.ctn,
        g = p.sd,
        N = p.setting,
        _ = 0,
        v = N.DIMENSION.H_TIME_PART,
        S = p.nu,
        y = p.fixScale,
        T = 99999,
        w = function() {
          (a = new e()),
            (r = a.canvas),
            (s = a.g),
            (r.style.position = "absolute"),
            (r.style.zIndex = 0),
            n.addHandler(r, "touchstart", function(t) {
              N.custom.touch_prevent && n.preventDefault(t);
            }),
            b.appendChild(r);
        },
        k = function(t) {
          (t = t || {}),
            (o = N.DIMENSION.getStageW()),
            (_ = isNaN(t.mh) ? _ : t.mh),
            (l = N.DIMENSION.posX),
            (h = N.DIMENSION.RIGHT_W),
            (m = N.DIMENSION.K_RIGHT_W),
            (c = isNaN(t.h) ? c : t.h),
            (v = isNaN(t.eh) ? v : t.eh),
            a.resize({ width: o, height: c + v + _, hd: N.PARAM.getHd() }),
            (s.font = N.STYLE.FONT_SIZE + "px " + N.STYLE.FONT_FAMILY);
        },
        D = function(t, e, i, a) {
          (t = ~~(t + 0.5)),
            (t -= 0.5),
            (e = ~~(e + 0.5)),
            (e -= 0.5),
            (i = ~~(i + 0.5)),
            (i -= 0.5),
            s.beginPath(),
            a
              ? (s.moveTo(t, i), s.lineTo(e, i))
              : (s.moveTo(i, t), s.lineTo(i, e)),
            s.stroke();
        },
        P = function(t, e) {
          var i;
          return (
            y
              ? (i = isNaN(e)
                  ? 0 > t
                    ? Math.floor(t)
                    : Math.ceil(t)
                  : t.toFixed(e))
              : ((t = (1e4 * t).toFixed(0)),
                (i = t / 1e4),
                i > T && (i = Math.floor(i))),
            i
          );
        },
        O = new (function() {
          var e,
            i,
            a,
            r,
            n,
            d = 4,
            m = g.futureTime || window["kke_future_" + g.symbol],
            f = function() {
              if (
                !(
                  g.business ||
                  (!isNaN(N.custom.mini_threshold.height) &&
                    c < N.custom.mini_threshold.height)
                )
              ) {
                var e = N.DIMENSION.extend_draw,
                  i = l;
                e
                  ? ((s.textAlign = "left"), (s.textBaseline = "top"))
                  : (s.textAlign = "right"),
                  (s.fillStyle = N.COLOR.T_N),
                  (s.strokeStyle = N.COLOR.GRID),
                  N.DIMENSION.getStageH() < 0 &&
                    "TFLOW" == g.name &&
                    (g.labelPriceCount = 4),
                  !g.isSC && N.DIMENSION.h_t < 150 && (g.labelPriceCount = 2);
                for (
                  var a,
                    r,
                    n,
                    u,
                    d,
                    m = g.labelMaxP,
                    f = S ? t.strUtil.nu(m) : null,
                    p = g.labelMinP,
                    b = g.labelPriceCount,
                    v = N.DIMENSION.posX,
                    y = m - p,
                    w = c / b,
                    k = 0;
                  b >= k;
                  k++
                ) {
                  (d = k * w + _),
                    (s.fillStyle = N.COLOR.T_N),
                    (n = m - (k * y) / b),
                    n > 0
                      ? (s.fillStyle = N.COLOR.T_RISE)
                      : 0 > n && (s.fillStyle = N.COLOR.T_FALL),
                    e
                      ? k == b && (s.textBaseline = "bottom")
                      : (s.textBaseline =
                          0 == k ? "top" : k == b ? "bottom" : "middle");
                  var O;
                  if (g.isCompare) {
                    if (g.dAdd <= 1)
                      (n *= 100),
                        (u = n.toFixed(2)),
                        (u += "%"),
                        s.fillText(u, v, d),
                        s.fillText(
                          u,
                          v + N.DIMENSION.w_t + s.measureText(u).width,
                          d
                        );
                    else {
                      O = g.datas[0][0].prevclose;
                      var x,
                        C = n;
                      (C *= 100),
                        (x = C.toFixed(2)),
                        (x += "%"),
                        e
                          ? s.fillText(
                              x,
                              N.DIMENSION.w_t - s.measureText(x).width,
                              d
                            )
                          : s.fillText(
                              x,
                              v + N.DIMENSION.w_t + s.measureText(x).width,
                              d
                            ),
                        (n = n * O + O),
                        (u = n.toFixed(2)),
                        s.fillText(u, v, d);
                    }
                    D(i, o - h, d, !0);
                  } else {
                    if (g.isSC)
                      if (((s.fillStyle = N.COLOR.K_P), S)) {
                        var M = g.name && "TFLOW" == g.name ? 2 : 0;
                        (n /= f[0]),
                          0 == k || k == b
                            ? ((u = k >= b ? f[1] : P(n, M)),
                              ("NaN" == u || "" == u) && (u = 0))
                            : (u = "");
                      } else
                        (u = 0 == k || k == b ? n.toFixed(1 > p ? 4 : 2) : 0),
                          0 == u && 0 != k && k != b && (u = "");
                    else {
                      if (N.DIMENSION.h_t < 0) return;
                      O = g.datas[0][0].prevclose;
                      var K = "HK" == g.market ? 3 : 4,
                        I = 1 > p ? K : g.nfloat || 2;
                      (I = 0 > p ? 2 : g.nfloat || 2),
                        "HF" == t.market(g.symbol)
                          ? 3 > p
                            ? (I = 4)
                            : 99 > p && (I = 3)
                          : "HK" == g.market || "US" == g.market
                          ? (I = t.strUtil.nfloat(p))
                          : "LSE" === g.market && (I = 3),
                        g.ennfloat && (I = g.nfloat),
                        (u = Math.abs(n) > T ? Math.floor(n) : n.toFixed(I)),
                        (a = (100 * (n - O)) / O),
                        (s.fillStyle =
                          a > 0
                            ? N.COLOR.T_RISE
                            : 0 > a
                            ? N.COLOR.T_FALL
                            : N.COLOR.T_N),
                        (r = isNaN(a) ? "--%" : a.toFixed(2) + "%"),
                        isFinite(a) || (r = "--%"),
                        e
                          ? g.simple
                            ? (0 === k || k === b) &&
                              s.fillText(
                                r,
                                v + N.DIMENSION.w_t - s.measureText(r).width,
                                d
                              )
                            : s.fillText(
                                r,
                                v + N.DIMENSION.w_t - s.measureText(r).width,
                                d
                              )
                          : s.fillText(
                              r,
                              v + N.DIMENSION.w_t + s.measureText(r).width,
                              d
                            );
                    }
                    g.simple
                      ? (0 === k || k === b) && s.fillText(u, v, d)
                      : (s.fillText(u, v, d), D(i, o - h, d, !0));
                  }
                }
              }
            },
            b = function(e) {
              g && t.market(g.symbol), N.DIMENSION.w_t;
              g.simple || D(_, c + _, e, !1);
            },
            v = function(t, i, a, r, n) {
              if (!g.simple && ((e = t), p.dt)) {
                var o = s.measureText(i).width,
                  l = 0;
                if (
                  ((l = 0 == a ? 0 : a == r - 1 ? -o : -o / 2),
                  0 == r && (l = n / 2 - o / 2),
                  g.business)
                ) {
                  s.font = "14px " + N.STYLE.FONT_FAMILY;
                  var u = 10;
                  (0 == a || a == r - 1) &&
                    s.fillText(i, t + l, _ + c + N.STYLE.FONT_SIZE + 2 + u);
                } else s.fillText(i, t + l, _ + c + N.STYLE.FONT_SIZE + 2);
              }
            },
            y = function(t) {
              var e = t.replace("nf_", "").replace(/[\d]+$/, "");
              return "TF" == e || "T" == e ? "CFF" : "NF";
            },
            w = 30,
            O = "ignore",
            x = "ignoreT",
            C = function() {
              var e,
                s = g && t.market(g.symbol);
              switch (s) {
                case "US":
                  d = 7;
                  break;
                case "HK":
                  d = 5;
                  break;
                case "NF":
                case "HF":
                  d = 0;
                  break;
                default:
                  d = 4;
              }
              if (!i) {
                switch (s) {
                  case "HF":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [
                        ["06:00", "23:59"],
                        ["00:00", "05:00"]
                      ]
                    );
                    break;
                  case "NF":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [
                        ["09:00", "23:29"],
                        ["13:00", "02:59"]
                      ]
                    );
                    break;
                  case "global_index":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [
                        ["06:00", "23:59"],
                        ["00:00", "05:00"]
                      ]
                    );
                    break;
                  default:
                    i = t.tUtil.gata(s);
                }
                for (
                  ("CFF" == y(g.symbol) || "hf_CHA50CFD" === g.symbol) &&
                    (w = 15),
                    a = [],
                    e = 0;
                  e < i.length;
                  e += w
                )
                  a.push(i[e]);
                a[a.length - 1] !== i[i.length - 1] &&
                  (a[a.length - 1] = i[i.length - 1]);
              }
              (r = []), (n = []);
              var o = N.DIMENSION.w_t,
                l = 370,
                u = 70,
                h = 35,
                c = o / a.length,
                f = 0,
                b = 0;
              if (p.dt && "HK" == s) {
                var _ = g.hq.time;
                p.dt &&
                  _ > "15:59" &&
                  (_ > "16:09" && (_ = "16:09"), (a[a.length - 1] = _)),
                  (l = 415);
              }
              for (e = 0; e < a.length; e++)
                0 == e || e == a.length - 1
                  ? (r.push(a[e]), n.push(x))
                  : e == d
                  ? (r.push(a[e]), n.push(a[e]))
                  : l > o
                  ? r.push(O)
                  : e > 0 && d > e
                  ? c * (e - f) > u && c * (d - e) > u
                    ? (r.push(a[e]), (f = e))
                    : r.push(O)
                  : (d > f && (f = d),
                    c * (e - f) > u && c * (a.length - 1 - e) > u
                      ? (r.push(a[e]), (f = e))
                      : r.push(O)),
                  0 != e &&
                    e != d &&
                    e != a.length - 1 &&
                    (e > 0 && d > e
                      ? c * (e - b) > h && c * (d - e) > h
                        ? (n.push(a[e]), (b = e))
                        : n.push(x)
                      : (d > b && (b = d),
                        c * (e - b) > h && c * (a.length - 1 - e) > h
                          ? (n.push(a[e]), (b = e))
                          : n.push(x)));
              switch (s) {
                case "NF":
                  m &&
                    ("21:00" != m.time[0][0]
                      ? (d = 15 == w ? (N.DIMENSION._w <= 550 ? 9 : 0) : 4)
                      : l > o && (d = Math.floor(n.length / 2))),
                    (r[r.length - 1] = 30 == w ? "15:00" : "15:15");
                  var v = a[d].split(":");
                  59 == v[1] && (a[d] = Number(v[0]) + 1 + ":00"),
                    (r[d] = a[d]);
                  break;
                case "HF":
                  l > o && (d = Math.floor(n.length / 2)), (r[d] = a[d]);
              }
            },
            M = function() {
              var i = N.DIMENSION.w_t;
              if (
                isNaN(N.custom.mini_threshold.width) ||
                !(i < N.custom.mini_threshold.width)
              ) {
                (s.textBaseline = "bottom"),
                  (s.textAlign = "left"),
                  (s.strokeStyle = N.COLOR.TIME_L),
                  (s.fillStyle = N.COLOR.TIME_S),
                  (e = l);
                var o = g.datas,
                  h = o.length,
                  m = g && t.market(g.symbol),
                  c = a.length,
                  f = 1;
                "NF" == m && "CFF" == y(g.symbol) && (f = 1);
                var _ = i / Math.max(c - f, 5),
                  S = l,
                  T = 550;
                if ((N.DIMENSION.getStageH() < 0 && (p.dt = !0), p.dt)) {
                  var w;
                  if (1 == h || h > 6)
                    for (w = 0; c > w; w++)
                      r[w] !== O && v(S, r[w], w, c),
                        "HF" == m || "NF" == m
                          ? r[w] !== O &&
                            n[w] !== x &&
                            (w == d ? b(S, d) : b(S))
                          : g.business ||
                            (n[w] !== x && (w == d ? b(S, d) : b(S))),
                        (S += _);
                  else if (6 > h)
                    for (_ = i / h, w = 0; h > w; w++)
                      N.DIMENSION._w < T
                        ? v(S, u.ds(o[w][0].date, "/", !1, !0, !1, !1), w, 0, _)
                        : v(
                            S,
                            u.ds(o[w][0].date, "/") +
                              "/" +
                              u.nw(o[w][0].date.getDay()),
                            w,
                            0,
                            _
                          ),
                        0 != w && b(S),
                        (S += _);
                }
              }
            };
          this.drawFrames = function() {
            k(), C(), M(), f();
          };
        })(),
        x = new (function() {
          this.iOffsetX = 0;
          var e,
            i,
            a,
            r,
            n,
            u = this,
            h = 0,
            b = 22,
            v = 99,
            y = function(t, e, i) {
              if (isNaN(i)) {
                if (h + v >= t || t >= o - v) return;
                D(_ + 1, c + _, t, !1);
              }
              if (((h = t), p.dt)) {
                var a,
                  r = c + _ + N.STYLE.FONT_SIZE + 3;
                switch (i) {
                  case 1:
                    s.fillText(e, t, r);
                    break;
                  case 2:
                    (a = s.measureText(e).width), s.fillText(e, t - a, r);
                    break;
                  case 3:
                    break;
                  default:
                    (a = s.measureText(e).width),
                      s.fillText(e, t - (a >> 1), r);
                }
              }
            },
            T = function() {
              var e = N.DIMENSION.w_k;
              if (
                isNaN(N.custom.mini_threshold.width) ||
                !(e < N.custom.mini_threshold.width)
              ) {
                (s.textBaseline = "bottom"),
                  (s.textAlign = "left"),
                  (s.strokeStyle = N.COLOR.TIME_L),
                  (s.fillStyle = N.COLOR.TIME_S),
                  (h = l);
                var i,
                  a = g.datas,
                  r = a.length;
                switch (f) {
                  case d.URLHASH.KMS:
                    i = "sec";
                    break;
                  case d.URLHASH.K1:
                    i = "h";
                    break;
                  case d.URLHASH.K5:
                  case d.URLHASH.K15:
                  case d.URLHASH.K30:
                  case d.URLHASH.K60:
                  case d.URLHASH.K240:
                    i = (60 / f) * 24 > r ? "h" : "d";
                    break;
                  case d.URLHASH.KD:
                  case d.URLHASH.KDF:
                  case d.URLHASH.KDB:
                  case d.URLHASH.KCL:
                  case d.URLHASH.KCLF:
                  case d.URLHASH.KCLB:
                    i = r > 300 ? "y" : 28 > r ? "w" : "m";
                    break;
                  default:
                    i = r > 300 ? "y" : "m";
                }
                for (
                  var n,
                    o,
                    m,
                    c,
                    p,
                    _,
                    S = e / Math.max(r, N.PARAM.minCandleNum),
                    T = u.iOffsetX + l + 0.6 * S,
                    w = e / v,
                    k = e / (S * b),
                    D = Math.ceil(k / w),
                    P = 0,
                    O = 0,
                    x = -1,
                    C = -1,
                    M = -1,
                    K = -1,
                    I = -1,
                    E = 0;
                  r > E;
                  E++
                )
                  if (
                    ((_ = a[E]),
                    (p = _.date),
                    (o = p.getMonth()),
                    (n = p.getFullYear()),
                    0 != E)
                  )
                    if (E >= r - 1)
                      y(
                        T + S / 2,
                        n + "/" + (o + 1) + "/" + p.getDate(),
                        r >= N.PARAM.minCandleNum ? 2 : 3
                      );
                    else {
                      switch (i) {
                        case "sec":
                          var R = p.getSeconds();
                          R != K &&
                            ((R = t.strUtil.zp(R)),
                            (c = t.strUtil.zp(p.getMinutes())),
                            (m = t.strUtil.zp(p.getHours())),
                            y(T, m + ":" + c + ":" + R)),
                            (K = Number(R));
                          break;
                        case "min":
                          (c = p.getMinutes()),
                            c != M &&
                              ((c = t.strUtil.zp(c)),
                              (m = t.strUtil.zp(p.getHours())),
                              y(T, m + ":" + c)),
                            (M = Number(c));
                          break;
                        case "h":
                          (m = p.getHours()),
                            m != C &&
                              ((c = t.strUtil.zp(p.getMinutes())),
                              y(T, m + ":" + c)),
                            (C = m);
                          break;
                        case "d":
                          var L = p.getDate();
                          L != P && y(T, n + "/" + (o + 1) + "/" + L), (P = L);
                          break;
                        case "w":
                          var F = p.getDay();
                          I > F && y(T, o + 1 + "/" + p.getDate()), (I = F);
                          break;
                        default:
                        case "m":
                          o == x || o % D || y(T, n + "/" + (o + 1)), (x = o);
                          break;
                        case "y":
                          n != O && y(T, n), (O = n);
                      }
                      T += S;
                    }
                  else y(l, n + "/" + (o + 1) + "/" + p.getDate(), 1);
              }
            },
            w = 37,
            O = function() {
              (s.fillStyle = N.COLOR.K_PCT),
                (s.textBaseline = "top"),
                (s.textAlign = "right");
              for (
                var t,
                  e,
                  i = g.nfloat || 2,
                  a = g.prevclose,
                  r = g.labelPriceCount,
                  n = 0,
                  l = c / r,
                  u = g.labelMaxP,
                  h = g.labelMinP,
                  p = u - h;
                r >= n;
                n++
              )
                if (!(w > l && 1 & n)) {
                  (e = n * l + _),
                    0 == n && e++,
                    (t = u - (n * p) / r),
                    n == r && (s.textBaseline = "bottom");
                  var b;
                  f === d.URLHASH.KMS || f === d.URLHASH.K1
                    ? ((b = (((t - a) / a) * 100).toFixed(i) + "%"),
                      (s.fillStyle =
                        t > a
                          ? N.COLOR.K_MS_RISE
                          : a > t
                          ? N.COLOR.K_MS_FALL
                          : N.COLOR.K_MS_N))
                    : (b = Math.round(((t - a) / a) * 100) + "%"),
                    s.fillText(b, o - m, e);
                }
            },
            x = function() {
              var e;
              switch (N.custom.k_0pct) {
                case "hq":
                  e = g.hq.prevclose;
                  break;
                case "range":
                  e = g.prevclose;
                  break;
                default:
                  return;
              }
              var i = t.xh5_PosUtil.pp(e, g.labelMinP, g.labelMaxP, c) + _;
              (i = ~~(i + 0.5)), (i -= 0.5);
              var a = l,
                r = 5;
              for (s.beginPath(); o - m > a; )
                s.moveTo(a, i), (a += r), s.lineTo(a, i), (a += r);
              (s.strokeStyle = N.COLOR.T_PREV), s.stroke();
            },
            C = function() {
              if (
                isNaN(N.custom.mini_threshold.height) ||
                !(c < N.custom.mini_threshold.height)
              ) {
                var e = N.DIMENSION.extend_draw;
                (s.fillStyle = N.COLOR.K_P), (s.strokeStyle = N.COLOR.GRID);
                var i = l;
                e
                  ? ((s.textAlign = "left"), (s.textBaseline = "top"))
                  : (s.textAlign = "right");
                for (
                  var a,
                    r,
                    n,
                    u = g.labelPriceCount,
                    h = 0,
                    p = N.DIMENSION.posX,
                    b = c / u,
                    v = g.labelMaxP,
                    y = g.labelMinP,
                    T = v - y,
                    k = g.prevclose,
                    C = S ? t.strUtil.nu(v) : null;
                  u >= h;
                  h++
                )
                  (w > b && 1 & h) ||
                    ((r = h * b + _),
                    0 == h && r++,
                    (a = v - (h * T) / u),
                    g.isCompare && (a *= 100),
                    S ? ((a /= C[0]), (n = h >= u ? C[1] : P(a))) : (n = P(a)),
                    g.isCompare && (n += "%"),
                    e
                      ? h == u && (s.textBaseline = "bottom")
                      : (s.textBaseline =
                          0 == h ? "top" : h == u ? "bottom" : "middle"),
                    f === d.URLHASH.KMS &&
                      k &&
                      (s.fillStyle =
                        a > k
                          ? N.COLOR.K_MS_RISE
                          : k > a
                          ? N.COLOR.K_MS_FALL
                          : N.COLOR.K_MS_N),
                    s.fillText(n, p, r),
                    D(i, o - m, r, !0));
                k &&
                  (g.isCompare ||
                    (N.custom.show_k_rangepercent && O(),
                    "no" != N.custom.k_0pct && x()));
              }
            };
          this.drawFrames = function(t) {
            (t ||
              g.datas[0].date != a ||
              g.datas[g.datas.length - 1].date != r ||
              g.labelMaxP != e ||
              g.labelMinP != i ||
              f != n) &&
              (k(), C(), T()),
              (n = g.viewState.viewId),
              (a = g.datas[0].date),
              (r = g.datas[g.datas.length - 1].date),
              (e = g.labelMaxP),
              (i = g.labelMinP);
          };
        })();
      (this.drawBg = function(t, e) {
        g.datas &&
          ((f = g.viewState.viewId),
          N.datas.isT
            ? O.drawFrames(t)
            : (isNaN(e) || ((x.iOffsetX = e), (t = !0)), x.drawFrames(t)));
      }),
        (this.respos = function(t) {
          k(t),
            (r.style.left = 0),
            (r.style.top = N.DIMENSION.posY + "px"),
            this.drawBg(!0);
        }),
        (this.gc = function() {
          t.domGc(r);
        }),
        w();
    }
    function m(e) {
      var i,
        r = e.parentObj,
        u = e.ctn,
        h = r.iMgr,
        d = l(r.iTo, null, u),
        m = r.iClk,
        c = h.globalDragHandler,
        f = h.zoomView,
        p = h.shortClickHandler,
        b = r.setting,
        g = b.PARAM.isFlash,
        N = !g,
        _ = !1,
        v = 300,
        S = {
          isM: !1,
          isTch: !1,
          isP: !1,
          tCount: void 0,
          tXOff: -1,
          isPv: !1,
          lastIy: null,
          mDx: 0 / 0,
          mDy: 0 / 0,
          isClk: 0,
          isTMin: !1,
          mvOx: 0,
          vP: function(t) {
            var e, i;
            if (t.changedTouches) {
              n.preventDefault(t), n.stopPropagation(t);
              var a = n.getTarget(t),
                r = t.changedTouches[0],
                s = a.getBoundingClientRect(),
                o = s.left,
                l = s.top;
              (e = r.clientX - o), (i = r.clientY - l);
            } else
              (e = t.offsetX),
                isNaN(e) && (e = t.layerX),
                (i = t.offsetY),
                isNaN(i) && (i = t.layerY);
            d(e, i, t);
          },
          vH: function(t) {
            if (!(this.isClk > 0) && b.custom.allow_move) {
              n.preventDefault(t), n.stopPropagation(t);
              var e = t.changedTouches ? t.changedTouches[0].pageX : t.layerX;
              isNaN(e) && (e = t.offsetX);
              var i = t.changedTouches ? t.changedTouches[0].pageY : t.layerY;
              isNaN(i) && (i = t.offsetY), c(this.mDx, e, this.mDy, i);
            }
          },
          mD: function(t) {
            (this.mDx = isNaN(t.layerX) ? t.offsetX : t.layerX),
              (this.mDy = isNaN(t.layerY) ? t.offsetY : t.layerY),
              (this.isM = this.isP = !0),
              (this.isClk = 2),
              w(!0);
          },
          mM: function(t) {
            this.isTch ||
              ((_ = !0), this.isClk--, this.isP ? this.vH(t) : this.vP(t));
          },
          mU: function(t) {
            (this.mDx = 0 / 0),
              (this.mDy = 0 / 0),
              (this.isM = this.isP = !1),
              c(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
              this.isClk > 0 && m && ((this.isClk = 0), m()),
              w(!1);
          },
          mO: function() {
            (this.isClk = 0),
              (this.isM = this.isP = _ = !1),
              d(0 / 0, 0 / 0),
              w(!1);
          },
          tR: function() {
            clearTimeout(this.tCount), (this.isPv = this.isTMin = !1);
          },
          gR: function() {
            this.tR(), (this.tXOff = -1);
          },
          tCheck: function(t) {
            this.mvOx = t.touches[0].pageX;
            var e = this;
            (e.isClk = 2),
              (this.tCount = setTimeout(function() {
                (e.isPv = !0), e.vP(t), (e.isClk = 0);
              }, v));
          },
          tE: function(t) {
            b.custom.touch_prevent && n.preventDefault(t),
              this.isPv || p(),
              this.tR(),
              (this.isTch = _ = !1),
              (this.mDx = 0 / 0),
              (this.mDy = 0 / 0),
              d(0 / 0, 0 / 0),
              c(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
              this.isClk > 0 && m && ((this.isClk = 0), m());
          },
          tM: function(t) {
            if ((this.isClk--, 1 == t.touches.length)) {
              if (
                !this.isPv &&
                !this.isTMin &&
                Math.abs(this.mvOx - t.touches[0].pageX) < 5
              )
                return;
              (this.isTMin = !0),
                clearTimeout(this.tCount),
                this.isPv ? this.vP(t) : this.vH(t);
            } else if (2 == t.touches.length) {
              n.preventDefault(t);
              var e = t.touches[0],
                i = t.touches[1];
              if (this.tXOff >= 0) {
                var a = Math.abs(e.pageX - i.pageX);
                if (a != this.tXOff) {
                  var r = n.getTarget(t),
                    s = o.pageX(r),
                    l = e.pageX - s,
                    u = i.pageX - s;
                  f(a < this.tXOff, [l, u]);
                }
              }
              this.tXOff = Math.abs(e.pageX - i.pageX);
            }
          },
          tS: function(t) {
            switch (
              (this.tR(),
              b.custom.touch_prevent && n.preventDefault(t),
              (this.isTch = _ = !0),
              (this.lastIy = t.touches[0].pageY),
              (this.mDx = t.changedTouches[0].pageX),
              (this.mDy = t.changedTouches[0].pageY),
              t.touches.length)
            ) {
              case 1:
                this.tCheck(t);
                break;
              case 2:
                this.gR();
            }
          },
          handleEvent: function(t) {
            if (b.custom.mouse_and_touch)
              switch (t.type) {
                case "mouseup":
                  this.mU(t);
                  break;
                case "mousedown":
                  this.mD(t);
                  break;
                case "mouseout":
                  this.mO();
                  break;
                case "mousemove":
                  this.mM(t);
                  break;
                case "touchend":
                  this.tE(t);
                  break;
                case "touchmove":
                  this.tM(t);
                  break;
                case "touchstart":
                  this.tS(t);
              }
          }
        },
        y = new (function() {
          (this.onmouseup = function(t) {
            b.custom.mouse_and_touch && S.mU(t);
          }),
            (this.onmousedown = function(t) {
              b.custom.mouse_and_touch && S.mD(t);
            }),
            (this.onmouseout = function() {
              b.custom.mouse_and_touch && S.mO();
            }),
            (this.onmousemove = function(t) {
              b.custom.mouse_and_touch && S.mM(t);
            });
        })(),
        T = function() {
          N
            ? (i = a("canvas"))
            : ((i = a("div")),
              (i.style.backgroundColor = "#eee"),
              (i.style.opacity = 0),
              (i.style.filter = "alpha(opacity=0)")),
            (i.style.position = "absolute"),
            (i.style.zIndex = b.PARAM.I_Z_INDEX);
          var t;
          s.istd
            ? (t = ["touchend", "touchmove", "touchstart"])
            : ((t = ["mousedown", "mouseup", "mousemove", "mouseout"]),
              s.allowt &&
                (t = t.concat(["touchend", "touchmove", "touchstart"])));
          for (var e = t.length; e--; )
            N
              ? n.addHandler(i, t[e], S)
              : n.addHandler(i, t[e], y["on" + t[e]] || function() {});
          u.appendChild(i);
        },
        w = function(t) {
          t
            ? ((i.style.cursor = "grabbing"),
              (i.style.cursor = "-webkit-grabbing"))
            : (i.style.cursor = "default");
        };
      (this.respos = function(t) {
        (i.style.top = b.DIMENSION.posY + t.mh + "px"),
          (i.style.left = b.DIMENSION.posX + "px");
        var e;
        (e = b.datas.isT ? b.DIMENSION.w_t : b.DIMENSION.w_k),
          (i.style.width = e + "px"),
          (i.style.height = t.h + "px");
      }),
        (this.gc = function() {
          t.domGc(i);
        }),
        T();
    }
    function c(e) {
      (this.VER = "2.2.8"),
        (e = h(
          {
            setting: void 0,
            sd: void 0,
            ctn: void 0,
            reO: void 0,
            withHBg: !1,
            nu: !1,
            dt: !0,
            fixScale: !0,
            iTo: function() {},
            iMgr: void 0,
            iClk: void 0
          },
          e || {}
        ));
      var n,
        s,
        o,
        l,
        u,
        d = e.setting,
        c = function() {
          e.ctn
            ? (n = e.ctn)
            : ((n = a("div")), (n.style.position = "relative"));
        },
        f = function() {
          (s = a("canvas")),
            "undefined" != typeof FlashCanvas && FlashCanvas.initElement(s),
            (s.style.position = "absolute"),
            (s.style.zIndex = d.PARAM.G_Z_INDEX),
            (o = s.getContext("2d")),
            n.appendChild(s);
        },
        p = function() {
          u = new m({ parentObj: e, ctn: n });
        },
        b = function() {
          l = new i({ parentObj: e, ctn: n });
        },
        g = function(t) {
          t = t || {};
          var e,
            i,
            a = isNaN(t.mh) ? d.DIMENSION.H_T_T : t.mh,
            o = isNaN(t.eh) ? d.DIMENSION.H_TIME_PART : t.eh,
            h = d.PARAM.getHd();
          switch (
            ((e = d.datas.isT ? d.DIMENSION.w_t : d.DIMENSION.w_k),
            (i = isNaN(t.h) ? d.DIMENSION.h_k : t.h),
            (t.h = i),
            (t.mh = a),
            (t.eh = o),
            (n.style.height = i + a + o + "px"),
            (s.style.top = d.DIMENSION.posY + a + "px"),
            (s.style.left = d.DIMENSION.posX + "px"),
            (s.style.width = e + "px"),
            (s.style.height = i + "px"),
            h)
          ) {
            case 0:
              break;
            case 1:
              (h = r.hdpr), (e *= h), (i *= h);
              break;
            default:
              (e *= h), (i *= h);
          }
          (s.width = e), (s.height = i), u && u.respos(t), l && l.respos(t);
        };
      (this.resize = g),
        (this.getCanvas = function() {
          return s;
        }),
        (this.getG = function() {
          return o;
        }),
        (this.getWrap = function() {
          return n;
        });
      var N;
      (this.scale = function(t) {
        switch (t) {
          case 0:
            return;
          case 1:
            t = r.hdpr;
        }
        t && o.scale(t, t);
      }),
        (this.newGStyle = function(t) {
          for (var e in t) t.hasOwnProperty(e) && (o[e] = t[e]);
        }),
        (this.newStyle = function(t, e, i) {
          (N = o.strokeStyle = t), e && o.beginPath(), i && (o.lineWidth = i);
        }),
        (this.newFillStyle = function(t, e) {
          if (t && !(t.length < 1)) {
            var i = t.length;
            if (1 == i) o.fillStyle = t[0];
            else if (i > 1) {
              for (
                var a = o.createLinearGradient(0, 0, 0, e), r = 0;
                i > r;
                r++
              )
                a.addColorStop((1 / (i - 1)) * r, t[r]);
              o.fillStyle = a;
            }
          }
        }),
        (this.newFillStyle_rgba = function(e, i, a) {
          for (
            var r = t.isArr(a) ? a : [a],
              n = o.createLinearGradient(0, 0, 0, i),
              s = 0,
              l = e.length;
            l > s;
            s++
          )
            n.addColorStop((1 / (l - 1)) * s, t.hex2dec(e[s], r[s] || 0));
          o.fillStyle = n;
        }),
        (this.clear = function(t, e) {
          (s.width = s.width),
            t &&
              (N && o.strokeStyle != N && (o.strokeStyle = N), o.beginPath()),
            this.scale(e);
        }),
        (this.clearLimit = function(t, e) {
          o.clearRect(t, 0, e, s.height), o.beginPath();
        }),
        (this.beginPath = function() {
          o.beginPath();
        }),
        (this.closePath = function() {
          o.closePath();
        }),
        (this.fill = function() {
          o.fill();
        }),
        (this.stroke = function() {
          o.stroke();
        }),
        (this.save = function() {
          o.save();
        }),
        (this.translate = function(t, e) {
          o.translate(t, e);
        }),
        (this.restore = function() {
          o.restore();
        }),
        (this.moveTo = function(t, e) {
          o.moveTo(t, e);
        }),
        (this.lineTo = function(t, e) {
          o.lineTo(t, e);
        }),
        (this.drawDot = function(t, e, i, a) {
          a && o.moveTo(t, e), o.arc(t, e, i, 0, 2 * Math.PI);
        }),
        (this.arc = function(t, e, i, a, r, n) {
          o.arc(t, e, i, a, r, n);
        }),
        (this.drawCandleRect = function(t, e, i, a, r, n) {
          if (e != i && !(2 > a)) {
            var s = i - e;
            (t += 0.5 * a),
              (a = ~~(a + 0.5)),
              (t = ~~(t + 0.5)),
              (e = ~~(e + 0.5)),
              (s = ~~(s + 0.5)),
              (o.lineWidth = 1),
              n
                ? ((t -= 0.5),
                  (e -= 0.5),
                  (o.strokeStyle = r),
                  o.strokeRect(t, e, a, s))
                : (1 > s && (s = 1),
                  (o.fillStyle = r),
                  o.fillRect(t, e, a, s),
                  (t -= 0.5),
                  (e -= 0.5),
                  (o.strokeStyle = r),
                  o.strokeRect(t, e, a, s));
          }
        }),
        (this.drawCandleRect_solid = function(t, e, i, a, r) {
          if (e != i && !(2 > a)) {
            var n = i - e;
            (t += 0.5 * a),
              (a = ~~(a + 0.5)),
              (t = ~~(t + 0.5)),
              (e = ~~(e + 0.5)),
              (n = ~~(n + 0.5)),
              (o.lineWidth = 1),
              (o.fillStyle = r),
              o.fillRect(t, e, a, n),
              (t -= 0.5),
              (e -= 0.5),
              (o.strokeStyle = r),
              o.strokeRect(t, e, a, n);
          }
        }),
        (this.drawCandleLineRect = function(t, e, i, a, r, n, s, l) {
          if (
            ((t += n),
            (t = ~~(t + 0.5)),
            (o.strokeStyle = s),
            (o.lineWidth = 1),
            e != r)
          ) {
            if (((t -= 0.5), o.moveTo(t, e), l && n >= 2)) {
              var u = Math.min(i, a),
                h = Math.max(i, a);
              o.lineTo(t, u), o.moveTo(t, h);
            }
            o.lineTo(t, r);
          }
          if (i == a) {
            var d = 0.5 * n;
            (d = ~~(d + 0.5)),
              0.5 > d && (d = 0.5),
              (i = ~~(i + 0.5)),
              (i -= 0.5),
              o.moveTo(t - d, i),
              o.lineTo(t + d, i);
          }
        }),
        (this.drawOhlc = function(t, e, i, a, r, n, s) {
          (o.strokeStyle = s), (o.lineWidth = 1);
          var l = 0.5 * n;
          (l = ~~(l + 0.5)),
            0.5 > l && (l = 0.5),
            (t += n),
            (t = ~~(t + 0.5)),
            (e = ~~(e + 0.5)),
            (e -= 0.5),
            o.moveTo(t - l, e),
            o.lineTo(t, e),
            (r = ~~(r + 0.5)),
            (r -= 0.5),
            o.moveTo(t, r),
            o.lineTo(t + l, r),
            (t -= 0.5),
            o.moveTo(t, i),
            o.lineTo(t, a);
        }),
        (this.drawVStickC = function(t, e, i, a, r) {
          (t += i),
            (i = ~~(i + 0.5)),
            1 > i && (i = 1),
            (t = ~~(t + 0.5)),
            1 & i && (t -= 0.5),
            (e = ~~(e + 0.5)),
            (a = ~~(a - 0.5)),
            (o.strokeStyle = r),
            (o.lineWidth = i),
            o.moveTo(t, e),
            o.lineTo(t, e + a);
        }),
        (this.drawVStickRect = function(t, e, i, a, r, n) {
          t += 0.5 * i;
          var s = i;
          (t = ~~(t + 0.5)),
            (s = ~~(s + 0.5)),
            (e = ~~(e + 0.5)),
            (a = ~~(a + 0.5)),
            0 == a && (a = 1),
            n
              ? (0.5 > s && (s = 0.5),
                (o.fillStyle = r),
                o.fillRect(t, e, s, a))
              : ((t -= 0.5),
                (e -= 0.5),
                (o.strokeStyle = r),
                o.strokeRect(t, e, s, a));
        }),
        (this.drawBg = function(t) {
          l && l.drawBg(!1, t);
        }),
        (this.remove = function() {
          t.domGc(s), u && u.gc(), l && l.gc();
        }),
        c(),
        f(),
        e.withHBg && (p(), b()),
        g(e.reO);
    }
    (this.xh5_ibPainter = c), (this.xh5_Canvas = e);
  }
  var a = t.$C,
    r = t.xh5_BrowserUtil,
    n = t.xh5_EvtUtil,
    s = t.xh5_deviceUtil,
    o = t.xh5_HtmlPosUtil,
    l = t.fBind,
    u = t.dateUtil,
    h = t.oc,
    d = e.globalCfg;
  return i;
});

xh5_define("plugins.techcharts", ["utils.util", "utils.painter"], function(
  t,
  i
) {
  "use strict";
  function r(t, i, r) {
    (this.cfg = t),
      (this.isSC = !0),
      (this.proxyCfg = it(
        {
          iTo: function() {},
          ctn: null,
          titleCtn: null,
          iMgr: void 0,
          titleW: 0 / 0,
          titleGap: 0 / 0,
          withHBg: !0,
          h: 0 / 0,
          mh: 0 / 0,
          eh: 0 / 0,
          lz: 0 / 0,
          fixIdctW: !1,
          onClkMain: void 0,
          stock: void 0,
          usrObj: void 0,
          initMgr: void 0
        },
        i
      )),
      (this.selfCfg = it(
        {
          nu: !1,
          h: this.proxyCfg.h,
          mh: this.proxyCfg.mh,
          eh: this.proxyCfg.eh,
          titleW: 0 / 0,
          isBlank: !1,
          ctnId: void 0,
          allowrfs: !0
        },
        r
      )),
      (this.isBlank = this.selfCfg.isBlank),
      (this.proxyCfg.titleW = this.selfCfg.titleW),
      (this.symbol = this.proxyCfg.stock.symbol),
      (this.aliasymbol = void 0),
      (this.name = void 0),
      (this.sname = void 0),
      (this.alias = void 0),
      (this.nu = this.selfCfg.nu),
      (this.separate = 0),
      (this.urlData = void 0),
      (this.cb = void 0),
      (this.toReCalc = !1),
      (this.selfDataUrl = void 0),
      (this.selfDataUrlUpdate = void 0),
      (this.df = void 0),
      (this.viewState = this.proxyCfg.stock.viewState),
      (this.datas = null),
      (this.wrap = void 0),
      (this.titleCtn = void 0),
      (this.titleO = void 0),
      (this.indicatorArr = void 0),
      (this.line = void 0),
      (this.h = this.selfCfg.h),
      (this.mh = this.selfCfg.mh),
      (this.eh = this.selfCfg.eh),
      (this.labelMaxP = 0 / 0),
      (this.labelMinP = 0 / 0),
      (this.maxPrice = 0 / 0),
      (this.minPrice = 0 / 0),
      (this.pricePosArr = void 0),
      (this.labelPriceCount = 2),
      (this.isMain = !0),
      (this.oriArr = void 0),
      (this.selfArr = []),
      (this.disMod = 1),
      (this.tkProp = { close: "close" }),
      (this.customArr = void 0),
      this.DEFAULT_ARR,
      (this.updateId = void 0),
      (this.updateCount = 0),
      (this.UPDATE_THRESHOLD = 0),
      (this.__iOffsetX = 0),
      (this.asPChart = !1),
      (this.vaObj = void 0),
      (this.param = void 0),
      (this.lw = 1.3),
      this.ic({ h: this.h });
  }
  function a(t, i) {
    var a = {
      isBlank: !0,
      ctnId: "blankctn_" + t.uid,
      allowrfs: !1,
      h: t.DIMENSION.H_BLK
    };
    r.call(this, t, i, a),
      (this.name = "BLANKCTN"),
      (this.newParam = function() {});
  }
  function s(i, a) {
    (this.DEFAULT_ARR = [
      { v: 0 / 0, color: "#007cc8", prop: "adl", idct: "ADL" }
    ]),
      r.call(this, i, a),
      (this.name = "ADL"),
      (this.sname = "T_ADL"),
      (this.disMod = i.datas.tDataLen);
    var s = "#b82c0c",
      e = "#2ec196";
    (this.initAndCalcAll = function(i) {
      var r = this.gdsd(i);
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var a, s, e = 0, h = r.length; h > e; e++) {
        (a = r[e]), (s = a.price - (a.avg_price || 0));
        var o = { adl: s };
        (o[vt + "price"] = a.price), this.selfArr.push(o);
      }
    }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          for (
            var r,
              a,
              h,
              o = this.datas.length,
              l = i.DIMENSION.w_t / o,
              n = l * gt,
              c = 0.5 * this.h,
              d = 0;
            2 > d;
            d++
          ) {
            (a = l * gt), t.beginPath();
            for (
              var f = 0;
              o > f && ((r = this.datas[f]), !(r.ignore_price < 0));
              f++
            )
              (h = r.adly),
                0 == d
                  ? r.adl > 0 && t.drawVStickC(a, h, n, c - h, s)
                  : r.adl < 0 && t.drawVStickC(a, h, n, c - h, e),
                (a += l);
            t.stroke();
          }
          t.drawBg();
        }
      });
  }
  function e(i, a) {
    (this.DEFAULT_ARR = [
      { v: 26, color: "#75B2A3", prop: "asi", idct: "ASI" },
      { v: 10, color: "#68A3FF", prop: "asit", idct: "ASIT" }
    ]),
      r.call(this, i, a),
      (this.name = "ASI");
    var s = bt.calcREF,
      e = bt.calcABS,
      h = bt.calcMAX,
      o = bt.calcSUM,
      l = bt.calcMA,
      n = bt.getArr,
      c = bt.operateArr;
    this.initAndCalcAll = function(i) {
      for (
        var r = this.customArr,
          a = r[0].v,
          d = r[1].v,
          f = n(i, "close"),
          u = n(i, "high"),
          p = n(i, "low"),
          v = n(i, "open"),
          A = s(f, 1),
          m = e(c(u, A, "-")),
          g = e(c(p, A, "-")),
          b = e(c(u, s(p, 1), "-")),
          y = e(c(A, s(v, 1), "-")),
          w = [],
          _ = 0,
          D = m.length;
        D > _;
        _++
      )
        w.push(
          m[_] > g[_] && m[_] > b[_]
            ? m[_] + g[_] / 2 + y[_] / 4
            : g[_] > b[_] && g[_] > m[_]
            ? g[_] + m[_] / 2 + y[_] / 4
            : b[_] + y[_] / 4
        );
      var M = c(
          c(c(c(f, A, "-"), c(c(f, v, "-"), 2, "/"), "+"), A, "+"),
          s(v, 1),
          "-"
        ),
        O = c(c(c(M, 16, "*"), w, "/"), h(m, g), "*"),
        S = o(O, a),
        T = l(S, d);
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var N = 0, I = i.length; I > N; N++)
        this.selfArr[N] = { asi: S[N], asit: T[N] };
    };
  }
  function h(i, a) {
    (this.DEFAULT_ARR = [
      { v: 11, color: "#999999", prop: "bbiboll", idct: "BBIBOLL" },
      { v: 6, color: "#ffac03", prop: "upr", idct: "UPR" },
      { v: 0 / 0, color: "#9922aa", prop: "dwn", idct: "DWN" }
    ]),
      r.call(this, i, a),
      (this.name = "BBIBOLL"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = bt.calcMA,
      e = bt.calcSTD,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        l = this.customArr[1].v,
        n = h(r, this.tkProp.close),
        c = o(
          o(o(o(s(n, 3), s(n, 6), "+"), s(n, 12), "+"), s(n, 24), "+"),
          4,
          "/"
        ),
        d = o(c, o(e(c, a), l, "*"), "+"),
        f = o(c, o(e(c, a), l, "*"), "-");
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var u = 0, p = r.length; p > u; u++)
        (this.selfArr[u] = { bbiboll: c[u], upr: d[u], dwn: f[u] }),
          (this.selfArr[u][At] = r[u].volume < 0);
    };
  }
  function o(i, a) {
    (this.DEFAULT_ARR = [
      { v: 22, color: "#fa6d6d", prop: "m", idct: "M" },
      { color: "#2b55ff" }
    ]),
      r.call(this, i, a),
      (this.name = "BF");
    var s = bt.calcMA,
      e = bt.getArr;
    (this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        h = e(i, "high"),
        o = s(h, a);
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var l = 0, n = i.length; n > l; l++) this.selfArr[l] = { m: o[l] };
    }),
      (this.draw = function(r, a) {
        function s(t, i, r) {
          for (
            var a = t.length, s = t[a - 1][i], e = a - 1, h = t.length;
            h--;

          ) {
            var o = t[h][i];
            r ? o > s && ((s = o), (e = h)) : s > o && ((s = o), (e = h));
          }
          return e;
        }
        if (((this.__iOffsetX = isNaN(a) ? this.__iOffsetX : a), this.datas)) {
          var e = this.line;
          e.clear(!0, i.PARAM.getHd());
          for (
            var h,
              o,
              l,
              n = bt.calcREF,
              c = bt.getArr,
              d = c(this.selfArr, "m"),
              f = n(d, 1),
              u = this.viewState.start,
              p = this.viewState.end,
              v = t.hex2dec(this.customArr[0].color, 0.5),
              A = t.hex2dec(this.customArr[1].color, 0.5),
              m = u;
            p > m;
            m++
          ) {
            if (
              ("undefined" == typeof h &&
                ((h = d[m] - f[m] >= 0 ? 1 : -1), (o = h), (l = m)),
              (h = d[m] - f[m] >= 0 ? 1 : -1),
              m == p - 1 && (h = -o),
              h != o)
            ) {
              e.beginPath(),
                e.moveTo(this.oriArr[m].ix, this.datas[m - u].my),
                e.lineTo(this.oriArr[l].ix, this.datas[l - u].my);
              var g;
              -1 == h
                ? ((g = s(this.oriArr.slice(l, m + 1), "high", !0) + l),
                  e.lineTo(this.oriArr[g].ix, this.oriArr[g].hy),
                  e.newFillStyle([v]))
                : ((g = s(this.oriArr.slice(l, m + 1), "low", !1) + l),
                  e.lineTo(this.oriArr[g].ix, this.oriArr[g].ly),
                  e.newFillStyle([A])),
                e.fill(),
                (l = m);
            }
            o = h;
          }
          r && e.drawBg(this.__iOffsetX);
        }
      });
  }
  function l(i, a) {
    (this.DEFAULT_ARR = [
      { v: 6, color: "#FD9C35", prop: "bias1", idct: "BIAS1" },
      { v: 12, color: "#00c1eb", prop: "bias2", idct: "BIAS2" },
      { v: 24, color: "#DD4444", prop: "bias3", idct: "BIAS3" }
    ]),
      r.call(this, i, a),
      (this.name = "BIAS"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = { min: 0 / 0, max: 0 / 0, glv: 0 });
    var s = bt.calcMA,
      e = bt.getArr,
      h = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        o = this.customArr[1].v,
        l = this.customArr[2].v,
        n = e(r, this.tkProp.close),
        c = h(h(h(n, s(n, a), "-"), s(n, a), "/"), 100, "*"),
        d = h(h(h(n, s(n, o), "-"), s(n, o), "/"), 100, "*"),
        f = h(h(h(n, s(n, l), "-"), s(n, l), "/"), 100, "*");
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var u = 0, p = r.length; p > u; u++)
        (this.selfArr[u] = { bias1: c[u], bias2: d[u], bias3: f[u] }),
          (this.selfArr[u][At] = r[u].volume < 0);
    };
  }
  function n(i, a) {
    (this.DEFAULT_ARR = [
      { v: 20, color: "#999999", prop: "boll", idct: "BOLL" },
      { v: 2, color: "#ffac03", prop: "upper", idct: "UPPER" },
      { v: 0 / 0, color: "#cc22ba", prop: "lower", idct: "LOWER" }
    ]),
      r.call(this, i, a),
      (this.name = "BOLL"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = bt.getArr,
      e = bt.calcMA,
      h = bt.calcSTD,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        l = this.customArr[1].v,
        n = s(r, this.tkProp.close),
        c = e(n, a),
        d = o(h(n, a), l, "*"),
        f = o(c, d, "+"),
        u = o(c, d, "-");
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var p = 0, v = r.length; v > p; p++)
        (this.selfArr[p] = { boll: c[p], upper: f[p], lower: u[p] }),
          (this.selfArr[p][At] = r[p].volume < 0);
    };
  }
  function c(i, a) {
    (this.DEFAULT_ARR = [
      { v: 26, color: "#E297FF", prop: "br", idct: "BR" },
      { color: "#666666", prop: "ar", idct: "AR" }
    ]),
      r.call(this, i, a),
      (this.name = "BRAR"),
      (this.vaObj = { glv: 150 });
    var s = bt.calcSUM,
      e = bt.calcMAX,
      h = bt.calcREF,
      o = bt.getArr,
      l = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        n = o(i, "high"),
        c = o(i, "close"),
        d = o(i, "open"),
        f = o(i, "low"),
        u = h(c, 1),
        p = l(
          l(s(e(0, l(n, u, "-")), a), s(e(0, l(u, f, "-")), a), "/"),
          100,
          "*"
        ),
        v = l(l(s(l(n, d, "-"), a), s(l(d, f, "-"), a), "/"), 100, "*");
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var A = 0, m = i.length; m > A; A++)
        this.selfArr[A] = { br: p[A], ar: v[A] };
    };
  }
  function d(i, a) {
    (this.DEFAULT_ARR = [
      { v: 14, color: "#FFAC03", prop: "cci", idct: "CCI" }
    ]),
      r.call(this, i, a),
      (this.name = "CCI"),
      (this.vaObj = { upper: 100, lower: -100, glv: 0 });
    var s = bt.calcAVEDEV,
      e = bt.calcMA,
      h = bt.operateArr,
      o = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = o(i, "close"),
        n = o(i, "high"),
        c = o(i, "low"),
        d = h(h(h(n, c, "+"), l, "+"), 3, "/"),
        f = h(h(d, e(d, a), "-"), h(s(d, a), 0.015, "*"), "/");
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var u = 0, p = i.length; p > u; u++) this.selfArr[u] = { cci: f[u] };
    };
  }
  function f(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#ff8400",
        prop: "value",
        idct: "\u7b79\u7801\u6210\u672c"
      }
    ]),
      r.call(this, i, a),
      (this.name = "CHIPCOST"),
      (this.lw = 2),
      (this.cb = s),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/perspective/chip/$symbol.js?_=$rn");
    var e = "chip_";
    (this.selfDataUrlUpdate =
      "http://" +
      dt +
      ".sinajs.cn/etag.php?_=" +
      new Date().getTime() +
      "&list=" +
      e +
      "$symbol"),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.loadedFromTo = void 0),
      (this.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
          var r = this,
            a = this.symbol,
            s = "_touzi_chip_" + a,
            e = this.selfDataUrl
              .replace("$symbol", a)
              .replace("$rn", String(new Date().getDate()));
          this.proxyCfg.usrObj.ssl && (e = t.getSUrl(e)),
            t.load(e, function() {
              var t = window[s];
              r.urlData || (r.urlData = { day: [] });
              var i = r.df(t),
                a = r.urlData.day;
              a.splice.apply(a, [0, 0].concat(i)),
                a.sort(function(t, i) {
                  return t.date - i.date;
                }),
                (r.toReCalc = !0),
                r.cb(r);
            });
        }
      }),
      (this.df = function(t) {
        var i = [];
        if (t) {
          var r = t;
          for (var a in r)
            r.hasOwnProperty(a) && i.push({ value: r[a], date: lt.sd(a) });
        }
        return i;
      });
    var h = !0;
    (this.UPDATE_THRESHOLD = 3),
      (this.update = function() {
        if (h) h = !1;
        else {
          if (++this.updateCount < this.UPDATE_THRESHOLD) return;
          this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
        }
        var i = this,
          r = this.symbol,
          a = "hq_str_" + e + r,
          s = this.selfDataUrlUpdate.replace("$symbol", r);
        this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
          t.load(s, function() {
            var t = window[a],
              r = i.udf(t);
            r && i.doUpdate(r);
          });
      }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r && r.length > 1 && (i = [{ date: lt.sd(r[0]), value: r[1] }]), i
          );
        }
      }),
      (this.updateData = function(t, i, r) {
        if (t && i && !(i.length < 1)) {
          var a = i[i.length - 1];
          if ((t = t[0]))
            if (lt.stbd(t.date, a.date))
              for (var s in t)
                t.hasOwnProperty(s) &&
                  "undefined" != typeof a[s] &&
                  (a[s] = t[s]);
            else t.date > a.date && this.newData(i, t, r);
        }
      }),
      (this.setPricePos = function(t) {
        t &&
          ((this.labelMaxP = t[0]),
          (this.labelMinP = t[1]),
          (this.pricePosArr = t)),
          this.createPlayingData();
      }),
      (this.initAndCalcAll = function(i) {
        if (((this.oriArr = i), this.urlData && this.toReCalc)) {
          (this.toReCalc = !1),
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
          for (
            var r,
              a = this.urlData.day,
              s = t.kUtil.adbd(a, i, !1, !1),
              e = 0,
              h = i.length;
            h > e;
            e++
          )
            (r = s[e]), this.selfArr.push({ value: Number(r.value) });
        }
      }),
      this.loadUrlData();
  }
  function u(i, a, s) {
    function e() {
      (f > i.DIMENSION.w_t || 0 > f) && (f = i.DIMENSION.w_t),
        (h.titleO.canvas.style.display = "none"),
        (h.line.getCanvas().style.zIndex -= 2);
    }
    var h = this;
    (this.DEFAULT_ARR = [
      { v: 0 / 0, color: "#007cc8", prop: "ditc", idct: "DITC" }
    ]),
      r.call(this, i, a),
      (this.name = "DITC"),
      (this.cb = s);
    var o,
      l,
      n = "#c2c2c2",
      c = !0,
      d =
        "https://stock.sina.com.cn/stock/api/openapi.php/StockLevel2Service.getSummarize?symbol=$symbol&type=0&callback=$cb&dpc=1&retcode=0",
      f = i.DIMENSION.w_t / 2;
    (this.loadUrlData = function(i) {
      if (i) {
        var r = h.symbol,
          a = "_" + r + lt.ddt(new Date()).getFullYear();
        (h.selfDataUrl = d),
          t.load(
            h.selfDataUrl
              .replace("$symbol", r)
              .replace("$cb", "var%20" + a + "="),
            function() {
              var t = window[a];
              t &&
                ((h.urlData = h.oriArr = t.result.data),
                (h.toReCalc = !0),
                (c = !1),
                h.cb(h));
            },
            function() {}
          );
      }
    }),
      (this.initAndCalcAll = function() {
        if (
          !c &&
          (this.datas || (e(), (this.datas = [])),
          t.ca(this.selfArr),
          h.urlData)
        ) {
          var i,
            r,
            a,
            s = 0,
            o = h.urlData.length;
          for (i = 0; o > i; i++) s = Math.max(h.urlData[i].volume, s);
          for (i = 0; o > i; i++)
            (a = h.urlData[i]),
              (r = a.volume * (f / s)),
              h.selfArr.push({ ditc: r, trade: Number(a.trade) });
        }
      }),
      (this.setRange = function() {
        if (!c && this.datas) {
          for (var t = h.selfArr.length; this.datas.length > t; )
            this.datas.length--;
          for (; this.datas.length < t; ) this.datas.push({});
        }
      }),
      (this.setPricePos = function(t) {
        !t || this.separate > 0
          ? ((this.labelMinP = l || this.minPrice),
            (this.labelMaxP = o || this.maxPrice))
          : ((this.labelMaxP = o = t[0]), (this.labelMinP = l = t[1])),
          this.createPlayingData();
      }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          var r = this.viewState.start,
            a = this.viewState.end;
          if (4 == r || 5 == a) {
            var s,
              e = h.selfArr.length,
              o = i.DIMENSION.h_t / e,
              l = Math.min(0.6 * o, 2);
            for (t.newStyle(n, !0, l), s = 0; e > s; s++) {
              var c = h.selfArr[s],
                d =
                  (i.DIMENSION.h_t * (h.labelMaxP - c.trade)) /
                  (h.labelMaxP - h.labelMinP);
              t.moveTo(0, d), t.lineTo(c.ditc, d);
            }
            t.stroke();
          }
        }
      }),
      h.loadUrlData(!0);
  }
  function p(i, a) {
    (this.DEFAULT_ARR = [
      { v: 10, desc: "\u5feb\u7ebf\u79fb\u52a8\u5e73\u5747" },
      { v: 50, color: "#777777", prop: "dif", idct: "DIF" },
      { v: 10, color: "#FFAC03", prop: "difma", idct: "DIFMA" }
    ]),
      r.call(this, i, a),
      (this.name = "DMA"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = { glv: 0 });
    var s = bt.calcMA,
      e = bt.operateArr,
      h = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = h(r, this.tkProp.close),
        o = s(a, this.customArr[0].v),
        l = s(a, this.customArr[1].v),
        n = e(o, l, "-"),
        c = s(n, this.customArr[2].v);
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var d = 0, f = r.length; f > d; d++)
        (this.selfArr[d] = { dif: n[d], difma: c[d] }),
          (this.selfArr[d][At] = r[d].volume < 0);
    };
  }
  function v(i, a) {
    (this.DEFAULT_ARR = [
      { v: 14, color: "#999999", prop: "pdi", idct: "PDI", desc: "DMI" },
      {
        v: 6,
        color: "#ffac03",
        prop: "mdi",
        idct: "MDI",
        desc: "\u79fb\u52a8\u5e73\u5747"
      },
      { color: "#cc22ba", prop: "adx", idct: "ADX" },
      { color: "#2ec196", prop: "adxr", idct: "ADXR" }
    ]),
      r.call(this, i, a),
      (this.name = "DMI");
    var s = bt.calcEMA,
      e = bt.calcMAX,
      h = bt.calcABS,
      o = bt.calcREF,
      l = bt.getArr,
      n = bt.operateArr;
    this.initAndCalcAll = function(i) {
      for (
        var r,
          a,
          c = this.customArr[0].v,
          d = this.customArr[1].v,
          f = l(i, "close"),
          u = l(i, "high"),
          p = l(i, "low"),
          v = s(
            e(e(n(u, p, "-"), h(n(u, o(f, 1), "-"))), h(n(p, o(f, 1), "-"))),
            c
          ),
          A = n(u, o(u, 1), "-"),
          m = n(o(p, 1), p, "-"),
          g = [],
          b = [],
          y = 0,
          w = A.length;
        w > y;
        y++
      )
        (r = A[y]),
          (a = m[y]),
          g.push(r > 0 && r > a ? r : 0),
          b.push(a > 0 && a > r ? a : 0);
      (g = s(g, c)), (b = s(b, c));
      var _ = n(n(g, 100, "*"), v, "/"),
        D = n(n(b, 100, "*"), v, "/"),
        M = s(n(n(h(n(D, _, "-")), n(D, _, "+"), "/"), 100, "*"), d),
        O = s(M, d);
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var S = 0, T = i.length; T > S; S++)
        this.selfArr[S] = { pdi: _[S], mdi: D[S], adx: M[S], adxr: O[S] };
    };
  }
  function A(i, a) {
    var s = "pct",
      e = "oripct",
      h = "mn";
    (this.DEFAULT_ARR = [
      {
        color: "#fa6d6d",
        prop: s,
        idct: "\u7ea2\u7ebf\uff08\u591a\u7a7a\u4fe1\u53f7\u6536\u76ca\uff09"
      },
      {
        color: "#2b55ff",
        prop: e,
        idct: "\u84dd\u7ebf\uff08\u80a1\u4ef7\u81ea\u7136\u6da8\u5e45\uff09"
      },
      { v: 0 / 0, prop: h, idct: h, color: "#66ccff", hidecfg: !0 }
    ]),
      r.call(this, i, a),
      (this.name = "DPDK"),
      (this.alias = "\u5927\u76d8\u591a\u7a7a");
    var o = bt.getArr,
      l = bt.calcSUM,
      n = bt.operateArr;
    (this.initAndCalcAll = function(i) {
      var r = 48,
        a = o(i, "close"),
        s = o(i, "high"),
        e = o(i, "low"),
        c = o(i, "volume"),
        d = n(n(n(n(a, e, "+"), s, "+"), 3, "/"), c, "*"),
        f = n(l(d, r), l(c, r), "/"),
        u = (function() {
          for (var t = [], i = 0, r = a.length; r > i; i++)
            t.push(a[i] >= f[i] ? 1 : 0);
          return t;
        })();
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var p = 0, v = i.length; v > p; p++)
        (this.selfArr[p] = { flag: u[p] }), (this.selfArr[p][h] = f[p]);
    }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = Number.MAX_VALUE,
              h = -Number.MAX_VALUE,
              o = 0,
              l = 0,
              n = this.selfArr[t].flag,
              c = bt.calcA,
              d = bt.getArr,
              f = 10,
              u = t;
            i > u;
            u++
          ) {
            var p = this.datas[u - t];
            p.date = this.oriArr[u].date;
            var v = this.selfArr[u].flag,
              A = this.oriArr[u],
              m = c(
                d(
                  this.oriArr.slice(0 > u - f + 1 ? 0 : u - f + 1, u + 1),
                  "close"
                )
              );
            u != t
              ? v == n
                ? 1 == v && (o = (1 + A.percent) * (1 + o) - 1)
                : (o =
                    0 == v
                      ? A.open < m
                        ? ((A.open - this.oriArr[u - 1].close) /
                            this.oriArr[u - 1].close +
                            1) *
                            (1 + o) -
                          1
                        : ((m - this.oriArr[u - 1].close) /
                            this.oriArr[u - 1].close +
                            1) *
                            (1 + o) -
                          1
                      : A.open > m
                      ? ((A.close - A.open) / A.open + 1) * (1 + o) - 1
                      : ((A.close - m) / m + 1) * (1 + o) - 1)
              : 1 == v &&
                (o =
                  A.open > m
                    ? ((A.close - A.open) / A.open + 1) * (1 + o) - 1
                    : ((m - A.open) / A.open + 1) * (1 + o) - 1),
              (n = v),
              u != t && (l = (1 + A.percent) * (1 + l) - 1),
              (p[s] = 100 * o),
              (p[e] = 100 * l);
            for (var g in this.selfArr[u])
              if (this.selfArr[u].hasOwnProperty(g)) {
                if (((p[g] = this.selfArr[u][g]), "flag" == g)) continue;
                p[g] > h && (h = p[g]), p[g] < a && (a = p[g]);
              }
          }
          (this.minPrice = a), (this.maxPrice = h), this.syncI();
        }
      }),
      (this.draw = function(r, a) {
        if (((this.__iOffsetX = isNaN(a) ? this.__iOffsetX : a), this.datas)) {
          var s =
              i.DIMENSION.w_k /
              Math.max(this.datas.length, i.PARAM.minCandleNum),
            e = this.line;
          e.clear(!0, i.PARAM.getHd());
          for (
            var h,
              o,
              l,
              n,
              c,
              d = this.viewState.start,
              f = this.viewState.end,
              u = t.hex2dec(this.customArr[0].color),
              p = t.hex2dec(this.customArr[1].color),
              v = 0;
            2 > v;
            v++
          ) {
            for (
              o = this.datas[0].flag ? 0 : 1,
                e.newStyle([v ? u : p], !0, s / 2 > 3 ? 3 : s / 2),
                l = d;
              f > l;
              l++
            )
              (h = this.datas[l - d].flag),
                h == v &&
                  e[h == o ? "lineTo" : "moveTo"](
                    this.oriArr[l].ix,
                    this.datas[l - d].mny
                  ),
                (o = h);
            for (
              e.stroke(),
                o = this.datas[0].flag ? 0 : 1,
                e.newStyle([v ? u : p], !0, 1),
                l = d;
              f > l;
              l++
            )
              if (
                ((c = this.oriArr[l]), (h = this.datas[l - d].flag), h == v)
              ) {
                (n = ~~(c.ix + 0.5)), (n -= 0.5);
                var A = (c.hy - c.ly) / 2;
                e.moveTo(n, this.datas[l - d].mny + A),
                  e.lineTo(n, this.datas[l - d].mny - A);
              }
            e.stroke(), (o = this.datas[0].flag ? 0 : 1);
            var m = v ? u : p;
            for (
              m = m.match(/\d+/g),
                m.push(0.4),
                m = "rgba(" + m + ")",
                e.newFillStyle([m], !0, 1),
                l = d;
              f > l;
              l++
            ) {
              (c = this.oriArr[l]), (h = this.datas[l - d].flag);
              var g = c.ix;
              (n = ~~(c.ix + 0.5)), (n -= 0.5);
              var b = (c.hy - c.ly) / 2;
              if (h == v && l != f - 1)
                h != o
                  ? (e.beginPath(), e.moveTo(g, this.datas[l - d].mny + b))
                  : e.lineTo(g, this.datas[l - d].mny + b);
              else if (
                (l != d && h != o && l != f - 1) ||
                (l == f - 1 && ((h == o && h == v) || (h != o && h != v)))
              ) {
                var y;
                for (
                  l == f - 1 && h == o
                    ? ((y = l), e.lineTo(g, this.datas[l - d].mny + b))
                    : (y = l - 1);
                  y >= d;

                ) {
                  var w = this.datas[y - d].flag;
                  if (w != v) break;
                  var _ = this.oriArr[y],
                    D = _.ix,
                    M = (_.hy - _.ly) / 2;
                  e.lineTo(D, this.datas[y - d].mny - M), y--;
                }
                e.closePath(), e.fill();
              }
              o = h;
            }
          }
          r && e.drawBg(this.__iOffsetX);
        }
      });
  }
  function m(t, i, r) {
    A.call(this, t, i),
      (this.name = "DPDKS"),
      (this.alias = "\u5927\u76d8\u591a\u7a7a"),
      (this.cb = r);
    var a = "mn";
    (this.drawCalc = function() {
      if (this.datas) {
        this.setRange();
        var t,
          i,
          r,
          s,
          e = this.datas.length,
          h = Number.MAX_VALUE,
          o = -Number.MAX_VALUE;
        for (i = 0; e > i; i++)
          for (t = this.datas[i], r = this.customArr.length; r--; )
            (s = this.customArr[r].prop),
              s && s != a && (t[s] > o && (o = t[s]), t[s] < h && (h = t[s]));
        (this.labelMaxP = this.maxPrice = o),
          (this.labelMinP = this.minPrice = h);
        var l = o - h;
        for (i = 0; e > i; i++)
          for (t = this.datas[i], r = this.customArr.length; r--; )
            (s = this.customArr[r].prop),
              s && s != a && (t[s + "y"] = (this.h * (o - t[s])) / l);
      }
    }),
      (this.draw = function(t, i) {
        if (((this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i), this.datas)) {
          this.line.clear(!0, this.cfg.PARAM.getHd());
          var r =
            (this.h * this.maxPrice) / (this.maxPrice - this.minPrice) - 0.5;
          this.line.newStyle(this.cfg.COLOR.GRID, !0, 2),
            this.line.moveTo(0, r),
            this.line.lineTo(this.cfg.DIMENSION.w_k, r),
            this.line.stroke();
          for (
            var a,
              s = this.datas.length,
              e =
                this.cfg.DIMENSION.w_k /
                Math.max(s, this.cfg.PARAM.minCandleNum),
              h = this.customArr.length;
            h--;

          ) {
            var o = this.customArr[h].prop + "y";
            (a = this.__iOffsetX - e * mt),
              this.line.newStyle(this.customArr[h].color, !0, 1.5);
            for (
              var l, n = 0;
              s > n && ((l = this.datas[n][o]), !isNaN(l));
              n++
            )
              0 == n ? this.line.moveTo(a, l) : this.line.lineTo(a, l),
                (a += e);
            this.line.stroke();
          }
          t && this.line.drawBg(this.__iOffsetX);
        }
      });
  }
  function g(i, a) {
    (this.DEFAULT_ARR = [
      { v: 14, color: "#D96FF0", prop: "emv", idct: "EMV" },
      { v: 9, color: "#F76D6D", prop: "maemv", idct: "MAEMV" }
    ]),
      r.call(this, i, a),
      (this.name = "EMV"),
      (this.vaObj = { glv: 0 });
    var s = bt.calcMA,
      e = bt.calcREF,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = r[1].v,
        n = h(i, "high"),
        c = h(i, "low"),
        d = h(i, "volume"),
        f = o(s(d, a), d, "/"),
        u = o(n, c, "+"),
        p = o(n, c, "-"),
        v = o(o(o(u, e(u, 1), "-"), u, "/"), 100, "*"),
        A = s(o(o(o(v, f, "*"), p, "*"), s(p, a), "/"), a),
        m = s(A, l);
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var g = 0, b = i.length; b > g; g++)
        this.selfArr[g] = { emv: A[g], maemv: m[g] };
    };
  }
  function b(i, a, s) {
    var e = "ewi";
    (this.DEFAULT_ARR = [
      { color: "#F6C257", prop: e, idct: "\u7b49\u6743\u91cd" }
    ]),
      r.call(this, i, a);
    var h = "icn_calc_",
      o = this;
    (this.name = "EWI"),
      (this.sname = "T_EWI"),
      (this.alias = "\u7b49\u6743\u91cd"),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/finance/touzieql/$symbol.js?" +
        Math.random()),
      (this.selfDataUrlUpdate =
        "http://" +
        dt +
        ".sinajs.cn/etag.php?_=" +
        new Date().getTime() +
        "&list=" +
        h +
        "$symbol"),
      (this.cb = s),
      (this.df = function(t) {
        var i = [];
        if (t)
          for (var r in t)
            t.hasOwnProperty(r) && i.push({ ewi: Number(t[r]), time: r });
        return i;
      });
    var l,
      n = !1;
    (this.loadUrlData = function() {
      var i = this.aliasymbol || this.symbol,
        r = "_touziequallyweight_" + i,
        s = this.selfDataUrl
          .replace("$symbol", i)
          .replace("$cb", "var%20" + r + "=")
          .replace("$rn", String(new Date().getDate()));
      this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
        n ||
          ((l = t.tUtil.gata(a.usrObj.market)),
          t.load(s, function() {
            var t = window[r];
            (window[r] = null), (o.urlData = { time: [] });
            var i = o.df(t),
              a = o.urlData.time;
            a.splice.apply(a, [0, 0].concat(i)), (n = !0), o.update();
          }));
    }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r &&
              r.length > 1 &&
              (i = [{ time: r[6].substring(0, 5), ewi: r[2] }]),
            i
          );
        }
      }),
      (this.update = function() {
        var i = this.symbol,
          r = "hq_str_" + h + i,
          a = this.selfDataUrlUpdate.replace("$symbol", i);
        this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
          t.load(a, function() {
            var t = window[r];
            window[r] = null;
            var i = o.udf(t);
            i && o.urlData && o.urlData.time && o.updateData(i, o.urlData.time);
          });
      }),
      (this.updateData = function(i, r) {
        if (i && r && !(r.length < 1)) {
          var s = r[r.length - 1];
          if ((i = i[0])) {
            if (s.time <= i.time)
              for (
                var e = t.arrIndexOf(l, i.time),
                  h = t.arrIndexOf(l, s.time),
                  n = h;
                e >= n;
                n++
              )
                e - n > 0
                  ? (r[r.length] = r[r.length - 1])
                  : (r[r.length - 1] = i);
            o.cb(o),
              4 == o.viewState.start && 5 == o.viewState.end && a.cbInDC();
          }
        }
      }),
      (this.setPricePos = function(t) {
        t && ((o.labelMaxP = t[0]), (o.labelMinP = t[1]), (o.pricePosArr = t)),
          this.createPlayingData();
      }),
      (this.initAndCalcAll = function(i) {
        if (this.urlData) {
          (this.oriArr = this.gdsd(i)),
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
          var r,
            s = this.urlData.time,
            e = a.stock.realLen;
          0 > e && (e = o.disMod);
          var h = 0;
          for (r = 0; r <= o.disMod && !(r > e); r++)
            s[r]
              ? ((i[4][r].ewi = s[r].ewi), (h = r))
              : (i[4][r].ewi = s[h].ewi);
          for (var l, n = 0, c = this.oriArr.length; c > n; n++)
            (l = this.oriArr[n]),
              this.selfArr.push({ ewi: l ? Number(l.ewi) : 1 });
        }
      }),
      this.loadUrlData();
  }
  function y(i, a) {
    (this.storageVer = "v2"), r.call(this, i, a);
    var s = this;
    (this.name = "EXPMA"), "k" != a.type && (this.sname = "T_" + this.name);
    var e = ["#2d0674", "#84a8de", "#e80f01", "#f1926f", "#2c0eed"],
      h = "EMA",
      o = "ema";
    this.generateSettings = function() {
      if (s.param && s.param.length > 0) {
        s.customArr = [];
        for (var i = 0, r = s.param.length; r > i; i++) {
          var a = s.param[i].v;
          !isNaN(a) &&
            a > 0 &&
            s.customArr.push({
              v: a,
              color: s.param[i].color || e[i] || "#" + t.randomColor(),
              prop: o + a,
              idct: h + a,
              desc: h
            });
        }
      }
      (!s.customArr || s.customArr.length < 1) &&
        (s.customArr = [
          { v: 12, color: e[0], prop: o + "12", idct: h + "12", desc: h },
          { v: 50, color: e[1], prop: o + "50", idct: h + "50", desc: h }
        ]);
    };
    var l = bt.getArr,
      n = bt.calcEMA;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i);
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (
        var a = l(r, this.tkProp.close),
          s = [],
          e = 0,
          h = this.customArr.length;
        h > e;
        e++
      )
        s.push(n(a, this.customArr[e].v));
      for (var c = r.length, d = 0, f = s.length; f > d; d++)
        for (var u = this.customArr[d].v, p = 0; c > p; p++) {
          var v = (this.selfArr[p] = this.selfArr[p] || {});
          r[p].volume < 0 ? (v[At] = !0) : (v[o + u] = s[d][p]);
        }
    };
  }
  function w(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#990000",
        prop: "mb",
        idct: "\u51c0\u8d85\u5927\u5355"
      },
      { v: 0 / 0, color: "#009900", prop: "ms", idct: "\u51c0\u5927\u5355" },
      { v: 0 / 0, color: "#000099", prop: "sb", idct: "\u51c0\u4e2d\u5355" },
      { v: 0 / 0, color: "#ff0099", prop: "ss", idct: "\u51c0\u5c0f\u5355" }
    ]),
      r.call(this, i, a),
      (this.name = "TECHFLOW"),
      (this.separate = 1),
      (this.selfDataUrl =
        "http://stock.finance.sina.com.cn/stock/api/jsonp_v2.php/$cb/StockMixService.getNewRateInfo?symbol=$symbol&___qn=3&from=$from&to=$to"),
      (this.selfDataUrlUpdate = "http://" + dt + ".sinajs.cn/list=$symbol"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.initAndCalcAll = function(i, r) {
        if (!r && ((this.oriArr = i), this.urlData)) {
          !this.datas && (this.datas = []), t.ca(this.selfArr);
          var a;
          switch (this.viewState.viewId) {
            case 24:
              a = this.urlData.day;
              break;
            case 168:
              a = this.urlData.week;
              break;
            case 720:
              a = this.urlData.month;
          }
          for (
            var s, e = t.kUtil.adbd(a, i, !1, !0), h = 0, o = i.length;
            o > h;
            h++
          )
            (s = e[h]),
              this.selfArr.push({
                mb: s ? Number(s.mb) : 0 / 0,
                ms: s ? Number(s.ms) : 0 / 0,
                sb: s ? Number(s.sb) : 0 / 0,
                ss: s ? Number(s.ss) : 0 / 0
              });
        }
      }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = Number.MAX_VALUE, s = -Number.MAX_VALUE, e = t;
            i > e;
            e++
          ) {
            var h = this.datas[e - t];
            h.date = this.oriArr[e].date;
            var o = 0,
              l = 0;
            for (var n in this.selfArr[e])
              this.selfArr[e].hasOwnProperty(n) &&
                ((h[n] = this.selfArr[e][n]),
                h[n] > 0 ? (o += h[n]) : (l += h[n]));
            (s = Math.max(o, l, s)), (a = Math.min(o, l, a));
          }
          (s = Math.max(Math.abs(s), Math.abs(a))),
            (a = -s),
            (this.minPrice = a),
            (this.maxPrice = s);
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l = this.datas.length,
              n = i.DIMENSION.w_k / Math.max(l, i.PARAM.minCandleNum),
              c = (this.labelMaxP / (this.labelMaxP - this.labelMinP)) * this.h,
              d = [],
              f = [],
              u = this.customArr.length;
            u--;

          ) {
            var p = this.customArr[u].prop + "y";
            (o = this.__iOffsetX - n * gt),
              a.newStyle(this.customArr[u].color, !0, o);
            for (var v = 0; l > v; v++)
              (h = this.datas[v][p]),
                (s = h > c ? f[v] || 0 : d[v] || 0),
                (e = c - s),
                (h -= s),
                a.moveTo(o, e),
                a.lineTo(o, h),
                h > c
                  ? ((d[v] = d[v] || 0), (f[v] = c - h))
                  : ((d[v] = c - h), (f[v] = f[v] || 0)),
                (o += n);
            a.stroke();
          }
        }
      }),
      (this.udf = function(t) {
        if (!t) return null;
        var i = t.split(",");
        return {
          mb: Number(i[0]),
          ms: Number(i[1]),
          sb: Number(i[2]),
          ss: Number(i[3]),
          date: lt.sd(i[4])
        };
      }),
      (this.df = function(t) {
        for (var i = [], r = 0, a = t.length; a > r; r++) {
          var s = lt.sd(t[r].d),
            e = s.getDate();
          i.push({ mb: e, sb: e, ms: e, ss: e, date: s });
        }
        return i;
      }),
      this.loadUrlData();
  }
  function _(i, a) {
    (this.DEFAULT_ARR = [
      { v: 9, color: "#888888", prop: "k", idct: "K" },
      { v: 3, color: "#FFAC03", prop: "d", idct: "D" },
      { v: 3, color: "#cc22ba", prop: "j", idct: "J" }
    ]),
      r.call(this, i, a),
      (this.name = "KDJ"),
      (this.vaObj = { glv: 50, upper: 80, lower: 20 });
    var s = bt.calcSMA,
      e = bt.calcLLV,
      h = bt.calcHHV,
      o = bt.operateArr,
      l = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        n = r[1].v,
        c = r[2].v,
        d = l(i, "close"),
        f = l(i, "low"),
        u = l(i, "high"),
        p = o(o(o(d, e(f, a), "-"), o(h(u, a), e(f, a), "-"), "/"), 100, "*"),
        v = s(p, n, 1),
        A = s(v, c, 1),
        m = o(o(v, 3, "*"), o(A, 2, "*"), "-");
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var g = 0, b = i.length; b > g; g++)
        this.selfArr[g] = { k: v[g], d: A[g], j: m[g] };
    };
  }
  function D(i, a, s) {
    var e = "bar";
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#888887",
        prop: e,
        idct: "\u5927\u5355\u91d1\u989d",
        desc: "\u6587\u5b57\u989c\u8272"
      }
    ]),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "KFLOW"),
      (this.alias = "\u4e3b\u529b\u52a8\u5411"),
      "sh000001" === this.symbol && (this.aliasymbol = "sh999999"),
      (this.vaObj = { glv: 0 }),
      (this.UPDATE_THRESHOLD = 5),
      (this.selfDataUrl =
        "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getHistoryMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to"),
      (this.selfDataUrlUpdate =
        "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getLastMoneyFlow?callback=$cb&symbol=$symbol"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.df = function(t) {
        if (t && t.result && t.result.data) {
          for (
            var i, r, a = [], s = t.result.data, h = 0, o = s.length;
            o > h;
            h++
          ) {
            (i = s[h]), (r = i.split(","));
            var l = { date: lt.sd(r[0]) };
            (l[e] = Number(r[1])), a.push(l);
          }
          return a;
        }
      });
    var h;
    this.udf = function(t) {
      if (t && t.result && t.result.data) {
        var i = t.result.data;
        if (i && !(i.length < 9)) {
          i = i.split(",");
          var r = Number(i[1]),
            a = { date: lt.sd(i[0]) };
          return (
            (a[e] = r),
            h
              ? (a[e + "update"] = r - h[e] || 0)
              : ((h = {}), (a[e + "update"] = 0)),
            (h[e] = r),
            a
          );
        }
      }
    };
    var o;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), t.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          case 167:
          case 168:
          case 169:
            r = this.urlData.week;
            break;
          case 719:
          case 720:
          case 721:
            r = this.urlData.month;
            break;
          default:
            r = [{ bar: 0, date: i[i.length - 1].date }];
        }
        o = t.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++) {
          a = o[s];
          var l = {};
          (l[e] = a ? Number(a[e]) : 0 / 0), this.selfArr.push(l);
        }
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                s[o] > h && (h = s[o]),
                s[o] < e && (e = s[o]));
          }
          e == h
            ? (e = h = 0)
            : ((h = Math.max(Math.abs(h), Math.abs(e))), (e = -h)),
            (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = h),
            (this.labelMinP = e);
          var l = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var n = this.customArr.length; n--; ) {
              var c = this.customArr[n].prop;
              s[c + "y"] = 0 == l ? this.h >> 1 : (this.h * (h - s[c])) / l;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l,
              n = this.datas.length,
              c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum),
              d = "hollow" == i.datas.candle,
              f = 0.6 * c,
              u = 0.5 * this.h,
              p = 0;
            2 > p;
            p++
          ) {
            for (
              l = 0 == p ? i.COLOR.K_FALL : i.COLOR.K_RISE,
                e = this.__iOffsetX - c,
                a.beginPath(),
                s = 0;
              n > s;
              s++
            )
              (o = this.datas[s]),
                (h = o.bary),
                0 == p
                  ? h > u &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_FALL, !0)
                  : u >= h &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_RISE, !d),
                (e += c);
            a.stroke();
          }
          a.drawBg(this.__iOffsetX), this.vaObj && this.drawValueRange();
        }
      }),
      this.loadUrlData();
  }
  function M(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#888887",
        prop: "bar",
        idct: "\u4e3b\u529b\u8d44\u91d1",
        desc: "\u4e3b\u529b\u8d44\u91d1"
      },
      {
        v: 0 / 0,
        color: "#ff1111",
        prop: "super",
        idct: "\u7279\u5927",
        desc: "\u7279\u5927"
      },
      {
        v: 0 / 0,
        color: "#ff9f07",
        prop: "big",
        idct: "\u5927",
        desc: "\u5927"
      },
      {
        v: 0 / 0,
        color: "#00b5f8",
        prop: "mid",
        idct: "\u4e2d",
        desc: "\u4e2d"
      },
      {
        v: 0 / 0,
        color: "#5b0497",
        prop: "small",
        idct: "\u5c0f",
        desc: "\u5c0f"
      }
    ]),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "KKFLOW"),
      (this.alias = "\u51c0\u4e70\u5165"),
      (this.vaObj = { glv: 0 }),
      (this.UPDATE_THRESHOLD = 5),
      (this.selfDataUrl =
        "http://stock.sina.com.cn/stock/api/openapi.php/TouziService.getStockHistoryFlow?page=1&num=10000&symbol=$symbol&callback=$cb"),
      (this.selfDataUrlUpdate =
        "http://stock.sina.com.cn/stock/api/openapi.php/TouziService.getStockFlow?symbol=$symbol&callback=$cb"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.df = function(t) {
        if (t && t.result && t.result.data) {
          for (
            var i,
              r = [],
              a = t.result.data.data.reverse(),
              s = 0,
              e = a.length;
            e > s;
            s++
          ) {
            i = a[s];
            var h = i.r0_in,
              o = i.r1_in,
              l = i.r2_in,
              n = i.r3_in,
              c = i.r0_out,
              d = i.r1_out,
              f = i.r2_out,
              u = i.r3_out;
            r.push({
              date: lt.sd(i.date),
              super: h - c,
              big: o - d,
              mid: l - f,
              small: n - u,
              bar: h + o - c - d
            });
          }
          return r;
        }
      }),
      (this.udf = function(t) {
        if (t && t.result && t.result.data) {
          var i = t.result.data;
          if (i) {
            var r = i.r0_in,
              a = i.r1_in,
              s = i.r2_in,
              e = i.r3_in,
              h = i.r0_out,
              o = i.r1_out,
              l = i.r2_out,
              n = i.r3_out;
            return {
              date: lt.sd(i.date),
              super: r - h,
              big: a - o,
              mid: s - l,
              small: e - n,
              bar: r + a - h - o
            };
          }
        }
      });
    var e;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), t.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          case 167:
          case 168:
          case 169:
            r = this.urlData.week;
            break;
          case 719:
          case 720:
          case 721:
            r = this.urlData.month;
            break;
          default:
            r = [
              {
                bar: 0,
                big: 0,
                mid: 0,
                small: 0,
                super: 0,
                date: i[i.length - 1].date
              }
            ];
        }
        e = t.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++) {
          a = e[s];
          var o = {
            bar: a ? Number(a.bar) : 0 / 0,
            super: a ? Number(a["super"]) : 0 / 0,
            big: a ? Number(a.big) : 0 / 0,
            mid: a ? Number(a.mid) : 0 / 0,
            small: a ? Number(a.small) : 0 / 0
          };
          this.selfArr.push(o);
        }
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE,
            o = {};
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var l in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(l) &&
                ("bar" === l
                  ? (s[l] = this.selfArr[a][l])
                  : (!o[l] && (o[l] = 0),
                    (o[l] += this.selfArr[a][l]),
                    (s[l] = o[l])),
                s[l] > h && (h = s[l]),
                s[l] < e && (e = s[l]));
          }
          e == h
            ? (e = h = 0)
            : ((h = Math.max(Math.abs(h), Math.abs(e))), (e = -h)),
            (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = h),
            (this.labelMinP = e);
          var n = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var c = this.customArr.length; c--; ) {
              var d = this.customArr[c].prop;
              s[d + "y"] = 0 == n ? this.h >> 1 : (this.h * (h - s[d])) / n;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l,
              n = this.datas.length,
              c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum),
              d = "hollow" == i.datas.candle,
              f = 0.6 * c,
              u = 0.5 * this.h,
              p = 0;
            2 > p;
            p++
          ) {
            for (
              l = 0 == p ? i.COLOR.K_FALL : i.COLOR.K_RISE,
                e = this.__iOffsetX - c,
                a.beginPath(),
                s = 0;
              n > s;
              s++
            )
              (o = this.datas[s]),
                (h = o.bary),
                0 == p
                  ? h > u &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_FALL, !0)
                  : u >= h &&
                    a.drawVStickRect(e, h, f, u - h, i.COLOR.K_RISE, !d),
                (e += c);
            a.stroke();
          }
          for (var v = this.customArr.length; v--; )
            if ("bar" !== this.customArr[v].prop) {
              for (
                e = this.__iOffsetX - 0.4 * c,
                  a.newStyle(this.customArr[v].color, !0),
                  s = 0;
                n > s;
                s++
              ) {
                o = this.datas[s];
                var A = o[this.customArr[v].prop + "y"];
                a.lineTo(e, A), (e += c);
              }
              a.stroke();
            }
          a.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }
  function O(i, a, s) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#FE6C6A",
        prop: "buy",
        idct: "\u4e70\u5165",
        desc: "\u4e70\u5165"
      },
      {
        v: 0 / 0,
        color: "#23B47B",
        prop: "sell",
        idct: "\u5356\u51fa",
        desc: "\u5356\u51fa"
      },
      {
        v: 0 / 0,
        color: "#888887",
        prop: "total",
        idct: "\u4eca\u65e5\u4ea4\u6613\u603b\u8ba1",
        desc: "\u4eca\u65e5\u4ea4\u6613\u603b\u8ba1"
      }
    ]),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "KGSTRADE"),
      (this.alias = "\u9ad8\u624b\u4ea4\u6613"),
      (this.vaObj = { glv: 0 }),
      (this.selfDataUrl =
        "http://touzi.sina.com.cn/api/openapi.php/TzyGraphService.getGaoShouTradeDetailKx?symbol=$symbol&callback=$cb"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.df = function(t) {
        if (t && t.result && t.result.data) {
          for (
            var i, r = [], a = t.result.data, s = 0, e = a.length;
            e > s;
            s++
          )
            (i = a[s]),
              r.push({
                date: lt.sd(i.dt),
                buy: i.buy,
                sell: i.sell,
                total: i.buy + i.sell
              });
          return r;
        }
      });
    var e;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), t.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          case 167:
          case 168:
          case 169:
            r = this.urlData.week;
            break;
          case 719:
          case 720:
          case 721:
            r = this.urlData.month;
            break;
          default:
            r = [{ buy: 0, sell: 0, date: i[i.length - 1].date }];
        }
        e = t.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++)
          (a = e[s]),
            this.selfArr.push({
              total: a ? Number(a.total) : 0 / 0,
              buy: a ? Number(a.buy) : 0 / 0,
              sell: a ? Number(a.sell) : 0 / 0
            });
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                "total" !== o &&
                  (s[o] > h && (h = s[o]), s[o] < e && (e = s[o])));
          }
          e == h
            ? (e = h = 0)
            : ((h = Math.max(Math.abs(h), Math.abs(e))), (e = -h)),
            (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = h),
            (this.labelMinP = e);
          var l = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var n = this.customArr.length; n--; ) {
              var c = this.customArr[n].prop;
              s[c + "y"] = 0 == l ? this.h >> 1 : (this.h * (h - s[c])) / l;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line,
            s = a.getG();
          a.clear(!0, i.PARAM.getHd());
          for (
            var e,
              h,
              o,
              l,
              n,
              c,
              d = this.datas.length,
              f = i.DIMENSION.w_k / Math.max(d, i.PARAM.minCandleNum),
              u = "hollow" == i.datas.candle,
              p = 0.3 * f,
              v = 0.5 * this.h,
              A = 0;
            2 > A;
            A++
          ) {
            for (
              c = this.customArr[A].color,
                h = this.__iOffsetX - 0.96 * f,
                s.textAlign = "center",
                a.beginPath(),
                e = 0;
              d > e;
              e++
            )
              (n = this.datas[e]),
                0 == A
                  ? (n.buy &&
                      ((o = n.buyy),
                      a.drawVStickRect(h, o, p, v - o, c, !u),
                      s.fillText(n.buy, h + 0.3 * f, v + 12)),
                    (h += f))
                  : ((h += 0.47 * f),
                    n.sell &&
                      ((l = n.selly),
                      a.drawVStickRect(h, v, p, v - l, c, !0),
                      s.fillText(n.sell, h + 0.3 * f, v - 2)),
                    (h += 0.53 * f));
            a.stroke();
          }
          a.beginPath(),
            a.newStyle(["#BFBFBF"]),
            a.moveTo(this.__iOffsetX - f, 0.5 * this.h),
            a.lineTo(h, 0.5 * this.h),
            a.stroke(),
            a.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }
  function S(i, a, s) {
    (this.DEFAULT_ARR = [
      { v: 0 / 0, color: "#7d8087", prop: "bar", idct: "IDT", desc: "IDT" },
      {
        v: 0 / 0,
        color: "#7d8087",
        prop: "dot",
        idct: "SUNSPOT",
        desc: "SUNSPOT"
      }
    ]),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "SUNSPOT"),
      (this.alias = "SPT"),
      (this.vaObj = { glv: 0 }),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/touzi/sunstockskx/$symbol.js"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
          var r = this,
            a = this.symbol,
            s = "tzy_sunstock_kx_" + a,
            e = this.selfDataUrl.replace("$symbol", a);
          this.proxyCfg.usrObj.ssl && (e = t.getSUrl(e)),
            t.load(e, function() {
              var t = window[s];
              r.urlData || (r.urlData = { day: [] });
              var i = r.df(t),
                a = r.urlData.day;
              a.splice.apply(a, [0, 0].concat(i)),
                a.sort(function(t, i) {
                  return t.date - i.date;
                }),
                (r.toReCalc = !0),
                r.cb(r);
            });
        }
      }),
      (this.df = function(t) {
        if (t) {
          for (var i, r = [], a = t, s = 0, e = a.length; e > s; s++)
            (i = a[s]),
              r.push({ date: lt.sd(i.date), bar: i.std_pchg, dot: i.value });
          return r;
        }
      });
    var e;
    (this.initAndCalcAll = function(i) {
      if (((this.oriArr = i), this.urlData)) {
        !this.datas && (this.datas = []), t.ca(this.selfArr);
        var r;
        switch (this.viewState.viewId) {
          case 364:
          case 365:
          case 366:
          case 23:
          case 24:
          case 25:
            r = this.urlData.day;
            break;
          default:
            r = [{ bar: 0, dot: 0, date: i[i.length - 1].date }];
        }
        e = t.kUtil.adbd(r, i, !1, !0);
        for (var a, s = 0, h = i.length; h > s; s++)
          (a = e[s]),
            this.selfArr.push({
              bar: a ? Number(a.bar) : 0 / 0,
              dot: a ? Number(a.dot) : 0 / 0
            });
      }
    }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = 0,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]),
              (s.date = this.oriArr[a].date),
              (s.percent = this.oriArr[a].percent);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                "bar" === o && s[o] > h && (h = s[o]));
          }
          var l = 18;
          (this.vaObj.min = e),
            (this.vaObj.max = h),
            (this.labelMaxP = (h * this.h) / (this.h - l)),
            (this.labelMinP = e);
          var n = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var c = this.customArr.length; c--; ) {
              var d = this.customArr[c].prop;
              s[d + "y"] =
                0 == n ? this.h : ((this.h - l) * (h - s[d])) / n + l;
            }
          }
          this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l,
              n = this.datas.length,
              c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum),
              d = "hollow" == i.datas.candle,
              f = ["#FF6655", "#8cdaff"],
              u = 0.2 * c,
              p = this.h,
              v = 0;
            3 > v;
            v++
          )
            for (
              l = f[v],
                e = this.__iOffsetX - c,
                2 == v && a.newFillStyle([this.customArr[1].color]),
                a.beginPath(),
                s = 0;
              n > s;
              s++
            )
              if (((o = this.datas[s]), 2 > v))
                o.bar &&
                  ((h = o.bary),
                  0 == v && o.percent >= 0
                    ? a.drawVStickRect(e + 0.38 * c, h, u, p - h, l, !d)
                    : 1 == v &&
                      o.percent < 0 &&
                      a.drawVStickRect(e + 0.38 * c, h, u, p - h, l, !d)),
                  (e += c);
              else if (2 == v) {
                if (o.dot) {
                  var A = o.dot;
                  (h = o.bary),
                    a.arc(e + 0.58 * c, h - A - 6, 2 * A, 0, 2 * Math.PI),
                    a.fill(),
                    a.closePath();
                }
                e += c;
              }
          a.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }
  function T(i, a) {
    (this.DEFAULT_ARR = [
      {
        v: 0 / 0,
        color: "#007cc8",
        prop: "lb",
        idct: "LB",
        desc: "\u91cf\u6bd4"
      }
    ]),
      r.call(this, i, a),
      (this.name = "LB"),
      (this.sname = "T_LB"),
      (this.alias = "\u91cf\u6bd4"),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = this.gdsd(i)),
          !this.datas && (this.datas = []),
          t.ca(this.selfArr);
        for (var r, a, s = 0, e = i.length, h = 0; e > s; s++) {
          (a = 5e4),
            (r = 0),
            !isNaN(i[s][0].lastfive) &&
              i[s][0].lastfive > 0 &&
              (a = i[s][0].lastfive);
          for (var o = 0, l = 0; o < this.disMod; o++) {
            var n = Number(i[s][o].volume) < 0 ? 0 : Number(i[s][o].volume);
            (r += n),
              0 >= n
                ? ((h = 0 == o ? 0 : this.selfArr[this.selfArr.length - 1].lb),
                  l++)
                : (h =
                    o == this.disMod - 1
                      ? r / a / (o - l)
                      : r / a / (o - l + 1)),
              0 > h && (h = 0),
              this.selfArr.push({ ignore_price: i[s][o].price, lb: h });
          }
        }
      }),
      (this.draw = function(t) {
        if (this.datas) {
          this.line.clear(!0, this.cfg.PARAM.getHd());
          for (
            var i,
              r = this.datas.length,
              a = this.cfg.DIMENSION.w_t / r,
              s = this.customArr.length;
            s--;

          ) {
            var e = this.customArr[s].prop + "y";
            (i = a * gt), this.line.newStyle(this.customArr[s].color, !0, 1.3);
            for (var h = 0; r > h && !(this.datas[h].ignore_price < 0); h++)
              0 == h || h % this.disMod == 0
                ? this.line.moveTo(i, this.datas[h][e])
                : this.line.lineTo(i, this.datas[h][e]),
                (i += a);
            this.line.stroke();
          }
          t && this.line.drawBg();
        }
      });
  }
  function N(i, a) {
    r.call(this, i, a);
    var s = this;
    (this.name = "MA"), "k" != a.type && (this.sname = "T_" + this.name);
    var e = ["#FC9CB8", "#12BDD9", "#EE2F72", "#8CBB0D", "#0DC168", "#978d52"],
      h = "MA",
      o = "ma";
    (this.generateSettings = function() {
      if (s.param && s.param.length > 0) {
        s.customArr = [];
        for (var i = 0, r = s.param.length; r > i; i++) {
          var a = s.param[i].v;
          !isNaN(a) &&
            a > 0 &&
            s.customArr.push({
              v: a,
              color: s.param[i].color || e[i] || "#" + t.randomColor(),
              prop: o + a,
              idct: h + a,
              desc: h
            });
        }
      }
      (!s.customArr || s.customArr.length < 1) &&
        (s.customArr = [
          { v: 5, color: e[0], prop: o + "5", idct: h + "5", desc: h },
          { v: 10, color: e[1], prop: o + "10", idct: h + "10", desc: h },
          { v: 20, color: e[2], prop: o + "20", idct: h + "20", desc: h },
          { v: 30, color: e[3], prop: o + "30", idct: h + "30", desc: h }
        ]);
    }),
      (this.initAndCalcAll = function(i) {
        var r = this.gdsd(i);
        (this.oriArr = r),
          this.datas ? t.ca(this.datas) : (this.datas = []),
          t.ca(this.selfArr);
        for (
          var a = this.tkProp.close,
            s = r.length,
            e = 0,
            h = this.customArr.length;
          h > e;
          e++
        )
          for (
            var l, n = 0, c = Math.floor(this.customArr[e].v), d = 0;
            s > d;
            d++
          ) {
            var f = r[d];
            if (((n += Number(f[a])), d >= c - 1)) {
              l = n / c;
              var u = r[d - c + 1];
              n -= Number(u[a]);
            } else l = n / (d + 1);
            var p = (this.selfArr[d] = this.selfArr[d] || {});
            r[d].volume < 0 ? (p[At] = !0) : (p[o + c] = l);
          }
      });
  }
  function MACD(i, a) {
    (this.DEFAULT_ARR = [
      { v: 12, color: "#5465ff", prop: "dif", idct: "DIF" },
      { v: 26, color: "#ec52f5", prop: "dea", idct: "DEA" },
      { v: 9, color: "#b03030", prop: "bar", idct: "MACD" }
    ]),
      r.call(this, i, a),
      (this.name = "MACD"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = "#b82c0c",
      e = "#2ec196",
      h = bt.calcEMA,
      o = bt.operateArr,
      l = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        s = this.customArr[1].v,
        e = this.customArr[2].v,
        n = l(r, this.tkProp.close),
        c = o(h(n, a), h(n, s), "-"),
        d = h(c, e),
        f = o(o(c, d, "-"), 2, "*");
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var u = 0, p = r.length; p > u; u++)
        (this.selfArr[u] = { dif: c[u], dea: d[u], bar: f[u] }),
          (this.selfArr[u][At] = r[u].volume < 0);
    };
    this.draw = function(t, r) {
      if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
        var h = this.line;
        h.clear(!0, i.PARAM.getHd());
        var w_k, candleNum;
        "k" == a.type
          ? ((w_k = i.DIMENSION.w_k), (candleNum = i.PARAM.minCandleNum))
          : ((w_k = i.DIMENSION.w_t), (candleNum = 1));

        let d = this.datas.length;
        let perWidth = w_k / Math.max(d, candleNum);
        window.perWidth = perWidth;
        for (
          var n,
            xPos,
            u = "k" == a.type ? this.__iOffsetX - perWidth * mt : perWidth * gt,
            p = 0;
          2 > p;
          p++
        ) {
          var v = this.customArr[p].prop + "y";
          for (
            xPos = u,
              this.line.newStyle(this.customArr[p].color, !0, 1.3),
              n = 0;
            d > n;
            n++
          )
            0 == n
              ? this.line.moveTo(xPos, this.datas[n][v])
              : this.line.lineTo(xPos, this.datas[n][v]),
              (xPos += perWidth);
          this.line.stroke();
        }

        {
          let isDrag = false;
          let tIndex;
          if (window.chooseDate) {
            tIndex = this.datas.filter(
              e => e.date < new Date(window.chooseDate)
            ).length;
          } else {
            tIndex = this.datas.length - 1;
          }

          if (!this.chooseDateEl) {
            var el = document.createElement("div");
            this.wrap.appendChild(el);
            this.chooseDateEl = el;
            el.style.cssText = `position: absolute;
            left: ${45 + tIndex * perWidth}px;
            top: 0;
            bottom: 0;
            right: 0;
            background:rgba(0,0,0,0.1);
            `;
            let dtext = document.createElement("span");
            el.appendChild(dtext);

            this.dtext = dtext;

            var el2 = document.createElement("div");
            el2.style.cssText = `position: absolute;left: ${45 +
              tIndex * perWidth}px;
            top: 0;
            bottom: 0;
            width:3px;
            background:rgba(0,0,0,0.2);
            z-index:1000;
            cursor:col-resize;`;
            this.wrap.appendChild(el2);
            this.chooseDateEl2 = el2;
            let setChooseDate = () => {
              let date = (d =>
                `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)(
                this.datas[tIndex].date
              );
              window.chooseDate = date;
              dtext.innerText = date;
              let nlink =
                window.location.href.replace(/#chooseDate=.*/, "") +
                "#chooseDate=" +
                date;
              window.showChooseDate && (location = nlink);
              window.dispatchEvent(new Event("resize"));
            };
            setChooseDate();

            function drag() {
              el2.onmousedown = function(e) {
                //鼠标按下，计算当前元素距离可视区的距离
                let disX = e.clientX - el2.offsetLeft;
                let disY = e.clientY - el2.offsetTop;
                let l;
                isDrag = true;
                document.onmousemove = function(e) {
                  //通过事件委托，计算移动的距离
                  l = e.clientX - disX;
                  let t = e.clientY - disY;
                  //移动当前元素
                  if (l <= 45) l = 45;
                  el2.style.left = el.style.left = l + "px";
                };
                document.onmouseup = function(e) {
                  document.onmousemove = null;
                  document.onmouseup = null;

                  tIndex = Math.floor((l - 45) / window.perWidth);
                  setChooseDate();
                  isDrag = false;
                };
                return false;
              };
            }
            drag();
          }
          if (!isDrag) {
            this.chooseDateEl2.style.left = this.chooseDateEl.style.left = `${45 +
              tIndex * perWidth}px`;
          }
          this.chooseDateEl.style.display = this.chooseDateEl2.style.display =
            window.showChooseDate && !window.cutChooseDate ? "" : "none";
        }

        var A,
          m = (this.labelMaxP / (this.labelMaxP - this.labelMinP)) * this.h;
        xPos = u;
        var g,
          b = 1;
        for (h.newStyle(s, !0, b), n = 0; d > n; n++)
          (A = this.datas[n].bary),
            m >= A &&
              ((g = ~~(xPos + 0.5)),
              (g -= 0.5),
              h.moveTo(g, m),
              h.lineTo(g, A)),
            (xPos += perWidth);
        for (h.stroke(), xPos = u, h.newStyle(e, !0, b), n = 0; d > n; n++)
          (A = this.datas[n].bary),
            A > m &&
              ((g = ~~(xPos + 0.5)),
              (g -= 0.5),
              h.moveTo(g, m),
              h.lineTo(g, A)),
            (xPos += perWidth);
        h.stroke();
        var y = this.h / 2 - 0.5;
        h.newStyle(this.cfg.COLOR.GRID, !0, 1),
          h.moveTo(0, y),
          h.lineTo(this.cfg.DIMENSION.w_k, y),
          h.stroke(),
          h.drawBg(this.__iOffsetX);
      }
    };
  }
  function C(i, a) {
    this.DEFAULT_ARR = [
      { v: 30, color: "#99cf17", prop: "obv", idct: "OBV" },
      { v: 0 / 0, color: "#00c1eb", prop: "obvma", idct: "OBVMA" }
    ];
    var s = { nu: !0 };
    r.call(this, i, a, s),
      (this.name = "OBV"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
        var r,
          a,
          s,
          e = this.customArr[0].v,
          h = i[0];
        (s =
          isNaN(h.prevclose) || h.close > h.prevclose ? h.volume : -h.volume),
          (r = h.close == h.prevclose ? 0 : s),
          (a = r),
          this.selfArr.push({ obv: r, obvma: r });
        for (var o = 1, l = i.length; l > o; o++) {
          h = i[o];
          var n = {};
          this.selfArr.push(n),
            (s =
              h.close > i[o - 1].close
                ? Number(h.volume)
                : h.close == i[o - 1].close
                ? 0
                : -Number(h.volume)),
            (r = s + this.selfArr[o - 1].obv),
            (n.obv = r),
            (a += r),
            o >= e
              ? ((a -= this.selfArr[o - e].obv), (n.obvma = a / e))
              : (n.obvma = a / (o + 1));
        }
      });
  }
  function R(t, i, r) {
    D.call(this, t, i, { nu: !0 }),
      (this.selfDataUrl =
        "https://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getAllMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to"),
      (this.selfDataUrlUpdate =
        "http://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getLastMoneyFlow?callback=$cb&symbol=$symbol"),
      (this.cb = r),
      this.loadUrlData();
  }
  function k(i, a) {
    (this.DEFAULT_ARR = [
      { v: 0 / 0, color: "#12BDD9", prop: "iy", idct: "Position" }
    ]),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "POSITION"),
      (this.sname = "T_POSITION"),
      (this.alias = "\u6301\u4ed3\u91cf"),
      (this.initAndCalcAll = function(i) {
        var r = this.gdsd(i);
        (this.oriArr = r), !this.datas && (this.datas = []), t.ca(this.selfArr);
        for (var a = 0, s = r.length; s > a; a++) {
          var e = r[a].inventory || r[a].holdPosition;
          this.selfArr.push({ iy: 0 > e ? 0 / 0 : e });
        }
      });
  }
  function P(t, i, a) {
    (this.DEFAULT_ARR = [
      { v: 0 / 0, color: "#ff0099", prop: "ss", idct: "\u51c0\u5c0f\u5355" }
    ]),
      r.call(this, t, i);
    var s = this;
    (this.name = "Press"),
      (this.separate = 1),
      (this.cb = a),
      (this.initAndCalcAll = function(t, i) {
        i ||
          ((this.oriArr = t), this.urlData && !this.datas && (this.datas = []));
      }),
      (this.setRange = function() {
        if (l && this.datas) {
          for (; this.datas.length > 3; ) this.datas.length--;
          for (; this.datas.length < 3; ) this.datas.push({});
          var t,
            i,
            r = this.oriArr[this.oriArr.length - 1].close;
          for (t = l.length; t-- && ((i = l[t]), !(i.p >= r)); );
          i.p == r
            ? (console.log(l[t - 1].p, l[t - 1].v),
              console.log(r, i.v),
              console.log(l[t + 1].p, l[t + 1].v))
            : (console.log(l[t].p, l[t].v),
              console.log(r, i.v),
              console.log(l[t + 1].p, l[t + 1].v)),
            console.log("-----------------------");
          for (var a = 0; 3 > a; a++)
            (this.datas[a].v = l[t - a - 1].v),
              (this.datas[a].p = l[t - a - 1].p);
          console.log(this.datas);
        }
      }),
      (this.draw = function() {
        if (this.datas) {
          var i = this.line;
          i.clear(!0, t.PARAM.getHd());
          for (
            var r,
              a,
              s,
              e,
              h = this.datas.length,
              o = t.DIMENSION.w_k / Math.max(h, t.PARAM.minCandleNum),
              l = (this.labelMaxP / (this.labelMaxP - this.labelMinP)) * this.h,
              n = [],
              c = [],
              d = this.customArr.length;
            d--;

          ) {
            var f = this.customArr[d].prop + "y";
            (e = o * gt), i.newStyle(this.customArr[d].color, !0, e);
            for (var u = 0; h > u; u++)
              (s = this.datas[u][f]),
                (r = s > l ? c[u] || 0 : n[u] || 0),
                (a = l - r),
                (s -= r),
                i.moveTo(e, a),
                i.lineTo(e, s),
                s > l
                  ? ((n[u] = n[u] || 0), (c[u] = l - s))
                  : ((n[u] = l - s), (c[u] = c[u] || 0)),
                (e += o);
            i.stroke();
          }
        }
      });
    var e,
      h = "ff.sinajs.cn",
      o = { ssl: !0, authtype: "A_hq" },
      l = [],
      n = function(t) {
        var i,
          r,
          a = t["2cn_" + s.symbol].split(","),
          e = 65;
        for (i = 0; 10 > i; i++)
          (r = l[i] || {}), (l[i] = r), (r.v = a[e - i]), (r.p = a[e - i - 10]);
        for (e = 26, i = 10; 20 > i; i++)
          (r = l[i] || {}), (l[i] = r), (r.v = a[e + i]), (r.p = a[e + i - 10]);
      };
    (this.loadUrlData = function() {
      if (IO.WebPush4 && this.symbol && !e) {
        var t = ["2cn", this.symbol].join("_");
        e = new IO.WebPush4(h, t, n, o);
      }
    }),
      this.loadUrlData();
  }
  function x(i, a) {
    (this.DEFAULT_ARR = [
      { v: 12, color: "#EE2F72", prop: "psy", idct: "PSY" },
      { v: 6, color: "#00c1eb", prop: "psyma", idct: "PSYMA" }
    ]),
      r.call(this, i, a),
      (this.name = "PSY"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = { min: 0, max: 100, upper: 75, lower: 25 }),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
        var r = this.customArr[0].v,
          a = this.customArr[1].v,
          s = i[0],
          e = isNaN(s.prevclose) || s.prevclose < s.close ? 1 : 0,
          h = e,
          o = (e / r) * 100,
          l = o;
        this.selfArr.push({ psy: o, psyma: o });
        for (var n = [e], c = 1, d = i.length; d > c; c++) {
          s = i[c];
          var f = {};
          this.selfArr.push(f),
            (e = s.close > i[c - 1].close ? 1 : 0),
            n.push(e),
            (h += e),
            c >= r && (h -= n[c - r]),
            (o = (h / r) * 100),
            (f.psy = o),
            (l += o),
            c >= a
              ? ((l -= this.selfArr[c - a].psy), (f.psyma = l / a))
              : (f.psyma = l / (c + 1));
        }
      });
  }
  function E(i, a, s) {
    var e = "rgl";
    (this.DEFAULT_ARR = [
      { color: "#2D0674", prop: e, idct: "\u7ea2\u7eff\u89d2\u7ebf" }
    ]),
      r.call(this, i, a),
      (this.name = "RGL"),
      (this.sname = "T_RGL"),
      (this.alias = "\u7ea2\u7eff\u89d2\u7ebf"),
      (this.separate = 1);
    var h = "icn_calc_",
      o = this;
    (this.selfDataUrl =
      "http://finance.sina.com.cn/finance/touziline/$symbol.js?" +
      Math.random()),
      (this.selfDataUrlUpdate =
        "http://" +
        dt +
        ".sinajs.cn/etag.php?_=" +
        new Date().getTime() +
        "&list=" +
        h +
        "$symbol"),
      (this.cb = s),
      (this.df = function(t) {
        var i = [];
        if (t)
          for (var r in t)
            t.hasOwnProperty(r) && i.push({ rgl: Number(t[r]), time: r });
        return i;
      });
    var l,
      n = !1;
    (this.loadUrlData = function() {
      var i = this.aliasymbol || this.symbol,
        r = "_touziredgreenline_" + i,
        s = this.selfDataUrl
          .replace("$symbol", i)
          .replace("$cb", "var%20" + r + "=")
          .replace("$rn", String(new Date().getDate()));
      this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
        n ||
          ((l = t.tUtil.gata(a.usrObj.market)),
          t.load(s, function() {
            var t = window[r];
            o.urlData = { time: [] };
            var i = o.df(t),
              a = o.urlData.time;
            a.splice.apply(a, [0, 0].concat(i)), (n = !0), o.update();
          }));
    }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r &&
              r.length > 1 &&
              (i = [{ time: r[6].substring(0, 5), rgl: r[3] - r[4] }]),
            i
          );
        }
      }),
      (this.update = function() {
        var i = this.symbol,
          r = "hq_str_" + h + i,
          a = this.selfDataUrlUpdate.replace("$symbol", i);
        this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
          t.load(a, function() {
            var t = window[r];
            window[r] = null;
            var i = o.udf(t);
            i && o.urlData && o.urlData.time && o.updateData(i, o.urlData.time);
          });
      }),
      (this.updateData = function(i, r) {
        if (i && r && !(r.length < 1)) {
          var s = r[r.length - 1];
          if ((i = i[0])) {
            if (s.time < i.time)
              for (
                var e = t.arrIndexOf(l, i.time),
                  h = t.arrIndexOf(l, s.time),
                  n = h;
                e >= n;
                n++
              )
                e - n > 0
                  ? ((r[r.length] = r[r.length - 1]),
                    console.log(e, n, a.stock.realLen))
                  : (r[r.length - 1] = i);
            else r[r.length - 1].rgl += i.rgl;
            o.cb(o),
              4 == o.viewState.start && 5 == o.viewState.end && a.cbInDC(),
              this.syncI();
          }
        }
      }),
      (this.initAndCalcAll = function(i) {
        if (this.urlData) {
          (this.oriArr = this.gdsd(i)),
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
          var r,
            s = this.urlData.time,
            e = a.stock.realLen;
          for (0 > e && (e = o.disMod), r = 0; r < o.disMod && !(r > e); r++)
            s[r] && (i[4][r].rgl = s[r].rgl);
          for (var h, l = 0, n = this.oriArr.length; n > l; l++)
            (h = this.oriArr[l]),
              this.selfArr.push({ rgl: h ? Number(h.rgl) : 1 });
        }
      }),
      (this.createPlayingData = function() {
        if (this.datas) {
          var t = this.h % 2 == 0 ? this.h : this.h + 1;
          (this.labelMaxP = Math.abs(
            Math.abs(this.labelMaxP) > Math.abs(this.labelMinP)
              ? this.labelMaxP
              : this.labelMinP
          )),
            (this.labelMinP = -this.labelMaxP);
          for (
            var i,
              r = this.labelMaxP - this.labelMinP,
              a = 0,
              s = this.datas.length;
            s > a;
            a++
          ) {
            i = this.datas[a];
            for (var e = this.customArr.length; e--; ) {
              var h = this.customArr[e].prop;
              i[h + "y"] = ((t / 2) * (this.labelMaxP - i[h])) / r;
            }
          }
        }
      }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          var r = this.datas.length,
            a = i.DIMENSION.w_t / r,
            s = i.DIMENSION.h_t,
            e = a * gt;
          s = s % 2 == 0 ? s : s + 1;
          for (var h, o, l, n, c = s / 2, d = 0; 2 > d; d++) {
            (n = 1 == d ? i.COLOR.T_FALL : i.COLOR.T_RISE),
              (h = 0),
              t.beginPath();
            for (var f = 0; r > f; f++)
              (l = this.datas[f]),
                (o = l.rgly + s / 4),
                0 == d
                  ? l.rgl > 0 && t.drawVStickC(h, o, e, c - o, n)
                  : l.rgl < 0 && t.drawVStickC(h, o, e, c - o, n),
                (h += a);
            t.stroke();
          }
          t.drawBg();
        }
      }),
      this.loadUrlData();
  }
  function L(i, a) {
    (this.DEFAULT_ARR = [
      { v: 12, color: "#F17147", prop: "roc", idct: "ROC" },
      { v: 6, color: "#406BEA", prop: "maroc", idct: "MAROC" }
    ]),
      r.call(this, i, a),
      (this.name = "ROC"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = { glv: 0 });
    var s = bt.calcMA,
      e = bt.calcREF,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        l = this.customArr[1].v,
        n = h(r, this.tkProp.close),
        c = o(o(o(n, e(n, a), "-"), 100, "*"), e(n, a), "/"),
        d = s(c, l);
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var f = 0, u = r.length; u > f; f++)
        (this.selfArr[f] = { roc: c[f], maroc: d[f] }),
          (this.selfArr[f][At] = r[f].volume < 0);
    };
  }
  function U(i, a) {
    (this.DEFAULT_ARR = [
      { v: 6, color: "#999999", prop: "rsi1", idct: "RSI1" },
      { v: 12, color: "#ffac03", prop: "rsi2", idct: "RSI2" },
      { v: 24, color: "#9A2574", prop: "rsi3", idct: "RSI3" }
    ]),
      r.call(this, i, a),
      (this.name = "RSI"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = { min: 0, max: 100, upper: 70, lower: 30 });
    var s = bt.calcREF,
      e = bt.calcMAX,
      h = bt.calcSMA,
      o = bt.calcABS,
      l = bt.operateArr,
      n = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        c = this.customArr[1].v,
        d = this.customArr[2].v,
        f = n(r, this.tkProp.close),
        u = s(f, 1),
        p = l(f, u, "-"),
        v = e(p, 0),
        A = o(p),
        m = l(l(h(v, a, 1), h(A, a, 1), "/"), 100, "*"),
        g = l(l(h(v, c, 1), h(A, c, 1), "/"), 100, "*"),
        b = l(l(h(v, d, 1), h(A, d, 1), "/"), 100, "*");
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var y = 0, w = r.length; w > y; y++)
        (this.selfArr[y] = { rsi1: m[y], rsi2: g[y], rsi3: b[y] }),
          (this.selfArr[y][At] = r[y].volume < 0);
    };
  }
  function F(i, a) {
    var s = "ignore_pct",
      e = "ignore_oripct";
    (this.DEFAULT_ARR = [
      {
        v: 4,
        color: "#777777",
        prop: "sar",
        idct: "SAR",
        desc: "\u5929\u6570"
      },
      { v: 2, color: "#b82c0c", desc: "\u53c2\u6570" },
      { v: 20, color: "#008040", desc: "\u53cd\u5411\u4e34\u754c" },
      { color: "#777777", idct: "SAR\u64cd\u4f5c\u6536\u76ca", prop: s },
      {
        color: "#777777",
        idct: "\u533a\u95f4\u80a1\u4ef7\u6536\u76ca",
        prop: e
      }
    ]),
      r.call(this, i, a),
      (this.name = "SAR");
    var h = bt.calcSAR;
    (this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = h(i, r[0].v, r[1].v, r[2].v);
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var s = 0, e = i.length; e > s; s++)
        this.selfArr[s] = { ignore_minmax: a.direction[s], sar: a.data[s] };
    }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = Number.MAX_VALUE,
              h = -Number.MAX_VALUE,
              o = 0,
              l = 0,
              n = this.selfArr[t].ignore_minmax,
              c = t;
            i > c;
            c++
          ) {
            var d = this.oriArr[c],
              f = this.selfArr[c].ignore_minmax,
              u = this.datas[c - t];
            (u.date = d.date),
              c != t
                ? f == n
                  ? 1 == f && (o = (1 + d.percent) * (1 + o) - 1)
                  : (o =
                      0 == f
                        ? ((d.close - this.oriArr[c - 1].close) /
                            this.oriArr[c - 1].close +
                            1) *
                            (1 + o) -
                          1
                        : ((d.close - d.close) / d.close + 1) * (1 + o) - 1)
                : 1 == f &&
                  (o = ((d.close - d.close) / d.close + 1) * (1 + o) - 1),
              (n = f),
              c != t && (l = (1 + d.percent) * (1 + l) - 1),
              (u[s] = 100 * o),
              (u[e] = 100 * l);
            for (var p in this.selfArr[c])
              if (this.selfArr[c].hasOwnProperty(p)) {
                if (((u[p] = this.selfArr[c][p]), 0 == p.indexOf(vt))) continue;
                u[p] > h && (h = u[p]), u[p] < a && (a = u[p]);
              }
          }
          (this.minPrice = a), (this.maxPrice = h), this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          var s = this.datas.length,
            e = i.DIMENSION.w_k / Math.max(s, i.PARAM.minCandleNum),
            h = Math.max(0.1 * e, 0.1);
          h > 2 && (h = 2);
          for (
            var o,
              l = this.__iOffsetX - e * mt,
              n = this.customArr[0].prop + "y",
              c = this.customArr,
              d = 0;
            2 > d;
            d++
          ) {
            (o = l),
              this.line.newStyle(0 == d ? c[2].color : c[1].color, !0, 2);
            for (var f = 0; s > f; f++)
              this.datas[f].ignore_minmax == d &&
                this.line.drawDot(o, this.datas[f][n], h, !0),
                (o += e);
            this.line.stroke();
          }
          t && a.drawBg(this.__iOffsetX);
        }
      });
  }
  function H(i, a, s) {
    function e(t, i, r) {
      if (typeof t.length < 1) return [];
      for (
        var a, s = n.gata(r), e = t, h = [], o = 0, l = 0, c = s.length;
        c > l;
        l++
      ) {
        (a = {}),
          (h[h.length] = a),
          (a.trade_time = s[l]),
          (a.trade_buy = a.trade_sell = a.trade_total = 0);
        for (var d = o, f = e.length; f > d; d++) {
          var u = e[d],
            p = u.time;
          if (p == s[l]) {
            (a.trade_buy = u.buy),
              (a.trade_sell = u.sell),
              (a.trade_total = u.total),
              e.splice(d, 1);
            break;
          }
          p > s[l] &&
            ((a.trade_buy = 0), (a.trade_sell = 0), (a.trade_total = 0));
        }
      }
      return (h[0].trade_index = c - 1), h;
    }
    var h = this;
    r.call(this, i, a, { nu: !0 }),
      (this.name = "TTopTrade"),
      (this.alias = "\u9ad8\u624b\u4ea4\u6613"),
      (this.selfDataUrlUpdate =
        "http://touzi.sina.com.cn/api/openapi.php/TzyGraphService.getGaoShouTradeDetail?callback=$cb&symbol=$symbol&$rn"),
      (this.selfDataUrl =
        "http://touzi.sina.com.cn/api/openapi.php/TzyGraphService.getGaoShouTradeDetailMore?callback=$cb&symbol=$symbol&$rn"),
      (this.cb = s);
    var o = [
        {
          v: 0 / 0,
          color: "#ff1111",
          prop: "trade_total",
          idct: "\u4eca\u65e5\u4ea4\u6613\u603b\u8ba1"
        },
        { v: 0 / 0, color: "#ff9f07", prop: "trade_buy", idct: "\u4e70\u5165" },
        { v: 0 / 0, color: "#00b5f8", prop: "trade_sell", idct: "\u5356\u51fa" }
      ],
      l = "top_trade_",
      n = t.tUtil;
    (this.generateSettings = function() {
      if (h.param && h.param.length > 0) {
        h.customArr = [];
        for (var i = 0, r = h.param.length; r > i; i++)
          h.customArr.push({
            vol: 0 / 0,
            color: h.param[i].color || o[i].color || "#" + t.randomColor(),
            prop: o[i].prop,
            idct: o[i].idct
          });
      }
      (!h.customArr || h.customArr.length < 1) && (h.customArr = o);
    }),
      (this.udf = function(t) {
        var i = [],
          r = [];
        if (t) {
          for (var s = t.result.data, h = s.length, o = 0; h > o; o++)
            i.push({
              total: Number(s[o].total),
              time: s[o].time,
              buy: Number(s[o].buy),
              sell: Number(s[o].sell),
              date: lt.sd(s[o].dt)
            });
          r = e(i, a.stock.hq.date, "CN", !0);
        }
        return r;
      });
    var c,
      d = !1;
    (this.loadUrlData = function() {
      if (a.stock.hq) {
        var i = this.aliasymbol || this.symbol,
          r = "_touziTopTrade_" + i,
          s = this.selfDataUrl
            .replace("$symbol", i)
            .replace("$cb", "var%20" + r + "=")
            .replace("$rn", String(new Date().getDate()));
        this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
          d ||
            ((c = t.tUtil.gata(a.usrObj.market)),
            t.load(s, function() {
              var t = window[r];
              h.urlData = { time: [] };
              var i = h.df(t),
                a = h.urlData.time;
              a.splice.apply(a, [0, 0].concat(i)), (d = !0), h.update();
            }));
      }
    }),
      (this.df = function(t) {
        var i = [],
          r = [];
        if (t)
          for (var s = t.result.data, h = s.length, o = 0; h > o; o++) {
            i[o] = [];
            for (var l = 0; l < s[o].length; l++)
              i[o].push({
                total: Number(s[o][l].total),
                time: s[o][l].time,
                buy: s[o][l].buy,
                sell: s[o][l].sell,
                date: lt.sd(s[o][l].dt)
              });
            var n;
            (n = a.stock ? a.stock.hq.date : s[h - 1][0].date),
              (r[o] = e(i[o], n, "CN"));
          }
        return r;
      }),
      (this.update = function() {
        var i = this.symbol,
          r = "hq_str_" + l + i,
          a = this.selfDataUrlUpdate
            .replace("$symbol", i)
            .replace("$cb", "var " + r + "=")
            .replace("$rn", String(new Date().getDate()));
        this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
          t.load(a, function() {
            var t = window[r];
            window[r] = null;
            var i = h.udf(t);
            i && h.urlData && h.urlData.time && h.updateData(i, h.urlData.time);
          });
      }),
      (this.updateData = function(t, i) {
        !t ||
          !i ||
          i.length < 1 ||
          ((t = t[0]),
          t &&
            (h.cb(h),
            4 == h.viewState.start && 5 == h.viewState.end,
            this.syncI()));
      }),
      (this.initAndCalcAll = function(i) {
        if (this.urlData) {
          (this.oriArr = this.gdsd(i)),
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
          var r,
            s,
            e,
            o,
            l = this.urlData.time,
            n = a.stock.realLen;
          for (0 > n && (n = h.disMod), r = 0; r < l.length; r++)
            for (s = 0; s < h.disMod; s++)
              l[r][s] &&
                ((i[r][s].trade_total = l[r][s].trade_total),
                (i[r][s].trade_buy = l[r][s].trade_buy),
                (i[r][s].trade_sell = l[r][s].trade_sell),
                (i[r][s].trade_time = l[r][s].trade_time));
          for (r = 0, o = this.oriArr.length; o > r; r++)
            (e = this.oriArr[r]),
              this.selfArr.push({
                trade_total: e.trade_total ? Number(e.trade_total) : 0,
                trade_buy: e.trade_buy ? Number(e.trade_buy) : 0,
                trade_sell: e.trade_sell ? Number(e.trade_sell) : 0,
                trade_time: e.trade_time ? e.trade_time : 0
              });
        }
      }),
      (this.draw = function(t) {
        if (((this.__iOffsetX = isNaN(t) ? this.__iOffsetX : t), this.datas)) {
          var r = this.line;
          r.clear(!0, i.PARAM.getHd());
          for (
            var a,
              s,
              e,
              h,
              o,
              l = this.datas.length,
              n = i.DIMENSION.w_t / l,
              c = 0,
              d = 0.6 * n,
              f = 0.5 * this.h,
              u = 0;
            2 > u;
            u++
          ) {
            switch (c) {
              case 0:
                o = i.COLOR.T_RISE;
                break;
              case 1:
                o = i.COLOR.T_FALL;
            }
            for (s = 0, r.beginPath(), a = 0; l > a; a++)
              (h = this.datas[a]),
                (e = h.trade_totaly),
                h.trade_total > 0 &&
                  (h.trade_buy > 0 && r.drawVStickC(s, e, d, f - e, o),
                  h.trade_sell > 0 && r.drawVStickC(s, e, d, f - e, o)),
                (s += n);
            r.stroke();
          }
          r.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }
  function X(i, a, s) {
    var e = this,
      h = 2e4;
    r.call(this, i, a, { nu: !0 }),
      (this.name = "TFLOW"),
      (this.sname = "T_TFLOW"),
      (this.alias = "\u51c0\u4e70\u5165"),
      (this.urls = {
        oned:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShuminline?random=$rn",
        onec:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2Adayminline?symbol=$symbol&___qn=3&random=$rn",
        c:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2A5dayminline?symbol=$symbol&random=$rn",
        d:
          "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShu5dayminline?random=$rn"
      });
    var o,
      l = !0;
    this.cb = s;
    var n = 0,
      c = [
        { v: 0 / 0, color: "#ff1111", prop: "mb", idct: "\u7279\u5927" },
        { v: 0 / 0, color: "#ff9f07", prop: "ms", idct: "\u5927" },
        { v: 0 / 0, color: "#00b5f8", prop: "sb", idct: "\u4e2d" },
        { v: 0 / 0, color: "#5b0497", prop: "ss", idct: "\u5c0f" }
      ],
      d = null;
    this.generateSettings = function() {
      for (var i in e.urls)
        e.urls.hasOwnProperty(i) && (e.urls[i] = t.getSUrl(e.urls[i]));
      if (e.param && e.param.length > 0) {
        e.customArr = [];
        for (var r = 0, a = e.param.length; a > r; r++)
          e.customArr.push({
            v: 0 / 0,
            color: e.param[r].color || c[r].color || "#" + t.randomColor(),
            prop: c[r].prop,
            idct: c[r].idct
          });
      }
      (!e.customArr || e.customArr.length < 1) && (e.customArr = c);
    };
    var f = function(t) {
      var i,
        r = String(t).split("|"),
        a = [];
      i = r.slice(1, r.length);
      for (var s = 0, e = {}, h = []; s < i.length; s++)
        (h = i[s].split(",")),
          (h[0] > "11:30" && h[0] < "13:00") ||
            ((e = {
              time: h[0],
              mb: Number(h[1]),
              ms: Number(h[2]),
              sb: Number(h[3]),
              ss: Number(h[4])
            }),
            a.push(e));
      return a;
    };
    (this.df = function(t) {
      for (
        var i, r = String(t).split("R"), a = [], s = 0, e = r.length, h = [];
        e > s;
        s++
      ) {
        i = String(r[s]).split("|");
        var o = [];
        h = i.slice(1, i.length);
        for (var l = 0, n = {}, c = []; l < h.length; l++)
          (c = h[l].split(",")),
            (c[0] > "11:30" && c[0] < "13:00") ||
              ((n = {
                time: c[0],
                mb: Number(c[1]),
                ms: Number(c[2]),
                sb: Number(c[3]),
                ss: Number(c[4])
              }),
              0 == l && (n.date = i.slice(0, 1)[0]),
              o.push(n));
        a.push(o);
      }
      return a;
    }),
      (this.loadUrlData = function(i) {
        if (i && a.stock.hq) {
          var r = e.symbol,
            s = "_" + r + lt.ddt(new Date()).getFullYear();
          (e.selfDataUrl = o
            ? a.stock.dp
              ? e.urls.oned
              : e.urls.onec
            : a.stock.dp
            ? e.urls.d
            : e.urls.c),
            a.stock.hq.isUpdateTime ||
              (clearInterval(this.updateId), (this.updateId = null)),
            t.load(
              e.selfDataUrl
                .replace("$symbol", r)
                .replace("$cb", "var%20" + s + "="),
              function() {
                var t = window[s];
                return t && t.__ERROR
                  ? ((e.urlData[4] = d), void (n = 1))
                  : void (
                      t &&
                      (o ? (e.urlData[4] = f(t)) : (e.urlData = e.df(t)),
                      (d = e.urlData[4]),
                      (e.toReCalc = !0),
                      e.cb(e),
                      (e.tFlowLen = e.urlData.length),
                      (o = !0))
                    );
              },
              function() {
                n = 1;
              }
            );
        }
      }),
      (this.initAndCalcAll = function(i) {
        if (
          (a.stock.hq && l && (e.loadUrlData(!0), (l = !1)),
          (this.oriArr = this.gdsd(i)),
          1 != n && this.urlData)
        ) {
          !this.datas && (this.datas = []), t.ca(this.selfArr);
          var r,
            s,
            h = i.length,
            o = [],
            c = this.urlData.length,
            d = 0;
          for (r = 0; h > r; r++)
            for (s = d; c > s; s++)
              i[r][0] &&
              i[r][0].date &&
              this.urlData[r][0] &&
              t.dateUtil.ds(i[r][0].date, "-") == this.urlData[r][0].date
                ? (d++, o.push(this.urlData[s]))
                : s >= c - 1 && o.push([]);
          for (r = 0; h > r; r++)
            for (
              var f, u, p = r >= h - 1 ? 1e-7 : 1e-6, v = 0;
              v < this.disMod;
              v++
            ) {
              (u = i[r][v]),
                this.urlData[r][v] && (f = this.urlData[r][v]),
                r >= h - 1 && v > a.stock.hq.index && (f = null);
              var A = {
                mb: this.urlData[r][v]
                  ? Number(this.urlData[r][v].mb)
                  : f
                  ? f.mb
                  : p,
                ms: this.urlData[r][v]
                  ? Number(this.urlData[r][v].ms)
                  : f
                  ? f.ms
                  : p,
                sb: this.urlData[r][v]
                  ? Number(this.urlData[r][v].sb)
                  : f
                  ? f.sb
                  : p,
                ss: this.urlData[r][v]
                  ? Number(this.urlData[r][v].ss)
                  : f
                  ? f.ss
                  : p
              };
              r == h - 1 &&
                v == this.disMod - 1 &&
                a.stock.hq.time > "15:00" &&
                (A = this.urlData[r][v - 1]),
                this.selfArr.push(A);
            }
        }
      }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start * this.disMod,
              i = this.viewState.end * this.disMod,
              r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          var a,
            s,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (a = t; i > a; a++) {
            (s = this.datas[a - t]), (s.date = this.oriArr[a].date);
            for (var o in this.selfArr[a])
              this.selfArr[a].hasOwnProperty(o) &&
                ((s[o] = this.selfArr[a][o]),
                s[o] > h && (h = s[o]),
                s[o] < e && (e = s[o]));
          }
          (this.labelMaxP = h), (this.labelMinP = e);
          var l = h - e;
          for (a = 0; r > a; a++) {
            s = this.datas[a];
            for (var n = this.customArr.length; n--; ) {
              var c = this.customArr[n].prop;
              s[c + "y"] = (this.h * (h - s[c])) / l;
            }
          }
        }
      }),
      (this.draw = function(t) {
        if (this.datas) {
          a.stock.hq &&
            a.stock.hq.isUpdateTime &&
            !this.updateId &&
            (this.updateId = setInterval(e.loadUrlData, h, !0)),
            this.line.clear(!0, this.cfg.PARAM.getHd());
          var i = 1.5;
          this.h > 90 ? (i = 1.4) : this.h < 50 && (i = 1.3);
          for (
            var r,
              s = this.datas.length,
              o = this.cfg.DIMENSION.w_t / s,
              l = this.customArr.length;
            l--;

          ) {
            var n = this.customArr[l].prop + "y";
            (r = o * gt), this.line.newStyle(this.customArr[l].color, !0, i);
            for (var c = 0; s > c; c++)
              1e-7 != this.datas[c][this.customArr[l].prop] &&
                (0 == c || c % this.disMod == 0
                  ? this.line.moveTo(r, this.datas[c][n])
                  : this.line.lineTo(r, this.datas[c][n]),
                (r += o));
            this.line.stroke();
          }
          t && this.line.drawBg();
        }
      }),
      (this.updateId = setInterval(e.loadUrlData, h, !0)),
      a.stock.hq || this.loadUrlData(!0);
  }
  function B(i, a) {
    (this.DEFAULT_ARR = [{ color: "#007cc8", prop: "tor", idct: "TOR" }]),
      r.call(this, i, a),
      (this.name = "TOR"),
      (this.alias = "\u6362\u624b\u7387");
    var s = !1,
      e = a.stock.extraDataObj.rsAmount;
    this.initAndCalcAll = function(i) {
      if (e) {
        (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
        for (var r, h, o = 0, l = i.length; l > o; o++) {
          r = i[o];
          for (var n = 0, c = e.length; c > n; n++)
            if (r.date >= e[n].date) {
              h = e[n].amount;
              break;
            }
          this.selfArr[o] = { tor: r.volume / h };
        }
      } else if (!s) {
        s = !0;
        var d = this;
        setTimeout(function() {
          (e = a.stock.extraDataObj.rsAmount), d.initAndCalcAll(i), (s = !1);
        }, 3e3);
      }
    };
  }
  function V(i, a) {
    (this.DEFAULT_ARR = [
      { v: 12, color: "#d6c84b", prop: "trix", idct: "TRIX" },
      { v: 9, color: "#26bcd5", prop: "matrix", idct: "MATRIX" }
    ]),
      r.call(this, i, a),
      (this.name = "TRIX"),
      "k" != a.type && (this.sname = "T_" + this.name);
    var s = bt.calcMA,
      e = bt.calcEMA,
      h = bt.getArr,
      o = bt.operateArr,
      l = bt.calcREF;
    this.initAndCalcAll = function(i) {
      var r = this.gdsd(i),
        a = this.customArr[0].v,
        n = this.customArr[1].v,
        c = h(r, this.tkProp.close),
        d = e(e(e(c, a), a), a),
        f = l(d, 1),
        u = o(o(o(d, f, "-"), f, "/"), 100, "*"),
        p = s(u, n);
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var v = 0, A = r.length; A > v; v++)
        (this.selfArr[v] = { trix: u[v], matrix: p[v] }),
          (this.selfArr[v][At] = r[v].volume < 0);
    };
  }
  function j(t, i, r) {
    X.call(this, t, i, { nu: !0 }),
      (this.urls = {
        oned:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getMinuteFlow?random=$rn",
        onec:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockMinuteFlow?symbol=$symbol&random=$rn",
        c:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockHistoryMinuteFlow?symbol=$symbol&random=$rn",
        d:
          "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getHistoryMinuteFlow?symbol=$symbol&random=$rn"
      }),
      (this.cb = r),
      i.stock.hq || this.loadUrlData(!0);
  }
  function $(i, a, s) {
    var e = "pct",
      h = "oripct";
    (this.DEFAULT_ARR = [
      {
        color: "#fa6d6d",
        prop: e,
        idct: "\u7ea2\u7ebf\uff08\u591a\u7a7a\u4fe1\u53f7\u6536\u76ca\uff09"
      },
      {
        color: "#2b55ff",
        prop: h,
        idct: "\u84dd\u7ebf\uff08\u80a1\u4ef7\u81ea\u7136\u6da8\u5e45\uff09"
      }
    ]),
      r.call(this, i, a),
      (this.name = "TZY"),
      (this.separate = 1),
      (this.selfDataUrl =
        "http://finance.sina.com.cn/finance/hq/$symbol.js?_=$rn");
    var o = "dkfz_";
    (this.selfDataUrlUpdate =
      "http://" +
      dt +
      ".sinajs.cn/etag.php?_=" +
      new Date().getTime() +
      "&list=" +
      o +
      "$symbol"),
      (this.cb = s),
      (this.toReCalc = !0),
      (this.loadedFlag = {}),
      (this.loadedFromTo = void 0),
      (this.df = function(t) {
        var i = [];
        if (t) {
          var r = t;
          for (var a in r)
            r.hasOwnProperty(a) && i.push({ flag: r[a], date: lt.sd(a) });
        }
        return i;
      }),
      (this.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
          var r = i[0],
            a = i[1],
            s = this,
            e = this.symbol,
            h = "_touzibullbear_" + e,
            o = this.selfDataUrl
              .replace("$symbol", e)
              .replace("$cb", "var%20" + h + "=")
              .replace("$from", r)
              .replace("$to", a)
              .replace("$rn", String(new Date().getDate()));
          this.proxyCfg.usrObj.ssl && (o = t.getSUrl(o)),
            t.load(o, function() {
              var t = window[h];
              s.urlData || (s.urlData = { day: [] });
              var i = s.df(t),
                r = s.urlData.day;
              r.splice.apply(r, [0, 0].concat(i)),
                r.sort(function(t, i) {
                  return t.date - i.date;
                }),
                (s.toReCalc = !0),
                s.cb(s);
            });
        }
      }),
      (this.udf = function(t) {
        if (t) {
          var i,
            r = t.split(",");
          return (
            r && r.length > 1 && (i = [{ date: lt.sd(r[0]), flag: r[1] }]), i
          );
        }
      });
    var l = !0;
    (this.UPDATE_THRESHOLD = 3),
      (this.update = function() {
        if (l) l = !1;
        else {
          if (++this.updateCount < this.UPDATE_THRESHOLD) return;
          this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
        }
        var i = this,
          r = this.symbol,
          a = "hq_str_" + o + r,
          s = this.selfDataUrlUpdate.replace("$symbol", r);
        this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
          t.load(s, function() {
            var t = window[a],
              r = i.udf(t);
            r && i.doUpdate(r);
          });
      }),
      (this.updateData = function(t, i, r) {
        if (t && i && !(i.length < 1)) {
          var a = i[i.length - 1];
          if ((t = t[0]))
            if (lt.stbd(t.date, a.date))
              for (var s in t)
                t.hasOwnProperty(s) &&
                  ("undefined" != typeof a[s] && (a[s] = t[s]),
                  (a.isFake = !1));
            else t.date > a.date && this.newData(i, t, r);
        }
      }),
      (this.initAndCalcAll = function(i) {
        if (((this.oriArr = i), this.urlData && this.toReCalc)) {
          (this.toReCalc = !1),
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
          for (
            var r,
              a = this.urlData.day,
              s = t.kUtil.adbd(a, i, !1, !1),
              e = 0,
              h = i.length;
            h > e;
            e++
          )
            (r = s[e]),
              this.selfArr.push({
                flag: r ? Number(r.flag) : 1,
                isFake: r ? !!r.isFake : !0
              });
        }
      }),
      (this.setRange = function() {
        if (this.datas) {
          for (
            var t = this.viewState.start, i = this.viewState.end, r = i - t;
            this.datas.length > r;

          )
            this.datas.length--;
          for (; this.datas.length < r; ) this.datas.push({});
          for (
            var a = 0,
              s = 0,
              o = this.selfArr[t].flag,
              l = bt.calcA,
              n = bt.getArr,
              c = 10,
              d = t;
            i > d;
            d++
          ) {
            var f = this.datas[d - t];
            f.date = this.oriArr[d].date;
            var u = this.selfArr[d].flag,
              p = this.oriArr[d],
              v = l(
                n(
                  this.oriArr.slice(0 > d - c + 1 ? 0 : d - c + 1, d + 1),
                  "close",
                  function(t) {
                    return +t.toFixed(2);
                  }
                )
              ),
              A = p.close.toFixed(2),
              m = p.open.toFixed(2);
            if (d != t) {
              var g = this.oriArr[d - 1].close.toFixed(2);
              u == o
                ? 1 == u && (a = (1 + (A - g) / g) * (1 + a) - 1)
                : (a =
                    0 == u
                      ? v > m
                        ? ((m - g) / g + 1) * (1 + a) - 1
                        : ((v - g) / g + 1) * (1 + a) - 1
                      : m > v
                      ? ((A - m) / m + 1) * (1 + a) - 1
                      : ((A - v) / v + 1) * (1 + a) - 1);
            } else
              1 == u &&
                (a =
                  m > v
                    ? ((A - m) / m + 1) * (1 + a) - 1
                    : ((A - v) / v + 1) * (1 + a) - 1);
            (o = u),
              d != t && (s = (1 + p.percent) * (1 + s) - 1),
              (f[e] = 100 * a),
              (f[h] = 100 * s);
            for (var b in this.selfArr[d])
              this.selfArr[d].hasOwnProperty(b) && (f[b] = this.selfArr[d][b]);
          }
          this.syncI();
        }
      }),
      (this.draw = function(r, a) {
        function s(t, i, r) {
          for (
            var a = t.length, s = t[a - 1][i], e = a - 1, h = t.length;
            h--;

          ) {
            var o = t[h][i];
            r ? o > s && ((s = o), (e = h)) : s > o && ((s = o), (e = h));
          }
          return e;
        }
        function e(t, i, r, a, s) {
          t.moveTo(i, r + s),
            t.lineTo(i - a, r + Math.sqrt(3) * a + s),
            t.lineTo(i + a, r + Math.sqrt(3) * a + s),
            t.lineTo(i, r + s);
        }
        function h(t, i, r, a, s) {
          t.moveTo(i, r - s),
            t.lineTo(i - a, r - Math.sqrt(3) * a - s),
            t.lineTo(i + a, r - Math.sqrt(3) * a - s),
            t.lineTo(i, r - s);
        }
        if (((this.__iOffsetX = isNaN(a) ? this.__iOffsetX : a), this.datas)) {
          var o = this.line;
          o.clear(!0, i.PARAM.getHd());
          var l,
            n,
            c,
            d = this.viewState.start,
            f = this.viewState.end,
            u = t.hex2dec(this.customArr[0].color, 0.5),
            p = t.hex2dec(this.customArr[1].color, 0.5);
          (c = d), (n = this.datas[0].flag);
          for (var v = d; f > v; v++)
            if (this.datas[v - d].isFake && v != f - 1) c = v;
            else {
              if (((l = this.datas[v - d].flag), l != n)) {
                o.beginPath();
                var A = (this.oriArr[v].ix + this.oriArr[v - 1].ix) / 2,
                  m = (this.oriArr[v].cy + this.oriArr[v - 1].cy) / 2;
                if (c != d)
                  var g = (this.oriArr[c].ix + this.oriArr[c - 1].ix) / 2,
                    b = (this.oriArr[c].cy + this.oriArr[c - 1].cy) / 2;
                else (g = this.oriArr[c].ix), (b = this.oriArr[c].cy);
                if ((o.moveTo(A, m), o.lineTo(g, b), 1 == n)) {
                  var y = s(this.oriArr.slice(c, v), "high", !0) + c;
                  o.lineTo(this.oriArr[y].ix, this.oriArr[y].hy);
                  var w = this.oriArr[v].cy == this.oriArr[y].hy;
                  w ? o.newStyle([u]) : o.newFillStyle([u]);
                } else
                  (y = s(this.oriArr.slice(c, v), "low", !1) + c),
                    o.lineTo(this.oriArr[y].ix, this.oriArr[y].ly),
                    (w = this.oriArr[v].cy == this.oriArr[y].ly),
                    w ? o.newStyle([p]) : o.newFillStyle([p]);
                w ? o.stroke() : o.fill(), (c = v);
              }
              ((v == f - 1 && !this.datas[v - d].isFake) ||
                (v == f - 2 && this.datas[v - d + 1].isFake)) &&
                (o.beginPath(),
                (A = this.oriArr[v].ix),
                (m = this.oriArr[v].cy),
                l != n
                  ? ((g = (this.oriArr[v].ix + this.oriArr[v - 1].ix) / 2),
                    (b = (this.oriArr[v].cy + this.oriArr[v - 1].cy) / 2),
                    o.moveTo(A, m),
                    o.lineTo(g, b),
                    1 == l
                      ? (o.lineTo(this.oriArr[v].ix, this.oriArr[v].hy),
                        (w = this.oriArr[v].cy == this.oriArr[v].hy),
                        w ? o.newStyle([u]) : o.newFillStyle([u]))
                      : (o.lineTo(this.oriArr[v].ix, this.oriArr[v].ly),
                        (w = this.oriArr[v].cy == this.oriArr[v].ly),
                        w ? o.newStyle([p]) : o.newFillStyle([p])))
                  : (d == c
                      ? ((g = this.oriArr[c].ix), (b = this.oriArr[c].cy))
                      : ((g = (this.oriArr[c].ix + this.oriArr[c - 1].ix) / 2),
                        (b = (this.oriArr[c].cy + this.oriArr[c - 1].cy) / 2)),
                    o.moveTo(A, m),
                    o.lineTo(g, b),
                    1 == l
                      ? ((y = s(this.oriArr.slice(c, v + 1), "high", !0) + c),
                        o.lineTo(this.oriArr[y].ix, this.oriArr[y].hy),
                        (w = this.oriArr[v].cy == this.oriArr[y].hy),
                        w ? o.newStyle([u]) : o.newFillStyle([u]))
                      : ((y = s(this.oriArr.slice(c, v + 1), "low", !1) + c),
                        o.lineTo(this.oriArr[y].ix, this.oriArr[y].ly),
                        (w = this.oriArr[v].cy == this.oriArr[y].ly),
                        w ? o.newStyle([p]) : o.newFillStyle([p]))),
                w ? o.stroke() : o.fill()),
                (n = l);
            }
          var _ =
            i.DIMENSION.w_k / Math.max(this.datas.length, i.PARAM.minCandleNum);
          (_ = _ > 5 ? 5 : _), (_ = 2 > _ ? 2 : _);
          var D = 3,
            M = this.customArr[0].color,
            O = this.customArr[1].color;
          for (n = this.datas[0].flag, o.beginPath(), v = d; f > v; v++)
            (l = this.datas[v - d].flag),
              l != n &&
                1 == l &&
                e(o, this.oriArr[v].ix, this.oriArr[v].ly, _, D),
              (n = l);
          for (
            o.newFillStyle([M]),
              o.fill(),
              n = this.datas[0].flag,
              o.beginPath(),
              v = d;
            f > v;
            v++
          )
            (l = this.datas[v - d].flag),
              l != n &&
                0 == l &&
                h(o, this.oriArr[v].ix, this.oriArr[v].hy, _, D),
              (n = l);
          o.newFillStyle([O]), o.fill();
          var S = "\u8f6c\u591a\uff0c\u5efa\u8bae\u5173\u6ce8",
            T = "\u8f6c\u7a7a\uff0c\u98ce\u9669\u8f83\u9ad8",
            N = o.getG();
          N.font = i.STYLE.FONT_SIZE + "px " + i.STYLE.FONT_FAMILY;
          var I = N.measureText(S).width,
            C = 10 / Math.sqrt(3),
            R = 10,
            k = 5,
            P = C * k;
          N.beginPath(),
            (N.fillStyle = M),
            N.fillText(S, P, R),
            (P += I + C * (k - 2)),
            (N.fillStyle = O),
            N.fillText(T, P, R),
            (P = C * (k - 1.5)),
            o.beginPath(),
            o.newFillStyle([M]),
            e(o, P, 1, C, 0),
            o.fill(),
            (P += I + C * (k - 2)),
            o.beginPath(),
            o.newFillStyle([O]),
            h(o, P, R + 1, C, 0),
            o.fill(),
            r && o.drawBg(this.__iOffsetX);
        }
      }),
      this.loadUrlData();
  }
  function z(t, i, r) {
    $.call(this, t, i),
      (this.name = "TZYS"),
      (this.alias = "\u591a\u7a7a\u53cd\u8f6c"),
      (this.cb = r),
      (this.drawCalc = function() {
        if (this.datas) {
          this.setRange();
          var t,
            i,
            r,
            a,
            s = this.datas.length,
            e = Number.MAX_VALUE,
            h = -Number.MAX_VALUE;
          for (i = 0; s > i; i++)
            for (t = this.datas[i], r = this.customArr.length; r--; )
              (a = this.customArr[r].prop),
                a && (t[a] > h && (h = t[a]), t[a] < e && (e = t[a]));
          (this.labelMaxP = this.maxPrice = h),
            (this.labelMinP = this.minPrice = e);
          var o = h - e;
          for (i = 0; s > i; i++)
            for (t = this.datas[i], r = this.customArr.length; r--; )
              (a = this.customArr[r].prop),
                a && (t[a + "y"] = (this.h * (h - t[a])) / o);
        }
      }),
      (this.draw = function(t, i) {
        if (((this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i), this.datas)) {
          this.line.clear(!0, this.cfg.PARAM.getHd());
          var r =
            (this.h * this.maxPrice) / (this.maxPrice - this.minPrice) - 0.5;
          this.line.newStyle(this.cfg.COLOR.GRID, !0, 2),
            this.line.moveTo(0, r),
            this.line.lineTo(this.cfg.DIMENSION.w_k, r),
            this.line.stroke();
          for (
            var a,
              s = this.datas.length,
              e =
                this.cfg.DIMENSION.w_k /
                Math.max(s, this.cfg.PARAM.minCandleNum),
              h = this.customArr.length;
            h--;

          ) {
            var o = this.customArr[h].prop + "y";
            (a = this.__iOffsetX - e * mt),
              this.line.newStyle(this.customArr[h].color, !0, 1.5);
            for (var l = 0; s > l; l++)
              0 == l
                ? this.line.moveTo(a, this.datas[l][o])
                : this.line.lineTo(a, this.datas[l][o]),
                (a += e);
            this.line.stroke();
          }
          t && this.line.drawBg(this.__iOffsetX);
        }
      });
  }
  function W(i, a) {
    (this.DEFAULT_ARR = [
      { v: 26, color: "#75B2A3", prop: "vr", idct: "VR" },
      { v: 6, color: "#F8B82E", prop: "mavr", idct: "MAVR" }
    ]),
      r.call(this, i, a),
      (this.name = "VR"),
      "k" != a.type && (this.sname = "T_" + this.name),
      (this.vaObj = { upper: 200, lower: 70, glv: 350 });
    var s = bt.calcMA,
      e = bt.calcSUM,
      h = bt.calcREF,
      o = bt.getArr,
      l = bt.operateArr;
    this.initAndCalcAll = function(i) {
      for (
        var r = this.gdsd(i),
          a = this.customArr[0].v,
          n = this.customArr[1].v,
          c = o(r, this.tkProp.close),
          d = o(r, "volume"),
          f = h(c, 1),
          u = [],
          p = [],
          v = [],
          A = 0,
          m = c.length;
        m > A;
        A++
      )
        u.push(c[A] > f[A] ? d[A] : 0),
          p.push(c[A] < f[A] ? d[A] : 0),
          v.push(c[A] == f[A] ? d[A] : 0);
      (u = e(u, a)), (p = e(p, a)), (v = e(v, a));
      var g = l(
          l(l(l(u, 2, "*"), v, "+"), 100, "*"),
          l(l(p, 2, "*"), v, "+"),
          "/"
        ),
        b = s(g, n);
      (this.oriArr = r),
        this.datas ? t.ca(this.datas) : (this.datas = []),
        t.ca(this.selfArr);
      for (var y = 0, w = r.length; w > y; y++)
        (this.selfArr[y] = { vr: g[y], mavr: b[y] }),
          (this.selfArr[y][At] = r[y].volume < 0);
    };
  }
  function K(i, a) {
    (this.DEFAULT_ARR = [
      { v: 10, color: "#3D85C6", prop: "wr1", idct: "WR1" },
      { v: 6, color: "#84C84B", prop: "wr2", idct: "WR2" }
    ]),
      r.call(this, i, a),
      (this.name = "WR"),
      (this.vaObj = { min: 0, max: 100, upper: 80, lower: 20 });
    var s = bt.calcHHV,
      e = bt.calcLLV,
      h = bt.getArr,
      o = bt.operateArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = r[1].v,
        n = h(i, "close"),
        c = h(i, "high"),
        d = h(i, "low"),
        f = o(o(o(s(c, a), n, "-"), 100, "*"), o(s(c, a), e(d, a), "-"), "/"),
        u = o(o(o(s(c, l), n, "-"), 100, "*"), o(s(c, l), e(d, l), "-"), "/");
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var p = 0, v = i.length; v > p; p++)
        this.selfArr[p] = { wr1: f[p], wr2: u[p] };
    };
  }
  function G(i, a) {
    (this.DEFAULT_ARR = [
      { v: 24, color: "#fe6623", prop: "wvad", idct: "WVAD" },
      { v: 6, color: "#00c1eb", prop: "wvadma", idct: "WVADMA" }
    ]),
      r.call(this, i, a),
      (this.name = "WVAD"),
      (this.vaObj = { glv: 0 });
    var s = bt.calcSUM,
      e = bt.calcMA,
      h = bt.operateArr,
      o = bt.getArr;
    this.initAndCalcAll = function(i) {
      var r = this.customArr,
        a = r[0].v,
        l = r[1].v,
        n = o(i, "close"),
        c = o(i, "open"),
        d = o(i, "high"),
        f = o(i, "low"),
        u = o(i, "volume"),
        p = h(s(h(h(h(n, c, "-"), h(d, f, "-"), "/"), u, "*"), a), 1e4, "/"),
        v = e(p, l);
      (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
      for (var A = 0, m = i.length; m > A; A++)
        this.selfArr[A] = { wvad: p[A], wvadma: v[A] };
    };
  }
  function Y(i, a) {
    (this.storageVer = "v3"),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "VOLUME"),
      (this.alias = "\u6210\u4ea4");
    var s = this,
      e = "volume",
      h = "MA",
      o = "#888887";
    !(function() {
      var t = function() {
        var t = [
          { color: o },
          { v: 5, color: "#FC9CB8" },
          { v: 10, color: "#12BDD9" }
        ];
        nt.save({
          uid: [s.cfg.uid, new Date().getTime()].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer,
          value: t
        });
      };
      nt.load(
        {
          uid: [
            s.cfg.uid,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer
        },
        function(i) {
          i || t();
        },
        !0
      );
    })(),
      (this.generateSettings = function() {
        var i = s.name.toLowerCase(),
          r = "MA",
          a = o;
        if (((s.customArr = []), s.param && s.param.length > 0)) {
          a = s.param[0].color || o;
          for (var l = 0, n = s.param.length; n > l; l++) {
            var c = s.param[l].v;
            !isNaN(c) &&
              c > 0 &&
              s.customArr.push({
                v: c,
                color: s.param[l].color || "#" + t.randomColor(),
                prop: i + c,
                idct: r + c,
                desc: h
              });
          }
        }
        s.customArr.reverse(),
          s.customArr.push({ v: 0 / 0, color: a, prop: e, idct: "VOL" }),
          s.customArr.reverse();
      }),
      (this.initAndCalcAll = function(i) {
        (this.oriArr = i), !this.datas && (this.datas = []), t.ca(this.selfArr);
        for (
          var r = s.name.toLowerCase(),
            a = i.length,
            h = 0,
            o = this.customArr.length;
          o > h;
          h++
        )
          for (var l, n = 0, c = this.customArr[h].v, d = 0; c && a > d; d++) {
            var f = i[d];
            if (((n += Number(f[e])), d >= c - 1)) {
              l = n / c;
              var u = i[d - c + 1];
              n -= Number(u[e]);
            } else l = n / (d + 1);
            var p = (this.selfArr[d] = this.selfArr[d] || {});
            p[r + c] = l;
          }
      }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var i = this.viewState.start, r = this.viewState.end, a = r - i;
            this.datas.length > a;

          )
            this.datas.length--;
          for (; this.datas.length < a; ) this.datas.push({});
          var s,
            e,
            h = -Number.MAX_VALUE,
            o = 0;
          for (s = i; r > s; s++) {
            (e = this.datas[s - i]),
              (e.volume = this.oriArr[s].volume),
              e.volume > h && (h = e.volume);
            for (var l in this.selfArr[s])
              this.selfArr[s].hasOwnProperty(l) &&
                ((e[l] = this.selfArr[s][l]), e[l] > h && (h = e[l]));
          }
          0 > h && (h = 0);
          var n = t.xh5_ADJUST_HIGH_LOW.c(h, o, 0, !0);
          h = n[0];
          var c = h - o;
          for (s = i; r > s; s++) {
            e = this.datas[s - i];
            var d = this.oriArr[s];
            (e.date = d.date),
              (e.kke_cs = d.kke_cs),
              (e.voly = ot.vp(d.volume, h, this.h));
            for (var f = this.customArr.length; f--; ) {
              var u = this.customArr[f].prop;
              e[u + "y"] = (this.h * (h - e[u])) / c;
            }
          }
          (this.labelMaxP = h), (this.labelMinP = o), this.syncI();
        }
      }),
      (this.draw = function(t, r) {
        if (((this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r), this.datas)) {
          var a = this.line;
          a.clear(!0, i.PARAM.getHd());
          for (
            var s,
              e,
              h,
              o,
              l = this.datas.length,
              n = i.DIMENSION.w_k / Math.max(l, i.PARAM.minCandleNum),
              c = this.h,
              d = 0.6 * n,
              f = "hollow" == i.datas.candle,
              u = 0;
            2 > u;
            u++
          ) {
            (o = 0 == u ? i.COLOR.K_FALL : i.COLOR.K_RISE),
              (s = (Math.floor(n - 0.5) - d) / 2),
              a.beginPath();
            for (var p = 0; l > p; p++)
              (h = this.datas[p]),
                (e = h.voly),
                0 == u
                  ? -1 == h.kke_cs && a.drawVStickRect(s, e, d, c - e, o, !0)
                  : h.kke_cs >= 0 && a.drawVStickRect(s, e, d, c - e, o, !f),
                (s += n);
            a.stroke();
          }
          for (var v = 1, A = this.customArr.length; A > v; v++) {
            var m = this.customArr[v].prop + "y";
            (s = this.__iOffsetX - n * mt),
              a.newStyle(this.customArr[v].color, !0, 1.3);
            for (var g = 0; l > g; g++)
              0 == g
                ? a.moveTo(s, this.datas[g][m])
                : a.lineTo(s, this.datas[g][m]),
                (s += n);
            a.stroke();
          }
          a.drawBg(this.__iOffsetX);
        }
      });
  }
  function q(i, a) {
    (this.storageVer = "v2"),
      r.call(this, i, a, { nu: !0 }),
      (this.name = "TVOL"),
      (this.sname = "T_TVOL"),
      (this.alias = "\u6210\u4ea4");
    var s = this,
      e = "volume",
      h = "MA",
      o = "#888887";
    !(function() {
      var t = function() {
        var t = [{ color: o }, { v: 10, color: "#12BDD9" }];
        nt.save({
          uid: [s.cfg.uid, new Date().getTime()].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer,
          value: t
        });
      };
      nt.load(
        {
          uid: [
            s.cfg.uid,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key: s.STORAGE_PREFIX + (s.sname || s.name) + "_" + s.storageVer
        },
        function(i) {
          i || t();
        },
        !0
      );
    })(),
      (this.generateSettings = function() {
        var i = s.name.toLowerCase(),
          r = "MA",
          a = o;
        if (((s.customArr = []), s.param && s.param.length > 0)) {
          a = s.param[0].color || o;
          for (var l = 0, n = s.param.length; n > l; l++) {
            var c = s.param[l].v;
            !isNaN(c) &&
              c > 0 &&
              s.customArr.push({
                v: c,
                color: s.param[l].color || "#" + t.randomColor(),
                prop: i + c,
                idct: r + c,
                desc: h
              });
          }
        }
        s.customArr.reverse(),
          s.customArr.push({ v: 0 / 0, color: a, prop: e, idct: "VOL" }),
          s.customArr.reverse();
      }),
      (this.initAndCalcAll = function(i) {
        var r = this.gdsd(i);
        (this.oriArr = r), !this.datas && (this.datas = []), t.ca(this.selfArr);
        for (
          var a = s.name.toLowerCase(),
            h = r.length,
            o = 0,
            l = this.customArr.length;
          l > o;
          o++
        )
          for (var n, c = 0, d = this.customArr[o].v, f = 0; d && h > f; f++) {
            var u = r[f];
            if (((c += Number(u[e])), f >= d - 1)) {
              n = c / d;
              var p = r[f - d + 1];
              c -= Number(p[e]);
            } else n = c / (f + 1);
            var v = (this.selfArr[f] = this.selfArr[f] || {});
            v[a + d] = n;
          }
      }),
      (this.drawCalc = function() {
        if (this.datas) {
          for (
            var i = this.viewState.start * this.disMod,
              r = this.viewState.end * this.disMod,
              a = r - i;
            this.datas.length > a;

          )
            this.datas.length--;
          for (; this.datas.length < a; ) this.datas.push({});
          var s,
            e,
            h = -Number.MAX_VALUE;
          for (s = i; r > s; s++) {
            (e = this.datas[s - i]),
              (e.volume = this.oriArr[s].volume),
              e.volume > h && (h = e.volume);
            for (var o in this.selfArr[s])
              this.selfArr[s].hasOwnProperty(o) &&
                ((e[o] = this.selfArr[s][o]), e[o] > h && (h = e[o]));
          }
          0 > h && (h = 0);
          var l = t.xh5_ADJUST_HIGH_LOW.c(h, 0, 0, !0);
          h = l[0];
          var n;
          for (s = i; r > s; s++) {
            e = this.datas[s - i];
            var c = this.oriArr[s];
            (n = 0 == s ? c.prevclose || c.price : this.oriArr[s - 1].price),
              (e.kke_cs = c.price > n ? 1 : c.price < n ? -1 : 0),
              (e.price = c.price),
              (e.voly = ot.vp(c.volume, h, this.h)),
              this.h - e.voly < 0.5 &&
                c.volume > 0 &&
                ((e.voly = Math.floor(e.voly)), (e.voly -= 1));
            for (var d = this.customArr.length; d--; ) {
              var f = this.customArr[d].prop;
              e[f + "y"] = (this.h * (h - e[f])) / h;
            }
          }
          (this.labelMaxP = h), (this.labelMinP = 0), this.syncI();
        }
      }),
      (this.draw = function() {
        if (this.datas) {
          var t = this.line;
          t.clear(!0, i.PARAM.getHd());
          for (
            var r,
              a,
              s,
              e,
              h = this.datas.length,
              o = i.DIMENSION.w_t / h,
              l = this.h,
              n = o * gt,
              c = -1,
              d = 0;
            3 > d;
            d++
          ) {
            switch (c) {
              case -1:
                e = i.COLOR.T_FALL;
                break;
              case 0:
                e = i.COLOR.T_N;
                break;
              case 1:
                e = i.COLOR.T_RISE;
            }
            (r = 0), t.beginPath();
            for (var f = 0; h > f; f++)
              (s = this.datas[f]),
                s.volume >= 0 &&
                  ((a = s.voly),
                  s.kke_cs == c && t.drawVStickC(r, a, n, l - a, e)),
                (r += o);
            t.stroke(), c++;
          }
          for (var u = 1, p = this.customArr.length; p > u; u++) {
            var v = this.customArr[u].prop + "y";
            (r = n), t.newStyle(this.customArr[u].color, !0, 1.3);
            for (var A = 0; h > A; A++)
              (s = this.datas[A]),
                s.volume >= 0 &&
                  (0 == A ? t.moveTo(r, s[v]) : t.lineTo(r, s[v])),
                (r += o);
            t.stroke();
          }
          t.drawBg();
        }
      });
  }
  function Z(i) {
    function r() {
      var i = {
        BBIBOLL: h,
        BOLL: n,
        CHIPCOST: f,
        DITC: u,
        EXPMA: y,
        MA: N,
        PRESS: P,
        SAR: F,
        TZY: $,
        DPDK: A,
        EWI: b,
        RGL: E,
        TECHFLOW: w
      };
      yt.auth(i);
      var r = [],
        a = !0,
        e = function() {
          for (; m.length; ) m.length--;
          for (var t = r.length; t--; ) {
            var i = r[t];
            m.push({ name: i.name, param: i.param });
          }
        },
        o = function(t) {
          if (a) {
            var i = d.datas.isT ? s.tDb.get() : s.kDb.get();
            i &&
              (t.initAndCalcAll(i, !1),
              t.setRange(),
              t.setPricePos(null),
              t.draw());
          }
        },
        l = function(a) {
          if (a) {
            var s = a.name;
            if (s) {
              s = s.toUpperCase();
              for (var h, l = r.length; l--; )
                if (r[l].name == s) {
                  h = r[l];
                  break;
                }
              if (!h) {
                if (!t.isFunc(i[s])) return;
                (h = new i[s](d, D, o)), (h.asPChart = !0), r.push(h);
              }
              h.newParam(a.param), e(), yt.doStc(a);
            }
          }
        },
        p = function(t, i) {
          if (t) {
            var a = t.name;
            if (a) {
              a = a.toUpperCase();
              for (var s = r.length; s--; )
                if (r[s].name == a) {
                  var h = r.splice(s, 1)[0];
                  return (
                    h.rfs(),
                    h.getFromToM.reset(h),
                    !i && e(),
                    void yt.doStc(t, !0)
                  );
                }
            }
          }
        },
        v = function() {
          for (var t, i = r.length; i--; ) (t = r[i]), t.clearDraw();
        };
      (this.linkData = function(t) {
        if (a) {
          var i = d.datas.isT ? s.tDb.get() : s.kDb.get();
          if (i)
            for (var e, h = r.length; h--; )
              (e = r[h]), e.initAndCalcAll(i, t), t && e.update();
        }
      }),
        (this.setDataRange = function() {
          if (a)
            for (var t, i = r.length; i--; )
              (t = r[i]), t.setRange(), t.selfDataUrl && t.loadUrlData();
        }),
        (this.getMaxMin = function() {
          var t = Number.MAX_VALUE,
            i = -Number.MAX_VALUE,
            s = !1;
          if (a)
            for (var e, h = r.length; h--; )
              (e = r[h]),
                e.separate > 0 ||
                  isNaN(e.minPrice) ||
                  isNaN(e.maxPrice) ||
                  ((t = Math.min(e.minPrice, t)),
                  (i = Math.max(e.maxPrice, i)),
                  (s = !0));
          return s ? [i, t] : !1;
        }),
        (this.setPricePos = function(t) {
          if (a) for (var i, s = r.length; s--; ) (i = r[s]), i.setPricePos(t);
        }),
        (this.allDraw = function(t) {
          if (a) for (var i, s = r.length; s--; ) (i = r[s]), i.draw(!1, t);
        }),
        (this.onResize = function() {
          for (var t, i = r.length; i--; )
            (t = r[i]),
              t.resize({ h: d.DIMENSION.h_k, mh: d.DIMENSION.H_MA4K }),
              a && (t.createPlayingData(), t.draw());
        }),
        (this.indirectI = function(t, i, s) {
          a || (t = 0 / 0);
          for (var e, h = [], o = r.length; o--; )
            (e = r[o]), h.push(e.interact(t, i, s));
          return h;
        }),
        (this.getLog = function() {
          return m.reverse() || null;
        }),
        (this.getExistingCharts = function() {
          return r;
        }),
        (this.clear = function() {
          for (var t = r.length; t--; ) p(r[t], !0);
        }),
        (this.createChart = function(i, r) {
          !t.isArr(i) && (i = [i]);
          for (var a = 0, s = i.length; s > a; a++) l(i[a]);
          c(!0, r);
        }),
        (this.removeChart = function(i) {
          if (!i) {
            i = [];
            for (var a = r.length; a--; ) i.push({ name: r[a].name });
          }
          !t.isArr(i) && (i = [i]);
          for (var s = 0, e = i.length; e > s; s++) p(i[s]);
          c();
        }),
        (this.showHide = function(t) {
          var i = t.v;
          a !== i && ((a = i), a || v());
        });
    }
    var a,
      s = i.stockData,
      e = i.iMgr,
      o = i.titleArea,
      l = i.chartArea,
      c = i.cb,
      d = i.cfg,
      p = i.type,
      v = i.usrObj,
      m = [],
      g = {
        edit: function(t) {
          a.createChart(t);
        },
        remove: function(t) {
          a.removeChart(t);
        }
      },
      _ = function(i, r) {
        if (d.custom.allow_indicator_edit)
          if (tt)
            tt.sendOriginalData(
              { name: i.name, data: i.customArr, defaultData: i.DEFAULT_ARR },
              g
            ),
              t.sudaLog(),
              tt.show(r);
          else {
            var a = d.custom.indicatorpanel_url;
            v.ssl && (a = t.getSUrl(a, !0)),
              (tt = new Q({ url: a, z: 10001 }, at(_, null, i, r)));
          }
      },
      D = {
        stock: s,
        cbInDC: c,
        onClkTT: _,
        ctn: l,
        titleCtn: o,
        titleW: 0 / 0,
        titleGap: 5,
        style: { position: "absolute", top: 0 },
        iMgr: e,
        withHBg: !1,
        mh: d.DIMENSION.H_MA4K,
        lz: d.PARAM.G_Z_INDEX + 1,
        usrObj: v,
        type: p
      };
    return (a = new r());
  }
  function J(i) {
    function r() {
      var i = {
        ASI: e,
        BBIBOLL: h,
        BIAS: l,
        BOLL: n,
        BRAR: c,
        CCI: d,
        DMA: p,
        DMI: v,
        DPDK: A,
        DPDKS: m,
        EMV: g,
        EXPMA: y,
        KDJ: _,
        KFLOW: D,
        KKFLOW: M,
        KGSTRADE: O,
        SUNSPOT: S,
        MA: N,
        MACD: MACD,
        OBV: C,
        PKFLOW: R,
        PSY: x,
        ROC: L,
        RSI: U,
        SAR: F,
        TRIX: V,
        TZY: $,
        TZYS: z,
        VR: W,
        VOLUME: Y,
        WR: K,
        WVAD: G,
        TOR: B,
        ADL: s,
        LB: T,
        POSITION: k,
        TFLOW: X,
        TTFLOW: j,
        TVOL: q,
        TTOPTRADE: H,
        BLANKCTN: a
      };
      yt.auth(i);
      var r;
      lt = [];
      var o = function() {
          for (; rt.length; ) rt.length--;
          for (var t = lt.length; t--; ) {
            var i = lt[t];
            rt.push({ name: i.name, param: i.param });
          }
        },
        f = function(t) {
          var i = Z.datas.isT ? u.tDb.get() : u.kDb.get();
          i && (t.initAndCalcAll(i), t.drawCalc(), t.draw(!0));
        },
        b = function(t) {
          for (var i, r = lt.length; r--; )
            if (lt[r].name == t) {
              i = lt[r];
              break;
            }
          return i;
        },
        E = function(s) {
          if (s) {
            var e = s.name;
            if (e) {
              (e = e.toUpperCase()), "BLANKCTN" != e && (ot = e);
              var h = b(e);
              if (!h) {
                var l = i[e];
                if (!t.isFunc(l)) return;
                l === a && r
                  ? ((h = r), (h.wrap.style.display = ""))
                  : ((h = new l(Z, At, f)), l === a && (r = h)),
                  lt.push(h),
                  w.appendChild(h.wrap);
              }
              h.newParam(s.param), o(), yt.doStc(s);
            }
          }
        },
        J = function(t, i) {
          if (t) {
            var r = t.name;
            if (r) {
              r = r.toUpperCase();
              for (var a = lt.length; a--; )
                if (lt[a].name == r) {
                  var s = lt.splice(a, 1)[0];
                  return (
                    s.rfs(),
                    s.getFromToM.reset(s),
                    !i && o(),
                    void yt.doStc(t, !0)
                  );
                }
            }
          }
        };
      (this.linkData = function(t) {
        var i = Z.datas.isT ? u.tDb.get() : u.kDb.get();
        if (i)
          for (var r, a = lt.length; a--; )
            (r = lt[a]), r.initAndCalcAll(i), t && r.update();
      }),
        (this.setDataRange = function() {
          for (var t, i = lt.length; i--; )
            (t = lt[i]), t.drawCalc(), t.selfDataUrl && t.loadUrlData();
        }),
        (this.allDraw = function(t) {
          for (var i, r = lt.length; r--; ) (i = lt[r]), i.draw(!0, t);
        }),
        (this.onResize = function(t) {
          for (var i, r, a = lt.length; a--; )
            (r = lt[a]),
              (i = t ? Z.DIMENSION.H_T_G : r.h),
              r.resize({ h: i, eh: Z.DIMENSION.H_T_B }),
              r.drawCalc(),
              r.draw(!0);
        }),
        (this.indirectI = function(t, i, r) {
          for (var a, s = lt.length; s--; ) (a = lt[s]), a.interact(t, i, r);
        }),
        (this.getLog = function() {
          return rt.reverse() || null;
        }),
        (this.getExistingCharts = function() {
          return lt;
        }),
        (this.clear = function() {
          for (var t = lt.length; t--; ) J(lt[t], !0);
        }),
        (this.createChart = function(i, r) {
          !t.isArr(i) && (i = [i]);
          for (var a = 0, s = i.length; s > a; a++) E(i[a]);
          P(!0, r, i);
        }),
        (this.removeChart = function(i) {
          if (!i) {
            i = [];
            for (var r = lt.length; r--; ) i.push({ name: lt[r].name });
          }
          !t.isArr(i) && (i = [i]);
          for (var a = 0, s = i.length; s > a; a++) J(i[a]);
          P(!0);
        });
    }
    var o,
      f,
      u = i.stockData,
      b = i.iMgr,
      w = i.subArea,
      P = i.cb,
      E = i.type,
      Z = i.cfg,
      J = i.usrObj,
      it = i.initMgr,
      rt = [],
      st = function(i, r, a, s, e) {
        if (
          (!t.$CONTAINS(r, b.iHLineO.body) && r.appendChild(b.iHLineO.body),
          i.datas)
        ) {
          var h = i.labelMaxP - (s / i.h) * (i.labelMaxP - i.labelMinP);
          if (i.nu) {
            var o = t.strUtil.nu(i.labelMaxP);
            h /= o[0];
          }
          b.iToD({
            mark: h,
            x: a,
            y: s,
            ox: Z.DIMENSION.posX,
            oy: Z.DIMENSION.H_T_T,
            e: e
          });
        }
      };
    switch (E) {
      case "t":
        var et = J.tchartobject.t;
        f = et || ut;
        break;
      case "p":
        f = ["LB", "POSITION", "TVOL", "MACD"];
        break;
      default:
        var ht = J.tchartobject.k;
        f = ht || ft;
    }
    var ot,
      lt,
      nt,
      ct = "BLANKCTN",
      dt = function() {
        if (Z.custom.tchart_tap && lt && ot) {
          var t = lt.length;
          if (!(t > 2)) {
            for (var i = t; i--; )
              if (ct == String(lt[i].name)) {
                nt = i;
                break;
              }
            if ("undefined" != typeof nt || 2 != t) {
              var r = f.length;
              for (i = r; i--; )
                if (ot == f[i]) {
                  o.removeChart(), ++i >= r && (i = 0);
                  var a = f[i];
                  o.createChart(
                    1 == t
                      ? { name: a }
                      : 0 == nt
                      ? [{ name: ct }, { name: a }]
                      : [{ name: a }, { name: ct }]
                  );
                  break;
                }
            }
          }
        }
      },
      pt = {
        edit: function(t) {
          o.createChart(t);
        },
        remove: function(t) {
          o.removeChart(t);
        }
      },
      vt = function(i, r) {
        if (Z.custom.allow_indicator_edit)
          if (tt)
            tt.sendOriginalData(
              { name: i.name, data: i.customArr, defaultData: i.DEFAULT_ARR },
              pt
            ),
              tt.show(r),
              t.sudaLog();
          else {
            var a = Z.custom.indicatorpanel_url;
            J.ssl && (a = t.getSUrl(a, !0)),
              (tt = new Q({ url: a, z: 10001 }, at(vt, null, i, r)));
          }
      },
      At = {
        fixIdctW: !0,
        stock: u,
        iTo: st,
        iMgr: b,
        onClkTT: vt,
        h: Z.DIMENSION.H_T_G,
        eh: Z.DIMENSION.H_T_B,
        withHBg: !0,
        onClkMain: dt,
        usrObj: J,
        type: E,
        initMgr: it
      };
    return (o = new r());
  }
  function Q(i, r) {
    function a(t, i) {
      for (var r in t) t.hasOwnProperty(r) && (t[r] = i + t[r]);
    }
    var s = "sinafinancehtml5indicatorscfgpanel",
      e = "sinatkchart_indicatorscfgpanel~",
      h = {
        LOADED: "loaded",
        HIDE: "hide",
        REMOVE: "remove",
        EDIT: "edit",
        DRAGSTART: "dragstart",
        DRAGGING: "dragging",
        PICKCOLOR: "pickcolor",
        COLORPICKED: "colorpicked",
        OPEN: "open"
      };
    a(h, e);
    var o,
      l,
      n,
      c,
      d = 250,
      f = 0,
      u = 80,
      p = 35,
      v = 25;
    ct &&
      (ct.onok = function(t, i) {
        o &&
          o.contentWindow &&
          o.contentWindow.postMessage(
            JSON.stringify({
              cmd: h.COLORPICKED,
              data: { color: t.hex, target: i }
            }),
            "*"
          );
      });
    var A = function(t) {
        var i;
        try {
          i = JSON.parse(t.data);
        } catch (t) {}
        if (i && i.cmd)
          switch (i.cmd) {
            case h.LOADED:
              r && r();
              break;
            case h.HIDE:
              (o.style.display = "none"), ct && ct.hide();
              break;
            case h.REMOVE:
            case h.EDIT:
              var a = i.cmd.split("~")[1];
              l[a](i.data), ct && ct.hide();
              break;
            case h.DRAGSTART:
              (n = +o.style.left.replace(/[^0-9.]/g, "")),
                (c = +o.style.top.replace(/[^0-9.]/g, ""));
              break;
            case h.DRAGGING:
              var s = i.data;
              (o.style.left = n + s.movedX + "px"),
                (o.style.top = c + s.movedY + "px");
              break;
            case h.PICKCOLOR:
              (s = i.data),
                ct &&
                  ct.show(
                    +s.x + +o.style.left.replace(/[^0-9.]/g, ""),
                    +s.y + +o.style.top.replace(/[^0-9.]/g, ""),
                    s.target,
                    s.color
                  );
          }
      },
      m = function() {
        o ||
          ((o = t.iframer({
            attribute: { id: s, src: i.url },
            style: {
              margin: "0 auto",
              width: d + "px",
              border: "1px solid #aaa",
              position: "absolute",
              zIndex: i.z
            }
          })),
          st.addHandler(window, "message", A));
      };
    (this.sendOriginalData = function(i, r) {
      if (o) {
        l = r;
        var a = Math.min(i.data.length || 1, 5);
        switch (((f = u + p * a), i.name)) {
          case "MA":
          case "VOLUME":
          case "TVOL":
          case "EXPMA":
            f += v;
        }
        (o.style.height = f + "px"),
          o.contentWindow &&
            o.contentWindow.postMessage(
              JSON.stringify({ cmd: h.OPEN, data: i }),
              "*"
            ),
          t.stc(["inc", i.name].join("_"));
      }
    }),
      (this.show = function(i) {
        if (o) {
          var r, a;
          i.changedTouches
            ? ((r = i.changedTouches[0].clientX),
              (a = i.changedTouches[0].clientY))
            : ((r = i.clientX), (a = i.clientY));
          var s =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight,
            e =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
          a + f + 30 > s && (a = Math.max(s - f - 30, 1)),
            r + d + 3 > e && (r = 28),
            (o.style.left = r + "px"),
            (o.style.top =
              (document.body.scrollTop
                ? document.body.scrollTop
                : document.documentElement.scrollTop) +
              a +
              "px"),
            (o.style.display = ""),
            t.suda("show_indicator_param");
        }
      }),
      m();
  }
  var tt,
    it = t.oc,
    rt = t.$C,
    at = t.fBind,
    st = t.xh5_EvtUtil,
    et = i.xh5_ibPainter,
    ht = i.xh5_Canvas,
    ot = t.xh5_PosUtil,
    lt = t.dateUtil,
    nt = t.bridge,
    ct = t.colorPicker,
    dt = t.HQ_DOMAIN,
    ft = [
      "VOLUME",
      "MACD",
      "KDJ",
      "RSI",
      "BOLL",
      "WR",
      "BBIBOLL",
      "SAR",
      "DMI",
      "EMV",
      "ROC",
      "PSY",
      "OBV",
      "WVAD",
      "CCI",
      "TRIX",
      "DMA",
      "EXPMA",
      "BIAS",
      "ASI",
      "VR",
      "BRAR"
    ],
    ut = [
      "TVOL",
      "LB",
      "MACD",
      "BOLL",
      "RSI",
      "BBIBOLL",
      "ROC",
      "TRIX",
      "DMA",
      "EXPMA",
      "BIAS",
      "VR"
    ],
    pt = {},
    vt = "ignore_",
    At = vt + "istpre",
    mt = 0.4,
    gt = 0.5;
  (r.prototype = {
    storageVer: "v1",
    STORAGE_PREFIX: "sinatkchart_indicators~",
    loadGlobalSetting: function() {
      var t = this;
      nt.load(
        {
          uid: [
            this.cfg.uid,
            new Date().getTime(),
            Math.floor(987654321 * Math.random() + 1)
          ].join("|"),
          key:
            this.STORAGE_PREFIX +
            (this.sname || this.name) +
            "_" +
            this.storageVer
        },
        function(i) {
          if (i) {
            var r;
            try {
              r = JSON.parse(i);
            } catch (a) {}
            r && t.newParam(r, !0);
          }
        },
        !0
      );
    },
    saveGlobalSetting: function(t) {
      nt.save({
        uid: [this.cfg.uid, new Date().getTime()].join("|"),
        key:
          this.STORAGE_PREFIX +
          (this.sname || this.name) +
          "_" +
          this.storageVer,
        value: t
      });
    },
    gdsd: function(t) {
      var i;
      if ("k" === this.proxyCfg.type)
        (this.disMod = 1), (this.tkProp.close = "close"), (i = t);
      else {
        (this.disMod = this.cfg.datas.tDataLen),
          (this.tkProp.close = "price"),
          (i = []);
        for (var r = 0, a = t.length; a > r; r++) i = i.concat(t[r]);
      }
      return i;
    }
  }),
    (r.prototype.mr = function() {
      function i(t) {
        var i = s.h - t;
        if (i >= 0) {
          var r =
            "t" === s.proxyCfg.type ? s.cfg.DIMENSION.h_t : s.cfg.DIMENSION.h_k;
          if (1 > r + t) return;
          (s.h = i), e(t);
        }
      }
      function r() {
        var t = rt("span");
        return (
          (t.style.display = "block"),
          (t.style.cursor = "row-resize"),
          (t.style.borderTop = "2px dotted #000"),
          (t.style.borderBottom = "2px dotted #000"),
          (t.style.width = "77px"),
          (t.style.height = "2px"),
          t
        );
      }
      var a,
        s = this,
        e = this.proxyCfg.initMgr.innerResize,
        h = 0.1,
        o = 40,
        l = void 0,
        n = function(t) {
          st.preventDefault(t);
          var r = t.changedTouches ? t.changedTouches[0].pageY : t.pageY;
          isNaN(r) && (r = t.offsetY);
          var s = r - a;
          (a = r), s && i(s);
        },
        c = function() {
          st.removeHandler(window, "mousemove", n),
            st.removeHandler(window, "mouseup", c),
            st.removeHandler(l, "touchmove", n),
            st.removeHandler(l, "touchend", c),
            t.suda("indicator_reheight");
        },
        d = function(i) {
          (a = isNaN(i.pageY) ? i.offsetY : i.pageY),
            t.xh5_deviceUtil.istd
              ? (st.addHandler(l, "touchend", c),
                st.addHandler(l, "touchmove", n))
              : (st.addHandler(window, "mouseup", c),
                st.addHandler(window, "mousemove", n),
                t.xh5_deviceUtil.allowt &&
                  (st.addHandler(l, "touchend", c),
                  st.addHandler(l, "touchmove", n)));
        },
        f = function() {
          (l = rt("div")),
            (l.style.position = "absolute"),
            (l.style.right = s.cfg.DIMENSION.K_RIGHT_W + o + "px"),
            (l.style.color = "#000"),
            (l.style.opacity = h),
            (l.style.zIndex = s.cfg.PARAM.I_Z_INDEX + 2),
            (l.style.paddingTop = "3px"),
            t.xh5_deviceUtil.istd
              ? st.addHandler(l, "touchstart", d)
              : (st.addHandler(l, "mousedown", d),
                t.xh5_deviceUtil.allowt && st.addHandler(l, "touchstart", d),
                st.addHandler(l, "mouseover", function() {
                  l.style.opacity = 1;
                }),
                st.addHandler(l, "mouseout", function() {
                  l.style.opacity = h;
                }));
        },
        u = function() {
          var t = new r();
          l.appendChild(t);
        };
      return f(), u(), l;
    }),
    (r.prototype.rab = function() {
      function i(t) {
        var i = a.wrap,
          r = a.wrap.parentNode,
          s = n(i, t);
        s && ("-1" == t ? r.insertBefore(i, s) : r.insertBefore(s, i));
      }
      function r(t) {
        var i = rt("span");
        return (
          (i.style.marginLeft = a.cfg.DIMENSION.K_RIGHT_W + "px"),
          (i.style.cursor = "pointer"),
          (i.innerHTML = t ? "\u25b2" : "\u25bc"),
          i.setAttribute("data-dir", t ? "-1" : "1"),
          i
        );
      }
      var a = this,
        s = 0.1,
        e = void 0,
        h = function(t) {
          st.preventDefault(t);
          var r = t.target;
          if (r) {
            var a = r.getAttribute("data-dir");
            null !== a && i(a);
          }
        },
        o = function() {
          (e = rt("div")),
            (e.style.position = "absolute"),
            (e.style.right = a.cfg.DIMENSION.K_RIGHT_W + "px"),
            (e.style.color = "#000"),
            (e.style.opacity = s),
            (e.style.zIndex = a.cfg.PARAM.I_Z_INDEX + 2),
            t.xh5_deviceUtil.istd
              ? st.addHandler(e, "touchend", h)
              : (st.addHandler(e, "click", h),
                t.xh5_deviceUtil.allowt && st.addHandler(e, "touchend", h),
                st.addHandler(e, "mouseover", function() {
                  e.style.opacity = 1;
                }),
                st.addHandler(e, "mouseout", function() {
                  e.style.opacity = s;
                }));
        },
        l = function() {
          var t = new r(!0),
            i = new r();
          e.appendChild(t), e.appendChild(i);
        },
        n = function(t, i) {
          var r;
          return (
            (r = -1 == i ? t.previousSibling : t.nextSibling),
            r && 0 == r.id.indexOf("blankctn_") && (r = null),
            r
          );
        };
      return o(), l(), e;
    }),
    (r.prototype.ic = function(i) {
      var r = this.proxyCfg.iTo;
      (this.h = isNaN(i.h) ? this.cfg.DIMENSION.h_k : i.h),
        (this.customArr = t.clone(this.DEFAULT_ARR, null)),
        (this.wrap = rt("div")),
        this.selfCfg.ctnId && (this.wrap.id = this.selfCfg.ctnId),
        (this.wrap.style.fontSize = this.wrap.style.lineHeight =
          this.cfg.STYLE.FONT_SIZE + "px");
      for (var a in this.proxyCfg.style)
        this.proxyCfg.style.hasOwnProperty(a) &&
          (this.wrap.style[a] = this.proxyCfg.style[a]);
      if (this.proxyCfg.titleCtn) this.titleCtn = this.proxyCfg.titleCtn;
      else if (!this.isBlank) {
        (this.titleCtn = rt("div")),
          (this.titleCtn.style.position = "absolute"),
          (this.titleCtn.style.zIndex = this.cfg.PARAM.I_Z_INDEX + 1);
        var s = this;
        if (
          (st.addHandler(this.titleCtn, "touchstart", function(t) {
            s.cfg.custom.touch_prevent && st.preventDefault(t);
          }),
          (this.titleCtn.style.width = "100%"),
          !this.cfg.PARAM.isFlash)
        ) {
          if (this.cfg.custom.indicator_reorder) {
            var e = this.rab();
            this.titleCtn.appendChild(e);
          }
          if (this.cfg.custom.indicator_reheight) {
            var h = this.mr();
            this.titleCtn.appendChild(h);
          }
        }
        this.wrap.appendChild(this.titleCtn);
      }
      this.isBlank
        ? (this.wrap.style.height = this.h + "px")
        : ((this.line = new et({
            setting: this.cfg,
            sd: this,
            withHBg: this.proxyCfg.withHBg,
            reO: { h: this.h, mh: this.mh, eh: this.eh },
            nu: this.nu,
            dt: !1,
            iMgr: this.proxyCfg.iMgr,
            iTo: at(r, null, this),
            iClk: this.proxyCfg.onClkMain
          })),
          !isNaN(this.proxyCfg.lz) &&
            (this.line.getCanvas().style.zIndex = this.proxyCfg.lz),
          this.wrap.appendChild(this.line.getWrap())),
        this.proxyCfg.ctn && this.proxyCfg.ctn.appendChild(this.wrap);
    }),
    (r.prototype.initAndCalcAll = function() {}),
    (r.prototype.resize = function(t) {
      (this.h = t.h),
        (this.mh = t.mh),
        (this.eh = t.eh),
        this.line && this.line.resize({ h: this.h, mh: this.mh, eh: this.eh });
    }),
    (r.prototype.getFromToM = new (function() {
      (this.reset = function(t) {
        var i = t.loadedFlag;
        if (i)
          for (var r in i) i.hasOwnProperty(r) && ((i[r] = null), delete i[r]);
        t.loadedFromTo = void 0;
      }),
        (this.get = function(t) {
          if (!t.viewState.startDate || !t.viewState.endDate) return !1;
          var i = t.loadedFlag,
            r = t.loadedFromTo,
            a = 1989,
            s = 2099;
          if (r) {
            if (a >= r[0]) return;
            s = r[0];
          }
          t.loadedFromTo = [a, s];
          var e = i["_" + a],
            h = i["_" + s];
          if (e && h) return !1;
          for (
            h ? (s -= 1) : e && (a += 1),
              e = [a, "01", "01"].join("-"),
              h = [s, "12", "31"].join("-");
            s >= a;

          )
            i["_" + a++] = !0;
          return [e, h];
        });
    })()),
    (r.prototype.loadUrlData = function() {
      var i = this.getFromToM.get(this);
      if (i) {
        var r = i[0],
          a = i[1],
          s = this.aliasymbol || this.symbol,
          e = "_" + s + "_" + new Date().getDate(),
          h = this.selfDataUrl
            .replace("$symbol", s)
            .replace("$cb", "var%20" + e + "=")
            .replace("$from", r)
            .replace("$to", a);
        this.proxyCfg.usrObj.ssl && (h = t.getSUrl(h, !0));
        var o = this;
        t.load(h, function() {
          var i = window[e];
          (window[e] = null),
            o.urlData || (o.urlData = { day: [], week: [], month: [] });
          var r = o.df(i),
            a = o.urlData.day;
          if (a.length > 1) {
            for (
              var s = a[0].date, h = r.length;
              h-- &&
              !(
                r[h].date.getFullYear() == s.getFullYear() &&
                r[h].date.getMonth() == s.getMonth() &&
                r[h].date.getDate() < s.getDate()
              );

            );
            r.splice(h + 1, r.length - h - 1);
          }
          a.splice.apply(a, [0, 0].concat(r));
          var l,
            n,
            c = [],
            d = [],
            f = a.length,
            u = a[0],
            p = {},
            v = {},
            A = {};
          for (l = o.customArr.length; l--; ) A[o.customArr[l].prop] = void 0;
          A.date = void 0;
          for (n in A)
            A.hasOwnProperty(n) &&
              (t.isDate(u[n])
                ? ((p[n] = u[n]), (v[n] = u[n]))
                : ((p[n] = 1 * u[n]), (v[n] = 1 * u[n])));
          if (1 == f) c.push(p), d.push(v);
          else {
            for (l = 1; f > l; l++) {
              (u = a[l]), lt.gw(a[l - 1].date, u.date) || (c.push(p), (p = {}));
              for (n in A)
                A.hasOwnProperty(n) &&
                  (p[n] = t.isDate(u[n]) ? u[n] : (1 * p[n] || 0) + 1 * u[n]);
              lt.gm(a[l - 1].date, u.date) || (d.push(v), (v = {}));
              for (n in A)
                A.hasOwnProperty(n) &&
                  (v[n] = t.isDate(u[n]) ? u[n] : (1 * v[n] || 0) + 1 * u[n]);
            }
            c.push(p), d.push(v);
          }
          (o.urlData.week = c),
            (o.urlData.month = d),
            (o.toReCalc = !0),
            o.cb(o);
        });
      }
    }),
    (r.prototype.newData = function(t, i, r) {
      if (t && !(t.length < 1)) {
        var a = t[t.length - 1];
        if (
          (168 == r && lt.gw(a.date, i.date)) ||
          (720 == r && lt.gm(a.date, i.date))
        )
          return void (a.date = i.date);
        for (var s, e = {}, h = this.customArr.length; h--; )
          (s = this.customArr[h].prop), (e[s] = i[s] || 0);
        (e.date = i.date), t.push(e);
      }
    }),
    (r.prototype.updateData = function(i, r, a, s) {
      if (r && !(r.length < 1)) {
        var e = r[r.length - 1];
        if (s) {
          if (!lt.stbd(e.date, i.date))
            return i.date > e.date ? void this.newData(r, i, a) : void 0;
          if (!t.kUtil.spk(e.time, i.time, "00:00", a))
            return void this.newData(r, i, a);
        } else if (!lt.stbd(i.date, e.date))
          return i.date > e.date ? void this.newData(r, i, a) : void 0;
        e = r[r.length - 1];
        for (var h, o = this.customArr.length; o--; ) {
          h = this.customArr[o].prop;
          var l = Number(i[h]);
          if (t.isNum(i[h]))
            switch (a) {
              case 167:
              case 168:
              case 169:
              case 719:
              case 720:
              case 721:
                e[h] += i[h + "update"] || 0;
                break;
              default:
                e[h] = l;
            }
        }
      }
    }),
    (r.prototype.doUpdate = function(t) {
      t &&
        this.urlData &&
        (this.urlData.day && this.updateData(t, this.urlData.day, 24),
        this.urlData.week && this.updateData(t, this.urlData.week, 168),
        this.urlData.month && this.updateData(t, this.urlData.month, 720),
        (this.toReCalc = !0),
        this.cb(this));
    }),
    (r.prototype.udf = function(t) {
      return t;
    }),
    (r.prototype.update = function() {
      if (
        this.selfDataUrlUpdate &&
        !(++this.updateCount < this.UPDATE_THRESHOLD)
      ) {
        this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
        var i = lt.ddt(this.viewState.startDate).getFullYear(),
          r = lt.ddt(this.viewState.endDate).getFullYear(),
          a = [i, 1, 1].join("-"),
          s = [r, 12, 31].join("-"),
          e = this.aliasymbol || this.symbol,
          h = "_" + e + new Date().getTime(),
          o = this.selfDataUrlUpdate
            .replace("$symbol", e)
            .replace("$cb", "var%20" + h + "=")
            .replace("$from", a)
            .replace("$to", s);
        this.proxyCfg.usrObj.ssl && (o = t.getSUrl(o, !0));
        var l = this;
        t.load(o, function() {
          var t = window[h];
          window[h] = null;
          var i = l.udf(t);
          i && l.doUpdate(i);
        });
      }
    }),
    (r.prototype.createPlayingData = function() {
      if (this.datas)
        for (
          var t,
            i = this.labelMaxP - this.labelMinP,
            r = 0,
            a = this.datas.length;
          a > r;
          r++
        ) {
          t = this.datas[r];
          for (var s = this.customArr.length; s--; ) {
            var e = this.customArr[s].prop;
            t[e + "y"] = (this.h * (this.labelMaxP - t[e])) / i;
          }
        }
    }),
    (r.prototype.setPricePos = function(t) {
      !t || this.separate > 0
        ? ((this.labelMinP = this.minPrice), (this.labelMaxP = this.maxPrice))
        : ((this.labelMaxP = t[0]),
          (this.labelMinP = t[1]),
          (this.pricePosArr = t)),
        this.createPlayingData();
    }),
    (r.prototype.generateSettings = function() {
      if (this.param && this.param.length > 0)
        for (
          var i = 0, r = Math.min(this.param.length, this.DEFAULT_ARR.length);
          r > i;
          i++
        ) {
          var a = this.param[i],
            s = Number(a.v);
          (this.customArr[i].v = s > 0 ? s : this.DEFAULT_ARR[i].v),
            (this.customArr[i].color = t.isColor(a.color)
              ? a.color
              : this.DEFAULT_ARR[i].color);
        }
    }),
    (r.prototype.newParam = function(i, r) {
      var a = this.sname || this.name,
        s = !1;
      if (
        (i ? ((pt[a] = i), t.stc("np_" + a, i)) : ((s = !0), (i = pt[a])),
        (this.param = i),
        this.generateSettings(),
        this.genIndicator(
          this.customArr,
          this.asPChart ? "" : this.alias || this.name
        ),
        r)
      ) {
        var e = this.cfg.datas.isT
          ? this.proxyCfg.stock.tDb.get()
          : this.proxyCfg.stock.kDb.get();
        return void (
          e &&
          (this.initAndCalcAll(e),
          this.asPChart ? this.setPricePos(this.pricePosArr) : this.drawCalc(),
          this.draw(!0))
        );
      }
      if (this.cfg.custom.storage_lv > 0)
        if (i) {
          if (s) return;
          this.cfg.custom.storage_lv > 1 && this.saveGlobalSetting(i);
        } else this.loadGlobalSetting();
    }),
    (r.prototype.syncI = function() {
      if (this.datas && this.proxyCfg.iMgr)
        if (this.proxyCfg.iMgr.isIng())
          this.proxyCfg.iMgr.isMoving() &&
            this.indicatorI(this.datas[this.datas.length - 1]);
        else if ("t" != this.proxyCfg.type)
          this.indicatorI(this.datas[this.datas.length - 1]);
        else if (this.proxyCfg.stock)
          if (5 == this.proxyCfg.stock.viewState.end) {
            var t;
            (t =
              this.proxyCfg.stock.realLen >= 0
                ? this.proxyCfg.stock.realLen >= this.disMod
                  ? 0 == this.proxyCfg.stock.realLen
                    ? 0
                    : this.proxyCfg.stock.realLen - 1
                  : this.proxyCfg.stock.realLen
                : this.disMod - 1),
              4 != this.proxyCfg.stock.viewState.start &&
                (t =
                  (this.proxyCfg.stock.viewState.end -
                    this.proxyCfg.stock.viewState.start -
                    1) *
                    this.disMod +
                  t),
              this.indicatorI(this.datas[t]);
          } else this.indicatorI(this.datas[this.datas.length - 1]);
    }),
    (r.prototype.setRange = function() {
      if (this.datas) {
        for (
          var t = this.viewState.start * this.disMod,
            i = this.viewState.end * this.disMod,
            r = i - t;
          this.datas.length > r;

        )
          this.datas.length--;
        for (; this.datas.length < r; ) this.datas.push({});
        for (
          var a = Number.MAX_VALUE, s = -Number.MAX_VALUE, e = t;
          i > e;
          e++
        ) {
          var h = this.datas[e - t];
          if (
            ((h.date = this.oriArr[e].date),
            !this.selfArr[e] || !this.selfArr[e][At])
          )
            for (var o in this.selfArr[e])
              if (this.selfArr[e].hasOwnProperty(o)) {
                if (((h[o] = this.selfArr[e][o]), 0 == o.indexOf(vt))) continue;
                h[o] > s && (s = h[o]), h[o] < a && (a = h[o]);
              }
        }
        (this.minPrice = a), (this.maxPrice = s), this.syncI();
      }
    }),
    (r.prototype.drawCalc = function() {
      if (this.datas) {
        for (
          var t = this.viewState.start * this.disMod,
            i = this.viewState.end * this.disMod,
            r = i - t;
          this.datas.length > r;

        )
          this.datas.length--;
        for (; this.datas.length < r; ) this.datas.push({});
        var a,
          s,
          e = Number.MAX_VALUE,
          h = -Number.MAX_VALUE;
        for (a = t; i > a; a++)
          if (
            ((s = this.datas[a - t]),
            (s.date = this.oriArr[a].date),
            !this.selfArr[a] || !this.selfArr[a][At])
          )
            for (var o in this.selfArr[a])
              if (this.selfArr[a].hasOwnProperty(o)) {
                if (((s[o] = this.selfArr[a][o]), 0 == o.indexOf(vt))) continue;
                s[o] > h && (h = s[o]), s[o] < e && (e = s[o]);
              }
        switch (this.name) {
          case "ADL":
          case "MACD":
            (h = Math.max(Math.abs(h), Math.abs(e))), (e = -h);
            break;
          case "BIAS":
          case "BRAR":
          case "DMA":
          case "EMV":
          case "KDJ":
          case "ROC":
          case "VR":
          case "WVAD":
            (this.vaObj.min = e), (this.vaObj.max = h);
            break;
          case "CCI":
            e > 0 && (e = 0),
              0 > h && (h = 0),
              (this.vaObj.min = e),
              (this.vaObj.max = h);
            break;
          case "TOR":
            e = 0;
            break;
          default:
            this.vaObj && ((h = this.vaObj.max), (e = this.vaObj.min));
        }
        (this.labelMaxP = h), (this.labelMinP = e);
        var l = h - e;
        for (a = 0; r > a; a++) {
          s = this.datas[a];
          for (var n = this.customArr.length; n--; ) {
            var c = this.customArr[n].prop;
            s[c + "y"] = (this.h * (h - s[c])) / l;
          }
        }
        this.syncI();
      }
    }),
    (r.prototype.clearDraw = function() {
      this.line.clear(!1), this.interact(0 / 0);
    }),
    (r.prototype.draw = function(t, i) {
      if (((this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i), this.datas)) {
        this.line.clear(!0, this.cfg.PARAM.getHd());
        var r,
          a,
          s = this.datas.length;
        this.cfg.datas.isT
          ? ((r = this.cfg.DIMENSION.w_t / s), (a = r * gt))
          : ((r =
              this.cfg.DIMENSION.w_k /
              Math.max(s, this.cfg.PARAM.minCandleNum)),
            (a = this.__iOffsetX - r * mt));
        for (var e, h = this.customArr.length; h--; ) {
          var o = this.customArr[h].prop + "y";
          (e = a), this.line.newStyle(this.customArr[h].color, !0, this.lw);
          for (var l = 0; s > l; l++)
            0 == l
              ? this.line.moveTo(e, this.datas[l][o])
              : this.line.lineTo(e, this.datas[l][o]),
              (e += r);
          this.line.stroke();
        }
        t && this.line.drawBg(this.__iOffsetX),
          this.vaObj && this.drawValueRange();
      }
    }),
    (r.prototype.drawValueRange = function() {
      var i = this.line.getG();
      i.globalCompositeOperation = "destination-over";
      var r = this.vaObj.min,
        a = this.vaObj.max,
        s = a - r;
      if (!isNaN(this.vaObj.upper) && !isNaN(this.vaObj.lower)) {
        var e = this.vaObj.upper,
          h = this.vaObj.lower,
          o = (this.h * (a - e)) / s,
          l = (this.h * (a - h)) / s,
          n = l - o;
        (i.fillStyle = t.hex2dec(this.customArr[0].color, 0.2)),
          i.fillRect(0, o, this.cfg.DIMENSION.w_k, n);
      }
      var c =
        (this.h * (isNaN(this.vaObj.glv) ? a / 2 : a - this.vaObj.glv)) / s;
      (c += 0.5),
        this.line.newStyle(this.cfg.COLOR.GRID, !0, 1),
        this.line.moveTo(0, c),
        this.line.lineTo(this.cfg.DIMENSION.w_k, c),
        i.stroke();
    }),
    (r.prototype.genIdctParam = function(t) {
      t = t || {};
      var i = isNaN(t.width)
          ? this.proxyCfg.titleW || this.cfg.DIMENSION.getStageW()
          : t.width,
        r = isNaN(t.height) ? this.cfg.DIMENSION.H_T_T || 14 : t.height;
      return { hd: this.cfg.PARAM.getHd(), width: i, height: r };
    }),
    (r.prototype.genTitleCanvas = function(i) {
      function r() {
        var r = new ht(),
          a = r.g,
          o = s.cfg.datas.isT;
        if (((this.canvas = r.canvas), t.isFunc(s.proxyCfg.onClkTT))) {
          var l = t.xh5_deviceUtil.istd ? "touchend" : "click";
          st.addHandler(this.canvas, l, at(s.proxyCfg.onClkTT, null, s));
          var n = this.canvas.style;
          (n.cursor = "pointer"),
            (n.position = "relative"),
            (n.zIndex = s.cfg.PARAM.I_Z_INDEX + 1);
        }
        var c = function(t, i) {
            r.resize(s.genIdctParam({ width: t, height: i })),
              (a.font =
                s.cfg.STYLE.FONT_SIZE + "px " + s.cfg.STYLE.FONT_FAMILY),
              (a.textBaseline = "top");
          },
          d = 9,
          f = 13,
          u = 2;
        (this.setTxt = function(r) {
          var l = s.cfg.DIMENSION.posX,
            n = o ? s.cfg.DIMENSION.w_t : s.cfg.DIMENSION.w_k,
            p = s.cfg.DIMENSION.extend_draw,
            v = a.measureText(i).width,
            A = s.cfg.DIMENSION.getStageW(),
            m = 0.35 * A,
            g = "TFLOW" == s.name && 400 > n ? 55 : 80,
            b = s.cfg.DIMENSION.H_T_T;
          u > b && (b = 14);
          var y = 1;
          if (r) {
            for (
              var w, _, D, M = l + (v > 0 ? d : 0), O = [], S = r.length, T = 0;
              S > T;
              T++
            )
              if (((w = r[T]), w.t || !isNaN(w.n))) {
                switch (
                  ((_ =
                    (w.t ? w.t + ": " : "") +
                    (isNaN(w.n) ? "--" : t.strUtil.ps(w.n, h.nfloat))),
                  s.name)
                ) {
                  case "TFLOW":
                    T == r.length - 1 && (_ += "\u5143");
                    break;
                  case "TZY":
                  case "TZYS":
                    _ += "%";
                }
                (D = e
                  ? Math.max(g, a.measureText(_).width || 0)
                  : a.measureText(_).width || 0),
                  O.push({ str: _, w: D, color: w.c }),
                  (M += D + f);
              }
            M -= f;
            var N = Math.ceil(M / n);
            N > S && (N = S),
              N > 1 ? ((b *= N), (M = A)) : (M = Math.floor(Math.max(M, m))),
              (M = Math.min(A, M));
            var I;
            p
              ? ((I = l),
                s.cfg.DIMENSION.H_T_T < u && (I += s.cfg.DIMENSION.W_T_L),
                c(M, b))
              : (c(M, b),
                s.cfg.DIMENSION.H_T_T > u - 1 &&
                  ((a.textAlign = "right"),
                  (a.fillStyle = s.cfg.COLOR.T_T),
                  a.fillText(i, l, y)),
                (I = l + (v > 0 ? d : 0))),
              (a.textAlign = "left");
            for (
              var C = I, R = 0, k = O.length;
              k > R &&
              ((w = O[R]),
              (a.fillStyle = w.color),
              a.fillText(w.str, I, y),
              (I += w.w + f),
              !(R >= k - 1));
              R++
            )
              I - l + O[R + 1].w > n && ((y += s.cfg.STYLE.FONT_SIZE), (I = C));
          } else
            s.cfg.DIMENSION.H_T_T < u && (l += s.cfg.DIMENSION.W_T_L),
              c(l, b),
              (a.fillStyle = s.cfg.COLOR.T_T),
              (a.textAlign = p ? "left" : "right"),
              a.fillText(i, l, y);
        }),
          this.setTxt();
      }
      function a() {
        var r = rt("div");
        this.canvas = r;
        var a = rt("div");
        (a.style.cssFloat = "left"),
          (a.style.textAlign = "right"),
          (a.style.marginRight = "9px"),
          (a.style.overflow = "hidden");
        var e = rt("div");
        r.appendChild(a), r.appendChild(e);
        var o = r.style;
        t.isFunc(s.proxyCfg.onClkTT) &&
          (t.xh5_deviceUtil.istd
            ? st.addHandler(r, "click", at(s.proxyCfg.onClkTT, null, s))
            : (st.addHandler(r, "click", at(s.proxyCfg.onClkTT, null, s)),
              t.xh5_deviceUtil.allowt &&
                st.addHandler(r, "touchend", at(s.proxyCfg.onClkTT, null, s))),
          (o.cursor = "pointer"),
          (o.position = "relative"),
          (o.zIndex = s.cfg.PARAM.I_Z_INDEX + 1));
        var l = s.cfg.datas.isT;
        (this.setTxt = function(r) {
          var n = l ? s.cfg.DIMENSION.w_t : s.cfg.DIMENSION.w_k,
            c = "TFLOW" == s.name ? 400 : 350,
            d = c > n ? 55 : 80,
            f = s.cfg.DIMENSION.extend_draw;
          (a.style.width = e.style.marginLeft = s.cfg.DIMENSION.posX + "px"),
            (o.color = s.cfg.COLOR.T_T),
            (o.fontSize = s.cfg.STYLE.FONT_SIZE + "px"),
            (o.fontFamily = s.cfg.STYLE.FONT_FAMILY);
          var u = i || "";
          if (r) {
            f
              ? ((a.innerHTML = ""),
                s.cfg.DIMENSION.H_T_T < 2 && (e.style.marginLeft = "50px"))
              : (a.innerHTML = s.cfg.DIMENSION.H_T_T > 1 ? u : ""),
              (e.innerHTML = "");
            for (var p, v, A, m = 0, g = r.length; g > m; m++)
              if (((v = r[m]), v.t || !isNaN(v.n))) {
                switch (s.name) {
                  case "DPDK":
                  case "TZY":
                    return;
                  case "TZYS":
                  case "DPDKS":
                  case "SAR":
                    if ("SAR" == s.name) {
                      if (!s.asPChart && "SAR" != v.t) continue;
                    } else if ("DPDKS" == s.name && "mn" == v.t) continue;
                    var b = "<span style='color:#000;'>--";
                    switch (v.t) {
                      case "SAR":
                        b += "</span>";
                        break;
                      default:
                        b += "%</span>";
                    }
                    if (((A = (v.t ? v.t + ": " : "") + b), !isNaN(v.n))) {
                      A = A.replace("--", t.strUtil.ps(v.n, h.nfloat));
                      var y;
                      (y =
                        "DPDK" == s.name || "SAR" == v.t
                          ? v.c
                          : v.n > 0
                          ? s.cfg.COLOR.K_RISE
                          : v.n < 0
                          ? s.cfg.COLOR.K_FALL
                          : s.cfg.COLOR.K_N),
                        (A = A.replace("#000", y));
                    }
                    break;
                  case "VOLUME":
                  case "TVOL":
                  case "MA":
                    A =
                      (v.t ? v.t + ": " : "") +
                      (isNaN(v.n) ? 0 : v.n.toFixed(h.nfloat));
                    break;
                  case "SUNSPOT":
                    A =
                      "SUNSPOT" === v.t
                        ? v.n
                          ? (v.t ? v.t + ": " : "") +
                            (isNaN(v.n) ? "--" : t.strUtil.ps(v.n, 0)) +
                            "\u7ea7"
                          : ""
                        : (v.t ? v.t + ": " : "") +
                          (isNaN(v.n) ? "--" : t.strUtil.ps(v.n, h.nfloat));
                    break;
                  default:
                    (A =
                      (v.t ? v.t + ": " : "") +
                      (isNaN(v.n) ? "--" : t.strUtil.ps(v.n, h.nfloat))),
                      "TFLOW" == s.name && m == r.length - 1 && (A += "\u5143");
                }
                (p = 11),
                  (e.innerHTML +=
                    "<span style='float:left;min-width:" +
                    d +
                    "px;margin-right:" +
                    p +
                    "px;color:" +
                    v.c +
                    "'>" +
                    A +
                    "</span>");
              }
          } else (a.innerHTML = f ? "" : u), (e.innerHTML = "");
        }),
          this.setTxt();
      }
      var s = this,
        e = this.proxyCfg.fixIdctW,
        h = this.proxyCfg.usrObj;
      return s.cfg.custom.indicator_cvs_title ? new r() : new a();
    }),
    (r.prototype.genIndicator = function(t, i) {
      if (t) {
        this.indicatorArr = [];
        for (var r = 0, a = t.length; a > r; r++) this.indicatorArr.push(t[r]);
        this.titleO ||
          ((this.titleO = this.genTitleCanvas(i)),
          this.titleCtn.appendChild(this.titleO.canvas));
      }
    }),
    (r.prototype.indicatorI = function(t) {
      if (this.indicatorArr) {
        for (var i, r, a = [], s = 0, e = this.indicatorArr.length; e > s; s++)
          (i = this.indicatorArr[s]),
            (r = t[i.prop]),
            "t" == this.proxyCfg.type &&
              ("volume" == i.prop || /^tvol\w+$/.test(i.prop)) &&
              t[i.prop] < 0 &&
              (r = 0),
            a.push({ n: r, c: i.color, t: i.idct });
        return this.titleO && this.titleO.setTxt(a), a;
      }
    }),
    (r.prototype.interact = function(t) {
      return !isNaN(t) && this.datas && this.datas.length
        ? (t >= this.datas.length && (t = this.datas.length - 1),
          this.indicatorI(this.datas[t]))
        : (this.titleO && this.titleO.setTxt(null), null);
    }),
    (r.prototype.rfs = function() {
      this.selfCfg.allowrfs
        ? (this.titleO && t.domGc(this.titleO.canvas),
          t.domGc(this.wrap),
          clearInterval(this.updateId))
        : (this.wrap.style.display = "none");
    });
  var bt = (function() {
    function t(t) {
      return null === t
        ? "Null"
        : void 0 === t
        ? "Undefined"
        : r.call(t).slice(8, -1);
    }
    function i(t, i, r) {
      switch (t) {
        case "+":
          return i + r;
        case "-":
          return i - r;
        case "*":
          return i * r;
        case "/":
          return r ? i / r : null;
      }
    }
    var r = Object.prototype.toString,
      a = Math.min,
      s = Math.max,
      e = Math.abs,
      h = function(t, i, r) {
        if (i) {
          for (var a = [], s = 0, e = t.length; e > s; s++)
            a.push(r ? r(t[s][i]) : t[s][i]);
          return a;
        }
        return t;
      },
      o = function(t) {
        for (var i = 0, r = t.length; r--; ) i += t[r];
        return i;
      },
      l = function(t, i) {
        for (var r, a = [], s = 0, e = 0, h = t.length; h > s; s++)
          t[s] && (e += t[s]),
            s >= i - 1
              ? ((r = e / i), t[s - i + 1] && (e -= t[s - i + 1]))
              : (r = e / (s + 1)),
            a.push(r);
        return a;
      },
      n = function(t, i) {
        for (var r = [t[0]], a = 1, s = t.length; s > a; a++)
          r.push((2 * t[a] + (i - 1) * r[a - 1]) / (i + 1));
        return r;
      },
      c = function(t, i, r) {
        for (var a = [t[0]], s = 1, e = t.length; e > s; s++)
          a.push((r * t[s] + (i - r) * a[s - 1]) / i);
        return a;
      },
      d = function(t, i) {
        for (var r = [], a = 0; i > a; a++) r.push(null);
        for (var s = t.length; s > a; a++) r.push(t[a - i]);
        return r;
      },
      f = function(t, i, r, a) {
        function s(t) {
          if (!(t >= n))
            if (
              ((c[t] = Math.min.apply(null, l.slice(t - i, t))),
              (u[t] = 1),
              c[t] > l[t])
            )
              e(t + 1);
            else
              for (
                f[t] = Math.max.apply(null, o.slice(t - i + 1, t + 1)),
                  d[t] = r;
                n - 1 > t;

              ) {
                if (
                  ((c[t + 1] = c[t] + (d[t] * (f[t] - c[t])) / 100),
                  (u[t + 1] = 1),
                  c[t + 1] > l[t + 1])
                )
                  return void e(t + 2);
                (f[t + 1] = Math.max.apply(null, o.slice(t - i + 2, t + 2))),
                  o[t + 1] > f[t]
                    ? ((d[t + 1] = d[t] + r), d[t + 1] > a && (d[t + 1] = a))
                    : (d[t + 1] = d[t]),
                  t++;
              }
        }
        function e(t) {
          if (!(t >= n)) {
            if (
              ((c[t] = Math.max.apply(null, o.slice(t - i, t))),
              (u[t] = 0),
              c[t] < o[t])
            )
              return void s(t + 1);
            for (
              f[t] = Math.min.apply(null, l.slice(t - i + 1, t + 1)), d[t] = r;
              n - 1 > t;

            ) {
              if (
                ((c[t + 1] = c[t] + (d[t] * (f[t] - c[t])) / 100),
                (u[t + 1] = 0),
                c[t + 1] < o[t + 1])
              )
                return void s(t + 2);
              (f[t + 1] = Math.min.apply(null, l.slice(t - i + 2, t + 2))),
                l[t + 1] < f[t]
                  ? ((d[t + 1] = d[t] + r), d[t + 1] > a && (d[t + 1] = a))
                  : (d[t + 1] = d[t]),
                t++;
            }
          }
        }
        var o = h(t, "high"),
          l = h(t, "low"),
          n = t.length,
          c = [],
          d = [],
          f = [],
          u = [];
        return (
          o[i] > o[0] || l[i] > l[0] ? s(i) : e(i), { data: c, direction: u }
        );
      },
      u = function(t) {
        for (var i = 0, r = t.length, a = r; a--; ) i += t[a];
        return i / r;
      },
      p = function(t, i) {
        for (var r = u(t), a = t.length, s = 0, e = a; e--; )
          s += Math.pow(t[e] - r, 2);
        return Math.sqrt(s / (i ? a - i : a));
      },
      v = function(t, i) {
        for (var r = [], a = 0, s = t.length; s > a; a++)
          r.push(
            i > a ? p(t.slice(0, a + 1), 1) : p(t.slice(a - i + 1, a + 1), 1)
          );
        return r;
      },
      A = function(t) {
        for (var i = u(t), r = 0, a = t.length, s = a; s--; ) r += e(t[s] - i);
        return r / a;
      },
      m = function(t, i) {
        for (var r = [], a = 0, s = t.length; s > a; a++)
          r.push(i > a ? A(t.slice(0, a + 1)) : A(t.slice(a - i + 1, a + 1)));
        return r;
      },
      g = function(t, i) {
        for (var r = [], a = t.length, e = s.apply(null, t), h = 0; a > h; h++)
          r.push(
            i
              ? s.apply(
                  null,
                  i > h ? t.slice(0, h + 1) : t.slice(h - i + 1, h + 1)
                )
              : e
          );
        return r;
      },
      b = function(t, i) {
        for (var r = [], s = t.length, e = a.apply(null, t), h = 0; s > h; h++)
          r.push(
            i
              ? a.apply(
                  null,
                  i > h ? t.slice(0, h + 1) : t.slice(h - i + 1, h + 1)
                )
              : e
          );
        return r;
      },
      y = function(i) {
        switch (t(i)) {
          case "Number":
            return e(i);
          case "Array":
            for (var r = [], a = 0, s = i.length; s > a; a++) r.push(e(i[a]));
            return r;
          default:
            throw new Error("argument of Function calcABS was error!");
        }
      },
      w = function(i, r) {
        var a, e, h;
        switch (t(i)) {
          case "Array":
            switch (t(r)) {
              case "Array":
                for (a = [], e = 0, h = i.length; h > e; e++)
                  a.push(s(i[e], r[e]));
                return a;
              case "Number":
                for (a = [], e = 0, h = i.length; h > e; e++)
                  a.push(s(i[e], r));
                return a;
              default:
                throw new Error("argument of Function calcMAX was error!");
            }
            break;
          case "Number":
            switch (t(r)) {
              case "Array":
                for (a = [], e = 0, h = r.length; h > e; e++)
                  a.push(s(i, r[e]));
                return a;
              case "Number":
                return s(i, r);
              default:
                throw new Error("argument of Function calcMAX was error!");
            }
            break;
          default:
            throw new Error("argument of Function calcMAX was error!");
        }
      },
      _ = function(t, i) {
        var r = [];
        if (i)
          for (var a = 0, s = t.length; s > a; a++)
            r.push(o(i > a ? t.slice(0, a + 1) : t.slice(a - i + 1, a + 1)));
        else {
          var e = 0;
          for (a = 0, s = t.length; s > a; a++) (e += t[a]), r.push(e);
        }
        return r;
      },
      D = function(r, a, s) {
        var e,
          h,
          o = [],
          l = r.length;
        switch (t(a)) {
          case "Array":
            for (h = a.length, e = 0; l > e; e++)
              o.push(
                "Number" == t(r[e]) && "Number" == t(a[e])
                  ? i(s, r[e], a[e])
                  : null
              );
            for (; o.length < h; ) o.push(null);
            break;
          case "Number":
            for (e = 0; l > e; e++)
              o.push("Number" == t(r[e]) ? i(s, r[e], a) : null);
            break;
          default:
            throw Error("the Second argument of Function operateArr is wrong!");
        }
        return o;
      };
    return {
      getArr: h,
      calcMA: l,
      calcEMA: n,
      calcSMA: c,
      calcREF: d,
      calcSAR: f,
      calcA: u,
      calcSD: p,
      calcSTD: v,
      calcAVEDEV: m,
      calcHHV: g,
      calcLLV: b,
      calcABS: y,
      calcMAX: w,
      calcSUM: _,
      operateArr: D
    };
  })();
  t.fInherit(a, r),
    t.fInherit(s, r),
    t.fInherit(e, r),
    t.fInherit(h, r),
    t.fInherit(o, r),
    t.fInherit(l, r),
    t.fInherit(n, r),
    t.fInherit(c, r),
    t.fInherit(d, r),
    t.fInherit(f, r),
    t.fInherit(u, r),
    t.fInherit(p, r),
    t.fInherit(v, r),
    t.fInherit(A, r),
    t.fInherit(m, A),
    t.fInherit(g, r),
    t.fInherit(b, r),
    t.fInherit(y, r),
    t.fInherit(w, r),
    t.fInherit(_, r),
    t.fInherit(D, r),
    t.fInherit(M, r),
    t.fInherit(O, r),
    t.fInherit(S, r),
    t.fInherit(T, r),
    t.fInherit(N, r),
    t.fInherit(MACD, r),
    t.fInherit(C, r),
    t.fInherit(R, D),
    t.fInherit(k, r),
    t.fInherit(P, r),
    t.fInherit(x, r),
    t.fInherit(E, r),
    t.fInherit(L, r),
    t.fInherit(U, r),
    t.fInherit(F, r),
    t.fInherit(H, r),
    t.fInherit(X, r),
    t.fInherit(B, r),
    t.fInherit(V, r),
    t.fInherit(j, X),
    t.fInherit($, r),
    t.fInherit(z, $),
    t.fInherit(W, r),
    t.fInherit(K, r),
    t.fInherit(G, r),
    t.fInherit(Y, r),
    t.fInherit(q, r);
  var yt = (function() {
    var i = function(t) {
        var i = function() {
            for (
              var t,
                i,
                r = { BF: o },
                a = [
                  { h: "http://127.0.0.1", a: r },
                  { h: "http://localhost", a: r },
                  { h: "http://xuan.sina.com.cn", a: r },
                  { h: "http://tmp.sina.com.cn", a: r },
                  { h: "https://touzi.sina.cn/", a: r },
                  { h: "http://touzi.sina.cn/", a: r },
                  { h: "https://touzi.sina.com.cn/", a: r },
                  { h: "http://touzi.sina.com.cn/", a: r }
                ],
                s = document.location.href,
                e = a.length;
              e--;

            )
              if (((i = a[e]), 0 === s.indexOf(i.h))) {
                t = i.a;
                break;
              }
            return t;
          },
          r = i();
        if (r && t) for (var a in r) r.hasOwnProperty(a) && (t[a] = r[a]);
      },
      r = function(i, r) {
        var a = i.name,
          s = i.param,
          e = r ? "r_" : "s_";
        t.stc(e + a, s);
      };
    return { doStc: r, auth: i };
  })();
  return new (function() {
    (this.VER = "6.6.5"),
      (this.get = function(i, r) {
        t.isFunc(r) && r({ tChart: J, pChart: Z });
      });
  })();
});
xh5_define("datas.k", ["utils.util"], function(e) {
  "use strict";
  var t = e.load,
    n = e.dateUtil,
    a = e.kUtil,
    i = e.xh5_S_KLC_D,
    o = 0 == location.protocol.indexOf("https:");
  return new (function() {
    this.VER = "2.7.2";
    var s = {
      CNKCB: {
        DAYK_URL:
          "http://quotes.sina.cn/cn/api/jsonp.php/$cb/KC_MarketDataService.getKLineData?symbol=$symbol"
      },
      CN: {
        MINK_URL:
          "http://quotes.sina.cn/cn/api/jsonp_v2.php/$cb/CN_MarketDataService.getKLineData?symbol=$symbol&scale=$scale&ma=no&datalen=1023",
        DAYK_URL:
          "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?d=$rn",
        DAYK_RE_URL:
          "http://finance.sina.com.cn/realstock/company/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq"
      },
      HK: {
        MINK_URL: "",
        DAYK_URL:
          "http://finance.sina.com.cn/stock/hkstock/$symbol/klc_kl.js?d=$rn",
        DAYK_RE_URL:
          "http://finance.sina.com.cn/stock/hkstock/$symbol/$dirfq.js",
        RE_VAR: "$symbol$dirfq"
      },
      US: {
        MINK_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinKService.getMinK?symbol=$symbol&type=$scale&___qn=3",
        DAYK_URL: "http://finance.sina.com.cn/staticdata/us/$symbol",
        DAYK_RE_URL:
          "https://finance.sina.com.cn/us_stock/company/reinstatement/$symbol_$dirfq.js",
        RE_VAR: "$symbol_$dirfq"
      },
      option_cn: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp_v2.php/$cb/StockOptionDaylineService.getSymbolInfo?symbol=$symbol"
      },
      op_m: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/FutureOptionAllService.getOptionDayline?symbol=$symbol"
      },
      forex: {
        DAYK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen"
      },
      forex_yt: {
        DAYK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getDayKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/$cb/NewForexService.getOldMinKline?symbol=$symbol&scale=$scale&datalen=$datalen"
      },
      OTC: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/thirdmarket/api/jsonp.php/$cb/ThirdDataService.ThirdDailyData?symbol=$symbol&_=$rn"
      },
      CFF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesDailyKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/CffexFuturesService.getCffexFuturesMiniKLine$scalem?symbol=$symbol&_=$rn"
      },
      HF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/GlobalFuturesService.getGlobalFuturesDailyKLine?symbol=$symbol&_=$rn&source=web",
        INIT_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=hf&symbol=$symbol",
        MINK_URL:
          "http://gu.sina.cn/ft/api/jsonp.php/$cb/GlobalService.getMink?symbol=$symbol&type=$scale",
        INIT_VAR_PRE: "kke_future_"
      },
      NF: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getDailyKLine?symbol=$symbol&_=$rn",
        MINK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/InnerFuturesNewService.getFewMinLine?symbol=$symbol&type=$scale",
        INIT_URL:
          "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb/InterfaceInfoService.getMarket?category=nf&symbol=$symbol",
        INIT_VAR_PRE: "kke_future_"
      },
      global_index: {
        DAYK_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getDayLine?symbol=$symbol&num=100",
        INIT_URL:
          "http://stock.finance.sina.com.cn/usstock/api/jsonp.php/$cb/Global_IndexService.getTradeTime?symbol=$symbol&category=index",
        INIT_VAR_PRE: "kke_global_index_"
      },
      GOODS: {
        DAYK_URL:
          "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb/SpotService.getDaily?symbol=$symbol"
      },
      BTC: {
        DAYK_URL:
          "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getDayKLine?symbol=$symbol&callback=$cb",
        MINK_URL:
          "http://quotes.sina.cn/fx/api/openapi.php/BtcService.getMinKline?symbol=$symbol&scale=$scale&datalen=$datalen&callback=$cb"
      },
      LSE: {
        DAYK_URL:
          "http://quotes.sina.cn/lse/api/jsonp.php/$cb/LSEService.getDays?symbol=$symbol"
      },
      MSCI: { DAYK_URL: "http://finance.sina.com.cn/staticdata/msci/$symbol" }
    };
    s.REPO = s.CN;
    var r = function() {
        return { msg: "", data: null };
      },
      l = function(datas, i, o) {
        var s = A(o),
          r = o.symbol,
          l = o.newthour,
          c = 1,
          h = s.market;
        "CN" == h &&
          (c = i && /[gz]/.test(i.type) ? 10 : e.isRepos(r) ? 10 : 100),
          e.isRepos(r) && (c = 10),
          e.isCNK(r) && (c = 1),
          datas || (datas = []);
        var d = 0 / 0,
          u = "";
        if (i && i.date) {
          var p,
            m = i.date,
            f = !1;
          if (
            (datas.length > 0
              ? ((p = datas[datas.length - 1]), m || (m = p.date))
              : (f = !0),
            p)
          )
            if ("NF" === h || "GOODS" === h)
              n.stbd(p.date, m)
                ? 1 != i.iscff && i.withNight && i.time >= l
                  ? (f = !0)
                  : i.open &&
                    i.price &&
                    ((p.open = i.open),
                    (p.high = i.high),
                    (p.low = i.low),
                    (p.close = i.price),
                    (p.volume = i.totalVolume * c))
                : m < p.date || (f = !0);
            else if (n.stbd(p.date, m))
              "hf_CHA50CFD" === i.symbol && i.time >= l
                ? (f = !0)
                : i.date &&
                  i.open &&
                  i.price &&
                  ((p.open = i.open),
                  (p.high = i.high),
                  (p.low = i.low),
                  (p.close = i.price),
                  (p.volume = i.totalVolume * c),
                  (p.date = n.ddt(m)),
                  (p.postAmt = i.postAmount),
                  (p.postVol = i.postVolume * c));
            else if (m < p.date);
            else if (l)
              if ("hf_CHA50CFD" === i.symbol) f = !0;
              else if (i.time >= l) f = !0;
              else {
                var v = (m - p.date) / 1e3 / 24 / 60 / 60;
                f = v >= 2;
              }
            else f = !0;
          if (f) {
            var g = i.totalVolume * c;
            datas.push({
              open: i.open,
              high: i.high,
              low: i.low,
              close: i.price,
              volume: g,
              date: n.ddt(m),
              postAmt: i.postAmount,
              postVol: i.postVolume
            });
          }
          (d = i.issueprice), (u = i.name);
        }
        if (datas.length < 1) return [datas, void 0, void 0, void 0];
        var b = !isNaN(d) && d > 0 ? d : datas[0].open;
        e.oc(datas[0], { prevclose: b, name: u, symbol: r });
        var y = a.mw(datas, i, b, c, s.endDay),
          N = y[0],
          _ = y[1],
          w = y[2],
          M = void 0;
        if (
          (a.pd(datas, null),
          a.pd(N, null),
          a.pd(_, null),
          a.pd(w, null),
          i && i.settlement)
        ) {
          var k = datas[datas.length - 1];
          (k.ampP = k.amplitude / i.settlement),
            (k.change = k.close - i.settlement),
            (k.percent = k.change / i.settlement);
        }
        return (
          e.oc(N[0], { name: u, symbol: r }),
          e.oc(_[0], { name: u, symbol: r }),
          e.oc(w[0], { name: u, symbol: r }),
          o.ytd && ((M = a.yd(datas)), e.oc(M[0], { name: u, symbol: r })),
          [datas, N, _, M, w]
        );
      },
      c = function(t, n, a) {
        var i = e.market(t),
          r = i ? s[i][n ? "MINK_URL" : "DAYK_URL"] : null;
        return (o || a) && (r = e.getSUrl(r)), r;
      },
      h = function(t, n) {
        var a,
          i,
          r = e.market(t);
        return (
          s[r] && ((a = s[r].DAYK_RE_URL), (i = s[r].RE_VAR)),
          a && (o || n) && (a = e.getSUrl(a)),
          { url: a, VAR: i, market: r }
        );
      },
      d = function(t, n) {
        var a,
          i,
          r,
          l = e.market(t);
        return (
          s[l] &&
            ((a = s[l].INIT_URL), (i = s[l].INIT_VAR), (r = s[l].INIT_VAR_PRE)),
          a && (o || n) && (a = e.getSUrl(a)),
          { url: a, VAR: i, varPre: r, market: l }
        );
      },
      u = {
        xh5Fund: function(e) {
          for (
            var t,
              n,
              a,
              i,
              o = new Date(),
              s = [o.getFullYear(), o.getMonth() + 1, o.getDate()].join("_"),
              r = e.data,
              l = e.symbol,
              c = r.split("#"),
              h = [],
              d = [],
              u = [],
              p = [],
              m = [],
              f = [],
              v = c.length;
            v--;

          )
            (i = c[v].split(",")),
              (t = i[0].slice(0, 4)),
              (n = i[0].slice(4, 6)),
              (a = i[0].slice(6, 8)),
              (a = [t, n, a].join("-")),
              h.push({ d: a, c: i[1] }),
              d.push({ d: a, c: i[2] }),
              u.push({ d: a, c: i[3] }),
              p.push({ d: a, c: i[4] }),
              m.push({ d: a, c: i[5] }),
              f.push({ d: a, c: i[6] });
          var g = ["_dwjz_", l, s].join(""),
            b = ["_ljjz_", l, s].join(""),
            y = ["_lshb_", l, s].join(""),
            N = ["_pwbfbyd_", l, s].join(""),
            _ = ["_pwbfbjd_", l, s].join(""),
            w = ["_pwbfbnd_", l, s].join(""),
            M = ["_fh_", l, s].join("");
          (window[g] = h),
            (window[b] = d),
            (window[y] = u),
            (window[N] = p),
            (window[_] = m),
            (window[w] = f),
            (window[M] = {
              fhday: e.fhday,
              fhvalue: e.fhvalue,
              fhchaifen: e.fhchaifen
            });
        }
      },
      p = function(e) {
        var t = [];
        if (e)
          for (var n, a, i = 0, o = e.length; o > i; i++) {
            (a = e[i]), (n = Number(a.c));
            var s = a.d.split("-");
            t.push({
              close: n,
              open: Number(a.o) || n,
              high: Number(a.h) || n,
              low: Number(a.l) || n,
              volume: Number(a.v) || 0,
              date: new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2]), 0),
              postVol: Number(a.pv) || 0,
              postAmt: Number(a.pa) || 0
            });
          }
        return t;
      },
      m = function(e) {
        var t = [];
        if (e)
          for (var n, a, i = e.split("|"), o = 0, s = i.length; s > o; o++)
            (n = i[o].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                t.push({
                  open: Number(n[1]),
                  low: Number(n[2]),
                  high: Number(n[3]),
                  close: Number(n[4]),
                  volume: Number(n[5]),
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  )
                }));
        return t;
      },
      f = function(e) {
        var t = [];
        if (e && e.result && e.result.data)
          for (
            var n, a, i = e.result.data, o = i.split("|"), s = 0, r = o.length;
            r > s;
            s++
          )
            (n = o[s].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                t.push({
                  open: Number(n[1]),
                  low: Number(n[2]),
                  high: Number(n[3]),
                  close: Number(n[4]),
                  volume: Number(n[5]),
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  )
                }));
        return t;
      },
      v = function(e) {
        var t = [];
        if (e && e.length)
          for (
            var n, a, i = 0.001, o = e.split("|"), s = 0, r = 0, l = o.length;
            l > r;
            r++
          )
            (n = o[r].split(",")),
              n.length < 5 ||
                ((a = n[0].split("-")),
                (s = Number(n[4]) || s),
                t.push({
                  open: Number(n[1]) || s,
                  low: Number(n[2]) || s,
                  high: Number(n[3]) || s,
                  close: Number(n[4]) || s,
                  volume: Number(n[5]) * i,
                  date: new Date(
                    Number(a[0]),
                    Number(a[1]) - 1,
                    Number(a[2]),
                    0
                  )
                }));
        return t;
      },
      g = function(e) {
        var t = [];
        if (e)
          for (var n, a, i, o = 0, s = e.length; s > o; o++)
            (n = e[o]),
              (a = n[0].split("-")),
              (i = Number(n[4])),
              t.push({
                date: new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]), 0),
                open: Number(n[1]) || i,
                high: Number(n[2]) || i,
                low: Number(n[3]) || i,
                close: i,
                volume: Number(n[5]) || 0
              });
        return t;
      },
      b = function(e) {
        var t = [];
        if (e)
          for (var n, a, i = e.length; i--; )
            (n = e[i]),
              (a = Number(n[4])),
              t.push({
                day: n[0],
                open: Number(n[1]) || a,
                high: Number(n[2]) || a,
                low: Number(n[3]) || a,
                close: a,
                volume: Number(n[5]) || 0
              });
        return t;
      },
      y = function(e) {
        var t = [];
        if (e)
          for (var a, i, o = 0, s = e.length; s > o; o++)
            (a = e[o]),
              (i = Number(a.close)),
              t.push({
                date: n.sd(a.date),
                volume: Number(a.volume),
                open: Number(a.open) || i,
                high: Number(a.high) || i,
                low: Number(a.low) || i,
                close: i
              });
        return t;
      },
      N = function(e, t) {
        if (!e) return null;
        for (var n, a = t.vu || 1, i = 0, o = e.length; o > i; i++)
          (n = e[i]),
            (n.high *= 1),
            (n.open *= 1),
            (n.low *= 1),
            (n.close *= 1),
            (n.volume *= a);
        return e;
      },
      _ = function(e) {
        if (!e) return null;
        for (var t, a = 0, i = e.length; i > a; a++)
          (t = e[a]),
            (t.high = 1 * t.h),
            (t.open = 1 * t.o),
            (t.low = 1 * t.l),
            (t.close = 1 * t.c),
            (t.volume = 1 * t.v),
            (t.day = t.d),
            (t.date = n.sd(t.d));
        return e;
      },
      w = function(e) {
        if (!e) return null;
        for (var t, a = 0, i = e.length; i > a; a++)
          (t = e[a]),
            (t.high = 1 * t.h),
            (t.open = 1 * t.o),
            (t.low = 1 * t.l),
            (t.close = 1 * t.c),
            (t.volume = 1 * t.v),
            (t.date = n.sd(t.d));
        return e;
      },
      M = function(t, a, i, o) {
        for (
          var s,
            r,
            l = e.market(o.hqSb),
            c = "BTC" == l ? 0 : ("DINIW" == o.hqSb, 6),
            h = a.length;
          h-- && 0 != h;

        )
          for (
            var d = a[h],
              u = a[h - 1],
              p = n.ssd(d.day),
              m = n.ssd(u.day),
              f = h;
            m.setMinutes(m.getMinutes() + i) < p;

          ) {
            if (((s = m.getDay()), 6 == s)) {
              if (((r = m.getHours()), r >= c)) continue;
            } else {
              if (0 == s) continue;
              if (1 == s && ((r = m.getHours()), c > r)) continue;
            }
            var v = e.clone(u, null);
            (v.day = n.dss(m)), a.splice(f++, 0, v);
          }
        for (
          var g = a[a.length - 1], b = n.ssd(g.day);
          b.setMinutes(b.getMinutes() + i) < t;

        ) {
          if (((s = b.getDay()), 6 == s)) {
            if (((r = b.getHours()), r >= c)) continue;
          } else {
            if (0 == s) continue;
            if (1 == s && ((r = b.getHours()), c > r)) continue;
          }
          var y = {
            open: g.close,
            high: g.close,
            low: g.close,
            close: g.close,
            day: n.dss(b),
            prevclose: g.prevclose
          };
          "BTC" == l && (y.volume = 0), a.push(y), (g = y), (b = n.ssd(g.day));
        }
      },
      k = function(t, a, i) {
        var o = e.market(i.hqSb),
          s = "BTC" == o ? 0 : ("DINIW" == i.hqSb, 6),
          r = a[a.length - 1].day,
          l = r.split(" ")[0];
        if (n.stbds(t.date, l, null)) {
          var c,
            h,
            d,
            u = t.prevclose,
            p = t.date.getHours();
          if (s > p) {
            var m,
              f = !1;
            for (
              c = a.length;
              c-- &&
              ((m = !1),
              (d = a[c]),
              (h = Number(d.day.split(" ")[1].split(":")[0])),
              !f && s > h ? (m = !0) : h >= s && ((f = !0), (m = !0)),
              m);

            )
              d.prevclose = u;
          } else
            for (
              c = a.length;
              c-- &&
              ((d = a[c]),
              (h = Number(d.day.split(" ")[1].split(":")[0])),
              h >= s);

            )
              d.prevclose = u;
        }
      },
      S = function(t, a) {
        if (!t) return null;
        var i,
          o,
          s = Number(a.scale),
          r = e.market(a.hqSb);
        a.hqObjs &&
          ((i = a.hqObjs[a.hqSb]),
          (o = new Date(1e3 * a.hqObjs[a.withsymbol].hqstr))),
          o || (o = new Date());
        var l = 60 * o.getTimezoneOffset() * 1e3;
        o.setTime(o.getTime() + l), o.setHours(o.getHours() + 8);
        for (var c, h, d = 0, u = t.length; u > d; d++)
          if (
            ((h = t[d]),
            (h.high = 1 * h.h),
            (h.open = 1 * h.o),
            (h.low = 1 * h.l),
            (h.close = 1 * h.c),
            "BTC" == r && (h.volume = 1 * h.v),
            s > 1)
          ) {
            var p = n.ssd(h.d);
            p.setMinutes(p.getMinutes() + s), (h.day = n.dss(p));
          } else
            (h.day = h.d),
              isNaN(h.p) || (c = h.p),
              isNaN(c) && (c = h.o),
              (h.prevclose = 1 * c);
        return M(o, t, s, a), 1 == s && i && k(i, t, a), t;
      },
      L = function(e, t) {
        return e && e.result && e.result.data
          ? ((e = e.result.data), S(e, t))
          : null;
      },
      A = function(t) {
        var n,
          a = t.symbol,
          i = t.volunit || 1,
          o = e.market(a),
          r = !1;
        t.dataurl && t.dataurl.length > 1
          ? (n = t.dataurl)
          : (/^(CN|HK|US|REPO|MSCI)/.test(o) && (r = !0),
            e.isCNK(t.symbol) && ((r = !1), (s.CN.DAYK_URL = s.CNKCB.DAYK_URL)),
            (n = c(a, !!t.ismink, t.ssl)));
        var l,
          h,
          endDay,
          u = a,
          N = a;
        switch (o) {
          case "HK":
            (u = 0 == a.indexOf("rt_") ? a : "rt_" + a), (N = u.substring(5));
            break;
          case "US":
            (u = 0 == a.indexOf("gb_") ? a : "gb_" + a),
              (N = u.split("_")[1]),
              (N = N.replace("$", ".")),
              (N = N.toUpperCase()),
              (l = _);
            break;
          case "op_m":
            N = u.replace("P_OP_", "");
            break;
          case "CN":
          case "REPO":
            (i = 0.01), e.isCNK(u) && (i = 1);
            break;
          case "forex":
          case "forex_yt":
            (l = S), (h = m), (endDay = 5);
            break;
          case "BTC":
            (N = u.replace("btc_", "")), (l = L), (h = f), (endDay = 5);
            break;
          case "OTC":
            (N = a.replace("sb", "otc_")), (h = v);
            break;
          case "CFF":
            var M = u.split("_");
            (N = M[M.length - 1]), (h = g), (l = b);
            break;
          case "HF":
            (u = 0 == a.indexOf("hf_") ? a : "hf_" + a),
              (N = u.split("_")[1]),
              (h = y),
              (l = _);
            break;
          case "NF":
            (u = 0 == a.indexOf("nf_") ? a : "nf_" + a),
              (N = u.split("_")[1]),
              (h = p),
              (l = _);
            break;
          case "global_index":
            (u = 0 == a.indexOf("znb_") ? a : "znb_" + a),
              (N = u.split("_")[1]),
              (h = w);
            break;
          case "LSE":
            (u = 0 == a.indexOf("lse_") ? a : "lse_" + a),
              (N = u.split("_")[1]),
              (u = e.strUtil.replaceStr(u)),
              (h = w);
            break;
          case "MSCI":
            (u = 0 == a.indexOf("msci_") ? a : "msci_" + a),
              (N = a.replace("msci_", "")),
              (h = p);
            break;
          case "GOODS":
            (u = 0 == a.indexOf("gds_") ? a : "gds_" + a),
              (N = u.split("_")[1]),
              (h = w);
        }
        return (
          t.customksb && (N = t.customksb),
          {
            hqSb: u,
            kSb: N,
            dayDataHandler: h,
            minDataHandler: l,
            endDay: "2019-12-25" || window.chooseDate || endDay,
            kUrl: n,
            isCompressData: r,
            vu: i,
            market: o
          }
        );
      },
      I = function(n, i) {
        var o = A(n),
          s = new Date(),
          l = [s.getFullYear(), s.getMonth() + 1, s.getDate()].join("_"),
          c = n.scale,
          h = n.$scale || "$scale",
          d = n.datalen || 828,
          u = "_" + o.kSb.replace(/\W/g, "") + "_" + c + "_" + s.getTime(),
          p = function(s) {
            var p = s ? s.dataObj : void 0,
              m = r();
            t(
              o.kUrl
                .replace("$symbol", o.kSb)
                .replace(h, c)
                .replace("$cb", "var%20" + u + "=")
                .replace("$rn", l)
                .replace("$datalen", d),
              function() {
                var t = window[u],
                  s = n.dataformatter || o.minDataHandler || N;
                if (
                  (t = s(t, {
                    vu: o.vu,
                    withsymbol: n.withsymbol,
                    hqSb: o.hqSb,
                    hqObjs: p,
                    scale: c
                  }))
                ) {
                  var r = {};
                  1 == c &&
                    (/^forex/.test(o.market) || /^BTC/.test(o.market)) &&
                    (r.usePc = !0),
                    a.pd(t, r),
                    (m.data = t);
                } else m.msg = "error";
                e.isFunc(i) && i(m);
              },
              function() {
                (m.msg = "error"), e.isFunc(i) && i(m);
              },
              { market: o.market, symbol: o.hqSb, type: "mink" }
            );
          };
        n.withsymbol
          ? KKE.api(
              "datas.hq.get",
              {
                symbol: [n.withsymbol, o.hqSb].join(","),
                cancelEtag: !0,
                ssl: n.ssl
              },
              p
            )
          : p();
      };
    window.RELOAD_DK_DATA = 1;
    var x = function(n, a) {
        var o = A(n),
          s = function(s) {
            var c = s ? s.data[0] : void 0,
              h = r(),
              d = new Date(),
              u = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("_"),
              m = "_" + o.kSb.replace(/\W/g, "") + u,
              f = "MSCI" === o.market || "US" === o.market ? "K2_" : "KL_";
            if (0 === window.RELOAD_DK_DATA) {
              if (window.RELOAD_DK_SYMBOL === o.kSb) return;
            } else
              (window.RELOAD_DK_DATA = 0), (window.RELOAD_DK_SYMBOL = o.kSb);
            t(
              o.kUrl
                .replace("$symbol", o.kSb)
                .replace("$rn", u)
                .replace("$cb", "var%20" + m + "="),
              function() {
                var t;
                if (o.isCompressData) {
                  var s = o.kSb.replace(".", "$");
                  (t = window["KLC_" + f + s]), (t = i(t));
                } else {
                  t = window[m];
                  var r = n.dataformatter || o.dayDataHandler || p;
                  t = r(t);
                }
                /*  if (window.chooseDate && window.showChooseDate) {
                  let dt = new Date(window.chooseDate).getTime();
                  t = t.filter(d => d.date.getTime() <= dt);
                }*/

                var d = l(t, c, n);
                d
                  ? (h.data = {
                      hq: c,
                      day: d[0],
                      week: d[1],
                      month: d[2],
                      ytd: d[3] || null,
                      year: d[4]
                    })
                  : (h.msg = "error"),
                  e.isFunc(a) && a(h);
              },
              function() {
                if (c) {
                  var t = l(null, c, n);
                  t
                    ? (h.data = {
                        hq: c,
                        day: t[0],
                        week: t[1],
                        month: t[2],
                        ytd: t[3] || null,
                        year: t[4]
                      })
                    : (h.msg = "error"),
                    e.isFunc(a) && a(h);
                } else
                  (h.msg = "error"), (h.data = { hq: c }), e.isFunc(a) && a(h);
              },
              { market: o.market, symbol: o.hqSb, type: "k" }
            );
          };
        "undefined" == typeof o.market || "UNKNOWN" === o.market
          ? s()
          : KKE.api(
              "datas.hq.get",
              { symbol: o.hqSb, cancelEtag: !0, withI: !0, ssl: n.ssl },
              s
            );
      },
      R = function(t, n) {
        var i = t.staticdata,
          o = r();
        if (t.ismink) a.pd(i, null), (o.data = i);
        else {
          var s = l(i, null, t);
          o.data = {
            day: s[0],
            week: s[1],
            month: s[2],
            ytd: s[3] || null,
            year: s[4]
          };
        }
        e.isFunc(n) && n(o);
      };
    this.get = function(t, n) {
      console.log(t);
      t.staticdata
        ? R(t, n)
        : (t.wfn && e.isFunc(u[t.wfn]) && (window[t.wfn] = u[t.wfn]),
          t.ismink ? I(t, n) : x(t, n));
    };
    this.loadReData = function(n, a) {
      var i = r(),
        o = {
          HK: n.symbol.replace("rt_hk", ""),
          US: n.symbol
            .replace("gb_", "")
            .replace("$", ".")
            .toUpperCase(),
          CN: n.symbol
        }[n.market.toUpperCase()],
        s = h(n.symbol, n.ssl),
        l = s.url;
      if (!l) return (i.msg = "error"), void (e.isFunc(a) && a(i));
      var c = n.dir,
        d = s.VAR || "";
      (d = d
        .replace("$symbol", o)
        .replace("$dir", c)
        .replace(".", "$")),
        "HK" === n.market && (d = "hk" + d);
      var u = new Date(),
        p = u.getHours();
      t(
        l
          .replace("$symbol", o)
          .replace("$dir", c)
          .replace("$rn", p),
        function() {
          var t = window[d];
          (window[d] = null),
            t && t.total > 0 ? (i.data = t.data) : (i.msg = "error"),
            e.isFunc(a) && a(i);
        },
        function() {
          (i.msg = "error"), e.isFunc(a) && a(i);
        },
        { market: s.market, symbol: o, type: "rek" }
      );
    };
    this.loadHFInit = function(n, a) {
      var i = r(),
        o = n.symbol,
        s = d(o, n.ssl),
        l = s.url,
        c = s.varPre,
        h = c + o,
        u = window[h];
      u
        ? ((i.data = u), e.isFunc(a) && a(i))
        : ((o = o.split("hf_")[1]),
          t(
            l.replace("$cb", "var%20" + h + "=").replace("$symbol", o),
            function() {
              (u = window[h]),
                u
                  ? (i.data = u)
                  : ((window[h] = null), (i.msg = "error, illegal data")),
                e.isFunc(a) && a(i);
            },
            function() {
              (i.msg = "error"), e.isFunc(a) && a(i);
            },
            { market: s.market, symbol: o, type: "init_hf" }
          ));
    };
    this.loadNFInit = function(n, a) {
      var i = r(),
        o = n.symbol,
        s = d(o, n.ssl),
        l = s.url,
        c = s.varPre,
        h = c + o,
        u = window[h];
      u
        ? ((i.data = u), e.isFunc(a) && a(i))
        : ((o = o.match(/^nf_([a-zA-Z]+)\d+$/)[1]),
          t(
            l.replace("$cb", "var%20" + h + "=").replace("$symbol", o),
            function() {
              (u = window[h]),
                u
                  ? (i.data = u)
                  : ((window[h] = null), (i.msg = "error, illegal data")),
                e.isFunc(a) && a(i);
            },
            function() {
              (i.msg = "error"), e.isFunc(a) && a(i);
            },
            { market: s.market, symbol: o, type: "init_nf" }
          ));
    };
    this.loadGBInit = function(n, a) {
      var i = r(),
        o = n.symbol,
        s = d(o, n.ssl),
        l = s.url,
        c = s.varPre,
        h = c + o,
        u = window[h];
      u
        ? ((i.data = u), e.isFunc(a) && a(i))
        : ((o = o.split("znb_")[1]),
          t(
            l.replace("$cb", "var%20" + h + "=").replace("$symbol", o),
            function() {
              (u = window[h]),
                u
                  ? (i.data = u)
                  : ((window[h] = null), (i.msg = "error, illegal data")),
                e.isFunc(a) && a(i);
            },
            function() {
              (i.msg = "error"), e.isFunc(a) && a(i);
            },
            { market: s.market, symbol: o, type: "init_global" }
          ));
    };
  })();
});
xh5_define(
  "chart.h5k",
  ["cfgs.settinger", "utils.util", "utils.painter"],
  function(e, t, n) {
    "use strict";
    function i(i) {
      function a(e, n) {
        function a(e) {
          D.setDataRange(e),
            M && (M.linkData(e), M.setDataRange()),
            N && (N.linkData(e), N.setDataRange()),
            S && (S.linkData(e), S.setDataRange());
        }
        function l(e, t) {
          var n,
            i,
            a = _.get(b.URLHASH.KD),
            o = a.length;
          e || (n = 0), t || (i = o - 1);
          for (
            var s = 0;
            o > s &&
            (isNaN(n) && a[s].date >= e && (n = s),
            isNaN(i) && a[s].date >= t && (i = s),
            isNaN(n) || isNaN(i));
            s++
          );
          return [n, i];
        }
        function c() {
          n && (T = _),
            F.uUpdate(null, !0),
            "CN" !== u ||
              /^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol) ||
              _.initExtraData();
        }
        e = p(
          {
            symbol: void 0,
            datas: {
              day: {
                wfn: void 0,
                url: void 0,
                dataformatter: void 0,
                staticdata: void 0
              },
              min: {
                wfn: void 0,
                url: void 0,
                dataformatter: void 0,
                staticdata: void 0
              }
            }
          },
          e || {}
        );
        var h = this,
          u = t.market(e.symbol),
          g = !0;
        (this.isErr = !1), (this.symbol = e.symbol), (this.market = u);
        var y;
        switch (u) {
          case "forex":
          case "forex_yt":
            "DINIW" == this.symbol, (y = "06:00");
            break;
          case "BTC":
            y = "00:00";
            break;
          case "LSE":
            y = "08:00";
            break;
          default:
            y = "09:30";
        }
        (this.isMain = n),
          (this.isCompare = !1),
          (this.datas = null),
          (this.dataLen = 0),
          (this.nfloat = e.nfloat || 2),
          (this.dataLenOffset = 0),
          (this.prevclose = 0 / 0),
          (this.labelMaxP = 0),
          (this.labelMinP = Number.MAX_VALUE),
          (this.maxPrice = 0),
          (this.minPrice = Number.MAX_VALUE),
          (this.rangeMax = 0),
          (this.rangeMin = Number.MAX_VALUE),
          (this.labelMaxVol = 0),
          (this.maxVolume = 0),
          (this.minPercent = Number.MAX_VALUE),
          (this.maxPercent = -Number.MAX_VALUE),
          (this.labelPriceCount = 0 / 0),
          (this.isTotalRedraw = !0),
          (this.hq = void 0),
          (this.nco = void 0);
        var M,
          N,
          S,
          L = new w(this, e),
          x = e.name;
        (this.getName = function() {
          return x || "";
        }),
          (this.viewState = V);
        var _ = new (function() {
            var a,
              o = {},
              s = { rsAmount: void 0 },
              r = function(e, i, s, r, l) {
                if (i) {
                  if (n) {
                    if (
                      (e == b.URLHASH.KD && (a = t.clone(i, null)),
                      r && window.datelist && h.hq)
                    ) {
                      var c = t.xh5_S_KLC_D(window.datelist);
                      i = t.kUtil.ayd(i, c, !1, i[0].date, h.hq.date);
                    }
                  } else
                    l ||
                      (e == b.URLHASH.KD && (a = t.clone(i, null)),
                      (i = t.kUtil.adbd(i, T.get(e), s, !1)));
                  o["k" + e] = i;
                  var d = i.length,
                    u = r ? I.PARAM.K_CL_NUM : I.PARAM.defaultCandleNum;
                  (o["k" + e + "v"] = d > u ? d - u : 0),
                    (o["k" + e + "b"] = d);
                }
              },
              l = function() {
                var e = V.viewId;
                switch (e) {
                  case b.URLHASH.KDF:
                  case b.URLHASH.KDB:
                    e = b.URLHASH.KD;
                    break;
                  case b.URLHASH.KWF:
                  case b.URLHASH.KWB:
                    e = b.URLHASH.KW;
                    break;
                  case b.URLHASH.KMF:
                  case b.URLHASH.KMB:
                    e = b.URLHASH.KM;
                    break;
                  case b.URLHASH.KYF:
                  case b.URLHASH.KYB:
                    e = b.URLHASH.KY;
                    break;
                  case b.URLHASH.KCLF:
                  case b.URLHASH.KCLB:
                    e = b.URLHASH.KCL;
                }
                return e;
              };
            (this.get = function(e) {
              if (t.isStr(e)) {
                var n = l();
                return o["k" + n + e];
              }

              let ret = o["k" + (e || V.viewId)];
              if (ret && window.chooseDate && window.cutChooseDate) {
                let dt = new Date(window.chooseDate).getTime();
                return ret.filter(d => d.date.getTime() <= dt);
              }

              return ret;
            }),
              (this.set = function(e, t) {
                var n = l(),
                  i = "k" + n + e;
                "undefined" != typeof o[i] && (o[i] = t);
              }),
              (this.getOriDK = function() {
                return a;
              }),
              (this.initState = r),
              (this.initDWMState = function(e, n) {
                var i = t.clone(n.day, null);
                r(b.URLHASH.KD, n.day),
                  r(b.URLHASH.KW, n.week),
                  r(b.URLHASH.KM, n.month),
                  r(b.URLHASH.KCL, i, !1, !0),
                  r(b.URLHASH.KY, n.year);
              }),
              (this.extraDataObj = s),
              (this.initExtraData = function() {
                var n =
                  "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol";
                i.ssl && (n = t.getSUrl(n));
                var a = "KKE_ShareAmount_" + e.symbol;
                t.load(
                  n
                    .replace("$symbol", e.symbol)
                    .replace("$rn", String(new Date().getDate()))
                    .replace("$cb", "var%20" + a + "="),
                  function() {
                    var e = window[a];
                    if (e) {
                      for (var t, n = [], i = e.length; i--; )
                        (t = e[i]),
                          n.push({
                            amount: Number(t.amount),
                            date: m.sd(t.date)
                          });
                      n.length && (s.rsAmount = n);
                    }
                  }
                );
              }),
              (this.gc = function() {
                (o = null), (s = null);
              });
          })(),
          D = new (function() {
            var e = function() {
                (h.minPrice = Number.MAX_VALUE),
                  (h.maxPrice = -Number.MAX_VALUE),
                  (h.minPercent = Number.MAX_VALUE),
                  (h.maxPercent = -Number.MAX_VALUE),
                  (h.maxVolume = 0),
                  (h.rangeMax = 0),
                  (h.rangeMin = Number.MAX_VALUE);
              },
              t = function() {
                for (var e, t = 0, n = h.dataLen; n > t; t++)
                  (e = h.datas[t]),
                    e.close <= 0 ||
                      (e.high > h.maxPrice &&
                        (h.maxPrice = h.rangeMax = e.high),
                      e.low < h.minPrice && (h.minPrice = h.rangeMin = e.low),
                      (h.maxVolume = Math.max(h.maxVolume, e.volume)));
                var i = v(h.maxVolume, 0, 0, !0);
                (h.labelMaxVol = i[0]),
                  (h.maxPercent = Math.max(
                    (h.maxPrice - h.prevclose) / h.prevclose,
                    0
                  )),
                  (h.minPercent = Math.min(
                    (h.minPrice - h.prevclose) / h.prevclose,
                    0
                  ));
              };
            (this.createPlayingData = function() {
              var e,
                t,
                n = I.DIMENSION.h_k,
                i = n * I.DIMENSION.P_HV,
                a = n * (1 - I.DIMENSION.P_HV);
              (e = h.labelMinP), (t = h.labelMaxP);
              for (
                var o,
                  s = h.labelMaxVol,
                  r = h.prevclose,
                  l = h.isTotalRedraw ? 0 : h.dataLen - h.dataLenOffset,
                  c = I.custom.show_underlay_vol,
                  u = h.isCompare ? "ppp" : "pp",
                  p = h.dataLen;
                p > l;
                l++
              )
                (o = h.datas[l]),
                  (o.cy = d[u](o.close, e, t, n, r)),
                  (o.oy = d[u](o.open, e, t, n, r)),
                  (o.hy = d[u](o.high, e, t, n, r)),
                  (o.ly = d[u](o.low, e, t, n, r)),
                  c && (o.vy = d.vp(o.volume, s, i) + a);
            }),
              (this.setDataRange = function(n) {
                var a = _.get();
                if (a) {
                  V.dataLength = a.length;
                  var o = V.start,
                    s = V.end;
                  if (isNaN(o) || isNaN(s))
                    (s = _.get("b")),
                      (o = _.get("v")),
                      (V.start = o),
                      (V.end = s);
                  else {
                    if (n && s + 1 >= a.length) {
                      var r = a.length - s;
                      (V.end = s = a.length),
                        (1 == i.pcm || V.viewId == b.URLHASH.K1) &&
                          (0 == o &&
                            s > 1 &&
                            s < I.PARAM.minCandleNum &&
                            ((o = s - 1), (V.start = o)),
                          s - o >= I.PARAM.defaultCandleNum &&
                            ((o += r), (V.start = o)));
                    }
                    _.set("v", o), _.set("b", s);
                  }
                  switch (
                    ((V.currentLength = s - o),
                    (V.startDate = a[o].date),
                    (V.endDate = a[s - 1].date),
                    i.pcm)
                  ) {
                    case 1:
                      h.prevclose = a[0].prevclose;
                      break;
                    case 2:
                      h.prevclose = a[o].close;
                      break;
                    default:
                      h.prevclose =
                        o > 1 ? a[o - 1].close : a[0].prevclose || a[0].close;
                  }
                  (h.datas = a.slice(o, s)),
                    (h.dataLen = h.datas.length),
                    e(),
                    t(n);
                }
              });
          })(),
          F = new (function() {
            var o,
              s = function(e) {
                return (
                  o
                    ? ((e.volume = e.totalVolume - (o.totalVolume || 0)),
                      (e.amount = e.volume * e.price))
                    : ((o = {}), (e.volume = 0)),
                  (o.totalVolume = e.totalVolume),
                  (e.avg_price = e.totalAmount / e.totalVolume || e.price),
                  !0
                );
              },
              r = !1,
              l = function(e, n, i) {
                if (e.isUpdateTime) {
                  var a = _.get(n);
                  if (a && !(a.length < 1)) {
                    var o =
                        n == b.URLHASH.KD ||
                        n == b.URLHASH.KDF ||
                        n == b.URLHASH.KCL ||
                        n == b.URLHASH.KCLF,
                      s = a[a.length - 1];
                    if (1 == i) {
                      if (
                        s.time &&
                        !t.kUtil.spk(s.time, e.time, y, n, h.market)
                      ) {
                        if (
                          (t.kUtil.nc(a, e, n, {
                            price: e.price,
                            volume: e.volume
                          }),
                          /^forex|^BTC/.test(h.market))
                        )
                          n == b.URLHASH.K1 &&
                            ((s = a[a.length - 1]),
                            (s.prevclose = e.prevclose),
                            (s.change = e.price - e.prevclose),
                            (s.percent = s.change / e.prevclose));
                        else if ("NF" == h.market);
                        else if (t.kUtil.spk("09:35", e.time, y, n)) {
                          if (n == b.URLHASH.K60) {
                            var l = e.time.split(":"),
                              c = l[0],
                              d = l[1];
                            if (c > 10 || (10 == c && d > 30)) return;
                          }
                          (s = a[a.length - 1]),
                            (s.open = e.open),
                            s.open > s.high && (s.high = s.open),
                            s.open < s.low && (s.low = s.open);
                        }
                        return;
                      }
                    } else if (2 == i) {
                      if (!e.trstr) return;
                      t.kUtil.nc(a, e, n, { price: e.price, volume: 0 });
                    } else if (f(e.date, s.date))
                      h.nco &&
                        ("NF" == h.market
                          ? m.dst(s.date) < h.nco.open &&
                            e.time >= h.nco.open &&
                            e.time > h.nco.close &&
                            t.kUtil.nc(a, e, n, null)
                          : r &&
                            e.time >= h.nco.open &&
                            ((r = !1), t.kUtil.nc(a, e, n, null)));
                    else {
                      if (!(e.date > s.date)) return;
                      h.nco
                        ? "NF" == h.market
                          ? e.time >= h.nco.open && t.kUtil.nc(a, e, n, null)
                          : e.time <= h.nco.close && (r = !0)
                        : t.kUtil.nc(a, e, n, null);
                    }
                    (s = a[a.length - 1]),
                      (s.close = e.price),
                      (s.date = m.ddt(e.date)),
                      (s.day = m.ds(s.date, "/")),
                      n == b.URLHASH.KMS
                        ? ((s.volume = e.trvolume || 0),
                          (s.amount = e.tramount || 0),
                          (s.trbs = e.trbs),
                          (s.kke_cs = 0 == e.trbs ? -1 : 1))
                        : (o
                            ? ((s.open = e.open),
                              (s.high = e.high),
                              (s.low = e.low),
                              (s.volume = e.totalVolume))
                            : isNaN(s.volume)
                            ? (s.volume = e.volume)
                            : (s.volume += Number(e.volume)),
                          (s.kke_cs =
                            s.close > s.open ? 1 : s.open > s.close ? -1 : 0));
                    var u;
                    1 == a.length
                      ? (u = o ? e.prevclose : s.open)
                      : ((u = a[a.length - 2].close),
                        e.settlement && o && (u = e.settlement)),
                      /^forex|^BTC/.test(h.market) &&
                        (n == b.URLHASH.K1 || n == b.URLHASH.KD) &&
                        (u = e.prevclose),
                      (s.change = e.price - u),
                      (s.percent = s.change / Math.abs(u)),
                      e.price > s.high && (s.high = e.price),
                      e.price < s.low && (s.low = e.price),
                      (s.amplitude = Math.abs(s.high - s.low)),
                      (s.ampP = Math.abs(s.amplitude / u)),
                      (s.time = e.time),
                      t.isCNK(e.symbol) &&
                        ((s.postVol = e.postVolume),
                        (s.postAmt = e.postAmount));
                  }
                }
              },
              c = function(e) {
                l(e, b.URLHASH.KD, 0),
                  l(e, b.URLHASH.KW, 0),
                  l(e, b.URLHASH.KM, 0),
                  l(e, b.URLHASH.KY, 0),
                  l(e, b.URLHASH.KDF, 0),
                  l(e, b.URLHASH.KWF, 0),
                  l(e, b.URLHASH.KMF, 0),
                  l(e, b.URLHASH.KYF, 0),
                  l(e, b.URLHASH.KCL, 0),
                  l(e, b.URLHASH.KCLF, 0),
                  l(e, b.URLHASH.K1, 1),
                  l(e, b.URLHASH.K5, 1),
                  l(e, b.URLHASH.K15, 1),
                  l(e, b.URLHASH.K30, 1),
                  l(e, b.URLHASH.K60, 1),
                  l(e, b.URLHASH.K240, 1),
                  l(e, b.URLHASH.KMS, 2);
              },
              d = new (function() {
                this.check = function(e) {
                  if (n) return !0;
                  var i = V.viewId,
                    a = T.get(i);
                  if (!a || a.length < 1) return !1;
                  var o = a[a.length - 1];
                  if (e.date > o.date)
                    if ("mink" == b.URLHASH.gt(V.viewId).type) {
                      if (!t.kUtil.spk(o.time, e.time, "00:00", i, h.market))
                        return !1;
                    } else if (!f(e.date, o.date)) return !1;
                  return !0;
                };
              })();
            this.uUpdate = function(n, o, r, l) {
              var u,
                p = { symbol: e.symbol, ssl: i.ssl };
              r
                ? ((u = "datas.hq.parse"), (p.hqStr = r), (p.market = l))
                : ((u = "datas.hq.get"), (p.delay = !0), (p.cancelEtag = o)),
                KKE.api(u, p, function(i) {
                  var o = i.dataObj[e.symbol];
                  if (o && o.date && s(o)) {
                    if (((x = x || o.name || ""), !d.check(o))) return;
                    (h.hq = o), c(o), a(!0), t.isFunc(n) && n();
                  }
                });
            };
          })(),
          z = new (function() {
            var a,
              o = function(e, n) {
                A.re(b.e.K_DATA_LOADED, n), t.isFunc(e) && e();
              },
              s = function(e) {
                if (!h.hq || !h.hq.date) return null;
                for (var t = 0; !e[t].f; ) t++;
                return { factor: e[t].f };
              },
              r = function(e, i, a, o) {
                if (e) {
                  var s,
                    r,
                    l,
                    c,
                    h,
                    d,
                    u,
                    p,
                    f,
                    v,
                    g,
                    y,
                    M = !(-828 === e),
                    N = _.getOriDK(),
                    S = 0;
                  if (
                    ((r = "q" === a ? b.URLHASH.KDF : b.URLHASH.KDB),
                    _.initState(r, t.clone(N, null), !1, !1, !0),
                    (s = _.get(r)),
                    (y = s.length),
                    M)
                  ) {
                    for (g = y - 1; g >= 0; g--) {
                      for (p = s[g], f = m.ds(p.date); f < i[S].d; ) S++;
                      if (((v = Number(i[S].f)), "HK" === o)) {
                        if (
                          ((p.high *= v),
                          (p.low *= v),
                          (p.open *= v),
                          (p.close *= v),
                          "h" === a)
                        ) {
                          var w = Number(i[S].c);
                          (p.high += w),
                            (p.low += w),
                            (p.open += w),
                            (p.close += w);
                        }
                      } else if ("US" === o) {
                        var L = Number(i[S].c) || 0;
                        (p.high = p.high * v + L),
                          (p.low = p.low * v + L),
                          (p.open = p.open * v + L),
                          (p.close = p.close * v + L);
                      } else
                        "h" === a
                          ? ((p.high *= v),
                            (p.low *= v),
                            (p.open *= v),
                            (p.close *= v))
                          : ((p.high /= v),
                            (p.low /= v),
                            (p.open /= v),
                            (p.close /= v));
                    }
                    for (g = 0; y > g; g++)
                      (p = s[g]),
                        (v = Number(i[i.length - 1].f)),
                        0 == g &&
                          ((d = p.prevclose),
                          isNaN(d) || 0 >= d
                            ? (d = p.open)
                            : ((d =
                                "HK" === o
                                  ? p.prevclose * v
                                  : "h" === a
                                  ? p.prevclose * v
                                  : p.prevclose / v),
                              (p.prevclose = d))),
                        (p.amplitude = Math.abs(p.high - p.low)),
                        (p.ampP = Math.abs(p.amplitude / d)),
                        (p.change = p.close - d),
                        (p.percent = p.change / Math.abs(d)),
                        (d = p.close);
                  }
                  var A;
                  1 == y &&
                    ((p = s[y - 1]),
                    (A = {
                      open: p.open,
                      high: p.high,
                      low: p.low,
                      close: p.close,
                      price: p.close,
                      volume: p.volume,
                      totalVolume: p.volume,
                      date: m.dd(p.date)
                    })),
                    (l = t.kUtil.mw(s, A, null, null, 0 / 0)),
                    (h = l[0]),
                    (c = l[1]),
                    (u = l[2]),
                    t.kUtil.pd(h, null),
                    t.kUtil.pd(c, null),
                    t.kUtil.pd(u, null),
                    _.initState(b.URLHASH["q" == a ? "KWF" : "KWB"], h),
                    _.initState(b.URLHASH["q" == a ? "KMF" : "KMB"], c),
                    _.initState(b.URLHASH["q" == a ? "KYF" : "KYB"], u);
                  var I = t.clone(s, null);
                  _.initState(b.URLHASH["q" == a ? "KCLF" : "KCLB"], I, !1, !0),
                    n || _.initState(r, s);
                }
              },
              l = function(t) {
                var n = b.URLHASH.gt(V.viewId),
                  a = n.dir,
                  l = { symbol: e.symbol, market: u, dir: a, ssl: i.ssl };
                P.show(),
                  KKE.api("datas.k.loadReData", l, function(e) {
                    P.hide();
                    var n = !0,
                      i = e.data;
                    if (i) {
                      var c = s(i);
                      c && ((n = !1), r(c.factor, i, a, l.market));
                    }
                    n && r(-828, null, a), o(t, { viewId: V.viewId });
                  });
              },
              c = function(e, t) {
                var s = b.URLHASH.gt(a),
                  r = "mink" == s.type ? _.initState : _.initDWMState;
                P.show(),
                  "LSE" === u && (e.symbol = i.rawSymbol),
                  KKE.api("datas.k.get", e, function(i) {
                    P.hide();
                    var l = a;
                    if (((a = 0 / 0), "error" == i.msg)) {
                      if (((h.isErr = !0), n))
                        if (i.data && i.data.hq) {
                          var c;
                          if (i.data.hq.status)
                            switch (i.data.hq.status) {
                              case 2:
                                c = b.notlisted;
                                break;
                              case 3:
                                c = b.delisted;
                            }
                          else c = b.norecord;
                          c && B.showTip({ txt: c, parent: H, noBtn: !0 });
                        } else B.showTip({ txt: b.nodata, parent: H });
                    } else i.data.hq && (h.hq = i.data.hq), r(s.baseid, i.data, e.ismink);
                    o(t, { viewId: l });
                  });
              },
              d = function(t) {
                KKE.api(
                  "datas.hq.get",
                  { symbol: e.symbol, cancelEtag: !0, ssl: i.ssl },
                  function(n) {
                    var i = n.dataObj[e.symbol],
                      a = [
                        {
                          close: i.price,
                          open: i.open,
                          high: i.high,
                          low: i.low,
                          volume: 0,
                          prevclose: i.prevclose,
                          amplitude: Math.abs(i.high - i.low),
                          ampP: Math.abs((i.high - i.low) / i.prevclose),
                          change: i.price - i.prevclose,
                          date: i.date,
                          day: m.ds(i.date, "/"),
                          time: i.time,
                          percent: i.price - i.prevclose / i.prevclose,
                          kke_cs: 0
                        }
                      ];
                    _.initState(V.viewId, a, !0), o(t, { viewId: V.viewId });
                  }
                );
              },
              p = function(t) {
                var n,
                  a,
                  o = V.viewId,
                  s = b.URLHASH.gt(o);
                if (h.nco && h.nco.open) (a = h.nco.open), (y = a);
                else {
                  var r = new Date(),
                    l = y.split(":");
                  r.setHours(l[0], l[1], 0),
                    r.setMinutes(r.getMinutes() - 30),
                    (a = m.dst(r));
                }
                var d = { symbol: e.symbol, newthour: a, ssl: i.ssl };
                if ("mink" == s.type) {
                  if (
                    ((n = e.datas.min),
                    (d.ismink = !0),
                    (d.scale = o),
                    /^forex|^BTC/.test(h.market))
                  )
                    switch (((d.withsymbol = "sys_time"), o)) {
                      case b.URLHASH.K1:
                        d.datalen = 1440;
                        break;
                      case b.URLHASH.K240:
                        d.datalen = parseInt((60 / o) * 24 * 10);
                        break;
                      default:
                        d.datalen = parseInt((60 / o) * 24 * 5);
                    }
                } else n = e.datas.day;
                (d.dataurl = n.url),
                  (d.dataformatter = n.dataformatter),
                  (d.wfn = n.wfn),
                  (d.staticdata = n.staticdata),
                  c(d, t);
              },
              f = function(e) {
                (h.nco = { open: "20:00", close: "15:30" }), p(e);
              },
              v = function(e) {
                (h.nco = { open: "07:00", close: "06:00" }), p(e);
              },
              g = function(t) {
                var n = { symbol: e.symbol, ssl: i.ssl },
                  a = "datas.k.";
                (a += "loadGBInit"),
                  (h.nco = { open: "15:00", close: "23:30" }),
                  KKE.api(a, n, function(e) {
                    var n = e.data;
                    if (n) {
                      var i = n.time;
                      i &&
                        i.length > 0 &&
                        ((h.nco.open = i[0][0] || h.nco.open),
                        (h.nco.close = i[i.length - 1][1] || h.nco.close));
                    }
                    p(t);
                  });
              },
              M = function(t, n) {
                var a = { symbol: e.symbol, ssl: i.ssl },
                  o = "datas.k.";
                n
                  ? ((o += "loadNFInit"),
                    (h.nco = { open: "09:00", close: "15:00" }))
                  : ((o += "loadHFInit"),
                    (h.nco = { open: "06:00", close: "05:59" })),
                  KKE.api(o, a, function(e) {
                    var n = e.data;
                    if (n) {
                      var i = n.time;
                      i &&
                        i.length > 0 &&
                        ((h.nco.open = i[0][0] || h.nco.open),
                        (h.nco.close = i[i.length - 1][1] || h.nco.close));
                    }
                    p(t);
                  });
              },
              N = function(e, t) {
                var n = new Date(),
                  i = y.split(":");
                n.setHours(i[0], i[1], 0), n.setMinutes(n.getMinutes() - 1);
                var a = m.dst(n);
                (h.nco = { open: y, close: a }),
                  "rek" == t.type && _.get(b.URLHASH.KD) ? l(e) : p(e);
              };
            this.iInit = function(e) {
              var t = V.viewId;
              if (a != t) {
                a = t;
                var n = b.URLHASH.gt(t);
                switch (h.market) {
                  case "HF":
                    M(e);
                    break;
                  case "NF":
                    M(e, !0);
                    break;
                  case "global_index":
                    g(e);
                    break;
                  case "GOODS":
                    f(e);
                    break;
                  case "MSCI":
                    v(e);
                    break;
                  case "forex":
                  case "forex_yt":
                  case "BTC":
                    N(e, n);
                    break;
                  default:
                    "msk" == n.type
                      ? d(e)
                      : "rek" == n.type && _.get(b.URLHASH.KD)
                      ? l(e)
                      : p(e);
                }
              }
            };
          })();
        (this.kDb = _),
          (this.extraDataObj = _.extraDataObj),
          (this.getYtdIndex = function(e) {
            var t = _.get(b.URLHASH.KD);
            if (!t) return null;
            var n = t[t.length - 1],
              i = n.date.getFullYear(),
              a = 0;
            return e && (i--, (a = n.date.getMonth())), l(new Date(i, a, 1));
          }),
          (this.initData = z.iInit),
          (this.doUpdate = F.uUpdate),
          (this.onViewChange = a),
          (this.setPricePos = function(e, t) {
            (h.labelMaxP = e[0]),
              (h.labelMinP = e[1]),
              (h.labelPriceCount = e[2]),
              (h.isCompare = t),
              D.createPlayingData(),
              N && N.setPricePos(e);
          }),
          (this.setRange = function(e) {
            D.setDataRange(),
              M && M.setDataRange(),
              N && N.setDataRange(),
              S && S.setDataRange(e);
          }),
          (this.draw = function() {
            L.draw(), M && M.allDraw(Y.x), N && N.allDraw(Y.x);
          }),
          (this.resize = function(e) {
            D.createPlayingData(),
              L.resize(),
              M && M.onResize(e),
              N && N.onResize(),
              S && S.onResize();
          }),
          (this.clear = function(e) {
            L.clear(e),
              M && (M.clear(), (M = null)),
              N && (N.clear(), (N = null)),
              S && (S.clear(), (S = null)),
              n && (U = null);
          }),
          (this.getPriceTech = function() {
            return N || null;
          });
        var G = function(e, n, i) {
            e && X.resizeAll(!0),
              k.onChangeView(),
              n && t.isFunc(n.callback) && n.callback(),
              i && W.onTechChanged(i[0]);
          },
          Z = void 0;
        (this.initPt = function(e, a) {
          if (e) {
            !t.isArr(e) && (e = [e]);
            for (var o = e.length; o--; )
              if (e[o].name && "VOLUME" === e[o].name.toUpperCase()) {
                e.splice(o, 1), (I.custom.show_underlay_vol = !0);
                break;
              }
            N ||
              ((N = new s({
                iMgr: q,
                stockData: h,
                chartArea: C,
                titleArea: O,
                cb: G,
                cfg: I,
                type: "k",
                usrObj: i
              })),
              n && (K = N),
              Z && ((g = N.showHide(Z)), (Z = void 0))),
              N.createChart(e, a);
          }
        }),
          (this.removePt = function(e) {
            if (e) {
              !t.isArr(e) && (e = [e]);
              for (var n = e.length; n--; )
                if (e[n].name && "VOLUME" === e[n].name.toUpperCase()) {
                  e.splice(n, 1), (I.custom.show_underlay_vol = !1);
                  break;
                }
            } else I.custom.show_underlay_vol = !1;
            N && N.removeChart(e);
          }),
          (this.togglePt = function(e, t) {
            N ? (g = N.showHide(e)) : !t && (Z = e);
          }),
          (this.initTc = function(e, t) {
            M ||
              ((M = new r({
                stockData: h,
                iMgr: q,
                cb: G,
                subArea: R,
                cfg: I,
                type: "k",
                usrObj: i,
                initMgr: X
              })),
              n && (E = M)),
              M.createChart(e, t);
          }),
          (this.removeTc = function(e) {
            M && M.removeChart(e);
          }),
          (this.initRs = function() {
            (S = new o({ stockData: h, setting: I, rc: k.moving })),
              S.linkData(),
              (U = S);
          }),
          (this.setLineStyle = L.setLineStyle),
          (this.getLineStyle = L.getLineStyle),
          c();
      }
      function w(e, i) {
        function a() {
          if (M)
            (r = I.COLOR.K_N),
              (s = I.COLOR.K_FALL),
              (l = I.COLOR.K_RISE),
              (c = I.COLOR.K_CL);
          else {
            var i = o.linecolor,
              a = i.K_N || "#" + t.randomColor();
            (r = a),
              (s = i.K_FALL || a),
              (l = i.K_RISE || a),
              (c = i.K_CL || a);
          }
          (m.K_N = r),
            (m.K_FALL = s),
            (m.K_RISE = l),
            (m.K_CL = c),
            (d = new n.xh5_ibPainter({
              setting: I,
              sd: e,
              ctn: _,
              withHBg: M,
              fixScale: !1,
              reO: { mh: I.DIMENSION.H_MA4K },
              iMgr: q,
              iTo: function(t, n, i, a) {
                if (e && e.datas) {
                  !h(t, q.iHLineO.body) && t.appendChild(q.iHLineO.body);
                  var o =
                    e.labelMaxP -
                    (i / I.DIMENSION.h_k) * (e.labelMaxP - e.labelMinP);
                  q.iToD(
                    {
                      mark: o,
                      x: n,
                      y: i,
                      oy: I.DIMENSION.H_MA4K,
                      ox: I.DIMENSION.posX,
                      e: a
                    },
                    !0,
                    !1
                  );
                }
              }
            })),
            (u = d.getG());
        }
        var o,
          s,
          r,
          l,
          c,
          d,
          u,
          m = {},
          f = 1.3,
          v = 1.3,
          g = "solid",
          y = isNaN(i.nfloat) ? 2 : i.nfloat,
          M = e.isMain,
          N = function(e) {
            if (
              ((o = p({ linetype: "solid", linecolor: m }, e || {})),
              (m = o.linecolor),
              (r = m.K_N),
              (s = m.K_FALL),
              (l = m.K_RISE),
              (c = m.K_CL),
              !o.linetype && (o.linetype = g),
              (I.datas.candle = o.linetype),
              0 == o.linetype.indexOf("line") ||
                0 == o.linetype.indexOf("mountain"))
            ) {
              var t = Number(o.linetype.split("_")[1]);
              (isNaN(t) || 0 >= t) && (t = v), (f = t);
            }
          },
          b = function(t, n) {
            u.fillStyle = I.COLOR.K_EXT;
            for (
              var i, a, o, s = !1, r = !1, l = e.datas, c = l.length;
              c--;

            ) {
              if (((o = l[c]), (i = n), !s && o.high == e.rangeMax)) {
                s = !0;
                var h = o.high.toFixed(y);
                99 > i
                  ? (u.textAlign = "left")
                  : i > I.DIMENSION.w_k - 99
                  ? ((u.textAlign = "right"), (i -= 5))
                  : (u.textAlign = "center"),
                  (a = o.hy),
                  a < I.STYLE.FONT_SIZE && (a = I.STYLE.FONT_SIZE + 2),
                  u.fillText(h, i, a);
              }
              if (((i = n), !r && o.low == e.rangeMin)) {
                r = !0;
                var d = o.low.toFixed(y);
                99 > i
                  ? (u.textAlign = "left")
                  : i > I.DIMENSION.w_k - 99
                  ? ((u.textAlign = "right"), (i -= 5))
                  : (u.textAlign = "center"),
                  (a = Math.floor(o.ly + I.STYLE.FONT_SIZE + 2)),
                  a > I.DIMENSION.h_k + 0.5 * I.STYLE.FONT_SIZE - 3 &&
                    (a = I.DIMENSION.h_k),
                  u.fillText(d, i, a);
              }
              if (r && s) break;
              (n -= t), 0 > n && (n = 0);
            }
          },
          S = function() {
            var t = e.datas,
              n = t.length,
              i = I.DIMENSION.w_k / Math.max(n, I.PARAM.minCandleNum),
              a = 0.5 * i,
              o = Y.x - i;
            d.beginPath();
            for (var s, r, l = 0; n > l; l++)
              (s = t[l]),
                (r = s.vy),
                d.drawVStickC(o, r, a, I.DIMENSION.h_k, I.COLOR.V_SD),
                (o += i);
            d.stroke();
          },
          w = function() {
            for (
              var t,
                n,
                i = e.datas,
                a = i.length,
                s = I.DIMENSION.w_k / Math.max(a, I.PARAM.minCandleNum),
                r = Y.x - 0.4 * s,
                l = 0;
              a > l;
              l++
            )
              (n = i[l]),
                (t = n.cy),
                0 == l
                  ? (d.newStyle(c, !0, f), d.moveTo(r, t))
                  : d.lineTo(r, t),
                (n.ix = r),
                (r += s);
            d.stroke(),
              0 == o.linetype.indexOf("mountain") &&
                ((r -= s),
                d.lineTo(r, I.DIMENSION.h_k),
                d.lineTo(Y.x - 0.4 * s, I.DIMENSION.h_k),
                d.newFillStyle_rgba(
                  I.COLOR.M_ARR,
                  I.DIMENSION.h_k,
                  I.COLOR.M_ARR_A
                ),
                d.fill()),
              M && I.custom.show_ext_marks && b(s, r);
          },
          L = function() {
            for (
              var t,
                n,
                i,
                a,
                o = e.datas,
                c = o.length,
                h = I.DIMENSION.w_k / Math.max(c, I.PARAM.minCandleNum),
                u = 0.6 * h,
                p = -1,
                m = 1,
                f = 0;
              3 > f;
              f++
            ) {
              switch (p) {
                case -1:
                  a = s;
                  break;
                case 0:
                  a = r;
                  break;
                case 1:
                  a = l;
              }
              for (t = Y.x - h, d.beginPath(), i = 0; c > i; i++)
                (n = o[i]),
                  n.isFake ||
                    (n.kke_cs == p &&
                      d.drawCandleRect(t, n.oy, n.cy, u, a, n.kke_cs == m),
                    0 == f && (n.ix = t + u)),
                  (t += h);
              for (d.stroke(), t = Y.x - h, d.beginPath(), i = 0; c > i; i++)
                (n = o[i]),
                  n.isFake ||
                    (n.kke_cs == p &&
                      d.drawCandleLineRect(
                        t,
                        n.hy,
                        n.oy,
                        n.cy,
                        n.ly,
                        u,
                        a,
                        n.kke_cs == m
                      )),
                  (t += h);
              d.stroke(), p++;
            }
            M && I.custom.show_ext_marks && b(h, t);
          },
          A = function() {
            var t,
              n,
              i,
              a = e.datas,
              o = a.length,
              c = I.DIMENSION.w_k / Math.max(o, I.PARAM.minCandleNum),
              h = 0.6 * c,
              u = -1;
            h = Math.floor(h) % 2 === 0 ? Math.floor(h) : Math.floor(h) - 1;
            for (var p, m = 0; 3 > m; m++) {
              switch (u) {
                case -1:
                  p = s;
                  break;
                case 0:
                  p = r;
                  break;
                case 1:
                  p = l;
              }
              for (t = Y.x - c, d.beginPath(), i = 0; o > i; i++)
                (n = a[i]),
                  n.isFake ||
                    (n.kke_cs == u &&
                      d.drawCandleRect_solid(t, n.oy, n.cy, h, p),
                    0 == m && (n.ix = t + h)),
                  (t += c);
              for (d.stroke(), t = Y.x - c, d.beginPath(), i = 0; o > i; i++)
                (n = a[i]),
                  n.isFake ||
                    (n.kke_cs == u &&
                      d.drawCandleLineRect(
                        t,
                        n.hy,
                        n.oy,
                        n.cy,
                        n.ly,
                        h,
                        p,
                        !1
                      )),
                  (t += c);
              d.stroke(), u++;
            }
            M && I.custom.show_ext_marks && b(c, t);
          },
          k = function() {
            for (
              var t,
                n,
                i,
                a,
                o = e.datas,
                c = o.length,
                h = I.DIMENSION.w_k / Math.max(c, I.PARAM.minCandleNum),
                u = 0.6 * h,
                p = -1,
                m = 0;
              3 > m;
              m++
            ) {
              switch (p) {
                case -1:
                  a = s;
                  break;
                case 0:
                  a = r;
                  break;
                case 1:
                  a = l;
              }
              for (t = Y.x - h, d.beginPath(), i = 0; c > i; i++)
                (n = o[i]),
                  n.isFake ||
                    (0 == m && (n.ix = t + u),
                    n.kke_cs == p &&
                      d.drawOhlc(t, n.oy, n.hy, n.ly, n.cy, u, a)),
                  (t += h);
              d.stroke(), p++;
            }
            M && I.custom.show_ext_marks && b(h, t);
          },
          x = function() {
            M && d.drawBg(Y.x);
            var t = e.datas;
            if (t) {
              var n =
                  0 == o.linetype.indexOf("line") ||
                  0 == o.linetype.indexOf("mountain"),
                i = 0 == o.linetype.indexOf("hollow"),
                a = 0 == o.linetype.indexOf("ohlc");
              d.clear(n, I.PARAM.getHd()),
                d.newGStyle({
                  textBaseline: "bottom",
                  font: I.STYLE.FONT_SIZE + "px " + I.STYLE.FONT_FAMILY
                }),
                M && I.custom.show_underlay_vol && S(),
                n ? w() : i ? L() : a ? k() : A();
            }
          };
        (this.draw = x),
          (this.clear = function(e) {
            e ? d.clear(!1, I.PARAM.getHd()) : (d.remove(), (d = null));
          }),
          (this.resize = function() {
            d.resize({ mh: I.DIMENSION.H_MA4K }), x();
          }),
          (this.setLineStyle = N),
          (this.getLineStyle = function() {
            return o;
          }),
          N(i),
          a();
      }
      function L() {
        var e,
          n,
          l,
          h,
          d = this,
          f = [],
          g = 0.05,
          M = function() {
            var e,
              t,
              n = Number.MAX_VALUE,
              a = -Number.MAX_VALUE,
              o = f.length,
              s = o > 1 || "percent" == I.datas.scaleType;
            I.custom.k_overlay && (s = !1);
            for (var r, l, c, h, d = s ? "Percent" : "Price", u = o; u--; )
              (e = f[u]),
                i.scalerange
                  ? (c = i.scalerange)
                  : ((h = e.getPriceTech()),
                    s || !h
                      ? (c = [a, n])
                      : ((t = h && h.getMaxMin()), (c = t || [a, n]))),
                (r = e["min" + d]),
                (l = e["max" + d]),
                isFinite(r) &&
                  isFinite(l) &&
                  ((n = Math.min(n, r, c[1])), (a = Math.max(a, l, c[0])));
            var p;
            p = i.scalerange
              ? i.scalerange.concat(4)
              : 1 == i.pcm
              ? 0.0199 > a - n
                ? [a, n, 1]
                : v(a, n, 2, !1, !0)
              : v(a, n, i.nfloat, !1, !0, g);
            for (var m = o; m--; ) (e = f[m]), e.setPricePos(p, s);
          },
          N = function() {
            (V.start < 1 || !I.custom.smooth) && Y.resetX();
            for (var e = f.length; e--; ) f[e].draw();
          },
          S = function() {
            (V.start = V.end = 0 / 0), (V.currentLength = 0 / 0), (n = void 0);
          },
          w = function(t) {
            S();
            for (var n, i = f.length, a = 0; i > a; a++)
              (n = f[a]), n.onViewChange();
            M(), N(), t || W.onRange(e, i > 1);
          },
          L = [],
          A = !1,
          k = function(t) {
            return t.isErr
              ? (t !== e && d.removeCompare([t.symbol]), !0)
              : t.kDb.get()
              ? !0
              : (t.initData(C), !1);
          },
          x = function(e) {
            if (e && t.isFunc(e.callback)) {
              for (var n = !1, i = L.length; i--; )
                if (e.callback === L[i]) {
                  n = !0;
                  break;
                }
              !n && L.push(e.callback);
            }
          },
          _ = function() {
            for (var t, n = !0, i = f.length; i--; )
              (t = f[i]), t == e || k(t) || ((n = !1), (A = !0));
            return n;
          },
          C = function(t, n) {
            if ((x(n), k(e))) {
              if (e.isErr) return void (e.isErr = !1);
              if ((q.patcher.switchFloater(), Y.resetX(0), _()))
                for (A = !1, w(t); L.length; ) {
                  var i = L.shift();
                  i();
                }
              if ((W.onViewChanged(), t)) return;
              W.onDataUpdate(), W.onViewPrice();
            }
          },
          O = function(t) {
            (t || (n && V.dataLength != n)) && W.onRange(e, f.length > 1),
              (n = V.dataLength);
          },
          R = function(e) {
            (e || V.end == V.dataLength) && (q.update(), M(), N(), O(!0)),
              W.onDataUpdate(),
              !q.isIng() && W.onViewPrice();
          },
          T = function(e) {
            clearTimeout(h),
              !F &&
                H.parentNode &&
                "none" != H.style.display &&
                (h = setTimeout(R, e || 200));
          },
          E = function() {
            if (!A) for (var e, t = f.length; t--; ) (e = f[t]), e.doUpdate(T);
          },
          K = function() {
            if ((clearInterval(l), !isNaN(i.rate))) {
              var e = 1e3 * i.rate;
              e > 0 && (l = setTimeout(K, e));
            }
            E();
          };
        this.mM = new (function() {
          var n = function(i, a, o) {
              var l, c;
              switch (a) {
                case "price":
                  if (((l = s), (c = "initPt"), t.isObj(i)))
                    i.name &&
                      "TZY" === String(i.name).toUpperCase() &&
                      (g = 0.2);
                  else if (t.isArr(i))
                    for (var h, d = i.length; d--; )
                      if (
                        ((h = i[d]),
                        h && h.name && "TZY" === String(h.name).toUpperCase())
                      ) {
                        g = 0.2;
                        break;
                      }
                  break;
                case "tech":
                  (l = r), (c = "initTc");
              }
              c &&
                (l
                  ? e[c](i, o)
                  : KKE.api("plugins.techcharts.get", { type: a }, function(e) {
                      (r = e.tChart), (s = e.pChart), n(i, a, o);
                    }));
            },
            i = function(t, n) {
              var i;
              switch (n) {
                case "price":
                  (i = "removePt"), (g = 0.05);
                  break;
                case "tech":
                  i = "removeTc";
                  break;
                default:
                  return;
              }
              e && e[i](t);
            },
            a = function(t) {
              return o
                ? (U
                    ? (U.sh(t), (t.from || t.to) && U.dateFromTo(t.from, t.to))
                    : (e.initRs(), a(t), D.appendChild(U.getBody())),
                  void X.resizeAll(!0))
                : void KKE.api("plugins.rangeselector.get", null, function(e) {
                    (o = e), a(t);
                  });
            };
          (this.showRs = a),
            (this.newAC = n),
            (this.removeAC = i),
            (this.togglePt = function(t, n) {
              e && (e.togglePt(t, n), C());
            });
        })();
        var P = new (function() {
          var n,
            a,
            o,
            s,
            r = !1,
            l = !1,
            h = function() {
              a || ((a = c("div")), (a.style.margin = "0 auto")),
                (a.style.width = 0.8 * I.DIMENSION.getStageW() + "px"),
                (a.style.height = 0.83 * I.DIMENSION.h_k + "px");
            },
            d = function(e) {
              n.dateTo(e.date, function(e) {
                1 != e && B.showTip({ txt: b.nohistoryt, parent: H });
              });
            },
            u = function(t) {
              if (o && n) {
                l = !0;
                var i = n.getSymbols()[0];
                i != e.symbol && n.newSymbol({ symbol: e.symbol }),
                  n.resize(),
                  d(t),
                  n.show(a);
              }
            },
            p = function() {
              l = !1;
            },
            f = function(n) {
              var i = {
                txt: e.getName() + "(" + e.symbol + ") " + m.ds(n.date),
                content: a,
                parent: H,
                fontColor: "#000",
                closeCb: p,
                btnLb: "\u5173\u95ed",
                bgStyle: { backgroundColor: "#fff", width: "80%", top: "2%" }
              };
              return o || (o = new t.TipM(I.COLOR)), (i.content = a), i;
            },
            v = function(t) {
              var s = f(t);
              if ((o.genTip(s), n)) u(t);
              else {
                if (r) return;
                (r = !0),
                  KKE.api(
                    "chart.h5t.get",
                    { symbol: e.symbol, dom: a, nfloat: i.nfloat },
                    function(e) {
                      (n = e), (r = !1), u(t);
                    }
                  );
              }
            };
          (this.resetHisT = function() {
            o && o.hide();
          }),
            (this.isShowing = function() {
              return l;
            }),
            (this.historyT = function() {
              if ("CN" === t.market(e.symbol)) {
                s = q.getInteractiveIdx();
                var n = e.datas[s];
                if (n) {
                  if (n.date.getFullYear() < 2008)
                    return void B.showTip({ txt: b.historyt08, parent: H });
                  switch (I.custom.history_t) {
                    case "layer":
                      h(), v(n);
                      break;
                    case "window":
                      var i =
                        "http://finance.sina.com.cn/h5charts/tchart.html?symbol=$symbol&date=$date&rangeselector=true&indicator=tvol";
                      i = i
                        .replace("$symbol", e.symbol)
                        .replace("$date", m.ds(n.date));
                      var a =
                        "width=600,height=375,location=0,menubar=0,titlebar=0,toolbar=0,alwaysRaised=1";
                      window.open(i, "_blank", a);
                      break;
                    default:
                      return;
                  }
                }
              }
            });
        })();
        (this.h5tM = P),
          (this.getAllStock = function() {
            return f;
          }),
          (this.getMainStock = function() {
            return e;
          }),
          (this.getAllSymbols = function() {
            for (var e = [], t = 0, n = f.length; n > t; t++)
              e.push(f[t].symbol);
            return e;
          });
        var z = function() {
            d.mM.togglePt(
              f.length > 1
                ? { v: !1 }
                : V.viewId == b.URLHASH.KCL ||
                  V.viewId == b.URLHASH.KCLF ||
                  V.viewId == b.URLHASH.KCLB
                ? { v: !1 }
                : { v: !0 }
            );
          },
          G = function(t, n, i, a, o) {
            if (
              (!i && Y.resetX(),
              !(
                n - t < I.PARAM.minCandleNum ||
                n > V.dataLength ||
                0 > t ||
                n - t > I.PARAM.maxCandleNum
              ))
            ) {
              (V.start = t), (V.end = n), (V.currentLength = n - t);
              for (var s, r = f.length, l = 0; r > l; l++)
                (s = f[l]), s.setRange(a);
              M(), N(), o || W.onRange(e, r > 1);
            }
          };
        (this.onChangeView = C),
          (this.showYTD = function(t, n) {
            (V.viewId = b.URLHASH.KD + t), C(!0);
            var i = e.getYtdIndex(n);
            i && G(i[0], i[1] + 1);
          }),
          (this.moving = G),
          (this.callSdDraw = N);
        var Z = function(t, n) {
            var i = t instanceof a ? t : new a(t, n);
            n && (e = i), f.push(i), z(), C();
          },
          $ = function(n) {
            if ("mink" == b.URLHASH.gt(V.viewId).type) {
              var i = t.market(n.symbol),
                a = t.market(e.symbol);
              if (i != a && ("US" == i || "US" == a)) return !1;
            }
            return !0;
          };
        (this.compare = function(e) {
          for (var n = e.callback, i = f.length; i--; )
            if (f[i].symbol == e.symbol)
              return void (
                t.isFunc(n) && n({ code: 1, msg: "comparing same symbol" })
              );
          $(e)
            ? Z(e, !1)
            : t.isFunc(n) &&
              n({ code: 2, msg: "invalid comparing market or period" });
        }),
          (this.removeCompare = function(e, t) {
            for (var n, i, a = !1, o = e.length; o--; ) {
              i = e[o];
              for (var s = f.length; s--; )
                if (i == f[s].symbol) {
                  (a = !0), (n = f.splice(s, 1)[0]), n.clear(t), (n = null);
                  break;
                }
            }
            a && !t && (z(), M(), N());
          });
        var j,
          J = function(e) {
            e ? R() : V.end == V.dataLength && q.update();
          },
          Q = !1,
          ee = 0,
          te = function() {
            clearTimeout(j), (Q = !1), (ee = 0);
          },
          ne = function() {
            j = setTimeout(function() {
              ee > 0 && T(1), te();
            }, 500);
          };
        (this.pushData = function(e, t) {
          var n = !1;
          switch (Number(t)) {
            case 0:
              te();
              break;
            case 1:
              te(), (n = !0);
              break;
            case 2:
              Q || ((Q = !0), ne());
          }
          for (var i = e.length; i--; )
            for (var a = f.length; a--; )
              if (f[a].symbol === e[i].symbol && e[i].data) {
                ee++, f[a].doUpdate(y(J, null, n), !1, e[i].data, e[i].market);
                break;
              }
        }),
          (this.setScale = function(e) {
            (I.datas.scaleType = e), M(), N();
          }),
          (this.setLineStyle = function(n) {
            if (n) {
              !t.isArr(n) && (n = [n]);
              for (var i = n.length; i--; ) {
                var a = n[i];
                if (a.hasOwnProperty("symbol")) {
                  for (var o = a.symbol, s = f.length; s--; )
                    if (f[s].symbol == o) {
                      f[s].setLineStyle(a), f[s].draw();
                      break;
                    }
                } else e.setLineStyle(a), e.draw();
              }
            } else e.setLineStyle(), e.draw();
          }),
          (this.onResize = function(e) {
            for (var t = f.length; t--; ) f[t].resize(e);
          });
        var ie = -1,
          ae = -1,
          oe = function(e, t) {
            var n = V.start,
              i = V.end,
              a = e / Math.abs(e),
              o = a * Math.ceil((i - n) / I.PARAM.zoomUnit);
            if (
              (Math.abs(o) > I.PARAM.zoomLimit && (o = a * I.PARAM.zoomLimit),
              I.custom.centerZoom)
            ) {
              var s = t ? t.layerX / I.DIMENSION.w_k : 0.5;
              s < I.PARAM.zoomArea
                ? (i = Math.min(i - o * Math.abs(o), V.dataLength))
                : s > 1 - I.PARAM.zoomArea
                ? (n = Math.max(n + o * Math.abs(o), 0))
                : ((n = Math.max(n + o * Math.abs(o), 0)),
                  (i = Math.min(i - o * Math.abs(o), V.dataLength)));
            } else n = Math.max(n + o * Math.abs(o), 0);
            return n == ie && i == ae ? [-1] : ((ie = n), (ae = i), [n, i]);
          };
        (this.onWheel = function(e) {
          if (!P.isShowing()) {
            var t = e.detail || -1 * e.wheelDelta;
            if (0 != t) {
              var n = oe(t, e);
              G(n[0], n[1]);
            }
          }
        }),
          (this.onKb = function(e) {
            if ("keyup" == e.type) return void q.iToKb(null, !0);
            var t = e.keyCode;
            if (P.isShowing()) return void (27 == t && P.resetHisT());
            switch (t) {
              case 38:
              case 40:
                var n = oe(38 == t ? 1 : -1);
                G(n[0], n[1]);
                break;
              case 37:
              case 39:
                var i = q.iToKb(37 == t ? -1 : 1);
                i && (G(V.start + i, V.end + i), q.iToKb(0));
                break;
              case 13:
                P.historyT();
                break;
              default:
                return;
            }
            u.preventDefault(e);
          }),
          (this.zoomApi = function(e) {
            var t = oe(e ? 1 : -1);
            G(t[0], t[1]);
          }),
          (this.moveApi = function(e) {
            var t = V.start,
              n = V.end;
            (t += e),
              (n += e),
              n > V.dataLength &&
                ((n = V.dataLength), (t = V.start + n - V.end)),
              0 > t && ((t = 0), (n = V.end - V.start)),
              G(t, n);
          }),
          (this.shareTo = function(e) {
            e = p(
              {
                type: "weibo",
                url: window.location.href,
                wbtext: "",
                qrwidth: 100,
                qrheight: 100,
                extra: void 0
              },
              e || {}
            );
            var n = String(e.type).toLowerCase();
            switch (n) {
              case "qrcode":
                KKE.api(
                  "utils.qrcode.createcanvas",
                  { text: e.url, width: e.qrwidth, height: e.qrheight },
                  function(e) {
                    B.showTip({
                      content: e,
                      txt:
                        '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                      parent: H,
                      btnLb: "\u5173\u95ed"
                    });
                  }
                );
                break;
              default:
                t.grabM.shareTo({
                  ctn: H,
                  w: I.DIMENSION.getStageW(),
                  h: I.DIMENSION.getStageH() - (D.clientHeight || 0),
                  ignoreZIdxArr: [I.PARAM.I_Z_INDEX],
                  ignoreIdArr: [I.PARAM.LOGO_ID],
                  priorZIdx: I.PARAM.G_Z_INDEX,
                  nologo: !1,
                  top: I.DIMENSION.posY + I.DIMENSION.H_MA4K + 17,
                  right: I.DIMENSION.RIGHT_W + I.DIMENSION.K_RIGHT_W,
                  LOGO_W: I.DIMENSION.LOGO_W,
                  LOGO_H: I.DIMENSION.LOGO_H,
                  color: I.COLOR.LOGO,
                  bgColor: I.COLOR.BG,
                  txt: e.wbtext,
                  url: e.url,
                  extra: e.extra
                });
            }
          }),
          (this.getExtraData = function(n) {
            if (
              ((n = p({ symbol: e.symbol, name: null, clone: !0 }, n || {})),
              !n.name)
            )
              return null;
            for (var i, a, o = f.length; o--; )
              if (f[o].symbol === n.symbol) {
                i = f[o];
                break;
              }
            if (i) {
              var s;
              "currentK" == n.name
                ? ((s = i.kDb.get()), (a = n.clone ? t.clone(s, null) : s))
                : ((s = i.extraDataObj[n.name]),
                  (a = n.clone ? t.clone(s, null) : s));
            }
            return a;
          }),
          (this.updateDataAll = K),
          (this.outputNewRange = O),
          (this.dcReset = function() {
            clearInterval(l), clearTimeout(h);
            for (var e, t = f.length; t--; )
              (e = f.splice(t, 1)[0]), e.clear(), (e = null);
          }),
          (this.dcInit = function(e) {
            Z(e, !0), K();
          });
      }
      t.xh5_EvtDispatcher.call(this);
      var A = this;
      i = p(
        {
          candlenum: 0 / 0,
          datas: {
            day: {
              wfn: void 0,
              url: void 0,
              dataformatter: void 0,
              staticdata: void 0
            },
            min: {
              wfn: void 0,
              url: void 0,
              dataformatter: void 0,
              staticdata: void 0
            }
          },
          dim: null,
          dom: void 0,
          domid: void 0,
          fh5: !1,
          maxcandlenum: 0 / 0,
          mincandlenum: 0 / 0,
          mh: 0,
          name: void 0,
          nfloat: 2,
          noh5: void 0,
          nohtml5info: void 0,
          ondataupdate: void 0,
          onrange: void 0,
          onviewchanged: void 0,
          onviewprice: void 0,
          ontechchanged: void 0,
          onshortclickmain: void 0,
          pcm: 0,
          rate: 0 / 0,
          reorder: !0,
          reheight: !0,
          scalerange: void 0,
          ssl: !0,
          symbol: "sh000001",
          tchartobject: { t: void 0, k: void 0 },
          theme: null,
          trace: void 0,
          view: "kd",
          w: 0 / 0,
          h: 0 / 0,
          zoomlimit: 0 / 0,
          zoomunit: 0 / 0
        },
        i || { WANGXuan: "wangxuan2@staff.sina.com.cn", VER: "2.11.0" }
      );
      var I;
      !(function() {
        if (
          (!i.symbol && (i.symbol = "sh000001"),
          (i.symbol = String(i.symbol)),
          (i.rawSymbol = String(i.symbol)),
          (i.symbol =
            "LSE" === t.market(i.symbol)
              ? t.strUtil.replaceStr(i.symbol)
              : i.symbol.replace(".", "$")),
          (I = e.getSetting(
            [
              "_",
              i.symbol,
              "_",
              Math.floor(1234567890 * Math.random() + 1) +
                Math.floor(9876543210 * Math.random() + 1)
            ].join("")
          )),
          0 == location.protocol.indexOf("https:") && (i.ssl = !0),
          isNaN(i.rate) && (i.rate = I.PARAM.updateRate),
          !isNaN(i.mincandlenum) &&
            i.mincandlenum > 0 &&
            (I.PARAM.minCandleNum = i.mincandlenum),
          !isNaN(i.candlenum) &&
            i.candlenum >= I.PARAM.minCandleNum &&
            (I.PARAM.defaultCandleNum = i.candlenum),
          isNaN(i.maxcandlenum) || (I.PARAM.maxCandleNum = i.maxcandlenum),
          !isNaN(i.zoomunit) &&
            i.zoomunit > I.PARAM.minCandleNum &&
            (I.PARAM.zoomUnit = i.zoomunit),
          !isNaN(i.zoomlimit) &&
            i.zoomlimit > 0 &&
            (I.PARAM.zoomLimit = Math.round(i.zoomlimit)),
          g.noH5)
        ) {
          if ("undefined" == typeof FlashCanvas || i.fh5)
            return void (t.isFunc(i.noh5) && i.noh5(i));
          I.PARAM.isFlash = !0;
        }
        if (
          (I.PARAM.isFlash && (I.COLOR.F_BG = "#fff"),
          i.reorder || (I.custom.indicator_reorder = !1),
          i.reheight || (I.custom.indicator_reheight = !1),
          i.dim)
        )
          for (var n in i.dim)
            i.dim.hasOwnProperty(n) &&
              t.isNum(I.DIMENSION[n]) &&
              (I.DIMENSION[n] = i.dim[n]);
      })();
      var k,
        x,
        H,
        _,
        C,
        O,
        R,
        D,
        T,
        E,
        K,
        U,
        P,
        F = !1,
        z = 0,
        V = {
          viewId: b.URLHASH.vi(i.view || "kd"),
          dataLength: 0 / 0,
          start: 0 / 0,
          end: 0 / 0,
          currentLength: 0 / 0,
          startDate: void 0,
          endDate: void 0,
          movY: 0
        },
        Y = {
          x: 0,
          resetX: function(e) {
            this.x = isNaN(e)
              ? I.DIMENSION.w_k /
                Math.max(V.currentLength, I.PARAM.minCandleNum)
              : e;
          }
        },
        B = new (function() {
          var e;
          (this.showTip = function(n) {
            e || (e = new t.TipM(I.COLOR)), e.genTip(n);
          }),
            (this.hideTip = function() {
              e && e.hide();
            });
        })(),
        W = new (function() {
          var e = function() {
            var e = T.get(V.viewId);
            return e ? e[e.length - 1] : null;
          };
          this.onRange = function(e, n) {
            !F &&
              t.isFunc(i.onrange) &&
              i.onrange({
                isCompare: n,
                data: e.datas,
                viewRangeState: t.clone(V, null),
                width: I.DIMENSION.w_k,
                height: I.DIMENSION.h_k,
                left: I.DIMENSION.posX,
                top: I.DIMENSION.H_MA4K,
                range: [e.labelMaxP, e.labelMinP, e.labelMaxVol],
                minCandleNum: I.PARAM.minCandleNum
              });
          };
          var n = [];
          (this.onViewPrice = function(a, o, s, r, l, c) {
            if (!F && t.isFunc(i.onviewprice)) {
              if (!a) {
                if (((a = e()), !a)) return;
                o = V.currentLength - 1;
              }
              if (!s) {
                for (; n.length; ) n.length--;
                for (
                  var h, d, u, p, m = k.getAllStock(), f = 0, v = m.length;
                  v > f;
                  f++
                )
                  (p = m[f]),
                    (h = p.datas),
                    !h ||
                      h.length <= o ||
                      ((d = p.getName()),
                      (u = h[o]),
                      !r && m[f].isMain && (r = h),
                      n.push({
                        name: d,
                        data: u,
                        rangedata: h,
                        symbol: p.symbol,
                        color: p.getLineStyle().linecolor
                      }));
                s = n;
              }
              l || (l = k.getMainStock().getName()),
                i.onviewprice({
                  data: t.clone(a, null),
                  rangedata: r,
                  idx: o,
                  left: I.DIMENSION.posX,
                  top: I.DIMENSION.H_MA4K,
                  data_array: s,
                  curname: l,
                  interacting: !!c
                });
            }
          }),
            (this.onDataUpdate = function() {
              if (t.isFunc(i.ondataupdate)) {
                var n = e();
                n &&
                  i.ondataupdate({
                    data: t.clone(n, null),
                    idx: V.currentLength - 1,
                    left: I.DIMENSION.posX,
                    top: I.DIMENSION.H_MA4K
                  });
              }
            }),
            (this.onViewChanged = function() {
              t.isFunc(i.onviewchanged) &&
                i.onviewchanged({ viewRangeState: t.clone(V, null) });
            }),
            (this.onInnerResize = function(e) {
              t.isFunc(i.oninnerresize) && i.oninnerresize(e);
            }),
            (this.onTechChanged = function(e) {
              t.isFunc(i.ontechchanged) && i.ontechchanged({ Indicator: e });
            }),
            (this.shortClickHandler = function() {
              t.isFunc(i.onshortclickmain) && i.onshortclickmain();
            });
        })(),
        X = new (function() {
          var e,
            n,
            a,
            o,
            s,
            r = 37,
            h = function(e, t, n) {
              var a = !1;
              isNaN(e) && (e = i.w || x.offsetWidth),
                isNaN(t) && (t = i.h || x.offsetHeight - i.mh);
              for (
                var o,
                  s = D.clientHeight || 0,
                  r = R.clientHeight || 0,
                  l = I.DIMENSION.getOneWholeTH(),
                  c = 0,
                  h = R.childNodes,
                  d = h.length,
                  u = 0,
                  p = h.length;
                p--;

              )
                (o = h[p]),
                  o.id.indexOf("blankctn") >= 0
                    ? ((c = o.offsetHeight), d--, (u += c))
                    : (u += l);
              return (
                !isNaN(n) && (r -= n),
                r / (t - s) > 1 && ((r = u), (a = !0)),
                I.DIMENSION.setStageW(e),
                1 == z
                  ? d > 0 &&
                    (I.DIMENSION.setStageH(t, d * l + c + s), (a = !0), (z = 0))
                  : I.DIMENSION.setStageH(t, r + s),
                a
              );
            },
            d = function() {
              s && (s.style.display = I.custom.show_logo ? "" : "none");
            },
            p = function() {
              (P = new t.LoadingSign()), P.appendto(_);
            },
            m = function() {
              P.setPosition();
            },
            f = function(e, n, i) {
              var o = h(n, i, 0 / 0);
              if (e || (n && i)) {
                if (!k) return;
                k.onResize(o), q.onResize();
              }
              (a.style.left = "1px"),
                (a.style.top = I.DIMENSION.h_k + I.DIMENSION.H_MA4K + "px"),
                d(),
                m(),
                t.stc("k_wh", [
                  I.DIMENSION.getStageW(),
                  I.DIMENSION.getStageH()
                ]);
            },
            v = function() {
              (x = l(i.domid) || i.dom),
                x || ((x = c("div")), document.body.appendChild(x)),
                (H = c("div")),
                (H.style.position = "relative"),
                (H.style.outlineStyle = "none"),
                (H.style.webkitUserSelect = H.style.userSelect = H.style.MozUserSelect =
                  "none"),
                (_ = c("div", "mainarea_" + I.uid)),
                (C = c("div")),
                _.appendChild(C),
                (O = c("div")),
                (O.style.position = "absolute"),
                (O.style.fontSize = O.style.lineHeight =
                  I.STYLE.FONT_SIZE + "px"),
                (O.style.width = "100%"),
                _.appendChild(O),
                H.appendChild(_),
                (R = c("div")),
                H.appendChild(R),
                (D = c("div")),
                H.appendChild(D),
                (e = new N({ width: r, height: I.DIMENSION.H_TIME_PART })),
                (n = e.g),
                (a = e.canvas),
                (a.style.position = "absolute"),
                H.appendChild(a),
                x.appendChild(H);
            },
            y = function(e) {
              var n = !1;
              if (e) {
                U && (n = U.setTheme(e));
                for (var i in e)
                  e.hasOwnProperty(i) &&
                    I.COLOR.hasOwnProperty(i) &&
                    I.COLOR[i] !== e[i] &&
                    ((I.COLOR[i] = e[i]), (n = !0));
                t.stc("k_thm", e);
              }
              return n && S.styleLogo({ logo: s, color: I.COLOR.LOGO }), n;
            },
            M = function(e) {
              !I.custom.mousewheel_zoom ||
                (document.activeElement !== H &&
                  document.activeElement.parentNode !== H) ||
                (k && k.onWheel(e), u.preventDefault(e), u.stopPropagation(e));
            },
            w = function(e) {
              I.custom.keyboard && k && k.onKb(e);
            },
            L = function() {
              t.xh5_deviceUtil.istd ||
                (g.info.name.match(/firefox/i)
                  ? u.addHandler(H, "DOMMouseScroll", M)
                  : u.addHandler(H, "mousewheel", M),
                (H.tabIndex = 0),
                u.addHandler(H, "keyup", w),
                u.addHandler(H, "keydown", w));
            },
            A = function(e) {
              (s = e), H.appendChild(e);
            };
          v(),
            p(),
            y(i.theme),
            f(),
            L(),
            S.getLogo({
              cb: A,
              id: I.PARAM.LOGO_ID,
              isShare: !1,
              top: I.DIMENSION.posY + I.DIMENSION.H_MA4K + 17,
              right: I.DIMENSION.RIGHT_W + I.DIMENSION.K_RIGHT_W,
              LOGO_W: I.DIMENSION.LOGO_W,
              LOGO_H: I.DIMENSION.LOGO_H,
              color: I.COLOR.LOGO
            }),
            g.noH5 &&
              (B.showTip({ txt: i.nohtml5info || b.nohtml5info, parent: H }),
              t.stc("k_nh5")),
            (this.resizeAll = f),
            (this.innerResize = function(e) {
              k &&
                (h(0 / 0, 0 / 0, e),
                k.onResize(),
                q.onResize(),
                m(),
                W.onInnerResize({ height: I.DIMENSION.h_k }));
            }),
            (this.initTheme = y),
            (this.drawReMark = function(t) {
              if (t) {
                if (((a.style.display = ""), o == t)) return;
                var i = I.DIMENSION.H_TIME_PART;
                (o = t),
                  e.resize({ width: r, height: i, hd: I.PARAM.getHd() }),
                  (n.font = "12px " + I.STYLE.FONT_FAMILY),
                  (n.textBaseline = "top"),
                  (n.fillStyle = I.COLOR.REMARK_BG),
                  n.fillRect(0, 0, r, i),
                  (n.fillStyle = I.COLOR.REMARK_T),
                  n.fillText(t, 0, 0);
              } else a.style.display = "none";
            });
        })(),
        q = new (function() {
          var e,
            n,
            a,
            o,
            s = t.market(i.symbol),
            r = /^forex|^HF/.test(s),
            d = isNaN(i.nfloat) ? 2 : i.nfloat,
            u = 150,
            p = new (function() {
              var t = function(t) {
                var n = e.body.style;
                t && I.custom.show_floater
                  ? ((n.backgroundColor = I.COLOR.F_BG),
                    (n.color = I.COLOR.F_T),
                    (n.border = "1px solid " + I.COLOR.F_BR),
                    (n.display = ""))
                  : (n.display = "none");
              };
              (this.pv = function(n) {
                var i = e.body.style,
                  a = Math.max(I.DIMENSION.posX, 55) + 9;
                (i.left =
                  (n.x > I.DIMENSION.getStageW() >> 1
                    ? a
                    : I.DIMENSION.getStageW() - u - 9) + "px"),
                  (i.top = (n.y || 0) + "px"),
                  t(!0);
              }),
                (this.showFloater = t);
            })(),
            f = function() {
              function i() {
                var e,
                  n,
                  i =
                    "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;",
                  a =
                    "font-weight:normal;border:0;height:16px;text-align:center",
                  o =
                    "text-align:left;font-weight:normal;border:0;height:16px;padding:0",
                  s = "text-align:right;border:0;height:16px;padding:0",
                  h = c("div"),
                  p = h.style;
                (p.position = "absolute"),
                  (p.zIndex = I.PARAM.I_Z_INDEX + 2),
                  (p.padding = "2px"),
                  (p.width = u + "px"),
                  (p.lineHeight = "16px"),
                  (p.display = "none"),
                  (p.fontSize = "12px");
                var f,
                  v,
                  g,
                  y,
                  N = c("table"),
                  b = c("thead"),
                  S = c("tbody");
                (N.style.cssText = i),
                  (f = c("tr")),
                  (v = c("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = a);
                var w = c("span");
                v.appendChild(w),
                  f.appendChild(v),
                  b.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  v.setAttribute("colspan", "2"),
                  (v.style.cssText = a);
                var L = c("span");
                v.appendChild(L),
                  f.appendChild(v),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u5f00\u76d8");
                var A = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(A),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6700\u9ad8");
                var k = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(k),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6700\u4f4e");
                var x = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(x),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6536\u76d8");
                var H = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(H),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u6da8\u8dcc");
                var _ = c("span");
                if (
                  ((g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(_),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  !r)
                ) {
                  (f = c("tr")),
                    (v = c("th")),
                    (v.style.cssText = o),
                    (g = c("td")),
                    (y = c("span")),
                    (y.innerHTML = "\u6210\u4ea4");
                  var C = c("span");
                  (g.style.cssText = s),
                    v.appendChild(y),
                    g.appendChild(C),
                    f.appendChild(v),
                    f.appendChild(g),
                    S.appendChild(f),
                    (f = c("tr")),
                    (v = c("th")),
                    (v.style.cssText = o),
                    (g = c("td")),
                    (y = c("span")),
                    (y.innerHTML = "\u6362\u624b");
                  var O = c("span");
                  (g.style.cssText = s),
                    v.appendChild(y),
                    g.appendChild(O),
                    f.appendChild(v),
                    f.appendChild(g),
                    S.appendChild(f),
                    (O.innerHTML = "--");
                }
                (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u632f\u5e45");
                var R = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(R),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u76d8\u540e\u91cf");
                var D = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(D),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f.id = "__floatingPostVolume"),
                  (f.style.display = "none"),
                  (f = c("tr")),
                  (v = c("th")),
                  (v.style.cssText = o),
                  (g = c("td")),
                  (y = c("span")),
                  (y.innerHTML = "\u76d8\u540e\u989d");
                var T = c("span");
                (g.style.cssText = s),
                  v.appendChild(y),
                  g.appendChild(T),
                  f.appendChild(v),
                  f.appendChild(g),
                  S.appendChild(f),
                  (f.id = "__floatingPostAmount"),
                  (f.style.display = "none"),
                  (D.innerHTML = T.innerHTML = "--"),
                  N.appendChild(b),
                  N.appendChild(S),
                  (N.style.width = "100%"),
                  h.appendChild(N);
                var E,
                  K,
                  U = function(e, t) {
                    var n = I.COLOR.F_N;
                    return (
                      e > t
                        ? (n = I.COLOR.F_RISE)
                        : t > e && (n = I.COLOR.F_FALL),
                      n
                    );
                  },
                  P = function(e, t) {
                    return t
                      ? "(" + (((e - t) / Math.abs(t)) * 100).toFixed(2) + "%)"
                      : "(--%)";
                  };
                (this.setFloaterData = function(i) {
                  if (
                    ((e = i.name || i.symbol || e || ""),
                    (w.innerHTML = e),
                    (E = i.data || n))
                  ) {
                    (n = E), (K = i.stock || K);
                    var a = K.market,
                      o = "";
                    switch (a) {
                      case "CN":
                      case "OTC":
                      case "REPO":
                        o = t.isCNK(K.symbol) ? "\u80a1" : "\u624b";
                        break;
                      case "US":
                      case "HK":
                        o = "\u80a1";
                        break;
                      default:
                        o = "";
                    }
                    var s = E.percent,
                      c = E.open,
                      h = E.close,
                      u = E.high,
                      p = E.low,
                      f = h / (1 + s) || E.prevclose;
                    L.innerHTML =
                      m.ds(E.date, "/") +
                      "/" +
                      m.nw(E.date.getDay()) +
                      (E.time || "");
                    var v = 1 > f || 1 > u || 1 > p ? 4 : d;
                    (A.innerHTML = c.toFixed(v) + P(c, f, v)),
                      (k.innerHTML = u.toFixed(v) + P(u, f, v)),
                      (x.innerHTML = p.toFixed(v) + P(p, f, v)),
                      (H.innerHTML = h.toFixed(v) + P(h, f, v)),
                      (s =
                        isNaN(s) || !isFinite(s) ? "--" : (100 * s).toFixed(2)),
                      (_.innerHTML = E.change.toFixed(v) + "(" + s + "%)");
                    var g = isNaN(E.ampP) ? "--" : (100 * E.ampP).toFixed(2);
                    if (
                      (E.ampP === 1 / 0 && (g = "--"),
                      (R.innerHTML = E.amplitude.toFixed(v) + "(" + g + "%)"),
                      (_.style.color = U(s, 0)),
                      (A.style.color = U(c, f)),
                      (k.style.color = U(u, f)),
                      (x.style.color = U(p, f)),
                      (H.style.color = U(h, f)),
                      r || (C.innerHTML = M(E.volume, 2) + o),
                      O && K)
                    ) {
                      var y = K.extraDataObj.rsAmount;
                      if (y) {
                        for (var N, b = 0, S = y.length; S > b; b++)
                          if (E.date >= y[b].date) {
                            N = y[b].amount;
                            break;
                          }
                        K.hq && K.hq.isKCB && N && (N *= 100),
                          N && (O.innerHTML = (E.volume / N).toFixed(2) + "%");
                      } else O.innerHTML = "--";
                    }
                    24 === V.viewId || 23 === V.viewId || 25 === V.viewId
                      ? K.hq &&
                        K.hq.isKCB &&
                        ((l("__floatingPostVolume").style.display =
                          "table-row"),
                        (l("__floatingPostAmount").style.display = "table-row"),
                        E.postVol
                          ? ((D.innerHTML = M(E.postVol, 0) + o),
                            (T.innerHTML = M(E.postAmt, 2)))
                          : ((T.innerHTML = "--"), (D.innerHTML = "--")))
                      : ((l("__floatingPostVolume").style.display = "none"),
                        (l("__floatingPostAmount").style.display = "none"));
                  }
                }),
                  (this.body = h),
                  (this.reset = function() {
                    (e = null), (n = null);
                  });
              }
              (n = new i()), (e = n);
            },
            v = function() {
              function e(e) {
                var t = c("div"),
                  n = c("div"),
                  i = c("span"),
                  a = 12,
                  o = e.isH,
                  s = function() {
                    if (
                      ((n.style.borderStyle = "dashed"),
                      (n.style.borderColor = I.COLOR.IVH_LINE),
                      (i.style.backgroundColor = I.COLOR[e.txtBgCN]),
                      (i.style.color = I.COLOR[e.txtCN]),
                      o)
                    )
                      (n.style.borderWidth = "1px 0 0 0"),
                        (t.style.width = n.style.width =
                          I.DIMENSION.getStageW() + "px"),
                        (i.style.top = -(0.6 * I.STYLE.FONT_SIZE) + "px"),
                        (i.style.width = I.DIMENSION.extend_draw
                          ? ""
                          : I.DIMENSION.posX + "px"),
                        (i.style.left = 0),
                        (i.style.padding = "1px 0");
                    else {
                      n.style.borderWidth = "0 1px 0 0";
                      var a,
                        s,
                        r = I.DIMENSION.H_MA4K + I.DIMENSION.H_T_B;
                      I.DIMENSION.getStageH() < 0
                        ? ((a = R.clientHeight), (s = a - r))
                        : ((a = I.DIMENSION.getStageH() - D.clientHeight || 0),
                          (s = I.DIMENSION.h_k)),
                        (a -= r),
                        (a += I.DIMENSION.I_V_O),
                        (t.style.height = n.style.height = a + "px"),
                        (i.style.top = s + "px"),
                        (i.style.padding = "2px 2px 1px");
                    }
                  };
                (t.style.position = "absolute"),
                  (t.style.zIndex = I.PARAM.I_Z_INDEX - 2),
                  (i.style.position = n.style.position = "absolute"),
                  (n.style.zIndex = 0),
                  (i.style.zIndex = 1),
                  (i.style.font =
                    I.STYLE.FONT_SIZE + "px " + I.STYLE.FONT_FAMILY),
                  (i.style.whiteSpace = "nowrap"),
                  (i.style.lineHeight = a + "px"),
                  e.txtA && (i.style.textAlign = e.txtA),
                  s(),
                  t.appendChild(i),
                  t.appendChild(n);
                var r = function(e) {
                  e
                    ? "" != t.style.display && (t.style.display = "")
                    : "none" != t.style.display && (t.style.display = "none");
                };
                (this.pv = function(e) {
                  if (
                    (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"),
                    (i.innerHTML = e.v || ""),
                    !isNaN(e.x))
                  ) {
                    e.x < 0 && (e.x = 0);
                    var n = e.x + (e.ox || 0),
                      a = I.DIMENSION.getStageW();
                    (n = ~~(n + 0.5)), (n -= 1), (t.style.left = n + "px");
                    var o = i.offsetWidth || 66,
                      s = o >> 1;
                    e.x < s ? (s = e.x) : n + s > a && (s = n + o - a),
                      (i.style.left = -s + "px");
                  }
                  r(!0);
                }),
                  (this.display = r),
                  (this.body = t),
                  (this.resize = s),
                  r(!1);
              }
              (a = new e({
                isH: !0,
                txtCN: "P_TC",
                txtBgCN: "P_BG",
                txtA: "right"
              })),
                (o = new e({
                  isH: !1,
                  txtCN: "T_TC",
                  txtBgCN: "T_BG",
                  txtA: "center"
                })),
                H.appendChild(o.body);
            },
            g = function() {
              a.display(!1), o.display(!1), p.showFloater(!1);
            },
            y = function(e) {
              E && E.indirectI(e), K && K.indirectI(e);
            },
            N = !1,
            S = !1,
            w = 0 / 0,
            L = !1;
          (this.getInteractiveIdx = function() {
            return w;
          }),
            (this.isIng = function() {
              return N;
            }),
            (this.isMoving = function() {
              return L;
            });
          var x = 0 / 0,
            C = 0 / 0,
            O = [];
          this.iToD = function(t, n, i) {
            if (!t.e || !S) {
              var s = t.x,
                r = t.ox || 0,
                l = t.y,
                c = t.oy || 0,
                h = t.e ? t.e.target : null;
              if (!i) {
                if (x == s && C == l) return;
                (x = s), (C = l);
              }
              if (h) {
                var u = h.style.height.split("px")[0];
                (0 > l || l > u) && ((s = 0 / 0), (l = 0 / 0));
              }
              var m = V.currentLength,
                f = Math.max(m, I.PARAM.minCandleNum);
              s += I.DIMENSION.w_k / f - Y.x;
              var v = Math.floor((s * f) / I.DIMENSION.w_k);
              if (
                (0 > v ? (v = 0) : v >= m && (v = m - 1),
                !isNaN(v) && (w = v),
                isNaN(s) && isNaN(l))
              )
                return (N = !1), g(), y(Number.MAX_VALUE), void W.onViewPrice();
              N = V.end != V.dataLength ? !0 : m - 1 > v;
              for (var M, L, H, _, R, D, T, E = Number(t.mark); O.length; )
                O.length--;
              if (n) {
                var K = k.getAllStock(),
                  U = K.length,
                  P = U > 1 || "percent" == I.datas.scaleType;
                I.custom.k_overlay && (P = !1);
                for (var F, z, B, X, q = Number.MAX_VALUE, G = 0; U > G; G++)
                  (B = K[G]),
                    (R = B.datas),
                    !R ||
                      R.length <= v ||
                      ((F = B.getName()),
                      (z = R[v]),
                      O.push({
                        name: F,
                        data: z,
                        rangedata: R,
                        symbol: B.symbol,
                        color: B.getLineStyle().linecolor
                      }),
                      z.isFake ||
                        ((X = Math.abs(z.cy - l)),
                        q > X &&
                          ((q = X),
                          (_ = B),
                          (H = z),
                          (T = R),
                          (L = F),
                          (M = _.symbol))));
                if (P)
                  (D = 100 * E),
                    (D = Math.abs(D) > 999 ? Math.floor(D) : D.toFixed(2)),
                    (D += "%");
                else if (
                  ((D =
                    E > 99999 ? Math.floor(E) : E.toFixed(E > 9999 ? 1 : d)),
                  I.custom.show_k_rangepercent && _)
                ) {
                  var Z = ((E - _.prevclose) / _.prevclose) * 100;
                  (Z = isNaN(Z) || !isFinite(Z) ? "--" : Z.toFixed(d)),
                    (D += "<br/>" + Z + "%");
                }
              } else {
                if (
                  ((_ = k.getMainStock()), (R = _.datas), !R || R.length <= v)
                )
                  return;
                (H = R[v]), (T = R), (L = _.getName()), (M = _.symbol);
                var $ = Math.abs(E);
                (D = $ > 99999 ? Math.floor(E) : E.toFixed($ > 9999 ? 1 : d)),
                  O.push({
                    name: L,
                    data: H,
                    rangedata: T,
                    symbol: M,
                    color: _.getLineStyle().linecolor
                  });
              }
              if (H) {
                var j = s;
                I.custom.stick && (s = H.ix || s),
                  e &&
                    (e.setFloaterData({
                      symbol: M,
                      name: L,
                      data: H,
                      stock: _,
                      arr: O
                    }),
                    p.pv({ x: j, y: I.DIMENSION.K_F_T })),
                  a.pv({ y: l, v: D, oy: c }),
                  o.pv({
                    x: s,
                    ox: r,
                    y: I.DIMENSION.H_MA4K,
                    v: H.day + " " + (H.time || "")
                  }),
                  y(v),
                  !L && (L = M || "--"),
                  W.onViewPrice(H, v, O, T, L, !0),
                  A.re(b.e.I_EVT, t.e);
              }
            }
          };
          var T, U, P;
          this.iToKb = function(e, t) {
            if (t) return void (S = !1);
            if (
              ((S = !0),
              (w += e),
              !h(_, q.iHLineO.body) && _.appendChild(q.iHLineO.body),
              (T = k.getMainStock()),
              (P = T.getName()),
              (U = T.datas),
              !U)
            )
              return void 0;
            if (0 > w) return (w = 0), -1;
            if (w >= U.length) return (w = U.length - 1), 1;
            var n = U[w];
            if (!n) return void 0;
            var i = {
              mark:
                T.labelMaxP -
                (n.cy / I.DIMENSION.h_k) * (T.labelMaxP - T.labelMinP),
              x: n.ix,
              y: n.cy,
              oy: I.DIMENSION.H_MA4K,
              ox: I.DIMENSION.posX
            };
            return void this.iToD(i, !0, !0);
          };
          var F;
          (this.globalDragHandler = function(e, t, n, i, a) {
            if (isNaN(e) && isNaN(t))
              return (F = 0 / 0), (L = !1), void A.re(b.e.I_EVT, a);
            g();
            var o = V.start,
              s = V.end,
              r = s - o;
            isNaN(F) && (F = e);
            var l = t - F,
              c = V.dataLength,
              h = I.DIMENSION.w_k / r;
            if (Math.abs(l) < h) {
              if (I.custom.smooth && h > 4) {
                if (s >= c && 0 > l) return;
                if (1 > o && l > 0) return;
                (Y.x = l), k.callSdDraw();
              }
            } else {
              F = t;
              var d = Math.round((l * r) / I.DIMENSION.w_k);
              (o -= d),
                (s -= d),
                s >= c && ((s = c), (o = s - r)),
                0 > o && ((o = 0), (s = r)),
                (V.start != o || V.end != s) &&
                  (Y.resetX(0), (V.movY = i - n), k.moving(o, s, !0), (L = !0));
            }
          }),
            (this.shortClickHandler = function() {
              W.shortClickHandler();
            }),
            (this.zoomView = function(e, t) {
              var n = -Number(e);
              0 == n && (n = 1);
              var i = V.start,
                a = V.end,
                o = n * Math.ceil((a - i) / I.PARAM.zoomUnit);
              if (
                (Math.abs(o) > I.PARAM.zoomLimit && (o = n * I.PARAM.zoomLimit),
                I.custom.centerZoom)
              ) {
                var s = Math.min.apply(Math, t),
                  r = s / I.DIMENSION.w_k,
                  l = Math.max.apply(Math, t),
                  c = l / I.DIMENSION.w_k;
                r < I.PARAM.zoomArea
                  ? (a = Math.min(a - o * Math.abs(o), V.dataLength))
                  : c > 1 - I.PARAM.zoomArea
                  ? (i = Math.max(i + o * Math.abs(o), 0))
                  : ((i = Math.max(i + o * Math.abs(o), 0)),
                    (a = Math.min(a - o * Math.abs(o), V.dataLength)));
              } else i = Math.max(i + o * Math.abs(o), 0);
              k.moving(i, a);
            }),
            f(),
            v(),
            (this.onResize = function() {
              a.resize(), o.resize();
            }),
            (this.iHLineO = a),
            (this.hideIUis = g),
            (this.update = function() {
              N || (y(Number.MAX_VALUE), e && e.setFloaterData({}));
            }),
            (this.iReset = function() {
              e.reset && e.reset();
            }),
            (this.patcher = new (function() {
              var i,
                a = {},
                o = function() {
                  if (i) {
                    e.body.parentNode && e.body.parentNode.removeChild(e.body);
                    var t = "vid_" + V.viewId;
                    if (i[t]) {
                      var o;
                      (o = a[t] ? a[t] : (a[t] = new i[t]())), (e = o);
                    } else e = n;
                  } else e = n;
                  !h(H, e.body) && H.appendChild(e.body);
                };
              (this.customFloater = function(e) {
                (i = e), o(), t.stc("k_fl", e);
              }),
                (this.switchFloater = o);
            })());
        })();
      k = new L();
      var G = new (function() {
        var e = this;
        this.resize = function(e, t) {
          X.resizeAll(!0, e, t);
        };
        var n,
          i = function(n, i) {
            if (I.hasOwnProperty(n)) {
              for (var a in i)
                if (i.hasOwnProperty(a) && t.isFunc(i[a])) return;
              "DIMENSION" == n && (z = 1), p(I[n], i), t.stc(n, i), e.resize();
            }
          },
          a = function(e, n) {
            var i;
            if (I.hasOwnProperty(e)) {
              i = t.clone(I[e], null);
              for (var a in i)
                if (i.hasOwnProperty(a))
                  if (t.isFunc(i[a])) (i[a] = null), delete i[a];
                  else if (n)
                    for (var o = n.length; o--; )
                      typeof i[a] === n[o] && ((i[a] = null), delete i[a]);
            }
            return i;
          },
          o = function(e, t, n) {
            (n = p(
              { toremove: !1, isexclusive: !1, callback: void 0, addon: !1 },
              n || {}
            )),
              n.toremove
                ? k.mM.removeAC(t, e)
                : n.isexclusive
                ? (k.mM.removeAC(null, e), k.mM.newAC(t, e, n))
                : k.mM.newAC(t, e, n);
          };
        (this.setLineStyle = function(e, i) {
          i || (n = e), k.setLineStyle(e), t.stc("k_style", e);
        }),
          (this.showScale = function(e) {
            k.setScale(e), t.stc("k_scale", e);
          }),
          (this.pushData = function(e, n) {
            !t.isArr(e) && (e = [e]), k.pushData(e, n);
          });
        var s,
          r,
          c = [],
          h = function() {
            if (c.length) {
              var e = c.shift();
              k.pushData([e], 1);
            } else clearInterval(r);
          },
          d = function() {
            r = setInterval(h, 1);
          };
        (this.pushTr = function(e) {
          if (e && e.data) {
            for (
              var t,
                n = e.data.split(","),
                i = e.symbol,
                a = e.market,
                o = 0,
                r = n.length;
              r > o;
              o++
            )
              (t = { symbol: i, data: n[o], market: a }), c.push(t);
            clearTimeout(s), (s = setTimeout(d, 20));
          }
        }),
          (this.hide = function(e) {
            (F = !0),
              q.hideIUis(),
              t.$CONTAINS(x, H) && x.removeChild(H),
              e && k.dcReset();
          }),
          (this.show = function(e) {
            (F = !1),
              e && (t.isStr(e) && (e = l(e)), (x = e)),
              t.$CONTAINS(x, H) || (x.appendChild(H), X.resizeAll(!0)),
              k.outputNewRange(!0),
              W.onViewPrice();
          });
        var u = 0,
          m = !1,
          f = function(e) {
            var t;
            switch (e) {
              case 1:
                t = "\u540e\u590d\u6743";
                break;
              case -1:
                t = "\u524d\u590d\u6743";
            }
            X.drawReMark(t);
          },
          v = [],
          g = [],
          M = function() {
            for (; v.length; ) {
              var e = v.pop();
              g.length--, k.compare(e);
            }
          },
          N = function() {
            for (
              var e,
                t = k.getMainStock().symbol,
                n = k.getMainStock().market,
                i = k.getAllStock(),
                a = i.length;
              a--;

            ) {
              e = i[a];
              var o = e.symbol;
              if (o != t) {
                var s = e.market;
                s != n &&
                  ("US" == s ||
                    "US" == n ||
                    "HK" == s ||
                    "HK" == n ||
                    "OTC" == s ||
                    "OTC" == n ||
                    "option_cn" == s ||
                    "option_cn" == n) &&
                  (v.push(e), g.push(o));
              }
            }
            g.length && k.removeCompare(g, !0);
          },
          S = function() {
            (m = !1),
              e.setLineStyle(void 0, !0),
              e.showScale(void 0),
              k.mM.togglePt({ v: !0, ytd: !0 });
          },
          w = function(e) {
            "mink" == b.URLHASH.gt(e).type
              ? ((V.viewId = e), f(), N())
              : ((e += u), (V.viewId = e), f(u), M());
          },
          L = new (function() {
            (this.isClMode = !1),
              (this.exitClMode = function() {
                (this.isClMode = !1),
                  e.setLineStyle(n, !0),
                  k.mM.togglePt({ v: !0, ytd: !0 });
              }),
              (this.enterClMode = function() {
                this.isClMode = !0;
                var t = n && "mountain" == n.linetype ? "mountain" : "line";
                e.setLineStyle(
                  { linetype: t, linecolor: { K_CL: I.COLOR.T_P } },
                  !0
                ),
                  k.mM.togglePt({ v: !1, ytd: !0 });
              });
          })(),
          _ = !0;
        this.showView = function(e, n, i) {
          q.hideIUis(),
            _
              ? setTimeout(function() {
                  _ = !1;
                }, 99)
              : P.hide();
          var a = t.isNum(e) ? b.URLHASH.vn(e) : b.URLHASH.vi(e);
          if (a) {
            if ((m && S(), a == b.URLHASH.KCL)) L.enterClMode();
            else {
              L.isClMode && L.exitClMode();
              var o = k.getAllStock(),
                s = o && o.length > 1;
              s && k.mM.togglePt({ v: !1 });
            }
            w(a), k.onChangeView(!1, n), t.stc("k_v", e), !i && t.suda("vw", e);
          }
        };
        var C = !1;
        (this.showYTD = function(e, n) {
          (C = !!e),
            q.hideIUis(),
            m ||
              ((m = !0),
              this.setLineStyle(
                { linetype: "line", linecolor: { K_CL: I.COLOR.T_P } },
                !0
              ),
              !C && this.showScale("percent"),
              k.mM.togglePt({ v: !1, ytd: !0 })),
            f(u),
            k.showYTD(u, C),
            t.stc("k_v", b.URLHASH.NYTD),
            !n && t.suda("vw", b.URLHASH.NYTD);
        }),
          (this.showYear = function() {
            this.showYTD(!0);
          }),
          (this.setReK = function(e) {
            if (((e = parseInt(e)), !(isNaN(e) || Math.abs(e) > 1))) {
              u = e;
              var n = b.URLHASH.gt(V.viewId);
              t.stc("k_re", e);
              var i = e;
              "-1" == i && (i = "_1"),
                t.suda("k_re", "k_re" + i),
                "mink" != n.type &&
                  (m
                    ? this.showYTD(C, !0)
                    : this.showView(n.baseid, void 0, !0));
            }
          });
        var O = function(e) {
          var n;
          return (n = t.isStr(e) ? e.split(",") : [e.symbol]);
        };
        this.compare = function(e, n) {
          if (n) {
            for (var i = O(e), a = i.length; a--; )
              for (var o = g.length; o--; )
                if (i[a] == g[o]) {
                  g.splice(o, 1), v.splice(o, 1);
                  break;
                }
            k.removeCompare(O(e));
          } else k.compare(e), t.suda("k_comp");
          t.stc("k_comp", { rm: n, o: e });
        };
        var R = 0;
        this.tCharts = function(e, n) {
          o("tech", e, n), n && !n.noLog && (0 == R ? (R = 1) : t.sudaLog());
        };
        var D = 0;
        (this.pCharts = function(e, n) {
          o("price", e, n), n && !n.noLog && (0 == D ? (D = 1) : t.sudaLog());
        }),
          (this.showPCharts = function(e) {
            e && (k.mM.togglePt(e), t.stc("k_sp", e));
          }),
          (this.getIndicators = function() {
            var e = E ? E.getLog() : null,
              t = K ? K.getLog() : null;
            return { tCharts: e, pCharts: t };
          }),
          (this.getIndicatorData = function() {
            var e = E ? E.getExistingCharts() : null,
              t = K ? K.getExistingCharts() : null;
            return { tCharts: e, pCharts: t };
          });
        var Y;
        (this.showRangeSelector = function(e) {
          (Y = p({ display: !0, from: void 0, to: void 0 }, e || {})),
            k.mM.showRs(Y),
            t.stc("k_rs", e);
        }),
          (this.dateFromTo = function(e, n, i) {
            U && (U.dateFromTo(e, n, i), t.stc("k_ft", [e, n, i]));
          }),
          (this.setCustom = y(i, this, "custom")),
          (this.setTheme = function(e) {
            var t = X.initTheme(e);
            t && (this.setLineStyle({ linecolor: e }), this.resize());
          }),
          (this.setDimension = y(i, this, "DIMENSION")),
          (this.getDimension = y(a, null, "DIMENSION", ["boolean"])),
          (this.newSymbol = function(e) {
            if (
              (q.hideIUis(),
              q.iReset(),
              k.dcReset(),
              k.dcInit(e),
              B.hideTip(),
              E)
            ) {
              var n = E.getLog();
              (E = null), n && this.tCharts(n);
            }
            if (K) {
              var i = K.getLog();
              (K = null), i && this.pCharts(i);
            }
            Y && ((Y.from = void 0), (Y.to = void 0), k.mM.showRs(Y)),
              k.h5tM.resetHisT(),
              t.stc("k_ns", e);
          }),
          (this.toggleExtend = function() {
            var e = I.DIMENSION.extend_draw,
              t = I.DIMENSION.posX;
            i.call(this, "DIMENSION", {
              extend_draw: !e,
              posX: t > 9 ? 7 : 55
            }),
              this.resize();
          }),
          (this.shareTo = function(e) {
            k.shareTo(e), t.stc("k_share", e);
            var n = e && e.type ? e.type : "weibo";
            t.suda("share", n);
          }),
          (this.getChartId = function() {
            return I.uid;
          }),
          (this.getSymbols = function() {
            return k.getAllSymbols();
          }),
          (this.patcher = { iMgr: q.patcher }),
          (this.getExtraData = function(e) {
            return k.getExtraData(e);
          }),
          (this.getCurrentData = function() {
            var e = T.get(V.viewId);
            return e && (e = e[e.length - 1]), t.clone(e, null);
          }),
          (this.getCurrentRange = function() {
            for (
              var e, t, n, i = [], a = k.getAllStock(), o = 0, s = a.length;
              s > o;
              o++
            )
              (n = a[o]),
                (t = n.getName()),
                (e = n.datas),
                i.push({ name: t, rangedata: e, symbol: n.symbol });
            return i;
          }),
          (this.zoom = function(e) {
            k.zoomApi(e), t.stc("k_zoom", e, 9e3);
          }),
          (this.rangeMove = function(e, t) {
            k.moving(e, t);
          }),
          (this.move = function(e) {
            (e = parseInt(e)),
              isNaN(e) || (k.moveApi(e), t.stc("k_move", e, 9e3));
          }),
          (this.update = function() {
            k.updateDataAll(), t.stc("k_up", 9e3);
          }),
          (this.type = "h5k"),
          (this.me = A);
      })();
      return k.dcInit(i), G;
    }
    function a() {
      (this.get = function(e, n) {
        t.stc("h5k_get");
        var a = new i(e);
        t.isFunc(n) && n(a), t.suda("h5k_" + t.market(e.symbol));
      }),
        (this.dual = function(e, n) {
          t.stc("h5k_dual"), (e.linetype = "line");
          var a = new i(e);
          a.setCustom({ k_overlay: !0 });
          var o = function(t) {
            a.me.rl(t, o);
            var n = e.dual;
            a.compare({
              symbol: n.symbol,
              name: n.name,
              datas: n.datas,
              linetype: "line",
              linecolor: n.theme
            });
          };
          a.me.al(b.e.K_DATA_LOADED, o, !1),
            t.isFunc(n) && n(a),
            t.suda("dual_" + t.market(e.symbol));
        }),
        (this.tick = function(e, n) {
          t.stc("h5k_tick"),
            (e.pcm = 1),
            (e.view = b.URLHASH.NKMS),
            (e.rate = 600),
            (e.linetype = "line");
          var a = new i(e, !0);
          t.isFunc(n) && n(a),
            KKE.api("patch.atick.customfloater", { chart: a }, function(e) {
              a.patcher.iMgr.customFloater(e);
            }),
            a.setCustom({ smooth: !1 }),
            t.suda("tick_" + t.market(e.symbol));
        });
    }
    var o,
      s,
      r,
      l = t.$DOM,
      c = t.$C,
      h = t.$CONTAINS,
      d = t.xh5_PosUtil,
      u = t.xh5_EvtUtil,
      p = t.oc,
      m = t.dateUtil,
      f = m.stbd,
      v = t.xh5_ADJUST_HIGH_LOW.c,
      g = t.xh5_BrowserUtil,
      y = t.fBind,
      M = t.strUtil.ps,
      N = n.xh5_Canvas,
      b = e.globalCfg,
      S = t.logoM;
    return t.fInherit(i, t.xh5_EvtDispatcher), a;
  }
);

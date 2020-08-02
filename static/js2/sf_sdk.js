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
        custom_mod_url: "/static/js2",
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
        DEP_ERR: "error def module",
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
            },
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

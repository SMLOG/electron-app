var xh5_define,
  KKE = KKE || {};
~(function (KKE) {
  "use strict";
  function api(name, config, callback) {
    if (!util.isStr(name))
      return void util.err(callback, [modConfig.CMD_UNEXIST, name].join(":"));
    config = config || {};
    var a = name.split("."),
      actionName = a.splice(a.length - 1, a.length).join(""),
      u = a.splice(a.length - 1, a.length).join(""),
      s = a.splice(0, a.length),
      o = s.join("."),
      modName = [o, u].join(".");

    module.relyCall(modName,
      function () {
        var modsTree = module.modsTree,
          o = void 0;
        do {
          var d = s.shift();
          if (((o = o ? o[d] : modsTree[d]), !o))
            return void util.err(callback, [modConfig.MOD_ERR, u].join(":"));

        } while (s.length);

        var c = o[u] || {};
        var entity = c.entity || {};
        var actionMethod = entity[actionName];

        if ("undefined" == typeof actionMethod)
          util.err(callback, [modConfig.CMD_UNEXIST, name].join(":"))
        else {
          if (util.isFunc(actionMethod))
            actionMethod(config, callback)
          else
            util.isFunc(callback) && callback(actionMethod);
        }

      },
      config.modUrl || null
    );
  }
  for (
    var r,
    a,
    modConfig = {
      SDK_REG: new RegExp("sf_sdk.js", u),
      isLocal: !1,
      isDebug: !1,
      isSSL: !0,
      //        custom_mod_url: 0,
      custom_mod_url: "/static/js",
      MOD_URL: "js/$moduleName.js",
      MOD_URL_PROD:
        "http://finance.sina.com.cn/sinafinancesdk/js/$moduleName.js",
      MOD_URL_PROD_S:
        "https://finance.sina.com.cn/sinafinancesdk/js/$moduleName.js",
      getModUrl: function () {
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
    scripts = document.getElementsByTagName("script"),
    u = scripts.length;
    u--;

  )
    if (((r = scripts[u]), (a = r.src || ""), modConfig.SDK_REG.test(a))) {
      for (var s, o = r.attributes.length; o--;)
        (s = r.attributes[o]),
          "ssl" == s.name && (modConfig.isSSL = "true" == s.value),
          "debug" == s.name && (modConfig.isDebug = "true" == s.value),
          "local" == s.name && (modConfig.isLocal = "true" == s.value),
          "murl" == s.name && (modConfig.custom_mod_url = s.value);
      break;
    }
  0 == location.protocol.indexOf("https:") && (modConfig.isSSL = !0);
  var util = new (function () {
    function getScript(url, onLoaded, onError, charset) {
      var i = !1,
        n = document.createElement("script"),
        u = document.getElementsByTagName("script")[0],
        s =
          document.head ||
          document.getElementsByTagName("head")[0] ||
          document.documentElement,
        o = s.getElementsByTagName("base")[0];
      (n.charset = charset || "gb2312"),
        (n.src = url),
        (n.async = !0),
        (n.onload = n.onreadystatechange = function () {
          i ||
            (n.readyState && !/loaded|complete/.test(String(n.readyState))) ||
            ((i = !0),
              (n.onload = n.onreadystatechange = n.onerror = null),
              n.parentNode.removeChild(n),
              (n = null),
              "function" == typeof onLoaded && onLoaded());
        }),
        (n.onerror = function () {
          (n.onload = n.onreadystatechange = n.onerror = null),
            n.parentNode.removeChild(n),
            (n = null),
            "function" == typeof onError && onError();
        }),
        u.parentNode
          ? u.parentNode.insertBefore(n, u)
          : o
            ? s.insertBefore(n, o)
            : s.appendChild(n);
    }
    this.fBind = function (method, _this) {
      var args = Array.prototype.slice.call(arguments, 2);
      return function () {
        return method.apply(
          _this,
          args.concat(Array.prototype.slice.call(arguments))
        );
      };
    };
    var t = function (e) {
      return function (param1) {
        return {}.toString.call(param1) == "[object " + e + "]";
      };
    };
    (this.isStr = t("String")),
      (this.isFunc = t("Function")),
      (this.isArr = t("Array")),
      (this.trace = (function (e) {
        return {
          log: function () {
            e && e.log && e.log.apply(e, arguments);
          },
          error: function () {
            e && e.error && e.error.apply(e, arguments);
          }
        };
      })(null)),
      (this.err = function (e, t) {
        this.isFunc(e) &&
          e({
            msg: t,
            data: null
          }),
          this.trace.error(t);
      }),
      (this.getScript = getScript);
  })(),
    modulesArr = ["datas.hq", "datas.k", "datas.t", "utils.util"],
    module = new (function () {
      function _xh5_define(modName, depends, modfunc) {
        if (3 != arguments.length)
          return void util.trace.error(modConfig.MOD_DEF_ERR, modName);
        var n = parseModName(modName),
          modTreeNode = n[0],
          childName = n[1],
          modEntity = modTreeNode[childName];
        modEntity
          ? (modEntity.init = !0)
          : (modEntity = modTreeNode[childName] = {
            init: !0,
            name: modName,
            funcQ: [],
            entity: void 0
          }),
          util.isStr(depends) && (depends = [depends]);
        for (var item, len = depends.length; len--;)
          if (((item = depends[len]), item.indexOf("*") > -1)) {
            depends.splice(len, 1);
            var p = item.split(".");
            p.splice(p.length - 1, p.length);
            var h = p.join(".");
            depends = depends.concat(c(h, modName));
            break;
          }
        recursiveDepends(depends, depends.slice(0), modEntity, modfunc);
      }
      var modsTree = {},
        parseModName = function (modName) {
          for (
            var r,
            arr = modName.split("."),
            childName = arr.splice(arr.length - 1, arr.length).join(""),
            newArr = arr.splice(0, arr.length),
            parentPackage = newArr.join("."),
            s = void 0;
            newArr.length;

          ) {
            var rootName = newArr.shift();
            s
              ? ((r = s[rootName]), r || (r = s[rootName] = {}))
              : ((r = modsTree[rootName]), r || (r = modsTree[rootName] = {})),
              (s = r);
          }
          return [s, childName, parentPackage];
        },
        forEachModfuncQ = function (e) {
          for (; e.funcQ.length;) {
            var t = e.funcQ.shift();
            util.isFunc(t) && t();
          }
        },
        n = function (dependsArr) {
          if (!dependsArr) return null;
          for (var r = [], a = [], n = 0, u = dependsArr.length; u > n; n++) {
            for (var s, o = dependsArr[n].split("."), d = void 0; o.length;)
              if (((s = o.shift()), (d = d ? d[s] : modsTree[s]), !d)) {
                util.trace.error(modConfig.DEP_ERR, o.toString());
                break;
              }
            a.push(d.entity), r.push(s);
          }
          return {
            n: r,
            e: a
          };
        },
        recursiveEnd = function (modEntity, modfunc, dependsArr) {
          var u = modfunc.toString(),
            s = 0 == u.indexOf("function");
          if (s) {
            var o = n(dependsArr),
              moduleFunc = modfunc.apply(null, o.e.concat(modsTree));
            modEntity.entity = util.isFunc(moduleFunc)
              ? new moduleFunc()
              : moduleFunc;
          } else modEntity.entity = modfunc;
          forEachModfuncQ(modEntity);
        },
        recursiveDepends = function (
          dependsArr,
          dependsArrCopy,
          modEntity,
          modfunc
        ) {
          dependsArrCopy.length
            ? relyCall(
              dependsArrCopy.shift(),
              util.fBind(
                recursiveDepends,
                this,
                dependsArr,
                dependsArrCopy,
                modEntity,
                modfunc
              )
            )
            : recursiveEnd(modEntity, modfunc, dependsArr);
        },
        loadUrlScript = function (module, t, r) {
          (t = t.replace(/\./g, "/")), r && (r += "$moduleName.js");
          var modUrl = r || modConfig.getModUrl();
          util.getScript(
            modUrl.replace("$moduleName", t),
            null,
            util.fBind(util.trace.error, this, modConfig.CMD_404, module.name)
          );
        },
        loadUrlModule = function (modName, modUrl) {
          util.isArr(modName) && (modName = modName.join("."));
          var a = parseModName(modName),
            modTreeNode = a[0],
            n = a[1],
            modNode = modTreeNode[n];
          return (
            modNode ||
            ((modNode = {
              init: !1,
              name: modName,
              funcQ: [],
              entity: void 0
            }),
              (modTreeNode[n] = modNode),
              loadUrlScript(modNode, modName, modUrl)),
            modNode
          );
        },
        c = function (e, t) {
          for (var r, a = [], i = modulesArr.length; i--;)
            (r = modulesArr[i]),
              0 == r.indexOf(e) && -1 == r.indexOf(t) && (a[a.length] = r);
          return a;
        },
        relyCall = function (modName, callback, modUrl) {
          var mod = loadUrlModule(modName, modUrl);
          util.isFunc(callback) &&
            (mod.init ? callback() : mod.funcQ.push(callback));
        };
      (this.modsTree = modsTree),
        (this.relyCall = relyCall),
        (xh5_define = _xh5_define);
    })();
  (KKE.api = api),
    (KKE.cls = {}),
    (KKE.istLL = "KKE|1.0.4|WANGXuan|SinaFinance|wangxuan2@staff.sina.com.cn");
})(KKE);
xh5_define("utils.util", [], function () {
  return function () {
    function t(t, e) {
      var i = x(e.prototype);
      (i.constructor = t), (t.prototype = i);
    }
    function xh5_EvtDispatcher() {
      this.evtObj = {};
    }
    function fbind(t, e) {
      var i = Array.prototype.slice.call(arguments, 2);
      return function () {
        return t.apply(e, i.concat(Array.prototype.slice.call(arguments)));
      };
    }
    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    function r(t, e) {
      e || (t = t.toLowerCase());
      for (var i, n = 1315423911, r = t.length; r--;)
        (i = t.charCodeAt(r)), (n ^= (n << 5) + i + (n >> 2));
      return 2147483647 & n;
    }
    function getScript(url, e, i, n) {
      console.log(url);
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
        (a.src = url),
        (a.async = !0),
        (a.onload = a.onreadystatechange = function () {
          if (!r && (!a.readyState || /loaded|complete/.test(a.readyState))) {
            if (u) {
              var t = new Date() - u,
                i = n.market.toLowerCase(),
                o = n.type.toLowerCase();
              k.sima({
                simadata: {
                  cre: i,
                  mod: o,
                  during: t
                },
                symbol: n.symbol,
                type: n.type
              });
            }
            console.log(url);
            (r = !0),
              (a.onload = a.onreadystatechange = a.onerror = null),
              a.parentNode.removeChild(a),
              (a = null),
              "function" == typeof e && e();
          }
        }),
        (a.onerror = function () {
          if (u) {
            var t = new Date() - u,
              e = n.market.toLowerCase(),
              r = n.type.toLowerCase();
            k.sima({
              simadata: {
                cre: e,
                mod: r,
                during: t,
                error_type: "err"
              },
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
          (r = u.$C("div")),
            t({
              dom: r,
              style: l.ctn
            });
          for (var i = 0.1, n = 0, a = l.color.length; a > n; n++) {
            var o = u.$C("span");
            t({
              dom: o,
              style: l.item
            });
            var s = u.clone(l.delay, s),
              c = -1 + i * n + "s";
            for (var h in s) s.hasOwnProperty(h) && (s[h] = c);
            t({
              dom: o,
              style: s
            }),
              (o.style.background = l.color[n]),
              r.appendChild(o);
          }
        }
      }
      function timeoutHide() {
        clearTimeout(timerID),
          (timerID = setTimeout(function () {
            "none" != r.style.display && (r.style.display = "none");
          }, 9e3));
      }
      var r,
        a,
        timerID,
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
        (this.appendto = function (t, e) {
          (a = t), (s = e), a.appendChild(r);
        }),
        (this.setPosition = function () {
          a && a.offsetHeight > 0
            ? ((r.style.top = (a.offsetHeight - v(l.ctn.height)) / 2 + "px"),
              (r.style.left = (a.offsetWidth - v(l.ctn.width)) / 2 + "px"))
            : s &&
            s.DIMENSION.h_t &&
            ((r.style.top = (s.DIMENSION.h_t - v(l.ctn.height)) / 2 + "px"),
              (r.style.left = (s.DIMENSION._w - v(l.ctn.width)) / 2 + "px"));
        }),
        (this.show = function () {
          timeoutHide(), (r.style.display = "");
        }),
        (this.hide = function () {
          clearTimeout(timerID), (r.style.display = "none");
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
        c = function () {
          clearTimeout(o),
            i && ((i.style.display = "none"), (s.innerHTML = "")),
            e && isFunction(e.closeCb) && e.closeCb();
        },
        h = function (h) {
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
      c = function (t) {
        return function (e) {
          return {}.toString.call(e) == "[object " + t + "]";
        };
      },
      isObject = c("Object"),
      isString = c("String"),
      isFunction = c("Function"),
      isArray = c("Array"),
      isNumber = c("Number"),
      isDate = c("Date");
    (this.isObj = isObject),
      (this.isStr = isString),
      (this.isFunc = isFunction),
      (this.isArr = isArray),
      (this.isNum = isNumber),
      (this.isDate = isDate);
    var v = function (t) {
      return parseInt(t, 10);
    };
    this.uae = function (t) {
      for (var e, i = [], n = {}, r = 0, a = t.length; a > r; r++)
        (e = t[r]), 1 !== n[e] && ((n[e] = 1), (i[i.length] = e));
      return i;
    };
    var b = new (function () {
      var t;
      if (XMLHttpRequest) t = new XMLHttpRequest();
      else if (ActiveXObject)
        try {
          t = new ActiveXObject("MSXML2.XMLHTTP");
        } catch (e) {
          try {
            t = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (i) { }
        }
      this.send = function (e, i, n, r) {
        if (!t || !e) return void (n && n("error while sending"));
        if (
          ((e += e.indexOf("?") < 0 ? "?" : "&"),
            (e += "_=" + new Date().getTime()),
            (r = r || "POST"),
            (t.onreadystatechange = function () {
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
      (this.trace = (function (t) {
        return {
          log: function () {
            t && t.log && t.log.apply(t, arguments);
          },
          error: function () {
            t && t.error && t.error.apply(t, arguments);
          }
        };
      })(null));
    var arrIndexOf = function (t, e) {
      var i = -1;
      if (t.indexOf) i = t.indexOf(e);
      else
        for (var n = t.length; n--;)
          if (t[n] === e) {
            i = n;
            break;
          }
      return i;
    };
    this.arrIndexOf = arrIndexOf;
    var clone = function (t, e) {
      if (null == t || "object" != typeof t) return t;
      if (
        t.constructor == Date ||
        t.constructor == RegExp ||
        isFunction(t) ||
        isString(t) ||
        t.constructor == Number ||
        t.constructor == Boolean
      )
        return new t.constructor(t);
      e = e || new t.constructor();
      for (var i in t)
        t.hasOwnProperty(i) &&
          (e[i] = "undefined" == typeof e[i] ? clone(t[i], null) : e[i]);
      return e;
    };
    this.clone = clone;
    var cloneObject = function (t) {
      if (!t) return t;
      var e = {};
      for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
      return e;
    };
    this.co = cloneObject;
    //copy properties
    this.oc = function (targetObj, sourceObj) {
      if (!targetObj) return sourceObj;
      for (var i in sourceObj)
        sourceObj.hasOwnProperty(i) &&
          (targetObj[i] = isObject(targetObj[i]) && isObject(sourceObj[i]) ? arguments.callee(targetObj[i], sourceObj[i]) : sourceObj[i]);
      return targetObj;
    };
    var x = function (t) {
      function e() { }
      return (e.prototype = t), new e();
    };
    (this.fInherit = t),
      (this.urlUtil = new (function () {
        (this.getUrlParam = function () {
          var t,
            e = {};
          try {
            t = location.search.substring(1);
          } catch (i) { }
          if (t)
            for (var n, r, a, o = t.split("&"), s = o.length, l = 0; s > l; l++)
              (a = o[l].indexOf("=")),
                -1 != a &&
                ((n = o[l].substring(0, a)),
                  (r = o[l].substring(a + 1)),
                  (e[n] = r));
          return e;
        }),
          (this.getMainUrl = function () {
            return window.location != window.parent.location
              ? document.referrer
              : document.location.href;
          });
      })()),
      (this.xh5_BrowserUtil = new (function () {
        (this.info = (function () {
          var t,
            e = navigator.userAgent,
            i =
              e.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
              ) || [];
          return /trident/i.test(i[1])
            ? ((t = /\brv[ :]+(\d+)/g.exec(e) || []),
              {
                name: "IE ",
                version: t[1] || ""
              })
            : "Chrome" === i[1] && ((t = e.match(/\bOPR\/(\d+)/)), null != t)
              ? {
                name: "Opera",
                version: t[1]
              }
              : ((i = i[2]
                ? [i[1], i[2]]
                : [navigator.appName, navigator.appVersion, "-?"]),
                null != (t = e.match(/version\/(\d+)/i)) && i.splice(1, 1, t[1]),
                {
                  name: i[0],
                  version: i[1]
                });
        })()),
          (this.noH5 = !1),
          (this.hdpr = (function (t) {
            var e = document.createElement("canvas");
            if (e.getContext && e.getContext("2d")) {
              var i = Math.ceil(window.devicePixelRatio || 1),
                n = e.getContext("2d").webkitBackingStorePixelRatio || 1;
              return i / n;
            }
            return (t.noH5 = !0), 1;
          })(this));
      })()),
      (this.xh5_deviceUtil = (function () {
        return {
          istd: (function () {
            if ("ontouchend" in window) {
              var t;
              try {
                t = navigator.userAgent;
              } catch (e) { }
              return t && t.indexOf("Windows NT") > 0 ? !1 : !0;
            }
            return !1;
          })(),
          allowt: "ontouchend" in window
        };
      })());
    var localdb = (function () {
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
        u = function (t) {
          return null === t
            ? "Null"
            : void 0 === t
              ? "Undefined"
              : l.call(t).slice(8, -1);
        },
        c = (function () {
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
        save: function (t, e, n) {
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
            } catch (o) { }
          else i(t, e, n);
        },
        load: function (t, e) {
          var peristConfig;
          if (("Object" == u(e) && (e = e.mode), e))
            switch (e) {
              case "localStorage":
                if (!c) return;
                peristConfig = o(t);
                break;
              case "cookie":
                peristConfig = n(t);
            }
          else c && (peristConfig = o(t)), !peristConfig && (peristConfig = n(t));
          return peristConfig;
        },
        remove: function (t, e) {
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
        clear: function (t) {
          c && s(t);
        }
      };
    })();
    (this.localSL = localdb),
      (this.xh5_EvtUtil = {
        addHandler: function (t, e, i) {
          t &&
            (t.addEventListener
              ? t.addEventListener(e, i, !1)
              : t.attachEvent
                ? t.attachEvent("on" + e, i)
                : (t["on" + e] = i));
        },
        removeHandler: function (t, e, i) {
          t &&
            (t.removeEventListener
              ? t.removeEventListener(e, i, !1)
              : t.detachEvent
                ? t.detachEvent("on" + e, i)
                : (t["on" + e] = null));
        },
        getEvent: function (t) {
          return t ? t : window.event;
        },
        getTarget: function (t) {
          return (
            !t && (t = this.getEvent()), t ? t.target || t.srcElement : null
          );
        },
        preventDefault: function (t) {
          !t && (t = this.getEvent()),
            t && (t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
        },
        stopPropagation: function (t) {
          !t && (t = this.getEvent()),
            t &&
            (t.stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0));
        },
        getRelatedTarget: function (t) {
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
        getWheelDelta: function (t) {
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
      (xh5_EvtDispatcher.prototype.al = function (t, e, i) {
        (i && this.evtObj[t]) ||
          (!this.evtObj[t] && (this.evtObj[t] = []), this.evtObj[t].push(e));
      }),
      (xh5_EvtDispatcher.prototype.rl = function (t, e) {
        var i = this.evtObj[t];
        if (isArray(i)) for (var n = i.length; n--;) i[n] == e && i.splice(n, 1);
      }),
      (xh5_EvtDispatcher.prototype.re = function (t, e) {
        var i = this.evtObj[t];
        if (isArray(i))
          for (var n = 0, r = i.length; r > n; n++)
            "function" == typeof i[n] && i[n](t, e);
      }),
      (this.xh5_EvtDispatcher = xh5_EvtDispatcher),
      (this.$DOM = function (elID, parentDIV) {
        return (
          (parentDIV = parentDIV || document), parentDIV.getElementById(elID)
        );
      }),
      (this.$C = function (tag, elID) {
        var i = document.createElement(tag);
        return elID && (i.id = elID), i;
      }),
      (this.$T = function (t) {
        return document.createTextNode(t);
      }),
      (this.$CONTAINS = function (t, e) {
        if (t.compareDocumentPosition)
          return t === e || !!(16 & t.compareDocumentPosition(e));
        if (t.contains && 1 === e.nodeType) return t.contains(e) && t !== e;
        for (; (e = e.parentNode);) if (e === t) return !0;
        return !1;
      }),
      (this.getTextNodes = function (t) {
        var e = [];
        for (t = t.firstChild; t; t = t.nextSibling)
          3 == t.nodeType ? e.push(t) : (e = e.concat(arguments.callee(t)));
        return e;
      }),
      (this.getCSS = function (t) {
        var e = null;
        return (e = window.getComputedStyle
          ? window.getComputedStyle(t)
          : t.currentStyle);
      }),
      (this.fBind = fbind),
      (this.isColor = function (t) {
        return /^#[0-9a-fA-F]{3,6}$/.test(t);
      }),
      (this.isColorRGB = function (t) {
        return /(^#[0-9a-fA-F]{3,6}$)|(^rgba?\(.{5,16}\)$)/.test(t);
      }),
      (this.randomColor = function () {
        for (
          var t = Math.floor(16777215 * Math.random()).toString(16);
          t.length < 6;

        )
          t += "0";
        return t;
      }),
      (this.hex2dec = function (t, e, i) {
        if (0 == t.indexOf("rgb")) return t;
        t = t.replace(/#|0x/i, "");
        var n, r, a;
        t.replace(/(\w{6})|(\w{3})/, function (e, i, o) {
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
      (this.getTimestamp = now),
      (this.cssUtil = {
        inject: function (t) {
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
        adCls: function (t, e) {
          if (t.className != e) {
            var i = t.className.split(" ");
            for (var n in i) if (i.hasOwnProperty(n) && i[n] == e) return;
            "" == t.className ? (t.className = e) : (t.className += " " + e);
          }
        },
        rmCls: function (t, e) {
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
      (this.load = getScript);
    var _,
      T = new (function () {
        var t = _ || {};
        _ = t;
        var e = function (e, i) {
          for (var n = t[e][i ? "errCbArr" : "cbArr"], r = n.length; r--;) {
            var a = n[r];
            isFunction(a) && a();
          }
          (t[e] = null), delete t[e];
        };
        this.load = function (n, o, s, l) {
          var u = "urlhash_" + r(n);
          for (var c in t)
            if (t.hasOwnProperty(c) && c == u)
              return t[c].cbArr.push(o), void t[c].errCbArr.push(s);
          (t[u] = {
            url: n,
            cbArr: [o],
            errCbArr: [s]
          }),
            getScript(n, fbind(e, this, u), fbind(e, this, u, !0), l);
        };
      })();
    (this.relyLoader = T),
      (this.iframer = function (t, e) {
        function i() {
          if (document && document.body) {
            clearInterval(r), (o = 0);
            var t = document.body;
            t.insertBefore(n, t.firstChild), n.setAttribute("data-ready", "1");
          } else o++ > 9 && (clearInterval(r), isFunction(e) && e());
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
      (this.ca = function (t) {
        if (t) for (; t.length > 0;) t.length--;
      }),
      (this.isRepos = function (t) {
        return /^(sh204\d{3}|sz1318\d{2})$/.test(t);
      }),
      (this.isCNK = function (t) {
        return /^(sh688\d{3}|sh689\d{3})$/.test(t) ? "CNK" : void 0;
      }),
      (this.market = function (t) {
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
        escape: function (t) {
          return t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
        },
        get: function (t) {
          var e = document.cookie.match(
            "(?:^|;)\\s*" + this.escape(t) + "=([^;]*)"
          );
          return e ? e[1] || "" : "";
        },
        set: function (t, e, i) {
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
    var k = new (function () {
      function t(e) {
        getScript(
          e.url,
          function () {
            for (var t = e.f(); t && e.q.length;) {
              var i = e.q.shift();
              t.apply(null, i);
            }
          },
          function () {
            --e.count && t(e), e.count < 1 && (e.q = []);
          }
        );
      }
      function e(e) {
        setTimeout(function () {
          var i = !!e.f();
          !i && t(e);
        }, 2e3);
      }
      function i(t) {
        if ("undefined" != typeof SIMA) {
          for (var e, i = s.length; i--;)
            if (((e = s[i]), e.symbol == t.symbol && e.type == t.type)) return;
          s.push(t);
        }
        var n = t.simadata,
          r = {
            action: "hq",
            data: n,
            pk: "179824"
          };
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
        f: function () {
          return "undefined" == typeof SUDA ? void 0 : SUDA.uaTrack;
        }
      },
        o = {
          url: "https://news.sina.com.cn/js/pctianyi/sima.js",
          q: [],
          count: 5,
          f: function () {
            return "undefined" == typeof SIMA ? void 0 : i;
          }
        };
      e(o), e(r);
      var s = [];
      this.sima = i;
      var l,
        u,
        c = [],
        h = function () {
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
          for (; c.length;) c.length--;
          if (o !== l) {
            (l = o), (o += n);
            try {
              SUDA.uaTrack(e, o);
            } catch (h) {
              r.count && r.q.push([e, o]);
            }
          }
        };
      this.stc = function (t, e, i) {
        if (t) {
          (isNaN(i) || 0 > i) && (i = 3e3),
            (e = JSON.stringify(e)),
            e || (e = ""),
            (e = encodeURIComponent(e));
          for (var n = c.length; n--;)
            if (c[n].k == t) {
              c.splice(n, 1);
              break;
            }
          c.push({
            k: t,
            v: e
          }),
            clearTimeout(u),
            (u = setTimeout(h, i));
        }
      };
      var d, f;
      (this.s2 = function (t, e, i) {
        if (((i = i || "chart_detail"), f != t || d != i)) {
          (d = i),
            (f = t),
            setTimeout(function () {
              (d = void 0), (f = void 0);
            }, 99);
          try {
            SUDA.uaTrack(i, e || t);
          } catch (n) {
            r.count && r.q.push([i, e || t]);
          }
        }
      }),
        (this.log = function () {
          try {
            SUDA.log();
          } catch (t) { }
        });
    })();
    (this.sudaLog = k.log),
      (this.stc = k.stc),
      (this.suda = k.s2),
      (this.xh5_PosUtil = {
        pp: function (t, e, i, n) {
          return isNaN(t) || e >= t
            ? n
            : t >= i
              ? 1
              : Math.max(n * (1 - (t - e) / (i - e)), 1);
        },
        ppp: function (t, e, i, n, r) {
          return (t = (t - r) / r), this.pp(t, e, i, n);
        },
        vp: function (t, e, i) {
          return isNaN(t) || 0 >= t ? i - 1 : i * (1 - t / e);
        }
      }),
      (this.xh5_HtmlPosUtil = {
        pageX: function (t) {
          return t.offsetParent
            ? t.offsetLeft + this.pageX(t.offsetParent)
            : t.offsetLeft;
        },
        pageY: function (t) {
          return t.offsetParent
            ? t.offsetTop + this.pageY(t.offsetParent)
            : t.offsetTop;
        },
        parentX: function (t) {
          return t.parentNode == t.offsetParent
            ? t.offsetLeft
            : this.pageX(t) - this.pageX(t.parentNode);
        },
        parentY: function (t) {
          return t.parentNode == t.offsetParent
            ? t.offsetTop
            : this.pageY(t) - this.pageY(t.parentNode);
        }
      }),
      (this.xh5_ADJUST_HIGH_LOW = new (function () {
        var t = function (t) {
          var e = parseInt(Math.round(100 * t));
          return e % 100 != 0 &&
            (e % 10 == 0 && (e *= 0.1), e % 5 != 0 && e % 2 != 0)
            ? !0
            : !1;
        },
          e = function (t, e) {
            if (e)
              for (; t > 5;)
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
        this.c = function (i, n, r, a, o, s) {
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
      (this.xh5_S_KLC_D = function (compressStr) {
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
          g = function () {
            var l, u;
            for (l = 0; 64 > l; l++)
              (h[l] = m.pow(2, l)),
                26 > l &&
                ((c[l] = fromCharCode(l + 65)),
                  (c[l + 26] = fromCharCode(l + 97)),
                  10 > l && (c[l + 52] = fromCharCode(l + 48)));
            for (
              c.push("+", "/"),
              c = c.join(""),
              i = compressStr.split(""),
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
              {
                _1479: T,
                _136: _,
                _200: S,
                _139: k,
                _197: _mi_run
              }["_" + u[0]] ||
              function () {
                return [];
              }
            );
          },
          fromCharCode = String.fromCharCode,
          b = function (t) {
            return t === {}._;
          },
          N = function () {
            var t, e;
            for (t = y(), e = 1; ;) {
              if (!y()) return e * (2 * t - 1);
              e++;
            }
          },
          y = function () {
            var t;
            return e >= n
              ? 0
              : ((t = i[e] & (1 << o)), o++ , o >= 6 && ((o -= 6), e++), !!t);
          },
          w = function (t, r, a) {
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
          x = function (t) {
            var e, i, n;
            for (t > 1 && (e = 0), e = 0; t > e; e++)
              r.d++ , (n = r.d % 7), (3 == n || 4 == n) && (r.d += 5 - n);
            return (i = new Date()), i.setTime((u + r.d) * l), i;
          },
          S = function () {
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
              (o = {
                d: 1
              }),
              y() &&
              ((a = w([3])[0]),
                0 == a
                  ? (o.d = w([6])[0])
                  : 1 == a
                    ? ((r.d = w([18])[0]), (o.d = 0))
                    : (o.d = a)),
              (l = {
                day: x(o.d)
              }),
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
          _ = function () {
            var t, i, a, o, l, u, c, h, d, f, p;
            if (s > 2) return [];
            for (
              c = [],
              d = {
                v: "volume",
                p: "price",
                a: "avg_price"
              },
              r.d = w([18], [1])[0] - 1,
              h = {
                day: x(1)
              },
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
          T = function () {
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
              if (
                ((i = {
                  c: a[0]
                }),
                  (n = {}),
                  (i.d = 1),
                  32 & i.c)
              )
                for (; ;) {
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
              for (o in {
                v: 0,
                d: 0
              })
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
                l & (1 << (4 - e)) && i.l_l[e]++ , (i.l_l[e] *= 3);
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
          k = function () {
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
          (_mi_run = function () {
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
      dd: function (t) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate());
      },
      ddt: function (t) {
        return new Date(t.getTime());
      },
      stbd: function (t, e) {
        return t &&
          e &&
          t.getFullYear() == e.getFullYear() &&
          t.getMonth() == e.getMonth()
          ? t.getDate() == e.getDate()
          : !1;
      },
      stbdt: function (t, e) {
        return t && e ? t.getTime() == e.getTime() : !1;
      },
      stbs: function (t, e, i, n) {
        return t.getFullYear() == e && t.getMonth() == i
          ? t.getDate() == n
          : !1;
      },
      stbds: function (t, e, i) {
        !i && (i = "-");
        var n = e.split(i);
        return this.stbs(t, Number(n[0]), Number(n[1]) - 1, Number(n[2]));
      },
      ds: function (t, e, i, n, r, a) {
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
      dss: function (t, e, i) {
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
      dst: function (t, e, i) {
        var n = [t["get" + (i ? "UTC" : "") + "Hours"]()],
          r = [t["get" + (i ? "UTC" : "") + "Minutes"]()],
          a = [10 > n ? "0" + n : n, 10 > r ? "0" + r : r];
        if (e) {
          var o = [t["get" + (i ? "UTC" : "") + "Seconds"]()];
          a.push(10 > o ? "0" + o : o);
        }
        return a.join(":");
      },
      sd: function (t, e) {
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
      ssd: function (t) {
        var e = t.split(" "),
          i = e[0],
          n = e[1];
        return this.sd(i, n);
      },
      gw: function (t, e) {
        var i = 6048e5,
          n = 2592e5,
          r = (t.getTime() - n) / i,
          a = (e.getTime() - n) / i;
        return Math.floor(r) == Math.floor(a);
      },
      gm: function (t, e) {
        return t.getFullYear() == e.getFullYear()
          ? t.getMonth() == e.getMonth()
          : !1;
      },
      gy: function (t, e) {
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
      nw: function (t) {
        return this.weekname[t] || "";
      }
    };
    (this.dateUtil = C), (this.LoadingSign = o);
    var A = {
      replaceStr: function (t) {
        return t.replace(/[^0-9a-z_]/gi, function (t) {
          return "$" + t.charCodeAt(0).toString(16);
        });
      },
      nfloat: function (t) {
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
      trim: function (t) {
        return t.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
      },
      ps: function (t, e) {
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
      nu: function (t) {
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
      vs: function (t, e) {
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
      zp: function (t) {
        return (t = String(t)), t.length < 2 ? "0" + t : t;
      }
    };
    (this.strUtil = A),
      (this.tUtil = {
        s0: function (t) {
          return (
            (t = parseInt(Number(t))),
            0 > t ? "" : 10 > t ? "0" + String(t) : String(t)
          );
        },
        tIWS: function (t, e) {
          for (var i = [], n = t; e >= n; n++)
            i.push(this.s0(n / 60) + ":" + this.s0(n % 60));
          return i;
        },
        gtr: function (t) {
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
        gta: function () {
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
        gtrepo: function () {
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
        gtus: function () {
          return (
            this.tradingUs.length ||
            (this.tradingUs = this.gtr([["9:30", "16:00"]])),
            this.tradingUs
          );
        },
        tradingLSE: [],
        gtlse: function () {
          return (
            this.tradingLSE.length ||
            (this.tradingLSE = this.gtr([["8:00", "16:30"]])),
            this.tradingLSE
          );
        },
        tradingMSCI: [],
        gtmsci: function () {
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
        gtgds: function () {
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
        gthk: function () {
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
        gtAll: function (t) {
          return (this.trading = this.gtr(t)), this.trading;
        },
        gata: function (t, e) {
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
        ist: function (t, e) {
          return (t = t.toUpperCase()), arrIndexOf(this.gata(t), e) >= 0;
        },
        gltbt: function (t, e, i, n, r, a) {
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
        azft: function (t, e) {
          if (!t) return t;
          for (var i = this.gata(e), n = 0, r = t.length; r > n; n++)
            t[n].time = i[n];
          return t[0].date.setHours(0), t;
        }
      }),
      (this.kUtil = {
        mw: function (t, e, i, n, r) {
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
        nc: function (t, e, i, n) {
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
        pd: function (t, e) {
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
        ms: function (t, e, i, n, r) {
          return (
            i > t && (t += 24),
            Math.max(1, Math.ceil((60 * (t - i) + e - n) / r))
          );
        },
        spk: function (t, e, i, n, r) {
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
        yd: function (t) {
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
        rd: function (t, e) {
          var i = [],
            n = C.dd(e);
          n.setFullYear(n.getFullYear() - 5);
          for (var r = t.length; r-- && !(t[r].date < n);) i[i.length] = t[r];
          return (
            i.reverse(), (i[0].prevclose = t[r] ? t[r].close : i[0].close), i
          );
        },
        adbd: function (t, e, i, n) {
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
              for (var h = [], d = t[0]; c-- > 0;) {
                if (((a = cloneObject(d) || {}), (a.isFake = !0), (a.kke_cs = 0), n))
                  for (r in a) a.hasOwnProperty(r) && isNumber(a[r]) && (a[r] = 0);
                h.push(a);
              }
              t = h.concat(t);
              break;
            }
            for (var f = u--; f-- && ((s = t[f].date), !l(o, s));) {
              if (o > s) {
                if (
                  ((a = cloneObject(t[f])),
                    (a.isFake = !0),
                    (a.date = o),
                    (a.kke_cs = 0),
                    n)
                )
                  for (r in a) a.hasOwnProperty(r) && isNumber(a[r]) && (a[r] = 0);
                t.splice(++f, 0, a), u++;
                break;
              }
              t.splice(f, 1), u--;
            }
          }
          return u > 0 && t.splice(0, u), t;
        },
        ayd: function (t, e, i, n, r) {
          for (var a, o, s, l, u = C.stbd, c = t.length, h = e.length; h--;)
            if (((s = e[h]), !(s > r))) {
              if (n > s && !C.stbd(s, n)) break;
              for (var d = c--; d-- && ((l = t[d].date), !u(s, l));) {
                if (s > l) {
                  o = cloneObject(t[d]);
                  var f = o.close;
                  for (a in o) o.hasOwnProperty(a) && isNumber(o[a]) && (o[a] = 0);
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
      (this.domGc = new (function () {
        var t = u.$C("div");
        return (
          (t.style.display = "none"),
          function (e, i) {
            if (e) {
              if (e.hasChildNodes())
                for (; e.childNodes.length > 0;) e.removeChild(e.firstChild);
              if (i) return void (e.innerHTML = "");
              t.appendChild(e), (t.innerHTML = "");
            }
          }
        );
      })()),
      (this.getSUrl = function (t) {
        if (!t) return null;
        var e,
          i = t.match(/(\w*:\/\/)?([^\/]+)(\/+.*)?/i),
          n = i[2],
          r = i[3];
        return (e = ["https://", n, r].join(""));
      }),
      (this.TipM = s),
      (this.logoM = new (function () {
        var t =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAYAAAB5LPGYAAAZEUlEQVR4nO18eZhcVZn3G+ha++77dtZ7qzohHXpJ6AXC5vopyqgsMiMQP0QlBkQHEfQBJMoyjBANGmUgQGDQQQdEEoKiSBDEQTDgJEDAEfiAkJ2QNAlZO+f7o251bleqOyGDRGb69zzv01X33POec+5577ueaoB3AHM/cfJRO6afe8/9nzr9C+/EeGMYwxBmaObHXz6kc/1A+xRxvU+uybbNNL3pv4snLDpRUk86UPMbw/8stH5Q1o8EgHEAAB9U1e71XX2bV3b2io3d/eJkzTo2va+wqK399k3d/WJwylRxmm5/+MBNeQz/UzDuofGHLnj+0MkbACAHAActbe96fG1Xn1jV2SuWtU9+Nr0v99iEjp8NdPeL17r6xMLKxHvqDAIA60tucOZszK9kAO4BWcUY3l1QAXQAgOmWe/zOKVPFHyZ0PAUAcFVIvzbQ3S+Wd/SIVZ29YsnE7j9OLcjVn8Xjf7whvb6xs2/wA6o6GQDgQhed8cqhh728uftwsXPKVNFdKCQHcl1jeBfgIi86/654wp0AAL+uTvr1+q4+8cKkwzY+2Dbp7hUdPbte7egRy1N6taNHrOzo2fZaV594Jf2+urN359c9NOMWWpm3qftwsbKzV7zR3S9+QOKLDvTaxvA3jgDAWt/V9+btvG3hcZLevqazZ/urqWCt7eoT9c+NtLyBXu/qF+u7+sTyjh6xrqtP/LLafhekPuQYxjAiLg2iszd194tXOw7bvLKzZ92KVKBWdfaK17v6xRvd/WJNZ69Y2dH7xsqO3oFVHT2DA939YkN3v1jV2buHIC7v6BED3YeLU3T7yAO9tjH87WPcIxM6/pDVdKvTSPe59u5n5tJk1hmGc8KUvNTeXiqh9lIJdeSlidMs6/hrEb/mz5OmvLAx9QOztKGrX8xG7JsHenFj+BvHiZp1zIbOvl11wdnY3S+WTZq85NOGfRIAFPbW3wBQZkf0GwPd/TuzZnn17mg5/9dfxRjetZifHPKjut+2obtf3M7bbrIBpHq7UlaOC1z/LhJFS5EfPKyr6lnN+HzLx5+t86kHKmu7+rb0FIvsnVvNGN5tkJZN6l6+qrNXvNbVJ+Ynh9yRbXQsa2ZCmYgJHaIK48I2zaaR7e/aJj20trNvSADXd/Xt7JWkQ96ZpYzhXYfJeXn8ms7ewZW1AGOgq1gk9TZZlj9SoVzEhIqEMsEx2cYQ3hUTKijCKyGjJeuYjegVdX9wRUePWN3Zs6H9byMJ3XKAxzYO0NitAFDch/ty0GQ//+r4iKZ1DKQR7qPjO36XbQtcb0FCmfBs93uGqn4F+8ENDOE3OSYiJnQAALxGfj9h4+fVzfD6rn5xX3Xive/YYpqjNfS8O0PPu3M/+7dA7QXKCnCrZRjnSUXpPfvQ3ydRtBQH4e8B4KC3MG4RakKrjUAG7MU/l8vlj8aU/j9VVU/e22CB694eY7I8n89PSi+Ng1pRQh9lDlrabpx00kkHv4W17QYF8FZ09A6s6+oTj43vfCzbFvrBcxThp+vfSRg9kQqfoGH0J2jQKlUoha90HLZ2Rar93uzu33W8rB+xXxN7GxF5wX9UKBMA4Ddp1gqFwofK5fLxpqadrinaF3VVvSJwnHmB5z/MIvQyJ3QDAKB6B0NVP1PlsYgJ3dhaLL53b+OTEL0YE7oLAIJ9nrPr/yzGZIBjsiVLDJMtFOFVDJNVuVyuczQevuP+qMK4KBQKbaPdZ+vm5W08FrZpzoFUW6qSdGJC2dYYk62Nc+CYbGEIb6ZRtJohvEqTlCdnzZpV2te17YFfVibesaG7X6zt7N32cdnozyzgX2NCB8q53BRVVj8TE7qdYyIqlAtV3ePES2FRddIvXuvqEys6esSm7sPFTB99eb8ntZ+wTfOi0PNuCRzn5tDzbglc9yYSRf+VUCZQEMwPXPem0PNuCb3gZgDQVVk+s8pjUaFMVBgXCaE7aYQ2sQi9TEK02LPdhb5tfwdqb3sdRd+2b6gwLjgmm8vl8ocAAAxVPTNw/esj17+tTqHnzWMIr6tQJkgYLgo975bI9W8LPG9e4Hg/8G33CtgzSxAlhG4Lff9hTVEuURTlYkVRLtYU5RJD02ZyTLZShJYDwGibXmYRWouD4MnRnpep6zOqPBa2YX43e71YLB6rKcolzUiV5QsNTfsmx2RjhXFRyOev2ucNaoaeglxd39W3bkN3v3imffKzvQWlkjYFNELPVXlc25xaMDKgKdoXs/2PlaSJD7cd+sDG9EDC6539A5f6+HP/rUntH2QcRvdThBczTJYRhJ6iCD1FIvQ4DsJHSIT+yAlZRsLoCRJGiwAgF3rewpjQrcVi8egCFBKomVsJ9u4ztkS+f2+1pjkuA4AWhvCqmFDhO94vs+TZzp2ubf8kcN170mu/QH7weIVxEXn+ImioFGmKclqVx6K1tbWZdg0Swna6ln3DaJMrlUr9FcaFpVvnj3SPrih/X+WxsHXz2r2stRFS6Pl3JIQOOob1jbfYtzk+oRh9z0+a8uz2KUeINZ09G64O6ZdDABMAynlFObVomhcdLMtnAICVdjn4OFWdfD2pXPt6V+/2bZOPEBs6+3Y90NZ+x4db9UmjDPXXxDgAKESuf1vk+3MbGw3DODnGbKkkSUell0xO6JbQ9X+9n+MZra2tHwCobXiVceFa9h7jNoMma2dUeSxUVd3jRQ0d706OySaovQhG6HqLDE07DwBAU5RzU+H8P6qqfiZy/bm+6w6jwHG+j4PgdzGhAgXhr0LH/ZfQda+DTDBYLpc/UuWxCNzdz8nUtE+XcqWe0eYtSdKJMSbrYkI3SpJ04j49pbeAlu9F9KsvTJr8kjhsqnitq3f7g23tD9xI4su/6gZfPN8OZlwZoG/eWz3krufaJ788OGWq2DHlCLFsYveLN+LkO8dJevvbPaH9wEHIDx6uMC6kYrF+XhE0WT6+ymMR+eGiIgADAJBl+eNVHgtT18/eV97lcnlyswZT1y9LBeOD+8IodP1fx4TuKgDEDU0yx2Rj4HrzAQAkSTqhLU6E0qr8PQBA5PmLOMJvAICH/OBXHOFXWISGiEToLwzhN2NCBcNkC4nQ8zxCy0ktCCoB1IQvJnTQse3v1wf1HOeq8XEiHMtqWrkqFAptgev/uMK4CFzv36C5P71PaMnlcp26opyqKcpFlmF82zbNf9JV9cK8LH8MAAIdQP2U4XxgDmLfXFCZsPDpid3PvHJozysvd/Qsf+nQw164v9r+2M+T8bdd5IXT3ydJE6AW3bVAPt8uScopuqp/3XWcWYHr3hQ4zjzHsq7RZO3T0DwdI5dKpamaLE8zNO1iz3W/59nOPM925vmuO9fWzSs0RTm9AIXGjRoRcln+KIvIE3UTpivKKQllm13bHmZqAte9KSFsVxGA7wPbXOD7P0oo22Xq5tca2sbhIHo8IVRgP1gWuv6To5P3h5jQ7cgPH4MG89va2vq+Ko+Fpmn/FwDAs6xbY0K3QRr5xoRuCz2vnlnIQ81VqBMUAQgNo+cSyoRvu3MzbeMAoMVSjc9VKN/mOs6/pjzNwHHmtPFYjGBOI8+yvh0TOlh3wwLXu7EIQPfhmQ1DydC0c2kY/SfHZFdCmWhGMWXbLNe9fRQ+2Qem51T1LM/zFtLU/xniRehuokxUKBMc4eWlUqk3y8y17e9V04Xt0S/LD5M3LMP4BjQ/WVMOXPee0PcXB56/GAXhEhyhp33HeSj0/cUVxkWFMhG63qOh6z0Wef7jxWLxKBxG/0WC8FmouRr6CGRCbQMPMjTtH5M0WPFtdzYAyAAAhUKhkhC6LfL8pbqq/7OhalePRqHrPVBhXBiatseGu6Y5O42YEQDkOMJroyD4DUBNG1Z5LHRV/fwIe2OQMHqyvg+yLP9dtjGfzx/SlgZcLMKrSRitYQhvrDAuLMP4UvbeUqnU79v2DQll2xPKhGNZsyRJOiZ0vflVxgUnZEvq++49v1koFGIcRX/IVjQaPyeUiRjXPnuWcysAgGVY/0wR/ovr+r+yLPsnjuPcrap63ak9CEfoj5WUD8dE1FM0dapfq1OlllPMCneZIbKmUh+/1mdndn6N/UulUrO0jmXq+lWGps0yNG2WpmpX66p6lWkYN1qGcYOqqJdpivYtQ9WuNjRtlq7rV8qy/NH6WAzjrRyTbTSMBnAYrqMIb+GYbEuv/bkuaAAAqqROTygTVR4LRVGOAwDQdX166s99Zq+bAQCObX+/wrgolUp9DU0HE4ReIEH4RF0IqjwWuqKcDQDgWc6tCWWiidkGALBohP7EMFnJIvTnuGamrYZ7DEPTzlNl+UxT06ZxTP5SoUxosvxpAIBcLtdlatpFOIierjIuYkI3u6Y5u1AoVLJMdEU5lWGyssq4IAi/WMjlps+ZM2fEJLZKEXqqvpkxoQIHwWJDVT9XbGk5stTScrgqqSe7pjmbRujlKo+FXC5/FAAAheGjQ0JKqKjyWKiSdDJA7W3imOzMCkhMqCBhtMx3vDt8x/0ZjdC6bHtCqAgcZ8jhL5VK/SQMH7VN80pVkk4stbT05/P5iblcrkdRlFNxED2eFcKEMmFq2rR92WQA0GgYPaeq6vRmjYamXVKhXNi6eZmuqmfpqnpW6AULKowL17av1VX1LF3XZzRqEQAAXVWnK4pySv176Hn3xoQOlnO5w6Bm1tQMNSZufYbwKhJGr0BDIjmfz0+qMi4szbgEAMDW9SsqjIvURcixCK0hYfinJsuJWIT+k0V4tSRJx3CE1wae/8vRHo5r2XMrlA/U11fO5SbXsx04jB5L6/3OKCyCyK/5hJairr311lub1/t1RZ9RqZXRhjbRGPlNNVzbvjId2GCYvJ4VIIbwKqg9VDA07ctJhm9M6HZVkk6AWkkHAAAkSTp5mAARKhzbnpMZb9TkpSbLH8uOkRAqSqXS1Ca3FgAghFqiNwAAz9TNC6osFnpNUPz0egipViBB+CRDeB1kTHrguvNjQt+EWvlqX2FRhNfXnX6K8BYaoQ0kCNfQCG2iCG9hCG+tE0d4R5XHwnec6xsZ6ap6foVxkcvlugAAaBg9R6NoCQBAqVQ6vMpiYRnWzGyffD4/kSL8Isd4PQC0tRaL762Zab3piwcANgmjBzkhr5dywzRwTpblaQWAt/TTCVPTTgeAkYNPWzdvyW5iKkiboyB4xLOsH+iKfnaxWDwKGuqAxWLxmKRBcP3UNAMAREH4m6xWTR3qYZBK0gmNPORaoJOFI5WkE1zTvtKznTtQED1EEX4mn88fYhnGpdn+JEQvAkB5jzWa5reqPB5MKBtMKBusULYtxmRHqrl3JpTtTCgbrPJ40DbNrwNAWGF82HoAwEko2xp5/i/28sz1tLJwMACALMsfq0WG/l26os/QFX0GDtHi1G+6xlT0s01FO6dOqqp+zpS1aY1mDQAAB8HvKUKvAsBBuVyuq1rzE89L9/HKKouHmW2lXP5wQtkAR/iVegnNc5x5afVjD/65XK6LRNHSGJO/5PP5iekavHw+3w61CgjxbPennuPcHbju/MB153u28++uZf+b7zg/r18LXHd+6HkLNbkWKI0KSzMuTTP2otFcJmR38EERfl6r5fkAAMBQja80Co9SLh+XNkcM4U1xps0yjJmNY7um+d0kowFTjVN3Wl3Xtq+NEV5bn0OFMlGhXHCENwGAhoPwyayQp1HdHtAk6VhDVU/SZO3juqKcahvGuTGhIvS832iy/DFNkj6hKdpp6dtqWYYxs8pi0VrcnejNOPgjaQ4AAPBtd26F8UG1tfV9AACubc2tMi5KudxQ/szQtC+nvts/NGGhe5b1bd9xb4Phye6oQplwrZpm9B3n+gphO6CmtQ/GEXqeRXgdpPVkWzcvqDAucBAuBoD6AZIiQ3gVCqMl0BCsSZL0yYSyXak1XEHD6DkW4YEK4zs4oS8BQKsqSZ9Efrg08vyUvCU0QpsrlAkShC/tvu4vRX64VC6X93BPmsFEfnhvknH0mwUIdcc/V/NjasXpzH0U4eWQaklNUU5vML+7GqNbAGjBQTTkeyaEisD17wKoRY0c4T/XeaRz2oaD4PeB694ot7ZOy+fz47M+ZrOoLgtNlqfZunkhAECxWDyqymKhStKJpVKpX5blrN8ocUxeIxF6GlItBgDg2UOaozrSGMVi8cgK4wIF4X9ATRMXaISWpyeDhtyJXC7XVaFM4CAYOtxRKBTaPNv5foXxHTGhOwPHG6q7AgCoNXdls1QsvgcA9JjQLa7lXJc2I47pElPXLwAAD3nB/CqPReh5t0PGcpVKpcPTo3KXN85dluUzaBQtCVzvbsewrtNV9XJT085RFOWUuslvBhwEv48J3QoA9kj37BMkSTrWNs3LAtdbQCL0FCdkS6MgJpQJpbX1tNrA0VPDzK/j/LDOK/S8n2Y1UxopDqtn5nK5Lo7J4DABaq0JAgqjB5OG/uVcuTvb39C084YEFBNBI7QOaimRPSDL8kdqfpX7YwAY51jW9TGh2wuFQoUi9GqFcpHP5ycAADiGdWkbT4Sqqp/MsChxTFajMFoKI/+AqoCjaElC2fa6uatXPxzbvrnx5tD1HkgoE7ZuXujZzs0JYbtiTNalwkGb8FchTe76jvMvFcZF4DhXF2sCCQBQ1hXl1BiTtRXGhanrX21kYJvmZWl03SxTsD/H0VhM6GDoBfe/5Z5JktiaoswCADzCLV7k+/c1BgnpRlkck81Z4ZGK0jFpP41hsjprfh1zd0a9Dts0v97ge24GAKucy3U1mvZm6QsURL/Nas/Q9e5utohcLtedULYNB9F9UHvIeYrISuT7DwEAWIbxjTaeCNs05xShSBPKtkd+8FvIHI0qlUpHpDXRPTRHHZZhXFzlsXCs3UGAZRgzqzwWUi34GoZSqdSTELYjdW9eVWtlq70GN6amnVaLRMPfJJQJTuhqqOUEyxzjFQzhF+Xmgdg4FEZLOCarYS/BXYo8ALip66A0u8GQ1c9WeSwMTTt3H/gNx5QpU96PPF9whNe6tn1tWiJKoBbhknK5/CEShs9mBSH0vJ8CALQWWt+fNY80jIZ+15E6vsMEqFn5KQqCR7JaLvLDB9NFndlgvkXouve0FlrfX8qVelVZ/SwOgvs5JrvqwscRfjlNcQxDuVyeHBO6Hgfhk/WHWM7lJqfO+z8C1Mw9DsJHTE2blqaV3mw8nmSb5uWpg9/06Fg+n59UoXx7araHzCYJwic4JhthdzpFlyTpBN+2vwsA41RZrq0V4bWaopwGezkPaOrm2W08FpHr/xwACo7lXJf6eY8AQCkNLJpagSIAqzAufGdYYAUA0CIVi0erkjrds6xrPNtdQMLoSRahNQlhOxjGK2CE3+yEXnB3gtkOyBxF22ccPfXIH0SuNyQkCaGCE7KFY/Iax2RzVsASygTyg/sgPXKUDUDSaG6oPug5zg+zWpNhshL2fIM4x3RrVkh1VT0fAKC1tfWDFTo8KMomnof9xWRn4HnzoOaI7wHLMD7LEHoYMv6JbZqzK4yLfD6f/RlAOfS8n6TJ41Ma2IzDYbQ0TTE1OzmcI2H4aFpbPiZznXFMduEoWlrLIXoLY0IHqoyLwPHm1W/SZO2MBNNNVcYFCdEztmleVKzVqIeSxPl8fkLdrwsc52bYLdBlHEaPpadmfgG73QMZambcAwC9WCyywHVr6yuXG/8vj8oQXpdQto2G0UtREDziO85tpq7/k67qnzd18wJVkk6QGkhXlE9RhDYxhNepqnpSY3uaDx75pPt7jj727sjzd1c5MhWKbOmNhNGy9HjVkI/g2fa8IfNX83nqmynFmAxFrVUei9Dx/r1xbMswvlLl8dAYqUDUc0UtvuNeFxM6OFI5kCD8gmfbc8rl8pQRF5h5wCSM7sVh9AgNoz9VGK875/XN0pEfPDRSbiyfz09INcctTXgf5FjWNU3ydrnQ8+7Mzhn5wUOaopxTgD3TH/l8fkLguD/imAy28UQwTF5MtXCLY1nXpJWgrbredH6TOMZPm6b5NUgFU9O0L6UHYgcTyrZWGBdVHtddoUYt25KOZUMT/5Zj/HQbj0WVNdLQ8bvBKuPD23gsqjzeMUJFpoYgCMq5XK5PU7QvOoZ1Xej5d4autyDy/bt8251r6voFxWLxaGjy1qNgdwUkTOuQKRxT1y8z1RrZun5FKZdrjH5BlaSTbF2/wlT1y0xdvzzNZQ07sp3L5bpNXT/bMozvmJrxXUPTLtZkeVqpVOqBt5YIdiM/XBh5/qLQCxaYmnYODK8wSDiKfqvretP/ZWho2hkJ4xvlcvn4Js1K6AULSBQtheFR4MHID+7DQbjY0Iwvwb4dZoBCoVA1Ne2cTLJ3nGNYMyM/vKNQGPWwxTCfTimXP4SC4HbPtueZuv5DQzMulmq53LeKvJTPt+fz+UkjUHt+hPZmeca3CypFeMVQVKwop/61BnoHMdq/BqlHn6P5Z82c+ta99BnD/qBQKLTVqwjpsW95r53GMIa3C8Vi8b11v8a17SsO9HzG8L8MuqKcmkbAm4pQpAd6PmP4XwYrrWN6tjNn73ePYQxvM/It+Us8y34T9if5OIYx/Hcx4/Off/85X/jCJw70PMbw7sT/BxKFMrtCLlbqAAAAAElFTkSuQmCC",
          e = u.$C("img"),
          i = !1,
          n = [],
          r = [],
          a = function () {
            u.xh5_EvtUtil.addHandler(e, "load", function () {
              for (i = !0; n.length;) {
                var t = n.shift();
                s(t);
              }
            }),
              (e.src = t);
          },
          o = function (t) {
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
          s = function (t) {
            if (u.xh5_BrowserUtil.noH5) return null;
            if (!i) {
              for (var a = n.length; a--;) if (n[a].id == t.id) return null;
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
              o({
                logo: s,
                color: t.color
              }),
              isFunction(t.cb) && t.cb(s),
              s
            );
          };
        (this.getLogo = s), (this.styleLogo = o), a();
      })()),
      (this.grabM = new (function () {
        var t = function (t) {
          var e = t.dom,
            i = t.child;
          if (!e || !i) return null;
          isString(e) && (e = u.$DOM(e));
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
          return {
            canvas: s,
            x: c,
            y: f
          };
        },
          e = function (t, e) {
            if (u.POST) {
              var i = e.txt || "",
                n = e.url || "",
                r = "_" + Math.floor(1e3 * Math.random());
              window.open("about:blank", r);
              var a = u.getSUrl(
                "http://stock.finance.sina.com.cn/misc/userapi/Pic4Weibo.php"
              );
              u.POST(
                a,
                {
                  imgData: t,
                  symbol: "imgData"
                },
                function (t) {
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
                }
              );
            }
          },
          i = function (i) {
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
                  for (g = i.ignoreZIdxArr.length; g--;)
                    if (r == i.ignoreZIdxArr[g]) {
                      v = !0;
                      break;
                    }
                  if (!v) {
                    for (g = i.ignoreIdArr.length; g--;)
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
                  !isArray(i.extra) && (i.extra = [i.extra]);
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
      (this.bridge = new (function () {
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
          c = function (t) {
            var e = t,
              i = e.key,
              n = e.options,
              r = e.value;
            localdb.save(i, r, n);
          },
          h = function (t) {
            n || i || l.push([t]);
          },
          d = function (item) {
            var e = item,
              key = e.key,
              options = e.options;
            return localdb.load(key, options);
          },
          f = function (t, e) {
            return n ? void 0 : i ? void (s[t.uid] = e) : void o.push([t, e]);
          },
          p = function (t, e, i) {
            var n = d(t);
            e(n), i || f(t, e);
          },
          m = function (t, e) {
            t && (c(t), e || h(t));
          },
          g = new (function () {
            var t = function (t) {
              if (t && t.type) {
                var e = t.type;
                if (-1 != e.indexOf(r)) return e;
              }
              return void 0;
            },
              e = function () {
                for (var t; o.length;) (t = o.shift()), p(t[0], t[1]);
                for (; l.length;) (t = l.shift()), m(t[0]);
              };
            this.onMsg = function (i) {
              var n;
              try {
                n = JSON.parse(i.data);
              } catch (r) { }
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
          (this.getStatus = function () {
            return i && !n && "1" == e.getAttribute("data-ready");
          });
      })()),
      (this.colorPicker = (function () {
        function t(t, e) {
          var i = function () { },
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
            : {
              left: 0,
              top: 0
            };
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
            _(a, "mousemove", function (t) {
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
          var _ = (function () {
            return window.addEventListener
              ? function (t, e, i) {
                t.addEventListener(e, i);
              }
              : function (t, e, i) {
                t.attachEvent("on" + e, i);
              };
          })(),
            T = (function () {
              return window.addEventListener
                ? function (t) {
                  t.stopPropagation();
                }
                : function (t) {
                  t.cancelBubble = !0;
                };
            })(),
            k = (function () {
              return window.addEventListener
                ? function (t) {
                  t.preventDefault();
                }
                : function (t) {
                  t.returnValue = !1;
                };
            })(),
            C = Object.prototype.toString,
            A = function (t) {
              return null === t
                ? "Null"
                : void 0 === t
                  ? "Undefined"
                  : C.call(t).slice(8, -1);
            },
            D = function (t, e) {
              if (!t) return -1;
              if (t.indexOf) return t.indexOf(e);
              for (var i = t.length; i--;) if (t[i] === e) return i;
            },
            P = function (t, e) {
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
              slider: {
                left: 0.5,
                top: 0.15,
                width: 0.05,
                height: 0.65
              },
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
              colorBox: {
                left: 0.63,
                top: 0.6,
                width: 0.32,
                height: 0.2
              },
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
            M = function (t, i) {
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
            paintBG: function () {
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
            _onmousemove: function (t, e) {
              var r = this.layer,
                a = i(r),
                o = n(r);
              (this.H = (t / a) * 360), (this.S = (o - e) / o);
            },
            updatePoint: function () {
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
            update: function (t) {
              (this.H = t[0]), (this.S = t[1]), this.updatePoint();
            }
          };
          var R = function (t, i) {
            e(this, i),
              (this.background = o(t, i)),
              (this.layer = o(t, i)),
              (this.L = 0.5),
              h(this, this.layer);
          };
          R.prototype = {
            constructor: R,
            paintBG: function (t) {
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
            _onmousemove: function (t, e) {
              var i = this.layer,
                r = n(i);
              this.L = (r - e) / r;
            },
            updatePoint: function (t) {
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
            update: function (t) {
              (this.L = t[2]), this.paintBG(t), this.updatePoint(t);
            }
          };
          var I = function (t, e) {
            var i = this;
            (this.box = s(t, e)),
              _(this.box, "input", function (t) {
                (t.target.value = d(t.target.value, 0, 255)),
                  i.oninput && i.oninput(t);
              });
          };
          I.prototype = {
            constructor: I,
            getRGB: function () {
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
            getRGBArr: function () {
              var t = this.box.childNodes;
              return [
                t[0].childNodes[1].value,
                t[1].childNodes[1].value,
                t[2].childNodes[1].value
              ];
            },
            update: function (t) {
              for (
                var e = this.box.childNodes, i = b(t), n = 0, r = i.length;
                r > n;
                n++
              )
                e[n].childNodes[1].value = (+i[n]).toFixed(0);
            }
          };
          var E = function (t, e) {
            var i = this;
            this.box = s(t, e);
            var n = this.box.childNodes;
            _(n[0].childNodes[1], "input", function (t) {
              (t.target.value = d(t.target.value, 0, 360)),
                i.oninput && i.oninput(t);
            }),
              _(n[1].childNodes[1], "input", function (t) {
                (t.target.value = d(t.target.value, 0, 100)),
                  i.oninput && i.oninput(t);
              }),
              _(n[2].childNodes[1], "input", function (t) {
                (t.target.value = d(t.target.value, 0, 100)),
                  i.oninput && i.oninput(t);
              });
          };
          E.prototype = {
            constructor: E,
            getHSL: function () {
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
            getHSLArr: function () {
              var t = this.box.childNodes;
              return [
                t[0].childNodes[1].value,
                t[1].childNodes[1].value / 100,
                t[2].childNodes[1].value / 100
              ];
            },
            update: function (t) {
              for (var e = this.box.childNodes, i = 0, n = t.length; n > i; i++)
                e[i].childNodes[1].value = (i > 0 ? 100 * t[i] : +t[i]).toFixed(
                  0
                );
            }
          };
          var F = function (t, e) {
            var i = this;
            this.box = s(t, e);
            var n = this.box.childNodes;
            _(n[0].childNodes[1], "input", function (t) {
              t.target.value = t.target.value
                .replace(/[^0-9A-Fa-f]/g, "")
                .slice(0, 6);
              var e = t.target.value.length;
              6 == e && i.oninput && i.oninput(t);
            });
          };
          F.prototype = {
            constructor: F,
            getHEX: function () {
              return "#" + this.box.childNodes[0].childNodes[1].value;
            },
            update: function (t) {
              var e = this.box.childNodes;
              e[0].childNodes[1].value = w(b(t));
            }
          };
          var L = function (t, e) {
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
            H = function (t, e) {
              (this.box = c(t, e)), (this.box.style.backgroundColor = "#000");
            };
          H.prototype = {
            constructor: H,
            update: function (t) {
              for (var e = b(t), i = e.length; i--;) e[i] = (+e[i]).toFixed(0);
              this.box.style.backgroundColor =
                "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
            }
          };
          var K = function (t) {
            (t = t || {}),
              (this.param = e(t, O)),
              (this.inited = !1),
              u.xh5_EvtDispatcher.call(this);
          };
          return (
            (K.prototype = {
              constructor: K,
              init: function () {
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
              _initDoms: function (t) {
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
              _initEvent: function () {
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
                  (h.onmousemove = function () {
                    u.update([h.H, h.S, d.L]);
                  }),
                  (d.onmousemove = function () {
                    u.update([h.H, h.S, d.L]);
                  }),
                  (p.oninput = function () {
                    u.update(p.getHSLArr());
                  }),
                  (f.oninput = function () {
                    u.update(N(f.getRGBArr()));
                  }),
                  (m.oninput = function () {
                    u.update(m.getHEX());
                  }),
                  _(g.btn, "click", function () {
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
                  _(v.btn, "click", function () {
                    u.hide();
                  });
              },
              show: function (t, e, i, n) {
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
              hide: function () {
                if (this.inited) {
                  var t = this.wrap,
                    e = t.style;
                  (e.visibility = "hidden"), (e.opacity = 0);
                }
              },
              update: function (t) {
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
xh5_define("cfgs.settinger", [], function () {
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
        mini_threshold: {
          width: 0 / 0,
          height: 0 / 0
        },
        show_logo: !0,
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
        defaultCandleNum: 64,
        zoomUnit: 90,
        zoomLimit: 10,
        zoomArea: 0.15,
        I_Z_INDEX: 50,
        G_Z_INDEX: 30,
        _hd: 1,
        setHd: function (e) {
          "number" == typeof e && (this._hd = e);
        },
        getHd: function () {
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
        getOneWholeTH: function () {
          return this.H_T_T + this.H_T_G;
        },
        H_RS: 30,
        setStageW: function (e) {
          (this._w = e),
            (this.w_k = e - this.posX - this.K_RIGHT_W),
            (this.w_t = e - this.posX - this.RIGHT_W);
        },
        setStageH: function (e, t) {
          (this._h = e),
            (this.h_k = this.h_t = e - t - this.H_TIME_PART - this.H_MA4K);
        },
        getStageW: function () {
          return this._w;
        },
        getStageH: function () {
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
      vn: function (e) {
        for (var t in this)
          if (
            this.hasOwnProperty(t) &&
            "number" == typeof this[t] &&
            e == this[t]
          )
            return this[t];
        return void 0;
      },
      vi: function (e) {
        switch (e) {
          case this.NTS:
            return this.TS;
          case this.NT5:
            return this.FAKE_T5;
          default:
            return this[e.toUpperCase()];
        }
      },
      gt: function (e) {
        var t;
        switch (e) {
          case this.KMS:
            t = {
              type: "msk"
            };
            break;
          case this.K1:
          case this.K5:
          case this.K15:
          case this.K30:
          case this.K60:
          case this.K240:
            t = {
              type: "mink"
            };
            break;
          case this.KDF:
          case this.KWF:
          case this.KMF:
          case this.KYF:
          case this.KCLF:
            t = {
              type: "rek",
              dir: "q"
            };
            break;
          case this.KDB:
          case this.KWB:
          case this.KMB:
          case this.KYB:
          case this.KCLB:
            t = {
              type: "rek",
              dir: "h"
            };
            break;
          default:
            t = {
              type: "k"
            };
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
  return new (function () {
    this.VER = "2.0.31";
    var r = [];
    (this.getSetting = function (t) {
      for (var a, i = r.length; i--;) if (((a = r[i]), t == a.uid)) return a;
      return (a = new e(t)), r.push(a), a;
    }),
      (this.globalCfg = t);
  })();
});
xh5_define("datas.hq", ["utils.util"], function (utils_util) {
  "use strict";
  var t = utils_util.load,
    r = utils_util.fBind,
    a = utils_util.market,
    i = utils_util.cookieUtil,
    n = utils_util.dateUtil,
    m = utils_util.tUtil,
    u = 0 == location.protocol.indexOf("https:"),
    s = utils_util.HQ_DOMAIN,
    o = new (function () {
      var e,
        r = "sinaH5EtagStatus",
        a = {
          domain: "",
          path: "/",
          expires: 3600
        },
        n = "n",
        m = "y",
        o = 0,
        d =
          (u ? "https" : "http") + "://" + s + ".sinajs.cn/list=sys_hqEtagMode",
        l = function () {
          t(d, function () {
            var t = window.hq_str_sys_hqEtagMode;
            0 == o
              ? (o = t)
              : (o == t
                ? ((e = !1), i.set(r, n, a))
                : ((e = !0), i.set(r, m, a)),
                (o = 0));
          });
        },
        b = function () {
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
        (this.isETag = function () {
          return e;
        });
    })(),
    d = function (e, t) {
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
    l = function () {
      function i(t, r, a) {
        var i = {},
          n = f[t];
        n ||
          ((n = {
            symbol: t
          }),
            (f[t] = n));
        var m = _.trHandler(a, n);
        m && (n.trstr = a), (i[t] = n);
        var u = {
          msg: "",
          dataObj: i
        };
        return utils_util.isFunc(r) && r(u), u;
      }
      function l(e) {
        return /^nf_(IF|IC|IH|TF|TS)\w+$/.test(e)
          ? "CFF"
          : /^nf_T(\d{4}|0)$/.test(e)
            ? "CFF"
            : "NF";
      }
      function b(paperCodesStr, callback, i, n) {
        if (n && --n.count > 0) return null;
        for (
          var paperCode,
          marketCode,
          s,
          hqStr,
          hqStr_i,
          hqStrDataArr,
          p,
          paperCodeArr = paperCodesStr.split(","),
          data = [],
          dataObj = {},
          f = 0,
          length = paperCodeArr.length;
          length > f;
          f++
        ) {
          if (
            ((paperCode = paperCodeArr[f]),
              (s = g[paperCode]),
              s ||
              ((s = {
                symbol: paperCode
              }),
                (g[paperCode] = s)),
              (marketCode = a(paperCode)),
              i)
          )
            hqStr = i;
          else
            switch (((hqStr = window["hq_str_" + paperCode]), marketCode)) {
              case "HK":
                (hqStr_i =
                  window["hq_str_" + paperCode.replace("rt_", "") + "_i"]),
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
                hqStr_i = window["hq_str_" + paperCode + "_i"];
            }
          hqStrDataArr = hqStr && hqStr.length > 0 ? hqStr.split(",") : void 0;
          var P;
          switch (marketCode) {
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
              P = "CFF" == l(paperCode) ? D : C;
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
          P && (w = P.update(hqStrDataArr, s, hqStr_i, p)),
            w && (s.hqstr = hqStr),
            data.push(s),
            (dataObj[paperCode] = s);
        }
        var H = {
          msg: "",
          data: data,
          dataObj: dataObj
        };
        return utils_util.isFunc(callback) && callback(H), H;
      }
      function p(t) {
        var r = 40,
          a = t.split(","),
          i = [];
        for (a = utils_util.uae(a); a.length > r;) i.push(a.splice(0, r));
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
        v = new (function () {
          var e = s + ".sinajs.cn",
            r = "://" + e + "/?_=$rn&list=$symbol",
            a = "://" + e + "/etag.php?_=" + c + "&list=$symbol",
            i = function (e) {
              var t,
                i = u ? "https" : e.ssl ? "https" : "http";
              return (t = e.cancelEtag
                ? i + r.replace("$rn", String(Math.random()))
                : i +
                (o.isETag() ? a : r.replace("$rn", String(Math.random()))));
            };
          return function (e, r, a) {
            (a = a || {}), t(i(a).replace("$symbol", e), r);
          };
        })(),
        P = function (e) {
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
              for (var N = a.length; N--;)
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
          return {
            datePart: P,
            timePart: h
          };
        },
        w = {
          swap: function (e) {
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
          kak: function (e, t) {
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
        y = new (function () {
          var e;
          this.update = function (t, r) {
            if (!t) return !1;
            e || (e = m.gtr([["0:00", "23:59"]]));
            var a = e,
              i = "00:00",
              n = t[11],
              u = t[0],
              s = P({
                dateStr: n,
                timeStr: u,
                hqObj: r,
                tArr: a,
                start: i
              });
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
        S = new (function () {
          var e, t;
          this.update = function (r, a) {
            if (!r) return !1;
            e || (e = m.gtr([["6:00", "23:59"], ["0:00", "5:59"]]));
            var i = e,
              n = "06:00",
              u = 17,
              s = a.symbol;
            0 !== s.indexOf("fx_") &&
              ((u = 10),
                "DINIW" == s &&
                (t || (t = m.gtr([["6:00", "23:59"], ["0:00", "5:59"]])),
                  (i = t),
                  (n = "06:00")));
            var o = r[u],
              d = r[0],
              l = P({
                dateStr: o,
                timeStr: d,
                hqObj: a,
                tArr: i,
                start: n
              });
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
        _ = new (function () {
          var t,
            r,
            a = function (r, a) {
              if (!r) return !1;
              t || (t = utils_util.isRepos(a.symbol) ? m.gtrepo() : m.gta());
              var i = 100;
              /[gz]/.test(a.type)
                ? (i = 10)
                : utils_util.isRepos(a.symbol)
                  ? (i = 10)
                  : (/^(sh000|sh580)\d+/.test(a.symbol) ||
                    /^(hy|gn|dy)\d+/.test(a.symbol)) &&
                  (i = 1),
                utils_util.isCNK(a.symbol) && (i = 1);
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
                    utils_util.isRepos(a.symbol)
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
            i = function (e, t) {
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
            u = function (t, a) {
              r || (r = m.gtr([["9:15", "11:30"], ["13:00", "15:01"]]));
              var i = g[a.symbol] || {},
                u = i.date;
              utils_util.isDate(u) || (u = new Date());
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
          (this.trHandler = function (e, t) {
            return u(e, t);
          }),
            (this.update = function (hqStrDataArr, stockObj, hqStr_i) {
              var n = !0;
              return hqStr_i && i(hqStr_i, stockObj), hqStrDataArr && (n = a(hqStrDataArr, stockObj)), n;
            });
        })(),
        D = new (function () {
          var e;
          this.update = function (t, r) {
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
              u = P({
                dateStr: i,
                timeStr: n,
                hqObj: r,
                tArr: e,
                start: e[0]
              });
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
        x = new (function () {
          var t,
            r = function (t) {
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
                c = [
                  utils_util.strUtil.zp(p),
                  utils_util.strUtil.zp(h),
                  "00"
                ].join(":"),
                g = new Date(m, r, o);
              if (+g > +n) {
                if (!(0 == n.getMonth() && n.getDate() < 7)) return null;
                m-- , (g = new Date(m, r, o));
              }
              var f = [
                g.getFullYear(),
                utils_util.strUtil.zp(g.getMonth() + 1),
                utils_util.strUtil.zp(g.getDate())
              ].join("-");
              return [c, f];
            },
            a = function (e, t) {
              if (e && t) {
                var r = e.split(",");
                !r ||
                  r.length < 3 ||
                  ((t.exchange = r[0]),
                    (t.industry = r[1]),
                    (t.issueprice = r[2]));
              }
            },
            i = function (e, a, i) {
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
                var b = P({
                  dateStr: d[1],
                  timeStr: d[0],
                  hqObj: a,
                  tArr: t
                });
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
          this.update = function (e, t, r, n) {
            var m;
            return r && a(r, t), e && (m = i(e, t, n)), m;
          };
        })(),
        T = new (function () {
          var e;
          this.update = function (t, r) {
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
        U = new (function () {
          var e,
            t = function (t, r, a) {
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
          this.update = function (e, r, a) {
            var i;
            return e && (i = t(e, r, a)), i;
          };
        })(),
        k = new (function () {
          var e;
          this.update = function (t, r) {
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
        C = new (function () {
          this.update = function (e, t) {
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
        A = new (function () {
          var e,
            t = function (t, r, a) {
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
            r = function (e, t) {
              var r = e.split(",");
              !r ||
                r.length < 15 ||
                ((t.type = String(r[0]).toLowerCase()),
                  (t.lastfive = 0),
                  (t.status = Number(r[14])),
                  (t.issueprice = Number(r[16])),
                  (t.cnName = r[19]));
            };
          this.update = function (e, a, i, n) {
            var m = !0;
            return i && r(i, a), e && (m = t(e, a, n)), m;
          };
        })(),
        O = new (function () {
          this.update = function (e, t) {
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
            var d = P({
              dateStr: s,
              timeStr: o,
              tArr: i,
              start: n,
              hqObj: t
            });
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
        q = new (function () {
          this.update = function (e, t) {
            if (!e) return !1;
            var r = m.gtgds(),
              a = r,
              i = r[0],
              n = 12,
              u = e[n],
              s = e[6],
              o = P({
                dateStr: u,
                timeStr: s,
                tArr: a,
                start: i,
                hqObj: t
              });
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
        j = new (function () {
          this.update = function (e, t) {
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
              d = P({
                dateStr: s,
                timeStr: o,
                tArr: i,
                start: n,
                hqObj: t
              });
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
        E = new (function () {
          var e;
          this.update = function (t, r) {
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
        F = new (function () {
          var e;
          this.update = function (t, r) {
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
        B = function (e) {
          for (var t = H.length; t--;) H[t](e), (H[t] = null), H.length--;
        };
      (this.get = function (e, t) {
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
            (N = setTimeout(function () {
              for (
                V = V.substring(0, V.length - 1),
                I = I.substring(0, I.length - 1),
                i = p(V),
                g = i.length,
                c = {
                  count: g
                },
                s = 0;
                g > s;
                s++
              )
                v(i[s].join(","), r(b, null, I, B, null, c), e);
              (I = ""), (V = "");
            }, 10000));
        else
          for (
            i = p(u),
            g = i.length,
            c = {
              count: g
            },
            s = 0;
            g > s;
            s++
          )
            v(i[s].join(","), r(b, null, n, t, null, c), e);
      }),
        (this.parse = function (t, r) {
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
          utils_util.isFunc(r) && r(a);
        });
    };
  return l;
});
xh5_define("utils.painter", ["utils.util", "cfgs.settinger"], function (t, e) {
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
            (o = xh5_BrowserUtil.hdpr), (e *= o), (a *= o);
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
        w = function () {
          (a = new e()),
            (r = a.canvas),
            (s = a.g),
            (r.style.position = "absolute"),
            (r.style.zIndex = 0),
            xh5_EvtUtil.addHandler(r, "touchstart", function (t) {
              N.custom.touch_prevent && xh5_EvtUtil.preventDefault(t);
            }),
            b.appendChild(r);
        },
        k = function (t) {
          (t = t || {}),
            (o = N.DIMENSION.getStageW()),
            (_ = isNaN(t.mh) ? _ : t.mh),
            (l = N.DIMENSION.posX),
            (h = N.DIMENSION.RIGHT_W),
            (m = N.DIMENSION.K_RIGHT_W),
            (c = isNaN(t.h) ? c : t.h),
            (v = isNaN(t.eh) ? v : t.eh),
            a.resize({
              width: o,
              height: c + v + _,
              hd: N.PARAM.getHd()
            }),
            (s.font = N.STYLE.FONT_SIZE + "px " + N.STYLE.FONT_FAMILY);
        },
        D = function (t, e, i, a) {
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
        P = function (t, e) {
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
        O = new (function () {
          var e,
            i,
            a,
            r,
            n,
            d = 4,
            m = g.futureTime || window["kke_future_" + g.symbol],
            f = function () {
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
            b = function (e) {
              g && t.market(g.symbol), N.DIMENSION.w_t;
              g.simple || D(_, c + _, e, !1);
            },
            v = function (t, i, a, r, n) {
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
            y = function (t) {
              var e = t.replace("nf_", "").replace(/[\d]+$/, "");
              return "TF" == e || "T" == e ? "CFF" : "NF";
            },
            w = 30,
            O = "ignore",
            x = "ignoreT",
            C = function () {
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
                      (m && m.time) || [["06:00", "23:59"], ["00:00", "05:00"]]
                    );
                    break;
                  case "NF":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [["09:00", "23:29"], ["13:00", "02:59"]]
                    );
                    break;
                  case "global_index":
                    i = t.tUtil.gata(
                      s,
                      (m && m.time) || [["06:00", "23:59"], ["00:00", "05:00"]]
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
            M = function () {
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
                        ? v(
                          S,
                          dateUtil.ds(o[w][0].date, "/", !1, !0, !1, !1),
                          w,
                          0,
                          _
                        )
                        : v(
                          S,
                          dateUtil.ds(o[w][0].date, "/") +
                          "/" +
                          dateUtil.nw(o[w][0].date.getDay()),
                          w,
                          0,
                          _
                        ),
                        0 != w && b(S),
                        (S += _);
                }
              }
            };
          this.drawFrames = function () {
            k(), C(), M(), f();
          };
        })(),
        x = new (function () {
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
            y = function (t, e, i) {
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
            T = function () {
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
                  case globalCfg.URLHASH.KMS:
                    i = "sec";
                    break;
                  case globalCfg.URLHASH.K1:
                    i = "h";
                    break;
                  case globalCfg.URLHASH.K5:
                  case globalCfg.URLHASH.K15:
                  case globalCfg.URLHASH.K30:
                  case globalCfg.URLHASH.K60:
                  case globalCfg.URLHASH.K240:
                    i = (60 / f) * 24 > r ? "h" : "d";
                    break;
                  case globalCfg.URLHASH.KD:
                  case globalCfg.URLHASH.KDF:
                  case globalCfg.URLHASH.KDB:
                  case globalCfg.URLHASH.KCL:
                  case globalCfg.URLHASH.KCLF:
                  case globalCfg.URLHASH.KCLB:
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
            O = function () {
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
                    0 == n && e++ ,
                    (t = u - (n * p) / r),
                    n == r && (s.textBaseline = "bottom");
                  var b;
                  f === globalCfg.URLHASH.KMS || f === globalCfg.URLHASH.K1
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
            x = function () {
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
              for (s.beginPath(); o - m > a;)
                s.moveTo(a, i), (a += r), s.lineTo(a, i), (a += r);
              (s.strokeStyle = N.COLOR.T_PREV), s.stroke();
            },
            C = function () {
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
                      0 == h && r++ ,
                      (a = v - (h * T) / u),
                      g.isCompare && (a *= 100),
                      S ? ((a /= C[0]), (n = h >= u ? C[1] : P(a))) : (n = P(a)),
                      g.isCompare && (n += "%"),
                      e
                        ? h == u && (s.textBaseline = "bottom")
                        : (s.textBaseline =
                          0 == h ? "top" : h == u ? "bottom" : "middle"),
                      f === globalCfg.URLHASH.KMS &&
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
          this.drawFrames = function (t) {
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
      (this.drawBg = function (t, e) {
        g.datas &&
          ((f = g.viewState.viewId),
            N.datas.isT
              ? O.drawFrames(t)
              : (isNaN(e) || ((x.iOffsetX = e), (t = !0)), x.drawFrames(t)));
      }),
        (this.respos = function (t) {
          k(t),
            (r.style.left = 0),
            (r.style.top = N.DIMENSION.posY + "px"),
            this.drawBg(!0);
        }),
        (this.gc = function () {
          t.domGc(r);
        }),
        w();
    }
    function m(e) {
      var i,
        parentObj = e.parentObj,
        ctn = e.ctn,
        iMgr = parentObj.iMgr,
        d = fBind(parentObj.iTo, null, ctn),
        iClk = parentObj.iClk,
        globalDragHandler = iMgr.globalDragHandler,
        zoomView = iMgr.zoomView,
        shortClickHandler = iMgr.shortClickHandler,
        setting = parentObj.setting,
        isFlash = setting.PARAM.isFlash,
        isNotFlash = !isFlash,
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
          vP: function (event) {
            var offsetX, offsetY;
            if (event.changedTouches) {
              xh5_EvtUtil.preventDefault(event),
                xh5_EvtUtil.stopPropagation(event);
              var a = xh5_EvtUtil.getTarget(event),
                r = event.changedTouches[0],
                s = a.getBoundingClientRect(),
                o = s.left,
                l = s.top;
              (offsetX = r.clientX - o), (offsetY = r.clientY - l);
            } else
              (offsetX = event.offsetX),
                isNaN(offsetX) && (offsetX = event.layerX),
                (offsetY = event.offsetY),
                isNaN(offsetY) && (offsetY = event.layerY);
            d(offsetX, offsetY, event);
          },
          vH: function (t) {
            if (!(this.isClk > 0) && setting.custom.allow_move) {
              xh5_EvtUtil.preventDefault(t), xh5_EvtUtil.stopPropagation(t);
              var e = t.changedTouches ? t.changedTouches[0].pageX : t.layerX;
              isNaN(e) && (e = t.offsetX);
              var i = t.changedTouches ? t.changedTouches[0].pageY : t.layerY;
              isNaN(i) && (i = t.offsetY),
                globalDragHandler(this.mDx, e, this.mDy, i);
            }
          },
          onMousedown: function (t) {
            (this.mDx = isNaN(t.layerX) ? t.offsetX : t.layerX),
              (this.mDy = isNaN(t.layerY) ? t.offsetY : t.layerY),
              (this.isM = this.isP = !0),
              (this.isClk = 2),
              w(!0);
          },
          onMousemove: function (event) {
            this.isTch ||
              ((_ = !0),
                this.isClk-- ,
                this.isP ? this.vH(event) : this.vP(event));
          },
          onMouseup: function (t) {
            (this.mDx = 0 / 0),
              (this.mDy = 0 / 0),
              (this.isM = this.isP = !1),
              globalDragHandler(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
              this.isClk > 0 && iClk && ((this.isClk = 0), iClk()),
              w(!1);
          },
          onMouseout: function () {
            (this.isClk = 0),
              (this.isM = this.isP = _ = !1),
              d(0 / 0, 0 / 0),
              w(!1);
          },
          tR: function () {
            clearTimeout(this.tCount), (this.isPv = this.isTMin = !1);
          },
          gR: function () {
            this.tR(), (this.tXOff = -1);
          },
          tCheck: function (t) {
            this.mvOx = t.touches[0].pageX;
            var e = this;
            (e.isClk = 2),
              (this.tCount = setTimeout(function () {
                (e.isPv = !0), e.vP(t), (e.isClk = 0);
              }, v));
          },
          onTouchend: function (t) {
            setting.custom.touch_prevent && xh5_EvtUtil.preventDefault(t),
              this.isPv || shortClickHandler(),
              this.tR(),
              (this.isTch = _ = !1),
              (this.mDx = 0 / 0),
              (this.mDy = 0 / 0),
              d(0 / 0, 0 / 0),
              globalDragHandler(0 / 0, 0 / 0, 0 / 0, 0 / 0, t),
              this.isClk > 0 && iClk && ((this.isClk = 0), iClk());
          },
          onTouchMove: function (t) {
            if ((this.isClk-- , 1 == t.touches.length)) {
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
              xh5_EvtUtil.preventDefault(t);
              var e = t.touches[0],
                i = t.touches[1];
              if (this.tXOff >= 0) {
                var a = Math.abs(e.pageX - i.pageX);
                if (a != this.tXOff) {
                  var r = xh5_EvtUtil.getTarget(t),
                    s = xh5_HtmlPosUtil.pageX(r),
                    l = e.pageX - s,
                    u = i.pageX - s;
                  zoomView(a < this.tXOff, [l, u]);
                }
              }
              this.tXOff = Math.abs(e.pageX - i.pageX);
            }
          },
          onTouchStart: function (t) {
            switch (
            (this.tR(),
              setting.custom.touch_prevent && xh5_EvtUtil.preventDefault(t),
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
          handleEvent: function (event) {
            if (setting.custom.mouse_and_touch)
              switch (event.type) {
                case "mouseup":
                  this.onMouseup(event);
                  break;
                case "mousedown":
                  this.onMousedown(event);
                  break;
                case "mouseout":
                  this.onMouseout();
                  break;
                case "mousemove":
                  this.onMousemove(event);
                  break;
                case "touchend":
                  this.onTouchend(event);
                  break;
                case "touchmove":
                  this.onTouchMove(event);
                  break;
                case "touchstart":
                  this.onTouchStart(event);
              }
          }
        },
        y = new (function () {
          (this.onmouseup = function (t) {
            setting.custom.mouse_and_touch && S.onMouseup(t);
          }),
            (this.onmousedown = function (t) {
              setting.custom.mouse_and_touch && S.onMousedown(t);
            }),
            (this.onmouseout = function () {
              setting.custom.mouse_and_touch && S.onMouseout();
            }),
            (this.onmousemove = function (t) {
              setting.custom.mouse_and_touch && S.onMousemove(t);
            });
        })(),
        T = function () {
          isNotFlash
            ? (i = a("canvas"))
            : ((i = a("div")),
              (i.style.backgroundColor = "#eee"),
              (i.style.opacity = 0),
              (i.style.filter = "alpha(opacity=0)")),
            (i.style.position = "absolute"),
            (i.style.zIndex = setting.PARAM.I_Z_INDEX);
          var t;
          xh5_deviceUtil.istd
            ? (t = ["touchend", "touchmove", "touchstart"])
            : ((t = ["mousedown", "mouseup", "mousemove", "mouseout"]),
              xh5_deviceUtil.allowt &&
              (t = t.concat(["touchend", "touchmove", "touchstart"])));
          for (var e = t.length; e--;)
            isNotFlash
              ? xh5_EvtUtil.addHandler(i, t[e], S)
              : xh5_EvtUtil.addHandler(
                i,
                t[e],
                y["on" + t[e]] || function () { }
              );
          ctn.appendChild(i);
        },
        w = function (t) {
          t
            ? ((i.style.cursor = "grabbing"),
              (i.style.cursor = "-webkit-grabbing"))
            : (i.style.cursor = "default");
        };
      (this.respos = function (t) {
        (i.style.top = setting.DIMENSION.posY + t.mh + "px"),
          (i.style.left = setting.DIMENSION.posX + "px");
        var e;
        (e = setting.datas.isT ? setting.DIMENSION.w_t : setting.DIMENSION.w_k),
          (i.style.width = e + "px"),
          (i.style.height = t.h + "px");
      }),
        (this.gc = function () {
          t.domGc(i);
        }),
        T();
    }
    function c(e) {
      (this.VER = "2.2.8"),
        (e = oc(
          {
            setting: void 0,
            sd: void 0,
            ctn: void 0,
            reO: void 0,
            withHBg: !1,
            nu: !1,
            dt: !0,
            fixScale: !0,
            iTo: function () { },
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
        c = function () {
          e.ctn
            ? (n = e.ctn)
            : ((n = a("div")), (n.style.position = "relative"));
        },
        f = function () {
          (s = a("canvas")),
            "undefined" != typeof FlashCanvas && FlashCanvas.initElement(s),
            (s.style.position = "absolute"),
            (s.style.zIndex = d.PARAM.G_Z_INDEX),
            (o = s.getContext("2d")),
            n.appendChild(s);
        },
        p = function () {
          u = new m({
            parentObj: e,
            ctn: n
          });
        },
        b = function () {
          l = new i({
            parentObj: e,
            ctn: n
          });
        },
        g = function (t) {
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
              (h = xh5_BrowserUtil.hdpr), (e *= h), (i *= h);
              break;
            default:
              (e *= h), (i *= h);
          }
          (s.width = e), (s.height = i), u && u.respos(t), l && l.respos(t);
        };
      (this.resize = g),
        (this.getCanvas = function () {
          return s;
        }),
        (this.getG = function () {
          return o;
        }),
        (this.getWrap = function () {
          return n;
        });
      var N;
      (this.scale = function (t) {
        switch (t) {
          case 0:
            return;
          case 1:
            t = xh5_BrowserUtil.hdpr;
        }
        t && o.scale(t, t);
      }),
        (this.newGStyle = function (t) {
          for (var e in t) t.hasOwnProperty(e) && (o[e] = t[e]);
        }),
        (this.newStyle = function (t, e, i) {
          (N = o.strokeStyle = t), e && o.beginPath(), i && (o.lineWidth = i);
        }),
        (this.newFillStyle = function (t, e) {
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
        (this.newFillStyle_rgba = function (e, i, a) {
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
        (this.clear = function (t, e) {
          (s.width = s.width),
            t &&
            (N && o.strokeStyle != N && (o.strokeStyle = N), o.beginPath()),
            this.scale(e);
        }),
        (this.clearLimit = function (t, e) {
          o.clearRect(t, 0, e, s.height), o.beginPath();
        }),
        (this.beginPath = function () {
          o.beginPath();
        }),
        (this.closePath = function () {
          o.closePath();
        }),
        (this.fill = function () {
          o.fill();
        }),
        (this.stroke = function () {
          o.stroke();
        }),
        (this.save = function () {
          o.save();
        }),
        (this.translate = function (t, e) {
          o.translate(t, e);
        }),
        (this.restore = function () {
          o.restore();
        }),
        (this.moveTo = function (t, e) {
          o.moveTo(t, e);
        }),
        (this.lineTo = function (t, e) {
          o.lineTo(t, e);
        }),
        (this.drawDot = function (t, e, i, a) {
          a && o.moveTo(t, e), o.arc(t, e, i, 0, 2 * Math.PI);
        }),
        (this.arc = function (t, e, i, a, r, n) {
          o.arc(t, e, i, a, r, n);
        }),
        (this.drawCandleRect = function (t, e, i, a, r, n) {
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
        (this.drawCandleRect_solid = function (t, e, i, a, r) {
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
        (this.drawCandleLineRect = function (t, e, i, a, r, n, s, l) {
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
        (this.drawOhlc = function (t, e, i, a, r, n, s) {
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
        (this.drawVStickC = function (t, e, i, a, r) {
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
        (this.drawVStickRect = function (t, e, i, a, r, n) {
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
        (this.drawBg = function (t) {
          l && l.drawBg(!1, t);
        }),
        (this.remove = function () {
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
    xh5_BrowserUtil = t.xh5_BrowserUtil,
    xh5_EvtUtil = t.xh5_EvtUtil,
    xh5_deviceUtil = t.xh5_deviceUtil,
    xh5_HtmlPosUtil = t.xh5_HtmlPosUtil,
    fBind = t.fBind,
    dateUtil = t.dateUtil,
    oc = t.oc,
    globalCfg = e.globalCfg;
  return i;
});

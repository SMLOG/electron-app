var xh5_define,
  KKE = KKE || {};
~(function(KKE) {
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

    module.relyCall(
      modName,
      function() {
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
          util.err(callback, [modConfig.CMD_UNEXIST, name].join(":"));
        else {
          if (util.isFunc(actionMethod)) actionMethod(config, callback);
          else util.isFunc(callback) && callback(actionMethod);
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
      scripts = document.getElementsByTagName("script"),
      u = scripts.length;
    u--;

  ) {
    r = scripts[u];
    a = r.src || "";
    if (modConfig.SDK_REG.test(a)) {
      for (var s, o = r.attributes.length; o--; ) {
        s = r.attributes[o];
        "ssl" == s.name && (modConfig.isSSL = "true" == s.value);
        "debug" == s.name && (modConfig.isDebug = "true" == s.value);
        "local" == s.name && (modConfig.isLocal = "true" == s.value);
        "murl" == s.name && (modConfig.custom_mod_url = s.value);
      }

      break;
    }
  }

  if (0 == location.protocol.indexOf("https:")) modConfig.isSSL = !0;

  var util = new (function() {
      this.getScript = function(url, onLoaded, onError, charset) {
        var what = !1,
          n = document.createElement("script"),
          u = document.getElementsByTagName("script")[0],
          head =
            document.head ||
            document.getElementsByTagName("head")[0] ||
            document.documentElement,
          base = head.getElementsByTagName("base")[0];
        n.charset = charset || "gb2312";
        n.src = url;
        n.async = !0;
        n.onload = n.onreadystatechange = function() {
          what ||
            (n.readyState && !/loaded|complete/.test(String(n.readyState))) ||
            ((what = !0),
            (n.onload = n.onreadystatechange = n.onerror = null),
            n.parentNode.removeChild(n),
            (n = null),
            "function" == typeof onLoaded && onLoaded());
        };
        n.onerror = function() {
          (n.onload = n.onreadystatechange = n.onerror = null),
            n.parentNode.removeChild(n),
            (n = null),
            "function" == typeof onError && onError();
        };
        u.parentNode
          ? u.parentNode.insertBefore(n, u)
          : base
          ? head.insertBefore(n, base)
          : head.appendChild(n);
      };

      this.fBind = function(method, _this) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function() {
          return method.apply(
            _this,
            args.concat(Array.prototype.slice.call(arguments))
          );
        };
      };

      var t = function(e) {
        return function(param1) {
          return {}.toString.call(param1) == "[object " + e + "]";
        };
      };
      this.isStr = t("String");
      this.isFunc = t("Function");
      this.isArr = t("Array");
      this.trace = (function(e) {
        return {
          log: function() {
            e && e.log && e.log.apply(e, arguments);
          },
          error: function() {
            e && e.error && e.error.apply(e, arguments);
          }
        };
      })(null);
      this.err = function(e, t) {
        this.isFunc(e) &&
          e({
            msg: t,
            data: null
          }),
          this.trace.error(t);
      };
    })(),
    modulesArr = ["datas.hq", "datas.k", "datas.t", "utils.util"],
    module = new (function() {
      function _xh5_define(modName, depends, func) {
        if (3 != arguments.length)
          return void util.trace.error(modConfig.MOD_DEF_ERR, modName);
        var n = parseModName(modName),
          modTreeNode = n[0],
          childName = n[1],
          moduleObj = modTreeNode[childName];
        if (moduleObj) moduleObj.init = true;
        else
          moduleObj = modTreeNode[childName] = {
            init: true,
            name: modName,
            funcQ: [],
            entity: void 0
          };

        util.isStr(depends) && (depends = [depends]);

        for (var dep, len = depends.length; len--; ) {
          dep = depends[len];
          if (dep.indexOf("*") > -1) {
            depends.splice(len, 1);
            var arr = dep.split(".");
            arr.splice(arr.length - 1, arr.length);
            var h = arr.join(".");
            depends = depends.concat(fillDepences(h, modName));
            break;
          }
        }

        recursiveDepends(depends, depends.slice(0), moduleObj, func);
      }
      var modsTree = {},
        parseModName = function(modName) {
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
        forEachModfuncQ = function(e) {
          for (; e.funcQ.length; ) {
            var t = e.funcQ.shift();
            util.isFunc(t) && t();
          }
        },
        n = function(dependsArr) {
          if (!dependsArr) return null;
          for (var r = [], a = [], n = 0, u = dependsArr.length; u > n; n++) {
            for (var s, o = dependsArr[n].split("."), d = void 0; o.length; )
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
        recursiveEnd = function(modEntity, modEntityOrEntityFun, dependsArr) {
          var u = modEntityOrEntityFun.toString(),
            s = 0 == u.indexOf("function");
          if (s) {
            var o = n(dependsArr),
              entifyOrfunc = modEntityOrEntityFun.apply(
                null,
                o.e.concat(modsTree)
              );
            modEntity.entity = util.isFunc(entifyOrfunc)
              ? new entifyOrfunc()
              : entifyOrfunc;
          } else modEntity.entity = modEntityOrEntityFun;
          forEachModfuncQ(modEntity);
        },
        recursiveDepends = function(
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
        loadUrlScript = function(module, t, r) {
          (t = t.replace(/\./g, "/")), r && (r += "$moduleName.js");
          var modUrl = r || modConfig.getModUrl();
          util.getScript(
            modUrl.replace("$moduleName", t),
            null,
            util.fBind(util.trace.error, this, modConfig.CMD_404, module.name)
          );
        },
        loadUrlModule = function(modName, modUrl) {
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
        fillDepences = function(dep, name) {
          for (var r, a = [], i = modulesArr.length; i--; ) {
            r = modulesArr[i];
            if (0 == r.indexOf(dep) && -1 == r.indexOf(name)) a[a.length] = r;
          }
          return a;
        },
        relyCall = function(modName, callback, modUrl) {
          var modObj = loadUrlModule(modName, modUrl);
          if (util.isFunc(callback)) {
            if (modObj.init) callback();
            else modObj.funcQ.push(callback);
          }
        };
      this.modsTree = modsTree;
      this.relyCall = relyCall;
      xh5_define = _xh5_define;
    })();

  KKE.api = api;
  KKE.cls = {};
  KKE.istLL = "KKE|1.0.4|WANGXuan|SinaFinance|wangxuan2@staff.sina.com.cn";
})(KKE);

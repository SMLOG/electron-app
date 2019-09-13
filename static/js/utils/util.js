xh5_define("utils.util", [], function() {
    return function() {
        function fInherit(constructor, e) {
            var prototype = contructObjFromPrototpe(e.prototype);
            prototype.constructor = constructor;
            constructor.prototype = prototype;
        }

        function xh5_EvtDispatcher() {
            this.evtObj = {};
        }

        function fbind(fun, _this) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function() {
                return fun.apply(
                    _this,
                    i.concat(Array.prototype.slice.call(arguments))
                );
            };
        }

        function now() {
            return Date.now ? Date.now() : new Date().getTime();
        }

        function hash(str, ignoreCase) {
            ignoreCase || (str = str.toLowerCase());
            for (var i, n = 1315423911, r = str.length; r--;)
                (i = str.charCodeAt(r)), (n ^= (n << 5) + i + (n >> 2));
            return 2147483647 & n;
        }

        function getScript(url, onSuccess, onError, options) {
            console.log(url);
            var r = !1,
                scriptTag = document.createElement("script"),
                o = document.getElementsByTagName("script")[0],
                s =
                document.head ||
                document.getElementsByTagName("head")[0] ||
                document.documentElement,
                l = s.getElementsByTagName("base")[0];
            options = options || {};
            var what;
            scriptTag.charset = options.charset || "gb18030";
            scriptTag.src = url;
            scriptTag.async = !0;
            scriptTag.onload = scriptTag.onreadystatechange = function() {
                if (
                    !r &&
                    (!scriptTag.readyState ||
                        /loaded|complete/.test(scriptTag.readyState))
                ) {
                    if (what) {
                        var t = new Date() - what,
                            i = options.market.toLowerCase(),
                            o = options.type.toLowerCase();
                        k.sima({
                            simadata: {
                                cre: i,
                                mod: o,
                                during: t
                            },
                            symbol: options.symbol,
                            type: options.type
                        });
                    }
                    console.log(url);
                    r = !0;
                    scriptTag.onload = scriptTag.onreadystatechange = scriptTag.onerror = null;
                    scriptTag.parentNode.removeChild(scriptTag);
                    scriptTag = null;
                    "function" == typeof onSuccess && onSuccess();
                }
            };
            scriptTag.onerror = function() {
                if (what) {
                    var t = new Date() - what,
                        e = options.market.toLowerCase(),
                        r = options.type.toLowerCase();
                    k.sima({
                        simadata: {
                            cre: e,
                            mod: r,
                            during: t,
                            error_type: "err"
                        },
                        symbol: options.symbol,
                        type: options.type
                    });
                }
                scriptTag.onload = scriptTag.onreadystatechange = scriptTag.onerror = null;
                scriptTag.parentNode.removeChild(scriptTag);
                scriptTag = null;
                "function" == typeof onError && onError();
            };

            options.market && options.type && options.symbol && (what = new Date());
            o.parentNode ?
                o.parentNode.insertBefore(scriptTag, o) :
                l ?
                s.insertBefore(scriptTag, l) :
                s.appendChild(scriptTag);
        }

        function o() {
            function copyStyleToDom(t) {
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
                        len = t.length; len > e; e++
                )
                    u.cssUtil.inject(t[e] + guest.scaleY);
            }

            function i() {
                e();
                if (!domObj) {
                    domObj = u.$C("div");
                    copyStyleToDom({
                        dom: domObj,
                        style: guest.ctn
                    });
                    for (var i = 0.1, n = 0, a = guest.color.length; a > n; n++) {
                        var o = u.$C("span");
                        copyStyleToDom({
                            dom: o,
                            style: guest.item
                        });
                        var s = u.clone(guest.delay, s),
                            c = -1 + i * n + "s";
                        for (var h in s) s.hasOwnProperty(h) && (s[h] = c);
                        copyStyleToDom({
                                dom: o,
                                style: s
                            }),
                            (o.style.background = guest.color[n]),
                            domObj.appendChild(o);
                    }
                }
            }

            function timeoutHide() {
                clearTimeout(timerID),
                    (timerID = setTimeout(function() {
                        "none" != domObj.style.display && (domObj.style.display = "none");
                    }, 9e3));
            }
            var domObj,
                a,
                timerID,
                s,
                guest = {
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
                    scaleY: "{0%,40%,100%{-moz-transform:scaleY(0.2);-webkit-transform:scaleY(0.2);transform:scaleY(0.2);}20%,60%{-moz-transform:scaleY(1);-webkit-transform:scaleY(1);transform:scaleY(1);}}"
                };
            i();
            this.appendto = function(t, e) {
                a = t;
                s = e;
                a.appendChild(domObj);
            };
            this.setPosition = function() {
                a && a.offsetHeight > 0 ?
                    ((domObj.style.top =
                            (a.offsetHeight - parseInt10(guest.ctn.height)) / 2 + "px"),
                        (domObj.style.left =
                            (a.offsetWidth - parseInt10(guest.ctn.width)) / 2 + "px")) :
                    s &&
                    s.DIMENSION.h_t &&
                    ((domObj.style.top =
                            (s.DIMENSION.h_t - parseInt10(guest.ctn.height)) / 2 + "px"),
                        (domObj.style.left =
                            (s.DIMENSION._w - parseInt10(guest.ctn.width)) / 2 + "px"));
            };
            this.show = function() {
                timeoutHide();
                domObj.style.display = "";
            };
            this.hide = function() {
                clearTimeout(timerID);
                domObj.style.display = "none";
            };
        }

        function s(t) {
            t = t || {};
            var e,
                i,
                n,
                r,
                a,
                timerID,
                s = u.$C("div"),
                l = 70,
                hide = function() {
                    clearTimeout(timerID);
                    i && ((i.style.display = "none"), (s.innerHTML = ""));
                    e && isFunction(e.closeCb) && e.closeCb();
                },
                genTip = function(h) {
                    if (((e = h), clearTimeout(timerID), !i)) {
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
                        (n.style.backgroundColor = t.TIP_ARR ?
                            t.TIP_ARR[2] || "#fff" :
                            "#fff"),
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
                        u.xh5_EvtUtil.addHandler(a, "click", hide),
                            r.appendChild(s);
                        var d = !(!t.TIP_ARR || !t.TIP_ARR[3]);
                        !d && i.appendChild(n), i.appendChild(r);
                    }
                    (i.style.display = ""),
                    (s.style.color =
                        "undefined" != typeof h.fontColor ?
                        h.fontColor :
                        t.TIP_ARR ?
                        t.TIP_ARR[1] || "#fff" :
                        "#fff");
                    var f = t.TIP_ARR ? t.TIP_ARR[0] || "#000" : "#000";
                    if (
                        ((r.style.backgroundColor = u.xh5_BrowserUtil.noH5 ?
                                f :
                                u.hex2dec(f, 0.8)),
                            h.bgStyle)
                    )
                        for (var p in h.bgStyle) {
                            if (h.bgStyle.hasOwnProperty(p)) r.style[p] = h.bgStyle[p];
                        }
                    if (
                        ((s.innerHTML = h.txt || ""),
                            h.content && s.appendChild(h.content),
                            !isNaN(h.autoHide) &&
                            h.autoHide > 0 &&
                            setTimeout(hide, 1e3 * h.autoHide),
                            h.noBtn ?
                            u.$CONTAINS(r, a) && r.removeChild(a) :
                            ((a.innerHTML = h.btnLb || "确定"),
                                (a.style.background = t.BTN_ARR ?
                                    t.BTN_ARR[0] || "#2b9dfc" :
                                    "#2b9dfc"),
                                (a.style.color = t.BTN_ARR ? t.BTN_ARR[1] || "#fff" : "#fff"),
                                !u.$CONTAINS(r, a) && r.appendChild(a)),
                            h.extraBtn)
                    )
                        for (var m = 0, g = h.extraBtn, v = g.length; v > m; m++) {
                            var b = g[m];
                            var N = u.$C("input");
                            N.type = "button";
                            N.value = b.value;
                            N.style.marginTop = "20px";
                            N.style.cursor = "pointer";
                            u.xh5_EvtUtil.addHandler(N, "click", b.onClk);
                            r.appendChild(N);
                        }
                    h.parent.appendChild(i);
                    return i;
                };
            this.genTip = genTip;
            this.hide = hide;
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
        var u = this;
        var isTypeFun = function(t) {
            return function(e) {
                return {}.toString.call(e) == "[object " + t + "]";
            };
        };
        var isObject = isTypeFun("Object");
        var isString = isTypeFun("String");
        var isFunction = isTypeFun("Function");
        var isArray = isTypeFun("Array");
        var isNumber = isTypeFun("Number");
        var isDate = isTypeFun("Date");
        this.isObj = isObject;
        this.isStr = isString;
        this.isFunc = isFunction;
        this.isArr = isArray;
        this.isNum = isNumber;
        this.isDate = isDate;
        var parseInt10 = function(t) {
            return parseInt(t, 10);
        };
        this.uae = function(t) {
            for (var e, i = [], n = {}, r = 0, a = t.length; a > r; r++) {
                e = t[r];
                if (1 !== n[e]) {
                    n[e] = 1;
                    i[i.length] = e;
                }
            }
            return i;
        };
        var ajax = new(function() {
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

            this.send = function(url, dataObj, callback, method) {
                if (!t || !url)
                    return void(callback && callback("error while sending"));
                if (
                    ((url += url.indexOf("?") < 0 ? "?" : "&"),
                        (url += "_=" + new Date().getTime()),
                        (method = method || "POST"),
                        (t.onreadystatechange = function() {
                            if (4 == t.readyState) {
                                var e;
                                200 == t.status && (e = t.responseText), callback && callback(e);
                            }
                        }),
                        t.open(method, url, !0),
                        "POST" == method)
                ) {
                    t.setRequestHeader(
                        "Content-Type",
                        "application/x-www-form-urlencoded;"
                    );
                    var a = "";
                    for (var o in dataObj)
                        dataObj.hasOwnProperty(o) &&
                        (a += [encodeURIComponent(o), encodeURIComponent(dataObj[o])].join(
                            "="
                        ) + "&");
                    t.send(a);
                } else t.send(null);
            };
        })();

        this.POST =
            "undefined" != typeof jQuery && jQuery.post ? jQuery.post : ajax.send;
        this.trace = (function(t) {
            return {
                log: function() {
                    t && t.log && t.log.apply(t, arguments);
                },
                error: function() {
                    t && t.error && t.error.apply(t, arguments);
                }
            };
        })(null);

        var arrIndexOf = function(t, e) {
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
        var clone = function(t, e) {
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
        var cloneObject = function(t) {
            if (!t) return t;
            var e = {};
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            return e;
        };
        this.co = cloneObject;
        //copy properties
        this.oc = function(targetObj, sourceObj) {
            if (!targetObj) return sourceObj;
            for (var i in sourceObj)
                sourceObj.hasOwnProperty(i) &&
                (targetObj[i] =
                    isObject(targetObj[i]) && isObject(sourceObj[i]) ?
                    arguments.callee(targetObj[i], sourceObj[i]) :
                    sourceObj[i]);
            return targetObj;
        };
        var contructObjFromPrototpe = function(prototype) {
            function e() {}
            e.prototype = prototype;
            return new e();
        };
        this.fInherit = fInherit;
        this.urlUtil = new(function() {
            this.getUrlParam = function() {
                var t,
                    e = {};
                try {
                    t = location.search.substring(1);
                } catch (i) {}
                if (t) {
                    for (var n, r, a, o = t.split("&"), s = o.length, l = 0; s > l; l++) {
                        a = o[l].indexOf("=");
                        if (-1 != a) {
                            n = o[l].substring(0, a);
                            r = o[l].substring(a + 1);
                            e[n] = r;
                        }
                    }
                }

                return e;
            };
            this.getMainUrl = function() {
                return window.location != window.parent.location ?
                    document.referrer :
                    document.location.href;
            };
        })();

        this.xh5_BrowserUtil = new(function() {
            this.info = (function() {
                var t,
                    e = navigator.userAgent,
                    i =
                    e.match(
                        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
                    ) || [];
                return /trident/i.test(i[1]) ?
                    ((t = /\brv[ :]+(\d+)/g.exec(e) || []), {
                        name: "IE ",
                        version: t[1] || ""
                    }) :
                    "Chrome" === i[1] && ((t = e.match(/\bOPR\/(\d+)/)), null != t) ?
                    {
                        name: "Opera",
                        version: t[1]
                    } :
                    ((i = i[2] ?
                            [i[1], i[2]] :
                            [navigator.appName, navigator.appVersion, "-?"]),
                        null != (t = e.match(/version\/(\d+)/i)) && i.splice(1, 1, t[1]), {
                            name: i[0],
                            version: i[1]
                        });
            })();
            this.noH5 = !1;

            this.hdpr = (function(t) {
                var e = document.createElement("canvas");
                if (e.getContext && e.getContext("2d")) {
                    var i = Math.ceil(window.devicePixelRatio || 1),
                        n = e.getContext("2d").webkitBackingStorePixelRatio || 1;
                    return i / n;
                }
                return (t.noH5 = !0), 1;
            })(this);
        })();

        this.xh5_deviceUtil = (function() {
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
        })();

        var localSL = (function() {
            function toJsonStrAndEncode(object) {
                object = JSON.stringify(object);
                object || (object = "");
                object = encodeURIComponent(object);
                return object;
            }

            function toObjectOrDecode(str) {
                try {
                    str = JSON.parse(str);
                } catch (e) {
                    str = decodeURIComponent(str);
                }
                return str;
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
                        toJsonStrAndEncode(i),
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
                return i ? toObjectOrDecode(i[1]) || "" : null;
            }

            function saveToCookie(t) {
                document.cookie =
                    encodeURIComponent(t) + "=;expires=" + new Date(0).toUTCString();
            }

            function a(e, i) {
                void 0 != e &&
                    void 0 != i &&
                    localStorage.setItem(encodeURIComponent(e), toJsonStrAndEncode(i));
            }

            function getItem(key) {
                var i = localStorage.getItem(encodeURIComponent(key));
                return toObjectOrDecode(i);
            }

            function removeItem(key) {
                localStorage.removeItem(encodeURIComponent(key));
            }
            var toString = Object.prototype.toString;
            var u = function(t) {
                return null === t ?
                    "Null" :
                    void 0 === t ?
                    "Undefined" :
                    toString.call(t).slice(8, -1);
            };
            var c = (function() {
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
                            removeItem(t), a(t, e);
                        } catch (o) {}
                    else i(t, e, n);
                },
                load: function(t, e) {
                    var peristConfig;
                    if (("Object" == u(e) && (e = e.mode), e))
                        switch (e) {
                            case "localStorage":
                                if (!c) return;
                                peristConfig = getItem(t);
                                break;
                            case "cookie":
                                peristConfig = n(t);
                        }
                    else
                        c && (peristConfig = getItem(t)),
                        !peristConfig && (peristConfig = n(t));
                    return peristConfig;
                },
                remove: function(t, e) {
                    if (("Object" == u(e) && (e = e.mode), e))
                        switch (e) {
                            case "localStorage":
                                if (!c) return;
                                removeItem(t);
                                break;
                            case "cookie":
                                saveToCookie(t);
                        }
                    else c && removeItem(t), saveToCookie(t);
                },
                clear: function(t) {
                    c && removeItem(t);
                }
            };
        })();

        this.localSL = localSL;
        this.xh5_EvtUtil = {
            addHandler: function(t, e, i) {
                t &&
                    (t.addEventListener ?
                        t.addEventListener(e, i, !1) :
                        t.attachEvent ?
                        t.attachEvent("on" + e, i) :
                        (t["on" + e] = i));
            },
            removeHandler: function(t, e, i) {
                t &&
                    (t.removeEventListener ?
                        t.removeEventListener(e, i, !1) :
                        t.detachEvent ?
                        t.detachEvent("on" + e, i) :
                        (t["on" + e] = null));
            },
            getEvent: function(t) {
                return t ? t : window.event;
            },
            getTarget: function(t) {
                return !t && (t = this.getEvent()), t ? t.target || t.srcElement : null;
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
                    t.relatedTarget ?
                    t.relatedTarget :
                    t.toElement ?
                    t.toElement :
                    t.fromElement ?
                    t.fromElement :
                    null
                );
            },
            getWheelDelta: function(t) {
                return (
                    !t && (t = this.getEvent()),
                    t ?
                    t.wheelDelta ?
                    client.engine.opera && client.engine.opera < 9.5 ?
                    -t.wheelDelta :
                    t.wheelDelta :
                    40 * -t.detail :
                    0
                );
            }
        };
        xh5_EvtDispatcher.prototype.al = function(t, e, i) {
            (i && this.evtObj[t]) ||
            (!this.evtObj[t] && (this.evtObj[t] = []), this.evtObj[t].push(e));
        };
        xh5_EvtDispatcher.prototype.rl = function(t, e) {
            var i = this.evtObj[t];
            if (isArray(i))
                for (var n = i.length; n--;) i[n] == e && i.splice(n, 1);
        };
        xh5_EvtDispatcher.prototype.re = function(t, e) {
            var i = this.evtObj[t];
            if (isArray(i))
                for (var n = 0, r = i.length; r > n; n++)
                    "function" == typeof i[n] && i[n](t, e);
        };
        this.xh5_EvtDispatcher = xh5_EvtDispatcher;
        this.$DOM = function(elID, parentDIV) {
            return (
                (parentDIV = parentDIV || document), parentDIV.getElementById(elID)
            );
        };
        this.$C = function(tag, elID) {
            var i = document.createElement(tag);
            return elID && (i.id = elID), i;
        };
        this.$T = function(t) {
            return document.createTextNode(t);
        };
        this.$CONTAINS = function(t, e) {
            if (t.compareDocumentPosition)
                return t === e || !!(16 & t.compareDocumentPosition(e));
            if (t.contains && 1 === e.nodeType) return t.contains(e) && t !== e;
            for (;
                (e = e.parentNode);)
                if (e === t) return !0;
            return !1;
        };
        this.getTextNodes = function(t) {
            var e = [];
            for (t = t.firstChild; t; t = t.nextSibling)
                3 == t.nodeType ? e.push(t) : (e = e.concat(arguments.callee(t)));
            return e;
        };
        this.getCSS = function(t) {
            var e = null;
            return (e = window.getComputedStyle ?
                window.getComputedStyle(t) :
                t.currentStyle);
        };
        this.fBind = fbind;
        this.isColor = function(t) {
            return /^#[0-9a-fA-F]{3,6}$/.test(t);
        };
        this.isColorRGB = function(t) {
            return /(^#[0-9a-fA-F]{3,6}$)|(^rgba?\(.{5,16}\)$)/.test(t);
        };
        this.randomColor = function() {
            for (
                var t = Math.floor(16777215 * Math.random()).toString(16); t.length < 6;

            )
                t += "0";
            return t;
        };
        this.hex2dec = function(t, e, i) {
            if (0 == t.indexOf("rgb")) return t;
            t = t.replace(/#|0x/i, "");
            var n, r, a;
            t.replace(/(\w{6})|(\w{3})/, function(e, i, o) {
                if (i)(n = t.slice(0, 2)), (r = t.slice(2, 4)), (a = t.slice(4));
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
            return isNaN(e) ?
                ((o = [parseInt(n, 16), parseInt(r, 16), parseInt(a, 16)]),
                    i ? o : "rgb($color)".replace("$color", o.join(","))) :
                ((o = [parseInt(n, 16), parseInt(r, 16), parseInt(a, 16), e]),
                    i ? o : "rgba($color)".replace("$color", o.join(",")));
        };
        this.getTimestamp = now;
        this.cssUtil = {
            inject: function(t) {
                var e = document.createElement("style"),
                    i =
                    document.head ||
                    document.getElementsByTagName("head")[0] ||
                    document.documentElement;
                (e.type = "text/css"),
                e.styleSheet ?
                    (e.styleSheet.cssText = t) :
                    e.appendChild(document.createTextNode(t)),
                    i.appendChild(e);
            },
            adCls: function(t, e) {
                if (t.className != e) {
                    var i = t.className.split(" ");
                    for (var n in i)
                        if (i.hasOwnProperty(n) && i[n] == e) return;
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
        };
        this.load = getScript;
        var _;
        var relyLoader = new(function() {
            var t = _ || {};
            _ = t;
            var e = function(e, i) {
                for (var n = t[e][i ? "errCbArr" : "cbArr"], r = n.length; r--;) {
                    var a = n[r];
                    isFunction(a) && a();
                }
                (t[e] = null), delete t[e];
            };
            this.load = function(n, o, s, l) {
                var u = "urlhash_" + hash(n);
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
        this.relyLoader = relyLoader;
        this.iframer = function(t, e) {
            function i() {
                if (document && document.body) {
                    clearInterval(r), (o = 0);
                    var t = document.body;
                    t.insertBefore(n, t.firstChild), n.setAttribute("data-ready", "1");
                } else o++ > 9 && (clearInterval(r), isFunction(e) && e());
            }
            var n,
                r,
                a = t.attribute ?
                t.attribute.id || "_kkeiframe" + new Date().getTime() :
                "_kkeiframe" + new Date().getTime(),
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
        };
        this.ca = function(t) {
            if (t)
                for (; t.length > 0;) t.length--;
        };
        this.isRepos = function(t) {
            return /^(sh204\d{3}|sz1318\d{2})$/.test(t);
        };
        this.isCNK = function(t) {
            return /^(sh688\d{3}|sh689\d{3})$/.test(t) ? "CNK" : void 0;
        };
        this.market = function(t) {
            return /^(sh204\d{3}|sz1318\d{2})$/.test(t) ?
                "REPO" :
                /^s[hz]\d{6}$/.test(t) ?
                "CN" :
                /^GN|gn\d{7}$/.test(t) ?
                "CN" :
                /^HY|hy\d{7}$/.test(t) ?
                "CN" :
                /^DY|dy\d{7}$/.test(t) ?
                "CN" :
                /^s[hz]\d{6}_i$/.test(t) ?
                "CNI" :
                /^sb[48]\d{5}$/.test(t) ?
                "OTC" :
                /^[48]\d{5}$/.test(t) ?
                "OTC" :
                /^otc_\d{6}$/.test(t) ?
                "OTC" :
                /^btc_\w+/.test(t) ?
                "BTC" :
                /^gb_.+$/.test(t) ?
                "US" :
                /^(hk|rt_hk)\w+/.test(t) ?
                "HK" :
                /^hf_\w+/.test(t) ?
                "HF" :
                /^lse_.+$/.test(t) ?
                "LSE" :
                /^nf_\w+/.test(t) ?
                "NF" :
                /^gds_\w+/.test(t) ?
                "GOODS" :
                /^f_\d{6}$/.test(t) ||
                /^fu_\d{6}$/.test(t) ||
                /^pwbfbyd_\d{6}$/.test(t) ||
                /^pwbfbjd_\d{6}$/.test(t) ||
                /^pwbfbnd_\d{6}$/.test(t) ||
                /^ljjz_\d{6}$/.test(t) ||
                /^dwjz_\d{6}$/.test(t) ||
                /^lshb_\d{6}$/.test(t) ?
                "fund" :
                /^CON_OP_\w+/.test(t) ?
                "option_cn" :
                /^P_OP_\w+/.test(t) ?
                "op_m" :
                /^znb_\w+/.test(t) ?
                "global_index" :
                /^fx_.+$/.test(t) ?
                "forex" :
                /^(DINIW|USDCNY)$/.test(t) ?
                "forex_yt" :
                /^CFF_RE_.+$/.test(t) ?
                "CFF" :
                /^msci_\w+/.test(t) ?
                "MSCI" :
                /\d+$/.test(t) ?
                "NF" :
                void 0;
        };
        this.cookieUtil = {
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
                    Number(i.expires) ?
                        ((r = new Date()), r.setTime(r.getTime() + 1e3 * i.expires)) :
                        (r = i.expires),
                        (n = "; expires=" + r.toUTCString());
                }
                var a = i.path ? "; path=" + i.path : "",
                    o = i.domain ? "; domain=" + i.domain : "",
                    s = i.secure ? "; secure" : "";
                document.cookie = [t, "=", e, n, a, o, s].join("");
            }
        };
        var k = new(function() {
            function t(e) {
                getScript(
                    e.url,
                    function() {
                        for (var t = e.f(); t && e.q.length;) {
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
                    url: "https://mjs.sinaimg.cn/umd/base-tools-SUDA/1.0.2/index.all.min.js",
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
                            u = c.length; u > s; s++
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
            this.stc = function(t, e, i) {
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
        (this.stc = k.stc),
        (this.suda = k.s2),
        (this.xh5_PosUtil = {
            pp: function(t, e, i, n) {
                return isNaN(t) || e >= t ?
                    n :
                    t >= i ?
                    1 :
                    Math.max(n * (1 - (t - e) / (i - e)), 1);
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
                return t.offsetParent ?
                    t.offsetLeft + this.pageX(t.offsetParent) :
                    t.offsetLeft;
            },
            pageY: function(t) {
                return t.offsetParent ?
                    t.offsetTop + this.pageY(t.offsetParent) :
                    t.offsetTop;
            },
            parentX: function(t) {
                return t.parentNode == t.offsetParent ?
                    t.offsetLeft :
                    this.pageX(t) - this.pageX(t.parentNode);
            },
            parentY: function(t) {
                return t.parentNode == t.offsetParent ?
                    t.offsetTop :
                    this.pageY(t) - this.pageY(t.parentNode);
            }
        }),
        (this.xh5_ADJUST_HIGH_LOW = new(function() {
            var t = function(t) {
                    var e = parseInt(Math.round(100 * t));
                    return e % 100 != 0 &&
                        (e % 10 == 0 && (e *= 0.1), e % 5 != 0 && e % 2 != 0) ?
                        !0 :
                        !1;
                },
                e = function(t, e) {
                    if (e)
                        for (; t > 5;)
                            if (t % 2 == 0) t *= 0.5;
                            else {
                                if (t % 3 != 0) break;
                                t /= 3;
                            }
                    else
                        t > 9 &&
                        (t % 3 == 0 ?
                            (t /= 3) :
                            t % 4 == 0 ?
                            (t *= 0.25) :
                            t % 2 == 0 && (t *= 0.5));
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
                        _ = a ?
                        [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20] :
                        [4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20],
                        T = [1, 2, 3, 4, 5, 6, 8],
                        k = !1,
                        C = T.length,
                        A = 0,
                        D = _.length; D > A; A++
                )
                    for (
                        k = !1, y = _[A], c = (i - n) / y, m = Math.pow(10, 0 - r); !k;

                    ) {
                        for (w = 0; C > w; w++)
                            if (
                                ((h = m * T[w]),
                                    h - c > x &&
                                    (1 & y ?
                                        ((d = Math.round((S + 0.5 * h) / h) * h),
                                            (b = (d + 0.5 * (y - 1) * h).toFixed(5)),
                                            (N = (d - 0.5 * (y + 1) * h).toFixed(5))) :
                                        ((d = Math.round(S / h) * h),
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
        (this.xh5_S_KLC_D = function(compressStr) {
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
                        ((c[l] = fromCharCode(l + 65)),
                            (c[l + 26] = fromCharCode(l + 97)),
                            10 > l && (c[l + 52] = fromCharCode(l + 48)));
                    for (
                        c.push("+", "/"),
                        c = c.join(""),
                        i = compressStr.split(""),
                        n = i.length,
                        l = 0; n > l; l++
                    )
                        i[l] = c.indexOf(i[l]);
                    return (
                        (r = {}),
                        (e = o = 0),
                        (a = {}),
                        (u = w([12, 6])),
                        (s = 63 ^ u[1]), {
                            _1479: T,
                            _136: _,
                            _200: S,
                            _139: k,
                            _197: _mi_run
                        } ["_" + u[0]] ||
                        function() {
                            return [];
                        }
                    );
                },
                fromCharCode = String.fromCharCode,
                b = function(t) {
                    return t === {}._;
                },
                N = function() {
                    var t, e;
                    for (t = y(), e = 1;;) {
                        if (!y()) return e * (2 * t - 1);
                        e++;
                    }
                },
                y = function() {
                    var t;
                    return e >= n ?
                        0 :
                        ((t = i[e] & (1 << o)), o++, o >= 6 && ((o -= 6), e++), !!t);
                },
                w = function(t, r, a) {
                    var s, l, u, c, d;
                    for (
                        l = [], u = 0, r || (r = []), a || (a = []), s = 0; s < t.length; s++
                    )
                        if (((c = t[s]), (u = 0), c)) {
                            if (e >= n) return l;
                            if (t[s] <= 0) u = 0;
                            else if (t[s] <= 30) {
                                for (;
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
                        (o = {
                            d: 1
                        }),
                        y() &&
                        ((a = w([3])[0]),
                            0 == a ?
                            (o.d = w([6])[0]) :
                            1 == a ?
                            ((r.d = w([18])[0]), (o.d = 0)) :
                            (o.d = a)),
                        (l = {
                            day: x(o.d)
                        }),
                        y() && (r.ld += N()),
                        (a = w([3 * r.ld], [1])),
                        (r.cd += a[0]),
                        (l.close = r.cd / r.m),
                        i.push(l),
                        !(e >= n) && (e != n - 1 || 63 & (r.c ^ (t + 1))); t++
                    );
                    return (i[0].prevclose = r.pc), i;
                },
                _ = function() {
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
                        t = 0; 7 > t; t++
                    )
                        r[["la", "lp", "lv", "tv", "rv", "zv", "pp"][t]] = a[t];
                    for (
                        r.m = m.pow(10, r.pp),
                        s >= 1 ?
                        ((a = w([3, 3])), (r.c = a[0]), (a = a[1])) :
                        ((a = 5), (r.c = 2)),
                        r.pc = w([6 * a])[0],
                        h.pc = r.pc / r.m,
                        r.cp = r.pc,
                        r.da = 0,
                        r.sa = r.sv = 0,
                        t = 0; !(e >= n) && (e != n - 1 || 7 & (r.c ^ t)); t++
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
                        (l[d.a] = b(o.a) ?
                            t ?
                            c[t - 1][d.a] :
                            l[d.p] :
                            r.sv ?
                            ((m.floor((r.sa * (2e3 / r.m) + r.sv) / r.sv) >> 1) +
                                r.da) /
                            1e3 :
                            l[d.p] + r.da / 1e3),
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
                        if (
                            ((i = {
                                    c: a[0]
                                }),
                                (n = {}),
                                (i.d = 1),
                                32 & i.c)
                        )
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
                                        0 == o ?
                                        (i.d = w([6])[0]) :
                                        1 == o ?
                                        ((r.d = o = w([18])[0]), (i.d = 0)) :
                                        (i.d = o),
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
                            e = 0; 5 > e; e++
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
                        r.l = 0, n = -1, r.d = w([18])[0] - 1, i = w([18])[0]; r.d < i;

                    )
                        (e = x(1)),
                        0 >= n ?
                        (y() && (r.l += N()),
                            (n = w([3 * r.l], [0])[0] + 1),
                            t || ((t = [e]), n--)) :
                        t.push(e),
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
                        t = 0; t < r.f; t++
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
                    t.getMonth() == e.getMonth() ?
                    t.getDate() == e.getDate() :
                    !1;
            },
            stbdt: function(t, e) {
                return t && e ? t.getTime() == e.getTime() : !1;
            },
            stbs: function(t, e, i, n) {
                return t.getFullYear() == e && t.getMonth() == i ?
                    t.getDate() == n :
                    !1;
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
                return t.getFullYear() == e.getFullYear() ?
                    t.getMonth() == e.getMonth() :
                    !1;
            },
            gy: function(t, e) {
                return t.getFullYear() == e.getFullYear();
            },
            weekname: [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六",
                "日"
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
                    t >= 1e5 ?
                    (e = 0) :
                    t >= 100 && 1e5 > t ?
                    (e = 2) :
                    t > 10 && 99 > t ?
                    (e = 3) :
                    ((10 >= t && t > 0) || (t > -1 && 0 > t)) && (e = 4),
                    e
                );
            },
            trim: function(t) {
                return t.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
            },
            ps: function(t, e) {
                if (((t = Number(t)), isNaN(t))) return "-";
                var i = Math.abs(t);
                return 1e5 > i ?
                    t.toFixed(e) :
                    1e7 > i ?
                    (t / 1e4).toFixed(e) + "万" :
                    1e8 > i ?
                    (t / 1e7).toFixed(e) + "千万" :
                    (t / 1e8).toFixed(e) + "亿";
            },
            nu: function(t) {
                return (
                    (t = Number(t)),
                    (t = Math.abs(t)),
                    1e5 > t || isNaN(t) ?
                    [1, ""] :
                    1e7 > t ?
                    [1e4, "万"] :
                    1e8 > t ?
                    [1e7, "千万"] :
                    [1e8, "亿"]
                );
            },
            vs: function(t, e) {
                var i,
                    n = "";
                return (
                    t > 1e12 ?
                    ((i = (t / 1e12).toFixed(0)), (n = "万亿")) :
                    t > 1e8 ?
                    ((i = (t / 1e8).toFixed(2)), (n = "亿")) :
                    t > 1e5 ?
                    ((i = (t / 1e4).toFixed(2)), (n = "万")) :
                    (i = t >= 1 ? t.toFixed(0) : "-"),
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
                    (this.tradingUs = this.gtr([
                        ["9:30", "16:00"]
                    ])),
                    this.tradingUs
                );
            },
            tradingLSE: [],
            gtlse: function() {
                return (
                    this.tradingLSE.length ||
                    (this.tradingLSE = this.gtr([
                        ["8:00", "16:30"]
                    ])),
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
                return (t = t.toUpperCase()), arrIndexOf(this.gata(t), e) >= 0;
            },
            gltbt: function(t, e, i, n, r, a) {
                for (
                    var o,
                        s = [],
                        l = this.gata(n, a),
                        u = l.length,
                        c = 0,
                        h = 0,
                        d = t * u; d > c; c++
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
                            I = 1; a > I; I++
                    )
                        (o = t[I]),
                        n > 1 && (o.volume /= n),
                        C.gw(t[I - 1].date, o.date) ?
                        (o.high > f && (f = o.high),
                            o.low < p && (p = o.low),
                            (m = o.close),
                            (g += o.volume),
                            (b += o.amount),
                            (v = o.date)) :
                        (isNaN(r) ||
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
                        C.gm(t[I - 1].date, o.date) ?
                        (o.high > y && (y = o.high),
                            o.low < w && (w = o.low),
                            (x = o.close),
                            (S += o.volume),
                            (T += o.amount),
                            (_ = o.date)) :
                        (isNaN(r) ||
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
                        C.gy(t[I - 1].date, o.date) ?
                        (o.high > A && (A = o.high),
                            o.low < D && (D = o.low),
                            (P = o.close),
                            (O += o.volume),
                            (R += o.amount),
                            (M = o.date)) :
                        (c.push({
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
                            void(r.date = C.dd(e.date))
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
                    u == s ?
                    !0 :
                    !1;
            },
            yd: function(t) {
                for (
                    var e = t[t.length - 1].date.getFullYear(), i = [], n = t.length; n-- && t[n].date.getFullYear() == e;

                )
                    i[i.length] = t[n];
                return (
                    i.reverse(),
                    (i[0].prevclose = t[n] ?
                        t[n].prevclose || t[n].close :
                        i[0].prevclose || i[0].close),
                    i
                );
            },
            rd: function(t, e) {
                var i = [],
                    n = C.dd(e);
                n.setFullYear(n.getFullYear() - 5);
                for (var r = t.length; r-- && !(t[r].date < n);) i[i.length] = t[r];
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
                        c = e.length; c--;

                ) {
                    if (((o = e[c].date), 1 > u)) {
                        c = e.length - t.length;
                        for (var h = [], d = t[0]; c-- > 0;) {
                            if (
                                ((a = cloneObject(d) || {}),
                                    (a.isFake = !0),
                                    (a.kke_cs = 0),
                                    n)
                            )
                                for (r in a)
                                    a.hasOwnProperty(r) && isNumber(a[r]) && (a[r] = 0);
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
                                for (r in a)
                                    a.hasOwnProperty(r) && isNumber(a[r]) && (a[r] = 0);
                            t.splice(++f, 0, a), u++;
                            break;
                        }
                        t.splice(f, 1), u--;
                    }
                }
                return u > 0 && t.splice(0, u), t;
            },
            ayd: function(t, e, i, n, r) {
                for (var a, o, s, l, u = C.stbd, c = t.length, h = e.length; h--;)
                    if (((s = e[h]), !(s > r))) {
                        if (n > s && !C.stbd(s, n)) break;
                        for (var d = c--; d-- && ((l = t[d].date), !u(s, l));) {
                            if (s > l) {
                                o = cloneObject(t[d]);
                                var f = o.close;
                                for (a in o)
                                    o.hasOwnProperty(a) && isNumber(o[a]) && (o[a] = 0);
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
        (this.domGc = new(function() {
            var t = u.$C("div");
            return (
                (t.style.display = "none"),
                function(e, i) {
                    if (e) {
                        if (e.hasChildNodes())
                            for (; e.childNodes.length > 0;) e.removeChild(e.firstChild);
                        if (i) return void(e.innerHTML = "");
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
        (this.logoM = new(function() {
            var t =
                "data:image/png;base64,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",
                e = u.$C("img"),
                i = !1,
                n = [],
                r = [],
                a = function() {
                    u.xh5_EvtUtil.addHandler(e, "load", function() {
                            for (i = !0; n.length;) {
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
                                c = r.data.length; c > l; l += 4
                        )
                            0 != r.data[l + 3] &&
                            ((r.data[l] = a), (r.data[l + 1] = o), (r.data[l + 2] = s));
                        n.putImageData(r, 0, 0);
                    }
                },
                s = function(t) {
                    if (u.xh5_BrowserUtil.noH5) return null;
                    if (!i) {
                        for (var a = n.length; a--;)
                            if (n[a].id == t.id) return null;
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
        (this.grabM = new(function() {
            var t = function(t) {
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
                e = function(t, e) {
                    if (u.POST) {
                        var i = e.txt || "",
                            n = e.url || "",
                            r = "_" + Math.floor(1e3 * Math.random());
                        window.open("about:blank", r);
                        var a = u.getSUrl(
                            "http://stock.finance.sina.com.cn/misc/userapi/Pic4Weibo.php"
                        );
                        u.POST(
                            a, {
                                imgData: t,
                                symbol: "imgData"
                            },
                            function(t) {
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
                                    m = o.length; m--;

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
        (this.bridge = new(function() {
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
                    localSL.save(i, r, n);
                },
                h = function(t) {
                    n || i || l.push([t]);
                },
                d = function(item) {
                    var e = item,
                        key = e.key,
                        options = e.options;
                    return localSL.load(key, options);
                },
                f = function(t, e) {
                    return n ? void 0 : i ? void(s[t.uid] = e) : void o.push([t, e]);
                },
                p = function(t, e, i) {
                    var n = d(t);
                    e(n), i || f(t, e);
                },
                m = function(t, e) {
                    t && (c(t), e || h(t));
                },
                g = new(function() {
                    var t = function(t) {
                            if (t && t.type) {
                                var e = t.type;
                                if (-1 != e.indexOf(r)) return e;
                            }
                            return void 0;
                        },
                        e = function() {
                            for (var t; o.length;)(t = o.shift()), p(t[0], t[1]);
                            for (; l.length;)(t = l.shift()), m(t[0]);
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
                    ("Object" === A(i[r]) ?
                        (!t[r] && (t[r] = {}), e(t[r], i[r], n)) :
                        (!n && r in t) || (t[r] = i[r]));
                return t;
            }

            function i(t) {
                var e =
                    "undefined" == typeof getComputedStyle ?
                    t.currentStyle :
                    getComputedStyle(t);
                return e ?
                    ((t.clientWidth ||
                            parseInt10(e.width) ||
                            parseInt10(t.style.width)) -
                        (parseInt10(e.paddingLeft) || 0) -
                        (parseInt10(e.paddingRight) || 0)) |
                    0 :
                    0;
            }

            function n(t) {
                var e =
                    "undefined" == typeof getComputedStyle ?
                    t.currentStyle :
                    getComputedStyle(t);
                return e ?
                    ((t.clientHeight ||
                            parseInt10(e.height) ||
                            parseInt10(t.style.height)) -
                        (parseInt10(e.paddingTop) || 0) -
                        (parseInt10(e.paddingBottom) || 0)) |
                    0 :
                    0;
            }

            function r(t) {
                return t.getBoundingClientRect ?
                    t.getBoundingClientRect() :
                    {
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
                    ?
                    (_(e, "touchstart", n), _(e, "touchmove", r), _(e, "touchend", a)) :
                    (_(e, "mousedown", n),
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
                return t.length && "%" === t.charAt(t.length - 1) ?
                    d((parseFloat(t) / 100) * 255, 0, 255) :
                    d(parseInt(t, 10), 0, 255);
            }

            function m(t) {
                return t.length && "%" === t.charAt(t.length - 1) ?
                    f(parseFloat(t) / 100, 0, 1) :
                    f(parseFloat(t), 0, 1);
            }

            function g(t, e, i) {
                return (
                    0 > i ? (i += 1) : i > 1 && (i -= 1),
                    1 > 6 * i ?
                    t + (e - t) * i * 6 :
                    1 > 2 * i ?
                    e :
                    2 > 3 * i ?
                    t + (e - t) * (2 / 3 - i) * 6 :
                    t
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
                    if (0 === l)(e = 0), (i = 0);
                    else {
                        i = 0.5 > u ? l / (s + o) : l / (2 - s - o);
                        var c = ((s - n) / 6 + l / 2) / l,
                            h = ((s - r) / 6 + l / 2) / l,
                            d = ((s - a) / 6 + l / 2) / l;
                        n === s ?
                            (e = d - h) :
                            r === s ?
                            (e = 1 / 3 + c - d) :
                            a === s && (e = 2 / 3 + h - c),
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
                        return window.addEventListener ?
                            function(t, e, i) {
                                t.addEventListener(e, i);
                            } :
                            function(t, e, i) {
                                t.attachEvent("on" + e, i);
                            };
                    })(),
                    T = (function() {
                        return window.addEventListener ?
                            function(t) {
                                t.stopPropagation();
                            } :
                            function(t) {
                                t.cancelBubble = !0;
                            };
                    })(),
                    k = (function() {
                        return window.addEventListener ?
                            function(t) {
                                t.preventDefault();
                            } :
                            function(t) {
                                t.returnValue = !1;
                            };
                    })(),
                    C = Object.prototype.toString,
                    A = function(t) {
                        return null === t ?
                            "Null" :
                            void 0 === t ?
                            "Undefined" :
                            C.call(t).slice(8, -1);
                    },
                    D = function(t, e) {
                        if (!t) return -1;
                        if (t.indexOf) return t.indexOf(e);
                        for (var i = t.length; i--;)
                            if (t[i] === e) return i;
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
                            (e.NyanDelta = e.wheelDelta ?
                                e.wheelDelta / 120 :
                                -(e.detail || 0) / 3);
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
                            text: "确定",
                            backgroundColor: "#6C6C6C",
                            color: "#FFFEFA",
                            font: "12px Microsoft YaHei",
                            left: 0.65,
                            top: 0.87,
                            width: 0.12,
                            height: 0.1
                        },
                        cancelBtn: {
                            text: "取消",
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
                                a = 0; 1 > a; a += 1 / 6
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
                                s = o.length; s--;

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
                            var e = this.box.childNodes, i = b(t), n = 0, r = i.length; r > n; n++
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
                        for (var e = b(t), i = e.length; i--;) e[i] = (+e[i]).toFixed(0);
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
                                t.targetTouches ?
                                    ((a = t.targetTouches[0].clientX),
                                        (o = t.targetTouches[0].clientY)) :
                                    ((a = t.clientX), (o = t.clientY));
                            }

                            function e(t) {
                                y &&
                                    (t.targetTouches ?
                                        ((s = t.targetTouches[0].clientX - a),
                                            (l = t.targetTouches[0].clientY - o)) :
                                        ((s = t.clientX - a), (l = t.clientY - o)),
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
                                ?
                                (_(c, "touchstart", t),
                                    _(c, "touchmove", e),
                                    _(c, "touchend", i)) :
                                (_(c, "mousedown", t),
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
                                        u.re("ok", [{
                                                rgb: f.getRGB(),
                                                hsl: p.getHSL(),
                                                hex: S(p.getHSL(), "hex")
                                            },
                                            u.target
                                        ]),
                                        u.onok &&
                                        u.onok({
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
(function(n) {
    var a = {};
    function i(e) {
        if (a[e]) {
            return a[e].exports
        }
        var t = a[e] = {
            i: e,
            l: false,
            exports: {}
        };
        n[e].call(t.exports, t, t.exports, i);
        t.l = true;
        return t.exports
    }
    i.m = n;
    i.c = a;
    i.d = function(e, t, n) {
        if (!i.o(e, t)) {
            Object.defineProperty(e, t, {
                enumerable: true,
                get: n
            })
        }
    }
    ;
    i.r = function(e) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            })
        }
        Object.defineProperty(e, "__esModule", {
            value: true
        })
    }
    ;
    i.t = function(t, e) {
        if (e & 1)
            t = i(t);
        if (e & 8)
            return t;
        if (e & 4 && typeof t === "object" && t && t.__esModule)
            return t;
        var n = Object.create(null);
        i.r(n);
        Object.defineProperty(n, "default", {
            enumerable: true,
            value: t
        });
        if (e & 2 && typeof t != "string")
            for (var a in t)
                i.d(n, a, function(e) {
                    return t[e]
                }
                .bind(null, a));
        return n
    }
    ;
    i.n = function(e) {
        var t = e && e.__esModule ? function n() {
            return e["default"]
        }
        : function a() {
            return e
        }
        ;
        i.d(t, "a", t);
        return t
    }
    ;
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ;
    i.p = "";
    return i(i.s = "./jssrc/main.js")
}
)({
    "./config/webconfig.js": function(e, t) {
        e.exports = {
            test: {
                quotepath: function() {
                    return "http://61.129.249.233:18665/"
                },
                getpath: function() {
                    return "http://61.129.249.233:18665/"
                }
            },
            production: {
                quotepath: function() {
                    var e = Math.floor(Math.random() * (99 - 1)) + 1;
                    return "https://" + e + ".push2.eastmoney.com/"
                },
                getpath: function() {
                    var e = Math.floor(Math.random() * (99 - 1)) + 1;
                    return "http://push2.eastmoney.com/"
                }
            },
            getParam: function(e) {
                var t = location.search;
                var n = {};
                if (t != "") {
                    t = t.substring(1, t.length);
                    var a = t.split("&");
                    var i;
                    var r;
                    for (var s = 0; s < a.length; s++) {
                        i = a[s].substring(0, a[s].indexOf("="));
                        r = a[s].substring(a[s].indexOf("=") + 1, a[s].length);
                        n[i] = r
                    }
                }
                if (typeof n[e] != "undefined") {
                    return n[e]
                } else {
                    return null
                }
            },
            getWebPath: function(e) {
                if (this.getParam("env")) {
                    return this[this.getParam("env")][e]()
                }
                return this.production[e]()
            }
        }
    },
    "./jssrc/main.js": function(e, t, i) {
        i("./modules/polyfill/index.js");
        var n = i("./modules/qqsj/index.js");
        n();
        var a = i("./modules/boxsize/index.js");
        a.init();
        var r = i("./modules/user/index.js");
        var s = r.get();
        if (s) {
            $("#loginnick").text(s.nick);
            $("#logoutlink").on("click", function() {
                r.logOut(function() {
                    self.location.reload()
                })
            });
            $("#logind").show()
        } else {
            $("#nologind").show();
            $("#loginlink").attr("href", "https://passport2.eastmoney.com/pub/login?backurl=" + encodeURIComponent(location.href));
            $("#reglink").attr("href", "https://passport2.eastmoney.com/pub/reg?backurl=" + encodeURIComponent(location.href))
        }
        if (window.suggest2017) {
            var o = new suggest2017({
                inputid: "topnavsearch"
            })
        }
        var l = i("./modules/zshq/index.js");
        l();
        var u = i("./modules/kuaixun/index.js");
        kuaixun1 = new u({
            refreshbtn: $("#kx_refresh_t"),
            fontsizebtn: $("#kx_size_t"),
            autobtn: $("#kx_auto_t"),
            autosec: $("#kx_auto_sec_t"),
            kxlist: $("#kx_list_t"),
            kxloading: $("#kx_loading_t"),
            kxtype: "102",
            kxlink: "http://kuaixun.eastmoney.com/"
        });
        kuaixun1.init();
        var d = i("./modules/pkyd/web.js");
        d.bind();
        var f = i("./modules/browser_fingerprint/index.js");
        f.get(function(e) {
            var t = i("./modules/zxg/index.js");
            var n = i("./modules/guba/web.js");
            var a = i("./modules/info/web.js");
            n.init();
            t.init()
        });
        var c = i("./modules/zhuti/web.js");
        c.init();
        var h = i("./modules/zdtj/index.js");
        h.init();
        var p = i("./modules/tixing/index.js");
        $("#tixingtopbtn").click(function() {
            p.showList()
        });
        var m = i("./modules/tixing/addtixing.js");
        m.startTiXingTip();
        var v = i("./modules/zxg/customitem.js");
        v.bindBtn();
        var g = i("./modules/znzg/index.js");
        g.init();
        var x = i("./modules/zxg/batch_edit.js");
        x.init();
        var b = i("./modules/stock_filter/index.js");
        b.init();
        var y = i("./modules/guide/index.js");
        y.init();
        var _ = i("./modules/importcookie/index.js");
        _.bind($("#importcookiezxg"));
        var r = i("./modules/user/index.js");
        (function() {
            if (window.localStorage) {
                if (localStorage.getItem("zktip")) {} else {
                    $("#gubaswitchtip").show();
                    setTimeout(function() {
                        $("#gubaswitchtip").hide()
                    }, 3e4);
                    localStorage.setItem("zktip", "1")
                }
            }
        }
        )()
    },
    "./modules/bid/index.js": function(e, t, n) {
        var a = n("./modules/cookie/index.js");
        e.exports = {
            get: function() {
                var e = a.get("qgqp_b_id");
                if (e == null) {
                    return this.make()
                } else {
                    return e
                }
            },
            make: function() {
                var e = Math.floor(Math.random() * 9 + 1).toString();
                for (var t = 0; t < 19; t++) {
                    e += Math.floor(Math.random() * 9).toString()
                }
                a.set("qgqp_b_id", e, 1e4, ".eastmoney.com");
                return e
            },
            init: function() {
                if (this.get() == null || this.get() == "") {
                    return this.make()
                } else {
                    return this.get()
                }
            }
        }
    },
    "./modules/boxsize/index.js": function(e, t, n) {
        var a = n("./modules/zxg/filltable.js");
        var i = n("./node_modules/lodash/debounce.js");
        var r = n("./modules/zxg/groups.js");
        var s = n("./modules/localstorage/index.js");
        var o = {
            init: function() {
                o.resize();
                o.bind()
            },
            resize: function() {
                var e = $(window).height();
                if (e < 768) {
                    e = 768
                }
                $(".main").height(e - 70);
                $(".mainl").height(e - 70);
                $(".mainr").height(e - 68);
                $(".zbb").height(e - 695);
                o.resizewtable();
                a.resizeFill();
                r.makeGroupHtml()
            },
            wtablefix: 311,
            resizewtable: function() {
                var e = $(window).height();
                if (e < 768) {
                    e = 768
                }
                $(".wl_table").height(e - ($(".gubanews").is(":visible") ? $(".gubanews").height() : -24) - o.wtablefix + ($("#qqsj").is(".qqsj_short") ? 46 : 0))
            },
            bind: function() {
                var t = o;
                $(window).resize(i(function() {
                    t.resize()
                }, 200));
                var e = $(".wlth");
                $("#gubaswitch").add("#gubaswitch2").click(function() {
                    if ($(".gubanews").is(":visible")) {
                        $(".gubanews").hide();
                        $("#gubaswitch").hide();
                        $("#gubaswitch2").show();
                        s.set("bottom_switch", false)
                    } else {
                        $(".gubanews").show();
                        $("#gubaswitch2").hide();
                        $("#gubaswitch").show();
                        s.set("bottom_switch", true)
                    }
                    t.resize()
                });
                $("#gubaswitchtip").click(function() {
                    return false
                });
                $("#guideclose").click(function() {
                    $("#gubaswitchtip").remove();
                    return false
                });
                $("#mainrzkt").add("#mainrzkt2").click(function() {
                    var e = $("#m1440").is(":visible");
                    if ($(".mainr").width() > 0) {
                        $(".mainr").css({
                            width: 0
                        });
                        $(".mainrbody").hide();
                        $("#mainrzkt").hide();
                        $("#mainrzkt2").show();
                        $(".mainl").css({
                            "margin-right": 0
                        });
                        s.set("right_switch", false)
                    } else {
                        $(".mainr").css({
                            width: 400
                        });
                        $(".mainrbody").show();
                        $("#mainrzkt2").hide();
                        $("#mainrzkt").show();
                        if (e) {
                            $(".mainl").css({
                                "margin-right": 400
                            })
                        } else {
                            $(".mainl").css({
                                "margin-right": 0
                            })
                        }
                        s.set("right_switch", true)
                    }
                    t.resize()
                });
                if (s.get("bottom_switch") == "false") {
                    $("#gubaswitch").click()
                }
                if (s.get("right_switch") == "false") {
                    $("#mainrzkt").click()
                }
                if (s.get("right_switch") == null && $(window).width() < 1920) {
                    $(".mainr").css({
                        width: 0
                    });
                    $(".mainrbody").hide();
                    $("#mainrzkt").hide();
                    $("#mainrzkt2").show();
                    $(".mainl").css({
                        "margin-right": 0
                    })
                }
            }
        };
        e.exports = o
    },
    "./modules/browser/index.js": function(e, t) {
        e.exports = {
            isIE6: function() {
                return document.all && !window.XMLHttpRequest
            },
            isIE8: function() {
                return document.all && !document.addEventListener
            }
        }
    },
    "./modules/browser_fingerprint/fingerprint2.js": function(a, i, r) {
        var s, o;
        (function(e, t, n) {
            "use strict";
            if (true) {
                !(s = n,
                o = typeof s === "function" ? s.call(i, r, i, a) : s,
                o !== undefined && (a.exports = o))
            } else {}
        }
        )("Fingerprint2", this, function() {
            "use strict";
            var n = function(e) {
                if (!(this instanceof n)) {
                    return new n(e)
                }
                var t = {
                    swfContainerId: "fingerprintjs2",
                    swfPath: "flash/compiled/FontList.swf",
                    detectScreenOrientation: true,
                    sortPluginsFor: [/palemoon/i],
                    userDefinedFonts: []
                };
                this.options = this.extend(e, t);
                this.nativeForEach = Array.prototype.forEach;
                this.nativeMap = Array.prototype.map
            };
            n.prototype = {
                extend: function(e, t) {
                    if (e == null) {
                        return t
                    }
                    for (var n in e) {
                        if (e[n] != null && t[n] !== e[n]) {
                            t[n] = e[n]
                        }
                    }
                    return t
                },
                get: function(a) {
                    var e = [];
                    e = this.userAgentKey(e);
                    e = this.languageKey(e);
                    e = this.colorDepthKey(e);
                    e = this.pixelRatioKey(e);
                    e = this.hardwareConcurrencyKey(e);
                    e = this.screenResolutionKey(e);
                    e = this.availableScreenResolutionKey(e);
                    e = this.timezoneOffsetKey(e);
                    e = this.sessionStorageKey(e);
                    e = this.localStorageKey(e);
                    e = this.indexedDbKey(e);
                    e = this.addBehaviorKey(e);
                    e = this.openDatabaseKey(e);
                    e = this.cpuClassKey(e);
                    e = this.platformKey(e);
                    e = this.doNotTrackKey(e);
                    e = this.pluginsKey(e);
                    e = this.canvasKey(e);
                    e = this.webglKey(e);
                    e = this.adBlockKey(e);
                    e = this.hasLiedLanguagesKey(e);
                    e = this.hasLiedResolutionKey(e);
                    e = this.hasLiedOsKey(e);
                    e = this.hasLiedBrowserKey(e);
                    e = this.touchSupportKey(e);
                    e = this.customEntropyFunction(e);
                    var i = this;
                    this.fontsKey(e, function(e) {
                        var n = [];
                        i.each(e, function(e) {
                            var t = e.value;
                            if (typeof e.value.join !== "undefined") {
                                t = e.value.join(";")
                            }
                            n.push(t)
                        });
                        var t = i.x64hash128(n.join("~~~"), 31);
                        return a(t, e)
                    })
                },
                customEntropyFunction: function(e) {
                    if (typeof this.options.customFunction === "function") {
                        e.push({
                            key: "custom",
                            value: this.options.customFunction()
                        })
                    }
                    return e
                },
                userAgentKey: function(e) {
                    if (!this.options.excludeUserAgent) {
                        e.push({
                            key: "user_agent",
                            value: this.getUserAgent()
                        })
                    }
                    return e
                },
                getUserAgent: function() {
                    return navigator.userAgent
                },
                languageKey: function(e) {
                    if (!this.options.excludeLanguage) {
                        e.push({
                            key: "language",
                            value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
                        })
                    }
                    return e
                },
                colorDepthKey: function(e) {
                    if (!this.options.excludeColorDepth) {
                        e.push({
                            key: "color_depth",
                            value: screen.colorDepth || -1
                        })
                    }
                    return e
                },
                pixelRatioKey: function(e) {
                    if (!this.options.excludePixelRatio) {
                        e.push({
                            key: "pixel_ratio",
                            value: this.getPixelRatio()
                        })
                    }
                    return e
                },
                getPixelRatio: function() {
                    return window.devicePixelRatio || ""
                },
                screenResolutionKey: function(e) {
                    if (!this.options.excludeScreenResolution) {
                        return this.getScreenResolution(e)
                    }
                    return e
                },
                getScreenResolution: function(e) {
                    var t;
                    if (this.options.detectScreenOrientation) {
                        t = screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height]
                    } else {
                        t = [screen.width, screen.height]
                    }
                    if (typeof t !== "undefined") {
                        e.push({
                            key: "resolution",
                            value: t
                        })
                    }
                    return e
                },
                availableScreenResolutionKey: function(e) {
                    if (!this.options.excludeAvailableScreenResolution) {
                        return this.getAvailableScreenResolution(e)
                    }
                    return e
                },
                getAvailableScreenResolution: function(e) {
                    var t;
                    if (screen.availWidth && screen.availHeight) {
                        if (this.options.detectScreenOrientation) {
                            t = screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight]
                        } else {
                            t = [screen.availHeight, screen.availWidth]
                        }
                    }
                    if (typeof t !== "undefined") {
                        e.push({
                            key: "available_resolution",
                            value: t
                        })
                    }
                    return e
                },
                timezoneOffsetKey: function(e) {
                    if (!this.options.excludeTimezoneOffset) {
                        e.push({
                            key: "timezone_offset",
                            value: (new Date).getTimezoneOffset()
                        })
                    }
                    return e
                },
                sessionStorageKey: function(e) {
                    if (!this.options.excludeSessionStorage && this.hasSessionStorage()) {
                        e.push({
                            key: "session_storage",
                            value: 1
                        })
                    }
                    return e
                },
                localStorageKey: function(e) {
                    if (!this.options.excludeSessionStorage && this.hasLocalStorage()) {
                        e.push({
                            key: "local_storage",
                            value: 1
                        })
                    }
                    return e
                },
                indexedDbKey: function(e) {
                    if (!this.options.excludeIndexedDB && this.hasIndexedDB()) {
                        e.push({
                            key: "indexed_db",
                            value: 1
                        })
                    }
                    return e
                },
                addBehaviorKey: function(e) {
                    if (document.body && !this.options.excludeAddBehavior && document.body.addBehavior) {
                        e.push({
                            key: "add_behavior",
                            value: 1
                        })
                    }
                    return e
                },
                openDatabaseKey: function(e) {
                    if (!this.options.excludeOpenDatabase && window.openDatabase) {
                        e.push({
                            key: "open_database",
                            value: 1
                        })
                    }
                    return e
                },
                cpuClassKey: function(e) {
                    if (!this.options.excludeCpuClass) {
                        e.push({
                            key: "cpu_class",
                            value: this.getNavigatorCpuClass()
                        })
                    }
                    return e
                },
                platformKey: function(e) {
                    if (!this.options.excludePlatform) {
                        e.push({
                            key: "navigator_platform",
                            value: this.getNavigatorPlatform()
                        })
                    }
                    return e
                },
                doNotTrackKey: function(e) {
                    if (!this.options.excludeDoNotTrack) {
                        e.push({
                            key: "do_not_track",
                            value: this.getDoNotTrack()
                        })
                    }
                    return e
                },
                canvasKey: function(e) {
                    if (!this.options.excludeCanvas && this.isCanvasSupported()) {
                        e.push({
                            key: "canvas",
                            value: this.getCanvasFp()
                        })
                    }
                    return e
                },
                webglKey: function(e) {
                    if (this.options.excludeWebGL) {
                        return e
                    }
                    if (!this.isWebGlSupported()) {
                        return e
                    }
                    e.push({
                        key: "webgl",
                        value: this.getWebglFp()
                    });
                    return e
                },
                adBlockKey: function(e) {
                    if (!this.options.excludeAdBlock) {
                        e.push({
                            key: "adblock",
                            value: this.getAdBlock()
                        })
                    }
                    return e
                },
                hasLiedLanguagesKey: function(e) {
                    if (!this.options.excludeHasLiedLanguages) {
                        e.push({
                            key: "has_lied_languages",
                            value: this.getHasLiedLanguages()
                        })
                    }
                    return e
                },
                hasLiedResolutionKey: function(e) {
                    if (!this.options.excludeHasLiedResolution) {
                        e.push({
                            key: "has_lied_resolution",
                            value: this.getHasLiedResolution()
                        })
                    }
                    return e
                },
                hasLiedOsKey: function(e) {
                    if (!this.options.excludeHasLiedOs) {
                        e.push({
                            key: "has_lied_os",
                            value: this.getHasLiedOs()
                        })
                    }
                    return e
                },
                hasLiedBrowserKey: function(e) {
                    if (!this.options.excludeHasLiedBrowser) {
                        e.push({
                            key: "has_lied_browser",
                            value: this.getHasLiedBrowser()
                        })
                    }
                    return e
                },
                fontsKey: function(e, t) {
                    if (this.options.excludeJsFonts) {
                        return this.flashFontsKey(e, t)
                    }
                    return this.jsFontsKey(e, t)
                },
                flashFontsKey: function(t, n) {
                    if (this.options.excludeFlashFonts) {
                        return n(t)
                    }
                    if (!this.hasSwfObjectLoaded()) {
                        return n(t)
                    }
                    if (!this.hasMinFlashInstalled()) {
                        return n(t)
                    }
                    if (typeof this.options.swfPath === "undefined") {
                        return n(t)
                    }
                    this.loadSwfAndDetectFonts(function(e) {
                        t.push({
                            key: "swf_fonts",
                            value: e.join(";")
                        });
                        n(t)
                    })
                },
                jsFontsKey: function(j, w) {
                    var k = this;
                    return setTimeout(function() {
                        var o = ["monospace", "sans-serif", "serif"];
                        var l = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
                        var e = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
                        if (k.options.extendedJsFonts) {
                            l = l.concat(e)
                        }
                        l = l.concat(k.options.userDefinedFonts);
                        var t = "mmmmmmmmmmlli";
                        var n = "72px";
                        var a = document.getElementsByTagName("body")[0];
                        var i = document.createElement("div");
                        var u = document.createElement("div");
                        var r = {};
                        var s = {};
                        var d = function() {
                            var e = document.createElement("span");
                            e.style.position = "absolute";
                            e.style.left = "-9999px";
                            e.style.fontSize = n;
                            e.style.lineHeight = "normal";
                            e.innerHTML = t;
                            return e
                        };
                        var f = function(e, t) {
                            var n = d();
                            n.style.fontFamily = "'" + e + "'," + t;
                            return n
                        };
                        var c = function() {
                            var e = [];
                            for (var t = 0, n = o.length; t < n; t++) {
                                var a = d();
                                a.style.fontFamily = o[t];
                                i.appendChild(a);
                                e.push(a)
                            }
                            return e
                        };
                        var h = function() {
                            var e = {};
                            for (var t = 0, n = l.length; t < n; t++) {
                                var a = [];
                                for (var i = 0, r = o.length; i < r; i++) {
                                    var s = f(l[t], o[i]);
                                    u.appendChild(s);
                                    a.push(s)
                                }
                                e[l[t]] = a
                            }
                            return e
                        };
                        var p = function(e) {
                            var t = false;
                            for (var n = 0; n < o.length; n++) {
                                t = e[n].offsetWidth !== r[o[n]] || e[n].offsetHeight !== s[o[n]];
                                if (t) {
                                    return t
                                }
                            }
                            return t
                        };
                        var m = c();
                        a.appendChild(i);
                        for (var v = 0, g = o.length; v < g; v++) {
                            r[o[v]] = m[v].offsetWidth;
                            s[o[v]] = m[v].offsetHeight
                        }
                        var x = h();
                        a.appendChild(u);
                        var b = [];
                        for (var y = 0, _ = l.length; y < _; y++) {
                            if (p(x[l[y]])) {
                                b.push(l[y])
                            }
                        }
                        a.removeChild(u);
                        a.removeChild(i);
                        j.push({
                            key: "js_fonts",
                            value: b
                        });
                        w(j)
                    }, 1)
                },
                pluginsKey: function(e) {
                    if (!this.options.excludePlugins) {
                        if (this.isIE()) {
                            if (!this.options.excludeIEPlugins) {
                                e.push({
                                    key: "ie_plugins",
                                    value: this.getIEPlugins()
                                })
                            }
                        } else {
                            e.push({
                                key: "regular_plugins",
                                value: this.getRegularPlugins()
                            })
                        }
                    }
                    return e
                },
                getRegularPlugins: function() {
                    var e = [];
                    for (var t = 0, n = navigator.plugins.length; t < n; t++) {
                        e.push(navigator.plugins[t])
                    }
                    if (this.pluginsShouldBeSorted()) {
                        e = e.sort(function(e, t) {
                            if (e.name > t.name) {
                                return 1
                            }
                            if (e.name < t.name) {
                                return -1
                            }
                            return 0
                        })
                    }
                    return this.map(e, function(e) {
                        var t = this.map(e, function(e) {
                            return [e.type, e.suffixes].join("~")
                        }).join(",");
                        return [e.name, e.description, t].join("::")
                    }, this)
                },
                getIEPlugins: function() {
                    var e = [];
                    if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject"in window) {
                        var t = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                        e = this.map(t, function(e) {
                            try {
                                new ActiveXObject(e);
                                return e
                            } catch (t) {
                                return null
                            }
                        })
                    }
                    if (navigator.plugins) {
                        e = e.concat(this.getRegularPlugins())
                    }
                    return e
                },
                pluginsShouldBeSorted: function() {
                    var e = false;
                    for (var t = 0, n = this.options.sortPluginsFor.length; t < n; t++) {
                        var a = this.options.sortPluginsFor[t];
                        if (navigator.userAgent.match(a)) {
                            e = true;
                            break
                        }
                    }
                    return e
                },
                touchSupportKey: function(e) {
                    if (!this.options.excludeTouchSupport) {
                        e.push({
                            key: "touch_support",
                            value: this.getTouchSupport()
                        })
                    }
                    return e
                },
                hardwareConcurrencyKey: function(e) {
                    if (!this.options.excludeHardwareConcurrency) {
                        e.push({
                            key: "hardware_concurrency",
                            value: this.getHardwareConcurrency()
                        })
                    }
                    return e
                },
                hasSessionStorage: function() {
                    try {
                        return !!window.sessionStorage
                    } catch (e) {
                        return true
                    }
                },
                hasLocalStorage: function() {
                    try {
                        return !!window.localStorage
                    } catch (e) {
                        return true
                    }
                },
                hasIndexedDB: function() {
                    try {
                        return !!window.indexedDB
                    } catch (e) {
                        return true
                    }
                },
                getHardwareConcurrency: function() {
                    if (navigator.hardwareConcurrency) {
                        return navigator.hardwareConcurrency
                    }
                    return "unknown"
                },
                getNavigatorCpuClass: function() {
                    if (navigator.cpuClass) {
                        return navigator.cpuClass
                    } else {
                        return "unknown"
                    }
                },
                getNavigatorPlatform: function() {
                    if (navigator.platform) {
                        return navigator.platform
                    } else {
                        return "unknown"
                    }
                },
                getDoNotTrack: function() {
                    if (navigator.doNotTrack) {
                        return navigator.doNotTrack
                    } else if (navigator.msDoNotTrack) {
                        return navigator.msDoNotTrack
                    } else if (window.doNotTrack) {
                        return window.doNotTrack
                    } else {
                        return "unknown"
                    }
                },
                getTouchSupport: function() {
                    var e = 0;
                    var t = false;
                    if (typeof navigator.maxTouchPoints !== "undefined") {
                        e = navigator.maxTouchPoints
                    } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
                        e = navigator.msMaxTouchPoints
                    }
                    try {
                        document.createEvent("TouchEvent");
                        t = true
                    } catch (_) {}
                    var n = "ontouchstart"in window;
                    return [e, t, n]
                },
                getCanvasFp: function() {
                    var e = [];
                    var t = document.createElement("canvas");
                    t.width = 2e3;
                    t.height = 200;
                    t.style.display = "inline";
                    var n = t.getContext("2d");
                    n.rect(0, 0, 10, 10);
                    n.rect(2, 2, 6, 6);
                    e.push("canvas winding:" + (n.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no"));
                    n.textBaseline = "alphabetic";
                    n.fillStyle = "#f60";
                    n.fillRect(125, 1, 62, 20);
                    n.fillStyle = "#069";
                    if (this.options.dontUseFakeFontInCanvas) {
                        n.font = "11pt Arial"
                    } else {
                        n.font = "11pt no-real-font-123"
                    }
                    n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15);
                    n.fillStyle = "rgba(102, 204, 0, 0.2)";
                    n.font = "18pt Arial";
                    n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45);
                    n.globalCompositeOperation = "multiply";
                    n.fillStyle = "rgb(255,0,255)";
                    n.beginPath();
                    n.arc(50, 50, 50, 0, Math.PI * 2, true);
                    n.closePath();
                    n.fill();
                    n.fillStyle = "rgb(0,255,255)";
                    n.beginPath();
                    n.arc(100, 50, 50, 0, Math.PI * 2, true);
                    n.closePath();
                    n.fill();
                    n.fillStyle = "rgb(255,255,0)";
                    n.beginPath();
                    n.arc(75, 100, 50, 0, Math.PI * 2, true);
                    n.closePath();
                    n.fill();
                    n.fillStyle = "rgb(255,0,255)";
                    n.arc(75, 75, 75, 0, Math.PI * 2, true);
                    n.arc(75, 75, 25, 0, Math.PI * 2, true);
                    n.fill("evenodd");
                    e.push("canvas fp:" + t.toDataURL());
                    return e.join("~")
                },
                getWebglFp: function() {
                    var t;
                    var e = function(e) {
                        t.clearColor(0, 0, 0, 1);
                        t.enable(t.DEPTH_TEST);
                        t.depthFunc(t.LEQUAL);
                        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
                        return "[" + e[0] + ", " + e[1] + "]"
                    };
                    var n = function(e) {
                        var t, n = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                        return n ? (t = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT),
                        0 === t && (t = 2),
                        t) : null
                    };
                    t = this.getWebglCanvas();
                    if (!t) {
                        return null
                    }
                    var a = [];
                    var i = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
                    var r = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
                    var s = t.createBuffer();
                    t.bindBuffer(t.ARRAY_BUFFER, s);
                    var o = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                    t.bufferData(t.ARRAY_BUFFER, o, t.STATIC_DRAW);
                    s.itemSize = 3;
                    s.numItems = 3;
                    var l = t.createProgram()
                      , u = t.createShader(t.VERTEX_SHADER);
                    t.shaderSource(u, i);
                    t.compileShader(u);
                    var d = t.createShader(t.FRAGMENT_SHADER);
                    t.shaderSource(d, r);
                    t.compileShader(d);
                    t.attachShader(l, u);
                    t.attachShader(l, d);
                    t.linkProgram(l);
                    t.useProgram(l);
                    l.vertexPosAttrib = t.getAttribLocation(l, "attrVertex");
                    l.offsetUniform = t.getUniformLocation(l, "uniformOffset");
                    t.enableVertexAttribArray(l.vertexPosArray);
                    t.vertexAttribPointer(l.vertexPosAttrib, s.itemSize, t.FLOAT, !1, 0, 0);
                    t.uniform2f(l.offsetUniform, 1, 1);
                    t.drawArrays(t.TRIANGLE_STRIP, 0, s.numItems);
                    if (t.canvas != null) {
                        a.push(t.canvas.toDataURL())
                    }
                    a.push("extensions:" + t.getSupportedExtensions().join(";"));
                    a.push("webgl aliased line width range:" + e(t.getParameter(t.ALIASED_LINE_WIDTH_RANGE)));
                    a.push("webgl aliased point size range:" + e(t.getParameter(t.ALIASED_POINT_SIZE_RANGE)));
                    a.push("webgl alpha bits:" + t.getParameter(t.ALPHA_BITS));
                    a.push("webgl antialiasing:" + (t.getContextAttributes().antialias ? "yes" : "no"));
                    a.push("webgl blue bits:" + t.getParameter(t.BLUE_BITS));
                    a.push("webgl depth bits:" + t.getParameter(t.DEPTH_BITS));
                    a.push("webgl green bits:" + t.getParameter(t.GREEN_BITS));
                    a.push("webgl max anisotropy:" + n(t));
                    a.push("webgl max combined texture image units:" + t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
                    a.push("webgl max cube map texture size:" + t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE));
                    a.push("webgl max fragment uniform vectors:" + t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS));
                    a.push("webgl max render buffer size:" + t.getParameter(t.MAX_RENDERBUFFER_SIZE));
                    a.push("webgl max texture image units:" + t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS));
                    a.push("webgl max texture size:" + t.getParameter(t.MAX_TEXTURE_SIZE));
                    a.push("webgl max varying vectors:" + t.getParameter(t.MAX_VARYING_VECTORS));
                    a.push("webgl max vertex attribs:" + t.getParameter(t.MAX_VERTEX_ATTRIBS));
                    a.push("webgl max vertex texture image units:" + t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
                    a.push("webgl max vertex uniform vectors:" + t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS));
                    a.push("webgl max viewport dims:" + e(t.getParameter(t.MAX_VIEWPORT_DIMS)));
                    a.push("webgl red bits:" + t.getParameter(t.RED_BITS));
                    a.push("webgl renderer:" + t.getParameter(t.RENDERER));
                    a.push("webgl shading language version:" + t.getParameter(t.SHADING_LANGUAGE_VERSION));
                    a.push("webgl stencil bits:" + t.getParameter(t.STENCIL_BITS));
                    a.push("webgl vendor:" + t.getParameter(t.VENDOR));
                    a.push("webgl version:" + t.getParameter(t.VERSION));
                    try {
                        var f = t.getExtension("WEBGL_debug_renderer_info");
                        if (f) {
                            a.push("webgl unmasked vendor:" + t.getParameter(f.UNMASKED_VENDOR_WEBGL));
                            a.push("webgl unmasked renderer:" + t.getParameter(f.UNMASKED_RENDERER_WEBGL))
                        }
                    } catch (c) {}
                    if (!t.getShaderPrecisionFormat) {
                        return a.join("~")
                    }
                    a.push("webgl vertex shader high float precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision);
                    a.push("webgl vertex shader high float precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).rangeMin);
                    a.push("webgl vertex shader high float precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).rangeMax);
                    a.push("webgl vertex shader medium float precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision);
                    a.push("webgl vertex shader medium float precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).rangeMin);
                    a.push("webgl vertex shader medium float precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).rangeMax);
                    a.push("webgl vertex shader low float precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_FLOAT).precision);
                    a.push("webgl vertex shader low float precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_FLOAT).rangeMin);
                    a.push("webgl vertex shader low float precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_FLOAT).rangeMax);
                    a.push("webgl fragment shader high float precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision);
                    a.push("webgl fragment shader high float precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).rangeMin);
                    a.push("webgl fragment shader high float precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).rangeMax);
                    a.push("webgl fragment shader medium float precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision);
                    a.push("webgl fragment shader medium float precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).rangeMin);
                    a.push("webgl fragment shader medium float precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).rangeMax);
                    a.push("webgl fragment shader low float precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_FLOAT).precision);
                    a.push("webgl fragment shader low float precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_FLOAT).rangeMin);
                    a.push("webgl fragment shader low float precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_FLOAT).rangeMax);
                    a.push("webgl vertex shader high int precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_INT).precision);
                    a.push("webgl vertex shader high int precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_INT).rangeMin);
                    a.push("webgl vertex shader high int precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_INT).rangeMax);
                    a.push("webgl vertex shader medium int precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_INT).precision);
                    a.push("webgl vertex shader medium int precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_INT).rangeMin);
                    a.push("webgl vertex shader medium int precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_INT).rangeMax);
                    a.push("webgl vertex shader low int precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_INT).precision);
                    a.push("webgl vertex shader low int precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_INT).rangeMin);
                    a.push("webgl vertex shader low int precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_INT).rangeMax);
                    a.push("webgl fragment shader high int precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_INT).precision);
                    a.push("webgl fragment shader high int precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_INT).rangeMin);
                    a.push("webgl fragment shader high int precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_INT).rangeMax);
                    a.push("webgl fragment shader medium int precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_INT).precision);
                    a.push("webgl fragment shader medium int precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_INT).rangeMin);
                    a.push("webgl fragment shader medium int precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_INT).rangeMax);
                    a.push("webgl fragment shader low int precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_INT).precision);
                    a.push("webgl fragment shader low int precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_INT).rangeMin);
                    a.push("webgl fragment shader low int precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_INT).rangeMax);
                    return a.join("~")
                },
                getAdBlock: function() {
                    var e = document.createElement("div");
                    e.innerHTML = "&nbsp;";
                    e.className = "adsbox";
                    var t = false;
                    try {
                        document.body.appendChild(e);
                        t = document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
                        document.body.removeChild(e)
                    } catch (n) {
                        t = false
                    }
                    return t
                },
                getHasLiedLanguages: function() {
                    if (typeof navigator.languages !== "undefined") {
                        try {
                            var e = navigator.languages[0].substr(0, 2);
                            if (e !== navigator.language.substr(0, 2)) {
                                return true
                            }
                        } catch (t) {
                            return true
                        }
                    }
                    return false
                },
                getHasLiedResolution: function() {
                    if (screen.width < screen.availWidth) {
                        return true
                    }
                    if (screen.height < screen.availHeight) {
                        return true
                    }
                    return false
                },
                getHasLiedOs: function() {
                    var e = navigator.userAgent.toLowerCase();
                    var t = navigator.oscpu;
                    var n = navigator.platform.toLowerCase();
                    var a;
                    if (e.indexOf("windows phone") >= 0) {
                        a = "Windows Phone"
                    } else if (e.indexOf("win") >= 0) {
                        a = "Windows"
                    } else if (e.indexOf("android") >= 0) {
                        a = "Android"
                    } else if (e.indexOf("linux") >= 0) {
                        a = "Linux"
                    } else if (e.indexOf("iphone") >= 0 || e.indexOf("ipad") >= 0) {
                        a = "iOS"
                    } else if (e.indexOf("mac") >= 0) {
                        a = "Mac"
                    } else {
                        a = "Other"
                    }
                    var i;
                    if ("ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
                        i = true
                    } else {
                        i = false
                    }
                    if (i && a !== "Windows Phone" && a !== "Android" && a !== "iOS" && a !== "Other") {
                        return true
                    }
                    if (typeof t !== "undefined") {
                        t = t.toLowerCase();
                        if (t.indexOf("win") >= 0 && a !== "Windows" && a !== "Windows Phone") {
                            return true
                        } else if (t.indexOf("linux") >= 0 && a !== "Linux" && a !== "Android") {
                            return true
                        } else if (t.indexOf("mac") >= 0 && a !== "Mac" && a !== "iOS") {
                            return true
                        } else if (t.indexOf("win") === 0 && t.indexOf("linux") === 0 && t.indexOf("mac") >= 0 && a !== "other") {
                            return true
                        }
                    }
                    if (n.indexOf("win") >= 0 && a !== "Windows" && a !== "Windows Phone") {
                        return true
                    } else if ((n.indexOf("linux") >= 0 || n.indexOf("android") >= 0 || n.indexOf("pike") >= 0) && a !== "Linux" && a !== "Android") {
                        return true
                    } else if ((n.indexOf("mac") >= 0 || n.indexOf("ipad") >= 0 || n.indexOf("ipod") >= 0 || n.indexOf("iphone") >= 0) && a !== "Mac" && a !== "iOS") {
                        return true
                    } else if (n.indexOf("win") === 0 && n.indexOf("linux") === 0 && n.indexOf("mac") >= 0 && a !== "other") {
                        return true
                    }
                    if (typeof navigator.plugins === "undefined" && a !== "Windows" && a !== "Windows Phone") {
                        return true
                    }
                    return false
                },
                getHasLiedBrowser: function() {
                    var e = navigator.userAgent.toLowerCase();
                    var t = navigator.productSub;
                    var n;
                    if (e.indexOf("firefox") >= 0) {
                        n = "Firefox"
                    } else if (e.indexOf("opera") >= 0 || e.indexOf("opr") >= 0) {
                        n = "Opera"
                    } else if (e.indexOf("chrome") >= 0) {
                        n = "Chrome"
                    } else if (e.indexOf("safari") >= 0) {
                        n = "Safari"
                    } else if (e.indexOf("trident") >= 0) {
                        n = "Internet Explorer"
                    } else {
                        n = "Other"
                    }
                    if ((n === "Chrome" || n === "Safari" || n === "Opera") && t !== "20030107") {
                        return true
                    }
                    var a = eval.toString().length;
                    if (a === 37 && n !== "Safari" && n !== "Firefox" && n !== "Other") {
                        return true
                    } else if (a === 39 && n !== "Internet Explorer" && n !== "Other") {
                        return true
                    } else if (a === 33 && n !== "Chrome" && n !== "Opera" && n !== "Other") {
                        return true
                    }
                    var i;
                    try {
                        throw "a"
                    } catch (r) {
                        try {
                            r.toSource();
                            i = true
                        } catch (s) {
                            i = false
                        }
                    }
                    if (i && n !== "Firefox" && n !== "Other") {
                        return true
                    }
                    return false
                },
                isCanvasSupported: function() {
                    var e = document.createElement("canvas");
                    return !!(e.getContext && e.getContext("2d"))
                },
                isWebGlSupported: function() {
                    if (!this.isCanvasSupported()) {
                        return false
                    }
                    var e = document.createElement("canvas"), t;
                    try {
                        t = e.getContext && (e.getContext("webgl") || e.getContext("experimental-webgl"))
                    } catch (n) {
                        t = false
                    }
                    return !!window.WebGLRenderingContext && !!t
                },
                isIE: function() {
                    if (navigator.appName === "Microsoft Internet Explorer") {
                        return true
                    } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
                        return true
                    }
                    return false
                },
                hasSwfObjectLoaded: function() {
                    return typeof window.swfobject !== "undefined"
                },
                hasMinFlashInstalled: function() {
                    return swfobject.hasFlashPlayerVersion("9.0.0")
                },
                addFlashDivNode: function() {
                    var e = document.createElement("div");
                    e.setAttribute("id", this.options.swfContainerId);
                    document.body.appendChild(e)
                },
                loadSwfAndDetectFonts: function(t) {
                    var e = "___fp_swf_loaded";
                    window[e] = function(e) {
                        t(e)
                    }
                    ;
                    var n = this.options.swfContainerId;
                    this.addFlashDivNode();
                    var a = {
                        onReady: e
                    };
                    var i = {
                        allowScriptAccess: "always",
                        menu: "false"
                    };
                    swfobject.embedSWF(this.options.swfPath, n, "1", "1", "9.0.0", false, a, i, {})
                },
                getWebglCanvas: function() {
                    var e = document.createElement("canvas");
                    var t = null;
                    try {
                        t = e.getContext("webgl") || e.getContext("experimental-webgl")
                    } catch (n) {}
                    if (!t) {
                        t = null
                    }
                    return t
                },
                each: function(e, t, n) {
                    if (e === null) {
                        return
                    }
                    if (this.nativeForEach && e.forEach === this.nativeForEach) {
                        e.forEach(t, n)
                    } else if (e.length === +e.length) {
                        for (var a = 0, i = e.length; a < i; a++) {
                            if (t.call(n, e[a], a, e) === {}) {
                                return
                            }
                        }
                    } else {
                        for (var r in e) {
                            if (e.hasOwnProperty(r)) {
                                if (t.call(n, e[r], r, e) === {}) {
                                    return
                                }
                            }
                        }
                    }
                },
                map: function(e, a, i) {
                    var r = [];
                    if (e == null) {
                        return r
                    }
                    if (this.nativeMap && e.map === this.nativeMap) {
                        return e.map(a, i)
                    }
                    this.each(e, function(e, t, n) {
                        r[r.length] = a.call(i, e, t, n)
                    });
                    return r
                },
                x64Add: function(e, t) {
                    e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
                    t = [t[0] >>> 16, t[0] & 65535, t[1] >>> 16, t[1] & 65535];
                    var n = [0, 0, 0, 0];
                    n[3] += e[3] + t[3];
                    n[2] += n[3] >>> 16;
                    n[3] &= 65535;
                    n[2] += e[2] + t[2];
                    n[1] += n[2] >>> 16;
                    n[2] &= 65535;
                    n[1] += e[1] + t[1];
                    n[0] += n[1] >>> 16;
                    n[1] &= 65535;
                    n[0] += e[0] + t[0];
                    n[0] &= 65535;
                    return [n[0] << 16 | n[1], n[2] << 16 | n[3]]
                },
                x64Multiply: function(e, t) {
                    e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
                    t = [t[0] >>> 16, t[0] & 65535, t[1] >>> 16, t[1] & 65535];
                    var n = [0, 0, 0, 0];
                    n[3] += e[3] * t[3];
                    n[2] += n[3] >>> 16;
                    n[3] &= 65535;
                    n[2] += e[2] * t[3];
                    n[1] += n[2] >>> 16;
                    n[2] &= 65535;
                    n[2] += e[3] * t[2];
                    n[1] += n[2] >>> 16;
                    n[2] &= 65535;
                    n[1] += e[1] * t[3];
                    n[0] += n[1] >>> 16;
                    n[1] &= 65535;
                    n[1] += e[2] * t[2];
                    n[0] += n[1] >>> 16;
                    n[1] &= 65535;
                    n[1] += e[3] * t[1];
                    n[0] += n[1] >>> 16;
                    n[1] &= 65535;
                    n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0];
                    n[0] &= 65535;
                    return [n[0] << 16 | n[1], n[2] << 16 | n[3]]
                },
                x64Rotl: function(e, t) {
                    t %= 64;
                    if (t === 32) {
                        return [e[1], e[0]]
                    } else if (t < 32) {
                        return [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t]
                    } else {
                        t -= 32;
                        return [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]
                    }
                },
                x64LeftShift: function(e, t) {
                    t %= 64;
                    if (t === 0) {
                        return e
                    } else if (t < 32) {
                        return [e[0] << t | e[1] >>> 32 - t, e[1] << t]
                    } else {
                        return [e[1] << t - 32, 0]
                    }
                },
                x64Xor: function(e, t) {
                    return [e[0] ^ t[0], e[1] ^ t[1]]
                },
                x64Fmix: function(e) {
                    e = this.x64Xor(e, [0, e[0] >>> 1]);
                    e = this.x64Multiply(e, [4283543511, 3981806797]);
                    e = this.x64Xor(e, [0, e[0] >>> 1]);
                    e = this.x64Multiply(e, [3301882366, 444984403]);
                    e = this.x64Xor(e, [0, e[0] >>> 1]);
                    return e
                },
                x64hash128: function(e, t) {
                    e = e || "";
                    t = t || 0;
                    var n = e.length % 16;
                    var a = e.length - n;
                    var i = [0, t];
                    var r = [0, t];
                    var s = [0, 0];
                    var o = [0, 0];
                    var l = [2277735313, 289559509];
                    var u = [1291169091, 658871167];
                    for (var d = 0; d < a; d = d + 16) {
                        s = [e.charCodeAt(d + 4) & 255 | (e.charCodeAt(d + 5) & 255) << 8 | (e.charCodeAt(d + 6) & 255) << 16 | (e.charCodeAt(d + 7) & 255) << 24, e.charCodeAt(d) & 255 | (e.charCodeAt(d + 1) & 255) << 8 | (e.charCodeAt(d + 2) & 255) << 16 | (e.charCodeAt(d + 3) & 255) << 24];
                        o = [e.charCodeAt(d + 12) & 255 | (e.charCodeAt(d + 13) & 255) << 8 | (e.charCodeAt(d + 14) & 255) << 16 | (e.charCodeAt(d + 15) & 255) << 24, e.charCodeAt(d + 8) & 255 | (e.charCodeAt(d + 9) & 255) << 8 | (e.charCodeAt(d + 10) & 255) << 16 | (e.charCodeAt(d + 11) & 255) << 24];
                        s = this.x64Multiply(s, l);
                        s = this.x64Rotl(s, 31);
                        s = this.x64Multiply(s, u);
                        i = this.x64Xor(i, s);
                        i = this.x64Rotl(i, 27);
                        i = this.x64Add(i, r);
                        i = this.x64Add(this.x64Multiply(i, [0, 5]), [0, 1390208809]);
                        o = this.x64Multiply(o, u);
                        o = this.x64Rotl(o, 33);
                        o = this.x64Multiply(o, l);
                        r = this.x64Xor(r, o);
                        r = this.x64Rotl(r, 31);
                        r = this.x64Add(r, i);
                        r = this.x64Add(this.x64Multiply(r, [0, 5]), [0, 944331445])
                    }
                    s = [0, 0];
                    o = [0, 0];
                    switch (n) {
                    case 15:
                        o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(d + 14)], 48));
                    case 14:
                        o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(d + 13)], 40));
                    case 13:
                        o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(d + 12)], 32));
                    case 12:
                        o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(d + 11)], 24));
                    case 11:
                        o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(d + 10)], 16));
                    case 10:
                        o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(d + 9)], 8));
                    case 9:
                        o = this.x64Xor(o, [0, e.charCodeAt(d + 8)]);
                        o = this.x64Multiply(o, u);
                        o = this.x64Rotl(o, 33);
                        o = this.x64Multiply(o, l);
                        r = this.x64Xor(r, o);
                    case 8:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 7)], 56));
                    case 7:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 6)], 48));
                    case 6:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 5)], 40));
                    case 5:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 4)], 32));
                    case 4:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 3)], 24));
                    case 3:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 2)], 16));
                    case 2:
                        s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(d + 1)], 8));
                    case 1:
                        s = this.x64Xor(s, [0, e.charCodeAt(d)]);
                        s = this.x64Multiply(s, l);
                        s = this.x64Rotl(s, 31);
                        s = this.x64Multiply(s, u);
                        i = this.x64Xor(i, s)
                    }
                    i = this.x64Xor(i, [0, e.length]);
                    r = this.x64Xor(r, [0, e.length]);
                    i = this.x64Add(i, r);
                    r = this.x64Add(r, i);
                    i = this.x64Fmix(i);
                    r = this.x64Fmix(r);
                    i = this.x64Add(i, r);
                    r = this.x64Add(r, i);
                    return ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8)
                }
            };
            n.VERSION = "1.5.1";
            return n
        })
    },
    "./modules/browser_fingerprint/index.js": function(e, t, n) {
        var a = n("./modules/browser_fingerprint/fingerprint2.js");
        var i = n("./modules/bid/index.js");
        var r = n("./modules/browser_fingerprint/save.js");
        function s() {
            var e = document.createElement("canvas");
            return !!(e.getContext && e.getContext("2d"))
        }
        e.exports = {
            get: function(n) {
                if (s()) {
                    new a({
                        dontUseFakeFontInCanvas: true,
                        swfContainerId: true,
                        swfPath: true,
                        excludeUserAgent: true,
                        excludeScreenResolution: true,
                        excludeAvailableScreenResolution: true,
                        excludeAdBlock: true,
                        excludeFlashFonts: true,
                        excludePlugins: true,
                        excludeIEPlugins: true
                    }).get(function(e, t) {
                        r(e);
                        n(e, t);
                        return
                    })
                } else {
                    n(i.init());
                    return
                }
            }
        }
    },
    "./modules/browser_fingerprint/save.js": function(e, t, n) {
        var a = n("./modules/cookie/index.js");
        e.exports = function(e) {
            if (e) {
                a.set("qgqp_b_id", e, 1e4, ".eastmoney.com")
            }
        }
    },
    "./modules/cookie/index.js": function(e, t) {
        var n = {
            get: function(e) {
                var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                if (t != null)
                    return decodeURIComponent(t[2]);
                return null
            },
            set: function(e, t, n, a) {
                var i = e + "=" + escape(t);
                if (n != undefined) {
                    var r = new Date;
                    r.setDate(r.getDate() + n);
                    i += ";expires=" + r.toGMTString()
                }
                if (a != undefined) {
                    i += ";domain=" + a
                }
                i += ";path=/";
                document.cookie = i
            },
            del: function(e, t) {
                var n = new Date((new Date).getTime() - 1);
                if (t) {
                    document.cookie = e + "=;path=/;expires=" + n.toGMTString() + ";domain=" + t
                } else {
                    document.cookie = e + "=;path=/;expires=" + n.toGMTString()
                }
            }
        };
        e.exports = n
    },
    "./modules/datacache/index.js": function(e, t) {
        e.exports = {
            thisgroupid: null,
            groupdata: null,
            changeGroup: null,
            stocks: null,
            thisshowtype: null,
            changeShowType: null,
            stocktype: null,
            notedata: null,
            ylycdata: null,
            ylyc_year: null,
            pxtype: null,
            pxorder: null,
            forbid_sort: false,
            firstgroupid: null,
            topgroupid: null,
            top_stocks: null,
            is_defaultgroup: null,
            refreshtime: 2e3,
            ishaiwai: false
        }
    },
    "./modules/datadiff/index.js": function(e, t) {
        e.exports = function(i, r) {
            var s = [];
            Object.keys(r).forEach(function(e) {
                var t = r[e];
                var n = i[e];
                var a = {
                    index: e,
                    code: n.f13 + "." + n.f12,
                    change: false,
                    fullchange: false,
                    changedata: {}
                };
                if (t.f12 != n.f12 || t.f13 != n.f13) {
                    a.change = true;
                    a.fullchange = true;
                    a.changedata = t;
                    s.push(a);
                    return false
                }
                Object.keys(t).forEach(function(e) {
                    if (t[e] != n[e]) {
                        a.changedata[e] = t[e];
                        a.change = true
                    }
                });
                s.push(a)
            });
            return s
        }
    },
    "./modules/datetime/index.js": function(e, t, n) {
        var a = n("./node_modules/dateformat/lib/dateformat.js");
        var i = {
            dcdatestr: "yyyy-MM-dd hh:mm:ss",
            strToDate: function(e) {
                e = e.replace(/-/gi, "/");
                e = e.replace(/T/gi, " ");
                return new Date(e.substring(0, 19))
            },
            strToDayOrTime: function(e) {
                var t = i.strToDate(e);
                var n = new Date;
                if (t.getFullYear() == n.getFullYear() && t.getMonth() == n.getMonth() && t.getDate() == n.getDate()) {
                    return a(t, "HH:MM")
                } else {
                    return a(t, "mm-dd")
                }
            }
        };
        e.exports = i
    },
    "./modules/dom/index.js": function(e, t) {
        e.exports = {
            cursorMoveEnd: function(e) {
                e.focus();
                var t = e.value.length;
                if (document.selection) {
                    var n = e.createTextRange();
                    n.moveStart("character", t);
                    n.collapse();
                    n.select()
                } else if (typeof e.selectionStart == "number" && typeof e.selectionEnd == "number") {
                    e.selectionStart = e.selectionEnd = t
                }
            }
        }
    },
    "./modules/global_event/index.js": function(e, t) {
        e.exports = {
            eventpool: {},
            regEvent: function(e, t) {
                if (!this.eventpool.event_name) {
                    this.eventpool.event_name = []
                }
                this.eventpool.event_name.push(t)
            },
            delEvent: function(e, t) {
                try {
                    this.eventpool.event_name = this.eventpool.event_name.filter(function(e) {
                        return e != t
                    })
                } catch (n) {}
            },
            trigger: function(e, t) {
                try {
                    this.eventpool.event_name.forEach(function(e) {
                        e(t)
                    })
                } catch (n) {}
            }
        }
    },
    "./modules/guba/web.js": function(e, t, n) {
        var r = "";
        var a = n("./modules/global_event/index.js");
        var i = n("./modules/datetime/index.js");
        var s = n("./node_modules/lodash/debounce.js");
        var o = $("#gubanews");
        var l = n("./modules/localstorage/index.js");
        var u;
        u = {
            thistype: "normal",
            thisindex: 1,
            allowload: true,
            init: function(e) {
                this.bind();
                a.regEvent("stockchange", function(e) {
                    u.changeStocks(e);
                    u.get(1)
                })
            },
            changeStocks: function(e) {
                r = this.dealstocks(e)
            },
            getLocalData: function() {
                var e = this;
                if (l.get("gubatype")) {
                    if (l.get("gubatype") == "time") {
                        e.thistype = "normal"
                    } else if (l.get("gubatype") == "hot") {
                        e.thistype = "hot"
                    }
                }
            },
            data: null,
            removeSame: function(e) {
                var t = {};
                e.forEach(function(e) {
                    t[e.id] = e
                });
                return Object.keys(t).reverse().map(function(e) {
                    return t[e]
                })
            },
            removeSame2: function(e, t) {
                var n = {};
                e.forEach(function(e) {
                    n[e.id] = e
                });
                var a = {};
                t.forEach(function(e) {
                    if (n[e.id] == undefined) {
                        a[e.id] = e
                    }
                });
                return Object.keys(a).map(function(e) {
                    return a[e]
                })
            },
            dealstocks: function(e) {
                var t = [];
                e.forEach(function(e) {
                    if (e.indexOf("0.") == 0 || e.indexOf("1.") == 0) {
                        t.push(e.substring(2))
                    } else if (e.indexOf("105.") == 0 || e.indexOf("106.") == 0 || e.indexOf("107.") == 0) {
                        t.push("us" + e.substring(4))
                    } else if (e.indexOf("116.") == 0) {
                        t.push("hk" + e.substring(4))
                    }
                });
                return t.join(",").toLocaleLowerCase()
            },
            bind: function() {
                isbind = true;
                var t = this;
                $("#chooseguba").on("click", "a", function() {
                    var e = $(this).data("type");
                    l.set("gubatype", e);
                    if (e == "time") {
                        t.thistype = "normal";
                        t.thisindex = 1;
                        t.get(1)
                    } else if (e == "hot") {
                        t.thistype = "hot";
                        t.thisindex = 1;
                        t.get(1)
                    }
                });
                $("#refreshguba").click(function() {
                    $("#refreshguba .refreshgubat").text("加载中...");
                    t.get(1).then(function() {
                        $("#refreshguba .refreshgubat").text("刷新")
                    });
                    return false
                });
                setInterval(function() {
                    t.get(1)
                }, 60 * 1e3);
                o.on("scroll", s(function() {
                    if (o.scrollTop() + o.height() >= o.get(0).scrollHeight) {
                        t.loadMore()
                    }
                }, 100))
            },
            loadMore: function() {
                if (!this.allowload) {
                    return false
                }
                this.allowload = false;
                if (this.thisindex == 1) {
                    this.thisindex = 3
                } else {
                    this.thisindex++
                }
                if (this.thisindex > 5) {
                    return false
                }
                this.get(this.thisindex)
            },
            makeHTML: function(e) {
                if (e.length == 0) {
                    return '<div class="infonod">暂无相关内容</div>'
                }
                var n = [];
                e.forEach(function(e) {
                    var t = "";
                    if (e.market == 106) {
                        t = '<span class="hkstock">HK</span>'
                    } else if (e.market == 103 || e.market == 104 || e.market == 105) {
                        t = '<span class="usstock">US</span>'
                    } else if (e.market == 155 || e.market == 156) {
                        t == '<span class="ukstock">UK</span>'
                    }
                    n.push('<li>[<a href="http://guba.eastmoney.com/list,' + e.code + '.html">' + e.name + "</a>] " + t + ' <a href="http://guba.eastmoney.com/news,' + e.code + "," + e.id + '.html" title="' + e.title + '">' + e.title + '</a><span class="time">' + i.strToDayOrTime(e.time) + "</span></li>")
                });
                return n.join("")
            },
            get: function(t) {
                this.getLocalData();
                this.thisindex = t;
                var n = this;
                if (r == "") {
                    o.html('<div class="infonod">暂无相关内容</div>');
                    $("#chooseguba a").removeClass("on");
                    $("#chooseguba a:last").addClass("on");
                    return false
                }
                $(".infonod", o).remove();
                o.append('<li class="gubamoreli">加载中...</li>');
                var e = 10;
                var a = t;
                if (a == 1) {
                    e = 20
                } else {
                    e = 10
                }
                var i = "./api/guba/hotarticle";
                if (this.thistype == "normal") {
                    i = "./api/guba/article"
                }
                return $.ajax({
                    url: i,
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: r,
                        pageindex: a,
                        pagesize: e
                    }
                }).done(function(e) {
                    if (e.re) {
                        e.result = n.removeSame(e.result);
                        if (n.thisindex == 1) {
                            o.html(n.makeHTML(e.result));
                            n.data = e.result;
                            this.data = e.result
                        } else {
                            e.result = n.removeSame2(n.data, e.result);
                            n.data = n.data.concat(e.result);
                            o.append(n.makeHTML(e.result))
                        }
                        if (t == 1) {
                            o.scrollTop(0)
                        }
                        $(".chooseguba").removeClass("on");
                        if (n.thistype == "hot") {
                            $(".chooseguba:last").addClass("on")
                        } else {
                            $(".chooseguba:first").addClass("on")
                        }
                    }
                }).fail(function(e) {}).always(function() {
                    $(".gubamoreli", o).remove();
                    n.allowload = true
                })
            },
            getHot: function(e) {
                this.thistype = "hot";
                this.thisindex = e;
                var t = this;
                if (r == "") {
                    t.makeHTML([]);
                    $("#chooseguba a").removeClass("on");
                    $("#chooseguba a:last").addClass("on");
                    return false
                }
                var n = 10;
                if (e == 1) {
                    n = 20
                } else {
                    e++;
                    n = 10
                }
                $.ajax({
                    url: "./api/guba/hotarticle",
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: r,
                        pageindex: e,
                        pagesize: n
                    }
                }).done(function(e) {
                    if (e.re) {
                        t.makeHTML(e.result);
                        $("#chooseguba a").removeClass("on");
                        $("#chooseguba a:last").addClass("on")
                    }
                }).fail(function(e) {})
            },
            getNormal: function(e) {
                this.thistype = "normal";
                this.thisindex = e;
                var t = this;
                if (r == "") {
                    t.makeHTML([]);
                    $("#chooseguba a").removeClass("on");
                    $("#chooseguba a:first").addClass("on");
                    return false
                }
                var n = 10;
                if (e == 1) {
                    n = 20
                } else {
                    e++;
                    n = 10
                }
                $.ajax({
                    url: "./api/guba/article",
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: r,
                        pageindex: e,
                        pagesize: n
                    }
                }).done(function(e) {
                    if (e.re) {
                        t.makeHTML(e.result);
                        $("#chooseguba a").removeClass("on");
                        $("#chooseguba a:first").addClass("on")
                    }
                }).fail(function(e) {})
            }
        };
        e.exports = u
    },
    "./modules/guide/guide.html": function(e, t) {
        e.exports = '<div class="mguide">\r\n  <div class="mguideclose"><img src="./images/guide2/close.png" alt=""></div>\r\n  <div class="mguidep" id="mguidep1"><img src="./images/guide2/p1.png" alt=""></div>\r\n  <div class="mguidep" id="mguidep2"><img src="./images/guide2/p2.png" alt=""></div>\r\n  <div class="mguidep" id="mguidep3"><img src="./images/guide2/p3.png" alt=""></div>\r\n  <div class="mguidep" id="mguidep4"><img src="./images/guide2/p4.png" alt=""></div>\r\n  <div class="mguidep" id="mguidep5"><img src="./images/guide2/p5.png" alt=""></div>\r\n</div>'
    },
    "./modules/guide/index.js": function(e, t, n) {
        var a = n("./modules/guide/guide.html");
        e.exports = {
            init: function() {
                if (window.localStorage && (new Date).getTime() < 15566688e5) {
                    if (localStorage.getItem("showguide2")) {} else {
                        localStorage.setItem("showguide2", "1");
                        this.show();
                        return false
                    }
                }
            },
            show: function() {
                var t = this;
                var e = this.html = $(a);
                var n = $("#mguidep1 img", e);
                $("body").append(e);
                n.on("load", function() {
                    t.cdStart()
                });
                $(".mguideclose", e).click(function() {
                    t.html.remove();
                    try {
                        clearInterval(t.cd)
                    } catch (e) {}
                    return false
                })
            },
            thisindex: 0,
            cdStart: function() {
                var e = this;
                this.cd = setInterval(function() {
                    e.thisindex++;
                    if (e.thisindex == 5) {
                        e.html.remove();
                        clearInterval(e.cd);
                        return false
                    }
                    $(".mguidep", e.html).hide();
                    $(".mguidep", e.html).eq(e.thisindex).show()
                }, 5e3)
            }
        }
    },
    "./modules/hegui/index.js": function(e, t, n) {
        var a = n("./modules/cookie/index.js");
        var i = n("./modules/modal/alert.js");
        var r = n("./modules/datacache/index.js");
        var s = n("./modules/user/index.js");
        var o = s.get() != null ? true : false;
        e.exports = {
            isOutside: function() {
                return new Promise(function(t, e) {
                    var n = a.get("isoutside");
                    if (n != null) {
                        if (n == "1") {
                            r.ishaiwai = true;
                            t(true)
                        } else {
                            r.ishaiwai = false;
                            t(false)
                        }
                    } else {
                        $.ajax({
                            url: "http://push2.eastmoney.com/api/qt/stock/get?cb=?",
                            type: "GET",
                            dataType: "jsonp"
                        }).then(function(e) {
                            console.info(e);
                            if (e.lt && e.lt == 2) {
                                a.set("isoutside", "1", 1);
                                r.ishaiwai = true;
                                t(true)
                            } else {
                                a.set("isoutside", "0", 1);
                                r.ishaiwai = false;
                                t(false)
                            }
                        })
                    }
                }
                )
            },
            outsiderAlert: function() {
                if (a.get("outsideralert") == null) {
                    a.set("outsideralert", "1");
                    i('<div style="width:400px">应港交所要求，港股Level2行情仅对大陆地区登录用户限时开放，大陆地区以外用户只可免费访问港股的BMP行情，您的港股自选股行情已做延时15分钟处理。给您带来的不便敬请谅解。</div>')
                }
            },
            dealHKStock: function(e) {
                if (e instanceof Array) {
                    return e.map(function(e) {
                        return e.replace("116.", "128.")
                    })
                }
                if (typeof e == "string") {
                    return e.replace(/116\./g, "128.")
                }
                return e
            },
            isHKDelay: function() {
                if (r.ishaiwai) {
                    return 1
                }
                if (!o) {
                    return 2
                }
                return 0
            }
        }
    },
    "./modules/importcookie/index.js": function(e, t, n) {
        var a = n("./modules/cookie/index.js");
        var s = n("./modules/modal/alert.js");
        var o = n("./modules/modal/confirm.js");
        var l = n("./modules/datacache/index.js");
        e.exports = {
            getzxg: function() {
                var e = a.get("emhq_stock");
                if (e != null && e != "") {
                    return decodeURIComponent(e).split(",")
                } else {
                    return []
                }
            },
            fxzxg: function(e, t) {
                var n = l.stocks;
                var a = this.dealstocks(e);
                var i = {};
                n.forEach(function(e) {
                    i[e] = 1
                });
                var r = 0;
                a.forEach(function(e) {
                    if (i[e] == undefined) {
                        r++
                    }
                });
                if (r == 0) {
                    return {
                        re: false,
                        message: "您暂无新的自选股可导入"
                    }
                }
                if (n.length > 500) {
                    return {
                        re: false,
                        message: "您的[" + t + "]分组中自选股数量已达到500条上限"
                    }
                }
                if (n.length + r > 500) {
                    return {
                        re: false,
                        message: "您的[" + t + "]分组中自选股数量即将超过500条上限"
                    }
                }
                return {
                    re: true,
                    newlength: r
                }
            },
            importzxg: function() {
                var e = this;
                var t = this.getzxg();
                if (t.length == 0) {
                    s("导入失败！", "您暂无新的自选股可导入");
                    return false
                }
                var n = $("#zxggrouplist li.on");
                var a = n.data("groupid");
                var i = n.data("groupname");
                var r = this.fxzxg(t, i);
                if (!r.re) {
                    s("导入失败！", r.message);
                    return false
                }
                o("", "是否将您本地的" + r.newlength + "支自选股<br>导入[" + i + "]分组中", function() {
                    e.pladdzxg(t, i)
                })
            },
            drzxg: function() {
                var e = this.getzxg()
            },
            pladdzxg: function(t, n) {
                t = this.dealstocks(t);
                $.ajax({
                    url: "./api/zxg/addlotstock",
                    type: "POST",
                    dataType: "json",
                    data: {
                        groupid: l.thisgroupid,
                        stockcode: t.join(",")
                    }
                }).done(function(e) {
                    if (e.re) {
                        s("导入成功！", "您已成功将" + t.length + "条自选股导入[" + n + "]分组中", function() {
                            l.changeGroup(l.thisgroupid)
                        })
                    } else {
                        modalalert(e.message)
                    }
                }).fail(function(e) {})
            },
            dealstocks: function(e) {
                var n = [];
                e.forEach(function(e) {
                    var t = e.substring(0, 1);
                    if (t == "6") {
                        n.push("1." + e)
                    } else if (t == "3" || t == "0")
                        n.push("0." + e)
                });
                return n
            },
            bind: function(e) {
                var t = this;
                e.on("click", function() {
                    t.importzxg();
                    return false
                })
            }
        }
    },
    "./modules/info/web.js": function(e, t, n) {
        var a = n("./modules/global_event/index.js");
        var i = n("./modules/boxsize/index.js");
        var r = n("./modules/sessionstorage/index.js");
        var s = n("./modules/localstorage/index.js");
        var o = {
            codes: null,
            isbind: false,
            thisindex: 0,
            init: function(e) {
                this.codes = e.join(",");
                $("#newstypetab li").removeClass("on");
                $("#newstypetab li:first").addClass("on");
                if (r.get("newstype")) {
                    this.changeType(parseInt(r.get("newstype")))
                } else {
                    this.changeType(0)
                }
                if (!this.isbind) {
                    this.bind()
                }
            },
            bind: function() {
                var t = this;
                this.isbind = true;
                $("#newstypetab").on("click", "li", function() {
                    var e = $(this).index();
                    t.changeType(e);
                    r.save("newstype", e)
                });
                $("#newsnumsc").on("click", "a", function() {
                    var e = $(this).data("level");
                    s.set("newsheight", e);
                    t.changeHeight(e);
                    return false
                });
                if (s.get("newsheight")) {
                    t.changeHeight(s.get("newsheight"))
                }
                setInterval(function() {
                    t.changeType(t.thisindex)
                }, 30 * 1e3)
            },
            changeType: function(e) {
                this.thisindex = e;
                $("#newstypetab li").removeClass("on");
                $("#newstypetab li").eq(e).addClass("on");
                switch (e) {
                case 0:
                    this.getMix();
                    break;
                case 1:
                    this.getInfo(0);
                    break;
                case 2:
                    this.getInfo(1);
                    break;
                case 3:
                    this.getInfo(2);
                    break;
                case 4:
                    this.getInfo(4);
                    break;
                case 5:
                    this.getInfo(3);
                    break;
                default:
                    break
                }
            },
            getMix: function() {
                var t = this;
                $("#newsinfoc ul").css({
                    display: "none"
                });
                if (this.codes == "") {
                    $("#mixnewsd").html(t.fillHTML([], true)).show();
                    return false
                }
                $.ajax({
                    url: "./api/info/mix",
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: t.codes
                    }
                }).done(function(e) {
                    if (e.re) {
                        $("#mixnewsd").html(t.fillHTML(e.result.data, true)).show()
                    }
                }).fail(function(e) {})
            },
            getInfo: function(e) {
                var t = this;
                var n = null;
                var a = "";
                $("#newsinfoc ul").css({
                    display: "none"
                });
                switch (e) {
                case 0:
                    n = $("#newsd");
                    a = "news";
                    break;
                case 1:
                    n = $("#ggd");
                    a = "bulletin";
                    break;
                case 2:
                    n = $("#ybd");
                    a = "report";
                    break;
                case 3:
                    n = $("#wdd");
                    a = "qa";
                    break;
                case 4:
                    n = $("#cfhd");
                    a = "cfh";
                    break;
                default:
                    break
                }
                if (this.codes == "") {
                    n.html(t.fillHTML([], false)).show();
                    return false
                }
                n.show();
                $.ajax({
                    url: "./api/info/one",
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: t.codes,
                        type: e
                    }
                }).done(function(e) {
                    if (e.re) {
                        n.html(t.fillHTML(e.result[a].data, false))
                    }
                }).fail(function(e) {})
            },
            fillHTML: function(e, a) {
                if (e.length == 0) {
                    return '<div class="infonod">暂无相关内容</div>'
                }
                var i = [];
                e.forEach(function(e) {
                    var t = "";
                    var n = "";
                    if (e.stockInfo) {
                        e.stock = {
                            code: e.stockInfo.split("|")[0],
                            name: e.stockInfo.split("|")[1]
                        };
                        e.stock.jmk = e.stock.code.split(".")[0];
                        e.stock.jcode = e.stock.code.split(".")[1];
                        e.stock.gubamk = "";
                        if (e.stock.jmk == "116") {
                            e.stock.gubamk = "hk"
                        } else if (e.stock.jmk == "105" || e.stock.jmk == "106" || e.stock.jmk == "107") {
                            e.stock.gubamk = "us"
                        }
                    }
                    switch (e.type) {
                    case "qa":
                        t = "问答";
                        n = e.stock ? "http://ask.eastmoney.com/list.html?code=" + e.stock.jcode : "";
                        break;
                    case "news":
                        t = "资讯";
                        n = e.stock ? "http://guba.eastmoney.com/list," + e.stock.gubamk + e.stock.jcode + ",1,f.html" : "";
                        break;
                    case "report":
                        t = "研报";
                        n = e.stock ? "http://data.eastmoney.com/report/" + e.stock.jcode + ".html" : "";
                        break;
                    case "bulletin":
                        t = "公告";
                        n = e.stock ? "http://data.eastmoney.com/notices/stock/" + e.stock.jcode + ".html" : "";
                        break;
                    case "cfh":
                        t = "财富号";
                        break;
                    default:
                        break
                    }
                    i.push("<li>");
                    if (a) {
                        i.push("[");
                        if (n)
                            i.push('<a href="' + n + '" target="_blank">');
                        i.push(t);
                        if (e.stock) {
                            i.push("·" + e.stock.name)
                        }
                        if (n)
                            i.push("</a>");
                        i.push("] ")
                    } else {
                        if (e.stock) {
                            i.push("[");
                            if (n)
                                i.push('<a href="' + n + '" target="_blank">');
                            i.push(e.stock.name);
                            if (n)
                                i.push("</a>");
                            i.push("] ")
                        }
                    }
                    if (e.type == "qa") {
                        i.push('<span class="qamoney">￥ ' + e.money + "元</span>")
                    }
                    i.push('<a href="' + e.url + '" title="' + e.title + '">' + e.title + '</a><span class="time">' + (e.date ? e.date.substring(5, 10) : "") + "</span></li>")
                });
                return i.join("")
            },
            changeHeight: function(e) {
                $("#newsnumsc a").removeClass("on");
                $("#newsnumsc a[data-level=" + e + "]").addClass("on");
                var t = $("#newsinfoc .newslist").add("#gubanews");
                if (e == 0) {
                    t.height(136)
                } else if (e == 1) {
                    t.height(272)
                } else if (e == 2) {
                    t.height(408)
                }
                i.resize()
            }
        };
        a.regEvent("stockchange", function(e) {
            o.init(e)
        });
        e.exports = o
    },
    "./modules/info_mines/index.js": function(e, t, n) {
        var a = n("./modules/datacache/index.js");
        var r = n("./modules/popmenu/index.js");
        var i = {
            getData: function(e) {
                return $.ajax({
                    url: "./api/info/infomines",
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: e.join(",")
                    }
                }).then(function(e) {
                    if (e.re) {
                        return e.result
                    }
                })
            },
            fillHTML: function(a) {
                var i = this;
                Object.keys(a).forEach(function(e) {
                    if ($('#tablethd4 [data-code="' + e + '"] .td_f14 em .list_mine').length) {
                        return false
                    }
                    var t = $('<span class="list_mine"><span class="icon icon_mine' + (a[e].data.length > 1 ? "s" : "") + '"></span></span>');
                    $('#tablethd4 [data-code="' + e + '"] .td_f14 em').append(t);
                    var n = new r({
                        target: t,
                        offsetx: -12,
                        arrow_dir: 1,
                        content: i.newsHTML(a[e].data)
                    })
                })
            },
            newsHTML: function(e) {
                var t = "";
                var n = ['<div class="mines_list"><ul>'];
                e.forEach(function(e) {
                    if (!e) {
                        return
                    }
                    switch (e.bztype) {
                    case "news":
                        t = "新闻";
                        break;
                    case "report":
                        t = "研报";
                        break;
                    case "notice":
                        t = "公告";
                        break;
                    case "bulletin":
                        t = "公告";
                        break;
                    default:
                        t = "";
                        break
                    }
                    if (t) {
                        t = " [" + t + "] "
                    } else {
                        t = " "
                    }
                    n.push('<li><a href="' + e.url + '">' + e.date.substring(0, 10) + t + e.title + "</a></li>")
                });
                n.push("</ul></div>");
                return $(n.join(""))
            },
            show: function() {
                var t = this;
                if (a.stocks.length == 0) {
                    return false
                }
                this.getData(a.stocks).then(function(e) {
                    if (e) {
                        t.fillHTML(e);
                        a.resizeFill()
                    }
                })
            }
        };
        e.exports = i
    },
    "./modules/jsutils/index.js": function(e, t) {
        e.exports = {
            arrayFilterSame: function(e) {
                var t = {};
                e.forEach(function(e) {
                    t[e] = null
                });
                return Object.keys(t)
            }
        }
    },
    "./modules/kuaixun/index.js": function(e, t) {
        var n = function() {
            function e(e) {
                var t = {
                    refreshbtn: null,
                    fontsizebtn: null,
                    autobtn: null,
                    autosec: null,
                    kxlist: null,
                    kxloading: null,
                    refreshtime: 60,
                    kxtype: "102",
                    kxlink: "http://kuaixun.eastmoney.com/"
                };
                this.options = $.extend(t, e);
                this.cdci = null;
                this.isautocd = true;
                this.iskxshow = true;
                this.fontsize = 14
            }
            e.prototype.init = function() {
                this.options.autosec.text(this.options.refreshtime);
                this.bind();
                this.refresh();
                this.refreshcd()
            }
            ;
            e.prototype.bind = function() {
                var t = this;
                this.options.refreshbtn.on("click", function() {
                    t.refresh();
                    return false
                });
                $("#kx_auto_tc").on("change", function() {
                    var e = $(this);
                    if (e.is(":checked")) {
                        t.isautocd = true;
                        t.refreshcd()
                    } else {
                        t.isautocd = false;
                        clearInterval(t.cdci);
                        t.options.autosec.text(t.options.refreshtime)
                    }
                });
                if (this.options.fontsizebtn) {
                    this.options.fontsizebtn.on("click", function() {
                        var e = $(this);
                        if (t.fontsize == 14) {
                            t.fontsize = 16;
                            e.addClass("icon_fontsize").removeClass("icon_fontsize2")
                        } else {
                            t.fontsize = 14;
                            e.addClass("icon_fontsize2").removeClass("icon_fontsize")
                        }
                        t.options.kxlist.css("font-size", t.fontsize + "px")
                    })
                }
            }
            ;
            e.prototype.refreshcd = function() {
                var t = this;
                clearInterval(this.cdci);
                this.cdci = null;
                this.options.autosec.text(this.options.refreshtime);
                if (this.isautocd && this.iskxshow) {
                    this.cdci = setInterval(function() {
                        var e = t.options.autosec.text();
                        if (e == 1) {
                            t.refresh()
                        } else {
                            t.options.autosec.text(e - 1)
                        }
                    }, 1e3)
                }
            }
            ;
            e.prototype.stopRefresh = function() {
                clearInterval(this.cdci);
                this.options.autosec.text(this.options.refreshtime)
            }
            ;
            e.prototype.refresh = function() {
                var s = this;
                this.options.kxloading.show();
                $("#kx_list_t #kx_loading_t").remove();
                $("#kx_list_t").prepend('<div id="kx_loading_t">加载中...</div>');
                setTimeout(function() {
                    $.ajax({
                        url: "http://newsapi.eastmoney.com/kuaixun/v2/api/list",
                        type: "GET",
                        dataType: "jsonp",
                        jsonpCallback: "ajaxResult_" + s.options.kxtype,
                        scriptCharset: "utf-8",
                        cache: false,
                        data: {
                            column: s.options.kxtype,
                            limit: 20,
                            p: 1,
                            callback: "kxall_ajaxResult" + s.options.kxtype
                        }
                    }).done(function(e) {
                        e = e.news;
                        var t = [];
                        for (var n = 0; n < e.length; n++) {
                            var a = e[n].url_w;
                            if (e[n].url_unique && e[n].url_unique.indexOf("http") >= 0) {
                                a = e[n].url_unique
                            }
                            t.push('<div class="zbbi">');
                            t.push('<div class="time">' + e[n].showtime.substring(11, 16) + "</div>");
                            var i = e[n].digest;
                            if (i == "")
                                i = e[n].title;
                            if (e[n].newstype == "1") {
                                if (e[n].topic != null) {
                                    i = '<a href="' + e[n].topic.As_URL + '">' + i + '</a><span class="bd_i_zt">专题</span>'
                                } else {
                                    i = '<a href="' + a + '">' + i + "[点击查看全文]</a>"
                                }
                            }
                            var r = "";
                            switch (e[n].titlestyle) {
                            case "1":
                                r = " bold";
                                break;
                            case "2":
                                r = " red";
                                break;
                            case "3":
                                r = " bold red";
                                break
                            }
                            t.push('<div class="zbtext' + r + '">' + i + "</div>");
                            t.push("</div>")
                        }
                        t.push('<div class="kx_more_e"><a href="' + s.options.kxlink + '" target="_blank">查看更多</a></div>');
                        s.options.kxlist.html(t.join(""));
                        s.options.kxloading.hide()
                    }).fail(function() {
                        var e = $('<div class="kx_error">抱歉，数据没有正常显示<br></div>');
                        var t = $('<a href="javascript:;" target="_self" class="handrefreshbtn">请点此手动刷新</a>');
                        e.append(t);
                        s.options.kxlist.html(e);
                        t.on("click", function() {
                            s.refresh()
                        });
                        return false
                    }).always(function() {
                        s.refreshcd();
                        $("#kx_loading_t").remove()
                    })
                }, 200)
            }
            ;
            return e
        }();
        e.exports = n
    },
    "./modules/localstorage/index.js": function(e, t) {
        e.exports = {
            get: function(e) {
                if (window.localStorage) {
                    return localStorage.getItem(e)
                }
                return null
            },
            set: function(e, t) {
                if (window.localStorage) {
                    localStorage.setItem(e, t)
                }
            },
            del: function(e) {
                if (window.localStorage) {
                    localStorage.removeItem(e)
                }
            }
        }
    },
    "./modules/modal/alert.js": function(e, t, n) {
        var r = n("./modules/modal/index.js");
        e.exports = function(e, t, n) {
            if (typeof t == "function" && n == undefined) {
                n = t;
                t = undefined
            }
            var a = $('<div><div class="modalalert"></div><div class="modalbtnd"><a href="javascript:;" target="_self" class="modalbtn_default">确定</a></div></div>');
            if (e) {
                $(".modalalert", a).append(e)
            }
            if (t) {
                $(".modalalert", a).append('<div class="modalalertb">' + t + "</div>")
            }
            var i = new r({
                content: a,
                onClose: function() {}
            });
            i.show();
            $(".modalbtn_default", a).click(function() {
                if (n) {
                    n()
                }
                i.close()
            })
        }
    },
    "./modules/modal/confirm.js": function(e, t, n) {
        var s = n("./modules/modal/index.js");
        e.exports = function(e, t, n, a) {
            if (typeof t == "function" && n == undefined) {
                n = t;
                a = undefined;
                t = undefined
            } else if (typeof t == "function" && a == undefined) {
                a = n;
                n = t;
                t = undefined
            }
            var i = $('<div><div class="modalalert"></div><div class="modalbtnd"><a href="javascript:;" target="_self" class="modalbtn_default">确 定</a> &nbsp; <a href="javascript:;" target="_self"  class="modalbtn_cancel">取 消</a></div></div>');
            if (e) {
                $(".modalalert", i).append(e)
            }
            if (t) {
                $(".modalalert", i).append('<div class="modalalertb">' + t + "</div>")
            }
            var r = new s({
                content: i,
                onClose: function() {}
            });
            r.show();
            $(".modalbtn_default", i).click(function() {
                if (n) {
                    n()
                }
                r.close()
            });
            $(".modalbtn_cancel", i).click(function() {
                if (a) {
                    a()
                }
                r.close()
            })
        }
    },
    "./modules/modal/index.js": function(e, t, n) {
        var a = n("./modules/modal/modal.html");
        var i = n("./node_modules/dot/doT.js");
        var r = n("./modules/browser/index.js");
        function s(e) {
            var t = {
                content: "",
                showclose: true,
                showtitle: true,
                title: null,
                onClose: null
            };
            this.options = $.extend(t, e)
        }
        s.prototype.show = function(e) {
            var t = this;
            this.html = $(i.template(a)({
                showclose: this.options.showclose,
                showtitle: this.options.showtitle
            }));
            $(".modaldiv", this.html).append(this.options.content);
            if (this.options.showtitle && this.options.title) {
                $(".modaltitle", this.html).html(this.options.title)
            }
            $(".modal_close", this.html).click(function() {
                t.close()
            });
            this.html.css({
                top: $(window).scrollTop()
            });
            if (r.isIE6()) {
                $(".modal_shadow", this.html).css({
                    height: $(window).height()
                })
            }
            $("body").append(this.html);
            $("html").css({
                overflow: "hidden"
            });
            this.html.fadeIn(150, function() {
                if (e) {
                    e()
                }
            });
            setTimeout(function() {
                t.resize()
            }, 10)
        }
        ;
        s.prototype.close = function() {
            var e = this;
            this.html.fadeOut(150, function() {
                e.html.remove();
                if (e.options.onClose) {
                    e.options.onClose()
                }
            });
            $("html").css({
                overflow: "scroll"
            })
        }
        ;
        s.prototype.resize = function() {
            var e = $(".modalbody", this.html);
            e.css({
                "margin-top": -(e.outerHeight() / 2),
                "margin-left": -(e.outerWidth() / 2)
            })
        }
        ;
        e.exports = s
    },
    "./modules/modal/modal.html": function(e, t) {
        e.exports = '<div class="modal">\r\n  <div class="modal_shadow"></div>\r\n  <div class="modalbody">\r\n    {{? it.showclose }}\r\n    <div class="modal_close"><span class="icon icon_mclose"></span></div>\r\n    {{?}}\r\n    {{? it.showtitle }}\r\n    <div class="modaltitle">提示</div>\r\n    {{?}}\r\n    <div class="modaldiv">\r\n      \x3c!-- <div class="modalbtnd">\r\n        <a href="" class="modalbtn_default">确定</a>\r\n        <a href="" class="modalbtn_cancel">确定</a>        \r\n      </div> --\x3e\r\n\r\n    </div>\r\n  </div>\r\n</div>'
    },
    "./modules/pager/index.js": function(e, t) {
        e.exports = function(e, t, n, a) {
            var i = Math.ceil(n / t);
            var r = [];
            r.push({
                text: "第一页",
                num: 1,
                active: false
            });
            if (e > 1) {
                r.push({
                    text: "上一页",
                    num: e - 1,
                    active: false
                })
            }
            if (e <= 4) {
                for (var s = 1; s <= i && s < 6; s++) {
                    r.push({
                        text: s,
                        num: s,
                        active: e == s
                    })
                }
            } else if (e > i - 2) {
                for (var s = i - 4; s <= i; s++) {
                    r.push({
                        text: s,
                        num: s,
                        active: e == s
                    })
                }
            } else {
                for (var s = e - 2; s <= i && s <= e + 2; s++) {
                    r.push({
                        text: s,
                        num: s,
                        active: e == s
                    })
                }
            }
            if (e < i) {
                r.push({
                    text: "下一页",
                    num: e + 1,
                    active: false
                })
            }
            r.push({
                text: "最后页",
                num: i,
                active: false
            });
            var o = [];
            var l;
            r.forEach(function(e) {
                l = a.replace("{page}", e.num);
                o.push("<a ");
                if (e.active) {
                    o.push('class="on" ')
                }
                o.push('href="' + l + '" data-page="' + e.num + '" target="_self">' + e.text + "</a>")
            });
            if (i >= 2) {
                return o.join("")
            } else {
                return ""
            }
        }
    },
    "./modules/pkyd/web.js": function(e, t, n) {
        var a = n("./modules/quote_ts/ts.js");
        var i = n("./modules/global_event/index.js");
        var r = n("./config/webconfig.js");
        var s = {
            maxlength: 9,
            datacache: null,
            isstock: false,
            stocks: null,
            init: function() {
                this.link();
                this.bind()
            },
            config: {
                201: {
                    name: "封涨停板"
                },
                301: {
                    name: "封跌停板"
                },
                202: {
                    name: "打开涨停板"
                },
                302: {
                    name: "打开跌停板"
                },
                1: {
                    name: "有大买盘"
                },
                101: {
                    name: "有大卖盘"
                },
                2: {
                    name: "大笔买入"
                },
                102: {
                    name: "大笔卖出"
                },
                402: {
                    name: "火箭发射"
                },
                403: {
                    name: "快速反弹"
                },
                502: {
                    name: "高台跳水"
                },
                503: {
                    name: "快速下跌"
                },
                404: {
                    name: "竞价上涨"
                },
                504: {
                    name: "竞价下跌"
                },
                203: {
                    name: "高开5日线"
                },
                303: {
                    name: "低开5日线"
                },
                401: {
                    name: "向上缺口"
                },
                501: {
                    name: "向下缺口"
                },
                204: {
                    name: "60日新高"
                },
                304: {
                    name: "60日新低"
                },
                405: {
                    name: "60日大幅上涨"
                },
                505: {
                    name: "60日大幅下跌"
                }
            },
            thison: false,
            bind: function() {
                var e = this;
                var t = $("#pkydmore");
                t.on("mouseenter", function() {
                    e.thison = true
                });
                t.on("mouseleave", function() {
                    e.thison = false
                });
                $("#pkydzk").click(function() {
                    if (t.is(":visible")) {
                        $("#pkydmore").fadeOut(150);
                        $("#pkydzk .icon:first").show();
                        $("#pkydzk .icon:last").hide()
                    } else {
                        $("#pkydmore").fadeIn(150);
                        $("#pkydzk .icon:first").hide();
                        $("#pkydzk .icon:last").show()
                    }
                });
                $("#pykdcheck").click(function() {
                    if (e.isstock) {
                        $("#pykdcheck .icon:first").show();
                        $("#pykdcheck .icon:last").hide();
                        e.isstock = false
                    } else {
                        $("#pykdcheck .icon:first").hide();
                        $("#pykdcheck .icon:last").show();
                        e.isstock = true
                    }
                    e.link()
                })
            },
            firstFill: function(e) {
                if (e.length == 0) {
                    $("#pkyd_first").html("");
                    $("#pkydmore ul").html("");
                    return false
                }
                var t = this;
                var n = e[e.length - 1];
                $("#pkyd_first").html(this.itemFill(n.split(",")));
                var a = [];
                for (var i = e.length - 9; i < e.length - 1; i++) {
                    if (i < 0) {
                        i = 0
                    }
                    a.push("<li>" + t.itemFill(e[i].split(",")) + "</li>")
                }
                if (!this.thison) {
                    $("#pkydmore ul").html(a.join(""))
                }
            },
            itemFill: function(e) {
                var t = "";
                if (e[2] == "0") {
                    t = "sz"
                } else if (e[2] == "1") {
                    t = "sh"
                }
                var n = "";
                if (this.config[e[4]]) {
                    n = this.config[e[4]].name
                }
                var a = "";
                if (e[6] == "1") {
                    a = "stockup"
                } else if (e[6] == "2") {
                    a = "stockdown"
                }
                return e[0] + ' <a href="http://quote.eastmoney.com/changes/stocks/' + t + e[1] + '.html">' + e[3] + '</a> <span class="' + a + '">' + n + " " + e[5] + "</span>"
            },
            setStocks: function(e) {
                this.stocks = e.join(",")
            },
            link: function() {
                var t = this;
                if (this.qts) {
                    this.qts.close()
                }
                this.getTS(function(e) {
                    if (e.data == null) {
                        return false
                    }
                    if (e.full == 1 && e.rt == 15 && e.data.pkyd) {
                        t.datacache = e.data.pkyd;
                        t.firstFill(t.datacache)
                    } else if (e.data.pkyd.length > 0) {
                        t.datacache.push(e.data.pkyd[0]);
                        t.firstFill(t.datacache)
                    }
                })
            },
            getTS: function(t) {
                var e = r.getWebPath("quotepath") + "api/qt/pkyd/sse?lmt=9&fields=f1,f2,f3,f4,f5,f6,f7&ut=6d2ffaa6a585d612eda28417681d58fb";
                if (this.isstock) {
                    e += "&secids=" + this.stocks
                }
                this.qts = new a({
                    subUrl: e,
                    callback: function(e) {
                        if (e.rc == 0 && e.data != null) {
                            t(e)
                        }
                    }
                })
            }
        };
        i.regEvent("stockchange", function(e) {
            s.setStocks(e);
            s.link()
        });
        e.exports = s
    },
    "./modules/polyfill/array.js": function(e, t) {
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, "find", {
                value: function(e) {
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined')
                    }
                    var t = Object(this);
                    var n = t.length >>> 0;
                    if (typeof e !== "function") {
                        throw new TypeError("predicate must be a function")
                    }
                    var a = arguments[1];
                    var i = 0;
                    while (i < n) {
                        var r = t[i];
                        if (e.call(a, r, i, t)) {
                            return r
                        }
                        i++
                    }
                    return undefined
                }
            })
        }
    },
    "./modules/polyfill/index.js": function(e, t, n) {
        n("./modules/polyfill/promise.js");
        n("./modules/polyfill/array.js")
    },
    "./modules/polyfill/promise.js": function(n, e, t) {
        (function(se, oe) {
            (function(e, t) {
                true ? n.exports = t() : undefined
            }
            )(this, function() {
                "use strict";
                function n(e) {
                    var t = typeof e;
                    return e !== null && (t === "object" || t === "function")
                }
                function u(e) {
                    return typeof e === "function"
                }
                var e = void 0;
                if (Array.isArray) {
                    e = Array.isArray
                } else {
                    e = function(e) {
                        return Object.prototype.toString.call(e) === "[object Array]"
                    }
                }
                var o = e;
                var a = 0;
                var i = void 0;
                var r = void 0;
                var s = function s(e, t) {
                    y[a] = e;
                    y[a + 1] = t;
                    a += 2;
                    if (a === 2) {
                        if (r) {
                            r(_)
                        } else {
                            w()
                        }
                    }
                };
                function t(e) {
                    r = e
                }
                function l(e) {
                    s = e
                }
                var d = typeof window !== "undefined" ? window : undefined;
                var f = d || {};
                var c = f.MutationObserver || f.WebKitMutationObserver;
                var h = typeof self === "undefined" && typeof se !== "undefined" && {}.toString.call(se) === "[object process]";
                var p = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";
                function m() {
                    return function() {
                        return se.nextTick(_)
                    }
                }
                function v() {
                    if (typeof i !== "undefined") {
                        return function() {
                            i(_)
                        }
                    }
                    return b()
                }
                function g() {
                    var e = 0;
                    var t = new c(_);
                    var n = document.createTextNode("");
                    t.observe(n, {
                        characterData: true
                    });
                    return function() {
                        n.data = e = ++e % 2
                    }
                }
                function x() {
                    var e = new MessageChannel;
                    e.port1.onmessage = _;
                    return function() {
                        return e.port2.postMessage(0)
                    }
                }
                function b() {
                    var e = setTimeout;
                    return function() {
                        return e(_, 1)
                    }
                }
                var y = new Array(1e3);
                function _() {
                    for (var e = 0; e < a; e += 2) {
                        var t = y[e];
                        var n = y[e + 1];
                        t(n);
                        y[e] = undefined;
                        y[e + 1] = undefined
                    }
                    a = 0
                }
                function j() {
                    try {
                        var e = Function("return this")().require("vertx");
                        i = e.runOnLoop || e.runOnContext;
                        return v()
                    } catch (t) {
                        return b()
                    }
                }
                var w = void 0;
                if (h) {
                    w = m()
                } else if (c) {
                    w = g()
                } else if (p) {
                    w = x()
                } else if (d === undefined && "function" === "function") {
                    w = j()
                } else {
                    w = b()
                }
                function k(e, t) {
                    var n = this;
                    var a = new this.constructor(S);
                    if (a[A] === undefined) {
                        V(a)
                    }
                    var i = n._state;
                    if (i) {
                        var r = arguments[i - 1];
                        s(function() {
                            return X(i, a, r, n._result)
                        })
                    } else {
                        H(n, a, e, t)
                    }
                    return a
                }
                function T(e) {
                    var t = this;
                    if (e && typeof e === "object" && e.constructor === t) {
                        return e
                    }
                    var n = new t(S);
                    R(n, e);
                    return n
                }
                var A = Math.random().toString(36).substring(2);
                function S() {}
                var C = void 0;
                var M = 1;
                var z = 2;
                var $ = {
                    error: null
                };
                function E() {
                    return new TypeError("You cannot resolve a promise with itself")
                }
                function I() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }
                function O(e) {
                    try {
                        return e.then
                    } catch (t) {
                        $.error = t;
                        return $
                    }
                }
                function D(e, t, n, a) {
                    try {
                        e.call(t, n, a)
                    } catch (i) {
                        return i
                    }
                }
                function F(e, a, i) {
                    s(function(t) {
                        var n = false;
                        var e = D(i, a, function(e) {
                            if (n) {
                                return
                            }
                            n = true;
                            if (a !== e) {
                                R(t, e)
                            } else {
                                N(t, e)
                            }
                        }, function(e) {
                            if (n) {
                                return
                            }
                            n = true;
                            G(t, e)
                        }, "Settle: " + (t._label || " unknown promise"));
                        if (!n && e) {
                            n = true;
                            G(t, e)
                        }
                    }, e)
                }
                function P(t, e) {
                    if (e._state === M) {
                        N(t, e._result)
                    } else if (e._state === z) {
                        G(t, e._result)
                    } else {
                        H(e, undefined, function(e) {
                            return R(t, e)
                        }, function(e) {
                            return G(t, e)
                        })
                    }
                }
                function L(e, t, n) {
                    if (t.constructor === e.constructor && n === k && t.constructor.resolve === T) {
                        P(e, t)
                    } else {
                        if (n === $) {
                            G(e, $.error);
                            $.error = null
                        } else if (n === undefined) {
                            N(e, t)
                        } else if (u(n)) {
                            F(e, t, n)
                        } else {
                            N(e, t)
                        }
                    }
                }
                function R(e, t) {
                    if (e === t) {
                        G(e, E())
                    } else if (n(t)) {
                        L(e, t, O(t))
                    } else {
                        N(e, t)
                    }
                }
                function B(e) {
                    if (e._onerror) {
                        e._onerror(e._result)
                    }
                    q(e)
                }
                function N(e, t) {
                    if (e._state !== C) {
                        return
                    }
                    e._result = t;
                    e._state = M;
                    if (e._subscribers.length !== 0) {
                        s(q, e)
                    }
                }
                function G(e, t) {
                    if (e._state !== C) {
                        return
                    }
                    e._state = z;
                    e._result = t;
                    s(B, e)
                }
                function H(e, t, n, a) {
                    var i = e._subscribers;
                    var r = i.length;
                    e._onerror = null;
                    i[r] = t;
                    i[r + M] = n;
                    i[r + z] = a;
                    if (r === 0 && e._state) {
                        s(q, e)
                    }
                }
                function q(e) {
                    var t = e._subscribers;
                    var n = e._state;
                    if (t.length === 0) {
                        return
                    }
                    var a = void 0
                      , i = void 0
                      , r = e._result;
                    for (var s = 0; s < t.length; s += 3) {
                        a = t[s];
                        i = t[s + n];
                        if (a) {
                            X(n, a, i, r)
                        } else {
                            i(r)
                        }
                    }
                    e._subscribers.length = 0
                }
                function U(e, t) {
                    try {
                        return e(t)
                    } catch (n) {
                        $.error = n;
                        return $
                    }
                }
                function X(e, t, n, a) {
                    var i = u(n)
                      , r = void 0
                      , s = void 0
                      , o = void 0
                      , l = void 0;
                    if (i) {
                        r = U(n, a);
                        if (r === $) {
                            l = true;
                            s = r.error;
                            r.error = null
                        } else {
                            o = true
                        }
                        if (t === r) {
                            G(t, I());
                            return
                        }
                    } else {
                        r = a;
                        o = true
                    }
                    if (t._state !== C) {} else if (i && o) {
                        R(t, r)
                    } else if (l) {
                        G(t, s)
                    } else if (e === M) {
                        N(t, r)
                    } else if (e === z) {
                        G(t, r)
                    }
                }
                function K(t, e) {
                    try {
                        e(function n(e) {
                            R(t, e)
                        }, function a(e) {
                            G(t, e)
                        })
                    } catch (i) {
                        G(t, i)
                    }
                }
                var W = 0;
                function Y() {
                    return W++
                }
                function V(e) {
                    e[A] = W++;
                    e._state = undefined;
                    e._result = undefined;
                    e._subscribers = []
                }
                function J() {
                    return new Error("Array Methods must be provided an Array")
                }
                var Q = function() {
                    function e(e, t) {
                        this._instanceConstructor = e;
                        this.promise = new e(S);
                        if (!this.promise[A]) {
                            V(this.promise)
                        }
                        if (o(t)) {
                            this.length = t.length;
                            this._remaining = t.length;
                            this._result = new Array(this.length);
                            if (this.length === 0) {
                                N(this.promise, this._result)
                            } else {
                                this.length = this.length || 0;
                                this._enumerate(t);
                                if (this._remaining === 0) {
                                    N(this.promise, this._result)
                                }
                            }
                        } else {
                            G(this.promise, J())
                        }
                    }
                    e.prototype._enumerate = function n(e) {
                        for (var t = 0; this._state === C && t < e.length; t++) {
                            this._eachEntry(e[t], t)
                        }
                    }
                    ;
                    e.prototype._eachEntry = function s(t, e) {
                        var n = this._instanceConstructor;
                        var a = n.resolve;
                        if (a === T) {
                            var i = O(t);
                            if (i === k && t._state !== C) {
                                this._settledAt(t._state, e, t._result)
                            } else if (typeof i !== "function") {
                                this._remaining--;
                                this._result[e] = t
                            } else if (n === ie) {
                                var r = new n(S);
                                L(r, t, i);
                                this._willSettleAt(r, e)
                            } else {
                                this._willSettleAt(new n(function(e) {
                                    return e(t)
                                }
                                ), e)
                            }
                        } else {
                            this._willSettleAt(a(t), e)
                        }
                    }
                    ;
                    e.prototype._settledAt = function i(e, t, n) {
                        var a = this.promise;
                        if (a._state === C) {
                            this._remaining--;
                            if (e === z) {
                                G(a, n)
                            } else {
                                this._result[t] = n
                            }
                        }
                        if (this._remaining === 0) {
                            N(a, this._result)
                        }
                    }
                    ;
                    e.prototype._willSettleAt = function a(e, t) {
                        var n = this;
                        H(e, undefined, function(e) {
                            return n._settledAt(M, t, e)
                        }, function(e) {
                            return n._settledAt(z, t, e)
                        })
                    }
                    ;
                    return e
                }();
                function Z(e) {
                    return new Q(this,e).promise
                }
                function ee(i) {
                    var r = this;
                    if (!o(i)) {
                        return new r(function(e, t) {
                            return t(new TypeError("You must pass an array to race."))
                        }
                        )
                    } else {
                        return new r(function(e, t) {
                            var n = i.length;
                            for (var a = 0; a < n; a++) {
                                r.resolve(i[a]).then(e, t)
                            }
                        }
                        )
                    }
                }
                function te(e) {
                    var t = this;
                    var n = new t(S);
                    G(n, e);
                    return n
                }
                function ne() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }
                function ae() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                var ie = function() {
                    function t(e) {
                        this[A] = Y();
                        this._result = this._state = undefined;
                        this._subscribers = [];
                        if (S !== e) {
                            typeof e !== "function" && ne();
                            this instanceof t ? K(this, e) : ae()
                        }
                    }
                    t.prototype["catch"] = function n(e) {
                        return this.then(null, e)
                    }
                    ;
                    t.prototype["finally"] = function a(t) {
                        var e = this;
                        var n = e.constructor;
                        if (u(t)) {
                            return e.then(function(e) {
                                return n.resolve(t()).then(function() {
                                    return e
                                })
                            }, function(e) {
                                return n.resolve(t()).then(function() {
                                    throw e
                                })
                            })
                        }
                        return e.then(t, t)
                    }
                    ;
                    return t
                }();
                ie.prototype.then = k;
                ie.all = Z;
                ie.race = ee;
                ie.resolve = T;
                ie.reject = te;
                ie._setScheduler = t;
                ie._setAsap = l;
                ie._asap = s;
                function re() {
                    var e = void 0;
                    if (typeof oe !== "undefined") {
                        e = oe
                    } else if (typeof self !== "undefined") {
                        e = self
                    } else {
                        try {
                            e = Function("return this")()
                        } catch (a) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    }
                    var t = e.Promise;
                    if (t) {
                        var n = null;
                        try {
                            n = Object.prototype.toString.call(t.resolve())
                        } catch (a) {}
                        if (n === "[object Promise]" && !t.cast) {
                            return
                        }
                    }
                    e.Promise = ie
                }
                ie.polyfill = re;
                ie.Promise = ie;
                ie.polyfill();
                return ie
            })
        }
        ).call(this, t("./node_modules/process/browser.js"), t("./node_modules/webpack/buildin/global.js"))
    },
    "./modules/popmenu/index.js": function(e, t) {
        function n(e) {
            var t = {
                target: "",
                method: "mouseenter",
                delay: 300,
                outdelay: 500,
                items: null,
                content: null,
                offsetx: 0,
                arrow_dir: 2,
                onMoveIn: null,
                onHover: function() {},
                onOut: function() {}
            };
            this.options = $.extend(t, e);
            var n = this;
            this.html = $('<div class="popmenu"><div class="arrow arrow' + this.options.arrow_dir + '"></div><div class="popmenubody"></div></div>');
            if (this.options.content != null) {
                $(".popmenubody", this.html).append(this.options.content)
            } else if (this.options.items != null) {
                $(".popmenubody", this.html).append('<ul class="popmenulist"></ul>');
                this.options.items.forEach(function(e) {
                    var t = $("<li>");
                    t.html(e);
                    $("ul", n.html).append(t)
                })
            }
            this.mouseentercd = null;
            this.mouseleavecd = null;
            this.options.target.on("mouseenter", function() {
                try {
                    clearTimeout(n.mouseleavecd)
                } catch (e) {}
                n.mouseentercd = setTimeout(function() {
                    n.show();
                    n.options.onHover()
                }, n.options.delay)
            });
            this.options.target.on("mouseleave", function() {
                try {
                    clearTimeout(n.mouseentercd)
                } catch (e) {}
                n.mouseleavecd = setTimeout(function() {
                    n.close();
                    n.options.onOut()
                }, n.options.outdelay)
            });
            this.html.on("mouseenter", function() {
                clearTimeout(n.mouseleavecd)
            });
            this.html.on("mouseleave", function() {
                clearTimeout(n.mouseentercd);
                n.mouseleavecd = setTimeout(function() {
                    n.close()
                }, n.options.outdelay)
            })
        }
        n.prototype.show = function() {
            $("body").append(this.html);
            if (this.html.is(":visible")) {
                return false
            }
            var e = this.options.target.offset();
            if (e.left == 0 && e.top == 0) {
                return false
            }
            var t = this.options.target.height();
            if (this.options.onMoveIn) {
                this.options.onMoveIn()
            }
            this.html.css({
                top: e.top + t + 15,
                left: e.left + this.options.offsetx
            }).fadeIn(100)
        }
        ;
        n.prototype.close = function() {
            this.html.fadeOut(100, function() {})
        }
        ;
        e.exports = n
    },
    "./modules/qqsj/index.js": function(e, t, n) {
        var a = n("./node_modules/dateformat/lib/dateformat.js");
        var i = n("./modules/boxsize/index.js");
        var r = n("./modules/localstorage/index.js");
        a.i18n = {
            dayNames: ["日", "一", "二", "三", "四", "五", "六", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
        };
        function s(e) {
            $("#time_bj").text(moment(e).format("MM-DD HH:mm:ss"));
            $("#time_ld").text(moment(e).tz("Europe/London").format("MM-DD HH:mm:ss"));
            $("#time_ny").text(moment(e).tz("America/New_York").format("MM-DD HH:mm:ss"))
        }
        e.exports = function() {
            $.ajax({
                url: "http://cmsjs.eastmoney.com/TimeZone/Default.aspx?type=utctime&ids=41,2,78,53&jn=emutc",
                type: "GET",
                dataType: "script"
            }).done(function() {
                if (window.emutc) {
                    s(emutc.UTCTIME);
                    setInterval(function() {
                        emutc.UTCTIME = emutc.UTCTIME + 1e3;
                        s(emutc.UTCTIME)
                    }, 1e3)
                }
            }).fail(function(e) {});
            setInterval(function() {
                $("#localtime").text(a(new Date, "yyyy年m月d日 dddd HH:MM:ss"))
            }, 1e3);
            $("#qqsj_zk").click(function() {
                if ($("#qqsj").is(".qqsj_short")) {
                    $("#qqsj_zk span:first").show();
                    $("#qqsj_zk span:last").hide();
                    $("#qqsj").removeClass("qqsj_short");
                    r.set("qqsj_zk", "open")
                } else {
                    $("#qqsj_zk span:first").hide();
                    $("#qqsj_zk span:last").show();
                    $("#qqsj").addClass("qqsj_short");
                    r.set("qqsj_zk", "close")
                }
                i.resize()
            });
            if (r.get("qqsj_zk") == "close") {
                $("#qqsj_zk span:first").hide();
                $("#qqsj_zk span:last").show();
                $("#qqsj").addClass("qqsj_short")
            }
        }
    },
    "./modules/quote/index.js": function(e, t) {
        e.exports = {
            getStockBaseInfo: function(e, t) {
                var n = "f1,f2,f3,f4,f12,f14";
                if (t) {
                    n = t
                }
                return $.ajax({
                    url: "http://push2.eastmoney.com/api/qt/ulist.np/get?cb=?&fields=" + n,
                    type: "GET",
                    dataType: "json",
                    data: {
                        ut: "6d2ffaa6a585d612eda28417681d58fb",
                        secids: e
                    }
                }).then(function(e) {
                    if (e.rc == 0) {
                        if (e.data.diff.length == 1) {
                            return e.data.diff[0]
                        } else {
                            return e.data.diff
                        }
                    }
                })
            },
            getStockTypeInfo: function(e) {
                var t = "f12,f13,f14,f29";
                return $.ajax({
                    url: "http://push2.eastmoney.com/api/qt/ulist.np/get?cb=?&fields=" + t + "&secids=" + e,
                    type: "GET",
                    dataType: "json",
                    data: {
                        ut: "6d2ffaa6a585d612eda28417681d58fb"
                    }
                }).then(function(e) {
                    if (e.rc == 0) {
                        if (e.data.diff.length == 1) {
                            return e.data.diff[0]
                        } else {
                            return e.data.diff
                        }
                    }
                })
            }
        }
    },
    "./modules/quote_ts/ie_sse_polyfill.js": function(e, t) {
        (function(e) {
            if (e.EventSource && !e._eventSourceImportPrefix) {
                return
            }
            var t = (e._eventSourceImportPrefix || "") + "EventSource";
            var n = function(e, t) {
                if (!e || typeof e != "string") {
                    throw new SyntaxError("Not enough arguments")
                }
                this.URL = e;
                this.setOptions(t);
                var n = this;
                setTimeout(function() {
                    n.poll()
                }, 0)
            };
            n.prototype = {
                CONNECTING: 0,
                OPEN: 1,
                CLOSED: 2,
                defaultOptions: {
                    loggingEnabled: false,
                    loggingPrefix: "eventsource",
                    interval: 500,
                    bufferSizeLimit: 256 * 1024,
                    silentTimeout: 3e5,
                    getArgs: {
                        evs_buffer_size_limit: 256 * 1024
                    },
                    xhrHeaders: {
                        Accept: "text/event-stream",
                        "Cache-Control": "no-cache",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                },
                setOptions: function(e) {
                    var t = this.defaultOptions;
                    var n;
                    for (n in t) {
                        if (t.hasOwnProperty(n)) {
                            this[n] = t[n]
                        }
                    }
                    for (n in e) {
                        if (n in t && e.hasOwnProperty(n)) {
                            this[n] = e[n]
                        }
                    }
                    if (this.getArgs && this.bufferSizeLimit) {
                        this.getArgs["evs_buffer_size_limit"] = this.bufferSizeLimit
                    }
                    if (typeof console === "undefined" || typeof console.log === "undefined") {
                        this.loggingEnabled = false
                    }
                },
                log: function(e) {
                    if (this.loggingEnabled) {
                        console.log("[" + this.loggingPrefix + "]:" + e)
                    }
                },
                poll: function() {
                    try {
                        if (this.readyState == this.CLOSED) {
                            return
                        }
                        this.cleanup();
                        this.readyState = this.CONNECTING;
                        this.cursor = 0;
                        this.cache = "";
                        this._xhr = new this.XHR(this);
                        this.resetNoActivityTimer()
                    } catch (e) {
                        this.log("There were errors inside the pool try-catch");
                        this.dispatchEvent("error", {
                            type: "error",
                            data: e.message
                        })
                    }
                },
                pollAgain: function(e) {
                    var t = this;
                    t.readyState = t.CONNECTING;
                    t.dispatchEvent("error", {
                        type: "error",
                        data: "Reconnecting "
                    });
                    this._pollTimer = setTimeout(function() {
                        t.poll()
                    }, e || 0)
                },
                cleanup: function() {
                    this.log("evs cleaning up");
                    if (this._pollTimer) {
                        clearInterval(this._pollTimer);
                        this._pollTimer = null
                    }
                    if (this._noActivityTimer) {
                        clearInterval(this._noActivityTimer);
                        this._noActivityTimer = null
                    }
                    if (this._xhr) {
                        this._xhr.abort();
                        this._xhr = null
                    }
                },
                resetNoActivityTimer: function() {
                    if (this.silentTimeout) {
                        if (this._noActivityTimer) {
                            clearInterval(this._noActivityTimer)
                        }
                        var e = this;
                        this._noActivityTimer = setTimeout(function() {
                            e.log("Timeout! silentTImeout:" + e.silentTimeout);
                            e.pollAgain()
                        }, this.silentTimeout)
                    }
                },
                close: function() {
                    this.readyState = this.CLOSED;
                    this.log("Closing connection. readyState: " + this.readyState);
                    this.cleanup()
                },
                _onxhrdata: function() {
                    var e = this._xhr;
                    if (e.isReady() && !e.hasError()) {
                        this.resetNoActivityTimer();
                        if (this.readyState == this.CONNECTING) {
                            this.readyState = this.OPEN;
                            this.dispatchEvent("open", {
                                type: "open"
                            })
                        }
                        var t = e.getBuffer();
                        if (t.length > this.bufferSizeLimit) {
                            this.log("buffer.length > this.bufferSizeLimit");
                            this.pollAgain()
                        }
                        if (this.cursor == 0 && t.length > 0) {
                            if (t.substring(0, 1) == "\ufeff") {
                                this.cursor = 1
                            }
                        }
                        var n = this.lastMessageIndex(t);
                        if (n[0] >= this.cursor) {
                            var a = n[1];
                            var i = t.substring(this.cursor, a);
                            this.parseStream(i);
                            this.cursor = a
                        }
                        if (e.isDone()) {
                            this.log("request.isDone(). reopening the connection");
                            this.pollAgain(this.interval)
                        }
                    } else if (this.readyState !== this.CLOSED) {
                        this.log("this.readyState !== this.CLOSED");
                        this.pollAgain(this.interval)
                    }
                },
                parseStream: function(e) {
                    e = this.cache + this.normalizeToLF(e);
                    var t = e.split("\n\n");
                    var n, a, i, r, s, o;
                    for (n = 0; n < t.length - 1; n++) {
                        i = "message";
                        r = [];
                        parts = t[n].split("\n");
                        for (a = 0; a < parts.length; a++) {
                            s = this.trimWhiteSpace(parts[a]);
                            if (s.indexOf("event") == 0) {
                                i = s.replace(/event:?\s*/, "")
                            } else if (s.indexOf("retry") == 0) {
                                o = parseInt(s.replace(/retry:?\s*/, ""));
                                if (!isNaN(o)) {
                                    this.interval = o
                                }
                            } else if (s.indexOf("data") == 0) {
                                r.push(s.replace(/data:?\s*/, ""))
                            } else if (s.indexOf("id:") == 0) {
                                this.lastEventId = s.replace(/id:?\s*/, "")
                            } else if (s.indexOf("id") == 0) {
                                this.lastEventId = null
                            }
                        }
                        if (r.length) {
                            var l = new u(i,r.join("\n"),window.location.origin,this.lastEventId);
                            this.dispatchEvent(i, l)
                        }
                    }
                    this.cache = t[t.length - 1]
                },
                dispatchEvent: function(e, t) {
                    var n = this["_" + e + "Handlers"];
                    if (n) {
                        for (var a = 0; a < n.length; a++) {
                            n[a].call(this, t)
                        }
                    }
                    if (this["on" + e]) {
                        this["on" + e].call(this, t)
                    }
                },
                addEventListener: function(e, t) {
                    if (!this["_" + e + "Handlers"]) {
                        this["_" + e + "Handlers"] = []
                    }
                    this["_" + e + "Handlers"].push(t)
                },
                removeEventListener: function(e, t) {
                    var n = this["_" + e + "Handlers"];
                    if (!n) {
                        return
                    }
                    for (var a = n.length - 1; a >= 0; --a) {
                        if (n[a] === t) {
                            n.splice(a, 1);
                            break
                        }
                    }
                },
                _pollTimer: null,
                _noactivityTimer: null,
                _xhr: null,
                lastEventId: null,
                cache: "",
                cursor: 0,
                onerror: null,
                onmessage: null,
                onopen: null,
                readyState: 0,
                urlWithParams: function(e, t) {
                    var n = [];
                    if (t) {
                        var a, i;
                        var r = encodeURIComponent;
                        for (a in t) {
                            if (t.hasOwnProperty(a)) {
                                i = r(a) + "=" + r(t[a]);
                                n.push(i)
                            }
                        }
                    }
                    if (n.length > 0) {
                        if (e.indexOf("?") == -1)
                            return e + "?" + n.join("&");
                        return e + "&" + n.join("&")
                    }
                    return e
                },
                lastMessageIndex: function(e) {
                    var t = e.lastIndexOf("\n\n");
                    var n = e.lastIndexOf("\r\r");
                    var a = e.lastIndexOf("\r\n\r\n");
                    if (a > Math.max(t, n)) {
                        return [a, a + 4]
                    }
                    return [Math.max(t, n), Math.max(t, n) + 2]
                },
                trimWhiteSpace: function(e) {
                    var t = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
                    return e.replace(t, "")
                },
                normalizeToLF: function(e) {
                    return e.replace(/\r\n|\r/g, "\n")
                }
            };
            if (!i()) {
                n.isPolyfill = "XHR";
                n.prototype.XHR = function(e) {
                    request = new XMLHttpRequest;
                    this._request = request;
                    e._xhr = this;
                    request.onreadystatechange = function() {
                        if (request.readyState > 1 && e.readyState != e.CLOSED) {
                            if (request.status == 200 || request.status >= 300 && request.status < 400) {
                                e._onxhrdata()
                            } else {
                                request._failed = true;
                                e.readyState = e.CLOSED;
                                e.dispatchEvent("error", {
                                    type: "error",
                                    data: "The server responded with " + request.status
                                });
                                e.close()
                            }
                        }
                    }
                    ;
                    request.onprogress = function() {}
                    ;
                    var t = e.urlWithParams(e.URL, e.getArgs);
                    var n = t.substring(0, t.indexOf("?"));
                    var a = t.substring(t.indexOf("?") + 1);
                    request.open("POST", n, true);
                    var i = e.xhrHeaders;
                    for (var r in i) {
                        if (i.hasOwnProperty(r)) {
                            request.setRequestHeader(r, i[r])
                        }
                    }
                    if (e.lastEventId) {
                        request.setRequestHeader("Last-Event-Id", e.lastEventId)
                    }
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.send(encodeURI(a))
                }
                ;
                n.prototype.XHR.prototype = {
                    useXDomainRequest: false,
                    _request: null,
                    _failed: false,
                    isReady: function() {
                        return this._request.readyState >= 2
                    },
                    isDone: function() {
                        return this._request.readyState == 4
                    },
                    hasError: function() {
                        return this._failed || this._request.status >= 400
                    },
                    getBuffer: function() {
                        var e = "";
                        try {
                            e = this._request.responseText || ""
                        } catch (t) {}
                        return e
                    },
                    abort: function() {
                        if (this._request) {
                            this._request.abort()
                        }
                    }
                }
            } else {
                n.isPolyfill = "IE_8-9";
                var a = n.prototype.defaultOptions;
                a.xhrHeaders = null;
                a.getArgs["evs_preamble"] = 2048 + 8;
                n.prototype.XHR = function(e) {
                    request = new XDomainRequest;
                    this._request = request;
                    request.onprogress = function() {
                        request._ready = true;
                        e._onxhrdata()
                    }
                    ;
                    request.onload = function() {
                        this._loaded = true;
                        e._onxhrdata()
                    }
                    ;
                    request.onerror = function() {
                        this._failed = true;
                        e.readyState = e.CLOSED;
                        e.dispatchEvent("error", {
                            type: "error",
                            data: "XDomainRequest error"
                        })
                    }
                    ;
                    request.ontimeout = function() {
                        this._failed = true;
                        e.readyState = e.CLOSED;
                        e.dispatchEvent("error", {
                            type: "error",
                            data: "XDomainRequest timed out"
                        })
                    }
                    ;
                    var t = {};
                    if (e.getArgs) {
                        var n = e.getArgs;
                        for (var a in n) {
                            if (n.hasOwnProperty(a)) {
                                t[a] = n[a]
                            }
                        }
                        if (e.lastEventId) {
                            t["evs_last_event_id"] = e.lastEventId
                        }
                    }
                    request.open("GET", e.urlWithParams(e.URL, t).replace("https://", "http://"));
                    request.send()
                }
                ;
                n.prototype.XHR.prototype = {
                    useXDomainRequest: true,
                    _request: null,
                    _ready: false,
                    _loaded: false,
                    _failed: false,
                    isReady: function() {
                        return this._request._ready
                    },
                    isDone: function() {
                        return this._request._loaded
                    },
                    hasError: function() {
                        return this._request._failed
                    },
                    getBuffer: function() {
                        var e = "";
                        try {
                            e = this._request.responseText || ""
                        } catch (t) {}
                        return e
                    },
                    abort: function() {
                        if (this._request) {
                            this._request.abort()
                        }
                    }
                }
            }
            function u(e, t, n, a) {
                this.bubbles = false;
                this.cancelBubble = false;
                this.cancelable = false;
                this.data = t || null;
                this.origin = n || "";
                this.lastEventId = a || "";
                this.type = e || "message"
            }
            function i() {
                return window.XDomainRequest && (window.XMLHttpRequest && (new XMLHttpRequest).responseType === undefined) ? true : false
            }
            e[t] = n
        }
        )(window)
    },
    "./modules/quote_ts/index.js": function(e, t, n) {
        var l = n("./modules/quote_ts/ts.js");
        var u = n("./modules/datacache/index.js");
        var d = n("./config/webconfig.js");
        var a = n("./modules/modal/alert.js");
        var f = n("./modules/hegui/index.js");
        var c = null;
        e.exports = {
            bindCodes: function(e, t, n, a) {
                if (f.isHKDelay()) {
                    e = f.dealHKStock(e)
                }
                var i = e.length;
                if (e instanceof Array) {
                    e = e.join(",")
                }
                if (c != null) {
                    c.close()
                }
                var r = "";
                var s = "&po=1";
                if (u.pxorder) {
                    r = "&fid=" + u.pxtype;
                    if (u.pxorder == "asc") {
                        s = "&po=0"
                    }
                }
                var o = u.refreshtime;
                c = new l({
                    subUrl: d.getWebPath("quotepath") + "api/qt/ulist/sse?invt=3&pi=0&pz=" + i + "&mpi=" + o + "&secids=" + e + "&ut=6d2ffaa6a585d612eda28417681d58fb&fields=" + t.join(",") + s + r,
                    callback: function(t) {
                        if (t.rc == 0) {
                            if (t.data != null) {
                                if (f.isHKDelay() && t.data.diff) {
                                    Object.keys(t.data.diff).forEach(function(e) {
                                        if (t.data.diff[e].f13 == 128) {
                                            t.data.diff[e].f13 = 116
                                        }
                                    })
                                }
                                n(t)
                            }
                        } else {
                            if (a) {
                                a()
                            }
                        }
                    }
                })
            },
            bindCodesGet: function(e, t, n, a) {
                var i = e.length;
                if (e instanceof Array) {
                    e = e.join(",")
                }
                var r = "";
                var s = "&po=1";
                if (u.pxorder) {
                    r = "&fid=" + u.pxtype;
                    if (u.pxorder == "asc") {
                        s = "&po=0"
                    }
                }
                $.ajax({
                    url: d.getWebPath("getpath") + "api/qt/ulist/get?cb=?&invt=3&pi=0&pz=" + i + "&mpi=2000&secids=" + e + "&ut=6d2ffaa6a585d612eda28417681d58fb&fields=" + t.join(",") + s + r,
                    type: "GET",
                    dataType: "json",
                    data: {}
                }).done(function(e) {
                    n(e)
                }).fail(function(e) {
                    if (a) {
                        a()
                    }
                })
            },
            close: function() {
                try {
                    c.close()
                } catch (e) {}
            },
            bindCodesLite: function(e, t, n, a) {
                if (f.isHKDelay()) {
                    e = f.dealHKStock(e)
                }
                var i = e.length;
                if (e instanceof Array) {
                    e = e.join(",")
                }
                var r = "";
                var s = "&po=1";
                if (u.pxorder) {
                    r = "&fid=" + u.pxtype;
                    if (u.pxorder == "asc") {
                        s = "&po=0"
                    }
                }
                $.ajax({
                    url: d.getWebPath("getpath") + "api/qt/ulist/get?cb=?&invt=3&pi=0&pz=" + i + "&mpi=2000&secids=" + e + "&ut=6d2ffaa6a585d612eda28417681d58fb&fields=" + t.join(",") + s + r,
                    type: "GET",
                    dataType: "json",
                    data: {}
                }).done(function(t) {
                    if (t.rc == 0) {
                        if (t.data != null) {
                            if (f.isHKDelay() && t.data.diff) {
                                Object.keys(t.data.diff).forEach(function(e) {
                                    if (t.data.diff[e].f13 == 128) {
                                        t.data.diff[e].f13 = 116
                                    }
                                })
                            }
                            n(t)
                        }
                    } else {
                        if (a) {
                            a()
                        }
                    }
                }).fail(function(e) {})
            }
        }
    },
    "./modules/quote_ts/ts.js": function(e, t, n) {
        n("./modules/quote_ts/ie_sse_polyfill.js");
        function a(e) {
            var t = this;
            var n = {};
            this.options = $.extend(n, e);
            if (typeof EventSource !== "undefined") {
                this.eventsource = new EventSource(this.options.subUrl);
                this.eventsource.onmessage = function(e) {
                    t.options.callback(JSON.parse(e.data))
                }
            }
        }
        a.prototype.close = function() {
            if (typeof EventSource !== "undefined") {
                this.eventsource.close()
            }
        }
        ;
        e.exports = a
    },
    "./modules/radar_chart/index.js": function(e, t) {
        e.exports = function(n, s) {
            var a = 232;
            var i = 176;
            var l = "#B8B8B8";
            var u = 5;
            var d = a / 2;
            var f = i / 2;
            var c = d - 50;
            var h = Math.PI * 2 / u;
            var r = "rgba(236, 101, 28, 1)";
            var o = "rgba(86, 156, 249, 1)";
            var p = "rgba(236, 101, 28, 0.3)";
            var m = "rgba(163, 204, 255, 0.3)";
            var v = s[0].value;
            var g = s[1].value;
            var x = "rgba(234, 85, 4, 1)";
            var b = "rgba(86, 156, 249, 1)";
            var y = "12px sans-serif";
            var e = 12;
            var _ = "#666666";
            var j = i * .92;
            var w = 59;
            var k = 40;
            var T = 54 * Math.PI / 180;
            (function O() {
                var e = document.createElement("canvas");
                n.appendChild(e);
                e.height = i;
                e.width = a;
                var t = e.getContext("2d");
                A(t);
                S(t);
                C(t);
                M(t);
                E(t, r, p, v);
                I(t, r, v);
                E(t, o, m, g);
                I(t, o, g);
                z(t, x, y)
            }
            )();
            function A(e) {
                e.save();
                e.fillStyle = "white";
                var t = c / u;
                for (var n = 4; n < u; n++) {
                    var a = t * (1 + n);
                    e.beginPath();
                    for (var i = 0; i < u; i++) {
                        var r = h * i + T;
                        var s = d + a * Math.cos(r);
                        var o = f + a * Math.sin(r);
                        e.lineTo(s, o)
                    }
                    e.closePath();
                    e.fill()
                }
                e.restore()
            }
            function S(e) {
                e.save();
                e.strokeStyle = l;
                var t = c / u;
                for (var n = 0; n < u; n++) {
                    var a = t * (1 + n);
                    e.beginPath();
                    for (var i = 0; i < u; i++) {
                        var r = h * i + T;
                        var s = d + a * Math.cos(r);
                        var o = f + a * Math.sin(r);
                        e.lineTo(s, o)
                    }
                    e.closePath();
                    e.stroke()
                }
                e.restore()
            }
            function C(e) {
                e.save();
                e.strokeStyle = l;
                e.beginPath();
                for (var t = 0; t < u; t++) {
                    var n = h * t + T;
                    e.moveTo(d, f);
                    var a = d + c * Math.cos(n);
                    var i = f + c * Math.sin(n);
                    e.lineTo(a, i)
                }
                e.closePath();
                e.stroke();
                e.restore()
            }
            function M(e) {
                e.save();
                e.fillStyle = "#666666";
                e.font = "12px sans-serif";
                var t = 12;
                for (var n = 0; n < u; n++) {
                    var a = h * n + T;
                    var i = d + c * Math.cos(a);
                    var r = f + c * Math.sin(a);
                    if (e.measureText(s[0].item[n]).width <= w) {
                        if (a >= 0 && a < Math.PI / 2) {
                            e.fillText(s[0].item[n], i + 5, r)
                        }
                        if (a >= Math.PI / 2 && a < Math.PI) {
                            e.fillText(s[0].item[n], i - e.measureText(s[0].item[n]).width - 3, r)
                        }
                        if (a >= Math.PI && a < Math.PI * 5 / 4) {
                            e.fillText(s[0].item[n], i - e.measureText(s[0].item[n]).width - 2, r + 5)
                        }
                        if (a >= Math.PI * 5 / 4 && a <= Math.PI * 3 / 2) {
                            e.fillText(s[0].item[n], i - e.measureText(s[0].item[n]).width / 2, r - 2)
                        }
                        if (a >= Math.PI * 7 / 4 && a <= Math.PI * 2) {
                            e.fillText(s[0].item[n], i + 2, r + 5)
                        }
                    } else {
                        if (a >= 0 && a < Math.PI / 2) {
                            $(e, s[0].item[n], i + 10, r - 30, k, "left")
                        }
                        if (a >= Math.PI / 2 && a < Math.PI) {
                            $(e, s[0].item[n], i - e.measureText(s[0].item[n]).width + 60, r - 30, k, "right")
                        }
                        if (a >= Math.PI && a < Math.PI * 5 / 4) {
                            $(e, s[0].item[n], i - 2, r - 14, k, "right")
                        }
                        if (a >= Math.PI * 5 / 4 && a <= Math.PI * 3 / 2) {
                            e.fillText(s[0].item[n], i - e.measureText(s[0].item[n]).width / 2, r - 2, "right")
                        }
                        if (a >= Math.PI * 7 / 4 && a <= Math.PI * 2) {
                            $(e, s[0].item[n], i + 5, r - 10, k, "left")
                        }
                    }
                }
                e.restore()
            }
            function z(e) {
                e.save();
                e.fillStyle = _;
                e.font = y;
                var t = t;
                e.beginPath();
                e.arc(a / 2 - a / 48 - e.measureText(s[0].name).width - e.measureText(s[0].name).width / 10, j, 5, 0, Math.PI * 2);
                e.fillStyle = x;
                e.fill();
                e.closePath();
                e.fillStyle = _;
                e.font = y;
                var t = t;
                e.fillText(s[0].name, a / 2 - a / 48 - e.measureText(s[0].name).width, j + 4);
                e.beginPath();
                e.arc(a / 2 + a / 48 * 2, j, 5, 0, Math.PI * 2);
                e.fillStyle = b;
                e.fill();
                e.closePath();
                e.fillStyle = _;
                e.font = y;
                var t = t;
                e.fillText(s[1].name, a / 2 + a / 48 * 2 + e.measureText(s[1].name).width / 10, j + 4);
                e.restore()
            }
            function $(e, t, n, a, i, r) {
                e.save();
                e.textAlign = r;
                var s = t.split("");
                var o = "";
                var l = [];
                for (var u = 0; u < s.length; u++) {
                    if (e.measureText(o).width < i) {} else {
                        l.push(o);
                        o = ""
                    }
                    o += s[u]
                }
                l.push(o);
                for (var d = 0; d < l.length; d++) {
                    e.fillText(l[d], n, a + (d + 1) * 15)
                }
                e.restore()
            }
            function E(e, t, n, a) {
                e.save();
                e.beginPath();
                for (var i = 0; i < u; i++) {
                    var r = h * i + T;
                    var s = d + c * Math.cos(r) * a[i];
                    var o = f + c * Math.sin(r) * a[i];
                    e.lineTo(s, o)
                }
                e.closePath();
                e.fillStyle = n;
                e.fill();
                e.strokeStyle = t;
                e.stroke();
                e.restore()
            }
            function I(e, t, n) {
                e.save();
                for (var a = 0; a < u; a++) {
                    var i = h * a + T;
                    var r = d + c * Math.cos(i) * n[a];
                    var s = f + c * Math.sin(i) * n[a];
                    e.beginPath();
                    e.arc(r, s, 3, 0, Math.PI * 2);
                    e.fillStyle = "white";
                    e.fill();
                    e.strokeStyle = t;
                    e.stroke();
                    e.closePath()
                }
                e.restore()
            }
        }
    },
    "./modules/sessionstorage/index.js": function(e, t) {
        e.exports = {
            save: function(e, t) {
                if (window.sessionStorage) {
                    sessionStorage.setItem(e, t)
                }
            },
            get: function(e) {
                if (window.sessionStorage) {
                    return sessionStorage.getItem(e)
                }
                return null
            }
        }
    },
    "./modules/stock_filter/filter.html": function(e, t) {
        e.exports = '<ul class="stock_filter" id="stock_filter">\r\n  {{~it.typelist :value:index}}\r\n  <li>\r\n    <label><input type="radio" value="{{=value.type}}"> {{=value.name}}</label>\r\n  </li>\r\n  {{~}}\r\n</ul>'
    },
    "./modules/stock_filter/index.js": function(e, t, n) {
        var a = n("./modules/stock_filter/filter.html");
        var i = n("./node_modules/dot/doT.js");
        var r = n("./modules/popmenu/index.js");
        var s = n("./modules/datacache/index.js");
        e.exports = {
            init: function() {
                this.bind()
            },
            typelist: [{
                name: "全部",
                type: "all"
            }, {
                name: "沪深 ",
                type: "hs"
            }, {
                name: "港股",
                type: "hk"
            }, {
                name: "美股",
                type: "us"
            }, {
                name: "英股",
                type: "uk"
            }, {
                name: "期货",
                type: "qh"
            }, {
                name: "基金",
                type: "fund"
            }, {
                name: "外汇",
                type: "wh"
            }, {
                name: "债券",
                type: "zq"
            }, {
                name: "期权",
                type: "qq"
            }],
            getTypeName: function(t) {
                if (!t) {
                    return this.typelist[0]
                }
                return this.typelist.find(function(e) {
                    return e.type == t
                })
            },
            bind: function() {
                var e = $("#allstock");
                $("#wl_mainbody").on("click", "#clickall", function() {
                    var e = $(".batchselect");
                    if (e.prop("checked")) {
                        e.prop("checked", false);
                        $("#tablethd7 .allstock input").prop("checked", false);
                        $("#clickall").prop("checked", false)
                    } else {
                        e.prop("checked", true);
                        $("#tablethd7 .allstock input").prop("checked", true);
                        $("#clickall").prop("checked", true)
                    }
                });
                $("#wl_mainbody").on("click", ".batchselect", function() {
                    var e = $(".batchselect");
                    var n = true;
                    e.each(function(e, t) {
                        if ($(t).prop("checked") == false) {
                            n = false
                        }
                    });
                    if (n) {
                        $("#clickall").prop("checked", true)
                    } else {
                        $("#clickall").prop("checked", false)
                    }
                });
                var n = $(i.template(a)({
                    typelist: this.typelist
                }));
                $("input:radio:first", n).prop("checked", true);
                var t = new r({
                    target: e,
                    content: n
                });
                $("input", n).on("change", function() {
                    var e = $(this);
                    $("input", n).prop("checked", false);
                    e.prop("checked", true);
                    var t = $(this).val();
                    s.stocktype = t;
                    if (t == "all") {
                        s.stocktype = null
                    }
                    s.changeGroup(s.thisgroupid);
                    return false
                })
            },
            filterCode: function(e, r, s) {
                return e.filter(function(t, e) {
                    var n = r.find(function(e) {
                        return e.f12 == t.split(".")[1]
                    });
                    if (n == undefined) {
                        return false
                    }
                    var a = n.f13;
                    var i = n.f29;
                    if (s == "all") {
                        return true
                    } else if (s == "hs") {
                        return (a == 0 || a == 1) && i == 1
                    } else if (s == "hk") {
                        return a == 116 && i == 1
                    } else if (s == "us") {
                        return (a == 105 || a == 106 || a == 107) && (i == 1 || i == 512)
                    } else if (s == "uk") {
                        return a == 155 || a == 156
                    } else if (s == "qh") {
                        return i == 16
                    } else if (s == "fund") {
                        return i == 8
                    } else if (s == "wh") {
                        return i == 128
                    } else if (s == "zq") {
                        return i == 4
                    } else if (s == "qq") {
                        return i == 32
                    }
                })
            }
        }
    },
    "./modules/tabs/index.js": function(e, t) {
        var n = function() {
            function e(e) {
                var t = {
                    tabsobj: null,
                    parent: null,
                    child: null,
                    type: "display",
                    contents: [],
                    cdtime: 150,
                    switchCallback: function(e, t) {}
                };
                this.options = $.extend(t, e);
                this.cd = null
            }
            e.prototype.init = function() {
                this.bind()
            }
            ;
            e.prototype.bind = function() {
                var e = this;
                if (this.options.parent != null && this.options.child != null) {
                    this.options.parent.on("mouseover", this.options.child, function() {
                        e.showContent($(this))
                    });
                    this.options.parent.on("mouseout", this.options.child, function() {
                        clearTimeout(e.cd)
                    });
                    return false
                }
                this.options.tabsobj.on("mouseover", function() {
                    e.showContent($(this))
                });
                this.options.tabsobj.on("mouseout", function() {
                    clearTimeout(e.cd)
                })
            }
            ;
            e.prototype.showContent = function(e) {
                var t = this;
                var n = e.index();
                this.cd = setTimeout(function() {
                    if (t.options.parent != null && t.options.child != null) {
                        $(t.options.child, t.options.parent).removeClass("on")
                    } else {
                        t.options.tabsobj.removeClass("on")
                    }
                    e.addClass("on");
                    if (t.options.type == "display") {
                        t.options.contents.hide();
                        t.options.contents.eq(n).show()
                    }
                    t.options.switchCallback(n, t.options.contents)
                }, this.options.cdtime)
            }
            ;
            return e
        }();
        e.exports = n
    },
    "./modules/text/index.js": function(e, t, n) {
        var r = n("./modules/datacache/index.js");
        var s = {
            className: function(e) {
                if (e > 0) {
                    return "stockup"
                } else if (e < 0) {
                    return "stockdown"
                }
                return ""
            },
            textColor: function(e, t) {
                if (t == null || t == undefined || isNaN(t)) {
                    return e
                }
                if (t > 0) {
                    return '<span class="stockup">' + e + "</span>"
                } else if (t < 0) {
                    return '<span class="stockdown">' + e + "</span>"
                } else {
                    return e
                }
            },
            textNumColor: function(e, t) {
                var n = "";
                if (e == null || e == undefined || isNaN(e)) {
                    return n
                } else {
                    e = e / 1;
                    if (t) {
                        n = e.toFixed(t)
                    } else {
                        n = e.toString()
                    }
                }
                if (e > 0) {
                    return '<span class="stockup">' + n + "</span>"
                } else if (e < 0) {
                    return '<span class="stockdown">' + n + "</span>"
                } else {
                    return n
                }
            },
            textNumColorPlus: function(e, t) {
                var n = "";
                if (e == null || e == undefined || isNaN(e)) {
                    return n
                } else {
                    e = e / 1;
                    if (t) {
                        n = e.toFixed(t)
                    } else {
                        n = e.toString()
                    }
                }
                if (e > 0) {
                    return '<span class="stockup">+' + n + "</span>"
                } else if (e < 0) {
                    return '<span class="stockdown">' + n + "</span>"
                } else {
                    return n
                }
            },
            formatNum: function(e) {
                if (e == 0) {
                    return e
                }
                if (e == undefined || e == "" || isNaN(e)) {
                    return ""
                }
                var t = "";
                if (e >= 1e8 || e <= -1e8) {
                    e = e / 1e8;
                    t = "亿"
                } else if (e >= 1e4 || e <= -1e4) {
                    e = e / 1e4;
                    t = "万"
                } else {
                    return e
                }
                var n = e.toFixed(2);
                return n.toString() + t
            },
            isHSStock: function(e, t) {
                return e == 1 && t == 2 || e == 0 && (t == 6 || t == 13 || t == 80)
            },
            isHSStockByCode: function(e) {
                var t = e.split(".");
                if (t.length < 2) {
                    return false
                }
                var n = t[0];
                var a = t[1];
                if (n == 1 && a[0] == "6") {
                    return true
                }
                if (n == 0 && (a[0] == "0" && a[1] == "0" && a[2] == "2")) {
                    return true
                }
                if (n == 0 && (a[0] == "0" && a[1] == "0")) {
                    return true
                }
                if (n == 0 && (a[0] == "3" && a[1] == "0")) {
                    return true
                }
                return false
            },
            getLinkByCode: function(e) {
                if (r.islite == true) {
                    return "http://quote.eastmoney.com/unify/r/" + e
                }
                if (s.isHSStockByCode(e)) {
                    var t = e.split(".");
                    var n = t[0];
                    var a = t[1];
                    var i = "sz";
                    if (n == "1") {
                        i = "sh"
                    }
                    return "http://quote.eastmoney.com/concept/" + i + a + ".html?from=zixuan"
                }
                return "http://quote.eastmoney.com/unify/r/" + e
            },
            txtLeft: function(e, t, n) {
                if (e == null || e == "") {
                    return ""
                }
                var a = 0;
                for (var i = 0; i < e.length; i++) {
                    if (e.charCodeAt(i) > 255) {
                        a += 2
                    } else {
                        a++
                    }
                    if (a > t + 3) {
                        if (n) {
                            return '<span title="' + e + '">' + e.substring(0, i) + "...</span>"
                        } else {
                            return e.substring(0, i) + "..."
                        }
                        break
                    }
                }
                return e
            },
            txtLeftPure: function(e, t, n) {
                if (e == null || e == "") {
                    return ""
                }
                var a = e.length;
                var i = n ? "..." : "";
                if (a > t) {
                    return e.substring(0, t) + i
                }
                return e
            }
        };
        e.exports = s
    },
    "./modules/tixing/addtixing.html": function(e, t) {
        e.exports = '<div class="stockalarmset">\r\n  <form action="" target="_self">\r\n  <div class="sastitle"><b>{{=it.name}}</b> {{=it.code}} &nbsp; 当前股价：<span class="{{? it.quotedata.f4 > 0 }}stockup{{?? it.quotedata.f4 < 0}}stockdown{{?}}">{{=it.price}}</span></div>\r\n  <div class="sasaset">\r\n    <div class="item"><input type="checkbox" {{? it.isinfo }}checked{{?}} id="sasi1"><label for="sasi1"> 当有最新公司公告、数据、研究报告时提醒</label></div>\r\n  </div>\r\n  <div class="sasalarm">\r\n    <div class="sasalarmtitle"> 股价预警</div>\r\n    <div class="item">\r\n      <input type="checkbox" {{? it.tixingdata.priceup }}checked{{?}} id="sasi4">\r\n      <label for="sasi4">股价突破</label>\r\n      <input type="text" id="sasinum1"\r\n        class="inty" value="{{? it.tixingdata.priceup }}{{=it.tixingdata.priceup}}{{?}}" > 元 <span id="sasinum1error" class="stockup"></span></div>\r\n    <div class="item">\r\n      <input type="checkbox" {{? it.tixingdata.pricedown }}checked{{?}} id="sasi5">\r\n      <label for="sasi5"> 股价跌破</label>\r\n      <input type="text" id="sasinum2"\r\n        class="inty" value="{{? it.tixingdata.pricedown }}{{=it.tixingdata.pricedown}}{{?}}"> 元 <span id="sasinum2error" class="stockup"></span></div>\r\n    <div class="item">\r\n      <input type="checkbox" id="sasi6" {{? it.tixingdata.pricezf }}checked{{?}}>\r\n      <label for="sasi6"> 日涨跌幅达到</label>\r\n      <input type="text" id="sasinum3"\r\n        class="inty" value="{{? it.tixingdata.pricezf }}{{=it.tixingdata.pricezf}}{{?}}"> ％ <span id="sasinum3error" class="stockup"></span></div>\r\n  </div>\r\n  <div class="sasbtns">\r\n    <a href="javascript:;" target="_self" id="sasclear">清空</a>\r\n    <div class="modalbtnd">\r\n      <button type="submit" class="modalbtn_default modalbtn_default_button">保 存</button> &nbsp; <a href="javascript:;" target="_self" class="modalbtn_cancel">取\r\n        消</a>\r\n    </div>\r\n  </div>\r\n  </form>\r\n</div>'
    },
    "./modules/tixing/addtixing.js": function(e, t, n) {
        var u = n("./modules/tixing/addtixing.html");
        var d = n("./node_modules/dot/doT.js");
        var y = n("./modules/user/index.js");
        var _ = n("./modules/modal/alert.js");
        var f = n("./modules/modal/index.js");
        var a = n("./modules/quote/index.js");
        e.exports = {
            hasTiXing: function(e, t) {
                if (e == 0 && t == 6 || e == 0 && t == 13 || e == 0 && t == 80 || e == 1 && t == 2 || e == 0 && t == 7 || e == 1 && t == 3) {
                    return true
                }
                if (e == 90)
                    return true;
                if (e == 1 && t == 1 || e == 0 && t == 5) {
                    return true
                }
                if (e == 1 && t == 4 || e == 0 && t == 8) {
                    return true
                }
                if (e == 1 && t == 9 || e == 0 && t == 10) {
                    return true
                }
                if (e == 0 && t == 81) {
                    return true
                }
                if (e == 116 && (t == 3 || t == 4)) {
                    return true
                }
                if ((e == 105 || e == 106 || e == 107) && (t == 1 || t == 2 || t == 3)) {
                    return true
                }
                return false
            },
            toTiXingCode: function(e) {
                return e.toString().replace(".", ",")
            },
            getTiXing: function(e) {
                var t = this;
                var n = y.get().id;
                return $.ajax({
                    url: "http://userinfo.eastmoney.com/api/ZxgMsg/UserCfgGet?callback=?",
                    type: "GET",
                    dataType: "json",
                    data: {
                        a: n,
                        b: t.toTiXingCode(e)
                    }
                }).then(function(e) {
                    return e
                })
            },
            add: function(s, e, o) {
                var l = this;
                if (y.get() == null) {
                    _("提醒功能要登录用户才能使用！");
                    return false
                }
                var l = this;
                Promise.all([this.getTiXing(s), a.getStockBaseInfo(s)]).then(function(e) {
                    var t = e[0];
                    var n = e[1];
                    var a = n.f2 / Math.pow(10, n.f1);
                    var i = $(d.template(u)({
                        quotedata: n,
                        name: n.f14,
                        price: a,
                        code: n.f12,
                        tixingdata: t,
                        isinfo: t.isdatainfo == "1" && t.isnoticeinfo == "1" && t.isreportinfo == "1"
                    }));
                    var r = new f({
                        content: i,
                        title: "提醒设置"
                    });
                    r.show();
                    l.bindSubmitForm($("form", i), s, r, a, o);
                    $(".modalbtn_cancel", i).click(function() {
                        r.close()
                    })
                })
            },
            bindSubmitForm: function(e, i, r, t, s) {
                var o = this;
                var l = $("#sasi1", e);
                var n = $("#sasi4", e);
                var a = $("#sasi5", e);
                var u = $("#sasi6", e);
                var d = $("#sasinum1", e);
                var f = $("#sasinum2", e);
                var c = $("#sasinum3", e);
                var h = $("#sasinum1error");
                var p = $("#sasinum2error");
                var m = $("#sasinum3error");
                var v = true;
                var g = true;
                var x = true;
                n.change(function() {
                    if (!$(this).prop("checked")) {
                        d.val("");
                        h.text("");
                        v = true
                    } else {
                        h.text("所填价格不能为空");
                        v = false
                    }
                });
                a.change(function() {
                    if (!$(this).prop("checked")) {
                        f.val("");
                        p.text("");
                        g = true
                    } else {
                        p.text("所填价格不能为空");
                        g = false
                    }
                });
                u.change(function() {
                    if (!$(this).prop("checked")) {
                        c.val("");
                        m.text("")
                    } else {
                        m.text("所填日涨跌幅不能为空");
                        x = false
                    }
                });
                d.bind("input propertychange", function() {
                    var e = t;
                    if (d.val() == "") {
                        n.prop("checked", false);
                        h.text("");
                        v = true;
                        return
                    } else {
                        n.prop("checked", true);
                        v = true;
                        h.text("")
                    }
                    if (isNaN(d.val())) {
                        h.text("必须输入数字");
                        d.val("");
                        n.prop("checked", false);
                        return
                    }
                    if (d.val() - e < 0) {
                        h.text("所填价格不可小于现价");
                        v = false;
                        return
                    }
                    if (d.val() - e >= 0) {
                        h.text("此价格较现价的涨幅为" + (d.val() / e * 100 - 100).toFixed(2) + "%");
                        n.prop("checked", true);
                        v = true;
                        return
                    }
                });
                f.bind("input propertychange", function() {
                    var e = t;
                    if (f.val() == "") {
                        a.prop("checked", false);
                        p.text("");
                        g = true;
                        return
                    } else {
                        a.prop("checked", true);
                        g = true;
                        p.text("")
                    }
                    if (isNaN(f.val())) {
                        p.text("必须输入数字");
                        f.val("");
                        a.prop("checked", false);
                        g = false;
                        return
                    }
                    if (f.val() - e >= 0) {
                        p.text("所填价格不可大于现价");
                        g = false;
                        return
                    }
                    if (f.val() - e <= 0) {
                        p.text("此价格较现价的跌幅为" + ((f.val() - e) / e * 100).toFixed(2) + "%");
                        a.prop("checked", true);
                        g = true;
                        return
                    }
                });
                $("#sasinum3").bind("input propertychange", function() {
                    if (c.val() == "") {
                        u.prop("checked", false);
                        m.text("");
                        return
                    } else {
                        u.prop("checked", true);
                        x = true;
                        m.text("")
                    }
                    if (isNaN(c.val())) {
                        m.text("必须输入数字");
                        c.val("");
                        u.prop("checked", false);
                        return
                    }
                });
                $("#sasclear", e).click(function() {
                    l.add(n).add(a).add(u).prop({
                        checked: false
                    });
                    d.add(f).add(c).val("");
                    h.add(p).add(m).text("");
                    g = true;
                    v = true;
                    x = true
                });
                var b = false;
                e.submit(function() {
                    if (g && v && x) {} else {
                        return false
                    }
                    var e = l.is(":checked");
                    var t = d.val();
                    var n = f.val();
                    var a = c.val();
                    if (b) {
                        return false
                    }
                    b = true;
                    $.ajax({
                        url: "http://userinfo.eastmoney.com/api/ZxgMsg/UserCfgSet?callback=?",
                        type: "GET",
                        dataType: "jsonp",
                        data: {
                            a: y.get().id,
                            b: o.toTiXingCode(i),
                            c: e ? 1 : 2,
                            d: e ? 1 : 2,
                            e: e ? 1 : 2,
                            f: t,
                            g: n,
                            h: a,
                            i: "",
                            j: "",
                            k: ""
                        }
                    }).done(function(e) {
                        _("修改成功", function() {
                            if (s) {
                                s()
                            }
                        })
                    }).fail(function(e) {
                        _(e.statusText)
                    }).always(function() {
                        r.close();
                        b = false
                    });
                    return false
                })
            },
            getTiXingMsg: function() {
                return $.ajax({
                    url: "http://userinfo.eastmoney.com/api/ZxgMsg/GetFlag?callback=?",
                    type: "GET",
                    dataType: "jsonp",
                    data: {
                        uid: y.get().id
                    }
                }).then(function(e) {
                    return e.Data
                })
            },
            showTiXingTip: function() {
                $("#tixingtopbtn").addClass("tixingon")
            },
            removeTiXingTip: function() {
                $("#tixingtopbtn").removeClass("tixingon")
            },
            getTiXingTip: function() {
                if (y.get() == null) {
                    return false
                }
                this.getTiXingMsg().then(function(e) {
                    if (e.price_alert || e.notice || e.report) {
                        this.showTiXingTip()
                    } else {
                        this.removeTiXingTip()
                    }
                }
                .bind(this))
            },
            tixingtip: null,
            startTiXingTip: function() {
                this.getTiXingTip();
                this.tixingtip = setInterval(function() {
                    this.getTiXingTip()
                }
                .bind(this), 30 * 1e3)
            },
            stopTiXingTip: function() {
                try {
                    clearInterval(this.tixingtip)
                } catch (e) {}
            },
            clearAllTip: function() {
                var t = this;
                $.ajax({
                    url: "http://userinfo.eastmoney.com/api/ZxgMsg/Clear?callback=?",
                    type: "GET",
                    dataType: "json",
                    data: {
                        uid: y.get().id,
                        type: "all"
                    }
                }).done(function(e) {
                    t.removeTiXingTip()
                }).fail(function(e) {})
            }
        }
    },
    "./modules/tixing/index.js": function(e, t, n) {
        var a = n("./modules/user/index.js");
        var f = n("./modules/modal/index.js");
        var i = n("./modules/modal/alert.js");
        var c = n("./modules/tixing/tixing.html");
        var r = n("./modules/tixing/tixing_table.html");
        var h = n("./node_modules/dot/doT.js");
        var p = n("./modules/pager/index.js");
        var m = n("./modules/tixing/addtixing.js");
        var s = n("./modules/text/index.js");
        e.exports = {
            showList: function(e) {
                if (!e) {
                    e = "price_alert"
                }
                var t = this;
                var n = a.get();
                if (n == null) {
                    i("只有登录用户才能设置提醒");
                    return false
                }
                this.showType(e, 1)
            },
            showType: function(l, u) {
                var d = this;
                this.getData(l, u).done(function(e) {
                    m.clearAllTip();
                    var t = 0;
                    var n = "";
                    switch (l) {
                    case "price_alert":
                        t = 0;
                        n = "股价提醒";
                        break;
                    case "notice":
                        t = 1;
                        n = "公告提醒";
                        break;
                    case "report":
                        t = 2;
                        n = "研报提醒";
                        break
                    }
                    var a = $(h.template(c)({}));
                    var i = d.fillTable(e.msgs, u, n);
                    $(".txtabled", a).html(i);
                    var r = $(p(u, 10, 10 * e.pageCount, "javascript:;"));
                    $("#tixingpager", a).html(r);
                    if ($("#tixingc").length <= 0) {
                        var s = d.modal = new f({
                            content: a,
                            showtitle: false
                        });
                        s.show()
                    } else {
                        $("#tixingc").replaceWith(a);
                        try {
                            d.modal.resize()
                        } catch (o) {}
                    }
                    $("#tixingpager", a).on("click", "a", function() {
                        var e = $(this).data("page");
                        d.showType(l, e);
                        return false
                    });
                    $("#changetype", a).on("click", "li", function() {
                        var e = $(this).data("type");
                        d.showType(e, 1)
                    });
                    $("#changetype li").removeClass("on");
                    $("#changetype li").eq(t).addClass("on")
                }).fail(function(e) {})
            },
            getData: function(e, t) {
                return $.ajax({
                    url: "http://userinfo.eastmoney.com/api/ZxgMsg/Lst?type=" + e + "&key=" + a.get().id + "&p=" + t + "&ps=10&callback=?",
                    type: "GET",
                    dataType: "jsonp",
                    data: {}
                })
            },
            fillTable: function(e, n, t) {
                if (!e || e.length <= 0) {
                    return false
                }
                function a(e) {
                    if (e.indexOf("(") > 0) {
                        return e.substring(0, e.indexOf("("))
                    } else {
                        return e
                    }
                }
                e.forEach(function(e, t) {
                    e.index = t + 10 * (n - 1);
                    e.code = e.value.stockCode.substring(e.value.stockCode.indexOf(",") + 1);
                    e.market = e.value.stockCode.substring(0, 1);
                    e.stocklink = s.getLinkByCode(e.value.stockCode.replace(",", "."));
                    if (e.type == "notice" || e.type == "report") {
                        e.link = "http://guba.eastmoney.com/news," + e.code + "," + e.value.stockbarid + ".html"
                    } else {
                        e.link = ""
                    }
                    e.stockname = a(e.value.stockName)
                });
                return $(h.template(r)({
                    list: e,
                    dealStockName: a,
                    typename: t
                }))
            }
        }
    },
    "./modules/tixing/tixing.html": function(e, t) {
        e.exports = '<div id="tixingc">\r\n  <div class="tixing" id="tixing">\r\n    <div class="tab2 tixingtab">\r\n      <ul id="changetype">\r\n        <li class="on" data-type="price_alert"><a href="javascript:;" target="_self">股价提醒</a></li>\r\n        <li data-type="notice"><a href="javascript:;" target="_self">公告提醒</a></li>\r\n        <li data-type="report"><a href="javascript:;" target="_self">研报提醒</a></li>\r\n      </ul>\r\n    </div>\r\n    <div class="txtabled"></div>\r\n  </div>\r\n  <div class="pager" id="tixingpager"></div>\r\n</div>'
    },
    "./modules/tixing/tixing_table.html": function(e, t) {
        e.exports = '<table class="txtable">\r\n  <tr>\r\n    <th>序号</th>\r\n    <th>日期</th>\r\n    <th>类型</th>\r\n    <th>内容</th>\r\n  </tr>\r\n  {{~it.list :value:index}}\r\n  <tr>\r\n    <td>{{= value.index + 1}}</td>\r\n    <td>{{=value.value.showtime.substring(5, 16)}}</td>\r\n    <td>{{=it.typename}}</td>\r\n    <td class="txtd">【<a href="{{=value.stocklink}}">{{=value.stockname}}</a>】\r\n    {{? value.link }}\r\n      <a href="{{=value.link}}">{{=value.value.content}}</a>\r\n    {{??}}\r\n      {{=value.value.content}}\r\n    {{?}}\r\n    </td>\r\n  </tr>\r\n  {{~}}\r\n</table> '
    },
    "./modules/trend_kline/index.js": function(n, e, t) {
        (function a(e, t) {
            if (true)
                n.exports = t();
            else {}
        }
        )(window, function() {
            return function(n) {
                var a = {};
                function i(e) {
                    if (a[e]) {
                        return a[e].exports
                    }
                    var t = a[e] = {
                        i: e,
                        l: false,
                        exports: {}
                    };
                    n[e].call(t.exports, t, t.exports, i);
                    t.l = true;
                    return t.exports
                }
                i.m = n;
                i.c = a;
                i.d = function(e, t, n) {
                    if (!i.o(e, t)) {
                        Object.defineProperty(e, t, {
                            enumerable: true,
                            get: n
                        })
                    }
                }
                ;
                i.r = function(e) {
                    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                        Object.defineProperty(e, Symbol.toStringTag, {
                            value: "Module"
                        })
                    }
                    Object.defineProperty(e, "__esModule", {
                        value: true
                    })
                }
                ;
                i.t = function(t, e) {
                    if (e & 1)
                        t = i(t);
                    if (e & 8)
                        return t;
                    if (e & 4 && typeof t === "object" && t && t.__esModule)
                        return t;
                    var n = Object.create(null);
                    i.r(n);
                    Object.defineProperty(n, "default", {
                        enumerable: true,
                        value: t
                    });
                    if (e & 2 && typeof t != "string")
                        for (var a in t)
                            i.d(n, a, function(e) {
                                return t[e]
                            }
                            .bind(null, a));
                    return n
                }
                ;
                i.n = function(e) {
                    var t = e && e.__esModule ? function n() {
                        return e["default"]
                    }
                    : function a() {
                        return e
                    }
                    ;
                    i.d(t, "a", t);
                    return t
                }
                ;
                i.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ;
                i.p = "";
                return i(i.s = "./index.js")
            }({
                "./index.js": function(e, t, n) {
                    var h = n("./modules/candle.js");
                    var p = n("./modules/axis.js");
                    var m = n("./modules/average.js");
                    var v = n("./modules/img.js");
                    var g = n("./modules/text.js");
                    var x = n("./modules/dealarray.js");
                    var a = n("./modules/int.js");
                    var b = n("./modules/canvas.js");
                    function i(e) {
                        this.options = e;
                        var t = this.options.ele;
                        t.innerHTML = "";
                        var n = this.options.width;
                        var a = this.options.height;
                        var i = this.options.data;
                        var r = x.deal(i);
                        this.statdata = r;
                        var s = b["new"](t, n, a);
                        var o = s.getContext("2d");
                        o.translate(0, 18);
                        var l = b["new"](t, n, a);
                        var u = l.getContext("2d");
                        var d = b["new"](t, n, a);
                        var f = d.getContext("2d");
                        g(u, n, a, i, r);
                        var c = new Image;
                        c.src = v.logo;
                        c.onload = function() {
                            u.drawImage(c, n - 108, 0 + 26, 100, 26)
                        }
                        ;
                        p(o, n, a);
                        f.translate(0, 18);
                        h(f, i, n, a, r);
                        m(f, i, n, a, r)
                    }
                    i.prototype.getPrice = function() {
                        return {
                            yl: {
                                price: this.statdata.yl.num,
                                date: this.options.data[this.statdata.yl.index].d
                            },
                            zc: {
                                price: this.statdata.zc.num,
                                data: this.options.data[this.statdata.zc.index].d
                            }
                        }
                    }
                    ;
                    e.exports = i
                },
                "./modules/average.js": function(e, t, n) {
                    var d = n("./modules/int.js");
                    e.exports = function(a, i, e, t, n) {
                        var r = n.num_min;
                        var s = n.num_max;
                        var o = t - 18 * 2;
                        var l = (s - r) / o;
                        a.strokeStyle = "#5a85ff";
                        a.beginPath();
                        var u = e / i.length;
                        i.forEach(function(e, t) {
                            var n = d["int"](o - (e.d5 - r) / l);
                            if (t == 0) {
                                a.moveTo(u / 2, n)
                            } else if (t == i.length - 1) {
                                a.lineTo(d["int"](u * t + u / 2), n);
                                a.stroke()
                            } else {
                                a.lineTo(d["int"](u * t + u / 2), n)
                            }
                        });
                        a.strokeStyle = "#ff10ff";
                        a.beginPath();
                        i.forEach(function(e, t) {
                            var n = d["int"](o - (e.d20 - r) / l);
                            if (t == 0) {
                                a.moveTo(u / 2, n)
                            } else if (t == i.length - 1) {
                                a.lineTo(d["int"](u * t + u / 2), n);
                                a.stroke()
                            } else {
                                a.lineTo(d["int"](u * t + u / 2), n)
                            }
                        });
                        a.strokeStyle = "#018101";
                        a.beginPath();
                        i.forEach(function(e, t) {
                            var n = d["int"](o - (e.d60 - r) / l);
                            if (t == 0) {
                                a.moveTo(u / 2, n)
                            } else if (t == i.length - 1) {
                                a.lineTo(d["int"](u * t + u / 2), n);
                                a.stroke()
                            } else {
                                a.lineTo(d["int"](u * t + u / 2), n)
                            }
                        })
                    }
                },
                "./modules/axis.js": function(e, t, n) {
                    var s = n("./modules/int.js");
                    e.exports = function(e, t, n) {
                        e.fillStyle = "#fff";
                        e.fillRect(0, 0, t, n - 18 * 2);
                        var a = n - 18 * 2;
                        for (var i = 0; i < 5; i++) {
                            e.beginPath();
                            e.moveTo(0, s["int"](a * i / 4));
                            if (i > 0 && i < 4) {
                                e.strokeStyle = "#dcdcdc";
                                e.setLineDash([4, 4])
                            } else {
                                e.strokeStyle = "#dcdcdc";
                                e.setLineDash([0, 0])
                            }
                            e.lineWidth = 1;
                            e.lineTo(t, s["int"](a * i / 4));
                            e.stroke()
                        }
                        for (var i = 0; i < 5; i++) {
                            e.beginPath();
                            var r = s["int"](t * i / 4);
                            e.moveTo(r, 0);
                            if (i > 0 && i < 4) {
                                e.strokeStyle = "#dcdcdc";
                                e.setLineDash([4, 4])
                            } else {
                                e.strokeStyle = "#dcdcdc";
                                e.setLineDash([0, 0])
                            }
                            e.lineWidth = 1;
                            e.lineTo(r, a);
                            e.stroke()
                        }
                    }
                },
                "./modules/candle.js": function(e, t, n) {
                    var h = n("./modules/int.js");
                    var p = n("./modules/img.js");
                    function m(e, t, n) {
                        var a = "#ff0000";
                        if (t.c < t.o) {
                            a = "#008000"
                        } else if (t.c == t.o) {
                            a = "#666"
                        }
                        e.fillStyle = a;
                        e.strokeStyle = a;
                        e.beginPath();
                        e.moveTo(t.x, t.y);
                        e.lineTo(t.x, t.y + (t.h - t.l) / n);
                        e.stroke();
                        e.lineWidth = 1;
                        var i = (t.c - t.o) / n;
                        if (i == 0) {
                            i = 1
                        }
                        if (a == "#008000") {
                            e.fillRect(t.x - t.w / 2, t.y + (t.h - t.c) / n, t.w, i)
                        } else {
                            e.fillRect(t.x - t.w / 2, t.y + (t.h - t.c) / n, t.w, i)
                        }
                    }
                    e.exports = function(r, e, t, n, a) {
                        var s = t / e.length;
                        var o = s * .75;
                        var l = n - 18 * 2;
                        var i = a.num_max;
                        var u = a.num_min;
                        var d = (i - u) / l;
                        var f = a.zc;
                        var c = a.yl;
                        e.forEach(function(n, a) {
                            m(r, {
                                x: h["int"](s / 2 + a * s),
                                y: h["int"](l - (n.h - u) / d),
                                w: o,
                                c: n.c,
                                o: n.o,
                                h: n.h,
                                l: n.l
                            }, d);
                            if (a == f.index) {
                                var i = new Image;
                                i.src = p.zc;
                                i.onload = function() {
                                    var e = h["int"](s / 2 + a * s);
                                    var t = h["int"](l - (n.h - u) / d) + (n.h - n.l) / d;
                                    r.drawImage(i, e - 5, t, 9, 12);
                                    r.beginPath();
                                    r.moveTo(e, t + 1);
                                    r.lineTo(e - 50, t + 1);
                                    r.strokeStyle = "#f87101";
                                    r.setLineDash([3, 2]);
                                    r.stroke();
                                    r.font = "12px Arial";
                                    r.fillStyle = "#f87101";
                                    r.fillText(f.num, e - 50, t - 3)
                                }
                            }
                            if (a == c.index) {
                                var i = new Image;
                                i.src = p.yl;
                                i.onload = function() {
                                    var e = h["int"](s / 2 + a * s);
                                    var t = h["int"](l - (n.h - u) / d);
                                    r.drawImage(i, e - 5, t - 12, 9, 12);
                                    r.beginPath();
                                    r.moveTo(e, t + 1);
                                    r.lineTo(e - 50, t + 1);
                                    r.strokeStyle = "#31a0ff";
                                    r.setLineDash([3, 2]);
                                    r.stroke();
                                    r.font = "12px Arial";
                                    r.fillStyle = "#31a0ff";
                                    r.fillText(c.num, e - 50, t - 3)
                                }
                            }
                        })
                    }
                },
                "./modules/canvas.js": function(e, t) {
                    e.exports = {
                        "new": function(e, t, n) {
                            var a = document.createElement("canvas");
                            a.width = t;
                            a.height = n;
                            e.appendChild(a);
                            return a
                        }
                    }
                },
                "./modules/dealarray.js": function(e, t) {
                    e.exports = {
                        deal: function(i) {
                            var r = i[0].h;
                            var s = i[0].l;
                            var o = i[i.length - 1].l;
                            var l = i.length - 1;
                            var u = i[i.length - 1].h;
                            var d = i.length - 1;
                            var f = i[0].h;
                            var c = i[0].l;
                            i.forEach(function(e, t) {
                                var n = Math.max(e.h, e.d5, e.d20, e.d60);
                                if (n >= f) {
                                    f = n
                                }
                                var a = Math.min(e.l, e.d5, e.d20, e.d60);
                                if (a <= c) {
                                    c = a
                                }
                                if (e.h >= r) {
                                    r = e.h
                                }
                                if (s >= e.l) {
                                    s = e.l
                                }
                                if (t > i.length - 20 && o >= e.l) {
                                    o = e.l;
                                    l = t
                                }
                                if (t > i.length - 22 && e.h >= u) {
                                    u = e.h;
                                    d = t
                                }
                            });
                            return {
                                max: r,
                                min: s,
                                num_max: f,
                                num_min: c,
                                zc: {
                                    num: o,
                                    index: l
                                },
                                yl: {
                                    num: u,
                                    index: d
                                }
                            }
                        }
                    }
                },
                "./modules/img.js": function(e, t) {
                    e.exports = {
                        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAABSCAYAAAA2Lk16AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEREJGMDUzQkZCQzUxMUU1OEY5M0QwOTQzOUVCOTg4QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEREJGMDUzQ0ZCQzUxMUU1OEY5M0QwOTQzOUVCOTg4QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkREQkYwNTM5RkJDNTExRTU4RjkzRDA5NDM5RUI5ODhBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkREQkYwNTNBRkJDNTExRTU4RjkzRDA5NDM5RUI5ODhBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TKYRegAAHUBJREFUeNrsXQlzGzey7uElniIlWZct2bItOxu/3fe26v3/n7Cvaispx4kTW5Zk66RO6iBFDh+RbWQgCOcMZkha6KqpxBQ5gwEaX3/daDSC4XAIXrx48eLloRSCIJi2Ns+OrqvRNfDD58WLlySiI4i5KXynudFVZf5d9sPsxYuXNGTaADI/uuZH1wzz2RP8zIsXL14eNUAuYZvzzGed0bUxuhp+OL148fJYAbI4upYZJknldnSRQOqr0VViPi/44fXixctjAcjnDDCykdUeA4jPmc9JrLLph9iLFy9xZVpY1uLoajH/ZlewQ+b/m/i9s9F1PLp+HF210fVtAt+pYRAWuBldp1OqW4TV1zXf6TIG7nuXmsZgH0B2mRlLmrl/jXPIA+QUtJGk9axzn6kU6RkOLmGZO6PrLfxnUWeLY57jDhe80vQ/aesvU+6dvNV8Zy9l40U8jmXB5/3RdYgGqo5grhPymyu84gLkquLvxxkCJOmTkuLvbQ+Q0wGQNQQSXoFvOabCSplhkZej6wKiVe7PExQu0PX9ITJIL8kAUgRKPdSbtRj3JIuCn0bXne/e2LKp8C5ORtc2/CeVj8zbiqEBi+fmRHngQ/RoyPieDYfDcNIBsongKIqTsgBZkrjk1ALuIwudR6XeHfN7LXDhApBM4D0/j1J1/5fQre0pwHUeHubZ1lEvf/XdmMi7yCv+thzTeLkQgh39EXB+HoHkxaQCpKqDupwrMiNxy4sIiJfIxCp43xt0IcYhJUG4QCRb4HcKpR3i+A11QyUEQP+GusODJGE41xm3u6pxjYm3FAqMQYFjYTpGltM8h5eBQ30tI4kgTO4I57vr0BiNj69ISCL57PUIJN9PGkCS9myAOpjdEbjhImlhB9OYyhrj3l5xLDQr2VBYTipHBhPXSzLpG/ZxyOkOr3dZA+QSgodMfkJGPINMqAnxdprN4WUjQ5xTV9hnnZjvWMM5sJ1yX5J2no+udxKDQYzEyiQBJNkR88zA7T8XWHOQsMgjJq6xxrw4AaoPDtmuibUl3zFJZg8MWWZcuQQfgA85xiIL44QgjzXmJ/TdSFjgBfNOLtkd++55gd5W8HqSAOQIwO9k1Fe3COSyeVmfBICsISDUDBX7nEN5GUCyL33HuNn0mYsMgCaRBYELltRQpC1+hTKSNxID9wsyxEDhhm5Yuo4qWWOAez+mh0P0+iXq+iHOlbQWk8j7vFa8F10HuIhhwLPMNumrQjHjBEgymE+R6ZnKKWf9WyBPdicWrsgoyAUHZKvoCoQJ3+MTqBPua3A/gV0mOwncEhu504Q4XIG9ySYEU1atk2sYT8x2weG9WJe2HRMgSUxtD6+0QYa07wDZqkxmpsBAKuOxhTE0poWxlHqM3x8K3AmdlaOA0IH7OXFFbMe+A0VRgcQrQ0Z3OAHKUkdWkCXAuAAZkwWXNOQPi+82Nd7BF4bNxE3vOnWgzzaiA+E45IMYzbcSI7jLzHsTT2uH6ctNgdHWGtWsALLMTIZizHtcwP2g+AzotxKyrpNI6WiqR1rWdt3AivYh/YC0DbvUud+zBuywo3FdsnSTJiVUUTLQ76S7ik4YvUtTyHOuUrp3D6IsFN4T+4pzdd7Q85jH38h2MZ2Ok0FWkC2Sq+rgft8E4KYTNpDcRYuW41jkHKNYLqVlYeUmJen4yoAV/bcBQH4DvxI/TllK+f7XKQIkkXPB3Mkh0F1ZhGWaCJAtxXNaWQFkHhs+i5fL+ANvsUqG4BMIGBLfricpAGRRE5thGciJYFADR6wlDTFZvfXneIxX0t6i2mNAKyuAJFK3fG4FMa6hYO2pAWQZmWEdr0pKnTWAh7tfVg07aShwxXiAbGA/uHTT1g36diBxrV9qQOhfY5x4gWG/h/C4JAB16CjrghxZ5WfqFljjsswLnLuBxfMuJUAow6ZrE8/NBCBzCIYVBER6ZVUqbZt7kSqYp8KEAoCUucPHjtrbBLMk212Yvv28+Zj9/r0LmR/vFH//v+/wnWs4F3sKkIu7GYPojyg/sa7QQTKffhR8/kyCVecmDSkILCFlhFUExXEu1Z9wLihp33OL3/cNXb9ZRwCZM2xfxyEge4Acv6gWYO4chhwIWeCTqOcZ9jrHPYs8+xT/Pgvuktsps/uKTCyNXWkXAoAMQLye0cF23AjYYlnhxlsBJAHFDZic3CXywl+4z5bALKHc1rWpO2rzU9CvVg4F7/W9AeRj20deysi9FhmeRZCHty5xzJ5DihVxEGw+Ox73C2R/ps+nvzEJ9d2Zuv8Fxm19A5NTYZy8wB+cQlQsOoxKV8DwRFJEJU+izDNgtnoYd5eEZ5CTK0WNLo+zXesIILcxmSwtdjGvmD8krLQKbitlXaMHaBIGZAFy2RB8jYQ+fG2CwJFYoY8cWNGEaxsr2BNYNNUEryYEyBWD9t1Btom8rqVgMamG+P0qPKwmo2PYdA/07ZSw0awYpK0Q9/J3U3dSI4SNvtTMnzTc7HmDeX7DtDE0wLJzG4WvwOScCNjHAeWTul+AfVWSG0tLn+R87QDMjp79OuXsyjTFh/THBvZJUteOHjtxBONLCE/CIMcJkB1H4Ahj8nouDebVOad7l6DfQGLFIFsTomRE+X8TANsKxDv3+koAYsWYLMAEOHRWizChE5huMQFIYgDIti5aDsyEBeYhWhTkhVaIIa7TFkxmoY1JZZDTLiZAdiYA1aYGF4y9EgKQ9QnoiFtkjnzMkKzKPYt5z46AIarYTJLFqRDEeVs8CNB40J2GjUJKrsxtQgabN/wOeb+fY4DDLIZS8pL7vkIj2pmwiTypAFnD+e2ivypjaH8PMWFGQTouLUHVqrpQAca/ak0a/EmA6g1NzEPn5l1ZDnCSpPkQ2aGu8MIiXknkxwS/TVrUIW+o1J8S6MI3kO8lpufIfIDJEZ33ME6A7CKbb6NnFmeRJgdRYReVXKeID4sK93ooCMn0FEbLSv8LCV3LpEImw57E8m1C/PhVR8CUagaKkES+ICg3UaHitl0H5EkO8ho4AAOTUEkSOQd1sYUa3C9jN24pagz1ONtJnk2qRD1P+TnnkN4ZSucKgDxVgOCCRP+t2HQB0s2PUlnVLQma10FcmshGziT3TRMgyWQ4guRFeP+pAaL3Y5xwJix74KAfdTIzQQA5o2FwaUtbQXK6qI8diCrkuJrvIUSnAKa5gCNbmR4q2KAMIC9sWfQ4CuaSHSS7kolEBvG1A7A6E1j5KniZBoAsGk7OSZFxA+SBwXduYHqPEB4qAFIGdjKDUY6j8LrFBVdCrMy2AvUJ4r9w0JYOPIz7zIKXrAAyqeSnrE/GDZDfu1QlekcAswHiNCbZKnYFLDeEFNDip6n4A4xPHEoQnwAiWaledvQ80ZGuc2McYN3CDDEYtocU6VKfSH+fjgkg+xk8Y5KSx7MGyBqo4+lt7J8Kfi+rDSA91GXXY6NK2WkJADKv6R+rugu0zFcaABli/GNfMWkImpOValepRuQ5J4J3nDVsb1oAqVp4iROz7IA6/WkxJYDMGY5B2i72JNWbLGcMkHRbn8rgPgN9snRa7jBx+b86vGdL87dtTh/mDO5nBZBdSLaLRNRJxwiMKipLXOp1xy7VngDoFgzd9jR2aVQ14DiMCWQdUOeHNcD9Sm+QUT9mzSCDhL9VZYGMY/fJM2zTgcLolzVAsq8xQnUQ774L0LsJwc2q9oxm/hSQLbIr07pNJQ009KGpMrrK0xogMB5oJiYZnOfgfnvjncQyLFq037XoBusyAaAQV+qpxgC53PdtepZQUiZuApCuGGRO8V5ET3W5fSUFwA5hPDmQRI9/0fRRywAgdfNhU8FSlw1A1kRMQmMtBiBNTslUxS6FX046iMRKkhjaT6AuAptD1+AdpLP3W8Qem2CeCO9amQPQJ463E9xft23R9fnaRYsJmjZAugqHqEI7q4YMR6VP4wgF7GX0XBXA5B15pXOW35lzeN97LnYcN/oMGZvJ1p0mmJ3wF1duJOxxxeIergFyXjPZB5BsX3EX5GXm6eRtgLvDs7IyNDqAdBkrXtJ4OibHCqvGZxwSTshzkobO6AkGOilBdJiXKfC1TN3sgmWc5ApZz6mha1hAdzrtVeRdgdVsgN3ij2uA1Ln2Jw6Uua1h44sOAdJ0L27SuKcOIIcO30e3kEEM7BaI42mXGg/hsaf4JE3Xs/GAFlDvTItp5/E3RybKqBvIK2Q6p5aDTlD6BaSfO3ciYbFPY4QKXEnNYLCOHDyHjMmaoo/nkPl1HQGKiWeRNoO0ceFphSgR+3li+M6EoXyT/P15iobiMUteMj59/Fsg8Nb6ChKxIDF+xybKGML9zd1EyTsIimcxFX4ZJ27aQjplRwLOtqlDLgFSl9PZATc7G0Ic5BWNG7mT8DmBYX92EzK8wDGDDCUMOm/BUFYloZAZjYs9rqrxbwz6SOf+/mAIYmnJCohTyg5BfORzXjIHKD7k4WG6UMlgnv6ljBeoTBcQ7X1MQo3XMlKGXYHlCGI8v+swdqNLoaAD7Up0AEnGYz8ho6kYToikFV2yWqBZAvME6ipOrjMBa1Gx3HMYj5gspunc35KDeyTRtXlJSGMfx60m8GgCgSHdwrEg/30LD2OaT3XeFVXILw4HJytwPAXxKvAK2C8GuSzVpHPte+C26GsXJ6MsnkazB7YTPMM0hpy07qAJCLtYJbfdtcWzyJyGge4IgDyrHS3vDbw+AvivFX//yaCfidu6kUL7q4L5cgjRTjzSrl9xTOYlBuESwyIdRmdIibxFHLcKA6rlpBbbRhYgm720PQmoz4DdyjWVK0ftqhmAyQG4T8M4AvWCwxNUsLhun2lF96SsySQ1JClArkh0lIaWGgYsckXCsgYIju2YzM5LtBBMPMMbic4O0HvcxX4tc6GNO8n4UqDNI1bkkdDUswLIrKqTy46Y3IhpqV0B5LoBsKsCw7mYBuYcWXBV4Q6RBYXfYty7Zehy0SIhLYi/J9ckqT9JbK8M8tSeIzRef5e4j5RFtiDKkaT1Hq/xnU9AvligW7Qbghc6vjYLmHcxwkcDxmvMZckgs7CSuxJXbjkmQA8dudgmZ3bvYBsvJRNiLsEkIvdWBdcbCEC2q+erht/bZxT2HxAt8pmAJTEKZIucyZ75uG48AT1ZtShaUKWPBmxRwyL/BQ/z6OZx/GhpsQEH/DXNuLra6jopp5NOg5RAnZ3RL0zZC52AuP5dnDOz2QmXNPBv8vxdnFzPMP5DV7Lp8bQqdsMyUNV77GhY7BrYraAvglmy7injXl/hu76AKL3ilnF9hhxozaDRMJnYslVp03epK8CdAtRXbLeoPc8gKvPP6wwZ2zfMM9hzinTvdu2QQS6A22IRccMh46jZWUSX+dzAMOdAX16x5xog08z9Ikr0RfKitmdms3KRsF2kD1UV0O8QMOjWwG9ouebBvk6lLhRwiBP9KYgXqnI4iT+APpA/Y2h0iCJucZ8d4wTZgCgQ7mLrmckeYdXEkbG3I45NnoI4d44asQMJIPyOxq9hyeRcnna5AlE8dagw6CqpawCupjHmAxhPgd47HDtadJvGMLvYppDRbZPQ0blrgCSNSaPMUheVTzRoLxJOviQAWcTByCMwDfC/9ND7Djws807TD+7AfjW1bTjZTiGquFJGRcgjmOcQ0P8AeYpDHr+T17iFhwj4oaQd18haXejEBcQrvhGA/KRECuY86O7hBMpLWOSFBADIfT7iOy8Ztk+2TTaudCzCIjLZdBAGG1fVdzI2ZJX7JURHBsfFnCPXuUzzEP8kQmkcAF9YFJxfAv3CiO7e/x5jyKCO7TdxY9sCppaWm7IpaVMPWewlmG83pe9JVtLnIF6M7BDE20lNwHEDxKvwAwTcfQXLWgfxqjbph180719DoGpqwOyTpee1AupMjQ/Yz1XIvjr7LeqpztN5C/Itsq70nKZiLYP9wYTEsH8aDodd1wBJGvIPx+D4m8RaN9BdTPIOx+AuBzQpULbwnWY4xb5BF/AYslnprDIKFeJFVwpDB0pLz2qmzynBw8XCEJW0g+8dZ6tkgJNjlgHEAQfyJu9TxnuU0XjkmUm0azgnGnD/6IAeRJsyHqO8Avmi1alhv9pIDcewynhUOQFjvMLnn43A8S8lci1/A/NN43HBcQafkzRE8BGSxyDTEBrYHzyiSZPD9w7Bp7x4yUaIsRth4TBUKaVrcRFwvkO3+kbyUpsOwHEwwRZ8+MjAkbLGgQdHLxnKQAWOaQHkaUIlv8E4yq2EWb0CNyui534yevHiJWuAJOwv7l7jS2SOshSUVXB3hGvbD78XL16yBkgicWodEtf8o8K1JHHNFUftu4PHGyD34sWLoaS1k+YSXWRTV5jk0ulOQVsHd4tKJ969jmVMaQFeeuTGje8WLx4g47NIXY4irdWmc8mb4GZl3LvX8YUsjLG5ayTcQWLF175rvHgXOx4IqVaISI7bezCLV847bJerat6PSUTHaZqc2ujFi2eQCnZIknz5LVchutQHFvdyeUzskR92Z3qS913jxQNkMjBiAZKwRVJxxvacG1dl1Ejy+WlGfRtAtEuE7tHuJ7hXEaK91Oye7zhtogcfDfAeaeZckvauMEbujDGO9GyYGr4fLXJAvI9bzkASL4Luq6W7YU4M+4DuhqlCtBuG/K4L0X75UOPB0GLQJKTwFdtK+nAO713Cf9PjeE9Bv1MngOj0TbpTh5Y+u8G2yYpOBDi3Gvj/bRDnIJN2PcP/3mLfJz0vpwrR7qAijnEf7tcfMH13unuMvjtbX/Na83uqVznUq31GrxawX1V6VQ+CYAH7PsBn/1mwdzgc3tGHpC10O+BXiF+Y9n8dtWUf0i0FVcAJ30Ll4fuXbjE7NugLMrCkRFcTgUE0ViEq5CnIj5HN433mFPfp431OOAOyhuCQl4RjaNmvISr0Z8FkJvfgi3J8RiCRJfwP8TtE6V8oXHny7C8g35xQxefrPBDy/oeoH3z7m/CweMMx6tEmyGPjZKz/UEzyRZBXJmflDj0uvqDFC3h47AMp6MJXded3tpH7/Qzxto3OItjqagcMsH9k3toSvruO+FzhfUQZJ8/gYVbLFwTC15J700IxRMefg/zYDNI32yOQbGcBkDlIvof372B/zoyoc34G9+dfsyzjuYXbSSb1toS9kUn5CuxixLc4QbocQGxaMvALvA95j/+x7IMPAuB/Bw8rqnRAfxAYLTv2xGBcRYtFLbAvg3cJD6tGiQC+j/1cMwA3ERi9BPu4+gkaDSr/FPTfGYIylRoCpMk46WQR1MfciuQLB+x0o0fL8j7bArD9UQDUHWSDBY1enYBZ9foPWVQfdlH2yMV+6dOUwfGlZUxuHsErEBiUl2C/gFaG+5WUcgpwHCrGZRYVeGDpwsvOxBb1Sd2gr0yPZg0EADaDfWFLABrwsAZmIPEUTLIqigL2uywBxxDZ3zGIFxHnOcZ0K2l/wBlamTG1kVoMcCTC1+BciQGOgM+uGoxL3SBsmDcExz/HaloqirctXkrlXqchpMNl6Ux7EG1pnBO4BHV4WIC1KACPO/wOPaqBTuScQJELyHBmJeDIlg4r4wTmj0HtM8ysiYCzLHGBaE5pB+xjorSYqa7A7A3eu6GYGPxEzEnau4VAThl/IGBKB4bGlMasVAWB6wz7oSdMilgNv71W5EKv4r0GyBZrAl2sQXQshSi00AH7mPMzxfvvQZTzvMT1A411D0F+djVgCIEeprUG4qNHniK7N5EutkmnVzr9q08LQNLyVHFXs2UFTl3IgsRq7ePAU7lWMIpDJvbVhehwqD5Eh0kNOMBognjbJR1oWWxrBi96DMJXvP88KneHifn08PlVCUDeQvwzvqkrTwH/reR7bEk6Wb3RIscsZGf7bDEgdIzvtShgJi2D9yJ9854Zlw0Qx0qLHDvPS7ybW4EheyIY2xYShrYEuBo4hnkJy7XNAS4o5t3vTGjjEvv0KaMr3xi9nlUYrT3GUGxJ+ol+pgN30o6P+FxinH5QkK4tUtYsCALZMbjFaTqTZhfjKXHipgcptmtWYV0bAqYgmkBlDsD/YCwvq6hFBLeGgbGQsbkmXgNUTrbuYpZVoNn6lrQ2Y07CeFnll7nZrAEQgVBfAEKXID+gSyfn3Hi2QZ8XWlWMyTsDF5J6CW0cX9F56LMIOHXBPUKwz+KoKlj9tSDMQg1uyOlTVQFofBuvBPOKvEsF9Ie2sXpF2XJeo1cdlXWYFrnGl7I9puAK0q35KFs8Wre8x40kFliDKA3BRs5Avd0zj8+YZRSzjVa/n8F4dgUAVpIwNXbymDAeU4PRU8QOddI3MH6m9y2C+UJayIFyUwCgeYnhPovhXhcNx0/VN6r72IyLSWXwO8G45DXPkOr7tB0R+S2Gq/wt5TYlTZYOOUtcRjaxiS5WJSZrJlb0VzCvrJRDNvUOkmcMjFOGFrqeNwAhlxImfK8O5w2dCwAvUHgYbQUDL0n6KEwAVib3yVvg0iANPaHVw6edQdJOJmd4/GgI7mmzR2qxRNbxxICJ0WB7j1GMNwrl66GBoC6I7hzwPrrrBGTnIUruDTSMYR3MA+KTJl3FhOZTzmYU/Zxl2/ZiGnLqMvOxSjapnn0n0VwgYYE1xIIhuqg7cD8mLpIyiGOCdOFxAPeT0nuK+/BSyXhcvhuABOxwkg/2egLYI43FVCXuzKmi3yvIHAecW12SAClfYd0kzYTuoaa7PyhbmMHfL0uUsQHTK3QXSkXAkpYhWhDIK8I1aRlVWQx1Dts1FOjJIoZaCFBtC4xuWwCQcxKDDQJ3fIPro0WIVqcBdacvwAp6rvQWAjUxrKtwP6ZL3P+f8L1In4oWlVqoj13m3xUJEcm8hkJhSicBAZ8vOEDjZI8A8jOUV3FC9DlruYzfp1ub3jPfUcVpbjiWV9e4LET5f2DY4hFE8UW6gk0s8luDGJLMPaohW6E7ccIJ0Y9DiW48RfDv4eQtSFheWnpzA+JsjDKGVGjKzAzqyALjKVVRD3a433awzbqwiMi9liWrt+B++UHCKlckwN7E54vi5DRlrY9AeyUw7Dn0CM/xu7LczbHUUJhWgKSDRgZElsC6m1E7zlFJ6wI34b8QzPuoGA2BAjUZ5VW5Ia9xcpUg2hesGtMmp7CL+LtTVFZVNZ4zAWiIVpnZ5HQ+7cVF3A3g4ZniprrRBHFSckPjsn42fE6oaKdKiGEXHTjHLpjJJFCA31MNWbiN2ec0BNCQeC05hUvMh5m28N3zAqM+r2n/fsy2J6r7Om2LNCKrsi2Z4J0M2/FJooB0b/aKZGKGXDsvFTEfMtnXkYEWQJ7GU2SYbSgY7wW8z5pEsa8FoQkam9K581UJaxK9d9fge13uHUJJ/9xIxuTQYoKQ8fsNHm7Bk7l115q2svflv/cr2G/16yhCRrrcxrbi86HB98l7fQS7A/mol8f3hW0N0TZEeY2q/qftvDUYv57AkIvm720A34esMPGNITKZ24zbkEPwWgR9ygaNyXwVDOAMssWK4reHeL0TWGN2n20N+8UkpngHUVJ6KGEvGwpLL2OQJWT5dewjmpx+LnjvFxAtIt2gO8kDSRUBvspMlG0FkJWwzXXs0wJElYx6+PszQXvY915HA0UN0zGIK+A3sb/LeP8OgoRssa6ObmoNovxNtsoSXZQzMfhvJeNM9OXfIF8BbqDelvGZbY0xpO4/rUBEC5nQ/en0bGldexvMu9MKU/Q0T1rJ6ERBGIqoL6xefRN4PyX8Xg379hb16s/2/XX+dRBUUE8rjP5tfy8AyYLkscByZSk0oZWWgipAdKQpjf9dG7ieNYjKgAWMArJxzRIqWRE/u5BY1gKjiDQuFDKM7AbMA+BlVO4SE6+kcbsQvGQtOcYIiQDyFNm0F5H1GKodjMJ39K60VNXJuPscQSrpUQRXBm5YD8x2CfUVDMlWbsfAzr2IGdQm6Hf9+ALRCaTwnb3PgR9SL49EZg3A8Rz86Z2J6bkXL16mT7oGHshn302eQXrx8hiFLgCRBRZ2lxAJ7ZAwE1u0wUtM+X8BBgA+EoPr8o5ceQAAAABJRU5ErkJggg==",
                        zc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMi8xOS8xOBJAKZ4AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAAnklEQVQYlY3QsQ3CMBAF0G8XrBBRUqZALAB7MELqSExBRxkpDV3SZQekpDRiAJd0KVPYsT+dkQGL/Pbe3elOmMuBXt+QitzsIZPVEEKQ/MsWTPpEZqK9HgkzMYnmroRXLeau/D3Jq4aurwAArq/gVcMIcdS0bRF127YAR82A3FBDZnm8IsvhhhoA3i/g80Fz3gW0Ot0h1lvxfV0ii9ALEms//widFg0AAAAASUVORK5CYII=",
                        yl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMi8xOS8xOBJAKZ4AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAAoklEQVQYlWP8//8/AwMDA8Od9wz/wzYxwMEqPwYGFUEGRgYGBgYmBiIAUYoY////zzD1HMP/Uy8YGC6/RkjoijIwmEkwMGQbMTAyMTAwMASoMTDc/4iq+/5HiDjcOmkeBsYaS1RFNZYQcRQ3uSkwMAZBdQapQfhwHf///4fj77///y878P//99///yOLM8LCieIgYEnazvD/wivcCgzEiDQJAOdmPiuqgpQNAAAAAElFTkSuQmCC"
                    }
                },
                "./modules/int.js": function(e, t) {
                    e.exports = {
                        "int": function(e) {
                            var t = Math.floor(e);
                            if (t == 0) {
                                return Math.floor(e) + .5
                            }
                            return Math.floor(e) - .5
                        }
                    }
                },
                "./modules/text.js": function(e, t) {
                    e.exports = function(e, t, n, a, i) {
                        var r = a[a.length - 1];
                        var s = r.d5;
                        var o = r.d20;
                        var l = r.d60;
                        var u = a[0].d;
                        var d = a[Math.floor(a.length / 2)].d;
                        var f = r.d;
                        var c = i.num_max.toFixed(2);
                        var h = i.num_min.toFixed(2);
                        e.font = "12px Arial";
                        e.textBaseline = "top";
                        var p = "MA5: " + s.toFixed(2);
                        e.fillStyle = "#5a85ff";
                        e.fillText(p, 0, 0);
                        var m = "MA20: " + o.toFixed(2);
                        e.fillStyle = "#ff10ff";
                        e.fillText(m, e.measureText(p).width + 12, 0);
                        e.fillStyle = "#018101";
                        e.fillText("MA60: " + l.toFixed(2), e.measureText(p).width + e.measureText(m).width + 24, 0);
                        e.fillStyle = "#000";
                        e.textBaseline = "bottom";
                        e.fillText(u, 0, n);
                        e.fillText(d, t / 2, n);
                        e.textAlign = "end";
                        e.fillText(f, t, n);
                        e.textAlign = "start";
                        e.textBaseline = "top";
                        e.fillText(c, 5, 22);
                        e.textAlign = "start";
                        e.textBaseline = "bottom";
                        e.fillText(h, 5, n - 20)
                    }
                }
            })
        })
    },
    "./modules/user/getuid.js": function(e, t, n) {
        var a = n("./modules/user/index.js");
        var i = n("./modules/browser_fingerprint/index.js");
        e.exports = {
            get: function() {
                return new Promise(function(t, e) {
                    if (a.get() != null) {
                        t(a.get().id);
                        return
                    }
                    i.get(function(e) {
                        t(e)
                    })
                }
                )
            }
        }
    },
    "./modules/user/index.js": function(e, t, n) {
        var a = n("./modules/cookie/index.js");
        var i = {
            get: function() {
                if (a.get("ut") && a.get("ct") && a.get("uidal")) {
                    var e = {
                        vtype: null,
                        state: null,
                        name: ""
                    };
                    if (a.get("vtpst") && a.get("vtpst") != "|") {
                        var t = a.get("vtpst").split("|");
                        if (t.length > 1) {
                            if (t[1] == "0" || t[1] == "3") {
                                switch (t[0]) {
                                case "301":
                                    e.vtype = 1;
                                    e.name = "理财师";
                                    break;
                                case "302":
                                    e.vtype = 2;
                                    e.name = "非理财师";
                                    break;
                                case "303":
                                    e.vtype = 3;
                                    e.name = "企业";
                                    break;
                                default:
                                    break
                                }
                            }
                            switch (t[1]) {
                            case "0":
                                e.state = 0;
                                break;
                            case "1":
                                e.state = 11;
                                break;
                            case "2":
                                e.state = 12;
                                break;
                            case "3":
                                e.state = 13;
                                break;
                            case "8":
                                e.state = 18;
                                break;
                            case "9":
                                e.state = 19;
                                break;
                            default:
                                break
                            }
                        }
                    }
                    return {
                        id: a.get("uidal").substring(0, 16),
                        nick: a.get("uidal").substring(16),
                        jiav: e
                    }
                }
                return null
            },
            logOut: function(e) {
                var t = new Date;
                document.cookie = "pi=;path=/;domain=eastmoney.com;expires=" + t.toGMTString();
                document.cookie = "ct=;path=/;domain=eastmoney.com;expires=" + t.toGMTString();
                document.cookie = "ut=;path=/;domain=eastmoney.com;expires=" + t.toGMTString();
                document.cookie = "uidal=;path=/;domain=eastmoney.com;expires=" + t.toGMTString();
                if (e) {
                    e()
                }
            },
            isLogin: function() {
                if (this.get()) {
                    return true
                } else {
                    return false
                }
            }
        };
        e.exports = i
    },
    "./modules/utils/index.js": function(e, t) {
        e.exports = {
            arrayJump: function(e, t, n) {
                if (t > n) {
                    var a = e.slice(0, n);
                    var i = e[t];
                    var r = e.slice(n, t);
                    var s = e.slice(t + 1);
                    return a.concat(i).concat(r).concat(s)
                } else if (t < n) {
                    var a = e.slice(0, t);
                    var i = e.slice(t + 1, n + 1);
                    var r = e[t];
                    var s = e.slice(n + 1);
                    return a.concat(i).concat(r).concat(s)
                }
                return e
            },
            getParam: function(e) {
                var t = location.search;
                var n = {};
                if (t != "") {
                    t = t.substring(1, t.length);
                    var a = t.split("&");
                    var i;
                    var r;
                    for (var s = 0; s < a.length; s++) {
                        i = a[s].substring(0, a[s].indexOf("="));
                        r = a[s].substring(a[s].indexOf("=") + 1, a[s].length);
                        n[i] = r
                    }
                }
                if (typeof n[e] != "undefined") {
                    return n[e]
                } else {
                    return null
                }
            }
        }
    },
    "./modules/ylyc/web.js": function(e, t, n) {
        var a = n("./modules/datacache/index.js");
        e.exports = {
            getData: function(e) {
                return $.ajax({
                    url: "./api/ylyc",
                    type: "GET",
                    dataType: "json",
                    data: {
                        codes: e
                    }
                }).then(function(e) {
                    a.ylyc_year = parseInt(e.result.BASICYEAR);
                    return e.result.Data.map(function(e) {
                        return e.split("|")
                    })
                })
            }
        }
    },
    "./modules/zdtj/index.js": function(e, t, n) {
        var i = n("./config/webconfig.js");
        e.exports = {
            init: function() {
                var e = this;
                this.getData();
                setInterval(function() {
                    e.getData()
                }, 30 * 1e3)
            },
            getData: function() {
                var a = this;
                $.ajax({
                    url: i.getWebPath("getpath") + "api/qt/ulist.np/get?secids=1.000001,0.399001&fields=f104,f105,f106&ut=6d2ffaa6a585d612eda28417681d58fb&cb=?",
                    type: "GET",
                    dataType: "jsonp",
                    data: {}
                }).done(function(e) {
                    if (e.rc == 0) {
                        $("#zdtj_z").text(e.data.diff[0].f104 + e.data.diff[1].f104);
                        $("#zdtj_d").text(e.data.diff[0].f105 + e.data.diff[1].f105);
                        $("#zdtj_p").text(e.data.diff[0].f106 + e.data.diff[1].f106)
                    }
                }).fail(function(e) {});
                $.ajax({
                    url: i.getWebPath("getpath") + "api/qt/kamt/get?fields1=f1,f2,f3,f4&fields2=f51,f52,f53,f54&ut=6d2ffaa6a585d612eda28417681d58fb&cb=?",
                    type: "GET",
                    dataType: "json",
                    data: {}
                }).done(function(e) {
                    if (e.rc == 0) {
                        var t = e.data.hk2sh.dayNetAmtIn;
                        var n = e.data.hk2sz.dayNetAmtIn;
                        $("#zdtj_hgt").text(a.dealNum(t).text).addClass(a.dealNum(t).classname);
                        $("#zdtj_sgt").text(a.dealNum(n).text).addClass(a.dealNum(n).classname)
                    }
                }).fail(function(e) {})
            },
            dealNum: function(e) {
                var t = "";
                if (e > 0) {
                    t = "stockup"
                } else if (e < 0) {
                    t = "stockdown"
                }
                var n = "";
                if (e < 0) {
                    n = "-";
                    e = Math.abs(e)
                }
                var a = "万";
                if (e >= 1e4) {
                    e = e / 1e4;
                    a = "亿"
                }
                return {
                    text: n + e.toFixed(2) + a,
                    classname: t
                }
            }
        }
    },
    "./modules/zhuti/chance.html": function(e, t) {
        e.exports = '<div class="bkblock">\r\n  <div class="bkt"><a href="http://quote.eastmoney.com/zhuti/{{? it.IsImportant == \'0\' }}subject{{??}}topic{{?}}/{{=it.Code}}" class="glink">{{=it.Name}}</a></div>\r\n  <div class="bkintro">{{=it.Reason}}</div>\r\n  <div class="bkstock">\r\n    <ul>\r\n      {{~it.StockList :value:index}}\r\n        {{? index <= 1 }}\r\n        <li><a href="http://quote.eastmoney.com/concept/{{=value.MarketName + value.Code}}.html?from=zixuan">{{=value.Name}}</a> <span class="time {{=value.classname}}">{{=value.Chg}}%</span></li>\r\n        {{?}}\r\n      {{~}}\r\n    </ul>\r\n  </div>\r\n</div>'
    },
    "./modules/zhuti/fxb.html": function(e, t) {
        e.exports = '<table class="fxbtable">\r\n  <tr>\r\n    <th>名称</th>\r\n    <th>最新价</th>\r\n    <th>涨幅</th>\r\n    <th>入选原因</th>\r\n  </tr>\r\n  {{~it.data :value:index}}\r\n  <tr>\r\n    <td><a href="http://quote.eastmoney.com/concept/{{=value[5]}}{{=value[0]}}.html?from=zixuan">{{=value[1]}}<br>{{=value[0]}}</a></td>\r\n    <td>{{=it.textColor(value[6],value[7])}}</td>\r\n    <td>{{=it.textColor(value[7] + \'%\',value[7])}}</td>\r\n    <td class="fxbyy"><div title="{{=value[4]}}">{{=value[4]}}</div></td>\r\n  </tr>\r\n  {{~}}\r\n</table>'
    },
    "./modules/zhuti/web.js": function(e, t, n) {
        var a = n("./modules/zhuti/chance.html");
        var i = n("./modules/zhuti/fxb.html");
        var r = n("./node_modules/dot/doT.js");
        var o = n("./modules/text/index.js");
        var l = n("./modules/tabs/index.js");
        e.exports = {
            init: function() {
                var t = this;
                this.getData().done(function(e) {
                    t.fillHtml(e.result[0])
                });
                t.getFXB();
                setInterval(function() {
                    t.getFXB()
                }, 30 * 1e3);
                var e = new l({
                    tabsobj: $("#scfgbtab li"),
                    type: "display",
                    contents: $(".scfgbtd")
                });
                e.init()
            },
            getData: function() {
                return $.ajax({
                    url: "./api/zhuti/fg",
                    type: "GET",
                    dataType: "json",
                    data: {}
                })
            },
            zttabs: null,
            fillHtml: function(e) {
                var n = this;
                $("#ztfg").text(e.TopText.PositionInd);
                var t = e.TopText.PositionInd / 100 * Math.PI - Math.PI / 2;
                var a = 95 + 56 * Math.cos(Math.PI / 2 - t);
                var i = 68 - 56 * Math.sin(Math.PI / 2 - t);
                $("#jycwarrow").css({
                    display: "block",
                    transform: "translate(" + a + "px," + i + "px) rotate(" + t + "rad) ",
                    "-ms-transform": "translate(" + a + "px," + i + "px) rotate(" + t + "rad) "
                });
                $("#jycwzss").text(e.TopText.Title);
                $("#jycwzss2").text(e.TopText.Content);
                $("#scfgblocks").html("");
                var r = [];
                e.MarketStyle.forEach(function(e, t) {
                    r.push("<li");
                    if (t == 0) {
                        r.push(' class="on"')
                    }
                    r.push('><a href="http://quote.eastmoney.com/zhuti/">' + e.Category + "</a></li>");
                    n.fillBlock(e.ThemeList, t)
                });
                $("#scfgtab").html(r.join(""));
                this.zttabs = new l({
                    tabsobj: $("#scfgtab li"),
                    type: "display",
                    contents: $("#scfgblocks ul")
                });
                this.zttabs.init();
                function s(e) {
                    e.StockList.forEach(function(e) {
                        e.classname = o.className(e.Chg);
                        e.MarketName = "";
                        if (e.Market == "01") {
                            e.MarketName = "sh"
                        } else if (e.Market == "02") {
                            e.MarketName = "sz"
                        }
                    })
                }
                s(e.Recommend[0].ThemeList[0]);
                s(e.Recommend[1].ThemeList[0]);
                $("#dxjh").html(n.fillChance(e.Recommend[0].ThemeList[0]));
                $("#zcxjh").html(n.fillChance(e.Recommend[1].ThemeList[0]))
            },
            fillBlock: function(i, e) {
                if (i.length > 5) {
                    i = i.slice(0, 5)
                }
                var r = this;
                var s = [];
                s.push("<ul>");
                i.forEach(function(e, t) {
                    var n = " ";
                    var a = r.blockClass(i.length, t);
                    if (a == "mblock") {
                        n = "<br>"
                    }
                    if (e.Chg == "") {
                        e.Chg = "0.00"
                    }
                    s.push('<li class="' + a + " " + r.blockColorClass(e.HotRate) + '"><a href="' + r.ztlink(e.Code, e.IsImportant) + '">' + e.Name + n + e.Chg + "%</a></li>")
                });
                s.push("</ul>");
                s = $(s.join(""));
                if (e > 0) {
                    s.hide()
                }
                $("#scfgblocks").append(s)
            },
            ztlink: function(e, t) {
                if (t == "1") {
                    return "http://quote.eastmoney.com/zhuti/topic/" + e
                }
                return "http://quote.eastmoney.com/zhuti/subject/" + e
            },
            blockClass: function(e, t) {
                if (e == 5) {
                    if (t == 0) {
                        return "mblock"
                    } else {
                        return "sblock"
                    }
                } else if (e == 4) {
                    if (t <= 1) {
                        return "mblock"
                    } else {
                        return "sblock"
                    }
                } else if (e == 3) {
                    return "mblock"
                }
                return "lblock"
            },
            blockColorClass: function(e) {
                if (e >= 10) {
                    return "r5"
                }
                if (e >= 7) {
                    return "r4"
                }
                if (e >= 3) {
                    return "r3"
                }
                if (e >= 1) {
                    return "r2"
                }
                if (e > 0) {
                    return "r1"
                }
                if (e == 0) {
                    return "r0"
                }
                if (e >= -1) {
                    return "g1"
                }
                if (e >= -3) {
                    return "g2"
                }
                if (e >= -7) {
                    return "g3"
                }
                if (e >= -10) {
                    return "g4"
                }
                return "g5"
            },
            fillChance: function(e) {
                e.StockList.forEach(function(e) {
                    if (e.Chg == "") {
                        e.Chg = "0.00"
                    }
                });
                return r.template(a)(e)
            },
            getFXB: function() {
                var t = this;
                $.ajax({
                    url: "./api/zhuti/fxb",
                    type: "GET",
                    dataType: "json",
                    data: {}
                }).done(function(e) {
                    if (e.re) {
                        t.fillFXB(e.result[0].Data)
                    }
                }).fail(function(e) {})
            },
            fillFXB: function(e) {
                e = e.map(function(e) {
                    var t = e.split("|");
                    if (t[6] == "") {
                        t[6] = "0.00"
                    }
                    if (t[7] == "") {
                        t[7] = "0.00"
                    }
                    if (t[5] == "01") {
                        t[5] = "sh"
                    } else if (t[5] == "02") {
                        t[5] = "sz"
                    }
                    return t
                });
                $("#scfgbt2").html(r.template(i)({
                    data: e,
                    textColor: o.textColor
                }))
            }
        }
    },
    "./modules/znzg/index.js": function(e, t, n) {
        var _ = n("./modules/znzg/znzg.html");
        var j = n("./modules/znzg/znzg_none.html");
        var w = n("./node_modules/dot/doT.js");
        var k = n("./modules/text/index.js");
        var T = n("./modules/trend_kline/index.js");
        var A = n("./modules/radar_chart/index.js");
        var S = n("./modules/tabs/index.js");
        var C = n("./modules/datetime/index.js");
        var M = n("./modules/modal/alert.js");
        var d = n("./modules/datacache/index.js");
        e.exports = {
            init: function() {
                this.bind()
            },
            bind: function() {
                var u = this;
                $("#wl_mainbody").on("click", "#wltable tr, #tablethd4 tr", function(e) {
                    if (d.pxorder) {
                        return true
                    }
                    if (e.target.nodeName == "A" || e.target.nodeName == "I" || e.target.nodeName == "INPUT") {
                        return true
                    }
                    var t = $(this);
                    var n = $(this).index();
                    var a = t.data("ishsstock");
                    var i = t.data("code").toString();
                    if (a != "1") {
                        return true
                    }
                    var r = t.is(".zk");
                    u.close();
                    if (!r) {
                        var s = i.substring(i.indexOf(".") + 1);
                        var o = i.substring(0, i.indexOf("."));
                        var l = s + "1";
                        if (o == 0) {
                            l = s + "2"
                        }
                        if (i == "0.300059") {
                            u.show(null, n, i, s, l, true);
                            return true
                        }
                        $.ajax({
                            url: "./api/znzg?code=" + s,
                            type: "GET",
                            dataType: "json",
                            data: {}
                        }).then(function(e) {
                            u.show(e, n, i, s, l)
                        }).fail(function(e) {})
                    }
                });
                $("#wl_mainbody").on("click", ".znzgd", function(e) {
                    if (e.target.nodeName == "A") {
                        return true
                    }
                    return false
                })
            },
            show: function(e, t, n, a, i, r) {
                var s = false;
                var o = this;
                if (r) {
                    e = {
                        re: true
                    }
                }
                if (e.re == false && e.message == "目前智能诊股只支持上市满六十交易日的沪深A股") {
                    e = {
                        re: true
                    };
                    r = true;
                    s = true
                }
                if (e.re) {
                    $("#wltable tr").eq(t).addClass("zk");
                    $("#tablethd4 tr").eq(t).addClass("zk");
                    $("#tablethd6 tr").eq(t).addClass("zk");
                    $("#tablethdd6").css({
                        "z-index": 6
                    });
                    var l = $("#tablethd4 tr").eq(t).offset().top - (122 + $("#zshq").outerHeight());
                    var u = $("#tablethdd5").get(0).offsetWidth - $("#tablethdd5").get(0).clientWidth;
                    $("#znzgd").data("index", t).css({
                        top: l,
                        width: $("#wl_mainbody").get(0).clientWidth - u
                    });
                    if ($("#ykylcount").length) {
                        $("#ykylcount").css({
                            top: $("#tablethd4").height() + 36
                        })
                    }
                    var d;
                    if (r) {
                        d = $(w.template(j)({
                            bm60: s,
                            hqlink: k.getLinkByCode(n)
                        }))
                    } else {
                        e.result.ApiResults.yqgz.All = e.result.ApiResults.yqgz.All.slice(0, 5);
                        d = $(w.template(_)({
                            data: e.result.ApiResults,
                            textNumColor: k.textNumColor,
                            textNumColorPlus: k.textNumColorPlus,
                            textColor: k.textColor,
                            formatNum: k.formatNum,
                            hscode: a,
                            hqlink: k.getLinkByCode(n),
                            strToDayOrTime: C.strToDayOrTime
                        }))
                    }
                    $("#znzgd").show().html(d);
                    var f = o.fdshow();
                    var c = 200;
                    if (f == "middle") {
                        c = 170
                    }
                    var h = {
                        container: "#znzgkchart",
                        code: i,
                        width: 340,
                        height: c,
                        bigImg: {
                            stauts: "show"
                        },
                        color: {
                            background: "#f7f7f7"
                        },
                        show: {
                            title: true
                        },
                        onMove: function(e) {},
                        onComplete: function() {}
                    };
                    var p = new emcharts3.kmini(h);
                    p.draw();
                    var m = {
                        container: "#znzgfschart",
                        code: n,
                        token: "fa5fd1943c7b386f172d6893dbfba10b",
                        width: 340,
                        height: c,
                        color: {
                            background: "#f7f7f7"
                        },
                        bigImg: {
                            stauts: "show"
                        },
                        timeline: [],
                        onMove: function(e) {},
                        onComplete: function() {},
                        onError: function(e) {}
                    };
                    var v = new emcharts3.timemini(m);
                    v.start();
                    v.draw();
                    if (r) {
                        return false
                    }
                    var g = new T({
                        ele: document.getElementById("trend_klinediv"),
                        width: 352,
                        height: 173,
                        data: e.result.ApiResults.zj.Trend[1].map(function(e) {
                            return {
                                d: e.TDate.substring(0, e.TDate.indexOf(" ")),
                                c: parseFloat(e.Close),
                                o: parseFloat(e.Open),
                                h: parseFloat(e.High),
                                l: parseFloat(e.Low),
                                d5: parseFloat(e.Price5),
                                d20: parseFloat(e.Price20),
                                d60: parseFloat(e.Price60)
                            }
                        })
                    });
                    var x = g.getPrice();
                    $("#zcprice", d).text(x.zc.price);
                    $("#ylprice", d).text(x.yl.price);
                    var b = [{
                        name: e.result.ApiResults.zj.Value[2][0].ReportText,
                        color: "#EA5504",
                        item: ["成长能力", "运营偿债能力", "现金流", "估值水平", "盈利能力"],
                        value: [e.result.ApiResults.zj.Value[2][0].GrowUpScorePercent, e.result.ApiResults.zj.Value[2][0].OperationScorePercent, e.result.ApiResults.zj.Value[2][0].CashFlowScorePercent, e.result.ApiResults.zj.Value[2][0].ValuationScorePercent, e.result.ApiResults.zj.Value[2][0].ProfitabilityScorePercent]
                    }, {
                        name: e.result.ApiResults.zj.Value[2][1].ReportText,
                        color: "#EA5504",
                        item: ["成长能力", "运营偿债能力", "现金流", "估值水平", "盈利能力"],
                        value: [e.result.ApiResults.zj.Value[2][1].GrowUpScorePercent, e.result.ApiResults.zj.Value[2][1].OperationScorePercent, e.result.ApiResults.zj.Value[2][1].CashFlowScorePercent, e.result.ApiResults.zj.Value[2][1].ValuationScorePercent, e.result.ApiResults.zj.Value[2][1].ProfitabilityScorePercent]
                    }];
                    A($("#jzpgchart").get(0), b);
                    var y = new S({
                        tabsobj: $(".tab6 li", d),
                        type: "display",
                        contents: $(".zgb>div", d)
                    });
                    y.init()
                } else {
                    M(e.message)
                }
            },
            close: function() {
                $(".wltable tr.zk").removeClass("zk");
                $("#tablethd4 tr.zk").removeClass("zk");
                $("#tablethd6 tr").removeClass("zk");
                $("#znzgd").html("").hide();
                $("#tablethdd6").css({
                    "z-index": 8
                });
                if ($("#ykylcount").length) {
                    $("#ykylcount").css({
                        top: $("#tablethd4").height() + 36
                    })
                }
            },
            fdshow: function() {
                var e = $(window).width();
                if (e >= 1440) {
                    return "big"
                }
                if (e > 1024) {
                    $(".znzgtab2").show();
                    $("#znzgkcharta").hide();
                    $(".fskxd").css({
                        "float": "left",
                        width: 340
                    });
                    $(".znzgs2tab li").on("click", function() {
                        var e = $(this).index();
                        if (e == 0) {
                            $("#znzgfscharta").css({
                                display: "block"
                            });
                            $("#znzgkcharta").css({
                                display: "none"
                            })
                        } else if (e == 1) {
                            $("#znzgfscharta").css({
                                display: "none"
                            });
                            $("#znzgkcharta").css({
                                display: "block"
                            })
                        }
                        $(".znzgs2tab li").removeClass("on");
                        $(this).addClass("on")
                    });
                    return "middle"
                }
                $(".znzgsmalltab li").on("click", function() {
                    var e = $(this).index();
                    if (e == 0) {
                        $(".fskxd").css({
                            display: "block"
                        });
                        $(".znzg_rc").css({
                            display: "none"
                        })
                    } else if (e == 1) {
                        $(".fskxd").css({
                            display: "none"
                        });
                        $(".znzg_rc").css({
                            display: "block"
                        })
                    }
                    $(".znzgsmalltab li").removeClass("on");
                    $(this).addClass("on")
                });
                $(".znzg").css({
                    width: "auto"
                });
                $(".znzgsmalltab").css({
                    display: "block"
                });
                $(".fskxd").css({
                    display: "block"
                });
                $(".znzg_rc").css({
                    display: "none"
                });
                return "small"
            }
        }
    },
    "./modules/znzg/znzg.html": function(e, t) {
        e.exports = '<div class="znzg">\r\n\r\n  <div class="znzgtab znzgsmalltab">\r\n    <ul>\r\n      <li class="on"><a href="javascript:;" target="_self">分时K线</a></li>\r\n      <li><a href="javascript:;" target="_self">智能诊股</a></li>\r\n    </ul>\r\n  </div>\r\n\r\n\r\n\r\n  <div class="fskxd">\r\n    <div class="znzgtab2">\r\n      <ul class="znzgs2tab">\r\n        <li class="on"><a href="javascript:;" target="_self">分时</a></li>\r\n        <li><a href="javascript:;" target="_self">K线</a></li>\r\n      </ul>      \r\n    </div>\r\n    <a href="{{=it.hqlink}}" id="znzgfscharta"><div class="fschart" id="znzgfschart"></div></a>\r\n    <a href="{{=it.hqlink}}" id="znzgkcharta"><div class="kchart" id="znzgkchart"></div></a>    \r\n  </div>\r\n\r\n  <div class="znzg_rc">\r\n    <div class="zhpf">\r\n      <div class="pin"><span class="icon icon_pin"></span></div>\r\n      <div class="zhpfd1">综合评分 <span>{{=Math.round(it.data.zj.Overall[0].TotalScore)}}</span></div>\r\n      <div class="zhpfd2">今日表现 &nbsp;&nbsp;&nbsp; {{=it.textNumColorPlus(it.data.zj.Overall[0].TotalScoreCHG, 2)}} </div>\r\n      <div class="zhpfd3">打败了 <span class="c_or">{{=(it.data.zj.Overall[0].LeadPre / 1).toFixed(2)}}%</span> 的股票</div>\r\n      <div class="zhpfd4">次日上涨概率 &nbsp;&nbsp;&nbsp;  <span class="stockup">{{=(it.data.zj.Overall[0].RisePro / 1).toFixed(2)}}%</span></div>\r\n      <div class="zhpfd5">{{=it.data.zj.Overall[0].Comment}}</div>\r\n      <div class="zhpfd6" title="本功能中的内容均仅供参考，建议投资者根据自身投资风格进行筛选，并合理控制风险。">免责声明 <span class="icon icon_question"></span> &nbsp;&nbsp; <a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#zhpj">详情</a></div>\r\n    </div>\r\n    <div class="zg">\r\n      <div class="tab6">\r\n        <ul>\r\n          <li class="on"><a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#yqjk">舆情关注</a></li>\r\n          <li><a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#scrd">市场热度</a></li>\r\n          <li><a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#qsyp">趋势研判</a></li>\r\n          <li><a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#zjdx">资金动向</a></li>\r\n          <li><a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#jzpg">价值评估</a></li>\r\n        </ul>\r\n      </div>\r\n      <div class="zgb">\r\n        <div class="zgb1">\r\n          <ul class="newslist">\r\n            {{~it.data.yqgz.All :value:index}}\r\n            <li><a href="{{=value.Url}}" title="{{=value.Title}}">{{=value.Title}}</a><span class="time">\r\n              {{=it.strToDayOrTime(value.DateTime)}}\r\n            </span></li>\r\n            {{~}}\r\n          </ul>\r\n          <div class="newsmore"><a href="http://data.eastmoney.com/stockcomment/stock/{{=it.hscode}}.html#yqjk">点击查看更多</a></div>\r\n        </div>\r\n        <div class="zgb2">\r\n          <div class="scrdd">\r\n            <div class="t">关注指数</div>\r\n            <div class="num">\r\n              {{? it.data.zj.Market[0].FocusScore >= 60 }}\r\n                <span class="stockup">{{=it.data.zj.Market[0].FocusScore}}</span>\r\n              {{??}}\r\n                <span class="stockdown">{{=it.data.zj.Market[0].FocusScore}}</span>\r\n              {{?}}\r\n            </div>\r\n            <div class="intro">今日用户关注指数为 {{=it.data.zj.Market[0].FocusScore}} 市场排名 {{=it.data.zj.Market[0].Ranking}}/{{=it.data.zj.Market[0].StockCount}}</div>\r\n          </div>\r\n          <div class="scrdd">\r\n            <div class="t">参与意愿</div>\r\n            <div class="num">{{=it.textColor(((it.data.zj.Market[0].Day5HandWishChg / 1) * 100).toFixed(2) + \'%\', it.data.zj.Market[0].Day5HandWishChg)}}</div>\r\n            <div class="intro">{{=it.data.zj.Market[0].scrd1}} {{=it.data.zj.Market[0].scrd2}}</div>\r\n          </div>\r\n          <div class="scrdd">\r\n            <div class="t">市场成本</div>\r\n            <div class="num">{{=(it.data.zj.Market[0].AvgPrice / 1).toFixed(2)}}</div>\r\n            <div class="intro">今日市场成本为{{=(it.data.zj.Market[0].AvgBuyPrice/1).toFixed(2)}}元，{{=it.data.zj.Market[0].scrd3}}</div>\r\n          </div>\r\n        </div>\r\n        <div class="zgb3">\r\n          <div class="zcinfo">\r\n            <span class="icon icon_zc"></span> 支撑位：<span id="zcprice"></span>元<br>\r\n            <span class="icon icon_yl"></span> 压力位：<span id="ylprice"></span>元<br>\r\n            更新时间： {{=it.data.zj.Trend[0][0].UpdateTime.substring(0, it.data.zj.Trend[0][0].UpdateTime.indexOf(\' \'))}}\r\n            <div class="zcinfot">{{=it.data.zj.Trend[0][0].qsyp1}}，{{=it.data.zj.Trend[0][0].qsyp2}}</div>\r\n          </div>\r\n          <div class="zcchart" id="trend_klinediv">\r\n            <img src="./images/zcyl.png" alt="">\r\n          </div>\r\n        </div>\r\n        <div class="zgb4">\r\n          <div class="zjdx">\r\n            {{=it.data.zj.Capital[0].zjdx1}}<br>\r\n            今日资金净流入{{=it.textColor(it.formatNum(it.data.zj.Capital[0].MajorNetFlow) + \'元\', it.data.zj.Capital[0].MajorNetFlow)}}，占流通盘比{{=(it.data.zj.Capital[0].MNFOccuMktVal*100).toFixed(2)}}%<br>\r\n            五日资金净流入{{=it.textColor(it.formatNum(it.data.zj.Capital[0].Day5MajorNetFlow) + \'元\', it.data.zj.Capital[0].Day5MajorNetFlow)}}，占流通盘比{{=(it.data.zj.Capital[0].Day5MNFOccuMktVal*100).toFixed(2)}}%<br>\r\n            所属{{=it.data.zj.Capital[0].IndustryName}}行业，五日行业资金流入共{{=it.textColor(it.formatNum(it.data.zj.Capital[0].IndustryDay5MajorNet) + \'元\', it.data.zj.Capital[0].IndustryDay5MajorNet)}}\r\n          </div>\r\n          {{? it.data.zj.Capital[0].ActiveInterval == \'\' }}\r\n          <div class="zjdxinfo">今日无明显成交活跃时间段，全天统计如下：</div>\r\n          <div class="zjdxtj">\r\n            <table>\r\n              <tr>\r\n                <td>涨跌幅<br>{{=it.textColor(it.data.zj.Capital[0].RChange + \'%\', it.data.zj.Capital[0].RChange)}}</td>\r\n                <td>成交活跃价格<br>{{=it.textColor(it.data.zj.Capital[0].ActivePrice, it.data.zj.Capital[0].RChange)}}</td>\r\n                <td>成交活跃手数<br><span>{{=it.data.zj.Capital[0].ActiveCount}}</span></td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n          {{??}}\r\n          <div class="zjdxinfo">今日成交活跃时间为 <span class="c_or">{{=it.data.zj.Capital[0].ActiveInterval}}</span>，区间统计如下：</div>\r\n          <div class="zjdxtj">\r\n            <table>\r\n              <tr>\r\n                <td>区间涨跌幅<br>{{=it.textColor(parseFloat(it.data.zj.Capital[0].IntervalRChange).toFixed(2) + \'%\', it.data.zj.Capital[0].IntervalRChange)}}</td>\r\n                <td>成交量占当日比<br>{{=it.textColor(it.data.zj.Capital[0].IntervalVolOccupyDayVol + \'%\', it.data.zj.Capital[0].IntervalVolOccupyDayVol)}}</td>\r\n                <td>主买量占区间比<br><span>{{=it.textColor(it.data.zj.Capital[0].IntervalBuyVolOccupySectVol + \'%\', it.data.zj.Capital[0].IntervalBuyVolOccupySectVol)}}</span></td>\r\n              </tr>\r\n            </table>\r\n          </div>\r\n          {{?}}\r\n        </div>\r\n        <div class="zgb5">\r\n          <div class="jzpg">\r\n            <div class="t">\r\n              {{=it.data.zj.Value[0][0].SecName}}属于{{=it.data.zj.Value[0][0].IndustryName}}行业<br>排名<span class="stockup">{{=it.data.zj.Value[0][0].ValueRanking}}</span>/{{=it.data.zj.Value[0][0].Total}}\r\n            </div>\r\n            <div class="jzpginfo">{{=it.data.zj.Value[0][0].Comment}}</div>\r\n          </div>\r\n          <div class="jzpgchart" id="jzpgchart"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>'
    },
    "./modules/znzg/znzg_none.html": function(e, t) {
        e.exports = '<div class="znzg">\r\n\r\n  <div class="znzgtab znzgsmalltab">\r\n    <ul>\r\n      <li class="on"><a href="javascript:;" target="_self">分时K线</a></li>\r\n      <li><a href="javascript:;" target="_self">智能诊股</a></li>\r\n    </ul>\r\n  </div>\r\n\r\n\r\n\r\n  <div class="fskxd">\r\n    <div class="znzgtab2">\r\n      <ul class="znzgs2tab">\r\n        <li class="on"><a href="javascript:;" target="_self">分时</a></li>\r\n        <li><a href="javascript:;" target="_self">K线</a></li>\r\n      </ul>      \r\n    </div>\r\n    <a href="{{=it.hqlink}}" id="znzgfscharta"><div class="fschart" id="znzgfschart"></div></a>\r\n    <a href="{{=it.hqlink}}" id="znzgkcharta"><div class="kchart" id="znzgkchart"></div></a>    \r\n  </div>\r\n\r\n  <div class="znzg_rc">\r\n    <div class="dcznzg">\r\n      <div><span class="icon icon_znzgtip"></span></div>\r\n      {{? it.bm60}}\r\n        目前智能诊股只支持上市满六十交易日的沪深A股\r\n      {{??}}\r\n      <div>医者不能自医，换只股票试试</div>\r\n      {{?}}\r\n    </div>\r\n  </div>\r\n\r\n</div>'
    },
    "./modules/zshq/index.js": function(e, t, n) {
        var a = n("./config/webconfig.js");
        function i() {
            return $.ajax({
                url: a.getWebPath("getpath") + "api/qt/ulist.np/get?secids=1.000001,0.399001,0.399006,0.399005,8.040120,104.CN00Y,100.HSI,100.DJIA,100.FTSE,100.N225,100.NDX,100.GDAXI,102.CL00Y,101.GC00Y,100.UDI,133.USDCNH,120.USDCNYC,142.scm&fields=f1,f2,f3,f4,f12,f13,f14,f107,f152&ut=6d2ffaa6a585d612eda28417681d58fb&cb=?",
                type: "GET",
                dataType: "jsonp"
            }).done(function(e) {
                if (e.rc == 0 && e.data.total == 18) {
                    var t = [];
                    t.push(r(e.data.diff.slice(0, 6)));
                    t.push(r(e.data.diff.slice(6, 12)));
                    t.push(r(e.data.diff.slice(12, 18)));
                    $("#zshq").html(t.join(""))
                }
            }).fail(function(e) {})
        }
        function r(e) {
            var a = ["<ul>"];
            e.forEach(function(e) {
                var t = "icon_close";
                if (e.f107 == 1 || e.f107 == 2 || e.f107 == 4) {
                    t = "icon_open"
                }
                var n = "draw";
                if ($.isNumeric(e.f4)) {
                    if (e.f4 > 0) {
                        n = "up"
                    }
                    if (e.f4 < 0) {
                        n = "down"
                    }
                }
                a.push('<li><a href="http://quote.eastmoney.com/unify/r/' + e.f13 + "." + e.f12 + '"><span class="icon ' + t + ' "></span> ' + e.f14 + '&nbsp;&nbsp;<span class="stock' + n + '">' + (e.f2 / Math.pow(10, e.f1)).toFixed(e.f1) + '</span>&nbsp;&nbsp;<span class="stock' + n + '">' + (e.f4 / Math.pow(10, e.f1)).toFixed(e.f1) + '</span>&nbsp;&nbsp;<span class="stock' + n + '">' + (e.f3 / 100).toFixed(e.f152) + "%</span></a></li>")
            });
            a.push("</ul>");
            return a.join("")
        }
        e.exports = function() {
            setInterval(function() {
                i()
            }, 30 * 1e3);
            i()
        }
    },
    "./modules/zxg/batch_edit.js": function(e, t, n) {
        var a = n("./modules/popmenu/index.js");
        var i = n("./modules/zxg/batch_edit_stock.html");
        var r = n("./node_modules/dot/doT.js");
        var s = n("./modules/datacache/index.js");
        var o = n("./modules/modal/alert.js");
        var l = n("./modules/modal/confirm.js");
        var u = n("./modules/zxg/data.js");
        e.exports = {
            init: function() {
                var t = this;
                var n = $(r.template(i)({}));
                var e = new a({
                    target: $("#plsetting"),
                    content: n,
                    onMoveIn: function() {
                        var e = s.groupdata.groups.filter(function(e) {
                            if (e.id == s.groupdata.horder || e.id == s.thisgroupid) {
                                return false
                            }
                            return true
                        });
                        $(".popmenud2list", n).html(e.map(function(e) {
                            return '<li><a href="javascript:;" class="movegroup" target="_self" data-groupid="' + e.id + '">' + e.name + "</a></li>"
                        }).join(""))
                    },
                    onHover: function() {
                        var e = n.offset().left + n.width() + 120;
                        if (e > $("body").width()) {
                            $(".editgroupname", n).html('<span class="icon icon_larrow"></span> 修改分组');
                            $(".popmenud2list", n).css({
                                right: "100%",
                                left: "auto"
                            }).addClass("popmenud2listsd2")
                        } else {
                            $(".editgroupname", n).html('修改分组 &nbsp;<span class="icon icon_rarrow"></span>');
                            $(".popmenud2list", n).css({
                                right: "auto",
                                left: "100%"
                            }).removeClass("popmenud2listsd2")
                        }
                    }
                });
                n.on("click", ".deletestock", function() {
                    t.deleteStock()
                });
                n.on("click", ".movegroup", function() {
                    var e = $(this).data("groupid");
                    t.moveGroup(e)
                })
            },
            getCodes: function() {
                var n = [];
                $("#wl_mainbody .batchselect").each(function(e, t) {
                    if ($(t).is(":checked")) {
                        n.push($(t).val())
                    }
                });
                return n
            },
            deleteStock: function() {
                var t = this.getCodes();
                if (t.length == 0) {
                    o("请至少选择一只股票！");
                    return false
                }
                l("确定要删除这些自选股吗？", function() {
                    u.batchDelete(t.join(","), s.thisgroupid).then(function(e) {
                        if (e.re) {
                            if (s.is_defaultgroup) {
                                _.pullAll(s.top_stocks, t)
                            }
                            o("删除成功！", function() {
                                s.changeGroup()
                            })
                        }
                    })
                })
            },
            moveGroup: function(t) {
                var n = this.getCodes();
                if (n.length == 0) {
                    o("请至少选择一只股票！");
                    return false
                }
                u.moveGroup(n.join(","), s.thisgroupid, t).then(function(e) {
                    if (e.re) {
                        if (s.is_defaultgroup) {
                            _.pullAll(s.top_stocks, n)
                        }
                        o("移动成功！", function() {
                            s.changeGroup(t)
                        })
                    } else {
                        o(e.message)
                    }
                })
            }
        }
    },
    "./modules/zxg/batch_edit_stock.html": function(e, t) {
        e.exports = '<div>\r\n<ul class="popmenulist">\r\n  <li><a href="javascript:;" class="deletestock" target="_self">删除</a></li>\r\n  <li><a href="javascript:;" class="editgroupname" target="_self">修改分组 &nbsp;<span class="icon icon_rarrow"></span></a>\r\n    <ul class="popmenud2list"></ul>\r\n  </li>\r\n</ul>\r\n\r\n</div>\r\n'
    },
    "./modules/zxg/customitem.js": function(e, t, n) {
        var a = n("./modules/zxg/zbsetting.html");
        var i = n("./node_modules/dot/doT.js");
        var r = n("./modules/modal/index.js");
        var s = n("./modules/zxg/itemconfig.js");
        var o = n("./modules/user/getuid.js");
        var l = n("./modules/modal/alert.js");
        var u = n("./modules/datacache/index.js");
        e.exports = {
            bindBtn: function() {
                var e = this;
                $("#zbsetting").click(function() {
                    e.showSetting()
                });
                setTimeout(function() {
                    if (self.location.hash == "#showzb") {
                        e.showSetting();
                        self.location.hash = ""
                    }
                }, 1e3)
            },
            showSetting: function() {
                var t = this;
                var n = $(i.template(a)({
                    default_zb: s.type_config.default_zx.show_fields.map(function(e) {
                        return {
                            name: s.item_config[e].name,
                            itemname: e
                        }
                    })
                }));
                $("#zbssel1", n).html(this.allFill());
                this.getFill().then(function(e) {
                    $("#zbssel2", n).html(e);
                    t.setDisabled()
                });
                var e = this.modal = new r({
                    content: n,
                    title: "指标设置"
                });
                e.show();
                this.bind(n);
                $("#setting_cancel", n).click(function() {
                    e.close()
                });
                $("#setting_submit", n).click(function() {
                    t.submit(n)
                })
            },
            bind: function(t) {
                var i = this;
                var n = $("#zbssel1", t);
                var r = $("#zbssel2", t);
                n.focus(function() {
                    $("#additem", t).addClass("modalbtn_default").removeClass("modalbtn_disabled")
                });
                r.focus(function() {
                    $("#delitem", t).add("#moveup", t).add("#movedown", t).addClass("modalbtn_default").removeClass("modalbtn_disabled")
                });
                $("#additem", t).click(function() {
                    var e = $("option:selected", n);
                    if (e.length) {
                        e.each(function(e, n) {
                            var a = false;
                            $("option", r).each(function(e, t) {
                                if ($(t).val() == $(n).val()) {
                                    a = true;
                                    return false
                                }
                            });
                            if (!a) {
                                r.append("<option value=" + $(n).val() + ">" + $(n).text() + "</option>");
                                i.setDisabled();
                                $("#zbssel1").get(0).options.selectedIndex = -1
                            }
                        })
                    }
                });
                $("option", n).dblclick(function() {
                    var n = $(this);
                    var a = false;
                    $("option", r).each(function(e, t) {
                        if ($(t).val() == n.val()) {
                            a = true;
                            return false
                        }
                    });
                    if (!a) {
                        r.append("<option value=" + n.val() + ">" + n.text() + "</option>");
                        i.setDisabled();
                        $("#zbssel1").get(0).options.selectedIndex = -1
                    }
                });
                $("#delitem", t).click(function() {
                    var e = $("option:selected", r);
                    if (e.length) {
                        e.remove();
                        $("#delitem", t).add("#moveup", t).add("#movedown", t).addClass("modalbtn_disabled").removeClass("modalbtn_default");
                        i.setDisabled()
                    }
                });
                $("#moveup", t).click(function() {
                    var e = $("option:selected", r);
                    if (e.length) {
                        var t = e.eq(0).prev();
                        if (t.attr("disabled")) {
                            return false
                        }
                        t.before(e)
                    }
                });
                $("#movedown", t).click(function() {
                    var e = $("option:selected", r);
                    if (e.length) {
                        var t = e.last().next();
                        t.after(e)
                    }
                });
                $("#resetbtn", t).click(function() {
                    r.html(i.defaultFill());
                    $("#delitem", t).add("#moveup", t).add("#movedown", t).addClass("modalbtn_disabled").removeClass("modalbtn_default");
                    i.setDisabled();
                    return false
                });
                $("#clearbtn", t).click(function() {
                    r.html(i.clearFill());
                    $("#delitem", t).add("#moveup", t).add("#movedown", t).addClass("modalbtn_disabled").removeClass("modalbtn_default");
                    i.setDisabled();
                    return false
                })
            },
            setDisabled: function() {
                var n = $("#zbssel1");
                var e = $("#zbssel2");
                $("option", n).not(".dloption").prop("disabled", false);
                $("option", e).each(function(e, t) {
                    $('option[value="' + $(t).val() + '"]', n).prop("disabled", true)
                })
            },
            allFill: function() {
                var t = [];
                s.type_config.all_zx.show_fields.forEach(function(e) {
                    t.push("<option ");
                    if (!/[a-z]/.test(e.substring(0, 1))) {
                        t.push('class="dloption" disabled');
                        t.push(" >" + e + "</option>")
                    } else {
                        t.push(' value="' + e + '">' + s.item_config[e].name + "</option>")
                    }
                });
                return t.join("")
            },
            defaultFill: function() {
                var t = [];
                s.type_config.default_zx.show_fields.forEach(function(e) {
                    t.push("<option ");
                    t.push(' value="' + e + '">' + s.item_config[e].name + "</option>")
                });
                return t.join("")
            },
            getFill: function() {
                return this.getSetting("zx").then(function(e) {
                    var t = [];
                    e.forEach(function(e) {
                        t.push("<option ");
                        t.push(' value="' + e + '">' + s.item_config[e].name + "</option>")
                    });
                    return t.join("")
                })
            },
            clearFill: function() {
                var e = [];
                return e.join("")
            },
            submit: function(e) {
                var t = $("#zbssel2", e);
                var n = [];
                $("option", t).each(function(e, t) {
                    n.push({
                        itemname: $(t).text(),
                        name: $(t).val()
                    })
                });
                this.save(n);
                return false
            },
            isDefault: function(n) {
                if (n.length != s.type_config.default_zx.show_fields.length) {
                    return false
                }
                var a = true;
                n.forEach(function(e, t) {
                    if (n[t].name != s.type_config.default_zx.show_fields[t]) {
                        a = false
                    }
                });
                return a
            },
            save: function(i) {
                var r = this;
                if (!window.localStorage) {
                    l("您的浏览器不支持本地保存！您的设置不会被保存");
                    return false
                }
                var s = u.thisgroupid;
                o.get().then(function(e) {
                    var t = e + "_" + s;
                    var n = localStorage.getItem("zxg");
                    if (n != null) {
                        n = JSON.parse(n)
                    } else {
                        n = {}
                    }
                    if (n.customitem == undefined) {
                        n.customitem = {}
                    }
                    if (r.isDefault(i)) {
                        try {
                            delete n.customitem[t]
                        } catch (a) {}
                    } else {
                        n.customitem[t] = i.map(function(e) {
                            return e.name
                        })
                    }
                    localStorage.setItem("zxg", JSON.stringify(n));
                    r.modal.close();
                    l("保存成功！", function() {
                        u.changeShowType("zx", 0)
                    })
                })
            },
            getSetting: function(e) {
                var t = this;
                var a = u.thisgroupid;
                var i = s.type_config.default_zx.show_fields;
                if (e != "zx") {
                    return Promise.resolve(s.type_config[e].show_fields)
                }
                if (!window.localStorage) {
                    return Promise.resolve(i)
                }
                return o.get().then(function(e) {
                    var t = e + "_" + a;
                    var n = localStorage.getItem("zxg");
                    if (n == null) {
                        return i
                    }
                    n = JSON.parse(n);
                    if (n.customitem == undefined || n.customitem[t] == undefined) {
                        return i
                    }
                    return _.difference(n.customitem[t], s.type_config.required.show_fields)
                })
            }
        }
    },
    "./modules/zxg/data.js": function(e, t) {
        e.exports = {
            moveGroup: function(e, t, n) {
                return $.ajax({
                    url: "./api/zxg/movegroup",
                    type: "POST",
                    dataType: "json",
                    data: {
                        code: e,
                        fromgroupid: t,
                        togroupid: n
                    }
                })
            },
            batchDelete: function(e, t) {
                return $.ajax({
                    url: "./api/zxg/batchdeletestock",
                    type: "POST",
                    dataType: "json",
                    data: {
                        codes: e,
                        groupid: t
                    }
                })
            }
        }
    },
    "./modules/zxg/dgtl.html": function(e, t) {
        e.exports = '<div class="dgtldiv sscroll">\r\n  <ul id="dgtllist">\r\n    {{~it.stocklist :value:index}}\r\n    <li><a href="{{=it.text.getLinkByCode(value.code)}}"><img src="http://webquotepic.eastmoney.com/GetPic.aspx?nid={{=value.code}}&imagetype={{=value.imgmoban}}&rnd={{=it.rnd}}" alt=""></a></li>\r\n    {{~}}\r\n  </ul>\r\n  <div class="pager" id="dgtlpager">\r\n    {{=it.pagerhtml}}\r\n  </div>\r\n</div>'
    },
    "./modules/zxg/dgtl.js": function(e, t, n) {
        var o = n("./node_modules/dot/doT.js");
        var l = n("./modules/zxg/dgtl.html");
        var a = n("./modules/pager/index.js");
        var u = n("./modules/text/index.js");
        var i = n("./modules/datacache/index.js");
        var d = n("./modules/hegui/index.js");
        var f = {
            zscd: null,
            show: function(e) {
                f.showPage(e, 1);
                try {
                    clearInterval(f.zscd)
                } catch (t) {}
                f.zscd = setInterval(function() {
                    if (i.thisshowtype != "dgtl") {
                        try {
                            clearInterval(f.zscd)
                        } catch (t) {}
                        return false
                    }
                    f.showPage(e, f.thispage)
                }, 30 * 1e3)
            },
            thispage: 1,
            showPage: function(t, e) {
                var n = f;
                n.thispage = e;
                var a = t.slice(12 * (e - 1), 12 * e);
                var i = d.isHKDelay();
                var r = a.map(function(e) {
                    var t = "ZXGINDEX";
                    if (e.indexOf("116.") == 0 && i > 0) {
                        t = "ZXGINDEX_D"
                    }
                    return {
                        imgmoban: t,
                        code: e
                    }
                });
                var s = $(o.template(l)({
                    stocklist: r,
                    text: u,
                    pagerhtml: f.pager(t.length, e),
                    rnd: Math.floor(Math.random() * 99999 + 1)
                }));
                $("#wl_mainbody").html(s);
                $("img", s).one("error", function() {
                    setTimeout(function() {
                        $(this).attr("src", $(this).attr("src"))
                    }
                    .bind(f), 500)
                });
                $("#dgtlpager a").click(function() {
                    var e = $(this).data("page");
                    n.showPage(t, e);
                    return false
                })
            },
            pager: function(e, t) {
                var n = "";
                n = a(t, 12, e, "javascript:;");
                return n
            }
        };
        e.exports = f
    },
    "./modules/zxg/dragdrop.js": function(e, t, n) {
        var f = n("./modules/datacache/index.js");
        var s = n("./node_modules/lodash/debounce.js");
        var o = n("./modules/znzg/index.js");
        e.exports = {
            init: function() {
                if (f.pxorder) {
                    return false
                }
                var a = this;
                var e = {};
                var i = 0;
                var r = 0;
                $("#wltable tr").draggable({
                    helper: function() {
                        o.close();
                        return a.getHelper($(this).index())
                    },
                    axis: "y",
                    containment: "parent",
                    cursor: "move",
                    opacity: .7,
                    start: function(e, t) {
                        var n = $(this).index();
                        i = n;
                        $("#tablethdd5").scrollLeft(0);
                        $("#tablethdd5").css({
                            "z-index": 10
                        })
                    }
                });
                $("#wltable tr").droppable({
                    cursor: "move",
                    drop: function(e, t) {
                        var n = $(this).index();
                        r = n;
                        a.moveStock(i, r)
                    },
                    deactivate: s(function() {
                        $("#tablethdd5").css({
                            "z-index": 5
                        });
                        $("#tablethd4 tr").removeClass("dropon");
                        $("#wltable tr").removeClass("dropon")
                    }, 200),
                    over: function(e, t) {
                        var n = $(this).index();
                        $("#tablethd4 tr").removeClass("dropon");
                        $("#tablethd4 tr:eq(" + n + ")").addClass("dropon");
                        $("#wltable tr").removeClass("dropon");
                        $("#wltable tr:eq(" + n + ")").addClass("dropon")
                    }
                });
                $("#tablethdd4 tr").draggable({
                    helper: function() {
                        o.close();
                        return a.getHelper($(this).index(), true)
                    },
                    axis: "y",
                    containment: "parent",
                    cursor: "move",
                    opacity: .7,
                    start: function(e, t) {
                        var n = $(this).index();
                        i = n;
                        $("#tablethdd5").scrollLeft(0);
                        $("#tablethdd5").css({
                            "z-index": 10
                        })
                    }
                });
                $("#tablethdd4 tr").droppable({
                    cursor: "move",
                    drop: function(e, t) {
                        var n = $(this).index();
                        r = n;
                        a.moveStock(i, r)
                    },
                    deactivate: s(function() {
                        $("#tablethdd5").css({
                            "z-index": 5
                        });
                        $("#tablethd4 tr").removeClass("dropon");
                        $("#wltable tr").removeClass("dropon")
                    }, 200),
                    over: function(e, t) {
                        var n = $(this).index();
                        $("#tablethd4 tr").removeClass("dropon");
                        $("#tablethd4 tr:eq(" + n + ")").addClass("dropon");
                        $("#wltable tr").removeClass("dropon");
                        $("#wltable tr:eq(" + n + ")").addClass("dropon")
                    }
                })
            },
            getHelper: function(e, t) {
                var n = $("#tablethd4").width();
                if (t) {
                    n = 0
                }
                var a = $("#tablethd4 tr:eq(" + e + ") td");
                var i = $("#wltable tr:eq(" + e + ") td");
                var r = $('<table style="margin-left:-' + n + 'px;" class="tablethd tabledrag"><tr></tr></table>');
                var s = a;
                if (!t) {
                    s = a.add(i)
                }
                s.each(function(e, t) {
                    var n;
                    if (e == 0) {
                        n = $('<td style="width:' + t.clientWidth + 'px"><em></em></td>')
                    } else {
                        n = $('<td style="width:' + t.clientWidth + 'px"><em>' + $(t).text() + "</em></td>")
                    }
                    $("tr", r).append(n)
                });
                return r
            },
            moveStock: function(a, i) {
                var r = $("#tablethd4>tr:eq(" + a + ")").data("code").toString();
                var e = $("#tablethd4>tr:eq(" + (i - 1) + ")");
                var t = $("#tablethd4>tr:eq(" + i + ")");
                var n = e.data("code").toString();
                var s = t.data("code").toString();
                n = n || "";
                s = s || "";
                if (i == 0) {
                    n = ""
                }
                var o = t.is(".topcode");
                var l = [];
                var u = [];
                $("#tablethd4>tr").each(function(e, t) {
                    var n = $(this).data("code").toString();
                    if (e == a) {
                        return true
                    }
                    if (e == i) {
                        if (o) {
                            u.push(r)
                        } else {
                            l.push(r)
                        }
                    }
                    if ($(this).is(".topcode")) {
                        u.push(n)
                    } else {
                        l.push(n)
                    }
                });
                var d = {
                    codes: l.reverse().join(","),
                    groupid: f.thisgroupid
                };
                if (f.is_defaultgroup) {
                    d.topgroupid = f.topgroupid;
                    d.topcodes = u.reverse().join(",")
                }
                $.ajax({
                    url: "./api/zxg/batchedit",
                    type: "POST",
                    dataType: "json",
                    data: d
                }).done(function(e) {
                    if (e.re) {
                        if (f.is_defaultgroup) {
                            f.top_stocks = d.topcodes.split(",").reverse()
                        }
                        f.changeGroup();
                        var t = $("#tablethd4 tr:eq(" + a + ")");
                        var n = $("#wltable tr:eq(" + a + ")");
                        $("#tablethd4 tr:eq(" + i + ")").before(t);
                        $("#wltable tr:eq(" + i + ")").before(n)
                    }
                }).fail(function(e) {})
            }
        }
    },
    "./modules/zxg/edit_group.js": function(e, t, n) {
        var a = n("./modules/popmenu/index.js");
        var i = n("./modules/modal/index.js");
        var r = n("./modules/modal/alert.js");
        var s = n("./modules/modal/confirm.js");
        var o = n("./modules/dom/index.js");
        var l = n("./modules/datacache/index.js");
        var u = n("./modules/zxg/data.js");
        e.exports = {
            bind: function() {}
        }
    },
    "./modules/zxg/edit_stock.html": function(e, t) {
        e.exports = '<div>\r\n  <ul class="popmenulist">\r\n    <li><a href="javascript:;" class="deletestock" target="_self">删除</a></li>\r\n    {{? it.isdefaultgroup }}\r\n    <li class="settopli"><a href="javascript:;" class="settop" target="_self">置顶</a></li>\r\n    <li class="canceltopli"><a href="javascript:;" class="canceltop" target="_self">取消置顶</a></li>\r\n    {{?}}\r\n    <li><a href="javascript:;" class="editgroupname" target="_self">修改分组 &nbsp;<span class="icon icon_rarrow"></span></a>\r\n      <ul class="popmenud2list">\r\n        {{~it.groupdata :value:index}}\r\n        <li><a href="javascript:;" class="movegroup" target="_self" data-groupid="{{=value.id}}">{{=value.name}}</a></li>\r\n        {{~}}\r\n      </ul>\r\n    </li>\r\n    <li><a href="javascript:;" class="editnote" target="_self">交易笔记</a></li>\r\n    <li class="addtixingli"><a href="javascript:;" class="addtixing" target="_self">加提醒</a></li>\r\n  </ul>\r\n</div>'
    },
    "./modules/zxg/edit_stock.js": function(e, t, n) {
        var c = n("./modules/popmenu/index.js");
        var p = n("./modules/modal/index.js");
        var a = n("./modules/zxg/edit_stock.html");
        var i = n("./modules/modal/confirm.js");
        var m = n("./modules/modal/alert.js");
        var v = n("./node_modules/dot/doT.js");
        var g = n("./modules/datacache/index.js");
        var x = n("./modules/zxg/note.html");
        var r = n("./modules/quote/index.js");
        var s = n("./modules/zxg/note.js");
        var h = n("./modules/tixing/addtixing.js");
        var o = n("./modules/zxg/edit_group.js");
        var b = n("./modules/zxg/groups.js");
        var y = n("./modules/text/index.js");
        e.exports = {
            bindOption: function() {
                var d = this;
                var e = g.groupdata.groups.filter(function(e) {
                    if (e.id == g.groupdata.horder || e.id == g.thisgroupid) {
                        return false
                    }
                    return true
                });
                var f = v.template(a)({
                    groupdata: e,
                    isdefaultgroup: g.is_defaultgroup
                });
                $("#tablethd6 .stockoptiontd").each(function(e, t) {
                    var n = $(f);
                    var a = $(t);
                    var i = a.data("code").toString();
                    var r = a.data("name");
                    var s = a.data("m");
                    var o = a.data("t");
                    if (!h.hasTiXing(s, o)) {
                        $(".addtixingli", n).remove()
                    }
                    var l = g.top_stocks.indexOf(i) >= 0;
                    if (l) {
                        $(".settopli", n).hide()
                    } else {
                        $(".canceltopli", n).hide()
                    }
                    var u = new c({
                        target: $("em", a),
                        offsetx: -45,
                        content: n,
                        onHover: function() {
                            var e = n.offset().left + n.width() + 120;
                            if (e > $("body").width()) {
                                $(".editgroupname", n).html('<span class="icon icon_larrow"></span> 修改分组');
                                $(".popmenud2list", n).css({
                                    right: "100%",
                                    left: "auto"
                                }).addClass("popmenud2listsd2")
                            } else {
                                $(".editgroupname", n).html('修改分组 &nbsp;<span class="icon icon_rarrow"></span>');
                                $(".popmenud2list", n).css({
                                    right: "auto",
                                    left: "100%"
                                }).removeClass("popmenud2listsd2")
                            }
                        }
                    });
                    $(".deletestock", u.html).click(function() {
                        d.deleteStock(i, r);
                        return false
                    });
                    $(".editnote", u.html).click(function() {
                        d.editnote(i, r);
                        return false
                    });
                    $(".addtixing", u.html).click(function() {
                        h.add(i, r);
                        return false
                    });
                    $(".settop", u.html).click(function() {
                        d.setTop(i);
                        return false
                    });
                    $(".canceltop", u.html).click(function() {
                        d.cancelTop(i);
                        return false
                    });
                    $(".movegroup", u.html).click(function() {
                        var e = $(this).data("groupid");
                        b.moveGroup(i, g.thisgroupid, e);
                        return false
                    })
                })
            },
            deleteStock: function(t, e) {
                t = t.toString();
                var n = false;
                i("确定要删除 [" + e + "] 自选股吗？", function() {
                    if (n) {
                        return false
                    }
                    n = true;
                    $.ajax({
                        url: "./api/zxg/deletestock",
                        type: "POST",
                        dataType: "json",
                        data: {
                            code: t,
                            groupid: g.thisgroupid
                        }
                    }).done(function(e) {
                        if (e.re) {
                            m("删除成功");
                            _.pull(g.top_stocks, t);
                            g.changeGroup()
                        } else {
                            m(e.message)
                        }
                    }).fail(function(e) {
                        m(e.statusText)
                    }).always(function() {
                        n = false
                    })
                })
            },
            editnote: function(u, d) {
                u = u.toString();
                var f = this;
                var c = g.thisgroupid;
                var h = u.substring(u.indexOf(".") + 1);
                Promise.all([s.getNoteData(c, u), r.getStockBaseInfo(u)]).then(function(e) {
                    var t = e[0][0];
                    var n = e[1];
                    var a = n.f2 / Math.pow(10, n.f1);
                    var i = t.date.split("|")[0];
                    var r = t.date.split("|")[1];
                    i = i.substring(0, 4) + "-" + i.substring(4, 6) + "-" + i.substring(6);
                    var s = t.note.split("|");
                    if (!t.note) {
                        s = [0, 0, 0, 0, 0, 0, 0, "", ""]
                    }
                    var o = $(v.template(x)({
                        name: d,
                        code: h,
                        inputdate: i,
                        thatprice: r,
                        nowprice: y.textColor(a, n.f4),
                        data: s
                    }));
                    var l = new p({
                        content: o,
                        title: "交易管理"
                    });
                    l.show();
                    f.bindNoteForm($("#noteform", o), c, u, l);
                    $(".modalbtn_cancel", o).click(function() {
                        l.close()
                    })
                })
            },
            bindNoteForm: function(u, d, f, c) {
                var h = false;
                u.submit(function() {
                    var e = $.trim($(".c", u).val());
                    var t = $.trim($(".p", u).val());
                    var n = $.trim($(".m", u).val());
                    var a = $.trim($(".z", u).val());
                    var i = $.trim($(".y", u).val());
                    var r = $.trim($(".x", u).val());
                    var s = $.trim($(".h", u).val());
                    var o = $.trim($(".r", u).val());
                    var l = $.trim($(".b", u).val());
                    if (h) {
                        return false
                    }
                    h = true;
                    $.ajax({
                        url: "./api/zxg/editnote",
                        type: "POST",
                        dataType: "json",
                        data: {
                            code: f,
                            groupid: d,
                            c: e,
                            p: t,
                            m: n,
                            z: a,
                            y: i,
                            x: r,
                            h: s,
                            r: o,
                            b: l
                        }
                    }).done(function(e) {
                        if (e.re) {
                            m("修改成功", function() {
                                c.close()
                            });
                            if (g.thisshowtype == "ykyl") {
                                g.changeShowType()
                            }
                        } else {
                            m(e.message)
                        }
                    }).fail(function(e) {
                        m(e.statusText)
                    }).always(function() {
                        h = false
                    });
                    return false
                })
            },
            setTop: function(t) {
                $.ajax({
                    url: "./api/zxg/settop",
                    type: "POST",
                    dataType: "json",
                    data: {
                        code: t,
                        topgroupid: g.topgroupid
                    }
                }).done(function(e) {
                    console.info(e);
                    if (e.re) {
                        m("置顶成功！", function() {
                            g.top_stocks.unshift(t);
                            g.changeGroup()
                        })
                    } else {
                        m(e.message)
                    }
                }).fail(function(e) {})
            },
            cancelTop: function(t) {
                $.ajax({
                    url: "./api/zxg/canceltop",
                    type: "POST",
                    dataType: "json",
                    data: {
                        code: t,
                        topgroupid: g.topgroupid
                    }
                }).done(function(e) {
                    console.info(e);
                    if (e.re) {
                        m("取消置顶成功！", function() {
                            g.top_stocks = g.top_stocks.filter(function(e) {
                                return e != t
                            });
                            g.changeGroup()
                        })
                    } else {
                        m(e.message)
                    }
                }).fail(function(e) {})
            }
        }
    },
    "./modules/zxg/filltable.js": function(e, t, n) {
        var _ = n("./modules/text/index.js");
        var o = n("./modules/quote_ts/index.js");
        var j = n("./modules/zxg/edit_stock.js");
        var w = n("./modules/datacache/index.js");
        var k = n("./modules/info_mines/index.js");
        var T = n("./modules/zxg/itemconfig.js");
        var l = n("./modules/zxg/customitem.js");
        var u = n("./modules/jsutils/index.js");
        var A = n("./modules/stock_filter/index.js");
        var a = n("./node_modules/lodash/throttle.js");
        var S = n("./modules/zxg/dragdrop.js");
        var i = n("./modules/datadiff/index.js");
        var f = document.all && !window.atob;
        var c = {
            fulldata: null,
            sourcedata: null,
            dealFullData: function(n) {
                return Object.keys(n).map(function(e, t) {
                    n[e].index = parseInt(e);
                    return n[e]
                })
            },
            makeDefaultTableHtml: function(t, e) {
                this.fulldata = this.dealFullData(t);
                if (this.firstFullData) {
                    this.sourcedata = t;
                    var n = this;
                    l.getSetting(e).then(function(e) {
                        n.fillHTMl(t, e)
                    })
                } else {
                    this.reFillHTML(t)
                }
            },
            reFillHTML: function(s) {
                if ($("#tablethdd5").length <= 0) {
                    return false
                }
                if (w.thisshowtype == "ykyl") {
                    this.countYKYL()
                }
                var e = i(this.sourcedata, s);
                e.forEach(function(i) {
                    if (!i.change) {
                        return false
                    }
                    var r = $("#wltable #hqtable_h" + i.index);
                    if (i.fullchange) {
                        $("#znzgd").html("").hide();
                        var e = _.isHSStock(s[i.index].f13, s[i.index].f19);
                        var t = $("#tablethd4 #hqtablecode_h" + i.index);
                        var n = $("#tablethdd6 #hqtableoption_h" + i.index);
                        t.data("ishsstock", e);
                        r.data("ishsstock", e);
                        n.data("ishsstock", e);
                        t.data("code", i.code);
                        r.data("code", i.code);
                        n.data("code", i.code);
                        if (e) {
                            t.addClass("ishs");
                            r.addClass("ishs");
                            n.addClass("ishs")
                        } else {
                            t.removeClass("ishs");
                            r.removeClass("ishs");
                            n.removeClass("ishs")
                        }
                        $(".batchselect", t).val(i.code);
                        $(".td_f12 em", t).html(T.item_config.f12.html(s[i.index]));
                        $(".td_f14 em", t).html(T.item_config.f14.html(s[i.index]));
                        var a = $(".stockoptiontd", n);
                        a.data("code", i.code).data("m", s[i.index].f13).data("t", s[i.index].f19).data("name", s[i.index].f14)
                    }
                    Object.keys(i.changedata).forEach(function(e) {
                        var t = T.item_config[e];
                        var n = i.changedata[e];
                        var a = $(".td_" + e, r);
                        if (a.length <= 0) {
                            return false
                        }
                        a.data("odata", n);
                        $("em", a).html(t.html(s[i.index], i.index))
                    })
                })
            },
            fillHTMl: function(l, u) {
                var d = T.type_config.required.show_fields;
                var e = this;
                var t = $('<div class="tablethdd" id="tablethdd7"><table class="tablethd" id="tablethd7"></table></div>');
                var n = $("table", t);
                var a = $('<div class="tablethdd" id="tablethdd8"><table class="tablethd" id="tablethd8"></table></div>');
                var i = $("table", a);
                var r = $('<div class="tablethdd" id="tablethdd4"><table class="tablethd" id="tablethd4"></table><div class="ykylpatch"></div></div>');
                var s = $("table", r);
                var o = $('<div class="tablethdd sscroll" id="tablethdd5"><table class="wltable" id="wltable"></table><div class="ykylpatch"></div></div>');
                var f = $("table", o);
                var c = $('<div class="tablethdd" id="tablethdd6"><table class="tablethd" id="tablethd6"></table><div class="ykylpatch"></div></div>');
                var h = $("table", c);
                var p = $('<div id="tablethdd9"></div>');
                var m = [];
                var v = [];
                var g = [];
                var x = [];
                var b = [];
                var y = "全部";
                if (w.stocktype) {
                    y = A.typelist.find(function(e) {
                        return e.type == w.stocktype
                    }).name
                }
                m.push('<tr><th class="allstock"><em><input id="clickall" type="checkbox"> ' + y + ' <span class="icon icon_darrow3"></span></em></th>');
                d.forEach(function(e, t) {
                    var n = T.item_config[e];
                    m.push("<th");
                    if (n.sort && !w.forbid_sort) {
                        m.push(' class="pxth" data-px="' + e + '" title="点击排序"')
                    }
                    m.push("><em");
                    if (n.align) {
                        m.push(' class="tda_' + n.align + '"')
                    }
                    m.push(">" + (typeof n.name == "function" ? n.name() : n.name));
                    if (w.pxtype == e && w.pxorder) {
                        if (w.pxorder == "desc") {
                            m.push('<span class="icon icon_px2"></span')
                        } else if (w.pxorder == "asc") {
                            m.push('<span class="icon icon_px1"></span')
                        }
                    }
                    m.push("</em></th>")
                });
                m.push("</tr>");
                v.push("<tr>");
                u.forEach(function(e, t) {
                    var n = T.item_config[e];
                    v.push("<th");
                    if (n.sort && !w.forbid_sort) {
                        v.push(' class="pxth" data-px="' + e + '" title="点击排序"')
                    }
                    v.push("><em");
                    if (n.align) {
                        v.push(' class="tda_' + n.align + '"')
                    }
                    v.push(">" + (typeof n.name == "function" ? n.name() : n.name));
                    if (w.pxtype == e && w.pxorder) {
                        if (w.pxorder == "desc") {
                            v.push('<span class="icon icon_px2"></span')
                        } else if (w.pxorder == "asc") {
                            v.push('<span class="icon icon_px1"></span')
                        }
                    }
                    v.push("</em></th>")
                });
                if (w.thisshowtype == "zx") {
                    v.push('<th><em id="thitemsetting"><span class="icon icon_option"></span> 增加指标&nbsp;&nbsp;</em></th>')
                }
                v.push('<th class="bcth"><em></em></th></tr>');
                if (w.pxorder) {
                    $("#wl_mainbody").addClass("closeznzg")
                } else {
                    $("#wl_mainbody").removeClass("closeznzg")
                }
                Object.keys(l).forEach(function(e, a) {
                    var i = l[e];
                    var t = i.f13 + "." + i.f12;
                    var n = false;
                    if (w.is_defaultgroup) {
                        if (w.top_stocks.indexOf(t) >= 0) {
                            n = true
                        }
                    }
                    var r = "";
                    if (n) {
                        r += "topcode"
                    }
                    var s = "";
                    if (n) {
                        s = '<span class="icon icon_settop"></span> '
                    }
                    var o = _.isHSStock(i.f13, i.f19);
                    if (o) {
                        r += " ishs"
                    }
                    g.push('<tr id="hqtablecode_h' + a + '" data-code="' + t + '" data-ishsstock="' + (o ? 1 : 0) + '" class="' + r + '"><td class="tdselect"><em class="tda_left"><div class="znzgd"></div>' + s + '<label><input type="checkbox" class="batchselect" value="' + t + '"> <i>' + (parseInt(e) + 1) + "</i></label></em></td>");
                    x.push('<tr id="hqtable_h' + a + '" data-code="' + t + '" data-ishsstock="' + (_.isHSStock(i.f13, i.f19) ? 1 : 0) + '" class="' + r + '">');
                    b.push('<tr id="hqtableoption_h' + a + '" data-code="' + t + '" data-ishsstock="' + (_.isHSStock(i.f13, i.f19) ? 1 : 0) + '">');
                    d.forEach(function(e, t) {
                        var n = T.item_config[e];
                        g.push('<td class="td_' + e);
                        if (w.pxorder && w.pxtype && w.pxtype == e) {
                            g.push(" pxtd")
                        }
                        g.push('" data-odata="' + i[e] + '"><em');
                        if (n.align) {
                            g.push(' class="tda_' + n.align + '"')
                        }
                        g.push(">" + n.html(i, a) + "</em></td>")
                    });
                    u.forEach(function(e, t) {
                        var n = T.item_config[e];
                        x.push('<td class="td_' + e);
                        if (w.pxorder && w.pxtype && w.pxtype == e) {
                            x.push(" pxtd")
                        }
                        x.push('" data-odata="' + i[e] + '"><em');
                        if (n.align) {
                            x.push(' class="tda_' + n.align + '"')
                        }
                        x.push(">" + n.html(i, a) + "</em></td>")
                    });
                    if (w.thisshowtype == "zx") {
                        x.push("<td><em></em></td>")
                    }
                    b.push('<td class="stockoptiontd" data-code="' + t + '" data-m="' + i.f13 + '"  data-t="' + i.f19 + '" data-name="' + i.f14 + '"><em><span class="icon icon_stockmore"></span></em></td>');
                    x.push('<td class="bcth"><em></em></td></tr>');
                    b.push("</tr>");
                    g.push("</tr>")
                });
                n.append(m.join(""));
                i.append(v.join(""));
                s.append(g.join(""));
                f.append(x.join(""));
                h.append(b.join(""));
                $("#wl_mainbody").html("");
                $("#wl_mainbody").html('<div id="znzgd" class="sscroll"></div>').append(t).append(a).append(r).append(o).append(c).append(p);
                if (w.thisshowtype == "ykyl") {
                    $("#wl_mainbody").append('<div id="ykylcount"></div>');
                    e.countYKYL();
                    $(".ykylpatch").css({
                        height: 30
                    })
                }
                this.bindFill();
                this.resizeFill();
                S.init();
                $("#allstock").show();
                k.show();
                j.bindOption()
            },
            bindFill: function() {
                $("#tablethdd5").on("scroll", a(function() {
                    var e = $(this).scrollTop();
                    var t = $(this).scrollLeft();
                    $("#tablethdd4").scrollTop(e);
                    $("#tablethdd6").scrollTop(e);
                    $("#tablethdd8").scrollLeft(t);
                    if ($("#znzgd").is(":visible")) {
                        var n = $("#tablethdd5").get(0).offsetWidth - $("#tablethdd5").get(0).clientWidth;
                        var a = $("#tablethd4 tr").eq($("#znzgd").data("index")).offset().top - (122 + $("#zshq").outerHeight());
                        $("#znzgd").css({
                            top: a,
                            width: $("#wl_mainbody").get(0).clientWidth - n
                        })
                    }
                    if ($("#ykylcount").length) {
                        var a = $("#tablethd4").height() + 36 - e;
                        $("#ykylcount").css({
                            top: a
                        })
                    }
                }, 1e3 / 120));
                $("#wltable tr").hover(function() {
                    var e = $(this).index();
                    $(this).addClass("hover");
                    $("#tablethd4 tr:eq(" + e + ")").addClass("hover");
                    $("#tablethd6 tr:eq(" + e + ")").addClass("hover")
                }, function() {
                    var e = $(this).index();
                    $(this).removeClass("hover");
                    $("#tablethd4 tr:eq(" + e + ")").removeClass("hover");
                    $("#tablethd6 tr:eq(" + e + ")").removeClass("hover")
                })
            },
            resizeFill: function() {
                if ($("#tablethdd5").length <= 0) {
                    return false
                }
                var n = $("#tablethd4 tr:first em");
                $("#tablethd7 em").each(function(e, t) {
                    if (e > 0) {
                        if (n.eq(e).width() > 0) {
                            $(t).width(n.eq(e).width())
                        } else {
                            n.eq(e).width($(t).width())
                        }
                    }
                });
                var e = $("#tablethdd4").width();
                var t = $("#wl_mainbody").height();
                var a = $("#wl_mainbody").width();
                $("#tablethdd8").css({
                    left: e,
                    width: a - e
                });
                $("#tablethdd5").css({
                    left: 0,
                    height: t - 36,
                    width: a,
                    "padding-left": e
                });
                $("#tablethdd7").css({
                    width: e
                });
                c.resizeZWTable();
                var n = $("#tablethd4 tr:first em");
                $("#tablethd7 em").each(function(e, t) {
                    if (e > 0 && n.eq(e).width() > 0) {
                        $(t).width(n.eq(e).width())
                    }
                });
                var i = $("#tablethdd5").get(0).offsetWidth - $("#tablethdd5").get(0).clientWidth;
                var r = $("#tablethdd5").get(0).offsetHeight - $("#tablethdd5").get(0).clientHeight;
                $("#tablethdd6").css({
                    height: $("#tablethdd5").get(0).clientHeight
                });
                $("#tablethdd4").css({
                    height: $("#tablethdd5").get(0).clientHeight
                });
                $("#tablethdd6").css({
                    right: i
                });
                if (i) {
                    $("#tablethdd9").css({
                        width: 36 + i
                    })
                }
                $("#tablethd8 em:last").width(0);
                $("#wltable tr:first em:last").width(0);
                var s = $("#tablethdd5").width() - $("#wltable").width();
                if (s > 0) {
                    $("#tablethd8 em:last").width(s);
                    $("#wltable tr:first em:last").width(s - 36)
                } else {
                    $("#tablethd8 em:last").width(36);
                    $("#wltable tr:first em:last").width(36)
                }
                if ($("#znzgd").is(":visible")) {
                    var i = $("#tablethdd5").get(0).offsetWidth - $("#tablethdd5").get(0).clientWidth;
                    var o = $("#tablethd4 tr").eq($("#znzgd").data("index")).offset().top - (122 + $("#zshq").outerHeight());
                    $("#znzgd").css({
                        top: o,
                        width: $("#wl_mainbody").get(0).clientWidth - i
                    })
                }
                if ($("#ykylcount").length) {
                    var o = $("#tablethd4").height() + 36;
                    $("#ykylcount").css({
                        top: o
                    })
                }
            },
            resizeZWTable: function() {
                var n = $("#wltable tr:first em");
                $("#tablethd8 em").each(function(e, t) {
                    if ($(t).parent().is(".bcth")) {
                        return false
                    }
                    if ($(t).width() > n.eq(e).width()) {
                        n.eq(e).width($(t).width())
                    } else {
                        $(t).width(n.eq(e).width())
                    }
                })
            },
            dealChangeMove: function(n) {
                var a = this;
                Object.keys(n).forEach(function(e, t) {
                    a.fulldata[parseInt(e)].index = parseInt(n[e])
                });
                this.fulldata.sort(function(e, t) {
                    return e.index - t.index
                })
            },
            dealTableChange: function(a) {
                var i = [];
                $("#wltable tr").each(function(e, t) {
                    $(t).data("index", e);
                    i.push($(t))
                });
                Object.keys(a).forEach(function(e, t) {
                    var n = parseInt(e);
                    i[n].data("index", a[e])
                });
                i.sort(function(e, t) {
                    return e.data("index") - t.data("index")
                });
                i.forEach(function(e, t) {
                    e.attr("id", "hqtable_h" + t);
                    $("#wltable").append(e)
                })
            },
            dealCodeTableChange: function(a) {
                var i = [];
                $("#tablethd4 tr").each(function(e, t) {
                    $(t).data("index", e);
                    i.push($(t))
                });
                Object.keys(a).forEach(function(e, t) {
                    var n = parseInt(e);
                    i[n].data("index", a[e])
                });
                i.sort(function(e, t) {
                    return e.data("index") - t.data("index")
                });
                i.forEach(function(e, t) {
                    e.attr("id", "hqtablecode_h" + t);
                    $(".tdselect i", e).text(t + 1);
                    $("#tablethd4").append(e)
                })
            },
            extendTSData: function(n) {
                var a = this;
                Object.keys(n).forEach(function(e) {
                    var t = parseInt(e);
                    $.extend(a.fulldata[t], n[e])
                })
            },
            diffChangeTabel: function(n, e) {
                if (e) {
                    this.dealChangeMove(e);
                    this.dealTableChange(e);
                    this.dealCodeTableChange(e)
                }
                this.extendTSData(n);
                var d = this;
                if (w.thisshowtype == "ykyl") {
                    this.countYKYL()
                }
                Object.keys(n).forEach(function(o, e) {
                    var t = n[o];
                    var l = $("#wltable #hqtable_h" + o);
                    var u = l.index();
                    Object.keys(t).forEach(function(e) {
                        if (e == "f12" || e == "f13") {
                            return false
                        }
                        var t = $(".td_" + e, l);
                        var n = t.data("odata");
                        var a = d.fulldata[o][e];
                        var i = T.item_config[e].html;
                        t.html("<em>" + i(d.fulldata[o]) + "</em>").data("odata", a);
                        var r = "transparent";
                        if (t.is(".pxtd")) {
                            r = "#f2f2f2"
                        }
                        var s = "";
                        if (a > n) {
                            s = "#ffe7e7"
                        } else if (n > a) {
                            s = "#caffe2"
                        }
                        if (w.thisshowtype == "ykyl" && e == "f2") {
                            $(".td_c4", l).html("<em>" + T.item_config["c4"].html(d.fulldata[o], u) + "</em>");
                            $(".td_c5", l).html("<em>" + T.item_config["c5"].html(d.fulldata[o], u) + "</em>");
                            $(".td_c6", l).html("<em>" + T.item_config["c6"].html(d.fulldata[o], u) + "</em>");
                            $(".td_c7", l).html("<em>" + T.item_config["c7"].html(d.fulldata[o], u) + "</em>")
                        }
                        if (f) {
                            if (s) {
                                t.css({
                                    "background-color": s
                                });
                                setTimeout(function() {
                                    t.css({
                                        "background-color": r
                                    })
                                }, 750)
                            }
                        } else {
                            if (s) {
                                t.css({
                                    "background-color": s
                                });
                                setTimeout(function() {
                                    t.css({
                                        "background-color": r
                                    })
                                }, 500)
                            }
                        }
                    })
                });
                c.resizeZWTable()
            },
            countYKYL: function() {
                var i = this;
                var r = 0;
                var s = 0;
                var o = 0;
                var l = 0;
                var u = 0;
                var d = 0;
                Object.keys(this.fulldata).forEach(function(e, t) {
                    var n = i.fulldata[e];
                    var a = w.notedata[t].note;
                    r += a[0];
                    s += parseFloat(a[1] * a[0]) + parseFloat(a[3]) + parseFloat(a[1] * a[0]) * (parseFloat(a[2]) + parseFloat(a[4])) / 1e3;
                    o += a[0] * (n.f2 / Math.pow(10, n.f1));
                    if (a[1] > 0 && a[0] > 0) {
                        l += n.f2 / Math.pow(10, n.f1) - a[1];
                        u += n.f2 / Math.pow(10, n.f1);
                        d = o - s
                    }
                });
                if (d < 1e4) {
                    d = parseFloat(d.toFixed(2))
                }
                var e = s == 0 ? "0.00" : ((o - s) / s * 100).toFixed(2);
                $("#ykylcount").html("&nbsp; 当前页总计： 总持股 " + r + " &nbsp;&nbsp; 总成本 " + _.formatNum(s.toFixed(2)) + " &nbsp;&nbsp; 总市值 " + _.formatNum(o.toFixed(2)) + " &nbsp;&nbsp; 总每股盈亏 " + _.textColor(l.toFixed(2), l) + " &nbsp;&nbsp; 总盈亏率 " + _.textColor(e + "%", e) + " &nbsp;&nbsp; 总浮动盈亏 " + _.textColor(_.formatNum(d.toFixed(2)), d))
            },
            firstFullData: true,
            linkTS: function(a, i) {
                try {
                    clearInterval(this.tsErrorCD)
                } catch (s) {}
                var r = this;
                this.firstFullData = true;
                l.getSetting(i).then(function(e) {
                    var t = T.type_config.required.show_fields.concat(e);
                    var n = [];
                    t.forEach(function(e) {
                        n = n.concat(T.item_config[e].needfields)
                    });
                    n = u.arrayFilterSame(n);
                    r.tsErrorCD = setTimeout(function() {
                        r.tsErrorDeal(a, n, i)
                    }, 4e3);
                    o.bindCodes(a, n, function(e) {
                        try {
                            clearTimeout(r.tsErrorCD)
                        } catch (s) {}
                        if (e.full == 1) {
                            r.makeDefaultTableHtml(e.data.diff, i);
                            r.firstFullData = false
                        }
                        if (e.full == 0 && e.data.diff) {
                            r.diffChangeTabel(e.data.diff, e.data.mv)
                        }
                    }, function() {
                        $("#wl_mainbody").html("")
                    })
                }, function() {
                    $("#wl_mainbody").html("")
                })
            },
            tsErrorCD: null,
            tsErrorDeal: function(e, t, n) {
                var a = this;
                o.close();
                try {
                    clearInterval(this.tsErrorCD)
                } catch (i) {}
                o.bindCodesGet(e, t, function(e) {
                    if (e.rc == 0 && e.data) {
                        a.makeDefaultTableHtml(e.data.diff, n);
                        a.firstFullData = false
                    }
                });
                this.tsErrorCD = setInterval(function() {
                    o.bindCodesGet(e, t, function(e) {
                        if (e.rc == 0 && e.data) {
                            a.makeDefaultTableHtml(e.data.diff, n);
                            a.firstFullData = false
                        }
                    })
                }, 60 * 1e3)
            }
        };
        w.resizeFill = c.resizeFill;
        window.resizeFill = c.resizeFill;
        e.exports = c
    },
    "./modules/zxg/groups.js": function(e, t, n) {
        var f = n("./modules/datacache/index.js");
        var r = n("./node_modules/lodash/clone.js");
        var s = n("./modules/utils/index.js");
        var o = n("./modules/modal/index.js");
        var l = n("./modules/modal/alert.js");
        var u = n("./modules/modal/confirm.js");
        var d = n("./modules/dom/index.js");
        var a = n("./modules/zxg/data.js");
        var c = null;
        var i = {
            bind: function() {
                var a = this;
                $("#moregroupul").on("click", "li", function() {
                    var e = $(this).data("groupid");
                    f.changeGroup(e)
                });
                $("#zxggrouplist").on("click", ".groupeditli li", function() {
                    var e = $(this).data("groupname");
                    var t = $(this).data("groupid");
                    var n = $(this).parents("li");
                    if ($(this).is(".modygroupli")) {
                        a.editGroupName(t, e, n)
                    } else if ($(this).is(".deletegroupli")) {
                        a.deleteGroup(t, e, n)
                    }
                })
            },
            reloadGroupHtml: function() {},
            makeGroupHtml: function(e, t) {
                if (!f.groupdata) {
                    return false
                }
                if (e) {
                    f.thisgroupid = e
                }
                var n = r(f.groupdata.groups);
                if (t) {
                    n = s.arrayJump(n, t, 1)
                }
                var a = [];
                n.forEach(function(e, t) {
                    if (e.id == f.groupdata.horder) {
                        return
                    }
                    a.push('<li data-groupid="' + e.id + '" data-groupname="' + e.name + '" class="populd lia noshow');
                    if (f.thisgroupid == null && t == 0) {
                        a.push(" on")
                    } else if (e.id == f.thisgroupid) {
                        a.push(" on")
                    }
                    a.push('"><a href="javascript:;" target="_self">' + e.name + "</a>");
                    a.push('<ul class="popul groupeditli w100"><div class="tooltip__arrow"></div><div class="poplis"><li data-groupid="' + e.id + '" data-groupname="' + e.name + '" class="modygroupli lia"><a href="javascript:;" target="_self">修改名称</a></li><li data-groupid="' + e.id + '" data-groupname="' + e.name + '" class="lia deletegroupli"><a href="javascript:;" target="_self">删除组合</a></li></div></ul>');
                    a.push("</li>")
                });
                a = $(a.join(""));
                $("#zxggrouplist").html(a);
                this.resizeGroup();
                try {
                    clearTimeout(c)
                } catch (i) {}
                c = setTimeout(function() {
                    var e = $("#zxggrouplist li.on");
                    var t = e.index();
                    if (t == 0) {
                        return false
                    }
                    e.one("mouseover", function() {
                        $(this).removeClass("noshow")
                    })
                }, 200)
            },
            resizeGroup: function() {
                var i = $(".wl_t").width() - 335;
                var r = [];
                var s = 0;
                var o = false;
                var l = $(".moregroup").outerWidth();
                var u = 130;
                var d = null;
                $(".moregroup").hide();
                $(".moregroup .poplis").html("");
                $("#zxggrouplist>li[data-groupid]").each(function(e, t) {
                    var n = $(t).outerWidth();
                    s += n;
                    var a = true;
                    if (s + l + u > i) {
                        a = false
                    }
                    r.push({
                        ele: $(this),
                        index: e,
                        width: n,
                        show: a
                    });
                    if (!a) {
                        if ($(this).is(".on") && !a) {
                            d = e
                        }
                        o = true
                    }
                });
                if (!o) {
                    return "no_resize"
                }
                r.forEach(function(e, t) {
                    if (!e.show) {
                        $(".popul", e.ele).remove();
                        $(".moregroup .poplis").append(e.ele)
                    }
                });
                if (o) {
                    $(".moregroup").css({
                        display: "inline-block"
                    })
                }
                if (d) {
                    this.makeGroupHtml(f.thisgroupid, d);
                    return "resize_again"
                }
                return "resize_done"
            },
            editGroupName: function(e, t, n) {
                var a = this;
                var i = $('<div><form target="_self"><input type="text" value="' + t + '" class="modalinput" id="newgroupname"><div class="modalbtnd"><button type="submit" class="modalbtn_default">确 定</button> &nbsp; <a href="javascript:;" target="_self" class="modalbtn_cancel">取 消</a></div></form></div>');
                var r = new o({
                    content: i,
                    title: "请输入组合名<small>（最多6个汉字或12个字符）</small>"
                });
                r.show(function() {
                    d.cursorMoveEnd($("#newgroupname", i).get(0))
                });
                $(".modalbtn_cancel", i).click(function() {
                    r.close()
                });
                var s = false;
                $("form", i).submit(function() {
                    if (s) {
                        return false
                    }
                    var t = $.trim($("#newgroupname", i).val());
                    s = true;
                    $.ajax({
                        url: "./api/zxg/editgroupname",
                        type: "POST",
                        dataType: "json",
                        data: {
                            groupid: e,
                            groupname: t
                        }
                    }).done(function(e) {
                        if (e.re) {
                            l("修改成功");
                            a.reloadGroupInfo();
                            n.text(t)
                        } else {
                            l(e.message)
                        }
                    }).fail(function(e) {
                        l(e.statusText)
                    }).always(function() {
                        s = false;
                        r.close()
                    });
                    return false
                })
            },
            deleteGroup: function(e, t, n) {
                var a = this;
                var i = false;
                u("确定要删除 [" + t + "] 分组吗？", function() {
                    if (i) {
                        return false
                    }
                    i = true;
                    $.ajax({
                        url: "./api/zxg/deletegroup",
                        type: "POST",
                        dataType: "json",
                        data: {
                            groupid: e
                        }
                    }).done(function(e) {
                        if (e.re) {
                            l("删除成功");
                            a.reloadGroupInfo();
                            f.thisgroupid = f.firstgroupid;
                            f.changeGroup()
                        } else {
                            l(e.message)
                        }
                    }).fail(function(e) {
                        l(e.statusText)
                    }).always(function() {
                        i = false
                    })
                })
            },
            addGroup: function() {
                var t = this;
                var n = $('<div><form target="_self"><input type="text" class="modalinput" id="newgroupname"><div class="modalbtnd"><button type="submit" class="modalbtn_default">确 定</button> &nbsp; <a href="javascript:;" target="_self" class="modalbtn_cancel">取 消</a></div></form></div>');
                var a = new o({
                    content: n,
                    title: "请输入组合名<small>（最多6个汉字或12个字符）</small>"
                });
                a.show(function() {
                    $("#newgroupname", n).focus()
                });
                $(".modalbtn_cancel", n).click(function() {
                    a.close()
                });
                var i = false;
                $("form", n).submit(function() {
                    if (i) {
                        return false
                    }
                    var e = $.trim($("#newgroupname", n).val());
                    if (e == "") {
                        l("组合名称不能为空！");
                        return false
                    }
                    i = true;
                    $.ajax({
                        url: "./api/zxg/addgroup",
                        type: "POST",
                        dataType: "json",
                        data: {
                            groupname: e
                        }
                    }).done(function(e) {
                        if (e.re) {
                            l("新建组合成功");
                            t.reloadGroupInfo()
                        } else {
                            l(e.message)
                        }
                    }).fail(function(e) {
                        l(e.statusText)
                    }).always(function() {
                        i = false;
                        a.close()
                    });
                    return false
                })
            },
            reloadGroupInfo: function() {
                var t = this;
                return $.ajax({
                    cache: false,
                    url: "./api/zxg/group",
                    type: "GET",
                    dataType: "json",
                    data: {}
                }).then(function(e) {
                    f.groupdata = e.result;
                    t.makeGroupHtml()
                })
            },
            moveGroup: function(t, e, n) {
                return a.moveGroup(t, e, n).then(function(e) {
                    if (e.re) {
                        if (f.is_defaultgroup) {
                            _.pull(f.top_stocks, t)
                        }
                        l("移动成功！");
                        f.changeGroup(n)
                    } else {
                        l(e.message)
                    }
                })
            }
        };
        e.exports = i
    },
    "./modules/zxg/index.js": function(e, t, n) {
        var a = n("./modules/zxg/filltable.js");
        var i = n("./modules/zxg/dgtl.js");
        var r = n("./modules/quote_ts/index.js");
        var s = n("./modules/zxg/edit_group.js");
        var o = n("./modules/datacache/index.js");
        var l = n("./modules/modal/alert.js");
        var u = n("./modules/zxg/note.js");
        var d = n("./modules/global_event/index.js");
        var f = n("./modules/stock_filter/index.js");
        var c = n("./modules/quote/index.js");
        var h = n("./modules/ylyc/web.js");
        var o = n("./modules/datacache/index.js");
        var p = n("./modules/zxg/customitem.js");
        var m = n("./modules/sessionstorage/index.js");
        var v = n("./modules/localstorage/index.js");
        var g = n("./modules/hegui/index.js");
        var x = n("./modules/zxg/groups.js");
        x.bind();
        var b = "";
        var y = "zx";
        var _ = "";
        function j() {
            $.ajax({
                url: "./api/zxg/group",
                type: "GET",
                dataType: "json",
                cache: false,
                data: {}
            }).done(function(e) {
                if (e.re) {
                    o.groupdata = e.result;
                    o.topgroupid = e.result.horder;
                    o.firstgroupid = e.result.groups[0].id;
                    o.top_stocks = e.result.topstocks;
                    if (m.get("groupid") && o.groupdata.groups.some(function(e) {
                        return e.id == m.get("groupid")
                    })) {
                        T(m.get("groupid"));
                        if (m.get("groupid") == e.result.groups[0].id) {
                            o.is_defaultgroup = true
                        }
                    } else {
                        k(e.result.groups[0].id);
                        o.is_defaultgroup = true
                    }
                }
            }).fail(function(e) {})
        }
        o.getGroup = j;
        var w = null;
        function k(e) {
            T(e)
        }
        function T(e) {
            o.pxorder = "";
            if (e == undefined) {
                e = o.thisgroupid
            } else {
                x.makeGroupHtml(e)
            }
            b = e;
            o.is_defaultgroup = o.firstgroupid == e;
            m.save("groupid", e);
            return $.ajax({
                url: "./api/zxg/getstockbygroupid/" + e,
                type: "GET",
                dataType: "json",
                cache: false,
                data: {
                    rnd: Math.floor(Math.random() * 1e7 + 1)
                }
            }).then(function(e) {
                if (e.re) {
                    _ = e.result;
                    _ = A(_, o.top_stocks);
                    if (o.stocktype) {
                        return c.getStockTypeInfo(_.join(","))
                    }
                }
            }).then(function(e) {
                if (o.stocktype) {
                    _ = f.filterCode(_, e, o.stocktype)
                }
                S(_);
                d.trigger("stockchange", _);
                o.stocks = _
            })
        }
        o.changeGroup = T;
        function A(e, t) {
            if (!o.is_defaultgroup) {
                return e
            }
            if (t.length == 1 && t[0] == "") {
                return e
            }
            var n = t.concat(e);
            var a = [];
            n.forEach(function(e) {
                a[e] = null
            });
            return Object.keys(a)
        }
        function S() {
            M()
        }
        function C() {
            $("#zxggrouplist").on("click", "a", function() {
                var e = $(this);
                var t = $(this).parent("li").data("groupid");
                if (!t) {
                    return true
                }
                o.stocktype = null;
                T(t).then(function() {})
            });
            $(".newgroupbtn").click(function() {
                x.addGroup();
                return false
            });
            z();
            $("#wltypelist").on("click", "li", function() {
                var e = $(this).data("type");
                var t = $(this).index();
                M(e, t);
                o.pxorder = ""
            });
            $("#stocklistfzbtn").click(function() {
                v.set("fontsize", "big");
                $("#wl_mainbody").addClass("wl_table_big");
                $("#stocklistfzbtn").hide();
                $("#stocklistfzbtn2").css({
                    display: "inline-block"
                });
                setTimeout(function() {
                    o.resizeFill()
                }, 1e3)
            });
            $("#stocklistfzbtn2").click(function() {
                v.set("fontsize", "small");
                $("#wl_mainbody").removeClass("wl_table_big");
                $("#stocklistfzbtn2").hide();
                $("#stocklistfzbtn").css({
                    display: "inline-block"
                });
                setTimeout(function() {
                    o.resizeFill()
                }, 1e3)
            });
            if (v.get("fontsize") == "big") {
                $("#wl_mainbody").addClass("wl_table_big");
                $("#stocklistfzbtn").hide();
                $("#stocklistfzbtn2").css({
                    display: "inline-block"
                })
            }
            $("#wl_mainbody").on("click", " .pxth", function() {
                var e = $(this).data("px");
                var t = o.pxorder;
                if (t == undefined || t == "") {
                    t = "desc"
                } else if (t == "desc") {
                    t = "asc"
                } else if (t = "asc") {
                    t = ""
                }
                if (e && o.pxtype && e != o.pxtype) {
                    t = "desc"
                }
                switch (t) {
                case "desc":
                    $("#pxtext").text("降序排序中（非默认状态下不可拖动，不可展开智能诊股）");
                    break;
                case "asc":
                    $("#pxtext").text("升序排序中（非默认状态下不可拖动，不可展开智能诊股）");
                    break;
                default:
                    $("#pxtext").text("默认排序中，点击表头可更改排序状态（拖动每行可以自定义排序）");
                    break
                }
                o.pxtype = e;
                o.pxorder = t;
                o.changeShowType()
            });
            $("body").on("click", "#thitemsetting", function() {
                p.showSetting()
            });
            $("#refreshtime").on("click", "a", function() {
                $("#refreshtime a").removeClass("on");
                $(this).addClass("on");
                var e = $(this).index();
                console.info(e);
                switch (e) {
                case 0:
                    o.refreshtime = 2e3;
                    break;
                case 1:
                    o.refreshtime = 5e3;
                    break;
                case 2:
                    o.refreshtime = 1e4;
                    break;
                default:
                    o.refreshtime = 2e3;
                    break
                }
                o.changeShowType();
                return false
            })
        }
        function M(e, t) {
            if (e == undefined && m.get("showtype")) {
                e = m.get("showtype")
            }
            $("#pxtext").show();
            $("#pxtext_dgtl").hide();
            if (e) {
                y = e
            }
            if (e == undefined) {
                y = o.thisshowtype ? o.thisshowtype : "zx"
            }
            if (t != undefined) {
                $("#wltypelist li").removeClass("on");
                $("#wltypelist li").eq(t).addClass("on")
            } else {
                $("#wltypelist li").removeClass("on");
                var t = 0;
                switch (e) {
                case "zx":
                    t = 0;
                    break;
                case "zjl":
                    t = 1;
                    break;
                case "ddejc":
                    t = 2;
                    break;
                case "ylyc":
                    t = 3;
                    break;
                case "cwsj":
                    t = 4;
                    break;
                case "dgtl":
                    t = 5;
                    break;
                case "ykyl":
                    t = 6;
                    break;
                default:
                    t = 0;
                    break
                }
                $("#wltypelist li").eq(t).addClass("on")
            }
            o.thisshowtype = y;
            m.save("showtype", y);
            o.forbid_sort = false;
            if (_.length == 0) {
                $("#wl_mainbody").html('<table class="tablethd" id="tablethd7"><th class="allstock"><em>' + f.getTypeName(o.stocktype).name + ' <span class="icon icon_darrow3"></span></em></th><th data-px="f12"><em class="tda_left" style="width: 84px;">代码</em></th><th><em class="tda_left" style="width: 136px;">名称</em></th></table><div class="nostockd">您暂无自选股</div>');
                return false
            }
            if (y == "dgtl") {
                o.forbid_sort = true;
                r.close();
                i.show(_);
                $("#allstock").hide();
                $("#pxtext").hide();
                if (g.isHKDelay() == 1) {
                    $("#pxtext_dgtl").text("应港交所要求，中国大陆以外地区用户港股行情图需做延时处理，给您带来的不便敬请谅解。").show()
                } else if (g.isHKDelay() == 2) {
                    $("#pxtext_dgtl").html('未登录用户仅可查看港股延时行情图，给您带来的不便敬请谅解。<a href="https://passport2.eastmoney.com/pub/login?backurl=' + encodeURIComponent(self.location.href) + '" target="_self">登录</a>').show()
                }
                return false
            }
            if (y == "ykyl") {
                o.forbid_sort = true;
                u.getNoteData(b, _).then(function(e) {
                    o.notedata = u.dealNoteData(e);
                    a.linkTS(_, y)
                });
                return false
            }
            if (y == "ylyc") {
                o.forbid_sort = true;
                h.getData(_.join(",")).then(function(e) {
                    o.ylycdata = e;
                    a.linkTS(_, y)
                });
                return false
            }
            a.linkTS(_, y)
        }
        o.changeShowType = M;
        function z() {
            if (window.suggest2017) {
                var e = new suggest2017({
                    zindex: 50,
                    inputid: "addfavstockinput",
                    showblank: false,
                    modules: ["stock"],
                    showstocklink: false,
                    stockcount: 10,
                    width: 300,
                    offset: {
                        left: -40,
                        top: 8
                    },
                    onSubmit: function(e) {
                        E(e);
                        return false
                    },
                    onConfirmStock: function(e) {
                        E(e);
                        return false
                    }
                })
            }
        }
        function E(e) {
            if (e.stock) {
                e = e.stock
            } else {
                return false
            }
            e.Code = e.Code.replace(".", "_");
            $.ajax({
                url: "./api/zxg/addstock",
                type: "POST",
                dataType: "json",
                data: {
                    groupid: b,
                    stockcode: e.MktNum + "." + e.Code
                }
            }).done(function(e) {
                if (e.re) {
                    T(b)
                } else {
                    if (e.message == "股票代码不符合规范") {
                        e.message = "暂不支持添加该品种"
                    }
                    l(e.message)
                }
            }).fail(function(e) {})
        }
        e.exports = {
            init: function() {
                C();
                g.isOutside().then(function(e) {
                    j();
                    if (e) {
                        g.outsiderAlert()
                    }
                })
            },
            changeGroup: function(e) {
                T(e)
            },
            changeShowType: M
        }
    },
    "./modules/zxg/itemconfig.js": function(e, t, n) {
        var s = n("./modules/text/index.js");
        var o = n("./modules/datacache/index.js");
        var i = n("./modules/hegui/index.js");
        var a = '<span class="ndatas">—</span>';
        e.exports = {

            //start from here ,alex
            item_config: {
                f12: {
                    name: "代码",
                    needfields: ["f12", "f13", "f19"],
                    sort: true,
                    align: "left",
                    html: function(e, t, n) {
                        var a = '<a href="' + s.getLinkByCode(e.f13 + "." + e.f12) + '">' + e.f12;
                        if (e.f13 == 105 || e.f13 == 106 || e.f13 == 107) {
                            a += ' <span class="usstock">US</span> '
                        } else if (e.f13 == 116) {
                            a += ' <span class="hkstock">HK</span> '
                        } else if (e.f13 == 155 || e.f13 == 156) {
                            a += ' <span class="ukstock">UK</span> '
                        }
                        a += "</a>";
                        return a
                    }
                },
                f14: {
                    name: "名称",
                    needfields: ["f14", "f13", "f12"],
                    align: "left",
                    html: function(e, t, n) {
                        var a = "";
                        if (n == true) {
                            a += '<a href="' + s.getLinkByCode(e.f13 + "." + e.f12) + '" title="' + e.f14 + '">' + s.txtLeftPure(e.f14, 6, true) + "</a>"
                        } else {
                            a += '<a href="' + s.getLinkByCode(e.f13 + "." + e.f12) + '" title="' + e.f14 + '">' + s.txtLeft(e.f14, 10, false) + "</a>"
                        }
                        if (e.f13 == 116 && i.isHKDelay() == 1) {
                            a += '<span class="hkdelay_lite" title="中国大陆以外地区用户仅可查看港股延时行情，给您带来的不便敬请谅解"></span> '
                        }
                        if (e.f13 == 116 && i.isHKDelay() == 2) {
                            a += '<span class="hkdelay_lite" title="未登录用户仅可查看港股延时行情，您可通过登录的方式获取港股实时行情报价，给您带来的不便敬请谅解"></span> '
                        }
                        return a
                    }
                },
                z1: {
                    name: "股吧",
                    needfields: ["f12", "f13", "f19", "f139", "f148"],
                    sort: false,
                    align: "center",
                    html: function(e) {
                        var t = e.f13;
                        var n = e.f19;
                        var a = e.f139;
                        var i = false;
                        if ((t == 0 || t == 1) && e.f148 & 2) {} else {
                            if (t == 1 && n == 23)
                                i = true;
                            if (t == 0 && n == 6 || t == 0 && n == 13 || t == 0 && n == 80 || t == 1 && n == 2 || t == 0 && n == 7 || t == 1 && n == 3)
                                i = true;
                            if (t == 116 && n == 1 || t == 116 && n == 3 || t == 116 && n == 4)
                                i = true;
                            if ((t == 105 || t == 106 || t == 107) && (n == 1 || n == 2 || n == 3 || n == 4))
                                i = true;
                            if (t == 155 || t == 156)
                                i = true;
                            if (t == 113 || t == 114 || t == 115 || t == 142)
                                i = true;
                            if (t == 1 && n == 1 || t == 0 && n == 5 || t == 100)
                                i = true;
                            if (t == 90)
                                i = true;
                            if (a == 11)
                                i = true;
                            if (t == 0 && n == 81)
                                i = true
                        }
                        if (i) {
                            return '<a href="http://guba.eastmoney.com/interface/GetList.aspx?code=' + e.f13 + "." + e.f12 + '">股吧</a>'
                        } else {
                            return ""
                        }
                    }
                },
                f2: {
                    name: "最新价",
                    sort: true,
                    needfields: ["f2", "f4", "f1"],
                    html: function(e) {
                        if (e.f2 == null) {
                            return a
                        }
                        return s.textColor((e.f2 / Math.pow(10, e.f1)).toFixed(e.f1), e.f4)
                    }
                },
                f3: {
                    name: "涨跌幅",
                    needfields: ["f3", "f4", "f152"],
                    sort: true,
                    html: function(e) {
                        if (e.f3 == null) {
                            return a
                        }
                        return s.textColor((e.f3 / Math.pow(10, e.f152)).toFixed(e.f152) + "%", e.f4)
                    }
                },
                f4: {
                    name: "涨跌额",
                    needfields: ["f1", "f4"],
                    sort: true,
                    html: function(e) {
                        if (e.f4 == null) {
                            return a
                        }
                        return s.textColor((e.f4 / Math.pow(10, e.f1)).toFixed(e.f1), e.f4)
                    }
                },
                f5: {
                    name: "总手",
                    sort: true,
                    needfields: ["f5"],
                    html: function(e) {
                        if (e.f5 == null) {
                            return a
                        }
                        return s.formatNum(e.f5)
                    }
                },
                f30: {
                    name: "现手",
                    sort: true,
                    needfields: ["f30"],
                    html: function(e) {
                        if (e.f30 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(Math.abs(e.f30)), e.f30)
                    }
                },
                f31: {
                    name: "买入价",
                    sort: true,
                    needfields: ["f1", "f31", "f18"],
                    html: function(e) {
                        if (e.f31 == null) {
                            return a
                        }
                        return s.textColor((e.f31 / Math.pow(10, e.f1)).toFixed(e.f1), e.f31 - e.f18)
                    }
                },
                f32: {
                    name: "卖出价",
                    sort: true,
                    needfields: ["f1", "f32", "f18"],
                    html: function(e) {
                        if (e.f32 == null) {
                            return a
                        }
                        return s.textColor((e.f32 / Math.pow(10, e.f1)).toFixed(e.f1), e.f32 - e.f18)
                    }
                },
                f18: {
                    name: "昨收",
                    sort: true,
                    needfields: ["f1", "f18"],
                    html: function(e) {
                        if (e.f18 == null) {
                            return a
                        }
                        return (e.f18 / Math.pow(10, e.f1)).toFixed(e.f1)
                    }
                },
                f6: {
                    name: "成交额",
                    sort: true,
                    needfields: ["f6"],
                    html: function(e) {
                        if (e.f6 == null) {
                            return a
                        }
                        return s.formatNum(e.f6)
                    }
                },
                f8: {
                    name: "换手率",
                    sort: true,
                    needfields: ["f8", "f152"],
                    html: function(e) {
                        if (e.f8 == null) {
                            return a
                        }
                        return (e.f8 / Math.pow(10, e.f152)).toFixed(e.f152) + "%"
                    }
                },
                f7: {
                    name: "振幅",
                    sort: true,
                    needfields: ["f7", "f152"],
                    html: function(e) {
                        if (e.f7 == null) {
                            return a
                        }
                        return (e.f7 / Math.pow(10, e.f152)).toFixed(e.f152) + "%"
                    }
                },
                f10: {
                    name: "量比",
                    sort: true,
                    needfields: ["f10", "f152"],
                    html: function(e) {
                        if (e.f10 == null) {
                            return a
                        }
                        return (e.f10 / Math.pow(10, e.f152)).toFixed(e.f152)
                    }
                },
                f15: {
                    name: "最高价",
                    sort: true,
                    needfields: ["f1", "f18", "f15"],
                    html: function(e) {
                        if (e.f15 == null) {
                            return a
                        }
                        return s.textColor((e.f15 / Math.pow(10, e.f1)).toFixed(e.f1), e.f15 - e.f18)
                    }
                },
                f16: {
                    name: "最低价",
                    sort: true,
                    needfields: ["f1", "f18", "f16"],
                    html: function(e) {
                        if (e.f16 == null) {
                            return a
                        }
                        return s.textColor((e.f16 / Math.pow(10, e.f1)).toFixed(e.f1), e.f16 - e.f18)
                    }
                },
                f17: {
                    name: "开盘价",
                    sort: true,
                    needfields: ["f1", "f17", "f18"],
                    html: function(e) {
                        if (e.f17 == null) {
                            return a
                        }
                        return s.textColor((e.f17 / Math.pow(10, e.f1)).toFixed(e.f1), e.f17 - e.f18)
                    }
                },
                f22: {
                    name: "涨速",
                    sort: true,
                    needfields: ["f22", "f152"],
                    html: function(e) {
                        if (e.f22 == null) {
                            return a
                        }
                        return s.textColor((e.f22 / Math.pow(10, e.f152)).toFixed(e.f152) + "%", e.f22)
                    }
                },
                f9: {
                    name: "市盈率",
                    sort: true,
                    needfields: ["f9", "f152"],
                    html: function(e) {
                        if (e.f9 == null) {
                            return a
                        }
                        return (e.f9 / Math.pow(10, e.f152)).toFixed(e.f152)
                    }
                },
                f62: {
                    name: "主力净流入",
                    sort: true,
                    needfields: ["f62"],
                    html: function(e) {
                        if (e.f62 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f62), e.f62)
                    }
                },
                f63: {
                    name: "集合竞价",
                    sort: true,
                    needfields: ["f63"],
                    html: function(e) {
                        if (e.f63 == null) {
                            return a
                        }
                        return Math.round(e.f63 / 1e4)
                    }
                },
                f64: {
                    name: "超大单流入",
                    sort: true,
                    needfields: ["f64"],
                    html: function(e) {
                        if (e.f64 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f64), e.f64)
                    }
                },
                f65: {
                    name: "超大单流出",
                    sort: true,
                    needfields: ["f65"],
                    html: function(e) {
                        if (e.f65 == null) {
                            return a
                        }
                        var t = e.f65;
                        return s.textColor(s.formatNum(t), -1)
                    }
                },
                f66: {
                    name: "超大单净额",
                    sort: true,
                    needfields: ["f66"],
                    html: function(e) {
                        if (e.f66 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f66), e.f66)
                    }
                },
                f69: {
                    name: "超大单净占比",
                    sort: true,
                    needfields: ["f69", "f152"],
                    html: function(e) {
                        if (e.f69 == null) {
                            return a
                        }
                        return s.textColor((e.f69 / Math.pow(10, e.f152)).toFixed(e.f152) + "%", e.f69)
                    }
                },
                f70: {
                    name: "大单流入",
                    sort: true,
                    needfields: ["f70"],
                    html: function(e) {
                        if (e.f70 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f70), e.f70)
                    }
                },
                f71: {
                    name: "大单流出",
                    sort: true,
                    needfields: ["f71"],
                    html: function(e) {
                        if (e.f71 == null) {
                            return a
                        }
                        var t = e.f71;
                        return s.textColor(s.formatNum(t), -1)
                    }
                },
                f72: {
                    name: "大单净额",
                    sort: true,
                    needfields: ["f72"],
                    html: function(e) {
                        if (e.f72 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f72), e.f72)
                    }
                },
                f75: {
                    name: "大单净占比",
                    sort: true,
                    needfields: ["f75", "f152"],
                    html: function(e) {
                        if (e.f75 == null) {
                            return a
                        }
                        return s.textColor((e.f75 / Math.pow(10, e.f152)).toFixed(e.f152) + "%", e.f75)
                    }
                },
                f76: {
                    name: "中单流入",
                    sort: true,
                    needfields: ["f76"],
                    html: function(e) {
                        if (e.f76 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f76), e.f76)
                    }
                },
                f77: {
                    name: "中单流出",
                    sort: true,
                    needfields: ["f77"],
                    html: function(e) {
                        if (e.f77 == null) {
                            return a
                        }
                        var t = e.f77;
                        return s.textColor(s.formatNum(t), -1)
                    }
                },
                f78: {
                    name: "中单净额",
                    sort: true,
                    needfields: ["f78"],
                    html: function(e) {
                        if (e.f78 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f78), e.f78)
                    }
                },
                f81: {
                    name: "中单净占比",
                    sort: true,
                    needfields: ["f81", "f152"],
                    html: function(e) {
                        if (e.f81 == null) {
                            return a
                        }
                        return s.textColor((e.f81 / Math.pow(10, e.f152)).toFixed(e.f152) + "%", e.f81)
                    }
                },
                f82: {
                    name: "小单流入",
                    sort: true,
                    needfields: ["f82"],
                    html: function(e) {
                        if (e.f82 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f82), e.f82)
                    }
                },
                f83: {
                    name: "小单流出",
                    sort: true,
                    needfields: ["f83"],
                    html: function(e) {
                        if (e.f83 == null) {
                            return a
                        }
                        var t = e.f83;
                        return s.textColor(s.formatNum(t), -1)
                    }
                },
                f84: {
                    name: "小单净额",
                    sort: true,
                    needfields: ["f84"],
                    html: function(e) {
                        if (e.f84 == null) {
                            return a
                        }
                        return s.textColor(s.formatNum(e.f84), e.f84)
                    }
                },
                f87: {
                    name: "小单净占比",
                    sort: true,
                    needfields: ["f87", "f152"],
                    html: function(e) {
                        if (e.f87 == null) {
                            return a
                        }
                        return s.textColor((e.f87 / Math.pow(10, e.f152)).toFixed(e.f152) + "%", e.f87)
                    }
                },
                f88: {
                    name: "当日DDX",
                    sort: true,
                    needfields: ["f88", "f153"],
                    html: function(e) {
                        if (e.f88 == null) {
                            return a
                        }
                        return s.textColor((e.f88 / Math.pow(10, e.f153)).toFixed(e.f153), e.f88)
                    }
                },
                f89: {
                    name: "当日DDY",
                    sort: true,
                    needfields: ["f89", "f153"],
                    html: function(e) {
                        if (e.f89 == null) {
                            return a
                        }
                        return s.textColor((e.f89 / Math.pow(10, e.f153)).toFixed(e.f153), e.f89)
                    }
                },
                f90: {
                    name: "当日DDZ",
                    sort: true,
                    needfields: ["f90", "f152"],
                    html: function(e) {
                        if (e.f90 == null) {
                            return a
                        }
                        return s.textColor((e.f90 / Math.pow(10, e.f152)).toFixed(e.f152), e.f90)
                    }
                },
                f91: {
                    name: "5日DDX",
                    sort: true,
                    needfields: ["f91", "f153"],
                    html: function(e) {
                        if (e.f91 == null) {
                            return a
                        }
                        return s.textColor((e.f91 / Math.pow(10, e.f153)).toFixed(e.f153), e.f91)
                    }
                },
                f92: {
                    name: "5日DDY",
                    sort: true,
                    needfields: ["f92", "f153"],
                    html: function(e) {
                        if (e.f92 == null) {
                            return a
                        }
                        return s.textColor((e.f92 / Math.pow(10, e.f153)).toFixed(e.f153), e.f92)
                    }
                },
                f94: {
                    name: "10日DDX",
                    sort: true,
                    needfields: ["f94", "f153"],
                    html: function(e) {
                        if (e.f94 == null) {
                            return a
                        }
                        return s.textColor((e.f94 / Math.pow(10, e.f153)).toFixed(e.f153), e.f94)
                    }
                },
                f95: {
                    name: "10日DDY",
                    sort: true,
                    needfields: ["f95", "f153"],
                    html: function(e) {
                        if (e.f95 == null) {
                            return a
                        }
                        return s.textColor((e.f95 / Math.pow(10, e.f153)).toFixed(e.f153), e.f95)
                    }
                },
                f97: {
                    name: "DDX飘红天数(连续)",
                    sort: true,
                    needfields: ["f97"],
                    html: function(e) {
                        if (e.f97 == null) {
                            return a
                        }
                        return s.textColor(e.f97, e.f97)
                    }
                },
                f98: {
                    name: "DDX飘红天数(5日)",
                    sort: true,
                    needfields: ["f98"],
                    html: function(e) {
                        if (e.f98 == null) {
                            return a
                        }
                        return s.textColor(e.f98, e.f98)
                    }
                },
                f99: {
                    name: "DDX飘红天数(10日)",
                    sort: true,
                    needfields: ["f99"],
                    html: function(e) {
                        if (e.f99 == null) {
                            return a
                        }
                        return s.textColor(e.f99, e.f99)
                    }
                },
                f38: {
                    name: "总股本",
                    sort: true,
                    needfields: ["f38"],
                    html: function(e) {
                        if (e.f38 == null) {
                            return a
                        }
                        return s.formatNum(e.f38)
                    }
                },
                f39: {
                    name: "流通股",
                    sort: true,
                    needfields: ["f39"],
                    html: function(e) {
                        if (e.f39 == null) {
                            return a
                        }
                        return s.formatNum(e.f39)
                    }
                },
                f36: {
                    name: "人均持股数",
                    sort: true,
                    needfields: ["f36"],
                    html: function(e) {
                        if (e.f36 == null) {
                            return a
                        }
                        return s.formatNum(Math.floor(e.f36))
                    }
                },
                f112: {
                    name: "每股收益",
                    sort: true,
                    needfields: ["f112"],
                    html: function(e) {
                        if (e.f112 == null) {
                            return a
                        }
                        return e.f112.toFixed(2)
                    }
                },
                f221: {
                    name: "更新日期",
                    sort: true,
                    needfields: ["f221"],
                    html: function(e) {
                        if (e.f221 == null || e.f221 == 0 || e.f221 == 10101) {
                            return a
                        }
                        var t = "";
                        try {
                            t = e.f221.toString();
                            t = t.substring(0, 4) + "-" + t.substring(4, 6) + "-" + t.substring(6, 8)
                        } catch (n) {}
                        if (t == "") {
                            return a
                        }
                        return t
                    }
                },
                f113: {
                    name: "每股净资产",
                    sort: true,
                    needfields: ["f113"],
                    html: function(e) {
                        if (e.f113 == null) {
                            return a
                        }
                        return e.f113.toFixed(2)
                    }
                },
                f37: {
                    name: "净资产收益率(加权)",
                    sort: true,
                    needfields: ["f37"],
                    html: function(e) {
                        if (e.f37 == null) {
                            return a
                        }
                        return e.f37.toFixed(2)
                    }
                },
                f40: {
                    name: "营业收入",
                    sort: true,
                    needfields: ["f40"],
                    html: function(e) {
                        if (e.f40 == null) {
                            return a
                        }
                        return s.formatNum(e.f40)
                    }
                },
                f41: {
                    name: "营业收入同比",
                    sort: true,
                    needfields: ["f41"],
                    html: function(e) {
                        if (e.f41 == null) {
                            return a
                        }
                        return e.f41.toFixed(2)
                    }
                },
                f42: {
                    name: "营业利润",
                    sort: true,
                    needfields: ["f42"],
                    html: function(e) {
                        if (e.f42 == null) {
                            return a
                        }
                        return s.formatNum(e.f42)
                    }
                },
                f43: {
                    name: "投资收益",
                    sort: true,
                    needfields: ["f43"],
                    html: function(e) {
                        if (e.f43 == null) {
                            return a
                        }
                        return s.formatNum(e.f43)
                    }
                },
                f44: {
                    name: "利润总额",
                    sort: true,
                    needfields: ["f44"],
                    html: function(e) {
                        if (e.f44 == null) {
                            return a
                        }
                        return s.formatNum(e.f44)
                    }
                },
                f45: {
                    name: "净利润",
                    sort: true,
                    needfields: ["f45"],
                    html: function(e) {
                        if (e.f45 == null) {
                            return a
                        }
                        return s.formatNum(e.f45)
                    }
                },
                f46: {
                    name: "净利润同比",
                    sort: true,
                    needfields: ["f46"],
                    html: function(e) {
                        if (e.f46 == null) {
                            return a
                        }
                        return e.f46.toFixed(2)
                    }
                },
                f47: {
                    name: "未分配利润",
                    sort: true,
                    needfields: ["f47"],
                    html: function(e) {
                        if (e.f47 == null) {
                            return a
                        }
                        return s.formatNum(e.f47)
                    }
                },
                f48: {
                    name: "每股未分配利润",
                    sort: true,
                    needfields: ["f48"],
                    html: function(e) {
                        if (e.f48 == null) {
                            return a
                        }
                        return e.f48.toFixed(2)
                    }
                },
                f49: {
                    name: "毛利率",
                    sort: true,
                    needfields: ["f49"],
                    html: function(e) {
                        if (e.f49 == null) {
                            return a
                        }
                        return e.f49.toFixed(2)
                    }
                },
                f50: {
                    name: "总资产",
                    sort: true,
                    needfields: ["f50"],
                    html: function(e) {
                        if (e.f50 == null) {
                            return a
                        }
                        return s.formatNum(e.f50)
                    }
                },
                f51: {
                    name: "流动资产",
                    sort: true,
                    needfields: ["f51"],
                    html: function(e) {
                        if (e.f51 == null) {
                            return a
                        }
                        return s.formatNum(e.f51)
                    }
                },
                f52: {
                    name: "固定资产",
                    sort: true,
                    needfields: ["f52"],
                    html: function(e) {
                        if (e.f52 == null) {
                            return a
                        }
                        return s.formatNum(e.f52)
                    }
                },
                f53: {
                    name: "无形资产",
                    sort: true,
                    needfields: ["f53"],
                    html: function(e) {
                        if (e.f53 == null) {
                            return a
                        }
                        return s.formatNum(e.f53)
                    }
                },
                f54: {
                    name: "总负债",
                    sort: true,
                    needfields: ["f54"],
                    html: function(e) {
                        if (e.f54 == null) {
                            return a
                        }
                        return s.formatNum(e.f54)
                    }
                },
                f55: {
                    name: "流动负债",
                    sort: true,
                    needfields: ["f55"],
                    html: function(e) {
                        if (e.f55 == null) {
                            return a
                        }
                        return s.formatNum(e.f55)
                    }
                },
                f56: {
                    name: "长期负债",
                    sort: true,
                    needfields: ["f56"],
                    html: function(e) {
                        if (e.f56 == null) {
                            return a
                        }
                        return s.formatNum(e.f56)
                    }
                },
                f57: {
                    name: "资产负债比率",
                    sort: true,
                    needfields: ["f57"],
                    html: function(e) {
                        if (e.f57 == null) {
                            return a
                        }
                        return e.f57.toFixed(2)
                    }
                },
                f58: {
                    name: "股东权益",
                    sort: true,
                    needfields: ["f58"],
                    html: function(e) {
                        if (e.f58 == null) {
                            return a
                        }
                        return s.formatNum(e.f58)
                    }
                },
                f59: {
                    name: "股东权益比",
                    sort: true,
                    needfields: ["f59"],
                    html: function(e) {
                        if (e.f59 == null) {
                            return a
                        }
                        return e.f59.toFixed(2)
                    }
                },
                f60: {
                    name: "公积金",
                    sort: true,
                    needfields: ["f60"],
                    html: function(e) {
                        if (e.f60 == null) {
                            return a
                        }
                        return s.formatNum(e.f60)
                    }
                },
                f61: {
                    name: "每股公积金",
                    sort: true,
                    needfields: ["f61"],
                    html: function(e) {
                        if (e.f61 == null) {
                            return a
                        }
                        return e.f61.toFixed(2)
                    }
                },
                f26: {
                    name: "上市日期",
                    sort: true,
                    needfields: ["f26"],
                    html: function(e) {
                        if (e.f26 == null) {
                            return a
                        }
                        e.f26 = e.f26.toString();
                        if (e.f26.length < 6) {
                            return "-"
                        }
                        return e.f26.substring(0, 4) + "-" + e.f26.substring(4, 6) + "-" + e.f26.substring(6)
                    }
                },
                c1: {
                    name: "买入均价",
                    needfields: [],
                    html: function(e, t) {
                        return o.notedata[t].note[1]
                    }
                },
                c2: {
                    name: "持有量(股)",
                    needfields: [],
                    html: function(e, t) {
                        return o.notedata[t].note[0]
                    }
                },
                c3: {
                    name: "买入成本",
                    needfields: [],
                    html: function(e, t) {
                        var n = o.notedata[t].note;
                        var a = parseFloat(n[1] * n[0]) + parseFloat(n[3]) + parseFloat(n[1] * n[0]) * (parseFloat(n[2]) + parseFloat(n[4])) / 1e3;
                        return s.formatNum(a.toFixed(2))
                    }
                },
                c4: {
                    name: "当前市值",
                    needfields: [],
                    html: function(e, t) {
                        var n = o.notedata[t].note[0] * (e.f2 / Math.pow(10, e.f1));
                        return s.formatNum(n.toFixed(2))
                    }
                },
                c5: {
                    name: "每股盈亏",
                    needfields: [],
                    html: function(e, t) {
                        if (o.notedata[t].note[0] > 0 && o.notedata[t].note[1] > 0) {
                            var n = e.f2 / Math.pow(10, e.f1) - o.notedata[t].note[1];
                            return s.textColor(n.toFixed(2), n)
                        }
                        return "0.00"
                    }
                },
                c6: {
                    name: "盈亏率",
                    needfields: [],
                    html: function(e, t) {
                        var n = o.notedata[t].note;
                        if (o.notedata[t].note[1] == 0 || o.notedata[t].note[0] == 0) {
                            return "0"
                        }
                        var a = o.notedata[t].note[0] * (e.f2 / Math.pow(10, e.f1));
                        var i = parseFloat(n[1] * n[0]) + parseFloat(n[3]) + parseFloat(n[1] * n[0]) * (parseFloat(n[2]) + parseFloat(n[4])) / 1e3;
                        var r = (a / i - 1) * 100;
                        return s.textColor(r.toFixed(2) + "%", r)
                    }
                },
                c7: {
                    name: "浮动盈亏",
                    needfields: [],
                    html: function(e, t) {
                        if (o.notedata[t].note[1] == 0) {
                            return "0.00"
                        }
                        var n = o.notedata[t].note;
                        var a = o.notedata[t].note[0] * (e.f2 / Math.pow(10, e.f1));
                        var i = parseFloat(n[1] * n[0]) + parseFloat(n[3]) + parseFloat(n[1] * n[0]) * (parseFloat(n[2]) + parseFloat(n[4])) / 1e3;
                        var r = a - i;
                        return s.textColor(s.formatNum(r.toFixed(2)), r)
                    }
                },
                f100: {
                    name: "所属行业板块",
                    needfields: ["f100"],
                    align: "txt",
                    html: function(e) {
                        if (e.f100 == null) {
                            return a
                        }
                        return e.f100
                    }
                },
                f102: {
                    name: "所属地区板块",
                    needfields: ["f102"],
                    align: "txt",
                    html: function(e) {
                        if (e.f102 == null) {
                            return a
                        }
                        return e.f102
                    }
                },
                f103: {
                    name: "所属概念板块",
                    needfields: ["f103"],
                    align: "txt",
                    html: function(e) {
                        if (e.f103 == null) {
                            return a
                        }
                        if (e.f103) {
                            return '<span title="' + e.f103 + '">' + e.f103.split(",")[0] + "</span>"
                        }
                        return e.f103
                    }
                },
                y1: {
                    name: "研报数",
                    needfields: [],
                    html: function(e, t) {
                        return o.ylycdata[t][27]
                    }
                },
                y2: {
                    name: "评级统计(六个月)买入",
                    shortname: "买入评级",
                    needfields: [],
                    html: function(e, t) {
                        return o.ylycdata[t][28]
                    }
                },
                y3: {
                    name: "评级统计(六个月)增持",
                    shortname: "增持评级",
                    needfields: [],
                    html: function(e, t) {
                        return o.ylycdata[t][29]
                    }
                },
                y4: {
                    name: "评级统计(六个月)中性",
                    shortname: "中性评级",
                    needfields: [],
                    html: function(e, t) {
                        return o.ylycdata[t][30]
                    }
                },
                y5: {
                    name: "评级统计(六个月)减持",
                    shortname: "减持评级",
                    needfields: [],
                    html: function(e, t) {
                        return o.ylycdata[t][31]
                    }
                },
                y6: {
                    name: "评级统计(六个月)卖出",
                    shortname: "卖出评级",
                    needfields: [],
                    html: function(e, t) {
                        return o.ylycdata[t][32]
                    }
                },
                y7: {
                    name: function() {
                        return o.ylyc_year + "实际收益"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][8]).toFixed(3)
                    }
                },
                y8: {
                    name: function() {
                        return o.ylyc_year + 1 + "预测收益"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][9]).toFixed(3)
                    }
                },
                y9: {
                    name: function() {
                        return o.ylyc_year + 1 + "预测市盈率"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][17]).toFixed(3)
                    }
                },
                y10: {
                    name: function() {
                        return o.ylyc_year + 2 + "预测收益"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][10]).toFixed(3)
                    }
                },
                y11: {
                    name: function() {
                        return o.ylyc_year + 2 + "预测市盈率"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][18]).toFixed(3)
                    }
                },
                y12: {
                    name: function() {
                        return o.ylyc_year + 3 + "预测收益"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][11]).toFixed(3)
                    }
                },
                y13: {
                    name: function() {
                        return o.ylyc_year + 3 + "预测市盈率"
                    },
                    needfields: [],
                    html: function(e, t) {
                        return parseFloat(o.ylycdata[t][19]).toFixed(3)
                    }
                },
                lite1: {
                    name: function() {
                        return '<a href="javascript:;" class="litemovelr" target="_self"><span class="icon_left"></span></a>'
                    },
                    needfields: [],
                    html: function(e, t) {
                        return ""
                    }
                },
                lite2: {
                    name: function() {
                        return '<a href="javascript:;" class="litemovelr" target="_self"><span class="icon_right"></span></a>'
                    },
                    needfields: [],
                    html: function(e, t) {
                        return ""
                    }
                }
            },
            type_config: {
                all_zx: {
                    show_fields: ["————基础类————", "f100", "f102", "f103", "————行情类————", "f2", "f3", "f4", "f5", "f30", "f31", "f32", "f18", "f6", "f8", "f7", "f10", "f22", "f9", "f15", "f16", "f17", "———资金流向类———", "f62", "f63", "f64", "f65", "f66", "f69", "f70", "f71", "f72", "f75", "f76", "f77", "f78", "f81", "f82", "f83", "f84", "f87", "———DDE决策类———", "f88", "f89", "f90", "f91", "f92", "f94", "f95", "f97", "f98", "f99", "———财务数据类———", "f38", "f39", "f36", "f112", "f113", "f37", "f40", "f41", "f42", "f43", "f44", "f45", "f46", "f47", "f48", "f49", "f50", "f51", "f52", "f53", "f54", "f55", "f56", "f57", "f58", "f59", "f60", "f61", "f26"]
                },
                required: {
                    show_fields: ["f12", "f14", "z1"]
                },
                default_zx: {
                    show_fields: ["f2", "f3", "f4", "f5", "f30", "f31", "f32", "f18", "f6", "f8", "f7", "f10", "f22", "f9", "f112", "f100"]
                },
                default_zx_lite: {
                    show_fields: ["lite1", "f2", "f3", "f4", "f5", "f30", "f31", "f32", "f18", "f8", "f6", "f9", "lite2"]
                },
                zjl: {
                    show_fields: ["f2", "f3", "f62", "f63", "f64", "f65", "f66", "f69", "f70", "f71", "f72", "f75", "f76", "f77", "f78", "f81", "f82", "f83", "f84", "f87"]
                },
                zjl_lite: {
                    show_fields: ["lite1", "f2", "f3", "f62", "f63", "f69", "f75", "f81", "f87", "lite2"]
                },
                ddejc: {
                    show_fields: ["f2", "f3", "f88", "f89", "f90", "f91", "f92", "f94", "f95", "f97", "f98", "f99"]
                },
                ddejc_lite: {
                    show_fields: ["lite1", "f2", "f3", "f97", "f88", "f89", "f90", "f91", "f92", "f94", "f95", "lite2"]
                },
                cwsj: {
                    show_fields: ["f2", "f3", "f221", "f38", "f39", "f36", "f112", "f113", "f37", "f40", "f41", "f42", "f43", "f44", "f45", "f46", "f47", "f48", "f49", "f50", "f51", "f52", "f53", "f54", "f55", "f56", "f57", "f58", "f59", "f60", "f61", "f26"]
                },
                cwsj_lite: {
                    show_fields: ["lite1", "f2", "f3", "f221", "f38", "f39", "f36", "f112", "f113", "f40", "f42", "f50", "lite2"]
                },
                ykyl: {
                    show_fields: ["f2", "f3", "c1", "c2", "c3", "c4", "c5", "c6", "c7"]
                },
                ykyl_lite: {
                    show_fields: ["lite1", "f2", "f3", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "lite2"]
                },
                ylyc: {
                    show_fields: ["f2", "f3", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y10", "y11", "y12", "y13"]
                },
                ylyc_lite: {
                    show_fields: ["lite1", "f2", "f3", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "lite2"]
                }
            }
        }
    },
    "./modules/zxg/note.html": function(e, t) {
        e.exports = '<div class="stocknote">\r\n  <form target="_self" id="noteform">\r\n  <div class="exchangestock">\r\n    <div class="leftexchange"><span id="note_stockname">{{=it.name}}</span> &nbsp; <span id="note_code">{{=it.code}}</span> &nbsp; <span>当前</span> <span\r\n        id="note_nowprice">{{=it.nowprice}}</span></div>\r\n    <div class="rightexchange"><span>我在</span> <span>{{=it.inputdate}}</span> &nbsp; <span>当日价</span> <span\r\n       >{{=it.thatprice}}</span> <span>添加该股</span></div>\r\n  </div>\r\n  <table class="extable">\r\n    <thead>\r\n      <tr>\r\n        <td>数量</td>\r\n        <td>买入价</td>\r\n        <td>目标价</td>\r\n        <td>止损价</td>\r\n        <td>佣金‰</td>\r\n        <td>手续费（元）</td>\r\n        <td>印花税‰</td>\r\n        <td>交易（买入）日期</td>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td><input type="text" class="c" maxlength="6" value="{{= it.data[0]}}"></td>\r\n        <td><input type="text" class="p" maxlength="6" value="{{= it.data[1]}}"></td>\r\n        <td><input type="text" class="m" maxlength="6" value="{{= it.data[5]}}"></td>\r\n        <td><input type="text" class="z" maxlength="6" value="{{= it.data[6]}}"></td>\r\n        <td><input type="text" class="y" maxlength="6" value="{{= it.data[2]}}"></td>\r\n        <td><input type="text" class="x" maxlength="5" value="{{= it.data[3]}}"></td>\r\n        <td><input type="text" class="h" maxlength="6" value="{{= it.data[4]}}"></td>\r\n        <td><input type="text" class="r input2" maxlength="10" value="{{= it.data[7]}}"></td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div class="exchangenote">\r\n    <div class="exchangenotel">投资笔记:</div>\r\n    <div class="exchangenoter">您还可以输入<span>200</span>个字</span></div>\r\n  </div>\r\n  <textarea maxlength="200" class="b" id="note_note">{{= it.data[8]}}</textarea>\r\n  <div class="modalbtnd">\r\n    <button type="submit" class="modalbtn_default">保 存</button> &nbsp; <a href="javascript:;"\r\n        target="_self" class="modalbtn_cancel">取 消</a>\r\n  </div>\r\n  </form>\r\n</div>'
    },
    "./modules/zxg/note.js": function(e, t) {
        e.exports = {
            getNoteData: function(e, t) {
                if (t instanceof Array) {
                    t = t.join(",")
                }
                return $.ajax({
                    url: "./api/zxg/stocknote",
                    type: "GET",
                    dataType: "json",
                    cache: false,
                    data: {
                        groupid: e,
                        code: t
                    }
                }).then(function(e) {
                    if (e.re) {
                        return e.result.notes
                    }
                })
            },
            dealNoteData: function(e) {
                return e.map(function(e) {
                    var t = {};
                    if (e.note) {
                        t.note = e.note.split("|").map(function(e, t) {
                            if (t > 7) {
                                return e
                            }
                            if (e == "") {
                                return 0
                            }
                            return parseFloat(e)
                        })
                    } else {
                        t.note = [0, 0, 0, 0, 0, 0, 0, "", ""]
                    }
                    t.sid = e.sid;
                    t.date = e.date.split("|");
                    return t
                })
            }
        }
    },
    "./modules/zxg/zbsetting.html": function(e, t) {
        e.exports = '<div id="zbsetting">\r\n  <div class="zbsl">\r\n    <div class="zbst">备选数据</div>\r\n    <select class="zbsselect sscroll" multiple id="zbssel1"></select>\r\n  </div>\r\n  <div class="zbsm">\r\n    <a href="javascript:;" id="additem" target="_self" class="modalbtn_disabled smodalbtn">添 加</a><br>\r\n    <a href="javascript:;" id="delitem" target="_self" class="modalbtn_disabled smodalbtn">删 除</a><br>\r\n    <a href="javascript:;" id="moveup" target="_self" class="modalbtn_disabled smodalbtn"><span class="icon icon_wuparrow"></span></a><br>\r\n    <a href="javascript:;" id="movedown" target="_self" class="modalbtn_disabled smodalbtn"><span class="icon icon_wdarrow"></span></a><br>\r\n    <a href="javascript:;" id="resetbtn" target="_self" class="modalbtn_default smodalbtn">重 置</a><br>\r\n    <a href="javascript:;" id="clearbtn" target="_self" class="modalbtn_default smodalbtn">清 空</a><br>\r\n  </div>\x3c!-- modalbtn_disabled --\x3e\r\n  <div class="zbsr">\r\n    <div class="zbst">自选股</div>\r\n    <select class="zbsselect sscroll" multiple id="zbssel2"></select>    \r\n  </div>\r\n  <div class="btns">\r\n    <a href="javascript:;" target="_self" id="setting_submit" class="modalbtn_default">确 定</a>\r\n    <a href="javascript:;" target="_self" id="setting_cancel" class="modalbtn_cancel">取 消</a>\r\n  </div>\r\n</div>'
    },
    "./node_modules/dateformat/lib/dateformat.js": function(t, n, a) {
        var i;
        (function(e) {
            "use strict";
            var _ = function() {
                var x = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
                var b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
                var y = /[^-+\dA-Z]/g;
                return function(e, t, n, a) {
                    if (arguments.length === 1 && T(e) === "string" && !/\d/.test(e)) {
                        t = e;
                        e = undefined
                    }
                    e = e || new Date;
                    if (!(e instanceof Date)) {
                        e = new Date(e)
                    }
                    if (isNaN(e)) {
                        throw TypeError("Invalid date")
                    }
                    t = String(_.masks[t] || t || _.masks["default"]);
                    var i = t.slice(0, 4);
                    if (i === "UTC:" || i === "GMT:") {
                        t = t.slice(4);
                        n = true;
                        if (i === "GMT:") {
                            a = true
                        }
                    }
                    var r = n ? "getUTC" : "get";
                    var s = e[r + "Date"]();
                    var o = e[r + "Day"]();
                    var l = e[r + "Month"]();
                    var u = e[r + "FullYear"]();
                    var d = e[r + "Hours"]();
                    var f = e[r + "Minutes"]();
                    var c = e[r + "Seconds"]();
                    var h = e[r + "Milliseconds"]();
                    var p = n ? 0 : e.getTimezoneOffset();
                    var m = w(e);
                    var v = k(e);
                    var g = {
                        d: s,
                        dd: j(s),
                        ddd: _.i18n.dayNames[o],
                        dddd: _.i18n.dayNames[o + 7],
                        m: l + 1,
                        mm: j(l + 1),
                        mmm: _.i18n.monthNames[l],
                        mmmm: _.i18n.monthNames[l + 12],
                        yy: String(u).slice(2),
                        yyyy: u,
                        h: d % 12 || 12,
                        hh: j(d % 12 || 12),
                        H: d,
                        HH: j(d),
                        M: f,
                        MM: j(f),
                        s: c,
                        ss: j(c),
                        l: j(h, 3),
                        L: j(Math.round(h / 10)),
                        t: d < 12 ? _.i18n.timeNames[0] : _.i18n.timeNames[1],
                        tt: d < 12 ? _.i18n.timeNames[2] : _.i18n.timeNames[3],
                        T: d < 12 ? _.i18n.timeNames[4] : _.i18n.timeNames[5],
                        TT: d < 12 ? _.i18n.timeNames[6] : _.i18n.timeNames[7],
                        Z: a ? "GMT" : n ? "UTC" : (String(e).match(b) || [""]).pop().replace(y, ""),
                        o: (p > 0 ? "-" : "+") + j(Math.floor(Math.abs(p) / 60) * 100 + Math.abs(p) % 60, 4),
                        S: ["th", "st", "nd", "rd"][s % 10 > 3 ? 0 : (s % 100 - s % 10 != 10) * s % 10],
                        W: m,
                        N: v
                    };
                    return t.replace(x, function(e) {
                        if (e in g) {
                            return g[e]
                        }
                        return e.slice(1, e.length - 1)
                    })
                }
            }();
            _.masks = {
                "default": "ddd mmm dd yyyy HH:MM:ss",
                shortDate: "m/d/yy",
                mediumDate: "mmm d, yyyy",
                longDate: "mmmm d, yyyy",
                fullDate: "dddd, mmmm d, yyyy",
                shortTime: "h:MM TT",
                mediumTime: "h:MM:ss TT",
                longTime: "h:MM:ss TT Z",
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
            };
            _.i18n = {
                dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
            };
            function j(e, t) {
                e = String(e);
                t = t || 2;
                while (e.length < t) {
                    e = "0" + e
                }
                return e
            }
            function w(e) {
                var t = new Date(e.getFullYear(),e.getMonth(),e.getDate());
                t.setDate(t.getDate() - (t.getDay() + 6) % 7 + 3);
                var n = new Date(t.getFullYear(),0,4);
                n.setDate(n.getDate() - (n.getDay() + 6) % 7 + 3);
                var a = t.getTimezoneOffset() - n.getTimezoneOffset();
                t.setHours(t.getHours() - a);
                var i = (t - n) / (864e5 * 7);
                return 1 + Math.floor(i)
            }
            function k(e) {
                var t = e.getDay();
                if (t === 0) {
                    t = 7
                }
                return t
            }
            function T(e) {
                if (e === null) {
                    return "null"
                }
                if (e === undefined) {
                    return "undefined"
                }
                if (typeof e !== "object") {
                    return typeof e
                }
                if (Array.isArray(e)) {
                    return "array"
                }
                return {}.toString.call(e).slice(8, -1).toLowerCase()
            }
            if (true) {
                !(i = function() {
                    return _
                }
                .call(n, a, n, t),
                i !== undefined && (t.exports = i))
            } else {}
        }
        )(this)
    },
    "./node_modules/dot/doT.js": function(e, t, n) {
        var a;
        (function() {
            "use strict";
            var u = {
                name: "doT",
                version: "1.1.1",
                templateSettings: {
                    evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
                    interpolate: /\{\{=([\s\S]+?)\}\}/g,
                    encode: /\{\{!([\s\S]+?)\}\}/g,
                    use: /\{\{#([\s\S]+?)\}\}/g,
                    useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
                    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
                    defineParams: /^\s*([\w$]+):([\s\S]+)/,
                    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
                    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
                    varname: "it",
                    strip: true,
                    append: true,
                    selfcontained: false,
                    doNotSkipEncoded: false
                },
                template: undefined,
                compile: undefined,
                log: true
            }, d;
            u.encodeHTMLSource = function(e) {
                var t = {
                    "&": "&#38;",
                    "<": "&#60;",
                    ">": "&#62;",
                    '"': "&#34;",
                    "'": "&#39;",
                    "/": "&#47;"
                }
                  , n = e ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
                return function(e) {
                    return e ? e.toString().replace(n, function(e) {
                        return t[e] || e
                    }) : ""
                }
            }
            ;
            d = function() {
                return this || (0,
                eval)("this")
            }();
            if (true && e.exports) {
                e.exports = u
            } else if (true) {
                !(a = function() {
                    return u
                }
                .call(t, n, t, e),
                a !== undefined && (e.exports = a))
            } else {}
            var f = {
                append: {
                    start: "'+(",
                    end: ")+'",
                    startencode: "'+encodeHTML("
                },
                split: {
                    start: "';out+=(",
                    end: ");out+='",
                    startencode: "';out+=encodeHTML("
                }
            }
              , c = /$^/;
            function h(i, e, r) {
                return (typeof e === "string" ? e : e.toString()).replace(i.define || c, function(e, a, t, n) {
                    if (a.indexOf("def.") === 0) {
                        a = a.substring(4)
                    }
                    if (!(a in r)) {
                        if (t === ":") {
                            if (i.defineParams)
                                n.replace(i.defineParams, function(e, t, n) {
                                    r[a] = {
                                        arg: t,
                                        text: n
                                    }
                                });
                            if (!(a in r))
                                r[a] = n
                        } else {
                            new Function("def","def['" + a + "']=" + n)(r)
                        }
                    }
                    return ""
                }).replace(i.use || c, function(e, t) {
                    if (i.useParams)
                        t = t.replace(i.useParams, function(e, t, n, a) {
                            if (r[n] && r[n].arg && a) {
                                var i = (n + ":" + a).replace(/'|\\/g, "_");
                                r.__exp = r.__exp || {};
                                r.__exp[i] = r[n].text.replace(new RegExp("(^|[^\\w$])" + r[n].arg + "([^\\w$])","g"), "$1" + a + "$2");
                                return t + "def.__exp['" + i + "']"
                            }
                        });
                    var n = new Function("def","return " + t)(r);
                    return n ? h(i, n, r) : n
                })
            }
            function p(e) {
                return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
            }
            u.template = function(e, t, n) {
                t = t || u.templateSettings;
                var a = t.append ? f.append : f.split, i, r = 0, s, o = t.use || t.define ? h(t, e, n || {}) : e;
                o = ("var out='" + (t.strip ? o.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : o).replace(/'|\\/g, "\\$&").replace(t.interpolate || c, function(e, t) {
                    return a.start + p(t) + a.end
                }).replace(t.encode || c, function(e, t) {
                    i = true;
                    return a.startencode + p(t) + a.end
                }).replace(t.conditional || c, function(e, t, n) {
                    return t ? n ? "';}else if(" + p(n) + "){out+='" : "';}else{out+='" : n ? "';if(" + p(n) + "){out+='" : "';}out+='"
                }).replace(t.iterate || c, function(e, t, n, a) {
                    if (!t)
                        return "';} } out+='";
                    r += 1;
                    s = a || "i" + r;
                    t = p(t);
                    return "';var arr" + r + "=" + t + ";if(arr" + r + "){var " + n + "," + s + "=-1,l" + r + "=arr" + r + ".length-1;while(" + s + "<l" + r + "){" + n + "=arr" + r + "[" + s + "+=1];out+='"
                }).replace(t.evaluate || c, function(e, t) {
                    return "';" + p(t) + "out+='"
                }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "");
                if (i) {
                    if (!t.selfcontained && d && !d._encodeHTML)
                        d._encodeHTML = u.encodeHTMLSource(t.doNotSkipEncoded);
                    o = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + u.encodeHTMLSource.toString() + "(" + (t.doNotSkipEncoded || "") + "));" + o
                }
                try {
                    return new Function(t.varname,o)
                } catch (l) {
                    if (typeof console !== "undefined")
                        console.log("Could not create a template function: " + o);
                    throw l
                }
            }
            ;
            u.compile = function(e, t) {
                return u.template(e, null, t)
            }
        }
        )()
    },
    "./node_modules/lodash/_DataView.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js")
          , i = n("./node_modules/lodash/_root.js");
        var r = a(i, "DataView");
        e.exports = r
    },
    "./node_modules/lodash/_Hash.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_hashClear.js")
          , i = n("./node_modules/lodash/_hashDelete.js")
          , r = n("./node_modules/lodash/_hashGet.js")
          , s = n("./node_modules/lodash/_hashHas.js")
          , o = n("./node_modules/lodash/_hashSet.js");
        function l(e) {
            var t = -1
              , n = e == null ? 0 : e.length;
            this.clear();
            while (++t < n) {
                var a = e[t];
                this.set(a[0], a[1])
            }
        }
        l.prototype.clear = a;
        l.prototype["delete"] = i;
        l.prototype.get = r;
        l.prototype.has = s;
        l.prototype.set = o;
        e.exports = l
    },
    "./node_modules/lodash/_ListCache.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_listCacheClear.js")
          , i = n("./node_modules/lodash/_listCacheDelete.js")
          , r = n("./node_modules/lodash/_listCacheGet.js")
          , s = n("./node_modules/lodash/_listCacheHas.js")
          , o = n("./node_modules/lodash/_listCacheSet.js");
        function l(e) {
            var t = -1
              , n = e == null ? 0 : e.length;
            this.clear();
            while (++t < n) {
                var a = e[t];
                this.set(a[0], a[1])
            }
        }
        l.prototype.clear = a;
        l.prototype["delete"] = i;
        l.prototype.get = r;
        l.prototype.has = s;
        l.prototype.set = o;
        e.exports = l
    },
    "./node_modules/lodash/_Map.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js")
          , i = n("./node_modules/lodash/_root.js");
        var r = a(i, "Map");
        e.exports = r
    },
    "./node_modules/lodash/_MapCache.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_mapCacheClear.js")
          , i = n("./node_modules/lodash/_mapCacheDelete.js")
          , r = n("./node_modules/lodash/_mapCacheGet.js")
          , s = n("./node_modules/lodash/_mapCacheHas.js")
          , o = n("./node_modules/lodash/_mapCacheSet.js");
        function l(e) {
            var t = -1
              , n = e == null ? 0 : e.length;
            this.clear();
            while (++t < n) {
                var a = e[t];
                this.set(a[0], a[1])
            }
        }
        l.prototype.clear = a;
        l.prototype["delete"] = i;
        l.prototype.get = r;
        l.prototype.has = s;
        l.prototype.set = o;
        e.exports = l
    },
    "./node_modules/lodash/_Promise.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js")
          , i = n("./node_modules/lodash/_root.js");
        var r = a(i, "Promise");
        e.exports = r
    },
    "./node_modules/lodash/_Set.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js")
          , i = n("./node_modules/lodash/_root.js");
        var r = a(i, "Set");
        e.exports = r
    },
    "./node_modules/lodash/_Stack.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_ListCache.js")
          , i = n("./node_modules/lodash/_stackClear.js")
          , r = n("./node_modules/lodash/_stackDelete.js")
          , s = n("./node_modules/lodash/_stackGet.js")
          , o = n("./node_modules/lodash/_stackHas.js")
          , l = n("./node_modules/lodash/_stackSet.js");
        function u(e) {
            var t = this.__data__ = new a(e);
            this.size = t.size
        }
        u.prototype.clear = i;
        u.prototype["delete"] = r;
        u.prototype.get = s;
        u.prototype.has = o;
        u.prototype.set = l;
        e.exports = u
    },
    "./node_modules/lodash/_Symbol.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_root.js");
        var i = a.Symbol;
        e.exports = i
    },
    "./node_modules/lodash/_Uint8Array.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_root.js");
        var i = a.Uint8Array;
        e.exports = i
    },
    "./node_modules/lodash/_WeakMap.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js")
          , i = n("./node_modules/lodash/_root.js");
        var r = a(i, "WeakMap");
        e.exports = r
    },
    "./node_modules/lodash/_arrayEach.js": function(e, t) {
        function n(e, t) {
            var n = -1
              , a = e == null ? 0 : e.length;
            while (++n < a) {
                if (t(e[n], n, e) === false) {
                    break
                }
            }
            return e
        }
        e.exports = n
    },
    "./node_modules/lodash/_arrayFilter.js": function(e, t) {
        function n(e, t) {
            var n = -1
              , a = e == null ? 0 : e.length
              , i = 0
              , r = [];
            while (++n < a) {
                var s = e[n];
                if (t(s, n, e)) {
                    r[i++] = s
                }
            }
            return r
        }
        e.exports = n
    },
    "./node_modules/lodash/_arrayLikeKeys.js": function(e, t, n) {
        var d = n("./node_modules/lodash/_baseTimes.js")
          , f = n("./node_modules/lodash/isArguments.js")
          , c = n("./node_modules/lodash/isArray.js")
          , h = n("./node_modules/lodash/isBuffer.js")
          , p = n("./node_modules/lodash/_isIndex.js")
          , m = n("./node_modules/lodash/isTypedArray.js");
        var a = Object.prototype;
        var v = a.hasOwnProperty;
        function i(e, t) {
            var n = c(e)
              , a = !n && f(e)
              , i = !n && !a && h(e)
              , r = !n && !a && !i && m(e)
              , s = n || a || i || r
              , o = s ? d(e.length, String) : []
              , l = o.length;
            for (var u in e) {
                if ((t || v.call(e, u)) && !(s && (u == "length" || i && (u == "offset" || u == "parent") || r && (u == "buffer" || u == "byteLength" || u == "byteOffset") || p(u, l)))) {
                    o.push(u)
                }
            }
            return o
        }
        e.exports = i
    },
    "./node_modules/lodash/_arrayPush.js": function(e, t) {
        function n(e, t) {
            var n = -1
              , a = t.length
              , i = e.length;
            while (++n < a) {
                e[i + n] = t[n]
            }
            return e
        }
        e.exports = n
    },
    "./node_modules/lodash/_assignValue.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_baseAssignValue.js")
          , r = n("./node_modules/lodash/eq.js");
        var a = Object.prototype;
        var s = a.hasOwnProperty;
        function o(e, t, n) {
            var a = e[t];
            if (!(s.call(e, t) && r(a, n)) || n === undefined && !(t in e)) {
                i(e, t, n)
            }
        }
        e.exports = o
    },
    "./node_modules/lodash/_assocIndexOf.js": function(e, t, n) {
        var a = n("./node_modules/lodash/eq.js");
        function i(e, t) {
            var n = e.length;
            while (n--) {
                if (a(e[n][0], t)) {
                    return n
                }
            }
            return -1
        }
        e.exports = i
    },
    "./node_modules/lodash/_baseAssign.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_copyObject.js")
          , i = n("./node_modules/lodash/keys.js");
        function r(e, t) {
            return e && a(t, i(t), e)
        }
        e.exports = r
    },
    "./node_modules/lodash/_baseAssignIn.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_copyObject.js")
          , i = n("./node_modules/lodash/keysIn.js");
        function r(e, t) {
            return e && a(t, i(t), e)
        }
        e.exports = r
    },
    "./node_modules/lodash/_baseAssignValue.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_defineProperty.js");
        function i(e, t, n) {
            if (t == "__proto__" && a) {
                a(e, t, {
                    configurable: true,
                    enumerable: true,
                    value: n,
                    writable: true
                })
            } else {
                e[t] = n
            }
        }
        e.exports = i
    },
    "./node_modules/lodash/_baseClone.js": function(e, t, n) {
        var v = n("./node_modules/lodash/_Stack.js")
          , g = n("./node_modules/lodash/_arrayEach.js")
          , x = n("./node_modules/lodash/_assignValue.js")
          , b = n("./node_modules/lodash/_baseAssign.js")
          , y = n("./node_modules/lodash/_baseAssignIn.js")
          , _ = n("./node_modules/lodash/_cloneBuffer.js")
          , j = n("./node_modules/lodash/_copyArray.js")
          , w = n("./node_modules/lodash/_copySymbols.js")
          , k = n("./node_modules/lodash/_copySymbolsIn.js")
          , T = n("./node_modules/lodash/_getAllKeys.js")
          , A = n("./node_modules/lodash/_getAllKeysIn.js")
          , S = n("./node_modules/lodash/_getTag.js")
          , C = n("./node_modules/lodash/_initCloneArray.js")
          , M = n("./node_modules/lodash/_initCloneByTag.js")
          , z = n("./node_modules/lodash/_initCloneObject.js")
          , $ = n("./node_modules/lodash/isArray.js")
          , E = n("./node_modules/lodash/isBuffer.js")
          , I = n("./node_modules/lodash/isMap.js")
          , O = n("./node_modules/lodash/isObject.js")
          , D = n("./node_modules/lodash/isSet.js")
          , F = n("./node_modules/lodash/keys.js");
        var P = 1
          , L = 2
          , R = 4;
        var B = "[object Arguments]"
          , a = "[object Array]"
          , i = "[object Boolean]"
          , r = "[object Date]"
          , s = "[object Error]"
          , N = "[object Function]"
          , G = "[object GeneratorFunction]"
          , o = "[object Map]"
          , l = "[object Number]"
          , H = "[object Object]"
          , u = "[object RegExp]"
          , d = "[object Set]"
          , f = "[object String]"
          , c = "[object Symbol]"
          , h = "[object WeakMap]";
        var p = "[object ArrayBuffer]"
          , m = "[object DataView]"
          , q = "[object Float32Array]"
          , U = "[object Float64Array]"
          , X = "[object Int8Array]"
          , K = "[object Int16Array]"
          , W = "[object Int32Array]"
          , Y = "[object Uint8Array]"
          , V = "[object Uint8ClampedArray]"
          , J = "[object Uint16Array]"
          , Q = "[object Uint32Array]";
        var Z = {};
        Z[B] = Z[a] = Z[p] = Z[m] = Z[i] = Z[r] = Z[q] = Z[U] = Z[X] = Z[K] = Z[W] = Z[o] = Z[l] = Z[H] = Z[u] = Z[d] = Z[f] = Z[c] = Z[Y] = Z[V] = Z[J] = Z[Q] = true;
        Z[s] = Z[N] = Z[h] = false;
        function ee(n, a, i, e, t, r) {
            var s, o = a & P, l = a & L, u = a & R;
            if (i) {
                s = t ? i(n, e, t, r) : i(n)
            }
            if (s !== undefined) {
                return s
            }
            if (!O(n)) {
                return n
            }
            var d = $(n);
            if (d) {
                s = C(n);
                if (!o) {
                    return j(n, s)
                }
            } else {
                var f = S(n)
                  , c = f == N || f == G;
                if (E(n)) {
                    return _(n, o)
                }
                if (f == H || f == B || c && !t) {
                    s = l || c ? {} : z(n);
                    if (!o) {
                        return l ? k(n, y(s, n)) : w(n, b(s, n))
                    }
                } else {
                    if (!Z[f]) {
                        return t ? n : {}
                    }
                    s = M(n, f, o)
                }
            }
            r || (r = new v);
            var h = r.get(n);
            if (h) {
                return h
            }
            r.set(n, s);
            if (D(n)) {
                n.forEach(function(e) {
                    s.add(ee(e, a, i, e, n, r))
                });
                return s
            }
            if (I(n)) {
                n.forEach(function(e, t) {
                    s.set(t, ee(e, a, i, t, n, r))
                });
                return s
            }
            var p = u ? l ? A : T : l ? keysIn : F;
            var m = d ? undefined : p(n);
            g(m || n, function(e, t) {
                if (m) {
                    t = e;
                    e = n[t]
                }
                x(s, t, ee(e, a, i, t, n, r))
            });
            return s
        }
        e.exports = ee
    },
    "./node_modules/lodash/_baseCreate.js": function(e, t, n) {
        var a = n("./node_modules/lodash/isObject.js");
        var i = Object.create;
        var r = function() {
            function n() {}
            return function(e) {
                if (!a(e)) {
                    return {}
                }
                if (i) {
                    return i(e)
                }
                n.prototype = e;
                var t = new n;
                n.prototype = undefined;
                return t
            }
        }();
        e.exports = r
    },
    "./node_modules/lodash/_baseGetAllKeys.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_arrayPush.js")
          , r = n("./node_modules/lodash/isArray.js");
        function a(e, t, n) {
            var a = t(e);
            return r(e) ? a : i(a, n(e))
        }
        e.exports = a
    },
    "./node_modules/lodash/_baseGetTag.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_Symbol.js")
          , i = n("./node_modules/lodash/_getRawTag.js")
          , r = n("./node_modules/lodash/_objectToString.js");
        var s = "[object Null]"
          , o = "[object Undefined]";
        var l = a ? a.toStringTag : undefined;
        function u(e) {
            if (e == null) {
                return e === undefined ? o : s
            }
            return l && l in Object(e) ? i(e) : r(e)
        }
        e.exports = u
    },
    "./node_modules/lodash/_baseIsArguments.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseGetTag.js")
          , i = n("./node_modules/lodash/isObjectLike.js");
        var r = "[object Arguments]";
        function s(e) {
            return i(e) && a(e) == r
        }
        e.exports = s
    },
    "./node_modules/lodash/_baseIsMap.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getTag.js")
          , i = n("./node_modules/lodash/isObjectLike.js");
        var r = "[object Map]";
        function s(e) {
            return i(e) && a(e) == r
        }
        e.exports = s
    },
    "./node_modules/lodash/_baseIsNative.js": function(e, t, n) {
        var a = n("./node_modules/lodash/isFunction.js")
          , i = n("./node_modules/lodash/_isMasked.js")
          , r = n("./node_modules/lodash/isObject.js")
          , s = n("./node_modules/lodash/_toSource.js");
        var o = /[\\^$.*+?()[\]{}|]/g;
        var l = /^\[object .+?Constructor\]$/;
        var u = Function.prototype
          , d = Object.prototype;
        var f = u.toString;
        var c = d.hasOwnProperty;
        var h = RegExp("^" + f.call(c).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        function p(e) {
            if (!r(e) || i(e)) {
                return false
            }
            var t = a(e) ? h : l;
            return t.test(s(e))
        }
        e.exports = p
    },
    "./node_modules/lodash/_baseIsSet.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getTag.js")
          , i = n("./node_modules/lodash/isObjectLike.js");
        var r = "[object Set]";
        function s(e) {
            return i(e) && a(e) == r
        }
        e.exports = s
    },
    "./node_modules/lodash/_baseIsTypedArray.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseGetTag.js")
          , i = n("./node_modules/lodash/isLength.js")
          , r = n("./node_modules/lodash/isObjectLike.js");
        var s = "[object Arguments]"
          , o = "[object Array]"
          , l = "[object Boolean]"
          , u = "[object Date]"
          , d = "[object Error]"
          , f = "[object Function]"
          , c = "[object Map]"
          , h = "[object Number]"
          , p = "[object Object]"
          , m = "[object RegExp]"
          , v = "[object Set]"
          , g = "[object String]"
          , x = "[object WeakMap]";
        var b = "[object ArrayBuffer]"
          , y = "[object DataView]"
          , _ = "[object Float32Array]"
          , j = "[object Float64Array]"
          , w = "[object Int8Array]"
          , k = "[object Int16Array]"
          , T = "[object Int32Array]"
          , A = "[object Uint8Array]"
          , S = "[object Uint8ClampedArray]"
          , C = "[object Uint16Array]"
          , M = "[object Uint32Array]";
        var z = {};
        z[_] = z[j] = z[w] = z[k] = z[T] = z[A] = z[S] = z[C] = z[M] = true;
        z[s] = z[o] = z[b] = z[l] = z[y] = z[u] = z[d] = z[f] = z[c] = z[h] = z[p] = z[m] = z[v] = z[g] = z[x] = false;
        function $(e) {
            return r(e) && i(e.length) && !!z[a(e)]
        }
        e.exports = $
    },
    "./node_modules/lodash/_baseKeys.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_isPrototype.js")
          , i = n("./node_modules/lodash/_nativeKeys.js");
        var r = Object.prototype;
        var s = r.hasOwnProperty;
        function o(e) {
            if (!a(e)) {
                return i(e)
            }
            var t = [];
            for (var n in Object(e)) {
                if (s.call(e, n) && n != "constructor") {
                    t.push(n)
                }
            }
            return t
        }
        e.exports = o
    },
    "./node_modules/lodash/_baseKeysIn.js": function(e, t, n) {
        var i = n("./node_modules/lodash/isObject.js")
          , r = n("./node_modules/lodash/_isPrototype.js")
          , s = n("./node_modules/lodash/_nativeKeysIn.js");
        var a = Object.prototype;
        var o = a.hasOwnProperty;
        function l(e) {
            if (!i(e)) {
                return s(e)
            }
            var t = r(e)
              , n = [];
            for (var a in e) {
                if (!(a == "constructor" && (t || !o.call(e, a)))) {
                    n.push(a)
                }
            }
            return n
        }
        e.exports = l
    },
    "./node_modules/lodash/_baseTimes.js": function(e, t) {
        function n(e, t) {
            var n = -1
              , a = Array(e);
            while (++n < e) {
                a[n] = t(n)
            }
            return a
        }
        e.exports = n
    },
    "./node_modules/lodash/_baseUnary.js": function(e, t) {
        function n(t) {
            return function(e) {
                return t(e)
            }
        }
        e.exports = n
    },
    "./node_modules/lodash/_cloneArrayBuffer.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_Uint8Array.js");
        function i(e) {
            var t = new e.constructor(e.byteLength);
            new a(t).set(new a(e));
            return t
        }
        e.exports = i
    },
    "./node_modules/lodash/_cloneBuffer.js": function(e, l, u) {
        (function(e) {
            var t = u("./node_modules/lodash/_root.js");
            var n = true && l && !l.nodeType && l;
            var a = n && typeof e == "object" && e && !e.nodeType && e;
            var i = a && a.exports === n;
            var r = i ? t.Buffer : undefined
              , s = r ? r.allocUnsafe : undefined;
            function o(e, t) {
                if (t) {
                    return e.slice()
                }
                var n = e.length
                  , a = s ? s(n) : new e.constructor(n);
                e.copy(a);
                return a
            }
            e.exports = o
        }
        ).call(this, u("./node_modules/webpack/buildin/module.js")(e))
    },
    "./node_modules/lodash/_cloneDataView.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_cloneArrayBuffer.js");
        function i(e, t) {
            var n = t ? a(e.buffer) : e.buffer;
            return new e.constructor(n,e.byteOffset,e.byteLength)
        }
        e.exports = i
    },
    "./node_modules/lodash/_cloneRegExp.js": function(e, t) {
        var n = /\w*$/;
        function a(e) {
            var t = new e.constructor(e.source,n.exec(e));
            t.lastIndex = e.lastIndex;
            return t
        }
        e.exports = a
    },
    "./node_modules/lodash/_cloneSymbol.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_Symbol.js");
        var i = a ? a.prototype : undefined
          , r = i ? i.valueOf : undefined;
        function s(e) {
            return r ? Object(r.call(e)) : {}
        }
        e.exports = s
    },
    "./node_modules/lodash/_cloneTypedArray.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_cloneArrayBuffer.js");
        function i(e, t) {
            var n = t ? a(e.buffer) : e.buffer;
            return new e.constructor(n,e.byteOffset,e.length)
        }
        e.exports = i
    },
    "./node_modules/lodash/_copyArray.js": function(e, t) {
        function n(e, t) {
            var n = -1
              , a = e.length;
            t || (t = Array(a));
            while (++n < a) {
                t[n] = e[n]
            }
            return t
        }
        e.exports = n
    },
    "./node_modules/lodash/_copyObject.js": function(e, t, n) {
        var u = n("./node_modules/lodash/_assignValue.js")
          , d = n("./node_modules/lodash/_baseAssignValue.js");
        function a(e, t, n, a) {
            var i = !n;
            n || (n = {});
            var r = -1
              , s = t.length;
            while (++r < s) {
                var o = t[r];
                var l = a ? a(n[o], e[o], o, n, e) : undefined;
                if (l === undefined) {
                    l = e[o]
                }
                if (i) {
                    d(n, o, l)
                } else {
                    u(n, o, l)
                }
            }
            return n
        }
        e.exports = a
    },
    "./node_modules/lodash/_copySymbols.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_copyObject.js")
          , i = n("./node_modules/lodash/_getSymbols.js");
        function r(e, t) {
            return a(e, i(e), t)
        }
        e.exports = r
    },
    "./node_modules/lodash/_copySymbolsIn.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_copyObject.js")
          , i = n("./node_modules/lodash/_getSymbolsIn.js");
        function r(e, t) {
            return a(e, i(e), t)
        }
        e.exports = r
    },
    "./node_modules/lodash/_coreJsData.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_root.js");
        var i = a["__core-js_shared__"];
        e.exports = i
    },
    "./node_modules/lodash/_defineProperty.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js");
        var i = function() {
            try {
                var e = a(Object, "defineProperty");
                e({}, "", {});
                return e
            } catch (t) {}
        }();
        e.exports = i
    },
    "./node_modules/lodash/_freeGlobal.js": function(n, e, t) {
        (function(e) {
            var t = typeof e == "object" && e && e.Object === Object && e;
            n.exports = t
        }
        ).call(this, t("./node_modules/webpack/buildin/global.js"))
    },
    "./node_modules/lodash/_getAllKeys.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseGetAllKeys.js")
          , i = n("./node_modules/lodash/_getSymbols.js")
          , r = n("./node_modules/lodash/keys.js");
        function s(e) {
            return a(e, r, i)
        }
        e.exports = s
    },
    "./node_modules/lodash/_getAllKeysIn.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseGetAllKeys.js")
          , i = n("./node_modules/lodash/_getSymbolsIn.js")
          , r = n("./node_modules/lodash/keysIn.js");
        function s(e) {
            return a(e, r, i)
        }
        e.exports = s
    },
    "./node_modules/lodash/_getMapData.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_isKeyable.js");
        function i(e, t) {
            var n = e.__data__;
            return a(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map
        }
        e.exports = i
    },
    "./node_modules/lodash/_getNative.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseIsNative.js")
          , i = n("./node_modules/lodash/_getValue.js");
        function r(e, t) {
            var n = i(e, t);
            return a(n) ? n : undefined
        }
        e.exports = r
    },
    "./node_modules/lodash/_getPrototype.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_overArg.js");
        var i = a(Object.getPrototypeOf, Object);
        e.exports = i
    },
    "./node_modules/lodash/_getRawTag.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_Symbol.js");
        var i = Object.prototype;
        var s = i.hasOwnProperty;
        var o = i.toString;
        var l = a ? a.toStringTag : undefined;
        function r(e) {
            var t = s.call(e, l)
              , n = e[l];
            try {
                e[l] = undefined;
                var a = true
            } catch (r) {}
            var i = o.call(e);
            if (a) {
                if (t) {
                    e[l] = n
                } else {
                    delete e[l]
                }
            }
            return i
        }
        e.exports = r
    },
    "./node_modules/lodash/_getSymbols.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_arrayFilter.js")
          , i = n("./node_modules/lodash/stubArray.js");
        var r = Object.prototype;
        var s = r.propertyIsEnumerable;
        var o = Object.getOwnPropertySymbols;
        var l = !o ? i : function(t) {
            if (t == null) {
                return []
            }
            t = Object(t);
            return a(o(t), function(e) {
                return s.call(t, e)
            })
        }
        ;
        e.exports = l
    },
    "./node_modules/lodash/_getSymbolsIn.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_arrayPush.js")
          , i = n("./node_modules/lodash/_getPrototype.js")
          , r = n("./node_modules/lodash/_getSymbols.js")
          , s = n("./node_modules/lodash/stubArray.js");
        var o = Object.getOwnPropertySymbols;
        var l = !o ? s : function(e) {
            var t = [];
            while (e) {
                a(t, r(e));
                e = i(e)
            }
            return t
        }
        ;
        e.exports = l
    },
    "./node_modules/lodash/_getTag.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_DataView.js")
          , i = n("./node_modules/lodash/_Map.js")
          , r = n("./node_modules/lodash/_Promise.js")
          , s = n("./node_modules/lodash/_Set.js")
          , o = n("./node_modules/lodash/_WeakMap.js")
          , l = n("./node_modules/lodash/_baseGetTag.js")
          , u = n("./node_modules/lodash/_toSource.js");
        var d = "[object Map]"
          , f = "[object Object]"
          , c = "[object Promise]"
          , h = "[object Set]"
          , p = "[object WeakMap]";
        var m = "[object DataView]";
        var v = u(a)
          , g = u(i)
          , x = u(r)
          , b = u(s)
          , y = u(o);
        var _ = l;
        if (a && _(new a(new ArrayBuffer(1))) != m || i && _(new i) != d || r && _(r.resolve()) != c || s && _(new s) != h || o && _(new o) != p) {
            _ = function(e) {
                var t = l(e)
                  , n = t == f ? e.constructor : undefined
                  , a = n ? u(n) : "";
                if (a) {
                    switch (a) {
                    case v:
                        return m;
                    case g:
                        return d;
                    case x:
                        return c;
                    case b:
                        return h;
                    case y:
                        return p
                    }
                }
                return t
            }
        }
        e.exports = _
    },
    "./node_modules/lodash/_getValue.js": function(e, t) {
        function n(e, t) {
            return e == null ? undefined : e[t]
        }
        e.exports = n
    },
    "./node_modules/lodash/_hashClear.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_nativeCreate.js");
        function i() {
            this.__data__ = a ? a(null) : {};
            this.size = 0
        }
        e.exports = i
    },
    "./node_modules/lodash/_hashDelete.js": function(e, t) {
        function n(e) {
            var t = this.has(e) && delete this.__data__[e];
            this.size -= t ? 1 : 0;
            return t
        }
        e.exports = n
    },
    "./node_modules/lodash/_hashGet.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_nativeCreate.js");
        var i = "__lodash_hash_undefined__";
        var r = Object.prototype;
        var s = r.hasOwnProperty;
        function o(e) {
            var t = this.__data__;
            if (a) {
                var n = t[e];
                return n === i ? undefined : n
            }
            return s.call(t, e) ? t[e] : undefined
        }
        e.exports = o
    },
    "./node_modules/lodash/_hashHas.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_nativeCreate.js");
        var i = Object.prototype;
        var r = i.hasOwnProperty;
        function s(e) {
            var t = this.__data__;
            return a ? t[e] !== undefined : r.call(t, e)
        }
        e.exports = s
    },
    "./node_modules/lodash/_hashSet.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_nativeCreate.js");
        var i = "__lodash_hash_undefined__";
        function r(e, t) {
            var n = this.__data__;
            this.size += this.has(e) ? 0 : 1;
            n[e] = a && t === undefined ? i : t;
            return this
        }
        e.exports = r
    },
    "./node_modules/lodash/_initCloneArray.js": function(e, t) {
        var n = Object.prototype;
        var a = n.hasOwnProperty;
        function i(e) {
            var t = e.length
              , n = new e.constructor(t);
            if (t && typeof e[0] == "string" && a.call(e, "index")) {
                n.index = e.index;
                n.input = e.input
            }
            return n
        }
        e.exports = i
    },
    "./node_modules/lodash/_initCloneByTag.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_cloneArrayBuffer.js")
          , r = n("./node_modules/lodash/_cloneDataView.js")
          , s = n("./node_modules/lodash/_cloneRegExp.js")
          , o = n("./node_modules/lodash/_cloneSymbol.js")
          , l = n("./node_modules/lodash/_cloneTypedArray.js");
        var u = "[object Boolean]"
          , d = "[object Date]"
          , f = "[object Map]"
          , c = "[object Number]"
          , h = "[object RegExp]"
          , p = "[object Set]"
          , m = "[object String]"
          , v = "[object Symbol]";
        var g = "[object ArrayBuffer]"
          , x = "[object DataView]"
          , b = "[object Float32Array]"
          , y = "[object Float64Array]"
          , _ = "[object Int8Array]"
          , j = "[object Int16Array]"
          , w = "[object Int32Array]"
          , k = "[object Uint8Array]"
          , T = "[object Uint8ClampedArray]"
          , A = "[object Uint16Array]"
          , S = "[object Uint32Array]";
        function a(e, t, n) {
            var a = e.constructor;
            switch (t) {
            case g:
                return i(e);
            case u:
            case d:
                return new a(+e);
            case x:
                return r(e, n);
            case b:
            case y:
            case _:
            case j:
            case w:
            case k:
            case T:
            case A:
            case S:
                return l(e, n);
            case f:
                return new a;
            case c:
            case m:
                return new a(e);
            case h:
                return s(e);
            case p:
                return new a;
            case v:
                return o(e)
            }
        }
        e.exports = a
    },
    "./node_modules/lodash/_initCloneObject.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseCreate.js")
          , i = n("./node_modules/lodash/_getPrototype.js")
          , r = n("./node_modules/lodash/_isPrototype.js");
        function s(e) {
            return typeof e.constructor == "function" && !r(e) ? a(i(e)) : {}
        }
        e.exports = s
    },
    "./node_modules/lodash/_isIndex.js": function(e, t) {
        var a = 9007199254740991;
        var i = /^(?:0|[1-9]\d*)$/;
        function n(e, t) {
            var n = typeof e;
            t = t == null ? a : t;
            return !!t && (n == "number" || n != "symbol" && i.test(e)) && (e > -1 && e % 1 == 0 && e < t)
        }
        e.exports = n
    },
    "./node_modules/lodash/_isKeyable.js": function(e, t) {
        function n(e) {
            var t = typeof e;
            return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
        }
        e.exports = n
    },
    "./node_modules/lodash/_isMasked.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_coreJsData.js");
        var i = function() {
            var e = /[^.]+$/.exec(a && a.keys && a.keys.IE_PROTO || "");
            return e ? "Symbol(src)_1." + e : ""
        }();
        function r(e) {
            return !!i && i in e
        }
        e.exports = r
    },
    "./node_modules/lodash/_isPrototype.js": function(e, t) {
        var a = Object.prototype;
        function n(e) {
            var t = e && e.constructor
              , n = typeof t == "function" && t.prototype || a;
            return e === n
        }
        e.exports = n
    },
    "./node_modules/lodash/_listCacheClear.js": function(e, t) {
        function n() {
            this.__data__ = [];
            this.size = 0
        }
        e.exports = n
    },
    "./node_modules/lodash/_listCacheDelete.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_assocIndexOf.js");
        var a = Array.prototype;
        var r = a.splice;
        function s(e) {
            var t = this.__data__
              , n = i(t, e);
            if (n < 0) {
                return false
            }
            var a = t.length - 1;
            if (n == a) {
                t.pop()
            } else {
                r.call(t, n, 1)
            }
            --this.size;
            return true
        }
        e.exports = s
    },
    "./node_modules/lodash/_listCacheGet.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_assocIndexOf.js");
        function i(e) {
            var t = this.__data__
              , n = a(t, e);
            return n < 0 ? undefined : t[n][1]
        }
        e.exports = i
    },
    "./node_modules/lodash/_listCacheHas.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_assocIndexOf.js");
        function i(e) {
            return a(this.__data__, e) > -1
        }
        e.exports = i
    },
    "./node_modules/lodash/_listCacheSet.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_assocIndexOf.js");
        function a(e, t) {
            var n = this.__data__
              , a = i(n, e);
            if (a < 0) {
                ++this.size;
                n.push([e, t])
            } else {
                n[a][1] = t
            }
            return this
        }
        e.exports = a
    },
    "./node_modules/lodash/_mapCacheClear.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_Hash.js")
          , i = n("./node_modules/lodash/_ListCache.js")
          , r = n("./node_modules/lodash/_Map.js");
        function s() {
            this.size = 0;
            this.__data__ = {
                hash: new a,
                map: new (r || i),
                string: new a
            }
        }
        e.exports = s
    },
    "./node_modules/lodash/_mapCacheDelete.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getMapData.js");
        function i(e) {
            var t = a(this, e)["delete"](e);
            this.size -= t ? 1 : 0;
            return t
        }
        e.exports = i
    },
    "./node_modules/lodash/_mapCacheGet.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getMapData.js");
        function i(e) {
            return a(this, e).get(e)
        }
        e.exports = i
    },
    "./node_modules/lodash/_mapCacheHas.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getMapData.js");
        function i(e) {
            return a(this, e).has(e)
        }
        e.exports = i
    },
    "./node_modules/lodash/_mapCacheSet.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_getMapData.js");
        function a(e, t) {
            var n = i(this, e)
              , a = n.size;
            n.set(e, t);
            this.size += n.size == a ? 0 : 1;
            return this
        }
        e.exports = a
    },
    "./node_modules/lodash/_nativeCreate.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_getNative.js");
        var i = a(Object, "create");
        e.exports = i
    },
    "./node_modules/lodash/_nativeKeys.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_overArg.js");
        var i = a(Object.keys, Object);
        e.exports = i
    },
    "./node_modules/lodash/_nativeKeysIn.js": function(e, t) {
        function n(e) {
            var t = [];
            if (e != null) {
                for (var n in Object(e)) {
                    t.push(n)
                }
            }
            return t
        }
        e.exports = n
    },
    "./node_modules/lodash/_nodeUtil.js": function(e, o, l) {
        (function(e) {
            var t = l("./node_modules/lodash/_freeGlobal.js");
            var n = true && o && !o.nodeType && o;
            var a = n && typeof e == "object" && e && !e.nodeType && e;
            var i = a && a.exports === n;
            var r = i && t.process;
            var s = function() {
                try {
                    var e = a && a.require && a.require("util").types;
                    if (e) {
                        return e
                    }
                    return r && r.binding && r.binding("util")
                } catch (t) {}
            }();
            e.exports = s
        }
        ).call(this, l("./node_modules/webpack/buildin/module.js")(e))
    },
    "./node_modules/lodash/_objectToString.js": function(e, t) {
        var n = Object.prototype;
        var a = n.toString;
        function i(e) {
            return a.call(e)
        }
        e.exports = i
    },
    "./node_modules/lodash/_overArg.js": function(e, t) {
        function n(t, n) {
            return function(e) {
                return t(n(e))
            }
        }
        e.exports = n
    },
    "./node_modules/lodash/_root.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_freeGlobal.js");
        var i = typeof self == "object" && self && self.Object === Object && self;
        var r = a || i || Function("return this")();
        e.exports = r
    },
    "./node_modules/lodash/_stackClear.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_ListCache.js");
        function i() {
            this.__data__ = new a;
            this.size = 0
        }
        e.exports = i
    },
    "./node_modules/lodash/_stackDelete.js": function(e, t) {
        function n(e) {
            var t = this.__data__
              , n = t["delete"](e);
            this.size = t.size;
            return n
        }
        e.exports = n
    },
    "./node_modules/lodash/_stackGet.js": function(e, t) {
        function n(e) {
            return this.__data__.get(e)
        }
        e.exports = n
    },
    "./node_modules/lodash/_stackHas.js": function(e, t) {
        function n(e) {
            return this.__data__.has(e)
        }
        e.exports = n
    },
    "./node_modules/lodash/_stackSet.js": function(e, t, n) {
        var i = n("./node_modules/lodash/_ListCache.js")
          , r = n("./node_modules/lodash/_Map.js")
          , s = n("./node_modules/lodash/_MapCache.js");
        var o = 200;
        function a(e, t) {
            var n = this.__data__;
            if (n instanceof i) {
                var a = n.__data__;
                if (!r || a.length < o - 1) {
                    a.push([e, t]);
                    this.size = ++n.size;
                    return this
                }
                n = this.__data__ = new s(a)
            }
            n.set(e, t);
            this.size = n.size;
            return this
        }
        e.exports = a
    },
    "./node_modules/lodash/_toSource.js": function(e, t) {
        var n = Function.prototype;
        var a = n.toString;
        function i(e) {
            if (e != null) {
                try {
                    return a.call(e)
                } catch (t) {}
                try {
                    return e + ""
                } catch (t) {}
            }
            return ""
        }
        e.exports = i
    },
    "./node_modules/lodash/clone.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseClone.js");
        var i = 4;
        function r(e) {
            return a(e, i)
        }
        e.exports = r
    },
    "./node_modules/lodash/debounce.js": function(e, t, n) {
        var j = n("./node_modules/lodash/isObject.js")
          , w = n("./node_modules/lodash/now.js")
          , k = n("./node_modules/lodash/toNumber.js");
        var T = "Expected a function";
        var A = Math.max
          , S = Math.min;
        function a(a, i, e) {
            var r, s, o, l, n, u, d = 0, t = false, f = false, c = true;
            if (typeof a != "function") {
                throw new TypeError(T)
            }
            i = k(i) || 0;
            if (j(e)) {
                t = !!e.leading;
                f = "maxWait"in e;
                o = f ? A(k(e.maxWait) || 0, i) : o;
                c = "trailing"in e ? !!e.trailing : c
            }
            function h(e) {
                var t = r
                  , n = s;
                r = s = undefined;
                d = e;
                l = a.apply(n, t);
                return l
            }
            function p(e) {
                d = e;
                n = setTimeout(g, i);
                return t ? h(e) : l
            }
            function m(e) {
                var t = e - u
                  , n = e - d
                  , a = i - t;
                return f ? S(a, o - n) : a
            }
            function v(e) {
                var t = e - u
                  , n = e - d;
                return u === undefined || t >= i || t < 0 || f && n >= o
            }
            function g() {
                var e = w();
                if (v(e)) {
                    return x(e)
                }
                n = setTimeout(g, m(e))
            }
            function x(e) {
                n = undefined;
                if (c && r) {
                    return h(e)
                }
                r = s = undefined;
                return l
            }
            function b() {
                if (n !== undefined) {
                    clearTimeout(n)
                }
                d = 0;
                r = u = s = n = undefined
            }
            function y() {
                return n === undefined ? l : x(w())
            }
            function _() {
                var e = w()
                  , t = v(e);
                r = arguments;
                s = this;
                u = e;
                if (t) {
                    if (n === undefined) {
                        return p(u)
                    }
                    if (f) {
                        n = setTimeout(g, i);
                        return h(u)
                    }
                }
                if (n === undefined) {
                    n = setTimeout(g, i)
                }
                return l
            }
            _.cancel = b;
            _.flush = y;
            return _
        }
        e.exports = a
    },
    "./node_modules/lodash/eq.js": function(e, t) {
        function n(e, t) {
            return e === t || e !== e && t !== t
        }
        e.exports = n
    },
    "./node_modules/lodash/isArguments.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseIsArguments.js")
          , i = n("./node_modules/lodash/isObjectLike.js");
        var r = Object.prototype;
        var s = r.hasOwnProperty;
        var o = r.propertyIsEnumerable;
        var l = a(function() {
            return arguments
        }()) ? a : function(e) {
            return i(e) && s.call(e, "callee") && !o.call(e, "callee")
        }
        ;
        e.exports = l
    },
    "./node_modules/lodash/isArray.js": function(e, t) {
        var n = Array.isArray;
        e.exports = n
    },
    "./node_modules/lodash/isArrayLike.js": function(e, t, n) {
        var a = n("./node_modules/lodash/isFunction.js")
          , i = n("./node_modules/lodash/isLength.js");
        function r(e) {
            return e != null && i(e.length) && !a(e)
        }
        e.exports = r
    },
    "./node_modules/lodash/isBuffer.js": function(e, u, d) {
        (function(e) {
            var t = d("./node_modules/lodash/_root.js")
              , n = d("./node_modules/lodash/stubFalse.js");
            var a = true && u && !u.nodeType && u;
            var i = a && typeof e == "object" && e && !e.nodeType && e;
            var r = i && i.exports === a;
            var s = r ? t.Buffer : undefined;
            var o = s ? s.isBuffer : undefined;
            var l = o || n;
            e.exports = l
        }
        ).call(this, d("./node_modules/webpack/buildin/module.js")(e))
    },
    "./node_modules/lodash/isFunction.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseGetTag.js")
          , i = n("./node_modules/lodash/isObject.js");
        var r = "[object AsyncFunction]"
          , s = "[object Function]"
          , o = "[object GeneratorFunction]"
          , l = "[object Proxy]";
        function u(e) {
            if (!i(e)) {
                return false
            }
            var t = a(e);
            return t == s || t == o || t == r || t == l
        }
        e.exports = u
    },
    "./node_modules/lodash/isLength.js": function(e, t) {
        var n = 9007199254740991;
        function a(e) {
            return typeof e == "number" && e > -1 && e % 1 == 0 && e <= n
        }
        e.exports = a
    },
    "./node_modules/lodash/isMap.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseIsMap.js")
          , i = n("./node_modules/lodash/_baseUnary.js")
          , r = n("./node_modules/lodash/_nodeUtil.js");
        var s = r && r.isMap;
        var o = s ? i(s) : a;
        e.exports = o
    },
    "./node_modules/lodash/isObject.js": function(e, t) {
        function n(e) {
            var t = typeof e;
            return e != null && (t == "object" || t == "function")
        }
        e.exports = n
    },
    "./node_modules/lodash/isObjectLike.js": function(e, t) {
        function n(e) {
            return e != null && typeof e == "object"
        }
        e.exports = n
    },
    "./node_modules/lodash/isSet.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseIsSet.js")
          , i = n("./node_modules/lodash/_baseUnary.js")
          , r = n("./node_modules/lodash/_nodeUtil.js");
        var s = r && r.isSet;
        var o = s ? i(s) : a;
        e.exports = o
    },
    "./node_modules/lodash/isSymbol.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseGetTag.js")
          , i = n("./node_modules/lodash/isObjectLike.js");
        var r = "[object Symbol]";
        function s(e) {
            return typeof e == "symbol" || i(e) && a(e) == r
        }
        e.exports = s
    },
    "./node_modules/lodash/isTypedArray.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_baseIsTypedArray.js")
          , i = n("./node_modules/lodash/_baseUnary.js")
          , r = n("./node_modules/lodash/_nodeUtil.js");
        var s = r && r.isTypedArray;
        var o = s ? i(s) : a;
        e.exports = o
    },
    "./node_modules/lodash/keys.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_arrayLikeKeys.js")
          , i = n("./node_modules/lodash/_baseKeys.js")
          , r = n("./node_modules/lodash/isArrayLike.js");
        function s(e) {
            return r(e) ? a(e) : i(e)
        }
        e.exports = s
    },
    "./node_modules/lodash/keysIn.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_arrayLikeKeys.js")
          , i = n("./node_modules/lodash/_baseKeysIn.js")
          , r = n("./node_modules/lodash/isArrayLike.js");
        function s(e) {
            return r(e) ? a(e, true) : i(e)
        }
        e.exports = s
    },
    "./node_modules/lodash/now.js": function(e, t, n) {
        var a = n("./node_modules/lodash/_root.js");
        var i = function() {
            return a.Date.now()
        };
        e.exports = i
    },
    "./node_modules/lodash/stubArray.js": function(e, t) {
        function n() {
            return []
        }
        e.exports = n
    },
    "./node_modules/lodash/stubFalse.js": function(e, t) {
        function n() {
            return false
        }
        e.exports = n
    },
    "./node_modules/lodash/throttle.js": function(e, t, n) {
        var r = n("./node_modules/lodash/debounce.js")
          , s = n("./node_modules/lodash/isObject.js");
        var o = "Expected a function";
        function a(e, t, n) {
            var a = true
              , i = true;
            if (typeof e != "function") {
                throw new TypeError(o)
            }
            if (s(n)) {
                a = "leading"in n ? !!n.leading : a;
                i = "trailing"in n ? !!n.trailing : i
            }
            return r(e, t, {
                leading: a,
                maxWait: t,
                trailing: i
            })
        }
        e.exports = a
    },
    "./node_modules/lodash/toNumber.js": function(e, t, n) {
        var a = n("./node_modules/lodash/isObject.js")
          , i = n("./node_modules/lodash/isSymbol.js");
        var r = 0 / 0;
        var s = /^\s+|\s+$/g;
        var o = /^[-+]0x[0-9a-f]+$/i;
        var l = /^0b[01]+$/i;
        var u = /^0o[0-7]+$/i;
        var d = parseInt;
        function f(e) {
            if (typeof e == "number") {
                return e
            }
            if (i(e)) {
                return r
            }
            if (a(e)) {
                var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                e = a(t) ? t + "" : t
            }
            if (typeof e != "string") {
                return e === 0 ? e : +e
            }
            e = e.replace(s, "");
            var n = l.test(e);
            return n || u.test(e) ? d(e.slice(2), n ? 2 : 8) : o.test(e) ? r : +e
        }
        e.exports = f
    },
    "./node_modules/process/browser.js": function(e, t) {
        var n = e.exports = {};
        var a;
        var i;
        function r() {
            throw new Error("setTimeout has not been defined")
        }
        function s() {
            throw new Error("clearTimeout has not been defined")
        }
        (function() {
            try {
                if (typeof setTimeout === "function") {
                    a = setTimeout
                } else {
                    a = r
                }
            } catch (e) {
                a = r
            }
            try {
                if (typeof clearTimeout === "function") {
                    i = clearTimeout
                } else {
                    i = s
                }
            } catch (e) {
                i = s
            }
        }
        )();
        function o(e) {
            if (a === setTimeout) {
                return setTimeout(e, 0)
            }
            if ((a === r || !a) && setTimeout) {
                a = setTimeout;
                return setTimeout(e, 0)
            }
            try {
                return a(e, 0)
            } catch (t) {
                try {
                    return a.call(null, e, 0)
                } catch (t) {
                    return a.call(this, e, 0)
                }
            }
        }
        function l(e) {
            if (i === clearTimeout) {
                return clearTimeout(e)
            }
            if ((i === s || !i) && clearTimeout) {
                i = clearTimeout;
                return clearTimeout(e)
            }
            try {
                return i(e)
            } catch (t) {
                try {
                    return i.call(null, e)
                } catch (t) {
                    return i.call(this, e)
                }
            }
        }
        var u = [];
        var d = false;
        var f;
        var c = -1;
        function h() {
            if (!d || !f) {
                return
            }
            d = false;
            if (f.length) {
                u = f.concat(u)
            } else {
                c = -1
            }
            if (u.length) {
                p()
            }
        }
        function p() {
            if (d) {
                return
            }
            var e = o(h);
            d = true;
            var t = u.length;
            while (t) {
                f = u;
                u = [];
                while (++c < t) {
                    if (f) {
                        f[c].run()
                    }
                }
                c = -1;
                t = u.length
            }
            f = null;
            d = false;
            l(e)
        }
        n.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var n = 1; n < arguments.length; n++) {
                    t[n - 1] = arguments[n]
                }
            }
            u.push(new m(e,t));
            if (u.length === 1 && !d) {
                o(p)
            }
        }
        ;
        function m(e, t) {
            this.fun = e;
            this.array = t
        }
        m.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ;
        n.title = "browser";
        n.browser = true;
        n.env = {};
        n.argv = [];
        n.version = "";
        n.versions = {};
        function v() {}
        n.on = v;
        n.addListener = v;
        n.once = v;
        n.off = v;
        n.removeListener = v;
        n.removeAllListeners = v;
        n.emit = v;
        n.prependListener = v;
        n.prependOnceListener = v;
        n.listeners = function(e) {
            return []
        }
        ;
        n.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ;
        n.cwd = function() {
            return "/"
        }
        ;
        n.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ;
        n.umask = function() {
            return 0
        }
    },
    "./node_modules/webpack/buildin/global.js": function(e, t) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (1,
            eval)("this")
        } catch (a) {
            if (typeof window === "object")
                n = window
        }
        e.exports = n
    },
    "./node_modules/webpack/buildin/module.js": function(e, t) {
        e.exports = function(e) {
            if (!e.webpackPolyfill) {
                e.deprecate = function() {}
                ;
                e.paths = [];
                if (!e.children)
                    e.children = [];
                Object.defineProperty(e, "loaded", {
                    enumerable: true,
                    get: function() {
                        return e.l
                    }
                });
                Object.defineProperty(e, "id", {
                    enumerable: true,
                    get: function() {
                        return e.i
                    }
                });
                e.webpackPolyfill = 1
            }
            return e
        }
    }
});

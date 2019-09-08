var gdomain = "http://hqdigi2.eastmoney.com/EM_Quote2010NumericApplication/";
var PicK = "http://hqpick.eastmoney.com/k/";
var PicN = "//webquotepic.eastmoney.com/GetPic.aspx?id={0}{1}&imageType={2}&token=44c9d251add88e27b65ed86506f6e5da";
var token = "4f1862fc3b5e77c150a2b985b12db0fd";
var $x = function(id) {
    return "string" == typeof id ? document.getElementById(id) : id
};
function inArray(el, array) {
    for (var i = 0, n = array.length; i < n; i++) {
        if (array[i] === el) {
            return true
        }
    }
    return false
}
function unique(array) {
    var i = 0
      , n = array.length
      , ret = [];
    for (; i < n; i++) {
        if (!inArray(array[i], ret)) {
            ret.push(array[i])
        }
    }
    return ret
}
function ForDight(Dight, How) {
    rDight = parseFloat(Dight).toFixed(How);
    if (rDight == "NaN") {
        rDight = "--"
    }
    return rDight
}
function GetFullWeekTime(time) {
    var dt = new Date(Date.parse(time.replace(/-/g, "/")));
    var day = dt.getDay();
    var arr_week = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
    var week = arr_week[day];
    return time.replace(" ", " " + week + " ")
}
function prefresh() {
    window.location.reload()
}
function blinker(num, dom) {
    if (num > 0) {
        dom.addClass("blinkred");
        setTimeout(function() {
            dom.removeClass("blinkred")
        }, 500)
    } else {
        if (num < 0) {
            dom.addClass("blinkgreen");
            setTimeout(function() {
                dom.removeClass("blinkgreen")
            }, 500)
        } else {
            dom.addClass("blinkblue");
            setTimeout(function() {
                dom.removeClass("blinkblue")
            }, 500)
        }
    }
}
function udt(vs) {
    if (vs > 0) {
        return "↑"
    } else {
        if (vs < 0) {
            return "↓"
        } else {
            return ""
        }
    }
}
function udcls(vsa, vsb) {
    if (arguments.length == 1) {
        if (vsa > 0) {
            return "red"
        } else {
            if (vsa < 0) {
                return "green"
            } else {
                return ""
            }
        }
    } else {
        if (vsa - vsb > 0) {
            return "red"
        } else {
            if (vsa - vsb < 0) {
                return "green"
            } else {
                return ""
            }
        }
    }
}
function udc(vsa, vsb) {
    vsa = vsa.replace("%", "");
    if (vsb == "" || vsb == null || vsb == "undefined") {
        if (vsa > 0) {
            return "#f00"
        } else {
            if (vsa < 0) {
                return "#090"
            } else {
                return ""
            }
        }
    } else {
        vsb = vsb.replace("%", "");
        if (vsa - vsb > 0) {
            return "#f00"
        } else {
            if (vsa - vsb < 0) {
                return "#090"
            } else {
                return ""
            }
        }
    }
}
function addPercent(vs) {
    var num = parseFloat(vs), item;
    if (num == 0) {
        item = num.toFixed(2) + "%"
    } else {
        if (num) {
            var abs = Math.abs(num);
            if (abs >= 1000) {
                item = (num / 1000).toFixed(2) + "倍"
            } else {
                item = num.toFixed(2) + "%"
            }
        } else {
            item = vs
        }
    }
    return item
}
function bigPriceFun(vs) {
    var num = parseFloat(vs), item;
    if (num >= 0) {
        if (num >= 10000) {
            item = (num / 10000).toFixed(2) + "万"
        } else {
            item = num.toFixed(2)
        }
    } else {
        item = vs
    }
    return item
}
function udcolor(vsa, vsb) {
    vsa = vsa.replace("%", "");
    if (vsb == "" || vsb == null || vsb == "undefined") {
        if (vsa > 0) {
            return "color:#f00"
        } else {
            if (vsa < 0) {
                return "color:#090"
            } else {
                return ""
            }
        }
    } else {
        vsb = vsb.replace("%", "");
        if (vsa - vsb > 0) {
            return "color:#f00"
        } else {
            if (vsa - vsb < 0) {
                return "color:#090"
            } else {
                return ""
            }
        }
    }
}
function zdp(Pnum) {
    if (Pnum > 0) {
        return 1
    } else {
        if (Pnum < 0) {
            return -1
        } else {
            return 0
        }
    }
}
function fvc(vs) {
    if (vs == 0 || vs == "") {
        return ""
    } else {
        if (vs > 0) {
            return "+" + vs
        } else {
            return vs
        }
    }
}
function ForDight(Dight, How) {
    rDight = parseFloat(Dight).toFixed(How);
    if (rDight == "NaN") {
        rDight = "--"
    }
    return rDight
}
function ForWc(Di) {
    var chu = 1;
    var res = Di;
    if (Di > 0 && Di.length >= 6) {
        chu = 6
    }
    if (Di < 0 && Di.length >= 7) {
        chu = 6
    }
    if (chu == 6) {
        res = ForDight((Di / 10000), 2) + "万"
    }
    return res
}
function getmarket(cd) {
    var j = cd.substring(0, 3);
    var i = j.substring(0, 1);
    if (i == "5" || i == "6" || i == "9") {
        return "1"
    } else {
        if (j == "009" || j == "126" || j == "110") {
            return "1"
        } else {
            return "2"
        }
    }
}
function WriteCookie(name, value, hours) {
    var expire = "";
    if (hours != null) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString() + ";path=/;domain=.eastmoney.com"
    }
    document.cookie = name + "=" + escape(value) + expire
}
function GetCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) {
            return null
        }
    } else {
        begin += 2
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length
    }
    return decodeURI(dc.substring(begin + prefix.length, end))
}
function Getcks(key) {
    var result = document.cookie.match(new RegExp(key + "=([^;]*)"));
    return result != null ? unescape(decodeURI(result[1])) : null
}
function picklc() {
    KBd.Change("-")
}
function picksd() {
    KBd.Change("+")
}
function cutstr(str, len, ellipsis) {
    if (typeof ellipsis != "string") {
        ellipsis = "..."
    }
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    if (str) {
        for (var i = 0; i < str.length; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                str_length++
            }
            if (str_length <= len) {
                str_len++
            }
        }
        if (str_length <= len) {
            return str.toString()
        } else {
            return str.substr(0, str_len).concat(ellipsis)
        }
    }
}
(function() {
    var ggrlN = 0;
    var yestoday = 0;
    var Hyestoday = 0;
    var UKyestoday = 0;
    var zzyestoday = 0;
    function QaDefault(Code, Market, Market_10, Name, HyId, RType, RCode, RMarket, tz, isag, lstng, cektp, ssrq, isxg, tfpxx) {
        _this = this;
        _this._Code = Code;
        _this._Market = Market;
        _this._Market_10 = Market_10;
        _this._Name = Name;
        _this._HyId = HyId;
        _this._RType = RType;
        _this._RCode = RCode;
        _this._RMarket = RMarket;
        _this.IsNotify = tz;
        _this.IsAGu = isag;
        _this.Lstng = lstng;
        _this.CekTp = cektp;
        _this.Ssrq = ssrq;
        _this.IsXg = isxg;
        _this.tfpxx = tfpxx;
        _this.$ = function(id) {
            return "string" == typeof id ? document.getElementById(id) : id
        }
        ;
        _this.sansuoNum = 0;
        _this.cbian = true;
        _this.sansuo;
        _this.tempStatus = {};
        _this.ColorStatus = {};
        _this.hongdise = function() {
            var span = [_this.$("price9"), _this.$("km1"), _this.$("km2")];
            for (i = 0; i < 3; i++) {
                _this.ColorStatus[i] = (_this.ColorStatus[i]) ? false : true;
                if (_this.cbian && span[i]) {
                    if (!_this.ColorStatus[i]) {
                        _this.tempStatus[i] = span[i].style.color;
                        span[i].style.color = "#000000"
                    } else {
                        span[i].style.color = _this.tempStatus[i]
                    }
                }
            }
            _this.sansuoNum++;
            if (_this.sansuoNum > 6 && _this.$("km1")) {
                clearInterval(_this.sansuo);
                _this.sansuoNum = 0;
                _this.tempStatus = {};
                _this.ColorStatus = {};
                _this.cbian = false;
                _this.$("price9").style.color = "";
                _this.$("km1").style.color = "";
                _this.$("km2").style.color = ""
            }
        }
    }
    QaDefault.prototype = {
        code: "-",
        market: "-",
        init: function() {
            window.quoteIsFirst = true;
            window.quoteRefresh = 24000;
            window.zxgIsFirst = true;
            window.zxgRefresh = 30000;
            window.zxgDisNum = 9;
            window.favorsetInterval = 0;
            window.GetTimeZoneInfo = false;
            window.phIsFirst = true;
            _this.bindPageEvent();
            _this.code = _this._Code;
            _this.market = _this._Market;
            tixing("addTX2", _this._Market, _this._Code);
            _this.YBCutstr();
            _this.Gethis();
            var timer_history = null;
            $("#tab6 li").mouseover(function() {
                if ($(this).find("h3").html() == "最近访问") {
                    if ($("#history-items tbody tr td").length < 2) {
                        _this.Gethis(true);
                        timer_history = setInterval(function() {
                            _this.Gethis(true)
                        }, 60 * 1000)
                    }
                } else {
                    if (timer_history) {
                        clearInterval(timer_history);
                        $("#history-items tbody").html("")
                    }
                }
            });
            setInterval(function() {
                _this.Gethis()
            }, 30 * 1000);
            getUserZW(function(zw) {
                _this.GetFavorList()
            });
            setInterval(function() {
                getUserZW(function(zw) {
                    _this.GetFavorList()
                })
            }, 60 * 1000);
            if (_this.getQueryStringByName("from") == "BaiduAladdin") {
                $("#tbggiframe").hide();
                $("#ifhqheadad").hide();
                $.ajax({
                    url: "//emres.dfcfw.com/public/js/aldtg.js",
                    method: "GET",
                    scriptCharset: "UTF-8",
                    dataType: "script"
                })
            } else {
                $.ajax({
                    url: "http://emres.dfcfw.com/public/js/left.js",
                    method: "GET",
                    scriptCharset: "UTF-8",
                    dataType: "script"
                });
                $.ajax({
                    url: "http://hqres.eastmoney.com/emag14/js/em_news_fixed_right.js",
                    method: "GET",
                    scriptCharset: "UTF-8",
                    dataType: "script"
                })
            }
            _this.ZJLBind();
            _this.exNameFun();
            _this.GetJGMJ()
        },
        stop: function() {
            clearInterval(this.quoteId)
        },
        IconBind: function() {
            var _this = this;
            var url = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&js=((x))&cmd=" + _this.code + _this.market + "&sty=MCSS&st=z&token=de1161e2380d231908d46298ae339369";
            $.ajax({
                url: url,
                dataType: "jsonp",
                jsonp: "cb",
                success: function(json) {
                    if (!json || json.stats === false) {
                        $("#hgt_icon").hide();
                        $("#sgt_icon").hide();
                        $("#cdr_icon").hide();
                        $("#rongi").hide();
                        $("#HB-box").hide()
                    } else {
                        var itemlist = json.split(",");
                        $("#hgt_icon").hide();
                        $("#sgt_icon").hide();
                        var hgt = itemlist[4];
                        var rongzi = itemlist[5]
                          , crd = itemlist[9]
                          , BId = itemlist[6]
                          , HId = itemlist[7]
                          , BondId = itemlist[8];
                        if (hgt == "沪股通") {
                            $("#hgt_icon").show()
                        } else {
                            if (hgt == "深股通") {
                                $("#sgt_icon").show()
                            }
                        }
                        if (rongzi == "True") {
                            $("#rongi").show()
                        } else {
                            $("#rongi").hide()
                        }
                        var $Z_box = $("#Z-box");
                        var $H_box = $("#H-box");
                        var $B_box = $("#B-box");
                        $Hb_box.hide();
                        if (!isNaN(BId)) {
                            $B_box.show().find("b ").text("B股");
                            $B_box.attr("title", "点击查看关联B股行情");
                            $B_box.find("a").attr("href", "//quote.eastmoney.com/web/r/" + BId)
                        }
                        if (!isNaN(HId)) {
                            $H_box.show().find("b").text("H股");
                            $H_box.attr("title", "点击查看关联H股行情");
                            $H_box.find("a").attr("href", " //quote.eastmoney.com/web/r/" + HId)
                        }
                        if (!isNaN(BondId)) {
                            $Z_box.show().find("b").text("可转债");
                            $Z_box.attr("title", "点击查看关联可转债行情");
                            $Z_box.find("a").attr("href", "//quote.eastmoney.com/web/r/" + BondId)
                        }
                        if (crd == 1) {
                            $("#cdr_icon").show();
                            $("#relation-container").hide();
                            var $container = $("#quote-digest").css({
                                "border-right": "none",
                                "margin-right": 0
                            });
                            $container.find("table").css("width", 800);
                            var $tr = $container.find("table tr");
                            $tr.each(function(idx, ele) {
                                if (idx === 0) {
                                    $(ele).append("<td>是否盈利：</td><td class='txtl'>" + (itemlist[11] == 0 ? "亏损" : "盈利") + "</td>")
                                } else {
                                    $(ele).append("<td>投票权：</td><td class='txtl'>" + (itemlist[10] == 0 ? "无投票权" : "有投票权") + "</td>")
                                }
                            })
                        } else {
                            $("#cdr_icon").hide()
                        }
                    }
                }
            })
        },
        JYSfun: function() {
            var _this = this;
            var url = "http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&js=((x))&cmd=" + _this.code + _this.market + "&sty=GBIDLTA&st=z&token=de1161e2380d231908d46298ae339369";
            $.ajax({
                url: url,
                dataType: "jsonp",
                jsonp: "cb",
                success: function(json) {
                    if (!json || json.stats === false) {
                        $("#jys-box").hide()
                    } else {
                        var jys = json.split(",")[5]
                          , $Jys = $("#jys-box");
                        if (jys == 2) {
                            $Jys.show().find("b ").text("沪主板");
                            $Jys.attr("title", "该股票在沪主板上市");
                            $Jys.find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#sh_a_board")
                        } else {
                            if (jys == 6) {
                                $Jys.show().find("b ").text("深主板");
                                $Jys.attr("title", "该股票在深主板上市");
                                $Jys.find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#sz_a_board")
                            } else {
                                if (jys == 13) {
                                    $Jys.show().find("b ").text("中小板");
                                    $Jys.attr("title", "该股票在中小板上市");
                                    $Jys.find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#sme_board")
                                } else {
                                    if (jys == 80) {
                                        $Jys.show().find("b ").text("创业板");
                                        $Jys.attr("title", "该股票在创业板上市");
                                        $Jys.find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#gem_board")
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        holidayFun: function() {
            var _this = this;
            var toDay = "";
            $.ajax({
                url: "http://quotationtest.eastmoney.com/api/clock/time/china?fmt=yyyy-MM-dd",
                dataType: "jsonp",
                jsonp: "cb",
                success: function(json) {
                    if (json) {
                        toDay = json.data["Time"];
                        $.ajax({
                            url: "http://api.dataide.eastmoney.com/data/get_xsrq?mktcode=069001001",
                            data: {
                                date: toDay
                            },
                            dataType: "jsonp",
                            jsonp: "jsonp_callback",
                            success: function(json) {
                                if (json) {
                                    var data = json.data;
                                    if (data.length > 0) {
                                        var time = _this.formateDate(new Date(data[0].scal), "yyyy年MM月dd日")
                                          , holiday = data[0].holiday;
                                        $("#close-tips").show();
                                        $("#day").hide();
                                        $("#close-tips .close-tips-msg").text(time + "因" + holiday + "休市")
                                    } else {
                                        $("#close-tips").hide();
                                        $("#day").show()
                                    }
                                }
                            }
                        })
                    }
                }
            })
        },
        exNameFun: function() {
            var _this = this;
            $.ajax({
                url: "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=ABLS_MB&token=70f12f2f4f091e459a279469fe49eca5&filter=(scode=%27" + _this._Code + "%27)&st=rn",
                dataType: "jsonp",
                scriptCharset: "utf-8",
                accept: "json",
                success: function(json) {
                    if (json.length > 1) {
                        $("#stock_change_name").show();
                        $("#stock_change_name .rongi").css("display", "block");
                        var html = "<span class=usedName>" + json[0].sname + "</span> &gt;&gt;&gt;";
                        for (var i = 1; i < json.length - 1; i++) {
                            html += '<span class="usedName">' + json[i].sname + '<span class="hasDate">(' + json[i].changedate.substring(0, 9).replace(/\//g, "-") + ")</span></span>&gt;&gt;&gt;"
                        }
                        html += '<span class="usedName">' + json[json.length - 1].sname + '<span class="hasDate">(' + json[json.length - 1].changedate.substring(0, 9).replace(/\//g, "-") + ")</span></span>";
                        $("#stock_change_name .shorthandInfo").html(html)
                    }
                }
            })
        },
        GetJGMJ: function() {
            var models = [];
            var $html = "";
            var items = []
              , item_jg = []
              , item_mj = [];
            $.ajax({
                url: "http://cmsdataapi.eastmoney.com/api/organization/GetOrganizationArticleByIds?channelIds=9&pageIndex=1&pageSize=5",
                dataType: "jsonp",
                jsonp: "cb",
                success: function(json) {
                    if (!json || !json.Result) {
                        return
                    }
                    if (json.Result.length > 0) {
                        item_jg = json.Result
                    }
                    $.ajax({
                        url: "http://cmsdataapi.eastmoney.com/api/author/GetAuthorArticleByIds?channelIds=9&pageIndex=1&pageSize=11",
                        dataType: "jsonp",
                        jsonp: "cb",
                        success: function(data) {
                            if (!data || !data.Result) {
                                return
                            }
                            if (data.Result.length > 0) {
                                item_mj = data.Result
                            }
                            items = item_jg.concat(item_mj);
                            function distinct(arr) {
                                var result = []
                                  , obj = {};
                                for (var i = 0; i < arr.length; i++) {
                                    if (!obj[arr[i].Art_Code]) {
                                        result.push(arr[i]);
                                        obj[arr[i].Art_Code] = true
                                    }
                                }
                                return result
                            }
                            items = distinct(items);
                            for (var i = 0; i < 11; i++) {
                                $html += '<tr><td><a target = "_blank" href = "' + items[i].Art_Url + '" class="jgmj-con" ' + 'title = "' + items[i].Art_Title + '" > ' + cutstr(items[i].Art_Title, 54) + "</a ></td > </tr>"
                            }
                            $("#jgmj-list").html($html)
                        }
                    })
                }
            })
        },
        ZJLBind: function() {},
        getQueryStringByName: function(name) {
            var result = location.search.match(new RegExp("[?&]" + name + "=([^&]+)","i"));
            if (result == null || result.length < 1) {
                return ""
            }
            return result[1]
        },
        bindPageEvent: function() {
            phrankS();
            setInterval(function() {
                phrankS()
            }, 30000);
            _this.DisQuote();
            _this.DisQuote_sse();
            this.GetFbFj(_this._Code + "" + _this._Market);
            this.tradeId = setInterval(function() {
                _this.GetFbFj(_this._Code + "" + _this._Market)
            }, window.quoteRefresh);
            if (_this.Lstng == "1") {
                this.quoteId = setInterval(function() {
                    _this.DisQuote();
                    _this.GetAllPKYD()
                }, window.quoteRefresh);
                _this.GetTimeZone(_this._Code + "" + _this._Market);
                setInterval(function() {
                    _this.GetTimeZone(_this._Code + "" + _this._Market)
                }, 60000)
            } else {
                var lststr = "";
                switch (_this.Lstng) {
                case "0":
                    lststr = "未上市";
                    break;
                case "2":
                    lststr = "已退市";
                    break;
                case "3":
                    lststr = "暂停上市";
                    break;
                case "4":
                    lststr = "终止上市";
                    break
                }
                _this.$("price9").innerHTML = '<span class="lstng">' + lststr + "</span>";
                _this.$("km1").innerHTML = "";
                _this.$("km1").className = "xp3";
                _this.$("km2").innerHTML = "";
                _this.$("km2").className = "xp4"
            }
            _this.$("RefPR").onclick = function() {
                prefresh()
            }
            ;
            _this.$("hq_cr_close").onclick = function() {
                _this.$("hq_cr_tips").style.display = "none";
                WriteCookie("emhq_cr", "1", 12)
            }
            ;
            _this.$("hq_cr_b").onmouseover = function() {
                _this.$("hq_cr_tips").style.display = "block"
            }
            ;
            _this.$("hq_cr_b").onmouseout = function() {
                _this.$("hq_cr_tips").style.display = "none"
            }
            ;
            this.GetPKYD(_this._Code, _this._Market);
            this.GetAllPKYD();
            this.positionId = setInterval(function() {
                _this.GetAllPKYD();
                _this.GetPKYD()
            }, window.quoteRefresh);
            this.quartile();
            _this.$("refgbauls").onclick = function() {
                var dl = _this.$("gbauls").getElementsByTagName("dl");
                var sedl = GetRandomNum(0, dl.length - 1);
                for (var i = 0; i < dl.length; i++) {
                    if (i == sedl) {
                        if (dl[i].hasChildNodes()) {
                            var dd = dl[i].childNodes;
                            for (var j = 0; j < dd.length; j++) {
                                if (dd[j].hasChildNodes()) {
                                    var ddimg = dd[j].childNodes[0].getElementsByTagName("img")[0];
                                    if (ddimg && !ddimg.getAttribute("src")) {
                                        ddimg.setAttribute("src", ddimg.getAttribute("data-value"))
                                    }
                                }
                            }
                        }
                        dl[i].style.display = ""
                    } else {
                        dl[i].style.display = "none"
                    }
                }
            }
            ;
            $("#profit_img").hide();
            $("#profit_js").show();
            $("#stockcanlendar").vTicker({
                showItems: 1,
                height: 26
            });
            _this.bindBkList();
            setInterval(_this.bindBkList, 30 * 1000);
            _this.testMethod();
            setInterval(_this.testMethod, 20 * 1000)
        },
        bindBkList: function() {
            var url = "http://push2.eastmoney.com/api/qt/slist/get?ut=fa5fd1943c7b386f172d6893dbfba10b&spt=3&pi=0&pz=5&po=1&fields=f14,f3,f128,f12,f13,f100,f102,f103&secid=" + _this._Market_10 + "." + _this._Code;
            jQuery.ajax({
                url: url,
                dataType: "jsonp",
                scriptCharset: "utf-8",
                jsonp: "cb",
                success: function(json) {
                    var html = "";
                    var count = json.data.total >= 5 ? 5 : json.data.total;
                    var item = [];
                    if (!(json.data)) {
                        return
                    }
                    for (var i = 0; i < count; i++) {
                        item = json.data.diff[i];
                        if (!item) {
                            return
                        }
                        var color = item.f3 >= 0 ? "red" : "green";
                        var market = item.f141 + ".";
                        if (item.f140) {
                            html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/center/boardlist.html#boards-' + item.f12 + '1" target="_blank" title="' + item.f14 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f3 / 100).toFixed(2) + "%" + '</td><td><a href="http://quote.eastmoney.com/unify/r/' + item.f141 + "." + item.f140 + '" target="_blank" title="' + item.f128 + '">' + cutstr(item.f128, 8) + "</a></td></tr>"
                        } else {
                            html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/center/boardlist.html#boards-' + item.f12 + '1" target="_blank" title="' + item.f14 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f3 / 100).toFixed(2) + "%" + "</td><td><a>" + "-  " + "</a></td></tr>"
                        }
                    }
                    $("#zjlxbk").html(html)
                }
            })
        },
        testMethod: function() {},
        Bian: function(dt) {
            var res = false;
            var hs = dt.getHours();
            var ms = dt.getMinutes();
            if (hs >= 9 && hs <= 11) {
                res = true;
                if ((hs == 11) && ms >= 30) {
                    res = false
                }
            }
            if (hs >= 13 && hs < 15) {
                res = true
            }
            return res
        },
        PanQian: function(dt) {
            var res = false;
            var hs = dt.getHours();
            var ms = dt.getMinutes();
            if (hs == 9) {
                if ((ms >= 14) && ms < 29) {
                    res = true
                }
            }
            return res
        },
        setPicrTab: function(iftm) {
            var izpz = _this.Bian(iftm);
            if (izpz) {
                var res = _this.PanQian(iftm);
                if (res) {
                    if (_this.$("image_box").style.display != "none") {
                        _this.UpPic(false, true)
                    } else {
                        setTimeout(function() {
                            flyqd(8)
                        }, 5000)
                    }
                } else {
                    if (_this.$("image_box").style.display != "none") {
                        _this.UpPic(false, false)
                    } else {
                        setTimeout(function() {
                            flyqd(0)
                        }, 5000)
                    }
                }
            }
        },
        GetTimeZone: function(id) {
            var ua = navigator.userAgent.toLowerCase();
            window.GetTimeZoneInfo = true
        },
        NotifyPage: function(num) {
            window.Notifyed = true;
            window.NotifyS = setInterval("prefresh()", num)
        },
        GetFavorList: function() {
            var iscks = true;
            var url_status = "mystock_web";
            if (GetCookie("uidal") && GetCookie("ut") && GetCookie("ct")) {
                url_status = "mystock_web";
                var _url = "http://myfavor1.eastmoney.com/" + url_status + "?f=gsaandcheck&sc=" + _this._Market_10 + "." + _this._Code;
                $.ajax({
                    url: _url,
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function(json) {
                        var allstocklist = "";
                        if (json.result == "1") {
                            var sl = json.data.list.split(",");
                            var check = json.data.check;
                            _this.FavorIsAdd(check, url_status);
                            _this.FavorDis(sl)
                        }
                    }
                })
            } else {
                iscks = false
            }
            if (!iscks) {
                url_status = "mystock_webanonym";
                var _url = "http://myfavor1.eastmoney.com/" + url_status + "?f=gsaandcheck&sc=" + _this._Market_10 + "." + _this._Code;
                $.ajax({
                    url: _url,
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function(json) {
                        if (json.result == "1") {
                            var sl = json.data.list.split(",");
                            var check = json.data.check;
                            _this.FavorIsAdd(check, url_status);
                            _this.FavorDis(sl)
                        }
                    }
                })
            }
            _this.$("addZX1").onclick = function() {
                _this.FavorEvent()
            }
            ;
            _this.$("addZX2").onclick = function() {
                _this.FavorEvent()
            }
        },
        FavorIsAdd: function(check) {
            if (check == "True") {
                $("#addZX1_a").html("-删自选");
                $("#addZX2_a").html("-删自选");
                $("#addZX1_a").removeAttr("href");
                $("#addZX2_a").removeAttr("href");
                $("#addZX1").css("background", "#999");
                $("#addZX2").css("background", "#999")
            } else {
                $("#addZX1_a").html("+加自选");
                $("#addZX2_a").html("+加自选");
                $("#addZX1").css("background", "#ff4a03");
                $("#addZX2").css("background", "#ff4a03");
                $("#addZX1_a").attr("href", "//quote.eastmoney.com/zixuan/?from=zixuanmini");
                $("#addZX2_a").attr("href", "//quote.eastmoney.com/zixuan/?from=zixuanmini")
            }
        },
        FavorEvent: function() {
            if (GetCookie("uidal") && GetCookie("ut") && GetCookie("ct")) {
                var url_status = "mystock_web"
            } else {
                var url_status = "mystock_webanonym"
            }
            var _html = $("#addZX1_a").html();
            if (_html == "+加自选") {
                var f = "asz";
                var check = "True"
            } else {
                var f = "dsz";
                var check = "False"
            }
            var _url = "http://myfavor1.eastmoney.com/" + url_status + "?f=" + f + "&sc=" + _this._Market_10 + "." + _this._Code;
            $.ajax({
                url: _url,
                dataType: "jsonp",
                jsonp: "cb",
                success: function(json) {
                    if (json.result == "1") {
                        _this.FavorIsAdd(check);
                        _this.GetFavorList()
                    }
                }
            })
        },
        FavorDis: function(arr) {
            var mathNum = Math.floor(Math.random() * 100);
            var _url = "http://push2.eastmoney.com/api/qt/ulist.np/get?fields=f2,f3,f14,f12,f13&invt=2&fltt=2&fid=f3&ut=bd1d9ddb04089700cf9c27f6f7426281";
            var _arr = [];
            var len = arr.length >= 10 ? 10 : arr.length;
            if (arr && arr.length > 0) {
                for (var i = 0; i < len; i++) {
                    if ($.trim(arr[i])) {
                        _arr.push(arr[i])
                    }
                }
            }
            if (_arr && _arr.length > 0) {
                $.ajax({
                    url: _url,
                    data: {
                        secids: _arr.join(",")
                    },
                    type: "get",
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function(json) {
                        if (json && json.data && json.data.diff) {
                            var obj = json.data.diff;
                            var arr = [];
                            for (var key = 0; key < obj.length; key++) {
                                if (obj[key]) {
                                    arr.push(obj[key])
                                }
                            }
                            if (arr.length > 6) {
                                var items = arr.splice(0, 6)
                            } else {
                                var items = arr
                            }
                            _this.RenderFovarList(items)
                        }
                    }
                })
            } else {
                $("#favorTable tbody ").html('<tr><td colspan = "3" style = "height: 192px; text-align: center;" class= "waiting " > 暂无您的自选股</td ></tr >')
            }
        },
        RenderFovarList: function(arr) {
            var items = arr
              , models = []
              , $html = "";
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var model = {
                    name: item.f14,
                    code: item.f12,
                    price: bigPriceFun(item.f2),
                    changePercent: addPercent(item.f3),
                    color: udcls(item.f3),
                    link: "//quote.eastmoney.com/unify/r/" + item.f13 + "." + item.f12,
                    dataSrc: "//webquotepic.eastmoney.com/GetPic.aspx?nid=" + item.f13 + "." + item.f12 + "&imageType=RJY&token=44c9d251add88e27b65ed86506f6e5da"
                };
                var _tr = _this.ImgHtml(model);
                $html += _tr
            }
            $("#favorTable tbody").html($html)
        },
        ImgHtml: function(model) {
            var mathNum = Math.floor(Math.random() * 100);
            var Tr = "<tr>" + '<td><a title="' + model.name + '" href="' + model.link + '" target="_blank">' + cutstr(model.name, 8, "..") + "<br>" + model.code + "</a></td>" + '<td class="' + model.color + '">' + model.price + "<br>" + model.changePercent + "</td>" + '<td class="img-td"><a href="' + model.link + '" target="_blank" title="点击查看' + model.name + '分时图">' + ' <img   src="' + model.dataSrc + mathNum + '" data-src= "' + model.dataSrc + '"  >' + "</a ></td > " + "</tr > ";
            return Tr
        },
        Gethis: function(status) {
            var _hismarket = "1";
            if (_this._Market_10 == "1") {
                _hismarket = "sh"
            } else {
                _hismarket = "sz"
            }
            var arg = {
                def: "",
                set: "a-" + _hismarket + "-" + _this._Code + "-" + _this._Name,
                lns: 11
            };
            var HV = new HistoryViews("historyest",arg);
            if (status) {
                _this.HistoryList(HV)
            }
        },
        HistoryList: function(hv) {
            var hvArr = hv.ret ? hv.ret : null;
            var ids = [];
            var len = hvArr.length;
            for (var i = 0; i < len; i++) {
                var arr = hvArr[i].split("-");
                var code = ""
                  , market = "";
                if (arr[0] && arr[0] !== "undefined") {
                    if (arr[0] === "sh") {
                        market = "1"
                    } else {
                        if (arr[0] === "sz") {
                            market = "0"
                        } else {
                            market = arr[0]
                        }
                    }
                }
                if (arr[1]) {
                    code = arr[1]
                }
                ids.push(market + "." + code)
            }
            _this.RenderHistoryList(ids)
        },
        RenderHistoryList: function(ids) {
            if (ids && ids.length > 0) {
                var secid = ids.join(",")
            } else {
                var secid = ""
            }
            var _url = "//push2.eastmoney.com/api/qt/ulist.np/get?fields=f12,f13,f14,f2,f1,f3,f152&invt=2&";
            $.ajax({
                url: _url,
                data: {
                    secids: secid
                },
                dataType: "jsonp",
                jsonp: "cb",
                success: function(json) {
                    if (json.data.diff instanceof Array) {
                        var models = []
                          , historyHtml = "";
                        var len = json.data.diff.length > 6 ? 6 : json.length;
                        for (var i = 0; i < json.data.diff.length; i++) {
                            var items = json.data.diff[i];
                            var model;
                            model = {
                                id: items.f13 + "." + items.f12,
                                code: items.f12,
                                market: items.f13 === "1" ? "sh" : "sz",
                                name: items.f14,
                                changePercent: typeof (items.f3) == "number" ? addPercent(items.f3 * Math.pow(10, -items.f152).toFixed(items.f152)) : "-",
                                price: Number(items.f2) >= 0 ? (items.f2 * Math.pow(10, -items.f1)).toFixed(items.f1) : "-",
                                color: udcls(items.f3),
                                dataSrc: "//webquotepic.eastmoney.com/GetPic.aspx?nid=" + items.f13 + "." + items.f12 + "&imageType=RJY&token=44c9d251add88e27b65ed86506f6e5da"
                            };
                            var link = (items.f13 == "1" ? "1" : "0") + "." + model.code;
                            model.link = "//quote.eastmoney.com/unify/r/" + model.id;
                            if (i < 6) {
                                var _tr = _this.ImgHtml(model);
                                historyHtml += _tr
                            }
                        }
                        $("#history-items tbody").html(historyHtml)
                    }
                }
            })
        },
        GetFbFj: function(cd) {
            var _num = 10;
            _this.$("fblist").className = "line22";
            $.ajax({
                url: "http://push2.eastmoney.com/api/qt/stock/details/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1,f2,f3,f4&fields2=f51,f52,f53,f54,f55&pos=-11&secid=" + _this._Market_10 + "." + _this._Code,
                dataType: "jsonp",
                jsonp: "cb",
                beforeSend: function() {
                    $("#fblist").html('<td colspan="3" style="height: 249px; text-align: center;" class="waiting ">加载中...</td>')
                },
                success: function(json) {
                    if (!json || !(json.data.details.length)) {
                        var height = " 271px";
                        $("#fblist").html("<tr><td colspan=3 style='height: " + height + "px;text-align:center'>暂无数据</td></tr>");
                        $("#vvcc .more3").hide();
                        return
                    }
                    var pc = parseFloat(json.data.prePrice)
                      , $tbody = $("<tbody></tbody>");
                    var price = [];
                    for (var i = 0; i < json.data.details.length; i++) {
                        price.push(parseFloat(json.data.details[i].substring(9, 14)))
                    }
                    var pch = [];
                    for (var i = 0; i < price.length - 1; i++) {
                        pch[i] = price[i + 1] - price[i]
                    }
                    var data = [];
                    var singledata = [];
                    for (var i = 1; i < json.data.details.length; i++) {
                        singledata = JSON.stringify(json.data.details[i]);
                        data = singledata.split(",");
                        data[0] = data[0].substring(1);
                        data[4] = data[4].substring(0, 1);
                        var $tr = $("<tr></tr>")
                          , priceColor = data[4] != 4 ? data[1] - pc > 0 ? "red" : data[1] - pc < 0 ? "green" : "#333333" : ""
                          , dir = pch[i - 1] < 0 ? "↓" : pch[i - 1] > 0 ? "↑" : ""
                          , dir_c = pch[i - 1] < 0 ? "green" : pch[i - 1] > 0 ? "red" : ""
                          , vp = data[2] * data[1] * 100 * (data[4] == 1 ? -1 : data[4] == 2 ? 1 : 0)
                          , v_c = data[4] != 4 ? vp >= 200000 ? "#ff00ff" : vp > 0 ? "red" : vp <= -200000 ? "#14c3dc" : vp < 0 ? "green" : "" : "";
                        $("<td />").text(data[0]).appendTo($tr);
                        $("<td />").text(data[1]).css("color", priceColor).appendTo($tr);
                        $("<td class=jtTd />").append($("<span />").text(data[2]).css("color", v_c)).append($("<span class=jtIcon />").text(dir).css("color", dir_c)).appendTo($tr);
                        $tbody.append($tr)
                    }
                    $("#fblist").html($tbody.html())
                }
            })
        },
        GetFbFj_sse: function(cd) {
            var url = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/stock/details/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1,f2,f3,f4&fields2=f51,f52,f53,f54,f55&pos=-11&secid=" + _this._Market_10 + "." + _this._Code;
            var evtSource = new EventSource(url);
            evtSource.onmessage = function(json) {
                if (!json || !(json.data.details)) {
                    return
                }
                var pc = parseFloat(json.data.prePrice)
                  , $tbody = $("<tbody></tbody>");
                var price = [];
                for (var i = 0; i < json.data.details.length; i++) {
                    price.push(parseFloat(json.data.details[i].substring(9, 14)))
                }
                var pch = [];
                for (var i = 0; i < price.length - 1; i++) {
                    pch[i] = price[i + 1] - price[i]
                }
                var data = [];
                var singledata = [];
                for (var i = 1; i < json.data.details.length; i++) {
                    singledata = JSON.stringify(json.data.details[i]);
                    data = singledata.split(",");
                    data[0] = data[0].substring(1);
                    data[4] = data[4].substring(0, 1);
                    var $tr = $("<tr></tr>")
                      , priceColor = data[4] != 4 ? data[1] - pc > 0 ? "red" : data[1] - pc < 0 ? "green" : "#333333" : ""
                      , dir = pch[i - 1] < 0 ? "↓" : pch[i - 1] > 0 ? "↑" : ""
                      , dir_c = pch[i - 1] < 0 ? "green" : pch[i - 1] > 0 ? "red" : ""
                      , vp = data[2] * data[1] * 100 * (data[4] == 1 ? -1 : data[4] == 2 ? 1 : 0)
                      , v_c = data[4] != 4 ? vp >= 200000 ? "#ff00ff" : vp > 0 ? "red" : vp <= -200000 ? "#14c3dc" : vp < 0 ? "green" : "" : "";
                    $("<td />").text(data[0]).appendTo($tr);
                    $("<td />").text(data[1]).css("color", priceColor).appendTo($tr);
                    $("<td />").append($("<span />").text(data[2]).css("color", v_c)).append($("<span />").text(dir).css("color", dir_c)).appendTo($tr);
                    $tbody.append($tr)
                }
                $("#fblist").html($tbody.html())
            }
        },
        GetPKYD: function(code, market) {
            $.ajax({
                url: "http://push2.eastmoney.com/api/qt/pkyd/get?ut=fa5fd1943c7b386f172d6893dbfba10b&lmt=5&fields=f1,f2,f3,f4,f5,f6,f7&secids=" + _this._Market_10 + "." + _this._Code,
                dataType: "jsonp",
                scriptCharset: "utf-8",
                jsonp: "cb",
                success: function(msg) {
                    var json = msg.data;
                    var trs = [];
                    var length = json.pkyd.length >= 5 ? 5 : json.pkyd.length;
                    if (json.pkyd instanceof Array) {
                        for (var i = 0; i < length; i++) {
                            var items = json.pkyd[i].split(",");
                            var color = "";
                            var ydtype = "";
                            if (items[4] == 1) {
                                ydtype = "有大买盘";
                                color = "red"
                            }
                            if (items[4] == 2) {
                                ydtype = "大笔买入";
                                color = "red"
                            }
                            if (items[4] == 101) {
                                ydtype = "有大卖盘";
                                color = "green"
                            }
                            if (items[4] == 102) {
                                ydtype = "大笔卖出";
                                color = "green"
                            }
                            if (items[4] == 201) {
                                ydtype = "封涨停板";
                                color = "red"
                            }
                            if (items[4] == 202) {
                                ydtype = "打开涨停";
                                color = "green"
                            }
                            if (items[4] == 203) {
                                ydtype = "高开5日线";
                                color = "red"
                            }
                            if (items[4] == 204) {
                                ydtype = "60日新高";
                                color = "red"
                            }
                            if (items[4] == 301) {
                                ydtype = "封跌停板";
                                color = "green"
                            }
                            if (items[4] == 302) {
                                ydtype = "打开跌停";
                                color = "red"
                            }
                            if (items[4] == 303) {
                                ydtype = "低开5日线";
                                color = "green"
                            }
                            if (items[4] == 304) {
                                ydtype = "60日新低";
                                color = "green"
                            }
                            if (items[4] == 401) {
                                ydtype = "向上缺口";
                                color = "red"
                            }
                            if (items[4] == 402) {
                                ydtype = "火箭发射";
                                color = "red"
                            }
                            if (items[4] == 403) {
                                ydtype = "快速反弹";
                                color = "red"
                            }
                            if (items[4] == 404) {
                                ydtype = "竞价上涨";
                                color = "red"
                            }
                            if (items[4] == 405) {
                                ydtype = "大幅上涨";
                                color = "red"
                            }
                            if (items[4] == 501) {
                                ydtype = "向下缺口";
                                color = "green"
                            }
                            if (items[4] == 502) {
                                ydtype = "高台跳水";
                                color = "green"
                            }
                            if (items[4] == 503) {
                                ydtype = "快速下跌";
                                color = "green"
                            }
                            if (items[4] == 504) {
                                ydtype = "竞价下跌";
                                color = "green"
                            }
                            if (items[4] == 505) {
                                ydtype = "大幅下跌";
                                color = "green"
                            }
                            var $tr = $("<tr></tr>").append("<td>" + items[0] + "</td>").append("<td class=" + color + ">" + ydtype + "</td>").append("<td class=" + color + ">" + items[5] + "</td>");
                            trs.push($tr)
                        }
                    }
                    if (trs.length > 0) {
                        $("#pkydList tbody").html("").append(trs)
                    } else {
                        $("#pkydList").hide();
                        $("#plydUl").removeClass("tab1").find("li[value=2]").hide();
                        $(".changeList[value=1]").show()
                    }
                }
            })
        },
        GetPKYD_sse: function(code, market) {
            var url = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/pkyd/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&lmt=5&fields=f1,f4,f5&secids=" + _this._Market_10 + "." + _this._Code;
            var evtSource = new EventSource(url);
            evtSource.onmessage = function(msg) {
                var json = msg.data;
                var trs = [];
                var length = json.pkyd.length >= 5 ? 5 : json.pkyd.length;
                if (json.pkyd instanceof Array) {
                    for (var i = 0; i < length; i++) {
                        var items = json.pkyd[i].split(",");
                        var color = items[6] == 1 ? "red" : "green";
                        var ydtype = "";
                        if (items[4] == 1) {
                            ydtype = "有大买盘"
                        }
                        if (items[4] == 2) {
                            ydtype = "大笔买入"
                        }
                        if (items[4] == 101) {
                            ydtype = "有大卖盘"
                        }
                        if (items[4] == 102) {
                            ydtype = "大笔卖出"
                        }
                        if (items[4] == 201) {
                            ydtype = "封涨停板"
                        }
                        if (items[4] == 202) {
                            ydtype = "打开涨停"
                        }
                        if (items[4] == 203) {
                            ydtype = "高开5日线"
                        }
                        if (items[4] == 204) {
                            ydtype = "60日新高"
                        }
                        if (items[4] == 301) {
                            ydtype = "封跌停板"
                        }
                        if (items[4] == 302) {
                            ydtype = "打开跌停"
                        }
                        if (items[4] == 303) {
                            ydtype = "低开5日线"
                        }
                        if (items[4] == 304) {
                            ydtype = "60日新低"
                        }
                        if (items[4] == 401) {
                            ydtype = "向上缺口"
                        }
                        if (items[4] == 402) {
                            ydtype = "火箭发射"
                        }
                        if (items[4] == 403) {
                            ydtype = "快速反弹"
                        }
                        if (items[4] == 404) {
                            ydtype = "竞价上涨"
                        }
                        if (items[4] == 405) {
                            ydtype = "60日大幅上涨"
                        }
                        if (items[4] == 501) {
                            ydtype = "向下缺口"
                        }
                        if (items[4] == 502) {
                            ydtype = "高台跳水"
                        }
                        if (items[4] == 503) {
                            ydtype = "快速下跌"
                        }
                        if (items[4] == 504) {
                            ydtype = "竞价下跌"
                        }
                        if (items[4] == 505) {
                            ydtype = "60日大幅下跌"
                        }
                        var $tr = $("<tr></tr>").append("<td>" + items[0] + "</td>").append("<td><a target=_blank href=//quote.eastmoney.com/changes/stocks/" + items[1] + ".html>" + items[3] + "</a></td>").append("<td class=" + color + ">" + ydtype + "</td>");
                        trs.push($tr)
                    }
                }
                if (trs.length > 0) {
                    $("#allPkyd tbody").html("").append(trs)
                } else {
                    $("#pkydList").hide();
                    $("#plydUl").removeClass("tab1").find("li[value=2]").hide();
                    $(".changeList[value=1]").show()
                }
            }
        },
        GetAllPKYD_sse: function(code, market) {
            var url = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/pkyd/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&lmt=5&fields=f1,f4,f5&secid=" + _this._Market_10 + "." + _this._Code;
            var evtSource = new EventSource(url);
            evtSource.onmessage = function(msg) {
                var json = msg.data;
                var trs = [];
                var length = json.pkyd.length >= 5 ? 5 : json.pkyd.length;
                if (json.pkyd instanceof Array) {
                    for (var i = 0; i < length; i++) {
                        var items = json.pkyd[i].split(",");
                        var color = items[6] == 1 ? "red" : "green";
                        var ydtype = "";
                        if (items[4] == 1) {
                            ydtype = "有大买盘"
                        }
                        if (items[4] == 2) {
                            ydtype = "大笔买入"
                        }
                        if (items[4] == 101) {
                            ydtype = "有大卖盘"
                        }
                        if (items[4] == 102) {
                            ydtype = "大笔卖出"
                        }
                        if (items[4] == 201) {
                            ydtype = "封涨停板"
                        }
                        if (items[4] == 202) {
                            ydtype = "打开涨停"
                        }
                        if (items[4] == 203) {
                            ydtype = "高开5日线"
                        }
                        if (items[4] == 204) {
                            ydtype = "60日新高"
                        }
                        if (items[4] == 301) {
                            ydtype = "封跌停板"
                        }
                        if (items[4] == 302) {
                            ydtype = "打开跌停"
                        }
                        if (items[4] == 303) {
                            ydtype = "低开5日线"
                        }
                        if (items[4] == 304) {
                            ydtype = "60日新低"
                        }
                        if (items[4] == 401) {
                            ydtype = "向上缺口"
                        }
                        if (items[4] == 402) {
                            ydtype = "火箭发射"
                        }
                        if (items[4] == 403) {
                            ydtype = "快速反弹"
                        }
                        if (items[4] == 404) {
                            ydtype = "竞价上涨"
                        }
                        if (items[4] == 405) {
                            ydtype = "60日大幅上涨"
                        }
                        if (items[4] == 501) {
                            ydtype = "向下缺口"
                        }
                        if (items[4] == 502) {
                            ydtype = "高台跳水"
                        }
                        if (items[4] == 503) {
                            ydtype = "快速下跌"
                        }
                        if (items[4] == 504) {
                            ydtype = "竞价下跌"
                        }
                        if (items[4] == 505) {
                            ydtype = "60日大幅下跌"
                        }
                        var $tr = $("<tr></tr>").append("<td>" + items[0] + "</td>").append("<td><a target=_blank href=//quote.eastmoney.com/changes/stocks/" + items[1] + ".html>" + items[3] + "</a></td>").append("<td class=" + color + ">" + ydtype + "</td>");
                        trs.push($tr)
                    }
                }
                if (trs.length > 0) {
                    $("#allPkyd tbody").html("").append(trs)
                } else {
                    $("#pkydList").hide();
                    $("#plydUl").removeClass("tab1").find("li[value=2]").hide();
                    $(".changeList[value=1]").show()
                }
            }
        },
        GetAllPKYD: function() {
            $.ajax({
                url: "http://push2.eastmoney.com/api/qt/pkyd/get?ut=fa5fd1943c7b386f172d6893dbfba10b&lmt=5&fields=f1,f2,f3,f4,f5,f6,f7&secid=" + _this._Market_10 + "." + _this._Code,
                dataType: "jsonp",
                scriptCharset: "utf-8",
                jsonp: "cb",
                success: function(msg) {
                    var json = msg.data;
                    var trs = [];
                    var length = json.pkyd.length >= 5 ? 5 : json.pkyd.length;
                    if (json.pkyd instanceof Array) {
                        for (var i = 0; i < length; i++) {
                            var items = json.pkyd[i].split(",");
                            var color = items[6] == 1 ? "red" : "green";
                            var ydtype = "";
                            if (items[4] == 1) {
                                ydtype = "有大买盘"
                            }
                            if (items[4] == 2) {
                                ydtype = "大笔买入"
                            }
                            if (items[4] == 101) {
                                ydtype = "有大卖盘"
                            }
                            if (items[4] == 102) {
                                ydtype = "大笔卖出"
                            }
                            if (items[4] == 201) {
                                ydtype = "封涨停板"
                            }
                            if (items[4] == 202) {
                                ydtype = "打开涨停"
                            }
                            if (items[4] == 203) {
                                ydtype = "高开5日线"
                            }
                            if (items[4] == 204) {
                                ydtype = "60日新高"
                            }
                            if (items[4] == 301) {
                                ydtype = "封跌停板"
                            }
                            if (items[4] == 302) {
                                ydtype = "打开跌停"
                            }
                            if (items[4] == 303) {
                                ydtype = "低开5日线"
                            }
                            if (items[4] == 304) {
                                ydtype = "60日新低"
                            }
                            if (items[4] == 401) {
                                ydtype = "向上缺口"
                            }
                            if (items[4] == 402) {
                                ydtype = "火箭发射"
                            }
                            if (items[4] == 403) {
                                ydtype = "快速反弹"
                            }
                            if (items[4] == 404) {
                                ydtype = "竞价上涨"
                            }
                            if (items[4] == 405) {
                                ydtype = "大幅上涨"
                            }
                            if (items[4] == 501) {
                                ydtype = "向下缺口"
                            }
                            if (items[4] == 502) {
                                ydtype = "高台跳水"
                            }
                            if (items[4] == 503) {
                                ydtype = "快速下跌"
                            }
                            if (items[4] == 504) {
                                ydtype = "竞价下跌"
                            }
                            if (items[4] == 505) {
                                ydtype = "大幅下跌"
                            }
                            var market = items[2] == "1" ? "sh" : "sz";
                            var $tr = $("<tr></tr>").append("<td>" + items[0] + "</td>").append("<td><a target=_blank href=//quote.eastmoney.com/changes/stocks/" + market + items[1] + ".html>" + items[3] + "</a></td>").append("<td class=" + color + ">" + ydtype + "</td>");
                            trs.push($tr)
                        }
                    }
                    if (trs.length > 0) {
                        $("#allPkyd tbody").html("").append(trs)
                    } else {
                        $("#pkydList").hide();
                        $("#plydUl").removeClass("tab1").find("li[value=2]").hide();
                        $(".changeList[value=1]").show()
                    }
                }
            })
        },
        Setudclass: function(zd) {
            var hqcr = _this.$("arrowud").getAttribute("xid");
            if (zd > 0) {
                _this.$("arrowud").className = hqcr == "1" ? "cr red" : "red";
                _this.$("arrow-find").className = "xp2 up-arrow"
            } else {
                if (zd < 0) {
                    _this.$("arrowud").className = hqcr == "1" ? "cr green" : "green";
                    _this.$("arrow-find").className = "xp2 down-arrow"
                } else {
                    _this.$("arrowud").className = hqcr == "1" ? "cr" : "";
                    _this.$("arrow-find").className = ""
                }
            }
        },
        DisQuote: function() {
            if ((window.GetTimeZoneInfo || window.quoteIsFirst)) {
                jQuery.ajax({
                    url: "http://push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&fltt=2&fields=f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f193,f196,f194,f195,f197,f80,f280,f281,f282,f284,f285,f286,f287&secid=" + _this._Market_10 + "." + _this._Code,
                    scriptCharset: "utf-8",
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function(json) {
                        if (json) {
                            $("#name").html(json.data.f58);
                            $("#code").html(json.data.f57);
                            yestoday = json.data.f60;
                            Hyestoday = json.data.f250;
                            UKyestoday = json.data.f280;
                            zzyestoday = json.data.f266;
                            var time = _this.formateDate(new Date(json.data.f86 * 1000), "yyyy-MM-dd EEE HH:mm:ss");
                            var time1 = _this.formateDate(new Date(json.data.f86 * 1000), "yyyy-MM-dd HH:mm:ss");
                            $x("zjlxupta").innerHTML = "更新时间 " + time1;
                            $x("zjlxuptb").innerHTML = "更新时间 " + time1;
                            $x("zjlxuptc").innerHTML = "更新时间 " + time1;
                            $("#day").html("(" + time + ")");
                            if (json.data.f110 == 1 && json.data.f111 == 2) {
                                $("#jys-box").show().find("b ").text("沪主板");
                                $("#jys-box").attr("title", "该股票在沪主板上市");
                                $("#jys-box").find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#sh_a_board")
                            }
                            if (json.data.f110 == 0 && json.data.f111 == 6) {
                                $("#jys-box").show().find("b ").text("深主板");
                                $("#jys-box").attr("title", "该股票在深主板上市");
                                $("#jys-box").find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#sz_a_board")
                            }
                            if (json.data.f107 == 0 && json.data.f111 == 13) {
                                $("#jys-box").show().find("b ").text("中小板");
                                $("#jys-box").attr("title", "该股票在中小板上市");
                                $("#jys-box").find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#sme_board")
                            }
                            if (json.data.f107 == 0 && json.data.f111 == 80) {
                                $("#jys-box").show().find("b ").text("创业板");
                                $("#jys-box").attr("title", "该股票在创业板上市");
                                $("#jys-box").find("a").attr("href", "//quote.eastmoney.com/center/gridlist.html#gem_board")
                            }
                            if ((json.data.f177) & 512) {
                                $("#hgt_icon").show()
                            } else {
                                if ((json.data.f177) & 1024) {
                                    $("#sgt_icon").show()
                                }
                            }
                            if ((json.data.f177) & 64) {
                                $("#rongi").show()
                            } else {
                                $("#rongi").hide()
                            }
                            if (json.data.f177 & 32768) {
                                if (_this._Code == "601688") {
                                    $("#hlt").show().find("b ").text("沪伦通");
                                    $("#hlt").attr("title", "该股票为沪伦通标的");
                                    $("#hlt").find("a").attr("href", "http://quote.eastmoney.com/uk/156.HTSC.html");
                                    $("#GDR").show().find("b ").text("GDR");
                                    $("#GDR").attr("title", "该股票存在关联的GDR（全球存托凭证）");
                                    $("#GDR").find("a").attr("href", "http://quote.eastmoney.com/uk/156.HTSC.html")
                                }
                            }
                            var marketzhai = json.data.f263 == "1" ? "sh" : "sz";
                            if (json.data.f262 && json.data.f262 != "-") {
                                $("#Z-box").show().find("b").text("可转债");
                                $("#Z-box").attr("title", "点击查看关联可转债行情");
                                $("#Z-box").find("a").attr("href", "http://quote.eastmoney.com/bond/" + marketzhai + json.data.f262 + ".html")
                            } else {
                                $("#Z-box").hide()
                            }
                            var marketH = json.data.f257;
                            if (json.data.f256 && json.data.f256 != "-") {
                                $("#H-box").show().find("b").text("H股");
                                $("#H-box").attr("title", "点击查看关联H股行情");
                                $("#H-box").find("a").attr("href", "http://quote.eastmoney.com/unify/r/" + marketH + "." + json.data.f256)
                            } else {
                                $("#H-box").hide()
                            }
                            var marketB = json.data.f270 == "1" ? "sh" : "sz";
                            if (json.data.f269 && json.data.f269 != "-") {
                                $("#B-box").show().find("b ").text("B股");
                                $("#B-box").attr("title", "点击查看关联B股行情");
                                $("#B-box").find("a").attr("href", "http://quote.eastmoney.com/" + marketB + json.data.f269 + ".html")
                            } else {
                                $("#B-box").hide()
                            }
                            var zzcolor = json.data.f268 > 0 ? "red" : (json.data.f268 < 0 ? "green" : "");
                            var Hcolor = json.data.f252 > 0 ? "red" : (json.data.f252 < 0 ? "green" : "");
                            var Bcolor = json.data.f275 > 0 ? "red" : (json.data.f275 < 0 ? "green" : "");
                            if (json.data.f262 && json.data.f262 != "-") {
                                if (json.data.f267 == "-") {
                                    $("#relation-container").html('<div><a target="_blank" href="//quote.eastmoney.com/bond/' + marketzhai + json.data.f262 + '.html">' + json.data.f264 + "行情</a></div><div id =zzprice><span class=" + zzcolor + ">" + "-" + "</span></div><div><span id=zzm class=" + zzcolor + ">" + "-" + "</span><span id =zzper class=" + zzcolor + ">" + "-</span></div>").removeClass("data-right").addClass("fr bond-right")
                                } else {
                                    $("#relation-container").html('<div><a target="_blank" href="//quote.eastmoney.com/bond/' + marketzhai + json.data.f262 + '.html">' + json.data.f264 + "行情</a></div><div id =zzprice><span class=" + zzcolor + ">" + json.data.f267.toFixed(3) + "</span></div><div><span id=zzm class=" + zzcolor + ">" + (parseFloat(json.data.f267) - parseFloat(json.data.f266)).toFixed(3) + "</span><span id =zzper class=" + zzcolor + ">" + json.data.f268.toFixed(2) + "%</span></div>").removeClass("data-right").addClass("fr bond-right")
                                }
                            } else {
                                if (json.data.f256 && json.data.f256 != "-" || _this._Code == "601688") {
                                    if (json.data.f177 & 32768) {
                                        var ukcolor = json.data.f282 > 0 ? "red" : (json.data.f282 < 0 ? "green" : "");
                                        var ukprice = json.data.f281 == "-" ? "-" : json.data.f281.toFixed(json.data.f284);
                                        var ukmi = json.data.f281 == "-" ? "-" : (json.data.f281 - json.data.f280).toFixed(json.data.f284);
                                        var ukpercent = json.data.f282 == "-" ? "-" : json.data.f282.toFixed(2) + "%";
                                        $("#relation-container").html('<div id="rstocka" style="padding-top:0px"><a style=font-size:13px href="http://quote.eastmoney.com/unify/r/' + marketH + "." + json.data.f256 + '" target="_blank">' + json.data.f258 + ' H股行情</a></div><div id="rstockinfo"><span id="rstockb" class=' + Hcolor + "><span id=Hprice style=margin:5px>" + (json.data.f251).toFixed(3) + "</span><span id=Hm style=margin:5px>" + (parseFloat(json.data.f251) - Hyestoday).toFixed(3) + "</span><span id=Hper style=margin:5px>" + json.data.f252.toFixed(2) + '%</span></span></div><div id="rstockc" style="padding-top:0px"><a style=font-size:13px href="http://quote.eastmoney.com/uk/' + json.data.f286 + "." + json.data.f285 + '.html" target="_blank">' + json.data.f287 + ' 英股行情</a></div><div id="rstockinfo1"><span id="rstockb" class=' + ukcolor + "><span id=ukprice style=margin:5px>" + ukprice + "</span><span id = ukmi style=margin:5px>" + ukmi + "</span><span id = ukpercent style=margin:5px>" + ukpercent + "</span></span></div>").addClass("fr quote_right").css("line-height", "17px").removeClass("data-right");
                                        if (_this._Code == "601688") {
                                            huatai(marketH, json.data.f256, Hcolor, (json.data.f251).toFixed(3), (parseFloat(json.data.f251) - Hyestoday).toFixed(3), json.data.f252.toFixed(2));
                                            function huatai(mh, mc, Hcolor, mp, mm, mper) {
                                                var ukcolor = "";
                                                var ukprice = "";
                                                var ukmi = "";
                                                var ukpercent = "";
                                                jQuery.ajax({
                                                    url: "http://push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&fltt=2&fields=f43,f57,f58,f169,f170,f46,f44,f51,f168&secid=156.HTSC",
                                                    scriptCharset: "utf-8",
                                                    dataType: "jsonp",
                                                    jsonp: "cb",
                                                    success: function(json) {
                                                        ukcolor = json.data.f169 > 0 ? "red" : (json.data.f169 < 0 ? "green" : "");
                                                        ukprice = json.data.f43 == "-" ? "-" : json.data.f43.toFixed(3);
                                                        ukmi = json.data.f169 == "-" ? "-" : json.data.f169.toFixed(3);
                                                        ukpercent = json.data.f170 == "-" ? "-" : json.data.f170.toFixed(2) + "%";
                                                        $("#relation-container").html('<div id="rstocka" style="padding-top:0px"><a href="http://quote.eastmoney.com/unify/r/116.06886' + '" target="_blank">' + _this._Name + ' H股行情</a></div><div id="rstockinfo"><span id="rstockb" class=' + Hcolor + ">" + mp + "&nbsp;&nbsp;" + mm + "&nbsp;&nbsp;" + mper + '%</span></div><div id="rstockc" style="padding-top:0px"><a href="http://quote.eastmoney.com/uk/156.HTSC.html" target="_blank">' + _this._Name + ' 英股行情</a></div><div id="rstockinfo1"><span id="rstockb" class=' + ukcolor + ">" + ukprice + "&nbsp;&nbsp;" + ukmi + "&nbsp;&nbsp;" + ukpercent + "</span></div>").addClass("fr quote_right").css("line-height", "17px").removeClass("data-right");
                                                        $("#rstocka").css("font-size", "13px");
                                                        $("#rstockc").css("font-size", "13px")
                                                    }
                                                })
                                            }
                                        }
                                    } else {
                                        $("#relation-container").html('<div id="rstocka"><a href="http://quote.eastmoney.com/unify/r/' + marketH + "." + json.data.f256 + '" target="_blank">' + json.data.f258 + ' H股行情</a></div><div id="rstockinfo"><span id="rstockb" class=' + Hcolor + "><span id=Hprice style=margin:5px>" + (json.data.f251).toFixed(3) + "</span><span id=Hm style=margin:5px>" + (parseFloat(json.data.f251) - Hyestoday).toFixed(3) + "</span><span id=Hper style=margin:5px>" + json.data.f252.toFixed(2) + '%</span></span><span id="rstockc"></span></div>').addClass("fr quote_right").removeClass("data-right").addClass("fr bond-right")
                                    }
                                } else {
                                    if (json.data.f269 && json.data.f269 != "-") {
                                        if (json.data.f275 == "-") {
                                            $("#relation-container").html('<div id="rstocka"><a href="http://quote.eastmoney.com/' + marketB + json.data.f269 + '.html" target="_blank">' + json.data.f271 + ' B股行情</a></div><div id="rstockb" class=' + Bcolor + ">" + "-" + "&nbsp;&nbsp;" + "-</div>").addClass("fr quote_right").removeClass("data-right")
                                        } else {
                                            $("#relation-container").html('<div id="rstocka"><a href="http://quote.eastmoney.com/' + marketB + json.data.f269 + '.html" target="_blank">' + json.data.f271 + ' B股行情</a></div><div id="rstockb" class=' + Bcolor + ">" + json.data.f274 + "&nbsp;&nbsp;" + json.data.f275.toFixed(2) + "%</div>").addClass("fr quote_right").removeClass("data-right")
                                        }
                                    } else {
                                        $("#relation-container").html('<a href="http://data.eastmoney.com/zlsj/detail/' + json.data.f57 + '-1.html" target="_blank" class="n1">持有该股的基金</a><a href="http://acttg.eastmoney.com/pub/web_jcb_hqsy_mmd_01_01_01_1 " target="_blank" class="n2">查看' + json.data.f58 + '买卖点</a><a href="http://acttg.eastmoney.com/pub/web_jcb_hqsy_gjyj_01_01_02_1 " target="_blank" class="n3">' + json.data.f58 + "股价预警</a>").addClass("fr data-right")
                                    }
                                }
                            }
                            if ((json.data.f177) & 32) {
                                $("#arrowud").html('<strong id="price9" class="xp1" data-bind="43" style="width: 130px;"><span class="lstng">暂停上市</span></strong>')
                            } else {
                                if (json.data.f78 == 3 || json.data.f78 == 2) {
                                    $("#arrowud").html('<strong id="price9" class="xp1" data-bind="43""><span class="lstng"><a href="http://data.eastmoney.com/tfpxx/" target="_blank" class="red wz">停牌</a></span></strong>')
                                } else {
                                    if ((json.data.f177) & 16) {
                                        $("#arrowud").html('<strong id="price9" class="xp1" data-bind="43""><span class="lstng"><a href="http://data.eastmoney.com/tfpxx/" target="_blank" class="red wz">未上市</a></span></strong>')
                                    } else {
                                        if ((json.data.f177) & 2) {
                                            $("#arrowud").html('<strong id="price9" class="xp1" data-bind="43""><span class="lstng"><a href="http://data.eastmoney.com/tfpxx/" target="_blank" class="red wz">已退市</a></span></strong>')
                                        } else {
                                            if (json.data.f43 != "-") {
                                                _this.$("price9").innerHTML = json.data.f43.toFixed(2)
                                            }
                                            if (json.data.f43 >= 1000) {
                                                $("#price9").css({
                                                    "top": "20px",
                                                    "font-size": "25px"
                                                })
                                            }
                                            if (json.data.f169 != "-") {
                                                _this.$("km1").innerHTML = json.data.f169.toFixed(2)
                                            }
                                            if (json.data.f170 != "-") {
                                                _this.$("km2").innerHTML = json.data.f170.toFixed(2) + "%"
                                            }
                                            setInterval(function() {
                                                if (json.data.f43 != "-") {
                                                    document.title = (json.data.f58 + " " + json.data.f43.toFixed(2) + " " + json.data.f169.toFixed(2) + "(" + json.data.f170.toFixed(2) + "%) _ 股票行情 _ 东方财富网")
                                                }
                                            }, window.quoteRefresh)
                                        }
                                    }
                                }
                            }
                            if (json.data.f169 < 0) {
                                $("#arrowud").css("color", "green");
                                $("#arrow-find").removeClass("xp2 up-arrow");
                                $("#arrow-find").addClass("xp2 down-arrow");
                                $("#rgt3").css("color", "green");
                                $("#rgt4").css("color", "green")
                            } else {
                                if (json.data.f169 > 0) {
                                    $("#arrowud").css("color", "red");
                                    $("#arrow-find").removeClass("xp2 down-arrow");
                                    $("#arrow-find").addClass("xp2 up-arrow");
                                    $("#rgt3").css("color", "red");
                                    $("#rgt4").css("color", "red")
                                } else {
                                    $("#arrow-find").removeClass("xp2 up-arrow");
                                    $("#arrow-find").removeClass("xp2 down-arrow");
                                    $("#arrowud").css("color", "#494949");
                                    $("#rgt3").css("color", "#494949");
                                    $("#rgt4").css("color", "#494949")
                                }
                            }
                            if (json.data.f46 != "-") {
                                _this.$("gt1").innerHTML = json.data.f46.toFixed(2);
                                _this.$("gt1").className = udcls(json.data.f46, json.data.f60);
                                $("#gt1").addClass("txtl");
                                _this.$("rgt11").innerHTML = json.data.f46.toFixed(2);
                                _this.$("rgt11").className = udcls(json.data.f46, json.data.f60)
                            }
                            if (json.data.f44 != "-") {
                                _this.$("gt2").innerHTML = json.data.f44.toFixed(2);
                                _this.$("gt2").className = udcls(json.data.f44, json.data.f60);
                                $("#gt2").addClass("txtl");
                                _this.$("rgt9").innerHTML = json.data.f44.toFixed(2);
                                _this.$("rgt9").className = udcls(json.data.f44, json.data.f60)
                            }
                            if (json.data.f51 != "-") {
                                _this.$("gt3").innerHTML = json.data.f51.toFixed(2);
                                _this.$("gt3").className = "txtl red"
                            }
                            if (json.data.f168 != "-") {
                                _this.$("gt4").innerHTML = json.data.f168.toFixed(2) + "%"
                            }
                            if (json.data.f47 != "-") {
                                _this.$("gt5").innerHTML = fmtdig(json.data.f47, 1, 2, "", true) + "手"
                            }
                            if (json.data.f162 != "-") {
                                _this.$("gt6").innerHTML = toFixed(json.data.f162)
                            }
                            if (json.data.f116 != "-") {
                                _this.$("gt7").innerHTML = fmtdig(json.data.f116, 1, 2, "", true)
                            }
                            if (json.data.f60 != "-") {
                                _this.$("gt8").innerHTML = json.data.f60.toFixed(2)
                            }
                            if (json.data.f45 != "-") {
                                _this.$("gt9").innerHTML = json.data.f45.toFixed(2);
                                _this.$("gt9").className = udcls(json.data.f45, json.data.f60);
                                $("#gt9").addClass("txtl");
                                _this.$("rgt10").innerHTML = json.data.f45.toFixed(2);
                                _this.$("rgt10").className = udcls(json.data.f45, json.data.f60)
                            }
                            if (json.data.f52 != "-") {
                                _this.$("gt10").innerHTML = json.data.f52;
                                _this.$("gt10").className = "txtl green"
                            }
                            if (json.data.f50 != "-") {
                                _this.$("gt11").innerHTML = json.data.f50.toFixed(2);
                                _this.$("rgt8").innerHTML = json.data.f50.toFixed(2)
                            }
                            if (json.data.f48 != "-") {
                                _this.$("gt12").innerHTML = fmtdig(json.data.f48, 1, 2, "", true)
                            }
                            if (json.data.f167 != "-") {
                                _this.$("gt13").innerHTML = json.data.f167.toFixed(2)
                            }
                            if (json.data.f117 != "-") {
                                _this.$("gt14").innerHTML = fmtdig(json.data.f117, 1, 2, "", true)
                            }
                            if (json.data.f191 != "-") {
                                _this.$("irwb").innerHTML = json.data.f191.toFixed(2) + "%";
                                _this.$("irwb").className = udcls(json.data.f191)
                            }
                            if (json.data.f192 != "-") {
                                _this.$("irwc").innerHTML = json.data.f192;
                                _this.$("irwc").className = udcls(json.data.f192)
                            }
                            if (json.data.f43 != "-") {
                                _this.$("rgt1").innerHTML = json.data.f43.toFixed(2);
                                _this.$("rgt1").className = udcls(json.data.f43, json.data.f60)
                            }
                            if (json.data.f71 != "-") {
                                _this.$("rgt2").innerHTML = json.data.f71.toFixed(2);
                                _this.$("rgt2").className = udcls(json.data.f71, json.data.f60)
                            }
                            if (json.data.f170 != "-") {
                                _this.$("rgt3").innerHTML = json.data.f170.toFixed(2) + "%"
                            }
                            if (json.data.f169 != "-") {
                                _this.$("rgt4").innerHTML = json.data.f169
                            }
                            if (json.data.f47 != "-") {
                                _this.$("rgt5").innerHTML = fmtdig(json.data.f47, 1, 2, "", true) + "手"
                            }
                            if (json.data.f48 != "-") {
                                _this.$("rgt6").innerHTML = fmtdig(json.data.f48, 1, 2, "", true)
                            }
                            if (json.data.f168 != "-") {
                                _this.$("rgt7").innerHTML = json.data.f168 + "%"
                            }
                            _this.$("rgt12").innerHTML = json.data.f60.toFixed(2);
                            _this.$("rgt13").innerHTML = json.data.f51;
                            _this.$("rgt13").className = "red";
                            _this.$("rgt14").innerHTML = json.data.f52;
                            _this.$("rgt14").className = "green";
                            if (json.data.f49 < 10000) {
                                _this.$("rgt15").innerHTML = json.data.f49;
                                _this.$("rgt15").className = "red"
                            } else {
                                _this.$("rgt15").innerHTML = fmtdig(json.data.f49, 1, 2, "", true);
                                _this.$("rgt15").className = "red"
                            }
                            if (json.data.f161 < 10000) {
                                _this.$("rgt16").innerHTML = json.data.f161;
                                _this.$("rgt16").className = "green"
                            } else {
                                _this.$("rgt16").innerHTML = fmtdig(json.data.f161, 1, 2, "", true);
                                _this.$("rgt16").className = "green"
                            }
                            if (json.data.f31 != "-") {
                                _this.$("gts5a").innerHTML = json.data.f31.toFixed(2);
                                _this.$("gts5a").className = udcls(json.data.f31, json.data.f60)
                            }
                            if (json.data.f32 != "-") {
                                _this.$("gts5b").innerHTML = json.data.f32
                            }
                            if (json.data.f33 != "-") {
                                _this.$("gts4a").innerHTML = json.data.f33.toFixed(2);
                                _this.$("gts4a").className = udcls(json.data.f33, json.data.f60)
                            }
                            if (json.data.f34 != "-") {
                                _this.$("gts4b").innerHTML = json.data.f34
                            }
                            if (json.data.f35 != "-") {
                                _this.$("gts3a").innerHTML = json.data.f35.toFixed(2);
                                _this.$("gts3a").className = udcls(json.data.f35, json.data.f60)
                            }
                            if (json.data.f36 != "-") {
                                _this.$("gts3b").innerHTML = json.data.f36
                            }
                            if (json.data.f37 != "-") {
                                _this.$("gts2a").innerHTML = json.data.f37.toFixed(2);
                                _this.$("gts2a").className = udcls(json.data.f37, json.data.f60)
                            }
                            if (json.data.f38 != "-") {
                                _this.$("gts2b").innerHTML = json.data.f38
                            }
                            if (json.data.f39 != "-") {
                                _this.$("gts1a").innerHTML = json.data.f39.toFixed(2);
                                _this.$("gts1a").className = udcls(json.data.f39, json.data.f60)
                            }
                            if (json.data.f40 != "-") {
                                _this.$("gts1b").innerHTML = json.data.f40
                            }
                            if (json.data.f19 != "-") {
                                _this.$("gtb1a").innerHTML = json.data.f19.toFixed(2);
                                _this.$("gtb1a").className = udcls(json.data.f19, json.data.f60)
                            }
                            if (json.data.f20 != "-") {
                                _this.$("gtb1b").innerHTML = json.data.f20
                            }
                            if (json.data.f17 != "-") {
                                _this.$("gtb2a").innerHTML = json.data.f17.toFixed(2);
                                _this.$("gtb2a").className = udcls(json.data.f17, json.data.f60)
                            }
                            if (json.data.f18 != "-") {
                                _this.$("gtb2b").innerHTML = json.data.f18
                            }
                            if (json.data.f15 != "-") {
                                _this.$("gtb3a").innerHTML = json.data.f15.toFixed(2);
                                _this.$("gtb3a").className = udcls(json.data.f15, json.data.f60)
                            }
                            if (json.data.f16 != "-") {
                                _this.$("gtb3b").innerHTML = json.data.f16
                            }
                            if (json.data.f13 != "-") {
                                _this.$("gtb4a").innerHTML = json.data.f13.toFixed(2);
                                _this.$("gtb4a").className = udcls(json.data.f13, json.data.f60)
                            }
                            if (json.data.f14 != "-") {
                                _this.$("gtb4b").innerHTML = json.data.f14
                            }
                            if (json.data.f11 != "-") {
                                _this.$("gtb5a").innerHTML = json.data.f11.toFixed(2);
                                _this.$("gtb5a").className = udcls(json.data.f11, json.data.f60)
                            }
                            if (json.data.f12 != "-") {
                                _this.$("gtb5b").innerHTML = json.data.f12
                            }
                            var zjlxcjfw = "";
                            if (json.data.f138 != "-") {
                                zjlxcjfw += "<li class='cdlr'><b></b>超大单(<span class='red'>" + (json.data.f138 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='cdlr'><b></b>超大单(<span class='red'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f139 != "-") {
                                zjlxcjfw += "<li class='cdlc'><b></b>超大单(<span class='green'>" + "-" + (json.data.f139 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='cdlc'><b></b>超大单(<span class='green'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f141 != "-") {
                                zjlxcjfw += "<li class='ddlr'><b></b>大单(<span class='red'>" + (json.data.f141 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='ddlr'><b></b>大单(<span class='red'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f142 != "-") {
                                zjlxcjfw += "<li class='ddlc'><b></b>大单(<span class='green'>" + "-" + (json.data.f142 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='ddlc'><b></b>大单(<span class='green'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f144 != "-") {
                                zjlxcjfw += "<li class='zdlr'><b></b>中单(<span class='red'>" + (json.data.f144 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='zdlr'><b></b>中单(<span class='red'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f145 != "-") {
                                zjlxcjfw += "<li class='zdlc'><b></b>中单(<span class='green'>" + "-" + (json.data.f145 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='zdlc'><b></b>中单(<span class='green'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f147 != "-") {
                                zjlxcjfw += "<li class='xdlr'><b></b>小单(<span class='red'>" + (json.data.f147 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='xdlr'><b></b>小单(<span class='red'>" + "-" + "</span>万元)</li>"
                            }
                            if (json.data.f148 != "-") {
                                zjlxcjfw += "<li class='xdlc'><b></b>小单(<span class='green'>" + "-" + (json.data.f148 / 10000).toFixed(2) + "</span>万元)</li>"
                            } else {
                                zjlxcjfw += "<li class='xdlc'><b></b>小单(<span class='green'>" + "-" + "</span>万元)</li>"
                            }
                            $x("zjlxcjfbt").innerHTML = zjlxcjfw;
                            if (json.data.f137 != "-") {
                                $x("zjlxa").innerHTML = (json.data.f137 / 10000).toFixed(2) + "万元";
                                $x("zjlxb").innerHTML = json.data.f193.toFixed(2) + "%";
                                $x("zjlxa").style.color = udcls(json.data.f137, "0");
                                $x("zjlxb").style.color = udc(json.data.f193 + "%", "0")
                            }
                            if (json.data.f140 != "-") {
                                $x("zjlxc").innerHTML = (json.data.f140 / 10000).toFixed(2) + "万元";
                                $x("zjlxd").innerHTML = json.data.f194.toFixed(2) + "%";
                                $x("zjlxc").style.color = udcls(json.data.f140, "0");
                                $x("zjlxd").style.color = udc(json.data.f194 + "%", "0")
                            }
                            if (json.data.f143 != "-") {
                                $x("zjlxe").innerHTML = (json.data.f143 / 10000).toFixed(2) + "万元";
                                $x("zjlxf").innerHTML = json.data.f195.toFixed(2) + "%";
                                $x("zjlxe").style.color = udcls(json.data.f143, "0");
                                $x("zjlxf").style.color = udc(json.data.f195 + "%", "0")
                            }
                            if (json.data.f146 != "-") {
                                $x("zjlxg").innerHTML = (json.data.f146 / 10000).toFixed(2) + "万元";
                                $x("zjlxh").innerHTML = json.data.f196.toFixed(2) + "%";
                                $x("zjlxg").style.color = udcls(json.data.f146, "0");
                                $x("zjlxh").style.color = udc(json.data.f196 + "%", "0")
                            }
                            if (json.data.f149 != "-") {
                                $x("zjlxi").innerHTML = (json.data.f149 / 10000).toFixed(2) + "万元";
                                $x("zjlxj").innerHTML = json.data.f197.toFixed(2) + "%";
                                $x("zjlxi").style.color = udcls(json.data.f149, "0");
                                $x("zjlxj").style.color = udc(json.data.f197 + "%", "0")
                            }
                            if (json.data.f135 != "-") {
                                $x("hz_a").innerHTML = ForDight(parseFloat(json.data.f135 / 10000), 2);
                                $x("hz_a").className = udcls(json.data.f135)
                            }
                            if (json.data.f136 != "-") {
                                $x("hz_b").innerHTML = ForDight(parseFloat(json.data.f136 / 10000), 2).replace("-", "");
                                $x("hz_b").className = udcls(-json.data.f136)
                            }
                            if (json.data.f137 != "-") {
                                $x("hz_c").innerHTML = (json.data.f137 / 10000).toFixed(2);
                                $x("hz_c").className = udcls(json.data.f137)
                            }
                            if (json.data.f138 != "-") {
                                $x("hz_d").innerHTML = (json.data.f138 / 10000).toFixed(2) || ""
                            }
                            if (json.data.f139 != "-") {
                                $x("hz_e").innerHTML = (json.data.f139 / 10000).toFixed(2).replace("-", "") || ""
                            }
                            if (json.data.f141 != "-") {
                                $x("hz_f").innerHTML = (json.data.f141 / 10000).toFixed(2) || ""
                            }
                            if (json.data.f142 != "-") {
                                $x("hz_g").innerHTML = (json.data.f142 / 10000).toFixed(2).replace("-", "") || ""
                            }
                            if (json.data.f144 != "-") {
                                $x("hz_h").innerHTML = (json.data.f144 / 10000).toFixed(2) || ""
                            }
                            if (json.data.f145 != "-") {
                                $x("hz_i").innerHTML = (json.data.f145 / 10000).toFixed(2).replace("-", "") || ""
                            }
                            if (json.data.f147 != "-") {
                                $x("hz_j").innerHTML = (json.data.f147 / 10000).toFixed(2) || ""
                            }
                            if (json.data.f148 != "-") {
                                $x("hz_k").innerHTML = (json.data.f148 / 10000).toFixed(2).replace("-", "") || ""
                            }
                            var total = Math.abs(parseFloat(json.data.f140)) + Math.abs(parseFloat(json.data.f143)) + Math.abs(parseFloat(json.data.f146)) + Math.abs(parseFloat(json.data.f149));
                            var i = [json.data.f140, json.data.f143, json.data.f146, json.data.f149];
                            $(".picNum ul").each(function(index, elm) {
                                if (i[index] > 0) {
                                    $(this).find("div").eq(0).html('<div class="box" id="hz_' + index + 'h"></div><span class="red">' + parseFloat(Math.floor(i[index] / 10000)).toFixed(0) + "</span>");
                                    $(this).find("div").eq(0).css("border-bottom", "1px solid #ccc");
                                    $x("hz_" + index + "h").style.height = Math.abs(parseFloat(i[index])) / total * 36 + "px"
                                }
                                if (i[index] <= 0) {
                                    $(this).find("div").eq(1).html('<div class="box" id="hz_' + index + 'h"></div><span class="green">' + parseFloat(Math.floor(i[index] / 10000)).toFixed(0) + "</span>");
                                    $(this).find("div").eq(1).css("border-top", "1px solid #ccc");
                                    $x("hz_" + index + "h").style.height = Math.abs(parseFloat(i[index])) / total * 36 + "px"
                                }
                                if (i[index] == 0) {
                                    $(this).find("div").eq(1).html('<div class="box" id="hz_' + index + 'h"></div><span class="">' + parseFloat(Math.floor(i[index] / 10000)).toFixed(0) + "</span>");
                                    $(this).find("div").eq(1).css("border-top", "1px solid #ccc");
                                    $x("hz_" + index + "h").style.height = Math.abs(parseFloat(i[index])) / total * 36 + "px"
                                }
                            });
                            var coredata = "";
                            coredata += "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">收益</a>(<span title=第' + SectionToChinese(json.data.f62) + "季度>" + SectionToChinese(json.data.f62) + "</span>)：" + json.data.f55.toFixed(3) + "</td>" + '<td>PE(动)：<span id="gt6_2">' + json.data.f162 + "</span></td>" + "</tr>" + "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">净资产</a>：' + json.data.f92.toFixed(3) + "</td>" + '<td>市净率：<span id="gt13_2">' + json.data.f167 + "</span></td>" + "</tr>" + "<tr>" + "<td>总营收：" + fmtdig(json.data.f183, 1, 2, "", true) + "</td>" + "<td>同比</a>：" + json.data.f184.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + "<td>净利润：" + fmtdig(json.data.f105, 1, 2, "", true) + "</td>" + "<td>同比：" + json.data.f185.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">毛利率</a>：' + json.data.f186.toFixed(2) + "%</td>" + "<td>净利率：" + json.data.f187.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">ROE<b title="加权净资产收益率" class="hxsjccsyl"></b></a>：' + json.data.f173.toFixed(2) + "%</td>" + "<td>负债率：" + json.data.f188.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + '<td title="12.36亿">总股本：' + fmtdig(json.data.f84, 1, 2, "", true) + "</td>" + '<td>总值：<span id="gt7_2">' + fmtdig(json.data.f116, 1, 2, "", true) + "</span></td>" + "</tr>" + "<tr>" + '<td title="12.36亿">流通股：' + fmtdig(json.data.f85, 1, 2, "", true) + "</td>" + '<td>流值：<span id="gt14_2">' + fmtdig(json.data.f117, 1, 2, "", true) + "</span></td>" + "</tr>" + "<tr>" + '<td colspan="2">每股未分配利润：' + (json.data.f190).toFixed(3) + "元</td>" + "</tr>" + "<tr>" + '<td colspan="2" class="pb3">上市时间：' + json.data.f189.toString().substring(0, 4) + "-" + json.data.f189.toString().substring(4, 6) + "-" + json.data.f189.toString().substring(6, 8) + "</td>" + "</tr>";
                            var cores = "";
                            cores += "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">收益</a>(<span title=第' + SectionToChinese(json.data.f62) + "季度>" + SectionToChinese(json.data.f62) + "</span>)：" + json.data.f55.toFixed(3) + "</td>" + '<td>PE(动)：<span id="gt6_2">' + json.data.f162 + "</span></td>" + "</tr>" + "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">净资产</a>：' + json.data.f92.toFixed(3) + "</td>" + '<td>市净率：<span id="gt13_2">' + json.data.f167 + "</span></td>" + "</tr>" + "<tr>" + "<td>总营收：19.98亿</td>" + "<td>同比</a>：22.20%</td>" + "</tr>" + "<tr>" + "<td>净利润：" + fmtdig(json.data.f105, 1, 2, "", true) + "</td>" + "<td>同比：" + json.data.f185.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">毛利率</a>：' + json.data.f186.toFixed(2) + "%</td>" + "<td>净利率：" + json.data.f187.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + '<td><a href="http://data.eastmoney.com/bbsj/' + _this._Code + '.html" target="_blank">ROE<b title="加权净资产收益率" class="hxsjccsyl"></b></a>：' + json.data.f173.toFixed(2) + "%</td>" + "<td>负债率：" + json.data.f188.toFixed(2) + "%</td>" + "</tr>" + "<tr>" + '<td title="12.36亿">总股本：' + fmtdig(json.data.f84, 1, 2, "", true) + "</td>" + '<td>总值：<span id="gt7_2">' + fmtdig(json.data.f116, 1, 2, "", true) + "</span></td>" + "</tr>" + "<tr>" + '<td title="12.36亿">流通股：' + fmtdig(json.data.f85, 1, 2, "", true) + "</td>" + '<td>流值：<span id="gt14_2">' + fmtdig(json.data.f117, 1, 2, "", true) + "</span></td>" + "</tr>" + "<tr>" + '<td colspan="2">每股未分配利润：' + (json.data.f190).toFixed(3) + "元</td>" + "</tr>" + "<tr>" + '<td colspan="2" class="pb3">上市时间：' + json.data.f189.toString().substring(0, 4) + "-" + json.data.f189.toString().substring(4, 6) + "-" + json.data.f189.toString().substring(6, 8) + "</td>" + "</tr>";
                            if (_this._Code == "300059") {
                                $("#rtp2").html(coredata)
                            } else {
                                $("#rtp2").html(coredata)
                            }
                        }
                    }
                });
                _this.sansuo = setInterval(_this.hongdise, 300);
                window.quoteIsFirst = false
            }
        },
        DisQuote_sse: function() {
            var url = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&fields=f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f206,f207,f208,f209,f210,f211,f212,f213,f214,f215,f86,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275&secid=" + _this._Market_10 + "." + _this._Code;
            var evtSource = new EventSource(url);
            evtSource.onmessage = function(msg) {
                var json = JSON.parse(msg.data);
                if (json.data) {
                    if (json.data.f43) {
                        _this.$("price9").innerHTML = json.data.f43.toFixed(2);
                        if (json.data.f43 >= 1000) {
                            $("#price9").css({
                                "top": "20px",
                                "font-size": "25px"
                            })
                        }
                        blinker(json.data.f169, $("#price9"));
                        _this.$("rgt1").innerHTML = json.data.f43;
                        _this.$("rgt1").className = udcls(json.data.f43, yestoday);
                        blinker(json.data.f169, $("#rgt1"))
                    }
                    if (json.data.f169) {
                        _this.$("km1").innerHTML = json.data.f169.toFixed(2);
                        blinker(json.data.f169, $("#km1"));
                        _this.$("rgt4").innerHTML = json.data.f169;
                        _this.$("rgt4").className = udcls(json.data.f169, yestoday);
                        blinker(json.data.f169, $("#rgt4"));
                        if (json.data.f169 < 0) {
                            $("#arrowud").css("color", "green");
                            $("#arrow-find").removeClass("xp2 up-arrow");
                            $("#arrow-find").addClass("xp2 down-arrow")
                        } else {
                            if (json.data.f169 > 0) {
                                $("#arrowud").css("color", "red");
                                $("#arrow-find").removeClass("xp2 down-arrow");
                                $("#arrow-find").addClass("xp2 up-arrow")
                            } else {
                                $("#arrow-find").removeClass("xp2 up-arrow");
                                $("#arrow-find").removeClass("xp2 down-arrow");
                                $("#arrowud").css("color", "#494949")
                            }
                        }
                    }
                    if (json.data.f170) {
                        _this.$("km2").innerHTML = json.data.f170.toFixed(2) + "%";
                        blinker(json.data.f169, $("#km2"));
                        _this.$("rgt3").innerHTML = json.data.f170.toFixed(2) + "%";
                        _this.$("rgt3").className = udcls(json.data.f170, yestoday);
                        blinker(json.data.f169, $("#rgt3"))
                    }
                    if (json.data.f168) {
                        _this.$("gt4").innerHTML = json.data.f168 + "%";
                        blinker(0, $("#gt4"));
                        _this.$("rgt7").innerHTML = json.data.f168 + "%";
                        blinker(0, $("#rgt7"))
                    }
                    if (json.data.f47) {
                        _this.$("gt5").innerHTML = fmtdig(json.data.f47, 1, 2, "", true) + "手";
                        blinker(0, $("#gt5"));
                        _this.$("rgt5").innerHTML = fmtdig(json.data.f47, 1, 2, "", true) + "手";
                        blinker(0, $("#rgt5"))
                    }
                    if (json.data.f162) {
                        _this.$("gt6").innerHTML = toFixed(json.data.f162);
                        blinker(0, $("#gt6"))
                    }
                    if (json.data.f116) {
                        _this.$("gt7").innerHTML = fmtdig(json.data.f116, 1, 2, "", true);
                        blinker(0, $("#gt7"))
                    }
                    if (json.data.f45) {
                        _this.$("gt9").innerHTML = json.data.f45;
                        _this.$("gt9").className = udcls(json.data.f45, yestoday);
                        $("#gt9").addClass("txtl");
                        _this.$("rgt10").innerHTML = json.data.f45;
                        _this.$("rgt10").className = udcls(json.data.f45, yestoday);
                        blinker(json.data.f169, $("#gt9"));
                        blinker(json.data.f169, $("#gt10"))
                    }
                    if (json.data.f50) {
                        _this.$("gt11").innerHTML = json.data.f50.toFixed(2);
                        _this.$("rgt8").innerHTML = json.data.f50.toFixed(2);
                        blinker(0, $("#gt11"));
                        blinker(0, $("#rgt8"))
                    }
                    if (json.data.f48) {
                        _this.$("gt12").innerHTML = fmtdig(json.data.f48, 1, 2, "", true);
                        _this.$("rgt6").innerHTML = fmtdig(json.data.f48, 1, 2, "", true);
                        blinker(0, $("#gt12"));
                        blinker(0, $("#rgt6"))
                    }
                    if (json.data.f167) {
                        _this.$("gt13").innerHTML = json.data.f167.toFixed(2);
                        blinker(0, $("#gt13"))
                    }
                    if (json.data.f117) {
                        _this.$("gt14").innerHTML = fmtdig(json.data.f117, 1, 2, "", true);
                        blinker(0, $("#gt14"))
                    }
                    if (json.data.f191) {
                        _this.$("irwb").innerHTML = json.data.f191.toFixed(2) + "%";
                        _this.$("irwb").className = udcls(json.data.f191);
                        blinker(json.data.f191, $("#irwb"))
                    }
                    if (json.data.f192) {
                        _this.$("irwc").innerHTML = json.data.f192;
                        _this.$("irwc").className = udcls(json.data.f192);
                        blinker(json.data.f192, $("#irwc"))
                    }
                    if (json.data.f71) {
                        _this.$("rgt2").innerHTML = json.data.f71;
                        _this.$("rgt2").className = udcls(json.data.f71, yestoday);
                        blinker(json.data.f71 - yestoday, $("#rgt2"))
                    }
                    if (json.data.f161) {
                        _this.$("rgt16").innerHTML = fmtdig(json.data.f161, 1, 2, "", true);
                        _this.$("rgt16").className = "green";
                        blinker(-1, $("#irwc"))
                    }
                    if (json.data.f49) {
                        _this.$("rgt15").innerHTML = fmtdig(json.data.f49, 1, 2, "", true);
                        _this.$("rgt15").className = "red";
                        blinker(1, $("#irwc"))
                    }
                    if (json.data.f44) {
                        _this.$("rgt9").innerHTML = json.data.f44.toFixed(2);
                        _this.$("rgt9").className = udcls(json.data.f44, yestoday);
                        _this.$("gt2").innerHTML = json.data.f44.toFixed(2);
                        _this.$("gt2").className = udcls(json.data.f44, yestoday);
                        $("#gt2").addClass("txtl");
                        blinker(json.data.f44 - yestoday, $("#rgt9"));
                        blinker(json.data.f44 - yestoday, $("#gt2"))
                    }
                    if (json.data.f31 && json.data.f32) {
                        _this.$("gts5a").innerHTML = json.data.f31.toFixed(2);
                        _this.$("gts5b").innerHTML = json.data.f32;
                        _this.$("gts5a").className = udcls(json.data.f31, yestoday);
                        blinker(json.data.f31 - yestoday, $("#gts5a"));
                        blinker(0, $("#gts5b"))
                    }
                    if (json.data.f33 && json.data.f34) {
                        _this.$("gts4a").innerHTML = json.data.f33.toFixed(2);
                        _this.$("gts4b").innerHTML = json.data.f34;
                        _this.$("gts4a").className = udcls(json.data.f33, yestoday);
                        blinker(json.data.f33 - yestoday, $("#gts4a"));
                        blinker(0, $("#gts4b"))
                    }
                    if (json.data.f35 && json.data.f36) {
                        _this.$("gts3a").innerHTML = json.data.f35.toFixed(2);
                        _this.$("gts3b").innerHTML = json.data.f36;
                        _this.$("gts3a").className = udcls(json.data.f35, yestoday);
                        blinker(json.data.f35 - yestoday, $("#gts3a"));
                        blinker(0, $("#gts3b"))
                    }
                    if (json.data.f37 && json.data.f38) {
                        _this.$("gts2a").innerHTML = json.data.f37.toFixed(2);
                        _this.$("gts2b").innerHTML = json.data.f38;
                        _this.$("gts2a").className = udcls(json.data.f37, yestoday);
                        blinker(json.data.f37 - yestoday, $("#gts2a"));
                        blinker(0, $("#gts2b"))
                    }
                    if (json.data.f39 && json.data.f40) {
                        _this.$("gts1a").innerHTML = json.data.f39.toFixed(2);
                        _this.$("gts1b").innerHTML = json.data.f40;
                        _this.$("gts1a").className = udcls(json.data.f39, yestoday);
                        blinker(json.data.f39 - yestoday, $("#gts1a"));
                        blinker(0, $("#gts1b"))
                    }
                    if (json.data.f19 && json.data.f20) {
                        _this.$("gtb1a").innerHTML = json.data.f19.toFixed(2);
                        _this.$("gtb1b").innerHTML = json.data.f20;
                        _this.$("gtb1a").className = udcls(json.data.f19, yestoday);
                        blinker(json.data.f19 - yestoday, $("#gtb1a"));
                        blinker(0, $("#gtb1b"))
                    }
                    if (json.data.f17 && json.data.f18) {
                        _this.$("gtb2a").innerHTML = json.data.f17.toFixed(2);
                        _this.$("gtb2b").innerHTML = json.data.f18;
                        _this.$("gtb2a").className = udcls(json.data.f17, yestoday);
                        blinker(json.data.f17 - yestoday, $("#gtb2a"));
                        blinker(0, $("#gtb2b"))
                    }
                    if (json.data.f15 && json.data.f16) {
                        _this.$("gtb3a").innerHTML = json.data.f15.toFixed(2);
                        _this.$("gtb3b").innerHTML = json.data.f16;
                        _this.$("gtb3a").className = udcls(json.data.f15, yestoday);
                        blinker(json.data.f15 - yestoday, $("#gtb3a"));
                        blinker(0, $("#gtb3b"))
                    }
                    if (json.data.f13 && json.data.f14) {
                        _this.$("gtb4a").innerHTML = json.data.f13.toFixed(2);
                        _this.$("gtb4b").innerHTML = json.data.f14;
                        _this.$("gtb4a").className = udcls(json.data.f13, yestoday);
                        blinker(json.data.f13 - yestoday, $("#gtb4a"));
                        blinker(0, $("#gtb4b"))
                    }
                    if (json.data.f11 && json.data.f12) {
                        _this.$("gtb5a").innerHTML = json.data.f11.toFixed(2);
                        _this.$("gtb5b").innerHTML = json.data.f12;
                        _this.$("gtb5a").className = udcls(json.data.f11, yestoday);
                        blinker(json.data.f11 - yestoday, $("#gtb5a"));
                        blinker(0, $("#gtb5b"))
                    }
                    if (json.data.f135) {
                        $x("hz_a").innerHTML = ForDight(parseFloat(json.data.f135 / 10000), 2);
                        $x("hz_a").className = udcls(json.data.f135)
                    }
                    if (json.data.f136) {
                        $x("hz_b").innerHTML = ForDight(parseFloat(json.data.f136 / 10000), 2).replace("-", "");
                        $x("hz_b").className = udcls(-json.data.f136)
                    }
                    if (json.data.f137) {
                        $x("hz_c").innerHTML = (json.data.f137 / 10000).toFixed(2);
                        $x("hz_c").className = udcls(json.data.f137)
                    }
                    if (json.data.f138) {
                        $x("hz_d").innerHTML = (json.data.f138 / 10000).toFixed(2) || ""
                    }
                    if (json.data.f139) {
                        $x("hz_e").innerHTML = (json.data.f139 / 10000).toFixed(2).replace("-", "") || ""
                    }
                    if (json.data.f141) {
                        $x("hz_f").innerHTML = (json.data.f141 / 10000).toFixed(2) || ""
                    }
                    if (json.data.f142) {
                        $x("hz_g").innerHTML = (json.data.f142 / 10000).toFixed(2).replace("-", "") || ""
                    }
                    if (json.data.f144) {
                        $x("hz_h").innerHTML = (json.data.f144 / 10000).toFixed(2) || ""
                    }
                    if (json.data.f145) {
                        $x("hz_i").innerHTML = (json.data.f145 / 10000).toFixed(2).replace("-", "") || ""
                    }
                    if (json.data.f147) {
                        $x("hz_j").innerHTML = (json.data.f147 / 10000).toFixed(2) || ""
                    }
                    if (json.data.f148) {
                        $x("hz_k").innerHTML = (json.data.f148 / 10000).toFixed(2).replace("-", "") || ""
                    }
                    if (json.data.f206) {
                        _this.$("gts5c").innerHTML = json.data.f206;
                        _this.$("gts5c").className = udcls(json.data.f206)
                    }
                    if (json.data.f206 == 0) {
                        _this.$("gts5c").innerHTML = ""
                    }
                    if (json.data.f207) {
                        _this.$("gts4c").innerHTML = json.data.f207;
                        _this.$("gts4c").className = udcls(json.data.f207)
                    }
                    if (json.data.f207 == 0) {
                        _this.$("gts4c").innerHTML = ""
                    }
                    if (json.data.f208) {
                        _this.$("gts3c").innerHTML = json.data.f208;
                        _this.$("gts3c").className = udcls(json.data.f208)
                    }
                    if (json.data.f208 == 0) {
                        _this.$("gts3c").innerHTML = ""
                    }
                    if (json.data.f209) {
                        _this.$("gts2c").innerHTML = json.data.f209;
                        _this.$("gts2c").className = udcls(json.data.f209)
                    }
                    if (json.data.f209 == 0) {
                        _this.$("gts2c").innerHTML = ""
                    }
                    if (json.data.f210) {
                        _this.$("gts1c").innerHTML = json.data.f210;
                        _this.$("gts1c").className = udcls(json.data.f210);
                        if (json.data.f210 > 0) {
                            $("gts1c").css("backgro")
                        }
                    }
                    if (json.data.f210 == 0) {
                        _this.$("gts1c").innerHTML = ""
                    }
                    if (json.data.f211) {
                        _this.$("gtb1c").innerHTML = json.data.f211;
                        _this.$("gtb1c").className = udcls(json.data.f211)
                    }
                    if (json.data.f211 == 0) {
                        _this.$("gtb1c").innerHTML = ""
                    }
                    if (json.data.f212) {
                        _this.$("gtb2c").innerHTML = json.data.f212;
                        _this.$("gtb2c").className = udcls(json.data.f212)
                    }
                    if (json.data.f212 == 0) {
                        _this.$("gtb2c").innerHTML = ""
                    }
                    if (json.data.f213) {
                        _this.$("gtb3c").innerHTML = json.data.f213;
                        _this.$("gtb3c").className = udcls(json.data.f213)
                    }
                    if (json.data.f213 == 0) {
                        _this.$("gtb3c").innerHTML = ""
                    }
                    if (json.data.f214) {
                        _this.$("gtb4c").innerHTML = json.data.f214;
                        _this.$("gtb4c").className = udcls(json.data.f214)
                    }
                    if (json.data.f214 == 0) {
                        _this.$("gtb4c").innerHTML = ""
                    }
                    if (json.data.f215) {
                        _this.$("gtb5c").innerHTML = json.data.f215;
                        _this.$("gtb5c").className = udcls(json.data.f215)
                    }
                    if (json.data.f215 == 0) {
                        _this.$("gtb5c").innerHTML = ""
                    }
                    var marketB = json.data.f270 == "1" ? "sh" : "sz";
                    var marketH = json.data.f257;
                    var marketzhai = json.data.f263 == "1" ? "sh" : "sz";
                    if (json.data.f268) {
                        var zzcolor = json.data.f268 > 0 ? "red" : (json.data.f268 < 0 ? "green" : "");
                        $("#zzper").html(json.data.f268.toFixed(2) + "%").addClass(zzcolor);
                        $("#zzprice").html("<span class=" + zzcolor + ">" + json.data.f267.toFixed(3) + "<span>");
                        $("#zzm").html((parseFloat(json.data.f267) - parseFloat(zzyestoday)).toFixed(3)).addClass(zzcolor);
                        blinker(json.data.f268, $("#zzper"));
                        blinker(json.data.f268, $("#zhuanzhaic"));
                        blinker((parseFloat(json.data.f267) - parseFloat(zzyestoday)).toFixed(3), $("#zzm"))
                    }
                    if (json.data.f251 && ($("#Z-box").find("b").text() == "") && ($("#H-box").find("b").text() != "")) {
                        var Hcolor = json.data.f252 > 0 ? "red" : (json.data.f252 < 0 ? "green" : "");
                        $("#Hprice").html(json.data.f251.toFixed(3)).addClass(Hcolor);
                        $("#Hm").html((parseFloat(json.data.f251) - Hyestoday).toFixed(3)).addClass(Hcolor);
                        $("#Hper").html(json.data.f252.toFixed(2) + "%").addClass(Hcolor);
                        if ($("#GDR").find("b").text() != "") {
                            if (json.data.f281) {
                                var ukcolor = json.data.f282 > 0 ? "red" : (json.data.f282 < 0 ? "green" : "");
                                $("#ukprice").html(json.data.f281.toFixed(3)).addClass(ukcolor);
                                $("#ukmi").html((json.data.f281 - UKyestoday).toFixed(3)).addClass(ukcolor);
                                $("#ukpercent").html(json.data.f282.toFixed(2) + "%").addClass(ukcolor);
                                blinker(json.data.f282, $("#ukpercent"));
                                blinker(json.data.f282, $("#ukprice"));
                                blinker(json.data.f282, $("#ukmi"))
                            }
                        }
                        blinker(json.data.f252, $("#relation-container"));
                        blinker(json.data.f252, $("#rstockb"))
                    }
                    if (json.data.f275 && ($("#Z-box").find("b").text() == "") && ($("#H-box").find("b").text() == "")) {
                        var Bcolor = json.data.f275 > 0 ? "red" : (json.data.f275 < 0 ? "green" : "");
                        $("#rstockb").html(json.data.f274 + "&nbsp;&nbsp;" + json.data.f275.toFixed(2) + "%").addClass(Bcolor);
                        blinker(json.data.f275, $("#rstockb"))
                    }
                }
            }
        },
        DISRSI: function() {
            switch (_this._RType) {
            case "1":
                $.ajax({
                    url: gdomain + "CompatiblePage.aspx?Type=ZT&jsName=js_skr&fav=" + _this._RCode + "" + _this._RMarket + "&Reference=xml",
                    dataType: "script",
                    success: function() {
                        var jnm = eval("js_skr");
                        if (jnm.favif != null && jnm.favif != "") {
                            var _MarketCode = _this._RMarket == "1" ? "sh" + _this._RCode : "sz" + _this._RCode;
                            var temgl = jnm.favif[0].split(",");
                            for (var i = 0; i < temgl.length; i++) {
                                _this.$("rstocka").innerHTML = '<a href="http://quote.eastmoney.com/' + _MarketCode + '.html" target="_blank">' + temgl[2].replace("A股", "").replace("a股", "").replace("Ａ股", "").replace("a", "").replace("A", "").replace("Ａ", "") + " B股行情</a>";
                                _this.$("rstockb").innerHTML = temgl[3] + "&nbsp;&nbsp;" + temgl[4];
                                _this.$("rstockb").className = udcls(temgl[4]);
                                break
                            }
                        }
                    }
                });
                break;
            case "2":
                $.getScript("http://hq2hk.eastmoney.com/EM_Quote2010NumericApplication/Index.aspx?reference=xml&Type=z&sortType=A&sortRule=1&jssort=1&jsname=gl_data&ids=" + _this._RCode + "5&math=" + formatm(), function() {
                    if (gl_data.quotation != null && gl_data.quotation != "") {
                        var dataRow = String(gl_data.quotation).split(",");
                        _this.$("rstocka").innerHTML = '<a href="http://quote.eastmoney.com/hk/' + dataRow[1] + '.html" target="_blank">' + dataRow[2].substr(0, 6) + " H股行情</a>";
                        _this.$("rstockb").innerHTML = dataRow[5] + "&nbsp;&nbsp;" + dataRow[10] + "&nbsp;&nbsp;" + dataRow[11];
                        _this.$("rstockb").className = udcls(dataRow[10])
                    }
                });
                break;
            case "3":
                $.getScript(gdomain + "CompatiblePage.aspx?Type=ZT&jsName=js_skr&fav=" + _this._RCode + "" + _this._RMarket + "&Reference=xml&rt=" + formatm(), function() {
                    var jnm = eval("js_skr");
                    if (jnm.favif != null && jnm.favif != "") {
                        var _MarketCode = _this._RMarket == "1" ? "sh" + _this._RCode : "sz" + _this._RCode;
                        var temgl = jnm.favif[0].split(",");
                        for (var i = 0; i < temgl.length; i++) {
                            _this.$("rstocka").innerHTML = '<a href="http://quote.eastmoney.com/' + _MarketCode + '.html" target="_blank">' + temgl[2].replace("B股", "").replace("b股", "").replace("Ｂ股", "").replace("b", "").replace("B", "").replace("Ｂ", "") + "B股行情</a>";
                            _this.$("rstockb").innerHTML = temgl[3] + "&nbsp;&nbsp;" + temgl[4];
                            _this.$("rstockb").style.color = udcls(temgl[4]);
                            break
                        }
                    }
                });
                break
            }
            if (typeof String.prototype.endsWith !== "function") {
                String.prototype.endsWith = function(str) {
                    var reg = new RegExp(str + "$");
                    return reg.test(this)
                }
            }
            jQuery.ajax({
                url: "//nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?&type=CT&sty=GB20GFBTC&st=z&js=((x))&token=4f1862fc3b5e77c150a2b985b12db0fd",
                data: {
                    cmd: _this._Code + _this._Market
                },
                dataType: "jsonp",
                jsonp: "cb",
                scriptCharset: "utf-8",
                success: function(json) {
                    if (!json || typeof json !== "string") {
                        return false
                    }
                    var item = json.split(",");
                    if (!item[9] || item[9] === "-" || !item[3] || item[3] === "-") {
                        return false
                    }
                    var issue_date = new Date(item[3].replace(/-/g, "/"))
                      , list_date = item[4] == "-" ? null : new Date(item[4].replace(/-/g, "/"))
                      , quote_time = new Date(item[10].replace(/-/g, "/").split(" ")[0])
                      , delist_date = new Date(item[17].replace(/-/g, "/"));
                    if (delist_date && quote_time > delist_date) {
                        return
                    }
                    var $line1, $line2, $line3;
                    if (quote_time < issue_date) {
                        if (item[11] && item[11] !== "-") {
                            $line1 = $('<div><a target="_blank" href=\'http://data.eastmoney.com/kzz/detail/' + item[11] + ".html'>" + item[9] + "</a></div>");
                            $line3 = $("<div>").html($('<a target="_blank" href=\'http://data.eastmoney.com/kzz/detail/' + item[11] + ".html'></a>").text("点击查看更多>>"))
                        } else {
                            $line1 = $("<div><span>" + item[9] + "</span></div>")
                        }
                        $line2 = $("<div><span>申购日期：" + item[3] + "</span></div>")
                    } else {
                        if (+quote_time == +issue_date) {
                            $line1 = $("<div class='red'><span>" + item[9] + "今日申购</span></div>");
                            $line2 = $("<div class='red'><span>申购代码：" + item[8] + "</span></div>");
                            if (item[11] && item[11] !== "-") {
                                $line3 = $("<div class='red'>").html($('<a target="_blank" href=\'http://data.eastmoney.com/kzz/detail/' + item[11] + ".html'></a>").text("点击查看更多>>"))
                            }
                        } else {
                            if (quote_time < list_date || !list_date) {
                                if (item[11] && item[11] !== "-") {
                                    $line1 = $("<div>").html($('<a target="_blank" href=\'http://data.eastmoney.com/kzz/detail/' + item[11] + ".html'></a>").text(item[9]));
                                    $line3 = $("<div>").html($('<a target="_blank" href=\'http://data.eastmoney.com/kzz/detail/' + item[11] + ".html'></a>").text("点击查看更多>>"))
                                } else {
                                    $line1 = $("<span></span>").text(item[9]).appendTo("<div>")
                                }
                                $line2 = !list_date ? $("<div><span>待上市</span></div>") : $("<div><span>上市日期：" + item[4] + "</span></div>")
                            } else {
                                var _color = item[15] > 0 ? "red" : item[15] < 0 ? "green" : "";
                                $line1 = $('<div><a target="_blank" href=\'//quote.eastmoney.com/bond/' + (item[12].endsWith("SH") ? "sh" : "sz") + item[11] + ".html'>" + item[13] + "行情" + "</a></div>");
                                $line2 = $("<div>").append($("<span></span>").addClass(_color).text(item[14]));
                                $line3 = $("<div>").append($("<span></span>").text(item[15]).addClass(_color)).append($("<span></span>").text(item[16] === "-" ? "-" : item[16] + "%").addClass(_color))
                            }
                        }
                    }
                    var $container = $("#relation-container").addClass("bond-right").removeClass("data-right quote_right").html("");
                    $container.append($line1).append($line2).append($line3)
                }
            })
        },
        UpPic: function(refk, pq) {
            var pqtit = _this.$("actTab4").getElementsByTagName("span");
            for (var i = 0; i < pqtit.length; i++) {
                pqtit[i].className = ""
            }
            if (pq) {
                pqtit[0].className = "cur";
                if (_this.Lstng == "0") {
                    _this.$("picr").src = "http://hqres.eastmoney.com/EMQuote_Lib/img/picrnotfund.gif"
                } else {
                    _this.$("picr").src = PicN.replace("{0}", _this._Code).replace("{1}", _this._Market).replace("{2}", "rc") + "&rt=" + formatm()
                }
            } else {
                pqtit[1].className = "cur";
                if (_this.Lstng == "0") {
                    _this.$("picr").src = "http://hqres.eastmoney.com/EMQuote_Lib/img/picrnotfund.gif"
                } else {
                    var pic_url = PicN;
                    if (Math.random() < 1) {
                        pic_url = "//webquotepic.eastmoney.com/GetPic.aspx?id={0}{1}&imageType={2}&token=44c9d251add88e27b65ed86506f6e5da"
                    }
                    if (_this.IsAGu == 1) {
                        _this.$("picr").src = pic_url.replace("{0}", _this._Code).replace("{1}", _this._Market).replace("{2}", "r") + "&rt=" + formatm()
                    } else {
                        _this.$("picr").src = PicN.replace("{0}", _this._Code).replace("{1}", _this._Market).replace("{2}", "rc") + "&rt=" + formatm()
                    }
                }
            }
            if (refk) {
                if (_this.Lstng == "0") {
                    _this.$("pick").src = "http://hqres.eastmoney.com/EMQuote_Lib/img/picknotfund.gif?1"
                } else {
                    if (_this.CekNSSs()) {
                        _this.$("pick").src = "http://hqres.eastmoney.com/EMQuote_Lib/img/picknotfund.gif?2"
                    } else {
                        _this.$("pick").src = PicN.replace("{0}", _this._Code).replace("{1}", _this._Market).replace("{2}", "KXL") + "&rt=" + formatm()
                    }
                }
            }
        },
        CekNSSs: function() {
            var res = false;
            var dt = new Date(window["bjTime"] * 1000);
            var ys = dt.getFullYear();
            var ms = dt.getMonth() + 1;
            var ds = dt.getDate();
            var hs = dt.getHours();
            var mms = dt.getMinutes();
            if (_this.Ssrq != "") {
                var _dt = new Date(_this.Ssrq);
                var _ys = _dt.getFullYear();
                var _ms = _dt.getMonth() + 1;
                var _ds = _dt.getDate();
                if (ys == _ys && ms == _ms && ds == _ds) {
                    if (hs < 9 || (hs == 9 && mms < 28)) {
                        res = true
                    }
                }
            } else {
                if (hs < 9 || (hs == 9 && mms < 28)) {
                    res = true
                }
            }
            return res
        },
        DisTfpxx: function() {
            var __dt = new Date(window["bjTime"] * 1000);
            var __hs = __dt.getHours();
            var __mms = __dt.getMinutes();
            if (__hs < 9 || (__hs <= 9 && __mms <= 14)) {
                _this.$("price9").innerHTML = '<span class="lstng"><a href="http://data.eastmoney.com/tfpxx/" target="_blank" class="red tp">停牌</a></span>';
                _this.$("arrow-find").className = "";
                _this.$("km1").innerHTML = "";
                _this.$("km1").className = "xp3";
                _this.$("km2").innerHTML = "";
                _this.$("km2").className = "xp4"
            }
        },
        hqcr: function(hq_cr_type, _hq_cr_time, hq_cr_cnt) {
            var hq_cr_time = _hq_cr_time.length > 5 ? _hq_cr_time.substring(16, 11) : "-";
            if (hq_cr_type == "8" || hq_cr_type == "9" || hq_cr_type == "10" || hq_cr_type == "11") {
                _this.$("hq_cr").style.display = "block";
                if (hq_cr_type == "8" || hq_cr_type == "10") {
                    _this.$("hq_cr_time").innerHTML = "暂停交易15分钟"
                } else {
                    _this.$("hq_cr_time").innerHTML = "暂停交易至15:00"
                }
                _this.$("arrowud").setAttribute("xid", "1");
                switch (hq_cr_type) {
                case "8":
                    _this.$("hq_cr_type").innerHTML = "5%熔断";
                    _this.$("hq_cr_type").className = "hq_cr_a bgr";
                    break;
                case "9":
                    _this.$("hq_cr_type").innerHTML = "7%熔断";
                    _this.$("hq_cr_type").className = "hq_cr_a bgr";
                    break;
                case "10":
                    _this.$("hq_cr_type").innerHTML = "-5%熔断";
                    _this.$("hq_cr_type").className = "hq_cr_a bgg";
                    break;
                case "11":
                    _this.$("hq_cr_type").innerHTML = "-7%熔断";
                    _this.$("hq_cr_type").className = "hq_cr_a bgg";
                    break
                }
                var _rdContent = "";
                switch (hq_cr_cnt.toLowerCase()) {
                case "aa1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "aa2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "aa3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，于9：30起暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "aa4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，于9：30起暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ab1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，11:30前未完成的15分钟指数熔断，延续至13:00后继续进行，直至届满。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "ab2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，11:30前未完成的15分钟指数熔断，延续至13:00后继续进行，直至届满。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "ab3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ab4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ac1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ac2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ac3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ac4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ad1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "ad2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "ad3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ad4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，暂停交易至15：00。熔断期间仅接受撤销申报，不接受其他申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ba1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "ba2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "ba3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，于9：30起暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ba4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，于9：30起暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bb1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，11:30前未完成的15分钟指数熔断，延续至13:00后继续进行，直至届满。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "bb2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，11:30前未完成的15分钟指数熔断，延续至13:00后继续进行，直至届满。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "bb3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，于9：30起暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bb4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，于9：30起暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bc1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，暂停交易至14：57。熔断期间您可以继续申报，也可以撤销申报。熔断结束后进入3分钟的尾盘集合竞价。";
                    break;
                case "bc2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，暂停交易至14：57。熔断期间您可以继续申报，也可以撤销申报。熔断结束后进入3分钟的尾盘集合竞价。";
                    break;
                case "bc3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bc4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bd1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bd2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bd3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "bd4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "be1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "be2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "be3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "be4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，暂停交易至15：00。熔断期间您可以继续申报，也可以撤销申报。当日不再进行集合竞价撮合成交。";
                    break;
                case "ca1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据中金所规定，相关合约于9：30起暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间，期间接受指令申报和撤销。";
                    break;
                case "ca2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据中金所规定，相关合约于9：30起暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间，期间接受指令申报和撤销。";
                    break;
                case "ca3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据中金所规定，相关合约暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "ca4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据中金所规定，相关合约暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "cb1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据中金所规定，相关合约暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间（熔断发生在11:15-11:18之间，下午开盘直接进入3分钟集合竞价），期间接受指令申报和撤销。";
                    break;
                case "cb2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据中金所规定，相关合约暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间（熔断发生在11:15-11:18之间，下午开盘直接进入3分钟集合竞价），期间接受指令申报和撤销。";
                    break;
                case "cb3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据中金所规定，相关合约暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "cb4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据中金所规定，相关合约暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "cc1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据中金所规定相关合约收市前15分钟内触发5%阈值，暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "cc2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据中金所规定相关合约收市前15分钟内触发5%阈值，暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "cc3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据中金所规定，相关合约暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "cc4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据中金所规定，相关合约暂停交易至当日收市。熔断期间暂停交易，不接受指令申报和撤销。";
                    break;
                case "taa1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "taa2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "taa3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "taa4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tab1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "tab2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "tab3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tab4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tac1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tac2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tac3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tac4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据上交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tba1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "tba2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，于9：30起暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "tba3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tba4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tbb1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "tbb2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，暂停交易15分钟。熔断期间您可以继续申报，也可以撤销申报。熔断结束后，您可以继续正常交易。";
                    break;
                case "tbb3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tbb4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tbc1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tbc2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tbc3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tbc4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据深交所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tca1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据中金所规定，相关合约于9：30起暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间，期间接受指令申报和撤销。";
                    break;
                case "tca2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据中金所规定，相关合约于9：30起暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间，期间接受指令申报和撤销。";
                    break;
                case "tca3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间不接受指令申报和撤销；熔断结束后，您可正常交易。";
                    break;
                case "tca4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间不接受指令申报和撤销；熔断结束后，您可正常交易。";
                    break;
                case "tcb1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据中金所规定，相关合约暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间，期间接受指令申报和撤销。";
                    break;
                case "tcb2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据中金所规定，相关合约暂停交易12分钟。熔断期间暂停交易，不接受指令申报和撤销。熔断结束后进入3分钟集合竞价指令申报时间，期间接受指令申报和撤销。";
                    break;
                case "tcb3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间不接受指令申报和撤销；熔断结束后，您可正常交易。";
                    break;
                case "tcb4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间不接受指令申报和撤销；熔断结束后，您可正常交易。";
                    break;
                case "tcc1":
                    _rdContent = "沪深300指数上涨触及5%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tcc2":
                    _rdContent = "沪深300指数下跌触及5%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tcc3":
                    _rdContent = "沪深300指数上涨触及7%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break;
                case "tcc4":
                    _rdContent = "沪深300指数下跌触及7%熔断阈值，根据中金所规定，交易日为股指期货合约交割日的，当日指数熔断时间跨越11:30的，于当日13:00起恢复交易；当日13:00至15:00期间，不实施指数熔断；熔断期间您可以继续申报，也可以撤销申报；熔断结束后，您可正常交易。";
                    break
                }
                var cookies_cr = GetCookie("emhq_cr");
                _this.$("hq_cr_cnt").innerHTML = _rdContent;
                if (_rdContent == "") {
                    _this.$("hq_cr_tips").style.display = "none";
                    _this.$("hq_cr_b").style.display = "none"
                }
                if ((cookies_cr == "" || cookies_cr == null) && _rdContent != "") {
                    _this.$("hq_cr_tips").style.display = "block";
                    _this.$("hq_cr_b").style.display = "block"
                }
            } else {
                _this.$("hq_cr").style.display = "none";
                _this.$("hq_cr_type").className = "hq_cr_a";
                _this.$("arrowud").setAttribute("xid", "0");
                _this.$("arrowud").className = _this.$("arrowud").className.replace("cr", "")
            }
        },
        CheckBeforeNine: function() {
            var res = false;
            var __dt = new Date(window["bjTime"] * 1000);
            var __hs = __dt.getHours();
            var __mms = __dt.getMinutes();
            if (__hs < 8 && __hs < 9) {
                res = true
            }
            return res
        },
        formateDate: function(date, fmt) {
            fmt = fmt || "yyyy-MM-dd HH:mm:ss";
            if (typeof date === "string") {
                date = new Date(date.replace(/-/g, "/").replace("T", " ").split("+")[0])
            }
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
                "H+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            };
            var week = {
                "0": "\u65e5",
                "1": "\u4e00",
                "2": "\u4e8c",
                "3": "\u4e09",
                "4": "\u56db",
                "5": "\u4e94",
                "6": "\u516d"
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""])
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                }
            }
            return fmt
        },
        YBCutstr: function() {
            var $ggybTr = $("#ggybTable tr");
            var tr1_td0 = $ggybTr.eq(1).find("td:eq(0) a");
            var tr1_td1 = $ggybTr.eq(1).find("td:eq(1) span");
            var tr2_td0 = $ggybTr.eq(2).find("td:eq(0) a");
            var tr2_td1 = $ggybTr.eq(2).find("td:eq(1) span");
            var tr3_td0 = $ggybTr.eq(3).find("td:eq(0) a");
            var tr3_td1 = $ggybTr.eq(3).find("td:eq(1) span");
            var tr4_td0 = $ggybTr.eq(4).find("td:eq(0) a");
            var tr4_td1 = $ggybTr.eq(4).find("td:eq(1) span");
            var tr5_td0 = $ggybTr.eq(5).find("td:eq(0) a");
            var tr5_td1 = $ggybTr.eq(5).find("td:eq(1) span");
            tr1_td0.attr("title", tr1_td0.html()).html(cutstr(tr1_td0.html(), 8, ".."));
            tr1_td1.attr("title", tr1_td1.html()).html(cutstr(tr1_td1.html(), 8, ".."));
            tr2_td0.attr("title", tr2_td0.html()).html(cutstr(tr2_td0.html(), 8, ".."));
            tr2_td1.attr("title", tr2_td1.html()).html(cutstr(tr2_td1.html(), 8, ".."));
            tr3_td0.attr("title", tr3_td0.html()).html(cutstr(tr3_td0.html(), 8, ".."));
            tr3_td1.attr("title", tr3_td1.html()).html(cutstr(tr3_td1.html(), 8, ".."));
            tr4_td0.attr("title", tr4_td0.html()).html(cutstr(tr4_td0.html(), 8, ".."));
            tr4_td1.attr("title", tr4_td1.html()).html(cutstr(tr4_td1.html(), 8, ".."));
            tr5_td0.attr("title", tr5_td0.html()).html(cutstr(tr5_td0.html(), 8, ".."));
            tr5_td1.attr("title", tr5_td1.html()).html(cutstr(tr5_td1.html(), 8, ".."));
            var $ggybTr = $("#hyybTable tr");
            var hyybTr1_td0 = $ggybTr.eq(1).find("td:eq(0) a");
            var hyybTr1_td1 = $ggybTr.eq(1).find("td:eq(1) span");
            var hyybTr2_td0 = $ggybTr.eq(2).find("td:eq(0) a");
            var hyybTr2_td1 = $ggybTr.eq(2).find("td:eq(1) span");
            var hyybTr3_td0 = $ggybTr.eq(3).find("td:eq(0) a");
            var hyybTr3_td1 = $ggybTr.eq(3).find("td:eq(1) span");
            var hyybTr4_td0 = $ggybTr.eq(4).find("td:eq(0) a");
            var hyybTr4_td1 = $ggybTr.eq(4).find("td:eq(1) span");
            var hyybTr5_td0 = $ggybTr.eq(5).find("td:eq(0) a");
            var hyybTr5_td1 = $ggybTr.eq(5).find("td:eq(1) span");
            hyybTr1_td0.attr("title", hyybTr1_td0.html()).html(cutstr(hyybTr1_td0.html(), 8, ".."));
            hyybTr1_td1.attr("title", hyybTr1_td1.html()).html(cutstr(hyybTr1_td1.html(), 8, ".."));
            hyybTr2_td0.attr("title", hyybTr2_td0.html()).html(cutstr(hyybTr2_td0.html(), 8, ".."));
            hyybTr2_td1.attr("title", hyybTr2_td1.html()).html(cutstr(hyybTr2_td1.html(), 8, ".."));
            hyybTr3_td0.attr("title", hyybTr3_td0.html()).html(cutstr(hyybTr3_td0.html(), 8, ".."));
            hyybTr3_td1.attr("title", hyybTr3_td1.html()).html(cutstr(hyybTr3_td1.html(), 8, ".."));
            hyybTr4_td0.attr("title", hyybTr4_td0.html()).html(cutstr(hyybTr4_td0.html(), 8, ".."));
            hyybTr4_td1.attr("title", hyybTr4_td1.html()).html(cutstr(hyybTr4_td1.html(), 8, ".."));
            hyybTr5_td0.attr("title", hyybTr5_td0.html()).html(cutstr(hyybTr5_td0.html(), 8, ".."));
            hyybTr5_td1.attr("title", hyybTr5_td1.html()).html(cutstr(hyybTr5_td1.html(), 8, ".."))
        },
        quartile: function() {
            $.ajax({
                url: "//push2.eastmoney.com/api/qt/slist/get?spt=1&np=3&fltt=2&invt=2&fields=f9,f12,f13,f14,f20,f23,f37,f45,f49,f134,f135,f129,f1000,f2000,f3000&ut=bd1d9ddb04089700cf9c27f6f7426281",
                data: {
                    secid: Def._Market_10 + "." + Def._Code
                },
                dataType: "jsonp",
                scriptCharset: "utf-8",
                jsonp: "cb",
                success: function(json) {
                    if (json && json.data) {
                        var items = json.data.diff;
                        if (items && items.length > 0) {
                            var models = []
                              , obj = items[0]
                              , obj_1 = items[1]
                              , model = {}
                              , model_1 = {}
                              , model_2 = {}
                              , model_2 = {};
                            model = {
                                name: '<a href="http://data.eastmoney.com/stockdata/' + obj.f12 + '.html" target="_blank">' + obj.f14 + "</a>",
                                zsz: fmtdig(obj.f20, 1, 2, "", true),
                                jzc: fmtdig(obj.f135, 1, 2, "", true),
                                jlr: fmtdig(obj.f45, 1, 2, "", true),
                                syl: specialData(obj.f9),
                                sjl: specialData(obj.f23),
                                mll: addPercent(obj.f49),
                                jll: addPercent(obj.f129),
                                ROE: addPercent(obj.f37)
                            };
                            model_1 = {
                                name: '<a href="http://quote.eastmoney.com/center/boardlist.html#boards-' + obj_1.f12 + '1"  target="_blank">' + obj_1.f14 + '</a></br><b class="color979797">(行业平均)</b>',
                                zsz: fmtdig(obj_1.f2020, 1, 2, "", true),
                                jzc: fmtdig(obj_1.f2135, 1, 2, "", true),
                                jlr: fmtdig(obj_1.f2045, 1, 2, "", true),
                                syl: parseFloat(obj_1.f2009) ? obj_1.f2009.toFixed(2) : obj_1.f2009,
                                sjl: parseFloat(obj_1.f2023) ? obj_1.f2023.toFixed(2) : obj_1.f2023,
                                mll: addPercent(obj_1.f2049),
                                jll: addPercent(obj_1.f2129),
                                ROE: addPercent(obj_1.f2037)
                            };
                            model_2 = {
                                name: "<b>行业排名</b>",
                                zsz: obj.f1020 + "|" + obj_1.f134,
                                jzc: obj.f1135 + "|" + obj_1.f134,
                                jlr: obj.f1045 + "|" + obj_1.f134,
                                syl: specialData(obj.f9, obj.f1009, true) + "|" + obj_1.f134,
                                sjl: specialData(obj.f23, obj.f1023, true) + "|" + obj_1.f134,
                                mll: obj.f1049 + "|" + obj_1.f134,
                                jll: obj.f1129 + "|" + obj_1.f134,
                                ROE: obj.f1037 + "|" + obj_1.f134
                            };
                            model_3 = CwzbHtml(obj);
                            models.push(model, model_1, model_2, model_3);
                            var $_html = "";
                            for (var i = 0; i < models.length; i++) {
                                var item = models[i];
                                $_html += "<tr>" + "<td> " + item.name + "</td >" + "<td> " + item.zsz + "</td >" + "<td> " + item.jzc + "</td >" + "<td> " + item.jlr + "</td >" + "<td> " + item.syl + "</td >" + "<td> " + item.sjl + "</td >" + "<td> " + item.mll + "</td >" + "<td> " + item.jll + "</td >" + "<td> " + item.ROE + "</td >" + "</tr > ";
                                "</tr > "
                            }
                            $("#cwzbDataBox").html($_html);
                            showRedTipsHover()
                        }
                    }
                }
            })
        }
    };
    window.QaDefault = QaDefault
}
)();
function specialData(num, pm, status) {
    var syl = parseFloat(num)
      , item = "";
    if (!status) {
        if (syl >= 0 || syl < 0) {
            syl >= 0 ? item = syl.toFixed(2) : item = "负值"
        } else {
            syl ? item = syl.toFixed(2) : item = "-"
        }
    } else {
        if (syl >= 0) {
            item = parseFloat(pm)
        } else {
            item = "-"
        }
    }
    return item
}
function showRedTipsHover() {
    $(".showRedTips").mouseover(function() {
        $(".sfwsx_title").hide();
        if ($(this).find(".sfwsx_title").length != 0) {
            $(this).find(".sfwsx_title").show()
        } else {
            $(this).parent().find(".sfwsx_title").show()
        }
    });
    $(".showRedTips").mouseout(function() {
        $(".sfwsx_title").hide()
    })
}
function CwzbHtml(obj) {
    var text = {
        td_0: '<div class="sfwsx_title" style = "display: none;">四分位属性是指根据每个指标的属性，进行数值大小排序，然后分为四等分，每个部分大约包含排名的四分之一。将属性分为高、较高、较低、低四类。<span class="red">注：鼠标移至四分位图标上时，会出现每个指标的说明和用途。</div>',
        td_1: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为公司总股本乘以市价。该指标侧面反映出一家公司的规模和行业地位。总市值越大，公司规模越大，相应的行业地位也越高。<br><span class="red">注：四分位属性以行业排名为比较基准。</span> </div>',
        td_2: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为资产总额减去负债后的净额。该指标由实收资本、资本公积、盈余公积和未分配利润等构成，反映企业所有者在企业中的财产价值。净资产越大，信用风险越低。<br><span class="red">注：四分位属性以行业排名为比较基准。</span></div>',
        td_3: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为：净利润=利润总额-所得税费用。净利润是一个企业经营的最终成果，净利润多，企业的经营效益就好。<br><span class="red">注：四分位属性以行业排名为比较基准。</span>',
        td_4: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为公司股票价格除以每股利润。该指标主要是衡量公司的价值，高市盈率一般是由高成长支撑着。市盈率越低，股票越便宜，相对投资价值越大。<br><span class="red">注：四分位属性以行业排名为比较基准。</span> </div>',
        td_5: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为每股股价与每股净资产的比率。市净率越低，每股内含净资产值越高，投资价值越高。<br><span class="red">注：四分位属性以行业排名为比较基准。</span></div>',
        td_6: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为毛利与销售收入的比率。毛利率越高，公司产品附加值越高，赚钱效率越高。<br><span class="red">注：四分位属性以行业排名为比较基准。</span></div>',
        td_7: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为净利润与主营业务收入的比率。该指标表示企业每单位资产能获得净利润的数量，这一比率越高，说明企业全部资产的盈利能力越强。<br><span class="red">注：四分位属性以行业排名为比较基准。</span></div>',
        td_8: '<div class="sfwsx_title" style = "display: none; margin-left:55px;margin-top:-40px;">公式为税后利润与净资产的比率。该指标反映股东权益的收益水平，用以衡量公司运用自有资本的效率。指标值越高，说明投资带来的收益越高。<br><span class="red">注：四分位属性以行业排名为比较基准。</span></div>'
    };
    model_3 = {
        name: '<b>四分位属性</b><b class="showRedTips hxsjccsyl" id="cwzb_sfwsxTit">' + text.td_0 + "</b>",
        zsz: rankFun(obj.f3020) + "<p> " + getDesc(obj.f3020) + "</p>" + text.td_1,
        jzc: rankFun(obj.f3135) + "<p> " + getDesc(obj.f3135) + "</p>" + text.td_2,
        jlr: rankFun(obj.f3045) + "<p> " + getDesc(obj.f3045) + "</p>" + text.td_3,
        syl: rankFun(obj.f3009, obj.f9, "syl") + "<p> " + getDesc(obj.f3009, obj.f9, "市盈率") + "</p>" + text.td_4,
        sjl: rankFun(obj.f3023, obj.f23, "sjl") + "<p> " + getDesc(obj.f3023, obj.f23, "市净率") + "</p>" + text.td_5,
        mll: rankFun(obj.f3049) + "<p> " + getDesc(obj.f3049) + "</p>" + text.td_6,
        jll: rankFun(obj.f3129) + "<p> " + getDesc(obj.f3129) + "</p>" + text.td_7,
        ROE: rankFun(obj.f3037) + "<p> " + getDesc(obj.f3037) + "</p>" + text.td_8
    };
    return model_3
}
function getDesc(rank, num, dir) {
    var item = "";
    var $html = '- - <b title="' + dir + '为负值，不参与四分位排名" class="hxsjccsyl" style="margin - top: 5px;"></b>';
    if (dir) {
        var _num = parseFloat(num);
        if (_num >= 0) {
            if (parseInt(rank)) {
                if (0 < rank < 5) {
                    var desc = ["高", "较高", "较低", "低"];
                    item = desc[rank - 1]
                } else {
                    item = "- -"
                }
            } else {
                item = $html
            }
        } else {
            if (_num < 0) {
                item = $html
            } else {
                item = "- -"
            }
        }
    } else {
        if (parseInt(rank)) {
            if (0 < rank < 5) {
                var desc = ["高", "较高", "较低", "低"];
                item = desc[rank - 1]
            } else {
                item = "- -"
            }
        } else {
            item = $html
        }
    }
    return item
}
function rankFun(str, num, dir) {
    var _str = Number(str);
    var bgColor_1 = ""
      , bgColor_2 = ""
      , bgColor_3 = ""
      , bgColor_4 = "";
    if (dir) {
        var _num = parseFloat(num);
        if (_num >= 0) {
            _str = _str
        } else {
            _str = 0
        }
        if (_str >= 1) {
            bgColor_1 = "#deecff"
        }
        if (_str >= 2) {
            bgColor_2 = "#c4ddff"
        }
        if (_str >= 3) {
            bgColor_3 = "#a3cbff"
        }
        if (_str >= 4) {
            bgColor_4 = "#78b1ff"
        }
    } else {
        if (_str <= 1) {
            bgColor_1 = "#78b1ff"
        }
        if (_str <= 2) {
            bgColor_2 = "#a3cbff"
        }
        if (_str <= 3) {
            bgColor_3 = "#c4ddff"
        }
        if (_str <= 4) {
            bgColor_4 = "#deecff"
        }
    }
    if (dir) {
        var list = '<ul class="showRedTips">' + '<li style="background-color: ' + bgColor_4 + '"></li>' + '<li style="background-color: ' + bgColor_3 + '"></li>' + '<li style="background-color: ' + bgColor_2 + '"></li>' + '<li style="border-bottom:none;background-color: ' + bgColor_1 + '"></li>' + "</ul >"
    } else {
        var list = '<ul class="showRedTips">' + '<li style="background-color: ' + bgColor_1 + '"></li>' + '<li style="background-color: ' + bgColor_2 + '"></li>' + '<li style="background-color: ' + bgColor_3 + '"></li>' + '<li style="border-bottom:none;background-color: ' + bgColor_4 + '"></li>' + "</ul >"
    }
    return list
}
function phrankS() {
    var def = "C";
    var sed = $x("select2").getElementsByTagName("span")[0].getAttribute("value");
    if (sed != null) {
        def = sed
    }
    phrankk();
    phrank(def)
}
function phrankk() {
    var url = "http://push2.eastmoney.com/api/qt/slist/get?pi=0&pz=5&po=1&spt=4&fields=f2,f12,f13,f14,f15,f3,f4,f6,f5,f11,f10&ut=fa5fd1943c7b386f172d6893dbfba10b&secid=" + _this._Market_10 + "." + _this._Code + "&fid=f3";
    $.ajax({
        url: url,
        dataType: "jsonp",
        scriptCharset: "utf-8",
        jsonp: "cb",
        success: function(json) {
            var count = json.data.total >= 5 ? 5 : json.data.total;
            var item = [];
            var html = "";
            var xggp = [];
            for (var i = 0; i < count; i++) {
                item = json.data.diff[i];
                var color = item.f3 >= 0 ? "red" : "green";
                var market = item.f13 == "1" ? "sh" : "sz";
                xggp.push('<li><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f14 + '">' + cutstr(item.f14, 8) + "</a>(" + (item.f15 / 100).toFixed(2) + " <span class=" + color + ">" + (item.f3 / 100).toFixed(2) + "%" + "</span>)</li>")
            }
            $x("xggp").innerHTML = xggp.toString().replace(/,/g, "")
        }
    })
}
function phrank(def) {
    var fids = {
        "C": "f3",
        "D": "f4",
        "E": "f6",
        "F": "f5",
        "G": "f11",
        "H": "f10"
    };
    var sytn = {
        "C": "涨跌幅",
        "D": "涨跌",
        "E": "成交额",
        "F": "成交量",
        "G": "涨跌幅",
        "H": "量比"
    };
    var url = "http://push2.eastmoney.com/api/qt/slist/get?pi=0&pz=5&po=1&spt=4&fields=f2,f12,f13,f14,f2,f3,f4,f6,f5,f11,f10&ut=fa5fd1943c7b386f172d6893dbfba10b&secid=" + _this._Market_10 + "." + _this._Code + "&fid=" + fids[def];
    $.ajax({
        url: url,
        dataType: "jsonp",
        scriptCharset: "utf-8",
        jsonp: "cb",
        success: function(json) {
            var count = json.data.total >= 5 ? 5 : json.data.total;
            var item = [];
            var html = "";
            $x("pytitnme").innerHTML = sytn[def];
            for (var i = 0; i < count; i++) {
                item = json.data.diff[i];
                var color = item.f3 >= 0 ? "red" : "green";
                var market = item.f13 == "1" ? "sh" : "sz";
                switch (def) {
                case "C":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + '<td class="' + color + '">' + (item.f3 / 100).toFixed(2) + "%" + "</td></tr>";
                    break;
                case "D":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + '<td class="' + color + '">' + (item.f4 / 100).toFixed(2) + "</td></tr>";
                    break;
                case "E":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + "<td>" + (item.f6 / 100000000).toFixed(2) + "亿" + "</td></tr>";
                    break;
                case "F":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + "<td>" + (item.f5 / 10000).toFixed(2) + "万" + "</td></tr>";
                    break;
                case "G":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + '<td class="' + color + '">' + (item.f11 / 100).toFixed(2) + "%" + "</td></tr>";
                    break;
                case "H":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + "<td>" + (item.f10 / 100).toFixed(2) + "</td></tr>";
                    break;
                default:
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + item.f2 / 100 + "%" + "</td>" + '<td class="' + color + '">' + item.f3 / 100 + "%" + "</td></tr>";
                    break
                }
            }
            $("#pylist").html(html)
        }
    })
}
function phrank_sse(def) {
    var fids = {
        "C": "f3",
        "D": "f4",
        "E": "f6",
        "F": "f5",
        "G": "f11",
        "H": "f10"
    };
    var sytn = {
        "C": "涨跌幅",
        "D": "涨跌",
        "E": "成交额",
        "F": "成交量",
        "G": "涨跌幅",
        "H": "量比"
    };
    var url = "http://" + (Math.floor(Math.random() * 99) + 1) + ".push2.eastmoney.com/api/qt/slist/sse?pi=0&pz=5&po=1&spt=4&fields=f12,f13,f14,f2,f3,f4,f6,f5,f11,f10&ut=fa5fd1943c7b386f172d6893dbfba10b&secid=" + _this._Market_10 + "." + _this._Code + "&fid=" + fids[def];
    var evtSource = new EventSource(url);
    evtSource.onmessage = function(msg) {
        var json = msg.data;
        if (json.data) {
            var item = [];
            var html = "";
            $x("pytitnme").innerHTML = sytn[def];
            for (var i = 0; i < 5; i++) {
                item = json.data.diff[i];
                var color = item.f3 >= 0 ? "red" : "green";
                var market = item.f13 == "1" ? "sh" : "sz";
                switch (def) {
                case "C":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + '<td class="' + color + '">' + (item.f3 / 100).toFixed(2) + "%" + "</td></tr>";
                    break;
                case "D":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + '<td class="' + color + '">' + (item.f4 / 100).toFixed(2) + "</td></tr>";
                    break;
                case "E":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + "<td>" + (item.f6 / 100000000).toFixed(2) + "亿" + "</td></tr>";
                    break;
                case "F":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + "<td>" + (item.f5 / 10000).toFixed(2) + "万" + "</td></tr>";
                    break;
                case "G":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + '<td class="' + color + '">' + (item.f11 / 100).toFixed(2) + "%" + "</td></tr>";
                    break;
                case "H":
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + (item.f2 / 100).toFixed(2) + "</td>" + "<td>" + (item.f10 / 100).toFixed(2) + "</td></tr>";
                    break;
                default:
                    html += '<tr><td class="nm"><a href="http://quote.eastmoney.com/' + market + item.f12 + '.html" target="_blank" title="' + item.f12 + '">' + cutstr(item.f14, 8) + "</a></td>" + '<td class="' + color + '">' + item.f2 / 100 + "%" + "</td>" + '<td class="' + color + '">' + item.f3 / 100 + "%" + "</td></tr>";
                    break
                }
            }
            $("#pylist").html(html)
        }
    }
}
function imgLoader(setting) {
    if (typeof (setting) !== "object" || !setting["url"]) {
        return false
    }
    var fCallback = typeof (setting["success"]) === "function" ? setting["success"] : null;
    var _url = setting["url"];
    if (setting["data"]) {
        var _data = $.param(setting["data"]);
        _url = _url.indexOf("?") > 0 ? _url + "&" + _data : _url + "?" + _data
    }
    if (!setting["cache"]) {
        _url += _url.indexOf("?") > 0 ? "&_=" + (+new Date()) : "?_=" + (+new Date())
    }
    var _image = document.createElement("img");
    if (typeof (setting["height"]) === "number" && setting["height"] > 0) {
        _image.setAttribute("height", setting["height"] + "px")
    }
    if (typeof (setting["width"]) === "number" && setting["width"] > 0) {
        _image.setAttribute("width", setting["width"] + "px")
    }
    _image.setAttribute("src", _url);
    if (typeof (setting["error"]) === "function") {
        $(_image).error(function() {
            setting["error"](_image)
        })
    }
    _image.onload = _image.onreadystatechange = function(evt) {
        if (!_image.readyState || /loaded|complete/.test(_image.readyState)) {
            _image.onload = _image.onreadystatechange = null;
            if (fCallback) {
                fCallback(_image)
            }
        }
    }
    ;
    return _image
}
function GetDP() {
    window.dpzs = 1;
    this.dis = function() {
        if (window.GetTimeZoneInfo == true || window.dpzs == 1) {
            $.getScript(gdomain + "CompatiblePage.aspx?Type=C&jsName=js_dp&ino=0000011,3990012&Reference=xml&rt=" + Math.random(), function() {
                var jnm = eval("js_dp");
                if (jnm.dpif != null && jnm.dpif != "") {
                    var tem_shdp = jnm.dpif[0].split(",");
                    var tem_szdp = jnm.dpif[1].split(",");
                    $("#qqgs1").html('<p><a href="http://quote.eastmoney.com/zs000001.html" target="_blank" class="blue">上证</a>：<span style="' + udcolor(tem_shdp[4]) + '"><b>' + tem_shdp[3] + "</b> " + udt(tem_shdp[4]) + "<b>" + tem_shdp[4] + "</b>  " + udt(tem_shdp[4]) + "<b>" + tem_shdp[5] + "  " + ForDight(tem_shdp[6] / 10000, 2) + '</b></span>亿元&nbsp;(涨:<a href="http://quote.eastmoney.com/center/list.html#10_0_0_u?sortType=C&sortRule=-1" target="_blank" class="red"><b>' + tem_shdp[7] + "</b></a> 平:<b>" + tem_shdp[8] + '</b> 跌:<a href="http://quote.eastmoney.com/center/list.html#10_0_0_d?sortType=C&sortRule=1" target="_blank" class="green"><b>' + tem_shdp[9] + '</b></a>)</p><p><a href="http://quote.eastmoney.com/zs399001.html" target="_blank" class="blue">深证</a>：<span style="' + udcolor(tem_szdp[4]) + '"><b>' + tem_szdp[3] + "</b> " + udt(tem_szdp[4]) + "<b>" + tem_szdp[4] + "</b>  " + udt(tem_szdp[4]) + "<b>" + tem_szdp[5] + "  " + ForDight(tem_szdp[6] / 10000, 2) + '</b></span>亿元&nbsp;(涨:<a href="http://quote.eastmoney.com/center/list.html#20_0_0_u?sortType=C&sortRule=-1" target="_blank" class="red"><b>' + tem_szdp[7] + "</b></a> 平:<b>" + tem_szdp[8] + '</b> 跌:<a href="http://quote.eastmoney.com/center/list.html#20_0_0_d?sortType=C&sortRule=1" target="_blank" class="green"><b>' + tem_szdp[9] + "</b></a>)</p>")
                }
                window.dpzs = 0
            })
        }
    }
}
function showMore(tp, obj) {
    var over = $x("xh" + tp + obj).style.display = "block"
}
function hideall(tp, obj) {
    var over = $x("xh" + tp + obj).style.display = "none"
}
function hotpersonafp(uid, oid, marketcode) {
    var iscks = false;
    if (GetCookie("pi")) {
        var gcks = Getcks("pi");
        if (gcks.split(";").length >= 3) {
            var name = gcks.split(";")[2];
            if (/^[\u4E00-\u9FA5][0-9a-zA-Z]{6}$/g.test(name)) {
                iscks = true
            } else {
                var url = "http://iguba.eastmoney.com/action.aspx?callback=&action=oaddfollowperson&uid2=" + uid;
                $.getScript(url + "&v=" + formatm(), function() {
                    oid.className = "allow";
                    oid.innerHTML = "";
                    oid.onclick = null
                })
            }
        } else {
            iscks = true
        }
    } else {
        iscks = true
    }
    if (iscks) {
        location.href = "http://passport2.eastmoney.com/pub/login?backurl=http://quote.eastmoney.com/" + marketcode + ".html"
    }
}
function fmtdig(Data, Mat, F, Unit, AutoF) {
    var res = Data;
    if (Data != "" && Data != "--" && Data != "-") {
        var _temp = Math.abs(parseFloat(Data));
        var temp = parseFloat(Data);
        if (AutoF) {
            if (_temp > 1000000000000) {
                Mat = 100000000;
                Unit = "亿";
                F = "0"
            } else {
                if (_temp > 100000000000) {
                    Mat = 100000000;
                    Unit = "亿";
                    F = "0"
                } else {
                    if (_temp > 10000000000) {
                        Mat = 100000000;
                        Unit = "亿";
                        F = "1"
                    } else {
                        if (_temp > 1000000000) {
                            Mat = 100000000;
                            Unit = "亿";
                            F = "2"
                        } else {
                            if (_temp > 100000000) {
                                Mat = 100000000;
                                Unit = "亿";
                                F = "2"
                            } else {
                                if (_temp > 10000000) {
                                    Mat = 10000;
                                    Unit = "万";
                                    F = "0"
                                } else {
                                    if (_temp > 1000000) {
                                        Mat = 10000;
                                        Unit = "万";
                                        F = "1"
                                    } else {
                                        if (_temp > 100000) {
                                            Mat = 10000;
                                            Unit = "万";
                                            F = "2"
                                        } else {
                                            if (_temp > 10000) {
                                                Mat = 10000;
                                                Unit = "万";
                                                F = "2"
                                            } else {
                                                if (_temp > 1000) {
                                                    Mat = 1;
                                                    Unit = "";
                                                    F = "2"
                                                } else {
                                                    if (_temp > 100) {
                                                        Mat = 1;
                                                        Unit = "";
                                                        F = "2"
                                                    } else {
                                                        if (_temp > 10) {
                                                            Mat = 1;
                                                            Unit = "";
                                                            F = "2"
                                                        } else {
                                                            Mat = 1;
                                                            Unit = "";
                                                            F = "3"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        res = ForDight((temp / Mat), F)
    }
    return res + Unit
}
function formatm() {
    var now = new Date();
    return now.getTime()
}
function toFixed(data, num) {
    if (data === "" || data === undefined || data === null || data === "-" || isNaN(data)) {
        return "-"
    }
    num = isNaN(parseInt(num)) ? 2 : parseInt(num);
    return parseFloat(data).toFixed(num)
}
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range))
}
function showimg() {
    $x("image_box").style.display = "block";
    $x("js_box").style.display = "none";
    window.zxgIsFirst = true;
    window.quoteIsFirst = true;
    Def.DisQuote();
    $x("ov3").className = "emhqbov3 mb10";
    $x("flsrmt7").className = "title1 mt6";
    WriteCookie("em_hq_fls", "old", 99999)
}
function SectionToChinese(section) {
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    var chnUnitChar = ["", "十", "百", "千"];
    if (section / 10 < 2 && section / 10 > 1) {
        return ("十" + chnNumChar[section % 10])
    } else {
        if (section / 10 == 1) {
            return ("十")
        } else {
            var strIns = ""
              , chnStr = "";
            var unitPos = 0;
            var zero = true;
            while (section > 0) {
                var v = section % 10;
                if (v === 0) {
                    if (!zero) {
                        zero = true;
                        chnStr = chnNumChar[v] + chnStr
                    }
                } else {
                    zero = false;
                    strIns = chnNumChar[v];
                    strIns += chnUnitChar[unitPos];
                    chnStr = strIns + chnStr
                }
                unitPos++;
                section = Math.floor(section / 10)
            }
            return chnStr
        }
    }
}
function showjs() {
    $x("image_box").style.display = "none";
    $x("js_box").style.display = "block";
    window.zxgIsFirst = true;
    window.quoteIsFirst = true;
    $x("ov3").className = "emhqbov3 mb10";
    $x("flsrmt7").className = "title1 mt6";
    WriteCookie("em_hq_fls", "js", 99999)
}
function showfls() {
    $x("image_box").style.display = "none";
    window.zxgIsFirst = true;
    window.quoteIsFirst = true;
    Def.DisQuote();
    $x("js_box").style.display = "none";
    $x("ov3").className = "emhqbov3 mb9";
    $x("flsrmt7").className = "title1 mt13";
    WriteCookie("em_hq_fls", "new", 99999);
    var picrtr = $x("actTab1").getElementsByTagName("span");
    var picrtk = $x("actTab2").getElementsByTagName("span");
    picrtr[1].click();
    picrtk[0].click()
}
function smivckNew(code, znum, dnum) {
    var pi = "";
    var islow = $('input:radio[name="hqvote"]:checked').val();
    if (!islow) {
        alert("请先选择投票方向！");
        return
    }
    if (GetCookie("pi")) {
        pi = GetCookie("pi")
    }
    var url = "http://hqstat.eastmoney.com/vote/QuoteGuBaLookUpOrDown.aspx?code=" + code + "&islow=" + islow + "&pi=" + pi + "&cb=var%20res=[{0}]&&num=1&rt=" + formatm();
    Mini.Loader.load(url, "gb2312", function() {
        alert(res[0].me);
        if (res[0].rc == 1) {
            switch (islow) {
            case "false":
                znum++;
                break;
            case "true":
                dnum++;
                break
            }
            zdpc = znum + dnum;
            zhang = (znum / zdpc * 100).toFixed(1);
            die = (dnum / zdpc * 100).toFixed(1);
            $x("ivap").innerHTML = zhang + "%";
            $x("ivbp").innerHTML = die + "%";
            $x("ivra").style.width = (zhang / 110 * 100).toFixed(1) + "px";
            $x("ivrb").style.width = (die / 110 * 100).toFixed(1) + "px";
            $x("ivbv").innerHTML = '<span style="color: #A1A1A1;background-color:#E4E4E4;display: inline-block;height: 20px;line-height: 20px;padding: 0 6px;border: 0 none;text-align: center;">已投票</span>'
        } else {
            if (res[0].rc == 0) {
                $x("ivbv").innerHTML = '<span style="color: #A1A1A1;background-color:#E4E4E4;display: inline-block;height: 20px;line-height: 20px;padding: 0 6px;border: 0 none;text-align: center;">已投票</span>'
            }
        }
    })
}
function smivck(code, islow, znum, dnum, el) {
    var pi = "";
    if (GetCookie("pi")) {
        pi = GetCookie("pi")
    }
    var url = "http://hqstat.eastmoney.com/vote/QuoteGuBaLookUpOrDown.aspx?code=" + code + "&islow=" + islow + "&pi=" + pi + "&cb=var%20res=[{0}]&&num=1&rt=" + formatm();
    Mini.Loader.load(url, "gb2312", function() {
        alert(res[0].me);
        if (res[0].rc == 1) {
            switch (islow) {
            case "false":
                znum++;
                break;
            case "true":
                dnum++;
                break
            }
            zdpc = znum + dnum;
            zhang = (znum / zdpc * 100).toFixed(1);
            die = (dnum / zdpc * 100).toFixed(1);
            $x("ivap").innerHTML = zhang + "%";
            $x("ivbp").innerHTML = die + "%";
            $x("ivra").style.width = (zhang / 110 * 100).toFixed(1) + "px";
            $x("ivrb").style.width = (die / 110 * 100).toFixed(1) + "px"
        }
    })
}
function getdomain(min, max) {
    var min = 1;
    var max = 10;
    var res = "nufm3.dfcfw.com";
    var m2 = "nufm2.dfcfw.com";
    var rom = GetRandomNum(min, max);
    if (rom != "1" && rom != "2" && rom != "3") {
        res = m2
    }
    return "nufm.dfcfw.com"
}
function isSupportCanvas() {
    var elem = document.createElement("canvas");
    return !!(elem.getContext && elem.getContext("2d"))
}
var cookie = {
    get: function(name) {
        var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (xarr != null) {
            return decodeURIComponent(xarr[2])
        }
        return null
    },
    set: function(key, value, expiredays, domain) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/;domain=" + domain
    },
    del: function(key, domain) {
        var exdate = new Date((new Date).getTime() - 1);
        if (domain) {
            document.cookie = key + "=;path=/;expires=" + exdate.toGMTString() + ";domain=" + domain
        } else {
            document.cookie = key + "=;path=/;expires=" + exdate.toGMTString()
        }
    }
};
var bid = {
    get: function() {
        var zw = cookie.get("qgqp_b_id");
        if (zw == null) {
            return this.make()
        } else {
            return zw
        }
    },
    make: function() {
        var newid = Math.floor(Math.random() * 9 + 1).toString();
        for (var i = 0; i < 19; i++) {
            newid += Math.floor(Math.random() * 9).toString()
        }
        cookie.set("qgqp_b_id", newid, 10000, ".eastmoney.com");
        return newid
    },
    init: function() {
        if (this.get() == null || this.get() == "") {
            return this.make()
        } else {
            return this.get()
        }
    }
};
function getUserZW(callback) {
    function save(fingerprint) {
        if (fingerprint) {
            cookie.set("qgqp_b_id", fingerprint, 10000, ".eastmoney.com")
        }
    }
    if (isSupportCanvas()) {
        new Fingerprint2({
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
        }).get(function(result, components) {
            save(result);
            callback(result, components);
            return
        })
    } else {
        callback(bid.init());
        return
    }
}
;
function quote_phf() {
    this.Browser = {
        ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
        ie11: /trident/.test(window.navigator.userAgent.toLowerCase()),
        moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
        opera: /opera/.test(window.navigator.userAgent.toLowerCase()),
        safari: /safari/.test(window.navigator.userAgent.toLowerCase())
    };
}
//收藏
quote_phf.prototype.addBookMark = function () {
    var title = document.title;
    var url = location.href;
    if (window.sidebar) { window.sidebar.addPanel(title, url, ""); }
    else if (document.all) {
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        return true;
    }
};
//收藏
quote_phf.prototype.addBookEM = function () {
    var title = "东方财富网——中国财经证券门户网站";
    var url = "http://www.eastmoney.com/";
    if (window.sidebar) { window.sidebar.addPanel(title, url, ""); }
    else if (document.all) {
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        return true;
    }
};
//查行情
quote_phf.prototype.toQuote = function () {
    _this = this;
    stockcode_current = _this.trim(this.$(("StockCode")).value);
    if (stockcode_current == "输代码、名称或简拼" || stockcode_current == "") { window.open('http://quote.eastmoney.com/'); return false; }
    var re = /[0-9]{6}/; var re2 = /[0-9]{1,}/; var re3 = /[^0-9]{1,}/;
    bool1 = stockcode_current.match(re); bool2 = stockcode_current.match(re2); bool3 = stockcode_current.match(re3);
    if (bool1 != null && stockcode_current.length == 6) {
        window.open('http://quote.eastmoney.com/search.html?stockcode=' + escape(stockcode_current)); return false;
    }
    else {
        if (bool2 != null && bool3 == null && stockcode_current.length < 3) { alert("股票代码至少输入3位！"); return false; }
        if (bool2 == null && bool3 != null && stockcode_current.length < 2) { alert("模糊查询时关键字至少2位！"); return false; }
        window.open('http://quote.eastmoney.com/search.html?stockcode=' + escape(stockcode_current)); return false;
    }
    return (false);
};
//进股吧
quote_phf.prototype.toGuBa = function () {
    stockcode_current = this.$(("StockCode")).value;
    if (stockcode_current == "输代码、名称或简拼" || stockcode_current == "") { window.open('http://guba.eastmoney.com/'); return false; }
    //var re=/[0-9]{6}/; 
    //bool1=stockcode_current.match(re);
    //if(bool1!=null){window.open('http://guba.eastmoney.com/topic,'+stockcode_current+'.html');}
    //else{window.open('http://quote.eastmoney.com/search.html?toba=1&stockcode='+escape(stockcode_current));}
    window.open('http://quote.eastmoney.com/search.html?toba=1&stockcode=' + escape(stockcode_current));
};
//查资讯
quote_phf.prototype.toNews = function () {
    stockcode_current = this.$(("StockCode")).value;
    if (stockcode_current == "输代码、名称或简拼") { window.open('http://so.eastmoney.com/'); } else { window.open('http://so.eastmoney.com/Search.htm?q=' + escape(stockcode_current) + '&t=2'); }
};
quote_phf.prototype.getIndexQuote = function (RefreshTime) {
    var _this = this;
    _this.init = function () {
        _this.bindCLK();
        _this.display();
        _this.gethgts();
        if (RefreshTime != "" && RefreshTime != "undefined" && RefreshTime != null) { setInterval(_this.display, 60 * 1000); setInterval(_this.gethgts, 50000); }

        _this.zxjjHref();
        _this.portfolio();
        _this.headlines();
    };
    _this.display = function () {
        var xvs = parseInt(_this.$("qqgscont").getAttribute("xvs"));
        switch (xvs) {
            case 1:
                var secids = "100.DJIA,100.NDX,100.N225,100.HSI";
                var obj = [
                    {
                        link: "gb/zsINDU.html",
                        name: "道琼斯"
                    },
                    {
                        link: "gb/zsCCMP.html",
                        name: "纳斯达克"
                    },
                    {
                        link: "gb/zsNKY.html",
                        name: "日经"
                    },
                    {
                        link: "gb/zs110000.html",
                        name: "恒生"
                    }
                ]
                _this.qqgsLoad(secids, obj);
                break;
            case 2:
                var secids = "100.GDAXI,100.FCHI,100.FTSE,100.ATX";
                var obj = [
                    {
                        link: "gb/zsDAX.html",
                        name: "德DAX"
                    },
                    {
                        link: "gb/zsCAC.html",
                        name: "法CAC"
                    },
                    {
                        link: "gb/zsUKX.html",
                        name: "英FT"
                    },
                    {
                        link: "gb/zsATX.html",
                        name: "奥ATX"
                    }
                ]
                _this.qqgsLoad(secids, obj);
                break;
            default:
                var secids = "1.000001,0.399001";
                var obj = [
                    {
                        link: "zs000001.html",
                        name: "上证"
                    },
                    {
                        link: "zs399001.html",
                        name: "深证"
                    }

                ]
                _this.qqgsLoad(secids, obj);


        }
    };
    //全球股市
    _this.qqgsLoad = function (secids, obj) {
        //var mathNum = Math.floor(Math.random() * 100);//接口加随机数 
        var _url = "https://push2.eastmoney.com/api/qt/ulist.np/get?fid=f3&pi=0&pz=20&po=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&fields=f2,f3,f4,f6,f104,f105,f106&np=1&cb=qqgsData=&secids=" + secids;
        _this.JsLoader(_url, 'utf-8', function () {
            var _qqgsData = eval("qqgsData");
            if (_qqgsData && _qqgsData.data) {
                var items = _qqgsData.data.diff;
                if (items.length > 0) {
                    var link = "//quote.eastmoney.com/";
                    if (obj.length > 2) {
                        var tem_a = items[0],
                            tem_b = items[1],
                            tem_c = items[2],
                            tem_d = items[3];

                        var obj_a = obj[0], obj_b = obj[1], obj_c = obj[2], obj_d = obj[3];

                        //道琼斯,纳斯达克,日经,恒生                                
                        var _temstrs = "<a href='" + link + obj_a.link + "'target=\"_blank\" class=\"blue\"><strong>" + obj_a.name + "</strong></a> <span style=\"" + _this.udcolor(tem_a.f3) + "\"><b>" + _this.toFixedFun(tem_a.f2) + "</b> " + _this.zdbjt(tem_a.f3) + "<b>" + _this.toFixedFun(tem_a.f4) + "</b> " + _this.zdbjt(tem_a.f3) + "<b>" + _this.addPercent(tem_a.f3) + "</b></span>";
                        _temstrs += "<a href='" + link + obj_b.link + "'target=\"_blank\" class=\"blue\"><strong>" + obj_b.name + "</strong></a> <span style=\"" + _this.udcolor(tem_b.f3) + "\"><b>" + _this.toFixedFun(tem_b.f2) + "</b> " + _this.zdbjt(tem_b.f3) + "<b>" + _this.toFixedFun(tem_b.f4) + "</b> " + _this.zdbjt(tem_b.f3) + "<b>" + _this.addPercent(tem_b.f3) + "</b></span>";
                        _temstrs += "<a href='" + link + obj_c.link + "'target=\"_blank\" class=\"blue\"><strong>" + obj_c.name + "</strong></a> <span style=\"" + _this.udcolor(tem_c.f3) + "\"><b>" + _this.toFixedFun(tem_c.f2) + "</b> " + _this.zdbjt(tem_c.f3) + "<b>" + _this.toFixedFun(tem_c.f4) + "</b> " + _this.zdbjt(tem_c.f3) + "<b>" + _this.addPercent(tem_c.f3) + "</b></span>";
                        _temstrs += "<a href='" + link + obj_d.link + "'target=\"_blank\" class=\"blue\"><strong>" + obj_d.name + "</strong></a> <span style=\"" + _this.udcolor(tem_d.f3) + "\"><b>" + _this.toFixedFun(tem_d.f2) + "</b> " + _this.zdbjt(tem_d.f3) + "<b>" + _this.toFixedFun(tem_d.f4) + "</b> " + _this.zdbjt(tem_d.f3) + "<b>" + _this.addPercent(tem_d.f3) + "</b></span>";

                    } else if (0 < obj.length < 4) {
                        var tem_a = items[0],
                            tem_b = items[1];

                        var obj_a = obj[0], obj_b = obj[1];

                        var _temstrs = "<a href='" + link + obj_a.link + "' target=\"_blank\" class=\"blue\"><strong>" + obj_a.name + "</strong></a>：<span style=\"" + _this.udcolor(tem_a.f3) + "\"><b>" + _this.toFixedFun(tem_a.f2) + "</b> " + _this.zdbjt(tem_a.f3) + "<b>" + _this.toFixedFun(tem_a.f4) + "</b> <b>" + _this.addPercent(tem_a.f3) + "  " + _this.ForDight(tem_a.f6 / 100000000, 2) + "</b></span>亿元(涨:<a href=\"http://quote.eastmoney.com/center/list.html#10_0_0_u?sortType=C&sortRule=-1\" target=\"_blank\" class=\"red\"><b>" + tem_a.f104 + "</b></a> 平:<b>" + tem_a.f106 + "</b> 跌:<a href=\"http://quote.eastmoney.com/center/list.html#10_0_0_d?sortType=C&sortRule=1\" target=\"_blank\" class=\"green\"><b>" + tem_a.f105 + "</b></a>)";
                        _temstrs += "<a href='" + link + obj_b.link + "' target=\"_blank\" class=\"blue\"><strong>" + obj_b.name + "</strong></a>：<span style=\"" + _this.udcolor(tem_b.f3) + "\"><b>" + _this.toFixedFun(tem_b.f2) + "</b> " + _this.zdbjt(tem_b.f3) + "<b>" + _this.toFixedFun(tem_b.f4) + "</b> <b>" + _this.addPercent(tem_b.f3) + "  " + _this.ForDight(tem_b.f6 / 100000000, 2) + "</b></span>亿元(涨:<a href=\"http://quote.eastmoney.com/center/list.html#20_0_0_u?sortType=C&sortRule=-1\" target=\"_blank\" class=\"red\"><b>" + tem_b.f104 + "</b></a> 平:<b>" + tem_b.f106 + "</b> 跌:<a href=\"http://quote.eastmoney.com/center/list.html#20_0_0_d?sortType=C&sortRule=1\" target=\"_blank\" class=\"green\"><b>" + tem_b.f105 + "</b></a>)";

                    }
                    _this.$("qqgscont").innerHTML = "<ul><li>" + _temstrs + "</li></ul>";

                }
            }
        })

    };



    //头部自选基金强制换链接
    _this.zxjjHref = function () {
        var box = _this.getClassNames("qmbox", "div");
        box[0].getElementsByTagName('li')[28].children[0].setAttribute("href", 'http://favor.fund.eastmoney.com/');
    }
    _this.getClassNames = function (classStr, tagName) {
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(classStr)
        } else {
            var nodes = document.getElementsByTagName(tagName), ret = [];
            for (i = 0; i < nodes.length; i++) {
                if (_this.hasClass(nodes[i], classStr)) {
                    ret.push(nodes[i])
                }
            }
            return ret;
        }
    }
    _this.hasClass = function (tagStr, classStr) {
        var arr = tagStr.className.split(/\s+/);  //这个正则表达式是因为class可以有多个,判断是否包含
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == classStr) {
                return true;
            }
        }
        return false;
    }




    // 沪深港通接口
    _this.gethgts = function () {
        _this.JsLoader("https://push2.eastmoney.com/api/qt/kamt/get?fields1=f1,f2,f3,f4&fields2=f51,f52,f53,f54&ut=b2884a393a59ad64002292a3e90d46a5&cb=hsgtData=&rt=" + Math.random(), 'utf-8', function () {
            var _hsgtData = eval("hsgtData");
            if (_hsgtData != undefined) {
                var item = _hsgtData.data
                if (item) {

                    var hgtzj = item.hk2sh.dayNetAmtIn == 0 ? '-' : _this.vsfmt(item.hk2sh.dayNetAmtIn, 1, 1),
                        sgtzj = item.hk2sz.dayNetAmtIn == 0 ? '-' : _this.vsfmt(item.hk2sz.dayNetAmtIn, 1, 1),
                        ggthzj = item.sh2hk.dayNetAmtIn == 0 ? '-' : _this.vsfmt(item.sh2hk.dayNetAmtIn, 1, 1),
                        ggtszj = item.sz2hk.dayNetAmtIn == 0 ? '-' : _this.vsfmt(item.sz2hk.dayNetAmtIn, 1, 1);

                    _this.$("hgtzj").innerHTML = hgtzj; // 沪股通
                    _this.$("sgtzj").innerHTML = sgtzj; // 深股通
                    _this.$("ggthzj").innerHTML = ggthzj; // 港股通(沪)
                    _this.$("ggtszj").innerHTML = ggtszj; // 港股通(深)   


                    if (item.hk2sh.status === 4) {
                        _this.$("hgtzj").innerHTML = "--";
                    }

                    if (item.hk2sz.status === 4) {
                        _this.$("sgtzj").innerHTML = "--";
                    }

                    if (item.sh2hk.status === 4) {
                        _this.$("ggthzj").innerHTML = "--";
                    }

                    if (item.sz2hk.status === 4) {
                        _this.$("ggtszj").innerHTML = "--";
                    }


                    _this.$("hgtrun").innerHTML = _this.GetGangGuTongPNG(item.hk2sh.status);
                    _this.$("sgtrun").innerHTML = _this.GetGangGuTongPNG(item.hk2sz.status);
                    _this.$("ggthrun").innerHTML = _this.GetGangGuTongPNG(item.sh2hk.status);
                    _this.$("ggtsrun").innerHTML = _this.GetGangGuTongPNG(item.sz2hk.status);
                }

            }
        })

    }

    _this.bindCLK = function () {
        var obu = _this.$("btn_up"); var obd = _this.$("btn_down"); var oj = _this.$("qqgscont");
        obu.onclick = function () { var xvs = parseInt(oj.getAttribute("xvs")); xvs++; if (xvs >= 3) { xvs = 0; } oj.setAttribute("xvs", xvs); _this.display(); };
        obd.onclick = function () { var xvs = parseInt(oj.getAttribute("xvs")); xvs--; if (xvs < 0) { xvs = 2; } oj.setAttribute("xvs", xvs); _this.display(); };
    };
    //投资组合  还未测试
    _this.portfolio = function () {
        if (!_this.$("zhrool")) return false;
        _this.JsLoader('https://quote.eastmoney.com/api/static/portfolio.json?cb=var%20portfolioData=', 'utf-8', function () {
            var _portfolioData = eval("portfolioData");
            // console.log(_portfolioData)
            if (_portfolioData) {
                var data = _portfolioData.data;
                var rd, rw, rm, ry;
                rd = data.ReturnRateDaily;
                rw = data.ReturnRateWeekly;
                rm = data.ReturnRateMonthly;
                ry = data.ReturnRateYearly;
                if (!rd || !rw || !rm || !ry) return false;
                // var $dom = $('zhrool');
                var $Html = ' <li><a href="http://group.eastmoney.com/index.html" target="_blank">高手日收益达<span>' + rd + '</span></a></li>' +
                    '<li><a href="http://group.eastmoney.com/index.html" target="_blank">高手周收益达<span>' + rw + '</span></a></li>' +
                    '<li><a href="http://group.eastmoney.com/index.html" target="_blank">高手月收益达<span>' + rm + '</span></a></li>' +
                    '<li><a href="http://group.eastmoney.com/index.html" target="_blank">高手年收益达<span>' + ry + '</span></a></li>';

                _this.$("zhrool").innerHTML = $Html + $Html;

                // var oMarquee = document.getElementById("zhrool"); var iLineHeight = 28; var iLineCount = 1; var iScrollAmount = 1;
                //_this.scrollTopFun()
                setTimeout(_this.scrollTopFun, 5000)
            }
        })
    };


    _this.scrollTopFun = function (num) {
        var oMarquee = document.getElementById("zhrool"); var iLineHeight = 28; var iLineCount = 4;
        var iScrollAmount = num ? num : 1;

        _this.$("zhrool").onmouserover = function () {
            _this.scrollTopFun(0)
            console.log(iScrollAmount, "iScrollAmount")
        }.onmouserout = function () {
            _this.scrollTopFun(1)
            console.log(iScrollAmount, "iScrollAmount")
        }
        oMarquee.scrollTop += iScrollAmount;
        if (oMarquee.scrollTop == iLineCount * iLineHeight)
            oMarquee.scrollTop = 0;
        if (oMarquee.scrollTop % iLineHeight == 0) {
            window.setTimeout(_this.scrollTopFun, 5000);
        } else {
            window.setTimeout(_this.scrollTopFun, 10);
        }
    };
    //头条
    _this.headlines = function () {
        if (!_this.$('head_toutiao')) return false;
        _this.JsLoader("https://quote.eastmoney.com/api/static/bulletin/1071/?cb=var%20toutiao=", 'utf-8', function () {
            var _toutiao = eval("toutiao");
            if (_this.$('ieTt')) {
                _this.$('ieTt').innerHTML = _toutiao;
                var _Html = _this.$('ieTt').getElementsByTagName("li")[0].children[0].innerHTML;
                _this.$('head_toutiao').setAttribute("title", _Html);
                _this.$('head_toutiao').innerHTML = _Html
            }
        })
    }
    _this.init();
};



quote_phf.prototype.formatm = function () {
    var now = new Date();
    return now.getDate() + "" + now.getHours() + "" + now.getMinutes() + "";
};
//随机数
quote_phf.prototype.GetRandomNum = function (Min, Max) { var Range = Max - Min; var Rand = Math.random(); return (Min + Math.round(Rand * Range)); };
quote_phf.prototype.gmain = function () {
    var _this = this;
    var min = 1; var max = 10;
    var res = "nufm2.dfcfw.com"; var m3 = "nufm3.dfcfw.com";
    var rom = _this.GetRandomNum(min, max);
    if (rom == "1" && rom == "2" && rom == "3" && rom == "4" && rom == "5" && rom == "6") { res = m3; }
    return "nufm.dfcfw.com"; //res;
};
quote_phf.prototype.udcolor = function (vsa, vsb) {
    vsa = String(vsa).replace("%", "");
    if (vsb == "" || vsb == null || vsb == "undefined") {
        if (vsa > 0) { return "color:#f00"; }
        else if (vsa < 0) { return "color:#090"; }
        else { return ""; }
    }
    else {
        vsb = vsb.replace("%", "");
        if (vsa - vsb > 0) { return "color:#f00"; }
        else if (vsa - vsb < 0) { return "color:#090"; }
        else { return ""; }
    }
};

quote_phf.prototype.udc = function (vs) {
    vs = Number((vs.toString()).replace("%", ""))
    if (vs > 0) {
        return " style=\"color:#f00\"";
    } else if (vs < 0) {
        return " style=\"color:#090\"";
    } else {
        return "";
    }
};
//添加百分号
quote_phf.prototype.addPercent = function (vs) {
    var num = parseFloat(vs), item;
    if (num == 0) {
        item = num.toFixed(2) + "%";
    } else if (num) {
        item = num.toFixed(2) + "%";
    } else {
        item = vs;
    }
    return item
}
//保留两位小数
quote_phf.prototype.toFixedFun = function (vs, tfx) {
    var num = parseFloat(vs), item = "-";
    var tofixed = tfx ? tfx : 2;
    if (num >= 0 || num <= 0) {
        item = num.toFixed(tofixed);
    }
    return item;
}

quote_phf.prototype.vsfmt = function (_vs, iscl, lk) {
    var res = "";
    if (_vs != "" && _vs != "-") {
        var str = _vs * 10000;
        var unit = "";

        var abs = Math.abs(str);
        if (abs + "" == "NaN") {
            return "-";
        } else {
            if (abs > 0 && abs < 10000) {
                unit = "";
            } else if (abs >= 10000 && abs < 100000000) {
                str = str / 10000;
                unit = "万"
            } else if (abs >= 100000000 && abs < 1000000000000) {
                str = str / 100000000;
                unit = "亿"
            } else if (abs >= 1000000000000) {
                str = str / 1000000000000;
                unit = "万亿"
            }
        }
        str = str.toFixed(2);
        if (iscl == 1) {
            if (lk == 1) {
                res = "<b><a href=\"http://data.eastmoney.com/hsgt/index.html\" target=\"_blank\"" + this.udc(str) + ">" + str + "</a></b>" + unit;
            } else {
                res = "<b" + this.udc(str) + ">" + str + "</b>" + unit;
            }
        } else {
            if (lk == 1) {
                res = "<b><a href=\"http://data.eastmoney.com/hsgt/index.html\" target=\"_blank\">" + str + "</a></b>" + unit;
            } else {
                res = "<b>" + str + "</b>" + unit;
            }
        }
    }
    return res.replace("元", "");

};

quote_phf.prototype.GetGangGuTongPNG = function (number) {
    var typeStr = "-";
    var type = parseFloat(number);
    if (type == "NaN" || isNaN(type)) {
        typeStr = '-';
        return typeStr;
    }
    switch (type) {
        case 1:
            typeStr = ' <b></b >有额度';
            break;
        case 2:
            typeStr = '<b class="off"></b>无额度';
            break;
        case 3:
            typeStr = '<b class="off"></b>收盘';
            break;
        case 4:
            typeStr = '<b class="off"></b>休市';
            break;
    }

    return typeStr;



    //switch (type) {    
    //    case 8: typeStr = '<b class="off"></b>5%熔断'; break;
    //    case 9: typeStr = '<b class="off"></b>7%熔断'; break;
    //    case 10: typeStr = '<b class="off"></b>-5%熔断'; break;
    //    case 11: typeStr = '<b class="off"></b>-7%熔断'; break;
    //}
    //    额度可用->有额度
    //    午盘休息->午休
    //    早盘清空 ->清空
    //    额度用完 ->无额度
    //    今日停牌 ->停牌
    //    股市收盘 ->收盘
    //    今日休市 ->休市
    //    限制买入 ->限买
    //    限制卖出 ->限卖
    //    暂停

};

quote_phf.prototype.zdbjt = function (vs) {
    if (vs > 0) { return "↑"; }
    else if (vs < 0) { return "↓"; }
    else { return ""; }
};

quote_phf.prototype.ForDight = function (Dight, How) {//四舍五入
    rDight = parseFloat(Dight).toFixed(How);
    if (rDight == "NaN") { rDight = "--"; }
    return rDight;
};

quote_phf.prototype.$ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

quote_phf.prototype.JsLoader = function (sUrl, sBianMa, fCallback) {
    var _script = document.createElement('script');
    _script.setAttribute('charset', sBianMa);
    _script.setAttribute('type', 'text/javascript');
    _script.setAttribute('src', sUrl);
    document.getElementsByTagName('head')[0].appendChild(_script);
    if (typeof _script.onreadystatechange !== "undefined") {
        _script.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                _script.parentNode.removeChild(_script);
                fCallback();
            }
        };
    } else if (typeof _script.onload !== "undefined") {
        _script.onload = function () {
            _script.parentNode.removeChild(_script);
            fCallback();
        };
    }
    else {
        _script.parentNode.removeChild(_script);
        fCallback();
    }
};
quote_phf.prototype.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};
var qphf = new quote_phf();
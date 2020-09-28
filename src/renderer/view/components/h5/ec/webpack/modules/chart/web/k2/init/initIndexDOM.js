/**
 * 初始化指标所需dom
 */


var coordinate = require("chart/common/coordinate");
var getDeviceType = require("chart/common/getDeviceType")

var slidebar = require("../sildebar");
var drawTitle = require("../drawTitle");
var drawIndexsV = require("../drawIndexsV");
var drawIndexsH = require("../drawIndexsH");
var drawBlockK = require("../drawBlockK");
var dataSplit = require("../dataSplit");

var popWinEvent = require("../popWinEvent");
var popWinEventForIpad = require("../popWinEventForIpad");

module.exports = {

    // 创建主图指标
    main: function drawKT() {
        var _this = this;
        var show = this.options.show;

        var mt = this.options.drawRegion.k.mt;        // 单位高度

        var sel = document.createElement("div");
        sel.className = "__quota";

        var qtip = document.createElement("div");
        qtip.className = "__qtip";
        qtip.innerHTML = "<span>均线</span><label></label>";
        sel.appendChild(qtip);

        //首先绘制出div
        var pad = document.createElement("div");
        pad.className = "kt-pad";
        var frag = document.createDocumentFragment();
        
        if (!show.fold) {
            qtip.style.display = "none";
            var kt_title = document.createElement("div");
            kt_title.className = "kt-title";
            kt_title.innerHTML = "主图指标";
            frag.appendChild(kt_title);
        } else {
            pad.style.display = "none";
        }

        var appendLine = function (name, frag, isDefault) {
            var container = document.createElement("div");
            container.className = "kt-line";
            if (isDefault) {
                container.className = "kt-line kt-radio-choose";
            }
            var radioWrap = document.createElement('div');
            radioWrap.className = "kt-radio-wrap";
            var radio = document.createElement("div");
            radioWrap.appendChild(radio);

            container.appendChild(radioWrap);
            var nameText = document.createElement("div");
            nameText.className = "kt-name";
            nameText.innerHTML = name;
            container.appendChild(nameText);

            frag.appendChild(container);
        };

        //添加各种kt指标进pad
        appendLine("无", frag, false);
        appendLine("均线", frag, true);
        appendLine("EXPMA", frag, false);
        appendLine("SAR", frag, false);
        appendLine("BOLL", frag, false);
        appendLine("BBI", frag, false);

        pad.appendChild(frag);

        var layerUI = this.layer.layerUI;

        sel.appendChild(pad);
        layerUI.appendChild(sel);

        sel.style.top = mt + "px";
        sel.style.right = "0";

        // 绑定事件
        sel.addEventListener("click", function (e) {
            // console.log("click")
            handle(e);
        });

        sel.addEventListener("touchend", function (e) {
            console.log("touchend")
            handle(e);
        });

        if (show.fold) {
            qtip.addEventListener("click", function(){
                if (pad.style.display == "block") {
                    pad.style.display = "none";
                } else {
                    pad.style.display = "block";
                }

                _this.options.onFold(pad.style.display, _this.stauts.indexv);
                
            });
        }

        function handle(e) {
            var data = _this.data;
            if (!data || !data.k) {
                return;
            }

            var currentTarget = e.srcElement || e.target;

            if (currentTarget.className != "kt-radio-wrap" && currentTarget.className != "kt-name") {
                return;
            }

            var ktlines = pad.children;

            for (var i = 0; i < ktlines.length; i++) {
                ktlines[i].className = "kt-line";
            }
            var parent = currentTarget.parentNode;
            parent.className = "kt-line kt-radio-choose";

            var lineName = parent.children[1].innerHTML;

            if (lineName == "均线") {
                _this.stauts.indexv = "CMA";
            } else if (lineName == "EXPMA") {
                _this.stauts.indexv = "EXPMA";
            } else if (lineName == "SAR") {
                _this.stauts.indexv = "SAR";
            } else if (lineName == "BOLL") {
                _this.stauts.indexv = "BOLL";
            } else if (lineName == "BBI") {
                _this.stauts.indexv = "BBI";
            } else if (lineName == "无") {
                _this.stauts.indexv = "none";
            }

            if (show.fold) {
                qtip.querySelector("span").innerText = lineName;
                pad.style.display = "none";
            }

            dataSplit.slice.call(_this);
            new drawBlockK(_this).draw();
            new drawIndexsV(_this).draw(_this.stauts.indexv);
            drawTitle.titleK(_this);     // 最后一笔的均线标题

            _this.options.onFold(pad.style.display, _this.stauts.indexv);
        }

    },

    // 绘制技术指标
    technology: function () {
        var _this = this;

        var ops = this.options;

        var drawRegion = ops.drawRegion;

        var drawSumWdith = drawRegion.drawSumWdith;
        var index = drawRegion.index;       // 技术指标开始位置
        var minimap = drawRegion.minimap;

        // var domheight = 

        var indexs = [
            {
                type: "RSI",
                name: "RSI",
                cb: function () { }
            }, {
                type: "KDJ",
                name: "KDJ",
                cb: function () { }
            }, {
                type: "MACD",
                name: "MACD",
                cb: function () { }
            }, {
                type: "WR",
                name: "W%R",
                cb: function () { }
            }, {
                type: "DMI",
                name: "DMI",
                cb: function () { }
            }, {
                type: "BIAS",
                name: "BIAS",
                cb: function () { }
            }, {
                type: "OBV",
                name: "OBV",
                cb: function () { }
            }, {
                type: "CCI",
                name: "CCI",
                cb: function () { }
            }, {
                type: "ROC",
                name: "ROC",
                cb: function () { }
            }
        ];

        

        if (ops.show.lr) {
            indexs.push({
                type: "LRCE",
                name: "两融",
                dt: 1,      // 表示是一个特殊的指标， 需要去ajax获取，不是从k线中计算的
                cb: function () { }
            });
        }
        if (ops.show.cf) {
            indexs.push({
                type: "ZJL",
                name: "资金流",
                dt: 1,      // 表示是一个特殊的指标， 需要去ajax获取，不是从k线中计算的
                cb: function () { }
            })
        }

        var indexWidth = drawSumWdith / indexs.length;

        function createIndexItem(obj, isDefault) {
            var dom = document.createElement("li");
            dom.setAttribute("data-index-type", obj.type);
            dom.setAttribute("data-index-dt", obj.dt);
            dom.innerText = obj.name;
            dom.style.width = indexWidth + "px";
            dom.style.height = minimap.mt + "px";
            dom.style.lineHeight = minimap.mt + "px";
            dom.className = isDefault ? "__technologyindex_act" : "";

            return dom;
        }

        var ul = document.createElement("ul");
        for (var i = 0; i < indexs.length; i++) {
            if (indexs[i].name == _this.stauts.indexh) {
                ul.appendChild(createIndexItem(indexs[i], true));
            } else {
                ul.appendChild(createIndexItem(indexs[i]));
            }
        }

        // 绑定点击事件
        ul.addEventListener("click", function (e) {
            handle(e);
        });

        // 在移动端的事件
        ul.addEventListener("touchend", function (e) {
            handle(e)
        });

        function handle(e) {
            var data = _this.data;
            if (!data || !data.k) {
                return;
            }
            var tgt = e.target;
            if (tgt.nodeName == "LI") {
                var type = tgt.getAttribute("data-index-type");
                var dt = tgt.getAttribute("data-index-dt");
                var lis = ul.querySelectorAll("li");
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                tgt.className = "__technologyindex_act";

                for (var i = 0; i < indexs.length; i++) {
                    if (indexs[i].type == type) {
                        _this.stauts.indexh = type;
                        break;
                    }
                }

                if (dt == 1) {
                    new drawIndexsH(_this).draw(_this.stauts.indexh, dt);
                } else {
                    dataSplit.slice.call(_this);
                    new drawIndexsH(_this).draw(_this.stauts.indexh, dt);
                    drawTitle.titleIndex(_this);     // 绘制指标H标题
                }
            }
        }



        ul.className = "__technologyindex";
        ul.style.width = (drawSumWdith + 1) + "px";
        ul.style.left = (ops.padding.left - 1) + "px";
        ul.style.top = (index.top + index.mt + index.h - index.pb) + "px";
        ul.style.height = minimap.mt + "px";

        var layerUI = this.layer.layerUI;

        layerUI.appendChild(ul);
    },

    // 创建缩略图
    miniMap: function () {
        var cc = this.layer.layerKC;
        var ops = this.options;
        var data = this.data;
        var drawRegion = ops.drawRegion;
        var padding = ops.padding;
        var height = ops.height;
        var color = ops.color;
        var scale = ops.scale;
        var cyq = ops.cyq || {};

        var drawSumWdith = drawRegion.drawSumWdith;
        var unitHeight = drawRegion.unitHeight;
        var minimapHeight = drawRegion.minimapHeight;
        var startMinimap = drawRegion.startMinimap;

        var left = (scale.start + 1) / scale.fullDataSize * drawSumWdith;
        // var right = drawSumWdith - (scale.end + 1) / scale.fullDataSize * drawSumWdith;
        var right = padding.right + (cyq.width || 0) + (cyq.gap || 0);

        var map = drawRegion.minimap;

        // 创建dom
        var minimap = document.createElement("div");
        minimap.className = "__em_minimap";
        minimap.style.height = (map.h - map.mt) + "px";
        minimap.style.left = padding.left - 1 + "px";
        minimap.style.right = right + "px";
        minimap.style.bottom = padding.bottom + "px";
        var layerUI = this.layer.layerUI;

        // 创建拉杆
        var slidebarHtml = document.createElement("div");
        slidebarHtml.className = "__slidebar";
        slidebarHtml.innerHTML = "<div class='__sb_left'></div><div class='__sb_right'></div>";
        slidebarHtml.style.left = 0 + "px";
        slidebarHtml.style.right = 0 + "px";
        minimap.appendChild(slidebarHtml);

        layerUI.appendChild(minimap);

        this.layer.minimap = minimap;

    },

    // 创建浮动的信息框
    popWin: function () {
        var dt = getDeviceType();

        var ops = this.options;
        var padd = ops.padding;

        var popwin = document.createElement("div");
        popwin.className = "__popfloatwin " + ops.popWin.cls;
        // popwin.style.left = padd.left + "px";

        var layerUI = this.layer.layerUI;
        layerUI.appendChild(popwin);
        this.layer.popWin = popwin;

        if (dt == 1) {
            popWinEventForIpad.call(this, popwin);
        } else {
            popWinEvent.call(this, popwin);
        }
    },

    // 筹码分布
    cmfb: function () {
        // console.log(this);;

        var ops = this.options;

        var layerUI = this.layer.layerUI;

        var drawRegion = ops.drawRegion;
        var padding = ops.padding;
        var cyq = ops.cyq || {};

        if (cyq.width) {
            var oheight = ops.height - drawRegion.k.h - padding.bottom - 24;
            var cmfb = document.createElement("div");
            cmfb.setAttribute("class", "__emchatrs3_cmfb")
            cmfb.style.width = cyq.width + "px";
            cmfb.style.height = oheight + "px";
            cmfb.style.top = drawRegion.k.h + "px";
            cmfb.style.right = padding.right + "px";
            layerUI.appendChild(cmfb);

        }

        this.layer.cmfb = cmfb;
    }


}



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k2/init/initIndexDOM.js
// module id = 161
// module chunks = 0
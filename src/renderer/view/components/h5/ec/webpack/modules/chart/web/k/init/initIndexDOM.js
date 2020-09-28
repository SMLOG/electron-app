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

        var mt = this.options.drawRegion.k.mt;        // 单位高度

        //首先绘制出div
        var pad = document.createElement("div");
        pad.className = "kt-pad";
        var frag = document.createDocumentFragment();
        var kt_title = document.createElement("div");
        kt_title.className = "kt-title";
        kt_title.innerHTML = "主图指标";
        frag.appendChild(kt_title);

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
        appendLine("均线", frag, true);
        appendLine("EXPMA", frag, false);
        appendLine("SAR", frag, false);
        appendLine("BOLL", frag, false);
        appendLine("BBI", frag, false);

        pad.appendChild(frag);

        var layerUI = this.layer.layerUI;
        layerUI.appendChild(pad);

        pad.style.top = mt + "px";
        pad.style.right = "0";

        // 绑定事件
        pad.addEventListener("click", function (e) {
            console.log("click")
            handle(e);
        });

        pad.addEventListener("touchend", function (e) {
            console.log("touchend")
            handle(e);
        });

        function handle(e){
            var data = _this.data;
            if (!data || !data.k) {
                return ;
            }

            var currentTarget = e.srcElement || e.target;

            if (currentTarget.className != "kt-radio-wrap" && currentTarget.className != "kt-name") {
                return;
            }

            var ktlines = pad.children;

            for (var i = 1; i < ktlines.length; i++) {
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
            }

            dataSplit.slice.call(_this);
            new drawBlockK(_this).draw();
            new drawIndexsV(_this).draw(_this.stauts.indexv);
            drawTitle.titleK(_this);     // 最后一笔的均线标题
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
                cb: function () { }
            }, {
                type: "KDJ",
                cb: function () { }
            }, {
                type: "MACD",
                cb: function () { }
            }, {
                type: "W%R",
                cb: function () { }
            }, {
                type: "DMI",
                cb: function () { }
            }, {
                type: "BIAS",
                cb: function () { }
            }, {
                type: "OBV",
                cb: function () { }
            }, {
                type: "CCI",
                cb: function () { }
            }, {
                type: "ROC",
                cb: function () { }
            },
        ]

        var indexWidth = drawSumWdith / indexs.length;

        function createIndexItem(obj, isDefault) {
            var dom = document.createElement("li");
            dom.setAttribute("data-index-type", obj.type.replace("%", ""));
            dom.innerText = obj.type;
            dom.style.width = indexWidth + "px";
            dom.style.height = index.mb + "px";
            dom.style.lineHeight = index.mb + "px";
            dom.className = isDefault ? "__technologyindex_act" : "";

            return dom;
        }

        var ul = document.createElement("ul");
        for (var i = 0; i < indexs.length; i++) {
            if (i == 0) {
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
                return ;
            }
            var tgt = e.target;
            if (tgt.nodeName == "LI") {
                var type = tgt.getAttribute("data-index-type");
                var lis = ul.querySelectorAll("li");
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                }
                tgt.className = "__technologyindex_act";

                for (var i = 0; i < indexs.length; i++) {
                    if (indexs[i].type.replace("%", "") == type) {
                        _this.stauts.indexh = type;
                        break;
                    }
                }

                dataSplit.slice.call(_this);
                new drawIndexsH(_this).draw(_this.stauts.indexh);
                drawTitle.titleIndex(_this);     // 绘制指标H标题
            }
        }



        ul.className = "__technologyindex";
        ul.style.width = (drawSumWdith + 1) + "px";
        ul.style.left = (ops.padding.left - 1) + "px";
        ul.style.top = (index.top + index.mt + index.h - index.pb) + "px";
        ul.style.height = index.mb + "px";

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

        var drawSumWdith = drawRegion.drawSumWdith;
        var unitHeight = drawRegion.unitHeight;
        var minimapHeight = drawRegion.minimapHeight;
        var startMinimap = drawRegion.startMinimap;

        var left = (scale.start + 1) / scale.fullDataSize * drawSumWdith;
        var right = drawSumWdith - (scale.end + 1) / scale.fullDataSize * drawSumWdith;

        var map = drawRegion.minimap;

        // 创建dom
        var minimap = document.createElement("div");
        minimap.className = "__em_minimap";
        minimap.style.height = (map.h - map.mt)+ "px";
        minimap.style.left = padding.left - 1 + "px";
        minimap.style.right = padding.right + "px";
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
    popWin: function(){
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
    }


}



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k/init/initIndexDOM.js
// module id = 143
// module chunks = 0
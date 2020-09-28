var drawIndicator = require("../drawIndicator");


module.exports = function () {

    var _this = this;

    var ops = this.options;


    var areaTrading = ops.areaTrading;
    var drawSumWdith = areaTrading.draww;
    var index = areaTrading.starty + areaTrading.height;       // 技术指标开始位置

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

    if(ops.show.ddx){
        indexs.push({
            type: "DDX",
            name: "DDX",
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

    function createIndexItem(obj, isDefault, dt) {
        var dom = document.createElement("li");
        dom.setAttribute("data-index-type", obj.type.replace("%", ""));
        if (dt) {
            dom.setAttribute("data-index-dt", dt);
        }
        dom.innerText = obj.name;
        dom.style.width = indexWidth + "px";
        dom.style.height = 18 + "px";
        dom.style.lineHeight = 18 + "px";
        dom.className = isDefault ? "__technologyindex_act" : "";

        return dom;
    }

    var ul = document.createElement("ul");
    for (var i = 0; i < indexs.length; i++) {
        var isd = 0;
        var dt = 0;
        if (i == 0) {
            isd = 1;
        }
        if (indexs[i].dt) {
            dt = indexs[i].dt;
        }
        ul.appendChild(createIndexItem(indexs[i], isd, dt));
    }

    // 绑定点击事件
    ul.addEventListener("click", function (e) {
        // console.log(111);
        var data = _this.data.indexs;
        if (!data) {
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
            _this.indicatorStauts = type;

            _this.indicator = new drawIndicator(_this, type, dt);
        }
    });

    ul.className = "__technologyindex";
    ul.style.width = (drawSumWdith + 1) + "px";
    ul.style.left = (ops.padding.left - 1) + "px";
    ul.style.bottom = ops.padding.bottom + "px";
    ul.style.height = 18 + "px";

    var layerUI = this.layer.layerUI;

    layerUI.appendChild(ul);


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/init/initTechnology.js
// module id = 258
// module chunks = 0
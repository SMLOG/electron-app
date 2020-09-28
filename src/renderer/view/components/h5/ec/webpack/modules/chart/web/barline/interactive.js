var tools = require("../../common/tools");
var color = require("../../common/color");

var drawLine = require("chart/common/drawLine");
var drawLineBar = require("./drawLineBar")


/**
 * 交互
 */



var sx, sy, ex, ey;
var xaxisSize, validWidth, validHeight, unitw;


function interactive(chart) {
    this.chart = chart;
    this.lastIndex = -1;        // 最后一次

    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    var chart = this.chart;

    var ops = chart.options;
    var layerui = chart.layer.layerUI;
    var padding = ops.padding;

    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className;

        if (targetClass == "__ui" && chart.stauts == 1) {
            var data = chart.data;
            var info = chart.info;

            sx = padding.left + info.left;
            sy = padding.top;
            ex = ops.width - padding.right - info.right;
            ey = ops.height - padding.bottom;

            var x = e.offsetX;
            var y = e.offsetY;

            // 判断是否在框内
            if (x >= sx && x < ex && y >= sy && y <= ey) {

                xaxisSize = data.xaxis.length;
                validWidth = ex - sx;
                validHeight = ey - sy;
                unitw = validWidth / xaxisSize;

                // 计算鼠标当前位置的索引
                var index = (x - sx) / validWidth * xaxisSize;
                index = Math.floor(index);

                if (_this.lastIndex != index) {
                    _this.lastIndex = index;
                    // _this.shade(index);
                    _this.shade(index);
                }

                if (typeof data.popFormat == "function") {
                    _this.popwinShowCB(data, index)
                } else {
                    _this.popwinShow(x, y, index);
                }

                _this.popwinMove(x, y);

            } else {
                _this.hides();
            }
        } else {
            _this.hides();
        }
    });


    layerui.addEventListener("mouseleave", function () {
        _this.hides();
    });

}


// 交互遮罩
interactive.prototype.shade = function (index) {
    var _this = this;

    var chart = this.chart;
    var ops = chart.options;
    var cc = chart.ctxs.layerUEC;
    var data = chart.data;
    var info = chart.info;

    var validHeight = info.ey - info.sy;
    var validWidth = info.ex - info.sx;
    var xaxisSize = data.xaxis.length;
    var unit = validWidth / xaxisSize;

    cc.clearRect(0, 0, ops.width, ops.height);

    drawLineBar(chart, index);

    cc.fillStyle = ops.color.hoverColor;
    var x = info.sx + unit * index;
    cc.beginPath();
    cc.fillRect(x, info.sy, unit, validHeight);
    cc.globalAlpha = 1;

}

// 移动浮窗
interactive.prototype.popwinMove = function (x, y) {

    var chart = this.chart;
    var popwin = chart.layer.popWin;
    var w = chart.options.width;
    var h = chart.options.height;
    var cx = w / 2;
    var cy = h / 2;

    // 移动浮窗
    if (x < cx && y < cy) {
        setPopwin(x + 10, "", y + 10, "");
    } else if (x < cx && y >= cy) {
        setPopwin(x + 10, "", "", (h - y) + 10);
    } else if (x > cx && y < cy) {
        setPopwin("", (w - x) + 10, y + 10, "");
    } else {
        setPopwin("", (w - x) + 10, "", (h - y) + 10);
    }

    function setPopwin(left, right, top, bottom) {
        popwin.style.left = left && left + "px";
        popwin.style.right = right && right + "px";
        popwin.style.top = top && top + "px";
        popwin.style.bottom = bottom && bottom + "px";
        popwin.style.display = "block";
    }
}

// 弹出信息窗
interactive.prototype.popwinShow = function (x, y, index) {

    var chart = this.chart;
    var ops = chart.options;
    var cc = chart.layer.layerUI;
    var data = chart.data;

    var padding = ops.padding;

    function crt(tagname, name, value, subfix) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        span.innerText = tools.formatNumUnit(value, ops.fixed, 8) + subfix;

        tag.appendChild(lab);
        tag.appendChild(span);
        return tag;
    }

    var popWin = chart.layer.popWin;
    popWin.innerHTML = "";

    var title = data.xaxis[index];
    var yaxis1 = data.yaxis1 || [];
    var yaxis2 = data.yaxis2 || [];

    var titleh4 = document.createElement("h4");
    titleh4.innerText = title;
    popWin.appendChild(titleh4);


    var arr = yaxis1.concat(yaxis2)

    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i].data[index];
        var num = tools.formatNumUnit(item);
        popWin.appendChild(crt("div", arr[i].name, num, ""));
    }

    popWin.style.display = "block";

}

interactive.prototype.popwinShowCB = function (data, index) {
    var chart = this.chart;
    var popWin = chart.layer.popWin;
    var html = chart.data.popFormat(data, index);
    popWin.innerHTML = "";
    popWin.innerHTML = html;
    popWin.style.display = "block";
}

interactive.prototype.hides = function () {
    this.resetLinePoint();
    this.resetLastIndex();
    this.popwinHide();
    this.clearCross();
    drawLineBar(this.chart);
}


interactive.prototype.resetLinePoint = function () {
    var chart = this.chart;
    var lienData = this.lienData;
    var split = this.lienSplit;
    if (lienData && split) {
        drawLinePoint.call(this.chart, lienData, split, -1);
    }
}

// 重置缓存的索引
interactive.prototype.resetLastIndex = function () {
    this.lastIndex = -1;
}

// 影藏信息窗
interactive.prototype.popwinHide = function () {
    var popWin = this.chart.layer.popWin;
    popWin.style.display = "none";
}

// 清除十字线
interactive.prototype.clearCross = function () {
    var chart = this.chart;
    var cc = chart.ctxs.layerUEC;
    var cc2 = chart.ctxs.layerBarHoverC;
    var ops = chart.options;
    cc.clearRect(0, 0, ops.width, ops.height);
    cc2.clearRect(0, 0, ops.width, ops.height);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/interactive.js
// module id = 462
// module chunks = 0
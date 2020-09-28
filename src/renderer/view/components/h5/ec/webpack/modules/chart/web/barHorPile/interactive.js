var tools = require("../../common/tools");
var colorTools = require("../../common/color");


/**
 * 交互
 */

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

        if (targetClass == "__ui") {
            var datas = chart.datas;
            var info = chart.info;

            var sx = info.sx;
            var sy = info.sy;
            var ex = info.ex;
            var ey = info.ey;

            var x = e.offsetX;
            var y = e.offsetY;

            // 判断是否在框内
            if (x >= sx && x < ex && y >= sy && y <= ey) {

                var h = ey - sy;
                var len = datas.data.length;
                var unith = h / len;

                // 计算鼠标当前位置的索引
                var index = (y - sy) / h * len;
                index = Math.floor(index);
                // console.log(index);
                if (_this.lastIndex != index) {
                    _this.lastIndex = index;
                    _this.shade(index);

                    if (datas.popFormat) {
                        _this.popwinShowCB(datas.data[index]);
                    } else {
                        _this.popwinShow(index);
                    }
                }

                _this.popwinMove(x, y);
            } else {
                _this.hides();
            }
        } else {
            // _this.hides();
        }
    });


    layerui.addEventListener("mouseleave", function () {
        _this.hides();
    })

}


// 交互遮罩
interactive.prototype.shade = function (index) {
    var _this = this;

    var chart = this.chart;
    var ops = chart.options;
    var cc = chart.ctxs.layerUEC;
    var datas = chart.datas;
    var info = chart.info;

    var barWidth = ops.barWidth;
    var axisMax = info.axisMax;

    var sx = info.sx;
    var sy = info.sy;
    var ex = info.ex;
    var ey = info.ey;

    var w = ex - sx;
    var h = ey - sy;
    var unith = h / datas.data.length;

    var dataItem = datas.data[index] || {};

    cc.clearRect(0, 0, ops.width, ops.height);

    var isx = sx + 1;
    var isy = sy + unith * index + unith * (1 - barWidth) / 2;
    var iex = isy + unith * barWidth;
    var idata = dataItem.datas || [];
    var colors = dataItem.colors || datas.pcolors;
    for (var i = 0, len = idata.length; i < len; i++) {
        var width = idata[i] / axisMax * w;
        var color = colorTools.rank(colors[i % colors.length], 4);
        cc.fillStyle = color;
        cc.strokeStyle = color;
        cc.EMFill2(isx, isy, isx + width, iex);
        isx += width;
    }

    cc.fillStyle = ops.color.hoverColor;
    cc.beginPath();
    cc.fillRect(sx, sy + unith * index, w, unith);
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
interactive.prototype.popwinShow = function (index) {

    var chart = this.chart;
    var ops = chart.options;
    var cc = chart.layer.layerUI;
    var datas = chart.datas;

    var padding = ops.padding;

    function crt(tagname, color, name, value, subfix) {
        var tag = document.createElement(tagname);

        var i = document.createElement("i");
        i.setAttribute("style", "background-color:" + color);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        span.innerText = tools.formatNumUnit(value, 2, 8) + subfix;

        tag.appendChild(i);
        tag.appendChild(lab);
        tag.appendChild(span);
        return tag;
    }

    var popWin = chart.layer.popWin;
    popWin.innerHTML = "";


    var dobj = datas.data[index] || {};

    var title = dobj.title;
    var titleh4 = document.createElement("h4");
    titleh4.innerText = title;
    popWin.appendChild(titleh4);

    var dataItem = dobj.datas || [];
    var names = dobj.names || datas.pnames;
    var colors = dobj.colors || datas.pcolors;
    for (var i = 0, len = dataItem.length; i < len; i++) {
        var item = crt("div", colors[i], names[i], dataItem[i], "");
        popWin.appendChild(item)
    }

    popWin.style.display = "block";

}

interactive.prototype.popwinShowCB = function (data) {
    var chart = this.chart;
    var popWin = chart.layer.popWin;
    var html = chart.datas.popFormat(data);
    popWin.innerHTML = "";
    popWin.innerHTML = html;
    popWin.style.display = "block";
}


interactive.prototype.hides = function () {
    this.resetLastIndex();
    this.popwinHide();
    this.clearCross();
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
    var ops = chart.options;
    cc.clearRect(0, 0, ops.width, ops.height);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barHorPile/interactive.js
// module id = 472
// module chunks = 0
var drawLine = require("chart/common/drawLine");
var drawTitle = require("./drawTitle");

/**
 * 交互
 */

function interactive(kObj) {
    this.kObj = kObj;

    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    var lastIndex = -1;

    var ops = this.kObj.options;
    var layerui = this.kObj.layer.layerUI;
    var padding = ops.padding;

    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className;
        var stauts = _this.kObj.stauts;

        var left = padding.left;
        var right = ops.width - padding.right;
        var top = padding.top;
        var bottom = ops.height - padding.bottom;

        if (targetClass == "__ui") {        // fund
            var x = e.offsetX;
            var y = e.offsetY;
            // console.log(x, y);
            if (x >= left - 1 && x < right && y >= top && y <= bottom) {
                _this.intersection(x, y);
                _this.move(x, y);
            } else {
                _this.hides();
            }
        } else {
            _this.hides();
            _this.resetLastIndex();
        }
    });

    layerui.addEventListener("mouseout", function (e) {
        _this.hides();
        _this.resetLastIndex();
    });

}


// 十字线，交叉点
interactive.prototype.intersection = function (x, y) {
    var ops = this.kObj.options;
    var cross = this.kObj.options.cross;
    var cc = this.kObj.layer.layerLoadingC;

    var xaxis = this.kObj.data.xaxis;
    var yaxis = this.kObj.data.yaxis;
    var yaxis2 = this.kObj.data.yaxis2 || [];

    var padding = ops.padding;
    var grid = ops.grid;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top;
    var bottom = grid.yStart - grid.height;
    var dwidth = ops.width - padding.left - padding.right;

    var index = this.getIndex(x, y);

    var hei = this.getHeight(index);

    var cx = padding.left + (index / (xaxis.length - 1)) * dwidth;

    cc.clearRect(0, 0, ops.width, ops.height);
    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.color;
    cc.lineWidth = cross.lineWidth;

    drawLine.dashed(cc, cx, top, cx, bottom, cross.solid, cross.dashed);

    hpoint(yaxis, hei.h1);
    hpoint(yaxis2, hei.h2);

    function hpoint(ys, heis) {
        for (var i = 0, len = heis.length; i < len; i++) {
            var y = padding.top + heis[i];
            var ydata = ys[i];
            var radius = ydata.point.radius;

            cc.fillStyle = ydata.color;
            cc.save();
            cc.globalAlpha = 0.3;
            cc.arc(cx, y, radius * 1.8, 0, Math.PI * 2);
            cc.closePath();
            cc.fill();
            cc.restore();
            cc.beginPath();
            cc.arc(cx, y, radius, 0, Math.PI * 2);
            cc.closePath();
            cc.fill();
        }
    }

}


interactive.prototype.move = function (x, y) {
    var popWin = this.kObj.layer.popWin;
    var index = this.getIndex(x, y);

    if (index != this.lastIndex && index > -1) {
        this.lastIndex = index;
        this.popwinShow(index, x, y);
    }
}


interactive.prototype.getIndex = function (x, y) {
    var ops = this.kObj.options;
    var padding = ops.padding;

    var drawSumWdith = ops.width - padding.left - padding.right;     // 绘图总宽度
    var left = padding.left;

    var pillar = this.kObj.data.xaxis.length;          // 总数据的个数

    // 计算索引
    var index = (x - left) / (drawSumWdith) * (pillar );
    index = Math.floor(index);
    return index;
}


interactive.prototype.getHeight = function (index) {
    var ops = this.kObj.options;
    var grid = ops.grid;
    var ydata = this.kObj.data.yaxis || [];          // 总数据的个数
    var ydata2 = this.kObj.data.yaxis2 || [];

    var axisMax = ops.axisMax;
    var axisMin = ops.axisMin;

    var axisMax2 = ops.axisMax2;
    var axisMin2 = ops.axisMin2;

    var hs = [];
    var hs2 = [];

    for (var i = 0; i < ydata.length; i++) {
        var num = ydata[i].data[index];
        var h = (axisMax - num) / (axisMax - axisMin) * grid.height;
        hs.push(h);
    }

    for (var i = 0; i < ydata2.length; i++) {
        var num = ydata2[i].data[index];
        var h = (axisMax2 - num) / (axisMax2 - axisMin2) * grid.height;
        hs2.push(h);
    }

    return {
        h1: hs,
        h2: hs2
    };
}


interactive.prototype.popwinShow = function (index, x, y) {
    console.log("index:" + index);

    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data;

    var xaxis = data.xaxis;
    var yaxis = data.yaxis || [];
    var yaxis2 = data.yaxis2 || [];
    var pop = data.pop || {};

    var dwidth = ops.width - padding.left - padding.right;

    var cx = padding.left + (index / (xaxis.length - 1)) * dwidth;

    popWin.innerHTML = "";

    /**
     * 创建一行
     * @param {any} name ： 名称
     * @param {any} val ： 值
     * @param {any} color ： 颜色
     * @returns 
     */
    function cdom(name, val, color) {
        var div = document.createElement("div");
        var lab = document.createElement("label");
        var spa = document.createElement("span");

        if (color) {
            // lab.style.color = color;
            spa.style.color = color;
        }

        lab.innerText = name || "";
        spa.innerText = val === undefined ? "" : val;

        div.appendChild(lab);
        div.appendChild(spa);
        return div;
    }

    if (pop.showTitle) {
        popWin.appendChild(cdom(xaxis[index].name))
    }


    for (var i = 0, len = yaxis.length; i < len; i++) {
        var val = yaxis[i].data[index];
        if (pop.cb) {
            val = pop.cb(val);
        }
        popWin.appendChild(cdom(yaxis[i].title + ": ", val + " " + data.subfix, yaxis[i].color));
    }

    for (var i = 0, len = yaxis2.length; i < len; i++) {
        var val = yaxis2[i].data[index];
        if (pop.cb) {
            val = pop.cb(val);
        }
        popWin.appendChild(cdom(yaxis2[i].title + ": ", val + " " + data.subfix, yaxis2[i].color));
    }


    if (cx < ops.width / 2) {
        popWin.style.left = cx + 8 + "px";
        popWin.style.right = "";
    } else {
        popWin.style.right = (ops.width - cx) + 8 + "px";
        popWin.style.left = "";
    }
    if (y < ops.height / 2) {
        popWin.style.top = y + 8 + "px";
        popWin.style.bottom = "";
    } else {
        popWin.style.bottom = (ops.height - y) + 8 + "px";
        popWin.style.top = "";
    }

    popWin.style.display = "block";
}



interactive.prototype.hides = function () {
    this.resetLastIndex();
    this.popwinHide();
    this.clearCross();
}

// 重置缓存的索引
interactive.prototype.resetLastIndex = function () {
    this.lastIndex = "-1";
}

// 影藏信息窗
interactive.prototype.popwinHide = function () {
    var popWin = this.kObj.layer.popWin;
    popWin.style.display = "none";
}

// 清除十字线
interactive.prototype.clearCross = function () {
    var cc = this.kObj.layer.layerLoadingC;
    var ops = this.kObj.options;
    cc.clearRect(0, 0, ops.width, ops.height);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/interactive.js
// module id = 397
// module chunks = 0
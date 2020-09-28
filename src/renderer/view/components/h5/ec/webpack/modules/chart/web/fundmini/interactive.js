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

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top;
    var bottom = ops.height - padding.bottom;

    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className;
        var stauts = _this.kObj.stauts;

        if (targetClass == "__ui") {        // fund
            var x = e.offsetX;
            var y = e.offsetY;
            // console.log(x, y);
            if (x >= left - 1 && x < right && y >= top && y <= bottom) {
                _this.intersection(x, y);
                _this.move(x, y);
            } else {
                _this.hides();
                // drawTitle.titleK.call(_this.kObj);
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

    var padding = ops.padding;
    var grid = ops.grid;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top;
    var bottom = ops.height - padding.bottom;
    var dwidth = ops.width - padding.left - padding.right;

    var index = this.getIndex(x, y);

    var hei = this.getHeight(index);

    var cy = grid.midy - hei;
    var cx = padding.left + (index / (xaxis.length - 1)) * dwidth;

    cc.clearRect(0, 0, ops.width, ops.height);
    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.vcolor;

    drawLine.dashed(cc, cx, top, cx, bottom, cross.solid, cross.dashed);
    drawLine.dashed(cc, left, cy, right, cy, cross.solid, cross.dashed);

    cc.fillStyle = cross.dot.color;
    cc.globalAlpha = cross.dot.opacity;
    var count = cross.dot.count;
    for (var i = count; i > 0; i--) {
        var r = cross.dot.radius * i / count;
        cc.beginPath();
        cc.arc(cx, cy, r, 0, Math.PI * 2);
        cc.fill();
    }
    cc.globalAlpha = 1;
}


interactive.prototype.move = function (x, y) {
    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data;
    var ydata = data.yaxis.data;
    var xdata = data.xaxis;
    var index = this.getIndex(x, y);
    var datak = ydata[index];      // 当次
    var time = xdata[index];        // 时刻

    if (index != this.lastIndex) {
        this.lastIndex = index;
        datak = ydata[index];      // 当次
        time = xdata[index];        // 时刻
        // console.log(index);
        
        // 用于显示悬浮窗的数据
        if (datak !== undefined && datak !== "" && datak !== " " && datak !== "-") {
            this.popwinShow(datak, data.yaxis.title, time.time, data.subfix, x, y);
            // drawTitle.change.call(this.kObj, datak);
        }

        if (this.kObj.options.onMove && datak) {
            this.kObj.options.onMove(datak);
        }
    }

    if (datak !== undefined && datak !== "" && datak !== " " && datak !== "-") {
        this.movePopwin(x, y, index);
    } else {
        this.popwinHide();
    }
}


interactive.prototype.getIndex = function (x, y) {
    var ops = this.kObj.options;
    var padding = ops.padding;

    var drawSumWdith = ops.width - padding.left - padding.right;     // 绘图总宽度
    var left = padding.left;

    var pillar = this.kObj.data.xaxis.length;          // 总数据的个数

    // 计算索引
    var index = (x - left) / (drawSumWdith) * (pillar - 1) + 0.5;
    index = Math.floor(index);
    return index;
}


interactive.prototype.getHeight = function (index) {
    var ops = this.kObj.options;
    var grid = ops.grid;
    var ydata = this.kObj.data.yaxis.data;          // 总数据的个数

    var axisMax = ops.axisMax;

    var h = ydata[index] / axisMax * grid.height / 2;

    return h;
}


interactive.prototype.movePopwin = function (x, y, index) {

    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var grid = ops.grid;
    var padding = ops.padding;
    var data = this.kObj.data.yaxis;
    var ydata = data.data;

    var dwidth = ops.width - padding.left - padding.right;
    var hei = this.getHeight(index);

    var cx = padding.left + (index / (ydata.length - 1)) * dwidth;
    var cy = grid.midy - hei;

    if (cx < ops.width / 2) {
        popWin.style.left = cx + 4 + "px";
        popWin.style.right = "";
    } else {
        popWin.style.right = (ops.width - cx) + 4 + "px";
        popWin.style.left = "";
    }

    if (cy < ops.height / 2) {
        popWin.style.top = cy + 4 + "px";
        popWin.style.bottom = "";
    } else {
        popWin.style.bottom = (ops.height - cy) + 4 + "px";
        popWin.style.top = "";
    }
    popWin.style.display = "block";

}


// 弹出信息窗
interactive.prototype.popwinShow = function (tdata, title, time, subfix, x, y) {
    var ops = this.kObj.options;
    var info = this.kObj.data.info;
    var padding = ops.padding;
    var color = ops.color;

    var dtitle = document.createElement("div");
    dtitle.innerText = time;
    var value = document.createElement("div");
    var span;
    if (tdata > 0) {
        span = "<span style='color:" + color.rise + "'>" + tdata + "</span>";
    } else if (tdata < 0) {
        span = "<span style='color:" + color.fall + "'>" + tdata + "</span>";
    } else {
        span = "<span style='color:" + color.text + "'>" + tdata + "</span>";
    }
    var txt = title + span + subfix;
    value.innerHTML = txt;

    var popWin = this.kObj.layer.popWin;
    popWin.innerHTML = "";
    popWin.appendChild(dtitle);
    popWin.appendChild(value);

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
// ./modules/chart/web/fundmini/interactive.js
// module id = 383
// module chunks = 0
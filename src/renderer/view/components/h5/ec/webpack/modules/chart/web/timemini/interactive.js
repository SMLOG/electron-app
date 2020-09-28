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
    var th = ops.textHeight;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top + th.head;
    var bottom = ops.height - padding.bottom - th.foot;

    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className;
        var stauts = _this.kObj.stauts;

        if (targetClass == "__ui") {
            var x = e.offsetX;
            var y = e.offsetY;
            // console.log(x, y);
            if (x >= left && x < right && y >= top && y <= bottom) {
                _this.intersection(x, y);
                _this.move(x, y);
            } else {
                _this.hides();
                // drawTitle.titleK.call(_this.kObj);
            }
        } else {
            _this.hides();
        }
    });

    layerui.addEventListener("mouseout", function (e) {
        _this.hides();
    });
    
}


// 十字线，交叉点
interactive.prototype.intersection = function (x, y) {
    var ops = this.kObj.options;
    var cross = this.kObj.options.cross;
    var popWin = this.kObj.layer.popWin;
    var cc = this.kObj.layer.layerLoadingC;

    var padding = ops.padding;
    var th = ops.textHeight;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top + th.head;
    var bottom = ops.height - padding.bottom - th.foot;

    var py = this.getHeight(x, y);
    var cy = padding.top + th.head + py;
    // console.log(cy)

    cc.clearRect(0, 0, ops.width, ops.height);

    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.color;
    drawLine.dashed(cc, x, top, x, bottom, cross.solid, cross.dashed);

    if (py > 0) {
        drawLine.dashed(cc, left, cy, right, cy, cross.solid, cross.dashed);

        cc.fillStyle = cross.dot.color;
        cc.globalAlpha = cross.dot.opacity;
        var count = cross.dot.count;
        for (var i = count; i > 0; i--) {
            var r = cross.dot.radius * i / count;
            cc.beginPath();
            cc.arc(x, cy, r, 0, Math.PI * 2);
            cc.fill();
        }
        cc.globalAlpha = 1;
    }
}


interactive.prototype.move = function (x, y) {
    // console.log(x, y);
    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data.time;

    var index = this.getIndex(x, y);

    var datak = data[index];      // 当次
    if (index != this.lastIndex) {
        this.lastIndex = index;

        // 用于显示悬浮窗的数据
        if (datak) {
            this.popwinShow(datak, x, y);
            // drawTitle.change.call(this.kObj, datak);
        }

        if (this.kObj.options.onMove && datak) {
            this.kObj.options.onMove(datak);
        }
    }

    if (datak) {
        this.movePopwin(x, y, datak);
    } else {
        this.popwinHide();
    }
}


interactive.prototype.getIndex = function (x, y) {
    var ops = this.kObj.options;
    var padding = ops.padding;
    var info = this.kObj.data.info;
    var th = ops.textHeight;

    var drawSumWdith = ops.width - padding.left - padding.right;     // 绘图总宽度
    var left = padding.left;

    var pillar = info.total;          // 总数据的个数
    var unitw = drawSumWdith / pillar;

    // 计算索引
    var index = (x - left + unitw / 4) / drawSumWdith * pillar;
    index = Math.floor(index);

    return index;
}

interactive.prototype.getHeight = function (x, y) {
    var ops = this.kObj.options;
    var padding = ops.padding;
    var info = this.kObj.data.info;
    var th = ops.textHeight;

    var axisMax = info.axisMax;
    var axisMin = info.axisMin;
    var diff = axisMax - axisMin;

    var drawSumWdith = ops.width - padding.left - padding.right;
    var drawSumHeight = ops.height - padding.top - padding.bottom - th.head - th.foot;

    var index = this.getIndex(x, y);
    var time = this.kObj.data.time;
    var data = time[index];

    var h = -1;
    if (data) {
        h = (axisMax - data[1]) / diff * drawSumHeight;
    }
    return h;
}


interactive.prototype.movePopwin = function (x, y, datak) {
    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data.k;
    var info = this.kObj.data.info;
    var th = ops.textHeight;
    // var drawSumWdith = ops.width - padding.left - padding.right;     // 绘图总宽度
    var left = padding.left;

    // 移动浮窗的位置
    var bcr = popWin.getBoundingClientRect();
    if (x > ops.width / 2) {
        popWin.style.left = "";
        if (x > ops.width - bcr.width / 2) {
            popWin.style.right = padding.right + "px";
        } else {
            popWin.style.right = (ops.width - x - (bcr.width + 2) / 2) + "px";
        }
    } else {
        popWin.style.right = "";
        if (x < bcr.width / 2) {
            popWin.style.left = padding.left + "px";
        } else {
            popWin.style.left = (x - (bcr.width + 2) / 2) + "px";
        }
    }

    // 计算浮窗是在上面还是在下面
    var drawh = ops.height - padding.top - padding.bottom - th.head - th.foot;
    var kAxisMax = info.axisMax;
    var kAxisMin = info.axisMin;
    var diff = kAxisMax - kAxisMin;
    var mid = kAxisMin - 0 + diff / 2;


    if (datak[1] / 1 > mid) {
        var ptop = Math.abs(datak[1] - kAxisMax) / (kAxisMax - kAxisMin) * drawh;
        popWin.style.bottom = "";
        popWin.style.top = (ptop + padding.top + th.head + 4) + "px";
    } else {
        var ptop = Math.abs(datak[1] - kAxisMin) / (kAxisMax - kAxisMin) * drawh;
        popWin.style.top = "";
        popWin.style.bottom = (ptop + padding.top + th.head + 4) + "px";
    }

    // console.log(datak)
    // 找出离中线远的那个
    // if (datak[3] > mid && datak[4] > mid) {
    //     var ptop = Math.abs(datak[4] - kAxisMax) / (kAxisMax - kAxisMin) * drawh;   // 计算最低点的坐标
    //     popWin.style.bottom = "";
    //     popWin.style.top = (ptop + padding.top + th.head + 4) + "px";
    // } else if (datak[3] < mid && datak[4] < mid) {
    //     var ptop = Math.abs(datak[3] - kAxisMin) / (kAxisMax - kAxisMin) * drawh;   // 计算最低点的坐标
    //     popWin.style.top = "";
    //     popWin.style.bottom = (ptop + padding.bottom + th.foot + 4) + "px";
    // } else {
    //     var ptop, t, z, d, c;
    //     if (Math.abs(datak[3] - mid) > Math.abs(datak[4] - mid)) {
    //         ptop = Math.abs(datak[4] - kAxisMax) / (kAxisMax - kAxisMin) * drawh;
    //         t = "top";
    //         z = "bottom";
    //         c = padding.top + th.head + 4;
    //     } else {
    //         ptop = Math.abs(datak[3] - kAxisMin) / (kAxisMax - kAxisMin) * drawh;
    //         t = "bottom";
    //         z = "top";
    //         c = padding.bottom + th.foot + 4;
    //     }
    //     popWin.style[z] = "";
    //     popWin.style[t] = (ptop + c) + "px";
    // }
}


// 弹出信息窗
interactive.prototype.popwinShow = function (tdata, x, y) {
    var ops = this.kObj.options;
    var info = this.kObj.data.info;
    var padding = ops.padding;
    var th = ops.textHeight;

    var decimal = info.decimal;

    function crt(tagname, name, value, diff) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        span.innerText = value;

        if (diff === 0) {
            span.className = "__hold";
        } else if (diff > 0) {
            span.className = "__rise";
        } else if (diff < 0) {
            span.className = "__fall";
        }
        tag.appendChild(lab);
        tag.appendChild(span);
        return tag;
    }

    var h4 = document.createElement("div");
    h4.innerText = tdata[0].substr(11);

    var open = crt("div", "", tdata[1], tdata[1] - info.yc);

    var popWin = this.kObj.layer.popWin;
    popWin.innerHTML = "";
    popWin.appendChild(h4)
    popWin.appendChild(open)

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
// ./modules/chart/web/timemini/interactive.js
// module id = 353
// module chunks = 0
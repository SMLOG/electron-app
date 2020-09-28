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

    // kmini
    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className;
        var stauts = _this.kObj.stauts;
        if (targetClass == "__ui") {
            var x = e.offsetX;
            var y = e.offsetY;
            if (x >= left && x < right && y >= top && y <= bottom) {
                _this.intersection(x, y);
                _this.move(x, y);
            } else {
                _this.hides();
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

    cc.clearRect(0, 0, ops.width, ops.height);

    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.color;
    drawLine.dashed(cc, x, top, x, bottom, cross.solid, cross.dashed);

    var py = this.getHeight(x, y);
    var dy = padding.top + th.head + py;

    if (py > 0) {
        drawLine.dashed(cc, left, dy, right, dy, cross.solid, cross.dashed);
        cc.fillStyle = cross.dot.color;
        cc.globalAlpha = cross.dot.opacity;
        var count = cross.dot.count;
        for (var i = count; i > 0; i--) {
            var r = cross.dot.radius * i / count;
            cc.beginPath();
            cc.arc(x, dy, r, 0, Math.PI * 2);
            cc.fill();
        }
        cc.globalAlpha = 1;
    }
}


interactive.prototype.move = function (x, y) {
    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data.k;

    // 计算索引
    var index = this.getIndex(x, y);

    var datak = data[index];      // 当次
    if (index != this.lastIndex) {
        this.lastIndex = index;

        // 用于显示悬浮窗的数据
        if (datak) {
            this.popwinShow(datak, x, y);
            var kobj = this.kObj;
            // drawTitle.titleK.call(kobj, datak);
        }

        this.kObj.options.onMove(datak);
    }

    if (datak) {
        this.movePopwin2(x, y, datak);
    } else {
        this.popwinHide();
    }
}


interactive.prototype.getIndex = function (x, y) {
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data.k;
    var th = ops.textHeight;

    var drawSumWdith = ops.width - padding.left - padding.right;     // 绘图总宽度
    var left = padding.left;

    var pillar = data.length;          // 总数据的个数
    if (pillar < ops.minPillar) {
        pillar = ops.minPillar;
    }

    var unitw = drawSumWdith / pillar;

    // 计算索引
    var index = (x - left) / drawSumWdith * pillar;
    index = Math.floor(index);

    return index;
}


interactive.prototype.getHeight = function (x, y) {
    var ops = this.kObj.options;
    var padding = ops.padding;
    var info = this.kObj.data.info;
    var th = ops.textHeight;

    var axisMax = info.kAxisMax;
    var axisMin = info.kAxisMin;
    var diff = axisMax - axisMin;

    var drawSumWdith = ops.width - padding.left - padding.right;
    var drawSumHeight = ops.height - padding.top - padding.bottom - th.head - th.foot;

    var index = this.getIndex(x, y);
    var time = this.kObj.data.k;
    var data = time[index];

    var h = -1;
    if (data) {
        h = (axisMax - data[2]) / diff * drawSumHeight;
    }
    return h;
}

// 悬浮窗的位置左右
interactive.prototype.movePopwin2 = function (x, y, datak) {
    var popWin = this.kObj.layer.popWin;
    var ops = this.kObj.options;
    var padding = ops.padding;
    var data = this.kObj.data.k;
    var info = this.kObj.data.info;
    var th = ops.textHeight;

    var drawh = ops.height - padding.top - padding.bottom - th.head - th.foot;
    var kAxisMax = info.kAxisMax;
    var kAxisMin = info.kAxisMin;
    var diff = kAxisMax - kAxisMin;
    var mid = kAxisMin - 0 + diff / 2;

    var popH = 100;

    var maxTop = Math.abs(datak[3] - kAxisMax) / (kAxisMax - kAxisMin) * drawh;   // 计算最高点距离顶部
    var maxBot = Math.abs(datak[4] - kAxisMin) / (kAxisMax - kAxisMin) * drawh;   // 计算最低点距离底部

    var topH = padding.top + th.head;
    var botH = padding.bottom + th.foot;

    // 显示在上面
    popWin.style.left = "";
    popWin.style.right = "";
    if (maxTop > maxBot && maxTop > popH + th.head + 2) {
        popWin.style.top = "";
        popWin.style.bottom = (ops.height - maxTop - topH + 2) + "px";
        vleft();
    } else if (maxBot > maxTop && maxBot > popH + th.foot + 2) {
        popWin.style.bottom = "";
        popWin.style.top = (ops.height - maxBot - botH + 2) + "px";
        vleft();
    } else {
        // 上下距离都不够
        popWin.style.bottom = "";
        popWin.style.top = (ops.height - popH) / 2 + "px";
        if (x > ops.width / 2) {
            popWin.style.left = "";
            popWin.style.right = (ops.width - x + 1) + "px";
        } else {
            popWin.style.right = "";
            popWin.style.left = x + 1 + "px";
        }
    }


    // 设置x轴位置
    function vleft() {
        var bcr = popWin.getBoundingClientRect();
        var unitw = bcr.width / 2;
        if (x > padding.left + unitw && x < (ops.width - padding.right - unitw)) {
            popWin.style.left = x - unitw + "px";
        } else if (x > (ops.width - padding.right - unitw)) {
            popWin.style.right = (ops.width - x + 1) + "px";
        } else {
            popWin.style.left = x + 1 + "px";
        }
    }

}

// 悬浮窗的位置。
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
            popWin.style.right = "0px";
        } else {
            popWin.style.right = (ops.width - x - (bcr.width + 2) / 2) + "px";
        }
    } else {
        popWin.style.right = "";
        if (x < bcr.width / 2) {
            popWin.style.left = "0px";
        } else {
            popWin.style.left = (x - (bcr.width + 2) / 2) + "px";
        }
    }

    // 计算浮窗是在上面还是在下面
    var drawh = ops.height - padding.top - padding.bottom - th.head - th.foot;
    var kAxisMax = info.kAxisMax;
    var kAxisMin = info.kAxisMin;
    var diff = kAxisMax - kAxisMin;
    var mid = kAxisMin - 0 + diff / 2;

    // console.log(datak)
    // 找出离中线远的那个
    if (datak[3] > mid && datak[4] > mid) {
        var ptop = Math.abs(datak[4] - kAxisMax) / (kAxisMax - kAxisMin) * drawh;   // 计算最低点的坐标
        popWin.style.bottom = "";
        popWin.style.top = (ptop + padding.top + th.head + 4) + "px";
    } else if (datak[3] < mid && datak[4] < mid) {
        var ptop = Math.abs(datak[3] - kAxisMin) / (kAxisMax - kAxisMin) * drawh;   // 计算最低点的坐标
        popWin.style.top = "";
        popWin.style.bottom = (ptop + padding.bottom + th.foot + 4) + "px";
    } else {
        var ptop, t, z, d, c;
        if (Math.abs(datak[3] - mid) > Math.abs(datak[4] - mid)) {
            ptop = Math.abs(datak[4] - kAxisMax) / (kAxisMax - kAxisMin) * drawh;
            t = "top";
            z = "bottom";
            c = padding.top + th.head + 4;
        } else {
            ptop = Math.abs(datak[3] - kAxisMin) / (kAxisMax - kAxisMin) * drawh;
            t = "bottom";
            z = "top";
            c = padding.bottom + th.foot + 4;
        }
        popWin.style[z] = "";
        popWin.style[t] = (ptop + c) + "px";
    }
}


// 弹出信息窗
interactive.prototype.popwinShow = function (tdata, x, y) {
    var ops = this.kObj.options;
    var info = this.kObj.data.info;
    var padding = ops.padding;
    var th = ops.textHeight;
    var popwinItem = ops.popwinItem;

    var decimal = info.decimal;

    function crt(tagname, name, value, diff, format) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        if (format) {
            span.innerText = (value / 1).toFixed(decimal);
        } else {
            span.innerText = (value);
        }

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
    h4.innerText = tdata[0].substr(5);

    var open = crt("div", "开：", tdata[1], tdata[1] - tdata[10], true);
    var high = crt("div", "高：", tdata[3], tdata[3] - tdata[10], true);
    var low = crt("div", "低：", tdata[4], tdata[4] - tdata[10], true);
    var close = crt("div", "收：", tdata[2], tdata[2] - tdata[10], true);
    var zdf = crt("div", "涨幅：", tdata[9] + "%", tdata[9] / 1);

    var popWin = this.kObj.layer.popWin;
    popWin.innerHTML = "";
    popWin.appendChild(h4)
    if (popwinItem.open) {
        popWin.appendChild(open);
    }
    if (popwinItem.high) {
        popWin.appendChild(high);
    }
    if (popwinItem.low) {
        popWin.appendChild(low);
    }
    if (popwinItem.close) {
        popWin.appendChild(close);
    }
    if (popwinItem.change) {
        popWin.appendChild(zdf);
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
// ./modules/chart/web/kmini/interactive.js
// module id = 339
// module chunks = 0
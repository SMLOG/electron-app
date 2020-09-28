var drawLine = require("chart/common/drawLine");
var tools= require("../../common/tools");
// var drawTitle = require("./drawTitle");

/**
 * 交互
 */

function interactive(obj) {
    this.obj = obj;

    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    var lastIndex = -1;

    var ops = this.obj.options;
    var layerui = this.obj.layer.layerUI;
    var popwin = this.obj.layer.popWin;
    var padding = ops.padding;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top;
    var bottom = ops.height - padding.bottom;

    var validWidth = ops.width - left - padding.right;
    var validHeight = ops.height - top - padding.bottom;

    var w = ops.width;
    var h = ops.height;
    var cx = validWidth / 2 + padding.left;
    var cy = validHeight / 2 + padding.top;

    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className;
        var stauts = _this.obj.stauts;

        if (targetClass == "__ui") {
            var dataSize = ops.series.length;
            var x = e.offsetX;
            var y = e.offsetY;
            if (x >= left && x < right && y >= top && y <= bottom) {
                // 计算鼠标当前位置的索引
                var unit = validWidth / (dataSize + 1);
                var px = x - left - (unit / 4);

                var index = (x - left) / validWidth * dataSize;
                index = Math.floor(index);

                _this.intersection(index);
                if (lastIndex != index) {
                    _this.move(x, y, index);
                    // console.log(index)
                    lastIndex = index;
                }

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
            } else {
                _this.hides();
            }
        } else {
            _this.hides();
        }
    });

    
    layerui.addEventListener("mouseleave", function(){
        _this.hides();
    })

}


// 十字线，交叉点
interactive.prototype.intersection = function (index) {
    var ops = this.obj.options;
    var cc = this.obj.layer.layerLoadingC;

    var padding = ops.padding;

    var left = padding.left;
    var top = padding.top;

    var validHeight = ops.validHeight;
    var validWidth = ops.validWidth;
    var dataSize = ops.series.length;

    var unitw = validWidth / dataSize;

    cc.clearRect(0, 0, ops.width, ops.height);
    cc.fillStyle = ops.color.hoverColor;

    var x = left + unitw * index;
    cc.fillRect(x, top - 1, unitw, validHeight);

    cc.globalAlpha = 1;

}


interactive.prototype.move = function (x, y, index) {
    var ops = this.obj.options;

    var data = ops.series[index];
    var names = ops.barNames;

    this.popwinShow(data, names);

    if (this.obj.options.onMove) {
        this.obj.options.onMove(data);
    }
}


// 弹出信息窗
interactive.prototype.popwinShow = function (tdata, names) {
    var ops = this.obj.options;
    var padding = ops.padding;

    function crt(tagname, name, value, subfix) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        span.innerText = tools.formatNumUnit(value, 2, 8) + subfix;

        tag.appendChild(lab);
        tag.appendChild(span);
        return tag;
    }

    function addSymbol(num) {
        var str;
        if (num > 0) {
            str = "+" + num;
        } else {
            str = num;
        }
        return str;
    }

    var popWin = this.obj.layer.popWin;
    popWin.innerHTML = "";

    if (ops.show.floatTitle) {
        var title = document.createElement("h4");
        title.innerText = tdata.title;
        popWin.appendChild(title);
    }

    for (var i = 0; i < tdata.data.length; i++) {
        var ar = tdata.data;
        var name = tdata.names || names;
        var item = crt("div", name[i] + "：", ar[i] , ops.subfix);
        if (ar[i] != "-") {
            popWin.appendChild(item);
        }
    }

    function isBigEnough(item) {
        return item == "-";
    }
    if (tdata.data.every(isBigEnough)) {
        popWin.style.display = "none";
    } else {
        popWin.style.display = "block";
    }

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
    var popWin = this.obj.layer.popWin;
    popWin.style.display = "none";
}

// 清除十字线
interactive.prototype.clearCross = function () {
    var cc = this.obj.layer.layerLoadingC;
    var ops = this.obj.options;
    cc.clearRect(0, 0, ops.width, ops.height);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/interactive.js
// module id = 372
// module chunks = 0
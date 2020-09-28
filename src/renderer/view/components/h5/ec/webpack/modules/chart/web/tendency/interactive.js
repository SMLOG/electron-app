var drawLine = require("chart/common/drawLine");
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

    var points = this.obj.option.data.points;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    var lastIndex = -1;

    var ops = this.obj.options;
    var layerui = this.obj.layer.layerUI;
    var popwin = this.obj.layer.popWin;
    var data = ops.data;
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
        var bcr = layerui.getBoundingClientRect();

        var dataSize = ops.data.length;
        var x = e.clientX - bcr.left;
        var y = e.clientY - bcr.top;


        // console.log(x, y); // ten
        if (x >= left && x < right && y >= top && y <= bottom) {
            // 计算鼠标当前位置的索引
            var unit = validWidth / (dataSize + 1);
            var px = x - left - (unit / 4);
            var index = Math.round((px / (validWidth + unit)) * dataSize);
            console.log(index);

            _this.intersection(x, y, index);

            if (lastIndex != index) {
                _this.move(x, y, index);
                // console.log(index)
                lastIndex = index;
            }

            var item = data[index];
            var axisMax = ops.axisMax;
            var axisMin = ops.axisMin;
            var h = (item[1] - axisMin) / (axisMax - axisMin) * validHeight;


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
                // popwin.style.top = top && top + "px";
                popwin.style.bottom = (h + padding.bottom + 10) + "px";
            }
        } else {
            _this.hides();
            lastIndex = -1;
        }
    });


    layerui.addEventListener("click", function (e) {
        var tgt = e.target;
        var par = tgt.parentNode;

        if (tgt.className == "__point" || par.className == "__point") {
            var index = tgt.getAttribute("data-index") || par.getAttribute("data-index");
            var callback = _this.obj.options.onClickPoint;
            if (callback) {
                callback(points[index]);
            }
        }
    }, true);


}


// 十字线，交叉点
interactive.prototype.intersection = function (x, y) {
    var ops = this.obj.options;
    var cross = this.obj.options.cross;
    var popWin = this.obj.layer.popWin;
    var cc = this.obj.layer.layerLoadingC;

    var padding = ops.padding;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top;
    var bottom = ops.height - padding.bottom;

    cc.clearRect(0, 0, ops.width, ops.height);

    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.color;
    drawLine.dashed(cc, x, top, x, bottom, cross.solid, cross.dashed);
    // drawLine.dashed(cc, left, y, right, y, cross.solid, cross.dashed);

    // cc.fillStyle = cross.dot.color;
    // cc.globalAlpha = cross.dot.opacity ;
    // var count = cross.dot.count;
    // for (var i = count; i > 0; i--) {
    //     var r = cross.dot.radius * i / count;
    //     cc.beginPath();
    //     cc.arc(x, y, r, 0, Math.PI * 2);
    //     cc.fill();
    // }
    // cc.globalAlpha = 1;

}


interactive.prototype.move = function (x, y, index) {
    var ops = this.obj.options;
    var padding = ops.padding;

    var validWidth = ops.width - padding.left - padding.right;
    var data = ops.data[index];
    var point = this.findPointByIndex(index);

    this.popwinShow(data, point, x, index);

    if (this.obj.options.onMove) {
        this.obj.options.onMove(data, point);
    }
}


interactive.prototype.findPointByIndex = function (index) {
    var points = this.obj.option.data.points;
    var point = null;
    if (points) {
        var ops = this.obj.options;
        var timeSeq = ops.timeSeq;

        var date = "";
        for (var key in timeSeq) {
            if (timeSeq[key] === index) {
                date = key;
                break;
            }
        }

        for (var i = 0; i < points.length; i++) {
            if (points[i].date == key) {
                point = points[i];
                break;
            }
        }
    }

    return point;
}

// 弹出信息窗
interactive.prototype.popwinShow = function (tdata, point, x, index) {
    var ops = this.obj.options;
    var padding = ops.padding;

    function crt(tagname, name, value, diff) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        span.innerText = value;

        // if (diff === 0) {
        //     span.className = "__hold";
        // } else if (diff > 0) {
        //     span.className = "__rise";
        // } else if (diff < 0) {
        //     span.className = "__fall";
        // }
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

    var title = document.createElement("h4");
    title.innerText = tdata[0];
    var close = crt("div", "收盘价：", tdata[1]);
    var change = crt("div", "涨跌幅：", addSymbol(tdata[2]) + "%");

    popWin.appendChild(title);
    popWin.appendChild(close);
    if (index != 0) {
        popWin.appendChild(change);
    }

    if (point) {
        var yd = document.createElement("div");
        yd.innerHTML = point.html;
        popWin.appendChild(yd);
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
// ./modules/chart/web/tendency/interactive.js
// module id = 362
// module chunks = 0
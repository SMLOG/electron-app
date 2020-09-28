var drawLine = require("chart/common/drawLine");

/**
 * 交互
 */

function interactive(chart) {
    this.chart = chart;

    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    var lastIndex = -1;

    var chart = this.chart;
    var ops = chart.options;
    var layerui = chart.layer.layerUI;
    var padding = ops.padding;

    document.onclick = function(e){
        console.info(e.target)
    }

    layerui.addEventListener("mousemove", function (e) {
        var stauts = chart.stauts;

        if (stauts != 1) {
            return;
        }

        var targetClass = e.target.className;


        if (targetClass == "__ui") {        // fund
            var x = e.offsetX;
            var y = e.offsetY;

            var format = chart.format;

            var sx = format.sx;
            var sy = format.sy;
            var ex = format.ex;
            var ey = format.ey;

            if (x >= sx - 1 && x < ex && y >= sy && y <= ey) {
                _this.intersection(x, y);
                // _this.move(x, y);
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
    var chart = this.chart;
    var ops = chart.options;
    var cross = chart.options.cross;
    var cc = chart.layer.layerInteractionC;

    var format = chart.format;

    var size = format.size;
    var sx = format.sx;
    var sy = format.sy;
    var ex = format.ex;
    var ey = format.ey;
    var ymax2 = format.ylmax || 0;
    var ymin2 = format.ylmin || 0;

    var dw = ex - sx;
    var dh = ey - sy;
    var diffy2 = ymax2 - ymin2;
    var unitw = dw / size;

    var index = Math.ceil((x - sx) / unitw) - 1;

    if (index <= -1) {
        index = 0;
    }

    // if (index == this.index) {
    //     return;
    // }

    var datak = format.k;
    var datal = format.l;

    var cur = 0;
    var ke;
    for (var key in datak) {
        if (index === cur) {
            ke = key;
            break;
        }
        cur++;
    }

    var linex = sx + (index) * unitw + unitw / 2;

    cc.clearRect(0, 0, ops.width, ops.height);
    drawLine.dashed(cc, linex, sy, linex, ey, cross.solid, cross.dashed);

    for (var i = 0, len = datal.length; i < len; i++) {
        var da = datal[i].data;

        var cd = da[ke];
        var liney = sy + (ymax2 - cd) / diffy2 * dh;

        cc.fillStyle = datal[i].color;
        cc.globalAlpha = cross.dot.opacity;
        var count = cross.dot.count;
        for (var j = count; j > 0; j--) {
            var r = cross.dot.radius * j / count;
            cc.beginPath();
            cc.arc(linex, liney, r, 0, Math.PI * 2);
            cc.fill();
        }
    }

    cc.globalAlpha = 1;

    this.popShow(x, y, ke)

    this.lastIndex = index;
}



interactive.prototype.popShow = function (x, y, ke) {
    var chart = this.chart;
    var format = chart.format;
    var ops = chart.options;

    var datak = format.k;
    var datal = format.l;

    var pop = chart.layer.pop;
    pop.innerHTML = "";


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

    pop.appendChild(cdom(ke, ""));

    for (var i = 0, len = datal.length; i < len; i++) {
        var line = datal[i];
        var da = line.data;
        var val = da[ke];
        if (line.cb) {
            val = line.cb(val);
        }
        if (val != 0 && val) {
            var item = cdom(line.name, val);
            pop.appendChild(item);
        }
    }


    var kd = datak[ke];
    
    pop.appendChild(cdom("开盘", kd.o));
    pop.appendChild(cdom("收盘", kd.c));
    pop.appendChild(cdom("最高", kd.h));
    pop.appendChild(cdom("最低", kd.l));


    if (x < ops.width / 2) {
        pop.style.left = x + 8 + "px";
        pop.style.right = "";
    } else {
        pop.style.right = (ops.width - x) + 8 + "px";
        pop.style.left = "";
    }
    if (y < ops.height / 2) {
        pop.style.top = y + 8 + "px";
        pop.style.bottom = "";
    } else {
        pop.style.bottom = (ops.height - y) + 8 + "px";
        pop.style.top = "";
    }

    pop.style.display = "block";
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
    var pop = this.chart.layer.pop;
    pop.style.display = "none";
}

// 清除十字线
interactive.prototype.clearCross = function () {
    var cc = this.chart.layer.layerInteractionC;
    var ops = this.chart.options;
    cc.clearRect(0, 0, ops.width, ops.height);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline/interactive.js
// module id = 481
// module chunks = 0
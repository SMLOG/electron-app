var tcolor = require("chart/common/color");


function drawLines(obj) {
    this.obj = obj;

    this.init();
}

// 计算坐标轴的最值
drawLines.prototype.init = function () {
    var ops = this.obj.options;

    var max = -Infinity;
    var min = Infinity;

    var data = ops.data;

    for (var i = 0; i < data.length; i++) {
        var day = data[i];
        max = max > day[1] ? max/1 : day[1]/1;
        min = min < day[1] ? min/1 : day[1]/1;
    }

    var diff = max - min;

    ops.max = max;
    ops.min = min;
    // ops.axisMax = max;
    // ops.axisMin = min;
    ops.axisMax = (max + diff * 0.5).toFixed(2);
    ops.axisMin = (min - diff* 0.5).toFixed(2);

}


drawLines.prototype.draw = function () {
    this._clear();
    this.drawLine();
    this.drawAxis();
}

drawLines.prototype._clear = function(){
    var ops = this.obj.options;
    var cc1 = this.obj.layer.layerKC;               // 折线
    var cc2 = this.obj.layer.layerAbnormalC;        // 异动点

    cc1.clearRect(0, 0, ops.width, ops.height);
    cc2.clearRect(0, 0, ops.width, ops.height);
}

// 画折线
drawLines.prototype.drawLine = function () {
    var ops = this.obj.options;
    var padding = ops.padding;
    var color = ops.color;
    var circle = ops.circle;        // 打点的圆的参数

    var points = this.obj.option.data.points;     // 打点数据
    var data = ops.data;

    var cc = this.obj.layer.layerKC;

    var width = ops.width;
    var height = ops.height;

    var max = ops.axisMax;
    var min = ops.axisMin;
    var diff = max - min;

    var validWidth = width - padding.left - padding.right;
    var validHeight = height - padding.top - padding.bottom;
    var base = height - padding.bottom;
    var unit = validWidth / (data.length - 1);


    var fillColor = color.fill;
    var grad = cc.createLinearGradient(0, 0, 0, validHeight);
    for (var i = 0, len = fillColor.length; i < len; i++) {
        grad.addColorStop(i / (len - 1), fillColor[i]);
    }

    var timeSeq = {};       // 时间轴序列
    cc.fillStyle = grad;
    cc.strokeStyle = color.line;
    cc.beginPath();
    for (var i = 0; i < data.length; i++) {
        var day = data[i];
        timeSeq[day[0]] = i;
        var x = padding.left + i * unit;
        var h = (day[1] - min) / diff * validHeight;
        var y = base - h;
        if (i == 0) {
            cc.moveTo(x, y);
        } else {
            cc.lineTo(x, y);
        }
    }
    cc.stroke();
    cc.lineTo(padding.left + validWidth, height - padding.bottom);
    cc.lineTo(padding.left, height - padding.bottom);
    cc.closePath();
    cc.fill();


    // 绘制圆点
    if (points) {
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var index = timeSeq[p.date];
            var x = null;
            if (index !== undefined) {
                x = padding.left + index * unit;
            }
            var day = this.findDayByDate(p.date);
            var h = (day[1] - min) / diff * validHeight;
            var y = base - h;

            this.domCircle(x, y, circle.radius, p.color || circle.color, i);
        }
    }

    this.obj.options.timeSeq = timeSeq;

}

// 画圆点
drawLines.prototype.drawCircle = function (x, y, radius, ccolor) {
    var ops = this.obj.options;
    var cc = this.obj.layer.layerAbnormalC;

    var out = tcolor.toRGBA(ccolor, 0.4);
    // console.log(out);

    cc.beginPath();
    cc.fillStyle = out;
    cc.arc(x, y, radius, 0, Math.PI * 2);
    cc.fill();
    cc.closePath();

    cc.beginPath();
    cc.fillStyle = ccolor;
    cc.arc(x, y, radius - 2, 0, Math.PI * 2);
    cc.fill();
    cc.closePath();

}

// 创建div圆点
drawLines.prototype.domCircle = function(x, y, radius, ccolor, index){
    // radius = 30;
    
    var points = this.obj.layer.points;
    
    var div = document.createElement("div");
    div.className = "__point";
    div.setAttribute("data-index", index);
    div.style.backgroundColor = tcolor.toRGBA(ccolor, 0.5) ;
    div.style.width = 2 * radius + "px";
    div.style.height = 2 * radius + "px";
    div.style.top = (y - radius) + "px";
    div.style.left = (x - radius) + "px";

    var div2 = document.createElement("div");;
    div2.style.backgroundColor = ccolor;

    div.appendChild(div2);
    points.appendChild(div);
}



// 画轴刻度
drawLines.prototype.drawAxis = function () {
    var ops = this.obj.options;
    var grid = ops.grid;
    var padding = ops.padding;
    var data = ops.data;
    var font = ops.font;
    var color = ops.color;

    var cc = this.obj.layer.layerKC;

    var max = ops.axisMax;
    var min = ops.axisMin;
    var diff = max - min;

    var unitn = diff / (grid.y);
    var unith = (ops.height - padding.top - padding.bottom) / grid.y;
    var base = ops.height - padding.bottom;

    // cc.clearRect(0, 0, padding.left - 1, ops.height);

    cc.fillStyle = color.text;
    for (var i = 0, len = grid.y + 1; i < len; i++) {
        var txt = (min - 0 + i * unitn).toFixed(2);
        var tw = cc.measureText(txt).width;
        var y = base - i * unith;
        cc.fillText(txt, padding.left - tw - 8, y);
    }

    var frist = data[0];
    var last = data[data.length - 1];

    cc.fillText(frist[0], padding.left, base + font.size);
    var lastw = cc.measureText(last[0]).width;
    var x = ops.width - padding.right - lastw;
    cc.fillText(last[0], x, base + font.size);

}

// 按照日期查找数据
drawLines.prototype.findDayByDate = function (date) {
    var ops = this.obj.options;
    var data = ops.data;

    for (var i = 0; i < data.length; i++) {
        var day = data[i];
        if (day[0] == date) {
            return day;
        }
    }
    return false;
}



module.exports = drawLines;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency/drawLines.js
// module id = 361
// module chunks = 0
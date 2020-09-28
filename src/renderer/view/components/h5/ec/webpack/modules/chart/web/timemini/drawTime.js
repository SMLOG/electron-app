var tools = require("../../common/tools");


function drawTime(kObj) {

    this.kObj = kObj;
    this.cc = kObj.layer.layerKC;
    this.ccData = kObj.layer.layerDataC;
    this.data = kObj.data;
    this.ops = kObj.options;

    // 挂在到自身，方便调用
    this.padding = this.ops.padding;
    this.color = this.ops.color;
    this.font = this.ops.font;


}


drawTime.prototype.draw = function () {
    this.clear();
    this.drawTimeLine();

    this.drawTime();
    if (this.data.time.length > 0) {
        this.axisY();
    }
}


drawTime.prototype.drawTimeLine = function () {
    var cc = this.cc;
    var ops = this.ops;
    var data = this.data;
    var time = data.time;
    var info = data.info;

    time = time.slice(0, info.total);

    var color = ops.color;
    var padding = ops.padding;
    var th = ops.textHeight;
    var dw = ops.width - padding.left - padding.right;
    var dh = ops.height - padding.top - padding.bottom - th.head - th.foot;

    var total = info.total;
    var axisMax = info.axisMax;
    var axisMin = info.axisMin;
    var diff = axisMax - axisMin;

    console.log(data);
    var basey = padding.top + th.head;

    var fillColor = color.fill;
    var grad = cc.createLinearGradient(0, 0, 0, ops.height - padding.top);
    for (var i = 0, len = fillColor.length; i < len; i++) {
        grad.addColorStop(i / (len - 1), fillColor[i]);
    }

    cc.fillStyle = grad;
    cc.strokeStyle = color.line;

    cc.beginPath();
    // cc.moveTo(padding.left, ops.height - padding.bottom - th.foot);  
    var x;
    for (var i = 0; i < time.length; i++) {
        var ar = time[i];
        // console.log(ar)
        x = padding.left + (i / (total - 1)) * dw;
        var y = basey + (Math.abs(ar[1] - axisMax) / diff) * dh;
        if (i == 0) {
            cc.moveTo(x, y);
        } else {
            cc.lineTo(x, y);
        }
    }
    cc.stroke();
    cc.lineTo(x, ops.height - padding.bottom - th.foot);
    cc.lineTo(padding.left, ops.height - padding.bottom - th.foot);
    cc.closePath();
    cc.fill();

}

// 清除绘图区域
drawTime.prototype.clear = function () {
    var width = this.ops.width;
    var height = this.ops.height;

    this.cc.clearRect(0, 0, width, height);
    this.ccData.clearRect(0, 0, width, height);
}

// 绘制时间轴
drawTime.prototype.drawTime = function () {
    var cc = this.kObj.layer.layerDataC;
    var data = this.kObj.data;
    var ticks = data.info.ticks.split("|");

    var ops = this.ops;
    var padding = ops.padding;
    var font = ops.font;
    var color = ops.color;
    var th = ops.textHeight;

    var base = ops.height - padding.bottom - th.foot + font.size / 2 + 2;

    var txt = tools.secondsToTime(ticks[1]);
    var txtw = cc.measureText(txt).width;

    cc.fillStyle = color.text;
    cc.fillText(txt, (padding.left + 2), base);

    txt = tools.secondsToTime(ticks[ticks.length - 1]);
    txtw = cc.measureText(txt).width;
    cc.fillText(txt, (ops.width - padding.right - txtw - 2), base);

    // var txt3w = cc.measureText(txts[2]).width;
}

// y轴刻度
drawTime.prototype.axisY = function () {
    var cc = this.kObj.layer.layerDataC;
    var ops = this.kObj.options;
    var padding = this.ops.padding;
    var th = ops.textHeight;
    var font = ops.font;
    var color = ops.color;

    var dinfo = this.kObj.data.info;
    var decimal = dinfo.decimal;        // 保留的小数
    var max = dinfo.axisMax;
    var min = dinfo.axisMin;
    var mid = min / 1 + (max - min) / 2;
    var axis = [max, min, min];

    var dh = ops.height - padding.top - th.head - padding.bottom - th.foot - font.size - 8;

    var unitH = dh / 2;
    var base = padding.top + th.head + font.size / 2 + 4;

    cc.clearRect(0, 0, padding.left, ops.height);
    var left = padding.left + 2;

    var txt1 = (max / 1).toFixed(decimal);
    var y1 = base + unitH * 0;
    cc.fillStyle = color.rise;
    cc.fillText(txt1, left, y1);

    txt1 = (mid / 1).toFixed(decimal);
    y1 = base + unitH * 1;
    cc.fillStyle = color.text;
    cc.fillText(txt1, left, y1);

    txt1 = (min / 1).toFixed(decimal);
    y1 = base + unitH * 2;
    cc.fillStyle = color.fall;
    cc.fillText(txt1, left, y1);

}



module.exports = drawTime;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/drawTime.js
// module id = 350
// module chunks = 0
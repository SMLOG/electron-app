/**
 * 绘制k线
 */

var drawGrid = require("./drawGrid");

var coordinate = require("chart/common/coordinate");

function drawBlockK(kObj) {
    this.kObj = kObj;
    this.cc = kObj.layer.layerKC;
    this.ccData = kObj.layer.layerDataC;
    this.ops = kObj.options;

    // 挂在到自身，方便调用
    this.padding = this.ops.padding;
    this.color = this.ops.color;
    this.font = this.ops.font;
}

drawBlockK.prototype.draw = function () {
    this.clear();

    this.drawPillar();       // 绘制k线柱子

    if (this.kObj.data.k.length > 0) {
        this.drawTime();    // 绘制k线下面的日期
        this.axisY();
    }

}

// 清除绘图区域
drawBlockK.prototype.clear = function () {
    var width = this.ops.width;
    var height = this.ops.height;

    this.cc.clearRect(0, 0, width, height);
    this.ccData.clearRect(0, 0, width, height);
}

// 绘制k线柱
drawBlockK.prototype.drawPillar = function () {
    var cc = this.cc;
    var ops = this.ops;
    var padd = this.padding;
    var th = ops.textHeight;

    var data = this.kObj.data;      // 数据
    var size = data.k.length;
    if (size < ops.minPillar) {
        size = ops.minPillar;
    }

    var width = ops.width;
    var height = ops.height;

    var max = data.info.kAxisMax;        // K最大值
    var min = data.info.kAxisMin;        // K最小值

    var drawSumWdith = width - padd.left - padd.right;        // 绘图宽度
    var drawSumHeight = height - padd.top - th.head - padd.bottom - th.foot;        // 绘图高度

    var pillarWidht = drawSumWdith / size;            // 每根柱子的区域宽度
    var cha = max - min;

    var baseK = height - padd.bottom - th.foot;         // k线的绘制基线

    var kdata = data.k;
    for (var i = 0, len = kdata.length; i < len; i++) {
        var d = kdata[i];

        //  [开，收，高，低] 柱子的高度
        var ho = (d[1] - min) / cha * drawSumHeight;       // 开，
        var hc = (d[2] - min) / cha * drawSumHeight;       // 收，
        var hh = (d[3] - min) / cha * drawSumHeight;       // 高，
        var hl = (d[4] - min) / cha * drawSumHeight;       // 低

        var x = padd.left + (pillarWidht * i) + (pillarWidht / 2);

        // 绘制一根柱子
        this.drawPillarItem({
            ho: baseK - ho,
            hc: baseK - hc,
            hh: baseK - hh,
            hl: baseK - hl,
            x: x,
            width: pillarWidht
        }, d[2] - d[1]);
    }

    var dataLast = data[data.length - 1];

}

// 绘制单个柱子
drawBlockK.prototype.drawPillarItem = function (obj, change) {
    var cc = this.cc;
    var color = this.color;

    var ho = obj.ho;
    var hc = obj.hc;
    var hh = obj.hh;
    var hl = obj.hl;
    var x = obj.x;
    var width = obj.width;
    var w = Math.floor( width / 2 * 0.7);

    if (change > 0) {
        cc.strokeStyle = color.rise;
        cc.fillStyle = "rgba(0,0,0,0)";
    } else if (change == 0) {
        cc.strokeStyle = color.equality;
        cc.fillStyle = "rgba(0,0,0,0)";
    } else {
        cc.strokeStyle = color.fall;
        cc.fillStyle = color.fall;
    }
    // console.info(22222)
    // console.info(w)
    if (w <= 1) {
        cc.EMFillRect2(x, w, ho, hc);
    }
    else{
        cc.EMFillRect3(x, w, ho, hc);
    }
    // cc.EMFillRect(x - w, ho, x + w, hc);
    

    if (ho > hc) {   // 涨
        // 上面的线
        if (hh < hc) {
            cc.EMLine(x, hc, x, hh);
        }
        // 下面的线
        if (hl > ho) {
            cc.EMLine(x, ho, x, hl);
        }
    } else {
        if (hh < ho) {
            cc.EMLine(x, ho, x, hh);
        }
        if (hl > hc) {
            cc.EMLine(x, hc, x, hl);
        }
    }
}


// 绘制时间轴
drawBlockK.prototype.drawTime = function () {
    var cc = this.kObj.layer.layerDataC;
    var data = this.kObj.data;

    var ops = this.ops;
    var padding = ops.padding;
    var font = ops.font;
    var color = ops.color;

    var size = data.k.length;
    var mid = Math.round(size / 2)

    var txts = [];
    if (data.k.length > 0) {
        txts.push(data.k[0][0].substr(5));
        if (data.k.length >= ops.minPillar) {
            txts.push(data.k[mid][0].substr(5));
            txts.push(data.k[size - 1][0].substr(5));
        }
    }
    
    // console.log(txts)

    var xs = padding.left;
    var base = ops.height - padding.bottom - ops.textHeight.foot / 2;

    cc.font = font.size + "px " + font.family;
    cc.fillStyle = color.text;
    if (data.k.length > 0) {
        cc.fillText(txts[0], xs + 1, base);
    }

    if (data.k.length >= ops.minPillar) {
        var txt2w = cc.measureText(txts[1]).width;
        cc.fillText(txts[1], (ops.width / 2 - txt2w / 2), base);

        var txt3w = cc.measureText(txts[2]).width;
        cc.fillText(txts[2], (ops.width - padding.right - txt3w - 1), base);
    }
   
}

// y轴刻度
drawBlockK.prototype.axisY = function () {
    var cc = this.kObj.layer.layerDataC;
    var ops = this.kObj.options;
    var padding = this.ops.padding;
    var th = ops.textHeight;
    var font = ops.font;
    var color = ops.color;

    var dinfo = this.kObj.data.info;
    var decimal = dinfo.decimal;        // 保留的小数
    var max = dinfo.kAxisMax;
    var min = dinfo.kAxisMin;
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
    cc.fillText(txt1, coordinate.format(left), coordinate.format(y1));

    var txt1 = (mid / 1).toFixed(decimal);
    var y1 = base + unitH * 1;
    cc.fillStyle = color.text;
    cc.fillText(txt1, coordinate.format(left), coordinate.format(y1));

    var txt1 = (min / 1).toFixed(decimal);
    var y1 = base + unitH * 2;
    cc.fillStyle = color.fall;
    cc.fillText(txt1, coordinate.format(left), coordinate.format(y1));

}



module.exports = drawBlockK;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/drawK.js
// module id = 337
// module chunks = 0
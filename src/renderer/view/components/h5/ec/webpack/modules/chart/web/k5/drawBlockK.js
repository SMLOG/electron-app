/**
 * 绘制k线
 */

var drawGrid = require("./drawGrid");

var coordinate = require("chart/common/coordinate");
var drawLine = require("chart/common/drawLine");
var arrayExtension = require("chart/common/arrayExtension");


function drawBlockK(kObj) {
    this.kObj = kObj;
    this.cc = kObj.layer.layerKC;
    this.ccGrid = kObj.layer.layerGridC;
    this.ops = kObj.options;

    // 挂在到自身，方便调用
    this.padding = this.ops.padding;
    this.color = this.ops.color;
    this.font = this.ops.font;
    this.drawRegion = this.ops.drawRegion;
}

drawBlockK.prototype.draw = function () {
    this.clear();

    // this.drawTime();    // 绘制k线下面的日期
    // 重新绘制网格
    drawGrid.verticalLine(this.kObj, 1);
    drawGrid.gridK(this.ccGrid, this.ops);

    this.drawPillar();       // 绘制k线柱子

    this.axisY();
}

// 清除绘图区域
drawBlockK.prototype.clear = function () {
    // var cc = this.kObj.layer.layerGridC;

    var width = this.ops.width;
    var kregion = this.drawRegion.k;
    var h = kregion.h - kregion.mb + 1 + this.padding.top;

    this.cc.clearRect(0, 0, width, h);
    this.ccGrid.clearRect(0, 0, width, h);
}

// 绘制k线柱
drawBlockK.prototype.drawPillar = function () {
    var cc = this.cc;
    var ops = this.ops;
    var scale = ops.scale;
    var padding = ops.padding;
    var smaxin = ops.maxin;     // 配置项

    var data = scale.data;      // 数据

    var max = scale.info.newKAxisMax;        // K最大值
    var min = scale.info.newKAxisMin;        // K最小值
    var maxTrading = scale.info.maxTrading;      // 成交量最大值
    var minTrading = scale.info.minTrading;      // 成交量最小值
    var pillar = scale.pillar;                     // 柱子数量
    if (data.length < pillar) {
        pillar = data.length;
    }
    if (data.length < scale.min) {
        pillar = scale.min;
    }

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var k = ops.drawRegion.k;
    var t = ops.drawRegion.trading;             //
    var kheight = k.h - k.mt - k.mb;                   // k线绘图高度
    var theight = t.h - t.pt;                   // 成交量绘图高度

    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度
    var cha = max - min;

    var baseK = k.h - k.mb + padding.top;         // k线的绘制基线
    var baseT = t.h + t.top + padding.top;      // 成交量的基线位置

    // 网格上的最高最低位置
    var maxin = {
        basey: baseK,
        max: 0,
        maxindex: -1,
        maxprise: 0,
        maxx: 0,
        min: 99999,
        minindex: -1,
        minx: 0,
        minprise: 99999999,
    }
    for (var i = 0; i < data.length; i++) {
        var d = data[i];

        //  [开，收，高，低] 柱子的高度
        var ho = (d[1] - min) / cha * kheight;       // 开，
        var hc = (d[2] - min) / cha * kheight;       // 收，
        var hh = (d[3] - min) / cha * kheight;       // 高，
        var hl = (d[4] - min) / cha * kheight;       // 低

        var x = this.padding.left + (pillarWidht * i) + (pillarWidht / 2);

        // 找出最高最低点。之后用于标记
        var mm = arrayExtension.findMaxMin([ho, hc, hh, hl]);
        if (mm.max > maxin.max) {
            maxin.max = mm.max;
            maxin.maxindex = i;
            maxin.maxx = x;
            maxin.maxprise = d[3];
        }
        if (mm.min < maxin.min) {
            maxin.min = mm.min;
            maxin.minindex = i;
            maxin.minx = x;
            maxin.minprise = d[4];
        }

        // 绘制一根柱子
        this.drawPillarItem({
            ho: baseK - ho,
            hc: baseK - hc,
            hh: baseK - hh,
            hl: baseK - hl,
            x: x,
            change: d[9] / 1,
            width: pillarWidht
        });
    }

    // 绘制最高最低标记
    if (smaxin.show && data.length > 0) {
        this.maxmin(maxin);
    }

}

// 绘制单个柱子
drawBlockK.prototype.drawPillarItem = function (obj) {
    var cc = this.cc;
    var color = this.color;
    var pillarWidth = this.ops.pillarWidth;     // 柱子宽度比例

    var ho = obj.ho;
    var hc = obj.hc;
    var hh = obj.hh;
    var hl = obj.hl;
    var x = obj.x;
    var width = obj.width;
    var w = width / 2;

    if (hc < ho) {
        cc.strokeStyle = color.rise;
        cc.fillStyle = "rgba(0,0,0,0)";
    } else if (hc == ho) {
        cc.strokeStyle = color.equality;
        cc.fillStyle = "rgba(0,0,0,0)";
        if (obj.change > 0) {
            cc.strokeStyle = color.rise;
        } else if (obj.change < 0) {
            cc.strokeStyle = color.fall;
            cc.fillStyle = color.fall;
        }
    } else {
        cc.strokeStyle = color.fall;
        cc.fillStyle = color.fall;
    }

    var x = coordinate.format(x);

    // cc.EMFillRect(temp1, ho, temp2, hc, x);
    cc.EMFillPillar(ho, hc, x, w, pillarWidth)

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
    var cc2 = this.kObj.layer.layerGridC;

    var ops = this.ops;
    var padding = ops.padding;
    var font = ops.font;
    // var color = ops.color;

    var drawRegion = ops.drawRegion;
    var k = drawRegion.k;
    var drawSumWdith = drawRegion.drawSumWdith;        // 绘图宽度
    var kHeight = k.h - k.mt - k.mb;               // k线区域高度
    var startx = k.top + k.mt + k.pt;   // 竖线的起始位置
    var endx = startx + kHeight;

    // 筛选绘制时间的个数
    var time = ops.scale.time;
    var unit = drawSumWdith / time.length;
    var count = Math.floor(drawSumWdith / 100) - 1;
    var skew = Math.round(time.length / count / 2);     // 偏移

    var xaxis = [];
    xaxis.push({
        index: 0,
        time: time[0]
    });
    for (var i = 1; i < count; i++) {
        var index = Math.floor(time.length / count * i);
        xaxis.push({
            index: index,
            time: time[index]
        });
    }
    xaxis.push({
        index: time.length - 1,
        time: time[time.length - 1]
    });

    cc.beginPath();
    cc.clearRect(padding.left, k.h - k.mb, drawSumWdith, k.mb - 1);
    cc.fillStyle = this.color.text;
    cc.font = font.size + "px " + font.family;

    // 精确计算时间轴上各个点的坐标
    var txtFrist = cc.measureText(xaxis[0]).width;
    var txtLast = cc.measureText(xaxis[xaxis.length - 1]).width;
    var q2width = drawSumWdith - (txtFrist / 2) - (txtLast / 2);        // 去掉头尾两个时间
    var timeUnitWidth = q2width / (xaxis.length - 1);
    var textY = k.h - (k.mb / 2) - 1 + padding.top;
    for (var i = 0, len = xaxis.length; i < len; i++) {
        var item = xaxis[i];
        var txt = item.time;

        if (i == 0) {
            cc.fillText(txt, padding.left, textY);
        } else if (i == len - 1) {
            var txtw = cc.measureText(txt).width;
            cc.fillText(txt, padding.left + drawSumWdith - txtw, textY);
        } else {
            var txtw = cc.measureText(txt).width;
            var x = padding.left + unit * item.index + (unit / 2);
            cc.fillText(txt, x - (txtw / 2), textY);

            cc2.strokeStyle = this.color.dashed;
            drawLine.dashed(cc2, x, startx, x, endx)
        }
    }
}

// y轴刻度
drawBlockK.prototype.axisY = function () {
    var cc = this.kObj.layer.layerDataC;
    var options = this.kObj.options;
    var padding = this.ops.padding;
    var font = this.ops.font;

    var splity = this.ops.scale.info.splity;
    var region = this.ops.drawRegion.k;
    var k = region;
    var dinfo = this.kObj.data.info;
    var scale = options.scale;
    var info = scale.info;
    var cyq = options.cyq || {};

    var decimal = dinfo.decimal;        // 保留的小数

    var top = k.top + k.mt;
    var h = k.h - k.mt - k.mb;
    // k线框的高度
    var dh = region.h - region.mt - region.pt - region.mb;

    var newKAxisMax = info.newKAxisMax;
    var newKAxisMin = info.newKAxisMin;
    var splity = info.splity;
    var diff = newKAxisMax - newKAxisMin;

    var cyqRight = options.width - padding.right;
    var cyqStart = cyqRight - (cyq.width || 0);

    cc.clearRect(0, 0, padding.left, region.h);
    if (cyq.width) {
        cc.clearRect(cyqStart, 0, cyq.width, region.h);
    }

    for (var i = 0, len = splity.length; i < len; i++) {
        var val = splity[i];
        if (val <= newKAxisMax && val >= newKAxisMin) {
            var hei = (newKAxisMax - val) / diff * h;
            var y = top + hei;

            var txt;
            if (val > 10000) {
                txt = (val / 1).toFixed(0);
            } else {
                txt = (val / 1).toFixed(decimal);
            }
            var valw = cc.measureText(txt).width;
            cc.fillText(txt + "", padding.left - valw - 4, y);

            if (cyq.width && y > top + font.size / 2 && y < (top + h) - font.size / 2) {
                cc.fillText(txt + "", cyqRight - valw - 4, y);
            }

        }
    }



    // var unitH = dh / (splity.length - 1);
    // var base = region.top + region.mt + region.pt;

    // cc.clearRect(0, 0, padding.left, region.h)
    // cc.fillStyle = this.color.text;

    // for (var i = 0; i < splity.length; i++) {
    //     var txt;
    //     if (splity[i] > 10000) {
    //         txt = splity[i].toFixed(0);
    //     } else {
    //         txt = splity[i].toFixed(decimal);
    //     }
    //     var txtWidht = cc.measureText(txt).width;

    //     var left = padding.left - txtWidht - 8;
    //     var y = base + unitH * i;

    //     cc.fillText(txt, coordinate.format(left), coordinate.format(y));
    // }

}

// 最大最小值标记
drawBlockK.prototype.maxmin = function (maxin) {
    var cc = this.kObj.layer.layerGridC;
    var color = this.color;
    var ops = this.ops;
    var scale = ops.scale;
    var pillar = scale.pillar;
    var maxinLine = ops.maxin;
    var leng = scale.data.length;
    var fontsize = ops.font.size;

    var angle = maxinLine.lineWidth * Math.tan(Math.PI / 180 * maxinLine.angle);

    // 最低点
    var y = maxin.basey - maxin.min + maxinLine.skewy;
    var x1, x2, txtx;
    if (maxin.minindex > leng / 2) {
        x1 = maxin.minx - maxinLine.skewx;
        x2 = maxin.minx - maxinLine.skewx - maxinLine.lineWidth;
        txtx = x2 - maxinLine.skewx - cc.measureText(maxin.minprise).width;
    } else {
        x1 = maxin.minx + maxinLine.skewx;
        x2 = maxin.minx + maxinLine.skewx + maxinLine.lineWidth;
        txtx = x2 + maxinLine.skewx;
    }
    cc.beginPath();
    cc.strokeStyle = maxinLine.color;
    cc.fillStyle = maxinLine.color;
    cc.strokeWidth = 1;
    cc.moveTo(x1, coordinate.format(y));
    cc.lineTo(x2, coordinate.format(y - angle));
    cc.stroke();
    this.triangle(cc, x1, x2, y, maxinLine, 1);
    cc.fillText(maxin.minprise, txtx, y - angle);
    cc.closePath();

    // 最高点
    var y = maxin.basey - maxin.max - maxinLine.skewy;
    if (maxin.maxindex > leng / 2) {
        x1 = maxin.maxx - maxinLine.skewx;
        x2 = maxin.maxx - maxinLine.skewx - maxinLine.lineWidth;
        txtx = x2 - maxinLine.skewx - cc.measureText(maxin.maxprise).width;
    } else {
        x1 = maxin.maxx + maxinLine.skewx;
        x2 = maxin.maxx + maxinLine.skewx + maxinLine.lineWidth;
        txtx = x2 + maxinLine.skewx;
    }
    cc.save();
    cc.beginPath();
    cc.strokeWidth = 1;
    cc.moveTo(x1, coordinate.format(y));
    cc.lineTo(x2, coordinate.format(y + angle));
    cc.stroke();
    this.triangle(cc, x1, x2, y, maxinLine, -1);
    cc.fillText(maxin.maxprise, txtx, y + angle);
    cc.closePath();
    cc.restore()

}

// 画三角箭头
drawBlockK.prototype.triangle = function (cc, x1, x2, y1, maxin, dur) {

    var base = 0;
    if (x2 < x1) {
        base = 180;
        base += (maxin.angle * dur);
    } else {
        base -= (maxin.angle * dur);
    }

    var a1 = Math.PI / 180 * (base - 20);
    var a2 = Math.PI / 180 * (base + 20);

    var len = 6;

    var ax1 = len * Math.cos(a1);
    var ay1 = len * Math.sin(a1);
    var ax2 = len * Math.cos(a2);
    var ay2 = len * Math.sin(a2);

    cc.beginPath();
    cc.moveTo(x1, y1);
    cc.lineTo(x1 + ax1, y1 + ay1);
    cc.closePath();
    cc.stroke();

    cc.beginPath();
    cc.moveTo(x1, y1);
    cc.lineTo(x1 + ax2, y1 + ay2);
    cc.closePath();
    cc.stroke();


}




module.exports = drawBlockK;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k5/drawBlockK.js
// module id = 108
// module chunks = 0
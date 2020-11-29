var coordinate = require("chart/common/coordinate");
var tools = require("chart/common/tools");
var drawGrid = require("./drawGrid");


/**
 * 绘制成交量区域
 */

function drawBlockTrading(kObj) {
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


drawBlockTrading.prototype.draw = function () {
    this.clear();

    // drawGrid.verticalLine(this.kObj, 2);
    drawGrid.gridTrading(this.ccGrid, this.kObj.options);

    this.drawTrading();
    this.drawTradingIndexLine();
    this.drawAxisY();
}


drawBlockTrading.prototype.clear = function () {
    // var cc = this.kObj.layer.layerGridC;
    var region = this.drawRegion.trading;
    this.cc.clearRect(0, region.top, this.ops.width, region.h);
    this.ccGrid.clearRect(0, region.top, this.ops.width, region.h);
}


// 绘制成交量
drawBlockTrading.prototype.drawTrading = function () {
    var cc = this.cc;
    var ops = this.ops;

    var obj = this.kObj;

    var scale = ops.scale;

    var tk = obj.tdata.tk;
    var tkdata = tk.tkdata;
    var len = tkdata.length > scale.min ? tkdata.length : scale.min;

    var tradingMax = tk.volumeMax * 1.1;      // 成交量轴最大值

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var k = ops.drawRegion.k;
    var t = ops.drawRegion.trading;             //
    var theight = t.h - t.pt - t.mb;                   // 成交量绘图高度

    var pillarWidht = drawSumWdith / len;            // 每根柱子的区域宽度

    var baseT = t.h + t.top - t.mb;      // 成交量的基线位置

    for (var i = 0; i < tkdata.length; i++) {
        var d = tkdata[i];

        var x = this.padding.left + (pillarWidht * i) + (pillarWidht / 2);

        // 绘制当前柱子的成交量
        var ht = d.volume / tradingMax * theight;
        this.drawPillar({
            base: baseT,
            ht: ht,
            x: x,
            width: pillarWidht,
            up: d.zde
        });
    }

}

// 绘制柱子
drawBlockTrading.prototype.drawPillar = function (obj) {

    var cc = this.cc;
    var color = this.ops.color;

    var base = obj.base;
    var ht = obj.ht;
    var x = obj.x;
    var up = obj.up;
    var width = obj.width;
    var w = width / 2;
    var pillarWidth = this.ops.pillarWidth;

    var x = coordinate.format(x);

    cc.beginPath();
    if (up >= 0) {
        cc.strokeStyle = color.rise;
        cc.fillStyle = "rgba(0,0,0,0)";
    } else {
        cc.strokeStyle = color.fall;
        cc.fillStyle = color.fall;
    }
    cc.closePath();
    // cc.EMFillRect(x - w, base, x + w, base - ht);
    cc.EMFillPillar(base, base - ht, x, w, pillarWidth)

}

// 成交量均线
drawBlockTrading.prototype.drawTradingIndexLine = function () {
    var ops = this.ops;
    var scale = ops.scale;
    var cc = this.cc;

    var obj = this.kObj;
    var tk = obj.tdata.tk;
    var tkdata = tk.tkdata;
    var len = tkdata.length > scale.min ? tkdata.length : scale.min;

    var VAVERAGE = obj.tdata.quota.VAVERAGE;
    var VAVERAGEMax = obj.tdata.quota.VAVERAGEMax;

    var padding = this.padding;
    var color = this.color.colorsTrading;       // 成交量均线的颜色
    var trading = this.ops.drawRegion.trading;
    var h = trading.h;          // 成交量的总高度
    var pt = trading.pt;        // 
    var top = trading.top;
    var theight = trading.h - trading.pt - trading.mt - trading.mb;         // 成交量绘图高度

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var tradingMax = tk.volumeMax;      // 成交量轴最大值
    var tvMax = tradingMax > VAVERAGEMax ? tradingMax : VAVERAGEMax;

    
    var pillar = scale.pillar;                     // 柱子数量

    var pillarWidht = drawSumWdith / len;            // 每根柱子的区域宽度

    // var base = top + h - trading.mb;
    var base = trading.h + trading.top - trading.mb;      // 成交量的基线位置

    for (var j = 0; j < color.length; j++) {
        cc.save();
        cc.beginPath();
        cc.strokeStyle = color[j];
        for (var i = 0; i < VAVERAGE.length; i++) {
            var ar = VAVERAGE[i];
            var x = padding.left + (pillarWidht * i) + (pillarWidht / 2);
            var y = ar[j + 1] / tvMax * theight;
            y = base - y;
            if (i == 0) {
                cc.moveTo(coordinate.format(x), coordinate.format(y));
            } else {
                cc.lineTo(coordinate.format(x), coordinate.format(y));
            }
        }
        cc.stroke();
        cc.restore();
    }
}

// 绘制刻度
drawBlockTrading.prototype.drawAxisY = function () {
    var cc = this.cc;

    var obj = this.kObj;
    var tk = obj.tdata.tk;

    var ops = this.ops;
    var scale = ops.scale;
    var data = scale.data;
    var tradingMax = tk.volumeMax;     // 成交量最大值
    var region = ops.drawRegion.trading;
    var padding = this.padding;

    var base = region.top + region.h - region.mb;
    var unit = (region.h - region.pt - region.mb) / 3;

    cc.clearRect(0, region.top, padding.left, region.h + this.font.size)
    cc.fillStyle = this.color.text;
    for (var i = 0; i <= 3; i++) {
        var num = tradingMax * i / 3;
        var str = tools.formatNumUnit(num, 2, 4);
        var x = padding.left - cc.measureText(str).width - 8;
        var y = base - unit * i;
        cc.fillText(str, x, y);
    }
}



module.exports = drawBlockTrading;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/drawBlockTrading.js
// module id = 85
// module chunks = 0
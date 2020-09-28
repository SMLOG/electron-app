/**
 * 绘制线框
 */

var drawlien = require("chart/common/drawLine");
var coordinate = require("chart/common/coordinate");
var filterTimeLine = require("./filterTimeLine");

module.exports = {

    // K线线框
    gridK: function (cc, options) {

        var drawRegion = options.drawRegion;       // 绘图区域参数
        var padding = options.padding;
        var color = options.color;             // 绘图颜色
        var dashedLine = options.dashedLine;
        var scale = options.scale;
        var info = scale.info;

        var drawSumWdith = drawRegion.drawSumWdith;     // 总宽度
        var k = drawRegion.k;

        var top = k.top + k.mt;
        var h = k.h - k.mt - k.mb;
        var unitHeight = h / (k.y - 1);               // 单位高度  
        var unitWidth = drawSumWdith / k.x;       // 单位宽度

        // 有数据的时候
        if (info) {
            // console.log(info);
            var newKAxisMax = info.newKAxisMax;
            var newKAxisMin = info.newKAxisMin;
            var splity = info.splity;
            var diff = newKAxisMax - newKAxisMin;

            for (var i = 0, len = splity.length; i < len; i++) {
                var val = splity[i];
                if (val <= newKAxisMax && val >= newKAxisMin) {
                    var hei = (newKAxisMax - val) / diff * h;
                    var y = top + hei;
                    drawlien.dashed(cc, padding.left, y, padding.left + drawSumWdith, y, dashedLine.solid, dashedLine.dashed);
                }
            }
        } else { // 数据为空 绘制默认网格
            cc.strokeStyle = color.dashed;
            for (var i = 1; i < k.y - 1; i++) {
                var y = top + unitHeight * i;
                drawlien.dashed(cc, padding.left, y, padding.left + drawSumWdith, y, dashedLine.solid, dashedLine.dashed);
            }

            for (var i = 1; i < k.x; i++) {
                var x = padding.left + unitWidth * i;
                drawlien.dashed(cc, x, top, x, top + h, dashedLine.solid, dashedLine.dashed);
            }
        }

        cc.strokeStyle = color.border;
        var x = coordinate.format(padding.left);
        var y = coordinate.format(top);
        cc.strokeRect(x, y, drawSumWdith, Math.round(h));

    },

    // 绘制成交量区域 (同上)
    gridTrading: function (cc, options) {

        var drawRegion = options.drawRegion;       // 绘图区域参数
        var split = options.split;             // 分割参数
        var padding = options.padding;
        var color = options.color;             // 绘图颜色
        var dashedLine = options.dashedLine;

        var drawSumWdith = drawRegion.drawSumWdith;     // 总宽度

        var trading = drawRegion.trading;

        var top = trading.top;
        var btop = trading.top + trading.pt;
        var h = trading.h;
        var bh = h - trading.pt - trading.mb;
        var unitHeight = bh / trading.y;               // 单位高度  
        var unitWidth = drawSumWdith / trading.x;       // 单位宽度

        // 竖线
        cc.strokeStyle = color.dashed;
        for (var i = 1; i < trading.x; i++) {
            var x = padding.left + unitWidth * i;
            drawlien.dashed(cc, x, btop, x, btop + bh, dashedLine.solid, dashedLine.dashed);
        }

        // 横线
        for (var i = 0; i < trading.y; i++) {
            var y = top + trading.pt + unitHeight * i;
            if (i == 0 && trading.pt > 0) {
                cc.strokeStyle = color.border;
                drawlien.dashed(cc, padding.left, y, padding.left + drawSumWdith, y, 10, 0, dashedLine.solid, dashedLine.dashed);
            } else {
                cc.strokeStyle = color.dashed;
                drawlien.dashed(cc, padding.left, y, padding.left + drawSumWdith, y, dashedLine.solid, dashedLine.dashed);
            }
        }

        cc.strokeStyle = color.border;
        cc.strokeRect(coordinate.format(padding.left), coordinate.format(trading.top), drawSumWdith, bh + trading.pt);

    },

    // 指标
    gridIndex: function (cc, options) {
        var drawRegion = options.drawRegion;       // 绘图区域参数
        var padding = options.padding;
        var color = options.color;             // 绘图颜色
        var dashedLine = options.dashedLine;

        var drawSumWdith = drawRegion.drawSumWdith;     // 总宽度

        var index = drawRegion.index;

        var top = index.top;
        var btop = index.top + index.pt;
        var h = index.h;
        var bh = h - index.pt - index.pb;
        var unitHeight = bh / index.y;               // 单位高度  
        var unitWidth = drawSumWdith / index.x;       // 单位宽度

        cc.clearRect(coordinate.format(padding.left), coordinate.format(top), drawSumWdith, h - index.pb);

        // 竖线
        cc.strokeStyle = color.dashed;
        for (var i = 1; i < index.x; i++) {
            var x = padding.left + unitWidth * i;
            drawlien.dashed(cc, x, btop, x, btop + bh);
        }

        // 横线
        for (var i = 0; i < index.y; i++) {
            var y = top + index.pt + unitHeight * i;
            if (i == 0 && index.pt > 0) {
                cc.strokeStyle = color.border;
                drawlien.dashed(cc, padding.left, y, padding.left + drawSumWdith, y, 10, 0);
            } else {
                cc.strokeStyle = color.dashed;
                drawlien.dashed(cc, padding.left, y, padding.left + drawSumWdith, y, dashedLine.solid, dashedLine.dashed);
            }
        }

        cc.strokeStyle = color.border;
        cc.strokeRect(coordinate.format(padding.left), coordinate.format(top), drawSumWdith, h - index.pb, dashedLine.solid, dashedLine.dashed);

    },

    // 所有的垂直线
    verticalLine: function (kObj, type) {
        var cc = kObj.layer.layerDataC;
        var cc2 = kObj.layer.layerGridC;

        var ops = kObj.options;
        var padding = ops.padding;
        var font = ops.font;
        var color = ops.color;
        var gridwh = ops.gridwh;
        var formatTimeLine = ops.formatTimeLine;
        var yAxisType = ops.yAxisType;
        var dashedLine = ops.dashedLine;
        var cyq = ops.cyq || {};

        var drawRegion = ops.drawRegion;       // 绘图区域参数
        var drawSumWdith = drawRegion.drawSumWdith;     // 总宽度

        var k = drawRegion.k;
        var trading = drawRegion.trading;
        var index = drawRegion.index;

        var y11 = k.top + k.mt;
        var y12 = y11 + (k.h - k.mt - k.mb);

        var y21 = trading.top + trading.pt;
        var y22 = y21 + (trading.h - trading.pt - trading.mb);

        var y31 = index.top + index.pt;
        var y32 = y31 + (index.h - index.pt - index.pb);


        // 筛选绘制时间的个数
        var time = kObj.tdata.tk.tkdata;
        var unit = drawSumWdith / time.length;
        var count = Math.floor(drawSumWdith / gridwh.width) - 1;
        var skew = Math.round(time.length / count / 2);     // 偏移

        var xaxis = filterTimeLine(time, formatTimeLine, yAxisType);
        // console.log(xaxis);

        // 如果是新股， 数据不足最小数据时，则只绘制开头的日期
        if (time.length < ops.scale.min) {
            xaxis = [xaxis[0]];
        }

        cc.beginPath();
        cc.clearRect(padding.left, k.h - k.mb + padding.top, ops.width, k.mb - 1);
        cc.fillStyle = color.text;
        cc.font = font.size + "px " + font.family;

        // TODO 画时间的逻辑需要改了， 在每一绘制的计算。如果不重叠就绘制，如果重叠就跳过

        var textY = k.h - (k.mb / 2) - 1 + padding.top;
        var textRight = padding.left;
        var textEnd = ops.width - padding.right - (cyq.width || 0) - (cyq.gap || 0);
        var x;
        for (var i = 1, len = xaxis.length; i < len; i++) {
            var item = xaxis[i];
            var txt = item.time;
            var txtw = cc.measureText(txt).width;

            x = padding.left + unit * item.index + (unit / 2);

            if (x > textRight && x < textEnd - (txtw / 2)) {
                if (x > padding.left + txtw / 2 && x < ops.width - padding.right - txtw / 2) {
                    if (x > textRight) {
                        cc.fillText(txt, x - (txtw / 2), textY);
                        textRight = x + txtw + formatTimeLine.interval;
                        drawdashedline();
                    }
                } else if (x <= padding.left + txtw / 2) {
                    cc.fillText(txt, x, textY);
                    textRight = x + txtw * 1.5 + formatTimeLine.interval;
                    drawdashedline();
                } else if (x >= ops.width - padding.right - txtw / 2) {
                    if (x > textRight + txtw / 2) {
                        cc.fillText(txt, x - txtw, textY);
                        textRight = x + txtw + formatTimeLine.interval;
                        drawdashedline();
                    }
                }
            }
        }


        function drawdashedline() {
            cc2.strokeStyle = color.dashed;
            if (type == 1) {
                drawlien.dashed(cc2, x, y11, x, y12 ,dashedLine.solid, dashedLine.dashed);
            }
            if (type == 2) {
                drawlien.dashed(cc2, x, y21, x, y22 ,dashedLine.solid, dashedLine.dashed);
            }
            if (type == 3) {
                drawlien.dashed(cc2, x, y31, x, y32-1 ,dashedLine.solid, dashedLine.dashed);
            }
        }

    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/drawGrid.js
// module id = 36
// module chunks = 0
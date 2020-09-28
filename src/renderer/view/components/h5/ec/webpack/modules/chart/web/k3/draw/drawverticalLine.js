var filterTimeLine = require("../filterTimeLine");
var drawlien = require("../../../common/drawLine");

module.exports = function () {
    var kObj = this;

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
        drawlien.dashed(cc2, x, y11, x, y12, dashedLine.solid, dashedLine.dashed);
        drawlien.dashed(cc2, x, y21, x, y22, dashedLine.solid, dashedLine.dashed);
        drawlien.dashed(cc2, x, y31, x, y32 - 1, dashedLine.solid, dashedLine.dashed);
        if (yAxisType == 1) {
        }
        if (yAxisType == 2) {
        }
        if (yAxisType == 3) {
        }
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/draw/drawverticalLine.js
// module id = 188
// module chunks = 0
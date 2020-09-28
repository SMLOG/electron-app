
var drawPoint = require("./drawPoint");

module.exports = function () {

    var chart = this;

    var ccb = chart.ctxs.layerBarC;
    var ccl = chart.ctxs.layerLineC;
    var ccp = chart.ctxs.layerLinePointC;

    var ops = chart.options;
    var info = chart.info;
    var data = chart.data;

    var padd = ops.padding;
    var color = ops.color;

    var sx = info.sx;
    var sy = info.sy;
    var ex = info.ex;
    var ey = info.ey;

    var w = ex - sx;
    var h = ey - sy;

    var splitNum = info.splitNum;
    var y1split = info.splitY1 || [];
    var y2split = info.splitY2 || [];
    var axisDiffY1 = info.axisDiffY1;
    var axisDiffY2 = info.axisDiffY2;
    var basey1 = padd.top + (y1split[0] / axisDiffY1) * h;
    var basey2 = padd.top + (y2split[0] / axisDiffY2) * h;

    var xaxis = data.xaxis;
    var yaxis1 = data.yaxis1 || [];
    var yaxis2 = data.yaxis2 || [];

    var unitw = w / xaxis.length;
    var unitBarWidth = unitw * ops.barWidth;


    // 左轴
    var axisDiff = axisDiffY1;
    var base = basey1;
    for (var i = 0, len = yaxis1.length; i < len; i++) {
        var item = yaxis1[i];
        if (item.type == "line") {
            drawItemLine(item);
        }
    }

    // 右轴
    var axisDiff = axisDiffY2;
    var base = basey2;
    for (var i = 0, len = yaxis2.length; i < len; i++) {
        var item = yaxis2[i];
        if (item.type == "line") {
            drawItemLine(item);
        }
    }


    function drawItemLine(item) {
        var lineData = item.data;
        ccl.fillStyle = item.color;
        ccl.strokeStyle = item.color;
        ccl.beginPath();
        for (var j = 0, len = xaxis.length; j < len; j++) {
            var num = lineData[j];
            if (num !== "-" && !isNaN(num) && num === 0 || num) {
                var bh = (num / axisDiff) * h;
                var midx = sx + unitw * j + unitw / 2;
                var y = base - bh;
                // ccl.lineTo(midx, y);
                drawPoint(ccp, midx, y);
            }
        }
        ccl.stroke();
    }




};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/drawLinePoint.js
// module id = 461
// module chunks = 0
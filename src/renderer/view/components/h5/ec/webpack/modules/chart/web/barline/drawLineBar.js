var drawPoint = require("./drawPoint");

var toolsColor = require("../../common/color")

module.exports = function (chart, index) {
    index = index === undefined ? -1 : index;
    console.log("index: " + index)

    // var chart = this;

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


    ccb.clearRect(0, 0, ops.width, ops.height);
    ccl.clearRect(0, 0, ops.width, ops.height);
    ccp.clearRect(0, 0, ops.width, ops.height);


    // 左轴
    var axisDiff = axisDiffY1;
    var base = basey1;
    for (var i = 0, len = yaxis1.length; i < len; i++) {
        var item = yaxis1[i];
        if (item.type == "bar") {
            drawItemBar(item)
        }
        if (item.type == "line") {
            drawItemLine(item)
        }
    }

    // 右轴
    var axisDiff = axisDiffY2;
    var base = basey2;
    for (var i = 0, len = yaxis2.length; i < len; i++) {
        var item = yaxis2[i];
        if (item.type == "bar") {
            if (index == 6) {
                console.log("66666")
            }
            drawItemBar(item)
        }
        if (item.type == "line") {
            drawItemLine(item)
        }
    }


    function drawItemBar(item) {
        var barData = item.data;

        for (var i = 0, len = xaxis.length; i < len; i++) {
            var num = barData[i];

            if (i == index) {
                ccb.fillStyle = item.hoverColor || toolsColor.rank(item.color, 2);
                ccb.strokeStyle = item.hoverColor || toolsColor.rank(item.color, 2);
            } else {
                ccb.fillStyle = item.color;
                ccb.strokeStyle = item.color;
            }

            if (num !== "-" && num && !isNaN(num)) {
                var bh = (num / axisDiff) * h;
                var midx = sx + unitw * i + unitw / 2;
                var y = bh > 0 ? (base - 1) : (base + 1);
                var y2 = y < base ? y + 1 : y - 1;
                ccb.EMFill2(midx - unitBarWidth / 2, y, midx + unitBarWidth / 2, y2 - bh);
            }
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
                ccl.lineTo(midx, y);

                var point = item.point;
                if (index == j) {
                    console.log("hoverPoint:  " + index)
                    point = item.hoverPoint;
                }
                if (point) {
                    point.color = point.color ? point.color : item.color;
                    drawPoint(ccp, midx, y, point);
                }
            }
        }
        ccl.stroke();
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/drawLineBar.js
// module id = 131
// module chunks = 0
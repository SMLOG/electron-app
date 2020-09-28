var tools = require("../../common/tools");
var splitYaxis = require("./splitYaxis");

module.exports = function () {

    var chart = this;

    var cc = chart.ctxs.layerGridC;

    var ops = chart.options;
    var info = chart.info;
    var data = chart.data;

    var padd = ops.padding;
    var color = ops.color;

    var sx = padd.left + info.left;
    var sy = padd.top;
    var ex = ops.width - padd.right - info.right;
    var ey = ops.height - padd.bottom;

    var splitNum = info.splitNum;

    var xaxis = data.xaxis;
    var y1split = info.splitY1 || []; 
    var y2split = info.splitY2 || [];

    var splitUnit = (ey - sy) / splitNum;

    // 虚线和轴数
    cc.strokeStyle = color.dashedColor;
    cc.fillStyle = color.text;
    for (var i = 0; i <= splitNum; i++) {
        var y = sy + splitUnit * i
        cc.dashed(sx, y, ex, y);

        if (y1split.length > 0) {
            var max = 0;
            var txtl = tools.formatNumUnit(y1split[i]);
            var txtlw = cc.measureText(txtl).width;
            cc.fillText(txtl, sx - txtlw - 4, y);
        }

        if (y2split.length > 0) {
            var txtr = tools.formatNumUnit(y2split[i]);
            cc.fillText(txtr, ex + 4, y);
        }
    }

    // 外框
    cc.strokeStyle = color.boxBorder;
    cc.EMLine(sx, sy, sx, ey);
    cc.EMLine(sx, ey, ex, ey);
    cc.EMLine(ex, ey, ex, sy);

    // x轴
    var unit = (ex - sx) / xaxis.length;
    for (var i = 0, len = xaxis.length; i < len; i++) {
        var txt = xaxis[i];
        var txtw = cc.measureText(txt).width;
        var x = sx + unit * i + unit / 2 - txtw / 2;
        cc.fillText(txt, x, ey + 16);

    }


    // this.split = {
    //     y1split: y1split,
    //     y2split: y2split,
    //     splitNum: splitNum
    // }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/drawGrid.js
// module id = 458
// module chunks = 0
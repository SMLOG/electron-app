var drawlien = require("../../../common/drawLine");


module.exports = function (params) {

    var regionk = params.regionk;
    var cc = params.cc;
    var ops = params.ops;
    var kgap = params.kgap;
    var color = params.color;
    var digits = params.digits;
    var splity = params.splity;
    var max = params.max;
    var min = params.min;
    var sx = params.sx;
    var sy = params.sy;
    var ex = params.ex;
    var ey = params.ey;

    var dashedLine = ops.dashedLine;
    var padding = ops.padding;

    var w = ex - sx;     // 总宽度
    var h = ey - sy;
    var boxy1 = sy - kgap.top;
    var boxy2 = ey + kgap.bottom;

    var spy = splity.y;

    cc.clearRect(0, 0, ops.width, regionk.h)


    for (var i = 0; i < spy.length; i++) {
        var n = spy[i];
        var y = sy + (max - n) / splity.diff * h;
        if (y > boxy1 && y < boxy2) {
            drawlien.dashed(cc, sx, y, ex, y, dashedLine.solid, dashedLine.dashed);
            var txt = n.toFixed(digits);
            var txtw = cc.measureText(txt).width;
            var stx = padding.left - txtw - 8;
            cc.fillText(txt, stx, y);
        }
    }




    
    cc.EMLine(sx, boxy1, ex, boxy2)

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/draw/drawgrid.js
// module id = 185
// module chunks = 0
var drawLine = require("../../common/drawLine");

module.exports = function(){

    var cc = this.layer.layerGridC;
    var ops = this.options;
    var padding = ops.padding;
    var font = ops.font;
    var color = ops.color;
    var dsl = ops.dashedLine;

    var grid = ops.grid;
    var x1 = grid.xStatr;
    var y1 = grid.yStart;
    var x2 = grid.xEnd;
    var y2 = grid.yEnd;

    var y = y2 + font.size;

    cc.fillStyle = color.text;
    cc.strokeStyle = color.vdashed;
    cc.lineWidth = dsl.vwidth;

    var width = x2 - x1;
    var xaxis = this.data.xaxis;
    var unitw = width / (xaxis.length - 1);

    for(var i = 0, len = xaxis.length ; i < len ; i++){
        var o = xaxis[i];
        var x = x1 + unitw * i;
        if (o.show) {
            var txt = o.name;
            var txtw = cc.measureText(txt).width;
            cc.fillText(txt, x - txtw / 2, y);
        }
        if (o.showline) {
            drawLine.dashed(cc, x, y1, x, y2, dsl.vsolid, dsl.vdashed)
        }
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/drawXAxis.js
// module id = 393
// module chunks = 0
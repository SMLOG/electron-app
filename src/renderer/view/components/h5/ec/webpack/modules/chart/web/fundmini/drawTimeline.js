var drawLine = require("../../common/drawLine");

module.exports = function () {

    var cc = this.layer.layerTextC;
    var ops = this.options;
    var pad = ops.padding;
    var axisMax = ops.axisMax;
    var grid = ops.grid;
    var font = ops.font;
    var color = ops.color;
    var dsl = ops.dashedLine;

    var data = this.data;

    var width = ops.width - pad.left - pad.right;

    cc.fillStyle = color.text;
    var textX = pad.left + 2;
    var textY = ops.height - pad.bottom - font.size * 0.75;

    var xaxis = data.xaxis;

    for (var i = 0, len = xaxis.length; i < len; i++) {
        var item = xaxis[i];
        if (i == 0) {
            if (item.show) {
                cc.fillText(item.time, textX, textY);
            }
        } else if (i == len - 1) {
            textX = ops.width - pad.right - cc.measureText(item.time).width;
            if (item.show) {
                cc.fillText(item.time, textX, textY);
            }
        } else {
            var txtw = cc.measureText(item.time).width / 2;
            textX = pad.left + (width / (len - 1) * i);
            if (item.show) {
                cc.fillText(item.time, textX - txtw, textY);
            }
            if (item.showline) {
                cc.strokeStyle = color.dashed;
                var y1 = grid.yStart;
                var y2 = grid.yEnd;
                drawLine.dashed(cc, textX, y1, textX, y2, dsl.solid, dsl.dashed);
            }
        }
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/drawTimeline.js
// module id = 382
// module chunks = 0
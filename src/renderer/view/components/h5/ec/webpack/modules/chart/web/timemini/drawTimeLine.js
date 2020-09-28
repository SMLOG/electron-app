var drawLine = require("../../common/drawLine");
var dgrid = require("../../common/drawGrid");

function drawTimeLine() {

    var ops = this.options;

    var padding = ops.padding;
    var color = ops.color;
    var th = ops.textHeight;
    var font = ops.font;

    var width = ops.width;
    var height = ops.height;
    var drawWidth = width - padding.left - padding.right;
    var drawHeight = height - padding.top - padding.bottom - th.head - th.foot;

    var cc = this.layer.layerGridC;
    cc.strokeStyle = color.dashed;

    var base = ops.height - padding.bottom - th.foot + font.size / 2 + 2;

    // var x1 = padding.left;
    // var y1 = padding.top + th.head;
    // var w = width - padding.left - padding.right;
    // var h = height - padding.top - th.head - padding.bottom - th.foot;

    // cc.strokeStyle = color.border;
    // cc.fillStyle = "rgba(0,0,0,0)";
    // cc.EMRect(padding.left, padding.top, width - padding.right, height - padding.bottom);


    var timeline = ops.timeline;

    for (var i = 0; i < timeline.length; i++) {
        var item = timeline[i];
        cc.strokeStyle = color.dashed;

        var x = padding.left + drawWidth * item.position;
        var y = padding.top + th.head;

        drawLine.dashed(cc, x, y, x, y+drawHeight);
        
        cc.fillStyle = color.text;
        var txtw = cc.measureText(item.time).width;
        cc.fillText(item.time, (x - txtw/ 2), base);
        
    }
}



module.exports = drawTimeLine;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/drawTimeLine.js
// module id = 351
// module chunks = 0
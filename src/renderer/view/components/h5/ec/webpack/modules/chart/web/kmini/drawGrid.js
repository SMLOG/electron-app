var drawLine = require("../../common/drawLine");
var dgrid = require("../../common/drawGrid");

function drawGrid(){
    var ops = this.options;

    var padding = ops.padding;
    var color = ops.color;
    var th = ops.textHeight;

    var width = ops.width;
    var height = ops.height;
    var dsl = ops.dashedLine;

    var cc = this.layer.layerGridC;
    cc.strokeStyle = color.dashed;
    cc.clearRect(0,0, ops.width, ops.height);

    var x1 = padding.left;
    var y1 = padding.top + th.head;
    var w = width - padding.left - padding.right;
    var h = height - padding.top - th.head - padding.bottom - th.foot;

    dgrid.kmini(cc, x1, y1, w, h, 4, 2, dsl.dashed, dsl.solid, color.dashed);

    cc.strokeStyle = color.border;
    cc.fillStyle = "rgba(0,0,0,0)";
    cc.EMLine(padding.left, padding.top, width - padding.right, height - padding.bottom);

}


module.exports = drawGrid;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/drawGrid.js
// module id = 114
// module chunks = 0
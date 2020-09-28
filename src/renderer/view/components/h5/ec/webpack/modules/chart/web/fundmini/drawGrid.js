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
    var height = grid.height;

    cc.strokeStyle = color.dashed;
    for (var i = 0, len = 4; i <= len; i++) {
        var y = y1 + height / len * i;
        drawLine.dashed(cc, x1, y, x2, y, dsl.solid, dsl.dashed);
    }

    cc.strokeStyle = color.border;
    cc.EMLine(padding.left, padding.top, ops.width - padding.right, ops.height - padding.bottom);

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/drawGrid.js
// module id = 378
// module chunks = 0
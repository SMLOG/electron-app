var drawLine = require("../../common/drawLine");

module.exports = function(){

    var cc = this.layer.layerGridC;
    var ops = this.options;
    
    var padding = ops.padding;
    var font = ops.font;
    var color = ops.color;
    var dsl = ops.dashedLine;
    var split = ops.split;
    var grid = ops.grid;
    
    var x1 = grid.xStatr;
    var y1 = grid.yStart;
    var x2 = grid.xEnd;
    var y2 = grid.yEnd;
    var height = grid.height;

    var unith = height / split.y;


    cc.clearRect(0, 0, ops.width, ops.height);
    cc.strokeStyle = color.hdashed;
    cc.lineWidth = dsl.hwidth;
    for (var i = 1, len = split.y - 1; i <= len; i++) {
        var y = y1 + unith * i;
        drawLine.dashed(cc, x1, y, x2, y, dsl.hsolid, dsl.hdashed);
    }

    cc.strokeStyle = color.border;

    cc.lineWidth = ops.borderWidth;
    cc.EMLine(x1, y1, x2, y2);

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/drawGrid.js
// module id = 390
// module chunks = 0
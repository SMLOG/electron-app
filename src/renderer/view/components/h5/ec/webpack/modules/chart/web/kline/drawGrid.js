var grids = require("../../common/grids");


module.exports = function(){

    var cc = this.layer.layerGridC;

    var format = this.format;

    var ops = this.options;
    
    var color = ops.color;
    var dashed = ops.dashedLine;
    
    grids.avgGrid(cc, format, color, dashed);
    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline/drawGrid.js
// module id = 477
// module chunks = 0
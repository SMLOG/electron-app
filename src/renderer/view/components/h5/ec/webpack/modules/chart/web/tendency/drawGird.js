var drawGrid = require("chart/common/drawGrid");


module.exports = function(){
    var ops = this.options;
    var cc = this.layer.layerGridC;
    var padding = ops.padding;
    var color = ops.color;
    var grid = ops.grid || {};

    var width = ops.width;
    var height = ops.height;

    var validWidth = width - padding.left - padding.right;
    var validHeight = height - padding.top - padding.bottom;

    // 如果传格子的划分规则，则默认计算
    if (grid.x === undefined || grid.x === undefined) {
        grid.x = Math.round(validWidth / 100);
        grid.y = Math.round(validHeight / 40);
        ops.grid = grid;
    }

    var startX = padding.left;
    var startY = padding.top;
    cc.save();
    cc.clearRect(0, 0, ops.width, ops.height);
    drawGrid.grid(cc, startX, startY, validWidth, validHeight, grid.x, grid.y, color.border, color.dashed);
    cc.restore();
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency/drawGird.js
// module id = 360
// module chunks = 0
// 计算网格的位置
module.exports = function () {
    var ops = this.options;
    var padding = ops.padding;
    var font = ops.font;
    var x1 = padding.left;
    var y1 = padding.top;
    var x2 = ops.width - padding.right;
    var y2 = ops.height - padding.bottom - font.size * 1;
    var height = y2 - y1;

    ops.grid = {
        xStatr: x1,
        yStart: y1,
        xEnd: x2,
        yEnd: y2,
        height: height
    }
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/init/initGrid.js
// module id = 387
// module chunks = 0
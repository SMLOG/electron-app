/**
 * 计算绘图区域
 */

module.exports = function () {

    var ops = this.options;
    var padding = ops.padding;

    var validWidth = ops.width - padding.left - padding.right;
    var validHeight = ops.height - padding.top - padding.bottom;

    ops.validWidth = validWidth;
    ops.validHeight = validHeight;

}





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/init/calcDrawRegion.js
// module id = 368
// module chunks = 0
/**
 * 
 * 初始化输入的参数
 * 
 */
var extend = require("chart/common/extend2");
var setting = require("../defaultSetting");

module.exports = function initParameter(){
    var option = this.option;

    var ops = {};

    var dpr = setting.dpr;
    // 宽和高
    ops.width = option.width;
    ops.height = option.height;

    ops = extend(setting, option);


    // 计算网格的位置
    var padding = ops.padding;
    var font = ops.font;
    var x1 = padding.left;
    var y1 = padding.top + font.size * 2;
    var x2 = ops.width - padding.right;
    var y2 = ops.height - padding.bottom - font.size * 1.5;
    var height = y2 - y1;
    var midy = y1 + (y2 - y1) / 2;

    ops.grid = {
        xStatr: x1,
        yStart: y1,
        xEnd: x2,
        yEnd: y2,
        height: height,
        midy: midy
    }


    this.options = ops;

}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/init/initParameter.js
// module id = 374
// module chunks = 0
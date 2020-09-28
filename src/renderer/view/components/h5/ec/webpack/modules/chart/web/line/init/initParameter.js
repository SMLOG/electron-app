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

    this.options = ops;

}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/init/initParameter.js
// module id = 385
// module chunks = 0
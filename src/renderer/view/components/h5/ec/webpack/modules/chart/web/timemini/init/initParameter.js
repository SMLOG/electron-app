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
    ops.width = option.width * dpr;
    ops.height = option.height * dpr;

    ops = extend(setting, option);

    if (ops.show.title == false) {
        ops.textHeight.head = 0;
    }

    this.options = ops;

}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/init/initParameter.js
// module id = 341
// module chunks = 0
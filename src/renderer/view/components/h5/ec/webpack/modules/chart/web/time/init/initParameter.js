/**
 * 
 * 初始化输入的参数
 * 
 */
// var extend = require("chart/common/extend2");
// var extend = require("chart/common/extend3");
var extend = require("lodash").merge;
var setting = require("../defaultSetting");

module.exports = function initParameter() {
    var option = this.option;

    option.type = (option.type + "").toLocaleLowerCase();

    var ops = {};

    var dpr = setting.dpr;
    // 宽和高
    ops.width = option.width * dpr;
    ops.height = option.height * dpr;

    // ops = extend(option, setting);
    ops = extend(setting, option);


    if (ops.show.indicatorArea == false) {
        ops.grid = {
            time: {
                top: 0,
                mt: 24,
                h: 0.72,
                mb: 24
            },
            trading: {
                top: 0.72,
                h: 0.28,
                mb: 0
            }
        }
    }


    this.options = ops;

}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/init/initParameter.js
// module id = 254
// module chunks = 0
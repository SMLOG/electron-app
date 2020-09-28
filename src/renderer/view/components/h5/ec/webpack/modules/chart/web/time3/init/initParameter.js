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
    var op = this.op;

    // option.type = (option.type + "").toLocaleLowerCase();

    var ops = extend(setting, option);

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

    this.ops = ops;

}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/init/initParameter.js
// module id = 304
// module chunks = 0
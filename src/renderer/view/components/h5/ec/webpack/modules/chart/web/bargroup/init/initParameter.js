/**
 * 
 * 初始化输入的参数
 * 
 */

var ext2 = require("../../../common/extend2");

var setting = require("../defaultSetting");
// var extend = require('lodash/extend')

module.exports = function (option){
    var temp = ext2(setting, option);
    // extend(setting, temp);
    this.options = temp;
}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/init/initParameter.js
// module id = 442
// module chunks = 0
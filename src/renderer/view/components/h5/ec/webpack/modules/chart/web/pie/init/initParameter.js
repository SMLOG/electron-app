/**
 * 
 * 初始化输入的参数
 * 
 */
var extend = require("../../../common/extend2");
var setting = require("../defaultSetting");
// var extend = require('lodash/extend')

module.exports = function initParameter(option){
    var options = extend(setting, option);

    var w = option.width;
    var h = option.height;
    var min = w > h ? h : w;

    options.centerx = options.centerx === undefined ? w / 2 : options.centerx;
    options.centery = options.centery === undefined ? h / 2 : options.centery;

    options.radiusIn = options.radiusIn === undefined ? 0 : options.radiusIn;
    options.radiusOut = options.radiusOut === undefined ? (min * 0.38) : options.radiusOut;
    options.radiusHover = options.radiusHover === undefined ? (min * 0.40) : options.radiusHover;

    this.options = options;

}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/pie/init/initParameter.js
// module id = 399
// module chunks = 0
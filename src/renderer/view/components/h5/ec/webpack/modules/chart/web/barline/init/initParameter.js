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
 
    ops = extend(setting, option);

    var viwe = document.querySelector(this.container);

    var w = viwe.clientWidth;
    var h =  viwe.clientHeight;

    w = w <= 0 ? 600 : w;
    h = h <= 0 ? 400 : h;
    
    ops.width = w;
    ops.height = h;

    this.options = ops;
}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/init/initParameter.js
// module id = 453
// module chunks = 0
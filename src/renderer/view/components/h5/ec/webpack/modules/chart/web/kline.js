/**
 * 资金流mini图
 * @param {*} option ： 参数
 */

var defaultSetting = require("./kline/defaultSetting");

var initLayer = require("./kline/init/initLayer");

var dataformat = require("./kline/dataformat");

var drawGrid = require("./kline/drawGrid");
var draw = require("./kline/draw");

var interactive = require("./kline/interactive");

var watermark = require("chart/common/watermark");       // 水印
var extend = require("chart/common/extend2");

function kline(container, option) {
    this.container = container;
    this.option = option;
    this.__init();
}


kline.prototype.__init = function () {
    this.options = extend(this.option, defaultSetting);

    initLayer.call(this);
    watermark.call(this, 1, 35);               // 水印
    new interactive(this);
}


kline.prototype.setOption = function (data) {
    this.data = extend(this.data, data);
    dataFormat.call(this);
}


kline.prototype.setData = function (data) {
    this.data = data;
    // console.log(data);
    dataformat.call(this);
}


kline.prototype.draw = function () {
    drawGrid.call(this);
    draw.call(this);
    // drawXAxis.call(this);
    // drawLine.call(this);
    // drawPoint.call(this);
}



module.exports = kline;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline.js
// module id = 473
// module chunks = 0
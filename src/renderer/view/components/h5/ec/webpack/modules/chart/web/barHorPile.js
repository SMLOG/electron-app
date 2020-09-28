
/** 
 * 
 * 水平堆叠
 * 
 * */

var initParameter = require("./barHorPile/init/initParameter");
var initLayer = require("./barHorPile/init/initLayer");
var initPopWin = require("./barHorPile/init/initPopWin");

var dataFormat = require("./barHorPile/dataFormat");

var watermark = require("chart/common/watermark");       // 水印

var drawGrid = require("./barHorPile/drawGrid");
var drawBar = require("./barHorPile/drawBar");

var interactive = require("./barHorPile/interactive");

var imgpng = require("images/water_mark.png");


function barHorPile(container, option) {
    this.container = container;
    this.option = option || {};
    this.__init(option);
}


barHorPile.prototype.__init = function (option) {
    initParameter.call(this, option);
    initLayer.call(this);
    initPopWin.call(this);

    watermark.call(this);
    new interactive(this);
}


barHorPile.prototype.setData = function (data) {
    this.datas = data;
    dataFormat.call(this);
}


barHorPile.prototype.draw = function () {
    
    drawGrid.call(this);
    drawBar.call(this);

}


module.exports = barHorPile;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barHorPile.js
// module id = 463
// module chunks = 0
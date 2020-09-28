/**
 * 资金流mini图
 * @param {*} option ： 参数
 */

var initParameter = require("./line/init/initParameter");
var initGrid = require("./line/init/initGrid");
var initLayer = require("./line/init/initLayer");
var initMiniPopWin = require("./line/init/initMiniPopWin");

var drawGrid = require("./line/drawGrid");
var dataFormat = require("./line/dataFormat");

var drawYAxis = require("./line/drawYAxis");
var drawXAxis = require("./line/drawXAxis");
var drawLine = require("./line/drawLine");
var drawPoint = require("./line/drawPoint");
var drawTitle = require("./line/drawTitle");
var drawTimeline = require("./line/drawTimeline");

var interactive = require("./line/interactive");
var goBigImg = require("./kmini/goBigImg");

var watermark = require("chart/common/watermark");       // 水印
var extend = require("chart/common/extend2");

function line(option){
    this.option = option;
    this.__init();
}


line.prototype.__init = function(){
    this.data = {
        title: "",
        subfix: "",
    };
    initParameter.call(this);
    initGrid.call(this);
    initLayer.call(this);
    initMiniPopWin.call(this);

    drawGrid.call(this);

    new interactive(this);

    watermark.call(this);               // 水印
}


line.prototype.setData = function(data){
    this.data = extend(this.data, data);
    dataFormat.call(this);
}


line.prototype.draw = function(){
    initGrid.call(this);
    drawGrid.call(this);
    drawYAxis.call(this);
    drawXAxis.call(this);
    drawLine.call(this);
    drawPoint.call(this);
}



module.exports = line;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line.js
// module id = 384
// module chunks = 0
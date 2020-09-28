var initParameter = require("./barline/init/initParameter");
var initLayer = require("./barline/init/initLayer");
var ininPopWin = require("./barline/init/ininPopWin");

var formatData = require("./barline/formatData");

var drawGrid = require("./barline/drawGrid");
var drawBar = require("./barline/drawBar");
var drawLine = require("./barline/drawLine");
var drawLinePoint = require("./barline/drawLinePoint");

var drawLineBar = require("./barline/drawLineBar");

var interactive = require("./barline/interactive");
var watermark = require("chart/common/watermark");       // 水印

function barline(container, option) {
    this.container = container;
    this.option = option || {};
    this.__init();
}   

// 初始化
barline.prototype.__init = function () {  
    initParameter.call(this);
    initLayer.call(this);
    ininPopWin.call(this);

    watermark.call(this, 0, 30);
    
    new interactive(this);
}

// 设置数据
barline.prototype.setData = function (data) {  
    this.data = data;

    formatData.call(this);
    // drawLinePoint.call(this);
} 

// 绘制
barline.prototype.draw = function () {  
    drawGrid.call(this);

    drawLineBar(this);

    // 状态
    // 1 表示绘图完成， 之后可以触发交互部分
    this.stauts = 1;
}

// 重新设置配置项，需要重新绘制
barline.prototype.setOption = function () {  

}


module.exports = barline;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline.js
// module id = 452
// module chunks = 0
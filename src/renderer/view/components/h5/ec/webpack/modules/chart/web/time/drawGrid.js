var drawg = require("../../common/drawGrid");
var drawLine = require("../../common/drawLine");

function drawGrid(chartObj) {
    this.o = chartObj;
    this.cc = this.o.layer.layerGridC;

    var show = this.o.options.show;

    // this.clear();
    this.drawGridTime();

    // 控制是否显示成交量
    if (show.tradingArea) {
        this.drawGridTrading();
    }

    if (show.indicatorArea) {
        this.drawGridIndicator();
    }

}

drawGrid.prototype.clear = function () {
    var ops = this.o.options;
    this.cc.clearRect(0, 0, ops.width, ops.height);
}

drawGrid.prototype.drawGridTime = function () {
    var ops = this.o.options;
    var area = ops.areaTime;
    var color = ops.color;
    var timebox = ops.timebox;
    var dashedLine = ops.dashedLine;

    var height = area.height;
    var startx = area.startx;
    var starty = area.starty;

    var cap = (1 - timebox.cap) / 2;

    drawg.timegrid(this.cc, startx, starty + height * cap,
        area.draww, height * timebox.cap, area.splitx, area.splity,
        color.boxBorder, color.dashedColor,
        dashedLine.solid, dashedLine.dashed, timebox.cap);

    this.cc.EMLine(startx, starty, startx + area.draww, starty + height);


    // 中间画成实线    
    var unith = area.height / area.splity;
    var y = area.starty + (area.splity / 2) * unith;
    this.cc.strokeStyle = color.midLine;
    drawLine.dashed(this.cc, area.startx + 1, y, area.startx + area.draww - 1, y, 100, 0);

}

drawGrid.prototype.drawGridTrading = function () {
    var ops = this.o.options;
    var area = ops.areaTrading;
    var color = ops.color;

    drawg.grid(this.cc, area.startx, area.starty,
        area.draww, area.height, area.splitx, area.splity,
        color.boxBorder, color.dashedColor);
}


drawGrid.prototype.drawGridIndicator = function (split) {
    var ops = this.o.options;
    var area = ops.areaIndicator;
    var color = ops.color;

    // this.cc.clearRect(area.startx, area.starty, area.draww, area.height);

    drawg.grid(this.cc, area.startx, area.starty,
        area.draww, area.height, area.splitx, split || area.splity,
        color.boxBorder, color.dashedColor);

    this.cc.strokeStyle = color.boxBorder;

    this.cc.EMLine(area.startx, area.starty, area.startx, area.starty - 24);
    this.cc.EMLine(area.startx + area.draww, area.starty, area.startx + area.draww, area.starty - 24);

}


module.exports = drawGrid;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/drawGrid.js
// module id = 262
// module chunks = 0
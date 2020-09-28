var tools = require("../../common/tools");

module.exports = function () {

    var ops = this.ops;

    var grid = ops.grid;
    var gridwh = ops.gridwh;
    var padding = ops.padding;
    var drawSumHeight = ops.height - padding.top - padding.bottom;

    var show = ops.show;

    if (show.tradingArea == false) {
        grid.time.h = 1;
    }

    // 分时折线区域网格
    var startx = padding.left;
    var starty = padding.top + grid.time.top + grid.time.mt;
    var draww = ops.width - padding.left - padding.right;
    var timeh = drawSumHeight * grid.time.h - grid.time.mt - grid.time.mb;
    var splitx = tools.floatToEven(draww / gridwh.width);
    var splity = tools.floatToEven(timeh / gridwh.height);

    ops.areaTime = {
        startx: startx,
        starty: starty,
        draww: draww,
        height: timeh,
        splitx: splitx,
        splity: splity
    };


    // 成交量区域网格
    var startx2 = padding.left;
    var starty2 = padding.top + drawSumHeight * grid.time.h;
    var tradingh = drawSumHeight * grid.trading.h - grid.trading.mb;
    var splity2 = Math.round(tradingh / gridwh.height);

    if (ops.show.tradingArea) {
        ops.areaTrading = {
            startx: startx2,
            starty: starty2,
            draww: draww,
            height: tradingh,
            splitx: splitx,
            splity: splity2
        };
    }

    // 指标区域
    if (ops.show.indicatorArea) {
        var h = drawSumHeight * grid.indicator.h - grid.indicator.mb - 24 - 18;

        ops.areaIndicator = {
            startx: startx2,
            starty: starty2 + tradingh + 24,
            draww: draww,
            height: h,
            splitx: splitx,
            splity: splity2
        };
    }

}




// even


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/formatOptions.js
// module id = 312
// module chunks = 0
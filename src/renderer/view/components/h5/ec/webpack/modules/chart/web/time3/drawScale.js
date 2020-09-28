var tools = require("../../common/tools");

/**
 * 绘制刻度
 */


function drawScale(chartObj) {
    this.o = chartObj;
    this.ops = chartObj.options;
    this.cc = this.o.layer.layerDataC;
    var show = this.o.options.show;

    this.clear();
    this.time();

    if (show.tradingArea) {
        this.trading();
    }

    if (show.indicatorArea) {
        this.indicator();
    }
}

drawScale.prototype.clear = function () {
    var ops = this.o.options;
    this.cc.clearRect(0, 0, ops.width, ops.height);
}

// 分时区的轴刻度
drawScale.prototype.time = function () {
    var info = this.o.data.info;
    var timebox = this.ops.timebox;
    var yc = info.yc;
    var areaTime = this.ops.areaTime;
    var padding = this.ops.padding;
    var color = this.ops.color;

    var decimal = info.decimal;

    var midy = areaTime.starty + areaTime.height / 2;   // 中间实线的位置
    var unith = areaTime.height / areaTime.splity;
    var draww = areaTime.draww;

    var len = areaTime.splity / 2;
    var unit = (info.yAxisMax - yc) / len;

    this.cc.fillStyle = color.text;
    var txt = yc.toFixed(decimal);
    var txtw = this.cc.measureText(txt).width;
    this.cc.fillText(txt, padding.left - txtw - 4, midy);
    this.cc.fillText((0).toFixed((decimal > 3 ? 3 : decimal)) + "%", padding.left + draww + 4, midy);

    // 上部分
    for (var i = 0; i < len; i++) {
        var temp_decimal = decimal == 0 ? 2 : decimal;
        var prise = (yc + unit * (i + 1)).toFixed(decimal);
        var change = ((prise - yc) / yc * 100).toFixed((temp_decimal > 3 ? 3 : temp_decimal)); // 涨跌幅
        if (change == "NaN") {
            change = (0).toFixed((temp_decimal > 3 ? 3 : temp_decimal));
        }
        if (yc == 0) {
            change = "0.00";
        }
        var y = midy - (unith * (i + 1) * timebox.cap);
        var txtw = this.cc.measureText(prise).width;
        this.cc.fillStyle = color.rise;
        this.cc.fillText(prise, padding.left - txtw - 4, y);
        this.cc.fillText("+" + change + "%", padding.left + draww + 4, y);
    }

    // 下部分
    for (var i = 0; i < len; i++) {
        var temp_decimal = decimal == 0 ? 2 : decimal;
        var prise = (yc - unit * (i + 1)).toFixed(decimal);
        var change = ((yc - prise) / yc * 100).toFixed((temp_decimal > 3 ? 3 : temp_decimal)); // 涨跌幅
        if (change == "NaN") {
            change = (0).toFixed((temp_decimal > 3 ? 3 : temp_decimal));
        }
        if (yc == 0) {
            change = "0.00";
        }
        var y = midy + (unith * (i + 1) * timebox.cap);
        var txtw = this.cc.measureText(prise).width;
        this.cc.fillStyle = color.fall;
        this.cc.fillText(prise, padding.left - txtw - 4, y);
        this.cc.fillText("-" + change + "%", padding.left + draww + 4, y);
    }

}

// 成交量刻度
drawScale.prototype.trading = function () {
    var info = this.o.data.info;
    var yc = info.yc;
    var area = this.ops.areaTrading;
    var padding = this.ops.padding;
    var color = this.ops.color;

    var unith = area.height / area.splity;

    this.cc.fillStyle = color.text;

    for (var i = 0; i <= area.splity; i++) {
        var txt = tools.formatNumUnit(info.maxYAxisTrading / area.splity * (area.splity - i));
        txt = txt.toString() == "NaN" ? "0" : txt;

        var txtw = this.cc.measureText(txt).width;
        var y = area.starty + i * unith;
        this.cc.fillText(txt, padding.left - txtw - 4, y);
    }

}

// 技术指标刻度
drawScale.prototype.indicator = function () {
    var info = this.o.data.info;
    var imm = this.o.data.imm || {};
    var area = this.ops.areaIndicator;
    var padding = this.ops.padding;
    var color = this.ops.color;

    var unith = area.height / area.splity;

    this.cc.fillStyle = color.text;

    var max = imm.RSIMax || 0;
    var min = imm.RSIMin || 0;

    for (var i = 0; i <= area.splity; i++) {
        var txt = tools.formatNumUnit(min + ((max - min) / area.splity) * (area.splity - i));
        // txt = isNaN(txt) ? "0" : txt;
        txt = txt.toString() == "NaN" ? "0" : txt;
        var txtw = this.cc.measureText(txt).width;
        var y = area.starty + i * unith;
        this.cc.fillText(txt, padding.left - txtw - 4, y);
    }

}

module.exports = drawScale;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/drawScale.js
// module id = 314
// module chunks = 0
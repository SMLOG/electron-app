// var defaultData = require("../defaultData");
// var setting = require("../defaultSetting");

var tools = require("../../../common/tools");
var grid = require("../../../common/grid");

var calc = require("./calc");

var drawGrid = require("./drawGrid");
var drawText = require("./drawText");
var drawBar = require("./drawBar");

var extend = require("lodash/extend");

module.exports = function (chart) {
    setting = chart.options;
    

    // 计算数据
    calc(chart);

    var layer = chart.layer;
    var ccg = layer.layerGridC;
    var cct = layer.layerTextC;
    var ccd = layer.layerDrawC;
    var padding = setting.padding;
    var font = setting.font;
    var color = setting.color;
    var dashed = setting.dashed;
    var fixed = setting.fixed;

    var width = setting.width;
    var height = setting.height;

    var datas = chart.datas;
    var split = datas.split;

    // 左边的偏移
    var maxleft = 0;
    for(var i = 0, len = split.length ; i < len ; i++){
        var fn = tools.formatNumUnit(split[i], fixed, 7);
        var txtw = ccg.measureText(fn).width;
        maxleft = maxleft < txtw ? txtw : maxleft;
    }

    var splitxLen = split.length - 1;

    var box = {
        sx: maxleft + font.size,
        sy: padding.top,
        ex: (width - padding.right),
        ey: (height - padding.bottom),
        spx: 0,
        spy: splitxLen
    };


    padding.left = maxleft + font.size;
    chart.datas.box = box;

    // 绘制文字
    drawText(cct, box, datas, split, color, dashed, font, fixed);

    // 绘制网格
    grid.criterion(ccg, box, color, dashed);
    

    drawBar.call(chart, ccd, box, datas, split);


    chart.status = true;

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/draw/index.js
// module id = 445
// module chunks = 0
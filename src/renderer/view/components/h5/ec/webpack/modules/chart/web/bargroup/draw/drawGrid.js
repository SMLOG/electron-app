var defaultData = require("../defaultData");
var setting = require("../defaultSetting");

var tools = require("../../../common/tools");
var grid = require("../../../common/grid");

module.exports = function(){
    
    console.log(setting);
    console.log(defaultData);

    var layer = setting.layer;
    var ccg = layer.layerGridC;
    var padding = setting.padding;
    var font = setting.font;
    var color = setting.color;
    var dashed = setting.dashed;


    var width = setting.width;
    var height = setting.height;


    var split = defaultData.split;
    var datas = defaultData.datas;


    // 左边的偏移
    var maxleft = 0;
    for(var i = 0, len = split.length ; i < len ; i++){
        var fn = tools.formatNumUnit(split[i], 0, 5);
        var txtw = ccg.measureText(fn).width;
        maxleft = maxleft < txtw ? txtw : maxleft;
    }

    var box = {
        sx: maxleft + font.size,
        sy: padding.top,
        ex: (width - padding.right),
        ey: (height - padding.bottom),
        spx: 0,
        spy: setting.splitx
    };

    // 绘制网格
    grid.criterion(ccg, box, color, dashed);






};




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/draw/drawGrid.js
// module id = 448
// module chunks = 0
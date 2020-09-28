var tools = require("../../../common/tools");
var grid = require("../../../common/grid");

var drawLine = require("../../../common/drawLine");


module.exports = function (cc, box, datas, split, color, dashed, font, fixed) {

    var sx = box.sx,        // 起点
        sy = box.sy,
        ex = box.ex,        // 终点
        ey = box.ey,
        spx = box.spx,      // 分割数量
        spy = box.spy;

    var uh = (ey - sy) / spy;
    var dw = (ex - sx);

    cc.fillStyle = color.text;
    for (var i = 0, len = spy; i <= len; i++) {
        var y = sy + (uh * i);
        var txt = split[i] + "";
        var fn = tools.formatNumUnit(txt, fixed, 7);
        var txtw = cc.measureText(fn).width;
        cc.fillText(fn, sx - txtw - 4, y);
    }

    var dataCount = 0;
    var ddata = datas.datas;
    for(var i = 0, len = ddata.length ; i < len ; i++){
        dataCount += ddata[i].data.length;
        dataCount += 1;
    }

    cc.strokeStyle = color.dashedColor;
    var leftCount = 0;
    var lastLeft = sx;

    
    for(var i = 0, len = ddata.length ; i < len ; i++){
        leftCount += ddata[i].data.length;
        leftCount += 1;
        
        var width = (leftCount / dataCount) * dw;
        var x = sx + width;

        if (i < len - 1) {
            drawLine.dashed(cc, x, sy, x, ey, dashed.solid, dashed.dashed)
        }
        
        var title = ddata[i].title;
        var titlew = cc.measureText(title).width;
        
        var dtw = x - lastLeft;

        var tsx = lastLeft + (dtw - titlew) / 2;

        cc.fillText(title, tsx, ey + font.size);
        
        lastLeft = x;
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/draw/drawText.js
// module id = 449
// module chunks = 0
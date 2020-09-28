var drawLine = require("../drawLine");


/**
 * 绘制一个均分的网格
 * @param {*} cc ： 绘图上下文年
 * @param {*} format ： 网格所需要的数据
 * @param {*} color ： 绘图中使用的颜色
 * @param {*} dashed ： 虚线擦数
 */
module.exports = function (cc, format, color, dashed) {

    var sx = format.sx;
    var sy = format.sy;
    var ex = format.ex;
    var ey = format.ey;
    var spx = format.spx || 0;   // x轴分段数量
    var spy = format.spy || 0;   // y轴分段数量

    var y1split = format.y1split;
    var y2split = format.y2split;

    var w = ex - sx;
    var h = ey - sy;

    var slen = dashed.solid;
    var dlen = dashed.dashed;

    var ymax1 = format.ykmax || 0;
    var ymin1 = format.ykmin || 0;
    var ymax2 = format.ylmax || 0;
    var ymin2 = format.ylmin || 0;

    var diffy1 = ymax1 - ymin1;
    var diffy2 = ymax2 - ymin2;


    var unith = h / spy;
    var unitw = w / spx;

    cc.strokeStyle = color.hdashed;
    cc.fillStyle = color.text;

    for (var i = 0, len = spy; i <= len; i++) {
        var y = sy + unith * i;
        drawLine.dashed(cc, sx, y, ex, y, slen, dlen);

        cc.textAlign = "end";
        cc.fillText(y1split[i], sx - 4, y);
        cc.textAlign = "start";
        cc.fillText(y2split[i], ex + 4, y);
    }

    cc.strokeStyle = color.vdashed;
    for (var i = 1, len = spx; i < len; i++) {
        var x = sx + unitw * i;
        drawLine.dashed(cc, x, sy, x, ey, slen, dlen);
    }

    cc.strokeStyle = color.border;
    cc.EMStroke(sx, sy, ex, ey);

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/grids/avgGrid.js
// module id = 479
// module chunks = 0
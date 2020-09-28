module.exports = function () {

    var chart = this;
    var cc = chart.ctxs.layerBarC;
    var ccgrid = chart.ctxs.layerGridC;

    var ops = chart.options;
    var info = chart.info;
    var datas = chart.datas || {};

    var color = ops.color;

    var barWidth = ops.barWidth;
    var axisMax = info.axisMax;

    var sx = info.sx;
    var sy = info.sy;
    var ex = info.ex;
    var ey = info.ey;

    var w = ex - sx;
    var h = ey - sy;

    var unith = h / datas.data.length;

    cc.clearRect(0,0,ops.width, ops.height);
    
    ccgrid.fillStyle = color.text;
    for (var i = 0, len = datas.data.length; i < len; i++) {
        var item = datas.data[i];
        var names = item.names || datas.pnames;
        var colors = item.colors || datas.pcolors;
        var idata = item.datas;
        var clen = colors.length;

        var txt = item.title;
        var txtw = ccgrid.measureText(txt).width;
        ccgrid.fillText(txt, sx - txtw - 8, sy + unith * i + unith / 2);
        
        var isx = sx + 1;
        var y1 = sy + unith * i + unith * (1 - barWidth) / 2;
        var y2 = y1 + unith * barWidth;

        for (var j = 0, len2 = idata.length; j < len2; j++) {
            var width = idata[j] / axisMax * w;
            cc.fillStyle = colors[j % clen];
            cc.strokeStyle = colors[j % clen];
            cc.EMFill2(isx, y1, isx + width, y2);
            isx += width;
        }
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barHorPile/drawBar.js
// module id = 471
// module chunks = 0
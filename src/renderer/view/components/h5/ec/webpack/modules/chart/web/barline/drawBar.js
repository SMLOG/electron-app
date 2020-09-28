module.exports = function (barData, split) {

    var chart = this;

    var cc = chart.ctxs.layerBarC;

    var ops = chart.options;
    var padd = ops.padding;
    var color = ops.color;

    var data = chart.data;
    var xaxis = data.data.xaxis;
    var yaxis1 = barData;

    var sx = padd.left + data.maxleft;
    var sy = padd.top;
    var ex = ops.width - padd.right - data.maxright;
    var ey = ops.height - padd.bottom;


    var w = ex - sx;
    var h = ey - sy;

    var unit = w / xaxis.length;
    var unitBarWidth = unit * ops.barWidth;

    var axisDiff = (split[0] - split[split.length - 1]);

    var base = padd.top + (split[0] / axisDiff) * h;

    cc.fillStyle = yaxis1.color;
    cc.strokeStyle = yaxis1.color;
    for (var i = 0, len = xaxis.length; i < len; i++) {
        var num = yaxis1.data[i];
        if (num !== "-" && num !== "" && num != 0 && num !== undefined) {
            var bh = (num / axisDiff) * h;
            var midx = sx + unit * i + unit / 2;
            var y = bh > 0 ? (base - 1) : (base + 1);
            var y2 = y < base ? y + 2 : y - 2;
            cc.EMFill2(midx - unitBarWidth / 2, y, midx + unitBarWidth / 2, y2 - bh);
        }
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/drawBar.js
// module id = 459
// module chunks = 0
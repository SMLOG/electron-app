module.exports = function (lineData, split) {

    var chart = this;

    var cc = chart.ctxs.layerLineC;

    var ops = chart.options;
    var padd = ops.padding;
    var color = ops.color;

    var data = chart.data;
    var xaxis = data.data.xaxis;
    var yaxis2 = lineData;

    var sx = padd.left + data.maxleft;
    var sy = padd.top;
    var ex = ops.width - padd.right - data.maxright;
    var ey = ops.height - padd.bottom;

    var w = ex - sx;
    var h = ey - sy;

    var unit = w / xaxis.length;

    var axisDiff = (split[0] - split[split.length - 1]);
    var base = padd.top + (split[0] / axisDiff) * h;


    var lines = yaxis2.data;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        cc.fillStyle = line.color;
        cc.strokeStyle = line.color;
        cc.beginPath();
        for (var j = 0, len = xaxis.length; j < len; j++) {
            var num = line.data[j];
            if (num !== "-" && num !== "" && num !== undefined) {
                var bh = (num / axisDiff) * h;
                var midx = sx + unit * j + unit / 2;
                var y = base - bh;
                cc.lineTo(midx, y);
            }
        }
        cc.stroke();
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/drawLine.js
// module id = 460
// module chunks = 0
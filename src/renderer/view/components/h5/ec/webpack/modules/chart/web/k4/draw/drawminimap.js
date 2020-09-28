var coordinate = require("../../../common/coordinate");

module.exports = function () {

    var maps = this.minimap.maps;
    var years = this.minimap.years;
    var max = this.minimap.max;
    var min = this.minimap.min;
    var min2 = min * 0.9;

    var ops = this.options;
    var cc = this.layer.layerIndexC;

    var padding = ops.padding;
    var region = ops.drawRegion.minimap;
    var color = ops.color.minimap;
    var fcolor = ops.color;
    var font = ops.font;
    var cyq = ops.cyq;
    if (!cyq) {
        cyq = {
            width: 0,
            gap: 0
        }
    }


    var sx = padding.left;
    var sy = region.top + region.mt / 1 + region.pt / 1;
    var ex = ops.width - padding.right - cyq.width - cyq.gap;
    var ey = ops.height;


    var w = ex - sx;
    var h = ey - sy;
    var unitw = w / maps.length;

    cc.clearRect(sx, sy, ex, ey);
    

    cc.strokeStyle = color.line;
    cc.fillStyle = color.fill;
    cc.moveTo(sx, ey);
    for (var i = 0; i < maps.length; i++) {
        var line = maps[i].split(",");
        var dh = (line[1] - min) / (max - min) * h;
        var dy = ey - dh;
        var dx = sx + i * unitw + unitw / 2;
        cc.lineTo(coordinate.format(dx), coordinate.format(dy));
    }
    cc.lineTo(ex, ey);
    cc.closePath();
    cc.stroke();
    cc.fill();



    cc.strokeStyle = fcolor.text;
    cc.fillStyle = fcolor.text;
    var lastx = 0;
    for (var i = 0, len = years.length; i < len; i++) {
        var item = years[i];
        var dx = sx + item.index * unitw - unitw / 2;
        var txtw = cc.measureText(item.txt).width;
        var endx = dx + txtw + 20;
        if (endx < ex && endx > lastx + 80) {
            cc.beginPath();
            cc.moveTo(coordinate.format(dx), ey);
            cc.lineTo(coordinate.format(dx), ey - 16);
            cc.closePath();
            cc.stroke();
            cc.fillText(item.txt, dx + 4, ey - font.size / 2);
            lastx = dx;
        }

    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/draw/drawminimap.js
// module id = 224
// module chunks = 0
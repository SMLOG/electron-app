module.exports = function () {

    var cc = this.layer.layerGridC;
    var ops = this.options;
    var axisMax = ops.axisMax;
    var axisSeq = ops.axisSeq;
    var padding = ops.padding;
    var font = ops.font;
    var color = ops.color;
    var grid = ops.grid;

    var x1 = grid.xStatr;
    var y1 = grid.yStart;
    var x2 = grid.xEnd;
    var y2 = grid.yEnd;
    var height = grid.height;
    var midy = grid.midy;
    var unit = height / 4;

    cc.fillStyle = color.text;
    cc.fillText("0", padding.left + 2, midy);
    for (var i = 1, len = 2; i <= len; i++) {
        var txt = axisSeq[i];
        if (txt == Infinity) {
            txt = "0"
        }
        cc.fillText(txt, padding.left + 2, midy - unit * i + font.size / 2);
    }

    for (var i = 1, len = 2; i <= len; i++) {
        var txt = axisSeq[i];
        if (txt == Infinity) {
            txt = "0"
        }
        cc.fillText("-" + txt, padding.left + 2, midy + unit * i - font.size / 2);
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/drawYAxis.js
// module id = 380
// module chunks = 0
module.exports = function(){

    var cc = this.layer.layerGridC;
    var ops = this.options;
    var data = this.data;
    var axisMax = ops.axisMax;
    var axisMin = ops.axisMin;
    var axisMax2 = ops.axisMax2;
    var axisMin2 = ops.axisMin2;

    var padding = ops.padding;
    var font = ops.font;
    var color = ops.color;
    var split = ops.split;
    var grid = ops.grid;

    var x1 = grid.xStatr;
    var y1 = grid.yStart;
    var x2 = grid.xEnd;
    var y2 = grid.yEnd;
    var height = grid.height;
    var unit = height / split.y;
    var unitn = (axisMax - axisMin) / (split.y);
    var unitn2 = (axisMax2 - axisMin2) / (split.y);

    cc.fillStyle = color.text;

    for(var i = 0, len = split.y + 1; i < len ; i++){
        var txt = (axisMax - unitn * i).toFixed(2);
        var txt2 = (axisMax2 - unitn2 * i).toFixed(2);
        var y = y1 + unit * i;
        if (i == 0) {
            y = y + font.size / 2;
        } else if (i == len - 1) {
            y = y - font.size / 2;
        }
        var x = x1 - cc.measureText(txt).width - 4;
        if (axisMax !== undefined && axisMin !== undefined) {
            cc.fillText(txt + (data.ySubfix || ""), x, y);
        }
        if (axisMax2 !== undefined && axisMin2 !== undefined) {
            cc.fillText(txt2 + (data.y2Subfix || ""), x2 + 4, y);
        }
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/drawYAxis.js
// module id = 392
// module chunks = 0
var coordinate = require("chart/common/coordinate");


/**
 * 
 */
function drawBar(obj) {
    this.obj = obj;
}


drawBar.prototype.draw = function () {
    this.drawBar();
}


drawBar.prototype.drawBar = function(){
    var cc = this.obj.layer.layerBarC;
    var ops = this.obj.options;
    var tcolor = ops.color;
    var font = ops.font;

    var barColor = ops.barColor;
    var pd = ops.padding;

    var vw = ops.validWidth;
    var vh = ops.validHeight;
    var bw = ops.barWidth;      // 柱子宽度比例
    var yMax = ops.yMax;        // y轴最大值

    var data = ops.series;
    var unitw = vw / data.length;   // 单位宽度
    var tw = unitw * bw;            // 实际宽度
    var indent = (unitw - tw) / 2;    // 两端偏移
    var base = coordinate.format(pd.top + vh);         // 底部的基线

    for (var i = 0; i < data.length; i++) {
        var bars = data[i].data;
        var color = data[i].color;
        var barSum = 0;
        var x = coordinate.format(pd.left + (unitw * i) + indent);
        for (var j = bars.length - 1; j >= 0 ; j--) {
            var start = barSum / yMax * vh;
            if (!isNaN(bars[j])) {
                barSum = barSum + (bars[j] / 1);
            } else {
                
            }
            var end = barSum / yMax * vh;

            if (color) {
                cc.fillStyle = color[j];
            } else {
                cc.fillStyle = barColor[j];
            }
            cc.fillRect(x, base - end, tw, (end - start));
        }

        // 处理有多行标题
        var title = data[i].title;
        if (title instanceof Array) {
            for (var t = 0; t < title.length; t++) {
                var txtwidth = cc.measureText(title[t]).width;
                var tx = x + (tw - txtwidth) / 2;
                cc.fillStyle = tcolor.text;
                cc.fillText(title[t], tx, base + font.size * (t+1));
            }
        } else {
            var txtwidth = cc.measureText(data[i].title).width;
            var tx = x + (tw - txtwidth) / 2;
            cc.fillStyle = tcolor.text;
            cc.fillText(data[i].title, tx, base + font.size);
        }
        
    }
}


module.exports = drawBar;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/drawBar.js
// module id = 371
// module chunks = 0
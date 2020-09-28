var coordinate = require("chart/common/coordinate");

module.exports = function(){

    var ops = this.options;
    var padd = ops.padding;
    var pd = ops.padding;
    var color = ops.color;
    
    var cc = this.layer.layerBarC;

    var vw = ops.validWidth;
    var vh = ops.validHeight;
    var yMax = ops.yMax;

    var splitY = ops.splitY;
    var axixY = ops.axixY;
    var axixYf = ops.axixYf;

    var unith = vh / splitY;

    var base = pd.top + vh;
    var len = ops.series.length;
    var unit = ops.validWidth / len;

    cc.strokeStyle = color.boxBorder;
    cc.beginPath();
    cc.moveTo(coordinate.format(padd.left), coordinate.format(padd.top));
    cc.lineTo(coordinate.format(padd.left), coordinate.format(padd.top + ops.validHeight));
    cc.lineTo(coordinate.format(padd.left + ops.validWidth), coordinate.format(padd.top + ops.validHeight));
    cc.stroke();

    

    // 绘制深浅间隔
    cc.beginPath();
    cc.strokeStyle = color.gridBorder;
    for (var i = 0; i < splitY; i++) {
        var x = pd.left;
        var y = coordinate.format(pd.top + unith * i - 1);
        cc.moveTo(x, y);
        cc.lineTo(x + vw, y);
        cc.stroke();

        if (i % 2 == 0) {
            cc.fillStyle = color.gridDark;
        } else {
            cc.fillStyle = color.gridTint;
        }
        cc.fillRect(x, y, vw, unith);
    }

    // 绘制横轴字
    cc.fillStyle = color.text;
    cc.strokeStyle = "none";
    for (var i = 0; i < axixYf.length; i++) {
        var txt = axixYf[i];
        var txtw = cc.measureText(txt).width;
        cc.fillText(txt, pd.left - txtw - 8, base - unith * i);
    }

    // 绘制竖线
    cc.beginPath();
    cc.strokeStyle = color.gridBorder;
    for (var i = 1; i < len; i++) {
        var x = coordinate.format(padd.left + i * unit);
        cc.beginPath();
        cc.moveTo(x, base);
        cc.lineTo(x, base - ops.validHeight);
        cc.stroke();
    }

    // 画横轴刻度点
    cc.beginPath();
    cc.strokeStyle = color.boxBorder;
    for (var i = 0; i < len + 1; i++) {
        var x = coordinate.format(padd.left + i * unit);
        cc.beginPath();
        cc.moveTo(x, base - 1);
        cc.lineTo(x, base + 4);
        cc.stroke();
    }
    

}



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/drawBox.js
// module id = 370
// module chunks = 0
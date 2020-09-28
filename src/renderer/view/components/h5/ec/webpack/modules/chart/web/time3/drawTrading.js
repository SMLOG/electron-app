
function drawTrading(chart) {
    this.o = chart;
    this.cc = chart.layer.layerLineC;

    this.init();
    this.clear();
    this.trading();
}

drawTrading.prototype.init = function () {
    var chart = this.o;
    var ops = chart.options;

    this.data = chart.data.data;
    var info = chart.data.info;

    this.padding = ops.padding;
    var area = ops.areaTrading;
    this.color = ops.color;
    this.yc = info.yc;

    this.base = area.starty + area.height;

    this.maxYAxisTrading = info.maxYAxisTrading;
    this.drawh = area.height;
    this.draww = area.draww;
    this.total = info.total;
    this.unitw = this.draww / this.total;

}


drawTrading.prototype.clear = function () {
    var ops = this.o.options;
    var area = ops.areaTrading;
    this.cc.clearRect(0, area.starty - 1, ops.width, area.starty + area.height + 1);
}

// 画线
drawTrading.prototype.trading = function () {
    var base = this.base;
    var unitw = this.unitw;
    var iscr = this.o.options.iscr ;
    // iscr = (iscr == true || iscr == "true")

    this.cc.beginPath();
    for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];
        var h = item[2] / this.maxYAxisTrading * this.drawh;
        var x = this.padding.left + (i / this.total * this.draww);
        var y = base - h;

        var before;
        if (i == 0) {
            before = this.yc / 1;
        } else {
            before = this.data[i - 1][1] / 1;
        }

        // 判断是否是盘前，如果是则 before 为昨收
        if (iscr && i < 15) {
            before = this.yc / 1;
        }

        if (item[1] / 1 >= before) {
            this.cc.fillStyle = this.color.rise;
            this.cc.strokeStyle = this.color.rise;
        } else {
            this.cc.fillStyle = this.color.fall;
        }
        this.cc.strokeStyle = "rgba(255,255,255,0)";

        this.cc.EMFill(x, base, x + unitw * 0.9 , y);
    }
    this.cc.closePath();

}


module.exports = drawTrading;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/drawTrading.js
// module id = 316
// module chunks = 0
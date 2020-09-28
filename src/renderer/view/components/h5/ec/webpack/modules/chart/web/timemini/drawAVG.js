module.exports = function () {
    var cc = this.layer.layerIndexC;

    var ops = this.options;
    var color = ops.color.colorsMA;
    var padding = ops.padding;
    var th = ops.textHeight;

    var info = this.data.info;
    var cma = this.data.time;

    cma = cma.slice(0, info.total);

    var total = info.total;

    var dh = ops.height - padding.top - padding.bottom - th.head - th.foot;
    var dw = ops.width - padding.left - padding.right;

    var kAxisMax = info.axisMax;
    var kAxisMin = info.axisMin;
    var diff = kAxisMax - kAxisMin;

    var base = padding.top + th.head;
    var size = total;
    size = size < ops.minPillar ? ops.minPillar : size;
    var unitw = dw / (size - 1);

    cc.clearRect(0, 0, ops.width, ops.height);
    cc.strokeStyle = color[0];

    cc.beginPath();
    var isFrist = true;
    for (var j = 0; j < cma.length; j++) {
        var d = cma[j][3];
        if (d > 0) {
            var h = Math.abs(d - kAxisMax) / diff * dh;
            var y = base + h;
            var x = padding.left + unitw * j;
            if (isFrist) {
                isFrist = false;
                cc.moveTo(x, y);
            } else {
                cc.lineTo(x, y);
            }
        }
    }

    cc.stroke();


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/drawAVG.js
// module id = 352
// module chunks = 0
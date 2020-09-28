module.exports = function () {
    var cc = this.layer.layerLineC;
    var ops = this.options;
    var pad = ops.padding;
    var axisMax = ops.axisMax;
    var grid = ops.grid;
    var color = ops.color;

    var yaxis = this.data.yaxis;
    var xaxis = this.data.xaxis;
    var width = ops.width - pad.left - pad.right;

    // cc.clearRect(0,0, ops.width, ops.height);

    var ydata = yaxis.data;
    var last = ydata[ydata.length - 1];
    for(var i = ydata.length - 1 ; i >= 0 ; i--){
        var t = ydata[i];
        if (t === "" || t === "-" | t === " ") {
        } else {
            last = t;
            break;
        }
    }


    if (last > 0) {
        cc.strokeStyle = color.rise;
    } else if (last < 0) {
        cc.strokeStyle = color.fall;
    } else {
        cc.strokeStyle = color.text;
    }

    cc.beginPath();
    var isFrist = true;
    for (var i = 0, len = xaxis.length, lenb = xaxis.length - 1; i < len; i++) {
        // 如果中间有不是数字的值， 则断开折线
        var t = ydata[i];
        if (t === "" || t === "-" || t === " " || !t) {
            isFrist = true;
            cc.stroke();
        } else {
            var x = pad.left + (width / lenb * i);
            var h = ydata[i] / axisMax * grid.height / 2;
            var y = grid.midy - h;
            if (isFrist) {
                cc.moveTo(x, y);
                isFrist = false;
            } else {
                cc.lineTo(x, y);
            }
        }
    }
    cc.stroke();
    cc.closePath();

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/drawLine.js
// module id = 381
// module chunks = 0
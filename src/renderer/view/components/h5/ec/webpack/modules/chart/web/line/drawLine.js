module.exports = function () {
    var cc = this.layer.layerLineC;
    var ops = this.options;
    var pad = ops.padding;
    var axisMax = ops.axisMax;
    var axisMin = ops.axisMin;
    var axisMax2 = ops.axisMax2;
    var axisMin2 = ops.axisMin2;
    var grid = ops.grid;
    var color = ops.color;

    var xaxis = this.data.xaxis;
    var yaxis = this.data.yaxis || [];
    var yaxis2 = this.data.yaxis2 || [];

    var width = ops.width - pad.left - pad.right;
    var height = grid.yEnd - grid.yStart;
    var diff = axisMax - axisMin;
    var diff2 = axisMax2 - axisMin2;

    if (yaxis.length > 0) { 
        drawAxisLine(yaxis, axisMax, axisMin, diff);
    }

    if (yaxis2.length > 0) {
        drawAxisLine(yaxis2, axisMax2, axisMin, diff2);
    }
    
    function drawAxisLine(axisData, max, min, dif){
        for(var j = 0, lens = axisData.length ; j < lens ; j++){
            var line = axisData[j];
            var ydata = line.data;

            cc.beginPath();
            cc.strokeStyle = line.color;
            cc.lineWidth = line.lineWidth || 1;
            
            var isFrist = true;
            for (var i = 0, len = xaxis.length; i < len; i++) {
                // 如果中间有不是数字的值， 则断开折线
                var t = ydata[i];
                if (t === "" || t === "-" || t === " " || !t) {
                    isFrist = true;
                    cc.stroke();
                } else {
                    var x = pad.left + (width / (len - 1) * i);
                    var h = (max - t) / dif * height;
                    var y = grid.yStart + h;
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
        }
    }

};




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/drawLine.js
// module id = 394
// module chunks = 0
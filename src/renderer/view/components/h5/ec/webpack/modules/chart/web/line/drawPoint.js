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

    axisPoint(yaxis, axisMax, axisMin, diff);
    axisPoint(yaxis2, axisMax2, axisMin2, diff2);

    function axisPoint(pointData, max, min, dif){
        for (var j = 0, lens = pointData.length; j < lens; j++) {
            var line = pointData[j];
            var ydata = line.data;
            var point = line.point || {};
            var radius = point.radius === undefined ? 4 : point.radius;

            if (point.show || point.show === undefined) {
                cc.strokeStyle = line.color;
                cc.fillStyle = line.color;

                for (var i = 0, len = xaxis.length; i < len; i++) {
                    // 如果中间有不是数字的值， 则断开折线
                    var t = ydata[i];
                    if (t !== "" && t !== "-" && t !== " " && t !== 0) {
                        var x = pad.left + (width / (len - 1) * i);
                        var h = (max - t) / dif * height;
                        var y = grid.yStart + h;

                        cc.beginPath();

                        switch (point.type) {
                            case "stroke":
                                cc.fillStyle = "#ffffff";
                                cc.arc(x, y, radius, 0, Math.PI * 2);
                                cc.closePath();
                                cc.fill();
                                cc.stroke();
                                break;

                            case "blur":
                                cc.save();
                                cc.globalAlpha = 0.3;
                                cc.arc(x, y, radius * 1.8, 0, Math.PI * 2);
                                cc.closePath();
                                cc.fill();
                                cc.restore();
                                cc.beginPath();
                                cc.arc(x, y, radius, 0, Math.PI * 2);
                                cc.closePath();
                                cc.fill();
                                break;
                            
                            default:        // 默认 fill
                                cc.arc(x, y, radius, 0, Math.PI * 2);
                                cc.closePath();
                                cc.fill();
                                break;
                        }
                    }
                }
                cc.stroke();
            }
        }
    }


    


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/drawPoint.js
// module id = 395
// module chunks = 0
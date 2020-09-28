var arrayExt = require("../../../common/arrayExtension");


module.exports = function (params) {

    var cc = params.cc;
    var data = params.data;
    var tkdata = params.tkdata;
    var status = params.status;
    var regionk = params.regionk;
    var color = params.color;
    var ops = params.ops;
    var max = params.max;
    var min = params.min;
    var sx = params.sx;
    var sy = params.sy;
    var ex = params.ex;
    var ey = params.ey;

    var type = status.v;

    var colorsMA = ops.color.colorsMA;
    var titleKeys = ops.titleKeys;


    var scale = ops.scale;
    var diff = max - min;
    var kheight = ey - sy;      // k线区域的高度
    var drawSumWdith = ex - sx;        // 绘图宽度
    var pillar = scale.pillar;         // 柱子数量
    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度


    cc.clearRect(0, 0, ops.width, regionk.h);
    var selfKeys = titleKeys[type];
    if (selfKeys) {
        for (var j = 0; j < selfKeys.length; j++) {
            cc.beginPath();
            cc.strokeStyle = colorsMA[j];
            var index = j + 1;

            var isfrist = true;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item[index] != "-") {
                    var ih = (item[index] - min) / diff * kheight;
                    var y = ey - ih;
                    var x = sx + (pillarWidht * i) + pillarWidht / 2;

                    if (type == "SAR") {
                        var k = tkdata[i];
                        var temp = [k.open, k.high, k.low, k.close];
                        sar(cc, x, y, temp, item[index], color);
                    } else {
                        if (isfrist) {
                            cc.moveTo(x, y);
                            isfrist = false;
                        } else {
                            cc.lineTo(x, y);
                        }
                    }
                }
            }
            cc.stroke();
            cc.closePath();
        }
    }




};


function sar(cc, x, y, ochl, sar, color) {

    var mm = arrayExt.findMaxMin(ochl);

    var isDraw = false;
    if (sar / 1 <= mm.min) {
        isDraw = true;
        cc.fillStyle = color.rise;
    }

    if (sar / 1 >= mm.max) {
        isDraw = true;
        cc.fillStyle = color.fall;
    }

    if (isDraw) {
        cc.beginPath();
        cc.arc(x, y, 2, 0, Math.PI * 2);
        cc.closePath();
        cc.fill();
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/draw/drawlinev.js
// module id = 215
// module chunks = 0
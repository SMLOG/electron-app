var arrayExt = require("chart/common/arrayExtension");

/**
 * 主图指标，5个
 * 
 */

function drawIndexsV(kObj) {
    this.kObj = kObj;
    this.cc = kObj.layer.layerIndexC;
    this.ops = kObj.options;
    this.color = this.ops.color;

}


drawIndexsV.prototype.draw = function (type) {
    var data = this.kObj.options.scale.indexs[type];
    this.indexv(data, type);
}


// 均线
drawIndexsV.prototype.indexv = function (data, type) {
    var _this = this;



    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;
    var stauts = this.kObj.stauts;

    var colorsMA = this.color.colorsMA;

    var indexs = this.ops.scale.indexs;

    var scale = ops.scale;
    var max = scale.info.newKAxisMax;        // K最大值
    var min = scale.info.newKAxisMin;        // K最小值
    var diff = max - min;

    var k = ops.drawRegion.k;
    var dh = k.h - k.mb - k.mt;
    var kbaseline = k.top + (k.h - k.mb);
    var kheight = k.h - 1;


    cc.clearRect(0, 0, ops.width, kheight);

    if (type != "none") {

        var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
        var pillar = scale.pillar;                     // 柱子数量
        if (scale.data.length < pillar) {
            pillar = scale.data.length;
        }
        if (scale.data.length < scale.min) {
            pillar = scale.min;
        }

        var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度

        
        // var data = data;
        var kdata = this.kObj.options.scale.data;

        var titleKeys = ops.titleKeys[type] || [];

        for (var j = 0; j < titleKeys.length; j++) {
            cc.beginPath();
            cc.strokeStyle = colorsMA[j];
            var index = j + 1;

            var isfrist = true;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item[index] / 1) {
                    var ih = (item[index] - min) / diff * dh;
                    var y = kbaseline - ih;
                    var x = padding.left + (pillarWidht * i) + pillarWidht / 2;

                    if (type == "SAR") {
                        var k = kdata[i];
                        var temp = [k[1], k[2], k[3], k[4]];
                        _this.sar(cc, x, y, temp, item[index]);
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
}


drawIndexsV.prototype.sar = function (cc, x, y, ochl, sar) {
    var color = this.color;

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



module.exports = drawIndexsV;





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/drawIndexsV.js
// module id = 81
// module chunks = 0
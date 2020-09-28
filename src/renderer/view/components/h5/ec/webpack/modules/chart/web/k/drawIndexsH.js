var tools = require("chart/common/tools");

/**
 * 主图指标，5个
 * 
 */

function drawIndexsH(kObj) {
    this.kObj = kObj;
    this.cc = kObj.layer.layerIndexC;
    this.ops = kObj.options;
    this.color = this.ops.color;

}


drawIndexsH.prototype.draw = function (type) {

    var ko = this.kObj;
    var thisData = ko.options.thisData;

    var data = ko.options.scale.indexs[type];

    if (type == "MACD") {
        this.macd(data);
        this.axisMACD();
    } else {
        this.indexh(data);
        this.axis();
    }

}


drawIndexsH.prototype.indexh = function (data) {
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;
    var stauts = this.kObj.stauts.indexh;

    var colors = this.color.colorsIndex;
    var indexs = this.ops.scale.indexs;

    var scale = ops.scale;
    var max = scale.info[stauts + "Max"];        // K最大值
    var min = scale.info[stauts + "Min"];        // K最小值
    var diff = max - min;

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var pillar = scale.pillar;                          // 柱子数量
    if (scale.data.length < pillar) {
        pillar = scale.data.length;
    }
    if (scale.data.length < scale.min) {
        pillar = scale.min;
    }

    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度

    var region = ops.drawRegion.index;
    var dh = region.h - region.mb - region.pt;
    var kbaseline = region.top + (region.h - region.mb);
    var data = data;

    cc.clearRect(padding.left, region.top, drawSumWdith, region.h);

    for (var j = 0; j < colors.length; j++) {
        cc.beginPath();
        cc.strokeStyle = colors[j];
        var index = j + 1;

        var isfrist = true;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item[index]) {
                var ih = (item[index] - min) / diff * dh;
                var y = kbaseline - ih;
                var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
                if (isfrist) {
                    cc.moveTo(x, y);
                    isfrist = false;
                } else {
                    cc.lineTo(x, y);
                }
            }
        }
        cc.stroke();
        cc.closePath();
    }
}


drawIndexsH.prototype.macd = function (data) {
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;
    var stauts = this.kObj.stauts.indexh;
    
    var colors = this.color.colorsIndex;
    var indexs = this.ops.scale.indexs;
    
    var color = ops.color;
    var scale = ops.scale;
    var max = scale.info[stauts + "Max"];        // K最大值
    var min = scale.info[stauts + "Min"];        // K最小值

    var mmax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);

    max = mmax;     // 上下限
    min = -mmax;      
    
    var diff = max - min;

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var pillar = scale.pillar;                          // 柱子数量
    if (scale.data.length < pillar) {
        pillar = scale.data.length;
    }
    if (scale.data.length < scale.min) {
        pillar = scale.min;
    }

    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度

    var region = ops.drawRegion.index;
    var dh = region.h - region.pt;
    var kbaseline = region.top + region.pt + (region.h - region.pt) / 2;
    var data = data;

    cc.clearRect(padding.left, region.top, drawSumWdith, region.h);

    for (var j = colors.length - 1; j >=0 ; j--) {
        cc.beginPath();
        cc.strokeStyle = colors[j-1];
        var index = j;

        var isfrist = true;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item[index]) {

                if (index == 3) {
                    
                    var ih = (item[index]) / max * (dh / 2);
                    var y = kbaseline - ih;
                    var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
                    var sx = x - pillarWidht / 2 * 0.6;
                    var ex = x + pillarWidht / 2 * 0.6;

                    if (ih < 0) {
                        cc.fillStyle = color.fall;
                        cc.strokeStyle = color.fall;
                    } else {
                        cc.fillStyle = color.rise;
                        cc.strokeStyle = color.rise;
                    }
                    
                    // cc.moveTo(x, kbaseline);
                    // cc.lineTo(x, y);
                    // cc.stroke();
                    // cc.EMFill(sx, kbaseline, ex, y);
                    cc.EMLine(x, kbaseline, x, y);
                } else {
                    var ih = (item[index]) / max * (dh / 2);
                    var y = kbaseline - ih;
                    var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
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

// 刻度
drawIndexsH.prototype.axis = function () {
    var stauts = this.kObj.stauts;
    var color = this.color;
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;

    var scale = ops.scale;
    var data = scale.data;
    var max = scale.info[stauts.indexh + "Max"];        // K最大值
    var min = scale.info[stauts.indexh + "Min"];        // K最小值
    
    if (max == "NaN" || max == Infinity || max == -Infinity) {
        max = 0;
    }
    if (min == "NaN" || min == Infinity || min == -Infinity) {
        min = 0;
    }
    var diff = (max - min) / 2;

    var region = ops.drawRegion.index;

    var base = region.top + region.h - region.pb;
    var unit = (region.h - region.pt - region.pb) / 2;

    // if (data.length > 0) {
        cc.clearRect(0, region.top + region.pt / 2, padding.left, region.h);
        cc.fillStyle = color.text;
        for (var i = 0; i <= 2; i++) {
            var num = tools.formatNumUnit(min + (diff * i));
            var w = cc.measureText(num).width + 8;
            var x = padding.left - w;
            var y = base - unit * i;
            cc.fillText(num, x, y);
        }
    // }
}

drawIndexsH.prototype.axisMACD = function () {
    var stauts = this.kObj.stauts;
    var color = this.color;
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;

    var scale = ops.scale;
    var data = scale.data;
    var max = scale.info[stauts.indexh + "Max"];        // K最大值
    var min = scale.info[stauts.indexh + "Min"];        // K最小值

    var mmax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);

    max = mmax;     // 上下限
    min = -mmax;      
    
    var diff = (max - min) / 2;

    var region = ops.drawRegion.index;

    var base = region.top + region.h - region.pb;
    var unit = (region.h - region.pt - region.pb) / 2;

    // if (data.length > 0) {
        cc.clearRect(0, region.top + region.pt / 2, padding.left, region.h);
        cc.fillStyle = color.text;
        for (var i = 0; i <= 2; i++) {
            var num = tools.formatNumUnit(min + (diff * i));
            var w = cc.measureText(num).width + 8;
            var x = padding.left - w;
            var y = base - unit * i;
            cc.fillText(num, x, y);
        }
    // }
}


module.exports = drawIndexsH;





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k/drawIndexsH.js
// module id = 69
// module chunks = 0
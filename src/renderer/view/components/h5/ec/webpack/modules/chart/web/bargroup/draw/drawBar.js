// var setting = require("../defaultSetting");
// var defaultData = require("../defaultData");

module.exports = function (cc, box, dfdata, split) {
    setting = this.options;

    var barWidth = setting.barWidth;
    var padding = setting.padding;

    var sx = box.sx,        // 起点
        sy = box.sy,
        ex = box.ex,        // 终点
        ey = box.ey,
        spx = box.spx,      // 分割数量
        spy = box.spy;


    var max = split[0] / 1;
    var min = split[split.length - 1];
    var diff = max;
    if (min < 0) {
        diff = max - min;
    }

    var dw = ex - sx;
    var dh = ey - sy;

    var datas = dfdata.datas;
    var colors = dfdata.colors;
    var dataCount = this.dataCount;
    var sum = dataCount + datas.length;

    var base = (max / diff) * dh + padding.top - 0.5;

    this.baseBar = base;

    console.log(base);

    var count = 0;
    for (var i = 0, len = datas.length; i < len; i++) {
        var item = datas[i];
        var data = item.data;
        var size = data.length + 1;

        var width = (size / sum) * dw;
        var unit = width / (size);
        console.log("unit: " + unit);

        var baseLeft = sx + (count / sum) * dw;
        var cs = item.color || colors;
        for (var j = 0, len2 = data.length; j < len2; j++) {

            if (data[j] != "-" && data[j] != 0) {
                var hei = (data[j] / diff) * dh;

                var x = baseLeft + unit / 2 + unit * j;

                var x1 = x + unit * (1 - barWidth) / 2;
                var x2 = x1 + unit * barWidth;
                
                var tbase = base;
                if (data[j] > 0) {
                    tbase -= 1;
                } else {
                    tbase += 1;
                }
                var y = tbase - hei;
                
                cc.fillStyle = cs[j % cs.length];
                cc.strokeStyle = cs[j % cs.length];
                cc.EMFill2(x1, tbase, x2, y);
            }
            
        }

        count += size;
    }

    this.datas.baseZero = base;    // 0线的位置


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/draw/drawBar.js
// module id = 450
// module chunks = 0
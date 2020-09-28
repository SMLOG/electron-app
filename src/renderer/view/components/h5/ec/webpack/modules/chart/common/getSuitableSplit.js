var splitYAxis = require("./splitYAxis");       // 计算刻度


/**
 * 获取一个适当的轴分段数组
 * 
 * @param {any} height : 绘图区域的高度
 * @param {any} choosable ： 可选数组
 */
module.exports = function(){

    var drawRegionK = this.options.drawRegion.k;
    var info = this.options.scale.info;
    var maxin = this.options.maxin;

    var max = info.newKAxisMax;
    var min = info.newKAxisMin;

    var obj = splitYAxis(max, min);

    // 根据高度估计一个合适的刻度
    var split;  // 合适的数组
    var lv;     // 合适的分级
    var kh = drawRegionK.h;
    if (obj.splits.length % 2 == 0) {
        if (kh > 150) {
            split = obj.splits[0] || [];
            lv = obj.levels[0] || 0;
        } else {
            split = obj.splits[1] || [];
            lv = obj.levels[1] || 0;
        }
    } else {
        if (kh >= 450) {
            split = obj.splits[0] || [];
            lv = obj.levels[0] || 0;
        } else if (kh < 450 && kh > 150) {
            split = obj.splits[1] || [];
            lv = obj.levels[1] || 0;
        } else {
            split = obj.splits[2] || [];
            lv = obj.levels[2] || 0;
        }
    }

    // 特殊逻辑，如果绘制最高最低点的标记，则需要对两端的格子超过一半的+1格
    // if (maxin.show) {
    //     if ((split[0] - obj.max) < (lv / 2)) {
    //         split.unshift(split[0] + lv);
    //     }
    //     var last = split[split.length - 1];
    //     if (Math.abs(last - obj.min) < (lv / 2)) {
    //         split.push(last - lv);
    //     }
    // }

    return split;

}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/getSuitableSplit.js
// module id = 23
// module chunks = 0
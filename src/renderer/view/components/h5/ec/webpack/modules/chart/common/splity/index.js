/**
 * 纵轴刻度分段
 *
 * @param {*} max: 最大值
 * @param {*} min: 最小值
 * @param {*} density: 密度, 想要的大概返回多少个段
 * @returns
 */



var split = require('./split');


module.exports = function (max, min, density) {
    if (max == min) {
        if (max == 0) {
            max += 0.01;
            min -= 0.01;
        } else {
            max *= 1.005;
            min *= 0.995;
        }
    }

    var spl = split(max, min);
    
    // 筛选出一个合适的分段
    var splits = spl.splits;
    var index = 0;
    if (splits.length > 1) {
        for (var i = 0; i < splits.length - 1; i++) {
            var abs1 = Math.abs(splits[i].length - density);
            var abs2 = Math.abs(splits[i + 1].length - density);
            if (abs2 < abs1) {
                index = i + 1;
            }
        }
    }

    spl.y = spl.splits[index];
    return spl;

}







//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/splity/index.js
// module id = 80
// module chunks = 0
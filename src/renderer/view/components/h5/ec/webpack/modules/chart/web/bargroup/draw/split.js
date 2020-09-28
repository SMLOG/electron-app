// var setting = require("../defaultSetting");



/**
 * 根据最大最小值分割纵轴分段
 * @param {*} max：最大值 
 * @param {*} min：最小值
 */
module.exports = function(setting, max, min){

    // 解析保留的小数位
    var fixed = setting.fixed;
    if (fixed == -1) {
        fixed = 0;
        if (max < 0.001) {
            fixed = 4;
        } 
        if (max < 0.01) {
            fixed = 3;
        } 
        if (max < 2) {
            fixed = 2;
        }
    }


    var fmax = max * 1.1;
    var fmin = min * 1.1;

    if (fmin >= 0) {
        fmin = 0;
    }


    var unit = (fmax - fmin) / setting.splitx;

    var positive = [0];      // 正方向
    var minus = [];         // 负方向

    while (1) {
        var last = positive[positive.length - 1] / 1 || 0;
        var tnum = parseFloat(last + unit) ;
        tnum = tnum.toFixed(fixed);
        positive.push(tnum);
        if (tnum / 1 >= max) {
            break;
        }
    }

    while (1 && min < 0) {
        var last = minus[minus.length - 1] / 1 || 0;
        var tnum = parseFloat(last - unit);
        tnum = tnum.toFixed(fixed);
        minus.push(tnum);
        if (tnum / 1 <= min) {
            break;
        }
    }

    if (max == 0) {
        positive = [0];
    }

    var splitarr = positive.reverse();
    splitarr = splitarr.concat(minus);

    return splitarr;

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/draw/split.js
// module id = 447
// module chunks = 0
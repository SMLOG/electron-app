
/**
 * 根据轴的最值划分分段
 * 
 * @param {any} max ： 轴最大值
 * @param {any} min ： 轴最小值
 * @param {any} split ： 分割数量
 */
module.exports = function (max, min, split) {
    // 如果
    // if (!max && !min) {
    //     return [];
    // }

    var tmax = max * 1.1;
    var tmin = min * 1.1;

    var ymax = tmax > 0 ? tmax : 0;
    var ymin = tmin > 0 ? 0 : tmin;
    var diff = ymax - ymin;
    if (diff == 0 && max == 0) {
        max = 1;
        diff = 1;
    }

    // 小数最小
    var absMin = Math.abs(max) > Math.abs(min) ? Math.abs(min) : Math.abs(max);

    // 解析保留的小数位
    var fixed = 2;
    if (absMin > 0 && absMin < 0.00001) {
        fixed = 7;
    } else if (absMin > 0 && absMin < 0.0001) {
        fixed = 6;
    } else if (absMin > 0 && absMin < 0.001) {
        fixed = 5;
    } else if (absMin > 0 && absMin < 0.01) {
        fixed = 4;
    } else if (absMin > 0 && absMin < 2) {
        fixed = 3;
    }

    var ss = 10;
    var minsetp = diff / split / ss;

    var positive = [0];      // 正方向
    var minus = [];         // 负方向

    for (var i = 1, len = ss * 4; i <= len; i++) {

        while (1) {
            var last = positive[positive.length - 1] / 1 || 0;
            var tnum = parseFloat(last + minsetp * i);
            // tnum = tnum.toFixed(fixed);
            positive.push(tnum);
            if (tnum / 1 >= max) {
                break;
            }
        }

        while (1 && min < 0) {
            var last = minus[minus.length - 1] / 1 || 0;
            var tnum = parseFloat(last - minsetp * i);
            // tnum = tnum.toFixed(fixed);
            minus.push(tnum);
            if (tnum / 1 <= min) {
                break;
            }
        }

        if (minus.length + positive.length <= split + 1) {
            break;
        } else {
            positive = [0];
            minus = [];
        }

    }


    positive = positive.reverse();
    var splitarr = positive.concat(minus);

    if (splitarr.length < split + 1) {
        // TODO
        var temp = splitarr[0] - 0 + (splitarr[0] - splitarr[1])
        splitarr.unshift(temp);
    }

    return splitarr;
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/splitYaxis.js
// module id = 129
// module chunks = 0
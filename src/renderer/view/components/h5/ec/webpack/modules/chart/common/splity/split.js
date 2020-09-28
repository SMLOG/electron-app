/**
 * 纵轴刻度分段
 */


module.exports = function (max, min) {
    var result = {};
    result.max = max;
    result.min = min;

    var lvs = [1, 2, 5];
    var lv = 0.0001;

    var diff = max - min;
    result.diff = diff;
    if (diff == 0) {
        diff = max * 0.01;
    }

    var level = [];
    while (1) {
        for (var i = 0; i < lvs.length; i++) {
            var c = diff / (lv * lvs[i]);
            if (c > 0.5 && c < 32) {
                level.push(lv * lvs[i])
            }
        }
        lv *= 10;
        if (lv > 100000000) {
            break;
        }
    }

    shiftPop(level);
    result.levels = level;

    result.splits = [];
    for (var i = 0; i < level.length; i++) {
        result.splits.push(priorityUp(max, min, level[i]))
    }
    // console.log(result);

    if (max == 0 && min == 0) {
        result.splits = [];
        result.levels = [];
    }
    return result;

    // 排除多余的
    function shiftPop(arrs) {
        if (arrs.length > 3) {
            arrs.pop();
            arrs.shift();
            shiftPop(arrs);
        }
    }

    // 计算下边界
    function limitDown(min, lv) {
        var tmin = min / lv;
        var temp = Math.round(tmin);
        if (temp > tmin) {
            temp -= 1;
        }
        return temp * lv;
    }

    // 计算上边界
    function limitUp(max, lv) {
        var tmax = max / lv;
        var temp = Math.round(tmax);
        if (temp < tmax) {
            temp += 1;
        }
        return temp * lv;
    }

    //  上界优先
    function priorityUp(max, min, lv) {
        var xs;
        try {
            xs = (lv + "").split(".")[1].length;
        } catch (error) {
            xs = 2;
        }
        var up = limitUp(max, lv);
        var down = limitDown(min, lv);

        var tarr = [];
        var temp = up;
        while (1) {
            tarr.push(temp.toFixed(xs) / 1);
            temp -= lv;
            if (temp < (down - lv / 2)) {
                break;
            }
        }
        return tarr;
    }
}







//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/splity/split.js
// module id = 184
// module chunks = 0
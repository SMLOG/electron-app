module.exports = function () {
    var ops = this.options;

    var data = this.data;
    var datarr = data.yaxis || [];
    var datarr2 = data.yaxis2 || [];

    var allarr = [];

    for (var i = 0, len = datarr.length; i < len; i++) {
        allarr = allarr.concat(datarr[i].data);
    }
    // 过滤不符合数组标准的值
    allarr = allarr.filter(function (val) {
        if (val !== undefined && val !== "" && val !== " " && val !== "-") {
            return true;
        }
    });

    if (allarr.length > 0) {
        var min = Math.min.apply(Math, allarr);
        var max = Math.max.apply(Math, allarr);

        var diff = max - min;
        var axisMax, axisMin;

        if (diff != 0) {
            axisMax = max + diff * 0.1;
            axisMin = min - diff * 0.1;
        } else {
            if (max == 0) {
                axisMax = max + 1;
                axisMin = min - 1;
            } else {
                axisMax = max + Math.abs(max * 0.05);
                axisMin = min - Math.abs(max * 0.05);
            }
        }

        ops.axisMax = axisMax;
        ops.axisMin = axisMin;
    } else {
        ops.padding.left = 10;
    }
    


    var allarr2 = [];
    for (var i = 0, len = datarr2.length; i < len; i++) {
        allarr2 = allarr2.concat(datarr2[i].data);
    }
    allarr2 = allarr2.filter(function (val) {
        if (val !== undefined && val !== "" && val !== " " && val !== "-") {
            return true;
        }
    });
    if (allarr2.length > 0) {
        this.options.padding.right = 60;

        var min2 = Math.min.apply(Math, allarr2);
        var max2 = Math.max.apply(Math, allarr2);

        var diff2 = max2 - min2;
        var axisMax2, axisMin2;
        if (diff2 != 0) {
            axisMax2 = max2 + diff2 * 0.1;
            axisMin2 = min2 - diff2 * 0.1;
        } else {
            if (max2 == 0) {
                axisMax2 = max2 + 1;
                axisMin2 = min2 - 1;
            } else {
                axisMax2 = max2 + Math.abs(max2 * 0.05);
                axisMin2 = min2 - Math.abs(max2 * 0.05);
            }
        }
        ops.axisMax2 = axisMax2;
        ops.axisMin2 = axisMin2;
    }


};



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/dataFormat.js
// module id = 391
// module chunks = 0
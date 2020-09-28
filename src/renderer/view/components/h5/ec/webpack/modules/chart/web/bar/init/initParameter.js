/**
 * 
 * 初始化输入的参数
 * 
 */
var extend = require("chart/common/extend2");
var setting = require("../defaultSetting");

module.exports = function initParameter(){
    var option = this.option;

    var ops = {};

    // 宽和高
    ops.width = option.width ;
    ops.height = option.height;
    ops = extend(setting, option);


    var series = option.series;
    var yMax = -Infinity;        // 一项数据中和的最大值
    var onlyMax = -Infinity;     // 单个数据中的最大值
    var titleLine = 1;          // 是否有多行标题的情况
    for (var i = 0; i < series.length; i++) {
        var item = series[i];
        
        if (item.title instanceof Array) {
            var len = item.title.length;
            titleLine = titleLine > len ? titleLine : len;
        }

        var sum = 0;
        for (var j = 0 , len = item.data.length; j < len; j++) {
            var temp = item.data[j];
            if (!isNaN(temp)) {
                sum += temp;
                onlyMax = onlyMax > temp ? onlyMax : temp;
            }
        }

        yMax = yMax > sum ? yMax : sum;
    }

    ops.padding.bottom = ops.font.size * (titleLine + 1);

    ops.titleLine = titleLine;      // 标题的行数
    ops.yMax = yMax;
    this.options = ops;
}






//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/init/initParameter.js
// module id = 364
// module chunks = 0
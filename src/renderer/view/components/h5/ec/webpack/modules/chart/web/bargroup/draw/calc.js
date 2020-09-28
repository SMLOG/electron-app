var defaultData = require("../defaultData");
var setting = require("../defaultSetting");

var split = require("./split");
var extend = require("lodash/extend");


module.exports = function(chart){
    var setting = chart.options;
    var datas = chart.datas.datas;

    // 计算最大最小值
    var max, min;
    for(var i = 0, len = datas.length ; i < len ; i++){
        var data = datas[i].data;
        for(var j = 0, len2 = data.length ; j < len2 ; j++){
            if (data[j] != "-") {
                max = max > data[j] ? max : data[j];
                min = min < data[j] ? min : data[j];
            }
        }
    }

    // 计算分段轴数据
    var splitarr = split(setting, max, min);

    chart.datas.split = splitarr;

    var sum = 0;
    for (var i = 0, len = datas.length; i < len; i++) {
        sum += datas[i].data.length;
    }

    chart.dataCount = sum;

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/draw/calc.js
// module id = 446
// module chunks = 0
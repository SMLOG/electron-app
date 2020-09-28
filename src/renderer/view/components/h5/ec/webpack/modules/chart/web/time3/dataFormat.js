var arrayExt = require("chart/common/arrayExtension");
var getConvert = require("chart/common/getConvert");
var splitYAxis = require("chart/common/splitYAxis");       // 计算刻度
var tools = require("./tools");
var ticks = require("./ticks");

module.exports = function () {
    var dataAll = this.sdata;
    var data = dataAll.time;

    var indicatorStauts = this.indicatorStauts;     // 显示的指标

    var beticks = time.beticks;
    var tickInfo = ticks(beticks);
    console.log(tickInfo);
    

    var info = {
        name: data.name,
        code: data.code,
        total: data.trendsTotal / 1,    // 一个交易日的数据量
        decimal: data.decimal,         // 保留的小数位
        tick: tickInfo
        // jys: time.info.jys,
        // yc: yc,
        // ticks: tools.ticks(time.info.ticks),
        // timeMax: yc,          // 分时最值
        // timeMin: yc,
        // yAxisMax: yc * 1.05,         // 轴最值
        // yAxisMin: yc * 0.95,
        // avgMax: yc,           // 均线最值
        // avgMin: yc,
        // mk: time.info.mk
    }



    if (data.length > 0) {

        var frist = data[0].split(",");

        var full = [];      // 格式化之后的数组
        var maxT = frist[1] / 1;  // 现价的最值
        var minT = frist[1] / 1;
        var maxJ = frist[3] / 1;  // 均线的最值
        var minJ = frist[3] / 1;
        var maxTrading = 12;     // 成交量
        // var yc = info.yc / 1;       // 昨收

        var days = {};              // 所有的日期
        if (this.option.type == "r") {
            info.dayCount = info.total;
        } else {
            var c = parseInt(this.option.type.substr(1));
            var count = info.total / c;
            info.dayCount = count;
            for (var i = 0; i < c; i++) {
                var day = data[0 + i * count] || "";
                day = day.substr(0, 10);
                days[day] = 0 + i * count;
            }
        }


        for (var i = 0, len = data.length; i < len; i++) {
            var ar = data[i].split(",");

            var changeMoney = (ar[1] / 1 - yc).toFixed(decimal + 1);       // 涨跌额
            var changeRange = (changeMoney / yc * 100).toFixed(decimal);       // 涨跌幅
            if (yc == 0) {
                changeRange = (0).toFixed(decimal + 1);
            }

            // 时间，开盘，成交量，均线，[暂时用不到], 涨跌额, 涨跌幅 1 
            var newDay = [
                ar[0],
                ar[1],
                ar[2],
                ar[3],
                ar[4],
                changeMoney,
                changeRange
            ];

            full.push(newDay);

            maxT = maxT > ar[1] / 1 ? maxT : ar[1] / 1;
            minT = minT < ar[1] / 1 ? minT : ar[1] / 1;
            if (ar[3] / 1 > 0) {
                maxJ = maxJ > ar[3] / 1 ? maxJ : ar[3] / 1;
                minJ = minJ < ar[3] / 1 ? minJ : ar[3] / 1;
            }
            maxTrading = maxTrading > ar[2] / 1 ? maxTrading : ar[2] / 1;
        }

        if (data.length == 0) {
            maxT = yc + 0.1;
            minT = yc - 0.1;
            maxJ = yc + 0.1;
            minJ = yc - 0.1;
        }

        if (maxT == minT && minT == 0) {
            maxT = 1;
            minT = 0;
        }

        info.days = days;
        info.timeMax = maxT;
        info.timeMin = minT;
        info.avgMax = maxJ == null ? 0 : maxJ;
        info.avgMin = minJ == null ? 0 : minJ;
        info.maxTrading = maxTrading;
        info.maxYAxisTrading = maxTrading * 1.1;

        // 计算轴的上下限
        var all = [maxT, minT, info.avgMax, info.avgMin];
        var max = arrayExt.findMaxMin(all).max;
        var min = arrayExt.findMaxMin(all).min;
        if (max == min && max != 0 && max == yc) {
            max = max * 1.05;
            min = min * 1.05;
        }
        var up = Math.abs(max - yc);
        var dn = Math.abs(min - yc);
        var diff = up > dn ? up : dn;

        info.yAxisMax = yc + diff;
        info.yAxisMin = yc - diff;

    }


    this.data = this.data  || {
        info: info,
        data: full,
        indexs: indexs,
        imm: imm,
        isFoatmat: true
    }

    this.data.info = info;
    this.data.data = full || [];
    this.data.indexs = indexs;
    this.data.imm = imm;
    this.data.isFoatmat = info;


    if (this.options.show.indicatorArea && datak && ((datak || {}).data || []).length > 0) {
        // 计算各种指标

        // datak.data.unshift("2018-03-21 09:29,16.00,16.00,16.00,16.00,0,0");

        var indexs = this.data.indexs || {};
        if (indicatorStauts != "DDX" || indicatorStauts != "ZJL") {
            indexs[indicatorStauts] = getConvert(indicatorStauts, datak.data);
        }
        // var rrr = getConvert(indicatorStauts, datak.data);
        // console.log("=========================================================================================");
        // console.log("=========================================================================================");
        // console.log(indicatorStauts);
        // console.log(datak.data.length);
        // console.log(rrr);

        var imm = {};       // 保存各种指标的最值
        for (var k in indexs) {
            var item = indexs[k];
            if (item.length > 0) {
                var max = item[0][1], min = item[0][1];
                for (var i = 0, len = item.length; i < len; i++) {
                    for (var j = 1, len2 = item[i].length; j < len2; j++) {
                        max = max > item[i][j] ? max : item[i][j];
                        min = min < item[i][j] ? min : item[i][j];
                    }
                }
                imm[k + "Max"] = max;
                imm[k + "Min"] = min;
            }
        }

        setTimeout(function () {
            indexs.RSI = getConvert("RSI", datak.data);
            indexs.KDJ = getConvert("KDJ", datak.data);
            indexs.MACD = getConvert("MACD", datak.data);
            indexs.WR = getConvert("WR", datak.data);
            indexs.DMI = getConvert("DMI", datak.data);
            indexs.BIAS = getConvert("BIAS", datak.data);
            indexs.OBV = getConvert("OBV", datak.data);
            indexs.CCI = getConvert("CCI", datak.data);
            indexs.ROC = getConvert("ROC", datak.data);

            for (var k in indexs) {
                var item = indexs[k];
                if (item.length > 0) {
                    var max = item[0][1], min = item[0][1];
                    for (var i = 0, len = item.length; i < len; i++) {
                        for (var j = 1, len2 = item[i].length; j < len2; j++) {
                            max = max > item[i][j] ? max : item[i][j];
                            min = min < item[i][j] ? min : item[i][j];
                        }
                    }
                    imm[k + "Max"] = max;
                    imm[k + "Min"] = min;
                }
            }

        }, 20);

        this.data.imm = imm;
        this.data.indexs = indexs;

    }


}





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/dataFormat.js
// module id = 310
// module chunks = 0
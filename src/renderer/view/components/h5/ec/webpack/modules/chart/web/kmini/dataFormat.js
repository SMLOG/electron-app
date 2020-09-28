var arrayExt = require("chart/common/arrayExtension");
var getConvert = require("chart/common/getConvert");
var splitYAxis = require("chart/common/splitYAxis");       // 计算刻度


module.exports = {

    /**
     * 格式化传入的数据，
     */
    formatK: function () {

        var fulldata = this.option.data.k;
        var data = fulldata.data;
        var info = fulldata.info;

        // 保留的小数位
        var decimal;
        if (info.pricedigit.indexOf(".") > -1) {
            try {
                decimal = info.pricedigit.split(".")[1].length;
            } catch (error) {
                decimal = 2;
            }
        }

        var full = [];      // 格式化之后的数组
        var maxK = [];
        var minK = [];
        var times = {};     // 时间轴值
        for (var i = 0; i < data.length; i++) {
            // 数据规则，[日期，开盘，收盘，最高，最低，成交量，成交额，振幅]
            var ar = data[i].split(",");
            var previous = i > 0 ? (i - 1) : 0;
            var par = data[previous].split(",");

            var changeMoney = (ar[2] / 1 - par[2] / 1).toFixed(decimal);       // 涨跌额
            var changeRange = (changeMoney / par[2] * 100).toFixed(2);       // 涨跌幅

            // 格式化之后规则，[日期，开盘，收盘，最高，最低，成交量，成交额，振幅，涨跌额，涨跌幅, 昨收]
            var newDay = [
                ar[0],
                ar[1],
                ar[2],
                ar[3],
                ar[4],
                ar[5],
                ar[6],
                ar[7],
                //(changeMoney / 1).toFixed(decimal),
                //changeRange, 
                ar[9],
                ar[8],
                par[2]
            ];

            full.push(newDay);
            maxK.push(ar[3] / 1);
            minK.push(ar[4] / 1);
            if (!times[ar[0]]) {
                times[ar[0]] = 1;
            }
        }

        // 只显示48笔数据

        var CMA = getConvert("CMA", data);
        if (data.length > 48) {
            var start = data.length - 48;
            // data = data.slice(start);
            full = full.slice(start);
            maxK = maxK.slice(start);
            minK = minK.slice(start);
            CMA = CMA.slice(start);
        }

        // 指标均线
        var cmaMax = -Infinity;
        var cmaMin = Infinity;
        for (var i = 0; i < CMA.length; i++) {
            var item = CMA[i];
            if (item[1] > 0) {
                cmaMax = cmaMax > item[1] / 1 ? cmaMax : item[1] / 1;
                cmaMin = cmaMin < item[1] / 1 ? cmaMin : item[1] / 1;
            }
            if (item[2] > 0) {
                cmaMax = cmaMax > item[2] / 1 ? cmaMax : item[2] / 1;
                cmaMin = cmaMin < item[2] / 1 ? cmaMin : item[2] / 1;
            }
        }

        var kMax = arrayExt.findMaxMin(maxK).max;
        var kMin = arrayExt.findMaxMin(minK).min;
        var kAxisMax = kMax > cmaMax ? kMax : cmaMax;
        var kAxisMin = kMin < cmaMin ? kMin : cmaMin;
        var kdiff = (kAxisMax - kAxisMin) * 0.1;
        kAxisMax = (kAxisMax + kdiff).toFixed(decimal);
        kAxisMin = (kAxisMin - kdiff).toFixed(decimal);
        if (kAxisMax == kAxisMin) {
            kAxisMax = kAxisMax / 1 + 1;
            kAxisMin = kAxisMin - 1;
        }

        var newInfo = {
            kMax: kMax,      // 最大值
            kMin: kMin,      // 最小值
            kAxisMax: kAxisMax,
            kAxisMin: kAxisMin,
            // tradingMax: arrayExt.findMaxMin(trading).max,    
            // tradingMin: arrayExt.findMaxMin(trading).min,     
            decimal: decimal,
            code: fulldata.code,
            name: fulldata.name
        }

        this.data = this.data ? this.data : {};

        this.data.k = full;


        // 计算当前需要绘制的指标的最值
        var stauts = this.stauts;

        this.data.info = newInfo;
        this.data.CMA = CMA;

    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/dataFormat.js
// module id = 335
// module chunks = 0
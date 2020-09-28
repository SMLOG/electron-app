var arrayExt = require("chart/common/arrayExtension");
var getConvert = require("chart/common/getConvert");
var splitYAxis = require("chart/common/splitYAxis");       // 计算刻度


module.exports = {

    /**
     * 格式化传入的数据，
     */
    format: function(){

        var fulldata = this.option.data;
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
        var maxT = -Infinity;  // 现价的最值
        var minT = Infinity;
        var maxJ = -Infinity;  // 均线的最值
        var minJ = Infinity;
        var yc = (info.yc / 1).toFixed(decimal) / 1;       // 昨收
        
        for (var i = 0; i < data.length; i++) {
            var ar = data[i].split(",");    

            var changeMoney = (ar[1] / 1 - yc).toFixed(decimal+1);       // 涨跌额
            var changeRange = (changeMoney / yc * 100).toFixed(decimal+1);       // 涨跌幅
            if (yc == 0) {
                changeRange = (0).toFixed(decimal+1);
            }

            // 时间，开盘，成交量，均线，[暂时用不到], 涨跌额, 涨跌幅
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

            if (ar[1] > 0) {
                maxT = maxT > ar[1] / 1 ? maxT : ar[1] / 1;
                minT = minT < ar[1] / 1 ? minT : ar[1] / 1;
            }
            if (ar[3] > 0) {
                maxJ = maxJ > ar[3] / 1 ? maxJ : ar[3] / 1;
                minJ = minJ < ar[3] / 1 ? minJ : ar[3] / 1;
            }
        }

        if (maxJ == -Infinity) {
            maxJ = yc;
        }
        if (minJ == Infinity) {
            minJ = yc;
        }

        // 计算轴的上下限
        var all = [maxT, minT, maxJ , minJ];
        all = all.filter(function(val){
            return (val / 1 > 0);
        })
        var max = arrayExt.findMaxMin(all).max;
        var min = arrayExt.findMaxMin(all).min;
        if (max == min && max != 0 && max == yc) {
            max = max * 1.05;
            min = min * 1.05;
        }
        var up = Math.abs(max - yc);
        var dn = Math.abs(min - yc);
        var diff = up > dn ? up : dn;
        if (diff < 0.001) {
            diff = 0.001;
        }

        var axisMax = yc + diff;
        var axisMin = yc - diff;


        var newInfo = {
            maxT: maxT,      // 最大值
            minT: minT,      // 最小值
            maxJ: maxJ,
            minJ: minJ,
            axisMax: axisMax,
            axisMin: axisMin,
            decimal: decimal,
            code: fulldata.code,
            name: fulldata.name,
            
            total: info.total,
            ticks: info.ticks,
            yc: info.yc
        }

        this.data = this.data ? this.data : {};

        this.data.time = full;
        
        // 计算当前需要绘制的指标的最值 timemnini
        var stauts = this.stauts;

        this.data.info = newInfo;
        
    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/dataFormat.js
// module id = 345
// module chunks = 0
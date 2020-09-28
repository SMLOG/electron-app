var arrayExt = require("chart/common/arrayExtension");
var getConvert = require("chart/common/getConvert");
var splitYAxis = require("chart/common/splitYAxis");       // 计算刻度


module.exports = {

    /**
     * 格式化传入的数据，
     */
    formatK: function () {

        // 换手率计算乘一个系数
        var jys1 = ",2,3,6,7,13,80,"; // * 100
        var jys2 = ",1,5,";           // *1


        var fulldata = this.sdata.k || {};

        var data = fulldata.data || [];
        var info = fulldata.info || {};
        var flow = fulldata.flow || [];         // 用于计算换手率


        var yc = info.yc || 0;

        // 保留的小数位
        var decimal = 2;
        if ((info.pricedigit || "").indexOf(".") > -1) {
            try {
                decimal = info.pricedigit.split(".")[1].length;
            } catch (error) {
                decimal = 2;
            }
        }


        // 流通股时间点
        var flowTick = [];

        if (flow.length > 0) {
            for (var i = 0; i < flow.length - 1; i++) {
                var start = flow[i];
                var end = flow[i + 1];
                var temp = {
                    start: new Date(start.time.substr(0,10)).getTime(),
                    end: new Date(end.time.substr(0,10)).getTime(),
                    ltg: start.ltg
                }
                flowTick.push(temp)
            }
            var last = flow[flow.length - 1];

            var s = 
            flowTick.push({
                start: new Date(last.time.substr(0,10)).getTime(),
                end: new Date(last.time.substr(0,10)).getTime() + 999999999999,
                ltg: last.ltg
            });
            // console.log(flowTick);
        }

        var full = [];      // 格式化之后的数组
        var fullSource = [];    // 格式化之后的数组,不添加其他扩展值
        var maxK = [yc];
        var minK = [yc];
        var trading = [yc];        // 成交量中的最大最小值
        var times = {};     // 时间轴值
        for (var i = 0; i < data.length; i++) {
            // 数据规则，[日期，开盘，收盘，最高，最低，成交量，成交额，振幅]
            var ar = data[i].split(",");
            var previous = i > 0 ? (i - 1) : 0;
            var par = data[previous].split(",");

            var changeMoney = (ar[2] / 1 - par[2] / 1).toFixed(decimal);       // 涨跌额
            var changeRange = (changeMoney / par[2] * 100).toFixed(decimal);       // 涨跌幅

            // 格式化之后规则，[日期，开盘，收盘，最高，最低（5），成交量，成交额，振幅，涨跌额（9），涨跌幅, 昨收]
            var newDay = [
                ar[0],
                ar[1],
                ar[2],
                ar[3],
                ar[4],
                ar[5],
                ar[6],
                ar[7],
                // ar[8],
                (changeMoney / 1).toFixed(decimal),
                changeRange,
                par[2]
            ];

            // 判断是否需要计算换手率
            if (flowTick.length > 0) {
                var time = new Date(ar[0].replace(/-/g, "/")).getTime();
                for (var index = 0; index < flowTick.length; index++) {
                    var tick = flowTick[index];
                    if (time >= tick.start && time < tick.end) {
                        var hsl = ar[5] / tick.ltg * 100;
                        if (jys1.indexOf("," + info.jys + ",") > -1) {
                            hsl *= 100;
                        }
                        hsl = hsl.toFixed(2) / 1;
                        newDay.push(hsl);
                        ar.push(hsl);
                    }
                }
            }


            fullSource.push(ar);
            full.push(newDay);
            maxK.push(ar[3]);
            minK.push(ar[4]);
            trading.push(ar[5]);
            if (!times[ar[0]]) {
                times[ar[0]] = 1;
            }
        }

        // console.log("---------------------------------");
        // console.log(full);

        var newInfo = {
            kMax: arrayExt.findMaxMin(maxK).max,      // 最大值
            kMin: arrayExt.findMaxMin(minK).min,      // 最小值
            tradingMax: arrayExt.findMaxMin(trading).max,
            tradingMin: arrayExt.findMaxMin(trading).min,
            decimal: decimal,
            code: fulldata.code,
            name: fulldata.name,
            yc: yc,
            mk: info.mk,        // 市场
            sp: info.sp         // 发行价
        }

        if (yc == 0) {
            newInfo.kMax = 1;
        }

        this.data = this.data ? this.data : {};

        this.data.k = full;
        this.data.ks = fullSource;

        // 延迟计算所有指标的数据
        var indexs = this.data.indexs || {};
        setTimeout(function () {
            // console.time("计算指标耗时:")
            // indexs.CMA = getConvert("CMA", data);                   // 均线指标
            indexs.EXPMA = getConvert("EXPMA", data);                   // 
            indexs.SAR = getConvert("SAR", data);
            indexs.BOLL = getConvert("BOLL", data);
            indexs.BBI = getConvert("BBI", data);

            // indexs.RSI = getConvert("RSI", data);
            indexs.KDJ = getConvert("KDJ", data);
            indexs.MACD = getConvert("MACD", data);
            indexs.WR = getConvert("WR", data);
            indexs.DMI = getConvert("DMI", data);
            indexs.BIAS = getConvert("BIAS", data);
            indexs.OBV = getConvert("OBV", data);
            indexs.CCI = getConvert("CCI", data);
            indexs.ROC = getConvert("ROC", data);
            // console.timeEnd("计算指标耗时:")
        }, 10);


        // 计算当前需要绘制的指标的最值
        var stauts = this.stauts;
        // console.time("计算指标2耗时:")
        indexs[stauts.indexv] = getConvert(stauts.indexv, data);
        indexs[stauts.indexh] = getConvert(stauts.indexh, data);
        indexs.VAVERAGE = getConvert("VAVERAGE", data);      // 成交量均线
        // console.timeEnd("计算指标2耗时:")
        this.data.info = newInfo;
        this.data.indexs = indexs;

        var scale = this.options.scale;
        if (scale.start === undefined && scale.end === undefined) {
            var start = data.length - this.options.scale.pillar;
            start = start < 0 ? 0 : start;
            var end = data.length - 1;

            this.options.scale.start = start;
            this.options.scale.end = end;
            this.options.scale.fullDataSize = data.length;
        } else {
            var ts = scale.start;
            var te = scale.end;
            var tl = scale.fullDataSize;
            var tnl = data.length;

            var ns = Math.round(ts / tl * tnl);
            var ne = Math.round(te / tl * tnl);

            if (ne > tnl) {
                ne = tnl;
            }
            if (ns > ne - scale.min) {
                ns = ne - scale.min;
            }
            if (ne < 0) {
                ne = 0;
            }

            scale.pillar = ne - ns + 1;
            scale.start = ns < 0 ? 0 : ns;
            scale.end = ne;
            scale.fullDataSize = tnl;
        }

    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/dataFormat.js
// module id = 198
// module chunks = 0
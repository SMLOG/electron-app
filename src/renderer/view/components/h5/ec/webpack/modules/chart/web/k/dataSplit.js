var arrayExt = require("chart/common/arrayExtension");
// var getConvert = require("tools/getConvert");
var splitYAxis = require("chart/common/splitYAxis");       // 计算刻度
var getSuitableSplit = require("chart/common/getSuitableSplit");


module.exports = {

    // 截取一部分数据用于绘图
    slice: function () {
        var stauts = this.stauts;
        var scale = this.options.scale;
        var s = scale.start;
        var e = scale.end + 1;

        var datas = this.data;
        var yc = datas.info.yc;
        
        var kdata = datas.k;
        var sdata = kdata.slice(s, e);
        var decimal = datas.info.decimal;

        /**
         * 计算最大值，最小值，成交量最大值
         */
        var kmaxs = [];
        var kmins = [];
        var trading = [];        // 成交量中的最大最小值
        var time = {};
        for (var i = 0; i < sdata.length; i++) {
            // 数据规则，[日期，开盘，收盘，最高，最低，成交量，成交额，振幅,...]
            var ar = sdata[i];
            kmaxs.push(ar[1], ar[2], ar[3]);
            kmins.push(ar[1], ar[2], ar[4]);
            trading.push(ar[5]);
            if (!time[ar[0]]) {
                time[ar[0]] = 1;
            }
        }

        // 得到截取数据中的所有的日期列表
        var times = [];
        for (var key in time) {
            times.push(key);
        }

        // 计算主要的信息
        var info = {};
        var kMax = arrayExt.findMaxMin(kmaxs).max;      // k数据最大值
        var kMin = arrayExt.findMaxMin(kmins).min;      // k数据最小值
        var tradingMax = arrayExt.findMaxMin(trading).max;      //成交量最大值
        var tradingMin = arrayExt.findMaxMin(trading).min;      // 成交量最小值
        
        // 成交量均线
        var VAVERAGE = datas.indexs.VAVERAGE.slice(s, e);
        var vamax = 0;
        var vamin = -Infinity;
        for (var i = 0; i < VAVERAGE.length; i++) {
            var item = VAVERAGE[i].slice(1).filter(function(val){
                return val > 0;
            });
            var temp = arrayExt.findMaxMin(item);
            vamax = vamax < temp.max ? temp.max : vamax;
            if (temp.min != 0) {
                vamin = vamin > temp.min ? temp.min : vamin;
            }
        }
        

        // 截取指标数据
        var indexs = {};
        var ind = datas.indexs;
        for (var key in ind) {
            indexs[key] = ind[key].slice(s, e);
        }

        // 计算指标V的最值（stauts.indexv）
        var indexvmm = indexs[stauts.indexv];
        var vmax = -Infinity;
        var vmin = Infinity;
        for (var i = 0; i < indexvmm.length; i++) {
            var arr = indexvmm[i].slice(1).filter(function(val){
                return val > 0;
            });
            var temp = arrayExt.findMaxMin(arr);
            vmax = vmax < temp.max ? temp.max : vmax;
            if (temp.min != 0) {
                vmin = vmin > temp.min ? temp.min : vmin;
            }
        }


        // 计算指标H的最值（stauts.indexh）
        var indexhmm = indexs[stauts.indexh];
        var hmax = -Infinity;
        var hmin = Infinity;
        for (var i = 0; i < indexhmm.length; i++) {
            var arr = indexhmm[i].slice(1).filter(function(val){
                return val != 0;
            });
            var temp = arrayExt.findMaxMin(arr);
            hmax = hmax < temp.max ? temp.max : hmax;
            if (temp.min != 0) {
                hmin = hmin > temp.min ? temp.min : hmin;
            }
        }

        var info = {};
        info.kMax = kMax;                        // k线中的最值
        info.kMin = kMin;
        info[stauts.indexv + "Max"] = vmax;     // V指标中的最值   
        info[stauts.indexv + "Min"] = vmin;
        info[stauts.indexh + "Max"] = hmax;     // H指标中的最值   
        info[stauts.indexh + "Min"] = hmin;
        info.KaxisMax = arrayExt.findMaxMin([kMax, vmax]).max;      // k线轴中的最值  （成交量和均线）
        info.KaxisMin = arrayExt.findMaxMin([kMin, vmin]).min;
        info.tradingMax = tradingMax;
        info.tradingMin = tradingMin;
        info.tradingAvgMax = vamax;        // 成交量均线中的最值
        info.tradingAvgMin = vamin;
        info.tradingAxisMax = arrayExt.findMaxMin([tradingMax, vamax]).max * 1.1;     // 成交量轴的最值
        info.tradingAxisMin = arrayExt.findMaxMin([tradingMax, vamax]).min;

        for (var key in info) {
            if (Math.abs(info[key]) == Infinity) {
                info[key] = 0;
            }
        }
        
        
        // 新的网格规则
        var newDiff = ((info.KaxisMax - info.KaxisMin) * 0.05).toFixed(decimal) / 1;
        if (newDiff <= 0) {
            newDiff = 0.01;
        }

        if (info.KaxisMax == -999999999) {
            info.KaxisMax = 1;
        }
        if (info.KaxisMin == 999999999) {
            info.KaxisMin = -1;
        }
        
        info.newKAxisMax = info.KaxisMax + newDiff;
        info.newKAxisMin = info.KaxisMin - newDiff;

        scale.data = sdata;
        scale.info = info;
        scale.time = times;
        scale.indexs = indexs;


        // 选择一个合适的分段
        var split = getSuitableSplit.call(this);
        // y轴的两个最值点
        info.kAxisMax = split[0];                   
        info.kAxisMin = split[split.length - 1];
        
        info.splity = split;        // 最佳的分段规则
        this.options.drawRegion.k.y = split.length;     // 保存分段数量，后面重新绘制网格会用到


        // 当前显示的一期的数据
        var thisData = {};      
        thisData.data = sdata[sdata.length - 1];
        thisData.indexs = {};
        thisData.indexs.VAVERAGE = VAVERAGE[VAVERAGE.length - 1];
        thisData.indexs[stauts.indexv] = indexvmm[indexvmm.length - 1] || [];
        thisData.indexs[stauts.indexh] = indexhmm[indexhmm.length - 1] || [];

        this.options.thisData = thisData;
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k/dataSplit.js
// module id = 22
// module chunks = 0
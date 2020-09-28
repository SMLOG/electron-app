var merge = require("lodash").merge;
var cyq = require("../../../common/cyq");

// 岁数据初步格式化
module.exports = function () {

    var sdata = this.sdata;
    // this.sdata.k = sdata;

    var stock = this.stock;
    var digits = sdata.kinfo.digit;
    // stock.name = sdata.kinfo.name;

    var kall = [].concat(sdata.kdata);
    var ltg = sdata.ltg;     // 流通股

    var ltgarr = [];
    for (var k in ltg) {
        ltgarr.push({
            "time": k,
            "ltg": ltg[k]
        })
    }
    ltgarr.push({
        time: 30000101,
        ltg: Math.pow(10, 24)
    });



    var fkdata = [];        // 格式化之后的数据
    var max, min;           // k线中的最值
    // 格式化k数据成数组
    for (var i = 0, len = kall.length; i < len; i++) {
        var item = kall[i];
        item.push("-");     // 占位

        if (item) {
            var zs;     // 昨收
            if (i == 0) {
                // 首天的昨收用开盘价， 其实应该用发行价的，暂时还没有发行价
                zs = kall[0][1];
            } else {
                zs = kall[i - 1][2];
            }

            // var item = kall[i];
            var t = item[0];        // time 时间
            var o = item[1];        // open 开盘价
            var c = item[2];        // close 收盘价 (有可能是结算价， 还在商榷)
            var h = item[3];        // high 最高价
            var l = item[4];        // low 最低价
            var v = item[5];        // volume  成交量(股)
            var a = item[6];        // amount  成交额

            var zde = c - zs;        // 涨跌额
            var zdf = zde / zs * 100;       // 涨跌幅
            var zf = (h - l) / zs * 100;      // 振幅

            max = max > h ? max : h;
            min = min < l ? min : l;

            var times = (t + "").split("");
            times.splice(6, 0, "-");
            times.splice(4, 0, "-");



            /**
             * 0：日期
             * 1：开盘  2：最高  3：最低  4：收盘 
             * 5：成交量  6：成交额  
             * 7：涨跌额  8：涨跌幅  9:振幅
             */
            // var newDay = [t, o, h, l, c, v, a, zde, zdf, zf];
            var newDay = {
                time: t,
                times: times.join(""),
                open: o,
                close: c,
                high: h,
                low: l,
                volume: v,
                amount: a,
                zde: zde,
                zdf: zdf,
                zf: zf,
                zs: zs
            }


            // 流通股 计算 换手率

            if (ltgarr.length > 1) {
                for (var ii = 0, len2 = ltgarr.length - 1; ii < len2; ii++) {
                    var a = ltgarr[ii];
                    var b = ltgarr[ii + 1];
                    if (t >= a.time / 1 && t < b.time / 1) {
                        var hsl = v / a.ltg * 100;
                        item.push(hsl);
                        newDay.hsl = hsl;
                        break;
                    }
                }
            }

            // if (ltg) {
            //     for (var key in ltg) {
            //         if (key / 1 >= t) {
            //             var hsl = v / ltg[key] * 100;
            //             item.push(hsl);
            //             newDay.hsl = hsl;
            //             break;
            //         }
            //     }
            // }

            fkdata.push(newDay);
        }
    }

    this.fdata.fk = {
        fkdata: fkdata,
        max: max,
        min: min
    };

    // this.fdata.digits = digits;

    var scale = this.options.scale;
    scale.end = fkdata.length;
    scale.start = scale.end - scale.pillar;


    var cyqpar = this.options.cyq;
    if (cyqpar && cyqpar.width > 0) {
        var accuracyFactor = cyqpar.accuracyFactor || 150;
        var range = cyqpar.range || 120;
        var cyqCalc = new cyq(sdata.kdata, accuracyFactor, range);
        this.cyqCalc = cyqCalc;
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/format/fk.js
// module id = 77
// module chunks = 0
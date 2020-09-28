/**
 * 计算当前截取数据的最值
 */


module.exports = function () {


    var tdata = this.tdata;
    var status = this.status;
    var tkdata = tdata.tk.tkdata;

    var len = tkdata.length;

    var tkMax, tkMin;       // 截断的k线的最值
    var volumeMax;       // 成交量
    for (var i = 0; i < len; i++) {
        var h = tkdata[i].high;
        var l = tkdata[i].low;
        var v = tkdata[i].volume

        tkMax = tkMax > h ? tkMax : h;
        tkMin = tkMin < l ? tkMin : l;
        volumeMax = volumeMax > v ? volumeMax : v;
    }
    tdata.tk.tkMax = tkMax;
    tdata.tk.tkMin = tkMin;
    tdata.tk.volumeMax = volumeMax;

    var quota = tdata.quota;
    for (var key in quota) {

        if (key.indexOf("Max") == -1 && key.indexOf("Min") == -1) {

            var item = quota[key];
            var ilen = item.length;
            var maxName = key + "Max";
            var minName = key + "Min";
            var max = undefined, min = undefined;
            for (var i = 0; i < ilen; i++) {
                var line = item[i];
                for (var j = 1; j < line.length; j++) {
                    if (line[j] != "-") {
                        max = max > line[j] ? max : line[j];
                        min = min < line[j] ? min : line[j];
                    }
                }
            }
            quota[maxName] = max;
            quota[minName] = min;
        }
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/slice/mm.js
// module id = 183
// module chunks = 0
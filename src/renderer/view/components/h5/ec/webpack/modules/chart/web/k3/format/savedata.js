module.exports = function (data) {

    if (!data.error) {

        var total = data.total;
        var items = data.items;
        var ltg = data.ltg || {};     // 流通股

        var sdata = this.sdata;

        var kinfo = {
            digit: data.digit,
            name: data.name,
            total: data.total,
        }

        var kdata = sdata.kdata || [];

        for (var i = 0; i < items.length; i++) {
            if (i == 0) {
                // 有可能会重合一个
                var frist = (kdata[0] || [])[0];
                var item0 = items[0][0];
                if (frist != item0 && item0) {
                    kdata.unshift(items[i]);
                }
            } else {
                kdata.unshift(items[i]);
            }
        }

        sdata.kinfo = kinfo;
        sdata.kdata = kdata;
        sdata.ltg = ltg;

        

    }

};



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/format/savedata.js
// module id = 47
// module chunks = 0
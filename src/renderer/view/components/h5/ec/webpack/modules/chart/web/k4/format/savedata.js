module.exports = function (fdata, isclear) {
    // console.info(111)
    // console.info(fdata)
    if (fdata.rc == 0 && fdata.data) {

        var data = fdata.data;

        var items = data.klines;
        var ltg = data.ltg || {};     // 流通股

        var sdata = this.sdata;
        var stock = this.stock;

        // var kdata = sdata.kdata || [];
        var kdata = [];


        for (var i = 0; i < items.length; i++) {
            var item = items[i].split(",")
            kdata.push(item);
        }


            var bb = {}
            kdata.forEach(function (v) {
                var key = v[0]
                bb[key] = v
            })

            kdata = Object.keys(bb).map(function (v) {
                return bb[v]
            })


        var kinfo = {
            digit: data.decimal,
            name: data.name,
            // total: data.dktotal || data.klines.length,
            code: data.code,
            market: data.market,
        }

        if (stock.klt == "101") {
            kinfo.total = data.dktotal;
        } else {
            kinfo.total = kdata.length;
        }


        sdata.kinfo = kinfo;
        sdata.kdata = kdata;
        sdata.ltg = ltg;

    }

};



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/format/savedata.js
// module id = 93
// module chunks = 0
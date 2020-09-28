var tools = require("../../../common/tools");

module.exports = function () {

    var ops = this.options;
    var data = this.data;

    var cc = this.layer.layerGridC;

    var k = data.k.data;
    var l = data.line;

    var pricedigit = data.k.info.pricedigit.length - 2;     // 保留的小数


    // 格式化k线数据
    var kmax, kmin;
    var ks = {};
    for (var i = 0, len = k.length; i < len; i++) {
        var item = k[i].split(",");
        var temp = {
            o: item[1],
            c: item[2],
            h: item[3],
            l: item[4],
        }

        kmax = kmax > item[3] / 1 ? kmax : item[3] / 1;
        kmin = kmin < item[4] / 1 ? kmin : item[4] / 1;

        ks[item[0]] = temp;
    }

    console.log(kmax, kmin);


    // 格式化折线数据
    var lmax, lmin;
    for (var i = 0, len = l.length; i < len; i++) {
        var lineItem = l[i];
        var lined = lineItem.data;
        for (var key in lined) {
            var ld = lined[key];
            lmax = lmax > ld / 1 ? lmax : ld / 1;
            lmin = lmin < ld / 1 ? lmin : ld / 1;
        }
    }
    if (lmin === undefined) {
        lmin = 0;
    }
    if (lmax === undefined) {
        lmax = 0;
    }

    console.log(lmax, lmin);


    function f2(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }


    function findtime(time, dur) {
        dur = dur || 1;
        
        for (var i = 0, len = 7; i < len; i++) {
            var t = new Date(time + dur * i * 24 * 60 * 60 * 1000);
            var y = t.getFullYear();
            var m = t.getMonth() + 1;
            var d = t.getDate();
            var ymd = y + "-" + f2(m) + "-" + f2(d);
            if (ks[ymd] != 0 && ks[ymd]) {
                return ymd;
            }
        }
        return null;
    }



    console.log(l);
    var fristk = k[0].split(",");
    var lastk = k[k.length - 1].split(",");

    var start = new Date(fristk[0]).getTime();
    var last = new Date(lastk[0]).getTime();

    var wi = 0;
    var syc;
    var newls = [];
    while (1) {
        var t = new Date(start);
        var y = t.getFullYear();
        var m = t.getMonth() + 1;
        var d = t.getDate();
        var ymd = y + "-" + f2(m) + "-" + f2(d);

        var dayk = ks[ymd];

        for (var i = 0, len = l.length; i < len; i++) {
            var litem = l[i];
            if (!newls[i]) {
                var temp = {
                    name: litem.name,
                    color: litem.color,
                    data: {}
                }
                if (litem.cb) {
                    temp.cb = litem.cb;
                }
                if (litem.showPoint || litem.showPoint === undefined) {
                    temp.showPoint = true;
                }
                newls.push(temp);
            }

            if (litem.data[ymd] != 0 && litem.data[ymd]) {
                if (dayk != 0 && dayk) {
                    newls[i].data[ymd] = litem.data[ymd];
                } else {
                    var newDay = findtime(start);
                    if (newDay == null) {
                        newDay = findtime(start, -1);
                    }
                    if (newDay == null) {
                        console.log(newDay);
                    }
                    if (newDay != null) {
                        newls[i].data[newDay] = litem.data[ymd];
                    }
                }
            }
        }

        start += 24 * 60 * 60 * 1000;
        if (start >= last) {
            break;
        }
        if (wi++ > 10000) {
            break;
        }
    }
    console.log("wi: " + wi);

    console.log(newls);






    var diffk = kmax - kmin;
    var diffl = lmax - lmin;
    diffk = diffk == 0 ? 1 : diffk;
    diffl = diffl == 0 ? 1 : diffl;

    var ykmax = kmax + diffk * 0.1;
    var ykmin = kmin - diffk * 0.1;
    var ylmax = lmax + diffl * 0.1;
    var ylmin = lmin - diffl * 0.1;


    var y1split = [];
    var y2split = [];
    var ktxtmax = 0;        // k文字最大长度
    var ltxtmax = 0;        // l文字最大长度
    var unity1 = (ykmax - ykmin) / (ops.split.y);
    var unity2 = (ylmax - ylmin) / (ops.split.y);
    for (var i = 0, len = ops.split.y + 1; i < len; i++) {
        var txt1 = (ykmax - i * unity1).toFixed(pricedigit);
        var txt2 = (ylmax - i * unity2).toFixed(pricedigit);
        var txt1w = cc.measureText(txt1).width;
        var txt2w = cc.measureText(txt2).width;
        ktxtmax = ktxtmax > txt1w ? ktxtmax : txt1w;
        ltxtmax = ltxtmax > txt2w ? ltxtmax : txt2w;
        y1split.push(txt2);
        y2split.push(txt1);
    }

    console.log(ktxtmax, ltxtmax);
    console.log("====================----------------------===");

    var padd = ops.padding;
    var sx = padd.left + Math.ceil(ltxtmax);
    var sy = padd.top;
    var ex = ops.width - padd.right - Math.ceil(ktxtmax);
    var ey = ops.height - padd.bottom;



    this.format = {
        k: ks,
        l: newls,
        size: k.length,
        kmax: lmax,
        kmin: kmin,
        lmax: lmax,
        lmin: lmin,
        ykmax: ykmax,
        ykmin: ykmin,
        ylmax: ylmax,
        ylmin: ylmin,
        y1split: y1split,
        y2split: y2split,
        sx: sx,
        sy: sy,
        ex: ex,
        ey: ey,
        spx: ops.split.x,
        spy: ops.split.y,

    }


};




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline/dataformat/index.js
// module id = 476
// module chunks = 0
module.exports = function (times, rule, type) {
    // console.log(times.length);

    var arr = [];
    var decimal = 99;

    if (times.length >= rule.ymd && times.length < rule.ym) {
        decimal = 7;
    } else if (times.length >= rule.ym) {
        decimal = 4;
    }

    if (type == 2) {
        if (times.length >= rule.ymd && times.length < rule.ym) {
            decimal = 10;
        } else if (times.length >= rule.ym) {
            decimal = 10;
        }
    }


    var temp = {};
    for (var i = 0; i < times.length; i++) {
        var str = times[i].substr(0, decimal);
        // console.log(str);
        if (!temp[str]) {
            temp[str] = i;
        }
    }

    var temparr = [];
    for (var key in temp) {
        temparr.push({
            index: temp[key],
            time: key
        })
    }
    // console.log(temparr);

    return temparr;


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k5/filterTimeLine.js
// module id = 239
// module chunks = 0
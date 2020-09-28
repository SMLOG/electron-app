module.exports = function () {
    var op = this.option;

    var dataline = op.data.line;

    var formatArr = [];
    for (var i = 0; i < dataline.length; i++) {
        var now = dataline[i];


        var change = now[2];

        if (now[2] === undefined) {
            var before = dataline[i-1];
            // // 第一笔的数据的昨收是自己
            if (before === undefined) {
                before = now;
            }

            var diff = now[1] - before[1];      // 涨跌额
            var change = (diff / before[1] * 100).toFixed(3);      // 涨跌额
        }


        var newDay = [now[0], now[1],change];

        formatArr.push(newDay);
    }

    this.options.data = formatArr;


}





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency/dataFormat.js
// module id = 355
// module chunks = 0
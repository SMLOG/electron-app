var tools = require("../../common/tools");

module.exports = function (max, splitNum) {

    var arr = [];
    for (var i = 0, len = splitNum; i <= len; i++) {
        var n = max / splitNum * i;
        arr.push(tools.formatNumUnit(n));
    }

    return arr;

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barHorPile/splitAxis.js
// module id = 469
// module chunks = 0
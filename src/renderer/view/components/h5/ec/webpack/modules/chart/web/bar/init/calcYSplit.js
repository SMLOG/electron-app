var tools = require("chart/common/tools");

module.exports = function(){

    var ops = this.options;

    var vw = ops.validWidth;
    var vh = ops.validHeight;
    var yMax = ops.yMax;
    var fixed = ops.fixed;

    var splitY = Math.round(vh / 60);

    var unitn = yMax / splitY;      // 但闻间距

    var axixY = [];
    for (var i = 0; i < splitY + 1; i++) {
        var txt = (0 + unitn * i).toFixed(fixed);
        if (parseFloat(txt) == 0) {
            txt = "0";
        }
        axixY.push(txt);
    }


    var axixYf = [];
    for(var i = 0, len = axixY.length ; i < len ; i++){
        axixYf.push(tools.formatNumUnit(axixY[i], 2, 8));
    }
    

    ops.splitY = splitY;
    ops.axixY = axixY;
    ops.axixYf = axixYf;
    
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/init/calcYSplit.js
// module id = 369
// module chunks = 0
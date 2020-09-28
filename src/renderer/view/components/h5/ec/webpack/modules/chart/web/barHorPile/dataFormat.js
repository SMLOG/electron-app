var splitAxis = require("./splitAxis");

module.exports = function () {

    var cc = this.ctxs.layerGridC;
    var datas = this.datas;
    var ops = this.options;
    var padding = ops.padding;

    var data = datas.data;

    var dataMax = 0;
    
    for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        var sum = 0;
        for (var j = 0, len2 = item.datas.length; j < len2; j++) {
            sum += (item.datas[j] / 1);
        }
        dataMax = dataMax > sum ? dataMax : sum;
    }
    

    var sx = padding.left;
    var sy = padding.top;
    var ex = ops.width - padding.right;
    var ey = ops.height - padding.bottom;

    var w = ex - sx;
    
    var splitNum = Math.round(w / ops.splitWidth);

    var axisMax = dataMax * 1.1;
    var split = splitAxis(axisMax, splitNum);
    
    var txtMax = 0;
    for(var i = 0, len = split.length ; i < len ; i++){
        var txtw = cc.measureText(split[i]).width;
        txtMax = txtMax > txtw ? txtMax : txtw;
    }

    this.info = {
        dataMax: dataMax,
        axisMax: axisMax,
        txtMax: txtMax,
        splitNum: splitNum,
        split: split,
        sx: sx + txtMax,
        sy: sy,
        ex: ex,
        ey: ey
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barHorPile/dataFormat.js
// module id = 468
// module chunks = 0
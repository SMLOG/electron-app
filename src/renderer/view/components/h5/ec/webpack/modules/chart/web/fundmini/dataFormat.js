module.exports = function(){

    // Math.max.apply(Math, arr);
    var data = this.data;

    var datarr = data.yaxis.data;

    var min = Math.min.apply(Math, datarr);
    var max = Math.max.apply(Math, datarr);

    var axisMax = Math.abs(min) > max ? Math.abs(min) : max;        // y轴最大值
    if (axisMax != 0) {
        axisMax = Math.ceil(axisMax * 1.05);
    } else {
        axisMax = 3;
    }

    var axisSeq = [0];      // y周分割序列
    for (var i = 1, len = 2; i <= len; i++) {
        axisSeq.push(axisMax / len * i);
    }
    console.log(axisSeq);




    var ops = this.options;
    ops.axisMax = axisMax;
    ops.axisSeq = axisSeq;

};



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/dataFormat.js
// module id = 379
// module chunks = 0
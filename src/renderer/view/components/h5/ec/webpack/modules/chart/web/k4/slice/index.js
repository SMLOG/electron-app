/**
 * 截取一部分数据
 */

var slice = require("./slice");
var mm = require("./mm");
var kAxisMax = require("./kAxisMax");
var split = require("../../../common/splity");

module.exports = function () {

    slice.call(this);
    mm.call(this);
    kAxisMax.call(this);

    // 划分Y轴分段
    var tk = this.tdata.tk;
    var drawRegion = this.options.drawRegion;
    var h = drawRegion.k.h;
    var unit = 40;

    
    this.splity = split(tk.tkMax, tk.tkMin, h / unit);
    

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/slice/index.js
// module id = 96
// module chunks = 0
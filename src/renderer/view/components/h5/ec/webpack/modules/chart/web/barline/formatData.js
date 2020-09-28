var tools = require("../../common/tools");

var splitYaxis = require("./splitYaxis");

module.exports = function (data) {

    var cc = this.ctxs.layerGridC;
    var data = this.data;
    var ops = this.options;

    var axis = {
        left: 0,
        right: 0
    };

    var padd = ops.padding;


    // 划分轴分段
    var sy = padd.top;
    var ey = ops.height - padd.bottom;
    var splitNum = Math.round((ey - sy) / ops.splitHeight);
    axis.splitNum = splitNum;

    var y1data = data.yaxis1;
    var y2data = data.yaxis2;

    if (y1data) {
        var res = find(y1data);
        axis.maxy1num = res[0];
        axis.miny1num = res[1];
        axis.splitY1 = splitYaxis(res[0], res[1], splitNum);
        axis.left = Math.ceil(txtWidth(axis.splitY1));
        axis.axisDiffY1 = (axis.splitY1[0] - axis.splitY1[axis.splitY1.length - 1]);
    }

    if (y2data) {
        var res = find(y2data);
        axis.maxy2num = res[0];
        axis.miny2num = res[1];
        axis.splitY2 = splitYaxis(res[0], res[1], splitNum);
        axis.right = Math.ceil(txtWidth(axis.splitY2));
        axis.axisDiffY2 = (axis.splitY2[0] - axis.splitY2[axis.splitY2.length - 1]);
    }

    var sx = padd.left + axis.left;
    var ex = ops.width - padd.right - axis.right;
    
    axis.sx = sx;
    axis.sy = sy;
    axis.ex = ex;
    axis.ey = ey;

    // 查找最值和计算文字宽度
    function find(ydata) {
        var maxleft, maxy1num, miny1num;
        for (var i = 0; i < ydata.length; i++) {
            var data = ydata[i].data;
            for (var j = 0; j < data.length; j++) {
                var num = data[j]
                if (num !== "" && num !== "-" && num !== undefined && num !== null) {
                    maxy1num = maxy1num > data[j] / 1 ? maxy1num : data[j] / 1;
                    miny1num = miny1num < data[j] / 1 ? miny1num : data[j] / 1;
                }
            }
        }
        return [maxy1num, miny1num]
    }


    function txtWidth(splitArr) {
        var max = 0;
        for (var i = 0, len = splitArr.length; i < len; i++) {
            var txt = tools.formatNumUnit(splitArr[i]);
            var width = cc.measureText(txt).width;
            max = max > width ? max : width;
        }
        return max;
    }

    this.info = axis;

    console.log(axis)






};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/formatData.js
// module id = 457
// module chunks = 0
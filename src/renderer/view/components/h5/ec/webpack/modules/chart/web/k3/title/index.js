var tools = require("../../../common/tools");



/**
 * 绘制各类标题
 *
 * @param {int} index： 显示第几个， 如果没有， 则显示最后一个
 */
module.exports = function (index) {

    var ops = this.options;
    var tdata = this.tdata;
    var status = this.status;
    var stock = this.stock;

    var kinfo = this.sdata.kinfo;

    var sx = ops.padding.left;
    var titleKeys = ops.titleKeys;
    var color = ops.color;
    var colorsMA = ops.color.colorsMA;
    var colorsTrading = ops.color.colorsTrading;
    var colorsIndex = ops.color.colorsIndex;
    var drawRegion = ops.drawRegion;
    var font = ops.font;
    var txtgap = ops.txtgap;
    var show = ops.show;

    var cc = this.layer.layerDataC;

    var quotav = tdata.quota[status.v] || [];
    var VAVERAGE = tdata.quota.VAVERAGE;
    var quotah = tdata.quota[status.h];

    index = index === undefined ? (tdata.tk.tkdata.length - 1) : index;

    var last1 = quotav[index];
    var last2 = VAVERAGE[index];
    var last3 = quotah[index];

    var y1 = drawRegion.k.top + drawRegion.k.mt + drawRegion.k.pt - font.size;
    var y2 = drawRegion.trading.top + drawRegion.trading.mt + drawRegion.trading.pt - font.size;
    var y3 = drawRegion.index.top + drawRegion.index.mt + drawRegion.index.pt - font.size;


    var yc1 = y1 - font.size;
    cc.clearRect(0, yc1, ops.width, yc1 + font.size * 2);

    var left = sx + txtgap.left;
    cc.strokeStyle = "rgba(0,0,0,0)";
    cc.fillStyle = color.text;

    // 绘制股票名称和代码
    if (show.name) {
        var namecode = kinfo.name + "";
        var txtw = cc.measureText(namecode).width;
        cc.fillText(namecode, left, y1);
        left += txtw;
    }
    if (show.code) {
        left += 4;
        var namecode = "[" + stock.code + "]";
        var txtw = cc.measureText(namecode).width;
        cc.fillText(namecode, left, y1);
        left += txtw;
    }

    
    //  垂直指标
    if (last1) {
        for (var i = 0; i < titleKeys[status.v].length; i++) {
            left += txtgap.gap;
            var name = titleKeys[status.v][i];
            var val = (last1[i + 1] / 1).toFixed(3);
            if (val + "" == "NaN") {
                val = "-";
            }
            var txt = name + ":" + val;
            var txtw = cc.measureText(txt).width;

            cc.fillStyle = colorsMA[i];
            cc.fillText(txt, left, y1)

            left += txtw;
        }
    }

    var yc2 = y2 - font.size;
    cc.clearRect(0, yc2, ops.width, yc2 + font.size * 2);
    if (show.trading) {
        // 成交量的指标
        left = sx + txtgap.left;
        for (var i = 0; i < titleKeys["VAVERAGE"].length; i++) {
            var name = titleKeys["VAVERAGE"][i];
            var val = tools.formatNumUnit(last2[i + 1] / 1);
            if (val + "" == "NaN") {
                val = "-";
            }
            var txt = name + ":" + val;
            var txtw = cc.measureText(txt).width;

            cc.fillStyle = colorsTrading[i];
            cc.fillText(txt, left, y2)

            left += txtw;
            left += txtgap.gap;
        }
    }

    // 横向的指标
    if (show.index) {
        var yc3 = y3 - font.size;
        cc.clearRect(0, yc3, ops.width, yc3 + font.size * 2);
        var left = sx + txtgap.left;
        for (var i = 0; i < titleKeys[status.h].length; i++) {
            var name = titleKeys[status.h][i];
            var val = (last3[i + 1] / 1).toFixed(3);
            if (val + "" == "NaN") {
                val = "-";
            }

            var txt = name + ":" + val;
            var txtw = cc.measureText(txt).width;

            cc.fillStyle = colorsIndex[i];
            cc.fillText(txt, left, y3)

            left += txtw;
            left += txtgap.gap;
        }
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/title/index.js
// module id = 50
// module chunks = 0
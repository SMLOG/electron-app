var drawLine = require("./drawLine");


module.exports = {


    /**
     * 绘制一个虚线网格
     * @param {any} cc  : 画笔 
     * @param {any} startX : 开始坐标
     * @param {any} startY 
     * @param {any} width   ： 宽高
     * @param {any} height 
     * @param {any} splitx ： 网格的数量
     * @param {any} splity 
     * @param {any} solid ：边框颜色
     * @param {any} dashed  ： 虚线颜色
     */
    grid: function (cc, startX, startY, width, height, splitx, splity, solid, dashed) {

        var unitw = width / splitx;
        var unith = height / splity;

        cc.strokeStyle = dashed;
        for (var i = 1; i < splitx; i++) {
            var x = startX + i * unitw;
            drawLine.dashed(cc, x, startY, x, startY + height);
        }
        for (var i = 1; i < splity; i++) {
            var y = startY + i * unith;
            drawLine.dashed(cc, startX, y, startX + width, y);
        }

        cc.fillStyle = "rgba(0,0,0,0)";
        cc.strokeStyle = solid;
        cc.EMLine(startX, startY, startX + width, startY + height);

    },

    // mini线框的方法 ，比较特殊
    kmini: function (cc, startX, startY, width, height, splitx, splity, solid, dashed, color) {

        var unitw = width / splitx;
        var unith = height / splity;

        cc.strokeStyle = color;
        for (var i = 1; i < splitx; i++) {
            var x = startX + i * unitw;
            drawLine.dashed(cc, x, startY, x, startY + height, solid, dashed);
        }
        for (var i = 0; i <= splity; i++) {
            var y = startY + i * unith;
            drawLine.dashed(cc, startX, y, startX + width, y, solid, dashed);
        }

    },

    // 分时的特殊网格
    // * @param {any} solidLen ：边框颜色
    // * @param {any} dashedLen ：边框颜色
    timegrid: function (cc, startX, startY, width, height, splitx, splity, solid, dashed, solidLen, dashedLen, cap) {
        var unitw = width / (splitx || 1);
        var unith = height / splity;

        height = height / cap;
        var cap2 = (1 - cap) / 2;
        var startY2 = startY  - height * cap2

        cc.strokeStyle = dashed;
        for (var i = 1; i < splitx; i++) {
            var x = startX + (i * unitw);
            drawLine.dashed(cc, x, startY2, x, startY2 + height, solidLen, dashedLen);
        }
        for (var i = 0; i <= splity; i++) {
            var y = startY + (i * unith);
            drawLine.dashed(cc, startX, y, startX + width, y, solidLen, dashedLen);
        }

        cc.fillStyle = "rgba(0,0,0,0)";
        cc.strokeStyle = solid;
        // cc.EMLine(startX, startY, startX + width, startY + height);
    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/drawGrid.js
// module id = 20
// module chunks = 0
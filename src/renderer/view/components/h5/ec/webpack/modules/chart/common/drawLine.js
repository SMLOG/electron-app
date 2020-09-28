/**
 * 各种画线的方法
 */

var coordinate = require("./coordinate");

module.exports = {


    /**
     * 画虚线的方法，
     * 
     * @param {any} cc ： 绘图上下文
     * @param {any} x1 ： 起点坐标
     * @param {any} y1 
     * @param {any} x2 ： 终点坐标
     * @param {any} y2 
     * @param {any} slen ： 实线的长度（可选）
     * @param {any} dlen ： 虚线的长度（可选）
     */
    dashed: function (cc, x1, y1, x2, y2, slen, dlen) {
        slen = slen === undefined ? 4 : slen;
        dlen = dlen === undefined ? 5 : dlen;

        // 计算宽高
        var x = Math.abs(x1 - x2);  
        var y = Math.abs(y1 - y2);

        // 计算两点间的距离
        var s = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

        // 防止虚线的末端出现空白
        var yushu = s % (slen + dlen);
        if (yushu == 0) {
            yushu = slen / 2;
        }
        if (yushu > slen) {
            var temp = yushu % slen;
            yushu = temp / 2;
        }

        var drawsum = 0;    // 画线的长度

        // 两个角度
        var sin = y / s;
        var cos = x / s;

        cc.beginPath();
        var isfrist = true;
        while (drawsum < s) {
            var tx1 = coordinate.format(x1 + drawsum * cos);
            var ty1 = coordinate.format(y1 + drawsum * sin);

            if (cc.lineWidth % 2 == 0) {
                tx1 = Math.round(x1 + drawsum * cos);
                ty1 = Math.round(y1 + drawsum * sin);
            }

            cc.moveTo(tx1, ty1);

            // 防止虚线末端留白， 第一个虚线需要做处理
            if (isfrist) {
                drawsum += yushu;
                isfrist = false;
            } else {
                drawsum += slen;
            }

            // 防止尾部溢出
            if (drawsum > s) {
                drawsum = s;
            }
            var tx2 = coordinate.format(x1 + drawsum * cos);
            var ty2 = coordinate.format(y1 + drawsum * sin);
            if (cc.lineWidth % 2 == 0) {
                tx2 = Math.round(x1 + drawsum * cos);
                ty2 = Math.round(y1 + drawsum * sin);
            }

            cc.lineTo(tx2, ty2);
            drawsum += dlen;
            cc.stroke();
        }
        cc.closePath();
       
    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/drawLine.js
// module id = 0
// module chunks = 0
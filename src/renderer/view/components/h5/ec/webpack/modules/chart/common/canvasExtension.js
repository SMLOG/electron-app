var coordinate = require("./coordinate");

module.exports = function (cc) {


    // 
    cc.EMRect = function (x1, y1, x2, y2) {
        x1 = Math.round(x1);
        x2 = Math.round(x2);
        y1 = Math.round(y1);
        y2 = Math.round(y2);

        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x1, y2);
        this.lineTo(x2, y2);
        this.lineTo(x2, y1);
        this.closePath();

        this.stroke();
        this.fill();
    },

        // 
        cc.EMFill = function (x1, y1, x2, y2) {
            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
            this.fill();
        },

        // 
        cc.EMFill2 = function (x1, y1, x2, y2) {
            x1 = coordinate.format(x1);
            x2 = coordinate.format(x2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
            this.fill();
        },



        /**
         * 
         * @param {*} x1 
         * @param {*} y1 
         * @param {*} x2 
         * @param {*} y2 
         * @param {*} x : 中心线的位置
         */
        cc.EMFillRect = function (x1, y1, x2, y2, x) {
            x = coordinate.format(x);
            x1 = coordinate.format(x1);
            x2 = coordinate.format(x2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            if ((x2 - x1) % 2 == 1) {
                x2 = x2 - 1;
            }

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
            this.fill();
        },

        cc.EMFillRect2 = function (x, w, y1, y2) {
            x = coordinate.format(x);

            var x1 = coordinate.format(x - w);
            var x2 = coordinate.format(x + 2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            if ((x2 - x1) % 2 == 1) {
                x2 = x2 - 1;
            }

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
            this.fill();
        },
        
        cc.EMFillRect3= function (x, w, y1, y2) {
            x = coordinate.format(x);

            var x1 = coordinate.format(x - w/2);
            var x2 = coordinate.format(x + w/2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            if ((x2 - x1) % 2 == 1) {
                x2 = x2 - 1;
            }

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
            this.fill();
        },

        /**
         * 绘制柱子
         * @param {*} ho : 开盘
         * @param {*} hc ：收盘
         * @param {*} x ： 中心位置
         * @param {*} w ： 单侧宽度
         * @param {*} pw ： 柱子比例
         */
        cc.EMFillPillar = function (ho, hc, x, w, pw) {
            ho = coordinate.format(ho);
            hc = coordinate.format(hc);

            if (w > 2) {
                w = Math.floor(w * pw);
            } else {
                w = Math.floor(w) - 1;
                if (w < 1) {
                    w = 0;
                }
            }

            this.beginPath();
            this.moveTo(coordinate.format(x - w), ho);
            this.lineTo(coordinate.format(x + w), ho);
            this.lineTo(coordinate.format(x + w), hc);
            this.lineTo(coordinate.format(x - w), hc);
            this.closePath();

            this.stroke();
            this.fill();
        },



        /**
         * 绘制一条线，会对坐标进行0.5的格式化
         */
        cc.EMLine = function (x1, y1, x2, y2) {
            x1 = coordinate.format(x1);
            x2 = coordinate.format(x2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            if (this.lineWidth % 2 == 0) {
                x1 = Math.round(x1);
                x2 = Math.round(x2);
                y1 = Math.round(y1);
                y2 = Math.round(y2);
            }

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
        },


        cc.EMLine2 = function (x1, y1, x2, y2) {
            x1 = coordinate.format(x1);
            x2 = coordinate.format(x2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            if (this.lineWidth % 2 == 0) {
                x1 = Math.round(x1);
                x2 = Math.round(x2);
                y1 = Math.round(y1);
                y2 = Math.round(y2);
            }

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x2, y2);
            this.closePath();

            this.stroke();
        },


        cc.EMStroke = function (x1, y1, x2, y2) {
            x1 = coordinate.format(x1);
            x2 = coordinate.format(x2);
            y1 = coordinate.format(y1);
            y2 = coordinate.format(y2);

            if (this.lineWidth % 2 == 0) {
                x1 = Math.round(x1);
                x2 = Math.round(x2);
                y1 = Math.round(y1);
                y2 = Math.round(y2);
            }

            this.beginPath();
            this.moveTo(x1, y1);
            this.lineTo(x1, y2);
            this.lineTo(x2, y2);
            this.lineTo(x2, y1);
            this.closePath();

            this.stroke();
        },



        /**
         * 画虚线的方法，
         * 
         * @param {any} x1 ： 起点坐标
         * @param {any} y1 
         * @param {any} x2 ： 终点坐标
         * @param {any} y2 
         * @param {any} slen ： 实线的长度（可选）
         * @param {any} dlen ： 虚线的长度（可选）
         */
        cc.dashed = function (x1, y1, x2, y2, slen, dlen) {
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

            this.beginPath();
            var isfrist = true;
            while (drawsum < s) {
                var tx1 = coordinate.format(x1 + drawsum * cos);
                var ty1 = coordinate.format(y1 + drawsum * sin);

                if (this.lineWidth % 2 == 0) {
                    tx1 = Math.round(x1 + drawsum * cos);
                    ty1 = Math.round(y1 + drawsum * sin);
                }

                this.moveTo(tx1, ty1);

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
                if (this.lineWidth % 2 == 0) {
                    tx2 = Math.round(x1 + drawsum * cos);
                    ty2 = Math.round(y1 + drawsum * sin);
                }

                this.lineTo(tx2, ty2);
                drawsum += dlen;
                this.stroke();
            }
            this.closePath();

        }


}



//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/canvasExtension.js
// module id = 5
// module chunks = 0
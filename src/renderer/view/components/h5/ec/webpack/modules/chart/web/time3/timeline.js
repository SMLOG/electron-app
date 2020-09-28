var drawLine = require("../../common/drawLine");

/**
 * 绘制休盘线
 * @param {*} cc  ： 绘图上下文
 * @param {*} ticks  ： 开收盘时间时刻，
 * @param {*} total  ： 单个交易日的总笔数
 * @param {*} iscr  ： 是否是盘前
 * @param {*} area ：绘图区域参数
 * @param {*} restline ： 休盘线设置
 * @param {*} color ： 颜色
 * @param {*} font ： 字体
 */
module.exports = {

    ab: function (cc, ticks, total, iscr, area, restline, color, font, isDrawTxt) {
        total -= 1;

        isDrawTxt = isDrawTxt === undefined ? true : false;

        var width = area.draww;
        var x = area.startx;
        var y = area.starty + area.height + font.size;
        var ly1 = area.starty;
        var ly2 = area.starty + area.height;

        var endx = x;

        for (var i = 0; i < ticks.length; i++) {
            var o = ticks[i];
            var txt = o.time;
            var txtw = cc.measureText(txt).width;

            // 第一个时刻
            if (i == 0) {
                endx = endx + txtw;
                cc.fillStyle = color.text;
                if (isDrawTxt) {
                    cc.fillText(txt, x, y);
                }
            } else if (i == 1) {
                var cx = x + (o.index / total) * width;
                if (cx > endx) {
                    cc.fillStyle = color.text;
                    if (!iscr) {
                        cc.strokeStyle = restline.color;
                        drawLine.dashed(cc, cx, ly1, cx, ly2, restline.solid, restline.dashed);
                        cx = cx - (txtw / 2);
                    }
                    if (isDrawTxt) {
                        cc.fillText(txt, cx, y);
                    }
                }
            } else if (i == ticks.length - 1) {
                var last = ticks[i];
                cc.fillStyle = color.text;
                if (isDrawTxt) {
                    cc.fillText(last.time, x + width - txtw, y);
                }
            } else {
                var cx = x + (o.index / total) * width;
                var dx = cx - (txtw / 2);
                cc.fillStyle = color.text;
                if (isDrawTxt) {
                    cc.fillText(txt, dx, y);
                }
                endx = cx + (txtw / 2);
                cc.strokeStyle = restline.color;
                drawLine.dashed(cc, cx, ly1, cx, ly2, restline.solid, restline.dashed);
            }
        }
    },

    other: function (cc, ticks, total, iscr, area, restline, color, font, isDrawTxt) {
        total -= 1;
        isDrawTxt = isDrawTxt === undefined ? true : false;

        var width = area.draww;
        var x = area.startx;
        var y = area.starty + area.height + font.size;
        var ly1 = area.starty;
        var ly2 = area.starty + area.height;

        var leasWidth = cc.measureText(ticks[ticks.length - 1].time).width;

        var endx = x;

        for (var i = 0; i < ticks.length; i++) {
            var o = ticks[i];

            var txt = o.time;
            var txtw = cc.measureText(txt).width;

            // 第一个时刻
            if (i == 0) {
                endx = endx + txtw + restline.skye;
                cc.fillStyle = color.text;
                if (isDrawTxt) {
                    cc.fillText(txt, x, y);
                }
            } else if (i >= ticks.length - 2) {
                // 最后两个,如果间距不够， 优先最后一个
                var last = ticks[i + 1];
                var lastw = cc.measureText(last.time).width;

                if (width >= endx + txtw + lastw + restline.skye) {
                    // 两个都绘制
                    cc.fillStyle = color.text;
                    var cx = x + (o.index / total) * width;
                    if (isDrawTxt) {
                        cc.fillText(txt, cx - (txtw / 2), y);
                    }
                    drawLine.dashed(cc, cx, ly1, cx, ly2, restline.solid, restline.dashed);
                    if (isDrawTxt) {
                        cc.fillText(last.time, x + width - lastw, y);
                    }
                } else {
                    // 只绘制最后一个
                    cc.fillStyle = color.text;
                    if (isDrawTxt) {
                        cc.fillText(last.time, x + width - lastw, y);
                    }
                }

                i++;
            } else {
                // 时刻位置
                var cx = x + (o.index / total) * width;
                var dx = cx - (txtw / 2);
                if (dx > endx) {    // 没有和前一个时间重叠
                    /**
                     * 判断下一个是否是休盘线位置，
                     * 如果不是， 直接绘制
                     * 如果是 在判断这三个同时绘制是否会重叠，如果重叠，省略中间的
                     */
                    var on = ticks[i + 1];
                    if (on.time.indexOf("/") > -1) {
                        var onw = cc.measureText(on.time).width;
                        var tcx = x + (on.index / total) * width;
                        var tdx = tcx - (onw / 2);
                        var tempEndx = cx + (txtw / 2) + restline.skye;
                        if (tdx > tempEndx) {
                            cc.fillStyle = color.text;
                            if (isDrawTxt) {
                                cc.fillText(txt, dx, y);
                            }
                            endx = cx + (txtw / 2) + restline.skye;
                            drawLine.dashed(cc, cx, ly1, cx, ly2, restline.solid, restline.dashed);
                        }
                    } else {
                        cc.fillStyle = color.text;
                        var txtw0 = cc.measureText(txt).width;
                        var out = (dx + txtw0) < (width + x - leasWidth);
                        if (isDrawTxt && out) {
                            cc.fillText(txt, dx, y);
                        }
                        endx = cx + (txtw / 2) + restline.skye;
                        if (out) {
                            drawLine.dashed(cc, cx, ly1, cx, ly2, restline.solid, restline.dashed);
                        }
                    }
                }
            }

        }

    }

}







//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/timeline.js
// module id = 318
// module chunks = 0
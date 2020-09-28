/**
 * 绘制K线
 */


var arrayExtension = require("../../../common/arrayExtension");
var coordinate = require("../../../common/coordinate");
var drawLine = require("../../../common/drawLine");

module.exports = function (params) {

    var cc = params.cc;
    var layerDataC = params.layerDataC;
    var data = params.data;
    var color = params.color;
    var pillarWidth = params.pillarWidth;
    var regionk = params.regionk;
    var ylzc = params.ylzc;
    var imgs = params.imgs;
    var scale = params.scale;
    var max = params.max;
    var min = params.min;
    var sx = params.sx;
    var sy = params.sy;
    var ex = params.ex;
    var ey = params.ey;


    var len = data.length < scale.min ? scale.min : data.length;

    var kheight = ey - sy;      // k线区域的高度
    var cha = max - min;
    var dw = ex - sx;
    var unit = dw / len;
    var unithalf = unit * pillarWidth / 2;

    cc.clearRect(sx, 0, ex, regionk.h);
    layerDataC.clearRect(sx, 0, ex, regionk.h);

    for (var i = 0; i < len; i++) {
        var d = data[i];

        if (d) {

            //  [开，收，高，低] 柱子的高度
            var ho = sy + kheight - (d.open - min) / cha * kheight;       // 开，
            var hc = sy + kheight - (d.close - min) / cha * kheight;       // 收，
            var hh = sy + kheight - (d.high - min) / cha * kheight;       // 高，
            var hl = sy + kheight - (d.low - min) / cha * kheight;       // 低

            var x = sx + unit * i + unit / 2;

            ho = coordinate.format(ho);
            hc = coordinate.format(hc);

            var change = d.zde;     // 涨跌额
            var diff = d.close - d.open;
            if (diff > 0) {
                cc.strokeStyle = color.rise;
                cc.fillStyle = "rgba(0,0,0,0)";
            } else if (diff < 0) {
                cc.strokeStyle = color.fall;
                cc.fillStyle = color.fall;
            } else {
                cc.strokeStyle = color.equality;
                cc.fillStyle = "rgba(0,0,0,0)";
            }


            cc.beginPath();
            cc.moveTo(coordinate.format(x - unithalf), ho);
            cc.lineTo(coordinate.format(x + unithalf), ho);
            cc.lineTo(coordinate.format(x + unithalf), hc);
            cc.lineTo(coordinate.format(x - unithalf), hc);
            cc.closePath();

            cc.stroke();
            cc.fill();

            if (ho > hc) {   // 涨
                cc.EMLine(x, hc, x, hh);
                cc.EMLine(x, ho, x, hl);
            } else {
                cc.EMLine(x, ho, x, hh);
                cc.EMLine(x, hc, x, hl);
            }


            // 压力支撑位
            if (ylzc) {
                var nx = x - 3.5;
                if (ylzc.yl.time == d.times) {
                    layerDataC.drawImage(imgs.yl, nx, hh - 12 - 1, 7, 12);
                    layerDataC.save();
                    layerDataC.strokeStyle = "red";
                    layerDataC.fillStyle = "red";
                    drawLine.dashed(layerDataC, x, hh - 1, ex, hh - 1);
                    var txt = d.high + "";
                    var txtw = cc.measureText(txt).width;
                    layerDataC.fillText(txt, ex - txtw - 4, hh - 1 - 6);
                    layerDataC.restore();
                }
                if (ylzc.zc.time == d.times) {
                    layerDataC.drawImage(imgs.zc, nx, hl + 1, 7, 12);
                    layerDataC.save();
                    layerDataC.strokeStyle = "blue";
                    layerDataC.fillStyle = "blue";
                    drawLine.dashed(layerDataC, x, hl + 1, ex, hl + 1);
                    var txt = d.low + "";
                    var txtw = cc.measureText(txt).width;
                    layerDataC.fillText(txt, ex - txtw - 4, hl - 1 - 6);
                    layerDataC.restore();
                }
            }


        }



    }




};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/draw/drawk.js
// module id = 214
// module chunks = 0
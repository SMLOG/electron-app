
// var defaultData = require("./defaultData");
var setting = require("./defaultSetting");

var drawText = require("./drawText");


var setting = {};

module.exports = function (chart) {

    var data = chart.data.data;
    setting = chart.options;

    var sum = 0;
    for (var i = 0, len = data.length; i < len; i++) {
        var temp = parseFloat(data[i].data);
        if (temp) {
            sum += temp;
        }
    }

    setting.sum = sum;

    var cc = chart.layer.layerPieC;
    var cx = setting.centerx;
    var cy = setting.centery;
    var r1 = setting.radiusIn;
    var r2 = setting.radiusOut;
    var r3 = setting.radiusHover;
    var w = setting.width;
    var h = setting.height;

    cc.save();
    cc.translate(cx, cy);
    cc.rotate(setting.startAngle * Math.PI / 180);
    cc.translate(-cx, -cy);

    var skeyAngle = setting.startAngle;
    var color = setting.color;
    var cc2 = chart.layer.layerTextC;
    var cc3 = chart.layer.layerLineC;

    var obj = {
        skeyAngle: skeyAngle,
        color: color,
        cc: cc2,
        cc3: cc3,
        cx: cx,
        cy: cy,
        r1: r1,
        r2: r2,
        r3: r3,
        w: w,
        h: h,
    }

    var startAngle = 0;
    var angleDur = setting.angleDur;
    var dur = angleDur == -1 ? false : true;

    var lastTxtInfo = "";       //上一次绘制文字的信息
    for (var i = 0, len = data.length; i < len; i++) {

        var item = data[i];
        var angle = item.data / sum * 360;
        var endAngle = startAngle - (angle * angleDur);

        // console.log(startAngle , endAngle);

        cc.fillStyle = item.color;

        // 防止先接触留白
        var tempe = endAngle - 0.5;
        cc.beginPath();
        cc.arc(cx, cy, r1, startAngle / 180 * Math.PI, (tempe) / 180 * Math.PI, dur);
        cc.arc(cx, cy, r2, (tempe) / 180 * Math.PI, startAngle / 180 * Math.PI, !dur);
        cc.strokeStyle = "rgba(0,0,0,0)";
        cc.stroke();
        cc.fill();

        var bili = (item.data / sum * 100).toFixed(2) + "%";

        if (item.type == "in") {
            drawText.in(item, startAngle, endAngle, bili, obj, len, i);
        } else if (item.type == "none") {
        } else {
            lastTxtInfo = drawText.out(item, startAngle, endAngle, bili, obj, lastTxtInfo, (len - i));
        }

        startAngle = endAngle;
    }

    cc.restore();



};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/pie/draw.js
// module id = 402
// module chunks = 0
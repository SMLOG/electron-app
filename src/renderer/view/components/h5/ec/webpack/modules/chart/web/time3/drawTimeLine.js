var drawLine = require("../../common/drawLine");
var timeline = require("./timeline");
var tools = require("./tools");

module.exports = function () {

    var cc = this.layer.layerGridTimeLienC;
    var ops = this.options;
    var op = this.option;
    var type = this.option.type;
    var iscr = this.option.iscr;
    if (iscr == "true") {
        iscr = true;
    }
    // iscr = iscr == "true" ? true : false;

    var info = this.data.info;

    var area = ops.areaTime;
    var area2 = ops.areaTrading;
    var area3 = ops.areaIndicator;
    var padding = ops.padding;
    var color = ops.color;
    var restline = ops.restline;    // 休盘线
    var font = ops.font;

    var basey = area.height + area.starty + ops.font.size;
    var basex = padding.left;
    var draww = area.draww;
    var total = info.total;
    var dayConut = info.dayConut;

    var sticks = op.data.time.info.ticks;

    // 一天
    if (type == "r") {
        var times = [];

        cc.strokeStyle = color.dashedColor;
        // 只有AB股显示盘前
        if (info.jys == "80" || info.jys == "2") {
            times = tools.ticksForAB(iscr);
            timeline.ab(cc, times, total, iscr, area, restline, color, font);
            if (area2) {
                timeline.ab(cc, times, total, iscr, area2, restline, color, font, false);
            }
            if (area3) {
                timeline.ab(cc, times, total, iscr, area3, restline, color, font, false);
            }
        } else if (info.jys == "HK") {
            times = tools.ticksForHK(sticks);
            timeline.ab(cc, times, total, false, area, restline, color, font);
            if (area2) {
                timeline.ab(cc, times, total, iscr, area2, restline, color, font, false);
            }
            if (area3) {
                timeline.ab(cc, times, total, iscr, area3, restline, color, font, false);
            }
        } else {
            times = tools.ticksAddTime(sticks, area.draww, total, iscr);
            // times = tools.ticksAddTime2(sticks, area.draww, total, iscr);
            timeline.other(cc,  times, total, iscr, area, restline, color, font);
            if (area2) {
                timeline.other(cc, times, total, iscr, area2, restline, color, font, false);
            }
            if (area3) {
                timeline.other(cc, times, total, iscr, area3, restline, color, font, false);
            }
        }


        // console.log(times);

    } else {        // 2 3 4 5 天
        var tickIndex = [];
        var ticks = [];
        var days = info.days;
        for (var key in days) {
            tickIndex.push(days[key])
            ticks.push(key);
        }
        ticks.pop();

        cc.fillStyle = color.text;
        for (var i = 0, len = ticks.length; i < len; i++) {
            var txt = ticks[i];
            var txtw = cc.measureText(txt).width;
            var x, lx;
            lx = basex + (tickIndex[i+1] / total) * draww;
            x = basex + (tickIndex[i+1] / total) * draww - (txtw / 2);
            cc.fillText(txt, x, basey);
            cc.strokeStyle = restline.color;
            drawLine.dashed(cc, lx, area.starty, lx, basey - ops.font.size, restline.solid, restline.dashed);
           
            if (area2) {
                drawLine.dashed(cc, lx, area2.starty, lx, area2.starty + area2.height, restline.solid, restline.dashed);
            }

            if (area3) {
                drawLine.dashed(cc, lx, area3.starty, lx, area3.starty + area3.height, restline.solid, restline.dashed);
            }


        }
    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/drawTimeLine.js
// module id = 317
// module chunks = 0
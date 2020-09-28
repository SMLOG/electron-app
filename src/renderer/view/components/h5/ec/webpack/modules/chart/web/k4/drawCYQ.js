var cyq = require("../../common/cyq");
var coordinate = require("../../common/coordinate");


module.exports = function (index) {

    var cc = this.layer.layerCYQC;
    var ops = this.options;
    var kdata = this.sdata.kdata;
    var tdata = this.tdata.tk;

    var scale = ops.scale;
    var drawRegion = ops.drawRegion;
    var padding = ops.padding;
    var cyq = ops.cyq;
    var color = ops.color;
    var kgap = ops.kgap;



    // k线的最值
    var kMax = tdata.tkMax;
    var kMin = tdata.tkMin;

    var KaxisMax = tdata.tkMax;
    var KaxisMin = tdata.tkMin;

    // 轴最值
    var newKAxisMax = tdata.tkMax;
    var newKAxisMin = tdata.tkMin;
    var axisDiff = newKAxisMax - newKAxisMin;

    // console.log(this.cyqCalc);
    index = index === undefined ? scale.end - 1 : index;
    // console.log(index, kMax, kMin);
    // console.log("cyqCalc. idnex: " + index);
    var res = this.cyqCalc.calc(index);
    // console.log(res);

    var thatData = kdata[index];

    var sx = ops.width - padding.right - cyq.width;
    var sy = drawRegion.k.mt + padding.top ;
    var ex = ops.width - padding.right;
    var ey = drawRegion.k.h - drawRegion.k.mb;
    var fy = ops.height - padding.bottom;


    cc.clearRect(0, 0, ops.width, ops.height);

    var xaxis = [].concat(res.x);
    var yaxis = [].concat(res.y);


    // 过滤掉 Infinity 和 NaN
    xaxis.filter(function (item) {
        return (item != Infinity && item.toString() != "NaN");
    });

    // 过滤 超出的价格范围值
    for (var i = 0; i < yaxis.length; i++) {
        var item = yaxis[i];
        if (item > KaxisMax || item < KaxisMin) {
            yaxis.splice(i, 1);
            xaxis.splice(i, 1);
            i--;
        }
    }

    // console.log(xaxis.length, yaxis.length);

    var len = yaxis.length;
    var max = Math.max.apply(Math, xaxis);
    var width = cyq.width;
    var height = drawRegion.k.h - drawRegion.k.mb - drawRegion.k.mt - kgap.top - kgap.bottom;

    // var kstart = (height * (newKAxisMax - kMax) / axisDiff);
    // var kedn = (height * (kMin - newKAxisMin) / axisDiff);
    // var kheight = height - kstart - kedn;



    
    

    var avgline = res.avgCost / 1;

    // cc.strokeStyle = color.cyq.up;
    cc.beginPath();
    var dy = 0;     // 画的y位置
    var dw = 0;     // 画的x位置
    var cou = 0;
    var drawAvgLine = false;


    // cc.beginPath();

    var isFrist = true;
    var isDup = false;
    var isDwn = false;
    var avgx = 0;
    var avgy = 0;

    var last = 0;
    for (var i = len - 1; i >= 0; i--) {
        var xd = xaxis[i];
        var yd = yaxis[i];
        if (xd != Infinity) {

            // dy = sy + kstart + ((len - i - 1) / len) * kheight;
            dy = sy + kgap.top + (newKAxisMax - yd) / axisDiff * height;
            dw = sx + (xd / max) * width * 0.80;
            last = dy;

            if (isFrist) {
                cc.moveTo(sx, dy);
                isFrist = false;
            }
            cc.lineTo(dw, dy);

            if (yd < thatData[2] / 1) {
                if (!isDup) {
                    isDup = true;
                    cc.lineTo(sx, dy);
                    cc.closePath();
                    cc.fillStyle = color.cyq.up;
                    cc.fill();
                    cc.beginPath();
                    // isFrist = true;
                    cc.moveTo(sx, dy);
                    cc.lineTo(dw, dy);
                }
            }

            if (!drawAvgLine) {
                if (yd <= avgline) {
                    drawAvgLine = true;
                    avgx = dw;
                    avgy = dy;
                }
            }
        } else {
            // console.log("========");
        }
    }
    cc.lineTo(sx, last)
    cc.closePath();
    cc.fillStyle = color.cyq.down;
    cc.fill();

    cc.save();
    cc.lineWidth = 2;
    cc.beginPath();
    var avgyFoarmat = Math.round(avgy);
    cc.moveTo(sx, avgyFoarmat);
    cc.lineTo(avgx, avgyFoarmat);
    cc.strokeStyle = color.cyq.avg;
    cc.stroke();
    cc.restore();

    // console.log("cou:" + cou);
    cc.closePath();

    cc.strokeStyle = ops.color.border;
    cc.EMStroke(sx, sy, ex, fy);

    // console.log("max:", max);



    var cmfb = this.layer.cmfb;
    cmfb.innerHTML = "";

    var cmfbdata = [];

    // console.log(thatData);

    cmfbdata.push(["", "日期:", thatData[0]]);
    cmfbdata.push(["", "获利比例:", (res.benefitPart * 100).toFixed(2) + "%"]);
    cmfbdata.push(["ratio", (res.benefitPart * 100).toFixed(2) + "%", (100 - res.benefitPart * 100).toFixed(2) + "%"]);
    cmfbdata.push(["", "平均成本:", res.avgCost]);
    // try {
    //     var hlbl = (res.getBenefitPart(thatData[2] / 1) * 100).toFixed(2)
    //     console.log(hlbl);
    //     cmfbdata.push(["", thatData[2] + "元处获利比例:", hlbl]);
    // } catch (error) {
    //     console.log(error);
    // }

    var cb90 = res.percentChips["90"]
    cmfbdata.push(["", "90%成本:", cb90.priceRange[0] + "-" + cb90.priceRange[1]]);
    cmfbdata.push(["", "集中度:", (cb90.concentration * 100).toFixed(2) + "%"]);

    var cb70 = res.percentChips["70"]
    cmfbdata.push(["", "70%成本:", cb70.priceRange[0] + "-" + cb70.priceRange[1]]);
    cmfbdata.push(["", "集中度:", (cb70.concentration * 100).toFixed(2) + "%"]);

    var domHeight = ops.height - drawRegion.k.h - padding.bottom - 24;
    var linh = domHeight / (cmfbdata.length);

    var len = cmfbdata.length;
    while (len--) {
        if (linh < 24) {
            cmfbdata.pop();
            linh = domHeight / (cmfbdata.length);
        }
    }


    for (var i = 0, len = cmfbdata.length; i < len; i++) {
        var row = cmfbdata[i];

        var div = document.createElement("div");
        var label = document.createElement("label");
        var span = document.createElement("span");
        div.style.height = linh + "px";
        div.style.lineHeight = linh + "px";

        if (row[0]) {
            div.className = row[0];
        }

        label.innerText = row[1];
        span.innerText = row[2];

        div.appendChild(label);
        div.appendChild(span);

        cmfb.appendChild(div);

    }


    var ratio = cmfb.querySelector(".ratio");
    var rleft = ratio.querySelector("label")
    rleft.style.border = "1px solid " + color.cyq.down;
    var rwl = (cyq.width - 20) * res.benefitPart;
    rleft.style.width = rwl + "px";
    if (rwl < 50) {
        rleft.style.color = "rgba(0,0,0,0)";
    }

    var rright = ratio.querySelector("span");
    rright.style.border = "1px solid " + color.cyq.up;
    var rwr = (cyq.width - 20) * (1 - res.benefitPart);
    rright.style.width = rwr + "px";
    if (rwr < 50) {
        rright.style.color = "rgba(0,0,0,0)";
    }



};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/drawCYQ.js
// module id = 102
// module chunks = 0
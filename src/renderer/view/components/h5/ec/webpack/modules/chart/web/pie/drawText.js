// var defaultData = require("./defaultData");
var setting = require("./defaultSetting");

module.exports = {

    in: function (item, startAngle, endAngle, bili, obj, len, i) {
        var skeyAngle = obj.skeyAngle;
        var color = obj.color;
        var cc = obj.cc;
        var ccl = obj.cc3;
        var cx = obj.cx;
        var cy = obj.cy;
        var r1 = obj.r1;
        var r2 = obj.r2;
        var r3 = obj.r3;

        var midAngle = Math.abs(startAngle + (endAngle - startAngle) / 2 + skeyAngle);

        var tempAngle = (midAngle % 90) * Math.PI / 180;
        var tempAngle2 = (90 - midAngle % 90) * Math.PI / 180;
        var midRadius = r1 + (r2 - r1) * 0.55;

        var x = Math.abs(midRadius * Math.sin(tempAngle));
        var y = Math.abs(midRadius * Math.cos(tempAngle));

        var abs = Math.abs(midAngle) % 360;

        var tx, ty;
        if (abs >= 0 && abs < 90) {
            tx = cx + y;
            ty = cy - x;
        } else if (abs >= 90 && abs < 180) {
            tx = cx - x;
            ty = cy - y;
        } else if (abs >= 180 && abs < 270) {
            tx = cx - y;
            ty = cy + x;
        } else {
            tx = cx + x;
            ty = cy + y;
        }

        // 3个的特殊逻辑
        if (len == 3 && parseInt(bili) < 60 && y < r2) {
            if (i == 0) {
                ty = ty - 14;
                tx = tx + 8;
            }
        } 

        cc.beginPath();
        ccl.fillStyle = color.colorIn;
        ccl.strokeStyle = color.colorIn;

        var txt = bili;
        var txtw = cc.measureText(txt).width;
        var txtx = tx - txtw / 2;

        ccl.beginPath();
        ccl.fillText(txt, txtx, ty);
        ccl.fill();
        //debugger;
        // cc.closePath();
        console.log("111");
    },


    out: function (item, startAngle, endAngle, bili, obj, lastTxtInfo, remain) {
        // remain: 后面还剩几个

        var skeyAngle = obj.skeyAngle;
        var color = obj.color;
        var cc = obj.cc;
        var ccl = obj.cc3;
        var cx = obj.cx;
        var cy = obj.cy;
        var r1 = obj.r1;
        var r2 = obj.r2;
        var r3 = obj.r3;
        var w = obj.w;
        var h = obj.h;

        var midAngle = Math.abs(startAngle + (endAngle - startAngle) / 2 + skeyAngle);

        var tempAngle = (midAngle % 90) * Math.PI / 180;
        var tempAngle2 = (90 - midAngle % 90) * Math.PI / 180;
        var midRadius = r2;
        var outRadius = (r3 || r2) + 4;

        var x = Math.abs(midRadius * Math.sin(tempAngle));
        var y = Math.abs(midRadius * Math.cos(tempAngle));
        var x2 = Math.abs(outRadius * Math.sin(tempAngle));
        var y2 = Math.abs(outRadius * Math.cos(tempAngle));

        var abs = Math.abs(midAngle) % 360;

        var tx1, ty1, tx2, ty2, skeyx;
        if (abs >= 0 && abs < 90) {
            tx1 = cx + y;
            ty1 = cy - x;
            tx2 = cx + y2;
            ty2 = cy - x2;
            skeyx = 1;
        } else if (abs >= 90 && abs < 180) {
            tx1 = cx - x;
            ty1 = cy - y;
            tx2 = cx - x2;
            ty2 = cy - y2;
            skeyx = -1;
        } else if (abs >= 180 && abs < 270) {
            tx1 = cx - y;
            ty1 = cy + x;
            tx2 = cx - y2;
            ty2 = cy + x2;
            skeyx = -1;
        } else {
            tx1 = cx + x;
            ty1 = cy + y;
            tx2 = cx + x2;
            ty2 = cy + y2;
            skeyx = 1;
        }

        var txt = bili;
        var txtw = cc.measureText(txt).width;
        cc.fillStyle = item.color;
        cc.strokeStyle = item.color;

        var padtop = h / 2 - r3 - 14;

        tx3 = null;
        ty3 = null;
        // 在第一象限的时候可能会文字重叠
        if (abs >= 0 && abs < 90) {
            // var x0 = cx + Math.abs((r2 + 10) * Math.sin(tempAngle));
            var r = r2 * 1.2;
            var y0 = 13 * (remain - 0);
            var cosA = (r - y0) / r;
            var sinA = Math.sqrt(1 - cosA * cosA);
            var x0 = r * sinA;

            tx2 = cx + x0;
            ty2 = y0;

            if (remain <= 3) {
                tx2 = tx1 + remain * 2;
                ty2 = ty2 - (5 - remain) * 2;
            }
            // console.log(tx2, cx + r2 + 20)

            // if (tx2 > cx + r3 + 20) {
            //     tx2 = cx + r3 + 20;
            // }
        }

        ty2 += 4;

        cc.moveTo(tx1, ty1);
        cc.lineTo(tx2, ty2);

        var txtl = tx2 + (10 * skeyx);
        var txtx = tx2 + (10 * skeyx);

        if (abs >= 0 && abs < 90) {
            if (remain <= 3) {
                // txtl = tx2 + r2 / 2;
                txtx = tx2 + (r2 / 2 * skeyx);
            }
            if (txtx > cx + r2 + 20 ) {
                txtx = cx + r2 + 20;
                console.log(">>>>>>")
                console.log(txtx , cx + r2 + 20);
            }
        }

        cc.lineTo(txtx, ty2);
        cc.stroke();
        cc.beginPath();

        if (skeyx == -1) {
            txtx -= txtw;
        }

        ccl.fillStyle = item.color;
        ccl.strokeStyle = item.color;
        ccl.fillText(txt, txtx, ty2);
        ccl.fill();
        // ccl.closePath();

        // 返回绘制文字的信息，用于最后判断文字时候重合
        return {
            txtx: txtx,     // 文字的位置
            ty2: ty2,
            txtw: txtw,
            tx2: tx2,
            ty2: ty2,
        }

    }



};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/pie/drawText.js
// module id = 403
// module chunks = 0
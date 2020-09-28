module.exports = function () {

    var ops = this.options;
    var layer = this.layer;
    var format = this.format;

    var cck = layer.layerKC;
    var ccl = layer.layerLineC;
    var ccp = layer.layerPointC;

    var barWidth = ops.barWidth;
    var color = ops.color;

    var datak = format.k;
    var datal = format.l;

    var size = format.size;


    var sx = format.sx;
    var sy = format.sy;
    var ex = format.ex;
    var ey = format.ey;
    var dw = ex - sx;
    var dh = ey - sy;

    var ymax1 = format.ykmax || 0;
    var ymin1 = format.ykmin || 0;
    var ymax2 = format.ylmax || 0;
    var ymin2 = format.ylmin || 0;

    var diffy1 = ymax1 - ymin1;
    var diffy2 = ymax2 - ymin2;

    var unitw = dw / size;
    var halfw = unitw / 2 * barWidth;
    var txtjjsize = 120;
    var txtjj = Math.round(size / (dw / txtjjsize));
    console.log(txtjj + "-2222222222");

    console.log("=================");
    var index = 0;
    for (var key in datak) {  
        var ik = datak[key];

        var x = sx + index * unitw + unitw / 2;
        var o = sy + (ymax1 - ik.o) / diffy1 * dh;
        var c = sy + (ymax1 - ik.c) / diffy1 * dh;
        var h = sy + (ymax1 - ik.h) / diffy1 * dh;
        var l = sy + (ymax1 - ik.l) / diffy1 * dh;

        if (o > c) {
            cck.strokeStyle = color.rise;
            cck.fillStyle = "rgba(0,0,0,0)";
        }
        if (o < c) {
            cck.strokeStyle = color.fall;
            cck.fillStyle = color.fall;
        }
        if (o == c) {
            cck.strokeStyle = color.text;
            cck.fillStyle = "rgba(0,0,0,0)";
        }

        cck.EMFillPillar(o, c, x, halfw, barWidth);

        var arr = [o, c, h, l].sort(function (a, b) { return a - b });
        cck.EMLine2(x, arr[0], x, arr[1]);
        cck.EMLine2(x, arr[2], x, arr[3]);

        
        if (index %  txtjj == Math.round(txtjj / 2)) {
            cck.fillStyle = color.text;
            cck.textAlign = "center";
            if (x < ops.width - 100) {
                cck.fillText(key, x, ey + 15)
            }
        }

        index++;
    }
  

    // 绘制多条折线
    for (var i = 0, len = datal.length; i < len; i++) {
        var line = datal[i];
        var lds = line.data;
        ccp.fillStyle = line.color;
        ccp.strokeStyle = line.color;
        ccl.strokeStyle = line.color;
        ccl.beginPath();
        
        var index2 = 0;
        var py ;
        for (var key in datak) {
            var ld = lds[key];
            if (!isNaN(ld)) {
                var x = sx + index2 * unitw + unitw / 2;
                var ly = sy + (ymax2 - ld) / diffy2 * dh;
                ccl.lineTo(x, ly);

                if (line.showPoint) {
                    ccp.beginPath();
                    ccp.arc(x, ly, 3, Math.PI * 2, 0);
                    ccp.fill();
                    ccp.stroke();
                    ccp.closePath();
                }
            }
            index2++;
        }


        // for (var key in datal) {
        //     if (datak[key] || datak[key] != 0) {
        //         var index = 0;
        //         for (var k in datak) {
        //             if (k == key) {
        //                 break;
        //             }
        //             index++;
        //         }
        //     }
        // }
        
        
        ccl.stroke();
    }



    this.stauts = 1;

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline/draw.js
// module id = 480
// module chunks = 0
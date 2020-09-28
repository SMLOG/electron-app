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

    setting.sum = sum;      // 总数据量

    var cc = chart.layer.layerPieC;
    var cx = setting.centerx;
    var cy = setting.centery;
    var r1 = setting.radiusIn;
    var r2 = setting.radiusOut;
    var r3 = setting.radiusHover;
    var w = setting.width;
    var h = setting.height;


    var x1 = cx + r2;
    var y1 = cy;
    // var x2 = 


    var deg = Math.PI * 0.6;

    // cc.strokeStyle = "red";
    // cc.arc(cx, cy, r2, 1, deg, false);
    // cc.arc(cx, cy, r1, deg, 1, true);
    // cc.closePath();
    // cc.stroke();



    var midText = [];       // 中间文字的位置
    var beforeAngle = -Math.PI * 0.5;       // 开始位置
    // var beforeAngle = 0;       // 开始位置
    for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        var angle = item.data / sum * Math.PI * 2;

        var endAngle = beforeAngle - angle;

        cc.fillStyle = item.color;
        cc.beginPath();
        cc.arc(cx, cy, r2, beforeAngle, endAngle, true);
        cc.arc(cx, cy, r1, endAngle, beforeAngle, false);
        cc.closePath();
        cc.fill();

        midText.push((beforeAngle + endAngle) / 2);

        beforeAngle = endAngle;
    }



    console.log(midText)


    var lt = [];
    var lb = [];
    var rt = [];
    var rb = [];
    cc.strokeStyle = "red";
    for (var i = 0, len = midText.length; i < len; i++) {
        var deg = (180 / Math.PI * (midText[i]));
        console.log(deg);

        var ang = deg * Math.PI / 180
        var x = cx + (r3 + 10) * Math.cos(ang);
        var y = cy + (r3 + 10) * Math.sin(ang);

        var base = 0;
        if (deg <= -90 && deg > -270) {
            base = cx - r3 - 10;
            if (deg <= -90 && deg > -180) {
                lt.push([x, y, base]);    
            } else {
                lb.push([x, y, base]);
            }
        } else {
            base = cx + r3 + 10;
            if (deg <= -270 && deg > -360) {
                rb.push([x, y, base]);
            } else{
                rt.push([x, y, base]);
            }
        }

        cc.beginPath();
        cc.moveTo(cx, cy);
        cc.lineTo(x, y);
        cc.lineTo(base, y); 
        cc.stroke();
        cc.closePath();
    }

    
    // for(var i = 0, len = arrLeft.length ; i < len ; i++){
    //     var arr = arrLeft[i];
    //     cc.beginPath();
    //     cc.moveTo(cx, cy);
    //     cc.lineTo(arr[0], arr[1]);
    //     cc.lineTo(arr[2], arr[1]); 
    //     cc.stroke();
    //     cc.closePath();
    // }



    // function () {  }



};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/pie/draw2.js
// module id = 404
// module chunks = 0
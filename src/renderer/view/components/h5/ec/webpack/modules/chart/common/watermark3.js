/**
 * 水印
 */

var imgpng = require("images/water_mark.png");

module.exports = function(skex, skey) {
    skex = skex === undefined ? 0 : skex;
    skey = skey === undefined ? 0 : skey;

    var layerWatermarkC = this.layer.layers.watermark;
    var ops = this.ops;
    var padding = ops.padding;

    var cw = ops.width;

    var imgw = 328 / 3;
    var imgh = 82 / 3;

    var img = new Image();
    img.width = imgw;  
    img.height = imgh;   

    img.src = imgpng;

    img.onload = function () {
        var x = cw - padding.right - imgw - 1 - skex;
        var y = padding.top + 1 + skey;
        
        layerWatermarkC.drawImage(img, x, y, imgw, imgh);
    }
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/watermark3.js
// module id = 325
// module chunks = 0
/**
 * 水印
 */

var imgpng = require("images/water_mark.png");

module.exports = function(skewing, skex) {
    skex = skex === undefined ? 0 : skex;

    var layerWatermarkC = this.layer.layerWatermarkC || this.ctxs.layerWatermarkC;
    var ops = this.options;
    var padding = ops.padding;

    var region = ops.drawRegion || {};
    var rmt = region.k && region.k.mt || 0;

    var cw = ops.width;

    var imgw = 328 / 3;
    var imgh = 82 / 3;

    var img = new Image();
    img.width = imgw;  
    img.height = imgh;   

    img.src = imgpng;

    img.onload = function () {
        var x = cw - padding.right - imgw - 10 - skex;
        var y = padding.top + rmt + 10 + (skewing || 1);

        if (ops.watermark == "bottom") {
            y = ops.height - padding.bottom - ops.font.size - imgh - 5;
        }
        
        layerWatermarkC.drawImage(img, x, y, imgw, imgh);
    }
}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/watermark.js
// module id = 6
// module chunks = 0
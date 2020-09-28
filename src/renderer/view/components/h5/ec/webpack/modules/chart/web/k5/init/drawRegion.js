/**
 * 
 * 计算绘制区域的宽高
 * 
 */

module.exports = function calcDrawRegion() {
    var ops = this.options;

    var width = ops.width;      // canvas的宽高
    var padding = ops.padding;
    var height = ops.height - padding.top - padding.bottom;
    var font = ops.font;
    var split2 = ops.split2;
    var cyq = ops.cyq || {};

    var drawSumWdith = width - padding.left - padding.right - (cyq.width || 0) - (cyq.gap || 0);        // 绘图区域的总宽度
    
    function calc(obj) {
        var MUT = height > 350 ? 2 : 1.8;      // 倍率
        var mt = 0;
        var mb = 0;
        var pt = 0;
        var pb = 0;
        var h = 0;
        if (obj.marginTop == "auto") {
            mt = font.size * MUT;
        } else if (obj.marginTop != "none" && obj.marginTop > 0) {
            mt = obj.marginTop;
        }

        if (obj.marginBottom == "auto") {
            mb = font.size * MUT;
        } else if (obj.marginBottom != "none" && obj.marginBottom > 0) {
            mb = obj.marginBottom;
        }

        if (obj.paddingTop == "auto") {
            pt = font.size * MUT;
        } else if (obj.paddingTop != "none" && obj.paddingTop > 0) {
            pt = obj.paddingTop;
        }

        if (obj.paddingBottom == "auto") {
            pb = font.size * MUT;
        } else if (obj.paddingBottom != "none" && obj.paddingBottom > 0) {
            pb = obj.paddingBottom;
        }

        var temp =  {
            mt: mt,
            mb: mb,
            pt: pt,
            pb: pb,
            h: height * obj.body,
            top: height * obj.top + padding.top,
            x: obj.x,
            y: obj.y
        }

        return temp;
    }

    var heightMargin = 0;
    var heightPadding = 0;

    // 计算的 绘图区域
    var drawRegion = {
        drawSumWdith: drawSumWdith,
    };    

    // 计算所有的margin和padding的高度，用于计算
    for (var key in split2) {
        var obj = calc(split2[key], key);
        drawRegion[key] = obj;
    }

    ops.drawRegion = drawRegion;
}





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k5/init/drawRegion.js
// module id = 242
// module chunks = 0
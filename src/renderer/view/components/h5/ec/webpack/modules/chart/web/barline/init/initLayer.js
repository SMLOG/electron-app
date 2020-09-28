/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");


module.exports = function initLayer() {
    var ops = this.options;
    var color = ops.color;
    var font = ops.font;

    var root = document.querySelector(this.container);
    root.className = root.className + " __emchatrs3_root_box";
    root.style.width = ops.width + "px";
    root.style.height = ops.height + "px";
    if (color.background) {
        root.style.backgroundColor = color.background;
    }

    // 创建一个装canvas层的div
    var divCanvas = document.createElement("div");
    divCanvas.className = "__canvas";

    // 网格层
    var layerGrid = document.createElement("canvas");
    var layerGridC = layerGrid.getContext("2d");

    // bar层
    var layerBar = document.createElement("canvas");
    var layerBarC = layerBar.getContext("2d");

    // 柱子上色
    var layerBarHover = document.createElement("canvas");
    var layerBarHoverC = layerBarHover.getContext("2d");

    // line层
    var layerLine = document.createElement("canvas");
    var layerLineC = layerLine.getContext("2d");

    var layerLinePoint = document.createElement("canvas");
    var layerLinePointC = layerLinePoint.getContext("2d");

    // 水印层
    var layerWatermark = document.createElement("canvas");
    var layerWatermarkC = layerWatermark.getContext("2d");

    // 交互层
    var layerUE = document.createElement("canvas");
    var layerUEC = layerUE.getContext("2d");

    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";
    // layerUI.style.backgroundColor = "rgba(255,255,255,0.001)";

    divCanvas.appendChild(layerGrid);
    divCanvas.appendChild(layerBar);
    divCanvas.appendChild(layerBarHover);
    divCanvas.appendChild(layerLine);
    divCanvas.appendChild(layerLinePoint);
    divCanvas.appendChild(layerWatermark);
    divCanvas.appendChild(layerUE);

    root.appendChild(layerUI);
    root.appendChild(divCanvas);

    // 所有的dom
    var layer = {
        divCanvas: divCanvas,
        layerGrid: layerGrid,
        layerBar: layerBar,
        layerBarHover: layerBarHover,
        layerLine: layerLine,
        layerLinePoint: layerLinePoint,
        layerWatermark: layerWatermark,
        layerUE: layerUE,
        layerUI: layerUI
    }

    // 所有的绘图对象
    var ctxs = {
        layerGridC: layerGridC,
        layerBarC: layerBarC,
        layerBarHoverC: layerBarHoverC,
        layerLineC: layerLineC,
        layerLinePointC: layerLinePointC,
        layerWatermarkC: layerWatermarkC,
        layerUEC: layerUEC
    }

    for (var key in layer) {
        if (layer[key].nodeName == "CANVAS") {
            layer[key].width = ops.width;
            layer[key].height = ops.height;
        }
    }

    for (var k in ctxs) {
        var ctx = ctxs[k];
        // 初始化上下文字体
        ctx.textBaseline = "middle";
        ctx.font = font.size + "px " + font.family;
        canvasExtension(ctx);       // 扩展实例
    }

    this.layer = layer;
    this.ctxs  = ctxs;

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/init/initLayer.js
// module id = 455
// module chunks = 0
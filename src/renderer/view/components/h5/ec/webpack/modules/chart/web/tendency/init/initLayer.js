/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");


module.exports = function initLayer() {
    var option = this.option;
    var ops = this.options;
    var color = ops.color;
    var font = ops.font;

    var root = document.querySelector(option.container);
    root.className = root.className + " __emchatrs3_root_box";
    root.style.width = option.width + "px";
    root.style.height = option.height + "px";
    if (color.background) {
        root.style.backgroundColor = color.background;
    }

    // 创建一个装canvas层的div
    var divCanvas = document.createElement("div");
    divCanvas.className = "__canvas";

    // 网格层
    var layerGrid = document.createElement("canvas");
    var layerGridC = layerGrid.getContext("2d");
    canvasExtension(layerGridC);

    // K线层
    var layerK = document.createElement("canvas");
    var layerKC = layerK.getContext("2d");
    canvasExtension(layerKC);

    // 盘口异动层
    var layerAbnormal = document.createElement("canvas");
    var layerAbnormalC = layerAbnormal.getContext("2d");

    // loading层
    var layerLoading = document.createElement("canvas");
    var layerLoadingC = layerLoading.getContext("2d");

    // 水印层
    var layerWatermark = document.createElement("canvas");
    var layerWatermarkC = layerWatermark.getContext("2d");

    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";
    // layerUI.style.backgroundColor = "rgba(255,255,255,0.001)";

    divCanvas.appendChild(layerGrid);
    divCanvas.appendChild(layerK);
    divCanvas.appendChild(layerAbnormal);
    divCanvas.appendChild(layerLoading);
    divCanvas.appendChild(layerWatermark);
    
    root.appendChild(layerUI);
    root.appendChild(divCanvas);

    var layer = {
        divCanvas: divCanvas,
        layerGrid: layerGrid,
        layerGridC: layerGridC,
        layerLoading: layerLoading,
        layerLoadingC: layerLoadingC,
        layerWatermark: layerWatermark,
        layerWatermarkC: layerWatermarkC,
        layerK: layerK,
        layerKC: layerKC,
        layerAbnormal: layerAbnormal,
        layerAbnormalC: layerAbnormalC,
        layerUI: layerUI
    }

    
    for (var k in layer) {
        // 给canvas赋值宽高
        if (layer[k].nodeName == "CANVAS") {
            layer[k].width = option.width * ops.dpr;
            layer[k].height = option.height * ops.dpr;
        }
        // 初始化上下文字体
        if (layer[k].font) {
            layer[k].textBaseline = "middle";
            layer[k].font = font.size + "px " + font.family;
        }
    }

    this.layer = layer;

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency/init/initLayer.js
// module id = 358
// module chunks = 0
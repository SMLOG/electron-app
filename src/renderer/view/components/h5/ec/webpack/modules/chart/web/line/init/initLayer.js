/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");


module.exports = function initLayer() {
    var option = this.option;
    var ops = this.options;
    var font = ops.font;
    var color = ops.color;

    var root = document.querySelector(option.container);
    root.innerHTML = "";
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

    // 折线层
    var layerLine = document.createElement("canvas");
    var layerLineC = layerLine.getContext("2d");
    canvasExtension(layerLineC);

    // 水印层
    var layerWatermark = document.createElement("canvas");
    var layerWatermarkC = layerWatermark.getContext("2d");

    // 文字层
    var layerText = document.createElement("canvas");
    var layerTextC = layerText.getContext("2d");

    // 提示文字层
    var layerHoverText = document.createElement("canvas");
    layerHoverText.className = "__layerText";
    var layerHoverTextC = layerHoverText.getContext("2d");

    // loading层
    var layerLoading = document.createElement("canvas");
    var layerLoadingC = layerLoading.getContext("2d");

    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";
    // layerUI.style.backgroundColor = "rgba(255,255,255,0.001)";

    divCanvas.appendChild(layerGrid);
    divCanvas.appendChild(layerLine);
    divCanvas.appendChild(layerWatermark);
    divCanvas.appendChild(layerText);
    divCanvas.appendChild(layerLoading);
    divCanvas.appendChild(layerHoverText);
    
    root.appendChild(layerUI);
    root.appendChild(divCanvas);

    var layer = {
        divCanvas: divCanvas,
        layerGrid: layerGrid,
        layerGridC: layerGridC,
        layerLine: layerLine,
        layerLineC: layerLineC,
        layerWatermark: layerWatermark,
        layerWatermarkC: layerWatermarkC,
        layerText: layerText,
        layerTextC: layerTextC,
        layerHoverText: layerHoverText,
        layerHoverTextC: layerHoverTextC,
        layerLoading: layerLoading,
        layerLoadingC: layerLoadingC,
        layerUI: layerUI
    }

    
    for (var k in layer) {
        // 给canvas赋值宽高
        if (layer[k].nodeName == "CANVAS") {
            layer[k].width = option.width * ops.dpr;
            layer[k].height = option.height * ops.dpr;
        }
        // 初始化上下文
        if (layer[k].font) {
            layer[k].textBaseline = "middle";
            layer[k].font = font.size + "px " + font.family;
        }
    }

    this.layer = layer;

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/init/initLayer.js
// module id = 388
// module chunks = 0
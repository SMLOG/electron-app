/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");
var setting = require("../defaultSetting");

module.exports = function initLayer() {

    var ops = this.options;
    var color = ops.color;
    var font = ops.font;

    var root = document.querySelector(ops.container);
    root.className = root.className + " __emchatrs3_root_box";
    root.style.width = ops.width + "px";
    root.style.height = ops.height + "px";
    if (color.background) {
        root.style.backgroundColor = color.background;
    }

    // 创建一个装canvas层的div
    var divCanvas = document.createElement("div");
    divCanvas.className = "__canvas";

    // grid 网格
    var layerGrid = document.createElement("canvas");
    var layerGridC = layerGrid.getContext("2d");
    canvasExtension(layerGridC);

    // text 文字
    var layerText = document.createElement("canvas");
    var layerTextC = layerText.getContext("2d");

    // draw 绘图
    var layerDraw = document.createElement("canvas");
    var layerDrawC = layerDraw.getContext("2d");
    canvasExtension(layerDrawC);

    // 水印层
    var layerWatermark = document.createElement("canvas");
    var layerWatermarkC = layerWatermark.getContext("2d");

    // 交互
    var layerInteractive = document.createElement("canvas");
    var layerInteractiveC = layerInteractive.getContext("2d");
    canvasExtension(layerInteractiveC);

    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";

    divCanvas.appendChild(layerText);
    divCanvas.appendChild(layerGrid);
    divCanvas.appendChild(layerDraw);
    divCanvas.appendChild(layerWatermark);
    divCanvas.appendChild(layerInteractive);
    
    root.appendChild(layerUI);
    root.appendChild(divCanvas);

    var layer = {
        divCanvas: divCanvas,
        layerUI: layerUI,
        layerGrid: layerGrid,
        layerGridC: layerGridC,
        layerText: layerText,
        layerTextC: layerTextC,
        layerDraw: layerDraw,
        layerDrawC: layerDrawC,
        layerWatermark: layerWatermark,
        layerWatermarkC: layerWatermarkC,
        layerInteractive: layerInteractive,
        layerInteractiveC: layerInteractiveC
    }
    
    for (var k in layer) {
        // 给canvas赋值宽高
        if (layer[k].nodeName == "CANVAS") {
            layer[k].width = ops.width;
            layer[k].height = ops.height;
        }
        // 初始化上下文字体
        if (layer[k].font) {
            layer[k].textBaseline = "middle";
            layer[k].font = font.size + "px " + font.family;
        }
    }

    this.layer = layer;
    this.root = root;

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/init/initLayer.js
// module id = 443
// module chunks = 0
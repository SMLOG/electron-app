/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");
// var setting = require("../defaultSetting");

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

    // pie
    var layerPie = document.createElement("canvas");
    var layerPieC = layerPie.getContext("2d");

    // line
    var layerLine = document.createElement("canvas");
    layerLine.style.zIndex = 10;
    var layerLineC = layerLine.getContext("2d");

    // text
    var layerText = document.createElement("canvas");
    var layerTextC = layerText.getContext("2d");

    // interactive
    var layerInteractive = document.createElement("canvas");
    var layerInteractiveC = layerInteractive.getContext("2d");

    // 水印层
    var layerWatermark = document.createElement("canvas");
    var layerWatermarkC = layerWatermark.getContext("2d");

    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";
    // layerUI.style.backgroundColor = "rgba(255,255,255,0.001)";

    divCanvas.appendChild(layerText);
    divCanvas.appendChild(layerPie);
    divCanvas.appendChild(layerLine);
    divCanvas.appendChild(layerInteractive);
    divCanvas.appendChild(layerWatermark);
    
    root.appendChild(layerUI);
    root.appendChild(divCanvas);

    var layer = {
        divCanvas: divCanvas,
        layerUI: layerUI,
        layerPie: layerPie,
        layerPieC: layerPieC,
        layerText: layerText,
        layerTextC: layerTextC,
        layerLine: layerLine,
        layerLineC: layerLineC,
        layerInteractive: layerInteractive,
        layerInteractiveC: layerInteractiveC,
        layerWatermark: layerWatermark,
        layerWatermarkC: layerWatermarkC
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
// ./modules/chart/web/pie/init/initLayer.js
// module id = 400
// module chunks = 0
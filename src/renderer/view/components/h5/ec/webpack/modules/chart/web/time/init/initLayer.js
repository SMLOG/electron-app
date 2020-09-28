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
    root.className = root.className.replace(' __emchatrs3_root_box', "") + " __emchatrs3_root_box";
    root.style.width = option.width + "px";
    root.style.height = option.height + "px";
    if (color.background) {
        root.style.backgroundColor = color.background;
    }



    // root.ontouchstart = function (e) {  
    //     e.stopPropagation();
    //     e.preventDefault();
    // }
    // root.ontouchmove = function (e) {  
    //     e.stopPropagation();
    //     e.preventDefault();
    // }
    // root.ontouchend = function (e) {  
    //     e.stopPropagation();
    //     e.preventDefault();
    // }
    
    

    // 创建一个装canvas层的div
    var divCanvas = document.createElement("div");
    divCanvas.className = "__canvas";

    // 网格层
    var layerGrid = document.createElement("canvas");
    var layerGridC = layerGrid.getContext("2d");
    canvasExtension(layerGridC);

    // 分离一层时间线层
    var layerGridTimeLien = document.createElement("canvas");
    var layerGridTimeLienC = layerGrid.getContext("2d");
    canvasExtension(layerGridC);


    // 折线层
    var layerLine = document.createElement("canvas");
    var layerLineC = layerLine.getContext("2d");
    canvasExtension(layerLineC);

    // 数据层
    var layerData = document.createElement("canvas");
    var layerDataC = layerData.getContext("2d");

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

    var dotsPoint = document.createElement("div");;
    dotsPoint.className = "__dotspoint";

    layerUI.appendChild(dotsPoint);


    divCanvas.appendChild(layerGrid);
    divCanvas.appendChild(layerGridTimeLien);
    divCanvas.appendChild(layerLine);
    divCanvas.appendChild(layerData);
    divCanvas.appendChild(layerAbnormal);
    divCanvas.appendChild(layerLoading);
    divCanvas.appendChild(layerWatermark);
    
    root.appendChild(layerUI);
    root.appendChild(divCanvas);

    var layer = {
        divCanvas: divCanvas,
        layerGrid: layerGrid,
        layerGridC: layerGridC,
        layerGridTimeLien: layerGridTimeLien,
        layerGridTimeLienC: layerGridTimeLienC,
        layerLoading: layerLoading,
        layerLoadingC: layerLoadingC,
        layerWatermark: layerWatermark,
        layerWatermarkC: layerWatermarkC,
        layerLine: layerLine,
        layerLineC: layerLineC,
        layerData: layerData,
        layerDataC: layerDataC,
        layerAbnormal: layerAbnormal,
        layerAbnormalC: layerAbnormalC,
        layerUI: layerUI,
        dotsPoint: dotsPoint
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
// ./modules/chart/web/time/init/initLayer.js
// module id = 256
// module chunks = 0
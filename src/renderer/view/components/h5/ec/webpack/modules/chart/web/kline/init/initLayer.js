/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");


module.exports = function initLayer() {
    var op = this.option;
    var ops = this.options;
    var font = ops.font;
    var color = ops.color;

    var view = document.querySelector(this.container);
    var root = document.createElement("div");
    root.className = root.className + " __emchatrs3_root";
    if (color.background) {
        root.style.backgroundColor = color.background;
    }
    view.appendChild(root);

    var width = root.clientWidth;
    var height = root.clientHeight;

    ops.width = width;
    ops.height = height;


    // 定义所以的层级和顺序
    var layerArr = [
        "layerGrid",        // 网格层
        "layerK",           // K线层
        "layerLine",        // 折线层
        "layerPoint",        // 节点
        "layerText",        // 文字层
        "layerWatermark",   // 水印层
        "layerInteraction"  // 交互层
    ];


    // 创建一个装canvas层的div
    var divCanvas = document.createElement("div");
    divCanvas.className = "__canvas";

    var layerCs = {};

    for (var i = 0, len = layerArr.length; i < len; i++) {
        var canvas = document.createElement("canvas");
        var cc = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        cc.textBaseline = "middle";
        cc.font = font.size + "px " + font.family;
        canvasExtension(cc);
        divCanvas.appendChild(canvas);
        layerCs[layerArr[i] + "C"] = cc;
    }


    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";

    var pop = document.createElement("div");
    if (ops.popClass) {
        pop.className = "__pop " + ops.popClass;
    } else {
        pop.className = "__pop __pop_dft";
    }
    layerUI.appendChild(pop);
    
    layerCs.layerUI = layerUI;
    layerCs.pop = pop;

    root.appendChild(divCanvas);
    root.appendChild(layerUI);

    this.layer = layerCs;

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline/init/initLayer.js
// module id = 475
// module chunks = 0
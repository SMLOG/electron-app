/**
 * 
 * 初始化dom和canvas各个层
 * 
 */
var canvasExtension = require("chart/common/canvasExtension");


module.exports = function initLayer() {
    var ops = this.ops;
    var font = ops.font;
    var color = ops.color;

    var root = document.querySelector(ops.container);
    root.innerHTML = "";
    root.className = root.className.replace(' __emchatrs3_root_box', "") + " __emchatrs3_root_box";
    root.style.width = ops.width + "px";
    root.style.height = ops.height + "px";
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

    var layerName = [
        "bg",           // 背景层， 预留
        "grid",         // 网格， 包含虚线和网格线上的文字
        "data",         // 数据层， 包含折线，柱线
        "text",         // 文字层， 一些位置固定数据会经常变化文字
        "interaction",  // 交互层， 用于绘制十字线已经tip
        "watermark"     // 水印层，
    ]

    var layers = {};
    for (var i = 0, len = layerName.length; i < len; i++) {
        var canvas = document.createElement("canvas");
        var cc = canvas.getContext("2d");
        canvas.width = ops.width;
        canvas.height = ops.height;
        cc.textBaseline = "middle";
        cc.font = font.size + "px " + font.family;

        canvasExtension(cc);
        layers[layerName[i]] = cc;
        divCanvas.appendChild(canvas);
    }

    // UI层
    var layerUI = document.createElement("div");
    layerUI.className = "__ui";

    // 打点层
    var dotsPoint = document.createElement("div");;
    dotsPoint.className = "__dotspoint";

    layerUI.appendChild(dotsPoint);


    root.appendChild(layerUI);
    root.appendChild(divCanvas);


    this.layer = {
        layers: layers,
        layerUI: layerUI
    };

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/init/initLayer.js
// module id = 306
// module chunks = 0
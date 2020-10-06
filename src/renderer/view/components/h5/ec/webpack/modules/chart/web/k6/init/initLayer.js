/**
 *
 * 初始化dom和canvas各个层
 *
 */
var canvasExtension = require("chart/common/canvasExtension");

// var hammer = require("hammerjs");

module.exports = function initLayer() {
  var option = this.option;
  var ops = this.options;
  var font = ops.font;
  var color = ops.color;

  var root = document.querySelector(option.container);
  root.innerHTML = "";
  root.className =
    root.className.replace("__emchatrs3_root_box", "") +
    " __emchatrs3_root_box";
  root.style.width = option.width + "px";
  root.style.height = option.height + "px";
  if (color.background) {
    root.style.backgroundColor = color.background;
  }

  // root.ontouchstart = function (e) {
  //     e.stopPropagation();
  //     // e.preventDefault();
  // }
  // root.ontouchmove = function (e) {
  //     e.stopPropagation();
  //     // e.preventDefault();
  // }
  // root.ontouchend = function (e) {
  //     e.stopPropagation();
  //     // e.preventDefault();
  // }

  // 创建一个装canvas层的div
  var divCanvas = document.createElement("div");
  divCanvas.className = "__canvas";

  // 网格层
  var layerGrid = document.createElement("canvas");
  var layerGridC = layerGrid.getContext("2d");

  // K线层
  var layerK = document.createElement("canvas");
  var layerKC = layerK.getContext("2d");
  canvasExtension(layerKC);

  // 指标层
  var layerIndex = document.createElement("canvas");
  var layerIndexC = layerIndex.getContext("2d");
  canvasExtension(layerIndexC);

  var layerCYQ = document.createElement("canvas");
  var layerCYQC = layerCYQ.getContext("2d");
  canvasExtension(layerCYQC);

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

  var dotsPoint = document.createElement("div");
  dotsPoint.className = "__dotspoint";

  layerUI.appendChild(dotsPoint);

  divCanvas.appendChild(layerGrid);
  divCanvas.appendChild(layerK);
  divCanvas.appendChild(layerIndex);
  divCanvas.appendChild(layerData);
  divCanvas.appendChild(layerAbnormal);
  divCanvas.appendChild(layerCYQ);
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
    layerIndex: layerIndex,
    layerIndexC: layerIndexC,
    layerCYQ: layerCYQ,
    layerCYQC: layerCYQC,
    layerData: layerData,
    layerDataC: layerDataC,
    layerAbnormal: layerAbnormal,
    layerAbnormalC: layerAbnormalC,
    layerUI: layerUI,
    dotsPoint: dotsPoint,
  };

  for (var k in layer) {
    // 给canvas赋值宽高
    if (layer[k].nodeName == "CANVAS") {
      layer[k].width = option.width * ops.dpr;
      layer[k].height = option.height * ops.dpr;
      layer[k].id = k;
    }
    // 初始化上下文
    if (layer[k].font) {
      layer[k].textBaseline = "middle";
      layer[k].font = font.size + "px " + font.family;
    }
  }

  this.layer = layer;
};

//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k2/init/initLayer.js
// module id = 160
// module chunks = 0

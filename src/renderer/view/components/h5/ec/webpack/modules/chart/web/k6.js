/**
 * k线图
 * @param {any} option
 */

var initParameter = require("./k6/init/initParameter");
var initLayer = require("./k6/init/initLayer");
var initIndexDOM = require("./k6/init/initIndexDOM"); // 指标dom
var initDrawRegion = require("./k6/init/drawRegion");

var dataFormat = require("./k6/dataFormat");
var dataSplit = require("./k6/dataSplit");
// var splitYAxis = require("chart/common/splitYAxis");       // 计算刻度
// var tools = require("../common/tools");
// var jsonp = require("../common/jsonp2");
// var jsonp2 = require("../common/jsonp-promise");
// var qtjsonp = require("../common/qtjsonp");

var loading = require("../common/loadingImg");
var loading2 = require("../common/loading");
var watermark = require("chart/common/watermark"); // 水印

var drawGrid = require("./k6/drawGrid");
var drawlien = require("chart/common/drawLine");
var drawBlockK = require("./k6/drawBlockK");
var drawBlockTrading = require("./k6/drawBlockTrading");
var drawIndexsV = require("./k6/drawIndexsV"); // 指标5
var drawIndexsH = require("./k6/drawIndexsH"); // 指标H
var drawTitle = require("./k6/drawTitle");
var dopPoint = require("./k6/dotPoint"); // 打点
var dopPoint2 = require("./k6/dotPoint2"); // 打点
var drawCYQ = require("./k6/drawCYQ"); // 筹码分布
var dotPointFormat = require("./k6/dotPointFormat"); //

var getConvert = require("chart/common/getConvert"); // 计算各种指标
var arrayExt = require("chart/common/arrayExtension");

var interactive = require("./k6/interactive");
var interactiveForIpad = require("./k6/interactiveForIpad");
var slidebar = require("./k6/sildebar");
var sildebarForIpad = require("./k6/sildebarForIpad");

var extend = require("chart/common/extend2");
var ext = require("lodash").merge;

var extensionAPI = require("./k6/extensionAPI"); // 扩展api的实现

var getDeviceType = require("../common/getDeviceType");

var cyq = require("../common/cyq");
var cqcx = require("../common/cqcx"); // 除权除息
// var setCode = require("./k6/setCode");

function k(option) {
  // k2
  var _this = this;
  this.option = option;
  this.options = {};

  this.stauts = {
    indexv: "CMA",
    indexh: "RSI",
  };

  try {
    this._init();
  } catch (error) {
    option.onError(error);
  }

  // this.load();

  // this._getJSONP();
}

k.prototype._init = function() {
  var dt = getDeviceType();

  this.sdata = {};
  this.sdata.dot = {};

  initParameter.call(this); // 初始化参数
  initLayer.call(this); // 初始化各个层

  initDrawRegion.call(this); // 计算绘制区域

  initIndexDOM.popWin.call(this); // 信息浮动窗
  initIndexDOM.cmfb.call(this); // 筹码分布

  var show = this.options.show;

  if (!this.options.cyq) {
    // 当存在筹码分布就不显示主图指标
    initIndexDOM.main.call(this); // 主图指标
  }
  if (show.index) {
    initIndexDOM.technology.call(this); // 技术指标
  }
  if (show.minimap) {
    initIndexDOM.miniMap.call(this); // 缩略图
  }

  var cc = this.layer.layerGridC;
  // drawGrid.verticalLine(this);            // 画竖线
  drawGrid.gridK(cc, this.options); // 绘制网格 - k线
  drawGrid.gridTrading(cc, this.options); // 绘制网格 - 成交量
  if (show.index) {
    drawGrid.gridIndex(cc, this.options); // 绘制网格 - 指标
  }

  var cyqw = 0;
  if (this.option.cyq) {
    var cyq = this.option.cyq;
    cyqw = cyq.width + (cyq.gap || 10);
  }
  //watermark.call(this, 0, cyqw); // 水印

  // 判断设备类型
  if (dt == 1) {
    var sb = new sildebarForIpad(this); // 缩略图
    this.slidebar = sb;
    this.interactive = new interactiveForIpad(this);
  } else {
    this.interactive = new interactive(this); // 交互
    var sb = new slidebar(this); // 缩略图
    this.slidebar = sb;
  }

  var ops = this.options;
  this.loading = new loading({
    width: ops.width,
    height: ops.height,
    bgColor: ops.color.background,
    ui: this.layer.layerUI,
  });
};

k.prototype.load = function() {
  var ops = this.options;

  var load = new loading2({
    cc: this.layer.layerLoadingC,
    width: ops.width,
    height: ops.height,
  });
  load.start();
};

k.prototype._clear = function() {
  var root = document.querySelector(this.options.container);
  root.innerHTML = "";
  // root.removeChild(root.querySelector(".__ui"));
  // root.removeChild(root.querySelector(".__canvas"));
  root.className = root.className.replace("__emchatrs3_root_box", "");
};

// 清除所有canvas中绘制的内容
k.prototype._clearCanvas = function() {
  var layer = this.layer;
  var ops = this.options;
  for (var i = 0; i < layer.length; i++) {
    var temp = layer[i];
    if (temp.lineCap) {
      temp.clearRect(0, 0, ops.width, ops.height);
    }
  }
};

// 在首次draw的情况下
/**
 * 在 拖动的时候绘制 | 首次绘制 | redraw绘制
 */
k.prototype.draw = function() {
  this.options.isdraw = true;
  var _this = this;

  var cyq = this.options.cyq || {};

  try {
    var stauts = this.stauts;

    this.slidebar.drawFullData();

    // 绘制k线区域
    new drawBlockK(this).draw();

    // 绘制k线区域的均线
    new drawIndexsV(this).draw(stauts.indexv);
    drawTitle.titleK(this); // 最后一笔的均线标题

    // 绘制成交量区域
    new drawBlockTrading(this).draw();
    drawTitle.titleTrading(this); // 最后一笔的均线标题

    // 绘制指标H
    if (this.options.show.index) {
      var cc = this.layer.layerGridC;
      drawGrid.gridIndex(cc, this.options); // 绘制网格 - 指标
      drawGrid.verticalLine(this, 3);
      new drawIndexsH(this).draw(stauts.indexh, 1);
      drawTitle.titleIndex(this); // 绘制指标H标题
    }

    // console.time("mmmmmmm")
    // console.log(this);
    if (cyq.width) {
      drawCYQ.call(this);
    }
    // console.timeEnd("mmmmmmm")

    if (this.sdata.dot) {
      dopPoint2.call(this);
    }

    // 绘制完成的回调
    _this.options.onComplete();
  } catch (error) {
    _this.option.onError(error);
  }
};

/**
 * dur： 表示拉升/缩短k线的方向，-1表示左侧，0表示两端拉升，1表示右侧
 * bl: 拉升的比例
 */
// 拉长k线
k.prototype.elongate = function(dur, bl) {
  var ops = this.options;
  if (ops.onDragStart) {
    ops.onDragStart(ops.scale);
  }
  extensionAPI.elongate.call(this, dur, bl);
  if (ops.onDragEnd) {
    ops.onDragEnd(ops.scale);
  }
};

// 缩短k线
k.prototype.shorten = function(dur, bl) {
  var ops = this.options;
  if (ops.onDragStart) {
    ops.onDragStart(ops.scale);
  }
  extensionAPI.shorten.call(this, dur, bl);
  if (ops.onDragEnd) {
    ops.onDragEnd(ops.scale);
  }
};

k.prototype.setOption = function(ops) {
  this._clear();

  this.option = extend(this.option, ops);

  this._init();

  dataFormat.formatK.call(this); // 格式化数据
  dataSplit.slice.call(this);
};

k.prototype.setData = function(data, option) {
  if (!this.sdata) {
    this.sdata = {};
  }

  if (data.k) {
    this.sdata.k = data.k;
  }
  if (data.dot) {
    // this.sdata.dot = data.dot;    // 打点数据
    for (var key in data.dot) {
      this.sdata.dot[key] = data.dot[key];
    }
    dotPointFormat.call(this);
  }

  // if (this.options.show.cqcx) {
  //     // cqcx.call(this);
  // }

  this.options = extend(this.options, option);

  dataFormat.formatK.call(this); // 格式化数据
  dataSplit.slice.call(this);

  var cyqpar = this.option.cyq;
  if (cyqpar) {
    var accuracyFactor = cyqpar.accuracyFactor || 150;
    var range = cyqpar.range || 120;
    var cyqCalc = new cyq(this.data.ks, accuracyFactor, range);
    this.cyqCalc = cyqCalc;
  }
};

k.prototype.getData = function() {
  var stauts = this.stauts;
  var datas = this.options.scale;
  var idxs = {};
  idxs[stauts.indexv] = datas.indexs[stauts.indexv];
  idxs[stauts.indexh] = datas.indexs[stauts.indexh];
  idxs.VAVERAGE = datas.indexs.VAVERAGE;
  var res = {
    data: datas.data,
    indexs: idxs,
  };
  return res;
};

//

k.prototype.getThisIndex = function() {
  return this.options.thisData;
};

k.prototype.getBoundingRect = function() {
  var pad = this.options.padding;
  var kr = this.options.drawRegion.k;
  return {
    left: pad.left,
    right: pad.right,
    top: pad.top + kr.mt + kr.top,
    bottom: pad.bottom,
  };
};

k.prototype.start = function(isCover) {
  this.loading.start(isCover);
};

k.prototype.stop = function() {
  this.loading.stop();
};

module.exports = k;

//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k2.js
// module id = 156
// module chunks = 0

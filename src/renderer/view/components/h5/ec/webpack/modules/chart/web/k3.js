
/**
 * k线图
 * @param {any} option 
 */

var tools = require("../common/tools");
var qtjsonp = require("../common/qtjsonp");
var merge = require("lodash").merge;


var initParameter = require("./k3/init/initParameter");
var initLayer = require("./k3/init/initLayer");
var initIndexDOM = require("./k3/init/initIndexDOM");             // 指标dom
var initDrawRegion = require("./k3/init/drawRegion");
var registered = require("./k3/registered");

var getdata = require("./k3/getdata");
var draw = require("./k3/draw");


var dataFormat = require("./k3/dataFormat");
var dataSplit = require("./k3/dataSplit");


var loading = require("../common/loadingImg");
var loading2 = require("../common/loading");
var watermark = require("chart/common/watermark");       // 水印

var drawGrid = require("./k3/drawGrid");
var drawlien = require("chart/common/drawLine");
var drawBlockK = require("./k3/drawBlockK");
var drawBlockTrading = require("./k3/drawBlockTrading");
var drawIndexsV = require("./k3/drawIndexsV");       // 指标5
var drawIndexsH = require("./k3/drawIndexsH");       // 指标H
var drawTitle = require("./k3/drawTitle");
var dopPoint = require("./k3/dotPoint");             // 打点
var dopPoint2 = require("./k3/dotPoint2");             // 打点
var drawCYQ = require("./k3/drawCYQ");          // 筹码分布
var dotPointFormat = require("./k3/dotPointFormat");     // 

var getConvert = require("chart/common/getConvert");     // 计算各种指标
var arrayExt = require("chart/common/arrayExtension");

var interactive = require("./k3/interactive");
var interactiveForIpad = require("./k3/interactiveForIpad");
var slidebar = require("./k3/sildebar");
var sildebarForIpad = require("./k3/sildebarForIpad");

var extend = require("chart/common/extend2");
var ext = require("lodash").merge;

var loadimgs = require("./k3/loadimgs");

var extensionAPI = require("./k3/extensionAPI");     // 扩展api的实现

var getDeviceType = require("../common/getDeviceType");

var cyqmod = require("../common/cyq");
var cqcx = require("../common/cqcx");       // 除权除息
// var setCode = require("./k3/setCode");


function k(option) {
    this.option;        // 用户设置

    registered.call(this);


    // k2
    var _this = this;
    this.option = option;
    this.options = {};


    try {
        this._init();
    } catch (error) {
        option.onError(error);
    }

}

k.prototype._init = function () {

    loadimgs.call(this);
    
    var dt = getDeviceType();
    var show = this.options.show;

    this.sdata = {};
    this.sdata.dot = {};

    initParameter.call(this);       // 初始化参数
    initLayer.call(this);           // 初始化各个层

    initDrawRegion.call(this);          // 计算绘制区域

    initIndexDOM.popWin.call(this);            // 信息浮动窗
    initIndexDOM.cmfb.call(this);              // 筹码分布

    var show = this.options.show;

    if (!this.options.cyq) { // 当存在筹码分布就不显示主图指标
        initIndexDOM.main.call(this);               // 主图指标
    }
    if (show.index) {
        initIndexDOM.technology.call(this);         // 技术指标
    }
    if (show.minimap) {
        initIndexDOM.miniMap.call(this);            // 缩略图
    }

    var cc = this.layer.layerGridC;
    // drawGrid.verticalLine(this);            // 画竖线
    drawGrid.gridK(cc, this.options);                  // 绘制网格 - k线
    drawGrid.gridTrading(cc, this.options);            // 绘制网格 - 成交量
    if (show.index) {
        drawGrid.gridIndex(cc, this.options);              // 绘制网格 - 指标
    }

    var cyqw = 0;
    if (this.option.cyq) {
        var cyq = this.option.cyq;
        cyqw = cyq.width + (cyq.gap || 10);
    }
    watermark.call(this, 0, cyqw);               // 水印

    // 判断设备类型
    // if (dt == 1) {
    //     var sb = new sildebarForIpad(this);     // 缩略图
    //     this.slidebar = sb;
    //     this.interactive = new interactiveForIpad(this);
    // } else {
    // }
    this.interactive = new interactive(this);      // 交互

    if (show.minimap) {
        var sb = new slidebar(this);     // 缩略图
        this.slidebar = sb;
    }


    var ops = this.options;
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: ops.color.background,
        ui: this.layer.layerUI
    });

}


k.prototype.load = function () {
    var ops = this.options;

    var load = new loading2({
        cc: this.layer.layerLoadingC,
        width: ops.width,
        height: ops.height
    });
    load.start();
}



k.prototype.__draw = function () {
    this.options.isdraw = true;
    var _this = this;


    draw.call(this, {
        grid: true,     // K网格
        k: true,     // k线
        linev: true,     // 主图指标
        trading: true,     // 成交量
        lineh: true,     // 下面的指标
        title: true,     // 标题
    });

    // new drawBlockK(this).draw();
    // var cyq = this.options.cyq || {};
    // try {
    //     var stauts = this.stauts;

    //     this.slidebar.drawFullData();

    //     // 绘制k线区域
    //     new drawBlockK(this).draw();

    //     // 绘制k线区域的均线
    //     new drawIndexsV(this).draw(stauts.indexv);
    //     drawTitle.titleK(this);     // 最后一笔的均线标题

    //     // 绘制成交量区域
    //     new drawBlockTrading(this).draw();
    //     drawTitle.titleTrading(this);     // 最后一笔的均线标题

    //     // 绘制指标H
    //     if (this.options.show.index) {
    //         var cc = this.layer.layerGridC;
    //         drawGrid.gridIndex(cc, this.options);              // 绘制网格 - 指标
    //         drawGrid.verticalLine(this, 3);
    //         new drawIndexsH(this).draw(stauts.indexh, 1);
    //         drawTitle.titleIndex(this);     // 绘制指标H标题
    //     }

    //     // console.time("mmmmmmm")
    //     // console.log(this);
    //     if (cyq.width) {
    //         drawCYQ.call(this);
    //     }
    //     // console.timeEnd("mmmmmmm")

    //     if (this.sdata.dot) {
    //         dopPoint2.call(this);
    //     }

    //     // 绘制完成的回调
    //     _this.options.onComplete();
    // } catch (error) {
    //     _this.option.onError(error);
    // }
}


/**
 * dur： 表示拉升/缩短k线的方向，-1表示左侧，0表示两端拉升，1表示右侧
 * bl: 拉升的比例
 */
// 拉长k线
k.prototype.elongate = function (dur, bl) {
    var ops = this.options;
    if (ops.onDragStart) {
        ops.onDragStart(ops.scale);
    }
    extensionAPI.elongate.call(this, dur, bl);
    if (ops.onDragEnd) {
        ops.onDragEnd(ops.scale);
    }
}

// 缩短k线
k.prototype.shorten = function (dur, bl) {
    var ops = this.options;
    if (ops.onDragStart) {
        ops.onDragStart(ops.scale);
    }
    extensionAPI.shorten.call(this, dur, bl)
    if (ops.onDragEnd) {
        ops.onDragEnd(ops.scale);
    }
}


k.prototype.setStock = function (stock) {
    this.stock = merge(this.stock, stock);

    this.getData();
}


k.prototype.setDot = function (dots) {
    if (dots) {
        this.sdata.dot = {};
        // this.sdata.dot = data.dot;    // 打点数据
        for (var key in dots) {
            this.sdata.dot[key] = dots[key];
        }
        // dotPointFormat.call(this);
    }
}

k.prototype.setYLZC = function (dots) {
    if (dots) {
        this.sdata.ylzc = dots;
    }
}


k.prototype.getData = function () {
    getdata.call(this);
}



module.exports = k;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3.js
// module id = 176
// module chunks = 0
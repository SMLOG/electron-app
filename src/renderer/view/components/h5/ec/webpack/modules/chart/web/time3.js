var initParameter = require("./time3/init/initParameter");
var initLayer = require("./time3/init/initLayer");
var initTips = require("./time3/init/initTips");
var initTechnology = require("./time3/init/initTechnology");
var initTechnologyForIpad = require("./time3/init/initTechnologyForIpad");

var dataFormat = require("./time3/dataFormat");
var formatOptions = require("./time3/formatOptions");

var drawGrid = require("./time3/drawGrid");
var drawScale = require("./time3/drawScale");
var drawTitle = require("./time3/drawTitle");
var drawLine = require("./time3/drawLine");
var drawTrading = require("./time3/drawTrading");
var drawIndicator = require("./time3/drawIndicator");
var drawTimeLine = require("./time3/drawTimeLine");
var drawBefore = require("./time3/drawBefore");

var dotPoint = require("./time3/dotPoint");
var dotPoint2 = require("./time3/dotPoint2");
var dotPointFormat = require("./time3/dotPointFormat");     // 


var drawPositionChange = require("./time3/drawPositionChange");
var drawPositionChangeForIpad = require("./time3/drawPositionChangeForIpad");
var watermark = require("chart/common/watermark3");       // 水印
var extend = require("chart/common/extend2");

var interactive = require("./time3/interactive");
var interactiveForIpad = require("./time3/interactiveForIpad");
var loading = require("../common/loadingImg");

var interfaceFormat = require("./time3/interfaceFormat");

var gdt = require("../common/getDeviceType");
var setCode = require("./time3/setCode");



function time(option) {
    var _this = this;
    // this.option = extend({}, option) ;
    // this.options = {};

    this.op = option;       // 原始参数
    this.ops = {};          // 计算后的参数
    this.sdata = {};        // 原始数据
    this.fdata = {};        // 格式化之后的数据

    this.indicatorStauts = "RSI";

    try {
        this._init();
    } catch (error) {
        if (option.onError) {
            option.onError(error);
            _this._error = true;
        }
    }
}


time.prototype._init = function () {
    initParameter.call(this);       // 初始化参数
    initLayer.call(this);
    initTips.call(this);

    var dt = gdt();
    
    // dataFormat.call(this);
    formatOptions.call(this);
    
    if (this.ops.show.indicatorArea) {
        if (dt== 1) {
            initTechnologyForIpad.call(this);
        } else {
            initTechnology.call(this);
        }
    }

    if (dt == 1) {
        new interactiveForIpad(this);
    } else {
        new interactive(this);
    }

    // drawTimeLine.call(this);
    new drawGrid(this);

    watermark.call(this, 10, 30);               // 水印

    var ops = this.ops;
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: ops.color.background,
        ui: this.layer.layerUI
    });
}


time.prototype._format = function () {

}

time.prototype.draw = function () {
    console.log("ddddddddddddddddddddddddddd");
    try {
        dataFormat.call(this);
        formatOptions.call(this);

        drawTimeLine.call(this);
        drawBefore.call(this);
        this.drawGrid = new drawGrid(this);
        new drawScale(this);
        new drawTitle(this);
        new drawLine(this);

        if (this.options.show.tradingArea) {
            new drawTrading(this);
        }

        if (this.options.show.indicatorArea && this.option.data.datak) {
            this.indicator = new drawIndicator(this);
        }

        // 盘口异动
        if (gdt() == 1) {
            drawPositionChangeForIpad.call(this);
        } else {
            drawPositionChange.call(this);
        }

        // dotPoint.call(this);       
        dotPoint2.call(this);      

        this.options.onComplete();
    } catch (error) {
        this.ops.onError(error)
    }
}



/**
 * 设置数据
 *
 * @param {Object} data ： 各种数据
 * @param {Boolean} clearOld ： 是否清空老的数据， 默认不清空
 */
time.prototype.setData = function (data, clearOld) {
    var sdata = this.sdata;

    // 清空老数据
    if (clearOld) {
        sdata = {};
    }
    
    // 分时数据
    if (data.time) {
        sdata.time = data.time;
        // var res = interfaceFormat(data.time);
        // if (res) {
        //     this.option.data.time = res.time;         
        //     this.sdata.time = res.time;
        //     this.option.data.datak = res.k;
        // } else {
        //     this.option.data.time = data.time;
        //     this.sdata.time = data.time;
        // }
    }

    // 盘口异动
    if (data.positionChanges) {
        this.option.data.positionChanges = data.positionChanges;
    }

    // 打点
    if (data.dot) {
        this.option.data.dot = data.dot;
        this.sdata.dot = data.dot;    // 打点数据
        dotPointFormat.call(this);
    }

    // 用于计算指标的k数据
    if (data.k) {
        sdata.k = data.k;
    }

    console.log(this);
}


time.prototype.setCode = function(ops){
    setCode.call(this, ops);
}


time.prototype.redraw = function () {
    // console.log("redraw开始...");
    // console.time("redraw耗时：");
    this._clear();
    // dataFormat.call(this);
    // formatOptions.call(this);
    // console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    this.draw();
    // console.log("redraw结束...");
    // console.timeEnd("redraw耗时：");
}


time.prototype._clear = function () {
    var w = this.option.width;
    var h = this.option.height;
    var layerGridC = this.layer.layerGridC;
    layerGridC.clearRect(0, 0, w, h);

    var positionChanges = this.layer.positionChanges;
    positionChanges.innerHTML = "";
    // __positionChanges

}


time.prototype.getInfo = function () {
    return this.data.info;
}

time.prototype.getData = function () {
    return this.data.data;
}

time.prototype.getBoundingRect = function () {
    var pad = this.options.padding;
    var kr = this.options.areaTime
    return {
        left: pad.left,
        right: pad.right,
        top: kr.starty,
        bottom: pad.bottom
    }
}


time.prototype.start = function (isCover) {
    this.loading.start(isCover);
}

time.prototype.stop = function () {
    this.loading.stop();
}

module.exports = time;





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3.js
// module id = 303
// module chunks = 0
var initParameter = require("./time/init/initParameter");
var initLayer = require("./time/init/initLayer");
var initTips = require("./time/init/initTips");
var initTechnology = require("./time/init/initTechnology");
var initTechnologyForIpad = require("./time/init/initTechnologyForIpad");

var dataFormat = require("./time/dataFormat");
var formatOptions = require("./time/formatOptions");

var drawGrid = require("./time/drawGrid");
var drawScale = require("./time/drawScale");
var drawTitle = require("./time/drawTitle");
var drawLine = require("./time/drawLine");
var drawTrading = require("./time/drawTrading");
var drawIndicator = require("./time/drawIndicator");
var drawTimeLine = require("./time/drawTimeLine");
var drawBefore = require("./time/drawBefore");

var dotPoint = require("./time/dotPoint");
var dotPoint2 = require("./time/dotPoint2");
var dotPointFormat = require("./time/dotPointFormat");     // 


var drawPositionChange = require("./time/drawPositionChange");
var drawPositionChangeForIpad = require("./time/drawPositionChangeForIpad");
var watermark = require("chart/common/watermark");       // 水印
var extend = require("chart/common/extend2");

var interactive = require("./time/interactive");
var interactiveForIpad = require("./time/interactiveForIpad");
var loading = require("../common/loadingImg");

var interfaceFormat = require("./time/interfaceFormat");

var gdt = require("../common/getDeviceType");
var setCode = require("./time/setCode");



function time(option) {
    var _this = this;
    this.option = extend({}, option);
    this.options = {};

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

    if (this.options.show.indicatorArea) {
        if (dt == 1) {
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

    watermark.call(this, 20);               // 水印

    var ops = this.options;
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: ops.color.background,
        ui: this.layer.layerUI
    });
}


time.prototype.draw = function () {

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
        this.drawGrid = new drawGrid(this);
        this.options.onError(error)
    }
}


time.prototype.setData = function (data) {
    console.info(33333333333)
    console.info(data)
    // console.log("setData开始...");
    // console.time("setData耗时：");

    if (!this.sdata) {
        this.sdata = {};
    }

    if (!this.option.data) {
        this.option.data = {};
    }
    if (!this.option.data.positionChanges) {
        this.option.data.positionChanges = [];
    }
    if (data.time) {
        var res = interfaceFormat(data.time);
        console.info(444)
        console.info(res)

        if (res) {
            this.option.data.time = res.time;
            this.sdata.time = res.time;
            this.option.data.datak = res.k;
        } else {
            this.option.data.time = data.time;
            this.sdata.time = data.time;
        }
    }
    if (data.positionChanges) {
        this.option.data.positionChanges = data.positionChanges;
    }
    if (data.dot) {
        this.option.data.dot = data.dot;
        this.sdata.dot = data.dot;    // 打点数据
        dotPointFormat.call(this);
    }
    if (data.datak) {
        this.option.data.datak = data.datak;
    }

    // dataFormat.call(this);
    // formatOptions.call(this);

    // console.log("setData结束...");
    // console.timeEnd("setData耗时：");
}


time.prototype.setCode = function (ops) {
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
// ./modules/chart/web/time.js
// module id = 253
// module chunks = 0
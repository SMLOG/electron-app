/**
 * k线图
 * @param {any} option 
 */
var watermark = require("chart/common/watermark");       // 水印
var initParameter = require("./timemini/init/initParameter");
var initLayer = require("./timemini/init/initLayer");
var initMiniPopWin = require("./timemini/init/initMiniPopWin");

var dataFormat = require("./timemini/dataFormat");

var drawGrid = require("./timemini/drawGrid");
var getData = require("./timemini/getData");
var getData2 = require("./timemini/getData2");

var drawTime = require("./timemini/drawTime");
var drawTimeLine = require("./timemini/drawTimeLine");
var drawTitle = require("./timemini/drawTitle");
var drawAVG = require("./timemini/drawAVG");
var goBigImg = require("./kmini/goBigImg");

var interactive = require("./timemini/interactive");
var loading = require("../common/loadingImg");


var _this;

function timemini(option) {
    var _this = this;
    this.option = option;
    this.options = {};

    this.__init();
}


timemini.prototype.__init = function () {
    _this = this;
    initParameter.call(this);
    initLayer.call(this);
    initMiniPopWin.call(this);

    drawGrid.call(this);
    drawTimeLine.call(this);
    watermark.call(this, this.options.textHeight.head - 8);

    var ops = this.options;
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: ops.color.background,
        ui: this.layer.layerUI
    });
}


// 数据获取完毕
timemini.prototype.__onDataSuccess = function (json, chart) {
    if (!chart.option.data) {
        chart.option.data = {};
    }
    chart.option.data = json;
    chart.__start(json);
}

timemini.prototype.draw = function (ops) {
    // new getData(this);
    var ops = {
        secid: this.option.code || "",
        ut: this.option.token || "",
        sc: this.option.sc || "",
        sm: this.option.sm || "",
        isqhquote: this.option.isqhquote || ""
        // secid: this.option.secid || "",
    }
    new getData2(this, ops);
}


timemini.prototype.__start = function () {
    try {
        dataFormat.format.call(this);
        new drawTime(this).draw();
        
        var show = this.options.show;
        if (show.title) {
            var last = this.data.time;
            last = last[last.length - 1];
            // drawTitle.title.call(this);
            drawTitle.change2.call(this, last);
        }
        
        drawAVG.call(this);
        goBigImg.call(this);
        new interactive(this);
        this.stop();

        if (this.options.onComplete) {
            this.options.onComplete();
        }
        
    } catch (error) {
        this.stop();
        this.options.onError(error);
    }

}


timemini.prototype.redraw = function () {
    this.draw();
}


timemini.prototype.start = function(isCover){
    this.loading.start(isCover);
}

timemini.prototype.stop = function(){
    this.loading.stop();
}

module.exports = timemini;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini.js
// module id = 340
// module chunks = 0
/**
 * 资金流mini图
 * @param {*} option ： 参数
 */

var initParameter = require("./fundmini/init/initParameter");
var initLayer = require("./fundmini/init/initLayer");
var initMiniPopWin = require("./fundmini/init/initMiniPopWin");

var drawGrid = require("./fundmini/drawGrid");
var dataFormat = require("./fundmini/dataFormat");

var drawYAxis = require("./fundmini/drawYAxis");
var drawLine = require("./fundmini/drawLine");
var drawTitle = require("./fundmini/drawTitle");
var drawTimeline = require("./fundmini/drawTimeline");

var interactive = require("./fundmini/interactive");
var goBigImg = require("./kmini/goBigImg");

var watermark = require("chart/common/watermark");       // 水印
var extend = require("chart/common/extend2");

var loading = require("../common/loadingImg");

function fundmini(option) {
    this.option = option;
    this.__init();
}


fundmini.prototype.__init = function () {
    this.data = {
        title: "",
        subfix: "",
    };
    initParameter.call(this);
    initLayer.call(this);
    initMiniPopWin.call(this);

    drawGrid.call(this);
    goBigImg.call(this);

    new interactive(this);

    watermark.call(this);               // 水印

    var ops = this.options;
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: ops.color.background,
        ui: this.layer.layerUI
    });
}


fundmini.prototype.setData = function (data) {
    this.data = extend(this.data, data);
    dataFormat.call(this);
}


fundmini.prototype.draw = function () {
    this.__clear();
    drawGrid.call(this);
    drawYAxis.call(this);
    drawLine.call(this);
    drawTitle.call(this);
    drawTimeline.call(this);
}


fundmini.prototype.__clear = function () {
    var layer = this.layer;
    var ops = this.options;

    var ccs = [
        layer.layerGridC,
        layer.layerLineC,
        layer.layerTextC
    ]

    for (var i = 0, len = ccs.length; i < len; i++) {
        ccs[i].clearRect(0, 0, ops.width, ops.height);
    }
}

fundmini.prototype.start = function (isCover) {
    this.loading.start(isCover);
}

fundmini.prototype.stop = function () {
    this.loading.stop();
}

module.exports = fundmini;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini.js
// module id = 373
// module chunks = 0
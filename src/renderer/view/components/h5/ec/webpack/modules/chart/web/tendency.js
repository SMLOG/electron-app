var dateFormat = require("./tendency/dataFormat");
var initParameter = require("./tendency/init/initParameter");
var initLayer = require("./tendency/init/initLayer");
var ininPopWin = require("./tendency/init/ininPopWin");

var drawGird = require("./tendency/drawGird");
var drawLines = require("./tendency/drawLines");

var interactive = require("./tendency/interactive");

var watermark = require("chart/common/watermark");
var loading = require("../common/loadingImg");


function tendency(option){
    this.option = option;
    this.options = {};

    try {
        this._init();
    } catch (error) {
        if (this.option.onError) {
            this.option.onError(error);
        }
    }
}


tendency.prototype._init = function(){
    initParameter.call(this);
    initLayer.call(this);
    watermark.call(this);
    
    ininPopWin.call(this);
    dateFormat.call(this);
    new interactive(this);

    var ops = this.options;
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: ops.color.background,
        ui: this.layer.layerUI
    });

    drawGird.call(this);
}


tendency.prototype.draw = function(){
    try {
        drawGird.call(this);
        new drawLines(this).draw();
        if (this.option.onComplete) {
            this.option.onComplete();
        }
    } catch (error) {
        if (this.option.onError) {
            this.option.onError(error);
        }
    }
}


tendency.prototype.redraw = function(){
    this.draw();
}


tendency.prototype.setData = function(data){
    if (data.line !== undefined) {
        this.option.data.line = data.line;
    }
    if (data.points !== undefined) {
        this.option.data.points = data.points;
    }
    dateFormat.call(this);
}


tendency.prototype.start = function(isCover){
    this.loading.start(isCover);
}

tendency.prototype.stop = function(){
    this.loading.stop();
}

module.exports = tendency;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency.js
// module id = 354
// module chunks = 0
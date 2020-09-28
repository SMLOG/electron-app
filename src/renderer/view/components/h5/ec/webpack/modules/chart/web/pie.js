
var initParameter = require("./pie/init/initParameter");
var initLayer = require("./pie/init/initLayer");
var initPopWin = require("./pie/init/initPopWin");

// var extend = require("lodash/extend");

var extend = require("../common/extend2")

// var defaultData = require("./pie/defaultData");
var setting = require("./pie/defaultSetting");

var draw = require("./pie/draw");
var draw2 = require("./pie/draw2");
var interactive = require("./pie/interactive");
var loading = require("../common/loadingImg");

var watermark = require("chart/common/watermark");       // 水印



function pie(option){
    this.__init(option);
}


pie.prototype.__init = function(option){
    initParameter.call(this, option);
    initLayer.call(this);
    initPopWin.call(this);
    new interactive(this);

    var ops = this.options;
    watermark.call(this, (ops.height - 45));
    
    this.loading = new loading({
        width: ops.width,
        height: ops.height,
        bgColor: "#ffffff",
        ui: this.layer.layerUI
    });

}


pie.prototype.setData = function(data){
    this.data = data;

    draw(this);
}

pie.prototype.draw = function(){
    draw(this);
}

pie.prototype.setOptions = function(){
    
}

pie.prototype.start = function (isCover) {
    this.loading.start(isCover);
}

pie.prototype.stop = function () {
    this.loading.stop();
}

module.exports = pie;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/pie.js
// module id = 398
// module chunks = 0
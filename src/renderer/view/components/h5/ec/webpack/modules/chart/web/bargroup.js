var defaultData = require("./bargroup/defaultData");
var setting = require("./bargroup/defaultSetting");

var extend = require("lodash/extend");


var initParameter = require("./bargroup/init/initParameter");
var initLayer = require("./bargroup/init/initLayer");
var initPopWin = require("./bargroup/init/initPopWin");

var draw = require("./bargroup/draw/index");

var interactive = require("./bargroup/interactive");
var watermark = require("chart/common/watermark");       // 水印

function bargroup(option){
    this.__init(option);
}


bargroup.prototype.__init = function(option){
    initParameter.call(this, option);
    initLayer.call(this);
    initPopWin.call(this);
    new interactive(this);

    watermark.call(this);
}


bargroup.prototype.setData = function(data){
    this.datas = data;
}


bargroup.prototype.draw = function(){
    console.log("11111");
    draw(this);

}


module.exports = bargroup;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup.js
// module id = 406
// module chunks = 0
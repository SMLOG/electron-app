var initParameter = require("./bar/init/initParameter");
var initLayer = require("./bar/init/initLayer");
var ininPopWin = require("./bar/init/ininPopWin");
var calcDrawRegion = require("./bar/init/calcDrawRegion");
var calcYSplit = require("./bar/init/calcYSplit");

var drawBox = require("./bar/drawBox");
var drawBar = require("./bar/drawBar");

var interactive = require("./bar/interactive");
var watermark = require("chart/common/watermark");

function bar(option){
    var _this = this;
    this.option = option;

    try {
        initParameter.call(this);
        calcDrawRegion.call(this);
        calcYSplit.call(this);
        
        initLayer.call(this);    
        ininPopWin.call(this);
        watermark.call(this);
    } catch (error) {
        _this._error = true;
        if (this.option.onError) {
            this.option.onError(error);
        }
    }
}

bar.prototype.draw = function(){
    if (this._error) {
        return false;
    }
    try {
        drawBox.call(this);
        new drawBar(this).draw();
        new interactive(this);

        if (this.option.onComplete) {
            this.option.onComplete();
        }
    } catch (error) {
        if (this.option.onError) {
            this.option.onError(error);
        }
    }

    
}


module.exports = bar;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar.js
// module id = 363
// module chunks = 0
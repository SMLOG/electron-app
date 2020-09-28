/**
 * k线图
 * @param {any} option 
 */
var watermark = require("chart/common/watermark");       // 水印
var initParameter = require("./kmini/init/initParameter");
var initLayer = require("./kmini/init/initLayer");
var initMiniPopWin = require("./kmini/init/initMiniPopWin");

var dataFormat = require("./kmini/dataFormat");

var drawGrid = require("./kmini/drawGrid");
var getData = require("./kmini/getData");

var drawk = require("./kmini/drawK");
var drawTitle = require("./kmini/drawTitle");
var drawCMA = require("./kmini/drawCMA");
var goBigImg = require("./kmini/goBigImg");

var interactive = require("./kmini/interactive");
var loading = require("../common/loadingImg");


// var _this;


function Chart(opt) {

    function kmini(option) {
        var _this = this;
        this.option = option;
        this.options = {};

        this.__init();
    }


    kmini.prototype.__init = function () {
        _this = this;
        initParameter.call(this);
        initLayer.call(this);
        initMiniPopWin.call(this);

        drawGrid.call(this);
        watermark.call(this, this.options.textHeight.head - 8);               // 水印

        var ops = this.options;
        this.loading = new loading({
            width: ops.width,
            height: ops.height,
            bgColor: ops.color.background,
            ui: this.layer.layerUI
        });
    }


    kmini.prototype.__clear = function () {
        var root = document.querySelector(this.options.container);
        root.innerHTML = "";
        root.className = root.className.replace("__emchatrs3_root_box", "");
    }

    // 数据获取完毕
    kmini.prototype.__onDataSuccess = function (json, _this) {
        // console.info(json)
        if (!_this.option.data) {
            _this.option.data = {};
        }
        _this.option.data.k = json;
        _this.__start();
    }

    kmini.prototype.draw = function () {
        new getData(this)
    }


    kmini.prototype.__start = function () {
        try {
            dataFormat.formatK.call(this);
            new drawk(this).draw();

            var show = this.options.show;
            if (show.title) {
                drawTitle.ma.call(this);
                drawTitle.titleK.call(this);
            }
            drawCMA.call(this);
            goBigImg.call(this);
            new interactive(this);

            this.stop();

            if (this.options.onComplete) {
                this.options.onComplete();
            }
            
        } catch (error) {
            this.options.onError();
        }
    }


    kmini.prototype.redraw = function (type) {
        this.options.type = (type || "K");
        this.draw();
    }

    kmini.prototype.start = function(isCover){
        this.loading.start(isCover);
    }
    
    kmini.prototype.stop = function(){
        this.loading.stop();
    }

    return new kmini(opt);
}






module.exports = Chart;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini.js
// module id = 330
// module chunks = 0


var imgyl = require("../../../images/ylzc_down.png");
var imgzc = require("../../../images/ylzc_up.png");


module.exports = function(){
    var that = this;

    var imgs = {};

    var nyl = new Image();
    nyl.width = 7;
    nyl.height = 12;
    nyl.src = imgyl;
    nyl.onload = function () {
        imgs.yl = nyl;
    }

    var nzc = new Image();
    nzc.width = 7;
    nzc.height = 12;
    nzc.src = imgzc;
    nzc.onload = function () {
        imgs.zc = nzc;
    }
    
    this.imgs = imgs;
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/loadimgs.js
// module id = 231
// module chunks = 0
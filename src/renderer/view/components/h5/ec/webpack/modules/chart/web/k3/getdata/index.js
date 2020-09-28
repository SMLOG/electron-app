/**
 * 用于内部获取数据
 * 
 */

// var quota = require("../../../common/quota");
var getConvert = require('../../../common/getConvert2');
var fk = require("../format/fk");
var fmpa = require('../format/fmap');
var slice = require("../slice");
var getk = require("./getk");
var getminimap = require("./getminimap");
var quota = require("../format/quota");
var savedata = require("../format/savedata");
var dotPointFormat = require("../dotPointFormat");


module.exports = function () {
    var that = this;

    var params = Object.assign({}, this.stock);
    var getdataing = this.getdataing;

    var start;
    var end;
    if (getdataing.year) {
        end = getdataing.year - 1;
        start = getdataing.year - 3;
    } else {
        var year = new Date().getFullYear();
        end = year + 1;
        start = (year - 2);
    }
    params.start = start + "0101";
    params.end = end + "0101";
    getdataing.year = start;


    getk(params)
        .then(function (data) {
            // console.log(data);
            if (data.error === "") {
                // 耗时的处理
                setTimeout(function () {

                    savedata.call(that, data);  // 有规则的保存数据

                    fk.call(that);        // 格式化数据

                    dotPointFormat.call(that);

                    // 计算指标
                    quota.call(that);

                    // var fdata = that.fdata;
                    // fdata.quota["VAVERAGE"] = getConvert("VAVERAGE", fdata.fk.fkdata);      // 成交量均线
                    // fdata.quota[status.v] = getConvert(status.v, fdata.fk.fkdata);
                    // fdata.quota[status.h] = getConvert(status.h, fdata.fk.fkdata);

                    // 截取数据
                    slice.call(that);

                    // that.slidebar.updateByScale();
                    
                    // 开始绘制
                    that.__draw();
                    // console.log(that);
                }, 1);

                return getminimap(that.stock, data.total);
            } else {
                window["console"].error("异常:" + data.error);
            }
        })
        .then(function (minidata) {
            // 获取缩略图的数据
            if (minidata.error === "") {
                fmpa.call(that, minidata);
            } else {
                window["console"].error("异常:" + data.error);
            }
        })
        .then(function(){
            // 获取剩余所有数据
            var slidebar = that.slidebar;
            if (slidebar) {
                slidebar.getData2();
            }
            
        });

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/getdata/index.js
// module id = 194
// module chunks = 0
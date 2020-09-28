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
    // var getdataing = this.getdataing;

    var stock = this.stock;


    var start;
    var end;
    var year = new Date().getFullYear();
    end = year + 1;
    start = (year - 2);
    params.beg = start + "0101";
    params.end = end + "0101";


    getk(params)
        .then(function (data) {
           
            // console.log(data);
            if (data.rc == 0 && data.data) {
                // 耗时的处理
                // setTimeout(function () {
                var dd = data.data;

                that.sdata.kdata = [];
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
                console.info(that)

                // that.slidebar.updateByScale();

                // 开始绘制
                //that.__draw();
                // return false
                // console.log(that);
                // }, 1);

                if (stock.klt == 5 || stock.klt == 15 || stock.klt == 30 || stock.klt == 60) {
                    return data;
                } else {
                    return getminimap(that.stock, data.data.dktotal);
                }

            } else {
                window["console"].error("异常:" + data.error);
            }
        })
        .then(function (minidata) {
            
            // 获取缩略图的数据
            if (minidata.rc === 0 && minidata.data) {
                fmpa.call(that, minidata);
            } else {
                window["console"].error("异常:" + data.error);
            }
        })
        .then(function () {
            // 获取剩余所有数据
            var slidebar = that.slidebar;
            if (slidebar) {
                if ((stock.klt == 101 || stock.klt == 102 || stock.klt == 103)) {
                    slidebar.getData2();
                } else {
                    slidebar.updateByScale();
                }
            }

        });

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/getdata/index.js
// module id = 222
// module chunks = 0
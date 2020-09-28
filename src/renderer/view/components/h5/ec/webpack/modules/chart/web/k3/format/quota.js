/**
 * 计算各类指标
 *
 * @param {*} source: 原始数据
 * @param {*} name: 指标名称
 */


var getConvert = require("../../../common/getConvert2");


module.exports = function () {

    var fkdata = this.fdata.fk.fkdata;
    var fdata = this.fdata;

    console.log(fkdata);

    var is = ["CMA", "EXPMA", "SAR", "BOLL", "BBI", "VAVERAGE", "RSI", "KDJ", "MACD", "WR", "DMI", "BIAS"
        , "OBV", "CCI", "ROC"]

    for(var i = 0, len = is.length ; i < len ; i++){
        var name = is[i];
        fdata.quota[name] = getConvert(name, fkdata);
    }
        

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/format/quota.js
// module id = 78
// module chunks = 0
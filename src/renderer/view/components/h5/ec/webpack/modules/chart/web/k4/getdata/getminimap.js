/**
 * 获取周K 的缩略图
 */


var qtjson = require('../../../common/qtjsonp');
var query = require('../../../common/query')

module.exports = function (params, count) {
    var rnd = Math.floor(Math.random() * (99 - 1)) + 1
    // var url = "http://quoteappii.eastmoney.com/quote/get_web_dayk";
    // var url = "http://61.129.249.241:8880/cache/get_web_dayk";
    var url = "http://" + rnd + ".push2his.eastmoney.com/api/qt/stock/kline/get";

    if (query.getParam('testenv') == '2') {
            url = "http://61.129.249.233:18665/api/qt/stock/kline/get";
        }

    //var url = "http://61.152.230.207/api/qt/stock/kline/get";
    var pars = Object.assign({}, params);
    pars.beg = "19500101"
    pars.end = "20300101";
    // var year = new Date().getFullYear();
    // end = year + 1;
    // start = (year - 2);

    if (count >= 1000 && count < 5000) {
        pars.klt = 102;        // 周K 
    } else if (count >= 5000) {
        pars.klt = 103;        // 月K
    }


    pars.cb = "cb" + Date.now().toString().substr(5) + Math.floor(Math.random() * 100000 + 100000);

    return new Promise(function (resolve, reject) {
        qtjson({
            url: url,
            cbname: pars.cb,
            params: pars
        }, function (res) {
            resolve(res)
            // console.log(res);
        })
    })

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/getdata/getminimap.js
// module id = 225
// module chunks = 0
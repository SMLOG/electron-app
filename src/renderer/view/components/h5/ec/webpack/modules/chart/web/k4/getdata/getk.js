/**
 * 用来获取K线数据
 */


var qtjson = require('../../../common/qtjsonp');
var query = require('../../../common/query')

module.exports = function (params) {

    return new Promise(function (resolve, reject) {
        var rnd = Math.floor(Math.random() * (99 - 1)) + 1
        // var url = "http://quoteappii.eastmoney.com/quote/get_web_dayk";
        // var url = "http://61.129.249.241:8880/cache/get_web_dayk";
        // url = "http://61.129.249.241:8880/cache/get_web_mink"
        //var url = "http://61.152.230.207/api/qt/stock/kline/get";
        var url = "http://" + rnd + ".push2his.eastmoney.com/api/qt/stock/kline/get";
        console.info(query.getParam('testenv'))
        if (query.getParam('testenv') == '2') {
            url = "http://61.129.249.233:18665/api/qt/stock/kline/get";
        }

        var pars = Object.assign({}, params);

        pars.cb = "cb" + Date.now().toString().substr(5) + Math.floor(Math.random() * 100000 + 100000);

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
// ./modules/chart/web/k4/getdata/getk.js
// module id = 91
// module chunks = 0
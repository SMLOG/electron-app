/**
 * 用来获取K线数据
 */


var qtjson = require('../../../common/qtjsonp');

module.exports = function (params) {

    return new Promise(function (resolve, reject) {
        // var url = "http://quoteappii.eastmoney.com/quote/get_web_dayk";
        var url = "http://61.129.249.241:8880/cache/get_web_dayk";
        // url = "http://61.129.249.241:8880/cache/get_web_mink"

        if (params.period > 100) {
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
// ./modules/chart/web/k3/getdata/getk.js
// module id = 76
// module chunks = 0
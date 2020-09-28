/**
 * 获取周K 的缩略图
 */


var qtjson = require('../../../common/qtjsonp');


module.exports = function (params, count) {

    // var url = "http://quoteappii.eastmoney.com/quote/get_web_dayk";
    var url = "http://61.129.249.241:8880/cache/get_web_dayk";
    var pars = Object.assign({}, params);
    pars.end = 0;
    pars.count = 2000;
    pars.keys = "tradeday,close"

    if (count >= 1000 && count < 5000) {
        pars.period = 2;        // 周K 
    } else if (count >= 5000) {
        pars.period = 3;        // 月K
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
// ./modules/chart/web/k3/getdata/getminimap.js
// module id = 197
// module chunks = 0
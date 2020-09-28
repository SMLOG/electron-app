var jsonp = require("../../common/jsonp");



function getData(chart) {
    var _this = this;
    var code = chart.option.code;
    var token = chart.option.token;

    // jsonp([uri], [data], [custom_method_name], [callback(json)])
    var url = "http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js";
    var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 99999999);
    var data = {
        "id": code,
        "TYPE": "r",
        "rtntype": 5,
        "isCR": false,
        "token": token || "cd8625c41b7a304adea5c9d8e0e76d4e",
        "js": methodName + "((x))"
    };
    var callback = chart.__onDataSuccess

    jsonp(url, data, methodName, function (json) {
        console.log(json);
        callback(json, chart);
    });

}


module.exports = getData;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/getData.js
// module id = 347
// module chunks = 0
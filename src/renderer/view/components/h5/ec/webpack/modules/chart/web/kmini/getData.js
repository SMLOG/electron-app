var jsonp = require("../../common/jsonp");

function getData(chart){
    var _this = this;

    var code = chart.option.code;
    var type = chart.options.type;
    var token = chart.option.token;
    var fq = chart.option.fq || 0;
    // console.info(chart.option.newquote)
    // console.log(type);

    // jsonp([uri], [data], [custom_method_name], [callback(json)])

    var url = "http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js";
    var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 99999999);
    var data = {
        "id": code,
        "TYPE": type,
        "rtntype": 5,
        "authorityType": "fa",
        "style": "top",
        "num": 58,
        "token": token || "cd8625c41b7a304adea5c9d8e0e76d4e",
        "js": methodName + "((x))"
    };

    /**
     * 行情新接口
     */
    if (chart.option.newquote) {
        
        url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get'
        //url = 'http://61.152.230.191/api/qt/stock/kline/get'
        data = {
            secid: code,
            fields1: 'f1,f2,f3,f4,f5',
            fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
            lmt: 58,
            klt: 101,
            fqt: fq,
            end: 30000101,
            ut: token || 'fa5fd1943c7b386f172d6893dbfba10b',
            cb: methodName
        }
        type = type.toLowerCase()
        switch (type) {
            case 'wk':
                data.klt = 102
                break;
            case 'mk':
                data.klt = 103
                break;        
            default:
                break;
        }
    }    

    var callback = chart.__onDataSuccess



    jsonp(url, data, methodName, function(json){
        if (chart.option.newquote) {
            var json2 = {}
            json2.data = json.data.klines
            json2.name = json.data.name
            var pricedigit = '0'
            if (json.data.decimal > 0) {
                pricedigit = '0.' + '00000000000'.substring(0, json.data.decimal)
            }
            json2.info = {
                pricedigit: pricedigit
            }
            callback(json2, chart);
        }
        else{
            callback(json, chart);
        }
    
    });
}


module.exports = getData;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/getData.js
// module id = 336
// module chunks = 0
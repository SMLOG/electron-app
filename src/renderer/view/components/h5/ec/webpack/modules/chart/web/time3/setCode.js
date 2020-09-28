var tools = require("../../common/tools");
var jsonp = require("../../common/jsonp2");
var merge = require("lodash").merge;
var Promise = require("promise-polyfill").default;

module.exports = function(ops) {
  var that = this;

  if (!ops.ut) {
    throw new Error("必选传递ut参数");
  }

  Promise.all([getData(ops)]).then(function(res) {
    console.log(res);
    res = res ? res : [];

    if (res[0] && res[0].rc == 0) {
      if (res[0] && res[0].rc == 0) {
        that.setData({
          time: res[0].data,
        });
      }

      that.draw();
    }
  });
};

function getData(ops) {
  return new Promise(function(resolve, reject) {
    //var url = "http://61.152.230.32:38618/api/qt/stock/trends2/get";
    var url = "//push2.eastmoney.com/api/qt/stock/trends2/get";
    var methodName =
      "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 99999999);
    var dft = {
      // id: "SZ300059",
      fields1: "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13",
      fields2: "f51,f52,f53,f54,f55,f56,f57,f58",
      // ut: "fa5fd1943c7b386f172d6893dbfba10b",
      iscr: 0,
      cb: methodName,
    };

    var data = merge(dft, ops);

    jsonp(url, data, methodName, function(json) {
      console.log("cccccccccccc");
      resolve(json);
    });
  });
}

//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/setCode.js
// module id = 329
// module chunks = 0

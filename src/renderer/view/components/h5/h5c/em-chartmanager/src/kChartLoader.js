var merge = _.merge;
var throttle = _.throttle;
var jsonp = require("../../em-utils/lib/jsonp");
var dServerUrls = require("./serverUrls");
var makepoints = require("./makepoints");

/**
 * K线图加载器
 * @param {object} args K线图参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {string} args.type K线类型
 * @param {'fa'|'ba'|''} args.authorityType 除复权状态
 * @param {Object.<string, object>} args.styles 样式配置集合
 * @param {Object.<string, string>} args.serverUrls 服务端地址
 */
function kChartLoader(args) {
  var self = this;
  var timer, chart;
  var _opt = (this.args = merge(
    {
      entry: {},
      container: "#chart-container",
      width: 720,
      height: 655,
      show: {
        CMA: true,
        // 除权除息打点
        cqcx: ["k", "wk", "mk"].indexOf(args.type) >= 0,
        // 信息地雷打点
        infomine: ["k", "wk", "mk"].indexOf(args.type) >= 0,
        // lr: args.type === 'k',
        // cf: args.type === 'k'
      },
      padding: {
        top: 0,
        bottom: 0,
      },
      kgap: {},
      scale: {
        pillar: 60,
        min: 10,
      },
      popWin: {
        type: "move",
      },
      yAxisType: 1,
      maxin: {
        //show: true,
        lineWidth: 30, // 线长
        skewx: 0, // x偏移
        skewy: 0, // y偏移
      },
      data: {
        k: [],
      },
      styles: {},
      serverUrls: dServerUrls,
      onComplete: function() {},
      onClick: function() {},
      onDragEnd: function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
          if (_opt.show.infomine) {
            makepoints["infomine"].apply(self, [chart, _opt]);
          }
        }, 500);
      },
      onError: function(err) {
        console.error(err);
      },
      update: 60 * 1000,
    },
    args
  ));

  // 打点预留高度
  if (_opt.show.cqcx && !_opt.kgap.bottom) {
    _opt.kgap.bottom = 18 + 13;
  }
  if (_opt.show.infomine && !_opt.kgap.top) {
    _opt.kgap.top = 18 + 9;
  }

  chart = new emcharts3.k6(_opt);
  /**@type {throttle} */
  var throttled;

  // console.info(_opt)
  this.dataloader = function() {
    // jsonp(_opt.serverUrls.chartDataUrl, {
    //     rtntype: 6,
    //     id: _opt.entry.id,
    //     type: _opt.type,
    //     authorityType: _opt.authorityType
    // }, 'cb', function (json) {

    var typestr = "101";
    if (_opt.type == "wk") {
      typestr = "102";
    } else if (_opt.type == "mk") {
      typestr = "103";
    } else if (_opt.type == "m5k") {
      typestr = "5";
    } else if (_opt.type == "m15k") {
      typestr = "15";
    } else if (_opt.type == "m30k") {
      typestr = "30";
    } else if (_opt.type == "m60k") {
      typestr = "60";
    }

    var fuquanstr = "1"; //前复权
    if (_opt.authorityType == "ba") {
      fuquanstr = "2";
    } else if (_opt.authorityType == "" || _opt.authorityType == undefined) {
      fuquanstr = "0";
    }

    var chartDataUrl_k_new = _opt.serverUrls.chartDataUrl_k_new;
    if (window.location.search.indexOf("env=test") > 0) {
      chartDataUrl_k_new =
        "http://61.152.230.207/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b";
    }

    jsonp(
      chartDataUrl_k_new,
      {
        rtntype: 6,
        secid: _opt.entry.newmarket + "." + _opt.entry.code,
        klt: typestr,
        fqt: fuquanstr,
      },
      "cb",
      function(newjson) {
        var json = {
          name: newjson.data.name,
          code: newjson.data.code,
          info: {
            // "c": "6.26",
            // "h": "6.28",
            // "l": "6.20",
            // "o": "6.23",
            // "a": "178396399",
            // "v": "285358",
            yc: newjson.data.prePrice,
            // "time": "2020-06-18 13:53:58",
            ticks: "34200|54000|0|34200|41400|46800|54000",
            total: newjson.data.dktotal,
            pricedigit: "0.00",
            jys: "2",
            Settlement: "-",
            mk: newjson.data.market,
            sp: newjson.data.preKPrice,
            isrzrq: false,
          }, //,
          // "flow": [
          //     {
          //     "time": "2019-12-25 00:00",
          //     "ltg": 0
          //     },
          //     {
          //     "time": "2020-01-07 00:00",
          //     "ltg": 2604210267
          //     },
          //     {
          //     "time": "2020-01-08 00:00",
          //     "ltg": 2604210272
          //     }
          // ]
        };

        json.data = newjson.data.klines.map(function(v) {
          var newarr = v.split(",");
          var oldarr = [
            newarr[0],
            newarr[1],
            newarr[2],
            newarr[3],
            newarr[4],
            newarr[5],
            newarr[6],
            newarr[7] + "%",
            newarr[10],
            newarr[8],
            newarr[9],
            // newarr[0],
            // newarr[1],
            // newarr[2],
            // newarr[3],
            // newarr[4],
            // newarr[5],
            // Math.round(newarr[6]),
            // newarr[7] + '%',
          ];
          return oldarr.join(",");
        });

        json.flow = newjson.data.klines.map(function(v) {
          var newarr = v.split(",");
          //    console.info(newarr)
          return {
            time: newarr[0],
            ltg: (newarr[5] / newarr[9]) * 10000,
          };
        });

        // console.info(json.flow)

        //            json.flow = [
        //  {
        //       "time": "2010-03-19",
        //       "ltg": 2604210272
        //     },

        //     {
        //       "time": "2020-05-21",
        //       "ltg": 2604210272
        //     }
        //   ]

        removeLoading();
        if (!json || json.stats === false) return false;
        chart.setData(
          {
            k: json,
          },
          _opt
        );
        chart.draw();
        if (!throttled) {
          throttled = throttle(function() {
            if (_opt.show.infomine) {
              makepoints["infomine"].apply(self, [chart, _opt]);
            }
            if (_opt.show.cqcx) {
              makepoints["exrights"].apply(self, [chart, _opt]);
            }
          }, _opt.update);
        }
        throttled();
      },
      function(e) {
        removeLoading();
        console.log("数据加载异常:" + _opt.serverUrls.chartDataUrl, e);
      }
    );
  };
  return chart;
  /**
   * 移除loading
   */
  function removeLoading() {
    if (typeof chart.stop === "function") chart.stop();
  }
}

module.exports = kChartLoader;

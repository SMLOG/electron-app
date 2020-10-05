var merge = _.merge;
var throttle = _.throttle;
var jsonp = require("../../em-utils/lib/jsonp");
var dServerUrls = require("./serverUrls");
var makepoints = require("./makepoints");

function isAStock(jys) {
  return ["2", "6", "13", "80"].indexOf(jys) >= 0;
}

/**
 * 分时图加载器
 * @param {object} args 分时图参数
 * @param {object} args.entry 个股参数
 * @param {string} args.entry.id ID
 * @param {string} args.entry.code 代码
 * @param {string} args.entry.market 市场号
 * @param {'sh'|'sz'} args.entry.shortmarket 短市场
 * @param {string} args.entry.JYS 内部细分市场
 * @param {string} args.type 分时图类型
 * @param {Object.<string,object>} args.styles 样式配置集合
 * @param {Object.<string,string>} args.serverUrls 服务端地址
 */
function timeChartLoader() {
  // console.info('分时图')
  var self = this;
  this.args = merge(
    {
      entry: {},
      container: "#chart-container",
      width: 720,
      height: 655,
      type: "r",
      iscr: false,
      iscca: this.args.isph,
      color: {
        line: "#326fb2",
        fill: ["rgba(101,202,254, 0.2)", "rgba(101,202,254, 0.1)"],
      },
      // 网格线
      gridwh: {
        width: 720,
      },
      data: {
        time: [],
        positionChanges: [],
      },
      padding: {
        right: 70,
      },
      show: {
        indicatorArea: false, // 分时指标
        CMA: true,
        ddx: this.args.type === "r",
        cf: this.args.type === "r",
        infomine: true,
      },
      styles: {},
      serverUrls: dServerUrls,
      onClickChanges: function() {
        // 盘口异动
        window.open(
          "//quote.eastmoney.com/changes/stocks/" +
            _opt.entry.shortmarket +
            _opt.entry.code +
            ".html"
        );
      },
      onComplete: function() {},
      onError: function(err) {
        console.error(err);
      },
      update: 40 * 1000,
    },
    this.args
  );

  var chart = new emcharts3.time(this.args);
  /** @type {throttle} */
  var throttled;
  // 加载数据
  this.dataloader = function() {
    var _opt = this.args;
    if (!this.datacache) {
      this.datacache = {
        time: {},
        positionChanges: [],
      };
    }
    // jsonp(_opt.serverUrls.chartDataUrl, {
    //     rtntype: 5,
    //     id: _opt.entry.id,
    //     type: _opt.type,
    //     iscr: _opt.iscr
    // }, 'cb', function (json) {
    // console.info(_opt)
    var typestr = "1";
    if (_opt.type == "r") {
      typestr = "1";
    } else if (_opt.type == "t2") {
      typestr = "2";
    } else if (_opt.type == "t3") {
      typestr = "3";
    } else if (_opt.type == "t4") {
      typestr = "4";
    } else if (_opt.type == "t5") {
      typestr = "5";
    }

    var iscrstr = "0";
    if (_opt.iscr) {
      iscrstr = "1";
    }

    var isphstr = "0";
    if (_opt.isph) {
      isphstr = "1";
    }

    var urltrends = _opt.serverUrls.chartDataUrl_new;

    if (window.location.search.indexOf("env=test") > 0) {
      urltrends =
        "http://61.152.230.207/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b";
    }

    jsonp(
      urltrends,
      {
        secid: _opt.entry.newmarket + "." + _opt.entry.code,
        ndays: typestr,
        iscr: iscrstr,
        iscca: isphstr,
      },
      "cb",
      function(newjson) {
        var json = {
          name: newjson.data.name,
          code: newjson.data.code,
        };

        json.data = newjson.data.trends.map(function(v) {
          var newarr = v.split(",");
          var oldarr = [newarr[0], newarr[2], newarr[5], newarr[7], 0];
          return oldarr.join(",");
        });

        json.info = {
          // a: "3051405520",
          // v: "1866995",
          yc: newjson.data.preClose,
          // time: "2020-06-17 14:11:16",
          ticks: "34200|54000|0|34200|41400|46800|54000",
          total: newjson.data.trendsTotal,
          pricedigit: "0.00",
          jys: newjson.data.type.toString(),
          // Settlement: "-",
          // mk: 2,
          // sp: "40.58",
          // isrzrq: false
          // ticks: "34200|54000|0|34200|41400|46800|54000",
          // total: "241",
          // pricedigit: "0.00",
          // jys: "80"
        };

        // console.info(json.info)

        if (typeof chart.stop === "function") chart.stop();
        if (!json || json.stats === false) return false;

        //emcharts/v3/lts/emcharts.min.js 对应传入的数据格式json
        // self.datacache.time = json;

        //ec/3.15.1/emcharts.min.js 对应传入的数据格式:直接传入 newjson
        self.datacache.time = newjson;
        chart.setData(self.datacache);

        // 分钟K线
        if (_opt.show && _opt.show.indicatorArea) {
          self.drawIndicators();
        }
        if (self.inited) chart.redraw();
        else {
          chart.draw();
          self.inited = true;
        }

        if (!throttled) {
          throttled = throttle(function() {
            // 盘口异动，只有A股
            if (isAStock(json.info.jys)) {
              self.drawPositionChange();
            }
            if (_opt.show.infomine) {
              makepoints["infomine"].apply(self, [chart, _opt]);
            }
          }, _opt.update);
        }
        throttled();
      },
      function(e) {
        console.error(e);
      }
    );
  };

  /**
   * 分时K指标
   */
  this.drawIndicators = () => {
    var _opt = this.args;
    jsonp(
      _opt.serverUrls.chartDataUrl,
      {
        rtntype: 5,
        id: _opt.entry.id,
        type: _opt.type + "k",
        iscr: false,
      },
      "cb",
      function(datak) {
        if (!datak) return false;
        if (datak.stats != false) {
          self.datacache.datak = datak;
          chart.setData(self.datacache);
          if (self.inited) chart.redraw();
          else chart.draw();
        }
      },
      function() {}
    );
  };

  /**
   * 盘口异动
   */

  this.getYDTypeName = (type) => {
    var val = "";
    var ydtypearr = [
      { "1": "有大买盘" },
      { "101": "有大卖盘" },
      { "2": "大笔买入" },
      { "102": "大笔卖出" },
      { "201": "封涨停板" },
      { "301": "封跌停板" },
      { "202": "打开涨停" },
      { "302": "打开跌停" },
      { "203": "高开5日线" },
      { "303": "低开5日线" },
      { "204": "60日新高" },
      { "304": "60日新低" },
      { "401": "向上缺口" },
      { "501": "向下缺口" },
      { "402": "火箭发射" },
      { "502": "高台跳水" },
      { "403": "快速反弹" },
      { "503": "快速下跌" },
      { "404": "竞价上涨" },
      { "504": "竞价下跌" },
      { "405": "60日大幅上涨" },
      { "505": "60日大幅下跌" },
    ];
    ydtypearr.find(function(value) {
      if (value[type]) {
        val = value[type];
      }
    });
    return val;
  };
  /*
   *
   *@description: 换新接口数据格式保持老接口格式，注意codemarket 取值处理
   *@modifyContent:
   *@author: qiuhongyang
   *@date: 2020-05-19 15:34:32
   *
   */
  this.drawPositionChange = () => {
    var _opt = this.args;
    var positionChangeDataUrl = _opt.serverUrls.positionChangeDataUrl;
    if (window.location.search.indexOf("env=test") > 0) {
      positionChangeDataUrl =
        "http://61.152.230.207/api/qt/pkyd/get?fields=f1,f2,f4,f5,f6,f7&lmt=20&ut=fa5fd1943c7b386f172d6893dbfba10b";
    }
    jsonp(
      positionChangeDataUrl,
      {
        // secids: _opt.entry.id
        secids: _opt.entry.newmarket + "." + _opt.entry.code,
      },
      "cb",
      function(changes) {
        // if (!changes) return false;
        // if (typeof changes[0] !== 'string') return false;
        // self.datacache.positionChanges = changes;
        // chart.setData(self.datacache);
        // if (self.inited) chart.redraw();
        // else chart.draw();
        try {
          var backdata = changes.data.pkyd;
          if (!backdata) return false;
          var newbackarr = [],
            strs = "";
          for (var i = 0; i < backdata.length; i++) {
            if (backdata[i]) {
              var itemarr = backdata[i].split(",");
              var time = itemarr[0].substring(0, 5); //成交时间
              var codemarket = _opt.entry.id; //code+mknum
              var stockname = itemarr[2];
              var ydtype = getYDTypeName(itemarr[3]); //异动类型
              var tradenum = itemarr[4]; //异动说明
              //买卖方向字段 原来的老接口0 卖 1买，实际画图并没有用到，为了数据完整性，以行情接口颜色f7做一次转换（盘口异动颜 1为红色，2为绿色。）
              var tdir = itemarr[5] === 2 ? "0" : "1";
              strs =
                codemarket +
                "," +
                time +
                "," +
                stockname +
                "," +
                ydtype +
                "," +
                tradenum +
                "," +
                tdir;
              newbackarr.push(strs);
            }
          }

          if (!newbackarr) return false;
          self.datacache.positionChanges = newbackarr;
          chart.setData(self.datacache);
          if (self.inited) chart.redraw();
          else chart.draw();
        } catch (error) {
          return false;
        }
      },
      function() {}
    );
  };

  return chart;
}

module.exports = timeChartLoader;

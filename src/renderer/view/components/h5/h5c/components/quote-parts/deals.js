//var $ = require('jquery');
var extend = _.assignIn;
var $ = require("jquery");

var utils = require("../../em-utils/lib/stockutils");
var template = require("../../modules/template-web");
var tpl_deal = require("../../template/deal.art");

//处理价格
function DealFSprice(val) {
  try {
    val = val / 1000;
    return val.toFixed(2);
  } catch (e) {
    return "-";
  }
}

function DealFSTime(val) {
  try {
    val = "" + val;
    if (val.length == 5) {
      val = "0" + val;
    }
    return val.substr(0, 2) + ":" + val.substr(2, 2) + ":" + val.substr(4, 2);
  } catch (e) {
    return "-";
  }
}

/**
 * 成交明细
 * @param {Object} args 参数
 * @param {string} args.id 股票ID
 * @param {string|JQuery<HTMLElement>} args.container 容器
 * @param {object} args.ajax ajax请求配置
 * @param {function} args.oncomplete 完成回调
 * @param {number} args.update 更新时间
 */
function deals(args) {
  var apiurl = "//push2ex.eastmoney.com/";
  if (window.location.search.indexOf("env=test") > 0) {
    // apiurl = "http://61.152.230.32:26891/"
    apiurl = "http://61.152.230.141/";
  }
  var _opt = extend(
    {
      container: "#deal_detail",
      id: "",
      ajax: {
        url:
          apiurl +
          "getStockFenShi?pagesize=20&ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wzfscj&pageindex=0&sort=2&ft=1",
        dataType: "jsonp",
        data: {},
        jsonp: "cb",
        success: render,
        error: onerror,
      },
      oncomplete: null,
      update: 20 * 1000,
    },
    args
  );
  var self = this;
  var timer;
  var pageRender = template.compile(tpl_deal);
  this.load = function() {
    this.stop();
    extend(_opt.ajax.data, {
      code: _opt.code,
      market: _opt.newmarket,
    });
    var jqXHR = $.ajax(_opt.ajax);
    if (_opt.update > 0) {
      timer = setInterval(function() {
        if (jqXHR) jqXHR.abort();
        jqXHR = $.ajax(_opt.ajax);
      }, _opt.update);
    }
  };

  this.stop = function() {
    clearInterval(timer);
  };

  function render(json) {
    //var big = 2 * Math.pow(10, 6);
    var modules;
    //t-时间，p-价格，v-成交量，bs-内外盘，wh-仓差，type-性质，vc-成交笔数或增仓量,pch-方向
    //内外盘：1:内盘(流出) 2:外盘(流入) 3:未知 4:集合竞价
    if (json && json.data) {
      for (var i = 0; i < json.data.data.length; i++) {
        var item = json.data.data[i];
        item.priceColor =
          item.bs === 4 ? "" : utils.getColor(item.p, json.data.cp);

        //箭头方向处理
        var preItem = json.data.data[i + 1]; //上一个
        item.dir = "";
        if (item.bs != "4") {
          if (preItem) {
            var curp = Number(DealFSprice(item.p));
            var prep = Number(DealFSprice(preItem.p));
            if (curp > prep) {
              item.dir = "up"; //上
            } else if (curp < prep) {
              item.dir = "down"; //下
            }
          }
        }

        item.p = DealFSprice(item.p); //价格放大了1000倍

        item.v = item.bs === 4 ? "-" : item.v;
        var vp = item.v * 100 * item.p;

        if (item.bs == "1") {
          //内盘
          item.volumnColor = vp > 200000 ? "blue" : "green";
        } else if (item.bs == "2") {
          //外盘
          item.volumnColor = vp > 200000 ? "purple" : "red";
        } else {
          item.volumnColor = "";
        }

        item.t = DealFSTime(item.t);
      }
      modules = {
        state: json.data,
        data: json.data.data,
      };
    } else {
      modules = {
        state: json.result,
        data: [],
      };
    }
    $(_opt.container).html(pageRender(modules));

    if (json.rc !== 0) {
      $("#detail-msg-more").hide();
    } else {
      $("#detail-msg-more").show();
      $("#detail-msg-more a").attr(
        "href",
        "http://quote.eastmoney.com/f1.html?id=" + _opt.id
      );
    }
    if (typeof _opt.oncomplete === "function") {
      _opt.oncomplete.apply(self, [json, _opt]);
    }
  }

  function onerror(jqXHR, textStatus, error) {
    console.error(error);
  }
  return this;
}

module.exports = deals;

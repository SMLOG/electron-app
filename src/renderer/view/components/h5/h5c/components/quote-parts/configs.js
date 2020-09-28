var $ = require("jquery");
var utils = require("../../em-utils/lib/stockutils");
var memcache = require("../../em-utils/lib/cache");
var cache = memcache["default"];

/**
 * 默认数据比较器
 * @param {string|number} data 数据
 */
function defaultComparer(data) {
  return data - cache[60];
}

function beforePageLoad(data, fields) {
  var self = this;
  var $doms = cache.getOrAdd(
    "__doms__",
    $(
      "#quote-s5d,#quote-s4d,#quote-s3d,#quote-s2d,#quote-s1d,#quote-b1d,#quote-b2d,#quote-b3d,#quote-b4d,#quote-b5d"
    )
  );
  var amounts = [
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
  ];
  var changed = false;
  for (key in data) {
    if (amounts.indexOf(key) >= 0) {
      changed = true;
      break;
    }
  }
  if (changed) {
    $doms.html("");
  }
}

/**
 * 默认字段定义
 */
var fields = [
  {
    // 代码 数据里没有
    idx: 57,
    // dom: $('#quote-code'),
    // handler: function (data) {
    //     console.log(data,"股票代码")
    //     if (typeof data === 'string') return data.substr(2, data.length - 2);
    //     else return data;
    // },
    // render:function($dom,data){
    //     $dom.html(data);
    // }
  },
  {
    // 名称
    idx: 58,
    dom: $("#quote-name"),
  },
  {
    // 小数位数
    idx: 59,
    handler: function(data) {
      cache.set("offset", data || 2);
      cache.set("fact", 1 / Math.pow(10, data) || 0.01);
      return data || 2;
    },
  },
  {
    // 交易时间
    idx: 80,
  },
  {
    // 昨收
    idx: 60,
    dom: "#quote-pc",
    decimal: true,
  },
  {
    //停牌标识
    idx: 78,
    dom: $("#quote-close-tp"),
    render: function($dom, data) {
      if (!cache[60] || isNaN(data)) return;
      if (data != 0) {
        $dom.html("停牌");
        $("#quote-close-main").html(cache[60]);
      }
    },
  },
  {
    // 现价
    idx: 43,
    dom: "#quote-close-main",
    decimal: true,
    hasColor: true,
    blink: {
      doms: [
        $("#quote-close-main")[0],
        $("#quote-change-main")[0],
        $("#quote-changePercent-main")[0],
        $("#quote-close")[0],
      ],
    },
    comparer: defaultComparer,
    render: function($dom, data, fields, context) {
      if (cache[60] && isNaN(data)) {
        $dom.html(cache[60]);
      }
      if (!cache[60] || isNaN(data)) return;
      $dom.html(data).trigger("tsq.change", [data, fields, context]);
      var zd = defaultComparer(data),
        change = (data - cache[60]).toFixed(cache["offset"]),
        changePercent = ((change / cache[60]) * 100).toFixed(cache["offset"]);
      if (zd > 0) {
        $("#quote-arrow")
          .removeClass()
          .addClass("icon-fullScreen-up");
      } else if (zd < 0) {
        $("#quote-arrow")
          .removeClass()
          .addClass("icon-fullScreen-down");
      } else {
        $("#quote-arrow").removeClass();
      }
      $("#quote-change-main")
        .html(change)
        .removeClass("red green")
        .addClass(utils.getColor(zd));
      $("#quote-changePercent-main,#quote-changePercent-block")
        .html(changePercent + "%")
        .removeClass("red green")
        .addClass(utils.getColor(zd));
      document.title =
        cache[58] +
        data +
        " " +
        change +
        "(" +
        changePercent +
        "%)" +
        "_股票价格_行情_走势图—东方财富网";
    },
  },
  {
    // 行情时间
    idx: 86,
    dom: $("#quote-time"),
    handler: function(data) {
      if (!data) return NaN;
      return new Date(data * 1000);
    },
    render: function($dom, data, field, handler) {
      $dom.html(utils.formatDate(data, "yyyy-MM-dd HH:mm:ss")); //yyyy-MM-dd EEE HH:mm:ss
      var stopped = false;
      if (cache[80]) {
        var hm = utils.formatDate(data, "HHmm");
        if (hm < cache[80]["ocat"] || hm > cache[80]["ctpm"]) {
          handler.status = cache["status"] = "close";
          stopped = hm > cache[80]["ctpm"];
        } else if (hm > cache[80]["ctam"] && hm < cache[80]["otpm"]) {
          handler.status = cache["status"] = "middle-close";
        } else if (hm >= cache[80]["ocat"] && hm < cache[80]["otam"]) {
          handler.status = cache["status"] = "pre";
        } else if (
          (hm >= cache[80]["otam"] && hm <= cache[80]["ctam"]) ||
          (hm >= cache[80]["otpm"] && hm <= cache[80]["ctpm"])
        ) {
          handler.status = cache["status"] = "open";
        }
      }
      $dom.trigger("tick", [data, cache["status"]]);
      if (handler.stopWithoutQuote && stopped) {
        handler.stop();
      }
    },
  },
  {
    // 开盘价
    idx: 46,
    dom: "#quote-open-custom",
    hasColor: true,
    decimal: true,
    comparer: defaultComparer,
  },
  {
    // 最高价
    idx: 44,
    dom: "#quote-high-custom",
    hasColor: true,
    blink: true,
    decimal: true,
    comparer: defaultComparer,
  },
  {
    // 最低价
    idx: 45,
    dom: "#quote-low-custom",
    hasColor: true,
    blink: true,
    decimal: true,
    comparer: defaultComparer,
  },
  {
    // 涨停涨停
    idx: 51,
    dom: "#quote-raisePrice-custom,#quote-raisePrice-main",
    hasColor: true,
    blink: true,
    decimal: true,
    comparer: defaultComparer,
  },
  {
    // 跌停
    idx: 52,
    dom: "#quote-fallPrice-custom,#quote-fallPrice-main",
    hasColor: true,
    blink: true,
    decimal: true,
    comparer: defaultComparer,
  },
  {
    // 量比
    idx: 50,
    dom: "#quote-volumeRate-custom",
    blink: true,
    handler: function(data) {
      if (data != "-") {
        return (data / 10000).toFixed(2);
      }
    },
  },
  {
    // 成交量
    idx: 47,
    dom: "#quote-volume-custom",
    blink: true,
    numbericFormat: true,
    render: function($dom, data) {
      $dom.html(data + "手");
    },
  },
  {
    // 成交额
    idx: 48,
    dom: "#quote-amount-custom",
    blink: true,
    numbericFormat: true,
  },
  {
    // 买一价
    idx: 19,
    dom: $("#quote-b1p"),
    decimal: true,
    hasColor: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 买一量
    idx: 20,
    dom: $("#quote-b1v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 买一差量
    idx: 98,
    dom: $("#quote-b1d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 买二价
    idx: 17,
    dom: $("#quote-b2p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 买二量
    idx: 18,
    dom: $("#quote-b2v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 买二差量
    idx: 99,
    dom: $("#quote-b2d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 买三价
    idx: 15,
    dom: $("#quote-b3p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 买三量
    idx: 16,
    dom: $("#quote-b3v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 买三差量
    idx: 100,
    dom: $("#quote-b3d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 买四价
    idx: 13,
    dom: $("#quote-b4p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 买四量
    idx: 14,
    dom: $("#quote-b4v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 买四差量
    idx: 101,
    dom: $("#quote-b4d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 买五价
    idx: 11,
    dom: $("#quote-b5p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 买五量
    idx: 12,
    dom: $("#quote-b5v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 买五差量
    idx: 102,
    dom: $("#quote-b5d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 卖五价
    idx: 31,
    dom: $("#quote-s5p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 卖五量
    idx: 32,
    dom: $("#quote-s5v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 卖五差量
    idx: 93,
    dom: $("#quote-s5d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 卖四价
    idx: 33,
    dom: $("#quote-s4p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 卖四量
    idx: 34,
    dom: $("#quote-s4v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 卖四差量
    idx: 94,
    dom: $("#quote-s4d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 卖三价
    idx: 35,
    dom: $("#quote-s3p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 卖三量
    idx: 36,
    dom: $("#quote-s3v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 卖三差量
    idx: 95,
    dom: $("#quote-s3d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 卖二价
    idx: 37,
    dom: $("#quote-s2p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 卖二量
    idx: 38,
    dom: $("#quote-s2v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 卖二差量
    idx: 96,
    dom: $("#quote-s2d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 卖一价
    idx: 39,
    dom: $("#quote-s1p"),
    hasColor: true,
    decimal: true,
    blink: true,
    onerror: SuppressedValueHanlder,
    comparer: defaultComparer,
    render: QuotePriceRender,
  },
  {
    // 卖一量
    idx: 40,
    dom: $("#quote-s1v"),
    onerror: SuppressedValueHanlder,
    blink: true,
    render: QuoteVolumnRender,
  },
  {
    // 卖一差量
    idx: 97,
    dom: $("#quote-s1d"),
    hasColor: true,
    //onerror: SuppressedValueHanlder,
    render: OrderDiff,
  },
  {
    // 季度
    idx: 62,
  },
  {
    // 经营活动产生的现金流量（TTM）
    idx: 103,
  },
  {
    // 营业总收入（TTM）
    idx: 104,
  },
  {
    // 净利润
    idx: 105,
  },
  {
    // 最新年度归属母公司净利润
    idx: 109,
  },
  {
    // 总股本
    idx: 84,
  },
  {
    // 总市值
    idx: "tmv",
    dom: "#quote-marketValue-custom",
    extend: {
      deps: [84, 43, 60],
      compute: MarketValueCalculator,
    },
    numbericFormat: true,
    blink: true,
  },
  {
    // 流通股本
    idx: 85,
  },
  {
    // 流通市值
    idx: "fmv",
    dom: "#quote-flowCapitalValue-custom",
    extend: {
      deps: [85, 43, 60],
      compute: MarketValueCalculator,
    },
    numbericFormat: true,
    blink: true,
  },
  {
    // 动态市盈率
    idx: "pe",
    dom: "#quote-PERation-custom",
    extend: {
      deps: [43, 84, 105, 62, 60],
      compute: PECalculator,
    },
    blink: true,
  },
  {
    // 每股净资产
    idx: 92,
    handler: function(data) {
      return isNaN(data) ? NaN : data / Math.pow(10, 7);
    },
  },
  {
    // 市净率
    idx: "pb",
    dom: "#quote-PB-custom",
    extend: {
      deps: [43, 92, 60],
      compute: PBCalculator,
    },
    blink: true,
  },
  {
    // 换手率
    idx: "tr",
    dom: "#quote-turnoverRate-custom",
    blink: true,
    extend: {
      deps: [47, 85],
      compute: TurnoverRatioCalculator,
    },
    render: function($dom, data) {
      $dom.html(!data ? "-" : data + "%");
    },
  },
  {
    // 委差
    idx: "cd",
    dom: $("#quote-cd"),
    blink: true,
    hasColor: true,
    extend: {
      deps: [40, 38, 36, 34, 32, 20, 18, 16, 14, 12],
      compute: CommissionDiffCalculator,
    },
  },
  {
    // 委比
    idx: "cr",
    dom: $("#quote-cr"),
    blink: true,
    hasColor: true,
    extend: {
      deps: [40, 38, 36, 34, 32, 20, 18, 16, 14, 12],
      compute: CommissionRateCalculator,
    },
    render: PercentRender,
  },
  {
    // 买卖力道
    idx: "power",
    dom: "#buy-table,#sell-table",
    extend: {
      deps: [
        40,
        38,
        36,
        34,
        32,
        20,
        18,
        16,
        14,
        12,
        39,
        37,
        35,
        33,
        31,
        19,
        17,
        15,
        13,
        11,
        60,
      ],
      compute: function() {
        var args = [],
          volumes = [],
          pc = arguments[20];
        for (var i = 0; i < 10; i++) {
          var vol = arguments[i],
            price = arguments[i + 10];
          volumes.push(isNaN(vol) ? 0 : vol);
          args.push({
            pc: pc,
            close: price,
            volumn: isNaN(vol) ? 0 : vol,
            percent: 0,
          });
        }
        var mv = Math.max.apply(this, volumes);
        return args.map(function(param) {
          param.percent = param.volumn / mv;
          return param;
        });
      },
    },
    render: function($dom, data) {
      if (cache["status"] === "pre") return;
      for (var i = 0; i < data.length; i++) {
        var $ele,
          n = i + 1;
        if (n < 6) {
          $ele = $("#quote-s" + n + "vp", $dom);
        } else {
          $ele = $("#quote-b" + (n - 5) + "vp", $dom);
        }
        $ele
          .width(data[i].percent * 100 + "%")
          .removeClass("red green")
          .addClass(data[i].close - data[i].pc >= 0 ? "red" : "green");
      }
    },
  },
];

/**
 * 默认数据比较器
 * @param {string|number} data 数据
 */
/*
function defaultComparer(data) {
    return data - cache[60];
}*/

/**
 * 意外的错误数据
 * @param {string|number} data 数据
 */
function SuppressedValueHanlder(data) {
  return "-";
}

/**
 * 市值计算器
 * @param {number} shares 股本
 * @param {number} close 现价
 * @param {number} pc 昨收
 */
function MarketValueCalculator(shares, close, pc) {
  if (!shares || !pc) return NaN;
  return shares * (close || pc);
}
/**
 * 动态市盈率计算器
 * @param {number} close 最新价
 * @param {number} shares 总股本
 * @param {number} profit 净利润
 * @param {number} season 季度
 * @param {number} pc 昨收
 */
function PECalculator(close, shares, profit, season, pc) {
  if (!shares || !profit || !season || !pc) return NaN;
  var data = (((((close || pc) * shares) / profit) * season) / 4).toFixed(
    cache["offset"]
  );
  return data < 0 ? "-" : data;
}

/**
 * 静态市盈率计算器
 * @param {number} close 最新价
 * @param {number} shares 总股本
 * @param {number} profit 净利润
 * @param {number} pc 昨收
 */
function StaticPECalculator(close, shares, profit, pc) {
  if (!shares || !profit || !pc) return NaN;
  var data = (((close || pc) * shares) / profit).toFixed(cache["offset"]);
  return data < 0 ? "-" : data;
}

/**
 * 市净率计算器
 * @param {number} close 最新价
 * @param {number} ncps 每股净资产
 * @param {number} pc 昨收
 */
function PBCalculator(close, ncps, pc) {
  if (!ncps || !pc) return NaN;
  return ((close || pc) / ncps).toFixed(cache["offset"]);
}
/**
 * 换手率计算器
 * @param {number} amount 成交量
 * @param {number} fs 流通股本
 */
function TurnoverRatioCalculator(amount, fs) {
  return amount && fs
    ? (((amount * 100) / fs) * 100).toFixed(cache["offset"])
    : NaN;
}

/**
 * 委差计算器
 * @param {number} sv1 买一量
 * @param {number} sv2 买二量
 * @param {number} sv3 买三量
 * @param {number} sv4 买四量
 * @param {number} sv5 买五量
 * @param {number} bv1 卖一量
 * @param {number} bv2 卖二量
 * @param {number} bv3 卖三量
 * @param {number} bv4 卖四量
 * @param {number} bv5 卖五量
 */
function CommissionDiffCalculator(
  sv1,
  sv2,
  sv3,
  sv4,
  sv5,
  bv1,
  bv2,
  bv3,
  bv4,
  bv5
) {
  //if (cache['status'] === 'pre') return NaN;
  var sv = sv1 + sv2 + sv3 + sv4 + sv5,
    bv = bv1 + bv2 + bv3 + bv4 + bv5;
  return bv - sv;
}

/**
 * 委比计算器
 * @param {number} sv1 买一量
 * @param {number} sv2 买二量
 * @param {number} sv3 买三量
 * @param {number} sv4 买四量
 * @param {number} sv5 买五量
 * @param {number} bv1 卖一量
 * @param {number} bv2 卖二量
 * @param {number} bv3 卖三量
 * @param {number} bv4 卖四量
 * @param {number} bv5 卖五量
 */
function CommissionRateCalculator(
  sv1,
  sv2,
  sv3,
  sv4,
  sv5,
  bv1,
  bv2,
  bv3,
  bv4,
  bv5
) {
  //if (cache['status'] === 'pre') return NaN;
  var sv = sv1 + sv2 + sv3 + sv4 + sv5,
    bv = bv1 + bv2 + bv3 + bv4 + bv5;
  if (!(sv + bv)) return NaN;
  return (((bv - sv) / (bv + sv)) * 100).toFixed(cache["offset"]);
}

/**
 * 振幅计算器
 * @param {number} highest 最高
 * @param {number} lowest 最低
 * @param {number} pc 昨收
 */
// function AmplitudeCalculator(highest, lowest, pc) {
//     if (!pc || !highest || !lowest) return NaN;
//     return ((highest - lowest) / pc * 100).toFixed(cache['offset']);
// }

/**
 * 阶段涨跌幅计算器
 * @param {number} start 起始价
 * @param {number} close 现价
 * @param {number} pc 昨收
 */
// function StageChangePercentCalculator(start, close, pc) {
//     if (!start && !pc) return NaN;
//     var change = (close || pc) - start;
//     return (change / start * 100).toFixed(cache['offset']);
// }

/**
 * 当前档位委托单的差值显示处理
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function OrderDiff($dom, data) {
  if (data) {
    var fd = data;
    if (Math.abs(fd) > 10e6) {
      fd = utils.numbericFormat(data);
    } else if (Math.abs(fd) > 10e5) {
      fd = (data / 10e5).toFixed(2) + "万";
    }
    $dom.html(data > 0 ? "+" + fd : fd);
  }
}

/**
 * 添加百分号
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function PercentRender($dom, data) {
  data = parseFloat(data);
  $dom.html(
    isNaN(data) ? "-" : (Math.abs(data) > 100 ? data.toFixed(0) : data) + "%"
  );
}

/**
 * 5档报价展示
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function QuotePriceRender($dom, data) {
  if (!$dom) return false;
  if (isNaN(data)) {
    $dom.parent().removeClass("mr");
  } else {
    $dom.parent().addClass("mr");
  }
  $dom.html(data || "-");
}

/**
 * 5档挂单量展示
 * @param {JQuery<HTMLElement>} $dom jquery对象
 * @param {number|string} data 数据
 */
function QuoteVolumnRender($dom, data) {
  if (!$dom) return false;
  if (isNaN(data)) {
    $dom.parent().removeClass("mc");
  } else {
    $dom.parent().addClass("mc");
  }
  $dom.html(data || "-");
}

module.exports = {
  fields: fields,
  pageLoadEvents: {
    beforeLoading: beforePageLoad,
  },
};

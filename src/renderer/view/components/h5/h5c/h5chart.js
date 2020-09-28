var _ = require("lodash");
var $ = require("jquery");
var URI = require("./em-urijs");
var marge = _.merge;
var utils = require("./em-utils");
var cookie = utils.cookie;
var chartmanager = require("./em-chartmanager");
var minutedeals = require("./components/quote-parts/deals");
var TopSpeedQuote = require("./components/quote-parts/push");

var headdata = require("./cybhqdata"); //头部行情及其它

require("./modules/jquery.tooltip");
require("./modules/jquery.fullscreen");

/**
 * 交易状态
 */
var stock_state = "open";

//获取push2行情信息处理创业板
function getstockinfos(secid, stockentry) {
  var _url =
    "//push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&" +
    "fltt=2&fields=f107,f111,f279,f288,f293,f294,f292,f295&secid=" +
    secid +
    "&cb=?";

  if (window.location.search.indexOf("env=test") > 0) {
    _url =
      "http://61.152.230.207/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&" +
      "fltt=2&fields=f107,f111,f279,f288,f293,f294,f292,f295&secid=" +
      secid +
      "&cb=?";
  }

  return $.ajax({
    async: false,
    url: _url,
    dataType: "jsonp",
    jsonp: "cb",
  }).then(function(json) {
    try {
      var data = json.data;

      //判断盘前盘后
      if (data.f292 == 11) {
        stock_state = "pre"; //盘前
      } else if (data.f292 == 12) {
        stock_state = "next"; //盘后
      } else if (data.f292 == 5) {
        stock_state = "close"; //收盘
      } else if (data.f292 == 2) {
        stock_state = "open"; //交易中
      }

      //创业板
      if (data.f107 == 0 && data.f111 == 80) {
        //ps:页面元素涉及id赋值，需remove()
        $("#h5chartheadwrap").remove();
        $("#h5chartheadwrapcyb").show();
        $("#fs_ph_tab").css({ display: "block" });
        //是否注册制、协议控制架构、同股同权、是否盈利
        if (json.data.f294 != "-") {
          var t1 = json.data.f294 == 1 ? "是" : "否";
          $("#quote-ZCZ-custom").html(t1);
        }
        if (json.data.f295 != "-") {
          var t2 = json.data.f295 == 1 ? "是" : "否";
          $("#quote-XYJG-custom").html(t2);
        }
        // if (json.data.f279 != '-') { //是否同股同权
        //     var t3 = json.data.f279 == 1 ? "是" : "否";
        //     $("#quote-TGTQ-custom").html(t3);
        // }
        if (json.data.f293 != "-") {
          //是否有表决权差异
          var t3 = json.data.f293 == 1 ? "是" : "否";
          $("#quote-BJCY-custom").html(t3);
        }
        if (json.data.f288 == "0" || json.data.f288 == "1") {
          //是否盈利
          var t4 = json.data.f288 == 1 ? "否" : "是";
          $("#quote-YL-custom").html(t4);
        }

        //创业板
        setTimeout(function() {
          headdata.init(stockentry);
        }, 100);
      } else {
        $("#h5chartheadwrap").show();
        $("#h5chartheadwrapcyb").remove();
        $("#fs_ph_tab").css({ display: "none" });
        setTimeout(function() {
          headdata.init(stockentry);
        }, 100);
      }
    } catch (error) {}
  });
}

function h5chart() {
  var query = URI.parseQuery("?code=600185&market=1&type=k");
  var stockentry = {
    code: query.code,
    marketnum: query.market,
    shortmarket: query.market === "1" ? "sh" : "sz",
    id: query.id || query.code + query.market,
    newmarket: query.market === "1" ? "1" : "0", //1sh 0sz
  };

  this.init = function() {
    var newcodeMk = stockentry.newmarket + "." + stockentry.code;
    getstockinfos(newcodeMk, stockentry).then(function() {
      // console.info(stock_state)
      renderChart.apply(this, [chartTpye]);
    });

    var chartTpye = (query.type || "").toLowerCase();

    //老的分时成交
    new minutedeals({
      id: stockentry.id,
      code: stockentry.code,
      newmarket: stockentry.newmarket,
    }).load();

    renderQuote.apply(this);

    $("#quote-code").html(stockentry.code);
    var offset_tips_h = $("#deal_detail").offset().top;
    var msg_h = $("#detail-msg-more").height();
    var _height = $(window).height() - offset_tips_h - msg_h;
    if (_height <= 90) {
      _height = 90;
    }
    $("#deal_detail").height(_height);
  };

  var tsq;
  function renderChart(type) {
    type = type || "r";
    var wh = Math.max(568, $(window).height());
    var offset_h = $("#chart-container").offset().top;
    var _width, _height;
    _height = Math.floor(wh - offset_h) - 5;
    var rBoxW = $("#r-box-table").outerWidth(true);

    if ($(window).width() >= 1200) {
      _width = Math.floor($(window).width() - rBoxW);
    } else {
      _width = 1200 - rBoxW;
    }
    var cyqtypes = ["k", "wk", "mk", "m5k", "m15k", "m30k", "m60k"];
    var authority = getExrightsType();
    var options = {
      entry: stockentry,
      type: type,
      width: _width,
      height: _height,
      iscr: stock_state == "pre",
      authorityType: authority,
      update: stock_state == "close" ? -1 : 60 * 1000, //
      padding: {
        top: 0,
        bottom: 20,
      },
      show: { indicatorArea: true },
      onComplete: function() {
        $("#chart-container").trigger("drawComplete.emchart");
      },
      // update: 60 * 1000
    };
    //this.chartType = options.type;
    var timeloader = new chartmanager("time", options),
      kloader = new chartmanager("k", options),
      timechart,
      kchart;

    var $cr = $("#type-selector i[data-type=cr]");
    $("#quote-time")
      .on("tick", function(e, time, status) {
        if (status === "close") {
          timeloader.stop();
          kloader.stop();
        }
      })
      .one("tick", function(e, time, status) {
        if (status === "pre") {
          if (!$cr.hasClass("cur")) $cr.click();
        }
      });

    $("#quote-close-main").on("tsq.change", function(e, data) {
      var opt = $("#chart-container").data();
      if (!timechart || opt.charttype !== "r") return false;
      var chartdata = timeloader.datacache.time;
      if (chartdata && chartdata.data instanceof Array) {
        var minute = chartdata.data.pop();
        if (typeof minute === "string") {
          var items = minute.split(",");
          if (items[1] != data) {
            items[1] = data;
            chartdata.data.push(items.join(","));
            timechart.setData(timeloader.datacache);
            timechart.redraw();
          } else {
            chartdata.data.push(minute);
          }
        }
      }
    });

    /** @type {chartmanager} */
    var chartloader;
    $("#type-selector .dataType").click(function() {
      $("#rk-box .rk-options").hide();
      $("#rk-box .select-icon").removeClass("select-up");
      $("#select-authority").removeClass("cur");
      if (chartloader) chartloader.stop();
      chartloader = timeloader;
      var $dom = $(this);
      if ($dom.hasClass("cur")) return false;
      var type = $dom.data("type");
      var displayTools = false;
      $("#type-selector .dataType.cur,#day-selector.cur").removeClass("cur");
      options.type = type;
      options.iscr = false;
      options.isph = false;
      if (type === "r") {
        $("#rk-box .r-box").hide(); //分时的时候右侧所有按钮隐藏
        $("#day-selector").removeClass("cur");
        options.iscr = false;
        options.type = type;
      } else if (type === "cr") {
        $("#rk-box .r-box").hide(); //盘前的时候右侧所有按钮隐藏
        options.iscr = true;
        options.type = "r";
      } else if (type === "ar") {
        //盘后
        $("#rk-box .r-box").hide();
        options.iscr = false;
        options.isph = true;
        options.type = "r";
      } else if (["t2", "t3", "t4", "t5"].indexOf(type) >= 0) {
        options.iscr = false;
        options.isph = false;
        $("#day-selector").addClass("cur");
        $("#day-selector .rk-options").hide();
        $("#rk-box  .cmfb-li").hide();
      } else {
        displayTools = true;
        $("#day-selector").removeClass("cur");
        if (cyqtypes.indexOf(type) < 0) {
          $("#btn-cyq").hide();
          if ($("#btn-cyq").hasClass("cur")) {
            $("#btn-cyq").click();
          }
          $("#select-authority").hide();
          options.yAxisType = 2;
        } else {
          $("#btn-cyq").show();
          $("#select-authority").show();
        }
        chartloader = kloader;
      }
      $("#chart-container").data("charttype", options.type);
      displayKChartToolBar(displayTools);
      $dom.addClass("cur");
      var currentchart = chartloader.load();
      if (options.type === "r") {
        timechart = currentchart;
      } else {
        kchart = currentchart;
      }
      return false;
    });

    $("#day-selector .click-icon").click(function(event) {
      $("#authority-options").hide();
      $("#select-authority").removeClass("cur");
      $("#select-authority .select-icon").removeClass("select-up");

      if ($("#day-selector .select-icon").hasClass("select-up")) {
        if (!$("#day-selector .selected-box ").hasClass("cur")) {
          //考虑点击之前就已经是cur状态所以要判断
          $("#day-selector").removeClass("cur");
        }
        $("#day-selector .rk-options").hide();
        $("#day-selector .select-icon").removeClass("select-up");
      } else {
        //加cur为防止鼠标离开的时候rk-options未消失上面的盒子已经变橙色
        $("#day-selector").addClass("cur");
        $("#day-selector .rk-options").show();
        $("#day-selector .select-icon").addClass("select-up");
      }
      return false;
    });

    $("#day-selector .data-type").click(function() {
      displayKChartToolBar(false);
      var $dom = $(this);
      $("#day-selector .rk-options").hide();
      $("#day-selector .select-icon").removeClass("select-up");

      if ($dom.hasClass("cur")) return false;
      var type = $dom.data("type");
      var _html = $dom.html();
      if (type == "r") {
        $("#day-selector").removeClass("cur");
        $("#type-selector .dataType").removeClass("cur");
        $("#type-selector .fshBox").addClass("cur");
      } else {
        $("#type-selector .dataType").removeClass("cur");
        $("#day-selector").addClass("cur");
        $("#day-selector .selected-box")
          .html(_html)
          .attr("data-type", type);
        $("#selected-box").removeClass("cur");
        $("#day-selector .data-type").removeClass("cur");
        $dom.addClass("cur");
      }
      options.iscr = false;
      options.type = type;
      timechart = timeloader.load();
      return false;
    });

    $("[data-type=" + type + "]", "#type-selector, #day-selector").click();

    //拉长
    $("#btn-stretchout").click(function(e) {
      $("#rk-box .rk-options").hide();
      $("#rk-box .select-icon").removeClass("select-up");
      $("#select-authority").removeClass("cur");

      if (typeof kchart.elongate === "function") kchart.elongate();
      return false;
    });

    //缩短
    $("#btn-drawback").click(function(e) {
      $("#rk-box .rk-options").hide();
      $("#rk-box .select-icon").removeClass("select-up");
      $("#select-authority").removeClass("cur");

      if (typeof kchart.shorten === "function") kchart.shorten();
      return false;
    });

    //读取存入的前后复权
    if (typeof authority === "string") {
      $("#authority-options>span").removeClass("cur");
      $("#authority-options>span").each(function() {
        if ($(this).attr("value") == authority) {
          var html = $(this).html();
          var val = $(this).attr("value");
          $(this).addClass("cur");
          $("#authority-options i.cur").html();
          $("#select-authority .selected-box")
            .html(html)
            .attr("value", val);
        }
      });
    }

    //前后复权的下拉点击
    $("#select-authority").click(function() {
      $("#day-selector .rk-options").hide();
      $("#day-selector .select-icon").removeClass("select-up");

      if ($("#select-authority .select-icon").hasClass("select-up")) {
        $("#authority-options").hide();
        $("#select-authority").removeClass("cur");
        $("#select-authority .select-icon").removeClass("select-up");
      } else {
        $("#authority-options").show();
        $("#select-authority").addClass("cur");
        $("#select-authority .select-icon").addClass("select-up");
      }

      return false;
    });

    // 前后复权的下来盒子里的内容点击事件
    $("#authority-options>span").click(function() {
      var html = $(this).html();
      var val = $(this).attr("value");
      //var selected_val = $('#select-authority .selected-box').attr('value');
      var _html = $("#authority-options .cur").html();
      $("#authority-options").hide();
      $("#select-authority").removeClass("cur");
      if (html == _html) {
        return false;
      }
      $("#authority-options .cur").removeClass("cur");
      $(this).addClass("cur");
      $("#select-authority .selected-box")
        .html(html)
        .attr("value", val);
      $("#select-authority .select-icon").removeClass("select-up");
      setExrightsType(val || "");
      options.authorityType = val;
      kchart = kloader.load();
      return false;
    });

    //点击页面其他地方下拉的盒子都隐藏
    $(document).click(function() {
      $("#rk-box .rk-options").hide();
      $("#rk-box .select-icon").removeClass("select-up");
      $("#select-authority").removeClass("cur");
      //点击了下拉没有选的时候可能会出现两个cur排除并删除一个
      if (
        $("#day-selector").hasClass("cur") &&
        $("#type-selector .dataType")
          .not(".selected-box")
          .hasClass("cur")
      ) {
        $("#day-selector").removeClass("cur");
      }
    });

    var $cyqtips = $(
      '<div class="cyq-tips"><span class="tips fl">筹码分布<b class="icon-help"></b></span><a class="close fr"><b class="icon-leave"></b>离开</a></div>'
    );
    $cyqtips.find(".tips").tooltip({
      content:
        "红色筹码表示低于收盘价的获利筹码，蓝色筹码表示高于收盘价的套牢筹码",
    });
    $cyqtips.find(".close").click(function(e) {
      $("#btn-cyq").click();
      return false;
    });

    //筹码分布点击事件
    $("#btn-cyq").click(function(e, redraw) {
      var $this = $(this);
      if (!$this.hasClass("cur")) {
        $("#kchart-toolbar").data("cyq", true);
        $this.addClass("cur");
        $(".is-hide", $("#r-box-table")).hide();
        $("#r-box-table .wbc-table").css("height", "32px");
        $("#sell-table").css("border", 0);
        $("#chart-container").trigger("loadcyq.emchart");
      } else {
        $this.removeClass("cur");
        $("#kchart-toolbar").data("cyq", false);
        $(".is-hide", $("#r-box-table")).show();
        $("#r-box-table .wbc-table").css("height", "56px");
        $("#sell-table").css("border-bottom", "solid 1px #e5e5e5");
        $("#chart-container").trigger("destorycyq.emchart");
      }
      if (redraw !== false) {
        kchart = kloader.load();
      }
      return false;
    });

    $("#chart-container")
      .on("loadcyq.emchart", function(e) {
        $("#chart-container").data("cyq", true);
        options.width = $(window).width();
        options.cyq = {
          width: 270,
          gap: 10,
          accuracyFactor: 150,
          range: 120,
        };
        options.padding.right = 3;
      })
      .on("destorycyq.emchart", function(e) {
        var ct = $("#chart-container").data("charttype");
        if (cyqtypes.indexOf(ct) >= 0) {
          $("#chart-container").data("cyq", false);
        }
        $cyqtips.hide();
        options.width = _width;
        options.cyq = false;
        options.padding.right = 65;
      });

    // JS图画图完成事件
    $("#chart-container").on("drawComplete.emchart", function(e) {
      var opt = $(this).data();
      // 筹码分布提示栏 'm5k', 'm15k', 'm30k', 'm60k'
      if (opt.cyq && cyqtypes.indexOf(opt.charttype) >= 0) {
        $("#chart-container").append($cyqtips.show());
      }
    });

    $("#type-selector, .r-box").on("selectstart", function() {
      return false;
    });
    bindKeyBoardsEvent();
    /**
     * 显示K图工具栏
     * @param {boolean} show 是否显示
     */
    function displayKChartToolBar(show) {
      var displayed = $("#btn-cyq").hasClass("cur");
      var cyq = $("#chart-container").data("cyq");
      if (show) {
        $("#kchart-toolbar").show();
        if (cyq && !displayed) {
          $("#btn-cyq").trigger("click", [false]);
        }
      } else {
        $("#kchart-toolbar").hide();
        if (displayed) {
          $("#btn-cyq").trigger("click", [false]);
        }
      }
    }
    /**
     * 行情图键击事件
     */
    function bindKeyBoardsEvent() {
      var hub = new windowMessageHub();
      $("#chart-container").focus();
      $("#chart-container").on("keydown", function(e) {
        var istime = ["r", "t2", "t3", "t4", "t5"].indexOf(options.type) >= 0;
        switch (e.which) {
          case 13:
            if (istime) {
              $("#type-selector [data-type=k]").click();
            } else {
              $("#type-selector [data-type=r]").click();
            }
            break;
          case 38:
            if (!istime && typeof kchart.shorten === "function")
              kchart.shorten();
            break;
          case 40:
            if (!istime && typeof kchart.elongate === "function")
              kchart.elongate();
            break;
          case 27:
            hub.send("--close");
            break;
        }
      });
    }
  }

  function renderQuote(args) {
    return false;
    var _opt = getoptions(args);
    var cname =
      "TSQ_" + (_opt.entry.shortmarket + _opt.entry.code).toUpperCase();
    if (tsq) tsq.stop();
    tsq = this.quoteLoader = new TopSpeedQuote(cname, {
      host: "push1.eastmoney.com",
      stopWithoutQuote: true,
      enableMutiDomain: true,
    });
    tsq.start();
    return tsq;

    function getoptions(args) {
      return marge(
        {
          entry: stockentry || {
            id: "3000592",
            code: "300059",
            marketnum: "2",
            shortmarket: "sz",
          },
          basic: {
            ajax: {
              url:
                "//nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&sty=CFPCD&js=((x))&token=4f1862fc3b5e77c150a2b985b12db0fd",
              data: {},
              dataType: "jsonp",
              jsonp: "cb",
            },
            update: 1000 * 60 * 2,
          },
        },
        args
      );
    }
  }
}

/**
 * 获取行情图除复权类型
 */
function getExrightsType() {
  var type = cookie("emhq_picfq");
  switch (type) {
    case "0":
      return "";
    case "1":
      return "fa";
    case "2":
      return "ba";
    default:
      return "fa";
  }
}

/**
 * 设置行情图除复权类型
 * @param {''|'fa'|'ba'} type 类型
 */
function setExrightsType(type) {
  var val = type;
  switch (type) {
    case "":
      val = "0";
      break;
    case "fa":
      val = "1";
      break;
    case "ba":
      val = "2";
      break;
  }
  cookie("emhq_picfq", val, {
    expires: 365, //天
    path: "/",
    domain: ".eastmoney.com",
  });
}

function windowMessageHub() {
  var orgin = location.protocol + "//" + location.host;
  var client = window.parent;
  this.connected = false;
  $(window).on("message", function(e) {
    var event = e.origin ? e : e.originalEvent;
    /** @type {Window} */
    var source = event.source;
    if (event.origin !== window.location.host) return;
    if (event.data === "connecting") {
      source.postMessage("connected", orgin);
      client = source;
      this.connected = true;
    }
  });
  /**
   * 发送消息
   * @param {string} msg 消息
   */
  this.send = function(msg) {
    client.postMessage(msg, orgin);
  };
  this.onreceivemsg = function(e) {
    console.log(e);
  };
}

module.exports = h5chart;

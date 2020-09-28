var _ = require("lodash");
var marge = _.merge;
var $ = require("jquery");

function textColor(text, num) {
  if (num == null || num == undefined || isNaN(num)) {
    return text;
  }
  if (num > 0) {
    return '<span class="red">' + text + "</span>";
  } else if (num < 0) {
    return '<span class="green">' + text + "</span>";
  } else {
    return text;
  }
}

//新
function getHeadData(stockentry) {
  var secids = stockentry.newmarket + "." + stockentry.code;
  //正式地址：
  var url =
    "//" +
    (Math.floor(Math.random() * 99) + 1) +
    ".push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531,f59&secid=" +
    secids;
  //测试地址：
  //var url = "http://61.152.230.191/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;
  if (window.location.search.indexOf("env=test") > -1) {
    url =
      "http://61.152.230.207/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531,f59&secid=" +
      secids;
  }
  $.ajax({
    url: url,
    scriptCharset: "utf-8",
    dataType: "jsonp",
    jsonp: "cb",
    success: function(json) {
      if (json.data) {
        formatHead(json);
        sseHeadData(stockentry);
      }
    },
  });
}

//sse
function sseHeadData(stockentry) {
  var secids = stockentry.newmarket + "." + stockentry.code;
  //测试地址
  // var url = "http://61.152.230.191/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" + secids;
  //正式地址
  var url =
    "//" +
    (Math.floor(Math.random() * 99) + 1) +
    ".push2.eastmoney.com/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" +
    secids;
  if (window.location.search.indexOf("env=test") > -1) {
    url =
      "http://61.152.230.207/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" +
      secids;
  }
  var evtSource = new EventSource(url);
  evtSource.onmessage = function(msg) {
    // console.log('head sse 推送')
    var obj = JSON.parse(msg.data);
    if (obj.data) {
      formatHead(obj);
      changeColor(obj.data);
    }
  };
}
//head format
var headSourceData;
function formatHead(data) {
  // console.log(data);
  if (data.full == 1 && data.data) {
    headSourceData = data.data;
  } else if (data.full == 0 && data.data) {
    if (headSourceData) {
      headSourceData = marge(headSourceData, data.data);
    }
  }
  renderHead(headSourceData);
  renderSellandBuy(headSourceData);
}

//增加颜色判断
function changeColor(data) {
  //换手
  if (data.f168) {
    flickerBlue($("#quote-turnoverRate-custom"));
  }

  //成交量
  if (data.f47) {
    flickerBlue($("#quote-volume-custom"));
  }

  //成交额
  if (data.f48) {
    flickerBlue($("#quote-amount-custom"));
  }

  if (data.f167) {
    flickerBlue($("#quote-PB-custom"));
  }

  //总市值
  if (data.f116) {
    flickerBlue($("#quote-marketValue-custom"));
  }
  if (data.f117) {
    flickerBlue($("#quote-flowCapitalValue-custom"));
  }

  //委比
  if (data.f191 > 0 && data.f191 && data.f191 != "-") {
    flickerRed($("#quote-cr"));
  } else if (data.f191 < 0) {
    flickerGreen($("#quote-cr"));
  }

  //委差
  if (data.f192 > 0 && data.f192 && data.f192 != "-") {
    flickerRed($("#quote-cd"));
  } else if (data.f192 < 0) {
    flickerGreen($("#quote-cd"));
  }

  //最新价 涨跌额 涨跌幅
  if (data.f170 && data.f170 > 0) {
    flickerRed($("#quote-close-main"));
    flickerRed($("#quote-change-main"));
    flickerRed($("#quote-changePercent-main"));
  } else if (data.f170 && data.f170 < 0) {
    flickerGreen($("#quote-close-main"));
    flickerGreen($("#quote-change-main"));
    flickerGreen($("#quote-changePercent-main"));
  }

  //sell 颜色
  if (data.f32) {
    flickerBlue($("#quote-s5v"));
  }
  if (data.f34) {
    flickerBlue($("#quote-s4v"));
  }
  if (data.f36) {
    flickerBlue($("#quote-s3v"));
  }
  if (data.f38) {
    flickerBlue($("#quote-s2v"));
  }
  if (data.f40) {
    flickerBlue($("#quote-s1v"));
  }

  //buy 颜色
  if (data.f20) {
    flickerBlue($("#quote-b1v"));
  }

  if (data.f18) {
    flickerBlue($("#quote-b2v"));
  }

  if (data.f16) {
    flickerBlue($("#quote-b3v"));
  }

  if (data.f14) {
    flickerBlue($("#quote-b4v"));
  }

  if (data.f12) {
    flickerBlue($("#quote-b5v"));
  }

  if (data.f206 && data.f206 > 0) {
    // flickerRed($("#quote-s5d"));
    $("#quote-s5d").addClass("red");
    $("#quote-s5d").removeClass("green");
  } else if (data.f206 && data.f206 < 0) {
    // flickerBlue($("#quote-s5d"))
    $("#quote-s5d").addClass("green");
    $("#quote-s5d").removeClass("red");
  }

  if (data.f207 && data.f207 > 0) {
    // flickerRed($("#quote-s4d"));
    $("#quote-s4d").addClass("red");
    $("#quote-s4d").removeClass("green");
  } else if (data.f207 && data.f207 < 0) {
    // flickerBlue($("#quote-s4d"))
    $("#quote-s4d").addClass("green");
    $("#quote-s4d").removeClass("red");
  }

  if (data.f208 && data.f208 > 0) {
    // flickerRed($("#quote-s3d"));
    $("#quote-s3d").addClass("red");
    $("#quote-s3d").removeClass("green");
  } else if (data.f208 && data.f208 < 0) {
    // flickerBlue($("#quote-s3d"))

    $("#quote-s3d").addClass("green");
    $("#quote-s3d").removeClass("red");
  }

  if (data.f209 && data.f209 > 0) {
    // flickerRed($("#quote-s2d"));
    $("#quote-s2d").addClass("red");
    $("#quote-s2d").removeClass("green");
  } else if (data.f209 && data.f209 < 0) {
    // flickerBlue($("#quote-s2d"))
    $("#quote-s2d").addClass("green");
    $("#quote-s2d").removeClass("red");
  }

  if (data.f210 && data.f210 > 0) {
    // flickerRed($("#quote-s1d"));
    $("#quote-s1d").addClass("red");
    $("#quote-s1d").removeClass("green");
  } else if (data.f210 && data.f210 < 0) {
    // flickerBlue($("#quote-s1d"))
    $("#quote-s1d").addClass("green");
    $("#quote-s1d").removeClass("red");
  }

  if (data.f211 && data.f211 > 0) {
    $("#quote-b1d").addClass("red");
    $("#quote-b1d").removeClass("green");
  } else if (data.f211 && data.f211 < 0) {
    $("#quote-b1d").addClass("green");
    $("#quote-b1d").removeClass("red");
  }

  if (data.f212 && data.f212 > 0) {
    $("#quote-b2d").addClass("red");
    $("#quote-b2d").removeClass("green");
  } else if (data.f212 && data.f212 < 0) {
    $("#quote-b2d").addClass("green");
    $("#quote-b2d").removeClass("red");
  }

  if (data.f213 && data.f213 > 0) {
    $("#quote-b3d").addClass("red");
    $("#quote-b3d").removeClass("green");
  } else if (data.f213 && data.f213 < 0) {
    $("#quote-b3d").addClass("green");
    $("#quote-b3d").removeClass("red");
  }

  if (data.f214 && data.f214 > 0) {
    $("#quote-b4d").addClass("red");
    $("#quote-b4d").removeClass("green");
  } else if (data.f214 && data.f214 < 0) {
    $("#quote-b4d").addClass("green");
    $("#quote-b4d").removeClass("red");
  }

  if (data.f215 && data.f215 > 0) {
    $("#quote-b5d").addClass("red");
    $("#quote-b5d").removeClass("green");
  } else if (data.f215 && data.f215 < 0) {
    $("#quote-b5d").addClass("green");
    $("#quote-b5d").removeClass("red");
  }
}

//增加数据格式判断--head成交量
function myformatNum(num) {
  if (num == 0) {
    return num;
  }
  if (num == undefined || num == "" || isNaN(num) || num == "-") {
    return "-";
  }

  var hz = "";
  var num2 = "";
  if (num >= 10000000000000) {
    num = num / 1000000000000;
    hz = "万亿";
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 1000000000000 && num < 10000000000000) {
    num = num / 1000000000000;
    hz = "万亿";
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 100000000000 && num < 1000000000000) {
    num = num / 100000000;
    hz = "亿";
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 10000000000 && num < 100000000000) {
    num = num / 100000000;
    hz = "亿";
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 100000000 && num < 10000000000) {
    num = num / 100000000;
    hz = "亿";
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 10000000 && num < 100000000) {
    num = num / 10000;
    hz = "万";
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 1000000 && num < 10000000) {
    num = num / 10000;
    hz = "万";
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 10000 && num < 1000000) {
    num = num / 10000;
    hz = "万";
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 1000 && num < 10000) {
    num2 = parseFloat(num).toFixed(0);
  } else if (num >= 100 && num < 1000) {
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 1 && num < 100) {
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 0 && num < 1) {
    num2 = parseFloat(num).toFixed(3);
  } else if (num < 0) {
    num2 = parseFloat(num).toFixed(2);
  } else {
    num2 = parseFloat(num).toFixed(2);
    // return num;
  }
  // if(parseInt(num) >= 1000){ //整数部分超过4位
  //   num2 = num.toFixed(1);
  // }

  return num2.toString() + hz;
}

function kcbMyformatNum(num) {
  if (num == undefined || num == "" || isNaN(num) || num == "-") {
    return "";
  }

  var hz = "";
  var num2 = "";

  if (num >= 0 && num <= 99.999999999) {
    num2 = parseFloat(num).toFixed(2);
  } else if (num >= 100 && num <= 999) {
    num2 = parseFloat(num).toFixed(1);
  } else if (num >= 1000) {
    num2 = parseFloat(num).toFixed(0);
  }

  //处理小于0
  if (num < 0) {
    num = Math.abs(num);

    if (num >= 0 && num <= 99) {
      num2 = parseFloat(num).toFixed(2);
    } else if (num >= 100 && num <= 999) {
      num2 = parseFloat(num).toFixed(1);
    } else if (num >= 1000) {
      num2 = parseFloat(num).toFixed(0);
    }
    num2 = "-" + num2;
  }
  return num2.toString() + hz;
}

//渲染头部
var tscache = {};

function renderHead(data) {
  if (!isNaN(data.f59)) {
    tscache.f59 = data.f59;
  }
  if (!isNaN(data.f152)) {
    tscache.f152 = data.f152;
  }

  //名称
  $("#quote-name").html(data.f58);
  //最新价
  if (data.f43 > data.f60) {
    $("#quote-close-main").css("color", "red");
    $("#quote-arrow").show();
    $("#quote-arrow").addClass("icon-fullScreen-up");
    $("#quote-arrow").removeClass("icon-fullScreen-down");
  } else if (data.f43 < data.f60) {
    $("#quote-close-main").css("color", "green");
    $("#quote-arrow").show();
    $("#quote-arrow").addClass("icon-fullScreen-down");
    $("#quote-arrow").removeClass("icon-fullScreen-up");
  } else {
    $("#quote-close-main").css("color", "black");
    $("#quote-arrow").hide();
  }

  if (data.f43 != "-" && data.f43) {
    $("#quote-close-main").html(data.f43.toFixed(data.f152));
  } else {
    $("#quote-close-main").html("-");
  }

  //涨跌额

  if (data.f169 > 0) {
    $("#quote-change-main").css("color", "red");
  } else if (data.f169 < 0) {
    $("#quote-change-main").css("color", "green");
  } else {
    $("#quote-change-main").css("color", "black");
  }

  if (data.f169 != "-" && data.f169) {
    $("#quote-change-main").html(data.f169.toFixed(data.f152));
  } else if (data.f169 == 0) {
    $("#quote-change-main").html("0.00");
  } else {
    $("#quote-change-main").html("-");
  }

  //涨跌幅
  var zdfvalue;
  if (data.f170 != "-" && data.f170) {
    zdfvalue = data.f170.toFixed(data.f152);
  } else if (data.f170 == "0") {
    zdfvalue = "0.00";
  } else {
    zdfvalue = "-";
  }

  if (data.f170 > 0) {
    $("#quote-changePercent-main").css("color", "red");
  } else if (data.f170 < 0) {
    $("#quote-changePercent-main").css("color", "green");
  } else {
    $("#quote-changePercent-main").css("color", "black");
  }
  if (zdfvalue != "-") {
    $("#quote-changePercent-main").html(zdfvalue + "%");
  } else {
    $("#quote-changePercent-main").html("-");
  }

  //今开
  if (data.f46 > data.f60) {
    $("#quote-open-custom").addClass("red");
  } else if (data.f46 < data.f60) {
    $("#quote-open-custom").addClass("green");
  }
  if (data.f46 != "-" && data.f46) {
    $("#quote-open-custom").html(data.f46.toFixed(data.f152));
  } else {
    $("#quote-open-custom").html("-");
  }

  //最高
  if (data.f44 > data.f60) {
    $("#quote-high-custom").addClass("red");
  } else if (data.f44 < data.f60) {
    $("#quote-high-custom").addClass("green");
  }

  if (data.f44 != "-" && data.f44) {
    $("#quote-high-custom").html(data.f44.toFixed(data.f152));
  } else {
    $("#quote-high-custom").html("-");
  }

  //换手
  if (data.f168 && data.f168 != "-") {
    $("#quote-turnoverRate-custom").html(data.f168.toFixed(2) + "%");
  } else {
    $("#quote-turnoverRate-custom").html("-");
  }

  //成交量
  if (data.f47 && data.f47 != "-") {
    $("#quote-volume-custom").html(myformatNum(data.f47) + "手");
  } else {
    $("#quote-volume-custom").html("-");
  }

  //市净率
  if (data.f167 && data.f167 != "-") {
    $("#quote-PB-custom").html(data.f167.toFixed(tscache.f152));
  } else {
    $("#quote-PB-custom").html("-");
  }

  //市盈率
  if (data.f162 && data.f162 != "-") {
    $("#quote-PERation-custom").html(data.f162.toFixed(2));
  } else {
    $("#quote-PERation-custom").html("-");
  }

  //盈利
  var yingli = "";
  if (data.f288 == "1") {
    yingli = "否";
  } else if (data.f288 == "0") {
    yingli = "是";
  } else {
    yingli = "-";
  }
  $("#quote-ylValue-custom").html(yingli);

  //盘后成交量
  if (kcbMyformatNum(data.f260) != "-" && kcbMyformatNum(data.f260)) {
    $("#quote-phcjl-custom").html(kcbMyformatNum(data.f260) + "手");
  } else {
    $("#quote-phcjl-custom").html("-");
  }

  //昨收
  if (data.f60 != "-" && data.f60) {
    $("#quote-pc").html(data.f60.toFixed(data.f152));
  } else {
    $("#quote-pc").html("-");
  }

  //最低
  if (data.f45 > data.f60) {
    $("#quote-low-custom").addClass("red");
  } else if (data.f45 < data.f60) {
    $("#quote-low-custom").addClass("green");
  }

  if (data.f45 != "-" && data.f45) {
    $("#quote-low-custom").html(data.f45.toFixed(data.f152));
  } else {
    $("#quote-low-custom").html("-");
  }

  //量比
  $("#quote-volumeRate-custom").html(data.f50);

  //成交额
  $("#quote-amount-custom").html(myformatNum(data.f48));

  //总市值
  $("#quote-marketValue-custom").html(myformatNum(data.f116));

  //流通市值
  $("#quote-flowCapitalValue-custom").html(myformatNum(data.f117));

  //同股同权
  var tgtq = "";
  if (data.f279 == "1") {
    tgtq = "是";
  } else if (data.f279 == "0") {
    tgtq = "否";
  } else {
    tgtq = "-";
  }

  $("#quote-tgtq-custom").html(tgtq);

  //盘后成交额
  $("#quote-pscje-custom").html(myformatNum(data.f261));

  //委比
  if (data.f191 > 0 && data.f191 && data.f191 != "-") {
    $("#quote-cr").addClass("red");
    $("#quote-cr").removeClass("green");
  } else if (data.f191 < 0) {
    $("#quote-cr").addClass("green");
    $("#quote-cr").removeClass("red");
  }

  var wbval = "";
  if (data.f191 != "-" && data.f191) {
    wbval = data.f191.toFixed(2);
    $("#quote-cr").html(wbval + "%");
  } else {
    $("#quote-cr").html("-");
  }

  //委差
  if (data.f192 > 0) {
    $("#quote-cd").addClass("red");
    $("#quote-cd").removeClass("green");
  } else if (data.f192 < 0) {
    $("#quote-cd").addClass("green");
    $("#quote-cd").removeClass("red");
  }
  $("#quote-cd").html(kcbMyformatNum(data.f192));

  //涨停
  if (data.f51 > data.f60) {
    $("#quote-raisePrice-main")
      .add("#quote-raisePrice-custom")
      .addClass("red");
  } else if (data.f51 < data.f60) {
    $("#quote-raisePrice-main")
      .add("#quote-raisePrice-custom")
      .addClass("green");
  }

  if (data.f51 != "-" && data.f51) {
    $("#quote-raisePrice-main")
      .add("#quote-raisePrice-custom")
      .html(data.f51.toFixed(2));
  } else {
    $("#quote-raisePrice-main")
      .add("#quote-raisePrice-custom")
      .html("-");
  }

  //跌停
  if (data.f52 > data.f60) {
    $("#quote-fallPrice-main")
      .add("#quote-fallPrice-custom")
      .addClass("red");
  } else if (data.f52 < data.f60) {
    $("#quote-fallPrice-main")
      .add("#quote-fallPrice-custom")
      .addClass("green");
  }

  if (data.f52 != "-" && data.f52) {
    $("#quote-fallPrice-main")
      .add("#quote-fallPrice-custom")
      .html(data.f52.toFixed(2));
  } else {
    $("#quote-fallPrice-main")
      .add("#quote-fallPrice-custom")
      .html("-");
  }
}

//渲染买卖入
function renderSellandBuy(data) {
  // console.log('selll')
  // console.log(data)
  var MaxCount = [];
  MaxCount.push(
    data.f32,
    data.f34,
    data.f36,
    data.f38,
    data.f40,
    data.f20,
    data.f18,
    data.f16,
    data.f14,
    data.f12
  );
  var mv = Math.max.apply(this, MaxCount);
  if (data) {
    //sell 5
    if (data.f31 > data.f60) {
      $("#quote-s5p").css("color", "red");

      $("#quote-s5vp").removeClass("green");
      $("#quote-s5vp").addClass("red");
    } else if (data.f31 < data.f60) {
      $("#quote-s5p").css("color", "#009944");

      $("#quote-s5vp").removeClass("red");
      $("#quote-s5vp").addClass("green");
    } else if (data.f31 == data.f60) {
      $("#quote-s5p").css("color", "black");

      $("#quote-s5vp").removeClass("green");
      $("#quote-s5vp").addClass("red");
    }
    if (data.f31 == "-") {
      $("#quote-s5vp")
        .removeClass("green")
        .removeClass("red");
    }

    if (data.f31 != "-" && data.f31) {
      $("#quote-s5p").html(data.f31.toFixed(data.f152));
    }

    //sell 4
    if (data.f33 > data.f60) {
      $("#quote-s4p").css("color", "red");

      $("#quote-s4vp").removeClass("green");
      $("#quote-s4vp").addClass("red");
    } else if (data.f33 < data.f60) {
      $("#quote-s4p").css("color", "#009944");

      $("#quote-s4vp").removeClass("red");
      $("#quote-s4vp").addClass("green");
    } else if (data.f33 == data.f60) {
      $("#quote-s4p").css("color", "black");

      $("#quote-s4vp").removeClass("green");
      $("#quote-s4vp").addClass("red");
    }

    if (data.f33 != "-" && data.f33) {
      $("#quote-s4p").html(data.f33.toFixed(data.f152));
    }
    if (data.f33 == "-") {
      $("#quote-s4vp")
        .removeClass("green")
        .removeClass("red");
    }

    //sell 3
    if (data.f35 > data.f60) {
      $("#quote-s3p").css("color", "red");

      $("#quote-s3vp").removeClass("green");
      $("#quote-s3vp").addClass("red");
    } else if (data.f35 < data.f60) {
      $("#quote-s3p").css("color", "#009944");

      $("#quote-s3vp").removeClass("red");
      $("#quote-s3vp").addClass("green");
    } else if (data.f35 == data.f60) {
      $("#quote-s3p").css("color", "black");

      $("#quote-s3vp").removeClass("green");
      $("#quote-s3vp").addClass("red");
    }

    if (data.f35 != "-" && data.f35) {
      $("#quote-s3p").html(data.f35.toFixed(data.f152));
    }
    if (data.f35 == "-") {
      $("#quote-s3vp")
        .removeClass("green")
        .removeClass("red");
    }

    //sell 2
    if (data.f37 > data.f60) {
      $("#quote-s2p").css("color", "red");

      $("#quote-s2vp").removeClass("green");
      $("#quote-s2vp").addClass("red");
    } else if (data.f37 < data.f60) {
      $("#quote-s2p").css("color", "#009944");

      $("#quote-s2vp").removeClass("red");
      $("#quote-s2vp").addClass("green");
    } else if (data.f37 == data.f60) {
      $("#quote-s2p").css("color", "black");

      $("#quote-s2vp").removeClass("green");
      $("#quote-s2vp").addClass("red");
    }

    if (data.f37 != "-" && data.f37) {
      $("#quote-s2p").html(data.f37.toFixed(data.f152));
    }
    if (data.f37 == "-") {
      $("#quote-s2vp")
        .removeClass("green")
        .removeClass("red");
    }

    //sell 1
    if (data.f39 > data.f60) {
      $("#quote-s1p").css("color", "red");

      $("#quote-s1vp").removeClass("green");
      $("#quote-s1vp").addClass("red");
    } else if (data.f39 < data.f60) {
      $("#quote-s1p").css("color", "#009944");

      $("#quote-s1vp").removeClass("red");
      $("#quote-s1vp").addClass("green");
    } else if (data.f39 == data.f60) {
      $("#quote-s1p").css("color", "black");

      $("#quote-s1vp").removeClass("green");
      $("#quote-s1vp").addClass("red");
    }

    if (data.f39 != "-" && data.f39) {
      $("#quote-s1p").html(data.f39.toFixed(data.f152));
    }

    if (data.f39 == "-") {
      $("#quote-s1vp")
        .removeClass("green")
        .removeClass("red");
    }

    //buy 1
    if (data.f19 > data.f60) {
      //#009944  green
      $("#quote-b1p").css("color", "red");

      $("#quote-b1vp").removeClass("green");
      $("#quote-b1vp").addClass("red");
    } else if (data.f19 < data.f60) {
      $("#quote-b1p").css("color", "#009944");

      $("#quote-b1vp").removeClass("red");
      $("#quote-b1vp").addClass("green");
    } else if (data.f19 == data.f60) {
      $("#quote-b1p").css("color", "black");

      $("#quote-b1vp").removeClass("green");
      $("#quote-b1vp").addClass("red");
    }
    if (data.f19 != "-" && data.f19) {
      $("#quote-b1p").html(data.f19.toFixed(data.f152));
    }
    if (data.f19 == "-") {
      $("#quote-b1vp")
        .removeClass("green")
        .removeClass("red");
    }

    //buy 2
    if (data.f17 > data.f60) {
      $("#quote-b2p").css("color", "red");

      $("#quote-b2vp").removeClass("green");
      $("#quote-b2vp").addClass("red");
    } else if (data.f17 < data.f60) {
      $("#quote-b2p").css("color", "#009944");

      $("#quote-b2vp").removeClass("red");
      $("#quote-b2vp").addClass("green");
    } else if (data.f17 == data.f60) {
      $("#quote-b2p").css("color", "black");

      $("#quote-b2vp").removeClass("green");
      $("#quote-b2vp").addClass("red");
    }
    if (data.f17 != "-" && data.f17) {
      $("#quote-b2p").html(data.f17.toFixed(data.f152));
    }
    if (data.f17 == "-") {
      $("#quote-b2vp")
        .removeClass("green")
        .removeClass("red");
    }

    //buy 3
    if (data.f15 > data.f60) {
      $("#quote-b3p").css("color", "red");

      $("#quote-b3vp").removeClass("green");
      $("#quote-b3vp").addClass("red");
    } else if (data.f15 < data.f60) {
      $("#quote-b3p").css("color", "#009944");

      $("#quote-b3vp").removeClass("red");
      $("#quote-b3vp").addClass("green");
    } else if (data.f15 == data.f60) {
      $("#quote-b3p").css("color", "black");

      $("#quote-b3vp").removeClass("green");
      $("#quote-b3vp").addClass("red");
    }
    if (data.f15 != "-" && data.f15) {
      $("#quote-b3p").html(data.f15.toFixed(data.f152));
    }
    if (data.f15 == "-") {
      $("#quote-b3vp")
        .removeClass("green")
        .removeClass("red");
    }

    //buy 4
    if (data.f13 > data.f60) {
      $("#quote-b4p").css("color", "red");

      $("#quote-b4vp").removeClass("green");
      $("#quote-b4vp").addClass("red");
    } else if (data.f13 < data.f60) {
      $("#quote-b4p").css("color", "#009944");

      $("#quote-b4vp").removeClass("red");
      $("#quote-b4vp").addClass("green");
    } else if (data.f13 == data.f60) {
      $("#quote-b4p").css("color", "black");

      $("#quote-b4vp").removeClass("green");
      $("#quote-b4vp").addClass("red");
    }
    if (data.f13 != "-" && data.f13) {
      $("#quote-b4p").html(data.f13.toFixed(data.f152));
    }
    if (data.f13 == "-") {
      $("#quote-b4vp")
        .removeClass("green")
        .removeClass("red");
    }

    //buy 5
    if (data.f11 > data.f60) {
      $("#quote-b5p").css("color", "red");

      $("#quote-b5vp").removeClass("green");
      $("#quote-b5vp").addClass("red");
    } else if (data.f11 < data.f60) {
      $("#quote-b5p").css("color", "#009944");

      $("#quote-b5vp").removeClass("red");
      $("#quote-b5vp").addClass("green");
    } else if (data.f13 == data.f60) {
      $("#quote-b5p").css("color", "black");

      $("#quote-b5vp").removeClass("green");
      $("#quote-b5vp").addClass("red");
    }
    if (data.f11 != "-" && data.f11) {
      $("#quote-b5p").html(data.f11.toFixed(data.f152));
    }
    if (data.f11 == "-") {
      $("#quote-b5vp")
        .removeClass("green")
        .removeClass("red");
    }

    //sell 5 count
    // $("#quote-s5v").html((data.f32));
    // $("#quote-s5v").html('-');
    if (data.f32 == "0") {
      $("#quote-s5v").html("-");
    } else {
      $("#quote-s5v").html(kcbMyformatNum(data.f32));
    }

    if (data.f34 == "0") {
      $("#quote-s4v").html("-");
    } else {
      $("#quote-s4v").html(kcbMyformatNum(data.f34));
    }

    if (data.f36 == "0") {
      $("#quote-s3v").html("-");
    } else {
      $("#quote-s3v").html(kcbMyformatNum(data.f36));
    }

    if (data.f38 == "0") {
      $("#quote-s2v").html("-");
    } else {
      $("#quote-s2v").html(kcbMyformatNum(data.f38));
    }

    if (data.f40 == "0") {
      $("#quote-s1v").html("-");
    } else {
      $("#quote-s1v").html(kcbMyformatNum(data.f40));
    }

    //sell
    $("#quote-s5vp").css("width", (data.f32 / mv) * 100 + "%");
    $("#quote-s4vp").css("width", (data.f34 / mv) * 100 + "%");
    $("#quote-s3vp").css("width", (data.f36 / mv) * 100 + "%");
    $("#quote-s2vp").css("width", (data.f38 / mv) * 100 + "%");
    $("#quote-s1vp").css("width", (data.f40 / mv) * 100 + "%");

    if ((data.f32 / mv) * 100 < 1 && data.f32 / mv != 0) {
      $("#quote-s5vp").css("width", "2%");
    }

    if ((data.f34 / mv) * 100 < 1 && data.f34 / mv != 0) {
      $("#quote-s4vp").css("width", "2%");
    }

    if ((data.f36 / mv) * 100 < 1 && data.f36 / mv != 0) {
      $("#quote-s3vp").css("width", "2%");
    }

    if ((data.f38 / mv) * 100 < 1 && data.f38 / mv != 0) {
      $("#quote-s2vp").css("width", "2%");
    }

    if ((data.f40 / mv) * 100 < 1 && data.f40 / mv != 0) {
      $("#quote-s1vp").css("width", "2%");
    }

    //buy 5 count quote-b1v
    if (data.f20 == "0") {
      $("#quote-b1v").html("-");
    } else {
      $("#quote-b1v").html(kcbMyformatNum(data.f20));
    }

    if (data.f18 == "0") {
      $("#quote-b2v").html("-");
    } else {
      $("#quote-b2v").html(kcbMyformatNum(data.f18));
    }

    if (data.f16 == "0") {
      $("#quote-b3v").html("-");
    } else {
      $("#quote-b3v").html(kcbMyformatNum(data.f16));
    }

    if (data.f14 == "0") {
      $("#quote-b4v").html("-");
    } else {
      $("#quote-b4v").html(kcbMyformatNum(data.f14));
    }

    if (data.f12 == "0") {
      $("#quote-b5v").html("-");
    } else {
      $("#quote-b5v").html(kcbMyformatNum(data.f12));
    }

    //buy
    $("#quote-b1vp").css("width", (data.f20 / mv) * 100 + "%");
    $("#quote-b2vp").css("width", (data.f18 / mv) * 100 + "%");
    $("#quote-b3vp").css("width", (data.f16 / mv) * 100 + "%");
    $("#quote-b4vp").css("width", (data.f14 / mv) * 100 + "%");
    $("#quote-b5vp").css("width", (data.f12 / mv) * 100 + "%");

    if ((data.f20 / mv) * 100 < 1 && data.f20 / mv != 0) {
      $("#quote-b1vp").css("width", "2%");
    }

    if ((data.f18 / mv) * 100 < 1 && data.f18 / mv != 0) {
      $("#quote-b2vp").css("width", "2%");
    }

    if ((data.f16 / mv) * 100 < 1 && data.f16 / mv != 0) {
      $("#quote-b3vp").css("width", "2%");
    }

    if ((data.f14 / mv) * 100 < 1 && data.f14 / mv != 0) {
      $("#quote-b4vp").css("width", "2%");
    }

    if ((data.f12 / mv) * 100 < 1 && data.f12 / mv != 0) {
      $("#quote-b5vp").css("width", "2%");
    }

    //渲染买卖差量
    if (data.f206) {
      if (data.f206 == "0") {
        $("#quote-s5d").html("");
      } else {
        var value = kcbMyformatNum(data.f206);
        var val = data.f206 > 0 ? "+" + value : value;
        $("#quote-s5d").html(val);
        if (val.toString().length > 8) {
          $("#quote-s5d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-s5d").html("");
    }

    if (data.f207) {
      if (data.f207 == "0") {
        $("#quote-s4d").html("");
      } else {
        var value = kcbMyformatNum(data.f207);
        var val = data.f207 > 0 ? "+" + value : value;
        $("#quote-s4d").html(val);
        if (val.toString().length > 8) {
          $("#quote-s4d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-s4d").html("");
    }

    if (data.f208) {
      if (data.f208 == "0") {
        $("#quote-s3d").html("");
      } else {
        var value = kcbMyformatNum(data.f208);
        var val = data.f208 > 0 ? "+" + value : value;
        $("#quote-s3d").html(val);
        if (val.toString().length > 8) {
          $("#quote-s3d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-s3d").html("");
    }

    if (data.f209) {
      if (data.f209 == "0") {
        $("#quote-s2d").html("");
      } else {
        var value = kcbMyformatNum(data.f209);
        var val = data.f209 > 0 ? "+" + value : value;
        $("#quote-s2d").html(val);
        if (val.toString().length > 8) {
          $("#quote-s2d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-s2d").html("");
    }

    if (data.f210) {
      if (data.f210 == "0") {
        $("#quote-s1d").html("");
      } else {
        var value = kcbMyformatNum(data.f210);
        var val = data.f210 > 0 ? "+" + value : value;
        $("#quote-s1d").html(val);
        if (val.toString().length > 8) {
          $("#quote-s1d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-s1d").html("");
    }

    if (data.f211) {
      if (data.f211 == "0") {
        $("#quote-b1d").html("");
      } else {
        var value = kcbMyformatNum(data.f211);
        var val = data.f211 > 0 ? "+" + value : value;
        $("#quote-b1d").html(val);
        if (val.toString().length > 8) {
          $("#quote-b1d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-b1d").html("");
    }

    if (data.f212) {
      if (data.f212 == "0") {
        $("#quote-b2d").html("");
      } else {
        var value = kcbMyformatNum(data.f212);
        var val = data.f212 > 0 ? "+" + value : value;
        $("#quote-b2d").html(val);
        if (val.toString().length > 8) {
          $("#quote-b2d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-b2d").html("");
    }

    if (data.f213) {
      if (data.f213 == "0") {
        $("#quote-b3d").html("");
      } else {
        var value = kcbMyformatNum(data.f213);
        var val = data.f213 > 0 ? "+" + value : value;
        $("#quote-b3d").html(val);
        if (val.toString().length > 8) {
          $("#quote-b3d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-b3d").html("");
    }

    if (data.f214) {
      if (data.f214 == "0") {
        $("#quote-b4d").html("");
      } else {
        var value = kcbMyformatNum(data.f214);
        var val = data.f214 > 0 ? "+" + value : value;
        $("#quote-b4d").html(val);
        if (val.toString().length > 8) {
          $("#quote-b4d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-b4d").html("");
    }

    if (data.f215) {
      if (data.f215 == "0") {
        $("#quote-b5d").html("");
      } else {
        var value = kcbMyformatNum(data.f215);
        var val = data.f215 > 0 ? "+" + value : value;
        $("#quote-b5d").html(val);
        if (val.toString().length > 8) {
          $("#quote-b5d").css({ "font-size": "12px" });
        }
      }
    } else {
      $("#quote-b5d").html("");
    }
  }
}

//变色
function flickerBlue(dom) {
  $(dom).css("background-color", "rgba(178, 195, 234)");
  // $(dom).animate({
  //     "backgroundColor": "rgba(255,0,0,0.5)"
  // }, 300);

  setTimeout(function() {
    $(dom).css("background-color", "rgba(255,0,0,0)");
  }, 300);
}

function flickerGreen(dom) {
  $(dom).css("background-color", "rgba(180, 247, 175)");
  // $(dom).animate({
  //     "backgroundColor": "rgba(255,0,0,0.5)"
  // }, 300);

  setTimeout(function() {
    $(dom).css("background-color", "rgba(255,0,0,0)");
  }, 300);
}

function flickerRed(dom) {
  // console.info(111)
  $(dom).css("background-color", "rgba(255,0,0,0.5)");
  // $(dom).animate({
  //     "backgroundColor": "rgba(255,0,0,0.5)"
  // }, 300);

  setTimeout(function() {
    $(dom).css("background-color", "rgba(255,0,0,0)");
  }, 300);
}

//分时成交
function getFSData(stockentry) {
  var secids = stockentry.marketnum + "." + stockentry.code;
  // var secids = '1.601229'
  var data = {
    ut: "fa5fd1943c7b386f172d6893dbfba10b",
    fields1: "f1,f2,f3,f4,f531",
    fields2: "f51,f52,f53,f54,f55",
    secid: secids,
    pos: "-20",
    volt: "100",
  };
  // 正式地址
  var fullurl =
    "http://" +
    (Math.floor(Math.random() * 99) + 1) +
    ".push2.eastmoney.com/" +
    "api/qt/stock/details/get?" +
    parStringify(data);
  //测试地址：
  // var fullurl = "http://61.152.230.191/" + "api/qt/stock/details/get?" + parStringify(data);
  if (window.location.search.indexOf("env=test") > -1) {
    fullurl =
      "http://61.152.230.207/" +
      "api/qt/stock/details/get?" +
      parStringify(data);
  }
  $.ajax({
    type: "get",
    data: "",
    url: fullurl,
    dataType: "jsonp",
    jsonp: "cb",
  })
    .then(function(msg) {
      var obj = msg;
      if (obj.data) {
        $("#detail-msg-more").show();
        $("#detail-msg-more a").attr(
          "href",
          "http://quote.eastmoney.com/f1.html?id=" +
            stockentry.code +
            stockentry.marketnum
        );
        fsFormat(obj);
      }
    })
    .always(function() {
      getsseFSdata();
    });
}

function getsseFSdata() {
  var secids = stockentry.newmarket + "." + stockentry.code;
  // var secids = '1.601229'
  var data = {
    ut: "fa5fd1943c7b386f172d6893dbfba10b",
    fields1: "f1,f2,f3,f4",
    fields2: "f51,f52,f53,f54,f55",
    secid: secids,
    pos: "-20",
    volt: "100",
  };

  // 正式地址
  var fullurl =
    "http://" +
    (Math.floor(Math.random() * 99) + 1) +
    ".push2.eastmoney.com/" +
    "api/qt/stock/details/sse?" +
    parStringify(data);
  //测试地址
  // var fullurl = "http://61.152.230.191/" + "api/qt/stock/details/sse?" + parStringify(data);
  if (window.location.search.indexOf("env=test") > -1) {
    fullurl =
      "http://61.152.230.207/" +
      "api/qt/stock/details/sse?" +
      parStringify(data);
  }
  var evtSource = new EventSource(fullurl);
  evtSource.onmessage = function(msg) {
    // console.log('推送')
    var obj = JSON.parse(msg.data);
    if (obj.data) {
      fsFormat(obj);
    }
  };
}

var msg, source_data, prePrice;
function fsFormat(data) {
  if (data.full == 1 && data.data && data.data.details) {
    msg = data.data;
    prePrice = data.data.prePrice;
    source_data = data.data.details;
  } else if (data.full == 0 && data.data && data.data.details) {
    if (source_data) {
      source_data = source_data.concat(data.data.details);
    }
  }
  // console.log(source_data)
  fillFSHtml(msg, source_data, prePrice);
}

function fillFSHtml(msg, source_data, prePrice) {
  if (!msg || !source_data.length) {
    var height = "271px";
    $("#deal_detail").html(
      "<tr><td colspan=3 style='height: " +
        height +
        ";text-align:center'>暂无数据</td></tr>"
    );
    $("#detail-msg-more").hide();
    return;
  }
  var pc = parseFloat(prePrice),
    $tbody = $("<tbody></tbody>");
  var price = [];
  for (var i = 0; i < source_data.length; i++) {
    price.push(parseFloat(source_data[i].substring(9, 14)));
  }
  var pch = [];
  for (var i = 0; i < price.length - 1; i++) {
    pch[i] = price[i + 1] - price[i];
  }

  var data = [];
  var singledata = [];
  var i = source_data.length - 1;
  i >= 0;
  i--;
  if (source_data.length <= 20) {
    for (var i = source_data.length - 1; i >= 0; i--) {
      singledata = JSON.stringify(source_data[i]);
      data = singledata.split(",");
      data[0] = data[0].substring(1);
      data[4] = data[4].substring(0, 1);
      var $tr = $("<tr></tr>"),
        priceColor =
          data[4] != 4
            ? data[1] - pc > 0
              ? "red"
              : data[1] - pc < 0
              ? "green"
              : "#333333"
            : "",
        dir = pch[i - 1] < 0 ? "↓" : pch[i - 1] > 0 ? "↑" : "",
        dir_c = pch[i - 1] < 0 ? "green" : pch[i - 1] > 0 ? "red" : "",
        vp =
          data[2] * data[1] * 100 * (data[4] == 1 ? -1 : data[4] == 2 ? 1 : 0),
        v_c =
          data[4] != 4
            ? vp >= 200000
              ? "#ff00ff"
              : vp > 0
              ? "red"
              : vp <= -200000
              ? "#00b7ee"
              : vp < 0
              ? "green"
              : ""
            : "";

      $("<td />")
        .text(data[0])
        .appendTo($tr);
      $("<td />")
        .text(data[1])
        .css("color", priceColor)
        .appendTo($tr);
      $("<td class='myjx'/>")
        .append(
          $("<span />")
            .text(data[2])
            .css("color", v_c)
        )
        .append(
          $("<span class='myjiantou'/>")
            .text(dir)
            .css("color", dir_c)
        )
        .appendTo($tr);
      $tbody.append($tr);
    }
  } else {
    for (var i = source_data.length - 1; i >= source_data.length - 20; i--) {
      singledata = JSON.stringify(source_data[i]);
      data = singledata.split(",");
      data[0] = data[0].substring(1);
      data[4] = data[4].substring(0, 1);
      var $tr = $("<tr></tr>"),
        priceColor =
          data[4] != 4
            ? data[1] - pc > 0
              ? "red"
              : data[1] - pc < 0
              ? "green"
              : "#333333"
            : "",
        dir = pch[i - 1] < 0 ? "↓" : pch[i - 1] > 0 ? "↑" : "",
        dir_c = pch[i - 1] < 0 ? "green" : pch[i - 1] > 0 ? "red" : "",
        vp =
          data[2] * data[1] * 100 * (data[4] == 1 ? -1 : data[4] == 2 ? 1 : 0),
        v_c =
          data[4] != 4
            ? vp >= 200000
              ? "#ff00ff"
              : vp > 0
              ? "red"
              : vp <= -200000
              ? "#14c3dc"
              : vp < 0
              ? "green"
              : ""
            : "";

      $("<td />")
        .text(data[0])
        .appendTo($tr);
      $("<td />")
        .text(data[1])
        .css("color", priceColor)
        .appendTo($tr);
      $("<td class='myjx'/>")
        .append(
          $("<span />")
            .text(data[2])
            .css("color", v_c)
        )
        .append(
          $("<span class='myjiantou'/>")
            .text(dir)
            .css("color", dir_c)
        )
        .appendTo($tr);
      $tbody.append($tr);
    }
  }
  $("#deal_detail").html($tbody.html());
}

function parStringify(obj) {
  var arr = [];
  for (var k in obj) {
    arr.push(k + "=" + obj[k]);
  }
  return arr.join("&");
}

module.exports = {
  init: function(stockentry) {
    // getFSData(stockentry);
    getHeadData(stockentry);
  },
};

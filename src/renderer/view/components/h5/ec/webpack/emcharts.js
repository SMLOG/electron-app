/**
 * emcharts 3.0
 */

require("./modules/chart/common/console");
// console.info(111)
require("promise-polyfill");
//require("./node_modules/promise-polyfill/dist/polyfill.js");
// console.info(222)
require("./modules/polyfill");

var __canvas = document.createElement("canvas");
var __cxt = __canvas.getContext;

if (__cxt) {
  var k = require("./modules/chart/web/k");
  var k2 = require("./modules/chart/web/k2");
  var k3 = require("./modules/chart/web/k3");
  var k4 = require("./modules/chart/web/k4");
  var k5 = require("./modules/chart/web/k5");
  var k6 = require("./modules/chart/web/k6");
  var time = require("./modules/chart/web/time");
  var time3 = require("./modules/chart/web/time3");
  var kmini = require("./modules/chart/web/kmini");
  var timemini = require("./modules/chart/web/timemini");
  var tendency = require("./modules/chart/web/tendency");
  var bar = require("./modules/chart/web/bar");
  var fundmini = require("./modules/chart/web/fundmini");
  var line = require("./modules/chart/web/line");
  var pie = require("./modules/chart/web/pie");

  var bargroup = require("./modules/chart/web/bargroup");
  var barline = require("./modules/chart/web/barline");
  var barHorPile = require("./modules/chart/web/barHorPile");

  var kline = require("./modules/chart/web/kline");

  require("./modules/css/box.css");

  module.exports = window.emcharts3 = {
    k: k,
    k2: k2,
    k3: k3,
    k4: k4,
    k5: k5,
    k6: k6,
    time: time,
    time3: time3,
    kmini: kmini,
    tendency: tendency,
    bar: bar,
    timemini: timemini,
    fundmini: fundmini,
    line: line,
    pie: pie,
    bargroup: bargroup,
    barline: barline,
    barHorPile: barHorPile,
    kline: kline,
    v: "3.11.5",
  };
} else {
  console.log("不支持IE8及以下的浏览器！");
}

//////////////////
// WEBPACK FOOTER
// ./emcharts.js
// module id = 132
// module chunks = 0

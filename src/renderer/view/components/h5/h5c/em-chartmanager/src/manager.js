var serverUrls = require("./serverUrls");
var timeLoader = require("./timeChartLoader");
var kLoader = require("./kChartLoader");
var pictureLoader = require("./pictureChartLoader");

var emcharts35 = window.emcharts3 || null;

/**
 * 行情图管理器
 * @param {string} type chart类型
 * @param {object} args 初始化参数
 */
function manager(type, args) {
  var self = this;
  var timer, chart;
  this.args = args;
  this.chartType = type;
  this.inited = false;
  this.datacache = false;
  this.dataloader = null;

  /**
   * 加载
   */
  this.load = function() {
    this.inited = false;
    chart = this.create();
    this.reload();
    this.inited = true;
    return chart;
  };
  /**
   * 创建emcharts对象
   */
  this.create = function() {
    return _init.apply(this, [type, emcharts35]);
  };
  /**
   * 重载
   */
  this.reload = function() {
    this.stop(false);
    _load.apply(this);

    if (this.args.update > 0) {
      timer = setInterval(function() {
        _load.apply(self);
      }, this.args.update);
    }
    return this;
  };
  /**
   * 停止自刷
   * @param {boolean} destory 是否销毁
   */
  this.stop = function(destory) {
    destory = typeof destory !== "undefined" ? destory : true;
    clearInterval(timer);
    if (destory) {
      chart = null;
    }
    return this;
  };

  function _load() {
    if (!this.inited && typeof chart.start === "function") {
      chart.start();
    }
    if (typeof this.dataloader === "function") {
      this.dataloader.apply(this, [chart]);
    } else if (typeof chart.draw === "function") chart.draw();
  }

  function _init(type, emcharts35) {
    if (
      ["compatible", "compatible-r", "compatible-k"].indexOf(type) < 0 &&
      !emcharts35
    )
      throw "Cannot find library emcharts35";
    switch (type) {
      case "compatible-k":
      case "compatible-r":
      case "compatible":
        return pictureLoader.apply(this, [args, type.split("-")[1]]);
      case "time":
        return timeLoader.apply(this, [args]);
      case "k":
        return kLoader.apply(this, [args]);
      default:
        if (typeof emcharts35[type] === "function")
          return new emcharts35[type](args);
        else return null;
    }
  }
  return this;
}

/**
 * 异步预加载emcharts.js
 * @param {function} callback 加载完成回调
 * @param {function} error 加载异常回调
 */
manager.preload = function(callback, error) {
  if (typeof emcharts35 === "function") {
    if (typeof callback === "function") callback.call(null, emcharts35);
    return emcharts35;
  }
  try {
    var script = document.createElement("script");
    script.id = "emcharts35-script";
    script.setAttribute("src", serverUrls.emchartscdn);
    if (typeof error === "function") script.onerror = error;
    script.async = true;
    script.defer = true;
    script.onload = script.onreadystatechange = function(evt) {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        //emcharts35 = require('emcharts35');
        if (typeof callback === "function") callback.call(null, emcharts35);
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } catch (e) {
    console.error(e);
  }
};

/**
 * set certain server url
 * @param {string} key key to set
 * @param {string} url url to set
 */
manager.setServerUrl = function(key, url) {
  serverUrls[key] = url;
};

module.exports = manager;

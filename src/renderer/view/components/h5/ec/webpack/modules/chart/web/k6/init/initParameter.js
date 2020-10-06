/**
 *
 * 初始化输入的参数
 *
 */
// var extend = require("chart/common/extend3").extend;
var extend = require("chart/common/extend2");
var setting = require("../defaultSetting");
var initIsShow = require("./initIsShow");

module.exports = function initParameter(no) {
  var option = this.option;

  // 增加 筹码分布
  if (option.cyq) {
    option.cyqWidth = option.width - (option.cyq.width || 0);
    var pad = option.padding || {};
    if (typeof pad.right != "number") {
      option.padding.right = 10;
    }

    // var cyqCalc = new cyq(data, 150, 120);
  }

  var ops = {};

  var dpr = setting.dpr;
  // 宽和高
  ops.width = option.width;
  ops.height = option.height;

  ops = extend(setting, option, true);

  if (!no) this.options = ops;
  else {
    Object.assign(this.options, option);
  }

  initIsShow.call(this);
};

//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k2/init/initParameter.js
// module id = 157
// module chunks = 0

var extend = _.extend
var jsonp = require('../../em-utils/lib/jsonp');
var isDom = require('../../em-utils/lib/isdom');
var utils = require('../../em-utils/lib/stockutils');
var blinker = require('../../modules/blinker');
var iComet = require('./icomet');
var memcache = require('../../em-utils/lib/cache');
var cache = memcache['default'];
require('../../em-utils/polyfills/JSON');

var defaultConfigs = require('./configs');

/**
 * 快速行情报价推送
 */
function TopSpeedQuote(channel, config) {
    var self = this,
        stopped = false,
        retryId = -1,
        error_counter = 0;
    this.config = config = config || {};
    this.enableMutiDomain = config.enableMutiDomain || false;
    this.host = config.host || "push1.eastmoney.com";
    this.auto_start = config.start || false;
    this.fields = extend(config.fields || new Array(), defaultConfigs.fields);
    this.pageLoadEvents = config.pageLoadEvents || defaultConfigs.pageLoadEvents;
    this.load_page = typeof config.loadPage === "boolean" ? config.loadPage : true;
    this.stopWithoutQuote = typeof config.stopWithoutQuote === "undefined" ? true : config.stopWithoutQuote;
    this.fieldmap = {};
    for (var i = 0; i < this.fields.length; i++) {
        var element = this.fields[i];
        if (element) this.fieldmap[element.idx] = element;
    }
    var render = this.render = config.render || pageLoader;
    var _channel = this.channel = channel || "TSQ_SZ300059",
        data_seq = 0,
        icomet;
    var perfix = self.enableMutiDomain ? Math.floor(Math.random() * 99 + 1).toString() : "";
    var sub_url = perfix ? "//" + perfix + "." + self.host + "/sub" : "//" + self.host + "/sub";
    self.start = function () {
        jsonp(sub_url, {
            cname: channel
        }, "cb", sub_handler(render), onEventError);
    }
    self.stop = function () {
        stopped = true;
        if (icomet) icomet.stop();
    }
    /**
     * 请求异常重连处理
     */
    function onEventError() {
        if (++error_counter < (config.maxRetryCount || 5)) {
            retryId = setTimeout(function () {
                var data = {
                    cname: channel
                };
                if (data_seq) data.seq = data_seq;
                jsonp(sub_url, data, "cb", sub_handler(render), onEventError);
            }, config.retryInterval || 2000);
        }
    }
    /**
     * 行情报价icomet订阅处理器
     * @param {function} sub_func 订阅回调
     */
    function sub_handler(sub_func) {
        var callback = typeof sub_func === "function" ? sub_func : new Function();
        /**
         * icomet行情全量处理逻辑
         * @param {object} json icomet响应
         */
        function handler(json) {
            if (!json) return false;
            if (json instanceof Array) {
                for (var i = json.length - 1; i >= 0; i--) {
                    if (typeof json[i] === "object" && json[i].type === "data") {
                        var content = JSON.parse(json[i].content),
                            full = cache.getOrAdd("__full__", content);
                        // 以seq字段作为标识，获取到seq，追溯到上一笔全量数据
                        if (!content["seq"]) {
                            data_seq = json[i].seq + 1;
                            callback(content, self.fields, self);
                        } else {
                            data_seq = content["seq"];
                        }
                        // 停止或已生成icomet请求，直接返回
                        if (stopped || icomet) return false;
                        var current = {};
                        // 创建icomet并开始监听
                        icomet = self.icomet = new iComet({
                            channel: _channel,
                            subUrl: sub_url,
                            dataSeq: data_seq,
                            onerror: onEventError,
                            delay: !(+'\v1') ? 5000 : 0, // 低版本浏览器使用慢速队列延时5000ms
                            callback: function (content) {
                                error_counter = 0;
                                clearTimeout(retryId);
                                if (!content) return false;
                                try {
                                    console.info(JSON.parse(content))
                                    var data = extend({}, current, JSON.parse(content));
                                    extend(full, data);
                                    if (!icomet.long_polling_pause) {
                                        callback(data, self.fields, self);
                                        current = {};
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        });

                        
                        break;
                    }
                }
            } else if (json.type === "next_seq") {
                if (json.seq <= 1) return false;
                jsonp(sub_url, {
                    cname: json.cname,
                    seq: json.seq - 1
                }, "cb", sub_handler(callback), onEventError);
            } else {
                // 重试
                setTimeout(function () {
                    jsonp(sub_url, {
                        cname: json.cname
                    }, "cb", sub_handler(callback), onEventError);
                }, 200);
            }
        }
        return handler;
    }

    if (self.auto_start) self.start();
}

// 附加扩展方法
TopSpeedQuote.utils = utils;
TopSpeedQuote.iComet = iComet;

/**
 * 默认页面绑定加载器
 * @param {Object} data 数据
 * @param {Array} fields 字段配置
 * @param {TopSpeedQuote} sender 上下文
 */
function pageLoader(data, fields, sender) {
    if (!sender.load_page) return;
    for (var key in data) {
        if (typeof data[key] === "object") {
            for (var i in data[key]) {
                if (!data[i]) data[i] = data[key][i];
            }
        }
    }
    if (typeof sender.pageLoadEvents.beforeLoading === "function") {
        sender.pageLoadEvents.beforeLoading.apply(sender, [data, fields]);
    }
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i]) continue;
        var field = fields[i],
            item = data[field.idx || 0];
        // 衍生计算处理
        if (!item && typeof field.extend === "object") {
            item = extendCompute(data, field.extend, sender);
        }
        if (!item && item != 0) continue;
        //if (isNaN(item) && !item && !parseFloat(item)) continue;
        fieldHandler(field, item, data, sender);
    }
    if (typeof sender.pageLoadEvents.afterPageLoaded === "function") {
        sender.pageLoadEvents.afterPageLoaded.apply(sender, [data, fields]);
    }
}

/**
 * 字段扩展运算
 * @param {object} data 数据
 * @param {object} extend 字段扩展定义
 * @param {TopSpeedQuote} sender 上下文对象
 * @returns {number|""} 计算结果
 */
function extendCompute(data, extend, sender) {
    if (!data || !(extend.deps instanceof Array)) return "";
    var deps = extend.deps,
        _deps = [],
        any = false;
    for (var i = 0; i < deps.length; i++) {
        var key = deps[i],
            val = data[key];
        if (val) any = true;
        // if (sender.fieldmap[key].caching && sender.fieldmap[key].caching.enable) {
        //     val = cache[sender.fieldmap[key].caching.key];
        // } else {
        val = cache[key];
        //}
        _deps.push(val);
    }
    if (any && typeof extend.compute === "function")
        return extend.compute.apply(sender, _deps);
}

/**
 * 数据字段处理器
 * @param {object} field 字段定义
 * @param {string|number} item 数据项
 * @param {object} data 数据
 * @param {TopSpeedQuote} sender 
 */
function fieldHandler(field, item, data, sender) {
    var $dom = field.$dom = jselector(field.dom, field.idx),
        _item = item,
        cached = typeof field.caching === "boolean" ? field.caching : true,
        caching = typeof field.caching === "object" ? field.caching : {},
        changed = false,
        last = cached ? cache[caching.key || field.idx] : $dom.text();
    // 数据预处理
    if (typeof field.handler === "function") {
        item = _item = field.handler(item, data, sender);
    }
    // 默认小数处理
    if (field.decimal) {
        item = _item = decimalHandler(item);
    }
    // 枚举映射
    if (typeof (field.map) === "object" && field.map[item]) {
        item = field.map[item];
    }
    // 是否科学计数
    if (field.numbericFormat) {
        item = utils.numbericFormat(item);
    }
    var regex = /^[\d\.\-]+$/;
    // 异常数据处理
    if (!item || (isNaN(item) && regex.test(item) && !parseFloat(item))) {
        var handler = typeof field.onerror === "function" ? field.onerror : ErrorValueHandler;
        item = handler(item);
        if (!item) return false;
    }
    if ($dom.length > 0) {
        changed = last ? last != _item : false;
        //if (!changed) return;
        if (typeof field.render !== "function")
            $dom.html(item);
        // 颜色处理
        var blink_model = 0;
        if (field.hasColor) {
            var css = "";
            if (!isNaN(field.comparer)) {
                css = field.comparer < 0 ? "green" : field.comparer > 0 ? "red" : "";
                blink_model = field.comparer > 0 ? 1 : field.comparer < 0 ? -1 : 0;
            } else if (typeof field.comparer === "function") {
                var c = field.comparer(item, data, sender);
                css = c < 0 ? "green" : c > 0 ? "red" : "";
                blink_model = c > 0 ? 1 : c < 0 ? -1 : 0;
            } else {
                css = utils.getColor(item);
                item = typeof item === "string" ? item : item.toString();
                blink_model = item == "0" || item == "-" ? 0 : item.isPositive() ? 1 : -1;
            }
            $dom.removeClass("red green").addClass(css);
        }
        // 闪烁效果
        if (field.blink && changed) {
            var enable = true,
                _options = {
                    doms: [],
                    circle: field.hasColor ? 2 : 1
                };
            for (var i = 0; i < $dom.length; i++) {
                _options.doms.push($dom[i]);
            }
            if (typeof field.blink === "object") {
                enable = !field.blink.disable;
                _options = extend(_options, field.blink, true);
            }
            if (!sender.twinkle) sender.twinkle = {};
            var twinkle = sender.twinkle[field.idx];
            if (!twinkle && enable) {
                twinkle = sender.twinkle[field.idx] = new blinker(_options);
            }
            if (enable) {
                twinkle.comparer = blink_model;
                twinkle.raise = enable;
            }
        }
        // 字段呈现回调
        if (typeof field.render === "function") {
            field.render($dom, item, field, sender);
        }
    }
    // 缓存
    if (cached) {
        var ck = caching.key || field.idx,
            val = _item;
        if (typeof caching.handler === "function")
            val = caching.handler(_item, data, sender);
        cache.set(ck, val);
    }

    /**
     * dom对象，兼容ie7加载慢的问题
     * @param {object} dom 
     * @param {number} index 
     */
    function jselector(dom, index) {
        var _dom;
        if (dom instanceof $) {
            _dom = dom;
        } else if (isDom(dom) || typeof dom === "string") {
            _dom = $(dom);
        }
        if (!_dom || !_dom.length)
            _dom = $("[data-bind=" + index + "]");
        return _dom;
    }
    /**
     * 小数处理器
     * @param {number} data 数据
     */
    function decimalHandler(data) {
        if (!cache["fact"] || !cache["offset"] || !data) return NaN;
        return (data * cache["fact"]).toFixed(cache["offset"]);
    }

    function ErrorValueHandler(data) {
        return false;
    }
}

/**
 * 判断数据是否为正数
 * @returns {boolen} true表示正数,false表示负数,NaN表示非数字
 */
String.prototype.isPositive = function () {
    var context = this;
    if (typeof (context).toLowerCase() === "string") {
        context = context.replace("%", "");
        var regNum = new RegExp("^([\\-\\+]?\\d+(\\.\\d+)?)$");
        if (regNum.test(context)) {
            var reg = new RegExp("^-");
            return !reg.test(context);
        } else return Number.NaN;
    }
}

module.exports = TopSpeedQuote;
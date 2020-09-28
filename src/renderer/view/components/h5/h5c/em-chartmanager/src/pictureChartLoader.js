var isDom = require('../../em-utils/lib/isdom');
var mini = require('../../em-utils/lib/mini');
var merge = _.merge;
var dServerUrls = require('./serverUrls');
var URI = require('../../em-urijs');
/**
 * 兼容版图片加载器
 * @param {object} args 图片版参数
 * @param {string} args.url 图片地址
 * @param {object} args.data 图片参数
 * @param {boolean} args.cache 是否缓存
 * @param {function} args.success 成功回调
 * @param {number} args.update 更新自刷时间
 * @param {string} type 类型
 */
function pictureChartLoader(args, type) {
    var container = args.container;
    if (typeof args.container === 'string') {
        container = mini(args.container)[0];
    }
    type = (type || '').toLowerCase();
    var defaultUrl = type === 'r' ? dServerUrls.timeImageUrl : dServerUrls.imageUrl;
    var timer;
    var _opt = merge({
        url: defaultUrl,
        cache: false,
        success: function (img) {
            if (isDom(container)) {
                container.innerHTML = '';
                container.appendChild(img);
            }
        },
        update: 10 * 1000
    }, args);

    this.load = function () {
        if (_opt.update > 0) {
            timer = setInterval(_load, _opt.update);
        }

        function _load() {
            return asyncImgLoader(_opt);
        }
        return _load();
    }

    this.stop = function () {
        clearInterval(timer);
    }

    return this.load();
}

/**
 * 异步图片加载器
 * @param {object} setting 加载配置
 * @param {string} setting.url 图片地址
 * @param {object} setting.data 地址数据
 * @param {boolean} setting.cache 是否使用缓存
 * @param {number|string} setting.height 图片高度
 * @param {number|string} setting.width 图片宽度
 * @param {function} setting.success 成功回调
 * @param {function} setting.error 异常回调
 */
function asyncImgLoader(setting) {
    if (typeof (setting) !== "object" || !setting["url"]) return false;
    var fCallback = typeof (setting["success"]) === "function" ? setting["success"] : null;
    var uri = new URI(setting["url"]);
    if (setting["data"]) {
        uri.setSearch(setting["data"]);
    }
    if (!setting["cache"]) {
        uri.setSearch('_', +(new Date));
    }
    var _image = document.createElement("img");
    if (typeof (setting["height"]) === "number" && setting["height"] > 0) {
        _image.style["height"] = setting["height"] + 'px';
    } else if (setting["height"]) {
        _image.style["height"] = setting["height"];
    }
    if (typeof (setting["width"]) === "number" && setting["width"] > 0) {
        _image.style["width"] = setting["width"] + 'px';
    } else if (setting["width"]) {
        _image.style["width"] = setting["width"];
    }
    _image.setAttribute('src', uri.toString());
    if (typeof (setting["error"]) === "function") {
        _image.onerror = function () {
            setting["error"](_image);
        };
    }
    _image.onload = _image.onreadystatechange = function (evt) {
        if (!_image.readyState || /loaded|complete/.test(_image.readyState)) {
            // Handle memory leak in IE
            _image.onload = _image.onreadystatechange = null;
            // Callback if not abort
            if (fCallback) fCallback(_image);
        }
    };
    return _image;
}

module.exports = pictureChartLoader;
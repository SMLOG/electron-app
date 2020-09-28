var extend = _.assignIn
var isDom = require('../em-utils/lib/isdom');
var mini = require('../em-utils/lib/mini');
/**
 * 闪烁器
 * @param {object} options 配置
 * @param {HTMLElement[]} options.doms 元素集合
 * @param {object} options.color 渐变颜色对象
 * @param {string[]} options.color.up 上涨渐变颜色集合
 * @param {string[]} options.color.down 下跌渐变颜色集合
 * @param {string[]} options.color.others 其他渐变颜色集合
 * @param {number} options.interval 轮询扫描间隔 毫秒
 * @param {number} options.blinktime 每帧时间 毫秒
 * @param {number} options.circle 每帧时间 闪烁次数
 */
function blinker(options) {
    var _opt = extend({
        doms: [],
        color: {
            up: ["#FFDDDD", "#FFEEEE", ""], //红
            down: ["#b4f7af", "#ccffcc", ""], //绿
            others: ["#b2c3ea", "#cedaf5", ""] //浅蓝
        },
        interval: 300,
        blinktime: 150, //每帧时间 毫秒
        circle: 2 //闪烁次数
    }, options);
    var instance = this;
    instance.raise = false, instance.loop = 0;
    var tid;
    var _doms = [];
    for (var i = 0; i < _opt.doms.length; i++) {
        var obj = _opt.doms[i];
        if (isDom(obj)) _doms.push(obj);
        else if (typeof _opt.doms[i] === "string") {
            obj = mini(_opt.doms[i]);
            if (obj) _doms.push(obj);
        }
    }
    tid = setInterval(function () {
        if (!instance.raise) return;
        var color = instance.comparer > 0 ? _opt.color.up : instance.comparer < 0 ?
            _opt.color.down : _opt.color.others;
        for (var i = 0; i < color.length * _opt.circle; i++) {
            setTimeout(function () {
                for (var i = 0; i < _doms.length; i++) {
                    _doms[i].style["background-color"] = color[instance.loop];
                    //_options.doms[i].css("background-color", color[instance.loop]);
                }
                instance.loop++;
                instance.loop = instance.loop % color.length;
            }, _opt.blinktime * i);
        }
        instance.raise = false;
    }, _opt.interval);
    this.stop = function () {
        clearInterval(tid);
    }
}
module.exports = blinker;
var extend = _.assignIn
module.exports = cache;
/**
 * 对象缓存容器
 * @param {object} obj 缓存对象
 */
function cache(obj) {
    if (obj) extend(this, obj || {});
    /**
     * 获取
     * @param {string} key 键
     */
    this.get = function (key) {
        if (typeof key !== 'string')
            key = Object.prototype.toString.apply(null, [key]);
        return this[key];
    }
    /**
     * 设置
     * @param {string} key 键
     * @param {number|string|function} val 值
     */
    this.set = function (key, val) {
        if (typeof val !== "undefined") {
            if (typeof val === 'function') {
                this[key] = val.apply(this, [key]);
            } else {
                this[key] = val;
            }
        }
        return this[key];
    }
    /**
     * 获取或添加
     * @param {string} key 键
     * @param {number|string|function} val 值
     */
    this.getOrAdd = function (key, val) {
        if (typeof this[key] === "undefined") {
            if (typeof val === 'function') {
                this[key] = val.apply(this, [key]);
            } else {
                this[key] = val;
            }
        }
        return this[key];
    }
    /**
     * 移除
     * @param {string} key 键
     */
    this.remove = function (key) {
        var value = this[key];
        if (typeof value === 'function') return value;
        try {
            delete this[key];
        } catch (e) {
            this[key] = undefined;
        }
        return value;
    }
    /**
     * 清除
     */
    this.clear = function () {
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this.remove(key);
            }
        }
        return this;
    }
};
cache['default'] = new cache();
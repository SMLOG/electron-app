module.exports = {
    /**
     * 科学计数格式化数据(加单位)
     * @param {string|number} data 数据
     * @returns {string} 格式化结果
     */
    numbericFormat: function (data) {
        var item = parseFloat(data);
        if (!isNaN(item)) {
            var symbol = item < 0 ? -1 : item > 0 ? 1 : 0;
            if (item < 0) item = item * -1;
            if ((item > 0 && item < 1e4) || (item < 0 && item > -1e4)) {
                return (item * symbol).toString();
            } else if ((item > 0 && item < 1e6) || (item < 0 && item > -1e6)) {
                item = item / 10000;
                return item.toFixed(2) * symbol + "万";
            } else if ((item > 0 && item < 1e7) || (item < 0 && item > -1e7)) {
                item = item / 10000;
                return item.toFixed(1) * symbol + "万";
            } else if ((item > 0 && item < 1e8) || (item < 0 && item > -1e8)) {
                item = item / 10000;
                return item.toFixed(0) * symbol + "万";
            } else if ((item > 0 && item < 1e10) || (item < 0 && item > -1e10)) {
                item = item / 1e8;
                return item.toFixed(2) * symbol + "亿";
            } else if ((item > 0 && item < 1e11) || (item < 0 && item > -1e11)) {
                item = item / 1e8;
                return item.toFixed(1) * symbol + "亿";
            } else if ((item > 0 && item < 1e12) || (item < 0 && item > -1e12)) {
                item = item / 1e8;
                return item.toFixed(0) * symbol + "亿";
            } else if ((item > 0 && item < 1e14) || (item < 0 && item > -1e14)) {
                item = item / 1e12;
                return item.toFixed(1) + "万亿";
            } else if ((item > 0 && item < 1e16) || (item < 0 && item > -1e16)) {
                item = item / 1e12;
                return item.toFixed(0) * symbol + "万亿";
            } else {
                return item;
            }
        }
        return '-';
    },
    /**
     * 通过股票代码获取市场
     * @param {string} code 股票代码
     */
    getMarketCode: function (code) {
        var one = code.substr(0, 1);
        var three = code.substr(0, 3);
        if (one == "5" || one == "6" || one == "9") {
            //上证股票
            return "1";
        } else {
            if (three == "009" || three == "126" || three == "110" || three == "201" || three == "202" || three == "203" || three == "204") {
                //上证股票
                return "1";
            } else {
                //深圳股票
                return "2";
            }
        }
    },
    /**
     * 根据数据获取颜色样式
     * @returns {"red"|"green"|""} 颜色样式
     */
    getColor: function () {
        var num = 0;
        if (arguments[1]) {
            num = parseFloat(arguments[0]) - parseFloat(arguments[1]);
        } else if (arguments[0]) {
            num = parseFloat(arguments[0]);
        }
        return num > 0 ? "red" : num < 0 ? "green" : "";
    }
};

/**
 * 
 * 通用工具类
 * 
 */

module.exports = {
    //数组排序得到最大值
    findArrayMax: function (arr) {
        var temp = [0];
        for (var i = 0; i < arr.length; i++) {
            if (!isNaN(arr[i])) {
                temp.push(parseFloat(arr[i]))
            }
        }
        temp.sort(function (a, b) { return b - a });
        return temp[0];
    },

    //数组排序得到最小值
    findArrayMin: function (arr) {
        var temp = [0];
        for (var i = 0; i < arr.length; i++) {
            if (!isNaN(arr[i])) {
                temp.push(parseFloat(arr[i]));
            }
        }
        temp.sort(function (a, b) { return a - b })
        return temp[0];
    },


	/**
	 * 格式化数字显示单位
	 * 
	 * @param {Number} num : 要格式化的数字
	 * @param {int} decimal : 要留的小数位
	 * @param {any} maxNumLen ： 最大数字长度 (maxNumLen 最小值为4)
	 * 	eg: formatNumUnit(2123456.2, 2, 4); 应该返回 212.35万, 但是最大长度是4，所以返回 212.3万
	 */
    formatNumUnit: function (num, decimal, maxNumLen) {

        if (num == "-" || num == "" || num === undefined) {
            return num;
        }

        var max;
        decimal = decimal < 0 ? 0 : decimal;

        if (maxNumLen === undefined) {
            maxNumLen = 5;
        }
        max = maxNumLen < 5 ? 5 : maxNumLen;

        if (decimal === undefined) {
            if (Math.abs(num) < 0.01) {
                var absn = Math.abs(num);
                var sub = 2;
                for (var i = 1, len = 10; i < len; i++) {
                    if (absn * Math.pow(10, i) > 1) {
                        sub = i + 1;
                        break;
                    }
                }
                decimal = sub;
                max = sub + 2;
            } else {
                var l = (num + "").split(".");
                if (l[1]) {
                    if (l[1].length > 4) {
                        decimal = 4;
                    } else {
                        decimal = l[1].length;
                    }
                }
            }
        }

        try {
            num = parseFloat(num);
        } catch (error) {
            // throw new Error("不是一个合法的数字！");
            return num;
        }

        var temp = Math.abs(num);
        var dur = temp / num;		// 判断整数
        var res;
        var suffix = "";
        if (temp >= 10000 && temp < 100000000) {
            suffix = "万"
            temp = (temp / 10000);
        } else if (temp >= 100000000) {
            suffix = "亿"
            temp = (temp / 100000000);
        } else if (temp >= 1000000000000) {
            suffix = "万亿"
            temp = (temp / 1000000000000);
        }

        if ((temp + "").indexOf(".") == max - 1) {
            max += 1;
        }

        res = temp.toFixed(decimal).substr(0, max);

        if (dur < 0) {
            res = "-" + res;
        }
        if (res.indexOf(".") == res.length - 1) {
            res = res.substr(0, res.length - 1)
        }

        // if ((res / 1) % 1 == 0) {
        // 	res = (res / 1).toFixed(0);
        // }

        return res + suffix;
    },



    // 把一个秒数转换成时间
    secondsToTime: function (seconds) {
        var n = (seconds / 3600) % 24;
        var h = Math.floor(n);
        var x = n % 1;
        var s = Math.round(60 * x);

        function return2(num) {
            if (num >= 10) {
                return num
            } else {
                return "0" + num;
            }
        }

        return return2(h) + ":" + return2(s);
    },


    // 把一个小数转成靠近偶数的整数
    floatToEven: function (num) {
        var n = Math.floor(num);
        if (parseInt(num) % 2 == 0) {
            return n;
        } else {
            return n + 1;
        }
    },

    // 格式化时间
    dateFormat: function (fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },


    URLObjToStr: function (obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(key + "=" + obj[key]);
        }
        return arr.join("&");
    }


}








//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/tools.js
// module id = 1
// module chunks = 0
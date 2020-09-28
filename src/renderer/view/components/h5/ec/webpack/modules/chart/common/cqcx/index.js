var jsonp = require("../jsonp");
var imgS = require("../../../images/S.png");

// 除权除息
module.exports = function () {

    var _this = this;

    var tmap = {
        "1": "SH",
        "2": "SZ"
    }

    var info = {};
    try {
        info = this.sdata.k;
    } catch (error) {

    }

    var dot2 = (_this.sdata || {}).dot || {};

    if (!_this.getCQCX && !dot2.__cqcx && info.code) {
        _this.getCQCX = true;       // 表示已经在获取除权除息了
        // jsonp([uri], [data], [custom_method_name], [callback(json)])
        var url = "http://61.152.230.32:18635/api/qt/stock/cqcx/get";
        var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 99999999);
        var data = {
            "id": tmap[info.info.mk] + info.code,
            cb: methodName
        };

        jsonp(url, data, methodName, function (msg) {

            if (msg.data) {
                var points = {};
                var records = msg.data.records;

                for (var i = 0, len = records.length; i < len; i++) {
                    var item = records[i];
                    var key = item.date;
                    var list = [];

                    // 派息
                    if (item.pxbl > 0) {
                        list.push({
                            title: "派息：" + key,
                        });
                        list.push({
                            title: "每10股派" + (item.pxbl * 10).toFixed(2) + "元",
                        });
                    }

                    // 送股
                    if (item.sgbl > 0) {
                        list.push({
                            title: "送股：" + key,
                        });
                        list.push({
                            title: "每10股派" + (item.pxbl * 10).toFixed(2) + "元",
                        });
                    }

                    // 配股
                    if (item.pgbl > 0) {
                        list.push({
                            title: "配股：" + key,
                        });
                        list.push({
                            title: "每10股配" + (item.pgbl * 10).toFixed(2) + "股",
                        });
                    }

                    if (item.zfbl > 0) {
                        list.push({
                            title: "增发：" + key,
                        });
                        list.push({
                            title: "增发" + ((item.zfgs / 1).toFixed(0)) + "万股",
                        });
                        list.push({
                            title: "增发价格" + ((item.zfjg / 1).toFixed(2)) + "元",
                        });
                    }

                    points[key] = [
                        {
                            list: list
                        }
                    ]
                }

                var __cqcx = {
                    position: "bottom", // top | bottom , 默认top
                    skew: 2,         // 偏移
                    width: 7,      // 点的宽度
                    height: 13,     // 点的高度
                    img: imgS,
                    className: "bbbbbb",
                    points: points
                }

                dot2.__cqcx = __cqcx;

                _this.setData({
                    dot: dot2
                });
                _this.draw();

            }

        });
    }

};




//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/cqcx/index.js
// module id = 34
// module chunks = 0
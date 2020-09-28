var tools = require("../../common/tools");
var jsonp = require("../../common/jsonp");
var dataSplit = require("./dataSplit");
var drawTitle = require("./drawTitle");
var getConvert = require("../../common/getConvert");

/**
 * 主图指标，5个
 * 
 */

function drawIndexsH(kObj) {
    this.kObj = kObj;
    this.cc = kObj.layer.layerIndexC;
    this.ops = kObj.options;
    this.color = this.ops.color;

}

// dt=1 表示这个指标是需要异步去请求的。
drawIndexsH.prototype.draw = function (type, dt) {
    var that = this;
    var kObj = this.kObj;
    var ko = this.kObj;
    var thisData = ko.options.thisData;
    var show = ko.options.show;
    var sinfo = ko.sdata.kinfo;
    var type = ko.status.h;

    // var data = ko.options.scale.indexs[type];


    var quota = kObj.tdata.quota;
    var data = quota[type];

    if (type == "LRCE") {
        this.getLRCE(function () {
            dataSplit.slice.call(kObj);
            data = ko.options.scale.indexs[type];
            that.indexh(data);
            that.axis();
            drawTitle.titleIndex(kObj);
        });
    } else if (type == "ZJL") {
        if (data && data.length > 0) {
            this.getZJL(function () {
                dataSplit.slice.call(kObj);
                data = ko.options.scale.indexs[type];
                that.zjl(data);
                that.axisMACD();
                drawTitle.titleIndex(kObj);
            });
        }
    } else if (type == "MACD") {
        this.macd(data);
        this.axisMACD();
        drawTitle.titleIndex(kObj);
    } else {
        this.indexh(data);
        this.axis();
        drawTitle.titleIndex(kObj);
    }


    // if (dt == 1) {
    //     this.tip();
    //     // console.log("type:" + type);
    //     if (type == "LRCE") {
    //         if (sinfo.isrzrq) {
    //             this.getLRCE(function () {
    //                 dataSplit.slice.call(kObj);
    //                 data = ko.options.scale.indexs[type];
    //                 that.indexh(data);
    //                 that.axis();
    //                 drawTitle.titleIndex(kObj);
    //             });
    //             if (show.lrjumptip) {
    //                 this.tip("两融详情", 0);
    //             }
    //         } else {
    //             that.indexh([]);
    //             that.axis();
    //             this.tip("暂无两融数据", -1);
    //             drawTitle.titleIndex(kObj);
    //         }
    //     } else if (type == "ZJL") {
    //         this.getZJL(function () {
    //             dataSplit.slice.call(kObj);
    //             data = ko.options.scale.indexs[type];
    //             // that.indexh(data);
    //             that.zjl(data);
    //             that.axisMACD();
    //             drawTitle.titleIndex(kObj);
    //         });
    //         if (show.cfjumptip) {
    //             this.tip("资金流详情", 1);
    //         }
    //     } else if (type == "MACD") {
    //         this.macd(data);
    //         this.axisMACD();
    //     } else {
    //         this.indexh(data);
    //         this.axis();
    //     }
    // } else {

    //     var data = quota[type];

    //     this.tip();
    //     if (type == "MACD") {
    //         this.macd(data);
    //         this.axisMACD();
    //     } else if (type == "ZJL") {
    //         this.zjl(data);
    //         this.axisMACD();
    //     } else {
    //         this.indexh(data);
    //         this.axis();
    //     }
    // }

}


drawIndexsH.prototype.indexh = function (data) {
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;
    var stauts = this.kObj.status;

    var kObj = this.kObj;
    var quota = kObj.tdata.quota;

    var zhibiao = quota[stauts.h];
    var pillar = zhibiao.length;

    var colors = this.color.colorsIndex;

    var scale = ops.scale;
    var max = quota[stauts.h + "Max"];        // K最大值
    var min = quota[stauts.h + "Min"];        // K最小值
    var diff = max - min;

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度

    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度

    var region = ops.drawRegion.index;
    var dh = region.h - region.pt - region.pt;
    var kbaseline = region.top + (region.h) - region.pb;
    var data = data;

    cc.clearRect(padding.left, region.top, drawSumWdith, region.h);

    for (var j = 0; j < colors.length; j++) {
        cc.beginPath();
        cc.strokeStyle = colors[j];
        var index = j + 1;

        var isfrist = true;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item[index] != "-") {
                var ih = (item[index] - min) / diff * dh;
                var y = kbaseline - ih;
                var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
                if (isfrist) {
                    cc.moveTo(x, y);
                    isfrist = false;
                } else {
                    cc.lineTo(x, y);
                }
            }
        }
        cc.stroke();
        cc.closePath();
    }
}


drawIndexsH.prototype.macd = function () {
    var cc = this.cc;
    var ops = this.ops;
    var kObj = this.kObj;
    var padding = ops.padding;
    var status = this.kObj.status.h;

    var colors = this.color.colorsIndex;

    var quota = kObj.tdata.quota;
    var data = quota[status];


    var color = ops.color;
    var scale = ops.scale;
    var max = quota[status + "Max"];        // K最大值
    var min = quota[status + "Min"];        // K最小值

    var mmax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);

    max = mmax;     // 上下限
    min = -mmax;


    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var pillar = scale.pillar;                          // 柱子数量
    // if (scale.data.length < pillar) {
    //     pillar = scale.data.length;
    // }
    // if (scale.data.length < scale.min) {
    //     pillar = scale.min;
    // }

    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度

    var region = ops.drawRegion.index;
    var dh = region.h - region.pt;
    var kbaseline = region.top + region.pt + (region.h - region.pt) / 2;
    var data = data;

    cc.clearRect(padding.left, region.top, drawSumWdith, region.h);

    for (var j = colors.length - 1; j >= 0; j--) {
        cc.beginPath();
        cc.strokeStyle = colors[j - 1];
        var index = j;

        var isfrist = true;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item[index]) {

                if (index == 3) {

                    var ih = (item[index]) / max * (dh / 2);
                    var y = kbaseline - ih;
                    var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
                    var sx = x - pillarWidht / 2 * 0.6;
                    var ex = x + pillarWidht / 2 * 0.6;

                    if (ih < 0) {
                        cc.fillStyle = color.fall;
                        cc.strokeStyle = color.fall;
                    } else {
                        cc.fillStyle = color.rise;
                        cc.strokeStyle = color.rise;
                    }

                    // cc.moveTo(x, kbaseline);
                    // cc.lineTo(x, y);
                    // cc.stroke();
                    // cc.EMFill(sx, kbaseline, ex, y);
                    cc.EMLine(x, kbaseline, x, y);
                } else {
                    var ih = (item[index]) / max * (dh / 2);
                    var y = kbaseline - ih;
                    var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
                    if (isfrist) {
                        cc.moveTo(x, y);
                        isfrist = false;
                    } else {
                        cc.lineTo(x, y);
                    }
                }
            }
        }
        cc.stroke();
        cc.closePath();
    }
}

// 资金流
drawIndexsH.prototype.zjl = function (data) {
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;
    var stauts = this.kObj.stauts.indexh;

    var colors = this.color.colorsIndex;
    var indexs = this.ops.scale.indexs;

    var color = ops.color;
    var scale = ops.scale;
    var max = scale.info[stauts + "Max"];        // K最大值
    var min = scale.info[stauts + "Min"];        // K最小值

    var mmax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);

    max = mmax;     // 上下限
    min = -mmax;

    var diff = max - min;

    var drawSumWdith = ops.drawRegion.drawSumWdith;        // 绘图宽度
    var pillar = scale.pillar;                          // 柱子数量
    if (scale.data.length < pillar) {
        pillar = scale.data.length;
    }
    if (scale.data.length < scale.min) {
        pillar = scale.min;
    }

    var pillarWidht = drawSumWdith / pillar;            // 每根柱子的区域宽度

    var region = ops.drawRegion.index;
    var dh = region.h - region.pt;
    var kbaseline = region.top + region.pt + (region.h - region.pt) / 2;
    var data = data;

    cc.clearRect(padding.left, region.top, drawSumWdith, region.h);

    for (var j = colors.length - 1; j >= 0; j--) {
        cc.beginPath();
        cc.strokeStyle = colors[j - 1];
        var index = j;

        var isfrist = true;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item[index]) {
                var ih = (item[index]) / max * (dh / 2);
                if (item[index] == "-") {
                    ih = 0;
                }
                var y = kbaseline - ih;
                var x = padding.left + (pillarWidht * i) + pillarWidht / 2;
                if (isfrist) {
                    cc.moveTo(x, y);
                    isfrist = false;
                } else {
                    cc.lineTo(x, y);
                }
            }
        }
        cc.stroke();
        cc.closePath();
    }
}

// 刻度
drawIndexsH.prototype.axis = function () {
    var stauts = this.kObj.stauts;
    var color = this.color;
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;
    var status = this.kObj.status;

    var quota = this.kObj.tdata.quota;
    var scale = ops.scale;
    var data = scale.data;
    // var max = scale.info[stauts.indexh + "Max"];        // K最大值
    // var min = scale.info[stauts.indexh + "Min"];        // K最小值
    var max = quota[status.h + "Max"];        // K最大值
    var min = quota[status.h + "Min"];        // K最小值
    var diff = (max - min) / 2;

    var region = ops.drawRegion.index;

    var base = region.top + region.h - region.pb;
    var unit = (region.h - region.pt - region.pb) / 2;

    // if (data.length > 0) {
    cc.clearRect(0, region.top + region.pt / 2, padding.left, region.h);
    cc.fillStyle = color.text;
    for (var i = 0; i <= 2; i++) {
        var num = tools.formatNumUnit(min + (diff * i), 5, 2);
        if (num + "" == "NaN") {
            num = "";
        }
        var w = cc.measureText(num).width + 8;
        var x = padding.left - w;
        var y = base - unit * i;
        cc.fillText(num, x, y);
    }
    // }
}

drawIndexsH.prototype.axisMACD = function () {
    var stauts = this.kObj.status;
    var color = this.color;
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;

    var quota = this.kObj.tdata.quota;

    var scale = ops.scale;
    var data = scale.data;
    var max = quota[stauts.h + "Max"];        // K最大值
    var min = quota[stauts.h + "Min"];        // K最小值

    var mmax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);

    max = mmax;     // 上下限
    min = -mmax;

    var diff = (max - min) / 2;

    var region = ops.drawRegion.index;

    var base = region.top + region.h - region.pb;
    var unit = (region.h - region.pt - region.pb) / 2;

    // if (data.length > 0) {
    cc.clearRect(0, region.top + region.pt / 2, padding.left, region.h);
    cc.fillStyle = color.text;
    for (var i = 0; i <= 2; i++) {
        var num = tools.formatNumUnit(min + (diff * i));
        var w = cc.measureText(num).width + 8;
        var x = padding.left - w;
        var y = base - unit * i;
        if (!isNaN(num)) {
            cc.fillText(num, x, y);
        }
    }
    // }
}

drawIndexsH.prototype.axisZJL = function () {
    var stauts = this.kObj.stauts;
    var color = this.color;
    var cc = this.cc;
    var ops = this.ops;
    var padding = ops.padding;

    var scale = ops.scale;
    var data = scale.data;
    var max = scale.info[stauts.indexh + "Max"];        // K最大值
    var min = scale.info[stauts.indexh + "Min"];        // K最小值

    var mmax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);

    max = mmax;     // 上下限
    min = -mmax;

    var diff = (max - min) / 2;

    var region = ops.drawRegion.index;

    var base = region.top + region.h - region.pb;
    var unit = (region.h - region.pt - region.pb) / 2;

    // if (data.length > 0) {
    cc.clearRect(0, region.top + region.pt / 2, padding.left, region.h);
    cc.fillStyle = color.text;
    for (var i = 0; i <= 2; i++) {
        var num = tools.formatNumUnit(min + (diff * i));
        var w = cc.measureText(num).width + 8;
        var x = padding.left - w;
        var y = base - unit * i;
        cc.fillText(num, x, y);
    }
    // }
}

// 两融差额
drawIndexsH.prototype.getLRCE = function (callback) {
    var that = this;
    var kObj = this.kObj;
    var kdata = this.kObj.data;

    var quota = this.kObj.tdata.quota;
    var stauts = this.kObj.status;
    var data = quota[stauts];

    if (data && data.length > 0) {
        that.indexh(data);
        that.axis();
        drawTitle.titleIndex(kObj);
    } else {

        var info = kdata.info;
        var ks = kdata.ks;
        var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 8888888 + 1111111);
        var url = "http://pdfm.eastmoney.com/em_ubg_pdti_fast/Indicators/mf";
        var datapar = {
            id: info.code + "" + info.mk,
            cb: methodName
        }
        jsonp(url, datapar, methodName, function (json) {
            // console.log(json);
            if (json.code === 0) {
                var data = json.data;
                var obj = {};
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    obj[item.NDate] = item;
                }

                var newLRCE = [];
                for (var i = 0, len = ks.length; i < len; i++) {
                    var time = ks[i][0];
                    var item = obj[time] || {};

                    var temp = [time];
                    if (item.CIsvalid) {
                        var diff = item.Diff / 1;
                        temp.push(diff);
                    } else {
                        temp.push("-");
                    }
                    newLRCE.push(temp)
                }

                kdata.indexs.LRCE = newLRCE;
                callback();
            }
        });

    }


}

// 获取资金流
drawIndexsH.prototype.getZJL = function (callback) {
    var that = this;
    var kdata = this.kObj.data;
    var info = kdata.info;
    var ks = kdata.ks;
    var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 8888888 + 1111111);
    var url = "http://ff.eastmoney.com/EM_CapitalFlowInterface/api/js";
    var datapar = {
        id: info.code + "" + info.mk,
        cb: methodName,
        type: "hff",
        rtntype: 2,
        check: "TLBMS",
        acces_token: "cd8625c41b7a304adea5c9d8e0e76d4e"
    }
    jsonp(url, datapar, methodName, function (json) {
        var data = json;

        var obj = {};
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i].split(",");
            obj[item[0]] = item;
        }

        var newArr = [];
        for (var i = 0, len = ks.length; i < len; i++) {
            var time = ks[i][0];
            var item = obj[time];
            if (!item) {
                item = [time, "-", "-", "-", "-"]
            }
            newArr.push(item)
        }

        kdata.indexs.ZJL = newArr;
        callback();
    });
}

// 跳转浮层
drawIndexsH.prototype.tip = function (txt, index) {
    var that = this;
    var kObj = this.kObj;
    var ops = kObj.options;
    var info = kObj.stock;
    var layerUI = kObj.layer.layerUI;

    var dw = ops.drawRegion.drawSumWdith;
    var dr = ops.drawRegion.index;
    // console.log(dr);

    var urls = [
        "http://data.eastmoney.com/rzrq/stock/{{code}}.html",
        "http://data.eastmoney.com/zjlx/{{code}}.html"
    ]

    if (txt) {
        var div = document.createElement("div");
        div.className = "__indextip";
        div.innerText = txt;

        var left = dw / 2;
        var top = dr.top + dr.mt + dr.h / 2;

        div.style.left = left + "px";
        div.style.top = top + "px";

        if (index > -1) {
            div.setAttribute("data-href", urls[index].replace("{{code}}", info.code));
        }
        div.setAttribute("data-top", top);
        div.setAttribute("data-left", left);

        layerUI.appendChild(div);

    } else {
        var its = document.querySelectorAll(".__indextip");
        for (var i = 0, len = its.length; i < len; i++) {
            layerUI.removeChild(its[i]);
        }
    }
}


module.exports = drawIndexsH;





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/drawIndexsH.js
// module id = 49
// module chunks = 0
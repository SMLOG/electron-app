var tools = require("../../common/tools");
var jsonp = require("../../common/jsonp");

var json = require("../../../../demo/js/ddx.json");

/**
 * 
 * @param {Chart} chart : chart对象
 * @param {*} type ： 表示主动画那个指标
 * @param {*} dt ： 表示是普通指标，还是主动请求的指标
 */
function drawIndicator(chart, type, dt) {
    var that = this;
    this.o = chart;
    this.type = type || chart.indicatorStauts || "RSI";


    this.cc1 = chart.layer.layerLineC;
    this.cc2 = this.o.layer.layerDataC;
    // this.cc3 = this.o.layer.layerGridC;

    var drawGrid = this.o.drawGrid;
    var show = this.o.options.show;

    this.init();
    // this.clear();

    if (this.type == "DDX" || this.type == "ZJL") {
        dt = 1;
    }

    that.tip();
    if (this.type == "MACD") {
        // this.init();
        this.clear();
        drawGrid.drawGridIndicator(2);
        this.drawMACD();
    } else {
        if (dt == 1) {
            if (this.type == "DDX") {
                this.getDDX(function () {
                    var tt = that;
                    if (that.o.indicatorStauts == "DDX") {
                        // drawGrid.drawGridIndicator();
                        // that.drawScale();
                        // that.drawLine();
                        // that.drawTitle(-1);

                        // that.init();
                        that.clear();

                        drawGrid.drawGridIndicator(2);
                        // that.drawScale();
                        // that.drawLine();
                        that.drawDDX();
                        that.drawTitle(-1);
                    }
                });
            } else if (this.type == "ZJL") {
                // this.tip();
                this.getZJL(function () {
                    var tt = that;
                    if (that.o.indicatorStauts == "ZJL") {
                        // that.init();
                        that.clear();
                        drawGrid.drawGridIndicator();
                        // that.drawScale();
                        // that.drawLine();
                        that.drawZJL();
                        that.drawTitle(-1);
                        if (show.cfjumptip) {
                            that.tip("资金流详情");
                        }
                    }
                });
            }

        } else {
            // this.init();
            this.clear();
            drawGrid.drawGridIndicator();
            this.drawScale();
            this.drawLine();
        }
    }

    this.indexs = this.o.data.indexs || {};
    var data = this.indexs[this.type] || [];
    if (data.length > 0) {
        this.drawTitle(data.length - 1);
    }
}

drawIndicator.prototype.init = function () {
    var chart = this.o;
    var ops = chart.options;

    this.ops = ops;
    this.area = ops.areaIndicator

    this.colors = ops.color.colorsIndex;
    this.titleKeys = ops.titleKeys;
    this.indexs = chart.data.indexs || {};
    this.imm = chart.data.imm || {};
}


drawIndicator.prototype.clear = function () {
    var w = this.ops.width;

    this.cc1.clearRect(0, this.area.starty - 10, w, this.area.height + 20);
    this.cc2.clearRect(0, this.area.starty - 10, w, this.area.height + 20);
}


drawIndicator.prototype.drawLine = function () {
    var data = this.indexs[this.type] || [];
    var max = this.imm[this.type + "Max"] || 0;
    var min = this.imm[this.type + "Min"] || 0;

    var info = this.o.data.info;

    if (min > 0) {
        min = 0;
    }
    var diff = max - min;

    var sx = this.area.startx;
    var sy = this.area.starty;
    var h = this.area.height;
    var w = this.area.draww;

    var total = info.total;
    // var dataLen = this.o.data.info.dayCount;

    var unitw = w / total;

    if ((this.o.options.iscr == "true" || this.o.options.iscr == true) && this.o.options.before == false) {
        w = w * (total - info.iscrCount) / total;
        unitw = w / total;
        sx += (info.iscrCount * unitw);
    }


    if (data.length > 0) {
        for (var i = 1; i < data[0].length; i++) {

            this.cc1.strokeStyle = this.colors[i - 1];
            this.cc1.beginPath();

            for (var j = 0, len2 = data.length; j < len2; j++) {
                var num = data[j][i];
                if (num !== "-") {
                    var x = sx + unitw / 2 + (j / (total)) * w;
                    var y = sy - h * (num - max) / diff;
                    this.cc1.lineTo(x, y);
                }

            }
            this.cc1.stroke();
        }
    }
}


drawIndicator.prototype.drawScale = function () {
    var info = this.o.data.info;
    var imm = this.o.data.imm || {};
    var area = this.ops.areaIndicator;
    var padding = this.ops.padding;
    var color = this.ops.color;

    var unith = area.height / area.splity;

    this.cc1.fillStyle = color.text;

    var key = this.type;
    var max = imm[key + "Max"] || 0;
    var min = imm[key + "Min"] || 0;
    if (min > 0) {
        min = 0;
    }
    // var min = 0;

    for (var i = 0; i <= area.splity; i++) {
        var txt = tools.formatNumUnit(min + ((max - min) / area.splity) * (area.splity - i));
        // txt = isNaN(txt) ? "0" : txt;
        txt = txt.toString() == "NaN" ? "0" : txt;
        var txtw = this.cc1.measureText(txt).width;
        var y = area.starty + i * unith;
        this.cc1.fillText(txt, padding.left - txtw - 4, y);
    }
}


drawIndicator.prototype.drawTitle = function (index) {
    // console.log(index);

    var data = this.indexs[this.type] || [];
    if (index == -1) {
        data = data[data.length - 1];
    } else {
        data = data[index];
    }

    if (data === undefined) {
        data = data[data.length - 1];
    }


    var sx = this.area.startx;
    var sy = this.area.starty - 10;
    var w = this.area.draww;


    var title = this.titleKeys[this.type];

    this.cc1.clearRect(sx - 1, sy - 7, this.ops.width, 16);

    var left = sx + 4;
    if (data && data.length > 1) {
        for (var i = 0; i < title.length; i++) {
            var num = data[i + 1];
            if (num != "-") {
                num = (num / 1).toFixed(3);
            }

            var name = title[i] + ":" + num;
            var txtw = this.cc1.measureText(name).width;

            this.cc1.fillStyle = this.colors[i];

            this.cc1.fillText(name, left, sy);
            left += txtw;
            left += 10;
        }
    }


}


drawIndicator.prototype.drawMACD = function () {
    var data = this.indexs[this.type] || [];
    var max = this.imm[this.type + "Max"] || 0;
    var min = this.imm[this.type + "Min"] || 0;

    // 绘制特殊的轴
    var amax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);
    var area = this.ops.areaIndicator;
    var padding = this.ops.padding;
    var color = this.ops.color;
    var unith = area.height / 2;
    this.cc1.fillStyle = color.text;
    var txt = amax;
    var txtw = this.cc1.measureText(txt).width;
    var y = area.starty;
    this.cc1.fillText(txt, padding.left - txtw - 4, y);
    txtw = this.cc1.measureText("0").width;
    this.cc1.fillText("0", padding.left - txtw - 4, y + unith);
    txtw = this.cc1.measureText(-amax).width;
    this.cc1.fillText(-amax, padding.left - txtw - 4, y + unith * 2);


    var diff = amax * 2;

    var sx = this.area.startx;
    var sy = this.area.starty;
    var h = this.area.height;
    var h2 = h / 2;
    var w = this.area.draww;

    var total = this.o.data.info.total;

    var unitw = w / total;

    var midy = sy + h2;

    if ((this.o.options.iscr == "true" || this.o.options.iscr == true) && this.o.options.before == false) {
        sx += (15 * unitw);
    }

    var dataLen = this.o.data.info.total;

    if (data.length > 0) {
        for (var i = 1; i < data[0].length - 1; i++) {
            this.cc1.strokeStyle = this.colors[i - 1];
            this.cc1.beginPath();

            for (var j = 0, len2 = data.length; j < len2; j++) {
                var x = sx + (j / (dataLen - 1)) * w;
                var y = midy - h2 * (data[j][i]) / amax;
                if (j == 0) {
                    this.cc1.moveTo(x, y);
                } else {
                    this.cc1.lineTo(x, y);
                }
            }
            this.cc1.stroke();
        }

        var unitw = w / dataLen;

        for (var i = data[0].length - 1; i < data[0].length; i++) {
            for (var j = 0, len2 = data.length; j < len2; j++) {
                var num = data[j][i];
                var x = sx + unitw / 2 + (j / (dataLen)) * w;
                var y = midy - h2 * (num) / amax;

                if (num > 0) {
                    this.cc1.strokeStyle = color.rise;
                } else {
                    this.cc1.strokeStyle = color.fall;
                }

                this.cc1.beginPath();
                this.cc1.moveTo(x, midy);
                this.cc1.lineTo(x, y);
                this.cc1.stroke();
            }
        }
    }
}


drawIndicator.prototype.drawZJL = function () {
    var data = this.indexs[this.type] || [];
    var max = Math.ceil(this.imm[this.type + "Max"]) || 0;
    var min = Math.ceil(this.imm[this.type + "Min"]) || 0;

    // 绘制特殊的轴
    var amax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);
    var area = this.ops.areaIndicator;
    var padding = this.ops.padding;
    var color = this.ops.color;
    var unith = area.height / 2;
    this.cc1.fillStyle = color.text;
    var txt = amax;
    var txtw = this.cc1.measureText(txt).width;
    var y = area.starty;
    this.cc1.fillText(txt, padding.left - txtw - 4, y);
    txtw = this.cc1.measureText("0").width;
    this.cc1.fillText("0", padding.left - txtw - 4, y + unith);
    txtw = this.cc1.measureText(-amax).width;
    this.cc1.fillText(-amax, padding.left - txtw - 4, y + unith * 2);


    var diff = amax * 2;

    var sx = this.area.startx;
    var sy = this.area.starty;
    var h = this.area.height;
    var h2 = h / 2;
    var w = this.area.draww;

    var total = this.o.data.info.total;

    var unitw = w / total;

    var midy = sy + h2;

    if ((this.o.options.iscr == "true" || this.o.options.iscr == true) && this.o.options.before == false) {
        sx += (15 * unitw);
    }

    var dataLen = this.o.data.info.total;

    if (data.length > 0) {
        for (var i = 0; i < data[0].length; i++) {
            this.cc1.strokeStyle = this.colors[i - 1];
            this.cc1.beginPath();

            for (var j = 0, len2 = data.length; j < len2; j++) {
                var x = sx + (j / (dataLen - 1)) * w;
                var y = midy - h2 * (data[j][i]) / amax;
                if (j == 0) {
                    this.cc1.moveTo(x, y);
                } else {
                    this.cc1.lineTo(x, y);
                }
            }
            this.cc1.stroke();
        }
    }
}


drawIndicator.prototype.drawDDX = function () {
    var data = this.indexs[this.type] || [];
    var max = this.imm[this.type + "Max"] || 0;
    var min = this.imm[this.type + "Min"] || 0;

    // 绘制特殊的轴
    var amax = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);
    var area = this.ops.areaIndicator;
    var padding = this.ops.padding;
    var color = this.ops.color;
    var unith = area.height / 2;
    this.cc1.fillStyle = color.text;
    var txt = (amax).toFixed(3);
    var txtw = this.cc1.measureText(txt).width;
    var y = area.starty;
    this.cc1.fillText(txt, padding.left - txtw - 4, y);
    txtw = this.cc1.measureText("0").width;
    this.cc1.fillText("0", padding.left - txtw - 4, y + unith);
    txtw = this.cc1.measureText(-txt).width;
    this.cc1.fillText(-txt, padding.left - txtw - 4, y + unith * 2);


    var diff = amax * 2;

    var sx = this.area.startx;
    var sy = this.area.starty;
    var h = this.area.height;
    var h2 = h / 2;
    var w = this.area.draww;

    var total = this.o.data.info.total;

    var unitw = w / total;

    var midy = sy + h2;

    if ((this.o.options.iscr == "true" || this.o.options.iscr == true) && this.o.options.before == false) {
        sx += (15 * unitw);
    }

    var dataLen = this.o.data.info.total;

    if (data.length > 0) {
        for (var i = 2; i < data[0].length; i++) {
            this.cc1.strokeStyle = this.colors[i - 1];
            this.cc1.beginPath();

            for (var j = 0, len2 = data.length; j < len2; j++) {
                var x = sx + (j / (dataLen - 1)) * w;
                var y = midy - h2 * (data[j][i]) / amax;
                if (j == 0) {
                    this.cc1.moveTo(x, y);
                } else {
                    this.cc1.lineTo(x, y);
                }
            }
            this.cc1.stroke();
        }

        var unitw = w / dataLen;

        for (var i = 1; i < 2; i++) {
            for (var j = 0, len2 = data.length; j < len2; j++) {
                var num = data[j][i];
                var x = sx + unitw / 2 + (j / (dataLen)) * w;
                var y = midy - h2 * (num) / amax;

                if (num > 0) {
                    this.cc1.strokeStyle = color.rise;
                } else {
                    this.cc1.strokeStyle = color.fall;
                }

                this.cc1.beginPath();
                this.cc1.moveTo(x, midy);
                this.cc1.lineTo(x, y);
                this.cc1.stroke();
            }
        }
    }
}


drawIndicator.prototype.getDDX = function (callback) {
    var that = this;
    var info = this.o.data.info;
    var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 8888888 + 1111111);
    var url = "http://pdfm.eastmoney.com/em_ubg_pdti_fast/Indicators/ddx"
    data = {
        id: info.code + "" + info.mk,
        js: methodName + "((x))"
    }
    jsonp(url, data, methodName, function (json) {
        // console.log(json);
        if (json.code === 0) {
            var data = json.data;
            data.unshift({
                "Ddx": "-",
                "Time": "2018-06-20 09:30"
            });
            var ddx = [];
            var max = -Infinity;
            var min = Infinity;
            var sum = 0;
            for (var i = 0, len = data.length; i < len; i++) {
                var t = data[i].Time;
                var d = (data[i].Ddx / 1) || 0;
                sum = (sum + d);
                var ar = [t, d, sum];
                sum = sum / 1;
                ddx.push(ar);
                max = max > d ? max : d;
                max = max > sum ? max : sum;
                min = min < d ? min : d;
                min = min < sum ? min : sum;
            }
            that.indexs.DDX = ddx;
            that.imm.DDXMax = max / 1;
            that.imm.DDXMin = min / 1;
            callback();
        }
    });
}


drawIndicator.prototype.getZJL = function (callback) {
    var that = this;
    var info = this.o.data.info;
    var methodName = "cb_" + new Date().getTime() + "_" + Math.floor(Math.random() * 8888888 + 1111111);
    var url = "http://ff.eastmoney.com/EM_CapitalFlowInterface/api/js"
    data = {
        id: info.code + "" + info.mk,
        js: methodName + "((x))",
        type: "ff",
        rtntype: 2,
        check: "TLBMS",
        acces_token: "cd8625c41b7a304adea5c9d8e0e76d4e"
    }
    jsonp(url, data, methodName, function (json) {
        // console.log(json);
        var data = json || [];
        data.unshift("09:30,0,0,0,0");
        var zjl = [];
        var max = -Infinity;
        var min = Infinity;
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i].split(",");
            zjl.push(item);
            for (var j = 1; j < item.length; j++) {
                max = max > item[j] / 1 ? max : item[j] / 1;
                min = min < item[j] / 1 ? min : item[j] / 1;
            }
        }
        that.indexs.ZJL = zjl;
        that.imm.ZJLMax = max;
        that.imm.ZJLMin = min;
        callback();
    });
}


drawIndicator.prototype.tip = function (txt) {
    var that = this;
    var kObj = this.o;
    var ops = kObj.options;
    var info = kObj.data.info;
    var layerUI = kObj.layer.layerUI;

    var dw = ops.areaIndicator.draww;
    var dr = ops.areaIndicator;

    var index = 0;
    // console.log(dr);

    var urls = [
        "http://data.eastmoney.com/zjlx/{{code}}.html"
    ]

    if (txt) {
        var div = document.createElement("div");
        div.className = "__indextip";
        div.innerText = txt;

        var left = dw / 2;
        var top = dr.starty + dr.height / 2 - 15;

        div.style.left = left + "px";
        div.style.top = top + "px";

        div.setAttribute("data-href", urls[index].replace("{{code}}", info.code));
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


module.exports = drawIndicator;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/drawIndicator.js
// module id = 55
// module chunks = 0
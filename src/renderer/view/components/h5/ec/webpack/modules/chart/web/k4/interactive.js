var drawLine = require("chart/common/drawLine");
var drawTitle = require("./drawTitle");
var tools = require("../../common/tools");
var title = require("./title");

var drawCYQ = require("../k3/drawCYQ");

/**
 * 交互
 */
function interactive(kObj) {
    this.kObj = kObj;

    this.addEvent();
}


interactive.prototype.addEvent = function () { //k2
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    var lastIndex = -1;

    var ops = this.kObj.options;
    var layerui = this.kObj.layer.layerUI;
    var dotsPoint = this.kObj.layer.dotsPoint;      // 打点层
    var padding = ops.padding;
    var drawRegion = ops.drawRegion;
    var popWinSet = ops.popWin;
    var cyq = ops.cyq || {};

    var left = padding.left;
    var right = ops.width - padding.right - (cyq.width || 0) - (cyq.gap || 0);
    var top = padding.top + drawRegion.k.pt + drawRegion.k.mt;
    var bottom = ops.height - drawRegion.minimap.h;

    layerui.addEventListener("mousemove", function (e) {
        var bcr = layerui.getBoundingClientRect();
        var targetClass = e.target.className;
        var status = _this.kObj.status;
        var tagName = e.target.tagName

        var tdata = _this.kObj.tdata;
        var x = e.clientX - bcr.left;
        var y = e.clientY - bcr.top;

        if (targetClass == "__ui" && tdata.tk || tagName == "IMG") {

            if (x >= left && x < right && y >= top && y <= bottom) {
                try {
                    _this.move(x, y);
                } catch (error) {

                }
            } else {
                // 鼠标移出  显示最后一期
                _this.hides();
                // var scale = _this.kObj.options.scale;
                // var last = scale.data.length - 1;
                // // 恢复数据为最后一期
                // var datak = scale.data[last];      // 当次
                // var VAVERAGE = scale.indexs.VAVERAGE[last];   // 成交量均线
                // var tempindex = scale.indexs[stauts.indexv] || [];
                // var tempindexh = scale.indexs[stauts.indexh] || [];
                // var datav = tempindex[last];     // 垂直指标
                // var datah = tempindexh[last];     // 水平指标

                // _this.kObj.options.thisData.data = datak;
                // _this.kObj.options.thisData.indexs.VAVERAGE = VAVERAGE;
                // _this.kObj.options.thisData.indexs[stauts.indexv] = datav;
                // _this.kObj.options.thisData.indexs[stauts.indexh] = datah;

                // drawTitle.titleK(_this.kObj);
                // drawTitle.titleTrading(_this.kObj);
                // if (_this.kObj.options.show.index) {
                //     drawTitle.titleIndex(_this.kObj);
                // }
            }
        } else {
            if (popWinSet.type == "auto") {
                _this.hides();
            }
        }
    });


    // 鼠标移出 显示最后一笔数据
    layerui.addEventListener("mouseout", function (e) {
        // console.log("00000000000000000000000000000000000000000000000");
        cyq = ops.cyq || {};
        // _this.hides();
        var scale = _this.kObj.options.scale;
        if (!scale.data) {
            scale.data = [];
        }
        var last = scale.data.length - 1;
        var stauts = _this.kObj.stauts;

        try {
            // 恢复数据为最后一期
            var datak = scale.data[last];      // 当次
            var VAVERAGE = scale.indexs.VAVERAGE[last];   // 成交量均线
            var datav = scale.indexs[stauts.indexv][last];     // 垂直指标
            var datah = (scale.indexs[stauts.indexh] || [])[last];     // 水平指标

            _this.kObj.options.thisData.data = datak;
            _this.kObj.options.thisData.indexs.VAVERAGE = VAVERAGE;
            _this.kObj.options.thisData.indexs[stauts.indexv] = datav;
            _this.kObj.options.thisData.indexs[stauts.indexh] = datah;

            drawTitle.titleK(_this.kObj);
            drawTitle.titleTrading(_this.kObj);
            if (_this.kObj.options.show.index) {
                drawTitle.titleIndex(_this.kObj);
            }
            if (cyq.width) {
                drawCYQ.call(_this.kObj);
            }
        } catch (error) {

        }
    });


    layerui.addEventListener("mouseleave", function (e) {
        var tle = e.toElement || e.relatedTarget || {};
        var tcls = tle.className || "";
        var ttag = tle.tagName;

        var par = null;
        var count = 0;
        function findPar(node) {
            count++;
            if (count < 5) {
                if (!node) {
                    node = {};
                }
                var tcls = node.className || "";
                if (tcls == "__technologyindex" || tcls == "__em_minimap" || tcls == "kt-pad" || tcls == "__popfloatwin ") {
                    par = node;
                } else {
                    findPar(node.parentNode);
                }
            }
        }
        findPar(tle);

        if (!par) {
            _this.hides();
        }

    }, true);

    layerui.addEventListener("click", function (e) {
        var tgt = e.target;
        if (e.target.className == "__ui") {
            var x = e.offsetX;
            var y = e.offsetY;

            var regk = drawRegion.k;

            var left = padding.left;
            var right = ops.width - padding.right;
            var top = padding.top + regk.top + regk.mt + regk.pt;
            var bot = ops.height - padding.bottom;
            if (x > left && x < right && y > top && y < bot) {
                var indextip = tgt.querySelector(".__indextip");

                if (indextip) {
                    var top = indextip.getAttribute("data-top") / 1;
                    var left = indextip.getAttribute("data-left") / 1;
                    console.log(left, top);
                    console.log(x, y);
                    if (x > left && x < left + 100 && y > top && y < top + 29) {
                        var href = indextip.getAttribute("data-href");
                        console.log(href);
                        if (href) {
                            window.open(href);
                        }
                    } else {
                        // 整个图的点击事件
                        ops.onClick();
                    }
                } else {
                    // 整个图的点击事件
                    ops.onClick();
                }

            }
        } else if (e.target.className == "__indextip") {
            var href = tgt.getAttribute("data-href");
            if (href) {
                window.open(href);
            }
        }

    });


    // 打点的鼠标的事件
    layerui.addEventListener("mousemove", function (e) {
        var tgt = e.target;
        var tagName = tgt.tagName
        var pops = layerui.querySelectorAll(".__pop");

        var pop;
        function findPop(tgtnode, childe) {
            var cls = tgtnode.className || "";
            if (cls == "__ui") {
                return;
            }
            if (cls.indexOf("__dotgroup") >= 0) {
                pop = childe.querySelector(".__pop");
            } else {
                findPop(tgtnode.parentNode, tgtnode);
            }
        }
        findPop(tgt);

        for (var i = 0, len = pops.length; i < len; i++) {
            pops[i].style.display = "none";
        }
        if (pop) {
            pop.style.display = "block";
        }
    });

}


// 十字线，交叉点
interactive.prototype.intersection = function (x, y) {
    var ops = this.kObj.options;
    var cross = this.kObj.options.cross;
    var popWin = this.kObj.layer.popWin;
    var cc = this.kObj.layer.layerLoadingC;

    var padding = ops.padding;
    var drawRegion = ops.drawRegion;

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top + drawRegion.k.pt + drawRegion.k.mt;
    var bottom = ops.height - drawRegion.minimap.h;

    cc.clearRect(0, 0, ops.width, ops.height);

    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.color;
    drawLine.dashed(cc, x, top, x, bottom, cross.solid, cross.dashed);
    drawLine.dashed(cc, left, y, right, y, cross.solid, cross.dashed);

    cc.fillStyle = cross.dot.color;
    cc.globalAlpha = cross.dot.opacity;
    var count = cross.dot.count;
    for (var i = count; i > 0; i--) {
        var r = cross.dot.radius * i / count;
        cc.beginPath();
        cc.arc(x, y, r, 0, Math.PI * 2);
        cc.fill();
    }
    cc.globalAlpha = 1;

}

// 移动
interactive.prototype.move = function (x, y) {
    // console.log(x, y);
    var ops = this.kObj.options;
    var stauts = this.kObj.stauts;
    var tdata = this.kObj.tdata;
    var padding = ops.padding;
    var scale = ops.scale;
    var kgap = ops.kgap;
    var cyq = ops.cyq || {};

    var tkdata = this.kObj.tdata.tk.tkdata;


    var drawSumWdith = ops.drawRegion.drawSumWdith;     // 绘图总宽度
    var drawRegionK = ops.drawRegion.k; // k线区域
    var drawSumHeight = drawRegionK.h - drawRegionK.mt - drawRegionK.mb - kgap.top - kgap.bottom;    // k线区域绘图高度

    var left = padding.left;
    var pillar = scale.min;          // 总数据的个数
    if (tkdata.length > pillar) {
        pillar = tkdata.length;
    }

    // 计算索引

    var index = (x - left) / drawSumWdith * pillar;
    index = Math.floor(index);
    // console.log(index);
    var datak = (tdata.tk.tkdata || [])[index];      // 当次
    var unitw = drawSumWdith / pillar;

    // console.log(index);

    if (index != this.lastIndex) {
        this.lastIndex = index;

        if (datak) {

            // 计算十字线的位置
            var ix = padding.left + index / pillar * drawSumWdith + unitw / 2;
            var close = datak.close;
            var kAxisMax = tdata.allMax;
            var kAxisMin = tdata.allMin;
            var diff = kAxisMax - kAxisMin;
            var iy = drawRegionK.mt + kgap.top + (Math.abs(close - kAxisMax) / diff * drawSumHeight) + padding.top;
            this.intersection(ix, iy);

            // 绘制标题
            title.call(this.kObj, index);

            // 用于显示悬浮窗的数据
            // var VAVERAGE = scale.indexs.VAVERAGE[index];   // 成交量均线
            // var datav;
            // if (stauts.indexv != "none") {
            //     datav = scale.indexs[stauts.indexv][index];     // 垂直指标
            // }
            // var datah = (scale.indexs[stauts.indexh] || [])[index];     // 水平指标

            // 显示浮窗
            var dur;
            if (x - padding.left > (drawSumWdith) / 2) {
                dur = "left"
            } else {
                dur = "right"
            }
            this.popwinShow(datak, dur);

            // // 获取指标数据
            // this.kObj.options.thisData.data = datak;
            // this.kObj.options.thisData.indexs.VAVERAGE = VAVERAGE;
            // this.kObj.options.thisData.indexs[stauts.indexv] = datav;
            // this.kObj.options.thisData.indexs[stauts.indexh] = datah;

            // var show = this.kObj.options.show;

            // drawTitle.titleK(this.kObj);
            // drawTitle.titleTrading(this.kObj);
            // if (show.index) {
            //     drawTitle.titleIndex(this.kObj);
            // }

            if (cyq.width) {
                drawCYQ.call(this.kObj, (scale.start + index));
            }

            if (this.kObj.options.onMove) {
                this.kObj.options.onMove(this.kObj.options.thisData);
            }

        } else {
            this.popwinHide();
        }

    }

}


// 弹出信息窗
interactive.prototype.popwinShow = function (tdata, dur) {
    var ops = this.kObj.options;
    var popWinSet = ops.popWin;
    var kObj = this.kObj;
    var decimal = this.kObj.sdata.kinfo.digit;   // 保留位数;
    var padding = ops.padding;
    var cyq = ops.cyq || {};

    var right = padding.right + (cyq.width || 0);


    /**
     * 创建一行
     * 
     * @param {*} name: 名称
     * @param {*} value： 值
     * @param {*} diff： 是否显示红绿色
     * @param {*} die： 保留小数， 如果不传，则原始返回
     * @param {*} fix: 单位
     * @returns
     */
    function crt(name, value, diff, die, fix) {
        fix = fix ? fix : "";
        var tag = document.createElement("div");
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        if (die) {
            span.innerText = (value / 1 || 0).toFixed(die) + fix;
        } else {
            span.innerText = value;
        }

        if (diff === 0) {
            span.className = "__hold";
        } else if (diff > 0) {
            span.className = "__rise";
        } else if (diff < 0) {
            span.className = "__fall";
        }
        tag.appendChild(lab);
        tag.appendChild(span);
        return tag;
    }

    function addSymbol(num) {
        var str;
        if (num > 0) {
            str = "+" + num;
        } else if (num == 0) {
            str = (0).toFixed(decimal);
        } else {
            str = num;
        }
        return str;
    }

    var h4 = document.createElement("h4");
    var lab = document.createElement("label");
    lab.innerHTML = "(可拖动)";
    if (popWinSet.type != "move") {
        lab.style.display = "none";
    }
    var span = document.createElement("span");
    span.innerHTML = tdata.times;


    // h4.innerText = tdata[0];
    h4.appendChild(lab);
    h4.appendChild(span);

    var open = crt("开盘", tdata.open, tdata.open - tdata.zs, decimal);
    var close = crt("收盘", tdata.close, tdata.close - tdata.zs, decimal);
    var high = crt("最高", tdata.high, tdata.high - tdata.zs, decimal);
    var low = crt("最低", tdata.low, tdata.low - tdata.zs, decimal);
    var range = crt("涨跌幅", tdata.zdf, tdata.zde, 2, "%");
    var money = crt("涨跌额", tdata.zde, tdata.zde, decimal);
    var cjl = crt("成交量", tools.formatNumUnit(tdata.volume, 2, 8), null, false);
    var cje = crt("成交额", tools.formatNumUnit(tdata.amount, 2, 8), null, false);
    var zf = crt("振幅", tdata.zf, null, 2, "%");
    var hsl;
    if (tdata.hsl !== undefined) {
        hsl = crt("换手率", tdata.hsl, null, 2, "%");
    }

    var popWin = this.kObj.layer.popWin;
    popWin.innerHTML = "";
    popWin.appendChild(h4)
    popWin.appendChild(open)
    popWin.appendChild(close)
    popWin.appendChild(high)
    popWin.appendChild(low)
    popWin.appendChild(range)
    popWin.appendChild(money)
    popWin.appendChild(cjl)
    popWin.appendChild(cje)
    popWin.appendChild(zf);
    if (hsl) {
        popWin.appendChild(hsl);
    }

    if (popWinSet.type == "auto") {
        if (dur == "left") {
            popWin.style.left = padding.left - 1 + "px";
            popWin.style.right = "";
        } else {
            popWin.style.left = "";
            popWin.style.right = right + "px";
        }
    } else {
        if (!this.dur && !this.kObj.isMoveFrist) {
            this.dur = dur;
            if (dur == "left") {
                popWin.style.left = padding.left - 1 + "px";
                popWin.style.right = "";
            } else {
                var r = ops.width - 142 - padding.right;
                if (cyq.width) {
                    r = r - cyq.width + cyq.gap || 0;
                }
                popWin.style.left = r + "px";
                popWin.style.right = "";
            }
        }
    }

    popWin.style.display = "block";

}


interactive.prototype.hides = function () {
    this.resetLastIndex();
    this.popwinHide();
    this.clearCross();
    this.hidePopAll();
    this.dur = false;
}

// 重置缓存的索引
interactive.prototype.resetLastIndex = function () {
    this.lastIndex = -1;
}

// 隐藏信息窗
interactive.prototype.popwinHide = function () {
    var popWin = this.kObj.layer.popWin;
    popWin.style.display = "none";
}

// 清除十字线
interactive.prototype.clearCross = function () {
    var cc = this.kObj.layer.layerLoadingC;
    var ops = this.kObj.options;
    cc.clearRect(0, 0, ops.width, ops.height);
}

interactive.prototype.hidePopAll = function () {
    var dotsPoint = this.kObj.layer.dotsPoint;
    var pops = dotsPoint.querySelectorAll(".__pop");
    for (var i = 0, len = pops.length; i < len; i++) {
        pops[i].style.display = "none";
    }
}

module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/interactive.js
// module id = 228
// module chunks = 0
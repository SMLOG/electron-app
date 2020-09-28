var drawLine = require("chart/common/drawLine");
var drawTitle = require("./drawTitle");
var tools = require("../../common/tools");

var drawCYQ = require("../k2/drawCYQ");
var Hammer = require("hammerjs");


/**
 * 交互
 */



function interactive(kObj) {
    this.mx = -1;
    this.my = -1;

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
    var padding = ops.padding || {};
    var drawRegion = ops.drawRegion;
    var popWinSet = ops.popWin;
    var cyq = ops.cyq || {};

    var left = padding.left;
    var right = ops.width - padding.right;
    var top = padding.top + drawRegion.k.pt + drawRegion.k.mt;
    var bottom = ops.height - drawRegion.minimap.h;

    var slidebar = this.kObj.slidebar;


    var reginMiniMap = drawRegion.minimap;
    var pinchBase = ops.height - reginMiniMap.h - reginMiniMap.mt - (padding.bottom || 0);


    var steptime = 0;
    var timeThrottle = 150;
    // 双指缩放事件
    var mc = new Hammer(layerui);
    mc.add(new Hammer.Pinch());
    mc.on("pinchin", function (ev) {
        var bcr = layerui.getBoundingClientRect();
        var p1 = ev.pointers[0].clientY;
        var p2 = ev.pointers[1].clientY;
        var base = pinchBase + bcr.top;

        if (ev.pointers.length == 2 && p1 < base && p2 < base) {
            // 节流 timeThrottle 毫秒触发一次
            var now = Date.now();
            if (now - steptime > timeThrottle) {

                var p1 = ev.pointers[0].clientX;
                var p2 = ev.pointers[1].clientX;

                var slide = slidebar.slide;
                var scale = slidebar.ops.scale;

                var nimimap = layerui.querySelector(".__em_minimap");
                var mapwidth = nimimap.getBoundingClientRect().width;

                var minWidth = scale.minWidth;              // 最小宽度
                var minWidth2 = mapwidth * (scale.min / scale.fullDataSize);     // 最小数量对应的最小宽度    
                var minWidthMax = minWidth > minWidth2 ? minWidth : minWidth2;      // 较大的一个

                var step = mapwidth / 100;

                var tleft = parseFloat(slide.style.left) || 0;        // 当前游标的距离
                var tright = parseFloat(slide.style.right) || 0;

                tleft = tleft - step;
                tright = tright - step;

                tleft = tleft < 0 ? 0 : tleft;
                tright = tright < 0 ? 0 : tright;

                slide.style.left = Math.round(tleft) + "px";
                slide.style.right = Math.round(tright) + "px";

                slidebar.reClacRegion();
                _this.move(_this.mx, _this.my);

                steptime = now;
            }

        }
    });

    mc.on("pinchout", function (ev) {
        var bcr = layerui.getBoundingClientRect();
        var p1 = ev.pointers[0].clientY;
        var p2 = ev.pointers[1].clientY;
        var base = pinchBase + bcr.top;

        if (ev.pointers.length == 2 && p1 < base && p2 < base) {
            // 节流 timeThrottle 毫秒触发一次
            var now = Date.now();
            if (now - steptime > timeThrottle) {

                var slide = slidebar.slide;
                var scale = slidebar.ops.scale;

                var nimimap = layerui.querySelector(".__em_minimap");
                var mapwidth = nimimap.getBoundingClientRect().width;

                var minWidth = scale.minWidth;              // 最小宽度
                var minWidth2 = mapwidth * (scale.min / scale.fullDataSize);     // 最小数量对应的最小宽度    
                var minWidthMax = minWidth > minWidth2 ? minWidth : minWidth2;      // 较大的一个

                var step = mapwidth / 100;

                var tleft = parseFloat(slide.style.left) || 0;        // 当前游标的距离
                var tright = parseFloat(slide.style.right) || 0;

                if (tleft + minWidthMax + step <= mapwidth - tright) {
                    tleft = tleft + step;
                } else {
                    tleft = mapwidth - tright - minWidthMax;
                }

                if (tright + minWidthMax + step <= mapwidth - tleft) {
                    tright = tright + minWidthMax;
                } else {
                    tright = mapwidth - tleft - minWidthMax;
                }

                slide.style.left = Math.round(tleft) + "px";
                slide.style.right = Math.round(tright) + "px";

                slidebar.reClacRegion();
                _this.move(_this.mx, _this.my);

                steptime = now;
            }

        }
    });


    var touchTime = 0;      // 按下的时间
    var touchstartCount = 0;
    layerui.addEventListener("touchstart", function (e) {
        touchTime = Date.now();
        touchstartCount++;
        console.log("touchstart  ");
        // document.querySelector(".bbb").innerHTML = "touchstart   touchstartCount: " + touchstartCount;
    });


    layerui.addEventListener("touchmove", function (e) {
        var bcr = layerui.getBoundingClientRect();
        var targetClass = e.target.className;
        var stauts = _this.kObj.stauts;
        var tagName = e.target.tagName

        // document.querySelector(".bbb").innerHTML = "touchmove   touchstartCount: " + touchstartCount;

        // 如果是多根手指， 则不触发
        var te = e.targetTouches[0];
        if (touchstartCount == 1) {
            console.log("touchmove  :  ");
            var data = _this.kObj.data;
            var x = te.clientX - bcr.left;
            var y = te.clientY - bcr.top;

            if (targetClass == "__ui" && data && data.k && _this.kObj.options.isdraw || tagName == "IMG") {

                if (x >= left && x < right && y >= top && y <= bottom) {
                    console.log("触发 单指 move。。。")
                    _this.move(x, y);
                } else {
                    // 鼠标移出  显示最后一期

                    _this.hides();
                    var scale = _this.kObj.options.scale;
                    var last = scale.data.length - 1;
                    // 恢复数据为最后一期
                    var datak = scale.data[last];      // 当次
                    var VAVERAGE = scale.indexs.VAVERAGE[last];   // 成交量均线
                    var datav = scale.indexs[stauts.indexv][last];     // 垂直指标
                    var datah = scale.indexs[stauts.indexh][last];     // 水平指标

                    _this.kObj.options.thisData.data = datak;
                    _this.kObj.options.thisData.indexs.VAVERAGE = VAVERAGE;
                    _this.kObj.options.thisData.indexs[stauts.indexv] = datav;
                    _this.kObj.options.thisData.indexs[stauts.indexh] = datah;

                    drawTitle.titleK(_this.kObj);
                    drawTitle.titleTrading(_this.kObj);
                    if (_this.kObj.options.show.index) {
                        drawTitle.titleIndex(_this.kObj);
                    }
                }
            } else {
                if (popWinSet.type == "auto") {
                    _this.hides();
                }
            }
        }
    });


    layerui.addEventListener("touchend", function (e) {
        var bcr = layerui.getBoundingClientRect();
        var targetClass = e.target.className;
        var stauts = _this.kObj.stauts;
        var tagName = e.target.tagName

        // targetTouches  touches
        var te = e.changedTouches[0];

        // document.querySelector(".bbb").innerHTML = "touchmove   touchstartCount: " + touchstartCount;

        if (touchstartCount == 1) {
            var data = _this.kObj.data;
            var x = te.clientX - bcr.left;
            var y = te.clientY - bcr.top;

            if (targetClass == "__ui" && data && data.k && _this.kObj.options.isdraw || tagName == "IMG") {
                if (x >= left && x < right && y >= top && y <= bottom) {
                    console.log("touchend  touchstartCount " + touchstartCount)
                    _this.move(x, y);
                } else {
                    _this.hides();
                }
            } else {
                if (popWinSet.type == "auto") {
                    _this.hides();
                }
            }
        }

        setTimeout(function () {
            touchstartCount = 0;
        }, 300);
    });


    // 点击回调事件 （双击）
    layerui.addEventListener("touchend", function (e) {
        var tgt = e.target;
        if (e.target.className == "__ui") {
            var te = e.changedTouches[0];
            var bcr = layerui.getBoundingClientRect();
            var x = te.clientX - bcr.left;
            var y = te.clientY - bcr.top;

            var now = Date.now();

            // 双击
            // console.log(now - touchTime, touchstartCount)
            if (now - touchTime < 300 && touchstartCount == 2) {
                var regk = drawRegion.k;
                var left = padding.left;
                var right = ops.width - padding.right;
                var top = padding.top + regk.top + regk.mt + regk.pt;
                var bot = ops.height - padding.bottom;

                //
                if (x > left && x < right && y > top && y < bot) {
                    // 是否在指标区域
                    var indextip = tgt.querySelector(".__indextip");
                    if (indextip) {
                        var top = indextip.getAttribute("data-top") / 1;
                        var left = indextip.getAttribute("data-left") / 1;

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
                        ops.onClick();
                    }
                }

                touchstartCount = 0;
            }
        }
    });

    // 打点的鼠标的事件
    layerui.addEventListener("touchend", function (e) {
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

    // 保存十字线位置
    this.mx = x;
    this.my = y;
}

// 移动
// istouch 表示时候是拖动底部滑块时触发的
interactive.prototype.move = function (x, y, istouch) {

    if (x == -1 || y == -1) {
        return;
    }

    // console.log(x, y);
    var ops = this.kObj.options;
    var stauts = this.kObj.stauts;
    var padding = ops.padding;
    var scale = ops.scale;
    var cyq = ops.cyq || {};

    var drawSumWdith = ops.drawRegion.drawSumWdith;     // 绘图总宽度
    var drawRegionK = ops.drawRegion.k; // k线区域
    var drawSumHeight = drawRegionK.h - drawRegionK.mt - drawRegionK.mb;    // k线区域绘图高度

    var left = padding.left;
    var pillar = scale.pillar;          // 总数据的个数
    if (scale.data.length < pillar) {
        pillar = scale.data.length;
    }
    if (scale.data.length < scale.min) {
        pillar = scale.min;
    }

    // 计算索引
    var index = (x - left) / drawSumWdith * pillar;
    index = Math.floor(index);
    var datak = scale.data[index];      // 当次
    var unitw = drawSumWdith / pillar;

    if (index != this.lastIndex || istouch) {
        this.lastIndex = index;

        if (datak) {

            // 计算十字线的位置
            var ix = padding.left + index / pillar * drawSumWdith + unitw / 2;
            var close = datak[2];
            var kAxisMax = scale.info.newKAxisMax;
            var kAxisMin = scale.info.newKAxisMin;
            var diff = kAxisMax - kAxisMin;
            var iy = drawRegionK.mt + (Math.abs(close - kAxisMax) / diff * drawSumHeight) + padding.top;

            // document.querySelector(".ccc").innerHTML = "移动十字线  istouch " + Math.random() + " = " + istouch;
            this.intersection(ix, iy);


            // 用于显示悬浮窗的数据
            var VAVERAGE = scale.indexs.VAVERAGE[index];   // 成交量均线
            var datav = scale.indexs[stauts.indexv][index];     // 垂直指标
            var datah = scale.indexs[stauts.indexh][index];     // 水平指标

            var dur;
            if (x - padding.left > drawSumWdith / 2) {
                dur = "left"
            } else {
                dur = "right"
            }

            this.popwinShow(datak, dur);

            // 获取指标数据
            this.kObj.options.thisData.data = datak;
            this.kObj.options.thisData.indexs.VAVERAGE = VAVERAGE;
            this.kObj.options.thisData.indexs[stauts.indexv] = datav;
            this.kObj.options.thisData.indexs[stauts.indexh] = datah;

            var show = this.kObj.options.show;

            drawTitle.titleK(this.kObj);
            drawTitle.titleTrading(this.kObj);
            if (show.index) {
                drawTitle.titleIndex(this.kObj);
            }

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
    var decimal = this.kObj.data.info.decimal;
    var padding = ops.padding;

    var isMoveFrist = this.kObj.isMoveFrist;

    function crt(tagname, name, value, diff, isde) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        if (!isde) {
            span.innerText = (value / 1 || 0).toFixed(decimal);
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
    span.innerHTML = tdata[0];


    // h4.innerText = tdata[0];
    h4.appendChild(lab);
    h4.appendChild(span);

    var open = crt("div", "开盘", tdata[1], tdata[1] - tdata[10]);
    var close = crt("div", "收盘", tdata[2], tdata[2] - tdata[10]);
    var high = crt("div", "最高", tdata[3], tdata[3] - tdata[10]);
    var low = crt("div", "最低", tdata[4], tdata[4] - tdata[10]);
    var range = crt("div", "涨跌幅", addSymbol(tdata[9]) + "%", tdata[9], true);
    var money = crt("div", "涨跌额", addSymbol(tdata[8]), tdata[8]);
    var cjl = crt("div", "成交量", tools.formatNumUnit(tdata[5], 2, 8), null, true);
    var cje = crt("div", "成交额", tools.formatNumUnit(tdata[6], 2, 8), null, true);
    var zf = crt("div", "振幅", tdata[7], null, true);

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

    if (popWinSet.type == "auto") {
        if (dur == "left") {
            popWin.style.left = padding.left - 1 + "px";
            popWin.style.right = "";
        } else {
            popWin.style.left = "";
            popWin.style.right = padding.right + "px";
        }
    } else {
        if (!this.dur && !this.kObj.isMoveFrist) {
            this.dur = dur;
            if (dur == "left") {
                popWin.style.left = padding.left - 1 + "px";
                popWin.style.right = "";
            } else {
                popWin.style.left = ops.width - padding.right - 142 + "px";
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
    this.lastIndex = "-1";
}

// 影藏信息窗
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
// ./modules/chart/web/k4/interactiveForIpad.js
// module id = 229
// module chunks = 0
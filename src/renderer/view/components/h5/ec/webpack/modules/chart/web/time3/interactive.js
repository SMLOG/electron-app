var drawLine = require("chart/common/drawLine");
var drawTitle = require("./drawTitle");
var tools = require("../../common/tools");

/**
 * 交互
 */

function interactive(kObj) {
    this.kObj = kObj;

    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    var lastIndex = -1;

    var ops = this.kObj.ops;
    var layerui = this.kObj.layer.layerUI;
    var padding = ops.padding;

    var left = padding.left - 1;
    var right = ops.width - padding.right;
    var top = ops.areaTime.starty;
    var bottom = ops.height - padding.bottom;

    layerui.addEventListener("mousemove", function (e) {
        // console.log(e);
        var bcr = layerui.getBoundingClientRect();

        var tagName = e.target.tagName
        var targetClass = e.target.className;
        var tpClass = e.target.parentNode.className;

        var data = _this.kObj.data;

        if (data && data.isFoatmat && targetClass == "__ui" || tpClass == "__positionChanges" || tagName == "IMG") {
            var x = e.clientX - bcr.left;
            var y = e.clientY - bcr.top;
            if (x >= left && x < right && y >= top && y <= bottom) {
                _this.move(x, y);
            } else {
                new drawTitle(_this.kObj);      // 最后一笔

                if (_this.kObj.ops.show.indicatorArea) {
                    try {
                        _this.kObj.indicator.drawTitle(-1);        //  绘制指标数据
                    } catch (error) {

                    }
                }

                _this.hides();
            }
        } else {
            _this.hides();
        }

    });

    layerui.addEventListener("mouseout", function (e) {
        if (_this.kObj.data) {
            new drawTitle(_this.kObj);
            _this.hides();
        }
    });

    layerui.addEventListener("click", function (e) {
        var tgt = e.target;
        if (e.target.className == "__ui") {

            var x = e.offsetX;
            var y = e.offsetY;

            var areaTime = ops.areaTime;

            var left = padding.left;
            var right = ops.width - padding.right;
            var top = areaTime.starty;
            var bot = ops.height - padding.bottom;
            if (x > left && x < right && y > top && y < bot) {
                // ops.onClick();

                var indextip = tgt.querySelector(".__indextip");

                if (indextip) {
                    var top = indextip.getAttribute("data-top") / 1;
                    var left = indextip.getAttribute("data-left") / 1;
                    console.log(left, top);
                    console.log(x, y);
                    if (x > left && x < left + 100 && y > top && y < top + 29) {
                        var href = indextip.getAttribute("data-href");
                        console.log(href);
                        window.open(href);
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
        // console.log(tgt);

        for (var i = 0, len = pops.length; i < len; i++) {
            pops[i].style.display = "none";
        }
        if (pop) {
            pop.style.display = "block";
        }
    });

}


interactive.prototype.move = function (x, y) {
    var _this = this;
    var ops = this.kObj.ops;
    var data = this.kObj.data.data || [];
    var padding = ops.padding;

    var index = this.getIndex(x, y);

    var datak = data[index];      // 当次
    if (index != this.lastIndex) {
        this.lastIndex = index;
        // console.log(index);
        // console.log(datak);

        if (_this.kObj.ops.show.indicatorArea) {
            try {
                _this.kObj.indicator.drawTitle(index);        //  绘制指标数据
            } catch (error) {

            }
        }


        // 用于显示悬浮窗的数据
        if (datak) {
            this.intersection(x, y, datak, index);
            new drawTitle(this.kObj, datak);
        } else {
            _this.hides();
        }

        if (datak) {
            this.kObj.ops.onMove(datak);
        }
    }
}


// 十字线，交叉点
interactive.prototype.intersection = function (x, y, dataitem, index) {
    var ops = this.kObj.ops;
    var cross = this.kObj.ops.cross;
    var popWin = this.kObj.layer.popWin;
    var cc = this.kObj.layer.layerLoadingC;
    var info = this.kObj.data.info;

    var padding = ops.padding;
    var area = ops.areaTime;
    var areaTrading = ops.areaTrading;
    var font = ops.font;
    var tip = ops.tip;
    var cap = ops.timebox.cap;

    var decimal = info.decimal;
    var left = padding.left;
    var right = ops.width - padding.right;
    var top = area.starty;
    var bottom = ops.height - padding.bottom;
    var total = info.total;
    var unitw = area.draww / total;
    var ileft = left + (index / total) * area.draww + unitw / 2;

    var yAxisMax = info.yAxisMax;
    var yAxisMin = info.yAxisMin;
    var h = (yAxisMax - dataitem[1]) / (yAxisMax - yAxisMin) * area.height;

    var cy = top + (h * cap) + (area.height * (1 - cap) / 2);

    cc.clearRect(0, 0, ops.width, ops.height);

    cc.fillStyle = "rgba(0,0,0,0)";
    cc.strokeStyle = cross.color;
    drawLine.dashed(cc, ileft, top, ileft, bottom, cross.solid, cross.dashed);      // 竖线
    drawLine.dashed(cc, left, cy, right, cy, cross.solid, cross.dashed);

    cc.fillStyle = cross.dot.color;
    cc.globalAlpha = cross.dot.opacity;
    var count = cross.dot.count;
    for (var i = count; i > 0; i--) {
        var r = cross.dot.radius * i / count;
        cc.beginPath();
        cc.arc(ileft, cy, r, 0, Math.PI * 2);
        cc.fill();
    }
    cc.globalAlpha = 1;

    // 提示框
    if (tip.show) {
        var size = font.size;
        var pd = tip.padding;
        var skew = tip.skew;

        var prise = dataitem[1];
        var change = (dataitem[6] / 1).toFixed(decimal) + "%";
        var time = dataitem[0].substr(11);
        var cjl = tools.formatNumUnit(dataitem[2], 2, 5);      // 成交量

        var pw = cc.measureText(prise).width;
        var cw = cc.measureText(change).width;
        var tw = cc.measureText(time).width;
        var cjw = cc.measureText(cjl).width;

        var th = size + pd * 2;

        cc.fillStyle = tip.background;
        var ty = cy - size / 2 - pd;
        cc.fillRect(left - pw - pd * 2 - skew, ty, pw + pd * 2, th);
        cc.fillRect(right + skew, ty, cw + pd * 2, th);
        // console.log(right + skew, ty, cw + pd * 2, th);
        cc.fillRect(ileft - tw / 2 - pd, top + area.height, tw + pd * 2, th);

        cc.fillStyle = tip.color;
        cc.fillText(prise, left - pw - pd - skew, cy);
        cc.fillText(change, right + pd + skew, cy);
        cc.fillText(time, ileft - tw / 2, top + area.height + size / 2 + pd);

        if (tip.trading) {
            cc.fillStyle = tip.background;
            cc.fillRect(ileft - cjw / 2 - pd, areaTrading.starty + areaTrading.height / 2 - font.size / 2, cjw + pd * 2, th);
            cc.fillStyle = tip.color;
            cc.fillText(cjl, ileft - cjw / 2, areaTrading.starty + areaTrading.height / 2 + pd);
        }
    }



}


interactive.prototype.getIndex = function (x, y) {
    var ops = this.kObj.ops;
    var padding = ops.padding;
    var info = this.kObj.data.info;

    var drawSumWdith = ops.areaTime.draww;     // 绘图总宽度
    var left = padding.left;

    var pillar = info.total;          // 总数据的个数
    var unitw = drawSumWdith / pillar;

    // 计算索引
    var index = (x - left) / drawSumWdith * pillar;
    index = Math.floor(index);

    return index;
}


interactive.prototype.hides = function () {
    this.resetLastIndex();
    this.clearCross();
}

// 重置缓存的索引
interactive.prototype.resetLastIndex = function () {
    this.lastIndex = "-1";
}

// 清除十字线
interactive.prototype.clearCross = function () {
    var cc = this.kObj.layer.layerLoadingC;
    var ops = this.kObj.ops;
    cc.clearRect(0, 0, ops.width, ops.height);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/interactive.js
// module id = 326
// module chunks = 0
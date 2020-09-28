var drawLine = require("chart/common/drawLine");
var tools = require("../../common/tools");
var colorTools = require("../../common/color");
// var drawTitle = require("./drawTitle");

var setting = {};
var defaultData = {};

/**
 * 交互
 */

function interactive(chart) {
    this.chart = chart;
    setting = chart.options;

    defaultData = chart.datas
    
    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    this.lastIndex = -1;
    this.lastGroupIndex = -1;

    var ops = setting;
    var chart = this.chart;
    var layerui = chart.layer.layerUI;
    var popwin = chart.layer.popwin;
    var padding = ops.padding;

    this.popwin = popwin;

    var w = ops.width;
    var h = ops.height;

    layerui.addEventListener("mousemove", function (e) {
        var targetClass = e.target.className || "";
        var bcr = layerui.getBoundingClientRect();

        defaultData = _this.chart.datas;
        var chart = _this.chart;
        var status = _this.chart.status;    // 绘图完成
        var dataCount = chart.dataCount;

        if (targetClass.indexOf("__ui") > -1 && status) {
            var box = defaultData.box;
            var x = e.clientX - bcr.left;
            var y = e.clientY - bcr.top;

            var datas = defaultData.datas;
            var split = defaultData.split;
            var dataCount = _this.chart.dataCount;
            var dataCount2 = dataCount + datas.length;
            var baseZero = defaultData.baseZero;

            var width = box.ex - box.sx;
            var height = box.ey - box.sy;
            var min = split[split.length - 1];
            var diff = split[0] / 1 + (min > 0 ? 0 : Math.abs(min));

            if (x >= box.sx && x < box.ex && y >= box.sy && y <= box.ey) {

                // 计算当前光标位于第几组数据
                var index = -1;
                var startx = -1;
                var endx = -1;
                var count = 0;
                var size = 0;
                var data = [];
                for (var i = 0; i < datas.length; i++) {
                    data = datas[i].data;
                    size = data.length;
                    startx = box.sx + (count + i) / dataCount2 * width;
                    endx = startx + (size + 1) / dataCount2 * width;
                    if (x >= startx && x < endx) {
                        index = i;
                        break;
                    }
                    count += size;
                }


                // 计算光标位于当前组的第几个数据上
                var groupIndex = -1;
                var unit = width / dataCount2;
                var base = startx + unit / 2;
                var isHoverBar = false;
                var left = 0;
                var hei = 0;
                for (var i = 0; i < data.length; i++) {
                    left = base + i * unit;
                    if (x >= left && x < left + unit) {
                        groupIndex = i;
                        // 计算纵轴是否在柱子上
                        hei = data[i] / diff * height;
                        if (hei > 0) {
                            if (y >= baseZero - hei && y < baseZero) {
                                isHoverBar = true;
                            }
                        } else {
                            if (y >= baseZero && y < baseZero - hei) {
                                isHoverBar = true;
                            }
                        }
                        break;
                    }
                }

                // console.log(index, groupIndex, isHoverBar);

                if (_this.lastIndex != index || _this.lastGroupIndex != groupIndex) {
                    _this.popwinShow(defaultData, index);

                    _this.lastIndex = index;
                    _this.lastGroupIndex = groupIndex;
                }
                _this.move(x, y, groupIndex, isHoverBar);

                _this.clearShade();
                if (isHoverBar) {
                    _this.moveHover(datas, _this.lastIndex, _this.lastGroupIndex, left, hei, unit )
                }
                _this.shade(startx, endx);
                
            } else {
                _this.hides();
            }
        } else {
            _this.hides();
        }
    });


    layerui.addEventListener("mouseleave", function () {
        _this.hides();
    })

}



interactive.prototype.move = function (x, y, index, isHoverBar) {
    var ops = setting;
    var pop = this.popwin;

    var w = ops.width;
    var h = ops.height;

    var bcr = pop.getBoundingClientRect();

    if (x > w / 2) {
        pop.style.right = (w - x) + 8 + "px";
        pop.style.left = "";
    } else {
        pop.style.right = "";
        pop.style.left = x + 8 + "px";
    }


    if (y > h / 2) {
        pop.style.bottom = (h - y) + 8 + "px";
        pop.style.top = "";
    } else {
        pop.style.bottom = "";
        pop.style.top = y + 8 + "px";
    }


    var list = pop.querySelectorAll(".__poplist > div");
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].className = "";
    }
    if (isHoverBar) {
        try {
            list[index].className = "__strong";
        } catch (error) {
        }
    }

}

interactive.prototype.moveHover = function(datas, lastIndex, lastGroupIndex, left, hei, unit){
    hei += Math.abs(hei) / hei * 1;

    var cc = this.chart.layer.layerInteractiveC;
    var baseBar = this.chart.baseBar;
    var barWidth = this.chart.options.barWidth;

    var colors = defaultData.colors;
    var hoverColor = datas[lastIndex].hoverColor || [];
    var color = hoverColor[lastGroupIndex] ;
    // color = color ? color : colors[lastGroupIndex % colors.length];
    // console.log(color);

    if (!color) {
        var rkc = colorTools.rank(colors[lastGroupIndex % colors.length], 2)
    }

    // console.log(rkc);

    // if (hei > 0) {
    //     baseBar -= 1;
    // } else {
    //     baseBar += 1;
    // }

    // console.log("unit:  " + unit);
    
    cc.fillStyle = rkc || color;
    cc.strokeStyle = rkc || color;
    var x1 = left + (1 - barWidth) / 2 * unit;
    var x2 = x1 + barWidth * unit;
    cc.EMFill2(x1, baseBar, x2, baseBar - hei);
    

}

// 弹出信息窗
interactive.prototype.popwinShow = function (ddata, index, gindex) {
    var ops = this.chart;
    var layerui = ops.layer.layerUI;
    var popwin = ops.layer.popwin;

    var names = ddata.names;
    var format = ddata.format;
    var dataItem = ddata.datas[index];
    var data = dataItem.data;
    var name = dataItem.name || names;

    function crt(tagname, name, value, subfix) {
        var tag = document.createElement(tagname);
        var lab = document.createElement("label");
        lab.innerText = name;
        var span = document.createElement("span");
        span.innerText = format ? format(value) : value;

        tag.appendChild(lab);
        tag.appendChild(span);
        return tag;
    }


    var divs = document.createElement("div");
    divs.className = "__poplist";
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        var div = crt("div", name[i], data[i]);
        if (data[i] != "-") {
            sum += parseFloat(data[i]);
        }
        divs.appendChild(div);
    }

    popwin.innerHTML = "";

    var val = dataItem.isStatis ? sum : "";
    var title = crt("div", dataItem.popTitle, val);
    title.className = "__poptitle"

    if (dataItem.popTitle) {
        popwin.appendChild(title);
    }
    popwin.appendChild(divs);

    popwin.style.display = "block";

}

// 交互遮罩
interactive.prototype.shade = function (x1, x2) {

    var shade = this.chart.layer.layerInteractiveC;
    var color = setting.color;

    var box = defaultData.box;

    shade.fillStyle = color.shade;
    shade.strokeStyle = "rgba(0,0,0,0)";

    shade.beginPath();
    shade.moveTo(x1, box.sy);
    shade.lineTo(x2, box.sy);
    shade.lineTo(x2, box.ey);
    shade.lineTo(x1, box.ey);
    shade.closePath();
    shade.fill();

}


interactive.prototype.hides = function () {
    this.resetLastIndex();
    this.popwinHide();
    this.clearShade();
}

// 重置缓存的索引
interactive.prototype.resetLastIndex = function () {
    this.lastIndex = -1;
    this.lastGroupIndex = -1;
}

// 影藏信息窗
interactive.prototype.popwinHide = function () {
    var popwin = this.popwin;
    popwin.style.display = "none";
}

interactive.prototype.clearShade = function(){
    var shade = this.chart.layer.layerInteractiveC;
    shade.clearRect(0, 0, 10000, 10000);
}



module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/interactive.js
// module id = 451
// module chunks = 0
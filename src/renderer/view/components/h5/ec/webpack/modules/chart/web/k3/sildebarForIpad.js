var coordinate = require("chart/common/coordinate");
var dataSplit = require("./dataSplit");

function slideBar(kObj) {
    this.kObj = kObj;

    this.initData();

    if (this.kObj.options.show.minimap) {
        this.bindEvent();
    }
}


slideBar.prototype.initData = function () {
    var kObj = this.kObj;
    this.cc = kObj.layer.layerKC;
    this.data = kObj.data;
    this.ops = kObj.options;
    this.padding = kObj.padding;
}


// 计算缩略图的最小宽度
slideBar.prototype.minWidth = function () {
    var ops = this.ops;
    var drawSumWdith = ops.drawRegion.drawSumWdith;
    var dataks = this.data.k;
    var scale = this.kObj.options.scale;

    var minbarwidth = scale.min / dataks.length * drawSumWdith;
    this.minbarwidth = minbarwidth;
}

// 绘制全量数据
slideBar.prototype.drawFullData = function () {
    this.initData();
    this.minWidth();

    var cc = this.cc;
    var ops = this.ops;
    var data = this.data;
    var scale = this.kObj.options.scale;

    var color = ops.color;
    var padding = ops.padding;
    var drawRegion = ops.drawRegion;
    var map = drawRegion.minimap;

    var drawSumWdith = drawRegion.drawSumWdith;
    var height = map.h - map.mt;

    // 绘制全量k线
    var min = data.info.kMin;
    var max = data.info.kMax;
    var all = data.k;
    var baseLeft = padding.left;
    var baseBottom = ops.height - padding.bottom;
    var unit = drawSumWdith / (all.length + 1);
    var cha = max - min;

    cc.clearRect(0, ops.height - height + 1, ops.width, height + 1);

    cc.save();
    cc.strokeStyle = color.border;
    cc.fillStyle = "rgba(0,0,0,0)";
    cc.EMLine(padding.left, ops.height - height - padding.bottom, ops.width - padding.right, ops.height - padding.bottom);
    cc.restore();

    var years = {};
    // 绘制全量的线
    cc.strokeStyle = color.minimap.line;
    cc.fillStyle = color.minimap.fill;
    cc.beginPath();
    cc.moveTo(padding.left, baseBottom + 1);
    for (var i = 0; i < all.length; i++) {
        var ar = all[i];

        var year = ar[0].substr(0, 4);
        if (years[year]) {
            years[year] = ++years[year];
        } else {
            years[year] = 1;
        }

        var ih = (ar[2] - min) / cha * height;

        var x = coordinate.format(baseLeft + (unit * i) + 1);
        var y = coordinate.format(baseBottom - ih);

        cc.lineTo(x, y);
    }
    cc.lineTo(padding.left + drawSumWdith - 2, baseBottom + 1);
    cc.closePath();
    cc.stroke();
    cc.fill();

    this.drawYear(years, all.length);


    if (all.length <= this.kObj.options.scale.min) {
        this.slide.style.display = "none";
    } else {
        if (this.kObj.options.show.minimap) {
            var sta = scale.start < 0 ? 0 : scale.start;
            var left = sta / scale.fullDataSize * drawSumWdith;
            var right = drawSumWdith - (scale.end) / scale.fullDataSize * drawSumWdith;
            if (right < 0) {
                right = 0;
            }
            this.slide.style.left = Math.round(left) + "px";
            this.slide.style.right = Math.round(right) + "px";
        }
    }
}

// 绘制年份
slideBar.prototype.drawYear = function (years, sum) {
    var cc = this.cc;
    var ops = this.ops;

    var color = ops.color;
    var padding = ops.padding;
    var drawRegion = ops.drawRegion;
    var map = drawRegion.minimap;
    var font = ops.font;
    var height = ops.height - padding.bottom;

    var drawSumWdith = drawRegion.drawSumWdith;

    cc.fillStyle = color.text;
    cc.strokeStyle = color.text;

    var arr = [];
    for (var key in years) {
        arr.push({
            year: key,
            count: years[key]
        })
    }

    var left = padding.left;
    var endx = 0;
    var textY = height - map.h * 0.25;
    var count = 0;
    for (var i = 0; i < arr.length - 1; i++) {
        count += arr[i].count;
        var start = count / sum * drawSumWdith;
        left = padding.left + start;

        var txt = arr[i + 1].year;
        var txtw = cc.measureText(txt).width;

        // 不会重叠
        if (left > endx + 10 && left + txtw < padding.left + drawSumWdith) {
            endx = left + txtw;
            cc.beginPath();
            cc.EMLine(left, height, left, textY);
            cc.closePath();
            cc.stroke();
            cc.fillText(arr[i + 1].year, left + 2, textY + font.size / 2);
            cc.fill();
        }
    }

    // 只有一年的
    if (arr.length == 1) {
        cc.EMLine(left, height, left, textY);
        cc.fillText(arr[0].year, left + 2, textY + font.size / 2);
        cc.fill();
    }
}

// 拖动事件
slideBar.prototype.bindEvent = function () {
    var _this = this;
    var layerUI = this.kObj.layer.layerUI;

    var chart = this.kObj;
    var nimimap = layerUI.querySelector(".__em_minimap");
    var slide = layerUI.querySelector(".__slidebar");
    this.slide = slide;
    var bcr1 = nimimap.getBoundingClientRect();
    var bcr2 = slide.getBoundingClientRect();

    var left = slide.querySelector(".__sb_left");
    var right = slide.querySelector(".__sb_right");

    // 计算滑动条的边界
    var boundaryLeft = bcr1.left;
    var boundaryRight = bcr1.left + bcr1.width;
    var slideWidht = bcr1.width;

    var scale = this.kObj.options.scale;

    var down = false;
    var body = false;
    var moveCursor = false;     // 是否移动过游标
    var moveBody = false;       // 是否移动过body
    var dur;
    var tx, ty;     // 点击的位置
    layerUI.addEventListener("touchstart", function (e) {
        var data = _this.data;

        var te = e.targetTouches[0];

        if (data && data.k) {
            bcr1 = nimimap.getBoundingClientRect();
            bcr2 = slide.getBoundingClientRect();

            boundaryLeft = bcr1.left;
            boundaryRight = bcr1.left + bcr1.width;

            var cls = e.target.className;
            if (cls == "__slidebar") {
                body = true;
                tx = te.clientX;
                ty = te.clientY;
            }
            if (cls.indexOf("__sb_left") > -1) {
                dur = "left";
                down = true;
            }
            if (cls.indexOf("__sb_right") > -1) {
                dur = "right";
                down = true;
            }
        }
    });

    // 当有文字选中时，mouseup 不会触发。
    // slide.onselectstart = slide.onmousedown = function () {
    //     return false;
    // }

    var moveTime = 0;
    layerUI.addEventListener("touchmove", function (e) {
        if (down || body) {
            var now = new Date().getTime();
            if (now - moveTime > 100) {
                moveTime = now;
                // _this.reClacRegion();
                // console.log("111");
            } else {
                // console.log("222");
            }
            handleCursor(e);
            handleBody(e);
        }
    });

    layerUI.addEventListener("touchend", function (e) {
        var fullDataSize = scale.fullDataSize;      // 总数据数量
        var minWidth = scale.minWidth;              // 最小宽度
        var minWidth2 = slideWidht * (scale.min / fullDataSize);     // 最小数量对应的最小宽度    
        var minWidthMax = minWidth > minWidth2 ? minWidth : minWidth2;      // 较大的一个

        var interactive = chart.interactive;

        // 移动过游标或者body
        if (moveCursor || moveBody) {
            var tleft = parseInt(slide.style.left) || 0;        // 当前游标的距离
            var tright = parseInt(slide.style.right) || 0;

            var diff = (slideWidht - tright) - tleft;       // 两个游标的间距
            if (diff < minWidthMax) {
                if (dur == "left") {
                    slide.style.left = Math.round(slideWidht - tright - minWidthMax) + "px";
                } else {
                    slide.style.right = Math.round(slideWidht - tleft - minWidthMax) + "px";
                }
            }
            _this.reClacRegion();

            console.log("interactive  interactive ")
            interactive.move(interactive.mx, interactive.my, true);
        }

        down = false;
        body = false;
        moveCursor = false;
        moveBody = false;
    });

    // 两端的游标的移动
    function handleCursor(e) {
        if (down) {
            var te = e.targetTouches[0];
            var fullDataSize = scale.fullDataSize;      // 总数据数量
            var minWidth = scale.minWidth;              // 最小宽度
            var minWidth2 = slideWidht * (scale.min / fullDataSize);     // 最小数量对应的最小宽度    
            var minWidthMax = minWidth > minWidth2 ? minWidth : minWidth2;      // 较大的一个

            moveCursor = true;
            var x = te.clientX;
            var xl = x - boundaryLeft;

            var tleft = parseInt(slide.style.left) || 0;        // 当前游标的距离
            var tright = parseInt(slide.style.right) || 0;
            var cursorDiff = slideWidht - tleft - tright;

            if (dur == "right") {
                var right = slideWidht - xl;
                if (right < 0) {
                    right = 0;
                }
                if (xl < tleft + minWidthMax) {
                    right = slideWidht - tleft - minWidthMax;
                }
                slide.style.right = Math.round(right) + "px";
            } else {
                var left;
                if (xl + minWidthMax > (slideWidht - tright)) {
                    left = slideWidht - tright - minWidthMax;
                } else {
                    left = xl;
                }
                if (xl < 0) {
                    left = 0;
                }
                slide.style.left = Math.round(left) + "px";
            }
        }
    }

    // 中间的部分移动
    function handleBody(e) {
        if (body) {
            var te = e.targetTouches[0];
            moveBody = true;

            var x = te.clientX;
            var y = te.clientY;

            var diffx = x - tx;

            // 两端游标的位置
            var cursorLeft = parseInt(slide.style.left) || 0;
            var cursorRight = parseInt(slide.style.right) || 0;

            var newLeft = cursorLeft + diffx;
            var newRight = cursorRight - diffx;

            if (newLeft < 0) {
                var diff = 0 - newLeft;
                newLeft = 0;
                newRight = newRight - diff;
            }

            if (newRight < 0) {
                var diff = 0 - newRight;
                newRight = 0;
                newLeft = newLeft - diff;
            }

            if (newLeft >= 0 && newRight >= 0) {
                slide.style.left = newLeft + "px";
                slide.style.right = newRight + "px";
            }

            tx = x;
            ty = y;
        }
    }


}

// 重新计算数据区间
slideBar.prototype.reClacRegion = function () {
    var ops = this.ops;
    var drawRegion = ops.drawRegion;
    var scale = this.ops.scale;

    var slide = this.slide;

    var dataAllSize = this.kObj.data.k.length;
    var drawSumWdith = drawRegion.drawSumWdith;
    var cursorLeft = parseInt(slide.style.left) || 0;
    var cursorRight = parseInt(slide.style.right) || 0;
    if (cursorRight < 0) {
        cursorRight = 0;
    }

    var start = Math.round(dataAllSize * (cursorLeft / drawSumWdith));
    var end = Math.round(dataAllSize * ((drawSumWdith - cursorRight) / drawSumWdith));
    if (end >= scale.min && end + 1 - start == scale.min) {
        start = end - scale.min;
    }

    scale.start = start;
    scale.end = end;
    scale.pillar = end - start + 1;

    // 重新截取数据
    dataSplit.slice.call(this.kObj);
    this.kObj.draw();

    // 拖动的回调
    if (this.kObj.options.onDrag) {
        var stauts = this.kObj.stauts;
        var datas = this.kObj.options.scale;
        // console.log(datas)
        var idxs = {};
        idxs[stauts.indexv] = datas.indexs[stauts.indexv];
        idxs[stauts.indexh] = datas.indexs[stauts.indexh];
        idxs.VAVERAGE = datas.indexs.VAVERAGE
        var res = {
            data: datas.data,
            indexs: idxs,
        }
        this.kObj.options.onDrag(res);
    }

}

slideBar.prototype.update = function () {
    var ops = this.kObj.options;
    var scale = ops.scale;
    var drawSumWdith = ops.drawRegion.drawSumWdith;

    var left = (scale.start) / scale.fullDataSize * drawSumWdith;
    var right = drawSumWdith - (scale.end + 1) / scale.fullDataSize * drawSumWdith;

    var slide = this.slide;

    console.log("======================");
    slide.style.left = left + "px";
    slide.style.right = right + "px";

}


module.exports = slideBar;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/sildebarForIpad.js
// module id = 202
// module chunks = 0
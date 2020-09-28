var coordinate = require("chart/common/coordinate");
var dataSplit = require("./dataSplit");
var getk = require("./getdata/getk");
var savedata = require("./format/savedata");

var savedata = require("./format/savedata");
var fk = require("./format/fk");
var quota = require("./format/quota");
var slice = require("./slice");


function slideBar(kObj) {

    this.kObj = kObj;

    this.init();

    this.bindEvent();

    // setTimeout(() => {
    //     this.getData2();
    // }, 1000);

    this.lasttime = 0;
}


slideBar.prototype.init = function () {
    var kObj = this.kObj;
    this.cc = kObj.layer.layerKC;
    this.data = kObj.data;
    this.ops = kObj.options;
    this.padding = kObj.padding;


    var minimap = kObj.layer.minimap;

    var slide = minimap.querySelector(".__slidebar");
    var left = minimap.querySelector(".__sb_left");
    var right = minimap.querySelector(".__sb_right");

    slide.style.display = "none";

    this.minimap = minimap;
    this.slide = slide;
    this.left = left;
    this.right = right;

    this.leftx = 0;
    this.rightx = Infinity;

}


// 拖动事件
slideBar.prototype.bindEvent = function () {
    var _this = this;
    var kObj = this.kObj;
    var layerUI = this.kObj.layer.layerUI;


    var minimap = this.minimap;
    var slide = this.slide;
    var left = this.left;
    var right = this.right;

    var bcr1 = minimap.getBoundingClientRect();
    var bcr2 = slide.getBoundingClientRect();


    // 计算滑动条的边界
    var boundaryLeft = bcr1.left;
    var boundaryRight = bcr1.left + bcr1.width;
    var slideWidht = bcr1.width;

    this.boundaryLeft = boundaryLeft;
    this.mousedowndom;     // 鼠标在按下时所选中的dom

    var scale = this.kObj.scale;

    var down = false;
    var body = false;
    var moveCursor = false;     // 是否移动过游标
    var moveBody = false;       // 是否移动过body
    var dur;
    // var tx, ty;     
    this.tx;// 点击的位置
    minimap.addEventListener("mousedown", function (e) {
        bcr1 = minimap.getBoundingClientRect();
        bcr2 = slide.getBoundingClientRect();

        console.log(bcr1);

        _this.mousedowndom = e.target;

        boundaryLeft = bcr1.left;
        boundaryRight = bcr1.left + bcr1.width;

        var cls = e.target.className;
        if (cls == "__slidebar") {
            body = true;
            _this.tx = e.clientX;
            console.log(_this.tx);
            ty = e.clientY;
        }
        if (cls.indexOf("__sb_left") > -1) {
            dur = "left";
            down = true;
        }
        if (cls.indexOf("__sb_right") > -1) {
            dur = "right";
            down = true;
        }
    });

    // 当有文字选中时，mouseup 不会触发。
    minimap.onselectstart = minimap.onmousedown = function () {
        return false;
    }

    var moveTime = 0;
    var slideMoveCount = 0;
    document.addEventListener("mousemove", function (e) {
        if (down || body) {
            if (slideMoveCount == 0) {
                kObj.options.onDragStart(kObj.options.scale);
            }
            var now = new Date().getTime();
            if (now - moveTime > 100) {
                moveTime = now;
                // _this.reClacRegion();
            }
            _this.handleCursor(e);
            _this.handleBody(e);
            slideMoveCount++;
        }
    });

    document.addEventListener("mouseup", function (e) {
        down = false;
        body = false;
        moveCursor = false;
        moveBody = false;
        slideMoveCount = 0;
    });

}


slideBar.prototype.handleCursor = function (e) {
    var mousedowndom = this.mousedowndom;
    var cls = mousedowndom.className;

    var kObj = this.kObj;
    var scale = kObj.options.scale;
    var bcr1 = this.minimap.getBoundingClientRect();
    var total = kObj.sdata.kinfo.total;

    var dur = "";
    if (cls.indexOf("left") > -1) {
        dur = "left";
    }
    if (cls.indexOf("right") > -1) {
        dur = "right";
    }

    if (dur) {
        this.dur = dur;
        this["dur" + dur] = dur;
        this["dur" + dur + "x"] = e.clientX;

        var x1 = this.durleftx - bcr1.left;
        var x2 = this.durrightx - bcr1.left;
        var index1 = Math.floor(total * x1 / bcr1.width);
        var index2 = Math.floor(total * x2 / bcr1.width);

        if (x2 - x1 < scale.minWidth) {
            if (this.dur == "left") {
                this.durleftx = this.durrightx - scale.minWidth / 1;
            } else {
                this.durrightx = this.durleftx + scale.minWidth / 1;
            }
        }

        if (index2 - index1 < scale.min) {
            var w = bcr1.width * (scale.min / total);
            if (this.dur == "left") {
                this.durleftx = this.durrightx - w;
            } else {
                this.durrightx = this.durleftx + w;
            }
        }


        this.updateCursor();

        var now = Date.now();
        if (now - this.lasttime > 100) {
            this.lasttime = now;
        }
    }
}


slideBar.prototype.handleBody = function (e) {
    var mousedowndom = this.mousedowndom;
    var cls = mousedowndom.className;

    var bcr1 = this.minimap.getBoundingClientRect();

    if (cls.indexOf("__slidebar") > -1) {

        var nx = e.clientX;
        var diff = nx - this.tx;

        var durleftx = this.durleftx;
        var durrightx = this.durrightx;

        if (durleftx >= bcr1.left && durrightx <= bcr1.left + bcr1.width) {
            if (diff < 0 && durleftx > bcr1.left) {
                durleftx = durleftx + diff;
                if (durleftx < bcr1.left) {
                    var d = durleftx - bcr1.left;
                    durleftx = bcr1.left;
                    durrightx = durrightx - d;
                } else {
                    durrightx = durrightx + diff;
                }
            }
            if (diff > 0 && durrightx < bcr1.left + bcr1.width) {
                durrightx = durrightx + diff;
                if (durrightx > bcr1.left + bcr1.width) {
                    var d = bcr1.left + bcr1.width - durrightx;
                    durrightx = bcr1.left + bcr1.width;
                    durleftx = durleftx + diff - d;
                } else {
                    durleftx = durleftx + diff;
                }
            }
        }

        this.durleftx = durleftx;
        this.durrightx = durrightx;
        this.tx = e.clientX;

        // console.log(diff);

        this.updateCursor();

        var now = Date.now();
        if (now - this.lasttime > 100) {
            this.lasttime = now;
        }
    }

}

// 更新位置
slideBar.prototype.updateCursor = function () {
    var bcr1 = this.minimap.getBoundingClientRect();

    var left = this.left;
    var right = this.right;
    var slide = this.slide;

    var leftx = this.durleftx || bcr1.left;
    var rightx = this.durrightx || (bcr1.width + bcr1.left);

    // console.log(leftx, rightx);

    if (leftx + 10 >= rightx) {
        if (this.dur == "left") {
            leftx = rightx - 10;
        } else {
            rightx = leftx + 10;
        }
    }


    var nleftx = leftx - bcr1.left;
    var nrightx = bcr1.width - rightx + bcr1.left;

    if (!nleftx || nleftx < 0) {
        nleftx = 0;
    }
    if (!nrightx || nrightx < 0) {
        nrightx = 0;
    }


    // console.log(leftx, rightx);

    if (leftx < rightx) {
        slide.style.left = (nleftx) + "px";
        slide.style.right = (nrightx) + "px";
    }

    // 复原坐标
    this.durleftx = nleftx + bcr1.left;
    this.durrightx = bcr1.left + bcr1.width - nrightx;

    this.reClacRegion();
}


// 重新计算数据区间
slideBar.prototype.reClacRegion = function () {
    var kObj = this.kObj;
    var scale = kObj.options.scale;
    var bcr1 = this.minimap.getBoundingClientRect();

    var x1 = this.durleftx - bcr1.left;
    var x2 = this.durrightx - bcr1.left;

    // console.log(x1, x2);
    var total = kObj.sdata.kinfo.total;

    var index1 = Math.floor(total * x1 / bcr1.width);
    var index2 = Math.floor(total * x2 / bcr1.width);
    // console.log(index1, index2);

    scale.start = index1;
    scale.end = index2;
    scale.pillar = (index2 - index1);

    // fk.call(kObj);
    // quota.call(kObj);
    slice.call(kObj);

    kObj.__draw();

}


slideBar.prototype.updateByScale = function () {
    var kObj = this.kObj;
    var scale = kObj.options.scale;
    var bcr1 = this.minimap.getBoundingClientRect();

    var total = kObj.sdata.kinfo.total;

    var x1 = bcr1.left + (scale.start / total * bcr1.width);
    var x2 = bcr1.left + (scale.end / total * bcr1.width);

    this.durleftx = x1;
    this.durrightx = x2;

    this.updateCursor();
}


slideBar.prototype.getData2 = function () {
    var that = this;
    
    var kObj = this.kObj;
    var kdata = kObj.sdata.kdata;
    var maps = kObj.minimap.maps;

    var lasttime = kObj.sdata.kdata[0][0];
    var endtime = (maps[maps.length - 1][0]) - 10000;     // 时间往前推一年防止断掉


    var day = (lasttime + "").substr(4);

    var promisearr = [];

    while (lasttime > endtime) {

        var par = Object.assign({}, kObj.stock);
        par.end = lasttime;
        par.start = lasttime - 20000;

        var promise = getk(par);
        promisearr.push(promise)
        lasttime -= 20000;      // 每段两年
    }

    Promise.all(promisearr)
        .then(function (data) {
            var arr = [];
            for(var i = 0, len = data.length ; i < len ; i++){
                if (data[i].error == "") {
                    var items = data[i].items;
                    arr = arr.concat(items);
                }
            }
            
            var frist = data[0];
            frist.items = arr;

            savedata.call(kObj, frist);
            fk.call(kObj);
            quota.call(kObj);

            var scale = kObj.options.scale;
            var tkdata = kObj.tdata.tk.tkdata;

            if (tkdata.length > scale.min) {
                that.slide.style.display = "block";
            }


            that.updateByScale();

        });



}

module.exports = slideBar;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/sildebar.js
// module id = 75
// module chunks = 0
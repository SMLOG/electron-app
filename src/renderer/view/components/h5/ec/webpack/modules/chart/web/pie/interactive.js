// var data = require("./defaultData");
var colorTools = require("../../common/color");

/**
 * 交互
 */

var setting = {};
var data = {};

function interactive(chart) {
    this.chart = chart;

    data = chart.data;
    setting = chart.options;

    this.addEvent();
}


interactive.prototype.addEvent = function () {
    var _this = this;

    // 用于保存最后一次移动时的索引，如果一直在x左边的z轴方向移动，则不改变该值，就不用重新绘制标题数据
    this.lastIndex = -1;

    var layerui = this.chart.layer.layerUI;

    var cx = setting.centerx;
    var cy = setting.centery;
    var r1 = setting.radiusIn;
    var r2 = setting.radiusOut;
    var r3 = setting.radiusHover;
    var startAngle = setting.startAngle;

    // mousemove
    layerui.addEventListener("mousemove", function (e) {
        var bcr = layerui.getBoundingClientRect();
        data = _this.chart.data;
        setting = _this.chart.options;

        var tagName = e.target.tagName
        var targetClass = e.target.className;
        var tpClass = e.target.parentNode.className;

        // console.log(tagName);

        if (targetClass == "__ui" || tagName == "TD" || tagName == "TABLE" && data) {
            var x = e.clientX - bcr.left;
            var y = e.clientY - bcr.top;
            // console.log(x, y);
            var dui = x - cx;
            var lin = y - cy;
            var radius = Math.sqrt(dui * dui + lin * lin);     /// 两点到中心点的距离

            if (radius >= r1 && radius <= r2) {
                var cAngle = _this.getAngle(x, y);
                var regin = _this.getRegin(cAngle);
                
                _this.showPopWin(x, y, regin);
                // console.log(regin);
                
                // console.log(regin);
                if (_this.lastIndex != regin.index) {
                    _this.hover(regin);
                    _this.lastIndex = regin.index !== undefined ? regin.index : -1;
                }
            } else {
                _this.hides();
            }

        } else {

        }

    });

    layerui.addEventListener("mouseout", function (e) {
        _this.hides();
    });

}


interactive.prototype.hover = function (regin) {
    var _this = this;
    var cc = this.chart.layer.layerInteractiveC;

    regin.data = regin.data ? regin.data : {};

    var startAngle = regin.sa;
    var endAngle = regin.ea;
    var color = regin.data.color;
    var hoverColor = regin.data.hoverColor;

    if (!hoverColor) {
        try {
            hoverColor = colorTools.rank(color, 2);
        } catch (error) {
            hoverColor = "rgba(0,0,0,0)";
            _this.lastIndex = -1;
        }
    }


    var w = setting.width;
    var h = setting.height;
    var cx = setting.centerx;
    var cy = setting.centery;
    var r1 = setting.radiusIn;
    var r2 = setting.radiusOut;
    var r3 = setting.radiusHover;

    cc.clearRect(0, 0, w, h);
    cc.fillStyle = hoverColor;

    cc.beginPath();
    cc.arc(cx, cy, r1, startAngle / 180 * Math.PI, (endAngle) / 180 * Math.PI, true);
    cc.arc(cx, cy, r3, (endAngle) / 180 * Math.PI, startAngle / 180 * Math.PI, false);
    cc.fill();

}


interactive.prototype.getAngle = function (x, y) {
    var angleDur = setting.angleDur;
    var cx = setting.centerx;
    var cy = setting.centery;
    var dui = Math.abs(x - cx);
    var lin = y - cy;
    var radius = Math.sqrt(dui * dui + lin * lin);     /// 两点到中心点的距离

    var mAngle = Math.round((Math.asin(dui / radius) / Math.PI * 180));        // 角度

    if (x > cx && y < cy) {
        mAngle = -90 + mAngle;
    }

    if (x < cx && y < cy) {
        mAngle = -90 - mAngle;
    }

    if (x < cx && y > cy) {
        mAngle = -270 + mAngle;
    }

    if (x > cx && y > cy) {
        mAngle = -270 - mAngle;
    }

    return mAngle;

}


interactive.prototype.getRegin = function (cAngle) {

    var datas = data.data;
    var sum = setting.sum;
    var startAngle = setting.startAngle;
    var angleDur = setting.angleDur;

    var sa, ea, index, tempitem;
    for (var i = 0, len = datas.length; i < len; i++) {
        var item = datas[i];
        var angle = item.data / sum * 360;
        var endAngle = startAngle - (angle * angleDur);

        // cAngle = cAngle % 360;
        // startAngle = startAngle % 360;
        // endAngle = endAngle % 360;
        // var max = startAngle > endAngle ? startAngle : endAngle;
        // var min = startAngle > endAngle ? endAngle : startAngle;


        if (Math.abs(startAngle) >= 360 || Math.abs(endAngle) >= 360) {
            if (cAngle <= startAngle && cAngle > endAngle) {
                
            } else {
                if (Math.abs(cAngle) < 360) {
                    cAngle = cAngle - 360;
                }
            }
        }

        if (cAngle <= startAngle && cAngle > endAngle) {
            index = i;
            tempitem = item;
            sa = startAngle
            ea = endAngle;
            break;
        }

        startAngle = endAngle;
    }

    return {
        index: index,
        data: tempitem,
        sa: sa,
        ea: ea
    }
}


interactive.prototype.showPopWin = function (x, y, regin) {
    var tdata = regin.data || {};

    var w = setting.width;
    var h = setting.height;
    var cx = setting.centerx;
    var cy = setting.centery;
    
    var popwin = this.chart.layer.popwin;
    popwin.innerHTML = "";

    var datas = data.data;
    var datacb = data.datacb;
    
    if (tdata.popContent) {
        popwin.innerHTML = tdata.popContent;
    } else {
        var table = document.createElement("table");
        for (var i = 0, len = datas.length; i < len; i++) {
            var item = datas[i];
            var cb = item.datacb || datacb;
            var val = cb ? cb(item.data) : item.data;
    
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
    
            td1.innerText = item.name;
            td2.innerText = val;
    
            tr.appendChild(td1);
            tr.appendChild(td2);
    
            table.appendChild(tr);
        }
    
        popwin.appendChild(table);
    }
    
    popwin.style.display = "block";
    var bcr = popwin.getBoundingClientRect();

    if (x > cx) {
        popwin.style.right = (w - x + 8) + "px";
        popwin.style.left = "";
    } else {
        popwin.style.right = "";
        popwin.style.left = x + 8 + "px";
    }

    if (y > cy) {
        var bot = (h - y + 8);
        if (bot + bcr.height > h) {
            popwin.style.top = "0";
            popwin.style.bottom = "";
        } else {
            popwin.style.top = "";
            popwin.style.bottom = bot + "px";
        }
    } else {
        var top = y + 8;
        if (top + bcr.height > h) {
            popwin.style.top = "0";
            popwin.style.bottom = "";
        } else {
            popwin.style.top = top + "px";
            popwin.style.bottom = "";
        }
    }

}


interactive.prototype.hides = function () {
    this.hide();
    this.clearHover();
    this.lastIndex = -1;
}


interactive.prototype.hide = function () {
    var popwin = this.chart.layer.popwin;
    popwin.style.display = "none";
}


interactive.prototype.clearHover = function () {
    var cc = this.chart.layer.layerInteractiveC;
    var w = setting.width;
    var h = setting.height;
    cc.clearRect(0, 0, w, h);
}


module.exports = interactive;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/pie/interactive.js
// module id = 405
// module chunks = 0
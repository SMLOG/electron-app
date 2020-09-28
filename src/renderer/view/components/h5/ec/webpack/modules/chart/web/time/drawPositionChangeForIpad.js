var typeToImgMap = require('chart/web/time/typeToImg');
var common = require('chart/common/common');

var tred = ["火箭发射", "封涨停板", "机构买单", "快速反弹", "大笔买入", "有大买盘", "向上缺口", "竞价上涨", "高开5日线", "60日新高", "打开跌停", "60日大幅上涨"];
var tgrn = ["快速下跌", "封跌停板", "机构卖单", "高台跳水", "大笔卖出", "有大卖盘", "向下缺口", "竞价下跌", "低开5日线", "60日新低", "打开涨停", "60日大幅下跌"];


// 对获取到的盘口异动数据进行处理
function drawPositionChange() {

    if (this.option.type != "r") {
        return;
    }

    var ops = this.options;

    var layer = this.layer.positionChanges;
    layer.innerHTML = "";
    var ui = this.layer.layerUI;
    var info = this.data.info;

    var areaTime = ops.areaTime;
    var padding = ops.padding;
    var cap = ops.timebox.cap;

    var frist = true;
    var times = [];	// 保存时刻

    var _that = this;

    var positionChanges = this.option.data.positionChanges;     // 异动数据
    var timeData = this.data.data;      // 分时数据

    //分时数据
    for (var i = 0; i <= positionChanges.length - 1; i++) {
        var item = positionChanges[i].split(",");
        //异动的相关信息
        var positionChangeItem = {
            code: item[0],
            time: item[1],
            name: item[2],
            type: item[3],
            change: item[4],
            isProfit: item[5]       // 方向，区分是买还是卖， 0表示卖
        };

        var changeTime = item[1];
        var changeImg = typeToImgMap(item[3]);
        var changeIconHeight = areaTime.starty + areaTime.height * cap + (areaTime.height * (1 - cap) * 0.75 - 3);
        var color = tred.join(",").indexOf(item[3]) >= 0 ? "red" : "green";

        for (var j = 0; j < timeData.length; j++) {
            var temp = timeData[j][0].substr(11);       // 截取时间
            if (changeTime == temp) {

                var cd = 0;		// 重叠个数
                for (var c = 0; c < times.length; c++) {
                    if (times[c] == changeTime) {
                        cd++;
                    }
                }

                var x = padding.left + (j / info.total) * areaTime.draww;      // 该时刻对应的左偏移
                var y = changeIconHeight - 4 * cd;

                if (i == 0) {
                    drawIcon3(ui, layer, x, y, changeImg, positionChangeItem, true, i, this);
                } else {
                    drawIcon3(ui, layer, x, y, changeImg, positionChangeItem, false, i, this);
                }

                times.push(changeTime);
                break;
            }
        }
    }
}


/**
 * 
 * @param {*} container  : dom容器
 * @param {*} x : x坐标
 * @param {*} y ： y坐标
 * @param {*} imgUrl ： 图片
 * @param {*} info ：所有的信息
 * @param {*} isFrist : 是否是第一个, 第一个闪烁
 * @param {*} index : 地多少个
 * @param {*} _this : 图表对象，用于响应点击的回调函数
 */
function drawIcon3(ui, container, x, y, imgUrl, info, isFrist, index, _this) {

    var layer = _this.layer.layerUI;

    var color = tred.join(",").indexOf(info.type) >= 0 ? "red" : "green";

    var div = document.createElement("div");
    div.setAttribute("data-index", index);
    div.style.position = "absolute";
    div.style.top = y + "px";
    div.style.left = (x - 2) + "px";
    div.style.backgroundColor = color;
    container.appendChild(div);

    if (isFrist) {
        div.className = "timePositionChangesItem timePositionChangesAni";
    } else {
        div.className = "timePositionChangesItem";
    }

    var float = document.createElement("div");
    float.className = "__positionChangePop";


    var touchTime = 0;      // 按下的时间
    var touchstartCount = 0;
    div.addEventListener("touchstart", function (e) {
        touchTime = Date.now();
        touchstartCount++;
        var ppop = layer.querySelectorAll(".__positionChangePop");
        for (var i = 0, len = ppop.length; i < len; i++) {
            layer.removeChild(ppop[i]);
        }
    });

    div.addEventListener("touchend", function () {
        console.log("-------")
        float.style.left = (x - 60) + "px";
        float.style.top = (y + 30) + "px";

        var htmlLeft = "<div><img src='" + imgUrl + "' ><label>" + info.type + "</label></div>";
        var htmlRgith = "<div><span>" + info.time + "</span><span style='color:" + color + "'>" + info.change + "</span></div>";

        float.innerHTML = htmlLeft + htmlRgith;

        ui.appendChild(float);
    });


    // 双击
    div.addEventListener("touchend", function () {
        var now = Date.now();
        if (touchstartCount == 2 && now - touchTime < 200) {
            var positionChanges = _this.option.data.positionChanges || [];     // 异动数据
            var idx = this.getAttribute("data-index");
            var data = positionChanges[idx];
            if (data) {
                console.log("双击")
                _this.options.onClickChanges(data);
            }
        }

        setTimeout(function(){
            touchTime = 0;
            touchstartCount = 0;
        }, 300);
    });

}


module.exports = drawPositionChange;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/drawPositionChangeForIpad.js
// module id = 297
// module chunks = 0
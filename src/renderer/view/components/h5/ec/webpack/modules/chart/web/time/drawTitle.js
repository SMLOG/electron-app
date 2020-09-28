
/**
 * 绘制标题，
 * @param {*} chartObj ： chart对象
 * @param {*} item ： 某一笔数据
 */
function drawTitle(chartObj, item) {
    var ops = chartObj.options;

    var data = chartObj.data
    var info = data.info;

    var td = data.data || [];
    var lastData = td[td.length - 1];
    lastData = item ? item : lastData;
    // console.log(lastData);

    var padding = ops.padding;
    var font = ops.font;
    var area = ops.grid.time;
    var draww = ops.areaTime.draww;

    this.cc = chartObj.layer.layerDataC;
    this.padding = padding;
    this.area = area;
    this.draww = draww;
    this.info = info;
    this.data = lastData;
    this.show = ops.show;
    this.color = ops.color;

    this.x = padding.left + 4;
    this.y = padding.top + area.mt - font.size;


    // if (lastData) {
        this.start();
    // }
}


drawTitle.prototype.start = function () {
    this.cls();
    this.name();
    this.code();

    if (this.data) {
        this.datetime();
        this.prise();
        this.change();
        this.trading();
    }
}   

// 清除
drawTitle.prototype.cls = function () {
    this.cc.clearRect(this.padding.left, -2, (this.draww + this.padding.right), (this.padding.top + this.area.mt - 1));
}

// 名称
drawTitle.prototype.name = function () {
    if (this.show.name) {
        var txt = this.info.name;
        var txtw = this.cc.measureText(txt).width + 2;
        this.cc.fillStyle = this.color.text;
        this.cc.fillText(txt, this.x, this.y);
        this.x += txtw;
    }
}

// 代码
drawTitle.prototype.code = function () {
    if (this.show.code) {
        var txt = "[" + this.info.code + "]";
        var txtw = this.cc.measureText(txt).width + 8;
        this.cc.fillStyle = this.color.text;
        this.cc.fillText(txt, this.x, this.y);
        this.x += txtw;
    }
}

// 时间
drawTitle.prototype.datetime = function () {
    if (this.show.time) {
        var txt;
        try {
            txt = this.data[0];
        } catch (error) {
            txt = "";
        }
        var txtw = this.cc.measureText(txt).width + 8;
        this.cc.fillStyle = this.color.text;
        this.cc.fillText(txt, this.x, this.y);
        this.x += txtw;
    }
}

// 价格
drawTitle.prototype.prise = function () {
    if (this.show.price) {
        var txt = "价格:";
        this.cc.fillStyle = this.color.text;
        this.cc.fillText(txt, this.x, this.y);
        var txtw = this.cc.measureText(txt).width + 2;
        this.x += txtw;

        var data6 = this.data[6];   // 涨跌幅，用这个数据判断红绿色
        txt = this.data[1];
        if (data6 / 1 > 0) {
            this.cc.fillStyle = this.color.rise;
        } else if (data6 / 1 < 0) {
            this.cc.fillStyle = this.color.fall;
        } else {
            this.cc.fillStyle = this.color.equality;
        }
        this.cc.fillText(txt+"", this.x, this.y);
        var txtw = this.cc.measureText(txt+"").width + 8;
        this.x += txtw;
    }
}

// 涨幅
drawTitle.prototype.change = function () {
    if (this.show.change) {
        var txt = "涨幅:";
        this.cc.fillStyle = this.color.text;
        this.cc.fillText(txt, this.x, this.y);
        var txtw = this.cc.measureText(txt).width + 2;
        this.x += txtw;

        txt = this.data[6];
        if (txt / 1 > 0) {
            this.cc.fillStyle = this.color.rise;
        } else if (txt / 1 < 0) {
            this.cc.fillStyle = this.color.fall;
        } else {
            this.cc.fillStyle = this.color.equality;
        }
        this.cc.fillText(txt+"%", this.x, this.y);
        var txtw = this.cc.measureText(txt+"%").width + 8;
        this.x += txtw;
    }
}

// 成交量
drawTitle.prototype.trading = function () {
    if (this.show.trading) {
        var txt = "成交量:" + this.data[2] // + "手";
        if (this.data[2] / 1 > 100000) {
            txt = "成交量:" + (this.data[2] / 10000).toFixed(2) + "万";
        }
        var txtw = this.cc.measureText(txt).width + 8;
        this.cc.fillStyle = this.color.text;
        this.cc.fillText(txt, this.x, this.y);
        this.x += txtw;
    }
}



module.exports = drawTitle;


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/drawTitle.js
// module id = 56
// module chunks = 0
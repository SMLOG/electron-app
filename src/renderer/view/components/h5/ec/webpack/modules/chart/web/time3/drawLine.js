
function drawLine(chart) {
    this.o = chart;
    this.cc = chart.layer.layerLineC;

    this.init();
    this.clear();
    
    this.line();
    this.avg();
}

drawLine.prototype.init = function(){
    var chart = this.o;
    var ops = chart.options;

    this.data = chart.data.data;
    var info = chart.data.info;
    
    this.padding = ops.padding;
    var area = ops.areaTime;
    this.color = ops.color;
    this.timebox = ops.timebox;

    var cap = (1 - this.timebox.cap) / 2;
    
    this.base = this.padding.top + ops.grid.time.mt + ops.grid.time.top + area.height * cap;

    this.yAxisMax = info.yAxisMax;
    var yAxisMin = info.yAxisMin;
    this.diff = this.yAxisMax - yAxisMin;
    this.drawh = area.height * this.timebox.cap;
    this.draww = area.draww;
    this.total = info.total;
    this.unitw = this.draww / this.total;
    this.lastx = 0;
}


drawLine.prototype.clear = function () {
    var ops = this.o.options;
    var area = ops.areaTime;
    this.cc.clearRect(0, 0, ops.width, area.starty + area.height + 1);
}

// 画线
drawLine.prototype.line = function () {
    // 渐变填充色
    var fillColor = this.color.fill;
    var grad = this.cc.createLinearGradient(0, 0, 0, this.drawh);
    for (var i = 0, len = fillColor.length; i < len; i++) {
        grad.addColorStop(i / (len - 1), fillColor[i]);
    }
    this.cc.strokeStyle = this.color.line;
    this.cc.fillStyle = grad;

    var cap = this.timebox.cap;

    this.cc.beginPath();

    var data = this.data || [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var h = (this.yAxisMax - item[1]) / this.diff * this.drawh;
        var x = this.padding.left + (i / (this.total) * this.draww) + this.unitw / 2;
        var y = this.base + h;
        if (i == 0) {
            this.cc.moveTo(x, y);
        } else {
            this.cc.lineTo(x, y);
        }
        this.lastx = x;
    }
    
    this.cc.stroke();

    this.cc.lineTo(this.lastx, (this.base + this.drawh));
    this.cc.lineTo(this.padding.left, (this.base + this.drawh));
    
    this.cc.fill();
}

// 均线
drawLine.prototype.avg = function () {
    var cap = this.timebox.cap;
    this.cc.strokeStyle = this.color.avg;
    this.cc.beginPath();
    var isfrist = true;
    for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];
        var h = (this.yAxisMax - item[3]) / this.diff * this.drawh * cap;
        var x = this.padding.left + (i / (this.total-1) * this.draww);
        var y = this.base + (this.drawh * (1 - cap) / 2) + h;
        if (item[3] > 0) {
            if (isfrist) {
                isfrist = false;
                this.cc.moveTo(x, y);
            } else {
                this.cc.lineTo(x, y);
            }
        } else {
            isfrist = true;
        }
        
    }
    this.cc.stroke();
}


module.exports = drawLine;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/drawLine.js
// module id = 315
// module chunks = 0
module.exports = function(){

    var cc = this.layer.layerTextC;
    var ops = this.options;
    var pad = ops.padding;
    var axisMax = ops.axisMax;
    var grid = ops.grid;
    var font = ops.font;
    var color = ops.color;

    var data = this.data;

    cc.clearRect(0,0, ops.width, ops.height);
    

    cc.fillStyle = color.text;
    var textX = pad.left + 2;
    var textY = pad.top + font.size;
    cc.fillText(data.title, textX, textY);
    textX += cc.measureText(data.title).width;
    textX += 8;

    var arr = data.yaxis.data;
    var last = arr[arr.length - 1] + "";

    if (last / 1 > 0) {
        cc.fillStyle = color.rise;
    } else if (last / 1 < 0) {
        cc.fillStyle = color.fall;
    } else {
        cc.fillStyle = color.text;
    }

    if (last === "undefined") {
        last = "-";
    }
    cc.fillText(last, textX, textY);
    textX += cc.measureText(last).width;
    textX += 8;

    cc.fillStyle = color.text;
    cc.fillText(data.subfix, textX, textY);
    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/fundmini/drawTitle.js
// module id = 117
// module chunks = 0
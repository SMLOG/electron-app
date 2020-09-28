module.exports = function(){
    
    var cc = this.ctxs.layerGridC;
    
    var ops = this.options;
    var info = this.info;
    
    var color = ops.color;
    
    
    var sx = info.sx;
    var sy = info.sy;
    var ex = info.ex;
    var ey = info.ey;
    
    
    var w = ex - sx;
    var split = info.split;
    var unitw = w / (split.length - 1);
    
    cc.clearRect(0,0,ops.width, ops.height);

    cc.strokeStyle = color.dashedColor;
    for(var i = 0, len = split.length ; i < len ; i++){
        var x = sx + unitw * i;
        cc.dashed(x, sy, x, ey);

        cc.fillStyle = color.text;
        var txtw = cc.measureText(split[i]).width;
        cc.fillText(split[i], x - txtw / 2, ey + 12)
    }


    cc.strokeStyle = color.boxBorder;

    cc.EMStroke(sx, sy, ex, ey);

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barHorPile/drawGrid.js
// module id = 470
// module chunks = 0
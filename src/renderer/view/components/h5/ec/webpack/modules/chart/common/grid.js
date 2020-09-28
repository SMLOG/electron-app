var drawLine = require("./drawLine");


module.exports = {
    
    /**
     * 标准网格
     */
    criterion: function(context, box, color, dashed){
        // color, dashed : {solid: dashed}

        var cc = context;       // content
        var sx = box.sx,        // 起点
            sy = box.sy,
            ex = box.ex,        // 终点
            ey = box.ey,
            spx = box.spx,      // 分割数量
            spy = box.spy;

        var uw = (ex - sx) / spx;
        var uh = (ey - sy) / spy;

        cc.strokeStyle = color.dashedColor;
        for(var i = 1, len = spx ; i < len ; i++){
            var x = sx + (uw * i);
            drawLine.dashed(cc, x, sy, x, ey, dashed.solid, dashed.dashed);
        }
          
        for(var i = 1, len = spy ; i < len ; i++){
            var y = sy + (uh * i);
            drawLine.dashed(cc, sx, y, ex, y, dashed.solid, dashed.dashed);
        }
        
        cc.strokeStyle = color.boxBorder;
        cc.EMLine(sx, sy, ex, ey);


    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/grid.js
// module id = 65
// module chunks = 0
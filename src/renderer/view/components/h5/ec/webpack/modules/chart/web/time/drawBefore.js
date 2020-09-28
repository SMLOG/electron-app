
/**
 * 盘前灰色区域
 */
module.exports = function(){

    if ((this.option.type == "r" || this.option.type == "R") && (this.option.iscr == "true" || this.option.iscr == true)) {
        var cc = this.layer.layerGridC;
        var show = this.options.show;

        var ops = this.options;
        // if (!this.data) {
        //     return false;
        // }
        var info = this.data.info;
        var areaTime = ops.areaTime;
        var areaTrading = ops.areaTrading;
        var areaIndicator = ops.areaIndicator;
        var color = ops.color;

        var bwidth = areaTime.draww * (info.iscrCount / info.total);

        cc.fillStyle = color.beforeColor;
        cc.strokeStyle = "rgba(0,0,0,0)";
        cc.EMRect(areaTime.startx, areaTime.starty, areaTime.startx + bwidth, areaTime.starty + areaTime.height);

        if (show.tradingArea) {
            cc.EMRect(areaTrading.startx, areaTrading.starty, areaTrading.startx + bwidth, areaTrading.starty + areaTrading.height);
        }

        if (show.indicatorArea) {
            cc.EMRect(areaIndicator.startx, areaIndicator.starty, areaIndicator.startx + bwidth, areaIndicator.starty + areaIndicator.height);
        }

    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/drawBefore.js
// module id = 268
// module chunks = 0
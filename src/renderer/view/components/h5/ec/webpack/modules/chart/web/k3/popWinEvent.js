module.exports = function (popwin) {
    var _this = this;
    var ops = this.options;
    var layerui = this.layer.layerUI;

    var width = ops.width;
    var height = ops.height;

    var isdown = false;

    var sx, sy, left, top;
    var maxl;
    var maxt;
    popwin.addEventListener("mousedown", function (e) {
        isdown = true;
        sx = e.clientX;
        sy = e.clientY;
        left = parseInt(popwin.style.left || 0);
        top = parseInt(popwin.style.top || 30);

        var pbcr = popwin.getBoundingClientRect();
        maxl = width - pbcr.width;
        maxt = height - pbcr.height;
    });


    document.addEventListener("mousemove", function (e) {
        if (isdown) {
            _this.isMoveFrist = true;       // 悬浮窗被拖动过
            var bcr = layerui.getBoundingClientRect();
            
            var x = e.clientX ;
            var y = e.clientY ;
            
            var templeft = left + (x - sx);
            var temptop = top + (y - sy);
            
            templeft = templeft < 0 ? 0 : templeft;
            templeft = templeft > maxl ? maxl : templeft;
            temptop = temptop < 0 ? 0 : temptop;
            temptop = temptop > maxt ? maxt : temptop;
            
            console.log(maxl, maxt);

            popwin.style.left = templeft + "px";
            popwin.style.top = temptop + "px";
        }
    });

    document.addEventListener("mouseup", function(){
        isdown = false;
    });

    layerui.addEventListener("mouseleave", function(){
        isdown = false;
    });

    popwin.addEventListener("mouseup", function(){
        isdown = false;
    });


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/popWinEvent.js
// module id = 190
// module chunks = 0
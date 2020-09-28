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
    popwin.addEventListener("touchstart", function (e) {
        var te = e.changedTouches[0];
        isdown = true;
        sx = te.clientX;
        sy = te.clientY;
        left = parseInt(popwin.style.left || 0);
        top = parseInt(popwin.style.top || 30);

        var pbcr = popwin.getBoundingClientRect();
        maxl = width - pbcr.width;
        maxt = height - pbcr.height;

    });


    layerui.addEventListener("touchmove", function (e) {
        if (isdown) {
            var te = e.changedTouches[0];
            _this.isMoveFrist = true;       // 悬浮窗被拖动过
            var bcr = layerui.getBoundingClientRect();

            var x = te.clientX;
            var y = te.clientY;

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
        // e.stopPropagation();
    });

    document.addEventListener("touchend", function () {
        isdown = false;
    });

    layerui.addEventListener("touchend", function () {
        isdown = false;
    });

    popwin.addEventListener("touchend", function () {
        isdown = false;
    });


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k/popWinEventForIpad.js
// module id = 146
// module chunks = 0

module.exports = function () {
    var setting = this.options;
    
    var layerUI = this.layer.layerUI;

    var cls = setting.popWinCls;

    var popwin = document.createElement("div");
    popwin.className = "__popwin";
    if (cls) {
        popwin.className = "__popwin " + cls;
    } else {
        popwin.className = "__popwin __popwin_style";
    }
    layerUI.appendChild(popwin);

    this.layer.popwin = popwin;
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bargroup/init/initPopWin.js
// module id = 444
// module chunks = 0
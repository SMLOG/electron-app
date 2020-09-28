var setting = require("../defaultSetting");

module.exports = function () {
    var layerUI = this.layer.layerUI;

    var cls = this.options.popWinCls;

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
// ./modules/chart/web/pie/init/initPopWin.js
// module id = 401
// module chunks = 0
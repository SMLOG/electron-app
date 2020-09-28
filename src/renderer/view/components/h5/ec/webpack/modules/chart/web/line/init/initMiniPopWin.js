module.exports = function(){
    var layerUI = this.layer.layerUI;

    var popwin = document.createElement("div");
    popwin.className = "__popwin_line";
    layerUI.appendChild(popwin);
    this.layer.popWin = popwin;

}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/line/init/initMiniPopWin.js
// module id = 389
// module chunks = 0
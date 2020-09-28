module.exports = function(){
    var layerUI = this.layer.layerUI;

    var popwin = document.createElement("div");
    popwin.className = "__popwin_mini";
    layerUI.appendChild(popwin);
    this.layer.popWin = popwin;

}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/init/initMiniPopWin.js
// module id = 334
// module chunks = 0
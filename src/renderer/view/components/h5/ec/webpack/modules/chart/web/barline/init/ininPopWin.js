module.exports = function(){
    var color = this.options.color;
    var popwin = document.createElement("div");
    if (this.options.popWinCls) {
        popwin.className = "__popwin " + this.options.popWinCls;
    } else {
        popwin.className = "__popwin __default";
    }
    popwin.style.backgroundColor = color.popwinBgColor;

    var layerUI = this.layer.layerUI;
    layerUI.appendChild(popwin);
    this.layer.popWin = popwin;
}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/init/ininPopWin.js
// module id = 456
// module chunks = 0
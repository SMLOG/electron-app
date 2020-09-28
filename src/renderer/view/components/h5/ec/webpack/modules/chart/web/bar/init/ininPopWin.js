module.exports = function(){
    var color = this.options.color;
    var popwin = document.createElement("div");
    popwin.className = "__popwin_tendency";
    popwin.style.backgroundColor = color.popwinBgColor;

    var layerUI = this.layer.layerUI;
    layerUI.appendChild(popwin);
    this.layer.popWin = popwin;
}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/bar/init/ininPopWin.js
// module id = 367
// module chunks = 0
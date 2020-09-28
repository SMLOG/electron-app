module.exports = function(){
    var layerUI = this.layer.layerUI;

    var popwin = document.createElement("div");
    popwin.className = "__popwin_tendency";
    layerUI.appendChild(popwin);
    this.layer.popWin = popwin;

    // 打点层
    var points = document.createElement("div");
    points.className = "__points";
    layerUI.appendChild(points);
    this.layer.points = points;

}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency/init/ininPopWin.js
// module id = 359
// module chunks = 0
module.exports = function(){
    var layerUI = this.layer.layerUI;

    var popwin = document.createElement("div");
    popwin.className = "__positionChanges";
    popwin.style.width = "0";
    popwin.style.height = "0";
    popwin.style.overflow = "visible";
    layerUI.appendChild(popwin);
    this.layer.positionChanges = popwin;

    
}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/init/initTips.js
// module id = 307
// module chunks = 0
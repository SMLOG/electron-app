var gif = require("../../images/loading.gif");

function loading(ops){

    // ops = {
    //     width: 0,
    //     height: 1,
    //     ui: ""
    // }
    
    this.ops = ops;
    this.init();
}

loading.prototype.init = function(){

    var dom = document.createElement("div");
    dom.className = "__em_loading";
    // dom.style.display = "none";

    var img = document.createElement("img");
    img.setAttribute("src", gif);

    dom.appendChild(img);
    this.ops.ui.appendChild(dom);

    this.dom = dom;
}

loading.prototype.start = function(isCover){
    if (isCover) {
        this.dom.style.backgroundColor = this.ops.bgColor;
    } else {
        this.dom.style.backgroundColor = "";
    }
    this.dom.style.display = "block";
}

loading.prototype.stop = function(){
    this.dom.style.display = "none";
}


module.exports = loading;



//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/loadingImg.js
// module id = 11
// module chunks = 0
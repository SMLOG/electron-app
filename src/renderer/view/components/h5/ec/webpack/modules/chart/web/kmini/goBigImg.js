module.exports = function () {

    var lay = this.layer.layerHoverText;
    var cc = this.layer.layerHoverTextC;
    var ops = this.options;
    var font = ops.font;

    var bigImg = ops.bigImg;

    cc.clearRect(0, 0, ops.width, ops.height);
    var tw = cc.measureText(bigImg.text).width;

    cc.save();
    cc.font = bigImg.fontSize + "px " + font.family;
    cc.fillStyle = bigImg.color;
    cc.fillText(bigImg.text, (ops.width - tw) / 2, ops.height / 2);
    cc.restore();

    if (bigImg.stauts == "hide") {
        lay.style.display = "none";
    } else if (bigImg.stauts == "show") {
        lay.style.display = "block";
    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/goBigImg.js
// module id = 41
// module chunks = 0
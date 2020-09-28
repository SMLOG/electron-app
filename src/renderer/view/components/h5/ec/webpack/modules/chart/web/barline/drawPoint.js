
module.exports = function (cc, x, y, point, chart, key) {

    cc.fillStyle = point.color;
    cc.strokeStyle = point.color;

    cc.beginPath();
    
    if (point.img) {

        var radius = point.radius || 4;

        if (point.imgcache) {
            cc.drawImage(point.imgcache, x - radius, y - radius, radius * 2, radius * 2);
        } else {
            var img = new Image();;
            img.src = point.img;
            img.onload = function () {
                point.imgcache = img;
                cc.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
            }
        }

    } else {
        switch (point.type) {
            case "stroke":
                var radius = point.radius || 4;
                cc.arc(x, y, radius, 0, Math.PI * 2);
                cc.closePath();
                cc.stroke();
                break;

            case "blur":
                var radius = point.radius || 4;
                cc.save();
                cc.globalAlpha = 0.3;
                cc.arc(x, y, radius * 1.8, 0, Math.PI * 2);
                cc.closePath();
                cc.fill();
                cc.restore();
                cc.beginPath();
                cc.arc(x, y, radius, 0, Math.PI * 2);
                cc.closePath();
                cc.fill();
                break;

            case "none":
                break;

            default:        // 默认 fill
                var radius = point.radius || 4;
                cc.arc(x, y, radius, 0, Math.PI * 2);
                cc.closePath();
                cc.fill();
                break;
        }
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/barline/drawPoint.js
// module id = 130
// module chunks = 0
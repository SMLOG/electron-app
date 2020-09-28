var dataSplit = require("./dataSplit");


var obj = {};

// 拉长k线
obj.elongate = function (dur, bl) {
    
    if (bl == undefined) {
        bl = 0.05;
    }
    bl = bl / 1;

    // 默认左
    if (dur === undefined) {
        dur = -1;
    }

    var scale = this.options.scale;
    var fds = scale.fullDataSize;
    var tfds = scale.pillar;
    
    var step = tfds * bl;      // 单向步长

    if (bl >= 1) {
        step = bl;
    }

    var start = scale.start;
    var end = scale.end;

    var stauts = false;     // 这个拉伸是否有效
    // 左边
    if (dur == -1) {
        var temp = Math.round(start - step * 2);
        if (temp < 0) {
            temp = 0;
        }
        if (temp < start) {
            stauts = true;
            start = temp;
        }
    } else if (dur == 0) {      // 两端
        var temps = Math.round(start - step);
        var tempe = Math.round(end + step);
        if (temps < 0) {
            temps = 0;
        }
        if (tempe > fds - 1) {
            tempe = fds - 1;
        }
        if (temps < start || tempe > end) {
            stauts = true;
            start = temps;
            end = tempe;
        }
    } else if (dur == 1) {      // 右边
        var temp = Math.round(end + step * 2);
        if (temp > fds - 1) {
            temp = fds - 1;
        }
        if (temp > end) {
            stauts = true;
            end = temp;
        }
    }

    scale.start = start;
    scale.end = end;
    scale.pillar = end - start + 1;

    dataSplit.slice.call(this);
    this.slidebar.update();
    this.draw();

    return stauts;

}

// 缩短k线
obj.shorten = function (dur, bl) {
    
    if (bl == undefined) {
        bl = 0.05;
    }
    bl = bl / 1;
    
    // 默认左
    if (dur === undefined) {
        dur = -1;
    }

    var scale = this.options.scale;
    var fds = scale.fullDataSize;
    var tfds = scale.pillar;
    
    var step = tfds * bl;      // 单向步长

    if (bl >= 1) {
        step = bl;
    }

    var start = scale.start;
    var end = scale.end;
    var min = scale.min;

    var stauts = false;     // 这个拉伸是否有效

    // 如果是最小间距，则不进行缩放
    if (start != end - min) {
        // 左边
        if (dur == -1) {
            var temp = Math.round(start + step * 2);
            if (temp + min > end) {
                start = end - min;
            } else {
                start = temp;
            }
            stauts = true;
        } else if (dur == 0) {      // 两端
            var temps = Math.round(start + step);
            var tempe = Math.round(end - step);
            if (temps >= tempe - min) {
                var mid = start + (end - start) / 2;
                start = Math.round(mid - min / 2);
                end = Math.round( mid + min / 2);
            } else {
                start = temps;
                end = tempe;
            }
            stauts = true;
        } else if (dur == 1) {      // 右边
            var temp = Math.round(end - step * 2);
            if (start > temp - min) {
                end = start + min;
            } else {
                end = temp;
            }
            stauts = true;
        }
    }

    scale.start = start;
    scale.end = end;
    scale.pillar = end - start + 1;

    dataSplit.slice.call(this);
    this.slidebar.update();
    this.draw();

    return stauts;
}

module.exports = obj;




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/extensionAPI.js
// module id = 204
// module chunks = 0
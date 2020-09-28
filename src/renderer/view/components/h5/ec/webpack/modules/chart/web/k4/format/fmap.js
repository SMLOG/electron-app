var drawminimap = require("../draw/drawminimap");

module.exports = function (data) {
    var show = this.options.show;

    var maps = data.data.klines;

    if (maps.length > 0) {
        var years = [];
        var line = maps[0].split(",");
        var year = (line[0] + "").substr(0, 4);
        var max;
        var min;
        for (var i = 0, len = maps.length; i < len; i++) {
            var li = maps[i].split(",")
            var y = (li[0] + "").substr(0, 4);
            var c = li[1] / 1;
            max = max > c ? max : c;
            min = min < c ? min : c;
            if (year != y) {
                years.push({
                    index: i,
                    txt: year
                });
                year = y;
            }
        }



        this.minimap = {
            maps: maps,
            years: years,
            max: max,
            min: min
        };

        if (show.minimap) {
            drawminimap.call(this);
        }

        var total = this.sdata.kinfo.total;
        var scale = this.options.scale;
        var end = total;
        var start = end - scale.pillar;
        scale.end = end;
        scale.start = start;
    }



};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/format/fmap.js
// module id = 223
// module chunks = 0
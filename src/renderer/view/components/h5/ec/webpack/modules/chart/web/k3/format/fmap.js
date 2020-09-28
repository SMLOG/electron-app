var drawminimap = require("../draw/drawminimap");

module.exports = function (data) {
    var show = this.options.show;

    var maps = data.items;

    var years = [];
    var year = (maps[0][0] + "").substr(0, 4);
    var max;
    for (var i = 0, len = maps.length; i < len; i++) {
        var y = (maps[i][0] + "").substr(0, 4);
        var c = maps[i][1];
        max = max > c ? max : c;
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
        max: max
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

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/format/fmap.js
// module id = 195
// module chunks = 0
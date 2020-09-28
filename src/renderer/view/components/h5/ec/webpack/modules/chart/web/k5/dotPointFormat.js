module.exports = function(){


    var sdata = this.sdata;
    var kdata = (sdata.k || "").data;
    var dot = sdata.dot;

    // console.log(sdata);
    
    if (kdata) {
        var ticks = [];

        for(var i = 0, len = kdata.length ; i < len ; i++){
            var ar = kdata[i].split(",");
            ticks.push({
                data: ar[0],
                time: new Date(ar[0]).getTime()
            });
        }
        ticks.push({
            data: "2100-01-01",
            time: new Date("2100-01-01").getTime()
        });
        

        for (var key in dot) {
            var group = dot[key];
            var points = dot[key].points;
            var newpoi = {};

            for(var i = 0, len = points.length ; i < len ; i++){
                var p = points[i];

                var kt = new Date(p.date).getTime();
                for(var j = 0, len2 = ticks.length - 1; j < len2 ; j++){
                    var td = ticks[j];
                    var tn = ticks[j+1];
                    if (kt > td.time && kt <= tn.time) {
                        var temp = newpoi[tn.data] || [];
                        if (group.formatter) {
                            p.title = group.formatter(p);
                            // p = group.formater(p);
                        }
                        temp.push(p);
                        newpoi[tn.data] = temp;
                    }
                }
            }

            dot[key].newpoi = newpoi;
            
        }

        // console.log(dot);
        
    } 

    
    
    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k5/dotPointFormat.js
// module id = 248
// module chunks = 0
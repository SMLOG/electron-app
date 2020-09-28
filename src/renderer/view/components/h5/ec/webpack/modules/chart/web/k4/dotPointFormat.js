module.exports = function(){


    var sdata = this.sdata;
    var fdata = this.fdata;
    var kdata = sdata.kdata;
    var fkdata = fdata.fk.fkdata;
    var dot = sdata.dot;

    // console.log(sdata);
    
    if (kdata) {
        var ticks = [];

        for(var i = 0, len = fkdata.length ; i < len ; i++){
            var ar = fkdata[i];
            ticks.push({
                data: ar.times,
                time: new Date(ar.times).getTime()
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
// ./modules/chart/web/k4/dotPointFormat.js
// module id = 104
// module chunks = 0
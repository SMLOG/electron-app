module.exports = function(source){

    if (source.rc === 0 && source.data) {
        var data = source.data;
        
        var trends = source.data.trends;

        var ndata = [];
        var kdata = [];
        var close = undefined;
        for(var i = 0, len = trends.length ; i < len ; i++){
            var ar = trends[i].split(",");
            close = ar[2];
            var temp = [ar[0], ar[2], ar[5], ar[7], 0];
            var temp2 = [ar[0], ar[1], ar[2], ar[3], ar[4], ar[5], ar[6]];
            ndata.push(temp.join(","));
            kdata.push(temp2.join(","));
        }


        var zuoshou = data.prePrice;        // 这个是中线

        var pricedigitStr = "0.";
        while (data.decimal--) {
            pricedigitStr += "0";
        }
        
        
        // var decimal = data.decimal;
        var info = {
            time: data.time,
            ticks: data.beticks,
            total: data.trendsTotal,
            jys: data.type,
            mk: data.market,
            yc: zuoshou,
            pricedigit: pricedigitStr,
            c: close
        }

        var time = {
            name: data.name,
            code: data.code,
            info: info,
            data: ndata,
        }
        
        return time;
    } else {
        return false;
    }
    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/interfaceFormat.js
// module id = 349
// module chunks = 0
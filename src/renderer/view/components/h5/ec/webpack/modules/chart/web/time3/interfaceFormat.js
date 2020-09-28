module.exports = function(source){

    if (source.rc === 0 && source.data) {
        var data = source.data;
        
        var trends = source.data.trends;

        var ndata = [];
        var kdata = [];
        for(var i = 0, len = trends.length ; i < len ; i++){
            var ar = trends[i].split(",");
            var temp = [ar[0], ar[2], ar[5], ar[7], 0];
            var temp2 = [ar[0], ar[1], ar[2], ar[3], ar[4], ar[5], ar[6]];
            ndata.push(temp.join(","));
            kdata.push(temp2.join(","));
        }


        var zuoshou = data.prePrice;        // 这个是中线
        
        // var decimal = data.decimal;
        var info = {
            time: data.time,
            ticks: data.beticks,
            total: data.trendsTotal,
            jys: data.type,
            mk: data.market,
            yc: zuoshou,
            pricedigit: data.decimal
        }
        var info2 = {
            time: data.time,
            ticks: data.beticks,
            total: kdata.length,
            jys: data.type,
            mk: data.market,
            yc: zuoshou,
            pricedigit: data.decimal
        }


        var time = {
            name: data.name,
            code: data.code,
            info: info,
            data: ndata,
        }

        var k = {
            name: data.name,
            code: data.code,
            info: info2,
            data: kdata,
        }
        
        return {
            time: time,
            k: k
        };
    } else {
        return false;
    }
    

    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/interfaceFormat.js
// module id = 328
// module chunks = 0
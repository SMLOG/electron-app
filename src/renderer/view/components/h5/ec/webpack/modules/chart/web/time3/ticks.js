/**
 * 用于解析分时图 各个休盘线的位置
 *
 * @param {*} tick
 */
module.exports = function(ticks){

    var arr = ticks.split("|");

    var beCount = (arr[1] - arr[0]) / 60;       // 盘前的笔数 

    var tick  = arr.slice(3);

    return {
        beCount: beCount,
        tick: tick
    }
    
    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/ticks.js
// module id = 311
// module chunks = 0
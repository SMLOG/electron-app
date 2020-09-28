var tools = require("../common/tools");


// 格式化打点时间


// 目前仅对a股 分时图

module.exports = function (chart, dots) {
    console.log(chart);

    var info = chart.option.data.time.info;
    var ticks = info.ticks.split("|").slice(3);
    // var baseTime = info.time.substr(0, 10) + " 00:00";
    // console.log(info);
    console.log(ticks);

    // begin： 盘中段的开始时间
    // end： 盘中段的结束时间
    // prev： 上一个时间段
    // next： 下一个时间段
    // day: 表示是否夸天（0：表示不跨天；1：表示跨天到下一天，-1表示跨天到上一天）
    var ftick = [];

    ftick.push({
        begin: 0,
        end: ticks[0] / 1 * 1000,
        next: ticks[0] / 1 * 1000,
        day: 0
    })

    for (var i = 1, len = ticks.length - 1; i < len; i++) {
        var temp = {
            begin: ticks[i++] / 1 * 1000,
            end: ticks[i] / 1 * 1000 + 60 * 1000,
            next: ticks[i] / 1 * 1000 + 60 * 1000,
            day: 0
        }
        ftick.push(temp)
    }

    ftick.push({
        begin: ticks[ticks.length - 1] * 1000,
        end: 99990000,
        next: ticks[0] / 1 * 1000,
        day: 1
    })

    console.log(ftick);




    for (var name in dots) {
        var o = dots[name];
        var points = o.points;
        var newPoint = {};

        for (var time in points) {
            var arr = points[time];
            var baseTime = new Date(time.substr(0, 10) + " 00:00").getTime();
            var ttime = new Date(time).getTime();

            for (var i = 0, len = ftick.length; i < len; i++) {
                var tick = ftick[i];

                // 不在盘中的时间
                if (ttime >= (baseTime + tick.begin) && ttime < (baseTime + tick.end)) {

                    for (var j = 0, len2 = arr.length; j < len2; j++) {
                        var t = baseTime + (24 * 60 * 60 * 1000) * tick.day + tick.next;
                        // arr[j].time = tools.dateFormat("yyyy-MM-dd hh:mm");
                        arr[j].time = time;
                    }
                    var t = baseTime + (24 * 60 * 60 * 1000) * tick.day + tick.next;
                    var newKey = tools.dateFormat("yyyy-MM-dd hh:mm", new Date(t));

                    var temp = newPoint[newKey] || [];
                    temp = temp.concat(arr);
                    newPoint[newKey] = temp;
                }
            }



            // if (ttime > t1 && ttime <= t2) {
            //     var arr = points[time];
            //     for (var i = 0, len = arr.length; i < len; i++) {
            //         arr[i].time = time;
            //     }

            //     var temp = points[time.substr(0, 10) + "13:01"] || [];
            //     temp = temp.concat(points[time]);
            //     points[time.substr(0, 10) + " 13:01"] = temp;
            // }
        }

        for (var key in newPoint) {
            points[key] = newPoint[key]
        }
    }


    console.log(dots);


    // for (var name in dots) {
    //     var o = dots[name];
    //     var points = o.points;

    //     for (var time in points) {
    //         var t1 = new Date(time.substr(0, 10) + " 11:30").getTime();
    //         var t2 = new Date(time.substr(0, 10) + " 13:00").getTime();
    //         var ttime = new Date(time).getTime();

    //         if (ttime > t1 && ttime <= t2) {
    //             var arr = points[time];
    //             for (var i = 0, len = arr.length; i < len; i++) {
    //                 arr[i].time = time;
    //             }

    //             var temp = points[time.substr(0, 10) + "13:01"] || [];
    //             temp = temp.concat(points[time]);
    //             points[time.substr(0, 10) + " 13:01"] = temp;
    //         }
    //     }
    // }

    return dots;
}




//////////////////
// WEBPACK FOOTER
// ./modules/chart/common/dotFormat.js
// module id = 111
// module chunks = 0
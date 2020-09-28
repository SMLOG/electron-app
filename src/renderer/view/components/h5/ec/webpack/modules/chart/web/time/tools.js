var tools = require("chart/common/tools");

module.exports = {

    ticks: function (str) {
        var arr = str.split("|");
        arr.splice(0, 3);

        var ticks = [];
        ticks.push(tools.secondsToTime(arr[0]));
        for (var i = 1; i < arr.length - 1; i++) {
            var t1 = tools.secondsToTime(arr[i]);
            var t2 = tools.secondsToTime(arr[++i]);
            var time2 = t1 + "/" + t2;
            ticks.push(time2);
        }
        ticks.push(tools.secondsToTime(arr[arr.length - 1]));

        return ticks;
    },


    iscrCount: function (str) {
        var arr = str.split("|");
        return (arr[1] - arr[0]) / 60;
    },


    // AB股的特殊逻辑
    ticksForAB: function (sticks, iscr) {

        var ticks = [];
        var arr = sticks.split("|");

        var iscrCount = (arr[1] - arr[0]) / 60;

        var count = 0;
        if (iscr) {
            count = iscrCount;
            ticks.push({
                index: 0,
                time: "9:15"
            })
        }

        ticks.push({
            index: 0 + count,
            time: "9:30"
        });

        ticks.push({
            index: 60 + count,
            time: "10:30"
        });

        ticks.push({
            index: 120 + count,
            time: "11:30/13:00"
        });

        ticks.push({
            index: 180 + count,
            time: "14:00"
        });

        ticks.push({
            index: 240 + count,
            time: "15:00"
        });

        return ticks;
    },

    // 港股的特殊逻辑
    ticksForHK: function (sticks, iscr) {
        var ticks = [];
        var arr = sticks.split("|");

        var iscrCount = (arr[1] - arr[0]) / 60;


        var newarr = [];

        var count = 0;
        if (iscr) {
            newarr = arr.splice(4);
            count = iscrCount;
            ticks.push({
                index: 0,
                time: tools.secondsToTime(arr[0])
            })
        } else {
            newarr = arr.splice(3);
        }


        ticks.push({
            index: count + 0,
            time: tools.secondsToTime(newarr[0])
        });

        // 10:30
        ticks.push({
            index: count + (37800 - newarr[0]) / 60,
            time: tools.secondsToTime(37800)
        });

        ticks.push({
            index: count + (43200 - newarr[0]) / 60,
            time: "12:00/13:00"
        });

        // 13：00
        ticks.push({
            index: count + (52200 - newarr[0]) / 60 - 60,
            time: tools.secondsToTime(52200)
        });

        ticks.push({
            index: count + (newarr[3] - newarr[0]) / 60 - 60,
            time: tools.secondsToTime(newarr[3])
        });

        return ticks;
    },




    // 保留的小数位
    pricedigit: function (str) {
        var decimal = 2;
        if (str.indexOf(".") > -1) {
            try {
                decimal = str.split(".")[1].length;
            } catch (error) {
                decimal = 2;
            }
        }
        return decimal;
    },



    /**
     * 计算一个交易日之中一些合适的时间点
     * width: 如果分段太多， 宽度太小，则间距加大
     */
    ticksAddTime: function (str, width, total, iscr) {
        var tickseq = [];       // 时刻对象

        var skyw = 1800;

        var arr = str.split("|");

        var start = arr[1] / 1;     // 开始时间
        var last = arr[2] / 1;      // 结束时间
        var count = (arr[1] - arr[0]) / 60;

        var iscrCount = iscr ? count : 0;


        if (total / width > 1.5) {
            skyw = 3600;
        }

        // 判断开始时间是否是整点或者半点。如果不是， 则则前进到到下一个整点或者半点
        var tempStart = start;
        var mo = tempStart % skyw;
        if (mo != 0) {
            tempStart += (skyw - mo);       // 前进到下一个半点或者整点
        }


        var newarr = [];
        if (iscr) {
            tickseq.push({
                index: 0,
                time: tools.secondsToTime(arr[0])
            });
            newarr = arr.splice(4);
        } else {
            newarr = arr.splice(3);
        }





        // 第一个时刻
        tickseq.push({
            index: iscrCount,
            time: tools.secondsToTime(newarr[0])
        });



        var lastIndex = iscrCount;
        while (tempStart >= start && tempStart <= last) {
            tempStart += skyw;

            for (var i = 0; i < newarr.length; i++) {
                var b = newarr[i++] / 1;
                var a = newarr[i] / 1;
                if (tempStart >= b && tempStart <= a) {
                    var index = (tempStart - b) / 60;
                    if (tempStart >= a && tempStart != last) {
                        tickseq.push({
                            index: lastIndex + index,
                            time: tools.secondsToTime(tempStart) + "/" + tools.secondsToTime(newarr[i + 1])
                        });
                        lastIndex = lastIndex + index;
                    } else {
                        if (tempStart != b && i != 0) {
                            tickseq.push({
                                index: lastIndex + index,
                                time: tools.secondsToTime(tempStart)
                            });
                        }
                    }

                } else if (tempStart > a && tempStart - a < skyw) {
                    var index = (a - b) / 60;
                    if (tempStart > last) {
                        tickseq.push({
                            index: lastIndex + index,
                            time: tools.secondsToTime(a)
                        });
                    } else {
                        tickseq.push({
                            index: lastIndex + index,
                            time: tools.secondsToTime(a) + "/" + tools.secondsToTime(newarr[i + 1])
                        });
                    }

                    lastIndex = lastIndex + index;
                }
            }
        }

        // console.log(tickseq);
        return tickseq;
    },

    ticksAddTime2: function (str, width, total, iscr) {
        var tickseq = [];       // 时刻对象

        var ticks = str.split("|");
        var arr = str.split("|");
        var skyw = 1800;
        var iscrCount = 0;
        if (iscr) {
            iscrCount = (arr[1] - arr[0]) / 60;
        }

        var start = arr[1] / 1;     // 开始时间
        var last = arr[2] / 1;      // 结束时间
        arr.splice(0, 3);       // 去掉前三个

        // console.log(width);

        if (total / width > 1.5) {
            skyw = 3600;
        }

        // 判断开始时间是否是整点或者半点。如果不是， 则则前进到到下一个整点或者半点
        var tempStart = start;
        var mo = tempStart % skyw;
        if (mo != 0) {
            tempStart += (skyw - mo);       // 前进到下一个半点或者整点
        }

        if (iscr && iscrCount > 0) {
            tickseq.push({
                index: 0,
                time: tools.secondsToTime(ticks[0])
            });
        }

        // 第一个时刻
        tickseq.push({
            index: iscrCount,
            time: tools.secondsToTime(arr[0])
        });


        var lastIndex = iscrCount;
        while (tempStart >= start && tempStart <= last) {
            tempStart += skyw;

            for (var i = 0; i < arr.length; i++) {
                var b = arr[i++] / 1;
                var a = arr[i] / 1;
                if (tempStart >= b && tempStart <= a) {
                    var index = (tempStart - b) / 60;
                    if (tempStart >= a && tempStart != last) {
                        tickseq.push({
                            index: lastIndex + index,
                            time: tools.secondsToTime(tempStart) + "/" + tools.secondsToTime(arr[i + 1])
                        });
                        lastIndex = lastIndex + index;
                    } else {
                        if (tempStart != b && i != 0) {
                            tickseq.push({
                                index: lastIndex + index,
                                time: tools.secondsToTime(tempStart)
                            });
                        }
                    }

                } else if (tempStart > a && tempStart - a < skyw) {
                    var index = (a - b) / 60;
                    if (tempStart > last) {
                        tickseq.push({
                            index: lastIndex + index,
                            time: tools.secondsToTime(a)
                        });
                    } else {
                        tickseq.push({
                            index: lastIndex + index,
                            time: tools.secondsToTime(a) + "/" + tools.secondsToTime(arr[i + 1])
                        });
                    }

                    lastIndex = lastIndex + index;
                }
            }
        }

        console.log(tickseq);
        return tickseq;
    },


    ticksAddTime3: function (str, width, iscr) {

        var tickseq = [];


        var arr = str.split("|");
        var skyw = 7200;
        var iscrCount = 0;
        if (iscr) {
            iscrCount = (arr[1] - arr[0]) / 60;
        }

        var start = arr[1] / 1;     // 开始时间
        var last = arr[2] / 1;      // 结束时间

        if (arr[1] == arr[0]) {
            iscr = false;
        }

        
        if (iscr) {
            tickseq.push({
                index: 0,
                time: tools.secondsToTime(arr[0])
            });
        }

        tickseq.push({
            index: iscrCount,
            time: tools.secondsToTime(start)
        });

        var count = 0;
        if (iscr) {
            count += iscrCount;
        }

        if (arr.length > 5) {
            for (var i = 4; i < arr.length - 1; i+=2) {
                var q = arr[i - 1];
                var t = arr[i];
                var n = arr[i + 1];

                var c = (t - q) / 60;
                count += c;

                tickseq.push({
                    index: count,
                    time: tools.secondsToTime(t) + "/" + tools.secondsToTime(n)
                });
            }
        } else {
            var t = start + skyw;
            var index = 0 ; 
            while(t < last - skyw / 2 && index++ < 20){
                tickseq.push({
                    index: (t - start) / 60,
                    time: tools.secondsToTime(t)
                });
                
                t += skyw;
            }
            
        }

        

        
        

        tickseq.push({
            index: count + (arr[arr.length - 1] - arr[arr.length - 2]) / 60,
            time: tools.secondsToTime(last)
        });

        return tickseq;
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time/tools.js
// module id = 110
// module chunks = 0
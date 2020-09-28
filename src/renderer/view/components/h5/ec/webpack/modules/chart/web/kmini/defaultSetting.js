module.exports = {

    dpr: 1,

    font: {
        size: 12,
        family: "Arial"
    },

    type: "K",

    padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    },

    textHeight: {
        head: 24,
        foot: 18
    },

    minPillar: 10,  // 柱子的最小数量

    bigImg: {
        // show: true,
        stauts: "auto",         // hide show auto
        text: "点击查看大图",
        color: "#aaaaaa",
        fontSize: 16
    },

    show: {
        title: true
    },

    popwinItem:{
        open: true,
        high: true,
        low:  true,
        close: true,
        change: true,
    },

    color: {
        background: "#ffffff",
        rise: "red",        // 涨
        fall: "green",      // 跌
        equality: "#333",        // 最高和最低相等
        border: "#bbd4e8",     // 边线颜色
        dashed: "#ccc",     // 虚线颜色
        text: "#333",           // 文字颜色
        colorsMA: ["#F5D33B", "#FF6A26"],     // MA 的颜色
    },

    // 十字线
    cross: {
        solid: 2,       // 实线长度
        dashed: 4,      // 虚线长度
        color: "#666666",
        dot: {
            radius: 6,
            color: "#41A0FF",
            opacity: 0.3,
            count: 3
        }
    },

    // 绘制虚线
    dashedLine: {
        solid: 4,       // 实线长度
        dashed: 5      // 虚线长度,
    },


    onError: function (err) {
        // console.log(err)
    },
    onComplete: function () {
        // console.log("完成")
    },
    onMove: function (msg) {
        // console.log(msg);
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/defaultSetting.js
// module id = 332
// module chunks = 0
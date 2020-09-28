module.exports = {

    dpr: 1,

    font: {
        size: 12,
        family: "Arial"
    },

    timeline: [],

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

    show: {
        title: true
    },

    bigImg: {
        // show: true,
        stauts: "auto", 
        text: "点击查看大图",
        color: "#aaaaaa",
        fontSize: 16
    },

    color: {
        background: "#ffffff",
        rise: "red",        // 涨
        fall: "green",      // 跌
        fill: ["rgba(97,187,252, 0.8)", "rgba(97,187,252, 0)"],   // 填充色
        line: "#53A5FF",        // 折线颜色
        border: "#bbd4e8",     // 边线颜色
        dashed: "#ccc",     // 虚线颜色
        text: "#333",           // 文字颜色
        colorsMA: ["#F5D33B"],     // 均线的颜色
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
// ./modules/chart/web/timemini/defaultSetting.js
// module id = 342
// module chunks = 0
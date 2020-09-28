module.exports = {

    dpr: 1,

    font: {
        size: 12,
        family: "Arial"
    },

    padding: {
        top: 16,
        bottom: 24,
        left: 60,
        right: 10
    },

    color: {
        background: "#ffffff",
        border: "#bfbfbf",     // 边线颜色
        dashed: "#ccc",     // 虚线颜色
        fill: ["rgba(97,187,252, 0.8)", "rgba(97,187,252, 0)"],       // 填充色
        line: "#53A5FF",        // 折线颜色
        text: "#333",           // 文字颜色
    },

    circle: {
        color: "#EA5404",       // 默认颜色
        radius: 6               // 圆的半径
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
    }


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/tendency/defaultSetting.js
// module id = 357
// module chunks = 0
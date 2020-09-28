module.exports = {

    dpr: 1,

    font: {
        size: 12,
        family: "Arial"
    },

    padding: {
        top: 15,
        bottom: 30,
        left: 15,
        right: 15
    },

    // 分割的网格数量
    split: {
        x: 1,
        y: 6
    },

    popClass: "",

    color: {
        background: "#ffffff",
        border: "#bbd4e8",     // 边线颜色
        vdashed: "#ccc",     // 纵向虚线颜色
        hdashed: "#ccc",     // 横线虚线颜色
        text: "#333",           // 文字颜色
        rise: "red",        // 涨
        fall: "green",      // 跌
    },

    borderWidth: 1,

    barWidth: 0.8,

    // 十字线
    cross: {
        solid: 2,       // 实线长度
        dashed: 3,      // 虚线长度
        color: "#666666",
        dot: {
            radius: 6,
            color: "#41A0FF",
            opacity: 0.5,
            count: 3
        }
    },

    // 绘制虚线
    dashedLine: {
        vsolid: 4,       // 实线长度
        vdashed: 5,      // 虚线长度,
        vwidth: 1,       // 线的粗细
        hsolid: 4,       
        hdashed: 5,      
        hwidth: 1,
    },
    

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kline/defaultSetting.js
// module id = 474
// module chunks = 0
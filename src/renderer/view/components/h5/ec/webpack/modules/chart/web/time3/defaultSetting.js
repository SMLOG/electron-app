module.exports = {

    dpr: 1,

    font: {
        size: 12,
        family: "Arial"
    },

    padding: {
        top: 6,
        bottom: 16,
        left: 60,
        right: 60
    },

    before: false,  // 盘前技术指标

    color: {
        background: "#fff",
        rise: "red",        // 涨
        fall: "green",      // 跌
        // equality: "red",        // 最高和最低相等
        boxBorder: "#999999",     // 边线颜色
        text: "#333",           // 文字颜色
        solidColor: "rgba(0,0,0,0)",
        dashedColor: "#ccc",     // 虚线颜色
        midLine: "#ccc",        // 中间实线颜色
        fill: ["rgba(97,187,252, 0.8)", "rgba(97,187,252, 0)"],   // 填充色
        colorsIndex: ["#a0a0a0", "#f4aa0a", "#ff1dff", "#007130"],       // 指标
        line: "#53A5FF",        // 折线颜色
        avg: "#DCAA2C",         // 均线颜色
        beforeColor: "#eeeeee",     // 盘前区域颜色
    },

    // 休盘线
    restline: {
        isshow: true,
        color: "#eee",
        solid: 3,       // 实线长度
        dashed: 0,      // 虚线长度
        skye: 60,       // 间距
    },

    timebox: {
        cap: 0.95
    },

    // 网格的近似宽度
    gridwh: {
        height: 40,
        width: 100,
    },

    // grid: {
    //     time: {
    //         top: 0,
    //         mt: 24,
    //         h: 0.72,
    //         mb: 24
    //     },
    //     trading: {
    //         top: 0.72,
    //         h: 0.28,
    //         mb: 0
    //     }
    // },

    grid: {
        time: {
            top: 0,
            mt: 24,
            h: 0.60,
            mb: 24
        },
        trading: {
            h: 0.18,
            mb: 0
        },
        indicator: {        // 技术指标
            // top: 0.72,
            h: 0.22,
            mb: 0
        }
    },

    show: {
        name: true,
        code: true,
        time: true,
        price: true,
        change: true,
        trading: true,
        tradingArea: true,       // 成交量区域
        indicatorArea: false,
        ddx: false,
        cf: false,
        cfjumptip: true
        // newTechnology: false
    },

    // 十字线
    cross: {
        solid: 2,       // 实线长度
        dashed: 4,      // 虚线长度
        color: "#666666",
        dot: {
            radius: 2,
            color: "#41A0FF",
            opacity: 1,
            count: 1
        }
    },

    tip: {
        show: true,
        background: "rgba(0,0,0,0.6)",
        color: "#ffffff",
        padding: 2,
        skew: 2,
        trading: false
    },

    dashedLine: {
        solid: 4,       // 实线长度
        dashed: 5      // 虚线长度,
    },


    titleKeys: {
        RSI: ["RSI6", "RSI12", "RSI24"],
        KDJ: ["K", "D", "J"],
        MACD: ["DIF", "DEA", "MACD"],
        WR: ["WR10", "WR6"],
        DMI: ["PDI", "MDI", "ADX", "ADXR"],
        BIAS: ["BIAS6", "BIAS12", "BIAS24"],
        OBV: ["OBV", "MAOBV"],
        CCI: ["CCI"],
        ROC: ["ROC", "MAROC"],
        DDX: ["DDX", "DDX累计"],
        ZJL: ["超大单","大单","中单","小单"]
    },


    onError: function (err) {
        // console.log(err)
    },
    onComplete: function () {
        // console.log("完成")
    },
    onMove: function (msg) {
        // console.log(msg);
    },
    onClickChanges: function (data) {
        // console.log(data);
    },
    onClick: function () {
        // console.log("vvvvvv");
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/time3/defaultSetting.js
// module id = 305
// module chunks = 0
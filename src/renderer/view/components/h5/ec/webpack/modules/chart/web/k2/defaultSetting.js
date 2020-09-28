module.exports = {

    dpr: 1,

    font: {
        size: 12,
        family: "Arial"
    },

    // 缩放
    scale: {
        pillar: 30,             // 默认柱子数量
        min: 10,                 // 最少柱子数量
        minWidth: 10            // 最小宽度， 像素表示， 需要同时满足这两个条件
    },

    lineWidth: 1,

    pillarWidth: 0.7,       // 柱子宽度比例

    padding: {
        top: 0,
        bottom: 0,
        left: 60,
        right: 65
    },

    // k线区域上下的间距
    kgap: {
        top: 18,
        bottom: 18
    },

    gridwh: {
        width: 100
    },

    yAxisType: 1,           // 横轴的类型， 1：表示月周日类型的时间； 2：表示分钟类的时间

    // 格式化横向时间轴的显示方式
    formatTimeLine: {
        ymd: 60,            // 在ymd之内显示 年月日
        ym: 450,             // 在ym之内显示 年月
        interval: 32        // 间隔
    },

    // 控制各个模块的显示隐藏
    // isShow: {
    //     name: true,
    //     CMA: true,
    //     trading: true,
    //     index: true,
    //     minimap: true,
    // },


    show: {
        name: true,
        code: false,
        CMA: true,
        trading: true,
        index: true,
        minimap: true,
        lr: false,
        lrjumptip: true,
        cf: false,
        cfjumptip: true,
        cqcx: false,        // 除权除息
        fold: false,        // 主题指标是否折叠
    },

    popWin: {
        type: "auto",  // 浮窗类型 auto | move
        cls: ""
    },

    /**
     * 划分规则：
     *      marginTop： 表示上部分的空白区域
     *      paddingTop： 表示上部分是否存在标题栏
     *      body： 表示该区域的高度，包含margin和padding
     *      marginBottom： 下部分的空白
     *      paddingBottom：（暂时没用到，以后可以扩展）
     *      top： 表示该区域距离上面的距离（不实用动态计算是为了方便取值）
     *      x: 横轴虚线网格的个数
     *      y: 纵轴虚线网格的个数
     * 参数取值：
     *      auto： 表示使用字体大小的1.6倍
     *      none: 表示没有
     *      数字： 使用固定的像素（eg:>  marginTop:20,）
     * 
     */
    split2: {
        k: {
            marginTop: "auto",
            paddingTop: "none",
            body: 0.5,
            marginBottom: "auto",
            top: 0,
            x: 0,
            y: 8
        },
        trading: {
            marginTop: "none",
            paddingTop: "auto",
            body: 0.2,
            marginBottom: "none",
            top: 0.5,
            x: 0,
            y: 3
        },
        index: {
            marginTop: "none",
            paddingTop: "auto",
            body: 0.17,
            marginBottom: "12",
            top: 0.7,
            x: 0,
            y: 2
        },
        minimap: {
            marginTop: "18",
            paddingTop: "none",
            body: 0.13,
            marginBottom: "none",
            top: 0.87,
            x: 0,
            y: 1
        }
    },


    color: {
        background: "#ffffff",
        rise: "red",        // 涨
        fall: "green",      // 跌
        fill: "#52ccfc",    // 填充颜色
        border: "#666",     // 边线颜色
        dashed: "#ccc",     // 虚线颜色
        equality: "#666",        // 最高和最低相等
        text: "#333",           // 文字颜色
        colorsMA: ["#376CFF", "#DD9900", "#FF00FF", "#008000"],     // MA 的颜色
        colorsTrading: ["#FE59FE", "#323232", "#FF00FF"],          // 成交量
        colorsIndex: ["#a0a0a0", "#f4aa0a", "#ff1dff", "#007130"],       // 指标
        minimap: {
            line: "#6EB4FF",
            fill: "#E4EFFF"
        },
        cyq: {
            up: "#5a8df8",
            avg: "#fa8d0d",
            down: "#FF0000"
        }
    },

    // 最高点 最低点的配置
    maxin: {
        show: true,
        lineWidth : 30,     // 线长
        color: "#333333",
        skewx: 0,            // x偏移   
        skewy: 3,            // y偏移
        angle: -5           // 倾斜角度
    },

    // 十字线
    cross: {
        solid: 2,       // 实线长度
        dashed: 3,      // 虚线长度
        color: "#666666",
        dot: {
            radius: 2,
            color: "#41A0FF",
            opacity: 1,
            count: 1
        }
    },

    // 绘制虚线
    dashedLine: {
        solid: 2,       // 实线长度
        dashed: 3      // 虚线长度,
    },

    // 绘制指标的各种字段
    titleKeys: {
        CMA: ["MA5", "MA10", "MA20", "MA60"],
        EXPMA: ["EXPMA12", "EXPMA50"],
        SAR: ["SAR"],
        BOLL: ["BOLLMB", "BOLLUP", "BOLLDN"],
        BBI: ["BBI"],

        RSI: ["RSI6", "RSI12", "RSI24"],
        KDJ: ["K", "D", "J"],
        MACD: ["DIF", "DEA", "MACD"],
        WR: ["WR10", "WR6"],
        DMI: ["PDI", "MDI", "ADX", "ADXR"],
        BIAS: ["BIAS6", "BIAS12", "BIAS24"],
        OBV: ["OBV", "MAOBV"],
        CCI: ["CCI"],
        ROC: ["ROC", "MAROC"],
        LRCE: ["两融差额"],
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
    onDrag: function (msg) {
        // console.log(msg)
        console.log("onDrag");
    },
    onClick: function(){
        // console.log("cvvvvvv");
    },
    onDragStart: function(msg){
        // console.log(msg)
        console.log("onDragStart");
    },
    onDragEnd: function(msg){
        // console.log(msg)
        console.log("onDragEnd-----------");
    },
    onFold: function(display, type){
        console.log(display);
    }
    


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k2/defaultSetting.js
// module id = 158
// module chunks = 0
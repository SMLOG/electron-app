
/**
 * 属性注册区, 为防止后面不知道属性是干什么用的, 提前注册默认值
 */


module.exports = function () {

    this.options;       // 默认设置+用户设置 （合并后的结果）
    this.layer;         // 各个层
    this.grid;          // 网格的划分坐标
    this.sdata = {
        k: {},      // k线接口返回的数据
    };         // 获取的原始数据
    this.fdata = {
        fk: {},     // 格式化之后的k数据
        quota: {},      // 技术指标
    };         // 格式化之后的可用数据  数据包含部分{}
    this.minimap = {};      // 缩略图
    this.tdata = {
        tk: {},
        quota: {},
    };          // 当前显示的数据（截断一部分）
    this.scale = {};        // 缩略图的位置,截断,笔数信息

    this.mmdata = {};           // 当前的最值数据 (截断部分数据的最大值，最小值)
    this.status = {};           // 当前的状态 
    this.stock = {
        code: "300059",
        mid: "0",
        fuquan: "1",
        period: "1",
        mode: "json",
        appid: "EMCharts3",
        keys: "tradeday,open,close,high,low,volume,amount",
        // end: "0",
        // count: "300"
    };            // 当前的股票状态

    this.status = {     // 指标状态
        v: "CMA",       // 垂直
        h: "RSI"        // 水平
    };

    this.getdataing = {
        year: "",      // 最后的一个年份
        segment: {},    //一小段数据
    };     // 正在请求数据相关

    // 拼写错误, 后期修正去掉 使用上面那个
    // this.stauts = {     // 指标状态
    //     v: "CMA",       // 垂直
    //     h: "RSI"        // 水平
    // };



};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/registered.js
// module id = 193
// module chunks = 0
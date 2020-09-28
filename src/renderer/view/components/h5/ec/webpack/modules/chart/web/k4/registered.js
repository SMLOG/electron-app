
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
        secid: "0.300059",
        fields1: "f1,f2,f3,f4,f5",
        fields2: "f51,f52,f53,f54,f55,f56,f57",
        klt: 101,
        fqt: 1,
        beg: "20101117",
        end: "20181218",
        ut: "fa5fd1943c7b386f172d6893dbfba10b",
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
// ./modules/chart/web/k4/registered.js
// module id = 221
// module chunks = 0
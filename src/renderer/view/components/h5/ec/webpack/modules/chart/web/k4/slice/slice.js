module.exports = function () {

    var oscale = this.options.scale;

    var fkdata = this.fdata.fk.fkdata;      // k线数据
    var quota = this.fdata.quota;       // 指标数据
    var total = fkdata.length;

    var start = oscale.start;
    var end = oscale.end;

    // 截取K线
    var data = fkdata.slice(start, end);
    this.tdata.tk.tkdata = data;

    // 截取指标
    for (var key in quota) {
        var item = quota[key];
        var section = item.slice(start, end);
        this.tdata.quota[key] = section;
    }

};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/slice/slice.js
// module id = 211
// module chunks = 0
// 查找 当前指标和K线上的最值

module.exports = function(){


    var tdata = this.tdata;
    var status = this.status;

    var qmax = tdata.quota[status.v + "Max"];
    var qmin = tdata.quota[status.v + "Min"];
    
    var tmax = tdata.tk.tkMax;
    var tmin = tdata.tk.tkMin;

    var allMax = qmax > tmax ? qmax : tmax;
    var allMin = qmin < tmin ? qmin : tmin;

    tdata.allMax = allMax;
    tdata.allMin = allMin;
    
};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/slice/kAxisMax.js
// module id = 51
// module chunks = 0
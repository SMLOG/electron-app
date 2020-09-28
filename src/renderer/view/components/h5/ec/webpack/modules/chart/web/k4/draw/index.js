var drawgridk = require("./drawgrid");
var drawk = require("./drawk");
var drawLinev = require("./drawlinev");
var drawverticalLine = require("./drawverticalLine")

var drawTitle = require("../title");
var drawBlockTrading = require("../drawBlockTrading");
var drawGrid = require("../drawGrid");
var drawIndexsH = require("../drawIndexsH");
var drawCYQ = require("../drawCYQ");
var dotPoint2 = require("../dotPoint2");
var dotPoint_ylzc = require("../dotPoint_ylzc");

var kAxisMax = require("../slice/kAxisMax");

/**
 *
 *
 * @param {Object} bls：默认所有区域都画， 可以配置部分区域画
 */
module.exports = function (bls) {
    bls = bls ? bls : {};

    var dft = {
        grid: true,     // K网格
        k: true,     // k线
        linev: true,     // 主图指标
        trading: true,     // 成交量
        lineh: true,     // 下面的指标
        title: true,     // 标题
    }

    Object.assign(dft, bls);

    var ops = this.options;

    var layerGridC = this.layer.layerGridC;     // 网格
    var layerKC = this.layer.layerKC;           // k线
    var layerIndexC = this.layer.layerIndexC;   // 指标
    var layerDataC = this.layer.layerDataC;   // 指标
    var tdata = this.tdata;
    var sdata = this.sdata;
    var splity = this.splity;
    var digits = this.sdata.kinfo.digit;
    var imgs = this.imgs;


    var color = ops.color;
    var pillarWidth = ops.pillarWidth;
    var drawRegion = ops.drawRegion;
    var padding = ops.padding;
    var kgap = ops.kgap;
    var scale = ops.scale;
    var cyq = ops.cyq;
    if (!cyq) {
        cyq = {
            width: 0,
            gap: 0
        }
    }

    var status = this.status;       // 指标状态
    var quota = tdata.quota;        // 指标数据
    var tk = tdata.tk;              // K数据

    var max = tdata.allMax;
    var min = tdata.allMin;


    var regionk = drawRegion.k;
    var sx = padding.left / 1;
    var sy = padding.top / 1 + regionk.top + regionk.mt + regionk.pt + kgap.top;
    var ex = ops.width - padding.right - cyq.width - cyq.gap;
    var ey = regionk.h - regionk.mb - regionk.pb - kgap.bottom;



    // 网格
    if (dft.grid) {
        drawgridk({
            cc: layerGridC,
            ops: ops,
            regionk: regionk,
            kgap: kgap,
            splity: splity,
            digits: digits,
            color: color,
            max: max,
            min: min,
            sx: sx,
            sy: sy,
            ex: ex,
            ey: ey,
        });
    }



    // 画K线柱
    if (dft.k) {
        drawk({
            cc: layerKC,
            layerDataC: layerDataC,
            data: tk.tkdata,
            regionk: regionk,
            ylzc: sdata.ylzc,
            imgs: imgs,
            color: color,
            pillarWidth: pillarWidth,
            scale:scale,
            max: max,
            min: min,
            sx: sx,
            sy: sy,
            ex: ex,
            ey: ey
        });
    }


    // 主图上的指标
    if (dft.linev) {
        var quota = tdata.quota;
        var status = this.status;
        drawLinev({
            cc: layerIndexC,
            data: quota[status.v],
            tkdata: tdata.tk.tkdata,
            regionk: regionk,
            status: status,
            color: color,
            ops: ops,
            max: max,
            min: min,
            sx: sx,
            sy: sy,
            ex: ex,
            ey: ey
        });
    }


    // 绘制成交量区域
    if (dft.trading) {
        new drawBlockTrading(this).draw();
    }


    if (cyq.width > 0) {
        drawCYQ.call(this);
    }
    
    //  打点
    if (sdata.dot) {
        dotPoint2.call(this);
    }


    // if (sdata.ylzc) {
    //     dotPoint_ylzc.call(this);
    // }



    // 绘制指标H
    if (dft.lineh) {
        if (ops.show.index) {
            var cc = this.layer.layerGridC;
            drawGrid.gridIndex(cc, this.options);              // 绘制网格 - 指标
            // drawGrid.verticalLine(this, 3);
            new drawIndexsH(this).draw(status.h);
            // drawTitle.titleIndex(this);     // 绘制指标H标题
        }
    }

    if (dft.title) {
        drawTitle.call(this);
    }

    // 绘制垂直的时间线
    drawverticalLine.call(this);


};




//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/draw/index.js
// module id = 100
// module chunks = 0
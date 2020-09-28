var tools = require("../../common/tools");

module.exports = {

    /**
     * k 线区域的title
     */
    titleK: function (kObj) {
        var cc = kObj.layer.layerDataC;
        var ops = kObj.options;

        var scale = ops.scale;
        var pillar = scale.pillar;
        var stauts = kObj.stauts.indexv;
        data = ops.thisData.indexs[stauts] || [];

        var region = ops.drawRegion.k;
        var padding = ops.padding;
        var color = ops.color;
        var info = kObj.data.info;
        var decimal = info.decimal;

        var base = region.top + region.mt / 2;
        var colorMA = color.colorsMA;

        var left = padding.left + 1;

        cc.clearRect(padding.left, padding.top, ops.width, region.mt);

        cc.strokeStyle = "rgba(0,0,0,0)";
        cc.fillStyle = color.text;

        // 绘制股票名称和代码
        if (kObj.options.show.name) {
            var namecode = info.name;
            var txtw = cc.measureText(namecode).width;
            cc.fillText(namecode, left, base);
            left += (txtw + 10);
        }
        if (kObj.options.show.code) {
            var namecode = "[" + info.code + "]";
            var txtw = cc.measureText(namecode).width;
            cc.fillText(namecode, left, base);
            left += (txtw + 10);
        }

        // 绘制cma指标
        if (kObj.options.show.CMA) {
            var titleKeys = ops.titleKeys[stauts] || [];
            for (var i = 0; i < titleKeys.length; i++) {
                left += drawText(titleKeys[i], i);
            }
        }


        function drawText(key, index) {
            cc.fillStyle = colorMA[index];
            var val = (((data[index + 1] / 1).toFixed(decimal)) || "-")
            if (val+"" == "NaN") {
                val = "-";
            }
            var txt = key + ": " + val;
            var tw = cc.measureText(txt).width;
            cc.fillText(txt, left, base);
            return (tw + 10);
        }

    },

    // 成交量标题
    titleTrading: function (kObj) {
        var cc = kObj.layer.layerDataC;
        var ops = kObj.options;
        var thisData = ops.thisData;

        var scale = ops.scale;
        var pillar = scale.pillar;

        var region = ops.drawRegion.trading;
        var padding = ops.padding;
        var color = ops.color;

        var data = thisData.data || [];
        var VAVERAGE = thisData.indexs.VAVERAGE || [];

        var base = region.top + region.pt / 2 + 1;
        var colorMA = color.colorsTrading;

        var left = padding.left + 10;

        cc.clearRect(padding.left, region.top, ops.drawRegion.drawSumWdith, region.pt);

        cc.strokeStyle = "rgba(0,0,0,0)";
        cc.fillStyle = color.text;

        left += drawText("VOL", data[5], 0);
        left += drawText("MA5", VAVERAGE[1], 1);
        left += drawText("MA10", VAVERAGE[2], 2);

        function drawText(key, val, index) {
            cc.fillStyle = colorMA[index];
            var txt = key + ": " + (tools.formatNumUnit(val, 2, 6) || "-");
            var tw = cc.measureText(txt).width;
            cc.fillText(txt, left, base);
            return (tw + 10);
        }
    },

    // 指标标题
    titleIndex: function (kObj) {
        var cc = kObj.layer.layerDataC;
        var ops = kObj.options;
        var thisData = kObj.tdata.quota;

        var scale = ops.scale;
        var pillar = scale.pillar;

        var region = ops.drawRegion.index;
        var padding = ops.padding;
        var color = ops.color;
        var status = kObj.status.h;

        var data = thisData[status] || [];
        data = data[data.length - 1];

        var base = region.top + region.pt / 2 + 1;
        var colorMA = color.colorsIndex;

        var left = padding.left + 10;

        var keys = ops.titleKeys[status];

        cc.clearRect(padding.left, region.top, ops.drawRegion.drawSumWdith, region.pt);

        cc.strokeStyle = "rgba(0,0,0,0)";
        cc.fillStyle = color.text;

        for (var i = 0; i < keys.length; i++) {
            var num = tools.formatNumUnit(data[i + 1], 5, 2);
            left += drawText(keys[i], num, i);
        }

        function drawText(key, val, index) {
            cc.fillStyle = colorMA[index];
            var txt = key + ": " + (val || "-");
            var tw = cc.measureText(txt).width;
            cc.fillText(txt, left, base);
            return (tw + 10);
        }
    },


}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k4/drawTitle.js
// module id = 28
// module chunks = 0
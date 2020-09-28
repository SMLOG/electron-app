module.exports = {

    // 绘制ma5 和 ma10
    ma: function () {
        var cc = this.layer.layerDataC;
        var ops = this.options;
        var pad = ops.padding;
        var font = ops.font;
        var color = ops.color;

        var baseLeft = ops.width - pad.right;
        var y = pad.top + font.size;

        var sumw = 0;
        var txt = "MA10";
        var txtw = cc.measureText(txt).width;
        sumw += txtw;
        baseLeft -= (txtw + 4);
        cc.font = font.size + "px " + font.family;
        cc.fillStyle = color.colorsMA[1];
        cc.fillText(txt, baseLeft, y);

        var txt = "MA5";
        var txtw = cc.measureText(txt).width;
        sumw += txtw;
        baseLeft -= (txtw + 8);
        cc.font = font.size + "px " + font.family;
        cc.fillStyle = color.colorsMA[0];
        cc.fillText(txt, baseLeft, y);

        this.options.maWidth = sumw + font.size;
    },


    /**
     * k 线区域的title
     */
    titleK: function (item) {
        var cc = this.layer.layerDataC;
        var ops = this.options;
        var pad = ops.padding;
        var font = ops.font;
        var color = ops.color;
        var info = this.data.info;
        var data = this.data.k;
        var last = data[data.length - 1];

        if (item) {
            last = item;
        }

        // console.log(last)
        // console.log(info);

        var baseLeft = pad.left + 4;
        var beseRight = ops.width - pad.right - ops.maWidth - font.size;
        var y = pad.top + font.size;

        cc.clearRect(0, 0, ops.width - pad.right - pad.left - (ops.maWidth || 0), pad.top + ops.textHeight.head);
        cc.font = "bold " + font.size + "px " + font.family;
        cc.fillStyle = color.text;


        var txts = [last[2], last[8], last[9] + "%"]
        
        var newName = info.name;
        var nameWidth = cc.measureText(newName).width;
        var maxWidth = ops.width - pad.right - pad.left - ops.maWidth;

        var fullText = "" + txts[0] + txts[1] + txts[2];
        var ftWidth = cc.measureText(fullText).width + (font.size * 4);

        
        if (nameWidth + ftWidth > maxWidth) {
            txts.splice(1, 1);
            fullText = "" + txts[0] + txts[2];
            ftWidth = cc.measureText(fullText).width + (font.size * 3);
        }

        if (nameWidth + ftWidth > maxWidth) {
            txts.splice(1, 1);
            fullText = "" + txts[0];
            ftWidth = cc.measureText(fullText).width + (font.size * 2);
        }

        if (nameWidth + ftWidth > maxWidth) {
            newName = maxName(maxWidth - 12 - ftWidth, info.name);
            // newName = newName.substr(0, newName.length - 3).trim();
            // newName += "...";
        }


        cc.fillText(newName, baseLeft, y);

        var right = ops.width - pad.right - ops.maWidth - font.size;

        cc.save();
        if (last[9] / 1 > 0) {
            cc.fillStyle = color.rise
        } else if (last[9] / 1 < 0) {
            cc.fillStyle = color.fall;
        } else {
            cc.fillStyle = color.equality;
        }
        for (var i = txts.length - 1; i >= 0 ; i--) {
            var t = txts[i];
            var tw = cc.measureText(t).width;
            right -= tw;
            cc.fillText(t, right, y);
            right -= font.size;
        }
        cc.restore();
        

        function maxName(maxwidth, name) {
            var nlen = name.length;
            var txt = name;
            for (var i = 0, len = nlen; i < len; i++) {
                txt = txt.substr(0, nlen - i);
                var txtw = cc.measureText(txt + "...").width;
                if (txtw < maxwidth) {
                    break;
                }
            }
            return  txt.trim() + "...";
        }

    }

}





//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/kmini/drawTitle.js
// module id = 115
// module chunks = 0
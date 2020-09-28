module.exports = {

    // 绘制 价格 涨跌
    change: function (item) {
        // console.info(111)
        // console.log(item);
        item = item ? item : [];
        var cc = this.layer.layerDataC;
        var ops = this.options;
        var pad = ops.padding;
        var font = ops.font;
        var color = ops.color;

        var yc = this.data.info.yc / 1;

        var baseLeft = ops.width - pad.right;
        var y = pad.top + font.size;

        var fullText = item[1] + "▲▼" + item[5] + item[6] + 20;

        var nw = pad.left + ops.nameWidth + 10;
        cc.clearRect(nw, 0, ops.width - nw, pad.top + ops.textHeight.head);
        cc.font = font.size + "px " + font.family;

        var txt = "";
        var txtw = 0;

        txt = text(item[6]) + "%";
        txtw = cc.measureText(txt).width;
        baseLeft -= (txtw + 4);
        cc.fillText(txt, baseLeft, y);

        if (cc.measureText(fullText).width < ops.width - pad.left - pad.right - ops.nameWidth - 30) {
            txt = text(item[5]);
            txtw = cc.measureText(txt).width;
            baseLeft -= (txtw + 10);
            cc.fillText(txt, baseLeft, y);
        }

        txt = item[1];
        if (txt / 1 > yc) {
            cc.fillStyle = color.rise
        } else if (txt / 1 < yc) {
            cc.fillStyle = color.fall
        } else {
            cc.fillStyle = color.text
        }
        txtw = cc.measureText(txt).width;
        baseLeft -= (txtw + 10);
        cc.fillText(txt, baseLeft, y);

        function text(txt) {
            if (txt / 1 > 0) {
                cc.fillStyle = color.rise
                txt = "▲" + txt;
            } else if (item[6] / 1 < 0) {
                cc.fillStyle = color.fall
                txt = "▼" + txt;
            } else {
                cc.fillStyle = color.text
            }
            return txt;
        }

    },

    // 需求： 只显示一次，不随鼠标移动而移动
    change2: function () {
        var cc = this.layer.layerDataC;
        var info = this.option.data.info;
        // console.info(666)
        // console.info(info)
        var dinfo = this.data.info;
        // console.info(555)
        // console.info(dinfo)
        var ops = this.options;
        var pad = ops.padding;
        var font = ops.font;
        var color = ops.color;

        var baseLeft = ops.width - pad.right;
        var y = pad.top + font.size;

        // bold
        cc.font = "bold " + font.size + "px " + font.family;

        var c = info.c;
        var yc = info.yc;
        if (c === undefined) {
            c = info.yc;
        }

        var baseLeft = pad.left + 4;
        var y = pad.top + font.size;


        var txtarr = [];
        
        if (c == undefined){
                txtarr.push("-");
                txtarr.push("-");
                txtarr.push("-");            
        }
        else{
            txtarr.push(c);

            if (c == 0 || c == "-" || yc == "-" || yc == 0) {
                txtarr.push("-");
                txtarr.push("-");
            } else {
                var changeMoney = (c - yc).toFixed(dinfo.decimal);
                var change = (changeMoney / yc * 100).toFixed(2);
                txtarr.push(changeMoney);
                txtarr.push(change);
            }            
        }




        var name = dinfo.name;
        var nameWidth = cc.measureText(name).width;
        var boxWidth = ops.width - pad.left - pad.right - 4;


        var left = ops.width - pad.right - 4;
        // left += font.size;

        var fullText = txtarr[0] + "▲ ▼ %" + txtarr[1] + txtarr[2];
        var fullTextWidth = cc.measureText(fullText).width + font.size * 3;


        if (nameWidth + fullTextWidth < boxWidth) {
            left += (font.size - 0);
            drawChange();
            drawChangeMoney();
            drawClose();
            fillText();
        } else {
            fullText = txtarr[0] + "▲" + txtarr[2];
            fullTextWidth = cc.measureText(fullText).width + font.size * 3;
            if (nameWidth + fullTextWidth < boxWidth) {
                left += (font.size - 0);
                drawChange();
                drawClose();
                fillText();
                console.log("11111");
            } else {
                fullText = txtarr[0];
                fullTextWidth = cc.measureText(fullText).width;

                // 如果名字很长， 则截断名字
                if (nameWidth + fullTextWidth + font.size > boxWidth) {
                    var maxNameWidth = boxWidth - fullTextWidth - font.size;
                    var newtxt = maxName(maxNameWidth, dinfo.name);
                    // newtxt = newtxt.substr(0, newtxt.length - 3).trim();
                    // newtxt += "...";

                    cc.save();
                    cc.clearRect(pad.left + 1, 0, boxWidth - 2, pad.top + ops.textHeight.head);
                    cc.fillStyle = color.text;
                    cc.fillText(newtxt, baseLeft, y);
                    cc.restore();
                } else {
                    fillText();
                }
                drawClose(1);
            }
        }


        function fillText() {
            cc.fillStyle = color.text;
            cc.fillText(name, baseLeft, y);
        }
        // 涨跌幅
        function drawChange() {
            var txt = txtarr[2];
            if (txt != "-") {
                if (txt / 1 > 0) {
                    txt = "▲" + txt;
                    cc.fillStyle = color.rise
                } else if (txt / 1 < 0) {
                    txt = "▼" + txt;
                    cc.fillStyle = color.fall
                } else {
                    cc.fillStyle = color.text
                }
                txt = txt + "%";
            }
            var txtw = cc.measureText(txt).width;
            left -= txtw;
            left -= font.size;
            cc.fillText(txt, left, y);
        }
        // 涨跌额
        function drawChangeMoney() {
            var txt = txtarr[1];
            if (txt != "-") {
                if (txt / 1 > 0) {
                    txt = "▲" + txt;
                    cc.fillStyle = color.rise
                } else if (txt / 1 < 0) {
                    txt = "▼" + txt;
                    cc.fillStyle = color.fall
                } else {
                    cc.fillStyle = color.text
                }
            }
            var txtw = cc.measureText(txt).width;
            left -= txtw;
            left -= font.size;
            cc.fillText(txt, left, y);
        }
        // 当前价
        function drawClose(isone) {
            var txt = txtarr[0];
            var txtw = cc.measureText(txt).width;
            if (txt != "-") {
                if (txt / 1 > yc / 1) {
                    cc.fillStyle = color.rise
                } else if (txt / 1 < yc / 1) {
                    cc.fillStyle = color.fall
                } else {
                    cc.fillStyle = color.text
                }
            }
            if (txt == 0) {
                cc.fillStyle = color.text
            }
            left -= txtw;
            if (!isone) {
                left -= font.size;
            }
            cc.fillText(txt, left, y);
        }

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
            return txt.trim() + "...";
        }

    },

    /**
     * k 线区域的title
     */
    title: function () {
        var cc = this.layer.layerDataC;
        var ops = this.options;
        var pad = ops.padding;
        var font = ops.font;
        var color = ops.color;
        var info = this.data.info;
        var data = this.data.time;
        var last = data[data.length - 1];

        // console.log(info);

        var baseLeft = pad.left + 4;
        var y = pad.top + font.size;

        cc.clearRect(0, 0, ops.width, pad.top + ops.textHeight.head);
        cc.font = "bold " + font.size + "px " + font.family;
        cc.fillStyle = color.text;
        cc.fillText(info.name, baseLeft, y);

        this.options.nameWidth = cc.measureText(info.name).width;
        // baseLeft += 16;

        // if (info.yc > last[1]) {
        //     cc.fillStyle = color.rise
        // } else if (info.yc < last[1]) {
        //     cc.fillStyle = color.fall;
        // }

        // cc.fillText(last[1], baseLeft, y);
    },

    // 如果有数据，则使用提供的数据绘制标题
    titleOne: function (kObj, dataItem) {
        var cc = kObj.layer.layerDataC;
        var ops = kObj.options;
        var pad = ops.padding;
        var font = ops.font;
        var color = ops.color;
        var info = kObj.data.info;

        var data = kObj.data.k;
        var last = data[data.length - 1];
        if (dataItem) {
            last = dataItem;
        }

        var baseLeft = pad.left + 4;
        var y = pad.top + font.size;
        var yw = ops.width - pad.left - pad.right - ops.maWidth - 10;   // 除去ma的宽度

        cc.clearRect(0, pad.top, yw, ops.textHeight.head);
        cc.font = "bold " + font.size + "px " + font.family;
        cc.fillStyle = color.text;
        cc.fillText(info.name, baseLeft, y);

        baseLeft += cc.measureText(info.name).width;
        baseLeft += 16;

        if (last[2] > last[10]) {
            cc.fillStyle = color.rise
        } else if (last[2] < last[10]) {
            cc.fillStyle = color.fall;
        }

        cc.fillText(last[2], baseLeft, y);
    }

}


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/timemini/drawTitle.js
// module id = 116
// module chunks = 0
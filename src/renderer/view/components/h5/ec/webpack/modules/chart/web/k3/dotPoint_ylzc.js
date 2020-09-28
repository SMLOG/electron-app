

module.exports = function () {

    var dot = this.sdata.ylzc;
    var dotspoint = this.layer.dotsPoint;
    var ops = this.options;
    var tdata = this.tdata.tk.tkdata;
    var region = ops.drawRegion.k;
    var padding = ops.padding;

    var sumWidth = ops.width;
    var drawSumWdith = ops.drawRegion.drawSumWdith;
    var width = ops.width;

    // console.log("开始打点");


    for (var name in dot) {
        var o = dot[name];
        o.width = o.width ? o.width : 10;
        o.height = o.height ? o.height : 10;

        var skew = o.skew === undefined ? 0 : o.skew;

        var baseLeft = padding.left - o.width / 2;
        var baseTop = region.top + region.mt + region.pt + skew;

        if (o.position == "bottom") {
            baseTop = region.h - region.mb - region.pb + padding.top - o.height - skew - 1;
        }

        // var group = document.createElement("div");
        var group = document.querySelector(".__emchatrs3_root_box " + ".__" + name);
        if (!group) {
            group = document.createElement("div");
        }
        group.innerHTML = "";

        group.className = "__dotgroup " + "__" + name;
        dotspoint.appendChild(group);

        var newpoi = o.newpoi;


        for (var i = 0, len = tdata.length; i < len; i++) {
            var list = newpoi[tdata[i].times];
            if (list && list.length > 0) {

                var unit = drawSumWdith / len;
                var left = unit * i + unit / 2;

                var point = document.createElement("div");
                point.className = o.className;
                point.style.width = o.width + "px";
                point.style.height = o.height + "px";
                point.style.top = (baseTop) + "px";
                point.style.left = (baseLeft + left) + "px";

                var img = document.createElement("img");
                if (o.img) {
                    img.src = o.img;
                    point.appendChild(img);
                }

                if (list.length > 1 && o.multiple) {
                    if (o.multiple.className) {
                        point.className = o.multiple.className;
                    }
                    if (o.multiple.img) {
                        img.src = o.multiple.img;
                    }
                }
                

                var pop = document.createElement("div");
                pop.className = "__pop";
                for (var n = 0, len3 = list.length > 10 ? 10 : list.length; n < len3; n++) {
                    var item = list[n];
                    if (item) {
                        var div = document.createElement("div");
                        div.style.maxWidth = width * 0.5 + "px";
                        div.innerHTML = item.title;
                        pop.appendChild(div);
                    }
                }

                point.appendChild(pop);
                group.appendChild(point);

                pop.style.display = "block";
                var bcr = pop.getBoundingClientRect();
                pop.style.top = o.height + "px";

                var sk = 0;
                // 右边溢出
                if (sumWidth - baseLeft - left < bcr.width / 2) {
                    sk = bcr.width / 2 - (sumWidth - baseLeft - left);
                }
                // 左边溢出
                if (bcr.width / 2 > baseLeft + left) {
                    sk = -(bcr.width / 2 - baseLeft - left);
                }

                pop.style.left = -(bcr.width / 2 + sk) + "px";

                pop.style.display = "none";

            }
        }
    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k3/dotPoint_ylzc.js
// module id = 189
// module chunks = 0
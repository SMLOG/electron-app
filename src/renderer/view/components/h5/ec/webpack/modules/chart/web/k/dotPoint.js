module.exports = function () {

    var dot = this.sdata.dot;
    var dotspoint = this.layer.dotsPoint;
    var ops = this.options;
    var region = ops.drawRegion.k;
    var padding = ops.padding;
    var tdata = ops.scale.data;

    // console.log("开始打点");
    

    var sumWidth = ops.width;
    var drawSumWdith = ops.drawRegion.drawSumWdith;
    var width = ops.width;

    for (var name in dot) {
        var o = dot[name];
        o.width = o.width ? o.width : 10;
        o.height = o.height ? o.height : 10;
        
        var skew = o.skew === undefined ? 2 : o.skew;
        var vinter = o.vinter === undefined ? 2 : o.vinter;

        var dur = 1;    // 表示堆叠点堆叠的方向
        var baseLeft = padding.left - o.width / 2;
        var baseTop = region.top + region.mt + region.pt + skew;

        if (o.position == "bottom") {
            baseTop = region.h - region.mb - region.pb - o.height - skew;
            dur = -1;
        }

        // var group = document.createElement("div");
        var group = document.querySelector(".__emchatrs3_root_box " + "." + name);
        if (!group) {
            group = document.createElement("div");
        }
        group.innerHTML = "";

        group.className = "__dotgroup " + name;
        dotspoint.appendChild(group);

        var points = o.points;

        for (var key in points) {
            var pointo = points[key];
            for (var i = 0, len = tdata.length; i < len; i++) {
                // 时间点存在
                if (tdata[i][0] == key) {
                    for (var j = 0, len2 = pointo.length; j < len2; j++) {
                        var pot = pointo[j];
                        var unit = drawSumWdith / len;
                        var left = unit * i + unit / 2;

                        var point = document.createElement("div");
                        point.style.width = o.width + "px";
                        point.style.height = o.height + "px";
                        point.style.top = (baseTop + (o.height + vinter) * j * dur) + "px";
                        point.style.left = (baseLeft + left) + "px";
                        var img = document.createElement("img");
                        img.src = pot.img || o.img;
                        point.appendChild(img);

                        // 创建新闻列表
                        var news = pot.list;
                        var pop = document.createElement("div");
                        pop.className = "__pop";
                        for (var n = 0, len3 = news.length; n < len3; n++) {
                            var div = document.createElement("div");
                            var span = document.createElement("span");
                            span.innerText = key;
                            var a = document.createElement("a");
                            a.innerText = news[n].title;
                            a.setAttribute("target", "_blank");
                            a.setAttribute("href", news[n].url);
                            a.style.display = "inline-block";
                            a.style.maxWidth = width * 0.5 - 70 + "px";
                            div.appendChild(span);
                            div.appendChild(a);
                            pop.appendChild(div);
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
        }

    }


};


//////////////////
// WEBPACK FOOTER
// ./modules/chart/web/k/dotPoint.js
// module id = 151
// module chunks = 0
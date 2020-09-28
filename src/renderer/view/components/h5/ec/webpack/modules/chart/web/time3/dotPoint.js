var dotformat = require("../../common/dotFormat");

module.exports = function () {

    var dot = this.option.data.dot;
    var dotspoint = this.layer.dotsPoint;
    var ops = this.options;
    var region = ops.areaTime;
    var padding = ops.padding;
    var tdata = this.data.data;
    var total = this.data.info.total;

    var sumWidth = ops.width;
    var drawSumWdith = region.draww;
    var width = ops.width;

    dot = dotformat(this, dot);

    // console.log(ops);
    // console.log(region);
    // console.log(padding);
    // console.log(tdata);

    console.log(dot);

    for (var name in dot) {
        var o = dot[name];
        o.width = o.width ? o.width : 10;
        o.height = o.height ? o.height : 10;

        var skew = o.skew === undefined ? 2 : o.skew;
        var vinter = o.vinter === undefined ? 2 : o.vinter;

        var dur = 1;    // 表示堆叠点堆叠的方向
        var baseLeft = padding.left - o.width / 2;
        var baseTop = region.starty + skew;

        if (o.position == "bottom") {
            baseTop = region.starty + region.height - o.height - skew;
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
                        var unit = drawSumWdith / total;
                        var left = unit * i + unit / 2;

                        var point = document.createElement("div");
                        point.className = pot.className || o.className;
                        point.style.width = o.width + "px";
                        point.style.height = o.height + "px";
                        point.style.top = (baseTop + (o.height + vinter) * j * dur) + "px";
                        point.style.left = (baseLeft + left) + "px";
                        var img = document.createElement("img");
                        if (pot.img || o.img) {
                            img.src = pot.img || o.img;
                            point.appendChild(img);
                        }

                        // 创建新闻列表
                        var news = pot.list;
                        var pop = document.createElement("div");
                        pop.className = "__pop";
                        for (var n = 0, len3 = news.length; n < len3; n++) {
                            // var div = document.createElement("div");
                            // var span1 = document.createElement("span");
                            // var span2 = document.createElement("span");
                            // var span3 = document.createElement("span");

                            // span1.innerText = (pot.time || key || "").substr(10);
                            // span2.innerText = news[n].type || "";
                            // span3.innerText = news[n].title;

                            // var a = document.createElement("a");
                            // a.setAttribute("target", "_blank");
                            // a.setAttribute("href", news[n].url);
                            // a.style.display = "inline-block";
                            // a.style.maxWidth = width * 0.6 - 30 + "px";

                            // a.appendChild(span1);
                            // a.appendChild(span2);
                            // a.appendChild(span3);

                            // div.appendChild(a);
                            // pop.appendChild(div);

                            var div = document.createElement("div");
                            div.style.maxWidth = width * 0.5 + "px";
                            var a = document.createElement("a");
                            a.setAttribute("target", "_blank");
                            a.setAttribute("href", news[n].url);
                            a.innerText = (key||"").substr(5) + " " + (news[n].type || "") + " " + news[n].title;
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
// ./modules/chart/web/time3/dotPoint.js
// module id = 320
// module chunks = 0
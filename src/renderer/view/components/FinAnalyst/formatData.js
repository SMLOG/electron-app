function formatNumber(value, point) {
    var temp = Number(value);
    if (!temp)
        return "--";

    if (Math.abs(temp) >= 1e12) {
        var resupt = temp / 1e12;
        point = getFormatPoint(resupt);
        return resupt.toFixed(point) + "万亿";
    }
    else if (Math.abs(temp) >= 1e8) {
        var resupt = temp / 1e8;
        point = getFormatPoint(resupt);
        return resupt.toFixed(point) + "亿";
    }
    else if (Math.abs(temp) >= 1e4) {
        var resupt = temp / 1e4;
        point = getFormatPoint(resupt);
        return resupt.toFixed(point) + "万";
    }
    return temp.toFixed(point);
}

function getFormatPoint(value) {
    value = Math.abs(value);
    var point = 2;
    if (value >= 1000)
        point = 0;
    else if (value >= 100)
        point = 1;
    else if (value >= 10)
        point = 2;
    else
        point = 3;

    return point;
}

function formatDate(value) {
    if (value.indexOf("/") > 0) {
        var ss = "";
        ss.substr
        var temp = value.split("/");
        return temp[0] + "-" + (temp[1] > 9 ? temp[1] : "0" + temp[1]) + "-" + temp[2].split(" ")[0];
    }
    else if (value.indexOf("-") > 0) {
        var ss = "";
        ss.substr
        var temp = value.split("-");
        return temp[0] + "-" + (temp[1] > 9 ? temp[1] : "0" + temp[1]) + "-" + temp[2].split(" ")[0];
    }
    else
        return "--";
}

function formatRate(value) {
    var temp = Number(value);
    if (!temp)
        return "--";

    return "<span>" + temp.toFixed(2) + "%</span>";
}

var autocount = 0;
function hideEmptyRow(tableid) {
    var table = document.getElementById(tableid);
    if (!table || table.rows.length == 0)
        return;

    for (var i = 0; i < table.rows.length; i++) {
        if (i <= 0)
            continue;

        var row = table.rows[i];

        if (row.children.length <= 1)
            continue;

        //删除空行
        var length = row.children.length;
        length = length > 9 ? 9 : length;
        var show = false;

        for (var j = 1; j < length; j++) {
            var text = row.children[j].innerText;
            if ((text || text == "") && text != "--") {
                show = true;
                break;
            }
        }
        row.hidden = !show;

        if (!row.children[0].children || row.children[0].children.length != 2)
            continue;

        //根据父级是否展示，设置展示方式
        var index = 1;
        var isHaveBro = false;
        while (i - index >= 0
            && table.rows[i - index].children.length > 0
            && table.rows[i - index].children[0].children.length > 0) {
            if (table.rows[i - index].children[0].children.length == 2) {
                if (table.rows[i - index].hidden) {
                    //兄弟节点隐藏，继续向上查找
                    index++;
                }
                else {
                    //兄弟节点显示，继续向上查找，并记录
                    index++;
                    isHaveBro = true;
                }
            }
            else {
                if (table.rows[i - index].hidden) {
                    //父级节点隐藏
                    if (index == 1) {
                        //如果只有根节点，不显示'其中'
                        row.children[0].children[0].style.display = "";
                        row.children[0].children[1].style.display = "none";
                    }
                    row.children[0].children[0].innerHTML = row.children[0].children[0].innerHTML.replace(/\s{7,9}/g, '&ensp;&ensp;&ensp;&ensp;');
                }
                else {
                    //父级节点显示，无兄弟节点显示'其中:'
                    if (!isHaveBro && index!=1 ) {
                        row.children[0].children[0].style.display = "none";
                        row.children[0].children[1].style.display = "";
                    }
                }

                break;
            }
        }
        //if (i != 0 && table.rows[i - 1].hidden) {
        //    row.children[0].children[0].style.display = "none";
        //    row.children[0].children[1].style.display = "";
        //}
    }

    //定位
    autocount++;
    if (autocount <= 3)
        AutoScroll();
}
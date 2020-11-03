var str = `                
_gb_link = "http://guba.eastmoney.com/list," + _code + ".html";
// 代码
row.cells[0].innerHTML = "<a href=\"" + _hq_link + "\">" + _code + "</a>" || "-";
// 简称
row.cells[1].innerHTML = "<a href=\"" + _sj_link + "\">" + data[1] + "</a>" || "-";
d
var fxrq = data[6] || "";
var fxrqStr = "";
if (fxrq != "") {
    fxrqStr = fxrq.substr(0, 4) + fxrq.substr(5, 2) + fxrq.substr(8, 2);
}

if (_t.options.param.mk_type.value == 1) {
    // 相关链接
    row.cells[2].innerHTML = "<a class=\"red\" href=\"/other/zf/" + _code + "-1-" + fxrqStr + "-" + data[3] + ".html\">详细</a> <a href=\"" + _sj_link + "\">数据</a> <a href=\"" + _gb_link + "\">股吧</a>";
    row.cells[2].style.width = "110px";
    // 发行方式
    var fxfs = data[2] || "-";
    fxfs = fxfs.replaceAll("&sbquo", " ");
    row.cells[3].innerHTML = fxfs;
    // 发行总数
    row.cells[4].innerHTML = data[3].format(2, 4);
    // 发行价格
    row.cells[5].innerHTML = data[4].format(2);
    // 最新价
    row.cells[6].innerHTML = "<span class=\"" + getColor(data[5]) + "\">" + data[5].format(2) + "</span>";//data[5].format(2);
    // 发行日期
    fxrq = fxrq == "" ? "-" : '<span class="txt" title="' + fxrq + '">' + fxrq.substr(5) + '</span>';
    row.cells[7].innerHTML = fxrq;
    // 增发上市日期
    var zfssrq = data[7] || "-";
    zfssrq = zfssrq == "-" ? "-" : '<span class="txt" title="' + zfssrq + '">' + zfssrq.substr(5) + '</span>';
    row.cells[8].innerHTML = zfssrq;
    // 锁定期
    row.cells[9].innerHTML = '1-3年';
} else if (_t.options.param.mk_type.value == 0) {
    var fxfs = data[2] || "-";
    fxfs = fxfs.replaceAll("&sbquo", " ");
    var fxfsIndex = fxfs.indexOf('定向增发') == -1 ? '2' : '1';
    // 相关链接
    row.cells[2].innerHTML = "<a class=\"red\" href=\"/other/zf/" + _code + "-" + fxfsIndex + "-" + fxrqStr + "-" + data[3] + ".html\">详细</a> <a href=\"" + _sj_link + "\">数据</a> <a href=\"" + _gb_link + "\">股吧</a>";
    // 增发代码
    row.cells[3].innerHTML = data[9];
    // 发行方式
    row.cells[4].innerHTML = fxfs;
    // 发行总数
    row.cells[5].innerHTML = data[3].format(2, 4);
    // 网上发行
    row.cells[6].innerHTML = data[10].format(2, 4);
    // 发行价格
    row.cells[7].innerHTML = data[4].format(2);
    // 最新价
    row.cells[8].innerHTML = "<span class=\"" + getColor(data[5]) + "\">" + data[5].format(2) + "</span>";
    // 发行日期
    fxrq = fxrq == "" ? "-" : '<span class="txt" title="' + fxrq + '">' + fxrq.substr(5) + '</span>';
    row.cells[9].innerHTML = fxrq;
    // 增发上市日期
    var zfssrq = data[7] || "-";
    zfssrq = zfssrq == "-" ? "-" : '<span class="txt" title="' + zfssrq + '">' + zfssrq.substr(5) + '</span>';
    row.cells[10].innerHTML = zfssrq;
    if (_t.options.param.mk_type.value == 0)
        row.cells[11].innerHTML = '1-3年';
    else

    scode,name,type,total_vol,price,newprice,fxdate,mkdate,-,zfcode,online,zxgbdate,zxrate,-,oneper,-,2

        // 每中一股约
        row.cells[11].innerHTML = data[14].format(2);
} else {
    // 相关链接
    row.cells[2].innerHTML = "<a class=\"red\" href=\"/other/zf/" + _code + "-2-" + fxrqStr + "-" + data[3] + ".html\">详细</a> <a href=\"" + _sj_link + "\">数据</a> <a href=\"" + _gb_link + "\">股吧</a>";
    // 增发代码
    row.cells[3].innerHTML = data[9];
    // 发行总数
    row.cells[4].innerHTML = data[3].format(2, 4);
    // 网上发行
    row.cells[5].innerHTML = data[10].format(2, 4);
    // 发行价格
    row.cells[6].innerHTML = data[4].format(2);
    // 最新价
    row.cells[7].innerHTML = "<span class=\"" + getColor(data[5]) + "\">" + data[5].format(2) + "</span>";//data[5].format(2); 
    // 发行日期
    fxrq = fxrq == "" ? "-" : '<span class="txt" title="' + fxrq + '">' + fxrq.substr(5) + '</span>';
    row.cells[8].innerHTML = fxrq;
    // 中签号公布日
    var zqhgbr = data[11] || "-";
    zqhgbr = zqhgbr == "-" ? "-" : '<span class="txt" title="' + zqhgbr + '">' + zqhgbr.substr(5) + '</span>';
    row.cells[9].innerHTML = zqhgbr;
    // 增发上市日期
    var zfssrq = data[7] || "-";
    zfssrq = zfssrq == "-" ? "-" : '<span class="txt" title="' + zfssrq + '">' + zfssrq.substr(5) + '</span>';
    row.cells[10].innerHTML = zfssrq;
    // 中签率
    row.cells[11].innerHTML = data[12].format(2, 0, "%");`;

var lines = str.split("\n");
var obj = lines
  .map((e) => e.match(/.*?data\.(.*?)[^a-z].*?\/\/(.+)/i))
  .filter((e) => e && e.length == 3)
  .reduce((m, e) => {
    m[e[1]] = e[2];
    return m;
  }, {});
console.log(JSON.stringify(obj, null, 4));

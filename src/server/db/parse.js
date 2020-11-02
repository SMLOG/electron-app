var str = `                
row.cells[3].innerHTML = '<a class="red" href="/gphg/detail/' + gpdm + "-" + new Date(data.dim_date).getTime() + '.html">详细</a>';
var star = data.sffhsp == 0 ? "*" : "";
row.cells[4].innerHTML = '<span>' + getValOrEmpty(data.newprice, 2, 1) + star + '</span>'; //最新价

row.cells[5].innerHTML = '<span>' + getValRegion(data.repurpricelower, data.repurpricecap) + '</span>'; //计划回购价格区间(元)
row.cells[6].innerHTML = '<span>' + getValRegion(data.repurnumlower, data.repurnumcap, true) + '</span>';//计划回购数量区间(股)
row.cells[7].innerHTML = '<span>' + getValRegion(data.zszxx, data.zszsx) + '</span>'; //占公告前</br>一日总股</br>本比例(%)
row.cells[8].innerHTML = '<span>' + getValRegion(data.repuramountlower, data.repuramountlimit, true) + '</span>';//计划回购金额</br>区间(元)
row.cells[9].innerHTML = '<span title="' + dateFormat(data.repurstartdate, 'yyyy-MM-dd') + '">' + dateFormat(data.repurstartdate, 'yyyy-MM-dd') + '</span>'; //回购起始时间
var process = "";
switch (data.repurprogress) {
    case "001": process = "董事会预案"; break;
    case "002": process = "股东大会通过"; break;
    case "003": process = "股东大会否决"; break;
    case "004": process = "实施中"; break;
    case "005": process = "停止实施"; break;
    case "006": process = "完成实施"; break;
    default:
}

row.cells[10].innerHTML = '<span>' + process + '</span>'; //实施进度
row.cells[11].innerHTML = '<span>' + getValRegion(data.repurpricelower1, data.repurpricecap1) + '</span>'; //已回购股</br>份价格区</br>间(元)
row.cells[12].innerHTML = '<span>' + getValRegion(data.repurnum, data.repurnum, true) + '</span>'; //已回购股</br>份数量</br>(股)
row.cells[13].innerHTML = '<span>' + getValRegion(data.repuramount, data.repuramount, true) + '</span>'; //已回购金额
row.cells[14].innerHTML = '<span title="' + dateFormat(data.upd, 'yyyy-MM-dd') + '">' + dateFormat(data.upd, 'yyyy-MM-dd') + '</span>'; //公告日期`;

var lines = str.split("\n");
var obj = lines
  .map((e) => e.match(/.*?data\.(.*?)[^a-z].*?\/\/(.+)/))
  .filter((e) => e && e.length == 3)
  .reduce((m, e) => {
    m[e[1]] = e[2];
    return m;
  }, {});
console.log(JSON.stringify(obj, null, 4));

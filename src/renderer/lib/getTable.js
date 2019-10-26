import {
  loadScripts,
  dateFormat,
  ConvertUnit,
  getDate,
  split,
  fetchEval
} from "./utils";
import { getExcludeList } from "./exclude-list";
//const dict = {1: 'YJBB', 2: 'YJKB', 3: 'YJYG',4: 'YYPL', 5: 'ZCFZB', 6: 'LRB', 7: 'XJLLB',XSJJ_NJ_PC}

export async function getTables() {
  let daystr = new Date().Format("yyyy-MM-dd");
  let tabs = [
    await getXSJJTable() /*限售解禁*/,
    await getTableGDZJC() /*增减持 */,
    await getYZYGTable(),
    getExcludeList()
  ];
  for (let item of items) {
    if (window[`tables_${item.code}`]) continue;
    item.tables = window[`tables_${item.code}`] = [];

    for (let tab of tabs) {
      if (tab[item.code]) {
        item.tables = item.tables.concat(tab[item.code]);
      }
    }
  }
}
function decode(str, codes) {
  str = str.toString();
  for (var i = 0; i < codes.length; i++) {
    var re = new RegExp(codes[i].code, "g");
    str = str.replace(re, codes[i].value);
  }
  return str;
}

async function getXSJJTable() {
  if (window.xsjj) return window.xsjj;
  let startDate = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
  ).Format("yyyy-MM-dd");
  let endDate = new Date(
    new Date().getTime() + 30 * 24 * 60 * 60 * 1000
  ).Format("yyyy-MM-dd");
  let params = {
    type: "XSJJ_NJ_PC",
    token: "70f12f2f4f091e459a279469fe49eca5", // # 访问令牌，必须
    st: "ltsj",
    sr: 1,
    p: 1,
    ps: 10000,
    js: "var xsjjo={pages:(tp),data:(x),font:(font)}",
    filter: `(mkt=)(ltsj>=^${startDate}^ and ltsj<=^${endDate}^)`,
    rt: 51294261
  };
  let url = "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?";

  let arr = [];
  for (let p in params) {
    arr.push(`${p}=${encodeURIComponent(params[p])}`);
  }
  url += arr.join("&");
  console.log(url);
  //let text = await fetch(url ).then(resp=>resp.text());
  //await loadScripts([url]);

  window.xsjjo = await getCacheData(new Date(), "tab_xsjjo", async () => {
    await fetchEval([url]);
    console.log(window.xsjjo);
    return window.xsjjo;
  });

  console.log(window.xsjjo);

  let xsjj = {};
  if (window.xsjjo.data)
    for (let d of window.xsjjo.data) {
      let mk = "sz";
      if (d.gpdm.substring(0, 1) == 6) {
        mk = "sh";
      }
      d.ltsj = dateFormat(d.ltsj, "yyyy-MM-dd");
      for (var key in d) {
        var html = d[key];
        try {
          d[key] = decode(html, window.xsjjo.font.FontMapping);
        } catch (err) {}
      }
      d.kjjsl = ConvertUnit(d.kjjsl * 10000);
      d.jjsz = ConvertUnit(d.jjsz * 10000);
      d.zb = parseFloat(d.zb * 100).toFixed(2);
      d.str = `${d.ltsj} - ${d.xsglx} 解禁数量 ${d.kjjsl} 流通市值比 ${d.zb}`;
      if (!xsjj[`${mk}${d.gpdm}`]) xsjj[`${mk}${d.gpdm}`] = [];
      xsjj[`${mk}${d.gpdm}`].push(d);
    }
  return (window.xsjj = xsjj);
}

async function getTableGDZJC() {
  let url =
    "http://data.eastmoney.com/DataCenter_V3/gdzjc.ashx?pagesize=50&page=1&js=var%20ElXraUuI&param=&sortRule=-1&sortType=BDJZ&tabid=all&code=&name=&rt=52384461";
  if (window.gdzjc) return window.gdzjc;
  await loadScripts([url]);
  console.log(ElXraUuI);
  let r = {};
  if (window.ElXraUuI)
    for (let datastr of window.ElXraUuI.data) {
      let data = datastr.split(",");
      let mk = "sz";
      if (data[0].substring(0, 1) == 6) {
        mk = "sh";
      }
      //最新价
      var zxj = data[2] == "" ? "-" : (data[2] / 1).toFixed(2);
      //跌涨幅
      var zdf = data[3] == "" ? "-" : (data[3] / 1).toFixed(2) + "%";
      //股东名称
      var gdmc1 = data[4] == "" ? "-" : data[4];

      //变动数量(万股)
      var bdsl = data[6] == "" ? "-" : "" + split(data[6], ".") + "";
      var bdsl1 = data[6] == "" ? "-" : "" + (data[6] / 1).toFixed(2) + "";
      //占总股本比例
      var zzgbbl = data[16] == "" ? "-" : (data[16] / 1).toFixed(2) + "%";
      //占流通股比例
      var zgbl = data[7] == "" ? "-" : (data[7] / 1).toFixed(2) + "%";

      //持股总数(万股)
      var cgzs = data[9] == "" ? "-" : "" + split(data[9], ".") + "";
      var cgzs1 = data[9] == "" ? "-" : "" + (data[9] / 1).toFixed(2) + "";
      //占总股本比例
      var zzgbl = data[10] == "" ? "-" : (data[10] / 1).toFixed(2) + "%";
      //持流通股数(万股)
      var cltgs = data[11] == "" ? "-" : (data[11] / 1).toFixed(2);

      //占流通股比例
      var bl = data[12] == "" ? "-" : (data[12] / 1).toFixed(2) + "%";

      //变动开始日

      var bdksr1 = data[13];

      //变动截止日
      var bdjzr1 = data[14];

      //公告日
      var ggr1 = data[15];

      //增减
      var zengjian = data[5] == "" ? "-" : "" + data[5] + "";
      var str = `股东 ${gdmc1} ${
        data[8]
      } ${bdksr1} - ${bdjzr1}  ${zengjian} ${bdsl1}(${data[9]})万股 占总股 ${
        data[7]
      }`;
      if (!r[`${mk}${data[0]}`]) r[`${mk}${data[0]}`] = [];
      r[`${mk}${data[0]}`].push({ str: str });
    }
  console.log(r);
  return (window.gdzjc = r);
}

async function getYZYGTable() {
  if (window.yzyg) return window.yzyg;

  let url =
    "http://dcfm.eastmoney.com//em_mutisvcexpandinterface/api/js/get?type=YJBB21_YJYG&token=70f12f2f4f091e459a279469fe49eca5&st=ndate&sr=-1&p=1&ps=30&js=var%20yzygo%3D%7Bpages%3A(tp)%2Cdata%3A(x)%2Cfont%3A(font)%7D";

  console.log(url);
  //let text = await fetch(url ).then(resp=>resp.text());
  await loadScripts([url]);
  console.log(window.yzygo);

  let yzyg = {};
  if (window.yzygo.data)
    for (let d of window.yzygo.data) {
      let mk = "sz";
      if (d.scode.substring(0, 1) == 6) {
        mk = "sh";
      }
      d.enddate = dateFormat(d.enddate, "yyyy-MM-dd");
      d.ndate = dateFormat(d.ndate, "yyyy-MM-dd");

      for (var key in d) {
        var html = d[key];
        try {
          d[key] = decode(html, window.yzygo.font.FontMapping);
        } catch (err) {}
      }

      d.str = `${d.ndate} 预告 ${d.enddate} 业绩 ${d.forecasttype} ${d.forecastcontent}<br />${d.changereasondscrpt}`;
      if (!yzyg[`${mk}${d.scode}`]) yzyg[`${mk}${d.scode}`] = [];
      yzyg[`${mk}${d.scode}`].push(d);
    }
  return (window.yzyg = yzyg);
}

const csvJSON = csv => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").filter(x => x.trim());
  const items = {};
  items["reportDate"] = headers;

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const currentline = lines[i].split(",");
    let name = currentline[0].trim();

    items[name] = {};

    for (let j = 1; j < headers.length; j++) {
      let reportDate = headers[j];
      items[name][reportDate] = currentline[j];
    }
  }
  return items;
};
let mgsy = "净利润(扣除非经常性损益后)(万元)";
const tbls = ["lrb", "xjllb", "zcfzb", "zycwzb"];

export function updateItem(item) {
  let analyst = {};

  if (
    tbls.filter(t => typeof window["tb_" + t + item.code] === "object")
      .length == tbls.length
  ) {
    let lrb = window["tb_zycwzb" + item.code];
    if (lrb[mgsy]) {
      let laste = parseFloat(lrb[mgsy][lrb.reportDate[1]]);
      let last2 = parseFloat(lrb[mgsy][lrb.reportDate[1 + 1 * 4]]);
      let last3 = parseFloat(lrb[mgsy][lrb.reportDate[1 + 2 * 4]]);
      let last4 = parseFloat(lrb[mgsy][lrb.reportDate[1 + 3 * 4]]);

      if (laste / last4 < 0) {
        analyst.zzl3 = 100 * Math.pow(1 - laste / last4, 1 / 3);
      } else {
        analyst.zzl3 = 100 * (Math.pow(laste / last4, 1 / 3) - 1);
      }
      if (laste < last4 && analyst.zzl3 > 0) analyst.zzl3 -= 2 * analyst.zzl3;

      if (laste / last3 < 0) {
        analyst.zzl2 = 100 * Math.pow(1 - laste / last3, 1 / 2);
      } else {
        analyst.zzl2 = 100 * (Math.pow(laste / last3, 1 / 2) - 1);
      }
      if (laste < last3 && analyst.zzl2 > 0) analyst.zzl2 -= 2 * analyst.zzl2;

      analyst.tbzz = (100 * (laste - last2)) / last2;
      analyst.zzl = `(${(laste / 10000).toFixed(2)}亿)${(
        ((laste - last2) * 100) /
        last2
      ).toFixed(2)},${(((last2 - last3) * 100) / last3).toFixed(2)},${(
        ((last3 - last4) * 100) /
        last4
      ).toFixed(2)},(${(last4 / 10000).toFixed(2)}亿)`;
      analyst.PEG = item.pe_ttm / analyst.zzl3;
    }
    analyst.reportDate = lrb.reportDate[1];
    return analyst;
  }
}

export function attachData(item) {
  (async () => {
    for (let i = 0; i < tbls.length; i++) {
      let tbname = tbls[i];
      const tbVarName = "tb_" + tbname + item.code;
      if (!window[tbVarName]) {
        window[tbVarName] = true;
        item[tbname] = {};
        let blob = await fetch(
          `http://quotes.money.163.com/service/${tbname}_${item.code.replace(
            /[^0-9]/g,
            ""
          )}.html`
        ).then(res => res.blob());

        loadScripts([
          `https://quotes.sina.cn/cn/api/jsonp_v2.php/var%20${item.code}_240=/CN_MarketDataService.getKLineData?symbol=${item.code}&scale=240&ma=no&datalen=6`
        ]);

        await new Promise((resolve, rejct) => {
          var reader = new FileReader();
          reader.onload = function(e) {
            var text = reader.result;
            let tbDatas = (window[tbVarName] = csvJSON(text));
            //  item[tbname] = csvJSON(text);
            resolve(tbDatas);
          };
          reader.readAsText(blob, "GBK");
        });
        updateItem(item);
      }
    }
  })();
}

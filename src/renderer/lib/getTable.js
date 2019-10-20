import { loadScripts, dateFormat, ConvertUnit, getDate, split } from "./utils";

//const dict = {1: 'YJBB', 2: 'YJKB', 3: 'YJYG',4: 'YYPL', 5: 'ZCFZB', 6: 'LRB', 7: 'XJLLB',XSJJ_NJ_PC}

export async function getTables() {
  let tabs = [
    await getXSJJTable() /*限售解禁*/,
    await getTableGDZJC() /*增减持 */,
    await getYZYGTable()
  ];
  for (let item of items) {
    if (!item.tables) item.tables = [];
    for (let tab of tabs) {
      if (tab[item.code]) {
        // item.tables.xsjj = xsjj[item.code];
        console.log(tab[item.code]);
        item.tables = item.tables.concat(tab[item.code]);
        console.log(item.tables);
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
  let todayStr = new Date().Format("yyyy-MM-dd");
  let params = {
    type: "XSJJ_NJ_PC",
    token: "70f12f2f4f091e459a279469fe49eca5", // # 访问令牌，必须
    st: "ltsj",
    sr: 1,
    p: 1,
    ps: 30,
    js: "var xsjjo={pages:(tp),data:(x),font:(font)}",
    filter: `(mkt=)(ltsj>=^${todayStr}^ and ltsj<=^${todayStr}^)`,
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
  await loadScripts([url]);
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
  return xsjj;
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

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

  window.xsjjo = await getCacheData(new Date(), "tab_限售解禁", async () => {
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
  //await loadScripts([url]);

  window.ElXraUuI = await getCacheData(
    new Date(),
    "tab_股东增减持",
    async () => {
      await fetchEval([url]);
      console.log(window.ElXraUuI);
      return window.ElXraUuI;
    }
  );

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
  //await loadScripts([url]);

  window.yzygo = await getCacheData(new Date(), "tab_业绩预告", async () => {
    await fetchEval([url]);
    console.log(window.yzygo);
    return window.yzygo;
  });

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
async function getYKLineDatas(item) {
  let sid = item.code.replace("sh", "1.").replace("sz", "0.");
  let url = `http://push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery18302719163191132177_1572179583739&secid=${sid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58&klt=103&fqt=0&beg=19900101&end=${new Date().getFullYear() +
    1}0101&_=1572179889234`;
}
async function getKLineDatas(item) {
  /*let shklines = await getCacheData(new Date(), "sh000001-kline", async () => {
    let code = "sh000001";
    let url = `https://quotes.sina.cn/cn/api/jsonp_v2.php/var%20${code}_240=/CN_MarketDataService.getKLineData?symbol=${code}&scale=240&ma=no&datalen=6`;
    await fetchEval([url]);
    return window[`sh000001_240`];
  });*/

  let klines = await getCacheData(
    new Date(),
    `${item.code}_kline`,
    async () => {
      let url = `https://quotes.sina.cn/cn/api/jsonp_v2.php/var%20${item.code}_240=/CN_MarketDataService.getKLineData?symbol=${item.code}&scale=240&ma=no&datalen=6`;
      await fetchEval([url]);
      let ret = window[`${item.code}_240`];
      try {
        delete window[`${item.code}_240`];
      } catch (e) {
        console.log(e);
      }
      return ret;
    }
  );

  return klines;
}
function isCP(klines) {
  let arr = klines
    .map((e, i, datas) => {
      e.preClose = i > 0 ? datas[i - 1].close : 0;
      e.zf = (
        (100 * (e.close - Math.max(e.open, e.preClose))) /
        e.close
      ).toFixed(2);
      return e;
    })
    .map(e => (e.close - Math.max(e.open, e.preClose)) / e.close)
    .reverse();
  let ret = 0;
  let retp = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= 0 || arr[i] > 0.03) break;
    ret += 1;
    retp += arr[i];
  }
  return ret > 2 && retp < 0.08;
}
export async function getMeetList() {
  let url =
    "http://25.push2.eastmoney.com/api/qt/clist/get?cb=callbacka&pn=1&pz=20000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f27,f28,f29,f22,f11,f62,f128,f136,f115,f152&_=1572107420243";
  let p = new Promise((resolve, reject) => {
    window.callbacka = function(data) {
      resolve(data);
    };
  });

  await fetchEval([url]);
  let datalist = await p;

  let lineDatas = [
    {
      day: "2019-10-18",
      open: "2982.342",
      high: "2987.204",
      low: "2933.242",
      close: "2938.141",
      volume: "14999067800"
    },
    {
      day: "2019-10-21",
      open: "2933.897",
      high: "2940.325",
      low: "2917.688",
      close: "2939.618",
      volume: "13247510700"
    }
  ];
  datalist = datalist.data.diff;
  datalist = datalist.map(e => {
    return {
      code: (e.f12.substring(0, 1) == 6 ? "sh" : "sz") + e.f12,
      name: e.f14,
      now: e.f2,
      changePV: e.f3,
      changeV: e.f4,
      open: e.f17,
      preClose: e.f18,
      turnover: e.f8,
      pe: e.f9,
      volume: e.f5,
      amount: e.f6,
      high: e.f15,
      low: e.f16,
      zsz: (e.f20 / 100000000).toFixed(2),
      lz: (e.f21 / 100000000).toFixed(2),
      avg: (e.f6 / e.f5).toFixed(2),
      zf60: e.f24,
      zf250: e.f25,
      firstDay: e.f26
    };
  });
  let d = new Date();
  d.setFullYear(d.getFullYear() - 3);
  let lastyearStr = d.Format("yyyyMMdd");
  for (let item of datalist) {
    let klines = await getKLineDatas(item);
    item.sz3 = klines && isCP(klines);
    item.klines = klines;
  }
  return datalist.filter(
    e =>
      e.now > 5 &&
      e.lz > 100 &&
      // e.zf60 > 0 &&
      //  e.firstDay <= lastyearStr &&
      e.zf60 < 100 &&
      e.name.indexOf("ST") == -1 &&
      e.sz3
  );
}
window.getallalist = getMeetList;
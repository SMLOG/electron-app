import {
  dateFormat,
  ConvertUnit,
  split,
  getLastReportDate,
  fetchEval,
  awaitTimeout,
  isObjectEmpty,
  rid,
} from "./utils";
import { getCriterias } from "./criteria";
import storejs from "storejs";

import { getExcludeList } from "./exclude-list";
import { updateCache, putCache, getCacheData, cache } from "./db";
import { loadHQ } from "./hq";
import { callFun } from "./tech-manager";

//const dict = {1: 'YJBB', 2: 'YJKB', 3: 'YJYG',4: 'YYPL', 5: 'ZCFZB', 6: 'LRB', 7: 'XJLLB',XSJJ_NJ_PC}

export async function getTables() {
  await getYYPLRQTable();

  await getXSJJTable();
  await getTableGDZJC();
  await getYZYGTable();
  getExcludeList();

  await getGXL();
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
    rt: 51294261,
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
      var str = `股东 ${gdmc1} ${data[8]} ${bdksr1} - ${bdjzr1}  ${zengjian} ${bdsl1}(${data[9]})万股 占总股 ${data[7]}`;
      if (!r[`${mk}${data[0]}`]) r[`${mk}${data[0]}`] = [];
      r[`${mk}${data[0]}`].push({ str: str });
    }
  return (window.gdzjc = r);
}

async function getYZYGTable() {
  return await getCacheData(new Date(), "Performance forecast_", async () => {
    let _varname = rid("var");
    let url = `http://dcfm.eastmoney.com//em_mutisvcexpandinterface/api/js/get?type=YJBB21_YJYG&token=70f12f2f4f091e459a279469fe49eca5&st=ndate&sr=-1&p=1&ps=5000&filter=(enddate=^${getLastReportDate()}^)&js=var%20${_varname}%3D%7Bpages%3A(tp)%2Cdata%3A(x)%2Cfont%3A(font)%7D`;

    await fetchEval([url]);
    let yzyg = {};
    if (window[_varname] && window[_varname].data)
      for (let d of window[_varname].data) {
        let mk = d.scode.substring(0, 1) == 6 ? "sh" : "sz";

        d.enddate = dateFormat(d.enddate, "yyyy-MM-dd");
        d.ndate = dateFormat(d.ndate, "yyyy-MM-dd");

        for (var key in d) {
          try {
            d[key] = decode(d[key], window[_varname].font.FontMapping);
          } catch (err) {}
        }

        d.str = `${d.ndate} 预告 ${d.enddate} 业绩 ${d.forecasttype} ${d.forecastcontent}\n${d.changereasondscrpt}`;
        if (!yzyg[`${mk}${d.scode}`]) yzyg[`${mk}${d.scode}`] = [];
        yzyg[`${mk}${d.scode}`].push(d);
      }

    for (let code in yzyg) {
      await updateCache("Performance forecast_" + code, () => yzyg[code]);
    }
    console.log(yzyg);
    return yzyg;
  });
}
async function getYYPLRQTable() {
  return await getCacheData(new Date(), "disclosure_date_", async () => {
    let _varname = rid("var");
    let url = `http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=YJBB21_YYPL&token=70f12f2f4f091e459a279469fe49eca5&st=frdate&sr=1&p=1&ps=5000&js=var%20${_varname}={pages:(tp),data:%20(x),font:(font)}&filter=(reportdate=^${getLastReportDate()}^)&rt=52629803`;
    console.info("获取最新披露日期列表：" + url);
    await fetchEval([url]);
    if (window[_varname] && window[_varname].data)
      for (let i = 0, len = window[_varname].data.length; i < len; i++) {
        let d = window[_varname].data[i];
        let mk = d.scode.substring(0, 1) == 6 ? "sh" : "sz";

        try {
          d.enddate = dateFormat(d.enddate, "yyyy-MM-dd");
          for (let dt of ["frdate", "fcdate", "scdate", "tcdate", "radate"]) {
            if (d[dt] && d[dt] != "-") d[dt] = dateFormat(d[dt], "yyyy-MM-dd");
          }
          d.last = Math.max.apply(
            null,
            ["frdate", "fcdate", "scdate", "tcdate", "radate"]
              .map(function(e) {
                return d[e];
              })
              .filter((e) => e && e != "-")
              .map((e) => new Date(e))
          );
        } catch (e) {
          console.err(e);
        }

        storejs.set("disclosure_date_" + `${mk}${d.scode}`, d);

        // await updateCache("disclosure date_" + `${mk}${d.scode}`, () => d);
      }
    console.log(window[_varname].data);

    return window[_varname];
  });
}

async function getGXL() {
  if (window.qRSAJPRO) return window.qRSAJPRO;

  let url = `http://data.eastmoney.com/DataCenter_V3/yjfp/getlist.ashx?js=var%20qRSAJPRO&pagesize=50000&page=1&sr=-1&sortType=YAGGR&mtk=%C8%AB%B2%BF%B9%C9%C6%B1&filter=(ReportingPeriod%3E=^${new Date().getFullYear() -
    1}-12-31^%20and%20ReportingPeriod%3C=^${new Date().getFullYear()}-12-31^)&rt=52460253`;

  window.qRSAJPRO = await getCacheData(new Date(), "tab_fh3", async () => {
    await fetchEval([url]);
    console.log(window.qRSAJPRO);
    return window.qRSAJPRO;
  });

  if (window.qRSAJPRO.data)
    for (let d of window.qRSAJPRO.data) {
      let mk = "sz";
      if (d.Code.substring(0, 1) == 6) {
        mk = "sh";
      }
      d.ReportingPeriod = dateFormat(d.ReportingPeriod, "yyyy-MM-dd");
      d.ResultsbyDate = dateFormat(d.ResultsbyDate, "yyyy-MM-dd");
      d.GXL = (d.GXL * 100).toFixed(2);

      cache["gxl_" + mk + d.Code] = d.GXL;
      cache["xjfh_" + mk + d.Code] = d.XJFH;
      cache["EarningsPerShare_" + mk + d.Code] = d.EarningsPerShare;
    }
}
window.getGXL = getGXL;

const csvJSON = (csv) => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").filter((x) => x.trim());
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
const mgsy = "净利润(扣除非经常性损益后)(万元)";

const tbls = ["lrb", "xjllb", "zcfzb", "zycwzb"];

function zzl(lrb, type, n) {
  let first = parseFloat(lrb[type][lrb.reportDate[1]]);
  let last = parseFloat(lrb[type][lrb.reportDate[1 + (n - 1) * 4]]);
  let ret = [];
  for (let i = 0; i < n; i++) {
    let v1 = parseFloat(lrb[type][lrb.reportDate[1 + i * 4]]);
    let v2 = parseFloat(lrb[type][lrb.reportDate[5 + i * 4]]);
    let z = (((v1 - v2) * 100) / v2).toFixed(2);
    ret.push(z);
  }
  return `(${(first / 10000).toFixed(2)}亿)${ret.join(",")},(${(
    last / 10000
  ).toFixed(2)}亿)`;
}
export async function updateItem(item) {
  let lrb = await getCacheData(null, `tb_zycwzb${item.code}`);

  if (!isObjectEmpty(lrb) && lrb.reportDate && lrb.reportDate.length > 1) {
    putCache(`tb_zycwzb${item.code}`, lrb);

    let laste = parseFloat(lrb[mgsy][lrb.reportDate[1]]);
    let last2 = parseFloat(lrb[mgsy][lrb.reportDate[1 + 1 * 4]]);
    let last3 = parseFloat(lrb[mgsy][lrb.reportDate[1 + 2 * 4]]);
    let last4 = parseFloat(lrb[mgsy][lrb.reportDate[1 + 3 * 4]]);

    if (laste / last4 < 0) {
      item.zzl3 = 100 * Math.pow(1 - laste / last4, 1 / 3);
    } else {
      item.zzl3 = 100 * (Math.pow(laste / last4, 1 / 3) - 1);
    }
    if (laste < last4 && item.zzl3 > 0) item.zzl3 -= 2 * item.zzl3;

    if (laste / last3 < 0) {
      item.zzl2 = 100 * Math.pow(1 - laste / last3, 1 / 2);
    } else {
      item.zzl2 = 100 * (Math.pow(laste / last3, 1 / 2) - 1);
    }
    if (laste < last3 && item.zzl2 > 0) item.zzl2 -= 2 * item.zzl2;

    item.tbzz = (100 * (laste - last2)) / last2;
    item.zzl = zzl(lrb, mgsy, 4);
    item.xjlzzl = zzl(lrb, "经营活动产生的现金流量净额(万元)", 2);
    item.PEG = item.pe_ttm / item.zzl3;
    item.reportDate = lrb.reportDate[1];
  }
  return item;
}

const fieldMap = {
  jbmgsy: "基本每股收益(元)",
  kfmgsy: "扣非每股收益(元)",
  xsmgsy: "稀释每股收益(元)",
  mgjzc: "每股净资产(元)",
  mggjj: "每股公积金(元)",
  mgwfply: "每股未分配利润(元)",
  mgjyxjl: "每股经营现金流(元)",
  yyzsr: "营业总收入(元)",
  mlr: "毛利润(元)",
  gsjlr: "归属净利润(元)",
  kfjlr: "扣非净利润(元)",
  yyzsrtbzz: "营业总收入同比增长(%)",
  gsjlrtbzz: "归属净利润同比增长(%)",
  kfjlrtbzz: "扣非净利润同比增长(%)",
  yyzsrgdhbzz: "营业总收入滚动环比增长(%)",
  gsjlrgdhbzz: "归属净利润滚动环比增长(%)",
  kfjlrgdhbzz: "扣非净利润滚动环比增长(%)",
  jqjzcsyl: "加权净资产收益率(%)",
  tbjzcsyl: "摊薄净资产收益率(%)",
  tbzzcsyl: "摊薄总资产收益率(%)",
  mll: "毛利率(%)",
  jll: "净利率(%)",
  sjsl: "实际税率(%)",
  yskyysr: "预收款/营业收入",
  xsxjlyysr: "销售现金流/营业收入",
  jyxjlyysr: "经营现金流/营业收入",
  zzczzy: "总资产周转率(次)",
  yszkzzts: "应收账款周转天数(天)",
  chzzts: "存货周转天数(天)",
  zcfzl: "资产负债率(%)",
  ldzczfz: "流动负债/总负债(%)",
  ldbl: "流动比率",
  sdbl: "速动比率",
};
function fmtReportDatas(json) {
  let reportDate = [];
  let map = {};
  for (let it of json) {
    for (let k in it) {
      let key = fieldMap[k] || k;
      if (!map[key]) map[key] = {};
      map[key][it.date] = it[k];
    }
  }

  for (let i in map["date"]) {
    reportDate.push(i);
  }
  reportDate.sort().reverse();
  reportDate.unshift("报告日期");
  map["reportDate"] = reportDate;
  return map;
}
export function loadReports(item) {
  return (async () => {
    for (let i = 0; i < tbls.length; i++) {
      let tbname = tbls[i];
      const tbVarName = "tb_" + tbname + item.code;
      let disclose = storejs.get(`disclosure_date_${item.code}`);

      let data = await getCacheData(
        disclose &&
          new Date().getTime() >= disclose.last &&
          new Date().getTime() - disclose.last < 2 * 24 * 60 * 60 * 1000
          ? new Date()
          : null,
        tbVarName,
        async () => {
          let blob = await fetch(
            `http://quotes.money.163.com/service/${tbname}_${item.code.replace(
              /[^0-9]/g,
              ""
            )}.html`
          ).then((res) => res.blob());

          return await new Promise((resolve, rejct) => {
            var reader = new FileReader();
            reader.onload = function(e) {
              var text = reader.result;
              let tbDatas = csvJSON(text);
              resolve(tbDatas);
            };
            reader.readAsText(blob, "GBK");
          });
        }
      );
      window[tbVarName] = data;
    }
    let zyzb = await getCacheData(null, "zyzb_" + item.code, async () => {
      let code = item.code.replace("sz", "SZ").replace("sh", "SH");
      let url = `http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=0&code=${code}`;
      let json = await fetch(url).then((res) => res.json());
      console.log(json);
      try {
        json = fmtReportDatas(json);
      } catch (e) {}
      return json;
    });
    window["zyzb_" + item.code] = zyzb;

    await updateItem(item);
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
      let url = `https://quotes.sina.cn/cn/api/jsonp_v2.php/var%20${item.code}_240=/CN_MarketDataService.getKLineData?symbol=${item.code}&scale=240&ma=no&datalen=260`;
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
window.getKLineDatas = getKLineDatas;

async function getGZlist() {
  let gzlist = await getCacheData(new Date(), `getGZlist`, async () => {
    let url = `http://dcfm.eastmoney.com/EM_MutiSvcExpandInterface/api/js/get?type=GZFX_GGZB&token=894050c76af8597a853f5b408b759f5d&st=SECURITYCODE&sr=1&p=1&ps=50000&js=var%20HecYRTyS={pages:(tp),data:(x),font:(font)}&filter=(TRADEDATE=^2019-11-15^)&rt=52466643`;
    await fetchEval([url]);
    let ret = window[`HecYRTyS`];
    try {
      delete window[`HecYRTyS`];
    } catch (e) {
      console.log(e);
    }
    return ret;
  });

  return gzlist;
}
window.getGZlist = getGZlist;
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
    .map((e) => (e.close - Math.max(e.open, e.preClose)) / e.close)
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

async function getHXList() {
  let cb = rid("list");

  let url = `http://25.push2.eastmoney.com/api/qt/clist/get?cb=${cb}&pn=1&pz=20000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f27,f28,f29,f22,f11,f62,f124,f128,f136,f115,f152&_=1572107420243`;
  let p = new Promise((resolve, reject) => {
    window[cb] = function(data) {
      resolve(data);
    };
  });
  console.log("awaitTimeout");
  await awaitTimeout(() => {
    return fetchEval([url]);
  });

  let datalist = await p;
  delete window[cb];
  datalist = datalist.data.diff;
  datalist = datalist.map((e) => {
    return {
      code: (e.f12.substring(0, 1) == 6 ? "sh" : "sz") + e.f12,
      name: e.f14,
      now: e.f2,
      close: e.f2,
      changePV: e.f3,
      changeP: e.f3 + "%",
      changeV: e.f4,
      change: e.f4,
      open: e.f17,
      preClose: e.f18,
      preclose: e.f18,
      turnover: e.f8,
      pe: e.f9,
      pe_ttm: e.f115,
      volume: e.f5,
      ltg: parseFloat((e.f21 / e.f2 / 100000000).toFixed(2)),
      amount: e.f6,
      high: e.f15,
      low: e.f16,
      zsz: (e.f20 / 100000000).toFixed(2),
      lz: (e.f21 / 100000000).toFixed(2),
      avg: (e.f6 / e.f5).toFixed(2),
      zf60: e.f24,
      zf250: e.f25,
      firstDay: e.f26,
      date: new Date(e.f124 * 1000),
    };
  });
  return datalist;
}
export function isNotTradeTime() {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  if (h < 9 || h > 15) return true;
  if (h == 9 && m < 30) return true;
  if (h == 11 && m > 30) return true;
  if (h > 11 && h < 13) return true;
  if (h > 15) return true;
  return false;
}
export async function batchUpdateHQ(items) {
  if (!items || !items.length) return;

  let datalist = await getHXList();

  for (let i = 0; i < datalist.length; i++) {
    let item = datalist[i];

    cache[item.code] = item;
  }
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (cache[item.code]) {
      Object.assign(item, cache[item.code]);
    }
  }
}
//基本面筛选
export async function getFilterList(callback) {
  let datalist = await getHXList();

  window.datalist = datalist;

  let crs = getCriterias();
  let ccArrList = crs.map((cr) => {
    return []
      .concat(Object.values(cr.scope))
      .concat(Object.values(cr.basic))
      .filter((e) => e && e._enable);
  });

  let recursivFiltersSync = (item, filters) => {
    if (filters.length == 0) return true;
    let f = filters.pop();
    return f.is(item) && recursivFiltersSync(item, filters);
  };
  let recursivFiltersAsync = async (item, filters) => {
    if (filters.length == 0) return true;
    let f = filters.pop();
    return (await f.is(item)) && (await recursivFiltersAsync(item, filters));
  };
  let recursivFiltersTopSync = (item, filters) => {
    if (filters.length == 0) return true;
    let f = filters.pop();
    return (
      recursivFiltersSync(item, f) ||
      (filters.length > 0 && recursivFiltersTopSync(item, filters))
    );
  };

  let recursivFiltersTopAsync = async (item, filters) => {
    if (filters.length == 0) return true;
    let f = filters.pop();
    return (
      (await recursivFiltersAsync(item, f)) ||
      (filters.length > 0 && (await recursivFiltersTopAsync(item, filters)))
    );
  };

  datalist = datalist.filter((item) =>
    recursivFiltersTopSync(
      item,
      ccArrList.map((a) => a.filter((e) => e.order == 0))
    )
  );
  console.log("0:", datalist);

  //await loadHQ(datalist);
  datalist = datalist.filter((item) =>
    recursivFiltersTopSync(
      item,
      ccArrList.map((a) => a.filter((e) => e.order == 1))
    )
  );
  console.log("1:", datalist);

  for (let i = 0; i < datalist.length; i++) {
    let item = datalist[i];
    if (
      await recursivFiltersTopAsync(
        item,
        ccArrList.map((a) => a.filter((e) => e.order == 2))
      )
    ) {
      //update cache
      console.log("update cache");
      await getCacheData(null, item.code, null, item);
      console.log(item);
      await techAnalyst(item);

      callback(item);
    }
  }
  callback(null);

  return datalist;
}

export async function techAnalyst(item) {
  await callFun(item);
}
function avg(arr) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

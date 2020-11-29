import _ from "lodash";
import { genModel } from "./utils";
import fs from "fs";
import { userAgent, CONFIG_DIR } from "!/config";
import { axios } from "!/axios";
async function getcolumDisplayMap() {
  let cachefile = `${__dirname}/columDisplayMap.json`;
  if (fs.existsSync(cachefile)) {
    return JSON.parse(fs.readFileSync(cachefile));
  }

  const bburls = {
    qs:
      "http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code=sh600999",
    yh:
      "http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code=SZ002142",
    qy:
      "http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code=sh600031",
    bx:
      "http://f10.eastmoney.com/NewFinanceAnalysis/Index?type=web&code=sh601628",
  };
  let res = {};
  for (let i = 0, ks = Object.keys(bburls); i < ks.length; i++) {
    let url = bburls[ks[i]];
    console.log(url);
    let html = await axios.get(url, {}).then((resp) => resp.data);
    html = html.replace(/\r\n/g, "");
    let reg = /<script.*?<\/script>/gi;
    let m;
    while ((m = reg.exec(html))) {
      if (
        m[0].indexOf('type="text/template"') > -1 &&
        m[0].match(/((xjllb)|(lrb)|(zcfzb)|(dbfx)|(zyzb)).*?"/)
      ) {
        let type = m[0].match(/(((xjllb)|(lrb)|(zcfzb)|(dbfx)|(zyzb)).*?)"/)[1];
        let s = m[0];

        let r1 = s
          .split("<tr")
          .filter((e) => e.indexOf("<td") > -1)
          .map((e) =>
            e
              .replace(/\n/g, "")
              .match(/<span>(.*?)<\/span>.*?value\.([a-z0-9]*)/i)
          )
          .filter((e) => e)
          .map((e) => [e[2], e[1]]);

        res[type] = r1;

        // return;
      }
    }
  }
  let dbfx = _.map(
    {
      jzcsyl: "roe",
      zzcjll: "总资产净利率",
      gsmgsgddjlr: "归属母公司股东的净利润占比",
      qycs: "权益乘数",
      yyjlrl: "营业净利润",
      zzczzl: "总资产周转率",
      zcfzl: "资产负债率",
      jlr: "净利润",
      yysr: "营业总收入",
      zcze: "资产总额",
      fzze: "负债总额",
      srze: "收入总额",
      cbze: "成本总额",
      ldzc: "流动资产",
      fldzc: "非流动资产",
      yycb: "营业成本",
      qjfy: "期间费用",
      hbzj: "货币资金",
      kgcsjrzc: "可供出售金融资产",
      wxzc: "无形资产",
      gyjzbdsy: "公允价值变动收益",
      yysjjfj: "营业税金及附加",
      jyxjrzc: "交易性金融资产",
      cyzdqtz: "持有至到期投资",
      kfzc: "开发支出",
      yywsr: "营业外收入",
      sdsfy: "所得税费用",
      cwfy: "财务费用",
      yszk: "应收账款",
      cqgqtz: "长期股权投资",
      sy: "商誉",
      tzsy: "投资收益",
      zcjzss: "资产减值损失",
      xsfy: "销售费用",
      yfzk: "应付账款",
      tzxfdc: "投资性房地产",
      cqdtfy: "长期待摊费用",
      yywzc: "营业外收入",
      glfy: "管理费用",
      qtysk: "其他应收款",
      gdzc: "固定资产",
      dysdszc: "递延所得税资产",
      ch: "存货",
      zjgc: "在建工程",
      qtfldzc: "其他非流动资产",
      qtldzc: "其他流动资产",
    },
    (value, key) => [key, value]
  );
  res = _.merge(res, {
    dbfx: dbfx,
  });
  //console.log(res);

  fs.writeFileSync(cachefile, JSON.stringify(res, null, 4));
  return res;
}
async function getSampDatas() {
  let typemap = {
    "1": "sh600999",
    "2": "sh601628",
    "3": "SZ002142",
    "4": "SH605018",
  };
  let tabs = ["lrb", "zcfzb", "xjllb"];
  let sampM = tabs.reduce((map, i) => {
    map[i] = {};
    return map;
  }, {});
  for (let i = 0; i < tabs.length; i++) {
    let tab = tabs[i];
    for (
      let j = 0, typemapks = Object.keys(typemap);
      j < typemapks.length;
      j++
    ) {
      let companyType = typemapks[j];
      let code = typemap[typemapks[j]];
      let url = `http://f10.eastmoney.com/NewFinanceAnalysis/${tab}Ajax?companyType=${companyType}&reportDateType=0&reportType=1&endDate=&code=${code}`;
      console.log(url);
      let result = await axios.get(url, {}).then((resp) => resp.data);
      let smap = JSON.parse(result)[0];
      sampM[tab] = _.merge(sampM[tab], smap);
    }
  }
  let mainUrl =
    "http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=0&code=SZ000651";

  console.log(mainUrl);
  let result = await axios.get(mainUrl, {}).then((resp) => resp.data);
  let smap = result[0];
  sampM["zyzb"] = smap;
  let dbfxUrl =
    "http://f10.eastmoney.com/NewFinanceAnalysis/DubangAnalysisAjax?code=SZ000651";
  console.log(dbfxUrl);
  result = await axios.get(dbfxUrl, {}).then((resp) => resp.data);
  smap = result["nd"][0];
  sampM["dbfx"] = smap;
  return sampM;
}

function getFieldDisplay(tab, map) {
  // _.map(map,(o,key)=>key.indexOf(tab)>-1&&o)
  let arr = _.flatMap(map);
  let r = _.reduce(
    arr,
    (a, e) => ((a[e[0]] = e[1].replace(/&ensp;/g, "").replace(/\n/g, "")), a),
    {}
  );
  return r;
}
export async function getFieldsMap(modelName) {
  let colMap = await getcolumDisplayMap();
  let fieldMap = getFieldDisplay(modelName, colMap);
  return fieldMap;
}
async () => {
  let colMap = await getcolumDisplayMap();
  let sampMap = await getSampDatas();
  const compositeFields = [
    "SECURITYCODE",
    "reportDate",
    "date",
    "code",
    "REPORTDATETYPE",
    "REPORTTYPE",
  ];
  for (let modelName in sampMap) {
    let sampleRow = sampMap[modelName];
    let fieldMap = getFieldDisplay(modelName, colMap);

    delete sampleRow["REPORTDATE"];
    sampleRow = _.defaults(sampleRow, {
      REPORTTYPE: "",
      REPORTDATETYPE: "",
      reportDate: "2020-12-30",
    });
    genModel(sampleRow, modelName, fieldMap, compositeFields);

    //fs.writeFileSync(options._file, JSON.stringify(res));
  }

  //console.log(JSON.stringify(out, null, 4));
  //console.log(colMap, sampMap);
};

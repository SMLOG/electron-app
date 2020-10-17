import axios from "axios";
import fs from "fs";
async function getcolumDisplayMap() {
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
  return res;
}
import _ from "lodash";
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
const u = ["SECURITYCODE", "REPORTDATE", "date", "code"];
(async () => {
  let colMap = await getcolumDisplayMap();
  let sampMap = await getSampDatas();
  let out = {};
  for (let tab in sampMap) {
    let samp = sampMap[tab];
    let res = (out[tab] = {});
    res["id"] = {
      type: "DataTypes.INTEGER",
      autoIncrement: true,
      primaryKey: true,
    };
    if (_.intersection(_.keys(samp), u).length < 2) {
      res["code"] = {
        type: "DataTypes.STRING(30)",
        unique: "compositeIndex",
      };
    }
    let displayFieldMap = getFieldDisplay(tab, colMap);

    for (let field in samp) {
      let f = (res[field] = {});
      let display = displayFieldMap[field];
      if (display) {
        f.display = display;
      }
      f["type"] = "DataTypes.STRING(30)";
      f["field"] = field;
      if (u.indexOf(field) > -1) f["unique"] = "compositeIndex";
    }
    let attrs = JSON.stringify(out[tab], null, 4).replace(
      /"(DataTypes.*?)"/g,
      "$1"
    );
    let cls = tab[0].toUpperCase() + tab.substring(1);
    let content = `const { Sequelize, Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
    
    class ${cls} extends Model {}
    ${cls}.init(
      ${attrs}
    ,
      {
        sequelize: db,
        modelName: "${tab}",
      }
    );
    module.exports = ${cls};
    `;
    //console.log(content);
    let file = `/Users/alexwang/git/electron-suspension/src/server/db/model/${cls}.js`;
    console.log(file);
    fs.writeFileSync(file, content);
    //fs.writeFileSync(options._file, JSON.stringify(res));
  }

  //console.log(JSON.stringify(out, null, 4));
  //console.log(colMap, sampMap);
})();

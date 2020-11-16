const Zyzb = require("./model/Zyzb");
const Dbfx = require("./model/Dbfx");

import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { ifNoExistGenModel, codeField } from "./utils";
import { getFieldsMap } from "./convert";

async function getReportData(tab, code, typename = "单季") {
  let reportDateType = 2;
  let reportDateType2 = 0;
  let reportType = 2;

  let fieldMap = await getFieldsMap(tab);

  switch (typename) {
    case "单季":
      reportDateType = 2;
      reportDateType2 = 0;
      reportType = 2;
      break;
    case "年度":
      reportDateType = 1;
      reportDateType2 = 1;
      reportType = 1;
      break;

    case "报告期":
      reportDateType = 0;
      reportDateType2 = 0;
      reportType = 1;
      break;
  }
  let dateurl = `http://f10.eastmoney.com/NewFinanceAnalysis/${tab}DateAjax?reportDateType=${reportDateType}&code=${code}`;

  console.log(dateurl);
  let dates = await axios.get(dateurl, {}).then((resp) => resp.data.data);

  let endDate = "";
  console.log(dates);
  let allrows = [];
  for (;;) {
    let url = `http://f10.eastmoney.com/NewFinanceAnalysis/${tab}Ajax?companyType=4&reportDateType=${reportDateType2}&reportType=${reportType}&endDate=${endDate}&code=${code}`;
    console.log(url);
    let rows;
    try {
      rows = await axios.get(url, {}).then((resp) => resp.data);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
    //console.log(JSON.parse(result)[0]);
    rows = JSON.parse(rows);
    allrows = allrows.concat(rows);
    endDate = moment(new Date(allrows[allrows.length - 1].REPORTDATE)).format(
      "YYYY-MM-DD"
    );
    if (endDate == dates[dates.length - 1]) break;
  }

  allrows = allrows.map((e) =>
    _.defaults(e, {
      code: code.toString(),
      REPORTDATETYPE: reportDateType2,
      REPORTTYPE: reportType,
      typename: typename,
    })
  );

  console.log(endDate, dates[dates.length - 1], tab);
  allrows = allrows.map((row) => {
    row.RREPORTDATE = row.REPORTDATE = moment(new Date(row.REPORTDATE)).format(
      "YYYY-MM-DD"
    );

    row.PREPORTDATE =
      parseInt(row.REPORTDATE.substring(0, 4)) -
      1 +
      row.REPORTDATE.substring(4);
    return (row = _.mapValues(row, (v) =>
      v == "-" || v == null || v.toString().trim() == "" ? null : v
    ));
  });

  if (typename == "单季" && allrows.length > 0) {
    let ttmrow = {};
    for (let i = Math.min(allrows.length, 3); i >= 0; i--) {
      ttmrow = _.mapValues(allrows[i], (value, key) => {
        return /^\-?\d+\.?\d*$/.test(value)
          ? parseFloat(value) + (ttmrow[key] ? ttmrow[key] : 0)
          : value;
      });
    }
    ttmrow.RREPORTDATE = allrows[0].RREPORTDATE;

    ttmrow.REPORTTYPE = 1;
    ttmrow.TYPE = 4;
    ttmrow.REPORTDATE = ttmrow.REPORTDATE.substring(0, 4) + "-12-31";
    ttmrow.PREPORTDATE =
      parseInt(ttmrow.REPORTDATE.substring(0, 4)) - 1 + "-12-31";
    console.log(ttmrow);
    allrows = allrows.concat(ttmrow);
  }

  let model = await ifNoExistGenModel(
    allrows,
    tab,
    fieldMap,
    ["code", "REPORT_DATE", "REPORTDATE", "REPORTTYPE"],
    tab,
    {},
    "DOUBLE"
  );
  await model.bulkCreate(allrows, {
    updateOnDuplicate: Object.keys(allrows[0]),
    logging: false,
  });
}
async function getZyzb(type, code) {
  var url = `http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=0&code=${code}`;
  var data = { type: type, code: code };

  let result = await axios.get(url, { params: data }).then((resp) => resp.data);
  for (let i = 0; i < result.length; i++) {
    let row = result[i];
    row = _.mapValues(row, (e) => (e == "--" ? null : e));
    row = _.defaults(row, {
      code: code.toLowerCase(),
      REPORTTYPE: type,
      REPORTDATE: row.date,
      typename: typename,
    });
    console.log(JSON.stringify(row, null, 4));

    await Zyzb.create(row);
  }
}
async function getDbfx(code) {
  var url = `http://f10.eastmoney.com/NewFinanceAnalysis/DubangAnalysisAjax?type=0&code=${code}`;
  var data = { code: code };

  let dbfx = await axios.get(url, { params: data }).then((resp) => resp.data);
  for (let type of ["nd", "bgq"]) {
    for (let i = 0; i < dbfx[type].length; i++) {
      let row = dbfx[type][i];
      row = _.mapValues(row, (e) => (e == "--" ? null : e));
      row = _.defaults(row, {
        code: code,
        REPORTTYPE: type == "nd" ? 1 : 0,
        reportDate: row.date,
      });
      console.log(JSON.stringify(row, null, 4));

      await Dbfx.create(row);
    }
  }
}

(async () => {
  //await getDbfx("sh600031");
  let code = "sz000568";
  await getReportData("lrb", code);
  await getReportData("lrb", code, "年度");
  await getReportData("xjllb", code);
  await getReportData("xjllb", code, "年度");
  await getReportData("zcfzb", code, "报告期");
})();

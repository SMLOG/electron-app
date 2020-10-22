/*const User = require("./model/User");
// Find all users
User.findAll().then((users) => {
  console.log("All users:", JSON.stringify(users, null, 4));
});
// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then((jane) => {
  console.log("Jane's auto-generated ID:", jane.id);
});
// Delete everyone named "Jane"
User.destroy({
  where: {
    firstName: "Jane",
  },
}).then(() => {
  console.log("Done");
});
// Change everyone without a last name to "Doe"
User.update(
  { lastName: "Doe" },
  {
    where: {
      lastName: null,
    },
  }
).then(() => {
  console.log("Done");
});
*/

const Lrb = require("./model/Lrb");
const Zcfzb = require("./model/Zcfzb");
const Xjllb = require("./model/Xjllb");
const Zyzb = require("./model/Zyzb");
const Dbfx = require("./model/Dbfx");
const Yyplrq = require("./model/Yyplrq");
const Yj = require("./model/Yj");
const Yjkb = require("./model/Yjkb");
const Yjyg = require("./model/Yjyg");
const Zcfz = require("./model/Zcfz");
const Lr = require("./model/Lr");
const Xjll = require("./model/Xjll");
const Gz = require("./model/Gz");
import axios from "axios";
import moment from "moment";
import _ from "lodash";
async function getReportData(tab, code) {
  let dateurl = `http://f10.eastmoney.com/NewFinanceAnalysis/${tab}DateAjax?reportDateType=0&code=${code}`;

  let dates = await axios.get(dateurl, {}).then((resp) => resp.data.data);

  let endDate = "";

  for (;;) {
    let url = `http://f10.eastmoney.com/NewFinanceAnalysis/${tab}Ajax?companyType=4&reportDateType=0&reportType=1&endDate=${endDate}&code=${code}`;
    console.log(url);

    let result = await axios.get(url, {}).then((resp) => resp.data);
    //console.log(JSON.parse(result)[0]);
    result = JSON.parse(result);
    result = result.map((e) =>
      _.defaults(e, {
        code: code,
        REPORTDATETYPE: 0,
        REPORTTYPE: 1,
        reportDate: moment(new Date(e.REPORTDATE)).format("YYYY-MM-DD"),
      })
    );

    endDate = moment(new Date(result[result.length - 1].REPORTDATE)).format(
      "YYYY-MM-DD"
    );
    console.log(endDate, dates[dates.length - 1]);
    for (let i = 0; i < result.length; i++)
      try {
        if (tab == "rlb") await Lrb.create(result[i]);
        else if (tab == "zcfzb") await Zcfzb.create(result[i]);
        else if (tab == "xjllb") await Xjllb.create(result[i]);
      } catch (e) {
        return;
      }
    if (endDate == dates[dates.length - 1]) break;
  }
}
async function getZyzb(type, code) {
  var url = `http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=0&code=${code}`;
  var data = { type: type, code: code };

  let result = await axios.get(url, { params: data }).then((resp) => resp.data);
  for (let i = 0; i < result.length; i++) {
    let row = result[i];
    row = _.mapValues(row, (e) => (e == "--" ? null : e));
    row = _.defaults(row, {
      code: code,
      REPORTTYPE: type,
      reportDate: row.date,
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
  await getDbfx("sh600031");
  // await getReportData("zcfzb", "sh600031");
})();

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
(async () => {
  await getReportData("zcfzb", "sh600031");
})();

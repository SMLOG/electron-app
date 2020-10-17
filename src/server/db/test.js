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
import axios from "axios";

async function getReportData() {
  let url =
    "http://f10.eastmoney.com/NewFinanceAnalysis/lrbAjax?companyType=4&reportDateType=0&reportType=1&endDate=&code=SH605018";
  console.log(url);

  let result = await axios.get(url, {}).then((resp) => resp.data);
  //console.log(JSON.parse(result)[0]);
  await Lrb.bulkCreate(JSON.parse(result));
}
(async () => {
  await getReportData();
})();

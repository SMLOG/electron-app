import fs from "fs";
import os from "os";
import { name as appName } from "#package.json";
import { mainFinanceAnalyst } from "./basicAnalyst";
import { getDataDir } from "./config";
export async function get(item, prop) {
  if (item[prop]) return item[prop];
  let code = item.code;
  let dir = `${os.homedir()}/.${appName}/${code}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  switch (prop) {
    case "PEG":
      let dir = getDataDir(code);
      let cfile = dir + "/financeData.json";
      let financeData;
      if (fs.existsSync(cfile)) {
        financeData = JSON.parse(fs.readFileSync(cfile));
      } else {
        financeData = await mainFinanceAnalyst(code);
        fs.writeFileSync(cfile, JSON.stringify(financeData));
      }
      //console.log(financeData);
      let pe_ttm = await get(item, "pe_ttm");

      let g = financeData[0]["扣非净利润滚动环比增长(%)"];
      item["扣非净利润滚动环比增长(%)"] = g;
      //console.log(g);
      item.PEG = (pe_ttm / g).toFixed(2);
      //console.log(item);

      break;
  }

  fs.writeFileSync(`${dir}/${code}.json`, JSON.stringify(item));

  return item[prop];
}
(async () => {
  let result = await get({ code: "SZ000651", pe_ttm: 17.22 }, "PEG");
  console.log(result);
})();

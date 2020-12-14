import My from "./model/My";
import { db } from "./db";
import { getReportDatas } from "./reports";

(async () => {
  console.log(My);
  let items = await db.query(`select * from hq where pe_ttm>0 and pe_ttm<50`, {
    type: db.QueryTypes.SELECT,
  });
  console.log(items);

  for (let item of items) {
    await getReportDatas(item.code);
  }
})();

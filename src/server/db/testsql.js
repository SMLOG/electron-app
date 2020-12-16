import My from "./model/My";
import { db } from "./db";
import { getReportDatas } from "./reports";

(async () => {
  console.log(My);
  let items = await db.query(
    `select * from hq where pe_ttm>0 and pe_ttm<50 and close>5 and  firstday is not null and firstday <=20210101
    and not exists( select 1 from lrb lr where lr.code=hq.code)
    `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  console.log(items);

  for (let item of items) {
    await getReportDatas(item.code);
  }
})();

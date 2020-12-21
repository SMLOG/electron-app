import My from "./model/My";
import { db } from "./db";
import { getReportDatas } from "./reports";
import { ifNoExistGenModel } from "!/db/utils";

(async () => {
  console.log(My);
  let items = await db.query(
    `select * from hq where pe_ttm>0 and pe_ttm<60 and close>5 
    and  firstday is not null and firstday <=20190101
    and not exists( select 1 from lrb lr where lr.code=hq.code)
    `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  // console.log(items);

  for (let item of items) {
    await getReportDatas(item.code);
  }

  let list = await db.query(
    `select t.*,rank() OVER(PARTITION by code order by reportdate desc) as rank_id from v_root t`,
    {
      logging: console.log,
      type: db.QueryTypes.SELECT,
      raw: true,
    }
  );
  console.log(list.length);
  let model = await ifNoExistGenModel(
    [list[0]],
    "t_v_root",
    {},
    ["code", "rank_id"],
    "t_v_root",
    {},
    "DOUBLE"
  );

  await model.bulkCreate(list, {
    updateOnDuplicate: Object.keys(list[0]),
    //  logging: true,
  });
  console.log("done");
})();

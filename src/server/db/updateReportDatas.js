import My from "./model/My";
import { db } from "./db";
import { getReportDatas } from "./reports";
import { ifNoExistGenModel } from "!/db/utils";

async function updateReportDatas() {
  console.log(My);
  let items = await db.query(
    `
    select hq.code from ( select code from hq where pe_ttm is not null
      union all select code from my
      ) hq,
      (select code, max(report_date) report_date from yyplrq yy where ACTUAL_PUBLISH_DATE is not null group by code) md
      where hq.code = md.code  and not exists( 
      select 1 from lrb lr where 
      lr.code=hq.code
      and lr.reportdate = md.report_date
      )
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
}
updateReportDatas();

import { db } from "!/db/db";
import { ifNoExistGenModel } from "!/db/utils";
import { callFun, techMaplist } from "!/TechMan";
import { getMyList, getSeaList } from "./HQws";

export async function upDateTechDatas(force = false) {
  let sampleRow = techMaplist.reduce((r, it) => {
    r["_" + it] = true;
    return r;
  }, {});
  sampleRow.code = "code";
  sampleRow.score = 0;
  sampleRow.utime = new Date();
  let model = await ifNoExistGenModel(
    [sampleRow],
    "tech",
    {},
    ["code"],
    "tech",
    {},
    "BOOLEAN"
  );

  let techDetailModel = await ifNoExistGenModel(
    [{ code: "code", name: "name", display: "display", score: 1 }],
    "tech_detail",
    {},
    ["code", "name"],
    "tech_detail",
    {},
    "String"
  );

  let all = await getMyList();
  all.push(...(await getSeaList()));

  let updatedList = [];
  for (let item of all) {
    if (!item.code) continue;

    let techs = await db.query(
      `select code from tech where code = :code and  date_add(utime, interval + 5 minute) > now()`,
      {
        type: db.QueryTypes.SELECT,
        replacements: {
          code: item.code,
        },
      }
    );
    if (force || techs.length == 0) {
      let [r, techDetails] = await callFun(item);
      r.utime = new Date();
      // console.log(r);
      let score = 0;
      let kd = techDetails.kd;
      let kw = techDetails.kw;
      let details = [];
      let detail = { code: item.code, name: "", display: "", score: 0 };

      {
        let i = kd.length - 1;
        let bar0 = kd[i].MACD_DIF - kd[i].MACD_DEA;
        let bar1 = kd[i - 1].MACD_DIF - kd[i - 1].MACD_DEA;
        let bar2 = kd[i - 2].MACD_DIF - kd[i - 2].MACD_DEA;
        detail.name = "KD MACD";
        if (bar0 > bar1 && bar1 >= bar2) detail.score = 1;
        else detail.score = -1;

        details.push(Object.assign({}, detail));

        if (kd[i].KDJ_K > kd[i - 1].KDJ_K && kd[i - 2].KDJ_K > kd[i - 1].KDJ_K)
          detail.score = 1;
        else detail.score = -1;
        detail.name = "KD KDJ";
        details.push(Object.assign({}, detail));

        if (item.close >= kd[i].Average5) detail.score = 1;
        else detail.score = -1;

        detail.name = "KD MA5";
        details.push(Object.assign({}, detail));

        if (item.close >= kd[i].Average10) detail.score = 1;
        else detail.score = -1;
        detail.name = "KD MA10";
        details.push(Object.assign({}, detail));

        if (item.close >= kd[i].Average20) detail.score = 1;
        else detail.score = -1;
        detail.name = "KD MA20";
        details.push(Object.assign({}, detail));

        //上升途放量下跌可能性大
        if (item.close > kd[i].Average60 && item.volume > 2 * kd[i].volume5)
          detail.score = -2;
        else detail.score = 0;
        detail.name = "KD 上升途放量下跌可能性大";
        details.push(Object.assign({}, detail));

        //下跌放量
        if (item.close < item.open && item.volume >= 2 * kd[i - 1].volume5)
          detail.score = 1;
        else detail.score = 0;

        detail.name = "KD 下跌放量";
        details.push(Object.assign({}, detail));
      }
      {
        let i = kw.length - 1;
        let bar0 = kw[i].MACD_DIF - kd[i].MACD_DEA;
        let bar1 = kw[i - 1].MACD_DIF - kw[i - 1].MACD_DEA;
        let bar2 = kw[i - 2].MACD_DIF - kw[i - 2].MACD_DEA;
        if (bar0 > bar1 && bar1 >= bar2) detail.score = 1;
        else detail.score = -1;

        detail.name = "KW MACD";
        details.push(Object.assign({}, detail));

        if (kw[i].KDJ_K > kw[i - 1].KDJ_K && kw[i - 2].KDJ_K > kw[i - 1].KDJ_K)
          detail.score = 1;
        else detail.score = -1;
        detail.name = "KW KDJ";
        details.push(Object.assign({}, detail));
      }
      r.score = details.reduce((t, d) => t + d.score, 0);
      //console.log(r);

      await db.query(`delete from tech_detail where code=:code`, {
        replacements: {
          code: item.code,
        },
      });

      await techDetailModel.bulkCreate(details, {
        updateOnDuplicate: Object.keys(details[0]),
        logging: false,
      });

      await model.bulkCreate([r], {
        updateOnDuplicate: Object.keys(r),
        logging: false,
      });
      updatedList.push(r);
    }
  }
  return updatedList;
}

(async () => {
  // let r = await callFun({ code: "sh603369" });
  //console.log(r);
  await upDateTechDatas(true);
  console.log("done");
})();

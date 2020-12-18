import { db } from "!/db/db";
import { ifNoExistGenModel } from "!/db/utils";
import { callFun, techMaplist } from "!/TechMan";
import { getMyList, getSeaList } from "./HQws";

(async () => {
  let sampleRow = techMaplist.reduce((r, it) => {
    r["_" + it] = true;
    return r;
  }, {});
  sampleRow.code = "code";
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

  let all = await getMyList();
  all.push(...(await getSeaList()));

  for (let item of all) {
    let techs = await db.query(
      `select code from tech where code = :code and  date_add(utime, interval + 10 minute) < now()`,
      {
        type: db.QueryTypes.SELECT,
        replacements: {
          code: item.code,
        },
      }
    );
    if (techs.length == 0) {
      let r = await callFun(item);
      r.utime = new Date();
      console.log(r);
      await model.bulkCreate([r], {
        updateOnDuplicate: Object.keys(r),
        logging: true,
      });
    }
  }
})();

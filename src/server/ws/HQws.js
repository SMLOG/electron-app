import { getList } from "../TechMan";
import { getFilterList } from "../criteria";
import { JOB_MAP } from "!/jobs/worker";
import { task } from "!/jobs/jobIndex";

import { db } from "!/db/db";
import { attachExtractInfoToItems } from "!/helper";
import axios from "axios";
import { CONFIG_DIR } from "../config";
import fs from "fs";
let timer = 0;
export async function hx(fromdb = false) {
  console.log("hx timer:", timer);
  if (timer++ % 60 == 0 || fromdb) {
    await task(JOB_MAP, "行情");

    return await db.query(`select * from hq`, {
      type: db.QueryTypes.SELECT,
    });
  }

  return await getList();
}
let file = `${CONFIG_DIR}/my.json`;
export async function getMyList() {
  let list = [];

  if (fs.existsSync(file)) {
    list = JSON.parse(fs.readFileSync(file));
    await attachExtractInfoToItems(list);
  }
  return list;
}
export async function getSeaList() {
  //let list = await hx(true);
  let list = await db.query(
    `select * from hq 
    left join (select t.*,rank() OVER(PARTITION by code order by reportdate desc) as rk from v_root t ) t2 
    on t2.code=hq.code and t2.rk=1
    where pe_ttm>0 and pe_ttm<50 and close>5 and t2.扣非ROE>0.1`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  //list = await getFilterList(list);
  await attachExtractInfoToItems(list);

  console.info("getSeaList:", list.length);
  return list;
}

export async function inds() {
  let url = `http://25.push2.eastmoney.com/api/qt/clist/get?cb=cb&pn=1&pz=2000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:90+t:2&fields=f3,f14&_=1573131628403`;

  return await axios
    .get(url)
    .then((resp) => {
      return eval("function cb(d){ return d;};" + resp.data + ";");
    })
    .then((res) =>
      res.data.diff.reduce((map, item, i, arr) => {
        map[item.f14] = item.f3;
        return map;
      }, {})
    );
}

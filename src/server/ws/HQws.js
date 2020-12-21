import { getList } from "../TechMan";
import { JOB_MAP } from "!/jobs/worker";
import { task } from "!/jobs/jobIndex";

import { db } from "!/db/db";
import axios from "axios";
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
export async function getMyList() {
  return await db.query(
    `select e.*,t2.* ,h.* ,tech.* from my a 
    left join hq h on a.code = h.code 
    left join excel_gz e on e.code=a.code 
    left join t_v_root t2 
    on t2.code=a.code and t2.rank_id=1
    left join tech on tech.code = h.code 
    order by a.my_id asc`,
    {
      type: db.QueryTypes.SELECT,
      logging: console.log,
    }
  );
}
export const SEA_SQL = `select * from hq 
left join t_v_root t2 
on t2.code=hq.code and t2.rank_id=1
left join tech on tech.code = hq.code 
where 
zsz>10000000000 
and pe_ttm>0 
and pe_ttm<55 
and close>5 
and t2.毛利率>=0.25
and t2.净利率>=0.06
and t2.扣非ROE>0.15
and t2.杠杆倍数<1.6
and t2.流动比率>1.5`;
export async function getSeaList() {
  //let list = await hx(true);
  let list = await db.query(SEA_SQL, {
    type: db.QueryTypes.SELECT,
  });
  //收入现金含量
  //list = await getFilterList(list);
  //  await attachExtractInfoToItems(list);

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

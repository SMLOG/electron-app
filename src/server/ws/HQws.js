import { getList } from "../TechMan";
import { getFilterList } from "../criteria";

import { attachExtractInfoToItems } from "../helper";
import axios from "axios";
import { CONFIG_DIR } from "../config";
import fs from "fs";

export async function hx() {
  return await getList();
}
let file = `${CONFIG_DIR}/my.json`;
export function getMyList() {
  let list = [];

  if (fs.existsSync(file)) {
    list = JSON.parse(fs.readFileSync(file));
  }
  return list;
}
export async function getSeaList() {
  let list = [];
  list = await getList();
  await attachExtractInfoToItems(list);

  list = await getFilterList(list);
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

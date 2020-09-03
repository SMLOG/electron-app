import { fetchEval, rid, timeout } from "./utils";
import { isNotTradeTime } from "./getTable";

import storejs from "storejs";

export async function getAllInd(indMap) {
  let getIndItems = async ([indCode, indName]) => {
    let cb = rid("indi");

    let iurl = `/api/hq/ind?indCode=${indCode}&cb=${cb}`;

    let p = new Promise((resolve, reject) => {
      window[cb] = function(data) {
        resolve(data);
      };
    });
    await fetchEval([iurl]);
    let respi = await p;
    delete window[cb];

    for (let k = 0; k < respi.data.diff.length; k++) {
      let it = respi.data.diff[k];
      let code = (it.f12.substring(0, 1) == "6" ? "sh" : "sz") + it.f12;

      storejs.set(code, indName);
    }
  };
  let getAllIndCurPrice = async () => {
    let cb = rid("ind");
    let url = `/api/hq/indlist?cb=${cb}`;

    let p = new Promise((resolve, reject) => {
      window[cb] = function(data) {
        resolve(data);
      };
    });
    await fetchEval([url]);
    let resp = await p;
    delete window[cb];

    for (let i = 0; i < resp.data.diff.length; i++) {
      let item = resp.data.diff[i];
      storejs.set(item.f14, item.f3);
      indMap[item.f14] = item.f3;
    }
    return resp.data.diff;
  };

  let indlist = await getAllIndCurPrice();
  indlist = indlist.map((item) => [item.f12, item.f14]);
  for (let i = 0; i < indlist.length; i++) {
    await getIndItems(indlist[i]);
  }

  for (;;) {
    await timeout(5 * 1000);
    if (isNotTradeTime()) continue;

    await getAllIndCurPrice();
  }
}
window.getAllInd = getAllInd;

import { fetchEval } from "./utils";
import { getCacheData, cache } from "./db";

export async function getAllInd() {
  let resp = await getCacheData(null, "industry", async () => {
    let cb = "cb" + +new Date();
    let url = `http://25.push2.eastmoney.com/api/qt/clist/get?cb=${cb}&pn=1&pz=2000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:90+t:2&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f222&_=1573131628403`;

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
      let indCode = item.f12;
      let cb = "cb" + +new Date();

      let iurl = `http://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=500&po=1&np=1&ut=b2884a393a59ad64002292a3e90d46a5&fltt=2&invt=2&fid=f62&fs=b:${indCode}&stat=1&fields=f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124&rt=52437752&cb=${cb}&_=1573132586640`;

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

        await getCacheData(null, "ind_" + code, function() {
          return item.f14;
        });
      }
    }
    return resp;
  });

  return resp;
}
getAllInd();
window.getAllInd = getAllInd;

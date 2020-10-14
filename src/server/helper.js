import { load, JOB_MAP } from "./jobs/worker";

function prefixKey(prefix, data) {
  if (data)
    return Object.keys(data).reduce((newData, key) => {
      let newKey = prefix + key;
      newData[newKey] = data[key];
      return newData;
    }, {});
  else return {};
}
export async function attachExtractInfoToItems(list) {
  let yj = load(JOB_MAP.业绩);
  let disclose = load(JOB_MAP.预约披露日期列表);

  for (let i = 0; i < list.length; i++) {
    let code = list[i].code;
    // list[i].basic = await fn.cacheObject(fnGetFinBasic, code);
    Object.assign(list[i], prefixKey("业绩_", yj[code]));

    list[i].预约披露日期 = disclose[code];

    //let tdata = await fn.cacheObject(fnTechData, list[i]);
    //list[i] = Object.assign(list[i], tdata);
  }
}

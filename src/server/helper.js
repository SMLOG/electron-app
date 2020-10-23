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
  /*let mapDatas = {};
  for (let key in JOB_MAP) {
    mapDatas[key] = load(JOB_MAP[key]);
  }
  for (let i = 0; i < list.length; i++) {
    let code = list[i].code;

    for (let key in JOB_MAP) {
      Object.assign(
        list[i],
        prefixKey(JOB_MAP[key].alias || key + "_", mapDatas[key][code])
      );
    }*/
  //let tdata = await fn.cacheObject(fnTechData, list[i]);
  //list[i] = Object.assign(list[i], tdata);
  //}
}

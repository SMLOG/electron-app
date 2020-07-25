import { tech, getKlineData, getList } from "./TechMan";
import { kUtil } from "./util";
import fs from "fs";
import os from "os";
import { name as appName } from "./package.json";
import { getFilterList } from "./criteria";
(async () => {
  let list = await getList();

  list = await getFilterList(list);
  console.log(list);
  list.map((e) => {
    console.log(e.name, e.code, e.close, e.pe_ttm, e.PEG);
  });
  process.exit(0);
  /*let time = +new Date();
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let code = item.code.replace("sh", "1.").replace("sz", "0.");

    let datas = await getKlineData(code);
    console.log(datas);

    let techDatas = tech(datas.data.klines);

    let [weekDatas, monthDatas, yearDatas] = kUtil.mw(
      techDatas,
      techDatas[techDatas.length - 1],
      null,
      null,
      0 / 0
    );
    let weekTechs = tech(weekDatas);
    console.log(weekTechs);
    console.log(techDatas);

    let appDataFolder = `${os.homedir()}/.${appName}/datas/${code.substr(
      0,
      4
    )}`;
    if (!fs.existsSync(appDataFolder)) {
      fs.mkdirSync(appDataFolder, { recursive: true });
    }

    fs.writeFileSync(
      `${appDataFolder}/${code}_tech.json`,
      JSON.stringify([techDatas, weekDatas, monthDatas, yearDatas])
    );
    let aTime = ((+new Date() - time) / (i - 1) / 1000).toFixed(2);

    console.log(
      `avg:${aTime}s, ${aTime * (list.length - i)}s, ${i + 1}/${
        list.length
      } ,write ${code} to ${appDataFolder}/${code}_tech.json`
    );
  }*/
})();

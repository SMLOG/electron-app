import { CONFIG_DIR } from "../config";
import { attachExtractInfoToItems } from "../helper";

import fs from "fs";
let file = `${CONFIG_DIR}/my.json`;
function getlist() {
  let list = [];

  if (fs.existsSync(file)) {
    list = JSON.parse(fs.readFileSync(file));
  }
  return list;
}
class MyController {
  static async list(ctx) {
    let list = getlist();
    await attachExtractInfoToItems(list);
    return (ctx.body = list);
  }
  static add(ctx) {
    let items = getlist();
    let item = ctx.request.body;
    console.log(item);

    if (items.filter((it) => it.code == item.code).length == 0) {
      items.push(item);
      fs.writeFileSync(file, JSON.stringify(items));
    }
    return (ctx.body = items);
  }
  static put(ctx) {
    let items = ctx.request.body;
    console.log(items);

    fs.writeFileSync(file, JSON.stringify(items));

    return (ctx.body = items);
  }
  static remove(ctx) {
    let items = getlist();
    let item = ctx.request.body;
    console.log(item);

    if (items.filter((it) => it.code == item.code).length > 0) {
      item = items.filter((it) => it.code == item.code)[0];
      console.log(item, items.indexOf(item));
      items.splice(items.indexOf(item), 1);
      fs.writeFileSync(file, JSON.stringify(items));
    }

    return (ctx.body = items);
  }
}
export default MyController;
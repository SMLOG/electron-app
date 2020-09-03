"use strict";
import { getList } from "./TechMan";
import { getFilterList } from "./criteria";
import fs from "fs";
import { CONFIG_DIR } from "./config";
import { cacheObject, fnGetFinBasic } from "./basicAnalyst";
import My from "./controller/MyController";
import HQController from "./controller/HQController";
const koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");

const app = new koa();
onerror(app);
app.use(logger());
app.use(bodyparser());
//跨域请求和options请求
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});
let routerHome = new Router();
routerHome.get("/", async (ctx) => {
  ctx.body = "欢迎欢迎6！";
});

let routerApi = new Router();
routerApi.get("/cookie", async (ctx) => {
  ctx.response.type = "text/javascript";
  let content = "";

  if (ctx.request.query.cookie) {
    fs.writeFileSync(CONFIG_DIR + "/cookie", ctx.request.query.cookie);
  } else if (fs.existsSync(CONFIG_DIR + "/cookie")) {
    content = ("" + fs.readFileSync(CONFIG_DIR + "/cookie"))
      .split(";")
      .map((e) => "document.cookie='" + e.trim() + "';")
      .join("\n");
  }
  ctx.body = content;
});
routerApi.get("/sea", async (ctx) => {
  //let cb = ctx.request.query.callback;
  //ctx.type = "text";

  let list = [];
  list = await getList();

  for (let i = 0; i < list.length; i++) {
    let info = await cacheObject(fnGetFinBasic, list[i].code);
    list[i] = Object.assign(list[i], info);
    //console.log(`${i}/${list.length} => ${list[i].code}`);
    // console.log(info);
    //console.log(list[i]);
  }

  list = await getFilterList(list);

  ctx.body = list;
});
routerApi.get("/hxlist", async (ctx) => {
  let list = [];
  try {
    list = await getList();
  } catch (err) {
    console.log(err);
  }

  ctx.body = list;
});

routerApi.post("/my", My.add);
routerApi.get("/my", My.list);
routerApi.delete("/my", My.remove);
routerApi.put("/my", My.put);
routerApi.get("/hq/indlist", HQController.indlist);
routerApi.get("/hq/ind", HQController.ind);

let router = new Router();
router.use("/", routerHome.routes(), routerHome.allowedMethods());
router.use("/api", routerApi.routes(), routerApi.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "hello word";
});

console.log("start2");
//app.listen(3000);

process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e);
  process.exit(0);
});
module.exports = app;

/*
(async () => {
  let list = [];
  list = await getList();

  for (let i = 0; i < list.length; i++) {
    let info = await cacheObject(fnGetFinBasic, list[i].code);
    list[i] = Object.assign(list[i], info);
    // console.log(info);
    console.log(list[i]);
  }
})();*/

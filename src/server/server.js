"use strict";
import { getList } from "./TechMan";
import { getFilterList } from "./criteria";
import fs from "fs";
import { CONFIG_DIR } from "./config";

const koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");

const app = new koa();
app.use(logger());
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

let router = new Router();
router.use("/", routerHome.routes(), routerHome.allowedMethods());
router.use("/api", routerApi.routes(), routerApi.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "hello word";
});

console.log("start");
app.listen(3000);

process.on("uncaughtException", () => {});

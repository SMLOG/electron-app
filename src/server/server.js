"use strict";
import { getList } from "./TechMan";
import { getFilterList } from "./criteria";

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
  ctx.body = "欢迎欢迎5！";
});

let routerApi = new Router();
routerApi.get("/list", async (ctx) => {
  let cb = ctx.request.query.callback;
  ctx.type = "text";

  let list = await getList();

  list = await getFilterList(list);

  ctx.body = cb + "(" + JSON.stringify(list) + ")";
});
let router = new Router();
router.use("/", routerHome.routes(), routerHome.allowedMethods());
router.use("/api", routerApi.routes(), routerApi.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "hello word";
});

export const server = app.listen(3000);

"use strict";
const koa = require("koa");
const Router = require("koa-router");
const app = new koa();

let routerHome = new Router();
routerHome.get("/", async (ctx) => {
  ctx.body = "欢迎欢迎！";
});

let routerApi = new Router();
routerApi.get("/data1", async (ctx) => {
  let cb = ctx.request.query.callback;
  ctx.type = "text";
  ctx.body = cb + "(" + '"数据"' + ")";
});
let router = new Router();
router.use("/", routerHome.routes(), routerHome.allowedMethods());
router.use("/api", routerApi.routes(), routerApi.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "hello word";
});

app.listen(3000);

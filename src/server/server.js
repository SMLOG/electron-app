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
routerApi.get("/sea", async (ctx) => {
  //let cb = ctx.request.query.callback;
  //ctx.type = "text";

  let list = await getList();

  list = await getFilterList(list);

  ctx.body = list;
});
routerApi.get("/hxlist", async (ctx) => {
  let list = await getList();

  ctx.body = list;
});

let router = new Router();
router.use("/", routerHome.routes(), routerHome.allowedMethods());
router.use("/api", routerApi.routes(), routerApi.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "hello word";
});
let failRetry = async () => {
  for (let i = 0; i < 10; i++) {
    try {
      let server = app.listen(3000);
      break;
    } catch (err) {
      console.log(err);
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
  }
};
failRetry();
/*
process.on("exit", function(code) {
  console.log("**********");
  server.close();
});
process.on("uncaughtException", function(e) {
  console.log(e);
  // 异常可以选择不退出
  process.exit(1000);
});
process.on("SIGINT", function() {
  process.exit(1001);
});

process.on("SIGTERM", function() {
  process.exit(1002);
});*/

"use strict";
import axios from "axios";
import { getList } from "./TechMan";
import { getFilterList } from "./criteria";
import fs from "fs";
import { CONFIG_DIR } from "./config";
import { attachExtractInfoToItems } from "./helper";
import My from "./controller/MyController";
import HQController from "./controller/HQController";
import DataController from "./controller/DataController";
const koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");

const URL = require("url");

function proxyContentReplace(baseUrl, content) {
  return content.replace(/(<(\S+)(\s.*?)(src|href)=")(.*?)"/gi, function() {
    let fromUrl = arguments[5];
    let tag = arguments[1];

    let toUrl = URL.resolve(baseUrl, fromUrl);

    return `${arguments[1]}/proxy/${toUrl}"`;
  });
}

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
/*routerHome.get("/", async (ctx) => {
  ctx.body = "欢迎欢迎6！";
});*/

const request = require("request");

routerHome.get("img", async function(ctx, next) {
  await new Promise(function(resolve, reject) {
    var req = request(
      {
        method: "GET",
        encoding: null,
        // uri: 'http://images5.fanpop.com/image/photos/30900000/beautiful-pic-different-beautiful-pictures-30958249-1600-1200.jpg'
        uri: "http://seopic.699pic.com/photo/40014/3406.jpg_wh1200.jpg",
      },
      function(err, response, body) {
        if (err) {
          return reject(err);
        }
        resolve(body);
      }
    );
  })
    .then((body) => {
      ctx.status = 200;
      ctx.type = "jpg";
      console.log(Buffer.isBuffer(body));
      ctx.length = Buffer.byteLength(body);
      ctx.body = body;
    })
    .catch((err) => {
      console.error(err);
    });
});
routerHome.get("proxy/(.*?)", async (ctx) => {
  let url = ctx.request.url.replace("/proxy/", "");

  delete ctx.query.url;

  await new Promise(function(resolve, reject) {
    var req = request(
      {
        method: "GET",
        encoding: null,
        uri: url,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        },
      },
      function(err, resp, body) {
        if (err) {
          return reject(err);
        }
        ctx.set("Content-Type", resp.headers["content-type"]);
        ctx.body =
          (resp.headers["content-type"].indexOf("text/html") > -1 &&
            proxyContentReplace(url, body.toString())) ||
          body;

        ctx.length = Buffer.byteLength(ctx.body);
        resolve();
      }
    );
  });
  if (false)
    await axios
      .get(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        },
      })
      .then((resp) => {
        console.log(url, resp.headers["content-type"]);
        ctx.body =
          (resp.headers["content-type"].indexOf("text/html") > -1 &&
            proxyContentReplace(url, resp.data)) ||
          (resp.headers["content-type"].indexOf("json") > -1 &&
            JSON.stringify(resp.data)) ||
          resp.data;
        ctx.set("Content-Type", resp.headers["content-type"]);
        console.log(resp);
        console.log(Buffer.isBuffer(ctx.body));
        ctx.length = Buffer.byteLength(ctx.body);
      })
      .catch((e) => {
        console.error(e);
      });
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
  await attachExtractInfoToItems(list);

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
for (let i in DataController) {
  console.log(i);
  routerApi.get("/" + i, DataController[i]);
}
router.use("/", routerHome.routes(), routerHome.allowedMethods());
router.use("/api", routerApi.routes(), routerApi.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = "hello word";
});

console.log("start2");
//app.listen(3000);

module.exports = app;

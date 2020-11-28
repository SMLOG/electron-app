"use strict";

const chalk = require("chalk");
const path = require("path");
const { say } = require("cfonts");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackHotMiddleware = require("webpack-hot-middleware");

const webConfig = require("./webpack.web.config");

let hotMiddleware;

function logStats(proc, data) {
  let log = "";

  log += chalk.yellow.bold(
    `┏ ${proc} Process ${new Array(19 - proc.length + 1).join("-")}`
  );
  log += "\n\n";

  if (typeof data === "object") {
    data
      .toString({
        colors: true,
        chunks: false,
      })
      .split(/\r?\n/)
      .forEach((line) => {
        log += "  " + line + "\n";
      });
  } else {
    log += `  ${data}\n`;
  }

  log += "\n" + chalk.yellow.bold(`┗ ${new Array(28 + 1).join("-")}`) + "\n";

  console.log(log);
}

function startWeb() {
  return new Promise((resolve, reject) => {
    /* rendererConfig.entry.renderer = [path.join(__dirname, "dev-client")].concat(
      rendererConfig.entry.web
    );*/
    webConfig.mode = "development";
    const compiler = webpack(webConfig);
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500,
    });

    compiler.hooks.compilation.tap("compilation", (compilation) => {
      compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(
        "html-webpack-plugin-after-emit",
        (data, cb) => {
          hotMiddleware.publish({ action: "reload" });
          cb();
        }
      );
    });

    compiler.hooks.done.tap("done", (stats) => {
      logStats("Renderer", stats);
    });

    const server = new WebpackDevServer(compiler, {
      contentBase: path.join(__dirname, "../"),
      quiet: true,
      open: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": false,
      },
      before(app, ctx) {
        app.use(hotMiddleware);
        ctx.middleware.waitUntilValid(() => {
          resolve();
        });
      },
      proxy: {
        "/socket.io": {
          target: "http://localhost:3000",
          ws: true,
          changeOrigin: true,
        },
        "/sockjs-node": {
          target: "http://localhost:3000",
          ws: false,
          changeOrigin: true,
        },
        "/api/*": {
          target: "http://localhost:3000",
        },
        "/proxy": {
          target: "http://localhost:3000",
        },
        "/p/*": {
          target: "http://f10.eastmoney.com",
          changeOrigin: true,
          ws: false,
          pathRewrite: {
            "^/p": "/",
          },
        },
        "/f10/*": {
          target: "http://f10.eastmoney.com",
          changeOrigin: true,
          ws: false,
          pathRewrite: {
            "^/f10": "/",
          },
        },
        "/reportData/*": {
          target: "https://bdstatics.eastmoney.com/web/prd/",
          ws: false,
          changeOrigin: true,
        },
      },
    });

    server.listen(9080);
  });
}

function greeting() {
  const cols = process.stdout.columns;
  let text = "";

  if (cols > 104) text = "electron-vue";
  else if (cols > 76) text = "electron-|vue";
  else text = false;

  if (text) {
    say(text, {
      colors: ["yellow"],
      font: "simple3d",
      space: false,
    });
  } else console.log(chalk.yellow.bold("\n  electron-vue"));
  console.log(chalk.blue("  getting ready...") + "\n");
}

function init() {
  greeting();

  startWeb();
}

init();

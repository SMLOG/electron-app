"use strict";

const chalk = require("chalk");
const electron = require("electron");
const path = require("path");
const { say } = require("cfonts");
const { spawn } = require("child_process");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackHotMiddleware = require("webpack-hot-middleware");

const mainConfig = require("./webpack.main.config");
const rendererConfig = require("./webpack.renderer.config");
const serverConfig = require("./webpack.server.config");

let electronProcess = null;
let serverProcess = null;
let manualRestart = false;
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

function startHotloadRenderer() {
  return new Promise((resolve, reject) => {
    rendererConfig.entry.renderer = [path.join(__dirname, "dev-client")].concat(
      rendererConfig.entry.renderer
    );
    rendererConfig.mode = "development";
    const compiler = webpack(rendererConfig);
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
      before(app, ctx) {
        app.use(hotMiddleware);
        ctx.middleware.waitUntilValid(() => {
          resolve();
        });
      },
      proxy: {
        "/api/*": {
          target: "http://localhost:3000",
        },
      },
    });

    server.listen(9080);
  });
}

function startHotloadServer() {
  return new Promise((resolve, reject) => {
    serverConfig.entry.main = [
      path.join(__dirname, "../src/server/index.dev.js"),
    ].concat(serverConfig.entry.main);
    serverConfig.mode = "development";
    const compiler = webpack(serverConfig);

    compiler.hooks.watchRun.tapAsync("watch-run", (compilation, done) => {
      logStats("Server", chalk.white.bold("compiling..."));
      //hotMiddleware.publish({ action: "compiling" });
      done();
    });

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      if (serverProcess && serverProcess.kill) {
        // process.kill(serverProcess.pid);
        //process.kill(serverProcess.pid);

        serverProcess = null;
        setTimeout(() => {
          // startHotloadServer();
        }, 3000);
      }
      logStats("Server", stats);

      resolve();
    });
  });
}

function startHotloadMain() {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [
      path.join(__dirname, "../src/main/index.dev.js"),
    ].concat(mainConfig.entry.main);
    mainConfig.mode = "development";
    const compiler = webpack(mainConfig);

    compiler.hooks.watchRun.tapAsync("watch-run", (compilation, done) => {
      logStats("Main", chalk.white.bold("compiling..."));
      //hotMiddleware.publish({ action: "compiling" });
      done();
    });

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }

      logStats("Main", stats);
      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid);
        process.kill(electronProcess.pid);

        setTimeout(() => {
          // startElectron();
          manualRestart = false;
        }, 3000);
      }
      resolve();
    });
  });
}

function startElectron() {
  var args = [
    "--inspect=5858",
    path.join(__dirname, "../dist/electron/main.js"),
  ];

  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith("yarn.js")) {
    args = args.concat(process.argv.slice(3));
  } else if (process.env.npm_execpath.endsWith("npm-cli.js")) {
    args = args.concat(process.argv.slice(2));
  }

  electronProcess = spawn(electron, args);

  electronProcess.stdout.on("data", (data) => {
    electronLog(data, "blue");
  });
  electronProcess.stderr.on("data", (data) => {
    electronLog(data, "red");
  });

  electronProcess.on("close", () => {
    if (!manualRestart) process.exit();
  });
}
function startKoaService() {
  var args = [path.join(__dirname, "../dist/server/main.js")];

  serverProcess = spawn("node", args);

  serverProcess.stdout.on("data", (data) => {
    electronLog(data, "blue");
  });
  serverProcess.stderr.on("data", (data) => {
    electronLog(data, "red");
  });

  serverProcess.on("close", () => {
    electronLog("koa close", "red");
  });
}

function electronLog(data, color) {
  let log = "";
  data = data.toString().split(/\r?\n/);
  data.forEach((line) => {
    log += `  ${line}\n`;
  });
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold("┏ Electron -------------------") +
        "\n\n" +
        log +
        chalk[color].bold("┗ ----------------------------") +
        "\n"
    );
  }
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

  Promise.all([
    startHotloadRenderer(),
    startHotloadMain(),
    //  startHotloadServer(),
  ])
    .then(() => {
      //  startKoaService();
      startElectron();
    })
    .catch((err) => {
      console.error(err);
    });

  process.on("SIGINT", function() {
    console.log("Exit now!");
    serverProcess.kill("SIGINT");
    process.exit();
  });
}

init();

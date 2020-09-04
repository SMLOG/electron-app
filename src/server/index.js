const app = require("./server");
const debug = require("debug")("demo:server");
const http = require("http");
import { hx, inds } from "./ws/HQws";
/**
 * Get port from environment and store in Express.
 */
// 将端口号设置为配置文件的端口号，默认值为3000
const port = normalizePort("3000");
// 打印输出端口号
console.log("当前监听端口号为： " + port);

// app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app.callback());
const io = require("socket.io")(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
const sleep = (t) => new Promise((res, rej) => setTimeout(res, t));

const moment = require("moment");

// socket.io
io.of("socket.io").on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  (async () => {
    for (; true; ) {
      try {
        let list = await hx();
        socket.broadcast.emit("broadcast", list);
        await sleep(2000);
        let indmap = await inds();
        socket.broadcast.emit("inds", indmap);
      } catch (e) {}
    }
  })();

  socket.on("echo", (msg) => {
    console.log("echo from client: ", msg);
    socket.emit("echo", msg);
  });
});
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
process.on("uncaughtException", function(err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

var cluster = require("cluster");

var numCPUs = require("os").cpus().length;
const app = require("./server");

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; ++i) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  var http = require("http");
  var httpPort = 3000;
  var httpServer = http.createServer(app).listen(httpPort, function() {
    console.log("process id local", process.pid);
    console.log("http server started at port " + httpPort);
  });
}

process.on("uncaughtException", function(err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

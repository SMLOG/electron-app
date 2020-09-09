const moment = require("moment");
import { techMaplist } from "../TechMan";
import { initmem } from "./mem";
const sleep = (t) => new Promise((res, rej) => setTimeout(res, t));

function init(server) {
  const io = require("socket.io")(server);
  // socket.io
  io.of("socket.io").on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    initmem(socket);

    socket.on("echo", (msg) => {
      console.log("echo from client: ", msg);
      socket.emit("echo", msg);
    });
  });
}

export default init;

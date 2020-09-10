const moment = require("moment");
import { initmem } from "./mem";

function init(server) {
  const io = require("socket.io")(server);
  // socket.io
  initmem(io.of("socket.io"));
}

export default init;

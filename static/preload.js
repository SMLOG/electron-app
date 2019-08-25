let electron = require("electron");
let win = electron.remote.getCurrentWindow();
let timerID;
document.addEventListener("mouseleave", event => {
  timerID = setTimeout(() => {
    window.close();
  }, 1000);
  //console.log(event);
});
document.addEventListener("mouseenter", event => {
  if (timerID) clearTimeout(timerID);
  //console.log(event);
});
document.addEventListener("mousedown", function(e) {
  switch (e.button) {
    case 0:
      biasX = e.x;
      biasY = e.y;
      document.addEventListener("mousemove", moveEvent);
      break;
    case 2:
      electron.ipcRenderer.send("createSuspensionMenu");
      break;
  }
});

document.addEventListener("mouseup", function() {
  biasX = 0;
  biasY = 0;
  document.removeEventListener("mousemove", moveEvent);
});

function moveEvent(e) {
  win.setPosition(e.screenX - biasX, e.screenY - biasY);
}

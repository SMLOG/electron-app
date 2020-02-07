export function mouseDragMenu(electron, isDrag = false) {
  let biasX = 0;
  let biasY = 0;
  let win = electron.remote.getCurrentWindow();
  document.addEventListener("mousedown", function(e) {
    switch (e.button) {
      case 0:
        biasX = e.x;
        biasY = e.y;
        if (isDrag) document.addEventListener("mousemove", moveEvent);
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
}

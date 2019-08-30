let electron = require("electron");
let win = electron.remote.getCurrentWindow();
let timerID;

document.addEventListener("mouseleave", event => {

  timerID = setInterval(() => {
    let mousePos = electron.remote.screen.getCursorScreenPoint();
    let winSize = win.getSize();
    let winPos = win.getPosition();
    if (mousePos.x < winPos[0] || mousePos.x > (winPos[0] + winSize[0]) || mousePos.y < winPos[1] || mousePos.y > (winPos[1] + winSize[1])) {
      clearInterval(timerID);
      window.close();
    }
  }, 500);


  /**
   *  let mousePos = electron.remote.screen.getCursorScreenPoint();
    let winSize = win.getSize();
    let winPos = win.getPosition();
    if (event.clientX > 20 && event.clientX < (winSize[0] - 20) && event.clientY > 20 && event.clientY < (winSize[1] - 20)) {
  
    } else {
      timerID = setTimeout(() => {
        window.close();
      }, 1000);
    }
   */
  //console.log(event);
});
document.addEventListener("mouseenter", event => {
  if (timerID) clearTimeout(timerID);
  //console.log(event);
});
document.addEventListener("mousedown", function (e) {
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

document.addEventListener("mouseup", function () {
  biasX = 0;
  biasY = 0;
  document.removeEventListener("mousemove", moveEvent);
});

function moveEvent(e) {
  win.setPosition(e.screenX - biasX, e.screenY - biasY);
}

if (location.href.indexOf("eastmoney") > 0) {
  $(document).ready(() => {
    $("#adDTT,.stock-footer,.comm-footer")
      .hide()
      .height(0)
      .width(0);
    $("body").css("padding-top", 0);
  });
} else {
  //sina
  $(document).ready(() => {
    $(
      "#tuiex,.calendar-title,#tbanner,header,nav,footer,iframe,.hq-news-title,#f_blank,#HQBox_Names_Add,#HQBox_Names"
    )
      .hide()
      .height(0)
      .width(0);

    $("#HQBox_Main .hqbox-detail-row")
      .eq(0)
      .click();
    //$("#HQBox_Main").css({ "background-color": "white", color: "black" });
  });
}

$('head').append(`<style type="text/css">::-webkit-scrollbar {
  max-width: 5px;
}

::-webkit-scrollbar-track {
  background: #ddd;
}

::-webkit-scrollbar-thumb {
  background: #666;
}</style>`);

let electron = require("electron");
let win = electron.remote.getCurrentWindow();
let timerID;

let wsize = win.getSize();
document.addEventListener("mouseleave", event => {
  timerID = setInterval(() => {
    let mousePos = electron.screen.getCursorScreenPoint();
    let wPos = win.getPosition();

    if (
      mousePos.x < wPos[0] ||
      mousePos.x > wPos[0] + wsize[0] ||
      mousePos.y < wPos[1] ||
      mousePos.y > wPos[1] + wsize[1]
    ) {
      window.close();
    }
    //alert(mousePos.x)
  }, 500);
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

if (location.href.indexOf("eastmoney") > 0) {
  $(document).ready(() => {
    $("#adDTT,.stock-footer,.comm-footer")
      .hide()
      .height(0)
      .width(0);
    $("body").css("padding-top", 0);
    $(window).scroll(() => {
      var contentH = $("body").get(0).scrollHeight;
      var viewH = $(this).height();
      var scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      if (viewH + scrollTop >= contentH) {
        //do stuff
        loadmorgubadata();
      }
    });
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

let electron = require("electron");

document.addEventListener("mousedown", function(e) {
  switch (e.button) {
    case 2:
      electron.ipcRenderer.send("createSuspensionMenu");
      break;
  }
});

if (location.href.indexOf("eastmoney") > 0) {
  $(document).ready(() => {
    $("#adDTT,#stock_uk_top,.stock-footer,.comm-footer")
      .hide()
      .height(0)
      .width(0);
    $("body").css("padding-top", 0);
    $("#chartTab li[imgt='MK']").click();
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

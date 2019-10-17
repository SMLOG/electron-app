if (location.href.indexOf("eastmoney") > 0) {
  $(document).ready(() => {
    $(".topnav,.qqsj,.gubanews,#adDTT,.stock-footer,.comm-footer")
      .hide()
      .height(0)
      .width(0);
    $("body").css("padding-top", 0);
    $(".main").css("padding", 0);
    $(".main").css("height", "auto");
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

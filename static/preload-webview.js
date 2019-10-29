var $ = jQuery;
$(document).ready(() => {
  $(
    ".stock-page-live,.AD_hqbottom,.hq_R,.attention,.hq-finapp-sh-new,.hq_details,.L,.nav,.secondaryHeader,.wrap.topAD,#hq_main_top_tgWrap,.topBlk,.footer,.loginLayer,.tui,.topbar,.hq_title,.hq_details has_limit,.hq_related,.hq_notice,.blk-tg-tzy03"
  )
    .hide()
    .height(0)
    .width(0);
  $(".R").css("width", "100%");
  $(".main_wrap").css("margin-top", 0);
  $("#h5Container").css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 10000,
    backgroundColor: "white"
  });

  $("#HQBox_Main .hqbox-detail-row")
    .eq(0)
    .click();
  //$("#HQBox_Main").css({ "background-color": "white", color: "black" });
});

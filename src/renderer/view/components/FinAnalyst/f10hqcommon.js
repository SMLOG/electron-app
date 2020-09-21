
function requestQstr(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href))
        return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};
//锚点定位
function GoToMaoDian(a, b) {
    null != b && (EM(b).siblings("a").removeClass("current"),
    EM(b).addClass("current"));
    var c = 139;
    //"ipad" != browserName.match(/iPad/i)    && (-1 == window.location.search.indexOf("soft") && (EM("#top-nav").hasClass("tip-topNav") || (EM("#top-nav").addClass("tip-topNav"), EM(".subnav").addClass("tip-nav"))), c = 139);
    var d = EM("#" + a).offset();
    null != d && window.scrollTo(0, d.top - c);
    var temp = document.getElementById("top-nav");

    if (a == "thygg" || a == "tdygg" || a == "tgngg" || a == "dstx") {
        EM(".subnav").removeClass("tip-nav");
        if (!(temp == null || temp == undefined)) {
            document.getElementById("top-nav").setAttribute("class", "qphox");
        }
    }
}

function GoToMaoDian22(a, b) {
    if (b != null) {
        EM(b).siblings("a").removeClass("current");
        EM(b).addClass("current");
    }
    var c = 0;
    if (browserName.match(/iPad/i) != "ipad" && window.location.search.indexOf("soft") == -1) {
        c = 139;
    }
    var d = EM("#" + a).offset();
    if (d != null) {
        window.scrollTo(0, d.top - c);
    }
    var temp = document.getElementById("top-nav");
    if (!(temp == null || temp == undefined)) {
        document.getElementById("top-nav").setAttribute("class", "qphox");
    }
}

function LocateRightMenu() {
    if (200 < EM(window).height())
        EM("#RightMenu").css("top", "" + (.5 * (EM(window).height() - 200) + getScroll()) + "px");
    else
        EM("#RightMenu").css("top", "" + ((EM(window).height() - 200) + getScroll()) + "px");
}
function getScroll() {
    var a;
    return document.documentElement && document.documentElement.scrollTop ? a = document.documentElement.scrollTop : document.body && (a = document.body.scrollTop),
    a
}
var browserName = navigator.userAgent.toLowerCase()
  , Browser = {
      version: (browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
      safari: /webkit/i.test(browserName) && !this.chrome,
      opera: /opera/i.test(browserName),
      firefox: /firefox/i.test(browserName),
      ie: /msie/i.test(browserName) && !/opera/.test(browserName),
      mozilla: /mozilla/i.test(browserName) && !/(compatible|webkit)/.test(browserName) && !this.chrome,
      chrome: /chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)
  };

EM(document).ready(function () {
    var a = window.location.hash;
    if ("ipad" != browserName.match(/iPad/i)) {
        var b = EM(".main:eq(0)").width();
        if (EM("#RightMenu").css("left", "" + ((document.body.clientWidth - b) / 2 + b + 9) + "px"),
        EM("#RightMenu").css("top", .5 * (EM(window).height() - 200) + "px"),
        -1 != a.indexOf("#")) {
            var c = a.split("#");
            -1 != c[1].indexOf("-") && (c = c[1].split("-"),
            GoToMaoDian(c[0], EM("#" + c[0] + "_a")))
        }
    } else
        EM("#RightMenu").remove();
    //if (-1 != window.location.search.indexOf("soft") && -1 == window.location.search.indexOf("hq=0"))
    if (window.location.search.indexOf("soft") > 0 || window.location.search.indexOf("color=w") > 0) {
        var d = requestQstr("code")
          , e = d.substring(0, 2)
          , f = d.substring(2, d.length);
        f += "sh" == e ? "1" : "2"

    }
}),

EM(window).scroll(function () {

    if ("ipad" != browserName.match(/iPad/i) && (LocateRightMenu(),
    -1 == window.location.search.indexOf("soft"))) {
        var a = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (a > 392) {
            EM("#divBody").css("margin-top", "120px");
            EM("#top-nav").addClass("tip-topNav");
            EM(".subnav").addClass("tip-nav");
        }
        else {
            EM("#divBody").css("margin-top", "0px");
            EM("#top-nav").removeClass("tip-topNav");
            EM(".subnav").removeClass("tip-nav")
        }
    }
}),
EM(window).resize(function () {
    if (EM("#RightMenu").length > 0) {
        var a = EM(".main:eq(0)").width();
        EM("#RightMenu").css("left", "" + ((document.body.clientWidth - a) / 2 + a + 9) + "px"),
        LocateRightMenu()
    }
});
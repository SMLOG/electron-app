xh5_define("ppt.ppt", ["utils.util"], function(e) {
  "use strict";
  function t(e) {
    function t(e) {
      i.set(k, e, g);
    }
    function a() {
      return i.get(k);
    }
    function l(e, t) {
      for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n]);
    }
    function p(e) {
      var t = e.getAttribute("data-page");
      t > 0 &&
        ((e.parentNode.style.display = "none"),
        (e.parentNode.parentNode.parentNode.childNodes[--t].style.display =
          "block")),
        (_ = t);
    }
    function r(e) {
      var n = Number(e.getAttribute("data-page"));
      ++n,
        (_ = n),
        isNaN(n) || n >= kke_tool_demo.pages.length
          ? ((e.parentNode.parentNode.parentNode.style.display = "none"),
            t("know"))
          : ((e.parentNode.style.display = "none"),
            (e.parentNode.parentNode.parentNode.childNodes[n].style.display =
              "block"));
    }
    function s(e) {
      t("know"), (e.parentNode.style.display = "none");
    }
    function c() {
      var t = o(e.userObj.dom_id),
        i = n("div");
      l(i, kke_tool_demo.container), t.appendChild(i);
      for (var c, u, k, g, h, f, v = 0; v < kke_tool_demo.pages.length; v++) {
        (c = n("div")),
          l(c, kke_tool_demo.container),
          i.appendChild(c),
          (u = n("div")),
          (k = n("div")),
          (h = n("div")),
          (g = n("span")),
          (f = n("button")),
          c.appendChild(h),
          h.appendChild(g),
          h.appendChild(u),
          h.appendChild(k),
          h.appendChild(f),
          l(u, kke_tool_demo.pages[v].prev),
          l(k, kke_tool_demo.pages[v].next),
          l(h, kke_tool_demo.pages[v].bg),
          l(g, kke_tool_demo.pages[v].context),
          l(f, kke_tool_demo.pages[v].close),
          (g.innerHTML = kke_tool_demo.pages[v].context.text),
          (f.innerHTML = "x"),
          u.setAttribute("data-page", String(v)),
          k.setAttribute("data-page", String(v));
        var m = function(e) {
          d.preventDefault(e), p(d.getTarget(e));
        };
        d.addHandler(u, "touchend", m), d.addHandler(u, "click", m);
        var y = function(e) {
          r(d.getTarget(e)), d.preventDefault(e);
        };
        d.addHandler(k, "touchend", y), d.addHandler(k, "click", y);
        var N = function(e) {
          s(d.getTarget(e)), d.preventDefault(e);
        };
        d.addHandler(f, "touchend", N),
          d.addHandler(f, "click", N),
          v > 0 && (c.style.display = "none");
      }
      e.menu.al(
        "KKE_MENU_CLICK_TAB",
        function() {
          a() ||
            ("ts" != e.menu.chooseTab.tab &&
              "t5" != e.menu.chooseTab.tab &&
              "kdd" != e.menu.chooseTab.tab &&
              "kcl" != e.menu.chooseTab.tab &&
              setTimeout(function() {
                (i.style.display = ""), (i.childNodes[_].style.display = "");
              }, 300));
        },
        !1
      );
    }
    function u() {
      a() || (window.kke_tool_demo && c());
    }
    var k = "kke_CnLv1_PPT_v2",
      _ = 0,
      g = {
        domain: "",
        path: "/",
        expires: 71996400
      };
    u();
  }
  var n = e.$C,
    o = e.$DOM,
    a = e.isFunc,
    d = e.xh5_EvtUtil,
    i = e.cookieUtil;
  return new (function() {
    (this.VER = "1.0.4"),
      (this.get = function(e, n) {
        var o = new t(e);
        a(n) && n(o);
      });
  })();
});

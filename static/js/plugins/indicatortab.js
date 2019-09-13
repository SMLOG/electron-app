xh5_define("plugins.indicatortab", ["utils.util"], function(utils_util) {
  "use strict";

  function i(i) {
      function o(i) {
          if (!i) return void 0;
          utils_util.isArr(i) || (i = [i]);
          for (var n, a = [], e = 0, r = i.length; r > e; e++)
              (n = {
                  name: i[e]
              }),
              a.push(n);
          return a;
      }

      function l() {
          function t(t) {
              e.save({
                  options: {
                      mode: "cookie",
                      path: "/",
                      expires: 71996400
                  },
                  uid: ["kke_indicator_news", new Date().getTime()].join("|"),
                  key: "kke_indicator_news",
                  value: t
              });
          }

          function n() {
              var t = !1;
              return (
                  e.load({
                          options: "cookie",
                          uid: [
                              "kke_indicator_news",
                              new Date().getTime(),
                              Math.floor(987654321 * Math.random() + 1)
                          ].join("|"),
                          key: "kke_indicator_news"
                      },
                      function(i) {
                          return '"BRAR"' == i ? ((t = i), !0) : (t = !1);
                      },
                      !0
                  ),
                  t
              );
          }

          function r(t) {
              n() ||
                  ("k" == i.type &&
                      ((u.main.ctn = a("span")),
                          h.appendChild(u.main.ctn),
                          s(t, u.main.ctn),
                          o()));
          }

          function o() {
              var t,
                  i = f.childNodes,
                  e = i.length;
              if (!n())
                  for (t = 0; e > t; t++)
                      i[t].getAttribute("data-indicator") == u.child.name[0] &&
                      ((u.child.ctn = a("span")),
                          i[t].appendChild(u.child.ctn),
                          s(u.child, u.child.ctn));
          }

          function l() {
              n() ||
                  ((u.main.ctn.style.display = u.child.ctn.style.display = "none"),
                      t(u.child.name[0]));
          }

          function s() {}

          function c(t) {
              h = t;
          }

          function d(t) {
              f = t;
          }
          var h,
              f,
              u = {
                  main: {
                      ctn: void 0,
                      position: "absolute",
                      display: "block",
                      text: "",
                      radius: 15
                  },
                  child: {
                      ctn: void 0,
                      num: 0,
                      left: "0px",
                      position: "relative",
                      display: "none",
                      name: ["BRAR"],
                      text: "",
                      radius: 7
                  }
              };
          return {
              cfg: u,
              displayAllCircle: l,
              initChildCircle: o,
              initCircle: r,
              getChildParentCtn: d,
              getMainParentCtn: c
          };
      }

      function s() {
          var n,
              a,
              e,
              o = "data-indicator",
              l = 50,
              s = new(function() {
                  var s = function() {
                          for (var n, e = a.childNodes.length; e--;)
                              (n = a.childNodes[e]),
                              utils_util.cssUtil.rmCls(n, i.cssclass.active);
                      },
                      c = function(n) {
                          r.preventDefault(n);
                          var a = r.getTarget(n);
                          y = a;
                          var e = a.getAttribute(o);
                          if (((w = e), e)) {
                              s(), utils_util.cssUtil.adCls(a, i.cssclass.active);
                              for (
                                  var l = []
                                      .concat(m)
                                      .concat({
                                          name: e
                                      })
                                      .concat(C),
                                      c = b.length; c--;

                              )
                                  b[c].tCharts(l, {
                                      isexclusive: !0
                                  });
                              "无" == e && (e = "none_indicator"),
                                  e == x.cfg.child.name && x.displayAllCircle(),
                                  utils_util.suda(i.type + "_" + e);
                          }
                      },
                      h = function(t) {
                          r.preventDefault(t);
                          var i = r.getTarget(t),
                              n = i.getAttribute("data-dir");
                          d.drawTabs(n), x.initChildCircle();
                      };
                  this.init = function() {
                      (e = utils_util.$C("div")),
                      (n = utils_util.$C("div")),
                      (a = utils_util.$C("ul")),
                      r.addHandler(e, "click", h),
                          utils_util.xh5_deviceUtil.allowt &&
                          r.addHandler(e, "touchend", h),
                          r.addHandler(a, "click", c),
                          utils_util.xh5_deviceUtil.allowt &&
                          r.addHandler(a, "touchend", c),
                          i.arrowleft ?
                          ((e.style.styleFloat = e.style.cssFloat = "left"),
                              (e.style.margin = [0, 9, 0, i.posX, ""].join("px ")),
                              (n.style.margin = [0, i.rightW, 0, i.posX + l, ""].join(
                                  "px "
                              ))) :
                          ((e.style.styleFloat = e.style.cssFloat = "right"),
                              (e.style.margin = [0, i.rightW, 0, 0, ""].join("px ")),
                              (n.style.margin = [0, l + i.rightW, 0, i.posX, ""].join(
                                  "px "
                              )));
                      var o = a.style;
                      (o.listStyle = "none"),
                      (o.padding = 0),
                      (o.margin = 0),
                      n.appendChild(a),
                          v && v.appendChild(e),
                          v && v.appendChild(n),
                          x.getChildParentCtn(a),
                          x.getMainParentCtn(e);
                  };
              })(),
              c = new(function() {
                  function n(n) {
                      var a = utils_util.$C("span");
                      return (
                          (a.className = i.cssclass.arrow),
                          (a.innerHTML = n ? "▲" : "▼"),
                          a.setAttribute("data-dir", n ? "-1" : "1"),
                          a
                      );
                  }
                  var a, r;
                  (this.init = function() {
                      (a = new n(!0)), (r = new n()), e.appendChild(a), e.appendChild(r);
                  }),
                  (this.changeColor = function(t) {
                      a.style.color = r.style.color = t ? "#000" : "#ccc";
                  });
              })(),
              d = new(function() {
                  var e = 0;
                  (this.activeTab = function() {
                      var n = a.childNodes[i.active];
                      n &&
                          (utils_util.cssUtil.adCls(n, i.cssclass.active),
                              (y = n),
                              (w = n.getAttribute(o)));
                  }),
                  (this.drawTabs = function(r) {
                      var l = n.offsetWidth,
                          s = Math.min(7, Math.floor(l / (k + 2))),
                          d = g.length;
                      c.changeColor(d > s), isNaN(r) && (r = 0);
                      var h = e + r * s;
                      0 > h ? (h = 0) : h >= d && (h = e), (e = h);
                      for (
                          var f, p = Math.min(d, h + s), v = p - h; a.childNodes.length < v;

                      )
                          (f = utils_util.$C("li")), a.appendChild(f);
                      for (; a.childNodes.length > v;) a.removeChild(a.lastChild);
                      for (; p > h; h++) {
                          var m = g[h],
                              C = u(m) || m;
                          (f = a.childNodes[h - e]),
                          (f.innerHTML = C),
                          f.setAttribute(o, m),
                              (f.className = i.cssclass.normal),
                              w === m && utils_util.cssUtil.adCls(f, i.cssclass.active),
                              (f.style.width = k + "px");
                      }
                  });
              })();
          s.init(), c.init(), d.drawTabs(), d.activeTab();
      }

      function c() {
          var n = [
              "list-style:none",
              "float:left",
              "background:#efefef",
              "border:1px solid #d5d5d5",
              "color:#888",
              "margin-left:-1px",
              "line-height:" + i.tabheight + "px",
              "text-align:center",
              "font-size:12px",
              "cursor:pointer"
          ];
          n = "." + p.normal + "{" + n.join(";") + "}";
          var a = ["background:#494949; color:#fff; border-color:#999;"];
          a = "." + p.active + "{" + a.join(";") + "}";
          var e = [
              "float:left; width:20px; cursor:pointer; text-align:center; margin:0 1px; border:1px solid #eee;",
              "line-height:" + i.tabheight + "px"
          ];
          e = "." + p.arrow + "{" + e.join(";") + "}";
          var r = "." + p.arrow + ":hover {filter:Alpha(Opacity=60);opacity:0.6;}",
              o = n + a + e + r;
          utils_util.cssUtil.inject(o);
      }
      var d = [
              "VOLUME",
              "MACD",
              "KDJ",
              "RSI",
              "BOLL",
              "WR",
              "DMI",
              "BBIBOLL",
              "ROC",
              "PSY",
              "OBV",
              "WVAD",
              "CCI",
              "TRIX",
              "DMA",
              "EXPMA",
              "BIAS",
              "ASI"
          ],
          h = ["TVOL", "LB"],
          f = [{
                  name: "TFLOW",
                  alias: "净买入"
              },
              {
                  name: "LB",
                  alias: "量比"
              },
              {
                  name: "POSITION",
                  alias: "持仓量"
              },
              {
                  name: "TZYS",
                  alias: "收益对比"
              },
              {
                  name: "DPDKS",
                  alias: "多空收益"
              }
          ],
          u = function(t) {
              for (var i, n, a = f.length; a--;)
                  if (((n = f[a]), n.name.toUpperCase() == t.toUpperCase())) {
                      i = n.alias;
                      break;
                  }
              return i;
          },
          p = {
              normal: "kke_indicators_tab_normal",
              active: "kke_indicators_tab_active",
              arrow: "kke_indicators_tab_arrow"
          };
      i = n({
              posX: 54,
              rightW: 1,
              tabwidth: 61,
              tabheight: 20,
              type: "k",
              domid: void 0,
              charts: void 0,
              tabs: void 0,
              fix: {
                  firsts: void 0,
                  lasts: void 0
              },
              cssclass: {
                  normal: p.normal,
                  active: p.active,
                  arrow: p.arrow
              },
              arrowleft: !0,
              active: 0
          },
          i || {}
      );
      var v = utils_util.$DOM(i.domid),
          g = i.tabs || ("k" == i.type ? d : h),
          m = o(i.fix.firsts),
          C = o(i.fix.lasts),
          b = i.charts;
      utils_util.isArr(b) || (b = [b]);
      var y,
          w,
          k = i.tabwidth,
          x = new l();
      c(),
          s(),
          "hf_" != i.domid.split("__")[1].substring(0, 3) &&
          x.initCircle({
              display: "block",
              text: 1,
              radius: 15
          }),
          (this.getCurrentTab = function() {
              return y;
          }),
          (this.getCurrentIndicatorName = function() {
              return w;
          });
  }
  var n = utils_util.oc,
      a = utils_util.$C,
      e = utils_util.bridge,
      r = utils_util.xh5_EvtUtil;
  return new(function() {
      (this.VER = "1.2.4"),
      (KKE.cls.IndicatorTab = i),
      (this.get = function(config, callback) {
          var e = new i(config);
          utils_util.isFunc(callback) && callback(e);
      });
  })();
});
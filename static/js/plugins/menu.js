xh5_define("plugins.menu", ["utils.util"], function(e) {
  "use strict";

  function t(t) {
      function i(a) {
          var n = "touzi_pc_v2_market_today";
          if (t.user_obj.mt && "cntouzi2" == t.user_obj.mt)
              switch (a) {
                  case "ts":
                  case "t1":
                      e.suda(n + "_05", null, n);
                      break;
                  case "t5":
                      e.suda(n + "_06", null, n);
                      break;
                  case "kcl":
                      e.suda(n + "_07", null, n);
                      break;
                  case "kdd":
                      e.suda(n + "_08", null, n);
                      break;
                  case "kd":
                      e.suda(n + "_09", null, n);
                      break;
                  case "kw":
                      e.suda(n + "_10", null, n);
                      break;
                  case "km":
                      e.suda(n + "_11", null, n);
                      break;
                  case "k5":
                      e.suda(n + "_12", null, n);
                      break;
                  case "k15":
                      e.suda(n + "_13", null, n);
                      break;
                  case "k30":
                      e.suda(n + "_14", null, n);
                      break;
                  case "k60":
                      e.suda(n + "_15", null, n);
              }
      }

      function u(e) {
          r.preventDefault(e), r.stopPropagation(e);
          var t = r.getTarget(e);
          if (
              (t.getAttribute("data-a") && (t = t.parentNode),
                  L != t || "more" === t.getAttribute("data-view"))
          ) {
              L = t;
              var a = t.innerHTML;
              if (a) {
                  if ("more" === t.getAttribute("data-view")) return void I(t);
                  A(),
                      o(f) && (o(f).style.display = "none"),
                      R(t),
                      w.setPPT("none"),
                      F(t),
                      (w.chooseTab.tab = t.getAttribute("data-view")),
                      w.re("KKE_MENU_CLICK_TAB", null);
              }
          }
      }

      function p(a) {
          for (var n, o, i = v.length, r = 0; i > r; r++) {
              (n = v[r].tChart), (o = v[r].kChart), n && n.hide();
              var s = new Date(),
                  l = new Date();
              if (o) {
                  o.show();
                  var c = a.getAttribute("data-view");
                  switch (c) {
                      case "km12":
                          s.setDate(s.getDate() - 264);
                          break;
                      case "km1":
                          s.setDate(s.getDate() - 22);
                          break;
                      case "km3":
                          s.setDate(s.getDate() - 66);
                          break;
                      case "kcl":
                  }
                  if ("km1" == c || "km3" == c || "km12" == c)
                      o.showYTD(), o.dateFromTo(s, l);
                  else if ("ytd" == c) o.showYTD();
                  else if ("kdd" == c)
                      e.suda("m_bs"),
                      ("cnlv1" == t.user_obj.mt ||
                          "cnlv2" == t.user_obj.mt ||
                          "cntouzi2" == t.user_obj.mt ||
                          "cnlv1wap" == t.user_obj.mt) &&
                      ((O = 1),
                          o.showView("kd"),
                          w.setPPT("block"),
                          o.setDimension({
                              I_V_O: 0
                          }),
                          o.pCharts(
                              [{
                                  name: t.user_obj.DKpChart
                              }], {
                                  isexclusive: !0,
                                  noLog: 1
                              }
                          ),
                          "cnlv1wap" != t.user_obj.mt ?
                          o.tCharts(
                              [{
                                      name: t.user_obj.DKtChart
                                  },
                                  {
                                      name: "volume"
                                  }
                              ], {
                                  isexclusive: !0,
                                  noLog: 1
                              }
                          ) :
                          o.tCharts(
                              [{
                                  name: t.user_obj.DKtChart
                              }], {
                                  isexclusive: !0,
                                  noLog: 1
                              }
                          ),
                          "TZY" == t.user_obj.DKpChart && o.setReK(-1),
                          o.setLineStyle({
                              linetype: "solid"
                          }));
                  else if ("k1" == c) {
                      o.showView(c),
                          o.setLineStyle({
                              linetype: "line"
                          }),
                          o.pCharts(null, {
                              toremove: !0,
                              noLog: 1
                          });
                      var u = 60 * s.getTimezoneOffset() * 1e3;
                      s.setTime(s.getTime() + u),
                          s.setHours(s.getHours() + 4),
                          (l = new Date(99999, 9, 9)),
                          o.dateFromTo(s, l),
                          KKE.api(
                              "patch.forex.newhqtime", {
                                  symbol: t.user_obj.symbol,
                                  timeSymbol: "sys_time",
                                  interval: 30,
                                  offset: 30
                              },
                              function(e) {
                                  e &&
                                      o.pushData({
                                          symbol: t.user_obj.symbol,
                                          data: e
                                      });
                              }
                          ),
                          o.showRangeSelector({
                              from: s,
                              to: l
                          });
                  } else {
                      if (
                          "cnlv1" == t.user_obj.mt ||
                          "cnlv2" == t.user_obj.mt ||
                          "cntouzi2" == t.user_obj.mt ||
                          "cnlv1wap" == t.user_obj.mt
                      ) {
                          if (O > 0) {
                              O = 0;
                              var p;
                              if ("cnlv1wap" != t.user_obj.mt)
                                  switch (
                                      (t.user_obj.indicatorTabLogger.h5k &&
                                          (p = t.user_obj.indicatorTabLogger.h5k.getCurrentIndicatorName()),
                                          (p = p || "MACD"),
                                          x)
                                  ) {
                                      case "HF":
                                      case "global_index":
                                          o.tCharts(
                                              [{
                                                      name: p
                                                  },
                                                  {
                                                      name: "BLANKCTN"
                                                  }
                                              ], {
                                                  isexclusive: !0,
                                                  callback: function() {
                                                      1 == m && ((m = 2), t.user_obj.indicatorTab(o));
                                                  },
                                                  noLog: 1
                                              }
                                          );
                                          break;
                                      default:
                                          o.tCharts(
                                              [{
                                                      name: "VOLUME"
                                                  },
                                                  {
                                                      name: p
                                                  },
                                                  {
                                                      name: "BLANKCTN"
                                                  }
                                              ], {
                                                  isexclusive: !0,
                                                  callback: function() {
                                                      1 == m && ((m = 2), t.user_obj.indicatorTab(o));
                                                  },
                                                  noLog: 1
                                              }
                                          );
                                  }
                              else
                                  o.tCharts(
                                      [{
                                          name: "MACD"
                                      }], {
                                          isexclusive: !0,
                                          noLog: 1
                                      }
                                  );
                              "kcl" == c
                                  ?
                                  o.pCharts([], {
                                      isexclusive: !0,
                                      callback: function() {
                                          b.kChart.setCustom.show_underlay_vol &&
                                              o.setCustom({
                                                  show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                              });
                                      },
                                      noLog: 1
                                  }) :
                                  o.pCharts(b.kChart.pCharts, {
                                      isexclusive: !0,
                                      callback: function() {
                                          b.kChart.setCustom.show_underlay_vol &&
                                              o.setCustom({
                                                  show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                              });
                                      },
                                      noLog: 1
                                  }),
                                  o.setDimension({
                                      I_V_O: -22
                                  });
                          } else
                              "kcl" == c ?
                              o.showView(c) :
                              o.pCharts(b.kChart.pCharts, {
                                  isexclusive: !0,
                                  callback: function() {
                                      b.kChart.setCustom.show_underlay_vol &&
                                          o.setCustom({
                                              show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                          });
                                  },
                                  noLog: 1
                              });
                          h(t.user_obj.symbol) &&
                              a.getAttribute("data-id") &&
                              o.setReK("cnlv1wap" == t.user_obj.mt ? 0 : b.kChart.setReK);
                      }
                      o.showView(c),
                          ("forex" == t.user_obj.market ||
                              "forex_yt" == t.user_obj.market ||
                              "BTC" == t.user_obj.market) &&
                          o.pCharts(b.kChart.pCharts, {
                              isexclusive: !0,
                              callback: function() {
                                  b.kChart.setCustom.show_underlay_vol &&
                                      o.setCustom({
                                          show_underlay_vol: b.kChart.setCustom.show_underlay_vol
                                      });
                              },
                              noLog: 1
                          }),
                          "kcl" !== c &&
                          o.setLineStyle({
                              linetype: b.kChart.setLineStyle.linetype
                          });
                  }
                  a.getAttribute("data-id") ?
                      a.childNodes[1] && (a.childNodes[1].style.display = "none") :
                      (a.parentNode && (a.parentNode.style.display = "none"),
                          ("CN" != x && "HK" !== x) ||
                          !a.getAttribute("data-rek") ||
                          (o.setReK(Number(a.getAttribute("data-rek"))),
                              (E = a.getAttribute("data-rek")),
                              (b.kChart.setReK = a.getAttribute("data-rek")),
                              d.save({
                                  uid: [
                                      t.user_obj.CFGSETTING_IFRAME_PREFIX,
                                      new Date().getTime()
                                  ].join("|"),
                                  key: t.user_obj.CFGSETTING_IFRAME_PREFIX,
                                  value: b
                              })));
              } else
                  a.childNodes[1] && (a.childNodes[1].style.display = "none"),
                  "kdd" !== a.getAttribute("data-view") && (m = 2),
                  v[r].initK(
                      null,
                      a.getAttribute("data-view"),
                      a.getAttribute("data-rek")
                  ),
                  a.getAttribute("data-rek") &&
                  ((E = a.getAttribute("data-rek") || _ || 0),
                      a.parentNode && (a.parentNode.style.display = "none"));
          }
      }

      function h(e) {
          return /^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(e);
      }
      e.xh5_EvtDispatcher.call(this);
      var b = t.user_obj.settingCfg,
          v = [],
          g = {
              tab: [{
                      lab: "分时",
                      v: "ts",
                      t: "T"
                  },
                  {
                      lab: "5日",
                      v: "t5",
                      t: "T"
                  },
                  {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                  },
                  {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                  },
                  {
                      lab: "月K",
                      v: "km",
                      t: "K"
                  },
                  {
                      lab: "5分",
                      v: "k5",
                      t: "K"
                  },
                  {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                  },
                  {
                      lab: "30分",
                      v: "k30",
                      t: "K"
                  },
                  {
                      lab: "60分",
                      v: "k60",
                      t: "K"
                  },
                  {
                      lab: "更多",
                      v: "more",
                      t: "K"
                  }
              ],
              clsName: {
                  normal: "kke_menus_tab_normal",
                  edage: "kke_menus_tab_edage",
                  active: "kke_menus_tab_active",
                  active_a: "kke_menus_tab_active_a",
                  rek: "kke_menus_tab_rek",
                  more: "kke_menus_tab_more",
                  up: "kke_menu_tab_up",
                  down: "kke_menu_tab_down"
              },
              clsStyle: {
                  cnnormal: "{width:39px;height:25px;line-height:25px;margin-top:3px;float:left;background:#EFF5FF;border:1px solid #EFF5FF;color:#08237a;text-align:center;font-size:12px;cursor:pointer;}",
                  normal: "{width:43px;height:25px;line-height:25px;margin-top:3px;float:left;background:#EFF5FF;border:1px solid #EFF5FF;color:#08237a;text-align:center;font-size:12px;cursor:pointer;}",
                  active: "{background-color:#ffffff;border-top:2px solid #062784;border-left:1px solid #dde4f4;border-right:1px solid #dde4f4;border-bottom:1px solid #ffffff;cursor:pointer;}",
                  active_a: "{border-bottom:2px #3990e6 solid;display:inline-block;color:#3990e6;}",
                  edage: "{width:100%;height:30px;border-top: 1px solid #dde4f4;border-bottom: 1px solid #dde4f4;background-color: #EFF5FF;position: relative;z-index: 233;}",
                  rek: "{list-style:none;border:1px solid #dde4f4;margin-bottom:-1px;height:23px;line-height:23px;text-align:center;cursor:pointer;background-color:#EFF5FF;}"
              }
          },
          k = {
              normal: "{height:35px;line-height:35px;position:relative;float:left;background:#ffffff;border:1px solid #ffffff;color:#1a1a1a;text-align:center;font-size:14px;cursor:pointer;}",
              active: "{background-color:#ffffff;color:#3990e6;border-left:1px solid #ffffff;border-right:1px solid #ffffff;cursor:default;}",
              active_a: "{border-bottom:2px #3990e6 solid;margin-bottom:-2px;display:inline-block;color:#3990e6;}",
              edage: "{width:100%;height:37px;border-top: 1px solid #dde4f4;border-bottom: 1px solid #dde4f4;background-color: #ffffff;position: relative;z-index: 233;font-weight:bold;}",
              rek: "{list-style:none;border:1px solid #f0f0f0;margin-bottom:-1px;height:33px;line-height:33px;text-align:center;cursor:pointer;background-color:#f0f0f0;color:#1a1a1a;}",
              more: '{position: absolute;width: 13px;height: 9px;background-image:url("//www.sinaimg.cn/cj/finance_images/ua_ico.png");float: left;top:50%;margin-top:-4px;left: 50%;margin-left: 12px;}',
              up: "{background-position: 2px -105px;}",
              down: "{background-position: 2px -78px;}"
          };
      (t.iswap || t.menu_wapmore) && (g.clsStyle = k);
      var f = "KKE_more_" + 12345 * Math.random();
      (t = n({
              type: "C",
              tchart: void 0,
              kchart: void 0,
              menu_dom_id: void 0,
              active: 0,
              tab: [{
                      lab: "分时",
                      v: "ts",
                      t: "T"
                  },
                  {
                      lab: "5日",
                      v: "t5",
                      t: "T"
                  },
                  {
                      lab: "日K",
                      v: "kd",
                      t: "K"
                  },
                  {
                      lab: "周K",
                      v: "kw",
                      t: "K"
                  },
                  {
                      lab: "月K",
                      v: "km",
                      t: "K"
                  },
                  {
                      lab: "5分",
                      v: "k5",
                      t: "K"
                  },
                  {
                      lab: "15分",
                      v: "k15",
                      t: "K"
                  },
                  {
                      lab: "30分",
                      v: "k30",
                      t: "K"
                  },
                  {
                      lab: "60分",
                      v: "k60",
                      t: "K"
                  },
                  {
                      lab: "更多",
                      v: "more",
                      t: "K"
                  }
              ],
              tabPosX: 15,
              clsName: {
                  edage: g.clsName.edage,
                  normal: g.clsName.normal,
                  active: g.clsName.active,
                  active_a: g.clsName.active_a,
                  rek: g.clsName.rek,
                  more: g.clsName.more || void 0,
                  up: g.clsName.up || void 0,
                  down: g.clsName.down || void 0
              },
              menu_rek: void 0,
              cb: void 0,
              me: void 0,
              menu_wapmore: void 0,
              user_obj: {
                  symbol: "sh000001"
              },
              more: void 0
          },
          t || {}
      )),
      t.me && v.push(t.me);
      var _,
          w = this,
          K = o(t.menu_dom_id),
          C = t.active || 0,
          y = t.tab || g.tab,
          T = [],
          N = [],
          x = e.market((t.user_obj && t.user_obj.symbol) || "sh000001"),
          S = function(e, a) {
              var n = a.normal,
                  o = a.active,
                  i = a.edage,
                  r = a.rek;
              ("cnlv1" == t.user_obj.mt || "cnlv2" == t.user_obj.mt) &&
              (n = a.cnnormal),
              (n = "." + e.normal + n + "\n"),
              (o = "." + e.active + o + "\n"),
              (i = "." + e.edage + i + "\n"),
              (r = "." + e.rek + r + "\n");
              var s = n + o + i + r;
              if (t.iswap || t.menu_wapmore) {
                  var c = a.active_a,
                      d = a.active_a,
                      m = a.more,
                      u = a.up,
                      p = a.down;
                  (c = "." + e.active + " a" + c + "\n"),
                  (d = "." + e.active_a + d + "\n"),
                  (m = "." + e.more + m + "\n"),
                  (u = "." + e.up + u + "\n"),
                  (p = "." + e.down + p + "\n");
                  var h = t.iswap ?
                      "" :
                      "." + e.normal + " a:hover" + a.active_a + "\n";
                  s += c + d + h + m + u + p;
              }
              l.inject(s);
          },
          D = function() {
              var e = T[C];
              e && l.adCls(e, t.clsName.active);
          },
          A = function() {
              for (var e, a = T.length; a--;)
                  (e = T[a]),
                  l.rmCls(e, t.clsName.active),
                  l.rmCls(e.childNodes[0], t.clsName.active),
                  l.rmCls(e.childNodes[0], t.clsName.active_a);
              for (var n, o = N.length; o--;)
                  (n = N[o]),
                  l.rmCls(n.childNodes[0], t.clsName.active_a),
                  l.rmCls(n, t.clsName.active);
          };
      this.chooseTab = {
          tye: "T",
          tab: "t1"
      };
      var L,
          I = function(e) {
              "" == e.childNodes[2].style.display ?
                  ((e.childNodes[2].style.display = "none"),
                      l.rmCls(e.childNodes[1], t.clsName.up),
                      l.adCls(e.childNodes[1], t.clsName.down)) :
                  ((e.childNodes[2].style.display = ""),
                      l.rmCls(e.childNodes[1], t.clsName.down),
                      l.adCls(e.childNodes[1], t.clsName.up));
          },
          R = function(a) {
              if (a.getAttribute("data-id"))
                  if (
                      (("k5" !== a.getAttribute("data-view") &&
                              "k15" !== a.getAttribute("data-view") &&
                              "k30" !== a.getAttribute("data-view") &&
                              "k60" !== a.getAttribute("data-view") &&
                              "km3" !== a.getAttribute("data-view") &&
                              "km1" !== a.getAttribute("data-view") &&
                              "km12" !== a.getAttribute("data-view")) ||
                          (!t.iswap && !t.menu_wapmore) ||
                          (l.rmCls(a.parentNode.parentNode.childNodes[1], t.clsName.up),
                              l.adCls(a.parentNode.parentNode.childNodes[1], t.clsName.down),
                              l.adCls(a.parentNode.parentNode.childNodes[0], t.clsName.active),
                              l.adCls(
                                  a.parentNode.parentNode.childNodes[0],
                                  t.clsName.active_a
                              )),
                          t.menu_wapmore)
                  )
                      l.adCls(a.childNodes[0], t.clsName.active_a);
                  else {
                      var n = e.getCSS(a).color;
                      l.adCls(a, t.clsName.active),
                          a.childNodes[1] && (a.childNodes[1].style.color = n);
                  }
              else
                  t.menu_wapmore ?
                  l.adCls(a.parentNode.parentNode.childNodes[0], t.clsName.active_a) :
                  l.adCls(a.parentNode.parentNode, t.clsName.active);
          },
          F = function(e) {
              var a = v.length;
              if ("T" == e.getAttribute("data-type")) {
                  for (var n, o, r = 0; a > r; r++)
                      (n = v[r].tChart),
                      (o = v[r].kChart),
                      o && o.hide(),
                      n && (n.show(), n.showView(e.getAttribute("data-view")));
                  var s;
                  "cnlv1wap" != t.user_obj.mt &&
                      (t.user_obj.indicatorTabLogger.h5t &&
                          (s = t.user_obj.indicatorTabLogger.h5t.getCurrentIndicatorName()),
                          ("HF" == x || "global_index" == x) && (s = "X"),
                          s || 2 != m || ((m = 3), t.user_obj.indicatorTab(n))),
                      (w.chooseTab.tye = "T");
              } else(w.chooseTab.tye = "K"), p(e);
              i(e.getAttribute("data-view"));
          },
          E = 0,
          O = 9,
          M = function() {
              var e = a("div");
              K && K.appendChild(e), (e.className = t.clsName.edage);
              var n = function(n, o) {
                      o = o || 0;
                      var i = a("div");
                      T.push(i),
                          e.appendChild(i),
                          (i.className = t.clsName.normal),
                          (i.style.marginLeft = o + "px"),
                          (t.iswap || t.menu_wapmore) &&
                          (i.style.width = 100 / t.tab.length - 1 + "%"),
                          i.setAttribute("data-id", "KKE_tab_" + y[n].v),
                          i.setAttribute("data-view", y[n].v),
                          i.setAttribute("data-type", y[n].t),
                          r.addHandler(i, "click", u),
                          s.allowt && r.addHandler(i, "touchend", u),
                          "kdd" === y[n].v;
                      var l = a("a");
                      if (
                          ((l.innerHTML = y[n].lab),
                              l.setAttribute("data-a", "a"),
                              i.appendChild(l),
                              "more" == y[n].v)
                      ) {
                          var c = a("div");
                          c.setAttribute("data-a", "a"),
                              (c.className = t.clsName.more + " " + t.clsName.down),
                              i.appendChild(c);
                      }
                      return i;
                  },
                  o = function(e) {
                      var a = function(e) {
                          r.preventDefault(e),
                              r.getTarget(e).childNodes[1] &&
                              (r.getTarget(e).childNodes[1].style.display = "");
                      };
                      r.addHandler(e, "touchstart", a), r.addHandler(e, "mouseover", a);
                      var n = function(e) {
                          r.preventDefault(e);
                          var a = r.getTarget(e),
                              n = r.getRelatedTarget(e);
                          (n && a !== n && c(a, n)) ||
                          (a.childNodes[1] && (a.childNodes[1].style.display = "none")),
                          a.parentNode &&
                              a.parentNode.childNodes[1] &&
                              a.parentNode.childNodes[0].getAttribute("data-a") &&
                              !t.menu_wapmore &&
                              (a.parentNode.childNodes[1].style.display = "none");
                      };
                      r.addHandler(e, "touchend", n), r.addHandler(e, "mouseout", n);
                  },
                  i = function() {
                      for (var e = t.show, a = 0; a < y.length; a++)
                          if (!e || -1 != e.indexOf(y[a].v))
                              switch (y[a].v) {
                                  case "kd":
                                  case "kw":
                                  case "km":
                                  case "ky":
                                  case "kcl":
                                      var i = n(a);
                                      t.menu_rek &&
                                          (h(t.user_obj.symbol) && H(i),
                                              "HK" === t.user_obj.market && H(i)),
                                          o(i);
                                      break;
                                  case "more":
                                      t.more && ((i = n(a)), B(i));
                                      break;
                                  default:
                                      t.iswap || t.menu_wapmore ?
                                          n(a) :
                                          0 == a ?
                                          n(a, t.tabPosX) :
                                          n(a);
                              }
                  };
              i(), S(g.clsName, g.clsStyle), D();
          },
          H = function(e) {
              var n = a("ul");
              (n.style.display = "none"),
              (n.style.position = "relative"),
              (n.style.padding = n.style.margin = 0),
              e && e.appendChild(n);
              for (
                  var o = [{
                              lab: "后复权",
                              v: 1
                          },
                          {
                              lab: "前复权",
                              v: -1
                          },
                          {
                              lab: "不复权",
                              v: 0
                          }
                      ],
                      i = 3; i--;

              ) {
                  var s = a("li");
                  (s.className = t.clsName.rek),
                  s.setAttribute("data-rek", o[i].v),
                      s.setAttribute("data-view", e.getAttribute("data-view"));
                  var l = a("a");
                  l.setAttribute("data-a", "a"),
                      (l.innerHTML = o[i].lab),
                      s.appendChild(l),
                      n.appendChild(s),
                      r.addHandler(e, "touchend", u),
                      r.addHandler(e, "click", u);
              }
              var d = function(e) {
                  r.preventDefault(e);
                  var t = r.getTarget(e).parentNode,
                      a = r.getRelatedTarget(e),
                      n = r.getTarget(e);
                  (a && t !== a && c(t, a)) ||
                  (n.getAttribute("data-rek") && (t.style.display = "none")),
                  c(t.parentNode, a) ||
                      (t.getAttribute("data-rek") &&
                          (t.parentNode.style.display = "none"));
              };
              r.addHandler(n, "touchend", d), r.addHandler(n, "mouseout", d);
          },
          B = function(e) {
              var n = a("ul");
              (n.id = f),
              (n.style.display = "none"),
              (n.style.padding = n.style.margin = 0),
              e && e.appendChild(n);
              for (var o = t.more, i = 0, s = o.length; s > i; i++) {
                  var l = o[i],
                      d = a("li");
                  (d.className = t.clsName.rek),
                  d.setAttribute("data-id", "KKE_tab_" + l.v),
                      d.setAttribute("data-view", l.v);
                  var m = a("a");
                  m.setAttribute("data-a", "a"),
                      (m.innerHTML = l.lab),
                      d.appendChild(m),
                      n.appendChild(d),
                      r.addHandler(e, "touchend", u),
                      r.addHandler(e, "click", u),
                      N.push(d);
              }
              if (!t.iswap) {
                  var p = function(e) {
                      r.preventDefault(e);
                      var t = r.getTarget(e).parentNode.parentNode,
                          a = r.getRelatedTarget(e),
                          n = r.getTarget(e).parentNode;
                      (a && t !== a && c(t, a)) ||
                      (n.getAttribute("data-id") && (t.style.display = "none"),
                          t.getAttribute("data-view") && (n.style.display = "none"));
                  };
                  r.addHandler(n, "touchend", p), r.addHandler(n, "mouseout", p);
              }
          };
      M(),
          (this.setPPT = function(e) {
              window.chartPPT_panel && (window.chartPPT_panel.style.display = e);
          }),
          (this.setTKChart = function(e) {
              v = e;
          }),
          (this.setTarget = function(e) {
              if (((C = e), C < T.length)) {
                  (L = T[e]), A();
                  var a = T[C];
                  a && l.adCls(a, t.clsName.active);
                  for (var n = v.length; n--;) {
                      var o = v[n].kChart;
                      o && o.showView(y[C].v);
                  }
              }
          }),
          (this.setCfg = function(e) {
              b = e;
          }),
          (this.setChart = function(e) {
              if ((L && "kdd" !== L.getAttribute("data-view") && (m = 2), e && e.k)) {
                  var a;
                  for (a = 0; a < v.length; a++)
                      e.o.symbol == v[a].chartUserobj.symbol && (v[a].kChart = e.k);
                  for (
                      "CN" == x &&
                      "cnlv1wap" !== t.user_obj.mt &&
                      (E = _ = t.user_obj.settingCfg.kChart.setReK),
                      a = 0; a < v.length; a++
                  ) {
                      var n = v[a].kChart;
                      L && L.view && n.showView(L.view),
                          L &&
                          L.getAttribute("data-rek") &&
                          ("CN" === x || "HK" === x) &&
                          (n.setReK(Number(L.getAttribute("data-rek"))),
                              (b.kChart.setReK = L.getAttribute("data-rek")),
                              d.save({
                                  uid: [
                                      t.user_obj.CFGSETTING_IFRAME_PREFIX,
                                      new Date().getTime()
                                  ].join("|"),
                                  key: t.user_obj.CFGSETTING_IFRAME_PREFIX,
                                  value: b
                              })),
                          L &&
                          !L.getAttribute("data-rek") &&
                          _ &&
                          h(t.user_obj.symbol) &&
                          "kdd" != L.getAttribute("data-view") &&
                          n.setReK(_);
                  }
              }
          });
  }
  var a = e.$C,
      n = e.oc,
      o = e.$DOM,
      i = e.isFunc,
      r = e.xh5_EvtUtil,
      s = e.xh5_deviceUtil,
      l = e.cssUtil,
      c = e.$CONTAINS,
      d = e.bridge,
      m = 1;
  return (
      e.fInherit(t, e.xh5_EvtDispatcher),
      new(function() {
          (this.VER = "1.1.8"),
          (this.get = function(e, a) {
              var n = new t(e);
              i(a) && a(n);
          });
      })()
  );
});
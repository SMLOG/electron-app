xh5_define("plugins.userpanel", ["utils.util"], function(e) {
  "use strict";

  function t(e, t, a) {
      a = a || {};
      var n = l(e),
          o = n.style;
      return (
          a.left && (o.left = a.left),
          a.right && (o.right = a.right),
          a.top && (o.top = a.top),
          a.bottom && (o.bottom = a.bottom),
          a.width && (o.width = a.width),
          a.height && (o.height = a.height),
          t.appendChild(n),
          n
      );
  }

  function a(e) {
      u.preventDefault(e), u.stopPropagation(e);
  }

  function n(e) {
      function t(t) {
          p.save({
              options: {
                  mode: "cookie",
                  path: "/",
                  expires: 71996400
              },
              uid: [e.userObj.EXTEND_PERFIX, new Date().getTime()].join("|"),
              key: e.userObj.EXTEND_PERFIX,
              value: t
          });
      }

      function a() {
          var t = !1;
          return (
              p.load({
                      options: "cookie",
                      uid: [
                          e.userObj.EXTEND_PERFIX,
                          new Date().getTime(),
                          Math.floor(987654321 * Math.random() + 1)
                      ].join("|"),
                      key: e.userObj.EXTEND_PERFIX
                  },
                  function(e) {
                      e && (t = e);
                  },
                  !0
              ),
              t
          );
      }

      function n(t) {
          if (a()) return void(d = []);
          var n = l("span");
          (u.cont = n), s(t, n), c(e.userObj.dom_id).appendChild(n), o();
      }

      function o() {
          for (var t = l("span"), a = 0; a < d.length; a++)
              (d[a].child = t),
              (t.style.display = "none"),
              s(d[a], t),
              c(e.userObj.dom_id).appendChild(t);
      }

      function i(e) {
          for (var t = 0; t < d.length; t++) d[t].child.style.display = "none";
      }

      function r(e) {
          if (!(d.length <= 0)) {
              for (var a = 0, n = 0; n < d.length; n++)
                  e.name == d[n].name &&
                  ((d[n].value = 1), (d[n].child.style.display = "none")),
                  1 == d[n].value && a++;
              a == d.length &&
                  ((u.value = d.length), (u.cont.style.display = "none"), t("trade"));
          }
      }

      function s() {}
      var d = [{
          right: "0px",
          name: "trade",
          value: 0,
          child: null,
          display: "none",
          text: "",
          radius: 6
      }];
      if (e && "cntouzi2" == e.userObj.mt)
          for (var h = 0; h < d.length; h++);
      var u = {
          value: 0,
          cont: null
      };
      (this.mainCircle = n), (this.visibleChild = r), (this.childDisplay = i);
  }

  function o(t, a) {
      function n(e, t) {
          for (var a in e) e.hasOwnProperty(a) && (e[a] = t + e[a]);
      }
      var o = "sinafinancehtml5settingcfgpanel",
          i = {
              LOADED: "loaded",
              HIDE: "hide",
              EDIT: "edit",
              OPEN: "open",
              DRAGSTART: "dragstart",
              DRAGGING: "dragging"
          };
      n(i, r.CFGSETTING_IFRAME_PREFIX);
      var l,
          s,
          d,
          p,
          h = 350,
          m = 344,
          f = this,
          g = function(e) {
              var t = e.data;
              if (t)
                  switch (((t = JSON.parse(t)), t.cmd)) {
                      case i.LOADED:
                          a && a();
                          break;
                      case i.HIDE:
                          f.hide();
                          break;
                      case i.EDIT:
                          var n = t.cmd.split("~")[1];
                          s[n](t.data);
                          break;
                      case i.DRAGSTART:
                          (d = +l.style.left.replace(/[^0-9.]/g, "")),
                          (p = +l.style.top.replace(/[^0-9.]/g, ""));
                          break;
                      case i.DRAGGING:
                          var o = t.data;
                          (l.style.left = d + o.movedX + "px"),
                          (l.style.top = p + o.movedY + "px");
                  }
          },
          b = function() {
              if (!l) {
                  var a = e.xh5_BrowserUtil.noH5 ?
                      "1px solid #000" :
                      "6px solid rgba(200,200,200,0.6)";
                  (l = e.iframer({
                      attribute: {
                          id: o,
                          src: t.url
                      },
                      style: {
                          margin: "0 auto",
                          height: m + "px",
                          width: h + "px",
                          border: a,
                          position: "absolute",
                          zIndex: t.z
                      }
                  })),
                  u.addHandler(window, "message", g);
                  var n = function(e) {
                          u.preventDefault(e), u.stopPropagation(e);
                      },
                      i = e.xh5_BrowserUtil.info.name.match(/firefox/i) ?
                      "DOMMouseScroll" :
                      "mousewheel";
                  u.addHandler(l, i, n);
              }
          };
      (this.sendOriginalData = function(e, t) {
          l &&
              ((s = t),
                  l.contentWindow.postMessage(
                      JSON.stringify({
                          cmd: i.OPEN,
                          data: e
                      }),
                      "*"
                  ));
      }),
      (this.isShow = !1),
      (this.show = function(e) {
          if (l) {
              var t, a;
              e.changedTouches ?
                  ((t = e.changedTouches[0].clientX),
                      (a = e.changedTouches[0].clientY)) :
                  ((t = e.clientX), (a = e.clientY));
              var n =
                  window.innerHeight ||
                  document.documentElement.clientHeight ||
                  document.body.clientHeight,
                  o = c(r.dom_id).offsetWidth;
              a + m + 30 > n && (a = Math.max(n - m - 30, 1)),
                  (t = t > o ? t - o + (o - h) / 2 : (o - h) / 2),
                  (l.style.left = t + "px"),
                  (l.style.top =
                      (document.body.scrollTop ?
                          document.body.scrollTop :
                          document.documentElement.scrollTop) +
                      a +
                      "px"),
                  (l.style.display = ""),
                  (this.isShow = !0);
          }
      }),
      (this.hide = function() {
          (l.style.display = "none"), (this.isShow = !1);
      }),
      b();
  }

  function i(i) {
      function p() {
          function t(e) {
              return ["US", "HK", "forex"].indexOf(e) > -1;
          }

          function n(e) {
              (H = !0),
              (S = +x.left.replace(/[^0-9.]/g, "")),
              (D = +x.top.replace(/[^0-9.]/g, "")),
              e.targetTouches ?
                  ((L = e.targetTouches[0].clientX),
                      (A = e.targetTouches[0].clientY)) :
                  ((L = e.clientX), (A = e.clientY));
          }

          function o(e) {
              (T.cursor = "move"),
              H &&
                  (e.targetTouches ?
                      ((I = e.targetTouches[0].clientX - L),
                          (E = e.targetTouches[0].clientY - A)) :
                      ((I = e.clientX - L), (E = e.clientY - A)),
                      (x.left = +S + +I + "px"),
                      (x.top = +D + +E + "px"),
                      u.stopPropagation(e)),
                  u.preventDefault(e);
          }

          function s() {
              (H = !1), (T.cursor = "");
          }

          function c(e) {
              for (var t = _.length; t--;)
                  if (_[t].value == e) return t;
          }

          function d(e, t, a, n) {
              var o = l("div"),
                  i = o.style;
              (o.title = e),
              (i["float"] = "left"),
              (i.width = "26px"),
              (i.height = "26px"),
              (i.margin = "2px"),
              (i.border = "1px solid #D7DDEB"),
              (i.overflow = "hidden"),
              F.appendChild(o);
              var r = l("select"),
                  s = r.style;
              (s.width = "45px"),
              (s.height = "26px"),
              (s.lineHeight = "26px"),
              (s.margin = 0),
              (s.outline = "none"),
              (s.border = "none"),
              (s.cursor = "pointer"),
              (s.textAlign = "start"),
              (s.font = "18px 微软雅黑"),
              (s.color = "#747574"),
              (s.background = "white");
              for (var c = 0, d = t.length; d > c; c++) {
                  var p = l("option");
                  (p.value = t[c]), (p.innerHTML = a[c]), n(t[c], p), r.appendChild(p);
              }
              return o.appendChild(r), r;
          }

          function p(e, t) {
              u.addHandler(e, "click", a),
                  (e.style.cursor = "not-allowed"),
                  (e.style.backgroundPosition = t.normalPos),
                  t.value == y.param.paintTool && y.setPaintTool("Close");
          }

          function h(e) {
              u.removeHandler(e, "click", a), (e.style.cursor = "pointer");
          }

          function m(e) {
              for (var t = F.querySelectorAll("li"), a = t.length; a--;)
                  for (var n = _.length; n--;)
                      if (_[n].value == t[a].getAttribute("value")) {
                          _[n].konly && (e ? p(t[a], _[n]) : h(t[a]));
                          break;
                      }
          }
          var f = t(r.market),
              g = "//n.sinaimg.cn/finance/chartimg/painttool_icons.png",
              b = j ? e.getSUrl(g) : g,
              v = b + "?20160713",
              _ = [{
                      name: "线段",
                      value: "Segment",
                      normalPos: "-37px -35px",
                      lightPos: "-173px -35px"
                  },
                  {
                      name: "直线",
                      value: "Line",
                      normalPos: "-68px -35px",
                      lightPos: "-204px -35px"
                  },
                  {
                      name: "水平线",
                      value: "Level",
                      normalPos: "-6px -97px",
                      lightPos: "-142px -97px"
                  },
                  {
                      name: "平行线",
                      value: "ParallelLine",
                      normalPos: "-6px -66px",
                      lightPos: "-142px -66px"
                  },
                  {
                      name: "平行线段",
                      value: "ParallelSegment",
                      normalPos: "-6px -190px",
                      lightPos: "-142px -190px"
                  },
                  {
                      name: "波浪线",
                      value: "Wave",
                      normalPos: "-6px -252px",
                      lightPos: "-142px -252px"
                  },
                  {
                      name: "矩形",
                      value: "Rect",
                      normalPos: "-68px -66px",
                      lightPos: "-204px -66px"
                  },
                  {
                      name: "平行四边形",
                      value: "Parallelogram",
                      normalPos: "-37px -190px",
                      lightPos: "-173px -190px"
                  },
                  {
                      name: "三角形",
                      value: "Triangle",
                      normalPos: "-37px -252px",
                      lightPos: "-173px -252px"
                  },
                  {
                      name: "周期线",
                      value: "CycleLine",
                      normalPos: "-37px -66px",
                      lightPos: "-173px -66px"
                  },
                  {
                      name: "斐波那契周期线",
                      value: "Fibonacci",
                      normalPos: "-68px -190px",
                      lightPos: "-204px -190px"
                  },
                  {
                      name: "线性回归带(K线)",
                      value: "LinearRegressionBand",
                      normalPos: "-6px -221px",
                      lightPos: "-142px -221px",
                      konly: !0
                  },
                  {
                      name: "黄金线",
                      value: "GoldenSection",
                      normalPos: "-37px -221px",
                      lightPos: "-173px -221px"
                  },
                  {
                      name: "百分比线",
                      value: "PercentLine",
                      normalPos: "-68px -221px",
                      lightPos: "-204px -221px"
                  },
                  {
                      name: "测量尺",
                      value: "Ruler",
                      normalPos: "-6px -159px",
                      lightPos: "-142px -159px"
                  },
                  {
                      name: "上箭头",
                      value: f ? "GreenUpArrow" : "RedUpArrow",
                      normalPos: "-68px -128px",
                      lightPos: "-204px -128px"
                  },
                  {
                      name: "下箭头",
                      value: f ? "RedDownArrow" : "GreenDownArrow",
                      normalPos: "-37px -128px",
                      lightPos: "-173px -128px"
                  },
                  {
                      name: "自由箭头",
                      value: "FreeArrow",
                      normalPos: "-68px -252px",
                      lightPos: "-204px -252px"
                  },
                  {
                      name: "停止画图",
                      value: "Close",
                      normalPos: "-6px -35px",
                      lightPos: "-142px -35px",
                      once: !0
                  },
                  {
                      name: "编辑图形",
                      value: "Edit",
                      normalPos: "-37px -97px",
                      lightPos: "-173px -97px"
                  },
                  {
                      name: "文本",
                      value: "Write",
                      normalPos: "-68px -97px",
                      lightPos: "-204px -97px"
                  },
                  {
                      name: "撤销",
                      value: "Revoke",
                      normalPos: "-6px -128px",
                      lightPos: "-6px -128px",
                      once: !0
                  },
                  {
                      name: "删除选中",
                      value: "Delete",
                      normalPos: "-37px -159px",
                      lightPos: "-173px -159px"
                  },
                  {
                      name: "清空",
                      value: "Empty",
                      normalPos: "-68px -159px",
                      lightPos: "-204px -159px",
                      once: !0
                  }
              ],
              k = this,
              y = r.paintTool,
              w = l("div"),
              x = w.style;
          (x.position = "absolute"),
          (x.width = "102px"),
          (x.left = "100px"),
          (x.top = "100px"),
          (x.zIndex = 8890);
          var C = l("div"),
              T = C.style;
          (T["float"] = "left"),
          (T.width = "100%"),
          (T.height = "30px"),
          (T.lineHeight = "30px"),
          (T.border = "1px solid #A7BEE4"),
          (T.boxSizing = "border-box"),
          (T.mozBoxSizing = "border-box"),
          (T.webkitBoxSizing = "border-box"),
          (T.fontSize = "14px"),
          (T.textIndent = "5px"),
          (T.backgroundColor = "#CFDEF6"),
          (T.color = "#3D5E96"),
          (T.webkitUserSelect = "none"),
          (T.mozUserSelect = "none"),
          (T.userSelect = "none"),
          (C.innerHTML = "画图工具");
          var K = l("span"),
              N = K.style;
          (N.position = "absolute"),
          (N.height = "16px"),
          (N.width = "16px"),
          (N.right = "4px"),
          (N.top = "7px"),
          (N.background = "url(" + v + ") -81px -7px no-repeat"),
          (N.color = "#759ADC"),
          (K.title = "关闭"),
          K.setAttribute("value", "Close"),
              u.addHandler(K, "mousemove", function(e) {
                  (e.target.style.cursor = "pointer"), u.stopPropagation(e);
              }),
              u.addHandler(K, "click", function(e) {
                  k.hide(), u.stopPropagation(e);
              }),
              C.appendChild(K);
          var S,
              D,
              L,
              A,
              I,
              E,
              H = !1;
          "ontouchend" in window &&
              (u.addHandler(C, "touchstart", n),
                  u.addHandler(C, "touchmove", o),
                  u.addHandler(C, "touchend", s)),
              u.addHandler(C, "mousedown", n),
              u.addHandler(C, "mousemove", o),
              u.addHandler(C, "mouseup", s),
              u.addHandler(C, "mouseout", s),
              w.appendChild(C);
          var F = l("ul"),
              P = F.style;
          (P["float"] = "left"),
          (P.top = "30px"),
          (P.width = "100%"),
          (P.border = "1px solid #D7DCEB"),
          (P.padding = "4px 2px 4px 2px"),
          (P.backgroundColor = "#EEF3FD"),
          (P.boxSizing = "border-box"),
          (P.mozBoxSizing = "border-box"),
          (P.webkitBoxSizing = "border-box"),
          (P.listStyle = "none"),
          (P.overflow = "hidden"),
          (P.margin = 0);
          var R = null;
          u.addHandler(F, "click", function(e) {
              if ("LI" == e.target.tagName) {
                  var t,
                      a,
                      n,
                      o = e.target,
                      i = o.style,
                      r = o.getAttribute("value"),
                      l = c(r);
                  if ("undefined" != typeof l)
                      return (
                          R &&
                          ((t = c(R.getAttribute("value"))),
                              "undefined" != typeof t && (n = _[t])),
                          (a = _[l]),
                          r ?
                          void(R ?
                              o == R ?
                              a.once ?
                              y.setPaintTool(r) :
                              ((i.backgroundPosition = a.normalPos),
                                  y.setPaintTool("Close"),
                                  (R = null)) :
                              (n && (R.style.backgroundPosition = n.normalPos),
                                  y.setPaintTool(r),
                                  a.once ?
                                  (y.setPaintTool("Close"), (R = null)) :
                                  ((i.backgroundPosition = a.lightPos), (R = o))) :
                              (y.setPaintTool(r),
                                  a.once ?
                                  y.setPaintTool("Close") :
                                  ((i.backgroundPosition = a.lightPos), (R = o)))) :
                          (n && (R.style.backgroundPosition = n.normalPos),
                              (R = null),
                              void y.setPaintTool("Close"))
                      );
              }
          });
          for (var O = 0, M = _.length; M > O; O++) {
              var B = l("li"),
                  U = B.style;
              (U["float"] = "left"),
              (U.width = "28px"),
              (U.height = "28px"),
              (U.margin = "2px"),
              (U.backgroundImage = "url(" + v + ")"),
              (U.backgroundRepeat = "no-repeat"),
              (U.backgroundPosition = _[O].normalPos),
              _[O].value &&
                  ((B.title = _[O].name),
                      B.setAttribute("value", _[O].value),
                      B.setAttribute("selected", "false"),
                      u.addHandler(B, "mouseover", function(e) {
                          (P.cursor = "pointer"),
                          (e.target.style.boxShadow = "2px 2px 2px #AEC7E3");
                      }),
                      u.addHandler(B, "mouseout", function(e) {
                          (P.cursor = ""), (e.target.style.boxShadow = "");
                      })),
                  F.appendChild(B);
          }
          var z = l("div"),
              V = z.style;
          (z.title = "颜色"),
          (V["float"] = "left"),
          (V.border = "2px solid #D7DDEB"),
          (V.width = "24px"),
          (V.height = "24px"),
          (V.margin = "2px"),
          (V.backgroundColor = y.param.style.strokeStyle),
          u.addHandler(z, "click", function(t) {
                  e.colorPicker.show(
                      t.pageX - e.colorPicker.param.width / 2,
                      t.pageY,
                      this,
                      V.backgroundColor
                  );
              }),
              u.addHandler(z, "mouseover", function() {
                  V.cursor = "pointer";
              }),
              e.colorPicker.al("ok", function() {
                  z == arguments[1][1] &&
                      ((V.backgroundColor = arguments[1][0].rgb),
                          y.setStyle({
                              strokeStyle: arguments[1][0].rgb
                          }));
              }),
              F.appendChild(z);
          var X = d(
              "字号",
              ["12px", "18px", "24px"],
              ["小", "中", "大"],
              function(e, t) {
                  var a = y.param.style.font;
                  a.match(e) && t.setAttribute("selected", "true");
              }
          );
          u.addHandler(X, "change", function() {
              y.setStyle({
                  font: y.param.style.font.replace(/[\s\S]+px/, X.value)
              });
          });
          var G = d(
              "线宽",
              [1, 2, 4],
              ["细", "中", "粗"],
              function(e, t) {
                  var a = y.param.style.lineWidth;
                  a == e && t.setAttribute("selected", "true");
              }
          );
          u.addHandler(G, "change", function() {
                  y.setStyle({
                      lineWidth: G.value
                  });
              }),
              w.appendChild(F),
              (x.display = "none"),
              document.body.appendChild(w),
              i.menu.al("KKE_MENU_CLICK_TAB", function() {
                  k.isShow && m("T" == i.menu.chooseTab.tye);
              }),
              (this.isShow = !1),
              (this.show = function(e, t) {
                  this.isShow ||
                      ("undefined" != typeof e && (x.left = e + "px"),
                          "undefined" != typeof t && (x.top = t + "px"),
                          (x.display = ""),
                          (this.isShow = !0),
                          m("T" == i.menu.chooseTab.tye));
              }),
              (this.hide = function() {
                  (x.display = "none"), y.setPaintTool("Close");
                  var t;
                  R && (t = c(R.getAttribute("value"))),
                      e.isNum(t) &&
                      ((R.style.backgroundPosition = _[t].normalPos), (R = null)),
                      (this.isShow = !1);
              });
      }

      function f() {
          function t() {
              var e = i.chart.tChart || i.chart.kChart;
              return e.getSymbols()[0];
          }

          function a() {
              var e = m.load(F);
              return e ? JSON.parse(e) : void 0;
          }

          function n() {
              var e = i.chart.tChart || i.chart.kChart;
              return (
                  e.getCurrentData() &&
                  (e.getCurrentData().price || e.getCurrentData().close)
              );
          }

          function o() {
              for (
                  var e = n(),
                      t = 0,
                      a = 0,
                      o = 0,
                      i = 0,
                      r = 0,
                      l = 0,
                      s = de.childNodes,
                      c = 1,
                      d = s.length; d > c; c++
              ) {
                  var p = s[c].childNodes,
                      h = Number(p[4].innerHTML);
                  h &&
                      ("buy" == p[1].childNodes[0].value ?
                          ((t += h), (a += +p[3].childNodes[0].value)) :
                          ((t -= h), (a -= +p[3].childNodes[0].value)));
              }
              a
                  ?
                  ((o = e * a - t),
                      (i = e - o / Math.abs(a)),
                      (r = i > 0 ? ((e - i) / i) * 100 : 0),
                      (l = e * a)) :
                  (o = -t),
                  (ue.childNodes[0].innerHTML = a),
                  (ue.childNodes[1].innerHTML = i.toFixed(3)),
                  (ue.childNodes[2].innerHTML = e),
                  (ue.childNodes[3].innerHTML = r.toFixed(2)),
                  (ue.childNodes[4].innerHTML = o.toFixed(2)),
                  (ue.childNodes[5].innerHTML = l.toFixed(2)),
                  v();
          }

          function s(e) {
              (ee = !0),
              ($ = +B.left.replace(/[^0-9.]/g, "")),
              (W = +B.top.replace(/[^0-9.]/g, "")),
              e.targetTouches ?
                  ((q = e.targetTouches[0].clientX),
                      (J = e.targetTouches[0].clientY)) :
                  ((q = e.clientX), (J = e.clientY));
          }

          function c(e) {
              (z.cursor = "move"),
              ee &&
                  (e.targetTouches ?
                      ((Z = e.targetTouches[0].clientX - q),
                          (Q = e.targetTouches[0].clientY - J)) :
                      ((Z = e.clientX - q), (Q = e.clientY - J)),
                      (B.left = +$ + +Z + "px"),
                      (B.top = +W + +Q + "px"),
                      u.stopPropagation(e)),
                  u.preventDefault(e);
          }

          function d() {
              (ee = !1), (z.cursor = "");
          }

          function p(e) {
              var t = l("span"),
                  a = t.style;
              return (
                  (a.width = "42px"),
                  (a.height = "24px"),
                  (a.textAlign = "center"),
                  (a.font = j),
                  (a.lineHeight = "24px"),
                  (a.cursor = "pointer"),
                  (a.margin = "8px 10px 0 0"),
                  (a.textIndent = 0),
                  (a["float"] = "right"),
                  (a.color = "#494949"),
                  (a.backgroundColor = "#E4E4E4"),
                  (a.borderRadius = "2px"),
                  (t.innerHTML = e),
                  u.addHandler(t, "mouseover", function() {
                      (a.color = "#fff"), (a.backgroundColor = "#628BD2");
                  }),
                  u.addHandler(t, "mouseout", function() {
                      (a.color = "#494949"), (a.backgroundColor = "#E4E4E4");
                  }),
                  t
              );
          }

          function h() {
              for (
                  var e = [], t = de.childNodes, a = !1, n = 1, o = t.length; o > n; n++
              ) {
                  var i = t[n].childNodes,
                      r = Number(i[4].innerHTML);
                  if (r) {
                      for (var l = [], s = 0; 4 > s; s++)
                          l.push(i[s].childNodes[0].value);
                      e.push(l), (a = !0);
                  }
              }
              return a ?
                  {
                      ifShow: re.checked,
                      data: e,
                      count: {
                          allVolume: ue.childNodes[0].innerHTML,
                          costPrice: ue.childNodes[1].innerHTML,
                          nowPrice: ue.childNodes[2].innerHTML,
                          profitPercent: ue.childNodes[3].innerHTML,
                          profit: ue.childNodes[4].innerHTML,
                          marketValue: ue.childNodes[5].innerHTML
                      },
                      date: +new Date()
                  } :
                  void 0;
          }

          function f(e, t) {
              return e.toDateString() == t.toDateString();
          }

          function g(e) {
              var t = i.chart.kChart;
              if (t) {
                  for (
                      var a = t.getExtraData({
                              name: "currentK",
                              clone: !1
                          }),
                          n = [],
                          o = [],
                          r = 0,
                          l = e.length; l > r; r++
                  )
                      for (
                          var s = new Date(+new Date(e[r][0]) + 576e5 - 1), c = a.length; c--;

                      ) {
                          if (f(a[c].date, s)) {
                              "buy" == e[r][1] ?
                                  n.push([
                                      [c, e[r][2]]
                                  ]) :
                                  o.push([
                                      [c, e[r][2]]
                                  ]);
                              break;
                          }
                          if (a[c].date < s) break;
                      }
                  return {
                      buy: n,
                      sell: o
                  };
              }
          }

          function b(e) {
              !e && (e = t() + "|23"), r.paintTool.empty(e, "buyandsell");
          }

          function v() {
              if (r.paintTool && r.paintTool.param) {
                  var e = t() + "|23",
                      n = t() + "|t";
                  b(e), b(n);
                  var o = r.paintTool.param.shapeListName;
                  if (o == e || o == n) {
                      if ((P.isShow && re.checked) || !P.isShow) {
                          var i = P.isShow ? h() : a();
                          if (i && i.ifShow)
                              if (o == e) {
                                  var l = g(i.data);
                                  l &&
                                      (r.paintTool.addShapeList(
                                              e,
                                              "buyandsell",
                                              "UpArrow",
                                              l.buy, {
                                                  fillStyle: "red"
                                              }
                                          ),
                                          r.paintTool.addShapeList(
                                              e,
                                              "buyandsell",
                                              "DownArrow",
                                              l.sell, {
                                                  fillStyle: "green"
                                              }
                                          ),
                                          r.paintTool.addShapeList(
                                              e,
                                              "buyandsell",
                                              "Level",
                                              [
                                                  [
                                                      [0, +i.count.costPrice]
                                                  ]
                                              ], {
                                                  strokeStyle: "black"
                                              }
                                          ));
                              } else
                                  r.paintTool.addShapeList(
                                      n,
                                      "buyandsell",
                                      "Level",
                                      [
                                          [
                                              [0, +i.count.costPrice]
                                          ]
                                      ], {
                                          strokeStyle: "black"
                                      }
                                  );
                      }
                      r.paintTool.paint();
                  }
              }
          }

          function _() {
              var e = l("table"),
                  t = e.style;
              return (
                  (t.width = "100%"),
                  (t.textAlign = "center"),
                  (t.borderCollapse = "collapse"),
                  (e.border = "0"),
                  (e.cellpadding = "0"),
                  (e.cellspacing = "0"),
                  e
              );
          }

          function k(e) {
              var t = l("td"),
                  a = t.style;
              if (
                  ((a.border = "solid 1px #e5e5e5"),
                      (a.textAlign = "center"),
                      (a.font = j),
                      e && e.length)
              )
                  for (var n = 0, o = e.length; o > n; n++) t.appendChild(e[n]);
              return t;
          }

          function y(e) {
              var t = l("tr"),
                  a = t.style;
              (a.height = "30px"), (a.background = "#eef1f8");
              for (var n = 0, o = e.length; o > n; n++) {
                  var i = l("th"),
                      r = i.style;
                  (r.font = R),
                  (r.border = "solid 1px #e5e5e5"),
                  (r.textAlign = "center"),
                  (i.innerHTML = e[n]),
                  t.appendChild(i);
              }
              return t;
          }

          function w() {
              var e = new Date(),
                  t = e.getMonth() + 1,
                  a = e.getDate();
              return (
                  10 > t && (t = "0" + t),
                  10 > a && (a = "0" + a),
                  [e.getFullYear(), t, a].join("-")
              );
          }

          function x(e) {
              (e.font = j),
              (e.textAlign = "center"),
              (e.border = "none"),
              (e.outline = "none");
          }

          function C(e, t, a, n) {
              for (var o = 0, i = t.length; i > o; o++) {
                  var r = l("option");
                  (r.value = t[o][0]),
                  a == t[o][0] && (r.selected = !0),
                      (r.innerHTML = t[o][1]),
                      (r.style.font = n),
                      e.appendChild(r);
              }
          }

          function T() {
              var e = l("span"),
                  t = e.style;
              return (
                  (t.display = "inline-block"),
                  (t.width = "16px"),
                  (t.height = "16px"),
                  (t.lineHeight = "16px"),
                  (t.margin = "2px"),
                  (t.borderRadius = "2px"),
                  (t.color = "#fff"),
                  (t.backgroundColor = "#628BD2"),
                  (t.cursor = "pointer"),
                  (t.userSelect = "none"),
                  (t.webkitUserSelect = "none"),
                  (t.msUserSelect = "none"),
                  (t.mosUserSelect = "none"),
                  e
              );
          }

          function K(e) {
              var t = u.getEvent(e).target.parentNode.parentNode;
              t.nextSibling ?
                  de.insertBefore(D(), t.nextSibling) :
                  de.appendChild(D());
          }

          function N() {
              var e = de.childNodes[1];
              if (e) {
                  for (var t = e.querySelectorAll("input"), a = t.length; a--;)
                      t[a].value = 0 == a ? w() : "";
                  e.childNodes[4].innerHTML = "";
              } else de.appendChild(D());
          }

          function S(e) {
              var t = u.getEvent(e).target.parentNode.parentNode;
              de.childNodes.length > 2 ? de.removeChild(t) : N(), o();
          }

          function D(e) {
              function t() {
                  g.innerHTML = (p.value * m.value).toFixed(2);
              }

              function a() {
                  t(), o();
              }
              var n = l("tr"),
                  i = n.style;
              i.height = "24px";
              var r = l("input"),
                  s = r.style;
              x(s),
                  r.setAttribute("type", "date"),
                  r.setAttribute("value", e ? e[0] : w()),
                  (s.width = "120px"),
                  u.addHandler(r, "input", function(e) {
                      var t = u.getEvent(e).target;
                      (t.value = t.value
                          .replace(/[^\d-]/g, "")
                          .split(/-+/)
                          .slice(0, 3)
                          .join("-")),
                      v();
                  }),
                  n.appendChild(k([r]));
              var c = l("select"),
                  d = c.style;
              x(d),
                  C(
                      c,
                      [
                          ["buy", "买入"],
                          ["sell", "卖出"]
                      ],
                      e ? e[1] : "",
                      j
                  ),
                  u.addHandler(c, "change", o),
                  n.appendChild(k([c]));
              var p = l("input"),
                  h = p.style;
              x(h),
                  p.setAttribute("step", "0.01"),
                  p.setAttribute("min", "0"),
                  p.setAttribute("max", "99999"),
                  (h.width = "60px"),
                  e && (p.value = e[2]),
                  u.addHandler(p, "input", function(e) {
                      var t = u.getEvent(e).target;
                      (t.value = t.value
                          .replace(/[^\d\.]/g, "")
                          .split(/\.+/)
                          .slice(0, 2)
                          .join(".")),
                      t.value > 99999 && (t.value = 99999);
                  }),
                  n.appendChild(k([p]));
              var m = l("input"),
                  f = m.style;
              x(f),
                  m.setAttribute("step", "1"),
                  m.setAttribute("min", "0"),
                  m.setAttribute("max", "9999999999999"),
                  (f.width = "100px"),
                  e && (m.value = e[3]),
                  u.addHandler(m, "input", function(e) {
                      var t = u.getEvent(e).target;
                      (t.value = t.value.replace(/[^\d]/g, "")),
                      t.value > 9999999999999 && (t.value = 9999999999999);
                  }),
                  n.appendChild(k([m]));
              var g = k();
              (g.style.font = j),
              n.appendChild(g),
                  e && t(),
                  u.addHandler(p, "input", a),
                  u.addHandler(m, "input", a);
              var b = T();
              (b.innerHTML = "+"), u.addHandler(b, "click", K);
              var _ = T();
              return (
                  (_.innerHTML = "-"),
                  u.addHandler(_, "click", S),
                  n.appendChild(k([b, _])),
                  n
              );
          }

          function L() {
              var e = a();
              e ? (I(), E(e), (re.checked = e.ifShow)) : N(), o();
          }

          function A(e) {
              u.removeHandler(e.childNodes[5].childNodes[0], "click", K),
                  u.removeHandler(e.childNodes[5].childNodes[1], "click", S);
          }

          function I() {
              for (var e = de.childNodes, t = e.length - 1; t > 0; t--)
                  A(e[t]), de.removeChild(e[t]);
          }

          function E(e) {
              for (var t = e.data, a = 0, n = t.length; n > a; a++)
                  de.appendChild(D(t[a]));
          }

          function H() {
              var e = n();
              e != ge && (o(), (ge = e));
          }
          var F = "sinatkchart_tradehistory_" + t(),
              P = this,
              j = "12px Arial",
              R = "14px Arial",
              O = 1e3,
              M = l("div"),
              B = M.style;
          (B.position = "absolute"),
          (B.width = "580px"),
          (B.maxHeight = "400px"),
          (B.overflow = "hidden"),
          (B.left = "100px"),
          (B.top = "100px"),
          (B.zIndex = 8891),
          (B.background = "#fff"),
          (B.border = "6px solid rgba(200, 200, 200, 0.6)");
          var U = l("div"),
              z = U.style;
          (z.height = "40px"),
          (z.width = "100%"),
          (z.backgroundColor = "#fff"),
          (z.fontSize = "16px"),
          (z.fontWeight = "bold"),
          (z.textIndent = "10px"),
          (z.lineHeight = "44px"),
          (U.innerHTML = "交易日志"),
          M.appendChild(U);
          var V = document.createElement("span"),
              X = V.style;
          (X.display = "inline-block"),
          (X.lineHeight = "12px"),
          (X.width = "12px"),
          (X.height = "12px"),
          (X.border = "1px solid #628BD2"),
          (X.color = "#628BD2"),
          (X.borderRadius = "12px"),
          (X.fontSize = "12px"),
          (X.cursor = "help"),
          (X.textAlign = "left"),
          (X.marginLeft = "5px"),
          (X.textIndent = "3px"),
          (V.innerHTML = "?"),
          U.appendChild(V);
          var G = document.createElement("div"),
              Y = G.style;
          (Y.display = "none"),
          (Y.position = "absolute"),
          (Y.width = "240px"),
          (Y.left = "5px"),
          (Y.top = "35px"),
          (Y.padding = "5px"),
          (Y.border = "1px solid #AEC7E3"),
          (Y.zIndex = "99999"),
          (Y.fontSize = "12px"),
          (Y.fontWeight = "normal"),
          (Y.lineHeight = "14px"),
          (Y.backgroundColor = "#fff"),
          (Y.boxShadow = "2px 2px 2px #AEC7E3"),
          U.appendChild(G),
              u.addHandler(V, "mouseover", function(e) {
                  var t = e ? e.target || e.srcElement : null;
                  t &&
                      ((G.style.display = ""),
                          (G.innerHTML =
                              "“交易日志”功能使您在日K线图中可视化的查看持仓成本线与最新股价的距离。同时，您也可以通过增加一笔“买入/卖出”操作，在图表下方的汇总栏中快速看到此操作后成本价、盈亏比等的变化情况（未计算佣金和税率），为您做出交易决策提供便利。"));
              }),
              u.addHandler(V, "mouseout", function() {
                  G.style.display = "none";
              });
          var $,
              W,
              q,
              J,
              Z,
              Q,
              ee = !1;
          "ontouchend" in window &&
              (u.addHandler(U, "touchstart", s),
                  u.addHandler(U, "touchmove", c),
                  u.addHandler(U, "touchend", d)),
              u.addHandler(U, "mousedown", s),
              u.addHandler(U, "mousemove", c),
              u.addHandler(U, "mouseup", d),
              u.addHandler(U, "mouseout", d);
          var te = p("确定");
          u.addHandler(te, "click", function() {
                  P.hide();
                  var t = h();
                  t
                      ?
                      (m.save(F, t),
                          SUDA.uaTrack(
                              "chart_tradelog",
                              r.symbol + "$$$$" + JSON.stringify(t)
                          ),
                          e.suda("tradelog")) :
                      m.remove(F),
                      v();
              }),
              U.appendChild(te);
          var ae = p("取消");
          u.addHandler(ae, "click", function() {
                  P.hide(), v();
              }),
              U.appendChild(ae);
          var ne = p("清空");
          u.addHandler(ne, "click", function() {
                  I(), N(), o();
              }),
              U.appendChild(ne);
          var oe = l("label"),
              ie = oe.style;
          (ie["float"] = "right"),
          (ie.font = j),
          (ie.margin = "12px 10px 0 0"),
          (ie.textIndent = "0"),
          (ie.cursor = "pointer"),
          (oe.innerHTML = "绘制交易点");
          var re = l("input"),
              le = re.style;
          (re.type = "checkbox"),
          (le.margin = "1px"),
          (le.verticalAlign = "bottom"),
          (le["float"] = "left"),
          (re.checked = !0),
          u.addHandler(re, "change", v),
              oe.appendChild(re),
              U.appendChild(oe);
          var se = l("div"),
              ce = se.style;
          (ce.width = "100%"),
          (ce.maxHeight = "305px"),
          (ce.overflow = "auto"),
          M.appendChild(se);
          var de = _();
          se.appendChild(de),
              de.appendChild(
                  y([
                      "日期",
                      "类型",
                      "成交价",
                      "成交量",
                      "成交额",
                      "操作"
                  ])
              );
          var pe = _(),
              he = [
                  "持仓量",
                  "成本价",
                  "市价",
                  "盈亏比(%)",
                  "盈亏",
                  "市值"
              ],
              ue = l("tr");
          ue.style.height = "24px";
          for (var me = he.length; me--;) ue.appendChild(k());
          pe.appendChild(y(he)),
              pe.appendChild(ue),
              M.appendChild(pe),
              L(),
              (B.display = "none"),
              document.body.appendChild(M);
          var fe,
              ge = n();
          (this.isShow = !1),
          (this.show = function(e, t) {
              this.isShow ||
                  (L(),
                      "undefined" != typeof e && (B.left = e + "px"),
                      "undefined" != typeof t && (B.top = t + "px"),
                      (B.display = ""),
                      (this.isShow = !0),
                      (fe = setInterval(H, O)));
          }),
          (this.hide = function() {
              (B.display = "none"), (this.isShow = !1), clearInterval(fe);
          }),
          (this.repaint = v);
      }

      function b(e, t) {
          (23 == t || "t" == t) && (D || (D = new f()), D.repaint());
      }

      function v() {
          i = s({
                  className: G.className,
                  css: G.classStyle
              },
              i || null
          );
      }

      function _() {
          var e = "." + i.className.ctn + i.css.ctn,
              t = "." + i.className.fullscreen + i.css.fullscreen,
              a = "." + i.className.fullscreen + ":hover" + i.css.hover,
              n = "." + i.className.more + i.css.more,
              o = "." + i.className.more + ":hover" + i.css.hover,
              r = e + n + o + t + a;
          h.inject(r);
      }

      function k() {
          var t = l("div");
          (t.className = i.className.ctn), c(i.userObj.dom_id).appendChild(t);
          var n,
              o = ["click", "touchend"];
          for (
              X = l("div"),
              X.title = "全屏查看",
              X.className = i.className.fullscreen,
              n = o.length; n--;

          )
              u.addHandler(X, o[n], w);
          if (!e.xh5_BrowserUtil.noH5) {
              var r;
              try {
                  r = document.location.href;
              } catch (s) {}
              r && t.appendChild(X);
          }
          var d = l("div");
          (d.title = "更多"), (d.className = i.className.more);
          var p = new U(c(i.userObj.dom_id), i);
          for (n = o.length; n--;)
              u.addHandler(d, o[n], function(e) {
                  u.preventDefault(e), p.isshow ? p.hide() : p.show();
              });
          t.appendChild(d),
              (V = l("div")),
              (V.style.width = "100%"),
              (V.style.height = "100%"),
              (V.style.backgroundColor = e.xh5_BrowserUtil.noH5 ?
                  "#000" :
                  "rgba(0,0,0, 0.7)"),
              (V.style.position = "fixed"),
              (V.style.zIndex = 8888),
              (V.style.display = "none"),
              (V.style.top = 0),
              (V.style.left = 0),
              u.addHandler(V, "mousewheel", a),
              u.addHandler(V, "DOMMouseScroll", a),
              (z = l("div")),
              (z.style.backgroundColor = "#fff"),
              (z.style.width = "96%"),
              (z.style.height = "98%"),
              (z.style.top = "1%"),
              (z.style.left = "2%"),
              (z.style.zIndex = 8889),
              (z.style.position = "fixed"),
              (z.style.textAlign = "left"),
              u.addHandler(z, "mousewheel", a),
              u.addHandler(z, "DOMMouseScroll", a);
      }

      function y() {
          i.userObj.mt &&
              "cntouzi2" == i.userObj.mt &&
              e.suda("touzi_pc_v2_market_today_16", null, "touzi_pc_v2_market_today");
      }

      function w(t) {
          u.preventDefault(t),
              W ||
              ((W = !0),
                  document.body.appendChild(V),
                  document.body.appendChild(z)),
              $ ?
              ((X.title = "全屏查看"),
                  (X.style.background = 'url("' + M + '") no-repeat 0px -24px'),
                  (V.style.display = z.style.display = "none"),
                  Y.insertBefore(c(i.userObj.dom_id), Y.firstChild)) :
              ((X.title = "退出全屏"),
                  (X.style.background = 'url("' + M + '") no-repeat -1px 0px'),
                  (V.style.display = z.style.display = ""),
                  z.appendChild(c(i.userObj.dom_id)),
                  e.suda("tool_fullscreen"),
                  y()),
              i.chart && i.chart.onresize(),
              ($ = !$);
      }

      function x(e) {
          return /^sh020\d{3}$/.test(e) ?
              "bond" :
              /^sz108\d{3}$/.test(e) ?
              "bond" :
              /^sh(009|010)\d{3}$/.test(e) ?
              "bond" :
              /^sz10\d{4}$/.test(e) ?
              "bond" :
              /^sh(100|110|112|113)\d{3}$/.test(e) ?
              "bond" :
              /^sz12\d{4}$/.test(e) ?
              "bond" :
              /^sh(105|120|129|139)\d{3}$/.test(e) ?
              "bond" :
              /^sz11\d{4}$/.test(e) ?
              "bond" :
              "CN";
      }

      function C() {
          var t,
              a = "";
          switch (i.menu.chooseTab.tab) {
              case "t1":
              case "ts":
                  t = "1日";
                  break;
              case "t5":
                  t = "5日";
                  break;
              case "kd":
                  t = "日K";
                  break;
              case "kw":
                  t = "周K";
                  break;
              case "km":
                  t = "月K";
                  break;
              case "k5":
                  t = "5分钟K";
                  break;
              case "k15":
                  t = "15分钟K";
                  break;
              case "k30":
                  t = "30分钟K";
                  break;
              case "k60":
                  t = "60分钟K";
                  break;
              case "kdd":
                  t = "多空日K";
                  break;
              case "YTD":
                  t = "今年以来年";
                  break;
              case "km1":
                  t = "一月年";
                  break;
              case "km3":
                  t = "三月年";
                  break;
              case "km12":
                  t = "一年年";
                  break;
              case "kcl":
                  t = "年";
                  break;
              default:
                  t = "";
          }
          var n,
              o,
              r = i.userObj.symbol,
              l = e.market(r);
          switch (l) {
              case "CN":
                  (o = r),
                  (n =
                      "bond" == x(r) ?
                      "//money.finance.sina.com.cn/bond/quotes/" + r + ".html" :
                      "//finance.sina.com.cn/realstock/company/" + r + "/nc.shtml");
                  break;
              case "US":
                  (o = r.replace("gb_", "")),
                  (o = o.replace("$", "")),
                  (n = "//stock.finance.sina.com.cn/usstock/quotes/" + o + ".html");
                  break;
              case "OTC":
                  (o = r.replace("sb", "")),
                  (n =
                      "//stock.finance.sina.com.cn/thirdmarket/quotes/" + r + ".html");
                  break;
              case "HK":
                  (o = r.replace(/rt_hk|hk/, "")),
                  (n = "//stock.finance.sina.com.cn/hkstock/quotes/" + o + ".html");
                  break;
              default:
                  (n = "//finance.sina.com.cn"), (o = r);
          }
          var s = "#新浪财经行情图#";
          switch (i.menu.chooseTab.tye) {
              case "T":
                  i.chart.tChart.shareTo({
                      url: n,
                      wbtext: s +
                          a +
                          "(#" +
                          o +
                          "#)行情走势_" +
                          t +
                          "分时"
                  });
                  break;
              case "K":
                  i.chart.kChart.shareTo({
                      url: n,
                      wbtext: s + a + "(#" + o + "#)行情走势_" + t + "线"
                  });
                  break;
              default:
                  i.chart.tChart.shareTo({
                      url: n,
                      wbtext: s + a + "(#" + o + "#)行情走势"
                  });
          }
      }

      function T(e) {
          q = new n(e);
          var t = 55;
          e && "cntouzi2" == e.userObj.mt && (t = 65),
              q.mainCircle({
                  h: t,
                  display: "block",
                  text: 1,
                  radius: 15
              });
      }

      function K() {
          v(), i.userObj.dom_id && (_(), k(), T(i));
      }
      var N,
          S,
          D,
          L = !1,
          A = {
              edit: function(e) {
                  (L = !1), i.chart.setTKChart(e);
              }
          },
          I = function(t) {
              N
                  ?
                  (N.sendOriginalData(r.settingCfg, A),
                      N.isShow ? N.hide() : (e.suda("tool_setting"), N.show(t))) :
                  (N = new o({
                          url: g,
                          z: 9999
                      },
                      d(I, null, t)
                  )),
                  (L = !0);
          },
          E = function(t) {
              S ||
                  ((S = new p()),
                      i.chart && r.paintTool && (i.chart.paintTool = r.paintTool)),
                  S.isShow ?
                  S.hide() :
                  (e.suda("tool_painter"),
                      S.show(
                          t.pageX + 102 < document.body.offsetWidth ?
                          t.pageX + 20 :
                          t.pageX - 122,
                          t.pageY - 65
                      ));
          };
      i.chart.al("PAINTTOOL_VIEW_CHANGEED", b);
      var H = function() {
              D || (D = new f()),
                  D.isShow ?
                  D.hide() :
                  (e.suda("tool_trade"),
                      D.show(
                          window.innerWidth / 2 - 290,
                          window.scrollY + window.innerHeight / 2 - 120
                      ));
          },
          F = function() {
              var t = navigator.userAgent || "",
                  a = e.urlUtil.getMainUrl(),
                  n = "wangxuan2@staff.sina.com.cn?cc=yangwen@staff.sina.com.cn",
                  o = encodeURIComponent("行情图意见反馈"),
                  i = encodeURIComponent(
                      "【附加信息，便于调试：“访问页面地址：" +
                      a +
                      " 浏览器信息：" +
                      t +
                      "”】如您有任何疑问、意见和建议，可通过电子邮件的方式与我们建立联系："
                  ),
                  r = ["mailto:", n, "&subject=", o, "&body=", i].join("");
              window.open(r, "_blank");
          },
          P = {
              weibo: C,
              qrcode: function(e, t) {
                  switch (t.menu.chooseTab.tye) {
                      case "K":
                          i.chart.kChart.shareTo({
                              type: "qrcode"
                          });
                          break;
                      default:
                      case "T":
                          i.chart.tChart.shareTo({
                              type: "qrcode"
                          });
                  }
              },
              painter: E,
              trade: H,
              setting: I,
              contact: F
          },
          j = 0 == location.protocol.indexOf("https:") ? !0 : !1,
          R = [{
              title: "偏好设置",
              p: "setting"
          }];
      e.xh5_BrowserUtil.noH5 ||
          (R = R.concat([{
                  title: "画图工具",
                  p: "painter"
              },
              {
                  title: "交易日志",
                  p: "trade"
              },
              {
                  title: "分享到微博",
                  p: "weibo"
              },
              {
                  title: "扫描二维码",
                  p: "qrcode"
              }
          ]));
      var O = "//n.sinaimg.cn/finance/chartimg/chart_setting_icons.png?2017",
          M = j ? e.getSUrl(O) : O,
          B = {
              show: !1,
              zIndex: 301,
              backgroundColor: "#fff",
              toolList: R,
              toolBox: {
                  right: "1px",
                  top: "31px"
              },
              toolItem: {
                  width: "30px",
                  height: "29px"
              },
              toolListBG: {
                  setting: 'url("' + M + '") no-repeat 4px -115px',
                  painter: 'url("' + M + '") no-repeat 3px -167px',
                  trade: 'url("' + M + '") no-repeat 4px -195px',
                  weibo: 'url("' + M + '") no-repeat 3px -44px',
                  qrcode: 'url("' + M + '") no-repeat 3px -92px',
                  contact: 'url("' + M + '") no-repeat 3px -44px'
              }
          },
          U = function(e, t) {
              (this.parent = e), (this.param = s(B, t || null)), this._init();
          };
      U.prototype = {
          constructor: U,
          _init: function() {
              var a = this,
                  n = this.param,
                  o = this.parent,
                  i = t("div", o, n.toolBox),
                  r = i.style,
                  l = n.toolList;
              (r.cursor = "pointer"),
              (r.position = "absolute"),
              (r.zIndex = n.zIndex),
              (r.backgroundColor = n.backgroundColor),
              (r.display = n.show ? "" : "none"),
              (this.isshow = n.show),
              (this.wrap = i);
              for (var s = 0, c = l.length; c > s; s++) {
                  var d = l[s],
                      p = d.p;
                  if (p in P) {
                      var h = t("div", i, n.toolItem);
                      h.title = d.title;
                      var m = h.style;
                      0 == s && (m.borderTop = "1px solid #dde4f4"),
                          (m.borderRight = m.borderBottom = m.borderLeft =
                              "1px solid #dde4f4"),
                          (m.background = n.toolListBG[p]),
                          (m.backgroundColor = "#f7f7f7"),
                          h.setAttribute("tool-type", p);
                  }
              }
              u.addHandler(i, "click", function(t) {
                      var o = P,
                          i = u.getTarget(t).getAttribute("tool-type");
                      ("weibo" == i || "qrcode" == i) && e.suda("tool_" + i),
                          q.visibleChild({
                              name: i
                          }),
                          o[i] && o[i](t, n),
                          a.hide();
                  }),
                  u.addHandler(i, "mouseover", function(e) {
                      (u.getTarget(e).style.filter = "Alpha(Opacity=70)"),
                      (u.getTarget(e).style.opacity = 0.7);
                  }),
                  u.addHandler(i, "mouseout", function(e) {
                      (u.getTarget(e).style.filter = ""),
                      (u.getTarget(e).style.opacity = 1);
                  });
          },
          show: function(t, a) {
              var n = this.wrap,
                  o = n.style;
              this.isshow ||
                  ("undefined" != typeof t && (o.left = t + "px"),
                      "undefined" != typeof a && (o.top = a + "px"),
                      (o.display = ""),
                      (this.isshow = !0),
                      q.childDisplay(),
                      e.suda("tool_more"),
                      i.userObj.mt &&
                      "cntouzi2" == i.userObj.mt &&
                      e.suda(
                          "touzi_pc_v2_market_today_17",
                          null,
                          "touzi_pc_v2_market_today"
                      ));
          },
          hide: function() {
              (this.wrap.style.display = "none"),
              (this.isshow = !1),
              q.childDisplay(1);
          }
      };
      var z,
          V,
          X,
          G = {
              classStyle: {
                  ctn: "{position:absolute;right:0;top:4px;z-index:301;}\n",
                  hover: "{filter:Alpha(Opacity=70);opacity:0.7;}\n",
                  fullscreen: '{float:left;width:22px;height:22px;cursor:pointer;margin-right:5px;background: url("' +
                      M +
                      '") no-repeat 0px -24px;}\n',
                  more: '{float:left;width:22px;height:22px;cursor:pointer;margin-right:5px;background: url("' +
                      M +
                      '") no-repeat 7px -72px;}\n'
              },
              className: {
                  ctn: "kke_cfg_ctn",
                  fullscreen: "kke_cfg_fullscreen",
                  more: "kke_cfg_share"
              }
          },
          Y = c(i.userObj.dom_id).parentNode,
          $ = !1,
          W = !1;
      window.charttest = {
          fs: w
      };
      var q;
      K(), i.chart && (i.chart.showTradeBox = H);
  }
  var r,
      l = e.$C,
      s = e.oc,
      c = e.$DOM,
      d = e.fBind,
      p = e.bridge,
      h = e.cssUtil,
      u = e.xh5_EvtUtil,
      m = e.localSL,
      f = e.isFunc,
      g = "https://current.sina.com.cn/sinatkchart/settingpanel.html?20161230a";
  return new(function() {
      (this.VER = "1.2.8"),
      (this.get = function(e, t) {
          r = e.userObj;
          var a = new i(e);
          f(t) && t(a);
      });
  })();
});
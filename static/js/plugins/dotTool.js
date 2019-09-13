xh5_define("plugins.dotTool", ["utils.util"], function(t) {
  "use strict";

  function e(t) {
      return t.getBoundingClientRect ?
          t.getBoundingClientRect() :
          {
              left: 0,
              top: 0
          };
  }

  function i(t, i, n) {
      var a = e(t);
      return (
          (n = n || {}), (n.x = i.clientX - a.left), (n.y = i.clientY - a.top), n
      );
  }

  function n(t) {
      var e =
          "undefined" == typeof getComputedStyle ?
          t.currentStyle :
          getComputedStyle(t);
      return e ?
          ((t.clientWidth || g(e.width) || g(t.style.width)) -
              (g(e.paddingLeft) || 0) -
              (g(e.paddingRight) || 0)) |
          0 :
          0;
  }

  function a(t) {
      return null === t ?
          "Null" :
          void 0 === t ?
          "Undefined" :
          Object.prototype.toString.call(t).slice(8, -1);
  }

  function o(t, e, i) {
      if (!e) return t;
      t || (t = {});
      for (var n in e)
          e.hasOwnProperty(n) &&
          ("Object" === a(e[n]) ?
              (!t[n] && (t[n] = {}), o(t[n], e[n], i)) :
              (!i && n in t) || (t[n] = e[n]));
      return t;
  }

  function r(t) {
      var e = t.parentDiv;
      !t.width && (t.width = e.offsetWidth),
          !t.height && (t.height = e.offsetHeight);
  }

  function s(t) {
      t.zoom || (t.zoom = [0, t.width]);
  }

  function d(t) {
      t.domain || (t.domain = [0, t.height]);
  }

  function h(t, e) {
      e.parentDiv != t &&
          ((e.parentDiv = t),
              e.parentDiv.firstChild ?
              e.parentDiv.insertBefore(e.dotsWrap, e.parentDiv.firstChild) :
              e.parentDiv.appendChild(e.dotsWrap));
  }

  function l(t, e) {
      var i = t.style;
      (i.left = e.left + "px"),
      (i.top = e.top + "px"),
      (i.width = e.width + "px"),
      (i.height = e.height + "px");
  }

  function u(t) {
      var e = t.zoom;
      (t.xScale = t.width / (e[1] - e[0])),
      (t.yScale = t.height / (t.domain[1] - t.domain[0]));
  }

  function f(t, e) {
      return t.date >= e[0].day && t.date <= e[e.length - 1].day;
  }

  function p(t, e, i) {
      for (var n = e.length - 1, a = 0; n >= a;) {
          var o = Math.floor((n + a) / 2),
              r = i ? i(e[o]) : e[o];
          if (r == t)
              return {
                  index: o,
                  data: e[o]
              };
          t > r ? (a = o + 1) : (n = o - 1);
      }
      return !1;
  }

  function y(t, e) {
      for (var i in t)
          if (t.hasOwnProperty(i))
              switch (a(t[i])) {
                  case "Number":
                  case "String":
                  case "Object":
                      if (t[i] != e[i]) return !0;
                      break;
                  case "Array":
                      if (e[i])
                          for (var n = t[i].length; n--;)
                              if (t[i][n] != e[i][n]) return !0;
              }
      return !1;
  }

  function c() {
      (this.VERSION = "0.1.1"),
      (this.get = function(t, e) {
          var i = new w();
          e && e(i);
      });
  }
  var v = t.xh5_EvtUtil.addHandler,
      g = function(t) {
          return parseInt(t, 10);
      },
      m = {
          parentDiv: void 0,
          width: void 0,
          height: void 0,
          top: 0,
          left: 0,
          zoom: void 0,
          domain: void 0,
          rangeData: void 0,
          tip: {
              show: !0,
              formatter: void 0
          },
          onclick: void 0,
          onmousemove: void 0
      },
      w = function() {
          (this.inited = !1),
          (this.data = []),
          (this.dots = []),
          (this.alwaysHide = !1);
      };
  return (
      (w.prototype = {
          init: function(t) {
              var e = (this.param = o(m, t, !0));
              r(e), s(e), d(e);
              var i = (this.dotsWrap = document.createElement("div")),
                  n = i.style;
              if (
                  ((n.position = "absolute"),
                      (this.alwaysHide = !!e.alwaysHide),
                      this.alwaysHide && this.hide(),
                      h(e.parentDiv, this),
                      e.tip.show)
              ) {
                  var a = (this.tip = document.createElement("div"));
                  (a.style.display = "none"), i.appendChild(a);
              }
              (this.inited = !0), this.update(null, !0);
          },
          refresh: function() {
              if (this.inited) {
                  for (
                      var t = this.data,
                          e = this.dots,
                          a = this.param,
                          r = a.xScale,
                          s = this.dotsWrap,
                          d = a.rangeData,
                          h = this.tip,
                          l = n(s),
                          u = 0,
                          y = t.length,
                          c = 0; y > u; u++
                  )
                      for (var g = t[u], m = 0, w = g.data.length; w > m; m++) {
                          var x = g.data[m];
                          if (f(x, d)) {
                              var b = p(x.date, d, function(t) {
                                  return t.day;
                              });
                              if (b) {
                                  var k;
                                  e[c] ?
                                      ((k = e[c]), (k.style.display = "block")) :
                                      ((k = document.createElement("div")),
                                          s.appendChild(k),
                                          e.push(k),
                                          v(k, "mouseover", function(e) {
                                              for (var r = t.length; r--;)
                                                  if (this.getAttribute("key") === t[r].key) {
                                                      o(this.style, t[r].dotHoverStyle, !0);
                                                      var d = o({
                                                              key: t[r].key
                                                          },
                                                          t[r].data[this.getAttribute("index")],
                                                          !0
                                                      );
                                                      if (
                                                          (a.onmouseover && a.onmouseover(d),
                                                              h && a.tip.formatter)
                                                      ) {
                                                          (h.style.display = "block"),
                                                          o(h.style, t[r].tipStyle, !0);
                                                          var u = i(s, e),
                                                              f = n(h);
                                                          (h.innerHTML = a.tip.formatter(d)),
                                                          (h.style.left =
                                                              (u.x + f + 40 < l ? u.x + 15 : u.x - 30 - f) +
                                                              "px"),
                                                          (h.style.top = u.y + "px");
                                                      }
                                                  }
                                          }),
                                          v(k, "mouseout", function() {
                                              h.style.display = "none";
                                              for (var e = t.length; e--;)
                                                  this.getAttribute("key") === t[e].key &&
                                                  o(this.style, t[e].dotStyle, !0);
                                          })),
                                      (k.style.top = null),
                                      (k.style.bottom = null),
                                      o(k.style, g.dotStyle, !0),
                                      (k.style.left = (b.index + 0.57) * r - n(k) / 2 + "px"),
                                      k.setAttribute("index", m),
                                      k.setAttribute("key", t[u].key),
                                      c++;
                              }
                          }
                      }
                  for (; c < e.length;)(e[c].style.display = "none"), c++;
              }
          },
          update: function(t, e) {
              var i = this.param;
              (e || y(t, i)) &&
              ((i = o(i, t, !0)),
                  l(this.dotsWrap, i),
                  u(i),
                  (this.param = i),
                  this.refresh());
          },
          pushData: function(t) {
              for (var e = this.data, i = !1, n = e.length; n--;)
                  e[n].key === t.key &&
                  ("Array" === a(t.data) ?
                      (e[n].data = e[n].data.concat(t.data)) :
                      e[n].data.push(t.data),
                      (i = !0));
              i || this.data.push(t), this.refresh();
          },
          hide: function(t) {
              t && (this.alwaysHide = !0), (this.dotsWrap.style.display = "none");
          },
          show: function(t) {
              t && (this.alwaysHide = !1),
                  !this.alwaysHide && (this.dotsWrap.style.display = "block");
          }
      }),
      c
  );
});
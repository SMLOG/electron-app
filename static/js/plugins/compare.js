xh5_define("plugins.compare", ["utils.util"], function(e) {
  function t(t) {
      function l(e) {
          return "string" == typeof e ?
              e.replace(/\./g, "$") :
              l(e + "").split(",");
      }

      function r(e) {
          return "string" == typeof e ?
              e.replace(/\$/g, ".") :
              r(e + "").split(",");
      }

      function c() {
          var e = y.clsName.edage,
              a = y.clsName.label,
              n = y.clsName.panel,
              i = y.clsName.panel_popup,
              s = y.clsName.list,
              l = y.clsName.dellist,
              r = y.clsName.item,
              c = y.clsName.alert,
              d = y.clsName.button,
              h = y.clsName.input,
              u = "\n";
          t.delistPos && (y.clsStyle = y.weiboclsStyle),
              (e = "." + e + y.clsStyle.edage + u),
              (a = "." + a + y.clsStyle.label + u),
              (s = "." + s + y.clsStyle.list + u),
              (l = "." + l + y.clsStyle.dellist + u),
              (r = "." + r + y.clsStyle.item + u),
              (n = "." + n + y.clsStyle.panel + u),
              (i = "." + i + y.clsStyle.popup + u),
              (h = "." + h + y.clsStyle.input + u),
              (c = "." + c + y.clsStyle.alert + u),
              (d = "." + d + y.clsStyle.button);
          var m =
              "." +
              y.clsName.button +
              " a" +
              y.clsStyle.button_a +
              u +
              "." +
              y.clsName.button +
              " a:hover" +
              y.clsStyle.button_a_hover +
              u,
              p = "." + y.clsName.more + y.clsStyle.more + u,
              b =
              "." +
              y.clsName.more +
              " a" +
              y.clsStyle.button_a +
              u +
              "." +
              y.clsName.more +
              " a:hover" +
              y.clsStyle.button_a_hover +
              u,
              f = e + a + n + i + d + m + h + s + l + r + p + b + c;
          o.inject(f);
      }

      function d() {
          var e,
              a = (e =
                  '<div id="h5tk_compareLabel_' +
                  t.id +
                  '" class=' +
                  y.clsName.list +
                  "></div>");
          t.delistPos ? (a = "") : (e = "");
          var n =
              '<div class="' +
              y.clsName.edage +
              '"><h4 class=' +
              y.clsName.label +
              '>对比：</h4><div class="' +
              y.clsName.panel +
              '" id="h5tk_compareIndex_" ' +
              t.id +
              '></div><input type="text" id="h5tk_compareTxt_' +
              t.id +
              '" class="' +
              y.clsName.input +
              '"><span class="' +
              y.clsName.button +
              '" id="h5tk_compareBtn_' +
              t.id +
              '"><a>对比</a></span><span class="' +
              y.clsName.more +
              '" id="h5tk_comparemoreBtn_' +
              t.id +
              '"><a>更多</a></span><div class="' +
              y.clsName.alert +
              '" id="h5tk_compareMsg_' +
              t.id +
              '"></div>' +
              e +
              "</div>";
          i(t.compare_dom_id).innerHTML = a + n;
      }

      function h() {
          (C = new k()),
          C.bind({
              position: t.position,
              input: "h5tk_compareTxt_" + t.id,
              default: "输入证券代码或名称",
              width: 280,
              type: "11,12,13,14,15,31,41,71,73,81",
              head: [
                  "选项",
                  "类型",
                  "代码",
                  "中文名称"
              ],
              body: [-1, -2, 2, 4],
              callback: _
          });
      }

      function u(e, t) {
          (i(e).style.display = "block"),
          (i(e).innerHTML = t),
          clearTimeout(K),
              (K = setTimeout(function() {
                  i(e).style.display = "none";
              }, S));
      }

      function m(e, n) {
          var o = a("div"),
              l = a("span"),
              r = a("span");
          return (
              o.appendChild(l),
              o.appendChild(r),
              i("h5tk_compareLabel_" + t.id).appendChild(o),
              (l.className = y.clsName.dellist),
              (r.className = y.clsName.item),
              (r.style.color = n),
              (r.innerHTML = e.name),
              o.setAttribute("data-symbol", e.symbol),
              s.addHandler(o, "click", function() {
                  var e,
                      a = this.getAttribute("data-symbol");
                  if (w)
                      for (e = 0; e < w.length; e++)
                          w[e].compare({
                                  symbol: a
                              },
                              !0
                          );
                  for (e = T.length - 1; e >= 0; e--)
                      T[e].symbol == a &&
                      (T.splice(e, 1), t.color.push(t.color[e]), t.color.splice(e, 1));
                  i("h5tk_compareLabel_" + t.id).removeChild(this),
                      T.length <= 0 &&
                      ((i("h5tk_compareLabel_" + t.id).style.display = "none"),
                          t.delistPos &&
                          (i("h5tk_compareTxt_" + t.id).style.width = "396px"));
              }),
              o
          );
      }

      function p(e) {
          KKE &&
              KKE.api(
                  "datas.hq.get", {
                      symbol: e
                  },
                  function(a) {
                      if (!a.data[0].name)
                          return void u("h5tk_compareMsg_" + t.id, L.delist);
                      var n =
                          a.data[0].name.length > 4 ?
                          a.data[0].name.substring(0, 4) + ".." :
                          a.data[0].name,
                          o = {
                              symbol: e,
                              name: n
                          };
                      if ((T.push(o), m(o, t.color[T.length - 1]), w))
                          for (var s = 0; s < w.length; s++)
                              w[s].compare({
                                  symbol: e,
                                  linecolor: {
                                      K_N: t.color[T.length - 1]
                                  }
                              });
                      (i("h5tk_compareLabel_" + t.id).style.display = "block"),
                      t.delistPos &&
                          (i("h5tk_compareTxt_" + t.id).style.width = "126px");
                  }
              );
      }

      function b(t, a) {
          var n,
              i,
              o = e.market(t),
              s = "http:";
          switch (o) {
              case "HK":
                  (n = t.replace("rt_hk", "")),
                  (n = n.replace("hk", "")),
                  (i =
                      s + "//stock.finance.sina.com.cn/hkstock/quotes/" + n + ".html");
                  break;
              case "US":
                  (n = t.replace("gb_", "")),
                  (n = 1 == a ? l(n) : r(n)),
                  (i =
                      s + "//stock.finance.sina.com.cn/usstock/quotes/" + n + ".html");
                  break;
              case "OTC":
                  (n = t),
                  (i =
                      s +
                      "//stock.finance.sina.com.cn/thirdmarket/quotes/" +
                      n +
                      ".html");
                  break;
              case "forex":
                  ("DINIW" != t || "USDCNY" != t) && (n = t.replace("fx_", "")),
                  (i = s + "//finance.sina.com.cn/money/forex/hq/" + n + ".shtml");
                  break;
              default:
                  (n = t),
                  (i =
                      s + "//finance.sina.com.cn/realstock/company/" + n + "/nc.shtml");
          }
          return {
              symbol: n,
              url: i
          };
      }

      function f(e) {
          var a = b(e, 1).symbol;
          void 0 == a && (a = ""),
              (i("h5tk_compareTxt_" + t.id).value = a),
              i("h5tk_compareTxt_" + t.id).setAttribute("data-symbol", e);
      }

      function _(e) {
          if ((f(e), e === w[0].chartUserobj.symbol))
              return void u("h5tk_compareMsg_" + t.id, L.added);
          if (!e || "输入证券代码或名称" == e)
              return void u("h5tk_compareMsg_" + t.id, L.no);
          if (T.length >= N) return void u("h5tk_compareMsg_" + t.id, L.more);
          for (var a = 0; a < T.length; a++)
              if (T[a].symbol == e) return void u("h5tk_compareMsg_" + t.id, L.added);
          (x = e), p(e);
      }

      function g() {
          s.addHandler(i("h5tk_compareBtn_" + t.id), "click", function() {
              var e = C.stockInfo(),
                  a = i("h5tk_compareTxt_" + t.id).getAttribute("data-symbol");
              if ("" !== a) {
                  for (var n = 0, o = 0; o < e.length; o++)
                      if (a == e[o].symbol) {
                          _(e[o].symbol), (n = 1);
                          break;
                      }
                  0 == n && _(e[0].symbol);
              }
          });
          var a = e.urlUtil.getMainUrl(),
              n = 0;
          /.*(sina.com.cn|sina.cn).*/.test(a) && (n = 1),
              0 == n && (i("h5tk_comparemoreBtn_" + t.id).style.display = "block"),
              s.addHandler(i("h5tk_comparemoreBtn_" + t.id), "click", function() {
                  var e = b(t.userObj.symbol).url;
                  window.open(e);
              });
      }

      function v() {
          c(), d(), h(), g();
      }
      var k = function() {
              (this._stringOriginalUrl =
                  "//suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@"),
              (this._stringUrl = ""),
              (this._elementScriptLoader = null),
              (this._elementContainer = null),
              (this._stringOriginalValue = ""),
              (this._stringLastValue = ""),
              (this._functionCallback = null),
              (this._elementLineCurrent = null),
              (this._objectHtml = {}),
              (this._objectData = {}),
              (this._booleanHideDelay = !1),
              (this._stringBrowserType = ""),
              (this._objectType = {
                  11: "A 股",
                  12: "B 股",
                  13: "权证",
                  14: "期货",
                  15: "债券",
                  21: "开基",
                  22: "ETF",
                  23: "LOF",
                  24: "货基",
                  25: "QDII",
                  26: "封基",
                  31: "港股",
                  32: "窝轮",
                  33: "港指数",
                  41: "美股",
                  42: "外期",
                  71: "外汇",
                  73: "OTC",
                  81: "债券",
                  82: "债券"
              }),
              (this._objectConfig = {
                  position: null,
                  input: null,
                  loader: null,
                  value: null,
                  default: null,
                  type: 0,
                  max: 10,
                  width: 220,
                  link: null,
                  target: "_blank",
                  head: ["选项", "代码", "名称"],
                  body: [-1, 2, 4],
                  fix: {
                      firefox: [1, 1]
                  },
                  onshow: function() {},
                  onhide: function() {},
                  hideSelectForIE6: !1,
                  callback: null
              }),
              (this._getElement = function(e) {
                  return document.getElementById(e);
              }),
              (this._getRandom = function() {
                  return new Date().getTime();
              }),
              (this._bind = function(e, t) {
                  var a = this;
                  return function() {
                      var n = null;
                      if ("undefined" != typeof t) {
                          for (var i = 0; i < arguments.length; i++) t.push(arguments[i]);
                          n = t;
                      } else n = arguments;
                      return e.apply(a, n);
                  };
              }),
              (this._aevent = function(e, t, a) {
                  window.addEventListener ?
                      e.addEventListener(t, a, !1) :
                      window.attachEvent && e.attachEvent("on" + t, a);
              }),
              (this._position = function() {
                  var e = 0,
                      t = 0,
                      a = this._elementInput;
                  do {
                      if (
                          ((e += a.offsetTop || 0),
                              (t += a.offsetLeft || 0),
                              "relative" != a.style.position)
                      )
                          break;
                      a = a.offsetParent;
                  } while (a);
                  var n = [
                      1 *
                      this._elementInput.parentNode.style.borderTopWidth.replace(
                          "px",
                          ""
                      ),
                      1 *
                      this._elementInput.parentNode.style.borderLeftWidth.replace(
                          "px",
                          ""
                      )
                  ];
                  (__arrayPositionFix = [0, 0]),
                  this._elementContainer.style.top != e + "px" &&
                      (this._elementContainer.style.top =
                          e - n[0] + __arrayPositionFix[0] + "px"),
                      this._elementContainer.style.left != t + "px" &&
                      (this._elementContainer.style.left =
                          t - n[1] + __arrayPositionFix[1] + "px");
                  var i = this._elementInput.style.borderTopWidth,
                      o = this._elementInput.style.borderBottomWidth,
                      s = this._elementInput.clientHeight;
                  (s += "" != i ? 1 * i.replace("px", "") : 2),
                  (s += "" != o ? 1 * o.replace("px", "") : 2),
                  this._elementContainer.style.marginTop != s + "px" &&
                      (this._elementContainer.style.marginTop = s + "px");
              }),
              (this._getType = function(e) {
                  return {
                      1: "stock",
                      2: "fund",
                      3: "hk",
                      4: "us"
                  } [e.substr(0, 1)];
              }),
              (this._fill = function() {
                  var e = this._elementInput.value;
                  if (
                      "key_" + e in this._objectData &&
                      "" != this._objectData["key_" + e]
                  ) {
                      null == this._elementContainer &&
                          ((this._elementContainer = document.createElement("div")),
                              (this._elementContainer.style.cssText +=
                                  "display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:" +
                                  this._objectConfig.width +
                                  "px; z-index:999;"),
                              this._elementInput.parentNode.insertBefore(
                                  this._elementContainer,
                                  this._elementInput
                              ),
                              (this._elementContainer.suggest = this)),
                          this._position();
                      var t = "";
                      if (
                          ((t +=
                                  '<table style="border-collapse:collapse; line-height:18px; border:2px solid #EEE; background-color:#FFF; font-size:12px; text-align:center; color:#999; width:' +
                                  (this._objectConfig.width - 2) +
                                  'px;">'),
                              null != this._objectConfig.head)
                      ) {
                          t += '<tr style="background-color:#F3F3F3;">';
                          for (var a in this._objectConfig.head)
                              this._objectConfig.head.hasOwnProperty(a) &&
                              (t += "<td>" + this._objectConfig.head[a] + "</td>");
                          t += "</tr>";
                      }
                      for (
                          var n = (this._objectData["key_" + e] || "")
                              .replace(/&amp;/g, "&")
                              .replace(/;$/, "")
                              .split(";"),
                              i =
                              n.length > this._objectConfig.max ?
                              this._objectConfig.max :
                              n.length,
                              o = "parentNode.parentNode.parentNode['suggest']",
                              a = 0; i > a; a++
                      ) {
                          var s = n[a].split(",");
                          if (
                              ((s[-1] = s[0].replace(
                                      new RegExp(
                                          e
                                          .toLowerCase()
                                          .replace(/(^\s*)|(\s*$)/g, "")
                                          .replace(/\./g, function(e) {
                                              return "\\" + e;
                                          }),
                                          "gi"
                                      ),
                                      function(e) {
                                          return '<span style="color:#F00;">' + e + "</span>";
                                      }
                                  )),
                                  (s[-2] =
                                      s[1] in this._objectType ?
                                      this._objectType[s[1]] :
                                      "——"),
                                  null == this._objectConfig.link ||
                                  "" == this._objectConfig.link)
                          )
                              var l = [
                                  '<td style="padding:0px;"><span style="display:block; padding:1px;">',
                                  "</span></td>"
                              ];
                          else {
                              var r = this._objectConfig.link
                                  .replace(/@type@/g, this._getType(s[1]) || s[1])
                                  .replace(/@code@/g, this._getFullCode(s));
                              for (var c in s)
                                  s.hasOwnProperty(c) &&
                                  (r = r.replace(new RegExp("@" + c + "@", "g"), s[c]));
                              var l = [
                                  '<td style="padding:0px;"><a href="' +
                                  r +
                                  '" hidefocus="true" onmousedown="return this.parentNode.parentNode.' +
                                  o +
                                  "['hidepause'](this);\" onclick=\"return this.parentNode.parentNode." +
                                  o +
                                  '[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="' +
                                  this._objectConfig.target +
                                  '">',
                                  "</a></td>"
                              ];
                          }
                          t +=
                              '<tr id="' +
                              n[a] +
                              '" style="cursor:pointer;" onmouseover="this.' +
                              o +
                              "['mouseoverLine'](this);\" onmouseout=\"this." +
                              o +
                              "['mouseoutLine'](this);\" onmousedown=\"this." +
                              o +
                              "['setLineMouse'](this);\">";
                          for (var c in this._objectConfig.body)
                              this._objectConfig.body.hasOwnProperty(c) &&
                              (t += l[0] + s[this._objectConfig.body[c]] + l[1]);
                          t += "</tr>";
                      }
                      (t += "</table>"),
                      (this._objectHtml["key_" + e] = t),
                      (this._elementLineCurrent = null),
                      document.createElement("div"),
                          (this._elementContainer.innerHTML = this._objectHtml[
                              "key_" + e
                          ]),
                          this._show(),
                          this._filled();
                  } else this._hide();
              }),
              (this._color = function(e) {
                  var t = "";
                  e._booleanArrow && e._booleanMouse ?
                      (t = "#F8FBDF") :
                      e._booleanArrow ?
                      (t = "#F1F5FC") :
                      e._booleanMouse && (t = "#FCFEDF"),
                      e.style.backgroundColor != t && (e.style.backgroundColor = t);
              }),
              (this.mouseoverLine = function(e) {
                  (e._booleanMouse = !0), this._color(e);
              }),
              (this.mouseoutLine = function(e) {
                  (e._booleanMouse = !1), this._color(e);
              }),
              (this.setLineMouse = function(e) {
                  this.setLine(e),
                      null != this._functionCallback &&
                      this._functionCallback(
                          this._elementInput.value,
                          e.id.split(",")
                      );
              }),
              (this._getFullCode = function(e) {
                  var t;
                  switch (e[1]) {
                      case "11":
                      case "12":
                      case "13":
                      case "14":
                      case "15":
                      case "21":
                      case "22":
                      case "23":
                      case "24":
                      case "25":
                      case "26":
                          return e[3];
                      case "71":
                          return (t =
                              "DINIW" === e[2] || "USDCNY" === e[2] ? e[2] : "fx_s" + e[2]);
                      case "73":
                          return (t = "sb" + e[2]);
                      case "31":
                      case "32":
                      case "33":
                          return (t = "rt_hk" + e[2]);
                      case "41":
                          return (t = "gb_" + e[2]);
                      default:
                          return e[2];
                  }
              }),
              (this.setLine = function(e) {
                  var t = e.id.split(","),
                      a = this._objectConfig.value;
                  if (null != a && "" != a) {
                      for (var n = 0; n < t.length; n++)
                          a = a.replace(new RegExp("@" + n + "@", "g"), t[n]);
                      var i = a;
                  } else var i = this._getFullCode(t);
                  for (var o = e.id, n = 2; 5 > n; n++)
                      this._objectData["key_" + t[n]] = o + ";";
                  (this._stringLastValue = i),
                  (this._elementInput.value = i),
                  null != this._elementLineCurrent &&
                      ((this._elementLineCurrent._booleanArrow = !1),
                          this._color(this._elementLineCurrent)),
                      (e._booleanArrow = !0),
                      this._color(e),
                      (this._elementLineCurrent = e);
              }),
              (this._show = function() {
                  if (null != this._elementContainer) {
                      if (
                          ((this._elementContainer.style.display = ""),
                              this._objectConfig.onshow(),
                              this._objectConfig.hideSelectForIE6 &&
                              "ie6" == this._stringBrowserType)
                      )
                          for (
                              var e = document.getElementsByTagName("select"), t = 0; t < e.length; t++
                          )
                              e[t].style.visibility = "hidden";
                      if (null != this._objectConfig.position) {
                          var a = window.getComputedStyle(this._elementContainer).height;
                          (a = Number(a.replace("px", ""))),
                          a &&
                              "auto" != a &&
                              (this._elementContainer.style.top = -(a + 26) + "px");
                      }
                  }
              }),
              (this.hidepause = function() {
                  this._booleanHideDelay = !0;
              }),
              (this.hideresume = function() {
                  (this._booleanHideDelay = !1), this._hideNow();
              }),
              (this._hide = function() {
                  0 == this._booleanHideDelay && this._hideNow();
              }),
              (this._hideNow = function() {
                  if (
                      null != this._elementContainer &&
                      ((this._elementContainer.style.display = "none"),
                          this._objectConfig.onhide(),
                          this._objectConfig.hideSelectForIE6 &&
                          "ie6" == this._stringBrowserType)
                  )
                      for (
                          var e = document.getElementsByTagName("select"), t = 0; t < e.length; t++
                      )
                          e[t].style.visibility = "visible";
              }),
              (this._load = function(e, t, a) {
                  null == this._elementScriptLoader &&
                      ((this._elementScriptLoader = document.createElement("div")),
                          (this._elementScriptLoader.style.display = "none"),
                          this._elementInput.parentNode.insertBefore(
                              this._elementScriptLoader,
                              this._elementInput
                          ));
                  var n = "suggestdata_" + this._getRandom(),
                      i = document.createElement("script");
                  (i.type = "text/javascript"),
                  (i.charset = "gb2312"),
                  (i.src = this._stringUrl
                      .replace("@NAME@", n)
                      .replace("@KEY@", encodeURIComponent(e.toLowerCase()))),
                  (i._object = this),
                  t && (i._functionCallbackTrue = t),
                      a && (i._functionCallbackFalse = a),
                      (i._stringValue = e),
                      (i._stringName = n),
                      (i[document.all ? "onreadystatechange" : "onload"] = function() {
                          if (
                              !document.all ||
                              "loaded" == this.readyState ||
                              "complete" == this.readyState
                          ) {
                              var e = window[this._stringName];
                              "undefined" != typeof e
                                  ?
                                  ((this._object._objectData[
                                          "key_" + this._stringValue
                                      ] = e),
                                      this._functionCallbackTrue(e),
                                      (window[this._stringName] = null)) :
                                  this._functionCallbackFasle &&
                                  this._functionCallbackFasle(""),
                                  (this._object = null),
                                  (this._stringValue = null),
                                  (this._stringName = null),
                                  (this[
                                      document.all ? "onreadystatechange" : "onload"
                                  ] = null),
                                  this.parentNode.removeChild(this);
                          }
                      }),
                      this._elementScriptLoader.appendChild(i);
              }),
              (this._check = function() {
                  var e = this._elementInput.value;
                  this._stringLastValue != e ?
                      ((this._stringLastValue = e),
                          "" != e ?
                          "key_" + e in this._objectData ?
                          this._fill() :
                          this._load(
                              e,
                              this._bind(this._fill),
                              this._bind(this._hide)
                          ) :
                          (null != this._elementContainer &&
                              ((this._elementLineCurrent = null),
                                  (this._elementContainer.innerHTML = "")),
                              this._hide())) :
                      this._show();
              }),
              (this._eventFocus = function() {
                  this._elementInput.value == this._stringOriginalValue &&
                      (this._elementInput.value = ""),
                      (this._stringLastValue = ""),
                      this._check();
              }),
              (this._eventBlur = function() {
                  "" == this._elementInput.value &&
                      (this._elementInput.value = this._stringOriginalValue),
                      (this._stringLastValue = ""),
                      this._hide();
              }),
              (this._eventButtonUp = function() {
                  this._allData = this._firstData = "undefined";
                  var e = arguments[0] || window.event,
                      t = null == this._objectConfig.head ? 0 : 1;
                  switch (e.keyCode) {
                      case 38:
                          null != this._elementContainer &&
                              null != this._elementContainer.firstChild &&
                              this.setLine(
                                  this._elementContainer.firstChild.rows[
                                      this._elementLineCurrent &&
                                      this._elementLineCurrent.rowIndex != t ?
                                      this._elementLineCurrent.rowIndex - 1 :
                                      this._elementContainer.firstChild.rows.length - 1
                                  ]
                              );
                          break;
                      case 40:
                          null != this._elementContainer &&
                              null != this._elementContainer.firstChild &&
                              this.setLine(
                                  this._elementContainer.firstChild.rows[
                                      this._elementLineCurrent &&
                                      this._elementLineCurrent.rowIndex !=
                                      this._elementContainer.firstChild.rows.length - 1 ?
                                      this._elementLineCurrent.rowIndex + 1 :
                                      t
                                  ]
                              );
                          break;
                      case 13:
                          null != this._elementContainer &&
                              (null != this._elementLineCurrent &&
                                  this.setLine(this._elementLineCurrent),
                                  null != this._functionCallback &&
                                  this._functionCallback(
                                      this._elementInput.value,
                                      this._elementLineCurrent ?
                                      this._elementLineCurrent.id.split(",") :
                                      []
                                  )),
                              this._hide();
                          break;
                      default:
                          this._check();
                  }
                  this._filled();
              }),
              (this._firstData = "undefined"),
              (this._allData = "undefined"),
              (this._filled = function() {
                  var e =
                      (null == this._objectConfig.head ? 0 : 1,
                          this._objectData["key_" + this._elementInput.value]);
                  if (e) {
                      for (var t, a, n = e.split(";"), i = [], o = 0; o < n.length; o++)
                          (t = n[o].split(",")),
                          (t[3] = this._getFullCode(t)),
                          (a = {
                              user: t[0],
                              type: t[1],
                              code: t[2],
                              symbol: t[3],
                              name: t[4],
                              py: t[5]
                          }),
                          0 == o && (this._firstData = a),
                          i.push(a);
                      this._allData = i;
                  }
              }),
              (this.stockInfo = function() {
                  return this._allData;
              }),
              (this.getCodeFromCache = function(e) {
                  return "key_" + e in this._objectData ?
                      this._objectData["key_" + e] :
                      void 0;
              }),
              (this.getCode = function(e, t) {
                  "key_" + e in this._objectData ?
                      t(this._objectData["key_" + e]) :
                      this._load(e, t, t);
              }),
              (this.changeType = function(e) {
                  if (
                      ((this._objectHtml = {}),
                          (this._objectData = {}),
                          (this._elementInput.value = this._stringOriginalValue),
                          "undefined" != typeof e)
                  ) {
                      var t = "";
                      switch (e.toLowerCase()) {
                          case "stock":
                              t = "11,12,13,14,15";
                              break;
                          case "fund":
                              t = "21,22,23,24,25,26";
                              break;
                          case "hkstock":
                              t = "31";
                              break;
                          case "hk":
                              t = "31,33,32";
                              break;
                          case "usstock":
                              t = "41";
                              break;
                          case "us":
                              t = "41,42";
                              break;
                          case "fx":
                              t = "71";
                              break;
                          default:
                              t = e;
                      }
                      this._stringUrl = this._stringOriginalUrl.replace("@TYPE@", t);
                  } else
                      this._stringUrl = this._stringOriginalUrl.replace(
                          "type=@TYPE@&",
                          ""
                      );
                  this._objectConfig.type = e;
              }),
              (this.changeLink = function(e) {
                  (this._objectConfig.link = e), this._fill(), this._hide();
              }),
              (this.clear = function() {
                  (this._stringLastValue = null),
                  (this._elementInput.value = ""),
                  this._check(),
                      (this._elementInput.value = this._stringOriginalValue);
              }),
              (this.bind = function(e) {
                  if ("undefined" != typeof e)
                      for (var t in e) this._objectConfig[t] = e[t];
                  (this._elementInput =
                      "string" == typeof this._objectConfig.input ?
                      document.getElementById(this._objectConfig.input) :
                      this._objectConfig.input),
                  null != this._objectConfig.loader &&
                      (this._elementScriptLoader =
                          "string" == typeof this._objectConfig.loader ?
                          document.getElementById(this._objectConfig.loader) :
                          this._objectConfig.loader),
                      this._elementInput &&
                      ((this._stringOriginalValue =
                              null == this._objectConfig["default"] ||
                              "" == this._objectConfig["default"] ?
                              this._elementInput.value :
                              this._objectConfig["default"]),
                          this.changeType(this._objectConfig.type),
                          (this._elementInput.value = this._stringOriginalValue),
                          this._elementInput.setAttribute("autocomplete", "off"),
                          (this._elementInput.autoComplete = "off"),
                          this._aevent(
                              this._elementInput,
                              "focus",
                              this._bind(this._eventFocus)
                          ),
                          this._aevent(
                              this._elementInput,
                              "blur",
                              this._bind(this._eventBlur)
                          ),
                          this._aevent(
                              this._elementInput,
                              "keyup",
                              this._bind(this._eventButtonUp)
                          ),
                          this._aevent(
                              this._elementInput,
                              "mouseup",
                              this._bind(this._eventButtonUp)
                          ),
                          (this._functionCallback = this._objectConfig.callback));
              });
          },
          y = {
              clsName: {
                  edage: "kke_compare_edage",
                  label: "kke_compare_label",
                  alert: "kke_compare_alert",
                  panel: "kke_compare_panel",
                  panel_popup: "kke_compare_panel_popup",
                  input: "kke_compare_input",
                  list: "kke_compare_list",
                  dellist: "kke_compare_dellist",
                  item: "kke_compare_item",
                  button: "kke_compare_button",
                  more: "kke_compare_more"
              },
              clsStyle: {
                  edage: "{width:100%;position:relative;float:left;margin-left:10px;}",
                  label: "{float:left;color:#1a1a1a;font-family:Microsoft Yahei,Arial;font-weight:bold;padding:0;margin:0;}",
                  alert: "{position:absolute;display:none;top:-30px; height:25px;line-height:25px;color:#ff0000; padding-left:5px; width:190px;left:60px;border:1px solid #ccc;background:#fff;}",
                  panel: "{float:left;}",
                  popup: "{float:left;display:none;}",
                  input: "{float:left;width:396px;color:#969696;font-family:Microsoft Yahei,Arial;}",
                  list: "{height:25px; background:#FFFFFF; line-height:24px; text-align:center;margin-left:55px; display:none;}",
                  dellist: "{background:url(//www.sinaimg.cn/cj/yw/img/bg_compare.png) #fff no-repeat 2px -20px; float:left; cursor:pointer; margin:2px 5px 2px 0;width:18px;height:18px;border:1px solid #c4cbcf;}",
                  item: "{ float:left;margin-right:30px;margin-bottom:3px;font-size:13px;line-height:24px;text-align:center;color:#f69931;cursor:pointer;}",
                  button: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;}",
                  more: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;display:none;}",
                  button_a: "{display:inline-block;width:50px;border:1px solid #d5d5d5;}",
                  button_a_hover: "{background-color:#494949;color:#ffffff;}"
              },
              weiboclsStyle: {
                  edage: "{width:100%;position:relative;float:left;margin-left:2px;}",
                  label: "{float:left;color:#1a1a1a;font-family:Microsoft Yahei,Arial;font-weight:bold;padding:0;margin:0;}",
                  alert: "{position:absolute;display:none;top:-30px; height:25px;line-height:25px;color:#ff0000; padding-left:5px; width:190px;left:36px;border:1px solid #ccc;background:#fff;}",
                  panel: "{float:left;}",
                  popup: "{float:left;display:none;}",
                  input: "{float:left;width:396px;color:#969696;font-family:Microsoft Yahei,Arial;}",
                  list: "{height:25px; background:#FFFFFF; line-height:24px; text-align:center;/*margin-left:55px;*/ display:none;}",
                  dellist: "{background:url(//www.sinaimg.cn/cj/yw/img/bg_compare.png) #fff no-repeat 0px -22px; float:left; cursor:pointer; margin:4px 1px 2px 1px;width:14px;height:14px;border:1px solid #c4cbcf;}",
                  item: "{ float:left;margin-right:10px;margin-bottom:3px;font-size:13px;line-height:24px;text-align:center;color:#f69931;cursor:pointer;}",
                  button: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;}",
                  more: "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;display:none;}",
                  button_a: "{display:inline-block;width:50px;border:1px solid #d5d5d5;}",
                  button_a_hover: "{background-color:#494949;color:#ffffff;}"
              }
          },
          w = [];
      (t = n({
              clsName: {
                  edage: y.clsName.edage,
                  normal: y.clsName.label,
                  alert: y.clsName.alert,
                  list: y.clsName.list,
                  dellist: y.clsName.dellist,
                  panel: y.clsName.panel,
                  button: y.clsName.button,
                  more: y.clsName.more,
                  panel_popup: y.clsName.panel_popup
              },
              flashDom: void 0,
              delistPos: void 0,
              compare_dom_id: void 0,
              position: null,
              userObj: {
                  symbol: "sh000001"
              }
          },
          t || null
      )),
      (t.id = t.compare_dom_id.split("_")[2]),
      w.push(t.tkchart);
      var C,
          K,
          x,
          T = [],
          N = 4,
          L = {
              no: "请选择要对比的证券代码名称拼音",
              added: "已经添加了该证券",
              delist: "此证券已退市",
              more: "最多可对比5只证券"
          },
          S = 2e3;
      v();
  }
  var a = e.$C,
      n = e.oc,
      i = e.$DOM,
      o = e.cssUtil,
      s = e.xh5_EvtUtil,
      l = e.isFunc;
  return new(function() {
      (this.VER = "1.0.0"),
      (this.get = function(e, a) {
          var n = new t(e);
          l(a) && a(n);
      });
  })();
});
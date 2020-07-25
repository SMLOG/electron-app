//quotekchart v1.0.0 2019/12/26
!(function (t, i) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = i(require("_")))
    : "function" == typeof define && define.amd
    ? define(["_"], i)
    : "object" == typeof exports
    ? (exports["quotekchart"] = i(require("_")))
    : (t["quotekchart"] = i(t["_"]));
})(window, function (t) {
  return (function (t) {
    function i(o) {
      if (e[o]) return e[o].exports;
      var n = (e[o] = {
        i: o,
        l: !1,
        exports: {},
      });
      return t[o].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
    }
    var e = {};
    return (
      (i.m = t),
      (i.c = e),
      (i.d = function (t, e, o) {
        i.o(t, e) ||
          Object.defineProperty(t, e, {
            enumerable: !0,
            get: o,
          });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module",
          }),
          Object.defineProperty(t, "__esModule", {
            value: !0,
          });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (
          (i.r(o),
          Object.defineProperty(o, "default", {
            enumerable: !0,
            value: t,
          }),
          2 & e && "string" != typeof t)
        )
          for (var n in t)
            i.d(
              o,
              n,
              function (i) {
                return t[i];
              }.bind(null, n)
            );
        return o;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t["default"];
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, i) {
        return Object.prototype.hasOwnProperty.call(t, i);
      }),
      (i.p = ""),
      i((i.s = "./src/index.ts"))
    );
  })({
    "./css/box.css": function (t, i, e) {
      "use strict";
      e.r(i),
        (i["default"] =
          '.__emchatrs3_root_box {\n  position: relative;\n  font-family: "Arial";\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.__emchatrs3_root_box .__indextip {\n  position: absolute;\n  width: 100px;\n  padding: 5px;\n  font-size: 14px;\n  background-color: rgba(0, 0, 0, 0.2);\n  color: #fff;\n  text-align: center;\n  border-radius: 3px;\n  pointer-events: none;\n}\n.__emchatrs3_root_box .__indextip a {\n  pointer-events: auto;\n}\n.__emchatrs3_root {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  user-select: none;\n}\n.__emchatrs3_root .__ui,\n.__emchatrs3_root .__canvas,\n.__emchatrs3_root canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n.__emchatrs3_root .__ui {\n  z-index: 5 !important;\n  background-image: url("data:image/gif; base64,AAAA");\n}\n.__pop {\n  position: absolute;\n  display: none;\n  padding: 10px;\n  font-size: 12px;\n}\n.__pop > div a,\n.__pop > div p {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0;\n  margin: 0;\n  white-space: nowrap;\n  text-decoration: none;\n}\n.__pop > div a:hover {\n  color: #ff4901;\n}\n.__pop_dft {\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #ffffff;\n}\n.__pop_dft span {\n  margin-left: 10px;\n}\n.__emchatrs3_root_box * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.__em_minimap {\n  clear: both;\n}\n.__emchatrs3_root_box .__ui {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n  background-color: rgba(255, 255, 255, 0.001);\n}\n.__emchatrs3_root_box .__dotspoint {\n  position: absolute;\n  width: 0;\n  height: 0;\n  left: 0;\n  top: 0;\n  overflow: visible;\n  z-index: 15;\n  user-select: none;\n}\n.__emchatrs3_root_box .__dotspoint span {\n  margin-right: 4px;\n}\n.__emchatrs3_root_box .__dotspoint .__pop {\n  position: absolute;\n  background-color: #fff;\n  padding: 5px 5px;\n  font-size: 12px;\n  color: #333333;\n  border: 1px solid #65CAFE;\n  z-index: 15;\n}\n.__emchatrs3_root_box .__dotspoint .__dotgroup {\n  position: absolute;\n  width: 0;\n  height: 0;\n  left: 0;\n  top: 0;\n  overflow: visible;\n}\n.__emchatrs3_root_box .__dotspoint .__dotgroup > div {\n  position: absolute;\n  cursor: pointer;\n}\n.__emchatrs3_root_box .__dotspoint .__dotgroup > div img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.__emchatrs3_root_box .__canvas {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n}\n.__emchatrs3_root_box .__canvas canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  z-index: 5;\n}\n/* 主图指标 */\n.__emchatrs3_root_box .__quota {\n  position: absolute;\n  color: #5F5F5F;\n  width: 60px;\n  right: 0;\n  background: #ffffff;\n}\n.__emchatrs3_root_box .__qtip {\n  font-size: 12px;\n  font-family: "simsun";\n  padding: 2px 0;\n  vertical-align: middle;\n  width: 65px;\n  overflow: visible;\n}\n.__emchatrs3_root_box .__qtip span {\n  display: inline-block;\n  vertical-align: middle;\n}\n.__emchatrs3_root_box .__qtip label {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 4px;\n  width: 12px;\n  height: 12px;\n  border: 1px solid #dddddd;\n}\n.__emchatrs3_root_box .__qtip label::after {\n  content: "";\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border: 3px solid rgba(0, 0, 0, 0);\n  border-left: 3px solid #666666;\n  border-bottom: 3px solid #666666;\n  transform: rotate(-45deg);\n  left: 3px;\n  top: 1px;\n}\n.__emchatrs3_root_box .kt-pad {\n  padding-top: 8px;\n}\n.__emchatrs3_root_box .kt-title {\n  margin-bottom: 10px;\n  font-size: 12px;\n}\n.__emchatrs3_root_box .kt-line {\n  position: relative;\n  margin-bottom: 10px;\n  font-size: 12px;\n}\n.__emchatrs3_root_box .kt-radio-wrap {\n  position: relative;\n  border: solid 1px #305896;\n  height: 10px;\n  width: 10px;\n}\n.__emchatrs3_root_box .kt-radio-wrap div {\n  position: absolute;\n  display: none;\n  margin: 2px;\n  width: 6px;\n  height: 6px;\n  background-color: #305896;\n}\n.__emchatrs3_root_box .kt-radio-choose div {\n  display: block !important;\n}\n.__emchatrs3_root_box .kt-name {\n  position: absolute;\n  color: #555;\n  line-height: 18px;\n  height: 16px;\n  top: -3px;\n  left: 15px;\n  font-family: "simsun";\n}\n.__emchatrs3_root_box .__technologyindex {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  text-align: center;\n  background-color: #888888;\n}\n.__emchatrs3_root_box .__technologyindex::after {\n  content: "";\n  display: block;\n  clear: bton;\n}\n.__emchatrs3_root_box .__technologyindex li {\n  float: left;\n  cursor: pointer;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 100;\n  font-family: simsun;\n}\n.__emchatrs3_root_box .__technologyindex_act {\n  background-color: #aaaaaa;\n}\n.__emchatrs3_root_box .__em_minimap {\n  position: absolute;\n  bottom: 0;\n  z-index: 30;\n  overflow: visible;\n}\n.__emchatrs3_root_box .__slidebar {\n  position: absolute;\n  height: 100%;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.1);\n  cursor: move;\n}\n.__emchatrs3_root_box .__em_minimap .__sb_left,\n.__emchatrs3_root_box .__em_minimap .__sb_right {\n  position: absolute;\n  cursor: w-resize;\n  width: 10px;\n  height: 50%;\n  top: 25%;\n  background-color: #999999;\n}\n.__emchatrs3_root_box .__em_minimap .__sb_left {\n  left: -5px;\n}\n.__emchatrs3_root_box .__em_minimap .__sb_right {\n  right: -5px;\n}\n.__emchatrs3_root_box .__popfloatwin {\n  position: absolute;\n  display: none;\n  border: 1px solid #97c8ff;\n  width: 120px;\n  font-size: 12px;\n  background-color: #ffffff;\n  color: #999999;\n  padding-bottom: 5px;\n  top: 30px;\n  z-index: 50;\n  cursor: move;\n  font-family: Arial, Helvetica, sans-serif;\n}\n.__emchatrs3_root_box .__popfloatwin h4 {\n  color: #333333;\n  background-color: #edf5ff;\n  margin: 0;\n  padding: 4px 0;\n  text-align: center;\n  margin-bottom: 4px;\n}\n.__emchatrs3_root_box .__popfloatwin h4 label,\n.__emchatrs3_root_box .__popfloatwin h4 span {\n  display: block;\n  text-align: center;\n  cursor: move;\n}\n.__emchatrs3_root_box .__popfloatwin h4 label {\n  color: red;\n}\n.__emchatrs3_root_box .__popfloatwin h4 span {\n  color: #333333;\n}\n.__emchatrs3_root_box .__popfloatwin div {\n  position: relative;\n  padding: 0 10px;\n  margin-bottom: 2px;\n}\n.__emchatrs3_root_box .__popfloatwin div label {\n  color: #999999;\n  display: inline-block;\n  height: 14px;\n  line-height: 14px;\n}\n.__emchatrs3_root_box .__popfloatwin div span {\n  float: right;\n  text-align: right;\n  display: inline-block;\n  height: 14px;\n  line-height: 14px;\n}\n.__emchatrs3_root_box .__rise {\n  color: red;\n}\n.__emchatrs3_root_box .__fall {\n  color: green;\n}\n.__emchatrs3_root_box .__hold {\n  color: #333333;\n}\n.__emchatrs3_root_box .__popwin_tendency {\n  position: absolute;\n  display: none;\n  background-color: rgba(0, 0, 0, 0.6);\n  padding: 12px;\n  font-size: 14px;\n  -webkit-transition-duration: 0.1s;\n  z-index: 60;\n}\n.__emchatrs3_root_box .__popwin {\n  position: absolute;\n  display: none;\n  z-index: 40;\n}\n.__emchatrs3_root_box .__default {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffffff;\n  padding: 10px;\n  pointer-events: none;\n}\n.__emchatrs3_root_box .__default h4 {\n  margin: 0;\n  margin-bottom: 5px;\n  font-size: 16px;\n}\n.__emchatrs3_root_box .__default div {\n  font-size: 14px;\n}\n.__emchatrs3_root_box .__default div i {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  margin-right: 5px;\n}\n.__emchatrs3_root_box .__default div label {\n  margin-right: 5px;\n}\n.__emchatrs3_root_box .__popwin_style {\n  background-color: rgba(0, 0, 0, 0.6);\n  padding: 10px;\n  font-size: 12px;\n  color: #fff;\n}\n.__emchatrs3_root_box .__popwin_style .__strong {\n  font-weight: 900;\n}\n.__emchatrs3_root_box .__popwin_style .__poplist div {\n  margin: 5px 0;\n}\n.__emchatrs3_root_box .__popwin_style .__poplist div > label {\n  margin-right: 5px;\n}\n.__emchatrs3_root_box .__popwin_tendency h4 {\n  margin: 0;\n  text-align: center;\n  color: #ffffff;\n  /* min-width: 120px; */\n}\n.__emchatrs3_root_box .__popwin_tendency div {\n  margin-top: 5px;\n  color: #fafafa;\n}\n.__emchatrs3_root_box .__popwin_default div {\n  color: #fafafa;\n}\n.__emchatrs3_root_box .__points {\n  position: absolute;\n  /* width: 100%; */\n  /* height: 100%; */\n  overflow: visible;\n  z-index: 30;\n}\n.__emchatrs3_root_box .__points div {\n  position: absolute;\n  border-radius: 50%;\n  cursor: pointer;\n  /* pointer-events:none; */\n}\n.__emchatrs3_root_box .__points div div {\n  background-color: inherit;\n  position: absolute;\n  display: block;\n  width: 70%;\n  height: 70%;\n  top: 15%;\n  left: 15%;\n  border-radius: 50%;\n}\n.__emchatrs3_root_box .__popwin_mini {\n  position: absolute;\n  display: none;\n  background-color: #ffffff;\n  border-radius: 4px;\n  padding: 2px 6px;\n  border: 1px solid #9B9B9B;\n  font-size: 12px;\n  pointer-events: none;\n  opacity: 0.9;\n}\n.__emchatrs3_root_box .__popwin_line {\n  position: absolute;\n  display: none;\n  background-color: #ffffff;\n  border-radius: 4px;\n  padding: 8px 10px;\n  border: 1px solid #9B9B9B;\n  font-size: 12px;\n  pointer-events: none;\n  opacity: 0.9;\n}\n.__emchatrs3_root_box .__popwin_line > div {\n  font-size: 14px;\n  padding: 0;\n  color: #333333;\n}\n.__emchatrs3_root_box .__popwin_mini > div {\n  color: #333333;\n}\n.__emchatrs3_root_box .__layerText {\n  display: none;\n}\n.__emchatrs3_root_box:hover .__layerText {\n  display: block;\n}\n.__emchatrs3_root_box .__positionChanges div {\n  position: absolute;\n  border-radius: 50%;\n  transition-duration: 0.3s;\n  -ms-transition-duration: 0.3s;\n  width: 6px;\n  height: 6px;\n  opacity: 0.5;\n  cursor: pointer;\n}\n.__emchatrs3_root_box .__positionChanges div:hover {\n  margin-left: -2px;\n  margin-top: -2px;\n  width: 10px;\n  height: 10px;\n}\n/*盘口异动的数据最后一条闪烁*/\n.timePositionChangesAni {\n  animation: timePositionChangesAni 0.7s infinite linear alternate;\n  -webkit-animation: timePositionChangesAni 0.7s infinite linear alternate;\n  -ms-animation: timePositionChangesAni 0.7s infinite linear alternate;\n}\n@keyframes timePositionChangesAni {\n  0% {\n    width: 6px;\n    height: 6px;\n    margin-top: 0;\n    margin-left: 0;\n  }\n  100% {\n    width: 10px;\n    height: 10px;\n    margin-top: -2px;\n    margin-left: -2px;\n  }\n}\n@-webkit-keyframes timePositionChangesAni {\n  0% {\n    width: 6px;\n    height: 6px;\n    margin-top: 0;\n    margin-left: 0;\n  }\n  100% {\n    width: 10px;\n    height: 10px;\n    margin-top: -2px;\n    margin-left: -2px;\n  }\n}\n@-ms-keyframes timePositionChangesAni {\n  0% {\n    width: 6px;\n    height: 6px;\n    margin-top: 0;\n    margin-left: 0;\n  }\n  100% {\n    width: 10px;\n    height: 10px;\n    margin-top: -2px;\n    margin-left: -2px;\n  }\n}\n/* 盘口异动浮窗 */\n.__emchatrs3_root_box .__positionChangePop {\n  position: absolute;\n  width: 120px;\n  border: 1px solid #65CAFE;\n  height: 50px;\n  background-color: #ffffff;\n  font-size: 12px;\n  color: #666666;\n}\n.__emchatrs3_root_box .__positionChangePop::after {\n  content: "";\n  display: block;\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 8px solid #65CAFE;\n  border-left: 8px solid #65CAFE;\n  border-bottom: 8px solid rgba(0, 0, 0, 0);\n  border-right: 8px solid rgba(0, 0, 0, 0);\n  left: 50%;\n  z-index: 2;\n  transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  top: -8px;\n  margin-left: -8px;\n}\n.__emchatrs3_root_box .__positionChangePop > div {\n  float: left;\n  height: 40px;\n  width: 60px;\n  padding: 5px 0;\n}\n.__emchatrs3_root_box .__positionChangePop > div:first-child {\n  background-color: #D1E7FF;\n}\n.__emchatrs3_root_box .__positionChangePop img {\n  display: block;\n  height: 25x;\n  margin: 0 auto;\n}\n.__emchatrs3_root_box .__positionChangePop label {\n  display: block;\n  height: 20px;\n  margin-top: 5px;\n  text-align: center;\n}\n.__emchatrs3_root_box .__positionChangePop span {\n  display: block;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n}\n.__emchatrs3_root_box .__em_loading {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  display: none;\n  z-index: 30;\n}\n.__emchatrs3_root_box .__em_loading img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -39px;\n  margin-top: -50px;\n  display: block;\n}\n.__emchatrs3_cmfb {\n  position: absolute;\n  box-sizing: border-box;\n  padding: 0 10px;\n}\n.__emchatrs3_cmfb > div {\n  position: relative;\n  font-size: 14px;\n  color: #333333;\n}\n.__emchatrs3_cmfb > div label {\n  display: inline-block;\n  width: 90%;\n}\n.__emchatrs3_cmfb > div span {\n  position: absolute;\n  display: block;\n  top: 0;\n  right: 0;\n  text-align: right;\n}\n.__emchatrs3_cmfb .ratio {\n  line-height: 18px !important;\n}\n.__emchatrs3_cmfb .ratio label {\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.__emchatrs3_cmfb .ratio span {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-left: none !important;\n}\n.__emchatrs3_cmfb .ratio label,\n.__emchatrs3_cmfb .ratio span {\n  text-align: center;\n  box-sizing: border-box;\n  padding: 3px 0;\n}\n');
    },
    "./images/loading.gif": function (t, i, e) {
      "use strict";
      e.r(i),
        (i["default"] =
          "data:image/gif;base64,R0lGODlhTgBkAPf/AP///yw+UKywtezw8Xd/iNfa3JWep+zt7lZibvX294WMlGdxfMLFyYiSnM3P0tfb3rC2vbe7v0NRYJOZoKKqsjdIWeXn6b3CyPLz9MrP011reWh1gp+lq+Lj5YCLll9te1FgbkVVZLS7wYyWoFJhcDFDVO7v8ThIWrC4vtrd4Gx5hsjO04GMl7i+xHqGkGRxf83S1vr6+5CapIeRnFpoduDl5+Di5aSttDpLW/7+/kVUZFVkcsLIzevv8NTa3UtbapylrZSdppiiqv39/vz8/C9BUz1OXsfM0KqxuHSBjKautjRGV+bo6m16hujq7JKcpX2JlC5AUfb392FufDxMXUFRYbzDyfP09ZegqUhYZ/Hy86yzukNTY/v7/Nba3cXKz/T19s7S19zf4tHX2nB8iOHk5jNEVent7oWPmePl6FhmdHN/i0ZWZvj4+d3g45qjq6CosFNicUBQYI6Youvt793h5HaCjr7DybnAxers7srR1XeDjrK5v+/x8kpZabvBx3iEj2ZzgKSss3F9idPX29DU2E9ebfn6+qGpsf39/ebr7IqUnuru76OrszNFVsDHzNbZ3XuHkr/Fyo+Zoufs7YOOmNHV2T9PYJihqp+nr05dbK63va61vEpaaL7EyW57h8TJznqFkejs7Z2mrmp3hOnr7MzQ1JagqZmjq5miq7W9w3J+iVZldKixuHSAi4mTnaWttenr7eTm6Pj5+quyubrAxkxca+js7kJSY+Pn6eTp69XY3KuzurzCyKevtmx4hd/k57G6wMXM0Ku0utbc3+3u8Kiwt8fO0q20u9rf4nmGkZafqHWCjZ6osL3EyneEj3B+iklYaGp4hKKss0ZWZeDk56WutsjN0sfN0sjM0aGrs9nf4dbb3nWBjNve4aWutcvP1NPZ3KmyuZqkrKewuOHm6EZVZr/Gy4eTnUVWZXaCjdLY29fd4Jiiq9vg43OAi7vCyNjd4KOstHOAjNnf4s7U2G58iOvs7kJRYrzDyLa+xHWCjtfa3uLk56iutv///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1Rjg3OEM0OUNGODExRTdBODBCODM3MUU2NUJERDMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1Rjg3OEM1OUNGODExRTdBODBCODM3MUU2NUJERDMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjVGODc4QzI5Q0Y4MTFFN0E4MEI4MzcxRTY1QkREMzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjVGODc4QzM5Q0Y4MTFFN0E4MEI4MzcxRTY1QkREMzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3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");
    },
    "./images/water_mark.png": function (t, i, e) {
      "use strict";
      e.r(i),
        (i["default"] =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAABSCAYAAAA2Lk16AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEREJGMDUzQkZCQzUxMUU1OEY5M0QwOTQzOUVCOTg4QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEREJGMDUzQ0ZCQzUxMUU1OEY5M0QwOTQzOUVCOTg4QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkREQkYwNTM5RkJDNTExRTU4RjkzRDA5NDM5RUI5ODhBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkREQkYwNTNBRkJDNTExRTU4RjkzRDA5NDM5RUI5ODhBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TKYRegAAHUBJREFUeNrsXQlzGzey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");
    },
    "./old/common/arrayExtension.js": function (t, i) {
      t.exports = {
        findMaxMin: function (t) {
          0 == t.length && (t = [0]);
          var i = t.slice().filter(function (t) {
            return void 0 != t && null != t && "" != t;
          });
          return (
            0 == i.length && (i = [0]),
            i.sort(function (t, i) {
              return t - i;
            }),
            {
              max: i[i.length - 1] / 1,
              min: i[0] / 1,
            }
          );
        },
      };
    },
    "./old/common/canvasExtension.js": function (t, i, e) {
      var o = e("./old/common/coordinate.js");
      t.exports = function (t) {
        (t.EMRect = function (t, i, e, o) {
          (t = Math.round(t)),
            (e = Math.round(e)),
            (i = Math.round(i)),
            (o = Math.round(o)),
            this.beginPath(),
            this.moveTo(t, i),
            this.lineTo(t, o),
            this.lineTo(e, o),
            this.lineTo(e, i),
            this.closePath(),
            this.stroke(),
            this.fill();
        }),
          (t.EMFill = function (t, i, e, o) {
            this.beginPath(),
              this.moveTo(t, i),
              this.lineTo(t, o),
              this.lineTo(e, o),
              this.lineTo(e, i),
              this.closePath(),
              this.stroke(),
              this.fill();
          }),
          (t.EMFill2 = function (t, i, e, n) {
            (t = o.format(t)),
              (e = o.format(e)),
              (i = o.format(i)),
              (n = o.format(n)),
              this.beginPath(),
              this.moveTo(t, i),
              this.lineTo(t, n),
              this.lineTo(e, n),
              this.lineTo(e, i),
              this.closePath(),
              this.stroke(),
              this.fill();
          }),
          (t.EMFillRect = function (t, i, e, n, a) {
            (a = o.format(a)),
              (t = o.format(t)),
              (e = o.format(e)),
              (i = o.format(i)),
              (n = o.format(n)),
              (e - t) % 2 == 1 && (e -= 1),
              this.beginPath(),
              this.moveTo(t, i),
              this.lineTo(t, n),
              this.lineTo(e, n),
              this.lineTo(e, i),
              this.closePath(),
              this.stroke(),
              this.fill();
          }),
          (t.EMFillRect2 = function (t, i, e, n) {
            t = o.format(t);
            var a = o.format(t - i),
              s = o.format(t + 2);
            (e = o.format(e)),
              (n = o.format(n)),
              (s - a) % 2 == 1 && (s -= 1),
              this.beginPath(),
              this.moveTo(a, e),
              this.lineTo(a, n),
              this.lineTo(s, n),
              this.lineTo(s, e),
              this.closePath(),
              this.stroke(),
              this.fill();
          }),
          (t.EMFillRect3 = function (t, i, e, n) {
            t = o.format(t);
            var a = o.format(t - i / 2),
              s = o.format(t + i / 2);
            (e = o.format(e)),
              (n = o.format(n)),
              (s - a) % 2 == 1 && (s -= 1),
              this.beginPath(),
              this.moveTo(a, e),
              this.lineTo(a, n),
              this.lineTo(s, n),
              this.lineTo(s, e),
              this.closePath(),
              this.stroke(),
              this.fill();
          }),
          (t.EMFillPillar = function (t, i, e, n, a) {
            (t = o.format(t)),
              (i = o.format(i)),
              n > 2
                ? (n = Math.floor(n * a))
                : (n = Math.floor(n) - 1) < 1 && (n = 0),
              this.beginPath(),
              this.moveTo(o.format(e - n), t),
              this.lineTo(o.format(e + n), t),
              this.lineTo(o.format(e + n), i),
              this.lineTo(o.format(e - n), i),
              this.closePath(),
              this.stroke(),
              this.fill();
          }),
          (t.EMLine = function (t, i, e, n) {
            (t = o.format(t)),
              (e = o.format(e)),
              (i = o.format(i)),
              (n = o.format(n)),
              this.lineWidth % 2 == 0 &&
                ((t = Math.round(t)),
                (e = Math.round(e)),
                (i = Math.round(i)),
                (n = Math.round(n))),
              this.beginPath(),
              this.moveTo(t, i),
              this.lineTo(t, n),
              this.lineTo(e, n),
              this.lineTo(e, i),
              this.closePath(),
              this.stroke();
          }),
          (t.EMLine2 = function (t, i, e, n) {
            (t = o.format(t)),
              (e = o.format(e)),
              (i = o.format(i)),
              (n = o.format(n)),
              this.lineWidth % 2 == 0 &&
                ((t = Math.round(t)),
                (e = Math.round(e)),
                (i = Math.round(i)),
                (n = Math.round(n))),
              this.beginPath(),
              this.moveTo(t, i),
              this.lineTo(e, n),
              this.closePath(),
              this.stroke();
          }),
          (t.EMStroke = function (t, i, e, n) {
            (t = o.format(t)),
              (e = o.format(e)),
              (i = o.format(i)),
              (n = o.format(n)),
              this.lineWidth % 2 == 0 &&
                ((t = Math.round(t)),
                (e = Math.round(e)),
                (i = Math.round(i)),
                (n = Math.round(n))),
              this.beginPath(),
              this.moveTo(t, i),
              this.lineTo(t, n),
              this.lineTo(e, n),
              this.lineTo(e, i),
              this.closePath(),
              this.stroke();
          }),
          (t.dashed = function (t, i, e, n, a, s) {
            (a = void 0 === a ? 4 : a), (s = void 0 === s ? 5 : s);
            var r = Math.abs(t - e),
              l = Math.abs(i - n),
              h = Math.sqrt(Math.pow(t - e, 2) + Math.pow(i - n, 2)),
              d = h % (a + s);
            if ((0 == d && (d = a / 2), d > a)) {
              d = (d % a) / 2;
            }
            var p = 0,
              c = l / h,
              A = r / h;
            this.beginPath();
            for (var g = !0; p < h; ) {
              var f = o.format(t + p * A),
                m = o.format(i + p * c);
              this.lineWidth % 2 == 0 &&
                ((f = Math.round(t + p * A)), (m = Math.round(i + p * c))),
                this.moveTo(f, m),
                g ? ((p += d), (g = !1)) : (p += a),
                p > h && (p = h);
              var u = o.format(t + p * A),
                x = o.format(i + p * c);
              this.lineWidth % 2 == 0 &&
                ((u = Math.round(t + p * A)), (x = Math.round(i + p * c))),
                this.lineTo(u, x),
                (p += s),
                this.stroke();
            }
            this.closePath();
          });
      };
    },
    "./old/common/coordinate.js": function (t, i) {
      t.exports = {
        format: function (t) {
          var i = Math.round(t);
          return i < t ? i + 0.5 : i - 0.5;
        },
      };
    },
    "./old/common/cyq/index.js": function (t, i) {
      function e(t, i, e) {
        (this.klinedata = t), (this.fator = i || 150), (this.range = e);
      }
      function o(t) {
        for (var i = [], e = 0; e < t; e++) i.push(0);
        return i;
      }
      (t.exports = e),
        (e.prototype.calc = function (t) {
          function i(t) {
            for (var i = 0, e = 0, o = 0; o < s; o++) {
              var n = A[o].toPrecision(12) / 1;
              if (e + n > t) {
                i = a + o * p;
                break;
              }
              e += n;
            }
            return i;
          }
          function e() {
            (this.x = arguments[0]),
              (this.y = arguments[1]),
              (this.benefitPart = arguments[2]),
              (this.avgCost = arguments[3]),
              (this.percentChips = arguments[4]),
              (this.computePercentChips = function (t) {
                if (t > 1 || t < 0) throw 'argument "percent" out of range';
                var e = [(1 - t) / 2, (1 + t) / 2],
                  o = [i(D * e[0]), i(D * e[1])];
                return {
                  priceRange: [o[0].toFixed(2), o[1].toFixed(2)],
                  concentration:
                    o[0] + o[1] === 0 ? 0 : (o[1] - o[0]) / (o[0] + o[1]),
                };
              }),
              (this.getBenefitPart = function (t) {
                for (var i = 0, e = 0; e < s; e++) {
                  var o = A[e].toPrecision(12) / 1;
                  t >= a + e * p && (i += o);
                }
                return 0 == D ? 0 : i / D;
              });
          }
          var n = 0,
            a = 0,
            s = this.fator,
            r = this.range ? Math.max(0, t - this.range + 1) : 0,
            l = this.klinedata.slice(r, Math.max(1, t + 1));
          if (0 === l.length) throw "invaild index";
          for (var h = 0; h < l.length; h++) {
            var d = l[h];
            (n = n ? Math.max(n, d[3] / 1) : d[3] / 1),
              (a = a ? Math.min(a, d[4] / 1) : d[4] / 1);
          }
          for (
            var p = Math.max(0.01, (n - a) / (s - 1)), c = [], h = 0;
            h < s;
            h++
          )
            c.push((a + p * h).toFixed(2) / 1);
          for (var A = o(s), h = 0; h < l.length; h++) {
            for (
              var g = l[h],
                f = g[1] / 1,
                m = g[2] / 1,
                u = g[3] / 1,
                x = g[4] / 1,
                v = (f + m + u + x) / 4,
                w = Math.min(1, g[8] / 100 || 0),
                y = Math.floor((u - a) / p),
                M = Math.ceil((x - a) / p),
                B = [u == x ? s - 1 : 2 / (u - x), Math.floor((v - a) / p)],
                C = 0;
              C < A.length;
              C++
            )
              A[C] *= 1 - w;
            if (u == x) A[B[1]] += (B[0] * w) / 2;
            else
              for (var I = M; I <= y; I++) {
                var b = a + p * I;
                b <= v
                  ? Math.abs(v - x) < 1e-8
                    ? (A[I] += B[0] * w)
                    : (A[I] += ((b - x) / (v - x)) * B[0] * w)
                  : Math.abs(u - v) < 1e-8
                  ? (A[I] += B[0] * w)
                  : (A[I] += ((u - b) / (u - v)) * B[0] * w);
              }
          }
          for (var k = this.klinedata[t][2] / 1, D = 0, h = 0; h < s; h++) {
            var E = A[h].toPrecision(12) / 1;
            D += E;
          }
          var R = new e();
          return (
            (R.x = A),
            (R.y = c),
            (R.benefitPart = R.getBenefitPart(k)),
            (R.avgCost = i(0.5 * D).toFixed(2)),
            (R.percentChips = {
              90: R.computePercentChips(0.9),
              70: R.computePercentChips(0.7),
            }),
            R
          );
        });
    },
    "./old/common/drawLine.js": function (t, i, e) {
      var o = e("./old/common/coordinate.js");
      t.exports = {
        dashed: function (t, i, e, n, a, s, r) {
          (s = void 0 === s ? 4 : s), (r = void 0 === r ? 5 : r);
          var l = Math.abs(i - n),
            h = Math.abs(e - a),
            d = Math.sqrt(Math.pow(i - n, 2) + Math.pow(e - a, 2)),
            p = d % (s + r);
          if ((0 == p && (p = s / 2), p > s)) {
            p = (p % s) / 2;
          }
          var c = 0,
            A = h / d,
            g = l / d;
          t.beginPath();
          for (var f = !0; c < d; ) {
            var m = o.format(i + c * g),
              u = o.format(e + c * A);
            t.lineWidth % 2 == 0 &&
              ((m = Math.round(i + c * g)), (u = Math.round(e + c * A))),
              t.moveTo(m, u),
              f ? ((c += p), (f = !1)) : (c += s),
              c > d && (c = d);
            var x = o.format(i + c * g),
              v = o.format(e + c * A);
            t.lineWidth % 2 == 0 &&
              ((x = Math.round(i + c * g)), (v = Math.round(e + c * A))),
              t.lineTo(x, v),
              (c += r),
              t.stroke();
          }
          t.closePath();
        },
      };
    },
    "./old/common/extend2.js": function (t, i) {
      t.exports = _.merge;
    },
    "./old/common/getConvert.js": function (t, i) {
      function e(t, i) {
        for (var e = o(i), n = [], a = e.length, s = 0; s < a; s++) {
          var r = e[s],
            l = {};
          switch (t) {
            case "VAVERAGE":
              var h = void 0 === r.volume5 ? "-" : r.volume5.toFixed(3) / 1,
                d = void 0 === r.volume10 ? "-" : r.volume10.toFixed(3) / 1;
              (l = [r.time, h, d]), n.push(l);
              break;
            case "CMA":
              var p = void 0 === r.Average5 ? "-" : r.Average5.toFixed(3) / 1,
                c = void 0 === r.Average10 ? "-" : r.Average10.toFixed(3) / 1,
                A = void 0 === r.Average20 ? "-" : r.Average20.toFixed(3) / 1,
                g = void 0 === r.Average30 ? "-" : r.Average30.toFixed(3) / 1,
                f = void 0 === r.Average60 ? "-" : r.Average60.toFixed(3) / 1;
              (l = [r.time, p, c, A, f]), n.push(l);
              break;
            case "MA":
              var p = void 0 === r.Average5 ? "-" : r.Average5.toFixed(3),
                c = void 0 === r.Average10 ? "-" : r.Average10.toFixed(3),
                A = void 0 === r.Average20 ? "-" : r.Average20.toFixed(3),
                g = void 0 === r.Average30 ? "-" : r.Average30.toFixed(3),
                m = void 0 === r.Average3 ? "-" : r.Average3.toFixed(3),
                u = void 0 === r.Average6 ? "-" : r.Average6.toFixed(3),
                x = void 0 === r.Average12 ? "-" : r.Average12.toFixed(3),
                v = void 0 === r.Average24 ? "-" : r.Average24.toFixed(3),
                w = void 0 === r.Average50 ? "-" : r.Average50.toFixed(3),
                f = void 0 === r.Average60 ? "-" : r.Average60.toFixed(3);
              (l[r.time] = [p, c, A, g, m, u, x, v, w, f]), n.push(l);
              break;
            case "ASI":
              var y = void 0 === r.ASI ? "-" : r.ASI.toFixed(3);
              (l[r.time] = [y]), n.push(l);
              break;
            case "EXPMA":
              var x = void 0 === r.Average12 ? "-" : r.Average12.toFixed(3),
                w = void 0 === r.Average50 ? "-" : r.Average50.toFixed(3);
              (l = [r.time, x, w]), n.push(l);
              break;
            case "SAR":
              var M = void 0 === r.SAR ? "-" : r.SAR.toFixed(3);
              (l = [r.time, M]), n.push(l);
              break;
            case "BBI":
              var B = void 0 === r.BBI ? "-" : r.BBI.toFixed(3);
              (l = [r.time, B]), n.push(l);
              break;
            case "RSI":
              if (s > 4) {
                var C =
                    0 == r.RSI_DN_A
                      ? "-"
                      : ((r.RSI_UP_A / r.RSI_DN_A) * 100).toFixed(3) / 1,
                  I =
                    0 == r.RSI_DN_B
                      ? "-"
                      : ((r.RSI_UP_B / r.RSI_DN_B) * 100).toFixed(3) / 1,
                  b =
                    "0" == r.RSI_DN_C
                      ? "-"
                      : ((r.RSI_UP_C / r.RSI_DN_C) * 100).toFixed(3) / 1;
                l = [r.time, C, I, b];
              } else l = ["-", "-", "-", "-"];
              n.push(l);
              break;
            case "KDJ":
              var k = void 0 === r.KDJ_K ? "-" : r.KDJ_K.toFixed(3) / 1,
                D = void 0 === r.KDJ_D ? "-" : r.KDJ_D.toFixed(3) / 1,
                E = void 0 === r.KDJ_J ? "-" : r.KDJ_J.toFixed(3) / 1;
              (l = [r.time, k, D, E]), n.push(l);
              break;
            case "MACD":
              var R = void 0 === r.MACD_DIF ? "-" : r.MACD_DIF.toFixed(3) / 1,
                Q = void 0 === r.MACD_DEA ? "-" : r.MACD_DEA.toFixed(3) / 1,
                _ = void 0 === r.MACD ? "-" : r.MACD.toFixed(3) / 1;
              "-" != R && "-" != Q && (_ = (2 * (R - Q)).toFixed(3) / 1),
                (l = [r.time, R, Q, _]),
                n.push(l);
              break;
            case "WR":
              var j = void 0 === r.WR_A ? "-" : r.WR_A.toFixed(3) / 1,
                O = void 0 === r.WR_B ? "-" : r.WR_B.toFixed(3) / 1;
              (l = [r.time, j, O]), n.push(l);
              break;
            case "DMI":
              var S = void 0 === r.DMI_PDI ? "-" : r.DMI_PDI.toFixed(3) / 1,
                F = void 0 === r.DMI_MDI ? "-" : r.DMI_MDI.toFixed(3) / 1,
                G = void 0 === r.DMI_ADX ? "-" : r.DMI_ADX.toFixed(3) / 1,
                Y = void 0 === r.DMI_ADXR ? "-" : r.DMI_ADXR.toFixed(3) / 1;
              (l = [r.time, S, F, G, Y]), n.push(l);
              break;
            case "BIAS":
              var T = void 0 === r.BIAS_A ? "-" : r.BIAS_A.toFixed(3) / 1,
                K = void 0 === r.BIAS_B ? "-" : r.BIAS_B.toFixed(3) / 1,
                U = void 0 === r.BIAS_C ? "-" : r.BIAS_C.toFixed(3) / 1;
              (l = [r.time, T, K, U]), n.push(l);
              break;
            case "OBV":
              var J = void 0 === r.OBV ? "-" : r.OBV.toFixed(3) / 1,
                L = void 0 === r.OBV_MA ? "-" : r.OBV_MA.toFixed(3) / 1;
              (l = [r.time, J, L]), n.push(l);
              break;
            case "CCI":
              var P = void 0 === r.CCI ? "-" : r.CCI.toFixed(3) / 1;
              (l = [r.time, P]), n.push(l);
              break;
            case "ROC":
              var H = void 0 === r.ROC ? "-" : r.ROC.toFixed(3) / 1,
                W = void 0 === r.ROC_MA ? "-" : r.ROC_MA.toFixed(3) / 1;
              (l = [r.time, H, W]), n.push(l);
              break;
            case "CR":
              var N = void 0 === r.CR_A ? "-" : r.CR_A.toFixed(3) / 1,
                Z = void 0 === r.CR_B ? "-" : r.CR_B.toFixed(3) / 1,
                V = void 0 === r.CR_C ? "-" : r.CR_C.toFixed(3) / 1,
                q = void 0 === r.CR ? "-" : r.CR.toFixed(3) / 1;
              (l = [r.time, N, Z, V, q]), n.push(l);
              break;
            case "BOLL":
              var X = void 0 === r.BOLL ? "-" : r.BOLL.toFixed(3) / 1,
                z = void 0 === r.BOLL_UPPER ? "-" : r.BOLL_UPPER.toFixed(3) / 1,
                $ = void 0 === r.BOLL_LOWER ? "-" : r.BOLL_LOWER.toFixed(3) / 1,
                tt = void 0 === r.high ? "-" : r.high.toFixed(3) / 1;
              (l = [r.time, X, z, $, tt]), n.push(l);
          }
        }
        return n;
      }
      function o(t) {
        null == t || t.Count;
        for (var i = [], e = t.length, o = 0; o < e; o++) {
          var s = t[o].split(","),
            r = a();
          (r.time = s[0]),
            (r.open = parseFloat(s[1])),
            (r.close = parseFloat(s[2])),
            (r.high = parseFloat(s[3])),
            (r.low = parseFloat(s[4])),
            (r.volume = Number(s[5])),
            i.push(r);
        }
        for (
          var l,
            h,
            d,
            p,
            c,
            A,
            g,
            f,
            m,
            u,
            x,
            v,
            w,
            y,
            M,
            B,
            C,
            I,
            b,
            k,
            D,
            E,
            R,
            Q,
            _,
            j,
            O,
            S,
            F,
            G,
            Y = !0,
            T = 0,
            K = 0,
            o = 0;
          o < e;
          o++
        ) {
          if (o >= 4) {
            (l = 0), (h = 0);
            for (var U = 0; U < 5; U++)
              (l += i[o - U].close), (h += i[o - U].volume);
            (i[o].Average5 = l / 5), (i[o].volume5 = h / 5);
          }
          if (o >= 9) {
            (l = 0), (h = 0);
            for (var U = 0; U < 10; U++)
              (l += i[o - U].close), (h += i[o - U].volume);
            (i[o].Average10 = l / 10), (i[o].volume10 = h / 10);
          }
          if (o >= 19) {
            l = 0;
            for (var U = 0; U < 20; U++) l += i[o - U].close;
            i[o].Average20 = l / 20;
          }
          if (o >= 29) {
            l = 0;
            for (var U = 0; U < 30; U++) l += i[o - U].close;
            i[o].Average30 = l / 30;
          }
          if (o >= 2) {
            l = 0;
            for (var U = 0; U < 3; U++) l += i[o - U].close;
            i[o].Average3 = l / 3;
          }
          if (o >= 5) {
            l = 0;
            for (var U = 0; U < 6; U++) l += i[o - U].close;
            i[o].Average6 = l / 6;
          }
          if (o >= 11) {
            l = 0;
            for (var U = 0; U < 12; U++) l += i[o - U].close;
            i[o].Average12 = l / 12;
          }
          if (o >= 23) {
            l = 0;
            for (var U = 0; U < 24; U++) l += i[o - U].close;
            i[o].Average24 = l / 24;
          }
          if (o >= 49) {
            l = 0;
            for (var U = 0; U < 50; U++) l += i[o - U].close;
            i[o].Average50 = l / 50;
          }
          if (o >= 59) {
            l = 0;
            for (var U = 0; U < 60; U++) l += i[o - U].close;
            i[o].Average60 = l / 60;
          }
          if (
            (o >= 1 &&
              ((d = i[o - 1].close),
              (p = Math.abs(i[o].high - d)),
              (c = Math.abs(i[o].low - d)),
              (A = Math.abs(i[o].high - i[o - 1].low)),
              (g = Math.abs(d - i[o - 1].open)),
              (f =
                p > c && p > A
                  ? p + c / 2 + g / 4
                  : c > A && c > p
                  ? c + p / 2 + g / 4
                  : A + g / 4),
              (m = i[o].close + (i[o].close - i[o].open) / 2 - i[o - 1].open),
              0 != f &&
                (i[o].ASI = i[o - 1].ASI + ((16 * m) / f) * Math.max(p, c))),
            o >= 5)
          ) {
            l = 0;
            for (var U = 0; U < 6; U++) l += i[o - U].close;
            0 != l && (i[o].BIAS_A = 100 * (i[o].close / (l / 6) - 1));
          }
          if (o >= 11) {
            l = 0;
            for (var U = 0; U < 12; U++) l += i[o - U].close;
            0 != l && (i[o].BIAS_B = 100 * (i[o].close / (l / 12) - 1));
          }
          if (o >= 23) {
            l = 0;
            for (var U = 0; U < 24; U++) l += i[o - U].close;
            0 != l && (i[o].BIAS_C = 100 * (i[o].close / (l / 24) - 1));
          }
          if (o >= 19) {
            l = 0;
            for (var U = 0; U < 20; U++) l += i[o - U].close;
            (i[o].BOLL = l / 20), (l = 0);
            for (var U = 0; U < 20; U++)
              l += (i[o - U].close - i[o].BOLL) * (i[o - U].close - i[o].BOLL);
            (u = parseFloat(Math.sqrt(l / 20))),
              (i[o].BOLL_UPPER = i[o].BOLL + 2 * u),
              (i[o].BOLL_LOWER = i[o].BOLL - 2 * u);
          }
          if (
            ((i[o].CCI_TYP = (i[o].high + i[o].low + i[o].close) / 3), o >= 13)
          ) {
            l = 0;
            for (var U = 0; U < 14; U++) l += i[o - U].close;
            l / 14, (l = 0);
            for (var U = 0; U < 14; U++) l += i[o - U].CCI_TYP;
            (x = l / 14), (l = 0);
            for (var U = 0; U < 14; U++) l += Math.abs(i[o - U].CCI_TYP - x);
            0 != l && (i[o].CCI = (i[o].CCI_TYP - x) / ((l / 14) * 0.015));
          }
          if (((i[o].CR_MID = (i[o].high + i[o].low) / 2), 0 == o))
            (i[o].CR = 100),
              (i[o].CR_AX = Math.max(i[o].high - i[o].CR_MID, 0)),
              (i[o].CR_BX = Math.max(i[o].CR_MID - i[o].low, 0));
          else {
            (i[o].CR_AX = Math.max(i[o].high - i[o - 1].CR_MID, 0)),
              (i[o].CR_BX = Math.max(i[o - 1].CR_MID - i[o].low, 0)),
              (v = w = 0);
            for (var U = 0; U < 26 && U < o + 1; U++)
              (v += i[o - U].CR_AX), (w += i[o - U].CR_BX);
            if ((0 != w && (i[o].CR = (v / w) * 100), o >= 9)) {
              l = 0;
              for (var U = 0; U < 10; U++) l += i[o - U].CR;
              o + 5 < i.Length && (i[o + 5].CR_A = l / 10);
            }
            if (o >= 19) {
              l = 0;
              for (var U = 0; U < 20; U++) l += i[o - U].CR;
              o + 9 < i.Length && (i[o + 9].CR_B = l / 20);
            }
            if (o >= 39) {
              l = 0;
              for (var U = 0; U < 40; U++) l += i[o - U].CR;
              o + 17 < i.Length && (i[o + 17].CR_C = l / 40);
            }
          }
          if (
            (0 == o
              ? ((i[o].DMI_TR = Math.max(
                  Math.max(
                    i[o].high - i[o].low,
                    Math.abs(i[o].high - i[o].close)
                  ),
                  Math.abs(i[o].close - i[o].low)
                )),
                (y = 0),
                (M = 0))
              : ((i[o].DMI_TR = Math.max(
                  Math.max(
                    i[o].high - i[o].low,
                    Math.abs(i[o].high - i[o - 1].close)
                  ),
                  Math.abs(i[o - 1].close - i[o].low)
                )),
                (y = i[o].high - i[o - 1].high),
                (M = i[o - 1].low - i[o].low)),
            (i[o].DMI_DMP = y > 0 && y > M ? y : 0),
            (i[o].DMI_DMM = M > 0 && M > y ? M : 0),
            o >= 13)
          ) {
            if (13 == o) {
              B = C = I = 0;
              for (var U = 0; U < 14; U++)
                (B += i[o - U].DMI_TR),
                  (C += i[o - U].DMI_DMP),
                  (I += i[o - U].DMI_DMM);
              (i[o].DMI_EXPMEMA_TR = B / 14),
                (i[o].DMI_EXPMEMA_DMP = C / 14),
                (i[o].DMI_EXPMEMA_DMM = I / 14);
            } else
              (i[o].DMI_EXPMEMA_TR =
                (2 * i[o].DMI_TR + 13 * i[o - 1].DMI_EXPMEMA_TR) / 15),
                (i[o].DMI_EXPMEMA_DMP =
                  (2 * i[o].DMI_DMP + 13 * i[o - 1].DMI_EXPMEMA_DMP) / 15),
                (i[o].DMI_EXPMEMA_DMM =
                  (2 * i[o].DMI_DMM + 13 * i[o - 1].DMI_EXPMEMA_DMM) / 15);
            0 != i[o].DMI_EXPMEMA_TR &&
              ((i[o].DMI_PDI =
                (100 * i[o].DMI_EXPMEMA_DMP) / i[o].DMI_EXPMEMA_TR),
              (i[o].DMI_MDI =
                (100 * i[o].DMI_EXPMEMA_DMM) / i[o].DMI_EXPMEMA_TR),
              i[o].DMI_PDI + i[o].DMI_MDI != 0 &&
                (i[o].DMI_MPDI =
                  (Math.abs(i[o].DMI_MDI - i[o].DMI_PDI) /
                    (i[o].DMI_MDI + i[o].DMI_PDI)) *
                  100));
          }
          if (o >= 18)
            if (18 == o) {
              b = 0;
              for (var U = 0; U < 6; U++) b += i[o - U].DMI_MPDI;
              i[o].DMI_ADX = b / 6;
            } else
              i[o].DMI_ADX = (2 * i[o].DMI_MPDI + 5 * i[o - 1].DMI_ADX) / 7;
          if (o >= 23)
            if (23 == o) {
              k = 0;
              for (var U = 0; U < 6; U++) k += i[o - U].DMI_ADX;
              i[o].DMI_ADXR = k / 6;
            } else
              i[o].DMI_ADXR = (2 * i[o].DMI_ADX + 5 * i[o - 1].DMI_ADXR) / 7;
          (D = i[o].low), (E = i[o].high);
          for (var U = 0; U < 9 && U < o + 1; U++)
            E < i[o - U].high && (E = i[o - U].high),
              D > i[o - U].low && (D = i[o - U].low);
          if (
            (E != D && (i[o].KDJ_RSV = ((i[o].close - D) / (E - D)) * 100),
            0 == o
              ? ((i[o].KDJ_K = i[o].KDJ_RSV),
                (i[o].KDJ_D = i[o].KDJ_RSV),
                (i[o].KDJ_J = i[o].KDJ_RSV))
              : ((i[o].KDJ_K = i[o].KDJ_RSV / 3 + (2 * i[o - 1].KDJ_K) / 3),
                (i[o].KDJ_D = i[o].KDJ_K / 3 + (2 * i[o - 1].KDJ_D) / 3),
                (i[o].KDJ_J = 3 * i[o].KDJ_K - 2 * i[o].KDJ_D)),
            0 == o
              ? ((i[o].MACD_AX = i[o].close),
                (i[o].MACD_BX = i[o].close),
                (i[o].MACD_DIF = 0),
                (i[o].MACD_DEA = 0))
              : ((i[o].MACD_AX = (2 * i[o].close + 11 * i[o - 1].MACD_AX) / 13),
                (i[o].MACD_BX = (2 * i[o].close + 25 * i[o - 1].MACD_BX) / 27),
                (i[o].MACD_DIF = i[o].MACD_AX - i[o].MACD_BX),
                (i[o].MACD_DEA =
                  (2 * i[o].MACD_DIF + 8 * i[o - 1].MACD_DEA) / 10)),
            o > 0 &&
              (i[o].close > i[o - 1].close
                ? (i[o].OBV = i[o - 1].OBV + i[o].volume)
                : i[o].close < i[o - 1].close
                ? (i[o].OBV = i[o - 1].OBV - i[o].volume)
                : (i[o].OBV = i[o - 1].OBV),
              o >= 29))
          ) {
            R = 0;
            for (var U = 0; U < 30; U++) R += i[o - U].OBV;
            i[o].OBV_MA = R / 30;
          }
          if (
            ((Q = Math.min(11, o)),
            0 != i[o - Q].close &&
              (i[o].ROC = 100 * (i[o].close / i[o - Q].close - 1)),
            o >= 5)
          ) {
            l = 0;
            for (var U = 0; U < 6; U++) l += i[o - U].ROC;
            i[o].ROC_MA = l / 6;
          }
          if (
            (o > 0 &&
              ((_ = Math.max(i[o].close - i[o - 1].close, 0)),
              (j = Math.abs(i[o].close - i[o - 1].close)),
              1 == o
                ? ((i[o].RSI_UP_A = _),
                  (i[o].RSI_DN_A = j),
                  (i[o].RSI_UP_B = _),
                  (i[o].RSI_DN_B = j),
                  (i[o].RSI_UP_C = _),
                  (i[o].RSI_DN_C = j))
                : ((i[o].RSI_UP_A = _ + (5 * i[o - 1].RSI_UP_A) / 6),
                  (i[o].RSI_DN_A = j + (5 * i[o - 1].RSI_DN_A) / 6),
                  (i[o].RSI_UP_B = _ + (11 * i[o - 1].RSI_UP_B) / 12),
                  (i[o].RSI_DN_B = j + (11 * i[o - 1].RSI_DN_B) / 12),
                  (i[o].RSI_UP_C = _ + (23 * i[o - 1].RSI_UP_C) / 24),
                  (i[o].RSI_DN_C = j + (23 * i[o - 1].RSI_DN_C) / 24))),
            3 == o)
          ) {
            if (Y) {
              var U, U;
              K = i[o].high;
              for (var U = 0; U < 4; U++)
                K < i[o - U].high && (K = i[o - U].high);
              T = i[o].low;
              for (var U = 0; U < 4; U++)
                T > i[o - U].low && (T = i[o - U].low);
              (i[o].SAR = T), (i[o].SAR_RED = !0), 0.02, (Y = !1);
            }
          } else o > 3 && n(o, i);
          O = S = F = 0;
          for (var U = 0; U < 26 && U < o + 1; U++)
            o >= U + 1
              ? i[o - U].close > i[o - U - 1].close
                ? (O += i[o - U].volume)
                : i[o - U].close < i[o - U - 1].close
                ? (S += i[o - U].volume)
                : (F += i[o - U].volume)
              : ((O += i[o - U].volume / 3),
                (S += i[o - U].volume / 3),
                (F += i[o - U].volume / 3));
          if (
            (2 * S + F != 0 && (i[o].VR = (100 * (2 * O + F)) / (2 * S + F)),
            o >= 5)
          ) {
            G = 0;
            for (var U = 0; U < 6; U++) G += i[o - U].VR;
            i[o].VR_MA = G / 6;
          }
          (D = i[o].low), (E = i[o].high);
          for (var U = 0; U < 10 && U < o + 1; U++)
            E < i[o - U].high && (E = i[o - U].high),
              D > i[o - U].low && (D = i[o - U].low);
          E != D && (i[o].WR_A = (100 * (E - i[o].close)) / (E - D)),
            (D = i[o].low),
            (E = i[o].high);
          for (var U = 0; U < 6 && U < o + 1; U++)
            E < i[o - U].high && (E = i[o - U].high),
              D > i[o - U].low && (D = i[o - U].low);
          E != D && (i[o].WR_B = (100 * (E - i[o].close)) / (E - D)),
            o >= 23 &&
              (i[o].BBI =
                (i[o].Average3 +
                  i[o].Average6 +
                  i[o].Average12 +
                  i[o].Average24) /
                4);
        }
        return i;
      }
      function n(t, i) {
        if (_bool) {
          if (s) {
            d = i[t].high;
            for (var e = 0; e < 2; e++)
              d < i[t - e].high && (d = i[t - e].high);
            h = i[t].low;
            for (var e = 0; e < 2; e++) h > i[t - e].low && (h = i[t - e].low);
            (i[t].SAR = h), (i[t].SAR_RED = !0), (l = 0.02);
          } else {
            d = i[t].high;
            for (var e = 0; e < 2; e++)
              d < i[t - e].high && (d = i[t - e].high);
            h = i[t].low;
            for (var e = 0; e < 2; e++) h > i[t - e].low && (h = i[t - e].low);
            (i[t].SAR = d), (i[t].SAR_RED = !1), (l = 0.02);
          }
          _bool = !1;
        } else
          s
            ? ((i[t].SAR = i[t - 1].SAR + l * (d - i[t - 1].SAR)),
              (i[t].SAR_RED = !0),
              i[t].high > d && ((d = i[t].high), (l = Math.min(l + 0.02, 0.2))),
              i[t].SAR > i[t].close && ((s = !1), (_bool = !0), n(t, i)))
            : ((i[t].SAR = i[t - 1].SAR + l * (h - i[t - 1].SAR)),
              (i[t].SAR_RED = !1),
              i[t].low < h && ((h = i[t].low), (l = Math.min(l + 0.02, 0.2))),
              i[t].SAR < i[t].close && ((s = !0), (_bool = !0), n(t, i)));
      }
      function a() {
        return {
          Average5: 0,
          Average10: 0,
          Average20: 0,
          Average30: 0,
          Average3: 0,
          Average6: 0,
          Average12: 0,
          Average24: 0,
          Average50: 0,
          Average60: 0,
          ASI: 0,
          BIAS_A: 0,
          BIAS_B: 0,
          BIAS_C: 0,
          BOLL: 0,
          BOLL_UPPER: 0,
          BOLL_LOWER: 0,
          CCI_TYP: 0,
          CCI: 0,
          CR_MID: 0,
          CR_AX: 0,
          CR_BX: 0,
          CR: 0,
          CR_A: 0,
          CR_B: 0,
          CR_C: 0,
          DMI_TR: 0,
          DMI_DMP: 0,
          DMI_DMM: 0,
          DMI_EXPMEMA_TR: 0,
          DMI_EXPMEMA_DMP: 0,
          DMI_EXPMEMA_DMM: 0,
          DMI_PDI: 0,
          DMI_MDI: 0,
          DMI_MPDI: 0,
          DMI_ADX: 0,
          DMI_ADXR: 0,
          KDJ_RSV: 0,
          KDJ_K: 0,
          KDJ_D: 0,
          KDJ_J: 0,
          MACD_AX: 0,
          MACD_BX: 0,
          MACD_DIF: 0,
          MACD_DEA: 0,
          MACD: 0,
          OBV: 0,
          OBV_MA: 0,
          ROC: 0,
          ROC_MA: 0,
          RSI_UP_A: 0,
          RSI_DN_A: 0,
          RSI_UP_B: 0,
          RSI_DN_B: 0,
          RSI_UP_C: 0,
          RSI_DN_C: 0,
          RSI_A: 0,
          RSI_B: 0,
          RSI_C: 0,
          SAR: 0,
          SAR_RED: 0,
          VR: 0,
          VR_MA: 0,
          WR_A: 0,
          WR_B: 0,
          BBI: 0,
          Zero: 0,
          volume5: 0,
          volume10: 0,
          time: 0,
          open: 0,
          close: 0,
          high: 0,
          low: 0,
          volume: 0,
        };
      }
      t.exports = e;
      var s = !0,
        _bool = !0,
        l = 0.02,
        h = 0,
        d = 0;
    },
    "./old/common/getDeviceType.js": function (t, i) {
      t.exports = function () {
        if (navigator.userAgent.toLocaleLowerCase().indexOf("ipad") > -1)
          return 1;
      };
    },
    "./old/common/getSuitableSplit.js": function (t, i, e) {
      var o = e("./old/common/splitYAxis.js");
      t.exports = function () {
        var t,
          i = this.options.drawRegion.k,
          e = this.options.scale.info,
          n = (this.options.maxin, e.newKAxisMax),
          a = e.newKAxisMin,
          s = o(n, a),
          r = i.h;
        return (
          s.splits.length % 2 == 0
            ? r > 150
              ? ((t = s.splits[0] || []), s.levels[0] || 0)
              : ((t = s.splits[1] || []), s.levels[1] || 0)
            : r >= 450
            ? ((t = s.splits[0] || []), s.levels[0] || 0)
            : r < 450 && r > 150
            ? ((t = s.splits[1] || []), s.levels[1] || 0)
            : ((t = s.splits[2] || []), s.levels[2] || 0),
          t
        );
      };
    },
    "./old/common/jsonp.js": function (t, i) {
      var e = function (t, i, e, o) {
        (t = t || ""), (i = i || {}), (e = e || ""), (o = o || function () {});
        if ("object" == typeof i) {
          for (
            var n = "",
              a = (function (t) {
                var i = [];
                for (var e in t) t.hasOwnProperty(e) && i.push(e);
                return i;
              })(i),
              s = 0;
            s < a.length;
            s++
          )
            (n += encodeURIComponent(a[s]) + "=" + encodeURIComponent(i[a[s]])),
              s != a.length - 1 && (n += "&");
          t += "?" + n;
        } else "function" == typeof i && ((e = i), (o = e));
        "function" == typeof e && ((o = e), (e = "callback")),
          Date.now ||
            (Date.now = function () {
              return new Date().getTime();
            });
        var r = Date.now(),
          l = "jsonp" + Math.round(r + 1000001 * Math.random());
        "string" == typeof e && (l = e),
          (window[l] = function (t) {
            o(t);
            try {
              document.getElementsByTagName("head")[0].removeChild(h),
                delete window[l];
            } catch (t) {
              window[l] = void 0;
            }
          }),
          -1 === t.indexOf("?") ? (t += "?") : (t += "&");
        var h = document.createElement("script");
        h.setAttribute("src", t + e + "=" + l),
          document.getElementsByTagName("head")[0].appendChild(h);
      };
      t.exports = e;
    },
    "./old/common/loading.js": function (t, i) {
      var e = function (t) {
        (this.par = t),
          (this.cc = t.cc),
          (this.w = t.width),
          (this.h = t.height),
          (this.ani = null),
          this._init();
      };
      (e.prototype._init = function () {
        for (
          this.ing = !1,
            this.sstop = !1,
            this.ri = 20,
            this.ro = 35,
            this.thicknes = 2,
            this.color = "#666666",
            this.fontsize = "16",
            this.count = 20,
            this.flt = 0.15,
            this.filter = 0,
            this.x = this.w / 2,
            this.y = 0.4 * this.h,
            this.txty = this.y + 2 * this.ro,
            this.fps = 40,
            this.deg = 360 / this.count,
            this.i = 0,
            this.txt = "loading...",
            this.cc.lineWidth = this.thicknes,
            this.cc.strokeStyle = this.color;
          this.i < this.count;
          this.i++
        )
          this._drawOne(this.i * this.deg, this.filter);
      }),
        (e.prototype._drawOne = function (t, i) {
          var e = (Math.PI / 180) * t,
            o = this.flt + (i || 0);
          if (
            (this.cc.beginPath(),
            this.cc.moveTo(
              Math.sin(e) * this.ri + this.x,
              Math.cos(e) * this.ri + this.y
            ),
            this.cc.lineTo(
              Math.sin(e) * this.ro + this.x,
              Math.cos(e) * this.ro + this.y
            ),
            this.cc.closePath(),
            this.cc.stroke(),
            (this.cc.fillStyle = "rgba(255,255,255," + o + ")"),
            this.cc.fillRect(0, 0, this.w, this.h),
            this.txt)
          ) {
            this.cc.save(),
              (this.cc.globalAlpha = 1),
              (this.cc.fillStyle = this.color),
              (this.cc.strokeStyle = "none"),
              (this.cc.font = "normal lighter 20px console");
            var n = this.cc.measureText(this.txt).width;
            this.cc.fillText(this.txt, this.x - n / 2, this.txty),
              this.cc.restore();
          }
        }),
        (e.prototype.start = function () {
          var t = this;
          (this.ing = !0),
            (this.ani = setInterval(function () {
              t._drawOne(t.i * t.deg, t.filter),
                t.i++,
                t.sstop &&
                  ((t.filter += 0.05),
                  t.filter > 0.9 &&
                    (clearInterval(t.ani), (t.ing = !1), t.callback()));
            }, t.fps));
        }),
        (e.prototype.stop = function (t) {
          (this.callback = t || function () {}), (this.sstop = !0);
        }),
        (e.prototype.log = function (t) {}),
        (t.exports = e);
    },
    "./old/common/loadingImg.js": function (t, i, e) {
      function o(t) {
        (this.ops = t), this.init();
      }
      var n = e("./images/loading.gif")["default"];
      (o.prototype.init = function () {
        var t = document.createElement("div");
        t.className = "__em_loading";
        var i = document.createElement("img");
        i.setAttribute("src", n),
          t.appendChild(i),
          this.ops.ui.appendChild(t),
          (this.dom = t);
      }),
        (o.prototype.start = function (t) {
          (this.dom.style.backgroundColor = t ? this.ops.bgColor : ""),
            (this.dom.style.display = "block");
        }),
        (o.prototype.stop = function () {
          this.dom.style.display = "none";
        }),
        (t.exports = o);
    },
    "./old/common/splitYAxis.js": function (t, i) {
      t.exports = function (t, i) {
        function e(t) {
          t.length > 3 && (t.pop(), t.shift(), e(t));
        }
        function o(t, i) {
          var e = t / i,
            o = Math.round(e);
          return o > e && (o -= 1), o * i;
        }
        function n(t, i) {
          var e = t / i,
            o = Math.round(e);
          return o < e && (o += 1), o * i;
        }
        var a = {};
        (a.max = t), (a.min = i);
        var s = [1, 2, 5],
          r = 1e-4,
          l = t - i;
        a.diff = l;
        for (var h = []; ; ) {
          for (var d = 0; d < s.length; d++) {
            var p = l / (r * s[d]);
            p > 0.5 && p < 32 && h.push(r * s[d]);
          }
          if ((r *= 10) > 1e8) break;
        }
        e(h), (a.levels = h), (a.splits = []);
        for (var d = 0; d < h.length; d++)
          a.splits.push(
            (function (t, i, e) {
              var a;
              try {
                a = (e + "").split(".")[1].length;
              } catch (t) {
                a = 2;
              }
              for (var s = n(t, e), r = o(i, e), l = [], h = s; ; )
                if ((l.push(h.toFixed(a) / 1), (h -= e) < r - e / 2)) break;
              return l;
            })(t, i, h[d])
          );
        return 0 == t && 0 == i && ((a.splits = []), (a.levels = [])), a;
      };
    },
    "./old/common/tools.js": function (t, i) {
      t.exports = {
        findArrayMax: function (t) {
          for (var i = [0], e = 0; e < t.length; e++)
            isNaN(t[e]) || i.push(parseFloat(t[e]));
          return (
            i.sort(function (t, i) {
              return i - t;
            }),
            i[0]
          );
        },
        findArrayMin: function (t) {
          for (var i = [0], e = 0; e < t.length; e++)
            isNaN(t[e]) || i.push(parseFloat(t[e]));
          return (
            i.sort(function (t, i) {
              return t - i;
            }),
            i[0]
          );
        },
        formatNumUnit: function (t, i, e) {
          if ("-" == t || "" == t || void 0 === t) return t;
          var o;
          if (
            ((i = i < 0 ? 0 : i),
            void 0 === e && (e = 5),
            (o = e < 5 ? 5 : e),
            void 0 === i)
          )
            if (Math.abs(t) < 0.01) {
              for (var n = Math.abs(t), a = 2, s = 1; s < 10; s++)
                if (n * Math.pow(10, s) > 1) {
                  a = s + 1;
                  break;
                }
              (i = a), (o = a + 2);
            } else {
              var r = (t + "").split(".");
              r[1] && (i = r[1].length > 4 ? 4 : r[1].length);
            }
          try {
            t = parseFloat(t);
          } catch (i) {
            return t;
          }
          var l,
            h = Math.abs(t),
            d = h / t,
            p = "";
          return (
            h >= 1e4 && h < 1e8
              ? ((p = "万"), (h /= 1e4))
              : h >= 1e8
              ? ((p = "亿"), (h /= 1e8))
              : h >= 1e12 && ((p = "万亿"), (h /= 1e12)),
            (h + "").indexOf(".") == o - 1 && (o += 1),
            (l = h.toFixed(i).substr(0, o)),
            d < 0 && (l = "-" + l),
            l.indexOf(".") == l.length - 1 && (l = l.substr(0, l.length - 1)),
            l + p
          );
        },
        secondsToTime: function (t) {
          function i(t) {
            return t >= 10 ? t : "0" + t;
          }
          var e = (t / 3600) % 24,
            o = Math.floor(e),
            n = e % 1,
            a = Math.round(60 * n);
          return i(o) + ":" + i(a);
        },
        floatToEven: function (t) {
          var i = Math.floor(t);
          return parseInt(t) % 2 == 0 ? i : i + 1;
        },
        dateFormat: function (t, i) {
          var e = {
            "M+": i.getMonth() + 1,
            "d+": i.getDate(),
            "h+": i.getHours(),
            "m+": i.getMinutes(),
            "s+": i.getSeconds(),
            "q+": Math.floor((i.getMonth() + 3) / 3),
            S: i.getMilliseconds(),
          };
          /(y+)/.test(t) &&
            (t = t.replace(
              RegExp.$1,
              (i.getFullYear() + "").substr(4 - RegExp.$1.length)
            ));
          for (var o in e)
            new RegExp("(" + o + ")").test(t) &&
              (t = t.replace(
                RegExp.$1,
                1 == RegExp.$1.length
                  ? e[o]
                  : ("00" + e[o]).substr(("" + e[o]).length)
              ));
          return t;
        },
        URLObjToStr: function (t) {
          var i = [];
          for (var e in t) i.push(e + "=" + t[e]);
          return i.join("&");
        },
      };
    },
    "./old/common/watermark.js": function (t, i, e) {
      var o = e("./images/water_mark.png")["default"];
      t.exports = function (t, i) {
        i = void 0 === i ? 0 : i;
        var e = this.layer.layerWatermarkC || this.ctxs.layerWatermarkC,
          n = this.options,
          a = n.padding,
          s = n.drawRegion || {},
          r = (s.k && s.k.mt) || 0,
          l = n.width,
          h = new Image();
        (h.width = 328 / 3),
          (h.height = 82 / 3),
          (h.src = o),
          (h.onload = function () {
            var o = l - a.right - 328 / 3 - 10 - i,
              s = a.top + r + 10 + (t || 1);
            "bottom" == n.watermark &&
              (s = n.height - a.bottom - n.font.size - 82 / 3 - 5),
              e.drawImage(h, o, s, 328 / 3, 82 / 3);
          });
      };
    },
    "./old/dataFormat.js": function (t, i, e) {
      var o = e("./old/common/arrayExtension.js"),
        n = e("./old/common/getConvert.js");
      e("./old/common/splitYAxis.js");
      t.exports = {
        formatK: function () {
          var t = ",2,3,6,7,13,80,",
            i = this.sdata.k || {},
            e = i.data || [],
            a = i.info || {},
            s = i.flow || [],
            r = a.yc || 0,
            l = 2;
          if ((a.pricedigit || "").indexOf(".") > -1)
            try {
              l = a.pricedigit.split(".")[1].length;
            } catch (t) {
              l = 2;
            }
          var h = [];
          if (s.length > 0) {
            for (var d = 0; d < s.length - 1; d++) {
              var p = s[d],
                c = s[d + 1],
                A = {
                  start: new Date(
                    p.time.substr(0, 10).replace(/-/g, "/")
                  ).getTime(),
                  end: new Date(
                    c.time.substr(0, 10).replace(/-/g, "/")
                  ).getTime(),
                  ltg: p.ltg,
                };
              h.push(A);
            }
            var g = s[s.length - 1];
            h.push({
              start: new Date(
                g.time.substr(0, 10).replace(/-/g, "/")
              ).getTime(),
              end:
                new Date(g.time.substr(0, 10).replace(/-/g, "/")).getTime() +
                999999999999,
              ltg: g.ltg,
            });
          }
          for (
            var f = [], m = [], u = [r], x = [r], v = [r], w = {}, d = 0;
            d < e.length;
            d++
          ) {
            var y = e[d].split(","),
              M = d > 0 ? d - 1 : 0,
              B = e[M].split(","),
              C = (y[2] / 1 - B[2] / 1).toFixed(l),
              I = ((C / B[2]) * 100).toFixed(l),
              b = [
                y[0],
                y[1],
                y[2],
                y[3],
                y[4],
                y[5],
                y[6],
                y[7],
                (C / 1).toFixed(l),
                I,
                B[2],
              ];
            if (h.length > 0)
              for (
                var k = new Date(y[0].replace(/-/g, "/")).getTime(), D = 0;
                D < h.length;
                D++
              ) {
                var E = h[D];
                if (k >= E.start && k < E.end) {
                  var R = (y[5] / E.ltg) * 100;
                  t.indexOf("," + a.jys + ",") > -1 && (R *= 100),
                    (R = R.toFixed(2) / 1),
                    b.push(R),
                    y.push(R);
                }
              }
            m.push(y),
              f.push(b),
              u.push(y[3]),
              x.push(y[4]),
              v.push(y[5]),
              w[y[0]] || (w[y[0]] = 1);
          }
          var Q = {
            kMax: o.findMaxMin(u).max,
            kMin: o.findMaxMin(x).min,
            tradingMax: o.findMaxMin(v).max,
            tradingMin: o.findMaxMin(v).min,
            decimal: l,
            code: i.code,
            name: i.name,
            yc: r,
            mk: a.mk,
            sp: a.sp,
          };
          0 == r && (Q.kMax = 1),
            (this.data = this.data ? this.data : {}),
            (this.data.k = f),
            (this.data.ks = m);
          var _ = this.data.indexs || {};
          setTimeout(function () {
            (_.EXPMA = n("EXPMA", e)),
              (_.SAR = n("SAR", e)),
              (_.BOLL = n("BOLL", e)),
              (_.BBI = n("BBI", e)),
              (_.KDJ = n("KDJ", e)),
              (_.MACD = n("MACD", e)),
              (_.WR = n("WR", e)),
              (_.DMI = n("DMI", e)),
              (_.BIAS = n("BIAS", e)),
              (_.OBV = n("OBV", e)),
              (_.CCI = n("CCI", e)),
              (_.ROC = n("ROC", e));
          }, 10);
          var j = this.stauts;
          (_[j.indexv] = n(j.indexv, e)),
            (_[j.indexh] = n(j.indexh, e)),
            (_.VAVERAGE = n("VAVERAGE", e)),
            (this.data.info = Q),
            (this.data.indexs = _);
          var O = this.options.scale;
          if (void 0 === O.start && void 0 === O.end) {
            var p = e.length - this.options.scale.pillar;
            this.isfulldata || (p = e.length - this.options.scale.truepillar),
              (p = p < 0 ? 0 : p);
            var c = e.length - 1;
            (this.options.scale.start = p),
              (this.options.scale.end = c),
              (this.options.scale.fullDataSize = e.length);
          } else {
            var S = O.start,
              F = O.end,
              G = O.fullDataSize,
              Y = e.length,
              T = Math.round((S / G) * Y),
              K = Math.round((F / G) * Y);
            K > Y && (K = Y),
              T > K - O.min && (T = K - O.min),
              K < 0 && (K = 0),
              (O.pillar = K - T + 1),
              (O.start = T < 0 ? 0 : T),
              (O.end = K),
              (O.fullDataSize = Y);
          }
        },
      };
    },
    "./old/dataFormat2.js": function (t, i, e) {
      var o = e("./old/common/arrayExtension.js"),
        n = e("./old/common/getConvert.js");
      e("./old/common/splitYAxis.js");
      t.exports = {
        formatK: function () {
          var t = ",2,3,6,7,13,80,",
            i = this.sdata.k || {},
            e = i.data || [],
            a = i.info || {},
            s = i.flow || [],
            r = a.yc || 0,
            l = this.data.info.decimal,
            h = [];
          if (s.length > 0) {
            for (var d = 0; d < s.length - 1; d++) {
              var p = s[d],
                c = s[d + 1],
                A = {
                  start: new Date(
                    p.time.substr(0, 10).replace(/-/g, "/")
                  ).getTime(),
                  end: new Date(
                    c.time.substr(0, 10).replace(/-/g, "/")
                  ).getTime(),
                  ltg: p.ltg,
                };
              h.push(A);
            }
            var g = s[s.length - 1];
            h.push({
              start: new Date(
                g.time.substr(0, 10).replace(/-/g, "/")
              ).getTime(),
              end:
                new Date(g.time.substr(0, 10).replace(/-/g, "/")).getTime() +
                999999999999,
              ltg: g.ltg,
            });
          }
          for (
            var f = [], m = [], u = [r], x = [r], v = [r], w = {}, d = 0;
            d < e.length;
            d++
          ) {
            var y = e[d].split(","),
              M = d > 0 ? d - 1 : 0,
              B = e[M].split(","),
              C = (y[2] / 1 - B[2] / 1).toFixed(l),
              I = ((C / B[2]) * 100).toFixed(l),
              b = [
                y[0],
                y[1],
                y[2],
                y[3],
                y[4],
                y[5],
                y[6],
                y[7],
                (C / 1).toFixed(l),
                I,
                B[2],
              ];
            if (h.length > 0)
              for (
                var k = new Date(y[0].replace(/-/g, "/")).getTime(), D = 0;
                D < h.length;
                D++
              ) {
                var E = h[D];
                if (k >= E.start && k < E.end) {
                  var R = (y[5] / E.ltg) * 100;
                  t.indexOf("," + a.jys + ",") > -1 && (R *= 100),
                    (R = R.toFixed(2) / 1),
                    b.push(R),
                    y.push(R);
                }
              }
            m.push(y),
              f.push(b),
              u.push(y[3]),
              x.push(y[4]),
              v.push(y[5]),
              w[y[0]] || (w[y[0]] = 1);
          }
          var Q = {
            kMax: o.findMaxMin(u).max,
            kMin: o.findMaxMin(x).min,
            tradingMax: o.findMaxMin(v).max,
            tradingMin: o.findMaxMin(v).min,
            decimal: l,
            code: i.code,
            name: i.name,
            yc: r,
            mk: a.mk,
            sp: a.sp,
          };
          0 == r && (Q.kMax = 1),
            (this.data = this.data ? this.data : {}),
            (this.data.k = f),
            (this.data.ks = m);
          var _ = this.data.indexs || {};
          setTimeout(function () {
            (_.EXPMA = n("EXPMA", e)),
              (_.SAR = n("SAR", e)),
              (_.BOLL = n("BOLL", e)),
              (_.BBI = n("BBI", e)),
              (_.KDJ = n("KDJ", e)),
              (_.MACD = n("MACD", e)),
              (_.WR = n("WR", e)),
              (_.DMI = n("DMI", e)),
              (_.BIAS = n("BIAS", e)),
              (_.OBV = n("OBV", e)),
              (_.CCI = n("CCI", e)),
              (_.ROC = n("ROC", e));
          }, 10);
          var j = this.stauts;
          (_[j.indexv] = n(j.indexv, e)),
            (_[j.indexh] = n(j.indexh, e)),
            (_.VAVERAGE = n("VAVERAGE", e)),
            (this.data.info = Q),
            (this.data.indexs = _);
          var p = (this.options.scale, e.length - this.options.scale.pillar);
          p = p < 0 ? 0 : p;
          var c = e.length - 1;
          (this.options.scale.start = p),
            (this.options.scale.end = c),
            (this.options.scale.fullDataSize = e.length);
        },
      };
    },
    "./old/dataSplit.js": function (t, i, e) {
      var o = e("./old/common/arrayExtension.js"),
        n =
          (e("./old/common/splitYAxis.js"),
          e("./old/common/getSuitableSplit.js"));
      t.exports = {
        slice: function () {
          for (
            var t = this.stauts,
              i = this.options.scale,
              e = this.options.drawRegion,
              a = this.options.kgap,
              s = i.start,
              r = i.end + 1,
              l = this.data,
              h = (l.info.yc, l.k),
              d = h.slice(s, r),
              p = (l.info.decimal, []),
              c = [],
              A = [],
              g = {},
              f = 0;
            f < d.length;
            f++
          ) {
            var m = d[f];
            p.push(m[3]), c.push(m[4]), A.push(m[5]), g[m[0]] || (g[m[0]] = 1);
          }
          var u = [];
          for (var x in g) u.push(x);
          for (
            var v = {},
              w = o.findMaxMin(p).max,
              y = o.findMaxMin(c).min,
              M = o.findMaxMin(A).max,
              B = o.findMaxMin(A).min,
              C = l.indexs.VAVERAGE.slice(s, r),
              I = 0,
              b = -1 / 0,
              f = 0;
            f < C.length;
            f++
          ) {
            var k = C[f].slice(1).filter(function (t) {
                return t > 0;
              }),
              D = o.findMaxMin(k);
            (I = I < D.max ? D.max : I),
              0 != D.min && (b = b > D.min ? D.min : b);
          }
          var E = {},
            R = l.indexs;
          for (var x in R) E[x] = R[x].slice(s, r);
          for (
            var Q = E[t.indexv] || [], _ = -1 / 0, j = 1 / 0, f = 0;
            f < Q.length;
            f++
          ) {
            var O = Q[f].slice(1).filter(function (t) {
                return t > 0;
              }),
              D = o.findMaxMin(O);
            (_ = _ < D.max ? D.max : _),
              0 != D.min && (j = j > D.min ? D.min : j);
          }
          for (
            var S = E[t.indexh], F = -1 / 0, G = 1 / 0, f = 0;
            f < S.length;
            f++
          ) {
            var O = S[f].slice(1).filter(function (t) {
                return 0 != t;
              }),
              D = o.findMaxMin(O);
            (F = F < D.max ? D.max : F),
              0 != D.min && (G = G > D.min ? D.min : G);
          }
          var v = {};
          (v.kMax = w),
            (v.kMin = y),
            (v[t.indexv + "Max"] = _),
            (v[t.indexv + "Min"] = j),
            (v[t.indexh + "Max"] = F),
            (v[t.indexh + "Min"] = G),
            (v.KaxisMax = o.findMaxMin([w, _]).max),
            (v.KaxisMin = o.findMaxMin([y, j]).min),
            (v.tradingMax = M),
            (v.tradingMin = B),
            (v.tradingAvgMax = I),
            (v.tradingAvgMin = b),
            (v.tradingAxisMax = 1.1 * o.findMaxMin([M, I]).max),
            (v.tradingAxisMin = o.findMaxMin([M, I]).min);
          var Y = ((v.KaxisMax - v.KaxisMin) / e.k.h) * a.top,
            T = ((v.KaxisMax - v.KaxisMin) / e.k.h) * a.bottom;
          Y <= 0 && (Y = 0.01),
            T <= 0 && (T = 0.01),
            -999999999 == v.KaxisMax && (v.KaxisMax = 1),
            999999999 == v.KaxisMin && (v.KaxisMin = -1),
            (v.newKAxisMax = v.KaxisMax + Y),
            (v.newKAxisMin = v.KaxisMin - T),
            (i.data = d),
            (i.info = v),
            (i.time = u),
            (i.indexs = E);
          var K = n.call(this);
          (v.kAxisMax = K[0]),
            (v.kAxisMin = K[K.length - 1]),
            (v.splity = K),
            (this.options.drawRegion.k.y = K.length);
          var U = {};
          (U.data = d[d.length - 1]),
            (U.indexs = {}),
            (U.indexs.VAVERAGE = C[C.length - 1]),
            (U.indexs[t.indexv] = Q[Q.length - 1] || []),
            (U.indexs[t.indexh] = S[S.length - 1] || []),
            (this.options.thisData = U);
        },
      };
    },
    "./old/defaultSetting.js": function (t, i) {
      t.exports = {
        dpr: 1,
        ktype: "D",
        cfq: 0,
        font: {
          size: 12,
          family: "Arial",
        },
        scale: {
          pillar: 30,
          min: 10,
          minWidth: 10,
        },
        lineWidth: 1,
        pillarWidth: 0.7,
        padding: {
          top: 0,
          bottom: 0,
          left: 60,
          right: 65,
        },
        kgap: {
          top: 18,
          bottom: 18,
        },
        gridwh: {
          width: 100,
        },
        yAxisType: 1,
        formatTimeLine: {
          ymd: 60,
          ym: 450,
          interval: 32,
        },
        show: {
          name: !0,
          code: !1,
          CMA: !0,
          trading: !0,
          index: !0,
          minimap: !0,
          lr: !1,
          lrjumptip: !0,
          cf: !1,
          cfjumptip: !0,
          cqcx: !1,
          fold: !1,
        },
        popWin: {
          type: "auto",
          cls: "",
        },
        split2: {
          k: {
            marginTop: "auto",
            paddingTop: "none",
            body: 0.5,
            marginBottom: "auto",
            top: 0,
            x: 0,
            y: 8,
          },
          trading: {
            marginTop: "none",
            paddingTop: "auto",
            body: 0.2,
            marginBottom: "none",
            top: 0.5,
            x: 0,
            y: 3,
          },
          index: {
            marginTop: "none",
            paddingTop: "auto",
            body: 0.17,
            marginBottom: "12",
            top: 0.7,
            x: 0,
            y: 2,
          },
          minimap: {
            marginTop: "18",
            paddingTop: "none",
            body: 0.13,
            marginBottom: "none",
            top: 0.87,
            x: 0,
            y: 1,
          },
        },
        color: {
          background: "#ffffff",
          rise: "red",
          fall: "green",
          fill: "#52ccfc",
          border: "#666",
          dashed: "#ccc",
          equality: "#666",
          text: "#333",
          colorsMA: ["#376CFF", "#DD9900", "#FF00FF", "#008000"],
          colorsTrading: ["#FE59FE", "#323232", "#FF00FF"],
          colorsIndex: ["#a0a0a0", "#f4aa0a", "#ff1dff", "#007130"],
          minimap: {
            line: "#6EB4FF",
            fill: "#E4EFFF",
          },
          cyq: {
            up: "#5a8df8",
            avg: "#fa8d0d",
            down: "#FF0000",
          },
        },
        maxin: {
          show: !0,
          lineWidth: 30,
          color: "#333333",
          skewx: 0,
          skewy: 3,
          angle: -5,
        },
        cross: {
          solid: 2,
          dashed: 3,
          color: "#666666",
          dot: {
            radius: 2,
            color: "#41A0FF",
            opacity: 1,
            count: 1,
          },
        },
        dashedLine: {
          solid: 2,
          dashed: 3,
        },
        titleKeys: {
          CMA: ["MA5", "MA10", "MA20", "MA60"],
          EXPMA: ["EXPMA12", "EXPMA50"],
          SAR: ["SAR"],
          BOLL: ["BOLLMB", "BOLLUP", "BOLLDN"],
          BBI: ["BBI"],
          RSI: ["RSI6", "RSI12", "RSI24"],
          KDJ: ["K", "D", "J"],
          MACD: ["DIF", "DEA", "MACD"],
          WR: ["WR10", "WR6"],
          DMI: ["PDI", "MDI", "ADX", "ADXR"],
          BIAS: ["BIAS6", "BIAS12", "BIAS24"],
          OBV: ["OBV", "MAOBV"],
          CCI: ["CCI"],
          ROC: ["ROC", "MAROC"],
          LRCE: ["两融差额"],
          ZJL: ["超大单", "大单", "中单", "小单"],
        },
        onError: function (t) {},
        onComplete: function () {},
        onMove: function (t) {},
        onDrag: function (t) {},
        onClick: function () {},
        onDragStart: function (t) {},
        onDragEnd: function (t) {},
        onFold: function (t, i) {},
      };
    },
    "./old/dotPoint2.js": function (t, i) {
      t.exports = function () {
        var t = this.sdata.dot,
          i = this.layer.dotsPoint,
          e = this.options,
          o = e.drawRegion.k,
          n = e.padding,
          a = e.scale.data,
          s = e.width,
          r = e.drawRegion.drawSumWdith,
          l = e.width;
        for (var h in t) {
          var d = t[h];
          (d.width = d.width ? d.width : 10),
            (d.height = d.height ? d.height : 10);
          var p = void 0 === d.skew ? 0 : d.skew,
            c = n.left - d.width / 2,
            A = o.top + o.mt + o.pt + p;
          "bottom" == d.position &&
            (A = o.h - o.mb - o.pb + n.top - d.height - p - 1);
          var g = document.querySelector(".__emchatrs3_root_box .__" + h);
          g || (g = document.createElement("div")),
            (g.innerHTML = ""),
            (g.className = "__dotgroup __" + h),
            i.appendChild(g);
          for (var f = d.newpoi, m = 0, u = a.length; m < u; m++) {
            var x = f[a[m][0]];
            if (x && x.length > 0) {
              var v = r / u,
                w = v * m + v / 2,
                y = document.createElement("div");
              (y.className = d.className),
                (y.style.width = d.width + "px"),
                (y.style.height = d.height + "px"),
                (y.style.top = A + "px"),
                (y.style.left = c + w + "px");
              var M = document.createElement("img");
              d.img && ((M.src = d.img), y.appendChild(M)),
                x.length > 1 &&
                  d.multiple &&
                  (d.multiple.className && (y.className = d.multiple.className),
                  d.multiple.img && (M.src = d.multiple.img));
              var B = document.createElement("div");
              B.className = "__pop";
              for (var C = 0, I = x.length > 10 ? 10 : x.length; C < I; C++) {
                var b = x[C];
                if (b) {
                  var k = document.createElement("div");
                  (k.style.maxWidth = 0.5 * l + "px"),
                    (k.innerHTML = b.title),
                    B.appendChild(k);
                }
              }
              y.appendChild(B), g.appendChild(y), (B.style.display = "block");
              var D = B.getBoundingClientRect();
              B.style.top = d.height + "px";
              var E = 0;
              s - c - w < D.width / 2 && (E = D.width / 2 - (s - c - w)),
                D.width / 2 > c + w && (E = -(D.width / 2 - c - w)),
                (B.style.left = -(D.width / 2 + E) + "px"),
                (B.style.display = "none");
            }
          }
        }
      };
    },
    "./old/dotPointFormat.js": function (t, i) {
      t.exports = function () {
        var t = this.sdata,
          i = (t.k || "").data,
          e = t.dot;
        if (i) {
          for (var o = [], n = 0, a = i.length; n < a; n++) {
            var s = i[n].split(",");
            o.push({
              data: s[0],
              time: new Date(s[0]).getTime(),
            });
          }
          o.push({
            data: "2100-01-01",
            time: new Date("2100-01-01").getTime(),
          });
          for (var r in e) {
            for (
              var l = e[r], h = e[r].points, d = {}, n = 0, a = h.length;
              n < a;
              n++
            )
              for (
                var p = h[n],
                  c = new Date(p.date).getTime(),
                  A = 0,
                  g = o.length - 1;
                A < g;
                A++
              ) {
                var f = o[A],
                  m = o[A + 1];
                if (c > f.time && c <= m.time) {
                  var u = d[m.data] || [];
                  l.formatter && (p.title = l.formatter(p)),
                    u.push(p),
                    (d[m.data] = u);
                }
              }
            e[r].newpoi = d;
          }
        }
      };
    },
    "./old/drawBlockK.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t),
          (this.cc = t.layer.layerKC),
          (this.ccGrid = t.layer.layerGridC),
          (this.ops = t.options),
          (this.padding = this.ops.padding),
          (this.color = this.ops.color),
          (this.font = this.ops.font),
          (this.drawRegion = this.ops.drawRegion);
      }
      var n = e("./old/drawGrid.js"),
        a = e("./old/common/coordinate.js"),
        s = e("./old/common/drawLine.js"),
        r = e("./old/common/arrayExtension.js");
      (o.prototype.draw = function () {
        this.clear(),
          n.verticalLine(this.kObj, 1),
          n.gridK(this.ccGrid, this.ops),
          this.drawPillar(),
          this.axisY();
      }),
        (o.prototype.clear = function () {
          var t = this.ops.width,
            i = this.drawRegion.k,
            e = i.h - i.mb + 1 + this.padding.top;
          this.cc.clearRect(0, 0, t, e), this.ccGrid.clearRect(0, 0, t, e);
        }),
        (o.prototype.drawPillar = function () {
          var t = (this.cc, this.ops),
            i = t.scale,
            e = t.padding,
            o = t.maxin,
            n = i.data,
            a = i.info.newKAxisMax,
            s = i.info.newKAxisMin,
            l = (i.info.maxTrading, i.info.minTrading, i.pillar);
          n.length < l && (l = n.length), n.length < i.min && (l = i.min);
          for (
            var h = t.drawRegion.drawSumWdith,
              d = t.drawRegion.k,
              p = t.drawRegion.trading,
              c = d.h - d.mt - d.mb,
              A = (p.h, p.pt, h / l),
              g = a - s,
              f = d.h - d.mb + e.top,
              m =
                (p.h,
                p.top,
                e.top,
                {
                  basey: f,
                  max: 0,
                  maxindex: -1,
                  maxprise: 0,
                  maxx: 0,
                  min: 99999,
                  minindex: -1,
                  minx: 0,
                  minprise: 99999999,
                }),
              u = 0;
            u < n.length;
            u++
          ) {
            var x = n[u],
              v = ((x[1] - s) / g) * c,
              w = ((x[2] - s) / g) * c,
              y = ((x[3] - s) / g) * c,
              M = ((x[4] - s) / g) * c,
              B = this.padding.left + A * u + A / 2,
              C = r.findMaxMin([v, w, y, M]);
            C.max > m.max &&
              ((m.max = C.max),
              (m.maxindex = u),
              (m.maxx = B),
              (m.maxprise = x[3])),
              C.min < m.min &&
                ((m.min = C.min),
                (m.minindex = u),
                (m.minx = B),
                (m.minprise = x[4])),
              this.drawPillarItem({
                ho: f - v,
                hc: f - w,
                hh: f - y,
                hl: f - M,
                x: B,
                change: x[9] / 1,
                width: A,
              });
          }
          o.show && n.length > 0 && this.maxmin(m);
        }),
        (o.prototype.drawPillarItem = function (t) {
          var i = this.cc,
            e = this.color,
            o = this.ops.pillarWidth,
            n = t.ho,
            s = t.hc,
            r = t.hh,
            l = t.hl,
            h = t.x,
            d = t.width,
            p = d / 2;
          s < n
            ? ((i.strokeStyle = e.rise), (i.fillStyle = "rgba(0,0,0,0)"))
            : s == n
            ? ((i.strokeStyle = e.equality),
              (i.fillStyle = "rgba(0,0,0,0)"),
              t.change > 0
                ? (i.strokeStyle = e.rise)
                : t.change < 0 &&
                  ((i.strokeStyle = e.fall), (i.fillStyle = e.fall)))
            : ((i.strokeStyle = e.fall), (i.fillStyle = e.fall));
          var h = a.format(h);
          i.EMFillPillar(n, s, h, p, o),
            n > s
              ? (r < s && i.EMLine(h, s, h, r), l > n && i.EMLine(h, n, h, l))
              : (r < n && i.EMLine(h, n, h, r), l > s && i.EMLine(h, s, h, l));
        }),
        (o.prototype.drawTime = function () {
          var t = this.kObj.layer.layerDataC,
            i = this.kObj.layer.layerGridC,
            e = this.ops,
            o = e.padding,
            n = e.font,
            a = e.drawRegion,
            r = a.k,
            l = a.drawSumWdith,
            h = r.h - r.mt - r.mb,
            d = r.top + r.mt + r.pt,
            p = d + h,
            c = e.scale.time,
            A = l / c.length,
            g = Math.floor(l / 100) - 1,
            f = (Math.round(c.length / g / 2), []);
          f.push({
            index: 0,
            time: c[0],
          });
          for (var m = 1; m < g; m++) {
            var u = Math.floor((c.length / g) * m);
            f.push({
              index: u,
              time: c[u],
            });
          }
          f.push({
            index: c.length - 1,
            time: c[c.length - 1],
          }),
            t.beginPath(),
            t.clearRect(o.left, r.h - r.mb, l, r.mb - 1),
            (t.fillStyle = this.color.text),
            (t.font = n.size + "px " + n.family);
          for (
            var x = t.measureText(f[0]).width,
              v = t.measureText(f[f.length - 1]).width,
              w = l - x / 2 - v / 2,
              y = (f.length, r.h - r.mb / 2 - 1 + o.top),
              m = 0,
              M = f.length;
            m < M;
            m++
          ) {
            var B = f[m],
              C = B.time;
            if (0 == m) t.fillText(C, o.left, y);
            else if (m == M - 1) {
              var I = t.measureText(C).width;
              t.fillText(C, o.left + l - I, y);
            } else {
              var I = t.measureText(C).width,
                b = o.left + A * B.index + A / 2;
              t.fillText(C, b - I / 2, y),
                (i.strokeStyle = this.color.dashed),
                s.dashed(i, b, d, b, p);
            }
          }
        }),
        (o.prototype.axisY = function () {
          var t = this.kObj.layer.layerDataC,
            i = this.kObj.options,
            e = this.ops.padding,
            o = this.ops.font,
            n = this.ops.scale.info.splity,
            a = this.ops.drawRegion.k,
            s = a,
            r = this.kObj.data.info,
            l = i.scale,
            h = l.info,
            d = i.cyq || {},
            p = r.decimal,
            c = s.top + s.mt,
            A = s.h - s.mt - s.mb,
            g = (a.h, a.mt, a.pt, a.mb, h.newKAxisMax),
            f = h.newKAxisMin,
            n = h.splity,
            m = g - f,
            u = i.width - e.right,
            x = u - (d.width || 0);
          t.clearRect(0, 0, e.left, a.h),
            d.width && t.clearRect(x, 0, d.width, a.h);
          for (var v = 0, w = n.length; v < w; v++) {
            var y = n[v];
            if (y <= g && y >= f) {
              var M,
                B = ((g - y) / m) * A,
                C = c + B;
              M = (y / 1).toFixed(y > 1e4 ? 0 : p);
              var I = t.measureText(M).width;
              t.fillText(M + "", e.left - I - 4, C),
                d.width &&
                  C > c + o.size / 2 &&
                  C < c + A - o.size / 2 &&
                  t.fillText(M + "", u - I - 4, C);
            }
          }
        }),
        (o.prototype.maxmin = function (t) {
          var i,
            e,
            o,
            n = this.kObj.layer.layerGridC,
            s = (this.color, this.ops),
            r = s.scale,
            l = (r.pillar, s.maxin),
            h = r.data.length,
            d =
              (s.font.size, l.lineWidth * Math.tan((Math.PI / 180) * l.angle)),
            p = t.basey - t.min + l.skewy;
          t.minindex > h / 2
            ? ((i = t.minx - l.skewx),
              (e = t.minx - l.skewx - l.lineWidth),
              (o = e - l.skewx - n.measureText(t.minprise).width))
            : ((i = t.minx + l.skewx),
              (e = t.minx + l.skewx + l.lineWidth),
              (o = e + l.skewx)),
            n.beginPath(),
            (n.strokeStyle = l.color),
            (n.fillStyle = l.color),
            (n.strokeWidth = 1),
            n.moveTo(i, a.format(p)),
            n.lineTo(e, a.format(p - d)),
            n.stroke(),
            this.triangle(n, i, e, p, l, 1),
            n.fillText(t.minprise, o, p - d),
            n.closePath();
          var p = t.basey - t.max - l.skewy;
          t.maxindex > h / 2
            ? ((i = t.maxx - l.skewx),
              (e = t.maxx - l.skewx - l.lineWidth),
              (o = e - l.skewx - n.measureText(t.maxprise).width))
            : ((i = t.maxx + l.skewx),
              (e = t.maxx + l.skewx + l.lineWidth),
              (o = e + l.skewx)),
            n.save(),
            n.beginPath(),
            (n.strokeWidth = 1),
            n.moveTo(i, a.format(p)),
            n.lineTo(e, a.format(p + d)),
            n.stroke(),
            this.triangle(n, i, e, p, l, -1),
            n.fillText(t.maxprise, o, p + d),
            n.closePath(),
            n.restore();
        }),
        (o.prototype.triangle = function (t, i, e, o, n, a) {
          var s = 0;
          e < i ? ((s = 180), (s += n.angle * a)) : (s -= n.angle * a);
          var r = (Math.PI / 180) * (s - 20),
            l = (Math.PI / 180) * (s + 20),
            h = 6 * Math.cos(r),
            d = 6 * Math.sin(r),
            p = 6 * Math.cos(l),
            c = 6 * Math.sin(l);
          t.beginPath(),
            t.moveTo(i, o),
            t.lineTo(i + h, o + d),
            t.closePath(),
            t.stroke(),
            t.beginPath(),
            t.moveTo(i, o),
            t.lineTo(i + p, o + c),
            t.closePath(),
            t.stroke();
        }),
        (t.exports = o);
    },
    "./old/drawBlockTrading.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t),
          (this.cc = t.layer.layerKC),
          (this.ccGrid = t.layer.layerGridC),
          (this.ops = t.options),
          (this.padding = this.ops.padding),
          (this.color = this.ops.color),
          (this.font = this.ops.font),
          (this.drawRegion = this.ops.drawRegion);
      }
      var n = e("./old/common/coordinate.js"),
        a = e("./old/common/tools.js"),
        s = e("./old/drawGrid.js");
      (o.prototype.draw = function () {
        this.clear(),
          s.verticalLine(this.kObj, 2),
          s.gridTrading(this.ccGrid, this.kObj.options),
          this.drawTrading(),
          this.drawTradingIndexLine(),
          this.drawAxisY();
      }),
        (o.prototype.clear = function () {
          var t = this.drawRegion.trading;
          this.cc.clearRect(0, t.top, this.ops.width, t.h),
            this.ccGrid.clearRect(0, t.top, this.ops.width, t.h);
        }),
        (o.prototype.drawTrading = function () {
          var t = (this.cc, this.ops),
            i = t.scale,
            e = i.data,
            o = i.info.tradingAxisMax,
            n = (i.info.tradingAxisMin, i.pillar);
          e.length < n && (n = e.length), e.length < i.min && (n = i.min);
          for (
            var a = t.drawRegion.drawSumWdith,
              s = t.drawRegion.k,
              r = t.drawRegion.trading,
              l = r.h - r.pt - r.mb,
              h = a / n,
              d = (s.h, s.mb, r.h + r.top - r.mb),
              p = 0;
            p < e.length;
            p++
          ) {
            var c = e[p],
              A = this.padding.left + h * p + h / 2,
              g = (c[5] / o) * l;
            this.drawPillar({
              base: d,
              ht: g,
              x: A,
              width: h,
              up: c[9] / 1,
            });
          }
          e[e.length - 1];
        }),
        (o.prototype.drawPillar = function (t) {
          var i = this.cc,
            e = this.ops.color,
            o = t.base,
            a = t.ht,
            s = t.x,
            r = t.up,
            l = t.width,
            h = l / 2,
            d = this.ops.pillarWidth,
            s = n.format(s);
          i.beginPath(),
            r >= 0
              ? ((i.strokeStyle = e.rise), (i.fillStyle = "rgba(0,0,0,0)"))
              : ((i.strokeStyle = e.fall), (i.fillStyle = e.fall)),
            i.closePath(),
            i.EMFillPillar(o, o - a, s, h, d);
        }),
        (o.prototype.drawTradingIndexLine = function () {
          var t = this.ops,
            i = t.scale,
            e = this.cc,
            o = this.ops.scale.indexs.VAVERAGE,
            a = this.padding,
            s = this.color.colorsTrading,
            r = this.ops.drawRegion.trading,
            l = r.h,
            h = (r.pt, r.top),
            d = r.h - r.pt,
            p = t.drawRegion.drawSumWdith,
            c = i.info.tradingAxisMax,
            A = (i.info.tradingAxisMin, i.pillar);
          o.length < A && (A = o.length), o.length < i.min && (A = i.min);
          for (var g = p / A, f = h + l - r.mb, m = 0; m < s.length; m++) {
            e.save(), e.beginPath(), (e.strokeStyle = s[m]);
            for (var u = 0; u < o.length; u++) {
              var x = o[u],
                v = a.left + g * u + g / 2,
                w = (x[m + 1] / c) * d;
              (w = f - w),
                0 == u
                  ? e.moveTo(n.format(v), n.format(w))
                  : e.lineTo(n.format(v), n.format(w));
            }
            e.stroke(), e.restore();
          }
        }),
        (o.prototype.drawAxisY = function () {
          var t = this.kObj.layer.layerDataC,
            i = this.ops,
            e = i.scale,
            o = (e.data, e.info.tradingAxisMax),
            n = i.drawRegion.trading,
            s = this.padding,
            r = n.top + n.h - n.mb,
            l = (n.h - n.pt - n.mb) / 3;
          t.clearRect(0, n.top, s.left, n.h + this.font.size),
            (t.fillStyle = this.color.text);
          for (var h = 0; h <= 3; h++) {
            var d = (o * h) / 3,
              p = a.formatNumUnit(d, 2, 4),
              c = s.left - t.measureText(p).width - 8,
              A = r - l * h;
            t.fillText(p, c, A);
          }
        }),
        (t.exports = o);
    },
    "./old/drawCYQ.js": function (t, i, e) {
      e("./old/common/cyq/index.js"), e("./old/common/coordinate.js");
      t.exports = function (t) {
        var i = this.layer.layerCYQC,
          e = this.options,
          o = this.data.k,
          n = (this.sdata, e.scale),
          a = e.drawRegion,
          s = e.padding,
          r = e.cyq,
          l = e.color,
          h = (n.info.kMax, n.info.kMin, n.info.KaxisMax),
          d = n.info.KaxisMin,
          p = n.info.newKAxisMax,
          c = n.info.newKAxisMin,
          A = p - c;
        t = void 0 === t ? n.end : t;
        var g = this.cyqCalc.calc(t),
          f = o[t],
          m = e.width - s.right - r.width,
          u = a.k.mt + s.top,
          x = e.width - s.right,
          v = (a.k.h, a.k.mb, e.height - s.bottom);
        i.clearRect(0, 0, e.width, e.height);
        var w = [].concat(g.x),
          y = [].concat(g.y);
        w.filter(function (t) {
          return t != 1 / 0 && "NaN" != t.toString();
        });
        for (var M = 0; M < y.length; M++) {
          var B = y[M];
          (B > h || B < d) && (y.splice(M, 1), w.splice(M, 1), M--);
        }
        var C = y.length,
          I = Math.max.apply(Math, w),
          b = r.width,
          k = a.k.h - a.k.mb - a.k.mt,
          D = g.avgCost / 1;
        i.beginPath();
        for (
          var E = 0,
            R = 0,
            Q = !1,
            _ = !0,
            j = !1,
            O = 0,
            S = 0,
            F = 0,
            M = C - 1;
          M >= 0;
          M--
        ) {
          var G = w[M],
            Y = y[M];
          G != 1 / 0 &&
            ((E = u + ((p - Y) / A) * k),
            (R = m + (G / I) * b * 0.8),
            (F = E),
            _ && (i.moveTo(m, E), (_ = !1)),
            i.lineTo(R, E),
            Y < f[2] / 1 &&
              (j ||
                ((j = !0),
                i.lineTo(m, E),
                i.closePath(),
                (i.fillStyle = l.cyq.up),
                i.fill(),
                i.beginPath(),
                i.moveTo(m, E),
                i.lineTo(R, E))),
            Q || (Y <= D && ((Q = !0), (O = R), (S = E))));
        }
        i.lineTo(m, F),
          i.closePath(),
          (i.fillStyle = l.cyq.down),
          i.fill(),
          i.save(),
          (i.lineWidth = 2),
          i.beginPath();
        var T = Math.round(S);
        i.moveTo(m, T),
          i.lineTo(O, T),
          (i.strokeStyle = l.cyq.avg),
          i.stroke(),
          i.restore(),
          i.closePath(),
          (i.strokeStyle = e.color.border),
          i.EMStroke(m, u, x, v);
        var K = this.layer.cmfb;
        K.innerHTML = "";
        var U = [];
        U.push(["", "日期:", f[0]]),
          U.push(["", "获利比例:", (100 * g.benefitPart).toFixed(2) + "%"]),
          U.push([
            "ratio",
            (100 * g.benefitPart).toFixed(2) + "%",
            (100 - 100 * g.benefitPart).toFixed(2) + "%",
          ]),
          U.push(["", "平均成本:", g.avgCost]);
        var J = g.percentChips["90"];
        U.push(["", "90%成本:", J.priceRange[0] + "-" + J.priceRange[1]]),
          U.push(["", "集中度:", (100 * J.concentration).toFixed(2) + "%"]);
        var L = g.percentChips["70"];
        U.push(["", "70%成本:", L.priceRange[0] + "-" + L.priceRange[1]]),
          U.push(["", "集中度:", (100 * L.concentration).toFixed(2) + "%"]);
        for (
          var P = e.height - a.k.h - s.bottom - 24,
            H = P / U.length,
            C = U.length;
          C--;

        )
          H < 24 && (U.pop(), (H = P / U.length));
        for (var M = 0, C = U.length; M < C; M++) {
          var W = U[M],
            N = document.createElement("div"),
            Z = document.createElement("label"),
            V = document.createElement("span");
          (N.style.height = H + "px"),
            (N.style.lineHeight = H + "px"),
            W[0] && (N.className = W[0]),
            (Z.innerText = W[1]),
            (V.innerText = W[2]),
            N.appendChild(Z),
            N.appendChild(V),
            K.appendChild(N);
        }
        var q = K.querySelector(".ratio"),
          X = q.querySelector("label");
        X.style.border = "1px solid " + l.cyq.down;
        var z = (r.width - 20) * g.benefitPart;
        (X.style.width = z + "px"), z < 50 && (X.style.color = "rgba(0,0,0,0)");
        var $ = q.querySelector("span");
        $.style.border = "1px solid " + l.cyq.up;
        var tt = (r.width - 20) * (1 - g.benefitPart);
        ($.style.width = tt + "px"),
          tt < 50 && ($.style.color = "rgba(0,0,0,0)");
      };
    },
    "./old/drawGrid.js": function (t, i, e) {
      var o = e("./old/common/drawLine.js"),
        n = e("./old/common/coordinate.js"),
        a = e("./old/filterTimeLine.js");
      t.exports = {
        gridK: function (t, i) {
          var e = i.drawRegion,
            a = i.padding,
            s = i.color,
            r = i.dashedLine,
            l = i.scale,
            h = l.info,
            d = e.drawSumWdith,
            p = e.k,
            c = p.top + p.mt,
            A = p.h - p.mt - p.mb,
            g = A / (p.y - 1),
            f = d / p.x;
          if (h)
            for (
              var m = h.newKAxisMax,
                u = h.newKAxisMin,
                x = h.splity,
                v = m - u,
                w = 0,
                y = x.length;
              w < y;
              w++
            ) {
              var M = x[w];
              if (M <= m && M >= u) {
                var B = ((m - M) / v) * A,
                  C = c + B;
                o.dashed(t, a.left, C, a.left + d, C, r.solid, r.dashed);
              }
            }
          else {
            t.strokeStyle = s.dashed;
            for (var w = 1; w < p.y - 1; w++) {
              var C = c + g * w;
              o.dashed(t, a.left, C, a.left + d, C, r.solid, r.dashed);
            }
            for (var w = 1; w < p.x; w++) {
              var I = a.left + f * w;
              o.dashed(t, I, c, I, c + A, r.solid, r.dashed);
            }
          }
          t.strokeStyle = s.border;
          var I = n.format(a.left),
            C = n.format(c);
          t.strokeRect(I, C, d, Math.round(A));
        },
        gridTrading: function (t, i) {
          var e = i.drawRegion,
            a = (i.split, i.padding),
            s = i.color,
            r = i.dashedLine,
            l = e.drawSumWdith,
            h = e.trading,
            d = h.top,
            p = h.top + h.pt,
            c = h.h,
            A = c - h.pt - h.mb,
            g = A / h.y,
            f = l / h.x;
          t.strokeStyle = s.dashed;
          for (var m = 1; m < h.x; m++) {
            var u = a.left + f * m;
            o.dashed(t, u, p, u, p + A, r.solid, r.dashed);
          }
          for (var m = 0; m < h.y; m++) {
            var x = d + h.pt + g * m;
            0 == m && h.pt > 0
              ? ((t.strokeStyle = s.border),
                o.dashed(t, a.left, x, a.left + l, x, 10, 0, r.solid, r.dashed))
              : ((t.strokeStyle = s.dashed),
                o.dashed(t, a.left, x, a.left + l, x, r.solid, r.dashed));
          }
          (t.strokeStyle = s.border),
            t.strokeRect(n.format(a.left), n.format(h.top), l, A + h.pt);
        },
        gridIndex: function (t, i) {
          var e = i.drawRegion,
            a = i.padding,
            s = i.color,
            r = i.dashedLine,
            l = e.drawSumWdith,
            h = e.index,
            d = h.top,
            p = h.top + h.pt,
            c = h.h,
            A = c - h.pt - h.pb,
            g = A / h.y,
            f = l / h.x;
          t.clearRect(n.format(a.left), n.format(d), l, c - h.pb),
            (t.strokeStyle = s.dashed);
          for (var m = 1; m < h.x; m++) {
            var u = a.left + f * m;
            o.dashed(t, u, p, u, p + A);
          }
          for (var m = 0; m < h.y; m++) {
            var x = d + h.pt + g * m;
            0 == m && h.pt > 0
              ? ((t.strokeStyle = s.border),
                o.dashed(t, a.left, x, a.left + l, x, 10, 0))
              : ((t.strokeStyle = s.dashed),
                o.dashed(t, a.left, x, a.left + l, x, r.solid, r.dashed));
          }
          (t.strokeStyle = s.border),
            t.strokeRect(
              n.format(a.left),
              n.format(d),
              l,
              c - h.pb,
              r.solid,
              r.dashed
            );
        },
        verticalLine: function (t, i) {
          function e() {
            (s.strokeStyle = d.dashed),
              1 == i && o.dashed(s, Q, y, Q, M, g.solid, g.dashed),
              2 == i && o.dashed(s, Q, B, Q, C, g.solid, g.dashed),
              3 == i && o.dashed(s, Q, I, Q, b - 1, g.solid, g.dashed);
          }
          var n = t.layer.layerDataC,
            s = t.layer.layerGridC,
            r = t.options,
            l = r.padding,
            h = r.font,
            d = r.color,
            p = r.gridwh,
            c = r.formatTimeLine,
            A = r.yAxisType,
            g = r.dashedLine,
            f = r.cyq || {},
            m = r.drawRegion,
            u = m.drawSumWdith,
            x = m.k,
            v = m.trading,
            w = m.index,
            y = x.top + x.mt,
            M = y + (x.h - x.mt - x.mb),
            B = v.top + v.pt,
            C = B + (v.h - v.pt - v.mb),
            I = w.top + w.pt,
            b = I + (w.h - w.pt - w.pb),
            k = r.scale.time,
            D = u / k.length,
            E = Math.floor(u / p.width) - 1,
            R = (Math.round(k.length / E / 2), a(k, c, A));
          k.length < r.scale.min && (R = [R[0]]),
            n.beginPath(),
            n.clearRect(l.left, x.h - x.mb + l.top, r.width, x.mb - 1),
            (n.fillStyle = d.text),
            (n.font = h.size + "px " + h.family);
          for (
            var Q,
              _ = x.h - x.mb / 2 - 1 + l.top,
              j = l.left,
              O = r.width - l.right - (f.width || 0) - (f.gap || 0),
              S = 1,
              F = R.length;
            S < F;
            S++
          ) {
            var G = R[S],
              Y = G.time,
              T = n.measureText(Y).width;
            (Q = l.left + D * G.index + D / 2),
              Q > j &&
                Q < O - T / 2 &&
                (Q > l.left + T / 2 && Q < r.width - l.right - T / 2
                  ? Q > j &&
                    (n.fillText(Y, Q - T / 2, _), (j = Q + T + c.interval), e())
                  : Q <= l.left + T / 2
                  ? (n.fillText(Y, Q, _), (j = Q + 1.5 * T + c.interval), e())
                  : Q >= r.width - l.right - T / 2 &&
                    Q > j + T / 2 &&
                    (n.fillText(Y, Q - T, _), (j = Q + T + c.interval), e()));
          }
        },
      };
    },
    "./old/drawIndexsH.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t),
          (this.cc = t.layer.layerIndexC),
          (this.ops = t.options),
          (this.color = this.ops.color);
      }
      var n = e("./old/common/tools.js"),
        a = e("./old/common/jsonp.js"),
        s = e("./old/dataSplit.js"),
        r = e("./old/drawTitle.js");
      (o.prototype.draw = function (t, i) {
        var e = this,
          o = this.kObj,
          n = this.kObj,
          a = (n.options.thisData, n.options.show),
          l = n.sdata.k.info,
          h = n.options.scale.indexs[t];
        1 == i
          ? (this.tip(),
            "LRCE" == t
              ? l.isrzrq
                ? (this.getLRCE(function () {
                    s.slice.call(o),
                      (h = n.options.scale.indexs[t]),
                      e.indexh(h),
                      e.axis(),
                      r.titleIndex(o);
                  }),
                  a.lrjumptip && this.tip("两融详情", 0))
                : (e.indexh([]),
                  e.axis(),
                  this.tip("暂无两融数据", -1),
                  r.titleIndex(o))
              : "ZJL" == t
              ? (this.getZJL(function () {
                  s.slice.call(o),
                    (h = n.options.scale.indexs[t]),
                    e.zjl(h),
                    e.axisMACD(),
                    r.titleIndex(o);
                }),
                a.cfjumptip && this.tip("资金流详情", 1))
              : "MACD" == t
              ? (this.macd(h), this.axisMACD())
              : (this.indexh(h), this.axis()))
          : (this.tip(),
            "MACD" == t
              ? (this.macd(h), this.axisMACD())
              : "ZJL" == t
              ? (this.zjl(h), this.axisMACD())
              : (this.indexh(h), this.axis()));
      }),
        (o.prototype.indexh = function (t) {
          var i = this.cc,
            e = this.ops,
            o = e.padding,
            n = this.kObj.stauts.indexh,
            a = this.color.colorsIndex,
            s = (this.ops.scale.indexs, e.scale),
            r = s.info[n + "Max"],
            l = s.info[n + "Min"],
            h = r - l,
            d = e.drawRegion.drawSumWdith,
            p = s.pillar;
          s.data.length < p && (p = s.data.length),
            s.data.length < s.min && (p = s.min);
          var c = d / p,
            A = e.drawRegion.index,
            g = A.h - A.mb - A.pt,
            f = A.top + (A.h - A.mb),
            t = t;
          i.clearRect(o.left, A.top, d, A.h);
          for (var m = 0; m < a.length; m++) {
            i.beginPath(), (i.strokeStyle = a[m]);
            for (var u = m + 1, x = !0, v = 0; v < t.length; v++) {
              var w = t[v];
              if ("-" != w[u]) {
                var y = ((w[u] - l) / h) * g,
                  M = f - y,
                  B = o.left + c * v + c / 2;
                x ? (i.moveTo(B, M), (x = !1)) : i.lineTo(B, M);
              }
            }
            i.stroke(), i.closePath();
          }
        }),
        (o.prototype.macd = function (t) {
          var i = this.cc,
            e = this.ops,
            o = e.padding,
            n = this.kObj.stauts.indexh,
            a = this.color.colorsIndex,
            s = (this.ops.scale.indexs, e.color),
            r = e.scale,
            l = r.info[n + "Max"],
            h = r.info[n + "Min"],
            d = Math.abs(l) > Math.abs(h) ? Math.abs(l) : Math.abs(h);
          (l = d), (h = -d);
          var p = e.drawRegion.drawSumWdith,
            c = r.pillar;
          r.data.length < c && (c = r.data.length),
            r.data.length < r.min && (c = r.min);
          var A = p / c,
            g = e.drawRegion.index,
            f = g.h - g.pt,
            m = g.top + g.pt + (g.h - g.pt) / 2,
            t = t;
          i.clearRect(o.left, g.top, p, g.h);
          for (var u = a.length - 1; u >= 0; u--) {
            i.beginPath(), (i.strokeStyle = a[u - 1]);
            for (var x = u, v = !0, w = 0; w < t.length; w++) {
              var y = t[w];
              if (y[x])
                if (3 == x) {
                  var M = (y[x] / l) * (f / 2),
                    B = m - M,
                    C = o.left + A * w + A / 2;
                  M < 0
                    ? ((i.fillStyle = s.fall), (i.strokeStyle = s.fall))
                    : ((i.fillStyle = s.rise), (i.strokeStyle = s.rise)),
                    i.EMLine(C, m, C, B);
                } else {
                  var M = (y[x] / l) * (f / 2),
                    B = m - M,
                    C = o.left + A * w + A / 2;
                  v ? (i.moveTo(C, B), (v = !1)) : i.lineTo(C, B);
                }
            }
            i.stroke(), i.closePath();
          }
        }),
        (o.prototype.zjl = function (t) {
          var i = this.cc,
            e = this.ops,
            o = e.padding,
            n = this.kObj.stauts.indexh,
            a = this.color.colorsIndex,
            s = (this.ops.scale.indexs, e.color, e.scale),
            r = s.info[n + "Max"],
            l = s.info[n + "Min"],
            h = Math.abs(r) > Math.abs(l) ? Math.abs(r) : Math.abs(l);
          (r = h), (l = -h);
          var d = e.drawRegion.drawSumWdith,
            p = s.pillar;
          s.data.length < p && (p = s.data.length),
            s.data.length < s.min && (p = s.min);
          var c = d / p,
            A = e.drawRegion.index,
            g = A.h - A.pt,
            f = A.top + A.pt + (A.h - A.pt) / 2,
            t = t;
          i.clearRect(o.left, A.top, d, A.h);
          for (var m = a.length - 1; m >= 0; m--) {
            i.beginPath(), (i.strokeStyle = a[m - 1]);
            for (var u = m, x = !0, v = 0; v < t.length; v++) {
              var w = t[v];
              if (w[u]) {
                var y = (w[u] / r) * (g / 2);
                "-" == w[u] && (y = 0);
                var M = f - y,
                  B = o.left + c * v + c / 2;
                x ? (i.moveTo(B, M), (x = !1)) : i.lineTo(B, M);
              }
            }
            i.stroke(), i.closePath();
          }
        }),
        (o.prototype.axis = function () {
          var t = this.kObj.stauts,
            i = this.color,
            e = this.cc,
            o = this.ops,
            a = o.padding,
            s = o.scale,
            r = (s.data, s.info[t.indexh + "Max"]),
            l = s.info[t.indexh + "Min"],
            h = (r - l) / 2,
            d = o.drawRegion.index,
            p = d.top + d.h - d.pb,
            c = (d.h - d.pt - d.pb) / 2;
          e.clearRect(0, d.top + d.pt / 2, a.left, d.h), (e.fillStyle = i.text);
          for (var A = 0; A <= 2; A++) {
            var g = n.formatNumUnit(l + h * A, 5, 2);
            g + "" == "NaN" && (g = "");
            var f = e.measureText(g).width + 8,
              m = a.left - f,
              u = p - c * A;
            e.fillText(g, m, u);
          }
        }),
        (o.prototype.axisMACD = function () {
          var t = this.kObj.stauts,
            i = this.color,
            e = this.cc,
            o = this.ops,
            a = o.padding,
            s = o.scale,
            r = (s.data, s.info[t.indexh + "Max"]),
            l = s.info[t.indexh + "Min"],
            h = Math.abs(r) > Math.abs(l) ? Math.abs(r) : Math.abs(l);
          (r = h), (l = -h);
          var d = (r - l) / 2,
            p = o.drawRegion.index,
            c = p.top + p.h - p.pb,
            A = (p.h - p.pt - p.pb) / 2;
          e.clearRect(0, p.top + p.pt / 2, a.left, p.h), (e.fillStyle = i.text);
          for (var g = 0; g <= 2; g++) {
            var f = n.formatNumUnit(l + d * g),
              m = e.measureText(f).width + 8,
              u = a.left - m,
              x = c - A * g;
            isNaN(f) || e.fillText(f, u, x);
          }
        }),
        (o.prototype.axisZJL = function () {
          var t = this.kObj.stauts,
            i = this.color,
            e = this.cc,
            o = this.ops,
            a = o.padding,
            s = o.scale,
            r = (s.data, s.info[t.indexh + "Max"]),
            l = s.info[t.indexh + "Min"],
            h = Math.abs(r) > Math.abs(l) ? Math.abs(r) : Math.abs(l);
          (r = h), (l = -h);
          var d = (r - l) / 2,
            p = o.drawRegion.index,
            c = p.top + p.h - p.pb,
            A = (p.h - p.pt - p.pb) / 2;
          e.clearRect(0, p.top + p.pt / 2, a.left, p.h), (e.fillStyle = i.text);
          for (var g = 0; g <= 2; g++) {
            var f = n.formatNumUnit(l + d * g),
              m = e.measureText(f).width + 8,
              u = a.left - m,
              x = c - A * g;
            e.fillText(f, u, x);
          }
        }),
        (o.prototype.getLRCE = function (t) {
          var i = this.kObj.data,
            e = i.info,
            o = i.ks,
            n =
              "cb_" +
              new Date().getTime() +
              "_" +
              Math.floor(8888888 * Math.random() + 1111111),
            s = {
              id: e.code + "" + e.mk,
              cb: n,
            };
          a(
            "http://pdfm.eastmoney.com/em_ubg_pdti_fast/Indicators/mf",
            s,
            n,
            function (e) {
              if (0 === e.code) {
                for (var n = e.data, a = {}, s = 0, r = n.length; s < r; s++) {
                  var l = n[s];
                  a[l.NDate] = l;
                }
                for (var h = [], s = 0, r = o.length; s < r; s++) {
                  var d = o[s][0],
                    l = a[d] || {},
                    p = [d];
                  if (l.CIsvalid) {
                    var c = l.Diff / 1;
                    p.push(c);
                  } else p.push("-");
                  h.push(p);
                }
                (i.indexs.LRCE = h), t();
              }
            }
          );
        }),
        (o.prototype.getZJL = function (t) {
          var i = this.kObj.data,
            e = i.info,
            o = i.ks,
            n =
              "cb_" +
              new Date().getTime() +
              "_" +
              Math.floor(8888888 * Math.random() + 1111111),
            s = {
              id: e.code + "" + e.mk,
              cb: n,
              type: "hff",
              rtntype: 2,
              check: "TLBMS",
              acces_token: "cd8625c41b7a304adea5c9d8e0e76d4e",
            };
          a(
            "http://ff.eastmoney.com/EM_CapitalFlowInterface/api/js",
            s,
            n,
            function (e) {
              for (var n = e, a = {}, s = 0, r = n.length; s < r; s++) {
                var l = n[s].split(",");
                a[l[0]] = l;
              }
              for (var h = [], s = 0, r = o.length; s < r; s++) {
                var d = o[s][0],
                  l = a[d];
                l || (l = [d, "-", "-", "-", "-"]), h.push(l);
              }
              (i.indexs.ZJL = h), t();
            }
          );
        }),
        (o.prototype.tip = function (t, i) {
          var e = this.kObj,
            o = e.options,
            n = e.data.info,
            a = e.layer.layerUI,
            s = o.drawRegion.drawSumWdith,
            r = o.drawRegion.index,
            l = [
              "http://data.eastmoney.com/rzrq/stock/{{code}}.html",
              "http://data.eastmoney.com/zjlx/{{code}}.html",
            ];
          if (t) {
            var h = document.createElement("div");
            (h.className = "__indextip"), (h.innerText = t);
            var d = s / 2,
              p = r.top + r.mt + r.h / 2;
            (h.style.left = d + "px"),
              (h.style.top = p + "px"),
              i > -1 &&
                h.setAttribute("data-href", l[i].replace("{{code}}", n.code)),
              h.setAttribute("data-top", p),
              h.setAttribute("data-left", d),
              a.appendChild(h);
          } else
            for (
              var c = document.querySelectorAll(".__indextip"),
                A = 0,
                g = c.length;
              A < g;
              A++
            )
              a.removeChild(c[A]);
        }),
        (t.exports = o);
    },
    "./old/drawIndexsV.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t),
          (this.cc = t.layer.layerIndexC),
          (this.ops = t.options),
          (this.color = this.ops.color);
      }
      var n = e("./old/common/arrayExtension.js");
      (o.prototype.draw = function (t) {
        var i = this.kObj.options.scale.indexs[t];
        this.indexv(i, t);
      }),
        (o.prototype.indexv = function (t, i) {
          var e = this,
            o = this.cc,
            n = this.ops,
            a = n.padding,
            s = (this.kObj.stauts, this.color.colorsMA),
            r = (this.ops.scale.indexs, n.scale),
            l = r.info.newKAxisMax,
            h = r.info.newKAxisMin,
            d = l - h,
            p = n.drawRegion.k,
            c = p.h - p.mb - p.mt,
            A = p.top + (p.h - p.mb),
            g = p.h - 1;
          if ((o.clearRect(0, 0, n.width, g), "none" != i)) {
            var f = n.drawRegion.drawSumWdith,
              m = r.pillar;
            r.data.length < m && (m = r.data.length),
              r.data.length < r.min && (m = r.min);
            for (
              var u = f / m,
                x = this.kObj.options.scale.data,
                v = n.titleKeys[i] || [],
                w = 0;
              w < v.length;
              w++
            ) {
              o.beginPath(), (o.strokeStyle = s[w]);
              for (var y = w + 1, M = !0, B = 0; B < t.length; B++) {
                var C = t[B];
                if (C[y] / 1) {
                  var I = ((C[y] - h) / d) * c,
                    b = A - I,
                    k = a.left + u * B + u / 2;
                  if ("SAR" == i) {
                    var p = x[B],
                      D = [p[1], p[2], p[3], p[4]];
                    e.sar(o, k, b, D, C[y]);
                  } else M ? (o.moveTo(k, b), (M = !1)) : o.lineTo(k, b);
                }
              }
              o.stroke(), o.closePath();
            }
          }
        }),
        (o.prototype.sar = function (t, i, e, o, a) {
          var s = this.color,
            r = n.findMaxMin(o),
            l = !1;
          a / 1 <= r.min && ((l = !0), (t.fillStyle = s.rise)),
            a / 1 >= r.max && ((l = !0), (t.fillStyle = s.fall)),
            l &&
              (t.beginPath(),
              t.arc(i, e, 2, 0, 2 * Math.PI),
              t.closePath(),
              t.fill());
        }),
        (t.exports = o);
    },
    "./old/drawTitle.js": function (t, i, e) {
      var o = e("./old/common/tools.js");
      t.exports = {
        titleK: function (t) {
          var i = t.layer.layerDataC,
            e = t.options,
            o = e.scale,
            n = (o.pillar, t.stauts.indexv);
          data = e.thisData.indexs[n] || [];
          var a = e.drawRegion.k,
            s = e.padding,
            r = e.color,
            l = t.data.info,
            h = l.decimal,
            d = a.top + a.mt / 2,
            p = r.colorsMA,
            c = s.left + 1;
          if (
            (i.clearRect(s.left, s.top, e.width, a.mt),
            (i.strokeStyle = "rgba(0,0,0,0)"),
            (i.fillStyle = r.text),
            t.options.show.name)
          ) {
            var A = l.name,
              g = i.measureText(A).width;
            i.fillText(A, c, d), (c += g + 10);
          }
          if (t.options.show.code) {
            var A = "[" + l.code + "]",
              g = i.measureText(A).width;
            i.fillText(A, c, d), (c += g + 10);
          }
          if (t.options.show.CMA)
            for (var f = e.titleKeys[n] || [], m = 0; m < f.length; m++)
              c += (function (t, e) {
                i.fillStyle = p[e];
                var o = (data[e + 1] / 1).toFixed(h) || "-";
                o + "" == "NaN" && (o = "-");
                var n = t + ": " + o,
                  a = i.measureText(n).width;
                return i.fillText(n, c, d), a + 10;
              })(f[m], m);
        },
        titleTrading: function (t) {
          function i(t, i, n) {
            e.fillStyle = A[n];
            var a = t + ": " + (o.formatNumUnit(i, 2, 6) || "-"),
              s = e.measureText(a).width;
            return e.fillText(a, g, c), s + 10;
          }
          var e = t.layer.layerDataC,
            n = t.options,
            a = n.thisData,
            s = n.scale,
            r = (s.pillar, n.drawRegion.trading),
            l = n.padding,
            h = n.color,
            d = a.data || [],
            p = a.indexs.VAVERAGE || [],
            c = r.top + r.pt / 2 + 1,
            A = h.colorsTrading,
            g = l.left + 10;
          e.clearRect(l.left, r.top, n.drawRegion.drawSumWdith, r.pt),
            (e.strokeStyle = "rgba(0,0,0,0)"),
            (e.fillStyle = h.text),
            (g += i("VOL", d[5], 0)),
            (g += i("MA5", p[1], 1)),
            (g += i("MA10", p[2], 2));
        },
        titleIndex: function (t) {
          var i = t.layer.layerDataC,
            e = t.options,
            n = e.thisData,
            a = e.scale,
            s = (a.pillar, e.drawRegion.index),
            r = e.padding,
            l = e.color,
            h = t.stauts.indexh,
            d = n.indexs[h] || [],
            p = s.top + s.pt / 2 + 1,
            c = l.colorsIndex,
            A = r.left + 10,
            g = e.titleKeys[h];
          i.clearRect(r.left, s.top, e.drawRegion.drawSumWdith, s.pt),
            (i.strokeStyle = "rgba(0,0,0,0)"),
            (i.fillStyle = l.text);
          for (var f = 0; f < g.length; f++) {
            var m = o.formatNumUnit(d[f + 1], 5, 2);
            A += (function (t, e, o) {
              i.fillStyle = c[o];
              var n = t + ": " + (e || "-"),
                a = i.measureText(n).width;
              return i.fillText(n, A, p), a + 10;
            })(g[f], m, f);
          }
        },
      };
    },
    "./old/extensionAPI.js": function (t, i, e) {
      var o = e("./old/dataSplit.js"),
        n = {};
      (n.elongate = function (t, i) {
        void 0 == i && (i = 0.05), (i /= 1), void 0 === t && (t = -1);
        var e = this.options.scale,
          n = e.fullDataSize,
          a = e.pillar,
          s = a * i;
        i >= 1 && (s = i);
        var r = e.start,
          l = e.end,
          h = !1;
        if (-1 == t) {
          var d = Math.round(r - 2 * s);
          d < 0 && (d = 0), d < r && ((h = !0), (r = d));
        } else if (0 == t) {
          var p = Math.round(r - s),
            c = Math.round(l + s);
          p < 0 && (p = 0),
            c > n - 1 && (c = n - 1),
            (p < r || c > l) && ((h = !0), (r = p), (l = c));
        } else if (1 == t) {
          var d = Math.round(l + 2 * s);
          d > n - 1 && (d = n - 1), d > l && ((h = !0), (l = d));
        }
        return (
          (e.start = r),
          (e.end = l),
          (e.pillar = l - r + 1),
          o.slice.call(this),
          this.slidebar.update(),
          this.drawAll(!1),
          h
        );
      }),
        (n.shorten = function (t, i) {
          void 0 == i && (i = 0.05), (i /= 1), void 0 === t && (t = -1);
          var e = this.options.scale,
            n = (e.fullDataSize, e.pillar),
            a = n * i;
          i >= 1 && (a = i);
          var s = e.start,
            r = e.end,
            l = e.min,
            h = !1;
          if (s != r - l)
            if (-1 == t) {
              var d = Math.round(s + 2 * a);
              (s = d + l > r ? r - l : d), (h = !0);
            } else if (0 == t) {
              var p = Math.round(s + a),
                c = Math.round(r - a);
              if (p >= c - l) {
                var A = s + (r - s) / 2;
                (s = Math.round(A - l / 2)), (r = Math.round(A + l / 2));
              } else (s = p), (r = c);
              h = !0;
            } else if (1 == t) {
              var d = Math.round(r - 2 * a);
              (r = s > d - l ? s + l : d), (h = !0);
            }
          return (
            (e.start = s),
            (e.end = r),
            (e.pillar = r - s + 1),
            o.slice.call(this),
            this.slidebar.update(),
            this.drawAll(!1),
            h
          );
        }),
        (t.exports = n);
    },
    "./old/filterTimeLine.js": function (t, i) {
      t.exports = function (t, i, e) {
        var o = 99;
        t.length >= i.ymd && t.length < i.ym
          ? (o = 7)
          : t.length >= i.ym && (o = 4),
          2 == e &&
            (t.length >= i.ymd && t.length < i.ym
              ? (o = 10)
              : t.length >= i.ym && (o = 10));
        for (var n = {}, a = 0; a < t.length; a++) {
          var s = t[a].substr(0, o);
          n[s] || (n[s] = a);
        }
        var r = [];
        for (var l in n)
          r.push({
            index: n[l],
            time: l,
          });
        return r;
      };
    },
    "./old/init/drawRegion.js": function (t, i) {
      t.exports = function () {
        var t = this.options,
          i = t.width,
          e = t.padding,
          o = t.height - e.top - e.bottom,
          n = t.font,
          a = t.split2,
          s = t.cyq || {},
          r = i - e.left - e.right - (s.width || 0) - (s.gap || 0),
          l = {
            drawSumWdith: r,
          };
        for (var h in a) {
          var d = (function (t) {
            var i = o > 350 ? 2 : 1.8,
              a = 0,
              s = 0,
              r = 0,
              l = 0;
            return (
              "auto" == t.marginTop
                ? (a = n.size * i)
                : "none" != t.marginTop && t.marginTop > 0 && (a = t.marginTop),
              "auto" == t.marginBottom
                ? (s = n.size * i)
                : "none" != t.marginBottom &&
                  t.marginBottom > 0 &&
                  (s = t.marginBottom),
              "auto" == t.paddingTop
                ? (r = n.size * i)
                : "none" != t.paddingTop &&
                  t.paddingTop > 0 &&
                  (r = t.paddingTop),
              "auto" == t.paddingBottom
                ? (l = n.size * i)
                : "none" != t.paddingBottom &&
                  t.paddingBottom > 0 &&
                  (l = t.paddingBottom),
              {
                mt: a,
                mb: s,
                pt: r,
                pb: l,
                h: o * t.body,
                top: o * t.top + e.top,
                x: t.x,
                y: t.y,
              }
            );
          })(a[h]);
          l[h] = d;
        }
        t.drawRegion = l;
      };
    },
    "./old/init/initIndexDOM.js": function (t, i, e) {
      var o =
          (e("./old/common/coordinate.js"), e("./old/common/getDeviceType.js")),
        n = (e("./old/sildebar.js"), e("./old/drawTitle.js")),
        a = e("./old/drawIndexsV.js"),
        s = e("./old/drawIndexsH.js"),
        r = e("./old/drawBlockK.js"),
        l = e("./old/dataSplit.js"),
        h = e("./old/popWinEvent.js"),
        d = e("./old/popWinEventForIpad.js");
      t.exports = {
        main: function () {
          function t(t) {
            var o = i.data;
            if (o && o.k) {
              var s = t.srcElement || t.target;
              if ("kt-radio-wrap" == s.className || "kt-name" == s.className) {
                for (var p = d.children, c = 0; c < p.length; c++)
                  p[c].className = "kt-line";
                var A = s.parentNode;
                A.className = "kt-line kt-radio-choose";
                var g = A.children[1].innerHTML;
                "均线" == g
                  ? (i.stauts.indexv = "CMA")
                  : "EXPMA" == g
                  ? (i.stauts.indexv = "EXPMA")
                  : "SAR" == g
                  ? (i.stauts.indexv = "SAR")
                  : "BOLL" == g
                  ? (i.stauts.indexv = "BOLL")
                  : "BBI" == g
                  ? (i.stauts.indexv = "BBI")
                  : "无" == g && (i.stauts.indexv = "none"),
                  e.fold &&
                    ((h.querySelector("span").innerText = g),
                    (d.style.display = "none")),
                  l.slice.call(i),
                  new r(i).draw(),
                  new a(i).draw(i.stauts.indexv),
                  n.titleK(i),
                  i.options.onFold(d.style.display, i.stauts.indexv);
              }
            }
          }
          var i = this,
            e = this.options.show,
            o = this.options.drawRegion.k.mt,
            s = document.createElement("div");
          s.className = "__quota";
          var h = document.createElement("div");
          (h.className = "__qtip"),
            (h.innerHTML = "<span>均线</span><label></label>"),
            s.appendChild(h);
          var d = document.createElement("div");
          d.className = "kt-pad";
          var p = document.createDocumentFragment();
          if (e.fold) d.style.display = "none";
          else {
            h.style.display = "none";
            var c = document.createElement("div");
            (c.className = "kt-title"),
              (c.innerHTML = "主图指标"),
              p.appendChild(c);
          }
          var A = function (t, i, e) {
            var o = document.createElement("div");
            (o.className = "kt-line"),
              e && (o.className = "kt-line kt-radio-choose");
            var n = document.createElement("div");
            n.className = "kt-radio-wrap";
            var a = document.createElement("div");
            n.appendChild(a), o.appendChild(n);
            var s = document.createElement("div");
            (s.className = "kt-name"),
              (s.innerHTML = t),
              o.appendChild(s),
              i.appendChild(o);
          };
          A("无", p, !1),
            A("均线", p, !0),
            A("EXPMA", p, !1),
            A("SAR", p, !1),
            A("BOLL", p, !1),
            A("BBI", p, !1),
            d.appendChild(p);
          var g = this.layer.layerUI;
          s.appendChild(d),
            g.appendChild(s),
            (s.style.top = o + "px"),
            (s.style.right = "0"),
            s.addEventListener("click", function (i) {
              t(i);
            }),
            s.addEventListener("touchend", function (i) {
              t(i);
            }),
            e.fold &&
              h.addEventListener("click", function () {
                "block" == d.style.display
                  ? (d.style.display = "none")
                  : (d.style.display = "block"),
                  i.options.onFold(d.style.display, i.stauts.indexv);
              });
        },
        technology: function () {
          function t(t, i) {
            var e = document.createElement("li");
            return (
              e.setAttribute("data-index-type", t.type),
              e.setAttribute("data-index-dt", t.dt),
              (e.innerText = t.name),
              (e.style.width = c + "px"),
              (e.style.height = d.mt + "px"),
              (e.style.lineHeight = d.mt + "px"),
              (e.className = i ? "__technologyindex_act" : ""),
              e
            );
          }
          function i(t) {
            var i = e.data;
            if (i && i.k) {
              var o = t.target;
              if ("LI" == o.nodeName) {
                if (!e.isfulldata)
                  return (
                    (e.options.scale.start = void 0),
                    (e.options.scale.end = void 0),
                    e.drawAll(!1).then(function (t) {
                      setTimeout(function () {
                        o.click();
                      }, 100);
                    }),
                    !1
                  );
                for (
                  var a = o.getAttribute("data-index-type"),
                    r = o.getAttribute("data-index-dt"),
                    h = A.querySelectorAll("li"),
                    d = 0;
                  d < h.length;
                  d++
                )
                  h[d].className = "";
                o.className = "__technologyindex_act";
                for (var d = 0; d < p.length; d++)
                  if (p[d].type == a) {
                    e.stauts.indexh = a;
                    break;
                  }
                1 == r
                  ? new s(e).draw(e.stauts.indexh, r)
                  : (l.slice.call(e),
                    new s(e).draw(e.stauts.indexh, r),
                    n.titleIndex(e));
              }
            }
          }
          var e = this,
            o = this.options,
            a = o.drawRegion,
            r = a.drawSumWdith,
            h = a.index,
            d = a.minimap,
            p = [
              {
                type: "RSI",
                name: "RSI",
                cb: function () {},
              },
              {
                type: "KDJ",
                name: "KDJ",
                cb: function () {},
              },
              {
                type: "MACD",
                name: "MACD",
                cb: function () {},
              },
              {
                type: "WR",
                name: "W%R",
                cb: function () {},
              },
              {
                type: "DMI",
                name: "DMI",
                cb: function () {},
              },
              {
                type: "BIAS",
                name: "BIAS",
                cb: function () {},
              },
              {
                type: "OBV",
                name: "OBV",
                cb: function () {},
              },
              {
                type: "CCI",
                name: "CCI",
                cb: function () {},
              },
              {
                type: "ROC",
                name: "ROC",
                cb: function () {},
              },
            ];
          o.show.lr &&
            p.push({
              type: "LRCE",
              name: "两融",
              dt: 1,
              cb: function () {},
            }),
            o.show.cf &&
              p.push({
                type: "ZJL",
                name: "资金流",
                dt: 1,
                cb: function () {},
              });
          for (
            var c = r / p.length, A = document.createElement("ul"), g = 0;
            g < p.length;
            g++
          )
            p[g].name == e.stauts.indexh
              ? A.appendChild(t(p[g], !0))
              : A.appendChild(t(p[g]));
          A.addEventListener("click", function (t) {
            i(t);
          }),
            A.addEventListener("touchend", function (t) {
              i(t);
            }),
            (A.className = "__technologyindex"),
            (A.style.width = r + 1 + "px"),
            (A.style.left = o.padding.left - 1 + "px"),
            (A.style.top = h.top + h.mt + h.h - h.pb + "px"),
            (A.style.height = d.mt + "px"),
            this.layer.layerUI.appendChild(A);
        },
        miniMap: function () {
          var t = (this.layer.layerKC, this.options),
            i = (this.data, t.drawRegion),
            e = t.padding,
            o = (t.height, t.color, t.scale),
            n = t.cyq || {},
            a = i.drawSumWdith,
            s =
              (i.unitHeight,
              i.minimapHeight,
              i.startMinimap,
              o.start,
              o.fullDataSize,
              e.right + (n.width || 0) + (n.gap || 0)),
            r = i.minimap,
            l = document.createElement("div");
          (l.className = "__em_minimap"),
            (l.style.height = r.h - r.mt + "px"),
            (l.style.left = e.left - 1 + "px"),
            (l.style.right = s + "px"),
            (l.style.bottom = e.bottom + "px");
          var h = this.layer.layerUI,
            d = document.createElement("div");
          (d.className = "__slidebar"),
            (d.innerHTML =
              "<div class='__sb_left'></div><div class='__sb_right'></div>"),
            (d.style.left = "0px"),
            (d.style.right = "0px"),
            l.appendChild(d),
            h.appendChild(l),
            (this.layer.minimap = l);
        },
        popWin: function () {
          var t = o(),
            i = this.options,
            e = (i.padding, document.createElement("div"));
          (e.className = "__popfloatwin " + i.popWin.cls),
            this.layer.layerUI.appendChild(e),
            (this.layer.popWin = e),
            1 == t ? d.call(this, e) : h.call(this, e);
        },
        cmfb: function () {
          var t = this.options,
            i = this.layer.layerUI,
            e = t.drawRegion,
            o = t.padding,
            n = t.cyq || {};
          if (n.width) {
            var a = t.height - e.k.h - o.bottom - 24,
              s = document.createElement("div");
            s.setAttribute("class", "__emchatrs3_cmfb"),
              (s.style.width = n.width + "px"),
              (s.style.height = a + "px"),
              (s.style.top = e.k.h + "px"),
              (s.style.right = o.right + "px"),
              i.appendChild(s);
          }
          this.layer.cmfb = s;
        },
      };
    },
    "./old/init/initIsShow.js": function (t, i) {
      t.exports = function () {
        var t = this.options.split2;
        0 == this.options.show.minimap &&
          (t = {
            k: {
              marginTop: "auto",
              paddingTop: "none",
              body: 0.6,
              marginBottom: "auto",
              top: 0,
              x: 10,
              y: 8,
            },
            trading: {
              marginTop: "none",
              paddingTop: "auto",
              body: 0.2,
              marginBottom: "none",
              top: 0.6,
              x: 10,
              y: 3,
            },
            index: {
              marginTop: "none",
              marginBottom: "auto",
              paddingTop: "auto",
              paddingBottom: "auto",
              body: 0.2,
              top: 0.8,
              x: 10,
              y: 2,
            },
            minimap: {
              marginTop: "none",
              paddingTop: "none",
              body: 0,
              marginBottom: "none",
              top: 0,
              x: 10,
              y: 1,
            },
          }),
          0 == this.options.show.index &&
            (t = {
              k: {
                marginTop: "auto",
                paddingTop: "none",
                body: 0.65,
                marginBottom: "auto",
                top: 0,
                x: 10,
                y: 8,
              },
              trading: {
                marginTop: "none",
                paddingTop: "auto",
                body: 0.25,
                marginBottom: "none",
                top: 0.65,
                x: 10,
                y: 3,
              },
              index: {
                marginTop: "none",
                marginBottom: "none",
                paddingTop: "auto",
                paddingBottom: "none",
                body: 0,
                top: 0,
                x: 10,
                y: 2,
              },
              minimap: {
                marginTop: "none",
                paddingTop: "none",
                body: 0.1,
                marginBottom: "none",
                top: 0.9,
                x: 10,
                y: 1,
              },
            }),
          0 == this.options.show.index &&
            0 == this.options.show.minimap &&
            (t = {
              k: {
                marginTop: "auto",
                paddingTop: "none",
                body: 0.7,
                marginBottom: "auto",
                top: 0,
                x: 10,
                y: 8,
              },
              trading: {
                marginTop: "none",
                marginBottom: "auto",
                paddingTop: "auto",
                body: 0.3,
                top: 0.7,
                x: 10,
                y: 3,
              },
              index: {
                marginTop: "none",
                marginBottom: "none",
                paddingTop: "auto",
                paddingBottom: "none",
                body: 0,
                top: 0,
                x: 10,
                y: 2,
              },
              minimap: {
                marginTop: "none",
                paddingTop: "none",
                body: 0,
                marginBottom: "none",
                top: 0,
                x: 10,
                y: 1,
              },
            }),
          (this.options.split2 = t);
      };
    },
    "./old/init/initLayer.js": function (t, i, e) {
      var o = e("./old/common/canvasExtension.js");
      t.exports = function () {
        var t = this.option,
          i = this.options,
          e = i.font,
          n = i.color,
          a = document.querySelector(t.container);
        (a.innerHTML = ""),
          (a.className =
            a.className.replace("__emchatrs3_root_box", "") +
            " __emchatrs3_root_box"),
          (a.style.width = t.width + "px"),
          (a.style.height = t.height + "px"),
          n.background && (a.style.backgroundColor = n.background);
        var s = document.createElement("div");
        s.className = "__canvas";
        var r = document.createElement("canvas"),
          l = r.getContext("2d"),
          h = document.createElement("canvas"),
          d = h.getContext("2d");
        o(d);
        var p = document.createElement("canvas"),
          c = p.getContext("2d");
        o(c);
        var A = document.createElement("canvas"),
          g = A.getContext("2d");
        o(g);
        var f = document.createElement("canvas"),
          m = f.getContext("2d"),
          u = document.createElement("canvas"),
          x = u.getContext("2d"),
          v = document.createElement("canvas"),
          w = v.getContext("2d"),
          y = document.createElement("canvas"),
          M = y.getContext("2d"),
          B = document.createElement("div");
        B.className = "__ui";
        var C = document.createElement("div");
        (C.className = "__dotspoint"),
          B.appendChild(C),
          s.appendChild(r),
          s.appendChild(h),
          s.appendChild(p),
          s.appendChild(f),
          s.appendChild(u),
          s.appendChild(A),
          s.appendChild(v),
          s.appendChild(y),
          a.appendChild(B),
          a.appendChild(s);
        var I = {
          divCanvas: s,
          layerGrid: r,
          layerGridC: l,
          layerLoading: v,
          layerLoadingC: w,
          layerWatermark: y,
          layerWatermarkC: M,
          layerK: h,
          layerKC: d,
          layerIndex: p,
          layerIndexC: c,
          layerCYQ: A,
          layerCYQC: g,
          layerData: f,
          layerDataC: m,
          layerAbnormal: u,
          layerAbnormalC: x,
          layerUI: B,
          dotsPoint: C,
        };
        for (var b in I)
          "CANVAS" == I[b].nodeName &&
            ((I[b].width = t.width * i.dpr), (I[b].height = t.height * i.dpr)),
            I[b].font &&
              ((I[b].textBaseline = "middle"),
              (I[b].font = e.size + "px " + e.family));
        this.layer = I;
      };
    },
    "./old/init/initParameter.js": function (t, i, e) {
      var o = e("./old/common/extend2.js"),
        n = e("./old/defaultSetting.js"),
        a = e("./old/init/initIsShow.js");
      t.exports = function () {
        var t = this.option;
        if (t.cyq) {
          t.cyqWidth = t.width - (t.cyq.width || 0);
          "number" != typeof (t.padding || {}).right &&
            (t.padding || (t.padding = {}), (t.padding.right = 10));
        }
        var i = {};
        n.dpr;
        (i.width = t.width),
          (i.height = t.height),
          (i = o(n, t, !0)),
          (this.options = i),
          a.call(this);
      };
    },
    "./old/interactive.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t), this.addEvent();
      }
      var n = e("./old/common/drawLine.js"),
        a = e("./old/drawTitle.js"),
        s = e("./old/common/tools.js"),
        r = e("./old/drawCYQ.js");
      (o.prototype.addEvent = function () {
        var t = this,
          i = this.kObj.options,
          e = this.kObj.layer.layerUI,
          o = (this.kObj.layer.dotsPoint, i.padding),
          n = i.drawRegion,
          s = i.popWin,
          l = i.cyq || {},
          h = o.left,
          d = i.width - o.right - (l.width || 0) - (l.gap || 0),
          p = o.top + n.k.pt + n.k.mt,
          c = i.height - n.minimap.h;
        e.addEventListener("mousemove", function (i) {
          var o = e.getBoundingClientRect(),
            n = i.target.className,
            r = t.kObj.stauts,
            l = i.target.tagName,
            A = t.kObj.data,
            g = i.clientX - o.left,
            f = i.clientY - o.top;
          if (("__ui" == n && A && A.k && t.kObj.options.isdraw) || "IMG" == l)
            if (g >= h && g < d && f >= p && f <= c)
              try {
                t.move(g, f);
              } catch (t) {}
            else {
              t.hides();
              var m = t.kObj.options.scale,
                u = m.data.length - 1,
                x = m.data[u],
                v = m.indexs.VAVERAGE[u],
                w = m.indexs[r.indexv] || [],
                y = m.indexs[r.indexh] || [],
                M = w[u],
                B = y[u];
              (t.kObj.options.thisData.data = x),
                (t.kObj.options.thisData.indexs.VAVERAGE = v),
                (t.kObj.options.thisData.indexs[r.indexv] = M),
                (t.kObj.options.thisData.indexs[r.indexh] = B),
                a.titleK(t.kObj),
                a.titleTrading(t.kObj),
                t.kObj.options.show.index && a.titleIndex(t.kObj);
            }
          else "auto" == s.type && t.hides();
        }),
          e.addEventListener("mouseout", function (e) {
            l = i.cyq || {};
            var o = t.kObj.options.scale;
            o.data || (o.data = []);
            var n = o.data.length - 1,
              s = t.kObj.stauts;
            try {
              var h = o.data[n],
                d = o.indexs.VAVERAGE[n],
                p = o.indexs[s.indexv][n],
                c = (o.indexs[s.indexh] || [])[n];
              (t.kObj.options.thisData.data = h),
                (t.kObj.options.thisData.indexs.VAVERAGE = d),
                (t.kObj.options.thisData.indexs[s.indexv] = p),
                (t.kObj.options.thisData.indexs[s.indexh] = c),
                a.titleK(t.kObj),
                a.titleTrading(t.kObj),
                t.kObj.options.show.index && a.titleIndex(t.kObj),
                l.width && r.call(t.kObj);
            } catch (t) {}
          }),
          e.addEventListener(
            "mouseleave",
            function (i) {
              function e(t) {
                if (++a < 5) {
                  t || (t = {});
                  var i = t.className || "";
                  "__technologyindex" == i ||
                  "__em_minimap" == i ||
                  "kt-pad" == i ||
                  "__popfloatwin " == i
                    ? (n = t)
                    : e(t.parentNode);
                }
              }
              var o = i.toElement || i.relatedTarget || {},
                n = null,
                a = 0;
              e(o), n || t.hides();
            },
            !0
          ),
          e.addEventListener("click", function (t) {
            var e = t.target;
            if ("__ui" == t.target.className) {
              var a = t.offsetX,
                s = t.offsetY,
                r = n.k,
                l = o.left,
                h = i.width - o.right,
                d = o.top + r.top + r.mt + r.pt,
                p = i.height - o.bottom;
              if (a > l && a < h && s > d && s < p) {
                var c = e.querySelector(".__indextip");
                if (c) {
                  var d = c.getAttribute("data-top") / 1,
                    l = c.getAttribute("data-left") / 1;
                  if (a > l && a < l + 100 && s > d && s < d + 29) {
                    var A = c.getAttribute("data-href");
                    A && window.open(A);
                  } else i.onClick();
                } else i.onClick();
              }
            } else if ("__indextip" == t.target.className) {
              var A = e.getAttribute("data-href");
              A && window.open(A);
            }
          }),
          e.addEventListener("mousemove", function (t) {
            function i(t, e) {
              var n = t.className || "";
              "__ui" != n &&
                (n.indexOf("__dotgroup") >= 0
                  ? (o = e.querySelector(".__pop"))
                  : i(t.parentNode, t));
            }
            var o,
              n = t.target,
              a = (n.tagName, e.querySelectorAll(".__pop"));
            i(n);
            for (var s = 0, r = a.length; s < r; s++)
              a[s].style.display = "none";
            o && (o.style.display = "block");
          });
      }),
        (o.prototype.intersection = function (t, i) {
          var e = this.kObj.options,
            o = this.kObj.options.cross,
            a = (this.kObj.layer.popWin, this.kObj.layer.layerLoadingC),
            s = e.padding,
            r = e.drawRegion,
            l = s.left,
            h = e.width - s.right,
            d = s.top + r.k.pt + r.k.mt,
            p = e.height - r.minimap.h;
          a.clearRect(0, 0, e.width, e.height),
            (a.fillStyle = "rgba(0,0,0,0)"),
            (a.strokeStyle = o.color),
            n.dashed(a, t, d, t, p, o.solid, o.dashed),
            n.dashed(a, l, i, h, i, o.solid, o.dashed),
            (a.fillStyle = o.dot.color),
            (a.globalAlpha = o.dot.opacity);
          for (var c = o.dot.count, A = c; A > 0; A--) {
            var g = (o.dot.radius * A) / c;
            a.beginPath(), a.arc(t, i, g, 0, 2 * Math.PI), a.fill();
          }
          a.globalAlpha = 1;
        }),
        (o.prototype.move = function (t, i) {
          var e = this.kObj.options,
            o = this.kObj.stauts,
            n = e.padding,
            s = e.scale,
            l = e.cyq || {},
            h = e.drawRegion.drawSumWdith,
            d = e.drawRegion.k,
            p = d.h - d.mt - d.mb,
            c = n.left,
            A = s.pillar;
          s.data.length < A && (A = s.data.length),
            s.data.length < s.min && (A = s.min);
          var g = ((t - c) / h) * A;
          g = Math.floor(g);
          var f = (s.data || [])[g],
            m = h / A;
          if (g != this.lastIndex)
            if (((this.lastIndex = g), f)) {
              var u = n.left + (g / A) * h + m / 2,
                x = f[2],
                v = s.info.newKAxisMax,
                w = s.info.newKAxisMin,
                y = v - w,
                M = d.mt + (Math.abs(x - v) / y) * p + n.top;
              this.intersection(u, M);
              var B,
                C = s.indexs.VAVERAGE[g];
              "none" != o.indexv && (B = s.indexs[o.indexv][g]);
              var I,
                b = (s.indexs[o.indexh] || [])[g];
              (I = t - n.left > h / 2 ? "left" : "right"),
                this.popwinShow(f, I),
                (this.kObj.options.thisData.data = f),
                (this.kObj.options.thisData.indexs.VAVERAGE = C),
                (this.kObj.options.thisData.indexs[o.indexv] = B),
                (this.kObj.options.thisData.indexs[o.indexh] = b);
              var k = this.kObj.options.show;
              a.titleK(this.kObj),
                a.titleTrading(this.kObj),
                k.index && a.titleIndex(this.kObj),
                l.width && r.call(this.kObj, s.start + g),
                this.kObj.options.onMove &&
                  this.kObj.options.onMove(this.kObj.options.thisData);
            } else this.popwinHide();
        }),
        (o.prototype.popwinShow = function (t, i) {
          function e(t, i, e, o, n) {
            var a = document.createElement(t),
              s = document.createElement("label");
            s.innerText = i;
            var l = document.createElement("span");
            return (
              (l.innerText = n ? e : (e / 1 || 0).toFixed(r)),
              0 === o
                ? (l.className = "__hold")
                : o > 0
                ? (l.className = "__rise")
                : o < 0 && (l.className = "__fall"),
              a.appendChild(s),
              a.appendChild(l),
              a
            );
          }
          function o(t) {
            return t > 0 ? "+" + t : 0 == t ? (0).toFixed(r) : t;
          }
          var n = this.kObj.options,
            a = n.popWin,
            r = this.kObj.data.info.decimal,
            l = n.padding,
            h = n.cyq || {},
            d = (this.kObj.isMoveFrist, l.right + (h.width || 0)),
            p = document.createElement("h4"),
            c = document.createElement("label");
          (c.innerHTML = "(可拖动)"),
            "move" != a.type && (c.style.display = "none");
          var A = document.createElement("span");
          (A.innerHTML = t[0]), p.appendChild(c), p.appendChild(A);
          var g,
            f = e("div", "开盘", t[1], t[1] - t[10]),
            m = e("div", "收盘", t[2], t[2] - t[10]),
            u = e("div", "最高", t[3], t[3] - t[10]),
            x = e("div", "最低", t[4], t[4] - t[10]),
            v = e("div", "涨跌幅", o(t[9]) + "%", t[9], !0),
            w = e("div", "涨跌额", o(t[8]), t[8]),
            y = e("div", "成交量", s.formatNumUnit(t[5], 2, 8), null, !0),
            M = e("div", "成交额", s.formatNumUnit(t[6], 2, 8), null, !0),
            B = e("div", "振幅", t[7], null, !0);
          void 0 !== t[11] && (g = e("div", "换手率", t[11] + "%", null, !0));
          var C = this.kObj.layer.popWin;
          if (
            ((C.innerHTML = ""),
            C.appendChild(p),
            C.appendChild(f),
            C.appendChild(m),
            C.appendChild(u),
            C.appendChild(x),
            C.appendChild(v),
            C.appendChild(w),
            C.appendChild(y),
            C.appendChild(M),
            C.appendChild(B),
            g && C.appendChild(g),
            "auto" == a.type)
          )
            "left" == i
              ? ((C.style.left = l.left - 1 + "px"), (C.style.right = ""))
              : ((C.style.left = ""), (C.style.right = d + "px"));
          else if (!this.dur && !this.kObj.isMoveFrist)
            if (((this.dur = i), "left" == i))
              (C.style.left = l.left - 1 + "px"), (C.style.right = "");
            else {
              var I = n.width - 142 - l.right;
              h.width && (I = I - h.width + h.gap || 0),
                (C.style.left = I + "px"),
                (C.style.right = "");
            }
          C.style.display = "block";
        }),
        (o.prototype.hides = function () {
          this.resetLastIndex(),
            this.popwinHide(),
            this.clearCross(),
            this.hidePopAll(),
            (this.dur = !1);
        }),
        (o.prototype.resetLastIndex = function () {
          this.lastIndex = "-1";
        }),
        (o.prototype.popwinHide = function () {
          this.kObj.layer.popWin.style.display = "none";
        }),
        (o.prototype.clearCross = function () {
          var t = this.kObj.layer.layerLoadingC,
            i = this.kObj.options;
          t.clearRect(0, 0, i.width, i.height);
        }),
        (o.prototype.hidePopAll = function () {
          for (
            var t = this.kObj.layer.dotsPoint,
              i = t.querySelectorAll(".__pop"),
              e = 0,
              o = i.length;
            e < o;
            e++
          )
            i[e].style.display = "none";
        }),
        (t.exports = o);
    },
    "./old/interactiveForIpad.js": function (t, i, e) {
      function o(t) {
        (this.mx = -1), (this.my = -1), (this.kObj = t), this.addEvent();
      }
      var n = e("./old/common/drawLine.js"),
        a = e("./old/drawTitle.js"),
        s = e("./old/common/tools.js"),
        r = e("./old/drawCYQ.js");
      (o.prototype.addEvent = function () {
        var t = this,
          i = this.kObj.options,
          e = this.kObj.layer.layerUI,
          o = (this.kObj.layer.dotsPoint, i.padding || {}),
          n = i.drawRegion,
          s = i.popWin,
          r = (i.cyq, o.left),
          l = i.width - o.right,
          h = o.top + n.k.pt + n.k.mt,
          d = i.height - n.minimap.h,
          p = this.kObj.slidebar,
          c = n.minimap,
          A = i.height - c.h - c.mt - (o.bottom || 0),
          g = 0,
          f = new Hammer(e);
        f.add(new Hammer.Pinch()),
          f.on("pinchin", function (i) {
            var o = e.getBoundingClientRect(),
              n = i.pointers[0].clientY,
              a = i.pointers[1].clientY,
              s = A + o.top;
            if (2 == i.pointers.length && n < s && a < s) {
              var r = Date.now();
              if (r - g > 150) {
                var n = i.pointers[0].clientX,
                  a = i.pointers[1].clientX,
                  l = p.slide,
                  h = p.ops.scale,
                  d = e.querySelector(".__em_minimap"),
                  c = d.getBoundingClientRect().width,
                  f = (h.minWidth, h.min, h.fullDataSize, c / 100),
                  m = parseFloat(l.style.left) || 0,
                  u = parseFloat(l.style.right) || 0;
                (m -= f),
                  (u -= f),
                  (m = m < 0 ? 0 : m),
                  (u = u < 0 ? 0 : u),
                  (l.style.left = Math.round(m) + "px"),
                  (l.style.right = Math.round(u) + "px"),
                  p.reClacRegion(),
                  t.move(t.mx, t.my),
                  (g = r);
              }
            }
          }),
          f.on("pinchout", function (i) {
            var o = e.getBoundingClientRect(),
              n = i.pointers[0].clientY,
              a = i.pointers[1].clientY,
              s = A + o.top;
            if (2 == i.pointers.length && n < s && a < s) {
              var r = Date.now();
              if (r - g > 150) {
                var l = p.slide,
                  h = p.ops.scale,
                  d = e.querySelector(".__em_minimap"),
                  c = d.getBoundingClientRect().width,
                  f = h.minWidth,
                  m = c * (h.min / h.fullDataSize),
                  u = f > m ? f : m,
                  x = c / 100,
                  v = parseFloat(l.style.left) || 0,
                  w = parseFloat(l.style.right) || 0;
                v + u + x <= c - w ? (v += x) : (v = c - w - u),
                  w + u + x <= c - v ? (w += u) : (w = c - v - u),
                  (l.style.left = Math.round(v) + "px"),
                  (l.style.right = Math.round(w) + "px"),
                  p.reClacRegion(),
                  t.move(t.mx, t.my),
                  (g = r);
              }
            }
          });
        var m = 0,
          u = 0;
        e.addEventListener("touchstart", function (t) {
          (m = Date.now()), u++;
        }),
          e.addEventListener("touchmove", function (i) {
            var o = e.getBoundingClientRect(),
              n = i.target.className,
              p = t.kObj.stauts,
              c = i.target.tagName,
              A = i.targetTouches[0];
            if (1 == u) {
              var g = t.kObj.data,
                f = A.clientX - o.left,
                m = A.clientY - o.top;
              if (
                ("__ui" == n && g && g.k && t.kObj.options.isdraw) ||
                "IMG" == c
              )
                if (f >= r && f < l && m >= h && m <= d) t.move(f, m);
                else {
                  t.hides();
                  var x = t.kObj.options.scale,
                    v = x.data.length - 1,
                    w = x.data[v],
                    y = x.indexs.VAVERAGE[v],
                    M = x.indexs[p.indexv][v],
                    B = x.indexs[p.indexh][v];
                  (t.kObj.options.thisData.data = w),
                    (t.kObj.options.thisData.indexs.VAVERAGE = y),
                    (t.kObj.options.thisData.indexs[p.indexv] = M),
                    (t.kObj.options.thisData.indexs[p.indexh] = B),
                    a.titleK(t.kObj),
                    a.titleTrading(t.kObj),
                    t.kObj.options.show.index && a.titleIndex(t.kObj);
                }
              else "auto" == s.type && t.hides();
            }
          }),
          e.addEventListener("touchend", function (i) {
            var o = e.getBoundingClientRect(),
              n = i.target.className,
              a = (t.kObj.stauts, i.target.tagName),
              p = i.changedTouches[0];
            if (1 == u) {
              var c = t.kObj.data,
                A = p.clientX - o.left,
                g = p.clientY - o.top;
              ("__ui" == n && c && c.k && t.kObj.options.isdraw) || "IMG" == a
                ? A >= r && A < l && g >= h && g <= d
                  ? t.move(A, g)
                  : t.hides()
                : "auto" == s.type && t.hides();
            }
            setTimeout(function () {
              u = 0;
            }, 300);
          }),
          e.addEventListener("touchend", function (t) {
            var a = t.target;
            if ("__ui" == t.target.className) {
              var s = t.changedTouches[0],
                r = e.getBoundingClientRect(),
                l = s.clientX - r.left,
                h = s.clientY - r.top;
              if (Date.now() - m < 300 && 2 == u) {
                var d = n.k,
                  p = o.left,
                  c = i.width - o.right,
                  A = o.top + d.top + d.mt + d.pt,
                  g = i.height - o.bottom;
                if (l > p && l < c && h > A && h < g) {
                  var f = a.querySelector(".__indextip");
                  if (f) {
                    var A = f.getAttribute("data-top") / 1,
                      p = f.getAttribute("data-left") / 1;
                    if (l > p && l < p + 100 && h > A && h < A + 29) {
                      var x = f.getAttribute("data-href");
                      x && window.open(x);
                    } else i.onClick();
                  } else i.onClick();
                }
                u = 0;
              }
            }
          }),
          e.addEventListener("touchend", function (t) {
            function i(t, e) {
              var n = t.className || "";
              "__ui" != n &&
                (n.indexOf("__dotgroup") >= 0
                  ? (o = e.querySelector(".__pop"))
                  : i(t.parentNode, t));
            }
            var o,
              n = t.target,
              a = (n.tagName, e.querySelectorAll(".__pop"));
            i(n);
            for (var s = 0, r = a.length; s < r; s++)
              a[s].style.display = "none";
            o && (o.style.display = "block");
          });
      }),
        (o.prototype.intersection = function (t, i) {
          var e = this.kObj.options,
            o = this.kObj.options.cross,
            a = (this.kObj.layer.popWin, this.kObj.layer.layerLoadingC),
            s = e.padding,
            r = e.drawRegion,
            l = s.left,
            h = e.width - s.right,
            d = s.top + r.k.pt + r.k.mt,
            p = e.height - r.minimap.h;
          a.clearRect(0, 0, e.width, e.height),
            (a.fillStyle = "rgba(0,0,0,0)"),
            (a.strokeStyle = o.color),
            n.dashed(a, t, d, t, p, o.solid, o.dashed),
            n.dashed(a, l, i, h, i, o.solid, o.dashed),
            (a.fillStyle = o.dot.color),
            (a.globalAlpha = o.dot.opacity);
          for (var c = o.dot.count, A = c; A > 0; A--) {
            var g = (o.dot.radius * A) / c;
            a.beginPath(), a.arc(t, i, g, 0, 2 * Math.PI), a.fill();
          }
          (a.globalAlpha = 1), (this.mx = t), (this.my = i);
        }),
        (o.prototype.move = function (t, i, e) {
          if (-1 != t && -1 != i) {
            var o = this.kObj.options,
              n = this.kObj.stauts,
              s = o.padding,
              l = o.scale,
              h = o.cyq || {},
              d = o.drawRegion.drawSumWdith,
              p = o.drawRegion.k,
              c = p.h - p.mt - p.mb,
              A = s.left,
              g = l.pillar;
            l.data.length < g && (g = l.data.length),
              l.data.length < l.min && (g = l.min);
            var f = ((t - A) / d) * g;
            f = Math.floor(f);
            var m = l.data[f],
              u = d / g;
            if (f != this.lastIndex || e)
              if (((this.lastIndex = f), m)) {
                var x = s.left + (f / g) * d + u / 2,
                  v = m[2],
                  w = l.info.newKAxisMax,
                  y = l.info.newKAxisMin,
                  M = w - y,
                  B = p.mt + (Math.abs(v - w) / M) * c + s.top;
                this.intersection(x, B);
                var C,
                  I = l.indexs.VAVERAGE[f],
                  b = l.indexs[n.indexv][f],
                  k = l.indexs[n.indexh][f];
                (C = t - s.left > d / 2 ? "left" : "right"),
                  this.popwinShow(m, C),
                  (this.kObj.options.thisData.data = m),
                  (this.kObj.options.thisData.indexs.VAVERAGE = I),
                  (this.kObj.options.thisData.indexs[n.indexv] = b),
                  (this.kObj.options.thisData.indexs[n.indexh] = k);
                var D = this.kObj.options.show;
                a.titleK(this.kObj),
                  a.titleTrading(this.kObj),
                  D.index && a.titleIndex(this.kObj),
                  h.width && r.call(this.kObj, l.start + f),
                  this.kObj.options.onMove &&
                    this.kObj.options.onMove(this.kObj.options.thisData);
              } else this.popwinHide();
          }
        }),
        (o.prototype.popwinShow = function (t, i) {
          function e(t, i, e, o, n) {
            var a = document.createElement(t),
              s = document.createElement("label");
            s.innerText = i;
            var l = document.createElement("span");
            return (
              (l.innerText = n ? e : (e / 1 || 0).toFixed(r)),
              0 === o
                ? (l.className = "__hold")
                : o > 0
                ? (l.className = "__rise")
                : o < 0 && (l.className = "__fall"),
              a.appendChild(s),
              a.appendChild(l),
              a
            );
          }
          function o(t) {
            return t > 0 ? "+" + t : 0 == t ? (0).toFixed(r) : t;
          }
          var n = this.kObj.options,
            a = n.popWin,
            r = this.kObj.data.info.decimal,
            l = n.padding,
            h = (this.kObj.isMoveFrist, document.createElement("h4")),
            d = document.createElement("label");
          (d.innerHTML = "(可拖动)"),
            "move" != a.type && (d.style.display = "none");
          var p = document.createElement("span");
          (p.innerHTML = t[0]), h.appendChild(d), h.appendChild(p);
          var c = e("div", "开盘", t[1], t[1] - t[10]),
            A = e("div", "收盘", t[2], t[2] - t[10]),
            g = e("div", "最高", t[3], t[3] - t[10]),
            f = e("div", "最低", t[4], t[4] - t[10]),
            m = e("div", "涨跌幅", o(t[9]) + "%", t[9], !0),
            u = e("div", "涨跌额", o(t[8]), t[8]),
            x = e("div", "成交量", s.formatNumUnit(t[5], 2, 8), null, !0),
            v = e("div", "成交额", s.formatNumUnit(t[6], 2, 8), null, !0),
            w = e("div", "振幅", t[7], null, !0),
            y = this.kObj.layer.popWin;
          (y.innerHTML = ""),
            y.appendChild(h),
            y.appendChild(c),
            y.appendChild(A),
            y.appendChild(g),
            y.appendChild(f),
            y.appendChild(m),
            y.appendChild(u),
            y.appendChild(x),
            y.appendChild(v),
            y.appendChild(w),
            "auto" == a.type
              ? "left" == i
                ? ((y.style.left = l.left - 1 + "px"), (y.style.right = ""))
                : ((y.style.left = ""), (y.style.right = l.right + "px"))
              : this.dur ||
                this.kObj.isMoveFrist ||
                ((this.dur = i),
                "left" == i
                  ? ((y.style.left = l.left - 1 + "px"), (y.style.right = ""))
                  : ((y.style.left = n.width - l.right - 142 + "px"),
                    (y.style.right = ""))),
            (y.style.display = "block");
        }),
        (o.prototype.hides = function () {
          this.resetLastIndex(),
            this.popwinHide(),
            this.clearCross(),
            this.hidePopAll(),
            (this.dur = !1);
        }),
        (o.prototype.resetLastIndex = function () {
          this.lastIndex = "-1";
        }),
        (o.prototype.popwinHide = function () {
          this.kObj.layer.popWin.style.display = "none";
        }),
        (o.prototype.clearCross = function () {
          var t = this.kObj.layer.layerLoadingC,
            i = this.kObj.options;
          t.clearRect(0, 0, i.width, i.height);
        }),
        (o.prototype.hidePopAll = function () {
          for (
            var t = this.kObj.layer.dotsPoint,
              i = t.querySelectorAll(".__pop"),
              e = 0,
              o = i.length;
            e < o;
            e++
          )
            i[e].style.display = "none";
        }),
        (t.exports = o);
    },
    "./old/popWinEvent.js": function (t, i) {
      t.exports = function (t) {
        var i,
          e,
          o,
          n,
          a,
          s,
          r = this,
          l = this.options,
          h = this.layer.layerUI,
          d = l.width,
          p = l.height,
          c = !1;
        t.addEventListener("mousedown", function (r) {
          (c = !0),
            (i = r.clientX),
            (e = r.clientY),
            (o = parseInt(t.style.left || 0)),
            (n = parseInt(t.style.top || 30));
          var l = t.getBoundingClientRect();
          (a = d - l.width), (s = p - l.height);
        }),
          document.addEventListener("mousemove", function (l) {
            if (c) {
              r.isMoveFrist = !0;
              var d = (h.getBoundingClientRect(), l.clientX),
                p = l.clientY,
                A = o + (d - i),
                g = n + (p - e);
              (A = A < 0 ? 0 : A),
                (A = A > a ? a : A),
                (g = g < 0 ? 0 : g),
                (g = g > s ? s : g),
                (t.style.left = A + "px"),
                (t.style.top = g + "px");
            }
          }),
          document.addEventListener("mouseup", function () {
            c = !1;
          }),
          h.addEventListener("mouseleave", function () {
            c = !1;
          }),
          t.addEventListener("mouseup", function () {
            c = !1;
          });
      };
    },
    "./old/popWinEventForIpad.js": function (t, i) {
      t.exports = function (t) {
        var i,
          e,
          o,
          n,
          a,
          s,
          r = this,
          l = this.options,
          h = this.layer.layerUI,
          d = l.width,
          p = l.height,
          c = !1;
        t.addEventListener("touchstart", function (r) {
          var l = r.changedTouches[0];
          (c = !0),
            (i = l.clientX),
            (e = l.clientY),
            (o = parseInt(t.style.left || 0)),
            (n = parseInt(t.style.top || 30));
          var h = t.getBoundingClientRect();
          (a = d - h.width), (s = p - h.height);
        }),
          h.addEventListener("touchmove", function (l) {
            if (c) {
              var d = l.changedTouches[0];
              r.isMoveFrist = !0;
              var p = (h.getBoundingClientRect(), d.clientX),
                A = d.clientY,
                g = o + (p - i),
                f = n + (A - e);
              (g = g < 0 ? 0 : g),
                (g = g > a ? a : g),
                (f = f < 0 ? 0 : f),
                (f = f > s ? s : f),
                (t.style.left = g + "px"),
                (t.style.top = f + "px");
            }
          }),
          document.addEventListener("touchend", function () {
            c = !1;
          }),
          h.addEventListener("touchend", function () {
            c = !1;
          }),
          t.addEventListener("touchend", function () {
            c = !1;
          });
      };
    },
    "./old/sildebar.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t),
          this.initData(),
          this.kObj.options.show.minimap && this.bindEvent();
      }
      var n = e("./old/common/coordinate.js"),
        a = e("./old/dataSplit.js");
      (o.prototype.initData = function () {
        var t = this.kObj;
        (this.cc = t.layer.layerKC),
          (this.data = t.data),
          (this.ops = t.options),
          (this.padding = t.padding);
      }),
        (o.prototype.minWidth = function () {
          var t = this.ops,
            i = t.drawRegion.drawSumWdith,
            e = this.data.k,
            o = this.kObj.options.scale,
            n = (o.min / e.length) * i;
          this.minbarwidth = n;
        }),
        (o.prototype.drawFullData = function () {
          this.initData(), this.minWidth();
          var t = this.cc,
            i = this.ops,
            e = this.data,
            o = this.kObj.options.scale,
            a = i.color,
            s = i.padding,
            r = i.drawRegion,
            l = r.minimap,
            h = r.drawSumWdith,
            d = l.h - l.mt,
            p = e.info.kMin,
            c = e.info.kMax,
            A = e.k,
            g = s.left,
            f = i.height - s.bottom,
            m = h / (A.length + 1),
            u = c - p;
          t.clearRect(0, i.height - d + 1, i.width, d + 1),
            t.save(),
            (t.strokeStyle = a.border),
            (t.fillStyle = "rgba(0,0,0,0)"),
            t.EMLine(
              s.left,
              i.height - d - s.bottom,
              s.left + h,
              i.height - s.bottom
            ),
            t.restore();
          var x = {};
          (t.strokeStyle = a.minimap.line),
            (t.fillStyle = a.minimap.fill),
            t.beginPath(),
            t.moveTo(s.left, f + 1);
          for (var v = 0; v < A.length; v++) {
            var w = A[v],
              y = w[0].substr(0, 4);
            x[y] ? (x[y] = ++x[y]) : (x[y] = 1);
            var M = ((w[2] - p) / u) * d,
              B = n.format(g + m * v + 1),
              C = n.format(f - M);
            t.lineTo(B, C);
          }
          if (
            (t.lineTo(s.left + h - 2, f + 1),
            t.closePath(),
            t.stroke(),
            t.fill(),
            this.drawYear(x, A.length),
            A.length <= this.kObj.options.scale.min)
          )
            this.slide.style.display = "none";
          else if (
            ((this.slide.style.display = "block"),
            this.kObj.options.show.minimap)
          ) {
            var I = o.start < 0 ? 0 : o.start,
              b = (I / o.fullDataSize) * h,
              k = h - (o.end / o.fullDataSize) * h;
            k < 0 && (k = 0),
              (this.slide.style.left = Math.round(b) + "px"),
              (this.slide.style.right = Math.round(k) + "px");
          }
        }),
        (o.prototype.drawYear = function (t, i) {
          var e = this.cc,
            o = this.ops,
            n = o.color,
            a = o.padding,
            s = o.drawRegion,
            r = s.minimap,
            l = o.font,
            h = o.height - a.bottom,
            d = s.drawSumWdith;
          (e.fillStyle = n.text), (e.strokeStyle = n.text);
          var p = [];
          for (var c in t)
            p.push({
              year: c,
              count: t[c],
            });
          for (
            var A = a.left, g = 0, f = h - 0.25 * r.h, m = 0, u = 0;
            u < p.length - 1;
            u++
          ) {
            m += p[u].count;
            var x = (m / i) * d;
            A = a.left + x;
            var v = p[u + 1].year,
              w = e.measureText(v).width;
            A > g + 10 &&
              A + w < a.left + d &&
              ((g = A + w),
              e.beginPath(),
              e.EMLine(A, h, A, f),
              e.closePath(),
              e.stroke(),
              e.fillText(p[u + 1].year, A + 2, f + l.size / 2),
              e.fill());
          }
          1 == p.length &&
            (e.EMLine(A, h, A, f),
            e.fillText(p[0].year, A + 2, f + l.size / 2),
            e.fill());
        }),
        (o.prototype.bindEvent = function () {
          function t(t) {
            if (m) {
              var i = f.fullDataSize,
                e = f.minWidth,
                o = g * (f.min / i),
                n = e > o ? e : o;
              x = !0;
              var a = t.clientX,
                l = a - c,
                h = parseInt(s.style.left) || 0,
                d = parseInt(s.style.right) || 0;
              if ("right" == r) {
                var p = g - l;
                p < 0 && (p = 0),
                  l < h + n && (p = g - h - n),
                  (s.style.right = Math.round(p) + "px");
              } else {
                var A;
                (A = l + n > g - d ? g - d - n : l),
                  l < 0 && (A = 0),
                  (s.style.left = Math.round(A) + "px");
              }
            }
          }
          function i(t) {
            if (u) {
              v = !0;
              var i = t.clientX,
                e = t.clientY,
                o = i - l,
                n = parseInt(s.style.left) || 0,
                a = parseInt(s.style.right) || 0,
                r = n + o,
                d = a - o;
              if (r < 0) {
                var p = 0 - r;
                (r = 0), (d -= p);
              }
              if (d < 0) {
                var p = 0 - d;
                (d = 0), (r -= p);
              }
              r >= 0 &&
                d >= 0 &&
                ((s.style.left = r + "px"), (s.style.right = d + "px")),
                (l = i),
                (h = e);
            }
          }
          var e = this,
            o = this.kObj,
            n = this.kObj.layer.layerUI,
            a = n.querySelector(".__em_minimap"),
            s = n.querySelector(".__slidebar");
          this.slide = s;
          var r,
            l,
            h,
            d = a.getBoundingClientRect(),
            p = s.getBoundingClientRect(),
            c =
              (s.querySelector(".__sb_left"),
              s.querySelector(".__sb_right"),
              d.left),
            A = d.left + d.width,
            g = d.width,
            f = this.kObj.options.scale,
            m = !1,
            u = !1,
            x = !1,
            v = !1;
          s.addEventListener("mousedown", function (t) {
            var i = e.data;
            if (i && i.k) {
              (d = a.getBoundingClientRect()),
                (p = s.getBoundingClientRect()),
                (c = d.left),
                (A = d.left + d.width);
              var o = t.target.className;
              "__slidebar" == o && ((u = !0), (l = t.clientX), (h = t.clientY)),
                o.indexOf("__sb_left") > -1 && ((r = "left"), (m = !0)),
                o.indexOf("__sb_right") > -1 && ((r = "right"), (m = !0));
            }
          }),
            (s.onselectstart = s.onmousedown = function () {
              return !1;
            });
          var w = 0,
            y = 0;
          document.addEventListener("mousemove", function (n) {
            if (m || u) {
              0 == y && o.options.onDragStart(o.options.scale);
              var a = new Date().getTime();
              a - w > 200 && ((w = a), e.reClacRegion()), t(n), i(n), y++;
            }
          }),
            document.addEventListener("mouseup", function (t) {
              var i = f.fullDataSize,
                n = f.minWidth,
                a = g * (f.min / i),
                l = n > a ? n : a;
              if (x || v) {
                var h = parseInt(s.style.left) || 0,
                  d = parseInt(s.style.right) || 0;
                g - d - h < l &&
                  ("left" == r
                    ? (s.style.left = Math.round(g - d - l) + "px")
                    : (s.style.right = Math.round(g - h - l) + "px")),
                  e.reClacRegion(),
                  o.options.onDragEnd(o.options.scale);
              }
              (m = !1), (u = !1), (x = !1), (v = !1), (y = 0);
            });
        }),
        (o.prototype.reClacRegion = function () {
          var t = this.ops,
            i = t.drawRegion,
            e = this.ops.scale,
            o = this.slide,
            n = this.kObj.data.k.length,
            s = i.drawSumWdith,
            r = parseInt(o.style.left) || 0,
            l = parseInt(o.style.right) || 0;
          l < 0 && (l = 0);
          var h = Math.floor(n * (r / s)),
            d = Math.floor(n * ((s - l) / s));
          if (
            (d >= e.min && d + 1 - h == e.min && (h = d - e.min),
            d >= e.fullDataSize && (d = e.fullDataSize - 1),
            (e.start = h),
            (e.end = d),
            (e.pillar = d - h + 1),
            a.slice.call(this.kObj),
            this.kObj.drawAll(!1),
            this.kObj.options.onDrag)
          ) {
            var p = this.kObj.stauts,
              c = this.kObj.options.scale,
              A = {};
            (A[p.indexv] = c.indexs[p.indexv]),
              (A[p.indexh] = c.indexs[p.indexh]),
              (A.VAVERAGE = c.indexs.VAVERAGE);
            var g = {
              data: c.data,
              indexs: A,
            };
            this.kObj.options.onDrag(g);
          }
        }),
        (o.prototype.update = function () {
          var t = this.kObj.options,
            i = t.scale,
            e = t.drawRegion.drawSumWdith,
            o = (i.start / i.fullDataSize) * e,
            n = e - ((i.end + 1) / i.fullDataSize) * e,
            a = this.slide;
          (a.style.left = o + "px"), (a.style.right = n + "px");
        }),
        (t.exports = o);
    },
    "./old/sildebarForIpad.js": function (t, i, e) {
      function o(t) {
        (this.kObj = t),
          this.initData(),
          this.kObj.options.show.minimap && this.bindEvent();
      }
      var n = e("./old/common/coordinate.js"),
        a = e("./old/dataSplit.js");
      (o.prototype.initData = function () {
        var t = this.kObj;
        (this.cc = t.layer.layerKC),
          (this.data = t.data),
          (this.ops = t.options),
          (this.padding = t.padding);
      }),
        (o.prototype.minWidth = function () {
          var t = this.ops,
            i = t.drawRegion.drawSumWdith,
            e = this.data.k,
            o = this.kObj.options.scale,
            n = (o.min / e.length) * i;
          this.minbarwidth = n;
        }),
        (o.prototype.drawFullData = function () {
          this.initData(), this.minWidth();
          var t = this.cc,
            i = this.ops,
            e = this.data,
            o = this.kObj.options.scale,
            a = i.color,
            s = i.padding,
            r = i.drawRegion,
            l = r.minimap,
            h = r.drawSumWdith,
            d = l.h - l.mt,
            p = e.info.kMin,
            c = e.info.kMax,
            A = e.k,
            g = s.left,
            f = i.height - s.bottom,
            m = h / (A.length + 1),
            u = c - p;
          t.clearRect(0, i.height - d + 1, i.width, d + 1),
            t.save(),
            (t.strokeStyle = a.border),
            (t.fillStyle = "rgba(0,0,0,0)"),
            t.EMLine(
              s.left,
              i.height - d - s.bottom,
              i.width - s.right,
              i.height - s.bottom
            ),
            t.restore();
          var x = {};
          (t.strokeStyle = a.minimap.line),
            (t.fillStyle = a.minimap.fill),
            t.beginPath(),
            t.moveTo(s.left, f + 1);
          for (var v = 0; v < A.length; v++) {
            var w = A[v],
              y = w[0].substr(0, 4);
            x[y] ? (x[y] = ++x[y]) : (x[y] = 1);
            var M = ((w[2] - p) / u) * d,
              B = n.format(g + m * v + 1),
              C = n.format(f - M);
            t.lineTo(B, C);
          }
          if (
            (t.lineTo(s.left + h - 2, f + 1),
            t.closePath(),
            t.stroke(),
            t.fill(),
            this.drawYear(x, A.length),
            A.length <= this.kObj.options.scale.min)
          )
            this.slide.style.display = "none";
          else if (this.kObj.options.show.minimap) {
            var I = o.start < 0 ? 0 : o.start,
              b = (I / o.fullDataSize) * h,
              k = h - (o.end / o.fullDataSize) * h;
            k < 0 && (k = 0),
              (this.slide.style.left = Math.round(b) + "px"),
              (this.slide.style.right = Math.round(k) + "px");
          }
        }),
        (o.prototype.drawYear = function (t, i) {
          var e = this.cc,
            o = this.ops,
            n = o.color,
            a = o.padding,
            s = o.drawRegion,
            r = s.minimap,
            l = o.font,
            h = o.height - a.bottom,
            d = s.drawSumWdith;
          (e.fillStyle = n.text), (e.strokeStyle = n.text);
          var p = [];
          for (var c in t)
            p.push({
              year: c,
              count: t[c],
            });
          for (
            var A = a.left, g = 0, f = h - 0.25 * r.h, m = 0, u = 0;
            u < p.length - 1;
            u++
          ) {
            m += p[u].count;
            var x = (m / i) * d;
            A = a.left + x;
            var v = p[u + 1].year,
              w = e.measureText(v).width;
            A > g + 10 &&
              A + w < a.left + d &&
              ((g = A + w),
              e.beginPath(),
              e.EMLine(A, h, A, f),
              e.closePath(),
              e.stroke(),
              e.fillText(p[u + 1].year, A + 2, f + l.size / 2),
              e.fill());
          }
          1 == p.length &&
            (e.EMLine(A, h, A, f),
            e.fillText(p[0].year, A + 2, f + l.size / 2),
            e.fill());
        }),
        (o.prototype.bindEvent = function () {
          function t(t) {
            if (m) {
              var i = t.targetTouches[0],
                e = f.fullDataSize,
                o = f.minWidth,
                n = g * (f.min / e),
                a = o > n ? o : n;
              x = !0;
              var l = i.clientX,
                h = l - c,
                d = parseInt(s.style.left) || 0,
                p = parseInt(s.style.right) || 0;
              if ("right" == r) {
                var A = g - h;
                A < 0 && (A = 0),
                  h < d + a && (A = g - d - a),
                  (s.style.right = Math.round(A) + "px");
              } else {
                var u;
                (u = h + a > g - p ? g - p - a : h),
                  h < 0 && (u = 0),
                  (s.style.left = Math.round(u) + "px");
              }
            }
          }
          function i(t) {
            if (u) {
              var i = t.targetTouches[0];
              v = !0;
              var e = i.clientX,
                o = i.clientY,
                n = e - l,
                a = parseInt(s.style.left) || 0,
                r = parseInt(s.style.right) || 0,
                d = a + n,
                p = r - n;
              if (d < 0) {
                var c = 0 - d;
                (d = 0), (p -= c);
              }
              if (p < 0) {
                var c = 0 - p;
                (p = 0), (d -= c);
              }
              d >= 0 &&
                p >= 0 &&
                ((s.style.left = d + "px"), (s.style.right = p + "px")),
                (l = e),
                (h = o);
            }
          }
          var e = this,
            o = this.kObj.layer.layerUI,
            n = this.kObj,
            a = o.querySelector(".__em_minimap"),
            s = o.querySelector(".__slidebar");
          this.slide = s;
          var r,
            l,
            h,
            d = a.getBoundingClientRect(),
            p = s.getBoundingClientRect(),
            c =
              (s.querySelector(".__sb_left"),
              s.querySelector(".__sb_right"),
              d.left),
            A = d.left + d.width,
            g = d.width,
            f = this.kObj.options.scale,
            m = !1,
            u = !1,
            x = !1,
            v = !1;
          o.addEventListener("touchstart", function (t) {
            var i = e.data,
              o = t.targetTouches[0];
            if (i && i.k) {
              (d = a.getBoundingClientRect()),
                (p = s.getBoundingClientRect()),
                (c = d.left),
                (A = d.left + d.width);
              var n = t.target.className;
              "__slidebar" == n && ((u = !0), (l = o.clientX), (h = o.clientY)),
                n.indexOf("__sb_left") > -1 && ((r = "left"), (m = !0)),
                n.indexOf("__sb_right") > -1 && ((r = "right"), (m = !0));
            }
          });
          var w = 0;
          o.addEventListener("touchmove", function (e) {
            if (m || u) {
              var o = new Date().getTime();
              o - w > 100 && (w = o), t(e), i(e);
            }
          }),
            o.addEventListener("touchend", function (t) {
              var i = f.fullDataSize,
                o = f.minWidth,
                a = g * (f.min / i),
                l = o > a ? o : a,
                h = n.interactive;
              if (x || v) {
                var d = parseInt(s.style.left) || 0,
                  p = parseInt(s.style.right) || 0;
                g - p - d < l &&
                  ("left" == r
                    ? (s.style.left = Math.round(g - p - l) + "px")
                    : (s.style.right = Math.round(g - d - l) + "px")),
                  e.reClacRegion(),
                  h.move(h.mx, h.my, !0);
              }
              (m = !1), (u = !1), (x = !1), (v = !1);
            });
        }),
        (o.prototype.reClacRegion = function () {
          var t = this.ops,
            i = t.drawRegion,
            e = this.ops.scale,
            o = this.slide,
            n = this.kObj.data.k.length,
            s = i.drawSumWdith,
            r = parseInt(o.style.left) || 0,
            l = parseInt(o.style.right) || 0;
          l < 0 && (l = 0);
          var h = Math.round(n * (r / s)),
            d = Math.round(n * ((s - l) / s));
          if (
            (d >= e.min && d + 1 - h == e.min && (h = d - e.min),
            (e.start = h),
            (e.end = d),
            (e.pillar = d - h + 1),
            a.slice.call(this.kObj),
            this.kObj.draw(),
            this.kObj.options.onDrag)
          ) {
            var p = this.kObj.stauts,
              c = this.kObj.options.scale,
              A = {};
            (A[p.indexv] = c.indexs[p.indexv]),
              (A[p.indexh] = c.indexs[p.indexh]),
              (A.VAVERAGE = c.indexs.VAVERAGE);
            var g = {
              data: c.data,
              indexs: A,
            };
            this.kObj.options.onDrag(g);
          }
        }),
        (o.prototype.update = function () {
          var t = this.kObj.options,
            i = t.scale,
            e = t.drawRegion.drawSumWdith,
            o = (i.start / i.fullDataSize) * e,
            n = e - ((i.end + 1) / i.fullDataSize) * e,
            a = this.slide;
          (a.style.left = o + "px"), (a.style.right = n + "px");
        }),
        (t.exports = o);
    },
    "./src/index.ts": function (t, i, e) {
      "use strict";
      var o =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        };
      Object.defineProperty(i, "__esModule", {
        value: !0,
      });
      var n = o(e("./src/k.ts"));
      t.exports = {
        k: n.default,
      };
    },
    "./src/k.ts": function (t, i, e) {
      "use strict";
      var o =
          (this && this.__awaiter) ||
          function (t, i, e, o) {
            function n(t) {
              return t instanceof e
                ? t
                : new e(function (i) {
                    i(t);
                  });
            }
            return new (e || (e = Promise))(function (e, a) {
              function s(t) {
                try {
                  l(o.next(t));
                } catch (t) {
                  a(t);
                }
              }
              function r(t) {
                try {
                  l(o["throw"](t));
                } catch (t) {
                  a(t);
                }
              }
              function l(t) {
                t.done ? e(t.value) : n(t.value).then(s, r);
              }
              l((o = o.apply(t, i || [])).next());
            });
          },
        n =
          (this && this.__generator) ||
          function (t, i) {
            function e(t) {
              return function (i) {
                return o([t, i]);
              };
            }
            function o(e) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; l; )
                try {
                  if (
                    ((n = 1),
                    a &&
                      (s =
                        2 & e[0]
                          ? a["return"]
                          : e[0]
                          ? a["throw"] || ((s = a["return"]) && s.call(a), 0)
                          : a.next) &&
                      !(s = s.call(a, e[1])).done)
                  )
                    return s;
                  switch (((a = 0), s && (e = [2 & e[0], s.value]), e[0])) {
                    case 0:
                    case 1:
                      s = e;
                      break;
                    case 4:
                      return (
                        l.label++,
                        {
                          value: e[1],
                          done: !1,
                        }
                      );
                    case 5:
                      l.label++, (a = e[1]), (e = [0]);
                      continue;
                    case 7:
                      (e = l.ops.pop()), l.trys.pop();
                      continue;
                    default:
                      if (
                        ((s = l.trys),
                        !(s = s.length > 0 && s[s.length - 1]) &&
                          (6 === e[0] || 2 === e[0]))
                      ) {
                        l = 0;
                        continue;
                      }
                      if (3 === e[0] && (!s || (e[1] > s[0] && e[1] < s[3]))) {
                        l.label = e[1];
                        break;
                      }
                      if (6 === e[0] && l.label < s[1]) {
                        (l.label = s[1]), (s = e);
                        break;
                      }
                      if (s && l.label < s[2]) {
                        (l.label = s[2]), l.ops.push(e);
                        break;
                      }
                      s[2] && l.ops.pop(), l.trys.pop();
                      continue;
                  }
                  e = i.call(t, l);
                } catch (t) {
                  (e = [6, t]), (a = 0);
                } finally {
                  n = s = 0;
                }
              if (5 & e[0]) throw e[1];
              return {
                value: e[0] ? e[1] : void 0,
                done: !0,
              };
            }
            var n,
              a,
              s,
              r,
              l = {
                label: 0,
                sent: function () {
                  if (1 & s[0]) throw s[1];
                  return s[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (r = {
                next: e(0),
                throw: e(1),
                return: e(2),
              }),
              "function" == typeof Symbol &&
                (r[Symbol.iterator] = function () {
                  return this;
                }),
              r
            );
          },
        a =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule
              ? t
              : {
                  default: t,
                };
          };
      Object.defineProperty(i, "__esModule", {
        value: !0,
      });
      var s = e("./old/init/initParameter.js"),
        r = e("./old/init/initLayer.js"),
        l = e("./old/init/initIndexDOM.js"),
        h = e("./old/init/drawRegion.js"),
        d = e("./old/dataFormat.js"),
        p = e("./old/dataFormat2.js"),
        c = e("./old/dataSplit.js"),
        A = e("./src/modules/data/index.ts"),
        g = e("./old/common/loadingImg.js"),
        f = e("./old/common/loading.js"),
        m = e("./old/common/watermark.js"),
        u = e("./old/drawGrid.js"),
        x = e("./old/drawBlockK.js"),
        v = e("./old/drawBlockTrading.js"),
        w = e("./old/drawIndexsV.js"),
        y = e("./old/drawIndexsH.js"),
        M = e("./old/drawTitle.js"),
        B = e("./old/dotPoint2.js"),
        C = e("./old/drawCYQ.js"),
        I = e("./old/dotPointFormat.js"),
        b = e("./old/interactive.js"),
        k = e("./old/interactiveForIpad.js"),
        D = e("./old/sildebar.js"),
        E = e("./old/sildebarForIpad.js"),
        R = (e("./old/common/extend2.js"), e("./old/extensionAPI.js")),
        Q = e("./old/common/getDeviceType.js"),
        _ = e("./old/common/cyq/index.js"),
        j = e("./css/box.css");
      a(e("./src/modules/style/index.ts")).default.addStyle(j["default"]);
      var O = (function () {
        function t(t) {
          (this.isfulldata = !1), (this.full_data = null);
          (this.option = t),
            (this.stauts = {
              indexv: "CMA",
              indexh: "RSI",
            });
          try {
            this._init();
          } catch (i) {
            t.onError(i);
          }
        }
        return (
          (t.prototype._init = function () {
            var t = Q();
            (this.sdata = {}),
              (this.sdata.dot = {}),
              s.call(this),
              r.call(this),
              h.call(this),
              l.popWin.call(this),
              l.cmfb.call(this);
            var i = this.options.show;
            this.options.cyq || l.main.call(this),
              i.index && l.technology.call(this),
              i.minimap && l.miniMap.call(this);
            var e = this.layer.layerGridC;
            u.gridK(e, this.options),
              u.gridTrading(e, this.options),
              i.index && u.gridIndex(e, this.options);
            var o = 0;
            if (this.option.cyq) {
              var n = this.option.cyq;
              o = n.width + (n.gap || 10);
            }
            if ((m.call(this, 0, o), 1 == t)) {
              var a = new E(this);
              (this.slidebar = a), (this.interactive = new k(this));
            } else {
              this.interactive = new b(this);
              var a = new D(this);
              this.slidebar = a;
            }
            var d = this.options;
            this.loading = new g({
              width: d.width,
              height: d.height,
              bgColor: d.color.background,
              ui: this.layer.layerUI,
            });
          }),
          (t.prototype.load = function () {
            var t = this.options;
            new f({
              cc: this.layer.layerLoadingC,
              width: t.width,
              height: t.height,
            }).start();
          }),
          (t.prototype._clear = function () {
            var t = document.querySelector(this.options.container);
            (t.innerHTML = ""),
              (t.className = t.className.replace("__emchatrs3_root_box", ""));
          }),
          (t.prototype._clearCanvas = function () {
            for (
              var t = this.layer, i = this.options, e = 0;
              e < t.length;
              e++
            ) {
              var o = t[e];
              o.lineCap && o.clearRect(0, 0, i.width, i.height);
            }
          }),
          (t.prototype.draw = function () {
            return o(this, void 0, void 0, function () {
              var t, i, e, o;
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    return void 0 != this.sdata && void 0 != this.sdata.k
                      ? [3, 2]
                      : [4, this.getAllData()];
                  case 1:
                    n.sent(), (n.label = 2);
                  case 2:
                    if ("OBV" == this.stauts.indexh)
                      return this.drawAll(!1), [2, !1];
                    this.setData2({
                      k: this.full_jump_data,
                    }),
                      this.draw2(),
                      this.setData({
                        k: this.part_data,
                      }),
                      (this.options.isdraw = !0),
                      (t = this),
                      (i = this.options.cyq || {});
                    try {
                      (e = this.stauts),
                        new x(this).draw(),
                        new w(this).draw(e.indexv),
                        M.titleK(this),
                        new v(this).draw(),
                        M.titleTrading(this),
                        this.options.show.index &&
                          ((o = this.layer.layerGridC),
                          u.gridIndex(o, this.options),
                          u.verticalLine(this, 3),
                          new y(this).draw(e.indexh, 1),
                          M.titleIndex(this)),
                        i.width && C.call(this),
                        this.sdata.dot && B.call(this),
                        t.options.onComplete();
                    } catch (i) {
                      t.option.onError(i);
                    }
                    return [2];
                }
              });
            });
          }),
          (t.prototype.reDraw = function () {
            return o(this, void 0, void 0, function () {
              var t, i, e, o;
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, this.getAllData()];
                  case 1:
                    n.sent(),
                      (this.options.scale.start = void 0),
                      (this.options.scale.end = void 0),
                      this.setData2({
                        k: this.full_jump_data,
                      }),
                      this.draw2(),
                      this.setData({
                        k: this.part_data,
                      }),
                      (this.options.isdraw = !0),
                      (t = this),
                      (i = this.options.cyq || {});
                    try {
                      (e = this.stauts),
                        new x(this).draw(),
                        new w(this).draw(e.indexv),
                        M.titleK(this),
                        new v(this).draw(),
                        M.titleTrading(this),
                        this.options.show.index &&
                          ((o = this.layer.layerGridC),
                          u.gridIndex(o, this.options),
                          u.verticalLine(this, 3),
                          new y(this).draw(e.indexh, 1),
                          M.titleIndex(this)),
                        i.width && C.call(this),
                        this.sdata.dot && B.call(this),
                        t.options.onComplete();
                    } catch (i) {
                      t.option.onError(i);
                    }
                    return [2];
                }
              });
            });
          }),
          (t.prototype.draw2 = function () {
            return o(this, void 0, void 0, function () {
              var t;
              return n(this, function (i) {
                switch (i.label) {
                  case 0:
                    return void 0 != this.sdata && void 0 != this.sdata.k
                      ? [3, 2]
                      : [4, this.initData2()];
                  case 1:
                    i.sent(), (i.label = 2);
                  case 2:
                    (this.options.isdraw = !0), (t = this);
                    try {
                      this.slidebar.drawFullData();
                    } catch (i) {
                      t.option.onError(i);
                    }
                    return [2];
                }
              });
            });
          }),
          (t.prototype.drawAll = function (t) {
            return (
              void 0 === t && (t = !0),
              o(this, void 0, void 0, function () {
                var i, e, o, a;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return t || null == this.full_data
                        ? [4, this.getOneAllData()]
                        : [3, 2];
                    case 1:
                      n.sent(), (n.label = 2);
                    case 2:
                      this.setDataAll({
                        k: this.full_data,
                      }),
                        (this.options.isdraw = !0),
                        (i = this),
                        (e = this.options.cyq || {});
                      try {
                        return (
                          (o = this.stauts),
                          this.slidebar.drawFullData(),
                          new x(this).draw(),
                          new w(this).draw(o.indexv),
                          M.titleK(this),
                          new v(this).draw(),
                          M.titleTrading(this),
                          this.options.show.index &&
                            ((a = this.layer.layerGridC),
                            u.gridIndex(a, this.options),
                            u.verticalLine(this, 3),
                            new y(this).draw(o.indexh, 1),
                            M.titleIndex(this)),
                          e.width && C.call(this),
                          this.sdata.dot && B.call(this),
                          i.options.onComplete(),
                          [2, !0]
                        );
                      } catch (t) {
                        return i.option.onError(t), [2, !1];
                      }
                      return [2];
                  }
                });
              })
            );
          }),
          (t.prototype.elongate = function (t, i) {
            return o(this, void 0, void 0, function () {
              var e;
              return n(this, function (o) {
                switch (o.label) {
                  case 0:
                    return this.isfulldata
                      ? [3, 2]
                      : ((this.options.scale.start = void 0),
                        (this.options.scale.end = void 0),
                        [4, this.drawAll()]);
                  case 1:
                    o.sent(), (o.label = 2);
                  case 2:
                    return (
                      (e = this.options),
                      e.onDragStart && e.onDragStart(e.scale),
                      R.elongate.call(this, t, i),
                      e.onDragEnd && e.onDragEnd(e.scale),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.shorten = function (t, i) {
            return o(this, void 0, void 0, function () {
              var e;
              return n(this, function (o) {
                switch (o.label) {
                  case 0:
                    return this.isfulldata
                      ? [3, 2]
                      : ((this.options.scale.start = void 0),
                        (this.options.scale.end = void 0),
                        [4, this.drawAll()]);
                  case 1:
                    o.sent(), (o.label = 2);
                  case 2:
                    return (
                      (e = this.options),
                      e.onDragStart && e.onDragStart(e.scale),
                      R.shorten.call(this, t, i),
                      e.onDragEnd && e.onDragEnd(e.scale),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.initData = function () {
            return o(this, void 0, void 0, function () {
              var t, i, e, o;
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      (t = this.options.ktype),
                      [
                        4,
                        A.getdata.getKlineData(this.options.code, {
                          ktype: A.KlineTypes[t],
                          cfq: this.options.cfq,
                          lastcount: this.options.scale.pillar + 24,
                        }),
                      ]
                    );
                  case 1:
                    return (
                      (i = n.sent()),
                      (e = i.data.klines.map(function (t) {
                        return (
                          (t += "%"),
                          t.split(",").slice(0, 8).concat("-").join(",")
                        );
                      })),
                      (o = {
                        name: i.data.name,
                        data: e,
                        info: {
                          yc: e[e.length - 2].split(",")[2],
                        },
                      }),
                      this.setData({
                        k: o,
                      }),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.initData2 = function () {
            return o(this, void 0, void 0, function () {
              var t, i, e, o;
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      (t = this.options.ktype),
                      [
                        4,
                        A.getdata.getKlineData(this.options.code, {
                          ktype: A.KlineTypes[t],
                          cfq: this.options.cfq,
                          smplmt: this.options.drawRegion.drawSumWdith,
                        }),
                      ]
                    );
                  case 1:
                    return (
                      (i = n.sent()),
                      (e = i.data.klines.map(function (t) {
                        return (
                          (t += "%"),
                          t.split(",").slice(0, 8).concat("-").join(",")
                        );
                      })),
                      (o = {
                        name: i.data.name,
                        data: e,
                        info: {
                          yc: e[e.length - 2].split(",")[2],
                        },
                      }),
                      this.setData2({
                        k: o,
                      }),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.setKType = function (t) {
            return o(this, void 0, void 0, function () {
              return n(this, function (i) {
                return (
                  (this.options.ktype = t),
                  (this.options.scale.pillar = this.option.scale.pillar),
                  (this.options.scale.start = void 0),
                  (this.options.scale.end = void 0),
                  (this.isfulldata = !1),
                  (this.full_data = null),
                  (this.sdata = void 0),
                  this.draw(),
                  [2]
                );
              });
            });
          }),
          (t.prototype.setCfq = function (t) {
            return o(this, void 0, void 0, function () {
              return n(this, function (i) {
                return (
                  (this.options.cfq = t),
                  (this.options.scale.pillar = this.option.scale.pillar),
                  (this.options.scale.start = void 0),
                  (this.options.scale.end = void 0),
                  (this.isfulldata = !1),
                  (this.full_data = null),
                  (this.sdata = void 0),
                  this.draw(),
                  [2]
                );
              });
            });
          }),
          (t.prototype.transData = function (t) {
            var i = t.data.klines.map(function (t) {
              return (t += "%"), t.split(",").slice(0, 8).concat("-").join(",");
            });
            return {
              name: t.data.name,
              data: i,
              info: {
                yc:
                  i.length > 1
                    ? i[i.length - 2].split(",")[2]
                    : i[i.length - 1].split(",")[2],
              },
            };
          }),
          (t.prototype.getAllData = function () {
            return o(this, void 0, void 0, function () {
              var t, i, e, o, a, s, r;
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      (t = this.options.ktype),
                      (s = (a = Promise).all),
                      [
                        4,
                        A.getdata.getKlineData(this.options.code, {
                          ktype: A.KlineTypes[t],
                          cfq: this.options.cfq,
                          smplmt: this.options.drawRegion.drawSumWdith,
                        }),
                      ]
                    );
                  case 1:
                    return (
                      (r = [n.sent()]),
                      [
                        4,
                        A.getdata.getKlineData(this.options.code, {
                          ktype: A.KlineTypes[t],
                          cfq: this.options.cfq,
                          lastcount: this.options.scale.pillar + 60,
                        }),
                      ]
                    );
                  case 2:
                    return [4, s.apply(a, [r.concat([n.sent()])])];
                  case 3:
                    return (
                      (i = n.sent()),
                      (e = i[0]),
                      (o = i[1]),
                      (this.full_jump_data = this.transData(e)),
                      (this.part_data = this.transData(o)),
                      (this.options.scale.truepillar = this.getNearIndex(
                        e,
                        o,
                        this.option.scale.pillar
                      )),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.getOneAllData = function () {
            return o(this, void 0, void 0, function () {
              var t, i;
              return n(this, function (e) {
                switch (e.label) {
                  case 0:
                    return (
                      (t = this.options.ktype),
                      [
                        4,
                        A.getdata.getKlineData(this.options.code, {
                          ktype: A.KlineTypes[t],
                          cfq: this.options.cfq,
                          lastcount: 1e6,
                        }),
                      ]
                    );
                  case 1:
                    return (
                      (i = e.sent()),
                      (this.isfulldata = !0),
                      (this.full_data = this.transData(i)),
                      [2]
                    );
                }
              });
            });
          }),
          (t.prototype.getNearIndex = function (t, i, e) {
            var o = i.data.klines.length - e;
            o < 0 && (o = 0);
            for (
              var n = i.data.klines[o].split(",")[0].replace(/-/gi, ""),
                a = 0,
                s = 0;
              s < t.data.klines.length;
              s++
            ) {
              if (t.data.klines[s].split(",")[0].replace(/-/gi, "") > n) {
                a = t.data.klines.length - s;
                break;
              }
            }
            return a;
          }),
          (t.prototype.setData = function (t) {
            (this.sdata.k = t.k), p.formatK.call(this), c.slice.call(this);
            var i = this.option.cyq;
            if (i) {
              var e = i.accuracyFactor || 150,
                o = i.range || 120,
                n = new _(this.data.ks, e, o);
              this.cyqCalc = n;
            }
          }),
          (t.prototype.setData2 = function (t) {
            this.sdata || (this.sdata = {}),
              t.k && (this.sdata.k = t.k),
              d.formatK.call(this),
              c.slice.call(this);
          }),
          (t.prototype.setDataAll = function (t) {
            if (
              (this.sdata || (this.sdata = {}),
              t.k && (this.sdata.k = t.k),
              t.klist &&
                ((this.sdata.klist = {}), (this.sdata.klist.data = t.klist)),
              t.dot)
            ) {
              for (var i in t.dot) this.sdata.dot[i] = t.dot[i];
              I.call(this);
            }
            d.formatK.call(this), c.slice.call(this);
            var e = this.option.cyq;
            if (e) {
              var o = e.accuracyFactor || 150,
                n = e.range || 120,
                a = new _(this.data.ks, o, n);
              this.cyqCalc = a;
            }
          }),
          (t.prototype.getData = function () {
            var t,
              i = this.stauts,
              e = this.options.scale,
              o =
                ((t = {}),
                (t[i.indexv] = e.indexs[i.indexv]),
                (t[i.indexh] = e.indexs[i.indexh]),
                (t.VAVERAGE = e.indexs.VAVERAGE),
                t);
            return {
              data: e.data,
              indexs: o,
            };
          }),
          (t.prototype.getThisIndex = function () {
            return this.options.thisData;
          }),
          (t.prototype.getBoundingRect = function () {
            var t = this.options.padding,
              i = this.options.drawRegion.k;
            return {
              left: t.left,
              right: t.right,
              top: t.top + i.mt + i.top,
              bottom: t.bottom,
            };
          }),
          (t.prototype.start = function (t) {
            this.loading.start(t);
          }),
          (t.prototype.stop = function () {
            this.loading.stop();
          }),
          t
        );
      })();
      i.default = O;
    },
    "./src/modules/data/index.ts": function (t, i, e) {
      "use strict";
      var o =
          (this && this.__awaiter) ||
          function (t, i, e, o) {
            function n(t) {
              return t instanceof e
                ? t
                : new e(function (i) {
                    i(t);
                  });
            }
            return new (e || (e = Promise))(function (e, a) {
              function s(t) {
                try {
                  l(o.next(t));
                } catch (t) {
                  a(t);
                }
              }
              function r(t) {
                try {
                  l(o["throw"](t));
                } catch (t) {
                  a(t);
                }
              }
              function l(t) {
                t.done ? e(t.value) : n(t.value).then(s, r);
              }
              l((o = o.apply(t, i || [])).next());
            });
          },
        n =
          (this && this.__generator) ||
          function (t, i) {
            function e(t) {
              return function (i) {
                return o([t, i]);
              };
            }
            function o(e) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; l; )
                try {
                  if (
                    ((n = 1),
                    a &&
                      (s =
                        2 & e[0]
                          ? a["return"]
                          : e[0]
                          ? a["throw"] || ((s = a["return"]) && s.call(a), 0)
                          : a.next) &&
                      !(s = s.call(a, e[1])).done)
                  )
                    return s;
                  switch (((a = 0), s && (e = [2 & e[0], s.value]), e[0])) {
                    case 0:
                    case 1:
                      s = e;
                      break;
                    case 4:
                      return (
                        l.label++,
                        {
                          value: e[1],
                          done: !1,
                        }
                      );
                    case 5:
                      l.label++, (a = e[1]), (e = [0]);
                      continue;
                    case 7:
                      (e = l.ops.pop()), l.trys.pop();
                      continue;
                    default:
                      if (
                        ((s = l.trys),
                        !(s = s.length > 0 && s[s.length - 1]) &&
                          (6 === e[0] || 2 === e[0]))
                      ) {
                        l = 0;
                        continue;
                      }
                      if (3 === e[0] && (!s || (e[1] > s[0] && e[1] < s[3]))) {
                        l.label = e[1];
                        break;
                      }
                      if (6 === e[0] && l.label < s[1]) {
                        (l.label = s[1]), (s = e);
                        break;
                      }
                      if (s && l.label < s[2]) {
                        (l.label = s[2]), l.ops.push(e);
                        break;
                      }
                      s[2] && l.ops.pop(), l.trys.pop();
                      continue;
                  }
                  e = i.call(t, l);
                } catch (t) {
                  (e = [6, t]), (a = 0);
                } finally {
                  n = s = 0;
                }
              if (5 & e[0]) throw e[1];
              return {
                value: e[0] ? e[1] : void 0,
                done: !0,
              };
            }
            var n,
              a,
              s,
              r,
              l = {
                label: 0,
                sent: function () {
                  if (1 & s[0]) throw s[1];
                  return s[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (r = {
                next: e(0),
                throw: e(1),
                return: e(2),
              }),
              "function" == typeof Symbol &&
                (r[Symbol.iterator] = function () {
                  return this;
                }),
              r
            );
          },
        a =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule
              ? t
              : {
                  default: t,
                };
          };
      Object.defineProperty(i, "__esModule", {
        value: !0,
      });
      var s,
        r = a(e("lodash"));
      !(function (t) {
        (t[(t["Bfq"] = 0)] = "Bfq"),
          (t[(t["Qfq"] = 1)] = "Qfq"),
          (t[(t["Hfq"] = 2)] = "Hfq");
      })(s || (s = {}));
      var l;
      !(function (t) {
        (t[(t["D"] = 101)] = "D"),
          (t[(t["W"] = 102)] = "W"),
          (t[(t["M"] = 103)] = "M"),
          (t[(t["M5"] = 5)] = "M5"),
          (t[(t["M15"] = 15)] = "M15"),
          (t[(t["M30"] = 30)] = "M30"),
          (t[(t["M60"] = 60)] = "M60");
      })(l || (l = {})),
        (i.getdata = {
          getKlineData: function (t, i) {
            return (
              void 0 === i && (i = {}),
              o(this, void 0, void 0, function () {
                var e, o, a, h, d;
                return n(this, function (n) {
                  return (
                    (e = r.default.merge(
                      {
                        ktype: l.D,
                        cfq: s.Bfq,
                        begin: 0,
                        end: 20500101,
                        smplmt: 1e6,
                        lmt: 1e6,
                      },
                      i
                    )),
                    (o = Math.floor(99 * Math.random() + 1)),
                    (a = "https:" == location.protocol),
                    (h =
                      "http://" +
                      o +
                      ".push2his.eastmoney.com/api/qt/stock/kline/get?cb=?"),
                    a &&
                      (h =
                        "https://push2his.eastmoney.com/api/qt/stock/kline/get?cb=?"),
                    (d = {
                      secid: t,
                      ut: "fa5fd1943c7b386f172d6893dbfba10b",
                      fields1: "f1,f2,f3,f4,f5",
                      fields2: "f51,f52,f53,f54,f55,f56,f57,f58",
                      klt: e.ktype,
                      fqt: e.cfq,
                      beg: e.begin,
                      end: e.end,
                      smplmt: e.smplmt,
                      lmt: e.lmt,
                    }),
                    i.lastcount &&
                      ((d.lmt = i.lastcount), delete d.beg, delete d.smplmt),
                    [
                      2,
                      $.ajax({
                        method: "GET",
                        url: h,
                        dataType: "jsonp",
                        data: d,
                      }),
                    ]
                  );
                });
              })
            );
          },
        }),
        (i.KlineTypes = l);
    },
    "./src/modules/style/index.ts": function (t, i, e) {
      "use strict";
      Object.defineProperty(i, "__esModule", {
        value: !0,
      }),
        (i.default = {
          addStyle: function (t) {
            var i = document.head || document.getElementsByTagName("head")[0],
              e = document.createElement("style");
            (e.type = "text/css"),
              e.styleSheet
                ? (e.styleSheet.cssText = t)
                : e.appendChild(document.createTextNode(t)),
              i.appendChild(e);
          },
          addStyleUrl: function (t) {
            var i = document.head || document.getElementsByTagName("head")[0],
              e = document.createElement("link");
            e.setAttribute("rel", "stylesheet"),
              e.setAttribute("href", t),
              i.appendChild(e);
          },
        });
    },
    lodash: function (i, e) {
      i.exports = t;
    },
  });
});

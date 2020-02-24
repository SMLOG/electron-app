function unit(e, t, a) {
  if (((e = Number(e)), isNaN(e))) return "-";
  var n = Math.abs(e);
  return (e / 1e4).toFixed(a ? (n / 1e4 <= 99 ? 2 : t) : t);
}
function Painter(e) {
  (this.param = e),
    (this.ctn = null),
    (this.g = null),
    (this.canvas = null),
    this.initCtn(),
    this.initCanvas();
}
function TodayChart(e, t) {
  (this.param = e),
    (this.painterDay = null),
    (this.painterDatail = null),
    (this.painterFive = null),
    (this.max = 0),
    (this.min = 0),
    (this.mainW = 0),
    (this.mainH = 0),
    this.init(),
    (this.data = null),
    (this.cb = t),
    (this.bRise = themeRed),
    (this.bFall = themeGreen),
    (this.rise = this.bRise),
    (this.fall = this.bFall),
    (this.detailFlag = !1);
}
var xh5_BrowserUtil = new (function() {
    this.hdpr = (function(e) {
      var t = document.createElement("canvas");
      if (t.getContext && t.getContext("2d")) {
        return (
          Math.ceil(window.devicePixelRatio || 1) /
          (t.getContext("2d").webkitBackingStorePixelRatio || 1)
        );
      }
      return (e.noH5 = !0), 1;
    })(this);
  })(),
  themeRed = "#de3639",
  themeGreen = "#1bc07d",
  themeBlue = "#538eeb",
  painterProp = Painter.prototype;
(painterProp.initCtn = function() {
  this.ctn = this.param.ctn ? this.param.ctn : document.body;
}),
  (painterProp.initCanvas = function() {
    (this.canvas = document.createElement("canvas")),
      (this.g = this.canvas.getContext("2d")),
      this.ctn.appendChild(this.canvas),
      this.resizeLoc();
  }),
  (painterProp.resizeLoc = function() {
    (this.canvas.style.top = "0px"), (this.canvas.style.left = "0px");
    var e = 1,
      t = this.canvas.parentNode.offsetWidth,
      a = this.canvas.parentNode.offsetHeight;
    switch (
      ((this.canvas.style.width = t + "px"),
      (this.canvas.style.height = a + "px"),
      e)
    ) {
      case 0:
        break;
      case 1:
        (e = xh5_BrowserUtil.hdpr), (t *= e), (a *= e);
        break;
      default:
        (t *= e), (a *= e);
    }
    (this.canvas.width = t),
      (this.canvas.height = a),
      e && 1 != e && this.g.scale(e, e);
  }),
  (painterProp.scale = function(e) {
    switch (e) {
      case 0:
        return;
      case 1:
        e = xh5_BrowserUtil.hdpr;
    }
    e && this.g.scale(e, e);
  }),
  (painterProp.newGStyle = function(e) {
    for (var t in e) e.hasOwnProperty(t) && (this.g[t] = e[t]);
  }),
  (painterProp.newStyle = function(e, t, a) {
    (this.g.strokeStyle = e),
      t && this.g.beginPath(),
      a && (this.g.lineWidth = a);
  }),
  (painterProp.newFillStyle = function(e, t) {
    if (e && !(e.length < 1)) {
      var a = e.length;
      if (1 == a) this.g.fillStyle = e[0];
      else if (a > 1) {
        for (var n = this.g.createLinearGradient(0, 0, 0, t), i = 0; i < a; i++)
          n.addColorStop((1 / (a - 1)) * i, e[i]);
        this.g.fillStyle = n;
      }
    }
  }),
  (painterProp.newFillStyle_rgba = function(e, t, a) {
    for (
      var n = _g.createLinearGradient(0, 0, 0, t), i = 0, r = e.length;
      i < r;
      i++
    )
      n.addColorStop((1 / (r - 1)) * i, util_.hex2dec(e[i], a));
    this.g.fillStyle = n;
  }),
  (painterProp.clear = function(e, t) {
    var a = this.canvas.width;
    (this.canvas.width = a),
      e &&
        (_c && _g.strokeStyle != _c && (_g.strokeStyle = _c), _g.beginPath()),
      this.scale(t);
  }),
  (painterProp.clearLimit = function(e, t) {
    this.g.clearRect(e, 0, t, this.canvas.height), this.g.beginPath();
  }),
  (painterProp.beginPath = function() {
    this.g.beginPath();
  }),
  (painterProp.closePath = function() {
    this.g.closePath();
  }),
  (painterProp.fill = function() {
    this.g.fill();
  }),
  (painterProp.stroke = function() {
    this.g.stroke();
  }),
  (painterProp.save = function() {
    this.g.save();
  }),
  (painterProp.translate = function(e, t) {
    this.g.translate(e, t);
  }),
  (painterProp.restore = function() {
    this.g.restore();
  }),
  (painterProp.moveTo = function(e, t) {
    this.g.moveTo(e, t);
  }),
  (painterProp.lineTo = function(e, t) {
    this.g.lineTo(e, t);
  }),
  (painterProp.drawDot = function(e, t, a, n) {
    n && this.g.moveTo(e, t), this.fill(), this.g.arc(e, t, a, 0, 2 * Math.PI);
  }),
  (painterProp.arc = function(e, t, a, n, i, r) {
    this.g.arc(e, t, a, n, i, r);
  }),
  (painterProp.drawVStickRect = function(e, t, a, n, i, r) {
    var o = a;
    (e = ~~(e + 0.5)),
      (o = ~~(o + 0.5)),
      (t = ~~(t + 0.5)),
      (n = ~~(n + 0.5)),
      0 == n && (n = 1),
      r
        ? (o < 0.5 && (o = 0.5),
          (this.g.fillStyle = i),
          this.g.fillRect(e, t, o, n))
        : ((e -= 0.5),
          (t -= 0.5),
          (this.g.strokeStyle = i),
          this.g.strokeRect(e, t, o, n));
  });
var tChartProp = TodayChart.prototype;
(tChartProp.init = function() {
  (this.painterDay = new Painter({
    ctn: this.param.dom
  })),
    (this.painterDatail = new Painter({
      ctn: this.param.domDetail
    })),
    (this.painterFive = new Painter({
      ctn: this.param.domFive
    })),
    this.load(),
    this.loadFive();
}),
  (tChartProp.loadFive = function() {
    var e = this;
    (e.dataPPFive = []),
      jsonP({
        varStr: "fiveK" + Math.floor(100 * Math.random()),
        url:
          "//money.finance.sina.com.cn/quotes_service/api/openapi.php/CN_MarketData.getKLineData?symbol=" +
          paperCode +
          "&scale=240&ma=no&datalen=10",
        callback: !0,
        success: function(t) {
          var a = t.data;
          if (!a)
            return void (
              document.querySelector(".money-five") &&
              (document.querySelector(".money-five").style.display = "none")
            );
          e.loadFiveZJ();
          for (var n = 0; n < a.length; n++)
            a[n].percent =
              0 == n
                ? (1 * a[n].close - 1 * a[n].open) / (1 * a[n].open)
                : (1 * a[n].close - 1 * a[n - 1].close) / (1 * a[n - 1].close);
          (a = a.reverse()), (e.dataPFive = a.slice(0, 6));
        }
      });
  }),
  (tChartProp.loadFiveZJ = function() {
    var e = this;
    (e.fiveZJ = []),
      (e.dataFive = []),
      jsonP({
        varStr: "fiveZj" + Math.floor(100 * Math.random()),
        url: "//stock.sina.com.cn/stock/api/openapi.php/TouziService.getStockHistoryFlow?page=1&num=5&symbol=$symbol".replace(
          "$symbol",
          paperCode
        ),
        callback: !0,
        success: function(t) {
          if (t && t.data && t.data.data) {
            for (var a = t.data.data, n = 0; n < a.length; n++) {
              var i = a[n].r0_in - a[n].r0_out + a[n].r1_in - a[n].r1_out;
              e.dataFive.push(i);
            }
            for (
              e.dataPFive[0].day.replace(/\//g, "-") != a[0].date &&
                e.dataPFive.shift(),
                e.dataPFive = e.dataPFive.reverse(),
                e.dataPPFive = e.dataPPFive.reverse(),
                e.dataFive = e.dataFive.reverse(),
                e.dataFive.length > 5 && e.dataFive.shift(),
                e.dataPFive.length > 5 && e.dataPFive.shift(),
                n = 0;
              n < e.dataPFive.length;
              n++
            )
              e.dataPPFive.push(e.dataPFive[n].percent);
            e.dim({
              painter: "Five"
            }),
              e.dimDoubleTemple({
                num: 5,
                series: [
                  {
                    value: "Five"
                  },
                  {
                    value: "PPFive",
                    type: "line"
                  }
                ]
              }),
              e.renderTemple("Five", {
                painter: "Five"
              }),
              e.renderLine("PPFive", {
                painter: "Five"
              }),
              e.zjFiveTemple();
          } else
            document.querySelector(".money-five") &&
              (document.querySelector(".money-five").style.display = "none");
        }
      });
  }),
  (tChartProp.zjFiveTemple = function() {
    var e = this.dataFive,
      t = this.dataPFive,
      a = document.querySelector(".date"),
      n = document.querySelector(".earn"),
      i = document.querySelector(".percent");
    this.fiveListTemple({
      type: 1,
      data: t,
      dom: a
    }),
      this.fiveListTemple({
        type: 2,
        data: t,
        dom: i
      }),
      this.fiveListTemple({
        type: 3,
        data: e,
        dom: n
      });
  }),
  (tChartProp.fiveListTemple = function(e) {
    for (
      var t = e, a = document.createElement("ul"), n = 0;
      n < t.data.length;
      n++
    ) {
      var i = document.createElement("li");
      switch (t.type) {
        case 1:
          var r = t.data[n].day.split("-");
          i.innerHTML = r[1] + "-" + r[2];
          break;
        case 2:
          i.innerHTML =
            Number(100 * t.data[n].percent) > 0
              ? "+" + Number(100 * t.data[n].percent).toFixed(2) + "%"
              : Number(100 * t.data[n].percent).toFixed(2) + "%";
          break;
        case 3:
          i.innerHTML = unit(t.data[n], 0, 2);
      }
      a.appendChild(i);
    }
    t.dom.appendChild(a);
  }),
  (tChartProp.load = function() {
    var e = this;
    new HQ.DataCenter({
      symbols: paperCode,
      isANeedCWZJ: !0,
      getObj: function(t) {
        var a = t[paperCode];
        (e.zjData = {
          td_i: Math.abs(1 * a.rxl_in_raw) || 0,
          td_o: Math.abs(1 * a.rxl_out_raw) || 0,
          td_a:
            (Math.abs(1 * a.rxl_in_raw) || 0) -
            (Math.abs(1 * a.rxl_out_raw) || 0),
          td_r: a.rxl_net_rate || 0,
          d_i: Math.abs(1 * a.rl_in_raw) || 0,
          d_o: Math.abs(1 * a.rl_out_raw) || 0,
          d_a:
            (Math.abs(1 * a.rl_in_raw) || 0) -
            (Math.abs(1 * a.rl_out_raw) || 0),
          d_r: a.rl_net_rate || 0,
          z_i: Math.abs(1 * a.rm_in_raw) || 0,
          z_o: Math.abs(1 * a.rm_out_raw) || 0,
          z_a:
            (Math.abs(1 * a.rm_in_raw) || 0) -
            (Math.abs(1 * a.rm_out_raw) || 0),
          z_r: a.rm_net_rate || 0,
          x_i: Math.abs(1 * a.rs_in_raw) || 0,
          x_o: Math.abs(1 * a.rs_out_raw) || 0,
          x_a:
            (Math.abs(1 * a.rs_in_raw) || 0) -
            (Math.abs(1 * a.rs_out_raw) || 0),
          x_r: a.rs_net_rate || 0,
          zl_a: a.rp_net || 0,
          zl_r: a.rp_net_rate || 0,
          type: a.type,
          turnOver: a.turnOver,
          totalAmount: a.totalAmount_i
        }),
          (e.dataDetail = [
            Math.abs(1 * a.rxl_in_raw) || 0,
            Math.abs(1 * a.rxl_out_raw) || 0,
            Math.abs(1 * a.rl_in_raw) || 0,
            Math.abs(1 * a.rl_out_raw) || 0,
            Math.abs(1 * a.rm_in_raw) || 0,
            Math.abs(1 * a.rm_out_raw) || 0,
            Math.abs(1 * a.rs_in_raw) || 0,
            Math.abs(1 * a.rs_out_raw) || 0
          ]),
          (e.dataDay = [
            e.zjData.td_a,
            e.zjData.d_a,
            e.zjData.z_a,
            e.zjData.x_a
          ]),
          e.renderChart(),
          e.cb({
            day: e.dataDay,
            zj: e.zjData
          });
      }
    });
  }),
  (tChartProp.renderChart = function() {
    var e = this;
    e.dim({
      painter: "Day"
    }),
      e.dimTemple("Day", {
        num: 4
      }),
      e.dimTemple("Detail", {
        num: 8
      }),
      e.renderTemple("Day", {
        painter: "Day"
      }),
      e.detailRender();
  }),
  (tChartProp.dim = function(e) {
    var t = this;
    (t.mainW = t["painter" + e.painter].canvas.offsetWidth),
      (t.mainH = t["painter" + e.painter].canvas.offsetHeight),
      (t.paddingH = 30),
      (t.paddingW = 20),
      (t.chartH = t.mainH - 2 * t.paddingH);
  }),
  (tChartProp.riseColorSetting = function() {
    window.riseColor &&
      "riseGreen" == window.riseColor &&
      ((this.rise = this.bFall), (this.fall = this.bRise));
  }),
  (tChartProp.dimDoubleTemple = function(e) {
    var t,
      a,
      n,
      i = this,
      r = e,
      o = r.series,
      s = 1;
    for (a = 0; a < o.length; a++)
      (n = o[a].value),
        (value = i["data" + n]),
        (i["max" + n] = Math.max.apply(null, value || 1)),
        (i["min" + n] = Math.min.apply(null, value || 1)),
        (i["abs" + n] = Math.max(
          Math.abs(i["max" + n]),
          Math.abs(i["min" + n])
        )),
        i["min" + n] <= 0 && (s = 3);
    for (a = 0; a < o.length; a++)
      for (
        n = o[a].value,
          i["num" + n] = r.num,
          i["gapW" + n] = (i.mainW - 2 * i.paddingW) / i["num" + n],
          i["rectW" + n] = 0.4 * i["gapW" + n],
          i["zero" + n] = 0,
          i["dataH" + n] = [],
          i["dataY" + n] = [],
          t = 0;
        t < i["data" + n].length;
        t++
      ) {
        var l,
          c,
          d = i["data" + n][t],
          p = Math.abs(i["data" + n][t]);
        s > 2
          ? ((l = (p * i.chartH) / (2 * i["abs" + n])),
            (i["zero" + n] =
              (i["abs" + n] * i.chartH) / (2 * i["abs" + n]) + i.paddingH),
            (c = d > 0 ? i["zero" + n] - l : i["zero" + n]))
          : ((i["zero" + n] = i.chartH + i.paddingH),
            (c = i["zero" + n] - (p * i.chartH) / i["abs" + n]),
            (l = (p * i.chartH) / i["abs" + n])),
          o[a].type &&
            "line" == o[a].type &&
            s > 2 &&
            (c = d > 0 ? i["zero" + n] - l : i["zero" + n] + l),
          i["dataH" + n].push(l),
          i["dataY" + n].push(c);
      }
  }),
  (tChartProp.dimTemple = function(e, t) {
    var a = this;
    (a["max" + e] = Math.max.apply(null, a["data" + e]) || 1),
      (a["min" + e] = Math.min.apply(null, a["data" + e]) || 1),
      (a["num" + e] = t.num),
      (a["gapW" + e] = (a.mainW - 2 * a.paddingW) / a["num" + e]),
      (a["rectW" + e] = 0.4 * a["gapW" + e]),
      (a["zero" + e] = 0),
      (a["dataH" + e] = []),
      (a["dataY" + e] = []);
    var n = 0;
    n =
      a["max" + e] < 0
        ? a["min" + e] - a["max" + e]
        : a["max" + e] - a["min" + e];
    for (var i = 0; i < a["data" + e].length; i++) {
      var r,
        o,
        s = a["data" + e][i],
        l = Math.abs(a["data" + e][i]);
      (r = (l * a.chartH) / n),
        a["min" + e] < 0
          ? ((a["zero" + e] = (a["max" + e] * a.chartH) / n + a.paddingH),
            (o = s > 0 ? a["zero" + e] - r : a["zero" + e]))
          : ((a["zero" + e] =
              (a["max" + e] * a.chartH) / a["max" + e] + a.paddingH),
            (o = a["zero" + e] - (l * a.chartH) / a["max" + e]),
            (r = (l * a.chartH) / a["max" + e])),
        t.type &&
          "line" == t.type &&
          a["min" + e] < 0 &&
          (o = s > 0 ? a["zero" + e] - r : a["zero" + e] + r),
        a["max" + e] < 0 &&
          ((a["zero" + e] = a.paddingH),
          (o = a.paddingH),
          (r = (s * a.chartH) / a["min" + e])),
        a["dataH" + e].push(r),
        a["dataY" + e].push(o);
    }
  }),
  (tChartProp.detailRender = function() {
    var e = this.painterDatail,
      t = this.dataYDetail,
      a = this.dataHDetail;
    for (e.clear(!1, xh5_BrowserUtil.hdpr), i = 0; i < t.length; i++) {
      var n = void 0;
      i % 2 == 0
        ? ((n = this.rise),
          e.drawVStickRect(
            (this.gapWDetail - this.rectWDetail) / 2 +
              (2 * this.paddingW) / 5 +
              this.paddingW +
              i * this.gapWDetail,
            t[i],
            this.rectWDetail,
            a[i],
            n,
            !0
          ))
        : ((n = this.fall),
          e.drawVStickRect(
            (this.gapWDetail - this.rectWDetail) / 2 +
              this.paddingW +
              i * this.gapWDetail -
              (2 * this.paddingW) / 5,
            t[i],
            this.rectWDetail,
            a[i],
            n,
            !0
          ));
    }
    for (
      e.stroke(),
        e.newStyle("#ddd", !0, 1),
        e.moveTo(this.paddingW / 2, this.zeroDetail),
        e.lineTo(this.mainW - this.paddingW / 2, this.zeroDetail),
        e.stroke(),
        e.g.font = "12px Arial",
        e.newStyle("#fff", !0, 1),
        i = 0;
      i < t.length;
      i++
    )
      e.moveTo(
        this.paddingW + i * this.gapWDetail + this.rectWDetail / 2,
        t[i] - 1
      ),
        e.lineTo(
          this.paddingW + i * this.gapWDetail + this.rectWDetail / 2,
          t[i] - 1
        ),
        e.stroke(),
        (e.g.textAlign = "center"),
        (e.g.fillStyle = "#333"),
        e.g.fillText(
          unit(this.dataDetail[i], 0, 2),
          this.gapWDetail / 2 + this.paddingW + i * this.gapWDetail,
          this.dataDetail[i] >= 0 ? t[i] - 5 : t[i] + a[i] + 15
        ),
        i % 2 == 0 &&
          ((e.g.textAlign = "start"),
          e.g.fillText(
            this.param.labDetail[Math.floor(i / 2)],
            this.gapWDetail / 2 +
              (2 * this.paddingW) / 5 +
              this.paddingW +
              i * this.gapWDetail,
            this.dataDetail[i] >= 0 ? this.zeroDetail + 15 : t[i] - 5
          ));
    this.detailFlag ||
      ((this.detailFlag = !0),
      (document.getElementById(this.param.domDetailCon).style.display =
        "none"));
  }),
  (tChartProp.renderLine = function(e, t) {
    var a = this["painter" + t.painter],
      n = this["dataY" + e];
    for (a.newStyle("orange", !0, 1), i = 0; i < n.length; i++)
      0 == i
        ? a.moveTo(
            this.paddingW + this["gapW" + e] / 2 + i * this["gapW" + e],
            n[i]
          )
        : a.lineTo(
            this.paddingW + this["gapW" + e] / 2 + i * this["gapW" + e],
            n[i]
          );
    for (
      a.stroke(),
        a.newStyle("orange", !0, 0.5),
        a.g.fillStyle = "orange",
        a.g.font = "12px bold Arial",
        a.newStyle("orange", !0, 1),
        i = 0;
      i < n.length;
      i++
    )
      a.drawDot(
        this.paddingW + this["gapW" + e] / 2 + i * this["gapW" + e],
        n[i],
        2,
        !0
      ),
        a.fill();
    a.stroke();
  }),
  (tChartProp.renderTemple = function(e, t) {
    var a = this["painter" + t.painter],
      n = this["dataY" + e],
      r = this["dataH" + e];
    for (a.clear(!1, xh5_BrowserUtil.hdpr), i = 0; i < n.length; i++) {
      var o = this["data" + e][i] > 0 ? this.rise : this.fall;
      a.drawVStickRect(
        this.paddingW +
          (this["gapW" + e] - this["rectW" + e]) / 2 +
          i * this["gapW" + e],
        n[i],
        this["rectW" + e],
        r[i],
        o,
        !0
      );
    }
    for (
      a.stroke(),
        a.newStyle("#ddd", !0, 0.5),
        a.moveTo(this.paddingW / 2 + 10, this["zero" + e], this),
        a.lineTo(this.mainW - this.paddingW / 2 - 10, this["zero" + e]),
        a.stroke(),
        a.g.font = "12px Arial",
        a.newStyle("#fff", !0, 2),
        i = 0;
      i < n.length;
      i++
    )
      a.moveTo(
        this.paddingW + i * this["gapW" + e] + this["rectW" + e] / 2,
        n[i] - 1
      ),
        a.lineTo(
          this.paddingW + i * this["gapW" + e] + this["rectW" + e] / 2,
          n[i] - 1
        ),
        (a.g.textAlign = "center"),
        (a.g.fillStyle = "#333"),
        a.g.fillText(
          unit(this["data" + e][i], 0, 2),
          this.paddingW + i * this["gapW" + e] + this["gapW" + e] / 2,
          this["data" + e][i] > 0 ? n[i] - 5 : n[i] + r[i] + 15
        ),
        "Five" == e ||
          a.g.fillText(
            this.param.lab[i],
            this.paddingW + i * this["gapW" + e] + this["gapW" + e] / 2,
            this["data" + e][i] > 0 ? this["zero" + e] + 15 : n[i] - 5
          );
    a.stroke();
  });
function ZjTable(e) {
  (this.param = e),
    (this.zjData = this.param.zj),
    (this.zjDom = document.getElementById(e.domZj)),
    this.zjTemple(this.zjData),
    (this.hasCtm = 1),
    (this.bkDom = document.getElementById(e.domBk)),
    (this.bkListDom = document.getElementById(e.domList)),
    (this.BKUrl =
      "//gu.sina.cn/hq/api/openapi.php/StockV2Service.getPlateDetail?sort=rp_net&asc=0&page=1&num=1000&id=@bk&dpc=1"),
    (this.BKData = null),
    (this.bRise = "money-red"),
    (this.bFall = "money-green"),
    (this.rise = this.bRise),
    (this.fall = this.bFall),
    (this.linkMore = "//gu.sina.cn/m/#/stock/blockdetail?id=@link"),
    (this.linkDom = e.domLink),
    (this.bkUrl =
      "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolSW2?symbol=$symbol&source=apage&dpc=1"),
    (this.Sw = void 0),
    (this.arrow = !0),
    this.addEvent(),
    this.loadBK();
}
var zjTableProp = ZjTable.prototype;
(zjTableProp.loadBK = function() {
  var e = this;
  if (window.bkSw) (e.Sw = window.bkSw[0].type), e.loadBKDetail();
  else {
    var t = Math.floor(1e3 * Math.random()),
      a = this.bkUrl.replace("$symbol", paperCode).replace("$cb", "bkVar" + t);
    loader(a, function() {
      var a = window["bkVar" + t];
      a && ((e.Sw = a[0].type), e.loadBKDetail());
    });
  }
}),
  (zjTableProp.loadBKDetail = function() {
    var e = this,
      t = this.BKUrl.replace("@bk", this.Sw);
    (document.getElementById(this.linkDom).href = this.linkMore.replace(
      "@link",
      this.Sw
    )),
      jsonP({
        varStr: "moneyBK",
        callback: !0,
        url: t,
        success: function(t) {
          t &&
            t.data &&
            ((e.BKData = t.data), e.bkTemple(t.data), e.loadBkList());
        }
      });
  }),
  (zjTableProp.riseColorSetting = function() {
    window.riseColor &&
      "riseGreen" == window.riseColor &&
      ((this.rise = this.bFall), (this.fall = this.bRise));
  }),
  (zjTableProp.addEvent = function() {
    var e = this;
    document
      .getElementById("money_detail")
      .addEventListener("click", function() {
        e.arrow
          ? ((document.getElementById("money_detail_con").style.display =
              "block"),
            (document.getElementById("money_arrow_open").style.display =
              "none"),
            (document.getElementById("money_arrow_close").style.display =
              "block"),
            "undefined" != typeof SUDA && SUDA.log())
          : ((document.getElementById("money_detail_con").style.display =
              "none"),
            (document.getElementById("money_arrow_open").style.display =
              "block"),
            (document.getElementById("money_arrow_close").style.display =
              "none")),
          (e.arrow = !e.arrow);
      });
  }),
  (zjTableProp.bkTemple = function(e) {
    var t = e.plate,
      a = 0;
    (a = t.avgRate > 0 ? "red" : t.avgRate < 0 ? "green" : "equal"),
      (c = this.colorSetting(a));
    var n =
      '<a href="' +
      this.linkMore.replace("@link", this.Sw) +
      '"><div class="tTitle"><span>\u6240\u5c5e\u884c\u4e1a</span><span class="money-blue" style="padding-left:.3rem;">' +
      t.name +
      '</span></div></a><ul><li class="line"><span>\u6da8\u8dcc\u5e45</span><span class="value ' +
      c +
      '">' +
      (100 * Number(t.avgRate)).toFixed(2) +
      '%</span></li><li class="line right"><span>\u4e3b\u529b\u51c0\u6d41\u5165</span><span class="value">' +
      unit(t.totalRp_net, 2) +
      '</span></li></ul><ul><li class="line bottom"><span>\u6da8\u8dcc\u6570</span><span class="value"><span class="clearM ' +
      this.rise +
      '">' +
      t.leadNum +
      '</span>/<span class="clearM ' +
      this.fall +
      '">' +
      t.ledNum +
      '</span></span></li><li class="line bottom right"><span>\u6210\u4ea4\u989d</span><span class="value">' +
      unit(t.totalAmount, 2) +
      "</span></li></ul>";
    this.bkDom.innerHTML = n;
  }),
  (zjTableProp.loadBkList = function() {
    var e = this.BKData.data,
      t = this,
      a = [];
    this.bkListIndex = [];
    var n = 0;
    if (e.length > 4)
      a.push(e[0].symbol),
        a.push(e[1].symbol),
        a.push(e[e.length - 2].symbol),
        a.push(e[e.length - 1].symbol),
        (this.bkListIndex = [1, 2, e.length - 1, e.length]);
    else
      for (n = 0; n < e.length; n++)
        a.push(e[n].symbol), this.bkListIndex.push(n + 1);
    var i = 0,
      r = void 0;
    for (n = 0; n < e.length; n++)
      if (e[n].symbol == paperCode) {
        r = n + 1;
        break;
      }
    for (n = 0; n < a.length; n++) a[n] == paperCode && (i = 1);
    0 == i &&
      (a.splice(2, 0, paperCode), t.bkListIndex.splice(2, 0, r || "--")),
      (a = a.join(",")),
      new HQ.DataCenter({
        symbols: a,
        isANeedCWZJ: !0,
        getObj: function(e) {
          t.bkListTemple(e);
        }
      });
  }),
  (zjTableProp.colorSetting = function(e) {
    var t = 0;
    switch (e) {
      case "red":
        t = this.rise;
        break;
      case "green":
        t = this.fall;
        break;
      case "equal":
        t = "money-back";
    }
    return t;
  }),
  (zjTableProp.bkListTemple = function(e) {
    var t = e,
      a = "",
      n = 0;
    for (var i in t)
      if (t.hasOwnProperty(i)) {
        var r,
          o = t[i],
          s = this.colorSetting(o.type),
          l =
            (1 * o.rxl_in_raw || 0) -
            (1 * o.rxl_out_raw || 0) +
            (1 * o.rl_in_raw || 0) -
            (1 * o.rl_out_raw || 0),
          c = o.code == paperCode ? "money-cur-back" : "",
          d = 0;
        (r = l > 0 ? "red" : l < 0 ? "green" : "equal"),
          (d = this.colorSetting(r)),
          (a +=
            '<ul class="rank-data ' +
            c +
            '"><a href="' +
            "//quotes.sina.cn/hs/company/quotes/view/$symbol".replace(
              "$symbol",
              o.code
            ) +
            '"><li>' +
            this.bkListIndex[n] +
            '</li><li style="line-height: 0;"><p class="name size">' +
            o.name +
            '</p><p class="name code ' +
            s +
            '">' +
            o.price +
            " " +
            o.percent +
            '</p></li><li class="' +
            d +
            '">' +
            unit(l, 0, 2) +
            "</li><li>" +
            unit(o.totalAmount_i, 0, 2) +
            "</li></a></ul>"),
          n++;
      }
    this.bkListDom.innerHTML = a;
  }),
  (zjTableProp.zjTemple = function(e) {
    var t = e,
      a =
        '<ul><li class="line"><span>\u4e3b\u529b\u51c0\u6d41\u5165</span><span class="value">' +
        unit(Number(t.d_a) + Number(t.td_a), 2) +
        '</span></li><li class="line right"><span>\u6210\u4ea4\u989d</span><span class="value">' +
        unit(t.totalAmount, 2) +
        '</span></li></ul><ul><li class="line bottom"><span>\u4e3b\u529b\u51c0\u6d41\u5165\u7387</span><span class="value">' +
        t.zl_r +
        '</span></li><li class="line bottom right"><span>\u6362\u624b\u7387</span><span class="value">' +
        t.turnOver +
        "</span></li></ul>";
    (this.zjDom.innerHTML = a), this.ctmHtml();
  }),
  (zjTableProp.ctmHtml = function() {
    if (this.hasCtm && !(this.hasCtm > 1)) {
      var e = document.querySelector(".money-five");
      if (e) {
        var t = {
            eventid: "wap_hqcenter_callup",
            subname: "moneyflow2app",
            uatrackKey: "hq_center_hs",
            androidInstallUrl:
              "http://file.finance.sina.com.cn/finapp/apks/sinafinance_slhqbanner.apk",
            needOpenSource: !1
          },
          a = new SinaFinanceCallUp.CallUpSinaFinance(t),
          n = document.createElement("div");
        (n.className = "ctm"),
          (n.innerHTML =
            '<p class="text">\u8d22\u7ecf\u5ba2\u6237\u7aef\u8d44\u91d1\u6d41\u5411\u6570\u636e\u66f4\u51c6\u786e\u3001\u66f4\u65b0\u66f4\u53ca\u65f6\u3002<span>\u70b9\u6b64\u67e5\u770b</span>\u3002</p>'),
          e.appendChild(n),
          n.addEventListener("click", function() {
            a.tryDirectCall({
              callpagetype: "2",
              symbol: paperCode,
              position: "moneyflow2app"
            });
          });
      }
      this.hasCtn = 2;
    }
  });
function jsonP(e) {
  var t = e.varStr,
    n = document.getElementsByTagName("head")[0],
    a = document.createElement("script"),
    i = e.success,
    r = e.callback ? "&callback=" + t : "",
    o = e.url;
  (a.src = o + r),
    (a.type = "text/javascript"),
    (a.onload = a.onreadystatechange = function() {
      (this.readyState &&
        "loaded" !== this.readyState &&
        "complete" !== this.readyState) ||
        (r || i(), (a.onload = a.onreadystatechange = null), n.removeChild(a));
    }),
    (a.onerror = function() {
      (a.onload = a.onreadystatechange = a.onerror = null),
        n.removeChild(a),
        (a = null),
        "function" == typeof e.error && e.error();
    }),
    n.appendChild(a),
    r &&
      (window[t] = function(e) {
        i && i(e.result ? e.result : e), delete window[t];
      });
}
function loader(e, t, n, a) {
  var i = !1,
    r = document.createElement("script"),
    o = document.getElementsByTagName("script")[0],
    s =
      document.head ||
      document.getElementsByTagName("head")[0] ||
      document.documentElement,
    l = s.getElementsByTagName("base")[0];
  (r.charset = a || "gb2312"),
    (r.src = e),
    (r.async = !0),
    (r.onload = r.onreadystatechange = function() {
      i ||
        (r.readyState && !/loaded|complete/.test(r.readyState)) ||
        ((i = !0),
        (r.onload = r.onreadystatechange = r.onerror = null),
        r.parentNode.removeChild(r),
        (r = null),
        "function" == typeof t && t());
    }),
    (r.onerror = function() {
      (r.onload = r.onreadystatechange = r.onerror = null),
        r.parentNode.removeChild(r),
        (r = null),
        "function" == typeof n && n();
    }),
    o.parentNode
      ? o.parentNode.insertBefore(r, o)
      : l
      ? s.insertBefore(r, l)
      : s.appendChild(r);
}
!(function(e, t) {
  function n(e) {
    return e.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  function a(e) {
    return i ? i + e : e.toLowerCase();
  }
  var i,
    r,
    o,
    s,
    l,
    c,
    d,
    p,
    h,
    m,
    f = "",
    u = {
      Webkit: "webkit",
      Moz: "",
      O: "o"
    },
    _ = document.createElement("div"),
    v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    g = {};
  _.style.transform === t &&
    e.each(u, function(e, n) {
      if (_.style[e + "TransitionProperty"] !== t)
        return (f = "-" + e.toLowerCase() + "-"), (i = n), !1;
    }),
    (r = f + "transform"),
    (g[(o = f + "transition-property")] = g[
      (s = f + "transition-duration")
    ] = g[(c = f + "transition-delay")] = g[
      (l = f + "transition-timing-function")
    ] = g[(d = f + "animation-name")] = g[(p = f + "animation-duration")] = g[
      (m = f + "animation-delay")
    ] = g[(h = f + "animation-timing-function")] = ""),
    (e.fx = {
      off: i === t && _.style.transitionProperty === t,
      speeds: {
        _default: 400,
        fast: 200,
        slow: 600
      },
      cssPrefix: f,
      transitionEnd: a("TransitionEnd"),
      animationEnd: a("AnimationEnd")
    }),
    (e.fn.animate = function(n, a, i, r, o) {
      return (
        e.isFunction(a) && ((r = a), (i = t), (a = t)),
        e.isFunction(i) && ((r = i), (i = t)),
        e.isPlainObject(a) &&
          ((i = a.easing), (r = a.complete), (o = a.delay), (a = a.duration)),
        a &&
          (a =
            ("number" == typeof a
              ? a
              : e.fx.speeds[a] || e.fx.speeds._default) / 1e3),
        o && (o = parseFloat(o) / 1e3),
        this.anim(n, a, i, r, o)
      );
    }),
    (e.fn.anim = function(a, i, f, u, _) {
      var y,
        b,
        w,
        C = {},
        k = "",
        x = this,
        S = e.fx.transitionEnd,
        T = !1;
      if (
        (i === t && (i = e.fx.speeds._default / 1e3),
        _ === t && (_ = 0),
        e.fx.off && (i = 0),
        "string" == typeof a)
      )
        (C[d] = a),
          (C[p] = i + "s"),
          (C[m] = _ + "s"),
          (C[h] = f || "linear"),
          (S = e.fx.animationEnd);
      else {
        b = [];
        for (y in a)
          v.test(y)
            ? (k += y + "(" + a[y] + ") ")
            : ((C[y] = a[y]), b.push(n(y)));
        k && ((C[r] = k), b.push(r)),
          i > 0 &&
            "object" == typeof a &&
            ((C[o] = b.join(", ")),
            (C[s] = i + "s"),
            (C[c] = _ + "s"),
            (C[l] = f || "linear"));
      }
      return (
        (w = function(t) {
          if (void 0 !== t) {
            if (t.target !== t.currentTarget) return;
            e(t.target).unbind(S, w);
          } else e(this).unbind(S, w);
          (T = !0), e(this).css(g), u && u.call(this);
        }),
        i > 0 &&
          (this.bind(S, w),
          setTimeout(function() {
            T || w.call(x);
          }, 1e3 * (i + _) + 25)),
        this.size() && this.get(0).clientLeft,
        this.css(C),
        i <= 0 &&
          setTimeout(function() {
            x.each(function() {
              w.call(this);
            });
          }, 0),
        this
      );
    }),
    (_ = null);
})(Zepto);
var __isNewsApp = /sinanews/i.test(navigator.userAgent),
  __isKCB = /^sh688\d{3}|sh689\d{3}$/.test(paperCode);
!(function(e) {
  function t() {
    var e = 0,
      t = 0,
      n = 0,
      a = 0,
      i = 0,
      r = 0,
      o = window,
      s = document,
      l = s.documentElement;
    return (
      (e = o.innerWidth || l.clientWidth || s.body.clientWidth || 0),
      (t = o.innerHeight || l.clientHeight || s.body.clientHeight || 0),
      (a = s.body.scrollTop || l.scrollTop || o.pageYOffset),
      (n = s.body.scrollLeft || l.scrollLeft || o.pageXOffset),
      (i = Math.max(s.body.scrollWidth, l.scrollWidth || 0)),
      (r = Math.max(s.body.scrollHeight, l.scrollHeight || 0, t)),
      {
        scrollTop: a,
        scrollLeft: n,
        documentWidth: i,
        documentHeight: r,
        viewWidth: e,
        viewHeight: t
      }
    );
  }
  function n(e, t, n, a, i, r) {
    void 0 === t && (t = "-");
    var o = [];
    if ((a || o.push(e[n ? "getUTCFullYear" : "getFullYear"]()), !i)) {
      var s = e[n ? "getUTCMonth" : "getMonth"]() + 1;
      o.push(s < 10 ? "0" + s : s);
    }
    if (!r) {
      var l = e[n ? "getUTCDate" : "getDate"]();
      o.push(l < 10 ? "0" + l : l);
    }
    return o.join(t);
  }
  function a(e, t) {
    var n = L.cssClass.themeGreen,
      a = L.cssClass.themeRed;
    if ("riseGreen" == L.riseColor) {
      var i = n;
      (n = a), (a = i);
    }
    return e > 0 ? a : e < 0 ? n : t.themeEqual;
  }
  function r(e) {
    (this.prefix_visitAll = "_visit_all"),
      (this.prefix = "_visit_"),
      (this.v_allList = null),
      (this.v_list = null),
      (this.v_all_len = 20),
      (this.v_len = 10),
      (this.code = e.code),
      this.market("cn"),
      this.getVisit();
  }
  function o(e) {
    (this.param = e),
      (this.chart = null),
      (this.delistList = ["kd", "kw", "km", "more"]),
      (this.tabList = ["t1", "t5", "kd", "kw", "km", "more"]),
      this.initChart();
  }
  function s(t) {
    function a() {
      var t = paperCode.toLowerCase().replace(/\$/, "."),
        n = L.newsUrl.replace("$page", l.pageNum).replace("$symbol", t);
      e.ajax({
        type: "GET",
        url: n,
        jsonp: "callback",
        dataType: "jsonp",
        success: function(t) {
          t &&
            ((l.data = t.result.data),
            l.pageNum++,
            o(e("#" + l.param.dom), l.data),
            e("#cn_news_cont")
              .find("a")
              .each(function(t, n) {
                e(n).attr("suda-uatrack", "key=wapnews_cn&value=news" + t);
              }));
        },
        error: function() {
          console.log("api error...");
        }
      });
    }
    function i() {
      var t = "&relate_tid=" + l.relate_tid + "&relate_value=" + l.relate_value,
        n = paperCode.toLowerCase().replace(/\$/, ".");
      loader(
        L.commentUrl.replace("$symbol", n) + L.varComment + "=" + t,
        function() {
          var t,
            a = window[L.varComment];
          if (((l.data = a), l.data)) {
            if (!a.data)
              return (
                e("#cn_comment_refresh").hide(),
                e("#cn_comment_more").hide(),
                (t = L.nothingComment.replace("@code", n)),
                void e("#" + l.param.dom)
                  .find("ul")
                  .append(t)
              );
            if (0 == a.data.threads) {
              if (
                (e("#cn_comment_refresh").hide(),
                e("#cn_comment_more").hide(),
                l.isMore)
              ) {
                var i = L.nothingCommentMore.replace("@code", n);
                return void e("#" + l.param.dom)
                  .find("ul")
                  .append(i);
              }
              return (
                (t = L.nothingComment.replace("@code", n)),
                void e("#" + l.param.dom)
                  .find("ul")
                  .append(t)
              );
            }
            (l.isMore = 1),
              (l.relate_tid = a.data.threads[a.data.threads.length - 1].tid),
              (l.relate_value =
                a.data.threads[a.data.threads.length - 1].timestamp),
              r(e("#" + l.param.dom), l.data);
          }
        }
      );
    }
    function r(t, n) {
      for (
        var a = t.find("ul")[0], i = n.data.threads, r = i.length, o = 0;
        o < r;
        o++
      ) {
        var s = L.guHtml,
          l = i[o],
          c = document.createElement("li"),
          d = l.content.replace("<br />", ""),
          p = l.title
            ? l.title
            : d.length < 30
            ? d
            : d.substring(0, 30) + "...",
          h = (f = l.lastctime.split(" ")),
          m = h[0].substring(5, h[0].length),
          f = h[1].substring(0, 5);
        (s = s
          .replace("@content", p)
          .replace("@src", l.user.portrait)
          .replace("@time", m + " " + f)
          .replace("@nick", l.user.nick)
          .replace(
            "@url",
            "//guba.sina.cn/view_" + l.bid + "_" + l.tid + ".html"
          )),
          (c.innerHTML = s),
          e(a).append(c);
      }
      e("#cn_comment_more").show(), e("#cn_comment_refresh").hide();
    }
    function o(t, a) {
      var i = t.find("ul")[0],
        r = a,
        o = r.length;
      if (0 == o) {
        if ((e("#cn_news_more").hide(), e("#cn_news_refresh").hide(), l.isMore))
          return void e(i).append(L.nothingMore);
        var s = L.nothing;
        return void e(i).append(s);
      }
      l.isMore = 1;
      for (var c = 0; c < o; c++) {
        var d = L.newsHtml,
          p = r[c],
          h = "none",
          m = "",
          f = document.createElement("li"),
          u = n(new Date(1e3 * Number(p.ctime)));
        p.thumbs &&
          p.thumbs.length > 0 &&
          ((h = ""),
          (m = p.thumbs[0].replace("http://", "https://")),
          (d = d
            .replace("@dlhg", "1.6rem")
            .replace("@ddhg", "1.2rem")
            .replace("@h3hg", ".8rem"))),
          (d = d
            .replace("@content", p.waptitle)
            .replace("@source", p.media)
            .replace("@time", u)
            .replace("@src", m)
            .replace("@display", h)
            .replace("@href", p.wapurl)),
          (f.innerHTML = d),
          e(i).append(f);
      }
      e("#cn_news_more").show(), e("#cn_news_refresh").hide();
    }
    function s() {
      switch (l.param.idx.toString()) {
        case "1":
          a();
          break;
        case "2":
          i();
      }
      1 == l.isLoad && "undefined" != typeof SUDA && SUDA.log();
    }
    (this.param = t),
      (this.pageNum = 1),
      (this.isLoad = !1),
      (this.isMore = !1),
      (this.data = null),
      (this.relate_tid = 0),
      (this.relate_value = 0);
    var l = this;
    this.init = function() {
      s(), (this.isLoad = 1);
    };
  }
  function l(e) {
    relateSymbol || (relateSymbol = "sh000001,sz399001,sz399006,gb_$dji,hkHSI"),
      (relateSymbol = relateSymbol.replace(paperCode + ",", "")),
      (relateSymbol = relateSymbol.replace(paperCode, "")),
      (this.param = e),
      (this.inited = !1),
      (this.relateSymbol = relateSymbol),
      (this.visitSymbol = e.visitSymbol);
  }
  function c(e) {
    (this.param = e), this.addEvent(), this.select(0);
  }
  function d(e) {
    (this.param = e),
      (this.tempHtml = void 0),
      (this.tempHHtml = void 0),
      (this.inited = 0);
  }
  function p(e) {
    (this.param = e),
      (this.dom = e.dom),
      (this.transformX = [0, 0]),
      (this.startX = void 0),
      (this.startY = void 0),
      (this.isMove = !1),
      (this.transformTime = 150),
      (this.screeWidth = window.innerWidth),
      (this.init = function() {
        this.onTouchStart(), this.onTouchMove(), this.onTouchEnd();
      }),
      this.init();
  }
  function h(e) {
    (this.param = e),
      (this.url =
        "//quotes.sina.cn/extra/api/openapi.php/RelateStockService/getStocks?symbol=$symbol"),
      (this.rData = null),
      (this.symbols = ""),
      (this.flag = !1),
      (this.data = []),
      this.load(),
      (this.inited = !0),
      (this.hasNews = !1),
      (this.hasExposure = !1);
  }
  function m(e, t) {
    (this.param = e), (this.cb = t), this.load();
  }
  function f(e) {
    (this.param = e),
      (this.data = null),
      (this.hqData = null),
      (this.u = __isKCB ? 1 : 100),
      (this.loaded = 0),
      this.addEvent();
  }
  function u(e, t) {
    var n,
      a = "";
    return (
      e > 1e9
        ? ((n = (e / 1e8).toFixed(0)), (a = "\u4ebf"))
        : e > 1e7
        ? ((n = (e / 1e7).toFixed(0)), (a = "\u5343\u4e07"))
        : e > 1e5
        ? ((n = (e / 1e4).toFixed(0)), (a = "\u4e07"))
        : (n = e >= 1 ? e.toFixed(0) : "-"),
      t ? n + a : n
    );
  }
  function _() {
    this.addEvent(),
      (this.flag = !1),
      (this.fFlag = !1),
      (this.cn_f_con = e("#cn_f_con")),
      (this.cn_f_up = e("#cn_f_up")),
      (this.cn_f_close = e("#cn_f_close")),
      (this.cn_f_open = e("#cn_f_open")),
      (this.cn_news_tab_con = e("#cn_news_tab_con")),
      (this.index = 3);
  }
  function v() {
    function t(e) {
      var t,
        n = document.createElement("div"),
        a =
          "http://m.news.leju.com/stock/" +
          paperCode +
          ".html#source=m_sina_cjgs&source_ext=sina",
        i =
          '<li class="cn-stock-flex"><a suda-uatrack="key=hq_center_hs&value=leju_company" href=' +
          a +
          ">\u516c\u53f8</a></li>";
      (n.innerHTML = i),
        (t = n.childNodes[0]),
        e.appendChild(t),
        (n.innerHTML = '<li class="cn-stock-halfFlex"></li>'),
        (t = n.childNodes[0]),
        e.appendChild(t);
    }
    function n(e) {
      var t,
        n = document.createElement("div");
      (n.innerHTML = '<li class="cn-stock-flex"></li>'),
        (t = n.childNodes[0]),
        e.appendChild(t),
        (n.innerHTML = '<li class="cn-stock-halfFlex"></li>'),
        (t = n.childNodes[0]),
        e.appendChild(t);
    }
    function a() {
      N ||
        (N = new m(
          {
            url: L.bkUrl,
            varStr: L.varBK,
            dom: "cn_bk_hy",
            pDom: "cn_bk_hy_c"
          },
          function(e) {
            window.bkSw = e;
            var a = window.bkSw && window.bkSw[0] && window.bkSw[0].type,
              i = document
                .getElementById("cn_news_tab_con")
                .querySelector(".cn-tab"),
              r = document.getElementById("cn_f_con").querySelector(".cn-tab");
            "sw2_430100" === a || "sw2_430200" === a
              ? (t(i), t(r))
              : (n(i), n(r));
          }
        )),
        M ||
          (M = new m({
            url: L.gnUrl,
            varStr: L.varGN,
            dom: "cn_bk_gn",
            pDom: "cn_bk_bk_c"
          })),
        F ||
          (F = new h({
            dom: document.getElementById("follow"),
            parentNode: document.getElementById("cn_bk_gp_c"),
            tap: "cn-bk-icon-r",
            pop: "cn-pop"
          }));
    }
    function i() {
      E ||
        ((E = new s({
          tab: "news",
          idx: 1,
          dom: $[1]
        })),
        E.init());
    }
    function p() {
      U ||
        ((U = new s({
          idx: 2,
          dom: $[2]
        })),
        U.init());
    }
    function u() {
      B
        ? B.renderChart()
        : (B = new TodayChart(
            {
              dom: document.getElementById("canvasCtn"),
              lab: [
                "\u7279\u5927\u5355",
                "\u5927\u5355",
                "\u4e2d\u5355",
                "\u5c0f\u5355"
              ],
              domDetail: document.getElementById("canvasDetail"),
              labDetail: [
                "\u7279\u5927\u5355",
                "\u5927\u5355",
                "\u4e2d\u5355",
                "\u5c0f\u5355",
                "\u7279\u5927\u5355",
                "\u5927\u5355",
                "\u4e2d\u5355",
                "\u5c0f\u5355"
              ],
              domFive: document.getElementById("canvasFive"),
              domFiveList: document.getElementById("money_five"),
              domDetailCon: "money_detail_con"
            },
            function(e) {
              A ||
                ((A = new ZjTable({
                  domZj: "money_in",
                  zj: e.zj,
                  domBk: "money_bk",
                  domList: "money_list",
                  domLink: "money_link"
                })),
                A.zjTemple(e.zj));
            }
          ));
    }
    function _(t) {
      var n = t || null,
        r = n.id;
      switch (((hashValue = r.split("_")), hashValue[2])) {
        case "comment":
          (I.activeDom = e("#cn_news_tab_con").find("li")[3].innerHTML),
            (I.lastDom = e("#cn_news_up").find("li")[4].innerHTML),
            (I.activeDomf = e("#cn_f_up").find("li")[4].innerHTML),
            (I.lastDomf = e("#cn_f_con").find("li")[3].innerHTML),
            (j = 3);
          break;
        case "notice":
          (I.activeDom = e("#cn_news_tab_con").find("li")[0].innerHTML),
            (I.lastDom = e("#cn_news_up").find("li")[4].innerHTML),
            (I.activeDomf = e("#cn_f_up").find("li")[4].innerHTML),
            (I.lastDomf = e("#cn_f_con").find("li")[0].innerHTML),
            (j = 0);
          break;
        case "report":
          (I.activeDom = e("#cn_news_tab_con").find("li")[1].innerHTML),
            (I.lastDom = e("#cn_news_up").find("li")[4].innerHTML),
            (I.activeDomf = e("#cn_f_up").find("li")[4].innerHTML),
            (I.lastDomf = e("#cn_f_con").find("li")[1].innerHTML),
            (j = 1);
          break;
        default:
          I.lastDom &&
            ((e("#cn_news_tab_con").find("li")[j].innerHTML = I.activeDom),
            (e("#cn_news_up").find("li")[4].innerHTML = I.lastDom),
            (e("#cn_f_con").find("li")[j].innerHTML = I.lastDomf),
            (e("#cn_f_up").find("li")[4].innerHTML = I.activeDomf),
            (I.activeDom = void 0),
            (I.lastDom = void 0),
            (I.activeDomf = void 0),
            (I.lastDomf = void 0),
            (e("#cn_news_tab_con").find("a")[j].className = ""),
            (e("#cn_f_con").find("a")[j].className = ""),
            (j = 10));
      }
      W.addEvent(),
        "data" == hashValue[2] && H(),
        "relate" == hashValue[2] && (z && z.addBlank(), a()),
        "news" == hashValue[2] && i(),
        "money" == hashValue[2] && u(),
        (X = e("#cn_head").offset().height),
        1 == K &&
          ((Z = e("#" + O).offset().top - X + 2), window.scrollTo(0, Z)),
        (I.flag = !0),
        (I.fFlag = !0),
        I.close(j),
        I.fClose(j);
    }
    function v() {
      var e = x.get(V);
      if (e) return e;
    }
    function y() {
      if ("riseGreen" == L.riseColor) {
        var e = L.chartGreen;
        (L.chartGreen = L.chartRed), (L.chartRed = e);
      }
      L.theme = {
        T_RISE: L.chartRed,
        T_FALL: L.chartGreen,
        K_RISE: L.chartRed,
        K_FALL: L.chartGreen
      };
    }
    function b() {
      e("#cn_news_more").on("click tap", function() {
        g({
          pos: "callup_morenews",
          androidurl:
            "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waphangqing.apk"
        });
      }),
        e("#cn_comment_more").on("click tap", function() {
          e("#cn_comment_more").hide(),
            e("#cn_comment_refresh").show(),
            U.init();
        }),
        e("#cn_comment_tw").on("click tap", function() {
          var e = "//guba.sina.cn/list_$symbol.html".replace(
            "$symbol",
            paperCode
          );
          window.open(e, "_self");
        }),
        e(".cn-icon-backtop").on("click tap", function() {
          e("#fix_floating").hide(),
            e("#fix_header").hide(),
            window.scrollTo(0, 0);
        });
    }
    function w() {
      e(window).on("resize", function() {
        q.resizeChart(T), q && q.chart && q.chart.resize();
      });
    }
    function C() {
      var t = Z;
      e(window).scroll(function() {
        var n = e(this).scrollTop();
        (X = e("#cn_head").offset().height),
          0 == Y && (t = Z = e("#" + O).offset().top - X),
          n > 0
            ? n > t
              ? ((K = 1),
                e("#fix_header").hide(),
                e("#fix_floating").show(),
                e("#fix_floating")
                  .find("header")
                  .css("position", ""),
                I.close(j),
                (I.flag = !0))
              : ((K = 0),
                e("#fix_floating").hide(),
                n > J && e("#fix_header").show(),
                (I.fFlag = !0),
                I.fClose(j))
            : (e("#fix_floating").hide(),
              e("#fix_header").hide(),
              (I.fFlag = !0),
              I.fClose(j)),
          k(),
          F &&
            ((Q = e("#cn_bk_hy_c").offset().top),
            (F.flag = !1),
            (document.querySelector("." + F.param.pop).style.display = "none"),
            Q <= n + window.innerHeight &&
              !F.hasExposure &&
              F.hasNews &&
              F.sima());
      });
    }
    function k() {
      0 == K
        ? e(".cn-expert-tw").css("display", "none")
        : e(".cn-expert-tw").css("display", "block");
    }
    function S() {
      new HQ.DataBox({
        isANeedPHP: !1,
        isANeedCWZJ: !1,
        eachOrder: !0,
        boxId: "cn_hqdata",
        symbol: paperCode,
        getStr: function(e) {
          var t = Object.keys(e)[0];
          T &&
            T.pushData({
              symbol: t,
              data: e[t]
            });
        },
        getObj: function(e) {
          e && P.load(e);
        }
      });
    }
    function H() {
      var t = e("#cn_data_blank"),
        n = window.innerHeight;
      t.css("height", 0);
      var a = window.getComputedStyle(
          document.getElementById("cn_data_cont"),
          null
        ).height,
        i = document.getElementById("cn_head").offsetHeight,
        r = document.getElementById("cn_tab").offsetHeight,
        o = e(".cn-footer-links")[0].offsetHeight;
      (a = parseInt(a, 10) || 350) < n && t.css("height", n - a - i - r - o);
    }
    function D() {
      var t = new r({
        code: paperCode
      });
      (z = new l({
        dom: e("#cn_visit_cont"),
        visitObj: t
      })),
        (window.riseColor = L.riseColor = v() ? v() : "riseRed"),
        y(),
        S();
      var n = new d({
          dom: ["cn_floating", "cn_floating_h"],
          priceDom: ["cn-floating-price", "cn_floating_price_h"],
          percentDom: ["cn-floating-zdf", "cn_floating_zdf_h"]
        }),
        i = 0;
      (P = new f({
        dom: {
          position: "cn_position",
          detail: "cn_detail"
        },
        symbol: paperCode,
        cb: function(e) {
          n.load(e),
            0 == i &&
              (z.hqComponent({
                symbol: t.v_allList,
                data: e
              }),
              (i = 1)),
            q || (q = new o(e));
        }
      })),
        a(),
        p(),
        C(),
        b(),
        w();
    }
    var E,
      N,
      M,
      F,
      U,
      q,
      B,
      A,
      P,
      z,
      R = [
        "cn_tab_relate",
        "cn_tab_news",
        "cn_tab_comment",
        "cn_tab_money",
        "cn_tab_finance",
        "cn_tab_f10",
        "cn_tab_notice",
        "cn_tab_report"
      ],
      $ = [
        "cn_relate_cont",
        "cn_news_cont",
        "cn_comment_cont",
        "cn_money_cont",
        "cn_finance_cont",
        "cn_f10_cont",
        "cn_notice_cont",
        "cn_report_cont"
      ],
      G = [
        "cn_tab_relate_f",
        "cn_tab_news_f",
        "cn_tab_comment_f",
        "cn_tab_money_f",
        "cn_tab_finance_f",
        "cn_tab_f10_f",
        "cn_tab_notice_f",
        "cn_tab_report_f"
      ],
      O = "cn-news-c",
      K = 0,
      V = "hq_userColor",
      Z = e("#" + O).offset().top,
      X = e("#cn_head").offset().height;
    W = new c({
      tab: R,
      con: $,
      tabF: G,
      css: {
        active: "active"
      },
      cb: _
    });
    var Y = 0,
      Q = e("#cn_bk_hy_c").offset().top,
      J = document.querySelector(".js-app-header").offsetHeight || 48;
    this.init = D;
  }
  function g(e) {
    var t = {
      eventid: e.key || "hq_center_hs",
      uatrackKey: e.key || "hq_center_hs",
      subname: e.pos,
      needOpenSource: !1,
      androidInstallUrl: e.androidurl
    };
    new SinaFinanceCallUp.CallUpSinaFinance(t).tryDirectCall({
      stocktype: "cn",
      callpagetype: "2",
      position: e.pos,
      symbol: paperCode
    });
  }
  function y() {
    return (
      window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == J
    );
  }
  function b() {
    return new RegExp(ee.join("|")).test(document.referrer);
  }
  function w(e) {
    return e.getAttribute("suda-uatrack").split("=")[2];
  }
  function C(e, t) {
    var n = {
      callpagetype: "17",
      position: "outrefer2app"
    };
    if ("undefined" == typeof SinaFinanceCallUp)
      throw new Error("nil SinaFinanceCallUp");
    var a = new SinaFinanceCallUp.CallUpSinaFinance(te);
    e && (n.url = e), t && (n.symbol = t), a.tryDirectCall(n);
  }
  function k() {
    var t = e(".cn-nav").find("a"),
      n = e(".cn-stock-tab").find("li"),
      a = e("#cn_news_cont");
    t.on("click", function(e) {
      var t = w(this);
      if ("navstock" !== t && "navpoint" !== t) {
        if ((e.preventDefault(), "undefined" == typeof SinaFinanceCallUp))
          throw new Error("nil SinaFinanceCallUp");
        new SinaFinanceCallUp.CallUpSinaFinance(te).tryDirectCall(
          ne[t].callopts
        );
      }
    }),
      n.on("click", "a", function(e) {
        e.preventDefault();
        var t = w(this);
        if ("news" !== t && "relate" !== t) {
          if ("undefined" == typeof SinaFinanceCallUp)
            throw new Error("nil SinaFinanceCallUp");
          new SinaFinanceCallUp.CallUpSinaFinance(te).tryDirectCall(
            ne.tabcall.callopts
          );
        }
      }),
      a.on("click", "a", function(t) {
        t.preventDefault(), C(e(this).attr("href"));
      });
  }
  var x = {
      escape: function(e) {
        return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
      },
      get: function(e) {
        var t = document.cookie.match(
          "(?:^|;)\\s*" + this.escape(e) + "=([^;]*)"
        );
        return t ? t[1] || "" : "";
      },
      set: function(e, t, n) {
        !n && (n = {}), t || ((t = ""), (n.expires = -1));
        var a = "";
        if (n.expires && (Number(n.expires) || n.expires.toUTCString)) {
          var i;
          Number(n.expires)
            ? ((i = new Date()), i.setTime(i.getTime() + 1e3 * n.expires))
            : (i = n.expires),
            (a = "; expires=" + i.toUTCString());
        }
        var r = n.path ? "; path=" + n.path : "",
          o = n.domain ? "; domain=" + n.domain : "",
          s = n.secure ? "; secure" : "";
        document.cookie = [e, "=", t, a, r, o, s].join("");
      }
    },
    S = r.prototype;
  (S.market = function(e) {
    var t = this;
    t.prefix_visit = t.prefix + e;
  }),
    (S.setMCookie = function(e) {
      var t = e.list,
        n = e.len,
        a = e.prefix,
        i = this;
      t
        ? ((t = t.replace(this.code + ",", "")),
          (t = t.replace(this.code, "")),
          (t = i.code + "," + t),
          "," == t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)))
        : (t = i.code);
      var r = t.split(",");
      r.length > n && r.pop(),
        (t = r.toString()),
        x.set(a, t, {
          expires: 71996400,
          domain: ".sina.cn",
          path: "/"
        });
    }),
    (S.setVisit = function() {
      if (!this.code) return !1;
      var e = this;
      e.getVisit(),
        e.setMCookie({
          prefix: e.prefix_visit,
          list: e.v_list,
          len: e.v_len
        }),
        e.setMCookie({
          prefix: e.prefix_visitAll,
          list: e.v_allList,
          len: e.v_all_len
        });
    }),
    (S.getVisit = function() {
      (this.v_list = x.get(this.prefix_visit)),
        (this.v_allList = x.get(this.prefix_visitAll));
    });
  var T = null,
    H = window.isVipRetain
      ? {}
      : {
          callBack: g
        },
    D = o.prototype;
  (D.initChart = function() {
    var t = this,
      dataView =
        "\u9000\u5e02" == t.param.halt ? "kd" : getMyCookie("dataView", "t1");
    "\u9000\u5e02" == t.param.halt ? t.delistList : t.tabList;
    let pTechlist = document.cookie
      .split(";")
      .map(e => e.split("=")[0].trim())
      .filter(name => {
        return (
          name.indexOf("dataView-") == 0 && getMyCookie(name, "false") == "true"
        );
      })
      .map(e => {
        if (e == "dataView-MA") {
          return {
            name: "MA",
            param: [
              {
                v: 5,
                color: "#FC9CB8"
              },
              {
                v: 10,
                color: "#12BDD9"
              },
              {
                v: 20,
                color: "#EE2F72"
              }
            ]
          };
        } else
          return {
            name: e.replace("dataView-", "")
          };
      });
    console.log(pTechlist);
    KKE.api(
      "plugins.sinaAppTKChart.get",
      {
        wrap: {
          dom: e("#h5Chart")[0]
        },
        chart: {
          symbol: paperCode,
          initView: dataView,
          kInitParam: {
            rate: 20,
            theme: L.theme
          },
          kChart: {
            pCharts: pTechlist
          },
          tChart: {
            toggleExtend: "on",
            setLineStyle: {
              linetype: "mountain"
            }
          },
          kInitParam: {
            theme: {},
            dim: {
              H_T_G: 125
            },
            candlenum: 240
          },
          tInitParam: {
            rate: 20,
            theme: L.theme,
            dim: {
              H_T_G: 125
            }
          }
        },
        info: {
          upColor: L.chartRed,
          downColor: L.chartGreen
        },
        bsCallUp: {
          more: [
            {
              name: "\u5e74\u7ebf",
              v: "kcl"
            },
            {
              name: "5\u5206",
              v: "k5"
            },
            {
              name: "15\u5206",
              v: "k15"
            },
            {
              name: "30\u5206",
              v: "k30"
            },
            {
              name: "60\u5206",
              v: "k60"
            }
          ],
          tabs: [
            {
              name: "\u4e94\u65e5",
              v: "t5"
            },
            {
              name: "\u5468K",
              v: "kw"
            },
            {
              name: "\u6708K",
              v: "km"
            }
          ],
          show: !1
        },
        zoomBar: {
          show: !__isNewsApp
        },
        clinicStock: {
          show: !__isNewsApp
        },
        callUpApp: H
      },
      function(e) {
        (T = t.chart = e), t.resizeChart(e);
      }
    );
  }),
    (D.resizeChart = function(n) {
      var a = this,
        i = t(),
        r = e("#hq_chart"),
        o = e("#h5Chart"),
        s = e("#hqMain"),
        l = e(".cn-chart");
      setTimeout(function() {
        a.resize()
          ? (e("#fix_floating").hide(),
            e("#fix_header").hide(),
            window.scrollTo(0, 0),
            s.hide(),
            r
              .show()
              .height(i.viewHeight + "px")
              .append(o),
            n.setDirection("horizontal"),
            SUDA.uaTrack("hq_center_hs", "horizontal"))
          : (s.show(), r.hide(), l.append(o), n.setDirection("vertical"));
      }, 100);
    }),
    (D.resize = function() {
      var e = t(),
        n = e.viewWidth,
        a = e.viewHeight;
      return n > a ? 1 : 0;
    });
  var L = {
      cssClass: {
        riseColor: "red",
        fallColor: "green",
        equalColor: "equal",
        themeRed: "#de3639",
        themeGreen: "#1bc07d",
        themeEqual: "#999",
        themeEqualC: "#333",
        themeBlack: "#999"
      },
      riseColor: "riseRed",
      chartRed: "#f11200",
      chartGreen: "#23bc01",
      theme: {
        T_RISE: void 0,
        T_FALL: void 0,
        K_RISE: void 0,
        K_FALL: void 0
      },
      newsUrl:
        "//cj.sina.cn/api/ct_news/get_news?market=cn&symbol=$symbol&su2cu=1&page=$page&num=10&fr=wap&mi=1",
      commentUrl:
        "//guba.sina.com.cn/api/?s=h5bar&dpc=1&bname=$symbol.cn&jsonpflag=1&callback=var ",
      guBaUrl: "//guba.sina.com.cn/api/?s=h5bar&bname=$symbol.cn&dpc=1",
      bkUrl:
        "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolSW2?symbol=$symbol&source=apage&dpc=1",
      gnUrl:
        "https://money.finance.sina.com.cn/quotes_service/api/jsonp.php/var $cb=/Market_Center.getSymbolCHGN?symbol=$symbol&source=apage&dpc=1",
      detailUrl:
        "//vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=10&symbol=$symbol&dpc=1&" +
        1e3 * Math.random(),
      varBK: "cnBk",
      varGN: "cnGn",
      varNews: "cnNews",
      varData: "cnData",
      varComment: "cnComment",
      info: "cnInfo",
      newsHtml:
        '<a href="@href"><dl style="height:@dlhg;"><dt><img src="@src" alt="@alt" style="display: @display;"></dt><dd style="height:@ddhg"><h3 style="height:@h3hg;">@content</h3><p><span>@source</span><span>@time</span></p></dd></dl></a>',
      positionHtml: function(e) {
        var t = e,
          n = e.color,
          a = Number(t.price)
            ? "<li style=color:" + n + ">" + t.price + "</li>"
            : "<li>--</li>",
          i = Number(t.volume) ? "<li>" + t.volume + "</li>" : "<li>--</li>";
        return (
          '<li><ul class="cn-pos" style="border-top:' +
          t.style +
          '"><li>' +
          t.time +
          "</li>" +
          a +
          i +
          "</ul></li>"
        );
      },
      detailHtml: function(e) {
        var t = e,
          n = e.color,
          a = e.bsColor,
          i = e.type;
        return (
          '<li><ul class="cn-detail"><li>' +
          t.time +
          '</li><li style="color:' +
          n +
          '">' +
          t.price +
          "</li><li>" +
          t.volume +
          '<span style="color:' +
          a +
          '">' +
          i +
          "</span></li></ul></li>"
        );
      },
      bkHtml: function(e, t) {
        var n = e,
          i = n.type,
          r =
            n.percent > 0
              ? "+" + n.percent.toFixed(2) + "%"
              : n.percent.toFixed(2) + "%",
          o = n.lead_cname,
          s =
            n.increase > 0
              ? "+" + n.increase.toFixed(2) + "%"
              : n.increase.toFixed(2) + "%",
          l = a(n.percent, L.cssClass),
          c = a(n.increase, L.cssClass);
        return (
          '<ul class="cn-bk"><li><a href="//gu.sina.cn/m/#/stock/blockdetail?id=' +
          i +
          '"><p>' +
          n.name +
          '</p></a></li><li><a href="//gu.sina.cn/m/#/stock/blockdetail?id=' +
          i +
          '"><p style="color:' +
          l +
          '">' +
          r +
          '</p></a></li><li><a href="//quotes.sina.cn/hs/company/quotes/view/' +
          n.lead_shares +
          '/"><span>' +
          o +
          '</span><span style="color:' +
          c +
          '">' +
          s +
          "</span></a></li></ul>"
        );
      },
      follow: function(e) {
        var t = e,
          n = t.title.length > 20 ? t.title.substring(0, 19) + "..." : t.title;
        return (
          '<li class="cn-panel"><a href="' +
          t.stockUrl +
          '"><div class="name">' +
          t.name +
          '</div><div class="code">' +
          t.code.toUpperCase() +
          '</div><div class="price" style="color:' +
          t.color +
          '">' +
          t.price +
          '</div><div><span class="diff" style="color:' +
          t.color +
          '">' +
          t.change +
          '</span><span class="percent" style="color:' +
          t.color +
          '">' +
          t.percent +
          '</span></div><div></a><span class="title">\u4e8b\u4ef6</span><a href="' +
          t.news_url +
          '"><span class="content">' +
          n +
          "</span></a></div></li>"
        );
      },
      tradeMore:
        '<div class="trade-more"><a class="trade-more-list" style="display: none;" href="//dp.sina.cn/dpool/stock_new/v2/cjmx.php?code=' +
        paperCode +
        '&page=1"><div>\u67e5\u770b\u6210\u4ea4\u660e\u7ec6 ></div></a><a class="trade-more-list" style="display: none;" href="//dp.sina.cn/dpool/stock_new/v2/stock_history.php?code=' +
        paperCode +
        '"><div>\u67e5\u770b\u5386\u53f2\u4ea4\u6613 ></div></a></div>',
      nothing:
        '<div class="cn-nothing"><div></div><span><a style="color: #0090f7;" href="http://finance.sina.cn/roll.d.html?vt=4&pos=102&cid=76524&rollCid=76524">\u6682\u65e0\u4e2a\u80a1\u8d44\u8baf\uff0c\u70b9\u51fb\u67e5\u770b\u6caa\u6df1\u6eda\u52a8\u65b0\u95fb</a></span></div>',
      nothingComment:
        '<div class="cn-nothing"><div></div><span><a style="color: #0090f7;" href="//guba.sina.cn/list_@code.html">\u6682\u65e0\u6570\u636e \u70b9\u51fb\u524d\u5f80\u8bc4\u8bba</a></span></div>',
      nothingMore:
        '<div style="display: inline-block; text-align: center;width: 100%;padding: .3rem 0;background: #f8f8f8;"><a style="color: #0090f7;" href="http://finance.sina.cn/roll.d.html?vt=4&pos=102&cid=76524&rollCid=76524">\u6682\u65e0\u66f4\u591a\u6570\u636e \u70b9\u51fb\u67e5\u770b\u6caa\u6df1\u6eda\u52a8\u65b0\u95fb</a></div>',
      nothingCommentMore:
        '<div style="display: inline-block; text-align: center;width: 100%;padding: .3rem 0;background: #f8f8f8;"><a style="color: #0090f7;" href="//guba.sina.cn/list_@code.html">\u6682\u65e0\u66f4\u591a\u6570\u636e \u70b9\u51fb\u524d\u5f80\u8bc4\u8bba</a></div>',
      relatedHtml:
        '<a href="@href"><ul class="cn-relate"><li><div class="cn-relate-name">@name</div><div class="cn-relate-name gray">@symbol</div></li><li data-attr="@attr">@price</li><li><span data-color="a" class="cn-relate-color" style="background-color:@color">@zdf</span></li></ul></a>',
      guHtml:
        '<a href="@url"><dl><dt><img src="@src"></dt><dd class="cn-comment-user"><span>@nick</span><span>@time</span></dd><dd><div class="cn-comment-content"><span>@content</span></div></dd></dl></a>',
      more:
        '<p class="cn-news-more"><a href="@href">\u67e5\u770b\u66f4\u591a<i class="cn-arrow-more"></i></a></p>'
    },
    E = l.prototype;
  (E.addBlank = function() {
    var t = e("#cn_blank"),
      n = window.innerHeight;
    t.css("height", 0);
    var a = e("#cn_relate_cont"),
      i = e(".cn-footer-links")[0].offsetHeight,
      r = e("#cn_news")[0].offsetHeight,
      o = e("#cn_head")[0].offsetHeight,
      s = window.getComputedStyle(a[0]).height;
    (s = parseInt(s, 10) || 350) < n && t.css("height", n - s - r - o - i);
  }),
    (E.hqComponent = function(e) {
      var t = this,
        n = null;
      if (e) {
        for (var a = e.symbol.split(","), i = 0; i < a.length; i++)
          (n = e.symbol.replace(paperCode, "")),
            paperCode == a[i] && a.splice(i, 1);
        for (i = 0; i < a.length; i++) a[i] && (a[i] = a[i]);
        var r = a.length > 10 ? a.splice(0, 10) : a;
        n = r.join(",");
        var o = e.data;
        if (
          (("--" == o.price &&
            "--" == o.prevclose &&
            "--" == o.name &&
            "--" == o.totalVolume &&
            "--" == o.open) ||
            t.param.visitObj.setVisit(),
          !n)
        )
          return t.param.dom.hide(), !0;
      } else n = t.relateSymbol;
      "" != n &&
        new HQ.DataCenter({
          symbols: n,
          QZindex: !1,
          isANeedQZ: !1,
          isANeedPHP: !1,
          isANeedCWZJ: !1,
          getObj: function(e) {
            for (var a = n.split(","), i = [], r = 0; r < a.length; r++)
              i.push(e[a[r]]);
            t.inited ? t.relatedDataUpdate(i) : t.relatedRender(i);
          }
        });
    }),
    (E.relatedRender = function(t) {
      var n = this;
      n.inited || (n.inited = !0);
      for (
        var a = n.param.dom.find("li")[0], i = "", r = 0;
        r < t.length;
        r++
      ) {
        var o,
          s = L.relatedHtml,
          l = t[r],
          c = l.name,
          d = L.cssClass.themeGreen,
          p = L.cssClass.themeRed;
        switch (l.type) {
          case "green":
            o = d;
            break;
          case "red":
            o = p;
            break;
          case "equal":
            o = L.cssClass.themeEqual;
        }
        (s = s
          .replace("@price", l.price)
          .replace("@zdf", l.percent)
          .replace("@href", l.url)
          .replace("@symbol", String(l.code).toUpperCase())
          .replace("@name", c)
          .replace("@color", o)
          .replace("@attr", String(l.code).toUpperCase())),
          (i += s);
      }
      e(a).append(i), n.addBlank();
    }),
    (E.relatedDataUpdate = function(t) {
      function n(e, t) {
        if (e.getAttribute("data-attr"))
          for (var n = 0; n < t.length; n++) {
            var a = t[n];
            if (a.code.toUpperCase() == e.getAttribute("data-attr")) {
              (e.innerHTML = a.price),
                (e.nextElementSibling.childNodes[0].innerHTML = a.percent),
                (e.nextElementSibling.childNodes[0].className = "cn-relate-color cn-relate-@color".replace(
                  "@color",
                  a.type
                ));
              var i = "";
              (i =
                "red" == a.type
                  ? L.cssClass.themeRed
                  : "green" == a.type
                  ? L.cssClass.themeGreen
                  : L.cssClass.themeEqual),
                (e.nextElementSibling.childNodes[0].style.backgroundColor = i);
            }
          }
      }
      for (
        var a = e("#cn_relate_cont").find("li"),
          i = a.length,
          r = e("#cn_visit_cont").find("li"),
          o = r.length,
          s = 0;
        s < i;
        s++
      ) {
        var l = a[s];
        n(l, t);
      }
      for (s = 0; s < o; s++) (l = r[s]), n(l, t);
    });
  var N = c.prototype;
  (N.setCss = function(t, n) {
    var a = this,
      i = a.param.tab.length;
    if ((a.hide(), "undefined" != typeof SUDA))
      if (
        "cn_tab_finance" == t.target.id ||
        "cn_tab_finance_f" == t.target.id
      ) {
        var r = "quotes.sina.cn/hs/company/quotes/view/" + paperCode + "/index";
        SUDA.log(r, "", "URL:http://" + r);
      } else SUDA.log();
    for (var o = 0; o < i; o++) {
      var s = o;
      if (t.target.id == n[o]) {
        e("#" + a.param.con[s]).show(),
          (e("#" + a.param.tab[s])[0].className = a.param.css.active),
          (e("#" + a.param.tabF[s])[0].className = a.param.css.active),
          a.param.cb(t.target);
        break;
      }
    }
  }),
    (N.addF10 = function() {
      var t = this;
      e("#cn_tab_f10_f").off("click tap"),
        e("#cn_tab_f10").off("click tap"),
        e("#cn_tab_f10_f").on("click tap", function(n) {
          t.setCss(n, t.param.tabF),
            (e("#cn_f_up").find("li")[4].innerHTML = n.target.outerHTML);
        }),
        e("#cn_tab_f10").on("click tap", function(n) {
          t.setCss(n, t.param.tab),
            (e("#cn_news_up").find("li")[4].innerHTML = n.target.outerHTML);
        });
    }),
    (N.addEvent = function() {
      for (var t = this, n = t.param.tab.length, a = 0; a < n; a++)
        e("#" + t.param.tab[a]).off("click tap"),
          e("#" + t.param.tabF[a]).off("click tap"),
          e("#" + t.param.tab[a]).on("click tap", function(e) {
            t.setCss(e, t.param.tab);
          }),
          e("#" + t.param.tabF[a]).on("click tap", function(e) {
            t.setCss(e, t.param.tabF);
          });
    }),
    (N.select = function(t) {
      this.hide(),
        (e("#" + this.param.tabF[t])[0].className = this.param.css.active),
        (e("#" + this.param.tab[t])[0].className = this.param.css.active),
        e("#" + this.param.con[t]).show();
    }),
    (N.hide = function() {
      for (var t = this, n = t.param.tab.length, a = 0; a < n; a++)
        e("#" + t.param.con[a]).hide(),
          (e("#" + t.param.tab[a])[0].className = ""),
          (e("#" + t.param.tabF[a])[0].className = "");
    });
  var M = d.prototype;
  (M.load = function(e) {
    this.render(e);
  }),
    (M.title = function(e) {
      var t = e.code;
      document.title =
        e.name +
        " " +
        t.toUpperCase() +
        " " +
        e.price +
        "(" +
        e.change +
        " " +
        e.percent +
        ")- \u65b0\u6d6a\u8d22\u7ecf";
    }),
    (M.render = function(e) {
      var t = this,
        n = document.getElementById("cn_floating"),
        a = document.getElementById(t.param.dom[1]);
      0 == t.inited &&
        ((t.tempHtml = n.innerHTML),
        (t.tempHHtml = a.innerHTML),
        (t.inited = 1));
      var i,
        r = t.tempHtml,
        o = t.tempHHtml,
        s = e,
        l = L.cssClass.themeGreen,
        c = L.cssClass.themeRed;
      switch (s.type) {
        case "green":
          i = l;
          break;
        case "red":
          i = c;
          break;
        case "equal":
          i = L.cssClass.themeEqualC;
      }
      (r = r
        .replace("@name", s.sname)
        .replace("@price", s.price)
        .replace("@zdf", s.percent)),
        (o = o
          .replace("@name", s.sname)
          .replace("@price", s.price)
          .replace("@zdf", s.percent)),
        (a.innerHTML = o),
        (n.innerHTML = r);
      for (var d = 0; d < 2; d++)
        (document.getElementById(t.param.priceDom[d]).style.color = i),
          (document.getElementById(t.param.percentDom[d]).style.color = i);
      t.title(e);
    });
  var F = p.prototype;
  (F.transformDom = function(e, t) {
    (e.style.transform = "translate(" + t + "px,0)"),
      (e.style.webkitTransform = "translate(" + t + "px,0)");
  }),
    (F.animationDom = function(e) {
      var t = e.time || this.transformTime;
      (e.dom.style.transition = "-webkit-transform " + t + "ms ease-out"),
        (e.dom.style.transition = "transform " + t + "ms ease-out"),
        (e.dom.style.webkitTransform = "translate(" + e.offsetX + "px,0)"),
        (e.dom.style.transform = "translate(" + e.offsetX + "px,0)");
    }),
    (F.deleteTfm = function(e) {
      e.style.transition = "";
    }),
    (F.onTouchStart = function() {
      for (var e = this, t = 0; t < e.dom.length; t++)
        e.dom[t].on("touchstart", function(t) {
          e.deleteTfm(this);
          var n = t.touches[0];
          (e.startX = n.clientX), (e.startY = n.clientY), (e.isMove = !1);
        });
    }),
    (F.onTouchMove = function() {
      for (var e = this, t = 0; t < e.dom.length; t++)
        e.dom[t].on("touchmove", function(t) {
          var n = t.touches[0],
            a = n.clientX - e.startX,
            i = this.getAttribute("data-attr");
          (e.deltaY = Math.abs(n.clientY - e.startY)),
            !e.deltaY > 0 && t.preventDefault(),
            e.transformDom(e.param.dom[0][0], e.transformX[1 * i] + a),
            e.transformDom(e.param.dom[1][0], e.transformX[1 * i] + a),
            (e.isMove = !0);
        });
    }),
    (F.onTouchEnd = function() {
      for (var e = this, t = 0; t < e.dom.length; t++)
        e.dom[t].on("touchend", function() {
          if (e.isMove) {
            var t = this.style.transform.replace(/[^0-9.\-,]/g, "").split(",");
            t[0] > 0
              ? (e.animationDom({
                  dom: e.param.dom[0][0],
                  offsetX: 0
                }),
                e.animationDom({
                  dom: e.param.dom[1][0],
                  offsetX: 0
                }),
                (e.transformX[0] = e.transformX[1] = 0))
              : t[0] < e.screeWidth - this.offsetWidth
              ? (e.animationDom({
                  dom: e.param.dom[0][0],
                  offsetX: e.screeWidth - this.offsetWidth
                }),
                e.animationDom({
                  dom: e.param.dom[1][0],
                  offsetX: e.screeWidth - this.offsetWidth
                }),
                (e.transformX[0] = e.transformX[1] =
                  e.screeWidth - this.offsetWidth))
              : (e.transformX[0] = e.transformX[1] = 1 * t[0]);
          }
        });
    });
  var U = h.prototype;
  (U.load = function() {
    var e = this;
    e.addEvent(),
      jsonP({
        url: e.url.replace("$symbol", paperCode),
        varStr: "follow",
        callback: "jsonp",
        success: function(t) {
          (e.rData = t.data), e.clearedUp();
        }
      });
  }),
    (U.market = function(e) {
      var t = "";
      switch (e.market) {
        case "sz":
        case "sh":
        case "hk":
          t = e.market + e.code;
          break;
        case "us":
          t = "gb_" + e.code.toLowerCase();
      }
      return t;
    }),
    (U.sima = function() {
      var e = this;
      e.inited &&
        e.hasNews &&
        !e.hasExposure &&
        (void 0 !== window.SIMA &&
          window.SIMA({
            action: "_exposure",
            data: {
              aid: "hq_center_hs",
              url: window.location.href
            }
          }),
        (e.inited = !1),
        (e.hasExposure = !0));
    }),
    (U.clearedUp = function() {
      var e = this.rData,
        t = this;
      if (t.param.parentNode) {
        if (!e || e.length <= 0)
          return void (t.param.parentNode.style.display = "none");
        var n = [],
          a = e.length > 5 ? 5 : e.length;
        if (a < 2) return void (t.param.parentNode.style.display = "none");
        (t.hasNews = !0), (t.param.parentNode.style.display = "block");
        for (var i = 0; i < a; i++) {
          var r = e[i],
            o = {
              name: r.r_name,
              symbol: this.market({
                code: r.r_code,
                market: r.r_market
              }),
              code: r.r_code,
              title: r.news_title,
              news_url: r.news_url,
              stockUrl: r.url
            };
          n.push(o.symbol), this.data.push(o);
        }
        (this.symbols = n.join(",")),
          new HQ.DataCenter({
            symbols: this.symbols,
            getObj: function(e) {
              t.merge(e);
            }
          });
      }
    }),
    (U.addEvent = function() {
      var e = document.querySelector("." + this.param.tap),
        t = document.querySelector("." + this.param.pop),
        n = this,
        a = 0,
        i = 0;
      window.addEventListener("click", function() {
        (a = new Date().getTime() - i),
          (i = 0),
          a > 10 && ((n.flag = !1), (t.style.display = "none"));
      }),
        e.addEventListener("click", function() {
          (t.style.display = n.flag ? "none" : "block"),
            (t.style.top = e.offsetTop - t.offsetHeight + "px"),
            (n.flag = !n.flag),
            (i = new Date().getTime());
        });
    }),
    (U.merge = function(e) {
      var t = this;
      for (var n in e)
        for (var a = 0; a < t.data.length; a++)
          if (n === t.data[a].symbol) {
            (t.data[a].price = e[n].price),
              (t.data[a].percent = e[n].percent),
              (t.data[a].change = e[n].change);
            var i = L.cssClass.themeGreen,
              r = L.cssClass.themeRed,
              o = null;
            switch (e[n].type) {
              case "green":
                o = i;
                break;
              case "red":
                o = r;
                break;
              case "equal":
                o = L.cssClass.themeEqualC;
            }
            t.data[a].color = o;
            break;
          }
      t.render();
    }),
    (U.render = function() {
      for (var e = this, t = e.data.length, n = "", a = 0; a < t; a++) {
        var i = e.data[a];
        n += L.follow(i);
      }
      (e.param.dom.parentNode.style.width = 4.3 * t + 0.3 + "rem"),
        (e.param.dom.innerHTML = n);
    });
  var q = m.prototype;
  (q.load = function() {
    var t = this,
      n = Math.floor(1e3 * Math.random());
    loader(
      t.param.url
        .replace("$symbol", paperCode)
        .replace("$cb", this.param.varStr + n),
      function() {
        var a = window[t.param.varStr + n],
          i = a;
        i
          ? (i.length <= 0 ? e("#" + t.param.pDom).hide() : t.render(i),
            "cn_bk_hy" == t.param.dom && t.cb && t.cb(i))
          : e("#" + t.param.pDom).hide();
      },
      function() {
        e("#" + t.param.pDom).hide(), console.log("error...");
      }
    );
  }),
    (q.render = function(e) {
      for (
        var t = e,
          n = t.length,
          a = this,
          i = document.getElementById(a.param.dom),
          r = 0;
        r < n;
        r++
      ) {
        var o = document.createElement("li");
        (o.innerHTML = L.bkHtml(t[r], a.param)), i.appendChild(o);
      }
    });
  var B = f.prototype;
  (B.addEvent = function() {
    e("#cn_position_close").on("click", function() {
      (this.style.display = "none"),
        e("#cn_position_open").show(),
        e("#cn_position_cont").show(),
        "undefined" != typeof SUDA && SUDA.log();
    }),
      e("#cn_position_open").on("click", function() {
        (this.style.display = "none"),
          e("#cn_position_close").show(),
          e("#cn_position_cont").hide();
      });
  }),
    (B.defaultOpen = function() {
      e("#cn_position_open").show(),
        e("#cn_position_close").hide(),
        e("#cn_position_cont").show();
    }),
    (B.load = function(e) {
      var t = this;
      e[t.param.symbol] &&
        ((t.hqData = e[t.param.symbol]),
        (t.data = t.hqData.tradeItems),
        t.param.cb(t.hqData),
        0 == t.loaded ? t.render() : t.updateRender());
    }),
    (B.updateRender = function() {
      var e = this,
        t = e.hqData,
        n = document.getElementById(e.param.dom.position),
        r = document.getElementById(e.param.dom.detail),
        o = t.buyPriceArr,
        s = t.buyNumArr,
        l = o.length,
        c = t.sellPriceArr,
        d = c.length,
        p = t.sellNumArr,
        h = function(e) {
          var n,
            i = "--",
            r = Number(e.price) ? e.price : i,
            o = Number(e.volume) ? u(Number(e.volume), !0) : i;
          return (
            r !== i && (n = a(e.price - t.prevclose, L.cssClass)),
            {
              price: r,
              volume: o,
              color: n
            }
          );
        };
      for (i = 0; i < d; i++) {
        var m = h({
          price: c[i],
          volume: (p[i] / e.u).toFixed(0)
        });
        (n.childNodes[4 - i].childNodes[0].childNodes[1].innerHTML = m.price),
          (n.childNodes[4 - i].childNodes[0].childNodes[2].innerHTML =
            m.volume),
          (n.childNodes[4 - i].childNodes[0].childNodes[1].style.color =
            m.color);
      }
      for (i = 0; i < l; i++) {
        var f = h({
          price: o[i],
          volume: (s[i] / e.u).toFixed(0)
        });
        (n.childNodes[i + 5].childNodes[0].childNodes[1].innerHTML = f.price),
          (n.childNodes[i + 5].childNodes[0].childNodes[2].innerHTML =
            f.volume),
          (n.childNodes[i + 5].childNodes[0].childNodes[1].style.color =
            f.color);
      }
      var _ = e.hqData.tradeItems,
        v = _.length >= 10 ? 10 : _.length;
      for (i = 0; i < v; i++) {
        (r.childNodes[i].childNodes[0].childNodes[0].innerHTML = _[i]
          ? String(_[i][0]).substring(0, 5)
          : ""),
          (r.childNodes[i].childNodes[0].childNodes[1].innerHTML = _[i]
            ? Number(_[i][2]).toFixed(2)
            : ""),
          (r.childNodes[i].childNodes[0].childNodes[2].innerHTML = _[i]
            ? ((1 * _[i][1]) / e.u).toFixed(0)
            : "");
        var g = document.createElement("span"),
          y = L.cssClass.themeGreen,
          b = L.cssClass.themeRed;
        if ("riseGreen" == L.riseColor) {
          var w = y;
          (y = b), (b = w);
        }
        (g.innerHTML = _[i] ? ("UP" == _[i][3] ? "\u4e70" : "\u5356") : ""),
          (g.style.color = _[i] ? ("UP" == _[i][3] ? b : y) : ""),
          r.childNodes[i].childNodes[0].childNodes[2].appendChild(g),
          (r.childNodes[i].childNodes[0].childNodes[1].style.color = a(
            Number(_[i][2] - t.prevclose),
            L.cssClass
          ));
      }
    }),
    (B.render = function() {
      if (true) return;
      var e = this,
        t = e.hqData,
        n = document.getElementById(e.param.dom.position),
        i = document.getElementById(e.param.dom.detail);
      (n.innerHTML = ""), (i.innerHTML = "");
      var r = 0,
        o = {},
        s = t.buyPriceArr,
        l = t.buyNumArr,
        c = s.length,
        d = t.sellPriceArr,
        p = t.sellNumArr;
      for (r = c - 1; r >= 0; r--)
        (o.time = "\u5356" + (r + 1)),
          (o.price = d[r]),
          (o.volume = (p[r] / e.u).toFixed(0)),
          (o.type = ""),
          (o.color = a(d[r] - t.prevclose, L.cssClass)),
          (n.innerHTML += L.positionHtml(o));
      for (r = 0; r < c; r++)
        (o.time = "\u4e70" + (r + 1)),
          (o.price = s[r]),
          (o.volume = (l[r] / e.u).toFixed(0)),
          (o.type = ""),
          (o.color = a(s[r] - t.prevclose, L.cssClass)),
          (o.style = 0 == r ? "1px solid #ddd" : ""),
          (n.innerHTML += L.positionHtml(o));
      var h = e.data,
        m = h.length >= 10 ? 10 : h.length;
      for (r = 0; r < m; r++)
        (o.time = h[r] ? String(h[r][0]).substring(0, 5) : ""),
          (o.price = h[r] ? Number(h[r][2]).toFixed(2) : ""),
          (o.volume = h[r] ? ((1 * h[r][1]) / e.u).toFixed(0) : ""),
          (o.type = h[r] ? ("UP" == h[r][3] ? "\u4e70" : "\u5356") : ""),
          (o.bsColor = h[r]
            ? "UP" == h[r][3]
              ? L.cssClass.themeRed
              : L.cssClass.themeGreen
            : ""),
          (o.color = a(Number(h[r][2] - t.prevclose), L.cssClass)),
          (i.innerHTML += L.detailHtml(o));
      (document.getElementById("cn_position_cont").innerHTML += L.tradeMore),
        (e.loaded = 1);
    });
  var A = _.prototype;
  (A.addEvent = function() {
    var t = this;
    e("#cn_news_tab").on("click tap", function() {
      t.flag ? (t.open(), t.fOpen()) : (t.close(), t.fClose()),
        (t.flag = !t.flag),
        W && W.addF10();
    }),
      e("#cn_tab_f").on("click tap", function() {
        t.fFlag ? t.fOpen() : t.fClose(), (t.fFlag = !t.fFlag), W && W.addF10();
      });
  }),
    (A.fOpen = function(e) {
      this.cn_f_con.show(),
        this.cn_f_close.hide(),
        this.cn_f_open.show(),
        (this.index = void 0 !== e ? e : this.index),
        this.lastDomf &&
          ((this.cn_f_con.find("li")[this.index].innerHTML = this.lastDomf),
          (this.cn_f_up.find("li")[4].innerHTML = this.activeDomf));
    }),
    (A.fClose = function(e) {
      this.cn_f_con.hide(),
        this.cn_f_close.show(),
        this.cn_f_open.hide(),
        (this.index = void 0 !== e ? e : this.index),
        this.lastDomf &&
          ((this.cn_f_con.find("li")[this.index].innerHTML = this.activeDomf),
          (this.cn_f_up.find("li")[4].innerHTML = this.lastDomf));
    }),
    (A.open = function(t) {
      this.cn_news_tab_con.show(),
        e("#cn_news_tab_close").hide(),
        e("#cn_news_tab_open").show(),
        (this.index = void 0 !== t ? t : this.index),
        this.lastDom &&
          ((this.cn_news_tab_con.find("li")[
            this.index
          ].innerHTML = this.activeDom),
          (e("#cn_news_up").find("li")[4].innerHTML = this.lastDom));
    }),
    (A.close = function(t) {
      this.cn_news_tab_con.hide(),
        e("#cn_news_tab_close").show(),
        e("#cn_news_tab_open").hide(),
        (this.index = void 0 !== t ? t : this.index),
        this.lastDom &&
          ((this.cn_news_tab_con.find("li")[
            this.index
          ].innerHTML = this.lastDom),
          (e("#cn_news_up").find("li")[4].innerHTML = this.activeDom));
    });
  var I = new _();
  I.open();
  var j = 70,
    P = {
      eventid: "wap_hqcenter_callup",
      subname: "hq_top",
      uatrackKey: "wap_hqcenter_callup",
      androidInstallUrl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_slhqbanner.apk",
      needOpenSource: !1
    },
    z = new SinaFinanceCallUp.CallUpSinaFinance(P);
  e(".app-open").on("click", function() {
    z.tryDirectCall({
      callpagetype: "2",
      symbol: paperCode,
      position: "hq_top"
    });
  });
  var W;
  new v().init();
  var R = {
    topBanner: {
      pos: "top_banner",
      androidurl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_slhqbanner.apk"
    },
    bottomBanner: {
      pos: "bottom_banner",
      androidurl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waprecommend.apk"
    },
    xeiut: {
      pos: "callup_consult",
      androidurl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waphangqing.apk"
    }
  };
  e("#tbanner, #cnBottomBanner").on("click", function() {
    g(R[e(this).data("position")]);
  });
  var $ = {
      eventid: "hq_center_hs",
      uatrackKey: "hq_center_hs",
      subname: "callup_consult",
      needOpenSource: !1,
      androidInstallUrl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waphangqing.apk"
    },
    G = new SinaFinanceCallUp.CallUpSinaFinance($),
    O = e("#cn_position_section")[0];
  O && O.insertAdjacentHTML("afterend", '<div class="xeiut" id="tuiex"></div>'),
    e("#tuiex").on("click", function() {
      G.tryDirectCall({
        callpagetype: "37",
        position: "callup_consult"
      });
    });
  var K = function() {
    var t = e("#hqboxCallBox")[0];
    t &&
      t.addEventListener(
        "click",
        function() {
          g({
            pos: "callup_remind",
            androidurl:
              "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waphangqing.apk"
          });
        },
        !1
      );
  };
  setTimeout(K, 1e3);
  var V = {
      eventid: "hq_center_hs",
      uatrackKey: "hq_center_hs",
      subname: "callup_announce",
      needOpenSource: !1,
      androidInstallUrl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waphangqing.apk"
    },
    Z = new SinaFinanceCallUp.CallUpSinaFinance(V),
    X = e("#cn_report_cont"),
    Y = e("#cn_notice_cont"),
    Q = function(t) {
      var n = e(this),
        a = n.attr("class"),
        i = n.find("a").attr("href"),
        r = "report-table" === a ? "report" : "announce",
        o = "report" === r ? "7" : "5",
        s = "report" === r ? /reportid=(\d){1,7}/g : /id=(\d){1,7}/g,
        l = i.match(s)[0].split("=")[1];
      try {
        Z.tryDirectCall({
          stocktype: "cn",
          callpagetype: o,
          cid: l,
          symbol: paperCode,
          position: "callup_announce"
        }),
          t.preventDefault();
      } catch (e) {}
    };
  X.on("click", ".report-table", Q), Y.on("click", ".summary-table", Q);
  var J = "micromessenger",
    ee = [
      "google.com",
      "bing.com",
      "baidu.com",
      "sogou.com",
      "so.com",
      "easou.com"
    ],
    te = {
      eventid: "hq_center_hs",
      uatrackKey: "hq_center_hs",
      subname: "outrefer2app",
      needOpenSource: !1,
      androidInstallUrl:
        "http://file.finance.sina.com.cn/finapp/apks/sinafinance_sousuo.apk"
    },
    ne = {
      navmystock: {
        callopts: {
          callpagetype: "10",
          position: "outrefer2app"
        }
      },
      navmarket: {
        callopts: {
          subtype: "0",
          callpagetype: "23",
          position: "outrefer2app"
        }
      },
      tabcall: {
        callopts: {
          stocktype: "cn",
          callpagetype: "2",
          position: "outrefer2app",
          symbol: paperCode
        }
      }
    },
    ae = y(),
    ie = b();
  (window.__ISSE__ = ie ? 1 : 0), (ae || ie) && k();
})(Zepto),
  (function(e) {
    "use strict";
    function t(t) {
      return this.each(function() {
        var a = e(this),
          i = a.data("InfiniteScroll"),
          r = e.extend({}, n.DEFAULT, "object" == typeof t && t);
        i || (a.data("infiniteScroll", "mounted"), (i = new n(a, r))),
          r.interval && i.infinite();
      });
    }
    if (__isNewsApp)
      return (
        (document.getElementById("cn_head").style.display = "none"),
        (document.querySelector(".cn-footer").style.display = "none"),
        document.querySelector(".cn-nav").remove(),
        document.getElementById("tuiex").remove(),
        void (document.getElementById("da-calendar").style.display = "none")
      );
    var n = function(t, n) {
      (this.$elem = t),
        (this.options = n),
        (this.interval = null),
        (this.rendered = !1),
        (this.relate = this.$elem.data("relate")),
        e(this.relate).on("click", e.proxy(this.caller, this));
    };
    (n.DEFAULT = {
      interval: 8e3,
      service:
        "//quotes.sina.cn/extra/api/openapi.php/CalendarService.getLatestIndex?size=5"
    }),
      (n.prototype = {
        constructor: n,
        remoteData: function() {
          var t = this;
          e.ajax({
            type: "GET",
            url: this.options.service,
            dataType: "jsonp",
            success: function(e) {
              t.render(e);
            },
            error: e.proxy(t.error, t)
          });
        },
        render: function(e) {
          var t = "",
            e = e.result.data;
          e.forEach(function(e, n) {
            (t += '<div class="calendar-scroll-item" data-order="@order"><p class="item-title">@country-\u516c\u5e03@title\u524d\u503c@previous\u9884\u6d4b\u503c@median\u516c\u5e03\u503c@ifr_actual</p><div class="clearfix item-msg"><span class="msg-datetime">@datetime </span><span class="msg-mark"><span style="vertical-align: middle">\u91cd\u8981\u6027:</span>@mark</span></div></div>'
              .replace("@order", n)
              .replace("@title", e.event)
              .replace("@datetime", e.date + " " + e.time)
              .replace("@country", e.country)
              .replace(
                "\u524d\u503c@previous",
                e.previous ? ": \u524d\u503c" + e.previous : ""
              )
              .replace(
                "\u9884\u6d4b\u503c@median",
                e.median ? ": \u9884\u6d4b\u503c" + e.median : ""
              )
              .replace(
                "\u516c\u5e03\u503c@ifr_actual",
                e.ifr_actual ? ": \u516c\u5e03\u503c" + e.ifr_actual : ""
              )),
              "M" === e.importance &&
                (t = t.replace(
                  "@mark",
                  '<i class="s1"></i><i class="s1"></i><i class="s0"></i><i class="s0"></i>'
                )),
              "L" === e.importance &&
                (t = t.replace(
                  "@mark",
                  '<i class="s1"></i><i class="s0"></i><i class="s0"></i><i class="s0"></i>'
                )),
              "H" === e.importance &&
                (t = t.replace(
                  "@mark",
                  '<i class="s1"></i><i class="s1"></i><i class="s1"></i><i class="s0"></i>'
                ));
          }),
            this.$elem.html(t);
        },
        error: function(e) {},
        caller: function() {
          var e = {
            eventid: "hq_center_hs",
            uatrackKey: "hq_center_hs",
            subname: "callup_calendar",
            needOpenSource: !1,
            androidInstallUrl:
              "http://file.finance.sina.com.cn/finapp/apks/sinafinance_waphangqing.apk"
          };
          new SinaFinanceCallUp.CallUpSinaFinance(e).tryDirectCall({
            callpagetype: "36",
            position: "callup_calendar"
          });
        },
        next: function() {
          var e = this.$elem;
          e.animate(
            {
              marginTop: "-50px"
            },
            function() {
              e.css("margin-top", 0)
                .children("div")
                .first()
                .appendTo(e);
            }
          );
        },
        infinite: function() {
          !this.rendered && this.remoteData(),
            (this.rendered = !0),
            this.interval && clearInterval(this.interval),
            (this.interval = setInterval(
              e.proxy(this.next, this),
              this.options.interval
            ));
        }
      }),
      (e.fn.InfiniteScroll = t),
      (e.fn.InfiniteScroll.Constructor = n),
      e('[data-role="InfiniteScroll"]').each(function() {
        var n = e(this);
        t.call(n, {});
      });
  })(Zepto);

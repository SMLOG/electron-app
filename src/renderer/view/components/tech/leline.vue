<template>
  <div>
    <div>
      {{ item.name }}五线谱趋势
      <span class="green">-2SD:{{ $fmtNumber(sdd2) }}</span>
      <span class="green">-1SD:{{ $fmtNumber(sdd1) }}</span>
      <span
        >当前TL:<b
          :class="{ green: item.close < priceTL, red: item.close > priceTL }"
          >{{ $fmtNumber(priceTL) }}</b
        ></span
      >
      <span class="red">1SD:{{ $fmtNumber(sdu1) }}</span>

      <span class="red">2SD:{{ $fmtNumber(sdu2) }}</span>
    </div>

    <div class="notation-container">
      <div
        id="notationChart"
        class="fancybox-loading"
        :data-name="item.name"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import $ from "jquery";

import Highcharts from "highcharts/highstock";

!$.debounce &&
  ($.debounce = function (t, e) {
    var n;
    return function () {
      var i = this,
        r = arguments;
      clearTimeout(n),
        (n = setTimeout(function () {
          t.apply(i, r);
        }, e));
    };
  });
export default {
  data: function () {
    return {
      sdd2: 0,
      sdd1: 0,
      priceTL: 0,
      sdu1: 0,
      sdu2: 0,
    };
  },
  components: {},
  mounted() {
    this.draw();
  },
  props: {
    item: Object,
    name: String,
  },
  methods: {
    draw() {
      var _this = this,
        a,
        n = $("#notationChart"),
        reDrawChart = function (t, e) {
          Highcharts.setOptions({
            lang: {
              rangeSelectorZoom: "",
              rangeSelectorFrom: "从",
              rangeSelectorTo: "到",
              months: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
              ],
              noData: "没有数据",
            },
            global: {
              timezoneOffset: -480,
            },
            colors: [
              "#999999",
              "#FCCC79",
              "#CCCCCC",
              "#8FD17F",
              "#3D9CFF",
              "#f15c80",
              "#FF9655",
              "#FFF263",
              "#6AF9C4",
            ],
          });

          $("#notationChart").removeClass("fancybox-loading");
          var i = 0;
          3.5 === e && (i = 0),
            5 === e && (i = 1),
            7 === e && (i = 2),
            10 === e && (i = 3),
            20 === e && (i = 4),
            Highcharts.stockChart(n[0], {
              rangeSelector: {
                buttons: [
                  {
                    type: 3.5 === e ? "all" : "year",
                    count: 3.5,
                    text: "3.5年",
                  },
                  {
                    type: 5 === e ? "all" : "year",
                    count: 5 === e ? 5 : 2,
                    text: "5年",
                  },
                  {
                    type: 7 === e ? "all" : "year",
                    count: 7 === e ? 7 : 2.25,
                    text: "7年",
                  },
                  {
                    type: 10 === e ? "all" : "year",
                    count: 10 === e ? 10 : 2.5,
                    text: "10年",
                  },
                  {
                    type: 20 === e ? "all" : "year",
                    count: 20 === e ? 20 : 3,
                    text: "All",
                  },
                ],
                selected: i,
                inputDateFormat: "%Y-%m-%d",
                inputEditDateFormat: "%Y-%m-%d",
                allButtonsEnabled: !0,
              },
              yAxis: {
                labels: {
                  align: "right",
                  x: -3,
                },
                plotLines: [
                  {
                    value: 0,
                    width: 2,
                    color: "silver",
                  },
                ],
              },
              xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                  day: "%Y-%m",
                  week: "%Y-%m",
                  month: "%Y-%m",
                  year: "%Y-%m",
                },
                events: {
                  setExtremes: setExtremes,
                  afterSetExtremes: afterSetExtremes,
                },
                minRange: 864e5,
              },
              tooltip: {
                pointFormat:
                  '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/> ',
                valueDecimals: 2,
              },
              series: t,
            });
        };
      let setExtremes = function (e) {
        "navigator" === e.trigger && (_this.showHideLoadding(), a());
      };

      a = $.debounce(function () {
        var t = $(
            '#notationChart input.highcharts-range-selector[name="min"]'
          ).val(),
          e = $(
            '#notationChart input.highcharts-range-selector[name="max"]'
          ).val();
        loadSelectYear({
          from: t,
          to: e,
        });
      }, 1e3);
      var afterSetExtremes = function (e) {
        if (e.rangeSelectorButton) {
          _this.showHideLoadding();
          var n = e.rangeSelectorButton.count;
          return 3.5 === n
            ? loadSelectYear(3.5)
            : 2 === n
            ? loadSelectYear(5)
            : 2.25 === n
            ? loadSelectYear(7)
            : 2.5 === n
            ? loadSelectYear(10)
            : 3 === n
            ? loadSelectYear(20)
            : void _this.showHideLoadding(true);
        }
      };
      var loadSelectYear = function (t) {
        if ("number" == typeof t)
          var n = t,
            o = (a = Math.round(new Date().getTime() / 1e3)) - 31536e3 * n;
        else {
          var a = Date.parse(t.to) / 1e3;
          o = Date.parse(t.from) / 1e3;
        }
        var i =
          (_this.item.code.indexOf("sz") > -1 ? "SZSE" : "SHSE") +
          ":" +
          _this.item.code.replace(/[a-z]/gi, "");
        var url =
            "/proxy/https://caibaoshuo.com/stock_charts/history?symbol=" +
            i +
            "&resolution=M&from=" +
            o +
            "&to=" +
            a +
            "&type=split_adjusted",
          onDatas = function (t) {
            if ("no_data" === t.s)
              return $("#notationChart").removeClass("fancybox-loading"), !1;
            var e = [[], [], [], [], [], [], []];
            t.c.map(function (n, i) {
              var r = 1e3 * t.t[i];
              e[0].push([r, t.tr[i]]),
                e[1].push([r, t.tr_plus_1_std[i]]),
                e[2].push([r, t.tr_plus_2_std[i]]),
                e[3].push([r, t.tr_minus_1_std[i]]),
                e[4].push([r, t.tr_minus_2_std[i]]),
                e[5].push([r, n]);
            });
            var names = ["TL", "+1SD", "+2SD", "-1SD", "-2SD", "股价"];
            _this.priceTL = t.tr[t.tr.length - 1];
            _this.sdd2 = t.tr_minus_2_std[t.tr.length - 1];
            _this.sdd1 = t.tr_minus_1_std[t.tr.length - 1];
            _this.sdu1 = t.tr_plus_1_std[t.tr.length - 1];
            _this.sdu2 = t.tr_plus_2_std[t.tr.length - 1];
            var arr = [];
            names.map(function (t, n) {
              arr.push({
                name: t,
                data: e[n],
              });
            });
            reDrawChart(arr, n);
          };
        return $.get(url, onDatas);
      };

      loadSelectYear(3.5);
    },
    showHideLoadding(hide = false) {
      if (hide) {
        Highcharts.charts.map(function (t) {
          t && t.showLoading("正在请求数据......");
        });
      } else {
        setTimeout(function () {
          Highcharts.charts.map(function (t) {
            t && t.hideLoading();
          });
        }, 2e3);
      }
    },
  },
  computed: {},
  watch: {
    item(n, o) {
      this.draw();
    },
  },
};
</script>


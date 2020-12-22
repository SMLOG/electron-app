<template>
  <div ref="chart" class="echart" style="width: 100%; height: 400px"></div>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  props: {
    item: Object,
    name: String,
  },
  data() {
    return {};
  },

  methods: {
    initData(option, arr) {
      option.series[0].data[0].value = [];
      option.series[0].data[1].value = [];
      var pname = ["ROEWEIGHTED", "ZCFZL", "JCSXJECYS", "TOAZZL", "JLRTBZCL"];
      try {
        pname.forEach(function (a, i) {
          option.series[0].data[0].value[i] = arr[0][pname[i]]
            ? arr[0][pname[i]]
            : 0;
          option.series[0].data[1].value[i] = arr[1][pname[i]]
            ? arr[1][pname[i]]
            : 0;
          option.radar.indicator[i].name =
            option.radar.indicator[i].name + "\n";
          option.radar.indicator[i].name +=
            3 == i
              ? null !== arr[0][pname[i]]
                ? arr[0][pname[i]]
                : "-"
              : null !== arr[0][pname[i]]
              ? arr[0][pname[i]] + "%"
              : "-";

          option.radar.indicator[i].name +=
            "," + 3 == i
              ? null !== arr[1][pname[i]]
                ? arr[1][pname[i]]
                : "-"
              : null !== arr[1][pname[i]]
              ? arr[1][pname[i]] + "%"
              : "-";
        });
        option.legend.data = arr.map(function (e, a) {
          return (option.series[0].data[a].name = e.X_AXIS), e.X_AXIS;
        });
        Object.values(arr[0]).includes(null) && option.series[0].data.shift();
      } catch (o) {}
    },
    drawChart() {
      let chart = this.$echarts.init(this.$refs.chart);
      let option = {
        legend: {
          data: ["2019年三季报", "2020年三季报"],
          textStyle: { fontSize: 12 },
          selectedMode: false,
        },
        silent: false,
        radar: {
          shape: "circle",
          center: ["45%", "62%"],
          radius: "57%",
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#aaa",
              borderRadius: 3,
              padding: [3, 5],
              fontSize: 13,
            },
          },
          splitNumber: 5,
          splitArea: {
            areaStyle: {
              color: [
                "rgba(114, 172, 209, 0)",
                "rgba(114, 172, 209, 0.1)",
                "rgba(114, 172, 209, 0.2)",
                "rgba(114, 172, 209, 0.3)",
                "rgba(114, 172, 209, 0.4)",
              ],
              shadowColor: "rgba(0, 0, 0, 0.3)",
              shadowBlur: 10,
              opacity: "0.2",
            },
          },
          splitArea2: { areaStyle: { color: "#fff", opacity: "0.2" } },
          splitLine: { lineStyle: { type: "dotted" } },
          nameGap: 12,
          indicator: [
            {
              name: "盈利能力:\n加权净资产收益率",
            },
            {
              name: "偿债能力:\n资产负债率",
            },
            {
              name: "现金获取能力:\n销售现金比率",
            },
            {
              name: "营运能力:\n总资产周转率",
            },
            {
              name: "成长能力:\n净利润同比增长率",
            },
          ],
          triggerEvent: !0,
        },
        series: [
          {
            type: "radar",
            symbolSize: 6,
            data: [
              {
                value: [8.36, 46.98, 18.24, 0.48, 8.84],
                name: "2019年三季报",
                label: { show: false, distance: 0, color: "#000" },
                areaStyle: { color: "#EA4740", opacity: "0.5" },
                lineStyle: { color: "#EA4740", opacity: "0" },
                itemStyle: { color: "rgba(234, 71, 64, 0.5)" },
              },
              {
                value: [9.44, 51.51, 27.15, 0.41, 19.13],
                name: "2020年三季报",
                areaStyle: { color: "#E8821D", opacity: "0.5" },
                lineStyle: { color: "#E8821D", opacity: "0" },
                itemStyle: { color: "rgba(232, 130, 29, 0.5)" },
              },
            ],
            animationDuration: 1500,
            animationDelay: 500,
          },
        ],
      };
      this.$http
        .get(
          `/proxy/https://bdstatics.eastmoney.com/web/prd/reportData/2020Q3/${this.item.code.replace(
            /(sh)|(sz)/gi,
            ""
          )}.json`
        )
        .then((resp) => {
          this.initData(
            option,
            resp.data.FR_FINRATIO,
            resp.data.SECURITY_FULLNAME
          );
          console.log(option);
          chart.setOption(option);
        });
    },
  },

  mounted() {
    this.drawChart();
  },
  computed: {},
  watch: {
    item(n, o) {
      this.drawChart();
    },
  },
};
</script>



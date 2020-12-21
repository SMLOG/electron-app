<template>
  <div ref="chart" class="echart" style="width: 300px; height: 300px"></div>
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
          center: ["45%", "62%"],
          radius: "57%",
          name: {
            padding: [4, 0, 4, 0],
            textStyle: { color: "#000", fontSize: 10 },
          },
          splitArea: { areaStyle: { color: "#fff", opacity: "0.2" } },
          splitLine: { lineStyle: { type: "dotted" } },
          nameGap: 12,
          indicator: [
            { name: "盈利能力:\n加权净资产收益率\n9.44%", color: "#e55303" },
            { name: "偿债能力:\n资产负债率\n51.51%" },
            { name: "现金获取能力:\n销售现金比率\n27.15%" },
            { name: "营运能力:\n总资产周转率\n0.41" },
            { name: "成长能力:\n净利润同比增长率\n19.13%" },
          ],
          triggerEvent: true,
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
      chart.setOption(option);
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



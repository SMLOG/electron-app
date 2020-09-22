<template>
  <div class="section first">
    <div class="name" id="zyzb">
      <samp class="icon"></samp>
      <strong>主要指标-{{item.name}}</strong>
    </div>
    <div id="zyzb_chart" v-if="selectZb" class="content" style="text-align:center; ">
      <div class="pic tips-border" style="height: 247px;">
        <v-chart id="zyzbChart" :options="chartOptions" style="width:960px;height:247px;" />
      </div>
      <div class="tips-explain">注：点击表格内的指标名称可切换图片查看该指标的历史趋势</div>
    </div>
    <div class="tab" style="margin-top: 10px;">
      <ul id="zyzbTab">
        <li :class="{current:tabIndex==0}" data-type="0" @click="tabIndex=0">按报告期</li>
        <li :class="{current:tabIndex==1}" @click="tabIndex=1">按年度</li>
        <li :class="{current:tabIndex==2}" @click="tabIndex=2">按单季度</li>
      </ul>
    </div>
    <div id="F10MainTargetDiv">
      <div id="report_zyzb" class="content" style="text-align:center; margin-top:0px;">
        <table>
          <tbody>
            <template v-for="(value,name) in zbMapList">
              <tr :key="name">
                <th class="tips-colname-Left">
                  <span>{{name}}</span>
                </th>
                <th
                  v-for="(value,i) in zyzb"
                  :key="i"
                  class="tips-fieldname-Right"
                  :data-value="value.date"
                >
                  <span>{{value.date.substr(2,8)}}</span>
                </th>
              </tr>

              <tr
                v-for="zb in zbMapList[name]"
                :key="zb[0]"
                :class="{ChooseBlue:selectZb==zb}"
                @click="selectZb=zb"
              >
                <td class="tips-fieldname-Left">
                  <span>{{zb[0]}}</span>
                </td>

                <td v-for="(value,i) in zyzb" :key="i" class="tips-data-Right">
                  <span class="a">{{value[zb[1]]}}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { zbMapList } from "./zb";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";

export default {
  name: "Main",
  components: {
    "v-chart": ECharts,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      tabIndex: 0,
      zbMapList: zbMapList,
      zyzb: [],
      selectZb: null,
      chartOptions: {
        color: ["#a11110"],
        title: {
          text: "title",
          left: "center",
          top: "top",
        },

        tooltip: {
          formatter: "{b}：{c}",
        },
        grid: {
          x: 100,
          y: 40,
          x2: 40,
          y2: 40,
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: [
          {
            type: "value",
            name: "数量",
            show: true,
          },
          {
            type: "value",
            name: "增长",

            show: true,

            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "20",
            data: [],
          },
          {
            yAxisIndex: 1,
            type: "line",
            data: [],
          },
        ],
      },
    };
  },

  methods: {
    loadZyzb() {
      //主要指标数据加载

      var url =
        "/proxy?url=http%3A%2F%2Ff10.eastmoney.com/NewFinanceAnalysis%2FMainTargetAjax";
      var data = { type: this.tabIndex, code: this.item.code };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((result) => {
          this.zyzb = result;
        });
    },
  },

  mounted() {
    this.loadZyzb();
  },
  watch: {
    tabIndex(n, o) {
      this.loadZyzb();
    },
    selectZb(n, o) {
      let data = this.zyzb.map((e) => e[n[1]]);
      this.chartOptions.title.text = n[0];
      this.chartOptions.xAxis.data = this.zyzb
        .map((e) => e.date.substr(2, 8))
        .reverse();
      if (data[0].indexOf("亿")) {
        data = data.map((e) => e.replace(/[^\d.-]/g, ""));
        this.chartOptions.title.text = n[0].replace("元", "亿元");
      }
      this.chartOptions.series[0].data = data.reverse();
    },
    item(n, o) {
      this.loadZyzb();
    },
  },
};
</script>

<style scoped src="./web.css" />

<template>
  <div>
    <div class="section first" style="padding-bottom: 5px">
      <div class="name" id="fhyx">
        <samp class="icon"> </samp>
        <strong>分红影响</strong>
      </div>
      <div class="content">
        <div v-if="fhyx && fhyx.length > 0">
          <div class="pic" style="width: 100%; height: 257px">
            <v-chart
              id="fhyxChart"
              :options="option"
              style="width: 960px; height: 247px"
            ></v-chart>
          </div>
          <table id="BonusDetailsTable">
            <tbody>
              <tr class="">
                <th class="tips-colnameL">公告日期</th>
                <th class="tips-colnameL">分红方案</th>
                <th class="tips-colnameL">股权登记日</th>
                <th class="tips-colnameL">除权除息日</th>
                <th class="tips-colnameL">派息日</th>
                <th class="tips-colnameL">方案进度</th>
                <th class="tips-colnameL">分红影响</th>
              </tr>
              <tr
                v-for="(value, i) in fhyx"
                :key="i"
                :class="{ current: i == selectIndex }"
                @click="selectIndex = i"
              >
                <td class="bonusTime tips-dataL">{{ value.ggrq }}</td>
                <td class="tips-dataL">{{ value.fhfa }}</td>
                <td class="registrationDay tips-dataL">{{ value.gqdjr }}</td>
                <td class="exdividendDay tips-dataL">{{ value.cqcxr }}</td>
                <td class="dividendDay tips-dataL">{{ value.pxr }}</td>
                <td class="projectSchedule tips-dataL">{{ value.fajd }}</td>
                <td
                  v-if="value.cqcxr != '--'"
                  :data-date="value.cqcxr"
                  style="padding: 0; cursor: pointer"
                >
                  <div class="fdj"></div>
                </td>
                <td
                  v-else-if="value.pxr != '--'"
                  :data-date="value.pxr"
                  style="padding: 0; cursor: pointer"
                >
                  <div class="fdj"></div>
                </td>
                <td
                  v-else-if="value.gqdjr != '--'"
                  :data-date="value.gqdjr"
                  style="padding: 0; cursor: pointer"
                >
                  <div class="fdj"></div>
                </td>
                <td
                  v-else
                  :data-date="value.ggrq"
                  style="padding: 0; cursor: pointer"
                >
                  <div class="fdj"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 v-else style="text-align: center; font-size: 14px; padding: 10px 0">
          该股暂无分红影响
        </h1>
      </div>
    </div>
    <div class="section">
      <div class="name" id="lnfhrz">
        <samp class="icon"> </samp>
        <strong>历年分红融资</strong>
      </div>
      <div class="content">
        <table v-if="lnfhrz && lnfhrz.length > 0">
          <tbody>
            <tr>
              <th class="tips-colnameL">时间</th>
              <th class="tips-colnameL">分红总额(万元)</th>
              <th class="tips-colnameL">增发(万股)</th>
              <th class="tips-colnameL">配股(万股)</th>
              <th class="tips-colnameL">新股发行(万股)</th>
            </tr>
            <tr v-for="(value, i) in lnfhrz" :key="i">
              <td class="tips-dataL">{{ value.sj }}</td>
              <td class="tips-dataL">{{ value.fhze }}</td>
              <td class="tips-dataL">{{ value.zf }}</td>
              <td class="tips-dataL">{{ value.pg }}</td>
              <td class="tips-dataL">{{ value.xgfx }}</td>
            </tr>
          </tbody>
        </table>
        <h1 v-else style="text-align: center; font-size: 14px; padding: 10px 0">
          近六年该公司没有分红
        </h1>
      </div>
    </div>
    <div class="section">
      <div class="name" id="zfmx">
        <samp class="icon"> </samp>
        <strong>增发明细</strong>
      </div>
      <div class="content">
        <table v-if="zfmx && zfmx.length > 0">
          <tbody>
            <tr>
              <th class="tips-colnameL">增发时间</th>
              <th class="tips-colnameL">实际增发数量(万股)</th>
              <th class="tips-colnameL">实际募集净额(万元)</th>
              <th class="tips-colnameL">增发价格(元/股)</th>
              <th class="tips-colnameL" width="200">发行方式</th>
              <th class="tips-colnameL">股权登记日</th>
              <th class="tips-colnameL">增发上市日</th>
              <th class="tips-colnameL">资金到账日</th>
            </tr>
            <tr v-for="(value, i) in zfmx" :key="i">
              <td class="tips-dataL">{{ value.zfsj }}</td>
              <td class="tips-dataL">{{ value.sjzfsl }}</td>
              <td class="tips-dataL">{{ value.sjmjje }}</td>
              <td class="tips-dataL">{{ value.zfjg }}</td>
              <td class="tips-dataL">{{ value.fxfs }}</td>
              <td class="tips-dataL">{{ value.gqdjr }}</td>
              <td class="tips-dataL">{{ value.zfssr }}</td>
              <td class="tips-dataL">{{ value.zjdzr }}</td>
            </tr>
          </tbody>
        </table>
        <h1 v-else style="text-align: center; font-size: 14px; padding: 10px 0">
          该股暂无增发明细
        </h1>
      </div>
    </div>
    <div class="section">
      <div class="name" id="pgmx">
        <samp class="icon"> </samp>
        <strong>配股明细</strong>
      </div>
      <div class="content">
        <table v-if="pgmx && pgmx.length > 0">
          <tr>
            <th class="tips-colnameL">配股公告日</th>
            <th class="tips-colnameL">配股价格(元)</th>
            <th class="tips-colnameL">实际配股数量(万元)</th>
            <th class="tips-colnameL">实际募资总额(万元)</th>
            <th class="tips-colnameL">股权登记日</th>
            <th class="tips-colnameL">除权基准日</th>
            <th class="tips-colnameL">配股方案</th>
          </tr>
          <tr v-for="(value, i) in pgmx" :key="i">
            <td class="tips-dataL">{{ value.pgggr }}</td>
            <td class="tips-dataL">{{ value.pgjg }}</td>
            <td class="tips-dataL">{{ value.sjpgsl }}</td>
            <td class="tips-dataL">{{ value.sjmjze }}</td>
            <td class="tips-dataL">{{ value.gqdjr }}</td>
            <td class="tips-dataL">{{ value.cqjzr }}</td>
            <td class="tips-dataL">每10股配{{ value.pgfa }}股</td>
          </tr>
        </table>
        <h1 v-else style="text-align: center; font-size: 14px; padding: 10px 0">
          该股暂无配股明细
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
export default {
  components: { "v-chart": ECharts },
  props: {
    item: Object,
  },
  data() {
    return {
      fhyx: null,
      lnfhrz: null,
      zfmx: null,
      pgmx: null,
      selectIndex: null,
      option: {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var str = "";
            for (var i = 0; i < params.length; i++) {
              str +=
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
                params[i].color +
                ";'></span>" +
                params[i].data[0] +
                "：" +
                params[i].data[1] +
                "元<br/>";
            }
            return str;
          },
        },
        grid: {
          show: true,
          x: 60,
          y: 30,
          x2: 60,
          y2: 30,
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          axisLabel: {
            formatter: function (value, index) {
              return value + "元";
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: {
          type: "line",
          showSymbol: false,
          itemStyle: {
            normal: {
              color: "red",
            },
          },
          markLine: {
            symbol: "none",
            lineStyle: {
              normal: {
                type: "solid",
                color: "gray",
              },
            },
            data: [
              {
                xAxis: null,
              },
            ],
          },
          data: null,
        },
      },
    };
  },

  methods: {
    fhyxChart() {
      let url = "/p/BonusFinancing/BonusDetailChartAjax";

      let data = {
        code: this.item.code,
        date: this.fhyx[this.selectIndex].ggrq,
      };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((json) => {
          if (json) {
            this.option.series.data = json;
            this.option.series.markLine.xAxis = this.fhyx[
              this.selectIndex
            ].date;
          }
        });
    },

    loadData() {
      var url =
        "/data/notices/getdata.ashx?StockCode=600690&CodeType=A&PageIndex={page}&PageSize={pageSize}&jsObj={jsname}{param}";
      var data = { code: this.item.code, times: 1 };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((json) => {
          if (json) {
            Object.assign(this, json);
            if (json.fhyx && json.fhyx.length > 0) this.selectIndex = 0;
          }
        });
    },
  },

  mounted() {
    this.loadData();
  },
  watch: {
    item(n, o) {
      this.loadData();
    },
    selectIndex() {
      this.fhyxChart();
    },
  },
};
</script>

<style scoped src="./web.css" />

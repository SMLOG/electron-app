<template>
  <div class="section">
    <div class="name" id="zcfzb">
      <samp class="icon"></samp>
      <strong>{{ name }}</strong>
    </div>
    <div class="content" style="text-align: center">
      <input type="hidden" id="zcfzb_pageIndex" value="1" />
      <i
        class="prev"
        id="zcfzb_prev"
        style="display: inline"
        v-if="showPrev"
        @click="prev()"
      ></i>
      <i
        class="next"
        id="zcfzb_next"
        style="display: inline"
        v-if="showNext"
        @click="next()"
      ></i>
      <div class="tab tips-fontsize">
        <ul id="zcfzb_ul">
          <li
            :class="{
              current: 0 == reportDateType && 1 == reportType && 0 == tb,
            }"
            @click="(reportDateType = 0), (reportType = 1), (tb = 0)"
          >
            <span>按报告期</span>
          </li>
          <li
            :class="{
              current: 1 == reportDateType && 1 == reportType && 0 == tb,
            }"
            @click="(reportDateType = 1), (reportType = 1), (tb = 0)"
          >
            <span>按年度</span>
          </li>
          <li
            :class="{
              current: 0 == reportDateType && 2 == reportType && 0 == tb,
            }"
            @click="(reportDateType = 0), (reportType = 2), (tb = 0)"
          >
            <span>按单季度</span>
          </li>
          <li
            :class="{
              current: 0 == reportDateType && 1 == reportType && 1 == tb,
            }"
            @click="(reportDateType = 0), (reportType = 1), (tb = 1)"
          >
            <span>报告期同比</span>
          </li>
          <li
            :class="{
              current: 1 == reportDateType && 1 == reportType && 1 == tb,
            }"
            @click="(reportDateType = 1), (reportType = 1), (tb = 1)"
          >
            <span>年度同比</span>
          </li>
          <li
            :class="{
              current: 0 == reportDateType && 2 == reportType && 1 == tb,
            }"
            @click="(reportDateType = 0), (reportType = 2), (tb = 1)"
          >
            <span>单季度同比</span>
          </li>
        </ul>
      </div>
      <table id="report_zcfzb" style="table-layout: fixed">
        <tbody v-if="datalist && datalist.length < 1">
          <tr>
            <td>暂无数据</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <th class="tips-colname-Left" style="width: 366px">
              <span>{{ name }}</span>
            </th>
            <th v-for="(value, i) in datalist" :key="i">
              <span>{{ formatDate(value.REPORTDATE) }}</span>
            </th>
          </tr>
          <template v-for="(items, name) in tableItems">
            <tr :key="name">
              <td class="tips-fieldname-Left" style="font-weight: bold">
                <span>{{ name }}</span>
              </td>
              <td
                v-for="(value, i) in datalist"
                :key="i"
                class="tips-data-Right"
              ></td>
            </tr>
            <tr v-for="(item, i) in noEmptyItems(items)" :key="item[1] + i">
              <td class="tips-fieldname-Left">
                <span v-html="item[0]"></span>
              </td>
              <td
                v-for="(value, i) in datalist"
                :key="item[1] + i"
                class="tips-data-Right"
              >
                <span v-if="tb == 0">{{
                  formatNumber(value[item[1]], 2)
                }}</span>
                <span v-if="tb == 1">{{
                  formatRate(value[item[1] + "_YOY"])
                }}</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ReportsItems, ReportsMap } from "./zb";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
function getFormatPoint(value) {
  value = Math.abs(value);
  var point = 2;
  if (value >= 1000) point = 0;
  else if (value >= 100) point = 1;
  else if (value >= 10) point = 2;
  else point = 3;

  return point;
}
export default {
  name: "ReportTable",
  components: {},
  props: {
    item: Object,
    name: String,
  },
  data() {
    return {
      tableItems: ReportsItems[this.name],
      datalist: [],
      companyType: 4,
      reportDateType: 0,
      reportType: 1,
      tb: 0,
      dateList: [],
      endDate: "",
    };
  },

  methods: {
    loadData() {
      this.getReportData(
        this.reportDateType,
        this.reportType,
        ReportsMap[this.name]
      );
    },
    noEmptyItems(items) {
      return items.filter((item) =>
        this.datalist.some((e) => e[item[1]] != "")
      );
    },
    formatRate(value) {
      var temp = Number(value);
      if (!temp) return "--";

      return temp.toFixed(2) + "%";
    },
    formatNumber(value, point) {
      var temp = Number(value);
      if (!temp) return "--";

      if (Math.abs(temp) >= 1e12) {
        var resupt = temp / 1e12;
        point = getFormatPoint(resupt);
        return resupt.toFixed(point) + "万亿";
      } else if (Math.abs(temp) >= 1e8) {
        var resupt = temp / 1e8;
        point = getFormatPoint(resupt);
        return resupt.toFixed(point) + "亿";
      } else if (Math.abs(temp) >= 1e4) {
        var resupt = temp / 1e4;
        point = getFormatPoint(resupt);
        return resupt.toFixed(point) + "万";
      }
      return temp.toFixed(point);
    },
    formatDate(value) {
      if (value.indexOf("/") > 0) {
        var ss = "";
        ss.substr;
        var temp = value.split("/");
        return (
          temp[0] +
          "-" +
          (temp[1] > 9 ? temp[1] : "0" + temp[1]) +
          "-" +
          temp[2].split(" ")[0]
        );
      } else if (value.indexOf("-") > 0) {
        var ss = "";
        ss.substr;
        var temp = value.split("-");
        return (
          temp[0] +
          "-" +
          (temp[1] > 9 ? temp[1] : "0" + temp[1]) +
          "-" +
          temp[2].split(" ")[0]
        );
      } else return "--";
    },
    // 报表数据加载
    async getReportData(reportDateType, reportType, reportTab) {
      let url =
        "/proxy/http://f10.eastmoney.com/NewFinanceAnalysis/" +
        reportTab +
        "DateAjax";
      let data = {
        reportDateType:
          reportDateType == 0 && reportType == 2 ? 2 : reportDateType,
        code: this.item.code,
      };
      this.dateList = await axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((result) => result.data);

      url =
        "/proxy/http://f10.eastmoney.com/NewFinanceAnalysis/" +
        reportTab +
        "Ajax";

      data = {
        companyType: this.companyType,
        reportDateType: reportDateType,
        reportType: reportType,
        endDate: this.endDate,
        code: this.item.code,
      };

      let result = await axios
        .get(url, { params: data })
        .then((resp) => resp.data);

      this.datalist.length = 0;

      this.datalist.splice(0, 0, ...(JSON.parse(result) || []));
    },
    next() {
      let curEndDate =
        (this.datalist &&
          this.datalist.length > 0 &&
          this.formatDate(this.datalist.slice(-1)[0].REPORTDATE)) ||
        "";
      let index = this.dateList.indexOf(curEndDate);
      if (index > -1 && index < this.dateList.length - 1) {
        this.endDate = curEndDate;
      }
    },
    prev() {
      let index = this.dateList.indexOf(this.endDate);
      if (index > -1 && index <= this.dateList.length - 1 && index - 6 > 0) {
        this.endDate = this.dateList[index - 6];
      } else this.endDate = "";
    },
  },

  mounted() {
    this.loadData();
  },
  computed: {
    showNext() {
      return (
        this.dateList &&
        this.dateList.length > 0 &&
        this.datalist &&
        this.datalist.length > 0 &&
        this.dateList.slice(-1)[0] !=
          this.formatDate(this.datalist.slice(-1)[0].REPORTDATE)
      );
    },
    showPrev() {
      return (
        this.dateList &&
        this.dateList.length > 0 &&
        this.datalist &&
        this.datalist.length > 0 &&
        this.dateList[0] != this.formatDate(this.datalist[0].REPORTDATE)
      );
    },
  },
  watch: {
    reportDateType(n, o) {
      this.loadData();
    },
    reportType() {
      this.loadData();
    },
    endDate() {
      this.loadData();
    },
    item(n, o) {
      this.loadData();
    },
  },
};
</script>

<style scoped src="./web.css" />


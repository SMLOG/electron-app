<template>
  <div class="section">
    <div class="name" id="bfbbb" style="margin-bottom:5px">
      <samp class="icon"></samp>
      <strong>百分比报表</strong>
    </div>
    <div id="bfb_index" class="content" style="text-align:center;  padding-top:0px">
      <div v-if="bfbbb==null||bfbbb.zb==null">暂无数据</div>
      <div v-else class="tips-colL" style="width: 332px;">
        <table id="AssetStatementTable">
          <tr>
            <th class="tips-colname-Left">
              <span>
                指标&ensp;&ensp;&ensp;&ensp;
                {{bfbbb.zb.date}}
              </span>
            </th>
            <th>金额(元)</th>
            <th>占比</th>
          </tr>
          <tr>
            <th class="tips-colname-Left">
              <span>总资产</span>
            </th>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.zzc,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>100%</span>
            </td>
          </tr>
          <tr>
            <th class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;流动资产</span>
            </th>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.ldzc,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.ldzcbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;货币资金</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.hbzj,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.hbzjbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;应收账款</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.yszk,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.yszkbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;存货</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.ch,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.chbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;预付账款</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.yfzk,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.yfzkbfb}}</span>
            </td>
          </tr>
          <tr>
            <th class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;非流动资产</span>
            </th>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.fldzc,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.fldzcbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;固定资产</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.gdzc,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.gdzcbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;无形资产</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.wxzc,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.wxzcbfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;长期待摊费用</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.cqdtfy,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.cqdtfybfb}}</span>
            </td>
          </tr>
          <tr>
            <td class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;金融资产</span>
            </td>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.jrzc,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.jrzcbfb}}</span>
            </td>
          </tr>
          <tr>
            <th class="tips-colname-Left">
              <span>总负债金额</span>
            </th>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.zfzje,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>100%</span>
            </td>
          </tr>
          <tr>
            <th class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;流动负债</span>
            </th>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.ldfz,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.ldfzbfb}}</span>
            </td>
          </tr>
          <tr>
            <th class="tips-colname-Left">
              <span>&ensp;&ensp;&ensp;&ensp;非流动负债</span>
            </th>
            <td class="tips-data-Right">
              <span>{{formatNumber(bfbbb.zb.fldfz,2)}}</span>
            </td>
            <td class="tips-data-Right">
              <span>{{bfbbb.zb.fldfzbfb}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="tips-colL" style="width: 634px;">
        <v-chart
          :options="zcOption"
          id="zcChart"
          style="width:300px;height:279px;"
          class="tips-colL tips-marginL"
        />
        <v-chart
          :options="fzOption"
          id="fzChart"
          style="width:300px;height:279px;"
          class="tips-colR tips-marginR"
        />
      </div>
      <div class="tips-sp10"></div>
    </div>
    <div class="content" style="margin-top:0px">
      <div class="tab tips-fontsize">
        <ul id="BFBBB_ul">
          <li class="first" :class="{current:0==tabIndex}" @click="tabIndex=0">
            <span>按报告期</span>
          </li>
          <li :class="{current:1==tabIndex}" @click="tabIndex=1">
            <span>按年度</span>
          </li>
          <li :class="{current:2==tabIndex}" @click="tabIndex=2">
            <span>按单季度</span>
          </li>
        </ul>
      </div>
      <div id="template_bfbbb">
        <table id="PPTable">
          <tbody v-if="bfbbb2&&bfbbb2.lr0&&bfbbb2.lr0.length>0">
            <tr>
              <th class="tips-colname-Left" style="width: 198px;">
                <span>利润表</span>
              </th>
              <th
                v-for="(value,i) in bfbbb2.lr0"
                :key="i"
                class="tips-dataC"
                colspan="2"
              >{{value.date}}</th>
            </tr>
            <tr>
              <th class="tips-colname-Left">
                <span>指标</span>
              </th>
              <template v-for="(value,i) in bfbbb2.lr0">
                <td :key="i" class="tips-fieldnameC">数值</td>
                <td :key="'1-'+i" class="tips-fieldnameC">占比</td>
              </template>
            </tr>

            <tr v-for="(arr,k) in bfb_lr " :key="k">
              <th class="tips-colname-Left">
                <span v-html="arr[0]"></span>
              </th>
              <template v-for="(value,i) in bfbbb2.lr0">
                <td :key="i" class="tips-data-Right">
                  <span>{{value[arr[1]]}}</span>
                </td>
                <td :key="'1-'+i" class="tips-data-Right">
                  <span v-if="arr.length<=3">{{value[arr[2]]}}</span>
                  <span v-else>{{arr[3]}}</span>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { bfb_lr } from "./zb";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
//数据单位格式化为万元
function ConvertNumToWan(value) {
  if (!value || value == "--") return "-";
  if (value.indexOf("万亿") >= 0) {
    return Math.round(parseFloat(value.replace("万亿", "")) * 10000 * 10000);
  } else if (value.indexOf("亿") >= 0) {
    return Math.round(parseFloat(value.replace("亿", "")) * 10000);
  } else if (value.indexOf("万") >= 0) {
    return value.replace("万", "");
  } else {
    return (parseFloat(value) / 10000).toFixed(2);
  }
}
//数据单位格式化为亿
function ConvertNumToYi(value) {
  if (!value || value == "--") return "--";

  var arr = value.split(".");
  var weishu = arr[0].length;
  if (value < 0) weishu--;
  if (weishu == 5 || weishu == 9 || weishu == 13) weishu = 2;
  else if (weishu == 6 || weishu == 10 || weishu == 14) weishu = 1;
  else weishu = 0;

  value = value / (10000 * 10000 * 10000);
  var a = value >= 0 ? Math.floor(value) : Math.ceil(value);
  if (a != 0) {
    return value.toFixed(weishu) + "万亿";
  } else {
    value = value * 10000;
    a = value >= 0 ? Math.floor(value) : Math.ceil(value);
    if (a != 0) {
      return value.toFixed(weishu) + "亿";
    } else {
      value = value * 10000;
      a = value >= 0 ? Math.floor(value) : Math.ceil(value);
      if (a != 0) {
        return value.toFixed(weishu) + "万";
      } else {
        value = value * 10000;
        return value.toFixed(weishu);
      }
    }
  }
  return (parseFloat(value) / (10000 * 10000)).toFixed(2);
}
export default {
  name: "Percent",
  components: {
    "v-chart": ECharts,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      bfbbb: null,
      bfbbb2: null,
      companyType: 4,
      bfb_lr: bfb_lr,
      tabIndex: 0,
      zyzb: [],
      selectZb: null,
      zcOption: {
        color: [
          "#ff9703",
          "#cc6602",
          "#cc6733",
          "#cbcc66",
          "#cd3301",
          "#cd330a",
          "#cc9900",
          "#09968e",
        ],
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return (
              params.seriesName +
              " <br/>" +
              params.name +
              ":" +
              ConvertNumToYi(params.value) +
              "元(" +
              params.percent +
              "%)"
            );
          },
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: "center",
          data: [
            "货币资金",
            "应收账款",
            "存货",
            "预付账款",
            "固定资产",
            "无形资产",
            "长期待摊费用",
            "其他",
          ],
        },
        series: [
          {
            name: "总资产",
            type: "pie",
            radius: "55%",
            center: ["65%", "50%"],
            data: [],
            label: {
              normal: {
                show: false,
              },
            },
          },
        ],
      },
      fzOption: {
        color: ["#cc6501", "#993400"],
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return (
              params.seriesName +
              " <br/>" +
              params.name +
              ":" +
              ConvertNumToYi(params.value) +
              "元(" +
              params.percent +
              "%)"
            );
          },
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "center",
          data: ["流动负债", "非流动负债"],
        },
        series: [
          {
            name: "总负债",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: [],
            label: {
              normal: {
                show: false,
              },
            },
          },
        ],
      },
    };
  },

  methods: {
    formatNumber(value, point) {
      var temp = Number(value);
      if (!temp) return "--";

      if (Math.abs(temp) >= 1e12) {
        var resupt = temp / 1e12;
        point = this.getFormatPoint(resupt);
        return resupt.toFixed(point) + "万亿";
      } else if (Math.abs(temp) >= 1e8) {
        var resupt = temp / 1e8;
        point = this.getFormatPoint(resupt);
        return resupt.toFixed(point) + "亿";
      } else if (Math.abs(temp) >= 1e4) {
        var resupt = temp / 1e4;
        point = this.getFormatPoint(resupt);
        return resupt.toFixed(point) + "万";
      }
      return temp.toFixed(point);
    },

    getFormatPoint(value) {
      value = Math.abs(value);
      var point = 2;
      if (value >= 1000) point = 0;
      else if (value >= 100) point = 1;
      else if (value >= 10) point = 2;
      else point = 3;

      return point;
    },
    async load() {
      //主要指标数据加载

      var url = "/p/NewFinanceAnalysis/PercentAjax_Indx";
      var data = { code: this.item.code };

      let result = await axios
        .get(url, { params: data })
        .then((resp) => resp.data);
      data = this.bfbbb = result;

      var zcData = [];
      var fzData = [];
      if (data && data.zb) {
        zcData.push({ value: data.zb.hbzj, name: "货币资金" });
        zcData.push({ value: data.zb.yszk, name: "应收账款" });
        zcData.push({ value: data.zb.ch, name: "存货" });
        zcData.push({ value: data.zb.yfzk, name: "预付账款" });
        zcData.push({ value: data.zb.gdzc, name: "固定资产" });
        zcData.push({ value: data.zb.wxzc, name: "无形资产" });
        zcData.push({ value: data.zb.cqdtfy, name: "长期待摊费用" });
        var total = data.zb.zzc;
        for (var i = 0; i < zcData.length; i++) {
          total = total - zcData[i].value;
        }
        zcData.push({ value: total.toFixed(2), name: "其他" });

        fzData.push({ value: data.zb.ldfz, name: "流动负债" });
        fzData.push({ value: data.zb.fldfz, name: "非流动负债" });
        this.zcOption.series[0].data.length = 0;
        this.zcOption.series[0].data.splice(0, 0, ...zcData);

        this.fzOption.series[0].data.length = 0;
        this.fzOption.series[0].data.splice(0, 0, ...fzData);

        var url =
          "/proxy?url=http%3A%2F%2Ff10.eastmoney.com/NewFinanceAnalysis%2FPercentAjax";
        var data = {
          code: this.item.code,
          ctype: this.companyType,
          type: this.tabIndex,
        };
        result = await axios
          .get(url, { params: data })
          .then((resp) => resp.data);

        this.bfbbb2 = result;
      }
    },
  },

  mounted() {
    this.load();
  },
  watch: {
    tabIndex(n, o) {
      this.load();
    },
  },
};
</script>

<style scoped src="./web.css" />


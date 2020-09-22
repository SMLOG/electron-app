<template>
  <div class="section">
    <div class="name" id="dbfx">
      <samp class="icon"></samp>
      <strong>杜邦分析</strong>
    </div>
    <div id="report_dbfx" style="text-align: center;">
      <template v-if="dbfx && dbfx.bgq && dbfx.bgq.length>0 && dbfx.nd && dbfx.nd.length>0">
        <div class="content">
          <div class="tab">
            <ul id="DBFX_Date_ul">
              <li :class="{current:tabIndex==0}" @click="tabIndex=0" data-type="0">按报告期</li>
              <li :class="{current:tabIndex==1}" data-type="1" @click="tabIndex=1">按年度</li>
            </ul>
          </div>
        </div>
        <div class="content" style="margin-top: 2px;">
          <div class="tab">
            <ul id="DBFX_ul">
              <li
                v-for="(value,i) in dbfx.bgq"
                :key="i"
                data-mark="bgq"
                :data-index="i"
                v-show="tabIndex==0"
                @click="selectDate=value.date"
                :class="{current:selectDate==value.date}"
              >{{value.date}}</li>
              <li
                v-for="(value,i) in dbfx.nd"
                :key="dbfx.bgq.length+i"
                data-mark="nd"
                :data-index="dbfx.bgq.length+i"
                v-show="tabIndex==1"
                @click="selectDate=value.date"
                :class="{current:selectDate==value.date}"
              >{{value.date}}</li>
            </ul>
          </div>
        </div>
        <div class="canvas">
          <div
            v-for="(value,i) in dbfx.bgq"
            @click="selectDate=value.date"
            v-show="selectDate==value.date"
            :key="i"
            data-mark="detail"
            :class="['canvas_bgq_'+i]"
          >
            <div class="db_01">
              <p class="db_data01">{{value.jzcsyl}}</p>
              <samp class="tips-unit">单位:元</samp>
            </div>
            <div class="db_02">
              <p class="db_data01">{{value.zzcjll}}</p>
              <p class="db_data02">{{value.gsmgsgddjlr}}</p>
              <p class="db_data03">{{value.qycs}}</p>
            </div>
            <div class="db_03">
              <p class="db_data01">{{value.yyjlrl}}</p>
              <p class="db_data02">{{value.zzczzl}}</p>
              <p class="db_data03">{{value.zcfzl}}</p>
            </div>
            <div class="db_04">
              <p class="db_data01">{{value.jlr}}</p>
              <p class="db_data02">{{value.yysr}}</p>
              <p class="db_data03">{{value.yysr}}</p>
              <p class="db_data04">{{value.zcze}}</p>
              <p class="db_data05">{{value.fzze}}</p>
              <p class="db_data06">{{value.zcze}}</p>
            </div>
            <div class="db_05">
              <p class="db_data01">{{value.srze}}</p>
              <p class="db_data02">{{value.cbze}}</p>
              <p class="db_data03">{{value.ldzc}}</p>
              <p class="db_data04">{{value.fldzc}}</p>
            </div>
            <div class="db_06">
              <p class="db_data01">{{value.yysr}}</p>
              <p class="db_data02">{{value.yycb}}</p>
              <p class="db_data03">{{value.qjfy}}</p>
              <p class="db_data04">{{value.hbzj}}</p>
              <p class="db_data05">{{value.kgcsjrzc}}</p>
              <p class="db_data06">{{value.wxzc}}</p>
            </div>
            <div class="db_07">
              <p class="db_data01">{{value.gyjzbdsy}}</p>
              <p class="db_data02">{{value.yysjjfj}}</p>
              <p class="db_data03">{{value.jyxjrzc}}</p>
              <p class="db_data04">{{value.cyzdqtz}}</p>
              <p class="db_data05">{{value.kfzc}}</p>
            </div>
            <div class="db_08">
              <p class="db_data01">{{value.yywsr}}</p>
              <p class="db_data02">{{value.sdsfy}}</p>
              <p class="db_data03">{{value.cwfy}}</p>
              <p class="db_data04">{{value.yszk}}</p>
              <p class="db_data05">{{value.cqgqtz}}</p>
              <p class="db_data06">{{value.sy}}</p>
            </div>
            <div class="db_09">
              <p class="db_data01">{{value.tzsy}}</p>
              <p class="db_data02">{{value.zcjzss}}</p>
              <p class="db_data03">{{value.xsfy}}</p>
              <p class="db_data04">{{value.yfzk}}</p>
              <p class="db_data05">{{value.tzxfdc}}</p>
              <p class="db_data06">{{value.cqdtfy}}</p>
            </div>
            <div class="db_10">
              <p class="db_data01">{{value.yywzc}}</p>
              <p class="db_data02">{{value.glfy}}</p>
              <p class="db_data03">{{value.qtysk}}</p>
              <p class="db_data04">{{value.gdzc}}</p>
              <p class="db_data05">{{value.dysdszc}}</p>
            </div>
            <div class="db_11">
              <p class="db_data01">{{value.ch}}</p>
              <p class="db_data02">{{value.zjgc}}</p>
              <p class="db_data03">{{value.qtfldzc}}</p>
            </div>
            <div class="db_12">
              <p class="db_data01">{{value.qtldzc}}</p>
            </div>
            <div class="tips-note2">注：以上数据优先摘录上市公司定期报告中公布的数据，若报告期中没公布此项数据，则通过计算得出此项数据</div>
          </div>
          <div
            v-for="(value,i) in dbfx.nd"
            :key="i+dbfx.bgq.length"
            data-mark="detail"
            :class="['canvas_nd_'+i]"
            @click="selectDate=value.date"
            v-show="selectDate==value.date"
          >
            <div class="db_01">
              <p class="db_data01">{{value.jzcsyl}}</p>
              <samp class="tips-unit">单位:元</samp>
            </div>
            <div class="db_02">
              <p class="db_data01">{{value.zzcjll}}</p>
              <p class="db_data02">{{value.gsmgsgddjlr}}</p>
              <p class="db_data03">{{value.qycs}}</p>
            </div>
            <div class="db_03">
              <p class="db_data01">{{value.yyjlrl}}</p>
              <p class="db_data02">{{value.zzczzl}}</p>
              <p class="db_data03">{{value.zcfzl}}</p>
            </div>
            <div class="db_04">
              <p class="db_data01">{{value.jlr}}</p>
              <p class="db_data02">{{value.yysr}}</p>
              <p class="db_data03">{{value.yysr}}</p>
              <p class="db_data04">{{value.zcze}}</p>
              <p class="db_data05">{{value.fzze}}</p>
              <p class="db_data06">{{value.zcze}}</p>
            </div>
            <div class="db_05">
              <p class="db_data01">{{value.srze}}</p>
              <p class="db_data02">{{value.cbze}}</p>
              <p class="db_data03">{{value.ldzc}}</p>
              <p class="db_data04">{{value.fldzc}}</p>
            </div>
            <div class="db_06">
              <p class="db_data01">{{value.yysr}}</p>
              <p class="db_data02">{{value.yycb}}</p>
              <p class="db_data03">{{value.qjfy}}</p>
              <p class="db_data04">{{value.hbzj}}</p>
              <p class="db_data05">{{value.kgcsjrzc}}</p>
              <p class="db_data06">{{value.wxzc}}</p>
            </div>
            <div class="db_07">
              <p class="db_data01">{{value.gyjzbdsy}}</p>
              <p class="db_data02">{{value.yysjjfj}}</p>
              <p class="db_data03">{{value.jyxjrzc}}</p>
              <p class="db_data04">{{value.cyzdqtz}}</p>
              <p class="db_data05">{{value.kfzc}}</p>
            </div>
            <div class="db_08">
              <p class="db_data01">{{value.yywsr}}</p>
              <p class="db_data02">{{value.sdsfy}}</p>
              <p class="db_data03">{{value.cwfy}}</p>
              <p class="db_data04">{{value.yszk}}</p>
              <p class="db_data05">{{value.cqgqtz}}</p>
              <p class="db_data06">{{value.sy}}</p>
            </div>
            <div class="db_09">
              <p class="db_data01">{{value.tzsy}}</p>
              <p class="db_data02">{{value.zcjzss}}</p>
              <p class="db_data03">{{value.xsfy}}</p>
              <p class="db_data04">{{value.yfzk}}</p>
              <p class="db_data05">{{value.tzxfdc}}</p>
              <p class="db_data06">{{value.cqdtfy}}</p>
            </div>
            <div class="db_10">
              <p class="db_data01">{{value.yywzc}}</p>
              <p class="db_data02">{{value.glfy}}</p>
              <p class="db_data03">{{value.qtysk}}</p>
              <p class="db_data04">{{value.gdzc}}</p>
              <p class="db_data05">{{value.dysdszc}}</p>
            </div>
            <div class="db_11">
              <p class="db_data01">{{value.ch}}</p>
              <p class="db_data02">{{value.zjgc}}</p>
              <p class="db_data03">{{value.qtfldzc}}</p>
            </div>
            <div class="db_12">
              <p class="db_data01">{{value.qtldzc}}</p>
            </div>
            <div class="tips-note2">注：以上数据优先摘录上市公司定期报告中公布的数据，若报告期中没公布此项数据，则通过计算得出此项数据</div>
          </div>
        </div>
      </template>
      <div v-else class="content">
        <h1 style="text-align: center; font-size: 14px; padding: 10px 0;">该股暂无杜邦分析</h1>
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
  name: "DuPont",
  components: {
    "v-chart": ECharts,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      tabIndex: 0,
      dbfx: [],
      selectDate: null,
    };
  },

  methods: {
    loadData() {
      var url =
        "/proxy?url=http%3A%2F%2Ff10.eastmoney.com/NewFinanceAnalysis%2FDubangAnalysisAjax";
      var data = { type: this.tabIndex, code: this.item.code };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((result) => {
          this.dbfx = result;
          this.tabIndex = 0;
          this.selectDate = result.bgq[0].date;
        });
    },
  },

  mounted() {
    this.loadData();
  },
  watch: {
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
      this.loadData();
    },
  },
};
</script>

<style scoped src="./web.css" />
<style scoped>
div {
  font-size: 14px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>

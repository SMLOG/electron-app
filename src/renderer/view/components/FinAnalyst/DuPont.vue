<template>
  <div class="section">
    <div class="name" id="dbfx">
      <samp class="icon"></samp>
      <strong>杜邦分析</strong>
    </div>
    <div id="report_dbfx" style="text-align: center">
      <template
        v-if="
          dbfx &&
          dbfx.bgq &&
          dbfx.bgq.length > 0 &&
          dbfx.nd &&
          dbfx.nd.length > 0
        "
      >
        <div class="content">
          <div class="tab">
            <ul id="DBFX_Date_ul">
              <li
                :class="{ current: tabIndex == 0 }"
                @click="tabIndex = 0"
                data-type="0"
              >
                按报告期
              </li>
              <li
                :class="{ current: tabIndex == 1 }"
                data-type="1"
                @click="tabIndex = 1"
              >
                按年度
              </li>
            </ul>
          </div>
        </div>
        <div class="content" style="margin-top: 2px">
          <div class="tab">
            <ul id="DBFX_ul">
              <li
                v-for="(value, i) in arrValues"
                :key="arrValues.length + i"
                :data-index="arrValues.length + i"
                @click="selectDate = value.date"
                :class="{ current: selectDate == value.date }"
              >
                {{ value.date }}
              </li>
            </ul>
          </div>
        </div>
        <div class="canvas">
          <div
            v-for="(value, i) in arrValues"
            @click="selectDate = value.date"
            v-show="selectDate == value.date"
            :key="i"
            data-mark="detail"
            :class="['canvas_bgq_' + i]"
          >
            <div class="db_01">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('jzcsyl')"></peity>
                {{ value.jzcsyl }}
              </p>
              <samp class="tips-unit">单位:元</samp>
            </div>

            <div class="db_02">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('zzcjll')"></peity
                >{{ value.zzcjll }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('gsmgsgddjlr')"></peity
                >{{ value.gsmgsgddjlr }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('qycs')"></peity
                >{{ value.qycs }}
              </p>
            </div>
            <div class="db_03">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('yyjlrl')"></peity
                >{{ value.yyjlrl }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('zzczzl')"></peity
                >{{ value.zzczzl }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('zcfzl')"></peity
                >{{ value.zcfzl }}
              </p>
            </div>
            <div class="db_04">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('jlr')"></peity
                >{{ value.jlr }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('yysr')"></peity
                >{{ value.yysr }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('yysr')"></peity
                >{{ value.yysr }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('zcze')"></peity
                >{{ value.zcze }}
              </p>
              <p class="db_data05">
                <peity type="bar" :data="getDatas('fzze')"></peity
                >{{ value.fzze }}
              </p>
              <p class="db_data06">
                <peity type="bar" :data="getDatas('zcze')"></peity
                >{{ value.zcze }}
              </p>
            </div>
            <div class="db_05">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('srze')"></peity
                >{{ value.srze }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('cbze')"></peity
                >{{ value.cbze }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('ldzc')"></peity
                >{{ value.ldzc }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('fldzc')"></peity
                >{{ value.fldzc }}
              </p>
            </div>
            <div class="db_06">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('yysr')"></peity
                >{{ value.yysr }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('yycb')"></peity
                >{{ value.yycb }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('qjfy')"></peity
                >{{ value.qjfy }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('hbzj')"></peity
                >{{ value.hbzj }}
              </p>
              <p class="db_data05">
                <peity type="bar" :data="getDatas('kgcsjrzc')"></peity
                >{{ value.kgcsjrzc }}
              </p>
              <p class="db_data06">
                <peity type="bar" :data="getDatas('wxzc')"></peity
                >{{ value.wxzc }}
              </p>
            </div>
            <div class="db_07">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('gyjzbdsy')"></peity
                >{{ value.gyjzbdsy }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('yysjjfj')"></peity
                >{{ value.yysjjfj }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('jyxjrzc')"></peity
                >{{ value.jyxjrzc }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('cyzdqtz')"></peity
                >{{ value.cyzdqtz }}
              </p>
              <p class="db_data05">
                <peity type="bar" :data="getDatas('kfzc')"></peity
                >{{ value.kfzc }}
              </p>
            </div>
            <div class="db_08">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('yywsr')"></peity
                >{{ value.yywsr }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('sdsfy')"></peity
                >{{ value.sdsfy }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('cwfy')"></peity
                >{{ value.cwfy }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('yszk')"></peity
                >{{ value.yszk }}
              </p>
              <p class="db_data05">
                <peity type="bar" :data="getDatas('cqgqtz')"></peity
                >{{ value.cqgqtz }}
              </p>
              <p class="db_data06">
                <peity type="bar" :data="getDatas('sy')"></peity>{{ value.sy }}
              </p>
            </div>
            <div class="db_09">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('tzsy')"></peity
                >{{ value.tzsy }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('zcjzss')"></peity
                >{{ value.zcjzss }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('xsfy')"></peity
                >{{ value.xsfy }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('yfzk')"></peity
                >{{ value.yfzk }}
              </p>
              <p class="db_data05">
                <peity type="bar" :data="getDatas('tzxfdc')"></peity
                >{{ value.tzxfdc }}
              </p>
              <p class="db_data06">
                <peity type="bar" :data="getDatas('cqdtfy')"></peity
                >{{ value.cqdtfy }}
              </p>
            </div>
            <div class="db_10">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('yywzc')"></peity
                >{{ value.yywzc }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('glfy')"></peity
                >{{ value.glfy }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('qtysk')"></peity
                >{{ value.qtysk }}
              </p>
              <p class="db_data04">
                <peity type="bar" :data="getDatas('gdzc')"></peity
                >{{ value.gdzc }}
              </p>
              <p class="db_data05">
                <peity type="bar" :data="getDatas('dysdszc')"></peity
                >{{ value.dysdszc }}
              </p>
            </div>
            <div class="db_11">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('ch')"></peity>{{ value.ch }}
              </p>
              <p class="db_data02">
                <peity type="bar" :data="getDatas('zjgc')"></peity
                >{{ value.zjgc }}
              </p>
              <p class="db_data03">
                <peity type="bar" :data="getDatas('qtfldzc')"></peity
                >{{ value.qtfldzc }}
              </p>
            </div>
            <div class="db_12">
              <p class="db_data01">
                <peity type="bar" :data="getDatas('qtldzc')"></peity
                >{{ value.qtldzc }}
              </p>
            </div>
            <div class="tips-note2">
              注：以上数据优先摘录上市公司定期报告中公布的数据，若报告期中没公布此项数据，则通过计算得出此项数据
            </div>
          </div>
        </div>
      </template>
      <div v-else class="content">
        <h1 style="text-align: center; font-size: 14px; padding: 10px 0">
          该股暂无杜邦分析
        </h1>
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
    getDatas(prop) {
      let arr = this.arrValues;
      return arr
        .filter((e) => arr[0].date.substring(5) == e.date.substring(5))
        .map((e) => e[prop])
        .reverse()
        .toString();
    },
    loadData() {
      var url = "/p/NewFinanceAnalysis/DubangAnalysisAjax";
      var data = { type: this.tabIndex, code: this.item.code };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((result) => {
          this.dbfx = result;
          if (this.selectDate == null) {
            this.selectDate = this.arrValues[0].date;
          }
        });
    },
  },
  computed: {
    type() {
      return this.tabIndex == 0 ? "bgq" : "nd";
    },
    arrValues() {
      return this.dbfx[this.tabIndex == 0 ? "bgq" : "nd"];
    },
  },

  mounted() {
    this.loadData();
  },
  watch: {
    item(n, o) {
      this.loadData();
    },
    tabIndex(n, o) {
      if (this.arrValues) this.selectDate = this.arrValues[0].date;
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

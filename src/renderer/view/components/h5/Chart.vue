<template>
  <div>
    <div class="rk-box" id="rk-box">
      <ul class="fl k-box" id="type-selector">
        <template
          v-for="(t, name) in {
            盘前: 'cr',
            分时: 'r',
            日K: 'k',
            '5日': {
              '1日': 'r',
              '2日': 't2',
              '3日': 't3',
              '4日': 't4',
              '5日': 't5',
            },
            周K: 'wk',
            月K: 'mk',
            '5分钟': 'm5k',
            '15分钟': 'm15k',
            '30分钟': 'm30k',
            '60分钟': 'm60k',
          }"
        >
          <li :key="name" v-if="name == '5日'" class="rk-a" id="day-selector">
            <span @click.stop="show5d = !show5d"
              ><span data-type="t5" class="selected-box dataType">{{
                getSelect5Day(t)
              }}</span
              ><span class="click-icon"><i class="select-icon"></i></span
            ></span>
            <div
              class="rk-options"
              :style="{ display: show5d ? 'block' : 'none' }"
            >
              <span
                v-for="(t5, name5) in t"
                :key="name5"
                :data-type="t5"
                @click="curType = t5"
                class="data-type"
                >{{ name5 }}</span
              >
            </div>
          </li>
          <li
            v-else
            :key="name"
            :data-type="t"
            @click="curType = t"
            :class="{ cur: curType == t }"
            class="dataType"
          >
            {{ name }}
          </li>
        </template>
      </ul>
      <ul
        class="fr r-box"
        id="kchart-toolbar"
        :curType="curType"
        :style="{ display: curType.indexOf('k') > -1 ? 'block' : 'none' }"
      >
        <li
          class="cmfb-li"
          id="btn-cyq"
          :class="{ cur: isCmfb }"
          @click="isCmfb = !isCmfb"
        >
          筹码分布
        </li>
        <li class="rk-a cur" id="select-authority">
          <span
            ><span
              class="selected-box"
              value=""
              @click.stop="toggleFQ($event)"
              >{{
                fq == "fa" ? "前复权" : fq == "ba" ? "后复权" : "不复权"
              }}</span
            ><i class="select-icon"></i
          ></span>
          <div
            class="rk-options k-options"
            id="authority-options"
            :style="{ display: showFQ ? 'block' : 'none' }"
          >
            <span value="fa" :class="{ cur: fq == 'fa' }" @click="fq = 'fa'"
              >前复权</span
            >
            <span value="ba" :class="{ cur: fq == 'ba' }" @click="fq = 'ba'"
              >后复权</span
            >
            <span :class="{ cur: fq == '' }" @click="fq = ''">不复权</span>
          </div>
        </li>
        <li id="btn-drawback">缩短</li>
        <li id="btn-stretchout">拉长</li>
      </ul>
    </div>
    <div
      id="chart-container"
      class="chart-box mt10"
      data-charttype="r"
      tabindex="-1"
    ></div>
  </div>
</template>
<script>
import axios from "axios";
import storejs from "storejs";
import Head from "./Head";
import Right from "./Right";
var canvasExtension = require("./ec/webpack/emcharts");
var chartmanager = require("./h5c/em-chartmanager");

var utils = require("./h5c/em-utils");
var cookie = utils.cookie;
import _ from "lodash";
import $ from "jquery";
window.$ = $;

export default {
  components: { Head, Right },
  props: {
    item: Object,
  },
  data() {
    return {
      fq: storejs.get("fq") || "fa",
      showFQ: 0,
      show5d: 0,
      state: "open",
      curType: "k",
      isCmfb: false,
      item2: {},
    };
  },

  methods: {
    refresh(item) {
      this.item2 = item;
    },
    getSelect5Day(t) {
      let a = Object.keys(t).filter((e) => t[e] == this.curType);
      if (a.length) return a[0];
      return "5日";
    },
    toggleFQ() {
      this.showFQ = !this.showFQ;
    },
    getSecid() {
      return this.item.code.replace(/sh/, "1.").replace(/sz/, "0.");
    },

    resize() {
      this.drawChart(this.item);
    },
    getOptions() {
      let item = this.item;
      var market = item.code.indexOf("sh") > -1 ? 1 : 0;
      var width = $(".mywrap").width();
      var stockentry = {
        code: item.code.replace(/[a-z]+/gi, ""),
        marketnum: market,
        shortmarket: market == "1" ? "sh" : "sz",
        id: item.code.replace(/[a-z]+/gi, "") + market,
        newmarket: market == "1" ? "1" : "0", //1sh 0sz
      };
      var stock_state = "close";
      var options = {
        entry: stockentry,
        type: this.curType,
        height: $(".mywrap").height() - 78,
        width: width - 270,
        padding: {
          top: 0,
          bottom: 20,
          right: 60,
        },
        cyq: false,
        iscr: stock_state == "pre",
        authorityType: storejs.get("fq") || "fa",
        show: { indicatorArea: true },
        onComplete: function () {
          $("#chart-container").trigger("drawComplete.emchart");
        },
      };

      if (this.curType == "cr") {
        options.iscr = true;
        options.type = "r";
      } else if (this.curType == "ar") {
        options.iscr = false;
        options.isph = true;
        options.type = "r";
      }

      if (this.isCmfb) {
        options.width = width;
        options.padding.right = 3;
        options.cyq = {
          width: 270,
          gap: 10,
          accuracyFactor: 150,
          range: 120,
        };
      }
      return options;
    },
    changeItem(item) {
      if (item) {
        let options = this.getOptions();
        if (options.type.indexOf("k") > -1) {
          window.kloader.args = _.merge(window.kloader.args, options);
          window.kloader.args.scale.start = undefined;
          window.kloader.args.scale.end = undefined;
          window.kchart.setOption(options);
          window.kloader.reload();
        } else {
          window.tloader.args = _.merge(window.tloader.args, options);
          //window.tloader.args.scale.start = undefined;
          //window.tloader.args.scale.end = undefined;
          window.tchart = window.tloader.load();

          // window.tchart.setOption(options);
          //window.tloader.reload();
        }
      }
    },
    drawChart(item) {
      if (item) {
        let options = this.getOptions();
        if (options.scale) {
          options.scale.start = undefined;
          options.scale.end = undefined;
        }
        if (options.type.indexOf("k") > -1) {
          if (window.kchart) {
            window.kchart.setOption(options);
            window.kchart.draw();
          } else {
            window.kloader = chartmanager.call({}, "k", options);
            window.kchart = window.kloader.load();

            window.tloader = chartmanager.call({}, "time", options);
          }
          window.kloader.args = _.merge(options, window.kloader.args);
          window.kloader.args.scale.start = undefined;
          window.kloader.args.scale.end = undefined;
        } else {
          if (window.tchart) {
            window.tchart.draw();
          } else {
            //window.tloader = chartmanager.call({}, "time", options);
            window.tchart = window.tloader.load();
          }
          window.tloader.args = _.merge(options, window.tloader.args);
        }
      }
    },
  },

  mounted() {
    let resizeTimer = 0;
    $(window).resize(() => {
      if (resizeTimer) clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => this.resize(), 100);
    });

    $(document).click(() => {
      this.showFQ = 0;
      this.show5d = 0;
    });
    $(window).resize();
  },
  computed: {},
  watch: {
    item(n) {
      this.changeItem(n);
    },
    curType(n) {
      this.changeItem(this.item);
    },
    fq(n) {
      this.drawChart(this.item);
      storejs.set("fq", n);
    },
    isCmfb(n, o) {
      this.changeItem(this.item);
    },
  },
};
</script>

<style scoped src="./h5c/chart.css" />
<style scoped>
/deep/ .icon-mine {
  background: url(h5c/img/h5chart-icons.png) no-repeat -9999px -9999px;
}
/deep/ .icon-mine {
  background-position: -23px -20px;
  width: 9px;
  height: 9px;
}

.mywrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


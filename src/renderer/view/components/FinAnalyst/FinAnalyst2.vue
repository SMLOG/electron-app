<template>
  <div class="main" style="margin-top: 33px">
    <div id="divBody">
      <div class="subnav tip-nav">
        <div style="float: left; margin-left: 10px">
          <span @click="$emit('close')">x</span>
          <b>{{ item.name }}</b>
        </div>
        <div
          @mouseover="over = 1"
          @mouseout="over = 0"
          :class="{ over: over }"
          class="groups"
        >
          <div
            v-for="(tabs, group) in tabGroups"
            :class="{ curGroup: group == selectGroup }"
            :key="group"
          >
            <b>{{ group }}</b>
            <template v-for="(tab, i) in tabs">
              <a
                :key="i"
                @click="
                  selectGroup = group;
                  changeCurComp(tab);
                "
                :class="{ current: tab.name == curComponentName }"
                >{{ tab.name }}</a
              >
              <samp v-if="i < tabs.length - 1" :key="'0_' + i">|</samp>
            </template>
          </div>
        </div>
      </div>
      <div v-if="item && item.code">
        <keep-alive>
          <component
            :key="curComponent"
            v-bind:is="curComponent"
            :name="tabGroups[selectGroup][selectIndex].name"
            :item="item"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import jsonp from "jsonp";
import Main from "./Main";
import DuPont from "./DuPont";
import Balance from "./Balance";
import Percent from "./Percent";
import BusinessAnalysis from "./BusinessAnalysis";
import Dashboard from "./Dashboard";
import Bonus from "./Bonus";
import Radar from "./Radar";
import Shareholder from "./Shareholder";
import leline from "@/view/components/tech/leline";

import { mapState, mapGetters } from "vuex";

import $ from "jquery";
window.$ = $;

export default {
  name: "FinAnalyst2",
  data() {
    return {
      over: 0,
      selectIndex: 0,
      selectGroup: "财务分析",
      curComponent: "Main",
      tabGroups: {
        财务分析: [
          { name: "主要指标", cp: "Main" },
          { name: "杜邦分析", cp: "DuPont" },
          { name: "资产负债表", cp: "Balance" },
          { name: "利润表", cp: "Balance" },
          { name: "现金流量表", cp: "Balance" },
          { name: "百分比", cp: "Percent" },
          { name: "雷达图", cp: "Radar" },
        ],
        经营分析: [
          { name: "主营范围", cp: "BusinessAnalysis" },
          { name: "必读", cp: "Dashboard" },
          { name: "分红融资", cp: "Bonus" },
          { name: "股东", cp: "Shareholder" },
        ],
        技术分析: [{ name: "五线谱", cp: "leline" }],
      },
    };
  },
  props: {
    item: Object,
    close: Function,
  },
  components: {
    Main,
    DuPont,
    Balance,
    Percent,
    BusinessAnalysis,
    Dashboard,
    Bonus,
    Shareholder,
    Radar,
    leline,
  },

  methods: {
    goAnchor(selector) {
      this.selectTab = selector;
      // let el = this.$el.querySelector("#" + selector);
      // el && this.$el.scrollTo(0, el.offsetTop - $(".subnav").outerHeight());
    },
    updateCurComponent(n) {
      if (n) {
        for (let tab in this.tabGroups) {
          for (let i = 0; i < this.tabGroups[tab].length; i++) {
            if (this.tabGroups[tab][i].name == n) {
              this.selectGroup = tab;
              this.selectIndex = i;
              this.curComponent = this.tabGroups[tab][i].cp;
              return;
            }
          }
        }
      }
    },

    changeCurComp(tab) {
      this.$store.commit("ws/setCurItem", {
        ...this.$store.state.ws,
        curComponentName: tab.name,
      });
    },
  },

  mounted() {
    //this.item.code = this.$route.params.code || "SH600332";
    this.updateCurComponent(this.curComponentName);
  },
  computed: {
    ...mapState({
      curComponentName: (state) => state.ws.curComponentName,
    }),
  },
  watch: {
    selectGroup(o, n) {},
    selectIndex(o, n) {},
    curComponentName(n, o) {
      this.updateCurComponent(n);
    },
  },
};
</script>

<style scoped src="./web.css" />
<style scoped>
.over {
  overflow: visible !important;
  height: auto !important;
}
.groups {
  overflow: hidden;
  height: 100%;
  background: #fff;
  display: inline-block;
  text-align: left;
  margin-left: 10px;
  padding: 0 5px;
}
.groups > div {
  display: none;
}
.over.groups > div {
  display: block;
}
.groups .curGroup {
  display: block;
}
.over .curGroup + div {
  display: block;
}
</style>


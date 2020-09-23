<template>
  <div class="main">
    <div id="divBody" style="margin-top:33px;">
      <div class="subnav tip-nav">
        <b style="float:left;margin-left:10px;">{{item.name}}</b>

        <div @mouseover="over=1" @mouseout="over=0" :class="{over:over}" class="groups">
          <div
            v-for="(tabs,group) in tabGroups"
            :class="{curGroup:group==selectGroup}"
            :key="group"
          >
            <b>{{group}}</b>
            <template v-for="(tab,i) in tabs">
              <a
                :key="i"
                @click="selectGroup=group,selectIndex=i"
                :class="{current:group==selectGroup&&i==selectIndex}"
              >{{tab.name}}</a>
              <samp v-if="i<tabs.length-1" :key="'0_'+i">|</samp>
            </template>
          </div>
        </div>
      </div>
      <div v-if="item&&item.code">
        <keep-alive>
          <component
            :key="tabGroups[selectGroup][selectIndex].name"
            v-bind:is="tabGroups[selectGroup][selectIndex].cp"
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

import $ from "jquery";
window.$ = $;

export default {
  name: "FinAnalyst2",
  data() {
    return {
      over: 0,
      selectIndex: 0,
      selectGroup: "财务分析",
      tabGroups: {
        财务分析: [
          { name: "主要指标", cp: "Main" },
          { name: "杜邦分析", cp: "DuPont" },
          { name: "资产负债表", cp: "Balance" },
          { name: "利润表", cp: "Balance" },
          { name: "现金流量表", cp: "Balance" },
          { name: "百分比", cp: "Percent" },
        ],
        经营分析: [{ name: "主营范围", cp: "BusinessAnalysis" }],
      },
    };
  },
  props: {
    item: Object,
  },
  components: { Main, DuPont, Balance, Percent, BusinessAnalysis },

  methods: {
    goAnchor(selector) {
      this.selectTab = selector;
      // let el = this.$el.querySelector("#" + selector);
      // el && this.$el.scrollTo(0, el.offsetTop - $(".subnav").outerHeight());
    },
  },

  mounted() {
    //this.item.code = this.$route.params.code || "SH600332";
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
<style lang="less">
</style>


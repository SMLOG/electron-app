<template>
  <div class="main">
    <div id="divBody" style="margin-top:33px;">
      <div class="subnav tip-nav">
        <b>{{item.name}}</b>
        <a id="zyzb_a" @click="goAnchor('zyzb');">主要指标</a>
        <samp>|</samp>
        <a id="dbfx_a" @click="goAnchor('dbfx');" class>杜邦分析</a>
        <samp>|</samp>
        <a id="zcfzb_a" @click="goAnchor('zcfzb');" class>资产负债表</a>
        <samp>|</samp>
        <a id="lrb_a" @click="goAnchor('lrb');" class>利润表</a>
        <samp>|</samp>
        <a id="xjllb_a" @click="goAnchor('xjllb');" class>现金流量表</a>
        <samp>|</samp>
        <a id="bfbbb_a" @click="goAnchor('bfbbb');" class>百分比报表</a>
      </div>
      <div v-if="item&&item.code">
        <Main id="zyzb" :item="item" />
        <DuPont id="dbfx" :item="item" />
        <Balance id="zcfzb" :item="item" name="资产负债表" />
        <Balance id="lrb" :item="item" name="利润表" />
        <Balance id="xjllb" :item="item" name="现金流量表" />
        <Percent id="bfbbb" :item="item" />
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
import $ from "jquery";
window.$ = $;

export default {
  name: "FinAnalyst2",
  data() {
    return {
      my: null,
    };
  },
  props: {
    item: Object,
  },
  components: { Main, DuPont, Balance, Percent },

  methods: {
    goAnchor(selector) {
      let el = this.$el.querySelector("#" + selector);
      el && this.$el.scrollTo(0, el.offsetTop - $(".subnav").outerHeight());
    },
  },

  mounted() {
    //this.item.code = this.$route.params.code || "SH600332";
  },
};
</script>

<style scoped src="./web.css" />


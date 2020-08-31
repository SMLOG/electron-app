<template>
  <table style="height:100%;width:100%;background:white;">
    <tr v-if="item">
      <td style="height:27px;">
        <div>
          <div @dblclick="dbclick" class="info">
            <span>{{ item.hy }}</span>
            <span v-if="item.forecast">{{ item.forecast }}</span>
            <span>披露:{{ item.disclosure }}</span>
            <span>流通/亿:{{ item["ltg"] }}</span>
            <span>流/总:{{ item["lz"] }}</span>
            <span>TTM:{{ item["pe_ttm"] }}</span>
            <span>PEG:{{ item["PEG"] && item["PEG"].toFixed(2) }}</span>
            <span>同比:{{ item["tbzz"] && item["tbzz"].toFixed(2) }}</span>
            <span>换手率:{{ item["turnover"] }}%</span>
            <span :class="{up:item.lb>1,down:item.lb<1}">量比:{{ item["lb"] }}</span>
            <span>低:{{ item["low"] }}</span>
            <span>高:{{ item["high"] }}</span>
            <span>振幅:{{ item["zf"] }}%</span>
            <span>成交额:{{(item.amount/100000000).toFixed(2)}}亿</span>
            <span :title="item.score_desc">分数:{{item.score}}/{{item.tscore}}</span>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <webview ref="webview" id="webview" style="width:100%;height:100%;" :src="link"></webview>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Calendar from "@/view/components/calendar";

import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";
import { filters, getCheckFilters, afilters } from "@/lib/filters";
import { callFun } from "@/lib/tech-manager";
import moment from "moment";

import $ from "jquery";
window.$ = $;

export default {
  name: "WinView",
  data: function () {
    return {
      openCode: null,
      openType: null,
      filters: filters,
    };
  },
  props: {
    link: String,
    item: Object,
    dBclick: Function,
  },
  components: {
    Calendar,
  },
  mounted() {
    // initwebview(this.closeview.bind(this));

    const webview = document.querySelector("webview");
    webview.addEventListener("dom-ready", (e) => {});
    webview.addEventListener("did-navigate-in-page", (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  },
  watch: {},
  computed: {},
  methods: {
    dbclick() {
      this.$emit("dBclick");
    },

    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
      this.openCode = null;
    },
  },
};
</script>
<style scoped>
.info span {
  margin-right: 8px;
  font-size: 80%;
}

#dragBar {
  position: absolute;
  width: 100%;
  height: 5px;
  cursor: row-resize;
  text-align: center;
  border-top: 1px solid #1bc07d;
}
.y {
  color: red;
}
.button {
  border: none;
  cursor: pointer;
  padding: 0px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-bottom: 1px solid;
}
.gray {
  color: gray;
}
.up {
  color: red;
}
.down {
  color: green;
}
</style>

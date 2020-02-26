<template>
  <table style="height:100%;width:100%;background:white;">
    <tr v-if="item">
      <td style="height:27px;">
        <div>
          <span>{{ item.hy }}</span>
          <span>{{ item.forecast }}</span>
          <span>披露:{{ item.disclosure }}</span>
          <span>52周%:{{ item["52weekPer"] }}</span>
          <span>流通/亿:{{ item["ltg"] }}</span>
          <span>流/总:{{ item["lz"] }}</span>
          <span>TTM:{{ item["pe_ttm"] }}</span>
          <span>PEG:{{ item["PEG"] && item["PEG"].toFixed(2) }}</span>
          <span>同比:{{ item["tbzz"] && item["tbzz"].toFixed(2) }}</span>
          <div style="float:right;margin-right:10px;">
            <span>{{ chooseDate || "--" }}</span>

            <input type="checkbox" v-model="showChooseDate" />
            <span>分析</span>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <webview
          ref="webview"
          id="figure"
          style="width:100%;height:100%;"
          :src="link"
        ></webview>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";

import $ from "jquery";
window.$ = $;

export default {
  name: "WinView",
  data: function() {
    return {
      openCode: null,
      openType: null,
      showChooseDate: false,
      chooseDate: ""
    };
  },
  props: {
    link: String,
    item: Object
  },
  mounted() {
    // initwebview(this.closeview.bind(this));

    const webview = document.querySelector("webview");

    webview.addEventListener("did-navigate-in-page", event => {
      if (webview.src && webview.src.indexOf("chooseDate")) {
        setTimeout(() => {
          this.chooseDate = webview.src.split("chooseDate=")[1];
        }, 100);
      }
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  },
  watch: {
    showChooseDate() {
      const webview = document.querySelector("webview");
      webview
        .getWebContents()
        .executeJavaScript(
          `window.showChooseDate=${this.showChooseDate};window.dispatchEvent(new Event('resize'))`
        );
    }
  },
  computed: {},
  methods: {
    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
      this.openCode = null;
    }
  }
};
</script>
<style scoped>
#dragBar {
  position: absolute;
  width: 100%;
  height: 5px;
  cursor: row-resize;
  text-align: center;
  border-top: 1px solid #1bc07d;
}
</style>

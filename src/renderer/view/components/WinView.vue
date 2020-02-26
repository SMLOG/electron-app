<template>
  <table style="height:100%;width:100%;background:white;">
    <tr v-if="item">
      <td style="height:27px;">
        <div>
          <div @dblclick="dbclick" style="float:left;">
            <span>{{ item.hy }}</span>
            <span>{{ item.forecast }}</span>
            <span>披露:{{ item.disclosure }}</span>
            <span>52周%:{{ item["52weekPer"] }}</span>
            <span>流通/亿:{{ item["ltg"] }}</span>
            <span>流/总:{{ item["lz"] }}</span>
            <span>TTM:{{ item["pe_ttm"] }}</span>
            <span>PEG:{{ item["PEG"] && item["PEG"].toFixed(2) }}</span>
            <span>同比:{{ item["tbzz"] && item["tbzz"].toFixed(2) }}</span>
          </div>
          <div style="float:right;margin-right:10px;">
            <span @click="showChooseDate2 = !showChooseDate2">{{
              chooseDate || "--"
            }}</span>

            <input type="checkbox" v-model="showChooseDate" />
            <span>分析</span>
            <div
              class="selectDate"
              ref="choose_date_ref"
              style="position:absolute;right:10px;"
              v-show="showChooseDate2"
            >
              <Calendar @choseDay="choseDay"></Calendar>
            </div>
          </div>
        </div>
        <div v-if="showChooseDate">
          <ul
            style="
    padding: 0;
    margin: 0;
    list-style: none;
    clear:both;
    display:block;
"
          >
            <li
              v-for="(v, f) in filters"
              :key="f"
              style="display:inline-block;margin:5px;margin-right;10px;"
              :class="{ y: item['_' + f] }"
            >
              {{ f }}
            </li>
          </ul>
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
import Calendar from "@/view/components/calendar";

import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";
import { filters, getCheckFilters, afilters } from "@/lib/filters";
import { callFun } from "@/lib/tech-manager";

import $ from "jquery";
window.$ = $;

export default {
  name: "WinView",
  data: function() {
    return {
      openCode: null,
      openType: null,
      showChooseDate: false,
      chooseDate: "",
      showChooseDate2: false,
      filters: filters
    };
  },
  props: {
    link: String,
    item: Object,
    dBclick: Function
  },
  components: {
    Calendar
  },
  mounted() {
    // initwebview(this.closeview.bind(this));

    const webview = document.querySelector("webview");
    webview.addEventListener("dom-ready", e => {
      this.sendValue();
    });
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
      this.sendValue();
    },
    chooseDate() {
      this.sendValue();
      this.analyst();
    }
  },
  computed: {},
  methods: {
    analyst() {
      (async () => {
        let fmtDate =
          this.chooseDate &&
          this.chooseDate
            .split(/[/\-]/)
            .map(e => (e.length == 1 ? "0" + e : e))
            .join("/");
        await callFun(this.item, fmtDate);
        console.log(this.item);
      })();
    },
    dbclick() {
      this.$emit("dBclick");
    },
    sendValue() {
      const webview = document.querySelector("webview");
      webview
        .getWebContents()
        .executeJavaScript(
          `window.showChooseDate=${
            this.showChooseDate ? 1 : 0
          };window.chooseDate='${
            this.chooseDate
          }';window.dispatchEvent(new Event('resize'))`
        );
    },
    choseDay(d) {
      this.chooseDate = d;
      this.showChooseDate2 = false;
    },
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
.y {
  color: red;
}
</style>

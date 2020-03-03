<template>
  <table style="height:100%;width:100%;background:white;">
    <tr v-if="item">
      <td style="height:27px;">
        <div>
          <div style="float:right;margin-right:10px;">
            <span
              class="button"
              v-if="chooseDate && (showChooseDate || cutChooseDate)"
              @click="prevChooseDate()"
              >前</span
            >

            <span
              class="button"
              v-if="chooseDate && (showChooseDate || cutChooseDate)"
              @click="nextChooseDate()"
              :class="{ gray: item.date <= chooseDate }"
              >后</span
            >
            <span
              ref="choose_date_ref"
              style="display:inline-block;width:120px;text-align:center;border-bottom:1px solid;"
            >
              <span
                style="width:100%;display:inline-block;"
                @click="showChooseDate2 = !showChooseDate2"
                >{{ chooseDate || "--" }} {{ weekday }}</span
              >
              <div
                class="selectDate"
                style="position:absolute;right:10px;"
                v-show="showChooseDate2"
              >
                <Calendar @choseDay="choseDay"></Calendar>
              </div>
            </span>

            <input type="checkbox" v-model="showChooseDate" />
            <span>分析</span>

            <input type="checkbox" v-model="cutChooseDate" />
            <span>截断</span>
          </div>
          <div @dblclick="dbclick">
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
              :class="{ y: aitem['_' + f] }"
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
import moment from "moment";

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
      cutChooseDate: false,
      filters: filters,
      aitem: Object.keys(filters)
        .map(e => "_" + e)
        .reduce((p, c) => {
          p[c] = false;
          return p;
        }, {})
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
    window.addEventListener("click", e => {
      if (this.$refs.choose_date_ref) {
        if (this.$refs.choose_date_ref.contains(e.target)) {
        } else {
          this.showChooseDate2 = false;
        }
      }
    });
    const webview = document.querySelector("webview");
    webview.addEventListener("dom-ready", e => {
      this.sendValue();
      this.analyst();
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
      this.analyst();
    },
    chooseDate() {
      this.sendValue();
      this.analyst();
    },
    cutChooseDate() {
      this.sendValue();
      this.analyst();
    }
  },
  computed: {
    weekday() {
      return this.chooseDate && moment(this.chooseDate).format("ddd");
    }
  },
  methods: {
    prevChooseDate() {
      let m = moment(this.chooseDate);
      do {
        m.subtract(1, "day");
      } while (m.isoWeekday() > 5);
      this.chooseDate = m.format("YYYY-MM-DD");
    },
    nextChooseDate() {
      if (item.date <= this.chooseDate) return;
      let m = moment(this.chooseDate);
      do {
        m.add(1, "day");
      } while (m.isoWeekday() > 5);
      this.chooseDate = m.format("YYYY-MM-DD");
    },
    analyst() {
      if (this.showChooseDate) {
        (async () => {
          let fmtDate =
            this.chooseDate &&
            this.chooseDate
              .split(/[/\-]/)
              .map(e => (e.length == 1 ? "0" + e : e))
              .join("/");
          Object.assign(this.aitem, { code: this.item.code });
          await callFun(this.aitem, fmtDate);
        })();
      }
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
          };window.chooseDate='${this.chooseDate}';window.cutChooseDate=${
            this.cutChooseDate ? 1 : 0
          };window.dispatchEvent(new Event('resize'))`
        );
    },
    choseDay(d) {
      this.showChooseDate2 = false;
      this.chooseDate = d;
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
</style>

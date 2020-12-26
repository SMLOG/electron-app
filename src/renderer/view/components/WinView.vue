<template>
  <div
    id="webviewWrap"
    ref="webviewWrap"
    class="webview"
    :style="{ top: chartop + 'px' }"
    :class="{ fullFigure: fullFigure }"
  >
    <div id="dragBar" ref="dragBar" v-drag draggable="false">
      <i
        @click="$emit('close')"
        style="
          position: relative;
          top: -10px;
          cursor: pointer;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          border-left: none;
          border-right: none;
          height: 1px;
          width: 30px;
          display: inline-block;
          font-size: 1px;
        "
      ></i>
      <i
        v-if="false"
        class="arrow down"
        style="position: relative; top: -10px; cursor: pointer"
      ></i>
    </div>
    <table
      style="height:100%;width:100%;background:white;cellpadding=0;cellspacing	
=0;"
    >
      <tr v-if="item">
        <td style="height: 27px">
          <div>
            <div @dblclick="dbclick" class="info">
              <span>{{ item.name }}</span>
              <span>{{ item.hy }}</span>
              <span v-if="item.forecast">{{ item.forecast }}</span>
              <span>披露:{{ item.disclosure }}</span>
              <span>流通/亿:{{ $fmtNumber(item["ltg"]) }}</span>
              <span>流/总:{{ $fmtNumber(item["lz"]) }}</span>
              <span>TTM:{{ item["pe_ttm"] }}</span>
              <span>PEG:{{ item["PEG"] && item["PEG"].toFixed(2) }}</span>
              <span>同比:{{ item["tbzz"] && item["tbzz"].toFixed(2) }}</span>
              <span>换手率:{{ item["turnover"] }}%</span>
              <span :class="{ up: item.lb > 1, down: item.lb < 1 }"
                >量比:{{ item["lb"] }}</span
              >
              <span>低:{{ item["low"] }}</span>
              <span>高:{{ item["high"] }}</span>
              <span>振幅:{{ item["zf"] }}%</span>
              <span>成交额:{{ (item.amount / 100000000).toFixed(2) }}亿</span>
              <span :title="item.score_desc"
                >分数:{{ item.score }}/{{ item.tscore }}</span
              >
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <iframe
            ref="webview"
            id="webview"
            style="width: 100%; height: 100%; border: none"
            :src="src"
          ></iframe>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { setCookie, getCookie } from "@/lib/utils";

import _ from "lodash";

export default {
  name: "WinView",
  data: function () {
    return {
      fullFigure: false,
      src: "about:_blank",
      chartop: 200,
    };
  },
  props: {
    link: [String, Function],
    item: Object,
    dBclick: Function,
    updateLink: Function,
  },
  directives: {
    drag(el) {
      let oDiv = $(el).parent()[0];
      let self = this;
      /*document.onselectstart = function () {
        return false;
      };*/
      el.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        let winH = $(window).outerHeight();
        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          // target.style.left = l + "px";
          if (t <= 0) t = 0;
          else if (t >= winH) t = winH - 8;
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
          setCookie(
            "charTop",
            ($(window).outerHeight() - $(oDiv).outerHeight()) /
              $(window).outerHeight()
          );
        };
        //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    },
  },

  watch: {
    item(n, o) {
      if (n != null && (o == null || o.code == null)) {
        this.chartop =
          Math.min(getCookie("charTop", 0.6), 0.9) * $(window).height();
      }
      this.openlink(n, this.link);
    },
    link(n, o) {
      this.openlink(this.item, n);
    },
  },
  computed: {},
  methods: {
    openlink(item, link) {
      if (item && link) {
        let url = _.isFunction(link)
          ? link(item)
          : link.replace("{{code}}", this.item.code);
        this.src = "about:_blank";
        setTimeout(() => {
          this.src = url;
        }, 5);
      }
    },
    dbclick() {
      this.$emit("dBclick");
    },

    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
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
table,
tr,
td {
  padding: 0;
  margin: 0;
}
.webview {
  position: fixed;
  width: 1200px;
  right: 0;
  bottom: 0;
  top: 60%;
  z-index: 4;
  transition: top 0.5s;
  -webkit-transition: top 0.5s; /* Safari */
  transition: left 0.5s;
  -webkit-transition: left 0.5s; /* Safari */
}
</style>

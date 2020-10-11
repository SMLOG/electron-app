<template>
  <div class="main-right fr" id="r-box-table">
    <table class="wbc-table">
      <tr>
        <td class="wb-td">
          委比：<span :class="upDown(item.weiby, 0)" class="wb" id="quote-cr">{{
            item.weiby
          }}</span>
        </td>
        <td class="wc-td">
          委差：<span
            :class="upDown(item['委差'], 0)"
            class="wc"
            id="quote-cd"
            >{{ item["委差"] }}</span
          >
        </td>
      </tr>
    </table>

    <div class="mm-fb-table">
      <table id="buy-table" class="sell5">
        <tr class="is-hide">
          <td class="label">涨停</td>
          <td class="mm-price">
            <span id="quote-raisePrice-main">{{ item["涨停"] }}</span>
          </td>
          <td class=""></td>
          <td class="last-td"></td>
          <td class=""></td>
        </tr>

        <tr v-for="i in 5" :key="i" :class="{ 'is-hide': i < 5 }">
          <td class="label">卖{{ 6 - i }}</td>
          <td class="mm-price">
            <span id="quote-s1p" :class="upDown(item[`sell${6 - i}`])">{{
              item[`sell${6 - i}`]
            }}</span>
          </td>
          <td class="power">
            <div id="quote-s1vp" class="gdnl-box"></div>
          </td>
          <td class="last-td">
            <span id="quote-s1v">{{
              kcbMyformatNum(item[`sell${6 - i}Volume`])
            }}</span>
          </td>
          <td class="diff" id="quote-s1d"></td>
        </tr>
      </table>

      <table id="sell-table" class="buy5">
        <tr v-for="i in (1, 5)" :key="i" :class="{ 'is-hide': i > 1 }">
          <td class="label">买{{ i }}</td>
          <td class="mm-price">
            <span id="quote-b1p" :class="upDown(item['buy' + i])">{{
              item["buy" + i]
            }}</span>
          </td>
          <td class="power">
            <div id="quote-b1vp" class="gdnl-box"></div>
          </td>
          <td class="last-td">
            <span id="quote-b1v">{{
              kcbMyformatNum(item[`buy${i}Volume`])
            }}</span>
          </td>
          <td class="diff" id="quote-b1d"></td>
        </tr>

        <tr class="is-hide">
          <td class="label">跌停</td>
          <td class="mm-price">
            <span id="quote-fallPrice-main">{{ item["跌停"] }}</span>
          </td>
          <td class=""></td>
          <td class="last-td"></td>
          <td class=""></td>
        </tr>
      </table>

      <div class="detail-box is-hide">
        <div class="tips-box" id="tips-box">
          <span><b class="purple-b"></b>大于20万外盘</span>
          <span><b class="blue-b"></b>大于20万内盘</span>
        </div>
        <div id="deal_detail" class="deal_detail"></div>
        <p class="msg-more" id="detail-msg-more">
          <a href="" target="_blank">点击查看更多分时成交</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import storejs from "storejs";
import { kcbMyformatNum, formatNum, formatHead } from "./format";
import Chart from "./Chart";
import Head from "./Head";
var utils = require("./h5c/em-utils");
var cookie = utils.cookie;
import _ from "lodash";
import $ from "jquery";
window.$ = $;

export default {
  props: {
    item: Object,
  },
  data() {
    return {};
  },

  methods: {
    formatNum(n) {
      return formatNum(n);
    },
    kcbMyformatNum(n) {
      return kcbMyformatNum(n);
    },
    upDown(v1, v2) {
      if (!v2) v2 = this.item.preClose;
      if (v1 > v2) return "red";
      else if (v1 < v2) return "green";
      else return "";
    },
  },

  computed: {},
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
</style>


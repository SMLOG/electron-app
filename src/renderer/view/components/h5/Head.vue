<template>
  <div class="hq-data clearfix">
    <div class="fl hq-data-zxj">
      <span v-if="false" id="quote-name" class="stock-name">----</span>
      <span v-if="false" id="quote-code" class="stock-code"></span>
      <span class="zxj"
        ><b id="quote-close-main"></b><b class="" id="quote-arrow"></b
      ></span>
      <span title="停牌" class="tp-box" id="quote-close-tp"></span>
      <span id="quote-change-main" class="zde">-</span>
      <span id="quote-changePercent-main" class="zdf">-</span>
    </div>
    <div id="h5chartheadwrap">
      <table class="clearfix hq-data-table fl">
        <tr>
          <td>
            今开：<span
              class="jk quote-open-custom"
              id="quote-open-custom"
              :class="upDown(item.open)"
              >{{ item.open }}</span
            >
          </td>
          <td>
            最高：<span
              class="zg quote-high-custom"
              id="quote-high-custom"
              :class="upDown(item.high)"
              >{{ item.high }}</span
            >
          </td>
          <td>
            涨停：<span
              class="zt quote-raisePrice-custom"
              id="quote-raisePrice-custom"
              >-</span
            >
          </td>
          <td>
            换手：<span
              class="hs quote-turnoverRate-custom"
              id="quote-turnoverRate-custom"
              >{{ item.turnover }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            昨收：<span class="zs quote-pc" id="quote-pc">{{
              item.preClose
            }}</span>
          </td>
          <td>
            最低：<span
              class="zd quote-low-custom"
              id="quote-low-custom"
              :class="upDown(item.low)"
              >{{ item.low }}</span
            >
          </td>
          <td>
            跌停：<span
              class="dt quote-fallPrice-custom"
              id="quote-fallPrice-custom"
              >-</span
            >
          </td>
          <td>
            量比：<span
              class="lb quote-volumeRate-custom"
              id="quote-volumeRate-custom"
              >{{ item["lb"] }}</span
            >
          </td>
        </tr>
      </table>
      <table class="clearfix hq-data-table fl">
        <tr>
          <td>
            成交量：<span
              class="cjl quote-volume-custom"
              id="quote-volume-custom"
              >{{ formatNum(item["volume"]) }} 手</span
            >
          </td>
          <td>
            市盈：<span
              class="sy quote-PERation-custom"
              id="quote-PERation-custom"
              >{{ item["pe"] }}</span
            >
          </td>
          <td>
            总市值：<span
              class="zsz quote-marketValue-custom"
              id="quote-marketValue-custom"
              >{{ formatNum(item["totalValue"]) }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            成交额：<span
              class="cje quote-amount-custom"
              id="quote-amount-custom"
              >{{ formatNum(item["amount"]) }}</span
            >
          </td>
          <td>
            市净：<span class="sj quote-PB-custom" id="quote-PB-custom">{{
              item["pb"]
            }}</span>
          </td>
          <td>
            流通市值：<span
              class="ltsz quote-flowCapitalValue-custom"
              id="quote-flowCapitalValue-custom"
              >{{ formatNum(item["flowValue"]) }}</span
            >
          </td>
        </tr>
      </table>
    </div>

    <!-- 创业板专用 -->
    <div id="h5chartheadwrapcyb" style="display: none">
      <table class="clearfix hq-data-table fl">
        <tr>
          <td>今开：<span class="jk" id="quote-open-custom">-</span></td>
          <td>最高：<span class="zg" id="quote-high-custom">-</span></td>
          <td>
            换手：<span class="hs" id="quote-turnoverRate-custom">-</span>
          </td>
          <td>成交量：<span class="cjl" id="quote-volume-custom">-</span></td>
          <td>
            市盈率ttm：<span class="sy" id="quote-PERation-custom">-</span>
          </td>
          <td>盈利：<span class="yl" id="quote-YL-custom">-</span></td>
          <td>是否注册制：<span class="zcz" id="quote-ZCZ-custom">-</span></td>
        </tr>
        <tr>
          <td>昨收：<span class="zs quote-pc" id="quote-pc">-</span></td>
          <td>最低：<span class="zd" id="quote-low-custom">-</span></td>
          <td>量比：<span class="lb" id="quote-volumeRate-custom">-</span></td>
          <td>成交额：<span class="cje" id="quote-amount-custom">-</span></td>
          <!-- <td>市净：<span class="zsz quote-marketValue-custom" id="quote-marketValue-custom">-</span></td> -->
          <td>
            总市值：<span class="zsz" id="quote-marketValue-custom">-</span>
          </td>
          <!-- <td>同股同权：<span class="tgtq quote-TGTQ-custom" id="quote-TGTQ-custom">-</span></td> -->
          <td>
            表决权差异：<span class="tgtq" id="quote-BJCY-custom">-</span>
          </td>
          <td>
            协议控制架构：<span class="xyjg" id="quote-XYJG-custom">-</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { kcbMyformatNum, formatNum, formatHead } from "./format";
import _ from "lodash";
import $ from "jquery";
window.$ = $;

export default {
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {
      ph_tab: false,
    };
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


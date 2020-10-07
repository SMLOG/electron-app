<template>
  <div class="hq-data clearfix">
    <ul>
      <li :class="upDown(item.close)" class="price">
        <b>{{ item.close }}</b>
        (<span>{{ item.change > 0 ? "+" : "" }}{{ item.change }}</span
        >)
        <span>{{ item.changeP }}%</span>
      </li>
      <li>
        今开：<span :class="upDown(item.open)">{{ item.open }}</span>
      </li>
      <li>
        昨收：<span>{{ item.preClose }}</span>
      </li>
      <li>
        最高：<span :class="upDown(item.high)">{{ item.high }}</span>
      </li>
      <li>
        最低：<span :class="upDown(item.low)">{{ item.low }}</span>
      </li>
      <li>
        换手：<span>{{ item.turnover }}</span>
      </li>

      <li>
        量比：<span>{{ item["lb"] }}</span>
      </li>
      <li>
        成交量：<span>{{ formatNum(item["volume"]) }}手</span>
      </li>
      <li>
        成交额：<span>{{ formatNum(item["amount"]) }}</span>
      </li>
      <li>
        市盈：<span>{{ item["pe"] }}</span>
      </li>
      <li>
        市净：<span>{{ item["pb"] }}</span>
      </li>
      <li>
        总市值：<span>{{ formatNum(item["totalValue"]) }}</span>
      </li>
      <li>
        流通市值：<span>{{ formatNum(item["flowValue"]) }}</span>
      </li>
    </ul>
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
.hq-data li {
  float: left;
  padding-right: 5px;
  line-height: 2em;
}
.price {
  font-weight: bold;
}
</style>


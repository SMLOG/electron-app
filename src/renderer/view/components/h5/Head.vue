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
              :class="upDown(item2.open)"
              >{{ item2.open }}</span
            >
          </td>
          <td>
            最高：<span
              class="zg quote-high-custom"
              id="quote-high-custom"
              :class="upDown(item2.high)"
              >{{ item2.high }}</span
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
              >{{ item2.turnover }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            昨收：<span class="zs quote-pc" id="quote-pc">{{
              item2.preClose
            }}</span>
          </td>
          <td>
            最低：<span
              class="zd quote-low-custom"
              id="quote-low-custom"
              :class="upDown(item2.low)"
              >{{ item2.low }}</span
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
              >{{ item2["lb"] }}</span
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
              >{{ formatNum(item2["volume"]) }} 手</span
            >
          </td>
          <td>
            市盈：<span
              class="sy quote-PERation-custom"
              id="quote-PERation-custom"
              >{{ item2["pe"] }}</span
            >
          </td>
          <td>
            总市值：<span
              class="zsz quote-marketValue-custom"
              id="quote-marketValue-custom"
              >{{ formatNum(item2["totalValue"]) }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            成交额：<span
              class="cje quote-amount-custom"
              id="quote-amount-custom"
              >{{ formatNum(item2["amount"]) }}</span
            >
          </td>
          <td>
            市净：<span class="sj quote-PB-custom" id="quote-PB-custom">{{
              item2["pb"]
            }}</span>
          </td>
          <td>
            流通市值：<span
              class="ltsz quote-flowCapitalValue-custom"
              id="quote-flowCapitalValue-custom"
              >{{ formatNum(item2["flowValue"]) }}</span
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
      item2: { open: "" },
    };
  },
  methods: {
    toggleFQ(event, bool) {
      this.showFQ = !this.showFQ;
      event.preventDefault();
      return false;
    },
    setFQ(type) {
      this.复权 == type;
      storejs.set("复权", type);
    },
    upDown(v1, v2) {
      if (!v2) v2 = this.item2.preClose;
      if (v1 > v2) return "red";
      else if (v1 < v2) return "green";
      else return "";
    },
    getheadInfo() {
      var url =
        "//" +
        (Math.floor(Math.random() * 99) + 1) +
        ".push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531,f59&secid=" +
        this.getSecid();

      $.ajax({
        url: url,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "cb",
        success: (json) => {
          if (json.data) {
            let d = json.data;
            this.formatHead(d);
            this.sseHeadData();
          }
        },
      });
    },
    formatHead(d) {
      this.item2 = Object.assign(this.item2, formatHead(d));
    },
    kcbMyformatNum(num) {
      return kcbMyformatNum(num);
    },
    formatNum(num) {
      return formatNum(num);
    },
    getSecid() {
      return this.item.code.replace(/sh/, "1.").replace(/sz/, "0.");
    },
    getstockinfos() {
      var _url =
        "//push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&" +
        "fltt=2&fields=f107,f111,f279,f288,f293,f294,f292,f295&secid=" +
        this.getSecid() +
        "&cb=?";

      return $.ajax({
        async: false,
        url: _url,
        dataType: "jsonp",
        jsonp: "cb",
      }).then((json) => {
        var data = json.data;
        data.f292 == 11 && (this.state = "pre");
        data.f292 == 12 && (this.state = "next");
        data.f292 == 5 && (this.state = "close");
        data.f292 == 2 && (this.state = "open");

        //创业板
        if (data.f107 == 0 && data.f111 == 80) {
        } else {
          this.show_head = true;
          this.ph_tab = false;
        }
        setTimeout(() => {
          this.getheadInfo();
        }, 10);
      });
    },
    sseHeadData() {
      var secids = this.getSecid();
      var url =
        "//" +
        (Math.floor(Math.random() * 99) + 1) +
        ".push2.eastmoney.com/api/qt/stock/sse?ut=fa5fd1943c7b386f172d6893dbfba10b&fltt=2&invt=2&volt=2&fields=f152,f288,f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f198,f259,f260,f261,f171,f277,f278,f279,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f20,f19,f18,f17,f16,f15,f14,f13,f12,f11,f531&secid=" +
        secids;
      var sseHeadData_evtSource = this.sseHeadData_evtSource;
      sseHeadData_evtSource &&
        (sseHeadData_evtSource.close(), (sseHeadData_evtSource = null));
      this.sseHeadData_evtSource = sseHeadData_evtSource = new EventSource(url);
      sseHeadData_evtSource.onmessage = (msg) => {
        var obj = JSON.parse(msg.data);
        if (obj.data) {
          this.formatHead(obj.data);
        }
      };
    },
  },

  mounted() {
    this.getstockinfos();
  },
  computed: {},
  watch: {
    item(n) {
      if (n) {
        this.getstockinfos();
      }
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


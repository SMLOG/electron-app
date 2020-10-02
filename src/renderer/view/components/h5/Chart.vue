<template>
  <div class="mywrap">
    <div class="wrap clearfix">
      <div class="l-box fl">
        <div id="top">
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
            <div id="h5chartheadwrap" v-show="show_head">
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
                    市净：<span
                      class="sj quote-PB-custom"
                      id="quote-PB-custom"
                      >{{ item2["pb"] }}</span
                    >
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
                  <td>
                    今开：<span class="jk" id="quote-open-custom">-</span>
                  </td>
                  <td>
                    最高：<span class="zg" id="quote-high-custom">-</span>
                  </td>
                  <td>
                    换手：<span class="hs" id="quote-turnoverRate-custom"
                      >-</span
                    >
                  </td>
                  <td>
                    成交量：<span class="cjl" id="quote-volume-custom">-</span>
                  </td>
                  <td>
                    市盈率ttm：<span class="sy" id="quote-PERation-custom"
                      >-</span
                    >
                  </td>
                  <td>盈利：<span class="yl" id="quote-YL-custom">-</span></td>
                  <td>
                    是否注册制：<span class="zcz" id="quote-ZCZ-custom">-</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    昨收：<span class="zs quote-pc" id="quote-pc">-</span>
                  </td>
                  <td>最低：<span class="zd" id="quote-low-custom">-</span></td>
                  <td>
                    量比：<span class="lb" id="quote-volumeRate-custom">-</span>
                  </td>
                  <td>
                    成交额：<span class="cje" id="quote-amount-custom">-</span>
                  </td>
                  <!-- <td>市净：<span class="zsz quote-marketValue-custom" id="quote-marketValue-custom">-</span></td> -->
                  <td>
                    总市值：<span class="zsz" id="quote-marketValue-custom"
                      >-</span
                    >
                  </td>
                  <!-- <td>同股同权：<span class="tgtq quote-TGTQ-custom" id="quote-TGTQ-custom">-</span></td> -->
                  <td>
                    表决权差异：<span class="tgtq" id="quote-BJCY-custom"
                      >-</span
                    >
                  </td>
                  <td>
                    协议控制架构：<span class="xyjg" id="quote-XYJG-custom"
                      >-</span
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="rk-box mt10" id="rk-box">
            <ul class="fl k-box" id="type-selector">
              <template
                v-for="(t, name) in {
                  盘前: 'cr',
                  分时: 'r',
                  日K: 'k',
                  '5日': {
                    '1日': 'r',
                    '2日': 't2',
                    '3日': 't3',
                    '4日': 't4',
                    '5日': 't5',
                  },
                  周K: 'wk',
                  月K: 'mk',
                  '5分钟': 'm5k',
                  '15分钟': 'm15k',
                  '30分钟': 'm30k',
                  '60分钟': 'm60k',
                }"
              >
                <li
                  :key="name"
                  v-if="name == '5日'"
                  class="rk-a"
                  id="day-selector"
                >
                  <span
                    ><span data-type="t5" class="selected-box dataType"
                      >5日</span
                    ><span class="click-icon"><i class="select-icon"></i></span
                  ></span>
                  <div class="rk-options">
                    <span
                      v-for="(t5, name5) in t"
                      :key="name5"
                      :data-type="t5"
                      class="data-type"
                      >{{ name5 }}</span
                    >
                  </div>
                </li>
                <li
                  v-else
                  :key="name"
                  :data-type="t"
                  @click="curType = t"
                  :class="{ cur: curType == t }"
                  class="dataType"
                >
                  {{ name }}
                </li>
              </template>
            </ul>
            <ul
              class="fr r-box"
              id="kchart-toolbar"
              :curType="curType"
              :style="{ display: curType.indexOf('k') > -1 ? 'block' : 'none' }"
            >
              <li class="cmfb-li" id="btn-cyq">筹码分布</li>
              <li class="rk-a cur" id="select-authority">
                <span
                  ><span
                    class="selected-box"
                    value=""
                    @click.stop="toggleFQ($event, false)"
                    >{{
                      复权 == "fa"
                        ? "前复权"
                        : 复权 == "ba"
                        ? "后复权"
                        : "不复权"
                    }}</span
                  ><i class="select-icon"></i
                ></span>
                <div
                  class="rk-options k-options"
                  id="authority-options"
                  :style="{ display: showFQ ? 'block' : 'none' }"
                >
                  <span
                    value="fa"
                    :class="{ cur: 复权 == 'fa' }"
                    @click="复权 = 'fa'"
                    >前复权</span
                  >
                  <span
                    value="ba"
                    :class="{ cur: 复权 == 'ba' }"
                    @click="复权 = 'ba'"
                    >后复权</span
                  >
                  <span :class="{ cur: 复权 == '' }" @click="复权 = ''"
                    >不复权</span
                  >
                </div>
              </li>
              <li id="btn-drawback">缩短</li>
              <li id="btn-stretchout">拉长</li>
            </ul>
          </div>
        </div>
        <div
          id="chart-container"
          class="chart-box mt10"
          data-charttype="r"
          tabindex="-1"
          :style="{ height: chartHeight + 'px' }"
        ></div>
      </div>
      <div class="main-right fr" id="r-box-table">
        <table class="wbc-table">
          <tr>
            <td class="wb-td">
              委比：<span
                :class="upDown(item2.weiby, 0)"
                class="wb"
                id="quote-cr"
                >{{ item2.weiby }}</span
              >
            </td>
            <td class="wc-td">
              委差：<span
                :class="upDown(item2['委差'], 0)"
                class="wc"
                id="quote-cd"
                >{{ item2["委差"] }}</span
              >
            </td>
          </tr>
        </table>

        <div class="mm-fb-table">
          <table id="buy-table" class="sell5">
            <tr class="is-hide">
              <td class="label">涨停</td>
              <td class="mm-price">
                <span id="quote-raisePrice-main">{{ item2["涨停"] }}</span>
              </td>
              <td class=""></td>
              <td class="last-td"></td>
              <td class=""></td>
            </tr>

            <tr v-for="i in 5" :key="i" :class="{ 'is-hide': i < 5 }">
              <td class="label">卖{{ 6 - i }}</td>
              <td class="mm-price">
                <span id="quote-s1p" :class="upDown(item2[`sell${6 - i}`])">{{
                  item2[`sell${6 - i}`]
                }}</span>
              </td>
              <td class="power">
                <div id="quote-s1vp" class="gdnl-box"></div>
              </td>
              <td class="last-td">
                <span id="quote-s1v">{{
                  kcbMyformatNum(item2[`sell${6 - i}Volume`])
                }}</span>
              </td>
              <td class="diff" id="quote-s1d"></td>
            </tr>
          </table>

          <table id="sell-table" class="buy5">
            <tr v-for="i in (1, 5)" :key="i" :class="{ 'is-hide': i > 1 }">
              <td class="label">买{{ i }}</td>
              <td class="mm-price">
                <span id="quote-b1p" :class="upDown(item2['buy' + i])">{{
                  item2["buy" + i]
                }}</span>
              </td>
              <td class="power">
                <div id="quote-b1vp" class="gdnl-box"></div>
              </td>
              <td class="last-td">
                <span id="quote-b1v">{{
                  kcbMyformatNum(item2[`buy${i}Volume`])
                }}</span>
              </td>
              <td class="diff" id="quote-b1d"></td>
            </tr>

            <tr class="is-hide">
              <td class="label">跌停</td>
              <td class="mm-price">
                <span id="quote-fallPrice-main">{{ item2["跌停"] }}</span>
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
    </div>
  </div>
</template>
<script>
import axios from "axios";
import storejs from "storejs";
//var canvasExtension = require("chart/common/canvasExtension");
var canvasExtension = require("./ec/webpack/emcharts");
//var imgpng = require("images/water_mark.png");
const h5chart = require("./h5c/h5chart");
import { kcbMyformatNum, formatNum, formatHead } from "./format";

var utils = require("./h5c/em-utils");
var cookie = utils.cookie;
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
      chartHeight: 0,
      复权: storejs.get("复权") || "fa",
      showFQ: 0,
      state: "open",
      show_head: false,
      ph_tab: false,
      curType: "k",
      item2: formatHead({}, true),
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
      Object.assign(this.item2, formatHead(d));
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
    getExrightsType() {
      var type = cookie("emhq_picfq");
      switch (type) {
        case "0":
          return "";
        case "1":
          return "fa";
        case "2":
          return "ba";
        default:
          return "fa";
      }
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
    resize() {
      this.chartHeight =
        $(this.$el).height() - $("#top", this.$el).outerHeight() - 10;

      var offset_tips_h = $("#deal_detail").offset().top;
      var msg_h = $("#detail-msg-more").height();
      var _height = $(window).height() - offset_tips_h - msg_h;
      if (_height <= 90) {
        _height = 90;
      }
      $("#deal_detail").height(_height);
    },
    loadchart(item) {
      if (item) {
        let query = {
          code: item.code.replace(/[a-z]+/gi, ""),
          market: item.code.indexOf("sh") > -1 ? 1 : 0,
          type: this.curType,
        };
        //this.getstockinfos();

        let type = this.curType || "r";

        var _width, _height;

        _height = $("#chart-container").height();
        _width = $("#chart-container").width();

        var authority = this.getExrightsType();
        var stockentry = {
          code: query.code,
          marketnum: query.market,
          shortmarket: query.market == "1" ? "sh" : "sz",
          id: query.id || query.code + query.market,
          newmarket: query.market == "1" ? "1" : "0", //1sh 0sz
        };
        var stock_state = "close";
        var options = {
          entry: stockentry,
          type: type,
          width: _width,
          height: _height,
          iscr: stock_state == "pre",
          authorityType: authority,
          update: stock_state == "close" ? -1 : 60 * 1000, //
          padding: {
            top: 0,
            bottom: 20,
          },
          show: { indicatorArea: true },
          onComplete: function () {
            $("#chart-container").trigger("drawComplete.emchart");
          },
          // update: 60 * 1000
        };

        new h5chart(query).init(options);
        //this.getheadInfo();
      }
    },
  },

  mounted() {
    /* let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//emcharts.dfcfw.com/ec/3.16.1/emcharts.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = () => {*/
    //};
    this.resize();
    $(window).resize(() => {
      this.resize();
    });
    this.loadchart(this.item || { code: "sh600566" });
    $(document).click(() => {
      this.showFQ = 0;
    });
  },
  computed: {},
  watch: {
    item(n) {
      this.resize();

      this.loadchart(n);
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
#top {
  height: 96px;
}
.mywrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


<template>
  <div class="mywrap">
    <div class="wrap clearfix">
      <div class="l-box fl">
        <Head :item="item2" />
        <Chart :item="item" />
      </div>
      <Right :item="item2" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import storejs from "storejs";

import { kcbMyformatNum, formatNum, formatHead } from "./format";
import Chart from "./Chart";
import Head from "./Head";
import Right from "./Right";

var utils = require("./h5c/em-utils");
var cookie = utils.cookie;
import _ from "lodash";
import $ from "jquery";
window.$ = $;

export default {
  components: { Chart, Head, Right },
  props: {
    item: Object,
  },
  data() {
    return {
      state: "open",
      item2: formatHead({}, true),
    };
  },

  methods: {
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

.mywrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


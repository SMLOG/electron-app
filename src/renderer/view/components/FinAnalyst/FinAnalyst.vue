<template>
  <div class="main">
    <div>
      <div>
        <div class="qphox">
          <div class="sckifbox">
            <div class="scklox">
              <div class="cnt">
                <p class="key">
                  <b>
                    <a href="http://quote.eastmoney.com/600332.html" target="_blank">
                      <span id="hq_1">{{ item.name }}</span>
                    </a>
                  </b>
                  <a href="http://quote.eastmoney.com/600332.html" target="_blank">{{ item.code }}</a>
                </p>
              </div>
            </div>
            <div class="sckrox">
              <div class="upox">
                <div class="cnt tof10">
                  <ul>
                    <li class="a">
                      <span class="jssz" id="hq_2">{{ item.close }}</span>
                    </li>
                    <li class="b" style="width:95px">
                      <b id="hq_33"></b>
                      <span class="jssz" id="hq_3">{{ item.change }}</span>
                    </li>
                    <li class="c" style="width:80px">
                      <span class="jssz" id="hq_4">{{ item.changeP }}</span>
                    </li>
                    <li class="d">
                      <span>成交量：</span>
                      <span class="jsszo" id="hq_5">{{ item.volume }}</span>
                      <span>(手)</span>
                    </li>
                    <li class="e" style="width:165px">
                      成交额：
                      <span class="jsszo" id="hq_6">{{ item.amount }}</span>(万元)
                    </li>
                    <li class="f">
                      <span id="hq_7"></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="dnox">
                <div class="cnt">
                  <ul>
                    <li>
                      今开:
                      <span id="hq_8">{{ item.open }}</span>
                    </li>
                    <li>
                      昨收:
                      <span id="hq_9">{{ item.preClose }}</span>
                    </li>
                    <li>
                      最高:
                      <span id="hq_10">{{ item.high }}</span>
                    </li>
                    <li>
                      最低:
                      <span id="hq_11">{{ item.low }}</span>
                    </li>
                    <li>
                      换手:
                      <span id="hq_12">{{ item.turnOver }}</span>
                    </li>
                    <li>
                      市盈:
                      <span id="hq_13">{{ item.pe_ttm }}</span>
                    </li>
                    <li>
                      量比:
                      <span id="hq_14">{{ item.lb }}</span>
                    </li>
                    <li>
                      振幅:
                      <span id="hq_15">{{ item.zf }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="divBody">
      <div class="subnav">
        <a id="zyzb_a" @click="goAnchor('zyzb');">主要指标</a>
        <samp>|</samp>
        <a id="dbfx_a" @click="goAnchor('dbfx');" class>杜邦分析</a>
        <samp>|</samp>
        <a id="zcfzb_a" @click="goAnchor('zcfzb');" class>资产负债表</a>
        <samp>|</samp>
        <a id="lrb_a" @click="goAnchor('lrb');" class>利润表</a>
        <samp>|</samp>
        <a id="xjllb_a" @click="goAnchor('xjllb');" class>现金流量表</a>
        <samp>|</samp>
        <a id="bfbbb_a" @click="goAnchor('bfbbb');" class>百分比报表</a>
      </div>
      <Main id="zyzb" v-if="item.code" :item="item" />
      <DuPont id="dbfx" v-if="item.code" :item="item" />
      <Balance id="zcfzb" v-if="item.code" :item="item" name="资产负债表" />
      <Balance id="lrb" v-if="item.code" :item="item" name="利润表" />
      <Balance id="xjllb" v-if="item.code" :item="item" name="现金流量表" />
      <Percent id="bfbbb" v-if="item.code" :item="item" />
    </div>
  </div>
</template>
<script>
import jsonp from "jsonp";
import Main from "./Main";
import DuPont from "./DuPont";
import Balance from "./Balance";
import Percent from "./Percent";
import $ from "jquery";
window.$ = $;

export default {
  name: "FinAnalyst",
  data() {
    return { item: { name: "" } };
  },
  components: { Main, DuPont, Balance, Percent },

  methods: {
    goAnchor(selector) {
      let el = this.$el.querySelector("#" + selector);
      el && window.scrollTo(0, el.offsetTop - $(".subnav").outerHeight());
    },
    refresh() {
      var codem = this.item.code;

      codem =
        codem.toLowerCase().indexOf("sz") >= 0
          ? codem.toLowerCase().replace("sz", "0.")
          : codem.toLowerCase().replace("sh", "1.");
      var url =
        "https://push2.eastmoney.com/api/qt/stock/get?secid=" +
        codem +
        "&ut=f057cbcbce2a86e2866ab8877db1d059" +
        "&fields=f57,f58,f43,f169,f170,f168,f47,f48,f86,f46,f44,f60,f45,f168,f164,f50,f171&np=1&fltt=2&invt=2";
      jsonp(url, { param: "cb" }, (err, json) => {
        if (!err) {
          if (!json || !json.data || !json.data.f58) return;

          var temp = json.data;
          Object.assign(this.item, {
            name: temp.f58,
            close: temp.f43,
            change: temp.f169,
            changeP: temp.f170,
            volume: temp.f47,
            amount: (temp.f48 / 10000).toFixed(0),
            date: new Date(temp.f86 * 1000),
            open: temp.f46,
            high: temp.f44,
            preClose: temp.f60,
            low: temp.f45,
            turnOver: temp.f168,
            pe_ttm: temp.f164,
            lb: temp.f50,
            zf: temp.f171,
          });
        }
      });
    },
  },

  mounted() {
    this.item.code = this.$route.params.code || "SH600332";
    this.refresh();
    setInterval(() => {
      this.refresh();
    }, 3000);

    $(window).scroll(function () {
      var a = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      if (a > 77) {
        $(".subnav").addClass("tip-nav");
      } else {
        $(".subnav").removeClass("tip-nav");
      }
    });
  },
};
</script>

<style scoped src="./web.css" />
<style scoped>
div {
  font-size: 14px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>

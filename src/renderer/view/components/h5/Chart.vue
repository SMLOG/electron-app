<template>
  <div class="page-container">
    <div class="container body-content">
      <div class="wrap clearfix">
        <div class="l-box fl">
          <div class="hq-data clearfix">
            <div class="fl hq-data-zxj">
              <span id="quote-name" class="stock-name">----</span>
              <span id="quote-code" class="stock-code"></span>
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
                      >-</span
                    >
                  </td>
                  <td>
                    最高：<span
                      class="zg quote-high-custom"
                      id="quote-high-custom"
                      >-</span
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
                      >-</span
                    >
                  </td>
                  <td>
                    成交量：<span
                      class="cjl quote-volume-custom"
                      id="quote-volume-custom"
                      >-</span
                    >
                  </td>
                  <td>
                    市盈：<span
                      class="sy quote-PERation-custom"
                      id="quote-PERation-custom"
                      >-</span
                    >
                  </td>
                  <td>
                    总市值：<span
                      class="zsz quote-marketValue-custom"
                      id="quote-marketValue-custom"
                      >-</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    昨收：<span class="zs quote-pc" id="quote-pc">-</span>
                  </td>
                  <td>
                    最低：<span
                      class="zd quote-low-custom"
                      id="quote-low-custom"
                      >-</span
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
                      >-</span
                    >
                  </td>
                  <td>
                    成交额：<span
                      class="cje quote-amount-custom"
                      id="quote-amount-custom"
                      >-</span
                    >
                  </td>
                  <td>
                    市净：<span class="sj quote-PB-custom" id="quote-PB-custom"
                      >-</span
                    >
                  </td>
                  <td>
                    流通市值：<span
                      class="ltsz quote-flowCapitalValue-custom"
                      id="quote-flowCapitalValue-custom"
                      >-</span
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
              <li data-type="cr" class="dataType">盘前</li>
              <li
                data-type="ar"
                id="fs_ph_tab"
                class="dataType"
                style="display: none"
              >
                盘后
              </li>
              <li data-type="r" class="dataType cur fshBox">分时</li>
              <li class="rk-a" id="day-selector">
                <span
                  ><span data-type="t5" class="selected-box dataType">5日</span
                  ><span class="click-icon"><i class="select-icon"></i></span
                ></span>
                <div class="rk-options">
                  <span data-type="r" class="data-type">1日</span>
                  <span data-type="t2" class="data-type">2日</span>
                  <span data-type="t3" class="data-type">3日</span>
                  <span data-type="t4" class="data-type">4日</span>
                  <span data-type="t5" class="data-type cur">5日</span>
                </div>
              </li>
              <li data-type="k" class="dataType">日K</li>
              <li data-type="wk" class="dataType">周K</li>
              <li data-type="mk" class="dataType">月K</li>
              <li data-type="m5k" class="dataType">5分钟</li>
              <li data-type="m15k" class="dataType">15分钟</li>
              <li data-type="m30k" class="dataType">30分钟</li>
              <li data-type="m60k" class="dataType">60分钟</li>
            </ul>
            <ul class="fr r-box" id="kchart-toolbar">
              <li class="cmfb-li" id="btn-cyq">筹码分布</li>
              <li class="rk-a cur" id="select-authority">
                <span
                  ><span class="selected-box" value="">前复权</span
                  ><i class="select-icon"></i
                ></span>
                <div class="rk-options k-options" id="authority-options">
                  <span value="fa" class="cur">前复权</span>
                  <span value="ba">后复权</span>
                  <span>不复权</span>
                </div>
              </li>
              <li id="btn-drawback">缩短</li>
              <li id="btn-stretchout">拉长</li>
            </ul>
          </div>
          <div
            id="chart-container"
            class="chart-box mt10"
            data-charttype="r"
            tabindex="-1"
          ></div>
        </div>
        <div class="main-right fr" id="r-box-table">
          <table class="wbc-table">
            <tr>
              <td class="wb-td">
                委比：<span class="wb" id="quote-cr">-</span>
              </td>
              <td class="wc-td">
                委差：<span class="wc" id="quote-cd">-</span>
              </td>
            </tr>
          </table>

          <div class="mm-fb-table">
            <table id="buy-table" class="sell5">
              <tr class="is-hide">
                <td class="label">涨停</td>
                <td class="mm-price">
                  <span id="quote-raisePrice-main">-</span>
                </td>
                <td class=""></td>
                <td class="last-td"></td>
                <td class=""></td>
              </tr>
              <tr class="is-hide">
                <td class="label">卖五</td>
                <td class="mm-price"><span id="quote-s5p">-</span></td>
                <td class="power">
                  <div id="quote-s5vp" class="gdnl-box"></div>
                </td>
                <td class="last-td volumn mr">
                  <span id="quote-s5v">-</span>
                </td>
                <td class="diff" id="quote-s5d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">卖四</td>
                <td class="mm-price"><span id="quote-s4p">-</span></td>
                <td class="power">
                  <div id="quote-s4vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-s4v">-</span></td>
                <td class="diff" id="quote-s4d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">卖三</td>
                <td class="mm-price"><span id="quote-s3p">-</span></td>
                <td class="power">
                  <div id="quote-s3vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-s3v">-</span></td>
                <td class="diff" id="quote-s3d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">卖二</td>
                <td class="mm-price"><span id="quote-s2p">-</span></td>
                <td class="power">
                  <div id="quote-s2vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-s2v">-</span></td>
                <td class="diff" id="quote-s2d"></td>
              </tr>
              <tr>
                <td class="label">卖一</td>
                <td class="mm-price"><span id="quote-s1p">-</span></td>
                <td class="power">
                  <div id="quote-s1vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-s1v">-</span></td>
                <td class="diff" id="quote-s1d"></td>
              </tr>
            </table>

            <table id="sell-table" class="buy5">
              <tr>
                <td class="label">买一</td>
                <td class="mm-price"><span id="quote-b1p">-</span></td>
                <td class="power">
                  <div id="quote-b1vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-b1v">-</span></td>
                <td class="diff" id="quote-b1d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">买二</td>
                <td class="mm-price"><span id="quote-b2p">-</span></td>
                <td class="power">
                  <div id="quote-b2vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-b2v">-</span></td>
                <td class="diff" id="quote-b2d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">买三</td>
                <td class="mm-price"><span id="quote-b3p">-</span></td>
                <td class="power">
                  <div id="quote-b3vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-b3v">-</span></td>
                <td class="diff" id="quote-b3d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">买四</td>
                <td class="mm-price"><span id="quote-b4p">-</span></td>
                <td class="power">
                  <div id="quote-b4vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-b4v">-</span></td>
                <td class="diff" id="quote-b4d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">买五</td>
                <td class="mm-price"><span id="quote-b5p">-</span></td>
                <td class="power">
                  <div id="quote-b5vp" class="gdnl-box"></div>
                </td>
                <td class="last-td"><span id="quote-b5v">-</span></td>
                <td class="diff" id="quote-b5d"></td>
              </tr>
              <tr class="is-hide">
                <td class="label">跌停</td>
                <td class="mm-price">
                  <span id="quote-fallPrice-main">-</span>
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
  </div>
</template>
<script>
import axios from "axios";
//var canvasExtension = require("chart/common/canvasExtension");
var canvasExtension = require("./ec/webpack/emcharts");
//var imgpng = require("images/water_mark.png");

export default {
  components: {},
  props: {
    item: Object,
    name: String,
  },
  data() {
    return {};
  },

  methods: {},

  mounted() {
    /* let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//emcharts.dfcfw.com/ec/3.16.1/emcharts.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = () => {*/
    const h5chart = require("./h5c/h5chart");

    new h5chart().init();
    //};
  },
  computed: {},
  watch: {},
};
</script>

<style scoped src="./h5c/chart.css" />


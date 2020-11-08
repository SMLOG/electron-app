<template>
  <div id="main">
    <div id="content-decorator" class="clearfix">
      <div id="content">
        <div id="main-content">
          <div>
            <h2 href="#tab-kelly-formula-for-stock" data-toggle="tab">
              凯利公式(股票版)
            </h2>
          </div>
          <div class="tab-content">
            <div
              id="tab-kelly-formula-for-stock"
              class="tab-pane table-responsive main-panel frame"
              ng-controller="KellyFormulaForStockCtrl"
            >
              <form name="kellyFormulaForm">
                <div class="param-panel">
                  <div class="title-box"><h2>参数设置</h2></div>
                  <div class="param-list">
                    <div class="param simple clearfix">
                      <div class="name">预期收益</div>
                      <div class="data-box">
                        <div class="value">
                          <input
                            type="text"
                            v-model="paramHolder.u"
                            autocomplete="off"
                          />
                        </div>
                        <div class="unit">%</div>
                      </div>
                    </div>
                    <div class="param simple clearfix">
                      <div class="name">预期收益标准差</div>
                      <div class="data-box">
                        <div class="value">
                          <input
                            type="text"
                            v-model="paramHolder.o"
                            autocomplete="off"
                          />
                        </div>
                        <div class="unit">%</div>
                      </div>
                    </div>
                    <div class="param simple clearfix">
                      <div class="name">无风险利率</div>
                      <div class="data-box">
                        <div class="value">
                          <input
                            type="text"
                            v-model="paramHolder.r"
                            autocomplete="off"
                          />
                        </div>
                        <div class="unit">%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="controller-banner clearfix">
                  <div class="controller-bar">
                    <div class="progress"></div>
                    <div>
                      <input
                        type="button"
                        @click="calculate()"
                        ng-disabled="dcfForm.$invalid"
                        value="计算"
                      />
                    </div>
                  </div>
                </div>
                <div class="result-panel">
                  <div class="title-box"><h2>计算结果</h2></div>
                  <ul class="result-list clearfix">
                    <li class="result clearfix">
                      <div class="name">最佳持仓比例</div>
                      <div class="data-box">
                        <div class="value">
                          <input
                            type="text"
                            v-model="result.proportion"
                            disabled="disabled"
                            autocomplete="off"
                          />
                        </div>
                        <div class="unit">%</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
          <div id="guide-panel">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  <span class="ui-icon ui-icon-triangle-1-s"></span>
                  <span class="titletext" style="">使用说明</span>
                </h3>
              </div>
              <div class="panel-body">
                <ol>
                  <li>
                    在概率论与跨期投资组合选择中，凯利公式(Kelly
                    Formula)是一个用以确定<strong>最佳投注比例</strong>的公式。在大多数的<strong>赌博场景</strong>中，凯利公式的策略比其他策略在长期来看表现更好。它是由JL凯利于1956年发现，并经过实践检验。
                  </li>
                  <li>
                    凯利公式不能直接应用于股票投资。凯利公式(股票版)是凯利公式的变形，适用于计算<strong>最佳股票仓位</strong>。
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
import _ from "lodash";
var date = new Date();
var thisYear = date.getFullYear();
const INFINITY_SIGN = "∞";

export default {
  data: function () {
    return {
      paramHolder: { u: 12, o: 35, r: 5 },
      result: { proportion: 0 },
    };
  },
  components: {},
  computed: {},
  mounted() {},

  methods: {
    calculate() {
      this.result.proportion = (
        (100 * (this.paramHolder.u / 100 - this.paramHolder.r / 100)) /
        Math.pow(this.paramHolder.o / 100, 2)
      ).toFixed(2);
    },
  },
  watch: {},
};
</script>

<style scoped>
.ui-icon {
  width: 16px;
  height: 16px;
}
.ui-icon {
  display: inline-block;
}
.ui-icon-close {
  background-position: -80px -128px;
}
.ui-icon,
.ui-widget-content .ui-icon {
  background-image: url(ui-icons.png);
}
.clearfix {
  height: 1%;
  overflow: visible;
}

.clearfix:after {
  clear: both;
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  font-size: 0;
}
#item-list {
}
.item {
  margin-bottom: 20px;
}
.item .title {
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.item .title a {
  color: #444;
  text-decoration: none;
}
.item .description {
  text-indent: 2em;
  margin-bottom: 5px;
}
.main-panel {
  padding: 10px;
}
.title-box {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font: inherit;
  color: inherit;
}
ul,
ol {
  margin-top: 0;
  margin-bottom: 10px;
}

#item-list {
}
.item {
  margin-bottom: 20px;
}
.item .title {
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.item .title a {
  color: #444;
  text-decoration: none;
}
.item .description {
  text-indent: 2em;
  margin-bottom: 5px;
}
.main-panel {
  padding: 10px;
}
.title-box {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.param,
.result {
  padding-left: 120px;
}
.param {
  margin-bottom: 0px;
  padding-top: 18px;
}
.param .name,
.param .value,
.param .unit,
.param .selector,
.param .remark,
.result .name,
.result .value,
.result .unit {
  float: left;
}
.param .name,
.result .name {
  width: 120px;
  margin-left: -120px;
}
.param .value,
.result .value {
  width: 66px;
}
.param .value input,
.result .value input {
  width: 100%;
}
.param .unit,
.result .unit {
  width: 26px;
  margin-left: 10px;
}
.param .selector {
  width: 300px;
  margin-top: -18px;
  margin-left: 40px;
}
.param .slider {
  margin-top: 4px;
}
.param .remark {
  margin-left: 10px;
}
.slider-range .min {
  float: left;
}
.slider-range .max {
  float: right;
}
.controller-banner {
  margin: 10px 0;
}
.controller-bar {
  float: right;
  padding-left: 40px;
}
.progress {
  display: none;
  float: left;
  margin-left: -30px;
}
.result-panel {
}
.param-list,
.result-list {
  list-style: none;
  padding-left: 0;
}
.result-list {
  margin-top: 28px;
}
.result {
  margin-bottom: 18px;
}
.nav-tabs {
  border-bottom: none;
}
</style>


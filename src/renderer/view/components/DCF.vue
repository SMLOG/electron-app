<template>
  <div class="main-panel">
    <form
      name="dcfForm"
      class="ng-pristine ng-valid ng-valid-required ng-valid-greater-than"
    >
      <div class="param-panel">
        <div class="title-box"><h2>参数设置</h2></div>
        <div class="param-list">
          <div class="param simple clearfix" data-name="baseCashFlow">
            <div class="name">基准现金流</div>
            <div class="data-box">
              <div class="value">
                <input
                  type="text"
                  v-model="baseCashFlow"
                  autocomplete="off"
                  class="ng-pristine ng-untouched ng-valid"
                />
              </div>
              <div class="unit">￥</div>
            </div>
          </div>
          <div class="param simple clearfix" data-name="discountRate">
            <div class="name">折现率</div>
            <div class="data-box">
              <div class="value">
                <input
                  type="text"
                  v-model="discountRate"
                  autocomplete="off"
                  class="ng-pristine ng-untouched ng-valid"
                />
              </div>
              <div class="unit">%</div>
            </div>
          </div>
          <div class="stage-container clearfix">
            <div class="param stage start clearfix">
              <div class="growth-rate clearfix"></div>
              <div class="axis clearfix">
                <div class="coordinate"></div>
              </div>
              <div class="year">
                <div class="data-box">
                  <div class="value">
                    <input
                      v-model="baseYear"
                      type="text"
                      autocomplete="off"
                      class="ng-pristine ng-untouched ng-valid"
                    />
                  </div>
                  <div class="unit">年</div>
                </div>
              </div>
            </div>
            <ul class="stage-list clearfix">
              <li
                class="param stage clearfix ng-scope"
                v-for="(stage, i) in stages"
                :key="i"
              >
                <div
                  name="stageForm"
                  class="ng-pristine ng-valid ng-valid-required ng-valid-greater-than"
                >
                  <div class="present-value" title="现值">
                    <div class="data-box">
                      <div class="value">
                        <div class="value">
                          <span
                            disabled="disabled"
                            v-if="stage.presentValue != null"
                            >{{ stage.presentValue.toFixed(2) }}</span
                          >
                          <input
                            v-if="false"
                            type="text"
                            :value="
                              stage.presentValue != null
                                ? stage.presentValue.toFixed(2)
                                : ''
                            "
                            disabled="disabled"
                            autocomplete="off"
                          />
                        </div>
                      </div>
                      <div class="unit">￥</div>
                    </div>
                  </div>
                  <div class="axis clearfix">
                    <div class="coordinate"></div>
                  </div>
                  <div
                    class="growth-rate clearfix"
                    ng-class="{error: stageForm.growthRate.$invalid}"
                  >
                    <div class="data-box">
                      <div class="value">
                        <input
                          type="text"
                          name="growthRate"
                          v-model="stage.growthRate"
                          growth-rate-validator=""
                          required="required"
                          title="增长率"
                          autocomplete="off"
                          class="ng-pristine ng-untouched ng-valid ng-valid-required"
                        />
                      </div>
                      <div class="unit">%</div>
                    </div>
                  </div>
                  <div class="year" ng-class="{error: stageForm.year.$invalid}">
                    <div class="data-box">
                      <div class="value">
                        <input
                          type="text"
                          name="year"
                          v-model="stage.to"
                          required="required"
                          title=""
                          autocomplete="off"
                          class="ng-pristine ng-untouched ng-valid ng-valid-required ng-valid-greater-than"
                          data-original-title="年份"
                        />
                      </div>
                      <div class="unit">年</div>
                    </div>
                  </div>
                  <div class="operator-bar">
                    <div
                      class="operator"
                      title="删除该阶段"
                      @click="deleteStage(i)"
                    >
                      <span class="ui-icon ui-icon-close"></span>
                    </div>
                  </div>
                </div>
              </li>
              <!-- end ngRepeat: stage in stages -->
            </ul>
          </div>
        </div>
      </div>
      <div class="controller-banner clearfix">
        <div class="controller-bar">
          <div>
            <input type="button" @click="addStage()" value="增加阶段" />
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
          <li class="result clearfix" data-name="pc">
            <div class="name">现值</div>
            <div class="data-box">
              <div class="value">
                <input
                  type="text"
                  :value="sumPresentValue.toFixed(2)"
                  disabled="disabled"
                  autocomplete="off"
                />
              </div>
              <div class="unit">￥</div>
            </div>
          </li>
        </ul>
      </div>
    </form>
    <div class="panel-body">
      <ol>
        <li>
          <a target="_blank" href="http://www.iguuu.com/app/dcf"> 爱股网</a
          >现金流折现(DCF)采用<a
            href="http://wiki.mbalib.com/wiki/现金流量贴现法"
            rel="nofollow"
            target="_blank"
            >多阶段增长模型</a
          >。
        </li>
        <li>
          <a
            href="http://wiki.mbalib.com/wiki/折现率"
            rel="nofollow"
            target="_blank"
            >折现率</a
          >是指将未来有限期预期收益折算成现值的比率。
        </li>
        <li>
          请注意：如果永续增长阶段（年份为∞）的增长率大于折现率，那么现值为∞。
        </li>
      </ol>
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
      baseCashFlow: 1,
      discountRate: 12,
      baseYear: thisYear - 1,
      stages: [
        {
          growthRate: 15,
          to: thisYear - 1 + 10,
          presentValue: null,
        },
        {
          growthRate: 7,
          to: Infinity,
          presentValue: null,
        },
      ],
    };
  },
  components: {},
  computed: {
    sumPresentValue() {
      var sum = 0;
      for (var i = 0; i < this.stages.length; i++) {
        sum += this.stages[i].presentValue;
      }
      return sum;
    },
  },
  mounted() {},

  methods: {
    cleanPresentValue() {
      for (var i = 0; i < this.stages.length; i++) {
        this.stages[i].presentValue = null;
      }
    },
    deleteStage(index) {
      this.stages.splice(index, 1);
      this.cleanPresentValue();
    },
    addStage() {
      var stageSize = this.stages.length;
      var newStage = null;
      if (stageSize > 0) {
        var lastStage = this.stages[stageSize - 1];
        if (lastStage.to === Infinity) {
          if (stageSize > 1) {
            var secondLastStage = this.stages[stageSize - 2];
            if (secondLastStage.to === undefined) {
              lastStage.to = undefined;
            } else {
              lastStage.to = secondLastStage.to + 10;
            }
          } else {
            lastStage.to = thisYear + 10;
          }
        }
        newStage = {
          growthRate: 7,
          to: Infinity,
          presentValue: null,
        };
      } else {
        newStage = {
          growthRate: 7,
          to: Infinity,
          presentValue: null,
        };
      }
      this.stages.push(newStage);
      this.cleanPresentValue();
    },
    calculate() {
      var baseCashFlow = this.baseCashFlow;
      for (var i = 0; i < this.stages.length; i++) {
        var stage = this.stages[i];
        var years = 0;
        var r = (1 + stage.growthRate / 100) / (1 + this.discountRate / 100);
        var endCashFlowMultiples = 0;
        var presentValueMultiples = 0;
        if (stage.to != Infinity) {
          if (i == 0) {
            years = stage.to - this.baseYear;
          } else {
            var previousStage = this.stages[i - 1];
            years = stage.to - previousStage.to;
          }
          endCashFlowMultiples = Math.pow(r, years);
          if (r == 1) {
            presentValueMultiples = years;
          } else {
            presentValueMultiples = ((1 - endCashFlowMultiples) * r) / (1 - r);
          }
        } else {
          presentValueMultiples = r / (1 - r);
        }
        stage.presentValue = baseCashFlow * presentValueMultiples;
        baseCashFlow = baseCashFlow * endCashFlowMultiples;
      }
    },

    getStageName(index) {
      var stageName = "第" + (index + 1) + "阶段";
      if (this.stages[index].to === Infinity) {
        stageName = "永续阶段";
      }
      return stageName;
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
.ng-invalid {
  border-color: red;
}
.stage-container {
  margin-top: 20px;
  padding-left: 90px;
}
.stage-list {
  width: 100%;
  padding-left: 0;
  list-style: none;
}
.stage {
  position: relative;
  float: left;
  width: 180px;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
}
.stage .growth-rate,
.stage .present-value,
.stage .year {
  width: 84px;
}
.stage .value {
  width: 42px;
}
.stage .present-value {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
}
.stage .axis {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 5px;
  margin-top: -5px;
  border-bottom: 1px solid black;
}
.stage .coordinate {
  width: 110px;
  height: 100%;
  border-right: 1px solid black;
}
.stage .growth-rate {
  position: absolute;
  top: 50%;
  left: 0;
  height: 20px;
  margin-top: 10px;
}
.stage .year {
  position: absolute;
  top: 100%;
  left: 100%;
  height: 20px;
  margin-top: -20px;
  margin-left: -90px;
}
.stage .operator-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  margin-left: -78px;
  margin-top: -8px;
}
.stage .operator {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.stage.start {
  margin-left: -90px;
  width: 90px;
}
.stage.start .coordinate {
  width: 20px;
}
.stage .error {
  color: red;
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
</style>


<template>
  <div>
    <div class="section first">
      <div class="name" id="gdrs">
        <samp class="icon"> </samp>
        <strong>股东人数</strong>
      </div>
      <div class="content">
        <h1
          v-if="gdrs == null || gdrs.length <= 0"
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无股东人数
        </h1>
        <table v-else id="Table0">
          <tbody>
            <tr>
              <td colspan="11" id="tdImage">
                <v-chart
                  id="imagegdrs"
                  :options="option"
                  style="width: 960px; height: 253px"
                ></v-chart>
                <div class="tips-explain">
                  股东人数与股价比(
                  注:股票价格通常与股东人数成反比，股东人数越少代表筹码越集中，股价越有可能上涨)
                </div>
              </td>
            </tr>
            <tr>
              <th class="tips-colnameL"></th>
              <th v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.rq }}
              </th>
            </tr>
            <tr>
              <th class="tips-fieldnameL">股东人数(户)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.gdrs }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">较上期变化(%)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.gdrs_jsqbh }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">人均流通股(股)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.rjltg }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">较上期变化(%)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.rjltg_jsqbh }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">筹码集中度</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.cmjzd }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">股价(元)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.gj }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">人均持股金额(元)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.rjcgje }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">前十大股东持股合计(%)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.qsdgdcghj }}
              </td>
            </tr>
            <tr>
              <th class="tips-fieldnameL">前十大流通股东持股合计(%)</th>
              <td v-for="(value, i) in gdrs" :key="i" class="tips-dataL">
                {{ value.qsdltgdcghj }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="name" id="sdltgd">
        <samp class="icon"> </samp>
        <strong>十大流通股东</strong>
      </div>
      <div class="content">
        <h1
          v-if="sdltgd == null || sdltgd.length <= 0"
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无十大流通股东
        </h1>
        <div v-else class="tab">
          <ul>
            <li
              v-for="(value, i) in sdltgd"
              :key="i"
              :class="{ current: i == sdltgdCurIndex }"
              @click="sdltgdCurIndex = i"
            >
              <span>{{ value.rq }}</span>
            </li>
          </ul>
        </div>
        <div class="content first">
          <table
            v-for="(value, i) in sdltgd"
            :key="i"
            :style="{ display: sdltgdCurIndex == i ? 'table' : 'none' }"
          >
            <tbody>
              <tr>
                <td colspan="2">
                  <v-chart
                    :options="option2"
                    :id="'chart_122_' + i"
                    style="height: 290px"
                  ></v-chart>
                </td>
                <td colspan="6">
                  <v-chart
                    :options="option3"
                    :id="'chart_123_' + i"
                    style="height: 290px"
                  ></v-chart>
                </td>
              </tr>
              <tr>
                <th class="tips-colnameL" width="35px">名次</th>
                <th class="tips-colnameL" style="width: 337px">股东名称</th>
                <th class="tips-colnameL">股东性质</th>
                <th class="tips-colnameL">股份类型</th>
                <th class="tips-colnameL">持股数(股)</th>
                <th class="tips-colnameL">占总流通股本持股比例</th>
                <th class="tips-colnameL">增减(股)</th>
                <th class="tips-colnameL">变动比例</th>
              </tr>
              <tr v-for="(m, i) in value.sdltgd" :key="i + '_' + m">
                <th class="tips-dataL">
                  <em class="tips-num">{{ m.mc }}</em>
                  <span
                    v-if="i % 10 == 0"
                    class="tips-colorsquare"
                    style="background-color: #cc9866"
                  ></span>
                  <span
                    v-if="i % 10 == 1"
                    class="tips-colorsquare"
                    style="background-color: #996533"
                  ></span>
                  <span
                    v-if="i % 10 == 2"
                    class="tips-colorsquare"
                    style="background-color: #ffcc00"
                  ></span>
                  <span
                    v-if="i % 10 == 3"
                    class="tips-colorsquare"
                    style="background-color: #ffff67"
                  ></span>
                  <span
                    v-if="i % 10 == 4"
                    class="tips-colorsquare"
                    style="background-color: #663401"
                  ></span>
                  <span
                    v-if="i % 10 == 5"
                    class="tips-colorsquare"
                    style="background-color: #9a3334"
                  ></span>
                  <span
                    v-if="i % 10 == 6"
                    class="tips-colorsquare"
                    style="background-color: #fe0000"
                  ></span>
                  <span
                    v-if="i % 10 == 7"
                    class="tips-colorsquare"
                    style="background-color: #c9c9c9"
                  ></span>
                  <span
                    v-if="i % 10 == 8"
                    class="tips-colorsquare"
                    style="background-color: #d1c0a6"
                  ></span>

                  <span
                    v-if="i % 10 == 9"
                    class="tips-colorsquare"
                    style="background-color: #ffcc9a"
                  ></span>
                </th>
                <td class="tips-dataL">{{ m.gdmc }}</td>
                <td class="tips-dataL">{{ m.gdxz }}</td>
                <td class="tips-dataL">{{ m.gflx }}</td>
                <td class="tips-dataL">{{ m.cgs }}</td>
                <td class="tips-dataL">{{ m.zltgbcgbl }}</td>
                <td class="tips-dataL">{{ nubmeraddcode(m.zj) }}</td>
                <td class="tips-dataL">{{ m.bdbl }}</td>
              </tr>
              <tr>
                <th class="tips-dataL"></th>
                <td class="tips-dataL">合计</td>
                <td class="tips-dataL">--</td>
                <td class="tips-dataL">--</td>
                <td class="tips-dataL">{{ sdltgdhj(value, "cgs") }}</td>
                <td class="tips-dataL">{{ sdltgdhj(value, "zltgbcgbl") }}</td>
                <td class="tips-dataL">--</td>
                <td class="tips-dataL">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="name" id="sdgd">
        <samp class="icon"> </samp>
        <strong>十大股东</strong>
      </div>
      <div class="content">
        <h1
          v-if="sdgd == null || sdgd.length <= 0"
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无十大股东
        </h1>

        <div v-else-if="kggx && kggx.sjkzr" class="summary" style="margin: 0px">
          <p class="p_div" style="margin: 5px 0">
            实际控制人：<font
              >{{ kggx.sjkzr }}
              <span v-if="kggx.sjkzr != '无'"
                >（持股比例：{{ kggx.cgbl }}）</span
              ></font
            >
          </p>
        </div>
        <div class="tab">
          <ul>
            <li
              v-for="(value, i) in sdgd"
              :key="i"
              @click="sdgdCurIndex = i"
              :class="{ current: sdgdCurIndex == i }"
            >
              <span>{{ value.rq }}</span>
            </li>
          </ul>
        </div>
        <div class="content first">
          <table
            v-for="(value, i) in sdgd"
            :key="i"
            :style="{ display: i == sdgdCurIndex ? 'table' : 'none' }"
          >
            <tbody>
              <tr>
                <th class="tips-colnameL" width="5%">名次</th>
                <th class="tips-colnameL">股东名称</th>
                <th class="tips-colnameL" width="16%">股份类型</th>
                <th class="tips-colnameL" width="13%">持股数(股)</th>
                <th class="tips-colnameL" width="10%">占总股本持股比例</th>
                <th class="tips-colnameL" width="10%">增减(股)</th>
                <th class="tips-colnameL" width="8%">变动比例</th>
              </tr>
              <tr v-for="(m, i) in value.sdgd" :key="i">
                <th class="tips-dataL">{{ m.mc }}</th>
                <td class="tips-dataL">{{ m.gdmc }}</td>
                <td class="tips-dataL">{{ m.gflx }}</td>
                <td class="tips-dataL">{{ m.cgs }}</td>
                <td class="tips-dataL">{{ m.zltgbcgbl }}</td>
                <td class="tips-dataL">{{ nubmeraddcode(m.zj) }}</td>
                <td class="tips-dataL">{{ m.bdbl }}</td>
              </tr>
              <tr>
                <th class="tips-dataL"></th>
                <td class="tips-dataL">合计</td>
                <td class="tips-dataL">--</td>
                <td class="tips-dataL">{{ sdgdhj(value, "cgs") }}</td>
                <td class="tips-dataL">{{ sdgdhj(value, "zltgbcgbl") }}</td>
                <td class="tips-dataL">--</td>
                <td class="tips-dataL">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="section" style="display: block">
      <div class="name" id="zlcc">
        <samp class="icon"> </samp>
        <strong>机构持仓</strong>
      </div>
      <div class="content">
        <h1
          v-if="zlcc_rz == null || zlcc_rz.length <= 0"
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无机构持仓
        </h1>
        <div v-else class="tab">
          <ul>
            <li v-for="(value, i) in zlcc_rz" :key="i">
              <span>{{ value }}</span>
            </li>
          </ul>
        </div>
        <div id="zlcc_data"></div>
      </div>
    </div>

    <div class="section">
      <div class="name" id="sdgdcgbd">
        <samp class="icon"> </samp>
        <strong>十大股东持股变动</strong>
      </div>

      <div class="content">
        <h1
          v-if="sdgdcgbd == null || sdgdcgbd.length <= 0"
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无十大股东持股变动
        </h1>
        <table v-else>
          <tbody>
            <tr>
              <th style="width: 9%">截止日期</th>
              <th style="width: 4%">名次</th>
              <th>股东名称</th>
              <th style="width: 10%">股份类型</th>
              <th style="width: 12%">持股数(股)</th>
              <th style="width: 7%">占总股本持股比例</th>
              <th style="width: 11%">增减(股)</th>
              <th style="width: 10%">增减股占原股东持股比例</th>
              <th style="width: 10%">变动原因</th>
            </tr>
            <tr v-for="(value, i) in sdgdcgbd" :key="i">
              <td class="tips-dataL">{{ value.bdsj }}</td>
              <td class="tips-dataL">{{ value.mc }}</td>
              <td class="tips-dataL">{{ value.gdmc }}</td>
              <td class="tips-dataL">{{ value.gflx }}</td>
              <td class="tips-dataL">{{ value.cgs }}</td>
              <td class="tips-dataL">{{ value.zzgbcgbl }}</td>
              <td class="tips-dataL">{{ value.cj }}</td>
              <td class="tips-dataL">{{ value.cjgzygdcgbl }}</td>
              <td class="tips-dataL">{{ value.bdyy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="name" id="xsjj">
        <samp class="icon"> </samp>
        <strong>限售解禁</strong>
      </div>
      <div class="content">
        <h1
          v-if="xsjj == null || xsjj.length <= 0"
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无限售解禁
        </h1>
        <table v-else>
          <tbody>
            <tr>
              <th class="tips-colnameL">解禁时间</th>
              <th class="tips-colnameL">解禁数量(股)</th>
              <th class="tips-colnameL">解禁股占总股本比例</th>
              <th class="tips-colnameL">解禁股占流通股本比例</th>
              <th class="tips-colnameL">股票类型</th>
            </tr>
            <tr v-for="(value, i) in xsjj" :key="i">
              <td class="tips-dataL">{{ value.jjsj }}</td>
              <td class="tips-dataL">{{ value.jjsl }}</td>
              <td class="tips-dataL">{{ value.jjgzzgbbl }}</td>
              <td class="tips-dataL">{{ value.jjgzltgbbl }}</td>
              <td class="tips-dataL">{{ value.gplx }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
export default {
  name: "Shareholder",
  components: { "v-chart": ECharts },
  props: {
    item: Object,
  },
  data() {
    return {
      sdltgd: null,
      sdltgdCurIndex: 0,
      sdgd: null,
      sdgdCurIndex: 0,
      xsjj: null,
      gdrs: null,
      sdgdcgbd: null,
      zlcc_rz: null,
      sdltgd_chart: null,
      option2: null,
      option3: null,
      option: null,
    };
  },

  methods: {
    sdgdhj(obj, col) {
      if (obj != null && obj.sdgd != null && obj.sdgd.length > 0) {
        var value = 0;
        for (var a = 0; a < obj.sdgd.length; a++) {
          if (col == "cgs") {
            if (obj.sdgd[a].cgs != "--") {
              value += Number(
                obj.sdgd[a].cgs
                  .replace(",", "")
                  .replace(",", "")
                  .replace(",", "")
              );
            }
          }
          if (col == "zltgbcgbl") {
            if (obj.sdgd[a].zltgbcgbl != "--") {
              value += Number(obj.sdgd[a].zltgbcgbl.replace("%", ""));
            }
          }
        }
        if (col == "zltgbcgbl") {
          return value.toFixed(2) + "%";
        }
        return parseFloat(value.toFixed(0)).toLocaleString();
      }
    },
    nubmeraddcode(value) {
      var n = parseFloat(value);
      if (isNaN(n)) {
        return value;
      } else {
        return n.toLocaleString();
      }
    },
    formatChartMinOrMax(value, splitNumber) {
      if (value == 0) return value;

      if (Math.abs(value) >= splitNumber) {
        value =
          value > 0
            ? Math.ceil(value / splitNumber) * splitNumber
            : Math.floor(value / splitNumber) * splitNumber;
      } else {
        var key = 10;
        while (Math.abs(value * key) < splitNumber) {
          key = key * key;
        }
        value =
          value > 0
            ? (Math.ceil((value * key) / splitNumber) * splitNumber) / key
            : (Math.floor((value * key) / splitNumber) * splitNumber) / key;
      }
      return value;
    },
    sdltgdhj(obj, col) {
      if (obj != null && obj.sdltgd != null && obj.sdltgd.length > 0) {
        var value = 0;
        for (var a = 0; a < obj.sdltgd.length; a++) {
          if (col == "cgs") {
            if (obj.sdltgd[a].cgs != "--") {
              value += Number(
                obj.sdltgd[a].cgs
                  .replace(",", "")
                  .replace(",", "")
                  .replace(",", "")
              );
            }
          }
          if (col == "zltgbcgbl") {
            if (obj.sdltgd[a].zltgbcgbl != "--") {
              value += Number(obj.sdltgd[a].zltgbcgbl.replace("%", ""));
            }
          }
        }
        if (col == "zltgbcgbl") {
          return value.toFixed(2) + "%";
        }
        return parseFloat(value.toFixed(2)).toLocaleString();
      }
    },
    fhyxChart() {
      let url = "/p/BonusFinancing/BonusDetailChartAjax";

      let data = {
        code: this.item.code,
        date: this.fhyx[this.selectIndex].ggrq,
      };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((json) => {
          if (json) {
            this.option.series.data = json;
            this.option.series.markLine.xAxis = this.fhyx[
              this.selectIndex
            ].date;
          }
        });
    },

    loadData() {
      var url = "/p/ShareholderResearch/ShareholderResearchAjax";
      var data = { code: this.item.code };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((json) => {
          if (json) {
            Object.assign(this, json);
          }
        });
    },
    showChart1(data) {
      var arryLeg = new Array();
      var dataArry = new Array();
      var height = 0;
      for (var b = 0; b < data.sdltgd.length; b++) {
        var temp = {
          value: data.sdltgd[b].cgs
            .replace(",", "")
            .replace(",", "")
            .replace(",", ""),
          name: data.sdltgd[b].gdmc.replace(/\'/gi, "\\'"),
        };

        for (var i = 0; i < dataArry.length; i++) {
          if (temp.name == dataArry[i].name) {
            temp.name = temp.name + " ";
          }
        }
        arryLeg.push(temp.name);
        dataArry.push(temp);
        if (data.sdltgd[b].gdmc.replace(/\'/gi, "\\'").length > 25) {
          height += 35;
        } else height += 26;
      }

      height = height < 290 ? 290 : height;

      // 指定图表的配置项和数据
      this.option2 = {
        color: [
          "#cc9866",
          "#996533",
          "#ffcc00",
          "#ffff67",
          "#663401",
          "#9a3334",
          "#fe0000",
          "#c9c9c9",
          "#d1c0a6",
          "#ffcc9a",
        ],
        tooltip: {
          trigger: "item",
          formatter: function (param) {
            var html = "";
            html += param.seriesName + " <br/>";

            var result = "";
            var length = 0;
            for (var i = 0; i < param.name.length; i++) {
              if (/[^\x00-\xff]/.test(param.name[i])) length += 2;
              else length++;

              result += param.name[i];
              if (
                (length % 48 == 0 || length % 49 == 0) &&
                result.substr(result.length - 5, 1) != "<br/>"
              ) {
                result += "<br/>";
              }
            }
            html += result;
            html += "：" + param.value + " (" + param.percent + "%)";

            return html;
          }, //"{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: 245,
          y: 10,
          data: arryLeg,
          width: 330,
        },
        formatter: function (val) {
          var result = "";
          var length = 0;
          for (var i = 0; i < val.length; i++) {
            if (/[^\x00-\xff]/.test(val[i])) length += 2;
            else length++;

            result += val[i];
            if (
              (length % 48 == 0 || length % 49 == 0) &&
              result.substr(result.length - 2, 1) != "\n"
            ) {
              result += "\n";
            }
          }

          return result;
        },
        series: [
          {
            name: "持股占比",
            type: "pie",
            radius: "110",
            center: ["120", "50%"],
            data: dataArry,
            label: {
              normal: {
                show: false,
              },
            },
          },
        ],
      };
    },
    showChart2(data) {
      var arryLeg = new Array();
      var dataArry = new Array();
      arryLeg.push("十大流通股东持股");
      dataArry.push({ value: data.sdltgdcg, name: "十大流通股东持股" });

      arryLeg.push("流通受限股份");
      dataArry.push({ value: data.ltsxgf, name: "流通受限股份" });

      arryLeg.push("其余流通股份");
      dataArry.push({ value: data.qyltgf, name: "其余流通股份" });

      // 指定图表的配置项和数据
      this.option3 = {
        color: ["#cc9866", "#996533", "#ffcc00"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: 230,
          y: 100,
          data: arryLeg,
        },
        series: [
          {
            name: "持股占比",
            type: "pie",
            radius: "110",
            center: ["120", "50%"],
            data: dataArry,
            label: {
              normal: {
                show: false,
              },
            },
          },
        ],
      };
    },
  },

  mounted() {
    this.loadData();
  },
  watch: {
    item(n, o) {
      this.loadData();
    },
    sdltgd(data, o) {
      if (data == undefined || data == null || data.length <= 0) {
        return;
      }

      let index = 0;

      data = data[index];
      this.showChart1(data);
    },
    sdltgd_chart(data) {
      if (data == undefined || data == null || data.length <= 0) {
        return;
      }

      let index = 0;

      data = data[index];
      this.showChart2(data);
    },

    gdrs(gdrs, o) {
      if (gdrs == undefined || gdrs == null || gdrs.length == 0) {
        return;
      }
      var maxdata1 = 0;
      var maxdata2 = 0;
      var dataAxis = new Array();
      var data1 = new Array();
      var data2 = new Array();
      for (var a = 0; a < gdrs.length; a++) {
        dataAxis.push(gdrs[a].rq);
        var d1 = 0;
        if (gdrs[a].gdrs.indexOf("万") > 0) {
          d1 = Number(
            (Number(gdrs[a].gdrs.replace("万", "")) * 10000).toFixed(0)
          );
        } else if (gdrs[a].gdrs.indexOf("亿") > 0) {
          d1 = Number(
            (Number(gdrs[a].gdrs.replace("亿", "")) * 100000000).toFixed(0)
          );
        } else {
          d1 = Number(gdrs[a].gdrs);
        }
        if (maxdata1 < d1) {
          maxdata1 = d1;
        }
        var d2 = Number(gdrs[a].gj);
        if (maxdata2 < d2) {
          maxdata2 = d2;
        }
        data1.push(d1);
        data2.push(d2);
      }
      maxdata1 = this.formatChartMinOrMax(maxdata1, 5);
      maxdata2 = this.formatChartMinOrMax(maxdata2, 5);

      this.option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          data: [
            {
              name: "股东人数(户)",
            },
            {
              name: "股价(元)",
            },
          ],
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: dataAxis.reverse(),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "股东人数(户)",
            min: 0,
            max: maxdata1,
            splitNumber: 5,
            interval: Number((maxdata1 / 5).toFixed(2)),
            position: "left",
            axisLabel: {
              formatter: function (value, index) {
                return parseFloat(value.toFixed(0)).toLocaleString();
              },
              show: true,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
              },
            },
          },
          {
            type: "value",
            name: "股价(元)",
            min: 0,
            max: maxdata2,
            splitNumber: 5,
            interval: Number((maxdata2 / 5).toFixed(2)),
            position: "right",
            axisLabel: {
              formatter: function (value, index) {
                return value.toFixed(0);
              },
              show: true,
            },
          },
        ],
        series: [
          {
            name: "股东人数(户)",
            type: "bar",
            barWidth: "30%",
            yAxis: 1,
            itemStyle: { normal: { color: "#ecaf3c" } },
            data: data1.reverse(),
          },
          {
            name: "股价(元)",
            type: "line",
            yAxisIndex: 1,
            itemStyle: { normal: { color: "#006600" } },
            data: data2.reverse(),
          },
        ],
      };
    },
  },
};
</script>

<style scoped src="./web.css" />

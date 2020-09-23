<template>
  <div>
    <div class="section first">
      <div class="name" id="zyfw">
        <samp class="icon"></samp>
        <strong>主营范围</strong>
      </div>
      <div class="content">
        <h1
          v-if="(zyfw == null||zyfw.length<=0)"
          style="text-align:center;font-size:14px;padding:5px 0;"
        >该公司暂无主营范围数据</h1>
        <div v-else style="TEXT-INDENT:2em;" class="p_div">{{zyfw[0].ms}}</div>
      </div>
    </div>

    <div class="section">
      <div class="name" id="zygcfx">
        <samp class="icon"></samp>
        <strong>主营构成分析</strong>
      </div>
      <div class="content">
        <h1
          v-if="(zygcfx == null||zygcfx.length<=0)"
          style="text-align:center;font-size:14px;padding:5px 0;"
        >该公司暂无主营构成分析</h1>
        <template v-else>
          <table v-for="(value,i) in zygcfx" style="border:none" :key="i">
            <tbody>
              <tr>
                <th class="tips-dataL">{{value.rq}}</th>
                <th class="tips-dataL">主营构成</th>
                <th class="tips-dataL">主营收入(元)</th>
                <th class="tips-dataL">收入比例</th>
                <th class="tips-dataL">主营成本(元)</th>
                <th class="tips-dataL">成本比例</th>
                <th class="tips-dataL">主营利润(元)</th>
                <th class="tips-dataL">利润比例</th>
                <th class="tips-dataL">毛利率(%)</th>
              </tr>

              <template v-if="(value.hy!=null&&value.hy.length>0)">
                <tr v-for="(hy,a) in value.hy" :key="`${i}-${a}`">
                  <td
                    class="tips-fieldnameL"
                    data-row="row"
                    :data-span="value.hy.length"
                    :data-data="a==0?'show':'hid'"
                  >按行业分类</td>
                  <td class="tips-fieldnameL">{{hy.zygc}}</td>
                  <td class="tips-dataL">{{hy.zysr}}</td>
                  <td class="tips-dataL">{{hy.srbl}}</td>
                  <td class="tips-dataL">{{hy.zycb}}</td>
                  <td class="tips-dataL">{{hy.cbbl}}</td>
                  <td class="tips-dataL">{{hy.zylr}}</td>
                  <td class="tips-dataL">{{hy.lrbl}}</td>
                  <td class="tips-dataL">{{hy.mll}}</td>
                </tr>
              </template>

              <template v-if="(value.cp!=null&&value.cp.length>0)">
                <tr v-for="(cp,a) in value.cp" :key="`0-${i}-${a}`">
                  <td
                    class="tips-fieldnameL"
                    data-row="row"
                    :data-span="value.cp.length"
                    :data-data="a==0?'show':'hid'"
                  >按产品分类</td>
                  <td class="tips-fieldnameL">{{cp.zygc}}</td>
                  <td class="tips-dataL">{{cp.zysr}}</td>
                  <td class="tips-dataL">{{cp.srbl}}</td>
                  <td class="tips-dataL">{{cp.zycb}}</td>
                  <td class="tips-dataL">{{cp.cbbl}}</td>
                  <td class="tips-dataL">{{cp.zylr}}</td>
                  <td class="tips-dataL">{{cp.lrbl}}</td>
                  <td class="tips-dataL">{{cp.mll}}</td>
                </tr>
              </template>

              <template v-if="(value.qy!=null&&value.qy.length>0)">
                <tr v-for="(qy,a) in value.qy" :key="`1-${i}-${a}`">
                  <td
                    class="tips-fieldnameL"
                    data-row="row"
                    :data-span="value.qy.length"
                    :data-data="a==0?'show':'hid'"
                  >按地区分类</td>
                  <td class="tips-fieldnameL">{{qy.zygc}}</td>
                  <td class="tips-dataL">{{qy.zysr}}</td>
                  <td class="tips-dataL">{{qy.srbl}}</td>
                  <td class="tips-dataL">{{qy.zycb}}</td>
                  <td class="tips-dataL">{{qy.cbbl}}</td>
                  <td class="tips-dataL">{{qy.zylr}}</td>
                  <td class="tips-dataL">{{qy.lrbl}}</td>
                  <td class="tips-dataL">{{qy.mll}}</td>
                </tr>
              </template>

              <tr v-if="(i!=(zygcfx.length-1))">
                <td style="border-left-style: none; border-right-style: none" colspan="9">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>

    <div class="section">
      <div class="name" id="jyps">
        <samp class="icon"></samp>
        <strong>经营评述</strong>
      </div>
      <div class="content">
        <h1
          v-if="(jyps == null||jyps.length<=0)"
          style="text-align:center;font-size:14px;padding:5px 0;"
        >该公司暂无经营评述数据</h1>
        <div v-else class="article" style="TEXT-INDENT:2em;">
          <p class="p_div">{{jyps[0].ms}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "BusinessAnalysis",
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {
      zygcfx: null,
      zyfw: null,
      jyps: null,
    };
  },

  methods: {
    loadData() {
      //主要指标数据加载

      var url = "/p/BusinessAnalysis/BusinessAnalysisAjax";
      var data = { code: this.item.code };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((result) => {
          if (result) {
            (this.zygcfx = result.zygcfx),
              (this.zyfw = result.zyfw),
              (this.jyps = result.jyps);
          }
        });
    },
  },

  mounted() {
    this.loadData();
  },
  watch: {
    item(n, o) {
      this.loadData();
    },
  },
};
</script>

<style scoped src="./web.css" />

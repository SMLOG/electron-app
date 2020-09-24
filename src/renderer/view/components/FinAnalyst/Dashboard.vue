<template>
  <div>
    <div class="section first">
      <div class="name" id="zxzb">
        <samp class="icon"> </samp>
        <strong>最新指标</strong
        ><em class="msg"
          >(根据今日总股本计算所得，综合考虑分红送转、增发、新股上市等情况，可能会与最新报告期不一致)</em
        >
      </div>
      <div :class="'v-html'" class="content" id="zxzbtable" v-html="zxzb"></div>
    </div>

    <div class="section">
      <div class="name" id="dstx">
        <samp class="icon"> </samp>
        <strong>大事提醒</strong>
      </div>
      <div
        id="dstxDiv"
        class="content"
        style="margin-top: 10px; overflow: hidden"
      >
        <h1 style="text-align: center; font-size: 14px; padding: 5px 0">
          该公司暂无大事提醒
        </h1>
      </div>
    </div>

    <div class="section">
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

    <div class="section colL">
      <div class="name" id="xwgg">
        <samp class="icon"> </samp>
        <strong>公司资讯</strong>
      </div>
      <div class="list list_web">
        <h1
          v-if="
            ggxx == undefined ||
            ggxx == null ||
            ggxx.length <= 0 ||
            ggxx.data == null ||
            ggxx.data.length == 0 ||
            ggxx.data.items == null ||
            ggxx.data.items == 0
          "
          style="text-align: center; font-size: 14px; padding: 5px 0"
        >
          该公司暂无公司资讯
        </h1>
        <div v-else class="tips-clear">
          <ul>
            <li v-for="(value, i) in ggxx.data.items" :key="i">
              <samp>{{ formartTime(value.showDateTime) }}</samp>
              <a
                :href="
                  value.uniqueUrl ||
                  value.url ||
                  'http://stock.eastmoney.com/news/1699,' + value.code + '.html'
                "
                target="_blank"
                >{{ formartLength(value.title) }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Dashboard",
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {
      xsjj: null,
      ggxx: null,
      zxzb: null,
    };
  },

  methods: {
    formartLength(txt) {
      if (txt != undefined && txt != "") {
        if (txt.length > 25) {
          return txt.substr(0, 25) + "...";
        } else {
          return txt;
        }
      } else {
        return "";
      }
    },
    formartTime(long) {
      if (long == 0) {
        return "未知";
      } else {
        var time = new Date(long);
        return (
          time.getFullYear() +
          "-" +
          (time.getMonth() + 1 > 9
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1)) +
          "-" +
          (time.getDate() > 9 ? time.getDate() : "0" + time.getDate())
        );
      }
    },
    loadData() {
      var url = "/p/OperationsRequired/OperationsRequiredAjax";
      var data = { code: this.item.code, times: 1 };

      axios
        .get(url, { params: data })
        .then((resp) => resp.data)
        .then((json) => {
          if (json) {
            var zxzb = "";
            if (json.zxzb1 != undefined && json.zxzb1 != null) {
              zxzb += json.zxzb1;
            }
            if (json.zxzb2 != undefined && json.zxzb2 != null) {
              zxzb += json.zxzb2;
            }
            json.zxzb = zxzb;
            Object.assign(this, json);
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

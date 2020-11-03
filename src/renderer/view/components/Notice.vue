<template>
  <div>
    <div
      id="tabMenu"
      class="catemk"
      style="_height: 30px; position: fixed; top: 0"
    >
      <ul>
        <li
          v-for="(value, i) in [
            '全部',
            '财务报告',
            '融资公告',
            '风险提示',
            '信息变更',
            '重大事项',
            '资产重组',
            '持股变动',
          ]"
          :key="i"
          data-type="0"
          class="border_left_1"
          :class="{ at: type_id == i }"
          @click="type_id = i"
        >
          {{ value }}
        </li>
      </ul>
    </div>

    <table
      cellpadding="0"
      cellspacing="0"
      class="noborder"
      id="dt_1"
      style="margin-top: 42px"
    >
      <thead class="h101">
        <tr>
          <th style="padding: 0px; width: 60px">代码</th>
          <th style="padding: 0px; width: 90px">名称</th>
          <th style="padding: 0px; width: 385px">公告标题</th>
          <th style="padding: 0px; width: 110px">公告类型</th>
          <th style="padding: 0px; width: 80px">公告日期</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="r in notices">
          <tr v-if="r.gzs" :key="'gz' + r.code">
            <td colspan="7">
              <table>
                <tr v-for="it in r.gzs" :key="'event' + it.gz_id">
                  <td>
                    <a
                      target="_blank"
                      :href="`http://data.eastmoney.com/stockdata/${r.code.replace(
                        /[a-z]+/g,
                        ''
                      )}.html`"
                      >{{ r.code }}</a
                    >
                  </td>
                  <td>{{ it.SName }}</td>
                  <td>价格: {{ it.NEW }}({{ $fmtPercent(it.CHG) }})</td>
                  <td>行业:{{ it.HYName }}</td>
                  <td>PE(TTM):{{ $fmtNumber(it.PE9) }}</td>
                  <td>PEG:{{ $fmtNumber(it.PEG1) }}</td>
                  <td>总市值:{{ $fmtNumber(it.ZSZ) }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr v-for="(gg, i) in r.noticedetails" :key="gg.notice_id">
            <td v-if="0 == i" :rowspan="r.noticedetails.length"></td>
            <td v-if="0 == i" :rowspan="r.noticedetails.length"></td>
            <td>
              <a
                target="_blank"
                :href="`https://pdf.dfcfw.com/pdf/H2_${gg.art_code}_1.pdf`"
              >
                {{ gg.title }}</a
              >
            </td>
            <td>{{ gg.type }}</td>
            <td>
              <span> {{ gg.notice_date }}</span>
            </td>
          </tr>

          <tr
            v-if="r.events"
            :key="'event' + r.code"
            style="background-color: #eee"
          >
            <td></td>
            <td></td>
            <td colspan="5">
              <table>
                <tr v-for="event in r.events" :key="'event' + event.event_id">
                  <td>{{ event.rq_date }}</td>
                  <td>{{ event.sjlx }}</td>
                  <td>
                    <a
                      v-if="event.tszd"
                      target="_blank"
                      :href="`https://pdf.dfcfw.com/pdf/H2_${event.tszd}_1.pdf`"
                      >{{ event.sjms }}</a
                    >
                    <a v-else>{{ event.sjms }}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr v-if="r.yjdetails" :key="r.code" style="background-color: #eee">
            <td></td>
            <td></td>
            <td colspan="5">
              <table>
                <tr v-for="yj in r.yjdetails" :key="'yj' + yj.yj_id">
                  <td>
                    <div>
                      {{ yj.REPORTDATE }}: 营业收入:{{
                        $fmtNumber(yj.TOTAL_OPERATE_INCOME)
                      }}
                      同比增长:{{ yj.YSTZ && yj.YSTZ.toFixed(2) }}% 净利润:{{
                        $fmtNumber(yj.PARENT_NETPROFIT)
                      }}
                      同比增长:{{ yj.SJLTZ && yj.SJLTZ.toFixed(2) }}%
                      净资产收益率
                      {{ yj.WEIGHTAVG_ROE && yj.WEIGHTAVG_ROE.toFixed(2) }}%
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!--分页-->
    <div class="page-bar">
      <ul>
        <li>
          <a :class="{ disable: page <= 1 }" v-on:click="page--, onPaginate(0)"
            >首页</a
          >
        </li>
        <li>
          <a
            :class="{ disable: page <= 1 }"
            v-on:click="page--, onPaginate(page)"
            >上一页</a
          >
        </li>

        <li>
          <a
            :class="{ disable: page >= pages }"
            v-on:click="page++, onPaginate(page)"
            >下一页</a
          >
        </li>
        <li :class="{ disable: page >= pages }">
          <a v-on:click="onPaginate(pages)">尾页</a>
        </li>

        <li>
          <a
            >共<i>{{ page }}/{{ pages }}</i
            >页</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
import _ from "lodash";

export default {
  data: function () {
    return {
      notices: [],
      page: 1,
      count: 0,
      pages: 0,
      type_id: 0,
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.onPaginate(1);
  },

  methods: {
    onPaginate(page) {
      axios
        .get("/api/notices", { params: { p: page, type_id: this.type_id } })
        .then((resp) => {
          this.notices = resp.data.rows;
          this.count = resp.data.count;
          this.page = resp.data.page;
          this.pages = resp.data.pages;
        });
    },
  },
  watch: {
    type_id(n, o) {
      this.onPaginate(0);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
.disable {
  color: gray;
}
ul li {
  /* border-left: 1px solid #bbd4e8; */
  border-right: 1px solid #bbd4e8;
  border-top: 1px solid #bbd4e8;
  cursor: pointer;
  float: left;
  font-family: Microsoft YaHei;
  /* font-family: SimSun; */
  font-size: 18px;
  height: 29px;
  line-height: 29px;
  padding: 0 5px;
  padding: 0 4px\9;
  min-width: 50px;
  text-align: center;
  list-style: none;
}
.catemk {
  border-bottom: 2px #2f5795 solid;
  height: 30px;
  margin-bottom: 10px;
  padding-top: 3px;
  position: relative;
  width: 100%;
  background-color: #fff;
}
* {
  margin: 0;
  padding: 0;
}
ul li.at {
  border-color: #2f5795 #2f5795 #fff;
  border-style: solid;
  border-width: 1px 1px 3px;
  _border-bottom: 4px solid #fff;
}
td {
  vertical-align: top;
  font-size: 14px;
  text-align: left;
  border: none;
  padding: 5px;
}
</style>


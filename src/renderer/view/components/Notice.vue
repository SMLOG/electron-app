<template>
  <div>
    <div id="tabMenu" class="catemk" style="_height: 30px">
      <ul>
        <li
          data-type="0"
          class="border_left_1"
          :class="{ at: type == '' }"
          @click="type = ''"
        >
          全部
        </li>

        <li
          data-type="5"
          data-ul="zdsx_ul"
          :class="{ at: type == '' }"
          @click="type = ''"
        >
          重大事项
        </li>

        <li
          data-type="1"
          :class="{ at: type == '度报告' }"
          data-ul="cwbg_ul"
          @click="type = '度报告'"
        >
          财务报告
        </li>

        <li data-type="2" data-ul="rzgg_ul">融资公告</li>

        <li data-type="3">风险提示</li>

        <li data-type="6" data-ul="zccz_ul">资产重组</li>

        <li data-type="4">信息变更</li>

        <li data-type="7">持股变动</li>
      </ul>
    </div>

    <table cellpadding="0" cellspacing="0" class="noborder" id="dt_1">
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
        <tr v-for="notice in notices" :key="notice.notice_id">
          <td>{{ notice.code }}</td>
          <td>{{ notice.short_name }}</td>
          <td>
            <a
              target="_blank"
              :href="`https://pdf.dfcfw.com/pdf/H2_${notice.art_code}_1.pdf`"
            >
              {{ notice.title }}</a
            >
            <div>
              {{ notice.REPORTDATE }}: 营业收入同比增长:{{
                notice.YSTZ
              }}净利润同比增长:{{ notice.SJLTZ }} 净利润{{
                notice.PARENT_NETPROFIT
              }}净资产收益率 {{ notice.WEIGHTAVG_ROE }}%
            </div>
          </td>
          <td>{{ notice.type }}</td>
          <td>
            <span> {{ notice.notice_date }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!--分页-->
    <div class="page-bar">
      <ul>
        <li v-if="page != 0"><a v-on:click="page--, onPaginate(0)">首页</a></li>
        <li v-if="page > 0"><a v-on:click="page--, onPaginate()">上一页</a></li>

        <li v-if="page < pages">
          <a v-on:click="page++, onPaginate(page)">下一页</a>
        </li>
        <li v-if="page != pages"><a v-on:click="onPaginate(pages)">尾页</a></li>

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
import Pagination from "vue-pagination-2";

export default {
  data: function () {
    return {
      notices: [],
      page: 0,
      count: 0,
      pages: 0,
      type: "",
    };
  },
  components: {
    Pagination,
  },
  computed: {},
  mounted() {
    this.onPaginate(0);
  },

  methods: {
    onPaginate(page) {
      axios
        .get("/api/notices", { params: { p: page, type: this.type } })
        .then((resp) => {
          this.notices = resp.data.rows;
          this.count = resp.data.count;
          this.page = resp.data.page;
          this.pages = resp.data.pages;
        });
    },
  },
  watch: {
    type(n, o) {
      this.onPaginate(0);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
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
</style>


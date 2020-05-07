
<template>
  <div id="right" v-show="item">
    <ul>
      <li>
        <div class="name">
          <span>{{item.name}}({{item.code}})</span>
          <span
            class="content"
            :class="upDown(item.change)"
          >{{item.now|fmtValue}}({{item.change|fmtValue}}){{item.changeP}}</span>
        </div>
      </li>
      <li>
        <div class="c2">
          <span :class="upDown(item.open-item.preClose)">今开:{{item.open|fmtValue}}</span>
          <span>昨收:{{item.preClose|fmtValue}}</span>
        </div>
        <div class="c2">
          <span :class="upDown(item.low-item.preClose)">最低:{{item.low|fmtValue}}</span>
          <span :class="upDown(item.high-item.preClose)">最高:{{item.high|fmtValue}}</span>
        </div>
        <div class="c2">
          <span>换手率:{{item.turnover}}%</span>
          <span>市盈(动):{{item.pe}}</span>
        </div>
        <div class="c2">
          <span>每收益:{{item.prof}}</span>
          <span>未分配:{{item.unProf}}</span>
        </div>

        <div class="c2">
          <span>总市值:{{item.zsz}}</span>
          <span>流值:{{item.lz}}</span>
        </div>

        <div class="c2">
          <span>总量:{{(item.volume/10000/100).toFixed(2)}}万手</span>
          <span>总额:{{(item.amount/100000000).toFixed(2)}}亿</span>
        </div>
        <div class="sepb c2" :class="upDown(wc(item))">
          <span>委比:{{item|wb}}</span>
          <span>委差:{{wc(item)}}</span>
        </div>
      </li>
      <li>
        <table style="width:100%;" class="seperate">
          <tr class="price" v-for="(price,index) in item.bsPrices" :key="index">
            <th :class="{seperate:index==5}">
              <span v-if="index<5">卖 {{5-index}}</span>
              <span v-if="index>=5">买{{index-4}}</span>
            </th>
            <td :class="{seperate:index==5}">
              <span :class="upDown(price-item.preClose)">
                {{price}}
                <em v-if="index==4 && item.now>=price">↑</em>
                <em v-else-if="index==5&&item.now<=price">↓</em>
              </span>
            </td>
            <td :class="{seperate:index==5}">
              <span>{{(item.bsVols[index]/100).toFixed(0)}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="seperate"></td>
          </tr>
          <tr v-for="(t,i) in item.trade_list" :key="11+i">
            <th>{{t.t|mmss}}</th>
            <td>
              <span :class="{up:t.now>t.preNow,down:t.now<item.preNow}">{{t.now}}</span>
              <em v-if="t.now>t.preNow" class="up">↑</em>
              <em v-else-if="t.now<t.preNow" class="down">↓</em>
            </td>
            <td :class="{up:t.now>t.preNow,down:t.now<t.preNow}">{{t.volume-t.preVolume}}</td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>
<script>
import { loadScripts, parse, toFixed, toPercent, fmtdig } from "@/lib/utils";
import moment from "moment";

import jquery from "jquery";
export default {
  name: "Right",
  data() {
    return { trade_item_list: [] };
  },
  props: ["item"],
  filters: {
    mmss(date) {
      return date ? moment(date).format("HH:mm:ss") : "";
    },

    fmtValue(val) {
      return toFixed(val, 2);
    },
    fmtPercent(val) {
      return toPercent(val, 2);
    },
    wb(item) {
      if (!item.bsVols) return "--";
      let wtsell = item.bsVols.reduce((total, cur, curI, arr) => {
        return curI < 5 ? total + cur : total;
      }, 0);
      let wtbuy = item.bsVols.reduce((total, cur, curI, arr) => {
        return curI >= 5 ? total + cur : total;
      }, 0);
      let wb = toPercent((100 * (wtbuy - wtsell)) / (wtbuy + wtsell), 2);
      return wb;
    }
  },

  methods: {
    wc(item) {
      if (!item.bsVols) return 0;
      let wtsell = item.bsVols.reduce((total, cur, curI, arr) => {
        return curI < 5 ? total + cur : total;
      }, 0);
      let wtbuy = item.bsVols.reduce((total, cur, curI, arr) => {
        return curI >= 5 ? total + cur : total;
      }, 0);
      let wc = wtbuy - wtsell;
      return toFixed(wc / 100, 0);
    },

    upDown(val) {
      if (val > 0) return "up";
      else if (val < 0) return "down";
      else return "";
    },
    refresh() {
      if (!this.item) return Promise.resolve();
      let str = [this.item]
        .reduce((total, cur, curIndex, arr) => {
          total.push(`${cur.code}_i`);
          total.push(cur.code);
          return total;
        }, [])
        .join(",");
      this.item.preNow = this.item.now;
      this.item.preVolume = this.item.volume;

      let initTradeList = "";
      let jss = [`http://hq.sinajs.cn/list=${str}`];
      if (
        this.item.trade_list == null ||
        this.item.trade_list.length == 0 ||
        typeof this.item.trade_list[0].t !== "object"
      ) {
        initTradeList =
          `https://vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=11&symbol=${this.item.code}&rn=` +
          +new Date();
        jss.push(initTradeList);
      }

      return loadScripts(jss).then(() => {
        [this.item].map((item, i) => {
          let data = parse(item);
          Object.assign(item, data);
        });
        let item = this.item;
        if (!item) return;

        if (initTradeList != "") {
          let today = moment().format("YYYY-MM-DD");
          item.trade_list = trade_item_list.map(e => {
            return {
              t: new Date(`${today} ${e[0]}`),
              preNow: (e[3] == "DOWN" ? -0.01 : +0.01) + e[2],
              now: e[2],
              volume: (e[1] / 100).toFixed(0),
              preVolume: 0
            };
          });
        } else if (item.volume - item.preVolume > 0) {
          item.trade_list.unshift({
            t: new Date(),
            preNow: item.preNow,
            now: item.now,
            preVolume: item.preVolume,
            volume: item.volume,
            preAmount: item.preAmount,
            amount: item.amount
          });
          item.trade_list.length = Math.min(10, item.trade_list.length);
        }

        //`https://vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=11&symbol=${this.item.code}&rn=26470569`
        //this.trade_item_list.length = 0;
        //this.trade_item_list = trade_item_list;
      });
    },
    timerFn() {
      setTimeout(
        () =>
          this.refresh().then(() => {
            this.timerFn();
          }),
        2000
      );
    }
  },

  mounted() {
    this.timerFn();
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.up {
  color: #c00;
}
.down {
  color: green;
}
.name {
  display: inline-block;
  color: #666;
}
ul {
  width: 100%;
}
.seperatetd {
  border-top: 1px dashed #ccc;
}
#right {
  -webkit-user-select: none;
  position: fixed;
  right: 0;
  top: 10px;
  z-index: 10000;
  background: white;
  min-width: 300px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #666;
  font-size: 12px;
}

.seperate {
  border-top: 1px dashed rgba(122, 122, 122, 0.4);
}
.sepb {
  border-bottom: 1px dashed rgba(255, 255, 255, 0.4);
}

.now {
  border-bottom: 1px dashed rgba(255, 255, 255, 0.4);
}
.c2 > * {
  width: 49%;
  display: inline-block;
}
</style>
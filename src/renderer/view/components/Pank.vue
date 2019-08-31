
<template>
  <div id="suspension" :class="style">
    <div class="logo"></div>
    <div class="content_body">
      <div v-for="item in items" :key="item.code">
        <div class="name">{{item.name}}</div>
        <div class="now">
          <span
            class="content"
            :class="upDown(item.change)"
          >{{item.now|fmtValue}}({{item.change|fmtValue}}){{item.changeP}}</span>
        </div>
        <div class="c2">
          <span :class="upDown(item.open-item.preClose)">今开:{{item.open|fmtValue}}</span>
          <span>昨收:{{item.preClose|fmtValue}}</span>
        </div>
        <div class="c2">
          <span :class="upDown(item.low-item.preClose)">最低:{{item.low|fmtValue}}</span>
          <span :class="upDown(item.high-item.preClose)">最高:{{item.high|fmtValue}}</span>
        </div>
        <div class="c2">
          <span>换手率:{{item.turnRate}}</span>
          <span>市盈(动):{{item.pe}}</span>
        </div>
        <div class="c2">
          <span>总市值:{{item.zsz}}</span>
          <span>流通市值:{{item.lz}}</span>
        </div>
        <div class="c2">
          <span>总量:{{(item.volume/10000/100).toFixed(2)}}万手</span>
          <span>总额:{{(item.amount/100000000).toFixed(2)}}亿</span>
        </div>
        <div class="sepb c2" :class="upDown(wc(item))">
          <span>委比:{{item|wb}}</span>
          <span>委差:{{wc(item)}}</span>
        </div>
        <div
          class="price"
          v-for="(price,index) in item.bsPrices"
          :key="index"
          :class="{seperate:index==5}"
        >
          <span v-if="index<5">卖 {{5-index}}</span>
          <span v-if="index>=5">买{{index-4}}</span>
          <span :class="upDown(price-item.preClose)">
            {{price}}
            <em v-if="index==4 && item.now>=price">↑</em>
            <em v-else-if="index==5&&item.now<=price">↓</em>
          </span>
          <span>{{(item.bsVols[index]/100).toFixed(0)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/localdata";
import { loadScripts, parse, toFixed, toPercent, fmtdig } from "@/utils";

import jquery from "jquery";
export default {
  name: "Pank",
  data() {
    return {
      items: [{ code: "sh000001" }],
      style: ""
    };
  },
  filters: {
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
    showPK(item) {
      if (this.openwin) {
        try {
          this.openwin.close();
        } catch (e) {}
      }
      this.openwin = window.open(
        `http://localhost:9080/#/`,
        "item",
        "left=0px,top=100px"
      );
    },
    upDown(val) {
      if (val > 0) return "up";
      else if (val < 0) return "down";
      else return "";
    },
    refresh() {
      let str = this.items
        .reduce((total, cur, curIndex, arr) => {
          total.push(`${cur.code}_i`);
          total.push(cur.code);
          return total;
        }, [])
        .join(",");
      console.log(str);
      return loadScripts([`http://hq.sinajs.cn/list=${str}`]).then(() => {
        this.items.map((item, i) => {
          let data = parse(item);
          console.log(data);
          Object.assign(item, data);
          this.items.splice(i, 1, item);
          console.log(item);
          // vm.items.splice(newLength)

          if (!item.pe && item.code.match(/^(sh)|(sz)/)) {
            let marketId = `${item.code.substring(0, 2) == "sh" ? 1 : 0}.${
              item.code.match(/\d+/)[0]
            }`;
            jquery.ajax({
              url:
                "http://push2.eastmoney.com/api/qt/stock/get?ut=fa5fd1943c7b386f172d6893dbfba10b&invt=2&fltt=2&fields=f43,f57,f58,f169,f170,f46,f44,f51,f168,f47,f164,f116,f60,f45,f52,f50,f48,f167,f117,f71,f161,f49,f530,f135,f136,f137,f138,f139,f141,f142,f144,f145,f147,f148,f140,f143,f146,f149,f55,f62,f162,f92,f173,f104,f105,f84,f85,f183,f184,f185,f186,f187,f188,f189,f190,f191,f192,f107,f111,f86,f177,f78,f110,f262,f263,f264,f267,f268,f250,f251,f252,f253,f254,f255,f256,f257,f258,f266,f269,f270,f271,f273,f274,f275,f127,f199,f128,f193,f196,f194,f195,f197,f80,f280,f281,f282,f284,f285,f286,f287&secid=" +
                marketId,
              scriptCharset: "utf-8",
              dataType: "jsonp",
              jsonp: "cb",
              success: function(json) {
                if (json) {
                  item.turnRate = json.data.f168;
                  item.pe = json.data.f162;
                  item.zsz = fmtdig(json.data.f116, 1, 2, "", true);
                  item.lz = fmtdig(json.data.f117, 1, 2, "", true);
                  //alert(json);
                }
              }
            });
          }
        });
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
    let item = JSON.parse(decodeURIComponent(this.$route.query.item));
    console.log(item);
    this.items = [item];
    this.style = this.$route.query.style;
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;

    let resizeWin = () => {
      setTimeout(() => {
        let winSize = win.getSize();
        let body = document.body,
          html = document.documentElement;

        let height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        win.setSize(winSize[0], height);
      }, 0);
    };

    resizeWin();

    let that = this;
    document.addEventListener("mouseleave", event => {
      window.close();
    });

    document.addEventListener("mousedown", function(e) {
      switch (e.button) {
        case 0:
          biasX = e.x;
          biasY = e.y;
          document.addEventListener("mousemove", moveEvent);
          break;
        case 2:
          that.$electron.ipcRenderer.send("createSuspensionMenu");
          break;
      }
    });

    document.addEventListener("mouseup", function() {
      biasX = 0;
      biasY = 0;
      document.removeEventListener("mousemove", moveEvent);
    });

    function moveEvent(e) {
      win.setPosition(e.screenX - biasX, e.screenY - biasY);
    }
    this.timerFn();
  }
};
</script>

<style>
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
.content {
  display: inline-block;
}
.logo {
  width: 3px;
  background-size: 80%;
}

.content_body {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
}
.style2 .content_body {
  background-color: rgba(255, 255, 255, 0.6);
}
#suspension {
  -webkit-user-select: none;
  position: relative;
}

#suspension {
  border-radius: 2px;
  display: flex;
  color: #666;
  font-size: 12px;
}
.shrink2 {
  width: 8px;
  height: 8px;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  position: absolute;
  right: 5px;
  cursor: pointer;
}
#rt {
  top: 10px;
}
#rd {
  bottom: 14px;
}
#suspension .shrink {
  background: green;
}
.seperate {
  border-top: 1px dashed rgba(255, 255, 255, 0.4);
}
.sepb {
  border-bottom: 1px dashed rgba(255, 255, 255, 0.4);
}
.price span {
  display: inline-block;
}
.price span:nth-child(1) {
  width: 20%;
  color: #666;
}
.price span:nth-child(2) {
  width: 50%;
  display: inline-block;
}
.price span:nth-child(3) {
  width: 25%;
  color: #666;
}
.now {
  border-bottom: 1px dashed rgba(255, 255, 255, 0.4);
}
.c2 > * {
  width: 49%;
  display: inline-block;
}
</style>
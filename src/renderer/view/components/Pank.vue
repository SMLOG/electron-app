
<template>
  <div id="suspension">
    <div class="logo"></div>
    <div class="content_body">
      <div v-for="item in items" :key="item.code">
        <div class="name">{{item.name}}</div>
        <div class="now">
          <span
            class="content"
            :class="upDown(item.change)"
          >{{item.now|fmtValue}}({{item.change|fmtValue}}){{item.changeP|fmtPercent}}</span>
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
import { loadScripts, parse, toFixed, toPercent } from "@/utils";

export default {
  name: "Pank",
  data() {
    return {
      items: [{ code: "sh000001" }]
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
          if (cur.code.match(/^(sh)|(sz)/)) {
            total.push(cur.code);
            total.push(`${cur.code}_i`);
            return total;
          }
        }, [])
        .join(",");
      console.log(str);
      return loadScripts([`http://hq.sinajs.cn/list=${str}`]).then(() => {
        this.items.map((item, i) => {
          let hqstr = window[`hq_str_${item.code}`];
          let data = parse(hqstr, item.code);
          Object.assign(item, data);
          this.items.splice(i, 1, item);
          console.log(item);
          // vm.items.splice(newLength)
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
    let code = this.$route.query.code;
    this.items = [{ code: code }];

    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    document.addEventListener("mouseleave", event => {
      // window.close();
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
.upload {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  text-align: center;
  color: #74a1fa;
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

#suspension {
  -webkit-user-select: none;
  position: relative;
}

#suspension {
  border-radius: 2px;
  display: flex;
  color: #666;
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
  border-top: 1px dashed #ccc;
}
.sepb {
  border-bottom: 1px dashed #ccc;
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
  border-bottom: 1px dashed #ccc;
}
.c2 > * {
  width: 49%;
  display: inline-block;
}
</style>
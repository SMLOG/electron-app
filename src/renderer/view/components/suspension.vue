
<template>
  <div id="suspension" ref="box" @mouseenter="unCollapseH" @mouseleave="collapse(false)">
    <div class="logo"></div>
    <span id="rt" class="shrink2" @click="toggleShrinkTop" :class="{shrink:shrinkTop}"></span>
    <div class="content_body">
      <div class="item flex" v-for="(item) in items" :key="item.code">
        <span style="width:8px;" :class="upDown(item.now-item.pre)">{{item|nowPre}}</span>
        <span class="name" :title="title(item)" @click="openItem(item,$event)">{{item.name}}</span>
        <span class="content" :class="upDown(item.now-item.preClose)">
          <i @mouseenter="showPK(item)" @mouseleave="hidePK(item)">{{item.now}}</i>
          <i @mouseenter="showPK(item,'style2')">({{item.change}}){{item.changeP}}</i>
        </span>
      </div>
      <div class="item" @click="trade()">{{time}}</div>
    </div>
    <span
      id="rd"
      class="shrink2"
      @mouseenter="unCollapseV"
      @click="toggleShrinkBottom"
      :class="{shrink:shrinkBottom}"
    ></span>
  </div>
</template>
<script>
import store from "@/localdata";
import {
  loadScripts,
  parse,
  toFixed,
  toPercent,
  getLink,
  openWin,
  openWin2,
  openSite
} from "@/utils";
import { ObjectType } from "@/utils";

export default {
  name: "suspension",
  data() {
    return {
      time: "--",
      items: [{ code: "sh000001" }],
      shrinkBottom: true,
      shrinkTop: false,
      loadMDate: false,
      altKey: false
    };
  },
  filters: {
    nowPre(item) {
      return item.now > item.pre ? "↑" : item.now < item.pre ? "↓" : "";
    },
    fmtValue(val) {
      return toFixed(val, 2);
    },
    fmtPercent(val) {
      return toPercent(val, 2);
    }
  },

  methods: {
    checkAltKey(e) {
      this.altKey = e.altKey == 1;
    },
    altKeyShow(e) {
      if (e.altKey) {
        this.unCollapse();
      }
    },
    title(item) {
      return `${item.name}\n${ObjectType[item.countryID]}\n${item.orgCode}`;
    },
    dragEnd(e) {
      e.preventDefault(); //通知 Web 浏览器不要执行与事件关联的默认动作
      store.save(this.items);
      this.sendRefresh();
    },
    hidePK(item, event) {
      try {
        if (this.openwin) this.openwin.close();
      } catch (e) {}
    },
    showPK(item, style, event) {
      let url = `${
        window.location.href.split("#")[0]
      }#/pank?item=${encodeURIComponent(
        JSON.stringify({
          code: item.code,
          countryID: item.countryID,
          orgCode: item.orgCode
        })
      )}&style=${style}`;
      if (this.openwin) {
        try {
          /*if (this.openwin.location.indexOf("#/pank")) {
            this.openwin.location = url;
            return;
          }*/
          this.openwin.close();
          delete this.openwin;
          delete window.openwin;
        } catch (e) {}
      }
      let win = this.$electron.remote.getCurrentWindow();
      let winPos = win.getPosition();
      window.openwin = this.openwin = window.open(
        url,
        "item",
        `left=${winPos[0] - 253}px,top=${winPos[1]}px,width=250px,height=351px`
      );
    },
    toggleShrinkTop() {
      this.shrinkTop = !this.shrinkTop;
    },
    toggleShrinkBottom() {
      this.shrinkBottom = !this.shrinkBottom;
    },
    notify(item, message) {
      this.$electron.remote.app.notifywin.webContents.send("message", {
        id: +new Date(),
        time: item.time,
        item: item,
        content: message
      });
    },
    openItem(item, event) {
      if (event.altKey) openWin(this, item);
      else openWin2(this, item);
    },
    upDown(val) {
      if (val > 0) return "up";
      else if (val < 0) return "down";
      else return "";
    },
    loadDatas() {
      this.items = store.fetch();
      this.loadMD();
    },
    loadMD() {
      let that = this;
      (async function() {
        for (let i = 0; i < that.items.length; ++i) {
          let item = that.items[i];
          let url = `http://money.finance.sina.com.cn/quotes_service/api/jsonp_v2.php/window.var_${item.code}=/CN_MarketData.getKLineData?symbol=${item.code}&scale=240&ma=5,10,20,30,60&datalen=1`;

          await loadScripts([url]).then(() => {});
        }
        that.items.map(item => {
          item.data = window[`var_${item.code}`];
          delete window[`var_${item.code}`];
        });
        that.loadMDate = new Date().getTime();
      })();
    },
    refresh() {
      let win = this.$electron.remote.getCurrentWindow();
      win.setAlwaysOnTop(true, true, 1);
      let str = this.items
        .reduce((total, cur, curIndex, arr) => {
          if (cur.code.match(/^(sh)|(sz)/)) {
            total.push(`${cur.code}_i`);
          }
          total.push(cur.code);

          return total;
        }, [])
        .join(",");
      let needReloadData = false;
      //http://money.finance.sina.com.cn/quotes_service/api/jsonp_v2.php/var=/CN_MarketData.getKLineData?symbol=sz000001&scale=240&ma=no&datalen=1
      //http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sh601318&scale=240&ma=5,10,30&datalen=1
      return loadScripts([`http://hq.sinajs.cn/list=${str}`]).then(() => {
        this.items.map((item, i) => {
          let data = parse(item);
          data.pre = item.now;
          if (item.time) this.time = item.time;
          Object.assign(item, data);

          this.items.splice(i, 1, item);

          //** 每增涨 0.5 发送通知 */
          item.threshold == undefined && (item.threshold = 0);

          let diff = item.changePV - item.threshold;
          if (Math.abs(diff) >= 0.5) {
            let incr = parseInt(diff / 0.5) * 0.5;
            this.notify(
              item,
              `increase ${incr} +  ${item.threshold}% to ${item.changeP}.`
            );
            item.threshold += incr;
          }

          //**超过均线后发送通知 */
          if (item.data && item.data.length > 0) {
            for (let i in (5, 10, 20, 30, 16)) {
              if (item.price > item.data[0][`ma_price${i}`]) {
                this.notify(
                  item,
                  `over MD${i} ${item.data[0][`ma_price${i}`]}.`
                );
              }
            }
          }

          // vm.items.splice(newLength)
        });
        if (new Date().getTime() - this.loadMDate > 86400000) this.loadMD();
      });
    },
    timerFn() {
      setTimeout(
        () =>
          this.refresh().then(() => {
            this.timerFn();
          }),
        1000
      );
    },
    resizeWin() {
      let win = this.$electron.remote.getCurrentWindow();
      let screen = this.$electron.remote.screen;
      let winSize = win.getSize();
      //  win.setSize(winSize[0], this.items.length * 27);
      let body = document.body,
        html = document.documentElement;

      let height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      if (winSize[1] != height) this.setSize(winSize[0], height);
    },
    setSize(w, h) {
      let win = this.$electron.remote.getCurrentWindow();
      win.setResizable(true);
      win.setSize(w, h);
      win.setResizable(false);
    },
    unCollapse(all) {
      if (this.shrinkBottom) {
        this.unCollapseV();
      }
      if (this.shrinkTop) {
        this.unCollapseH();
      }
    },
    collapse(all) {
      let win = this.$electron.remote.getCurrentWindow();
      let screen = this.$electron.remote.screen;

      let winSize = win.getSize();

      if (this.shrinkBottom) {
        this.setSize(winSize[0], 1 * 25);
      }
      if (this.shrinkTop) {
        const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
        win.setPosition(size.width - 6, win.getPosition()[1]);
      }
    },
    unCollapseH() {
      let win = this.$electron.remote.getCurrentWindow();
      let winSize = win.getSize();
      const size = this.$electron.remote.screen.getPrimaryDisplay()
        .workAreaSize; //获取显示器的宽高

      win.setPosition(size.width - winSize[0] + 3, win.getPosition()[1]);
    },
    unCollapseV() {
      this.resizeWin();
    },
    trade() {
      openSite(this);
    }
  },

  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let openwin;

    this.loadDatas();

    this.$electron.ipcRenderer.on("refresh", () => {
      this.loadDatas();
      this.unCollapse();
    });

    this.$electron.ipcRenderer.on("keyToggleShow", () => {
      if (win.getSize()[1] > 30) this.collapse(true);
      else this.unCollapse(true);
    });
    this.unCollapse();
    this.collapse();
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
    console.log(this);
    this.timerFn();
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.item {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  text-align: center;
  color: #ccc;
}
.up {
  color: #c00;
}
.down {
  color: green;
}
.name {
  cursor: pointer;
  display: inline-block;
  width: 50px;
  text-align: left;
}
.content {
  display: inline-block;
}
.logo {
  width: 3px;
  background-size: 80%;
}

.content_body {
  width: 100%;
}

#suspension {
  -webkit-user-select: none;
  position: relative;
  overflow: hidden;
}

#suspension {
  border-radius: 3px;
  display: flex;
  background-color: #eef4fe;

  /* background-color: rgba(255, 255, 255, 0.6);*/
}
.shrink2 {
  width: 6px;
  height: 6px;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  position: fixed;
  right: 5px;
  cursor: pointer;
}
#rt {
  top: 10px;
}
#rd {
  bottom: 6px;
}
#suspension .shrink {
  background: green;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #ddd;
}

::-webkit-scrollbar-thumb {
  background: #666;
}
i {
  font-style: normal;
}
#arrow {
  display: inline-block;
  position: absolute;
  left: -2px;
  z-index: 0;
}
i.arrow {
  display: inline-block;
  border-style: solid;
  border-width: 0 0 8px 8px;
  border-color: transparent transparent rgba(0, 0, 0, 0.2) transparent;
  flex: 0;
}
.arrow.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.arrow.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.flex {
  display: flex;
  flex-direction: row;
}
</style>
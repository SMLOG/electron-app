
<template>
  <div id="suspension" ref="box" @mouseleave="collapse(false)">
    <canvas
      id="canvas"
      ref="canvas"
      style="position: absolute;top: 0;left: 0;right:0;bottom:0;z-index: 10;pointer-events:none;"
    ></canvas>
    <span id="rt" class="shrink2" @click="toggleShrinkTop" :class="{shrink:shrinkTop}"></span>
    <div style="position:fixed;top:0;left:0;height:27px;width:100%;" class="item progress">
      <div
        class="progress_bar"
        :class="{up:indexPercent>0,down:indexPercent<0}"
        :style="{width:progressBarWidth+'%'}"
      ></div>
    </div>
    <div class="content_body">
      <div
        class="item etmf-void"
        v-for="(item,i) in items"
        :key="item.code"
        v-show="!isCollapseH || (isCollapseH&&selectIndex==i)"
      >
        <div class="flex">
          <span style="width:8px;" :class="upDown(item.now-item.pre)">{{item|nowPre}}</span>
          <span
            class="name"
            :style="{textDecoration:item.nameColor=='red'&& 'underline'}"
            :title="title(item)"
            @click="openItem(item,$event)"
          >{{item.name}}</span>
          <span class="content" :class="upDown(item.now-item.preClose)">
            <i>{{item.now}}</i>
            <i>({{item.change}}){{item.changeP}}</i>
          </span>
        </div>
      </div>
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
import jquery from "jquery";
import {
  loadScripts,
  parse,
  toFixed,
  toPercent,
  getLink,
  openWin,
  openWin2,
  openSite,
  time,
  ObjectType
} from "@/lib/utils";
import { setTimeout } from "timers";
//import { drawMAs } from "@/ma";

/*import TransparencyMouseFix from "electron-transparency-mouse-fix";const fix = new TransparencyMouseFix({
  log: true,
  fixPointerEvents: "auto"
});*/
export default {
  name: "suspension",
  data() {
    return {
      time: "--",
      items: [{ code: "sh000001" }],
      shrinkBottom: true,
      shrinkTop: false,
      loadMDate: false,
      altKey: false,
      indexCode: "sh000001",
      progressBarWidth: 0,
      indexPercent: 0,
      selectIndex: 0,
      isCollapseH: false
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
  computed: {
    filteredItems() {
      return this.items.filter(e => e.isFocus);
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
    hidePK(item, isCloseWin, event) {
      try {
        if (this.timerID) clearTimeout(this.timerID);
        if (this.openwin && isCloseWin) this.openwin.close();
      } catch (e) {}
    },
    showPK(item, style, event) {
      this.timerID = setTimeout(() => {
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
          `left=${winPos[0] - 253}px,top=${
            winPos[1]
          }px,width=250px,height=351px`
        );
      }, 500);
    },
    toggleShrinkTop() {
      // this.shrinkTop = !this.shrinkTop;
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
      console.log(event);
      if (event.altKey) openWin(this, item);
      else if (event.ctrlKey || event.metaKey) {
        this.$electron.shell.openExternal(
          `http://quote.eastmoney.com/${item.code}.html`
        );
      } else openWin2(this, item);
    },
    upDown(val) {
      if (val > 0) return "up";
      else if (val < 0) return "down";
      else return "";
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
        html.offsetHeight,
        27 * this.items.length
      );
      console.log(height);
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
    },
    collapse(all) {
      let win = this.$electron.remote.getCurrentWindow();
      let screen = this.$electron.remote.screen;

      let winSize = win.getSize();

      if (this.shrinkBottom) {
        this.setSize(winSize[0], 1 * 27);
        this.isCollapseH = true;
      }
      if (this.shrinkTop) {
        const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
        win.setPosition(size.width - 6, win.getPosition()[1]);
      }
      //win.setIgnoreMouseEvents(true, { forward: true });
    },
    unCollapseV() {
      this.isCollapseH = false;
      this.resizeWin();
      //requestAnimationFrame(this.resizeWin().bind(this));
    },
    trade() {}
  },

  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let openwin;

    this.$electron.ipcRenderer.on("refresh", (event, datas) => {
      //this.loadDatas();
      let win = this.$electron.remote.getCurrentWindow();
      win.setAlwaysOnTop(true, true, 1);
      this.items = datas;
      //this.unCollapse();
      let items = this.items.filter(it => it.code == this.indexCode);

      if (
        items.length > 0 &&
        items[0].code == this.indexCode &&
        items[0].changePV
      ) {
        this.progressBarWidth = Math.abs(items[0].changePV / 1) * 100;
        this.indexPercent = items[0].changePV;
      }

      /*setTimeout(() => {
        drawMAs(this.$refs.canvas, this.items, 27);
      }, 300);*/
    });

    this.$electron.ipcRenderer.on("ALT+Z", () => {
      console.log("height:" + win.getSize()[1]);
      if (win.getSize()[1] > 30) this.collapse(true);
      else this.unCollapse(true);
    });
    let displayNext = () => {
      this.selectIndex++;
      if (this.selectIndex >= this.items.length) this.selectIndex = 0;
    };
    this.$electron.ipcRenderer.on("ALT+CommandOrControl+L", displayNext);
    let randomDisplayTimerID = 0;
    this.$electron.ipcRenderer.on("ALT+CommandOrControl+1", () => {
      if (randomDisplayTimerID > 0) {
        clearInterval(randomDisplayTimerID);
        randomDisplayTimerID = 0;
      } else {
        randomDisplayTimerID = setInterval(() => {
          displayNext();
        }, 3000);
      }
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
    //this.timerFn();
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.item {
  height: 27px;
  line-height: 27px;
  font-size: 12px;
  text-align: center;
  color: #666;
}
.item:hover {
  background-color: #eee;
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

  background-color: rgba(255, 255, 255, 0.6);
}
.shrink2 {
  width: 3px;
  height: 3px;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  position: fixed;
  right: 5px;
  cursor: pointer;
  z-index: 2;
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
  position: relative;
  z-index: 1;
}
.progress {
  position: relative;
}
.progress_bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0%;
  z-index: 0;
}
.progress_bar.up {
  background: rgba(255, 0, 0, 0.2);
}
.progress_bar.down {
  background: rgba(0, 255, 0, 0.2);
}
.click-on {
  pointer-events: all;
}
.click-through {
  pointer-events: none;
}
</style>
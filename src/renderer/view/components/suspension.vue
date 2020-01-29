<template>
  <Dock @onCollapseH="onCollapseH" ref="dock">
    <div id="suspension">
      <div
        style="position:fixed;top:0;left:0;height:27px;width:100%;"
        class="item progress"
      >
        <div
          class="progress_bar"
          :class="{ up: indexPercent > 0, down: indexPercent < 0 }"
          :style="{ width: progressBarWidth + '%' }"
        ></div>
      </div>
      <div class="content_body">
        <div
          class="item etmf-void"
          v-for="item in filteredItems"
          :key="item.code"
        >
          <div class="flex">
            <span style="width:8px;" :class="upDown(item.now - item.pre)">{{
              item | nowPre
            }}</span>
            <span
              class="name"
              :style="{
                textDecoration: item.nameColor == 'red' && 'underline'
              }"
              :title="title(item)"
              @click="openItem(item, $event)"
              >{{ item.name }}</span
            >
            <span class="content" :class="upDown(item.now - item.preClose)">
              <i>{{ item.now }}</i>
              <i>({{ item.change }}){{ item.turnover }}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </Dock>
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
  openSite,
  time,
  ObjectType
} from "@/lib/utils";
import { setTimeout } from "timers";
//import { drawMAs } from "@/ma";
import Dock from "@/view/components/Dock";

/*import TransparencyMouseFix from "electron-transparency-mouse-fix";const fix = new TransparencyMouseFix({
  log: true,
  fixPointerEvents: "auto"
});*/
export default {
  name: "suspension",
  data() {
    return {
      items: [{ code: "sh000001" }],
      altKey: false,
      indexCode: "sh000001",
      progressBarWidth: 0,
      indexPercent: 0,
      selectIndex: 0,
      isCollapseH: false
    };
  },
  components: {
    Dock
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
      if (this.isCollapseH)
        return this.items
          .filter((e, i) => i == this.selectIndex)
          .concat(this.items.filter((e, i) => i !== this.selectIndex));
      else return this.items;
    }
  },
  watch: {},
  methods: {
    checkAltKey(e) {
      this.altKey = e.altKey == 1;
    },
    onCollapseH(b) {
      this.isCollapseH = b;
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
    }
  },

  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let openwin;

    this.$electron.ipcRenderer.on("refresh", (event, datas) => {
      if (datas.length != this.items.length) {
          window.requestAnimationFrame(()=>{
            this.$refs.dock.onResize();
        });

      }
      this.items = datas;
      let items = this.items.filter(it => it.code == this.indexCode);

      if (
        items.length > 0 &&
        items[0].code == this.indexCode &&
        items[0].changePV
      ) {
        this.progressBarWidth = Math.abs(items[0].changePV / 1) * 100;
        this.indexPercent = items[0].changePV;
      }
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

<style scoped>
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

::-webkit-scrollbar {
  width: 0px;
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


<template>
  <div id="suspension">
    <div class="logo"></div>
    <span id="rt" class="shrink2" @click="shrinkH" :class="{shrink:autoShrinkHWhenOut}"></span>
    <div class="content_body">
      <div class="item" v-for="item in items" :key="item.code">
        <span class="name" :title="item.name" @click="openItem(item)">{{item.name}}</span>
        <span
          @mouseenter="showPK(item)"
          @mouseleave="hidePK(item)"
          class="content"
          :class="upDown(item.change)"
        >{{item.now|fmtValue}}({{item.change|fmtValue}}){{item.changeP|fmtPercent}}</span>
      </div>
    </div>
    <span id="rd" class="shrink2" @click="shrinkW" :class="{shrink:autoShrinkVWhenOut}"></span>
  </div>
</template>
<script>
import store from "@/localdata";
import { loadScripts, parse, toFixed, toPercent } from "@/utils";

export default {
  name: "suspension",
  data() {
    return {
      time: "world",
      items: [{ code: "sh000001" }],
      autoShrinkVWhenOut: false,
      autoShrinkHWhenOut: false
    };
  },
  filters: {
    fmtValue(val) {
      return toFixed(val, 2);
    },
    fmtPercent(val) {
      return toPercent(val, 2);
    }
  },

  methods: {
    hidePK(item, event) {
      try {
        if (this.openwin) this.openwin.close();
      } catch (e) {}
    },
    showPK(item, event) {
      let url = `${window.location.href.split("#")[0]}#/pank?code=${item.code}`;
      if (this.openwin) {
        try {
          /*if (this.openwin.location.indexOf("#/pank")) {
            this.openwin.location = url;
            return;
          }*/
          this.openwin.close();
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
    shrinkH() {
      this.autoShrinkHWhenOut = !this.autoShrinkHWhenOut;
    },
    shrinkW() {
      this.autoShrinkVWhenOut = !this.autoShrinkVWhenOut;
    },
    notify(item, message) {
      this.$electron.remote.app.notifywin.webContents.send("message", {
        id: +new Date(),
        time: item.time,
        item: item,
        content: message
      });
    },
    openItem(item) {
      if (this.openwin) {
        try {
          this.openwin.close();
          this.openwin = null;
          return;
        } catch (e) {}
        if (this.openwin.code == item.code) return;
      }
      {
        window.openwin = this.openwin = new this.$electron.remote.BrowserWindow(
          {
            width: 800,
            height: 600,
            webPreferences: {
              javascript: true,
              plugins: true,
              nodeIntegration: true,
              webSecurity: false,
              preload: "http://localhost:9080/static/preload.js"
            }
          }
        );
        this.openwin.loadURL(
          `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`
        );
        openwin.webContents.executeJavaScript(`function loadScripts(scripts) {
  return scripts.reduce((currentPromise, scriptUrl) => {
    return currentPromise.then(() => {
      return new Promise((resolve, reject) => {
        var script = document.createElement("script");
        script.async = true;
        script.src = scriptUrl;
        script.onload = () => resolve();
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    });
  }, Promise.resolve());
}`);
        openwin.webContents.executeJavaScript(
          `loadScripts(['http://localhost:9080/static/preload.js'])`
        );
        //openwin.webContents.openDevTools();
        /* window.openwin = this.openwin = window.open(
          `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`,
          "item"
        );*/
        this.openwin.code = item.code;
      }
      //let win = this.$electron.remote.getCurrentWindow();
      // win.focus();
    },
    upDown(val) {
      if (val > 0) return "up";
      else if (val < 0) return "down";
      else return "";
    },
    loadDatas() {
      this.items = store.fetch();
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
      return loadScripts([`http://hq.sinajs.cn/list=${str}`]).then(() => {
        this.items.map((item, i) => {
          let hqstr = window[`hq_str_${item.code}`];
          let data = parse(hqstr, item.code);
          Object.assign(item, data);
          this.items.splice(i, 1, item);
          item.threshold == undefined && (item.threshold = 0);
          if (Math.abs(item.changeP - item.threshold) >= 0.5) {
            item.threshold +=
              parseInt((item.changeP - item.threshold) / 0.5) * 0.5;
            this.notify(
              item,
              `over ${item.threshold}% to ${toFixed(item.changeP, 2)}%.`
            );
          }

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
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let openwin;

    let resizeWin = () => {
      let winSize = win.getSize();
      win.setSize(winSize[0], this.items.length * 27);
    };
    this.loadDatas();

    this.$electron.ipcRenderer.on("refresh", () => {
      that.loadDatas();
      resizeWin();
    });
    resizeWin();
    document.addEventListener("mouseenter", event => {
      let winSize = win.getSize();

      if (this.autoShrinkVWhenOut) {
        resizeWin();
      }
      if (this.autoShrinkHWhenOut) {
        const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
        win.setPosition(size.width - winSize[0], win.getPosition()[1]);
      }
    });

    document.addEventListener("mouseleave", event => {
      let winSize = win.getSize();

      if (this.autoShrinkVWhenOut) {
        this.time = winSize[1];

        win.setSize(winSize[0], 1 * 27);
      }
      if (this.autoShrinkHWhenOut) {
        const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
        win.setPosition(size.width - 10, win.getPosition()[1]);
      }
    });
    let ev = document.createEvent("HTMLEvents");
    ev.initEvent("mouseleave", false, true);
    document.dispatchEvent(ev);

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
  color: #74a1fa;
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
}

#suspension {
  border-radius: 3px;
  display: flex;
  background-color: #eef4fe;
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
</style>
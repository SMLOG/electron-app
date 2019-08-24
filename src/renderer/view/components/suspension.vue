
<template>
  <div id="suspension">
    <div class="logo"></div>
    <span id="rt" class="shrink2" @click="shrinkH" :class="{shrink:autoShrinkHWhenOut}"></span>
    <div class="content_body">
      <div class="upload" v-for="item in items" :key="item.code">
        <span :title="item.name" @click="openItem(item)">{{item.name}}</span>
        <span
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
    shrinkH() {
      this.autoShrinkHWhenOut = !this.autoShrinkHWhenOut;
    },
    shrinkW() {
      this.autoShrinkVWhenOut = !this.autoShrinkVWhenOut;
    },
    openItem(item) {
      if (this.openwin && this.openwin.code == item.code) {
        try {
          this.openwin.close();
          this.openwin = null;
        } catch (e) {}
      } else {
        this.openwin = window.open(
          `http://quotes.sina.cn/hs/company/quotes/view/${item.code}/?from=wap`,
          "item"
        );
        this.openwin.code = item.code;
      }
      let win = this.$electron.remote.getCurrentWindow();
      win.focus();
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
      //let scripts = ["http://hq.sinajs.cn/list=" + codes.join(",")];
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
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let openwin;

    this.loadDatas();

    this.$electron.ipcRenderer.on("refresh", () => {
      that.loadDatas();
    });

    document.addEventListener("mouseenter", event => {
      let winSize = win.getSize();

      if (this.autoShrinkVWhenOut) {
        this.time = winSize[1];
        win.setSize(winSize[0], this.items.length * 27);
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
.upload {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  text-align: center;
  color: #74a1fa;
}
.up {
  color: red;
}
.down {
  color: green;
}
.logo {
  width: 40px;
  background: #5b9bfe url("../../assets/img/logo@2x.png") no-repeat 2px 3px;
  background-size: 80%;
}

.content_body {
  background-color: #eef4fe;
  width: 100%;
}

#suspension {
  -webkit-user-select: none;
  cursor: pointer;
}

#suspension {
  cursor: pointer !important;
  border-radius: 4px;
  display: flex;
  border: 1px solid #3388fe;
}
.shrink2 {
  width: 8px;
  height: 8px;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  position: fixed;
  right: 5px;
  cursor: pointer;
}
#rt {
  top: 5px;
}
#rd {
  bottom: 12px;
}
#suspension .shrink {
  background: green;
}
</style>
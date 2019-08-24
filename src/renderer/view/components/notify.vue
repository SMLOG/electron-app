
<template>
  <div id="suspension">
    <div class="logo" ref="logo"></div>
    <span id="rt" class="shrink2" @click="shrinkH" :class="{shrink:autoShrinkHWhenOut}"></span>
    <div class="content_body">
      <div class="item" v-for="msg in messages" :key="msg.id">
        <div>
          <span>{{msg.time}}</span>
          <span class="name" :title="msg.item.name" @click="openItem(msg.item)">{{msg.item.name}}</span>
          <span
            class="content"
            :class="upDown(msg.item.change)"
          >{{msg.item.now|fmtValue}}({{msg.item.change|fmtValue}}){{msg.item.changeP|fmtPercent}}</span>
        </div>
        <div>超过 5% MD5 29.60 MD10 30 MD20 30 MD20 30 MD20 30 MD20 30</div>
      </div>
    </div>
    <span id="rd" class="shrink2" @click="shrinkW" :class="{shrink:autoShrinkVWhenOut}"></span>
  </div>
</template>
<script>
import store from "@/localdata";
import { loadScripts, parse, toFixed, toPercent } from "@/utils";

export default {
  name: "notify",
  data() {
    return {
      messages: [],
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
    hide() {},
    show() {},
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
    }
  },

  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let openwin;
    let ismouseover = false;
    let timerID;

    let hide = () => {
      let winSize = win.getSize();
      const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
      win.setPosition(size.width - 10, win.getPosition()[1]);
    };
    let show = () => {
      let winSize = win.getSize();
      const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
      win.setPosition(size.width - winSize[0], win.getPosition()[1]);
      console.log(size.width - winSize[0]);
    };
    this.$electron.ipcRenderer.on("message", (event, message) => {
      this.messages.unshift(message);
      this.messages.splice(0, this.messages.length - 50);
      //this.$el.scrollTop = this.$el.scrollHeight;
      if (!ismouseover) {
        window.scrollTo(0, 0);
        timerID && clearTimeout(timerID) && (timerID = 0);
        show();
        timerID = setTimeout(hide, 10000);
      }
    });

    document.addEventListener("mouseenter", event => {
      ismouseover = true;
      timerID && clearTimeout(timerID) && (timerID = 0);
      show();
    });

    document.addEventListener("mouseleave", event => {
      timerID = setTimeout(hide, 200);
      ismouseover = false;
    });
    let ev = document.createEvent("HTMLEvents");
    ev.initEvent("mouseleave", false, true);
    document.dispatchEvent(ev);

    this.$refs.logo.addEventListener("mousedown", function(e) {
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

    this.$refs.logo.addEventListener("mouseup", function() {
      biasX = 0;
      biasY = 0;
      document.removeEventListener("mousemove", moveEvent);
    });

    function moveEvent(e) {
      win.setPosition(e.screenX - biasX, e.screenY - biasY);
    }
    console.log(this);
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.item {
  line-height: 25px;
  font-size: 12px;
  color: #74a1fa;
}
.up {
  color: red;
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
  width: 40px;
  background: #5b9bfe url("../../assets/img/logo@2x.png") no-repeat 2px 3px;
  background-size: 80%;
  cursor: move;
}

.content_body {
  background-color: #eef4fe;
  width: 100%;
}

#suspension {
  -webkit-user-select: none;
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
  overflow: auto;
  top: 0;
  bottom: 0;
  right: 0;
}

#suspension {
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
  position: absolute;
  right: 5px;
  cursor: pointer;
}
#rt {
  top: 10px;
}
#rd {
  bottom: 14px;
  position: fixed;
}
#suspension .shrink {
  background: green;
}
</style>

<template>
  <div id="suspension" :class="{new:hasNew}">
    <div class="logo" ref="logo"></div>
    <span id="rt" class="shrink2" @click="toggleAutoShow" :class="{shrink:autoShow}"></span>
    <div class="content_body">
      <div class="item" v-for="msg in messages" :key="msg.id">
        <div>
          <span>{{msg.time}}</span>
          <span class="name" :title="msg.item.name" @click="openItem(msg.item)">{{msg.item.name}}</span>
          <span
            class="content"
            :class="upDown(msg.item.change)"
          >{{msg.item.now|fmtValue}}({{msg.item.change|fmtValue}}){{msg.item.changeP}}</span>
        </div>
        <div class="content">{{msg.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/localdata";
import { loadScripts, parse, toFixed, toPercent, openWin } from "@/utils";

export default {
  name: "notify",
  data() {
    return {
      messages: [],
      autoShow: false,
      hasNew:false
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
    toggleAutoShow() {
      this.autoShow = !this.autoShow;
    },
    openItem(item) {
      openWin(this, item);
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
    const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高

    let hide = () => {
      let winSize = win.getSize();
      win.setPosition(size.width - 6, win.getPosition()[1]);
    };
    let show = () => {
      let winSize = win.getSize();
      win.setPosition(size.width - winSize[0], win.getPosition()[1]);
      console.log(size.width - winSize[0]);
      this.hasNew = false;
    };
    this.$electron.ipcRenderer.on("ALT+E", () => {
      if (win.getPosition()[0] > size.width - 10) show();
      else hide();
    });
    this.$electron.ipcRenderer.on("message", (event, message) => {
      this.hasNew = true;
      this.messages.unshift(message);
      this.messages.splice(50, this.messages.length - 50);
      console.log(message);
      win.setAlwaysOnTop(true, "floating", 1);
      //this.$el.scrollTop = this.$el.scrollHeight;
      if (!ismouseover) {
        window.scrollTo(0, 0);
        timerID && clearTimeout(timerID) && (timerID = 0);
        if (this.autoShow) show();
        timerID = setTimeout(hide, 5000);
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

    window.addEventListener("mousedown", function(e) {
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

    window.addEventListener("mouseup", function() {
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
  width: 3px;
  background: #5b9bfe;
  background-size: 80%;
  cursor: move;
}

.new .logo{
  background-color: green;
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
  border-radius: 5px;
  background: white;
  position: fixed;
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

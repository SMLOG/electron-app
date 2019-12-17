
<template>
  <super>hello</super>
</template>
<script>
import store from "@/localdata";
import jquery from "jquery";
import {
  loadScripts,
  parse,
  toFixed,
  toPercent,
  time,
  ObjectType
} from "@/lib/utils";

import commonMixin from "@/lib/commonMixin";
import { setTimeout } from "timers";

export default {
  name: "tody",
  mixins: [commonMixin],
  data() {
    return {
      time: "--",
      items: [{ code: "" }],
      loadMDate: false,
      altKey: false,
      progressBarWidth: 0,
      indexPercent: 0,
      selectIndex: 0,
      isCollapseH: false,
      width: 0,
      height: 0
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

    notify(item, message) {
      this.$electron.remote.app.notifywin.webContents.send("message", {
        id: +new Date(),
        time: item.time,
        item: item,
        content: message
      });
    },

    upDown(val) {
      if (val > 0) return "up";
      else if (val < 0) return "down";
      else return "";
    }
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

#tody {
  -webkit-user-select: none;
  position: relative;
  overflow: hidden;
}

#tody {
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
#tody .shrink {
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
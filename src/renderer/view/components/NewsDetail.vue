<template>
  <div>
    <div class="content_body" v-html="content"></div>
  </div>
</template>
<script>
import store from "@/localdata";
import { mouseDragMenu } from "@/lib/WinUtils";

import { loadScripts, parse, toFixed, toPercent, fmtdig } from "@/lib/utils";
import $ from "jquery";
window.$ = $;
export default {
  name: "NewsDetail",
  data() {
    return {
      content: ""
    };
  },

  methods: {},

  mounted() {
    let item = JSON.parse(decodeURIComponent(this.$route.query.item));
    this.item = item;
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
      }, 10);
    };
    fetch(item.href)
      .then(res => res.text())
      .then(res => {
        let c = $(res).find("#ContentBody");
        if (c.length > 0) {
          c.find(".AboutCtrl,.reading,.abstract,.b-review").remove();
          let title = $(res)
            .find(".newsContent h1")
            .prop("outerHTML");
          let info = $(res)
            .find(".newsContent .Info")
            .prop("outerHTML");
          this.content = title + info + c.html();
        } else {
          let title = $(res)
            .find("h1")
            .prop("outerHTML");
          let c = $(res)
            .find(".article-body")
            .prop("outerHTML");
          this.content = title + c;
        }
        setTimeout(() => resizeWin(), 100);
      });

    document.addEventListener("dblclick", () => {
      resizeWin();
    });

    let electron = this.$electron;
    let timerID;

    window.addEventListener("blur", event => {
      this.timerID = setTimeout(() => {
        let wsize = win.getSize();

        timerID = setInterval(() => {
          let mousePos = electron.screen.getCursorScreenPoint();
          let wPos = win.getPosition();

          if (
            mousePos.x < wPos[0] ||
            mousePos.x > wPos[0] + wsize[0] ||
            mousePos.y < wPos[1] ||
            mousePos.y > wPos[1] + wsize[1]
          ) {
            window.close();
            if (timerID) clearTimeout(timerID);
          }
          //alert(mousePos.x)
        }, 500);
        //console.log(event);
      }, 200);
    });
    document.addEventListener("mouseenter", event => {
      if (timerID) clearTimeout(timerID);
      if (this.timerID) clearTimeout(this.timerID);
      //console.log(event);
    });

    mouseDragMenu(this.$electron, true);
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
  margin: 5px;
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
<style>
h1 {
  border-bottom: 1px dashed #ccc;
}
p {
  margin: 10px 10px;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  color: #474747;
}
.Info {
  font-family: "宋体";
  font-size: 12px;
  height: 24px;
  line-height: 14px;
  text-align: left;
  margin-bottom: 10px;
  clear: both;
}
.Info .time-source {
  float: left;
  height: 24px;
  line-height: 24px;
  margin-left: 10px;
}
.Info .time-source .time {
  float: left;
}
.Info .time-source .author {
  float: left;
  margin-left: 10px;
}
.Info .time-source .source {
  float: left;
  margin: 0 10px;
}
h1 {
  font-family: "SimHei";
  letter-spacing: -1px;
  font-weight: bold !important;
  color: #3f3f3f;
  text-align: left;
  font-size: 28px;
  line-height: 40px;
  overflow: hidden;
  padding-top: 15px;
  margin-bottom: 15px;
  padding-left: 10px;
  *padding-left: 5px;
}
img {
  max-width: 95% !important;
}
</style>

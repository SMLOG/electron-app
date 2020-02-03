<template>
  <Dock @onCollapseH="onCollapseH" ref="dock">
    <div class="wrap">
      <div id="suspension">
        <div class="content_body">
          <div
            class="item etmf-void"
            v-for="item in filteredItems"
            :key="item.code"
          >
            <div class="flex">
              <span
                class="name"
                :style="{
                  textDecoration: item.nameColor == 'red' && 'underline'
                }"
                :title="title(item)"
                @click="openItem(item, $event)"
                >{{ item.name }}</span
              >
              <span
                style="flex-grow:1;text-align:left;"
                :class="{ blink: item._Deth }"
                class="content"
              >
                <i :class="upDown(item.now - item.preClose)">{{ item.now }}</i>
                <i
                  style="width:5px;display:inline-block;"
                  :class="upDown(item.now - item.pre)"
                  >{{ item | nowPre }}</i
                >
                <i :class="upDown(item.now - item.preClose)"
                  >({{ item.change }}){{ item.changeP }}
                </i>
                <i>{{ item.turnover }}</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul>
          <li v-for="post in self_posts" :key="post.post_id">
            {{ post.post_content }}
          </li>
        </ul>
      </div>
      <div id="news"></div>
      <div id="status">最后更新 {{ fetchTimeStr }}</div>
    </div>
  </Dock>
</template>
<script>
import Vue from "vue";
import fetchJsonp from "fetch-jsonp";

import store from "@/localdata";
import $ from "jquery";
window.$ = $;
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
  ObjectType,
  timeout
} from "@/lib/utils";
import Dock from "@/view/components/Dock";

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
      isCollapseH: false,
      news_html: "",
      fetchTimeStr: "",
      self_posts: []
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
  watch: {
    news_html() {
      let el = $("<div/>").append(this.news_html);
      let showDetail = this.showDetail;

      el.find("a").each(function() {
        $(this).attr("v-on:click", `click("${$(this).attr("href")}")`);
        //$(this).removeAttr("href");
        $(this).attr("onclick", "return false;");
      });
      var NewsCom = Vue.extend({
        template: "<ul>" + el.html() + "</ul>",
        methods: {
          click(href) {
            console.log(href);
            showDetail(href);
          }
        }
      });
      let component = new NewsCom().$mount();
      let news = document.getElementById("news");
      if (news.childNodes.length > 0) {
        news.replaceChild(component.$el, news.childNodes[0]);
      } else news.appendChild(component.$el);
    }
  },
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
    showDetail(href) {
      this.timerID = setTimeout(() => {
        let url = `${
          window.location.href.split("#")[0]
        }#/newsDetail?item=${encodeURIComponent(
          JSON.stringify({ href: href })
        )}&style=`;

        let win = this.$electron.remote.getCurrentWindow();
        let winPos = win.getPosition();
        let width = 600;
        let height = 400;
        if (this.detailWin && !this.detailWin.closed) {
          this.detailWin.location = url;
        } else {
          this.detailWin = window.open(
            url,
            "item",
            `left=${winPos[0] - width - 3}px,top=${
              winPos[1]
            }px,width=${width}px,height=${height}px`
          );
        }
      }, 300);
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
    const scSize = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
    setTimeout(() => {
      win.setPosition(scSize.width - win.getSize()[0], 0);
      win.setSize(win.getSize()[0], scSize.height);
      win.show();
    }, 20);

    let getNews = async () => {
      for (;;) {
        await fetch("http://finance.eastmoney.com/")
          .then(res => res.text())
          .then(res => {
            //console.log(res);

            this.news_html =
              $(res)
                .find(".yaowen .content ul")
                .html() +
              $(res)
                .find(".daodu .list_side")
                .html();
          });
        this.fetchTimeStr = (d => {
          return d.getHours() + ":" + d.getMinutes();
        })(new Date());

        /* let jurl = `https://wap.eastmoney.com/info/guba/GetApiResultNewCore?url=webarticlelist%2Fapi%2FArticle%2FArticleListForMobile&query=${encodeURIComponent(
          "code=sh600332&sorttype=0&ps=20&p=1"
        )}&type=POST&cb=gubadata&callback=jsonp10`;

        let result = await fetchJsonp(jurl, {
          jsonpCallbackFunction: "gubadata"
        })
          .then(res => res.json())
          .then(data => JSON.parse(data.Result));
        console.log(result);
        this.self_posts = result.re;*/

        await timeout(1 * 60 * 1000);
      }
    };

    getNews();

    this.$electron.ipcRenderer.on("refresh", (event, datas) => {
      if (datas.length != this.items.length) {
        window.requestAnimationFrame(() => {
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

<style>
.item {
  height: 2em;
  line-height: 2em;
  font-size: 12px;
  text-align: center;
  color: #666;
  display: inline-block;
  margin-left: 5px;
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
  position: sticky;
  background-color: #eef4fe;
  top: 0;
  border-bottom: 1px dashed #ccc;
  background-color: rgba(255, 255, 255, 0.9);
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
li {
  font-size: 15px;
  height: 28px;
  line-height: 28px;
  *zoom: 1;
}
.left,
a,
h3 {
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
ul {
  list-style: none;
  margin: 0;
  padding: 5px;
}
#status {
  position: fixed;
  bottom: 0;
  right: 15px;
  background: white;
  font-size: 80%;
  color: #ccc;
}
</style>
<style>
.right {
  float: right;
}
.left,
li {
  word-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
ul h3 {
  padding: 0;
  margin: 0;
}
a {
  cursor: pointer;
  color: #003598;
}
a:visited,
a:active,
a:hover {
  text-decoration: underline;
}
a:link {
  text-decoration: none;
}
</style>

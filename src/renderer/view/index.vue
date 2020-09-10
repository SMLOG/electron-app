<template>
  <div>
    <div class="fixed">
      <Setting />
      <search-panel @select="addItem"></search-panel>
      <Right :item="rightItem" />
    </div>
    <div id="menuWrap">
      <ul id="top">
        <li
          :class="{selected:curSrc==name}"
          v-for="(cat, name) in cats"
          :key="name"
          @click="selectSrc(name)"
        >
          <a>{{ name }}({{ cat.items.length }})</a>
        </li>
      </ul>
      <FilterCtrl2 :src="curSrc" />
    </div>
    <div style="clear:both;" id="tbl">
      <table>
        <thead>
          <tr>
            <th class="firstCol">
              <div>
                <span>#</span>
                <span>x</span>
                <span>a</span>
                <span>Name</span>
              </div>
            </th>

            <th
              v-for="col in headers"
              :key="col.prop"
              :class="{
                ascending: sortby === col.prop && !descending,
                descending: sortby === col.prop && descending,
              }"
            >
              <span @click="sort(col.prop)">{{ col.label }}</span>
            </th>
          </tr>
        </thead>
        <draggable v-model="cats[curSrc].items" @update="dragEnd" tag="tbody">
          <tr
            :id="'r' + item.code"
            class="item"
            v-for="(item, index) in filteredItems"
            :key="item.code"
          >
            <td class="firstCol">
              <div class="first">
                <span>
                  <a class="post_bt" :name="item.code">{{ index + 1 }}</a>
                </span>
                <span>
                  <a class="action" @click="removeItem(item)">x</a>
                </span>
                <span>
                  <input type="checkbox" v-model="item.isFocus" />
                </span>
                <div
                  :title="item.code"
                  style="display:inline-block;"
                  :class="{
                      link: true,
                      blink: item._S,
                    }"
                >
                  <span :class="{ sz: item.mk == 'sz' }" @click="openlink(item, $event)">
                    <a :id="item.code">
                      {{ item.name }}
                      <b :class="{ up: item.lb > 1, down: item.lb < 1 }">
                        {{
                        item.lb
                        }}
                      </b>
                    </a>
                  </span>
                </div>
              </div>
            </td>

            <td
              v-for="(col, ci) in headers"
              :key="col.prop"
              :class="getclass(col, item)"
              :title="col.title && col.title(item)"
              @click="col.click && col.click(item, $event, openlink)"
              @mouseover="cellOver($event, item, ci)"
              @mouseout="cellOut($event, item, ci)"
            >{{ col.fmt ? col.fmt(item[col.prop], item) : item[col.prop] }}</td>
          </tr>
        </draggable>
      </table>
    </div>

    <div id="webviewWrap" ref="webviewWrap" class="webview" :class="{ fullFigure: fullFigure }">
      <div id="dragBar" ref="dragBar" v-drag draggable="false">
        <i
          @click="closeview()"
          style="position: relative;top: -10px;cursor: pointer;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;border-left: none;border-right: none;height: 1px;width: 30px;display: inline-block;font-size: 1px;"
        ></i>
        <i v-if="false" class="arrow down" style="position:relative;top:-10px;cursor:pointer;"></i>
      </div>
      <WinView :item="item" :link="link" @dBclick="fullFigure = !fullFigure"></WinView>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import SearchPanel from "@/view/components/search-panel";
import Setting from "@/view/components/setting";
import { getCheckFields } from "./headers";
import { batchUpdateHQ } from "@/lib/getTable";
import FilterCtrl2 from "@/view/components/FilterCtrl2";
import draggable from "vuedraggable";
import WinView from "@/view/components/WinView";
import Right from "@/view/components/Right";

import { setCookie, getCookie } from "@/lib/utils";

import $ from "jquery";
window.$ = $;
export default {
  name: "index",
  data: function () {
    return {
      cats: {
        海选: {
          is_search: true,

          items: [],
        },
        自选: {
          items: [],
        },
      },
      curSrc: "自选",
      techMaplist: [],
      headers: getCheckFields(),
      descending: true,
      sortby: "",
      fullFigure: false,
      link: "about:blank",
      item: {},
      rightItem: false,
    };
  },
  mounted() {},
  directives: {
    drag(el) {
      let oDiv = $(el).parent()[0];
      let self = this;
      document.onselectstart = function () {
        return false;
      };
      el.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        let winH = $(window).outerHeight();
        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          // target.style.left = l + "px";
          if (t <= 0) t = 0;
          else if (t >= winH) t = winH - 8;
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
          $("#top").css("margin-bottom", $(oDiv).outerHeight());
          setCookie(
            "charTop",
            ($(window).outerHeight() - $(oDiv).outerHeight()) /
              $(window).outerHeight()
          );
        };
        //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    },
  },
  components: {
    SearchPanel,
    Setting,
    FilterCtrl2,
    draggable,
    WinView,
    Right,
  },
  filters: {},
  sockets: {
    connect(data) {
      console.log("ws connect");
    },
    disconnect() {
      console.log("ws disconnect");
      this.$socket.emit("connect", 1);
    },
    addItem(data) {
      this.cats["自选"].items.push(data);
    },
    removeItem(item) {
      let items = this.cats["自选"].items;
      items.splice(
        items.findIndex((i) => (i.code = item.code)),
        1
      );
    },

    reconnect(data) {},
    indMap(data) {
      window.indMap = data;
    },
    techMaplist(data) {
      this.techMaplist = data;
    },
    mylist(data) {
      this.cats["自选"].items = data;
    },
    sealist(data) {
      this.cats["海选"].items = data;
    },
    hx(data) {
      //console.log(data);
      // this.$socket.emit("echo", data);
      batchUpdateHQ(this.curItems, data);
    },
  },

  watch: {},
  computed: {
    filteredItems: function () {
      return this.getfilterItems();
    },
    ...mapGetters("ws", ["fields", "curFilterIds"]),

    curItems() {
      return this.cats[this.curSrc].items;
    },
  },
  methods: {
    addItem(item) {
      this.$socket.emit("addItem", item);
    },
    removeItem(item) {
      console.log("remove", item.code);
      this.$socket.emit("removeItem", item);
    },
    dragEnd(e) {
      e.preventDefault();
    },
    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
      this.openCode = null;
    },
    openlink(item, event, link) {
      link || (link = "/static/tech.html?{{code}}&kd");
      let webview = $(document.querySelectorAll("#webview"));
      let webviewWrap = $(this.$refs.webviewWrap);
      this.item = item;
      let url = link.replace("{{code}}", item.code);

      if (webview[0].src.indexOf(url) > -1 && webviewWrap.is(":visible")) {
        this.closeview();
      } else {
        if (!webviewWrap.is(":visible")) {
          let chartop =
            Math.min(getCookie("charTop", 0.6), 0.9) * $(window).height();

          webviewWrap.css("top", chartop + "px");
          setTimeout(() => {
            webviewWrap.css("top", chartop - 1 + "px");
          }, 10);
        }

        webviewWrap.show();
        webview[0].style.height = "100%";
        this.openCode = item.code;
      }
      let timer;
      timer = setInterval(() => {
        if ($(this.$refs.webviewWrap).is(":visible")) {
          clearInterval(timer);
          this.link = url;
        }
      }, 50);
    },
    getclass(col, item) {
      let cls = {};
      col.class && (cls = col.class(item));
      if (col.click) {
        if (!cls) cls = {};
        cls["link"] = true;
      }
      return cls;
    },
    cellOver(event, item, i) {
      if (i == 0) {
        this.rightItem = item;
      }
    },
    cellOut(event, item, i) {
      if (i == 0) this.rightItem = false;
    },
    getfilterItems: function () {
      let items = this.curItems;

      if (!this.curFilterIds) return items;
      let filters = this.curFilterIds.split("+");
      let ret = [];
      for (let f of filters) {
        for (let item of items) {
          if (item["_" + f]) ret.push(item);
        }
      }

      return ret;
    },
    selectSrc(catname) {
      this.curSrc = catname;
    },
    sort(prop) {
      let items = this.curItems;

      items.sort(function (a, b) {
        if (typeof a[prop] === "number") {
          return a[prop] - b[prop];
        }
        if (a[prop] && b[prop]) {
          a = a[prop].toLowerCase();
          b = b[prop].toLowerCase();
          return a < b ? -1 : a > b ? 1 : 0;
        }
        return 0;
      });
      this.descending = this.sortby === prop ? !this.descending : false;
      if (this.descending) items.reverse();
      this.sortby = prop;
    },
  },
};
</script>
<style scoped>
* {
  font-size: 12px;
}
#top {
  float: left;
  margin: 0;
  padding: 0;
}
#top li {
  float: left;
  list-style: none;
  margin: 3px;
  border: 1px solid #dadce0;
  padding: 3px;
  border-radius: 8px;
}
.selected {
  background: black;
  color: white;
}
</style>
<style scoped src="./home.css" />


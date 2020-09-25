<template>
  <div>
    <div class="fixed">
      <Setting />
      <search-panel @select="addItem"></search-panel>
      <Right :item="rightItem" />
      <Posts :item="showMsgItem" />
      <HQ
        :item="item"
        v-show="showType == 'hq'"
        style="
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 4;
          width: 1000px;
          position: fixed;
          overflow: scroll;
          border: 1px solid #95bad0;
          background: white;
        "
      />
      <FinAnalyst2
        style="
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 4;
          position: fixed;
          overflow: scroll;
          border: 1px solid #95bad0;
          background: white;
        "
        :item="item"
        v-if="showType == 'fin'"
        @close="(showType = null), (item = null)"
      />
    </div>
    <div id="menuWrap">
      <ul id="top">
        <li
          :class="{ selected: curSrc == name }"
          v-for="(cat, name) in cats"
          :key="name"
          @click="selectSrc(name)"
        >
          <a>{{ name }}({{ cat.items.length }})</a>
        </li>
      </ul>
      <FilterCtrl2 :src="curSrc" />
      <MyIndex :openlink="openlink" />
    </div>
    <div style="clear: both" id="tbl">
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
        <draggable
          v-model="cats[curSrc].items"
          handle=".firstCol"
          @update="dragEnd"
          tag="tbody"
        >
          <tr
            :id="'r' + item.code"
            class="item"
            v-for="(item, index) in filteredItems"
            :key="item.code"
            :class="{ openlink: openCode === item.code }"
          >
            <td class="firstCol">
              <div class="first">
                <span>
                  <a
                    class="post_bt"
                    :name="item.code"
                    @click="showComments(item)"
                    >{{ index + 1 }}</a
                  >
                </span>
                <span>
                  <a class="action" @click="removeItem(item)">x</a>
                </span>
                <span>
                  <input
                    type="checkbox"
                    v-model="item.isFocus"
                    @change="saveItem(item)"
                  />
                </span>
                <div
                  :title="item.code"
                  style="display: inline-block"
                  :class="{
                    link: true,
                    blink: item._S,
                  }"
                >
                  <span :class="{ sz: item.mk == 'sz' }">
                    <a @click="openlink(item, $event)" :id="item.code">{{
                      item.name
                    }}</a>
                    <b
                      :class="{ up: item.lb > 1, down: item.lb < 1 }"
                      @click="selectItem(item)"
                    >
                      {{ item.lb }}
                    </b>
                  </span>
                </div>
              </div>
            </td>

            <td
              v-for="(col, ci) in headers"
              :key="col.prop"
              :class="getclass(col, item)"
              :title="col.title && col.title(item)"
              @click="col.click && col.click(item, $event, openlink, getThis)"
              @mouseover="cellOver($event, item, ci)"
              @mouseout="cellOut($event, item, ci)"
            >
              {{ col.fmt ? col.fmt(item[col.prop], item) : item[col.prop] }}
            </td>
          </tr>
        </draggable>
      </table>
    </div>
    <WinView
      ref="webviewWrap"
      v-show="showType == 'link' && item"
      :item="item"
      :link="link"
    ></WinView>
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
import FinAnalyst2 from "@/view/components/FinAnalyst/FinAnalyst2";
import Right from "@/view/components/Right";
import Posts from "@/view/components/Posts";
import MyIndex from "@/view/components/MyIndex";
import HQ from "@/view/components/hq/HQ";

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
      showFin: false,
      curSrc: "自选",
      techMaplist: [],
      headers: getCheckFields(),
      descending: true,
      sortby: "",
      link: "about:blank",
      item: null,
      rightItem: false,
      showMsgItem: false,
      openCode: null,
      showType: null,
    };
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27) {
        this.showType = null;
      }
    });
  },

  components: {
    SearchPanel,
    Setting,
    FilterCtrl2,
    draggable,
    WinView,
    Right,
    Posts,
    MyIndex,
    FinAnalyst2,
    HQ,
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
    getThis(cb) {
      if (cb) {
        cb(this);
      }
    },
    selectItem(item) {
      if (item == this.item) this.item = null;
      else this.item = item;
    },
    showComments(item) {
      if (item == this.showMsgItem) this.showMsgItem = null;
      else this.showMsgItem = item;
    },
    addItem(item) {
      this.$socket.emit("addItem", item);
      this.openCode = item.code;
    },
    removeItem(item) {
      console.log("remove", item.code);
      this.$socket.emit("removeItem", item);
    },
    saveItem(item) {
      if (item.isFocus) this.addItem(item);
    },
    dragEnd(e) {
      e.preventDefault();
      this.$socket.emit("updateItems", this.cats["自选"].items);
    },

    openlink(item, event, link) {
      if (item == this.item && link == this.link) {
        this.item = null;
      } else {
        this.item = item;
        this.link = link;
        this.showType = "link";
      }
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


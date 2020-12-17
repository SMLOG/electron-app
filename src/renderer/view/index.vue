<template>
  <div>
    <div class="fixed">
      <context-menu
        class="right-menu"
        :target="'.item'"
        :show="contextMenuVisible"
        @update:show="(show) => (contextMenuVisible = show)"
      >
        <a href="javascript:;" @click.stop="toTop()">置顶</a>
      </context-menu>

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
      <MyIndex />
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
          <template v-for="(item, index) in filteredItems">
            <tr
              :id="'r' + item.code"
              class="item"
              :key="item.code"
              :class="{ openlink: openCode === item.code }"
              @contextmenu="contentMenuTargetItem = item"
            >
              <td class="firstCol">
                <div class="first" V-tooltip="item.code">
                  <span>
                    <a
                      class="post_bt"
                      :name="item.code"
                      @click="$showComments(item)"
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
                    v-tooltip="item.code"
                    style="display: inline-block"
                    :class="{
                      link: true,
                      blink: item._S,
                    }"
                  >
                    <span :class="{ sz: item.mk == 'sz' }">
                      <a
                        @click="
                          $openlink(
                            item,
                            $event,
                            `/static/tech.html?{{code}}&kd`
                          )
                        "
                        :id="item.code"
                        >{{ item.name }}</a
                      >
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
                :class="getclass(col, item, item[col.prop])"
                :title="col.title && col.title(item)"
                @click="col.click && col.click(item, $event)"
                @mouseover="cellOver($event, item, ci)"
                @mouseout="cellOut($event, item, ci)"
              >
                {{ col.fmt ? col.fmt(item[col.prop], item) : item[col.prop] }}
              </td>
            </tr>
            <tr
              v-for="item2 in yjitems[item.code] || []"
              :id="'r' + item2.yj_id"
              class="item"
              :key="item.code + item2.yj_id"
              v-if="item.REPORTDATE != item2.REPORTDATE"
            >
              <td class="firstCol"></td>

              <td
                v-for="col in headers"
                :key="col.prop"
                :class="getclass(col, item2, item2[col.prop])"
                :title="col.title && col.title(item2)"
                @click="col.click && col.click(item2, $event, $openlink)"
              >
                {{
                  col.fmt ? col.fmt(item2[col.prop], item2) : item2[col.prop]
                }}
              </td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getCheckFields } from "./headers";
import { batchUpdateHQ } from "@/lib/getTable";
import FilterCtrl2 from "@/view/components/FilterCtrl2";
import draggable from "vuedraggable";
import WinView from "@/view/components/WinView";
import WinWrap from "@/view/components/WinWrap";
import FinAnalyst2 from "@/view/components/FinAnalyst/FinAnalyst2";
import Chart from "@/view/components/h5/Chart";

import Right from "@/view/components/Right";
import MyIndex from "@/view/components/MyIndex";
import HQ from "@/view/components/hq/HQ";
import Title from "@/view/components/title/Title";
import ContextMenu from "@/view/components/ContextMenu";

import axios from "axios";
import $ from "jquery";
window.$ = $;
let unTitlteTimer = 0;
export default {
  data: function () {
    return {
      contextMenuTarget: document.body,
      contentMenuTargetItem: null,
      contextMenuVisible: false,
      yjitems: {},
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
      item: null,
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
    FilterCtrl2,
    draggable,
    MyIndex,
    HQ,
    Title,
    ContextMenu,
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

  watch: {
    fields: {
      deep: true,
      handler(newValue, oldValue) {
        this.headers = getCheckFields();
      },
    },
  },
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
    toTop() {
      if (this.contentMenuTargetItem) {
        let items = this.cats["自选"].items;
        let index = items.indexOf(this.contentMenuTargetItem);
        items.splice(index, 1);
        items.unshift(this.contentMenuTargetItem);
        this.$socket.emit("updateItems", this.cats["自选"].items);
      }
      this.contextMenuVisible = false;
    },

    selectItem(item) {
      if (item == this.item) this.item = null;
      else this.item = item;
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

    getclass(col, item, value) {
      let cls = {};
      col.class && (cls = col.class(item, value));
      if (col.click) {
        if (!cls) cls = {};
        cls["link"] = true;
      }
      return cls;
    },
    cellOver(event, item, i) {
      if (i == 0) {
        this.$rightItem(item);
      }
    },
    cellOut(event, item, i) {
      if (i == 0) this.$rightItem(false);
    },
    getfilterItems: function () {
      let items = this.curItems;

      if (!this.curFilterIds) return items;
      let filters = this.curFilterIds.split("+");
      let ret = [];

      for (let item of items) {
        let y = true;
        for (let f of filters) {
          if (!item["_" + f]) {
            y = false;
            break;
          }
        }
        y && ret.push(item);
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

<style scoped>
body {
  font-family: sans-serif;
  margin: 42px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  position: fixed;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>

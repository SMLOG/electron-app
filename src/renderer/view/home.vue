<template>
  <div>
    <div
      style="position: fixed;
    color: black;
    right: 40px;
    top: 5px;
    z-index: 1000000;"
      @click="fullScreen()"
    >
      全屏
    </div>
    <Setting />
    <Right :item="rightItem" />
    <div
      id="bg"
      style="position:fixed;top:0;left:0;width:118px;bottom:0;background:#222;z-index:-1; "
    ></div>

    <search-panel @select="addItem"></search-panel>
    <div>
      <div id="menuWrap">
        <ul class="filters" id="menus">
          <Sea
            v-for="(fitem, fname) in afilters"
            :key="fname"
            :selected="selectSrc == fitem"
            @click.native="clickType(fname, fitem)"
            :is_search="fitem.is_search"
          >
            <a>{{ fname }}({{ fitem.items.length }})</a>
          </Sea>
        </ul>
        <FilterCtrl :filtersCount="filtersCount" :src="selectFilter" />
        <div style="float:left">
          <span
            v-for="zi in zsItems"
            :key="zi.code"
            @click="openIndex(zi, $event)"
          >
            {{ zi.name }}
            <em :class="{ up: zi.change > 0, down: zi.change < 0 }"
              >{{ zi.close }}({{ zi.changeP }})</em
            >
          </span>
        </div>
      </div>
    </div>
    <div id="tbl">
      <div ref="listtbl">
        <table>
          <thead>
            <tr>
              <th class="firstCol">
                <div class="first">
                  <span>#</span>
                  <span>x</span>
                  <span>a</span>
                  <span>Name</span>
                </div>
              </th>

              <th
                v-for="col in head"
                :key="col.prop"
                :class="{
                  ascending: sortby === col.prop && !descending,
                  descending: sortby === col.prop && descending,
                }"
              >
                <span @click="sort(col.prop)">{{ col.label }}</span>
                <span v-if="col.filterable" ref="filter_prop_ref">
                  <span @click="showFilterable(col.prop)">#</span>
                  <div
                    v-if="col.filterable && filterables && show_filter_prop"
                    style="position: fixed;color: blue;margin: 5px;padding: 5px;background: white;"
                  >
                    <ul class="filterp">
                      <li
                        v-for="f in filterables"
                        :key="f.value"
                        @click="f.select = !f.select"
                        :class="{
                          up: indMap[f.value] > 0,
                          down: indMap[f.value] < 0,
                        }"
                      >
                        <input type="checkbox" v-model="f.select" />
                        {{ f.value }}({{ indMap[f.value] }}%)
                      </li>
                    </ul>
                  </div>
                </span>
              </th>
            </tr>
            <tr
              v-if="
                selectItem && selectItem.tables && selectItem.tables.length > 0
              "
            >
              <th :colspan="head.length + 4">
                <div id="detail" ref="detail">
                  <span
                    v-if="selectItem.tables && selectItem.tables.length > 0"
                  >
                    <div v-for="t in selectItem.tables" :key="t.str">
                      {{ selectItem.name }}
                      <span v-html="t.str"></span>
                    </div>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <draggable v-model="items" @update="dragEnd" tag="tbody">
            <tr
              :id="'r' + item.code"
              class="item"
              v-for="(item, index) in filteredItems"
              :key="item.code"
              :class="{ openlink: index === focus || openCode === item.code }"
            >
              <td class="firstCol">
                <div class="first">
                  <span>
                    <a
                      class="post_bt"
                      :name="item.code"
                      @dblclick="dblclickn($event, item)"
                      @click="viewItemMsgs(item)"
                      >{{ index + 1 }}</a
                    >
                  </span>
                  <span>
                    <a class="action" @click="delItem(item)">x</a>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      v-model="item.isFocus"
                      @change="saveDatas(item)"
                    />
                  </span>
                  <div
                    :title="item.code"
                    :class="{
                      lk: item.tables && item.tables.length > 0,
                      link: true,
                      blink: item._S,
                    }"
                  >
                    <span
                      :class="{ sz: item.mk == 'sz' }"
                      @click="openlink(item, $event)"
                      draggable="true"
                      @dragstart="dragstart($event, item)"
                      @dragend="dragend"
                    >
                      <a :id="item.code">
                        {{ item.name }}
                        <b :class="{ up: item.lb > 1, down: item.lb < 1 }">
                          {{ item.lb }}
                        </b>
                      </a>
                    </span>
                  </div>
                </div>
              </td>

              <td
                v-for="(col, ci) in head"
                :key="col.prop"
                :class="getclass(col, item)"
                :title="col.title && col.title(item)"
                @click="col.click && col.click(item, $event, openlink)"
                @mouseover="cellOver($event, item, ci)"
                @mouseout="cellOut($event, item, ci)"
              >
                {{ col.fmt ? col.fmt(item[col.prop], item) : item[col.prop] }}
              </td>
            </tr>
          </draggable>
        </table>
      </div>
    </div>
    <div
      id="webviewWrap"
      ref="webviewWrap"
      class="webview"
      :class="{ fullscreen: fullscreen }"
    >
      <div id="dragBar" ref="dragBar" v-drag draggable="false">
        <i
          @click="closeview()"
          style="position: relative;top: -10px;cursor: pointer;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;border-left: none;border-right: none;height: 1px;width: 30px;display: inline-block;font-size: 1px;"
        ></i>
        <i
          v-if="false"
          class="arrow down"
          style="position:relative;top:-10px;cursor:pointer;"
        ></i>
      </div>
      <WinView
        :item="item"
        :link="link"
        @dBclick="fullscreen = !fullscreen"
      ></WinView>
    </div>
    <Posts :item="showMsgItem" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { callFun } from "@/lib/tech-manager";
import { tj } from "@/lib/tech-manager";
import axios from "axios";
import SearchPanel from "@/view/components/search-panel";
import Setting from "@/view/components/setting";
import FilterItem from "@/view/components/FilterItem";
import FilterCtrl from "@/view/components/FilterCtrl";
import TopFocus from "@/view/components/TopFocus";
import WinView from "@/view/components/WinView";
import Posts from "@/view/components/Posts";

import Sea from "@/view/components/Sea";
import Right from "@/view/components/Right";

import store from "@/localdata";
import draggable from "vuedraggable";
import { getAllInd } from "@/lib/ind";
import Calendar from "@/view/components/calendar";

import {
  ObjectType,
  parse,
  loadScripts,
  dateFormat,
  timeout,
  openKlineWindow,
  setCookie,
  getCookie,
} from "@/lib/utils";
import { getCheckFields } from "./headers";
import { monitor } from "@/lib/monitor";
import {
  filters,
  afilters,
  toFiltersCount,
  filtersCount,
  getFilterChain,
  updateFiltersCount,
  getOrFiltersItems,
} from "@/lib/filters";
import fetchJsonp from "fetch-jsonp";

import {
  updateItem,
  getMeetList,
  getFilterList,
  batchUpdateHQ,
  isNotTradeTime,
  syncZsItems,
} from "@/lib/getTable";
import $ from "jquery";
window.indMap = {};
window.$ = $;
const SELF = "自选";

function save(items) {
  axios.put("/api/my", items);
}
export default {
  name: "home",
  data: function() {
    return {
      filters: filters,
      afilters: afilters,
      selectFilter: SELF,
      items: [],
      descending: true,
      sortby: "",
      head: getCheckFields(),
      selectItem: null,
      items2: [],
      selectSrc: afilters[SELF],
      openCode: null,
      focus: null,
      openType: null,
      showSetting: false,
      filtersCount: filtersCount,
      link: "about:blank",
      item: {},
      filterables: [],
      filter_prop: "",
      show_filter_prop: false,
      fullscreen: false,
      indMap: window.indMap,
      items3: [],
      zsItems: [{ code: "sh000001" }, { code: "sz399001" }],
      rightItem: false,
      showMsgItem: null,
    };
  },
  directives: {
    drag(el) {
      let oDiv = $(el).parent()[0];
      let self = this;
      document.onselectstart = function() {
        return false;
      };
      el.onmousedown = function(e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        let winH = $(window).outerHeight();
        document.onmousemove = function(e) {
          //通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          // target.style.left = l + "px";
          if (t <= 0) t = 0;
          else if (t >= winH) t = winH - 8;
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function(e) {
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
    draggable,
    Setting,
    FilterItem,
    FilterCtrl,
    Sea,
    Right,
    TopFocus,
    WinView,
    Posts,
  },
  filters: {
    objectType(id) {
      return ObjectType[id];
    },
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 27:
          this.closeview();
          break;
        default:
      }
    });

    window.addEventListener("click", (e) => {
      if (this.$refs.filter_prop_ref) {
        if (this.$refs.filter_prop_ref.some((el) => el.contains(e.target))) {
        } else {
          this.show_filter_prop = false;
        }
      }
    });

    getAllInd(this.indMap);

    this.reloadData();
    this.initTimer();
  },
  watch: {
    focus() {
      let webviewWrap = $(this.$refs.webviewWrap);
      if (!webviewWrap.is(":visible")) return;

      let items = this.getfilterItems();
      this.openlink(items[this.focus], null, this.openType);
    },
    fields: {
      deep: true,
      handler(newValue, oldValue) {
        this.head = getCheckFields();
      },
    },
  },
  computed: {
    getSourceItems2: function() {
      return this[afilters[this.selectFilter].name];
    },
    filteredItems: function() {
      if (
        this.filter_prop &&
        this.filterables &&
        this.filterables.filter((e) => e.select).length
      ) {
        let selectedValues = this.filterables
          .filter((e) => e.select)
          .map((e) => e.value);
        return this.getfilterItems().filter(
          (e) => selectedValues.indexOf(e[this.filter_prop]) > -1
        );
      }

      return this.getfilterItems();
    },
    ...mapGetters(["fields", "curFilterIds"]),
    ...mapGetters({ sfilters: "filters" }),
  },

  methods: {
    fullScreen() {
      /*判断是否全屏*/
      var isFullscreen =
        document.fullScreenElement || //W3C
        document.msFullscreenElement || //IE
        document.mozFullScreenElement || //火狐
        document.webkitFullscreenElement || //谷歌
        false;
      if (!isFullscreen) {
        var el = document.documentElement;
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    dblclickn(event, item) {
      let items = this.getSourceItems();
      let i = items.indexOf(item);

      items.splice(i, 1);
      items.unshift(item);
      save(this.items);
    },
    clickType(fname, fitem) {
      this.selectSrc = fitem;
      this.selectFilter = fname;
    },
    viewItemMsgs(item) {
      if (item == this.showMsgItem) this.showMsgItem = null;
      else this.showMsgItem = item;
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
    drop(event) {
      let item = event.dataTransfer.getData("item");
      console.log(item);
    },
    dragstart(event, item) {
      event.dataTransfer.setData("item", item);
    },
    dragend(event) {
      event.dataTransfer.clearData();
    },

    showFilterable(prop) {
      this.show_filter_prop = !this.show_filter_prop;

      if (this.show_filter_prop) {
        let values = this.getfilterItems().map((item) => item["_" + prop]);
        values = values.filter(function(item, index, arr) {
          return arr.indexOf(item, 0) === index;
        });
        this.filterables = values
          .map((e) => {
            return {
              value: e,
              changeP: this.indMap[e],
              select:
                this.filterables.filter((a) => {
                  return a.value == e && a.select;
                }).length > 0,
            };
          })
          .sort((a, b) =>
            a.changeP < b.changeP ? 1 : a.changeP > b.changeP ? -1 : 0
          );
        console.log(this.show_filter_prop, this.filter_prop, this.filterables);
        this.filter_prop = "_" + prop;
      }
    },
    getSourceItems() {
      return this[this.selectSrc.name];
    },
    getfilterItems() {
      let items = this.getSourceItems2;

      if (!this.curFilterIds) return items;
      let fcs = getFilterChain(this.curFilterIds);
      for (let fc of fcs) {
        items = fc(items);
      }

      return items;
    },
    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
      this.openCode = null;
    },
    openIndex(zitem, event) {
      this.openlink(zitem, event);
    },
    openlink(item, event, link) {
      link || (link = "http://localhost:9080/static/tech.html?{{code}}&kd");
      this.openType = link;
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
      //webview bug:need show up
      let timer;
      timer = setInterval(() => {
        if ($(this.$refs.webviewWrap).is(":visible")) {
          clearInterval(timer);
          this.link = url;
        }
      }, 50);
    },
    toggleDetail(item) {
      if (this.selectItem != item) this.selectItem = item;
      else this.selectItem = null;
    },
    sort(prop) {
      let items = this[this.selectSrc.name];

      items.sort(function(a, b) {
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
    dragEnd(e) {
      e.preventDefault(); //通知 Web 浏览器不要执行与事件关联的默认动作
      save(this.items);
    },
    reloadData() {
      axios.get("/api/my").then((resp) => {
        this.items = resp.data;
        this.items.forEach((e) => toFiltersCount(e, SELF));
      });
    },
    addItem(selectItem) {
      axios.post("/api/my", selectItem);
      if (this.items.filter((it) => it.code == selectItem.code).length == 0) {
        this.items.push(selectItem);
        save(this.items);
        toFiltersCount(selectItem, SELF);
      }
      this.openCode = selectItem.code;
      //this.reloadData();
      monitor(this.items);

      let items = getOrFiltersItems(this.items2);
      console.log("monitor:", items);
      monitor(items);
    },
    initTimer() {
      //定时监控
      /*(async () => {
        for (;;) {
          await timeout(60000);

          if (true) {
            let items = this.items;
            let items2 = this.items2;

            items = items.concat(
              items2.filter((e) => e.lb > 1).filter((v) => !items.includes(v))
            );

            console.log("monitor:", items);
            for (let i = 0; i < items.length; i++) {
              await callFun(items[i]);
            }
            updateFiltersCount();

            this.items3 = items2;
          }
        }
      })();*/
      /*(async () => {
        this.items2.length = 0;
        afilters[SELF].items = this.items;
        afilters["海选"].items = this.items2;
        try {
          let resp = await (await fetch("/api/sea")).json();
          this.items2.splice(0, 0, ...(resp || []));
          console.log(this.item2);
        } catch (err) {
          alert(err);
        }

        let items = getOrFiltersItems(this.items2);
        updateFiltersCount();
        monitor(items);
        this.ready = true;
      })();*/

      (async () => {
        for (;;) {
          await batchUpdateHQ(this.items2.concat(this.items));
          await syncZsItems(this.zsItems);

          await timeout(4000);
        }
      })();
    },

    delItem(item) {
      axios.delete("/api/my", { data: item });
      this.items.splice(this.items.indexOf(item), 1);
      toFiltersCount(item, SELF, "-");
      save(this.items);
    },
    saveDatas(item) {
      if (item.isFocus) this.addItem(item);
      save(this.items);
      updateFiltersCount();
    },
  },
};
</script>
<style scoped src="./home.css" />

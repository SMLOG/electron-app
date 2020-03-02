<template>
  <div>
    <Setting />
    <div
      id="bg"
      style="position:fixed;top:0;left:0;width:118px;bottom:0;background:#222;z-index:-1; "
      @click="closeview"
    ></div>

    <iframe src="static/tech2.html?sh000001" style="width:100%;height:600px;display:none;"></iframe>
    <search-panel @select="addItem"></search-panel>
    <div>
      <div id="menuWrap" style>
        <ul class="filters" id="menus">
          <Sea
            v-for="(k, filter) in afilters"
            :key="filter"
            :selected="selectSrc == k"
            @click.native="
              (selectSrc = k),
                (visibility = null),
                (selectFilter = filter),
                (selectFilter_r = selectFilter_c = -1)
            "
            :is_search="k.is_search"
          >
            <a>{{ filter }}({{ k.items.length }})</a>
          </Sea>
        </ul>
        <FilterCtrl
          :filtersCount="filtersCount"
          :src="selectFilter"
          @filterChainChange="selectFilterChange"
          :r="selectFilter_r"
          :c="selectFilter_c"
        />

        <!-- <TopFocus :items="focusItems" @openlink="openlink" /> -->
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
                  descending: sortby === col.prop && descending
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
                          down: indMap[f.value] < 0
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
                  <span v-if="selectItem.tables && selectItem.tables.length > 0">
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
              class="item"
              v-for="(item, index) in filteredItems"
              :key="item.code"
              :class="{ openlink: index === focus || openCode === item.code }"
            >
              <td class="firstCol">
                <div class="first">
                  <span>
                    <a :name="item.code">{{ index + 1 }}</a>
                  </span>
                  <span>
                    <a class="action" @click="delItem(item)">x</a>
                  </span>
                  <span>
                    <input type="checkbox" v-model="item.isFocus" @change="saveDatas(item)" />
                  </span>
                  <div
                    :title="item.code"
                    :class="{
                      lk: item.tables && item.tables.length > 0,
                      hl: item.hili == 2,
                      link: true
                    }"
                  >
                    <span
                      :class="{ sz: item.mk == 'sz' }"
                      @click="openlink(item, $event)"
                    >{{ item.name }}</span>
                    <div v-if="false">
                      <span
                        title="最后持续平均线分钟(-下+上)"
                        @click="toggleDetail(item)"
                        :class="{
                          avggood: item.avgzs > 45 && item.upArgCount > 120
                        }"
                      >{{ item.avgzs }}</span>
                      <span title="总平均线分钟数">/{{ item.upArgCount }}</span>
                      <span title="连续方向分钟数">/{{ item.contDir }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <td
                v-for="col in head"
                :key="col.prop"
                :class="col.class && col.class(item)"
                :title="col.title && col.title(item)"
                @click="col.click && col.click(item, $event, openlink)"
              >{{ col.fmt ? col.fmt(item[col.prop], item) : item[col.prop] }}</td>
            </tr>
          </draggable>
        </table>
      </div>
    </div>
    <div id="webviewWrap" ref="webviewWrap" class="webview" :class="{ fullscreen: fullscreen }">
      <div id="dragBar" ref="dragBar" v-drag draggable="false">
        <i
          @click="closeview()"
          style="position: relative;top: -10px;cursor: pointer;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;border-left: none;border-right: none;height: 1px;width: 30px;display: inline-block;font-size: 1px;"
        ></i>
        <i v-if="false" class="arrow down" style="position:relative;top:-10px;cursor:pointer;"></i>
      </div>
      <WinView :item="item" :link="link" @dBclick="fullscreen = !fullscreen"></WinView>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { callFun } from "@/lib/tech-manager";

import SearchPanel from "@/view/components/search-panel";
import Setting from "@/view/components/setting";
import FilterItem from "@/view/components/FilterItem";
import FilterCtrl from "@/view/components/FilterCtrl";
import TopFocus from "@/view/components/TopFocus";
import WinView from "@/view/components/WinView";

import Sea from "@/view/components/Sea";
import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";
import { loadHQ } from "@/lib/hq";
import { mouseDragMenu } from "@/lib/WinUtils";
import { getAllInd } from "@/lib/ind";
//import Calendar from "vue-calendar-component";
import Calendar from "@/view/components/calendar";

import {
  ObjectType,
  parse,
  loadScripts,
  fetchEval,
  dateFormat,
  timeout,
  openKlineWindow,
  setCookie,
  getCookie
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
  getOrFiltersItems
} from "@/lib/filters";
import {
  updateItem,
  getMeetList,
  getFilterList,
  batchUpdateHQ,
  isNotTradeTime
} from "@/lib/getTable";
import $ from "jquery";
window.$ = $;
const SELF = "自选";

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
      visibility: "Strong",
      head: getCheckFields(),
      selectItem: null,
      items2: [],
      selectSrc: afilters[SELF],
      openCode: null,
      focus: null,
      openType: null,
      showSetting: false,
      filtersCount: filtersCount,
      selectFilter_r: -1,
      selectFilter_c: -1,
      link: "about:blank",
      item: {},
      filterables: [],
      filter_prop: "",
      show_filter_prop: false,
      fullscreen: false,
      indMap: {}
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
    }
  },
  components: {
    SearchPanel,
    draggable,
    Setting,
    FilterItem,
    FilterCtrl,
    Sea,
    TopFocus,
    WinView
  },
  filters: {
    objectType(id) {
      return ObjectType[id];
    }
  },
  mounted() {
    window.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 27:
          this.closeview();
          break;
        default:
      }
    });

    window.addEventListener("click", e => {
      if (this.$refs.filter_prop_ref) {
        if (this.$refs.filter_prop_ref.some(el => el.contains(e.target))) {
        } else {
          this.show_filter_prop = false;
        }
      }
    });

    getAllInd(this.indMap);

    initwebview(this.closeview.bind(this));
    mouseDragMenu(this.$electron, false);
    document.ondblclick = () => {
      let win = $electron.remote.getCurrentWindow();
      win.setPosition(0, 0);
      window.resizeTo(screen.availWidth, screen.availHeight);
    };
    this.reloadData();
    this.timerFn();

    document.addEventListener("keydown", e => {
      if (e.target && e.target.nodeName == "BODY") {
        let items = this.getfilterItems();

        switch (event.keyCode) {
          //case 37:
          case 38:
            if (this.focus === null) {
              this.focus = 0;
            } else if (this.focus > 0) {
              this.focus--;
            }
            break;

          //case 39:
          case 40:
            if (this.focus === null) {
              this.focus = 0;
            } else if (this.focus < items.length - 1) {
              this.focus++;
            }
            break;
        }

        // this.keyword +=e.key;
      }
    });
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
      }
    }
  },
  computed: {
    filteredItems: function() {
      if (
        this.filter_prop &&
        this.filterables &&
        this.filterables.filter(e => e.select).length
      ) {
        let selectedValues = this.filterables
          .filter(e => e.select)
          .map(e => e.value);
        return this.getfilterItems().filter(
          e => selectedValues.indexOf(e[this.filter_prop]) > -1
        );
      }
      return this.getfilterItems();
    },
    focusItems: function() {
      return this.items.filter(e => e.isFocus);
    },
    ...mapGetters(["fields"]),
    ...mapGetters({ sfilters: "filters" })
  },
  methods: {
    showFilterable(prop) {
      this.show_filter_prop = !this.show_filter_prop;

      if (this.show_filter_prop) {
        let values = this.getfilterItems().map(item => item["_" + prop]);
        values = values.filter(function(item, index, arr) {
          return arr.indexOf(item, 0) === index;
        });
        this.filterables = values
          .map(e => {
            return {
              value: e,
              changeP: this.indMap[e],
              select:
                this.filterables.filter(a => {
                  return a.value == e && a.select;
                }).length > 0
            };
          })
          .sort((a, b) =>
            a.changeP < b.changeP ? 1 : a.changeP > b.changeP ? -1 : 0
          );
        console.log(this.show_filter_prop, this.filter_prop, this.filterables);
        this.filter_prop = "_" + prop;
      }
    },
    selectFilterChange(r, c) {
      this.selectFilter_r = r;
      this.selectFilter_c = c;
    },
    getSelectItems() {
      window.items = this[this.selectSrc.name];
      return this[this.selectSrc.name];
    },
    getfilterItems() {
      let items = this.getSelectItems();
      let fcs = getFilterChain(this.selectFilter_r, this.selectFilter_c);
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
    openlink(item, event, link) {
      link || (link = "http://localhost:9080/static/tech.html?{{code}}&kd");
      this.openType = link;
      let webview = $(document.querySelectorAll("webview"));
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
      setTimeout(() => {
        this.link = url;
      }, 200);

      // webview.attr("src", url);

      console.log(url);
      //openKlineWindow(this, item);
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
      store.save(this.items);
      this.sendRefresh();
    },
    reloadData() {
      this.items = store.fetch().filter(e => e);
      this.items.forEach(e => toFiltersCount(e, SELF));
    },
    addItem(selectItem) {
      if (this.items.filter(it => it.code == selectItem.code).length == 0) {
        this.items.push(selectItem);
        store.save(this.items);
        toFiltersCount(selectItem, SELF);
      }
      this.openCode = selectItem.code;
      //this.reloadData();
      this.sendRefresh();
      monitor(this.items);

      let items = getOrFiltersItems(this.items2);
      console.log("monitor:", items);
      monitor(items);
    },
    timerFn() {
      (async () => {
        for (;;) {
          await this.refresh();
          await timeout(2000);
        }
      })();
      //定时监控
      (async () => {
        for (;;) {
          if (!this.chooseDate) monitor(this.items);
          await timeout(60000);

          if (!isNotTradeTime()) {
            let items = this.items;
            let items2 = getOrFiltersItems(this.items2);

            items = items.concat(
              items2.filter(e => e.turnover > 2).filter(v => !items.includes(v))
            );
            items = items.concat(
              this.items2
                .filter(e => e.turnover > 2)
                .filter(v => !items.includes(v))
            );
            console.log("monitor:", items);

            for (let i = 0; i < items.length; i++) {
              await callFun(items[i]);
            }
            updateFiltersCount();
          }
          // monitor(items);
        }
      })();
      (async () => {
        this.items2.length = 0;
        afilters["海选"].items = this.items2;
        afilters[SELF].items = this.items;

        let items = await getFilterList(e => {
          if (e) {
            this.items2.push(e);
            toFiltersCount(e, "海选");
          } else {
            let items = getOrFiltersItems(this.items2);
            console.log("monitor:", items);
            monitor(items);
          }
        });
        // items.forEach(e => this.items2.push(e));
        //await timeout(60000);
      })();

      (async () => {
        for (;;) {
          await batchUpdateHQ(this.items2);
          await timeout(5000);
        }
      })();
    },
    notify(item, message) {
      this.$electron.remote.app.notifywin.webContents.send("message", {
        id: +new Date(),
        time: item.time,
        item: item,
        content: message
      });
    },
    async refresh() {
      let that = this;
      let needReloadData = false;
      loadHQ(this.items);
      for (let i = 0; i < that.items.length; i++) {
        let item = that.items[i];

        if (
          item.pe_ttm > 0 &&
          ((item.tbzz && item.tbzz > 0 && item.pe_ttm / item.tbzz < 1) ||
            (item.PEG && item.PEG > 0 && item.PEG < 1))
        ) {
          item.candidateType = 1;
        }
        //  that.items.splice(i, 1, item);

        if (item.code == that.indexCode && item.changePV) {
          that.progressBarWidth = Math.abs(item.changePV / 1) * 100;
          that.indexPercent = item.changePV;
        }

        // vm.items.splice(newLength)
      }
      that.sendRefresh();
    },
    sendRefresh() {
      this.$electron.remote.BrowserWindow.getAllWindows().map(win => {
        try {
          win.isVisible() &&
            win.webContents.send(
              "refresh",
              this.items.filter(e => e.isFocus)
            );
        } catch (e) {
          console.log(e);
        }
      });
      //this.$electron.remote.app.minwin.webContents.send("refresh", this.items);
    },
    delItem(item) {
      //if (confirm("are you sure?")) {
      //this.items = this.items.slice(this.items.indexOf(item), 1);
      for (let k in window) {
        if (k.indexOf(item.code) > -1) window[k] = undefined;
      }
      this.items.splice(this.items.indexOf(item), 1);
      toFiltersCount(item, SELF, "-");

      store.save(this.items);
      this.sendRefresh();

      //}
    },
    saveDatas(item) {
      if (item.isFocus) this.addItem(item);
      store.save(this.items);
      updateFiltersCount();
    }
  }
};
</script>
<style scoped src="./home.css" />

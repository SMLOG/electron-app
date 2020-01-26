<template>
  <div>
    <Setting />
    <div
      id="bg"
      style="position:fixed;top:0;left:0;width:180px;bottom:0;background:#222;z-index:-1; "
    ></div>

    <iframe
      src="static/tech2.html?sh000001"
      style="width:100%;height:600px;display:none;"
    ></iframe>
    <search-panel @select="addItem"></search-panel>
    <div>
      <div id="menuWrap">
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
        <TopFocus :items="focusItems" @openlink="openlink" />
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
                @click="sort(col.prop)"
                :key="col.prop"
                :class="{
                  ascending: sortby === col.prop && !descending,
                  descending: sortby === col.prop && descending
                }"
              >
                {{ col.label }}
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
                      hl: item.hili == 2,
                      link: true
                    }"
                  >
                    <span
                      :class="{ sz: item.mk == 'sz' }"
                      @click="openlink(item, $event)"
                      >{{ item.name }}</span
                    >
                    <span
                      title="最后持续平均线分钟(-下+上)"
                      @click="toggleDetail(item)"
                      :class="{
                        avggood: item.avgzs > 45 && item.upArgCount > 120
                      }"
                      >{{ item.avgzs }}</span
                    >
                    <span title="总平均线分钟数">/{{ item.upArgCount }}</span>
                    <span title="连续方向分钟数">/{{ item.contDir }}</span>
                  </div>
                </div>
              </td>

              <td
                v-for="col in head"
                :key="col.prop"
                :class="col.class && col.class(item)"
                :title="col.title && col.title(item)"
                @click="col.click && col.click(item, $event, openlink)"
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
      style="position:fixed;left:180px;right:0;bottom:0;top:60%;display:none;z-index:4"
    >
      <div id="dragBar" ref="dragBar" v-drag draggable="false">
        <i
          class="arrow down"
          style="position:relative;top:-10px;cursor:pointer;"
          @click="closeview()"
        ></i>
      </div>
      <webview
        ref="webview"
        id="figure"
        style="width:100%;height:100%;"
      ></webview>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import SearchPanel from "@/view/components/search-panel";
import Setting from "@/view/components/setting";
import FilterItem from "@/view/components/FilterItem";
import FilterCtrl from "@/view/components/FilterCtrl";
import TopFocus from "@/view/components/TopFocus";

import Sea from "@/view/components/Sea";
import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";
import { loadHQ } from "@/lib/hq";
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
  updateHQ
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
      selectFilter_c: -1
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
    TopFocus
  },
  filters: {
    objectType(id) {
      return ObjectType[id];
    }
  },
  mounted() {
    initwebview();

    this.reloadData();
    this.timerFn();
    if (this.createSuspension === true) {
      this.$electron.ipcRenderer.send("showSuspensionWindow");
    }

    this.$electron.ipcRenderer.on("hideSuspension", (e, data) => {
      this.$store.dispatch("hideSuspension");
    });

    document.addEventListener("keydown", e => {
      if (e.target && e.target.nodeName == "BODY") {
        let items = this.getfilterItems();

        switch (event.keyCode) {
          case 37:
          case 38:
            if (this.focus === null) {
              this.focus = 0;
            } else if (this.focus > 0) {
              this.focus--;
            }
            break;

          case 39:
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
    createSuspension() {
      return this.$store.state.suspension.show;
    },
    filteredItems: function() {
      return this.getfilterItems();
    },
    focusItems: function() {
      return this.items.filter(e => e.isFocus);
    },
    ...mapGetters(["fields"]),
    ...mapGetters({ sfilters: "filters" })
  },
  methods: {
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
    scrollToItem(item) {
      window.scrollTo({
        top:
          $(`a[name=${item.code}]`)
            .eq(0)
            .offset().top -
          $("table tr")
            .eq(1)
            .offset().top +
          $("table tr")
            .eq(0)
            .height()
      });
    },
    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
      this.openCode = null;
    },
    openlink(
      item,
      event,
      link = "http://localhost:9080/static/tech.html?{{code}}"
    ) {
      this.openType = link;
      let webview = $(this.$refs.webview);
      let webviewWrap = $(this.$refs.webviewWrap);

      let url = link.replace("{{code}}", item.code);

      if (webview[0].src.indexOf(url) > -1 && webviewWrap.is(":visible")) {
        this.closeview();
      } else {
        if (!webviewWrap.is(":visible")) {
          let chartop =
            Math.min(getCookie("charTop", 0.6), 0.9) * $(window).height();
          console.log(chartop, $(window).height() * 0.6);
          $(this.$refs.listtbl).css(
            "margin-bottom",
            $(window).height() - chartop + "px"
          );
          webviewWrap.css("top", chartop + "px");
          setTimeout(() => {
            webviewWrap.css("top", chartop - 1 + "px");
          }, 10);
        }

        webviewWrap.show();
        webview[0].style.height = "100%";
        this.openCode = item.code;
      }
      webview.attr("src", url);

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
      this.items = store.fetch();
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
    },
    newWindow() {
      if (this.createSuspension === true) {
        this.$store.dispatch("hideSuspension");
        this.$electron.ipcRenderer.send("hideSuspensionWindow");
      } else {
        this.$store.dispatch("showSuspension");
        this.$electron.ipcRenderer.send("showSuspensionWindow");
      }
    },
    timerFn() {
      (async () => {
        for (;;) {
          await this.refresh();
          await timeout(2000);
        }
      })();
      (async () => {
        for (;;) {
          monitor(this.items);
          await timeout(60000);
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
        await timeout(60000);
      })();

      (async () => {
        for (;;) {
          await updateHQ(this.items2);
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
        win.isVisible() &&
          win.webContents.send(
            "refresh",
            this.items.filter(e => e.isFocus)
          );
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

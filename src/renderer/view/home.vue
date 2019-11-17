<template>
  <div>
    <iframe src="static/tech.html?sh000001" style="width:100%;height:600px;display:none;"></iframe>
    <div id="top" ref="top">
      <div>
        <div>
          <div style="float:left;">
            <ul class="filters">
              <li v-for="(k,filter) in afilters" :key="filter">
                <a
                  @click="selectSrc=k,visibility=null"
                  :class="{ selected: selectSrc == k }"
                >{{filter}}({{filterCounts[filter]}})</a>
              </li>
              <li v-for="(k,filter) in filters" :key="filter">
                <a
                  @click="visibility=filter"
                  :class="{ selected: visibility == filter }"
                >{{filter}}({{filterCounts[selectSrc.name+filter]}})</a>
              </li>
            </ul>
          </div>
          <div style="float:right;">
            <search-panel @select="addItem"></search-panel>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                  <th>A</th>

                <th>Name</th>
                <th
                  v-for="col in head"
                  @click="sort(col.prop)"
                  :key="col.prop"
                  :class="{ 
                    ascending : sortby === col.prop && !descending,
                    descending: sortby ===col.prop && descending
                }"
                >{{col.label}}</th>
              </tr>
              <tr v-if="selectItem &&  selectItem.tables&&selectItem.tables.length>0">
                <th :colspan="head.length+2">
                  <div id="detail" ref="detail">
                    <span v-if="selectItem.tables&&selectItem.tables.length>0">
                      <div v-for="t in selectItem.tables" :key="t.str">
                        {{selectItem.name}}
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
                v-for="(item,index) in filteredItems"
                :key="item.code"
                :class="{'odd':index%2 != 1,'openlink':openCode==item.code}"
              >             <td>
                  <a style="float:left;" class="action" @click="delItem(item)">x</a>
                  <input type="checkbox" v-model="item.isFocus" @change="saveDatas(item)" />

                </td>
                <td
                  :title="item.code"
                  :class="{lk:item.tables&&item.tables.length>0,hl:item.hili==2,link:true}"
                >
                  <span :class="{sz:item.mk=='sz'}" @click="openlink(item,$event)">{{item.name}}</span>
                  <span
                    title="avgzs"
                    @click="toggleDetail(item)"
                    :class="{avggood:item.avgzs>45 && item.upArgCount>120}"
                  >{{item.avgzs}}</span>
                  <span title="upArgCount">/{{item.upArgCount}}</span>
                  <span title="contDir">/{{item.contDir}}</span>
                </td>

                <td
                  v-for="col in head"
                  :key="col.prop"
                  :class="col.class&&col.class(item)"
                  @click="col.click&&col.click(item,$event,openlink)"
                >{{col.fmt?col.fmt(item[col.prop],item):item[col.prop]}}</td>

   
              </tr>
            </draggable>
          </table>
        </div>
      </div>
    </div>
    <div
      ref="webviewWrap"
      style="position:fixed;left:0;right:0;bottom:0;top:60%;display:none;z-index:100"
    >
      <div
        id="dragBar"
        ref="dragBar"
        v-drag
        draggable="false"
      >
        <i
          class="arrow down"
          style="position:relative;top:-10px;cursor:pointer;"
          @click="closeview()"
        ></i>
      </div>
      <webview ref="webview" id="figure" style="width:100%;height:100%;"></webview>
    </div>
  </div>
</template>

<script>
import SearchPanel from "@/view/components/search-panel";
import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";
import { loadHQ } from "@/lib/hq";
import * as $ from "jquery";
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
import { headers } from "./headers";
import { monitor } from "@/lib/monitor";
import { filters, afilters } from "@/lib/filters";
import { updateItem, getMeetList } from "@/lib/getTable";
export default {
  name: "home",
  data: function() {
    return {
      filters: filters,
      afilters: afilters,
      items: [],
      descending: true,
      sortby: "",
      visibility: "Strong",
      head: headers,
      selectItem: null,
      items2: [],
      filterCounts: {},
      selectSrc: afilters["自选"],
      openCode:null
    };
  },
  directives: {
    drag(el) {
      let oDiv = $(el).parent()[0]; //当前元素
      let self = this; //上下文
      //禁止选择网页上的文字
      document.onselectstart = function() {
        return false;
      };
      el.onmousedown = function(e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        document.onmousemove = function(e) {
          //通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          // target.style.left = l + "px";
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function(e) {
          document.onmousemove = null;
          document.onmouseup = null;
          $("#top").css("margin-bottom", $(oDiv).outerHeight());
          setCookie("charTop", ($(window).outerHeight()-$(oDiv).outerHeight())/$(window).outerHeight());
        };
        //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    }
  },
  components: {
    SearchPanel,
    draggable
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
  },
  watch: {
    items(newVal) {
      this.updateFilterCounts();
    },
    items2(newVal) {
      this.updateFilterCounts();
    }
  },
  computed: {
    createSuspension() {
      return this.$store.state.suspension.show;
    },
    filteredItems: function() {
      let items = this[this.selectSrc.name];
      if (this.visibility)
        return filters[this.visibility](this[this.selectSrc.name]);
      else return items;
    }
  },
  methods: {
    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
       $(this.$refs.top).css("margin-bottom", "0");
       this.openCode=null;
    },
    openlink(item, event,link='http://localhost:9080/static/tech.html?{{code}}') {
      let webview = $(this.$refs.webview);
      let webviewWrap = $(this.$refs.webviewWrap);
      let td = $(event.target).closest("td");

      let url =link.replace('{{code}}',item.code);

      if (webview[0].src.indexOf(url) > -1 && webviewWrap.is(":visible")) {
       
        this.closeview();
      } else {
        if (!webviewWrap.is(":visible")) {
          let chartop = Math.min(getCookie("charTop",   0.6),0.9)*$(window).height();
          console.log(chartop, $(window).height() * 0.6);
          $(this.$refs.top).css(
            "margin-bottom",
            $(window).height() - chartop + "px"
          );
          webviewWrap.css("top", chartop + "px");
           setTimeout(()=>{webviewWrap.css("top", (chartop-1) + "px");},10);
        }
       
         webviewWrap.show();
        webview[0].style.height = "100%";
        this.openCode=item.code;
       
      }
      webview.attr("src", url);

      console.log(url);
      //openKlineWindow(this, item);
    },
    updateFilterCounts() {
      let map = {};
      console.log("update filter count");
      for (let i in this.afilters) {
        let items = this[this.afilters[i].name];
        let name = this.afilters[i].name;
        map[i] = items.length;

        for (let k in this.filters) {
          map[name + k] = this.filters[k](items).length;
        }
      }

      this.filterCounts = map;
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
    },
    addItem(selectItem) {
      store.save(this.items);
      let datas = store.fetch();
      console.log(selectItem);
      if (datas.filter(it => it.code == selectItem.code).length == 0) {
        datas.push(selectItem);
        store.save(datas);
      }
      this.reloadData();
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
        let items = await getFindList();
        this.items2.length = 0;

        items.forEach(e => this.items2.push(e));
        await timeout(60000);
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
          win.webContents.send("refresh", this.items.filter(e => e.isFocus));
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
      store.save(this.items);
      this.sendRefresh();

      //}
    },
    saveDatas(item) {
      if (item.isFocus) this.addItem(item);
      store.save(this.items);
      this.updateFilterCounts();
    }
  }
};
</script>
<style scoped src="./home.css"/>
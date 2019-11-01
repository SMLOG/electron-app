<template>
  <div>
    <iframe src="static/tech.html?sh000001" style="width:100%;height:600px;display:none;"></iframe>

    <webview
      id="figure"
      src="http://finance.sina.com.cn/realstock/company/sh601318/nc.shtml"
      style="width:100%;height:460px;display:none;"
    ></webview>
    <div>
      <div style="float:left;">
        <ul class="filters">
          <li v-for="(k,filter) in filters" :key="filter">
            <a @click="visibility=filter" :class="{ selected: visibility == filter }">{{filter}}</a>
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
            <th>Action</th>
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
            :class="{'odd':index%2 != 1}"
          >
            <td
              :title="item.code"
              @click="toggleDetail(item)"
              :class="{lk:item.tables&&item.tables.length>0}"
            >
              <span :class="{sz:item.mk=='sz'}">{{item.name}}</span>
              <span
                :class="{avggood:item.avgzs>45 && item.upArgCount>120}"
              >{{item.avgzs}}/{{item.upArgCount}}</span>
              <span v-if="item.contDir!=0">/{{item.contDir}}</span>
            </td>

            <td
              v-for="col in head"
              :key="col.prop"
              :class="col.class&&col.class(item)"
            >{{col.fmt?col.fmt(item[col.prop],item):item[col.prop]}}</td>

            <td>
              <input type="checkbox" v-model="item.isFocus" @change="saveDatas()" />
              <a style="float:right;" class="action" @click="delItem(item)">Delete</a>
            </td>
          </tr>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script>
import SearchPanel from "@/view/components/search-panel";
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
  timeout
} from "@/lib/utils";
import { headers } from "./headers";
import { monitor } from "@/lib/monitor";
import { filters } from "@/lib/filters";
import { updateItem, getMeetList } from "@/lib/getTable";
export default {
  name: "home",
  data: function() {
    return {
      filters: filters,
      items: [],
      descending: true,
      sortby: "",
      visibility: "Strong",
      head: headers,
      selectItem: null,
      items2: []
    };
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
    //initwebview();
    this.reloadData();
    this.timerFn();
    if (this.createSuspension === true) {
      this.$electron.ipcRenderer.send("showSuspensionWindow");
    }

    this.$electron.ipcRenderer.on("hideSuspension", (e, data) => {
      this.$store.dispatch("hideSuspension");
    });
  },
  computed: {
    createSuspension() {
      return this.$store.state.suspension.show;
    },
    filteredItems: function() {
      return filters[this.visibility](this.items, this.items2);
    }
  },
  methods: {
    toggleDetail(item) {
      if (this.selectItem != item) this.selectItem = item;
      else this.selectItem = null;
    },
    sort(prop) {
      this.items.sort(function(a, b) {
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
      if (this.descending) this.items.reverse();
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
        await timeout(300000);
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
        /* let data = parse(item);
        data.pre = item.now;
        if (!data.preVolume || item.volume > data.preVolume)
          data.preVolume = item.volume;
        Object.assign(item, data);
        let analyst = updateItem(item);
        for (let p in analyst) {
          this.$set(item, p, analyst[p]);
        }*/

        if (
          item.pe_ttm > 0 &&
          ((item.tbzz && item.tbzz > 0 && item.pe_ttm / item.tbzz < 1) ||
            (item.PEG && item.PEG > 0 && item.PEG < 1))
        ) {
          item.candidateType = 1;
          let tbPGE = item.pe_ttm / item.tbzz;
          if (tbPGE < 1 && tbPGE > 0 && item.PEG > 0 && item.PEG < 1)
            item.candidateType = 2;
        } else {
          item.candidateType = 0;
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
    saveDatas() {
      store.save(this.items);
    }
  }
};
</script>
<style scoped src="./home.css"/>
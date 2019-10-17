<template>
  <div>
    <div>
      <div style="float:left;">
        <ul class="filters" style="margin-top:20px;">
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
        </thead>
        <draggable v-model="items" @update="dragEnd" tag="tbody">
          <tr
            class="item"
            v-for="(item,index) in filteredItems"
            :key="item.code"
            :class="{'odd':index%2 != 1}"
          >
            <td :title="item.code">
              {{item.name}}
              <span
                :class="{avggood:item.avgzs>45 && item.upArgCount>120}"
              >{{item.avgzs}}/{{item.upArgCount}}</span>
            </td>

            <td
              v-for="col in head"
              :key="col.prop"
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
import { ObjectType, parse, loadScripts, attachData, timeout } from "@/utils";
import { headers } from "./headers";

const filters = {
  All: function(items) {
    return items;
  },
  Option1: function(items) {
    return items.filter(function(item) {
      return item.candidateType > 0;
    });
  },
  Option2: function(items) {
    return items.filter(function(item) {
      return item.candidateType > 1;
    });
  },
  Strong: items => {
    return items.filter(e => e.avgzs > 0 || e.upArgCount > 120);
  },
  Focus: function(items) {
    return items.filter(function(item) {
      return item.isFocus;
    });
  }
};

export default {
  name: "home",
  data: function() {
    return {
      filters: filters,
      items: [],
      descending: true,
      sortby: "",
      visibility: "Strong",
      head: headers
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
      return filters[this.visibility](this.items);
    }
  },
  methods: {
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
      //store.save(this.items);
      //this.sendRefresh();
    },
    reloadData() {
      this.items = store.fetch();
    },
    addItem(selectItem) {
      let datas = store.fetch();
      console.log(selectItem);
      if (datas.filter(it => it.code == selectItem.code).length == 0) {
        datas.push(selectItem);
        store.save(datas);
      }
      this.reloadData();
      this.sendRefresh();
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
          await timeout(2000);
          await this.refresh();
        }
      })();
      (async () => {
        await loadScripts(["/static/js/sf_sdk.js"]);

        for (;;) {
          for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            let name = "tdatas" + item.code;
            if (!window[name]) {
              window[name] = [];
              let resp = await new Promise((resolve, reject) => {
                KKE.api(
                  "datas.t.get",
                  {
                    symbol: item.code
                  },
                  function(resp) {
                    resolve(resp);
                  }
                );
              });
              console.log(resp);

              item.avgzs = item.upArgCount = 0;

              let datas = (window[name] = resp.data.td1.filter(
                e => e.volume > 0
              ));
              let stop1 = false;
              for (let i = datas.length - 1; i > 0; i--) {
                if (
                  datas[i].avg_price >
                  datas[i]
                    .price /*||
                  Math.floor(datas[i].avg_price * 100) / 100 <
                    Math.floor(datas[i - 1].avg_price * 100) / 100*/
                ) {
                  console.log(i, datas[i], datas[i - 1]);
                  stop1 = true;
                  // break;
                } else {
                  if (!stop1) item.avgzs += 1;

                  item.upArgCount += 1;
                }
              }
            }
          }
          await timeout(60000);
          let d = new Date();
          let h = d.getHours();
          let m = d.getMinutes();
          if (h < 9 || h > 15) continue;
          if (h == 9 && m < 30) continue;
          if (h == 11 && m > 30) continue;
          if (h > 11 && h < 13) continue;
          if (h > 15) continue;
          for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            let name = "tdatas" + item.code;
            let datas = window[name];
            let avg = (item.amount / item.volume).toFixed(2);
            datas.push({
              price: item.now,
              volume: item.volume,
              amount: item.amount,
              avg_price: avg
            });

            if (avg < datas[datas.length - 2].avg || item.now < avg) {
              item.avgzs = 0;
              continue;
            } else {
              item.upArgCount += 1;
              item.avgzs += 1;
            }
          }
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
      let str = this.items
        .reduce((total, cur, curIndex, arr) => {
          if (cur.code.match(/^(sh)|(sz)/)) {
            total.push(`${cur.code}_i`);
          }
          total.push(cur.code);

          return total;
        }, [])
        .join(",");
      let that = this;
      let needReloadData = false;
      await loadScripts([
        `http://hq.sinajs.cn/list=${str}`,
        `http://qt.gtimg.cn/q=${str}`
      ]);

      for (let i = 0; i < that.items.length; i++) {
        let item = that.items[i];
        let data = parse(item);
        data.pre = item.now;
        if (!data.preVolume || item.volume > data.preVolume)
          data.preVolume = item.volume;
        Object.assign(item, data);
        //that.$set(item, "zzl", "zzl");
        let analyst = attachData(item);

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
        if (typeof analyst == "object") {
          for (let p in analyst) that.$set(item, p, analyst[p]);
          // Object.assign(item, analyst);
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
      if (confirm("are you sure?")) {
        //this.items = this.items.slice(this.items.indexOf(item), 1);
        console.log(this.items.indexOf(item));
        this.items.splice(this.items.indexOf(item), 1);
        store.save(this.items);
        this.sendRefresh();
      }
    },
    saveDatas() {
      store.save(this.items);
    }
  }
};
</script>
<style scoped src="./home.css"/>
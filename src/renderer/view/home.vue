<template>
  <div>
    <div>
      <div style="float:left;">
        <ul class="filters" style="margin-top:20px;">
          <li>
            <a @click="visibility='all'" :class="{ selected: visibility == 'all' }">All</a>
          </li>
          <li>
            <a @click="visibility='focus'" :class="{ selected: visibility == 'focus' }">Focus</a>
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
            <td :title="item.code">{{item.name}}</td>

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
const fmtPercent = value => {
  if (value) return parseFloat(value).toFixed(2) + "%";
  return value;
};

const filters = {
  all: function(items) {
    return items;
  },
  focus: function(items) {
    return items.filter(function(item) {
      return item.isFocus;
    });
  }
};

export default {
  name: "home",
  data: function() {
    return {
      items: [],
      descending: true,
      sortby: "",
      visibility: "all",
      head: [
        { label: "Price", prop: "now", type: "number" },
        {
          label: "Turnover",
          prop: "turnover",
          type: "number",
          fmt: fmtPercent
        },
        { label: "流值", prop: "lz", type: "string" },
        { label: "总值", prop: "zsz", type: "number" },
        { label: "PE(TTM)", prop: "pe_ttm", type: "number" },
        {
          label: "PEG",
          prop: "PEG",
          type: "number",
          fmt: e => e && e.toFixed(2)
        },
        {
          label: "三二年复合",
          prop: "zzl3",
          type: "number",
          fmt: (e, item) =>
            e &&
            `${parseFloat(e).toFixed(2)}%,${parseFloat(item.zzl2).toFixed(2)}%`
        },
        { label: "同比", prop: "tbzz", type: "number", fmt: fmtPercent },
        { label: "收益", prop: "zzl", type: "string" }
      ]
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

    if (false)
      loadScripts(["/static/js/sf_sdk.js"]).then(() => {
        let papercode = "sh601318";
        let _compareColor = ["#f69931", "#f2c700", "#3e4de1", "#bf58ef"];

        if (false)
          KKE.api(
            "chart.h5k.get",
            {
              symbol: papercode
            },
            function(tChart) {
              console.log(tChart);
              tChart.tCharts.apply(null, [[{ name: "TVOL" }]]);
              console.log("ok");

              if (false)
                KKE.api(
                  "plugins.techcharts.get",
                  {
                    type: "tech"
                  },
                  function(res) {
                    console.log(res);

                    let tChart = res.tChart;
                    new tChart({
                      stockData: h5k,
                      cfg: { DIMENSION: {}, datas: {} },
                      usrObj: { tchartobject: {} }
                    }).linkData();
                  }
                );
            }
          );
        /* KKE.api(
          "plugins.techcharts.get",
          {
            type: "tech"
          },
          function(callbackObj) {
            console.log(callbackObj);
            let tChart = callbackObj.tChart;
            let pChart = callbackObj.pChart;
            //let t = new tChart({});
            new pChart({
                iMgr: iMgr,
                stockData: stockData,
                chartArea: G,
                titleArea: z,
                cb: he,
                type: "t",
                cfg: cfg,
                usrObj: config
              }))
            window.tChart = tChart;
          }
        );*/
        //alert("ok");
        let fmtDate = d =>
          `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        (async () => {
          let symbols = ["sz000002"];
          for (let i = 0; i < symbols.length; i++) {
            let dom = document.getElementById("h5Figure");
            dom.innerHTML = "";
            // dom.style.display = "none";
            await new Promise((resolve, reject) => {
              KKE.api(
                "plugins.tchart.get",
                {
                  compare: {
                    color: _compareColor
                  },
                  symbol: symbols[i], //证券代码
                  mt: "cnlv1",
                  dom_id: "h5Figure", //放置图形的dom容器id
                  type: "tech"
                },
                function(chart_) {}
              );
              let handler = () => {
                console.log("checking");
                let techs = window["techs"];
                let names = ["VOLUME", "MACD"];
                let ready = false;
                if (techs) {
                  techs = techs[0];
                  for (let k = 0; k < names.length; k++) {
                    let name = names[k];
                    if (!techs[name] || techs[name].symbol != symbols[i]) {
                      ready = false;
                      break;
                    }
                    ready = true;
                  }
                }
                if (ready) {
                  let datas = techs["MACD"].datas;
                  let prices = window["techs"][1];
                  let buyi = -1;
                  let mmd = [];
                  for (let j = 1; j < datas.length; j++) {
                    if (
                      parseFloat(datas[j].bar) > 0 &&
                      parseFloat(datas[j - 1].bar) <= 0
                    ) {
                      buyi = j;
                    }
                    // 空动能
                    else if (
                      buyi > 0 &&
                      parseFloat(datas[j].bar) <= parseFloat(datas[buyi].bar) &&
                      parseFloat(datas[j - 1].bar) >=
                        parseFloat(datas[buyi].bar)
                    ) {
                      if (datas[buyi]) {
                        // console.log(datas[j], datas[j - 1], datas[buyi]);
                        let profit = (
                          prices[j].close - prices[buyi].close
                        ).toFixed(2);

                        console.log(
                          `buy ${fmtDate(datas[buyi].date)} ${fmtDate(
                            prices[buyi].date
                          )}  sell ${fmtDate(datas[j].date)} ${fmtDate(
                            prices[j].date
                          )} price:${prices[j].close.toFixed(2)} - ${prices[
                            buyi
                          ].close.toFixed(2)} profit:${profit}`
                        );
                        datas[j].close = prices[j].close;
                        datas[buyi].close = prices[buyi].close;

                        mmd.push([datas[buyi], datas[j], j - buyi]);
                      }
                    }
                  }
                  window.mmd = mmd;

                  let i2019 = mmd.filter(p => p[0].date.getFullYear() == 2018);
                  console.log(i2019);
                  i2019.reduce((total, prev, arr, i) => {
                    let profit = prev[1].close - prev[0].close;
                    total += profit;
                    console.log(
                      fmtDate(prev[0].date),
                      "to",

                      fmtDate(prev[1].date),

                      prev[2] + "天",
                      `买入价${prev[0].close.toFixed(
                        2
                      )} 卖出价${prev[1].close.toFixed(2)}`,
                      "当期盈利" + profit.toFixed(2),
                      "总盈利" + total.toFixed(2)
                    );
                    return total;
                  }, 0);

                  return resolve();
                }
                setTimeout(() => {
                  handler();
                }, 2000);
                // resolve();
              };
              handler();
            });
          }
        })();
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
        Object.assign(item, data);
        //that.$set(item, "zzl", "zzl");
        let analyst = attachData(item);

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
        win.isVisible() && win.webContents.send("refresh", this.items);
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

<style type="text/css">
table {
  width: 100%;
}
th,
td {
  text-align: left;
}
.odd {
  background: #eee;
}
.action {
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}
table thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
table th,
table td {
  font-size: 12px;
  text-align: left;
  border: 1px solid #ccc;
  padding: 5px;
}
table th:not(:first-of-type) {
  border-left: 0;
}
table td {
  border-top: 0;
}
table td:not(:first-of-type) {
  border-left: 0;
}
table th {
  background: #666;
  color: white;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
}
table tr:nth-of-type(even) td {
  background: whitesmoke;
}
table tr:hover td {
  background: #b3b3b3;
}
table th {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 150ms;
  user-select: none;
}
table th:before {
  content: "";
  display: inline-block;
  color: rgba(255, 255, 255, 0.4);
  transition: color 300ms, -webkit-transform 300ms;
  transition: transform 300ms, color 300ms;
  transition: transform 300ms, color 300ms, -webkit-transform 300ms;
  position: absolute;
  font-size: 18px;
  left: 4px;
  top: calc(50% - 9px);
}
table .ascending:before {
  /*-webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);*/
  color: white;
}
table .descending:before {
  /*-webkit-transform: rotate(90deg);
  transform: rotate(90deg);*/
  color: white;
}
table .ascending::before {
  content: "↑";
  margin-left: -5px;
  font-size: 12px;
}
table .descending:before {
  content: "↓";
  margin-left: -5px;
  font-size: 12px;
}
@supports (display: contents) {
  table {
    display: grid;
    grid-template-columns: repeat(5, auto);
  }
  table thead,
  table tbody,
  table tr {
    display: contents;
  }
  table th {
    border-color: #af1313;
  }
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
</style>
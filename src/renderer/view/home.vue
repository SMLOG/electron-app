<template>
  <div>
    <div>
      <search-panel @select="addItem"></search-panel>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>PE(TTM)</th>
            <th>净利润同比</th>
            <th>Action</th>
          </tr>
        </thead>
        <draggable v-model="items" @update="dragEnd" tag="tbody">
          <tr
            class="item"
            v-for="(item,index) in items"
            :key="item.code"
            :class="{'odd':index%2 != 1}"
          >
            <td>{{item.code}}</td>
            <td>{{item.name}}</td>
            <td>{{item.now}}</td>
            <td>{{item.pe_ttm}}</td>
            <td>{{item.zzl}}</td>

            <td>
              <a class="action" @click="delItem(item)">Delete</a>
            </td>
          </tr>
        </draggable>
      </table>
    </div>
    <div id="h5Figure" style="height:600px"></div>
  </div>
</template>

<script>
import SearchPanel from "@/view/components/search-panel";
import store from "@/localdata";
import draggable from "vuedraggable";
import { ObjectType, parse, loadScripts, attachData, timeout } from "@/utils";
export default {
  name: "home",
  data: function() {
    return {
      items: []
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
  methods: {},
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
    }
  },
  methods: {
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
      console.log(item);
      //this.items = this.items.slice(this.items.indexOf(item), 1);
      console.log(this.items.indexOf(item));
      this.items.splice(this.items.indexOf(item), 1);
      store.save(this.items);
      this.sendRefresh();
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
</style>
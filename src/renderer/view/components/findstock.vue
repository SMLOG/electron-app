<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>PE</th>
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
            <td>{{item.pe}}</td>
            <td>
              <a class="action" @click="delItem(item)">Delete</a>
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
import { ObjectType, loadScripts } from "@/utils";
import { FieldHead } from "@/fieldhead";

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
    }
  },
  methods: {
    dragEnd(e) {
      e.preventDefault(); //通知 Web 浏览器不要执行与事件关联的默认动作
      store.save(this.items);
      this.sendRefresh();
    },
    reloadData() {
      //this.items = store.fetch();
      window["jQuery11240971039677606834_1567225044287"] = res => {
        console.log(res.data.diff);
        this.items = res.data.diff.map(e => {
          e.now = e.f2;
          e.changeP = e.f3;
          e.change = e.f4;
          e.vol = e.f5;
          e.amount = e.f6;
          e.zf = e.f7;
          e.turnRate = e.f8;
          e.pe = e.f9;
          e.lb = e.f10;
          e.zs5m = e.f11; //5分钟涨跌
          e.code = e.f12;
          e.name = e.f14;
          e.high = e.f15;
          e.low = e.f16;
          e.open = e.f17;
          e.preClose = e.f18;
          e.totalValue = e.f20;
          e.ltValue = e.f21;
          e.zs = e.f22; //涨速
          e.pb = e.f23;
          e.change60d = e.f24;
          e.change52w = e.f25;

          return e;
        });
      };
      loadScripts([
        "http://7.push2.eastmoney.com/api/qt/clist/get?cb=jQuery11240971039677606834_1567225044287&pn=1&pz=2&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f19,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1567225044356"
      ]).then(() => {});
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
    sendRefresh() {
      this.$electron.remote.app.minwin.webContents.send("refresh");
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
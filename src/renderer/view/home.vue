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
<template>
  <div>
    <div>
      <div>
        <ul class="nav">
        <li  v-if="info" class="info">
         <span>{{info.name}}</span><span :class="{red:info.change>0,green:info.change<0}">{{info.close}}({{info.change}},{{info.changeP}}%)</span> <span>pe_ttm: {{info.pe_ttm}}</span>
        </li>
        <li @click="add_node">add node</li>
        <li v-for="node in mind.data.filter(e=>e.parentid=='root')" :key="node.id"><a @click="to(node.id)">{{node.topic}}</a></li>
        </ul>
        </div>
      
    <div id="jsmind_tools" class="jsmind-tools">
    <ul>
        <li v-for="(row,i) in mind.rawDatas" :key="row.reportdate" :class="{cur:i==mind.selectIndex}" @click="mind.selectIndex=i">{{row.reportdate}}</li>
   
    </ul>
</div>
    </div>
    <js-mind style="margin-top: 35px;"
      v-if="mind.data.length>0"
      :values="mind"
      :options="options"
      ref="jsMind"
      :height="height+'px'"
      width:='100%'
    ></js-mind>
  </div>
</template>
<script>
import $ from "jquery";
import JsMind from "./index";
import { batchUpdateHQ } from "@/lib/getTable";

var self;
export default {
  data() {
    return {
      items: [],
      info: null,
      height: 1000,
      theme_value: "",
      mind: {
        selectIndex: 0,
        rawDatas: [],
        meta: {},
        format: "node_array",
        data: [],
      },
      options: {
        mode: "side",
      },
    };
  },
  components: { JsMind },
  mounted() {
    self = this;
    this.$route.params.code = (this.$route.params.code || "").replace(
      /[^\d]+/g,
      ""
    );
    if (
      !this.$route.params.code &&
      !this.$route.params.code.match(/^[036]\d{5}$/)
    ) {
      alert("请输入代码参数或者检查代码参数格式是否正确？");
      return;
    }
    this.$http
      .get("/api/mind", {
        params: {
          code:
            (this.$route.params.code[0] == "6" ? "sh" : "sz") +
            this.$route.params.code,
        },
      })
      .then((resp) => {
        this.mind.rawDatas.splice(0, -1, ...resp.data.datas);
        this.info = resp.data.info;
        this.items.push(this.info);
        this.$http.get("/static/test.json").then((resp) => {
          this.mind.data.splice(0, -1, ...resp.data);
          setTimeout(() => {
            this.jm = this.$refs.jsMind.jm;
            this.jmObj = this.$refs.jsMind.jmObj;
            $(window).resize(() => {
              this.height = $(window).height() - 35;
              this.jm.resize();
            });
          }, 1000);
        });
      });
  },
  methods: {
    to(id) {
      this.$el.querySelector(`#node${id}`).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    add_node() {
      var selected_node = this.jm.get_selected_node(); // as parent of new node
      if (!selected_node) {
        alert("please select a node first.");
        return;
      }

      var nodeid = this.jmObj.util.uuid.newid();
      var topic = "* Node_" + nodeid.substr(nodeid.length - 6) + " *";
      this.jm.enable_edit();
      this.mind.data.push({ id: nodeid, topic: topic });
      setTimeout(() => {
        var node = this.jm.add_node(selected_node, nodeid, topic);
      }, 100);
    },
  },
  sockets: {
    hx(data) {
      //console.log(data);
      // this.$socket.emit("echo", data);
      batchUpdateHQ(this.items, data);
    },
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: auto !important;
  height: auto !important;
}
body {
  overflow: hidden;
}
ul.nav {
  list-style: none;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #ccc;
}
ul.nav li {
  float: left;
  display: inline-block;
  line-height: 28px;
  font-size: 14px;
  margin: 0 3px;
  padding: 3px;
  background: #ccc;
  cursor: pointer;
}
.jsmind-tools {
  position: fixed;
  z-index: 100;
  top: 10px;
  right: 10px;
  border: solid 1px #fff;
  background-color: #fff;
  border-radius: 5px;
  opacity: 0.3;
}
.jsmind-tools:hover {
  opacity: 1;
}
.jsmind-tools-active {
  border-color: gray;
  opacity: 1;
}
.jsmind-tools ul {
  float: left;
  margin: 0 3px;
  padding: 0;
  list-style: none;
}
.jsmind-tools li {
  height: 24px;
  overflow: hidden;
  line-height: 24px;
  opacity: 0.4;
  cursor: pointer;
}
.jsmind-tools li.visible {
  display: block;
}
.jsmind-tools li:hover {
  opacity: 1;
}
.jsmind-tools-active li.visible {
  opacity: 1;
}
.jsmind-tools-active li {
  display: block;
}
.jsmind-tools li.cur {
  font-weight: bold;
  opacity: 1;
  color: red;
}
</style>
<style >
.tooltip {
  z-index: 10000;
}

.tooltip {
  position: fixed !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
.tooltip-inner {
  background: RED;
  color: white;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
  max-width: 250px;
}

.tooltip-arrow {
  border-color: blue;
}
.info span {
  padding: 0 3px;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
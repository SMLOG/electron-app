<template>
  <div>
    <div id="jsmind_tools" class="jsmind-tools">
    <ul>
        <li action="toggle" >
          <button v-tooltip="{
  content: 'hello',
  placement: 'bottom-center',
  classes: ['info'],
  targetClasses: ['it-has-a-tooltip'],
  
}">Hover me</button>
        </li>
        <li v-for="(row,i) in mind.rawDatas" :key="row.reportdate" :class="{cur:i==mind.selectIndex}" @click="mind.selectIndex=i">{{row.reportdate}}</li>
   
    </ul>
</div>
    <js-mind
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
var self;
export default {
  data() {
    return {
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
    this.$http.get("/api/mind?code=sh600031").then((resp) => {
      this.mind.rawDatas.splice(0, -1, ...resp.data);
      this.$http.get("/static/test.json").then((resp) => {
        this.mind.data.splice(0, -1, ...resp.data);
        setTimeout(() => {
          this.jm = this.$refs.jsMind.jm;
          $(window).resize(() => {
            this.height = $(window).height();
            this.jm.resize();
          });
        }, 1000);
      });
    });
  },
  methods: {},
};
</script>
<style scoped>
.jsmind-tools {
  position: absolute;
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
<style scoped>
.tooltip {
  display: block !important;
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
</style>
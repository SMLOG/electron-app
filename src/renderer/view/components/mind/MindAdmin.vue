<template>
  <div>
    <div id="jsmind_tools" class="jsmind-tools">
    <ul>
        <li action="toggle" class="icon-cog visible" title="click for more function">*</li>
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
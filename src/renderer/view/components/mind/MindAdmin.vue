<template>
  <div>
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
import JsMind from "./index";
var self;
export default {
  data() {
    return {
      height: 1000,
      rawDatas: [],
      theme_value: "",
      mind: {
        meta: {},
        getTopic(node) {
          let type =
            node.topic.indexOf("%") > 0 ||
            (node.topic.indexOf("率") > 0 && node.topic.indexOf("周转") == -1)
              ? 1
              : 0;
          return `<div><span class="label">${node.topic.replace(
            "(%)",
            ""
          )}</span><span class="value">${
            (rawDatas[0][node.alias] &&
              self &&
              (type ? self.$fmtPercent : self.$fmtNumber)(
                (type ? 100 : 1) * rawDatas[0][node.alias]
              )) ||
            ""
          }</span></div>`;
        },
        format: "node_array",
        data: [],

        shortCutVal: "",
        keyCode: "",
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
      window.rawDatas = resp.data;
      this.$http.get("/static/test.json").then((resp) => {
        this.mind.data = this.mind.data.concat(resp.data);
        setTimeout(() => {
          this.jm = this.$refs.jsMind.jm;
        }, 1000);
      });
    });
  },
  methods: {},
};
</script>
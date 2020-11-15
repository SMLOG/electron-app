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
      theme_value: "",
      mind: {
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
        }, 1000);
      });
    });
  },
  methods: {},
};
</script>
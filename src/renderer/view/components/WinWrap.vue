<template>
  <div
    class="winwarp"
    style="
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 4;
      position: fixed;
      overflow: scroll;
      border: 1px solid #95bad0;
      background: white;
      width: 1000px;
    "
  >
    <div class="subnav tip-nav">
      <div
        style="
          position: absolute;
          margin-left: 10px;
          top: 0;
          left: 0;
          z-index: 1;
        "
      >
        <span @click="$emit('close')">x</span>
        <b>{{ item.name }}</b>
      </div>
    </div>
    <div style="height: 100%; width: 100%">
      <keep-alive>
        <component v-bind:is="curComponent" :item="item"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import FinAnalyst2 from "@/view/components/FinAnalyst/FinAnalyst2";
import Chart from "@/view/components/h5/Chart";
export default {
  data() {
    return {};
  },
  props: {
    item: Object,
    close: Function,
    curComponent: String,
  },
  components: {
    FinAnalyst2,
    Chart,
  },

  methods: {},

  mounted() {},
};
</script>

<style scoped>
</style>



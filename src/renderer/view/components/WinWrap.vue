<template>
  <div
    class="winwarp"
    style="
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 4;
      position: fixed;
      border: 1px solid #95bad0;
      background: white;
      width: 1000px;
    "
  >
    <div class="subnav tip-nav">
      <div
        style="
          position: absolute;
          padding-left: 3px;
          top: 0px;
          padding-right: 3px;
          left: -16px;
          z-index: 1;
          width: 1em;
          background: white;
          cursor: pointer;
        "
      >
        <span class="close" @click="$emit('close')">x</span>
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
.close {
  width: 1em;
  text-align: center;
  cursor: pointer;
  color: #fff;
  display: block;
  background: red;
  border-radius: 50%;
}
</style>



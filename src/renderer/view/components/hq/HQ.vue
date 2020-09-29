<template>
  <div>
    <div id="hqMain">
      <section id="cn_hqdata" class="hq_hqdata" style="display: none"></section>

      <!-- 行情图组件 start -->
      <section class="cn-chart">
        <div class="cn-chart-box" id="h5Chart"></div>
      </section>
      <!-- 行情图组件 end -->
    </div>
    <div id="hq_chart"></div>
  </div>
</template>
<script>
import { loadScripts } from "@/lib/utils";

export default {
  data() {
    return {};
  },
  props: {
    item: Object,
  },
  mounted() {
    window.paperCode = "sh000001";
    setTimeout(() => {
      loadScripts([
        "/static/js2/IO.WebPush4.js",
        "/static//js2/HQ_DataApps.js?hsw=7.32",
        "/static/js2/zepto.min.js",
        "/static/js2/sf_sdk.js",
        "/static/js2/cn2017.js?hsw=7.32",
      ]);
    }, 100);
  },
  watch: {},
  methods: {},
};
</script>
<style scoped src="./cn2017.css" />



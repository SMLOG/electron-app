<template>
  <div :key="refresh" :style="{ height }">
    <div id="jsmind_container" ref="jsmind_container">
      <div class="jsmind-inner">
        <canvas width="2092" height="4572"></canvas>
        <div class="jmnodes">
          <template v-for="node in values.data">
            <div class="jmnode" :key="node.id" :nodeid="node.id">
              <div>
                <span class="label" :title="getTopicTitle(node)">{{
                  getTopicTitle(node)
                }}</span
                ><span class="value">{{ getTopic(node) }}</span>
                <peity
                  :type="'line'"
                  :options="{ fill: ['#c6d9fd'] }"
                  :data="getTrendDatas(node)"
                ></peity>
              </div>
            </div>
            <div
              class="jmexpander"
              v-if="node.id != 'root'"
              :key="'e' + node.id"
              :nodeid="node.id"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jm from "./jsmind.js";
import "./jsmind.css";
import "./jsmind.draggable.js";
import "./jsmind.screenshot.js";
export default {
  props: {
    values: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
    },
    height: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      jm: {},
      refresh: 1,
      value: {},
      default_options: {
        container: "jsmind_container",
        editable: true, // 是否启用编辑
        theme: "primary", // 主题
        mode: "full", // 显示模式,
        getTopic(node) {
          return node.id + node.topic;
        },
        support_html: true, // 是否支持节点里的HTML元素
        view: {
          engine: "canvas", // 思维导图各节点之间线条的绘制引擎
          hmargin: 30, // 思维导图距容器外框的最小水平距离
          vmargin: 30, // 思维导图距容器外框的最小垂直距离
          line_width: 1, // 思维导图线条的粗细
          line_color: "#555", // 思维导图线条的颜色
        },
        layout: {
          hspace: 10, // 节点之间的水平间距
          vspace: 10, // 节点之间的垂直间距
          pspace: 13, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
      },
    };
  },
  updated() {
    this.init();
  },
  watch: {
    options() {
      this.$nextTick(() => {
        this.refresh++;
      });
    },
    values: {
      deep: true,
      handler(n, o) {
        this.$nextTick(() => {
          this.refresh++;
        });
      },
    },
  },
  methods: {
    getTrendDatas(node) {
      return this.values.rawDatas
        .map((e) => e[node.alias])
        .filter((e, i) => i < 5)
        .reverse()
        .join(",");
    },
    getTopicTitle(node) {
      return node.topic.replace("(%)", "");
    },
    getTopic(node) {
      let rawDatas = this.values.rawDatas;
      let selectIndex = this.values.selectIndex;
      let type =
        node.topic.indexOf("%") > 0 ||
        (node.topic.indexOf("率") > 0 && node.topic.indexOf("周转") == -1)
          ? 1
          : 0;
      return (
        (rawDatas[selectIndex][node.alias] &&
          (type ? this.$fmtPercent : this.$fmtNumber)(
            (type ? 100 : 1) * rawDatas[selectIndex][node.alias]
          )) ||
        ""
      );
    },
    init() {
      const options = Object.assign(this.default_options, this.options);
      if (this.values.data.length > 0) this.jm = jm.show(options, this.values);
    },
  },
};
</script>
<style scoped>
#jsmind_container {
  height: 100%;
}
</style>

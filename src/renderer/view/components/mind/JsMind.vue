<template>
  <div :style="{ height }">
    <div id="jsmind_container" ref="jsmind_container">
      <div class="jsmind-inner">
        <canvas></canvas>
        <div class="jmnodes">
          <template v-for="node in values.data">
            <div
              class="jmnode"
              :key="node.id"
              :id="'node' + node.id"
              :parentid="node.parentid"
              :nodeid="node.id"
              @click="selectnode(node)"
            >
              <div>
                <font-awesome-icon
                  v-if="node.tip"
                  v-tooltip="node.tip"
                  :icon="['fas', 'info-circle']"
                />
                <span
                  :class="{
                    good: getIndicator(node) === 1,
                    bad: getIndicator(node) === 0,
                  }"
                  v-tooltip="getTopicTitle(node)"
                  class="label"
                >
                  {{ getTopicTitle(node) }}</span
                ><span class="value">{{ getTopic(node) }}</span>
                <peity
                  :type="'bar'"
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
let that;
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
    that = this;
    this.init();
  },
  data() {
    return {
      jm: {},
      refresh: 1,
      value: {},
      default_options: {
        engine: "canvas",
        hmargin: 30, // 思维导图距容器外框的最小水平距离
        vmargin: 30, // 思维导图距容器外框的最小垂直距离
        line_width: 1, // 思维导图线条的粗细
        line_color: "#555", // 思维导图线条的颜色
        container: "jsmind_container",
        editable: false, // 是否启用编辑
        theme: "primary", // 主题
        updateNode(node) {
          that.values.data.filter((n) => node.id == n.id)[0].topic = node.topic;
        },
        support_html: true, // 是否支持节点里的HTML元素
        layout: {
          mode: "full",
          hspace: 10, // 节点之间的水平间距
          vspace: 10, // 节点之间的垂直间距
          pspace: 13, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
      },
    };
  },
  mount() {
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
    selectnode(node) {
      this.jm.select_node(node.id);
    },
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
    getIndicator(node) {
      let rawDatas = this.values.rawDatas[node.sourceId || 0];
      let selectIndex = this.values.selectIndex;
      if (node.alias && "_" + node.alias in rawDatas[selectIndex]) {
        return rawDatas[selectIndex]["_" + node.alias];
      }
      return false;
    },
    getTopic(node) {
      let rawDatas = this.values.rawDatas[node.sourceId || 0];
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
      this.jmObj = jm;
    },
  },
};
</script>
<style scoped>
#jsmind_container {
  height: 100%;
}
.jmnode {
  font-size: 14px;
  line-height: 24px;
  padding: 0 3px;
}
.good {
  background: green;
}
.bad {
  background: red;
}
</style>

<template>
  <div
    class="winwarp"
    style="
      bottom: 0;
      right: 0;
      z-index: 4;
      position: fixed;
      border: 1px solid #95bad0;
      background: white;
      width: 1000px;
    "
    :style="{ top: chartop + 'px' }"
    v-if="item"
  >
    <div id="dragBar" ref="dragBar" v-drag draggable="false">
      <i
        @click="$emit('close')"
        style="
          position: relative;
          top: -10px;
          cursor: pointer;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          border-left: none;
          border-right: none;
          height: 1px;
          width: 30px;
          display: inline-block;
          font-size: 1px;
        "
      ></i>
      <i
        v-if="false"
        class="arrow down"
        style="position: relative; top: -10px; cursor: pointer"
      ></i>
    </div>
    <div class="subnav tip-nav">
      <div
        style="
          position: absolute;
          padding-left: 3px;
          top: 0px;
          padding-right: 3px;
          left: -1.2em;
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
    <div style="height: 100%; width: 100%; overflow: auto; margin-top: 3px">
      <FinAnalyst2 :item="item"> </FinAnalyst2>
    </div>
  </div>
</template>
<script>
import FinAnalyst2 from "@/view/components/FinAnalyst/FinAnalyst2";
import ChartIndex from "@/view/components/h5/ChartIndex";

export default {
  data() {
    return { chartop: 45 };
  },
  props: {
    item: Object,
    close: Function,
    curComponent: String,
  },
  directives: {
    drag(el) {
      let self = this;
      /*document.onselectstart = function () {
        return false;
      };*/
      el.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - $(el).parent()[0].offsetLeft;
        let disY = e.clientY - $(el).parent()[0].offsetTop;
        let winH = $(window).outerHeight();
        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          // target.style.left = l + "px";
          if (t <= 0) t = 0;
          else if (t >= winH) t = winH - 8;
          $(el).parent()[0].style.top = t + "px";
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        $(window).trigger("resize");

        //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    },
  },
  components: {
    FinAnalyst2,
    ChartIndex,
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
#dragBar {
  position: absolute;
  width: 100%;
  height: 5px;
  cursor: row-resize;
  text-align: center;
  border-top: 1px solid #1bc07d;
  z-index: 1;
}
.y {
  color: red;
}
.button {
  border: none;
  cursor: pointer;
  padding: 0px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-bottom: 1px solid;
}
</style>



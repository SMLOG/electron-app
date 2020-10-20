<template>
  <div
    id="popup"
    ref="popup"
    v-show="item && comp"
    style="
      position: fixed;
      top: 35px;
      right: 0;
      left: 200px;
      bottom: 0px;
      background: #eee;
      z-index: 1000;
      overflow: auto;
      padding-top: 25px;
    "
  >
    <div
      v-if="item"
      style="
        color: #fff;
        font-weight: bold;
        background: #666;
        top: 35;
        position: fixed;
        top: 25px;
      "
    >
      {{ item.name }}({{ item.code }})
    </div>
    <div class="post">
      <keep-alive>
        <component :name="comp" v-bind:is="comp" :item="item"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item";
import Summary from "./Summary";
export default {
  data: function () {
    return { _item: null, _comp: null };
  },

  mounted() {
    window.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 27:
          this._comp = null;
          break;
        default:
      }
    });

    window.addEventListener("click", (e) => {
      if (this.$el.style.display != "none" && !this.$el.contains(e.target)) {
        this.$emit("close");
      }
    });
  },
  components: { Item, Summary },
  props: ["item", "comp"],
  methods: {},
  computed: {},
  watch: {
    comp(n, o) {
      if (n == this._item) {
        _comp;
      }
    },
  },
};
</script>
<style scoped>
.popup {
  border-bottom: 1px dashed #aaa;
  margin: 5px;
  clear: both;
  font-size: 12px;
}
.popup .post_title {
  float: left;
}
</style>

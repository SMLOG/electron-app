<template>
  <webview
    ref="webview"
    id="figure"
    style="width:100%;height:100%;"
    :src="link"
  ></webview>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import store from "@/localdata";
import draggable from "vuedraggable";
import { initwebview } from "@/lib/webview";

import $ from "jquery";
window.$ = $;

export default {
  name: "WinView",
  data: function() {
    return {
      openCode: null,
      openType: null
    };
  },
  props: {
    link: String
  },
  mounted() {
    initwebview(this.closeview.bind(this));
  },
  watch: {},
  computed: {},
  methods: {
    closeview() {
      let webviewWrap = $(this.$refs.webviewWrap);
      webviewWrap.hide();
      $(this.$refs.top).css("margin-bottom", "0");
      this.openCode = null;
    }
  }
};
</script>
<style scoped>
#dragBar {
  position: absolute;
  width: 100%;
  height: 5px;
  cursor: row-resize;
  text-align: center;
  border-top: 1px solid #1bc07d;
}
</style>

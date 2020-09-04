<template>
  <div>
    <div id="setting" ref="settings">
      <div class="dock">
        <span @click="fullScreen()">
          全屏
        </span>
        <span @click="showSetting = !showSetting" title="设置">设置</span>
      </div>
      <div id="setting_contents" v-show="showSetting">
        <ul>
          <li>
            <a @click="clearTechData">Clear Tech Data</a>
          </li>
          <li>
            <a @click="clearItems()">清除缓存海选</a>
          </li>
        </ul>
        <draggable v-model="cols" @update="dragEnd" tag="ul">
          <li v-for="col in cols" :key="col.prop">
            {{ col.label }}
            <input type="checkbox" v-model="col.checked" @change="changeCols" />
          </li>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/localdata";
import { getCheckFields } from "../headers";
import { mapActions, mapState } from "vuex";
import draggable from "vuedraggable";
import storejs from "storejs";

export default {
  name: "setting",
  data: function() {
    return {
      showSetting: false,
      cols: getCheckFields(false),
    };
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (this.$refs.settings) {
        if (this.$refs.settings.contains(e.target)) {
        } else {
          this.showSetting = false;
        }
      }
    });
  },
  components: {
    draggable,
  },
  watch: {},

  methods: {
    fullScreen() {
      /*判断是否全屏*/
      var isFullscreen =
        document.fullScreenElement || //W3C
        document.msFullscreenElement || //IE
        document.mozFullScreenElement || //火狐
        document.webkitFullscreenElement || //谷歌
        false;
      if (!isFullscreen) {
        var el = document.documentElement;
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    clearItems() {
      storejs.set("seadatetime", 0);
    },
    dragEnd() {
      this.changeCols();
    },
    changeCols() {
      this.setFields(this.cols);
    },
    clearTechData() {
      store.setSetting("tech", +new Date());
      this.showSetting = false;
    },
    ...mapActions(["setFields"]),
  },
};
</script>
<style scoped>
a {
  cursor: pointer;
}
#setting .dock {
  position: fixed;
  right: 5px;
  top: 5px;
  height: 22px;
  width: 60px;
  cursor: pointer;
  z-index: 10000;
}
#setting .dock span {
  display: inline-block;
  font-size: 12px;
}
#setting_contents {
  position: fixed;
  right: 5px;
  top: 30px;
  display: inline-block;
  border-radius: 1px;
  background: #fff;
  z-index: 100000;
  padding: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
</style>

<template>
  <div id="app">
    <Setting />

    <div id="wigi2" style="position: fixed; z-index: 4">
      <search-panel @select="changeItem"></search-panel>
    </div>
    <div id="wigi" style="position: fixed; z-index: 5">
      <WinView
        ref="webviewWrap"
        v-show="showType == 'link' && item"
        :item="item"
        :link="link"
        @close="clickClosed"
        @updateLink="updateLink"
      ></WinView>
      <WinWrap
        :item="item"
        :curComponent="curComponent"
        v-if="showType == 'fin'"
        @close="clickClosed"
      />
      <Right :item="rightItem" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SearchPanel from "@/view/components/search-panel";
import WinView from "@/view/components/WinView";
import WinWrap from "@/view/components/WinWrap";
import FinAnalyst2 from "@/view/components/FinAnalyst/FinAnalyst2";
import Right from "@/view/components/Right";
import Setting from "@/view/components/setting";

export default {
  components: { SearchPanel, WinView, WinWrap, FinAnalyst2, Right, Setting },
  mounted() {
    window.app = this;
  },
  computed: {
    ...mapState({
      curComponent: (state) => state.ws.curComponent,
      showType: (state) => state.ws.showType,
      rightItem: (state) => state.ws.rightItem,
      link: (state) => state.ws.link,
      item: (state) => state.ws.curItem,
    }),
  },
  methods: {
    updateLink(newlink) {},
    changeItem(item) {
      this.$router.push({ query: { code: item.code } });
      this.$store.commit("ws/setCurItem", {
        ...this.$store.state.ws,
        curItem: item,
      });
    },
    clickClosed() {
      this.$store.commit("ws/setCurItem", {
        ...this.$store.state.ws,
        showType: null,
        curItem: null,
        curComponent: null,
      });
    },
  },
};
</script>

<style>
/* CSS */
html,
body {
  padding: 0;
  margin: 0;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-track {
  background: #ddd;
}

::-webkit-scrollbar-thumb {
  background: #666;
}

.blink {
  animation: blink 1s linear infinite;
  /* 其它浏览器兼容性前缀 */
  -webkit-animation: blink 2s linear infinite;
  -moz-animation: blink 1s linear infinite;
  -ms-animation: blink 1s linear infinite;
  -o-animation: blink 1s linear infinite;
}
.blinkbg {
  background-color: #dd4814;
  animation: blink 1s linear infinite;
  /* 其它浏览器兼容性前缀 */
  -webkit-animation: blink 2s linear infinite;
  -moz-animation: blink 1s linear infinite;
  -ms-animation: blink 1s linear infinite;
  -o-animation: blink 1s linear infinite;
}
i.arrow {
  display: inline-block;
  border-style: solid;
  border-width: 0 0 8px 8px;
  border-color: transparent transparent rgba(0, 0, 0, 0.2) transparent;
  flex: 0;
}
.arrow.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.selected i.arrow {
  border-color: transparent transparent rgba(255, 255, 255, 1) transparent;
}
.link {
  cursor: pointer;
  text-decoration: underline;
}
.arrow.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
@-ms-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
@-o-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
#app {
  background: white;
}
/* 定义blink类*/
</style>

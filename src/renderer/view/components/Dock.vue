<template>
  <div>
    <span
      class="r shrink2"
      @click="toggleLeft"
      :class="{ dock: isDockLeft }"
    ></span>
    <slot />
    <span
      class="d shrink2"
      @click="isShrink = !isShrink"
      :class="{ dock: isShrink }"
    ></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDockLeft: false,
      isShrink: false
    };
  },
  methods: {
    toggleLeft() {
      this.isDockLeft = !this.isDockLeft;
    },
    resizeWin() {
      let win = this.$electron.remote.getCurrentWindow();
      let screen = this.$electron.remote.screen;
      let winSize = win.getSize();
      let body = document.body,
        html = document.documentElement;

      let height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      console.log(height);
      if (winSize[1] != height) this.setSize(winSize[0], height);
    },
    setSize(w, h) {
      let win = this.$electron.remote.getCurrentWindow();
      //win.setResizable(true);
      win.setSize(w, h);
      // win.setResizable(false);
    }
  },
  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let timerID;

    let wsize = win.getSize();
    document.addEventListener("mouseleave", event => {
      console.log(win);

      timerID = setInterval(() => {
        let mpos = this.$electron.screen.getCursorScreenPoint();
        let wPos = win.getPosition();

        if (
          mpos.x < wPos[0] ||
          mpos.x > wPos[0] + wsize[0] ||
          mpos.y < wPos[1] ||
          mpos.y > wPos[1] + wsize[1]
        ) {
          if (this.isDockLeft) {
            win.setPosition(
              screen.getPrimaryDisplay().workAreaSize.width - 3,
              win.getPosition()[1]
            );
          }
          if (this.isShrink) {
            this.setSize(wsize[0], 1 * 27);
          }
        }
      }, 500);
    });
    document.addEventListener("mouseenter", event => {
      if (timerID) clearTimeout(timerID);
      if (this.isDockLeft) {
        win.setPosition(
          screen.getPrimaryDisplay().workAreaSize.width - win.getSize()[0],
          win.getPosition()[1]
        );
      }
      if (this.isShrink) {
        this.resizeWin();
      }
    });

    document.addEventListener("mousedown", e => {
      switch (e.button) {
        case 0:
          biasX = e.x;
          biasY = e.y;
          document.addEventListener("mousemove", moveEvent);
          break;
      }
    });

    document.addEventListener("mouseup", () => {
      biasX = 0;
      biasY = 0;
      document.removeEventListener("mousemove", moveEvent);
    });

    function moveEvent(e) {
      win.setPosition(e.screenX - biasX, e.screenY - biasY);
    }
  }
};
</script>
<style>
.dock {
  background: green !important;
}
.shrink2 {
  width: 3px;
  height: 3px;
  border: 1px solid black;
  border-radius: 8px;
  position: fixed;
  right: 10px;
  cursor: pointer;
  z-index: 2;
}
.r {
  top: 10px;
}
.d {
  bottom: 15px;
  right: 15px;
}
</style>

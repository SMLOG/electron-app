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
        html.offsetHeight,
        27
      );
      let con = this.$electron.remote.getGlobal("console");
      con.log(body.scrollHeight, body.offsetHeight, html.offsetHeight, height);
      if (winSize[1] != height) this.setSize(winSize[0], height);
    },
    setSize(w, h) {
      let win = this.$electron.remote.getCurrentWindow();
      //win.setResizable(true);
      win.setSize(w, (win.isFrame ? 25 : 0) + h);
      let con = this.$electron.remote.getGlobal("console");
      con.log(h);

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
          timerID && clearInterval(timerID);
        }
      }, 500);
    });
    document.addEventListener("mouseenter", event => {
      if (timerID) clearTimeout(timerID);
      if (this.isDockLeft) {
        var x = win.getPosition()[0];
        let targetX =
          screen.getPrimaryDisplay().workAreaSize.width - win.getSize()[0];
        let k = 1;

        function step() {
          x = Math.max(x - 10 * k++, targetX);
          win.setPosition(x, win.getPosition()[1]);
          if (x > targetX) {
            window.requestAnimationFrame(step);
          }
        }
        step();

        /* win.setPosition(
          screen.getPrimaryDisplay().workAreaSize.width - win.getSize()[0],
          win.getPosition()[1]
        );*/
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
.dock.shrink2:after {
  background: green !important;
}
.shrink2 {
  width: 10px;
  height: 10px;
  position: fixed;
  right: 10px;
  border: none;

  cursor: pointer;
  z-index: 2;
}
.shrink2:after {
  position: absolute;
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  border: 1px solid black;
}
.r {
  top: 10px;
}
.d {
  bottom: 8px;
  right: 10px;
}
</style>

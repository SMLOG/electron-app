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
function animation(init, targetX, duration, callback) {
  let t1 = +new Date();
  let speed = (targetX - init) / duration;
  let fun = targetX > init ? Math.min : Math.max;

  function step() {
    let t2 = +new Date();
    init = fun(init + (t2 - t1) * speed, targetX);
    if (callback(parseInt(init), targetX)) {
      window.requestAnimationFrame(step);
    }
  }
  step();
}
export default {
  data() {
    return {
      isDockLeft: true,
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
      if (winSize[1] != height) {
        animation(
          winSize[1] - (win.isFrame ? 27 : 0),
          height,
          500,
          (cur, target) => {
            this.setSize(winSize[0], cur);
            con.log(winSize[1], cur, target);
            return cur < target;
          }
        );
      }
    },
    setSize(w, h) {
      let win = this.$electron.remote.getCurrentWindow();
      //win.setResizable(true);
      win.setSize(w, (win.isFrame ? 27 : 0) + h);

      // win.setResizable(false);
    }
  },
  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let timerID;
    let con = this.$electron.remote.getGlobal("console");

    document.addEventListener("mouseleave", event => {
      timerID = setInterval(() => {
        let wsize = win.getSize();

        let mpos = this.$electron.screen.getCursorScreenPoint();
        let wPos = win.getPosition();

        if (
          mpos.x < wPos[0] ||
          mpos.x > wPos[0] + wsize[0] ||
          mpos.y < wPos[1] ||
          mpos.y > wPos[1] + wsize[1]
        ) {
          clearInterval(timerID);
          this.mouseleave = true;

          if (this.isDockLeft) {
            animation(
              win.getPosition()[0],
              screen.getPrimaryDisplay().workAreaSize.width - 3,
              500,
              (cur, target) => {
                win.setPosition(cur, win.getPosition()[1]);
                return cur < target;
              }
            );
          }
          if (this.isShrink) {
            animation(
              wsize[1] - (win.isFrame ? 27 : 0),
              27,
              500,
              (cur, target) => {
                con.log(wsize[1] - (win.isFrame ? 27 : 0), cur, target);
                this.setSize(wsize[0], cur);
                return cur > target;
              }
            );
          }
        }
      }, 500);
    });

    document.addEventListener("mouseenter", event => {
      if (timerID) clearTimeout(timerID);
      if (this.isDockLeft) {
        let init = win.getPosition()[0];
        let targetX =
          screen.getPrimaryDisplay().workAreaSize.width - win.getSize()[0];
        let duration = 500;

        animation(init, targetX, duration, (cur, target) => {
          win.setPosition(cur, win.getPosition()[1]);
          return cur > target;
        });

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

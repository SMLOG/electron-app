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
function animation(init, targetX, callback, duration = 300) {
  let t1 = +new Date();
  let speed = (targetX - init) / duration;
  let is_incr = targetX > init;
  let fun = is_incr ? Math.min : Math.max;

  function step() {
    let t2 = +new Date();
    init = fun(init + (t2 - t1) * speed, targetX);
    callback(parseInt(init), targetX);
    if ((is_incr && init < targetX) || (!is_incr && init > targetX)) {
      window.requestAnimationFrame(step);
    }
  }
  step();
}
function animation2(arr, callback, duration = 300) {
  let t1 = +new Date();
  let arr_speed = arr.map(a => (a[1] - a[0]) / duration);
  let arr_is_incr = arr.map(a => a[1] > a[0]);
  let arr_fun = arr_is_incr.map(is_incr => (is_incr ? Math.min : Math.max));

  function step() {
    let t2 = +new Date();
    let arr_init = arr.map((a, i) =>
      parseInt(arr_fun[i](a[0] + (t2 - t1) * arr_speed[i], a[1]))
    );
    callback(arr_init);
    let con_arr = arr.map(
      (a, i) =>
        (arr_is_incr[i] && arr_init[i] < a[1]) ||
        (!arr_is_incr[i] && arr_init[i] > a[1])
    );
    if (con_arr.filter(e => e).length > 0) {
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
  watch: {},
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
      return height;
    },
    onResize() {
      let win = this.$electron.remote.getCurrentWindow();

      let winSize = win.getSize();
      let h = winSize[1] - (win.isFrame ? 27 : 0);
      let h2 = this.resizeWin();

      animation2([[h, h2]], ([curH]) => {
        this.setSize(winSize[0], curH);
      });
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

    let onLeave = () => {
      con.log("ALT+Z mouseleave");
      this.isleave = true;

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
          let x = win.getPosition()[0];
          let x2 = x;
          let h = wsize[1] - (win.isFrame ? 27 : 0);
          let h2 = h;
          if (this.isDockLeft) {
            x2 = screen.getPrimaryDisplay().workAreaSize.width - 3;
          }
          if (this.isShrink) {
            h2 = 27;
            this.$emit("onCollapseH", true);
          }

          animation2(
            [
              [x, x2],
              [h, h2]
            ],

            ([curx, curh]) => {
              con.log(curx, curh);
              win.setPosition(curx, win.getPosition()[1]);
              this.setSize(wsize[0], curh);
            }
          );
        }
      }, 500);
    };
    document.addEventListener("mouseleave", event => {
      onLeave();
    });
    let onEnter = () => {
      con.log("ALT+Z mouseenter");
      this.isleave = false;
      if (timerID) clearTimeout(timerID);
      let x = win.getPosition()[0];
      let x2 = x;
      if (this.isDockLeft) {
        x2 = screen.getPrimaryDisplay().workAreaSize.width - win.getSize()[0];
      }
      let winSize = win.getSize();

      let h = winSize[1] - (win.isFrame ? 27 : 0);
      let h2 = h;
      if (this.isShrink) {
        this.$emit("onCollapseH", false);
        h2 = this.resizeWin();
      }
      animation2(
        [
          [x, x2],
          [h, h2]
        ],
        ([curx, curH]) => {
          win.setPosition(curx, win.getPosition()[1]);
          this.setSize(winSize[0], curH);
        }
      );
    };
    document.addEventListener("mouseenter", event => {
      onEnter();
    });
    onEnter();
    this.$electron.ipcRenderer.on("ALT+Z", () => {
      con.log("ALT+Z");
      if (!this.isleave) onLeave();
      else onEnter();
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
  width: 5px;
  height: 5px;
  position: fixed;
  right: 5px;
  border: none;

  cursor: pointer;
  z-index: 2;
}
.shrink2:after {
  position: absolute;
  content: "";
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 3px;
  border: 1px solid black;
}
.r {
  top: 5px;
}
.d {
  bottom: 5px;
  right: 5px;
}
</style>

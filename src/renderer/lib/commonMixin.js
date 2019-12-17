/* commonMixin.js */
let template = `<div id="tody" ref="box">
<span id="rt" class="shrink2" @click="toggledockLeft" :class="{shrink:dockLeft}"></span>
<slot />
</div>`;
export default {
  data() {
    return {
      dockLeft: true
    };
  },
  provide() {
    return { child: this };
  },
  components: {
    super: {
      inject: ["child"],
      data() {
        return {
          dockLeft: true
        };
      },
      template: template,
      methods: {
        toggledockLeft() {
          this.dockLeft = !this.dockLeft;
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
              if (this.dockLeft) {
                win.setPosition(
                  screen.getPrimaryDisplay().workAreaSize.width - 9,
                  win.getPosition()[1]
                );
              }
            }
          }, 500);
        });
        document.addEventListener("mouseenter", event => {
          if (timerID) clearTimeout(timerID);
          if (this.dockLeft) {
            win.setPosition(
              screen.getPrimaryDisplay().workAreaSize.width -
                win.getSize()[0] +
                9,
              win.getPosition()[1]
            );
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
    }
  }
};

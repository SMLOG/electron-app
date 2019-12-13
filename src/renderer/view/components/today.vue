
<template>
  <div>bbb</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  filters: {},
  methods: {},

  mounted() {
    let win = this.$electron.remote.getCurrentWindow();
    let screen = this.$electron.remote.screen;
    let biasX = 0;
    let biasY = 0;
    let timerID;
    const size = screen.getPrimaryDisplay().workAreaSize;

    let hide = () => {
      let winSize = win.getSize();
      win.setPosition(size.width - 6, win.getPosition()[1]);
    };
    let show = () => {
      let winSize = win.getSize();
      win.setPosition(size.width - winSize[0], win.getPosition()[1]);
    };

    document.addEventListener("mouseenter", event => {
      timerID && clearInterval(timerID) && (timerID = 0);
      show();
    });

    document.addEventListener("mouseleave", event => {
      timerID && clearInterval(timerID);
      timerID = setInterval(() => {
        let mousePos = this.$electron.screen.getCursorScreenPoint();
        let wPos = win.getPosition();
        let winSize = win.getSize();

        if (
          mousePos.x < wPos[0] ||
          mousePos.x > wPos[0] + winSize[0] ||
          mousePos.y < wPos[1] ||
          mousePos.y > wPos[1] + winSize[1]
        ) {
          console.log(
            `${mousePos.x} ,${wPos[0]} , ${wPos[1]} , ${winSize[0]} , ${
              winSize[1]
            }`
          );
          clearInterval(timerID);

          hide();
        }
      }, 500);
    });
    let ev = document.createEvent("HTMLEvents");
    ev.initEvent("mouseleave", false, true);
    document.dispatchEvent(ev);

    window.addEventListener("mousedown", e => {
      switch (e.button) {
        case 0:
          biasX = e.x;
          biasY = e.y;
          document.addEventListener("mousemove", moveEvent);
          break;
        case 2:
          this.$electron.ipcRenderer.send("createSuspensionMenu");
          break;
      }
    });

    window.addEventListener("mouseup", function() {
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
* {
  padding: 0;
  margin: 0;
}
</style>

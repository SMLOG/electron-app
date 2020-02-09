export function animation(init, targetX, callback, duration = 300) {
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
export function animation2(arr, callback, duration = 300) {
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

export function mouseDragMenu(electron, isDrag = false) {
  let biasX = 0;
  let biasY = 0;
  let win = electron.remote.getCurrentWindow();
  document.addEventListener("mousedown", function(e) {
    switch (e.button) {
      case 0:
        biasX = e.x;
        biasY = e.y;
        if (isDrag) document.addEventListener("mousemove", moveEvent);
        break;
      case 2:
        electron.ipcRenderer.send("createSuspensionMenu");
        break;
    }
  });

  document.addEventListener("mouseup", function() {
    biasX = 0;
    biasY = 0;
    document.removeEventListener("mousemove", moveEvent);
  });

  function moveEvent(e) {
    win.setPosition(e.screenX - biasX, e.screenY - biasY);
  }
}

export function initwebview(closeview, electron) {
  const webview = document.querySelector("webview");
  webview.addEventListener("did-navigate-in-page", (event) => {
    if (webview.src && webview.src.indexOf("close") > -1) {
      closeview();
    }
    event.preventDefault();
    return false;
  });
  webview.addEventListener("new-window", (e) => {
    //shell.openExternal(e.url)
    let win = new electron.remote.BrowserWindow({
      width: Math.min(1024, window.outerWidth),
      height: window.outerHeight - 40,
    });
    win.loadURL(e.url);
    //let timer;
    win.on("blur", () => {
      // timer = setTimeout(() => {
      win.close();
      // }, 1000);
    });
    /*win.webContents.on("new-window", (et, url) => {
     // clearTimeout(timer);

      et.preventDefault();
      win.loadURL(url);
      return false;
    });*/
  });
  webview.addEventListener("dom-ready", (e) => {
    //webview.openDevTools();
  });
  /*const webview = document.querySelector("webview");

  webview.addEventListener("dom-ready", e => {
    webview.openDevTools();

    webview.getWebContents().executeJavaScript(`function loadScripts(scripts) {
    return scripts.reduce((currentPromise, scriptUrl) => {
    return currentPromise.then(() => {
      return new Promise((resolve, reject) => {
        var script = document.createElement("script");
        script.async = true;
        script.src = scriptUrl;
        script.onload = () => resolve();
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    });
    }, Promise.resolve());
    }
    loadScripts(['http://localhost:9080/static/preload-webview.js'])`);
  });*/
}

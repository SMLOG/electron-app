export function initwebview() {
  const webview = document.querySelector("webview");

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
  });
}

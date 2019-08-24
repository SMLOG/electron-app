import { app, BrowserWindow, globalShortcut, dialog } from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    show: false
  });
  mainWindow.loadURL(winURL);
  app.mainWindow = mainWindow;

  mainWindow.on("close", event => {
    //mainWindow = null;
    console.log("close");
    if (mainWindow.isVisible()) {
      mainWindow.hide();
      event.preventDefault();
    }
  });
  require("./window");

  mainWindow.on("closed", event => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  globalShortcut.register("CommandOrControl+Alt+K", () => {
    dialog.showMessageBox(
      {
        type: "info",
        title: "Information",
        message: "Do you really want to close the application?",
        buttons: ["Yes", "No"]
      },
      index => {
        if (index === 0) {
          app.quit();
        }
      }
    );
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

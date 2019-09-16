import {
  app,
  BrowserWindow,
  globalShortcut,
  dialog,
  Tray,
  Menu
} from "electron";
import * as path from "path";

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
    ? `http://localhost:9080/index.html`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    icon: "app.ico",
    show: false
  });
  mainWindow.loadURL(winURL);
  app.mainWindow = mainWindow;
  mainWindow.webContents.session.on(
    "will-download",
    (event, item, webContents) => {
      event.preventDefault();
    }
  );
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

  mainWindow.on("blur", e => {
    // mainWindow.hide();
  });
}
var appTray = null;

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
  // 注册一个'CommandOrControl+X'快捷键的监听。
  console.log("regist global key");
  const ret = globalShortcut.register("CommandOrControl+Alt+X", () => {
    toggleShowHide();
  });

  if (!ret) {
    console.log("注册失败");
  }

  let keysMap = { "ALT+E": "notifywin", "ALT+Z": "minwin" };
  Object.keys(keysMap).forEach(k => {
    console.log(`check key ${k} is regist: ${globalShortcut.isRegistered(k)}`);
    if (
      !globalShortcut.register(k, () => {
        console.log(`${k} key enter`);
        app[keysMap[k]].webContents.send(k, false);
      })
    ) {
      console.log(`register key ${k} fail.`);
    } else console.log(`regist key ${k} success`);
  });

  //系统托盘图标目录
  //let trayIcon = path.join(__dirname, 'app');//app是选取的目录
  var trayMenuTemplate = [
    {
      label: "设置",
      click: function() {} //打开相应页面
    },
    {
      label: "帮助",
      click: function() {}
    },
    {
      label: "关于",
      click: function() {}
    },
    {
      label: "退出",
      click: function() {
        app.quit();
        app.quit(); //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ];

  appTray = new Tray(path.join(__dirname, "app.png")); //app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip("我的托盘图标");

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on("click", function() {
    toggleShowHide();
  });
});
let show = () => {
  app.minwin.show();
  app.notifywin.show();
};
let hide = () => {
  app.minwin.hide();
  app.notifywin.hide();
};
let toggleShowHide = () => {
  if (app.minwin.isVisible()) {
    hide();
  } else {
    show();
  }
};

app.on("will-quit", () => {
  // 注销一个快捷键。
  globalShortcut.unregister("CommandOrControl+Z");

  // 注销所有快捷键。
  globalShortcut.unregisterAll();
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

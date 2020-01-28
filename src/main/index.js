import {
  app,
  BrowserWindow,
  globalShortcut,
  dialog,
  Tray,
  Menu,
  screen
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

  const scSize = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
  mainWindow = new BrowserWindow({
    height: scSize.height / 2,
    useContentSize: true,
    width: scSize.width,
    icon: "app.ico",
    show: false,
    webPreferences: {
      webSecurity: false
    }
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

  let keysMap = {
    "ALT+E": "notifywin",
    "ALT+Z": "minwin",
    "ALT+CommandOrControl+L": "minwin",
    "ALT+CommandOrControl+1": "minwin"
  };
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
      click: function() {
        if (mainWindow.isVisible()) mainWindow.hide();
        else mainWindow.show();
      } //打开相应页面
    },
    {
      type: "separator"
    },
    {
      label: "Windows",
      submenu: [
        {
          label: "today",
          // accelerator: "CmdOrCtrl+Z"
          // ,role: "undo"
          type: "checkbox",
          click: function(menuItem, browserWindow, event) {
            //showDlg(menuItem.label, menuItem.label, browserWindow);
            toggleWindow("today", ret => {
              menuItem.checked = ret;
            });
          }
        }
      ]
    },
    {
      label: "迷你窗口",
      type: "checkbox",

      click: function(menuItem, browserWindow, event) {
        app.minwin.isVisible() ? app.minwin.hide() : app.minwin.show();
        menuItem.checked = app.minwin.isVisible();
      }
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
let windows = {};
function toggleWindow(type, cb) {
  let win = windows[type];
  if (win) {
    if (win.isVisible()) win.hide(), cb && cb(false);
    else win.show(), cb && cb(true);
    return;
  }
  win = new BrowserWindow({
    width: 200,
    height: 200,
    type: "toolbar",
    frame: true,
    autoHideMenuBar: true,
    resizable: true,
    show: true,
    webPreferences: {
      //  devTools: false, //关闭调试工具
      webSecurity: false
    },
    transparent: false,
    alwaysOnTop: true
  });
  win.isFrame = true;
  const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
  const winSize = win.getSize(); //获取窗口宽高

  //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  win.setPosition(size.width - winSize[0], size.height - winSize[1]);

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:9080/#/${type}`
      : `file://${__dirname}/index.html/#/${type}`;

  win.loadURL(url);
  windows[type] = win;

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("close", () => {
    win = null;
    windows[type] = null;
    cb && cb(false);
  });
}
function showDlg(title, msg, focusedWindow = null) {
  const options = {
    type: "info",
    title: "" + title,
    buttons: ["OK"],
    message: "" + msg
  };
  dialog.showMessageBox(focusedWindow, options, function() {});
}
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

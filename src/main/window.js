import {
  BrowserWindow,
  ipcMain,
  screen,
  Menu,
  shell,
  app,
  webContents,
  globalShortcut,
  dialog
} from "electron";

var win = null;

const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080/#/suspension`
    : `file://${__dirname}/index.html/#/suspension`;
ipcMain.on("showSuspensionWindow", () => {

});

ipcMain.on("createSuspensionMenu", e => {
  const rightM = Menu.buildFromTemplate([
    {
      label: "添加",
      enabled: true,
      click: () => {
        const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
        const winSize = win.getSize(); //获取窗口宽高
        const mainWinSize = app.mainWindow.getSize();
        //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
        app.mainWindow.setPosition(
          size.width - winSize[0] - mainWinSize[0],
          100
        );

        app.mainWindow.show();
      }
    },
    {
      label: "置顶",
      enabled: true,
      click: () => {
        let isTop = win.isAlwaysOnTop();
        win.setAlwaysOnTop(!isTop);
        notifywin.setAlwaysOnTop(!isTop);
      }
    },
    { label: "本次传输完自动关机" },
    { type: "separator" },
    {
      label: "隐藏悬浮窗",
      click: () => {
        /* const window = BrowserWindow.fromWebContents(
          webContents.getFocusedWebContents()
        );
        window.webContents.send("hideSuspension", false);*/
        win.hide();
      }
    },
    { type: "separator" },
    {
      label: "加入qq群",
      click: () => {
        shell.openExternal(
          "tencent://groupwpa/?subcmd=all&param=7B2267726F757055696E223A3831343237303636392C2274696D655374616D70223A313533393531303138387D0A"
        );
      }
    },
    {
      label: "GitHub地址",
      click: () => {
        shell.openExternal("https://github.com/lihaotian0607/auth");
      }
    },
    {
      label: "退出软件",
      click: () => {
        app.quit();
      }
    }
  ]);
  rightM.popup({});
});

function createSuspensionWindow() {
  win = new BrowserWindow({
    useContentSize: true,
    width: 2 * 107, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
    height: 27, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
    type: "toolbar", //创建的窗口类型为工具栏窗口
    frame: false, //要创建无边框窗口
    autoHideMenuBar: true,
    //resizable: false, //禁止窗口大小缩放
    show: false, //先不让窗口显示
    webPreferences: {
      // devTools: false, //关闭调试工具
      webSecurity: false
    },
    transparent: true, //设置透明
    alwaysOnTop: true //窗口是否总是显示在其他窗口之前
  });
  const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
  const winSize = win.getSize(); //获取窗口宽高
  win.setMenu(null);
  //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  win.setPosition(size.width - winSize[0], 100);
  win.loadURL(winURL);

  win.once("ready-to-show", () => {
    win.show();

    globalShortcut.register("CommandOrControl+Alt+V", () => {
      console.log("hideshow");
      if (win.isVisible()) {
        console.log("hide");
        win.hide();
      } else win.show();
    });
    app.minwin = win;
  });

  win.on("close", () => {
    win = null;
    app.minwin = null;
  });
}

ipcMain.on("hideSuspensionWindow", () => {
  if (win) {
    win.hide();
  }
});
createSuspensionWindow();

let notifywin;
function createNotifyWindow() {
  notifywin = new BrowserWindow({
    width: 300, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
    height: 180, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
    type: "toolbar", //创建的窗口类型为工具栏窗口
    frame: false, //要创建无边框窗口
    autoHideMenuBar: true,
    //resizable: false, //禁止窗口大小缩放
    show: false, //先不让窗口显示
    webPreferences: {
      //  devTools: false, //关闭调试工具
      webSecurity: false
    },
    transparent: true, //设置透明
    alwaysOnTop: true //窗口是否总是显示在其他窗口之前
  });
  const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
  const winSize = notifywin.getSize(); //获取窗口宽高

  //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  notifywin.setPosition(size.width - winSize[0], size.height - winSize[1]);

  const notifyURL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:9080/#/notify`
      : `file://${__dirname}/index.html/#/notify`;

  notifywin.loadURL(notifyURL);

  notifywin.once("ready-to-show", () => {
    notifywin.show();
    app.notifywin = notifywin;
  });

  notifywin.on("close", () => {
    notifywin = null;
    app.notifywin = null;
  });
}

createNotifyWindow();

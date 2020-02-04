let electron = require("electron");
let ipcRenderer = electron.ipcRenderer;
ipcRenderer && ipcRenderer.sendToHost("close");

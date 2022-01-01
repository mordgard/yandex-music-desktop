const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // mainWindow.loadFile("./index.html");
  mainWindow.loadURL("https://music.yandex.ru");
  mainWindow.webContents.openDevTools();
  global.mainWindow = mainWindow;
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("get-info", _event => {
  mainWindow.webContents.send("process-info", process.platform);
});

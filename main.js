const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  win.loadURL("https://music.yandex.ru");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

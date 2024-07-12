const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

require("@electron/remote/main").initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1440,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, "./preload.js"),
    },
    frame: false,
  });

  //For release builds
  // const urlLocation = url.format({
  //   pathname: path.join(__dirname, "../build/index.html"), // Adjust path here
  //   protocol: "file:",
  //   slashes: true,
  // });

  //For local dev
  const urlLocation = "http://localhost:3000";

  //Event to close app
  win.loadURL(urlLocation);
  ipcMain.handle("close-event", () => {
    app.quit();
  });

  //Event to refresh app
  ipcMain.handle("refresh-event", () => {
    win.reload();
  });

  //Event to minimize app
  ipcMain.handle("minimize-event", () => {
    win.minimize();
  });

  //Event to maximize app
  ipcMain.on("maximize-event", (e) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
    e.returnValue = win.isMaximized();
  });

  win.on("blur", (e) => {
    win.webContents.send("unFocused");
  });
  win.on("focus", (e) => {
    win.webContents.send("focused");
  });
}

app.on("ready", createWindow);

const { app, BrowserWindow } = require("electron");
const url = require("url");
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
    },
  });

  //For release builds
  // const urlLocation = url.format({
  //   pathname: path.join(__dirname, "../build/index.html"), // Adjust path here
  //   protocol: "file:",
  //   slashes: true,
  // });

  //For local dev
  const urlLocation = "http://localhost:3000";

  win.loadURL(urlLocation);
  require("@electron/remote/main").enable(win.webContents);
}

app.on("ready", createWindow);

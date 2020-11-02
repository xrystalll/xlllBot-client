const path = require("path")
const { app, BrowserWindow } = require('electron')

const DEV = true

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'xlllBot',
    backgroundColor: '#0e0e10',
    icon: path.join(__dirname, 'icon.png'),
    width: 1100,
    height: 650,
    minWidth: 400,
    minHeight: 500,
    show: false,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
    hasShadow: false,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: DEV
    },
    nativeWindowOpen: true
  })

  DEV ? win.loadURL('http://localhost:3000') : win.loadFile(path.join(__dirname, '..', 'build', 'index.html'))

  DEV && win.webContents.openDevTools()

  win.once('ready-to-show', () => {
    win.show()
  })
}

app.whenReady()
  .then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

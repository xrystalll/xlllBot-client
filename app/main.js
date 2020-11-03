const path = require('path')
require(path.join(__dirname, 'server'))
const { app, BrowserWindow, Menu } = require('electron')

const DEV = false

const createWindow = () => {
  const win = new BrowserWindow({
    title: 'xlllBot',
    backgroundColor: '#0e0e10',
    icon: path.join(__dirname, 'icon.ico'),
    width: 1150,
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

  win.loadURL('http://localhost:3000')

  DEV && win.webContents.openDevTools()

  Menu.setApplicationMenu(null)

  win.once('ready-to-show', () => {
    win.show()
  })

  win.webContents.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    if (frameName !== 'Sign in via Twitch') {
      options.modal = true
      options.parent = win
      options.frame = true
    }
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

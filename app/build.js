'use strict';

const packager = require('electron-packager')
const options = {
  "arch": "ia32",
  "platform": "win32",
  "dir": "./",
  "icon": "./app/icon.ico",
  "name": "xlllBot",
  "version": "1.4.0",
  "app-copyright": "xrystalll",
  "out": "./releases",
  "asar": false,
  "overwrite": true,
  "prune": true,
  "ignore": /(^\/(.github|src|test|public|\.[a-z]+|package-lock|README|LICENSE|yarn|static|preview|dist\/web))|\.gitkeep/,
}

async function bundleElectronApp(options) {
  const appPaths = await packager(options)
  console.log(`Electron app bundles created:\n${appPaths.join("\n")}`)
}

bundleElectronApp(options)

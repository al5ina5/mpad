// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, ipcMain, Menu, Tray, globalShortcut } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs-extra')
const shortid = require('shortid')
const SHA256 = require('crypto-js/sha256')
const keytar = require('keytar')

let tray = null
let window = null
let salt = null

const path = app.getPath('userData')

app.dock.hide()

app.on('ready', async () => {
    await prepareNext('./renderer')

    salt = await keytar.getPassword('mpad', 'hash')

    if (!salt) {
        salt = SHA256(shortid.generate())
        await keytar.setPassword('mpad', 'hash', salt.toString())
    }

    createTray()
    createWindow()
})

app.whenReady().then(() => {
    globalShortcut.register('Shift+CommandOrControl+C', () => {
        toggleWindow()
    })
})

const createWindow = () => {
    window = new BrowserWindow({
        width: 450,
        height: 300,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            preload: join(__dirname, 'preload.js'),
            additionalArguments: [`dbPath:${path}`, `salt:${salt}`]

            // backgroundThrottling: false
        }
    })

    const url = isDev
        ? 'http://localhost:8000'
        : format({
              pathname: join(__dirname, '../renderer/out/index.html'),
              protocol: 'file:',
              slashes: true
          })

    window.loadURL(url)

    window.setAlwaysOnTop(true, 'floating')
    window.setVisibleOnAllWorkspaces(true)
    window.setFullScreenable(false)

    // Hide the window when it loses focus
    window.on('blur', () => {
        if (!window.webContents.isDevToolsOpened()) {
            window.hide()
        }
    })
}
const createTray = () => {
    tray = new Tray(join(__dirname, isDev ? '../renderer/public/mpad-icon.png' : '../renderer/out/mpad-icon.png'))
    tray.on('right-click', toggleWindow)
    tray.on('double-click', toggleWindow)
    tray.on('click', function (event) {
        toggleWindow()

        // Show devtools when command clicked
        if (window.isVisible() && process.defaultApp && event.metaKey) {
            window.openDevTools({ mode: 'detach' })
        }
    })
}

const getWindowPosition = () => {
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds()

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2)

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)

    return { x: x, y: y }
}

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide()
    } else {
        showWindow()
    }
}

const showWindow = () => {
    const position = getWindowPosition()
    window.setPosition(position.x, position.y, false)
    window.show()
    window.focus()
}

ipcMain.on('show-window', () => {
    showWindow()
})

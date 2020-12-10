// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, ipcMain, Menu, Tray } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const electronVibrancy = require('elect')

let tray = null
let window = null

app.dock.hide()

app.on('ready', async () => {
    await prepareNext('./renderer')

    createTray()
    createWindow()
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
            backgroundThrottling: false
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

    window.on('ready-to-show', function () {
        // Whole window vibrancy with Material 0 and auto resize
        electronVibrancy.SetVibrancy(mainWindow, 0)

        // auto resizing vibrant view at {0,0} with size {300,300} with Material 0
        electronVibrancy.AddView(mainWindow, { Width: 300, Height: 300, X: 0, Y: 0, ResizeMask: 2, Material: 0 })

        // non-resizing vibrant view at {0,0} with size {300,300} with Material 0
        electronVibrancy.AddView(mainWindow, { Width: 300, Height: 300, X: 0, Y: 0, ResizeMask: 3, Material: 0 })

        //Remove a view
        var viewId = electronVibrancy.SetVibrancy(mainWindow, 0)
        electronVibrancy.RemoveView(mainWindow, viewId)

        // Add a view then update it
        var viewId = electronVibrancy.SetVibrancy(mainWindow, 0)
        electronVibrancy.UpdateView(mainWindow, { ViewId: viewId, Width: 600, Height: 600 })

        // Multipe views with different materials
        var viewId1 = electronVibrancy.AddView(mainWindow, {
            Width: 300,
            Height: 300,
            X: 0,
            Y: 0,
            ResizeMask: 3,
            Material: 0
        })
        var viewId2 = electronVibrancy.AddView(mainWindow, {
            Width: 300,
            Height: 300,
            X: 300,
            Y: 0,
            ResizeMask: 3,
            Material: 2
        })

        console.log(viewId1)
        console.log(viewId2)

        // electronVibrancy.RemoveView(mainWindow,0);
        // electronVibrancy.RemoveView(mainWindow,1);

        // or

        electronVibrancy.DisableVibrancy(mainWindow)
    })
}

const createTray = () => {
    tray = new Tray(join(__dirname, '../renderer/public/mstats.png'))
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

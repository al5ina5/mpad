const { ipcRenderer } = require('electron')
const si = require('systeminformation')

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer
    global.si = si
})

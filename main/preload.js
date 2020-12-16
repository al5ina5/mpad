const { ipcRenderer } = require('electron')
const si = require('systeminformation')
const clipboard = require('electron-clipboard-extended')
const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const NetworkSpeed = require('network-speed')
const { join } = require('path')
const CryptoJS = require('crypto-js')

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here

const salt = process.argv.find((arg) => arg.startsWith('salt:')).split(':')[1]
const dbPath = process.argv.find((arg) => arg.startsWith('dbPath:')).split(':')[1]

console.log(salt)

const encrypt = (message) => {
    return CryptoJS.AES.encrypt(JSON.stringify(message), salt).toString()
}

const decrypt = (cipher) => {
    let bytes = CryptoJS.AES.decrypt(cipher, salt)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

const adapter = new FileSync(join(dbPath, '.db'), {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
})
const db = low(adapter)

db.defaults({ clipboards: [], notes: '' }).write()

const CopyEvent = (detail) => new CustomEvent('copy', { detail: detail })
const copyHandler = () => {
    const newClip = { id: shortid.generate(), date: Date.now(), content: clipboard.readText() }
    if (/^\s*$/.test(newClip.content)) return

    const latest = db.get('clipboards').sortBy('date').reverse().take(5).value()
    const exists = latest.find((clip) => clip.content === newClip.content)

    if (exists) return

    window.dispatchEvent(CopyEvent(newClip))

    db.get('clipboards').push(newClip).write()
}
clipboard.on('text-changed', copyHandler).startWatching()

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer
    global.si = si
    global.clipboard = clipboard
    global.db = db
    global.NetworkSpeed = NetworkSpeed
})

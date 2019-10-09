import { app, BrowserWindow, ipcMain, BrowserView } from 'electron'


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        // 启动时是否显示
        show: false,
        useContentSize: true,
        // 窗口在屏幕居中
        center: true,
        // 窗口是否可以改变尺寸.
        resizable: true,
        width: 1000,
        height: 600,
        minHeight: 600,
        minWidth: 1000,
        // 创建一个没有顶部工具栏，没有border窗口
        frame: false,
        // 即刻相册
        title: '印象时刻',
        // 毛玻璃效果，仅macOS有效
        vibrancy: 'ultra-dark',
        // 窗口透明,如果设置了true，那么在win32环境下，isMaximized()总返回false
        transparent: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#fff',
        webPreferences: {
            devTools: true,
            backgroundThrottling: false,
            // nodeIntegration: true,
            // nodeIntegrationInWorker: true,
        }
    })
    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
            mainWindow = null
        })
        // 当加载完html后 显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
ipcMain.on('open-child-window', (event, arg) => {
    console.log(arg)
    let child = new BrowserWindow({ parent: mainWindow })
    child.on('closed', () => {
        child = null
    })
})
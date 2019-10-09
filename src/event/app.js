import electron from 'electron'

let { app, BrowserWindow, remote } = electron
let win = remote.getCurrentWindow()

// 最大化
function screenMax() {
    // win.maximize()
    win.isMaximized() ? win.unmaximize() : win.maximize()
    return win.isMaximized()
}

// 最小化
function screenMin() {
    win.isMinimized() ? win.restore() : win.minimize()
    return win.isMinimized()
}

// 关闭
function screenClose() {
    win.close()
}
export {
    screenMax,
    screenMin,
    screenClose
}
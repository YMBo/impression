/*
 * @Author: your name
 * @Date: 2019-10-29 15:49:31
 * @LastEditTime: 2019-11-07 18:17:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /印象时刻/src/renderer/utils/common.js
 */
import fs from 'fs-extra'

// 是否为文件夹
function isDir(url) {
    let stat = fs.lstatSync(url);
    return stat.isDirectory()
}

// 将文件夹扁平化,只扁平一级
function flatDir(fileList) {
    let all = []
    for (let i in fileList) {
        let e = fileList[i]
        if (isDir(e.path)) {
            fs.readdir(e.path, function(err, file) {
                console.log(file)
            })
        }
        all.push({
            id: Math.random(),
            file: e,
            status: 'active',
            err: null,
            percent: 0
        })
    }
    return all
}

/**
 * @description: 序列帧动画
 * @param {interval}  {callback}  
 * @return: animate function
 */
function frameAnimtion(i, callback = () => {}) {
    let now = Date.now()
    let interval = 0;
    let already = 0;
    let id = 0

    function frame(params) {
        interval = Date.now() - now;
        already += interval
        if (already >= i) {
            window.cancelAnimationFrame(id)
            callback()
            already = 0
            now = Date.now()
        }
        id = window.requestAnimationFrame(frame)
    }
    frame.cancel = () => {
        console.log('嘟', id)
        window.cancelAnimationFrame(id)
    }
    return frame
}






export {
    isDir,
    flatDir,
    frameAnimtion
}
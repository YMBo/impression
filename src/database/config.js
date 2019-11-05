import { app, remote } from 'electron' // 引入remote模块
import fs from 'fs-extra'
import path from 'path'


const APP = process.type === 'renderer' ? remote.app : app
    // 存储用户设置的系统目录
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) { // 如果不存在路径
        fs.mkdirpSync(STORE_PATH)
    }
}

// setting的配置文件
const setting_path = path.join(STORE_PATH, '/setting.json')

// 图片列表的配置文件
const image_book_path = path.join(STORE_PATH, '/book.json')

// 失信图片列表
const promise_path = path.join(STORE_PATH, '/promise.json')


export {
    setting_path,
    image_book_path,
    promise_path
}
import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron' // 引入remote模块

const APP = process.type === 'renderer' ? remote.app : app
    // 存储用户设置的系统目录
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) { // 如果不存在路径
        fs.mkdirpSync(STORE_PATH)
    }
}

const adapter = new FileSync(path.join(STORE_PATH, '/setting.json'))
const db = Datastore(adapter)

export default db
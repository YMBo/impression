import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import { setting_path, image_book_path, promise_path } from './config'

const adapter = new FileSync(setting_path)
const setting_db = Datastore(adapter)
setting_db.defaults({
    localhost: {
        disable: false,
        path: ''
    },
    setting_server: {
        server: [],
        server_disable: false,
    }
}).write()


// 图片列表
const adapter_book = new FileSync(image_book_path)
const book_db = Datastore(adapter_book)
book_db._.mixin(LodashId)
book_db.defaults({}).write()

// 失信图片列表，没有没有街道城市名称的
const adapter_promise = new FileSync(promise_path)
const promise_db = Datastore(adapter_promise)
promise_db._.mixin(LodashId)
promise_db.defaults({}).write()


export {
    setting_db,
    book_db,
    promise_db
}
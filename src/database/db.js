import { setting_db, book_db, promise_db } from './datastore'
// ------------------------------setting-----------------------------------
// 获取setting配置
function getSetting(key) {
    return setting_db
        .read()
        .get(key)
        .value()
}

function setSetting(key, value) {
    return setting_db.set(key, value).write()
}

// ------------------------------图片列表-----------------------------------

//  获得图片列表数据
function getImgBook() {
    return book_db
        .read()
        .value()
}

function getImgId(key) {
    return book_db.get(key)
}

function getImgIdValue(key) {
    return book_db.get(key).value()
}

function haskey(key) {
    return book_db.has(key).value()
}

// 设置数据
function setImgBook(key, value) {
    return book_db.set(key, value).write()
}

// 更新数据
function updateBook(key, callback) {
    return book_db.update(key, callback).write()
}

function setUpdateBook(key, value) {
    if (haskey(key)) {
        getImgId(key).insert(value).write()
    } else {
        setImgBook(key, [])
        getImgId(key).insert(value)
            .write()
    }
}


// -------------------------------失信图片----------------------------------

function promiseHas(key) {
    return promise_db.has(key).value()
}

function getPromise(key) {
    return promise_db.get(key)
}

// 设置数据
function setPromise(key, value) {
    return promise_db.set(key, value).write()
}

function setUpdatePromise(key, value) {
    if (promiseHas(key)) {
        getPromise(key).insert(value).write()
    } else {
        setPromise(key, [])
        getPromise(key).insert(value).write()
    }
}

// 根据id删除key中内容
function deletePromise(key, id) {
    db.get(key)
        .removeById(id)
        .write()
}

export {
    getSetting,
    setSetting,
    getImgBook,
    setImgBook,
    updateBook,
    setUpdateBook,
    setUpdatePromise,
    deletePromise
}
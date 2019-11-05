import db from './datastore'

// 获取setting配置
function getSetting(key) {
    return db
        .read()
        .get(key)
        .value()
}

function setSetting(key, value) {
    return db.set(key, value).write()
}

export {
    getSetting,
    setSetting
}
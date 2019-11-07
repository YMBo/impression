/*
 * @Author: YMBo
 * @Date: 2019-11-05 14:51:45
 * @LastEditTime: 2019-11-07 10:58:09
 * @Description: 分类image信息
 * @FilePath: /印象时刻/src/renderer/utils/format.js
 */

import { setUpdateBook, setUpdatePromise } from 'ROOT/database/db'

//  数据聚合
function formatData(data) {
    const { time, pos } = data
    delete data.time
    delete data.pos
    const { year, date } = time
    return setUpdateBook(`${year}.${date}`, {
        ...pos,
        ...time,
        ...data
    })
}

// 没有位置信息的单独存上
// 不会存上pos
function promiseFormatData(data) {
    const { time, pos } = data
    delete data.time
    delete data.pos
    const { year, date } = time
    return setUpdatePromise(`${year}.${date}`, {
        ...pos,
        ...time,
        ...data
    })
}

export {
    formatData,
    promiseFormatData
}
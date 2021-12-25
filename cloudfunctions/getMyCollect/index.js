// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const MAX_LIMIT = 20 // 每次最大取20
// 云函数入口函数
exports.main = async (event, context) => {
    const batchIndex = event.index // 第几批数据
    const promise = db.collection("collect").skip(batchIndex * MAX_LIMIT).limit(MAX_LIMIT).where({
        _openid: event.openid,
    }).get()
    return promise
}
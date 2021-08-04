const {db} = require('../db')

class dbOp {
    async findDoc(data) {
        return await db[data.collection].findOne(data.find)
    }
    async findDocs(data) {
        return await db[data.collection].find(data.find)
    }
    async createDoc(data) {
        return await db[data.collection].create(data.create)
    }
    async countDocs(data) {
        return await db[data.collection].countDocuments(data.find)
    }
    async updateDoc(data) {
        return await db[data.collection].updateOne(data.find, data.update)
    }
    async findAndUpdateDoc(data) {
        return await db[data.collection].findOneAndUpdate(data.find, data.update)
    }
    async updateDocs(data) {
        return await db[data.collection].updateMany(data.find, data.update)
    }
    async deleteDoc(data) {
        return await db[data.collection].deleteOne(data.find)
    }
}

module.exports = new dbOp()


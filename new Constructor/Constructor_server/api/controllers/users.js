const dbOp = require('./dbOp')
const mkdirp = require('mkdirp')
const servdomain = require('../controllers/config')

class Register {
    async createUser(data, datafile) {
        try {
            if (datafile.File.name) {
                let path = `./uploadfiles/${data.username}/`
                let path2 = path + datafile.File.name
                await mkdirp(path)
                await datafile.File.mv(path2)
                let path3 = `${data.username}/` + datafile.File.name
                var url = servdomain + path3
            }
            let dataq = {
                create: {
                    username: data.username,
                    password: data.password,
                    avatar: url ? url : '',
                    role: data.role
                },
                collection: 'users'
            }
            
            let newuser = await dbOp.createDoc(dataq)
            return newuser
        } catch (err) {
            throw err
        }
    }
    async getUsers(data) {
        try {
            data.collection = 'users'
            let users = await dbOp.findDocs(data)
            return users
        } catch (err) {
            throw err
        }
    }
    async getUserPlayables(data) {
        try {
            //console.log(data)
            let playables = await dbOp.findDocs(data)
            return playables
        } catch (err) {
            throw err
        }
    }
}

module.exports = new Register()
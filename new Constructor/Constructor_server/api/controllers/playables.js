const dbOp = require('./dbOp')
const servdomain = require('../controllers/config')
var mkdirp = require('mkdirp')

class Playables {
    async createPlayable(data) {
        try {
            data.collection = 'playables'
            return await dbOp.createDoc(data)
        } catch (err) {
            throw err
        }
    }

    async createProject(data, file) {
        try {
            let path = __dirname + `/../../uploadfiles/${data.username}/` + file.File.name
            let mkpath = __dirname + `/../../uploadfiles/${data.username}/`
            await mkdirp(mkpath)
            let url = servdomain + `${data.username}/` + file.File.name
            if (file.File) { await file.File.mv(path) }

            let dataq = {
                create: {
                    name: data.name,
                    userid: data.userid,
                    icon: file.File.name ? url : undefined
                },
                collection: 'playables'   
            }

            return await dbOp.createDoc(dataq)
        } catch (err) {
            throw err
        }
    }

    async getPlayables(data) {
        try {
            data.collection = 'playables'
            return await dbOp.findDocs(data)
        } catch (err) {
            throw err
        }
            
    }

    async edit(data) {
        try { 
            return await dbOp.updateDoc(data)
        } catch (err) {
            throw err
        }
    }

    async getVersions(data) {
        try {
            data.collection = 'versions'
            return await dbOp.findDocs(data)
        } catch (err) {
            throw err
        }
    }

    async getAllVersions(data) {
        try {
            return await dbOp.findDocs(data)
        } catch (err) {
            throw err
        }
    }

    async deleteVersion(data) {
        try {
            //console.log(data)
            return await dbOp.deleteDoc(data)
        } catch (err) {
            throw err
        }
    }

    async saveinfo(data) {
        try {
            let obj = {
                find: {
                    _id: data.ver_id,
                },
                update: {
                    name: data.name,
                    description: data.description,
                    mod_date: data.mod_date
                },
                collection: 'versions'
            }
            //console.log(obj)
            return await dbOp.updateDoc(obj)
        } catch (err) {
            throw err
        }  
    }

    async showPlayable(data) {
        try {
            data.collection = 'versions'
            let showedplayable = await dbOp.findDocs(data)
            let document = require(showedplayable[0].config_path)
            showedplayable[0].configurations = document
            return showedplayable
        } catch (err) {
            throw err
        }
    }
    
}
module.exports = new Playables()
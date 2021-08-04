const { connect } = require('mongoose')
const { handleError } = require('./controllers/data')

class Model {
    constructor() {
        this.db = {}
    }
    async init(callback) {
        connect('mongodb://localhost:27017/newConstructor', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
            if (err) {
                handleError(err)
                return
            }

            this.db.users = require('./models/users')
            this.db.playables = require('./models/playables')
            this.db.versions = require('./models/versions')

            callback()
        })
    }
}

module.exports = new Model()